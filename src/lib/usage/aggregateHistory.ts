/**
 * Aggregation utility functions for usage data summarization.
 * Rolls up usage_history (and quota_snapshots) into daily summary tables.
 *
 * @module lib/usage/aggregateHistory
 */

import { getDbInstance } from "../db/core";
import { getUserDatabaseSettings } from "../db/databaseSettings";
import { calculateCost } from "./costCalculator";

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
export async function rollupUsageHistoryBeforeDate(beforeDate: string): Promise<AggregationResult> {
  const db = getDbInstance();

  const result: AggregationResult = {
    processed: 0,
    inserted: 0,
    errors: 0,
  };

  try {
    const rollupStartedAt = new Date().toISOString();
    const teamAggregateQuery = `
      WITH shape_counts AS (
        SELECT billing_team_id AS team_id,
          COALESCE(NULLIF(api_key_id, ''), 'unknown') AS api_key_id,
          MAX(NULLIF(api_key_name, '')) AS api_key_name,
          COALESCE(NULLIF(LOWER(provider), ''), '__unknown_provider__') AS provider,
          COALESCE(NULLIF(LOWER(model), ''), '__unknown_model__') AS model,
          COALESCE(NULLIF(service_tier, ''), 'standard') AS service_tier,
          DATE(timestamp) AS date,
          json_array(COALESCE(tokens_input,0), COALESCE(tokens_output,0), COALESCE(tokens_cache_read,0), COALESCE(tokens_cache_creation,0), COALESCE(tokens_reasoning,0)) AS shape,
          COUNT(*) AS count_all,
          SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END) AS count_success
        FROM usage_history
        WHERE timestamp < ? AND billing_team_id IS NOT NULL AND billing_team_id != ''
          AND team_rollup_processed_at IS NULL
        GROUP BY billing_team_id, COALESCE(NULLIF(api_key_id, ''), 'unknown'),
          COALESCE(NULLIF(LOWER(provider), ''), '__unknown_provider__'),
          COALESCE(NULLIF(LOWER(model), ''), '__unknown_model__'),
          COALESCE(NULLIF(service_tier, ''), 'standard'), DATE(timestamp), shape
      ), grouped_shapes AS (
        SELECT team_id, api_key_id, api_key_name, provider, model, service_tier, date,
          json_group_object(shape, count_all) AS token_shapes_json,
          json_group_object(shape, count_success) AS successful_token_shapes_json
        FROM shape_counts
        GROUP BY team_id, api_key_id, provider, model, service_tier, date
      )
      INSERT INTO daily_team_usage_summary (
        team_id, api_key_id, api_key_name, provider, model, service_tier, date,
        total_requests, successful_requests, total_input_tokens, total_output_tokens,
        total_cache_read_tokens, total_cache_creation_tokens, total_reasoning_tokens,
        successful_input_tokens, successful_output_tokens, successful_cache_read_tokens,
        successful_cache_creation_tokens, successful_reasoning_tokens,
        token_shapes_json, successful_token_shapes_json
      )
      SELECT
        uh.billing_team_id,
        COALESCE(NULLIF(uh.api_key_id, ''), 'unknown'),
        MAX(NULLIF(uh.api_key_name, '')),
        COALESCE(NULLIF(LOWER(uh.provider), ''), '__unknown_provider__'),
        COALESCE(NULLIF(LOWER(uh.model), ''), '__unknown_model__'),
        COALESCE(NULLIF(uh.service_tier, ''), 'standard'),
        DATE(uh.timestamp),
        COUNT(*),
        COALESCE(SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END), 0),
        COALESCE(SUM(uh.tokens_input), 0),
        COALESCE(SUM(uh.tokens_output), 0),
        COALESCE(SUM(uh.tokens_cache_read), 0),
        COALESCE(SUM(uh.tokens_cache_creation), 0),
        COALESCE(SUM(uh.tokens_reasoning), 0),
        COALESCE(SUM(CASE WHEN uh.success = 1 THEN uh.tokens_input ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN uh.success = 1 THEN uh.tokens_output ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN uh.success = 1 THEN uh.tokens_cache_read ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN uh.success = 1 THEN uh.tokens_cache_creation ELSE 0 END), 0),
        COALESCE(SUM(CASE WHEN uh.success = 1 THEN uh.tokens_reasoning ELSE 0 END), 0),
        grouped_shapes.token_shapes_json, grouped_shapes.successful_token_shapes_json
      FROM usage_history AS uh
      JOIN grouped_shapes ON grouped_shapes.team_id = uh.billing_team_id
        AND grouped_shapes.api_key_id = COALESCE(NULLIF(uh.api_key_id, ''), 'unknown')
        AND grouped_shapes.provider = COALESCE(NULLIF(LOWER(uh.provider), ''), '__unknown_provider__')
        AND grouped_shapes.model = COALESCE(NULLIF(LOWER(uh.model), ''), '__unknown_model__')
        AND grouped_shapes.service_tier = COALESCE(NULLIF(uh.service_tier, ''), 'standard')
        AND grouped_shapes.date = DATE(uh.timestamp)
      WHERE uh.timestamp < ?
        AND uh.billing_team_id IS NOT NULL AND uh.billing_team_id != ''
        AND uh.team_rollup_processed_at IS NULL
      GROUP BY uh.billing_team_id, COALESCE(NULLIF(uh.api_key_id, ''), 'unknown'),
        COALESCE(NULLIF(LOWER(uh.provider), ''), '__unknown_provider__'),
        COALESCE(NULLIF(LOWER(uh.model), ''), '__unknown_model__'),
        COALESCE(NULLIF(uh.service_tier, ''), 'standard'), DATE(uh.timestamp)
      ON CONFLICT(team_id, api_key_id, provider, model, service_tier, date) DO UPDATE SET
        api_key_name = COALESCE(excluded.api_key_name, daily_team_usage_summary.api_key_name),
        total_requests = daily_team_usage_summary.total_requests + excluded.total_requests,
        successful_requests = daily_team_usage_summary.successful_requests + excluded.successful_requests,
        total_input_tokens = daily_team_usage_summary.total_input_tokens + excluded.total_input_tokens,
        total_output_tokens = daily_team_usage_summary.total_output_tokens + excluded.total_output_tokens,
        total_cache_read_tokens = daily_team_usage_summary.total_cache_read_tokens + excluded.total_cache_read_tokens,
        total_cache_creation_tokens = daily_team_usage_summary.total_cache_creation_tokens + excluded.total_cache_creation_tokens,
        total_reasoning_tokens = daily_team_usage_summary.total_reasoning_tokens + excluded.total_reasoning_tokens,
        successful_input_tokens = daily_team_usage_summary.successful_input_tokens + excluded.successful_input_tokens,
        successful_output_tokens = daily_team_usage_summary.successful_output_tokens + excluded.successful_output_tokens,
        successful_cache_read_tokens = daily_team_usage_summary.successful_cache_read_tokens + excluded.successful_cache_read_tokens,
        successful_cache_creation_tokens = daily_team_usage_summary.successful_cache_creation_tokens + excluded.successful_cache_creation_tokens,
        successful_reasoning_tokens = daily_team_usage_summary.successful_reasoning_tokens + excluded.successful_reasoning_tokens,
        token_shapes_json = CASE WHEN daily_team_usage_summary.total_requests > 0
          AND daily_team_usage_summary.token_shapes_json IS NULL THEN NULL ELSE (
          SELECT json_group_object(shape, total) FROM (
            SELECT key AS shape, SUM(value) AS total FROM (
              SELECT key, value FROM json_each(COALESCE(daily_team_usage_summary.token_shapes_json, '{}'))
              UNION ALL SELECT key, value FROM json_each(excluded.token_shapes_json)
            ) GROUP BY key
          )
        ) END,
        successful_token_shapes_json = CASE WHEN daily_team_usage_summary.successful_requests > 0
          AND daily_team_usage_summary.successful_token_shapes_json IS NULL THEN NULL ELSE (
          SELECT json_group_object(shape, total) FROM (
            SELECT key AS shape, SUM(value) AS total FROM (
              SELECT key, value FROM json_each(COALESCE(daily_team_usage_summary.successful_token_shapes_json, '{}'))
              UNION ALL SELECT key, value FROM json_each(excluded.successful_token_shapes_json)
            ) GROUP BY key
          )
        ) END
    `;
    const rows = db
      .prepare(
        `SELECT
          LOWER(provider) as provider,
          LOWER(model) as model,
          DATE(timestamp) as date,
          COALESCE(NULLIF(service_tier, ''), 'standard') as serviceTier,
          COUNT(*) as totalRequests,
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
          AND provider IS NOT NULL AND provider != ''
          AND model IS NOT NULL AND model != ''
        GROUP BY LOWER(provider), LOWER(model), DATE(timestamp), serviceTier,
          requestInputTokens, requestOutputTokens, requestCacheReadTokens,
          requestCacheCreationTokens, requestReasoningTokens, hasStoredCost`
      )
      .all(beforeDate) as Array<{
      provider: string;
      model: string;
      date: string;
      serviceTier: string;
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
      rows.map(async (row) => ({
        ...row,
        // Price one request of this exact token shape, then multiply by how many
        // identical requests the group holds. Pricing is a pure function of the
        // token shape, so this equals per-request pricing while still collapsing
        // duplicates. Pricing the day's SUMMED tokens instead would be wrong:
        // non-cached input is clamped at zero per request, and summing first lets
        // one cache-heavy request's clamped surplus cancel another request's
        // billable input.
        //
        // A request with a provider-reported exact cost (`provider_cost_usd`) is
        // archived at that cost; none of its tokens are priced.
        totalCost: row.hasStoredCost
          ? row.storedCost
          : (await calculateCost(
              row.provider,
              row.model,
              {
                input: row.requestInputTokens,
                output: row.requestOutputTokens,
                cacheRead: row.requestCacheReadTokens,
                cacheCreation: row.requestCacheCreationTokens,
                reasoning: row.requestReasoningTokens,
              },
              {
                provider: row.provider,
                model: row.model,
                serviceTier: row.serviceTier,
                // The archive stores API-equivalent value. Billed-cost consumers
                // still mask flat-rate providers when they read this value.
                flatRateAsZero: false,
              }
            )) * row.totalRequests,
      }))
    );

    const archivedRows = Array.from(
      pricedRows
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
    const insertRows = db.transaction((items: typeof archivedRows) => {
      const changes = items.reduce(
        (total, row) =>
          total +
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
      );
      // The Team upsert and raw-row processed marker are one transaction. If
      // either fails, neither becomes visible and a retry cannot double count.
      db.prepare(teamAggregateQuery).run(beforeDate, beforeDate);
      db.prepare(
        `UPDATE usage_history
         SET team_rollup_processed_at = ?
         WHERE timestamp < ?
           AND billing_team_id IS NOT NULL AND billing_team_id != ''
           AND team_rollup_processed_at IS NULL`
      ).run(rollupStartedAt, beforeDate);
      return changes;
    });

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
