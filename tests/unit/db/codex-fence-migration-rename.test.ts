import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Database from "better-sqlite3";

const migrationsDir = fs.mkdtempSync(path.join(os.tmpdir(), "codex-fence-rename-"));
const originalMigrationsDir = process.env.OMNIROUTE_MIGRATIONS_DIR;
process.env.OMNIROUTE_MIGRATIONS_DIR = migrationsDir;
for (const filename of [
  "215_team_cost_centers.sql",
  "216_team_cost_shapes.sql",
  "217_codex_connection_fences.sql",
]) {
  fs.copyFileSync(
    new URL(`../../../src/lib/db/migrations/${filename}`, import.meta.url),
    path.join(migrationsDir, filename)
  );
}
const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");
const { RENAMED_MIGRATION_COMPATIBILITY } =
  await import("../../../src/lib/db/migrationRunner/constants.ts");

const schema = `
  CREATE TABLE _omniroute_migrations (
    version TEXT PRIMARY KEY, name TEXT NOT NULL,
    applied_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE TABLE provider_connections (
    id TEXT PRIMARY KEY, provider TEXT, auth_type TEXT, email TEXT, project_id TEXT,
    access_token TEXT, refresh_token TEXT, is_active INTEGER DEFAULT 1,
    proxy_enabled INTEGER DEFAULT 1, per_key_proxy_enabled INTEGER DEFAULT 0,
    provider_specific_data TEXT, last_error_at TEXT, last_error TEXT, test_status TEXT,
    rate_limited_until TEXT, name TEXT, priority INTEGER, synced_models_at TEXT
  );
  CREATE TABLE key_value (
    namespace TEXT, key TEXT, value TEXT, PRIMARY KEY(namespace, key)
  );
  CREATE TABLE api_keys (id TEXT PRIMARY KEY);
  CREATE TABLE usage_history (
    id INTEGER PRIMARY KEY, billing_team_id TEXT,
    team_rollup_processed_at TEXT, timestamp TEXT
  );
  INSERT INTO provider_connections (id, provider, access_token, provider_specific_data)
  VALUES ('account', 'codex', 'synthetic-token', '{}');
`;

function apply(db: Database.Database, filename: string) {
  db.exec(fs.readFileSync(path.join(migrationsDir, filename), "utf8"));
}

test.after(() => {
  fs.rmSync(migrationsDir, { recursive: true, force: true });
  if (originalMigrationsDir === undefined) delete process.env.OMNIROUTE_MIGRATIONS_DIR;
  else process.env.OMNIROUTE_MIGRATIONS_DIR = originalMigrationsDir;
});

test("the old Codex migration slot is guarded by both version and name", () => {
  assert.deepEqual(
    RENAMED_MIGRATION_COMPATIBILITY.filter((entry) => entry.toName === "codex_connection_fences"),
    [
      {
        fromVersion: "215",
        fromName: "codex_connection_fences",
        toVersion: "217",
        toName: "codex_connection_fences",
      },
    ]
  );
});

for (const previous of ["codex", "team", "fresh"] as const) {
  test(`migration runner preserves ${previous} databases while applying the other feature`, () => {
    const db = new Database(":memory:");
    try {
      db.exec(schema);
      let fenceBefore: unknown;
      if (previous === "codex") {
        apply(db, "217_codex_connection_fences.sql");
        db.exec(`UPDATE codex_connection_fences SET failure_revision = 7;
          INSERT INTO _omniroute_migrations (version, name, applied_at)
          VALUES ('215', 'codex_connection_fences', '2026-10-28 00:00:00');`);
        fenceBefore = db.prepare("SELECT * FROM codex_connection_fences").all();
      } else if (previous === "team") {
        apply(db, "215_team_cost_centers.sql");
        db.exec(`INSERT INTO teams (id, name, created_at, updated_at)
          VALUES ('team', 'Retained team', '2026-10-28', '2026-10-28');
          INSERT INTO _omniroute_migrations (version, name, applied_at)
          VALUES ('215', 'team_cost_centers', '2026-10-28 00:00:00');`);
      }

      assert.equal(runMigrations(db), previous === "fresh" ? 3 : 2);
      assert.deepEqual(
        db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all(),
        [
          { version: "215", name: "team_cost_centers" },
          { version: "216", name: "team_cost_shapes" },
          { version: "217", name: "codex_connection_fences" },
        ]
      );
      if (previous === "codex") {
        assert.deepEqual(db.prepare("SELECT * FROM codex_connection_fences").all(), fenceBefore);
      }
      if (previous !== "fresh") {
        const version = previous === "codex" ? "217" : "215";
        assert.equal(
          (
            db
              .prepare("SELECT applied_at FROM _omniroute_migrations WHERE version = ?")
              .get(version) as { applied_at: string }
          ).applied_at,
          "2026-10-28 00:00:00"
        );
      }
      if (previous === "team") {
        assert.deepEqual(db.prepare("SELECT id, name FROM teams").all(), [
          { id: "team", name: "Retained team" },
        ]);
      }
      assert.equal(runMigrations(db), 0, "the second boot must be a no-op");
    } finally {
      db.close();
    }
  });
}
