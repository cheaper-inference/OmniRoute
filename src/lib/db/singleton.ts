import type { SqliteAdapter } from "./adapters/types";

declare global {
  var __omnirouteDb: SqliteAdapter | undefined;
  var __omnirouteDbSwapInProgress: boolean | undefined;
}

/** Read the process-wide DB handle without initializing storage. */
export function getExistingDbInstance(): SqliteAdapter | null {
  return globalThis.__omnirouteDb ?? null;
}

/** Replace the process-wide DB handle while preserving it across Next.js HMR. */
export function setDbInstance(db: SqliteAdapter | null): void {
  if (db) {
    globalThis.__omnirouteDb = db;
  } else {
    delete globalThis.__omnirouteDb;
  }
}

/**
 * True while a restore swaps the database files. Opening a database then would reopen the file
 * about to be deleted and hand the restore a stale handle, so `getDbInstance()` refuses.
 */
export function isDbSwapInProgress(): boolean {
  return globalThis.__omnirouteDbSwapInProgress === true;
}

export function setDbSwapInProgress(active: boolean): void {
  if (active) globalThis.__omnirouteDbSwapInProgress = true;
  else delete globalThis.__omnirouteDbSwapInProgress;
}
