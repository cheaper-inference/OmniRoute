/**
 * Opt-in repeated-400 advisory (OMNIROUTE_REPEATED_400_ADVISORY, default off).
 *
 * Every 5 minutes (one instance at a time, by a lease in key_value) it looks back 6 hours. For
 * each active account it finds the newest unbroken run of identical normalized 400 messages
 * after the account's last success. It writes one audit row when the run holds at least 20 rows
 * and spans at least 10 minutes (the span gate drops a single client's retry storm), once per
 * (account, signature). The alert re-arms when the run ends or the signature changes.
 *
 * Read-only for routing: the scan never marks an account as failed, never changes a cooldown.
 * It reads call_logs and writes only audit_log and its own key_value rows. No migration.
 */

import { getDbInstance } from "../db/core";
import { logAuditEvent } from "../compliance";

const NS = "repeated400";
const LOOKBACK_MS = 6 * 60 * 60_000;
const MIN_HITS = 20;
const MIN_SPAN_MS = 10 * 60_000;
const INTERVAL_MS = 5 * 60_000;
const LEASE_MS = 2 * INTERVAL_MS;
const MAX_ROWS_PER_ACCOUNT = 5_000;

export const isRepeated400AdvisoryEnabled = (
  env: Record<string, string | undefined> = process.env
) => ["1", "true", "yes"].includes((env.OMNIROUTE_REPEATED_400_ADVISORY ?? "").toLowerCase());

/** Collapse ids, numbers and long hex so one error with varying details keeps one signature. */
export function normalize400Message(message: unknown): string {
  return String(message ?? "")
    .toLowerCase()
    .replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g, "#")
    .replace(/\b[0-9a-f]{16,}\b/g, "#")
    .replace(/\d+/g, "#")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);
}

type Db = ReturnType<typeof getDbInstance>;
const kvGet = (db: Db, key: string): string | null =>
  (
    db.prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?").get(NS, key) as
      { value: string } | undefined
  )?.value ?? null;
const kvSet = (db: Db, key: string, value: string) =>
  db
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run(NS, key, value);

/**
 * Take or renew the lease. The read and the write run in one IMMEDIATE transaction (write lock
 * taken first), so two processes on one database file never both see a free lease.
 */
function takeLease(db: Db, owner: string, now: number): boolean {
  let taken = false;
  db.immediate(() => {
    const raw = kvGet(db, "lease");
    if (raw) {
      const lease = JSON.parse(raw) as { owner: string; until: number };
      if (lease.owner !== owner && lease.until > now) return;
    }
    kvSet(db, "lease", JSON.stringify({ owner, until: now + LEASE_MS }));
    taken = true;
  });
  return taken;
}

type Row = { status: number | null; error_summary: string | null; timestamp: string };
type Run = { signature: string; count: number; spanMs: number };

/**
 * Newest unbroken run of identical 400 signatures, newest row first. Any other row (a success, a
 * different status or a different message) ends it. Null when the newest row is not a 400.
 */
function newestRun(rows: Row[]): Run | null {
  if (rows.length === 0 || rows[0].status !== 400) return null;
  const signature = normalize400Message(rows[0].error_summary);
  let count = 0;
  for (const row of rows) {
    if (row.status !== 400 || normalize400Message(row.error_summary) !== signature) break;
    count += 1;
  }
  const newest = Date.parse(rows[0].timestamp);
  const oldest = Date.parse(rows[count - 1].timestamp);
  return { signature, count, spanMs: newest - oldest };
}

function alertFor(db: Db, account: { id: string; provider: string }, run: Run | null): boolean {
  const key = `alert:${account.id}`;
  const armed = kvGet(db, key);
  const qualifies = !!run && run.count >= MIN_HITS && run.spanMs >= MIN_SPAN_MS;
  if (!qualifies) {
    if (armed !== null && (!run || run.signature !== armed))
      db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(NS, key);
    return false;
  }
  if (armed === run.signature) return false;
  kvSet(db, key, run.signature);
  logAuditEvent({
    action: "account.repeated_400",
    actor: "system",
    target: account.id,
    details: {
      provider: account.provider,
      signature: run.signature,
      count: run.count,
      spanMinutes: Math.round(run.spanMs / 60_000),
    },
  });
  return true;
}

export async function runRepeated400Scan(options: { now?: number; owner?: string } = {}) {
  if (!isRepeated400AdvisoryEnabled()) return { state: "off" as const, alerted: 0 };
  const now = options.now ?? Date.now();
  const db = getDbInstance();
  if (!takeLease(db, options.owner ?? `pid-${process.pid}`, now)) {
    return { state: "not-leader" as const, alerted: 0 };
  }
  const since = new Date(now - LOOKBACK_MS).toISOString();
  const until = new Date(now).toISOString();
  const accounts = db
    .prepare("SELECT id, provider FROM provider_connections WHERE is_active = 1")
    .all() as Array<{ id: string; provider: string }>;
  // Only accounts that logged a 400 in the window can hold a run. idx_cl_status finds them without
  // reading the other rows; the per-account read below then runs for those accounts alone.
  const withA400 = new Set(
    (
      db
        .prepare(
          `SELECT DISTINCT connection_id FROM call_logs
            WHERE status = 400 AND timestamp >= ? AND timestamp <= ? AND connection_id IS NOT NULL`
        )
        .all(since, until) as Array<{ connection_id: string }>
    ).map((r) => r.connection_id)
  );
  const rows = db.prepare(
    `SELECT status, error_summary, timestamp FROM call_logs
      WHERE connection_id = ? AND timestamp >= ? AND timestamp <= ?
        AND (request_type IS NULL OR request_type <> 'upstream_http_attempt')
      ORDER BY timestamp DESC LIMIT ?`
  );
  let alerted = 0;
  for (const account of accounts) {
    const run = withA400.has(account.id)
      ? newestRun(rows.all(account.id, since, until, MAX_ROWS_PER_ACCOUNT) as Row[]) // stops at the first row that is not the same 400
      : null;
    if (alertFor(db, account, run)) alerted += 1;
  }
  return { state: "scanned" as const, alerted };
}

let timer: NodeJS.Timeout | null = null;
let running = false;

export function startRepeated400AdvisoryJob(): NodeJS.Timeout | null {
  if (!isRepeated400AdvisoryEnabled()) return null;
  if (timer) return timer;
  timer = setInterval(() => {
    if (running) return;
    running = true;
    runRepeated400Scan()
      .catch((error) =>
        console.error("[Repeated400] scan failed:", error instanceof Error ? error.message : error)
      )
      .finally(() => {
        running = false;
      });
  }, INTERVAL_MS);
  timer.unref?.();
  return timer;
}

export function stopRepeated400AdvisoryJob() {
  if (timer) clearInterval(timer);
  timer = null;
}
