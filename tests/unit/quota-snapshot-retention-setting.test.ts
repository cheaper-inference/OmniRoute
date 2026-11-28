import assert from "node:assert/strict";
import test, { type TestContext } from "node:test";
import { createTempDataDir } from "../_setup/tempDataDir.ts";

const { cleanup } = createTempDataDir();
const core = await import("../../src/lib/db/core.ts");
const { updateDatabaseSettings } = await import("../../src/lib/db/databaseSettings.ts");
const { runQuotaSnapshotCleanup } = await import("../../src/domain/quotaSnapshotCleanup.ts");

test.after(cleanup);

const DAY_MS = 86_400_000;
let clock = Date.now();

function seedSnapshots(t: TestContext, ages: number[]) {
  // Make each case independent of the sweep's six-hour throttle.
  clock += DAY_MS;
  t.mock.method(Date, "now", () => clock);
  const db = core.getDbInstance();
  db.exec("DELETE FROM quota_snapshots");
  const insert = db.prepare(
    `INSERT INTO quota_snapshots
     (provider, connection_id, window_key, remaining_percentage, is_exhausted, created_at)
     VALUES ('openai', ?, 'hourly', 50, 0, ?)`
  );
  for (const age of ages) {
    insert.run(`age-${age}d`, new Date(Date.now() - age * DAY_MS).toISOString());
  }
}

async function sweep(): Promise<string[]> {
  assert.equal(await runQuotaSnapshotCleanup(), true);
  const rows = core.getDbInstance().prepare("SELECT connection_id FROM quota_snapshots").all() as {
    connection_id: string;
  }[];
  return rows.map((row) => row.connection_id).sort();
}

test("the sweep keeps 90 days when there is only a migration seed", async (t) => {
  seedSnapshots(t, [91, 89]);
  assert.deepEqual(await sweep(), ["age-89d"]);
});

test("the sweep keeps 90 days after an unrelated save with no quota age on disk", async (t) => {
  core
    .getDbInstance()
    .exec("DELETE FROM key_value WHERE namespace = 'databaseSettings' AND key = 'quotaSnapshots'");
  updateDatabaseSettings({});
  seedSnapshots(t, [91, 89]);
  assert.deepEqual(await sweep(), ["age-89d"]);
});

test("the sweep keeps snapshots within a longer saved retention", async (t) => {
  updateDatabaseSettings({ retention: { quotaSnapshots: 365 } } as Parameters<
    typeof updateDatabaseSettings
  >[0]);
  seedSnapshots(t, [120, 400]);
  assert.deepEqual(await sweep(), ["age-120d"]);
});

test("the sweep honors an explicit seven-day retention after an unrelated save", async (t) => {
  updateDatabaseSettings({ retention: { quotaSnapshots: 7 } } as Parameters<
    typeof updateDatabaseSettings
  >[0]);
  updateDatabaseSettings({});
  seedSnapshots(t, [8, 6]);
  assert.deepEqual(await sweep(), ["age-6d"]);
});

test("the sweep falls back to 90 days when the saved retention is unreadable", async (t) => {
  updateDatabaseSettings({ retention: { quotaSnapshots: 365 } } as Parameters<
    typeof updateDatabaseSettings
  >[0]);
  seedSnapshots(t, [91, 89]);
  const db = core.getDbInstance();
  const prepare = db.prepare.bind(db);
  t.mock.method(db, "prepare", (sql: string) => {
    if (/key_value/i.test(sql)) throw new Error("settings unreadable");
    return prepare(sql);
  });
  assert.deepEqual(await sweep(), ["age-89d"]);
});
