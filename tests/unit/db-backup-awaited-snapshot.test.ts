import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-backup-awaited-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const backupDb = await import("../../src/lib/db/backup.ts");

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

test("backupDbFileAwaited resolves with a complete snapshot and ignores throttle and disable gates", async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  for (let i = 0; i < 50; i++) insertConnection(`awaited-conn-${i}`);

  // The test process and the seeded `autoBackupEnabled=false` both disable routine backups.
  assert.equal(backupDb.backupDbFile("pre-write"), null, "routine gates must be active here");

  const first = await backupDb.backupDbFileAwaited("pre-import", { mandatory: true });
  assert.ok(first, "snapshot result");
  // No waiting: the copy must already be complete when the promise resolves.
  const entry = (await backupDb.listDbBackups()).find((b) => b.id === first.filename);
  assert.ok(entry, "snapshot file must exist");
  assert.equal(entry.connectionCount, 50, "snapshot must hold every row at resolve time");

  await new Promise((resolve) => setTimeout(resolve, 5));
  const second = await backupDb.backupDbFileAwaited("pre-import", { mandatory: true });
  assert.ok(second, "a second snapshot inside the throttle window must still be taken");
  assert.notEqual(second.filename, first.filename);
});

test("backupDbFileAwaited rejects when the snapshot cannot be written", async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  for (let i = 0; i < 50; i++) insertConnection(`failing-conn-${i}`);

  const db = core.getDbInstance();
  const originalBackup = db.backup;
  db.backup = async () => {
    throw new Error("disk full");
  };
  try {
    await assert.rejects(
      () => backupDb.backupDbFileAwaited("pre-import", { mandatory: true }),
      /disk full/
    );
  } finally {
    db.backup = originalBackup;
  }
});
