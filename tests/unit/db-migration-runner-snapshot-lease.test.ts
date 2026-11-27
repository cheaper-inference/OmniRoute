// ENVIRONMENT NOTE: uses a real on-disk better-sqlite3 database (VACUUM INTO snapshot), like
// db-pre-migration-backup-retention-10421.test.ts.
//
// The migration runner must hold a lease on its restore point for the whole upgrade, so a
// prune from any other call site cannot delete it, and must release the lease when the run
// ends, whether it succeeds or throws.

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";

import Database from "better-sqlite3";

import { createBetterSqliteAdapter } from "../../src/lib/db/adapters/betterSqliteAdapter.ts";

const serial = { concurrency: false };
const DAY_MS = 24 * 60 * 60 * 1000;

const { pruneBackupDirectory } = await import("../../src/lib/db/backupRetention.ts");

async function importFresh(modulePath: string) {
  const url = pathToFileURL(path.resolve(modulePath)).href;
  return import(`${url}?test=${Date.now()}-${Math.random().toString(16).slice(2)}`);
}

function withMockedMigrationFs<T>(files: Record<string, string>, fn: () => T): T {
  const originalExistsSync = fs.existsSync;
  const originalReaddirSync = fs.readdirSync;
  const originalReadFileSync = fs.readFileSync;
  const isMigrationDir = (target: unknown) =>
    String(target).replaceAll("\\", "/").endsWith("/src/lib/db/migrations") ||
    String(target).replaceAll("\\", "/").endsWith("/migrations");

  fs.existsSync = ((target: unknown) => {
    if (isMigrationDir(target)) return true;
    if (Object.hasOwn(files, path.basename(String(target)))) return true;
    return originalExistsSync(target as string);
  }) as typeof fs.existsSync;
  fs.readdirSync = ((target: string, options?: unknown) => {
    if (isMigrationDir(target)) return Object.keys(files);
    return originalReaddirSync(target, options as never);
  }) as typeof fs.readdirSync;
  fs.readFileSync = ((target: unknown, options?: unknown) => {
    const fileName = path.basename(String(target));
    if (Object.hasOwn(files, fileName)) return files[fileName];
    return originalReadFileSync(target as string, options as never);
  }) as typeof fs.readFileSync;

  try {
    return fn();
  } finally {
    fs.existsSync = originalExistsSync;
    fs.readdirSync = originalReaddirSync;
    fs.readFileSync = originalReadFileSync;
  }
}

function setup() {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migration-lease-"));
  const backupDir = path.join(dataDir, "db_backups");
  fs.mkdirSync(backupDir, { recursive: true });
  const raw = new Database(path.join(dataDir, "storage.sqlite"));
  const db = createBetterSqliteAdapter(raw);
  db.exec(`
    CREATE TABLE provider_connections (id TEXT PRIMARY KEY);
    CREATE TABLE _omniroute_migrations (
      version TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    INSERT INTO provider_connections (id) VALUES ('existing-data');
    INSERT INTO _omniroute_migrations (version, name) VALUES ('001', 'initial_schema');
  `);
  return { dataDir, backupDir, raw, db };
}

const snapshots = (backupDir: string) =>
  fs
    .readdirSync(backupDir)
    .filter((name) => name.endsWith("_pre-migration.sqlite") && name.startsWith("db_state-"));
const leases = (backupDir: string) =>
  fs.readdirSync(backupDir).filter((name) => name.startsWith(".migration-lease-"));

// Newer than the snapshot the run is about to publish, so count pruning (maxFiles 1) would
// pick the snapshot as the overflow family.
function seedNewerBackup(backupDir: string) {
  const file = path.join(backupDir, "db_2026-08-01T00-00-00-000Z_manual.sqlite");
  fs.writeFileSync(file, "newer");
  const future = new Date(Date.now() + DAY_MS);
  fs.utimesSync(file, future, future);
}

test("a prune that runs during the upgrade keeps the run's restore point", serial, async () => {
  const { dataDir, backupDir, raw, db } = setup();
  try {
    seedNewerBackup(backupDir);
    let keptDuringRun: boolean | null = null;
    // Stands in for any other call site (manual backup, scheduled cleanup, another process).
    raw.function("prune_during_upgrade", () => {
      pruneBackupDirectory({ backupDir, maxFiles: 1, retentionDays: 0 });
      keptDuringRun = snapshots(backupDir).length === 1;
      return 1;
    });
    const { runMigrations } = await importFresh("src/lib/db/migrationRunner.ts");

    withMockedMigrationFs(
      {
        "001_initial_schema.sql": "SELECT 1;",
        "002_prune_probe.sql": "SELECT prune_during_upgrade();",
      },
      () => runMigrations(db)
    );

    assert.equal(keptDuringRun, true, "a prune during the upgrade deleted the restore point");
    assert.equal(snapshots(backupDir).length, 1);
  } finally {
    db.close();
    fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("the lease is released when the upgrade ends, on success and on failure", serial, async () => {
  const { dataDir, backupDir, db } = setup();
  try {
    const { runMigrations } = await importFresh("src/lib/db/migrationRunner.ts");

    withMockedMigrationFs(
      {
        "001_initial_schema.sql": "SELECT 1;",
        "002_ok.sql": "CREATE TABLE lease_ok (id INTEGER);",
      },
      () => runMigrations(db)
    );
    assert.equal(snapshots(backupDir).length, 1, "the run took a snapshot");
    assert.deepEqual(leases(backupDir), [], "a successful run left its lease behind");

    assert.throws(
      () =>
        withMockedMigrationFs(
          {
            "001_initial_schema.sql": "SELECT 1;",
            "002_ok.sql": "CREATE TABLE lease_ok (id INTEGER);",
            "003_broken.sql": "INSERT INTO table_that_does_not_exist VALUES (1);",
          },
          () => runMigrations(db)
        ),
      /table_that_does_not_exist/
    );
    assert.deepEqual(leases(backupDir), [], "a failed run left its lease behind");
  } finally {
    db.close();
    fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
