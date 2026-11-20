/**
 * tests/unit/serial/quota-percent-external-usage.test.ts
 *
 * Percent plans: the account figure also moves with usage made outside the
 * proxy. Each account keeps an attribution book per plan window:
 *   - the figure already on the bar when the book opens is external;
 *   - a rise is charged to the keys whose tokens, recorded at most 15 minutes
 *     earlier, explain it (floor: 1000 tokens per percent point); the rest of
 *     the rise is external;
 *   - the external part first uses the capacity no allocation claims; only the
 *     excess is shared by weight.
 *
 * The absolute cap in percent is checked against the part the book attributes
 * to the key only: external usage never counts toward a key's cap.
 */

import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { PoolAllocation, QuotaPool } from "../../../src/lib/db/quotaPools.ts";
import type { EnforceDecision } from "../../../src/lib/quota/types.ts";

// ── Set DATA_DIR BEFORE any DB import (resolved as module-level constant) ───
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-percent-external-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const providerPlans = await import("../../../src/lib/db/providerPlans.ts");
const quotaPools = await import("../../../src/lib/db/quotaPools.ts");
const { enforceQuotaShare, recordConsumption } = await import("../../../src/lib/quota/enforce.ts");
const { decideFairShare } = await import("../../../src/lib/quota/fairShare.ts");
const { attributePercentDimension } = await import("../../../src/lib/quota/percentAttribution.ts");
const { SqliteQuotaStore } = await import("../../../src/lib/quota/sqliteQuotaStore.ts");
const sat = await import("../../../src/lib/quota/saturationSignals.ts");
const core = await import("../../../src/lib/db/core.ts");

test.after(() => {
  mock.restoreAll();
  mock.timers.reset();
  sat.__setAnthropicSaturationDepsForTests(null);
  sat._clearSaturationCache();
  sat._clearRateLimitHeaders();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const PROV = "claude";

type Usage = { fiveHour?: number; weekly?: number; reset?: number };

/** Usage read of each connection's windows, in percent; `reset` is the provider reset (epoch ms). */
function mockUsage(byConn: Record<string, Usage>) {
  sat._clearSaturationCache();
  sat.__setAnthropicSaturationDepsForTests({
    loadConnection: async (id: string) => ({ id, accessToken: "tok", authType: "oauth" }),
    fetchUsage: async (conn: Record<string, unknown>) => {
      const u = byConn[String(conn.id)] ?? {};
      const resetAt = u.reset !== undefined ? { resetAt: new Date(u.reset).toISOString() } : {};
      return {
        quotas: {
          ...(u.fiveHour !== undefined
            ? { "session (5h)": { used: u.fiveHour, total: 100, ...resetAt } }
            : {}),
          ...(u.weekly !== undefined
            ? { "weekly (7d)": { used: u.weekly, total: 100, ...resetAt } }
            : {}),
        },
      };
    },
  });
}

/** Every usage read fails: no plan-window reading; saturation falls back to the headers. */
function failUsage() {
  sat._clearSaturationCache();
  sat.__setAnthropicSaturationDepsForTests({
    loadConnection: async (id: string) => ({ id, accessToken: "tok", authType: "oauth" }),
    fetchUsage: async () => {
      throw new Error("usage endpoint down");
    },
  });
}

const hard = (ids: string[], weight: number): PoolAllocation[] =>
  ids.map((apiKeyId) => ({ apiKeyId, weight, policy: "hard" as const }));

const pools = new Map<string, { pool: QuotaPool; window: "5h" | "weekly" }>();

/** Manual one-dimension percent plan + a pool on that connection. */
function makePool(conn: string, window: "5h" | "weekly", allocations: PoolAllocation[]) {
  providerPlans.upsertPlan(conn, PROV, [{ unit: "percent", window, limit: 100 }], "manual");
  const pool = quotaPools.createPool({ connectionId: conn, name: conn, allocations });
  pools.set(conn, { pool, window });
  return pool;
}

/** The attribution the gate uses on this connection's pool (SQLite store, limit 100). */
function attribute(conn: string) {
  const entry = pools.get(conn);
  assert.ok(entry, `pool of ${conn}`);
  return attributePercentDimension({
    store: new SqliteQuotaStore(),
    pool: entry.pool,
    connectionId: conn,
    provider: PROV,
    dimension: { window: entry.window, limit: 100 },
  });
}

const burn = (conn: string, key: string, tokens: number) =>
  recordConsumption({
    apiKeyId: key,
    connectionId: conn,
    provider: PROV,
    cost: { tokens, usd: 0, requests: 1 },
  });

const ask = (conn: string, key: string) =>
  enforceQuotaShare({ apiKeyId: key, connectionId: conn, provider: PROV });

const reason = (d: EnforceDecision) => (d.kind === "block" ? d.reason : "");
const near = (a: number | undefined, b: number) =>
  assert.ok(a !== undefined && Math.abs(a - b) < 1e-6, `${a} ≈ ${b}`);

const K4 = ["k1", "k2", "k3", "k4"];
const KEYS5 = ["k1", "k2", "k3", "k4", "k5"];
const MIN = 60_000;
const H = 60 * MIN;

/** The stored book of this connection's pool (SQLite store). */
async function storedBook(conn: string) {
  const entry = pools.get(conn);
  assert.ok(entry, `pool of ${conn}`);
  const key = { poolId: entry.pool.id, connectionId: conn, window: entry.window };
  return (await new SqliteQuotaStore().ledgerRead(key)).state;
}

/** Usage read fails and the request headers say the account is 90% used. */
function failUsageWithHeaders(conn: string) {
  failUsage();
  sat.storeRateLimitHeaders(conn, "anthropic", {
    "anthropic-ratelimit-requests-limit": "100",
    "anthropic-ratelimit-requests-remaining": "10",
  });
}

await test("quota-percent-external-usage", async (t) => {
  await t.test("usage already on the bar when the book opens is nobody's", async () => {
    const C1 = "conn-ext-1";
    makePool(C1, "5h", hard(K4, 25));
    mockUsage({ [C1]: { fiveHour: 70 } });
    assert.equal((await ask(C1, "k1")).kind, "allow"); // opens: 70 external → 17.5 each
    await burn(C1, "k1", 70_000);
    mockUsage({ [C1]: { fiveHour: 70 } });
    assert.equal((await ask(C1, "k1")).kind, "allow");
    const flat = await attribute(C1);
    near(flat.internalByKey.k1, 0);
    near(flat.external, 70);
    mockUsage({ [C1]: { fiveHour: 71 } });
    near((await attribute(C1)).internalByKey.k1, 1); // only the rise is the key's
  });

  await t.test("one small request does not absorb a 20-point rise", async () => {
    const C2 = "conn-ext-2";
    makePool(C2, "5h", hard(KEYS5, 20));
    mockUsage({ [C2]: { fiveHour: 50 } });
    await ask(C2, "k1"); // opens the book at 50
    await burn(C2, "k3", 500);
    mockUsage({ [C2]: { fiveHour: 70 } });
    for (const k of KEYS5) assert.equal((await ask(C2, k)).kind, "allow"); // k3 = 0.5 + 13.9
    const att = await attribute(C2);
    near(att.internalByKey.k3, 0.5);
    near(att.external, 69.5);
  });

  await t.test("weights below 100 stay open under external usage", async () => {
    const C3 = "conn-ext-3";
    makePool(C3, "5h", hard(["k1", "k2", "k3"], 20));
    mockUsage({ [C3]: { fiveHour: 61 } });
    for (const k of ["k1", "k2", "k3"]) assert.equal((await ask(C3, k)).kind, "allow"); // 7 each
  });

  await t.test("real internal usage still blocks the heavy key", async () => {
    const C4 = "conn-ext-4";
    makePool(C4, "5h", hard(K4, 25));
    mockUsage({ [C4]: { fiveHour: 20 } });
    await ask(C4, "k1"); // opens the book at 20
    await burn(C4, "k1", 40_000);
    mockUsage({ [C4]: { fiveHour: 60 } });
    const d4 = await ask(C4, "k1");
    assert.equal(d4.kind, "block"); // 40 + 5 = 45 ≥ 25
    assert.match(reason(d4), /Quota share limit reached/);
    assert.equal((await ask(C4, "k2")).kind, "allow"); // 5
  });

  await t.test(
    "known limitation: outside usage in the same interval as real volume goes to the routing key",
    async () => {
      const C5 = "conn-ext-5";
      makePool(C5, "weekly", hard(K4, 25));
      mockUsage({ [C5]: { weekly: 0 } });
      await ask(C5, "k1"); // opens the book at 0
      await burn(C5, "k1", 60_000);
      mockUsage({ [C5]: { weekly: 60 } });
      assert.equal((await ask(C5, "k1")).kind, "block"); // 60 ≥ 25, even if part of the rise is external
    }
  );

  await t.test("a percent cap counts only the attributed part", async () => {
    const C6 = "conn-ext-6";
    makePool(C6, "5h", [
      { apiKeyId: "k1", weight: 50, policy: "hard", capValue: 10, capUnit: "percent" },
      { apiKeyId: "k2", weight: 50, policy: "hard" },
    ]);
    mockUsage({ [C6]: { fiveHour: 30 } });
    // The book opens at 30, all external: 15 of external charge each, 0 attributed to k1.
    assert.equal((await ask(C6, "k1")).kind, "allow");
    await burn(C6, "k1", 12_000);
    mockUsage({ [C6]: { fiveHour: 42 } });
    const d6 = await ask(C6, "k1");
    assert.equal(d6.kind, "block"); // 12 attributed ≥ 10
    assert.match(reason(d6), /Absolute quota cap reached/);
    assert.equal((await ask(C6, "k2")).kind, "allow");
  });

  await t.test(
    "the request path costs one book read per percent dimension and writes nothing when the reading repeats",
    async () => {
      const C7 = "conn-ext-7";
      makePool(C7, "5h", hard(K4, 25));
      mockUsage({ [C7]: { fiveHour: 60 } });
      await ask(C7, "k1"); // the book is open at 60
      const read = mock.method(SqliteQuotaStore.prototype, "ledgerRead");
      const commit = mock.method(SqliteQuotaStore.prototype, "ledgerCommit");
      const peek = mock.method(SqliteQuotaStore.prototype, "peek");
      const total = mock.method(SqliteQuotaStore.prototype, "poolConsumedTotal");
      try {
        mockUsage({ [C7]: { fiveHour: 60 } });
        await ask(C7, "k1");
        assert.deepEqual(
          [read, commit, peek, total].map((m) => m.mock.callCount()),
          [1, 0, 0, 0]
        );
      } finally {
        mock.restoreAll();
      }
    }
  );

  await t.test("decideFairShare checks the cap against capConsumedByThisKey when given", () => {
    const capDim = {
      key: { poolId: "p", unit: "percent" as const, window: "5h" as const },
      limit: 100,
      consumedTotal: 30,
      globalUsedPercent: 0.3,
    };
    const capAlloc = {
      weight: 50,
      policy: "hard" as const,
      capValue: 10,
      capUnit: "percent" as const,
    };
    const capBase = {
      dimensions: [capDim],
      allocation: capAlloc,
      consumedByThisKey: { "p:percent:5h": 15 },
      saturationThreshold: 0.5,
    };
    assert.equal(
      decideFairShare({ ...capBase, capConsumedByThisKey: { "p:percent:5h": 0 } }).kind,
      "allow"
    );
    assert.equal(decideFairShare(capBase).reason, "cap-absolute"); // without the field: current behavior
  });
  await t.test(
    "a failed usage read or a rate-limit-header value never reaches the book",
    async () => {
      mock.timers.enable({ apis: ["Date"], now: Date.now() });
      try {
        const C9 = "conn-ext-9";
        const t0 = Date.now();
        makePool(C9, "5h", hard(K4, 25));
        mockUsage({ [C9]: { fiveHour: 0 } });
        await ask(C9, "k1"); // opens the book at 0
        await burn(C9, "k1", 40_000);
        mockUsage({ [C9]: { fiveHour: 60 } });
        assert.equal((await ask(C9, "k1")).kind, "block"); // k1 = 40 + 5, external 20
        const stored = await storedBook(C9);

        // Three minutes later: a 0 that reached the book now would be a confirmed drop and turn it.
        mock.timers.setTime(t0 + 3 * MIN);
        failUsageWithHeaders(C9);
        try {
          const viaHeaders = await attribute(C9);
          near(viaHeaders.globalUsedPercent, 0.9);
          near(viaHeaders.internalByKey.k1, 40);
          near(viaHeaders.external, 20);
        } finally {
          sat._clearRateLimitHeaders();
        }
        sat._clearSaturationCache();
        assert.equal((await ask(C9, "k1")).kind, "allow"); // read failed → 0 → generous mode
        assert.deepEqual(await storedBook(C9), stored); // neither the 90% nor the 0 was applied
        mockUsage({ [C9]: { fiveHour: 60 } });
        assert.equal((await ask(C9, "k1")).kind, "block"); // the book survived the 0: still 45 ≥ 25
      } finally {
        mock.timers.reset();
      }
    }
  );

  await t.test(
    "a rise first seen more than 15 minutes after the tokens were recorded is external",
    async () => {
      mock.timers.enable({ apis: ["Date"], now: Date.now() });
      try {
        const C10 = "conn-ext-10";
        makePool(C10, "5h", hard(K4, 25));
        mockUsage({ [C10]: { fiveHour: 50 } });
        await ask(C10, "k1"); // opens the book at 50
        await burn(C10, "k1", 100_000);
        mock.timers.tick(16 * MIN);
        mockUsage({ [C10]: { fiveHour: 70 } });
        const att = await attribute(C10);
        near(att.internalByKey.k1, 0);
        near(att.external, 70);
      } finally {
        mock.timers.reset();
      }
    }
  );

  await t.test(
    "without a reading, a percent cap stops counting once the book's reset time has passed",
    async () => {
      mock.timers.enable({ apis: ["Date"], now: Date.now() });
      try {
        const C12 = "conn-ext-12";
        const R1 = Date.now() + H;
        makePool(C12, "5h", [
          { apiKeyId: "k1", weight: 50, policy: "hard", capValue: 10, capUnit: "percent" },
          { apiKeyId: "k2", weight: 50, policy: "hard" },
        ]);
        mockUsage({ [C12]: { fiveHour: 0, reset: R1 } });
        await ask(C12, "k1"); // opens the book at 0, reset at R1
        await burn(C12, "k1", 12_000);
        mockUsage({ [C12]: { fiveHour: 12, reset: R1 } });
        assert.match(reason(await ask(C12, "k1")), /Absolute quota cap reached/); // 12 ≥ 10
        const stored = await storedBook(C12);

        mock.timers.setTime(R1 - 10 * MIN);
        failUsage();
        // Still before the reset time: the book can be the current window's.
        assert.match(reason(await ask(C12, "k1")), /Absolute quota cap reached/);

        mock.timers.setTime(R1 + 3 * H);
        failUsage();
        // The window the book describes is over: nothing is charged without a reading.
        assert.equal((await ask(C12, "k1")).kind, "allow");
        assert.deepEqual(await storedBook(C12), stored);
      } finally {
        mock.timers.reset();
      }
    }
  );

  await t.test(
    "without a reading, a heavy key is not held to a book whose reset time has passed",
    async () => {
      mock.timers.enable({ apis: ["Date"], now: Date.now() });
      try {
        const C13 = "conn-ext-13";
        const R1 = Date.now() + H;
        makePool(C13, "5h", hard(K4, 25));
        mockUsage({ [C13]: { fiveHour: 0, reset: R1 } });
        await ask(C13, "k1"); // opens the book at 0, reset at R1
        await burn(C13, "k1", 40_000);
        mockUsage({ [C13]: { fiveHour: 60, reset: R1 } });
        assert.equal((await ask(C13, "k1")).kind, "block"); // 40 + 5 ≥ 25
        const stored = await storedBook(C13);

        mock.timers.setTime(R1 - 10 * MIN);
        failUsageWithHeaders(C13); // saturation 90% from the request headers
        assert.match(reason(await ask(C13, "k1")), /Quota share limit reached/);
        assert.equal((await ask(C13, "k2")).kind, "allow"); // 5

        mock.timers.setTime(R1 + 3 * H);
        failUsageWithHeaders(C13);
        assert.equal((await ask(C13, "k1")).kind, "allow");
        assert.equal((await ask(C13, "k2")).kind, "allow");
        assert.deepEqual(await storedBook(C13), stored);
      } finally {
        sat._clearRateLimitHeaders();
        mock.timers.reset();
      }
    }
  );

  await t.test(
    "without a reading, a book without a reset time is used for 15 minutes after its last reading",
    async () => {
      mock.timers.enable({ apis: ["Date"], now: Date.now() });
      try {
        const C14 = "conn-ext-14";
        const t0 = Date.now();
        makePool(C14, "5h", hard(K4, 25));
        mockUsage({ [C14]: { fiveHour: 0 } });
        await ask(C14, "k1"); // opens the book at 0, no reset time
        await burn(C14, "k1", 40_000);
        mockUsage({ [C14]: { fiveHour: 60 } });
        assert.equal((await ask(C14, "k1")).kind, "block"); // last reading at t0
        const stored = await storedBook(C14);

        mock.timers.setTime(t0 + 14 * MIN);
        failUsageWithHeaders(C14);
        assert.equal((await ask(C14, "k1")).kind, "block");

        mock.timers.setTime(t0 + 16 * MIN);
        failUsageWithHeaders(C14);
        assert.equal((await ask(C14, "k1")).kind, "allow");
        assert.deepEqual(await storedBook(C14), stored);
      } finally {
        sat._clearRateLimitHeaders();
        mock.timers.reset();
      }
    }
  );

  await t.test(
    "a percent cap in a pool of two accounts counts against the summed limit, per account",
    async () => {
      // Pool over [X, Y] with a manual plan of 100 on X: the effective limit is 200. The cap is
      // compared with the key's attributed part of the SERVING account's bar × 200, so a cap of
      // 10 is reached at 5 points of that account's bar (not at 2.5, not at 10), and each account
      // is checked against its own book.
      const X = "conn-ext-15x";
      const Y = "conn-ext-15y";
      providerPlans.upsertPlan(X, PROV, [{ unit: "percent", window: "5h", limit: 100 }], "manual");
      quotaPools.createPool({
        connectionId: X,
        connectionIds: [X, Y],
        name: X,
        allocations: [
          { apiKeyId: "k1", weight: 50, policy: "hard", capValue: 10, capUnit: "percent" },
          { apiKeyId: "k2", weight: 50, policy: "hard" },
        ],
      });
      const bar: Record<string, number> = { [X]: 0, [Y]: 0 };
      const setBars = () => mockUsage({ [X]: { fiveHour: bar[X] }, [Y]: { fiveHour: bar[Y] } });
      /** k1 routes 5k tokens on `conn` (enough for 5 points), the bar moves to `pct`, then k1 asks. */
      const step = async (conn: string, pct: number) => {
        await burn(conn, "k1", 5_000);
        bar[conn] = pct;
        setBars();
        return ask(conn, "k1");
      };
      setBars();
      await ask(X, "k1"); // opens the book of X at 0
      await ask(Y, "k1"); // opens the book of Y at 0

      assert.equal((await step(X, 2.5)).kind, "allow"); // 2.5 points × 2 = 5 < 10 (half the cap)
      assert.equal((await step(X, 4.9)).kind, "allow"); // 9.8 < 10
      assert.match(reason(await step(X, 5.1)), /Absolute quota cap reached/); // 10.2 ≥ 10
      // Account Y keeps its own book: the same key starts from 0 there and stops at 5 points too.
      assert.equal((await step(Y, 4.9)).kind, "allow");
      assert.match(reason(await step(Y, 5.1)), /Absolute quota cap reached/);
    }
  );

  await t.test("a failing store never blocks and never throws", async () => {
    const C11 = "conn-ext-11";
    makePool(C11, "5h", hard(K4, 25));
    mockUsage({ [C11]: { fiveHour: 0 } });
    await ask(C11, "k1"); // opens the book at 0
    await burn(C11, "k1", 40_000);
    mockUsage({ [C11]: { fiveHour: 60 } });
    assert.equal((await ask(C11, "k1")).kind, "block"); // with a working store: 45 ≥ 25
    const fail = async (): Promise<never> => {
      throw new Error("store down");
    };
    mock.method(SqliteQuotaStore.prototype, "ledgerRead", fail);
    mock.method(SqliteQuotaStore.prototype, "ledgerCommit", fail);
    mock.method(SqliteQuotaStore.prototype, "ledgerRecordTokens", fail);
    try {
      mockUsage({ [C11]: { fiveHour: 70 } });
      assert.equal((await ask(C11, "k1")).kind, "allow");
      await assert.doesNotReject(burn(C11, "k1", 1_000));
    } finally {
      mock.restoreAll();
    }
  });
});
