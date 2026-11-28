/**
 * Characterization of the model-alias, discovery-result and service-model DB helpers.
 * Uses only the long-standing exports so it runs unchanged before and after the
 * repository extraction: stored shapes, managed-marker bookkeeping, provider cascade,
 * catalog cache invalidation, alias resolution precedence, discovery dedupe and
 * ordering, and the service-model availability merge.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "model-catalog-characterization-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const readCache = await import("../../../src/lib/db/readCache.ts");
const models = await import("../../../src/lib/db/models.ts");
const aliases = await import("../../../src/lib/db/models/aliases.ts");
const discovery = await import("../../../src/lib/db/discoveryResults.ts");
const discoveryService = await import("../../../src/lib/discovery/index.ts");
const serviceModels = await import("../../../src/lib/db/serviceModels.ts");
const resolver = await import("../../../src/lib/modelAliasResolver.ts");
const combos = await import("../../../src/lib/db/combos.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
  core.getDbInstance();
  resolver.invalidateAliasCache();
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function kvRows(namespace: string): Array<{ key: string; value: string }> {
  return core
    .getDbInstance()
    .prepare("SELECT key, value FROM key_value WHERE namespace = ? ORDER BY key")
    .all(namespace) as Array<{ key: string; value: string }>;
}

function putKv(namespace: string, key: string, value: string): void {
  core
    .getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run(namespace, key, value);
}

function catalogVersion(): number {
  return readCache.getModelCatalogCacheVersion();
}

// ── Model aliases ───────────────────────────────────────────────────────────

test("aliases: the models.ts barrel re-exports the alias module's functions", () => {
  for (const name of [
    "getModelAliases",
    "setModelAlias",
    "deleteModelAlias",
    "deleteModelAliasesForProvider",
    "getManagedModelAliasNames",
    "markManagedModelAlias",
    "unmarkManagedModelAlias",
  ] as const) {
    assert.equal(models[name], aliases[name], name);
  }
});

test("aliases: targets round-trip as JSON in the modelAliases namespace", async () => {
  assert.deepEqual(await models.getModelAliases(), {});

  await models.setModelAlias("fast", "openai/gpt-4o-mini");
  await models.setModelAlias("pair", ["a/one", "b/two"]);
  await models.setModelAlias("obj", { provider: "anthropic", model: "claude" });
  await models.setModelAlias("fast", "openai/gpt-4o");

  assert.deepEqual(await models.getModelAliases(), {
    fast: "openai/gpt-4o",
    obj: { provider: "anthropic", model: "claude" },
    pair: ["a/one", "b/two"],
  });
  assert.deepEqual(kvRows("modelAliases"), [
    { key: "fast", value: JSON.stringify("openai/gpt-4o") },
    { key: "obj", value: JSON.stringify({ provider: "anthropic", model: "claude" }) },
    { key: "pair", value: JSON.stringify(["a/one", "b/two"]) },
  ]);
});

test("aliases: a corrupt stored target still throws on read", async () => {
  putKv("modelAliases", "broken", "{not json");
  await assert.rejects(() => models.getModelAliases(), SyntaxError);
});

test("aliases: set and delete bump the model-catalog cache version", async () => {
  const v0 = catalogVersion();
  await models.setModelAlias("a", "p/m");
  const v1 = catalogVersion();
  assert.ok(v1 > v0, "set invalidates the catalog");
  await models.deleteModelAlias("missing");
  const v2 = catalogVersion();
  assert.ok(v2 > v1, "delete invalidates even when nothing was stored");
  await models.deleteModelAlias("a");
  assert.ok(catalogVersion() > v2);
});

test("aliases: a write and its catalog invalidation land in the same synchronous turn", async () => {
  const before = catalogVersion();
  const pending = models.setModelAlias("timing", "p/m");
  try {
    assert.deepEqual(kvRows("modelAliases"), [{ key: "timing", value: JSON.stringify("p/m") }]);
    assert.equal(catalogVersion(), before + 1, "no caller may see the row with a stale catalog");
  } finally {
    await pending;
  }
});

test("aliases: delete removes the row and reads the managed names before yielding", async (t) => {
  await models.setModelAlias("timing", "p/m");
  await models.markManagedModelAlias("timing");
  const db = core.getDbInstance();
  const prepare = db.prepare.bind(db);
  const statements: string[] = [];
  t.mock.method(db, "prepare", (sql: string) => {
    statements.push(sql);
    return prepare(sql);
  });
  const pending = models.deleteModelAlias("timing");
  try {
    assert.ok(statements.some((sql) => sql.startsWith("DELETE FROM key_value")));
    assert.ok(
      statements.some((sql) => sql.startsWith("SELECT value") && sql.includes("managedModelAlias")),
      "the managed-name snapshot is taken before the first suspension"
    );
  } finally {
    await pending;
    t.mock.restoreAll();
  }
  assert.deepEqual(await models.getManagedModelAliasNames(), new Set());
});

test("aliases: managed marker writes only on change and is cleared on delete", async () => {
  assert.deepEqual(await models.getManagedModelAliasNames(), new Set());
  assert.deepEqual(kvRows("managedModelAliasNames"), []);

  await models.unmarkManagedModelAlias("ghost");
  assert.deepEqual(kvRows("managedModelAliasNames"), [], "unmark of an absent name writes nothing");

  await models.markManagedModelAlias("m1");
  await models.markManagedModelAlias("m2");
  await models.markManagedModelAlias("m1");
  assert.deepEqual(kvRows("managedModelAliasNames"), [
    { key: "names", value: JSON.stringify(["m1", "m2"]) },
  ]);
  assert.deepEqual(await models.getManagedModelAliasNames(), new Set(["m1", "m2"]));

  // Marking does not touch the catalog cache; only alias row writes do.
  const before = catalogVersion();
  await models.markManagedModelAlias("m3");
  await models.unmarkManagedModelAlias("m3");
  assert.equal(catalogVersion(), before);

  await models.setModelAlias("m1", "p/one");
  await models.deleteModelAlias("m1");
  assert.deepEqual(await models.getManagedModelAliasNames(), new Set(["m2"]));
  assert.deepEqual(kvRows("managedModelAliasNames"), [
    { key: "names", value: JSON.stringify(["m2"]) },
  ]);
});

test("aliases: unreadable managed-name records read as empty", async () => {
  putKv("managedModelAliasNames", "names", "{nope");
  assert.deepEqual(await models.getManagedModelAliasNames(), new Set());
  putKv("managedModelAliasNames", "names", JSON.stringify({ a: 1 }));
  assert.deepEqual(await models.getManagedModelAliasNames(), new Set());
  putKv("managedModelAliasNames", "names", JSON.stringify(["ok", 7, null, "also"]));
  assert.deepEqual(await models.getManagedModelAliasNames(), new Set(["ok", "also"]));
});

test("aliases: provider cascade removes exact-prefix string targets and their markers", async () => {
  await models.setModelAlias("x-fast", "providerX/fast");
  await models.setModelAlias("x-deep", "providerX/deep/nested");
  await models.setModelAlias("xx", "providerXX/other");
  await models.setModelAlias("arr", ["providerX/in-array"]);
  await models.setModelAlias("obj", { provider: "providerX", model: "m" });
  await models.setModelAlias("bare", "providerX");
  await models.markManagedModelAlias("x-fast");
  await models.markManagedModelAlias("xx");

  const before = catalogVersion();
  const removed = await models.deleteModelAliasesForProvider("providerX");
  assert.deepEqual(removed.sort(), ["x-deep", "x-fast"]);
  assert.ok(catalogVersion() > before);
  assert.deepEqual(Object.keys(await models.getModelAliases()).sort(), [
    "arr",
    "bare",
    "obj",
    "xx",
  ]);
  assert.deepEqual(await models.getManagedModelAliasNames(), new Set(["xx"]));

  const unchanged = catalogVersion();
  assert.deepEqual(await models.deleteModelAliasesForProvider("nobody"), []);
  assert.equal(catalogVersion(), unchanged, "an empty cascade writes nothing");
});

test("aliases: provider-scoped aliases keep their own namespace and empty-map cleanup", () => {
  assert.deepEqual(aliases.getProviderAliases("p"), {});
  aliases.setProviderAlias("p", "fast", "m-1");
  aliases.setProviderAlias("p", "best", "m-2");
  assert.deepEqual(aliases.getProviderAliases("p"), { fast: "m-1", best: "m-2" });
  aliases.removeProviderAlias("p", "missing");
  aliases.removeProviderAlias("p", "fast");
  assert.deepEqual(kvRows("providerAliases"), [
    { key: "p", value: JSON.stringify({ best: "m-2" }) },
  ]);
  aliases.removeProviderAlias("p", "best");
  assert.deepEqual(kvRows("providerAliases"), []);
  assert.deepEqual(kvRows("modelAliases"), [], "provider-scoped writes never touch modelAliases");
});

test("resolver: combo beats stored alias beats seed fallback; array and object targets", async () => {
  await models.setModelAlias("my-alias", "openai/gpt-4o");
  await models.setModelAlias("multi", ["anthropic/claude", "openai/gpt-4o"]);
  await models.setModelAlias("objtarget", { provider: "gemini", model: "flash" });
  // A stored alias overrides the shipped seed for the same name.
  await models.setModelAlias("gemini-3.1-pro", "custom/override");
  await combos.createCombo({ name: "my-combo", models: ["openai/gpt-4o"] });
  await models.setModelAlias("my-combo", "openai/should-not-win");
  resolver.invalidateAliasCache();

  const resolve = resolver.resolveModelAliasWithSeedFallback;
  assert.equal(await resolve("my-alias"), "openai/gpt-4o");
  assert.equal(await resolve("multi"), "anthropic/claude");
  assert.equal(await resolve("objtarget"), "gemini/flash");
  assert.equal(await resolve("gemini-3.1-pro"), "custom/override");
  assert.equal(await resolve("claude-sonnet-4-6"), "agy/claude-sonnet-4-6");
  assert.equal(await resolve("my-combo"), "my-combo");
  assert.equal(await resolve("combo/anything"), "combo/anything");
  assert.equal(await resolve("unknown-model"), "unknown-model");
  assert.equal(await resolve(""), "");
});

// ── Discovery results ───────────────────────────────────────────────────────

test("discovery: upsert dedupes on (provider, method, endpoint) and keeps id and dates", () => {
  const first = discovery.upsertDiscoveryResult({
    providerId: "acme",
    method: "free_tier",
    endpoint: "https://acme.example/v1",
    authType: "none",
    models: ["a", "b"],
    feasibility: 3,
    riskLevel: "low",
    status: "pending",
  });
  assert.equal(typeof first.id, "number");
  assert.deepEqual(first.models, ["a", "b"]);
  assert.equal(first.rateLimit, null);
  assert.equal(first.notes, null);
  assert.equal(first.verifiedAt, null);

  const verified = discovery.markVerified(first.id!);
  assert.equal(verified?.status, "verified");
  assert.ok(verified?.verifiedAt);

  const again = discovery.upsertDiscoveryResult({
    providerId: "acme",
    method: "free_tier",
    endpoint: "https://acme.example/v1",
    authType: "api_key",
    feasibility: 5,
    riskLevel: "medium",
    status: "testing",
    notes: "rescanned",
  });
  assert.equal(again.id, first.id);
  assert.equal(again.discoveredAt, first.discoveredAt);
  assert.equal(again.verifiedAt, verified?.verifiedAt, "re-discovery keeps the verified stamp");
  assert.equal(again.status, "testing");
  assert.equal(again.authType, "api_key");
  assert.equal(again.models, undefined, "omitted models are cleared");
  assert.equal(again.notes, "rescanned");
  assert.equal(discovery.getDiscoveryResults().length, 1);
});

test("discovery: NULL endpoints never conflict, but the read-back still finds a row", () => {
  const a = discovery.upsertDiscoveryResult({
    providerId: "p",
    method: "trial",
    authType: "none",
    feasibility: 1,
    riskLevel: "none",
    status: "pending",
  });
  const b = discovery.upsertDiscoveryResult({
    providerId: "p",
    method: "trial",
    endpoint: null,
    authType: "none",
    feasibility: 2,
    riskLevel: "none",
    status: "pending",
  });
  assert.equal(a.endpoint, null);
  assert.equal(b.endpoint, null);
  // SQLite UNIQUE treats NULLs as distinct, so the second upsert inserts a new row.
  assert.equal(discovery.getDiscoveryResults("p").length, 2);
});

test("discovery: ordering, provider filter, lookups, verify and delete", () => {
  const db = core.getDbInstance();
  const mk = (providerId: string, endpoint: string) =>
    discovery.upsertDiscoveryResult({
      providerId,
      method: "public_api",
      endpoint,
      authType: "none",
      feasibility: 2,
      riskLevel: "none",
      status: "pending",
    });
  const older = mk("p1", "e1");
  const newer = mk("p1", "e2");
  const other = mk("p2", "e3");
  db.prepare("UPDATE discovery_results SET discovered_at = ? WHERE id = ?").run(
    "2020-01-01 00:00:00",
    older.id
  );
  db.prepare("UPDATE discovery_results SET discovered_at = ? WHERE id IN (?, ?)").run(
    "2024-01-01 00:00:00",
    newer.id,
    other.id
  );

  assert.deepEqual(
    discovery.getDiscoveryResults().map((r) => r.id),
    [other.id, newer.id, older.id],
    "newest first, then id descending"
  );
  assert.deepEqual(
    discovery.getDiscoveryResults("p1").map((r) => r.id),
    [newer.id, older.id]
  );
  assert.deepEqual(discovery.getDiscoveryResults(""), discovery.getDiscoveryResults());

  assert.equal(discovery.getDiscoveryResultById(999_999), null);
  assert.equal(discovery.markVerified(999_999), null);
  assert.equal(discovery.deleteDiscoveryResult(other.id!), true);
  assert.equal(discovery.deleteDiscoveryResult(other.id!), false);
  assert.equal(discovery.getDiscoveryResultById(other.id!), null);
});

test("discovery: stored rows are normalized on read", () => {
  core
    .getDbInstance()
    .prepare(
      "INSERT INTO discovery_results (provider_id, method, endpoint, auth_type, models, feasibility, risk_level) " +
        "VALUES ('raw', 'trial', 'e', NULL, ?, NULL, NULL)"
    )
    .run('[1, "two"]');
  core
    .getDbInstance()
    .prepare(
      "INSERT INTO discovery_results (provider_id, method, endpoint, models) VALUES ('raw', 'trial', 'bad', '{oops')"
    )
    .run();
  const [bad, good] = discovery
    .getDiscoveryResults("raw")
    .sort((x, y) => (x.endpoint ?? "").localeCompare(y.endpoint ?? ""));
  assert.equal(bad.models, undefined, "corrupt JSON models read as undefined");
  assert.deepEqual(good.models, ["1", "two"]);
  assert.equal(good.authType, "none");
  assert.equal(good.riskLevel, "none");
  assert.equal(good.feasibility, 0);
  assert.equal(good.status, "pending");
});

test("discovery: the service layer writes and reads through the DB module", () => {
  const persisted = discoveryService.persistDiscoveryResult({
    providerId: "svc",
    method: "web_cookie",
    endpoint: "https://svc.example",
    authType: "cookie",
    feasibility: 4,
    riskLevel: "high",
    status: "pending",
  });
  assert.deepEqual(discoveryService.getDiscoveryResults("svc"), [persisted]);
  assert.deepEqual(discovery.getDiscoveryResults("svc"), [persisted]);
});

// ── Service models ──────────────────────────────────────────────────────────

test("service models: availability merge keeps incoming order, then pruned rows", () => {
  serviceModels.saveServiceModels("tool", [
    { id: "a", name: "A" },
    { id: "b", available: false },
  ]);
  serviceModels.saveServiceModels("tool", [{ id: "c" }, { id: "a", name: "A2" }]);
  assert.deepEqual(serviceModels.getServiceModels("tool"), [
    { id: "c", available: true },
    { id: "a", name: "A2", available: true },
    { id: "b", available: false },
  ]);
  serviceModels.saveServiceModels("tool", []);
  assert.deepEqual(serviceModels.getServiceModels("tool"), [
    { id: "c", available: false },
    { id: "a", name: "A2", available: false },
    { id: "b", available: false },
  ]);
});

test("service models: an empty merge deletes the row; markAllUnavailable is scoped", () => {
  serviceModels.saveServiceModels("empty", []);
  assert.deepEqual(kvRows("serviceModels"), []);

  serviceModels.saveServiceModels("one", [{ id: "x" }]);
  serviceModels.saveServiceModels("two", [{ id: "y" }]);
  serviceModels.markAllUnavailable("one");
  serviceModels.markAllUnavailable("missing");
  assert.deepEqual(kvRows("serviceModels"), [
    { key: "one", value: JSON.stringify([{ id: "x", available: false }]) },
    { key: "two", value: JSON.stringify([{ id: "y", available: true }]) },
  ]);
});

test("service models: unreadable stored lists read as empty and are overwritten", () => {
  putKv("serviceModels", "tool", "{nope");
  assert.deepEqual(serviceModels.getServiceModels("tool"), []);
  putKv("serviceModels", "tool", JSON.stringify({ id: "obj" }));
  assert.deepEqual(serviceModels.getServiceModels("tool"), []);
  serviceModels.markAllUnavailable("tool");
  assert.deepEqual(kvRows("serviceModels"), [
    { key: "tool", value: JSON.stringify({ id: "obj" }) },
  ]);
  serviceModels.saveServiceModels("tool", [{ id: "n" }]);
  assert.deepEqual(serviceModels.getServiceModels("tool"), [{ id: "n", available: true }]);
});

test("service models: writes never touch the model-catalog cache version", () => {
  const before = catalogVersion();
  serviceModels.saveServiceModels("tool", [{ id: "a" }]);
  serviceModels.markAllUnavailable("tool");
  serviceModels.saveServiceModels("tool", []);
  assert.equal(catalogVersion(), before);
});
