import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";

import Database from "better-sqlite3";

import { createBetterSqliteAdapter } from "../../src/lib/db/adapters/betterSqliteAdapter";
import { createBunSqliteAdapter } from "../../src/lib/db/adapters/bunSqliteAdapter";
import type { BunSqliteDatabaseLike } from "../../src/lib/db/adapters/bunSqliteAdapter";
import { createNodeSqliteAdapterFromDatabase } from "../../src/lib/db/adapters/nodeSqliteShared";
import { createSqlJsAdapter } from "../../src/lib/db/adapters/sqljsAdapter";
import type { SqliteAdapter } from "../../src/lib/db/adapters/types";
import { releaseExclusiveLock } from "../../src/lib/db/exclusiveLockRelease";

// The helper closes one caller-owned handle. These arms pin what each outcome
// means: which observation produced it, whether the handle was still open, and
// whether the close was actually attempted. Arm A is the anchor that shows a
// holder which wrote really does block a reader, so the rest are not vacuous.

type ChildResult = { code: number | null; stdout: string; stderr: string };

function runChild(script: string): Promise<ChildResult> {
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      ["--import", "tsx/esm", "--input-type=module", "-e", script],
      { cwd: process.cwd(), env: process.env, stdio: ["ignore", "pipe", "pipe"] }
    );
    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8").on("data", (chunk) => (stdout += chunk));
    child.stderr.setEncoding("utf8").on("data", (chunk) => (stderr += chunk));
    child.once("error", reject);
    child.once("exit", (code) => resolve({ code, stdout, stderr }));
  });
}

function tempDb(t: { after: (fn: () => void) => void }): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "exclusive-lock-release-"));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  return path.join(dir, "lock.db");
}

function writer(file: string): Database.Database {
  const db = new Database(file);
  db.pragma("journal_mode = WAL");
  db.pragma("locking_mode = EXCLUSIVE");
  db.exec("CREATE TABLE IF NOT EXISTS t (id INTEGER PRIMARY KEY, v TEXT)");
  db.prepare("INSERT INTO t (v) VALUES ('held')").run();
  return db;
}

function readerThrew(file: string): { threw: boolean; message: string; ms: number } {
  const started = Date.now();
  const reader = new Database(file, { timeout: 0 });
  try {
    reader.prepare("SELECT count(*) AS n FROM t").get();
    return { threw: false, message: "", ms: Date.now() - started };
  } catch (error) {
    return { threw: true, message: String(error), ms: Date.now() - started };
  } finally {
    reader.close();
  }
}

function stubAdapter(overrides: Record<string, unknown>): SqliteAdapter {
  return {
    driver: "better-sqlite3",
    open: false,
    name: "stub",
    inTransaction: false,
    prepare: () => {
      throw new Error("not used");
    },
    exec: () => {},
    pragma: () => undefined,
    transaction: () => () => undefined,
    immediate: () => {},
    backup: async () => {},
    checkpoint: () => {},
    close: () => {},
    ...overrides,
  } as unknown as SqliteAdapter;
}

test("Arm A: a holder that wrote blocks a reader, a read-only holder does not", async (t) => {
  // The block comes from the write, not from the exclusive mode: an exclusive
  // holder that only read still blocks, so the clean contrast must be a
  // holder that took no exclusive lock at all.
  const written = tempDb(t);
  const seeded = new Database(written);
  seeded.pragma("journal_mode = WAL");
  seeded.exec("CREATE TABLE t (id INTEGER PRIMARY KEY, v TEXT)");
  seeded.close();
  const holder = new Database(written);
  holder.pragma("locking_mode = EXCLUSIVE");
  holder.prepare("SELECT count(*) AS n FROM t").get();
  holder.prepare("INSERT INTO t (v) VALUES ('held')").run();
  t.after(() => holder.close());
  const blocked = readerThrew(written);
  assert.equal(blocked.threw, true);
  assert.match(blocked.message, /busy|locked/i);

  const clean = tempDb(t);
  const cleanSeed = new Database(clean);
  cleanSeed.pragma("journal_mode = WAL");
  cleanSeed.exec("CREATE TABLE t (id INTEGER PRIMARY KEY, v TEXT)");
  cleanSeed.close();
  const readOnly = new Database(clean);
  readOnly.prepare("SELECT count(*) AS n FROM t").get();
  t.after(() => readOnly.close());
  const through = readerThrew(clean);
  assert.equal(through.threw, false);
  assert.ok(through.ms < 1000, `read-only holder delayed the reader by ${through.ms}ms`);
});

test("Arm B: a released holder leaves a readable database", async (t) => {
  const file = tempDb(t);
  const db = writer(file);
  const adapter = createBetterSqliteAdapter(db);
  const outcome = releaseExclusiveLock(adapter);
  assert.deepEqual(outcome, { kind: "CLOSED" });
  assert.equal(adapter.open, false);

  // No other connection may be opened between the release and this read.
  const reader = new Database(file, { timeout: 0 });
  try {
    assert.equal((reader.prepare("SELECT count(*) AS n FROM t").get() as { n: number }).n, 1);
  } finally {
    reader.close();
  }

  const child = await runChild(
    `import Database from "better-sqlite3";
     const db = new Database(${JSON.stringify(file)}, { timeout: 0 });
     const row = db.prepare("SELECT count(*) AS n FROM t").get();
     db.close();
     console.log(JSON.stringify(row));`
  );
  assert.equal(child.code, 0, child.stderr);
  assert.match(child.stdout, /"n":1/);
});

test("Arm C: an open transaction is refused and left alone", async (t) => {
  const file = tempDb(t);
  const db = new Database(file);
  db.pragma("journal_mode = WAL");
  db.exec("CREATE TABLE t (id INTEGER PRIMARY KEY, v TEXT)");
  db.exec("BEGIN IMMEDIATE");
  db.prepare("INSERT INTO t (v) VALUES ('pending')").run();
  const adapter = createBetterSqliteAdapter(db);

  const outcome = releaseExclusiveLock(adapter);
  assert.deepEqual(outcome, { kind: "REFUSED_OPEN_TRANSACTION" });
  assert.equal(adapter.open, true);
  assert.equal(adapter.inTransaction, true);

  db.exec("COMMIT");
  db.close();
  const check = new Database(file);
  try {
    assert.equal((check.prepare("SELECT count(*) AS n FROM t").get() as { n: number }).n, 1);
  } finally {
    check.close();
  }
});

test("Arm D: a close that returns without closing is a still-open refusal", async (t) => {
  const file = tempDb(t);
  const db = new Database(file);
  const adapter = createBetterSqliteAdapter(db);
  (adapter as unknown as { close: () => void }).close = () => {};
  const outcome = releaseExclusiveLock(adapter);
  assert.deepEqual(outcome, { kind: "REFUSED_STILL_OPEN", reason: "OPEN_STILL_TRUE" });
  assert.equal(adapter.open, true);
  db.close();
});

test("Arm E(a): a stub without transaction state is unknown, not closed", () => {
  let closed = 0;
  const adapter = stubAdapter({ open: true, close: () => (closed += 1) });
  delete (adapter as unknown as Record<string, unknown>).inTransaction;
  const outcome = releaseExclusiveLock(adapter);
  assert.deepEqual(outcome, { kind: "REFUSED_UNKNOWN_TRANSACTION" });
  assert.equal(closed, 0);
});

test("Arm E(b): sql.js has no transaction state, so it is unknown", async (t) => {
  const file = tempDb(t);
  const adapter = await createSqlJsAdapter(file);
  let closed = 0;
  const original = adapter.close.bind(adapter);
  (adapter as unknown as { close: () => void }).close = () => {
    closed += 1;
    original();
  };
  const outcome = releaseExclusiveLock(adapter);
  assert.deepEqual(outcome, { kind: "REFUSED_UNKNOWN_TRANSACTION" });
  assert.equal(closed, 0);
});

test("Arm F: the node:sqlite getter reports driver state and survives close", async (t) => {
  const file = tempDb(t);
  const db = new DatabaseSync(file);
  const adapter = createNodeSqliteAdapterFromDatabase(db, file);
  assert.equal(adapter.inTransaction, false);
  db.exec("CREATE TABLE t (id INTEGER PRIMARY KEY)");
  db.exec("BEGIN");
  assert.equal(adapter.inTransaction, true);
  db.exec("COMMIT");
  assert.equal(adapter.inTransaction, false);
  db.exec("BEGIN IMMEDIATE");
  assert.equal(adapter.inTransaction, true);
  db.exec("ROLLBACK");
  assert.equal(adapter.inTransaction, false);
  adapter.close();
  assert.equal(adapter.inTransaction, false);
});

test("Arm G: a live cursor makes the close throw, and ending it unblocks the retry", async (t) => {
  const file = tempDb(t);
  const db = writer(file);
  const adapter = createBetterSqliteAdapter(db);
  let closes = 0;
  const originalClose = adapter.close.bind(adapter);
  (adapter as unknown as { close: () => void }).close = () => {
    closes += 1;
    originalClose();
  };

  const cursor = db.prepare("SELECT v FROM t").iterate();
  cursor.next();
  const outcome = releaseExclusiveLock(adapter);
  assert.equal(outcome.kind, "REFUSED_STILL_OPEN");
  assert.equal((outcome as { reason: string }).reason, "CLOSE_THREW");
  assert.match(String((outcome as { message?: string }).message), /iterator|busy|locked/i);
  assert.equal(closes, 1);
  assert.equal(adapter.open, true);

  cursor.return();
  const retry = releaseExclusiveLock(adapter);
  assert.deepEqual(retry, { kind: "CLOSED" });
  assert.equal(adapter.open, false);
});

test("Arm H: a transaction getter that throws is unknown, and nothing is closed", () => {
  let closed = 0;
  const adapter = stubAdapter({ open: true, close: () => (closed += 1) });
  Object.defineProperty(adapter, "inTransaction", {
    get() {
      throw new Error("transaction state unavailable");
    },
  });
  const outcome = releaseExclusiveLock(adapter);
  assert.deepEqual(outcome, { kind: "REFUSED_UNKNOWN_TRANSACTION" });
  assert.equal(closed, 0);
});

test("Arm I: an unreadable witness after the close is not a still-open handle", () => {
  let closed = 0;
  let didClose = false;
  const adapter = stubAdapter({
    inTransaction: false,
    close: () => {
      closed += 1;
      didClose = true;
    },
  });
  Object.defineProperty(adapter, "open", {
    get() {
      // Throws only after the close returned, which is the point of this arm.
      if (didClose) throw new Error("state read failed after close");
      return true;
    },
  });
  const outcome = releaseExclusiveLock(adapter);
  assert.deepEqual(outcome, { kind: "REFUSED_STILL_OPEN", reason: "OPEN_WITNESS_UNREADABLE" });
  assert.equal(closed, 1);
});

test("Arm J: the bun getter forwards driver state and does not read it after close", () => {
  let nativeReads = 0;
  let open = true;
  let inTransaction = false;
  const handle = {
    query: () => ({
      run: () => ({ changes: 0, lastInsertRowid: 0 }),
      get: () => undefined,
      all: () => [],
    }),
    exec: () => {},
    transaction: <T>(fn: (...args: unknown[]) => T) => fn,
    close: () => {
      open = false;
    },
    get inTransaction() {
      nativeReads += 1;
      if (!open) throw new Error("Database has closed");
      return inTransaction;
    },
  } as unknown as BunSqliteDatabaseLike;

  const adapter = createBunSqliteAdapter(handle, "stub.bun");
  assert.equal(adapter.inTransaction, false);
  inTransaction = true;
  assert.equal(adapter.inTransaction, true);
  inTransaction = false;
  assert.equal(adapter.inTransaction, false);

  const readsBeforeClose = nativeReads;
  adapter.close();
  assert.equal(adapter.inTransaction, false);
  assert.equal(nativeReads, readsBeforeClose, "native getter was read after close");
});

test("Arm L: a driver that refuses the close leaves the handle open, and it says so", () => {
  // The node:sqlite adapter swallows the driver's refusal, so the local flag
  // must follow the driver; otherwise the helper would report CLOSED for a
  // handle the driver never closed.
  const handle = {
    isOpen: true,
    isTransaction: false,
    prepare: () => ({
      run: () => ({ changes: 0, lastInsertRowid: 0 }),
      get: () => undefined,
      all: () => [],
    }),
    exec: () => {},
    close: () => {
      throw new Error("database is busy");
    },
  };
  const adapter = createNodeSqliteAdapterFromDatabase(handle, ":memory:");
  const outcome = releaseExclusiveLock(adapter);
  assert.deepEqual(outcome, { kind: "REFUSED_STILL_OPEN", reason: "OPEN_STILL_TRUE" });
  assert.equal(adapter.open, true);
  assert.equal(handle.isOpen, true);
});

test("Arm M: a close that took effect and then threw is closed", () => {
  // The mirror image: the handle is already closed when the call throws, so
  // the throw must not turn into a retryable CLOSE_THREW.
  let closed = false;
  const adapter = stubAdapter({
    inTransaction: false,
    close: () => {
      closed = true;
      throw new Error("reported a failure after the handle was released");
    },
  });
  Object.defineProperty(adapter, "open", {
    get() {
      return !closed;
    },
  });
  const outcome = releaseExclusiveLock(adapter);
  assert.deepEqual(outcome, { kind: "CLOSED" });
  assert.equal(closed, true);
});

test("Arm K: a release sets no pragma", (t) => {
  const file = tempDb(t);
  const db = writer(file);
  const adapter = createBetterSqliteAdapter(db);
  let pragmaCalls = 0;
  const originalPragma = adapter.pragma.bind(adapter);
  (adapter as unknown as { pragma: (s: string) => unknown }).pragma = (pragma: string) => {
    pragmaCalls += 1;
    return originalPragma(pragma);
  };
  const outcome = releaseExclusiveLock(adapter);
  assert.deepEqual(outcome, { kind: "CLOSED" });
  assert.equal(pragmaCalls, 0);
});
