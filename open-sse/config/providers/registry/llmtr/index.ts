import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * LLMTR (https://llmtr.com) — OpenAI-compatible gateway.
 *
 * `GET /v1/models` is public (no key) and returns the catalog, including pricing
 * and `supported_operations`. `modelsUrl` drives dashboard discovery and
 * `passthroughModels` keeps every other id usable.
 *
 * Seed list verified 2026-10-29 against `GET https://llmtr.com/v1/models` (no
 * auth): each id below lists `CHAT_COMPLETIONS` in `supported_operations`. Kept
 * small on purpose — the listing carries 380+ ids (image, video, embeddings, and
 * responses-only rows included) and availability still depends on the key.
 *
 * Some upstream ids already start with `llmtr/` (for example
 * `llmtr/qwen3-8-27b`). Address them as `llmtr/<upstream id>`
 * (`llmtr/llmtr/qwen3-8-27b`): the first segment selects this provider and the
 * remainder is sent upstream unchanged.
 */
export const llmtrProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "llmtr",
  alias: "llmtr",
  baseUrl: "https://llmtr.com/v1/chat/completions",
  modelsUrl: "https://llmtr.com/v1/models",
  models: [
    { id: "qwen/qwen3.8-27b-free", name: "Qwen3.8 27B" },
    { id: "llmtr/qwen3-8-27b", name: "Qwen 3.8 27B" },
    { id: "openai/gpt-5.4", name: "GPT-5.4" },
    { id: "anthropic/claude-sonnet-4.6", name: "Claude Sonnet 4.6" },
    { id: "google/gemini-3.1-pro-preview", name: "Gemini 3.1 Pro Preview" },
    { id: "deepseek/deepseek-v4-pro", name: "DeepSeek V4 Pro" },
    { id: "moonshot/kimi-k2.6", name: "Kimi K2.6" },
    { id: "zai/glm-5.3", name: "GLM-5.3" },
    { id: "nvidia/nemotron-3-ultra-550b-a55b", name: "Nemotron 3 Ultra 550B A55B" },
  ],
  passthroughModels: true,
});
