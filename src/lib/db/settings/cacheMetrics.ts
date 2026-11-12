/**
 * db/settings/cacheMetrics.ts — Cache control metrics (computed from usage_history on-the-fly).
 */

import { getDbInstance } from "../core";

export async function getCacheMetrics() {
  const db = getDbInstance();

  try {
    // Aggregate totals from usage_history
    const totalsRow = db
      .prepare(
        `
      SELECT
        COUNT(*) as totalRequests,
        SUM(tokens_input) as totalInputTokens,
        SUM(tokens_cache_read) as totalCachedTokens,
        SUM(tokens_cache_creation) as totalCacheCreationTokens,
        MAX(CASE WHEN usage_provenance = 'estimated' THEN 1 ELSE 0 END) as estimated,
        COUNT(tokens_cache_read) = COUNT(*) as totalCachedTokensComplete,
        COUNT(tokens_cache_creation) = COUNT(*) as totalCacheCreationTokensComplete,
        SUM(CASE WHEN tokens_cache_read > 0 OR tokens_cache_creation > 0 THEN 1 ELSE 0 END) as cachedRequests
      FROM usage_history
    `
      )
      .get() as
      | {
          estimated: number;
          cachedRequests: number;
          totalCachedTokensComplete: number;
          totalCacheCreationTokensComplete: number;
          totalRequests: number;
          totalInputTokens: number | null;
          totalCachedTokens: number | null;
          totalCacheCreationTokens: number | null;
        }
      | undefined;

    // Get all requests count (including those without cache activity)
    const allRequestsRow = db
      .prepare(
        `
      SELECT COUNT(*) as totalRequests
      FROM usage_history
    `
      )
      .get() as { totalRequests: number } | undefined;

    // Aggregate by provider
    const byProviderRows = db
      .prepare(
        `
      SELECT
        provider,
        COUNT(*) as totalRequests,
        SUM(CASE WHEN tokens_cache_read > 0 OR tokens_cache_creation > 0 THEN 1 ELSE 0 END) as cachedRequests,
        SUM(CASE WHEN tokens_cache_read > 0 OR tokens_cache_creation > 0 THEN tokens_input ELSE 0 END) as inputTokens,
        SUM(tokens_cache_read) as cachedTokens,
        SUM(tokens_cache_creation) as cacheCreationTokens,
        MAX(CASE WHEN usage_provenance = 'estimated' THEN 1 ELSE 0 END) as estimated,
        COUNT(tokens_cache_read) = COUNT(*) as cachedTokensComplete,
        COUNT(tokens_cache_creation) = COUNT(*) as cacheCreationTokensComplete
      FROM usage_history
      WHERE provider IS NOT NULL
      GROUP BY provider
    `
      )
      .all() as Array<{
      provider: string;
      totalRequests: number;
      cachedRequests: number;
      inputTokens: number | null;
      cachedTokens: number | null;
      estimated: number;
      cacheCreationTokens: number | null;
      cachedTokensComplete: number;
      cacheCreationTokensComplete: number;
    }>;

    // Aggregate by combo strategy (direct requests stored as 'direct')
    const byStrategyRows = db
      .prepare(
        `
      SELECT
        COALESCE(combo_strategy, 'direct') as strategy,
        COUNT(*) as requests,
        SUM(tokens_input) as inputTokens,
        SUM(tokens_cache_read) as cachedTokens,
        SUM(tokens_cache_creation) as cacheCreationTokens,
        MAX(CASE WHEN usage_provenance = 'estimated' THEN 1 ELSE 0 END) as estimated,
        COUNT(tokens_cache_read) = COUNT(*) as cachedTokensComplete,
        COUNT(tokens_cache_creation) = COUNT(*) as cacheCreationTokensComplete
      FROM usage_history
      GROUP BY combo_strategy
    `
      )
      .all() as Array<{
      strategy: string;
      requests: number;
      inputTokens: number | null;
      cachedTokens: number | null;
      estimated: number;
      cacheCreationTokens: number | null;
      cachedTokensComplete: number;
      cacheCreationTokensComplete: number;
    }>;

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
        estimated: Boolean(row.estimated),
        cachedTokens: row.cachedTokens,
        cacheCreationTokens: row.cacheCreationTokens,
        cachedTokensComplete: Boolean(row.cachedTokensComplete),
        cacheCreationTokensComplete: Boolean(row.cacheCreationTokensComplete),
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
        estimated: Boolean(row.estimated),
        cachedTokens: row.cachedTokens,
        cacheCreationTokens: row.cacheCreationTokens,
        cachedTokensComplete: Boolean(row.cachedTokensComplete),
        cacheCreationTokensComplete: Boolean(row.cacheCreationTokensComplete),
      };
    }

    return {
      estimated: Boolean(totalsRow?.estimated),
      totalRequests: allRequestsRow?.totalRequests || totalsRow?.totalRequests || 0,
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
    const rows = db
      .prepare(
        `
        SELECT
          strftime('%Y-%m-%dT%H:00:00Z', timestamp) as hour,
          COUNT(*) as requests,
          SUM(CASE WHEN tokens_cache_read > 0 OR tokens_cache_creation > 0 THEN 1 ELSE 0 END) as cachedRequests,
          SUM(tokens_input) as inputTokens,
          SUM(tokens_cache_read) as cachedTokens,
          SUM(tokens_cache_creation) as cacheCreationTokens,
        MAX(CASE WHEN usage_provenance = 'estimated' THEN 1 ELSE 0 END) as estimated,
        COUNT(tokens_cache_read) = COUNT(*) as cachedTokensComplete,
        COUNT(tokens_cache_creation) = COUNT(*) as cacheCreationTokensComplete
        FROM usage_history
        WHERE timestamp >= datetime('now', ?)
        GROUP BY hour
        ORDER BY hour ASC
      `
      )
      .all(`-${hours} hours`) as Array<{
      hour: string;
      requests: number;
      cachedRequests: number;
      inputTokens: number | null;
      cachedTokens: number | null;
      estimated: number;
      cacheCreationTokens: number | null;
      cachedTokensComplete: number;
      cacheCreationTokensComplete: number;
    }>;

    return rows.map((r) => ({
      estimated: Boolean(r.estimated),
      timestamp: r.hour,
      requests: r.requests,
      cachedRequests: r.cachedRequests,
      inputTokens: r.inputTokens || 0,
      cachedTokens: r.cachedTokens,
      cacheCreationTokens: r.cacheCreationTokens,
      cachedTokensComplete: Boolean(r.cachedTokensComplete),
      cacheCreationTokensComplete: Boolean(r.cacheCreationTokensComplete),
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
