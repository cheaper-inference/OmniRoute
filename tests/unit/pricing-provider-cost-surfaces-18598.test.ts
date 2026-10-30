import assert from "node:assert/strict";
import test from "node:test";
import { getDbInstance, resetDbInstance } from "../../src/lib/db/core.ts";
import { invalidateDbCache } from "../../src/lib/db/readCache.ts";
import { getPricingForModel, getPricingWithSources } from "../../src/lib/db/settings/pricing.ts";
import { enrichCatalogModelEntry } from "../../src/lib/modelMetadataRegistry.ts";
import { saveModelsDevPricing } from "../../src/lib/modelsDevSync.ts";
import { getSyncedPricing, syncPricingFromSources } from "../../src/lib/pricingSync.ts";
import { pricingFieldsSchema } from "../../src/shared/validation/schemas/pricing.ts";
import { calculateCostDetailed } from "../../src/lib/usage/costCalculator.ts";
import { meteredBudgetCost } from "../../src/lib/usage/meteredBudgetPolicy.ts";
import { buildOmniRouteResponseMetaHeaders } from "../../src/domain/omnirouteResponseMeta.ts";
import { createSSEStream } from "../../open-sse/utils/stream.ts";
import { normalizeUsage } from "../../open-sse/utils/usageTracking.ts";
import * as pricingRoute from "../../src/app/api/pricing/route.ts";
import { saveRequestUsage, getUsageHistory } from "../../src/lib/usage/usageHistory.ts";
import { getUsageStats } from "../../src/lib/usage/usageStats.ts";
import { getApiKeyUsageLimitStatus } from "../../src/lib/usage/apiKeyUsageLimits.ts";

const GLM = { input: 1.4, output: 4.4, cached: 0.26 };
const TOKENS = { input: 1_000, output: 100 };

function assertCost(actual: number, expected: number) {
  assert.ok(Math.abs(actual - expected) < 1e-12, `${actual} !== ${expected}`);
}

async function patchPricing(body: Parameters<typeof pricingFieldsSchema.parse>[0]) {
  const response = await pricingRoute.PATCH(
    new Request("http://localhost/api/pricing", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  );
  assert.equal(response.status, 200);
}

function seedLegacy() {
  const db = getDbInstance();
  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "pricing_synced",
    "opencode_go",
    JSON.stringify({ "glm-5.2": GLM })
  );
  invalidateDbCache("pricing");
}

function catalogPricing(model = "glm-5.2", provider = "opencode-go") {
  return pricingFieldsSchema.parse(
    enrichCatalogModelEntry({ id: `${provider}/${model}`, owned_by: provider, root: model }).pricing
  );
}

test.beforeEach(() => {
  getDbInstance()
    .prepare(
      "DELETE FROM key_value WHERE namespace IN ('pricing', 'pricing_synced', 'models_dev_pricing')"
    )
    .run();
  invalidateDbCache("pricing");
  getDbInstance().prepare("DELETE FROM usage_history").run();
});
test.after(() => resetDbInstance());

test("legacy source resolves with a nonempty canonical higher-layer bucket without rewriting storage", async () => {
  seedLegacy();
  saveModelsDevPricing({ "opencode-go": { other: { input: 7, output: 8 } } });
  const db = getDbInstance();
  const before = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = 'pricing_synced'")
    .all();
  assert.deepEqual(await getPricingForModel("opencode-go", "glm-5.2"), GLM);
  assert.deepEqual(catalogPricing(), GLM);
  assert.deepEqual(getSyncedPricing()["opencode-go"]["glm-5.2"], GLM);
  assert.deepEqual(
    db.prepare("SELECT key, value FROM key_value WHERE namespace = 'pricing_synced'").all(),
    before
  );
});

test("legacy and canonical source rows have stable per-field precedence", async () => {
  seedLegacy();
  getDbInstance()
    .prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run(
      "pricing_synced",
      "opencode-go",
      JSON.stringify({ "glm-5.2": { input: 0 }, other: { input: 7 } })
    );
  invalidateDbCache("pricing");
  assert.deepEqual(await getPricingForModel("opencode-go", "glm-5.2"), {
    input: 0,
    output: 4.4,
    cached: 0.26,
  });
  assert.deepEqual(catalogPricing(), { input: 0, output: 4.4, cached: 0.26 });
});

test("pricing sources report the normalized model as litellm", async () => {
  seedLegacy();
  const { pricing, sourceMap } = await getPricingWithSources();
  assert.deepEqual(pricing["opencode-go"]["glm-5.2"], GLM);
  assert.equal(sourceMap["opencode-go"]["glm-5.2"], "litellm");
  assert.equal(pricing.opencode_go, undefined);
  assert.equal(sourceMap.opencode_go, undefined);
});

test("subsequent sync replaces legacy storage with canonical output without changing user namespace", async (t) => {
  seedLegacy();
  const db = getDbInstance();
  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "pricing",
    "opencode_go",
    JSON.stringify({ untouched: { input: 11 } })
  );
  invalidateDbCache("pricing");
  const before = db.prepare("SELECT key, value FROM key_value WHERE namespace = 'pricing'").all();
  t.mock.method(globalThis, "fetch", async () =>
    Response.json({
      "opencode_go/glm-5.2": {
        litellm_provider: "opencode_go",
        input_cost_per_token: 0.0000014,
        output_cost_per_token: 0.0000044,
        cache_read_input_token_cost: 0.00000026,
      },
    })
  );
  assert.equal((await syncPricingFromSources({ sources: ["litellm"] })).success, true);
  assert.deepEqual(
    db.prepare("SELECT key FROM key_value WHERE namespace = 'pricing_synced'").all(),
    [{ key: "opencode-go" }]
  );
  assert.deepEqual(
    db.prepare("SELECT key, value FROM key_value WHERE namespace = 'pricing'").all(),
    before
  );
  assert.deepEqual(await getPricingForModel("opencode-go", "glm-5.2"), GLM);
});

test("legacy Go token estimates reach response headers with and without cached tokens", async () => {
  seedLegacy();
  for (const fixture of [
    { tokens: TOKENS, cost: 0.00184, header: "0.0018400000" },
    { tokens: { ...TOKENS, cached_tokens: 200 }, cost: 0.001612, header: "0.0016120000" },
  ]) {
    const result = await calculateCostDetailed("opencode-go", "glm-5.2", fixture.tokens);
    assert.equal(result.priced, true);
    assert.equal(result.failed, undefined);
    assertCost(result.costUsd, fixture.cost);
    const headers = buildOmniRouteResponseMetaHeaders({
      provider: "opencode-go",
      model: "glm-5.2",
      costUsd: result.costUsd,
      usage: fixture.tokens,
    });
    assert.equal(headers["X-OmniRoute-Response-Cost"], fixture.header);
    assert.equal(meteredBudgetCost("opencode-go", result.costUsd), 0);
  }
});

test("Responses SSE metadata prices actual cached Go usage through stored legacy rates", async () => {
  seedLegacy();
  const previous = process.env.OMNIROUTE_SSE_COMMENTS;
  process.env.OMNIROUTE_SSE_COMMENTS = "on";
  try {
    const source = new ReadableStream({
      start(controller) {
        controller.enqueue(
          new TextEncoder().encode(
            `event: response.completed\ndata: ${JSON.stringify({
              type: "response.completed",
              response: {
                id: "resp-18598",
                output: [{ type: "message", content: [{ type: "output_text", text: "done" }] }],
                usage: {
                  input_tokens: 1_000,
                  output_tokens: 100,
                  input_tokens_details: { cached_tokens: 200 },
                },
              },
            })}\n\n`
          )
        );
        controller.close();
      },
    });
    const output = await new Response(
      source.pipeThrough(
        createSSEStream({
          mode: "translate",
          sourceFormat: "openai",
          targetFormat: "openai-responses",
          clientResponseFormat: "openai-responses",
          provider: "opencode-go",
          model: "glm-5.2",
        })
      )
    ).text();
    assert.match(output, /: x-omniroute-response-cost=0\.0016120000/);
  } finally {
    if (previous === undefined) delete process.env.OMNIROUTE_SSE_COMMENTS;
    else process.env.OMNIROUTE_SSE_COMMENTS = previous;
  }
});

test("supported partial Go PATCH invalidates warm lookups, survives sync, and resets to synced rates", async (t) => {
  seedLegacy();
  assert.deepEqual(await getPricingForModel("opencode-go", "glm-5.2"), GLM);
  assert.deepEqual(catalogPricing(), GLM);
  await patchPricing({ "opencode-go": { "glm-5.2": { input: 2 } } });
  const expected = { input: 2, output: 4.4, cached: 0.26 };
  assert.deepEqual(await getPricingForModel("opencode-go", "glm-5.2"), expected);
  assert.deepEqual(catalogPricing(), expected);
  assertCost((await calculateCostDetailed("opencode-go", "glm-5.2", TOKENS)).costUsd, 0.00244);
  assert.equal((await getPricingWithSources()).sourceMap["opencode-go"]["glm-5.2"], "user");
  t.mock.method(globalThis, "fetch", async () =>
    Response.json({
      "opencode_go/glm-5.2": {
        litellm_provider: "opencode_go",
        input_cost_per_token: 0.0000014,
        output_cost_per_token: 0.0000044,
        cache_read_input_token_cost: 0.00000026,
      },
    })
  );
  assert.equal((await syncPricingFromSources({ sources: ["litellm"] })).success, true);
  assert.deepEqual(await getPricingForModel("opencode-go", "glm-5.2"), expected);
  assert.deepEqual(catalogPricing(), expected);
  assert.equal(
    (
      await pricingRoute.DELETE(
        new Request("http://localhost/api/pricing?provider=opencode-go&model=glm-5.2", {
          method: "DELETE",
        })
      )
    ).status,
    200
  );
  assert.deepEqual(await getPricingForModel("opencode-go", "glm-5.2"), GLM);
  assert.deepEqual(catalogPricing(), GLM);
});

test("partial models.dev and user overrides preserve legacy fields equally in catalog and cost", async () => {
  seedLegacy();
  // The persisted layer supports partial rows; the sync writer's typed input is complete.
  getDbInstance()
    .prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run("models_dev_pricing", "opencode-go", JSON.stringify({ "glm-5.2": { input: 2 } }));
  invalidateDbCache("pricing");
  await patchPricing({ "opencode-go": { "glm-5.2": { cached: 0 } } });
  const expected = { input: 2, output: 4.4, cached: 0 };
  assert.deepEqual(await getPricingForModel("opencode-go", "glm-5.2"), expected);
  assert.deepEqual(catalogPricing(), expected);
  assertCost((await calculateCostDetailed("opencode-go", "glm-5.2", TOKENS)).costUsd, 0.00244);
  assert.equal((await getPricingWithSources()).sourceMap["opencode-go"]["glm-5.2"], "user");
});

test("exact provider costs including zero beat conflicting local token rates", async () => {
  await patchPricing({ openrouter: { "glm-5.2": { input: 99, output: 99 } } });
  for (const cost of [0, 0.0007]) {
    const tokens = normalizeUsage({ prompt_tokens: 1_000, completion_tokens: 100, cost });
    const result = await calculateCostDetailed("openrouter", "glm-5.2", tokens);
    assert.deepEqual(result, { costUsd: cost, priced: true });
  }
  assertCost((await calculateCostDetailed("openrouter", "glm-5.2", TOKENS)).costUsd, 0.1089);
});

test("a genuinely free row is priced while missing cloud pricing is not", async () => {
  await patchPricing({ "synthetic-free-18598": { free: { input: 0, output: 0 } } });
  assert.deepEqual(await calculateCostDetailed("synthetic-free-18598", "free", TOKENS), {
    costUsd: 0,
    priced: true,
  });
  assert.deepEqual(await calculateCostDetailed("ollama-cloud", "deepseek-v4.1-flash", TOKENS), {
    costUsd: 0,
    priced: false,
  });
});

test("local Ollama free entries and Go tariffs never price an unpriced Ollama Cloud model", async () => {
  getDbInstance()
    .prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run(
      "pricing_synced",
      "ollama",
      JSON.stringify({ "deepseek-v4.1-flash": { input: 0, output: 0 } })
    );
  getDbInstance()
    .prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run(
      "pricing_synced",
      "opencode_go",
      JSON.stringify({ "deepseek-v4.1-flash": { input: 0.3, output: 1.2, cached: 0.006 } })
    );
  invalidateDbCache("pricing");
  for (const provider of ["ollama-cloud", "ollamacloud"]) {
    assert.equal(await getPricingForModel(provider, "deepseek-v4.1-flash"), null);
    assert.deepEqual(await calculateCostDetailed(provider, "deepseek-v4.1-flash", TOKENS), {
      costUsd: 0,
      priced: false,
    });
  }
});

test("synthetic cloud override prices and attributes metered usage, then resets to unpriced", async () => {
  // SYNTHETIC test-only tariff: not an authoritative Ollama rate or a shipped default.
  await patchPricing({ "ollama-cloud": { "deepseek-v4.1-flash": { input: 1, output: 2 } } });
  for (const provider of ["ollama-cloud", "ollamacloud"]) {
    assert.deepEqual(await getPricingForModel(provider, "deepseek-v4.1-flash"), {
      input: 1,
      output: 2,
    });
    const cost = await calculateCostDetailed(provider, "deepseek-v4.1-flash", TOKENS);
    assert.equal(cost.priced, true);
    assertCost(cost.costUsd, 0.0012);
    assertCost(meteredBudgetCost(provider, cost.costUsd), 0.0012);
  }
  assert.deepEqual(catalogPricing("deepseek-v4.1-flash", "ollama-cloud"), { input: 1, output: 2 });
  const timestamp = "2026-10-30T20:00:00.000Z";
  await saveRequestUsage({
    provider: "ollama-cloud",
    model: "deepseek-v4.1-flash",
    apiKeyId: "synthetic-cloud-key-18598",
    apiKeyName: "Synthetic cloud key",
    tokens: TOKENS,
    success: true,
    timestamp,
  });
  const history = await getUsageHistory({ provider: "ollama-cloud", model: "deepseek-v4.1-flash" });
  assert.equal(history.length, 1);
  assert.equal(history[0].apiKeyId, "synthetic-cloud-key-18598");
  assert.equal(history[0].provider, "ollama-cloud");
  assert.equal(history[0].model, "deepseek-v4.1-flash");
  assert.equal(history[0].tokens.input, 1_000);
  assert.equal(history[0].tokens.output, 100);
  const stats = await getUsageStats();
  for (const bucket of [
    stats.byProvider["ollama-cloud"],
    stats.byModel["deepseek-v4.1-flash (ollama-cloud)"],
    Object.values(stats.byApiKey).find((b) => b.apiKeyId === "synthetic-cloud-key-18598"),
  ]) {
    assert.ok(bucket);
    assert.equal(bucket.requests, 1);
    assert.equal(bucket.promptTokens, 1_000);
    assert.equal(bucket.completionTokens, 100);
    assertCost(bucket.cost, 0.0012);
  }
  const metadata = {
    id: "synthetic-cloud-key-18598",
    usageLimitEnabled: true,
    dailyUsageLimitUsd: 1,
  };
  const deps = {
    now: () => Date.parse(timestamp),
    getProviderConnections: async () => [],
    getAllProviderLimitsCache: () => ({}),
    getUnpricedUsagePolicy: () => "fail_closed" as const,
  };
  const priced = await getApiKeyUsageLimitStatus(metadata, deps);
  assertCost(priced.dailySpentUsd, 0.0012);
  assert.equal(priced.dailyHasUnpricedUsage, false);
  assert.equal(
    (
      await pricingRoute.DELETE(
        new Request(
          "http://localhost/api/pricing?provider=ollama-cloud&model=deepseek-v4.1-flash",
          { method: "DELETE" }
        )
      )
    ).status,
    200
  );
  assert.equal(await getPricingForModel("ollama-cloud", "deepseek-v4.1-flash"), null);
  assert.equal(await getPricingForModel("ollamacloud", "deepseek-v4.1-flash"), null);
  const unpriced = await getApiKeyUsageLimitStatus(metadata, deps);
  assert.equal(unpriced.dailyHasUnpricedUsage, true);
  assert.equal(unpriced.dailyExceeded, true);
});
