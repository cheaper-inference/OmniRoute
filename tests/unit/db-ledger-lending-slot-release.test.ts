// ENVIRONMENT NOTE (sandbox better-sqlite3 / glibc limitation, not a code defect):
// This test constructs or exercises a real better-sqlite3-backed SQLite database.
// better-sqlite3 is a native addon; production and CI load it normally, but some
// sandboxes/dev boxes ship a system glibc older than the prebuilt binary requires
// ("GLIBC_2.29 not found"), so the native module fails to dlopen and any test that
// reaches better-sqlite3 directly (or asserts stdout that the load-failure warning
// would pollute) fails HERE while passing in CI. This is a known environment
// limitation, not a defect in the code under test: the OmniRoute runtime itself
// cascades to node:sqlite/sql.js when better-sqlite3 is unavailable. See
// tests/unit/_helpers/betterSqlite3Availability.ts for a guard helper.
import test, { type TestContext } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type BetterSqlite3 from "better-sqlite3";
import {
  BETTER_SQLITE3_SKIP_REASON,
  betterSqlite3Available,
} from "./_helpers/betterSqlite3Availability.ts";

// The guard has to run before better-sqlite3 is loaded. A top-level static
// import would throw while this module initialises, so the skip below would
// never get a chance to hide an environment that cannot load the addon.
const canUseBetterSqlite3 = betterSqlite3Available();
const skip = canUseBetterSqlite3 ? false : BETTER_SQLITE3_SKIP_REASON;
const Database = canUseBetterSqlite3
  ? ((await import("better-sqlite3")).default as typeof BetterSqlite3)
  : (null as unknown as typeof BetterSqlite3);

const migrationsDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-lending-slots-"));
const originalMigrationsDir = process.env.OMNIROUTE_MIGRATIONS_DIR;
process.env.OMNIROUTE_MIGRATIONS_DIR = migrationsDir;

type Row = [version: string, name: string];
const NATIVE: Row[] = [
  ["123", "quota_auto_ping"],
  ["124", "generic_session_affinity_ttl"],
  ["134", "proxy_logs_egress_ip"],
  ["135", "migrate_model_capability_max_token"],
];
for (const [version, name] of NATIVE) {
  const src = new URL(`../../src/lib/db/migrations/${version}_${name}.sql`, import.meta.url);
  fs.copyFileSync(src, path.join(migrationsDir, `${version}_${name}.sql`));
}
const LEND = "quota_allocation_lending";
const LEND_PCT = "quota_allocation_lending_percent";
// Ledgers written by downstream builds, newest shape first.
const CURRENT: Row[] = [
  NATIVE[0],
  NATIVE[1],
  ["134", LEND],
  ["135", LEND_PCT],
  [`legacy-123-${LEND}`, LEND],
  [`legacy-124-${LEND_PCT}`, LEND_PCT],
];
const OLDEST: Row[] = [
  ["123", LEND],
  ["124", LEND_PCT],
];
const INTERMEDIATE: Row[] = [
  ...OLDEST,
  ["125", "provider_connection_quota_visibility"],
  ["126", "reasoning_routing_rules"],
  ["127", "usage_history_account_identity"],
  ["128", "auto_candidate_overrides"],
  ["129", "usage_history_codex_strong_identity"],
  ["130", "remove_unregistered_qwen_data"],
  ["131", "proxy_subscriptions"],
  ["132", "proxy_subscriptions_meta"],
  ["133", "call_logs_session_tag"],
  ["134", LEND],
  ["135", LEND_PCT],
];

// The runner resolves OMNIROUTE_MIGRATIONS_DIR once, when the module loads, and
// test:unit:fast shares one module cache across files. A fresh instance keeps this
// directory out of that cache, so the variable can go back as soon as it has loaded.
const runnerUrl = new URL("../../src/lib/db/migrationRunner.ts", import.meta.url).href;
const { runMigrations } = (await import(
  `${runnerUrl}?test=${Date.now()}-${Math.random().toString(16).slice(2)}`
)) as typeof import("../../src/lib/db/migrationRunner.ts");
if (originalMigrationsDir === undefined) delete process.env.OMNIROUTE_MIGRATIONS_DIR;
else process.env.OMNIROUTE_MIGRATIONS_DIR = originalMigrationsDir;

test.after(() => {
  fs.rmSync(migrationsDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function boot(
  t: TestContext,
  rows: Row[],
  opts: { pingColumns?: boolean; egressColumn?: boolean } = {},
  prepare?: (db: BetterSqlite3.Database) => void
) {
  const db = new Database(":memory:");
  t.after(() => db.close());
  db.exec(`
    CREATE TABLE _omniroute_migrations (
      version TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE provider_connections (id TEXT PRIMARY KEY, provider TEXT);
    CREATE TABLE key_value (
      namespace TEXT NOT NULL,
      key TEXT NOT NULL,
      value TEXT NOT NULL,
      PRIMARY KEY (namespace, key)
    );
    CREATE TABLE proxy_logs (id TEXT PRIMARY KEY);
    CREATE TABLE IF NOT EXISTS model_capability_overrides (
      provider TEXT NOT NULL,
      model_id TEXT NOT NULL,
      override_key TEXT NOT NULL,
      override_value TEXT NOT NULL,
      refreshed_at TEXT NOT NULL DEFAULT (datetime('now')),
      PRIMARY KEY (provider, model_id, override_key)
    ) WITHOUT ROWID;
    CREATE INDEX IF NOT EXISTS idx_model_capability_overrides_key
      ON model_capability_overrides (override_key);
    CREATE TABLE quota_allocations (
      pool_id TEXT NOT NULL,
      api_key_id TEXT NOT NULL,
      weight REAL NOT NULL DEFAULT 0,
      lending INTEGER NOT NULL DEFAULT 0,
      lending_percent INTEGER NOT NULL DEFAULT 0,
      lending_until INTEGER,
      PRIMARY KEY (pool_id, api_key_id)
    );
    INSERT INTO quota_allocations VALUES ('pool-1', 'key-1', 50, 1, 30, 1893456000000);
    INSERT INTO key_value VALUES ('settings', 'codexSessionAffinityTtlMs', '900000');
    INSERT INTO model_capability_overrides (provider, model_id, override_key, override_value)
      VALUES ('openai', 'gpt-x', 'max_token', '4096');
  `);
  if (opts.pingColumns) {
    db.exec(`
      ALTER TABLE provider_connections ADD COLUMN last_ping_at TEXT;
      ALTER TABLE provider_connections ADD COLUMN last_pinged_reset_key TEXT;
    `);
  }
  if (opts.egressColumn) db.exec("ALTER TABLE proxy_logs ADD COLUMN egress_ip TEXT;");
  const insert = db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)");
  for (const [version, name] of rows) insert.run(version, name);
  prepare?.(db);
  return { db, applied: runMigrations(db as never) };
}

function ledger(db: BetterSqlite3.Database): Map<string, string> {
  const rows = db
    .prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version")
    .all() as Array<{ version: string; name: string }>;
  return new Map(rows.map((r) => [r.version, r.name]));
}

function columns(db: BetterSqlite3.Database, table: string): string[] {
  return (db.prepare(`PRAGMA table_info(${table})`).all() as Array<{ name: string }>).map(
    (c) => c.name
  );
}

function assertReleased(db: BetterSqlite3.Database) {
  const l = ledger(db);
  for (const [version, name] of NATIVE) assert.equal(l.get(version), name, `slot ${version}`);
  assert.deepEqual(
    db.prepare("SELECT lending, lending_percent, lending_until FROM quota_allocations").all(),
    [{ lending: 1, lending_percent: 30, lending_until: 1893456000000 }],
    "a partial lending consent must survive the boot unchanged"
  );
  assert.ok(columns(db, "proxy_logs").includes("egress_ip"));
  for (const c of ["last_ping_at", "last_pinged_reset_key"])
    assert.ok(columns(db, "provider_connections").includes(c), c);
  assert.deepEqual(
    db.prepare("SELECT override_key, override_value FROM model_capability_overrides").all(),
    [{ override_key: "max_output_tokens", override_value: "4096" }]
  );
}

const ttl = (db: BetterSqlite3.Database) =>
  db.prepare("SELECT value FROM key_value WHERE key = 'sessionAffinityTtlMs'").pluck().get();

test("current downstream ledger: 134/135 are released and the real files apply", { skip }, (t) => {
  const { db, applied } = boot(t, CURRENT, { pingColumns: true });
  assert.equal(applied, 2);
  assertReleased(db);
  const l = ledger(db);
  assert.equal(l.get(`legacy-134-${LEND}`), LEND);
  assert.equal(l.get(`legacy-135-${LEND_PCT}`), LEND_PCT);
  assert.equal(l.get(`legacy-123-${LEND}`), LEND, "earlier rehomed rows are kept");
  assert.equal(ttl(db), undefined, "124 was already applied here and must not replay");
});

test("oldest downstream ledger: 123/124 are released and the real files apply", { skip }, (t) => {
  const { db, applied } = boot(t, OLDEST);
  assert.equal(applied, 4);
  assertReleased(db);
  assert.equal(ledger(db).get(`legacy-123-${LEND}`), LEND);
  assert.equal(ledger(db).get(`legacy-124-${LEND_PCT}`), LEND_PCT);
  assert.equal(ttl(db), "900000");
});

test(
  "intermediate ledger: all four slots release behind already-applied 125-133",
  { skip },
  (t) => {
    const { db, applied } = boot(t, INTERMEDIATE);
    assert.equal(applied, 4);
    assertReleased(db);
    assert.equal([...ledger(db).keys()].filter((v) => v.startsWith("legacy-")).length, 4);
    assert.equal(ttl(db), "900000");
  }
);

test(
  "healed columns: a schema repaired before the runner does not abort the boot",
  { skip },
  (t) => {
    const { db, applied } = boot(t, INTERMEDIATE, { pingColumns: true, egressColumn: true });
    assert.equal(applied, 4);
    assertReleased(db);
  }
);

test("existing generic TTL is kept when 124 replays late", { skip }, (t) => {
  const { db, applied } = boot(t, OLDEST, {}, (d) =>
    d.exec("INSERT INTO key_value VALUES ('settings','sessionAffinityTtlMs','60000')")
  );
  assert.equal(applied, 4);
  assert.equal(ttl(db), "60000");
});

test("modern override wins when 135 replays late", { skip }, (t) => {
  const { db, applied } = boot(t, OLDEST, {}, (d) =>
    d.exec(
      "INSERT INTO model_capability_overrides (provider, model_id, override_key, override_value) " +
        "VALUES ('openai','gpt-x','max_output_tokens','8192')"
    )
  );
  assert.equal(applied, 4);
  assert.deepEqual(
    db.prepare("SELECT override_key, override_value FROM model_capability_overrides").all(),
    [{ override_key: "max_output_tokens", override_value: "8192" }]
  );
});

test("second boot applies nothing and moves nothing", { skip }, (t) => {
  const { db } = boot(t, INTERMEDIATE);
  const before = [...ledger(db)];
  assert.equal(runMigrations(db as never), 0);
  assert.deepEqual([...ledger(db)], before);
});

test("native ledger is left alone", { skip }, (t) => {
  const { db, applied } = boot(t, NATIVE, { pingColumns: true, egressColumn: true });
  assert.equal(applied, 0);
  assert.deepEqual([...ledger(db)], NATIVE);
  assert.equal(
    db
      .prepare("SELECT COUNT(*) FROM model_capability_overrides WHERE override_key = 'max_token'")
      .pluck()
      .get(),
    1,
    "135 is recorded as applied and must not replay"
  );
});
