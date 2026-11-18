import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";
import { createNodeSqliteAdapterFromDatabase } from "../../src/lib/db/adapters/nodeSqliteShared.ts";

fs.mkdirSync(path.resolve("_artifacts"), { recursive: true });
const fixture = fs.mkdtempSync(path.resolve("_artifacts/feature-team-migration-"));
const originalEnv = { ...process.env };
for (const key of Object.keys(process.env)) delete process.env[key];
for (const key of ["PATH", "SystemRoot", "WINDIR", "COMSPEC", "PATHEXT", "NODE_TEST_CONTEXT"]) {
  if (originalEnv[key]) process.env[key] = originalEnv[key];
}
for (const key of ["DATA_DIR", "HOME", "USERPROFILE", "APPDATA", "LOCALAPPDATA", "TEMP", "TMP"]) {
  process.env[key] = fixture;
}
Object.assign(process.env, {
  SQLITE_FILE: path.join(fixture, "isolated.sqlite"),
  OMNIROUTE_SQLITE_FILE: path.join(fixture, "isolated.sqlite"),
  APP_LOG_TO_FILE: "false",
  DISABLE_SQLITE_AUTO_BACKUP: "true",
  OMNIROUTE_SKIP_SYSTEM_TRUST: "1",
  OMNIROUTE_PLUGINS_DIR: path.join(fixture, "plugins"),
  OMNIROUTE_MIGRATIONS_DIR: fixture,
});

const migrations = new URL("../../src/lib/db/migrations/", import.meta.url);
const files = fs.readdirSync(migrations);
const featureFiles = files.filter((file) =>
  /^\d+_(daily_cached_input|proxy_payload_traffic)\.sql$/.test(file)
);
assert.ok(featureFiles.length > 0, "the feature's physical migration must exist");
const sqlFor = (file: string) => fs.readFileSync(new URL(file, migrations), "utf8");
const { runMigrations } = await import("../../src/lib/db/migrationRunner.ts");

function resetFixture(featureFile: string): void {
  for (const file of fs.readdirSync(fixture).filter((name) => name.endsWith(".sql"))) {
    fs.unlinkSync(path.join(fixture, file));
  }
  for (const file of [
    featureFile,
    "143_api_key_cache_default_mode.sql",
    "153_radar_local_model_state.sql",
    "215_team_cost_centers.sql",
  ]) {
    fs.writeFileSync(path.join(fixture, file), sqlFor(file));
  }
}

test.after(() => {
  fs.rmSync(fixture, { recursive: true, force: true });
  for (const key of Object.keys(process.env)) delete process.env[key];
  Object.assign(process.env, originalEnv);
});

// The actual feature, Team, Radar and API-key SQL run against an in-memory DB.
// Unrelated replacement migrations use markers to isolate ledger ordering.
for (const featureFile of featureFiles) {
  const [featureVersion, ...nameParts] = featureFile.replace(/\.sql$/, "").split("_");
  const featureName = nameParts.join("_");
  for (const teamVersion of ["153", "154", "155", "161", "163", "164"]) {
    test(`${featureName} vacates 215 before Team ${teamVersion} and Radar reconciliation`, () => {
      resetFixture(featureFile);
      if (teamVersion !== "153") {
        const replacement = files.find((file) => file.startsWith(`${teamVersion}_`));
        assert.ok(replacement);
        fs.writeFileSync(
          path.join(fixture, replacement),
          `CREATE TABLE incoming_${teamVersion} (id INTEGER PRIMARY KEY);`
        );
      }
      for (const canonicalFeatureAlreadyRecorded of [false, true]) {
        const db = createNodeSqliteAdapterFromDatabase(new DatabaseSync(":memory:"), ":memory:");
        try {
          db.exec(`CREATE TABLE _omniroute_migrations (
            version TEXT PRIMARY KEY, name TEXT NOT NULL,
            applied_at TEXT NOT NULL DEFAULT (datetime('now'))
          );
          CREATE TABLE api_keys (id TEXT PRIMARY KEY);
          INSERT INTO api_keys VALUES ('retained-key');
          CREATE TABLE usage_history (
            billing_team_id TEXT, timestamp TEXT, team_rollup_processed_at TEXT
          );
          CREATE TABLE daily_usage_summary (id TEXT PRIMARY KEY);
          INSERT INTO daily_usage_summary VALUES ('measured'), ('unknown');`);
          db.exec(sqlFor("215_team_cost_centers.sql"));
          db.exec(`INSERT INTO teams (id, name, created_at, updated_at)
            VALUES ('team', 'Retained team', 'team-created', 'team-updated');`);
          db.exec(sqlFor("153_radar_local_model_state.sql"));
          db.exec(`INSERT INTO radar_local_model_state
            (provider, model_id, display_name, enabled, tombstoned, updated_at)
            VALUES ('provider', 'model', 'Retained name', 0, 1, 'radar-updated');`);
          db.exec(sqlFor(featureFile));
          if (featureName === "daily_cached_input") {
            db.exec(
              "UPDATE daily_usage_summary SET total_cache_read_tokens=60 WHERE id='measured';"
            );
          } else {
            db.exec(`INSERT INTO proxy_payload_traffic
              (route_key, route_kind, upload_bytes, download_bytes, attempts, started_at, updated_at)
              VALUES ('direct', 'direct', 6, 13, 2, 'traffic-start', 'traffic-updated');`);
          }
          const record = db.prepare("INSERT INTO _omniroute_migrations VALUES (?, ?, ?)");
          record.run(teamVersion, "team_cost_centers", "team-applied");
          record.run("143", "radar_local_model_state", "radar-applied");
          record.run("215", featureName, "feature-applied");
          if (canonicalFeatureAlreadyRecorded) {
            record.run(featureVersion, featureName, "feature-applied");
          }
          runMigrations(db, { isNewDb: true });
          const row = (version: string) =>
            db
              .prepare("SELECT name, applied_at FROM _omniroute_migrations WHERE version=?")
              .get(version);
          assert.deepEqual(row(featureVersion), {
            name: featureName,
            applied_at: "feature-applied",
          });
          assert.deepEqual(row("215"), { name: "team_cost_centers", applied_at: "team-applied" });
          assert.deepEqual(row("153"), {
            name: "radar_local_model_state",
            applied_at: "radar-applied",
          });
          assert.deepEqual(db.prepare("SELECT id, name, created_at, updated_at FROM teams").all(), [
            {
              id: "team",
              name: "Retained team",
              created_at: "team-created",
              updated_at: "team-updated",
            },
          ]);
          assert.deepEqual(db.prepare("SELECT * FROM radar_local_model_state").all(), [
            {
              provider: "provider",
              model_id: "model",
              display_name: "Retained name",
              enabled: 0,
              tombstoned: 1,
              updated_at: "radar-updated",
            },
          ]);
          assert.deepEqual(db.prepare("SELECT * FROM api_keys").all(), [
            { id: "retained-key", cache_default_mode: "legacy" },
          ]);
          if (featureName === "daily_cached_input") {
            assert.deepEqual(db.prepare("SELECT * FROM daily_usage_summary ORDER BY id").all(), [
              { id: "measured", total_cache_read_tokens: 60 },
              { id: "unknown", total_cache_read_tokens: null },
            ]);
          } else {
            assert.deepEqual(
              db
                .prepare(
                  "SELECT upload_bytes, download_bytes, attempts, started_at, updated_at FROM proxy_payload_traffic"
                )
                .all(),
              [
                {
                  upload_bytes: 6,
                  download_bytes: 13,
                  attempts: 2,
                  started_at: "traffic-start",
                  updated_at: "traffic-updated",
                },
              ]
            );
          }
          if (teamVersion !== "153") {
            assert.ok(
              db
                .prepare("SELECT name FROM sqlite_master WHERE name=?")
                .get(`incoming_${teamVersion}`)
            );
          }
          const ledger = db.prepare("SELECT * FROM _omniroute_migrations ORDER BY version").all();
          assert.equal(runMigrations(db, { isNewDb: true }), 0);
          assert.deepEqual(
            db.prepare("SELECT * FROM _omniroute_migrations ORDER BY version").all(),
            ledger
          );
        } finally {
          db.close();
        }
      }
    });
  }

  test(`${featureName} and Team reconciliation roll back together on unknown target occupancy`, () => {
    resetFixture(featureFile);
    fs.writeFileSync(
      path.join(fixture, "206_codex_wakeup_tasks.sql"),
      "CREATE TABLE incoming_206 (id INTEGER PRIMARY KEY);"
    );
    for (const target of [featureVersion, "215"]) {
      const db = createNodeSqliteAdapterFromDatabase(new DatabaseSync(":memory:"), ":memory:");
      try {
        db.exec(`CREATE TABLE _omniroute_migrations (
          version TEXT PRIMARY KEY, name TEXT NOT NULL,
          applied_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
        CREATE TABLE daily_usage_summary (id TEXT PRIMARY KEY);
        INSERT INTO daily_usage_summary VALUES ('retained');`);
        db.exec(sqlFor(featureFile));
        if (featureName === "daily_cached_input") {
          db.exec("UPDATE daily_usage_summary SET total_cache_read_tokens=60;");
        } else {
          db.exec(`INSERT INTO proxy_payload_traffic
            (route_key, route_kind, attempts, started_at, updated_at)
            VALUES ('direct', 'direct', 9, 'start', 'update');`);
        }
        const dataTable =
          featureName === "daily_cached_input" ? "daily_usage_summary" : "proxy_payload_traffic";
        const dataBefore = db.prepare(`SELECT * FROM ${dataTable}`).all();
        const record = db.prepare("INSERT INTO _omniroute_migrations VALUES (?, ?, ?)");
        record.run("153", "team_cost_centers", "team-applied");
        record.run(target === "215" ? "206" : "215", featureName, "feature-applied");
        record.run(target, "unknown_history", "keep");
        const before = db.prepare("SELECT * FROM _omniroute_migrations ORDER BY version").all();
        assert.throws(
          () => runMigrations(db, { isNewDb: true }),
          new RegExp(`target version ${target} is occupied`)
        );
        assert.deepEqual(
          db.prepare("SELECT * FROM _omniroute_migrations ORDER BY version").all(),
          before
        );
        assert.deepEqual(db.prepare(`SELECT * FROM ${dataTable}`).all(), dataBefore);
      } finally {
        db.close();
      }
    }
  });
}
