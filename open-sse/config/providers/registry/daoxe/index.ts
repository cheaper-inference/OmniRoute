import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * DaoXE (https://daoxe.com) — QuantumNous New-API gateway, OpenAI-compatible `/v1`.
 *
 * `GET /v1/models` is API-key gated (401 "Invalid token" without a key) and returns the
 * account-scoped catalog, so `modelsUrl` drives dashboard discovery and `passthroughModels`
 * keeps every other id usable.
 *
 * Seed list verified 2026-10-16 against the public New-API pricing endpoint
 * (`GET https://api.daoxe.com/api/pricing`, no auth): each id below is listed there with
 * `"default"` in `enable_groups` and `"openai"` in `supported_endpoint_types`. Kept small on
 * purpose — the listing carries 600+ ids (image/video/rerank variants included) and model
 * availability depends on the key's group.
 */
export const daoxeProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "daoxe",
  alias: "daoxe",
  baseUrl: "https://api.daoxe.com/v1/chat/completions",
  modelsUrl: "https://api.daoxe.com/v1/models",
  models: [
    { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6" },
    { id: "claude-opus-4-8", name: "Claude Opus 4.8" },
    { id: "claude-haiku-4-5-20251001", name: "Claude Haiku 4.5" },
    { id: "gpt-5.5", name: "GPT-5.5" },
    { id: "gpt-5.4", name: "GPT-5.4" },
    { id: "gemini-3.1-pro-preview", name: "Gemini 3.1 Pro Preview" },
    { id: "grok-4.5", name: "Grok 4.5" },
    { id: "grok-4.3", name: "Grok 4.3" },
    { id: "kimi-k2.5", name: "Kimi K2.5" },
  ],
  passthroughModels: true,
});
