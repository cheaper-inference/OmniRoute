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
  "217_quota_recovery_tickets.sql",
  "218_proxy_subscription_mirror_urls.sql",
  "223_call_logs_queue_wait_ms.sql",
  "224_proxy_logs_egress_ip_families.sql",
  "226_request_cost_ledger_read_indexes.sql",
  "228_purge_orphaned_provider_catalogs.sql",
  "236_key_templates.sql",
  "237_usage_history_calculated_cost.sql",
  "238_codex_connection_fences.sql",
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
  CREATE TABLE proxy_subscriptions (id TEXT PRIMARY KEY);
  CREATE TABLE call_logs (id TEXT PRIMARY KEY);
  CREATE TABLE proxy_logs (id TEXT PRIMARY KEY);
  CREATE TABLE request_cost_ledger (
    api_key_id TEXT, timestamp TEXT, success INTEGER, service_tier TEXT, amount_usd REAL, request_id TEXT
  );
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

test("every old Codex slot is guarded by version and name", () => {
  assert.deepEqual(
    RENAMED_MIGRATION_COMPATIBILITY.filter((entry) => entry.toName === "codex_connection_fences"),
    [
      {
        fromVersion: "215",
        fromName: "codex_connection_fences",
        toVersion: "238",
        toName: "codex_connection_fences",
      },
      {
        fromVersion: "217",
        fromName: "codex_connection_fences",
        toVersion: "238",
        toName: "codex_connection_fences",
      },
      {
        fromVersion: "218",
        fromName: "codex_connection_fences",
        toVersion: "238",
        toName: "codex_connection_fences",
      },
      {
        fromVersion: "223",
        fromName: "codex_connection_fences",
        toVersion: "238",
        toName: "codex_connection_fences",
      },
      {
        fromVersion: "224",
        fromName: "codex_connection_fences",
        toVersion: "238",
        toName: "codex_connection_fences",
      },
      {
        fromVersion: "226",
        fromName: "codex_connection_fences",
        toVersion: "238",
        toName: "codex_connection_fences",
      },
      {
        fromVersion: "228",
        fromName: "codex_connection_fences",
        toVersion: "238",
        toName: "codex_connection_fences",
      },
      {
        fromVersion: "236",
        fromName: "codex_connection_fences",
        toVersion: "238",
        toName: "codex_connection_fences",
      },
      {
        fromVersion: "237",
        fromName: "codex_connection_fences",
        toVersion: "238",
        toName: "codex_connection_fences",
      },
    ]
  );
});

for (const previous of [
  "codex-215",
  "codex-217",
  "codex-218",
  "codex-223",
  "codex-224",
  "codex-226",
  "codex-228",
  "codex-236",
  "codex-237",
  "quota",
  "team",
  "queue",
  "egress",
  "fresh",
] as const) {
  test(`migration runner preserves ${previous} databases and applies the remaining features`, () => {
    const db = new Database(":memory:");
    try {
      db.exec(schema);
      let fenceBefore: unknown;
      if (previous.startsWith("codex-")) {
        apply(db, "238_codex_connection_fences.sql");
        db.exec("UPDATE codex_connection_fences SET failure_revision = 7");
        db.prepare(
          "INSERT INTO _omniroute_migrations (version, name, applied_at) VALUES (?, 'codex_connection_fences', '2026-10-28 00:00:00')"
        ).run(previous.slice("codex-".length));
        fenceBefore = db.prepare("SELECT * FROM codex_connection_fences").all();
      } else if (previous === "queue" || previous === "egress") {
        const version = previous === "queue" ? "223" : "224";
        const name =
          previous === "queue" ? "call_logs_queue_wait_ms" : "proxy_logs_egress_ip_families";
        apply(db, `${version}_${name}.sql`);
        db.prepare(
          "INSERT INTO _omniroute_migrations (version, name, applied_at) VALUES (?, ?, '2026-10-28 00:00:00')"
        ).run(version, name);
      } else if (previous === "team") {
        apply(db, "215_team_cost_centers.sql");
        db.exec(`INSERT INTO teams (id, name, created_at, updated_at)
          VALUES ('team', 'Retained team', '2026-10-28', '2026-10-28');
          INSERT INTO _omniroute_migrations (version, name, applied_at)
          VALUES ('215', 'team_cost_centers', '2026-10-28 00:00:00');`);
      } else if (previous === "quota") {
        apply(db, "217_quota_recovery_tickets.sql");
        db.exec(`INSERT INTO quota_recovery_tickets
          (id, api_key_id, turn_key, request_hash, endpoint, request_ciphertext,
           next_attempt_at, expires_at, created_at, updated_at)
          VALUES ('ticket', 'key', 'turn', 'synthetic-hash', 'responses', 'synthetic-ciphertext',
            '2026-10-29', '2026-10-30', '2026-10-28', '2026-10-28');
          INSERT INTO _omniroute_migrations (version, name, applied_at)
          VALUES ('217', 'quota_recovery_tickets', '2026-10-28 00:00:00');`);
      }

      assert.equal(runMigrations(db), previous === "fresh" ? 11 : 10);
      assert.deepEqual(
        db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all(),
        [
          { version: "215", name: "team_cost_centers" },
          { version: "216", name: "team_cost_shapes" },
          { version: "217", name: "quota_recovery_tickets" },
          { version: "218", name: "proxy_subscription_mirror_urls" },
          { version: "223", name: "call_logs_queue_wait_ms" },
          { version: "224", name: "proxy_logs_egress_ip_families" },
          { version: "226", name: "request_cost_ledger_read_indexes" },
          { version: "228", name: "purge_orphaned_provider_catalogs" },
          { version: "236", name: "key_templates" },
          { version: "237", name: "usage_history_calculated_cost" },
          { version: "238", name: "codex_connection_fences" },
        ]
      );
      if (previous.startsWith("codex-")) {
        assert.deepEqual(db.prepare("SELECT * FROM codex_connection_fences").all(), fenceBefore);
      }
      if (previous !== "fresh") {
        const version = previous.startsWith("codex-")
          ? "238"
          : previous === "team"
            ? "215"
            : previous === "queue"
              ? "223"
              : previous === "egress"
                ? "224"
                : "217";
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
      } else if (previous === "quota") {
        assert.deepEqual(db.prepare("SELECT id, state FROM quota_recovery_tickets").all(), [
          { id: "ticket", state: "pending" },
        ]);
      }
      assert.equal(runMigrations(db), 0, "the second boot must be a no-op");
    } finally {
      db.close();
    }
  });
}
