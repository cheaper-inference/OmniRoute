/**
 * Owner-only permissions for the SQLite credential store and its backups.
 *
 * The DB holds provider OAuth tokens and API keys, so the file (and every copy of it) should
 * not inherit the process umask (typically 0644). The default DATA_DIR is already 0700
 * (bin/cli/privateDataDir.mjs), so this is defense in depth for the layouts that skip the CLI
 * bootstrap (Electron, Docker, embedded starts) and for pre-hardening installs.
 *
 * Everything here is best-effort: a bind-mounted DATA_DIR owned by another uid must never
 * stop the app from starting. chmod does not map to POSIX bits on Windows, so it is skipped.
 */

import fs from "fs";

export const DB_SECRET_DIR_MODE = 0o700;
export const DB_SECRET_FILE_MODE = 0o600;

/** chmod is ACL-based on Windows: only the read-only bit maps through. */
export const POSIX_FILE_MODES_SUPPORTED = process.platform !== "win32";

/** chmod `target` to `mode`; returns false (never throws) when it could not be applied. */
export function chmodQuiet(target: string, mode: number): boolean {
  if (!POSIX_FILE_MODES_SUPPORTED) return false;
  try {
    fs.chmodSync(target, mode);
    return true;
  } catch {
    return false;
  }
}

/**
 * Tighten `sqliteFile` and its `-wal`/`-shm` sidecars to 0600. Idempotent, so it also repairs
 * a world-readable DB left by an older install. SQLite creates later sidecars with the main
 * file's mode, so keeping the main file at 0600 keeps future -wal/-shm files owner-only too.
 */
export function hardenDbFilePermissions(sqliteFile: string | null | undefined): void {
  if (!sqliteFile || sqliteFile === ":memory:") return;
  for (const suffix of ["", "-wal", "-shm"]) {
    chmodQuiet(`${sqliteFile}${suffix}`, DB_SECRET_FILE_MODE);
  }
}
