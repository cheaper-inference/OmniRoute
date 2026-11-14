// PUT /api/providers/[id] with the real Zod schema and DB sanitizer: a body the schema accepts must
// persist, and one the sanitizer would refuse must come back as a 400 rather than a 500.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-map-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.APP_LOG_TO_FILE = "false";
process.env.JWT_SECRET = "test-jwt-secret-connection-model-map";
process.env.INITIAL_PASSWORD = "admin-secret";

const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection, getProviderConnectionById } =
  await import("../../src/lib/db/providers.ts");
const providerByIdRoute = await import("../../src/app/api/providers/[id]/route.ts");

async function put(id: string, body: Record<string, unknown>) {
  const request = await makeManagementSessionRequest(`http://localhost/api/providers/${id}`, {
    method: "PUT",
    body,
  });
  return providerByIdRoute.PUT(request, { params: Promise.resolve({ id }) });
}

async function seed() {
  return createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "model map route",
    apiKey: "sk-synthetic",
    isActive: true,
    testStatus: "active",
  });
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

for (const [name, modelMap] of [
  ["a null target", { "gpt-4o": null }],
  ["a blank target", { "gpt-4o": "   " }],
  ["a blank requested model", { "   ": "gpt-4o-mini" }],
  ["a non-string target", { "gpt-4o": 4 }],
  ["an array", ["gpt-4o"]],
] as const) {
  test(`PUT rejects ${name} with 400 and leaves the stored map alone`, async () => {
    const connection = await seed();
    const saved = await put(connection.id, { modelMap: { keep: "this" } });
    assert.equal(saved.status, 200);

    const response = await put(connection.id, { modelMap });
    assert.equal(response.status, 400);
    const stored = await getProviderConnectionById(connection.id);
    assert.deepEqual(stored?.modelMap, { keep: "this" });
  });
}

test("PUT trims and persists a valid map, accepts the snake alias, and null clears it", async () => {
  const connection = await seed();
  const camel = await put(connection.id, {
    modelMap: { " gpt-4o ": " gpt-4o-mini " },
    notes: "operator text",
  });
  assert.equal(camel.status, 200);
  let stored = await getProviderConnectionById(connection.id);
  assert.deepEqual(stored?.modelMap, { "gpt-4o": "gpt-4o-mini" });
  assert.equal(stored?.notes, "operator text");

  const snake = await put(connection.id, { model_map: { a: "b" } });
  assert.equal(snake.status, 200);
  stored = await getProviderConnectionById(connection.id);
  assert.deepEqual(stored?.modelMap, { a: "b" });
  assert.equal(stored?.notes, "operator text", "a partial update keeps the notes");

  const cleared = await put(connection.id, { modelMap: null });
  assert.equal(cleared.status, 200);
  stored = await getProviderConnectionById(connection.id);
  assert.equal(stored?.modelMap, null);
});

test("selected credentials carry the map but never the operator's notes", async () => {
  const connection = await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "notes stay home",
    apiKey: "sk-synthetic",
    isActive: true,
    testStatus: "active",
    notes: "billing contact",
    modelMap: { "gpt-4o": "gpt-4o-mini" },
  });
  const { getProviderCredentials } = await import("../../src/sse/services/auth.ts");
  const credentials = (await getProviderCredentials("openai")) as Record<string, unknown>;
  assert.equal(credentials.connectionId, connection.id);
  assert.deepEqual(credentials.modelMap, { "gpt-4o": "gpt-4o-mini" });
  assert.equal("notes" in credentials, false);
});
