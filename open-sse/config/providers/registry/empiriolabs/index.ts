import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * EmpirioLabs AI (https://empiriolabs.ai): OpenAI-compatible Chat Completions API
 * with Bearer API keys from https://platform.empiriolabs.ai/dashboard/api-keys.
 *
 * `GET /v1/models` is public, so it cannot tell a valid key from an invalid one;
 * key checks use the authenticated account usage endpoint instead (200 = valid,
 * 401 = invalid). The same catalog also lists image, video, speech and embedding
 * models, so dashboard discovery goes through PROVIDER_MODELS_CONFIG, which keeps
 * only the models that serve chat completions.
 *
 * The seed below is the offline fallback; context lengths and image input are the
 * values the live catalog reports (2026-10-19).
 */
export const empiriolabsProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "empiriolabs",
  alias: "empiriolabs",
  baseUrl: "https://api.empiriolabs.ai/v1/chat/completions",
  testKeyModelsUrl: "https://api.empiriolabs.ai/v1/account/usage?limit=1",
  models: [
    { id: "qwen3-8-flash", name: "Qwen3.8 Flash", contextLength: 1000000, supportsVision: true },
    { id: "qwen3-7-max", name: "Qwen3.7 Max", contextLength: 1000000 },
    { id: "glm-5-3", name: "GLM 5.3", contextLength: 1000000 },
    { id: "kimi-k2-7-code", name: "Kimi K2.7 Code", contextLength: 256000, supportsVision: true },
    { id: "deepseek-v4-pro", name: "DeepSeek V4 Pro", contextLength: 1000000 },
    {
      id: "deepseek-v4-1-flash",
      name: "DeepSeek V4.1 Flash",
      contextLength: 1000000,
      supportsVision: true,
    },
    { id: "minimax-m3", name: "MiniMax M3", contextLength: 1000000, supportsVision: true },
  ],
  passthroughModels: true,
});
