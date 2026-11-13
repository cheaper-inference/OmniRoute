/**
 * What the usage_history purge has already removed. Every raw row of a day before `day`
 * was rolled up into daily_usage_summary and deleted, so a row found for such a day
 * arrived late. Row ids only grow, so a late row has an id above `id`. The rollup adds
 * late rows to the day's summary and moves `id` forward in the same transaction; the
 * purge deletes them later. Stored as one key_value row, so no migration is needed.
 *
 * @module lib/usage/usagePurgedBefore
 */
import { getDbInstance } from "../db/core";

const NAMESPACE = "usageRollup";
const KEY = "usageHistoryPurgedBefore";

export type UsagePurgeMark = { day: string; id: number; raw: string };

// shortcut: an install that purged before this change has no mark until its next purge, so a late row
// for an older day still replaces that day's summary once; upgrade by seeding the mark from the summary.
/** `day` is "" when no purge has recorded a mark yet; no row is late then. */
export function getUsagePurgeMark(): UsagePurgeMark {
  const row = getDbInstance()
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(NAMESPACE, KEY) as { value?: string } | undefined;
  const raw = typeof row?.value === "string" ? row.value : "";
  try {
    const parsed = JSON.parse(raw) as { day?: unknown; id?: unknown };
    if (typeof parsed.day === "string" && Number.isInteger(parsed.id)) {
      return { day: parsed.day, id: parsed.id as number, raw };
    }
  } catch {
    // no mark yet, or an unreadable one: treat as none
  }
  return { day: "", id: 0, raw };
}

function writeMark(day: string, id: number): void {
  getDbInstance()
    .prepare(
      `INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)
       ON CONFLICT(namespace, key) DO UPDATE SET value = excluded.value`
    )
    .run(NAMESPACE, KEY, JSON.stringify({ day, id }));
}

/** Call in the transaction that deletes the days before `day`. An earlier day never moves the mark back. */
export function recordUsagePurgedBefore(day: string): void {
  const mark = getUsagePurgeMark();
  const reached = day.slice(0, 10);
  if (reached <= mark.day) return;
  const { id } = getDbInstance()
    .prepare("SELECT COALESCE(MAX(id), 0) AS id FROM usage_history")
    .get() as { id: number };
  writeMark(reached, Math.max(id, mark.id));
}

/**
 * Call in the transaction that adds late rows up to `id`. Throws when another writer moved
 * the mark since `mark` was read: its rows may be counted already, so this transaction must roll back.
 */
export function advanceUsageCountedThrough(mark: UsagePurgeMark, id: number): void {
  const { changes } = getDbInstance()
    .prepare("UPDATE key_value SET value = ? WHERE namespace = ? AND key = ? AND value = ?")
    .run(JSON.stringify({ day: mark.day, id: Math.max(id, mark.id) }), NAMESPACE, KEY, mark.raw);
  if (changes !== 1) throw new Error("usage purge mark changed during the rollup");
}
