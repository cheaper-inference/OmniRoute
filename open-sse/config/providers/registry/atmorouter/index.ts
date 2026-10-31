import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * AtmoRouter (https://atmorouter.dev) — pay-per-token AI API gateway, OpenAI-compatible `/v1`.
 *
 * `GET /v1/models` is public (no key needed), so `modelsUrl` drives dashboard discovery and
 * `passthroughModels` keeps any id from that catalog usable. There is no public
 * `/v1/responses` endpoint (https://atmorouter.dev/docs/compatibility), so no
 * `responsesBaseUrl` is set.
 *
 * Seed list verified 2026-10-25 against the public `GET https://atmorouter.dev/v1/models`:
 * every id below is present there. Kept small on purpose — the catalog carries 160+ ids and
 * changes often.
 */
export const atmorouterProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "atmorouter",
  alias: "atmorouter",
  baseUrl: "https://atmorouter.dev/v1/chat/completions",
  modelsUrl: "https://atmorouter.dev/v1/models",
  models: [
    { id: "cc/claude-sonnet-4-6", name: "Claude Sonnet 4.6" },
    { id: "cc/claude-opus-4-7", name: "Claude Opus 4.7" },
    { id: "cx/gpt-5.6-sol", name: "GPT-5.6 Sol" },
    { id: "cb/gemini-3.1-pro", name: "Gemini 3.1 Pro" },
    { id: "cbcn/glm-5.3", name: "GLM-5.3" },
    { id: "ali/kimi-k2.7-code", name: "Kimi K2.7 Code" },
    { id: "ali/qwen3.8-max", name: "Qwen3.8 Max" },
    { id: "ali/deepseek-v4.1-flash", name: "DeepSeek V4.1 Flash" },
  ],
  passthroughModels: true,
});
