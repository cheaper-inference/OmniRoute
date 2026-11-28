// A connection with no quota_snapshots rows must not repeat the same empty
// window-function query on every request. The empty verdict is cached for a
// short, bounded time and dropped as soon as a reading is recorded.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-quota-empty-snapshot-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");
const { getQuotaCacheState } = await import("../../src/domain/quotaCacheState.ts");

const NEGATIVE_TTL_MS = 30_000;

type Db = { prepare: (sql: string, ...rest: unknown[]) => unknown };

function countSnapshotQueries(fn: () => void): number {
  const db = core.getDbInstance() as unknown as Db;
  const realPrepare = db.prepare.bind(db);
  let queries = 0;
  db.prepare = ((sql: string, ...rest: unknown[]) => {
    if (typeof sql === "string" && sql.includes("FROM quota_snapshots")) queries++;
    return realPrepare(sql, ...rest);
  }) as Db["prepare"];
  try {
    fn();
  } finally {
    db.prepare = realPrepare;
  }
  return queries;
}

test.beforeEach(() => {
  quotaCache.__clearForTests();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a connection without snapshots queries SQLite once, not once per request", () => {
  const queries = countSnapshotQueries(() => {
    for (let i = 0; i < 5; i++) {
      assert.equal(quotaCache.isQuotaExhaustedForRequest("empty-conn", "openai", "gpt-4o"), false);
    }
  });
  assert.equal(queries, 1);
});

test("the empty verdict expires, so a snapshot written elsewhere is seen later", () => {
  const realNow = Date.now;
  const t0 = realNow.call(Date);
  try {
    Date.now = () => t0;
    assert.equal(
      countSnapshotQueries(() => quotaCache.isAccountQuotaExhausted("ttl-conn")),
      1
    );
    Date.now = () => t0 + NEGATIVE_TTL_MS - 1;
    assert.equal(
      countSnapshotQueries(() => quotaCache.isAccountQuotaExhausted("ttl-conn")),
      0
    );
    Date.now = () => t0 + NEGATIVE_TTL_MS + 1;
    assert.equal(
      countSnapshotQueries(() => quotaCache.isAccountQuotaExhausted("ttl-conn")),
      1
    );
  } finally {
    Date.now = realNow;
  }
});

test("a new exhaustion reading still blocks the next request after an empty lookup", () => {
  assert.equal(quotaCache.isQuotaExhaustedForRequest("fresh-conn", "openai", "gpt-4o"), false);
  quotaCache.setQuotaCache("fresh-conn", "openai", {
    weekly: { remainingPercentage: 0, resetAt: null },
  });
  assert.equal(quotaCache.isQuotaExhaustedForRequest("fresh-conn", "openai", "gpt-4o"), true);
});

test("a reading recorded after an empty lookup survives eviction of the cache entry", () => {
  assert.equal(quotaCache.isAccountQuotaExhausted("evicted-conn"), false);
  quotaCache.setQuotaCache("evicted-conn", "openai", {
    weekly: { remainingPercentage: 0, resetAt: null },
  });
  // The background refresh drops entries of inactive connections; the persisted row remains.
  getQuotaCacheState().cache.delete("evicted-conn");
  assert.equal(quotaCache.isAccountQuotaExhausted("evicted-conn"), true);
});

test("a connection with snapshots is still hydrated from them", () => {
  quotaCache.setQuotaCache("persisted-conn", "openai", {
    weekly: { remainingPercentage: 0, resetAt: null },
  });
  getQuotaCacheState().cache.delete("persisted-conn");
  assert.equal(quotaCache.isAccountQuotaExhausted("persisted-conn"), true);
  assert.ok(quotaCache.getQuotaCache("persisted-conn"), "hydration refills the cache");
});
