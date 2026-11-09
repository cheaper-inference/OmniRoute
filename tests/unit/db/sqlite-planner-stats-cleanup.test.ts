import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-planner-cleanup-"));
const envNames = [
  "DATA_DIR",
  "OMNIROUTE_SQLITE_OPTIMIZE_ENABLED",
  "OMNIROUTE_SQLITE_ANALYSIS_LIMIT",
] as const;
const originalEnv = Object.fromEntries(envNames.map((name) => [name, process.env[name]]));
process.env.DATA_DIR = dataDir;
const core = await import("../../../src/lib/db/core");
const cleanup = await import("../../../src/lib/db/cleanup");
const settings = await import("../../../src/lib/db/databaseSettings");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
  delete process.env.OMNIROUTE_SQLITE_OPTIMIZE_ENABLED;
  process.env.OMNIROUTE_SQLITE_ANALYSIS_LIMIT = "31";
  settings.updateDatabaseSettings({ retention: { autoCleanupEnabled: false } });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  for (const name of envNames) {
    if (originalEnv[name] === undefined) delete process.env[name];
    else process.env[name] = originalEnv[name];
  }
});

function hasStats() {
  return !!core
    .getDbInstance()
    .prepare("SELECT 1 FROM sqlite_schema WHERE name = 'sqlite_stat1'")
    .get();
}

test("scheduled startup initializes statistics after migrations, periodic uses plain optimize", async (t) => {
  const db = core.getDbInstance();
  assert.ok(db.prepare("SELECT 1 FROM sqlite_schema WHERE name = 'xp_audit_log'").get());
  assert.equal(hasStats(), false, "opening a test database alone must not maintain statistics");
  const calls: string[] = [];
  const pragma = db.pragma.bind(db);
  t.mock.method(db, "pragma", (sql: string, options?: { simple?: boolean }) => {
    calls.push(sql);
    return pragma(sql, options);
  });
  await cleanup.runScheduledCleanupPass("startup");
  assert.equal(hasStats(), true);
  assert.equal(db.pragma("analysis_limit", { simple: true }), 31);
  await cleanup.runScheduledCleanupPass("periodic");
  assert.deepEqual(
    calls.filter((sql) => sql.startsWith("optimize")),
    ["optimize = 0x10002", "optimize"]
  );
});

for (const flag of ["false", "0"]) {
  test(`disabled (${flag}) leaves scheduled startup and periodic passes working without statistics`, async (t) => {
    process.env.OMNIROUTE_SQLITE_OPTIMIZE_ENABLED = flag;
    const db = core.getDbInstance();
    const calls: string[] = [];
    const pragma = db.pragma.bind(db);
    t.mock.method(db, "pragma", (sql: string, options?: { simple?: boolean }) => {
      calls.push(sql);
      return pragma(sql, options);
    });
    await assert.doesNotReject(() => cleanup.runScheduledCleanupPass("startup"));
    await assert.doesNotReject(() => cleanup.runScheduledCleanupPass("periodic"));
    assert.equal(hasStats(), false);
    assert.ok(!calls.some((sql) => /^(optimize|analysis_limit)/.test(sql)));
    delete process.env.OMNIROUTE_SQLITE_OPTIMIZE_ENABLED;
    await cleanup.runScheduledCleanupPass("periodic");
    assert.equal(hasStats(), true, "first enabled pass initializes even if startup was disabled");
  });
}

test("planner maintenance failures do not fail the cleanup pass", async (t) => {
  const db = core.getDbInstance();
  const pragma = db.pragma.bind(db);
  const warning = t.mock.method(console, "warn", () => {});
  t.mock.method(db, "pragma", (sql: string, options?: { simple?: boolean }) => {
    if (sql.startsWith("optimize")) throw new Error("synthetic optimize failure");
    return pragma(sql, options);
  });
  await assert.doesNotReject(() => cleanup.runScheduledCleanupPass("startup"));
  assert.ok(
    warning.mock.calls.some((call) => /planner statistics/i.test(String(call.arguments[0])))
  );
});
