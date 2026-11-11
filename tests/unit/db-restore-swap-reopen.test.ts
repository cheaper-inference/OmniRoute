// restoreDbBackup closes the DB singleton, waits for file handles to release, swaps the files and
// reopens. A request that called getDbInstance() during that wait reopened the OLD file; the final
// getDbInstance() then returned that stale handle, so `restored: true` was reported while every
// later request still read the pre-restore database (and its writes went to a deleted file).
// Now getDbInstance() refuses to open a database while the swap runs.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-restore-swap-"));
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  DISABLE_SQLITE_AUTO_BACKUP: process.env.DISABLE_SQLITE_AUTO_BACKUP,
};
process.env.DATA_DIR = TEST_DATA_DIR;
// Keep the pre-restore snapshot out of the way: the restore under test is the only actor.
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const backupDb = await import("../../src/lib/db/backup.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

const readMarker = () =>
  (
    core
      .getDbInstance()
      .prepare("SELECT value FROM key_value WHERE namespace = 'restore-swap' AND key = 'marker'")
      .get() as { value: string } | undefined
  )?.value;

test("a database open during the swap is refused and the restore lands on the restored file", async () => {
  const db = core.getDbInstance();
  const setMarker = (value: string) =>
    db
      .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
      .run("restore-swap", "marker", value);

  // The backup holds the "restored" marker; the live database then moves on to "live".
  setMarker("restored");
  const backupId = `db_${new Date().toISOString().replace(/[:.]/g, "-")}_manual.sqlite`;
  fs.mkdirSync(core.DB_BACKUPS_DIR as string, { recursive: true });
  const backupPath = path.join(core.DB_BACKUPS_DIR as string, backupId);
  db.exec(`VACUUM INTO '${backupPath.replace(/'/g, "''")}'`);
  setMarker("live");
  assert.equal(readMarker(), "live");

  // A concurrent request touches the database inside the restore's 500 ms wait.
  const restore = backupDb.restoreDbBackup(backupId);
  await new Promise((resolve) => setTimeout(resolve, 150));
  assert.throws(() => core.getDbInstance(), /restore/i);

  const result = await restore;
  assert.equal(result.restored, true);
  assert.equal(readMarker(), "restored");
});

test("a restore that fails releases the gate", async () => {
  const backupId = `db_${new Date().toISOString().replace(/[:.]/g, "-")}_manual2.sqlite`;
  const backupPath = path.join(core.DB_BACKUPS_DIR as string, backupId);
  core.getDbInstance().exec(`VACUUM INTO '${backupPath.replace(/'/g, "''")}'`);

  // unlink of a directory fails with a non-retryable error, after the singleton was closed.
  const journalPath = `${core.SQLITE_FILE}-journal`;
  fs.mkdirSync(journalPath);
  try {
    await assert.rejects(() => backupDb.restoreDbBackup(backupId));
  } finally {
    fs.rmSync(journalPath, { recursive: true, force: true });
  }
  assert.doesNotThrow(() => core.getDbInstance());
});
