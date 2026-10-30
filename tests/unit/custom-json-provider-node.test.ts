// Custom JSON API provider nodes: persistence (migration 215), node create/update routes,
// connection hydration, config-only connection validation and the explicit node test.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-custom-json-node-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const nodesRoute = await import("../../src/app/api/provider-nodes/route.ts");
const nodeIdRoute = await import("../../src/app/api/provider-nodes/[id]/route.ts");
const validateRoute = await import("../../src/app/api/provider-nodes/validate/route.ts");
const { hydrateCompatibleNodeCreation } =
  await import("../../src/lib/providers/compatibleNodeCreation.ts");
const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");

const originalFetch = globalThis.fetch;
// Route responses and DB rows are untyped JSON documents.
type JsonValue = string | number | boolean | null | undefined | Json | JsonValue[];
interface Json {
  [key: string]: JsonValue & Json;
}

async function resetStorage() {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(resetStorage);
test.after(async () => {
  await resetStorage();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function jsonRequest(url: string, method: string, body: unknown) {
  return new Request(url, {
    method,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

const customJson = {
  method: "PUT",
  authType: "api-key",
  authHeader: "X-Service-Key",
  requestTemplate: { project_id: "demo", question: "{{prompt}}" },
  responsePath: "data.answer",
};
const nodeInput = (overrides: Json = {}) => ({
  type: "openai-compatible",
  apiType: "custom-json",
  name: "Business API",
  prefix: "biz",
  baseUrl: "https://api.example.com/generate",
  customJson,
  ...overrides,
});

async function createNode(overrides: Json = {}) {
  const response = await nodesRoute.POST(
    jsonRequest("http://localhost/api/provider-nodes", "POST", nodeInput(overrides))
  );
  return { response, body: (await response.json()) as Json };
}

function updateNode(id: string, body: Json) {
  return nodeIdRoute.PUT(jsonRequest(`http://localhost/api/provider-nodes/${id}`, "PUT", body), {
    params: Promise.resolve({ id }),
  });
}

test("migration 215 adds provider_nodes.custom_json_config_json", () => {
  const db = core.getDbInstance() as unknown as {
    prepare: (sql: string) => { all: () => Json[] };
  };
  const columns = db
    .prepare("PRAGMA table_info(provider_nodes)")
    .all()
    .map((c: Json) => c.name);
  assert.ok(columns.includes("custom_json_config_json"));
});

test("creating a custom JSON node persists the normalized config", async () => {
  const { response, body } = await createNode();
  assert.equal(response.status, 201);
  assert.match(body.node.id, /^openai-compatible-custom-json-/);
  assert.equal(body.node.apiType, "custom-json");
  assert.deepEqual(body.node.customJsonConfig, customJson);

  const stored = (await providersDb.getProviderNodeById(body.node.id)) as Json;
  assert.deepEqual(stored.customJsonConfig, customJson);
});

test("omitted config fields take the defaults (model + messages, OpenAI reply path)", async () => {
  const { response, body } = await createNode({ customJson: undefined });
  assert.equal(response.status, 201);
  assert.deepEqual(body.node.customJsonConfig.requestTemplate, {
    model: "{{model}}",
    messages: "{{messages}}",
  });
  assert.equal(body.node.customJsonConfig.responsePath, "choices[0].message.content");
});

test("chat nodes store no custom JSON config", async () => {
  const { body } = await createNode({ apiType: "chat", customJson: undefined });
  assert.equal(body.node.customJsonConfig, null);
});

for (const [label, overrides] of [
  ["array template", { customJson: { requestTemplate: [] } }],
  ["prototype path", { customJson: { requestTemplate: { x: "{{request.__proto__}}" } } }],
  ["unknown variable", { customJson: { requestTemplate: { x: "{{env.HOME}}" } } }],
  ["bad response path", { customJson: { responsePath: "data.*" } }],
  ["no endpoint (no OpenAI default)", { baseUrl: undefined }],
  ["endpoint with credentials", { baseUrl: "https://u:p@api.example.com/run" }],
  ["endpoint with fragment", { baseUrl: "https://api.example.com/run#x" }],
  ["cloud metadata endpoint", { baseUrl: "http://169.254.169.254/latest" }],
  ["anthropic node type", { type: "anthropic-compatible" }],
  ["preset", { preset: "vibeproxy-openai" }],
] as const) {
  test(`create rejects ${label} with 400`, async () => {
    const { response } = await createNode(overrides as Json);
    assert.equal(response.status, 400);
    assert.equal((await providersDb.getProviderNodes()).length, 0);
  });
}

test("update rewrites every connection, keeps the config when omitted, drops it on chat", async () => {
  const { body } = await createNode();
  const nodeId = body.node.id;
  for (const name of ["one", "two"]) {
    await providersDb.createProviderConnection({
      provider: nodeId,
      authType: "apikey",
      name,
      apiKey: "k",
      providerSpecificData: { apiType: "custom-json", baseUrl: body.node.baseUrl, customJson },
    });
  }

  const changed = { ...customJson, responsePath: "result", method: "POST" };
  const res = await updateNode(nodeId, {
    ...nodeInput({ baseUrl: "https://api.example.com/v2/run" }),
    customJson: changed,
  });
  assert.equal(res.status, 200);
  for (const connection of (await providersDb.getProviderConnections({
    provider: nodeId,
  })) as Json[]) {
    assert.equal(connection.providerSpecificData.baseUrl, "https://api.example.com/v2/run");
    assert.deepEqual(connection.providerSpecificData.customJson, changed);
  }

  // A rename that does not resend the config keeps it.
  const renamed = await updateNode(nodeId, {
    ...nodeInput({ name: "Renamed", baseUrl: "https://api.example.com/v2/run" }),
    customJson: undefined,
  });
  assert.equal(renamed.status, 200);
  assert.deepEqual(
    ((await providersDb.getProviderNodeById(nodeId)) as Json).customJsonConfig,
    changed
  );

  // An invalid update is rejected without touching the stored node.
  const invalid = await updateNode(nodeId, {
    ...nodeInput(),
    customJson: { responsePath: "__proto__" },
  });
  assert.equal(invalid.status, 400);
  assert.deepEqual(
    ((await providersDb.getProviderNodeById(nodeId)) as Json).customJsonConfig,
    changed
  );

  const toChat = await updateNode(nodeId, { ...nodeInput(), apiType: "chat" });
  assert.equal(toChat.status, 200);
  assert.equal(((await providersDb.getProviderNodeById(nodeId)) as Json).customJsonConfig, null);
  for (const connection of (await providersDb.getProviderConnections({
    provider: nodeId,
  })) as Json[]) {
    assert.equal(connection.providerSpecificData.apiType, "chat");
    assert.equal(connection.providerSpecificData.customJson, undefined);
  }
});

test("new connections take the node's config; a conflicting client copy is refused", async () => {
  const { body } = await createNode();
  const node = (await providersDb.getProviderNodeById(body.node.id)) as Json;

  const exact = hydrateCompatibleNodeCreation(
    node.id,
    node,
    { customJson: { authType: "none" } },
    true
  );
  assert.equal(exact.error, null);
  assert.deepEqual(exact.data.customJson, customJson, "the node config wins over client input");

  const bare = hydrateCompatibleNodeCreation(
    "openai-compatible-custom-json",
    node,
    { customJson: { authType: "none" } },
    true
  );
  assert.match(String(bare.error), /customJson conflicts/);
});

test("connection validation checks the config only and never calls the endpoint", async () => {
  let called = 0;
  globalThis.fetch = (async () => {
    called += 1;
    return Response.json({});
  }) as typeof fetch;
  const ok = (await validateProviderApiKey({
    provider: "openai-compatible-custom-json-x",
    apiKey: "k",
    providerSpecificData: {
      apiType: "custom-json",
      baseUrl: "https://api.example.com/run",
      customJson,
    },
  })) as Json;
  assert.equal(ok.unsupported, true, "a valid config is reported as unverifiable, not invalid");

  const bad = (await validateProviderApiKey({
    provider: "openai-compatible-custom-json-x",
    apiKey: "k",
    providerSpecificData: {
      apiType: "custom-json",
      baseUrl: "https://api.example.com/run",
      customJson: { requestTemplate: [] },
    },
  })) as Json;
  assert.equal(bad.valid, false);
  assert.equal(bad.unsupported, false);
  assert.equal(called, 0);
});

test("the explicit node test sends exactly one real request with the template", async () => {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  globalThis.fetch = (async (url: string, init: RequestInit) => {
    calls.push({ url: String(url), init });
    return Response.json({ data: { answer: "pong" } });
  }) as typeof fetch;
  const response = await validateRoute.POST(
    jsonRequest("http://localhost/api/provider-nodes/validate", "POST", {
      baseUrl: "https://api.example.com/generate",
      apiKey: "k",
      apiType: "custom-json",
      customJson,
      customHeaders: { "X-App": "omniroute" },
    })
  );
  const body = (await response.json()) as Json;
  assert.equal(body.valid, true);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://api.example.com/generate");
  assert.equal(calls[0].init.method, "PUT");
  assert.equal((calls[0].init.headers as Json)["X-Service-Key"], "k");
  assert.equal((calls[0].init.headers as Json)["X-App"], "omniroute");
  assert.deepEqual(JSON.parse(String(calls[0].init.body)), {
    project_id: "demo",
    question: "ping",
  });
});

test("the explicit node test reports an upstream failure by status only", async () => {
  globalThis.fetch = (async () =>
    Response.json({ error: "secret upstream detail" }, { status: 500 })) as typeof fetch;
  const response = await validateRoute.POST(
    jsonRequest("http://localhost/api/provider-nodes/validate", "POST", {
      baseUrl: "https://api.example.com/generate",
      apiKey: "k",
      apiType: "custom-json",
      customJson,
    })
  );
  const body = (await response.json()) as Json;
  assert.equal(body.valid, false);
  assert.equal(body.error, "Custom JSON request failed (500)");
});
