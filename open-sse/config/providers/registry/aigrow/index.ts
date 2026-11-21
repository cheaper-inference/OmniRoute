import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * AIGROW — OpenAI-compatible prepaid gateway for Claude, GPT, Gemini, Grok and
 * Kimi models.
 *
 * Models are discovered from the key-gated `/v1/models` endpoint so the catalog
 * can evolve without requiring a new OmniRoute release.
 */
export const aigrowProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "aigrow",
  alias: "aigrow",
  baseUrl: "https://aigrow.gg/v1/chat/completions",
  modelsUrl: "https://aigrow.gg/v1/models",
  models: [],
  passthroughModels: true,
});
