/**
 * Backup retention primitives — pure filesystem work, no `core.ts` dependency.
 *
 * `backup.ts` (manual/API/auto backups) resolves the operator's settings from the
 * database and delegates pure family pruning here. The migration runner deliberately
 * does not prune during its concurrent safety window: its snapshots are content-addressed
 * and reused for an identical DB state, while manual/scheduled cleanup remains the single
 * retention boundary. Before #10421, repeated failed starts created distinct timestamped
 * snapshots and `db_backups/` grew without bound (observed: 48,999 files / 204 GB).
 */

import fs from "fs";
import path from "path";

import { portableSnapshotFile, portableSnapshotId } from "./backupPaths";
import type { SqliteAdapter } from "./adapters/types";

export const MAX_DB_BACKUPS = 20;
export const DEFAULT_DB_BACKUP_RETENTION_DAYS = 0;
// #3834: the "Keep latest backups" UI value is persisted here so it survives a page
// refresh. A dedicated namespace avoids cross-talk with the databaseSettings key_value
// store (which rewrites all of its own keys on every update).
export const DB_BACKUP_SETTINGS_NAMESPACE = "dbBackup";
export const DB_BACKUP_MAX_FILES_KEY = "maxFiles";
export const DB_BACKUP_RETENTION_DAYS_KEY = "retentionDays";

export function parsePositiveInt(value: string | undefined, fallback: number) {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export function parseNonNegativeInt(value: string | undefined, fallback: number) {
  if (value === undefined) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : fallback;
}

function getStoredInteger(
  db: Pick<SqliteAdapter, "prepare">,
  key: string,
  min: number
): number | undefined {
  try {
    const row = db
      .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
      .get(DB_BACKUP_SETTINGS_NAMESPACE, key) as { value?: string } | undefined;
    if (!row?.value) return undefined;
    const parsed = JSON.parse(row.value);
    return Number.isInteger(parsed) && parsed >= min ? parsed : undefined;
  } catch {
    return undefined;
  }
}

function getDatabaseSettingsKeepLastNBackups(
  db: Pick<SqliteAdapter, "prepare">
): number | undefined {
  try {
    const rows = db
      .prepare(
        "SELECT namespace, key, value FROM key_value WHERE (namespace = 'databaseSettings' AND key IN ('backup.keepLastNBackups', 'keepLastNBackups')) OR (namespace = 'settings' AND key = 'databaseSettings')"
      )
      .all() as Array<{ namespace: string; key: string; value: string }>;

    let fromSettingsNested: number | undefined = undefined;
    let fromDbFlat: number | undefined = undefined;
    let fromDbNested: number | undefined = undefined;

    for (const row of rows) {
      if (!row.value) continue;
      let parsed: unknown;
      try {
        parsed = JSON.parse(row.value);
      } catch {
        continue;
      }

      if (row.namespace === "settings") {
        if (row.key === "databaseSettings" && typeof parsed === "object" && parsed !== null) {
          const backup = (parsed as Record<string, unknown>).backup;
          if (typeof backup === "object" && backup !== null) {
            const val = (backup as Record<string, unknown>).keepLastNBackups;
            if (typeof val === "number" && Number.isInteger(val) && val >= 1) {
              fromSettingsNested = val;
            }
          }
        }
      } else if (row.namespace === "databaseSettings") {
        if (row.key === "backup.keepLastNBackups") {
          if (typeof parsed === "number" && Number.isInteger(parsed) && parsed >= 1) {
            fromDbNested = parsed;
          }
        } else if (row.key === "keepLastNBackups") {
          if (typeof parsed === "number" && Number.isInteger(parsed) && parsed >= 1) {
            fromDbFlat = parsed;
          }
        }
      }
    }

    if (fromDbNested !== undefined) return fromDbNested;
    if (fromSettingsNested !== undefined) return fromSettingsNested;

    // Legacy flat key: migration 046 seeded uncustomized '3' into key_value
    // for all fresh installations. A fresh installation with nothing set by the
    // operator must fall through to MAX_DB_BACKUPS (20) (#13308).
    // Therefore, only honor the legacy flat key if it differs from the migration 046 default.
    if (fromDbFlat !== undefined && fromDbFlat !== 3) {
      return fromDbFlat;
    }

    return undefined;
  } catch {
    return undefined;
  }
}

/**
 * Resolve the operator's backup retention settings with the same precedence
 * `backup.ts` uses for manual/API/auto backups:
 * 1. env override (ops)
 * 2. persisted Storage-page setting (`dbBackup.maxFiles`)
 * 3. persisted Database-page setting (`databaseSettings.backup.keepLastNBackups`) (#15550)
 * 4. default `MAX_DB_BACKUPS`
 */
export function resolveDbBackupRetention(
  db: Pick<SqliteAdapter, "prepare">,
  env: NodeJS.ProcessEnv = process.env
): { maxFiles: number; retentionDays: number } {
  const maxFiles =
    (env.DB_BACKUP_MAX_FILES
      ? parsePositiveInt(env.DB_BACKUP_MAX_FILES, MAX_DB_BACKUPS)
      : undefined) ??
    getStoredInteger(db, DB_BACKUP_MAX_FILES_KEY, 1) ??
    getDatabaseSettingsKeepLastNBackups(db) ??
    MAX_DB_BACKUPS;

  return {
    maxFiles,
    retentionDays: env.DB_BACKUP_RETENTION_DAYS
      ? parseNonNegativeInt(env.DB_BACKUP_RETENTION_DAYS, DEFAULT_DB_BACKUP_RETENTION_DAYS)
      : (getStoredInteger(db, DB_BACKUP_RETENTION_DAYS_KEY, 0) ?? DEFAULT_DB_BACKUP_RETENTION_DAYS),
  };
}

/**
 * A backup family is a `.sqlite` primary plus its SQLite sidecars, or a
 * `.sqlite.zst` archive plus `.preservation-YYYYMMDD.json` receipts. Archives
 * participate in count/age retention without being mistaken for orphaned sidecars.
 * Unknown formats are not retention authority; detached receipts are preserved.
 */
export function getBackupFamilyBase(filename: string) {
  const receipt = filename.match(/^(.+\.sqlite\.zst)\.preservation-\d{8}\.json$/);
  if (receipt) return receipt[1];
  if (filename.endsWith("-wal") || filename.endsWith("-shm")) return filename.slice(0, -4);
  if (filename.endsWith("-journal")) return filename.slice(0, -8);
  return filename;
}

export type BackupFamily = {
  base: string;
  hasPrimary: boolean;
  primaryMtimeMs: number;
  latestMtimeMs: number;
  files: string[];
  directory?: string;
};

function collectPortableFamily(backupDir: string, name: string): BackupFamily | null {
  const base = portableSnapshotId(name);
  if (!base) return null;
  try {
    const file = portableSnapshotFile(path.join(backupDir, name));
    const stat = fs.statSync(file);
    return {
      base,
      hasPrimary: true,
      primaryMtimeMs: stat.mtimeMs,
      latestMtimeMs: stat.mtimeMs,
      files: [path.join(name, "snapshot.sqlite")],
      directory: name,
    };
  } catch {
    // Invalid/foreign directories and symlinks are never retention authority.
    return null;
  }
}

function getRegularFileStat(filePath: string): fs.Stats | null {
  try {
    const stat = fs.lstatSync(filePath);
    return stat.isFile() ? stat : null;
  } catch {
    return null;
  }
}

export function collectBackupFamilies(backupDir: string): BackupFamily[] {
  if (!fs.existsSync(backupDir)) return [];

  const families = new Map<string, BackupFamily>();

  for (const name of fs.readdirSync(backupDir)) {
    if (!name.startsWith("db_")) continue;
    if (portableSnapshotId(name)) {
      const family = collectPortableFamily(backupDir, name);
      if (family) families.set(name, family);
      continue;
    }
    // A db_ prefix alone does not authorize deleting an operator-owned file.
    if (
      !/^db_.+\.sqlite(?:-(?:wal|shm|journal)|\.zst(?:\.preservation-\d{8}\.json)?)?$/.test(name)
    ) {
      continue;
    }
    const base = getBackupFamilyBase(name);
    const stat = getRegularFileStat(path.join(backupDir, name));
    if (!stat) continue;

    const family = families.get(base) || {
      base,
      hasPrimary: false,
      primaryMtimeMs: 0,
      latestMtimeMs: 0,
      files: [],
    };

    family.files.push(name);
    family.latestMtimeMs = Math.max(family.latestMtimeMs, stat.mtimeMs);
    if (name === base) {
      family.hasPrimary = true;
      family.primaryMtimeMs = stat.mtimeMs;
    }

    families.set(base, family);
  }

  // Only SQLite sidecars have orphan semantics. A receipt without its archive
  // may be the last preservation evidence, not a disposable sidecar.
  return [...families.values()].filter(
    (family) => family.hasPrimary || family.base.endsWith(".sqlite")
  );
}

const SNAPSHOT_TEMP_PREFIX = ".migration-snapshot-";
const SNAPSHOT_TEMP_FILE = "snapshot.sqlite";
// A killed `VACUUM INTO` can leave this rollback journal next to the temp snapshot.
const SNAPSHOT_TEMP_NAMES = new Set([SNAPSHOT_TEMP_FILE, `${SNAPSHOT_TEMP_FILE}-journal`]);
/** A live snapshot writer touches its temp file or directory far more often than this. */
export const STALE_SNAPSHOT_TEMP_MS = 60 * 60 * 1000;

/**
 * Remove `.migration-snapshot-*` temp directories that a killed upgrade left behind, so the
 * scheduled backup prune (which pauses while one exists) can run again. Only a directory this
 * process user owns, that holds nothing but `snapshot.sqlite` and its `-journal`, and that nothing wrote to for
 * `maxIdleMs`, is removed. Anything else is left alone. The directory name carries no process
 * id, so write recency is the liveness signal. Returns how many directories were removed.
 */
export function removeStaleSnapshotTemps(
  backupDir: string,
  maxIdleMs = STALE_SNAPSHOT_TEMP_MS
): number {
  let entries: string[];
  try {
    entries = fs.readdirSync(backupDir);
  } catch {
    return 0;
  }

  let removed = 0;
  for (const name of entries) {
    if (!name.startsWith(SNAPSHOT_TEMP_PREFIX)) continue;
    try {
      if (!removeStaleSnapshotTemp(path.join(backupDir, name), maxIdleMs)) continue;
      removed++;
      console.warn(`[Cleanup] Removed stale migration snapshot temp directory: ${name}`);
    } catch (err) {
      console.warn(`[Cleanup] Could not remove snapshot temp directory ${name}:`, err);
    }
  }
  return removed;
}

/** Removes one temp directory when it is ours, holds only the snapshot file (and its journal), and is idle. */
function removeStaleSnapshotTemp(dir: string, maxIdleMs: number): boolean {
  const stat = fs.lstatSync(dir);
  if (!stat.isDirectory()) return false;
  if (typeof process.getuid === "function" && stat.uid !== process.getuid()) return false;

  const children = fs.readdirSync(dir);
  if (children.some((child) => !SNAPSHOT_TEMP_NAMES.has(child))) return false;
  let newestMs = stat.mtimeMs;
  for (const child of children) {
    const childStat = fs.lstatSync(path.join(dir, child));
    if (!childStat.isFile()) throw new Error("not a regular file");
    newestMs = Math.max(newestMs, childStat.mtimeMs);
  }
  if (Date.now() - newestMs < maxIdleMs) return false;

  for (const child of children) fs.unlinkSync(path.join(dir, child));
  fs.rmdirSync(dir);
  return true;
}

export type PruneResult = {
  deletedBackupFamilies: number;
  deletedFiles: number;
  keptBackupFamilies: number;
  maxFiles: number;
  retentionDays: number;
};

function syncSleep(ms: number): void {
  if (typeof SharedArrayBuffer !== "undefined" && typeof Atomics !== "undefined") {
    try {
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
      return;
    } catch {
      // Atomics.wait may throw on restricted runtimes — fall through to busy-wait
    }
  }
  const deadline = Date.now() + ms;
  while (Date.now() < deadline) {
    /* busy-wait */
  }
}

/**
 * Synchronous file unlinker with retry backoff for Windows EBUSY / EPERM locks (#15550).
 * Avoids crashing the process or swallowing permanent failures silently while keeping
 * `pruneBackupDirectory()` completely synchronous.
 */
export function unlinkSyncWithRetry(
  filePath: string,
  options?: { maxAttempts?: number; baseDelayMs?: number }
): boolean {
  const maxAttempts = Math.max(1, options?.maxAttempts ?? 5);
  const baseDelayMs = Math.max(0, options?.baseDelayMs ?? 25);

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return true;
    } catch (err: unknown) {
      const code =
        err && typeof err === "object" && "code" in err ? (err as NodeJS.ErrnoException).code : "";
      if (code === "ENOENT") return true;
      if ((code === "EBUSY" || code === "EPERM") && attempt < maxAttempts - 1) {
        syncSleep(baseDelayMs * (attempt + 1));
      } else {
        return false;
      }
    }
  }
  return false;
}

function removeEmptyPortableDirectory(backupDir: string, directory?: string): void {
  if (!directory) return;
  try {
    // Never recursively remove published directories: preserve any foreign content.
    fs.rmdirSync(path.join(backupDir, directory));
  } catch {
    // A concurrent writer or unrelated entry keeps the directory in place.
  }
}

/**
 * Delete backup families beyond `maxFiles` (newest kept), older than `retentionDays`
 * (0 disables the age rule), or orphaned (sidecars whose primary is already gone).
 * Families in `exemptBases` skip the age rule only; `maxFiles` and orphan rules
 * still apply to them.
 */
export function pruneBackupDirectory(options: {
  backupDir: string;
  maxFiles: number;
  retentionDays: number;
  exemptBases?: Set<string>;
}): PruneResult {
  const { backupDir } = options;
  const maxFiles = Math.max(1, options.maxFiles);
  const retentionDays = Math.max(0, options.retentionDays);

  if (!fs.existsSync(backupDir)) {
    return {
      deletedBackupFamilies: 0,
      deletedFiles: 0,
      keptBackupFamilies: 0,
      maxFiles,
      retentionDays,
    };
  }

  const cutoffMs = retentionDays > 0 ? Date.now() - retentionDays * 24 * 60 * 60 * 1000 : 0;
  const families = collectBackupFamilies(backupDir);
  const primaryFamilies = families
    .filter((family) => family.hasPrimary)
    .sort((a, b) => b.primaryMtimeMs - a.primaryMtimeMs);
  const keepPrimaryBases = new Set(primaryFamilies.slice(0, maxFiles).map((family) => family.base));

  let deletedBackupFamilies = 0;
  let deletedFiles = 0;

  for (const family of families) {
    const isOverflowPrimary = family.hasPrimary && !keepPrimaryBases.has(family.base);
    const isExempt = options.exemptBases?.has(family.base) ?? false;
    const isExpired = retentionDays > 0 && !isExempt && family.latestMtimeMs < cutoffMs;
    const isOrphan = !family.hasPrimary;
    if (!isOverflowPrimary && !isExpired && !isOrphan) continue;

    let anyDeletedInFamily = false;
    for (const name of family.files) {
      const deleted = unlinkSyncWithRetry(path.join(backupDir, name));
      if (deleted) {
        deletedFiles += 1;
        anyDeletedInFamily = true;
      }
    }
    if (anyDeletedInFamily) {
      removeEmptyPortableDirectory(backupDir, family.directory);
      deletedBackupFamilies += 1;
    }
  }

  return {
    deletedBackupFamilies,
    deletedFiles,
    keptBackupFamilies: collectBackupFamilies(backupDir).filter((family) => family.hasPrimary)
      .length,
    maxFiles,
    retentionDays,
  };
}
