import {
  storedCacheWriteUsage,
  type CacheWriteUsage,
} from "@omniroute/open-sse/utils/cacheWriteUsage.ts";

export interface CacheWriteSummaryRow {
  cacheCreation: number | null;
  cacheCreation5m?: number | null;
  cacheCreation1h?: number | null;
  cacheCreationTierStatus?: string | null;
  cacheWriteCostUsd?: number | null;
  cacheWritePricedTokens?: number | null;
}

export interface CacheWriteSummary {
  cacheWrite5mTotal: number;
  cacheWrite1hTotal: number;
  cacheWriteUnknownTotal: number;
  cacheWriteUnreportedCalls: number;
  cacheWriteInvalidCalls: number;
  cacheWriteUnpricedTotal: number;
  cacheWriteKnownTierCostUsd: number | null;
}

export function summarizeCacheWrites(rows: CacheWriteSummaryRow[]): CacheWriteSummary {
  const result: CacheWriteSummary = {
    cacheWrite5mTotal: 0,
    cacheWrite1hTotal: 0,
    cacheWriteUnknownTotal: 0,
    cacheWriteUnreportedCalls: 0,
    cacheWriteInvalidCalls: 0,
    cacheWriteUnpricedTotal: 0,
    cacheWriteKnownTierCostUsd: null,
  };
  for (const row of rows) {
    const usage = storedCacheWriteUsage(
      row.cacheCreation,
      row.cacheCreation5m,
      row.cacheCreation1h,
      row.cacheCreationTierStatus
    );
    const valid = usage.status !== "invalid" && usage.status !== "inconsistent";
    if (valid) {
      result.cacheWrite5mTotal += usage.fiveMinute ?? 0;
      result.cacheWrite1hTotal += usage.oneHour ?? 0;
    } else result.cacheWriteInvalidCalls++;
    result.cacheWriteUnknownTotal += usage.unknown ?? 0;
    if (usage.total === null) result.cacheWriteUnreportedCalls++;
    addCacheWriteCost(result, row, usage, valid);
  }
  return result;
}

function addCacheWriteCost(
  result: CacheWriteSummary,
  row: CacheWriteSummaryRow,
  usage: CacheWriteUsage,
  valid: boolean
) {
  const cost = row.cacheWriteCostUsd;
  const priced = valid && typeof cost === "number" && Number.isFinite(cost) && cost >= 0;
  const pricedTokens = priced
    ? Math.max(0, Math.min(usage.total ?? 0, row.cacheWritePricedTokens ?? 0))
    : 0;
  result.cacheWriteUnpricedTotal += Math.max(0, (usage.total ?? 0) - pricedTokens);
  if (priced) result.cacheWriteKnownTierCostUsd = (result.cacheWriteKnownTierCostUsd ?? 0) + cost;
}
