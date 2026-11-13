/**
 * The quota-cache tick's snapshot sweep must follow retention.quotaSnapshots (settable up to
 * 3650 days). It used to call cleanupOldSnapshots() with its built-in 90 days, which deleted rows
 * the dashboard setting said to keep.
 */
import test, { type TestContext } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-quota-retention-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const { updateDatabaseSettings } = await import("../../src/lib/db/databaseSettings.ts");
const { runQuotaSnapshotCleanup } = await import("../../src/domain/quotaSnapshotCleanup.ts");

const DAY_MS = 86_400_000;

function insertSnapshot(connectionId: string, ageDays: number) {
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO quota_snapshots
       (provider, connection_id, window_key, remaining_percentage, is_exhausted,
        next_reset_at, window_duration_ms, raw_data, created_at)
       VALUES ('openai', ?, 'hourly', 50, 0, NULL, 3600000, '{}', ?)`
    )
    .run(connectionId, new Date(Date.now() - ageDays * DAY_MS).toISOString());
}

/** The sweep runs at most once every 6 hours; move the clock past the previous run. */
function advanceClock(t: TestContext, hours: number) {
  const realNow = Date.now.bind(Date);
  t.mock.method(Date, "now", () => realNow() + hours * 3_600_000);
}

function remaining(): string[] {
  const rows = core
    .getDbInstance()
    .prepare("SELECT connection_id FROM quota_snapshots ORDER BY connection_id")
    .all() as Array<{ connection_id: string }>;
  return rows.map((row) => row.connection_id);
}

test.before(() => {
  core.resetDbInstance();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("the tick sweep keeps snapshots that a longer retention setting keeps", async () => {
  updateDatabaseSettings({ retention: { quotaSnapshots: 365 } } as Parameters<
    typeof updateDatabaseSettings
  >[0]);
  insertSnapshot("age-120d", 120);
  insertSnapshot("age-400d", 400);

  assert.equal(await runQuotaSnapshotCleanup(), true);

  assert.deepEqual(remaining(), ["age-120d"], "120 days is inside 365; 400 days is outside");
});

test("the tick sweep still deletes what a shorter retention setting drops", async (t) => {
  updateDatabaseSettings({ retention: { quotaSnapshots: 30 } } as Parameters<
    typeof updateDatabaseSettings
  >[0]);
  insertSnapshot("age-45d", 45);
  insertSnapshot("age-5d", 5);
  advanceClock(t, 7);

  assert.equal(await runQuotaSnapshotCleanup(), true);

  assert.ok(!remaining().includes("age-45d"), "45 days is outside a 30-day policy");
  assert.ok(remaining().includes("age-5d"));
});

test("an unreadable retention setting does not stop the sweep", async (t) => {
  // 365 days would keep the 100-day row, so its deletion proves the 90-day fallback ran.
  updateDatabaseSettings({ retention: { quotaSnapshots: 365 } } as Parameters<
    typeof updateDatabaseSettings
  >[0]);
  insertSnapshot("age-100d", 100);
  insertSnapshot("age-10d", 10);
  advanceClock(t, 14);
  const db = core.getDbInstance() as unknown as { prepare: (sql: string) => unknown };
  const prepare = db.prepare.bind(db);
  t.mock.method(db, "prepare", (sql: string) => {
    if (/key_value/i.test(sql)) throw new Error("settings unreadable");
    return prepare(sql);
  });

  assert.equal(await runQuotaSnapshotCleanup(), true);

  t.mock.restoreAll();
  assert.ok(!remaining().includes("age-100d"), "the built-in 90 days still applies");
  assert.ok(remaining().includes("age-10d"));
});
