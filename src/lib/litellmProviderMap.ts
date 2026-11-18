/**
 * LiteLLM `litellm_provider` bucket → OmniRoute pricing aliases, shared by the LiteLLM
 * sync (writes) and the pricing layers (reads).
 */

export const LITELLM_PROVIDER_MAP: Record<string, string[]> = {
  openai: ["openai", "cx"],
  anthropic: ["anthropic", "cc"],
  vertex_ai: ["gemini"],
  "vertex_ai-anthropic_models": ["anthropic"],
  google: ["gemini"],
  // Registry ALIAS, not registry id — pricingSync writes/reads are keyed by
  // alias everywhere else (see getPricingForModel(provider, model) callers).
  // Four of these previously used the provider's `id` string, which is not a
  // valid pricing-lookup key for that provider and, worse, for `deepseek` a
  // real (but wrong) alias existed under that string — silently routing
  // DeepSeek's synced pricing onto Qoder (open-sse/config/providers/registry/
  // qoder/index.ts, alias "if", an unrelated third-party API) instead of
  // DeepSeek (alias "ds"). `bedrock`/`bedrock_converse` and `cloudflare`
  // pointed at their provider's `id` ("kiro", "cloudflare-ai") rather than
  // its `alias` ("kr", "cf") — not wrong-provider, just a dead key nothing
  // downstream ever looks up, so those two providers silently never received
  // synced pricing at all.
  deepseek: ["ds"],
  groq: ["groq"],
  together_ai: ["openrouter"],
  bedrock: ["kr"],
  fireworks_ai: ["fireworks"],
  cerebras: ["cerebras"],
  nvidia_nim: ["nvidia"],
  siliconflow: ["siliconflow"],
  "vertex_ai-language_models": ["gemini"],
  "vertex_ai-mistral_models": ["mistral"],
  gemini: ["gemini"],
  bedrock_converse: ["kr"],
  cloudflare: ["cf"],
  // #18598: LiteLLM's bucket uses an underscore; the registry alias is `opencode-go`.
  opencode_go: ["opencode-go"],
  // stability-ai has no chat-completions registry entry (image-only:
  // open-sse/config/providers/registry/stability-ai/imageModels.ts) — left
  // as-is rather than guessed at; not the same bug shape as the three above.
  stability: ["stability-ai"],
};

/**
 * #18598: a sync that ran before a LiteLLM provider got its map entry stored that bucket
 * under its raw LiteLLM name (e.g. `opencode_go`), which no lookup reads. Re-apply the
 * current map to such rows in place so they price requests before the next sync replaces
 * them. Rows already stored under the mapped alias win, model by model.
 */
export function remapHistoricalLitellmRows<T>(rows: Record<string, Record<string, T>>): void {
  for (const [litellmProvider, aliases] of Object.entries(LITELLM_PROVIDER_MAP)) {
    const historical = rows[litellmProvider];
    if (!historical || aliases.includes(litellmProvider)) continue;
    for (const alias of aliases) {
      rows[alias] = { ...historical, ...rows[alias] };
    }
  }
}
