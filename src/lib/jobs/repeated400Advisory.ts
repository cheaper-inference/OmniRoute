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

import { randomUUID } from "node:crypto";
import { getDbInstance } from "../db/core";
import { tryLogAuditEvent } from "../compliance";

const NS = "repeated400";
const LOOKBACK_MS = 6 * 60 * 60_000;
const MIN_HITS = 20;
const MIN_SPAN_MS = 10 * 60_000;
const INTERVAL_MS = 5 * 60_000;
const LEASE_MS = 2 * INTERVAL_MS;
const PAGE_ROWS = 5_000;
const MAX_PAGES = 24;
// One id per process instance: two containers on one database file can share a pid (PID 1).
const INSTANCE_OWNER = `pid-${process.pid}-${randomUUID()}`;

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
const kvDelete = (db: Db, key: string) =>
  db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(NS, key);

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

type Row = { id: string; status: number | null; error_summary: string | null; timestamp: string };
/** `ended`: a row that breaks the run was read, so `oldest` is where the run really starts. */
type Run = { signature: string; count: number; newest: string; oldest: string; ended: boolean };
/** The stored alert: its signature and the newest row of the run it already covers. */
type Marker = { signature: string; seen: string };
type Account = { id: string; provider: string };
type Page = (after: Row | null) => Row[];

const spanMs = (run: Run) => Date.parse(run.newest) - Date.parse(run.oldest);
const qualifies = (run: Run | null): run is Run =>
  !!run && run.count >= MIN_HITS && spanMs(run) >= MIN_SPAN_MS;

function readMarker(raw: string | null): Marker | null {
  if (raw === null) return null;
  try {
    const marker = JSON.parse(raw) as Partial<Marker> | null;
    if (typeof marker?.signature === "string" && typeof marker.seen === "string") {
      return { signature: marker.signature, seen: marker.seen };
    }
  } catch {
    // Unreadable: treated as no alert, so the run can alert again.
  }
  return null;
}

/** Extends the run with rows (newest first); false once a row breaks it. */
function extendRun(run: Run, rows: Row[]): boolean {
  for (const row of rows) {
    if (row.status !== 400 || normalize400Message(row.error_summary) !== run.signature) {
      run.ended = true;
      return false;
    }
    run.count += 1;
    run.oldest = row.timestamp;
  }
  return true;
}

/**
 * Newest unbroken run of identical 400 signatures, read newest first one page at a time. Any
 * other row (a success, a different status or a different message) ends it. Reading stops at
 * that row, at the window start, or once the run qualifies and reaches back to `seen`, so the
 * span is not cut at one page of rows. Null when the newest row is not a 400.
 */
function readNewestRun(page: Page, seen: string | null): Run | null {
  let rows = page(null);
  if (rows.length === 0 || rows[0].status !== 400) return null;
  const newest = rows[0].timestamp;
  const run: Run = {
    signature: normalize400Message(rows[0].error_summary),
    count: 0,
    newest,
    oldest: newest,
    ended: false,
  };
  for (let pages = 1; extendRun(run, rows); pages += 1) {
    const covered = seen === null || Date.parse(run.oldest) <= Date.parse(seen);
    if (rows.length < PAGE_ROWS || pages >= MAX_PAGES || (qualifies(run) && covered)) break;
    rows = page(rows[rows.length - 1]);
  }
  return run;
}

/** Same run as the stored alert unless a row that broke it was logged after the alerted rows. */
function isSameRun(run: Run, marker: Marker): boolean {
  if (run.signature !== marker.signature) return false;
  return !run.ended || Date.parse(run.oldest) <= Date.parse(marker.seen);
}

/** The audit row and the marker commit together: a failed audit insert leaves the alert armed. */
function recordAlert(db: Db, key: string, account: Account, run: Run): boolean {
  let recorded = false;
  db.transaction(() => {
    recorded = tryLogAuditEvent({
      action: "account.repeated_400",
      actor: "system",
      target: account.id,
      details: {
        provider: account.provider,
        signature: run.signature,
        count: run.count,
        spanMinutes: Math.round(spanMs(run) / 60_000),
      },
    });
    if (recorded) kvSet(db, key, JSON.stringify({ signature: run.signature, seen: run.newest }));
  })();
  return recorded;
}

function alertFor(db: Db, account: Account, page: Page | null): boolean {
  const key = `alert:${account.id}`;
  const raw = kvGet(db, key);
  const marker = readMarker(raw);
  const run = page ? readNewestRun(page, marker?.seen ?? null) : null;
  if (run && marker && isSameRun(run, marker)) {
    kvSet(db, key, JSON.stringify({ signature: run.signature, seen: run.newest }));
    return false;
  }
  // The run ended (a success, another status or message) or changed: re-arm.
  if (raw !== null) kvDelete(db, key);
  return qualifies(run) && recordAlert(db, key, account, run);
}

export async function runRepeated400Scan(options: { now?: number; owner?: string } = {}) {
  if (!isRepeated400AdvisoryEnabled()) return { state: "off" as const, alerted: 0 };
  const now = options.now ?? Date.now();
  const db = getDbInstance();
  if (!takeLease(db, options.owner ?? INSTANCE_OWNER, now)) {
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
  const columns = "SELECT id, status, error_summary, timestamp FROM call_logs";
  const filter = "AND (request_type IS NULL OR request_type <> 'upstream_http_attempt')";
  const order = "ORDER BY timestamp DESC, id DESC LIMIT ?";
  const first = db.prepare(
    `${columns}
      WHERE connection_id = ? AND timestamp >= ? AND timestamp <= ? ${filter} ${order}`
  );
  const next = db.prepare(
    `${columns}
      WHERE connection_id = ? AND timestamp >= ? AND (timestamp, id) < (?, ?) ${filter} ${order}`
  );
  let alerted = 0;
  for (const account of accounts) {
    const page: Page = (after) =>
      (after
        ? next.all(account.id, since, after.timestamp, after.id, PAGE_ROWS)
        : first.all(account.id, since, until, PAGE_ROWS)) as Row[];
    if (alertFor(db, account, withA400.has(account.id) ? page : null)) alerted += 1;
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
