import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-systemone-models-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "systemone-models-test-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const costRules = await import("../../src/domain/costRules.ts");
const rateLimiter = await import("../../src/shared/utils/rateLimiter.ts");
const route = await import("../../src/app/api/v1/systemone/models/route.ts");
const { handleSystemOneModels } = await import("../../src/app/api/v1/_shared/systemOneModels.ts");
const { resolveSystemOneTarget } = await import("../../open-sse/config/systemOneRegistry.ts");

rateLimiter.setRateLimiterTestMode(true);
const originalFetch = globalThis.fetch;

const OPENROUTER_URL = "https://openrouter.ai/api/v1/models?output_modalities=decisions";
const TYPESAFE_URL = "https://api.typesafe.ai/v1/models";

type SystemOneModel = {
  id: string;
  object: string;
  name: string;
  owned_by: string;
  pricing?: Record<string, string>;
  architecture: { modality?: string; output_modalities: string[] };
};

function decisionModel(
  id: string,
  pricing: Record<string, string> = { prompt: "0.00000004", completion: "0" }
) {
  return {
    id,
    canonical_slug: `${id}-20261001`,
    name: `Name of ${id}`,
    created: 1790886451,
    description: "A decision model",
    context_length: 32000,
    architecture: {
      modality: "text->decisions",
      input_modalities: ["text"],
      output_modalities: ["decisions"],
      tokenizer: "Other",
      instruct_type: null,
    },
    pricing,
    top_provider: { context_length: 32000, max_completion_tokens: 28800, is_moderated: false },
    supported_parameters: [],
    links: { details: `/api/v1/models/${id}/endpoints` },
  };
}

function chatModel(id: string) {
  const model = decisionModel(id);
  model.architecture = {
    ...model.architecture,
    modality: "text->text",
    output_modalities: ["text"],
  };
  return model;
}

const OPENROUTER_MODELS = [
  decisionModel("typesafe/jev-1.13", { prompt: "0.000000042", completion: "0" }),
  decisionModel("~typesafe/jev-latest", { prompt: "0.000000042", completion: "0" }),
  decisionModel("inception/mercury-decide:free", { prompt: "0", completion: "0" }),
  decisionModel("liquid/d1", {
    prompt: "0.00000004",
    completion: "0",
    input_cache_read: "0.00000004",
  }),
];

const TYPESAFE_MODELS = {
  models: [
    { name: "jev-latest", description: "Latest Jev", release_date: "2026-10-14" },
    { name: "jev-1.13.0", description: "Jev 1.13", release_date: "2026-09-15" },
  ],
};

type Reply = unknown | (() => Response | Promise<Response>);
type Call = { url: string; init?: RequestInit };

/** Answers each backend's catalog URL; anything else is a test bug. */
function stubBackends(openrouter: Reply, typesafe: Reply = TYPESAFE_MODELS): Call[] {
  const calls: Call[] = [];
  globalThis.fetch = (async (url: string, init?: RequestInit) => {
    calls.push({ url: String(url), init });
    const reply = String(url) === OPENROUTER_URL ? openrouter : typesafe;
    assert.ok(
      String(url) === OPENROUTER_URL || String(url) === TYPESAFE_URL,
      `unexpected URL ${url}`
    );
    if (typeof reply === "function") return (reply as () => Response | Promise<Response>)();
    return new Response(typeof reply === "string" ? reply : JSON.stringify(reply), { status: 200 });
  }) as typeof fetch;
  return calls;
}

/** Both backends fail the same way. */
function stubAllFailing(reply: Reply) {
  return stubBackends(reply, reply);
}

function listRequest(headers: Record<string, string> = {}, urlPath = "/v1/systemone/models") {
  return new Request(`http://localhost${urlPath}`, { headers });
}

async function listIds(response: Response): Promise<string[]> {
  const body = (await response.json()) as { data: Array<{ id: string }> };
  return body.data.map((m) => m.id);
}

let openrouterConnectionId = "";
let typesafeConnectionId = "";

test.before(async () => {
  await core.ensureDbInitialized();
  const openrouter = await providersDb.createProviderConnection({
    provider: "openrouter",
    apiKey: "sk-or-test",
    name: "Decision catalog",
    isActive: true,
  });
  const typesafe = await providersDb.createProviderConnection({
    provider: "typesafe",
    apiKey: "sk-ts-test",
    name: "Native Jev",
    isActive: true,
  });
  openrouterConnectionId = String(openrouter.id);
  typesafeConnectionId = String(typesafe.id);
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  globalThis.fetch = originalFetch;
  apiKeysDb.resetApiKeyState();
  costRules.resetCostData();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("GET /v1/systemone/models lists TypeSafe and OpenRouter decisions models under POST ids", async () => {
  const calls = stubBackends({ data: OPENROUTER_MODELS, total_count: 4 });
  const response = await route.GET(listRequest());

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(response.headers.get("x-omniroute-catalog-status"), "complete");
  const body = (await response.json()) as { object: string; data: SystemOneModel[] };
  assert.equal(body.object, "list");
  assert.deepEqual(
    body.data.map((m) => m.id),
    [
      "typesafe/jev-latest",
      "typesafe/jev-1.13.0",
      "openrouter/typesafe/jev-1.13",
      "openrouter/~typesafe/jev-latest",
      "openrouter/inception/mercury-decide:free",
      "openrouter/liquid/d1",
    ]
  );

  const native = body.data[0];
  assert.equal(native.object, "model");
  assert.equal(native.owned_by, "typesafe");
  assert.equal(native.name, "jev-latest");
  assert.deepEqual(native.architecture.output_modalities, ["decisions"]);

  const routed = body.data[2];
  assert.equal(routed.object, "model");
  assert.equal(routed.owned_by, "typesafe");
  assert.equal(routed.name, "Name of typesafe/jev-1.13");
  assert.deepEqual(routed.pricing, { prompt: "0.000000042", completion: "0" });
  assert.equal(routed.architecture.modality, "text->decisions");
  assert.equal(body.data[4].owned_by, "inception");
  assert.equal(body.data[5].pricing?.input_cache_read, "0.00000004");

  assert.deepEqual(calls.map((c) => c.url).sort(), [OPENROUTER_URL, TYPESAFE_URL].sort());
  for (const call of calls) assert.ok(call.init?.signal, "upstream call must carry a timeout");
  const authorization = (call: Call) =>
    (call.init?.headers as Record<string, string> | undefined)?.Authorization;
  assert.equal(authorization(calls.find((c) => c.url === TYPESAFE_URL)!), "Bearer sk-ts-test");
  // OpenRouter's decisions catalog is public: the credential is not attached.
  assert.equal(authorization(calls.find((c) => c.url === OPENROUTER_URL)!), undefined);
});

test("every listed id is accepted as-is by the POST /v1/systemone resolver", async () => {
  stubBackends({ data: OPENROUTER_MODELS });
  const ids = await listIds(await route.GET(listRequest()));
  assert.ok(ids.length > 0);
  for (const id of ids) {
    const target = resolveSystemOneTarget(id);
    assert.ok(target, id);
    assert.equal(target.backend, id.split("/")[0], id);
    assert.equal(target.upstreamModel, id.slice(id.indexOf("/") + 1), id);
  }
});

test("only decisions models are returned from the OpenRouter catalog", async () => {
  stubBackends(
    {
      data: [
        decisionModel("typesafe/jev-1.13"),
        chatModel("openai/gpt-5"),
        {
          ...chatModel("openai/text-embedding-3"),
          architecture: { output_modalities: ["embeddings"] },
        },
        { id: "no-architecture", name: "x" },
        decisionModel("liquid/d1"),
      ],
    },
    { models: [] }
  );
  assert.deepEqual(await listIds(await route.GET(listRequest())), [
    "openrouter/typesafe/jev-1.13",
    "openrouter/liquid/d1",
  ]);
});

test("a failing backend catalog leaves the other backend listed and marks the list partial", async () => {
  stubBackends(() => new Response("{}", { status: 500 }));
  const response = await route.GET(listRequest());
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-omniroute-catalog-status"), "partial");
  assert.deepEqual(await listIds(response), ["typesafe/jev-latest", "typesafe/jev-1.13.0"]);

  stubBackends({ data: [decisionModel("liquid/d1")] }, () => new Response("nope", { status: 401 }));
  const typesafeDown = await route.GET(listRequest());
  assert.equal(typesafeDown.status, 200);
  assert.equal(typesafeDown.headers.get("x-omniroute-catalog-status"), "partial");
  assert.ok((await listIds(typesafeDown)).every((id) => id.startsWith("openrouter/")));
});

test("malformed catalogs from every backend fail closed with a sanitized 502", async () => {
  for (const payload of ["<html>boom</html>", { data: "nope" }, { models: "nope" }, [], "null"]) {
    stubAllFailing(payload);
    const response = await route.GET(listRequest());
    assert.equal(response.status, 502, JSON.stringify(payload));
    const text = await response.text();
    assert.ok(!text.includes("<html>"));
    assert.ok(!text.includes("boom"));
  }
});

test("an OpenRouter list with no valid decisions model fails closed instead of listing empty", async () => {
  stubBackends({ data: [chatModel("openai/gpt-5")] }, () => new Response("{}", { status: 500 }));
  const response = await route.GET(listRequest());
  assert.equal(response.status, 502);
});

test("empty upstream lists are a valid empty list", async () => {
  stubBackends({ data: [] }, { models: [] });
  const response = await route.GET(listRequest());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { object: "list", data: [] });
});

test("non-2xx upstream responses become a sanitized 502 without leaking upstream details", async () => {
  stubAllFailing(
    () =>
      new Response(
        JSON.stringify({
          error: { message: "internal at /srv/openrouter/app.ts:10 Bearer sk-or-leaked" },
        }),
        { status: 500 }
      )
  );
  const response = await route.GET(listRequest());
  assert.equal(response.status, 502);
  const text = await response.text();
  assert.ok(!text.includes("sk-or-leaked"));
  assert.ok(!text.includes("at /"));
  assert.ok(!text.includes("openrouter/app.ts"));
});

test("network errors and timeouts become a sanitized 502 / 504", async () => {
  globalThis.fetch = (async () => {
    throw new Error("connect ECONNREFUSED at /home/user/app/secret.ts:10 Bearer sk-or-leaked");
  }) as typeof fetch;
  const failed = await route.GET(listRequest());
  assert.equal(failed.status, 502);
  const failedText = await failed.text();
  assert.ok(!failedText.includes("sk-or-leaked"));
  assert.ok(!failedText.includes("at /"));

  globalThis.fetch = (async () => {
    throw new DOMException("The operation was aborted due to timeout", "TimeoutError");
  }) as typeof fetch;
  const timedOut = await route.GET(listRequest());
  assert.equal(timedOut.status, 504);
});

test("an oversized upstream body fails closed", async () => {
  stubAllFailing(`{"data":[],"models":[],"pad":"${"x".repeat(3_000_000)}"}`);
  const response = await route.GET(listRequest());
  assert.equal(response.status, 502);
});

test("the list reflects live upstream changes (no cache between calls)", async () => {
  stubBackends({ data: [decisionModel("liquid/d1")] }, { models: [] });
  const first = await listIds(await route.GET(listRequest()));
  stubBackends({ data: [decisionModel("liquid/d1"), decisionModel("liquid/d2")] }, { models: [] });
  const second = await listIds(await route.GET(listRequest()));
  assert.equal(first.length, 1);
  assert.equal(second.length, 2);
});

test("handleSystemOneModels applies the supplied model filter to the POST ids", async () => {
  stubBackends({ data: OPENROUTER_MODELS });
  const response = await handleSystemOneModels({
    isModelAllowed: async (id) =>
      id.startsWith("openrouter/typesafe/") || id === "typesafe/jev-latest",
  });
  assert.deepEqual(await listIds(response), [
    "typesafe/jev-latest",
    "openrouter/typesafe/jev-1.13",
  ]);
});

test("an unsafe upstream model id is never listed", async () => {
  stubBackends(
    { data: [decisionModel("evil/../admin"), decisionModel("liquid/d1")] },
    { models: [] }
  );
  assert.deepEqual(await listIds(await route.GET(listRequest())), ["openrouter/liquid/d1"]);
});

test("without an eligible connection no upstream is called and the list is empty", async () => {
  const calls = stubBackends({ data: OPENROUTER_MODELS });
  const response = await handleSystemOneModels({ allowedConnections: ["no-such-connection"] });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-omniroute-catalog-status"), "unconfigured");
  assert.deepEqual(await response.json(), { object: "list", data: [] });
  assert.equal(calls.length, 0);
});

test("CORS preflight allows GET", async () => {
  const response = await route.OPTIONS();
  assert.equal(response.status, 204);
  assert.match(response.headers.get("Access-Control-Allow-Methods") ?? "", /GET/);
  assert.match(response.headers.get("Access-Control-Allow-Methods") ?? "", /OPTIONS/);
  assert.match(response.headers.get("Access-Control-Allow-Headers") ?? "", /Authorization/);
  // The origin is owned by the middleware allowlist, never set by the route.
  assert.equal(response.headers.get("Access-Control-Allow-Origin"), null);
  stubBackends({ data: [decisionModel("liquid/d1")] });
  const ok = await route.GET(listRequest());
  assert.match(ok.headers.get("Access-Control-Allow-Methods") ?? "", /GET/);
});

test("a key scoped away from the decisions endpoint category is rejected with 403 before upstream", async () => {
  const key = await apiKeysDb.createApiKey("SO Scoped Key", "machine-so-models-scope");
  await apiKeysDb.updateApiKeyPermissions(key.id, { allowedEndpoints: ["chat"] });
  const calls = stubBackends({ data: OPENROUTER_MODELS });

  const response = await route.GET(listRequest({ Authorization: `Bearer ${key.key}` }));
  assert.equal(response.status, 403);
  assert.equal(calls.length, 0);

  // The App Router spelling resolves to the same category.
  const direct = await route.GET(
    listRequest({ Authorization: `Bearer ${key.key}` }, "/api/v1/systemone/models")
  );
  assert.equal(direct.status, 403);
});

test("a key allowed for decisions lists models; an over-budget key is rejected", async () => {
  const key = await apiKeysDb.createApiKey("SO Allowed Key", "machine-so-models-allowed");
  await apiKeysDb.updateApiKeyPermissions(key.id, { allowedEndpoints: ["decisions"] });
  stubBackends({ data: OPENROUTER_MODELS });
  const ok = await route.GET(listRequest({ Authorization: `Bearer ${key.key}` }));
  assert.equal(ok.status, 200);

  const budgetKey = await apiKeysDb.createApiKey("SO Budget Key", "machine-so-models-budget");
  costRules.setBudget(budgetKey.id, { dailyLimitUsd: 1, warningThreshold: 0.5 });
  costRules.recordCost(budgetKey.id, 2);
  const calls = stubBackends({ data: OPENROUTER_MODELS });
  const rejected = await route.GET(listRequest({ Authorization: `Bearer ${budgetKey.key}` }));
  assert.equal(rejected.status, 429);
  assert.equal(calls.length, 0);
});

test("model allow/deny rules narrow the list with the same ids POST /v1/systemone receives", async () => {
  const allowKey = await apiKeysDb.createApiKey("SO Allow Models", "machine-so-models-allow");
  await apiKeysDb.updateApiKeyPermissions(allowKey.id, {
    modelAccessMode: "restricted",
    allowedModels: ["openrouter/typesafe/jev-1.13", "typesafe/jev-latest"],
  });
  stubBackends({ data: OPENROUTER_MODELS });
  assert.deepEqual(
    await listIds(await route.GET(listRequest({ Authorization: `Bearer ${allowKey.key}` }))),
    ["typesafe/jev-latest", "openrouter/typesafe/jev-1.13"]
  );

  const denyKey = await apiKeysDb.createApiKey("SO Deny Models", "machine-so-models-deny");
  await apiKeysDb.updateApiKeyPermissions(denyKey.id, {
    blockedModels: ["openrouter/~typesafe/jev-latest", "typesafe/jev-1.13.0"],
  });
  stubBackends({ data: OPENROUTER_MODELS });
  assert.deepEqual(
    await listIds(await route.GET(listRequest({ Authorization: `Bearer ${denyKey.key}` }))),
    [
      "typesafe/jev-latest",
      "openrouter/typesafe/jev-1.13",
      "openrouter/inception/mercury-decide:free",
      "openrouter/liquid/d1",
    ]
  );
});

test("a connection-scoped key only reads the backends of its connections", async () => {
  const key = await apiKeysDb.createApiKey("SO Scoped Connection", "machine-so-models-conn");
  await apiKeysDb.updateApiKeyPermissions(key.id, { allowedConnections: [typesafeConnectionId] });
  const calls = stubBackends({ data: OPENROUTER_MODELS });
  const response = await route.GET(listRequest({ Authorization: `Bearer ${key.key}` }));
  assert.equal(response.status, 200);
  assert.deepEqual(await listIds(response), ["typesafe/jev-latest", "typesafe/jev-1.13.0"]);
  assert.deepEqual(
    calls.map((c) => c.url),
    [TYPESAFE_URL]
  );

  const orKey = await apiKeysDb.createApiKey("SO Scoped OpenRouter", "machine-so-models-conn-or");
  await apiKeysDb.updateApiKeyPermissions(orKey.id, {
    allowedConnections: [openrouterConnectionId],
  });
  stubBackends({ data: OPENROUTER_MODELS });
  const ids = await listIds(await route.GET(listRequest({ Authorization: `Bearer ${orKey.key}` })));
  assert.ok(ids.length > 0 && ids.every((id) => id.startsWith("openrouter/")));
});

test("an unauthenticated request lists models (the authz pipeline owns the require-key decision)", async () => {
  stubBackends({ data: [decisionModel("liquid/d1")] });
  const response = await route.GET(listRequest());
  assert.equal(response.status, 200);
});

test("/v1/systemone/models is a CLIENT_API route in the decisions endpoint category", async () => {
  const { resolveCanonicalEndpointPath, resolveEndpointCategory } =
    await import("../../src/shared/constants/endpointCategories.ts");
  const { classifyRoute } = await import("../../src/server/authz/classify.ts");
  assert.equal(resolveEndpointCategory("/v1/systemone/models"), "decisions");
  assert.equal(
    resolveEndpointCategory(resolveCanonicalEndpointPath("/api/v1/systemone/models")),
    "decisions"
  );
  assert.equal(classifyRoute("/v1/systemone/models", "GET").routeClass, "CLIENT_API");
  assert.equal(classifyRoute("/api/v1/systemone/models", "GET").routeClass, "CLIENT_API");
});
