/**
 * Low-level table/artifact purge primitives backing {@link resetUsageHistory}
 * (see `../cleanup.ts`). Split out of `cleanup.ts` to keep that file under the
 * repo's file-size cap — these helpers have no state of their own beyond the
 * shared DB singleton, so they are safe to call from any reset routine that
 * needs generic "wipe" / "wipe before cutoff" semantics.
 *
 * @module lib/db/cleanup/usagePurge
 */
import { getDbInstance } from "../core";
import { cleanupEmptyCallLogDirs, deleteCallArtifact } from "@/lib/usage/callLogArtifacts";

export type DeleteByPeriodTarget = {
  table: string;
  column: string;
  cutoff: "iso" | "date" | "dateHour" | "epochMs" | "epochSeconds";
};

const DELETE_BATCH_SIZE = 10_000;

function cutoffValue(target: DeleteByPeriodTarget, cutoffIso: string): string | number {
  switch (target.cutoff) {
    case "date":
      return cutoffIso.slice(0, 10);
    case "dateHour":
      return `${cutoffIso.slice(0, 10)} ${cutoffIso.slice(11, 13)}:00:00`;
    case "epochMs":
      return new Date(cutoffIso).getTime();
    case "epochSeconds":
      return Math.floor(new Date(cutoffIso).getTime() / 1000);
    case "iso":
    default:
      return cutoffIso;
  }
}

export function tableExists(table: string): boolean {
  const row = getDbInstance()
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
    .get(table) as { name?: string } | undefined;
  return Boolean(row?.name);
}

export function deleteAllFromTable(table: string): number {
  if (!tableExists(table)) return 0;
  return getDbInstance().prepare(`DELETE FROM ${table}`).run().changes;
}

export function deleteFromTableBefore(target: DeleteByPeriodTarget, cutoffIso: string): number {
  if (!tableExists(target.table)) return 0;

  return getDbInstance()
    .prepare(`DELETE FROM ${target.table} WHERE ${target.column} < ?`)
    .run(cutoffValue(target, cutoffIso)).changes;
}

/**
 * Running total for the batched deletes below. A statement can fail after
 * earlier ones committed; the caller reads `deleted` to report what is
 * already gone.
 */
export type DeleteProgress = { deleted: number };

function yieldToEventLoop(): Promise<void> {
  return new Promise<void>((resolve) => setImmediate(resolve));
}

export async function deleteFromTableBeforeInBatches(
  target: DeleteByPeriodTarget,
  cutoffIso: string,
  options: { batchSize?: number; progress?: DeleteProgress } = {}
): Promise<number> {
  const batchSize = options.batchSize ?? DELETE_BATCH_SIZE;
  // LIMIT 0 deletes nothing and LIMIT -1 means no limit; either would never
  // reach the `batch < batchSize` exit below.
  if (!Number.isInteger(batchSize) || batchSize < 1) {
    throw new RangeError(`batchSize must be a positive integer, got ${batchSize}`);
  }
  if (!tableExists(target.table)) return 0;

  const statement = getDbInstance().prepare(
    `DELETE FROM ${target.table}
     WHERE rowid IN (
       SELECT rowid FROM ${target.table}
       WHERE ${target.column} < ?
       LIMIT ?
     )`
  );
  const cutoff = cutoffValue(target, cutoffIso);
  let deleted = 0;

  while (true) {
    const batch = statement.run(cutoff, batchSize).changes;
    deleted += batch;
    if (options.progress) options.progress.deleted += batch;
    if (batch < batchSize) return deleted;
    await yieldToEventLoop();
  }
}

/**
 * Delete rows with `column < cutoffDate` (YYYY-MM-DD), one whole UTC day per
 * statement, oldest day first, yielding between statements.
 *
 * Fixed-size batches are not safe for usage_history: the rollup that runs
 * before each cleanup overwrites a day's daily_usage_summary row from the raw
 * rows still present. A cleanup interrupted inside a day would leave part of
 * it, and the next rollup would replace that day's totals with the remainder.
 * With whole days, an interrupted run leaves only complete days behind.
 */
export async function deleteWholeDaysBefore(
  table: string,
  column: string,
  cutoffDate: string,
  progress?: DeleteProgress
): Promise<number> {
  if (!tableExists(table)) return 0;
  const db = getDbInstance();
  const oldest = db.prepare(`SELECT MIN(${column}) AS t FROM ${table} WHERE ${column} < ?`);
  const remove = db.prepare(`DELETE FROM ${table} WHERE ${column} < ?`);
  let deleted = 0;

  while (true) {
    const row = oldest.get(cutoffDate) as { t?: unknown } | undefined;
    if (row?.t === null || row?.t === undefined) return deleted;
    const day = typeof row.t === "string" ? row.t.slice(0, 10) : "";
    const dayStart = /^\d{4}-\d{2}-\d{2}$/.test(day) ? Date.parse(`${day}T00:00:00Z`) : NaN;
    // A value that does not start with a date cannot be split by day; delete
    // everything left before the cutoff in one statement, as before batching.
    const nextDay = Number.isFinite(dayStart)
      ? new Date(dayStart + 86_400_000).toISOString().slice(0, 10)
      : cutoffDate;
    const batch = remove.run(nextDay < cutoffDate ? nextDay : cutoffDate).changes;
    deleted += batch;
    if (progress) progress.deleted += batch;
    await yieldToEventLoop();
  }
}

export function collectCallLogArtifactsBefore(cutoffIso: string): string[] {
  if (!tableExists("call_logs")) return [];

  const rows = getDbInstance()
    .prepare(
      "SELECT artifact_relpath FROM call_logs WHERE timestamp < ? AND artifact_relpath IS NOT NULL"
    )
    .all(cutoffIso) as Array<{ artifact_relpath?: string | null }>;

  return rows
    .map((row) => row.artifact_relpath)
    .filter((relPath): relPath is string => typeof relPath === "string" && relPath.length > 0);
}

export function deleteCallLogArtifacts(relativePaths: string[]): {
  deletedArtifacts: number;
  errors: number;
} {
  const result = { deletedArtifacts: 0, errors: 0 };

  for (const relPath of new Set(relativePaths)) {
    if (deleteCallArtifact(relPath)) {
      result.deletedArtifacts++;
    }
  }

  cleanupEmptyCallLogDirs();
  return result;
}
