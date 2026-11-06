import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { DatabaseSync } from "node:sqlite";
import { createNodeSqliteAdapterFromDatabase } from "../../src/lib/db/adapters/nodeSqliteShared.ts";

fs.mkdirSync(path.resolve("_artifacts"), { recursive: true });
const fixtureDir = fs.mkdtempSync(path.resolve("_artifacts/traffic-migration-"));
const originalEnv = { ...process.env };
for (const key of Object.keys(process.env)) delete process.env[key];
for (const key of ["PATH", "SystemRoot", "WINDIR", "COMSPEC", "PATHEXT", "NODE_TEST_CONTEXT"]) {
  if (originalEnv[key]) process.env[key] = originalEnv[key];
}
for (const key of ["DATA_DIR", "HOME", "USERPROFILE", "APPDATA", "LOCALAPPDATA", "TEMP", "TMP"]) {
  process.env[key] = fixtureDir;
}
for (const key of ["SQLITE_FILE", "OMNIROUTE_SQLITE_FILE"]) {
  process.env[key] = path.join(fixtureDir, "isolated.sqlite");
}
process.env.APP_LOG_TO_FILE = "false";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.OMNIROUTE_SKIP_SYSTEM_TRUST = "1";
process.env.OMNIROUTE_PLUGINS_DIR = path.join(fixtureDir, "plugins");
process.env.OMNIROUTE_MIGRATIONS_DIR = fixtureDir;

const sql = fs.readFileSync(
  new URL("../../src/lib/db/migrations/226_proxy_payload_traffic.sql", import.meta.url),
  "utf8"
);
fs.writeFileSync(path.join(fixtureDir, "226_proxy_payload_traffic.sql"), sql, "utf8");
fs.writeFileSync(
  path.join(fixtureDir, "206_codex_wakeup_tasks.sql"),
  "CREATE TABLE incoming_206 (id INTEGER PRIMARY KEY);",
  "utf8"
);
fs.writeFileSync(
  path.join(fixtureDir, "207_remove_opencode_free_provider.sql"),
  "CREATE TABLE incoming_207 (id INTEGER PRIMARY KEY);",
  "utf8"
);
fs.writeFileSync(
  path.join(fixtureDir, "213_api_key_preferred_connections.sql"),
  "CREATE TABLE incoming_213 (id INTEGER PRIMARY KEY);",
  "utf8"
);
fs.writeFileSync(
  path.join(fixtureDir, "214_call_logs_client_session_id.sql"),
  "CREATE TABLE incoming_214 (id INTEGER PRIMARY KEY);",
  "utf8"
);
fs.writeFileSync(
  path.join(fixtureDir, "215_team_cost_centers.sql"),
  "CREATE TABLE incoming_215 (id INTEGER PRIMARY KEY);",
  "utf8"
);
fs.writeFileSync(
  path.join(fixtureDir, "216_team_cost_shapes.sql"),
  "CREATE TABLE incoming_216 (id INTEGER PRIMARY KEY);",
  "utf8"
);
fs.writeFileSync(
  path.join(fixtureDir, "217_quota_recovery_tickets.sql"),
  "CREATE TABLE incoming_217 (id INTEGER PRIMARY KEY);",
  "utf8"
);
fs.writeFileSync(
  path.join(fixtureDir, "218_proxy_subscription_mirror_urls.sql"),
  "CREATE TABLE incoming_218 (id INTEGER PRIMARY KEY);",
  "utf8"
);
fs.writeFileSync(
  path.join(fixtureDir, "223_call_logs_queue_wait_ms.sql"),
  "CREATE TABLE incoming_223 (id INTEGER PRIMARY KEY);",
  "utf8"
);
fs.writeFileSync(
  path.join(fixtureDir, "224_proxy_logs_egress_ip_families.sql"),
  fs.readFileSync(
    new URL("../../src/lib/db/migrations/224_proxy_logs_egress_ip_families.sql", import.meta.url),
    "utf8"
  ),
  "utf8"
);
fs.writeFileSync(
  path.join(fixtureDir, "225_token_ledger_balance_indexes.sql"),
  fs.readFileSync(
    new URL("../../src/lib/db/migrations/225_token_ledger_balance_indexes.sql", import.meta.url),
    "utf8"
  ),
  "utf8"
);

function createTokenLedger(db: ReturnType<typeof createNodeSqliteAdapterFromDatabase>): void {
  db.exec(`CREATE TABLE token_ledger (
    id TEXT PRIMARY KEY, to_api_key_id TEXT, from_api_key_id TEXT, created_at TEXT
  ); INSERT INTO token_ledger VALUES ('retained', 'to', 'from', 'fixture-created');`);
}

function assertCanonicalTokenIndexes(
  db: ReturnType<typeof createNodeSqliteAdapterFromDatabase>
): void {
  assert.deepEqual(db.prepare("SELECT * FROM token_ledger").all(), [
    { id: "retained", to_api_key_id: "to", from_api_key_id: "from", created_at: "fixture-created" },
  ]);
  const indexes = db.prepare("PRAGMA index_list(token_ledger)").all() as Array<{ name: string }>;
  assert.ok(indexes.some(({ name }) => name === "idx_token_ledger_to_created"));
  assert.ok(indexes.some(({ name }) => name === "idx_token_ledger_from_created"));
}

// All state paths are isolated before loading the real migration orchestrator.
const { runMigrations } = await import("../../src/lib/db/migrationRunner.ts");
const { hasLedgerRepairCandidates, reconcileRenumberedMigrations } =
  await import("../../src/lib/db/migrationRunner/schemaState.ts");

test(
  "renames require replacement files and never rewrite unknown source history",
  { timeout: 1000 },
  () => {
    const db = createNodeSqliteAdapterFromDatabase(new DatabaseSync(":memory:"), ":memory:");
    try {
      db.exec(`CREATE TABLE _omniroute_migrations (
        version TEXT PRIMARY KEY, name TEXT NOT NULL,
        applied_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      INSERT INTO _omniroute_migrations (version, name) VALUES
        ('028', 'compression_settings'), ('207', 'unknown_history'), ('225', 'unknown_history');`);
      const files = [
        { version: "034", name: "compression_settings", path: "unused.sql" },
        { version: "213", name: "proxy_payload_traffic", path: "unused.sql" },
        { version: "207", name: "remove_opencode_free_provider", path: "unused.sql" },
        { version: "225", name: "token_ledger_balance_indexes", path: "unused.sql" },
        { version: "226", name: "proxy_payload_traffic", path: "unused.sql" },
      ];
      const before = db.prepare("SELECT * FROM _omniroute_migrations ORDER BY version").all();
      assert.equal(hasLedgerRepairCandidates(db, files), false);
      assert.equal(reconcileRenumberedMigrations(db, files), false);
      assert.deepEqual(
        db.prepare("SELECT * FROM _omniroute_migrations ORDER BY version").all(),
        before
      );
    } finally {
      db.close();
    }
  }
);

test.after(() => {
  fs.rmSync(fixtureDir, { recursive: true, force: true });
  for (const key of Object.keys(process.env)) delete process.env[key];
  Object.assign(process.env, originalEnv);
});

test(
  "traffic migration upgrades fresh and published ledgers without losing counters",
  { timeout: 3000 },
  () => {
    const publishedSlots = ["206", "207", "213", "214", "215", "217", "218", "223", "224", "225"];
    for (let mask = 0; mask < 1 << publishedSlots.length; mask++) {
      const versions = publishedSlots.filter((_, index) => mask & (1 << index));
      const db = createNodeSqliteAdapterFromDatabase(new DatabaseSync(":memory:"), ":memory:");
      try {
        db.exec(`CREATE TABLE _omniroute_migrations (
        version TEXT PRIMARY KEY, name TEXT NOT NULL,
        applied_at TEXT NOT NULL DEFAULT (datetime('now'))
      );`);
        if (versions.length) {
          db.exec(sql);
          db.exec(`INSERT INTO proxy_payload_traffic
          (route_key, route_kind, upload_bytes, download_bytes, attempts, started_at, updated_at)
          VALUES ('direct', 'direct', 6, 13, 2, 'fixture-start', 'fixture-update');`);
        }
        for (const version of versions) {
          db.prepare(
            "INSERT INTO _omniroute_migrations (version, name, applied_at) VALUES (?, ?, ?)"
          ).run(version, "proxy_payload_traffic", "fixture-applied");
        }
        db.exec(
          "CREATE TABLE proxy_logs (id TEXT PRIMARY KEY); INSERT INTO proxy_logs VALUES ('retained');"
        );
        createTokenLedger(db);
        assert.equal(runMigrations(db, { isNewDb: true }), versions.length ? 11 : 12);
        assertCanonicalTokenIndexes(db);
        assert.deepEqual(db.prepare("SELECT * FROM proxy_logs").all(), [
          { id: "retained", egress_ip_v4: null, egress_ip_v6: null },
        ]);
        assert.deepEqual(
          db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all(),
          [
            { version: "206", name: "codex_wakeup_tasks" },
            { version: "207", name: "remove_opencode_free_provider" },
            { version: "213", name: "api_key_preferred_connections" },
            { version: "214", name: "call_logs_client_session_id" },
            { version: "215", name: "team_cost_centers" },
            { version: "216", name: "team_cost_shapes" },
            { version: "217", name: "quota_recovery_tickets" },
            { version: "218", name: "proxy_subscription_mirror_urls" },
            { version: "223", name: "call_logs_queue_wait_ms" },
            { version: "224", name: "proxy_logs_egress_ip_families" },
            { version: "225", name: "token_ledger_balance_indexes" },
            { version: "226", name: "proxy_payload_traffic" },
          ],
          `canonical ledger after ${versions.join(",") || "fresh"} startup`
        );
        if (versions.length) {
          assert.deepEqual(db.prepare("SELECT * FROM proxy_payload_traffic").all(), [
            {
              route_key: "direct",
              proxy_id: null,
              route_kind: "direct",
              upload_bytes: 6,
              download_bytes: 13,
              attempts: 2,
              known_upload_attempts: 0,
              completed_downloads: 0,
              failed_attempts: 0,
              cancelled_downloads: 0,
              errored_downloads: 0,
              started_at: "fixture-start",
              updated_at: "fixture-update",
            },
          ]);
          assert.equal(
            (
              db
                .prepare("SELECT applied_at FROM _omniroute_migrations WHERE version = '226'")
                .get() as {
                applied_at: string;
              }
            ).applied_at,
            "fixture-applied"
          );
        }
        for (const version of ["206", "207", "213", "214", "215", "216", "217", "218", "223"]) {
          assert.ok(
            db
              .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=?")
              .get(`incoming_${version}`),
            `canonical migration ${version} must execute after traffic ledger reconciliation`
          );
        }
        assert.equal(runMigrations(db, { isNewDb: true }), 0, "repeated startup must be a no-op");
      } finally {
        db.close();
      }
    }
  }
);

test("traffic migration preserves the previously published higher slot", { timeout: 1000 }, () => {
  const db = createNodeSqliteAdapterFromDatabase(new DatabaseSync(":memory:"), ":memory:");
  try {
    db.exec(sql);
    db.exec(`CREATE TABLE _omniroute_migrations (
      version TEXT PRIMARY KEY, name TEXT NOT NULL, applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    INSERT INTO _omniroute_migrations VALUES ('223', 'call_logs_queue_wait_ms', 'canonical-applied');
    INSERT INTO _omniroute_migrations VALUES ('225', 'proxy_payload_traffic', 'fixture-applied');
    INSERT INTO proxy_payload_traffic (route_key, route_kind, attempts, started_at, updated_at)
      VALUES ('direct', 'direct', 9, 'start', 'update');`);
    db.exec(
      "CREATE TABLE proxy_logs (id TEXT PRIMARY KEY); INSERT INTO proxy_logs VALUES ('retained');"
    );
    createTokenLedger(db);
    runMigrations(db, { isNewDb: true });
    assertCanonicalTokenIndexes(db);
    assert.deepEqual(db.prepare("SELECT * FROM proxy_logs").all(), [
      { id: "retained", egress_ip_v4: null, egress_ip_v6: null },
    ]);
    assert.equal(
      (db.prepare("SELECT attempts FROM proxy_payload_traffic").get() as { attempts: number })
        .attempts,
      9
    );
    assert.equal(
      (
        db.prepare("SELECT applied_at FROM _omniroute_migrations WHERE version='226'").get() as {
          applied_at: string;
        }
      ).applied_at,
      "fixture-applied"
    );
    assert.equal(
      (
        db.prepare("SELECT name FROM _omniroute_migrations WHERE version='223'").get() as {
          name: string;
        }
      ).name,
      "call_logs_queue_wait_ms"
    );
    assert.equal(runMigrations(db, { isNewDb: true }), 0);
  } finally {
    db.close();
  }
});

test("traffic migration preserves canonical 225 and existing 226 ledger timestamps", () => {
  const db = createNodeSqliteAdapterFromDatabase(new DatabaseSync(":memory:"), ":memory:");
  try {
    db.exec(sql);
    createTokenLedger(db);
    db.exec(fs.readFileSync(path.join(fixtureDir, "225_token_ledger_balance_indexes.sql"), "utf8"));
    db.exec(`CREATE TABLE _omniroute_migrations (
      version TEXT PRIMARY KEY, name TEXT NOT NULL, applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    INSERT INTO _omniroute_migrations VALUES
      ('225', 'token_ledger_balance_indexes', 'canonical-applied'),
      ('226', 'proxy_payload_traffic', 'traffic-applied');
    INSERT INTO proxy_payload_traffic (route_key, route_kind, attempts, started_at, updated_at)
      VALUES ('direct', 'direct', 9, 'start', 'update');
    CREATE TABLE proxy_logs (id TEXT PRIMARY KEY);`);
    assert.equal(runMigrations(db, { isNewDb: true }), 10);
    assert.deepEqual(
      db
        .prepare(
          "SELECT version, name, applied_at FROM _omniroute_migrations WHERE version >= '225' ORDER BY version"
        )
        .all(),
      [
        { version: "225", name: "token_ledger_balance_indexes", applied_at: "canonical-applied" },
        { version: "226", name: "proxy_payload_traffic", applied_at: "traffic-applied" },
      ]
    );
    assert.deepEqual(
      db.prepare("SELECT attempts, started_at, updated_at FROM proxy_payload_traffic").get(),
      { attempts: 9, started_at: "start", updated_at: "update" }
    );
    assertCanonicalTokenIndexes(db);
    assert.equal(runMigrations(db, { isNewDb: true }), 0);
  } finally {
    db.close();
  }
});

test(
  "an occupied canonical slot fails without rewriting unknown history or traffic rows",
  { timeout: 1000 },
  () => {
    const db = createNodeSqliteAdapterFromDatabase(new DatabaseSync(":memory:"), ":memory:");
    try {
      db.exec(sql);
      db.exec(`CREATE TABLE _omniroute_migrations (
      version TEXT PRIMARY KEY, name TEXT NOT NULL, applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    INSERT INTO _omniroute_migrations (version, name) VALUES
      ('226', 'unrelated_migration'), ('207', 'proxy_payload_traffic');
    INSERT INTO proxy_payload_traffic (route_key, route_kind, attempts, started_at, updated_at)
      VALUES ('direct', 'direct', 9, 'start', 'update');`);
      const before = db.prepare("SELECT * FROM _omniroute_migrations ORDER BY version").all();
      assert.throws(() => runMigrations(db, { isNewDb: true }), /target version 226 is occupied/);
      assert.deepEqual(
        db.prepare("SELECT * FROM _omniroute_migrations ORDER BY version").all(),
        before
      );
      assert.equal(
        (db.prepare("SELECT attempts FROM proxy_payload_traffic").get() as { attempts: number })
          .attempts,
        9
      );
    } finally {
      db.close();
    }
  }
);
