// Arms A to K: the release outcomes for one caller-owned handle, driven through
// better-sqlite3 and the sql.js and node:sqlite adapters.

import assert from "node:assert/strict";
import fs from "node:fs";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";
import Database from "better-sqlite3";
import { createBetterSqliteAdapter } from "../../../src/lib/db/adapters/betterSqliteAdapter";
import { createBunSqliteAdapter } from "../../../src/lib/db/adapters/bunSqliteAdapter";
import type { BunSqliteDatabaseLike } from "../../../src/lib/db/adapters/bunSqliteAdapter";
import { createNodeSqliteAdapterFromDatabase } from "../../../src/lib/db/adapters/nodeSqliteShared";
import type { NodeSqliteDatabaseLike } from "../../../src/lib/db/adapters/nodeSqliteShared";
import { createSqlJsAdapter } from "../../../src/lib/db/adapters/sqljsAdapter";
import type { SqliteAdapter } from "../../../src/lib/db/adapters/types";
import {
  releaseExclusiveLock,
  type ExclusiveLockRelease,
} from "../../../src/lib/db/exclusiveLockRelease";
import {
  tempDir,
  makeDb,
  openExclusiveHolder,
  closeQuietly,
  readInChild,
} from "./exclusive-lock-fixtures";

// Arm A. Anchor, not acceptance: it passes with no implementation at all.
// What it establishes is that the fixture's holder really blocks the next
// reader, so a later arm that reads successfully is evidence the release
// happened rather than evidence the fixture never held the lock.
test("Arm A: an EXCLUSIVE holder blocks the next reader for the full timeout", () => {
  const dir = tempDir("a");
  const file = makeDb(dir);
  const holder = openExclusiveHolder(file);
  const reader = new Database(file, { timeout: 2000 });
  const started = Date.now();
  try {
    assert.throws(
      () => reader.prepare("SELECT v FROM t").all(),
      (error: unknown) => {
        const message = error instanceof Error ? error.message : String(error);
        return /locked|SQLITE_BUSY/i.test(message);
      }
    );
    const elapsed = Date.now() - started;
    // A lower bound with slack on purpose: the point is that the busy handler
    // ran and the reader waited most of the 2000 ms budget, not that the wall
    // clock is precise. A tight bound here fails on a loaded CI runner for
    // reasons unrelated to lock handling.
    assert.ok(elapsed >= 1500, `expected the reader to wait out the timeout, got ${elapsed} ms`);
    // A runaway bound: a timer bug that retries far past the 2000 ms budget
    // would still satisfy the lower bound above, so pin the other side loosely.
    assert.ok(elapsed < 10000, `a 2000 ms busy timeout should not run away: ${elapsed} ms`);
  } finally {
    reader.close();
    holder.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// The contrast half of Arm A, and nothing wider: in this arm the holder sets
// the mode after its setup and then touches nothing, and the next reader goes
// straight in. The blocking arms rest on the write the fixture performs after
// the mode, not on the mode alone. This comment is not a claim about read
// shapes in general.
test("Arm A contrast: a holder that never accessed after EXCLUSIVE does not block the reader", () => {
  const dir = tempDir("a-clean");
  const file = makeDb(dir);
  const holder = new Database(file);
  holder.pragma("journal_mode = WAL");
  holder.exec("CREATE TABLE t(v INTEGER)");
  holder.exec("INSERT INTO t VALUES (1)");
  // Set the mode last and then touch nothing at all. In this arm that is
  // enough for the next reader to be let in; the blocking arms depend on the
  // write the fixture performs after the mode.
  holder.pragma("locking_mode = EXCLUSIVE");
  assert.equal(holder.pragma("locking_mode", { simple: true }), "exclusive");

  const reader = new Database(file, { timeout: 2000 });
  try {
    // Reading the row is the assertion: it cannot happen while the holder
    // holds EXCLUSIVE. A wall-clock bound on top of that would only add
    // sensitivity to a loaded runner, which is what the contrast arm is
    // least able to afford.
    assert.deepEqual(reader.prepare("SELECT v FROM t").all(), [{ v: 1 }]);
  } finally {
    reader.close();
    holder.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// The middle shape of this fixture, and the one an earlier round got wrong:
// the mode is set and then a single read runs under it, on a connection that
// was already used for the setup. In this arm the next reader is still
// allowed. Pinned so a later change cannot quietly restore the opposite belief
// about this arm; it does not speak to read shapes in general.
test("Arm A contrast: a holder that only read after EXCLUSIVE does not block the reader", () => {
  const dir = tempDir("a-readonly");
  const file = makeDb(dir);
  const holder = new Database(file);
  holder.pragma("journal_mode = WAL");
  holder.exec("CREATE TABLE t(v INTEGER)");
  holder.exec("INSERT INTO t VALUES (1)");
  holder.pragma("locking_mode = EXCLUSIVE");
  assert.equal(holder.pragma("locking_mode", { simple: true }), "exclusive");
  holder.prepare("SELECT v FROM t").all();

  const reader = new Database(file, { timeout: 2000 });
  try {
    assert.deepEqual(reader.prepare("SELECT v FROM t").all(), [{ v: 1 }]);
  } finally {
    reader.close();
    holder.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// The other half of the same contrast: a holder that never takes EXCLUSIVE at
// all. Acceptance A names this shape, and retiring the older arm set dropped it.
test("Arm A control: a holder that never took EXCLUSIVE does not block a writer", () => {
  const dir = tempDir("a-noexcl");
  const file = makeDb(dir);
  const holder = new Database(file);
  holder.pragma("journal_mode = WAL");
  holder.exec("CREATE TABLE t(v INTEGER)");
  holder.exec("INSERT INTO t VALUES (1)");

  const writer = new Database(file, { timeout: 2000 });
  try {
    writer.exec("INSERT INTO t VALUES (2)");
    assert.deepEqual(writer.prepare("SELECT count(*) AS n FROM t").get(), { n: 2 });
  } finally {
    writer.close();
    holder.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// Arm B. Three assertions, all required: the kind, the handle state, and a
// database-level read. The read is isolated on purpose -- no other connection
// is opened between the release and the read, because a sibling taking
// EXCLUSIVE in that window refuses the read for reasons unrelated to the
// helper (measured 5 of 5 at timeout: 0).
test("Arm B: CLOSED, open false, and the committed row is readable", async () => {
  const dir = tempDir("b");
  const file = makeDb(dir);
  const holder = openExclusiveHolder(file);
  const adapter = createBetterSqliteAdapter(holder);
  try {
    const result = releaseExclusiveLock(adapter);
    assert.deepEqual(result, { kind: "CLOSED" });
    assert.equal(adapter.open, false);

    const reader = new Database(file, { timeout: 2000 });
    try {
      assert.deepEqual(reader.prepare("SELECT v FROM t").all(), [{ v: 1 }]);
    } finally {
      reader.close();
    }

    const child = await readInChild(file);
    assert.equal(child.code, 0, `child read failed: ${child.stderr}`);
    // The child prints one JSON line; anything before it (loader notices,
    // deprecation warnings) would break a parse of the whole buffer.
    const lastLine = child.stdout.trim().split("\n").filter(Boolean).pop() ?? "";
    assert.deepEqual(JSON.parse(lastLine), { v: 1 });
  } finally {
    closeQuietly(adapter);
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// Arm C. A close over an open transaction rolls it back silently, so the
// helper must refuse before closing. The transaction is held with raw
// exec("BEGIN IMMEDIATE") because better-sqlite3's transaction() helper
// commits on return.
test("Arm C: an open transaction is refused and its write survives", () => {
  const dir = tempDir("c");
  const file = makeDb(dir);
  const holder = openExclusiveHolder(file);
  const adapter = createBetterSqliteAdapter(holder);
  try {
    holder.exec("BEGIN IMMEDIATE");
    holder.exec("INSERT INTO t VALUES (2)");

    const result = releaseExclusiveLock(adapter);
    assert.equal(result.kind, "REFUSED_OPEN_TRANSACTION");
    assert.equal(adapter.open, true);
    assert.equal(adapter.inTransaction, true);

    holder.exec("COMMIT");
    assert.deepEqual(holder.prepare("SELECT count(*) AS c FROM t").get(), { c: 2 });
  } finally {
    closeQuietly(adapter);
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// Arm D. The close lies: it returns without closing. Only the open read
// catches this, which is why the helper reads it back.
test("Arm D: a close that returns without closing is REFUSED_STILL_OPEN", () => {
  const dir = tempDir("d");
  const file = makeDb(dir);
  const holder = openExclusiveHolder(file);
  const adapter = createBetterSqliteAdapter(holder);
  try {
    let calls = 0;
    Object.defineProperty(adapter, "close", {
      value: () => {
        calls += 1;
      },
      configurable: true,
    });

    const result: ExclusiveLockRelease = releaseExclusiveLock(adapter);
    assert.equal(result.kind, "REFUSED_STILL_OPEN");
    assert.equal(calls, 1);
    assert.equal(adapter.open, true);
    if (result.kind === "REFUSED_STILL_OPEN") {
      // The close returned and the handle still says it is open, so the reason
      // is an observation about the handle, not a failed witness. The message
      // states that observation rather than a driver error.
      assert.equal(result.reason, "OPEN_STILL_TRUE");
      assert.ok(
        typeof result.message === "string" && result.message.length > 0,
        "an OPEN_STILL_TRUE refusal must still say what was observed"
      );
    }
  } finally {
    holder.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// Arm E(a). An adapter that does not expose transaction state. Closing on a
// guess is exactly the silent rollback the helper exists to avoid, so the
// answer is "unknown", never a close.
test("Arm E(a): a non-boolean transaction state is REFUSED_UNKNOWN_TRANSACTION", () => {
  for (const value of [null, 0]) {
    const dir = tempDir("ea-nonboolean");
    const file = makeDb(dir);
    const holder = openExclusiveHolder(file);
    const real = createBetterSqliteAdapter(holder);
    let closeCalls = 0;
    const stub = Object.create(real) as SqliteAdapter;
    Object.defineProperty(stub, "inTransaction", { value, configurable: true });
    Object.defineProperty(stub, "close", {
      value: () => {
        closeCalls += 1;
      },
      configurable: true,
    });

    try {
      const result = releaseExclusiveLock(stub);
      assert.equal(result.kind, "REFUSED_UNKNOWN_TRANSACTION");
      assert.equal(closeCalls, 0, `a ${String(value)} transaction state must not be closed`);
      assert.equal(real.open, true);
    } finally {
      holder.close();
      fs.rmSync(dir, { recursive: true, force: true });
    }
  }
});

test("Arm E(a): an adapter without inTransaction is REFUSED_UNKNOWN_TRANSACTION", () => {
  const dir = tempDir("ea");
  const file = makeDb(dir);
  const holder = openExclusiveHolder(file);
  const real = createBetterSqliteAdapter(holder);
  let closeCalls = 0;
  const stub = Object.create(real) as SqliteAdapter;
  Object.defineProperty(stub, "close", {
    value: () => {
      closeCalls += 1;
    },
    configurable: true,
  });
  // Shadow the inherited getter with undefined so the member reads as absent.
  Object.defineProperty(stub, "inTransaction", { value: undefined, configurable: true });

  try {
    const result = releaseExclusiveLock(stub);
    assert.equal(result.kind, "REFUSED_UNKNOWN_TRANSACTION");
    assert.equal(closeCalls, 0);
    assert.equal(real.open, true);
  } finally {
    holder.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// Arm E(b). The real sql.js adapter has no transaction-state API at all.
test("Arm E(b): the sql.js adapter is REFUSED_UNKNOWN_TRANSACTION", async () => {
  const dir = tempDir("eb");
  const file = makeDb(dir, "x.sqlite");
  const adapter = await createSqlJsAdapter(file);
  try {
    assert.equal(adapter.inTransaction, undefined);
    let closeCalls = 0;
    const originalClose = adapter.close.bind(adapter);
    Object.defineProperty(adapter, "close", {
      value: () => {
        closeCalls += 1;
        originalClose();
      },
      configurable: true,
    });

    const result = releaseExclusiveLock(adapter);
    assert.equal(result.kind, "REFUSED_UNKNOWN_TRANSACTION");
    assert.equal(closeCalls, 0);
    assert.equal(adapter.open, true);
  } finally {
    closeQuietly(adapter);
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// Arm F. The getter added to the node:sqlite adapter must forward the driver's
// own flag, and must answer after close instead of throwing (DatabaseSync
// throws ERR_INVALID_STATE once closed).
//
// Two halves, because the value alone cannot tell a guard from a try: a bare
// try around the driver read also returns false after close, and would keep
// calling into a closed handle. The second half counts the reads.
test("Arm F: the node:sqlite getter forwards state and survives close", () => {
  const db = new DatabaseSync(":memory:");
  const adapter = createNodeSqliteAdapterFromDatabase(db, ":memory:");
  try {
    assert.equal(adapter.inTransaction, false);
    db.exec("BEGIN");
    assert.equal(adapter.inTransaction, true);
    db.exec("COMMIT");
    assert.equal(adapter.inTransaction, false);
    db.exec("BEGIN IMMEDIATE");
    assert.equal(adapter.inTransaction, true);
    db.exec("ROLLBACK");
    assert.equal(adapter.inTransaction, false);

    adapter.close();
    assert.equal(adapter.open, false);
    assert.equal(adapter.inTransaction, false);
  } finally {
    closeQuietly(adapter);
  }
});

test("Arm F: the node:sqlite getter does not read the driver after close", () => {
  let nativeReads = 0;
  const stub: NodeSqliteDatabaseLike = {
    prepare: () => ({
      run: () => ({ changes: 1, lastInsertRowid: 1 }),
      get: () => undefined,
      all: () => [],
    }),
    exec: () => {},
    get isTransaction() {
      nativeReads += 1;
      return true;
    },
    close: () => {},
  };
  const adapter = createNodeSqliteAdapterFromDatabase(stub, ":memory:");

  const readsBeforeOpen = nativeReads;
  assert.equal(adapter.inTransaction, true);
  assert.equal(
    nativeReads - readsBeforeOpen,
    1,
    "one adapter read must be exactly one driver read"
  );

  adapter.close();
  const readsAtClose = nativeReads;
  assert.equal(adapter.inTransaction, false);
  assert.equal(
    nativeReads,
    readsAtClose,
    "the getter must not read the driver's isTransaction after close"
  );
});

// Arm G. A live cursor makes close() throw while the handle stays open. This
// is the one shape measured to refuse on better-sqlite3, and it is the only
// arm where the refusal is evidence about the handle rather than about the
// witness.
test("Arm G: a live cursor refuses, and the handle works again after return()", () => {
  const dir = tempDir("g");
  const file = makeDb(dir);
  const db = new Database(file);
  db.pragma("journal_mode = WAL");
  db.exec("CREATE TABLE t(v INTEGER)");
  db.exec("INSERT INTO t VALUES (1),(2),(3)");
  const adapter = createBetterSqliteAdapter(db);

  let closeCalls = 0;
  const originalClose = adapter.close.bind(adapter);
  Object.defineProperty(adapter, "close", {
    value: () => {
      closeCalls += 1;
      originalClose();
    },
    configurable: true,
  });

  try {
    const cursor = db.prepare("SELECT v FROM t").iterate();
    assert.deepEqual(cursor.next(), { value: { v: 1 }, done: false });

    const refused = releaseExclusiveLock(adapter);
    assert.equal(refused.kind, "REFUSED_STILL_OPEN");
    if (refused.kind === "REFUSED_STILL_OPEN") {
      assert.equal(refused.reason, "CLOSE_THREW");
      assert.match(
        String(refused.message),
        /iterator|busy|locked/i,
        "the refusal must carry the driver's own reason for refusing the close"
      );
    }
    assert.equal(closeCalls, 1, "the refusal must come from a close attempt, not an early return");
    assert.equal(adapter.open, true);

    cursor.return();
    const second = releaseExclusiveLock(adapter);
    assert.deepEqual(second, { kind: "CLOSED" });
    assert.equal(adapter.open, false);
  } finally {
    closeQuietly(adapter);
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// Arm H. A transaction getter that throws must be reported as unknown, and the
// close must not run: the state was never read, so closing would be a guess.
test("Arm H: a throwing transaction getter refuses unknown and never closes", () => {
  const dir = tempDir("h");
  const file = makeDb(dir);
  const holder = openExclusiveHolder(file);
  const real = createBetterSqliteAdapter(holder);
  let closeCalls = 0;
  const stub = Object.create(real) as SqliteAdapter;
  Object.defineProperty(stub, "inTransaction", {
    get() {
      throw new Error("transaction state unavailable");
    },
    configurable: true,
  });
  Object.defineProperty(stub, "close", {
    value: () => {
      closeCalls += 1;
    },
    configurable: true,
  });

  try {
    const result = releaseExclusiveLock(stub);
    assert.equal(result.kind, "REFUSED_UNKNOWN_TRANSACTION");
    assert.equal(closeCalls, 0);
    assert.equal(real.open, true);
  } finally {
    holder.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// Arm I. The close returned; the witness is what failed. This is NOT evidence
// that the handle is still open, so the kind must not be read as "retry after
// ending the cursor" -- see the two sources under the Contract.
test("Arm I: an open getter that throws only after close refuses, never CLOSED", () => {
  const dir = tempDir("i");
  const file = makeDb(dir);
  const holder = openExclusiveHolder(file);
  const real = createBetterSqliteAdapter(holder);
  let closeCalls = 0;
  let closed = false;
  const stub = Object.create(real) as SqliteAdapter;
  Object.defineProperty(stub, "close", {
    value: () => {
      closeCalls += 1;
      closed = true;
      real.close();
    },
    configurable: true,
  });
  Object.defineProperty(stub, "readOpenWitness", {
    value: () => {
      if (closed) throw new Error("open state unavailable");
      return real.readOpenWitness?.() ?? (real.open ? "open" : "closed");
    },
    configurable: true,
  });

  try {
    const result = releaseExclusiveLock(stub);
    assert.equal(result.kind, "REFUSED_STILL_OPEN");
    assert.equal(closeCalls, 1, "the close ran; the failure is the witness");
    if (result.kind === "REFUSED_STILL_OPEN") {
      // The close returned without throwing, so the state read is what failed.
      // This is the reason that means "nothing is known about the handle", and
      // the witness error is carried so the caller can log why.
      assert.equal(result.reason, "OPEN_WITNESS_UNREADABLE");
      assert.match(
        result.message ?? "",
        /open state unavailable/,
        "the witness error text must be carried"
      );
    }
  } finally {
    // The stub's own close already ran real.close(); closing again here would
    // hit a stub whose open getter throws. Touching the real adapter directly
    // covers the other case: an early throw in the helper leaving it open.
    if (real.open) real.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// Arm J. The Bun getter at the adapter layer, on a stub handle: the suite has
// no Bun runtime. The stub records whether the native getter is read after
// close, which is the behaviour the guard exists to prevent.
test("Arm J: the Bun getter forwards state and does not read the driver after close", () => {
  let nativeReads = 0;
  let driverState = false;
  let closed = false;

  const driver: BunSqliteDatabaseLike = {
    query: () => ({
      run: () => ({ changes: 1, lastInsertRowid: 1 }),
      get: () => undefined,
      all: () => [],
    }),
    exec: () => {},
    // bun:sqlite returns a wrapper that runs the call inside BEGIN/COMMIT,
    // not the callback itself. Matching that shape keeps a future test from
    // being misled by the cast.
    transaction:
      <T>(fn: (...args: unknown[]) => T) =>
      (...args: unknown[]) =>
        fn(...args),
    get inTransaction() {
      nativeReads += 1;
      return driverState;
    },
    close: () => {
      closed = true;
    },
  };

  const adapter = createBunSqliteAdapter(driver, ":memory:");
  assert.equal(adapter.inTransaction, false);
  const readsBefore = nativeReads;

  driverState = true;
  assert.equal(adapter.inTransaction, true);
  driverState = false;
  assert.equal(adapter.inTransaction, false);
  assert.ok(nativeReads > readsBefore, "the getter must forward the driver's value while open");

  adapter.close();
  assert.equal(closed, true);
  const readsAtClose = nativeReads;
  assert.equal(adapter.inTransaction, false);
  assert.equal(
    nativeReads,
    readsAtClose,
    "the getter must not read the driver's inTransaction after close"
  );
});

// Arm K. The function sets no pragma. It is a rule rather than a preference
// because with a live cursor the pragma is the statement that throws: an
// implementation that sets one never reaches close() and reports the refusal
// for the wrong reason, which Arm G alone cannot distinguish.
test("Arm K: a successful release calls pragma zero times", () => {
  const dir = tempDir("k");
  const file = makeDb(dir);
  const holder = openExclusiveHolder(file);

  // The adapter-level spy below only sees calls that pass through the adapter.
  // Observing the handle itself covers the rest: a release that reached the
  // driver some other way (through `raw`, or a path that skips the adapter)
  // would leave the adapter spy empty and still set a pragma.
  //
  // Three paths reach the driver, not two: exec() and pragma() carry a PRAGMA
  // directly, and prepare() carries one as a statement whose run()/get()/all()
  // is what executes it. Watching only the first two would let a release that
  // prepares its pragma read as silent.
  const driverCalls: string[] = [];
  const originalDriverExec = holder.exec.bind(holder);
  const originalDriverPragma = holder.pragma.bind(holder);
  const originalDriverPrepare = holder.prepare.bind(holder);
  Object.defineProperty(holder, "prepare", {
    value: (sql: string) => {
      if (/^\s*pragma/i.test(sql)) {
        driverCalls.push(`prepare:${sql}`);
      }
      return originalDriverPrepare(sql);
    },
    configurable: true,
  });
  Object.defineProperty(holder, "exec", {
    value: (sql: string) => {
      driverCalls.push(`exec:${sql}`);
      return originalDriverExec(sql);
    },
    configurable: true,
  });
  Object.defineProperty(holder, "pragma", {
    value: (pragmaStr: string, options?: { simple?: boolean }) => {
      driverCalls.push(`pragma:${pragmaStr}`);
      return originalDriverPragma(pragmaStr, options);
    },
    configurable: true,
  });

  const adapter = createBetterSqliteAdapter(holder);

  const pragmaCalls: string[] = [];
  const originalPragma = adapter.pragma.bind(adapter);
  Object.defineProperty(adapter, "pragma", {
    value: (pragmaStr: string, options?: { simple?: boolean }) => {
      pragmaCalls.push(pragmaStr);
      return originalPragma(pragmaStr, options);
    },
    configurable: true,
  });

  try {
    const result = releaseExclusiveLock(adapter);
    assert.deepEqual(result, { kind: "CLOSED" });
    assert.deepEqual(pragmaCalls, [], "the helper must not set a pragma");
    assert.deepEqual(driverCalls, [], "no pragma may reach the driver either");
  } finally {
    closeQuietly(adapter);
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// The release exists to drop the lock without running a checkpoint first; the
// option is the only thing that carries that decision, so it is asserted where
// it is passed rather than inferred from the adapter's behaviour.
test("Arm O: the release asks the adapter to close without a checkpoint", () => {
  const closeOptions: Array<{ checkpoint?: boolean } | undefined> = [];
  let open = true;
  const adapter = {
    driver: "stub",
    readOpenWitness: () => (open ? ("open" as const) : ("closed" as const)),
    get open() {
      return open;
    },
    get inTransaction() {
      return false;
    },
    get name() {
      return ":memory:";
    },
    prepare: () => {
      throw new Error("unused");
    },
    exec: () => {},
    pragma: () => null,
    transaction: (fn: unknown) => fn,
    immediate: (fn: () => void) => fn(),
    backup: async () => {},
    checkpoint: () => {},
    close: (options?: { checkpoint?: boolean }) => {
      closeOptions.push(options);
      open = false;
    },
  } as unknown as SqliteAdapter;

  assert.equal(adapter.readOpenWitness?.(), "open");
  const result = releaseExclusiveLock(adapter);

  assert.deepEqual(result, { kind: "CLOSED" });
  assert.deepEqual(closeOptions, [{ checkpoint: false }]);
  assert.equal(adapter.readOpenWitness?.(), "closed");
});
