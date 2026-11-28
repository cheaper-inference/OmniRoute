/**
 * SQLite implementation of the job registry store (`jobs` and `job_runs`,
 * migration 146).
 *
 * SQL text, bound parameters, statement order and row mapping are unchanged
 * from the pre-repository module (db/jobRegistryDb.ts). Thresholds are computed
 * in JS (never SQL datetime arithmetic) so comparisons stay ISO-8601 string
 * compares; `datetime('now')` is only used where the old module used it. The
 * database is resolved at call time so reset/restore never leaves a captured
 * handle.
 *
 * Async repository and SQLite-only legacy helpers share these private
 * operations.
 */

import type {
  JobRegistryRepository,
  RecordRunOptions,
} from "@/domain/persistence/jobRegistryRepository";
import type { JobRecord, JobRun } from "@/lib/jobRegistry/core";
import { getDbInstance } from "../core";

type JobRow = {
  id: string;
  type: JobRecord["type"];
  cron: string | null;
  interval_ms: number | null;
  enabled: number;
  env_flag: string | null;
  config: string | null;
  created_at: string;
  updated_at: string;
};

type JobRunRow = {
  id: number;
  job_id: string;
  started_at: string;
  finished_at: string | null;
  status: JobRun["status"];
  error_message: string | null;
  records_affected: number | null;
  duration_ms: number | null;
};

function mapJob(row: JobRow): JobRecord {
  return {
    id: row.id,
    type: row.type,
    cron: row.cron,
    intervalMs: row.interval_ms,
    enabled: row.enabled === 1,
    envFlag: row.env_flag,
    config: row.config ? JSON.parse(row.config) : {},
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapRun(row: JobRunRow): JobRun {
  return {
    id: row.id,
    jobId: row.job_id,
    startedAt: row.started_at,
    finishedAt: row.finished_at,
    status: row.status,
    errorMessage: row.error_message,
    recordsAffected: row.records_affected ?? 0,
    durationMs: row.duration_ms,
  };
}

function getAllJobs(): JobRecord[] {
  const db = getDbInstance();
  const rows = db.prepare("SELECT * FROM jobs ORDER BY id").all() as JobRow[];
  return rows.map(mapJob);
}

function getJob(id: string): JobRecord | null {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM jobs WHERE id = ?").get(id) as JobRow | undefined;
  return row ? mapJob(row) : null;
}

/**
 * Idempotent register: INSERT on first sight, then a column-level UPDATE that
 * refreshes scheduling fields (type/cron/interval/env_flag/config) and bumps
 * updated_at - but NEVER overwrites `enabled` (the user's API-driven toggle) nor
 * `created_at`. Pass enabled=true for new jobs; the UPDATE simply skips the column.
 */
function upsertJob(job: JobRecord): void {
  const db = getDbInstance();
  db.prepare(
    `INSERT INTO jobs (id, type, cron, interval_ms, enabled, env_flag, config, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
     ON CONFLICT(id) DO UPDATE SET
       type = excluded.type,
       cron = excluded.cron,
       interval_ms = excluded.interval_ms,
       env_flag = excluded.env_flag,
       config = excluded.config,
       updated_at = datetime('now')`
  ).run(
    job.id,
    job.type,
    job.cron,
    job.intervalMs,
    job.enabled ? 1 : 0,
    job.envFlag,
    JSON.stringify(job.config ?? {}),
    job.createdAt
  );
}

function updateJobEnabled(id: string, enabled: boolean): void {
  const db = getDbInstance();
  db.prepare("UPDATE jobs SET enabled = ?, updated_at = datetime('now') WHERE id = ?").run(
    enabled ? 1 : 0,
    id
  );
}

/**
 * Insert a completed run. `startedAt` is captured by the registry before the handler
 * runs; `finishedAt` is derived from startedAt + durationMs so the two never drift.
 * A status='running' insert leaves finishedAt NULL (used to mark in-flight work).
 */
function recordRun(jobId: string, status: JobRun["status"], opts: RecordRunOptions = {}): void {
  const db = getDbInstance();
  const startedAt = opts.startedAt ?? new Date().toISOString();
  const finishedAt =
    status === "running"
      ? null
      : opts.startedAt && opts.durationMs != null
        ? new Date(new Date(opts.startedAt).getTime() + opts.durationMs).toISOString()
        : new Date().toISOString();
  db.prepare(
    `INSERT INTO job_runs (job_id, started_at, finished_at, status, error_message, records_affected, duration_ms)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(
    jobId,
    startedAt,
    finishedAt,
    status,
    opts.errorMessage ?? null,
    opts.recordsAffected ?? 0,
    opts.durationMs ?? null
  );
}

/**
 * Dual-dimension pruning: keep the most recent `maxRuns` OR anything younger than
 * `maxDays`. A run is deleted only when it is BOTH outside the recent-N window AND
 * older than maxDays - so a job that runs rarely keeps its full history.
 * All thresholds are ISO-8601 string compares (no SQL datetime math).
 */
function pruneRuns(jobId: string, maxRuns = 100, maxDays = 30): void {
  const db = getDbInstance();
  const threshold = new Date(Date.now() - maxDays * 86_400_000).toISOString();
  db.prepare(
    `DELETE FROM job_runs
     WHERE job_id = ?
       AND id NOT IN (
         SELECT id FROM job_runs WHERE job_id = ? ORDER BY started_at DESC LIMIT ?
       )
       AND started_at < ?`
  ).run(jobId, jobId, maxRuns, threshold);
}

function getRuns(jobId: string, limit = 20): JobRun[] {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT * FROM job_runs WHERE job_id = ? ORDER BY started_at DESC LIMIT ?")
    .all(jobId, limit) as JobRunRow[];
  return rows.map(mapRun);
}

/**
 * Startup repair: any run still marked `running` whose started_at is older than
 * `timeoutMinutes` is a leftover from a crashed/hung process. Mark it `failure` so
 * the history is accurate and the slot frees up. The 5-minute default avoids
 * clobbering a genuinely in-flight run on a slow box.
 */
function cleanupOrphanedRuns(timeoutMinutes = 5): void {
  const db = getDbInstance();
  const threshold = new Date(Date.now() - timeoutMinutes * 60_000).toISOString();
  db.prepare(
    `UPDATE job_runs
     SET status = 'failure',
         error_message = 'orphaned: exceeded timeout',
         finished_at = datetime('now')
     WHERE status = 'running' AND started_at < ?`
  ).run(threshold);
}

export const sqliteJobRegistryRepository: JobRegistryRepository = {
  listJobs: async () => getAllJobs(),
  findJob: async (id) => getJob(id),
  upsertJob: async (job) => upsertJob(job),
  setJobEnabled: async (id, enabled) => updateJobEnabled(id, enabled),
  recordRun: async (jobId, status, opts) => recordRun(jobId, status, opts),
  pruneRuns: async (jobId, maxRuns, maxDays) => pruneRuns(jobId, maxRuns, maxDays),
  listRuns: async (jobId, limit) => getRuns(jobId, limit),
  failOrphanedRuns: async (timeoutMinutes) => cleanupOrphanedRuns(timeoutMinutes),
};

/** Synchronous compatibility is SQLite-only, not part of the portable contract. */
export const sqliteJobRegistryLegacySync = {
  getAllJobs,
  getJob,
  upsertJob,
  updateJobEnabled,
  recordRun,
  pruneRuns,
  getRuns,
  cleanupOrphanedRuns,
};
