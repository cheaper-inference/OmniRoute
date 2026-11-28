/**
 * Read-only statistics projected from the per-request `usage_history` rows
 * (plus the rolled-up `daily_usage_summary` for the monthly token total).
 *
 * These are read models: nothing here writes. Counters that a row does not
 * report stay `null` rather than `0`, and every `*Complete` flag says whether
 * all rows of the group reported that counter. Shaping the results for a
 * dashboard (cost estimates, per-model speed math, fallbacks on failure) is
 * left to the callers.
 */

/** Totals over every `usage_history` row. */
export interface CacheUsageTotals {
  totalRequests: number;
  totalInputTokens: number | null;
  totalCachedTokens: number | null;
  totalCacheCreationTokens: number | null;
  /** Rows with a cache read or cache write. */
  cachedRequests: number | null;
  /** At least one row carries estimated (not provider-reported) usage. */
  estimated: boolean;
  totalCachedTokensComplete: boolean;
  totalCacheCreationTokensComplete: boolean;
}

/** Per-provider cache totals (rows without a provider are skipped). */
export interface CacheUsageByProvider {
  provider: string;
  totalRequests: number;
  cachedRequests: number;
  /** Input tokens of the rows with cache activity only. */
  inputTokens: number | null;
  cachedTokens: number | null;
  cacheCreationTokens: number | null;
  estimated: boolean;
  cachedTokensComplete: boolean;
  cacheCreationTokensComplete: boolean;
}

/** Per-combo-strategy cache totals; direct requests are grouped as `direct`. */
export interface CacheUsageByStrategy {
  strategy: string;
  requests: number;
  inputTokens: number | null;
  cachedTokens: number | null;
  cacheCreationTokens: number | null;
  estimated: boolean;
  cachedTokensComplete: boolean;
  cacheCreationTokensComplete: boolean;
}

export interface CacheUsageSnapshot {
  /** Null only when the store returned no totals row. */
  totals: CacheUsageTotals | null;
  /** Plain row count, or null when the store returned no row. */
  allRequests: number | null;
  byProvider: CacheUsageByProvider[];
  byStrategy: CacheUsageByStrategy[];
}

/** One hourly bucket of the cache trend, oldest bucket first. */
export interface CacheTrendBucket {
  /** Hour start as `YYYY-MM-DDTHH:00:00Z`. */
  hour: string;
  requests: number;
  cachedRequests: number;
  inputTokens: number | null;
  cachedTokens: number | null;
  cacheCreationTokens: number | null;
  estimated: boolean;
  cachedTokensComplete: boolean;
  cacheCreationTokensComplete: boolean;
}

/**
 * One successful request of a connection, as stored. Values are passed through
 * untouched; the speed math decides how to read missing or malformed numbers.
 */
export interface ConnectionSpeedSample {
  model: unknown;
  latencyMs: unknown;
  ttftMs: unknown;
  tokensOutput: unknown;
  tokensReasoning: unknown;
}

export interface UsageStatsReadRepository {
  /** Cache totals overall, per provider and per combo strategy. */
  getCacheUsageSnapshot(): Promise<CacheUsageSnapshot>;
  /** Hourly cache buckets for rows newer than `hours` hours ago. */
  listCacheTrend(hours: number): Promise<CacheTrendBucket[]>;
  /**
   * Input + output tokens of the current UTC calendar month: live
   * `usage_history` rows plus rolled-up `daily_usage_summary` days. Rows are
   * rolled up only right before they are deleted, so nothing is counted twice.
   */
  sumTokensThisMonth(): Promise<number>;
  /**
   * The newest `limit` successful rows of one connection, newest first.
   * `limit` must be a positive integer.
   */
  listRecentConnectionSpeedSamples(
    connectionId: string,
    limit: number
  ): Promise<ConnectionSpeedSample[]>;
}
