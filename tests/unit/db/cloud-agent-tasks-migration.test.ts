import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// cloud_agent_tasks used to be created only lazily (createCloudAgentTaskTable, run by the
// /api/v1/agents/tasks routes). A clean install and an upgraded install then differed by
// whether the Cloud Agents feature had been used, the divergence check:install-upgrade fails
// on. The migration makes every database have the table and its indexes right after
// runMigrations, with the lazy DDL's exact columns.
const scratch = fs.mkdtempSync(path.join(os.tmpdir(), "cloud-agent-tasks-migration-"));
const data = path.join(scratch, "data");
fs.mkdirSync(data, { recursive: true });
process.env.DATA_DIR = data;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const VERSION = "20261118212845";
const MIGRATION = new URL(
  `../../../src/lib/db/migrations/${VERSION}_cloud_agent_tasks.sql`,
  import.meta.url
);
const INDEXES = [
  "idx_cloud_agent_tasks_created",
  "idx_cloud_agent_tasks_provider",
  "idx_cloud_agent_tasks_status",
];

const core = await import("../../../src/lib/db/core.ts");
const { createCloudAgentTaskTable } = await import("../../../src/lib/cloudAgent/db.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(scratch, { recursive: true, force: true });
});

type Db = ReturnType<typeof core.getDbInstance>;
type Column = { name: string; type: string; notnull: number; dflt_value: unknown; pk: number };
type IndexColumn = { name: string; desc: number; key: number };

function columns(db: Db): Column[] {
  return (db.prepare("PRAGMA table_info(cloud_agent_tasks)").all() as Column[]).map(
    ({ name, type, notnull, dflt_value, pk }) => ({ name, type, notnull, dflt_value, pk })
  );
}

function indexes(db: Db): Record<string, IndexColumn[]> {
  const names = (
    db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type = 'index' AND tbl_name = ? AND sql IS NOT NULL ORDER BY name"
      )
      .all("cloud_agent_tasks") as Array<{ name: string }>
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

test("a clean install has cloud_agent_tasks and its indexes before any feature runs", () => {
  core.resetDbInstance();
  const db = core.getDbInstance();
  const table = db
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
    .get("cloud_agent_tasks");
  assert.ok(table, "runMigrations must create cloud_agent_tasks on a fresh database");
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

  db.exec("DROP TABLE cloud_agent_tasks");
  createCloudAgentTaskTable();
  const fromLazy = { columns: columns(db), indexes: indexes(db) };

  assert.deepEqual(fromMigration, fromLazy);
  assert.equal(fromMigration.columns.length, 13);
});

test("re-running the migration keeps a lazily created table and its rows", () => {
  core.resetDbInstance();
  const db = core.getDbInstance();
  db.exec("DROP TABLE cloud_agent_tasks");
  createCloudAgentTaskTable();
  db.prepare(
    "INSERT INTO cloud_agent_tasks (id, provider_id, prompt, source) VALUES (?, ?, ?, ?)"
  ).run("task-1", "jules", "hello", "api");

  db.exec(fs.readFileSync(MIGRATION, "utf8"));

  const { count } = db.prepare("SELECT COUNT(*) AS count FROM cloud_agent_tasks").get() as {
    count: number;
  };
  assert.equal(count, 1);
  assert.deepEqual(Object.keys(indexes(db)), INDEXES);
});
