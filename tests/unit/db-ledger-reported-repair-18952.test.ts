// #18952 — the slot release replays real migration files out of order, long after the
// later ones ran. Fixture SQL cannot show what such a replay does, so this file builds
// the database through core.ts and applies the reported ledger on top of it.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-18952-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const { runMigrations } = await import("../../src/lib/db/migrationRunner.ts");

const REPORTED_LEDGER = [
  ["140", "ccr_blocks"],
  ["141", "api_key_cache_default_mode"],
  ["142", "connection_runtime_state"],
  ["176", "provider_connection_synced_models_at"],
  ["177", "xp_action_counts"],
  ["178", "memory_fts_skip_access_updates"],
  ["197", "model_capabilities_reasoning_efforts"],
] as const;

const db = core.getDbInstance();

// store.ts leaves memory_id NULL. memory_fts_ai_assign fills it in and relies on
// memory_fts_au to index the row.
function insertMemory(id: string, content: string) {
  db.prepare(
    "INSERT INTO memories (id, api_key_id, session_id, type, key, content, metadata, created_at, updated_at) " +
      "VALUES (?, 'k', 's', 'factual', ?, ?, '{}', datetime('now'), datetime('now'))"
  ).run(id, id, content);
}

function countFtsHits(term: string) {
  const row = db
    .prepare("SELECT count(*) AS hits FROM memory_fts WHERE memory_fts MATCH ?")
    .get(term) as { hits: number };
  return row.hits;
}

function readMemoryFtsUpdateTrigger() {
  const row = db
    .prepare("SELECT sql FROM sqlite_master WHERE type = 'trigger' AND name = 'memory_fts_au'")
    .get() as { sql: string };
  return row.sql;
}

insertMemory("before-repair", "alphaword");
const triggerBeforeRepair = readMemoryFtsUpdateTrigger();

const rename = db.prepare("UPDATE _omniroute_migrations SET name = ? WHERE version = ?");
for (const [version, name] of REPORTED_LEDGER) rename.run(name, version);
// These never ran on the reporting instance: their files were shadowed.
db.exec(`
  DROP TABLE radar_referrals_cache;
  ALTER TABLE proxy_subscriptions DROP COLUMN core_config_path;
  ALTER TABLE proxy_subscriptions DROP COLUMN selector_last_switch_kind;
`);

const repaired = runMigrations(db);

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("the reported ledger restores the objects its files never created", () => {
  assert.equal(repaired, REPORTED_LEDGER.length);

  assert.ok(db.prepare("SELECT 1 FROM sqlite_master WHERE name = 'radar_referrals_cache'").get());
  const columns = (
    db.prepare("PRAGMA table_info(proxy_subscriptions)").all() as Array<{ name: string }>
  ).map((column) => column.name);
  assert.ok(columns.includes("core_config_path"));
  assert.ok(columns.includes("selector_last_switch_kind"));

  for (const [version, name] of REPORTED_LEDGER) {
    assert.deepEqual(
      db
        .prepare("SELECT name FROM _omniroute_migrations WHERE version = ?")
        .get(`legacy-${version}-${name}`),
      { name },
      `${version}_${name} must survive as a legacy record`
    );
  }

  assert.equal(runMigrations(db), 0, "the repair must not repeat on the next boot");
});

test("releasing 178 must not undo 203, so new memories stay searchable (#15707)", () => {
  assert.deepEqual(
    db.prepare("SELECT name FROM _omniroute_migrations WHERE version = '178'").get(),
    { name: "memory_fts_au_conditional" },
    "178 must still take its slot"
  );
  assert.equal(readMemoryFtsUpdateTrigger(), triggerBeforeRepair);

  insertMemory("after-repair", "betaword");
  assert.equal(countFtsHits("betaword"), 1, "a memory stored after the repair must be indexed");
  assert.equal(countFtsHits("alphaword"), 1, "a memory stored before it must stay indexed");
});

// Last on purpose: it rewinds the trigger and the 178 row that the tests above read.
test("178 still applies to a trigger that has no WHEN clause yet", () => {
  db.exec(`
    DROP TRIGGER memory_fts_au;
    CREATE TRIGGER memory_fts_au AFTER UPDATE ON memories BEGIN
      INSERT INTO memory_fts(memory_fts, rowid, content, key)
        VALUES('delete', old.memory_id, old.content, old.key);
      INSERT INTO memory_fts(rowid, content, key)
        VALUES (new.memory_id, new.content, new.key);
    END;
  `);
  db.prepare("DELETE FROM _omniroute_migrations WHERE version = '178'").run();

  assert.equal(runMigrations(db), 1);

  assert.match(readMemoryFtsUpdateTrigger(), /WHEN old\.content IS DISTINCT FROM new\.content/);
});
