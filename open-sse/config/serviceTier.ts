/** OpenAI `service_tier` values, shared by the request translators and combo config. */
export const OPENAI_SERVICE_TIER_VALUES = ["auto", "default", "flex", "priority", "scale"] as const;

export const OPENAI_SERVICE_TIERS: ReadonlySet<string> = new Set(OPENAI_SERVICE_TIER_VALUES);

// Only targets known to accept a top-level service_tier get it; strict
// OpenAI-compatible gateways reject unknown fields with a 400.
export const SERVICE_TIER_PROVIDERS: ReadonlySet<string> = new Set([
  "openai",
  "azure-openai",
  "codex",
]);
