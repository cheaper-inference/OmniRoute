import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const fixture = fs.mkdtempSync(path.join(os.tmpdir(), "rerank-accounting-"));
const savedEnv = { ...process.env };
process.env.DATA_DIR = fixture;
process.env.APP_LOG_TO_FILE = "false";
process.env.RERANK_REMOTE_PROVIDER_NODES = "true";
process.env.API_KEY_SECRET = "synthetic-rerank-secret";
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const keys = await import("../../src/lib/db/apiKeys.ts");
const costs = await import("../../src/domain/costRules.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const { POST } = await import("../../src/app/api/v1/rerank/route.ts");
const originalFetch = globalThis.fetch;
const model = "ranked/bge-reranker-v2-m3";
const responseBody = {
  results: [{ index: 0, relevance_score: 0.9 }],
  usage: { prompt_tokens: 1234, completion_tokens: 0, total_tokens: 1234, cost: 0.34 },
};

test.beforeEach(async () => {
  await waitForCallLogSaves(10000);
  globalThis.fetch = originalFetch;
  costs.resetCostData();
  keys.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(fixture, { recursive: true, force: true });
  fs.mkdirSync(fixture, { recursive: true });
});
test.after(async () => {
  globalThis.fetch = originalFetch;
  await waitForCallLogSaves(10000);
  keys.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(fixture, { recursive: true, force: true });
  for (const key of Object.keys(process.env)) if (!(key in savedEnv)) delete process.env[key];
  Object.assign(process.env, savedEnv);
});

async function seed(limit = 10, origin = "https://api.cortecs.ai/v1", prefix = "ranked") {
  await providers.createProviderNode({
    id: "openai-compatible-rerank-fixture",
    type: "openai-compatible",
    apiType: "chat",
    name: "Synthetic reranker",
    prefix,
    baseUrl: origin,
  });
  const connection = await providers.createProviderConnection({
    provider: "openai-compatible-rerank-fixture",
    authType: "apikey",
    name: "Synthetic connection",
    apiKey: "synthetic-upstream-key",
    isActive: true,
  });
  invalidateDbCache("nodes");
  invalidateDbCache("connections");
  const key = await keys.createApiKey("Synthetic rerank caller", "synthetic-machine");
  keys.clearApiKeyCaches();
  costs.setBudget(key.id, { dailyLimitUsd: limit, resetInterval: "daily" });
  return { key, connection };
}

function request(secret: string, selectedModel = model) {
  return new Request("http://localhost/v1/rerank", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${secret}` },
    body: JSON.stringify({
      model: selectedModel,
      query: "Query alpha",
      documents: ["Passage alpha", "Passage beta"],
    }),
  });
}

function mockUpstream(
  body: unknown = responseBody,
  status = 200,
  url = "https://api.cortecs.ai/v1/rerank"
) {
  let calls = 0;
  globalThis.fetch = async (input, init) => {
    assert.equal(String(input), url, "no unmocked HTTP request is allowed");
    assert.equal(new Headers(init?.headers).get("authorization"), "Bearer synthetic-upstream-key");
    assert.equal(
      new Headers(init?.headers).get("x-cortecs-cost-unit"),
      url.startsWith("https://api.cortecs.ai/") ? "USD" : null
    );
    calls++;
    return Response.json(body, { status });
  };
  return () => calls;
}

test("the serialized Cortecs HTTP request asks for USD and records the returned fraction once", async () => {
  const { key } = await seed();
  const cost = 0.000004466;
  let calls = 0;
  globalThis.fetch = async (url, init) => {
    calls++;
    assert.equal(String(url), "https://api.cortecs.ai/v1/rerank");
    assert.equal(init?.method, "POST");
    assert.equal(new Headers(init?.headers).get("x-cortecs-cost-unit"), "USD");
    const serialized = JSON.parse(String(init?.body));
    assert.equal(serialized.model, "bge-reranker-v2-m3");
    assert.deepEqual(serialized.documents, ["Passage alpha", "Passage beta"]);
    assert.equal(serialized.query, "Query alpha");
    return Response.json({ ...responseBody, usage: { ...responseBody.usage, cost } });
  };
  const response = await POST(request(key.key), {});
  assert.equal(response.status, 200);
  assert.equal(Number(response.headers.get("x-omniroute-response-cost")), cost);
  const row = core
    .getDbInstance()
    .prepare<{ provider_cost_usd: number; provider_credits: number | null }>(
      "SELECT provider_cost_usd,provider_credits FROM usage_history"
    )
    .get();
  assert.equal(row?.provider_cost_usd, cost);
  assert.equal(row?.provider_credits, null);
  await waitForCallLogSaves(10000);
  const ledger = core
    .getDbInstance()
    .prepare<{ amount_usd: number }>("SELECT amount_usd FROM request_cost_ledger")
    .all();
  assert.deepEqual(ledger, [{ amount_usd: cost }]);
  assert.equal(calls, 1);
});

test("reported Cortecs USD becomes one charge", async () => {
  const { key, connection } = await seed();
  const calls = mockUpstream();
  const result = await POST(request(key.key), {});
  assert.equal(result.status, 200);
  assert.equal(Number(result.headers.get("x-omniroute-response-cost")), 0.34);
  assert.equal(result.headers.get("x-omniroute-tokens-in"), "1234");
  assert.deepEqual(await result.json(), responseBody);
  await waitForCallLogSaves(10000);
  const db = core.getDbInstance();
  assert.deepEqual(
    db
      .prepare(
        "SELECT provider, model, connection_id, api_key_id, tokens_input, tokens_output, provider_credits, provider_cost_usd FROM usage_history"
      )
      .all(),
    [
      {
        provider: "cortecs",
        model: "bge-reranker-v2-m3",
        connection_id: connection.id,
        api_key_id: key.id,
        tokens_input: 1234,
        tokens_output: 0,
        provider_credits: null,
        provider_cost_usd: 0.34,
      },
    ]
  );
  const ledger = db
    .prepare<{ amount_usd: number; request_id: string }>(
      "SELECT amount_usd,request_id FROM request_cost_ledger"
    )
    .all();
  assert.equal(ledger.length, 1);
  assert.equal(ledger[0].amount_usd, 0.34);
  assert.equal(ledger[0].request_id, result.headers.get("x-omniroute-request-id"));
  assert.equal(Number(costs.checkBudget(key.id).periodUsed), 0.34);
  const log = db.prepare<{ tokens_in: number }>("SELECT tokens_in FROM call_logs").get();
  assert.equal(log?.tokens_in, 1234);
  assert.equal(calls(), 1);
});

test("the existing /rerank fallback retains the USD header and charges its success once", async () => {
  const { key } = await seed();
  const targets: string[] = [];
  globalThis.fetch = async (url, init) => {
    targets.push(String(url));
    assert.equal(new Headers(init?.headers).get("x-cortecs-cost-unit"), "USD");
    if (String(url) === "https://api.cortecs.ai/v1/rerank") {
      return Response.json({ message: "not found" }, { status: 404 });
    }
    assert.equal(String(url), "https://api.cortecs.ai/rerank");
    return Response.json(responseBody);
  };
  const response = await POST(request(key.key), {});
  assert.equal(response.status, 200);
  assert.equal(Number(response.headers.get("x-omniroute-response-cost")), responseBody.usage.cost);
  assert.deepEqual(targets, ["https://api.cortecs.ai/v1/rerank", "https://api.cortecs.ai/rerank"]);
  await waitForCallLogSaves(10000);
  assert.deepEqual(
    core.getDbInstance().prepare("SELECT amount_usd FROM request_cost_ledger").all(),
    [{ amount_usd: responseBody.usage.cost }]
  );
});

test("a whole-dollar USD cost is not mistaken for integer credits", async () => {
  const { key } = await seed(100);
  mockUpstream({ ...responseBody, usage: { ...responseBody.usage, cost: 17 } });
  const response = await POST(request(key.key), {});
  assert.equal(response.status, 200);
  assert.equal(Number(response.headers.get("x-omniroute-response-cost")), 17);
  assert.deepEqual(
    core
      .getDbInstance()
      .prepare("SELECT provider_credits,provider_cost_usd FROM usage_history")
      .get(),
    { provider_credits: null, provider_cost_usd: 17 }
  );
});

test("missing USD remains unknown and cannot bypass caller budgets", async () => {
  const { key } = await seed();
  const calls = mockUpstream({
    ...responseBody,
    usage: { prompt_tokens: 1234, total_tokens: 1234 },
  });
  const result = await POST(request(key.key), {});
  assert.equal(result.status, 200);
  assert.equal(result.headers.get("x-omniroute-response-cost"), null);
  assert.equal(result.headers.get("x-omniroute-cost-status"), "unknown");
  const row = core
    .getDbInstance()
    .prepare<{ provider_credits: number; provider_cost_usd: number | null }>(
      "SELECT provider_credits,provider_cost_usd FROM usage_history"
    )
    .get();
  assert.equal(row?.provider_credits, null);
  assert.equal(row?.provider_cost_usd, null);
  assert.equal(
    core
      .getDbInstance()
      .prepare<{ n: number }>("SELECT COUNT(*) AS n FROM request_cost_ledger")
      .get()?.n,
    0
  );
  const next = await POST(request(key.key), {});
  assert.notEqual(next.status, 200, "unknown metered spending must not bypass the budget");
  assert.equal(calls(), 1);
});

test("missing rerank USD cannot be repriced from a configured token tariff in durable consumers", async () => {
  const { key } = await seed();
  const { updatePricing } = await import("../../src/lib/db/settings/pricing.ts");
  await updatePricing({ cortecs: { "bge-reranker-v2-m3": { input: 999, output: 999 } } });
  mockUpstream({ ...responseBody, usage: { prompt_tokens: 1234, total_tokens: 1234 } });
  assert.equal((await POST(request(key.key), {})).status, 200);
  await waitForCallLogSaves(10000);
  const limits = await import("../../src/lib/usage/apiKeyUsageLimits.ts");
  const status = await limits.getApiKeyUsageLimitStatus({
    id: key.id,
    usageLimitEnabled: true,
    dailyUsageLimitUsd: 1,
  });
  assert.equal(status.dailySpentUsd, 0);
  assert.equal(status.dailyHasUnpricedUsage, true);
  const { getUnpricedUsageReport } = await import("../../src/lib/usage/unpricedUsage.ts");
  assert.equal(
    (await getUnpricedUsageReport()).models.some((row) => row.provider === "cortecs"),
    true
  );
  const { getUsageStats } = await import("../../src/lib/usage/usageStats.ts");
  assert.equal((await getUsageStats()).byApiKey[`id:${key.id}`].cost, 0);
});

test("a completed paid rerank counts against the next request's budget", async () => {
  const { key } = await seed(0.2);
  const calls = mockUpstream();
  assert.equal((await POST(request(key.key), {})).status, 200);
  assert.notEqual((await POST(request(key.key), {})).status, 200);
  assert.equal(calls(), 1);
});

test("Cortecs-shaped usage on a different host does not change other dynamic providers", async () => {
  const { key } = await seed(10, "https://rerank.example.com/v1", "cortecs");
  mockUpstream(responseBody, 200, "https://rerank.example.com/v1/rerank");
  const result = await POST(request(key.key, "cortecs/bge-reranker-v2-m3"), {});
  assert.equal(result.status, 200);
  assert.equal(Number(result.headers.get("x-omniroute-response-cost")), 0);
  assert.equal(
    core.getDbInstance().prepare<{ n: number }>("SELECT COUNT(*) AS n FROM usage_history").get()?.n,
    0
  );
});

test("a failed upstream rerank does not create successful billing", async () => {
  const { key } = await seed();
  mockUpstream({ error: "synthetic failure" }, 503);
  assert.equal((await POST(request(key.key), {})).status, 503);
  const db = core.getDbInstance();
  assert.equal(db.prepare<{ n: number }>("SELECT COUNT(*) AS n FROM usage_history").get()?.n, 0);
  assert.equal(
    db.prepare<{ n: number }>("SELECT COUNT(*) AS n FROM request_cost_ledger").get()?.n,
    0
  );
});

test("zero USD is genuinely zero without a conversion setting or invented credits", async () => {
  const { key } = await seed();
  mockUpstream({ ...responseBody, usage: { ...responseBody.usage, cost: 0 } });
  const result = await POST(request(key.key), {});
  assert.equal(result.status, 200);
  assert.equal(result.headers.get("x-omniroute-cost-status"), "known");
  assert.equal(Number(result.headers.get("x-omniroute-response-cost")), 0);
  const row = core
    .getDbInstance()
    .prepare<{ provider_credits: number; provider_cost_usd: number }>(
      "SELECT provider_credits,provider_cost_usd FROM usage_history"
    )
    .get();
  assert.equal(row?.provider_credits, null);
  assert.equal(row?.provider_cost_usd, 0);
});

test("same-millisecond physical calls remain separate and their stored charges are not repriced", async (t) => {
  const { key } = await seed();
  const calls = mockUpstream();
  t.mock.timers.enable({ apis: ["Date"], now: new Date("2030-01-01T00:00:00Z") });
  const results = await Promise.all([POST(request(key.key), {}), POST(request(key.key), {})]);
  assert.deepEqual(
    results.map((r) => r.status),
    [200, 200]
  );
  const { updatePricing } = await import("../../src/lib/db/settings/pricing.ts");
  await updatePricing({ cortecs: { "bge-reranker-v2-m3": { input: 999, output: 999 } } });
  const db = core.getDbInstance();
  const row = db
    .prepare<{ n: number; credits: number; usd: number; timestamps: number }>(
      "SELECT COUNT(*) AS n,SUM(provider_credits) AS credits,SUM(provider_cost_usd) AS usd,COUNT(DISTINCT timestamp) AS timestamps FROM usage_history"
    )
    .get();
  assert.deepEqual(row, { n: 2, credits: null, usd: 0.68, timestamps: 1 });
  assert.equal(
    db.prepare<{ n: number }>("SELECT COUNT(*) AS n FROM request_cost_ledger").get()?.n,
    2
  );
  assert.equal(calls(), 2);
  const limits = await import("../../src/lib/usage/apiKeyUsageLimits.ts");
  const status = await limits.getApiKeyUsageLimitStatus({
    id: key.id,
    usageLimitEnabled: true,
    dailyUsageLimitUsd: 1,
    fiveHourUsageLimitUsd: 1,
  });
  assert.equal(status.dailySpentUsd, 0.68);
  assert.equal(status.fiveHourSpentUsd, 0.68);
  const stats = await import("../../src/lib/usage/usageStats.ts");
  assert.equal((await stats.getUsageStats()).byApiKey[`id:${key.id}`].cost, 0.68);
  const { rollupUsageHistoryBeforeDate } = await import("../../src/lib/usage/aggregateHistory.ts");
  assert.equal((await rollupUsageHistoryBeforeDate("2100-01-01")).errors, 0);
  assert.equal(
    db
      .prepare<{ total_cost: number }>(
        "SELECT total_cost FROM daily_usage_summary WHERE provider='cortecs'"
      )
      .get()?.total_cost,
    0.68
  );
});

test("no-log callers retain numerical metering without document payloads", async () => {
  const { key } = await seed();
  await keys.updateApiKeyPermissions(key.id, { noLog: true });
  keys.clearApiKeyCaches();
  mockUpstream();
  assert.equal((await POST(request(key.key), {})).status, 200);
  await waitForCallLogSaves(10000);
  const db = core.getDbInstance();
  assert.equal(db.prepare<{ n: number }>("SELECT COUNT(*) AS n FROM usage_history").get()?.n, 1);
  const logs = db
    .prepare<{
      has_request_body: number;
      has_response_body: number;
      artifact_relpath: string | null;
    }>("SELECT has_request_body,has_response_body,artifact_relpath FROM call_logs")
    .all();
  for (const log of logs) {
    assert.equal(log.has_request_body, 0);
    assert.equal(log.has_response_body, 0);
    assert.equal(log.artifact_relpath, null);
  }
});

test("usage-table failure never turns a paid success into a retry", async () => {
  const { key } = await seed();
  core
    .getDbInstance()
    .exec(
      "CREATE TRIGGER synthetic_usage_failure BEFORE INSERT ON usage_history BEGIN SELECT RAISE(FAIL, 'synthetic failure'); END"
    );
  const calls = mockUpstream();
  assert.equal((await POST(request(key.key), {})).status, 200);
  assert.equal(calls(), 1);
  assert.equal(Number(costs.checkBudget(key.id).periodUsed), 0.34);
});

test("a combo charges only its successful physical Cortecs target", async () => {
  const { key } = await seed();
  await providers.createProviderNode({
    id: "openai-compatible-rerank-primary",
    type: "openai-compatible",
    apiType: "chat",
    name: "Synthetic primary",
    prefix: "primary",
    baseUrl: "https://rerank.example.com/v1",
  });
  await providers.createProviderConnection({
    provider: "openai-compatible-rerank-primary",
    authType: "apikey",
    name: "Synthetic primary",
    apiKey: "synthetic-primary-key",
    isActive: true,
  });
  invalidateDbCache("nodes");
  invalidateDbCache("connections");
  const { createCombo } = await import("../../src/lib/db/combos.ts");
  await createCombo({
    name: "synthetic-rerank",
    strategy: "priority",
    models: [{ model: "primary/synthetic-model" }, { model }],
  });
  const targets: string[] = [];
  globalThis.fetch = async (url) => {
    targets.push(String(url));
    if (String(url) === "https://rerank.example.com/v1/rerank")
      return Response.json({ message: "synthetic unavailable" }, { status: 503 });
    assert.equal(String(url), "https://api.cortecs.ai/v1/rerank");
    return Response.json(responseBody);
  };
  const response = await POST(request(key.key, "synthetic-rerank"), {});
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), responseBody);
  assert.deepEqual(
    targets,
    [
      "https://rerank.example.com/v1/rerank",
      "https://rerank.example.com/v1/rerank",
      "https://api.cortecs.ai/v1/rerank",
    ],
    "the existing combo retries its failed primary; only the successful target is billed"
  );
  const db = core.getDbInstance();
  assert.equal(db.prepare<{ n: number }>("SELECT COUNT(*) AS n FROM usage_history").get()?.n, 1);
  assert.equal(
    db.prepare<{ n: number }>("SELECT COUNT(*) AS n FROM request_cost_ledger").get()?.n,
    1
  );
  assert.equal(Number(costs.checkBudget(key.id).periodUsed), 0.34);
});

test("reported USD spend stays isolated to the caller key", async () => {
  const { key } = await seed();
  const other = await keys.createApiKey("Other synthetic caller", "other-machine");
  costs.setBudget(other.id, { dailyLimitUsd: 10, resetInterval: "daily" });
  mockUpstream();
  assert.equal((await POST(request(key.key), {})).status, 200);
  assert.equal(Number(costs.checkBudget(other.id).periodUsed), 0);
  assert.equal(
    core
      .getDbInstance()
      .prepare<{ n: number }>("SELECT COUNT(*) AS n FROM request_cost_ledger WHERE api_key_id = ?")
      .get(other.id)?.n,
    0
  );
});
