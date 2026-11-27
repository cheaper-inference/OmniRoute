import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// prompt_templates used to be created only lazily (ensureSchema in src/lib/db/prompts.ts, run on
// the first read or write of the store). Nothing imported the store until the opt-in template://
// expansion (src/lib/promptTemplateExpand.ts) did, so a clean install and an upgraded install
// would differ by whether a template had been looked up, the divergence check:install-upgrade
// fails on. The migration makes every database have the table and its indexes right after
// runMigrations, with the lazy DDL's exact columns.
const scratch = fs.mkdtempSync(path.join(os.tmpdir(), "prompt-templates-migration-"));
const data = path.join(scratch, "data");
fs.mkdirSync(data, { recursive: true });
process.env.DATA_DIR = data;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const VERSION = "20261123194156";
const MIGRATION = new URL(
  `../../../src/lib/db/migrations/${VERSION}_prompt_templates.sql`,
  import.meta.url
);
const PROMPTS_MODULE = "../../../src/lib/db/prompts.ts";
const INDEXES = ["idx_pt_active", "idx_pt_hash", "idx_pt_slug"];

const core = await import("../../../src/lib/db/core.ts");

// ensureSchema() runs its CREATE once per module instance, so each check that needs the lazy
// DDL to run again loads a fresh copy of the store (the query string makes a new instance; the
// database singleton in core.ts stays shared).
let instance = 0;
async function freshPromptStore(): Promise<typeof import("../../../src/lib/db/prompts.ts")> {
  instance += 1;
  return import(`${PROMPTS_MODULE}?instance=${instance}`);
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(scratch, { recursive: true, force: true });
});

type Db = ReturnType<typeof core.getDbInstance>;
type Column = { name: string; type: string; notnull: number; dflt_value: unknown; pk: number };
type IndexColumn = { name: string; desc: number; key: number };

function columns(db: Db): Column[] {
  return (db.prepare("PRAGMA table_info(prompt_templates)").all() as Column[]).map(
    ({ name, type, notnull, dflt_value, pk }) => ({ name, type, notnull, dflt_value, pk })
  );
}

function indexes(db: Db): Record<string, IndexColumn[]> {
  const names = (
    db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type = 'index' AND tbl_name = ? AND sql IS NOT NULL ORDER BY name"
      )
      .all("prompt_templates") as Array<{ name: string }>
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

function schemaSql(db: Db): Array<{ type: string; name: string; sql: string | null }> {
  return db
    .prepare("SELECT type, name, sql FROM sqlite_master WHERE tbl_name = ? ORDER BY type, name")
    .all("prompt_templates") as Array<{ type: string; name: string; sql: string | null }>;
}

test("a clean install has prompt_templates and its indexes before any feature runs", () => {
  core.resetDbInstance();
  const db = core.getDbInstance();
  const table = db
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
    .get("prompt_templates");
  assert.ok(table, "runMigrations must create prompt_templates on a fresh database");
  assert.deepEqual(Object.keys(indexes(db)), INDEXES);
  const applied = db
    .prepare("SELECT version FROM _omniroute_migrations WHERE version = ?")
    .get(VERSION);
  assert.ok(applied, "the migration is recorded in the ledger");
});

test("the lazy CREATE over the migration's table changes nothing", async () => {
  core.resetDbInstance();
  const db = core.getDbInstance();
  const before = schemaSql(db);

  const store = await freshPromptStore();
  assert.deepEqual(store.listPrompts(), []);

  assert.deepEqual(schemaSql(db), before);
});

test("the migration and the lazy CREATE define the same columns and indexes", async () => {
  core.resetDbInstance();
  const db = core.getDbInstance();
  const fromMigration = { columns: columns(db), indexes: indexes(db) };

  db.exec("DROP TABLE prompt_templates");
  const store = await freshPromptStore();
  assert.deepEqual(store.listPrompts(), []);
  const fromLazy = { columns: columns(db), indexes: indexes(db) };

  assert.deepEqual(fromMigration, fromLazy);
  assert.equal(fromMigration.columns.length, 9);
});

test("re-running the migration keeps a lazily created table and its rows", async () => {
  core.resetDbInstance();
  const db = core.getDbInstance();
  db.exec("DROP TABLE prompt_templates");
  const store = await freshPromptStore();
  store.savePrompt("greeting", "Hello {{name}}", { variables: ["name"] });

  db.exec(fs.readFileSync(MIGRATION, "utf8"));

  const { count } = db.prepare("SELECT COUNT(*) AS count FROM prompt_templates").get() as {
    count: number;
  };
  assert.equal(count, 1);
  assert.deepEqual(Object.keys(indexes(db)), INDEXES);
  assert.equal(store.getActivePrompt("greeting")?.content, "Hello {{name}}");
});
