import type { RegistryEntry } from "../../shared.ts";

/**
 * Liquid AI.
 *
 * The OpenAI-compatible API lives at api.liquid.ai/openai/v1
 * (https://docs.liquid.ai/api/quickstart). On 2026-11-26 a new key answered 401
 * "Could not validate credentials" on the previous inference.liquid.ai host and 200
 * here, so validation, model discovery and chat all failed against the old host.
 * Decisions models (d1, d1.2, ...) use the separate System One API, not this one.
 */
export const liquidProvider: RegistryEntry = {
  id: "liquid",
  alias: "liquid",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.liquid.ai/openai/v1/chat/completions",
  modelsUrl: "https://api.liquid.ai/openai/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  // Chat models listed by GET /openai/v1/models on 2026-11-26 (the audio and omni
  // models it also lists are not chat models).
  models: [
    { id: "lfm3-1.7b", name: "LFM3 1.7B" },
    { id: "lfm3-vl-2b", name: "LFM3 VL 2B" },
    { id: "lfm2.5-24b-a2b", name: "LFM2.5 24B A2B" },
  ],
};
