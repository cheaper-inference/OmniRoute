import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { createBetterSqliteAdapter } from "../../../src/lib/db/adapters/betterSqliteAdapter.ts";

const { tryOpenSync } = await import("../../../src/lib/db/adapters/driverFactory.ts");

// These rows exist to pin the better-sqlite3 adapter, so a host where the
// native addon does not load is a broken environment, not a reason to report
// coverage the module never provided. A missing driver fails the row.
function requireBetterSqlite() {
  const adapter = tryOpenSync(":memory:");
  if (!adapter) assert.fail("better-sqlite3 must be installed for this adapter's rows");
  try {
    assert.equal(
      adapter.driver,
      "better-sqlite3",
      "better-sqlite3 must be the driver these rows pin"
    );
  } catch (error) {
    // The driver that answered this open still owns the :memory: handle, so the
    // failing row releases it instead of leaving a handle behind. The branch
    // above opened nothing, so only this path has one to close.
    adapter.close();
    throw error;
  }
  return adapter;
}

// The witness row drives the adapter with a stand-in handle so it runs on every
// host: only the members the adapter touches are here, the open flag is read
// live from the caller's cell, and the counter shows each read reached it.
function fakeHandle(readOpen: () => unknown, onClose: () => void = () => {}) {
  let reads = 0;
  const handle = {
    get open() {
      reads += 1;
      return readOpen();
    },
    name: ":memory:",
    inTransaction: false,
    prepare: () => ({
      run: () => ({ changes: 1, lastInsertRowid: 1 }),
      get: () => undefined,
      all: () => [],
    }),
    exec: () => {},
    pragma: () => "wal",
    transaction(fn: (...args: unknown[]) => unknown) {
      return (...args: unknown[]) => fn(...args);
    },
    close: () => {
      onClose();
    },
  };
  return {
    handle: handle as unknown as Parameters<typeof createBetterSqliteAdapter>[0],
    reads: () => reads,
  };
}

describe("betterSqliteAdapter", () => {
  test("abre DB in-memory e executa CRUD básico", () => {
    const adapter = requireBetterSqlite();

    adapter.exec("CREATE TABLE test (id INTEGER PRIMARY KEY, val TEXT)");
    const result = adapter.prepare("INSERT INTO test (val) VALUES (?)").run("hello");
    assert.equal(result.changes, 1);

    const row = adapter
      .prepare("SELECT val FROM test WHERE id = ?")
      .get(result.lastInsertRowid) as {
      val: string;
    };
    assert.equal(row.val, "hello");

    const rows = adapter.prepare("SELECT * FROM test").all();
    assert.equal(rows.length, 1);

    adapter.close();
  });

  test("pragma retorna valor simples", () => {
    const adapter = requireBetterSqlite();

    const mode = adapter.pragma("journal_mode", { simple: true });
    assert.ok(typeof mode === "string");
    adapter.close();
  });

  test("transaction envolve operações em bloco atômico", () => {
    const adapter = requireBetterSqlite();

    adapter.exec("CREATE TABLE tx_test (id INTEGER PRIMARY KEY, val TEXT)");
    const insertFn = adapter.transaction(() => {
      adapter.prepare("INSERT INTO tx_test (val) VALUES (?)").run("a");
      adapter.prepare("INSERT INTO tx_test (val) VALUES (?)").run("b");
    });
    insertFn();

    const count = adapter.prepare("SELECT COUNT(*) as cnt FROM tx_test").get() as { cnt: number };
    assert.equal(count.cnt, 2);
    adapter.close();
  });

  test("driver é 'better-sqlite3'", () => {
    const adapter = requireBetterSqlite();
    assert.equal(adapter.driver, "better-sqlite3");
    adapter.close();
  });

  test("transaction com rollback em erro desfaz operações", () => {
    const adapter = requireBetterSqlite();

    adapter.exec("CREATE TABLE rollback_test (id INTEGER PRIMARY KEY, val TEXT NOT NULL)");
    const insertWithError = adapter.transaction(() => {
      adapter.prepare("INSERT INTO rollback_test (val) VALUES (?)").run("before-error");
      throw new Error("force rollback");
    });

    assert.throws(() => insertWithError(), /force rollback/);

    const count = adapter.prepare("SELECT COUNT(*) as cnt FROM rollback_test").get() as {
      cnt: number;
    };
    assert.equal(count.cnt, 0, "Rollback deve ter desfeito o insert");
    adapter.close();
  });

  test("expõe o estado da transação sem vazar o driver bruto", () => {
    const adapter = requireBetterSqlite();

    assert.equal(adapter.inTransaction, false);
    const inspect = adapter.transaction(() => adapter.inTransaction);
    assert.equal(inspect(), true);
    assert.equal(adapter.inTransaction, false);

    adapter.close();
  });

  // The release reads this witness back after closing, so it has to answer from
  // the driver's own flag rather than a state copied at open time. The handle
  // here is a stand-in, so the row pins the adapter's mapping on every host
  // instead of disappearing with the native module.
  test("readOpenWitness follows the driver handle", () => {
    let openValue: unknown = true;
    const live = fakeHandle(
      () => openValue,
      () => {
        openValue = false;
      }
    );
    const adapter = createBetterSqliteAdapter(live.handle);

    const readsBefore = live.reads();
    assert.equal(adapter.readOpenWitness?.(), "open");
    assert.equal(adapter.open, true);
    assert.equal(live.reads() - readsBefore, 2, "each witness read must reach the handle");

    adapter.close();
    assert.equal(adapter.readOpenWitness?.(), "closed");
    assert.equal(adapter.open, false);

    // A value that is not a boolean is not evidence that the handle closed.
    openValue = undefined;
    assert.equal(adapter.readOpenWitness?.(), "unreadable");
    assert.equal(adapter.open, true, "open stays a boolean and must not fabricate a close");

    const hostile = fakeHandle(() => {
      throw new Error("driver witness exploded");
    });
    const guarded = createBetterSqliteAdapter(hostile.handle);
    assert.equal(guarded.readOpenWitness?.(), "unreadable");
    assert.equal(guarded.open, true, "open must not throw when the driver cannot answer");
  });

  // The stand-in above is only worth its answers if the real handle gives the
  // same ones, so the pair is checked together: a fake that drifts from
  // better-sqlite3 cannot pass both rows.
  test("readOpenWitness answers the same on a real better-sqlite3 handle", () => {
    const adapter = requireBetterSqlite();

    assert.equal(adapter.readOpenWitness?.(), "open");
    assert.equal(adapter.open, true);

    adapter.close();
    assert.equal(adapter.readOpenWitness?.(), "closed");
    assert.equal(adapter.open, false);
  });
});
