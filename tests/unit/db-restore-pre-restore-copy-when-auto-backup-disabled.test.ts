import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pre-restore-"));
process.env.DATA_DIR = TEST_DATA_DIR;
// Routine backups are off. The copy taken before a restore is not routine.
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const backupDb = await import("../../src/lib/db/backup.ts");
const { tryOpenSync } = await import("../../src/lib/db/adapters/driverFactory.ts");

function insertConnection(id: string) {
  const now = new Date().toISOString();
  core
    .getDbInstance()
    .prepare(
      "INSERT INTO provider_connections (id, provider, auth_type, name, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
    )
    .run(id, "openai", "apikey", id, 1, now, now);
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("restoreDbBackup keeps the pre-restore copy when DISABLE_SQLITE_AUTO_BACKUP is true", async () => {
  for (let i = 0; i < 20; i++) insertConnection(`stored-conn-${i}`);
  const backupId = "db_2002-01-01T00-00-00-000Z_manual.sqlite";
  fs.mkdirSync(core.DB_BACKUPS_DIR as string, { recursive: true });
  await core.getDbInstance().backup(path.join(core.DB_BACKUPS_DIR as string, backupId));
  insertConnection("live-only");

  await backupDb.restoreDbBackup(backupId);

  const preRestore = (await backupDb.listDbBackups()).filter((b) => b.reason === "pre-restore");
  assert.equal(preRestore.length, 1, "restore must leave a pre-restore snapshot");
  assert.equal(
    preRestore[0].connectionCount,
    21,
    "the snapshot must hold the live state from before the restore"
  );
});

test(
  "restoreDbBackup names the failed safety copy and leaves the live database untouched",
  { skip: typeof process.getuid === "function" && process.getuid() === 0 },
  async () => {
    const backupId = "db_2003-01-01T00-00-00-000Z_manual.sqlite";
    const dir = core.DB_BACKUPS_DIR as string;
    fs.mkdirSync(dir, { recursive: true });
    const stored = path.join(dir, backupId);
    await core.getDbInstance().backup(stored);
    // A rollback-journal file can be opened read-only in a read-only directory (no -shm needed).
    const storedDb = tryOpenSync(stored);
    assert.ok(storedDb, "stored backup must open");
    storedDb!.pragma("journal_mode = DELETE");
    storedDb!.close();
    insertConnection("live-before-failed-restore");

    // A read-only backup directory: the stored backup is readable, the safety copy cannot be written.
    fs.chmodSync(dir, 0o500);
    try {
      await assert.rejects(
        () => backupDb.restoreDbBackup(backupId),
        /Pre-restore safety backup failed/
      );
    } finally {
      fs.chmodSync(dir, 0o700);
    }

    const row = core
      .getDbInstance()
      .prepare("SELECT COUNT(*) AS n FROM provider_connections WHERE id = ?")
      .get("live-before-failed-restore") as { n: number };
    assert.equal(row.n, 1, "the live database must be unchanged after the abort");
  }
);
