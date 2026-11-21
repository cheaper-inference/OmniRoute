/**
 * Backup-directory pruning for the scheduled cleanup pass, kept out of
 * `../cleanup.ts` to stay under the file-size cap.
 *
 * The migration runner never prunes: its snapshots are content-addressed and may
 * still be another process's in-flight restore point. This pass runs after
 * startup and on the periodic schedule instead, applying the operator's
 * configured retention to whatever the migration runner published.
 *
 * @module lib/db/cleanup/backupPrune
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "node:url";
import { fork } from "node:child_process";

import type { SqliteAdapter } from "../adapters/types";
import {
  collectBackupFamilies,
  pruneBackupDirectory,
  resolveDbBackupRetention,
} from "../backupRetention";
import { DB_BACKUPS_DIR, DATA_DIR, getDbInstance } from "../core";
import type { VacuumSnapshotJob, VacuumSnapshotWorkerResult } from "./vacuumSnapshotWorker";

export function resolveVacuumSnapshotWorker(): { workerFile: string; execArgv: string[] } {
  const moduleDir = path.dirname(fileURLToPath(import.meta.url));
  const entryDir = process.argv[1] ? path.dirname(path.resolve(process.argv[1])) : process.cwd();
  const candidates = [
    path.join(moduleDir, "vacuumSnapshotWorker.js"),
    path.join(entryDir, "src/lib/db/cleanup/vacuumSnapshotWorker.js"),
    path.resolve("src/lib/db/cleanup/vacuumSnapshotWorker.js"),
    path.join(moduleDir, "vacuumSnapshotWorker.ts"),
    path.resolve("src/lib/db/cleanup/vacuumSnapshotWorker.ts"),
  ];
  for (const workerFile of candidates) {
    // Explicit packaging owns these files; keep the dynamic probe opaque to Next tracing.
    if (Reflect.apply(fs.existsSync, fs, [workerFile])) {
      return { workerFile, execArgv: workerFile.endsWith(".ts") ? ["--import", "tsx/esm"] : [] };
    }
  }
  throw new Error("Vacuum snapshot worker is missing");
}

function isVacuumWorkerResult(value: unknown): value is VacuumSnapshotWorkerResult {
  if (!value || typeof value !== "object") return false;
  const result = value as Partial<VacuumSnapshotWorkerResult>;
  return (
    typeof result.ok === "boolean" &&
    (result.sha256 === undefined || typeof result.sha256 === "string")
  );
}

function attachVacuumWorkerHandlers(
  child: ReturnType<typeof fork>,
  timeoutMs: number,
  resolve: (value: VacuumSnapshotWorkerResult) => void,
  reject: (reason: Error) => void
): (message: string) => void {
  let result: VacuumSnapshotWorkerResult | null = null;
  let failure: Error | null = null;
  const failAndKill = (message: string) => {
    failure = new Error(message);
    child.kill("SIGKILL");
  };
  const timer = setTimeout(() => failAndKill("Vacuum snapshot worker timed out"), timeoutMs);
  child.on("message", (message: unknown) => {
    if (isVacuumWorkerResult(message)) result = message;
    else failure = new Error("Vacuum snapshot worker failed");
  });
  child.on("error", () => {
    failure = new Error("Vacuum snapshot worker failed to start");
  });
  child.once("close", (code) => {
    clearTimeout(timer);
    if (!failure && code === 0 && result) resolve(result);
    else reject(failure ?? new Error("Vacuum snapshot worker exited without a result"));
  });
  return failAndKill;
}

export async function runVacuumSnapshotWithHashInChild(
  job: VacuumSnapshotJob,
  options: {
    workerFile?: string;
    execArgv?: string[];
    timeoutMs?: number;
  } = {}
): Promise<VacuumSnapshotWorkerResult> {
  const resolved = options.workerFile
    ? { workerFile: options.workerFile, execArgv: options.execArgv ?? [] }
    : resolveVacuumSnapshotWorker();
  return new Promise((resolve, reject) => {
    const child = fork(resolved.workerFile, [], {
      execArgv: resolved.execArgv,
      stdio: ["ignore", "ignore", "ignore", "ipc"],
    });
    const failAndKill = attachVacuumWorkerHandlers(
      child,
      options.timeoutMs ?? 120_000,
      resolve,
      reject
    );
    child.send(job, (error) => {
      if (error) failAndKill("Vacuum snapshot worker communication failed");
    });
  });
}

export async function runVacuumSnapshotInChild(
  job: VacuumSnapshotJob,
  options: {
    workerFile?: string;
    execArgv?: string[];
    timeoutMs?: number;
  } = {}
): Promise<boolean> {
  const result = await runVacuumSnapshotWithHashInChild(job, options);
  return result.ok;
}

/**
 * Resolve the SHA of the pre-migration snapshot the current migration would reuse,
 * so the retention pass can exempt that one family from the age rule. Recomputes
 * the same bytes the migration runner hashes (read-only open of the live file in a
 * child process, snapshot into a throwaway temp via VACUUM INTO, hash the temp) and
 * returns null whenever the snapshot path is unavailable (sql.js driver, :memory:,
 * cloud without a file, or any error): no exemption, normal pruning.
 */
export async function resolveReusedPreMigrationSha(
  db: Pick<SqliteAdapter, "driver" | "name">,
  backupDir: string,
  options?: { workerFile?: string; execArgv?: string[]; timeoutMs?: number }
): Promise<string | null> {
  try {
    if (db.driver === "sql.js") return null;
    const sqliteFile = db.name;
    if (!sqliteFile || sqliteFile === ":memory:") return null;
    const tempDir = fs.mkdtempSync(path.join(backupDir, ".cleanup-resolve-"));
    const tempPath = path.join(tempDir, "snapshot.sqlite");
    try {
      const snapshot = await runVacuumSnapshotWithHashInChild({ sqliteFile, tempPath }, options);
      if (!snapshot.ok || !snapshot.sha256) return null;
      return snapshot.sha256;
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  } catch (err) {
    console.warn("[Cleanup] Reused pre-migration snapshot lookup failed:", err);
    return null;
  }
}

const DAY_MS = 24 * 60 * 60 * 1000;
// Checked a minute past the cutoff pruneBackupDirectory uses, so clock movement
// between the two reads can only make this check compute the hash more often.
const EXPIRY_CHECK_SLACK_MS = 60 * 1000;
const PRE_MIGRATION_BASE = /^db_state-[0-9a-f]{64}_pre-migration\.sqlite$/;

/**
 * The reused-snapshot exemption only skips the age rule, so it can only change
 * the result when a pre-migration snapshot family is old enough to expire.
 * Without one, the full-database VACUUM INTO that computes the hash would run
 * on the main thread for nothing. Uses the same family scan as the prune.
 */
function hasExpirablePreMigrationSnapshot(backupDir: string, retentionDays: number): boolean {
  const cutoffMs = Date.now() - retentionDays * DAY_MS + EXPIRY_CHECK_SLACK_MS;
  return collectBackupFamilies(backupDir).some(
    (family) => PRE_MIGRATION_BASE.test(family.base) && family.latestMtimeMs < cutoffMs
  );
}

/**
 * Prune backup families outside the migration window, using the operator's
 * configured retention. Runs from the scheduled pass (startup + periodic), never
 * from the migration runner itself. Skips the pass while another process is
 * publishing a migration snapshot, and never fails the surrounding pass.
 *
 * `backupDir` is injected for tests: `DATA_DIR` is fixed at import time, so
 * tests that point `process.env.DATA_DIR` at a temp dir pass their own dir.
 */
export async function pruneDbBackupsOutsideMigrationWindow(options?: {
  backupDir?: string;
}): Promise<{
  deletedBackupFamilies: number;
  deletedFiles: number;
}> {
  try {
    const backupDir = options?.backupDir ?? DB_BACKUPS_DIR ?? path.join(DATA_DIR, "db_backups");
    if (!backupDir || !fs.existsSync(backupDir)) {
      return { deletedBackupFamilies: 0, deletedFiles: 0 };
    }
    if (fs.readdirSync(backupDir).some((entry) => entry.startsWith(".migration-snapshot-"))) {
      console.log("[Cleanup] Skipping backup pruning: migration snapshot in progress.");
      return { deletedBackupFamilies: 0, deletedFiles: 0 };
    }
    const db = getDbInstance();
    const { maxFiles, retentionDays } = resolveDbBackupRetention(db);
    const sha =
      retentionDays > 0 && hasExpirablePreMigrationSnapshot(backupDir, retentionDays)
        ? await resolveReusedPreMigrationSha(db, backupDir)
        : null;
    const result = pruneBackupDirectory({
      backupDir,
      maxFiles,
      retentionDays,
      exemptBases: sha ? new Set([`db_state-${sha}_pre-migration.sqlite`]) : undefined,
    });
    if (result.deletedBackupFamilies > 0 || result.deletedFiles > 0) {
      console.log(
        `[Cleanup] Pruned ${result.deletedBackupFamilies} backup families (${result.deletedFiles} files) outside the migration window.`
      );
    }
    return {
      deletedBackupFamilies: result.deletedBackupFamilies,
      deletedFiles: result.deletedFiles,
    };
  } catch (err) {
    console.warn("[Cleanup] Backup pruning outside the migration window failed:", err);
    return { deletedBackupFamilies: 0, deletedFiles: 0 };
  }
}
