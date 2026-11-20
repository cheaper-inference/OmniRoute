import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// cache_metrics used to be created only lazily (ensureCacheMetricsTable, run when the semantic
// cache builds its in-memory tier). A clean install and an upgraded install then differed by
// whether the cache had been used, the divergence check:install-upgrade fails on; it was only
// tolerated through an install-upgrade-allowlist.json entry, which covers the upgrade side and
// never the clean-install side (#20511 is that failure on compression_run_telemetry). The
// migration makes every database have the table and its seed rows right after runMigrations,
// with the lazy DDL's exact columns.
const scratch = fs.mkdtempSync(path.join(os.tmpdir(), "cache-metrics-migration-"));
const data = path.join(scratch, "data");
fs.mkdirSync(data, { recursive: true });
process.env.DATA_DIR = data;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const VERSION = "20261119144750";
const MIGRATION = new URL(
  `../../../src/lib/db/migrations/${VERSION}_cache_metrics.sql`,
  import.meta.url
);
const SEED_KEYS = ["hits", "misses", "tokens_saved"];

const core = await import("../../../src/lib/db/core.ts");
const { ensureCacheMetricsTable } = await import("../../../src/lib/semanticCache.ts");
const { stopSemanticCachePruneJob } =
  await import("../../../src/lib/jobs/semanticCachePruneJob.ts");

test.after(() => {
  stopSemanticCachePruneJob();
  core.resetDbInstance();
  fs.rmSync(scratch, { recursive: true, force: true });
});

type Db = ReturnType<typeof core.getDbInstance>;
type Column = { name: string; type: string; notnull: number; dflt_value: unknown; pk: number };
type IndexInfo = { unique: number; origin: string; columns: string[] };

function columns(db: Db): Column[] {
  return (db.prepare("PRAGMA table_info(cache_metrics)").all() as Column[]).map(
    ({ name, type, notnull, dflt_value, pk }) => ({ name, type, notnull, dflt_value, pk })
  );
}

/** Every index on the table, the PRIMARY KEY autoindex included (its `sql` is NULL). */
function indexes(db: Db): Record<string, IndexInfo> {
  const list = db.prepare("PRAGMA index_list(cache_metrics)").all() as Array<{
    name: string;
    unique: number;
    origin: string;
  }>;
  return Object.fromEntries(
    list
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(({ name, unique, origin }) => [
        name,
        {
          unique,
          origin,
          columns: (
            db.prepare(`PRAGMA index_xinfo(${name})`).all() as Array<{ name: string; key: number }>
          )
            .filter((column) => column.key === 1)
            .map((column) => column.name),
        },
      ])
  );
}

function seedKeys(db: Db): string[] {
  return (
    db.prepare("SELECT key FROM cache_metrics ORDER BY key").all() as Array<{ key: string }>
  ).map((row) => row.key);
}

test("a clean install has cache_metrics and its seed rows before the cache runs", () => {
  core.resetDbInstance();
  const db = core.getDbInstance();
  const table = db
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
    .get("cache_metrics");
  assert.ok(table, "runMigrations must create cache_metrics on a fresh database");
  assert.deepEqual(seedKeys(db), SEED_KEYS);
  const applied = db
    .prepare("SELECT version FROM _omniroute_migrations WHERE version = ?")
    .get(VERSION);
  assert.ok(applied, "the migration is recorded in the ledger");
});

test("the migration and the lazy CREATE define the same columns, indexes and seed rows", () => {
  core.resetDbInstance();
  const db = core.getDbInstance();
  const fromMigration = { columns: columns(db), indexes: indexes(db), seed: seedKeys(db) };

  db.exec("DROP TABLE cache_metrics");
  ensureCacheMetricsTable();
  const fromLazy = { columns: columns(db), indexes: indexes(db), seed: seedKeys(db) };

  assert.deepEqual(fromMigration, fromLazy);
  assert.equal(fromMigration.columns.length, 3);
  assert.deepEqual(Object.values(fromMigration.indexes), [
    { unique: 1, origin: "pk", columns: ["key"] },
  ]);
});

test("re-running the migration keeps a lazily created table and its counters", () => {
  core.resetDbInstance();
  const db = core.getDbInstance();
  db.exec("DROP TABLE cache_metrics");
  ensureCacheMetricsTable();
  db.prepare("UPDATE cache_metrics SET value = ? WHERE key = ?").run(7, "hits");
  db.prepare("UPDATE cache_metrics SET value = ? WHERE key = ?").run(1234, "tokens_saved");

  db.exec(fs.readFileSync(MIGRATION, "utf8"));

  const rows = db.prepare("SELECT key, value FROM cache_metrics ORDER BY key").all() as Array<{
    key: string;
    value: number;
  }>;
  assert.deepEqual(
    rows.map(({ key, value }) => ({ key, value })),
    [
      { key: "hits", value: 7 },
      { key: "misses", value: 0 },
      { key: "tokens_saved", value: 1234 },
    ]
  );
});
