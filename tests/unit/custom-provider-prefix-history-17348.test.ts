import test, { beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const home = fs.mkdtempSync(path.join(os.tmpdir(), "omni-prefix-history-17348-"));
process.env.DATA_DIR = home;

const core = await import("../../src/lib/db/core.ts");
const nodes = await import("../../src/lib/db/providers/nodes.ts");
const models = await import("../../src/lib/db/models.ts");
const history = await import("../../src/lib/db/providers/nodePrefixHistory.ts");
const prices = await import("../../src/app/api/pricing/models/route.ts");
const cache = await import("../../src/lib/db/readCache.ts");

const A = "openai-compatible-chat-prefix-history-a";
const B = "openai-compatible-chat-prefix-history-b";
const prefixA = "syntheticold";
const prefixB = "syntheticnew";

beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(home, { recursive: true, force: true, maxRetries: 5 });
  fs.mkdirSync(home, { recursive: true });
  core.getDbInstance();
});
after(() => {
  core.resetDbInstance();
  fs.rmSync(home, { recursive: true, force: true, maxRetries: 5 });
});

async function create(nodeId: string, prefix: string): Promise<void> {
  await nodes.createProviderNode({
    id: nodeId,
    type: "openai-compatible",
    prefix,
    name: "Synthetic " + nodeId,
    apiType: "chat",
    baseUrl: "https://example.invalid/v1",
  });
}
function persistPrice(namespace: string, models: Record<string, unknown>): void {
  core.getDbInstance().prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('pricing', ?, ?)"
  ).run(namespace, JSON.stringify(models));
}
async function catalog(): Promise<Record<string, any>> {
  const response = await prices.GET();
  assert.equal(response.status, 200);
  return (await response.json()) as Record<string, any>;
}

test("#17348: explicit compatible prefix rename stores real upstream model identities atomically", async () => {
  await create(A, prefixA);
  await models.replaceSyncedAvailableModelsForConnection(A, A, [
    { id: "foo", name: "Foo" },
    { id: "org/nested", name: "Nested" },
    { id: "syntheticold/foo", name: "Legit Slash ID" },
  ]);
  persistPrice(A, { "syntheticold/foo": { input: 6 } });
  const version = cache.getModelCatalogCacheVersion();
  await nodes.updateProviderNode(A, { prefix: prefixB });
  assert.ok(cache.getModelCatalogCacheVersion() > version, "/v1/models cache invalidated");

  const rows = history.getNodePrefixHistory(core.getDbInstance(), A);
  assert.deepEqual(rows, [{
    prefix: prefixA,
    modelIds: ["foo", "org/nested", "syntheticold/foo"],
  }]);

  const published = await catalog();
  const slot = published[A];
  assert.ok(slot, "same node key remains stable");
  assert.equal(slot.id, A, "PricingTab internal node contract survives");
  assert.equal(slot.displayPrefix, prefixB);
  assert.deepEqual(slot.historicalPrefixes, rows);
  assert.ok(slot.models.some((m: { id: string }) => m.id === "org/nested"));
  assert.ok(slot.models.some((m: { id: string }) => m.id === "syntheticold/foo"));
  assert.deepEqual(
    JSON.parse((core.getDbInstance().prepare(
      "SELECT value FROM key_value WHERE namespace = 'pricing' AND key = ?"
    ).get(A) as { value: string }).value),
    { "syntheticold/foo": { input: 6 } },
    "persisted historical price remains untouched"
  );
});

test("#17348: changing name only does not change historical mapping, deleting node purges history", async () => {
  await create(A, prefixA);
  await models.replaceSyncedAvailableModelsForConnection(A, A, [{ id: "foo", name: "Foo" }]);
  await nodes.updateProviderNode(A, { prefix: prefixB });
  const initial = history.getNodePrefixHistory(core.getDbInstance(), A);
  await nodes.updateProviderNode(A, { name: "Renamed node" });
  assert.deepEqual(history.getNodePrefixHistory(core.getDbInstance(), A), initial);
  await nodes.deleteProviderNode(A);
  assert.deepEqual(history.getNodePrefixHistory(core.getDbInstance(), A), []);
});

test("#17348: pricing for deleted compatible nodes stays in DB but never appears in management catalog", async () => {
  await create(A, prefixA);
  persistPrice(A, { "legacy/orphan": { input: 99 } });
  await nodes.deleteProviderNode(A);
  const published = await catalog();
  assert.equal(published[A]?.orphaned, true, "deleted compatible node must be labelled, not routable");
  assert.equal(published[A]?.pricingOnly, true);
  assert.equal(published[A]?.modelOverrideEligible, false);
  assert.deepEqual(published[A]?.models.map((m: { id: string }) => m.id), ["legacy/orphan"]);
  const row = core.getDbInstance().prepare(
    "SELECT value FROM key_value WHERE namespace = 'pricing' AND key = ?"
  ).get(A) as { value: string };
  assert.ok(row, "orphan remains available for a manual decision");
});

test("#17348: old alias with two historical owners is not joined to either node", async () => {
  await create(A, prefixA);
  await create(B, prefixA);
  await models.replaceSyncedAvailableModelsForConnection(A, A, [{ id: "foo", name: "Foo A" }]);
  await models.replaceSyncedAvailableModelsForConnection(B, B, [{ id: "foo", name: "Foo B" }]);
  await nodes.updateProviderNode(A, { prefix: prefixB });
  await nodes.updateProviderNode(B, { prefix: "syntheticthird" });
  persistPrice(prefixA, { foo: { input: 15 } });
  const published = await catalog();
  assert.ok(published[prefixA], "ambiguous namespace remains separate");
  assert.notEqual(published[prefixA].id, A);
  assert.notEqual(published[prefixA].id, B);
  assert.equal(published[A].pricingKey, undefined);
  assert.equal(published[B].pricingKey, undefined);
});

test("#17348: previous prefix reused by a live node cannot redirect its prices to an old owner", async () => {
  await create(A, prefixA);
  await models.replaceSyncedAvailableModelsForConnection(A, A, [{ id: "foo", name: "Foo A" }]);
  await nodes.updateProviderNode(A, { prefix: prefixB });
  await create(B, prefixA);
  await models.replaceSyncedAvailableModelsForConnection(B, B, [
    { id: "foo", name: "Current owner Foo" },
  ]);
  persistPrice(prefixA, { foo: { input: 15 } });
  persistPrice(B, { foo: { input: 7 } });
  const published = await catalog();
  assert.equal(published[B].displayPrefix, prefixA);
  assert.ok(published[B].models.some((m: { id: string }) => m.id === "foo"));
  assert.equal(published[B].pricingUnsafePublicPrefix, true);
  assert.equal(published[B].pricingKey, undefined,
    "new owner may not inherit old public-prefix pricing");
  assert.equal(published[prefixA].pricingOnly, true);
  assert.equal(published[prefixA].historicalPricingNamespace, true);
  assert.equal(published[A].historicalPrefixes, undefined);
  assert.notEqual(published[A].pricingKey, prefixA);
});

test("#17348: missing and malformed prefix histories never authorize speculative mapping", async () => {
  assert.deepEqual(history.parseNodePrefixHistory("{broken"), []);
  assert.deepEqual(history.parseNodePrefixHistory([{ prefix: "old/a", modelIds: ["foo"] }]), []);
  assert.deepEqual(history.parseNodePrefixHistory([
    { prefix: "old", modelIds: [{ id: "foo" }, { id: "foo" }, { id: "a/b" }] },
  ]), [{ prefix: "old", modelIds: ["foo", "a/b"] }]);
});


test("#17348: historical pricing rows are display-only, never inherited wholesale", async () => {
  await create(A, prefixA);
  await models.replaceSyncedAvailableModelsForConnection(A, A, [{ id: "foo", name: "Foo" }]);
  await nodes.updateProviderNode(A, { prefix: prefixB });
  persistPrice(prefixA, {
    foo: { input: 2 },
    "unproven-model": { input: 99 },
  });
  const published = await catalog();
  assert.equal(published[A].displayPrefix, prefixB);
  assert.deepEqual(published[A].historicalPrefixes, [{
    prefix: prefixA,
    modelIds: ["foo"],
  }]);
  assert.equal(published[A].pricingKey, undefined, "old price namespace is not a live pricingKey");
  assert.equal(
    published[A].models.some((m: { id: string }) => m.id === "unproven-model"),
    false,
    "historical pricing is never upstream model-identity evidence"
  );
  assert.equal(published[prefixA].historicalPricingNamespace, true);
  assert.equal(published[prefixA].pricingOnly, true);
  assert.equal(published[prefixA].modelOverrideEligible, false);
  assert.deepEqual(
    published[prefixA].models.map((m: { id: string }) => m.id).sort(),
    ["foo", "unproven-model"]
  );
});

test("#17348: conflicting old prefix claims from two historical nodes stay isolated", async () => {
  await create(A, prefixA);
  await create(B, prefixA);
  await models.replaceSyncedAvailableModelsForConnection(A, A, [{ id: "foo", name: "Foo A" }]);
  await models.replaceSyncedAvailableModelsForConnection(B, B, [{ id: "foo", name: "Foo B" }]);
  await nodes.updateProviderNode(A, { prefix: prefixB });
  await nodes.updateProviderNode(B, { prefix: "syntheticthird" });
  persistPrice(prefixA, { foo: { input: 88 } });
  const published = await catalog();
  assert.equal(published[A].historicalPrefixes, undefined);
  assert.equal(published[B].historicalPrefixes, undefined);
  assert.equal(published[prefixA].historicalPricingNamespace, true);
  assert.equal(published[prefixA].pricingOnly, true);
  assert.equal(published[A].pricingKey, undefined);
  assert.equal(published[B].pricingKey, undefined);
});


test("#17348: stale custom-model rows cannot prevent display-only classification", async () => {
  await create(A, prefixA);
  await models.replaceSyncedAvailableModelsForConnection(A, A, [{ id: "foo", name: "Live Foo" }]);
  await nodes.updateProviderNode(A, { prefix: prefixB });
  // A historic public alias may still have stale custom models in the DB.
  // That source creates a catalog entry BEFORE the pricing-only pass.
  await models.addCustomModel(prefixA, "stale-custom");
  persistPrice(prefixA, { "stale-custom": { input: 44 } });
  const published = await catalog();
  assert.equal(published[prefixA].historicalPricingNamespace, true);
  assert.equal(published[prefixA].pricingOnly, true);
  assert.equal(published[prefixA].modelOverrideEligible, false);
  assert.equal(published[A].pricingKey, undefined);
});


test("#17348: deleting a node that reused a retired prefix leaves an ambiguity tombstone", async () => {
  await create(A, prefixA);
  await models.replaceSyncedAvailableModelsForConnection(A, A, [{ id: "foo", name: "Foo A" }]);
  await nodes.updateProviderNode(A, { prefix: prefixB });
  await create(B, prefixA);
  await models.replaceSyncedAvailableModelsForConnection(B, B, [{ id: "foo", name: "Foo B" }]);
  await nodes.deleteProviderNode(B);
  assert.equal(
    history.getDeletedNodePrefixTombstones(core.getDbInstance()).has(prefixA),
    true,
    "deletion must not make a reused public identity appear unclaimed"
  );
  persistPrice(prefixA, { foo: { input: 51 } });
  const published = await catalog();
  assert.equal(published[A].historicalPrefixes, undefined,
    "A must never inherit B's later prices for the same prefix and model");
  assert.equal(published[A].pricingKey, undefined);
  assert.equal(published[prefixA].historicalPricingNamespace, true);
  assert.equal(published[prefixA].modelOverrideEligible, false);
});

test("#17348: deletion archives all historic node prefixes as non-routable vetoes", async () => {
  await create(A, prefixA);
  await models.replaceSyncedAvailableModelsForConnection(A, A, [{ id: "foo", name: "Foo" }]);
  await nodes.updateProviderNode(A, { prefix: prefixB });
  await nodes.deleteProviderNode(A);
  assert.deepEqual(
    history.getArchivedDeletedNodePrefixHistory(core.getDbInstance(), A),
    [{ prefix: prefixA, modelIds: ["foo"] }],
    "deleted node keeps its old raw-ID provenance for manual recovery"
  );
  const compactRow = core.getDbInstance().prepare(
    "SELECT value FROM key_value WHERE namespace = ? AND key = ?"
  ).get("providerNodePrefixTombstones", A) as { value: string };
  assert.deepEqual(
    JSON.parse(compactRow.value), [prefixA, prefixB],
    "hot catalog guard keeps a small prefix-only tombstone"
  );
  assert.deepEqual(
    [...history.getDeletedNodePrefixTombstones(core.getDbInstance())].sort(),
    [prefixA, prefixB].sort()
  );
  assert.deepEqual(history.getNodePrefixHistory(core.getDbInstance(), A), []);
});


test("#17348: recreated provider IDs must not erase archived prefix ownership", async () => {
  await create(A, prefixA);
  await nodes.updateProviderNode(A, { prefix: prefixB });
  await nodes.deleteProviderNode(A);
  await create(A, "syntheticfourth");
  await nodes.deleteProviderNode(A);
  assert.deepEqual(
    [...history.getDeletedNodePrefixTombstones(core.getDbInstance())].sort(),
    [prefixA, prefixB, "syntheticfourth"].sort()
  );
});

test("#17348: older array-form tombstones still prevent historical reassignment", () => {
  core.getDbInstance().prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)"
  ).run("providerNodePrefixTombstones", "old-format", JSON.stringify(["legacy-prefix"]));
  assert.equal(history.getDeletedNodePrefixTombstones(core.getDbInstance()).has("legacy-prefix"), true);
});


test("#17348: reused live prefix cannot inherit the deleted node's unverified pricing", async () => {
  await create(A, prefixA);
  await models.replaceSyncedAvailableModelsForConnection(A, A, [{ id: "foo", name: "Foo A" }]);
  await nodes.updateProviderNode(A, { prefix: prefixB });
  await create(B, prefixA);
  await nodes.deleteProviderNode(B);
  await create(B, prefixA);
  await models.replaceSyncedAvailableModelsForConnection(B, B, [{ id: "foo", name: "Foo B" }]);
  persistPrice(prefixA, { foo: { input: 91 } });
  persistPrice(B, { foo: { input: 7 } });
  const published = await catalog();
  assert.equal(published[B].displayPrefix, prefixA);
  assert.equal(published[B].pricingUnsafePublicPrefix, true);
  assert.equal(published[B].pricingKey, undefined,
    "pricing at a retired public alias must not be attached to the new owner");
  assert.equal(published[prefixA].pricingOnly, true);
  assert.equal(published[prefixA].historicalPricingNamespace, true);
  assert.deepEqual(published[prefixA].models.map((m: { id: string }) => m.id), ["foo"]);
  assert.equal(published[A].historicalPrefixes, undefined);
});


test("#17348: node and current public pricing namespaces remain separate in either insert order", async () => {
  for (const [id, prefix, reverse] of [
    [A, prefixA, false],
    [B, prefixB, true],
  ] as const) {
    await create(id, prefix);
    await models.replaceSyncedAvailableModelsForConnection(id, id, [
      { id: "under-node", name: "Under node" },
      { id: "under-prefix", name: "Under prefix" },
    ]);
    if (reverse) {
      persistPrice(prefix, { "under-prefix": { input: 4 } });
      persistPrice(id, { "under-node": { input: 7 } });
    } else {
      persistPrice(id, { "under-node": { input: 7 } });
      persistPrice(prefix, { "under-prefix": { input: 4 } });
    }
    const published = await catalog();
    assert.equal(published[id].pricingKey, undefined);
    assert.equal(published[prefix].pricingOnly, true);
    assert.equal(published[prefix].separatePricingNamespace, true);
    assert.equal(published[prefix].modelOverrideEligible, false);
    assert.deepEqual(
      published[prefix].models.map((model: { id: string }) => model.id),
      ["under-prefix"],
      "public pricing card must only contain models from its own price namespace"
    );
    assert.ok(published[id].models.some((model: { id: string }) => model.id === "under-node"));
  }
});

test("#17348: pricing provider/model names cannot mutate object prototypes or vanish", async () => {
  const pricingDb = await import("../../src/lib/db/settings/pricing.ts");
  const rawModelPrices = JSON.parse(
    '{"__proto__":{"input":11},"constructor":{"output":22}}'
  ) as Record<string, unknown>;
  persistPrice("__proto__", { ordinary: { input: 9 } });
  persistPrice("safe-provider", rawModelPrices);
  const priced = await pricingDb.getPricing();
  assert.equal(Object.hasOwn(priced, "__proto__"), true);
  assert.equal((priced as any)["__proto__"].ordinary.input, 9);
  assert.equal(Object.hasOwn(priced["safe-provider"], "__proto__"), true);
  assert.equal(priced["safe-provider"]["__proto__"].input, 11);
  const constructorPrice = Object.getOwnPropertyDescriptor(
    priced["safe-provider"], "constructor"
  )?.value as { output?: unknown } | undefined;
  assert.equal(constructorPrice?.output, 22);
  assert.equal(({} as Record<string, unknown>).ordinary, undefined);
  const bundle = await pricingDb.getPricingWithSources();
  assert.equal(Object.hasOwn(bundle.sourceMap, "__proto__"), true);
  assert.equal(bundle.sourceMap["safe-provider"]["__proto__"], "user");
  assert.equal(bundle.sourceMap["safe-provider"].constructor, "user");
  const published = await catalog();
  assert.equal(Object.hasOwn(published, "__proto__"), true);
  assert.ok(published["__proto__"].models.some((model: { id: string }) => model.id === "ordinary"));
});
