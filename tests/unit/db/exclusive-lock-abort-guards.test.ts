import { spawnSync, type SpawnSyncReturns } from "node:child_process";
// Witness, guard and wrapper arms: what counts as evidence that a close
// happened, and what the adapters answer when the driver cannot say.

import assert from "node:assert/strict";
import fs from "node:fs";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";
import Database from "better-sqlite3";
import { createBetterSqliteAdapter } from "../../../src/lib/db/adapters/betterSqliteAdapter";
import { createBunSqliteAdapter } from "../../../src/lib/db/adapters/bunSqliteAdapter";
import type { BunSqliteDatabaseLike } from "../../../src/lib/db/adapters/bunSqliteAdapter";
import { createNodeSqliteAdapter } from "../../../src/lib/db/adapters/nodeSqliteAdapter";
import { createNodeSqliteAdapterFromDatabase } from "../../../src/lib/db/adapters/nodeSqliteShared";
import type { NodeSqliteAdapterCloseHooks } from "../../../src/lib/db/adapters/nodeSqliteShared";
import type { NodeSqliteDatabaseLike } from "../../../src/lib/db/adapters/nodeSqliteShared";
import { instrumentSqliteAdapter } from "../../../src/lib/db/adapters/slowDiagnostics";
import type { SqliteAdapter } from "../../../src/lib/db/adapters/types";
import { releaseExclusiveLock } from "../../../src/lib/db/exclusiveLockRelease";
import {
  tempDir,
  makeDb,
  openExclusiveHolder,
  closeQuietly,
  CHILD_TIMEOUT_MS,
} from "./exclusive-lock-fixtures";

// A second release on an already-closed handle. better-sqlite3 does not throw
// on a double close, and its inTransaction reads false once closed, so the
// honest answer is CLOSED again. Pinned because the alternative --
// REFUSED_STILL_OPEN -- would tell the caller to end a cursor that does not
// exist. A driver that throws on double close is not automatically that
// case: if the handle then reports itself closed, the witness wins and the
// answer is still CLOSED, with no message.
test("a second release on a closed handle returns CLOSED", () => {
  const dir = tempDir("repeat");
  const file = makeDb(dir);
  const holder = openExclusiveHolder(file);
  const adapter = createBetterSqliteAdapter(holder);
  try {
    assert.deepEqual(releaseExclusiveLock(adapter), { kind: "CLOSED" });
    assert.equal(adapter.open, false);
    assert.deepEqual(releaseExclusiveLock(adapter), { kind: "CLOSED" });
  } finally {
    closeQuietly(adapter);
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// A driver that cannot report transaction state must come back as unknown, not
// as false. Reporting false would tell releaseExclusiveLock() it is safe to
// close, and closing on a guess is the silent rollback the helper exists to
// prevent.
test("both adapters report unknown when the driver has no transaction flag", () => {
  const bunDriver: BunSqliteDatabaseLike = {
    query: () => ({
      run: () => ({ changes: 0, lastInsertRowid: 0 }),
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
    close: () => {},
  };
  assert.equal(createBunSqliteAdapter(bunDriver, ":memory:").inTransaction, undefined);

  const nodeStub: NodeSqliteDatabaseLike = {
    prepare: () => ({
      run: () => ({ changes: 0, lastInsertRowid: 0 }),
      get: () => undefined,
      all: () => [],
    }),
    exec: () => {},
    close: () => {},
  };
  assert.equal(createNodeSqliteAdapterFromDatabase(nodeStub, ":memory:").inTransaction, undefined);
});

// A driver whose state read throws is unknown, not false. Same reason as the
// missing-flag case: false is a licence to close, and a throw is not.
test("both adapters report unknown when the state read throws", () => {
  const bunDriver: BunSqliteDatabaseLike = {
    query: () => ({
      run: () => ({ changes: 0, lastInsertRowid: 0 }),
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
    get inTransaction(): boolean {
      throw new Error("transaction state unavailable");
    },
    close: () => {},
  };
  assert.equal(createBunSqliteAdapter(bunDriver, ":memory:").inTransaction, undefined);

  const nodeStub: NodeSqliteDatabaseLike = {
    prepare: () => ({
      run: () => ({ changes: 0, lastInsertRowid: 0 }),
      get: () => undefined,
      all: () => [],
    }),
    exec: () => {},
    get isTransaction(): boolean {
      throw new Error("transaction state unavailable");
    },
    close: () => {},
  };
  assert.equal(createNodeSqliteAdapterFromDatabase(nodeStub, ":memory:").inTransaction, undefined);
});

// A present transaction flag that is not a boolean is unknown, never false: the
// same licence-to-close argument as the missing and throwing cases.
test("both adapters report unknown when the transaction flag is not a boolean", () => {
  for (const flag of [null, 0, "false"] as unknown[]) {
    const bunDriver = {
      query: () => ({
        run: () => ({ changes: 0, lastInsertRowid: 0 }),
        get: () => undefined,
        all: () => [],
      }),
      exec: () => {},
      transaction:
        <T>(fn: (...args: unknown[]) => T) =>
        (...args: unknown[]) =>
          fn(...args),
      inTransaction: flag,
      close: () => {},
    } as unknown as BunSqliteDatabaseLike;
    assert.equal(createBunSqliteAdapter(bunDriver, ":memory:").inTransaction, undefined);

    const nodeStub = {
      prepare: () => ({
        run: () => ({ changes: 0, lastInsertRowid: 0 }),
        get: () => undefined,
        all: () => [],
      }),
      exec: () => {},
      isTransaction: flag,
      close: () => {},
    } as unknown as NodeSqliteDatabaseLike;
    assert.equal(
      createNodeSqliteAdapterFromDatabase(nodeStub, ":memory:").inTransaction,
      undefined
    );
  }
});

// A close that throws a non-Error is stringified into the message. Pinned
// because the message is now the CLOSE_THREW branch's only payload, and an
// empty or missing one would leave the caller unable to log what happened.
test("a non-Error thrown by close is stringified into the message", () => {
  const dir = tempDir("nonerror");
  const file = makeDb(dir);
  const holder = openExclusiveHolder(file);
  const adapter = createBetterSqliteAdapter(holder);
  Object.defineProperty(adapter, "close", {
    value: () => {
      throw "string refusal";
    },
    configurable: true,
  });

  try {
    const result = releaseExclusiveLock(adapter);
    assert.equal(result.kind, "REFUSED_STILL_OPEN");
    if (result.kind === "REFUSED_STILL_OPEN") {
      assert.equal(result.reason, "CLOSE_THREW");
      assert.equal(result.message, "string refusal");
    }
  } finally {
    holder.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// The same with a value that stringifies to nothing: the message key must still
// carry text, otherwise the caller is routed to the retry branch with nothing
// to log.
test("a thrown value that stringifies to empty still yields a message", () => {
  const dir = tempDir("emptythrow");
  const file = makeDb(dir);
  const holder = openExclusiveHolder(file);
  const adapter = createBetterSqliteAdapter(holder);
  Object.defineProperty(adapter, "close", {
    value: () => {
      throw "";
    },
    configurable: true,
  });

  try {
    const result = releaseExclusiveLock(adapter);
    assert.equal(result.kind, "REFUSED_STILL_OPEN");
    if (result.kind === "REFUSED_STILL_OPEN") {
      assert.equal(result.reason, "CLOSE_THREW");
      assert.ok(
        typeof result.message === "string" && result.message.length > 0,
        "an empty driver message must not leave the caller with nothing to log"
      );
    }
  } finally {
    holder.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// The helper end-to-end on node:sqlite, not just its getter. This is the
// adapter whose close() used to flip its open flag after a swallowed driver
// failure; with that fixed, a successful release and a refusal both go through
// the same path the product would take.
test("the helper composes with the node:sqlite adapter", () => {
  const dir = tempDir("node-e2e");
  const file = makeDb(dir, "n.sqlite");
  const db = new DatabaseSync(file);
  db.exec("PRAGMA journal_mode = WAL");
  db.exec("CREATE TABLE t(v INTEGER)");
  db.exec("INSERT INTO t VALUES (1)");
  const adapter = createNodeSqliteAdapterFromDatabase(db, file, { onClosed: () => {} });

  try {
    db.exec("BEGIN IMMEDIATE");
    db.exec("INSERT INTO t VALUES (2)");
    const refused = releaseExclusiveLock(adapter);
    assert.equal(refused.kind, "REFUSED_OPEN_TRANSACTION");
    assert.equal(adapter.open, true);
    db.exec("COMMIT");
    assert.deepEqual(adapter.prepare("SELECT count(*) AS c FROM t").get(), { c: 2 });

    const released = releaseExclusiveLock(adapter);
    assert.deepEqual(released, { kind: "CLOSED" });
    assert.equal(adapter.open, false);
  } finally {
    closeQuietly(adapter);
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// A driver whose close fails must not report itself closed. The node adapter
// swallows the driver error by design, so the only thing that keeps the open
// witness honest is that the flag is not flipped on the way out.
test("a node:sqlite handle whose close failed still reports open", () => {
  const stub: NodeSqliteDatabaseLike = {
    prepare: () => ({
      run: () => ({ changes: 0, lastInsertRowid: 0 }),
      get: () => undefined,
      all: () => [],
    }),
    exec: () => {},
    // A boolean state so the refusal below is about the close, not about an
    // unreadable transaction flag.
    isTransaction: false,
    close: () => {
      throw new Error("driver refused to close");
    },
  };
  const adapter = createNodeSqliteAdapterFromDatabase(stub, ":memory:");

  adapter.close();
  assert.equal(adapter.open, true, "a failed close must not be reported as closed");

  const result = releaseExclusiveLock(adapter);
  assert.equal(result.kind, "REFUSED_STILL_OPEN");
  if (result.kind === "REFUSED_STILL_OPEN") {
    // close() itself swallowed the driver error, so the witness is what
    // noticed: the handle still reports open.
    assert.equal(result.reason, "OPEN_STILL_TRUE");
  }
});

// A witness that answers with something other than a boolean is not evidence
// that the close happened. Treating anything-but-true as closed would let a
// lying or half-implemented getter certify a release nobody observed.
test("an unreadable tri-state answer is not evidence of a close", () => {
  const dir = tempDir("openish");
  const file = makeDb(dir);
  const holder = openExclusiveHolder(file);
  const real = createBetterSqliteAdapter(holder);
  let closeCalls = 0;
  const stub = Object.create(real) as SqliteAdapter;
  Object.defineProperty(stub, "close", {
    value: () => {
      closeCalls += 1;
      real.close();
    },
    configurable: true,
  });
  Object.defineProperty(stub, "readOpenWitness", { value: () => "unreadable", configurable: true });

  try {
    const result = releaseExclusiveLock(stub);
    assert.equal(result.kind, "REFUSED_STILL_OPEN");
    assert.equal(closeCalls, 1);
    if (result.kind === "REFUSED_STILL_OPEN") {
      assert.equal(result.reason, "OPEN_WITNESS_UNREADABLE");
      assert.ok(
        typeof result.message === "string" && result.message.length > 0,
        "a non-boolean witness must still leave the caller something to log"
      );
    }
  } finally {
    if (real.open) real.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// A non-standard Error can carry an undefined message. Reading `.length` on it
// would throw out of the catch block and crash the function instead of
// refusing, so the fallback has to happen before the length check.
test("an Error with no message still yields a refusal", () => {
  const dir = tempDir("nomessage");
  const file = makeDb(dir);
  const holder = openExclusiveHolder(file);
  const adapter = createBetterSqliteAdapter(holder);
  const weird = Object.create(Error.prototype) as Error;
  // Error.prototype.message is the empty string, so inheriting it is not the
  // shape under test: the own property has to be set to undefined.
  Object.defineProperty(weird, "message", { value: undefined, configurable: true });
  Object.defineProperty(adapter, "close", {
    value: () => {
      throw weird;
    },
    configurable: true,
  });

  try {
    const result = releaseExclusiveLock(adapter);
    assert.equal(result.kind, "REFUSED_STILL_OPEN");
    if (result.kind === "REFUSED_STILL_OPEN") {
      assert.equal(result.reason, "CLOSE_THREW");
      assert.ok(
        typeof result.message === "string" && result.message.length > 0,
        "a missing driver message must still leave something to log"
      );
    }
  } finally {
    holder.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// A close that throws after the driver already let go. Reporting CLOSE_THREW
// here would tell the caller to end a cursor and retry a release that has
// already happened, so the witness decides: the handle reads closed, the answer
// is CLOSED.
test("a close that throws after closing still reports CLOSED", () => {
  const dir = tempDir("partialclose");
  const file = makeDb(dir);
  const holder = openExclusiveHolder(file);
  const real = createBetterSqliteAdapter(holder);
  const stub = Object.create(real) as SqliteAdapter;
  Object.defineProperty(stub, "close", {
    value: () => {
      real.close();
      throw new Error("close threw after the handle was released");
    },
    configurable: true,
  });

  try {
    const result = releaseExclusiveLock(stub);
    assert.deepEqual(result, { kind: "CLOSED" });
    assert.equal(real.open, false);
  } finally {
    if (real.open) real.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// A close that throws and a witness that also throws: nothing was observed
// about the handle, so the answer is the unreadable reason -- not CLOSE_THREW,
// which promises the handle was seen open.
test("a close that throws with an unreadable witness is not CLOSE_THREW", () => {
  const dir = tempDir("boththrow");
  const file = makeDb(dir);
  const holder = openExclusiveHolder(file);
  const real = createBetterSqliteAdapter(holder);
  const stub = Object.create(real) as SqliteAdapter;
  Object.defineProperty(stub, "close", {
    value: () => {
      throw new Error("close failed");
    },
    configurable: true,
  });
  Object.defineProperty(stub, "readOpenWitness", {
    value: () => {
      throw new Error("witness failed");
    },
    configurable: true,
  });

  try {
    const result = releaseExclusiveLock(stub);
    assert.equal(result.kind, "REFUSED_STILL_OPEN");
    if (result.kind === "REFUSED_STILL_OPEN") {
      assert.equal(result.reason, "OPEN_WITNESS_UNREADABLE");
      assert.ok(
        typeof result.message === "string" && result.message.includes("close failed"),
        "the close error must survive in the message"
      );
      assert.match(result.message ?? "", /witness failed/, "the witness error must survive too");
    }
  } finally {
    if (real.open) real.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// A repeated close is a normal path: releaseExclusiveLock() calls it again
// after a refusal, and a second release on a closed handle is allowed. onClosed
// must fire once -- it releases external things that are not idempotent.
test("a repeated close runs onClosed once", () => {
  let onClosedCalls = 0;
  const stub: NodeSqliteDatabaseLike = {
    prepare: () => ({
      run: () => ({ changes: 0, lastInsertRowid: 0 }),
      get: () => undefined,
      all: () => [],
    }),
    exec: () => {},
    isTransaction: false,
    close: () => {},
  };
  const adapter = createNodeSqliteAdapterFromDatabase(stub, ":memory:", {
    onClosed: () => {
      onClosedCalls += 1;
    },
  });

  adapter.close();
  assert.equal(adapter.open, false);
  adapter.close();
  adapter.close();

  assert.equal(onClosedCalls, 1, "onClosed must not run again on an already-closed handle");
});

// A witness that throws `undefined` must still read as a throw, not as a
// non-boolean return. The flag is what makes the two distinguishable; a
// sentinel value cannot.
test("a witness that throws undefined is reported as a throw", () => {
  const dir = tempDir("throwundefined");
  const file = makeDb(dir);
  const holder = openExclusiveHolder(file);
  const real = createBetterSqliteAdapter(holder);
  const stub = Object.create(real) as SqliteAdapter;
  Object.defineProperty(stub, "close", {
    value: () => {
      throw new Error("close failed");
    },
    configurable: true,
  });
  Object.defineProperty(stub, "readOpenWitness", {
    value: () => {
      throw undefined;
    },
    configurable: true,
  });

  try {
    const result = releaseExclusiveLock(stub);
    assert.equal(result.kind, "REFUSED_STILL_OPEN");
    if (result.kind === "REFUSED_STILL_OPEN") {
      assert.equal(result.reason, "OPEN_WITNESS_UNREADABLE");
      assert.match(result.message ?? "", /the open witness threw/, "must say the witness threw");
    }
  } finally {
    if (real.open) real.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// A failed close must leave the statement cache intact: the caller's prepared
// statements are still valid handles, and clearing the cache would strand them
// while `open` keeps reporting the adapter as usable. The stub's statement
// throws once finalized, so a close that sweeps the cache first is visible.
test("a failed close keeps the prepared statements usable", () => {
  let finalized = false;
  let prepareCalls = 0;
  const stub: NodeSqliteDatabaseLike = {
    prepare: () => ({
      ...(() => {
        prepareCalls += 1;
        return {};
      })(),
      run: () => ({ changes: 0, lastInsertRowid: 0 }),
      get: () => undefined,
      all: () => {
        if (finalized) throw new Error("statement has been finalized");
        return [];
      },
      finalize: () => {
        finalized = true;
      },
    }),
    exec: () => {},
    isTransaction: false,
    close: () => {
      throw new Error("driver refused to close");
    },
  };
  const adapter = createNodeSqliteAdapterFromDatabase(stub, ":memory:");
  const statement = adapter.prepare("SELECT 1");

  adapter.close();
  assert.equal(adapter.open, true);
  assert.equal(finalized, false, "a failed close must not finalize the cached statements");

  // A fresh prepare would mean the cache was dropped and rebuilt; the adapter
  // must reuse the entry it already had.
  adapter.prepare("SELECT 1");
  assert.equal(prepareCalls, 1, "the cached statement must be reused, not rebuilt");
  assert.deepEqual(statement.all(), []);
});

function bunIsAvailable(
  probe: Pick<SpawnSyncReturns<string>, "error" | "status" | "stderr">
): boolean {
  if (probe.error && "code" in probe.error && probe.error.code === "ENOENT") return false;
  assert.ifError(probe.error);
  assert.equal(probe.status, 0, `bun --version failed: ${probe.stderr}`);
  return true;
}

test("Bun runtime probe accepts success and skips only an absent executable", () => {
  assert.equal(bunIsAvailable({ status: 0, stderr: "" }), true);
  const absent = Object.assign(new Error("bun is absent"), { code: "ENOENT" });
  assert.equal(bunIsAvailable({ status: null, stderr: "", error: absent }), false);
});

const failedBunProbes: Array<{
  name: string;
  result: Pick<SpawnSyncReturns<string>, "error" | "status" | "stderr">;
}> = [
  { name: "nonzero exit", result: { status: 7, stderr: "version check failed" } },
  { name: "signal exit", result: { status: null, stderr: "" } },
  {
    name: "permission failure",
    result: {
      status: null,
      stderr: "",
      error: Object.assign(new Error("denied"), { code: "EACCES" }),
    },
  },
  {
    name: "timeout",
    result: {
      status: null,
      stderr: "",
      error: Object.assign(new Error("timeout"), { code: "ETIMEDOUT" }),
    },
  },
];
for (const { name, result } of failedBunProbes) {
  test(`Bun runtime probe rejects ${name} instead of skipping`, () => {
    assert.throws(() => bunIsAvailable(result));
  });
}

// Bun has no place in this suite's dependencies, so this runs only where bun is
// on PATH. Arm J covers the adapter's wiring with a stub; this covers the one
// thing the stub cannot: that the real driver's `inTransaction` behaves the way
// the getter assumes. The assertion is on the driver's values, not on the
// adapter, and the skip is visible in the output rather than silent.
test("the real bun:sqlite driver reports inTransaction as a boolean", (t) => {
  const probe = spawnSync("bun", ["--version"], { encoding: "utf8", timeout: 5_000 });
  if (!bunIsAvailable(probe)) {
    t.skip("bun is not on PATH");
    return;
  }

  const script = `
    const { Database } = require("bun:sqlite");
    const db = new Database(":memory:");
    const seen = [];
    seen.push(db.inTransaction);
    db.exec("BEGIN");
    seen.push(db.inTransaction);
    db.exec("COMMIT");
    seen.push(db.inTransaction);
    db.close();
    console.log(JSON.stringify({ seen }));
  `;
  const result = spawnSync("bun", ["-e", script], { encoding: "utf8", timeout: CHILD_TIMEOUT_MS });
  assert.equal(result.status, 0, `bun failed: ${result.stderr}`);
  const parsed = JSON.parse(result.stdout.trim()) as { seen: unknown[] };
  assert.deepEqual(parsed.seen, [false, true, false], "the driver's flag must track BEGIN/COMMIT");
});

test("node adapter still attempts close when the pre-close hook throws", () => {
  const calls: string[] = [];
  let closeAttempts = 0;
  const stub: NodeSqliteDatabaseLike = {
    prepare: () => ({
      run: () => ({ changes: 0, lastInsertRowid: 0 }),
      get: () => undefined,
      all: () => [],
    }),
    exec: () => {},
    isTransaction: false,
    close: () => {
      closeAttempts += 1;
      calls.push(`close:${closeAttempts}`);
    },
  };
  const hooks: NodeSqliteAdapterCloseHooks = {
    onBeforeClose: () => {
      calls.push("before-close");
      throw new Error("checkpoint refused");
    },
    onClosed: () => {
      calls.push("closed");
    },
  };
  const adapter = createNodeSqliteAdapterFromDatabase(stub, ":memory:", hooks);

  adapter.close();
  assert.equal(adapter.open, false);
  assert.deepEqual(calls, ["before-close", "close:1", "closed"]);
});

// A caller's cleanup must not be able to turn a completed close into an
// exception: the handle is closed either way, and the caller only sees the
// close succeed.
test("a throwing onClosed hook does not escape the close", () => {
  const stub: NodeSqliteDatabaseLike = {
    prepare: () => ({
      run: () => ({ changes: 0, lastInsertRowid: 0 }),
      get: () => undefined,
      all: () => [],
    }),
    exec: () => {},
    isTransaction: false,
    close: () => {},
  };
  const adapter = createNodeSqliteAdapterFromDatabase(stub, ":memory:", {
    onClosed: () => {
      throw new Error("cleanup exploded");
    },
  });

  assert.doesNotThrow(() => adapter.close());
  assert.equal(adapter.open, false);
});

test("node adapter orders pre-close and post-close hooks around retries", () => {
  const calls: string[] = [];
  const closedStates: boolean[] = [];
  let closeAttempts = 0;
  const stub: NodeSqliteDatabaseLike = {
    prepare: () => ({
      run: () => ({ changes: 0, lastInsertRowid: 0 }),
      get: () => undefined,
      all: () => [],
    }),
    exec: (sql) => {
      calls.push(`exec:${sql}`);
    },
    isTransaction: false,
    close: () => {
      closeAttempts += 1;
      calls.push(`close:${closeAttempts}`);
      if (closeAttempts === 1) throw new Error("first close refused");
    },
  };
  const hooks: NodeSqliteAdapterCloseHooks = {
    onBeforeClose: () => {
      calls.push("before-close");
    },
    onClosed: () => {
      closedStates.push(adapter.open);
      calls.push("closed");
    },
  };
  const adapter = createNodeSqliteAdapterFromDatabase(stub, ":memory:", hooks);

  adapter.close();
  assert.equal(adapter.open, true);
  assert.deepEqual(calls, ["before-close", "close:1"]);

  adapter.close();
  assert.equal(adapter.open, false);
  assert.deepEqual(closedStates, [false], "onClosed must see the adapter already closed");
  assert.deepEqual(calls, ["before-close", "close:1", "before-close", "close:2", "closed"]);
});

test("node adapter checkpoints on an ordinary close and releases its listeners", async (t) => {
  const signals = ["beforeExit", "SIGINT", "SIGTERM"] as const;
  const listenerCounts = () => signals.map((signal) => process.listenerCount(signal));
  const baseline = listenerCounts();
  const schedule = t.mock.method(globalThis, "setInterval");
  const cancel = t.mock.method(globalThis, "clearInterval");
  const adapter = await createNodeSqliteAdapter(":memory:");
  const db = adapter.raw as DatabaseSync;
  const originalExec = db.exec.bind(db);
  const originalClose = db.close.bind(db);
  const calls: string[] = [];
  let closeAttempts = 0;
  db.exec = ((sql: string) => {
    if (/^\s*PRAGMA\b/i.test(sql)) calls.push(`pragma:${sql}`);
    return originalExec(sql);
  }) as typeof db.exec;
  db.close = (() => {
    closeAttempts += 1;
    calls.push(`close:${closeAttempts}`);
    if (closeAttempts === 1) throw new Error("first close refused");
    return originalClose();
  }) as typeof db.close;

  try {
    assert.equal(schedule.mock.callCount(), 1, "the factory must create one checkpoint interval");
    const checkpointTimer = schedule.mock.calls[0].result;
    assert.ok(checkpointTimer);
    const cancellations = () =>
      cancel.mock.calls.filter((call) => call.arguments[0] === checkpointTimer).length;
    assert.deepEqual(
      listenerCounts(),
      baseline.map((count) => count + 1)
    );
    assert.equal(checkpointTimer.hasRef(), false);

    adapter.close();

    assert.equal(adapter.open, true);
    assert.deepEqual(calls, ["pragma:PRAGMA wal_checkpoint(TRUNCATE)", "close:1"]);
    assert.equal(cancellations(), 0, "a failed close must retain its checkpoint interval");
    assert.deepEqual(
      listenerCounts(),
      baseline.map((count) => count + 1)
    );

    adapter.close();

    assert.equal(adapter.open, false);
    assert.equal(db.isOpen, false);
    assert.deepEqual(calls, [
      "pragma:PRAGMA wal_checkpoint(TRUNCATE)",
      "close:1",
      "pragma:PRAGMA wal_checkpoint(TRUNCATE)",
      "close:2",
    ]);
    assert.equal(cancellations(), 1, "successful close must cancel its exact interval");
    assert.deepEqual(listenerCounts(), baseline);

    adapter.close();
    assert.deepEqual(calls, [
      "pragma:PRAGMA wal_checkpoint(TRUNCATE)",
      "close:1",
      "pragma:PRAGMA wal_checkpoint(TRUNCATE)",
      "close:2",
    ]);
    assert.equal(cancellations(), 1, "a repeated close must not repeat interval cleanup");
  } finally {
    // An assertion may fail before the intended retry; release the real handle
    // through the adapter so its listeners are detached as well.
    db.exec = originalExec;
    db.close = originalClose;
    adapter.close();
    for (const call of schedule.mock.calls) {
      if (call.result) clearInterval(call.result);
    }
  }
});

// A close that fails must not run onClosed: it releases external things, and
// pairing it with an attempt that left the handle open would free them for a
// handle that is still in use. A later retry that succeeds runs it exactly
// once.
test("a failed close defers onClosed to the retry that succeeds", () => {
  let onClosedCalls = 0;
  let failFirst = true;
  const stub: NodeSqliteDatabaseLike = {
    prepare: () => ({
      run: () => ({ changes: 0, lastInsertRowid: 0 }),
      get: () => undefined,
      all: () => [],
    }),
    exec: () => {},
    isTransaction: false,
    close: () => {
      if (failFirst) {
        failFirst = false;
        throw new Error("first close failed");
      }
    },
  };
  const adapter = createNodeSqliteAdapterFromDatabase(stub, ":memory:", {
    onClosed: () => {
      onClosedCalls += 1;
    },
  });

  adapter.close();
  assert.equal(adapter.open, true);
  assert.equal(onClosedCalls, 0, "a failed close must not run onClosed");

  adapter.close();
  assert.equal(adapter.open, false);
  assert.equal(onClosedCalls, 1, "the successful retry runs it once");
});

// A thrown value whose own toString throws. The conversion is guarded, so the
// function still returns a refusal rather than crashing out of its catch block.
test("a thrown value whose toString throws still yields a refusal", () => {
  const dir = tempDir("hostilethrow");
  const file = makeDb(dir);
  const holder = openExclusiveHolder(file);
  const adapter = createBetterSqliteAdapter(holder);
  Object.defineProperty(adapter, "close", {
    value: () => {
      throw {
        toString() {
          throw new Error("toString is hostile");
        },
      };
    },
    configurable: true,
  });

  try {
    const result = releaseExclusiveLock(adapter);
    assert.equal(result.kind, "REFUSED_STILL_OPEN");
    if (result.kind === "REFUSED_STILL_OPEN") {
      assert.equal(result.reason, "CLOSE_THREW");
      assert.ok(
        typeof result.message === "string" && result.message.length > 0,
        "an unconvertible thrown value must still leave a message"
      );
    }
  } finally {
    holder.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// An Error-like object whose `message` getter throws. The read is inside the
// guard, so this is the same class of hostile value as a throwing toString.
test("an Error whose message getter throws still yields a refusal", () => {
  const dir = tempDir("hostilemessage");
  const file = makeDb(dir);
  const holder = openExclusiveHolder(file);
  const adapter = createBetterSqliteAdapter(holder);
  const hostile = Object.create(Error.prototype) as Error;
  Object.defineProperty(hostile, "message", {
    get() {
      throw new Error("message getter is hostile");
    },
    configurable: true,
  });
  Object.defineProperty(adapter, "close", {
    value: () => {
      throw hostile;
    },
    configurable: true,
  });

  try {
    const result = releaseExclusiveLock(adapter);
    assert.equal(result.kind, "REFUSED_STILL_OPEN");
    if (result.kind === "REFUSED_STILL_OPEN") {
      assert.equal(result.reason, "CLOSE_THREW");
      assert.ok(
        typeof result.message === "string" && result.message.length > 0,
        "an unreadable Error message must still leave a message"
      );
    }
  } finally {
    holder.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// Sanity: the two adapters this slice touches still build. A getter added to a
// shared factory must not break the adapter's own construction path.
test("the node:sqlite adapter still builds and reports open", () => {
  const db = new DatabaseSync(":memory:");
  const adapter = createNodeSqliteAdapterFromDatabase(db as NodeSqliteDatabaseLike, ":memory:");
  assert.equal(adapter.driver, "node:sqlite");
  assert.equal(adapter.open, true);
  adapter.close();
  assert.equal(adapter.open, false);
});

// A present but non-boolean answer is not closure either. The throwing case is
// pinned above; this is the quiet half, where a half-fix that treats anything
// but true as closed would certify a release from a state nobody observed.
test("a driver that answers open with a non-boolean reads unreadable, not closed", () => {
  const holder = new Database(":memory:");
  const quiet = new Proxy(holder, {
    get(target, prop) {
      if (prop === "open") return null;
      const value = Reflect.get(target, prop, target);
      return typeof value === "function" ? value.bind(target) : value;
    },
  });
  const adapter = createBetterSqliteAdapter(quiet as typeof holder);

  try {
    assert.equal(adapter.open, true, "a non-boolean answer is not evidence of closure");
    assert.equal(adapter.readOpenWitness?.(), "unreadable");
  } finally {
    holder.close();
  }
});

// A driver property that throws while being read must not escape as an
// exception: `open` is a boolean by contract, and the state stays reportable
// as unreadable instead of crashing a caller that only asked a yes/no question.
test("a throwing driver witness keeps open a boolean and the helper refusing", () => {
  const holder = new Database(":memory:");
  // better-sqlite3 defines `open` non-configurably, so the hostile read is a
  // proxy rather than a redefined property on the handle.
  const hostile = new Proxy(holder, {
    get(target, prop) {
      if (prop === "open") throw new Error("driver witness exploded");
      const value = Reflect.get(target, prop, target);
      return typeof value === "function" ? value.bind(target) : value;
    },
  });
  const adapter = createBetterSqliteAdapter(hostile as typeof holder);

  assert.equal(adapter.open, true, "open must not throw");
  assert.equal(adapter.readOpenWitness?.(), "unreadable");

  const result = releaseExclusiveLock(adapter);
  assert.equal(result.kind, "REFUSED_STILL_OPEN");
  if (result.kind === "REFUSED_STILL_OPEN") {
    assert.equal(result.reason, "OPEN_WITNESS_UNREADABLE");
    // The adapter's own read swallows the driver error, the same way its close
    // path does, so the reason carries the meaning and the text is generic.
    assert.ok(typeof result.message === "string" && result.message.length > 0);
  }
});

// Obtaining the optional reader is a read of the adapter in its own right. An
// accessor that throws on lookup must become a refusal, not an escape.
test("a witness member that throws on lookup still yields a refusal", () => {
  const dir = tempDir("readerlookup");
  const file = makeDb(dir);
  const holder = openExclusiveHolder(file);
  const real = createBetterSqliteAdapter(holder);
  const stub = Object.create(real) as SqliteAdapter;
  let closeCalls = 0;
  Object.defineProperty(stub, "close", {
    value: () => {
      closeCalls += 1;
      real.close();
    },
    configurable: true,
  });
  Object.defineProperty(stub, "readOpenWitness", {
    get() {
      throw new Error("reader lookup exploded");
    },
    configurable: true,
  });

  try {
    const result = releaseExclusiveLock(stub);
    assert.equal(result.kind, "REFUSED_STILL_OPEN");
    if (result.kind === "REFUSED_STILL_OPEN") {
      assert.equal(result.reason, "OPEN_WITNESS_UNREADABLE");
      assert.match(result.message ?? "", /reader lookup exploded/);
    }
    assert.equal(closeCalls, 1, "the close must still be attempted before the lookup");
  } finally {
    if (real.open) real.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// The legacy fallback: an adapter without the optional reader answers through
// `open`, and a value that is not a boolean there is unreadable rather than
// closed.
test("an adapter without the tri-state read falls back to the boolean", () => {
  const dir = tempDir("noreader");
  const file = makeDb(dir);
  const holder = openExclusiveHolder(file);
  const real = createBetterSqliteAdapter(holder);
  const stub = Object.create(real) as SqliteAdapter;
  let closeCalls = 0;
  Object.defineProperty(stub, "close", {
    value: () => {
      closeCalls += 1;
      real.close();
    },
    configurable: true,
  });

  Object.defineProperty(stub, "readOpenWitness", { value: undefined, configurable: true });
  Object.defineProperty(stub, "open", { value: undefined, configurable: true });

  try {
    const result = releaseExclusiveLock(stub);
    assert.equal(result.kind, "REFUSED_STILL_OPEN");
    if (result.kind === "REFUSED_STILL_OPEN") {
      assert.equal(result.reason, "OPEN_WITNESS_UNREADABLE");
      assert.match(result.message ?? "", /not a boolean/, "the fallback must say what it saw");
    }
    assert.equal(closeCalls, 1, "the fallback must still attempt the close");
  } finally {
    if (real.open) real.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// The reader-less fallback has three answers and each needs an assertion: an
// edit that collapsed false into a refusal, or true into CLOSED, would ship
// otherwise.
test("the legacy fallback maps a false boolean to CLOSED", () => {
  const dir = tempDir("legacyfalse");
  const file = makeDb(dir);
  const holder = openExclusiveHolder(file);
  const real = createBetterSqliteAdapter(holder);
  const stub = Object.create(real) as SqliteAdapter;
  let closeCalls = 0;
  Object.defineProperty(stub, "close", {
    value: () => {
      closeCalls += 1;
      real.close();
    },
    configurable: true,
  });

  Object.defineProperty(stub, "readOpenWitness", { value: undefined, configurable: true });
  Object.defineProperty(stub, "open", { value: false, configurable: true });

  try {
    assert.deepEqual(releaseExclusiveLock(stub), { kind: "CLOSED" });
    assert.equal(closeCalls, 1, "the fallback must still attempt the close");
  } finally {
    if (real.open) real.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("the legacy fallback maps a true boolean to a refusal", () => {
  const dir = tempDir("legacytrue");
  const file = makeDb(dir);
  const holder = openExclusiveHolder(file);
  const real = createBetterSqliteAdapter(holder);
  const stub = Object.create(real) as SqliteAdapter;
  let closeCalls = 0;
  Object.defineProperty(stub, "close", {
    value: () => {
      closeCalls += 1;
      real.close();
    },
    configurable: true,
  });

  Object.defineProperty(stub, "readOpenWitness", { value: undefined, configurable: true });
  Object.defineProperty(stub, "open", { value: true, configurable: true });

  try {
    const result = releaseExclusiveLock(stub);
    assert.equal(result.kind, "REFUSED_STILL_OPEN");
    if (result.kind === "REFUSED_STILL_OPEN") assert.equal(result.reason, "OPEN_STILL_TRUE");
    assert.equal(closeCalls, 1, "the fallback must still attempt the close");
  } finally {
    if (real.open) real.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// The fallback reads `open` inside a guard, so a getter that throws there is a
// refusal rather than an escape. Distinct from the tri-state member throwing.
test("the legacy fallback survives a throwing open getter", () => {
  const dir = tempDir("legacythrowing");
  const file = makeDb(dir);
  const holder = openExclusiveHolder(file);
  const real = createBetterSqliteAdapter(holder);
  const stub = Object.create(real) as SqliteAdapter;
  let closeCalls = 0;
  Object.defineProperty(stub, "close", {
    value: () => {
      closeCalls += 1;
      real.close();
    },
    configurable: true,
  });

  Object.defineProperty(stub, "readOpenWitness", { value: undefined, configurable: true });
  Object.defineProperty(stub, "open", {
    get() {
      throw new Error("legacy open exploded");
    },
    configurable: true,
  });

  try {
    const result = releaseExclusiveLock(stub);
    assert.equal(result.kind, "REFUSED_STILL_OPEN");
    if (result.kind === "REFUSED_STILL_OPEN") {
      assert.equal(result.reason, "OPEN_WITNESS_UNREADABLE");
      assert.match(result.message ?? "", /legacy open exploded/);
    }
    assert.equal(closeCalls, 1, "the fallback must still attempt the close");
  } finally {
    if (real.open) real.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("a release through the diagnostics wrapper runs no pragma", async () => {
  const adapter = await createNodeSqliteAdapter(":memory:");
  const db = adapter.raw as DatabaseSync;
  const exec = db.exec.bind(db);
  const prepare = db.prepare.bind(db);
  const calls: string[] = [];
  db.exec = (sql: string) => {
    if (/^\s*PRAGMA\b/i.test(sql)) calls.push(sql);
    exec(sql);
  };
  // prepare() carries a pragma as a statement whose run() executes it, so a
  // watch on exec alone would let a prepared pragma read as silent.
  db.prepare = (sql: string) => {
    if (/^\s*PRAGMA\b/i.test(sql)) calls.push(sql);
    return prepare(sql);
  };
  const wrapped = instrumentSqliteAdapter(adapter, {
    thresholdMs: 10_000,
    now: () => 0,
    log: () => {},
  });
  const outcome = releaseExclusiveLock(wrapped);
  assert.equal(outcome.kind, "CLOSED");
  assert.deepEqual(calls, []);
  assert.equal(adapter.open, false);
});

test("an ordinary close through the diagnostics wrapper still checkpoints", async () => {
  const adapter = await createNodeSqliteAdapter(":memory:");
  const db = adapter.raw as DatabaseSync;
  const exec = db.exec.bind(db);
  const calls: string[] = [];
  db.exec = (sql: string) => {
    if (/^\s*PRAGMA\b/i.test(sql)) calls.push(sql);
    exec(sql);
  };
  const wrapped = instrumentSqliteAdapter(adapter, {
    thresholdMs: 10_000,
    now: () => 0,
    log: () => {},
  });
  wrapped.close();
  assert.deepEqual(calls, ["PRAGMA wal_checkpoint(TRUNCATE)"]);
  assert.equal(adapter.open, false);
});

// A witness answer outside the union is not a close. The helper maps anything it
// does not recognise to unreadable; without this row, a regression that treated
// an unexpected answer as closed would pass the suite and certify a release no
// witness observed.
test("a witness answer outside the union is not evidence of a close", () => {
  const dir = tempDir("outofunion");
  const file = makeDb(dir);
  const holder = openExclusiveHolder(file);
  const adapter = createBetterSqliteAdapter(holder);
  let closes = 0;
  const realClose = adapter.close.bind(adapter);
  Object.defineProperty(adapter, "close", {
    value: () => {
      closes += 1;
      realClose();
    },
    configurable: true,
  });
  (adapter as { readOpenWitness?: () => unknown }).readOpenWitness = () => "maybe";

  try {
    const outcome = releaseExclusiveLock(adapter);
    assert.equal(outcome.kind, "REFUSED_STILL_OPEN");
    if (outcome.kind === "REFUSED_STILL_OPEN") {
      assert.equal(outcome.reason, "OPEN_WITNESS_UNREADABLE");
    }
    assert.equal(closes, 1, "the refusal must come from a close attempt");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// The periodic trim is the only thing that keeps the WAL from growing while a
// long-lived handle stays open. It is created by the async factory, so this
// captures the scheduler it asks for and then runs that callback itself.
test("the periodic checkpoint trims the WAL on its interval", async () => {
  const scheduled: Array<{ run: () => void; ms: number }> = [];
  const realSetInterval = globalThis.setInterval;
  globalThis.setInterval = ((fn: () => void, ms: number) => {
    scheduled.push({ run: fn, ms });
    return { unref() {} } as unknown as NodeJS.Timeout;
  }) as typeof setInterval;

  let adapter: SqliteAdapter;
  try {
    adapter = await createNodeSqliteAdapter(":memory:");
  } finally {
    globalThis.setInterval = realSetInterval;
  }
  try {
    const db = adapter.raw as DatabaseSync;
    const realExec = db.exec.bind(db);
    const calls: string[] = [];
    db.exec = (sql: string) => {
      calls.push(sql);
      realExec(sql);
    };

    assert.equal(scheduled.length, 1, "the adapter must schedule exactly one trim");
    assert.equal(scheduled[0].ms, 60_000, "the trim runs once a minute");
    scheduled[0].run();
    assert.deepEqual(calls, ["PRAGMA wal_checkpoint(TRUNCATE)"]);
  } finally {
    adapter.close();
  }
});

// The explicit checkpoint is part of the retained contract: callers trim on
// demand, and the mode they ask for is the mode that runs.
test("an explicit checkpoint runs the mode it was asked for", () => {
  const calls: string[] = [];
  const adapter = createNodeSqliteAdapterFromDatabase(
    {
      prepare: () => ({
        run: () => ({ changes: 0, lastInsertRowid: 0 }),
        get: () => undefined,
        all: () => [],
      }),
      exec: (sql: string) => {
        calls.push(sql);
      },
      close: () => {},
    },
    ":memory:"
  );

  adapter.checkpoint("FULL");
  adapter.checkpoint();
  assert.deepEqual(calls, ["PRAGMA wal_checkpoint(FULL)", "PRAGMA wal_checkpoint(TRUNCATE)"]);
});
