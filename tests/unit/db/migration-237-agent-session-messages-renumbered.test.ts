// Earlier #14864 builds shipped agent_session_messages as 199, 200, 210, 216, 231 and 232 — slots
// upstream assigns to its own migrations. A database that ran one of those builds must move its
// row to 237, keep its captured turns, and still receive the upstream migration of that slot
// (the runner treats a version as applied by number).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const scratchDir = process.env.DATA_DIR || path.resolve("_artifacts/tests");
fs.mkdirSync(scratchDir, { recursive: true });
const TEST_DATA_DIR = fs.mkdtempSync(path.join(scratchDir, "omniroute-session-messages-renumber-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");

type Db = ReturnType<typeof core.getDbInstance>;

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(resetStorage);
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function hasObject(db: Db, type: "table" | "index", name: string): boolean {
  return Boolean(
    db.prepare("SELECT 1 FROM sqlite_master WHERE type = ? AND name = ?").get(type, name)
  );
}

function hasColumn(db: Db, table: string, column: string): boolean {
  return (db.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[]).some(
    (row) => row.name === column
  );
}

const HISTORICAL_BUILDS = [
  {
    version: "199",
    upstream: "proxy_operator_egress",
    undo: "DROP TABLE proxy_operator_egress;",
    restored: (db: Db) => hasObject(db, "table", "proxy_operator_egress"),
  },
  {
    version: "200",
    upstream: "provider_health_matrix_covering_index",
    undo: "DROP INDEX idx_cl_health_matrix_cover;",
    restored: (db: Db) => hasObject(db, "index", "idx_cl_health_matrix_cover"),
  },
  {
    version: "210",
    upstream: "call_logs_detail_pending",
    undo: "ALTER TABLE call_logs DROP COLUMN detail_pending_until;",
    restored: (db: Db) => hasColumn(db, "call_logs", "detail_pending_until"),
  },
  {
    version: "216",
    upstream: "team_cost_shapes",
    undo: `
      ALTER TABLE daily_team_usage_summary DROP COLUMN token_shapes_json;
      ALTER TABLE daily_team_usage_summary DROP COLUMN successful_token_shapes_json;
    `,
    restored: (db: Db) =>
      hasColumn(db, "daily_team_usage_summary", "token_shapes_json") &&
      hasColumn(db, "daily_team_usage_summary", "successful_token_shapes_json"),
  },
  {
    version: "231",
    upstream: "daily_cached_input",
    undo: "ALTER TABLE daily_usage_summary DROP COLUMN total_cache_read_tokens;",
    restored: (db: Db) => hasColumn(db, "daily_usage_summary", "total_cache_read_tokens"),
  },
  {
    version: "232",
    upstream: "proxy_payload_traffic",
    undo: "DROP TABLE proxy_payload_traffic;",
    restored: (db: Db) => hasObject(db, "table", "proxy_payload_traffic"),
  },
];

for (const build of HISTORICAL_BUILDS) {
  test(`agent_session_messages ${build.version} moves to 237 and frees the slot for ${build.upstream}`, () => {
    const db = core.getDbInstance();
    db.prepare(
      "INSERT INTO agent_session_messages (session_id, api_key_id, timestamp, user_text) VALUES (?, ?, ?, ?)"
    ).run("kept-session", "key-1", new Date().toISOString(), "kept turn");
    // Rewind the ledger to what that build left behind: its own name in the upstream slot,
    // which never ran there, and nothing at 237.
    db.exec(`
      DELETE FROM _omniroute_migrations WHERE version = '${build.version}';
      UPDATE _omniroute_migrations SET version = '${build.version}'
        WHERE version = '237' AND name = 'agent_session_messages';
      ${build.undo}
    `);
    assert.equal(build.restored(db), false);

    runMigrations(db);

    assert.deepEqual(
      db
        .prepare(
          "SELECT version, name FROM _omniroute_migrations WHERE version IN (?, '237') ORDER BY version"
        )
        .all(build.version),
      [
        { version: build.version, name: build.upstream },
        { version: "237", name: "agent_session_messages" },
      ]
    );
    assert.equal(build.restored(db), true);
    assert.deepEqual(db.prepare("SELECT session_id, user_text FROM agent_session_messages").all(), [
      { session_id: "kept-session", user_text: "kept turn" },
    ]);
  });
}
