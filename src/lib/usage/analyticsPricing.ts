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
  row: Record<string, unknown>,
  pricingByProvider: PricingByProvider,
  providerAliasMap: Record<string, string>,
  normalizeModelName: (model: string) => string,
  computeCostFromPricing: ComputeCostFromPricing,
  flatRateAsZero = true,
  pricingContext?: PricingResolutionContext
): number {
  const provider = toStringValue(row.provider);
  const model = toStringValue(row.model);
  if (!provider || !model) return 0;
  const serviceTier = normalizeServiceTier(row.serviceTier ?? row.service_tier);
  const isAggregated = toNumber(row.isAggregated ?? row.is_aggregated) > 0;
  const storedCost = toNumber(row.storedCost ?? row.stored_cost);

  if (flatRateAsZero && isFlatRateProvider(provider)) return 0;
  if (isAggregated) {
    // New rollups preserve the exact API-equivalent value calculated before
    // cache/reasoning token dimensions are discarded. Legacy zero-cost rows
    // fall through to the best available input/output-token estimate.
    if (storedCost > 0) return storedCost;
  }

  // Reported-cost rows are excluded from the cost* token sums upstream.
  const rawStoredCost = isAggregated ? 0 : storedCost;
  const pricing = resolveModelPricing(
    pricingByProvider,
    providerAliasMap,
    provider,
    model,
    normalizeModelName,
    serviceTier,
    pricingContext
  );
  if (!pricing) return rawStoredCost;

  return (
    rawStoredCost +
    computeCostFromPricing(pricing, getPriceableTokens(row), {
      provider,
      model,
      serviceTier,
      flatRateAsZero,
    })
  );
}

export function computeUsageRowStandardCost(
  row: Record<string, unknown>,
  pricingByProvider: PricingByProvider,
  providerAliasMap: Record<string, string>,
  normalizeModelName: (model: string) => string,
  computeCostFromPricing: ComputeCostFromPricing,
  flatRateAsZero = true,
  pricingContext?: PricingResolutionContext
): number {
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
  row: Record<string, unknown>,
  serviceTier: string,
  getCodexFastCostMultiplier: GetCodexFastCostMultiplier
): number {
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
