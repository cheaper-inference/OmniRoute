import test from "node:test";
import assert from "node:assert/strict";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { getExecutor, DefaultExecutor } = await import("../../open-sse/executors/index.ts");
const { AGGREGATOR_PROVIDER_IDS, APIKEY_PROVIDERS } =
  await import("../../src/shared/constants/providers.ts");
const {
  isFreeModel,
  isCatalogFreeModel,
  isFreeForProvider,
  isModelFreeBadge,
  isPaidModelTarget,
  providerHasFreeModels,
  selectModelsForImport,
} = await import("../../src/shared/utils/freeModels.ts");
const { FREE_MODEL_BUDGETS, computeFreeModelTotals, grantsFreeAccess } =
  await import("../../open-sse/config/freeModelCatalog.ts");

test("Token Harbor is registered as a passthrough OpenAI-compatible provider", async () => {
  const entry = (REGISTRY as Record<string, Record<string, unknown>>).tokenharbor;

  assert.ok(entry, "Token Harbor should be present in the executor registry");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.baseUrl, "https://tokenharbor.ai/v1/chat/completions");
  assert.equal(entry.modelsUrl, "https://tokenharbor.ai/v1/models");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.passthroughModels, true);
  assert.deepEqual(entry.models, []);
  assert.ok((await getExecutor("tokenharbor")) instanceof DefaultExecutor);
});

test("Token Harbor is listed as an API-key aggregator with verified free-tier details", () => {
  const meta = (APIKEY_PROVIDERS as Record<string, Record<string, unknown>>).tokenharbor;

  assert.ok(meta, "Token Harbor should have API-key provider metadata");
  assert.equal(meta.id, "tokenharbor");
  assert.equal(meta.alias, "tokenharbor");
  assert.equal(meta.name, "Token Harbor");
  assert.equal(meta.website, "https://tokenharbor.ai");
  assert.equal(meta.hasFree, true);
  assert.equal(meta.passthroughModels, true);
  assert.equal(AGGREGATOR_PROVIDER_IDS.has("tokenharbor"), true);
  assert.match(String(meta.apiHint), /https:\/\/tokenharbor\.ai\/v1/);
  assert.doesNotMatch(String(meta.freeNote), /claude-haiku-5\.5:free/);
  assert.match(String(meta.freeNote), /https:\/\/tokenharbor\.ai\/models\?category=free/);
  assert.match(String(meta.freeNote), /campaigns can expire/i);
  assert.match(String(meta.freeNote), /base model IDs remain paid/i);
  assert.match(String(meta.freeNote), /rolling 7-day/i);
  assert.match(String(meta.freeNote), /retained/i);
});

test("Token Harbor's ended campaign grants no free access or uncapped budget", () => {
  const retired = FREE_MODEL_BUDGETS.find(
    (row) => row.provider === "tokenharbor" && row.modelId === "claude-haiku-5.5:free"
  );
  assert.ok(retired);
  assert.equal(retired.freeType, "discontinued");
  assert.equal(grantsFreeAccess(retired.freeType), false);
  assert.equal(
    computeFreeModelTotals({ entries: [retired] }).uncappedProviders.includes("tokenharbor"),
    false
  );
});

test("retired Token Harbor IDs cannot be revived by a suffix, stale flags or zero prices", () => {
  const id = "claude-haiku-5.5:free";
  for (const model of [
    { id },
    { id, isFree: true },
    { id, free: true },
    { id, pricing: { prompt: 0, completion: 0 } },
  ]) {
    assert.equal(isCatalogFreeModel("tokenharbor", id), false);
    assert.equal(isFreeModel("tokenharbor", model), false);
    assert.equal(isFreeForProvider("tokenharbor", model), false);
    assert.equal(isModelFreeBadge("tokenharbor", model), false);
    assert.equal(isModelFreeBadge("tokenharbor", model, { strict: true }), false);
    assert.deepEqual(selectModelsForImport("tokenharbor", [model], true), {
      models: [],
      freeFilterEmpty: true,
    });
    assert.deepEqual(selectModelsForImport("tokenharbor", [model], false), {
      models: [model],
      freeFilterEmpty: false,
    });
  }
  assert.equal(isPaidModelTarget(`tokenharbor/${id}`), "paid");
});

test("Token Harbor retains live free discovery with paid evidence taking precedence", () => {
  const current = [
    { id: "deepseek-v4.1-flash:free", isFree: true },
    { id: "mimo-v2.6-flash:free", pricing: { prompt: "0", completion: "0" } },
  ];
  const paid = [
    { id: "deepseek-v4.1-flash" },
    { id: "mimo-v2.6-flash:free", isFree: true, free: false },
    { id: "mimo-v2.6-flash:free", isFree: true, pricing: { input: 0, output: 1 } },
  ];
  assert.equal(providerHasFreeModels("tokenharbor"), true);
  for (const model of current) {
    assert.equal(isCatalogFreeModel("tokenharbor", model.id), true);
    assert.equal(isFreeModel("tokenharbor", model), true);
    assert.equal(isModelFreeBadge("tokenharbor", model), true);
  }
  for (const model of paid) {
    assert.equal(isFreeModel("tokenharbor", model), false);
    assert.equal(isModelFreeBadge("tokenharbor", model), false);
    assert.equal(isModelFreeBadge("tokenharbor", model, { strict: true }), false);
  }
  assert.deepEqual(
    selectModelsForImport("tokenharbor", [...current, ...paid], true).models,
    current
  );
  assert.equal(isFreeModel("tokenharbor", { id: "claude-haiku-5.5" }), false);
});

test("Token Harbor sourced current routes grant free access while base IDs stay paid", () => {
  const routes = FREE_MODEL_BUDGETS.filter(
    (row) => row.provider === "tokenharbor" && grantsFreeAccess(row.freeType)
  );
  assert.deepEqual(routes.map((row) => row.modelId).sort(), [
    "deepseek-v4.1-flash:free",
    "mimo-v2.6-flash:free",
  ]);
  for (const route of routes) {
    assert.equal(route.freeType, "recurring-uncapped");
    assert.equal(isFreeModel("tokenharbor", { id: route.modelId }), true);
    assert.equal(isFreeModel("tokenharbor", { id: route.modelId.slice(0, -5) }), false);
  }
});
