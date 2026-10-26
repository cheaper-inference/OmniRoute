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

import { hashFileSync } from "../backupFileHash";
import { tryOpenSync } from "../adapters/driverFactory";
import type { SqliteAdapter } from "../adapters/types";
import { pruneBackupDirectory, resolveDbBackupRetention } from "../backupRetention";
import { DB_BACKUPS_DIR, DATA_DIR, getDbInstance } from "../core";

/**
 * Resolve the SHA of the pre-migration snapshot the current migration would reuse,
 * so the retention pass can exempt that one family from the age rule. Recomputes
 * the same bytes the migration runner hashes (read-only open of the live file,
 * snapshot into a throwaway temp, hash the temp) and returns null whenever the
 * snapshot path is unavailable (sql.js driver, :memory:, cloud without a file,
 * or any error): no exemption, normal pruning.
 */
export function resolveReusedPreMigrationSha(
  db: Pick<SqliteAdapter, "driver" | "name">,
  backupDir: string
): string | null {
  try {
    if (db.driver === "sql.js") return null;
    const sqliteFile = db.name;
    if (!sqliteFile || sqliteFile === ":memory:") return null;
    const tempDir = fs.mkdtempSync(path.join(backupDir, ".cleanup-resolve-"));
    const tempPath = path.join(tempDir, "snapshot.sqlite");
    try {
      const reader = tryOpenSync(sqliteFile, { readonly: true, fileMustExist: true });
      if (!reader) return null;
      try {
        reader.exec(`VACUUM INTO '${tempPath.replace(/'/g, "''")}'`);
      } finally {
        reader.close();
      }
      return hashFileSync(tempPath);
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  } catch (err) {
    console.warn("[Cleanup] Reused pre-migration snapshot lookup failed:", err);
    return null;
  }
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
export function pruneDbBackupsOutsideMigrationWindow(options?: { backupDir?: string }): {
  deletedBackupFamilies: number;
  deletedFiles: number;
} {
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
    const sha = retentionDays > 0 ? resolveReusedPreMigrationSha(db, backupDir) : null;
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
