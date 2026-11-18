// The free-tier budget card's data, reduced from the live catalog to the few rows the card draws.
//
// scripts/release/lib/code-facts-probe.mjs calls summarizeFreeTierBudget() on
// computeFreeModelTotals() (with provider display names from AI_PROVIDERS) and stores the result
// in the facts snapshot as `code.freeTierBudget`; scripts/docs/gen-readme-free-tier-budget.mjs
// draws the card from that snapshot entry. So the committed SVG follows the snapshot (refreshed
// only by `npm run release:refresh-derived`), not the catalog of whatever branch renders it.
//
// Pure, JSON-serializable output in a deterministic order: pools by budget, credits by size,
// ties broken by provider id.

const STEADY_TYPES = new Set(["recurring-daily", "recurring-monthly", "keyless"]);

/**
 * @param {object} t computeFreeModelTotals() result
 * @param {(id: string) => string} displayName provider display name, as AI_PROVIDERS names it
 */
export function summarizeFreeTierBudget(t, displayName) {
  // Live display name, parentheticals stripped as the card does.
  const providerName = (id) => (displayName(id) || id).replace(/\s*\(.*$/, "").replace(/ —.*$/, "");

  // Steady pools: a shared pool (poolKey) counts once at its largest member; per-model caps
  // without a pool key (Groq's five) add up within their provider and draw as one segment.
  const poolMap = new Map();
  for (const r of t.perModel) {
    if (!STEADY_TYPES.has(r.freeType) || r.eligibilityGate || !(r.monthlyTokens > 0)) continue;
    if (r.poolKey) {
      const cur = poolMap.get(r.poolKey);
      if (!cur) poolMap.set(r.poolKey, { provider: r.provider, tokens: r.monthlyTokens, caps: 0 });
      else cur.tokens = Math.max(cur.tokens, r.monthlyTokens);
    } else {
      const k = `provider:${r.provider}`;
      const cur = poolMap.get(k) || { provider: r.provider, tokens: 0, caps: 0 };
      cur.tokens += r.monthlyTokens;
      cur.caps += 1;
      poolMap.set(k, cur);
    }
  }
  const pools = [...poolMap.values()]
    .map((p) => ({
      provider: p.provider,
      name: providerName(p.provider),
      tokens: p.tokens,
      caps: p.caps,
    }))
    .sort((a, b) => b.tokens - a.tokens || b.caps - a.caps || a.provider.localeCompare(b.provider));

  // One-time signup credits, gated rows excluded like firstMonthRealisticTokens.
  const otMap = new Map();
  for (const r of t.perModel) {
    if (r.freeType !== "one-time-initial" || !(r.creditTokens > 0) || r.eligibilityGate) continue;
    const k = r.poolKey || r.provider;
    otMap.set(k, { provider: r.provider, v: Math.max(otMap.get(k)?.v || 0, r.creditTokens) });
  }
  const oneTime = [...otMap.values()].sort(
    (a, b) => b.v - a.v || a.provider.localeCompare(b.provider)
  );

  return {
    steady: t.steadyRecurringTokens,
    first: t.firstMonthRealisticTokens,
    boost: t.boostMonthlyTokens,
    gated: t.gatedRecurringTokens,
    poolCount: t.poolCount,
    modelCount: t.modelCount,
    discontinued: t.perModel.filter((r) => r.freeType === "discontinued").length,
    avoidProviders: new Set(t.perModel.filter((r) => r.tos === "avoid").map((r) => r.provider))
      .size,
    pools,
    oneTime,
    uncappedNames: [...new Set(t.uncappedProviders.map(providerName))],
    gatedProviderNames: t.gatedProviders.map(providerName),
  };
}
