"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useRef, useEffect, useState } from "react";
import { FileDetails } from "@/types/file";
import { Messages } from "./Messages";
import { ChatInput } from "./ChatInput";
import { ComputerSidebar } from "./ComputerSidebar";
import ChatHeader from "./ChatHeader";
import MainSidebar from "./Sidebar";
import Footer from "./Footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useMessageScroll } from "../hooks/useMessageScroll";
import { useChatHandlers } from "../hooks/useChatHandlers";
import { useGlobalState } from "../contexts/GlobalState";
import { useFileUpload } from "../hooks/useFileUpload";
import { useDocumentDragAndDrop } from "../hooks/useDocumentDragAndDrop";
import { normalizeMessages } from "@/lib/utils/message-processor";
import { ChatSDKError } from "@/lib/errors";
import { fetchWithErrorHandlers, convertToUIMessages } from "@/lib/utils";
import { toast } from "sonner";
import type { Todo, ChatMessage, ChatMode, SubscriptionTier } from "@/types";
import { shouldTreatAsMerge } from "@/lib/utils/todo-utils";
import { v4 as uuidv4 } from "uuid";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAutoResume } from "../hooks/useAutoResume";
import { useLatestRef } from "../hooks/useLatestRef";
import { useDataStream } from "./DataStreamProvider";
import { removeDraft } from "@/lib/utils/client-storage";

export const Chat = ({
  chatId: routeChatId,
  autoResume,
}: {
  chatId?: string;
  autoResume: boolean;
}) => {
  const isMobile = useIsMobile();
  const { setDataStream, isAutoResuming, setIsAutoResuming } = useDataStream();
  const [uploadStatus, setUploadStatus] = useState<{
    message: string;
    isUploading: boolean;
  } | null>(null);
  const [rateLimitWarning, setRateLimitWarning] = useState<{
    remaining: number;
    resetTime: Date;
    mode: ChatMode;
    subscription: SubscriptionTier;
  } | null>(null);

  const {
    chatTitle,
    setChatTitle,
    chatMode,
    setChatMode,
    sidebarOpen,
    chatSidebarOpen,
    setChatSidebarOpen,
    mergeTodos,
    setTodos,
    replaceAssistantTodos,
    currentChatId,
    temporaryChatsEnabled,
    setChatReset,
    hasUserDismissedRateLimitWarning,
    setHasUserDismissedRateLimitWarning,
    messageQueue,
    dequeueNext,
    clearQueue,
    queueBehavior,
    todos,
    sandboxPreference,
    setSandboxPreference,
    selectedModel,
    customSystemPrompt,
  } = useGlobalState();

  const [chatId, setChatId] = useState<string>(() => {
    return routeChatId || uuidv4();
  });

  const [isExistingChat, setIsExistingChat] = useState<boolean>(!!routeChatId);
  const shouldFetchMessages = isExistingChat;

  const isExistingChatRef = useLatestRef(isExistingChat);
  const chatModeRef = useLatestRef(chatMode);

  const [awaitingServerChat, setAwaitingServerChat] = useState<boolean>(false);

  const [tempChatFileDetails, setTempChatFileDetails] = useState<
    Map<string, FileDetails[]>
  >(new Map());

  const temporaryChatsEnabledRef = useLatestRef(temporaryChatsEnabled);
  const hasUserDismissedWarningRef = useLatestRef(
    hasUserDismissedRateLimitWarning,
  );
  const todosRef = useLatestRef(todos);
  const sandboxPreferenceRef = useLatestRef(sandboxPreference);

  const hasInitializedModeFromChatRef = useRef(false);

  useEffect(() => {
    if (currentChatId === null) {
      if (routeChatId) {
        return;
      }
      setChatId(uuidv4());
      setIsExistingChat(false);
      setChatTitle(null);
      return;
    }

    if (routeChatId) {
      setChatId(routeChatId);
      setIsExistingChat(true);
      return;
    }
  }, [routeChatId, currentChatId, setChatTitle]);

  const paginatedMessages = { results: [], status: "Exhausted" as const, loadMore: () => {} };
  const chatData = null;

  const initialMessages: ChatMessage[] = [];

  const [isProcessingQueue, setIsProcessingQueue] = useState(false);
  const isSendingNowRef = useRef(false);
  const hasManuallyStoppedRef = useRef(false);

  const {
    messages,
    sendMessage,
    setMessages,
    status,
    stop,
    error,
    regenerate,
    resumeStream,
  } = useChat({
    id: chatId,
    messages: initialMessages,
    experimental_throttle: 100,
    generateId: () => uuidv4(),

    transport: new DefaultChatTransport({
      api: "/api/chat",
      fetch: async (input, init) => {
        const url =
          input === "/api/chat" && chatModeRef.current === "agent"
            ? "/api/agent"
            : input;
        return fetchWithErrorHandlers(url, init);
      },
      prepareSendMessagesRequest: ({ id, messages, body }) => {
        const {
          messages: normalizedMessages,
          lastMessage,
          hasChanges,
        } = normalizeMessages(messages as ChatMessage[]);
        if (hasChanges) {
          setMessages(normalizedMessages);
        }

        const isTemporaryChat =
          !isExistingChatRef.current && temporaryChatsEnabledRef.current;

        const stripUrlsFromMessages = (msgs: ChatMessage[]): ChatMessage[] => {
          return msgs.map((msg) => {
            if (!msg.parts || msg.parts.length === 0) return msg;
            const strippedParts = msg.parts.map((part: any) => {
              if (part.type === "file" && "url" in part) {
                const { url, ...partWithoutUrl } = part;
                return partWithoutUrl;
              }
              return part;
            });
            return {
              ...msg,
              parts: strippedParts,
            };
          });
        };

        const messagesToSend = isTemporaryChat
          ? normalizedMessages
          : lastMessage;
        const messagesWithoutUrls = stripUrlsFromMessages(messagesToSend);

        return {
          body: {
            chatId: id,
            messages: messagesWithoutUrls,
            selectedModel,
            customSystemPrompt,
            ...body,
          },
        };
      },
    }),

    onData: (dataPart) => {
      setDataStream((ds) => (ds ? [...ds, dataPart] : []));
      if (dataPart.type === "data-title")
        setChatTitle((dataPart.data as { chatTitle: string }).chatTitle);
      if (dataPart.type === "data-upload-status") {
        const uploadData = dataPart.data as {
          message: string;
          isUploading: boolean;
        };
        setUploadStatus(uploadData.isUploading ? uploadData : null);
      }
      if (dataPart.type === "data-rate-limit-warning") {
        const warningData = dataPart.data as {
          remaining: number;
          resetTime: string;
          mode: ChatMode;
          subscription: SubscriptionTier;
        };

        if (!hasUserDismissedWarningRef.current) {
          setRateLimitWarning({
            remaining: warningData.remaining,
            resetTime: new Date(warningData.resetTime),
            mode: warningData.mode,
            subscription: warningData.subscription,
          });
        }
      }
      if (dataPart.type === "data-file-metadata") {
        const fileData = dataPart.data as {
          messageId: string;
          fileDetails: FileDetails[];
        };

        setTempChatFileDetails((prev) => {
          const next = new Map(prev);
          next.set(fileData.messageId, fileData.fileDetails);
          return next;
        });
      }
      if (dataPart.type === "data-sandbox-fallback") {
        const fallbackData = dataPart.data as {
          occurred: boolean;
          reason: "connection_unavailable" | "no_local_connections";
          requestedPreference: string;
          actualSandbox: string;
          actualSandboxName?: string;
        };

        setSandboxPreference(fallbackData.actualSandbox);

        const message =
          fallbackData.reason === "no_local_connections"
            ? `Local sandbox unavailable. Using ${fallbackData.actualSandboxName || "Cloud"}.`
            : `Selected sandbox disconnected. Switched to ${fallbackData.actualSandboxName || "Cloud"}.`;
        toast.info(message, { duration: 5000 });
      }
    },
    onToolCall: ({ toolCall }) => {
      if (toolCall.toolName === "todo_write" && toolCall.input) {
        const todoInput = toolCall.input as { merge?: boolean; todos: Todo[] };
        if (!todoInput.todos) return;
        const lastAssistant = [...messages]
          .reverse()
          .find((m) => m.role === "assistant");
        const lastAssistantId = lastAssistant?.id;

        const treatAsMerge = shouldTreatAsMerge(
          todoInput.merge,
          todoInput.todos,
        );

        if (!treatAsMerge) {
          replaceAssistantTodos(todoInput.todos, lastAssistantId);
        } else {
          mergeTodos(todoInput.todos);
        }
      }
    },
    onFinish: () => {
      setIsAutoResuming(false);
      setAwaitingServerChat(false);
      setUploadStatus(null);
      const isTemporaryChat =
        !isExistingChatRef.current && temporaryChatsEnabledRef.current;
      if (!isExistingChatRef.current && !isTemporaryChat) {
        setIsExistingChat(true);
        removeDraft("new");
      }
    },
    onError: (error) => {
      setIsAutoResuming(false);
      setAwaitingServerChat(false);
      setUploadStatus(null);
      if (error instanceof ChatSDKError && error.type !== "rate_limit") {
        toast.error(error.message);
      }
    },
  });

  useAutoResume({
    autoResume,
    initialMessages,
    resumeStream,
    setMessages,
  });

  useEffect(() => {
    const reset = () => {
      setMessages([]);
      setIsExistingChat(false);
      setChatId(uuidv4());
      setChatTitle(null);
      setTodos([]);
      setAwaitingServerChat(false);
      setUploadStatus(null);
    };
    setChatReset(reset);
    return () => setChatReset(null);
  }, [setChatReset, setMessages, setChatTitle, setTodos]);

  useEffect(() => {
    hasInitializedModeFromChatRef.current = false;
  }, [chatId]);

  const { scrollRef, contentRef, scrollToBottom, isAtBottom } =
    useMessageScroll();

  const {
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  } = useFileUpload(chatMode);

  useEffect(() => {
    if (isExistingChat && messages.length > 0) {
      scrollToBottom({ instant: true, force: true });
    }
  }, [messages.length, scrollToBottom, isExistingChat]);

  useEffect(() => {
    if (
      status === "ready" &&
      messageQueue.length > 0 &&
      !isProcessingQueue &&
      !isSendingNowRef.current &&
      !hasManuallyStoppedRef.current &&
      chatMode === "agent" &&
      queueBehavior === "queue"
    ) {
      setIsProcessingQueue(true);
      const nextMessage = dequeueNext();

      if (nextMessage) {
        sendMessage(
          {
            text: nextMessage.text,
            files: nextMessage.files
              ? nextMessage.files.map((f) => ({
                  type: "file" as const,
                  filename: f.file.name,
                  mediaType: f.file.type,
                  url: f.url,
                  fileId: f.fileId,
                }))
              : undefined,
          },
          {
            body: {
              mode: chatMode,
              todos: todosRef.current,
              temporary: temporaryChatsEnabledRef.current,
              sandboxPreference: sandboxPreferenceRef.current,
              selectedModel,
              customSystemPrompt,
            },
          },
        );
      }

      setTimeout(() => setIsProcessingQueue(false), 100);
    }
  }, [
    status,
    messageQueue.length,
    isProcessingQueue,
    chatMode,
    dequeueNext,
    sendMessage,
    temporaryChatsEnabledRef,
    queueBehavior,
    selectedModel,
    customSystemPrompt,
  ]);

  const messageQueueRef = useRef(messageQueue);
  useEffect(() => {
    messageQueueRef.current = messageQueue;
  }, [messageQueue]);

  useEffect(() => {
    if (chatMode === "ask" && messageQueueRef.current.length > 0) {
      clearQueue();
    }
  }, [chatMode, clearQueue]);

  useEffect(() => {
    return () => {
      if (messageQueueRef.current.length > 0) {
        clearQueue();
      }
    };
  }, [chatId, clearQueue]);

  useDocumentDragAndDrop({
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  });

  const {
    handleSubmit,
    handleStop,
    handleRegenerate,
    handleRetry,
    handleEditMessage,
    handleSendNow,
  } = useChatHandlers({
    chatId,
    messages,
    sendMessage,
    stop,
    regenerate,
    setMessages,
    isExistingChat,
    activateChatLocally: () => {
      setIsExistingChat(true);
      setAwaitingServerChat(true);
    },
    status,
    isSendingNowRef,
    hasManuallyStoppedRef,
  });

  const handleScrollToBottom = () => scrollToBottom({ force: true });

  const handleDismissRateLimitWarning = () => {
    setRateLimitWarning(null);
    setHasUserDismissedRateLimitWarning(true);
  };

  const handleBranchMessage = async (messageId: string) => {
    window.location.href = `/c/${uuidv4()}`;
  };

  const hasMessages = messages.length > 0;
  const showChatLayout = hasMessages || isExistingChat;

  const isTempChat = !isExistingChat && temporaryChatsEnabled;

  const isChatNotFound =
    isExistingChat &&
    chatData === null &&
    shouldFetchMessages &&
    !awaitingServerChat;

  return (
    <div className="h-full bg-background flex flex-col overflow-hidden">
      <div className="flex w-full h-full overflow-hidden">
        {!isMobile && (
          <div
            data-testid="sidebar"
            className={`transition-all duration-300 ${
              chatSidebarOpen ? "w-72 flex-shrink-0" : "w-12 flex-shrink-0"
            }`}
          >
            <SidebarProvider
              open={chatSidebarOpen}
              onOpenChange={setChatSidebarOpen}
              defaultOpen={true}
            >
              <MainSidebar />
            </SidebarProvider>
          </div>
        )}

        <div className="flex flex-1 min-w-0 relative">
          <div className="flex flex-col flex-1 min-w-0">
            <ChatHeader
              hasMessages={hasMessages}
              hasActiveChat={isExistingChat}
              chatTitle={chatTitle}
              id={routeChatId}
              chatData={chatData}
              chatSidebarOpen={chatSidebarOpen}
              isExistingChat={isExistingChat}
              isChatNotFound={isChatNotFound}
              branchedFromChatTitle={null}
              chatMode={chatMode}
              onModeChange={setChatMode}
            />

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 relative scroll-smooth selection:bg-primary/20"
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div ref={contentRef} className="max-w-4xl mx-auto px-4 py-8">
                <Messages
                  messages={messages}
                  status={status}
                  error={error}
                  onRetry={handleRetry}
                  onRegenerate={handleRegenerate}
                  onEditMessage={handleEditMessage}
                  onBranchMessage={handleBranchMessage}
                  tempChatFileDetails={tempChatFileDetails}
                />
              </div>

              {!isAtBottom && hasMessages && (
                <button
                  onClick={handleScrollToBottom}
                  className="fixed bottom-32 right-8 p-2 rounded-full bg-background border shadow-lg hover:bg-muted transition-colors z-20"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </button>
              )}
            </div>

            <div className="flex-shrink-0 bg-background/80 backdrop-blur-sm border-t p-4 pb-safe">
              <div className="max-w-4xl mx-auto">
                <ChatInput
                  onSubmit={handleSubmit}
                  onStop={handleStop}
                  onSendNow={handleSendNow}
                  status={status}
                  rateLimitWarning={rateLimitWarning}
                  onDismissRateLimitWarning={handleDismissRateLimitWarning}
                  chatId={chatId}
                />
                <Footer />
              </div>
            </div>
          </div>

          {!isMobile && sidebarOpen && (
            <div className="w-96 border-l bg-muted/30 overflow-hidden flex flex-col">
              <ComputerSidebar />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};