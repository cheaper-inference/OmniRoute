// The SQLite store holds provider OAuth tokens and API keys (encrypted at rest, but still the
// credential store), so the DB file, its -wal/-shm sidecars and every DB backup must be
// owner-only (0600) and freshly created backup directories 0700 — not the 0644/0755 that a
// permissive umask (022) produces when no mode is given. Everything here runs inside a
// throwaway temp DATA_DIR; nothing outside it is ever chmod-ed.
import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-perms-"));
process.env.DATA_DIR = TEST_DATA_DIR;
// Force the permissive umask most hosts run with, so a missing explicit mode is observable.
const originalUmask = process.umask(0o022);

const core = await import("../../src/lib/db/core.ts");
const backupDb = await import("../../src/lib/db/backup.ts");
const { createManagedDbBackup } = await import("../../src/lib/db/managedBackup.ts");
const { createPreMigrationBackup } =
  await import("../../src/lib/db/migrationRunner/preMigrationBackup.ts");
const { chmodQuiet, hardenDbFilePermissions, POSIX_FILE_MODES_SUPPORTED } =
  await import("../../src/lib/db/filePermissions.ts");
const posixOnly = {
  skip: POSIX_FILE_MODES_SUPPORTED ? false : "POSIX mode bits only",
  concurrency: false,
};

const sqliteFile = path.join(TEST_DATA_DIR, "storage.sqlite");
const modeOf = (target: string) => fs.statSync(target).mode & 0o777;

async function waitForMode(target: string, mode: number, timeoutMs = 15000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    if (fs.existsSync(target) && modeOf(target) === mode) return;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  assert.fail(
    `${target} never reached mode ${mode.toString(8)} (now ${
      fs.existsSync(target) ? modeOf(target).toString(8) : "missing"
    })`
  );
}

test.after(() => {
  core.resetDbInstance();
  process.umask(originalUmask);
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
});

test("a freshly created storage.sqlite and its WAL sidecars are owner-only", posixOnly, () => {
  core.resetDbInstance();
  core.getDbInstance();

  assert.equal(modeOf(sqliteFile), 0o600);
  for (const suffix of ["-wal", "-shm"]) {
    const sidecar = `${sqliteFile}${suffix}`;
    if (fs.existsSync(sidecar)) assert.equal(modeOf(sidecar), 0o600, `${suffix} sidecar`);
  }
});

test("an existing world-readable storage.sqlite is repaired on the next open", posixOnly, () => {
  core.resetDbInstance();
  core.getDbInstance();
  core.resetDbInstance();

  fs.chmodSync(sqliteFile, 0o644);
  assert.equal(modeOf(sqliteFile), 0o644);

  core.getDbInstance();
  assert.equal(modeOf(sqliteFile), 0o600);
});

test(
  "a chmod failure (EPERM on a foreign bind mount) never breaks opening the DB",
  posixOnly,
  () => {
    core.resetDbInstance();
    const chmodMock = mock.method(fs, "chmodSync", () => {
      const error = new Error("operation not permitted") as NodeJS.ErrnoException;
      error.code = "EPERM";
      throw error;
    });
    try {
      assert.doesNotThrow(() => core.getDbInstance());
      assert.ok(chmodMock.mock.callCount() > 0, "hardening was attempted");
    } finally {
      chmodMock.mock.restore();
    }
    assert.equal(chmodQuiet(sqliteFile, 0o600), true);
  }
);

test("hardenDbFilePermissions ignores missing paths and in-memory databases", posixOnly, () => {
  assert.doesNotThrow(() => hardenDbFilePermissions(null));
  assert.doesNotThrow(() => hardenDbFilePermissions(":memory:"));
  assert.doesNotThrow(() => hardenDbFilePermissions(path.join(TEST_DATA_DIR, "missing.sqlite")));
  assert.equal(chmodQuiet(path.join(TEST_DATA_DIR, "missing.sqlite"), 0o600), false);
});

test("a manual backup lands in a 0700 backup dir as a 0600 file", posixOnly, async () => {
  core.resetDbInstance();
  fs.rmSync(path.join(TEST_DATA_DIR, "db_backups"), { recursive: true, force: true });
  core.getDbInstance();

  const result = backupDb.backupDbFile("manual");
  assert.ok(result, "manual backup was scheduled");
  const backupDir = path.join(TEST_DATA_DIR, "db_backups");
  assert.equal(modeOf(backupDir), 0o700);
  await waitForMode(path.join(backupDir, result.filename), 0o600);
});

test("a managed (health-check) backup is owner-only", posixOnly, () => {
  const db = core.getDbInstance();
  const backupDir = fs.mkdtempSync(path.join(TEST_DATA_DIR, "managed-"));
  fs.rmSync(backupDir, { recursive: true, force: true });

  assert.equal(createManagedDbBackup(db, "perm-test", backupDir), true);
  assert.equal(modeOf(backupDir), 0o700);
  const files = fs.readdirSync(backupDir).filter((name) => name.endsWith(".sqlite"));
  assert.equal(files.length, 1);
  assert.equal(modeOf(path.join(backupDir, files[0])), 0o600);
});

test("a pre-migration snapshot is owner-only", posixOnly, () => {
  const db = core.getDbInstance();
  fs.rmSync(path.join(TEST_DATA_DIR, "db_backups"), { recursive: true, force: true });

  const receipt = createPreMigrationBackup(db);
  assert.ok(receipt, "snapshot was created");
  assert.equal(modeOf(path.join(TEST_DATA_DIR, "db_backups")), 0o700);
  assert.equal(modeOf(receipt.path), 0o600);
});
