/**
 * codexResetCreditAutospend.ts — per-connection daily counter for the opt-in
 * Codex reset-credit auto-spend sweep.
 *
 * Stored in the generic `key_value` table (no migration): one row per
 * connection under the `codexResetCreditAutospend` namespace holding
 * `{ day, count, updatedAt }`. The day is the UTC date (`YYYY-MM-DD`), so the
 * `maxPerDay` ceiling resets once per UTC day — the same notion of "day" the
 * rest of the quota bookkeeping uses.
 *
 * A second namespace holds, per connection, how many times each credit's
 * `redeem_request_id` moved on after a definite upstream refusal
 * (see `autospendIdempotencyKey` in src/lib/usage/codexResetCredits.ts).
 *
 * Kept in `src/lib/db/` per Hard Rule #5: no raw SQL outside domain modules.
 */

import { getDbInstance } from "./core";

const AUTOSPEND_NAMESPACE = "codexResetCreditAutospend";
const AUTOSPEND_KEY_GENERATION_NAMESPACE = "codexResetCreditAutospendKeyGeneration";

type DbLike = {
  prepare: (sql: string) => {
    get: (...params: unknown[]) => unknown;
    run: (...params: unknown[]) => unknown;
  };
};

export interface CodexAutospendCounter {
  day: string;
  count: number;
  updatedAt?: string;
}

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export function utcDayKey(timestampMs: number): string {
  return new Date(timestampMs).toISOString().slice(0, 10);
}

/** Redemptions already spent for this connection on `dayKey`. */
export function getCodexAutospendCount(connectionId: string, dayKey: string): number {
  const db = getDbInstance() as unknown as DbLike;
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(AUTOSPEND_NAMESPACE, connectionId) as { value?: string } | undefined;
  if (!row?.value) return 0;

  let parsed: Record<string, unknown>;
  try {
    parsed = toRecord(JSON.parse(row.value));
  } catch {
    return 0;
  }

  if (parsed.day !== dayKey) return 0;
  const count = Number(parsed.count);
  return Number.isFinite(count) && count > 0 ? Math.trunc(count) : 0;
}

/** Persist the new running total for this connection/day. */
export function setCodexAutospendCount(
  connectionId: string,
  dayKey: string,
  count: number,
  timestampMs: number = Date.now()
): void {
  const db = getDbInstance() as unknown as DbLike;
  const payload: CodexAutospendCounter = {
    day: dayKey,
    count: Math.max(0, Math.trunc(count)),
    updatedAt: new Date(timestampMs).toISOString(),
  };
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    AUTOSPEND_NAMESPACE,
    connectionId,
    JSON.stringify(payload)
  );
}

/** creditId -> key generation for this connection. Unknown credits are generation 0. */
export function getCodexAutospendKeyGenerations(connectionId: string): Record<string, number> {
  const db = getDbInstance() as unknown as DbLike;
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(AUTOSPEND_KEY_GENERATION_NAMESPACE, connectionId) as { value?: string } | undefined;
  if (!row?.value) return {};

  let parsed: Record<string, unknown>;
  try {
    parsed = toRecord(JSON.parse(row.value));
  } catch {
    return {};
  }

  const generations: Record<string, number> = {};
  for (const [creditId, value] of Object.entries(parsed)) {
    const generation = Number(value);
    if (Number.isFinite(generation) && generation > 0) {
      generations[creditId] = Math.trunc(generation);
    }
  }
  return generations;
}

/** Replace the stored generations; the caller keeps only credits that are still listed. */
export function setCodexAutospendKeyGenerations(
  connectionId: string,
  generations: Record<string, number>
): void {
  const db = getDbInstance() as unknown as DbLike;
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    AUTOSPEND_KEY_GENERATION_NAMESPACE,
    connectionId,
    JSON.stringify(generations)
  );
}

/** Drop all auto-spend bookkeeping of a deleted connection. */
export function deleteCodexAutospendCount(connectionId: string): void {
  const db = getDbInstance() as unknown as DbLike;
  const statement = db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?");
  statement.run(AUTOSPEND_NAMESPACE, connectionId);
  statement.run(AUTOSPEND_KEY_GENERATION_NAMESPACE, connectionId);
}
