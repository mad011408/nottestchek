import { createOpenAI } from "@ai-sdk/openai";
import { customProvider } from "ai";

const sanitizeEnvValue = (value?: string): string =>
  (value ?? "").trim().replace(/`/g, "");

const ensureV1BaseUrl = (hostOrBaseUrl: string): string => {
  const normalized = sanitizeEnvValue(hostOrBaseUrl).replace(/\/$/, "");
  if (normalized.endsWith("/v1")) return normalized;
  return `${normalized}/v1`;
};

const isPlaceholderKey = (value: string) =>
  value === "your-nvidia-api-key" ||
  value === "your-bytez-api-key" ||
  value === "your-openai-api-key" ||
  value === "your-trybons-api-key" ||
  /^your[-_]/i.test(value);

const createChatModel = ({
  modelId,
  baseURL,
  apiKey,
  extraHeaders,
}: {
  modelId: string;
  baseURL: string;
  apiKey: string;
  extraHeaders?: Record<string, string>;
}) => {
  const cleanKey = isPlaceholderKey(apiKey) ? "" : sanitizeEnvValue(apiKey);
  const provider = createOpenAI({
    apiKey: cleanKey,
    baseURL: ensureV1BaseUrl(baseURL),
    headers: extraHeaders,
  });
  return provider.chat(modelId);
};

const getBonsaiConfig = () => {
  const apiKey = sanitizeEnvValue(
    process.env.TRYBONS_API_KEY || process.env.OPENAI_API_KEY || "",
  );
  const baseURL = sanitizeEnvValue(
    process.env.TRYBONS_API_HOST ||
      process.env.OPENAI_BASE_URL ||
      "https://go.trybons.ai/v1",
  );
  return { apiKey, baseURL };
};

const getBytezConfig = () => {
  const apiKey = sanitizeEnvValue(process.env.BYTEZ_API_KEY || "");
  const baseURL = sanitizeEnvValue(
    process.env.BYTEZ_API_HOST || process.env.BYTEZ_BASE_URL || "",
  );
  return { apiKey, baseURL };
};

const getNvidiaConfig = () => {
  const apiKey = sanitizeEnvValue(process.env.NVIDIA_API_KEY || "");
  const baseURL = sanitizeEnvValue(process.env.NVIDIA_API_HOST || "");
  return { apiKey, baseURL };
};

const nvidiaModelId = (modelName: string) =>
  modelName === "minimax-m2.1" ? "minimaxai/minimax-m2.1" : modelName;

const baseProviders = {
  "ask-model": createChatModel({
    modelId: "gpt-5.2-pro-2025-12-11",
    ...getBonsaiConfig(),
  }),
  "ask-model-free": createChatModel({
    modelId: "gpt-5.2-pro-2025-12-11",
    ...getBonsaiConfig(),
  }),
  "ask-vision-model": createChatModel({
    modelId: "gpt-5.2-pro-2025-12-11",
    ...getBonsaiConfig(),
  }),
  "ask-vision-model-for-pdfs": createChatModel({
    modelId: "gpt-5.2-pro-2025-12-11",
    ...getBonsaiConfig(),
  }),
  "agent-model": createChatModel({
    modelId: "gpt-5.2-pro-2025-12-11",
    ...getBonsaiConfig(),
  }),
  "agent-vision-model": createChatModel({
    modelId: "gpt-5.2-pro-2025-12-11",
    ...getBonsaiConfig(),
  }),
  "title-generator-model": createChatModel({
    modelId: "gpt-5.2-pro-2025-12-11",
    ...getBonsaiConfig(),
  }),
  "summarization-model": createChatModel({
    modelId: "gpt-5.2-pro-2025-12-11",
    ...getBonsaiConfig(),
  }),

  "claude-opus-4-5-20251101": createChatModel({
    modelId: "claude-opus-4-5-20251101",
    ...getBonsaiConfig(),
  }),
  "gemini-3-pro-preview": createChatModel({
    modelId: "gemini-3-pro-preview",
    ...getBonsaiConfig(),
  }),
  "gpt-5.2-pro-2025-12-11": createChatModel({
    modelId: "gpt-5.2-pro-2025-12-11",
    ...getBonsaiConfig(),
  }),
  "o3-pro-2025-06-10": createChatModel({
    modelId: "o3-pro-2025-06-10",
    ...getBonsaiConfig(),
  }),

  "minimax-m2.1": createChatModel({
    modelId: nvidiaModelId("minimax-m2.1"),
    ...getNvidiaConfig(),
    extraHeaders: { "x-api-key": getNvidiaConfig().apiKey },
  }),
  "moonshotai/kimi-k2.5": createChatModel({
    modelId: nvidiaModelId("moonshotai/kimi-k2.5"),
    ...getNvidiaConfig(),
    extraHeaders: { "x-api-key": getNvidiaConfig().apiKey },
  }),
  "stepfun-ai/step-3.5-flash": createChatModel({
    modelId: nvidiaModelId("stepfun-ai/step-3.5-flash"),
    ...getNvidiaConfig(),
    extraHeaders: { "x-api-key": getNvidiaConfig().apiKey },
  }),
  "z-ai/glm4.7": createChatModel({
    modelId: nvidiaModelId("z-ai/glm4.7"),
    ...getNvidiaConfig(),
    extraHeaders: { "x-api-key": getNvidiaConfig().apiKey },
  }),

  "openai/gpt-4.1": createChatModel({
    modelId: "openai/gpt-4.1",
    ...getBytezConfig(),
    extraHeaders: { "x-api-key": getBytezConfig().apiKey },
  }),
  "openai/gpt-4o": createChatModel({
    modelId: "openai/gpt-4o",
    ...getBytezConfig(),
    extraHeaders: { "x-api-key": getBytezConfig().apiKey },
  }),
  "openai/gpt-5.1": createChatModel({
    modelId: "openai/gpt-5.1",
    ...getBytezConfig(),
    extraHeaders: { "x-api-key": getBytezConfig().apiKey },
  }),
  "openai/gpt-5": createChatModel({
    modelId: "openai/gpt-5",
    ...getBytezConfig(),
    extraHeaders: { "x-api-key": getBytezConfig().apiKey },
  }),
};

export type ModelName = keyof typeof baseProviders;

const DEFAULT_MODEL_CUTOFF_DATE = "2024-01-01";

const parseCutoffDateFromModelId = (modelId: string): string | null => {
  const dashedMatch = modelId.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (dashedMatch) {
    const [, year, month, day] = dashedMatch;
    return `${year}-${month}-${day}`;
  }

  const compactMatch = modelId.match(/(\d{4})(\d{2})(\d{2})/);
  if (compactMatch) {
    const [, year, month, day] = compactMatch;
    return `${year}-${month}-${day}`;
  }

  return null;
};

export const getModelCutoffDate = (modelName: ModelName): string => {
  const canonicalModelId =
    modelName === "ask-model" ||
    modelName === "ask-model-free" ||
    modelName === "ask-vision-model" ||
    modelName === "ask-vision-model-for-pdfs" ||
    modelName === "agent-model" ||
    modelName === "agent-vision-model" ||
    modelName === "title-generator-model" ||
    modelName === "summarization-model"
      ? "gpt-5.2-pro-2025-12-11"
      : modelName;

  return parseCutoffDateFromModelId(canonicalModelId) ?? DEFAULT_MODEL_CUTOFF_DATE;
};

export const myProvider = customProvider({
  languageModels: baseProviders,
});

export const createTrackedProvider = (
  userId?: string,
  conversationId?: string,
  subscription?: any,
  phClient?: any | null,
) => {
  return myProvider;
};
