import { openai } from "@ai-sdk/openai";
import { customProvider } from "ai";

const apiKey = "sk_cr_5TfD2yaX7Do6sa4qt5NnWwH4YfpeT4nUmAE9PEeUrsPS";
const baseUrl = "https://go.trybons.ai/v1";

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
};

export type ModelName = keyof typeof baseProviders;

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
