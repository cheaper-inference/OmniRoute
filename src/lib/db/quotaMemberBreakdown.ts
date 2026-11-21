/**
 * Per-pool opt-in for the member usage bars of the self-service quota page.
 *
 * The setting lives in `quota_pools.member_breakdown` (0 or 1, default 0). It is kept in this
 * module, apart from the pool CRUD, so a pool row is read and written here only for this flag.
 */

import { getDbInstance } from "./core";

interface StatementLike<TRow> {
  get: (...params: unknown[]) => TRow | undefined;
  all: (...params: unknown[]) => TRow[];
  run: (...params: unknown[]) => { changes: number };
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
}

function getDb(): DbLike {
  return getDbInstance() as unknown as DbLike;
}

/** True only when the pool exists and its stored flag is 1. */
export function getPoolMemberBreakdown(poolId: string): boolean {
  const row = getDb()
    .prepare<{ member_breakdown: number }>("SELECT member_breakdown FROM quota_pools WHERE id = ?")
    .get(poolId);
  return row?.member_breakdown === 1;
}

/** Stores the flag. Returns true when the pool exists. */
export function setPoolMemberBreakdown(poolId: string, enabled: boolean): boolean {
  const result = getDb()
    .prepare("UPDATE quota_pools SET member_breakdown = ? WHERE id = ?")
    .run(enabled ? 1 : 0, poolId);
  return result.changes > 0;
}

/** Adds `memberBreakdown` to each pool with a single query. */
export function withMemberBreakdown<T extends { id: string }>(
  pools: T[]
): Array<T & { memberBreakdown: boolean }> {
  if (pools.length === 0) return [];
  const rows = getDb()
    .prepare<{ id: string }>("SELECT id FROM quota_pools WHERE member_breakdown = 1")
    .all();
  const enabled = new Set(rows.map((row) => row.id));
  return pools.map((pool) => ({ ...pool, memberBreakdown: enabled.has(pool.id) }));
}
