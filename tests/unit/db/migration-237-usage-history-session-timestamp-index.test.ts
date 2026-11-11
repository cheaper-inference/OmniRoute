// 237 adds the (agent_session_id, timestamp) index that the team reports' per-session reads use:
// session detail pages and timeline, and the active-time window function.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";

const repoMigrations = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../src/lib/db/migrations"
);
const MIGRATION_FILES = [
  "234_agent_sessions.sql",
  "235_usage_history_agent_session_id.sql",
  "237_usage_history_session_timestamp_index.sql",
];
const scratchDir = process.env.DATA_DIR || path.resolve("_artifacts/tests");
fs.mkdirSync(scratchDir, { recursive: true });
const migrationsDir = fs.mkdtempSync(path.join(scratchDir, "omniroute-migration-237-"));
for (const file of MIGRATION_FILES) {
  fs.copyFileSync(path.join(repoMigrations, file), path.join(migrationsDir, file));
}
const originalMigrationsDir = process.env.OMNIROUTE_MIGRATIONS_DIR;
process.env.OMNIROUTE_MIGRATIONS_DIR = migrationsDir;

const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");

test.after(() => {
  fs.rmSync(migrationsDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalMigrationsDir === undefined) delete process.env.OMNIROUTE_MIGRATIONS_DIR;
  else process.env.OMNIROUTE_MIGRATIONS_DIR = originalMigrationsDir;
});

function openDb(): Database.Database {
  const db = new Database(":memory:");
  db.exec(
    "CREATE TABLE usage_history (id INTEGER PRIMARY KEY, api_key_id TEXT, timestamp TEXT NOT NULL)"
  );
  return db;
}

function indexColumns(db: Database.Database, name: string): string[] {
  return (
    db.prepare(`PRAGMA index_info(${JSON.stringify(name)})`).all() as Array<{ name: string }>
  ).map((column) => column.name);
}

function appliedVersions(db: Database.Database): string[] {
  return (
    db.prepare("SELECT version FROM _omniroute_migrations ORDER BY version").all() as Array<{
      version: string;
    }>
  ).map((row) => row.version);
}

test("237 creates the (agent_session_id, timestamp) index; a rerun is a no-op", () => {
  const db = openDb();
  try {
    assert.equal(runMigrations(db, { isNewDb: true }), 3);
    assert.deepEqual(indexColumns(db, "idx_uh_agent_session_timestamp"), [
      "agent_session_id",
      "timestamp",
    ]);
    // 235's single-column index stays in this phase.
    assert.deepEqual(indexColumns(db, "idx_uh_agent_session"), ["agent_session_id"]);
    assert.equal(runMigrations(db, { isNewDb: true }), 0);
    assert.deepEqual(appliedVersions(db), ["234", "235", "237"]);
  } finally {
    db.close();
  }
});

test("237 applies cleanly when the index already exists", () => {
  const db = openDb();
  try {
    db.exec("ALTER TABLE usage_history ADD COLUMN agent_session_id TEXT");
    db.exec(
      "CREATE INDEX idx_uh_agent_session_timestamp ON usage_history(agent_session_id, timestamp)"
    );
    runMigrations(db, { isNewDb: true });
    assert.ok(appliedVersions(db).includes("237"));
    assert.deepEqual(indexColumns(db, "idx_uh_agent_session_timestamp"), [
      "agent_session_id",
      "timestamp",
    ]);
  } finally {
    db.close();
  }
});

test("a session's requests in time order read from the index without a sort", () => {
  const db = openDb();
  try {
    runMigrations(db, { isNewDb: true });
    const plan = (
      db
        .prepare(
          `EXPLAIN QUERY PLAN SELECT id FROM usage_history WHERE agent_session_id = ?
           ORDER BY timestamp DESC, id DESC LIMIT 50`
        )
        .all("as_1") as Array<{ detail: string }>
    ).map((row) => row.detail);
    assert.ok(
      plan.some((detail) => detail.includes("idx_uh_agent_session_timestamp")),
      plan.join("; ")
    );
    assert.ok(!plan.some((detail) => detail.includes("TEMP B-TREE")), plan.join("; "));
  } finally {
    db.close();
  }
});
