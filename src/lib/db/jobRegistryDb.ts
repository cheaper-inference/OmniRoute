/**
 * JobRegistry persistence layer.
 *
 * CRUD for the `jobs` and `job_runs` tables (migration 146). The storage itself
 * lives behind JobRegistryRepository (src/domain/persistence); the SQLite
 * implementation is in repositories/sqliteJobRegistryRepository.ts.
 *
 * The exports below stay synchronous (SQLite-only legacy access) because the
 * scheduler in src/lib/jobRegistry/registry.ts calls them without awaiting.
 */

import type {
  JobRegistryRepository,
  RecordRunOptions,
} from "@/domain/persistence/jobRegistryRepository";
import type { JobRecord, JobRun } from "../jobRegistry/core";
import { jobRegistryRepositories } from "./repositories/jobRegistryRepositories";

export type { RecordRunOptions };

const store = jobRegistryRepositories.legacySync;

/** Async job registry storage contract. */
export function getJobRegistryRepository(): JobRegistryRepository {
  return jobRegistryRepositories.jobs;
}

export function getAllJobs(): JobRecord[] {
  return store.getAllJobs();
}

export function getJob(id: string): JobRecord | null {
  return store.getJob(id);
}

/**
 * Idempotent register: insert on first sight, then refresh scheduling fields
 * (type/cron/interval/env_flag/config) and bump updated_at - but NEVER overwrite
 * `enabled` (the user's API-driven toggle) nor `created_at`.
 */
export function upsertJob(job: JobRecord): void {
  store.upsertJob(job);
}

export function updateJobEnabled(id: string, enabled: boolean): void {
  store.updateJobEnabled(id, enabled);
}

/**
 * Insert a run. `finishedAt` is derived from startedAt + durationMs; a
 * status='running' insert leaves it NULL.
 */
export function recordRun(
  jobId: string,
  status: JobRun["status"],
  opts: RecordRunOptions = {}
): void {
  store.recordRun(jobId, status, opts);
}

/**
 * Dual-dimension pruning: a run is deleted only when it is BOTH outside the
 * newest `maxRuns` AND older than `maxDays`.
 */
export function pruneRuns(jobId: string, maxRuns = 100, maxDays = 30): void {
  store.pruneRuns(jobId, maxRuns, maxDays);
}

export function getRuns(jobId: string, limit = 20): JobRun[] {
  return store.getRuns(jobId, limit);
}

/**
 * Startup repair: mark `running` runs older than `timeoutMinutes` as `failure`.
 */
export function cleanupOrphanedRuns(timeoutMinutes = 5): void {
  store.cleanupOrphanedRuns(timeoutMinutes);
}
