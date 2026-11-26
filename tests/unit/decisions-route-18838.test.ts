/**
 * #18838 (salvage) — route-level coverage for POST /v1/decisions and
 * GET /v1/systemone/models.
 *
 * The key policy (model allowlist, endpoint category) and the connection scope apply before
 * any credential is read or any upstream call is made, exactly as on /v1/systemone.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { useDecollidedMigrationsDir } from "./helpers/decollidedMigrationsDir.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-decisions-route-18838-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "decisions-route-test-secret";
useDecollidedMigrationsDir();

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { createDecisionsRouteHandlers } =
  await import("../../src/app/api/v1/_shared/decisionsRoute.ts");
const decisionsRoute = await import("../../src/app/api/v1/decisions/route.ts");
const catalog = await import("../../src/app/api/v1/_shared/decisionCatalog.ts");
const { resolveEndpointCategory } =
  await import("../../src/shared/constants/endpointCategories.ts");

const DEAD_CONNECTION_ID = "00000000-0000-4000-8000-00000000dead";
const VALID_BODY = {
  model: "openai/gpt-6-luna",
  input: "The customer asks for a refund",
  questions: [{ type: "predicate", name: "refund", instructions: "Is a refund due?" }],
};
const ANSWER = {
  model: "gpt-6-luna",
  answers: [{ type: "predicate", name: "refund", probability: 0.8 }],
  usage: { input_tokens: 9, output_tokens: 1 },
};

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function seedConnection(name: string, apiKey: string) {
  return providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name,
    apiKey,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

function postRequest(body: unknown, bearer?: string) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (bearer) headers.Authorization = `Bearer ${bearer}`;
  return new Request("http://localhost/v1/decisions", {
    method: "POST",
    headers,
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

function fakeUpstream() {
  const auth: string[] = [];
  const transport = async (_url: string, init: { headers: Record<string, string> }) => {
    auth.push(init.headers.Authorization ?? "");
    return Response.json(ANSWER);
  };
  return { auth, handlers: createDecisionsRouteHandlers({ transport: transport as never }) };
}

test("/v1/decisions belongs to the decisions endpoint category", () => {
  assert.equal(resolveEndpointCategory("/v1/decisions"), "decisions");
  assert.equal(resolveEndpointCategory("/v1/systemone/models"), "decisions");
  assert.equal(resolveEndpointCategory("/v1/systemone"), "decisions");
});

test("route: a connection-scoped key is served only by its allowed connection", async () => {
  const connB = await seedConnection("decisions-conn-B", "sk-openai-B");
  const connA = await seedConnection("decisions-conn-A", "sk-openai-A");
  assert.notEqual(connA.id, connB.id);
  const key = await apiKeysDb.createApiKey("decisions-restricted-to-A", "machine-18838", [], {
    allowedConnections: [String(connA.id)],
  });
  const disjointKey = await apiKeysDb.createApiKey("decisions-elsewhere", "machine-18838", [], {
    allowedConnections: [DEAD_CONNECTION_ID],
  });
  apiKeysDb.clearApiKeyCaches();

  const { auth, handlers } = fakeUpstream();
  for (let i = 0; i < 3; i++) {
    const response = await handlers.POST(postRequest(VALID_BODY, key.key));
    assert.equal(response.status, 200, await response.clone().text());
    assert.deepEqual(((await response.json()) as { answers: unknown }).answers, ANSWER.answers);
  }
  assert.deepEqual([...new Set(auth)], ["Bearer sk-openai-A"]);

  auth.length = 0;
  const denied = await handlers.POST(postRequest(VALID_BODY, disjointKey.key));
  assert.ok(denied.status >= 400 && denied.status < 600, `status ${denied.status}`);
  assert.ok(!(await denied.text()).includes("at /"), "no stack trace leaks");
  assert.equal(auth.length, 0, "no upstream call outside the key's scope");
});

test("route: model allowlist and endpoint category are enforced before any upstream call", async () => {
  const modelRestricted = await apiKeysDb.createApiKey("decisions-models", "machine-18838", [], {
    allowedModels: ["typesafe/*"],
  });
  const endpointRestricted = await apiKeysDb.createApiKey("decisions-chat-only", "machine-18838");
  await apiKeysDb.updateApiKeyPermissions(endpointRestricted.id, { allowedEndpoints: ["chat"] });
  apiKeysDb.clearApiKeyCaches();

  const { auth, handlers } = fakeUpstream();
  const byModel = await handlers.POST(postRequest(VALID_BODY, modelRestricted.key));
  assert.ok([401, 403].includes(byModel.status), `status ${byModel.status}`);
  const byEndpoint = await handlers.POST(postRequest(VALID_BODY, endpointRestricted.key));
  assert.equal(byEndpoint.status, 403, await byEndpoint.clone().text());
  assert.match(await byEndpoint.text(), /decisions/);
  assert.equal(auth.length, 0);
});

test("route: malformed JSON, schema failures, unknown models and oversized bodies are refused", async () => {
  const key = await apiKeysDb.createApiKey("decisions-open", "machine-18838");
  apiKeysDb.clearApiKeyCaches();
  const { auth, handlers } = fakeUpstream();

  assert.equal((await handlers.POST(postRequest("{not json", key.key))).status, 400);
  const systemOneShape = await handlers.POST(
    postRequest({ model: "openai/gpt-6-luna", state: "s", questions: {} }, key.key)
  );
  assert.equal(systemOneShape.status, 400);
  const chatModel = await handlers.POST(
    postRequest({ ...VALID_BODY, model: "openai/gpt-6" }, key.key)
  );
  assert.equal(chatModel.status, 400);
  assert.match(await chatModel.text(), /Unknown Decisions model/);

  const oversized = new Request("http://localhost/v1/decisions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key.key}`,
      "Content-Length": String(5 * 1024 * 1024),
    },
    body: JSON.stringify(VALID_BODY),
  });
  assert.equal((await handlers.POST(oversized)).status, 413);
  assert.equal(auth.length, 0);
});

test("route module exports OPTIONS with CORS methods and a POST handler", async () => {
  const options = decisionsRoute.OPTIONS();
  assert.match(options.headers.get("Access-Control-Allow-Methods") ?? "", /POST/);
  assert.equal(typeof decisionsRoute.POST, "function");
});

test("decision catalog merges System One and native rows, pages the final list", async () => {
  const rows = catalog.buildDecisionCatalogRows([
    { id: "typesafe/jev-latest", owned_by: "typesafe", type: "decisions" },
    {
      id: "openrouter/typesafe/jev-1.13",
      owned_by: "openrouter",
      supported_endpoints: ["decisions"],
    },
    { id: "openai/gpt-6-luna", owned_by: "openai", root: "gpt-6-luna", type: "chat" },
    { id: "openai/gpt-6.1-sol", owned_by: "openai", root: "gpt-6.1-sol", type: "chat" },
  ]);
  assert.deepEqual(
    rows.map((row) => [row.id, row.api_format]),
    [
      ["openai/gpt-6-luna", "decisions"],
      ["openrouter/typesafe/jev-1.13", "systemone"],
      ["typesafe/jev-latest", "systemone"],
    ]
  );

  const page = catalog.decisionCatalogResponse(
    new Request("http://localhost/v1/systemone/models?limit=2"),
    rows,
    false
  );
  assert.equal(page.status, 200);
  assert.equal(page.headers.get("X-OmniRoute-Catalog-Status"), "complete");
  const first = (await page.json()) as {
    data: { id: string }[];
    has_more: boolean;
    last_id: string;
  };
  assert.deepEqual(
    first.data.map((row) => row.id),
    ["openai/gpt-6-luna", "openrouter/typesafe/jev-1.13"]
  );
  assert.equal(first.has_more, true);
  const next = catalog.decisionCatalogResponse(
    new Request(`http://localhost/v1/systemone/models?limit=2&after=${first.last_id}`),
    rows,
    true
  );
  assert.equal(next.headers.get("X-OmniRoute-Catalog-Status"), "partial");
  const second = (await next.json()) as { data: { id: string }[]; has_more: boolean };
  assert.deepEqual(
    second.data.map((row) => row.id),
    ["typesafe/jev-latest"]
  );
  assert.equal(second.has_more, false);

  const unavailable = catalog.decisionCatalogResponse(
    new Request("http://localhost/v1/systemone/models"),
    [],
    true
  );
  assert.equal(unavailable.status, 503);
  assert.equal(unavailable.headers.get("X-OmniRoute-Catalog-Status"), "unavailable");
});

test("GET /v1/systemone/models answers a list envelope and honours the endpoint category", async () => {
  const modelsRoute = await import("../../src/app/api/v1/systemone/models/route.ts");
  const listing = await modelsRoute.GET(new Request("http://localhost/v1/systemone/models"));
  assert.ok([200, 503].includes(listing.status), `status ${listing.status}`);
  const payload = (await listing.json()) as { object?: string; data?: { api_format?: string }[] };
  assert.equal(payload.object, "list");
  for (const row of payload.data ?? []) {
    assert.ok(["systemone", "decisions"].includes(String(row.api_format)));
  }

  const chatOnly = await apiKeysDb.createApiKey("catalog-chat-only", "machine-18838");
  await apiKeysDb.updateApiKeyPermissions(chatOnly.id, { allowedEndpoints: ["chat"] });
  apiKeysDb.clearApiKeyCaches();
  const refused = await modelsRoute.GET(
    new Request("http://localhost/v1/systemone/models", {
      headers: { Authorization: `Bearer ${chatOnly.key}` },
    })
  );
  assert.equal(refused.status, 403);
});
