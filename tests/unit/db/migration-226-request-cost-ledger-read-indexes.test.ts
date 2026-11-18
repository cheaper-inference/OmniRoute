// Migration 226 adds a covering (api_key_id, timestamp, success, service_tier,
// amount_usd) index and a request_id index to request_cost_ledger, and drops
// the (api_key_id, timestamp) index from 182 that the covering one replaces.
// The query plans these indexes serve are checked in
// tests/unit/request-cost-ledger-index-plans.test.ts.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { SqliteAdapter } from "../../../src/lib/db/adapters/types.ts";
import { openMemorySqliteAdapter } from "../_helpers/memorySqliteAdapter.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migration-226-data-"));
process.env.DATA_DIR = dataDir;

const repoMigrations = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../src/lib/db/migrations"
);
const MIGRATION_182 = "182_request_cost_ledger_and_key_quota.sql";
const MIGRATION_226 = "226_request_cost_ledger_read_indexes.sql";
const migrationsDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migration-226-"));
const originalMigrationsDir = process.env.OMNIROUTE_MIGRATIONS_DIR;
process.env.OMNIROUTE_MIGRATIONS_DIR = migrationsDir;

const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");

test.after(() => {
  for (const dir of [migrationsDir, dataDir]) {
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
  if (originalMigrationsDir === undefined) delete process.env.OMNIROUTE_MIGRATIONS_DIR;
  else process.env.OMNIROUTE_MIGRATIONS_DIR = originalMigrationsDir;
});

/** Make the runner's migrations directory hold exactly `files`. */
function useMigrations(files: string[]): void {
  for (const file of fs.readdirSync(migrationsDir)) fs.rmSync(path.join(migrationsDir, file));
  for (const file of files) {
    fs.copyFileSync(path.join(repoMigrations, file), path.join(migrationsDir, file));
  }
}

function ledgerIndexes(db: SqliteAdapter): string[] {
  return (
    db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type = 'index' AND tbl_name = 'request_cost_ledger' AND sql IS NOT NULL ORDER BY name"
      )
      .all() as Array<{ name: string }>
  ).map((row) => row.name);
}

type IndexShape = { unique: number; partial: number; columns: string[] };

/**
 * Key columns of an index in order, with sort direction and collation, plus
 * its unique and partial flags. Names alone would not catch an index built on
 * the wrong or extra columns.
 */
function indexShape(db: SqliteAdapter, name: string): IndexShape {
  const listed = (
    db.prepare("PRAGMA index_list(request_cost_ledger)").all() as Array<{
      name: string;
      unique: number;
      partial: number;
    }>
  ).find((row) => row.name === name);
  assert.ok(listed, `index ${name} exists`);
  const columns = (
    db.prepare(`PRAGMA index_xinfo(${name})`).all() as Array<{
      seqno: number;
      name: string | null;
      desc: number;
      coll: string;
      key: number;
    }>
  )
    .filter((row) => row.key === 1)
    .sort((a, b) => a.seqno - b.seqno)
    .map((row) => `${row.name} ${row.desc ? "DESC" : "ASC"} ${row.coll}`);
  return { unique: listed.unique, partial: listed.partial, columns };
}

const COVER_SHAPE: IndexShape = {
  unique: 0,
  partial: 0,
  columns: [
    "api_key_id ASC BINARY",
    "timestamp ASC BINARY",
    "success ASC BINARY",
    "service_tier ASC BINARY",
    "amount_usd ASC BINARY",
  ],
};
const REQUEST_ID_SHAPE: IndexShape = {
  unique: 0,
  partial: 0,
  columns: ["request_id ASC BINARY"],
};

function assertNewIndexShapes(db: SqliteAdapter): void {
  assert.deepEqual(indexShape(db, "idx_rcl_api_key_ts_cover"), COVER_SHAPE);
  assert.deepEqual(indexShape(db, "idx_rcl_request_id"), REQUEST_ID_SHAPE);
}

test("migration 226 replaces the (api_key_id, timestamp) index and adds request_id", () => {
  const db = openMemorySqliteAdapter();
  try {
    useMigrations([MIGRATION_182, MIGRATION_226]);
    assert.equal(runMigrations(db, { isNewDb: true }), 2);
    assert.deepEqual(ledgerIndexes(db), [
      "idx_rcl_api_key_ts_cover",
      "idx_rcl_request_id",
      "idx_rcl_timestamp",
    ]);
    assertNewIndexShapes(db);
    assert.equal(runMigrations(db, { isNewDb: true }), 0, "second run is a no-op");
  } finally {
    db.close();
  }
});

test("migration 226 SQL can run again on a database that already has it", () => {
  // The runner skips applied versions, so this executes the file directly.
  const db = openMemorySqliteAdapter();
  try {
    useMigrations([MIGRATION_182, MIGRATION_226]);
    assert.equal(runMigrations(db, { isNewDb: true }), 2);
    const sql = fs.readFileSync(path.join(repoMigrations, MIGRATION_226), "utf8");
    assert.doesNotThrow(() => db.exec(sql));
    assert.doesNotThrow(() => db.exec(sql));
    assert.deepEqual(ledgerIndexes(db), [
      "idx_rcl_api_key_ts_cover",
      "idx_rcl_request_id",
      "idx_rcl_timestamp",
    ]);
    assertNewIndexShapes(db);
  } finally {
    db.close();
  }
});

test("upgrading a database that already has ledger rows keeps every row", () => {
  const db = openMemorySqliteAdapter();
  try {
    useMigrations([MIGRATION_182]);
    assert.equal(runMigrations(db, { isNewDb: true }), 1);
    const insert = db.prepare(
      "INSERT INTO request_cost_ledger (api_key_id, provider, model, amount_usd, success, timestamp, request_id) VALUES (?, 'openai', 'gpt-4o', ?, ?, ?, ?)"
    );
    for (let i = 0; i < 2000; i++) {
      insert.run(
        `key-${i % 4}`,
        0.25,
        i % 5 === 0 ? 0 : 1,
        `2026-09-${10 + (i % 9)}T00:00:00.000Z`,
        // request_id is not unique in the table; two rows share each id here.
        `req-${Math.floor(i / 2)}`
      );
    }
    assert.ok(ledgerIndexes(db).includes("idx_rcl_api_key_timestamp"));
    const freelist = () =>
      (db.prepare("PRAGMA freelist_count").get() as { freelist_count: number }).freelist_count;
    assert.equal(freelist(), 0);

    useMigrations([MIGRATION_182, MIGRATION_226]);
    assert.equal(runMigrations(db, { isNewDb: false }), 1, "only 226 is pending");
    assert.ok(!ledgerIndexes(db).includes("idx_rcl_api_key_timestamp"));
    assertNewIndexShapes(db);
    // The old index is dropped before the new ones are built, so its pages are
    // reused instead of being left on the freelist.
    assert.equal(freelist(), 0, "no pages left on the freelist after the upgrade");
    const row = db
      .prepare(
        "SELECT COUNT(*) AS n, SUM(amount_usd) AS usd FROM request_cost_ledger WHERE api_key_id = 'key-1' AND success = 1"
      )
      .get() as { n: number; usd: number };
    assert.deepEqual({ n: row.n, usd: row.usd }, { n: 400, usd: 100 });
    assert.equal(
      (db.prepare("PRAGMA integrity_check").get() as Record<string, string>).integrity_check,
      "ok"
    );
  } finally {
    db.close();
  }
});
