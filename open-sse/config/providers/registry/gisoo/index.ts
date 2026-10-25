import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * Gisoo (https://gisoo.pro) — prepaid multi-model relay, OpenAI-compatible `/api/v1`.
 *
 * `GET https://gisoo.pro/api/v1/models` is public (no key) and lists the whole catalog with
 * `type`, `context_length`, `max_output_tokens` and `capabilities`, so `modelsUrl` drives
 * dashboard discovery and `passthroughModels` keeps every other id usable. Prepaid credit only:
 * there is no free tier.
 *
 * Seed ids verified 2026-10-25 against that endpoint (all `type: "chat"`, `is_free: false`).
 * Kept small on purpose — the live catalog also carries image, audio, video, music and
 * embedding ids.
 */
export const gisooProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "gisoo",
  alias: "gisoo",
  baseUrl: "https://gisoo.pro/api/v1/chat/completions",
  modelsUrl: "https://gisoo.pro/api/v1/models",
  models: [
    { id: "claude-opus-5-5", name: "Claude Opus 5.5" },
    { id: "claude-sonnet-5-5", name: "Claude Sonnet 5.5" },
    { id: "claude-haiku-5-5", name: "Claude Haiku 5.5" },
    { id: "gpt-5.6-sol", name: "GPT-5.6 Sol" },
    { id: "gpt-5.5", name: "GPT-5.5" },
    { id: "gemini-3.8-flash", name: "Gemini 3.8 Flash" },
    { id: "gemini-3.1-pro-preview", name: "Gemini 3.1 Pro (Preview)" },
    { id: "deepseek-v4-pro", name: "DeepSeek V4 Pro" },
    { id: "deepseek-flash", name: "DeepSeek Flash" },
  ],
  passthroughModels: true,
});
