import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-backup-complete-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const backupDb = await import("../../src/lib/db/backup.ts");
const databaseSettings = await import("../../src/lib/db/databaseSettings.ts");

const BACKUP_DIR = path.join(TEST_DATA_DIR, "db_backups");

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  const insert = db.prepare(
    "INSERT INTO provider_connections (id, provider, auth_type, name, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );
  for (let i = 0; i < 20; i++) insert.run(`conn-${i}`, "openai", "apikey", `c-${i}`, 1, now, now);
}

// better-sqlite3 creates the destination file when the copy STARTS, so a copy that fails midway
// leaves a partial file behind. This stub does the same and then rejects.
function failBackupAfterPartialWrite() {
  const db = core.getDbInstance();
  const original = db.backup;
  db.backup = async (destination: string) => {
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, Buffer.alloc(8192, "x"));
    throw new Error("disk full");
  };
  return () => {
    db.backup = original;
  };
}

function backupNames(): string[] {
  return fs.existsSync(BACKUP_DIR) ? fs.readdirSync(BACKUP_DIR) : [];
}

// The test runner makes backupDbFile skip routine reasons; hide the runner markers while `fn` runs.
async function asProductionProcess<R>(fn: () => Promise<R> | R): Promise<R> {
  const saved = {
    nodeEnv: process.env.NODE_ENV,
    vitest: process.env.VITEST,
    disable: process.env.DISABLE_SQLITE_AUTO_BACKUP,
    argv: [...process.argv],
    execArgv: [...process.execArgv],
  };
  delete process.env.NODE_ENV;
  delete process.env.VITEST;
  delete process.env.DISABLE_SQLITE_AUTO_BACKUP;
  process.argv = process.argv.filter((arg) => !arg.includes("test"));
  process.execArgv = process.execArgv.filter((arg) => !arg.includes("test"));
  try {
    return await fn();
  } finally {
    process.argv = saved.argv;
    process.execArgv = saved.execArgv;
    if (saved.nodeEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = saved.nodeEnv;
    if (saved.vitest !== undefined) process.env.VITEST = saved.vitest;
    if (saved.disable === undefined) delete process.env.DISABLE_SQLITE_AUTO_BACKUP;
    else process.env.DISABLE_SQLITE_AUTO_BACKUP = saved.disable;
  }
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a failed backup leaves no file under a backup name", async () => {
  const restore = failBackupAfterPartialWrite();
  try {
    const started = backupDb.backupDbFile("manual");
    assert.ok(started, "the backup is scheduled");
    await new Promise((resolve) => setTimeout(resolve, 50));
  } finally {
    restore();
  }
  assert.deepEqual(backupNames(), [], "a partial copy must not stay in the backup directory");
  assert.deepEqual(await backupDb.listDbBackups(), []);
});

test("a failed routine backup is retried after a short pause, not after the 60-minute throttle", async () => {
  databaseSettings.updateDatabaseSettings({
    backup: { autoBackupEnabled: true, autoBackupFrequency: "daily" },
  });

  const realNow = Date.now;
  let offsetMs = 3 * 60 * 60 * 1000; // past any throttle left by an earlier test
  Date.now = () => realNow() + offsetMs;
  try {
    await asProductionProcess(async () => {
      const restore = failBackupAfterPartialWrite();
      try {
        assert.ok(backupDb.backupDbFile("pre-write"), "the first routine backup is scheduled");
        await new Promise((resolve) => setTimeout(resolve, 50));
      } finally {
        restore();
      }

      assert.equal(
        backupDb.backupDbFile("pre-write"),
        null,
        "no hot retry loop right after a failure"
      );

      offsetMs += 61 * 1000;
      const retry = backupDb.backupDbFile("pre-write");
      assert.ok(
        retry,
        "the retry must run one minute later; the failed copy must not arm the hour"
      );
      await new Promise((resolve) => setTimeout(resolve, 500));
      assert.ok(backupNames().includes(retry.filename), "the retry produced a backup");
    });
  } finally {
    Date.now = realNow;
  }
});

test("completeDbBackup resolves only when the copy is whole and rejects when it fails", async () => {
  const done = await backupDb.completeDbBackup("manual");
  assert.ok(done, "a manual backup is always taken");
  const entry = (await backupDb.listDbBackups()).find((b) => b.id === done.filename);
  assert.ok(entry, "the file exists at the moment the promise resolves");
  assert.equal(entry.connectionCount, 20, "the copy holds every row when the promise resolves");

  const restore = failBackupAfterPartialWrite();
  try {
    await assert.rejects(() => backupDb.completeDbBackup("manual"), /disk full/);
  } finally {
    restore();
  }
  // Opening the first backup to count rows may leave SQLite sidecars next to it; ignore those.
  assert.deepEqual(
    backupNames().filter((name) => !name.startsWith(done.filename)),
    [],
    "the failed copy leaves nothing behind"
  );
});
