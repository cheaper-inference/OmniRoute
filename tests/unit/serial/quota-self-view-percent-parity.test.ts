/**
 * tests/unit/serial/quota-self-view-percent-parity.test.ts
 *
 * The self-service view reports, for percent windows, the key's share the quota gate would
 * attribute from the same book and reading, and looking at it changes nothing: no book is
 * opened or rewritten and the provider is not called.
 *
 * Scenario (as in quota-percent-snapshot-parity.test.ts): 5h window, manual plan of 100 on the
 * primary connection X, a pool "parity" over [X, Y], two hard keys at 50/50. Each account has its
 * own book, opened at 0. On X key a routed 900k tokens and key b 100k; on Y only key b routed,
 * 300k. Both accounts then at 60%. A second pool "fresh" over Z is never asked: it has no book.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { PoolAllocation } from "../../../src/lib/db/quotaPools.ts";
import type { ProviderPlan } from "../../../src/lib/quota/dimensions.ts";
import type { SelfQuotaResponse, SelfQuotaShare } from "../../../src/shared/schemas/selfQuota.ts";
import { BOTH, TEST_POOL_REF_SECRET, input } from "../fixtures/quotaSelfView.ts";

// ── Set DATA_DIR BEFORE any DB import (resolved as module-level constant) ───
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-self-view-percent-"));
process.env.DATA_DIR = TEST_DATA_DIR;
// The floor is read from the environment on every call: a value in the shell must not change
// the arithmetic below.
const savedFloor = process.env.QUOTA_PERCENT_MIN_TOKENS_PER_POINT;
delete process.env.QUOTA_PERCENT_MIN_TOKENS_PER_POINT;

const providerPlans = await import("../../../src/lib/db/providerPlans.ts");
const quotaPools = await import("../../../src/lib/db/quotaPools.ts");
const { enforceQuotaShare, recordConsumption } = await import("../../../src/lib/quota/enforce.ts");
const { SqliteQuotaStore } = await import("../../../src/lib/quota/sqliteQuotaStore.ts");
const { attributePercentDimension } = await import("../../../src/lib/quota/percentAttribution.ts");
const { buildQuotaSelfView } = await import("../../../src/lib/quota/selfView.ts");
const sat = await import("../../../src/lib/quota/saturationSignals.ts");
const core = await import("../../../src/lib/db/core.ts");

test.after(() => {
  sat.__setAnthropicSaturationDepsForTests(null);
  sat._clearSaturationCache();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (savedFloor === undefined) delete process.env.QUOTA_PERCENT_MIN_TOKENS_PER_POINT;
  else process.env.QUOTA_PERCENT_MIN_TOKENS_PER_POINT = savedFloor;
});

const PROV = "claude";
let fetches = 0;

function mockUsage(byConn: Record<string, { fiveHour?: number; weekly?: number }>) {
  sat._clearSaturationCache();
  sat.__setAnthropicSaturationDepsForTests({
    loadConnection: async (id: string) => ({ id, accessToken: "tok", authType: "oauth" }),
    fetchUsage: async (conn: Record<string, unknown>) => {
      fetches += 1;
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

const burn = (conn: string, key: string, tokens: number) =>
  recordConsumption({
    apiKeyId: key,
    connectionId: conn,
    provider: PROV,
    cost: { tokens, usd: 0, requests: 1 },
  });

const ask = (conn: string, key: string) =>
  enforceQuotaShare({ apiKeyId: key, connectionId: conn, provider: PROV });

const kind = async (conn: string, key: string) => (await ask(conn, key)).kind;

const near = (a: number | null | undefined, b: number) =>
  assert.ok(typeof a === "number" && Math.abs(a - b) < 1e-6, `${a} ≈ ${b}`);

const PLAN_DIMENSIONS = [{ unit: "percent" as const, window: "5h" as const, limit: 100 }];

/** The real view over the real store; only the account, schedule, cap and model sources are stubs. */
function selfView(apiKeyId: string): Promise<SelfQuotaResponse> {
  return buildQuotaSelfView(input({ apiKeyId, scopes: BOTH, provider: PROV }), {
    secret: TEST_POOL_REF_SECRET,
    getQuotaStore: async () => new SqliteQuotaStore(),
    resolveConnectionProvider: async () => PROV,
    resolvePlan: (connectionId, provider) =>
      ({ connectionId, provider, dimensions: PLAN_DIMENSIONS, source: "manual" }) as ProviderPlan,
    resolveAccountQuotaEntries: async () => [],
    listEnabledSchedules: () => [],
    listModelCapsForApiKey: () => [],
    listQuotaKeyModels: async () => [],
    resolvePublicApiBaseUrl: () => null,
  });
}

function sharesOf(v: SelfQuotaResponse, poolName: string): SelfQuotaShare[] {
  const found = v.pools.find((p) => p.name === poolName);
  assert.ok(found, poolName);
  return found.accounts.map((account) => account.dimensions[0].yourShare);
}

// ── Scenario setup (all top-level awaits stay above the first test()) ───────
const X = "conn-self-parity-x";
const Y = "conn-self-parity-y";
const Z = "conn-self-parity-z";
providerPlans.upsertPlan(X, PROV, PLAN_DIMENSIONS, "manual");
providerPlans.upsertPlan(Z, PROV, PLAN_DIMENSIONS, "manual");
const pool = quotaPools.createPool({
  connectionId: X,
  connectionIds: [X, Y],
  name: "parity",
  allocations: hard(["a", "b"], 50),
});
const fresh = quotaPools.createPool({
  connectionId: Z,
  connectionIds: [Z],
  name: "fresh",
  allocations: hard(["a", "b"], 50),
});
mockUsage({ [X]: { fiveHour: 0 }, [Y]: { fiveHour: 0 } });
await ask(X, "a"); // opens the book of account X at 0
await ask(Y, "a"); // opens the book of account Y at 0
await burn(X, "a", 900_000);
await burn(X, "b", 100_000);
await burn(Y, "b", 300_000);
mockUsage({ [X]: { fiveHour: 60 }, [Y]: { fiveHour: 60 }, [Z]: { fiveHour: 30 } });

test("opening the view writes no book and calls no provider", async () => {
  const store = new SqliteQuotaStore();
  const keyX = { poolId: pool.id, connectionId: X, window: "5h" as const };
  const keyY = { poolId: pool.id, connectionId: Y, window: "5h" as const };
  const before = [await store.ledgerRead(keyX), await store.ledgerRead(keyY)];
  assert.ok(before[0].state && before[1].state, "the gate opened both books");
  const fetchesBefore = fetches;
  const v = await selfView("a"); // cache is cold: mockUsage cleared it
  assert.equal(fetches, fetchesBefore);
  assert.deepEqual([await store.ledgerRead(keyX), await store.ledgerRead(keyY)], before);
  const [s] = sharesOf(v, "parity");
  assert.equal(s.status, "stale");
  near(s.consumed, 0); // the book the gate last wrote: open at 0
});

test("after the gate reads the account, the view shows the gate's number for each account", async () => {
  await ask(X, "a");
  await ask(Y, "a");
  const a = await selfView("a");
  const b = await selfView("b");
  const [ax, ay] = sharesOf(a, "parity");
  const [bx, by] = sharesOf(b, "parity");
  assert.deepEqual([ax.status, ay.status], ["ok", "ok"]);
  near(ax.consumed, 54);
  near(ay.consumed, 0);
  near(bx.consumed, 6);
  near(by.consumed, 60);
  assert.equal(ax.fairShare, 50);
  // Same proportion as the gate, which scales both sides by the two accounts.
  const gate = await attributePercentDimension({
    store: new SqliteQuotaStore(),
    pool,
    connectionId: X,
    provider: PROV,
    dimension: { window: "5h", limit: 200 },
  });
  near(gate.consumedByKey.a / 100, (ax.consumed ?? NaN) / ax.fairShare);
  assert.deepEqual([await kind(X, "a"), await kind(Y, "a")], ["block", "allow"]);
});

test("a pool nobody routed through stays without a book after a view", async () => {
  const v = await selfView("a");
  const [z] = sharesOf(v, "fresh");
  assert.deepEqual(
    [z.status, z.reason, z.consumed],
    ["unavailable", "percent_attribution_unavailable", null]
  );
  const book = await new SqliteQuotaStore().ledgerRead({
    poolId: fresh.id,
    connectionId: Z,
    window: "5h",
  });
  assert.equal(book.state, null);
});

test("with a baseline above zero and use outside the pool, the view splits as the gate does", async () => {
  const W = "conn-self-parity-w";
  providerPlans.upsertPlan(W, PROV, PLAN_DIMENSIONS, "manual");
  const outside = quotaPools.createPool({
    connectionId: W,
    connectionIds: [W],
    name: "outside",
    allocations: hard(["a", "b"], 50),
  });
  mockUsage({ [W]: { fiveHour: 20 } });
  await ask(W, "a"); // opens the book of account W at 20%: that part is the baseline
  await burn(W, "a", 10_000); // explains at most 10 points
  mockUsage({ [W]: { fiveHour: 60 } }); // 40 points of growth: the rest came from outside
  await ask(W, "a");
  const [s] = sharesOf(await selfView("a"), "outside");
  const gate = await attributePercentDimension({
    store: new SqliteQuotaStore(),
    pool: outside,
    connectionId: W,
    provider: PROV,
    dimension: { window: "5h", limit: 100 },
  });
  assert.equal(s.status, "ok");
  assert.ok(gate.externalCharged > 0, "use outside the pool is charged");
  assert.equal(s.consumed, gate.consumedByKey.a);
  assert.equal(s.attributed, gate.internalByKey.a);
  assert.equal(s.external, gate.externalByKey.a);
  near(s.attributed, 10);
  near(s.external, 25);
  near(s.consumed, 35);
});
