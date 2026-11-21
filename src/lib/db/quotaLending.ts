/**
 * db/quotaLending.ts — lending consent per quota allocation and the borrow mode per pool.
 *
 * A key holder may lend a percentage of its idle share, optionally until a deadline
 * (epoch ms). The pool's borrow mode decides whether that consent is what lets other
 * keys pass their share ("consent") or whether account headroom does ("saturation").
 */

import { getDbInstance } from "./core";
import type { BorrowMode } from "@/lib/quota/dimensions";
import { LENDING_UNTIL_MAX_MS } from "@/shared/constants/quotaLending";

export type { BorrowMode };

export interface AllocationLending {
  lendingPercent: number;
  lendingUntil: number | null;
}

interface StatementLike<TRow = unknown> {
  all: (...params: unknown[]) => TRow[];
  get: (...params: unknown[]) => TRow | undefined;
  run: (...params: unknown[]) => { changes: number };
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
}

interface LendingRow {
  api_key_id: string;
  lending_percent: number | null;
  lending_until: number | null;
}

function getDb(): DbLike {
  return getDbInstance() as unknown as DbLike;
}

/** "consent" only for that exact string. Anything else is "saturation". */
export function normalizeBorrowMode(value: unknown): BorrowMode {
  return value === "consent" ? "consent" : "saturation";
}

/** Integer 0..100. Anything else is 0. */
export function normalizeLendingPercent(value: unknown): number {
  return typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 100
    ? value
    : 0;
}

/**
 * The stored deadline. Only null (SQL NULL, or an absent field) means "no deadline". A finite
 * number a Date can hold is kept. Anything else is unreadable and becomes 0, an instant in the
 * past, so a damaged value lends nothing instead of lending with no end.
 */
export function normalizeLendingUntil(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  return typeof value === "number" && Number.isFinite(value) && value <= LENDING_UNTIL_MAX_MS
    ? value
    : 0;
}

function rowToLending(row: LendingRow): AllocationLending {
  return {
    lendingPercent: normalizeLendingPercent(row.lending_percent),
    lendingUntil: normalizeLendingUntil(row.lending_until),
  };
}

/** null when the key has no allocation in the pool. */
export function getAllocationLending(poolId: string, apiKeyId: string): AllocationLending | null {
  const row = getDb()
    .prepare<LendingRow>(
      `SELECT api_key_id, lending_percent, lending_until
       FROM quota_allocations WHERE pool_id = ? AND api_key_id = ?`
    )
    .get(poolId, apiKeyId);
  return row ? rowToLending(row) : null;
}

/** One-row UPDATE. A zero percentage stores a null deadline. null when there is no allocation row. */
export function setAllocationLending(
  poolId: string,
  apiKeyId: string,
  next: AllocationLending
): { changed: boolean; previous: AllocationLending } | null {
  const previous = getAllocationLending(poolId, apiKeyId);
  if (!previous) return null;
  const lendingPercent = normalizeLendingPercent(next.lendingPercent);
  const lendingUntil = lendingPercent > 0 ? normalizeLendingUntil(next.lendingUntil) : null;
  const changed =
    previous.lendingPercent !== lendingPercent || previous.lendingUntil !== lendingUntil;
  if (changed) {
    getDb()
      .prepare(
        "UPDATE quota_allocations SET lending_percent = ?, lending_until = ? WHERE pool_id = ? AND api_key_id = ?"
      )
      .run(lendingPercent, lendingUntil, poolId, apiKeyId);
  }
  return { changed, previous };
}

/** Rows of the pool whose consent is not the default. */
export function snapshotPoolLending(poolId: string): Map<string, AllocationLending> {
  const rows = getDb()
    .prepare<LendingRow>(
      `SELECT api_key_id, lending_percent, lending_until FROM quota_allocations
       WHERE pool_id = ? AND (lending_percent != 0 OR lending_until IS NOT NULL)`
    )
    .all(poolId);
  return new Map(rows.map((row) => [row.api_key_id, rowToLending(row)]));
}

/** Re-applies a snapshot to the rows that still exist. */
export function restorePoolLending(poolId: string, snapshot: Map<string, AllocationLending>): void {
  if (snapshot.size === 0) return;
  const update = getDb().prepare(
    "UPDATE quota_allocations SET lending_percent = ?, lending_until = ? WHERE pool_id = ? AND api_key_id = ?"
  );
  for (const [apiKeyId, lending] of snapshot) {
    update.run(lending.lendingPercent, lending.lendingUntil, poolId, apiKeyId);
  }
}

export function setPoolBorrowMode(poolId: string, mode: BorrowMode): void {
  getDb()
    .prepare("UPDATE quota_pools SET borrow_mode = ? WHERE id = ?")
    .run(normalizeBorrowMode(mode), poolId);
}
