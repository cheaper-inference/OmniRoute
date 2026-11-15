import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "usage-recent-cache-buckets-"));
process.env.DATA_DIR = dir;
process.env.SQLITE_FILE = path.join(dir, "storage.sqlite");
process.env.OMNIROUTE_SQLITE_FILE = process.env.SQLITE_FILE;
process.env.APP_LOG_TO_FILE = "false";
const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");
const { getUsageStats } = await import("../../src/lib/usage/usageStats.ts");

test.beforeEach(() => {
  getDbInstance().prepare("DELETE FROM usage_history").run();
});
test.after(async () => {
  await (await import("../../src/lib/usage/callLogs.ts")).closeCallLogSaves(5_000);
  resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});

const cases: {
  name: string;
  rows: { model: string; cacheRead: number | null }[];
  expected: number | null;
  complete: boolean;
}[] = [
  {
    name: "all unknown cache reads remain null and incomplete",
    rows: [{ model: "fixture", cacheRead: null }],
    expected: null,
    complete: false,
  },
  {
    name: "reported zero cache reads remain zero and complete",
    rows: [{ model: "fixture", cacheRead: 0 }],
    expected: 0,
    complete: true,
  },
  {
    name: "reported cache reads are summed without adding input twice",
    rows: [
      { model: "fixture", cacheRead: 40 },
      { model: "fixture", cacheRead: 20 },
    ],
    expected: 60,
    complete: true,
  },
  {
    name: "mixed cache reads in the same model group retain a partial sum",
    rows: [
      { model: "fixture", cacheRead: 60 },
      { model: "fixture", cacheRead: null },
    ],
    expected: 60,
    complete: false,
  },
  {
    name: "reported zero combined with unknown cache reads remains incomplete",
    rows: [
      { model: "fixture", cacheRead: 0 },
      { model: "fixture", cacheRead: null },
    ],
    expected: 0,
    complete: false,
  },
  {
    name: "unknown groups keep a shared minute bucket incomplete",
    rows: [
      { model: "reported", cacheRead: 60 },
      { model: "unknown", cacheRead: null },
    ],
    expected: 60,
    complete: false,
  },
];

for (const { name, rows, expected, complete } of cases) {
  test(name, async () => {
    const timestamp = new Date(Math.floor(Date.now() / 60_000) * 60_000 - 60_000).toISOString();
    const insert = getDbInstance().prepare(`INSERT INTO usage_history
      (provider, model, timestamp, tokens_input, tokens_output, tokens_cache_read,
       calculated_cost_usd)
      VALUES ('cache-bucket-fixture', ?, ?, 100, 10, ?, 0)`);
    for (const row of rows) insert.run(row.model, timestamp, row.cacheRead);

    const stats = await getUsageStats();
    const populated = stats.last10Minutes.filter((bucket) => bucket.requests > 0);
    assert.equal(populated.length, 1);
    assert.equal(populated[0].requests, rows.length);
    assert.equal(populated[0].promptTokens, rows.length * 100);
    assert.equal(populated[0].completionTokens, rows.length * 10);
    assert.equal(populated[0].cachedInputTokens, expected);
    assert.equal(populated[0].cachedInputTokensComplete, complete);
    for (const bucket of stats.last10Minutes.filter((bucket) => bucket.requests === 0)) {
      assert.equal(bucket.cachedInputTokens, null);
      assert.equal(bucket.cachedInputTokensComplete, true);
    }
  });
}
