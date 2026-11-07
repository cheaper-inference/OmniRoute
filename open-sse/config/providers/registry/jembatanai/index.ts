import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * JembatanAI (https://jembatanai.com): hosted multi-model gateway, OpenAI-compatible at
 * `https://freeai.jembatanai.com/v1`. It also serves Anthropic Messages at
 * `https://freeai.jembatanai.com/v1/messages`; only the OpenAI path is wired here.
 *
 * `GET /v1/models` is key-gated and returns the ids that key may call, so the provider is
 * on `NAMED_OPENAI_STYLE_PROVIDERS` for live discovery and `passthroughModels` keeps every
 * other id usable. The seed below is the base catalog every key (trial included) can call,
 * as published in JembatanAI's own docs; it is only the offline fallback.
 */
export const jembatanaiProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "jembatanai",
  alias: "jembatanai",
  baseUrl: "https://freeai.jembatanai.com/v1/chat/completions",
  modelsUrl: "https://freeai.jembatanai.com/v1/models",
  models: [
    { id: "anthropic/claude-sonnet-5", name: "Claude Sonnet 5" },
    { id: "anthropic/claude-haiku-5.5", name: "Claude Haiku 5.5" },
    { id: "openai/gpt-6-luna", name: "GPT-6 Luna" },
    { id: "z-ai/glm-5.2", name: "GLM-5.2" },
    { id: "deepseek/deepseek-v4.1-flash", name: "DeepSeek V4.1 Flash" },
    { id: "deepseek/deepseek-v4-pro-0813", name: "DeepSeek V4 Pro" },
    { id: "minimax/minimax-m3.1-flash", name: "MiniMax M3.1 Flash" },
    { id: "z-ai/glm-5.3-flash", name: "GLM-5.3 Flash" },
  ],
  passthroughModels: true,
});
