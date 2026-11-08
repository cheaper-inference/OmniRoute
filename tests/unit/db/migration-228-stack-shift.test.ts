// The self-service + agent-session stack (#14771, #14833) was published with its migrations at
// 229–231 while the release still ended at 222. The release then filled 223–227, so the stack
// now starts at 228. A database that ran one of the 229–231 builds must move every row down one
// slot, in order, without re-running or losing data.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const scratchDir = process.env.DATA_DIR || path.resolve("_artifacts/tests");
fs.mkdirSync(scratchDir, { recursive: true });
const TEST_DATA_DIR = fs.mkdtempSync(path.join(scratchDir, "omniroute-stack-shift-228-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a database migrated by a 229–231 stack build shifts its rows to 228–230", () => {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    "INSERT INTO agent_sessions (id, api_key_id, first_seen_at, last_seen_at, request_count) VALUES (?, ?, ?, ?, 2)"
  ).run("kept-session", "key-1", now, now);

  // Rewind the ledger to the published layout. Highest first so no version is taken twice.
  db.exec(`
    UPDATE _omniroute_migrations SET version = '231'
      WHERE version = '230' AND name = 'usage_history_agent_session_id';
    UPDATE _omniroute_migrations SET version = '230'
      WHERE version = '229' AND name = 'agent_sessions';
    UPDATE _omniroute_migrations SET version = '229'
      WHERE version = '228' AND name = 'api_key_self_service_settings';
  `);

  runMigrations(db);

  // Nothing is on disk at 231 yet, so the runner leaves that published row alone and records
  // 230 again (its ALTER is a duplicate-column no-op). The 231 -> 230 entry clears the row
  // once a migration takes slot 231.
  const ledger = db
    .prepare(
      "SELECT version, name FROM _omniroute_migrations WHERE version IN ('228', '229', '230') ORDER BY version"
    )
    .all();
  assert.deepEqual(ledger, [
    { version: "228", name: "api_key_self_service_settings" },
    { version: "229", name: "agent_sessions" },
    { version: "230", name: "usage_history_agent_session_id" },
  ]);
  const columns = db.prepare("PRAGMA table_info(usage_history)").all() as Array<{ name: string }>;
  assert.ok(columns.some((column) => column.name === "agent_session_id"));
  // A second boot finds nothing to repair.
  assert.doesNotThrow(() => runMigrations(db));
  assert.deepEqual(db.prepare("SELECT id, request_count FROM agent_sessions").all(), [
    { id: "kept-session", request_count: 2 },
  ]);
});
