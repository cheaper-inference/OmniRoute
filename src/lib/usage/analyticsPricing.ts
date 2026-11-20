import { isFlatRateProvider } from "./flatRateProviders";
import { toNumber } from "@/shared/utils/numeric";

type PricingByProvider = Record<string, Record<string, Record<string, unknown>>>;
type ComputeCostFromPricing = (
  pricing: Record<string, unknown> | null | undefined,
  tokens: Record<string, number | undefined> | null | undefined,
  options?: Record<string, unknown>
) => number;
type GetCodexFastCostMultiplier = (
  provider: string | null | undefined,
  model: string | null | undefined,
  serviceTier: string | null | undefined
) => number;

export function toStringValue(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

export function roundCost(value: number): number {
  return Math.round(value * 1_000_000) / 1_000_000;
}

export function normalizeServiceTier(value: unknown): "standard" | "priority" | "flex" {
  const tier = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (tier === "priority" || tier === "fast") return "priority";
  if (tier === "flex") return "flex";
  return "standard";
}

export function getServiceTierLabelId(serviceTier: string): string {
  return normalizeServiceTier(serviceTier);
}

function findKeyInsensitive(obj: Record<string, any> | undefined | null, key: string): any {
  if (!obj || !key) return undefined;
  return obj[key.toLowerCase()];
}

function uniqueValues(values: Array<string | null | undefined>): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const value of values) {
    const normalized = typeof value === "string" ? value.trim().toLowerCase() : "";
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    result.push(normalized);
  }
  return result;
}

function stripCodexEffortSuffix(model: string): string {
  return model.replace(/-(?:xhigh|high|medium|low|none)$/i, "");
}

function getPricingModelCandidates(
  model: string,
  normalizeModelName: (model: string) => string
): string[] {
  const normalizedModel = normalizeModelName(model);
  const lowerModel = model.toLowerCase();
  const lowerNormalized = normalizedModel.toLowerCase();
  const hyphenModel = lowerModel.replace(/\./g, "-");
  const hyphenNormalized = lowerNormalized.replace(/\./g, "-");
  const effortBaseModel = stripCodexEffortSuffix(lowerNormalized);

  return uniqueValues([
    lowerModel,
    lowerNormalized,
    hyphenModel,
    hyphenNormalized,
    effortBaseModel,
    effortBaseModel.replace(/\./g, "-"),
    lowerNormalized === "codex-auto-review" ? "gpt-5.5" : null,
  ]);
}

function resolveProviderPricing(
  pricingByProvider: PricingByProvider,
  providerAliasMap: Record<string, string>,
  providerRaw: string
): Record<string, unknown> | null {
  const lower = providerRaw.toLowerCase();
  const direct = findKeyInsensitive(pricingByProvider, lower);
  if (direct) return direct;
  const aliasPricing = findKeyInsensitive(pricingByProvider, providerAliasMap[lower]);
  if (aliasPricing) return aliasPricing;
  const reversePricing = findReverseProviderPricing(pricingByProvider, providerAliasMap, lower);
  if (reversePricing) return reversePricing;
  const withoutRegion = lower.replace(/-cn$/, "");
  const regionPricing =
    withoutRegion !== lower ? findKeyInsensitive(pricingByProvider, withoutRegion) : null;
  if (regionPricing) return regionPricing;
  return lower === "antigravity" ? (findKeyInsensitive(pricingByProvider, "ag") ?? null) : null;
}

function findReverseProviderPricing(
  pricingByProvider: PricingByProvider,
  providerAliasMap: Record<string, string>,
  provider: string
): Record<string, unknown> | null {
  for (const [id, alias] of Object.entries(providerAliasMap)) {
    if (alias.toLowerCase() !== provider) continue;
    const pricing = findKeyInsensitive(pricingByProvider, id);
    if (pricing) return pricing;
  }
  return null;
}

function findModelPricing(
  providerPricing: Record<string, unknown> | null | undefined,
  candidates: string[]
): Record<string, unknown> | null {
  if (!providerPricing || typeof providerPricing !== "object") return null;
  for (const candidate of candidates) {
    const pricing = findKeyInsensitive(providerPricing, candidate);
    if (pricing) return pricing;
  }
  return null;
}

export type PricingResolutionContext = {
  cache: Map<string, Record<string, unknown> | null>;
  reverseAlias: Record<string, string>;
  misses?: { count: number };
};

function resolveModelPricingUncached(
  pricingByProvider: PricingByProvider,
  providerAliasMap: Record<string, string>,
  providerRaw: string,
  model: string,
  normalizeModelName: (model: string) => string
): Record<string, unknown> | null {
  const providerPricing = resolveProviderPricing(pricingByProvider, providerAliasMap, providerRaw);
  const candidates = getPricingModelCandidates(model, normalizeModelName);
  let pricing = findModelPricing(providerPricing, candidates);
  if (!pricing) {
    for (const provider of Object.values(pricingByProvider)) {
      pricing = findModelPricing(provider, candidates);
      if (pricing) break;
    }
  }
  if (pricing || model.endsWith(":free")) return pricing;
  if (providerPricing && typeof providerPricing === "object") {
    const lowerModel = model.toLowerCase();
    for (const [key, value] of Object.entries(providerPricing)) {
      if (key.includes(lowerModel) || lowerModel.includes(key))
        return value as Record<string, unknown>;
    }
  }
  return null;
}

function resolveModelPricing(
  pricingByProvider: PricingByProvider,
  providerAliasMap: Record<string, string>,
  provider: string,
  model: string,
  normalizeModelName: (model: string) => string,
  serviceTier: string,
  context?: PricingResolutionContext
): Record<string, unknown> | null {
  if (!context) {
    return resolveModelPricingUncached(
      pricingByProvider,
      providerAliasMap,
      provider,
      model,
      normalizeModelName
    );
  }
  const key = `${provider}\n${model}\n${serviceTier}`;
  if (context.cache.has(key)) return context.cache.get(key) ?? null;
  const resolved = resolveModelPricingUncached(
    pricingByProvider,
    context.reverseAlias,
    provider,
    model,
    normalizeModelName
  );
  context.cache.set(key, resolved);
  if (context.misses) context.misses.count += 1;
  return resolved;
}

function getPriceableTokens(row: Record<string, unknown>): Record<string, number> {
  return {
    input: toNumber(row.costPromptTokens ?? row.promptTokens),
    output: toNumber(row.costCompletionTokens ?? row.completionTokens),
    cacheRead: toNumber(row.costCacheReadTokens ?? row.cacheReadTokens),
    cacheCreation: toNumber(row.costCacheCreationTokens ?? row.cacheCreationTokens),
    reasoning: toNumber(row.costReasoningTokens ?? row.reasoningTokens),
  };
}

export function computeUsageRowCost(
  input: object,
  pricingByProvider: PricingByProvider,
  providerAliasMap: Record<string, string>,
  normalizeModelName: (model: string) => string,
  computeCostFromPricing: ComputeCostFromPricing,
  flatRateAsZero = true,
  pricingContext?: PricingResolutionContext
): number {
  return splitUsageRowCost(
    input,
    pricingByProvider,
    providerAliasMap,
    normalizeModelName,
    computeCostFromPricing,
    flatRateAsZero,
    pricingContext
  ).total;
}

/**
 * The same cost, split by where the number came from:
 * - `reported`: an amount the provider itself billed (`provider_cost_usd` —
 *   credit-metered upstreams, OpenRouter's `usage.cost`);
 * - `estimated`: a figure priced against the model catalog, either now from
 *   token counts or at request time (the `calculated_cost_usd` snapshot);
 * - `unknown`: the stored cost of an archived rollup, which mixes both kinds
 *   and keeps no record of which was which.
 * `total` is always `reported + estimated + unknown`.
 */
export interface UsageRowCostSplit {
  total: number;
  reported: number;
  estimated: number;
  unknown: number;
}

function emptyCostSplit(): UsageRowCostSplit {
  return { total: 0, reported: 0, estimated: 0, unknown: 0 };
}

export function splitUsageRowCost(
  input: object,
  pricingByProvider: PricingByProvider,
  providerAliasMap: Record<string, string>,
  normalizeModelName: (model: string) => string,
  computeCostFromPricing: ComputeCostFromPricing,
  flatRateAsZero = true,
  pricingContext?: PricingResolutionContext
): UsageRowCostSplit {
  // Concrete query rows have no index signature; widen only at this boundary.
  const row = input as Record<string, unknown>;
  const provider = toStringValue(row.provider);
  const model = toStringValue(row.model);
  if (!provider || !model) return emptyCostSplit();
  if (flatRateAsZero && isFlatRateProvider(provider)) return emptyCostSplit();
  const serviceTier = normalizeServiceTier(row.serviceTier ?? row.service_tier);
  const isAggregated = toNumber(row.isAggregated ?? row.is_aggregated) > 0;
  const storedCost = toNumber(row.storedCost ?? row.stored_cost);

  // New rollups preserve the exact API-equivalent value calculated before
  // cache/reasoning token dimensions are discarded, but not its provenance.
  // Legacy zero-cost rollups fall through to the input/output-token estimate.
  if (isAggregated && storedCost > 0) {
    return { total: storedCost, reported: 0, estimated: 0, unknown: storedCost };
  }

  // Reported-cost rows are excluded from the cost* token sums upstream. Of the
  // stored cost, only the provider_cost_usd share is a bill; the remainder is a
  // calculated_cost_usd catalog snapshot.
  const rawStoredCost = isAggregated ? 0 : storedCost;
  const reportedCost = toNumber(row.reportedCost ?? row.reported_cost);
  const reported = Math.min(Math.max(reportedCost, 0), rawStoredCost);
  const pricing = resolveModelPricing(
    pricingByProvider,
    providerAliasMap,
    provider,
    model,
    normalizeModelName,
    serviceTier,
    pricingContext
  );
  const priced = pricing
    ? computeCostFromPricing(pricing, getPriceableTokens(row), {
        provider,
        model,
        serviceTier,
        flatRateAsZero,
        // Analytics rows sum many requests: no per-request long-context tier (#19429).
        aggregatedTokens: true,
      })
    : 0;
  return {
    total: rawStoredCost + priced,
    reported,
    estimated: rawStoredCost - reported + priced,
    unknown: 0,
  };
}

export function computeUsageRowStandardCost(
  input: object,
  pricingByProvider: PricingByProvider,
  providerAliasMap: Record<string, string>,
  normalizeModelName: (model: string) => string,
  computeCostFromPricing: ComputeCostFromPricing,
  flatRateAsZero = true,
  pricingContext?: PricingResolutionContext
): number {
  const row = input as Record<string, unknown>;
  // Only archived tier-specific costs are re-priced for the standard comparison.
  const keepsReportedCost = toNumber(row.isAggregated ?? row.is_aggregated) === 0;
  const reportedCost = keepsReportedCost ? toNumber(row.storedCost ?? row.stored_cost) : 0;
  return computeUsageRowCost(
    {
      ...row,
      serviceTier: "standard",
      service_tier: "standard",
      storedCost: reportedCost,
      stored_cost: reportedCost,
      isAggregated: 0,
      is_aggregated: 0,
    },
    pricingByProvider,
    providerAliasMap,
    normalizeModelName,
    computeCostFromPricing,
    flatRateAsZero,
    pricingContext
  );
}

export function computeUsageSavingsTokens(
  input: object,
  serviceTier: string,
  getCodexFastCostMultiplier: GetCodexFastCostMultiplier
): number {
  // Concrete query rows have no index signature; widen only at this boundary.
  const row = input as Record<string, unknown>;
  const provider = toStringValue(row.provider);
  const model = toStringValue(row.model);
  const totalTokens = toNumber(row.totalTokens);
  if (!provider || !model || totalTokens <= 0) return 0;

  const standardMultiplier = getCodexFastCostMultiplier(provider, model, "standard");
  if (standardMultiplier <= 0) return 0;

  const actualMultiplier = getCodexFastCostMultiplier(provider, model, serviceTier);
  const savingsRatio = Math.max(0, (standardMultiplier - actualMultiplier) / standardMultiplier);
  return totalTokens * savingsRatio;
}
