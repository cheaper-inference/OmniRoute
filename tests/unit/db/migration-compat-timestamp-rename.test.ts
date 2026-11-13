// ENVIRONMENT NOTE (sandbox better-sqlite3 / glibc limitation, not a code defect):
// This test drives the real migration runner against real better-sqlite3 databases. See
// tests/unit/_helpers/betterSqlite3Availability.ts if the native addon fails to load.
/**
 * RENAMED_MIGRATION_COMPATIBILITY with a TIMESTAMPED destination (`NNN_x` → `YYYYMMDDHHMMSS_x`).
 *
 * The legacy set is frozen at 239, so an open pull request that ran with `240_x` (or any
 * slot above 239) gets its file renamed to a timestamp before merging, and slot 240 is never
 * reoccupied. A database that already ran that PR build carries a `240 x` ledger row. Until
 * now a compatibility entry only moved the row when ANOTHER file sat in the old slot, so an
 * entry `240 x → <stamp> x` did nothing and the migration ran a second time (non-idempotent
 * SQL stopped the boot). The rule is now: eligible as before, OR — only when `toVersion` is a
 * 14-digit stamp — when no file on disk is `(fromVersion, fromName)` any more. Entries with a
 * three-digit destination keep the old rule.
 *
 * Covered, with real SQL on top of a real clean install:
 *   (a) 240_x in the ledger, file now <stamp>_x, entry present → the row moves, nothing is
 *       applied, the non-idempotent SQL is not executed again;
 *   (b) slot 238 reoccupied by the canonical 238_codex_connection_fences: the canonical
 *       applies, the converted PR migration does not run again;
 *   (c) no entry → today's behaviour: the migration runs again, the 240 row stays orphaned;
 *   (d) entry with a three-digit destination and the old slot vacant → not reconciled.
 *
 * INJECTION TECHNIQUE: the entries are pushed at runtime into the exported
 * RENAMED_MIGRATION_COMPATIBILITY array (`as const` is compile-time only; the array is a
 * plain mutable array at runtime) and removed again in `finally`. The runner reads the same
 * module instance (tsx resolves both specifiers to the same file URL); scenario (a) would
 * fail if it did not. No real entry is added to constants.ts.
 *
 * TEST SHAPE (same as migration-timestamp-runner.test.ts): MIGRATIONS_DIR is resolved once
 * when migrationRunner.ts loads, so the temporary core directory (a copy of every real
 * migration) is fixed BEFORE the import and only its CONTENTS change between tests. The
 * clean install is the real one (core.ts on a fresh DATA_DIR file); each scenario clones
 * it into an in-memory database. Synthetic stamps are dated 2099 so they always sort after
 * every real timestamped migration.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const REAL_MIGRATIONS_DIR =
  process.env.OMNIROUTE_TEST_MIGRATIONS_SOURCE_DIR ||
  path.join(REPO_ROOT, "src", "lib", "db", "migrations");

const tempDirs: string[] = [];
function mkTempDir(prefix: string): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
  tempDirs.push(dir);
  return dir;
}

const savedEnv = {
  DATA_DIR: process.env.DATA_DIR,
  OMNIROUTE_MIGRATIONS_DIR: process.env.OMNIROUTE_MIGRATIONS_DIR,
  OMNIROUTE_EXTRA_MIGRATIONS_DIRS: process.env.OMNIROUTE_EXTRA_MIGRATIONS_DIRS,
  DISABLE_SQLITE_AUTO_BACKUP: process.env.DISABLE_SQLITE_AUTO_BACKUP,
};

function removeTempDirsAndRestoreEnv(): void {
  for (const dir of tempDirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
  for (const [key, value] of Object.entries(savedEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
}

const CORE_DIR = mkTempDir("mig-compat-core-");
for (const file of fs.readdirSync(REAL_MIGRATIONS_DIR).filter((name) => name.endsWith(".sql"))) {
  fs.copyFileSync(path.join(REAL_MIGRATIONS_DIR, file), path.join(CORE_DIR, file));
}
const DATA_DIR = mkTempDir("mig-compat-data-");
process.env.DATA_DIR = DATA_DIR;
process.env.OMNIROUTE_MIGRATIONS_DIR = CORE_DIR;
delete process.env.OMNIROUTE_EXTRA_MIGRATIONS_DIRS;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

// The temporary directories exist before these imports; if one throws, test.after never
// runs, so clean up here before rethrowing.
const [runner, core, constants, schemaState] = await Promise.all([
  import("../../../src/lib/db/migrationRunner.ts"),
  import("../../../src/lib/db/core.ts"),
  import("../../../src/lib/db/migrationRunner/constants.ts"),
  import("../../../src/lib/db/migrationRunner/schemaState.ts"),
]).catch((error: unknown) => {
  removeTempDirsAndRestoreEnv();
  throw error;
});

type CompatibilityEntry = {
  fromVersion: string;
  fromName: string;
  toVersion: string;
  toName: string;
};
const compatibilityTable = constants.RENAMED_MIGRATION_COMPATIBILITY as unknown as Array<
  Readonly<CompatibilityEntry>
>;
const ORIGINAL_COMPATIBILITY_LENGTH = compatibilityTable.length;

const openDbs: Database.Database[] = [];

test.after(() => {
  compatibilityTable.splice(ORIGINAL_COMPATIBILITY_LENGTH);
  for (const db of openDbs) {
    try {
      db.close();
    } catch {
      /* already closed */
    }
  }
  try {
    core.resetDbInstance();
  } catch {
    /* never opened */
  }
  removeTempDirsAndRestoreEnv();
});

// ── helpers ─────────────────────────────────────────────────────────────────────

const syntheticFiles = new Set<string>();

function addCoreMigration(fileName: string, sql: string): void {
  fs.writeFileSync(path.join(CORE_DIR, fileName), sql, "utf-8");
  syntheticFiles.add(fileName);
}

function removeCoreMigration(fileName: string): void {
  fs.rmSync(path.join(CORE_DIR, fileName), { force: true });
  syntheticFiles.delete(fileName);
}

function clearSyntheticMigrations(): void {
  for (const fileName of [...syntheticFiles]) removeCoreMigration(fileName);
}

function withCompatibilityEntry<T>(entry: CompatibilityEntry, fn: () => T): T {
  compatibilityTable.push(entry);
  try {
    return fn();
  } finally {
    compatibilityTable.splice(ORIGINAL_COMPATIBILITY_LENGTH);
  }
}

/** Not idempotent: a second execution throws ("table … already exists"). */
function nonIdempotentSql(table: string): string {
  return (
    `CREATE TABLE ${table} (id INTEGER PRIMARY KEY, marker TEXT NOT NULL UNIQUE);\n` +
    `INSERT INTO ${table} (marker) VALUES ('${table}');\n`
  );
}

/** Idempotent DDL, but every execution adds one row, so a re-run is visible. */
function countingSql(table: string): string {
  return (
    `CREATE TABLE IF NOT EXISTS ${table} (id INTEGER PRIMARY KEY, n INTEGER NOT NULL);\n` +
    `INSERT INTO ${table} (n) VALUES (1);\n`
  );
}

function ledgerRows(db: Database.Database, version: string): Array<{ name: string }> {
  return db
    .prepare("SELECT name FROM _omniroute_migrations WHERE version = ?")
    .all(version) as Array<{ name: string }>;
}

function tableRows(db: Database.Database, table: string): number {
  return (db.prepare(`SELECT COUNT(*) AS count FROM ${table}`).get() as { count: number }).count;
}

function hasTable(db: Database.Database, table: string): boolean {
  return Boolean(
    db.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?").get(table)
  );
}

function cleanInstallBytes(): Buffer {
  core.resetDbInstance();
  const sqliteFile = core.SQLITE_FILE as string;
  for (const suffix of ["", "-wal", "-shm"]) {
    fs.rmSync(`${sqliteFile}${suffix}`, { force: true });
  }
  core.getDbInstance();
  core.resetDbInstance(); // TRUNCATE checkpoint: the main file now holds everything
  return fs.readFileSync(sqliteFile);
}

/** In-memory copy of a database image, flipped from WAL back to rollback mode. */
function cloneDb(bytes: Buffer): Database.Database {
  const image = Buffer.from(bytes);
  image[18] = 1;
  image[19] = 1;
  const db = new Database(image);
  openDbs.push(db);
  return db;
}

/** Every real migration applied, none of the synthetic ones. */
let realBaseline: Buffer | null = null;
function applyRealBaseline(): Database.Database {
  clearSyntheticMigrations();
  realBaseline ??= cleanInstallBytes();
  const db = cloneDb(realBaseline);
  assert.equal(runner.runMigrations(db), 0, "the real baseline must be fully applied");
  return db;
}

function migrationFiles() {
  return runner.getMigrationFiles();
}

// ── scenarios ───────────────────────────────────────────────────────────────────

test("(a) 240_x converted to a timestamp with an entry → row moved, nothing re-applied", () => {
  const db = applyRealBaseline();
  try {
    // The database ran the PR build that still numbered the migration 240.
    addCoreMigration("240_compat_probe.sql", nonIdempotentSql("compat_probe"));
    assert.equal(runner.runMigrations(db), 1);
    assert.deepEqual(ledgerRows(db, "240"), [{ name: "compat_probe" }]);

    // The PR is merged with the file renamed to a timestamp; slot 240 stays empty for good.
    removeCoreMigration("240_compat_probe.sql");
    addCoreMigration("20990101000000_compat_probe.sql", nonIdempotentSql("compat_probe"));

    withCompatibilityEntry(
      {
        fromVersion: "240",
        fromName: "compat_probe",
        toVersion: "20990101000000",
        toName: "compat_probe",
      },
      () => {
        assert.equal(
          schemaState.hasLedgerRepairCandidates(db, migrationFiles()),
          true,
          "the 240 row is a repair candidate"
        );
        // Re-running the CREATE TABLE would throw; 0 means the SQL never ran again.
        assert.equal(runner.runMigrations(db), 0, "the converted migration must not re-apply");
        assert.deepEqual(ledgerRows(db, "240"), [], "the 240 row is moved, not left orphaned");
        assert.deepEqual(ledgerRows(db, "20990101000000"), [{ name: "compat_probe" }]);
        assert.equal(tableRows(db, "compat_probe"), 1);
        assert.equal(schemaState.hasLedgerRepairCandidates(db, migrationFiles()), false);
        assert.equal(runner.runMigrations(db), 0, "stable on the next boot");
      }
    );
  } finally {
    clearSyntheticMigrations();
  }
});

test("(b) slot 238 reoccupied by the canonical migration → canonical applies, PR one does not re-run", () => {
  const db = applyRealBaseline();
  try {
    // A database that ran a PR build where 238 was the PR's own migration: the ledger has
    // `238 compat_pr_feature`, the PR's table, and none of the canonical 238 schema.
    db.exec("DROP TABLE codex_connection_fences;");
    db.prepare("UPDATE _omniroute_migrations SET name = ? WHERE version = '238'").run(
      "compat_pr_feature"
    );
    db.exec(nonIdempotentSql("compat_pr_feature"));

    addCoreMigration("20990102000000_compat_pr_feature.sql", nonIdempotentSql("compat_pr_feature"));

    withCompatibilityEntry(
      {
        fromVersion: "238",
        fromName: "compat_pr_feature",
        toVersion: "20990102000000",
        toName: "compat_pr_feature",
      },
      () => {
        assert.equal(schemaState.hasLedgerRepairCandidates(db, migrationFiles()), true);
        assert.equal(runner.runMigrations(db), 1, "only the canonical 238 applies");
        assert.deepEqual(ledgerRows(db, "238"), [{ name: "codex_connection_fences" }]);
        assert.ok(hasTable(db, "codex_connection_fences"), "the canonical 238 schema is back");
        assert.deepEqual(ledgerRows(db, "20990102000000"), [{ name: "compat_pr_feature" }]);
        assert.equal(tableRows(db, "compat_pr_feature"), 1);
        assert.equal(runner.runMigrations(db), 0);
      }
    );
  } finally {
    clearSyntheticMigrations();
  }
});

test("(c) no entry → today's behaviour: the converted migration runs again", () => {
  const db = applyRealBaseline();
  try {
    addCoreMigration("240_compat_rerun.sql", countingSql("compat_rerun"));
    assert.equal(runner.runMigrations(db), 1);
    removeCoreMigration("240_compat_rerun.sql");
    addCoreMigration("20990103000000_compat_rerun.sql", countingSql("compat_rerun"));

    assert.equal(schemaState.hasLedgerRepairCandidates(db, migrationFiles()), false);
    assert.equal(runner.runMigrations(db), 1, "without an entry the migration applies again");
    assert.deepEqual(ledgerRows(db, "240"), [{ name: "compat_rerun" }], "orphan row stays");
    assert.deepEqual(ledgerRows(db, "20990103000000"), [{ name: "compat_rerun" }]);
    assert.equal(tableRows(db, "compat_rerun"), 2, "the SQL ran a second time");
  } finally {
    clearSyntheticMigrations();
  }
});

test("(d) three-digit destination with the old slot vacant → old rule, not reconciled", () => {
  const db = applyRealBaseline();
  try {
    addCoreMigration("240_compat_legacy.sql", countingSql("compat_legacy"));
    assert.equal(runner.runMigrations(db), 1);
    removeCoreMigration("240_compat_legacy.sql");
    addCoreMigration("241_compat_legacy.sql", countingSql("compat_legacy"));

    withCompatibilityEntry(
      {
        fromVersion: "240",
        fromName: "compat_legacy",
        toVersion: "241",
        toName: "compat_legacy",
      },
      () => {
        assert.equal(schemaState.hasLedgerRepairCandidates(db, migrationFiles()), false);
        assert.equal(runner.runMigrations(db), 1, "241 applies: the entry is not eligible");
        assert.deepEqual(ledgerRows(db, "240"), [{ name: "compat_legacy" }]);
        assert.deepEqual(ledgerRows(db, "241"), [{ name: "compat_legacy" }]);
        assert.equal(tableRows(db, "compat_legacy"), 2);
      }
    );
  } finally {
    clearSyntheticMigrations();
  }
});

test("(e) a timestamped destination is NOT eligible while the old file is still on disk", () => {
  const db = applyRealBaseline();
  try {
    // Both files present (e.g. the rename was not finished): the 240 row belongs to a file
    // that still exists, so it must not be moved away from it.
    addCoreMigration("240_compat_both.sql", countingSql("compat_both"));
    assert.equal(runner.runMigrations(db), 1);
    addCoreMigration("20990104000000_compat_both.sql", countingSql("compat_both"));

    withCompatibilityEntry(
      {
        fromVersion: "240",
        fromName: "compat_both",
        toVersion: "20990104000000",
        toName: "compat_both",
      },
      () => {
        assert.equal(schemaState.hasLedgerRepairCandidates(db, migrationFiles()), false);
        assert.equal(runner.runMigrations(db), 1);
        assert.deepEqual(ledgerRows(db, "240"), [{ name: "compat_both" }]);
        assert.deepEqual(ledgerRows(db, "20990104000000"), [{ name: "compat_both" }]);
      }
    );
  } finally {
    clearSyntheticMigrations();
  }
});
