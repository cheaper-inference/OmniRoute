/**
 * quotaAlertLatch.ts — persisted dedupe state for client-side quota alerts.
 *
 * `quotaWindowAlerts.ts` is edge-triggered: it must remember which windows have
 * already been alerted so a window sitting at 3% for six hours produces one
 * toast, not one per poll. That memory has to survive a page reload (otherwise
 * every reload re-toasts everything), so it lives in the generic `key_value`
 * table — no migration.
 *
 * One row, namespace `quotaAlertLatch`, key `state`, value `{ latches: {...} }`.
 * Kept in `src/lib/db/` per Hard Rule #5: no raw SQL outside domain modules.
 */

import { getDbInstance } from "./core";
import type { QuotaAlertLatch } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaWindowAlerts";

const QUOTA_ALERT_LATCH_NAMESPACE = "quotaAlertLatch";
const QUOTA_ALERT_LATCH_KEY = "state";

type DbLike = {
  prepare: (sql: string) => {
    get: (...params: unknown[]) => unknown;
    run: (...params: unknown[]) => unknown;
  };
};

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export function getQuotaAlertLatch(): QuotaAlertLatch {
  const db = getDbInstance() as unknown as DbLike;
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(QUOTA_ALERT_LATCH_NAMESPACE, QUOTA_ALERT_LATCH_KEY) as { value?: string } | undefined;
  if (!row?.value) return {};

  let parsed: Record<string, unknown>;
  try {
    parsed = toRecord(JSON.parse(row.value));
  } catch {
    return {};
  }

  const latches = toRecord(parsed.latches);
  const result: QuotaAlertLatch = {};
  for (const [key, value] of Object.entries(latches)) {
    // `Number(null)` and `Number("")` are 0, which would silently resurrect an
    // entry with a bogus threshold — only accept real numbers.
    if (typeof value !== "number" || !Number.isFinite(value)) continue;
    result[key] = value;
  }
  return result;
}

export function setQuotaAlertLatch(latch: QuotaAlertLatch): void {
  const db = getDbInstance() as unknown as DbLike;
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    QUOTA_ALERT_LATCH_NAMESPACE,
    QUOTA_ALERT_LATCH_KEY,
    JSON.stringify({ latches: latch })
  );
}

export function clearQuotaAlertLatch(): void {
  const db = getDbInstance() as unknown as DbLike;
  db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(
    QUOTA_ALERT_LATCH_NAMESPACE,
    QUOTA_ALERT_LATCH_KEY
  );
}
