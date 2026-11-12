import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-backup-staged-"));
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

function countConnection(id: string): number {
  const row = core
    .getDbInstance()
    .prepare("SELECT COUNT(*) AS cnt FROM provider_connections WHERE id = ?")
    .get(id) as { cnt: number };
  return row.cnt;
}

// Live DB holds `live-only`; the stored backup does not. A restore that fails must leave
// `live-only` on disk and readable.
async function seedLiveAndBackup(backupId: string) {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  for (let i = 0; i < 20; i++) insertConnection(`backup-conn-${i}`);
  fs.mkdirSync(core.DB_BACKUPS_DIR, { recursive: true });
  await core.getDbInstance().backup(path.join(core.DB_BACKUPS_DIR, backupId));
  insertConnection("live-only");
}

function stagedLeftovers(): string[] {
  return fs.readdirSync(TEST_DATA_DIR).filter((name) => name.endsWith(".tmp"));
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("restoreDbBackup keeps the live database when the copy fails", async () => {
  const backupId = "db_2002-01-01T00-00-00-000Z_manual.sqlite";
  await seedLiveAndBackup(backupId);

  const originalCopy = fs.copyFileSync;
  fs.copyFileSync = () => {
    throw Object.assign(new Error("ENOSPC: no space left on device, copyfile"), {
      code: "ENOSPC",
    });
  };
  try {
    await assert.rejects(() => backupDb.restoreDbBackup(backupId), /ENOSPC/);
  } finally {
    fs.copyFileSync = originalCopy;
  }

  assert.ok(fs.existsSync(core.SQLITE_FILE), "live database file must still exist");
  assert.equal(countConnection("live-only"), 1, "live rows must survive a failed restore");
  assert.deepEqual(stagedLeftovers(), [], "no staged file may be left behind");
});

test("restoreDbBackup rejects a short copy and keeps the live database", async () => {
  const backupId = "db_2002-01-02T00-00-00-000Z_manual.sqlite";
  await seedLiveAndBackup(backupId);

  const originalCopy = fs.copyFileSync;
  fs.copyFileSync = (src, dest) => {
    const bytes = fs.readFileSync(src);
    fs.writeFileSync(dest, bytes.subarray(0, Math.floor(bytes.length / 2)));
  };
  try {
    await assert.rejects(() => backupDb.restoreDbBackup(backupId), /incomplete/);
  } finally {
    fs.copyFileSync = originalCopy;
  }

  assert.equal(countConnection("live-only"), 1, "live rows must survive a short copy");
  assert.deepEqual(stagedLeftovers(), [], "no staged file may be left behind");
});
