import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "kimi-auto-compat-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET ||= "kimi-auto-compat-fixture";
const core = await import("../../../src/lib/db/core.ts");
const providers = await import("../../../src/lib/db/providers.ts");
const factory = await import("../../../open-sse/services/autoCombo/virtualFactory.ts");
const strategy = await import("../../../open-sse/services/combo/autoStrategy.ts");
const models = await import("../../../src/lib/db/models.ts");
const apiKeys = await import("../../../src/lib/db/apiKeys.ts");
const { findPublishedModel } = await import("../../../src/lib/db/apiKeys/publishedModelLookup.ts");
const { getModelsByProviderId } = await import("../../../open-sse/config/providerModels.ts");
const { getComboBuilderOptions } = await import("../../../src/lib/combos/builderOptions.ts");

type Target = Parameters<typeof strategy.expandAutoComboCandidatePool>[0][number];

test.beforeEach(() => {
  core.resetDbInstance();
  apiKeys.resetApiKeyState();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.afterEach(() => {
  core.resetDbInstance();
  apiKeys.resetApiKeyState();
});
test.after(() => fs.rmSync(dataDir, { recursive: true, force: true }));

async function connection(provider: string, extra: Record<string, unknown> = {}) {
  return (await providers.createProviderConnection({
    provider,
    authType: "apikey",
    name: provider,
    apiKey: "fixture",
    ...extra,
  })) as { id: string; provider: string };
}
function kv(namespace: string, key: string, value: unknown, raw = false) {
  core
    .getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value(namespace,key,value) VALUES(?,?,?)")
    .run(namespace, key, raw ? value : JSON.stringify(value));
}
function native<T extends { provider?: string; providerId?: string }>(rows: T[]) {
  return rows.filter((row) => ["kimi", "moonshot"].includes(row.provider ?? row.providerId ?? ""));
}
async function pool() {
  return native((await factory.prepareVirtualAutoComboInputs()).regularCandidates);
}
async function expand(
  scope: string[] | null = null,
  targets: Target[] = [],
  combo = { config: {} }
) {
  return strategy.expandAutoComboCandidatePool(targets, combo, scope);
}
function target(provider: string, model: string, connectionId: string | null = null): Target {
  const modelStr = provider + "/" + model;
  return {
    kind: "model",
    stepId: modelStr,
    executionKey: modelStr,
    modelStr,
    provider,
    providerId: provider,
    connectionId,
    weight: 1,
    label: null,
  };
}

test("later legacy account contributes canonical native static targets with its exact ID", async () => {
  const legacy = await connection("moonshot", { defaultModel: "kimi-k2.5" });
  const candidate = (await pool()).find((row) => row.modelStr === "kimi/kimi-k3.1-pro");
  assert.ok(candidate);
  assert.equal(candidate.provider, "kimi");
  assert.deepEqual(candidate.allowedConnectionIds, [legacy.id]);
  const expanded = (await expand()).find((row) => row.modelStr === "kimi/kimi-k3.1-pro");
  assert.ok(expanded);
  assert.deepEqual(expanded.allowedConnectionIds, [legacy.id]);
});

test("mixed family keeps synced ownership and literal wire exclusions in both inferred paths", async () => {
  const legacy = await connection("moonshot", {
    defaultModel: "moonshot/custom",
    providerSpecificData: { excludedModels: ["moonshot/custom"] },
  });
  const canonical = await connection("kimi", { defaultModel: "kimi/custom" });
  kv("syncedAvailableModels", "moonshot:" + legacy.id, [{ id: "legacy-only" }]);
  kv("syncedAvailableModels", "kimi:" + canonical.id, [{ id: "canonical-only" }]);
  kv("customModels", "moonshot", [{ id: "moonshot/custom" }, { id: "kimi/custom" }]);
  for (const rows of [
    (await pool()).map((row) => ({ modelStr: row.modelStr, ids: row.allowedConnectionIds })),
    native(await expand()).map((row) => ({
      modelStr: row.modelStr,
      ids: row.allowedConnectionIds,
    })),
  ]) {
    assert.deepEqual(rows.find((r) => r.modelStr === "kimi/legacy-only")?.ids, [legacy.id]);
    assert.deepEqual(rows.find((r) => r.modelStr === "kimi/canonical-only")?.ids, [canonical.id]);
    assert.deepEqual(rows.find((r) => r.modelStr === "kimi/moonshot/custom")?.ids, [canonical.id]);
    assert.deepEqual(
      [...(rows.find((r) => r.modelStr === "kimi/kimi/custom")?.ids ?? [])].sort(),
      [legacy.id, canonical.id].sort()
    );
    assert.equal(
      rows.some((row) => row.modelStr.startsWith("moonshot/")),
      false
    );
  }
  const scoped = native(await expand([legacy.id]));
  assert.equal(
    scoped.some((row) => row.modelStr === "kimi/canonical-only"),
    false
  );
  assert.equal(
    scoped.some((row) => row.modelStr === "kimi/moonshot/custom"),
    false
  );
  assert.ok(scoped.every((row) => row.connectionId === legacy.id));
});

test("restricted explicit aliases preserve target fields, pins and intersected step allowlists", async () => {
  const legacy = await connection("moonshot");
  const canonical = await connection("kimi");
  const pinned = target("kimi", "moonshot/custom", legacy.id);
  const oldPinned = target("moonshot", "kimi/custom", canonical.id);
  const denied = { ...target("kimi", "denied"), allowedConnectionIds: [canonical.id] };
  const result = await expand([legacy.id], [pinned, oldPinned, denied], {
    config: { auto: { candidatePool: ["kimi"] } },
  });
  assert.equal(result.length, 1);
  assert.equal(result[0].modelStr, "kimi/moonshot/custom");
  assert.equal(result[0].provider, "kimi");
  assert.equal(result[0].connectionId, legacy.id);
  assert.deepEqual(result[0].allowedConnectionIds, [legacy.id]);
  const reverse = await expand([canonical.id], [oldPinned], {
    config: { auto: { candidatePool: ["kimi"] } },
  });
  assert.equal(reverse[0]?.modelStr, "moonshot/kimi/custom");
  assert.equal(reverse[0]?.provider, "moonshot");
  assert.equal(reverse[0]?.connectionId, canonical.id);
});

for (const kind of ["static", "custom", "default"]) {
  test(
    "free-only siblings cannot inherit paid " + kind + " capacity in either inferred path",
    async () => {
      const model = kind === "static" ? "kimi-k3.1-pro" : "moonshot/" + kind;
      const paid = await connection("moonshot", { defaultModel: model });
      const free = await connection("kimi", {
        defaultModel: model,
        providerSpecificData: { importFreeModelsOnly: true },
      });
      core
        .getDbInstance()
        .prepare("UPDATE provider_connections SET synced_models_at=? WHERE id=?")
        .run(new Date().toISOString(), free.id);
      kv("syncedAvailableModels", "kimi:" + free.id, []);
      if (kind === "custom") kv("customModels", "kimi", [{ id: model, isFree: true }]);
      for (const rows of [
        (await pool()).map((r) => ({ modelStr: r.modelStr, ids: r.allowedConnectionIds })),
        native(await expand()).map((r) => ({ modelStr: r.modelStr, ids: r.allowedConnectionIds })),
      ]) {
        const candidate = rows.find((r) => r.modelStr === "kimi/" + model);
        assert.ok(candidate);
        assert.deepEqual(candidate.ids, [paid.id]);
      }
      assert.deepEqual(native(await expand([free.id])), []);
      await providers.updateProviderConnection(paid.id, { isActive: false });
      assert.deepEqual(await pool(), []);
      assert.deepEqual(native(await expand()), []);
    }
  );
}

test("unreadable native custom state preserves explicit targets and unrelated provider expansion", async () => {
  await connection("moonshot");
  await connection("openai");
  kv("customModels", "moonshot", "{broken", true);
  kv("customModels", "openai", [{ id: "unrelated" }]);
  const explicit = target("kimi", "saved");
  const expanded = await expand(null, [explicit]);
  assert.ok(expanded.includes(explicit));
  assert.ok(expanded.some((r) => r.modelStr === "openai/unrelated"));
  assert.equal(
    expanded.some((r) => r.modelStr === "kimi/kimi-k3.1-pro"),
    false
  );
  const prepared = await factory.prepareVirtualAutoComboInputs();
  assert.ok(prepared.regularCandidates.some((r) => r.modelStr === "openai/unrelated"));
  assert.deepEqual(native(prepared.regularCandidates), []);
});

test("explicit paid synced evidence vetoes sibling custom/default free hints in both paths", async () => {
  const paid = await connection("kimi", { defaultModel: "wire-paid" });
  const free = await connection("moonshot", {
    defaultModel: "wire-paid",
    providerSpecificData: { importFreeModelsOnly: true },
  });
  kv("customModels", "kimi", [
    { id: "wire-paid", isFree: true, pricing: { prompt: 0, completion: 0 } },
  ]);
  kv("syncedAvailableModels", "moonshot:" + free.id, [
    { id: "wire-paid", isFree: false, tier: "paid", pricing: { prompt: 0, completion: 0 } },
  ]);
  for (const rows of [
    (await pool()).map((r) => ({ modelStr: r.modelStr, ids: r.allowedConnectionIds })),
    native(await expand()).map((r) => ({ modelStr: r.modelStr, ids: r.allowedConnectionIds })),
  ]) {
    assert.deepEqual(rows.find((row) => row.modelStr === "kimi/wire-paid")?.ids, [paid.id]);
  }
  assert.deepEqual(native(await expand([free.id])), []);
});

async function publicKey() {
  const created = await apiKeys.createApiKey("Kimi publication", "kimi-publication-fixture");
  await apiKeys.updateApiKeyPermissions(created.id, { disableNonPublicModels: true });
  apiKeys.clearApiKeyCaches();
  return created;
}

test("R2 late native sync Auto targets remain published with exact wire IDs and restrictions", async () => {
  const legacy = await connection("moonshot");
  assert.equal(legacy.provider, "moonshot");
  assert.ok(
    core.getDbInstance().prepare("SELECT 1 FROM _omniroute_migrations WHERE version='242'").get()
  );
  await models.replaceSyncedAvailableModelsForConnection("moonshot", legacy.id, [
    { id: "legacy-only" },
    { id: "moonshot/native-wire" },
  ]);
  assert.ok(
    core
      .getDbInstance()
      .prepare("SELECT 1 FROM key_value WHERE namespace='syncedAvailableModels' AND key=?")
      .get("moonshot:" + legacy.id)
  );
  const foreign = await connection("openai");
  await models.replaceSyncedAvailableModelsForConnection("openai", foreign.id, [
    { id: "moonshot/foreign-wire" },
  ]);
  const key = await publicKey();
  for (const rows of [await pool(), native(await expand())]) {
    assert.deepEqual(rows.map((row) => row.modelStr).sort(), [
      "kimi/legacy-only",
      "kimi/moonshot/native-wire",
    ]);
    for (const row of rows)
      assert.equal(await apiKeys.isModelAllowedForKey(key.key, row.modelStr), true, row.modelStr);
  }
  assert.deepEqual(await findPublishedModel("kimi", "legacy-only"), {
    providerId: "moonshot",
    publishedModelId: "legacy-only",
  });
  for (const prefix of ["kimi", "moonshot"])
    assert.equal(await apiKeys.isModelAllowedForKey(key.key, prefix + "/legacy-only"), true);
  assert.equal(await apiKeys.isModelAllowedForKey(key.key, "openai/moonshot/foreign-wire"), true);
  assert.equal(await apiKeys.isModelAllowedForKey(key.key, "kimi/moonshot/foreign-wire"), false);
  assert.equal(await apiKeys.isModelAllowedForKey(key.key, "kimi/native-wire"), false);
  await apiKeys.updateApiKeyPermissions(key.id, { blockedModels: ["kimi/moonshot/native-wire"] });
  apiKeys.clearApiKeyCaches();
  for (const prefix of ["kimi", "moonshot"])
    assert.equal(
      await apiKeys.isModelAllowedForKey(key.key, prefix + "/moonshot/native-wire"),
      false
    );
  models.mergeModelCompatOverride("moonshot", "legacy-only", { isHidden: true });
  apiKeys.clearApiKeyCaches();
  for (const prefix of ["kimi", "moonshot"])
    assert.equal(await apiKeys.isModelAllowedForKey(key.key, prefix + "/legacy-only"), false);
});

test("R2 inactive legacy sync retains publication but stays outside both Auto paths", async () => {
  const legacy = await connection("moonshot", { isActive: false });
  await models.replaceSyncedAvailableModelsForConnection("moonshot", legacy.id, [
    { id: "inactive-only" },
  ]);
  assert.deepEqual(await pool(), []);
  assert.deepEqual(native(await expand()), []);
  const key = await publicKey();
  for (const prefix of ["moonshot", "kimi"])
    assert.equal(await apiKeys.isModelAllowedForKey(key.key, prefix + "/inactive-only"), true);
});

test("R2 late native account retains the static builder catalog without synced inventory", async () => {
  const legacy = await connection("moonshot");
  assert.equal(legacy.provider, "moonshot");
  assert.equal(getModelsByProviderId("moonshot"), getModelsByProviderId("kimi"));
  assert.deepEqual(getModelsByProviderId("moonshot-extra"), []);
  const options = await getComboBuilderOptions();
  const provider = options.providers.find((row) => row.providerId === "moonshot");
  assert.ok(provider);
  assert.ok(provider.connections.some((row) => row.id === legacy.id));
  assert.ok(provider.models.some((row) => row.id === "kimi-k3.1-pro"));
});

test("R2 cross-namespace native admission preserves the shipped paid-only policy", async () => {
  const canonical = await connection("kimi", {
    providerSpecificData: { importFreeModelsOnly: true },
  });
  // Native Kimi has no shipped free tier; a payload label alone grants no entitlement.
  await models.replaceSyncedAvailableModelsForConnection("moonshot", canonical.id, [
    { id: "paid-only", isFree: false },
    { id: "labeled-free", isFree: true },
  ]);
  const key = await publicKey();
  for (const prefix of ["moonshot", "kimi"])
    for (const model of ["paid-only", "labeled-free"])
      assert.equal(await apiKeys.isModelAllowedForKey(key.key, prefix + "/" + model), false);
  assert.deepEqual(await pool(), []);
  assert.deepEqual(native(await expand()), []);
  await providers.updateProviderConnection(canonical.id, {
    providerSpecificData: { importFreeModelsOnly: false },
  });
  apiKeys.clearApiKeyCaches();
  for (const prefix of ["moonshot", "kimi"])
    for (const model of ["paid-only", "labeled-free"])
      assert.equal(await apiKeys.isModelAllowedForKey(key.key, prefix + "/" + model), true);
  for (const rows of [await pool(), native(await expand())]) {
    assert.deepEqual(rows.map((row) => row.modelStr).sort(), [
      "kimi/labeled-free",
      "kimi/paid-only",
    ]);
    for (const row of rows) assert.deepEqual(row.allowedConnectionIds, [canonical.id]);
  }
});
