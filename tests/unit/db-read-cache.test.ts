import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-read-cache-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

async function importFresh(modulePath) {
  const url = pathToFileURL(path.resolve(modulePath)).href;
  return import(`${url}?test=${Date.now()}-${Math.random().toString(16).slice(2)}`);
}

async function resetStorage() {
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      }
      break;
    } catch (error: any) {
      if ((error?.code === "EBUSY" || error?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("getCachedSettings returns cached data until TTL expires or cache is invalidated", async () => {
  const readCache = await importFresh("src/lib/db/readCache.ts");
  const db = core.getDbInstance();

  await settingsDb.updateSettings({ label: "initial" });
  assert.equal((await readCache.getCachedSettings()).label, "initial");

  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "settings",
    "label",
    JSON.stringify("stale-write")
  );

  assert.equal((await readCache.getCachedSettings()).label, "initial");

  const originalNow = Date.now;
  try {
    Date.now = () => originalNow() + 6_000;
    assert.equal((await readCache.getCachedSettings()).label, "stale-write");
  } finally {
    Date.now = originalNow;
  }

  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "settings",
    "label",
    JSON.stringify("after-invalidate")
  );
  readCache.invalidateDbCache("settings");

  assert.equal((await readCache.getCachedSettings()).label, "after-invalidate");
});

test("getCachedPricing caches results and refreshes after invalidation", async () => {
  const readCache = await importFresh("src/lib/db/readCache.ts");
  const db = core.getDbInstance();

  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "pricing",
    "cache-provider",
    JSON.stringify({
      "model-a": { prompt: 1 },
    })
  );

  assert.equal((await readCache.getCachedPricing())["cache-provider"]["model-a"].prompt, 1);

  db.prepare("UPDATE key_value SET value = ? WHERE namespace = ? AND key = ?").run(
    JSON.stringify({
      "model-a": { prompt: 9 },
    }),
    "pricing",
    "cache-provider"
  );

  assert.equal((await readCache.getCachedPricing())["cache-provider"]["model-a"].prompt, 1);

  readCache.invalidateDbCache("pricing");

  assert.equal((await readCache.getCachedPricing())["cache-provider"]["model-a"].prompt, 9);
});

test("getCachedProviderConnections caches only the unfiltered query", async () => {
  const readCache = await import("../../src/lib/db/readCache.ts");
  const db = core.getDbInstance();
  const now = new Date().toISOString();

  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Primary",
    apiKey: "sk-primary",
  });
  const firstRead = await readCache.getCachedProviderConnections();

  db.prepare(
    `
    INSERT INTO provider_connections (
      id, provider, auth_type, name, is_active, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `
  ).run("direct-insert", "openai", "apikey", "Secondary", 1, now, now);

  const cachedAll = await readCache.getCachedProviderConnections();
  const filtered = await readCache.getCachedProviderConnections({ provider: "openai" });

  assert.equal(firstRead.length, 1);
  assert.equal(cachedAll.length, 1);
  assert.equal(filtered.length, 2);

  readCache.invalidateDbCache("connections");

  assert.equal((await readCache.getCachedProviderConnections()).length, 2);
});

test("resetDbInstance invalidates provider connection read caches", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Reset Cache Test",
    apiKey: "sk-reset-cache",
  });

  assert.equal((await providersDb.getProviderConnections()).length, 1);

  await resetStorage();

  assert.equal((await providersDb.getProviderConnections()).length, 0);
});

test("createProviderConnection upsert invalidates the provider connection read cache", async () => {
  const readCache = await import("../../src/lib/db/readCache.ts");
  const original = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    email: "cache-upsert@example.com",
    accessToken: "token-a",
    refreshToken: "refresh-a",
    testStatus: "active",
  });

  const primed = await readCache.getCachedProviderConnectionById(original.id);
  assert.equal(primed?.testStatus, "active");

  await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    email: "cache-upsert@example.com",
    accessToken: "token-b",
    refreshToken: "refresh-b",
    testStatus: "retrying",
  });

  const refreshed = await readCache.getCachedProviderConnectionById(original.id);
  assert.equal(refreshed?.testStatus, "retrying");
});

test("staleness regression: getProviderConnections returns fresh data after connection deleted", async () => {
  const readCache = await importFresh("src/lib/db/readCache.ts");

  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Staleness Test",
    apiKey: "sk-stale-test",
  });

  const before = await providersDb.getProviderConnections();
  assert.ok(before.length > 0);
  assert.ok(before.some((c) => c.name === "Staleness Test"));

  await providersDb.deleteProviderConnection(conn.id);

  const after = await providersDb.getProviderConnections();
  assert.equal(after.filter((c) => c.name === "Staleness Test").length, 0);
});

test("staleness regression: getProviderConnections returns fresh data after deleteProviderConnectionsByProvider", async () => {
  const readCache = await importFresh("src/lib/db/readCache.ts");

  await providersDb.createProviderConnection({
    provider: "test-stale-batch",
    authType: "apikey",
    name: "Batch Stale Conn",
    apiKey: "sk-batch-stale",
  });

  const before = await providersDb.getProviderConnections();
  assert.ok(before.some((c) => c.provider === "test-stale-batch"));

  await providersDb.deleteProviderConnectionsByProvider("test-stale-batch");

  const after = await providersDb.getProviderConnections();
  assert.equal(after.filter((c) => c.provider === "test-stale-batch").length, 0);
});

test("getCachedProviderConnectionById caches result and invalidates on connections write", async () => {
  const readCache = await importFresh("src/lib/db/readCache.ts");
  const db = core.getDbInstance();

  await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "Cached Conn",
    apiKey: "sk-cached-conn",
  });

  const allConns = await providersDb.getProviderConnections();
  const id = allConns[allConns.length - 1].id;

  const firstRead = await readCache.getCachedProviderConnectionById(id);
  assert.ok(firstRead);
  assert.equal(firstRead.name, "Cached Conn");

  db.prepare("UPDATE provider_connections SET name = ? WHERE id = ?").run("Stale", id);

  const cachedRead = await readCache.getCachedProviderConnectionById(id);
  assert.equal(cachedRead.name, "Cached Conn");

  readCache.invalidateDbCache("connections");

  const freshRead = await readCache.getCachedProviderConnectionById(id);
  assert.ok(freshRead);
  assert.equal(freshRead.name, "Stale");
});

test("getCachedProviderNodes caches results and invalidates on nodes write", async () => {
  const readCache = await importFresh("src/lib/db/readCache.ts");
  const nodesDb = await importFresh("src/lib/db/providers/nodes.ts");
  const db = core.getDbInstance();
  const now = new Date().toISOString();

  await nodesDb.createProviderNode({
    id: "node-cache-test",
    type: "openai",
    name: "Cached Node",
    baseUrl: "https://cached.example.com",
    createdAt: now,
    updatedAt: now,
  });

  const firstRead = await readCache.getCachedProviderNodes();
  const matching = firstRead.filter((n) => n.id === "node-cache-test");
  assert.equal(matching.length, 1);
  assert.equal(matching[0].name, "Cached Node");

  db.prepare(
    "INSERT INTO provider_nodes (id, type, name, base_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)"
  ).run("node-direct-test", "openai", "Direct Insert Node", "https://direct.example.com", now, now);

  const cachedNodes = await readCache.getCachedProviderNodes();
  const matchingCached = cachedNodes.filter((n) => n.id === "node-direct-test");
  assert.equal(matchingCached.length, 0);

  readCache.invalidateDbCache("nodes");

  const freshNodes = await readCache.getCachedProviderNodes();
  const matchingFresh = freshNodes.filter((n) => n.id === "node-direct-test");
  assert.equal(matchingFresh.length, 1);
  assert.equal(matchingFresh[0].name, "Direct Insert Node");
});

test("PERF-07: canonicalizeFilterKey produces deterministic cache keys regardless of property order", async () => {
  const { canonicalizeFilterKey } = await import("../../src/lib/db/readCache.ts");

  assert.equal(canonicalizeFilterKey(), "all");
  assert.equal(canonicalizeFilterKey(undefined), "all");
  assert.equal(canonicalizeFilterKey({}), "all");

  const key1 = canonicalizeFilterKey({ provider: "openai", status: "active" });
  const key2 = canonicalizeFilterKey({ status: "active", provider: "openai" });
  assert.equal(key1, key2);
  assert.equal(key1, JSON.stringify({ provider: "openai", status: "active" }));

  const nested1 = canonicalizeFilterKey({ outer: { z: 1, a: 2 }, b: 3 });
  const nested2 = canonicalizeFilterKey({ b: 3, outer: { a: 2, z: 1 } });
  assert.equal(nested1, nested2);
  assert.equal(nested1, JSON.stringify({ b: 3, outer: { a: 2, z: 1 } }));
});

test("PERF-07: getCachedProviderConnections shares cache between different key orderings of identical filters", async () => {
  const readCache = await import("../../src/lib/db/readCache.ts");
  const db = core.getDbInstance();
  const now = new Date().toISOString();

  await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "Anthropic-1",
    apiKey: "sk-ant-1",
  });
  const read1 = await readCache.getCachedProviderConnections({
    provider: "anthropic",
    name: "Anthropic-1",
  });
  assert.equal(read1.length, 1);

  db.prepare(
    `INSERT INTO provider_connections (id, provider, auth_type, name, is_active, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run("ant-direct-insert", "anthropic", "apikey", "Anthropic-1", 1, now, now);

  const read2 = await readCache.getCachedProviderConnections({
    name: "Anthropic-1",
    provider: "anthropic",
  });
  assert.equal(read2.length, 1, "Should hit cache due to canonicalized filter key");

  readCache.invalidateDbCache("connections");
  const freshRead = await readCache.getCachedProviderConnections({
    name: "Anthropic-1",
    provider: "anthropic",
  });
  assert.equal(freshRead.length, 2);
});

test("PERF-07: getCachedRawProviderConnections and getCachedProviderNodes share cache across key orders", async () => {
  const readCache = await import("../../src/lib/db/readCache.ts");
  const nodesDb = await import("../../src/lib/db/providers/nodes.ts");
  const db = core.getDbInstance();
  const now = new Date().toISOString();

  await nodesDb.createProviderNode({
    id: "canonical-node-1",
    type: "openai-compatible",
    name: "Custom Node",
    baseUrl: "https://custom.example.com",
    createdAt: now,
    updatedAt: now,
  });
  const nodes1 = await readCache.getCachedProviderNodes({
    type: "openai-compatible",
    name: "Custom Node",
  });
  assert.equal(nodes1.length, 1);

  db.prepare(
    "INSERT INTO provider_nodes (id, type, name, base_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(
    "canonical-node-direct",
    "openai-compatible",
    "Custom Node",
    "https://direct.example.com",
    now,
    now
  );

  const nodes2 = await readCache.getCachedProviderNodes({
    name: "Custom Node",
    type: "openai-compatible",
  });
  assert.equal(nodes2.length, 1, "Should hit cache for reversed key ordering");

  readCache.invalidateDbCache("nodes");
  const freshNodes = await readCache.getCachedProviderNodes({
    name: "Custom Node",
    type: "openai-compatible",
  });
  assert.equal(freshNodes.length, 2);
});
