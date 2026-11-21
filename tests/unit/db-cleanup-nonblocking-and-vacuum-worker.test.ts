import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import Database from "better-sqlite3";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cleanup-nonblocking-"));
const originalDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const cleanup = await import("../../src/lib/db/cleanup.ts");
const usagePurge = await import("../../src/lib/db/cleanup/usagePurge.ts");
const backupPrune = await import("../../src/lib/db/cleanup/backupPrune.ts");
const quotaSnapshots = await import("../../src/lib/db/quotaSnapshots.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
});

async function measureEventLoopTicks<T>(fn: () => Promise<T>): Promise<{ result: T; ticks: number }> {
  let ticks = 0;
  let active = true;
  const tick = () => {
    if (!active) return;
    ticks++;
    setImmediate(tick);
  };
  setImmediate(tick);
  try {
    const result = await fn();
    return { result, ticks };
  } finally {
    active = false;
  }
}

test("cleanupOldSnapshots deletes in bounded batches and yields to the event loop", async () => {
  const db = core.getDbInstance();
  db.prepare("DELETE FROM quota_snapshots").run();
  const oldIso = new Date(Date.now() - 120 * 86_400_000).toISOString();
  const insert = db.prepare(
    "INSERT INTO quota_snapshots (provider, connection_id, window_key, remaining_percentage, created_at) VALUES ('p', 'c1', '5h', 50, ?)"
  );
  db.exec("BEGIN");
  for (let i = 0; i < 25; i++) insert.run(oldIso);
  db.exec("COMMIT");

  const { result: deleted, ticks } = await measureEventLoopTicks(() =>
    quotaSnapshots.cleanupOldSnapshots(30, { batchSize: 7 })
  );

  assert.equal(deleted, 25);
  assert.ok(ticks >= 3, `expected >= 3 event-loop yields across 4 batches, got ${ticks}`);
  const remaining = (
    db.prepare("SELECT COUNT(*) AS n FROM quota_snapshots").get() as { n: number }
  ).n;
  assert.equal(remaining, 0);
});

test("deleteAllFromTable and deleteWhereInBatches yield between batches", async () => {
  const db = core.getDbInstance();
  db.exec("CREATE TABLE IF NOT EXISTS test_batch_items (id INTEGER PRIMARY KEY, tag TEXT)");
  db.prepare("DELETE FROM test_batch_items").run();
  const insert = db.prepare("INSERT INTO test_batch_items (tag) VALUES (?)");
  db.exec("BEGIN");
  for (let i = 0; i < 22; i++) insert.run(i < 15 ? "old" : "keep");
  db.exec("COMMIT");

  const whereRun = await measureEventLoopTicks(() =>
    usagePurge.deleteWhereInBatches("test_batch_items", "tag = ?", ["old"], { batchSize: 5 })
  );
  assert.equal(whereRun.result, 15);
  assert.ok(whereRun.ticks >= 3, `expected >= 3 yields for deleteWhereInBatches, got ${whereRun.ticks}`);

  const allRun = await measureEventLoopTicks(() =>
    usagePurge.deleteAllFromTable("test_batch_items", { batchSize: 3 })
  );
  assert.equal(allRun.result, 7);
  assert.ok(allRun.ticks >= 2, `expected >= 2 yields for deleteAllFromTable, got ${allRun.ticks}`);
});

test("cleanupMemoryEntries deletes expired rows and runs memory_fts optimize once", async () => {
  const db = core.getDbInstance();
  db.prepare("DELETE FROM memories").run();
  const oldIso = new Date(Date.now() - 365 * 86_400_000).toISOString();
  const insert = db.prepare(
    "INSERT INTO memories (id, api_key_id, session_id, type, key, content, created_at, updated_at) VALUES (?, 'k1', 's1', 'factual', ?, ?, ?, ?)"
  );
  db.exec("BEGIN");
  for (let i = 0; i < 5; i++) {
    insert.run(`mem-${i}`, `key-${i}`, `content-${i}`, oldIso, oldIso);
  }
  db.exec("COMMIT");

  const res = await cleanup.cleanupMemoryEntries();
  assert.equal(res.errors, 0);
  assert.equal(res.deleted, 5);
  const remaining = (db.prepare("SELECT COUNT(*) AS n FROM memories").get() as { n: number }).n;
  assert.equal(remaining, 0);
});

test("resetUsageHistory works without synchronous db.transaction", async () => {
  const db = core.getDbInstance();
  const oldIso = new Date(Date.now() - 10 * 86_400_000).toISOString();
  db.prepare(
    "INSERT INTO call_logs (id, timestamp, model) VALUES ('reset-test-1', ?, 'm')"
  ).run(oldIso);

  const res = await cleanup.resetUsageHistory("all");
  assert.equal(res.errors, 0);
  assert.ok(res.deletedCallLogs >= 1);
});

test("standalone build ships an executable vacuum snapshot worker without tsx", async () => {
  const root = process.cwd();
  const dir = fs.mkdtempSync(path.join(root, ".vacuum-package-"));
  const srcDb = path.join(dir, "source.sqlite");
  const outDb = path.join(dir, "snapshot.sqlite");
  const raw = new Database(srcDb);
  raw.exec("CREATE TABLE sample (id INTEGER PRIMARY KEY, val TEXT); INSERT INTO sample VALUES (1, 'ok');");
  raw.close();

  try {
    execFileSync(process.execPath, ["scripts/build/colocate-standalone.mjs"], {
      cwd: root,
      env: { ...process.env, OMNIROUTE_STANDALONE_DIR: dir },
      stdio: "pipe",
    });
    const workerFile = path.join(dir, "src/lib/db/cleanup/vacuumSnapshotWorker.js");
    assert.ok(fs.existsSync(workerFile), "vacuumSnapshotWorker.js must be colocated");
    assert.equal(
      JSON.parse(fs.readFileSync(path.join(path.dirname(workerFile), "package.json"), "utf8")).type,
      "module"
    );

    const created = await backupPrune.runVacuumSnapshotInChild(
      { sqliteFile: srcDb, tempPath: outDb },
      { workerFile, execArgv: [] }
    );
    assert.equal(created, true);
    assert.ok(fs.existsSync(outDb), "VACUUM INTO snapshot file must exist");

    const snap = new Database(outDb, { readonly: true });
    const row = snap.prepare("SELECT val FROM sample WHERE id = 1").get() as { val: string };
    snap.close();
    assert.equal(row.val, "ok");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
