import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Database from "better-sqlite3";

import { RENAMED_MIGRATION_COMPATIBILITY } from "../../src/lib/db/migrationRunner/constants.ts";

const migrationsDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-team-compat-"));
const originalMigrationsDir = process.env.OMNIROUTE_MIGRATIONS_DIR;
process.env.OMNIROUTE_MIGRATIONS_DIR = migrationsDir;

fs.copyFileSync(
  path.resolve("src/lib/db/migrations/153_radar_local_model_state.sql"),
  path.join(migrationsDir, "153_radar_local_model_state.sql")
);
fs.copyFileSync(
  path.resolve("src/lib/db/migrations/154_call_logs_response_id.sql"),
  path.join(migrationsDir, "154_call_logs_response_id.sql")
);
fs.copyFileSync(
  path.resolve("src/lib/db/migrations/155_agentic_conversations.sql"),
  path.join(migrationsDir, "155_agentic_conversations.sql")
);
fs.copyFileSync(
  path.resolve("src/lib/db/migrations/161_config_audit_log.sql"),
  path.join(migrationsDir, "161_config_audit_log.sql")
);
fs.copyFileSync(
  path.resolve("src/lib/db/migrations/163_radar_feed_cache_generated_at.sql"),
  path.join(migrationsDir, "163_radar_feed_cache_generated_at.sql")
);
// A harmless fixture with the current canonical 164 name is sufficient for the
// runner's version+name collision probe; that migration's provider retirement
// behavior has its own focused tests.
fs.writeFileSync(path.join(migrationsDir, "164_retire_microsoft_designer_web.sql"), "SELECT 1;\n");
fs.copyFileSync(
  path.resolve("src/lib/db/migrations/215_team_cost_centers.sql"),
  path.join(migrationsDir, "215_team_cost_centers.sql")
);
fs.copyFileSync(
  path.resolve("src/lib/db/migrations/216_team_cost_shapes.sql"),
  path.join(migrationsDir, "216_team_cost_shapes.sql")
);

const { runMigrations } = await import("../../src/lib/db/migrationRunner.ts");

test.after(() => {
  fs.rmSync(migrationsDir, { recursive: true, force: true });
  if (originalMigrationsDir === undefined) delete process.env.OMNIROUTE_MIGRATIONS_DIR;
  else process.env.OMNIROUTE_MIGRATIONS_DIR = originalMigrationsDir;
});

const historicalTeamVersions = ["153", "154", "155", "161", "163", "164"] as const;

test("Team compatibility uses exact version+name guards through the final slot", () => {
  const teamMappings = RENAMED_MIGRATION_COMPATIBILITY.filter(
    (entry) => entry.toName === "team_cost_centers"
  );
  assert.deepEqual(
    teamMappings.map(({ fromVersion, fromName, toVersion, toName }) => ({
      fromVersion,
      fromName,
      toVersion,
      toName,
    })),
    historicalTeamVersions.map((fromVersion) => ({
      fromVersion,
      fromName: "team_cost_centers",
      toVersion: "215",
      toName: "team_cost_centers",
    }))
  );

  const differentNames = new Map([
    ["153", "radar_local_model_state"],
    ["154", "call_logs_response_id"],
    ["155", "agentic_conversations"],
    ["161", "config_audit_log"],
    ["163", "radar_feed_cache_generated_at"],
    ["164", "retire_microsoft_designer_web"],
  ]);
  for (const [fromVersion, fromName] of differentNames) {
    assert.equal(
      RENAMED_MIGRATION_COMPATIBILITY.some(
        (entry) => entry.fromVersion === fromVersion && entry.fromName === fromName
      ),
      false,
      `${fromVersion}_${fromName} must never be treated as the Team rename`
    );
  }
});

for (const legacyVersion of historicalTeamVersions) {
  test(`an applied ${legacyVersion} Team row is rehomed without hijacking canonical migrations`, () => {
    const db = new Database(":memory:");
    try {
      db.exec(`
        CREATE TABLE _omniroute_migrations (
          version TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          applied_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
        CREATE TABLE call_logs (id TEXT PRIMARY KEY);
        CREATE TABLE usage_history (
          id INTEGER PRIMARY KEY,
          billing_team_id TEXT,
          team_rollup_processed_at TEXT,
          timestamp TEXT
        );
        CREATE TABLE radar_feed_cache (id TEXT PRIMARY KEY);
        INSERT INTO _omniroute_migrations (version, name)
        VALUES ('${legacyVersion}', 'team_cost_centers');
      `);

      // Historical Team slot already created this table before the runner
      // rehomes its version/name marker to 215.
      db.exec(fs.readFileSync(path.join(migrationsDir, "215_team_cost_centers.sql"), "utf8"));

      assert.equal(runMigrations(db), 7);
      assert.deepEqual(
        db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all(),
        [
          { version: "153", name: "radar_local_model_state" },
          { version: "154", name: "call_logs_response_id" },
          { version: "155", name: "agentic_conversations" },
          { version: "161", name: "config_audit_log" },
          { version: "163", name: "radar_feed_cache_generated_at" },
          { version: "164", name: "retire_microsoft_designer_web" },
          { version: "215", name: "team_cost_centers" },
          { version: "216", name: "team_cost_shapes" },
        ]
      );
      for (const table of [
        "radar_local_model_state",
        "agentic_conversations",
        "config_audit_log",
      ]) {
        assert.ok(
          db.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?").get(table),
          `canonical table ${table} must exist after rehoming Team from ${legacyVersion}`
        );
      }
      assert.ok(
        db
          .prepare("PRAGMA table_info(call_logs)")
          .all()
          .some((column) => (column as { name: string }).name === "response_id"),
        `canonical 154_call_logs_response_id must execute after rehoming Team from ${legacyVersion}`
      );
      assert.ok(
        db
          .prepare("PRAGMA table_info(radar_feed_cache)")
          .all()
          .some((column) => (column as { name: string }).name === "generated_at"),
        `canonical 163_radar_feed_cache_generated_at must execute after rehoming Team from ${legacyVersion}`
      );
    } finally {
      db.close();
    }
  });
}

test("an already-applied canonical live 163 row is untouched and Team runs at 215", () => {
  const db = new Database(":memory:");
  try {
    db.exec(`
      CREATE TABLE _omniroute_migrations (
        version TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        applied_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      CREATE TABLE call_logs (id TEXT PRIMARY KEY);
      CREATE TABLE usage_history (
        id INTEGER PRIMARY KEY,
        billing_team_id TEXT,
        team_rollup_processed_at TEXT,
        timestamp TEXT
      );
      CREATE TABLE radar_feed_cache (id TEXT PRIMARY KEY, generated_at TEXT DEFAULT NULL);
      INSERT INTO _omniroute_migrations (version, name, applied_at)
      VALUES ('163', 'radar_feed_cache_generated_at', '2026-08-25 00:00:00');
    `);

    assert.equal(runMigrations(db), 7);
    const rows = db
      .prepare(
        "SELECT version, name, applied_at FROM _omniroute_migrations WHERE version IN ('163', '215') ORDER BY version"
      )
      .all() as Array<{ version: string; name: string; applied_at: string }>;
    assert.deepEqual(
      rows.map(({ version, name }) => ({ version, name })),
      [
        { version: "163", name: "radar_feed_cache_generated_at" },
        { version: "215", name: "team_cost_centers" },
      ]
    );
    assert.equal(rows[0]?.applied_at, "2026-08-25 00:00:00");
    assert.match(rows[1]?.applied_at ?? "", /^\d{4}-\d{2}-\d{2}/);
  } finally {
    db.close();
  }
});

test("an already-applied 215 Team schema gains shape columns without losing legacy rows", () => {
  const db = new Database(":memory:");
  try {
    db.exec(`
      CREATE TABLE _omniroute_migrations (version TEXT PRIMARY KEY, name TEXT NOT NULL, applied_at TEXT NOT NULL DEFAULT (datetime('now')));
      CREATE TABLE api_keys (id TEXT PRIMARY KEY);
      CREATE TABLE call_logs (id TEXT PRIMARY KEY);
      CREATE TABLE usage_history (id INTEGER PRIMARY KEY, billing_team_id TEXT, team_rollup_processed_at TEXT, timestamp TEXT);
      CREATE TABLE radar_feed_cache (id TEXT PRIMARY KEY);
    `);
    db.exec(fs.readFileSync(path.join(migrationsDir, "215_team_cost_centers.sql"), "utf8"));
    db.exec(`INSERT INTO teams (id, name, created_at, updated_at) VALUES ('t', 'Legacy', '2026-01-01', '2026-01-01');
      INSERT INTO daily_team_usage_summary (team_id, api_key_id, provider, model, date, total_requests, successful_requests)
      VALUES ('t', 'k', 'openai', 'gpt-legacy', '2026-01-01', 1, 1);
      INSERT INTO _omniroute_migrations (version, name, applied_at) VALUES ('215', 'team_cost_centers', '2026-01-01');`);
    runMigrations(db);
    assert.deepEqual(
      db
        .prepare(
          "SELECT total_requests, token_shapes_json, successful_token_shapes_json FROM daily_team_usage_summary"
        )
        .get(),
      {
        total_requests: 1,
        token_shapes_json: null,
        successful_token_shapes_json: null,
      }
    );
  } finally {
    db.close();
  }
});
