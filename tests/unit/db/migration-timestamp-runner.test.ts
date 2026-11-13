// ENVIRONMENT NOTE (sandbox better-sqlite3 / glibc limitation, not a code defect):
// This test drives the real migration runner against real better-sqlite3 databases. See
// tests/unit/_helpers/betterSqlite3Availability.ts if the native addon fails to load.
/**
 * Timestamped migrations (`YYYYMMDDHHMMSS_description.sql`) next to the legacy
 * `NNN_description.sql` set — runner behaviour with REAL SQL.
 *
 * Every scenario copies ALL real migrations into a temporary directory and adds
 * synthetic timestamped files on top. The synthetic SQL is deliberately NOT
 * idempotent (`CREATE TABLE` without `IF NOT EXISTS`, plain `INSERT` into a table
 * with a UNIQUE key), so a migration that is ever applied twice makes the run throw.
 *
 * Covered:
 *   (i)   all legacy applied + one new timestamped file → exactly that one applies,
 *         once; the next run applies nothing.
 *   (ii)  empty database → everything applies in getMigrationFiles() order, legacy
 *         before timestamped, including a timestamped migration that depends on a
 *         table created by a HIGH legacy migration (text order would run it first).
 *   (iii) two timestamped files arriving out of date order → both applied once.
 *   (iv)  `ee-` namespaced directory → applied after every main migration, including
 *         timestamped ones; a later timestamped main migration still applies and the
 *         `ee-` rows stay intact.
 *   (v)   mass-migration guard unchanged: a few pending timestamped files on an
 *         up-to-date database do not abort outside test mode.
 *   (vi)  getMigrationStatus(): `applied` and `pending` in numeric order.
 *
 * TEST SHAPE (same constraints as db-migration-runner-extra-dirs.test.ts):
 * MIGRATIONS_DIR is resolved once when migrationRunner.ts loads, so the temporary
 * core directory is fixed BEFORE the import and only its CONTENTS change between
 * tests. Test bodies are synchronous and registered without top-level await.
 *
 * The real migration set cannot run on a bare SQLite file: `001` is seeded by
 * core.ts together with its inline base schema and column healers. So a "clean
 * install" here is the real one — `getDbInstance()` on a fresh DATA_DIR file —
 * and the scenarios that start from "every legacy migration applied" clone that
 * clean-install file into an in-memory database.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const REAL_MIGRATIONS_DIR = path.join(REPO_ROOT, "src", "lib", "db", "migrations");

const tempDirs: string[] = [];
function mkTempDir(prefix: string): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
  tempDirs.push(dir);
  return dir;
}

const CORE_DIR = mkTempDir("mig-ts-core-");
const REAL_FILES = fs.readdirSync(REAL_MIGRATIONS_DIR).filter((file) => file.endsWith(".sql"));
for (const file of REAL_FILES) {
  fs.copyFileSync(path.join(REAL_MIGRATIONS_DIR, file), path.join(CORE_DIR, file));
}
const REAL_VERSIONS = REAL_FILES.map((file) => /^(\d+)_/.exec(file)?.[1]).filter(
  (version): version is string => version !== undefined
);
const HIGHEST_LEGACY = [...REAL_VERSIONS].sort().at(-1)!;

const DATA_DIR = mkTempDir("mig-ts-data-");
const savedEnv = {
  DATA_DIR: process.env.DATA_DIR,
  OMNIROUTE_MIGRATIONS_DIR: process.env.OMNIROUTE_MIGRATIONS_DIR,
  OMNIROUTE_EXTRA_MIGRATIONS_DIRS: process.env.OMNIROUTE_EXTRA_MIGRATIONS_DIRS,
  DISABLE_SQLITE_AUTO_BACKUP: process.env.DISABLE_SQLITE_AUTO_BACKUP,
};
process.env.DATA_DIR = DATA_DIR;
process.env.OMNIROUTE_MIGRATIONS_DIR = CORE_DIR;
delete process.env.OMNIROUTE_EXTRA_MIGRATIONS_DIRS;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const runner = await import("../../../src/lib/db/migrationRunner.ts");
const core = await import("../../../src/lib/db/core.ts");
const { resetDbInstance } = core;

const openDbs: Database.Database[] = [];

test.after(() => {
  for (const db of openDbs) {
    try {
      db.close();
    } catch {
      /* already closed */
    }
  }
  try {
    resetDbInstance();
  } catch {
    /* never opened */
  }
  for (const dir of tempDirs) {
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
  for (const [key, value] of Object.entries(savedEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

// ── synthetic timestamped migrations ────────────────────────────────────────────
const syntheticFiles = new Set<string>();

function addCoreMigration(fileName: string, sql: string): void {
  fs.writeFileSync(path.join(CORE_DIR, fileName), sql, "utf-8");
  syntheticFiles.add(fileName);
}

function clearSyntheticMigrations(): void {
  for (const fileName of syntheticFiles) {
    fs.rmSync(path.join(CORE_DIR, fileName), { force: true });
  }
  syntheticFiles.clear();
}

/** Not idempotent: a second execution throws ("table … already exists"). */
function nonIdempotentSql(table: string): string {
  return (
    `CREATE TABLE ${table} (id INTEGER PRIMARY KEY, marker TEXT NOT NULL UNIQUE);\n` +
    `INSERT INTO ${table} (marker) VALUES ('${table}');\n`
  );
}

function ledger(db: Database.Database): Array<{ version: string; name: string }> {
  return db
    .prepare("SELECT version, name FROM _omniroute_migrations ORDER BY rowid")
    .all() as Array<{ version: string; name: string }>;
}

function ledgerCount(db: Database.Database, version: string): number {
  return (
    db
      .prepare("SELECT COUNT(*) AS count FROM _omniroute_migrations WHERE version = ?")
      .get(version) as { count: number }
  ).count;
}

function tableRows(db: Database.Database, table: string): number {
  return (db.prepare(`SELECT COUNT(*) AS count FROM ${table}`).get() as { count: number }).count;
}

/** Order the runner actually applies: getMigrationFiles() minus superseded duplicates. */
function expectedApplicationOrder(): string[] {
  const files = runner.getMigrationFiles();
  const versions = new Set<string>();
  const order: string[] = [];
  for (const file of files) {
    if (versions.has(file.version)) continue; // superseded duplicate: same slot, one row
    versions.add(file.version);
    order.push(file.version);
  }
  return order;
}

/**
 * Real clean install: core.ts on a brand-new database file (inline base schema,
 * column healers, `001` seed, then runMigrations over CORE_DIR as it is right now).
 * Returns the resulting database bytes; the singleton is closed again.
 */
function cleanInstallBytes(): Buffer {
  resetDbInstance();
  const sqliteFile = core.SQLITE_FILE as string;
  for (const suffix of ["", "-wal", "-shm"]) {
    fs.rmSync(`${sqliteFile}${suffix}`, { force: true });
  }
  core.getDbInstance();
  resetDbInstance(); // TRUNCATE checkpoint: the main file now holds everything
  return fs.readFileSync(sqliteFile);
}

/** In-memory copy of a database image (name ":memory:", so no snapshot is required). */
function cloneDb(bytes: Buffer): Database.Database {
  // The clean install runs in WAL mode; an in-memory image cannot open a WAL
  // database, so flip the header's file-format bytes (18/19) back to rollback mode.
  const image = Buffer.from(bytes);
  image[18] = 1;
  image[19] = 1;
  const db = new Database(image);
  openDbs.push(db);
  return db;
}

let legacyBaseline: Buffer | null = null;
function applyLegacyBaseline(): Database.Database {
  clearSyntheticMigrations();
  legacyBaseline ??= cleanInstallBytes();
  const db = cloneDb(legacyBaseline);
  assert.equal(
    ledger(db).filter((row) => /^\d{14}$/.test(row.version)).length,
    0,
    "baseline must contain only legacy migrations"
  );
  assert.equal(runner.runMigrations(db), 0, "the legacy baseline must be fully applied");
  return db;
}

test("(i) all legacy applied + one new timestamped migration → only the new one applies, once", () => {
  const db = applyLegacyBaseline();
  const legacyRows = ledger(db).length;
  assert.ok(legacyRows >= 230, `expected the legacy set to be applied, got ${legacyRows}`);

  addCoreMigration("20261113120000_ts_single.sql", nonIdempotentSql("ts_single"));

  const second = runner.runMigrations(db);
  assert.equal(second, 1, "exactly the new timestamped migration must apply");
  assert.equal(ledgerCount(db, "20261113120000"), 1);
  assert.equal(ledger(db).length, legacyRows + 1);
  assert.deepEqual(ledger(db).at(-1), { version: "20261113120000", name: "ts_single" });
  assert.equal(tableRows(db, "ts_single"), 1);

  const third = runner.runMigrations(db);
  assert.equal(third, 0, "a third run must not re-apply anything");
  assert.equal(ledgerCount(db, "20261113120000"), 1);
  assert.equal(tableRows(db, "ts_single"), 1);
  clearSyntheticMigrations();
});

test("(ii) empty database → every migration in getMigrationFiles() order, legacy first", () => {
  clearSyntheticMigrations();
  // Depends on a table that ONLY a high legacy migration creates
  // (238_codex_connection_fences; core.ts's inline schema does not have it, unlike
  // key_templates). With the old text sort `20261101000000_…` sorted between
  // `201_…` and `202_…`, ran before 238 and failed with "no such table".
  addCoreMigration(
    "20261101000000_ts_depends_on_codex_fences.sql",
    "CREATE TABLE ts_dep (id INTEGER PRIMARY KEY);\n" +
      "INSERT INTO ts_dep (id) SELECT COUNT(*) FROM codex_connection_fences;\n"
  );
  addCoreMigration("20261102000000_ts_second.sql", nonIdempotentSql("ts_second"));

  const db = cloneDb(cleanInstallBytes());
  const order = expectedApplicationOrder();

  assert.deepEqual(
    ledger(db).map((row) => row.version),
    order,
    "ledger insertion order (rowid) must be exactly getMigrationFiles() order"
  );
  const firstTimestamp = order.findIndex((version) => /^\d{14}$/.test(version));
  assert.equal(order.indexOf(HIGHEST_LEGACY), firstTimestamp - 1);
  assert.deepEqual(order.slice(firstTimestamp), ["20261101000000", "20261102000000"]);
  assert.equal(tableRows(db, "ts_dep"), 1);
  assert.equal(runner.runMigrations(db), 0, "a second run applies nothing");
  clearSyntheticMigrations();
});

test("(iii) two timestamped migrations arriving out of date order → both apply, once each", () => {
  const db = applyLegacyBaseline();

  // B (later date) reaches this database first.
  addCoreMigration("20261114000000_ts_later_b.sql", nonIdempotentSql("ts_later_b"));
  assert.equal(runner.runMigrations(db), 1);
  assert.equal(ledgerCount(db, "20261114000000"), 1);

  // A (earlier date) is merged afterwards — it must still apply; B must not re-run.
  addCoreMigration("20261113000000_ts_earlier_a.sql", nonIdempotentSql("ts_earlier_a"));
  assert.equal(runner.runMigrations(db), 1, "only A applies; B is already in the ledger");
  assert.equal(ledgerCount(db, "20261113000000"), 1);
  assert.equal(ledgerCount(db, "20261114000000"), 1);
  assert.equal(tableRows(db, "ts_earlier_a"), 1);
  assert.equal(tableRows(db, "ts_later_b"), 1);

  // Arrival order is what the ledger records…
  assert.deepEqual(
    ledger(db)
      .slice(-2)
      .map((row) => row.version),
    ["20261114000000", "20261113000000"]
  );
  // …while the diagnostics list them numerically.
  assert.deepEqual(
    runner
      .getMigrationStatus(db)
      .applied.slice(-2)
      .map((row: { version: string }) => row.version),
    ["20261113000000", "20261114000000"]
  );

  assert.equal(runner.runMigrations(db), 0, "nothing left to apply");
  clearSyntheticMigrations();
});

test("(iv) ee- namespace runs after every main migration, timestamped ones included", () => {
  clearSyntheticMigrations();
  const eeDir = mkTempDir("mig-ts-ee-");
  fs.writeFileSync(path.join(eeDir, "001_ee_first.sql"), nonIdempotentSql("ee_first"));
  fs.writeFileSync(path.join(eeDir, "002_ee_second.sql"), nonIdempotentSql("ee_second"));
  fs.writeFileSync(path.join(eeDir, "010_ee_tenth.sql"), nonIdempotentSql("ee_tenth"));
  addCoreMigration("20261113120000_ts_main_one.sql", nonIdempotentSql("ts_main_one"));

  process.env.OMNIROUTE_EXTRA_MIGRATIONS_DIRS = `ee=${eeDir}`;
  try {
    const db = cloneDb(cleanInstallBytes());
    const versions = ledger(db).map((row) => row.version);
    const firstEe = versions.findIndex((version) => version.startsWith("ee-"));
    assert.deepEqual(versions.slice(firstEe), ["ee-001", "ee-002", "ee-010"]);
    assert.ok(
      versions.slice(0, firstEe).every((version) => /^\d+$/.test(version)),
      "only main-set versions may precede the ee- namespace"
    );
    assert.equal(versions[firstEe - 1], "20261113120000", "ee- comes after timestamped too");

    // A newer main migration arrives after the ee- ones were applied.
    addCoreMigration("20261115000000_ts_main_two.sql", nonIdempotentSql("ts_main_two"));
    assert.equal(runner.runMigrations(db), 1);
    assert.equal(ledgerCount(db, "20261115000000"), 1);
    for (const version of ["ee-001", "ee-002", "ee-010"]) {
      assert.equal(ledgerCount(db, version), 1, `${version} must stay applied exactly once`);
    }
    assert.equal(tableRows(db, "ee_first"), 1);

    // The file list keeps ee- last even with the new main migration on disk.
    const fileVersions = runner.getMigrationFiles().map((file) => file.version);
    assert.deepEqual(fileVersions.slice(-3), ["ee-001", "ee-002", "ee-010"]);
    assert.equal(fileVersions.at(-4), "20261115000000");

    // getMigrationStatus keeps the namespace after the whole main set as well.
    const statusVersions = runner
      .getMigrationStatus(db)
      .applied.map((row: { version: string }) => row.version);
    assert.deepEqual(statusVersions.slice(-3), ["ee-001", "ee-002", "ee-010"]);
    assert.equal(runner.runMigrations(db), 0);
  } finally {
    delete process.env.OMNIROUTE_EXTRA_MIGRATIONS_DIRS;
    clearSyntheticMigrations();
  }
});

/**
 * Same simulation as tests/unit/db-migration-runner.test.ts → withNonTestEnvironment:
 * isAutomatedTestProcess() looks at NODE_ENV, VITEST, NODE_TEST_CONTEXT,
 * JEST_WORKER_ID, argv and execArgv, so all of them are scrubbed for the call.
 */
function withNonTestEnvironment<T>(fn: () => T): T {
  const keys = ["NODE_ENV", "VITEST", "NODE_TEST_CONTEXT", "JEST_WORKER_ID"] as const;
  const saved = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  const originalArgv = [...process.argv];
  const originalExecArgv = [...process.execArgv];
  for (const key of keys) delete process.env[key];
  process.argv = process.argv.filter((arg) => !arg.includes("test"));
  process.execArgv = process.execArgv.filter((arg) => !arg.includes("test"));
  try {
    return fn();
  } finally {
    process.argv = originalArgv;
    process.execArgv = originalExecArgv;
    for (const key of keys) {
      if (saved[key] === undefined) delete process.env[key];
      else process.env[key] = saved[key];
    }
  }
}

test("(v) a few pending timestamped migrations on an up-to-date database do not trip the mass-migration guard", () => {
  const db = applyLegacyBaseline();
  for (let index = 0; index < 5; index++) {
    addCoreMigration(
      `2026111312000${index}_ts_guard_${index}.sql`,
      nonIdempotentSql(`ts_guard_${index}`)
    );
  }
  const savedMax = process.env.OMNIROUTE_MAX_PENDING_MIGRATIONS;
  delete process.env.OMNIROUTE_MAX_PENDING_MIGRATIONS;
  try {
    const applied = withNonTestEnvironment(() => runner.runMigrations(db));
    assert.equal(applied, 5);

    // Below the default threshold the guard is not even consulted. With a threshold
    // lower than the pending count it IS consulted, and timestamped files still pass:
    // they all sort after the physical-schema baseline, so they count as a plausible
    // upgrade (getPlausiblePendingCount compares the numeric prefix).
    for (let index = 0; index < 3; index++) {
      addCoreMigration(
        `2026111400000${index}_ts_guard_more_${index}.sql`,
        nonIdempotentSql(`ts_guard_more_${index}`)
      );
    }
    process.env.OMNIROUTE_MAX_PENDING_MIGRATIONS = "2";
    assert.equal(
      withNonTestEnvironment(() => runner.runMigrations(db)),
      3
    );
    assert.equal(ledgerCount(db, "20261114000002"), 1);

    // Control: the guard itself is still live. A wiped ledger (only the 001 seed left
    // on a database whose tables exist) is still refused, timestamped files included,
    // and nothing is applied.
    process.env.OMNIROUTE_MAX_PENDING_MIGRATIONS = "50";
    const wiped = cloneDb(legacyBaseline!);
    wiped.prepare("DELETE FROM _omniroute_migrations WHERE version <> '001'").run();
    assert.throws(
      () => withNonTestEnvironment(() => runner.runMigrations(wiped)),
      (error: Error) => error.name === "MigrationSafetyAbortError"
    );
    assert.deepEqual(
      ledger(wiped).map((row) => row.version),
      ["001"],
      "nothing applied after the abort"
    );
  } finally {
    if (savedMax === undefined) delete process.env.OMNIROUTE_MAX_PENDING_MIGRATIONS;
    else process.env.OMNIROUTE_MAX_PENDING_MIGRATIONS = savedMax;
    clearSyntheticMigrations();
  }
});

test("(vi) getMigrationStatus lists applied and pending migrations in numeric order", () => {
  const db = applyLegacyBaseline();
  addCoreMigration("20261113120000_ts_status_applied.sql", nonIdempotentSql("ts_status_applied"));
  assert.equal(runner.runMigrations(db), 1);

  addCoreMigration("20261120000000_ts_status_late.sql", nonIdempotentSql("ts_status_late"));
  addCoreMigration("20261110000000_ts_status_early.sql", nonIdempotentSql("ts_status_early"));

  const status = runner.getMigrationStatus(db);
  const appliedVersions = status.applied.map((row: { version: string }) => row.version);
  assert.equal(appliedVersions.at(-1), "20261113120000", "timestamped after the legacy set");
  assert.equal(appliedVersions.at(-2), HIGHEST_LEGACY);
  assert.deepEqual(
    appliedVersions,
    [...appliedVersions].sort((a: string, b: string) => {
      const [x, y] = [BigInt(a), BigInt(b)];
      return x < y ? -1 : x > y ? 1 : 0;
    }),
    "applied must be in numeric version order"
  );
  assert.deepEqual(
    status.pending.map((row: { version: string }) => row.version),
    ["20261110000000", "20261120000000"]
  );
  clearSyntheticMigrations();
});
