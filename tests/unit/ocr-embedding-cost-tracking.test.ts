import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-document-billing-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "document-billing-test-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const apiKeys = await import("../../src/lib/db/apiKeys.ts");
const { updatePricing } = await import("../../src/lib/db/settings.ts");
const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const { getUsageHistory, saveRequestUsage } = await import("../../src/lib/usage/usageHistory.ts");
const { getUnpricedUsageReport } = await import("../../src/lib/usage/unpricedUsage.ts");
const { getApiKeyUsageLimitStatus } = await import("../../src/lib/usage/apiKeyUsageLimits.ts");
const { rollupUsageHistoryBeforeDate } = await import("../../src/lib/usage/aggregateHistory.ts");
const costRules = await import("../../src/domain/costRules.ts");
const ocrRoute = await import("../../src/app/api/v1/ocr/route.ts");
const embeddingRoute = await import("../../src/app/api/v1/embeddings/route.ts");
const analyticsRoute = await import("../../src/app/api/usage/analytics/route.ts");
const { calculateOcrPageCost } = await import("../../src/lib/usage/ocrCost.ts");
const { createProviderNode } = await import("../../src/lib/db/providers/nodes.ts");
const { createCombo } = await import("../../src/lib/db/combos.ts");
const { transformToOmniRoute, saveSyncedPricing } = await import("../../src/lib/pricingSync.ts");
const originalFetch = globalThis.fetch;

test.beforeEach(async () => {
  await waitForCallLogSaves(10_000);
  globalThis.fetch = originalFetch;
  costRules.resetCostData();
  apiKeys.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
});

test.after(async () => {
  await waitForCallLogSaves(10_000);
  globalThis.fetch = originalFetch;
  costRules.resetCostData();
  apiKeys.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

function request(endpoint: string, key: string, body: unknown) {
  return new Request(`http://localhost/api/v1/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify(body),
  });
}

function near(actual: number, expected: number) {
  assert.ok(Math.abs(actual - expected) < 1e-9, `expected ${expected}, got ${actual}`);
}

async function seed(provider: string, model: string, price: Record<string, number>) {
  await updatePricing({ [provider]: { [model]: price } });
  const connection = await providers.createProviderConnection({
    provider,
    authType: "apikey",
    apiKey: "synthetic-upstream-secret",
    name: "Synthetic document billing",
    isActive: true,
    testStatus: "active",
  });
  const key = await apiKeys.createApiKey("Document billing", "synthetic-machine");
  apiKeys.clearApiKeyCaches();
  return { connection, key };
}

const ocrBody = {
  model: "mistral/mistral-ocr-4-1",
  document: { type: "document_url", document_url: "https://example.com/private-test.pdf" },
};

function mockOcr(pages: number) {
  let hits = 0;
  globalThis.fetch = async (url) => {
    assert.equal(String(url), "https://api.mistral.ai/v1/ocr");
    hits++;
    return Response.json({
      model: "mistral-ocr-4-1",
      pages: [{ index: 0, markdown: "SENSITIVE_OCR_CONTENT" }],
      usage_info: { pages_processed: pages },
    });
  };
  return () => hits;
}

async function settledLedger(keyId: string) {
  await new Promise((resolve) => setImmediate(resolve));
  return core
    .getDbInstance()
    .prepare("SELECT * FROM request_cost_ledger WHERE api_key_id = ? ORDER BY id")
    .all(keyId) as Array<Record<string, unknown>>;
}

test("OCR records provider-reported pages, price, cost, key and connection without fake tokens", async () => {
  const { connection, key } = await seed("mistral", "mistral-ocr-4-1", {
    input: 0,
    output: 0,
    ocr_cost_per_page: 0.004,
  });
  mockOcr(155);
  const response = await ocrRoute.POST(request("ocr", key.key, ocrBody));
  assert.equal(response.status, 200, await response.clone().text());
  near(Number(response.headers.get("x-omniroute-response-cost")), 0.62);
  assert.equal((await response.json()).pages[0].markdown, "SENSITIVE_OCR_CONTENT");
  const rows = await getUsageHistory();
  assert.equal(rows.length, 1);
  const row = rows[0] as unknown as Record<string, unknown>;
  assert.equal(row.apiKeyId, key.id);
  assert.equal(row.connectionId, connection.id);
  assert.equal(row.model, "mistral-ocr-4-1");
  assert.equal(row.billingUnit, "page");
  assert.equal(row.billingQuantity, 155);
  near(Number(row.billingUnitPriceUsd), 0.004);
  near(Number(row.calculatedCostUsd), 0.62);
  assert.equal(row.providerCostUsd, null, "a catalogue estimate is not provider-reported cost");
  assert.deepEqual(row.tokens, {
    input: 0,
    output: 0,
    cacheRead: 0,
    cacheCreation: 0,
    reasoning: 0,
  });
  const ledger = await settledLedger(key.id);
  assert.equal(ledger.length, 1);
  near(Number(ledger[0].amount_usd), 0.62);
  assert.equal(ledger[0].request_id, response.headers.get("x-omniroute-request-id"));
});

test("OCR updates daily budgets and usage limits; a rejected next request never reaches Mistral", async () => {
  const { key } = await seed("mistral", "mistral-ocr-4-1", { ocr_cost_per_page: 0.004 });
  await apiKeys.updateApiKeyPermissions(key.id, {
    usageLimitEnabled: true,
    weeklyUsageLimitUsd: 0.5,
  });
  apiKeys.clearApiKeyCaches();
  costRules.setBudget(key.id, { dailyLimitUsd: 0.5 });
  const hits = mockOcr(155);
  assert.equal((await ocrRoute.POST(request("ocr", key.key, ocrBody))).status, 200);
  near(costRules.checkBudget(key.id).periodUsed, 0.62);
  const metadata = await apiKeys.getApiKeyMetadata(key.key);
  assert.ok(metadata);
  near((await getApiKeyUsageLimitStatus(metadata)).weeklySpentUsd, 0.62);
  assert.equal((await ocrRoute.POST(request("ocr", key.key, ocrBody))).status, 429);
  assert.equal(hits(), 1);
});

test("OCR metadata survives no-log while document contents and URLs are not retained", async () => {
  const { key } = await seed("mistral", "mistral-ocr-4-1", { ocr_cost_per_page: 0.004 });
  await apiKeys.updateApiKeyPermissions(key.id, { noLog: true });
  apiKeys.clearApiKeyCaches();
  mockOcr(2);
  assert.equal((await ocrRoute.POST(request("ocr", key.key, ocrBody))).status, 200);
  await waitForCallLogSaves(10_000);
  assert.equal((await getUsageHistory()).length, 1);
  const logs = core
    .getDbInstance()
    .prepare("SELECT * FROM call_logs WHERE api_key_id = ?")
    .all(key.id);
  assert.equal(logs.length, 1);
  const serialized = JSON.stringify(logs);
  assert.ok(!serialized.includes("SENSITIVE_OCR_CONTENT"));
  assert.ok(!serialized.includes("private-test.pdf"));
  near(Number((await settledLedger(key.id))[0].amount_usd), 0.008);
});

test("embeddings reach usage history, budgets and ledger exactly once per physical batch", async (t) => {
  const { connection, key } = await seed("mistral", "mistral-embed", { input: 0.1, output: 0 });
  costRules.setBudget(key.id, { dailyLimitUsd: 1 });
  t.mock.timers.enable({ apis: ["Date"], now: Date.now() });
  const usage = { prompt_tokens: 1600, total_tokens: 1600 };
  globalThis.fetch = async () =>
    Response.json({
      object: "list",
      data: [{ index: 0, object: "embedding", embedding: [0.1, 0.2] }],
      usage,
    });
  const body = { model: "mistral/mistral-embed", input: ["a", "b"] };
  await Promise.all(
    Array.from({ length: 2 }, () => embeddingRoute.POST(request("embeddings", key.key, body)))
  );
  const rows = await getUsageHistory();
  assert.equal(rows.length, 2);
  assert.ok(rows.every((row) => row.apiKeyId === key.id && row.connectionId === connection.id));
  assert.equal(
    rows.reduce((sum, row) => sum + row.tokens.input, 0),
    3200
  );
  near(costRules.checkBudget(key.id).periodUsed, 0.00032);
  const ledger = await settledLedger(key.id);
  assert.equal(ledger.length, 2);
  near(
    ledger.reduce((sum, row) => sum + Number(row.amount_usd), 0),
    0.00032
  );
});

test("an OCR provider failure creates no successful usage or billed cost", async () => {
  const { key } = await seed("mistral", "mistral-ocr-4-1", { ocr_cost_per_page: 0.004 });
  globalThis.fetch = async () => Response.json({ error: "synthetic rejection" }, { status: 422 });
  assert.equal((await ocrRoute.POST(request("ocr", key.key, ocrBody))).status, 422);
  assert.equal((await getUsageHistory()).filter((row) => row.success).length, 0);
  assert.equal((await settledLedger(key.id)).length, 0);
});

test("OCR calculated cost reaches model analytics and survives daily rollup", async () => {
  const { key } = await seed("mistral", "mistral-ocr-4-1", { ocr_cost_per_page: 0.004 });
  mockOcr(155);
  assert.equal((await ocrRoute.POST(request("ocr", key.key, ocrBody))).status, 200);
  const response = await analyticsRoute.GET(
    new Request("http://localhost/api/usage/analytics?range=all")
  );
  assert.equal(response.status, 200, await response.clone().text());
  const analytics = await response.json();
  near(Number(analytics.summary.totalCost), 0.62);
  const cutoff = new Date(Date.now() + 86_400_000).toISOString();
  assert.equal((await rollupUsageHistoryBeforeDate(cutoff)).errors, 0);
  const rollup = core
    .getDbInstance()
    .prepare("SELECT total_cost FROM daily_usage_summary")
    .get() as { total_cost: number };
  near(rollup.total_cost, 0.62);
});

test("OCR pricing validates page counts, preserves free rates, and separates annotated tariffs", async () => {
  await updatePricing({
    mistral: {
      "mistral-ocr-4-1": {
        ocr_cost_per_page: 0.004,
        ocr_cost_per_annotated_page: 0.005,
      },
    },
  });
  for (const pages of [-1, 1.5, Infinity, NaN, "155", null]) {
    assert.equal(
      (await calculateOcrPageCost("mistral", "mistral-ocr-4-1", { pages_processed: pages }))
        .costUsd,
      null
    );
  }
  near(
    (await calculateOcrPageCost("mistral", "mistral-ocr-4-1", { pages_processed: 155 }, true))
      .costUsd!,
    0.775
  );
  assert.equal((await calculateOcrPageCost("mistral", "mistral-ocr-4-1", undefined)).costUsd, null);
  await updatePricing({ mistral: { "free-ocr": { ocr_cost_per_page: 0 } } });
  assert.equal(
    (await calculateOcrPageCost("mistral", "free-ocr", { pages_processed: 155 })).costUsd,
    0
  );
});

test("LiteLLM's annotated OCR tariff reaches route billing while operator overrides stay authoritative", async () => {
  const { key } = await seed("mistral", "mistral-ocr-4-1", { ocr_cost_per_page: 0.004 });
  saveSyncedPricing(
    transformToOmniRoute({
      "mistral-ocr-4-1": {
        litellm_provider: "mistral",
        mode: "ocr",
        annotation_cost_per_page: 0.005,
      },
    })
  );
  const hits = mockOcr(3);
  const body = {
    ...ocrBody,
    document_annotation_format: {
      type: "json_schema",
      json_schema: { name: "synthetic", schema: { type: "object" } },
    },
  };
  const response = await ocrRoute.POST(request("ocr", key.key, body));
  assert.equal(response.status, 200, await response.clone().text());
  assert.notEqual(response.headers.get("x-omniroute-response-cost"), null);
  near(Number(response.headers.get("x-omniroute-response-cost")), 0.015);
  let rows = await getUsageHistory();
  assert.equal(rows.length, 1);
  near(Number(rows[0].billingUnitPriceUsd), 0.005);
  near(Number(rows[0].calculatedCostUsd), 0.015);
  let ledger = await settledLedger(key.id);
  assert.equal(ledger.length, 1);
  near(Number(ledger[0].amount_usd), 0.015);

  await updatePricing({ mistral: { "mistral-ocr-4-1": { ocr_cost_per_annotated_page: 0.007 } } });
  const overridden = await ocrRoute.POST(request("ocr", key.key, body));
  assert.equal(overridden.status, 200, await overridden.clone().text());
  near(Number(overridden.headers.get("x-omniroute-response-cost")), 0.021);
  rows = await getUsageHistory();
  assert.equal(rows.length, 2);
  assert.deepEqual(rows.map((row) => Number(row.calculatedCostUsd)).sort(), [0.015, 0.021]);
  ledger = await settledLedger(key.id);
  assert.equal(ledger.length, 2);
  assert.deepEqual(ledger.map((row) => Number(row.amount_usd)).sort(), [0.015, 0.021]);
  assert.equal(hits(), 2, "one synthetic upstream request per OCR call, no retry or double debit");
});

test("OCR without measured pages never claims free usage and preserves fail-closed limits", async () => {
  const { key } = await seed("mistral", "mistral-ocr-4-1", {
    input: 0,
    output: 0,
    ocr_cost_per_page: 0.004,
  });
  await apiKeys.updateApiKeyPermissions(key.id, {
    usageLimitEnabled: true,
    weeklyUsageLimitUsd: 1,
  });
  apiKeys.clearApiKeyCaches();
  globalThis.fetch = async () => Response.json({ pages: [{ index: 0, markdown: "text" }] });
  const response = await ocrRoute.POST(request("ocr", key.key, ocrBody));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-omniroute-response-cost"), null);
  const row = (await getUsageHistory())[0] as unknown as Record<string, unknown>;
  assert.equal(row.calculatedCostUsd, null);
  assert.equal(row.billingQuantity, null);
  const metadata = await apiKeys.getApiKeyMetadata(key.key);
  assert.ok(metadata);
  const limit = await getApiKeyUsageLimitStatus(metadata);
  assert.equal(limit.weeklyHasUnpricedUsage, true);
  assert.equal(limit.weeklyExceeded, true);
});

test("OpenRouter's reported embedding cost overrides the token estimate without double counting", async () => {
  const { key } = await seed("openrouter", "mistralai/mistral-embed-2312", {
    input: 0.11,
    output: 0,
  });
  costRules.setBudget(key.id, { dailyLimitUsd: 1 });
  globalThis.fetch = async () =>
    Response.json({
      data: [{ index: 0, embedding: [0.1, 0.2] }],
      usage: { prompt_tokens: 1000, total_tokens: 1000, cost: 0.123 },
    });
  const response = await embeddingRoute.POST(
    request("embeddings", key.key, {
      model: "openrouter/mistralai/mistral-embed-2312",
      input: ["synthetic"],
    })
  );
  assert.equal(response.status, 200, await response.clone().text());
  near(Number(response.headers.get("x-omniroute-response-cost")), 0.123);
  near(costRules.checkBudget(key.id).periodUsed, 0.123);
  const row = (await getUsageHistory())[0];
  near(Number(row.providerCostUsd), 0.123);
  assert.equal(row.tokens.input, 1000);
  near(Number((await settledLedger(key.id))[0].amount_usd), 0.123);
});

test("EU-compatible embedding combos preserve the prefix, selected account and one cost per batch", async () => {
  const node = await createProviderNode({
    type: "openai-compatible-chat",
    name: "EU-OpenRouter",
    prefix: "eu-openrouter",
    apiType: "chat",
    baseUrl: "https://eu.openrouter.ai/api/v1",
  });
  const connection = await providers.createProviderConnection({
    provider: node.id,
    authType: "apikey",
    name: "EU reader",
    apiKey: "synthetic-eu-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      prefix: "eu-openrouter",
      baseUrl: "https://eu.openrouter.ai/api/v1",
    },
  });
  await updatePricing({
    "eu-openrouter": { "mistralai/mistral-embed-2312": { input: 0.11, output: 0 } },
  });
  await createCombo({
    name: "document-embedding-test",
    models: [{ model: "eu-openrouter/mistralai/mistral-embed-2312", connectionId: connection.id }],
  });
  const key = await apiKeys.createApiKey("EU media", "synthetic-eu-machine");
  costRules.setBudget(key.id, { dailyLimitUsd: 1 });
  globalThis.fetch = async (url) => {
    assert.equal(String(url), "https://eu.openrouter.ai/api/v1/embeddings");
    return Response.json({
      data: [{ index: 0, embedding: [0.1, 0.2] }],
      usage: { prompt_tokens: 1000, total_tokens: 1000 },
    });
  };
  const response = await embeddingRoute.POST(
    request("embeddings", key.key, {
      model: "document-embedding-test",
      input: ["synthetic"],
    })
  );
  assert.equal(response.status, 200, await response.clone().text());
  near(Number(response.headers.get("x-omniroute-response-cost")), 0.00011);
  const rows = await getUsageHistory();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].provider, "eu-openrouter");
  assert.equal(rows[0].connectionId, connection.id);
  assert.equal(rows[0].apiKeyId, key.id);
  assert.equal((await settledLedger(key.id)).length, 1);
});

test("missing embedding usage is unknown, not a fabricated free bill", async () => {
  const { key } = await seed("mistral", "mistral-embed", { input: 0.1, output: 0 });
  globalThis.fetch = async () => Response.json({ data: [{ index: 0, embedding: [0.1, 0.2] }] });
  const response = await embeddingRoute.POST(
    request("embeddings", key.key, {
      model: "mistral/mistral-embed",
      input: "synthetic",
    })
  );
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-omniroute-response-cost"), null);
  const row = (await getUsageHistory())[0];
  assert.equal(row.calculatedCostUsd, null);
  assert.equal(row.providerCostUsd, null);
  assert.equal((await settledLedger(key.id)).length, 0);
  assert.ok(
    (await getUnpricedUsageReport()).models.some((model) => model.model === "mistral-embed")
  );
});

test("document accounting does not change another key's chat usage or spend", async () => {
  const { key } = await seed("mistral", "mistral-ocr-4-1", { ocr_cost_per_page: 0.004 });
  const other = await apiKeys.createApiKey("Unrelated chat", "synthetic-other-machine");
  await updatePricing({ mistral: { "chat-control": { input: 1, output: 2 } } });
  await saveRequestUsage({
    provider: "mistral",
    model: "chat-control",
    apiKeyId: other.id,
    tokens: { input: 1000, output: 100 },
    success: true,
  });
  mockOcr(2);
  assert.equal((await ocrRoute.POST(request("ocr", key.key, ocrBody))).status, 200);
  const otherMetadata = await apiKeys.getApiKeyMetadata(other.key);
  near(
    (
      await getApiKeyUsageLimitStatus({
        ...otherMetadata!,
        usageLimitEnabled: true,
        weeklyUsageLimitUsd: 10,
      })
    ).weeklySpentUsd,
    0.0012
  );
  const control = (await getUsageHistory()).find((row) => row.apiKeyId === other.id)!;
  assert.equal(control.calculatedCostUsd, null);
  assert.equal(control.billingUnit, null);
  assert.equal(control.tokens.input, 1000);
  assert.equal((await settledLedger(other.id)).length, 0);
});

test("no-log embedding batches retain billing but not source text", async () => {
  const { key } = await seed("mistral", "mistral-embed", { input: 0.1, output: 0 });
  await apiKeys.updateApiKeyPermissions(key.id, { noLog: true });
  apiKeys.clearApiKeyCaches();
  globalThis.fetch = async () =>
    Response.json({
      data: [{ embedding: [0.1, 0.2], index: 0 }],
      usage: { prompt_tokens: 100 },
    });
  assert.equal(
    (
      await embeddingRoute.POST(
        request("embeddings", key.key, {
          model: "mistral/mistral-embed",
          input: "PRIVATE_EMBEDDING_CONTENT",
        })
      )
    ).status,
    200
  );
  await waitForCallLogSaves(10_000);
  const logs = core
    .getDbInstance()
    .prepare("SELECT * FROM call_logs WHERE api_key_id = ?")
    .all(key.id);
  assert.ok(!JSON.stringify(logs).includes("PRIVATE_EMBEDDING_CONTENT"));
  near((await getUsageHistory())[0].calculatedCostUsd!, 0.00001);
  near(Number((await settledLedger(key.id))[0].amount_usd), 0.00001);
});

test("completed OCR estimates retain their tariff after an operator changes the catalogue", async () => {
  const { key } = await seed("mistral", "mistral-ocr-4-1", { ocr_cost_per_page: 0.004 });
  mockOcr(155);
  assert.equal((await ocrRoute.POST(request("ocr", key.key, ocrBody))).status, 200);
  await updatePricing({ mistral: { "mistral-ocr-4-1": { ocr_cost_per_page: 0.008 } } });
  const row = (await getUsageHistory())[0];
  near(row.calculatedCostUsd!, 0.62);
  near(row.billingUnitPriceUsd!, 0.004);
  near(Number((await settledLedger(key.id))[0].amount_usd), 0.62);
});
