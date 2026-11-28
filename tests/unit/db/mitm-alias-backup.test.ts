import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

// setMitmAliasAll takes a routine backup after a successful write and none when the write
// throws. Backups are off in test processes; the helper lifts that for one call.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mitm-alias-backup-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const backupDb = await import("../../../src/lib/db/backup.ts");
const databaseSettings = await import("../../../src/lib/db/databaseSettings.ts");
const { tryOpenSync } = await import("../../../src/lib/db/adapters/driverFactory.ts");
const { setMitmAliasAll } = await import("../../../src/lib/db/models/mitmAlias.ts");

async function withRoutineBackupsOn<T>(fn: () => Promise<T>): Promise<T> {
  const saved = {
    argv: [...process.argv],
    execArgv: [...process.execArgv],
    env: process.env.NODE_ENV,
    testContext: process.env.NODE_TEST_CONTEXT,
    jestWorker: process.env.JEST_WORKER_ID,
  };
  delete process.env.DISABLE_SQLITE_AUTO_BACKUP;
  process.env.NODE_ENV = "production";
  delete process.env.NODE_TEST_CONTEXT;
  delete process.env.JEST_WORKER_ID;
  process.argv.splice(0, process.argv.length, process.execPath, "/opt/app/server.js");
  process.execArgv.length = 0;
  try {
    return await fn();
  } finally {
    process.argv.splice(0, process.argv.length, ...saved.argv);
    process.execArgv.push(...saved.execArgv);
    if (saved.env === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = saved.env;
    if (saved.testContext === undefined) delete process.env.NODE_TEST_CONTEXT;
    else process.env.NODE_TEST_CONTEXT = saved.testContext;
    if (saved.jestWorker === undefined) delete process.env.JEST_WORKER_ID;
    else process.env.JEST_WORKER_ID = saved.jestWorker;
    process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
  }
}

async function settledBackups() {
  // The routine backup copies in the background; give it time to land.
  const deadline = Date.now() + 5000;
  let list = await backupDb.listDbBackups();
  while (list.length === 0 && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    list = await backupDb.listDbBackups();
  }
  await new Promise((resolve) => setTimeout(resolve, 500));
  return backupDb.listDbBackups();
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("setMitmAliasAll backs up after a successful write and not after a failed one", async () => {
  databaseSettings.updateDatabaseSettings({
    backup: { autoBackupEnabled: true, autoBackupFrequency: "daily", keepLastNBackups: 5 },
  });
  await setMitmAliasAll("antigravity", { before: "antigravity/old" });

  // JSON.stringify throws on BigInt, so the write fails before anything is stored.
  await withRoutineBackupsOn(async () => {
    await assert.rejects(setMitmAliasAll("antigravity", { broken: 1n }), TypeError);
  });
  await new Promise((resolve) => setTimeout(resolve, 300));
  assert.deepEqual(await backupDb.listDbBackups(), [], "a failed write takes no backup");

  await withRoutineBackupsOn(() => setMitmAliasAll("antigravity", { after: "antigravity/new" }));
  const backups = await settledBackups();
  assert.equal(backups.length, 1, "a successful write takes one routine backup");
  const snapshot = tryOpenSync(path.join(core.DB_BACKUPS_DIR as string, backups[0].filename), {
    readonly: true,
  });
  assert.ok(snapshot, "backup must open");
  try {
    const row = snapshot!
      .prepare("SELECT value FROM key_value WHERE namespace = 'mitmAlias' AND key = ?")
      .get("antigravity") as { value: string } | undefined;
    assert.equal(row?.value, JSON.stringify({ after: "antigravity/new" }));
  } finally {
    snapshot!.close();
  }
});
