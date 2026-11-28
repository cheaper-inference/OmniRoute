import { getDbInstance } from "./core.ts";
import type { SqliteAdapter } from "./adapters/types.ts";
import { usageStatsRepositories } from "./repositories/usageStatsRepositories.ts";

/**
 * Total input+output tokens for the current calendar month, across BOTH storage legs:
 *
 * 1. `daily_usage_summary` — the rolled-up aggregate (filled only by the retention
 *    cleanup path rolling up rows OLDER than `retention.usageHistory`, default 365 days),
 *    so the current month's rows never appear here until ~a year later (or the operator
 *    lowers retention).
 * 2. `usage_history` — the live per-request rows (written by `saveRequestUsage` with
 *    `tokens_input`/`tokens_output` and an ISO `timestamp`), which hold the current month's
 *    actual usage.
 *
 * #10381: reading only leg 1 always returned ~0 for the current month. No double-count:
 * a row is rolled into `daily_usage_summary` only immediately before being deleted from
 * `usage_history` by the same cleanup step. The analytics layer uses the same
 * reconciliation in `buildUnifiedSource`.
 *
 * The query lives in `repositories/sqliteUsageStatsReadRepository.ts`; the
 * explicit `db` parameter and the 0 fallback on failure stay here.
 */
export function sumUsageTokensThisMonth(db: SqliteAdapter = getDbInstance()): number {
  try {
    return usageStatsRepositories.legacySync.sumTokensThisMonth(db);
  } catch {
    return 0; // table may not exist yet on a fresh install — treat as 0 used
  }
}
