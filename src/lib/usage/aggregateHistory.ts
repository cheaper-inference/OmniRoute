/**
 * Aggregation utility functions for usage data summarization.
 * Rolls up usage_history (and quota_snapshots) into daily summary tables.
 *
 * @module lib/usage/aggregateHistory
 */

import { getDbInstance } from "../db/core";
import { getUserDatabaseSettings } from "../db/databaseSettings";
import { calculateCost, calculateCostDetailed } from "./costCalculator";
import {
  createNativeUsagePricingScope,
  nativeUsageSql,
  type NativeUsagePricingScope,
} from "./nativeUsagePricing";

interface AggregationResult {
  processed: number;
  inserted: number;
  errors: number;
}

/**
 * Roll up quota_snapshots into daily_usage_summary table.
 * Aggregates by provider, model, and date.
 *
 * @param fromDate - Start date (YYYY-MM-DD format)
 * @param toDate - End date (YYYY-MM-DD format)
 * @returns Aggregation result with counts
 */
export async function rollupDailyUsage(
  fromDate: string,
  toDate: string
): Promise<AggregationResult> {
  const db = getDbInstance();

  const result: AggregationResult = {
    processed: 0,
    inserted: 0,
    errors: 0,
  };

  try {
    // Aggregate quota_snapshots by provider, model, and date
    const aggregateQuery = `
      INSERT INTO daily_usage_summary (provider, model, date, total_requests, total_input_tokens, total_output_tokens, total_cost)
      SELECT 
        provider,
        COALESCE(json_extract(raw_data, '$.model'), 'unknown') as model,
        DATE(created_at) as date,
        COUNT(*) as total_requests,
        COALESCE(SUM(CAST(json_extract(raw_data, '$.input_tokens') AS INTEGER)), 0) as total_input_tokens,
        COALESCE(SUM(CAST(json_extract(raw_data, '$.output_tokens') AS INTEGER)), 0) as total_output_tokens,
        COALESCE(SUM(CAST(json_extract(raw_data, '$.cost') AS REAL)), 0.0) as total_cost
      FROM quota_snapshots
      WHERE DATE(created_at) >= ? AND DATE(created_at) <= ?
      GROUP BY provider, model, DATE(created_at)
      ON CONFLICT(provider, model, date) DO UPDATE SET
        total_requests = excluded.total_requests,
        total_input_tokens = excluded.total_input_tokens,
        total_output_tokens = excluded.total_output_tokens,
        total_cost = excluded.total_cost
    `;

    const stmt = db.prepare(aggregateQuery);
    const runResult = stmt.run(fromDate, toDate);

    result.processed = runResult.changes;
    result.inserted = runResult.changes;

    console.log(`[Aggregation] Daily rollup: ${result.inserted} rows for ${fromDate} to ${toDate}`);
  } catch (err: any) {
    console.error("[Aggregation] Daily rollup error:", err);
    result.errors++;
  }

  return result;
}

/**
 * Roll up quota_snapshots into hourly_usage_summary table.
 * Aggregates by provider, model, and hour.
 *
 * @param fromDate - Start datetime (YYYY-MM-DD HH:MM:SS format)
 * @param toDate - End datetime (YYYY-MM-DD HH:MM:SS format)
 * @returns Aggregation result with counts
 */
export async function rollupHourlyQuota(
  fromDate: string,
  toDate: string
): Promise<AggregationResult> {
  const db = getDbInstance();

  const result: AggregationResult = {
    processed: 0,
    inserted: 0,
    errors: 0,
  };

  try {
    // Aggregate quota_snapshots by provider, model, and hour
    const aggregateQuery = `
      INSERT INTO hourly_usage_summary (provider, model, date_hour, total_requests, total_input_tokens, total_output_tokens, total_cost)
      SELECT 
        provider,
        COALESCE(json_extract(raw_data, '$.model'), 'unknown') as model,
        datetime(strftime('%Y-%m-%d %H:00:00', created_at)) as date_hour,
        COUNT(*) as total_requests,
        COALESCE(SUM(CAST(json_extract(raw_data, '$.input_tokens') AS INTEGER)), 0) as total_input_tokens,
        COALESCE(SUM(CAST(json_extract(raw_data, '$.output_tokens') AS INTEGER)), 0) as total_output_tokens,
        COALESCE(SUM(CAST(json_extract(raw_data, '$.cost') AS REAL)), 0.0) as total_cost
      FROM quota_snapshots
      WHERE created_at >= ? AND created_at <= ?
      GROUP BY provider, model, datetime(strftime('%Y-%m-%d %H:00:00', created_at))
      ON CONFLICT(provider, model, date_hour) DO UPDATE SET
        total_requests = excluded.total_requests,
        total_input_tokens = excluded.total_input_tokens,
        total_output_tokens = excluded.total_output_tokens,
        total_cost = excluded.total_cost
    `;

    const stmt = db.prepare(aggregateQuery);
    const runResult = stmt.run(fromDate, toDate);

    result.processed = runResult.changes;
    result.inserted = runResult.changes;

    console.log(
      `[Aggregation] Hourly rollup: ${result.inserted} rows for ${fromDate} to ${toDate}`
    );
  } catch (err: any) {
    console.error("[Aggregation] Hourly rollup error:", err);
    result.errors++;
  }

  return result;
}

/**
 * Roll up usage_history into daily_usage_summary before raw rows are deleted.
 * This is the authoritative rollup — sourced from actual per-request token data,
 * not from quota_snapshots. Should be called before cleanupUsageHistory() deletes rows.
 *
 * Each complete provider/model/day row replaces any prior summary. usage_history
 * is authoritative, so retries after a crash between rollup and delete remain
 * idempotent instead of double-counting the same raw rows.
 *
 * @param beforeDate - ISO timestamp/date boundary. Rows strictly before this value are rolled up.
 * @returns Aggregation result with counts
 */
export async function rollupUsageHistoryBeforeDate(
  beforeDate: string,
  providedPricingScope?: NativeUsagePricingScope
): Promise<AggregationResult> {
  const db = getDbInstance();

  const result: AggregationResult = {
    processed: 0,
    inserted: 0,
    errors: 0,
  };

  try {
    const pricing = providedPricingScope ?? (await createNativeUsagePricingScope());
    const rows = db
      .prepare(
        `SELECT
          LOWER(provider) as provider,
          LOWER(model) as model,
          DATE(timestamp) as date,
          COALESCE(NULLIF(service_tier, ''), 'standard') as serviceTier,
          COUNT(*) as totalRequests,
          CASE WHEN ${nativeUsageSql()} THEN 1 ELSE 0 END as nativeUsage,
          COALESCE(tokens_input, 0) as requestInputTokens,
          COALESCE(tokens_output, 0) as requestOutputTokens,
          COALESCE(tokens_cache_read, 0) as requestCacheReadTokens,
          COALESCE(tokens_cache_creation, 0) as requestCacheCreationTokens,
          COALESCE(tokens_reasoning, 0) as requestReasoningTokens,
          COALESCE(SUM(tokens_input), 0) as inputTokens,
          COALESCE(SUM(tokens_output), 0) as outputTokens,
          COALESCE(SUM(tokens_cache_read), 0) as cacheReadTokens,
          COALESCE(SUM(tokens_cache_creation), 0) as cacheCreationTokens,
          COALESCE(SUM(tokens_reasoning), 0) as reasoningTokens,
          (provider_cost_usd IS NOT NULL) as hasStoredCost,
          COALESCE(SUM(provider_cost_usd), 0) as storedCost
        FROM usage_history
        WHERE timestamp < ?
          AND NOT ${pricing.retainedGroupSql()}
          AND provider IS NOT NULL AND provider != ''
          AND model IS NOT NULL AND model != ''
        GROUP BY LOWER(provider), LOWER(model), DATE(timestamp), serviceTier,
          requestInputTokens, requestOutputTokens, requestCacheReadTokens,
          requestCacheCreationTokens, requestReasoningTokens, hasStoredCost, nativeUsage`
      )
      .all(beforeDate) as Array<{
      provider: string;
      model: string;
      date: string;
      serviceTier: string;
      nativeUsage: number;
      totalRequests: number;
      requestInputTokens: number;
      requestOutputTokens: number;
      requestCacheReadTokens: number;
      requestCacheCreationTokens: number;
      requestReasoningTokens: number;
      inputTokens: number;
      outputTokens: number;
      cacheReadTokens: number;
      cacheCreationTokens: number;
      reasoningTokens: number;
      hasStoredCost: number;
      storedCost: number;
    }>;

    const pricedRows = await Promise.all(
      rows.map(async (row) => {
        if (row.hasStoredCost) return { ...row, totalCost: row.storedCost, unpriced: false };
        // Preserve per-request token shapes (not summed tokens) for tier/cache
        // pricing. Native rates may have disappeared since scope construction.
        const tokens = {
          input: row.requestInputTokens,
          output: row.requestOutputTokens,
          cacheRead: row.requestCacheReadTokens,
          cacheCreation: row.requestCacheCreationTokens,
          reasoning: row.requestReasoningTokens,
        };
        const options = {
          provider: row.provider,
          model: row.model,
          serviceTier: row.serviceTier,
          flatRateAsZero: false,
        };
        if (!row.nativeUsage) {
          return {
            ...row,
            totalCost:
              (await calculateCost(row.provider, row.model, tokens, options)) * row.totalRequests,
            unpriced: false,
          };
        }
        const result = await calculateCostDetailed(row.provider, row.model, tokens, options);
        const unpriced = !result.priced || result.failed === true;
        if (unpriced) pricing.markUnpriced(row.provider, row.model);
        return { ...row, totalCost: result.costUsd * row.totalRequests, unpriced };
      })
    );
    const heldDays = new Set(
      pricedRows
        .filter((row) => row.unpriced)
        .map((row) => `${row.provider}\u0000${row.model}\u0000${row.date}`)
    );

    const archivedRows = Array.from(
      pricedRows
        .filter((row) => !heldDays.has(`${row.provider}\u0000${row.model}\u0000${row.date}`))
        .reduce((byDay, row) => {
          const key = `${row.provider}\u0000${row.model}\u0000${row.date}`;
          const existing = byDay.get(key);
          if (existing) {
            existing.totalRequests += row.totalRequests;
            existing.inputTokens += row.inputTokens;
            existing.outputTokens += row.outputTokens;
            existing.totalCost += row.totalCost;
          } else {
            byDay.set(key, {
              provider: row.provider,
              model: row.model,
              date: row.date,
              totalRequests: row.totalRequests,
              inputTokens: row.inputTokens,
              outputTokens: row.outputTokens,
              totalCost: row.totalCost,
            });
          }
          return byDay;
        }, new Map<string, { provider: string; model: string; date: string; totalRequests: number; inputTokens: number; outputTokens: number; totalCost: number }>())
        .values()
    );

    const upsert = db.prepare(
      `INSERT INTO daily_usage_summary
        (provider, model, date, total_requests, total_input_tokens, total_output_tokens, total_cost)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(provider, model, date) DO UPDATE SET
        total_requests = excluded.total_requests,
        total_input_tokens = excluded.total_input_tokens,
        total_output_tokens = excluded.total_output_tokens,
        total_cost = excluded.total_cost`
    );
    const insertRows = db.transaction((items: typeof archivedRows) =>
      items.reduce(
        (changes, row) =>
          changes +
          upsert.run(
            row.provider,
            row.model,
            row.date,
            row.totalRequests,
            row.inputTokens,
            row.outputTokens,
            row.totalCost
          ).changes,
        0
      )
    );

    result.processed = rows.length;
    result.inserted = insertRows(archivedRows);

    console.log(
      `[Aggregation] usage_history rollup: ${result.inserted} rows for dates before ${beforeDate}`
    );
  } catch (err: any) {
    console.error("[Aggregation] usage_history rollup error:", err);
    result.errors++;
  }

  return result;
}

/**
 * Get the cutoff date for raw data based on retention settings.
 * Data older than this should be aggregated and cleaned up.
 *
 * @returns ISO date string (YYYY-MM-DD)
 */
export async function getRawDataCutoffDate(): Promise<string> {
  // The raw-data cutoff MUST match the actual rollup/delete boundary used by
  // cleanupUsageHistory (src/lib/db/cleanup.ts), which is driven by
  // retention.usageHistory — NOT aggregation.rawDataRetentionDays.
  // Using rawDataRetentionDays (default 7 per migration 046) creates a gap:
  // analytics floors raw data at day-7 while cleanup doesn't roll up until
  // day-30, so the window [day-30, day-7) is excluded from BOTH UNION legs.
  const rawDataRetentionDays = getUserDatabaseSettings().retention.usageHistory;

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - rawDataRetentionDays);

  return cutoffDate.toISOString().split("T")[0];
}

/**
 * Check if aggregation is enabled in settings.
 */
export async function isAggregationEnabled(): Promise<boolean> {
  return getUserDatabaseSettings().aggregation.enabled;
}
