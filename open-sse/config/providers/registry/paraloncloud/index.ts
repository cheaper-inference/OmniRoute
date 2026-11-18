import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * ParalonCloud (https://paraloncloud.com) — OpenAI-compatible `/v1` host for chat and
 * embeddings. API keys come from https://paraloncloud.com/console.
 *
 * Embeddings (`multilingual-e5-small`) live in embeddingRegistry. `GET /v1/models` is
 * key-gated, so `modelsUrl` drives key validation and dashboard discovery; the seed below
 * is only the offline fallback.
 */
export const paraloncloudProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "paraloncloud",
  alias: "paralon",
  baseUrl: "https://paraloncloud.com/v1/chat/completions",
  modelsUrl: "https://paraloncloud.com/v1/models",
  models: [
    { id: "qwen3.8-27b", name: "Qwen3.8 27B" },
    { id: "qwen3-3b", name: "Qwen3 3B" },
  ],
});
