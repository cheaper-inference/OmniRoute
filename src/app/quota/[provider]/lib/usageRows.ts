/**
 * The key's usage by model as the page lists it. The API counts (provider, model) pairs, so one
 * model can arrive twice (under its provider and under a combo); the page shows one row per model.
 */

import type { SelfUsageResponse } from "@/shared/schemas/selfUsage";

interface UsageModelRow {
  model: string;
  requests: number;
  totalTokens: number;
  listPriceUsd: number;
}

/** One row per model with the sums of its pairs, most requests first, then by model name. */
export function mergeUsageByModel(rows: SelfUsageResponse["byModel"]): UsageModelRow[] {
  const merged = new Map<string, UsageModelRow>();
  for (const { model, requests, totalTokens, listPriceUsd } of rows) {
    const entry = merged.get(model);
    if (entry) {
      entry.requests += requests;
      entry.totalTokens += totalTokens;
      entry.listPriceUsd += listPriceUsd;
    } else {
      merged.set(model, { model, requests, totalTokens, listPriceUsd });
    }
  }
  return [...merged.values()].sort(
    (a, b) => b.requests - a.requests || (a.model < b.model ? -1 : a.model > b.model ? 1 : 0)
  );
}
