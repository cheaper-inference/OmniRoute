/**
 * tests/unit/quota-percent-attribution-stores.test.ts
 *
 * Token recording and the per-connection attribution wrapper against both quota
 * stores (real SQLite, Redis with an in-memory fake client): the book opens on
 * the first reading, its growth is split by the tokens routed since then, the
 * read budget, the floor from QUOTA_PERCENT_MIN_TOKENS_PER_POINT, and the
 * fail-open paths (book read or write rejected, no plan-window reading, costs
 * without usable tokens).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import type { LedgerKey, QuotaStore } from "../../src/lib/quota/types.ts";
import type { PercentAttributionStore } from "../../src/lib/quota/percentAttribution.ts";
import { runFakeLedgerScript } from "./helpers/fakeRedisLedgerScripts.ts";

// DATA_DIR must be set before any DB module is imported.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-percent-attribution-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { createPool } = await import("../../src/lib/db/quotaPools.ts");
const { SqliteQuotaStore } = await import("../../src/lib/quota/sqliteQuotaStore.ts");
const { RedisQuotaStore } = await import("../../src/lib/quota/redisQuotaStore.ts");
const sat = await import("../../src/lib/quota/saturationSignals.ts");
const { attributePercentDimension, recordPercentTokens } =
  await import("../../src/lib/quota/percentAttribution.ts");

// The Redis store reads pool allocations from SQLite.
core.getDbInstance();

test.after(() => {
  sat.__setAnthropicSaturationDepsForTests(null);
  sat._clearSaturationCache();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const boom = async (): Promise<never> => {
  throw new Error("store down");
};

/** Account usage of the 5h window for every connection, in percent; the cache is cleared. */
function usage(pct: number): void {
  sat._clearSaturationCache();
  sat.__setAnthropicSaturationDepsForTests({
    loadConnection: async (id) => ({ id, provider: "claude", authType: "oauth", accessToken: "t" }),
    fetchUsage: async () => ({ quotas: { "session (5h)": { used: pct, total: 100 } } }),
  });
}

/** Every usage read fails: no plan-window reading, and a saturation of 0. */
function failUsage(): void {
  sat._clearSaturationCache();
  sat.__setAnthropicSaturationDepsForTests({ loadConnection: boom, fetchUsage: boom });
}

// In-memory stand-in for the ioredis hash commands the book uses.
const hashes = new Map<string, Map<string, string>>();
function hashOf(key: string): Map<string, string> {
  let hash = hashes.get(key);
  if (!hash) {
    hash = new Map();
    hashes.set(key, hash);
  }
  return hash;
}
const fake = {
  async hgetall(key: string): Promise<Record<string, string>> {
    return Object.fromEntries(hashes.get(key) ?? []);
  },
  async hset(key: string, field: string, value: string): Promise<number> {
    const hash = hashOf(key);
    const created = hash.has(field) ? 0 : 1;
    hash.set(field, value);
    return created;
  },
  async hsetnx(key: string, field: string, value: string): Promise<number> {
    const hash = hashOf(key);
    if (hash.has(field)) return 0;
    hash.set(field, value);
    return 1;
  },
  async hincrbyfloat(key: string, field: string, increment: number): Promise<string> {
    const hash = hashOf(key);
    const next = Number(hash.get(field) ?? "0") + increment;
    hash.set(field, String(next));
    return String(next);
  },
  async hdel(key: string, ...fields: string[]): Promise<number> {
    const hash = hashes.get(key);
    return fields.filter((f) => hash?.delete(f)).length;
  },
  async expire(): Promise<number> {
    return 1;
  },
  async eval(script: string, numkeys: number, ...args: unknown[]): Promise<unknown> {
    return runFakeLedgerScript(fake, script, numkeys, args);
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

const near = (a: number | undefined, b: number) =>
  assert.ok(a !== undefined && Math.abs(a - b) < 1e-6, `${a} ≈ ${b}`);
const dim = { window: "5h", limit: 100 } as const;
const PCT = [{ unit: "percent", limit: 100 }] as const;

function twoKeyPool(conn: string, name: string, a: string, b: string) {
  return createPool({
    connectionId: conn,
    name,
    allocations: [
      { apiKeyId: a, weight: 50, policy: "hard" },
      { apiKeyId: b, weight: 50, policy: "hard" },
    ],
  });
}

// Shared fixture: pool a/b 50/50 on the SQLite store, book opened at 0, then 900k/100k recorded
// and the account at 60%.
const real = new SqliteQuotaStore();
const connAB = "conn-ab";
const poolAB = twoKeyPool(connAB, "ab", "ab-a", "ab-b");
const keyAB: LedgerKey = { poolId: poolAB.id, connectionId: connAB, window: "5h" };
const target = (apiKeyId: string) => ({ poolId: poolAB.id, connectionId: connAB, apiKeyId });
const attributeAB = (store: PercentAttributionStore, apiKeyIds?: string[]) =>
  attributePercentDimension({
    store,
    pool: poolAB,
    connectionId: connAB,
    provider: "claude",
    dimension: dim,
    apiKeyIds,
  });
usage(0);
await attributeAB(real);
await recordPercentTokens(real, target("ab-a"), [...PCT], { tokens: 900_000 });
await recordPercentTokens(real, target("ab-b"), [...PCT], { tokens: 100_000 });
usage(60);
await attributeAB(real);

const bound = (): PercentAttributionStore => ({
  ledgerRead: (k) => real.ledgerRead(k),
  ledgerCommit: (k, s) => real.ledgerCommit(k, s),
});

for (const [name, make] of [
  ["sqlite", () => new SqliteQuotaStore()],
  ["redis", redisWithFakeClient],
] as const) {
  test(`${name}: the growth since the window started is split by the tokens routed since then`, async () => {
    const store = make(),
      a = `${name}-a`,
      b = `${name}-b`,
      conn = `conn-${name}`;
    const pool = twoKeyPool(conn, name, a, b);
    const attribute = (apiKeyIds?: string[]) =>
      attributePercentDimension({
        store,
        pool,
        connectionId: conn,
        provider: "claude",
        dimension: dim,
        apiKeyIds,
      });
    usage(0);
    await attribute(); // opens the book
    await recordPercentTokens(
      store,
      { poolId: pool.id, connectionId: conn, apiKeyId: a },
      [...PCT],
      {
        tokens: 900_000,
      }
    );
    await recordPercentTokens(
      store,
      { poolId: pool.id, connectionId: conn, apiKeyId: b },
      [...PCT],
      {
        tokens: 100_000,
      }
    );
    usage(60);
    const att = await attribute();
    near(att.globalUsedPercent, 0.6);
    near(att.accountConsumed, 60);
    near(att.internal, 60);
    near(att.external, 0);
    near(att.consumedByKey[a], 54);
    near(att.consumedByKey[b], 6);
    near(att.internalByKey[a], 54); // no external part here
    near(att.internalByKey[b], 6);

    // Only b requested: its part comes from the book, whatever else is requested.
    const onlyB = await attribute([b]);
    assert.deepEqual(Object.keys(onlyB.consumedByKey), [b]);
    near(onlyB.consumedByKey[b], 6);
  });
}

test("one requested key costs one book read and no write when the reading repeats", async () => {
  const reads = { read: 0, commit: 0 };
  const counting: PercentAttributionStore = {
    ledgerRead: (k) => (reads.read++, real.ledgerRead(k)),
    ledgerCommit: (k, s) => (reads.commit++, real.ledgerCommit(k, s)),
  };
  usage(60);
  const att = await attributeAB(counting, ["ab-a"]);
  assert.deepEqual(reads, { read: 1, commit: 0 });
  assert.deepEqual(Object.keys(att.consumedByKey), ["ab-a"]);
  near(att.consumedByKey["ab-a"], 54);
});

test("a requested key outside the pool is neither charged nor reported", async () => {
  const att = await attributeAB(real, ["ab-a", "not-in-pool"]);
  assert.deepEqual(Object.keys(att.consumedByKey), ["ab-a"]);
  assert.deepEqual(Object.keys(att.internalByKey), ["ab-a"]);
});

test("a rejected book read attributes nothing and never throws", async () => {
  usage(60);
  const att = await attributeAB({ ...bound(), ledgerRead: boom });
  near(att.internal, 0);
  near(att.external, 0);
  near(att.externalCharged, 0);
  near(att.consumedByKey["ab-a"], 0);
  near(att.consumedByKey["ab-b"], 0);
  near(att.internalByKey["ab-a"], 0);
  near(att.globalUsedPercent, 0.6);
});

test("a rejected book write keeps the stored state", async () => {
  usage(70);
  const att = await attributeAB({ ...bound(), ledgerCommit: boom });
  near(att.globalUsedPercent, 0.7);
  near(att.consumedByKey["ab-a"], 54);
  near(att.consumedByKey["ab-b"], 6);
  assert.equal((await real.ledgerRead(keyAB)).state?.last, 0.6);
});

test("costs without usable tokens, and plans without a usable percent dimension, write nothing", async () => {
  for (const cost of [{}, { tokens: 0 }, { tokens: NaN }, { tokens: -5 }])
    await recordPercentTokens(real, target("ab-z"), [...PCT], cost);
  for (const dims of [
    [{ unit: "tokens", limit: 1000 }],
    [{ unit: "percent", limit: Number.EPSILON }],
  ] as const)
    await recordPercentTokens(real, target("ab-z"), [...dims], { tokens: 500 });
  assert.equal((await real.ledgerRead(keyAB)).counters["ab-z"], undefined);
  // A failing store is swallowed.
  await assert.doesNotReject(
    recordPercentTokens({ ledgerRecordTokens: boom }, target("ab-z"), [...PCT], { tokens: 500 })
  );
});

test("no plan-window reading: the book is not touched and the last state is used", async () => {
  failUsage();
  const att = await attributeAB(real);
  assert.deepEqual([att.globalUsedPercent, att.accountConsumed], [0, 0]);
  near(att.consumedByKey["ab-a"], 54);
  near(att.consumedByKey["ab-b"], 6);
  assert.equal((await real.ledgerRead(keyAB)).state?.last, 0.6);
});

test("no state and no reading: nothing is attributed", async () => {
  failUsage();
  const pool = twoKeyPool("conn-none", "none", "n-a", "n-b");
  const att = await attributePercentDimension({
    store: real,
    pool,
    connectionId: "conn-none",
    provider: "claude",
    dimension: dim,
  });
  assert.deepEqual([att.internal, att.external, att.consumedByKey["n-a"]], [0, 0, 0]);
  assert.equal(
    (await real.ledgerRead({ ...keyAB, poolId: pool.id, connectionId: "conn-none" })).state,
    null
  );
});

test("the floor comes from QUOTA_PERCENT_MIN_TOKENS_PER_POINT unless the caller gives one", async () => {
  const saved = process.env.QUOTA_PERCENT_MIN_TOKENS_PER_POINT;
  const withFloor = async (value: string | undefined, minTokensPerPct?: number) => {
    if (value === undefined) delete process.env.QUOTA_PERCENT_MIN_TOKENS_PER_POINT;
    else process.env.QUOTA_PERCENT_MIN_TOKENS_PER_POINT = value;
    return attributePercentDimension({
      store: real,
      pool: poolAB,
      connectionId: connAB,
      provider: "claude",
      dimension: dim,
      minTokensPerPct,
    });
  };
  try {
    usage(60); // the same figure as the stored book: nothing is written
    // 1_000_000 tokens / 50_000 / 100 = 0.2 of a 0.6 growth: a 18, b 2, external 40 split 20/20.
    let att = await withFloor("50000");
    near(att.internal, 20);
    near(att.external, 40);
    near(att.internalByKey["ab-a"], 18);
    near(att.internalByKey["ab-b"], 2);
    near(att.consumedByKey["ab-a"], 38);
    near(att.consumedByKey["ab-b"], 22);
    // Read on every call: back to the default (1_000_000 / 1000 / 100 = 10 ≥ 0.6, all internal).
    for (const value of [undefined, "", "0", "0.5", "-3", "abc", "Infinity", "NaN"]) {
      att = await withFloor(value);
      near(att.internalByKey["ab-a"], 54);
      near(att.external, 0);
    }
    // An explicit floor wins: 1_000_000 / 100_000 / 100 = 0.1 → a 9, b 1.
    att = await withFloor("50000", 100_000);
    near(att.internalByKey["ab-a"], 9);
    near(att.internalByKey["ab-b"], 1);
  } finally {
    if (saved === undefined) delete process.env.QUOTA_PERCENT_MIN_TOKENS_PER_POINT;
    else process.env.QUOTA_PERCENT_MIN_TOKENS_PER_POINT = saved;
  }
});
