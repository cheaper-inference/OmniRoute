/**
 * db/usageAnalytics/sources.ts — Pure SQL source-string builders for usage analytics.
 *
 * Builds the UNION subqueries that merge recent `usage_history` rows with
 * published `usage_daily_summary` days. These functions are pure (no DB calls, no imports)
 * and are consumed by the query functions in the parent `usageAnalytics.ts` module.
 */

export type AnalyticsParams = Record<string, string>;

// ---------------------------------------------------------------------------
// Unified source CTE builder
// ---------------------------------------------------------------------------

export interface BuildUnifiedSourceOptions {
  /** ISO-8601 timestamp lower bound (e.g. "2024-01-01T00:00:00.000Z"). Null = all time. */
  sinceIso: string | null;
  /** ISO-8601 timestamp upper bound. Null = no upper bound. */
  untilIso: string | null;
  /**
   * YYYY-MM-DD of the last published day. Null means nothing is published yet,
   * so the read stays on usage_history.
   */
  rawCutoffDate: string | null;
  /**
   * SQL condition fragment for API-key filtering, e.g.
   * "(api_key_name IN (@apiKey0) OR api_key_id IN (@apiKey0))".
   * Empty string or null = no API-key filter.
   */
  apiKeyWhere: string | null;
  /** Named-param entries for the apiKey placeholders (apiKey0, apiKey1, …). */
  apiKeyParams: AnalyticsParams;
}

export interface UnifiedSourceResult {
  /** Pre-built subquery SQL string (parenthesised, suitable for `FROM <unifiedSource> AS _u`). */
  unifiedSource: string;
  /** Named params that must be passed to every query that uses `unifiedSource`. */
  unifiedParams: AnalyticsParams;
}

/**
 * Stored cost and priceable tokens of a raw usage_history row. A row carrying a
 * provider-reported exact cost (`provider_cost_usd` — credit-metered providers,
 * xAI) is billed by that cost; its tokens stay for display and are never priced
 * again. Rows without one are priced from their tokens as before.
 */
const RAW_COST_COLUMNS = `
          COALESCE(provider_cost_usd, 0.0) as stored_cost,
          CASE WHEN provider_cost_usd IS NULL THEN tokens_input ELSE 0 END as cost_tokens_input,
          CASE WHEN provider_cost_usd IS NULL THEN tokens_output ELSE 0 END as cost_tokens_output,
          CASE WHEN provider_cost_usd IS NULL THEN tokens_cache_read ELSE 0 END as cost_tokens_cache_read,
          CASE WHEN provider_cost_usd IS NULL THEN tokens_cache_creation ELSE 0 END as cost_tokens_cache_creation,
          CASE WHEN provider_cost_usd IS NULL THEN tokens_reasoning ELSE 0 END as cost_tokens_reasoning`;

/**
 * The same columns for a usage_daily_summary row. Its `total_cost` is already
 * priced at rollup time; a legacy zero-cost summary falls back to its
 * input/output totals (see computeUsageRowCost in the analytics route).
 * Cache and reasoning totals are kept so a published day is priced the same
 * way a raw day is.
 */
const SUMMARY_COST_COLUMNS = `
          COALESCE(total_cost, 0.0) as stored_cost,
          total_input_tokens as cost_tokens_input,
          total_output_tokens as cost_tokens_output,
          total_cache_read_tokens as cost_tokens_cache_read,
          total_cache_creation_tokens as cost_tokens_cache_creation,
          total_reasoning_tokens as cost_tokens_reasoning`;

/**
 * A date no usage row can precede. Passing it as the cutoff selects no
 * summary rows, which is what a NULL pointer must do.
 */
export const UNPUBLISHED_CUTOFF_DATE = "0000-01-01";

/**
 * The last day published with no gap. NULL until the first day is published,
 * in which case the read stays on usage_history.
 */
export function readPublishedCutoffDate(db: {
  prepare: (sql: string) => { get: () => unknown };
}): string {
  const pointer = db
    .prepare("SELECT last_completed_date FROM rollup_state WHERE tier = 'daily'")
    .get() as { last_completed_date: string | null } | undefined;
  return pointer?.last_completed_date ?? UNPUBLISHED_CUTOFF_DATE;
}

function includesPublishedDays(
  rawCutoffDate: string,
  sinceDate: string | null,
  apiKeyWhere: string | null
): boolean {
  return (!sinceDate || sinceDate <= rawCutoffDate) && !apiKeyWhere;
}

/**
 * Builds the UNION subquery that merges recent `usage_history` rows with
 * published `usage_daily_summary` days, preventing double-counting and
 * preventing api_key leakage from summary rows.
 *
 * The returned `unifiedSource` is a parenthesised subquery suitable for use
 * as `FROM ${unifiedSource} AS _u`.  All WHERE filters are embedded inside
 * the subquery — no additional outer WHERE is needed.
 */
export function buildUnifiedSource(opts: BuildUnifiedSourceOptions): UnifiedSourceResult {
  const { sinceIso, untilIso, rawCutoffDate, apiKeyWhere, apiKeyParams } = opts;
  const sinceDate = sinceIso?.split("T")[0] ?? null;

  // A null pointer means no day is published, so the read stays on raw rows.
  // Include summaries only when the window starts on or before the last
  // published day and no api_key filter is active.
  const needsAggregated =
    rawCutoffDate !== null && includesPublishedDays(rawCutoffDate, sinceDate, apiKeyWhere);

  const unifiedParams: AnalyticsParams = {};

  // Raw rows start after the last published day, so that day is not counted twice.
  const rawConditions: string[] = [];
  if (needsAggregated) {
    rawConditions.push("DATE(timestamp) > @rawCutoff");
    unifiedParams.rawCutoff = rawCutoffDate;
  } else if (sinceIso) {
    rawConditions.push("timestamp >= @since");
    unifiedParams.since = sinceIso;
  }
  if (untilIso) {
    rawConditions.push("timestamp <= @until");
    unifiedParams.until = untilIso;
  }
  if (apiKeyWhere) {
    rawConditions.push(apiKeyWhere);
    Object.assign(unifiedParams, apiKeyParams);
  }
  const rawWhere = rawConditions.length > 0 ? `WHERE ${rawConditions.join(" AND ")}` : "";

  // Aggregated leg includes the published cutoff day itself.
  const aggConditions: string[] = [];
  if (needsAggregated) {
    if (sinceIso) {
      aggConditions.push("date >= @sinceDate");
      unifiedParams.sinceDate = sinceDate!;
    }
    if (untilIso) {
      aggConditions.push("date <= @untilDate");
      unifiedParams.untilDate = untilIso.split("T")[0];
    }
    aggConditions.push("date <= @rawCutoffDate");
    unifiedParams.rawCutoffDate = rawCutoffDate;
  }
  const aggWhere = aggConditions.length > 0 ? `WHERE ${aggConditions.join(" AND ")}` : "";
  const unifiedSource = needsAggregated
    ? `(
        SELECT
          timestamp,
          provider,
          model,
          tokens_input,
          tokens_output,
          tokens_cache_read,
          tokens_cache_creation,
          tokens_reasoning,
          service_tier,
          success,
          latency_ms,
          connection_id,
          account_key,
          api_key_id,
          api_key_name,
          ${RAW_COST_COLUMNS},
          0 as is_aggregated,
          1 as requests
        FROM usage_history
        ${rawWhere}
        UNION ALL
        SELECT
          date || 'T12:00:00.000Z' as timestamp,
          provider,
          model,
          total_input_tokens as tokens_input,
          total_output_tokens as tokens_output,
          total_cache_read_tokens as tokens_cache_read,
          total_cache_creation_tokens as tokens_cache_creation,
          total_reasoning_tokens as tokens_reasoning,
          service_tier,
          1 as success,
          NULL as latency_ms,
          NULL as connection_id,
          NULL as account_key,
          NULL as api_key_id,
          NULL as api_key_name,
          ${SUMMARY_COST_COLUMNS},
          1 as is_aggregated,
          total_requests as requests
        FROM usage_daily_summary
        ${aggWhere}
       )`
    : `(SELECT
          timestamp, provider, model,
          tokens_input, tokens_output,
          tokens_cache_read, tokens_cache_creation, tokens_reasoning,
          service_tier, success, latency_ms,
          connection_id, account_key, api_key_id, api_key_name,
          ${RAW_COST_COLUMNS},
          0 as is_aggregated,
          1 as requests
        FROM usage_history
        ${rawWhere}
      )`;

  return { unifiedSource, unifiedParams };
}

/**
 * Builds the UNION subquery for preset cost calculations (narrower column set
 * than the main analytics query — no connection_id / api_key columns needed).
 */
export function buildPresetUnifiedSource(opts: BuildUnifiedSourceOptions): UnifiedSourceResult {
  const { sinceIso, untilIso, rawCutoffDate, apiKeyWhere, apiKeyParams } = opts;
  const sinceDate = sinceIso?.split("T")[0] ?? null;

  const needsAggregated =
    rawCutoffDate !== null && includesPublishedDays(rawCutoffDate, sinceDate, apiKeyWhere);

  const presetParams: AnalyticsParams = {};

  const rawConditions: string[] = [];
  if (needsAggregated) {
    rawConditions.push("DATE(timestamp) > @presetRawCutoff");
    presetParams.presetRawCutoff = rawCutoffDate;
  } else if (sinceIso) {
    rawConditions.push("timestamp >= @presetSince");
    presetParams.presetSince = sinceIso;
  }
  if (apiKeyWhere) {
    rawConditions.push(apiKeyWhere);
    Object.assign(presetParams, apiKeyParams);
  }
  const presetRawWhere = rawConditions.length > 0 ? `WHERE ${rawConditions.join(" AND ")}` : "";

  const aggConditions: string[] = [];
  if (needsAggregated) {
    if (sinceIso) {
      aggConditions.push("date >= @presetSinceDate");
      presetParams.presetSinceDate = sinceDate!;
    }
    aggConditions.push("date <= @presetRawCutoffDate");
    presetParams.presetRawCutoffDate = rawCutoffDate;
  }
  const presetAggWhere = aggConditions.length > 0 ? `WHERE ${aggConditions.join(" AND ")}` : "";

  const unifiedSource = needsAggregated
    ? `(
        SELECT timestamp, provider, model, service_tier,
          tokens_input, tokens_output,
          tokens_cache_read, tokens_cache_creation, tokens_reasoning,
          ${RAW_COST_COLUMNS},
          0 as is_aggregated
        FROM usage_history
        ${presetRawWhere}
        UNION ALL
        SELECT
          date || 'T12:00:00.000Z' as timestamp,
          provider, model,
          service_tier,
          total_input_tokens as tokens_input,
          total_output_tokens as tokens_output,
          total_cache_read_tokens as tokens_cache_read,
          total_cache_creation_tokens as tokens_cache_creation,
          total_reasoning_tokens as tokens_reasoning,
          ${SUMMARY_COST_COLUMNS},
          1 as is_aggregated
        FROM usage_daily_summary
        ${presetAggWhere}
      )`
    : `(SELECT timestamp, provider, model, service_tier,
          tokens_input, tokens_output,
          tokens_cache_read, tokens_cache_creation, tokens_reasoning,
          ${RAW_COST_COLUMNS},
          0 as is_aggregated
        FROM usage_history
        ${presetRawWhere}
      )`;

  return { unifiedSource, unifiedParams: presetParams };
}
