import type { JobRecord, JobRun } from "@/lib/jobRegistry/core";

/**
 * Storage for the job registry: one row per registered periodic job (`jobs`) and
 * one row per execution (`job_runs`).
 *
 * The scheduler owns timers, the in-process re-entrancy guard and handler
 * dispatch; this store only persists definitions and run history. Timestamps
 * are ISO-8601 strings and thresholds are computed by the store from the
 * current clock, so comparisons stay plain string compares.
 *
 * Nothing here claims or fences a run across processes: `job_runs` is history,
 * not ownership.
 */

export interface RecordRunOptions {
  startedAt?: string;
  durationMs?: number;
  errorMessage?: string;
  recordsAffected?: number;
}

export interface JobRegistryRepository {
  /** Every registered job, ordered by id. */
  listJobs(): Promise<JobRecord[]>;
  findJob(id: string): Promise<JobRecord | null>;
  /**
   * Insert the job on first sight; afterwards refresh only the scheduling fields
   * (type, cron, interval, env flag, config) and `updatedAt`. Never overwrites
   * `enabled` or `createdAt` of an existing row.
   */
  upsertJob(job: JobRecord): Promise<void>;
  /** Set the user toggle and bump `updatedAt`; no-op for an unknown id. */
  setJobEnabled(id: string, enabled: boolean): Promise<void>;
  /**
   * Append one run. `startedAt` defaults to now. A `running` run has no
   * `finishedAt`; a finished run gets `startedAt + durationMs` when both are
   * given, otherwise now.
   */
  recordRun(jobId: string, status: JobRun["status"], opts?: RecordRunOptions): Promise<void>;
  /**
   * Delete runs of one job that are both outside the newest `maxRuns` (default
   * 100) and started more than `maxDays` (default 30) ago.
   */
  pruneRuns(jobId: string, maxRuns?: number, maxDays?: number): Promise<void>;
  /** Newest runs of one job first, at most `limit` (default 20). */
  listRuns(jobId: string, limit?: number): Promise<JobRun[]>;
  /**
   * Mark every `running` run (any job) that started more than `timeoutMinutes`
   * (default 5) ago as `failure` with message "orphaned: exceeded timeout".
   */
  failOrphanedRuns(timeoutMinutes?: number): Promise<void>;
}
