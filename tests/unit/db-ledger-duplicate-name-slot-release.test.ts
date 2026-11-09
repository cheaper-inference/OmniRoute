// ENVIRONMENT NOTE (sandbox better-sqlite3 / glibc limitation, not a code defect):
// This test constructs or exercises a real better-sqlite3-backed SQLite database.
// better-sqlite3 is a native addon; production and CI load it normally, but some
// sandboxes/dev boxes ship a system glibc older than the prebuilt binary requires
// ("GLIBC_2.29 not found"), so the native module fails to dlopen and any test that
// reaches better-sqlite3 directly (or asserts stdout that the load-failure warning
// would pollute) fails HERE while passing in CI. This is a known environment
// limitation, not a defect in the code under test: the OmniRoute runtime itself
// cascades to node:sqlite/sql.js when better-sqlite3 is unavailable. See
// tests/unit/_helpers/betterSqlite3Availability.ts for a guard helper.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type BetterSqlite3 from "better-sqlite3";
import {
  BETTER_SQLITE3_SKIP_REASON,
  betterSqlite3Available,
} from "./_helpers/betterSqlite3Availability.ts";

// The guard has to run before better-sqlite3 is loaded. A top-level static
// import would throw while this module initialises, so the skip below would
// never get a chance to hide an environment that cannot load the addon.
const canUseBetterSqlite3 = betterSqlite3Available();
const skip = canUseBetterSqlite3 ? false : BETTER_SQLITE3_SKIP_REASON;
const Database = canUseBetterSqlite3
  ? ((await import("better-sqlite3")).default as typeof BetterSqlite3)
  : (null as unknown as typeof BetterSqlite3);

const migrationsDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-dup-ledger-"));
const originalMigrationsDir = process.env.OMNIROUTE_MIGRATIONS_DIR;
process.env.OMNIROUTE_MIGRATIONS_DIR = migrationsDir;

// 139 holds the real ccr_blocks record. 140 was recorded against ccr_blocks too,
// by a renumbering that reshuffled this block, but the file that now lives at
// 140 is connection_runtime_state.
fs.writeFileSync(
  path.join(migrationsDir, "139_ccr_blocks.sql"),
  "CREATE TABLE ccr_blocks (principal_id TEXT PRIMARY KEY);"
);
fs.writeFileSync(
  path.join(migrationsDir, "140_connection_runtime_state.sql"),
  "CREATE TABLE IF NOT EXISTS connection_runtime_state (id TEXT PRIMARY KEY);"
);
fs.writeFileSync(
  path.join(migrationsDir, "142_radar_referrals_cache.sql"),
  "CREATE TABLE IF NOT EXISTS radar_referrals_cache (id TEXT PRIMARY KEY);"
);

// The runner resolves OMNIROUTE_MIGRATIONS_DIR once, when the module loads, and
// test:unit:fast shares one module cache across files. A fresh instance keeps this
// directory out of that cache, so the variable can go back as soon as it has loaded.
const runnerUrl = new URL("../../src/lib/db/migrationRunner.ts", import.meta.url).href;
const { runMigrations } = (await import(
  `${runnerUrl}?test=${Date.now()}-${Math.random().toString(16).slice(2)}`
)) as typeof import("../../src/lib/db/migrationRunner.ts");
if (originalMigrationsDir === undefined) delete process.env.OMNIROUTE_MIGRATIONS_DIR;
else process.env.OMNIROUTE_MIGRATIONS_DIR = originalMigrationsDir;

test.after(() => {
  fs.rmSync(migrationsDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function seedLedger(db: BetterSqlite3.Database, rows: Array<[string, string]>) {
  db.exec(`
    CREATE TABLE ccr_blocks (principal_id TEXT PRIMARY KEY);
    CREATE TABLE _omniroute_migrations (
      version TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
  const insert = db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)");
  for (const [version, name] of rows) insert.run(version, name);
}

test("a duplicate ledger name releases its slot so the real file can apply", { skip }, () => {
  const db = new Database(":memory:");
  try {
    // ccr_blocks is recorded twice. Only 139 has a matching file.
    seedLedger(db, [
      ["139", "ccr_blocks"],
      ["140", "ccr_blocks"],
    ]);

    runMigrations(db);

    const rows = db
      .prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version")
      .all() as Array<{ version: string; name: string }>;

    assert.deepEqual(
      rows.map((r) => [r.version, r.name]),
      [
        ["139", "ccr_blocks"],
        ["140", "connection_runtime_state"],
        ["142", "radar_referrals_cache"],
        ["legacy-140-ccr_blocks", "ccr_blocks"],
      ],
      "the duplicate must move aside, not be dropped, and 140 must take its real file"
    );

    assert.ok(
      db
        .prepare(
          "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'connection_runtime_state'"
        )
        .get(),
      "connection_runtime_state must exist after its slot was freed"
    );
  } finally {
    db.close();
  }
});

test("a ledger row whose file moved elsewhere releases its slot too", { skip }, () => {
  const db = new Database(":memory:");
  try {
    // 142 is recorded as connection_runtime_state, but that file lives at 140 now.
    // radar_referrals_cache belongs at 142 and must get to run.
    seedLedger(db, [
      ["139", "ccr_blocks"],
      ["142", "connection_runtime_state"],
    ]);

    runMigrations(db);

    assert.ok(
      db
        .prepare(
          "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'radar_referrals_cache'"
        )
        .get(),
      "radar_referrals_cache must be created once its slot is released"
    );

    const rehomed = db
      .prepare("SELECT name FROM _omniroute_migrations WHERE version = ?")
      .get("legacy-142-connection_runtime_state") as { name: string } | undefined;
    assert.equal(rehomed?.name, "connection_runtime_state");
  } finally {
    db.close();
  }
});

test("a ledger row that still matches its file is left alone", { skip }, () => {
  const db = new Database(":memory:");
  try {
    seedLedger(db, [["139", "ccr_blocks"]]);

    runMigrations(db);

    const rehomed = db
      .prepare("SELECT version FROM _omniroute_migrations WHERE version LIKE 'legacy-%'")
      .all();
    assert.deepEqual(rehomed, [], "nothing to repair, so no row may be moved aside");

    assert.deepEqual(
      db.prepare("SELECT version, name FROM _omniroute_migrations WHERE version = ?").all("139"),
      [{ version: "139", name: "ccr_blocks" }],
      "the matching row must keep its slot"
    );
  } finally {
    db.close();
  }
});
