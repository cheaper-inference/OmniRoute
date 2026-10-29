/**
 * GET /v1/me/status — list-price value of a key's requests per usage window
 * (usage.cost / usage.daily / usage.weekly `listPriceUsd` + `unpricedRequests`).
 *
 * This is NOT the metered spend reported next to it (usage.cost.usedUsd, usage.*.costUsd come
 * from the budget ledger, where flat-rate / subscription providers count $0). Here every
 * successful request is priced at list price with calculateCostDetailed and no
 * `flatRateAsZero`; a provider-reported exact cost is used as is. Requests are priced at read
 * time per provider / model / tier / prompt-size band slice, so a long-context tier applies
 * only to requests whose own prompt crosses its threshold. The agent sessions' costUsd is the
 * per-session counterpart, but it is priced when each request is recorded and includes failed
 * requests, so the sums can differ.
 */

import type { ApiKeyUsageSlice, ApiKeyUsageSliceTokens } from "@/lib/db/apiKeyUsageSlices";

import type { CostCalculationResult } from "./costCalculator";
import { roundNumber } from "./apiKeySelfServiceShared";

export interface ListPriceSummary {
  /** List-price USD of every request in the window (6 decimals). */
  listPriceUsd: number;
  /** Requests that used tokens but had no known price; listPriceUsd is partial when > 0. */
  unpricedRequests: number;
}

export type PriceTokensFn = (
  provider: string,
  model: string,
  tokens: ApiKeyUsageSliceTokens,
  options: { provider: string | null; model: string | null; serviceTier: string }
) => Promise<CostCalculationResult>;

type PricedSlice = { slice: ApiKeyUsageSlice; result: CostCalculationResult };

/** How long a key's list-price summaries are reused; the status may lag by up to this much. */
export const LIST_PRICE_CACHE_TTL_MS = 60_000;
const LIST_PRICE_CACHE_MAX_ENTRIES = 1000;

export interface ListPriceCache {
  /**
   * Returns the summaries cached under `key` until `ttlMs` after they were computed, or
   * computes and caches them. Concurrent callers share one computation; a failed one is not
   * kept.
   */
  memoize(
    key: string,
    now: number,
    compute: () => Promise<ListPriceSummary[]>
  ): Promise<ListPriceSummary[]>;
}

/**
 * In-process cache of list-price summaries (the slice query scans a key's whole budget period
 * on a synchronous DB driver, and status bars poll this endpoint). Bounded: past `maxEntries`
 * the least recently used entry is dropped.
 */
export function createListPriceCache({
  ttlMs = LIST_PRICE_CACHE_TTL_MS,
  maxEntries = LIST_PRICE_CACHE_MAX_ENTRIES,
}: { ttlMs?: number; maxEntries?: number } = {}): ListPriceCache {
  const entries = new Map<string, { value: Promise<ListPriceSummary[]>; expiresAt: number }>();
  return {
    memoize(key, now, compute) {
      const hit = entries.get(key);
      entries.delete(key);
      if (hit && now < hit.expiresAt) {
        entries.set(key, hit);
        return hit.value;
      }
      const value = compute();
      entries.set(key, { value, expiresAt: now + ttlMs });
      for (const oldest of entries.keys()) {
        if (entries.size <= maxEntries) break;
        entries.delete(oldest);
      }
      value.catch(() => {
        if (entries.get(key)?.value === value) entries.delete(key);
      });
      return value;
    },
  };
}

export const defaultListPriceCache = createListPriceCache();

const cutsByPricingTable = new WeakMap<object, number[]>();

/**
 * Prompt-size band cuts for listApiKeyUsageSlices: for every pricing row's `long_context` tier,
 * the smallest whole prompt size its tier applies to (`inclusive`: at the threshold, otherwise
 * above it). Banding by every cut of the table keeps each band on one side of each model's
 * threshold. Memoized per pricing table object (the pricing read cache returns the same one).
 */
export function collectLongContextCuts(pricingTable: unknown): number[] {
  if (!pricingTable || typeof pricingTable !== "object") return [];
  const memo = cutsByPricingTable.get(pricingTable);
  if (memo) return memo;
  const cuts = new Set<number>();
  for (const models of Object.values(pricingTable)) {
    if (!models || typeof models !== "object") continue;
    for (const row of Object.values(models as Record<string, unknown>)) {
      const tier = (row as { long_context?: unknown } | null)?.long_context;
      if (!tier || typeof tier !== "object" || Array.isArray(tier)) continue;
      const { threshold, inclusive } = tier as { threshold?: unknown; inclusive?: unknown };
      const limit = Number(threshold);
      if (!Number.isFinite(limit) || limit <= 0) continue;
      cuts.add(inclusive === true ? Math.ceil(limit) : Math.floor(limit) + 1);
    }
  }
  const sorted = [...cuts].sort((a, b) => a - b);
  cutsByPricingTable.set(pricingTable, sorted);
  return sorted;
}

function hasTokens(tokens: ApiKeyUsageSliceTokens): boolean {
  return Object.values(tokens).some((count) => count > 0);
}

function divideTokens(tokens: ApiKeyUsageSliceTokens, by: number): ApiKeyUsageSliceTokens {
  return {
    input: tokens.input / by,
    output: tokens.output / by,
    cacheRead: tokens.cacheRead / by,
    cacheCreation: tokens.cacheCreation / by,
    reasoning: tokens.reasoning / by,
  };
}

/**
 * Prices the slices of one provider / model / tier. A slice is priced as its average request
 * times its request count: cost is linear in tokens at fixed rates, and the average prompt
 * stays inside the slice's band, so the long-context decision is the one each request gets.
 * Memoized: identical slices (the usual case when all of a model's usage falls inside the
 * shortest window) are priced once, and once the model has no price its other slices are not
 * looked up again.
 */
async function priceModelSlices(
  slices: ApiKeyUsageSlice[],
  price: PriceTokensFn
): Promise<PricedSlice[]> {
  const bySlice = new Map<string, CostCalculationResult>();
  let unpriced = false;
  const priced: PricedSlice[] = [];
  for (const slice of slices) {
    if (!hasTokens(slice.tokens)) continue;
    const requests = Math.max(slice.priceableRequests, 1);
    const sliceKey = JSON.stringify([slice.tokens, requests]);
    let result = unpriced ? { costUsd: 0, priced: false } : bySlice.get(sliceKey);
    if (!result) {
      const perRequest = await price(
        slice.provider ?? "",
        slice.model ?? "",
        divideTokens(slice.tokens, requests),
        { provider: slice.provider, model: slice.model, serviceTier: slice.serviceTier }
      );
      result = { ...perRequest, costUsd: perRequest.costUsd * requests };
      bySlice.set(sliceKey, result);
      unpriced = !result.priced;
    }
    priced.push({ slice, result });
  }
  return priced;
}

/** One summary per window, in the order of the window indexes 0..windowCount-1. */
export async function summarizeListPrice(
  slices: ApiKeyUsageSlice[],
  windowCount: number,
  price: PriceTokensFn
): Promise<ListPriceSummary[]> {
  const totals = Array.from({ length: windowCount }, () => ({ costUsd: 0, unpricedRequests: 0 }));
  const byModel = new Map<string, ApiKeyUsageSlice[]>();
  for (const slice of slices) {
    const total = totals[slice.windowIndex];
    if (!total) continue;
    total.costUsd += slice.storedCostUsd;
    const key = JSON.stringify([slice.provider, slice.model, slice.serviceTier]);
    byModel.set(key, [...(byModel.get(key) ?? []), slice]);
  }

  const pricedGroups = await Promise.all(
    [...byModel.values()].map((group) => priceModelSlices(group, price))
  );
  for (const { slice, result } of pricedGroups.flat()) {
    const total = totals[slice.windowIndex];
    total.costUsd += result.costUsd;
    if (!result.priced) total.unpricedRequests += slice.priceableRequests;
  }

  return totals.map((total) => ({
    listPriceUsd: roundNumber(total.costUsd, 6),
    unpricedRequests: total.unpricedRequests,
  }));
}
