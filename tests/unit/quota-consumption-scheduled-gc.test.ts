// quota_consumption keeps one row per (key, dimension, bucket). The sliding window reads only the
// current and previous bucket, so a row not updated for two windows is dead. Nothing deleted them
// on the schedule, so closed buckets piled up. The scheduled cleanup must remove them.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-gc-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const cleanup = await import("../../src/lib/db/cleanup.ts");
const { incrementBucket } = await import("../../src/lib/db/quotaConsumption.ts");

const DAY_MS = 86_400_000;

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function rowCount(): number {
  const db = core.getDbInstance();
  return (db.prepare("SELECT COUNT(*) AS n FROM quota_consumption").get() as { n: number }).n;
}

test("scheduled cleanup removes quota buckets older than two monthly windows and keeps live ones", async () => {
  const now = Date.now();
  incrementBucket("k1", "pool:tokens:hourly", 1, 5, now - 90 * DAY_MS);
  incrementBucket("k1", "pool:tokens:monthly", 2, 5, now - 61 * DAY_MS);
  // Still readable: a monthly bucket is the "previous" bucket for up to two windows.
  incrementBucket("k1", "pool:tokens:monthly", 3, 5, now - 59 * DAY_MS);
  incrementBucket("k1", "pool:tokens:hourly", 4, 5, now);
  assert.equal(rowCount(), 4);

  const summary = await cleanup.runAutoCleanup();

  assert.equal(summary.results.quotaConsumption?.deleted, 2);
  assert.equal(summary.results.quotaConsumption?.errors, 0);
  const left = core
    .getDbInstance()
    .prepare("SELECT bucket_index FROM quota_consumption ORDER BY bucket_index")
    .all()
    .map((row) => (row as { bucket_index: number }).bucket_index);
  assert.deepEqual(left, [3, 4]);
});
