import type { SqliteAdapter } from "./adapters/types";

/**
 * Release an exclusive SQLite lock by closing the handle that holds it.
 *
 * The outcome is per handle, not per database. `CLOSED` says this adapter went
 * from open to closed; it does not say the file is free, that a successor may
 * read it, or that another holder in this or another process is gone.
 */
export type StillOpenReason =
  /** The handle was still open when the throw was raised: end the cursor, then retry. */
  | "CLOSE_THREW"
  /** The close returned and the handle still reports itself open: retrying changes nothing. */
  | "OPEN_STILL_TRUE"
  /** The state read failed after the close returned: nothing was observed about the handle. */
  | "OPEN_WITNESS_UNREADABLE";

export type ExclusiveLockRelease =
  | { kind: "CLOSED" }
  | { kind: "REFUSED_OPEN_TRANSACTION" }
  | { kind: "REFUSED_UNKNOWN_TRANSACTION" }
  | { kind: "REFUSED_STILL_OPEN"; reason: StillOpenReason; message?: string };

function messageOf(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/**
 * Close `adapter` unless it is mid-transaction or its state cannot be read.
 *
 * Never throws and never sets a pragma: with a live cursor the pragma is the
 * statement that throws, so an implementation that set one would never reach
 * `close()` and would report a refusal for the wrong reason.
 *
 * `REFUSED_STILL_OPEN` covers three different observations and the `reason`
 * says which. `OPEN_WITNESS_UNREADABLE` in particular does not mean the handle
 * is still open — the close had already returned and the state read is what
 * failed, so the caller must not keep using the handle and must not retry
 * blindly.
 */
export function releaseExclusiveLock(adapter: SqliteAdapter): ExclusiveLockRelease {
  let inTransaction: boolean | undefined;
  try {
    inTransaction = adapter.inTransaction;
  } catch {
    // Reading the transaction state failed, so closing could discard work
    // silently. Nothing was observed about the transaction; refuse.
    return { kind: "REFUSED_UNKNOWN_TRANSACTION" };
  }
  if (inTransaction === true) {
    // Closing here would discard the open transaction without a rollback the
    // caller can see.
    return { kind: "REFUSED_OPEN_TRANSACTION" };
  }
  if (inTransaction !== false) {
    return { kind: "REFUSED_UNKNOWN_TRANSACTION" };
  }

  try {
    adapter.close();
  } catch (error) {
    // The driver refused to close, which is the live-cursor case: the handle
    // is still open and ending the cursor is what unblocks it.
    return {
      kind: "REFUSED_STILL_OPEN",
      reason: "CLOSE_THREW",
      message: messageOf(error),
    };
  }

  let open: unknown;
  try {
    open = adapter.open;
  } catch {
    // The close returned; this read failed. That is not evidence that the
    // handle is open, so the caller must not treat it as retryable.
    return { kind: "REFUSED_STILL_OPEN", reason: "OPEN_WITNESS_UNREADABLE" };
  }
  if (open === false) {
    return { kind: "CLOSED" };
  }
  if (open === true) {
    return { kind: "REFUSED_STILL_OPEN", reason: "OPEN_STILL_TRUE" };
  }
  // A non-boolean witness is unreadable, not closed: only `false` shows the
  // close happened.
  return { kind: "REFUSED_STILL_OPEN", reason: "OPEN_WITNESS_UNREADABLE" };
}
