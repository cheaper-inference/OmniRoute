// ENVIRONMENT NOTE (sandbox better-sqlite3 / glibc limitation, not a code defect):
// This test opens a real SQLite database through `src/lib/db/core.ts`. See
// tests/unit/_helpers/betterSqlite3Availability.ts if the native addon fails to load.
/**
 * Every migration applies to an empty database, in order — `npm run test:migrations:fresh`.
 *
 * Release-Green runs this file (scripts/quality/validate-release-green.mjs →
 * "migrations-fresh"). With timestamped migrations (`YYYYMMDDHHMMSS_description.sql`)
 * two pull requests no longer race for a number, which moves the real risk here: a
 * migration from PR B that depends on a table created by PR A while B carries the
 * EARLIER timestamp. Each PR is green alone; together, on a fresh install, B runs
 * first and fails. Drizzle and Atlas answer that with a check, not with sequential
 * numbers — this is that check.
 *
 * It uses the REAL directory (no copy) and the REAL clean-install path: core.ts on a
 * brand-new DATA_DIR file (inline base schema, column healers, `001` seed, then
 * runMigrations). It asserts:
 *   - nothing fails (getDbInstance() rethrows a failed migration);
 *   - every file on disk has exactly one ledger row, except a superseded duplicate
 *     (SUPERSEDED_DUPLICATE_MIGRATIONS: same slot, the canonical file wins) and the
 *     optional FTS5 migrations when the driver has no FTS5 (they are deferred by
 *     design, see OPTIONAL_FTS5_MIGRATION_VERSIONS);
 *   - the ledger insertion order (rowid) is exactly getMigrationFiles() order;
 *   - a second run applies nothing.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const REAL_MIGRATIONS_DIR = path.join(REPO_ROOT, "src", "lib", "db", "migrations");

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migrations-fresh-"));
const savedEnv = {
  DATA_DIR: process.env.DATA_DIR,
  DISABLE_SQLITE_AUTO_BACKUP: process.env.DISABLE_SQLITE_AUTO_BACKUP,
  OMNIROUTE_MIGRATIONS_DIR: process.env.OMNIROUTE_MIGRATIONS_DIR,
  OMNIROUTE_EXTRA_MIGRATIONS_DIRS: process.env.OMNIROUTE_EXTRA_MIGRATIONS_DIRS,
};
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
// The real directory, and only it: no override, no namespaced extras.
process.env.OMNIROUTE_MIGRATIONS_DIR = REAL_MIGRATIONS_DIR;
delete process.env.OMNIROUTE_EXTRA_MIGRATIONS_DIRS;

const runner = await import("../../../src/lib/db/migrationRunner.ts");
const constants = await import("../../../src/lib/db/migrationRunner/constants.ts");
const core = await import("../../../src/lib/db/core.ts");

const HOW_TO_FIX =
  "A migration could not run on an empty database in file order. If it is a timestamped " +
  "migration (YYYYMMDDHHMMSS_…) that depends on a table or column created by another, newer " +
  "migration, its name is older than its dependency: regenerate the file name with " +
  "`npm run db:new-migration -- <description>` (or rename it to a timestamp after the " +
  "dependency) so it sorts after what it needs. Never edit an already released migration.";

let db: ReturnType<typeof core.getDbInstance>;
let freshInstallError: unknown = null;
try {
  db = core.getDbInstance();
} catch (error) {
  freshInstallError = error;
}

test.after(() => {
  try {
    core.resetDbInstance();
  } catch {
    /* best effort */
  }
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [key, value] of Object.entries(savedEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

function ledgerInInsertionOrder(): Array<{ version: string; name: string }> {
  return db
    .prepare("SELECT version, name FROM _omniroute_migrations ORDER BY rowid")
    .all() as Array<{ version: string; name: string }>;
}

/** Files the runner applies: getMigrationFiles() minus superseded duplicates and deferrals. */
function expectedLedger(): Array<{ version: string; name: string }> {
  const files = runner.getMigrationFiles();
  const fts5 = runner.supportsFts5(db);
  return files
    .filter((file) => {
      const superseded = constants.SUPERSEDED_DUPLICATE_MIGRATIONS.find(
        (entry) => entry.version === file.version && entry.name === file.name
      );
      if (!superseded) return true;
      const canonicalPresent = files.some(
        (candidate) =>
          candidate.version === superseded.supersededByVersion &&
          candidate.name === superseded.supersededByName
      );
      return !canonicalPresent;
    })
    .filter((file) => fts5 || !constants.OPTIONAL_FTS5_MIGRATION_VERSIONS.has(file.version))
    .map((file) => ({ version: file.version, name: file.name }));
}

test("a clean install applies every migration without failing", () => {
  if (freshInstallError) {
    const message =
      freshInstallError instanceof Error ? freshInstallError.message : String(freshInstallError);
    assert.fail(`${message}\n\n${HOW_TO_FIX}`);
  }
  assert.ok(db, "getDbInstance() returned no database");
});

test("the migration list is the real directory, and it is not empty", { skip: !db }, () => {
  const files = runner.getMigrationFiles();
  const onDisk = fs
    .readdirSync(REAL_MIGRATIONS_DIR)
    .filter((file) => /^(\d+)_(.+)\.sql$/.test(file));
  assert.ok(files.length >= 236, `expected the full migration set, got ${files.length}`);
  assert.equal(files.length, onDisk.length, "every NNN_/timestamp file on disk is listed");
  for (const file of files) {
    assert.equal(path.dirname(file.path), REAL_MIGRATIONS_DIR);
  }
});

test("every migration file has exactly one ledger row", { skip: !db }, () => {
  const ledger = ledgerInInsertionOrder();
  const counts = new Map<string, number>();
  for (const row of ledger) counts.set(row.version, (counts.get(row.version) ?? 0) + 1);

  const missing = expectedLedger().filter((file) => !counts.has(file.version));
  assert.deepEqual(
    missing.map((file) => `${file.version}_${file.name}`),
    [],
    `migrations never applied on a clean install.\n${HOW_TO_FIX}`
  );
  const duplicated = [...counts.entries()].filter(([, count]) => count !== 1);
  assert.deepEqual(duplicated, [], "a version may be recorded only once");

  const known = new Set(expectedLedger().map((file) => file.version));
  const unknown = ledger.filter((row) => !known.has(row.version));
  assert.deepEqual(unknown, [], "the ledger holds versions that no migration file declares");
});

test("ledger insertion order (rowid) is exactly getMigrationFiles() order", { skip: !db }, () => {
  assert.deepEqual(
    ledgerInInsertionOrder(),
    expectedLedger(),
    `the runner applied migrations out of file order.\n${HOW_TO_FIX}`
  );
});

test("legacy NNN migrations all precede the timestamped ones", { skip: !db }, () => {
  const versions = ledgerInInsertionOrder().map((row) => row.version);
  const firstTimestamp = versions.findIndex((version) => /^\d{14}$/.test(version));
  if (firstTimestamp === -1) return; // no timestamped migration yet
  let lastLegacy = -1;
  versions.forEach((version, index) => {
    if (/^\d{3}$/.test(version)) lastLegacy = index;
  });
  assert.ok(
    lastLegacy < firstTimestamp,
    `legacy migration ${versions[lastLegacy]} ran after timestamped ${versions[firstTimestamp]}`
  );
});

test("a second run on the fresh database applies nothing", { skip: !db }, () => {
  assert.equal(runner.runMigrations(db), 0);
  const fts5 = runner.supportsFts5(db);
  const pending = runner
    .getMigrationStatus(db)
    .pending.filter(
      (file: { version: string }) =>
        fts5 || !constants.OPTIONAL_FTS5_MIGRATION_VERSIONS.has(file.version)
    );
  assert.deepEqual(pending, [], "nothing may remain pending after a clean install");
});
