/**
 * Probe-retry utilities for the SQLite corruption-probe path in getDbInstance().
 *
 * Transient probe errors (SQLITE_BUSY, ENOENT, SQLITE_PROTOCOL, SQLITE_IOERR)
 * should be retried with backoff instead of immediately renaming the DB away
 * and creating an empty one (data loss under concurrent load, #9541).
 */
import fs from "node:fs";
import path from "node:path";

/**
 * Identifies transient SQLite/OS probe errors that should be retried instead of
 * triggering the corruption-rename path.
 *
 * Transient errors are conditions that can self-resolve within milliseconds:
 *   - SQLITE_BUSY: database is locked by another connection
 *   - SQLITE_PROTOCOL: locking protocol violation
 *   - SQLITE_IOERR: disk I/O error (can be transient under load)
 *   - ENOENT: file disappeared (race with another process/worker deleting it)
 *
 * Fatal errors (native load failures, OOM, module-not-found) are NOT transient.
 */
export function isTransientProbeError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  // #12423 widened the message side: SQLite also reports "database table is
  // locked", "database schema is locked" and "database is busy" for the same
  // transient contention that "database is locked" covers.
  if (
    /SQLITE_BUSY|SQLITE_PROTOCOL|SQLITE_IOERR|ENOENT|database(?: table| schema)? is (?:locked|busy)/i.test(
      message
    )
  ) {
    return true;
  }
  // The real drivers do not put the result-code name in the message: both
  // report plain "database is locked" for SQLITE_BUSY. better-sqlite3 carries
  // the name in `code`, node:sqlite the numeric primary code in `errcode`
  // (5 BUSY, 10 IOERR, 15 PROTOCOL; extended codes live in the high bits).
  // Without this, a transient lock during the probe was classified as
  // corruption and the database was renamed away.
  if (typeof error !== "object" || error === null) return false;
  const { code, errcode } = error as { code?: unknown; errcode?: unknown };
  if (typeof code === "string" && /^SQLITE_(BUSY|PROTOCOL|IOERR)/.test(code)) return true;
  return typeof errcode === "number" && [5, 10, 15].includes(errcode & 0xff);
}

export type ProbeFailureKind = "readonly" | "transient" | "corrupt-or-unknown";

/**
 * Classifies a probe error. SQLITE_READONLY ("attempt to write a readonly
 * database", e.g. a WAL `-shm` that cannot be written under a readonly
 * connection) is an environment problem, not corruption (#17995).
 */
export function classifyProbeFailure(error: unknown): ProbeFailureKind {
  const message = error instanceof Error ? error.message : String(error);
  let readonly = /attempt to write a readonly database|SQLITE_READONLY/i.test(message);
  if (!readonly && typeof error === "object" && error !== null) {
    const { code, errcode } = error as { code?: unknown; errcode?: unknown };
    readonly =
      (typeof code === "string" && /^SQLITE_READONLY/.test(code)) ||
      (typeof errcode === "number" && (errcode & 0xff) === 8);
  }
  if (readonly) return "readonly";
  return isTransientProbeError(error) ? "transient" : "corrupt-or-unknown";
}

export type ProbeRetryResult = "recovered" | "transient_exhausted" | "readonly" | "not_transient";

/**
 * Synchronous sleep that blocks the event loop for `ms` milliseconds.
 * Only used in the transient-probe-error retry path where we are already in
 * a synchronous context (better-sqlite3). Uses `Atomics.wait` which yields to
 * the OS scheduler during the wait, falling back to a busy-wait on runtimes
 * where Atomics.wait is restricted.
 */
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
 * Type for openSqliteDatabase callback — avoids importing the full SQLite adapter type.
 */
type OpenDbFn = (
  filePath: string,
  options?: Record<string, unknown>
) => {
  driver: string;
  open: boolean;
  close(): void;
};

/**
 * Retries opening a SQLite database probe when the initial attempt fails with
 * a transient error. Uses exponential backoff (500ms, 1000ms, 2000ms).
 *
 * @param sqliteFile - Path to the SQLite database file
 * @param openDb - Function to open the database (normally openSqliteDatabase)
 * @param closeDb - Function to safely close the probe adapter
 * @returns "recovered" if a retry succeeded, "transient_exhausted" if all retries
 *          failed (NOT proof of corruption), "readonly" for SQLITE_READONLY (not
 *          retried, not corruption), "not_transient" for genuine/unknown errors.
 */
export function retryProbeIfTransient(
  sqliteFile: string,
  probeError: unknown,
  openDb: OpenDbFn,
  closeDb: (adapter: { driver: string; open: boolean; close(): void } | null | undefined) => void
): ProbeRetryResult {
  const kind = classifyProbeFailure(probeError);
  if (kind === "readonly") return "readonly";
  if (kind !== "transient") return "not_transient";

  const retryDelays = [500, 1000, 2000];
  for (let i = 0; i < retryDelays.length; i++) {
    syncSleep(retryDelays[i]);
    try {
      const retryAdapter = openDb(sqliteFile, { readonly: true });
      closeDb(retryAdapter);
      return "recovered";
    } catch {
      // Retry failed, try next delay
    }
  }

  console.warn(
    `[DB] All ${retryDelays.length} transient probe retries exhausted — NOT declaring corruption`
  );
  return "transient_exhausted";
}
