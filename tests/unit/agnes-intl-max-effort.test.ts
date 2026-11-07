import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agnes-max-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "agnes-max-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelDiscovery = await import("../../src/lib/providerModels/modelDiscovery.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("agnes intl folds a live-catalog -max id back onto the free base model", async () => {
  // Live apihub.agnes-ai.com lists agnes-3.0-flash-max as its own model id.
  // That id is a paid SKU (free keys get 403 quota 0). The registry effort
  // declaration must still win, matching agnes-cn which never lists the id.
  const connection = await providersDb.createProviderConnection({
    provider: "agnes",
    authType: "apikey",
    name: "agnes-intl-max",
    isActive: true,
    testStatus: "active",
  });

  await modelDiscovery.persistDiscoveredModels("agnes", connection.id, [
    { id: "agnes-3.0-flash", name: "Agnes 3.0 Flash" },
    { id: "agnes-3.0-flash-max", name: "Agnes 3.0 Flash Max" },
  ]);

  const info = await getModelInfo("agnes/agnes-3.0-flash-max");
  assert.equal(info.model, "agnes-3.0-flash");
  assert.equal(info.resolvedThinkingEffort, "max");
  assert.equal(info.provider, "agnes");
});

test("an undeclared live-catalog id that merely ends in -max stays literal", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "agnes",
    authType: "apikey",
    name: "agnes-intl-literal",
    isActive: true,
    testStatus: "active",
  });

  await modelDiscovery.persistDiscoveredModels("agnes", connection.id, [
    { id: "agnes-paid-sku-max", name: "Agnes Paid SKU" },
  ]);

  const info = await getModelInfo("agnes/agnes-paid-sku-max");
  assert.equal(info.model, "agnes-paid-sku-max");
  assert.equal(info.resolvedThinkingEffort, undefined);
});

test("an operator custom model named agnes-3.0-flash-max is not folded", async () => {
  const modelsDb = await import("../../src/lib/db/models.ts");
  await providersDb.createProviderConnection({
    provider: "agnes",
    authType: "apikey",
    name: "agnes-intl-custom",
    isActive: true,
    testStatus: "active",
  });
  await modelsDb.addCustomModel(
    "agnes",
    "agnes-3.0-flash-max",
    "Agnes 3.0 Flash Max custom",
    "manual",
    "responses",
    ["chat"],
    "responses"
  );

  const info = await getModelInfo("agnes/agnes-3.0-flash-max");
  assert.equal(info.model, "agnes-3.0-flash-max");
  assert.equal(info.apiFormat, "responses");
  assert.equal(info.resolvedThinkingEffort, undefined);
});
