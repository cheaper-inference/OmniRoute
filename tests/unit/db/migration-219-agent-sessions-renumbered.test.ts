// Earlier #14833 builds shipped agent_sessions / usage_history.agent_session_id as 190/191,
// 197/198, 198/199, 208/209 and 214/215 — slots upstream assigns to its own migrations. A
// database that ran one of those builds must move its rows to 219/220, keep its sessions, and still receive
// the upstream migrations of those slots (the runner treats a version as applied by number).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const scratchDir = process.env.DATA_DIR || path.resolve("_artifacts/tests");
fs.mkdirSync(scratchDir, { recursive: true });
const TEST_DATA_DIR = fs.mkdtempSync(path.join(scratchDir, "omniroute-agent-sessions-renumber-"));
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

function columns(db: Db, table: string): string[] {
  return (db.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[]).map(
    (column) => column.name
  );
}

function hasObject(db: Db, type: "table" | "index", name: string): boolean {
  return Boolean(
    db.prepare("SELECT 1 FROM sqlite_master WHERE type = ? AND name = ?").get(type, name)
  );
}

const HISTORICAL_BUILDS = [
  {
    sessions: "190",
    usage: "191",
    upstream: ["call_logs_content_provenance", "call_logs_resilience_actions"],
    undo: `
      ALTER TABLE call_logs DROP COLUMN has_content;
      ALTER TABLE call_logs DROP COLUMN usage_provenance;
      ALTER TABLE call_logs DROP COLUMN resilience_actions;
    `,
    restored: (db: Db) =>
      ["has_content", "usage_provenance", "resilience_actions"].every((name) =>
        columns(db, "call_logs").includes(name)
      ),
  },
  {
    sessions: "197",
    usage: "198",
    upstream: ["proxy_subscription_core_config", "proxy_subscription_core_binary"],
    undo: `
      ALTER TABLE proxy_subscriptions DROP COLUMN core_config_path;
      ALTER TABLE proxy_subscriptions DROP COLUMN selector_last_switch_kind;
      ALTER TABLE proxy_subscriptions DROP COLUMN core_binary_path;
    `,
    restored: (db: Db) =>
      ["core_config_path", "selector_last_switch_kind", "core_binary_path"].every((name) =>
        columns(db, "proxy_subscriptions").includes(name)
      ),
  },
  {
    sessions: "198",
    usage: "199",
    upstream: ["proxy_subscription_core_binary", "proxy_operator_egress"],
    undo: `
      ALTER TABLE proxy_subscriptions DROP COLUMN core_binary_path;
      DROP TABLE proxy_operator_egress;
    `,
    restored: (db: Db) =>
      columns(db, "proxy_subscriptions").includes("core_binary_path") &&
      hasObject(db, "table", "proxy_operator_egress"),
  },
  {
    sessions: "208",
    usage: "209",
    upstream: [
      "proxy_subscription_selector_last_switch_by_selector",
      "call_logs_artifact_relpath_index",
    ],
    undo: `
      ALTER TABLE proxy_subscriptions DROP COLUMN selector_last_switch_by_selector;
      DROP INDEX idx_cl_artifact_relpath;
    `,
    restored: (db: Db) =>
      columns(db, "proxy_subscriptions").includes("selector_last_switch_by_selector") &&
      hasObject(db, "index", "idx_cl_artifact_relpath"),
  },
  {
    sessions: "214",
    usage: "215",
    upstream: ["call_logs_client_session_id", "team_cost_centers"],
    undo: `
      DROP INDEX idx_cl_client_session_id;
      ALTER TABLE call_logs DROP COLUMN client_session_id;
      DROP INDEX idx_usage_history_billing_team_time;
    `,
    restored: (db: Db) =>
      columns(db, "call_logs").includes("client_session_id") &&
      hasObject(db, "index", "idx_usage_history_billing_team_time"),
  },
];

for (const build of HISTORICAL_BUILDS) {
  test(`agent-session migrations ${build.sessions}/${build.usage} move to 219/220 and free the slots for ${build.upstream.join(" + ")}`, () => {
    const db = core.getDbInstance();
    const now = new Date().toISOString();
    db.prepare(
      "INSERT INTO agent_sessions (id, api_key_id, first_seen_at, last_seen_at, request_count) VALUES (?, ?, ?, ?, 3)"
    ).run("kept-session", "key-1", now, now);
    // Rewind the ledger to what that build left behind: its own names in the upstream slots,
    // which never ran there, and nothing at 219/220.
    db.exec(`
      DELETE FROM _omniroute_migrations WHERE version IN ('${build.sessions}', '${build.usage}');
      UPDATE _omniroute_migrations SET version = '${build.sessions}'
        WHERE version = '219' AND name = 'agent_sessions';
      UPDATE _omniroute_migrations SET version = '${build.usage}'
        WHERE version = '220' AND name = 'usage_history_agent_session_id';
      ${build.undo}
    `);
    assert.equal(build.restored(db), false);

    runMigrations(db);

    const ledger = db
      .prepare(
        "SELECT version, name FROM _omniroute_migrations WHERE version IN (?, ?, '219', '220') ORDER BY version"
      )
      .all(build.sessions, build.usage);
    assert.deepEqual(ledger, [
      { version: build.sessions, name: build.upstream[0] },
      { version: build.usage, name: build.upstream[1] },
      { version: "219", name: "agent_sessions" },
      { version: "220", name: "usage_history_agent_session_id" },
    ]);
    assert.equal(build.restored(db), true);
    assert.ok(columns(db, "usage_history").includes("agent_session_id"));
    assert.deepEqual(db.prepare("SELECT id, request_count FROM agent_sessions").all(), [
      { id: "kept-session", request_count: 3 },
    ]);
  });
}
