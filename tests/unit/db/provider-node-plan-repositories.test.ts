/**
 * Contract of the provider node / provider plan repositories (Promise-based, SQLite
 * implementation) and of the facade wiring: the facades hand out the composition-root
 * repositories, the repositories never back up or invalidate caches themselves, and
 * the synchronous legacy access is the same SQLite store.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "provider-node-plan-repositories-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const { providerNodeRepositories } =
  await import("../../../src/lib/db/repositories/providerNodeRepositories.ts");
const nodesFacade = await import("../../../src/lib/db/providers/nodes.ts");
const plansFacade = await import("../../../src/lib/db/providerPlans.ts");
const nodePrefix = await import("../../../src/lib/db/providers/nodePrefix.ts");

const { nodes, plans } = providerNodeRepositories;

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
  nodePrefix.resetProviderNodePrefixCache();
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function promised<T>(value: Promise<T>): Promise<T> {
  assert.ok(value instanceof Promise, "every repository operation returns a Promise");
  return value;
}

function nodeInsert(id: string, overrides: Record<string, unknown> = {}) {
  return {
    id,
    type: "openai-compatible",
    name: id,
    prefix: null,
    apiType: null,
    baseUrl: null,
    chatPath: null,
    modelsPath: null,
    iconUrl: null,
    customHeadersJson: null,
    customJsonConfigJson: null,
    dailyQuotaResetTimezone: null,
    dailyQuotaResetHour: null,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

test("facades hand out the composition-root repositories", () => {
  assert.equal(nodesFacade.getProviderNodeRepository(), nodes);
  assert.equal(plansFacade.getProviderPlanRepository(), plans);
});

test("node repository: insert, conflict, list order/filter/page, count, find", async () => {
  assert.equal(await promised(nodes.insert(nodeInsert("b"))), true);
  assert.equal(
    await promised(nodes.insert(nodeInsert("a", { type: "anthropic-compatible" }))),
    true
  );
  assert.equal(await promised(nodes.insert(nodeInsert("c"))), true);
  assert.equal(await nodes.insert(nodeInsert("a", { name: "other" })), false, "id conflict");

  assert.deepEqual(
    (await promised(nodes.list())).map((n) => n.id),
    ["a", "b", "c"]
  );
  assert.deepEqual(
    (await nodes.list({ type: "openai-compatible" })).map((n) => n.id),
    ["b", "c"]
  );
  assert.deepEqual(
    (await nodes.list({}, { limit: 1, offset: 1 })).map((n) => n.id),
    ["b"]
  );
  assert.deepEqual(
    (await nodes.list({}, { limit: 2 })).map((n) => n.id),
    ["a", "b"]
  );
  assert.equal(await promised(nodes.count()), 3);
  assert.equal(await nodes.count({ type: "anthropic-compatible" }), 1);

  const found = await promised(nodes.findById("a"));
  assert.equal(found?.name, "a", "conflicting insert did not overwrite");
  assert.equal(found?.type, "anthropic-compatible");
  assert.equal(await nodes.findById("missing"), null);
});

test("node repository: rows come back as stored (snake_case, JSON as text)", async () => {
  await nodes.insert(
    nodeInsert("j", { customHeadersJson: '{"x":"1"}', dailyQuotaResetHour: 0, prefix: "jj" })
  );
  const row = await nodes.findById("j");
  assert.equal(row?.custom_headers_json, '{"x":"1"}');
  assert.equal(row?.daily_quota_reset_hour, 0);
  assert.equal(row?.prefix, "jj");
  assert.equal(row?.created_at, "2026-01-01T00:00:00.000Z");
});

test("node repository: update overwrites every column; delete removes the customModels row", async () => {
  await nodes.insert(nodeInsert("u", { prefix: "old", iconUrl: "i" }));
  await promised(
    nodes.update("u", {
      type: "anthropic-compatible",
      name: "renamed",
      prefix: null,
      apiType: "responses",
      baseUrl: "https://x",
      chatPath: "/c",
      modelsPath: "/m",
      iconUrl: null,
      customHeadersJson: '{"h":"v"}',
      customJsonConfigJson: null,
      dailyQuotaResetTimezone: "UTC",
      dailyQuotaResetHour: 4,
      updatedAt: "2026-02-02T00:00:00.000Z",
    })
  );
  const row = await nodes.findById("u");
  assert.equal(row?.name, "renamed");
  assert.equal(row?.type, "anthropic-compatible");
  assert.equal(row?.prefix, null);
  assert.equal(row?.icon_url, null);
  assert.equal(row?.api_type, "responses");
  assert.equal(row?.custom_headers_json, '{"h":"v"}');
  assert.equal(row?.daily_quota_reset_hour, 4);
  assert.equal(row?.created_at, "2026-01-01T00:00:00.000Z", "created_at untouched");
  assert.equal(row?.updated_at, "2026-02-02T00:00:00.000Z");

  const db = core.getDbInstance();
  const kv = db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)");
  kv.run("customModels", "u", "[]");
  kv.run("customModels", "other", "[]");
  kv.run("otherNamespace", "u", "{}");

  assert.equal(await promised(nodes.delete("missing")), null);
  const removed = await nodes.delete("u");
  assert.equal(removed?.name, "renamed", "resolves the row as it was");
  assert.equal(await nodes.findById("u"), null);
  const remaining = db
    .prepare("SELECT namespace, key FROM key_value WHERE key IN ('u', 'other') ORDER BY namespace")
    .all();
  assert.deepEqual(remaining, [
    { namespace: "customModels", key: "other" },
    { namespace: "otherNamespace", key: "u" },
  ]);
});

test("node repository: update targets explicit id even when values carries another id", async () => {
  await nodes.insert(nodeInsert("a", { name: "Before A" }));
  await nodes.insert(nodeInsert("b", { name: "Before B" }));
  // ProviderNodeInsert extends ProviderNodeValues, so a caller can pass one to update().
  const insertShaped = nodeInsert("b", { name: "Updated A" });
  await promised(nodes.update("a", insertShaped));
  assert.equal((await nodes.findById("a"))?.name, "Updated A");
  assert.equal((await nodes.findById("b"))?.name, "Before B");
});

test("node repository writes do not invalidate the prefix memo (the facade does)", async () => {
  await nodes.insert(nodeInsert("m", { prefix: "mm" }));
  assert.equal(nodePrefix.getProviderNodePrefixSync("m"), "mm");
  await nodes.update("m", { ...nodeInsert("m"), prefix: "nn" });
  assert.equal(nodePrefix.getProviderNodePrefixSync("m"), "mm", "memo is still the old value");
  nodePrefix.resetProviderNodePrefixCache();
  assert.equal(nodePrefix.getProviderNodePrefixSync("m"), "nn");
});

test("plan repository: upsert, ordering, parse fallback and delete", async () => {
  assert.equal(await promised(plans.findByConnectionId("c")), null);
  await promised(
    plans.upsert(
      "c",
      "zeta",
      [{ unit: "percent", window: "5h", limit: 1 }],
      "auto",
      "2026-01-01T00:00:00.000Z"
    )
  );
  await plans.upsert("d", "alpha", [], "manual", "2026-01-01T00:00:00.000Z");
  await plans.upsert(
    "c",
    "beta",
    [{ unit: "usd", window: "weekly", limit: 2 }],
    "manual",
    "2026-03-03T00:00:00.000Z"
  );

  assert.deepEqual(
    (await promised(plans.list())).map((p) => [p.connectionId, p.provider, p.source]),
    [
      ["d", "alpha", "manual"],
      ["c", "beta", "manual"],
    ]
  );
  assert.deepEqual((await plans.findByConnectionId("c"))?.dimensions, [
    { unit: "usd", window: "weekly", limit: 2 },
  ]);
  const stored = core
    .getDbInstance()
    .prepare("SELECT updated_at FROM provider_plans WHERE connection_id = 'c'")
    .get() as { updated_at: string };
  assert.equal(stored.updated_at, "2026-03-03T00:00:00.000Z");

  core
    .getDbInstance()
    .prepare("UPDATE provider_plans SET dimensions_json = 'oops' WHERE connection_id = 'd'")
    .run();
  assert.deepEqual((await plans.findByConnectionId("d"))?.dimensions, []);

  assert.equal(await promised(plans.delete("c")), true);
  assert.equal(await plans.delete("c"), false);
});

test("legacy sync access reads and writes the same SQLite store", async () => {
  const { legacySync } = providerNodeRepositories;
  assert.equal(legacySync.nodes.insert(nodeInsert("s")), true);
  assert.equal((await nodes.findById("s"))?.id, "s");
  assert.equal(legacySync.nodes.count(), 1);

  legacySync.plans.upsert("p", "kimi", [], "manual", "2026-01-01T00:00:00.000Z");
  assert.equal((await plans.findByConnectionId("p"))?.provider, "kimi");
  assert.equal(legacySync.plans.findByConnectionId("p")?.provider, "kimi");
});
