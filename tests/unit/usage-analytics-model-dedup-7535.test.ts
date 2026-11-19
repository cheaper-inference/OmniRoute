import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-usage-analytics-model-dedup-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
const ORIGINAL_API_KEY_SECRET = process.env.API_KEY_SECRET;
process.env.API_KEY_SECRET = "test-usage-analytics-model-dedup-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const analyticsRoute = await import("../../src/app/api/usage/analytics/route.ts");
const analyticsCache = await import("../../src/lib/usage/analyticsResponseCache.ts");
const { normalizeModelName } = await import("../../src/lib/usage/costCalculator.ts");

function makeRequest(url: string) {
  return new Request(url, { method: "GET" });
}

test.beforeEach(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  usageHistory.clearPendingRequests();
  analyticsCache.clearAnalyticsResponseCache();
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });

  if (ORIGINAL_API_KEY_SECRET === undefined) {
    delete process.env.API_KEY_SECRET;
  } else {
    process.env.API_KEY_SECRET = ORIGINAL_API_KEY_SECRET;
  }
});

test("#7535: byModel must not list the same logical model twice under one raw/one prefixed id", async () => {
  const db = core.getDbInstance();
  const now = new Date();

  db.prepare(
    `INSERT INTO usage_history (provider, model, connection_id, api_key_id, api_key_name, tokens_input, tokens_output, success, latency_ms, timestamp)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    "zai",
    "glm-5.2",
    "test-conn",
    "test-key",
    "Primary Key",
    100,
    50,
    1,
    200,
    now.toISOString()
  );
  db.prepare(
    `INSERT INTO usage_history (provider, model, connection_id, api_key_id, api_key_name, tokens_input, tokens_output, success, latency_ms, timestamp)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    "zai",
    "z-ai/glm-5.2",
    "test-conn",
    "test-key",
    "Primary Key",
    80,
    40,
    1,
    150,
    new Date(now.getTime() - 60_000).toISOString()
  );

  assert.equal(normalizeModelName("glm-5.2"), "glm-5.2");
  assert.equal(normalizeModelName("z-ai/glm-5.2"), "glm-5.2");

  const response = await analyticsRoute.GET(makeRequest("http://localhost/api/usage/analytics"));
  const body = await response.json();

  assert.equal(response.status, 200);
  const glmEntries = body.byModel.filter((row: { model: string }) => row.model === "glm-5.2");
  assert.equal(
    glmEntries.length,
    1,
    `expected exactly one "glm-5.2" row in byModel, got ${glmEntries.length}: ${JSON.stringify(glmEntries)} (#7535)`
  );
  assert.equal(
    glmEntries[0].requests,
    2,
    "the two raw spellings should merge into one aggregated row"
  );
});

test("#20453: byModel retains separate per-provider rows for a shared model name", async () => {
  const db = core.getDbInstance();
  const baseMs = Date.now();
  const insertStmt = db.prepare(
    `INSERT INTO usage_history (provider, model, connection_id, api_key_id, api_key_name, tokens_input, tokens_output, tokens_cache_read, success, latency_ms, timestamp)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );

  // cloudflare-ai: 100 prefixed + 6 unprefixed requests = 106 requests, 1060 cached input tokens
  for (let i = 0; i < 100; i++) {
    insertStmt.run(
      "cloudflare-ai",
      "cloudflare-ai/gpt-oss-120b",
      "conn-cf",
      "key-cf",
      "CF Key",
      200,
      50,
      10,
      1,
      120,
      new Date(baseMs - i * 1000).toISOString()
    );
  }
  for (let i = 0; i < 6; i++) {
    insertStmt.run(
      "cloudflare-ai",
      "gpt-oss-120b",
      "conn-cf",
      "key-cf",
      "CF Key",
      200,
      50,
      10,
      1,
      120,
      new Date(baseMs - (100 + i) * 1000).toISOString()
    );
  }

  // groq: 2 requests, 100 cached input tokens
  for (let i = 0; i < 2; i++) {
    insertStmt.run(
      "groq",
      "groq/gpt-oss-120b",
      "conn-groq",
      "key-groq",
      "Groq Key",
      150,
      40,
      50,
      1,
      90,
      new Date(baseMs - (200 + i) * 1000).toISOString()
    );
  }

  // cerebras: 1 request, 25 cached input tokens
  insertStmt.run(
    "cerebras",
    "gpt-oss-120b",
    "conn-cerebras",
    "key-cerebras",
    "Cerebras Key",
    100,
    30,
    25,
    1,
    80,
    new Date(baseMs - 300_000).toISOString()
  );

  const response = await analyticsRoute.GET(makeRequest("http://localhost/api/usage/analytics"));
  const body = await response.json();

  assert.equal(response.status, 200);
  const sharedRows = body.byModel.filter(
    (row: { model: string; provider: string; requests: number; cachedInputTokens?: number }) =>
      row.model === "gpt-oss-120b"
  );
  assert.equal(
    sharedRows.length,
    3,
    `expected 3 per-provider rows for gpt-oss-120b, got ${sharedRows.length}: ${JSON.stringify(sharedRows)} (#20453)`
  );

  const byProvider = new Map<
    string,
    { requests: number; cachedInputTokens?: number | null; cachedInputTokensComplete?: boolean }
  >(
    sharedRows.map(
      (row: {
        provider: string;
        requests: number;
        cachedInputTokens?: number | null;
        cachedInputTokensComplete?: boolean;
      }) => [row.provider, row]
    )
  );

  assert.equal(byProvider.get("cloudflare-ai")?.requests, 106);
  assert.equal(byProvider.get("cloudflare-ai")?.cachedInputTokens, 1060);
  assert.equal(byProvider.get("groq")?.requests, 2);
  assert.equal(byProvider.get("groq")?.cachedInputTokens, 100);
  assert.equal(byProvider.get("cerebras")?.requests, 1);
  assert.equal(byProvider.get("cerebras")?.cachedInputTokens, 25);

  const totalRequests = sharedRows.reduce(
    (sum: number, row: { requests: number }) => sum + row.requests,
    0
  );
  assert.equal(totalRequests, 109);
});

test("#20453: a usage row with a NULL model keeps the analytics response alive", async () => {
  const db = core.getDbInstance();
  const insertStmt = db.prepare(
    `INSERT INTO usage_history (provider, model, connection_id, api_key_id, api_key_name, tokens_input, tokens_output, tokens_cache_read, success, latency_ms, timestamp)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  insertStmt.run(
    "groq",
    null,
    "conn-groq",
    "key-groq",
    "Groq Key",
    120,
    30,
    7,
    1,
    90,
    new Date().toISOString()
  );
  insertStmt.run(
    "groq",
    "groq/gpt-oss-120b",
    "conn-groq",
    "key-groq",
    "Groq Key",
    150,
    40,
    50,
    1,
    90,
    new Date(Date.now() - 1000).toISOString()
  );

  const response = await analyticsRoute.GET(makeRequest("http://localhost/api/usage/analytics"));
  const body = await response.json();

  assert.equal(
    response.status,
    200,
    `analytics must not fail on a NULL model: ${JSON.stringify(body)}`
  );
  const nullModelRow = body.byModel.find(
    (row: { model: string | null; provider: string }) =>
      row.model === null && row.provider === "groq"
  );
  assert.ok(
    nullModelRow,
    `the NULL-model row must still be emitted: ${JSON.stringify(body.byModel)}`
  );
  assert.equal(nullModelRow.requests, 1);
  assert.equal(nullModelRow.cachedInputTokens, 7);
  const sharedRow = body.byModel.find(
    (row: { model: string | null; provider: string }) =>
      row.model === "gpt-oss-120b" && row.provider === "groq"
  );
  assert.equal(sharedRow?.cachedInputTokens, 50);
});
