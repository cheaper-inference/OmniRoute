/**
 * Database module: quota window ping targets and runs (migration 20261118120000).
 *
 * `quota_ping_runs` is one audit row per evaluation and also the per-target lease:
 * `claimWindowPingRun` inserts a `running` row inside one SQLite transaction only
 * when no other run of the same target holds a live lease, so two processes sharing
 * a DATA_DIR cannot ping the same target twice.
 */
import { randomUUID } from "node:crypto";
import {
  QUOTA_WINDOW_PING_LEASE_MS,
  getQuotaWindowDescriptor,
} from "@/shared/constants/quotaWindowPing";
import type {
  WindowPingClaimResult,
  QuotaWindowPingReason,
  WindowPingRun,
  QuotaWindowPingRunStatus,
  QuotaWindowPingTrigger,
  WindowPingSchedule,
  WindowPingTarget,
  WindowPingTargetInput,
} from "@/shared/types/quotaWindowPing";
import type { QuotaWindowPingStore } from "@/lib/services/quotaWindowPing";
import { getDbInstance } from "./core";

export const QUOTA_WINDOW_PING_MAX_TARGETS = 100;
export const QUOTA_WINDOW_PING_MAX_RUNS = 200;

export type QuotaWindowPingStoreErrorCode = "not_found" | "running" | "limit" | "duplicate";

export class QuotaWindowPingStoreError extends Error {
  readonly code: QuotaWindowPingStoreErrorCode;
  constructor(code: QuotaWindowPingStoreErrorCode) {
    super(`quota window ping: ${code}`);
    this.name = "QuotaWindowPingStoreError";
    this.code = code;
  }
}

type TargetRow = {
  id: string;
  connection_id: string;
  provider: string;
  model: string | null;
  descriptor_id: string;
  window_id: string;
  enabled: number;
  schedule: string | null;
  min_longer_window_remaining_pct: number;
  dry_run: number;
  claude_billable_confirmed: number;
  last_pinged_fingerprint: string | null;
  last_ping_at: string | null;
  failure_at: string | null;
  next_run_at: string | null;
  created_at: string;
  updated_at: string;
};

type RunRow = {
  id: string;
  target_id: string;
  connection_id: string;
  descriptor_id: string;
  window_id: string;
  trigger_kind: QuotaWindowPingTrigger;
  status: QuotaWindowPingRunStatus;
  reason: QuotaWindowPingReason | null;
  fingerprint: string | null;
  dry_run: number;
  detail: string | null;
  started_at: string;
  finished_at: string | null;
  lease_expires_at: number;
};

function isUniqueViolation(error: unknown): boolean {
  const code = (error as { code?: string }).code ?? "";
  const message = (error as Error).message ?? "";
  return /SQLITE_CONSTRAINT_UNIQUE|UNIQUE constraint failed/i.test(`${code} ${message}`);
}

function parseSchedule(value: string | null): WindowPingSchedule | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as WindowPingSchedule;
  } catch {
    return null;
  }
}

function toTarget(row: TargetRow): WindowPingTarget {
  return {
    id: row.id,
    connectionId: row.connection_id,
    provider: row.provider,
    model: row.model,
    windowId: row.window_id,
    descriptorId: row.descriptor_id,
    enabled: row.enabled === 1,
    schedule: parseSchedule(row.schedule),
    minLongerWindowRemainingPct: row.min_longer_window_remaining_pct,
    dryRun: row.dry_run === 1,
    claudeBillableConfirmed: row.claude_billable_confirmed === 1,
    lastPingedFingerprint: row.last_pinged_fingerprint,
    lastPingAt: row.last_ping_at,
    failureAt: row.failure_at,
    nextRunAt: row.next_run_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toRun(row: RunRow): WindowPingRun {
  return {
    id: row.id,
    targetId: row.target_id,
    connectionId: row.connection_id,
    descriptorId: row.descriptor_id,
    windowId: row.window_id,
    trigger: row.trigger_kind,
    status: row.status,
    reason: row.reason,
    fingerprint: row.fingerprint,
    dryRun: row.dry_run === 1,
    detail: row.detail,
    startedAt: row.started_at,
    finishedAt: row.finished_at,
    leaseExpiresAt: row.lease_expires_at,
  };
}

function selectTarget(id: string): TargetRow | undefined {
  return getDbInstance().prepare("SELECT * FROM quota_ping_targets WHERE id = ?").get(id) as
    TargetRow | undefined;
}

function insertRun(run: WindowPingRun): void {
  getDbInstance()
    .prepare(
      `INSERT INTO quota_ping_runs
         (id, target_id, connection_id, descriptor_id, window_id, trigger_kind, status,
          reason, fingerprint, dry_run, detail, started_at, finished_at, lease_expires_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      run.id,
      run.targetId,
      run.connectionId,
      run.descriptorId,
      run.windowId,
      run.trigger,
      run.status,
      run.reason,
      run.fingerprint,
      run.dryRun ? 1 : 0,
      run.detail,
      run.startedAt,
      run.finishedAt,
      run.leaseExpiresAt
    );
}

function pruneRuns(): void {
  getDbInstance()
    .prepare(
      `DELETE FROM quota_ping_runs
        WHERE status != 'running'
          AND id NOT IN (
            SELECT id FROM quota_ping_runs WHERE status != 'running'
             ORDER BY started_at DESC, id DESC LIMIT ?
          )`
    )
    .run(QUOTA_WINDOW_PING_MAX_RUNS);
}

function resolveDescriptor(descriptorId: string) {
  const descriptor = getQuotaWindowDescriptor(descriptorId);
  if (!descriptor) throw new QuotaWindowPingStoreError("not_found");
  return descriptor;
}

export function listWindowPingTargets(): WindowPingTarget[] {
  const rows = getDbInstance()
    .prepare("SELECT * FROM quota_ping_targets ORDER BY created_at ASC, id ASC")
    .all() as TargetRow[];
  return rows.map(toTarget);
}

export function getWindowPingTarget(id: string): WindowPingTarget | null {
  const row = selectTarget(id);
  return row ? toTarget(row) : null;
}

export function countEnabledWindowPingTargets(): number {
  const { n } = getDbInstance()
    .prepare("SELECT COUNT(*) AS n FROM quota_ping_targets WHERE enabled = 1")
    .get() as { n: number };
  return n;
}

export function createWindowPingTarget(
  input: WindowPingTargetInput,
  nextRunAt: string | null,
  nowMs: number = Date.now()
): WindowPingTarget {
  const db = getDbInstance();
  const descriptor = resolveDescriptor(input.descriptorId);
  const id = randomUUID();
  const now = new Date(nowMs).toISOString();
  const enabled = input.enabled === true;
  db.transaction(() => {
    const { n } = db.prepare("SELECT COUNT(*) AS n FROM quota_ping_targets").get() as { n: number };
    if (n >= QUOTA_WINDOW_PING_MAX_TARGETS) throw new QuotaWindowPingStoreError("limit");
    try {
      db.prepare(
        `INSERT INTO quota_ping_targets
           (id, connection_id, provider, model, descriptor_id, window_id, enabled, schedule,
            min_longer_window_remaining_pct, dry_run, claude_billable_confirmed, next_run_at,
            created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).run(
        id,
        input.connectionId,
        descriptor.provider,
        input.model ?? null,
        descriptor.id,
        descriptor.windowId,
        enabled ? 1 : 0,
        input.schedule ? JSON.stringify(input.schedule) : null,
        input.minLongerWindowRemainingPct ?? 0,
        input.dryRun ? 1 : 0,
        input.claudeBillableConfirmed ? 1 : 0,
        enabled ? nextRunAt : null,
        now,
        now
      );
    } catch (error) {
      if (isUniqueViolation(error)) throw new QuotaWindowPingStoreError("duplicate");
      throw error;
    }
  })();
  return getWindowPingTarget(id) as WindowPingTarget;
}

export function updateWindowPingTarget(
  id: string,
  input: WindowPingTargetInput,
  nextRunAt: string | null,
  nowMs: number = Date.now()
): WindowPingTarget {
  const db = getDbInstance();
  const descriptor = resolveDescriptor(input.descriptorId);
  const enabled = input.enabled === true;
  db.transaction(() => {
    if (!selectTarget(id)) throw new QuotaWindowPingStoreError("not_found");
    if (hasLiveWindowPingRun(id, nowMs)) throw new QuotaWindowPingStoreError("running");
    try {
      db.prepare(
        `UPDATE quota_ping_targets
            SET connection_id = ?, provider = ?, model = ?, descriptor_id = ?, window_id = ?,
                enabled = ?, schedule = ?, min_longer_window_remaining_pct = ?, dry_run = ?,
                claude_billable_confirmed = ?, next_run_at = ?, updated_at = ?
          WHERE id = ?`
      ).run(
        input.connectionId,
        descriptor.provider,
        input.model ?? null,
        descriptor.id,
        descriptor.windowId,
        enabled ? 1 : 0,
        input.schedule ? JSON.stringify(input.schedule) : null,
        input.minLongerWindowRemainingPct ?? 0,
        input.dryRun ? 1 : 0,
        input.claudeBillableConfirmed ? 1 : 0,
        enabled ? nextRunAt : null,
        new Date(nowMs).toISOString(),
        id
      );
    } catch (error) {
      if (isUniqueViolation(error)) throw new QuotaWindowPingStoreError("duplicate");
      throw error;
    }
  })();
  return getWindowPingTarget(id) as WindowPingTarget;
}

export function deleteWindowPingTarget(id: string, nowMs: number = Date.now()): void {
  const db = getDbInstance();
  db.transaction(() => {
    if (!selectTarget(id)) throw new QuotaWindowPingStoreError("not_found");
    if (hasLiveWindowPingRun(id, nowMs)) throw new QuotaWindowPingStoreError("running");
    db.prepare("DELETE FROM quota_ping_targets WHERE id = ?").run(id);
  })();
}

/**
 * Claim a run of `targetId`. Scheduled claims only fire when the target is enabled and
 * due, and always move `next_run_at` past `nowMs`, so a slot missed while the server was
 * down runs once and is never replayed. Manual claims ignore enabled and next_run_at.
 * A live lease inserts a finished `skipped/in_flight` audit row in the same transaction.
 * Throws `not_found` for an unknown target.
 */
export function claimWindowPingRun(
  targetId: string,
  trigger: QuotaWindowPingTrigger,
  nowMs: number,
  computeNextRunAt: (schedule: WindowPingSchedule, after: number) => string | null
): WindowPingClaimResult {
  const db = getDbInstance();
  return db.transaction((): WindowPingClaimResult => {
    const row = selectTarget(targetId);
    if (!row) throw new QuotaWindowPingStoreError("not_found");
    let target = toTarget(row);
    if (trigger === "scheduled") {
      const dueMs = target.nextRunAt ? Date.parse(target.nextRunAt) : Number.NaN;
      if (!target.enabled || !target.schedule || !Number.isFinite(dueMs) || dueMs > nowMs) {
        return { kind: "not_due" };
      }
      const nextRunAt = computeNextRunAt(target.schedule, nowMs);
      db.prepare("UPDATE quota_ping_targets SET next_run_at = ? WHERE id = ?").run(
        nextRunAt,
        targetId
      );
      target = { ...target, nextRunAt };
    }

    const nowIso = new Date(nowMs).toISOString();
    if (hasLiveWindowPingRun(targetId, nowMs)) {
      const run: WindowPingRun = {
        id: randomUUID(),
        targetId,
        connectionId: target.connectionId,
        descriptorId: target.descriptorId,
        windowId: target.windowId,
        trigger,
        status: "skipped",
        reason: "in_flight",
        fingerprint: null,
        dryRun: target.dryRun,
        detail: null,
        startedAt: nowIso,
        finishedAt: nowIso,
        leaseExpiresAt: nowMs,
      };
      insertRun(run);
      return { kind: "in_flight", run };
    }

    const run: WindowPingRun = {
      id: randomUUID(),
      targetId,
      connectionId: target.connectionId,
      descriptorId: target.descriptorId,
      windowId: target.windowId,
      trigger,
      status: "running",
      reason: null,
      fingerprint: null,
      dryRun: target.dryRun,
      detail: null,
      startedAt: nowIso,
      finishedAt: null,
      leaseExpiresAt: nowMs + QUOTA_WINDOW_PING_LEASE_MS,
    };
    insertRun(run);
    return { kind: "claimed", claim: { run, target } };
  })();
}

/** Close a running run; prunes history to the newest 200 non-running rows. */
export function finishWindowPingRun(
  runId: string,
  nowMs: number,
  outcome: {
    status: Exclude<QuotaWindowPingRunStatus, "running">;
    reason: QuotaWindowPingReason;
    fingerprint: string | null;
    dryRun?: boolean;
    detail?: string | null;
  }
): WindowPingRun | null {
  const db = getDbInstance();
  return db.transaction((): WindowPingRun | null => {
    const row = db
      .prepare("SELECT * FROM quota_ping_runs WHERE id = ? AND status = 'running'")
      .get(runId) as RunRow | undefined;
    if (!row) return null;
    const dryRun = outcome.dryRun === undefined ? row.dry_run : outcome.dryRun ? 1 : 0;
    const detail = outcome.detail ?? null;
    const finishedAt = new Date(nowMs).toISOString();
    db.prepare(
      `UPDATE quota_ping_runs
          SET status = ?, reason = ?, fingerprint = ?, dry_run = ?, detail = ?, finished_at = ?
        WHERE id = ?`
    ).run(outcome.status, outcome.reason, outcome.fingerprint, dryRun, detail, finishedAt, runId);
    pruneRuns();
    return toRun({
      ...row,
      status: outcome.status,
      reason: outcome.reason,
      fingerprint: outcome.fingerprint,
      dry_run: dryRun,
      detail,
      finished_at: finishedAt,
    });
  })();
}

/** Extend a running run's lease; false when another process already recovered it. */
export function renewWindowPingRunLease(runId: string, nowMs: number): boolean {
  const result = getDbInstance()
    .prepare("UPDATE quota_ping_runs SET lease_expires_at = ? WHERE id = ? AND status = 'running'")
    .run(nowMs + QUOTA_WINDOW_PING_LEASE_MS, runId);
  return result.changes > 0;
}

/**
 * Recover runs whose lease expired while still running (process died mid-run).
 * A recovered run is status `skipped` with detail `interrupted`; `in_flight` is the
 * closest skip reason for a lease that never produced a decision.
 */
export function recoverWindowPingRuns(nowMs: number = Date.now()): number {
  const result = getDbInstance()
    .prepare(
      `UPDATE quota_ping_runs
          SET status = 'skipped', reason = 'in_flight', detail = 'interrupted', finished_at = ?
        WHERE status = 'running' AND lease_expires_at <= ?`
    )
    .run(new Date(nowMs).toISOString(), nowMs);
  return result.changes;
}

export function listWindowPingRuns(limit = 20): WindowPingRun[] {
  const rows = getDbInstance()
    .prepare("SELECT * FROM quota_ping_runs ORDER BY started_at DESC, id DESC LIMIT ?")
    .all(Math.max(1, Math.min(limit, QUOTA_WINDOW_PING_MAX_RUNS))) as RunRow[];
  return rows.map(toRun);
}

export function hasLiveWindowPingRun(targetId: string, nowMs: number): boolean {
  const row = getDbInstance()
    .prepare(
      "SELECT 1 FROM quota_ping_runs WHERE target_id = ? AND status = 'running' AND lease_expires_at > ? LIMIT 1"
    )
    .get(targetId, nowMs);
  return Boolean(row);
}

export function markWindowPingTargetPinged(
  targetId: string,
  fingerprint: string,
  nowMs: number
): void {
  const now = new Date(nowMs).toISOString();
  getDbInstance()
    .prepare(
      `UPDATE quota_ping_targets
          SET last_pinged_fingerprint = ?, last_ping_at = ?, failure_at = NULL, updated_at = ?
        WHERE id = ?`
    )
    .run(fingerprint, now, now, targetId);
}

export function markWindowPingTargetFailed(targetId: string, nowMs: number): void {
  const now = new Date(nowMs).toISOString();
  getDbInstance()
    .prepare("UPDATE quota_ping_targets SET failure_at = ?, updated_at = ? WHERE id = ?")
    .run(now, now, targetId);
}

export function createDbQuotaWindowPingStore(): QuotaWindowPingStore {
  return {
    listWindowPingTargets,
    getWindowPingTarget,
    countEnabledWindowPingTargets,
    claimWindowPingRun,
    finishWindowPingRun,
    renewWindowPingRunLease,
    recoverWindowPingRuns,
    listWindowPingRuns,
    markWindowPingTargetPinged,
    markWindowPingTargetFailed,
  };
}
