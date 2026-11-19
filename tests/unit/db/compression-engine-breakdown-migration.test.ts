import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// compression_engine_breakdown used to be created only lazily
// (ensureCompressionEngineBreakdownTable, run when a compressed request writes its per-engine
// rows or the per-engine analytics are read). A clean install and an upgraded install then
// differed by whether compression had run, the divergence check:install-upgrade fails on. The
// migration makes every database have the table and its indexes right after runMigrations,
// with the lazy DDL's exact columns.
const scratch = fs.mkdtempSync(path.join(os.tmpdir(), "compression-engine-breakdown-migration-"));
const data = path.join(scratch, "data");
fs.mkdirSync(data, { recursive: true });
process.env.DATA_DIR = data;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const VERSION = "20261118212858";
const MIGRATION = new URL(
  `../../../src/lib/db/migrations/${VERSION}_compression_engine_breakdown.sql`,
  import.meta.url
);
const INDEXES = ["idx_ceb_engine_ts", "idx_ceb_request"];

const core = await import("../../../src/lib/db/core.ts");
const { insertCompressionEngineBreakdown } =
  await import("../../../src/lib/db/compressionAnalytics.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(scratch, { recursive: true, force: true });
});

type Db = ReturnType<typeof core.getDbInstance>;
type Column = { name: string; type: string; notnull: number; dflt_value: unknown; pk: number };
type IndexColumn = { name: string; desc: number; key: number };

function columns(db: Db): Column[] {
  return (db.prepare("PRAGMA table_info(compression_engine_breakdown)").all() as Column[]).map(
    ({ name, type, notnull, dflt_value, pk }) => ({ name, type, notnull, dflt_value, pk })
  );
}

function indexes(db: Db): Record<string, IndexColumn[]> {
  const names = (
    db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type = 'index' AND tbl_name = ? AND sql IS NOT NULL ORDER BY name"
      )
      .all("compression_engine_breakdown") as Array<{ name: string }>
  ).map((row) => row.name);
  return Object.fromEntries(
    names.map((name) => [
      name,
      (db.prepare(`PRAGMA index_xinfo(${name})`).all() as IndexColumn[])
        .filter((column) => column.key === 1)
        .map(({ name: column, desc, key }) => ({ name: column, desc, key })),
    ])
  );
}

// The lazy CREATE is private; the write path is the production caller that runs it.
function lazyInsert(requestId: string) {
  insertCompressionEngineBreakdown([
    {
      timestamp: new Date().toISOString(),
      request_id: requestId,
      engine: "rtk",
      original_tokens: 100,
      compressed_tokens: 40,
      tokens_saved: 60,
      duration_ms: 3,
    },
  ]);
}

test("a clean install has compression_engine_breakdown and its indexes before any feature runs", () => {
  core.resetDbInstance();
  const db = core.getDbInstance();
  const table = db
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
    .get("compression_engine_breakdown");
  assert.ok(table, "runMigrations must create compression_engine_breakdown on a fresh database");
  assert.deepEqual(Object.keys(indexes(db)), INDEXES);
  const applied = db
    .prepare("SELECT version FROM _omniroute_migrations WHERE version = ?")
    .get(VERSION);
  assert.ok(applied, "the migration is recorded in the ledger");
});

test("the migration and the lazy CREATE define the same columns and indexes", () => {
  core.resetDbInstance();
  const db = core.getDbInstance();
  const fromMigration = { columns: columns(db), indexes: indexes(db) };

  db.exec("DROP TABLE compression_engine_breakdown");
  lazyInsert("lazy-shape");
  const fromLazy = { columns: columns(db), indexes: indexes(db) };

  assert.deepEqual(fromMigration, fromLazy);
  assert.equal(fromMigration.columns.length, 8);
});

test("re-running the migration keeps a lazily created table and its rows", () => {
  core.resetDbInstance();
  const db = core.getDbInstance();
  db.exec("DROP TABLE compression_engine_breakdown");
  lazyInsert("req-1");

  db.exec(fs.readFileSync(MIGRATION, "utf8"));

  const { count } = db
    .prepare("SELECT COUNT(*) AS count FROM compression_engine_breakdown")
    .get() as { count: number };
  assert.equal(count, 1);
  assert.deepEqual(Object.keys(indexes(db)), INDEXES);
});
