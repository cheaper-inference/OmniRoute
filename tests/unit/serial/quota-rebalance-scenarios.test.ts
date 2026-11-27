/**
 * tests/unit/serial/quota-rebalance-scenarios.test.ts
 *
 * Characterization of how a percent-plan pool behaves when its shares change:
 *   1. Rebalancing mid-window is retroactive: the new weights apply to the
 *      parts already attributed in the window.
 *   2. Integer weights that do not sum to 100 strand the remainder; all-zero
 *      weights are normalized to an equal split that sums to 100.
 *   3. Usage made before the pool existed is on the bar when the book opens,
 *      so it is external and split by weight; a full account bar still blocks
 *      as saturated.
 *   4. A key removed mid-window keeps its attributed part until the provider
 *      window turns; nobody else is charged for it.
 */

import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { PoolAllocation, QuotaPool } from "../../../src/lib/db/quotaPools.ts";
import type { EnforceDecision } from "../../../src/lib/quota/types.ts";

// ── Set DATA_DIR BEFORE any DB import (resolved as module-level constant) ───
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-rebalance-"));
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
  mock.timers.reset();
  sat.__setAnthropicSaturationDepsForTests(null);
  sat._clearSaturationCache();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const PROV = "claude";

function mockUsage(byConn: Record<string, { fiveHour?: number; weekly?: number }>) {
  sat._clearSaturationCache();
  sat.__setAnthropicSaturationDepsForTests({
    loadConnection: async (id: string) => ({ id, accessToken: "tok", authType: "oauth" }),
    fetchUsage: async (conn: Record<string, unknown>) => {
      const u = byConn[String(conn.id)] ?? {};
      return {
        quotas: {
          ...(u.fiveHour !== undefined ? { "session (5h)": { used: u.fiveHour, total: 100 } } : {}),
          ...(u.weekly !== undefined ? { "weekly (7d)": { used: u.weekly, total: 100 } } : {}),
        },
      };
    },
  });
}

const hard = (ids: string[], weight: number): PoolAllocation[] =>
  ids.map((apiKeyId) => ({ apiKeyId, weight, policy: "hard" as const }));

/** Manual one-dimension percent plan + a pool on that connection. */
function makePool(conn: string, window: "5h" | "weekly", allocations: PoolAllocation[]) {
  providerPlans.upsertPlan(conn, PROV, [{ unit: "percent", window, limit: 100 }], "manual");
  return quotaPools.createPool({ connectionId: conn, name: conn, allocations });
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

/** The attribution the gate uses on this pool's connection (SQLite store, 5h, limit 100). */
function attribute(conn: string, poolId: string) {
  const pool: QuotaPool | null = quotaPools.getPool(poolId);
  assert.ok(pool, `pool ${poolId}`);
  return attributePercentDimension({
    store: new SqliteQuotaStore(),
    pool,
    connectionId: conn,
    provider: PROV,
    dimension: { window: "5h", limit: 100 },
  });
}

await test("quota-rebalance-scenarios", async (t) => {
  await t.test("rebalancing mid-window is retroactive", async () => {
    const S1 = "conn-rebalance-1";
    const pool = makePool(S1, "5h", [
      { apiKeyId: "a", weight: 50, policy: "hard" },
      { apiKeyId: "b", weight: 25, policy: "hard" },
      { apiKeyId: "c", weight: 25, policy: "hard" },
    ]);
    mockUsage({ [S1]: { fiveHour: 0 } });
    await ask(S1, "a"); // opens the book at 0
    await burn(S1, "a", 700_000);
    await burn(S1, "b", 200_000);
    await burn(S1, "c", 100_000);
    mockUsage({ [S1]: { fiveHour: 60 } });

    assert.equal((await ask(S1, "a")).kind, "allow"); // 42 < 50
    quotaPools.upsertAllocations(pool.id, hard(["a", "b", "c", "d"], 25));
    assert.equal((await ask(S1, "a")).kind, "block"); // 42 ≥ 25
    assert.equal((await ask(S1, "b")).kind, "allow"); // 12 < 25
  });

  await t.test("integer weights that do not sum to 100 strand the remainder", () => {
    const base = {
      dimensions: [
        {
          key: { poolId: "p", unit: "percent" as const, window: "5h" as const },
          limit: 100,
          consumedTotal: 99,
          globalUsedPercent: 0.99,
        },
      ],
      consumedByThisKey: { "p:percent:5h": 33 },
      saturationThreshold: 0.5,
    };
    const at33 = decideFairShare({ ...base, allocation: { weight: 33, policy: "hard" } });
    assert.deepEqual([at33.kind, at33.reason], ["block", "fair-share"]);
    assert.equal(
      decideFairShare({ ...base, allocation: { weight: 34, policy: "hard" } }).kind,
      "allow"
    );

    // All-zero weights are normalized to an equal split that sums to 100.
    const zeroPool = quotaPools.createPool({
      connectionId: "conn-rebalance-zero",
      name: "conn-rebalance-zero",
      groupId: "group-rebalance-zero",
    });
    quotaPools.upsertAllocations(zeroPool.id, hard(["z1", "z2", "z3"], 0));
    const weights = (quotaPools.getPool(zeroPool.id)?.allocations ?? []).map((a) => a.weight);
    assert.equal(weights.length, 3);
    for (const w of weights) assert.ok(Math.abs(w - 100 / 3) < 1e-9, `weight ${w}`);
    const sum = weights.reduce((s, w) => s + w, 0);
    assert.ok(Math.abs(sum - 100) < 1e-9, `sum ${sum}`);
  });

  await t.test("usage from before the pool existed is split by weight", async () => {
    const S3 = "conn-rebalance-3";
    makePool(S3, "5h", hard(["a", "b"], 50));
    mockUsage({ [S3]: { fiveHour: 80 } });
    for (const k of ["a", "b"]) assert.equal((await ask(S3, k)).kind, "allow"); // 40 < 50 (external)
    mockUsage({ [S3]: { fiveHour: 100 } });
    const full = await ask(S3, "a");
    assert.equal(full.kind, "block");
    assert.match(reason(full), /saturated/i);
  });

  await t.test("a key removed mid-window keeps its part and nobody else pays for it", async () => {
    mock.timers.enable({ apis: ["Date"], now: Date.now() });
    try {
      const S4 = "conn-rebalance-4";
      const pool = makePool(S4, "5h", [
        { apiKeyId: "a", weight: 40, policy: "hard" },
        { apiKeyId: "b", weight: 30, policy: "hard" },
        { apiKeyId: "c", weight: 30, policy: "hard" },
      ]);
      mockUsage({ [S4]: { fiveHour: 0 } });
      await ask(S4, "a"); // opens the book at 0
      await burn(S4, "a", 420_000);
      await burn(S4, "b", 120_000);
      await burn(S4, "c", 60_000);
      mockUsage({ [S4]: { fiveHour: 60 } });
      quotaPools.upsertAllocations(pool.id, [
        { apiKeyId: "b", weight: 30, policy: "hard" },
        { apiKeyId: "c", weight: 30, policy: "hard" },
      ]);
      let att = await attribute(S4, pool.id);
      near(att.internal, 60); // a's 42 stays in the book
      assert.deepEqual(Object.keys(att.consumedByKey).sort(), ["b", "c"]);
      near(att.consumedByKey.b, 12);
      near(att.consumedByKey.c, 6);
      assert.equal((await ask(S4, "b")).kind, "allow");

      mock.timers.tick(3 * 60_000);
      mockUsage({ [S4]: { fiveHour: 5 } });
      att = await attribute(S4, pool.id); // the window turned and the removed key's part is gone
      near(att.internal, 0);
      near(att.external, 5);
    } finally {
      mock.timers.reset();
    }
  });
});
