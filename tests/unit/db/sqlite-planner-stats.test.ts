import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import Database from "better-sqlite3";
import { createBetterSqliteAdapter } from "../../../src/lib/db/adapters/betterSqliteAdapter";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-planner-stats-"));
const envNames = [
  "DATA_DIR",
  "OMNIROUTE_SQLITE_OPTIMIZE_ENABLED",
  "OMNIROUTE_SQLITE_ANALYSIS_LIMIT",
] as const;
const originalEnv = Object.fromEntries(envNames.map((name) => [name, process.env[name]]));
process.env.DATA_DIR = dataDir;
const { maintainSqlitePlannerStats, parseSqlitePlannerStatsEnv } =
  await import("../../../src/lib/db/sqlitePlannerStats");
const core = await import("../../../src/lib/db/core");

// Copied from migration 060_create_gamification.sql, without any additional index.
const schema = `
CREATE TABLE IF NOT EXISTS xp_audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  api_key_id TEXT NOT NULL,
  action TEXT NOT NULL,
  xp_earned INTEGER NOT NULL,
  metadata TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_xp_audit_log_api_key_created
  ON xp_audit_log (api_key_id, created_at);
`;
const statsQuery = `SELECT AVG(hourly_total) AS mean,
  CASE WHEN AVG(hourly_total) = 0 THEN 1
       ELSE AVG(hourly_total * hourly_total) - AVG(hourly_total) * AVG(hourly_total)
  END AS variance
  FROM (
    SELECT api_key_id, SUM(xp_earned) AS hourly_total
    FROM xp_audit_log
    WHERE created_at > datetime('now', '-1 hour')
    GROUP BY api_key_id
  )`;

function seed(db: Database.Database) {
  db.exec(schema);
  // Independent key/time cycles: every synthetic key has entries across 30 days.
  db.exec(`WITH RECURSIVE rows(n) AS (
    VALUES(0) UNION ALL SELECT n + 1 FROM rows WHERE n < 59999
  ) INSERT INTO xp_audit_log (api_key_id, action, xp_earned, created_at)
    SELECT 'synthetic-key-' || (n % 100), 'request', 1,
      datetime('now', '-' || (n / 100 * 72) || ' minutes') FROM rows`);
}

function hasStats(db: Database.Database) {
  return !!db.prepare("SELECT 1 FROM sqlite_schema WHERE name = 'sqlite_stat1'").get();
}

function plan(db: Database.Database) {
  return (db.prepare(`EXPLAIN QUERY PLAN ${statsQuery}`).all() as { detail: string }[])
    .map((row) => row.detail)
    .join("\n");
}

const parsingCases: Array<[string, string | undefined, string | undefined, boolean, number]> = [
  ["defaults", undefined, undefined, true, 400],
  ["empty", "", "", true, 400],
  ["false", "false", "400", false, 400],
  ["zero flag", "0", "400", false, 400],
  ["trimmed false", " FALSE ", " 27 ", false, 27],
  ["trimmed zero", " 0 ", "0", false, 0],
  ["true", "true", "0", true, 0],
  ["one", "1", "1", true, 1],
  ["unknown flag defaults on", "invalid", "400", true, 400],
  ["lower clamp", undefined, "-1", true, 0],
  ["upper boundary", undefined, "100000", true, 100000],
  ["upper clamp", undefined, "100001", true, 100000],
  ["large integer clamp", undefined, "999999999999", true, 100000],
  ["fraction", undefined, "1.5", true, 400],
  ["junk suffix", undefined, "12ms", true, 400],
  ["non-number", undefined, "invalid", true, 400],
  ["NaN", undefined, "NaN", true, 400],
  ["infinity", undefined, "Infinity", true, 400],
  ["whitespace", undefined, "  ", true, 400],
  ["hex is invalid", undefined, "0x100", true, 400],
  ["exponent is invalid", undefined, "1e3", true, 400],
];
for (const [label, enabled, limit, expectedEnabled, expectedLimit] of parsingCases) {
  test(`env parsing: ${label}`, () => {
    assert.deepEqual(
      parseSqlitePlannerStatsEnv({
        OMNIROUTE_SQLITE_OPTIMIZE_ENABLED: enabled,
        OMNIROUTE_SQLITE_ANALYSIS_LIMIT: limit,
      }),
      { enabled: expectedEnabled, analysisLimit: expectedLimit }
    );
  });
}

let raw: Database.Database;
let db: ReturnType<typeof createBetterSqliteAdapter>;
let nextDb = 0;
test.beforeEach(() => {
  delete process.env.OMNIROUTE_SQLITE_OPTIMIZE_ENABLED;
  delete process.env.OMNIROUTE_SQLITE_ANALYSIS_LIMIT;
  raw = new Database(path.join(dataDir, `planner-${nextDb++}.sqlite`));
  db = createBetterSqliteAdapter(raw);
});
test.afterEach(() => {
  if (db.open) db.close();
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  for (const name of envNames) {
    if (originalEnv[name] === undefined) delete process.env[name];
    else process.env[name] = originalEnv[name];
  }
});

test("startup statistics turn the XP aggregation SCAN into a skip-scan SEARCH", () => {
  seed(raw);
  assert.equal(hasStats(raw), false);
  assert.match(plan(raw), /SCAN xp_audit_log USING INDEX idx_xp_audit_log_api_key_created/);
  const before = raw.prepare(statsQuery).get();
  maintainSqlitePlannerStats(db);
  assert.equal(raw.pragma("analysis_limit", { simple: true }), 400);
  assert.ok(
    raw
      .prepare("SELECT stat FROM sqlite_stat1 WHERE idx = ?")
      .get("idx_xp_audit_log_api_key_created")
  );
  assert.match(
    plan(raw),
    /SEARCH xp_audit_log USING INDEX idx_xp_audit_log_api_key_created \(ANY\(api_key_id\) AND created_at>\?\)/
  );
  assert.deepEqual(raw.prepare(statsQuery).get(), before, "query results are unchanged");
});

test("first pass checks all tables once per handle, subsequent passes use plain optimize", (t) => {
  const calls: string[] = [];
  const pragma = db.pragma.bind(db);
  t.mock.method(db, "pragma", (sql: string, options?: { simple?: boolean }) => {
    calls.push(sql);
    return pragma(sql, options);
  });
  maintainSqlitePlannerStats(db);
  maintainSqlitePlannerStats(db);
  assert.deepEqual(calls, [
    "analysis_limit = 400",
    "optimize = 0x10002",
    "analysis_limit = 400",
    "optimize",
  ]);
});

for (const flag of ["false", "0"]) {
  test(`disabled (${flag}) performs no PRAGMAs and creates no statistics`, (t) => {
    seed(raw);
    process.env.OMNIROUTE_SQLITE_OPTIMIZE_ENABLED = flag;
    const spy = t.mock.method(db, "pragma");
    maintainSqlitePlannerStats(db);
    maintainSqlitePlannerStats(db);
    assert.equal(spy.mock.callCount(), 0);
    assert.equal(hasStats(raw), false);
    delete process.env.OMNIROUTE_SQLITE_OPTIMIZE_ENABLED;
    maintainSqlitePlannerStats(db);
    assert.equal(hasStats(raw), true, "enabling later still performs initialization");
  });
}

for (const limit of [0, 37, 100000]) {
  test(`configured analysis_limit=${limit} is applied`, () => {
    process.env.OMNIROUTE_SQLITE_ANALYSIS_LIMIT = String(limit);
    maintainSqlitePlannerStats(db);
    assert.equal(raw.pragma("analysis_limit", { simple: true }), limit);
  });
}

test("zero keeps periodic analysis unlimited instead of using SQLite's optimize sampling cap", (t) => {
  process.env.OMNIROUTE_SQLITE_ANALYSIS_LIMIT = "0";
  maintainSqlitePlannerStats(db);
  seed(raw);
  const calls: string[] = [];
  const pragma = db.pragma.bind(db);
  t.mock.method(db, "pragma", (sql: string, options?: { simple?: boolean }) => {
    calls.push(sql);
    return pragma(sql, options);
  });
  maintainSqlitePlannerStats(db);
  assert.deepEqual(calls, ["analysis_limit = 0", "optimize = 0x00002"]);
  const row = raw
    .prepare("SELECT stat FROM sqlite_stat1 WHERE idx = 'idx_xp_audit_log_api_key_created'")
    .get() as { stat: string };
  assert.equal(row.stat.split(" ")[0], "60000", "unlimited analysis records the exact row count");
});

test("closed database errors are logged and never escape", (t) => {
  db.close();
  const warning = t.mock.method(console, "warn", () => {});
  assert.doesNotThrow(() => maintainSqlitePlannerStats(db));
  assert.equal(warning.mock.callCount(), 1);
  assert.match(String(warning.mock.calls[0].arguments[0]), /planner statistics/i);
});

test("a failed first pass is retried with the startup mask", (t) => {
  const pragma = db.pragma.bind(db);
  let fail = true;
  const calls: string[] = [];
  t.mock.method(console, "warn", () => {});
  t.mock.method(db, "pragma", (sql: string, options?: { simple?: boolean }) => {
    calls.push(sql);
    if (fail && sql.startsWith("optimize")) {
      fail = false;
      throw new Error("synthetic maintenance failure");
    }
    return pragma(sql, options);
  });
  assert.doesNotThrow(() => maintainSqlitePlannerStats(db));
  maintainSqlitePlannerStats(db);
  assert.equal(calls.filter((sql) => sql === "optimize = 0x10002").length, 2);
});

test("in-memory and read-only handles are untouched", (t) => {
  const memory = new Database(":memory:");
  const readonly = new Database(raw.name, { readonly: true });
  try {
    for (const handle of [memory, readonly]) {
      const adapter = createBetterSqliteAdapter(handle);
      const spy = t.mock.method(adapter, "pragma");
      maintainSqlitePlannerStats(adapter);
      assert.equal(spy.mock.callCount(), 0);
      assert.equal(hasStats(handle), false);
    }
  } finally {
    memory.close();
    readonly.close();
  }
});

test("in-memory fallback adapters are untouched", (t) => {
  const fallback = { ...db, driver: "sql.js" as const };
  const spy = t.mock.method(fallback, "pragma");
  maintainSqlitePlannerStats(fallback);
  assert.equal(spy.mock.callCount(), 0);
});
