// Guards the launch_sessions migration name: it ships as a timestamped file, and databases that
// ran an earlier build of the PR (as 240_ or 242_) must be moved onto that file, not re-run it.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const scratchDir = process.env.DATA_DIR || path.resolve("_artifacts/tests");
fs.mkdirSync(scratchDir, { recursive: true });
const TEST_DATA_DIR = fs.mkdtempSync(path.join(scratchDir, "omniroute-launch-migration-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");

const MIGRATIONS_DIR = path.resolve("src/lib/db/migrations");

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

const files = fs.readdirSync(MIGRATIONS_DIR).filter((f) => f.endsWith(".sql"));
const STAMP = "20261116102450";

function ledgerFor(db: ReturnType<typeof core.getDbInstance>, name: string) {
  return db
    .prepare("SELECT version, name FROM _omniroute_migrations WHERE name = ? ORDER BY rowid")
    .all(name);
}

test("exactly one launch_sessions migration and it is the timestamped file", () => {
  assert.deepEqual(
    files.filter((f) => /_launch_sessions\.sql$/.test(f)),
    [`${STAMP}_launch_sessions.sql`]
  );
  assert.deepEqual(
    files.filter((f) => f.startsWith("242_")),
    []
  );
});

test("migration creates the table, columns and indexes; ledger has the timestamp", () => {
  const db = core.getDbInstance();
  assert.deepEqual(ledgerFor(db, "launch_sessions"), [{ version: STAMP, name: "launch_sessions" }]);

  const cols = (db.prepare("PRAGMA table_info(launch_sessions)").all() as { name: string }[]).map(
    (c) => c.name
  );
  for (const expected of [
    "id",
    "secret_hash",
    "parent_key_id",
    "parent_credential_hash",
    "tool_id",
    "session_tag",
    "agent_session_id",
    "view_json",
    "spec_json",
    "policy_json",
    "attribution_json",
    "preset",
    "ttl_seconds",
    "created_at",
    "expires_at",
    "last_seen_at",
    "revoked_at",
  ]) {
    assert.ok(cols.includes(expected), `missing column ${expected}`);
  }
  assert.equal(cols.length, 17);

  const indexes = (
    db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type = 'index' AND tbl_name = 'launch_sessions'"
      )
      .all() as { name: string }[]
  ).map((i) => i.name);
  assert.ok(indexes.includes("idx_launch_sessions_parent_created"));
  assert.ok(indexes.includes("idx_launch_sessions_expires"));
});

test("running migrations again is a no-op with a single ledger row", () => {
  const db = core.getDbInstance();
  assert.doesNotThrow(() => runMigrations(db));
  assert.doesNotThrow(() => runMigrations(db));
  const rows = db.prepare("SELECT version FROM _omniroute_migrations WHERE version = ?").all(STAMP);
  assert.equal(rows.length, 1);
});

test("a database that ran the 242 build moves the row to the timestamp without re-running", () => {
  const db = core.getDbInstance();
  db.prepare("UPDATE _omniroute_migrations SET version = '242' WHERE version = ?").run(STAMP);
  db.prepare(
    "INSERT INTO launch_sessions (id, tool_id, session_tag, created_at, expires_at, last_seen_at) VALUES ('s1', 't', 'g', 'a', 'b', 'c')"
  ).run();

  assert.equal(runMigrations(db), 0);
  assert.deepEqual(ledgerFor(db, "launch_sessions"), [{ version: STAMP, name: "launch_sessions" }]);
  assert.equal(
    (db.prepare("SELECT COUNT(*) AS n FROM launch_sessions").get() as { n: number }).n,
    1
  );
});

test("a database that ran the 240 build gets the canonical 240 and keeps launch_sessions", () => {
  const db = core.getDbInstance();
  // Shape of a database from the earlier head: slot 240 held launch_sessions, so the canonical
  // provider_node_custom_json_config never ran there.
  db.prepare("DELETE FROM _omniroute_migrations WHERE version = '240'").run();
  db.exec("ALTER TABLE provider_nodes DROP COLUMN custom_json_config_json");
  db.prepare(
    "UPDATE _omniroute_migrations SET version = '240' WHERE version = ? AND name = 'launch_sessions'"
  ).run(STAMP);

  assert.doesNotThrow(() => runMigrations(db));
  assert.deepEqual(ledgerFor(db, "launch_sessions"), [{ version: STAMP, name: "launch_sessions" }]);
  assert.deepEqual(
    db.prepare("SELECT version, name FROM _omniroute_migrations WHERE version = '240'").all(),
    [{ version: "240", name: "provider_node_custom_json_config" }]
  );
  const cols = (db.prepare("PRAGMA table_info(provider_nodes)").all() as { name: string }[]).map(
    (c) => c.name
  );
  assert.ok(cols.includes("custom_json_config_json"));
});
