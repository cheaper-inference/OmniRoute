/**
 * The per-key dollar budget gates every endpoint at the policy phase, but only
 * chat and web search ever charged it. Image, speech, video/music and rerank
 * routes already price each successful call (`calculateModalCost`) — the
 * number was only attached to the X-OmniRoute cost header — so a key with a
 * budget could spend without limit on those routes. They now charge the
 * metered share of that cost to the budget, like chat does.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-budget-modal-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "budget-modal-routes-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { saveSyncedPricing } = await import("../../src/lib/pricingSync.ts");
const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const costRules = await import("../../src/domain/costRules.ts");
const mediaRoute = await import("../../src/app/api/v1/_shared/mediaGenerationRoute.ts");
const rerankRoute = await import("../../src/app/api/v1/rerank/route.ts");
const speechRoute = await import("../../src/app/api/v1/audio/speech/route.ts");
const imageRoute = await import("../../src/app/api/v1/images/generations/route.ts");

const originalFetch = globalThis.fetch;

async function resetStorage() {
  await waitForCallLogSaves(10_000);
  globalThis.fetch = originalFetch;
  costRules.resetCostData();
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await waitForCallLogSaves(10_000);
  globalThis.fetch = originalFetch;
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function seedConnection(provider: string) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider}-budget-modal`,
    apiKey: `${provider}-upstream-key`,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

async function keyWithDailyBudget(limitUsd: number) {
  const created = await apiKeysDb.createApiKey("Budgeted media key", "machine-budget-modal");
  apiKeysDb.clearApiKeyCaches();
  costRules.setBudget(created.id, { dailyLimitUsd: limitUsd, resetInterval: "daily" });
  return created;
}

function post(url: string, key: string, body: unknown) {
  return new Request(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify(body),
  });
}

function spent(apiKeyId: string): number {
  return Number(costRules.checkBudget(apiKeyId).periodUsed) || 0;
}

test("rerank: a priced call charges the key's dollar budget", async () => {
  saveSyncedPricing({ cohere: { "rerank-v3.5": { input: 0, output: 0, search_unit_cost: 0.5 } } });
  await seedConnection("cohere");
  const key = await keyWithDailyBudget(10);
  globalThis.fetch = (async (url: unknown) => {
    assert.equal(String(url), "https://api.cohere.com/v2/rerank");
    return new Response(
      JSON.stringify({
        id: "rerank-budget",
        results: [{ index: 0, relevance_score: 0.9 }],
        meta: { billed_units: { search_units: 3 } },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;

  const response = await rerankRoute.POST(
    post("http://localhost/api/v1/rerank", key.key, {
      model: "cohere/rerank-v3.5",
      query: "budget",
      documents: ["a", "b"],
    })
  );
  assert.equal(response.status, 200, await response.clone().text());
  assert.ok(Math.abs(spent(key.id) - 1.5) < 1e-9, `expected $1.5 charged, got ${spent(key.id)}`);
});

test("audio speech: a priced call charges the key's dollar budget", async () => {
  saveSyncedPricing({
    openai: { "tts-1": { input: 0, output: 0, input_cost_per_character: 0.01 } },
  });
  await seedConnection("openai");
  const key = await keyWithDailyBudget(10);
  globalThis.fetch = (async (url: unknown) => {
    assert.equal(String(url), "https://api.openai.com/v1/audio/speech");
    return new Response(new Uint8Array([1, 2, 3]), {
      status: 200,
      headers: { "content-type": "audio/mpeg" },
    });
  }) as typeof fetch;

  const response = await speechRoute.POST(
    post("http://localhost/api/v1/audio/speech", key.key, {
      model: "openai/tts-1",
      input: "x".repeat(100),
      voice: "alloy",
    }),
    {}
  );
  assert.equal(response.status, 200, await response.clone().text());
  assert.ok(Math.abs(spent(key.id) - 1) < 1e-9, `expected $1 charged, got ${spent(key.id)}`);
});

test("image generation: a priced call charges the key's dollar budget per delivered image", async () => {
  saveSyncedPricing({
    openai: { "dall-e-3": { input: 0, output: 0, output_cost_per_image: 0.25 } },
  });
  await seedConnection("openai");
  const key = await keyWithDailyBudget(10);
  globalThis.fetch = (async (url: unknown) => {
    assert.equal(String(url), "https://api.openai.com/v1/images/generations");
    return new Response(
      JSON.stringify({ created: 1, data: [{ b64_json: "aQ==" }, { b64_json: "aQ==" }] }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;

  const response = await imageRoute.POST(
    post("http://localhost/api/v1/images/generations", key.key, {
      model: "openai/dall-e-3",
      prompt: "budget",
      n: 2,
    })
  );
  assert.equal(response.status, 200, await response.clone().text());
  assert.ok(Math.abs(spent(key.id) - 0.5) < 1e-9, `expected $0.5 charged, got ${spent(key.id)}`);
});

test("video/music responses charge the budget of the key they were made for", async () => {
  saveSyncedPricing({
    openai: { "sora-test": { input: 0, output: 0, output_cost_per_video_per_second: 0.1 } },
  });
  const key = await keyWithDailyBudget(10);
  const response = await mediaRoute.successfulMediaGenerationResponse({
    result: { data: { ok: true } },
    billingMode: "video",
    provider: "openai",
    model: "openai/sora-test",
    startTime: Date.now(),
    duration: 4,
    apiKeyId: key.id,
  });
  assert.equal(response.status, 200);
  assert.ok(Math.abs(spent(key.id) - 0.4) < 1e-9, `expected $0.4 charged, got ${spent(key.id)}`);
});

test("recordModalCallCost: flat-rate providers, zero costs and keyless calls charge nothing", async () => {
  const key = await keyWithDailyBudget(10);
  costRules.recordModalCallCost(key.id, { provider: "opencode-go", model: "m", costUsd: 3 });
  costRules.recordModalCallCost(key.id, { provider: "openai", model: "m", costUsd: 0 });
  costRules.recordModalCallCost(null, { provider: "openai", model: "m", costUsd: 3 });
  assert.equal(spent(key.id), 0);
  costRules.recordModalCallCost(key.id, { provider: "openai", model: "m", costUsd: 0.75 });
  assert.ok(Math.abs(spent(key.id) - 0.75) < 1e-9);
});
