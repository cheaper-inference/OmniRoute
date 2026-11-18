// The self-service + agent-session stack (#14771, #14833) was published with its migrations at
// 229–231 and later at 228–230, while the release filled those slots with its own migrations.
// The stack now lives at 233 (self-service settings, landed with #14771), 234 (agent_sessions)
// and 235 (usage_history.agent_session_id). A database that ran either published layout must
// move every stack row to its new slot without losing data, and still receive the upstream
// migrations of the vacated slots.
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

const PUBLISHED_LAYOUTS = [
  { selfService: "229", sessions: "230", usage: "231" },
  { selfService: "228", sessions: "229", usage: "230" },
];

for (const layout of PUBLISHED_LAYOUTS) {
  const slots = [layout.selfService, layout.sessions, layout.usage];
  test(`a database migrated by the ${slots.join("/")} stack build shifts its rows to 233/234/235`, () => {
    const db = core.getDbInstance();
    const now = new Date().toISOString();
    db.prepare(
      "INSERT INTO agent_sessions (id, api_key_id, first_seen_at, last_seen_at, request_count) VALUES (?, ?, ?, ?, 2)"
    ).run("kept-session", "key-1", now, now);
    const upstream = Object.fromEntries(
      (
        db
          .prepare(
            `SELECT version, name FROM _omniroute_migrations WHERE version IN (${slots
              .map(() => "?")
              .join(", ")})`
          )
          .all(...slots) as Array<{ version: string; name: string }>
      ).map((row) => [row.version, row.name])
    );

    // Rewind the ledger to the published layout: the stack's own names in the upstream slots,
    // which never ran there, and nothing at 233–235.
    db.exec(`
      DELETE FROM _omniroute_migrations WHERE version IN ('${slots.join("', '")}');
      UPDATE _omniroute_migrations SET version = '${layout.selfService}'
        WHERE version = '233' AND name = 'api_key_self_service_settings';
      UPDATE _omniroute_migrations SET version = '${layout.sessions}'
        WHERE version = '234' AND name = 'agent_sessions';
      UPDATE _omniroute_migrations SET version = '${layout.usage}'
        WHERE version = '235' AND name = 'usage_history_agent_session_id';
    `);

    runMigrations(db);

    const ledger = db
      .prepare(
        `SELECT version, name FROM _omniroute_migrations WHERE version IN (${[
          ...slots,
          "233",
          "234",
          "235",
        ]
          .map(() => "?")
          .join(", ")}) ORDER BY version`
      )
      .all(...slots, "233", "234", "235");
    assert.deepEqual(ledger, [
      ...[...slots].sort().map((version) => ({ version, name: upstream[version] })),
      { version: "233", name: "api_key_self_service_settings" },
      { version: "234", name: "agent_sessions" },
      { version: "235", name: "usage_history_agent_session_id" },
    ]);
    const columns = db.prepare("PRAGMA table_info(usage_history)").all() as Array<{
      name: string;
    }>;
    assert.ok(columns.some((column) => column.name === "agent_session_id"));
    // A second boot finds nothing to repair.
    assert.doesNotThrow(() => runMigrations(db));
    assert.deepEqual(db.prepare("SELECT id, request_count FROM agent_sessions").all(), [
      { id: "kept-session", request_count: 2 },
    ]);
  });
}
