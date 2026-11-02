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
const { SYSTEMONE_BACKENDS } = await import("../../open-sse/config/systemOneRegistry.ts");
const { handleSystemOneModels } = await import("../../open-sse/handlers/systemOneModels.ts");

rateLimiter.setRateLimiterTestMode(true);
const originalFetch = globalThis.fetch;

type SystemOneModel = {
  id: string;
  object: string;
  name: string;
  pricing: Record<string, string>;
  architecture: { modality: string; output_modalities: string[] };
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

const UPSTREAM_MODELS = [
  decisionModel("typesafe/jev-1.13", { prompt: "0.000000042", completion: "0" }),
  decisionModel("~typesafe/jev-latest", { prompt: "0.000000042", completion: "0" }),
  decisionModel("inception/mercury-decide:free", { prompt: "0", completion: "0" }),
  decisionModel("liquid/d1", {
    prompt: "0.00000004",
    completion: "0",
    input_cache_read: "0.00000004",
  }),
];

function stubUpstream(payload: unknown, init: ResponseInit = { status: 200 }) {
  const calls: Array<{ url: string; init?: RequestInit }> = [];
  globalThis.fetch = (async (url: string, requestInit?: RequestInit) => {
    calls.push({ url: String(url), init: requestInit });
    return new Response(typeof payload === "string" ? payload : JSON.stringify(payload), init);
  }) as typeof fetch;
  return calls;
}

function listRequest(headers: Record<string, string> = {}, urlPath = "/v1/systemone/models") {
  return new Request(`http://localhost${urlPath}`, { headers });
}

test.before(async () => {
  await core.ensureDbInitialized();
  await providersDb.createProviderConnection({
    provider: "openrouter",
    apiKey: "sk-or-test",
    name: "Decision catalog",
    isActive: true,
  });
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

test("GET /v1/systemone/models lists decisions models with upstream ids, names and pricing", async () => {
  const calls = stubUpstream({ data: UPSTREAM_MODELS, total_count: 4 });
  const response = await route.GET(listRequest());

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  const body = (await response.json()) as { object: string; data: SystemOneModel[] };
  assert.equal(body.object, "list");
  assert.deepEqual(
    body.data.map((m) => m.id),
    [
      "openrouter/typesafe/jev-1.13",
      "openrouter/~typesafe/jev-latest",
      "openrouter/inception/mercury-decide:free",
      "openrouter/liquid/d1",
    ]
  );
  const jev = body.data[0];
  assert.equal(jev.object, "model");
  assert.equal(jev.name, "Name of typesafe/jev-1.13");
  assert.deepEqual(jev.pricing, { prompt: "0.000000042", completion: "0" });
  assert.deepEqual(jev.architecture.output_modalities, ["decisions"]);
  assert.equal(jev.architecture.modality, "text->decisions");
  assert.equal(body.data[2].pricing.prompt, "0");
  assert.equal(body.data[3].pricing.input_cache_read, "0.00000004");

  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://openrouter.ai/api/v1/models?output_modalities=decisions");
  assert.equal(calls[0].url, SYSTEMONE_BACKENDS.openrouter.modelsUrl);
  // Public endpoint: no OpenRouter credential is attached.
  assert.equal(
    JSON.stringify(calls[0].init?.headers ?? {})
      .toLowerCase()
      .includes("authorization"),
    false
  );
  assert.ok(calls[0].init?.signal, "upstream call must carry a timeout signal");
});

test("only decisions models are returned; chat and embedding models are dropped", async () => {
  stubUpstream({
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
  });
  const response = await route.GET(listRequest());
  const body = (await response.json()) as { data: Array<{ id: string }> };
  assert.deepEqual(
    body.data.map((m) => m.id),
    ["openrouter/typesafe/jev-1.13", "openrouter/liquid/d1"]
  );
});

test("a malformed upstream body fails closed with a sanitized 502", async () => {
  for (const payload of ["<html>boom</html>", { data: "nope" }, { models: [] }, [], "null"]) {
    stubUpstream(payload);
    const response = await route.GET(listRequest());
    assert.equal(response.status, 502, JSON.stringify(payload));
    const text = await response.text();
    assert.ok(!text.includes("<html>"));
    assert.ok(!text.includes("boom"));
  }
});

test("an upstream list with no valid decisions model fails closed instead of returning an empty list", async () => {
  stubUpstream({ data: [chatModel("openai/gpt-5")] });
  const response = await route.GET(listRequest());
  assert.equal(response.status, 502);
});

test("an empty upstream list is a valid empty list", async () => {
  stubUpstream({ data: [] });
  const response = await route.GET(listRequest());
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { object: "list", data: [] });
});

test("non-2xx upstream responses become a sanitized 502 without leaking upstream details", async () => {
  stubUpstream(
    { error: { message: "internal at /srv/openrouter/app.ts:10 Bearer sk-or-leaked" } },
    { status: 500 }
  );
  const response = await route.GET(listRequest());
  assert.equal(response.status, 502);
  const text = await response.text();
  assert.ok(!text.includes("sk-or-leaked"));
  assert.ok(!text.includes("at /"));
  assert.ok(!text.includes("openrouter/app.ts"));
});

test("network errors and timeouts become a sanitized 502", async () => {
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
  stubUpstream(`{"data":[],"pad":"${"x".repeat(3_000_000)}"}`);
  const response = await route.GET(listRequest());
  assert.equal(response.status, 502);
});

test("the list reflects live upstream changes (no cache between calls)", async () => {
  stubUpstream({ data: [decisionModel("typesafe/jev-1.13")] });
  const first = (await (await route.GET(listRequest())).json()) as { data: unknown[] };
  stubUpstream({ data: [decisionModel("typesafe/jev-1.13"), decisionModel("liquid/d1")] });
  const second = (await (await route.GET(listRequest())).json()) as { data: unknown[] };
  assert.equal(first.data.length, 1);
  assert.equal(second.data.length, 2);
});

test("handleSystemOneModels applies the supplied model filter", async () => {
  stubUpstream({ data: UPSTREAM_MODELS });
  const response = await handleSystemOneModels({
    isModelAllowed: async (id) => id.startsWith("openrouter/typesafe/"),
  });
  const body = (await response.json()) as { data: Array<{ id: string }> };
  assert.deepEqual(
    body.data.map((m) => m.id),
    ["openrouter/typesafe/jev-1.13", "openrouter/~typesafe/jev-latest"]
  );
});

test("CORS preflight allows GET", async () => {
  const response = await route.OPTIONS();
  assert.match(response.headers.get("Access-Control-Allow-Methods") ?? "", /GET/);
  assert.equal(response.headers.get("Access-Control-Allow-Headers"), "*");
  stubUpstream({ data: [decisionModel("typesafe/jev-1.13")] });
  const ok = await route.GET(listRequest());
  assert.match(ok.headers.get("Access-Control-Allow-Methods") ?? "", /GET/);
});

test("a key scoped away from the systemone endpoint category is rejected with 403 before upstream", async () => {
  const key = await apiKeysDb.createApiKey("SO Scoped Key", "machine-so-models-scope");
  await apiKeysDb.updateApiKeyPermissions(key.id, { allowedEndpoints: ["chat"] });
  const calls = stubUpstream({ data: UPSTREAM_MODELS });

  const response = await route.GET(listRequest({ Authorization: `Bearer ${key.key}` }));
  assert.equal(response.status, 403);
  assert.equal(calls.length, 0);

  // The App Router spelling resolves to the same category.
  const direct = await route.GET(
    listRequest({ Authorization: `Bearer ${key.key}` }, "/api/v1/systemone/models")
  );
  assert.equal(direct.status, 403);
});

test("a key allowed for systemone lists models; an over-budget key is rejected", async () => {
  const key = await apiKeysDb.createApiKey("SO Allowed Key", "machine-so-models-allowed");
  await apiKeysDb.updateApiKeyPermissions(key.id, { allowedEndpoints: ["systemone"] });
  stubUpstream({ data: UPSTREAM_MODELS });
  const ok = await route.GET(listRequest({ Authorization: `Bearer ${key.key}` }));
  assert.equal(ok.status, 200);

  const budgetKey = await apiKeysDb.createApiKey("SO Budget Key", "machine-so-models-budget");
  costRules.setBudget(budgetKey.id, { dailyLimitUsd: 1, warningThreshold: 0.5 });
  costRules.recordCost(budgetKey.id, 2);
  const calls = stubUpstream({ data: UPSTREAM_MODELS });
  const rejected = await route.GET(listRequest({ Authorization: `Bearer ${budgetKey.key}` }));
  assert.equal(rejected.status, 429);
  assert.equal(calls.length, 0);
});

test("model allow/deny rules narrow the list with the same canonical ids as POST /v1/systemone", async () => {
  const allowKey = await apiKeysDb.createApiKey("SO Allow Models", "machine-so-models-allow");
  await apiKeysDb.updateApiKeyPermissions(allowKey.id, {
    modelAccessMode: "restricted",
    allowedModels: ["openrouter/typesafe/jev-1.13"],
  });
  stubUpstream({ data: UPSTREAM_MODELS });
  const allowed = (await (
    await route.GET(listRequest({ Authorization: `Bearer ${allowKey.key}` }))
  ).json()) as { data: Array<{ id: string }> };
  assert.deepEqual(
    allowed.data.map((m) => m.id),
    ["openrouter/typesafe/jev-1.13"]
  );

  const denyKey = await apiKeysDb.createApiKey("SO Deny Models", "machine-so-models-deny");
  await apiKeysDb.updateApiKeyPermissions(denyKey.id, {
    blockedModels: ["openrouter/typesafe/jev-latest"],
  });
  stubUpstream({ data: UPSTREAM_MODELS });
  const denied = (await (
    await route.GET(listRequest({ Authorization: `Bearer ${denyKey.key}` }))
  ).json()) as { data: Array<{ id: string }> };
  // `~typesafe/jev-latest` canonicalizes to typesafe/jev-latest, so the deny rule hides it too.
  assert.deepEqual(
    denied.data.map((m) => m.id),
    [
      "openrouter/typesafe/jev-1.13",
      "openrouter/inception/mercury-decide:free",
      "openrouter/liquid/d1",
    ]
  );
});

test("an unauthenticated request lists models (the authz pipeline owns the require-key decision)", async () => {
  stubUpstream({ data: [decisionModel("typesafe/jev-1.13")] });
  const response = await route.GET(listRequest());
  assert.equal(response.status, 200);
});

test("/v1/systemone/models is a CLIENT_API route in the systemone endpoint category", async () => {
  const { resolveCanonicalEndpointPath, resolveEndpointCategory } =
    await import("../../src/shared/constants/endpointCategories.ts");
  const { classifyRoute } = await import("../../src/server/authz/classify.ts");
  assert.equal(resolveEndpointCategory("/v1/systemone/models"), "systemone");
  assert.equal(
    resolveEndpointCategory(resolveCanonicalEndpointPath("/api/v1/systemone/models")),
    "systemone"
  );
  assert.equal(classifyRoute("/v1/systemone/models", "GET").routeClass, "CLIENT_API");
  assert.equal(classifyRoute("/api/v1/systemone/models", "GET").routeClass, "CLIENT_API");
});
