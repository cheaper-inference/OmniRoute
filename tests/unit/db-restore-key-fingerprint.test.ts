import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const KEY_A = "restore-fingerprint-key-A-0123456789abcdef";
const KEY_B = "restore-fingerprint-key-B-fedcba9876543210";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-restore-fp-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.STORAGE_ENCRYPTION_KEY = KEY_A;

const core = await import("../../src/lib/db/core.ts");
const backupDb = await import("../../src/lib/db/backup.ts");

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function insertConnections(count: number) {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  const insert = db.prepare(
    "INSERT INTO provider_connections (id, provider, auth_type, name, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );
  for (let i = 0; i < count; i++) {
    insert.run(`fp-conn-${i}`, "openai", "apikey", `fp-${i}`, 1, now, now);
  }
}

function connectionCount(): number {
  const row = core
    .getDbInstance()
    .prepare("SELECT COUNT(*) AS cnt FROM provider_connections")
    .get();
  return Number((row as { cnt: number }).cnt);
}

// backupDbFile("manual") copies in the background; wait until the copy holds every row.
async function takeBackup(expectedRows: number): Promise<string> {
  const result = backupDb.backupDbFile("manual");
  assert.ok(result, "a manual backup is always taken");
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    const entry = (await backupDb.listDbBackups()).find((b) => b.id === result.filename);
    if (entry && entry.connectionCount === expectedRows) return result.filename;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  throw new Error("backup did not finish");
}

test.beforeEach(() => {
  process.env.STORAGE_ENCRYPTION_KEY = KEY_A;
  resetStorage();
  core.getDbInstance();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("restoring a backup made under another storage key is refused and names both fingerprints", async () => {
  insertConnections(12);
  const backupId = await takeBackup(12);

  process.env.STORAGE_ENCRYPTION_KEY = KEY_B;
  insertConnections(0);
  core.getDbInstance().prepare("DELETE FROM provider_connections WHERE id = 'fp-conn-0'").run();

  await assert.rejects(
    () => backupDb.restoreDbBackup(backupId),
    (error: Error) => {
      assert.match(error.message, /sha256:[0-9a-f]{16}/);
      const fingerprints = error.message.match(/sha256:[0-9a-f]{16}/g) ?? [];
      assert.equal(new Set(fingerprints).size, 2, "both the backup and the running key are named");
      assert.equal(error.message.includes(KEY_A) || error.message.includes(KEY_B), false);
      return true;
    }
  );
  assert.equal(connectionCount(), 11, "the live database is untouched by a refused restore");
});

test("restoring under the same key works", async () => {
  insertConnections(12);
  const backupId = await takeBackup(12);
  core.getDbInstance().prepare("DELETE FROM provider_connections WHERE id = 'fp-conn-0'").run();

  const restored = await backupDb.restoreDbBackup(backupId);

  assert.equal(restored.restored, true);
  assert.equal(connectionCount(), 12);
});

test("allowKeyMismatch restores a backup made under another key (key rotation)", async () => {
  insertConnections(12);
  const backupId = await takeBackup(12);

  process.env.STORAGE_ENCRYPTION_KEY = KEY_B;
  const restored = await backupDb.restoreDbBackup(backupId, { allowKeyMismatch: true });

  assert.equal(restored.restored, true);
  assert.equal(connectionCount(), 12);
});

test("a backup with no fingerprint (made before this check, or with encryption off) still restores", async () => {
  delete process.env.STORAGE_ENCRYPTION_KEY;
  resetStorage();
  core.getDbInstance();
  insertConnections(12);
  const backupId = await takeBackup(12);

  process.env.STORAGE_ENCRYPTION_KEY = KEY_B;
  const restored = await backupDb.restoreDbBackup(backupId);

  assert.equal(restored.restored, true);
  assert.equal(connectionCount(), 12);
});
