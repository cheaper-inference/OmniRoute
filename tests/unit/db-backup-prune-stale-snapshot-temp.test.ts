// A killed upgrade leaves its `.migration-snapshot-*` temp directory behind. The scheduled
// backup prune skipped whenever one existed, so retention stopped for good. A directory with
// no live writer (no recent write to it or its snapshot file) is removed; a live one still
// pauses the prune.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-backup-stale-temp-"));
const originalDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const backup = await import("../../src/lib/db/backup.ts");
const cleanup = await import("../../src/lib/db/cleanup.ts");

const HOUR_MS = 60 * 60 * 1000;

function backupDir() {
  return path.join(TEST_DATA_DIR, "db_backups");
}

function seedFamilies(dir: string, count: number) {
  fs.mkdirSync(dir, { recursive: true });
  for (let i = 0; i < count; i++) {
    const mtime = new Date(Date.now() - (count - i) * 1000);
    const stamp = mtime.toISOString().replace(/[:.]/g, "-");
    const filePath = path.join(dir, `db_state-${stamp}-snap-${i}_pre-migration.sqlite`);
    fs.writeFileSync(filePath, `fake-${i}`);
    fs.utimesSync(filePath, mtime, mtime);
  }
}

function listPrimaries(dir: string) {
  return fs.readdirSync(dir).filter((f) => f.endsWith(".sqlite"));
}

/** A snapshot temp directory the way createPreMigrationBackup makes it. */
function makeSnapshotTemp(dir: string, suffix: string, dirAgeMs: number, fileAgeMs?: number) {
  const tempDir = path.join(dir, `.migration-snapshot-${suffix}`);
  fs.mkdirSync(tempDir, { recursive: true });
  if (fileAgeMs !== undefined) {
    const file = path.join(tempDir, "snapshot.sqlite");
    fs.writeFileSync(file, "partial");
    const fileTime = new Date(Date.now() - fileAgeMs);
    fs.utimesSync(file, fileTime, fileTime);
  }
  const dirTime = new Date(Date.now() - dirAgeMs);
  fs.utimesSync(tempDir, dirTime, dirTime);
  return tempDir;
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  core.getDbInstance();
  backup.setDbBackupMaxFiles(3);
  backup.setDbBackupRetentionDays(0);
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
});

test("a snapshot temp directory idle for hours is removed and pruning resumes", async () => {
  const dir = backupDir();
  seedFamilies(dir, 5);
  const stale = makeSnapshotTemp(dir, "abC123", 5 * HOUR_MS, 5 * HOUR_MS);

  await cleanup.runScheduledCleanupPass("startup");

  assert.equal(fs.existsSync(stale), false, "the dead temp directory must go");
  assert.equal(listPrimaries(dir).length, 3, "retention must run again");
});

test("a snapshot temp directory with a recent snapshot write is live: nothing is pruned", async () => {
  const dir = backupDir();
  seedFamilies(dir, 5);
  // The directory entry is old (created hours ago) but the snapshot file is still being written.
  const live = makeSnapshotTemp(dir, "xYz789", 5 * HOUR_MS, 1000);

  await cleanup.runScheduledCleanupPass("startup");

  assert.equal(fs.existsSync(live), true, "a live writer's directory must stay");
  assert.equal(listPrimaries(dir).length, 5, "pruning stays paused while a snapshot is live");
});

test("an old directory with foreign content is not ours to delete", async () => {
  const dir = backupDir();
  seedFamilies(dir, 5);
  const foreign = makeSnapshotTemp(dir, "qwE456", 5 * HOUR_MS, 5 * HOUR_MS);
  fs.writeFileSync(path.join(foreign, "notes.txt"), "operator file");
  const old = new Date(Date.now() - 5 * HOUR_MS);
  fs.utimesSync(path.join(foreign, "notes.txt"), old, old);
  fs.utimesSync(foreign, old, old);

  await cleanup.runScheduledCleanupPass("startup");

  assert.equal(fs.existsSync(path.join(foreign, "notes.txt")), true);
  assert.equal(listPrimaries(dir).length, 5);
});
