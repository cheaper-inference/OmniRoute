/**
 * tests/unit/quota-percent-attribution-stores.test.ts
 *
 * Shadow-bucket writes and the per-connection attribution wrapper against both
 * quota stores (real SQLite, Redis with an in-memory fake client), plus the
 * read budget and the fail-open paths (store read rejected, no saturation
 * signal, costs without usable tokens).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import type { QuotaStore } from "../../src/lib/quota/types.ts";
import type { PercentAttributionStore } from "../../src/lib/quota/percentAttribution.ts";

// DATA_DIR must be set before any DB module is imported.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-percent-attribution-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { createPool } = await import("../../src/lib/db/quotaPools.ts");
const { SqliteQuotaStore } = await import("../../src/lib/quota/sqliteQuotaStore.ts");
const { RedisQuotaStore } = await import("../../src/lib/quota/redisQuotaStore.ts");
const sat = await import("../../src/lib/quota/saturationSignals.ts");
const { attributePercentDimension, percentProxyDimKey, recordPercentProxy } =
  await import("../../src/lib/quota/percentAttribution.ts");

// The Redis store reads pool allocations from SQLite.
core.getDbInstance();

// Account saturation for every connection: 60% of the 5h window.
sat._clearSaturationCache();
sat.__setAnthropicSaturationDepsForTests({
  loadConnection: async (id) => ({ id, provider: "claude", authType: "oauth", accessToken: "t" }),
  fetchUsage: async () => ({ quotas: { "session (5h)": { used: 60, total: 100 } } }),
});

test.after(() => {
  sat.__setAnthropicSaturationDepsForTests(null);
  sat._clearSaturationCache();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// In-memory stand-in for the ioredis client (same shape as the mock in
// tests/unit/quota-redis-store.test.ts).
const redisData = new Map<string, string>();
const fake = {
  async incrbyfloat(key: string, value: number): Promise<string> {
    const next = (parseFloat(redisData.get(key) ?? "0") || 0) + value;
    redisData.set(key, String(next));
    return String(next);
  },
  async expire(): Promise<number> {
    return 1;
  },
  async mget(...keys: string[]): Promise<Array<string | null>> {
    return keys.map((k) => redisData.get(k) ?? null);
  },
  async eval(): Promise<unknown> {
    return null;
  },
  async del(...keys: string[]): Promise<number> {
    return keys.filter((k) => redisData.delete(k)).length;
  },
  async quit(): Promise<string> {
    return "OK";
  },
};

function redisWithFakeClient(): QuotaStore {
  const store: QuotaStore = new RedisQuotaStore("redis://fake");
  Object.assign(store, { client: async () => fake }); // swaps the client accessor on this instance only
  return store;
}

const boom = async (): Promise<never> => {
  throw new Error("store down");
};
const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 1e-6, `${a} ≈ ${b}`);
const dim = { window: "5h", limit: 100 } as const;

// Shared fixture for the read-budget and fail-open tests: pool a/b 50/50 with 900k/100k recorded.
const real = new SqliteQuotaStore();
const connAB = "conn-ab";
const poolAB = createPool({
  connectionId: connAB,
  name: "ab",
  allocations: [
    { apiKeyId: "ab-a", weight: 50, policy: "hard" },
    { apiKeyId: "ab-b", weight: 50, policy: "hard" },
  ],
});
const dimKeyAB = { poolId: poolAB.id, unit: "percent", window: "5h" } as const;
await recordPercentProxy(real, "ab-a", dimKeyAB, { tokens: 900_000 });
await recordPercentProxy(real, "ab-b", dimKeyAB, { tokens: 100_000 });

const bound = (): PercentAttributionStore => ({
  peek: (k, d) => real.peek(k, d),
  poolConsumedTotal: (p, d) => real.poolConsumedTotal(p, d),
});

for (const [name, make] of [
  ["sqlite", () => new SqliteQuotaStore()],
  ["redis", redisWithFakeClient],
] as const) {
  test(`${name}: attribution reads the pool total with the real pool id`, async () => {
    const store = make(),
      a = `${name}-a`,
      b = `${name}-b`,
      conn = `conn-${name}`;
    const pool = createPool({
      connectionId: conn,
      name,
      allocations: [
        { apiKeyId: a, weight: 50, policy: "hard" },
        { apiKeyId: b, weight: 50, policy: "hard" },
      ],
    });
    const dimKey = { poolId: pool.id, unit: "percent", window: "5h" } as const;
    await recordPercentProxy(store, a, dimKey, { tokens: 900_000 });
    await recordPercentProxy(store, b, dimKey, { tokens: 100_000 });
    near(await store.poolConsumedTotal(pool.id, percentProxyDimKey(dimKey)), 1_000_000);
    const att = await attributePercentDimension({
      store,
      pool,
      connectionId: conn,
      provider: "claude",
      dimension: dim,
    });
    near(att.globalUsedPercent, 0.6);
    near(att.accountConsumed, 60);
    near(att.internal, 60);
    near(att.external, 0);
    near(att.consumedByKey[a], 54);
    near(att.consumedByKey[b], 6);
    near(att.internalByKey[a], 54); // no external part here
    near(att.internalByKey[b], 6);

    // Only b requested: its 6 needs the 1M pool total. Were the total read with
    // any id other than the real pool id, Redis would return 0, T would fall to
    // b's own 100k and b would be charged the whole 60.
    const onlyB = await attributePercentDimension({
      store,
      pool,
      connectionId: conn,
      provider: "claude",
      dimension: dim,
      apiKeyIds: [b],
    });
    assert.deepEqual(Object.keys(onlyB.consumedByKey), [b]);
    near(onlyB.consumedByKey[b], 6);
  });
}

test("one requested key costs exactly one peek and one pool total", async () => {
  const reads = { peek: 0, total: 0 };
  const totalPoolIds: string[] = [];
  const counting: PercentAttributionStore = {
    peek: (k, d) => (reads.peek++, real.peek(k, d)),
    poolConsumedTotal: (p, d) => (
      reads.total++,
      totalPoolIds.push(p),
      real.poolConsumedTotal(p, d)
    ),
  };
  const att = await attributePercentDimension({
    store: counting,
    pool: poolAB,
    connectionId: connAB,
    provider: "claude",
    dimension: dim,
    apiKeyIds: ["ab-a"],
  });
  assert.deepEqual(reads, { peek: 1, total: 1 });
  assert.deepEqual(totalPoolIds, [poolAB.id]);
  assert.deepEqual(Object.keys(att.consumedByKey), ["ab-a"]);
  near(att.consumedByKey["ab-a"], 54);
});

test("a requested key outside the pool is neither read nor reported", async () => {
  const peeked: string[] = [];
  const counting: PercentAttributionStore = {
    peek: (k, d) => (peeked.push(k), real.peek(k, d)),
    poolConsumedTotal: (p, d) => real.poolConsumedTotal(p, d),
  };
  const att = await attributePercentDimension({
    store: counting,
    pool: poolAB,
    connectionId: connAB,
    provider: "claude",
    dimension: dim,
    apiKeyIds: ["ab-a", "not-in-pool"],
  });
  assert.deepEqual(peeked, ["ab-a"]);
  assert.deepEqual(Object.keys(att.consumedByKey), ["ab-a"]);
  assert.deepEqual(Object.keys(att.internalByKey), ["ab-a"]);
});

test("a rejected store read falls back to the external split and never throws", async () => {
  for (const store of [
    { ...bound(), peek: boom },
    { ...bound(), poolConsumedTotal: boom },
  ]) {
    const att = await attributePercentDimension({
      store,
      pool: poolAB,
      connectionId: connAB,
      provider: "claude",
      dimension: dim,
    });
    near(att.internal, 0);
    near(att.consumedByKey["ab-a"], 30);
    near(att.consumedByKey["ab-b"], 30);
    near(att.internalByKey["ab-a"], 0);
    near(att.internalByKey["ab-b"], 0);
  }
});

test("costs without usable tokens write nothing", async () => {
  for (const cost of [{}, { tokens: 0 }, { tokens: NaN }, { tokens: -5 }])
    await recordPercentProxy(real, "ab-z", dimKeyAB, cost);
  assert.equal(await real.peek("ab-z", percentProxyDimKey(dimKeyAB)), 0);
});

// Last test of the file: it replaces the saturation signal.
test("no saturation signal: nothing is attributed", async () => {
  sat._clearSaturationCache();
  sat.__setAnthropicSaturationDepsForTests({ loadConnection: boom, fetchUsage: boom });
  const att = await attributePercentDimension({
    store: real,
    pool: poolAB,
    connectionId: connAB,
    provider: "claude",
    dimension: dim,
  });
  assert.deepEqual(
    [att.accountConsumed, att.consumedByKey["ab-a"], att.consumedByKey["ab-b"]],
    [0, 0, 0]
  );
});
