import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import { createTempDataDir } from "../_setup/tempDataDir.ts";

const { cleanup } = createTempDataDir("omniroute-catalog-key-share-");
process.env.API_KEY_SECRET = "catalog-key-share-test-secret";
const envKey = ["env", "master", Math.random().toString(36).slice(2)].join("-");
process.env.OMNIROUTE_API_KEY = envKey;

const cache = await import("../../src/app/api/v1/models/catalogCache.ts");
const apiKeys = await import("../../src/lib/db/apiKeys.ts");
const groups = await import("../../src/lib/db/apiKeyGroups.ts");

const headers = { corsHeaders: {}, diagnosticHeaders: {} };
const request = (key: string) =>
  new Request("http://localhost/v1/models", { headers: { authorization: `Bearer ${key}` } });
let built = 0;
async function resolve(key: string, label = "built") {
  const response = await cache.resolveCachedCatalogResponse(request(key), headers, async () => ({
    body: `${label}-${++built}`,
    headers: {},
    status: 200,
    cacheTTL: 60_000,
  }));
  return response.text();
}
const restricted = { modelAccessMode: "restricted" as const, allowedModels: ["openai/*"] };
async function newKey(name: string, options: Parameters<typeof apiKeys.createApiKey>[3] = {}) {
  return (await apiKeys.createApiKey(name, "machine-share", [], options)).key as string;
}

test.beforeEach(() => {
  built = 0;
  cache.__resetCatalogBuilderRunsForTest();
});
test.after(cleanup);

test("keys with identical effective permissions share one cache entry", async () => {
  const a = await newKey("share-a", restricted);
  const b = await newKey("share-b", restricted);
  const first = await resolve(a);
  assert.equal(await resolve(b), first, "second key must be served the shared entry");
  assert.equal(cache.__getCatalogBuilderRunsForTest(), 1);
});

test("many equal keys keep one retained entry, not one per key", async () => {
  for (let i = 0; i < 20; i++) await resolve(await newKey(`bulk-${i}`, restricted));
  assert.equal(cache.__getCatalogCacheStatsForTest().cache.entries, 1);
  assert.equal(cache.__getCatalogBuilderRunsForTest(), 1);
});

test("keys with different permissions never share an entry", async () => {
  const a = await newKey("diff-a", restricted);
  const b = await newKey("diff-b", { ...restricted, allowedModels: ["anthropic/*"] });
  const c = await newKey("diff-c");
  const bodies = [await resolve(a), await resolve(b), await resolve(c)];
  assert.equal(new Set(bodies).size, 3);
  assert.equal(cache.__getCatalogBuilderRunsForTest(), 3);
});

test("equal permissions with different group membership never share", async () => {
  const a = await newKey("group-a", restricted);
  const b = await newKey("group-b", restricted);
  const meta = await apiKeys.getApiKeyMetadata(b);
  const group = groups.createKeyGroup("share-guard-group");
  groups.addGroupPermission(group.id, "openai/gpt-4o", "deny");
  groups.addKeyToGroup(meta!.id, group.id);
  cache.__resetCatalogBuilderRunsForTest();
  const bodyA = await resolve(a);
  const bodyB = await resolve(b);
  assert.notEqual(bodyA, bodyB, "a grouped key must not read the ungrouped key's catalog");
  assert.equal(cache.__getCatalogBuilderRunsForTest(), 2);
});

test("a permission change moves the key off the shared entry", async () => {
  const a = await newKey("move-a", restricted);
  const b = await newKey("move-b", restricted);
  const shared = await resolve(a);
  assert.equal(await resolve(b), shared);
  const meta = await apiKeys.getApiKeyMetadata(b);
  await apiKeys.updateApiKeyPermissions(meta!.id, { allowedModels: ["anthropic/*"] });
  const afterB = await resolve(b, "after-b");
  assert.match(afterB, /^after-b-/);
  assert.notEqual(await resolve(a, "after-a"), afterB);
});

test("the environment key never shares with a database key of equal fields", async () => {
  const db = await newKey("db-default");
  const fromDb = await resolve(db);
  const fromEnv = await resolve(envKey, "env");
  assert.notEqual(fromEnv, fromDb);
  assert.equal(cache.__getCatalogBuilderRunsForTest(), 2);
});

test("an unknown key stays isolated and no cache key holds a raw secret", async () => {
  const unknownA = ["unknown", "a", Math.random().toString(36).slice(2)].join("-");
  const unknownB = ["unknown", "b", Math.random().toString(36).slice(2)].join("-");
  const bodyA = await resolve(unknownA);
  assert.notEqual(await resolve(unknownB), bodyA);
  assert.equal(await resolve(unknownA, "unused"), bodyA);
});

test("every key field the catalog sources read is part of the signature", () => {
  const dir = path.resolve("src/app/api/v1/models");
  const known = new Set<string>([...cache.CATALOG_KEY_SIGNATURE_FIELDS, "id"]);
  const read = new Set<string>();
  for (const file of fs.readdirSync(dir).filter((name) => name.endsWith(".ts"))) {
    const source = fs.readFileSync(path.join(dir, file), "utf8");
    for (const m of source.matchAll(/\b(?:key|earlyKey)Meta\??\.(\w+)/gi)) read.add(m[1]);
  }
  assert.ok(read.size > 5, "the scan must find the catalog's key-field reads");
  assert.deepEqual([...read].filter((field) => !known.has(field)).sort(), []);
});
