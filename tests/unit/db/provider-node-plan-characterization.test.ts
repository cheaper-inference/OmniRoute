/**
 * Characterization of the provider node and provider plan modules through their public
 * exports only, so the same file passes against the pre-repository modules and against
 * the repository-backed facades: ordering, paging, defaults and JSON-column handling,
 * the id-conflict guard, custom-model cleanup, read-cache and prefix-memo invalidation
 * in the caller's turn, and the plan resolver's override → catalog → empty fallback.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "provider-node-plan-characterization-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const nodesDb = await import("../../../src/lib/db/providers/nodes.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const nodePrefix = await import("../../../src/lib/db/providers/nodePrefix.ts");
const readCache = await import("../../../src/lib/db/readCache.ts");
const modelsDb = await import("../../../src/lib/db/models.ts");
const plansDb = await import("../../../src/lib/db/providerPlans.ts");
const { resolvePlan } = await import("../../../src/lib/quota/planResolver.ts");

type Node = Record<string, unknown>;

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
  nodePrefix.resetProviderNodePrefixCache();
  readCache.invalidateDbCache("nodes");
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function rawNode(id: string): Record<string, unknown> | undefined {
  return core.getDbInstance().prepare("SELECT * FROM provider_nodes WHERE id = ?").get(id) as
    Record<string, unknown> | undefined;
}

// ── nodes: reads ─────────────────────────────────────────────────────────────

test("nodes: list is id-ascending, filters by type and pages with offset defaulting to 0", async () => {
  for (const [id, type] of [
    ["n-c", "openai-compatible"],
    ["n-a", "anthropic-compatible"],
    ["n-b", "openai-compatible"],
  ]) {
    await nodesDb.createProviderNode({ id, type, name: id });
  }

  const listed = nodesDb.getProviderNodes();
  assert.ok(listed instanceof Promise, "getProviderNodes stays async");
  assert.deepEqual(
    ((await listed) as Node[]).map((n) => n.id),
    ["n-a", "n-b", "n-c"]
  );
  assert.deepEqual(
    ((await nodesDb.getProviderNodes({ type: "openai-compatible" })) as Node[]).map((n) => n.id),
    ["n-b", "n-c"]
  );
  assert.deepEqual(
    ((await nodesDb.getProviderNodes({}, 2)) as Node[]).map((n) => n.id),
    ["n-a", "n-b"]
  );
  assert.deepEqual(
    ((await nodesDb.getProviderNodes({}, 2, 2)) as Node[]).map((n) => n.id),
    ["n-c"]
  );
  assert.deepEqual(
    ((await nodesDb.getProviderNodes({ type: "openai-compatible" }, 1, 1)) as Node[]).map(
      (n) => n.id
    ),
    ["n-c"]
  );
  // An empty type is no filter.
  assert.equal(((await nodesDb.getProviderNodes({ type: "" })) as Node[]).length, 3);

  const count = nodesDb.getProviderNodesCount();
  assert.equal(count, 3, "count is synchronous");
  assert.equal(nodesDb.getProviderNodesCount({ type: "openai-compatible" }), 2);
  assert.equal(nodesDb.getProviderNodesCount({ type: "nope" }), 0);

  assert.equal(await nodesDb.getProviderNodeById("missing"), null);
  const byId = (await nodesDb.getProviderNodeById("n-a")) as Node;
  assert.equal(byId.type, "anthropic-compatible");
  assert.equal(byId.customHeaders, null, "null JSON columns surface under the base name");
  assert.equal("customHeadersJson" in byId, false);
});

test("nodes: the barrel re-exports the same functions", () => {
  assert.equal(providersDb.getProviderNodes, nodesDb.getProviderNodes);
  assert.equal(providersDb.getProviderNodesCount, nodesDb.getProviderNodesCount);
  assert.equal(providersDb.getProviderNodeById, nodesDb.getProviderNodeById);
  assert.equal(providersDb.createProviderNode, nodesDb.createProviderNode);
  assert.equal(providersDb.updateProviderNode, nodesDb.updateProviderNode);
  assert.equal(providersDb.deleteProviderNode, nodesDb.deleteProviderNode);
  assert.equal(
    providersDb.resolveProviderNodeForConnection,
    nodesDb.resolveProviderNodeForConnection
  );
});

// ── nodes: create ────────────────────────────────────────────────────────────

test("nodes: create applies defaults and returns parsed JSON columns", async () => {
  const created = (await nodesDb.createProviderNode({
    type: "openai-compatible",
    name: "Gateway",
    prefix: "",
    baseUrl: "https://gw.example.com/v1",
    customHeaders: { "x-team": "a" },
    customJsonConfig: { mode: "x" },
    dailyQuotaResetHour: 0,
  })) as Node;

  assert.match(String(created.id), /^[0-9a-f-]{36}$/, "id defaults to a uuid");
  assert.equal(created.prefix, null, "blank prefix stored as null");
  assert.equal(created.apiType, null);
  assert.equal(created.iconUrl, null);
  assert.equal(created.dailyQuotaResetTimezone, null);
  assert.equal(created.dailyQuotaResetHour, 0, "hour 0 is kept, not nulled");
  assert.deepEqual(created.customHeaders, { "x-team": "a" });
  assert.deepEqual(created.customJsonConfig, { mode: "x" });
  assert.equal("customHeadersJson" in created, false);
  assert.equal("customJsonConfigJson" in created, false);
  assert.equal(created.createdAt, created.updatedAt);

  const row = rawNode(String(created.id))!;
  assert.equal(row.custom_headers_json, JSON.stringify({ "x-team": "a" }));
  assert.equal(row.custom_json_config_json, JSON.stringify({ mode: "x" }));
  assert.equal(row.prefix, null);
  assert.equal(row.daily_quota_reset_hour, 0);

  const plain = (await nodesDb.createProviderNode({
    id: "plain",
    type: "openai-compatible",
    name: "Plain",
    dailyQuotaResetHour: "7",
  })) as Node;
  assert.equal(plain.customHeaders, null);
  assert.equal(plain.customJsonConfig, null);
  assert.equal(plain.dailyQuotaResetHour, 7, "hour is coerced to a number");
  assert.equal(rawNode("plain")!.custom_headers_json, null);
});

test("nodes: a duplicate id throws the conflict error and never overwrites", async () => {
  await nodesDb.createProviderNode({ id: "dup", type: "openai-compatible", name: "First" });

  await assert.rejects(
    nodesDb.createProviderNode({ id: "dup", type: "openai-compatible", name: "Second" }),
    (error: unknown) => {
      assert.ok(error instanceof nodesDb.ProviderNodeIdConflictError);
      assert.ok(nodesDb.isProviderNodeIdConflictError(error));
      assert.equal((error as { code: string }).code, nodesDb.PROVIDER_NODE_ID_CONFLICT);
      assert.equal((error as { nodeId: string }).nodeId, "dup");
      return true;
    }
  );
  assert.equal(rawNode("dup")!.name, "First");
  assert.equal(nodesDb.getProviderNodesCount(), 1);
});

// ── nodes: update ────────────────────────────────────────────────────────────

test("nodes: update merges, preserves omitted JSON columns and clears explicit empties", async () => {
  assert.equal(await nodesDb.updateProviderNode("missing", { name: "x" }), null);

  const created = (await nodesDb.createProviderNode({
    id: "u1",
    type: "openai-compatible",
    name: "Before",
    prefix: "ub",
    iconUrl: "https://icons.example.com/a.png",
    customHeaders: { a: "1" },
    customJsonConfig: { k: 1 },
    dailyQuotaResetTimezone: "UTC",
    dailyQuotaResetHour: 3,
  })) as Node;

  const renamed = (await nodesDb.updateProviderNode("u1", { name: "After" })) as Node;
  assert.equal(renamed.name, "After");
  assert.equal(renamed.prefix, "ub");
  assert.deepEqual(renamed.customHeaders, { a: "1" }, "omitted headers are preserved");
  assert.deepEqual(renamed.customJsonConfig, { k: 1 }, "omitted JSON config is preserved");
  assert.equal(renamed.createdAt, created.createdAt);
  assert.equal("customHeadersJson" in renamed, false);
  assert.equal(rawNode("u1")!.custom_headers_json, JSON.stringify({ a: "1" }));
  assert.equal(rawNode("u1")!.custom_json_config_json, JSON.stringify({ k: 1 }));
  assert.equal(rawNode("u1")!.daily_quota_reset_hour, 3);

  const cleared = (await nodesDb.updateProviderNode("u1", {
    customHeaders: null,
    customJsonConfig: null,
    iconUrl: "",
    prefix: "",
    dailyQuotaResetHour: 0,
  })) as Node;
  assert.equal(cleared.customHeaders, null);
  assert.equal(cleared.customJsonConfig, null);
  const row = rawNode("u1")!;
  assert.equal(row.custom_headers_json, null);
  assert.equal(row.custom_json_config_json, null);
  assert.equal(row.icon_url, null);
  assert.equal(row.prefix, null);
  assert.equal(row.daily_quota_reset_hour, 0);
  assert.equal(row.daily_quota_reset_timezone, "UTC");
  assert.equal(row.created_at, created.createdAt);

  const rewritten = (await nodesDb.updateProviderNode("u1", {
    customHeaders: { b: "2" },
  })) as Node;
  assert.deepEqual(rewritten.customHeaders, { b: "2" });
  assert.equal(rawNode("u1")!.custom_headers_json, JSON.stringify({ b: "2" }));
});

// ── nodes: delete ────────────────────────────────────────────────────────────

test("nodes: delete returns the old node and removes only its own customModels row", async () => {
  assert.equal(await nodesDb.deleteProviderNode("missing"), null);

  await nodesDb.createProviderNode({
    id: "d1",
    type: "openai-compatible",
    name: "Doomed",
    customHeaders: { h: "v" },
  });
  await modelsDb.addCustomModel("d1", "m-1");
  await modelsDb.addCustomModel("openai", "m-keep");

  const deleted = (await nodesDb.deleteProviderNode("d1")) as Node;
  assert.equal(deleted.id, "d1");
  assert.equal(deleted.name, "Doomed");
  assert.deepEqual(deleted.customHeaders, { h: "v" });
  assert.equal(rawNode("d1"), undefined);
  assert.deepEqual(await modelsDb.getCustomModels("d1"), []);
  assert.equal(((await modelsDb.getCustomModels("openai")) as unknown[]).length, 1);
});

// ── nodes: cache invalidation happens in the caller's turn ───────────────────

test("nodes: every write invalidates the prefix memo and node read cache before yielding", async () => {
  await nodesDb.createProviderNode({
    id: "p1",
    type: "openai-compatible",
    name: "P",
    prefix: "aa",
  });
  assert.equal(nodePrefix.getProviderNodePrefixSync("p1"), "aa");
  assert.equal(nodePrefix.getProviderNodeIdByPrefixSync("AA"), "p1");
  assert.equal((await readCache.getCachedProviderNodes()).length, 1);

  // create — not awaited: the memo must already reflect the new node.
  const creating = nodesDb.createProviderNode({
    id: "p2",
    type: "openai-compatible",
    name: "Q",
    prefix: "bb",
  });
  assert.equal(nodePrefix.getProviderNodeIdByPrefixSync("bb"), "p2");
  await creating;
  assert.equal((await readCache.getCachedProviderNodes()).length, 2);

  // update — not awaited.
  const updating = nodesDb.updateProviderNode("p1", { prefix: "cc" });
  assert.equal(nodePrefix.getProviderNodePrefixSync("p1"), "cc");
  assert.equal(nodePrefix.getProviderNodeIdByPrefixSync("aa"), null);
  await updating;
  const cached = (await readCache.getCachedProviderNodes()) as Node[];
  assert.equal(cached.find((n) => n?.id === "p1")?.prefix, "cc");

  // delete — not awaited.
  const deleting = nodesDb.deleteProviderNode("p2");
  assert.equal(nodePrefix.getProviderNodePrefixSync("p2"), null);
  await deleting;
  assert.deepEqual(
    ((await readCache.getCachedProviderNodes()) as Node[]).map((n) => n?.id),
    ["p1"]
  );

  // A rejected duplicate leaves the memo alone.
  assert.equal(nodePrefix.getProviderNodeIdByPrefixSync("cc"), "p1");
  await assert.rejects(
    nodesDb.createProviderNode({ id: "p1", type: "openai-compatible", name: "X", prefix: "zz" })
  );
  assert.equal(nodePrefix.getProviderNodeIdByPrefixSync("zz"), null);
});

// ── nodes: resolution for a new connection ───────────────────────────────────

test("nodes: resolve by exact id, else the sole node of a derived type", async () => {
  const uuidA = "11111111-1111-4111-8111-111111111111";
  const uuidB = "22222222-2222-4222-8222-222222222222";
  await nodesDb.createProviderNode({
    id: `openai-compatible-responses-${uuidA}`,
    type: "openai-compatible",
    name: "R",
  });
  await nodesDb.createProviderNode({
    id: `anthropic-compatible-${uuidA}`,
    type: "anthropic-compatible",
    name: "A1",
  });
  await nodesDb.createProviderNode({
    id: `anthropic-compatible-${uuidB}`,
    type: "anthropic-compatible",
    name: "A2",
  });

  assert.equal(
    ((await nodesDb.resolveProviderNodeForConnection(`anthropic-compatible-${uuidB}`)) as Node)
      .name,
    "A2"
  );
  assert.equal(
    ((await nodesDb.resolveProviderNodeForConnection("openai-compatible-responses")) as Node).name,
    "R"
  );
  assert.equal(await nodesDb.resolveProviderNodeForConnection("anthropic-compatible"), null);
  assert.equal(await nodesDb.resolveProviderNodeForConnection("openai-compatible"), null);
});

// ── plans ────────────────────────────────────────────────────────────────────

test("plans: upsert replaces per connection, list is provider-ascending, reads are sync", () => {
  assert.equal(plansDb.getPlan("c1"), null);
  plansDb.upsertPlan("c1", "zeta", [{ unit: "percent", window: "5h", limit: 100 }], "auto");
  plansDb.upsertPlan("c2", "alpha", [{ unit: "tokens", window: "daily", limit: 5 }], "manual");

  const listed = plansDb.listPlans();
  assert.ok(Array.isArray(listed), "listPlans is synchronous");
  assert.deepEqual(
    listed.map((p) => [p.connectionId, p.provider]),
    [
      ["c2", "alpha"],
      ["c1", "zeta"],
    ]
  );

  plansDb.upsertPlan("c1", "beta", [{ unit: "usd", window: "monthly", limit: 9 }], "manual");
  assert.deepEqual(plansDb.getPlan("c1"), {
    connectionId: "c1",
    provider: "beta",
    dimensions: [{ unit: "usd", window: "monthly", limit: 9 }],
    source: "manual",
  });
  assert.equal(plansDb.listPlans().length, 2);

  const row = core
    .getDbInstance()
    .prepare("SELECT dimensions_json, updated_at FROM provider_plans WHERE connection_id = ?")
    .get("c1") as { dimensions_json: string; updated_at: string };
  assert.equal(row.dimensions_json, JSON.stringify([{ unit: "usd", window: "monthly", limit: 9 }]));
  assert.ok(!Number.isNaN(Date.parse(row.updated_at)));

  assert.equal(plansDb.deletePlan("c1"), true);
  assert.equal(plansDb.deletePlan("c1"), false);
  assert.equal(plansDb.getPlan("c1"), null);
});

test("plans: malformed stored dimensions read back as an empty list", () => {
  core
    .getDbInstance()
    .prepare(
      "INSERT INTO provider_plans (connection_id, provider, dimensions_json, source, updated_at) VALUES (?, ?, ?, ?, ?)"
    )
    .run("bad", "kimi", "{not json", "manual", "2026-01-01T00:00:00.000Z");
  assert.deepEqual(plansDb.getPlan("bad")?.dimensions, []);
  assert.deepEqual(plansDb.listPlans()[0].dimensions, []);
});

test("plans: resolver prefers a non-empty override, then the catalog, then an empty manual plan", () => {
  plansDb.upsertPlan(
    "c-codex",
    "codex",
    [{ unit: "requests", window: "daily", limit: 7 }],
    "manual"
  );
  assert.deepEqual(resolvePlan("c-codex", "codex"), {
    connectionId: "c-codex",
    provider: "codex",
    dimensions: [{ unit: "requests", window: "daily", limit: 7 }],
    source: "manual",
  });

  plansDb.upsertPlan("c-empty", "codex", [], "manual");
  const fromCatalog = resolvePlan("c-empty", "codex");
  assert.equal(fromCatalog.connectionId, null, "empty override falls back to the catalog");
  assert.equal(fromCatalog.source, "auto");
  assert.ok(fromCatalog.dimensions.length > 0);

  assert.deepEqual(resolvePlan("c-none", "no-such-provider"), {
    connectionId: null,
    provider: "no-such-provider",
    dimensions: [],
    source: "manual",
  });
});
