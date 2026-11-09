// The self-service + agent-session stack (#14771, #14833, #14860) was published with its
// migrations at 229–231, and later at 228–230. The release then took 228–232
// (purge_orphaned_provider_catalogs, api_key_five_hour_limit, call_logs_cache_write_tiers,
// daily_cached_input, proxy_payload_traffic), so the stack now lives at 233–235. A database
// that ran a 229–231 build must move its rows up without losing data and still receive the
// upstream migrations of the slots it held.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const scratchDir = process.env.DATA_DIR || path.resolve("_artifacts/tests");
fs.mkdirSync(scratchDir, { recursive: true });
const TEST_DATA_DIR = fs.mkdtempSync(path.join(scratchDir, "omniroute-stack-shift-233-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function columns(db: ReturnType<typeof core.getDbInstance>, table: string): string[] {
  return (db.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[]).map(
    (column) => column.name
  );
}

test("a database migrated by a 229–231 stack build moves its rows to 233–235", () => {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    "INSERT INTO agent_sessions (id, api_key_id, first_seen_at, last_seen_at, request_count) VALUES (?, ?, ?, ?, 2)"
  ).run("kept-session", "key-1", now, now);
  db.prepare(
    "INSERT INTO api_key_self_service_settings (api_key_id, shared_quota_providers) VALUES (?, ?)"
  ).run("key-1", '["codex"]');

  // Rewind the ledger to the published layout: the stack at 229–231 and the upstream
  // 229/230/231 migrations never run.
  db.exec(`
    DELETE FROM _omniroute_migrations WHERE version IN ('229', '230', '231');
    UPDATE _omniroute_migrations SET version = '229'
      WHERE version = '233' AND name = 'api_key_self_service_settings';
    UPDATE _omniroute_migrations SET version = '230'
      WHERE version = '234' AND name = 'agent_sessions';
    UPDATE _omniroute_migrations SET version = '231'
      WHERE version = '235' AND name = 'usage_history_agent_session_id';
    ALTER TABLE daily_usage_summary DROP COLUMN total_cache_read_tokens;
    ALTER TABLE api_keys DROP COLUMN five_hour_usage_limit_usd;
    ALTER TABLE call_logs DROP COLUMN tokens_cache_creation_5m;
    ALTER TABLE call_logs DROP COLUMN tokens_cache_creation_1h;
    ALTER TABLE call_logs DROP COLUMN cache_creation_tier_status;
    ALTER TABLE call_logs DROP COLUMN cache_write_cost_usd;
    ALTER TABLE call_logs DROP COLUMN cache_write_priced_tokens;
  `);

  runMigrations(db);

  const ledger = db
    .prepare(
      "SELECT version, name FROM _omniroute_migrations WHERE version BETWEEN '229' AND '235' ORDER BY version"
    )
    .all();
  assert.deepEqual(ledger, [
    { version: "229", name: "api_key_five_hour_limit" },
    { version: "230", name: "call_logs_cache_write_tiers" },
    { version: "231", name: "daily_cached_input" },
    { version: "232", name: "proxy_payload_traffic" },
    { version: "233", name: "api_key_self_service_settings" },
    { version: "234", name: "agent_sessions" },
    { version: "235", name: "usage_history_agent_session_id" },
  ]);
  assert.ok(columns(db, "api_keys").includes("five_hour_usage_limit_usd"));
  assert.ok(columns(db, "call_logs").includes("cache_write_priced_tokens"));
  assert.ok(columns(db, "daily_usage_summary").includes("total_cache_read_tokens"));
  assert.deepEqual(db.prepare("SELECT id, request_count FROM agent_sessions").all(), [
    { id: "kept-session", request_count: 2 },
  ]);
  assert.deepEqual(
    db
      .prepare("SELECT api_key_id, shared_quota_providers FROM api_key_self_service_settings")
      .all(),
    [{ api_key_id: "key-1", shared_quota_providers: '["codex"]' }]
  );
});
