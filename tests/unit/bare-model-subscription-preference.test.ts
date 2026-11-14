import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-bare-sub-pref-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { getModelInfoCore } = await import("../../open-sse/services/model.ts");

const FLAG = "OMNIROUTE_PREFER_SUBSCRIPTION_FOR_BARE_MODELS";
const SHARED_MODEL = "shared-preview-2027";

async function seedSyncedModel(provider: string, authType: "oauth" | "apikey") {
  const connection = await providersDb.createProviderConnection({
    provider,
    authType,
    name: `${provider}-pref-test`,
    email: authType === "oauth" ? `${provider}@example.com` : undefined,
    apiKey: authType === "apikey" ? "test-key-placeholder" : undefined,
    isActive: true,
    providerSpecificData: provider === "codex" ? { workspaceId: "ws-pref-test" } : undefined,
  });
  assert.ok(connection?.id, `${provider} connection must be created`);
  await modelsDb.replaceSyncedAvailableModelsForConnection(provider, String(connection.id), [
    {
      id: SHARED_MODEL,
      name: SHARED_MODEL,
      apiFormat: "openai-responses",
      supportedEndpoints: ["chat"],
    },
  ]);
}

test.beforeEach(() => {
  delete process.env[FLAG];
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  delete process.env[FLAG];
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("flag unset: a bare id on an api-key and a subscription provider keeps the OpenAI default", async () => {
  await seedSyncedModel("codex", "oauth");
  await seedSyncedModel("openai", "apikey");
  const info = await getModelInfoCore(SHARED_MODEL, null);
  assert.equal(info.provider, "openai");
});

test("flag on: the subscription provider wins over the api-key provider", async () => {
  process.env[FLAG] = "true";
  await seedSyncedModel("codex", "oauth");
  await seedSyncedModel("openai", "apikey");
  const info = await getModelInfoCore(SHARED_MODEL, null);
  assert.equal(info.provider, "codex");
  assert.equal(info.model, SHARED_MODEL);
});

test("flag on: an explicit provider prefix still wins", async () => {
  process.env[FLAG] = "true";
  await seedSyncedModel("codex", "oauth");
  await seedSyncedModel("openai", "apikey");
  const info = await getModelInfoCore(`openai/${SHARED_MODEL}`, null);
  assert.equal(info.provider, "openai");
});

test("flag on: two api-key providers keep the OpenAI default", async () => {
  process.env[FLAG] = "true";
  await seedSyncedModel("anthropic", "apikey");
  await seedSyncedModel("openai", "apikey");
  const info = await getModelInfoCore(SHARED_MODEL, null);
  assert.equal(info.provider, "openai");
});
