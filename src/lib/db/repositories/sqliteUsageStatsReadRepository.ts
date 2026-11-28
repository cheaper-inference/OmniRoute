/**
 * SQLite implementation of the `usage_history` statistics read models.
 *
 * SQL text is unchanged from the original modules: `settings/cacheMetrics.ts`
 * (cache totals and hourly trend), `usageSummary.ts` (monthly token total) and
 * `usage/connectionSpeedStats.ts` (recent speed samples of one connection).
 *
 * The synchronous helpers take the database handle from the caller so the
 * legacy facades keep resolving it exactly where they did before (outside
 * their fallback `try` blocks). The async repository resolves the handle at
 * call time so reset/restore never leaves a captured handle.
 */

import type {
  CacheTrendBucket,
  CacheUsageByProvider,
  CacheUsageByStrategy,
  CacheUsageSnapshot,
  ConnectionSpeedSample,
  UsageStatsReadRepository,
} from "@/domain/persistence/usageStatsReadRepository";
import type { SqliteAdapter } from "../adapters/types";
import { getDbInstance } from "../core";

type CacheTotalsRow = {
  estimated: number;
  cachedRequests: number;
  totalCachedTokensComplete: number;
  totalCacheCreationTokensComplete: number;
  totalRequests: number;
  totalInputTokens: number | null;
  totalCachedTokens: number | null;
  totalCacheCreationTokens: number | null;
};

type CacheByProviderRow = {
  provider: string;
  totalRequests: number;
  cachedRequests: number;
  inputTokens: number | null;
  cachedTokens: number | null;
  estimated: number;
  cacheCreationTokens: number | null;
  cachedTokensComplete: number;
  cacheCreationTokensComplete: number;
};

type CacheByStrategyRow = {
  strategy: string;
  requests: number;
  inputTokens: number | null;
  cachedTokens: number | null;
  estimated: number;
  cacheCreationTokens: number | null;
  cachedTokensComplete: number;
  cacheCreationTokensComplete: number;
};

type CacheTrendRow = {
  hour: string;
  requests: number;
  cachedRequests: number;
  inputTokens: number | null;
  cachedTokens: number | null;
  estimated: number;
  cacheCreationTokens: number | null;
  cachedTokensComplete: number;
  cacheCreationTokensComplete: number;
};

type ConnectionSpeedDbRow = {
  model: unknown;
  latency_ms: unknown;
  ttft_ms: unknown;
  tokens_output: unknown;
  tokens_reasoning: unknown;
};

function readCacheTotals(db: SqliteAdapter): CacheUsageSnapshot["totals"] {
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
    .get() as CacheTotalsRow | undefined;

  return totalsRow
    ? {
        totalRequests: totalsRow.totalRequests,
        totalInputTokens: totalsRow.totalInputTokens,
        totalCachedTokens: totalsRow.totalCachedTokens,
        totalCacheCreationTokens: totalsRow.totalCacheCreationTokens,
        cachedRequests: totalsRow.cachedRequests,
        estimated: Boolean(totalsRow.estimated),
        totalCachedTokensComplete: Boolean(totalsRow.totalCachedTokensComplete),
        totalCacheCreationTokensComplete: Boolean(totalsRow.totalCacheCreationTokensComplete),
      }
    : null;
}

function readAllRequests(db: SqliteAdapter): number | null {
  // Get all requests count (including those without cache activity)
  const allRequestsRow = db
    .prepare(
      `
      SELECT COUNT(*) as totalRequests
      FROM usage_history
    `
    )
    .get() as { totalRequests: number } | undefined;

  return allRequestsRow ? allRequestsRow.totalRequests : null;
}

function readCacheByProvider(db: SqliteAdapter): CacheUsageByProvider[] {
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
    .all() as CacheByProviderRow[];

  return byProviderRows.map((row): CacheUsageByProvider => ({
    provider: row.provider,
    totalRequests: row.totalRequests,
    cachedRequests: row.cachedRequests,
    inputTokens: row.inputTokens,
    cachedTokens: row.cachedTokens,
    cacheCreationTokens: row.cacheCreationTokens,
    estimated: Boolean(row.estimated),
    cachedTokensComplete: Boolean(row.cachedTokensComplete),
    cacheCreationTokensComplete: Boolean(row.cacheCreationTokensComplete),
  }));
}

function readCacheByStrategy(db: SqliteAdapter): CacheUsageByStrategy[] {
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
      GROUP BY COALESCE(combo_strategy, 'direct')
    `
    )
    .all() as CacheByStrategyRow[];

  return byStrategyRows.map((row): CacheUsageByStrategy => ({
    strategy: row.strategy,
    requests: row.requests,
    inputTokens: row.inputTokens,
    cachedTokens: row.cachedTokens,
    cacheCreationTokens: row.cacheCreationTokens,
    estimated: Boolean(row.estimated),
    cachedTokensComplete: Boolean(row.cachedTokensComplete),
    cacheCreationTokensComplete: Boolean(row.cacheCreationTokensComplete),
  }));
}

/** Runs the four cache queries in the original order: totals, row count, per provider, per strategy. */
function getCacheUsageSnapshotSync(db: SqliteAdapter): CacheUsageSnapshot {
  const totals = readCacheTotals(db);
  const allRequests = readAllRequests(db);
  const byProvider = readCacheByProvider(db);
  const byStrategy = readCacheByStrategy(db);
  return { totals, allRequests, byProvider, byStrategy };
}

function listCacheTrendSync(db: SqliteAdapter, hours: number): CacheTrendBucket[] {
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
    .all(`-${hours} hours`) as CacheTrendRow[];

  return rows.map((row) => ({
    hour: row.hour,
    requests: row.requests,
    cachedRequests: row.cachedRequests,
    inputTokens: row.inputTokens,
    cachedTokens: row.cachedTokens,
    cacheCreationTokens: row.cacheCreationTokens,
    estimated: Boolean(row.estimated),
    cachedTokensComplete: Boolean(row.cachedTokensComplete),
    cacheCreationTokensComplete: Boolean(row.cacheCreationTokensComplete),
  }));
}

function sumTokensThisMonthSync(db: SqliteAdapter): number {
  const row = db
    .prepare(
      `SELECT
           COALESCE((
             SELECT SUM(tokens_input + tokens_output)
             FROM usage_history
             WHERE timestamp >= strftime('%Y-%m-01T00:00:00.000Z','now')
               AND timestamp < strftime('%Y-%m-01T00:00:00.000Z','now','+1 month')
           ), 0) +
           COALESCE((
             SELECT SUM(total_input_tokens + total_output_tokens)
             FROM daily_usage_summary
             WHERE date >= strftime('%Y-%m-01', 'now')
           ), 0) AS used`
    )
    .get() as { used: number } | undefined;
  return row?.used ?? 0;
}

function listRecentConnectionSpeedSamplesSync(
  db: SqliteAdapter,
  connectionId: string,
  limit: number
): ConnectionSpeedSample[] {
  const rows = db
    .prepare(
      `SELECT model, latency_ms, ttft_ms, tokens_output, tokens_reasoning
       FROM usage_history
       WHERE connection_id = ? AND success = 1
       ORDER BY timestamp DESC
       LIMIT ?`
    )
    .all(connectionId, limit) as ConnectionSpeedDbRow[];
  return rows.map((row) => ({
    model: row.model,
    latencyMs: row.latency_ms,
    ttftMs: row.ttft_ms,
    tokensOutput: row.tokens_output,
    tokensReasoning: row.tokens_reasoning,
  }));
}

export const sqliteUsageStatsReadRepository: UsageStatsReadRepository = {
  async getCacheUsageSnapshot() {
    return getCacheUsageSnapshotSync(getDbInstance());
  },
  async listCacheTrend(hours) {
    return listCacheTrendSync(getDbInstance(), hours);
  },
  async sumTokensThisMonth() {
    return sumTokensThisMonthSync(getDbInstance());
  },
  async listRecentConnectionSpeedSamples(connectionId, limit) {
    return listRecentConnectionSpeedSamplesSync(getDbInstance(), connectionId, limit);
  },
};

/**
 * SQLite-only synchronous access for the existing facades, which run their
 * queries in the caller's turn (and, for the cache metrics, inside their own
 * fallback `try`). Not part of the portable contract.
 */
export const sqliteUsageStatsReadLegacySync = {
  getCacheUsageSnapshot: getCacheUsageSnapshotSync,
  listCacheTrend: listCacheTrendSync,
  sumTokensThisMonth: sumTokensThisMonthSync,
  listRecentConnectionSpeedSamples: listRecentConnectionSpeedSamplesSync,
};
