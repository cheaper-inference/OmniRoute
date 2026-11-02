import { getDbInstance } from "./core.ts";
import type { SqliteAdapter } from "./adapters/types.ts";

/**
 * Total input+output tokens for the current calendar month, across BOTH storage legs:
 *
 * 1. `usage_daily_summary` -- published days. A day is published here and then
 *    deleted from raw storage only when retention cleanup retires it. The daily
 *    rollup publishes a closed day and leaves its raw rows in place.
 * 2. `usage_history` -- the live per-request rows (written by `saveRequestUsage` with
 *    `tokens_input`/`tokens_output` and an ISO `timestamp`), which hold the current month's
 *    actual usage.
 *
 * A published key is counted from the summary. Raw rows are excluded only when
 * their normalized provider/model/service-tier/date key has a summary, so
 * invalidating a partial reset boundary immediately exposes surviving raw rows. `daily_usage_summary` is the quota rollup and is not read here.
 */
export function sumUsageTokensThisMonth(db: SqliteAdapter = getDbInstance()): number {
  try {
    const row = db
      .prepare(
        `SELECT
           COALESCE((
             SELECT SUM(tokens_input + tokens_output)
             FROM usage_history
             WHERE timestamp >= strftime('%Y-%m-01T00:00:00.000Z','now')
               AND timestamp < strftime('%Y-%m-01T00:00:00.000Z','now','+1 month')
               AND NOT EXISTS (
                 SELECT 1 FROM usage_daily_summary s WHERE s.date = DATE(usage_history.timestamp)
                   AND s.provider = LOWER(usage_history.provider)
                   AND s.model = LOWER(usage_history.model)
                   AND s.service_tier = COALESCE(NULLIF(usage_history.service_tier, ''), 'standard')
               )
           ), 0) +
           COALESCE((
             SELECT SUM(total_input_tokens + total_output_tokens)
             FROM usage_daily_summary
             WHERE date >= strftime('%Y-%m-01', 'now')
           ), 0) AS used`
      )
      .get() as { used: number } | undefined;
    return row?.used ?? 0;
  } catch {
    return 0; // table may not exist yet on a fresh install -- treat as 0 used
  }
}
