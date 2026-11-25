import type { SqliteAdapter } from "./adapters/types";

/**
 * Release an exclusive SQLite lock by closing the handle that holds it.
 *
 * The outcome is per handle, not per database. `CLOSED` says this adapter went
 * from open to closed; it does not say the file is free, that a successor may
 * read it, or that another holder in this or another process is gone.
 */
export type StillOpenReason =
  /** The close threw and the handle still reports open: end the cursor, then retry. */
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
 * is still open — the close had already been attempted and the state read is
 * what failed, so the caller must not keep using the handle and must not retry
 * blindly.
 *
 * The state, not the call, decides the outcome: a driver may close and then
 * throw, and an adapter may swallow the driver's refusal. Both paths read the
 * handle afterwards and report what it says.
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

  let failure: string | undefined;
  try {
    adapter.close({ checkpoint: false });
  } catch (error) {
    // The call threw, but a driver may close and then throw. Which of the two
    // happened is decided below by the state, not by the fact that it threw.
    failure = messageOf(error);
  }

  let open: unknown;
  try {
    open = adapter.open;
  } catch {
    // Nothing was observed about the handle, on either path. That is not
    // evidence that it is open, so the caller must not treat it as retryable.
    return failure === undefined
      ? { kind: "REFUSED_STILL_OPEN", reason: "OPEN_WITNESS_UNREADABLE" }
      : { kind: "REFUSED_STILL_OPEN", reason: "OPEN_WITNESS_UNREADABLE", message: failure };
  }
  if (open === false) {
    // The close took effect. A throw afterwards does not undo it.
    return { kind: "CLOSED" };
  }
  if (open === true) {
    return failure === undefined
      ? { kind: "REFUSED_STILL_OPEN", reason: "OPEN_STILL_TRUE" }
      : { kind: "REFUSED_STILL_OPEN", reason: "CLOSE_THREW", message: failure };
  }
  // A non-boolean witness is unreadable, not closed: only `false` shows the
  // close happened.
  return failure === undefined
    ? { kind: "REFUSED_STILL_OPEN", reason: "OPEN_WITNESS_UNREADABLE" }
    : { kind: "REFUSED_STILL_OPEN", reason: "OPEN_WITNESS_UNREADABLE", message: failure };
}
