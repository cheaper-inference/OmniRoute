import { test } from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";

import { createNodeSqliteAdapter } from "../../../src/lib/db/adapters/nodeSqliteAdapter.ts";
import { releaseExclusiveLock } from "../../../src/lib/db/exclusiveLockRelease.ts";
import { createNodeSqliteAdapterFromDatabase } from "../../../src/lib/db/adapters/nodeSqliteShared.ts";
import type { NodeSqliteDatabaseLike } from "../../../src/lib/db/adapters/nodeSqliteShared.ts";

type Row = Record<string, unknown>;

class FakeStatement {
  finalized = false;

  constructor(
    private readonly sql: string,
    private readonly rows: Row[] = []
  ) {}

  run(..._params: unknown[]) {
    return { changes: 1n, lastInsertRowid: 7n };
  }

  get(..._params: unknown[]) {
    if (this.sql.startsWith("PRAGMA")) {
      return { journal_mode: "wal" };
    }
    return this.rows[0];
  }

  all(..._params: unknown[]) {
    if (this.sql.startsWith("PRAGMA")) {
      return [{ journal_mode: "wal" }];
    }
    return this.rows;
  }

  finalize() {
    this.finalized = true;
  }
}

class FakeDb {
  closed = false;
  execCalls: string[] = [];
  statements: FakeStatement[] = [];

  prepare(sql: string) {
    const statement = new FakeStatement(sql, [{ value: "ok" }]);
    this.statements.push(statement);
    return statement;
  }

  exec(sql: string) {
    this.execCalls.push(sql);
  }

  close() {
    this.closed = true;
  }
}

test("createNodeSqliteAdapterFromDatabase wraps node:sqlite statements", () => {
  const db = new FakeDb();
  const adapter = createNodeSqliteAdapterFromDatabase(db, ":memory:");

  const insert = adapter.prepare("INSERT INTO t VALUES (?)").run("ok");
  assert.deepEqual(insert, { changes: 1, lastInsertRowid: 7 });

  const row = adapter.prepare("SELECT value FROM t").get() as Row;
  assert.equal(row.value, "ok");

  assert.equal(adapter.pragma("journal_mode", { simple: true }), "wal");
  assert.deepEqual(adapter.pragma("journal_mode"), [{ journal_mode: "wal" }]);
});

test("createNodeSqliteAdapterFromDatabase uses savepoints for transactions", () => {
  const db = new FakeDb();
  const adapter = createNodeSqliteAdapterFromDatabase(db, ":memory:");

  const run = adapter.transaction((value: string) => value.toUpperCase());
  assert.equal(run("ok"), "OK");
  assert.equal(db.execCalls[0].startsWith("SAVEPOINT "), true);
  assert.equal(db.execCalls[1].startsWith("RELEASE "), true);
});

test("createNodeSqliteAdapterFromDatabase uses BEGIN IMMEDIATE outside transactions", () => {
  const db = new FakeDb();
  const adapter = createNodeSqliteAdapterFromDatabase(db, ":memory:");

  adapter.immediate(() => {});

  assert.deepEqual(db.execCalls, ["BEGIN IMMEDIATE", "COMMIT"]);
});

test("createNodeSqliteAdapterFromDatabase rolls back failed immediate transactions", () => {
  const db = new FakeDb();
  const adapter = createNodeSqliteAdapterFromDatabase(db, ":memory:");

  assert.throws(() =>
    adapter.immediate(() => {
      throw new Error("fail");
    })
  );

  assert.deepEqual(db.execCalls, ["BEGIN IMMEDIATE", "ROLLBACK"]);
});

test("createNodeSqliteAdapterFromDatabase nests transactions in immediate savepoints", () => {
  const db = new FakeDb();
  const adapter = createNodeSqliteAdapterFromDatabase(db, ":memory:");

  adapter.immediate(() => {
    const nested = adapter.transaction(() => {
      throw new Error("inner failure");
    });
    assert.throws(() => nested());
  });

  assert.equal(db.execCalls[0], "BEGIN IMMEDIATE");
  assert.match(db.execCalls[1], /^SAVEPOINT /);
  assert.match(db.execCalls[2], /^ROLLBACK TO /);
  assert.match(db.execCalls[3], /^RELEASE /);
  assert.equal(db.execCalls[4], "COMMIT");
});

test("createNodeSqliteAdapterFromDatabase finalizes cached statements on close when the driver exposes finalize", (t) => {
  const db = new FakeDb();
  let closedHookCalls = 0;
  let hookState:
    { open: boolean; inTransaction: boolean | undefined; finalized: boolean[] } | undefined;
  let prepareError: unknown;
  const closedPrepareError = new Error("native prepare after close");
  const adapter = createNodeSqliteAdapterFromDatabase(db, ":memory:", {
    onClosed: () => {
      closedHookCalls++;
      hookState = {
        open: adapter.open,
        inTransaction: adapter.inTransaction,
        finalized: db.statements.map((s) => s.finalized),
      };
      // Only the stub is queried: a cache miss reaches its closed-driver spy.
      try {
        adapter.prepare("SELECT 1");
      } catch (error) {
        prepareError = error;
      }
    },
  });

  adapter.prepare("SELECT 1").get();
  const prepareAfterClose = t.mock.method(db, "prepare", () => {
    throw closedPrepareError;
  });
  adapter.close();
  adapter.close();

  assert.equal(closedHookCalls, 1);
  assert.deepEqual(hookState, { open: false, inTransaction: false, finalized: [true] });
  assert.equal(prepareAfterClose.mock.callCount(), 1, "onClosed must observe an empty cache");
  assert.equal(prepareError, closedPrepareError);
  assert.equal(db.closed, true);
  assert.equal(adapter.open, false);
  assert.equal(
    db.statements.every((statement) => statement.finalized),
    true
  );
});

// A real node:sqlite statement has no finalize member, so the sweep has to
// clear the cache anyway: a plain-object statement is the shape the adapter sees
// on that driver, and the close must still complete without touching it.
test("node adapter clears the cache on close when the driver exposes no finalize", () => {
  const prepared: string[] = [];
  const db = {
    prepare(sql: string) {
      prepared.push(sql);
      return {
        run: () => ({ changes: 1, lastInsertRowid: 1 }),
        get: () => ({ value: "ok" }),
        all: () => [{ value: "ok" }],
      };
    },
    exec: () => {},
    close: () => {},
  } as unknown as NodeSqliteDatabaseLike;
  const adapter = createNodeSqliteAdapterFromDatabase(db, ":memory:");
  adapter.prepare("SELECT 1").get();

  adapter.close();

  assert.equal(adapter.open, false);
  assert.equal(prepared.length, 1, "the close must not prepare anything");
  // The cache is gone: a re-prepare of the same SQL reaches the driver instead of
  // being served from the cache, which is what "clears the cache" claims.
  adapter.prepare("SELECT 1");
  assert.equal(prepared.length, 2, "the sweep must clear the cache");
  assert.doesNotThrow(() => adapter.close(), "a repeated close is a no-op");
});

test("node adapter clears cached statements when a thrown close is witnessed closed", (t) => {
  class ClosedThenThrownDb extends FakeDb {
    get isOpen() {
      return !this.closed;
    }
    close() {
      super.close();
      throw new Error("native close completed before throwing");
    }
  }
  const db = new ClosedThenThrownDb();
  let callbackCalls = 0;
  let observed: { open: boolean; finalized: boolean[] } | undefined;
  let prepareError: unknown;
  const closedError = new Error("prepare on a closed database");
  const adapter = createNodeSqliteAdapterFromDatabase(db, ":memory:", {
    onClosed: () => {
      callbackCalls++;
      observed = { open: adapter.open, finalized: db.statements.map((s) => s.finalized) };
      try {
        adapter.prepare("SELECT 1");
      } catch (error) {
        prepareError = error;
      }
    },
  });
  adapter.prepare("SELECT 1");
  const prepare = t.mock.method(db, "prepare", () => {
    throw closedError;
  });

  adapter.close();
  adapter.close();

  assert.equal(db.isOpen, false);
  assert.equal(adapter.open, false);
  assert.deepEqual(observed, { open: false, finalized: [true] });
  assert.equal(callbackCalls, 1);
  assert.equal(prepare.mock.callCount(), 1, "the callback must observe an empty cache");
  assert.equal(prepareError, closedError);
});

const refusedCloseWitnesses: Array<{ name: string; read: () => unknown }> = [
  { name: "open", read: () => true },
  { name: "undefined", read: () => undefined },
  { name: "null", read: () => null },
  { name: "zero", read: () => 0 },
  {
    name: "throwing",
    read: () => {
      throw new Error("native state is unreadable");
    },
  },
];
for (const { name, read } of refusedCloseWitnesses) {
  for (const outcome of ["throws", "returns"] as const) {
    test(`node adapter retains resources when close ${outcome} with a ${name} witness`, (t) => {
      const db = new FakeDb();
      Object.defineProperty(db, "isOpen", { get: read });
      const close = t.mock.method(db, "close", () => {
        if (outcome === "throws") throw new Error("driver close failed");
      });
      let callbackCalls = 0;
      const adapter = createNodeSqliteAdapterFromDatabase(db, ":memory:", {
        onClosed: () => {
          callbackCalls++;
        },
      });
      adapter.prepare("SELECT 1");

      assert.doesNotThrow(() => adapter.close());
      // `open` is a boolean by contract and must never throw, whatever the
      // driver answers. The tri-state read is what keeps "could not answer"
      // distinguishable from "answered open".
      assert.equal(adapter.open, true, "open stays a boolean even for a " + name + " witness");
      assert.equal(
        adapter.readOpenWitness?.(),
        name === "open" ? "open" : "unreadable",
        "the tri-state read carries the answer open cannot"
      );
      assert.equal(close.mock.callCount(), 1);
      assert.equal(callbackCalls, 0);
      assert.equal(db.statements[0].finalized, false);
      adapter.prepare("SELECT 1");
      assert.equal(db.statements.length, 1, "the refused close must retain its cache entry");
    });

    test(`node release classifies the ${name} native witness when close ${outcome}`, () => {
      const db = new FakeDb();
      let closeCalls = 0;
      Object.defineProperty(db, "isTransaction", { value: false });
      Object.defineProperty(db, "isOpen", { get: read });
      db.close = () => {
        closeCalls++;
        if (outcome === "throws") throw new Error("driver close failed");
      };
      const adapter = createNodeSqliteAdapterFromDatabase(db, ":memory:");

      const result = releaseExclusiveLock(adapter);

      assert.equal(result.kind, "REFUSED_STILL_OPEN");
      if (result.kind === "REFUSED_STILL_OPEN") {
        assert.equal(
          result.reason,
          name === "open" ? "OPEN_STILL_TRUE" : "OPEN_WITNESS_UNREADABLE"
        );
      }
      assert.equal(closeCalls, 1);
    });
  }
}

test("node adapter preserves a native open witness when close returns without closing", (t) => {
  const db = new DatabaseSync(":memory:");
  const nativeClose = db.close.bind(db);
  const close = t.mock.method(db, "close", () => {});
  let callbackCalls = 0;
  const adapter = createNodeSqliteAdapterFromDatabase(db, ":memory:", {
    onClosed: () => {
      callbackCalls++;
    },
  });
  const statement = adapter.prepare("SELECT 1 AS value");

  try {
    const result = releaseExclusiveLock(adapter);
    assert.equal(db.isOpen, true);
    assert.equal(adapter.open, true);
    assert.equal(result.kind, "REFUSED_STILL_OPEN");
    if (result.kind === "REFUSED_STILL_OPEN") assert.equal(result.reason, "OPEN_STILL_TRUE");
    assert.equal(callbackCalls, 0);
    assert.equal(close.mock.callCount(), 1);
    assert.deepEqual(statement.get(), { value: 1 });
  } finally {
    db.close = nativeClose;
    adapter.close();
    if (db.isOpen) nativeClose();
  }
});

test("node factory releases resources when native close throws after closing", async (t) => {
  const signals = ["beforeExit", "SIGINT", "SIGTERM"] as const;
  const before = signals.map((signal) => process.listenerCount(signal));
  const priorListeners = signals.map((signal) => process.rawListeners(signal));
  const schedule = t.mock.method(globalThis, "setInterval");
  const cancel = t.mock.method(globalThis, "clearInterval");
  const adapter = await createNodeSqliteAdapter(":memory:");
  const ownedListeners = signals.map((signal, i) =>
    process.rawListeners(signal).filter((listener) => !priorListeners[i].includes(listener))
  );
  const db = adapter.raw as DatabaseSync;
  const nativeClose = db.close.bind(db);
  const nativeExec = db.exec.bind(db);
  const pragmas: string[] = [];
  let closeCalls = 0;
  db.exec = (sql: string) => {
    if (/^\s*PRAGMA\b/i.test(sql)) pragmas.push(sql);
    return nativeExec(sql);
  };
  db.close = () => {
    closeCalls++;
    nativeClose();
    throw new Error("close threw after the native handle closed");
  };

  try {
    assert.equal(schedule.mock.callCount(), 1);
    const timer = schedule.mock.calls[0].result;
    assert.ok(timer);
    const cancellations = () =>
      cancel.mock.calls.filter((call) => call.arguments[0] === timer).length;

    const result = releaseExclusiveLock(adapter);
    assert.equal(db.isOpen, false);
    assert.equal(adapter.open, false);
    assert.deepEqual(result, { kind: "CLOSED" });
    assert.throws(() => db.isTransaction, { code: "ERR_INVALID_STATE" });
    assert.equal(adapter.inTransaction, false);
    assert.equal(closeCalls, 1);
    assert.equal(cancellations(), 1);
    assert.deepEqual(
      signals.map((signal) => process.listenerCount(signal)),
      before
    );
    assert.deepEqual(pragmas, []);

    adapter.close();
    assert.equal(closeCalls, 1);
    assert.equal(cancellations(), 1, "repeated close must not clean the interval twice");
    assert.deepEqual(pragmas, [], "repeated close must not run the pre-close checkpoint again");
  } finally {
    db.close = nativeClose;
    db.exec = nativeExec;
    if (db.isOpen) nativeClose();
    adapter.close();
    for (const call of schedule.mock.calls) {
      if (call.result) clearInterval(call.result);
    }
    for (const [i, signal] of signals.entries()) {
      for (const listener of ownedListeners[i]) process.removeListener(signal, listener);
    }
  }
});

test("node adapter answers the tri-state read across close", () => {
  const adapter = createNodeSqliteAdapterFromDatabase(new DatabaseSync(":memory:"), ":memory:");

  assert.equal(adapter.readOpenWitness?.(), "open");
  adapter.close();
  assert.equal(
    adapter.readOpenWitness?.(),
    "closed",
    "a closed handle must not keep answering open"
  );
  assert.equal(adapter.open, false);
});

// Presence detection reads the driver too: a `has` trap that throws must become
// an unreadable answer, not an escape from a boolean getter.
test("node adapter treats a throwing membership check as unreadable", () => {
  const db = new DatabaseSync(":memory:");
  const proxy = new Proxy(db, {
    get(target, prop) {
      const value = Reflect.get(target, prop, target);
      return typeof value === "function" ? value.bind(target) : value;
    },
    has(target, prop) {
      if (prop === "isOpen") throw new Error("has trap exploded");
      return Reflect.has(target, prop);
    },
  });
  const adapter = createNodeSqliteAdapterFromDatabase(proxy, ":memory:");

  assert.equal(adapter.readOpenWitness?.(), "unreadable");
  assert.equal(adapter.open, true, "open must not throw");

  // close() checks the same operator to confirm the native state, so it cannot
  // confirm closure either. The adapter keeps its flag rather than fabricating
  // a closed handle, and the reader keeps answering unreadable.
  adapter.close();
  assert.equal(adapter.readOpenWitness?.(), "unreadable");
  assert.equal(adapter.open, true);
});

// The sweep runs after the flag is cleared, so a statement whose membership
// check throws must not abort it: the entries after it still have to finalize,
// and the cache clear and onClosed depend on the loop reaching its end.
test("node adapter finishes the close sweep when a statement membership check throws", () => {
  const db = new FakeDb();
  const hostile = new FakeStatement("SELECT hostile");
  const ordinary = new FakeStatement("SELECT ordinary");
  let prepares = 0;
  db.prepare = ((sql: string) => {
    prepares += 1;
    if (sql === "SELECT hostile") {
      return new Proxy(hostile, {
        get(target, prop) {
          const value = Reflect.get(target, prop, target);
          return typeof value === "function" ? value.bind(target) : value;
        },
        has() {
          throw new Error("has trap exploded");
        },
      });
    }
    return ordinary;
  }) as unknown as typeof db.prepare;

  let closed = 0;
  const adapter = createNodeSqliteAdapterFromDatabase(db, ":memory:", {
    onClosed: () => {
      closed += 1;
    },
  });
  adapter.prepare("SELECT hostile");
  adapter.prepare("SELECT ordinary");
  assert.equal(prepares, 2);

  assert.doesNotThrow(() => adapter.close());
  assert.equal(closed, 1, "onClosed must still run after the sweep");
  assert.equal(adapter.readOpenWitness?.(), "closed");
  assert.equal(hostile.finalized, false, "the hostile entry could not be finalized");
  assert.equal(ordinary.finalized, true, "the sweep must continue past the hostile entry");

  // A cleared cache re-prepares; a retained one would answer from the cache.
  adapter.prepare("SELECT ordinary");
  assert.equal(prepares, 3, "the sweep must reach the cache clear");
});

// `open` has to follow the driver, not the adapter's own flag: a caller can
// close the handle it owns, and then the adapter still reports what it saw.
test("the adapter's open follows the driver when it closes underneath", () => {
  const db = new DatabaseSync(":memory:");
  const adapter = createNodeSqliteAdapterFromDatabase(
    db as unknown as NodeSqliteDatabaseLike,
    ":memory:"
  );

  db.close();

  assert.equal(adapter.readOpenWitness(), "closed");
  assert.equal(adapter.open, false);
});

// A caller owns the handle it closes: the adapter's own flag stays true through
// that, so a release has to read the driver's state instead of refusing as
// unknown -- a refusal leaves the cache, the interval and the listeners in place
// on a handle nobody can use.
test("a handle closed underneath is released rather than refused as unknown", () => {
  const db = new DatabaseSync(":memory:");
  let closedHooks = 0;
  const adapter = createNodeSqliteAdapterFromDatabase(
    db as unknown as NodeSqliteDatabaseLike,
    ":memory:",
    { onClosed: () => void closedHooks++ }
  );
  adapter.prepare("SELECT 1").get();

  db.close();

  assert.equal(adapter.readOpenWitness(), "closed");
  assert.equal(adapter.inTransaction, false);
  assert.deepEqual(releaseExclusiveLock(adapter), { kind: "CLOSED" });
  // The witness alone could answer CLOSED and skip the close; the cleanup is the
  // reason this path exists, so the hook and the cache have to show for it.
  assert.equal(closedHooks, 1, "the release must run the close cleanup");
  assert.throws(
    () => adapter.prepare("SELECT 1"),
    { code: "ERR_INVALID_STATE" },
    "the sweep must clear the cache: a re-prepare of the same SQL reaches the closed driver"
  );
});

// Production reaches this shape through driverFactory, which wraps the driver
// with no close hooks: nothing in it checkpoints or resets listeners on close.
// The release must still report the close it observed, and it has to read that
// from the closed handle. node:sqlite's transaction flag throws
// ERR_INVALID_STATE once the database is closed, so an answer taken after the
// close cannot depend on it -- the read counter is what shows the release never
// asks the driver again.
test("a hookless adapter is released from the driver's own closed state", () => {
  const db = new DatabaseSync(":memory:");
  let transactionReads = 0;
  const counted = new Proxy(db, {
    get(target, prop) {
      if (prop === "isTransaction") transactionReads += 1;
      const value = Reflect.get(target, prop, target);
      return typeof value === "function" ? value.bind(target) : value;
    },
  });
  const adapter = createNodeSqliteAdapterFromDatabase(
    counted as unknown as NodeSqliteDatabaseLike,
    ":memory:"
  );
  adapter.prepare("SELECT 1").get();

  const result = releaseExclusiveLock(adapter);

  assert.deepEqual(result, { kind: "CLOSED" });
  assert.equal(adapter.open, false);
  assert.equal(db.isOpen, false);
  assert.equal(transactionReads, 1, "the release reads the flag once, before closing");
  assert.equal(adapter.inTransaction, false, "a closed handle holds no transaction");
  assert.equal(transactionReads, 1, "the closed answer must not reach the driver's flag");
});
