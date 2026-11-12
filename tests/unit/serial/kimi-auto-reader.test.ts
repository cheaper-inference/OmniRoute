import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "kimi-auto-reader-"));
process.env.DATA_DIR = dir;
const core = await import("../../../src/lib/db/core.ts");
const models = await import("../../../src/lib/db/models.ts");
const providers = await import("../../../src/lib/db/providers.ts");
const { getKimiAutoComboInputs, getKimiAutoComboCandidates } =
  await import("../../../src/lib/db/models/kimiAutoComboInputs.ts");
const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");
const { getActiveSyncedCatalog } =
  await import("../../../src/lib/db/models/activeSyncedCatalog.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
});
test.afterEach(() => core.resetDbInstance());
test.after(() => fs.rmSync(dir, { recursive: true, force: true }));
function kv(namespace: string, key: string, value: unknown, raw = false) {
  core
    .getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value(namespace,key,value) VALUES(?,?,?)")
    .run(namespace, key, raw ? value : JSON.stringify(value));
}
async function account(provider: string, freeOnly = false, apiKey = "fixture", name = provider) {
  const row = await providers.createProviderConnection({
    provider,
    authType: "apikey",
    name,
    apiKey,
    defaultModel: provider + "/custom",
    providerSpecificData: { importFreeModelsOnly: freeOnly },
  });
  core
    .getDbInstance()
    .prepare("UPDATE provider_connections SET synced_models_at=? WHERE id=?")
    .run("2026-11-12T12:00:00.000Z", row.id);
  return row as { id: string };
}
function refs(rows: Array<{ id: string }>) {
  return [...rows].sort((a, b) => a.id.localeCompare(b.id));
}

test("supported late family state equals canonical public readers after migration239", async () => {
  const legacy = await account("moonshot");
  const canonical = await account("kimi");
  kv("customModels", "moonshot", [
    {
      id: "shared",
      source: "manual",
      name: "manual",
      isHidden: false,
      supportedEndpoints: [],
      metadata: { legacy: 1 },
    },
    { id: "moonshot/custom", isHidden: false },
  ]);
  kv("customModels", "kimi", [
    {
      id: "shared",
      source: "api-sync",
      name: "discovery",
      isHidden: true,
      supportedEndpoints: ["embeddings"],
      metadata: { canonical: 2 },
    },
    { id: "kimi/custom", isHidden: false },
  ]);
  kv("modelCompatOverrides", "moonshot", [
    { id: "shared", isHidden: true },
    { id: "modality", isHidden: true, hiddenModalities: { chat: true, images: false } },
  ]);
  kv("modelCompatOverrides", "kimi", [
    { id: "modality", isHidden: false, hiddenModalities: { chat: false } },
    { id: "hidden", isHidden: false, hiddenModalities: { chat: true } },
  ]);
  kv("syncedAvailableModels", "moonshot:" + legacy.id, [
    { id: "shared-sync", supportsThinking: true, supportedEndpoints: ["chat"], isFree: true },
    { id: "moonshot/custom", name: "literal legacy wire" },
  ]);
  kv("syncedAvailableModels", "kimi:" + legacy.id, [
    { id: "shared-sync", supportsThinking: false, supportedEndpoints: [], isFree: false },
  ]);
  kv("syncedAvailableModels", "kimi:" + canonical.id, [
    { id: "kimi/custom", name: "literal canonical wire" },
  ]);
  const db = core.getDbInstance();
  const rows = () => db.prepare("SELECT * FROM key_value ORDER BY namespace,key").all();
  const raw = rows();
  const before = await getKimiAutoComboInputs();
  assert.deepEqual(rows(), raw, "family reads must not migrate stored state");
  const custom = before.customModels as Array<Record<string, unknown>>;
  const shared = custom.find((row) => row.id === "shared")!;
  assert.equal(shared.name, "manual");
  assert.equal(shared.isHidden, false);
  assert.deepEqual(shared.supportedEndpoints, []);
  assert.deepEqual(shared.metadata, { canonical: 2, legacy: 1 });
  assert.deepEqual([...before.hiddenModels], ["hidden"]);
  assert.equal(before.syncedByConnection[legacy.id][0].supportsThinking, false);
  assert.equal(before.syncedByConnection[legacy.id][0].isFree, false);
  assert.deepEqual(
    before.syncedMetadata.get(legacy.id)?.get("shared-sync")?.supportedEndpoints,
    []
  );
  assert.deepEqual(
    before.syncedByConnection[legacy.id].map((r) => r.id),
    ["shared-sync", "moonshot/custom"]
  );
  assert.deepEqual(
    before.syncedByConnection[canonical.id].map((r) => r.id),
    ["kimi/custom"]
  );

  db.prepare("DELETE FROM _omniroute_migrations WHERE version='239'").run();
  runMigrations(db);
  assert.deepEqual(await models.getCustomModels("kimi"), before.customModels);
  assert.deepEqual(models.getModelCompatOverrides("kimi"), before.compatOverrides);
  assert.deepEqual(
    await models.getSyncedAvailableModelsByConnection("kimi"),
    before.syncedByConnection
  );
  assert.deepEqual(models.getHiddenModelsByProvider().get("kimi"), before.hiddenModels);
  assert.deepEqual(
    refs(await models.getActiveConnectionAdmissionRefs("kimi")),
    refs(before.admissionRefs)
  );
  assert.deepEqual(
    db.prepare("SELECT id,default_model FROM provider_connections ORDER BY id").all(),
    [
      { id: legacy.id, default_model: "moonshot/custom" },
      { id: canonical.id, default_model: "kimi/custom" },
    ].sort((a, b) => a.id.localeCompare(b.id))
  );
  const once = rows();
  db.prepare("DELETE FROM _omniroute_migrations WHERE version='239'").run();
  runMigrations(db);
  assert.deepEqual(rows(), once);
});

test("valid canonical custom destination is not poisoned by unreadable legacy JSON", async () => {
  kv("customModels", "moonshot", "{bad", true);
  kv("customModels", "kimi", [{ id: "canonical", isHidden: false }]);
  assert.deepEqual((await getKimiAutoComboInputs()).customModels, [
    { id: "canonical", isHidden: false },
  ]);
});
test("sole malformed legacy and malformed canonical custom retain their read exceptions", async () => {
  kv("customModels", "moonshot", "{bad", true);
  await assert.rejects(getKimiAutoComboInputs(), SyntaxError);
  kv("customModels", "moonshot", [{ id: "legacy" }]);
  kv("customModels", "kimi", "{bad", true);
  await assert.rejects(getKimiAutoComboInputs(), SyntaxError);
});
test("unsupported parsed custom shapes retain parsing behavior and canonical precedence", async () => {
  const legacy = [null, 7, { id: "legacy" }];
  kv("customModels", "moonshot", legacy);
  assert.deepEqual((await getKimiAutoComboInputs()).customModels, legacy);
  kv("customModels", "kimi", [{ id: "canonical", supportedEndpoints: [] }]);
  assert.deepEqual((await getKimiAutoComboInputs()).customModels, [
    { id: "canonical", supportedEndpoints: [] },
  ]);
});
test("synced malformed markers from either namespace survive without resurrecting a rejected row", async () => {
  const connection = await account("moonshot");
  kv("syncedAvailableModels", "moonshot:" + connection.id, "{bad", true);
  kv("syncedAvailableModels", "kimi:" + connection.id, [{ id: "canonical", isFree: false }]);
  const first = await getKimiAutoComboInputs();
  const marker = models.SYNCED_AVAILABLE_MODELS_MALFORMED;
  assert.equal(first.syncedByConnection[marker], true);
  assert.equal(
    Object.getOwnPropertyDescriptor(first.syncedByConnection, marker)?.enumerable,
    false
  );
  assert.equal(first.admitted.byConnection[marker as never], true);
  assert.equal(first.syncedByConnection[connection.id][0].id, "canonical");
  kv("syncedAvailableModels", "moonshot:" + connection.id, [{ id: "legacy" }]);
  kv("syncedAvailableModels", "kimi:" + connection.id, "{bad", true);
  const second = await getKimiAutoComboInputs();
  assert.equal(second.syncedByConnection[marker], true);
  assert.equal(second.syncedByConnection[connection.id], undefined);
});
test("restricted family inputs scope refs and synced metadata before free-only exhaustion", async () => {
  const paid = await account("moonshot");
  const free = await account("kimi", true);
  core
    .getDbInstance()
    .prepare("UPDATE provider_connections SET synced_models_at=? WHERE id=?")
    .run(new Date().toISOString(), free.id);
  kv("syncedAvailableModels", "moonshot:" + paid.id, [{ id: "paid-sibling", isFree: false }]);
  kv("syncedAvailableModels", "kimi:" + free.id, [
    { id: "paid", isFree: false, pricing: { prompt: 2 }, tier: "paid" },
  ]);
  const scoped = await getKimiAutoComboInputs(new Set([free.id]));
  assert.deepEqual(
    scoped.admissionRefs.map((row) => row.id),
    [free.id]
  );
  assert.deepEqual(Object.keys(scoped.syncedByConnection), [free.id]);
  assert.equal(scoped.admitted.freeOnlyExhausted, true);
  assert.deepEqual(scoped.admitted.byConnection[free.id], []);
  assert.equal(scoped.syncedMetadata.get(free.id)?.get("paid")?.tier, "paid");
  assert.deepEqual(scoped.syncedMetadata.get(free.id)?.get("paid")?.pricing, { prompt: 2 });
});
test("raw extraction preserves ordinary unsupported-shape and malformed-symbol API behavior", async () => {
  kv("syncedAvailableModels", "kimi:unsupported", { id: "not-an-array" });
  kv("syncedAvailableModels", "kimi:malformed", "{bad", true);
  kv("syncedAvailableModels", "kimi:json-null", null);
  const result = await models.getSyncedAvailableModelsByConnection("kimi");
  assert.deepEqual(result.unsupported, []);
  assert.equal(result.malformed, undefined);
  assert.deepEqual(result["json-null"], []);
  assert.equal(result[models.SYNCED_AVAILABLE_MODELS_MALFORMED], true);
});

test("native candidate callback blocks account evaluation and runs for rejected models", async () => {
  const connection = await account("kimi");
  kv("modelCompatOverrides", "kimi", [{ id: "rejected", isHidden: true }]);
  const inputs = await getKimiAutoComboInputs(new Set([connection.id]));
  let reads = 0;
  const watched = {
    id: connection.id,
    get providerSpecificData() {
      reads += 1;
      return {};
    },
  };
  let releaseAccepted!: () => void;
  let releaseRejected!: () => void;
  const acceptedGate = new Promise<void>((resolve) => {
    releaseAccepted = resolve;
  });
  const rejectedGate = new Promise<void>((resolve) => {
    releaseRejected = resolve;
  });
  let callbacks = 0;
  let settled = false;
  const pending = getKimiAutoComboCandidates(
    inputs,
    [watched],
    [{ id: "accepted" }, { id: "rejected" }],
    () => (++callbacks === 1 ? acceptedGate : rejectedGate)
  );
  const completion = Promise.resolve(pending).then((rows) => {
    settled = true;
    return rows;
  });
  try {
    assert.equal(callbacks, 1, "first model must await callback before evaluating its accounts");
    assert.equal(reads, 0);
    assert.equal(settled, false);
    releaseAccepted();
    await new Promise<void>((resolve) => setImmediate(resolve));
    assert.equal(callbacks, 2, "hidden/rejected model must also await its callback");
    assert.equal(reads, 1);
    assert.equal(settled, false);
    releaseRejected();
    assert.deepEqual(await completion, [
      { modelId: "accepted", allowedConnectionIds: [connection.id] },
    ]);
    assert.equal(callbacks, 2);
  } finally {
    releaseAccepted();
    releaseRejected();
    await completion;
  }
});

test("ordinary reader isolates valid-JSON normalization failures from healthy connections", async () => {
  const bad = await account("openai", false, "bad-fixture", "bad");
  const healthy = await account("openai", false, "healthy-fixture", "healthy");
  assert.notEqual(bad.id, healthy.id);
  kv("syncedAvailableModels", "openai:" + bad.id, [
    { id: "bad", endpointCapabilitySource: { toString: "bad" } },
  ]);
  kv("syncedAvailableModels", "openai:" + healthy.id, [{ id: "healthy-wire" }]);
  const snapshot = () =>
    core
      .getDbInstance()
      .prepare(
        "SELECT key,value FROM key_value WHERE namespace='syncedAvailableModels' ORDER BY key"
      )
      .all();
  const before = snapshot();
  const result = await models.getSyncedAvailableModelsByConnection("openai");
  assert.deepEqual(Object.keys(result), [healthy.id]);
  assert.deepEqual(
    result[healthy.id].map((row) => row.id),
    ["healthy-wire"]
  );
  assert.equal(result[bad.id], undefined);
  assert.equal(result[models.SYNCED_AVAILABLE_MODELS_MALFORMED], true);
  assert.equal(
    Object.getOwnPropertyDescriptor(result, models.SYNCED_AVAILABLE_MODELS_MALFORMED)?.enumerable,
    false
  );
  assert.deepEqual(snapshot(), before);
  await assert.rejects(models.getSyncedAvailableModels("openai"), TypeError);
});

test("native normalization follows raw merge, isolates failures and never resurrects legacy alternatives", async () => {
  const repaired = await account("moonshot", false, "repaired-fixture", "repaired");
  const rejected = await account("moonshot", false, "rejected-fixture", "rejected");
  assert.notEqual(repaired.id, rejected.id);
  const healthy = await account("kimi");
  kv("syncedAvailableModels", "moonshot:" + repaired.id, [
    {
      id: "repaired",
      endpointCapabilitySource: { toString: "bad" },
      supportsThinking: true,
      description: "legacy field survives canonical repair",
    },
  ]);
  kv("syncedAvailableModels", "kimi:" + repaired.id, [
    { id: "repaired", endpointCapabilitySource: "operator", supportsThinking: false },
  ]);
  kv("syncedAvailableModels", "moonshot:" + rejected.id, [{ id: "legacy-only" }]);
  kv("syncedAvailableModels", "kimi:" + rejected.id, [
    { id: "bad", endpointCapabilitySource: { toString: "bad" } },
  ]);
  kv("syncedAvailableModels", "kimi:" + healthy.id, [{ id: "healthy-wire" }]);
  const result = await getKimiAutoComboInputs();
  assert.deepEqual(Object.keys(result.syncedByConnection).sort(), [repaired.id, healthy.id].sort());
  assert.equal(result.syncedByConnection[repaired.id][0].endpointCapabilitySource, "operator");
  assert.equal(result.syncedByConnection[repaired.id][0].supportsThinking, false);
  assert.equal(
    result.syncedByConnection[repaired.id][0].description,
    "legacy field survives canonical repair"
  );
  assert.deepEqual(
    result.syncedByConnection[healthy.id].map((row) => row.id),
    ["healthy-wire"]
  );
  assert.equal(result.syncedByConnection[rejected.id], undefined);
  assert.equal(result.syncedMetadata.has(rejected.id), false);
  assert.equal(result.admitted.byConnection[rejected.id], undefined);
  assert.equal(result.syncedByConnection[models.SYNCED_AVAILABLE_MODELS_MALFORMED], true);
  assert.equal(
    Object.getOwnPropertyDescriptor(
      result.syncedByConnection,
      models.SYNCED_AVAILABLE_MODELS_MALFORMED
    )?.enumerable,
    false
  );
  assert.equal(
    Object.getOwnPropertyDescriptor(
      result.admitted.byConnection,
      models.SYNCED_AVAILABLE_MODELS_MALFORMED
    )?.value,
    true
  );
});

test("migration preserves native non-authoritative inactive aggregate metadata", async () => {
  await account("kimi", false, "aggregate-active", "aggregate-active");
  const healthy = await account("kimi", false, "aggregate-healthy", "aggregate-healthy");
  const malformed = await account("moonshot", false, "aggregate-malformed", "aggregate-malformed");
  await providers.updateProviderConnection(healthy.id, { isActive: false });
  await providers.updateProviderConnection(malformed.id, { isActive: false });
  kv("syncedAvailableModels", "kimi:" + healthy.id, [
    {
      id: "healthy-wire",
      name: "Healthy inactive",
      contextWindow: 123456,
      supportsThinking: true,
      supportedThinkingEfforts: ["low", "high"],
    },
  ]);
  kv("syncedAvailableModels", "moonshot:" + malformed.id, [
    { id: "bad", endpointCapabilitySource: { toString: "bad" } },
  ]);
  const before = await getActiveSyncedCatalog("kimi");
  assert.deepEqual(before, {
    authoritative: false,
    models: [
      {
        id: "healthy-wire",
        name: "Healthy inactive",
        source: "imported",
        supportedThinkingEfforts: ["low", "high"],
        contextWindow: 123456,
        supportsThinking: true,
      },
    ],
  });
  const db = core.getDbInstance();
  db.prepare("DELETE FROM _omniroute_migrations WHERE version='239'").run();
  runMigrations(db);
  assert.deepEqual(await getActiveSyncedCatalog("kimi"), before);
});
