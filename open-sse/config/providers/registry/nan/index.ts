import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * NaN.Builders (https://nan.builders) — OpenAI-compatible `/v1` API (chat, vision,
 * embeddings, audio, images, rerank). API keys come from https://cloud.nan.builders.
 *
 * The non-chat modalities live in their own registries (embeddingRegistry, audioRegistry,
 * imageRegistryData, rerankRegistry). `GET /v1/models` is key-gated, so `modelsUrl` drives
 * dashboard discovery; the seed below is only the offline fallback and stays small because
 * the vendor's model aliases (`glm5.3`, `qwen3.8-flash`, ...) move often.
 */
export const nanProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "nan",
  alias: "nan",
  baseUrl: "https://api.nan.builders/v1/chat/completions",
  modelsUrl: "https://api.nan.builders/v1/models",
  models: [
    { id: "deepseek-v4-flash", name: "DeepSeek V4 Flash" },
    { id: "mimo-v2.5", name: "MiMo V2.5" },
    { id: "mimo-v2.6-flash", name: "MiMo V2.6 Flash" },
    { id: "qwen3.8-flash", name: "Qwen3.8 Flash" },
    { id: "qwen3.6", name: "Qwen3.6" },
    { id: "glm5.3", name: "GLM 5.3" },
    { id: "glm5.3-flash", name: "GLM 5.3 Flash" },
    { id: "gemma4", name: "Gemma 4" },
  ],
});
