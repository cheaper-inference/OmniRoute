import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "kimi-corrections-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "kimi-corrections-fixture";
process.env.PROXY_AUTO_SELECT_ENABLED = "false";
delete process.env.PROXY_FAIL_OPEN;
const core = await import("../../../src/lib/db/core.ts");
const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");
const models = await import("../../../src/lib/db/models.ts");
const settings = await import("../../../src/lib/db/settings.ts");
const domain = await import("../../../src/lib/db/domainState.ts");
const groups = await import("../../../src/lib/db/apiKeyGroups.ts");
const { readKimiBudgetHistory } = await import("../../../src/lib/db/kimiBudgetHistory.ts");
const { resolveModelAliasFromMap } = await import("../../../open-sse/services/model.ts");
let db: ReturnType<typeof core.getDbInstance>;
function kv(namespace: string, key: string, value: unknown) {
  db.prepare("INSERT OR REPLACE INTO key_value(namespace,key,value) VALUES(?,?,?)").run(
    namespace,
    key,
    JSON.stringify(value)
  );
}
function migrate() {
  runMigrations(db);
}
test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
  db = core.getDbInstance();
  db.prepare("DELETE FROM _omniroute_migrations WHERE version='242'").run();
  settings.bumpProxyConfigGeneration();
});
test.afterEach(() => core.resetDbInstance());
test.after(() => fs.rmSync(dataDir, { recursive: true, force: true }));

test("C1 synced name/model/id identities retain canonical metadata and disjoint fields through reader", async () => {
  kv("syncedAvailableModels", "moonshot:c", [
    { name: " shared ", supportsTools: true, supportedEndpoints: ["chat"], outputTokenLimit: 12 },
    { model: "other", supportsTools: false },
  ]);
  kv("syncedAvailableModels", "kimi:c", [
    { id: "shared", supportsTools: false, supportedInputTypes: [], inputTokenLimit: 24 },
    { id: "other", supportsTools: true },
  ]);
  migrate();
  const rows = await models.getSyncedAvailableModelsForConnection("kimi", "c");
  assert.equal(rows.length, 2);
  assert.equal(rows.find((r) => r.id === "shared")?.supportsTools, false);
  assert.deepEqual(rows.find((r) => r.id === "shared")?.supportedInputTypes, []);
  assert.equal(rows.find((r) => r.id === "shared")?.outputTokenLimit, 12);
  assert.equal(rows.find((r) => r.id === "other")?.supportsTools, true);
});
test("C1 custom model nested arrays keep explicit canonical values including empty arrays", async () => {
  kv("customModels", "moonshot", [
    {
      id: "shared",
      source: "manual",
      supportedEndpoints: ["responses"],
      supportedInputTypes: ["image"],
      legacy: 1,
    },
  ]);
  kv("customModels", "kimi", [
    { id: "shared", source: "manual", supportedEndpoints: ["chat"], supportedInputTypes: [] },
  ]);
  migrate();
  assert.deepEqual(await models.getCustomModels("kimi"), [
    {
      id: "shared",
      source: "manual",
      supportedEndpoints: ["chat"],
      supportedInputTypes: [],
      legacy: 1,
    },
  ]);
});
test("C1 real fallback entries preserve canonical disabled/priority rather than reenable legacy", async () => {
  domain.saveFallbackChain("moonshot/correction", [
    { provider: "moonshot", priority: 1, enabled: true },
    { provider: "openai", priority: 3, enabled: true },
  ]);
  domain.saveFallbackChain("kimi/correction", [{ provider: "kimi", priority: 9, enabled: false }]);
  migrate();
  const fallback = await import("../../../src/domain/fallbackPolicy.ts");
  assert.deepEqual(fallback.resolveFallbackChain("kimi/correction"), [
    { provider: "openai", priority: 3, enabled: true },
  ]);
  assert.deepEqual(domain.loadFallbackChain("kimi/correction"), [
    { provider: "openai", priority: 3, enabled: true },
    { provider: "kimi", priority: 9, enabled: false },
  ]);
});
test("C3 production proxy writer retains provider assignment at effective connection reader", async () => {
  db.prepare(
    "INSERT INTO provider_connections(id,provider,proxy_enabled,created_at,updated_at) VALUES('proxy-conn','moonshot',1,'old','old')"
  ).run();
  await settings.setProxyForLevel("global", null, { type: "http", host: "global.test", port: 80 });
  await settings.setProxyForLevel("provider", "moonshot", {
    type: "http",
    host: "old.test",
    port: 81,
    username: "old",
  });
  await settings.setProxyForLevel("provider", "kimi", {
    type: "http",
    host: "canonical.test",
    port: 82,
  });
  await settings.setProxyForLevel("provider", "openai", {
    type: "http",
    host: "unrelated.test",
    port: 83,
  });
  await settings.setProxyForLevel("key", "other-conn", {
    type: "http",
    host: "connection.test",
    port: 84,
  });
  migrate();
  const config = await settings.getProxyConfig();
  assert.equal(config.providers.moonshot, undefined);
  assert.equal((config.providers.kimi as Record<string, unknown>).host, "canonical.test");
  assert.equal((config.providers.kimi as Record<string, unknown>).username, "old");
  assert.equal((config.providers.openai as Record<string, unknown>).host, "unrelated.test");
  assert.equal((config.keys["other-conn"] as Record<string, unknown>).host, "connection.test");
  assert.equal((config.global as Record<string, unknown>).host, "global.test");
  assert.equal((await settings.resolveProxyForConnection("proxy-conn")).level, "provider");
});
test("C4 model history retains exact wire matches and family suffix; provider partitions retain the upper bound", () => {
  const start = Date.UTC(2026, 10, 12),
    end = start + 5000;
  const add = (provider: string | null, model: string, tokens: number, at = start + 1000) =>
    db
      .prepare(
        "INSERT INTO usage_history(provider,model,api_key_id,timestamp,tokens_input) VALUES(?,?,?,?,?)"
      )
      .run(provider, model, "key", new Date(at).toISOString(), tokens);
  add("api-airforce", "moonshot/vendor", 100);
  add("openrouter", "kimi/vendor", 200);
  add("moonshot", "kimi/vendor", 2);
  add("kimi", "moonshot/vendor", 3);
  add("moonshot", "vendor", 5);
  add("kimi", "vendor", 7);
  add(null, "moonshot/vendor", 11);
  add("kimi", "vendor", 1000, end);
  assert.equal(readKimiBudgetHistory(db, "key", "model", "kimi/vendor", start, end), 214);
  assert.equal(readKimiBudgetHistory(db, "key", "model", "moonshot/vendor", start, end), 126);
  assert.equal(readKimiBudgetHistory(db, "key", "provider", "kimi", start, end, "moonshot"), 7);
  assert.equal(readKimiBudgetHistory(db, "key", "provider", "kimi", start, end, "kimi"), 10);
});
test("C4 unrelated group wire pattern retains its original grant without broadening", async () => {
  const apiKeys = await import("../../../src/lib/db/apiKeys.ts");
  const key = await apiKeys.createApiKey("wire group", "fixture");
  const group = groups.createKeyGroup("vendor");
  assert.equal(groups.addKeyToGroup(key.id, group.id), true);
  groups.addGroupPermission(group.id, "moonshot/vendor", "allow", "openrouter");
  assert.equal(groups.checkKeyModelAccess(key.id, "moonshot/vendor", "openrouter").allowed, true);
  assert.equal(groups.checkKeyModelAccess(key.id, "kimi/vendor", "openrouter").allowed, false);
  migrate();
  assert.equal(groups.getGroupPermissions(group.id)[0].modelPattern, "moonshot/vendor");
  assert.equal(groups.checkKeyModelAccess(key.id, "moonshot/vendor", "openrouter").allowed, true);
  assert.equal(groups.checkKeyModelAccess(key.id, "kimi/vendor", "openrouter").allowed, false);
});
test("C7 ordinary alias syntax and managed provenance survive canonical-name collisions", async () => {
  await models.setModelAlias("provider:moonshot", "openai/gpt-4o");
  await models.setModelAlias("provider:kimi", "anthropic/claude");
  await models.setModelAlias("model:moonshot/vendor", "openai/other");
  await models.setModelAlias("moonshot/vendor", "moonshot/vendor");
  kv("managedModelAliasNames", "names", [
    "provider:moonshot",
    "model:moonshot/vendor",
    "moonshot/vendor",
  ]);
  migrate();
  const aliases = await models.getModelAliases();
  assert.deepEqual(resolveModelAliasFromMap("provider:moonshot", aliases), {
    provider: "openai",
    model: "gpt-4o",
  });
  assert.deepEqual(resolveModelAliasFromMap("provider:kimi", aliases), {
    provider: "anthropic",
    model: "claude",
  });
  assert.equal(aliases["model:moonshot/vendor"], "openai/other");
  assert.equal(aliases["kimi/vendor"], "kimi/vendor");
  assert.deepEqual(
    JSON.parse(
      db.prepare("SELECT value FROM key_value WHERE namespace='managedModelAliasNames'").get()!
        .value as string
    ),
    ["provider:moonshot", "model:moonshot/vendor", "kimi/vendor"]
  );
});

test("C8 shared quota provider selection survives migration and later legacy settings", async () => {
  const selfSettings = await import("../../../src/lib/db/apiKeySelfServiceSettings.ts");
  const accounts = await import("../../../src/lib/usage/apiKeySelfServiceAccounts.ts");
  db.prepare(
    "INSERT INTO provider_connections(id,provider,is_active,created_at,updated_at) VALUES('shared','moonshot',1,'old','old'),('other','openrouter',1,'old','old')"
  ).run();
  for (const [id, value] of [
    ["key", JSON.stringify(["moonshot", "openrouter"])],
    ["empty", "[]"],
    ["bad", "{broken"],
  ])
    db.prepare(
      "INSERT INTO api_key_self_service_settings(api_key_id,shared_quota_providers,anthropic_ratelimit_headers) VALUES(?,?,'forward')"
    ).run(id, value);
  migrate();
  assert.deepEqual(selfSettings.getApiKeySelfServiceSettings("key").sharedQuotaProviders, [
    "kimi",
    "openrouter",
  ]);
  assert.deepEqual(selfSettings.getApiKeySelfServiceSettings("empty").sharedQuotaProviders, []);
  assert.equal(
    db
      .prepare(
        "SELECT shared_quota_providers FROM api_key_self_service_settings WHERE api_key_id='bad'"
      )
      .get()?.shared_quota_providers,
    "{broken"
  );
  const deps = {
    getProviderConnections: async () => [{ id: "shared", provider: "kimi", isActive: true }],
    getProviderConnectionById: async () => null,
    getProviderLimitsCache: () => null,
    fetchAndPersistProviderLimits: async () => null,
    now: () => Date.now(),
    quotaRefreshTracker: accounts.createQuotaRefreshTracker(),
  };
  for (const sharedQuotaProviders of [["moonshot"], ["kimi"]]) {
    const entries = await accounts.resolveAccountQuotaEntries(
      { allowedConnections: [], sharedQuotaProviders },
      deps
    );
    assert.equal(entries.length, 1);
    assert.equal(entries[0].connectionId, "shared");
  }
  const providerDb = await import("../../../src/lib/db/providers.ts");
  db.prepare(
    "INSERT INTO provider_connections(id,provider,is_active,created_at,updated_at) VALUES('later-shared','moonshot',1,'old','old')"
  ).run();
  selfSettings.updateApiKeySelfServiceSettings("selected", { sharedQuotaProviders: ["kimi"] });
  const selected = selfSettings.getApiKeySelfServiceSettings("selected");
  assert.deepEqual(selected.sharedQuotaProviders, ["kimi"]);
  const actualEntries = await accounts.resolveAccountQuotaEntries(
    { allowedConnections: [], sharedQuotaProviders: selected.sharedQuotaProviders },
    { ...deps, getProviderConnections: () => providerDb.getProviderConnections({ isActive: true }) }
  );
  assert.deepEqual(actualEntries.map((entry) => entry.connectionId).sort(), [
    "later-shared",
    "shared",
  ]);
  assert.deepEqual(
    await accounts.resolveAccountQuotaEntries(
      { allowedConnections: [], sharedQuotaProviders: [] },
      deps
    ),
    []
  );
});

test("C9 provider-scoped wire IDs remain distinct in overrides, mappings and discovery", async () => {
  const context = await import("../../../src/lib/db/modelContextOverrides.ts");
  const capabilities = await import("../../../src/lib/db/modelCapabilityOverrides.ts");
  const discovery = await import("../../../src/lib/db/discoveryResults.ts");
  const proxy = await import("../../../src/lib/db/upstreamProxy.ts");
  const { applyCliproxyapiModelMapping } =
    await import("../../../open-sse/handlers/chatCore/cliproxyModelMapping.ts");
  for (const [model, value] of [
    ["moonshot/custom", 8192],
    ["kimi/custom", 16384],
  ] as const) {
    context.setModelContextOverride("moonshot", model, value, "manual");
    assert.equal(
      capabilities.setModelCapabilityOverride("moonshot/" + model, "max_input_tokens", value),
      true
    );
    db.prepare(
      "INSERT INTO model_capabilities(provider,model_id,tool_call) VALUES('moonshot',?,?)"
    ).run(model, value === 8192 ? 1 : 0);
    db.prepare("INSERT INTO tier_assignments(provider,model,tier) VALUES('moonshot',?,?)").run(
      model,
      value === 8192 ? "cheap" : "free"
    );
  }
  db.prepare(
    "INSERT INTO upstream_proxy_config(provider_id,cliproxyapi_model_mapping) VALUES('moonshot',?)"
  ).run(JSON.stringify({ "moonshot/custom": "moonshot/wire", "kimi/custom": "kimi/wire" }));
  discovery.upsertDiscoveryResult({
    providerId: "moonshot",
    method: "public_api",
    endpoint: "fixture",
    authType: "api_key",
    models: ["moonshot/custom", "kimi/custom"],
    feasibility: 1,
    riskLevel: "none",
    status: "pending",
  });
  migrate();
  for (const [model, value] of [
    ["moonshot/custom", 8192],
    ["kimi/custom", 16384],
  ] as const) {
    assert.equal(context.getModelContextOverrideRecord("kimi", model)?.realContext, value);
    assert.equal(capabilities.getModelCapabilityOverride("kimi", model, "max_input_tokens"), value);
    assert.equal(
      db
        .prepare("SELECT tool_call FROM model_capabilities WHERE provider='kimi' AND model_id=?")
        .get(model)?.tool_call,
      value === 8192 ? 1 : 0
    );
    assert.equal(
      db.prepare("SELECT tier FROM tier_assignments WHERE provider='kimi' AND model=?").get(model)
        ?.tier,
      value === 8192 ? "cheap" : "free"
    );
    const config = await proxy.getUpstreamProxyConfig("kimi");
    assert.equal(
      applyCliproxyapiModelMapping({ model, body: { model } }, config?.cliproxyapiModelMapping)
        .model,
      model.replace("custom", "wire")
    );
  }
  assert.deepEqual(discovery.getDiscoveryResults("kimi")[0].models, [
    "moonshot/custom",
    "kimi/custom",
  ]);
});
