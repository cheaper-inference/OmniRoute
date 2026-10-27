import type { RegistryEntry } from "../../shared.ts";

export const aimlapiProvider: RegistryEntry = {
  id: "aimlapi",
  alias: "aiml",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.aimlapi.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  // Static fallback ONLY — the live catalog (353 chat models) is discovered via
  // PROVIDER_MODELS_CONFIG.aimlapi and supersedes this list whenever the fetch
  // succeeds, so these entries are what a user sees when discovery is down.
  //
  // Each id was verified twice on 2026-09-03: present on the catalog's
  // `openai/chat-completions` surface (as an id or an alias) AND answering 200 to
  // a real POST /v1/chat/completions. Catalog membership alone is not enough —
  // `llama-3.3-70b-versatile` is listed as a chat model, advertises tools and
  // structured output, and still 404s "model does not exist" on inference.
  //
  // All six are the UNPREFIXED spelling, deliberately. A `vendor/model` id in
  // this registry is matched as an exact model id by parseModel(), which then
  // reports provider = null: seeding "anthropic/claude-sonnet-4-6" here makes
  // that string stop resolving to the anthropic provider everywhere in the app,
  // collapsing its context window from 1M to the 128k default and dropping the
  // provider prefix that #8716 exists to preserve. The previous seed was right
  // about this, and the bare aliases carry no such prefix.
  //
  // Anthropic ids use the DOTTED spelling: the catalog carries both
  // `claude-sonnet-4-6` and `claude-sonnet-4.6` as separate entries, and the
  // dashed one advertises only `streaming` in `capabilities` while the dotted one
  // advertises tools, vision, reasoning and structured output. Same for
  // claude-opus-4.7 / 4.8.
  models: [
    { id: "gpt-5", name: "GPT-5 (via AI/ML API)" },
    { id: "claude-sonnet-4.6", name: "Claude 4.6 Sonnet (via AI/ML API)" },
    { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro (via AI/ML API)" },
    { id: "glm-5", name: "GLM-5 (via AI/ML API)" },
    { id: "deepseek-chat", name: "DeepSeek V3 (via AI/ML API)" },
    { id: "mistral-large", name: "Mistral Large (via AI/ML API)" },
  ],
  passthroughModels: true,
};
