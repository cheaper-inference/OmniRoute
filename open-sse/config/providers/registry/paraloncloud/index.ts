import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * ParalonCloud — OpenAI-compatible inference on a decentralized GPU network
 * (https://paraloncloud.com/). It serves its own open-weight models; it does not
 * route to third-party APIs.
 *
 * `GET /v1/models` (Bearer key) is the live catalog and the source of truth at
 * runtime via NAMED_OPENAI_STYLE_PROVIDERS. The seed below is the offline fallback;
 * context lengths are the per-model maxima the catalog reports (2026-10-14).
 */
export const paraloncloudProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "paraloncloud",
  alias: "paraloncloud",
  baseUrl: "https://paraloncloud.com/v1/chat/completions",
  responsesBaseUrl: "https://paraloncloud.com/v1/responses",
  modelsUrl: "https://paraloncloud.com/v1/models",
  models: [
    { id: "qwen3.8-27b", name: "Qwen 3.8 27B", contextLength: 131072 },
    { id: "qwen3-3b", name: "Qwen3 3B", contextLength: 16384 },
  ],
  passthroughModels: true,
});
