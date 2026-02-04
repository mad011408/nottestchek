// Cache buster: 2026-02-03-14-40 - FORCED REBUILD
import {
  createUIMessageStream,
  convertToModelMessages,
  stepCountIs,
  streamText,
  UIMessage,
  UIMessagePart,
  smoothStream,
  JsonToSseTransformStream,
} from "ai";
import { systemPrompt } from "@/lib/system-prompt";
import { createTools } from "@/lib/ai/tools";
import { generateTitleFromUserMessageWithWriter } from "@/lib/actions";
import { getUserIDAndPro } from "@/lib/auth/get-user-id";
import type { ChatMode, Todo, SandboxPreference, SubscriptionTier } from "@/types";
import { getBaseTodosForRequest } from "@/lib/utils/todo-utils";
import { checkRateLimit } from "@/lib/rate-limit";
import { ChatSDKError } from "@/lib/errors";
import PostHogClient from "@/app/posthog";
import { geolocation } from "@vercel/functions";
import { NextRequest } from "next/server";

type Doc<T extends string> = any;
type Id<T extends string> = string;

import {
  handleInitialChatAndUserMessage,
  saveMessage,
  updateChat,
  getMessagesByChatId,
  getUserCustomization,
  prepareForNewStream,
  startStream,
  startTempStream,
  deleteTempStreamForBackend,
  saveChatSummary,
} from "@/lib/db/actions";
import {
  createCancellationPoller,
  createPreemptiveTimeout,
} from "@/lib/utils/stream-cancellation";
import { v4 as uuidv4 } from "uuid";
import { processChatMessages } from "@/lib/chat/chat-processor";
import { createTrackedProvider } from "@/lib/ai/providers";
import { uploadSandboxFiles } from "@/lib/utils/sandbox-file-utils";
import { after } from "next/server";
import { createResumableStreamContext } from "resumable-stream";
import { checkAndSummarizeIfNeeded } from "@/lib/utils/message-summarization";
import {
  writeUploadStartStatus,
  writeUploadCompleteStatus,
  writeSummarizationStarted,
  writeSummarizationCompleted,
  createSummarizationCompletedPart,
  writeRateLimitWarning,
} from "@/lib/utils/stream-writer-utils";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { getMaxStepsForUser } from "@/lib/chat/chat-processor";
import { GoogleGenerativeAIProviderOptions } from "@ai-sdk/google";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

let globalStreamContext: any | null = null;

const sseHeaders: HeadersInit = {
  "Content-Type": "text/event-stream; charset=utf-8",
  "Cache-Control": "no-cache, no-transform",
  Connection: "keep-alive",
  "X-Accel-Buffering": "no",
};

export const getStreamContext = () => {
  if (!globalStreamContext) {
    try {
      globalStreamContext = createResumableStreamContext({ waitUntil: after });
    } catch (error: any) {
      if (
        typeof error?.message === "string" &&
        error.message.includes("REDIS_URL")
      ) {
        console.log(
          " > Resumable streams are disabled due to missing REDIS_URL",
        );
      } else {
        console.warn("Resumable stream context init failed:", error);
      }
    }
  }
  return globalStreamContext;
};

export const createChatHandler = () => {
  return async (req: NextRequest) => {
    let preemptiveTimeout:
      | ReturnType<typeof createPreemptiveTimeout>
      | undefined;

    try {
      let body: any;
      try {
        body = await req.json();
      } catch (error) {
        throw new ChatSDKError(
          "bad_request:api",
          error instanceof Error ? error.message : "Invalid JSON body",
        );
      }
      const {
        messages,
        mode,
        todos,
        chatId,
        regenerate,
        temporary,
        sandboxPreference,
        selectedModel: clientModel,
        customSystemPrompt,
      }: {
        messages: UIMessage[];
        mode: ChatMode;
        chatId: string;
        todos?: Todo[];
        regenerate?: boolean;
        temporary?: boolean;
        sandboxPreference?: SandboxPreference;
        selectedModel?: string;
        customSystemPrompt?: string;
      } = body;

      const activeModel = clientModel || "gpt-5.2-pro-2025-12-11";

      const { userId, subscription } = { userId: "default-user", subscription: "ultra" } as { userId: string, subscription: SubscriptionTier };
      const userLocation = geolocation(req);

      const userStopSignal = new AbortController();
      preemptiveTimeout = createPreemptiveTimeout({
        chatId,
        mode,
        abortController: userStopSignal,
      });

      const { truncatedMessages, chat, isNewChat } = await getMessagesByChatId({
        chatId,
        userId,
        subscription,
        newMessages: messages,
        regenerate,
        isTemporary: temporary,
        mode,
      });

      const baseTodos: Todo[] = getBaseTodosForRequest(
        (chat?.todos as unknown as Todo[]) || [],
        Array.isArray(todos) ? todos : [],
        { isTemporary: !!temporary, regenerate },
      );

      if (!temporary) {
        await handleInitialChatAndUserMessage({
          chatId,
          userId,
          messages: truncatedMessages,
          regenerate,
          chat,
        });
      }

      const rateLimitInfo = await checkRateLimit(userId, mode, subscription);

      const { processedMessages, sandboxFiles: processorSandboxFiles } =
        await processChatMessages({
          messages: truncatedMessages,
          mode,
          subscription,
        });

      const userCustomization = await getUserCustomization({ userId });
      const memoryEnabled = userCustomization?.include_memory_entries ?? true;
      const posthog = PostHogClient();
      const assistantMessageId = uuidv4();

      // Start temp stream coordination for temporary chats
      if (temporary) {
        try {
          await startTempStream({ chatId, userId });
        } catch {
          // Silently continue; temp coordination is best-effort
        }
      }

      // Start cancellation poller (works for both regular and temporary chats)
      let pollerStopped = false;
      const cancellationPoller = createCancellationPoller({
        chatId,
        isTemporary: !!temporary,
        abortController: userStopSignal,
        onStop: () => {
          pollerStopped = true;
        },
      });

      // Track summarization events to add to message parts
      const summarizationParts: UIMessagePart<any, any>[] = [];

      const stream = createUIMessageStream({
        execute: async ({ writer }) => {
          // Send rate limit warning if at or below threshold
          const isPaidUser = subscription !== "free";
          const warningThreshold = isPaidUser ? 10 : 5;

          if (rateLimitInfo.remaining <= warningThreshold) {
            writeRateLimitWarning(writer, {
              remaining: rateLimitInfo.remaining,
              resetTime: rateLimitInfo.resetTime.toISOString(),
              mode,
              subscription,
            });
          }

          const {
            tools,
            getSandbox,
            ensureSandbox,
            getTodoManager,
            getFileAccumulator,
            sandboxManager,
          } = createTools(
            userId,
            writer,
            mode,
            userLocation,
            baseTodos,
            memoryEnabled,
            temporary,
            assistantMessageId,
            subscription,
            sandboxPreference,
            process.env.CONVEX_SERVICE_ROLE_KEY,
          );

          // Get sandbox context for system prompt (only for local sandboxes)
          let sandboxContext: string | null = null;
          if (
            mode === "agent" &&
            "getSandboxContextForPrompt" in sandboxManager
          ) {
            try {
              sandboxContext = await (
                sandboxManager as {
                  getSandboxContextForPrompt: () => Promise<string | null>;
                }
              ).getSandboxContextForPrompt();
            } catch (error) {
              console.warn("Failed to get sandbox context for prompt:", error);
            }
          }

          if (mode === "agent" && processorSandboxFiles && processorSandboxFiles.length > 0) {
            writeUploadStartStatus(writer);
            try {
              await uploadSandboxFiles(processorSandboxFiles, ensureSandbox);
            } finally {
              writeUploadCompleteStatus(writer);
            }
          }

          // Generate title in parallel only for non-temporary new chats
          const titlePromise =
            isNewChat && !temporary
              ? generateTitleFromUserMessageWithWriter(
                processedMessages,
                writer,
              )
              : Promise.resolve(undefined);

          const trackedProvider = createTrackedProvider(
            userId,
            chatId,
            subscription,
            posthog,
          );

          let currentSystemPrompt = customSystemPrompt || await systemPrompt(
            userId,
            mode,
            subscription,
            activeModel as any,
            userCustomization,
            temporary,
            chat?.finish_reason,
            sandboxContext,
          );

          let streamFinishReason: string | undefined;
          // finalMessages will be set in prepareStep if summarization is needed
          // finalMessages will be set in prepareStep if summarization is needed
          let finalMessages = processedMessages;
          let hasSummarized = false;

          let modelMessages = await convertToModelMessages(finalMessages);

          const ensureV1BaseUrl = (hostOrBaseUrl: string | undefined) => {
            if (!hostOrBaseUrl) return "";
            const normalized = hostOrBaseUrl.replace(/\/$/, "");
            if (normalized.endsWith("/v1")) return normalized;
            return `${normalized}/v1`;
          };

          const isNvidiaModel =
            activeModel === "minimax-m2.1" ||
            activeModel === "moonshotai/kimi-k2.5" ||
            activeModel === "stepfun-ai/step-3.5-flash" ||
            activeModel === "z-ai/glm4.7";

          const isBytezModel =
            activeModel === "openai/gpt-4.1" ||
            activeModel === "openai/gpt-4o" ||
            activeModel === "openai/gpt-5.1" ||
            activeModel === "openai/gpt-5";

          const isPlaceholderKey = (value: string) =>
            value === "your-nvidia-api-key" ||
            value === "your-bytez-api-key" ||
            value === "your-openai-api-key" ||
            value === "your-trybons-api-key" ||
            /^your[-_]/i.test(value);

          const rawProviderApiKey = isNvidiaModel
            ? process.env.NVIDIA_API_KEY || ""
            : isBytezModel
              ? process.env.BYTEZ_API_KEY || ""
              : process.env.TRYBONS_API_KEY || process.env.OPENAI_API_KEY || "";

          const providerApiKey = isPlaceholderKey(rawProviderApiKey) ? "" : rawProviderApiKey;

          const providerBaseUrl = isNvidiaModel
            ? ensureV1BaseUrl(process.env.NVIDIA_API_HOST)
            : isBytezModel
              ? ensureV1BaseUrl(process.env.BYTEZ_API_HOST || process.env.BYTEZ_BASE_URL)
              : (process.env.OPENAI_BASE_URL || "").replace(/\/$/, "") ||
                ensureV1BaseUrl(process.env.TRYBONS_API_HOST);

          const providerModelName =
            activeModel === "minimax-m2.1" ? "minimaxai/minimax-m2.1" : activeModel;

          if (!providerApiKey || !providerBaseUrl) {
            writer.write({ type: "start", messageId: assistantMessageId });
            writer.write({ type: "text-start", id: "text" });
            writer.write({
              type: "text-delta",
              id: "text",
              delta:
                isNvidiaModel
                  ? "NVIDIA backend configure nahi hai. .env.local me NVIDIA_API_KEY aur NVIDIA_API_HOST set karo."
                  : isBytezModel
                    ? "BYTEZ backend configure nahi hai. .env.local me BYTEZ_API_KEY aur BYTEZ_API_HOST set karo."
                  : "AI backend configure nahi hai. .env.local me TRYBONS_API_KEY/OPENAI_API_KEY aur OPENAI_BASE_URL set karo.",
            });
            writer.write({ type: "text-end", id: "text" });
            writer.write({ type: "finish", finishReason: "error" });
            return;
          }

          try {
            const preflightUrl = `${providerBaseUrl.replace(/\/$/, "")}/chat/completions`;

            const preflight = await fetch(preflightUrl, {
              method: "POST",
              headers: {
                "content-type": "application/json",
                authorization: `Bearer ${providerApiKey}`,
                ...(isNvidiaModel ? { "x-api-key": providerApiKey } : {}),
                ...(isBytezModel ? { "x-api-key": providerApiKey } : {}),
              },
              body: JSON.stringify({
                model: providerModelName,
                messages: [{ role: "user", content: "ping" }],
                ...(isBytezModel && providerModelName.includes("gpt-5")
                  ? { max_completion_tokens: 16 }
                  : { max_tokens: 16 }),
                stream: false,
              }),
            });

            if (!preflight.ok) {
              const preflightBody = await preflight.text();
              const providerLabel = isNvidiaModel
                ? "NVIDIA"
                : isBytezModel
                  ? "BYTEZ"
                  : "AI";

              const hint =
                preflight.status === 401
                  ? providerLabel === "NVIDIA"
                    ? " (check NVIDIA_API_KEY / NVIDIA_API_HOST, then restart dev server)"
                    : providerLabel === "BYTEZ"
                      ? " (check BYTEZ_API_KEY / BYTEZ_API_HOST, then restart dev server)"
                      : " (check OPENAI_API_KEY + OPENAI_BASE_URL, then restart dev server)"
                  : "";

              writer.write({ type: "start", messageId: assistantMessageId });
              writer.write({ type: "text-start", id: "text" });
              writer.write({
                type: "text-delta",
                id: "text",
                delta: `${providerLabel} provider error (${preflight.status})${hint}. ${preflightBody.slice(0, 160)}`,
              });
              writer.write({ type: "text-end", id: "text" });
              writer.write({ type: "finish", finishReason: "error" });
              return;
            }
          } catch (error) {
            writer.write({ type: "start", messageId: assistantMessageId });
            writer.write({ type: "text-start", id: "text" });
            writer.write({
              type: "text-delta",
              id: "text",
              delta: "AI provider unreachable. Thodi der baad retry karo.",
            });
            writer.write({ type: "text-end", id: "text" });
            writer.write({ type: "finish", finishReason: "error" });
            return;
          }

          const result = streamText({
            model: trackedProvider.languageModel(activeModel as any),
            system: currentSystemPrompt,
            messages: modelMessages,
            tools: isBytezModel ? undefined : tools,
            maxTokens: 120000,
            abortSignal: userStopSignal.signal,
            experimental_transform: smoothStream({ chunking: "word" }),
            // Fast response settings
            temperature: 0.7,
            topP: 1,
            frequencyPenalty: 0,
            presencePenalty: 0,
            stopWhen: stepCountIs(getMaxStepsForUser(mode, subscription)),
            onChunk: async (chunk) => {
              // Track all tool calls immediately (no throttle)
              if (chunk.chunk.type === "tool-call") {
                const command =
                  chunk.chunk.toolName === "web"
                    ? (chunk.chunk.input as any)?.command
                    : undefined;
                if (posthog) {
                  // Tools that interact with the sandbox environment
                  const sandboxEnvironmentTools = [
                    "run_terminal_cmd",
                    "get_terminal_files",
                    "read_file",
                    "write_file",
                    "search_replace",
                  ];

                  // Determine sandbox type for environment-interacting tools
                  const sandboxType = sandboxEnvironmentTools.includes(
                    chunk.chunk.toolName,
                  )
                    ? sandboxPreference && sandboxPreference !== "e2b"
                      ? "local"
                      : "e2b"
                    : undefined;

                  posthog.capture({
                    distinctId: userId,
                    event: "hackerai-" + (command || chunk.chunk.toolName),
                    properties: {
                      ...(sandboxType && { sandboxType }),
                    },
                  });
                }
              }
            },
            onFinish: async ({ finishReason }) => {
              // If preemptive timeout triggered, use "timeout" as finish reason
              if (preemptiveTimeout?.isPreemptive()) {
                streamFinishReason = "timeout";
              } else {
                streamFinishReason = finishReason;
              }
            },
            onError: async (error) => {
              streamFinishReason = "error";
              if (!userStopSignal.signal.aborted) {
                userStopSignal.abort();
              }
              console.error("Error:", error);
            },
          });

          const thinkTagFilteredStream = (() => {
            const openTag = "<think>";
            const closeTag = "</think>";

            let inThink = false;
            let tail = "";

            const stripThink = (input: string) => {
              const text = tail + input;
              tail = "";

              let out = "";
              let i = 0;

              while (i < text.length) {
                if (text[i] === "<") {
                  const rest = text.slice(i);

                  const mightBeTagPrefix =
                    openTag.startsWith(rest) || closeTag.startsWith(rest);
                  if (mightBeTagPrefix) {
                    tail = rest;
                    break;
                  }

                  if (!inThink && rest.startsWith(openTag)) {
                    inThink = true;
                    i += openTag.length;
                    continue;
                  }

                  if (inThink && rest.startsWith(closeTag)) {
                    inThink = false;
                    i += closeTag.length;
                    continue;
                  }

                  if (!inThink && rest.startsWith(closeTag)) {
                    i += closeTag.length;
                    continue;
                  }
                }

                if (!inThink) {
                  out += text[i];
                }
                i += 1;
              }

              return out;
            };

            return new TransformStream<any, any>({
              transform(chunk, controller) {
                if (chunk && chunk.type === "text-delta" && typeof chunk.delta === "string") {
                  const cleaned = stripThink(chunk.delta);
                  if (!cleaned) return;
                  controller.enqueue({ ...chunk, delta: cleaned });
                  return;
                }
                controller.enqueue(chunk);
              },
            });
          })();

          writer.merge(
            result.toUIMessageStream({
              generateMessageId: () => assistantMessageId,
              onFinish: async ({ messages, isAborted }) => {
                // Clear pre-emptive timeout
                preemptiveTimeout?.clear();

                // Stop cancellation poller
                cancellationPoller.stop();
                pollerStopped = true;

                // Always wait for title generation to complete
                const generatedTitle = await titlePromise;

                if (!temporary) {
                  const mergedTodos = getTodoManager().mergeWith(
                    baseTodos,
                    assistantMessageId,
                  );

                  const shouldPersist = regenerate
                    ? true
                    : Boolean(
                      generatedTitle ||
                      streamFinishReason ||
                      mergedTodos.length > 0,
                    );

                  if (shouldPersist) {
                    // updateChat automatically clears stream state (active_stream_id and canceled_at)
                    await updateChat({
                      chatId,
                      title: generatedTitle,
                      finishReason: streamFinishReason,
                      todos: mergedTodos,
                      defaultModelSlug: mode,
                    });
                  } else {
                    // If not persisting, still need to clear stream state
                    await prepareForNewStream({ chatId });
                  }

                  const newFileIds = getFileAccumulator().getAll();

                  // If user aborted (not pre-emptive) and no files to add, skip message save (frontend already saved)
                  // Pre-emptive aborts should always save to ensure data persistence before timeout
                  if (
                    isAborted &&
                    !preemptiveTimeout?.isPreemptive() &&
                    (!newFileIds || newFileIds.length === 0)
                  ) {
                    return;
                  }

                  // Save messages (either full save or just append extraFileIds)
                  for (const message of messages) {
                    // For assistant messages, prepend summarization parts if any
                    const messageToSave =
                      message.role === "assistant" &&
                        summarizationParts.length > 0
                        ? {
                          ...message,
                          parts: [...summarizationParts, ...message.parts],
                        }
                        : message;

                    // Skip saving messages with no parts or files
                    if (
                      (!messageToSave.parts ||
                        messageToSave.parts.length === 0) &&
                      (!newFileIds || newFileIds.length === 0)
                    ) {
                      continue;
                    }

                    await saveMessage({
                      chatId,
                      userId,
                      message: messageToSave,
                      extraFileIds:
                        message.role === "assistant" ? newFileIds : undefined,
                    });
                  }
                } else {
                  // For temporary chats, send file metadata via stream before cleanup
                  const newFileIds = getFileAccumulator().getAll();

                  if (newFileIds && newFileIds.length > 0) {
                    try {
                      // Fetch file metadata in batch
                      const fileMetadata = await (convex as any).query(
                        (api as any).fileStorage.getFileMetadataByFileIds,
                        {
                          serviceKey: process.env.CONVEX_SERVICE_ROLE_KEY!,
                          fileIds: newFileIds,
                        },
                      );

                      const validFileMetadata = fileMetadata.filter(
                        (f: any) => f !== null,
                      );

                      if (validFileMetadata.length > 0) {
                        writer.write({
                          type: "data-file-metadata",
                          data: {
                            messageId: assistantMessageId,
                            fileDetails: validFileMetadata,
                          },
                        });
                      }
                    } catch (error) {
                      console.error(
                        "Failed to fetch file metadata for temporary chat:",
                        error,
                      );
                    }
                  }

                  // Ensure temp stream row is removed backend-side
                  await deleteTempStreamForBackend({ chatId });
                }
              },
              sendReasoning: true,
            }).pipeThrough(thinkTagFilteredStream),
          );
        },
      });

      // Wrap the UI message stream as SSE
      const sse = stream.pipeThrough(new JsonToSseTransformStream());

      // Create a resumable stream and persist the active stream id (non-temporary chats)
      if (!temporary) {
        const streamContext = getStreamContext();
        if (streamContext) {
          const streamId = uuidv4();
          await startStream({ chatId, streamId });
          const body = await streamContext.resumableStream(streamId, () => sse);
          return new Response(body, { headers: sseHeaders });
        }
      }

      // Temporary chats do not support resumption; return SSE directly
      return new Response(sse, { headers: sseHeaders });
    } catch (error) {
      // Clear timeout if error occurs before onFinish
      preemptiveTimeout?.clear();

      // Handle ChatSDKErrors (including authentication errors)
      if (error instanceof ChatSDKError) {
        return error.toResponse();
      }

      // Handle unexpected errors
      console.error("Unexpected error in chat route:", error);
      const unexpectedError = new ChatSDKError(
        "offline:chat",
        error instanceof Error ? error.message : "Unknown error occurred",
      );
      return unexpectedError.toResponse();
    }
  };
};
