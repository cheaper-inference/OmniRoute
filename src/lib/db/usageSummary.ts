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
 * A published day is counted from the summary. Its raw rows stay excluded while
 * the day is at or before the published pointer, which is the same cutoff the
 * analytics read uses. `daily_usage_summary` is the quota rollup and is not read here.
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
               AND DATE(timestamp) > COALESCE(
                 (SELECT last_completed_date FROM rollup_state WHERE tier = 'daily'),
                 '0000-01-01'
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
