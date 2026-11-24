import test from "node:test";
import assert from "node:assert/strict";

import { buildQuotaSelfView } from "../../src/lib/quota/selfView.ts";
import { selfQuotaResponseSchema } from "../../src/shared/schemas/selfQuota.ts";
import type { QuotaSchedule } from "../../src/lib/quota/schedules.ts";
import { BOTH, alloc, input, makeDeps } from "./fixtures/quotaSelfView.ts";

/** Open every day, all day (UTC), with a token budget: its state never depends on the clock. */
const BUDGET_SCHEDULE: QuotaSchedule = {
  id: "s-budget",
  poolId: "pool-a-id",
  days: [0, 1, 2, 3, 4, 5, 6],
  startMinute: 0,
  endMinute: 1440,
  timezone: "UTC",
  mode: "allow",
  reserves: [],
  budgetValue: 5,
  budgetUnit: "tokens",
  budgetWindow: "daily",
  priority: 0,
  enabled: true,
};

test("returns every pool of the provider the key is allocated in, under either provider name", async () => {
  const view = await buildQuotaSelfView(input(), makeDeps());
  assert.deepEqual(
    view.pools.map((p) => p.name),
    ["Pool A", "Pool B"]
  );
  assert.equal(new Set(view.pools.map((p) => p.ref)).size, 2);
  assert.ok(view.pools.every((p) => p.borrowMode === "saturation" && p.provider === "claude"));
  assert.equal(
    (await buildQuotaSelfView(input({ provider: "anthropic" }), makeDeps())).pools.length,
    2
  );
});

test("a pool of another provider is left out even when the key is allocated in it", async () => {
  const deps = makeDeps({ pool: { allocations: [alloc("key-a", 50), alloc("key-b", 50)] } });
  assert.deepEqual(
    (await buildQuotaSelfView(input(), deps)).pools.map((p) => p.name),
    ["Pool A", "Pool B"]
  );
  const codex = await buildQuotaSelfView(input({ provider: "codex" }), deps);
  assert.deepEqual(
    codex.pools.map((p) => [p.name, p.provider]),
    [["Pool C", "codex"]]
  );
  assert.equal(codex.provider, "codex");
});

test("the allocation comes from the pool as read, and a pool the key left is skipped", async () => {
  const base = makeDeps();
  const deps = {
    ...base,
    // An older allocation list: the key's weight there is 10 and it is still in Pool B.
    listAllocationsForApiKey: (apiKeyId: string) =>
      base.listAllocationsForApiKey!(apiKeyId).map((entry) => ({
        ...entry,
        allocation: { ...entry.allocation, weight: 10, policy: "soft" as const },
      })),
    getPool: (poolId: string) => {
      const pool = base.getPool!(poolId);
      if (!pool || pool.name !== "Pool B") return pool;
      return { ...pool, allocations: pool.allocations.filter((a) => a.apiKeyId !== "key-a") };
    },
  };
  const view = await buildQuotaSelfView(input(), deps);
  assert.deepEqual(
    view.pools.map((p) => [p.name, p.weight, p.policy]),
    [["Pool A", 50, "hard"]]
  );
});

test("a countable window uses the pool bucket and the gate's limit (plan limit x accounts)", async () => {
  const deps = makeDeps({
    pool: {
      connectionIds: ["conn-secret-1", "conn-secret-2"],
      allocations: [alloc("key-a", 25), alloc("key-b", 75)],
    },
  });
  const [dim] = (await buildQuotaSelfView(input({ scopes: BOTH }), deps)).pools[0].dimensions;
  assert.equal(dim.limit, 2000);
  assert.deepEqual(dim.yourShare, { fairShare: 500, consumed: 120, remaining: 380, status: "ok" });
  assert.deepEqual(dim.total, { used: 400, status: "ok" });
});

test("the pool total is hidden without self:account-quota or when the provider is not shared", async () => {
  const noScope = (await buildQuotaSelfView(input(), makeDeps())).pools[0];
  assert.equal(noScope.accountVisible, false);
  assert.equal("total" in noScope.dimensions[0], false);
  const notShared = (
    await buildQuotaSelfView(input({ scopes: BOTH, sharedQuotaProviders: ["codex"] }), makeDeps())
  ).pools[0];
  assert.equal("total" in notShared.dimensions[0], false);
});

test("both scopes with an empty sharing list see no account-level field", async () => {
  const [pool] = (
    await buildQuotaSelfView(input({ scopes: BOTH, sharedQuotaProviders: [] }), makeDeps())
  ).pools;
  assert.deepEqual([pool.accountVisible, "total" in pool.dimensions[0]], [false, false]);
  assert.equal("modelWindows" in pool.accounts[0], false);
});

test("both scopes with the pool's provider in the sharing list see the account-level fields", async () => {
  const [pool] = (
    await buildQuotaSelfView(input({ scopes: BOTH, sharedQuotaProviders: ["claude"] }), makeDeps())
  ).pools;
  assert.deepEqual([pool.accountVisible, "total" in pool.dimensions[0]], [true, true]);
  assert.equal("modelWindows" in pool.accounts[0], true);
});

test("a failed store read is unavailable, never zero", async () => {
  const deps = makeDeps({
    store: {
      peek: async () => {
        throw new Error("redis down");
      },
    },
  });
  assert.deepEqual((await buildQuotaSelfView(input(), deps)).pools[0].dimensions[0].yourShare, {
    fairShare: 500,
    consumed: null,
    remaining: null,
    status: "unavailable",
    reason: "store_unavailable",
  });
});

test("a non-finite store read is unavailable, never a number", async () => {
  const deps = makeDeps({ store: { peek: async () => Number.NaN } });
  assert.deepEqual((await buildQuotaSelfView(input(), deps)).pools[0].dimensions[0].yourShare, {
    fairShare: 500,
    consumed: null,
    remaining: null,
    status: "unavailable",
    reason: "store_unavailable",
  });
});

test("with every provider shared (null) and both scopes, the pool total is visible", async () => {
  const view = await buildQuotaSelfView(
    input({ scopes: BOTH, sharedQuotaProviders: null }),
    makeDeps()
  );
  assert.equal(view.pools[0].accountVisible, true);
  assert.deepEqual(view.pools[0].dimensions[0].total, { used: 400, status: "ok" });
});

test("a failed pool total or store load is unavailable too", async () => {
  const unavailable = { used: null, status: "unavailable", reason: "store_unavailable" };
  const failedTotal = makeDeps({
    store: {
      poolConsumedTotal: async () => {
        throw new Error("redis down");
      },
    },
  });
  const [dim] = (await buildQuotaSelfView(input({ scopes: BOTH }), failedTotal)).pools[0]
    .dimensions;
  assert.deepEqual(dim.total, unavailable);
  assert.equal(dim.yourShare.status, "ok");
  // Pool A also carries an open schedule with a budget and a model cap: both read the same
  // (failed) store load, so their store-backed fields must be unknown, never false or 0.
  const noStore = makeDeps({
    getQuotaStore: async () => {
      throw new Error("store init failed");
    },
    listEnabledSchedules: (poolId) => (poolId === "pool-a-id" ? [BUDGET_SCHEDULE] : []),
    listModelCapsForApiKey: (poolId, apiKeyId) =>
      poolId === "pool-a-id"
        ? [{ poolId, apiKeyId, model: "claude-fable-5", capValue: 50, capUnit: "requests" }]
        : [],
  });
  const view = await buildQuotaSelfView(input({ scopes: BOTH }), noStore);
  const [lost] = view.pools[0].dimensions;
  assert.deepEqual(lost.total, unavailable);
  assert.deepEqual(
    [lost.yourShare.consumed, lost.yourShare.remaining, lost.yourShare.status],
    [null, null, "unavailable"]
  );
  assert.deepEqual(
    view.blocks.schedules.map((s) => [s.state, s.budget]),
    [["open", { unit: "tokens", window: "daily", exhausted: null }]]
  );
  assert.deepEqual(
    view.blocks.modelCaps.map((c) => [c.model, c.consumed, c.reached]),
    [["claude-fable-5", null, null]]
  );
});

test("needs the pool-ref secret as an input", async () => {
  await assert.rejects(
    buildQuotaSelfView(input(), makeDeps({ secret: undefined })),
    /missing_pool_ref_secret/
  );
});

test("all-zero weights split equally, as the gate does", async () => {
  const deps = makeDeps({
    pool: { allocations: ["key-a", "key-b", "key-c", "key-d"].map((k) => alloc(k, 0)) },
  });
  const pool = (await buildQuotaSelfView(input(), deps)).pools[0];
  assert.deepEqual([pool.weight, pool.dimensions[0].yourShare.fairShare], [25, 250]);
});

test("placeholder and empty plans list the pool with no dimensions", async () => {
  for (const dimensions of [[], [{ unit: "tokens", window: "5h", limit: Number.EPSILON }]])
    assert.deepEqual(
      (await buildQuotaSelfView(input(), makeDeps({ plan: { dimensions } }))).pools[0].dimensions,
      []
    );
});

test("a pool whose connection is gone uses the plan's provider, or is skipped", async () => {
  const gone = { resolveConnectionProvider: async () => "unknown" };
  assert.equal(
    (await buildQuotaSelfView(input(), makeDeps({ ...gone, plan: { provider: "claude" } }))).pools
      .length,
    2
  );
  assert.deepEqual(
    (await buildQuotaSelfView(input(), makeDeps({ ...gone, plan: { provider: "unknown" } }))).pools,
    []
  );
});

test("refuses a key without self:usage and never leaks internal ids", async () => {
  await assert.rejects(
    buildQuotaSelfView(input({ scopes: [] }), makeDeps()),
    /missing_self_usage_scope/
  );
  const json = JSON.stringify(await buildQuotaSelfView(input({ scopes: BOTH }), makeDeps()));
  for (const secret of ["pool-a-id", "pool-b-id", "conn-secret-1", "poolId", "connectionId"])
    assert.ok(!json.includes(secret));
  // Ids of the other keys allocated in the same pools never appear either.
  for (const otherKey of ["key-b", "key-c"]) assert.ok(!json.includes(otherKey));
  assert.doesNotThrow(() => selfQuotaResponseSchema.parse(JSON.parse(json)));
});

test("the view reports the public API origin it is given, or null", async () => {
  const deps = makeDeps({ resolvePublicApiBaseUrl: () => "https://api.example.com" });
  assert.equal((await buildQuotaSelfView(input(), deps)).apiBaseUrl, "https://api.example.com");
  assert.equal((await buildQuotaSelfView(input(), makeDeps())).apiBaseUrl, null);
});
