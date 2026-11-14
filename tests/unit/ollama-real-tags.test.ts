// /api/tags serves a fixed list of two made-up models. With OMNIROUTE_OLLAMA_REAL_TAGS=1 it serves
// the real model catalog in Ollama's tags shape, behind the same catalog auth as /v1/models.
// Default (flag off): the fixed list, unchanged.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ollama-tags-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = "ollama-tags-jwt-secret";
process.env.API_KEY_SECRET = "ollama-tags-api-key-secret";
delete process.env.OMNIROUTE_OLLAMA_REAL_TAGS;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const catalog = await import("../../src/app/api/v1/models/catalog.ts");
const tagsRoute = await import("../../src/app/api/tags/route.ts");
const { ollamaModels } = await import("../../open-sse/config/ollamaModels.ts");

const NODE_ID = "openai-compatible-chat-550e8400-e29b-41d4-a716-446655440000";
const PREFIX = "tagsprobe";

test.after(() => {
  delete process.env.OMNIROUTE_OLLAMA_REAL_TAGS;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type Tag = { name: string; model: string; modified_at: string; size: number; details: object };

async function seedModel() {
  await providersDb.createProviderNode({
    id: NODE_ID,
    type: "openai-compatible",
    name: "tags probe",
    prefix: PREFIX,
    baseUrl: "https://proxy.example.com",
    chatPath: "/v1/chat/completions",
    modelsPath: "/v1/models",
  });
  const connection = await providersDb.createProviderConnection({
    provider: NODE_ID,
    authType: "apikey",
    name: "tags-probe-conn",
    apiKey: ["placeholder", "value"].join("-"),
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      baseUrl: "https://proxy.example.com",
      chatPath: "/v1/chat/completions",
    },
  });
  await modelsDb.replaceSyncedAvailableModelsForConnection(
    NODE_ID,
    (connection as { id: string }).id,
    [{ id: "glm-5.2", name: "GLM 5.2", source: "imported", supportedEndpoints: ["chat"] }]
  );
  catalog.__resetCatalogBuilderRunsForTest();
}

const getTags = () => tagsRoute.GET(new Request("http://localhost/api/tags"));

test("flag off: /api/tags serves the fixed list exactly as before", async () => {
  await seedModel();
  const response = await getTags();
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), ollamaModels);
});

test("flag on: /api/tags serves the real catalog in Ollama's tags shape", async () => {
  process.env.OMNIROUTE_OLLAMA_REAL_TAGS = "1";
  const response = await getTags();
  assert.equal(response.status, 200);
  const body = (await response.json()) as { models: Tag[] };
  const entry = body.models.find((tag) => tag.name === `${PREFIX}/glm-5.2`);
  assert.ok(entry, `catalog model missing from ${JSON.stringify(body.models.map((m) => m.name))}`);
  assert.equal(entry.model, entry.name);
  assert.ok(!Number.isNaN(Date.parse(entry.modified_at)), "modified_at must be an ISO date");
  assert.equal(typeof entry.size, "number");
  assert.ok(!body.models.some((tag) => tag.name === "llama3.2"), "the made-up models are gone");
});

test("flag on: a call without a credential is refused like /v1/models, and lists nothing", async () => {
  process.env.OMNIROUTE_OLLAMA_REAL_TAGS = "1";
  // A stored key ends the "no credential surface" loopback exemption, so auth is enforced.
  await apiKeysDb.createApiKey("ollama-tags-key", "ollama-tags-machine");
  await settingsDb.updateSettings({ requireLogin: true, setupComplete: true });
  const reference = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/v1/models")
  );
  assert.equal(reference.status, 401, "precondition: the catalog itself refuses this call");

  const response = await getTags();
  assert.equal(response.status, 401);
  assert.ok(!(await response.text()).includes(PREFIX));
});
