/**
 * The quota consent lending migration: three ADD COLUMN statements and nothing
 * else, safe on a schema that already has the two lending columns.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  BETTER_SQLITE3_SKIP_REASON,
  loadBetterSqlite3,
} from "./_helpers/betterSqlite3Availability.ts";

const { stripExistingAddColumns, applyMigrationSkippingExistingColumns, hasColumn } =
  await import("../../src/lib/db/migrationRunner/schemaState.ts");

const migrationsDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../src/lib/db/migrations"
);
const file = fs.readdirSync(migrationsDir).find((f) => f.endsWith("_quota_consent_lending.sql"));
const sql = file ? fs.readFileSync(path.join(migrationsDir, file), "utf8") : "";
const version = file ? file.slice(0, 14) : "";
const Database = loadBetterSqlite3();
const skip = Database ? false : BETTER_SQLITE3_SKIP_REASON;

test("the migration only adds columns", () => {
  const statements = sql.split("\n").filter((l) => l.trim() && !l.trim().startsWith("--"));
  assert.deepEqual(statements, [
    "ALTER TABLE quota_allocations ADD COLUMN lending_percent INTEGER NOT NULL DEFAULT 0;",
    "ALTER TABLE quota_allocations ADD COLUMN lending_until INTEGER;",
    "ALTER TABLE quota_pools ADD COLUMN borrow_mode TEXT NOT NULL DEFAULT 'saturation';",
  ]);
  assert.match(file ?? "", /^\d{14}_quota_consent_lending\.sql$/);
});

test("fresh schema: the three columns land with their defaults", { skip }, () => {
  assert.ok(Database);
  const db = new Database(":memory:");
  try {
    db.exec("CREATE TABLE quota_pools (id TEXT PRIMARY KEY)");
    db.exec("CREATE TABLE quota_allocations (pool_id TEXT NOT NULL, api_key_id TEXT NOT NULL)");
    db.exec("INSERT INTO quota_pools (id) VALUES ('p')");
    db.exec("INSERT INTO quota_allocations (pool_id, api_key_id) VALUES ('p', 'k')");
    db.exec(sql);
    assert.deepEqual(
      db.prepare("SELECT lending_percent, lending_until FROM quota_allocations").get(),
      {
        lending_percent: 0,
        lending_until: null,
      }
    );
    assert.deepEqual(db.prepare("SELECT borrow_mode FROM quota_pools").get(), {
      borrow_mode: "saturation",
    });
  } finally {
    db.close();
  }
});

test(
  "a schema that already has the lending columns keeps its values and gains the mode",
  { skip },
  () => {
    assert.ok(Database);
    const db = new Database(":memory:");
    try {
      db.exec("CREATE TABLE quota_pools (id TEXT PRIMARY KEY)");
      db.exec(
        `CREATE TABLE quota_allocations (
         pool_id TEXT NOT NULL,
         api_key_id TEXT NOT NULL,
         lending INTEGER NOT NULL DEFAULT 0,
         lending_percent INTEGER NOT NULL DEFAULT 0,
         lending_until INTEGER
       )`
      );
      db.exec("CREATE TABLE _omniroute_migrations (version TEXT PRIMARY KEY, name TEXT)");
      db.exec("INSERT INTO quota_pools (id) VALUES ('p')");
      db.exec(
        `INSERT INTO quota_allocations (pool_id, api_key_id, lending, lending_percent, lending_until)
       VALUES ('p', 'k', 1, 30, 1893456000000)`
      );
      assert.throws(() => db.exec(sql), /duplicate column name/);
      const skipped = applyMigrationSkippingExistingColumns(
        db as never,
        { version, name: "quota_consent_lending" },
        sql
      );
      assert.deepEqual(skipped, [
        "quota_allocations.lending_percent",
        "quota_allocations.lending_until",
      ]);
      assert.deepEqual(
        db.prepare("SELECT lending, lending_percent, lending_until FROM quota_allocations").get(),
        { lending: 1, lending_percent: 30, lending_until: 1893456000000 }
      );
      assert.deepEqual(db.prepare("SELECT borrow_mode FROM quota_pools").get(), {
        borrow_mode: "saturation",
      });
      const ledger = db
        .prepare("SELECT count(*) AS n FROM _omniroute_migrations WHERE version = ?")
        .get(version) as { n: number };
      assert.equal(ledger.n, 1);
      // a second pass skips all three and changes nothing
      assert.equal(
        stripExistingAddColumns(sql, (t, c) => hasColumn(db as never, t, c))
          .sql.trim()
          .replace(/^--.*$/gm, "")
          .trim(),
        ""
      );
    } finally {
      db.close();
    }
  }
);
