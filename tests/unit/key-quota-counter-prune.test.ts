import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-prune-"));
process.env.DATA_DIR = dataDir;

const core = await import("../../src/lib/db/core.ts");
const quotaDb = await import("../../src/lib/db/keyQuota.ts");
const quotaDomain = await import("../../src/domain/keyQuota.ts");

const WINDOW = quotaDb.KEY_QUOTA_WINDOW_MS;
const t0 = Date.parse("2026-09-14T12:00:30.000Z");
const at = (ms: number) => ({ now: () => ms });

function bucketsOf(keyId: string): number[] {
  return (
    core
      .getDbInstance()
      .prepare(
        "SELECT DISTINCT bucket_index FROM api_key_quota_counters WHERE api_key_id = ? ORDER BY bucket_index"
      )
      .all(keyId) as Array<{ bucket_index: number }>
  ).map((row) => row.bucket_index);
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("minute counters older than the previous bucket are pruned, live buckets stay", () => {
  quotaDomain.recordKeyQuotaUsage("key-1", 100, at(t0));
  quotaDomain.recordKeyQuotaUsage("key-1", 100, at(t0 + 5 * WINDOW));
  quotaDomain.recordKeyQuotaUsage("key-1", 100, at(t0 + 6 * WINDOW));

  const current = Math.floor((t0 + 6 * WINDOW) / WINDOW);
  assert.deepEqual(bucketsOf("key-1"), [current - 1, current]);
});

test("pruning does not change the sliding-window count", () => {
  quotaDomain.recordKeyQuotaUsage("key-2", 1000, at(t0));
  quotaDomain.recordKeyQuotaUsage("key-2", 250, at(t0 + WINDOW));
  quotaDomain.recordKeyQuotaUsage("key-3", 1, at(t0 + 3 * WINDOW));

  const counters = quotaDb.getKeyQuotaCounters("key-2", { now: () => t0 + WINDOW });
  assert.equal(counters.tpmUsed, 1000 * (1 - 30_000 / WINDOW) + 250);
});
