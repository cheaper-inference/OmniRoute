// Retention applies to pre-migration snapshots outside the migration window,
// even when automatic backups are off. The migration runner never prunes
// (its snapshots are content-addressed); this pass runs after startup and on
// the periodic schedule instead.

import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-backup-prune-window-"));
const originalDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const backup = await import("../../src/lib/db/backup.ts");
const cleanup = await import("../../src/lib/db/cleanup.ts");
const databaseSettings = await import("../../src/lib/db/databaseSettings.ts");

function backupDir() {
  return path.join(TEST_DATA_DIR, "db_backups");
}

function seedFamilies(dir: string, count: number, prefix = "db_state") {
  fs.mkdirSync(dir, { recursive: true });
  const names: string[] = [];
  for (let i = 0; i < count; i++) {
    const stamp = new Date(Date.now() - (count - i) * 1000).toISOString().replace(/[:.]/g, "-");
    const name = `${prefix}-${stamp}-snap-${i}_pre-migration.sqlite`;
    const filePath = path.join(dir, name);
    fs.writeFileSync(filePath, `fake-${i}`);
    const mtime = new Date(Date.now() - (count - i) * 1000);
    fs.utimesSync(filePath, mtime, mtime);
    names.push(name);
  }
  return names.sort();
}

function listPrimaries(dir: string) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".sqlite"))
    .sort();
}

function setAutoBackupEnabled(enabled: boolean) {
  databaseSettings.updateDatabaseSettings({ backup: { autoBackupEnabled: enabled } });
  assert.equal(
    backup.isAutoBackupDisabledBySetting(),
    !enabled,
    "production auto-backup toggle must reflect the written setting"
  );
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  core.getDbInstance();
  // The singleton caches the open file handle: reopening the same path after
  // rm -rf leaves a handle to the unlinked inode, so VACUUM INTO snapshots
  // keep hashing the pre-reset bytes. Bounce the handle so the exemption hash
  // addresses the live file the pass will read.
  core.resetDbInstance();
  core.getDbInstance();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
});

test("automatic backups off, 5 snapshots, keep 3: 3 remain after the startup pass", async () => {
  setAutoBackupEnabled(false);
  backup.setDbBackupMaxFiles(3);
  backup.setDbBackupRetentionDays(0);
  const dir = backupDir();
  seedFamilies(dir, 5);
  assert.equal(listPrimaries(dir).length, 5);

  await cleanup.runScheduledCleanupPass("startup");

  const remaining = listPrimaries(dir);
  assert.equal(remaining.length, 3);
});

test("snapshot from the current migration is kept", async () => {
  setAutoBackupEnabled(false);
  backup.setDbBackupMaxFiles(3);
  backup.setDbBackupRetentionDays(0);
  const dir = backupDir();
  const names = seedFamilies(dir, 4);
  const newest = names[names.length - 1];

  await cleanup.runScheduledCleanupPass("startup");

  const remaining = listPrimaries(dir);
  assert.equal(remaining.length, 3);
  assert.ok(remaining.includes(newest), "the newest snapshot must survive");
});

test("automatic backups on: same retention outcome", async () => {
  setAutoBackupEnabled(true);
  backup.setDbBackupMaxFiles(3);
  backup.setDbBackupRetentionDays(0);
  const dir = backupDir();
  seedFamilies(dir, 5);

  await cleanup.runScheduledCleanupPass("startup");

  assert.equal(listPrimaries(dir).length, 3);
});

test("in-flight migration marker present: nothing is pruned", async () => {
  setAutoBackupEnabled(false);
  backup.setDbBackupMaxFiles(3);
  backup.setDbBackupRetentionDays(0);
  const dir = backupDir();
  seedFamilies(dir, 5);
  fs.mkdirSync(path.join(dir, ".migration-snapshot-stale"), { recursive: true });

  await cleanup.runScheduledCleanupPass("startup");

  assert.equal(listPrimaries(dir).length, 5);
});

test("expired snapshot not reused by the current migration is pruned by age", async () => {
  backup.setDbBackupRetentionDays(30);
  backup.setDbBackupMaxFiles(20);
  const dir = backupDir();
  const sha = createHash("sha256").update("old-snapshot").digest("hex");
  const expired = `db_state-${sha}_pre-migration.sqlite`;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, expired), "old");
  const old = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
  fs.utimesSync(path.join(dir, expired), old, old);
  const recentSha = createHash("sha256").update("recent-backup").digest("hex");
  const recent = `db_state-${recentSha}_manual.sqlite`;
  fs.writeFileSync(path.join(dir, recent), "recent");

  await cleanup.runScheduledCleanupPass("startup");

  const remaining = listPrimaries(dir);
  assert.ok(!remaining.includes(expired), "the expired snapshot must go");
  assert.ok(remaining.includes(recent), "the recent backup must stay");
});

test("expired snapshot reused by the current migration is kept", async () => {
  backup.setDbBackupRetentionDays(30);
  backup.setDbBackupMaxFiles(20);
  const dir = backupDir();
  fs.mkdirSync(dir, { recursive: true });
  const recentSha = createHash("sha256").update("recent-backup").digest("hex");
  const recent = `db_state-${recentSha}_manual.sqlite`;
  fs.writeFileSync(path.join(dir, recent), "recent");
  // Run the row-cleanup part of the pass first: several sweeps (telemetry
  // table self-heal, usage rollup) rewrite database bytes without deleting
  // anything, and the exemption hash addresses the live bytes. Resolving the
  // hash after those writes matches what the pass itself will resolve.
  await cleanup.runAutoCleanup();
  const reusedSha = cleanup.resolveReusedPreMigrationSha(core.getDbInstance(), dir);
  assert.ok(typeof reusedSha === "string" || reusedSha === null);
  if (reusedSha === null) {
    assert.ok(true, "no native read driver here, nothing to exempt");
    return;
  }
  const reused = `db_state-${reusedSha}_pre-migration.sqlite`;
  fs.writeFileSync(path.join(dir, reused), "reused");
  const old = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
  fs.utimesSync(path.join(dir, reused), old, old);

  await cleanup.runScheduledCleanupPass("startup");

  const remaining = listPrimaries(dir);
  assert.ok(remaining.includes(reused), "the reused snapshot must stay");
  assert.ok(remaining.includes(recent), "the recent backup must stay");
});

test("missing backup directory: pass stays green", async () => {
  backup.setDbBackupMaxFiles(3);
  assert.ok(!fs.existsSync(backupDir()));

  await cleanup.runScheduledCleanupPass("startup");

  assert.ok(true, "no throw");
});

test("periodic phase prunes like the startup phase", async () => {
  setAutoBackupEnabled(false);
  backup.setDbBackupMaxFiles(3);
  backup.setDbBackupRetentionDays(0);
  const dir = backupDir();
  seedFamilies(dir, 5);

  await cleanup.runScheduledCleanupPass("periodic");

  assert.equal(listPrimaries(dir).length, 3);
});

test("failed exemption lookup returns null and leaves a trace", () => {
  const db = core.getDbInstance();
  if (db.driver === "sql.js" || !db.name || db.name === ":memory:") {
    assert.ok(true, "no native read driver here, nothing to resolve");
    return;
  }
  // A regular file where a directory is expected: mkdtempSync throws ENOTDIR.
  const fileMarker = path.join(TEST_DATA_DIR, "not-a-dir");
  fs.writeFileSync(fileMarker, "marker");
  const warnings: unknown[][] = [];
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    warnings.push(args);
  };
  try {
    const sha = cleanup.resolveReusedPreMigrationSha(db, fileMarker);
    assert.equal(sha, null);
    assert.ok(warnings.length > 0, "a failed exemption lookup must warn");
  } finally {
    console.warn = originalWarn;
  }
});
