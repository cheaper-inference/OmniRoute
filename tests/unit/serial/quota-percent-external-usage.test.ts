/**
 * tests/unit/serial/quota-percent-external-usage.test.ts
 *
 * Percent plans: the account bar also moves with usage made outside the proxy.
 * The quota-share gate splits the account consumption in two:
 *   - internal: the part the routed tokens can explain (floor: 1000 tokens per
 *     percent point), shared by token volume;
 *   - external: the rest. It first uses the capacity no allocation claims;
 *     only the excess is shared by weight.
 *
 * The absolute cap in percent is checked against the key's own internal part
 * only: external usage never counts toward a key's cap.
 */

import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { PoolAllocation } from "../../../src/lib/db/quotaPools.ts";
import type { EnforceDecision } from "../../../src/lib/quota/types.ts";

// ── Set DATA_DIR BEFORE any DB import (resolved as module-level constant) ───
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-percent-external-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const providerPlans = await import("../../../src/lib/db/providerPlans.ts");
const quotaPools = await import("../../../src/lib/db/quotaPools.ts");
const { enforceQuotaShare, recordConsumption } = await import("../../../src/lib/quota/enforce.ts");
const { decideFairShare } = await import("../../../src/lib/quota/fairShare.ts");
const { SqliteQuotaStore } = await import("../../../src/lib/quota/sqliteQuotaStore.ts");
const sat = await import("../../../src/lib/quota/saturationSignals.ts");
const core = await import("../../../src/lib/db/core.ts");

test.after(() => {
  mock.restoreAll();
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

const K4 = ["k1", "k2", "k3", "k4"];

await test("quota-percent-external-usage", async (t) => {
  await t.test("first caller of the window is not charged the whole account bar", async () => {
    const C1 = "conn-ext-1";
    makePool(C1, "weekly", hard(K4, 25));
    mockUsage({ [C1]: { weekly: 60 } });
    await burn(C1, "k1", 31);
    for (const k of K4) assert.equal((await ask(C1, k)).kind, "allow"); // k1 = 15.02
  });

  await t.test("only one key called in the window", async () => {
    const C2 = "conn-ext-2";
    const keys = ["k1", "k2", "k3", "k4", "k5"];
    makePool(C2, "5h", hard(keys, 20));
    mockUsage({ [C2]: { fiveHour: 80 } });
    await burn(C2, "k3", 500);
    for (const k of keys) assert.equal((await ask(C2, k)).kind, "allow"); // k3 = 16.4
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
    mockUsage({ [C4]: { fiveHour: 60 } });
    await burn(C4, "k1", 40_000);
    const d4 = await ask(C4, "k1");
    assert.equal(d4.kind, "block"); // 40 + 5 = 45 ≥ 25
    assert.match(reason(d4), /Quota share limit reached/);
    assert.equal((await ask(C4, "k2")).kind, "allow"); // 5
  });

  await t.test(
    "known limitation: volume at or above the floor is treated as internal",
    async () => {
      const C5 = "conn-ext-5";
      makePool(C5, "weekly", hard(K4, 25));
      mockUsage({ [C5]: { weekly: 60 } });
      await burn(C5, "k1", 60_000);
      assert.equal((await ask(C5, "k1")).kind, "block"); // 60 ≥ 25, even if the bar is external
    }
  );

  await t.test("a percent cap counts the key's own routed usage, not external usage", async () => {
    const C6 = "conn-ext-6";
    makePool(C6, "5h", [
      { apiKeyId: "k1", weight: 50, policy: "hard", capValue: 10, capUnit: "percent" },
      { apiKeyId: "k2", weight: 50, policy: "hard" },
    ]);
    mockUsage({ [C6]: { fiveHour: 30 } });
    // No routed tokens: internal 0; the 15 of external charge do not count toward the cap.
    assert.equal((await ask(C6, "k1")).kind, "allow");
    await burn(C6, "k1", 12_000); // internal = min(30, 12) = 12, all of it k1's
    const d6 = await ask(C6, "k1");
    assert.equal(d6.kind, "block"); // 12 ≥ 10
    assert.match(reason(d6), /Absolute quota cap reached/);
    assert.equal((await ask(C6, "k2")).kind, "allow");
  });

  await t.test("enforcement reads the store twice per percent dimension", async () => {
    const C7 = "conn-ext-7";
    makePool(C7, "5h", hard(K4, 25));
    mockUsage({ [C7]: { fiveHour: 60 } });
    await burn(C7, "k1", 1_000);
    const peek = mock.method(SqliteQuotaStore.prototype, "peek");
    const total = mock.method(SqliteQuotaStore.prototype, "poolConsumedTotal");
    try {
      await ask(C7, "k1");
      assert.deepEqual([peek.mock.callCount(), total.mock.callCount()], [1, 1]);
    } finally {
      mock.restoreAll();
    }
  });

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
});
