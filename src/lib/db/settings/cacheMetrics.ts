/**
 * db/settings/cacheMetrics.ts — Cache control metrics (computed from usage_history on-the-fly).
 *
 * The queries live in `repositories/sqliteUsageStatsReadRepository.ts`; this
 * module shapes them for the dashboard (zero fallbacks, the savings estimate,
 * the empty result on failure) exactly as before.
 */

import { getDbInstance } from "../core";
import { usageStatsRepositories } from "../repositories/usageStatsRepositories";

export async function getCacheMetrics() {
  const db = getDbInstance();

  try {
    const {
      totals,
      allRequests,
      byProvider: byProviderRows,
      byStrategy: byStrategyRows,
    } = usageStatsRepositories.legacySync.getCacheUsageSnapshot(db);
    const totalsRow = totals ?? undefined;

    const tokensSaved = totalsRow?.totalCachedTokens ?? null;

    const AVG_INPUT_PRICE_PER_MILLION = 3;
    const CACHE_DISCOUNT = 0.9;
    const estimatedCostSaved =
      tokensSaved === null
        ? null
        : Math.round(
            (tokensSaved / 1_000_000) * AVG_INPUT_PRICE_PER_MILLION * CACHE_DISCOUNT * 100
          ) / 100;

    // Build byProvider object
    const byProvider: Record<
      string,
      {
        requests: number;
        totalRequests: number;
        cachedRequests: number;
        inputTokens: number;
        estimated: boolean;
        cachedTokens: number | null;
        cacheCreationTokens: number | null;
        cachedTokensComplete: boolean;
        cacheCreationTokensComplete: boolean;
      }
    > = {};
    for (const row of byProviderRows) {
      byProvider[row.provider] = {
        requests: row.cachedRequests,
        totalRequests: row.totalRequests,
        cachedRequests: row.cachedRequests,
        inputTokens: row.inputTokens || 0,
        estimated: row.estimated,
        cachedTokens: row.cachedTokens,
        cacheCreationTokens: row.cacheCreationTokens,
        cachedTokensComplete: row.cachedTokensComplete,
        cacheCreationTokensComplete: row.cacheCreationTokensComplete,
      };
    }

    // Build byStrategy object
    const byStrategy: Record<
      string,
      {
        requests: number;
        inputTokens: number;
        estimated: boolean;
        cachedTokens: number | null;
        cacheCreationTokens: number | null;
        cachedTokensComplete: boolean;
        cacheCreationTokensComplete: boolean;
      }
    > = {};
    for (const row of byStrategyRows) {
      byStrategy[row.strategy] = {
        requests: row.requests,
        inputTokens: row.inputTokens || 0,
        estimated: row.estimated,
        cachedTokens: row.cachedTokens,
        cacheCreationTokens: row.cacheCreationTokens,
        cachedTokensComplete: row.cachedTokensComplete,
        cacheCreationTokensComplete: row.cacheCreationTokensComplete,
      };
    }

    return {
      estimated: Boolean(totalsRow?.estimated),
      totalRequests: allRequests || totalsRow?.totalRequests || 0,
      requestsWithCacheControl: totalsRow?.cachedRequests || 0,
      totalInputTokens: totalsRow?.totalInputTokens || 0,
      totalCachedTokens: totalsRow?.totalCachedTokens ?? null,
      totalCacheCreationTokens: totalsRow?.totalCacheCreationTokens ?? null,
      totalCachedTokensComplete: Boolean(totalsRow?.totalCachedTokensComplete),
      totalCacheCreationTokensComplete: Boolean(totalsRow?.totalCacheCreationTokensComplete),
      savingsComplete: Boolean(totalsRow?.totalCachedTokensComplete),
      tokensSaved,
      estimatedCostSaved,
      byProvider,
      byStrategy,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Failed to fetch cache metrics from usage_history:", error);
    return {
      estimated: false,
      totalRequests: 0,
      requestsWithCacheControl: 0,
      totalInputTokens: 0,
      totalCachedTokens: null,
      totalCacheCreationTokens: null,
      totalCachedTokensComplete: false,
      totalCacheCreationTokensComplete: false,
      savingsComplete: false,
      tokensSaved: null,
      estimatedCostSaved: null,
      byProvider: {},
      byStrategy: {},
      lastUpdated: new Date().toISOString(),
    };
  }
}

export async function updateCacheMetrics(_metrics: Record<string, unknown>) {
  // No-op: metrics are now computed from usage_history on-the-fly
  // The usage_history table is the single source of truth
  return getCacheMetrics();
}

export interface CacheTrendPoint {
  estimated: boolean;
  timestamp: string;
  requests: number;
  cachedRequests: number;
  inputTokens: number;
  cachedTokens: number | null;
  cacheCreationTokens: number | null;
  cachedTokensComplete: boolean;
  cacheCreationTokensComplete: boolean;
}

export async function getCacheTrend(hours = 24): Promise<CacheTrendPoint[]> {
  const db = getDbInstance();

  try {
    const rows = usageStatsRepositories.legacySync.listCacheTrend(db, hours);

    return rows.map((r) => ({
      estimated: r.estimated,
      timestamp: r.hour,
      requests: r.requests,
      cachedRequests: r.cachedRequests,
      inputTokens: r.inputTokens || 0,
      cachedTokens: r.cachedTokens,
      cacheCreationTokens: r.cacheCreationTokens,
      cachedTokensComplete: r.cachedTokensComplete,
      cacheCreationTokensComplete: r.cacheCreationTokensComplete,
    }));
  } catch (error) {
    console.error("Failed to fetch cache trend:", error);
    return [];
  }
}

export async function resetCacheMetrics() {
  // No-op: cache metrics are computed from usage_history.
  console.warn(
    "resetCacheMetrics is deprecated - cache metrics are now computed from usage_history"
  );
  return getCacheMetrics();
}
