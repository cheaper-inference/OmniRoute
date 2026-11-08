import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-v1beta-models-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "v1beta-models-test-secret";

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const v1betaModelsRoute = await import("../../src/app/api/v1beta/models/route.ts");

async function addActiveConnection(provider: string) {
  await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    apiKey: `test-key-${provider}`,
    testStatus: "active",
  });
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("v1beta models route deduplicates custom models against built-in and synced entries", async () => {
  // #2483: the route now lists only models whose provider has an active connection.
  await addActiveConnection("openai");
  await modelsDb.replaceSyncedAvailableModelsForConnection("openai", "conn-main", [
    {
      id: "gpt-4o",
      name: "GPT-4o From Sync",
      source: "imported",
    },
    {
      id: "review-sync-only",
      name: "Review Sync Only",
      source: "imported",
    },
  ]);
  await modelsDb.addCustomModel("openai", "gpt-4o", "GPT-4o Manual Duplicate");
  await modelsDb.addCustomModel("openai", "review-sync-only", "Review Manual Duplicate");
  await modelsDb.addCustomModel("openai", "review-manual-only", "Review Manual Only");

  const response = await v1betaModelsRoute.GET();
  const body = (await response.json()) as { models: Array<{ name: string }> };
  const names = body.models.map((model) => model.name);

  assert.equal(response.status, 200);
  assert.equal(names.filter((name) => name === "models/openai/gpt-4o").length, 1);
  assert.equal(names.filter((name) => name === "models/openai/review-sync-only").length, 1);
  assert.equal(names.filter((name) => name === "models/openai/review-manual-only").length, 1);
});

test("v1beta models route excludes providers without an active connection (#2483)", async () => {
  // No connections configured at all → no built-in catalog models should leak.
  const emptyResp = await v1betaModelsRoute.GET();
  const emptyBody = (await emptyResp.json()) as { models: Array<{ name: string }> };
  assert.equal(emptyResp.status, 200);
  assert.equal(emptyBody.models.length, 0, "no active connections → empty model list");

  // Configure ONLY an anthropic connection; custom models for an unconfigured provider
  // (kie) must NOT appear, while anthropic catalog models do.
  await addActiveConnection("anthropic");
  await modelsDb.addCustomModel("kie", "claude-opus-4-7", "Kie Claude Opus");
  const resp = await v1betaModelsRoute.GET();
  const body = (await resp.json()) as { models: Array<{ name: string }> };
  const names = body.models.map((m) => m.name);
  assert.ok(!names.some((n) => n.startsWith("models/kie/")), "unconfigured kie must be excluded");
  assert.ok(
    names.some((n) => n.startsWith("models/anthropic/")),
    "configured anthropic must be present"
  );
});

test("v1beta models route names compatible-node models under the configured prefix, not the node UUID (#16207)", async () => {
  // #16207: openai-compatible/anthropic-compatible provider nodes have internal UUID
  // ids; the Gemini catalog must publish them under the operator-configured prefix,
  // the same public identity /v1/models has used since #8327.
  const UUID_SHAPE_RE = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
  const NODE_ID = "openai-compatible-chat-550e8400-e29b-41d4-a716-446655440000";
  const CONFIGURED_PREFIX = "pix4k-talk";

  await providersDb.createProviderNode({
    id: NODE_ID,
    type: "openai-compatible",
    name: "pix4k talk (probe)",
    prefix: CONFIGURED_PREFIX,
    baseUrl: "https://proxy.example.com",
    chatPath: "/v1/chat/completions",
    modelsPath: "/v1/models",
  });
  const connection = await providersDb.createProviderConnection({
    provider: NODE_ID,
    authType: "apikey",
    apiKey: "sk-test",
    isActive: true,
    testStatus: "active",
  });
  await modelsDb.replaceSyncedAvailableModelsForConnection(
    NODE_ID,
    (connection as { id: string }).id,
    [{ id: "glm-5.2", name: "GLM 5.2", source: "imported" }]
  );
  await modelsDb.addCustomModel(NODE_ID, "custom-extra", "Custom Extra");

  const response = await v1betaModelsRoute.GET();
  const body = (await response.json()) as { models: Array<{ name: string }> };
  assert.equal(response.status, 200);
  const names = body.models.map((m) => m.name);

  assert.ok(
    names.includes(`models/${CONFIGURED_PREFIX}/glm-5.2`),
    `synced model must be named under the prefix, got: ${JSON.stringify(names)}`
  );
  assert.ok(
    names.includes(`models/${CONFIGURED_PREFIX}/custom-extra`),
    `custom model must be named under the prefix, got: ${JSON.stringify(names)}`
  );
  for (const name of names) {
    assert.equal(UUID_SHAPE_RE.test(name), false, `raw UUID leaked in /v1beta/models: ${name}`);
  }
});
