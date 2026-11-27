// Release an EXCLUSIVE SQLite lock by closing the handle that holds it.
//
// Closing is the release path SQLite documents. Setting `locking_mode` back to
// NORMAL also releases, but only on the next access, and only if that access
// happens -- so it cannot be a release primitive. This helper closes, then
// reads the handle back to confirm the close was observed.
//
// Scope: adapters the caller created and owns, that will not be handed out
// again. It does not touch the cached process-wide handle; see
// closeDbInstance() in core.ts for that path, which also stops the
// health-check scheduler, checkpoints, clears the cache and resets module
// state. Closing the cached handle from here would leave the cache pointing at
// a dead adapter.
//
// The transaction check is a point-in-time snapshot: it reads the state, then
// closes. Nothing here can stop another caller sharing the same adapter from
// opening a transaction in between -- that is what "the caller owns this
// handle" means, and it is a precondition, not something this function can
// enforce.

import { interpretOpenFlag } from "./adapters/openFlagWitness";
import type { OpenWitness, SqliteAdapter } from "./adapters/types";

/**
 * Why a release was refused while the handle may still be open.
 *
 * `CLOSE_THREW` and `OPEN_STILL_TRUE` both mean the handle was observed to be
 * open, and differ in which operation showed it. `OPEN_WITNESS_UNREADABLE`
 * means the state read itself failed, whether close() returned or threw, so
 * nothing was learned about the handle and the close may have succeeded.
 */
export type StillOpenRefusal = {
  kind: "REFUSED_STILL_OPEN";
  reason: "CLOSE_THREW" | "OPEN_STILL_TRUE" | "OPEN_WITNESS_UNREADABLE";
  message?: string;
};

export type ExclusiveLockRelease =
  // This handle is closed. It does not say the database is free, and it does
  // not authorise a successor to assume the file is readable: another handle
  // in this or another process may hold it.
  | { kind: "CLOSED" }
  | { kind: "REFUSED_OPEN_TRANSACTION" }
  | { kind: "REFUSED_UNKNOWN_TRANSACTION" }
  | StillOpenRefusal;

/**
 * Turn a thrown value into text without letting the conversion throw.
 *
 * `String()` calls the value's `toString`, and a thrown object can have one
 * that throws in turn -- a revocable proxy, a getter that raises. The whole
 * point of this code is to return a refusal instead of crashing, so the
 * conversion is guarded too.
 */
function describeThrown(value: unknown): string {
  try {
    if (value instanceof Error) {
      // The message is read inside the guard: an Error-like object can expose
      // it as a getter that throws, which is the same hazard as a hostile
      // toString. It is also not guaranteed to be a string.
      const message: unknown = value.message;
      return typeof message === "string" ? message : "";
    }
    if (typeof value === "string") return value;
    if (value === undefined) return "";
    return String(value);
  } catch {
    return "";
  }
}

type OpenRead = { state: OpenWitness; message?: string };

// One vocabulary for the three answers, so a reader that adds a fourth state
// has a single place to change rather than a union repeated at every check.
function isOpenWitness(value: unknown): value is OpenWitness {
  return value === "open" || value === "closed" || value === "unreadable";
}

// One shape for every refusal the witness read can produce, so the reason text
// is the only thing a caller has to look at.
function unreadable(message: string): OpenRead {
  return { state: "unreadable", message };
}

function describeFailure(prefix: string, error: unknown): string {
  const text = describeThrown(error);
  return text.length > 0 ? `${prefix}: ${text}` : `${prefix} a value with no message`;
}

function readTriState(
  adapter: SqliteAdapter,
  reader: NonNullable<SqliteAdapter["readOpenWitness"]>
): OpenRead {
  try {
    const state: unknown = reader.call(adapter);
    if (isOpenWitness(state)) {
      return { state };
    }
    return unreadable(
      `the open witness returned ${typeof state}, not one of open, closed or unreadable`
    );
  } catch (error) {
    return unreadable(describeFailure("the open witness threw", error));
  }
}

// Fallback for an adapter without the tri-state read: `open` is the answer there,
// and a value that is not a boolean is unreadable rather than closed.
function readBooleanOpen(adapter: SqliteAdapter): OpenRead {
  try {
    const open: unknown = adapter.open;
    const answer = interpretOpenFlag(open);
    if (!answer.understood) {
      return unreadable(`the open witness returned ${typeof open}, not a boolean`);
    }
    return { state: answer.state };
  } catch (error) {
    return unreadable(describeFailure("the open witness threw", error));
  }
}

/**
 * Read the adapter's open state without letting a failed read escape.
 *
 * The tri-state reader is preferred because `open` is a boolean by contract and
 * cannot report that the read failed. Adapters that predate it fall back to the
 * boolean with the same try/catch this helper used to do inline.
 */
function readOpenWitness(adapter: SqliteAdapter): OpenRead {
  // Obtaining the reader is itself a read of the adapter: an accessor that
  // throws on lookup would escape before the call it guards, and the helper
  // promises no read exception leaves it.
  let reader: SqliteAdapter["readOpenWitness"];
  try {
    reader = adapter.readOpenWitness;
  } catch (error) {
    return unreadable(describeFailure("the open witness lookup threw", error));
  }
  if (typeof reader === "function") return readTriState(adapter, reader);
  return readBooleanOpen(adapter);
}

/**
 * Close `adapter` and report whether the close was observed.
 *
 * The transaction state is read before closing because a close over an open
 * transaction rolls it back silently. A driver that does not expose the state
 * is refused rather than guessed at: `undefined` means the adapter cannot tell
 * us, and closing on a guess is the rollback this function exists to avoid.
 *
 * The refusal carries a `reason` because the three cases call for different
 * handling, and the type should say so rather than leaving it to prose:
 *
 * - `CLOSE_THREW`: the close threw and the handle still reports itself open (a
 *   live cursor is the measured case). End the cursor and retry. A close that
 *   throws after the driver already let go comes back as `CLOSED` instead: the
 *   witness has the last word, so a partial close does not send the caller into
 *   a retry loop for a release that already happened.
 * - `OPEN_STILL_TRUE`: `close()` returned but the handle reports itself open.
 *   Retrying changes nothing while whatever holds the handle still holds it;
 *   whether a retry can succeed afterwards depends on the adapter (the
 *   node:sqlite one re-attempts `db.close()`, so a transient failure clears).
 *   A retry on such an adapter may instead come back as
 *   `REFUSED_UNKNOWN_TRANSACTION` if the transaction read itself fails on the
 *   half-closed handle -- the two are not distinguishable from here, and both
 *   mean "do not release it yourself".
 * - `OPEN_WITNESS_UNREADABLE`: the open witness threw, or answered
 *   "unreadable". The handle's state is unknown and the close may have
 *   succeeded; do not keep using it and do not retry blindly. A throwing
 *   transaction-state read is a different case: that is
 *   `REFUSED_UNKNOWN_TRANSACTION`, decided before anything is closed.
 *
 * No pragma is set: with a live cursor the pragma would be the statement that
 * throws, so an implementation that sets one never reaches `close()` and would
 * report a refusal for the wrong reason.
 */
export function releaseExclusiveLock(adapter: SqliteAdapter): ExclusiveLockRelease {
  let inTransaction: boolean | undefined;
  try {
    inTransaction = adapter.inTransaction;
  } catch {
    return { kind: "REFUSED_UNKNOWN_TRANSACTION" };
  }

  if (inTransaction === true) {
    return { kind: "REFUSED_OPEN_TRANSACTION" };
  }
  if (inTransaction !== false) {
    // `undefined` here means the adapter has no getter, or its getter could not
    // read the driver. better-sqlite3, node:sqlite and bun:sqlite all expose
    // one; sql.js does not, so a sql.js handle cannot be released through this
    // helper.
    //
    // The two cases are not distinguishable from here: an adapter that
    // swallowed its driver error and one that has no getter both arrive as
    // `undefined`. A retry after a failed close on such an adapter therefore
    // reads as unknown rather than as "still open", which is the less specific
    // answer -- the first call already reported `OPEN_STILL_TRUE`, and both
    // answers tell the caller not to release the handle.
    return { kind: "REFUSED_UNKNOWN_TRANSACTION" };
  }

  try {
    adapter.close({ checkpoint: false });
  } catch (error) {
    // A non-standard Error can carry an undefined message (an Error subclass
    // that deletes it, or Object.create(Error.prototype)), so read it through
    // a nullish fallback: `text.length` on undefined would throw out of this
    // catch block and the function would crash instead of refusing.
    const text = describeThrown(error);
    const message = text.length > 0 ? text : "close() threw a value with no message";

    // A close can throw after the driver already let go -- a partial close.
    // Reporting CLOSE_THREW for a handle that is already closed would send the
    // caller into a retry loop for a release that already happened, so the
    // witness gets the last word even on this path.
    const witness = readOpenWitness(adapter);

    if (witness.state === "closed") {
      return { kind: "CLOSED" };
    }
    if (witness.state === "open") {
      return { kind: "REFUSED_STILL_OPEN", reason: "CLOSE_THREW", message };
    }
    // The close threw and the witness could not answer: nothing was observed
    // about the handle, so this belongs to the unreadable branch. Reporting
    // CLOSE_THREW here would claim an observation that never happened. Both
    // failures go into the message: the witness text alone tells the caller
    // nothing about why the close failed.
    return {
      kind: "REFUSED_STILL_OPEN",
      reason: "OPEN_WITNESS_UNREADABLE",
      message: `${message}; ${witness.message ?? "the open witness could not be read"}`,
    };
  }

  const witness = readOpenWitness(adapter);

  if (witness.state === "closed") {
    return { kind: "CLOSED" };
  }
  if (witness.state === "open") {
    // The close returned but the handle says it is still open. This is an
    // observation about the handle, not a failed witness. The message states
    // the observation; an adapter that swallowed its driver error (the
    // node:sqlite one does) cannot contribute the driver's own text.
    return {
      kind: "REFUSED_STILL_OPEN",
      reason: "OPEN_STILL_TRUE",
      message: "close() returned but the handle still reports itself open",
    };
  }
  // An unreadable witness is not evidence that the close happened. "open"
  // would be an observation, and nothing was observed.
  return {
    kind: "REFUSED_STILL_OPEN",
    reason: "OPEN_WITNESS_UNREADABLE",
    message: witness.message ?? "the open witness could not be read",
  };
}
