/**
 * db/quotaPercentLedger.ts — storage of the percent attribution book.
 *
 * One book per (pool, connection, plan window) in `quota_percent_ledger`: the whole state in one
 * row, written by compare-and-set on its revision so two writers that read the same revision
 * cannot both win. One cumulative token counter per (pool, connection, API key) in
 * `quota_percent_ledger_tokens`, written per request without a read and shared by every window
 * of that connection. The state transition itself lives in `@/lib/quota/percentLedger`.
 */

import { isStorableLedgerState, storedLedgerKeys } from "@/lib/quota/percentLedger";
import type { LedgerCounter, LedgerKey, LedgerSnapshot, LedgerState } from "@/lib/quota/types";
import { getDbInstance } from "./core";

interface StatementLike<TRow = unknown> {
  all: (...params: unknown[]) => TRow[];
  get: (...params: unknown[]) => TRow | undefined;
  run: (...params: unknown[]) => { changes: number };
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
}

function getDb(): DbLike {
  return getDbInstance() as unknown as DbLike;
}

interface LedgerRow {
  rev: number;
  last_used: number;
  baseline: number;
  reset_at: number | null;
  read_at: number;
  keys_json: string;
  updated_at: number;
}

interface CounterRow {
  api_key_id: string;
  tokens: number;
  updated_at: number;
}

/**
 * UPSERT: tokens += delta, updated_at = nowMs. No read. An amount that is not a finite number
 * above zero changes nothing: a stored Infinity would poison the counter for good, and a negative
 * amount would drop it below the key's mark so the book would count the whole counter again.
 */
export function addPercentLedgerTokens(
  poolId: string,
  connectionId: string,
  apiKeyId: string,
  tokens: number,
  nowMs: number
): void {
  if (!Number.isFinite(tokens) || tokens <= 0) return;
  getDb()
    .prepare(
      `INSERT INTO quota_percent_ledger_tokens (pool_id, connection_id, api_key_id, tokens, updated_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(pool_id, connection_id, api_key_id)
       DO UPDATE SET
         tokens = tokens + excluded.tokens,
         updated_at = excluded.updated_at`
    )
    .run(poolId, connectionId, apiKeyId, tokens, nowMs);
}

function parseKeysJson(json: string): unknown {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

/** An unreadable keys_json gives no key entry; every other column is returned as stored. */
function rowToState(row: LedgerRow): LedgerState {
  return {
    rev: row.rev,
    last: row.last_used,
    baseline: row.baseline,
    resetAt: row.reset_at,
    readAt: row.read_at,
    updatedAt: row.updated_at,
    keys: storedLedgerKeys(parseKeysJson(row.keys_json)),
  };
}

/** The book row of (pool, connection, window), or null, plus every key counter of that pool connection. */
export function readPercentLedger(key: LedgerKey): LedgerSnapshot {
  const db = getDb();
  const row = db
    .prepare<LedgerRow>(
      `SELECT rev, last_used, baseline, reset_at, read_at, keys_json, updated_at
       FROM quota_percent_ledger
       WHERE pool_id = ? AND connection_id = ? AND quota_window = ?`
    )
    .get(key.poolId, key.connectionId, key.window);
  const counterRows = db
    .prepare<CounterRow>(
      `SELECT api_key_id, tokens, updated_at
       FROM quota_percent_ledger_tokens
       WHERE pool_id = ? AND connection_id = ?`
    )
    .all(key.poolId, key.connectionId);

  const counters: Record<string, LedgerCounter> = {};
  for (const c of counterRows)
    counters[c.api_key_id] = { tokens: c.tokens, updatedAt: c.updated_at };
  return { state: row ? rowToState(row) : null, counters };
}

/**
 * Compare-and-set: stores `next` only when the stored revision is next.rev - 1 (no row counts as 0).
 * A state isStorableLedgerState rejects is never stored (false, nothing written).
 */
export function commitPercentLedger(key: LedgerKey, next: LedgerState): boolean {
  if (!isStorableLedgerState(next)) return false;
  // One statement, so the revision check and the write cannot interleave with another writer.
  // The SELECT's WHERE keeps a missing row from being created at a revision other than 1; the
  // DO UPDATE's WHERE leaves an existing row untouched unless its revision is next.rev - 1.
  const { changes } = getDb()
    .prepare(
      `INSERT INTO quota_percent_ledger
         (pool_id, connection_id, quota_window, rev, last_used, baseline, reset_at, read_at,
          keys_json, updated_at)
       SELECT @poolId, @connectionId, @window, @rev, @last, @baseline, @resetAt, @readAt,
              @keysJson, @updatedAt
       WHERE @rev = 1 OR EXISTS (
         SELECT 1 FROM quota_percent_ledger
         WHERE pool_id = @poolId AND connection_id = @connectionId AND quota_window = @window
       )
       ON CONFLICT(pool_id, connection_id, quota_window) DO UPDATE SET
         rev = excluded.rev,
         last_used = excluded.last_used,
         baseline = excluded.baseline,
         reset_at = excluded.reset_at,
         read_at = excluded.read_at,
         keys_json = excluded.keys_json,
         updated_at = excluded.updated_at
       WHERE quota_percent_ledger.rev = excluded.rev - 1`
    )
    .run({
      poolId: key.poolId,
      connectionId: key.connectionId,
      window: key.window,
      rev: next.rev,
      last: next.last,
      baseline: next.baseline,
      resetAt: next.resetAt,
      readAt: next.readAt,
      keysJson: JSON.stringify(next.keys),
      updatedAt: next.updatedAt,
    });
  return changes === 1;
}
