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
  new URL("../../src/lib/db/migrations/231_daily_cached_input.sql", import.meta.url),
  "utf8"
);
fs.writeFileSync(path.join(fixture, "231_daily_cached_input.sql"), sql, "utf8");
fs.writeFileSync(
  path.join(fixture, "224_proxy_logs_egress_ip_families.sql"),
  fs.readFileSync(
    new URL("../../src/lib/db/migrations/224_proxy_logs_egress_ip_families.sql", import.meta.url),
    "utf8"
  ),
  "utf8"
);
fs.writeFileSync(
  path.join(fixture, "225_token_ledger_balance_indexes.sql"),
  fs.readFileSync(
    new URL("../../src/lib/db/migrations/225_token_ledger_balance_indexes.sql", import.meta.url),
    "utf8"
  ),
  "utf8"
);
for (const file of [
  "226_request_cost_ledger_read_indexes.sql",
  "227_quota_recovery_due_cover.sql",
]) {
  fs.copyFileSync(
    new URL(`../../src/lib/db/migrations/${file}`, import.meta.url),
    path.join(fixture, file)
  );
}
for (const [version, name] of [
  ["206", "codex_wakeup_tasks"],
  ["213", "api_key_preferred_connections"],
  ["214", "call_logs_client_session_id"],
  ["215", "team_cost_centers"],
  ["216", "team_cost_shapes"],
  ["217", "quota_recovery_tickets"],
  ["218", "proxy_subscription_mirror_urls"],
  ["223", "call_logs_queue_wait_ms"],
  ["228", "purge_orphaned_provider_catalogs"],
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
  db.exec(`CREATE TABLE proxy_logs (id TEXT PRIMARY KEY);
    INSERT INTO proxy_logs VALUES ('retained');
    CREATE TABLE token_ledger (
      id INTEGER PRIMARY KEY, from_api_key_id TEXT, to_api_key_id TEXT,
      created_at TEXT, amount INTEGER
    );
    INSERT INTO token_ledger VALUES (1, 'from', 'to', 'fixture-created', 7);
    CREATE TABLE request_cost_ledger (api_key_id TEXT, timestamp TEXT, success INTEGER, service_tier TEXT, amount_usd REAL, request_id TEXT);
    INSERT INTO request_cost_ledger VALUES ('key','fixture-created',1,'default',0.25,'request');
    CREATE INDEX idx_rcl_api_key_timestamp ON request_cost_ledger(api_key_id,timestamp);
    CREATE TABLE quota_recovery_tickets (state TEXT, next_attempt_at TEXT, expires_at TEXT, api_key_id TEXT);
    INSERT INTO quota_recovery_tickets VALUES ('queued','fixture-due','fixture-expiry','key');
    CREATE INDEX idx_quota_recovery_due ON quota_recovery_tickets(state,next_attempt_at);
    CREATE TABLE daily_usage_summary (id INTEGER PRIMARY KEY, total_input_tokens INTEGER);
    INSERT INTO daily_usage_summary VALUES (1,100);
    CREATE TABLE _omniroute_migrations (
      version TEXT PRIMARY KEY, name TEXT NOT NULL,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );`);
  return db;
};

const assertCanonicalIndexes = (db: ReturnType<typeof makeDb>) => {
  assert.deepEqual(db.prepare("SELECT * FROM request_cost_ledger").all(), [
    {
      api_key_id: "key",
      timestamp: "fixture-created",
      success: 1,
      service_tier: "default",
      amount_usd: 0.25,
      request_id: "request",
    },
  ]);
  assert.deepEqual(
    db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type='index' AND name LIKE 'idx_rcl_%' ORDER BY name"
      )
      .all(),
    [{ name: "idx_rcl_api_key_ts_cover" }, { name: "idx_rcl_request_id" }]
  );
  assert.deepEqual(db.prepare("SELECT * FROM quota_recovery_tickets").all(), [
    {
      state: "queued",
      next_attempt_at: "fixture-due",
      expires_at: "fixture-expiry",
      api_key_id: "key",
    },
  ]);
  assert.deepEqual(
    db
      .prepare("PRAGMA index_info(idx_quota_recovery_due)")
      .all()
      .map((row) => row.name),
    ["state", "next_attempt_at", "expires_at", "api_key_id"]
  );
};

test.after(() => {
  fs.rmSync(fixture, { recursive: true, force: true });
  for (const key of Object.keys(process.env)) delete process.env[key];
  Object.assign(process.env, originalEnv);
});

test(
  "cached migration rehomes published ledgers and preserves unknown history",
  { timeout: 10000 },
  () => {
    const publishedSlots = ["206", "213", "214", "215", "217", "218", "223", "224", "225", "226"];
    // Slot 228 was published after the purge migration claimed it. Covering it alone and
    // alongside every earlier slot keeps the exhaustive mask at 2^10 combinations.
    const versionSets = [
      ...Array.from({ length: 1 << publishedSlots.length }, (_, mask) =>
        publishedSlots.filter((_, index) => mask & (1 << index))
      ),
      ["228"],
      [...publishedSlots, "228"],
    ];
    for (const versions of versionSets) {
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
        assert.equal(runMigrations(db, { isNewDb: true }), versions.length ? 13 : 14);
        assert.deepEqual(db.prepare("SELECT * FROM proxy_logs").all(), [
          { id: "retained", egress_ip_v4: null, egress_ip_v6: null },
        ]);
        assert.deepEqual(
          db.prepare("SELECT version,name FROM _omniroute_migrations ORDER BY version").all(),
          [
            { version: "206", name: "codex_wakeup_tasks" },
            { version: "213", name: "api_key_preferred_connections" },
            { version: "214", name: "call_logs_client_session_id" },
            { version: "215", name: "team_cost_centers" },
            { version: "216", name: "team_cost_shapes" },
            { version: "217", name: "quota_recovery_tickets" },
            { version: "218", name: "proxy_subscription_mirror_urls" },
            { version: "223", name: "call_logs_queue_wait_ms" },
            { version: "224", name: "proxy_logs_egress_ip_families" },
            { version: "225", name: "token_ledger_balance_indexes" },
            { version: "226", name: "request_cost_ledger_read_indexes" },
            { version: "227", name: "quota_recovery_due_cover" },
            { version: "228", name: "purge_orphaned_provider_catalogs" },
            { version: "231", name: "daily_cached_input" },
          ]
        );
        assert.deepEqual(db.prepare("SELECT * FROM daily_usage_summary").all(), [
          { id: 1, total_input_tokens: 100, total_cache_read_tokens: versions.length ? 60 : null },
        ]);
        if (versions.length) {
          assert.equal(
            (
              db
                .prepare("SELECT applied_at FROM _omniroute_migrations WHERE version='231'")
                .get() as {
                applied_at: string;
              }
            ).applied_at,
            "fixture-applied"
          );
        }
        for (const version of ["206", "213", "214", "215", "216", "217", "218", "223", "228"]) {
          assert.ok(
            db
              .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=?")
              .get(`incoming_${version}`),
            `canonical migration ${version} must execute after cache ledger reconciliation`
          );
        }
        assert.deepEqual(db.prepare("SELECT * FROM token_ledger").all(), [
          {
            id: 1,
            from_api_key_id: "from",
            to_api_key_id: "to",
            created_at: "fixture-created",
            amount: 7,
          },
        ]);
        assert.deepEqual(
          db
            .prepare(
              "SELECT name FROM sqlite_master WHERE type='index' AND name LIKE 'idx_token_ledger_%' ORDER BY name"
            )
            .all(),
          [{ name: "idx_token_ledger_from_created" }, { name: "idx_token_ledger_to_created" }]
        );
        assertCanonicalIndexes(db);
        assert.equal(runMigrations(db, { isNewDb: true }), 0);
      } finally {
        db.close();
      }
    }
  }
);

test("cached migration preserves published 224 alongside canonical 223", { timeout: 1000 }, () => {
  const db = makeDb();
  try {
    db.exec(sql);
    db.exec("UPDATE daily_usage_summary SET total_cache_read_tokens=60");
    db.exec(`INSERT INTO _omniroute_migrations (version,name,applied_at)
      VALUES ('223','call_logs_queue_wait_ms','canonical-applied')`);
    db.prepare("INSERT INTO _omniroute_migrations (version,name,applied_at) VALUES (?,?,?)").run(
      "224",
      "daily_cached_input",
      "fixture-applied"
    );
    runMigrations(db, { isNewDb: true });
    assert.equal(
      (
        db.prepare("SELECT total_cache_read_tokens FROM daily_usage_summary").get() as {
          total_cache_read_tokens: number;
        }
      ).total_cache_read_tokens,
      60
    );
    assert.equal(
      (
        db.prepare("SELECT applied_at FROM _omniroute_migrations WHERE version='231'").get() as {
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
    assert.deepEqual(db.prepare("SELECT * FROM token_ledger").all(), [
      {
        id: 1,
        from_api_key_id: "from",
        to_api_key_id: "to",
        created_at: "fixture-created",
        amount: 7,
      },
    ]);
    assert.deepEqual(
      db
        .prepare(
          "SELECT name FROM sqlite_master WHERE type='index' AND name LIKE 'idx_token_ledger_%' ORDER BY name"
        )
        .all(),
      [{ name: "idx_token_ledger_from_created" }, { name: "idx_token_ledger_to_created" }]
    );
    assertCanonicalIndexes(db);
    assert.equal(runMigrations(db, { isNewDb: true }), 0);
  } finally {
    db.close();
  }
});

test(
  "cached migration rejects unknown target occupancy without data loss",
  { timeout: 1000 },
  () => {
    const db = makeDb();
    try {
      db.exec(sql);
      db.exec(`INSERT INTO _omniroute_migrations (version,name) VALUES
      ('206','daily_cached_input'),('231','unrelated_migration');
      UPDATE daily_usage_summary SET total_cache_read_tokens=60;`);
      const before = db.prepare("SELECT * FROM _omniroute_migrations ORDER BY version").all();
      assert.throws(() => runMigrations(db, { isNewDb: true }), /target version 231 is occupied/);
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

for (const duplicateLegacy226 of [false, true]) {
  test(`cached migration preserves existing 231 timestamp with ${duplicateLegacy226 ? "legacy" : "canonical"} 226`, () => {
    const db = makeDb();
    try {
      db.exec(sql);
      db.exec("UPDATE daily_usage_summary SET total_cache_read_tokens=60");
      db.exec(
        "INSERT INTO _omniroute_migrations (version,name,applied_at) VALUES ('231','daily_cached_input','destination-applied')"
      );
      if (duplicateLegacy226) {
        db.exec(
          "INSERT INTO _omniroute_migrations (version,name,applied_at) VALUES ('226','daily_cached_input','legacy-applied')"
        );
      } else {
        db.exec(
          fs.readFileSync(path.join(fixture, "226_request_cost_ledger_read_indexes.sql"), "utf8")
        );
        db.exec(
          "INSERT INTO _omniroute_migrations (version,name,applied_at) VALUES ('226','request_cost_ledger_read_indexes','canonical-applied')"
        );
      }
      runMigrations(db, { isNewDb: true });
      assertCanonicalIndexes(db);
      assert.equal(
        db.prepare("SELECT applied_at FROM _omniroute_migrations WHERE version='231'").get()
          ?.applied_at,
        "destination-applied"
      );
      assert.equal(
        db.prepare("SELECT name FROM _omniroute_migrations WHERE version='226'").get()?.name,
        "request_cost_ledger_read_indexes"
      );
      if (!duplicateLegacy226)
        assert.equal(
          db.prepare("SELECT applied_at FROM _omniroute_migrations WHERE version='226'").get()
            ?.applied_at,
          "canonical-applied"
        );
      assert.equal(
        db.prepare("SELECT total_cache_read_tokens FROM daily_usage_summary").get()
          ?.total_cache_read_tokens,
        60
      );
      assert.equal(runMigrations(db, { isNewDb: true }), 0);
    } finally {
      db.close();
    }
  });
}
