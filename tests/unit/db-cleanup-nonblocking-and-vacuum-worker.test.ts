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
const { hashFileSync } = await import("../../src/lib/db/backupFileHash.ts");
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

    const outDb2 = path.join(dir, "snapshot-with-hash.sqlite");
    const withHash = await backupPrune.runVacuumSnapshotWithHashInChild(
      { sqliteFile: srcDb, tempPath: outDb2 },
      { workerFile, execArgv: [] }
    );
    assert.equal(withHash.ok, true);
    assert.equal(withHash.sha256, hashFileSync(outDb2));

    const backupPruneSource = fs.readFileSync(
      path.join(root, "src/lib/db/cleanup/backupPrune.ts"),
      "utf8"
    );
    assert.ok(
      !backupPruneSource.includes("hashFileSync"),
      "backupPrune.ts must not import or call hashFileSync on the main thread"
    );
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("resetUsageHistory counts committed rows and purges call_logs artifacts when a later table fails", async () => {
  const db = core.getDbInstance();
  db.prepare("DELETE FROM usage_history").run();
  db.prepare("DELETE FROM call_logs").run();
  db.prepare("DELETE FROM proxy_logs").run();

  const oldIso = new Date(Date.now() - 10 * 86_400_000).toISOString();
  const logsDir = path.join(TEST_DATA_DIR, "call_logs", "2026-01-01");
  fs.mkdirSync(logsDir, { recursive: true });
  const art1 = "2026-01-01/later-fail-1.json";
  const art2 = "2026-01-01/later-fail-2.json";
  fs.writeFileSync(path.join(TEST_DATA_DIR, "call_logs", art1), "{}");
  fs.writeFileSync(path.join(TEST_DATA_DIR, "call_logs", art2), "{}");

  db.prepare(
    "INSERT INTO usage_history (provider, model, timestamp) VALUES ('p', 'm', ?), ('p', 'm', ?)"
  ).run(oldIso, oldIso);
  db.prepare(
    "INSERT INTO call_logs (id, timestamp, model, artifact_relpath) VALUES ('lf-1', ?, 'm', ?), ('lf-2', ?, 'm', ?)"
  ).run(oldIso, art1, oldIso, art2);
  db.prepare("INSERT INTO proxy_logs (id, timestamp) VALUES ('pl-1', ?)").run(oldIso);

  db.exec(`
    CREATE TRIGGER test_fail_proxy_logs_delete
    BEFORE DELETE ON proxy_logs
    BEGIN
      SELECT RAISE(ABORT, 'simulated proxy_logs failure');
    END;
  `);

  try {
    const res = await cleanup.resetUsageHistory("all");
    assert.equal(res.errors, 1);
    assert.equal(res.deletedUsageHistory, 2);
    assert.equal(res.deletedCallLogs, 2);
    assert.equal(res.deleted, 4);
    assert.equal(res.deletedCallLogArtifacts, 2);
    assert.equal(res.deletedArtifacts, 2);
    assert.equal(fs.existsSync(path.join(TEST_DATA_DIR, "call_logs", art1)), false);
    assert.equal(fs.existsSync(path.join(TEST_DATA_DIR, "call_logs", art2)), false);
  } finally {
    db.exec("DROP TRIGGER IF EXISTS test_fail_proxy_logs_delete");
    db.prepare("DELETE FROM proxy_logs").run();
  }
});

test("executeUsageReset preserves surviving call_logs artifacts on mid-batch failure (all and timed)", async () => {
  const db = core.getDbInstance();
  const logsRoot = path.join(TEST_DATA_DIR, "call_logs");
  fs.rmSync(logsRoot, { recursive: true, force: true });
  fs.mkdirSync(path.join(logsRoot, "2026-01-02"), { recursive: true });

  const oldIso = new Date(Date.now() - 14 * 86_400_000).toISOString();
  const recentIso = new Date().toISOString();
  const makeArtifact = (name: string) => {
    const rel = `2026-01-02/${name}.json`;
    fs.writeFileSync(path.join(logsRoot, rel), "{}");
    return rel;
  };

  // 1) Period = "all" mid-batch failure on call_logs (batchSize = 2, 4 rows, row 3 aborts)
  db.prepare("DELETE FROM call_logs").run();
  const allArts = ["all-1", "all-2", "all-3", "all-4"].map(makeArtifact);
  const insertCallLog = db.prepare(
    "INSERT INTO call_logs (id, timestamp, model, artifact_relpath) VALUES (?, ?, 'm', ?)"
  );
  allArts.forEach((rel, idx) => insertCallLog.run(`all-${idx + 1}`, oldIso, rel));

  db.exec(`
    CREATE TRIGGER test_fail_call_logs_row3
    BEFORE DELETE ON call_logs
    WHEN OLD.id = 'all-3'
    BEGIN
      SELECT RAISE(ABORT, 'simulated mid-batch failure');
    END;
  `);

  try {
    const allResult = {
      deleted: 0,
      deletedCallLogs: 0,
      deletedCallLogArtifacts: 0,
      deletedArtifacts: 0,
      errors: 0,
    };
    await usagePurge.executeUsageReset(
      "all",
      null,
      [{ table: "call_logs", column: "timestamp", cutoff: "iso", resultKey: "deletedCallLogs" }],
      allResult,
      { batchSize: 2 }
    );
    assert.equal(allResult.errors, 1);
    assert.equal(allResult.deletedCallLogs, 2);
    assert.equal(allResult.deleted, 2);
    assert.equal(allResult.deletedCallLogArtifacts, 2);
    assert.equal(allResult.deletedArtifacts, 2);
    assert.equal(fs.existsSync(path.join(logsRoot, allArts[0])), false);
    assert.equal(fs.existsSync(path.join(logsRoot, allArts[1])), false);
    assert.equal(fs.existsSync(path.join(logsRoot, allArts[2])), true);
    assert.equal(fs.existsSync(path.join(logsRoot, allArts[3])), true);
  } finally {
    db.exec("DROP TRIGGER IF EXISTS test_fail_call_logs_row3");
    db.prepare("DELETE FROM call_logs").run();
    fs.rmSync(logsRoot, { recursive: true, force: true });
  }

  // 2) Period = "7d" mid-batch failure on call_logs (4 expired + 1 recent, row 3 aborts)
  fs.mkdirSync(path.join(logsRoot, "2026-01-03"), { recursive: true });
  const timedArts = ["exp-1", "exp-2", "exp-3", "exp-4", "recent-1"].map(
    (name) => {
      const rel = `2026-01-03/${name}.json`;
      fs.writeFileSync(path.join(logsRoot, rel), "{}");
      return rel;
    }
  );
  for (let i = 0; i < 4; i++) {
    insertCallLog.run(`exp-${i + 1}`, oldIso, timedArts[i]);
  }
  insertCallLog.run("recent-1", recentIso, timedArts[4]);

  db.exec(`
    CREATE TRIGGER test_fail_timed_call_logs_row3
    BEFORE DELETE ON call_logs
    WHEN OLD.id = 'exp-3'
    BEGIN
      SELECT RAISE(ABORT, 'simulated timed mid-batch failure');
    END;
  `);

  try {
    const cutoffIso = new Date(Date.now() - 7 * 86_400_000).toISOString();
    const timedResult = {
      deleted: 0,
      deletedCallLogs: 0,
      deletedCallLogArtifacts: 0,
      deletedArtifacts: 0,
      errors: 0,
    };
    await usagePurge.executeUsageReset(
      "7d",
      cutoffIso,
      [{ table: "call_logs", column: "timestamp", cutoff: "iso", resultKey: "deletedCallLogs" }],
      timedResult,
      { batchSize: 2 }
    );
    assert.equal(timedResult.errors, 1);
    assert.equal(timedResult.deletedCallLogs, 2);
    assert.equal(timedResult.deleted, 2);
    assert.equal(timedResult.deletedCallLogArtifacts, 2);
    assert.equal(timedResult.deletedArtifacts, 2);
    assert.equal(fs.existsSync(path.join(logsRoot, timedArts[0])), false);
    assert.equal(fs.existsSync(path.join(logsRoot, timedArts[1])), false);
    assert.equal(fs.existsSync(path.join(logsRoot, timedArts[2])), true);
    assert.equal(fs.existsSync(path.join(logsRoot, timedArts[3])), true);
    assert.equal(fs.existsSync(path.join(logsRoot, timedArts[4])), true);
  } finally {
    db.exec("DROP TRIGGER IF EXISTS test_fail_timed_call_logs_row3");
    db.prepare("DELETE FROM call_logs").run();
    fs.rmSync(logsRoot, { recursive: true, force: true });
  }
});
