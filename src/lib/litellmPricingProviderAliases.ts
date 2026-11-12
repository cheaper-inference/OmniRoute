/** Normalize verified LiteLLM source identities without changing routing identities. */
export function normalizeLiteLLMPricingProviders<Row extends object>(
  pricing: Record<string, Record<string, Row>>
): Record<string, Record<string, Row>> {
  const entries = Object.entries(pricing);
  // Match each priority tier once: case variants keep the existing first-seen behavior.
  const legacy = entries.find(([provider]) => provider.toLowerCase() === "opencode_go");
  const canonical = entries.find(([provider]) => provider.toLowerCase() === "opencode-go");
  if (!legacy && !canonical) return pricing;

  const normalized = { ...pricing };
  for (const [provider] of entries) {
    const key = provider.toLowerCase();
    if (key === "opencode_go" || key === "opencode-go") delete normalized[provider];
  }

  const models = { ...legacy?.[1] };
  for (const [model, row] of Object.entries(canonical?.[1] || {})) {
    // Canonical fields, including explicit zero, win; alias-only fields survive.
    models[model] = models[model] ? { ...models[model], ...row } : row;
  }
  normalized["opencode-go"] = models;
  return normalized;
}
