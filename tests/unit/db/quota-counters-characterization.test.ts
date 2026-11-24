/**
 * Characterization of the quota counter storage through its public exports only, so the
 * same file passes against the pre-repository modules and against the repository-backed
 * facades: per-key tpm/rpm minute buckets (api_key_quota_counters) and the quota-share
 * pool buckets (quota_consumption). Covers the UPSERT accumulation, updated_at refresh,
 * the 2-bucket sliding window, capped stale-bucket pruning, the per-key clear, the
 * cross-key pool sum, the pool log listing and the GC boundary.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "quota-counters-characterization-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const keyQuota = await import("../../../src/lib/db/keyQuota.ts");
const consumption = await import("../../../src/lib/db/quotaConsumption.ts");

const WINDOW = keyQuota.KEY_QUOTA_WINDOW_MS;
const t0 = Date.parse("2026-09-14T12:00:30.000Z");
const bucket0 = Math.floor(t0 / WINDOW);

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type CounterRow = {
  api_key_id: string;
  dimension_key: string;
  bucket_index: number;
  consumed: number;
  updated_at: number;
};

function keyQuotaRows(apiKeyId: string): CounterRow[] {
  return core
    .getDbInstance()
    .prepare(
      `SELECT api_key_id, dimension_key, bucket_index, consumed, updated_at
       FROM api_key_quota_counters WHERE api_key_id = ?
       ORDER BY dimension_key, bucket_index`
    )
    .all(apiKeyId) as CounterRow[];
}

function consumptionRows(): CounterRow[] {
  return core
    .getDbInstance()
    .prepare(
      `SELECT api_key_id, dimension_key, bucket_index, consumed, updated_at
       FROM quota_consumption ORDER BY api_key_id, dimension_key, bucket_index`
    )
    .all() as CounterRow[];
}

// ---------------------------------------------------------------------------
// api_key_quota_counters
// ---------------------------------------------------------------------------

test("key quota: increments accumulate in one row per dimension and refresh updated_at", () => {
  keyQuota.incrementKeyQuotaCounter("k1", "tpm", 100, t0);
  keyQuota.incrementKeyQuotaCounter("k1", "tpm", 50, t0 + 1_000);
  keyQuota.incrementKeyQuotaCounter("k1", "rpm", 1, t0 + 2_000);
  assert.deepEqual(keyQuotaRows("k1"), [
    {
      api_key_id: "k1",
      dimension_key: "key-quota:rpm",
      bucket_index: bucket0,
      consumed: 1,
      updated_at: t0 + 2_000,
    },
    {
      api_key_id: "k1",
      dimension_key: "key-quota:tpm",
      bucket_index: bucket0,
      consumed: 150,
      updated_at: t0 + 1_000,
    },
  ]);
});

test("key quota: empty key and non-positive delta write nothing", () => {
  keyQuota.incrementKeyQuotaCounter("", "tpm", 10, t0);
  keyQuota.incrementKeyQuotaCounter("k1", "tpm", 0, t0);
  keyQuota.incrementKeyQuotaCounter("k1", "rpm", -3, t0);
  keyQuota.recordKeyQuotaUsage("", 10, t0);
  const total = core
    .getDbInstance()
    .prepare("SELECT COUNT(*) AS n FROM api_key_quota_counters")
    .get() as {
    n: number;
  };
  assert.equal(total.n, 0);
});

test("key quota: recordKeyQuotaUsage counts tokens only when positive, always one request", () => {
  keyQuota.recordKeyQuotaUsage("k1", 0, t0);
  keyQuota.recordKeyQuotaUsage("k1", 40, t0);
  const counters = keyQuota.getKeyQuotaCounters("k1", { now: () => t0, monthTotalUsd: 0 });
  assert.equal(counters.tpmUsed, 40);
  assert.equal(counters.rpmUsed, 2);
});

test("key quota: sliding window weights the previous bucket by the remaining fraction", () => {
  keyQuota.incrementKeyQuotaCounter("k1", "tpm", 1000, t0 - WINDOW);
  keyQuota.incrementKeyQuotaCounter("k1", "tpm", 200, t0);
  const counters = keyQuota.getKeyQuotaCounters("k1", { now: () => t0, monthTotalUsd: 7 });
  assert.equal(counters.tpmUsed, 1000 * (1 - 30_000 / WINDOW) + 200);
  assert.equal(counters.rpmUsed, 0);
  assert.equal(counters.monthlyAmountUsd, 7);
});

test("key quota: a write prunes buckets older than the previous one, capped at 1000 rows", () => {
  const db = core.getDbInstance();
  const insert = db.prepare(
    `INSERT INTO api_key_quota_counters (api_key_id, dimension_key, bucket_index, consumed, updated_at)
     VALUES (?, ?, ?, 1, 0)`
  );
  for (let i = 0; i < 1005; i++) insert.run("k1", "key-quota:tpm", bucket0 - 10 - i);
  insert.run("k1", "key-quota:tpm", bucket0 - 1);
  insert.run("k1", "key-quota:rpm", bucket0 - 50);
  insert.run("k2", "key-quota:tpm", bucket0 - 50);

  keyQuota.incrementKeyQuotaCounter("k1", "tpm", 5, t0);

  const stale = db
    .prepare(
      `SELECT COUNT(*) AS n FROM api_key_quota_counters
       WHERE api_key_id = 'k1' AND dimension_key = 'key-quota:tpm' AND bucket_index < ?`
    )
    .get(bucket0 - 1) as { n: number };
  assert.equal(stale.n, 5, "one write deletes at most 1000 stale rows");
  const kept = keyQuotaRows("k1").filter((r) => r.bucket_index >= bucket0 - 1);
  assert.deepEqual(
    kept.map((r) => [r.dimension_key, r.bucket_index, r.consumed]),
    [
      ["key-quota:tpm", bucket0 - 1, 1],
      ["key-quota:tpm", bucket0, 5],
    ]
  );
  assert.equal(keyQuotaRows("k1").filter((r) => r.dimension_key === "key-quota:rpm").length, 1);
  assert.equal(keyQuotaRows("k2").length, 1, "other keys are untouched");

  keyQuota.incrementKeyQuotaCounter("k1", "tpm", 5, t0);
  const drained = db
    .prepare(
      `SELECT COUNT(*) AS n FROM api_key_quota_counters
       WHERE api_key_id = 'k1' AND dimension_key = 'key-quota:tpm' AND bucket_index < ?`
    )
    .get(bucket0 - 1) as { n: number };
  assert.equal(drained.n, 0, "the next write drains the rest");
});

test("key quota: clearKeyQuotaLimits removes limits, every counter of the key and the unpriced marker", () => {
  keyQuota.upsertKeyQuotaLimits("k1", { tpmLimit: 100 });
  keyQuota.recordKeyQuotaUsage("k1", 10, t0);
  keyQuota.recordKeyQuotaUsage("k2", 10, t0);
  keyQuota.saveUnpricedQuotaMonthStart("k1", 123);

  keyQuota.clearKeyQuotaLimits("k1");

  assert.equal(keyQuotaRows("k1").length, 0);
  assert.equal(keyQuotaRows("k2").length, 2);
  assert.equal(keyQuota.getKeyQuotaLimits("k1").tpmLimit, null);
  assert.equal(keyQuota.loadUnpricedQuotaMonthStart("k1"), null);
});

test("key quota: enforcement status reads counters only for limited dimensions", () => {
  keyQuota.upsertKeyQuotaLimits("k1", { rpmLimit: 2 });
  keyQuota.recordKeyQuotaUsage("k1", 500, t0);
  keyQuota.recordKeyQuotaUsage("k1", 500, t0);
  const status = keyQuota.getKeyQuotaStatus("k1", { now: () => t0, enforcementOnly: true });
  assert.equal(status.counters.tpmUsed, 0);
  assert.equal(status.counters.rpmUsed, 2);
  assert.equal(status.rpmExceeded, true);
  assert.equal(status.tpmExceeded, false);
  const full = keyQuota.getKeyQuotaStatus("k1", { now: () => t0, monthTotalUsd: 0 });
  assert.equal(full.counters.tpmUsed, 1000);
});

test("key quota: storage errors propagate from the synchronous exports", () => {
  core.getDbInstance().exec("DROP TABLE api_key_quota_counters");
  assert.throws(() => keyQuota.incrementKeyQuotaCounter("k1", "tpm", 1, t0));
  assert.throws(() => keyQuota.getKeyQuotaCounters("k1", { now: () => t0, monthTotalUsd: 0 }));
});

// ---------------------------------------------------------------------------
// quota_consumption
// ---------------------------------------------------------------------------

test("pool buckets: incrementBucket accumulates, accepts negative deltas, refreshes updated_at", () => {
  consumption.incrementBucket("k1", "p1:tokens:hourly", 7, 10, 1_000);
  consumption.incrementBucket("k1", "p1:tokens:hourly", 7, 5.5, 2_000);
  consumption.incrementBucket("k1", "p1:tokens:hourly", 7, -3, 3_000);
  assert.deepEqual(consumptionRows(), [
    {
      api_key_id: "k1",
      dimension_key: "p1:tokens:hourly",
      bucket_index: 7,
      consumed: 12.5,
      updated_at: 3_000,
    },
  ]);
  assert.equal(consumption.getBucket("k1", "p1:tokens:hourly", 7), 12.5);
  assert.equal(consumption.getBucket("k1", "p1:tokens:hourly", 8), 0);
});

test("pool buckets: getPair reads the current and previous bucket of one key", () => {
  consumption.incrementBucket("k1", "p1:tokens:hourly", 9, 4, 1);
  consumption.incrementBucket("k1", "p1:tokens:hourly", 10, 6, 1);
  consumption.incrementBucket("k1", "p1:tokens:hourly", 8, 100, 1);
  consumption.incrementBucket("k2", "p1:tokens:hourly", 10, 100, 1);
  assert.deepEqual(consumption.getPair("k1", "p1:tokens:hourly", 10), { curr: 6, prev: 4 });
  assert.deepEqual(consumption.getPair("k3", "p1:tokens:hourly", 10), { curr: 0, prev: 0 });
});

test("pool buckets: sumPoolDimension sums one dimension across keys", () => {
  consumption.incrementBucket("k1", "p1:tokens:hourly", 10, 6, 1);
  consumption.incrementBucket("k2", "p1:tokens:hourly", 10, 4, 1);
  consumption.incrementBucket("k2", "p1:tokens:hourly", 9, 3, 1);
  consumption.incrementBucket("k2", "p2:tokens:hourly", 10, 1000, 1);
  assert.deepEqual(consumption.sumPoolDimension("p1:tokens:hourly", 10), {
    currTotal: 10,
    prevTotal: 3,
  });
  assert.deepEqual(consumption.sumPoolDimension("missing:tokens:hourly", 10), {
    currTotal: 0,
    prevTotal: 0,
  });
});

test("pool log: newest first, literal pool prefix, unit/window split, limit clamped to 1..500", () => {
  consumption.incrementBucket("k1", "p_1:tokens:hourly", 1, 1, 100);
  consumption.incrementBucket("k1", "p_1:usd:custom:5m", 1, 2, 300);
  consumption.incrementBucket("k2", "p_1:requests:daily", 1, 3, 200);
  consumption.incrementBucket("k1", "pX1:tokens:hourly", 1, 9, 999);
  consumption.incrementBucket("k1", "p_10:tokens:hourly", 1, 9, 998);

  const events = consumption.listConsumptionForPool("p_1", 50);
  assert.deepEqual(events, [
    {
      apiKeyId: "k1",
      dimensionKey: "p_1:usd:custom:5m",
      unit: "usd",
      window: "custom:5m",
      bucketIndex: 1,
      consumed: 2,
      updatedAt: 300,
    },
    {
      apiKeyId: "k2",
      dimensionKey: "p_1:requests:daily",
      unit: "requests",
      window: "daily",
      bucketIndex: 1,
      consumed: 3,
      updatedAt: 200,
    },
    {
      apiKeyId: "k1",
      dimensionKey: "p_1:tokens:hourly",
      unit: "tokens",
      window: "hourly",
      bucketIndex: 1,
      consumed: 1,
      updatedAt: 100,
    },
  ]);
  assert.equal(consumption.listConsumptionForPool("p_1", 0).length, 1, "limit floors at 1");
  for (let i = 0; i < 510; i++)
    consumption.incrementBucket("k1", "p_1:tokens:hourly", 100 + i, 1, i);
  assert.equal(consumption.listConsumptionForPool("p_1", 10_000).length, 500, "limit caps at 500");
});

test("pool GC: deletes strictly older rows and reports the count", () => {
  consumption.incrementBucket("k1", "p1:tokens:hourly", 1, 1, 100);
  consumption.incrementBucket("k1", "p1:tokens:hourly", 2, 1, 200);
  consumption.incrementBucket("k1", "p1:tokens:hourly", 3, 1, 300);
  assert.equal(consumption.gcOlderThan(200), 1);
  assert.deepEqual(
    consumptionRows().map((r) => r.updated_at),
    [200, 300]
  );
});

test("pool buckets: storage errors propagate from the synchronous exports", () => {
  core.getDbInstance().exec("DROP TABLE quota_consumption");
  assert.throws(() => consumption.incrementBucket("k1", "p1:tokens:hourly", 1, 1, 1));
  assert.throws(() => consumption.getPair("k1", "p1:tokens:hourly", 1));
  assert.throws(() => consumption.sumPoolDimension("p1:tokens:hourly", 1));
  assert.throws(() => consumption.listConsumptionForPool("p1", 5));
  assert.throws(() => consumption.gcOlderThan(1));
});
