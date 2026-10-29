/**
 * Database module: scheduled Codex account wakeups.
 *
 * Tables `codex_wakeup_tasks` and `codex_wakeup_runs` (migration 206). A run row is also
 * the cross-process lease: `claimCodexWakeupRun` only inserts a new `running` run when
 * no other run of the same task holds a live lease, inside one SQLite transaction, so
 * two processes sharing a DATA_DIR cannot both run the same task.
 */
import { randomUUID } from "node:crypto";
import { getDbInstance } from "./core";
import type {
  CodexWakeupSchedule,
  CodexWakeupTaskInput,
} from "@/shared/validation/codexWakeupSchemas";

export const CODEX_WAKEUP_MAX_TASKS = 100;
export const CODEX_WAKEUP_MAX_RUNS = 100;
/** Lease budget per account: the 60s ping timeout plus margin for the quota read. */
const LEASE_MS_PER_ACCOUNT = 65_000;
const LEASE_BASE_MS = 10_000;

export type CodexWakeupTrigger = "scheduled" | "manual";
export type CodexWakeupResultStatus = "succeeded" | "failed" | "skipped";
export type CodexWakeupRunStatus = "running" | CodexWakeupResultStatus | "partial" | "interrupted";

export interface CodexWakeupTask {
  id: string;
  name: string;
  connectionIds: string[];
  schedule: CodexWakeupSchedule;
  enabled: boolean;
  nextRunAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CodexWakeupRunResult {
  connectionId: string;
  status: CodexWakeupResultStatus;
  reason: string;
  durationMs: number;
}

export interface CodexWakeupRun {
  id: string;
  taskId: string;
  taskName: string;
  trigger: CodexWakeupTrigger;
  status: CodexWakeupRunStatus;
  results: CodexWakeupRunResult[];
  startedAt: string;
  finishedAt: string | null;
  leaseExpiresAt: number;
}

export interface CodexWakeupClaim {
  run: CodexWakeupRun;
  task: CodexWakeupTask;
}

export type CodexWakeupStoreErrorCode = "not_found" | "running" | "limit";

export class CodexWakeupStoreError extends Error {
  readonly code: CodexWakeupStoreErrorCode;
  constructor(code: CodexWakeupStoreErrorCode) {
    super(`codex wakeup: ${code}`);
    this.name = "CodexWakeupStoreError";
    this.code = code;
  }
}

type TaskRow = {
  id: string;
  name: string;
  connection_ids: string;
  schedule: string;
  enabled: number;
  next_run_at: string | null;
  created_at: string;
  updated_at: string;
};

type RunRow = {
  id: string;
  task_id: string;
  task_name: string;
  trigger_kind: CodexWakeupTrigger;
  status: CodexWakeupRunStatus;
  results: string;
  started_at: string;
  finished_at: string | null;
  lease_expires_at: number;
};

function parseJsonArray<T>(value: string): T[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function toTask(row: TaskRow): CodexWakeupTask {
  return {
    id: row.id,
    name: row.name,
    connectionIds: parseJsonArray<string>(row.connection_ids),
    schedule: JSON.parse(row.schedule) as CodexWakeupSchedule,
    enabled: row.enabled === 1,
    nextRunAt: row.next_run_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toRun(row: RunRow): CodexWakeupRun {
  return {
    id: row.id,
    taskId: row.task_id,
    taskName: row.task_name,
    trigger: row.trigger_kind,
    status: row.status,
    results: parseJsonArray<CodexWakeupRunResult>(row.results),
    startedAt: row.started_at,
    finishedAt: row.finished_at,
    leaseExpiresAt: row.lease_expires_at,
  };
}

function selectTask(id: string): TaskRow | undefined {
  return getDbInstance().prepare("SELECT * FROM codex_wakeup_tasks WHERE id = ?").get(id) as
    TaskRow | undefined;
}

function hasLiveRun(taskId: string, nowMs: number): boolean {
  const row = getDbInstance()
    .prepare(
      "SELECT 1 FROM codex_wakeup_runs WHERE task_id = ? AND status = 'running' AND lease_expires_at > ? LIMIT 1"
    )
    .get(taskId, nowMs);
  return Boolean(row);
}

export function listCodexWakeupTasks(): CodexWakeupTask[] {
  const rows = getDbInstance()
    .prepare("SELECT * FROM codex_wakeup_tasks ORDER BY created_at ASC, id ASC")
    .all() as TaskRow[];
  return rows.map(toTask);
}

export function getCodexWakeupTask(id: string): CodexWakeupTask | null {
  const row = selectTask(id);
  return row ? toTask(row) : null;
}

export function createCodexWakeupTask(
  input: CodexWakeupTaskInput,
  nextRunAt: string | null,
  nowMs: number = Date.now()
): CodexWakeupTask {
  const db = getDbInstance();
  const id = randomUUID();
  const now = new Date(nowMs).toISOString();
  db.transaction(() => {
    const { n } = db.prepare("SELECT COUNT(*) AS n FROM codex_wakeup_tasks").get() as {
      n: number;
    };
    if (n >= CODEX_WAKEUP_MAX_TASKS) throw new CodexWakeupStoreError("limit");
    db.prepare(
      `INSERT INTO codex_wakeup_tasks
         (id, name, connection_ids, schedule, enabled, next_run_at, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      id,
      input.name,
      JSON.stringify(input.connectionIds),
      JSON.stringify(input.schedule),
      input.enabled ? 1 : 0,
      input.enabled ? nextRunAt : null,
      now,
      now
    );
  })();
  return getCodexWakeupTask(id) as CodexWakeupTask;
}

export function updateCodexWakeupTask(
  id: string,
  input: CodexWakeupTaskInput,
  nextRunAt: string | null,
  nowMs: number = Date.now()
): CodexWakeupTask {
  const db = getDbInstance();
  db.transaction(() => {
    if (!selectTask(id)) throw new CodexWakeupStoreError("not_found");
    if (hasLiveRun(id, nowMs)) throw new CodexWakeupStoreError("running");
    db.prepare(
      `UPDATE codex_wakeup_tasks
          SET name = ?, connection_ids = ?, schedule = ?, enabled = ?, next_run_at = ?, updated_at = ?
        WHERE id = ?`
    ).run(
      input.name,
      JSON.stringify(input.connectionIds),
      JSON.stringify(input.schedule),
      input.enabled ? 1 : 0,
      input.enabled ? nextRunAt : null,
      new Date(nowMs).toISOString(),
      id
    );
  })();
  return getCodexWakeupTask(id) as CodexWakeupTask;
}

export function deleteCodexWakeupTask(id: string, nowMs: number = Date.now()): void {
  const db = getDbInstance();
  db.transaction(() => {
    if (!selectTask(id)) throw new CodexWakeupStoreError("not_found");
    if (hasLiveRun(id, nowMs)) throw new CodexWakeupStoreError("running");
    db.prepare("DELETE FROM codex_wakeup_runs WHERE task_id = ?").run(id);
    db.prepare("DELETE FROM codex_wakeup_tasks WHERE id = ?").run(id);
  })();
}

/**
 * Claim a run of `taskId`. Returns null — without side effects — when a scheduled claim
 * finds the task disabled or not yet due, or when another run of the task still holds a
 * live lease. A scheduled claim moves `next_run_at` to the next slot after `nowMs`, so a
 * slot missed while the server was down runs once and is never replayed.
 * Throws `not_found` for an unknown task.
 */
export function claimCodexWakeupRun(
  taskId: string,
  trigger: CodexWakeupTrigger,
  nowMs: number,
  computeNextRunAt: (schedule: CodexWakeupSchedule, after: number) => string | null
): CodexWakeupClaim | null {
  const db = getDbInstance();
  return db.transaction((): CodexWakeupClaim | null => {
    const row = selectTask(taskId);
    if (!row) throw new CodexWakeupStoreError("not_found");
    const task = toTask(row);
    if (trigger === "scheduled") {
      const dueMs = task.nextRunAt ? Date.parse(task.nextRunAt) : Number.NaN;
      if (!task.enabled || !Number.isFinite(dueMs) || dueMs > nowMs) return null;
    }
    if (hasLiveRun(taskId, nowMs)) return null;
    if (trigger === "scheduled") {
      task.nextRunAt = computeNextRunAt(task.schedule, nowMs);
      db.prepare("UPDATE codex_wakeup_tasks SET next_run_at = ? WHERE id = ?").run(
        task.nextRunAt,
        taskId
      );
    }
    const run: CodexWakeupRun = {
      id: randomUUID(),
      taskId,
      taskName: task.name,
      trigger,
      status: "running",
      results: [],
      startedAt: new Date(nowMs).toISOString(),
      finishedAt: null,
      leaseExpiresAt: nowMs + task.connectionIds.length * LEASE_MS_PER_ACCOUNT + LEASE_BASE_MS,
    };
    db.prepare(
      `INSERT INTO codex_wakeup_runs
         (id, task_id, task_name, trigger_kind, status, results, started_at, lease_expires_at)
       VALUES (?, ?, ?, ?, 'running', '[]', ?, ?)`
    ).run(run.id, taskId, run.taskName, trigger, run.startedAt, run.leaseExpiresAt);
    return { run, task };
  })();
}

/** Append one account result to a run that is still running (a recovered run ignores it). */
export function recordCodexWakeupResult(runId: string, result: CodexWakeupRunResult): void {
  const db = getDbInstance();
  db.transaction(() => {
    const row = db
      .prepare("SELECT results FROM codex_wakeup_runs WHERE id = ? AND status = 'running'")
      .get(runId) as { results: string } | undefined;
    if (!row) return;
    const results = [...parseJsonArray<CodexWakeupRunResult>(row.results), result];
    db.prepare("UPDATE codex_wakeup_runs SET results = ? WHERE id = ?").run(
      JSON.stringify(results),
      runId
    );
  })();
}

function deriveRunStatus(
  results: CodexWakeupRunResult[],
  interrupted: boolean
): CodexWakeupRunStatus {
  const statuses = new Set(results.map((result) => result.status));
  if (interrupted || statuses.size === 0) return "interrupted";
  return statuses.size === 1 ? results[0].status : "partial";
}

function pruneRuns(): void {
  getDbInstance()
    .prepare(
      `DELETE FROM codex_wakeup_runs
        WHERE status != 'running'
          AND id NOT IN (
            SELECT id FROM codex_wakeup_runs WHERE status != 'running'
             ORDER BY started_at DESC, id DESC LIMIT ?
          )`
    )
    .run(CODEX_WAKEUP_MAX_RUNS);
}

/** Close a running run with a status derived from its results; prunes old history. */
export function finishCodexWakeupRun(
  runId: string,
  nowMs: number = Date.now(),
  interrupted = false
): CodexWakeupRun | null {
  const db = getDbInstance();
  return db.transaction((): CodexWakeupRun | null => {
    const row = db
      .prepare("SELECT * FROM codex_wakeup_runs WHERE id = ? AND status = 'running'")
      .get(runId) as RunRow | undefined;
    if (!row) return null;
    const run = toRun(row);
    run.status = deriveRunStatus(run.results, interrupted);
    run.finishedAt = new Date(nowMs).toISOString();
    db.prepare("UPDATE codex_wakeup_runs SET status = ?, finished_at = ? WHERE id = ?").run(
      run.status,
      run.finishedAt,
      runId
    );
    pruneRuns();
    return run;
  })();
}

/** Mark runs whose lease expired while still running (process died mid-run) as interrupted. */
export function recoverCodexWakeupRuns(nowMs: number = Date.now()): number {
  const result = getDbInstance()
    .prepare(
      `UPDATE codex_wakeup_runs SET status = 'interrupted', finished_at = ?
        WHERE status = 'running' AND lease_expires_at <= ?`
    )
    .run(new Date(nowMs).toISOString(), nowMs);
  return result.changes;
}

export function listCodexWakeupRuns(limit = 20): CodexWakeupRun[] {
  const rows = getDbInstance()
    .prepare("SELECT * FROM codex_wakeup_runs ORDER BY started_at DESC, id DESC LIMIT ?")
    .all(Math.max(1, Math.min(limit, CODEX_WAKEUP_MAX_RUNS))) as RunRow[];
  return rows.map(toRun);
}
