import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-nvidia-410-model-scope-"));

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "nvidia-410-model-scope-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const fallback = await import("../../open-sse/services/accountFallback.ts");

const DEAD_MODEL = "deepseek-ai/deepseek-v4-pro";
const HEALTHY_MODEL = "nvidia/nemotron-3.5-lightning-30b-a3b";

const GONE_BODY = JSON.stringify({
  type: "about:blank",
  title: "Gone",
  status: 410,
  detail:
    "The model 'deepseek-ai/deepseek-v4-pro' has reached its end of life " +
    "and is no longer available.",
});

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedNvidiaConnection() {
  return providersDb.createProviderConnection({
    provider: "nvidia",
    authType: "apikey",
    name: "nvidia-410-model-scope",
    apiKey: "sk-nvidia-410-model-scope",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("NVIDIA 410 Gone stays model-scoped and leaves the connection usable", async () => {
  const connection = await seedNvidiaConnection();

  assert.equal(
    fallback.hasPerModelQuota("nvidia", DEAD_MODEL),
    true,
    "NVIDIA must use per-model failure scoping"
  );

  const result = await auth.markAccountUnavailable(
    connection.id,
    410,
    GONE_BODY,
    "nvidia",
    DEAD_MODEL
  );

  assert.equal(
    result.shouldFallback,
    false,
    "a retired model is retired for every account, so the first 410 must not walk sibling accounts (#21202)"
  );

  const after = await providersDb.getProviderConnectionById(connection.id);

  assert.equal(
    after?.rateLimitedUntil ?? null,
    null,
    "410 for one retired NVIDIA model must not apply a connection-wide cooldown"
  );

  assert.equal(
    after?.testStatus,
    "active",
    "410 for one retired NVIDIA model must leave the NVIDIA connection active"
  );

  assert.equal(
    fallback.isModelLocked("nvidia", connection.id, DEAD_MODEL),
    true,
    "the retired model itself should be locked"
  );

  assert.equal(
    fallback.isModelLocked("nvidia", connection.id, HEALTHY_MODEL),
    false,
    "a healthy sibling NVIDIA model must remain unlocked"
  );

  const healthyCredentials = await auth.getProviderCredentials("nvidia", null, null, HEALTHY_MODEL);

  assert.equal(
    healthyCredentials?.connectionId,
    connection.id,
    "the same NVIDIA connection must remain selectable for healthy sibling models"
  );
});

test("a 410 is model-scoped for non-per-model providers too (#21202)", async () => {
  assert.equal(
    fallback.hasPerModelQuota("openai", DEAD_MODEL),
    false,
    "plain OpenAI API-key connections are not per-model quota providers"
  );

  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-410-model-scope",
    apiKey: "sk-openai-410-model-scope",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });

  const result = await auth.markAccountUnavailable(
    connection.id,
    410,
    "Gone",
    "openai",
    DEAD_MODEL
  );

  assert.equal(
    result.shouldFallback,
    false,
    "a retired model is retired for every account, so the first 410 must not walk sibling accounts (#21202)"
  );

  const after = await providersDb.getProviderConnectionById(connection.id);

  assert.equal(
    after?.rateLimitedUntil ?? null,
    null,
    "410 for one retired model must not apply a connection-wide cooldown even when the provider has no per-model quota (#21202)"
  );

  assert.equal(
    after?.testStatus,
    "active",
    "410 for one retired model must leave the connection active"
  );

  assert.equal(
    fallback.isModelLocked("openai", connection.id, DEAD_MODEL),
    true,
    "the retired model itself should be locked"
  );

  assert.equal(
    fallback.isModelLocked("openai", connection.id, "gpt-4o"),
    false,
    "a healthy sibling model must remain unlocked"
  );

  const healthyCredentials = await auth.getProviderCredentials("openai", null, null, "gpt-4o");

  assert.equal(
    healthyCredentials?.connectionId,
    connection.id,
    "the same connection must remain selectable for healthy sibling models"
  );
});

test("a 410 is model-scoped for other per-model providers too (#21202)", async () => {
  assert.equal(
    fallback.hasPerModelQuota("gemini", DEAD_MODEL),
    true,
    "Gemini provides a non-NVIDIA per-model control case"
  );

  const connection = await providersDb.createProviderConnection({
    provider: "gemini",
    authType: "apikey",
    name: "gemini-410-model-scope",
    apiKey: "sk-gemini-410-model-scope",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });

  const result = await auth.markAccountUnavailable(
    connection.id,
    410,
    "Gone",
    "gemini",
    DEAD_MODEL
  );

  assert.equal(
    result.shouldFallback,
    false,
    "a retired model is retired for every account, so the first 410 must not walk sibling accounts (#21202)"
  );

  const after = await providersDb.getProviderConnectionById(connection.id);

  assert.equal(
    after?.rateLimitedUntil ?? null,
    null,
    "410 for one retired model must not apply a connection-wide cooldown (#21202)"
  );

  assert.equal(
    after?.testStatus,
    "active",
    "410 for one retired model must leave the connection active"
  );

  assert.equal(
    fallback.isModelLocked("gemini", connection.id, DEAD_MODEL),
    true,
    "the retired model itself should be locked"
  );

  assert.equal(
    fallback.isModelLocked("gemini", connection.id, "gemini-2.5-flash"),
    false,
    "a healthy sibling model must remain unlocked"
  );

  const healthyCredentials = await auth.getProviderCredentials(
    "gemini",
    null,
    null,
    "gemini-2.5-flash"
  );

  assert.equal(
    healthyCredentials?.connectionId,
    connection.id,
    "the same connection must remain selectable for healthy sibling models"
  );
});
