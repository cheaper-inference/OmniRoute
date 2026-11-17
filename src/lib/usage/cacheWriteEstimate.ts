import type { CacheWriteUsage } from "@omniroute/open-sse/utils/cacheWriteUsage.ts";

export interface CacheWriteEstimate {
  /** Only the priced, reported tier portion; never total request cost or cash spend. */
  knownTierCostUsd: number | null;
  pricedTokens: number;
  source: "api-equivalent-estimate";
}

function cacheWriteRates(pricing: Record<string, unknown>, inputTokens: number | undefined) {
  const tier = pricing.long_context as Record<string, unknown> | undefined;
  const threshold = typeof tier?.threshold === "number" ? tier.threshold : Infinity;
  const crossed =
    tier?.inclusive === true ? (inputTokens ?? 0) >= threshold : (inputTokens ?? 0) > threshold;
  return crossed ? { ...pricing, ...tier } : pricing;
}

const valid = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value) && value >= 0;

function cacheWriteTierRate(
  explicitRate: unknown,
  input: number | null,
  anthropic: boolean,
  multiplier: number
) {
  return valid(explicitRate)
    ? explicitRate
    : anthropic && input !== null
      ? input * multiplier
      : null;
}

/**
 * Diagnostic-only Anthropic API-equivalent write pricing: 5m = 1.25x input,
 * 1h = 2x input. Never used by calculateCost, quotas, budgets or deductions.
 * A reseller/unsupported provider needs explicit tier prices; a single legacy
 * cache_creation price does not establish either tier's tariff.
 */
export function estimateApiEquivalentCacheWrite(
  pricing: Record<string, unknown> | null | undefined,
  usage: CacheWriteUsage,
  options: { provider: string; model: string; inputTokens?: number }
): CacheWriteEstimate {
  const empty: CacheWriteEstimate = {
    knownTierCostUsd: null,
    pricedTokens: 0,
    source: "api-equivalent-estimate",
  };
  if (!pricing || usage.status === "invalid" || usage.status === "inconsistent") return empty;
  const rates = cacheWriteRates(pricing, options.inputTokens);
  const anthropic =
    ["anthropic", "claude", "cc"].includes(options.provider) && options.model.startsWith("claude-");
  const input = valid(rates.input) ? rates.input : null;
  const fiveMinuteRate = cacheWriteTierRate(rates.cache_creation_5m, input, anthropic, 1.25);
  const oneHourRate = cacheWriteTierRate(rates.cache_creation_1h, input, anthropic, 2);
  let cost = 0;
  let pricedTokens = 0;
  let measured = false;
  for (const [tokens, rate] of [
    [usage.fiveMinute, fiveMinuteRate],
    [usage.oneHour, oneHourRate],
  ]) {
    if (tokens === null || rate === null) continue;
    measured = true;
    pricedTokens += tokens;
    cost += (tokens * rate) / 1_000_000;
  }
  return {
    knownTierCostUsd: measured && Number.isFinite(cost) ? cost : null,
    pricedTokens,
    source: "api-equivalent-estimate",
  };
}
