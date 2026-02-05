import { openai } from "@ai-sdk/openai";
import { customProvider } from "ai";

const ensureV1BaseUrl = (hostOrBaseUrl: string): string => {
  const normalized = hostOrBaseUrl.replace(/\/$/, "");
  if (normalized.endsWith("/v1")) return normalized;
  return `${normalized}/v1`;
};

const apiKey = process.env.TRYBONS_API_KEY || process.env.OPENAI_API_KEY || "";
const baseUrl = ensureV1BaseUrl(
  process.env.TRYBONS_API_HOST ||
    process.env.OPENAI_BASE_URL ||
    "https://go.trybons.ai/v1",
);

const customOpenAI = (modelName: string) => openai(modelName, {
  apiKey,
  baseURL: baseUrl,
});

const baseProviders = {
  "ask-model": customOpenAI("gpt-5.2-pro-2025-12-11"),
  "ask-model-free": customOpenAI("gpt-5.2-pro-2025-12-11"),
  "ask-vision-model": customOpenAI("gpt-5.2-pro-2025-12-11"),
  "ask-vision-model-for-pdfs": customOpenAI("gpt-5.2-pro-2025-12-11"),
  "agent-model": customOpenAI("gpt-5.2-pro-2025-12-11"),
  "agent-vision-model": customOpenAI("gpt-5.2-pro-2025-12-11"),
  "title-generator-model": customOpenAI("gpt-5.2-pro-2025-12-11"),
  "summarization-model": customOpenAI("gpt-5.2-pro-2025-12-11"),
  "claude-opus-4-5-20251101": customOpenAI("claude-opus-4-5-20251101"),
  "gemini-3-pro-preview": customOpenAI("gemini-3-pro-preview"),
  "gpt-5.2-pro-2025-12-11": customOpenAI("gpt-5.2-pro-2025-12-11"),
  "o3-pro-2025-06-10": customOpenAI("o3-pro-2025-06-10"),
  "minimax-m2.1": customOpenAI("minimax-m2.1"),
  "moonshotai/kimi-k2.5": customOpenAI("moonshotai/kimi-k2.5"),
  "stepfun-ai/step-3.5-flash": customOpenAI("stepfun-ai/step-3.5-flash"),
  "z-ai/glm4.7": customOpenAI("z-ai/glm4.7"),
  "openai/gpt-4.1": customOpenAI("openai/gpt-4.1"),
  "openai/gpt-4o": customOpenAI("openai/gpt-4o"),
  "openai/gpt-5.1": customOpenAI("openai/gpt-5.1"),
  "openai/gpt-5": customOpenAI("openai/gpt-5"),
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
