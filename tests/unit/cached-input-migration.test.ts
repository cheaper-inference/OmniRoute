import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";
import { createNodeSqliteAdapterFromDatabase } from "../../src/lib/db/adapters/nodeSqliteShared.ts";

fs.mkdirSync(path.resolve("_artifacts"), { recursive: true });
const fixture = fs.mkdtempSync(path.resolve("_artifacts/cached-migration-"));
const originalEnv = { ...process.env };
for (const key of Object.keys(process.env)) delete process.env[key];
for (const key of ["PATH", "SystemRoot", "WINDIR", "COMSPEC", "PATHEXT", "NODE_TEST_CONTEXT"]) {
  if (originalEnv[key]) process.env[key] = originalEnv[key];
}
for (const key of ["DATA_DIR", "HOME", "USERPROFILE", "APPDATA", "LOCALAPPDATA", "TEMP", "TMP"]) {
  process.env[key] = fixture;
}
for (const key of ["SQLITE_FILE", "OMNIROUTE_SQLITE_FILE"]) {
  process.env[key] = path.join(fixture, "isolated.sqlite");
}
Object.assign(process.env, {
  APP_LOG_TO_FILE: "false",
  DISABLE_SQLITE_AUTO_BACKUP: "true",
  OMNIROUTE_SKIP_SYSTEM_TRUST: "1",
  OMNIROUTE_PLUGINS_DIR: path.join(fixture, "plugins"),
  OMNIROUTE_MIGRATIONS_DIR: fixture,
});
const sql = fs.readFileSync(
  new URL("../../src/lib/db/migrations/224_daily_cached_input.sql", import.meta.url),
  "utf8"
);
fs.writeFileSync(path.join(fixture, "224_daily_cached_input.sql"), sql, "utf8");
for (const [version, name] of [
  ["206", "codex_wakeup_tasks"],
  ["213", "api_key_preferred_connections"],
  ["214", "call_logs_client_session_id"],
  ["215", "team_cost_centers"],
  ["216", "team_cost_shapes"],
  ["217", "quota_recovery_tickets"],
]) {
  fs.writeFileSync(
    path.join(fixture, `${version}_${name}.sql`),
    `CREATE TABLE incoming_${version} (id INTEGER PRIMARY KEY);`,
    "utf8"
  );
}
const { runMigrations } = await import("../../src/lib/db/migrationRunner.ts");
const makeDb = () => {
  const db = createNodeSqliteAdapterFromDatabase(new DatabaseSync(":memory:"), ":memory:");
  db.exec(`CREATE TABLE daily_usage_summary (id INTEGER PRIMARY KEY, total_input_tokens INTEGER);
    INSERT INTO daily_usage_summary VALUES (1,100);
    CREATE TABLE _omniroute_migrations (
      version TEXT PRIMARY KEY, name TEXT NOT NULL,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );`);
  return db;
};

test.after(() => {
  fs.rmSync(fixture, { recursive: true, force: true });
  for (const key of Object.keys(process.env)) delete process.env[key];
  Object.assign(process.env, originalEnv);
});

test(
  "cached migration rehomes published ledgers and preserves unknown history",
  { timeout: 3000 },
  () => {
    const publishedSlots = ["206", "213", "214", "215", "217", "224"];
    for (let mask = 0; mask < 1 << publishedSlots.length; mask++) {
      const versions = publishedSlots.filter((_, index) => mask & (1 << index));
      const db = makeDb();
      try {
        if (versions.length) {
          db.exec(sql);
          db.prepare("UPDATE daily_usage_summary SET total_cache_read_tokens = 60").run();
        }
        for (const version of versions) {
          db.prepare(
            "INSERT INTO _omniroute_migrations (version,name,applied_at) VALUES (?,?,?)"
          ).run(version, "daily_cached_input", "fixture-applied");
        }
        assert.equal(runMigrations(db, { isNewDb: true }), versions.length ? 6 : 7);
        assert.deepEqual(
          db.prepare("SELECT version,name FROM _omniroute_migrations ORDER BY version").all(),
          [
            { version: "206", name: "codex_wakeup_tasks" },
            { version: "213", name: "api_key_preferred_connections" },
            { version: "214", name: "call_logs_client_session_id" },
            { version: "215", name: "team_cost_centers" },
            { version: "216", name: "team_cost_shapes" },
            { version: "217", name: "quota_recovery_tickets" },
            { version: "224", name: "daily_cached_input" },
          ]
        );
        assert.deepEqual(db.prepare("SELECT * FROM daily_usage_summary").all(), [
          { id: 1, total_input_tokens: 100, total_cache_read_tokens: versions.length ? 60 : null },
        ]);
        if (versions.length) {
          assert.equal(
            (
              db
                .prepare("SELECT applied_at FROM _omniroute_migrations WHERE version='224'")
                .get() as {
                applied_at: string;
              }
            ).applied_at,
            "fixture-applied"
          );
        }
        for (const version of ["206", "213", "214", "215", "216", "217"]) {
          assert.ok(
            db
              .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=?")
              .get(`incoming_${version}`),
            `canonical migration ${version} must execute after cache ledger reconciliation`
          );
        }
        assert.equal(runMigrations(db, { isNewDb: true }), 0);
      } finally {
        db.close();
      }
    }
  }
);

test(
  "cached migration rejects unknown target occupancy without data loss",
  { timeout: 1000 },
  () => {
    const db = makeDb();
    try {
      db.exec(sql);
      db.exec(`INSERT INTO _omniroute_migrations (version,name) VALUES
      ('206','daily_cached_input'),('224','unrelated_migration');
      UPDATE daily_usage_summary SET total_cache_read_tokens=60;`);
      const before = db.prepare("SELECT * FROM _omniroute_migrations ORDER BY version").all();
      assert.throws(() => runMigrations(db, { isNewDb: true }), /target version 224 is occupied/);
      assert.deepEqual(
        db.prepare("SELECT * FROM _omniroute_migrations ORDER BY version").all(),
        before
      );
      assert.equal(
        (
          db.prepare("SELECT total_cache_read_tokens FROM daily_usage_summary").get() as {
            total_cache_read_tokens: number;
          }
        ).total_cache_read_tokens,
        60
      );
    } finally {
      db.close();
    }
  }
);
