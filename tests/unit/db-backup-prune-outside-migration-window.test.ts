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

/**
 * Count the throwaway snapshots the exemption lookup takes. Each one is a
 * full-database VACUUM INTO on the main thread, made in a `.cleanup-resolve-`
 * temp directory under the backup directory.
 */
async function countExemptionSnapshots(run: () => Promise<unknown>) {
  const original = fs.mkdtempSync;
  let snapshots = 0;
  fs.mkdtempSync = ((prefix: string, options?: unknown) => {
    if (path.basename(String(prefix)).startsWith(".cleanup-resolve-")) snapshots++;
    return (original as (p: string, o?: unknown) => string)(prefix, options);
  }) as typeof fs.mkdtempSync;
  try {
    await run();
  } finally {
    fs.mkdtempSync = original;
  }
  return snapshots;
}

function writeAged(filePath: string, contents: string, ageDays: number) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, contents);
  const when = new Date(Date.now() - ageDays * 24 * 60 * 60 * 1000);
  fs.utimesSync(filePath, when, when);
}

test("retention on but no pre-migration snapshot can expire: no exemption snapshot", async () => {
  backup.setDbBackupRetentionDays(30);
  backup.setDbBackupMaxFiles(20);
  const dir = backupDir();
  const freshSha = createHash("sha256").update("fresh-pre-migration").digest("hex");
  const fresh = `db_state-${freshSha}_pre-migration.sqlite`;
  writeAged(path.join(dir, fresh), "fresh", 29);
  // An expired backup of another kind is pruned without any exemption lookup.
  const oldManualSha = createHash("sha256").update("old-manual").digest("hex");
  const oldManual = `db_state-${oldManualSha}_manual.sqlite`;
  writeAged(path.join(dir, oldManual), "old manual", 60);

  const snapshots = await countExemptionSnapshots(() =>
    cleanup.runScheduledCleanupPass("periodic")
  );

  assert.equal(snapshots, 0, "nothing can use the exemption, so no VACUUM INTO");
  assert.deepEqual(listPrimaries(dir), [fresh]);
});

test("an expired pre-migration snapshot still gets the exemption lookup", async () => {
  backup.setDbBackupRetentionDays(30);
  backup.setDbBackupMaxFiles(20);
  const dir = backupDir();
  const sha = createHash("sha256").update("expired-pre-migration").digest("hex");
  const expired = `db_state-${sha}_pre-migration.sqlite`;
  writeAged(path.join(dir, expired), "old", 31);

  const snapshots = await countExemptionSnapshots(() =>
    cleanup.runScheduledCleanupPass("periodic")
  );

  const db = core.getDbInstance();
  const native = db.driver !== "sql.js" && Boolean(db.name) && db.name !== ":memory:";
  assert.equal(snapshots, native ? 1 : 0);
  assert.deepEqual(listPrimaries(dir), [], "it matches nothing live, so it is pruned");
});

test("an expired directory-published pre-migration snapshot gets the lookup too", async () => {
  backup.setDbBackupRetentionDays(30);
  backup.setDbBackupMaxFiles(20);
  const dir = backupDir();
  const sha = createHash("sha256").update("expired-portable").digest("hex");
  const portable = `db_state-${sha}_pre-migration.sqlite.snapshot`;
  writeAged(path.join(dir, portable, "snapshot.sqlite"), "old", 45);

  const snapshots = await countExemptionSnapshots(() =>
    cleanup.runScheduledCleanupPass("periodic")
  );

  const db = core.getDbInstance();
  const native = db.driver !== "sql.js" && Boolean(db.name) && db.name !== ":memory:";
  assert.equal(snapshots, native ? 1 : 0);
  assert.ok(!fs.existsSync(path.join(dir, portable)), "the expired snapshot directory is pruned");
});

test("a reused snapshot seconds past the cutoff still gets the exemption", async () => {
  backup.setDbBackupRetentionDays(30);
  backup.setDbBackupMaxFiles(20);
  const dir = backupDir();
  fs.mkdirSync(dir, { recursive: true });
  // Same order as "expired snapshot reused by the current migration is kept":
  // run the row cleanup first so the hash matches what the pass resolves.
  await cleanup.runAutoCleanup();
  const db = core.getDbInstance();
  const native = db.driver !== "sql.js" && Boolean(db.name) && db.name !== ":memory:";
  const reusedSha = cleanup.resolveReusedPreMigrationSha(db, dir);
  if (!native) {
    assert.equal(reusedSha, null, "no native read driver here, nothing to exempt");
    return;
  }
  assert.equal(typeof reusedSha, "string");
  const reused = `db_state-${reusedSha}_pre-migration.sqlite`;
  // 30 days and 5 seconds: expired for the age rule, so only the exemption
  // keeps it. A check that runs early, even by a minute, skips the hash.
  writeAged(path.join(dir, reused), "reused", 30 + 5 / 86400);
  // A fresh pre-migration family next to it must not hide the expired one.
  const freshSha = createHash("sha256").update("fresh-neighbour").digest("hex");
  const fresh = `db_state-${freshSha}_pre-migration.sqlite`;
  writeAged(path.join(dir, fresh), "fresh", 1);

  const snapshots = await countExemptionSnapshots(() =>
    cleanup.runScheduledCleanupPass("periodic")
  );

  assert.equal(snapshots, 1, "a just-expired pre-migration family needs the lookup");
  assert.deepEqual(listPrimaries(dir), [fresh, reused].sort(), "the reused snapshot must stay");
});

test("retention off: no exemption snapshot even with an old pre-migration snapshot", async () => {
  backup.setDbBackupRetentionDays(0);
  backup.setDbBackupMaxFiles(20);
  const dir = backupDir();
  const sha = createHash("sha256").update("ancient-pre-migration").digest("hex");
  const ancient = `db_state-${sha}_pre-migration.sqlite`;
  writeAged(path.join(dir, ancient), "ancient", 400);

  const snapshots = await countExemptionSnapshots(() =>
    cleanup.runScheduledCleanupPass("periodic")
  );

  assert.equal(snapshots, 0, "no age rule, so the exemption cannot matter");
  assert.deepEqual(listPrimaries(dir), [ancient], "count rule only, 1 of 20");
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
