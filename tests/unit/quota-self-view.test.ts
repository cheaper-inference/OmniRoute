import test from "node:test";
import assert from "node:assert/strict";

import { buildQuotaSelfView } from "../../src/lib/quota/selfView.ts";
import { selfQuotaResponseSchema } from "../../src/shared/schemas/selfQuota.ts";
import { BOTH, alloc, input, makeDeps } from "./fixtures/quotaSelfView.ts";

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
  const noStore = makeDeps({
    getQuotaStore: async () => {
      throw new Error("store init failed");
    },
  });
  const [lost] = (await buildQuotaSelfView(input({ scopes: BOTH }), noStore)).pools[0].dimensions;
  assert.deepEqual(lost.total, unavailable);
  assert.deepEqual(
    [lost.yourShare.consumed, lost.yourShare.remaining, lost.yourShare.status],
    [null, null, "unavailable"]
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
  assert.doesNotThrow(() => selfQuotaResponseSchema.parse(JSON.parse(json)));
});
