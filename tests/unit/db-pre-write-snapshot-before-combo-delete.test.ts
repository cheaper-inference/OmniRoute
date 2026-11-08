import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-prewrite-combo-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "prewrite-combo-api-key-secret";
// Setup writes below must not take snapshots; the env switch is lifted right before the probe.
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const backupDb = await import("../../src/lib/db/backup.ts");
const { createCombo, deleteCombo } = await import("../../src/lib/db/combos.ts");
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

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("deleteCombo: the pre-write snapshot still holds the deleted combo", async () => {
  databaseSettings.updateDatabaseSettings({
    backup: { autoBackupEnabled: true, autoBackupFrequency: "daily", keepLastNBackups: 5 },
  });
  const combo = await createCombo({ name: "snapshot-probe", models: [], strategy: "priority" });

  await withRoutineBackupsOn(() => deleteCombo(combo.id as string));

  // A fire-and-forget copy needs a moment to land; an awaited one is complete already.
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
    const row = snap!
      .prepare("SELECT COUNT(*) AS cnt FROM combos WHERE name = ?")
      .get("snapshot-probe") as { cnt: number };
    assert.equal(row.cnt, 1, "snapshot must predate the delete");
  } finally {
    snap!.close();
  }
});
