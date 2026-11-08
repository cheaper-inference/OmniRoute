import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-prewrite-order-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "prewrite-order-api-key-secret";
// Setup writes below must not take snapshots; the env switch is lifted right before the probe.
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const backupDb = await import("../../src/lib/db/backup.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const databaseSettings = await import("../../src/lib/db/databaseSettings.ts");
const { tryOpenSync } = await import("../../src/lib/db/adapters/driverFactory.ts");

// `backupDbFile` is off in every test process. Lift that for one call, then restore it.
async function withRoutineBackupsOn<T>(fn: () => Promise<T>): Promise<T> {
  const saved = {
    argv: [...process.argv],
    execArgv: [...process.execArgv],
    env: process.env.NODE_ENV,
  };
  delete process.env.DISABLE_SQLITE_AUTO_BACKUP;
  process.env.NODE_ENV = "production";
  process.argv.splice(0, process.argv.length, process.execPath, "/opt/app/server.js");
  process.execArgv.length = 0;
  try {
    return await fn();
  } finally {
    process.argv.splice(0, process.argv.length, ...saved.argv);
    process.execArgv.push(...saved.execArgv);
    process.env.NODE_ENV = saved.env;
    process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
  }
}

// The newest backup file once at least one exists; a fire-and-forget copy needs a moment.
async function newestSnapshotQuery(sql: string, ...params: unknown[]): Promise<unknown> {
  const deadline = Date.now() + 5000;
  let list = await backupDb.listDbBackups();
  while (list.length === 0 && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    list = await backupDb.listDbBackups();
  }
  await new Promise((resolve) => setTimeout(resolve, 500));
  list = await backupDb.listDbBackups();
  assert.ok(list.length >= 1, "a pre-write snapshot must exist");
  const snap = tryOpenSync(path.join(core.DB_BACKUPS_DIR as string, list[0].filename), {
    readonly: true,
  });
  assert.ok(snap, "snapshot must open");
  try {
    return snap!.prepare(sql).get(...params);
  } finally {
    snap!.close();
  }
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("updateSettings: the pre-write snapshot holds the value from before the write", async () => {
  databaseSettings.updateDatabaseSettings({
    backup: { autoBackupEnabled: true, autoBackupFrequency: "daily", keepLastNBackups: 5 },
  });
  await updateSettings({ preWriteProbe: "old" });

  await withRoutineBackupsOn(() => updateSettings({ preWriteProbe: "new" }));

  const row = (await newestSnapshotQuery(
    "SELECT value FROM key_value WHERE namespace = 'settings' AND key = 'preWriteProbe'"
  )) as { value: string } | undefined;
  assert.equal(row?.value, JSON.stringify("old"), "snapshot must predate the write");
});
