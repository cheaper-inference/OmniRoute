/**
 * db/quotaSchedules.ts — quota schedule persistence facade.
 *
 * Time-aware quota windows for a quota pool. See migration 189 and
 * src/lib/quota/schedules.ts for the semantics.
 *
 * Routes use getQuotaScheduleRepository() for the Promise-based domain API.
 * The function exports remain synchronous, SQLite-only legacy helpers for the
 * quota enforce hot path and for pool updates that drop schedules inside their
 * own SQLite transaction. Both delegate to the same SQL implementation.
 */

import type {
  QuotaSchedule,
  QuotaScheduleRepository,
  ScheduleInput,
} from "@/domain/persistence/quotaDefinitionRepositories";
import { quotaDefinitionRepositories } from "./repositories/quotaDefinitionRepositories";

export type { ScheduleInput } from "@/domain/persistence/quotaDefinitionRepositories";
export { parseDays, parseReserves } from "./repositories/sqliteQuotaScheduleRepository";

const legacy = quotaDefinitionRepositories.legacySync.schedules;

/** Route-facing async persistence contract; callers await its operations. */
export function getQuotaScheduleRepository(): QuotaScheduleRepository {
  return quotaDefinitionRepositories.schedules;
}

/**
 * All schedules for a pool, ordered priority DESC then id ASC — the same order
 * `resolveActiveSchedule` applies, so the UI list reads as the engine resolves.
 * Returns [] when the table is missing (migration not yet applied): schedules
 * are additive, and their absence must never block traffic.
 */
export function listSchedules(poolId: string): QuotaSchedule[] {
  return legacy.listSchedules(poolId);
}

/** Only the enabled rows — what the hot path needs. */
export function listEnabledSchedules(poolId: string): QuotaSchedule[] {
  return legacy.listEnabledSchedules(poolId);
}

/**
 * Replace a pool's entire schedule set in one transaction.
 *
 * @returns the persisted schedules, in resolution order.
 */
export function replaceSchedules(poolId: string, schedules: ScheduleInput[]): QuotaSchedule[] {
  return legacy.replaceSchedules(poolId, schedules);
}

/**
 * Drop every schedule of a pool. Called when the pool itself is deleted — the
 * table has no FK cascade, for the same reason quota_allocation_model_caps has
 * none (avoiding a fragile 3-table cascade chain in SQLite).
 */
export function deleteSchedulesForPool(poolId: string): number {
  return legacy.deleteSchedulesForPool(poolId);
}
