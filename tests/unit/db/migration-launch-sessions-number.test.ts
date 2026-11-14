// Guards the launch_sessions migration slot: upstream keeps adding migrations, so a rebase that
// lands another 242_* (or numbers something above it) must fail loudly here.
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

test("exactly one migration starts with 242_ and it is launch_sessions", () => {
  const with242 = files.filter((f) => f.startsWith("242_"));
  assert.deepEqual(with242, ["242_launch_sessions.sql"]);
  assert.deepEqual(
    files.filter((f) => /_launch_sessions\.sql$/.test(f)),
    ["242_launch_sessions.sql"]
  );
});

test("242 is greater than every other migration number", () => {
  const others = files
    .filter((f) => f !== "242_launch_sessions.sql")
    .map((f) => Number.parseInt(f.split("_")[0], 10))
    .filter((n) => Number.isFinite(n));
  assert.ok(others.length > 0);
  assert.ok(
    others.every((n) => n < 242),
    `a migration numbered >= 242 exists besides launch_sessions: ${Math.max(...others)}`
  );
});

test("migration creates the table, columns and indexes; ledger has 242", () => {
  const db = core.getDbInstance();
  const ledger = db
    .prepare("SELECT version, name FROM _omniroute_migrations WHERE version = '242'")
    .all();
  assert.deepEqual(ledger, [{ version: "242", name: "launch_sessions" }]);

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
  const rows = db.prepare("SELECT version FROM _omniroute_migrations WHERE version = '242'").all();
  assert.equal(rows.length, 1);
});
