import { after, beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "perf-db-2026-10-25-"));
process.env.DATA_DIR = dataDir;

const core = await import("../../src/lib/db/core.ts");
const cleanup = await import("../../src/lib/db/cleanup.ts");
const compressionCombos = await import("../../src/lib/db/compressionCombos.ts");
const callLogFilterOptions = await import("../../src/lib/usage/callLogFilterOptions.ts");
const tokenLimitCounter = await import("../../open-sse/services/tokenLimitCounter.ts");
const tokenLimits = await import("../../src/lib/db/tokenLimits.ts");
const providers = await import("../../src/lib/db/providers.ts");

const db = core.getDbInstance();

after(() => {
  core.closeDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

beforeEach(() => {
  callLogFilterOptions.resetCallLogFilterOptionsCache();
  tokenLimitCounter.clearTokenLimitCache();
});

test("callLogFilterOptions caches results and invalidates on call_logs insert", async () => {
  db.exec("DELETE FROM call_logs");
  callLogFilterOptions.resetCallLogFilterOptionsCache();

  // First call computes options for empty table
  const opts1 = await callLogFilterOptions.getCallLogFilterOptions();
  assert.deepEqual(opts1.models, []);

  // Second call returns cached reference
  const opts2 = await callLogFilterOptions.getCallLogFilterOptions();
  assert.equal(opts1, opts2);

  // Insert a row into call_logs (path, status)
  db.prepare(
    `INSERT INTO call_logs (
      id, connection_id, model, provider, path, status, duration, timestamp
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    "cl-1",
    "conn-1",
    "claude-3-5-sonnet",
    "anthropic",
    "/v1/messages",
    200,
    150,
    new Date().toISOString()
  );

  // Third call detects rowid/count change, invalidates, and returns fresh options
  const opts3 = await callLogFilterOptions.getCallLogFilterOptions();
  assert.notEqual(opts1, opts3);
  assert.deepEqual(opts3.models, ["claude-3-5-sonnet"]);
  assert.deepEqual(opts3.providers, ["anthropic"]);

  // Fourth call returns cached opts3
  const opts4 = await callLogFilterOptions.getCallLogFilterOptions();
  assert.equal(opts3, opts4);
});

test("cleanup purges expired request_cost_ledger and api_key_quota_counters rows", async () => {
  db.exec("DELETE FROM request_cost_ledger");
  db.exec("DELETE FROM api_key_quota_counters");
  db.exec("DELETE FROM usage_history");

  const nowMs = Date.now();
  const oldDate = new Date(nowMs - 400 * 86400 * 1000).toISOString();
  const recentDate = new Date(nowMs - 5 * 86400 * 1000).toISOString();
  const oldMs = nowMs - 400 * 86400 * 1000;
  const recentMs = nowMs - 5 * 86400 * 1000;

  // Seed request_cost_ledger with old and recent rows
  db.prepare(
    `INSERT INTO request_cost_ledger (request_id, api_key_id, provider, model, amount_usd, timestamp)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run("req-old", "key-1", "openai", "gpt-4o", 0.05, oldDate);

  db.prepare(
    `INSERT INTO request_cost_ledger (request_id, api_key_id, provider, model, amount_usd, timestamp)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run("req-new", "key-1", "openai", "gpt-4o", 0.01, recentDate);

  // Seed api_key_quota_counters with old and recent updated_at epoch ms
  db.prepare(
    `INSERT INTO api_key_quota_counters (api_key_id, dimension_key, bucket_index, consumed, updated_at)
     VALUES (?, ?, ?, ?, ?)`
  ).run("key-1", "daily", 1, 1.5, oldMs);

  db.prepare(
    `INSERT INTO api_key_quota_counters (api_key_id, dimension_key, bucket_index, consumed, updated_at)
     VALUES (?, ?, ?, ?, ?)`
  ).run("key-1", "daily", 2, 0.2, recentMs);

  // Seed usage_history with old and recent rows
  db.prepare(
    `INSERT INTO usage_history (api_key_id, provider, model, tokens_input, tokens_output, success, timestamp)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run("key-1", "openai", "gpt-4o", 100, 50, 1, oldDate);

  db.prepare(
    `INSERT INTO usage_history (api_key_id, provider, model, tokens_input, tokens_output, success, timestamp)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run("key-1", "openai", "gpt-4o", 20, 10, 1, recentDate);

  // Run cleanup with 30-day retention
  // Run cleanup functions
  const usageRes = await cleanup.cleanupUsageHistory();
  const costRes = await cleanup.cleanupCostLedger();
  const quotaRes = await cleanup.cleanupApiKeyQuotaCounters();

  assert.equal(usageRes.deleted >= 1, true);
  assert.equal(costRes.deleted >= 1, true);
  assert.equal(quotaRes.deleted >= 1, true);

  // Verify old request_cost_ledger was deleted, recent was kept
  const remainingCostRows = db.prepare("SELECT request_id FROM request_cost_ledger").all() as Array<{ request_id: string }>;
  assert.deepEqual(remainingCostRows.map((r) => r.request_id), ["req-new"]);

  // Verify old api_key_quota_counters was deleted, recent was kept
  const remainingQuotaRows = db.prepare("SELECT bucket_index FROM api_key_quota_counters").all() as Array<{ bucket_index: number }>;
  assert.deepEqual(remainingQuotaRows.map((r) => r.bucket_index), [2]);

  // Verify old usage_history was deleted, recent was kept
  const remainingUsageRows = db.prepare("SELECT timestamp FROM usage_history").all() as Array<{ timestamp: string }>;
  assert.deepEqual(remainingUsageRows.map((r) => r.timestamp), [recentDate]);
});

test("compressionCombos DDL executes once per DB instance and initializes properly", () => {
  // First call initializes the table and index
  const combo = compressionCombos.createCompressionCombo({
    id: "test-combo-1",
    name: "Test Combo",
    description: "A test combo",
    combos: [{ provider: "anthropic", model: "claude-3-5-sonnet" }],
  });
  assert.equal(combo.id, "test-combo-1");

  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='compression_combos'").all();
  assert.equal(tables.length, 1);

  // Subsequent call on same DB instance completes cleanly and retrieves combo
  const retrieved = compressionCombos.getCompressionCombo("test-combo-1");
  assert.equal(retrieved?.id, "test-combo-1");
  assert.equal(retrieved?.name, "Test Combo");
});

test("tokenLimitCounter batching and caching preserves evaluation contract", () => {
  const apiKeyId = "key-test-perf-" + Date.now();

  // Create a global limit and a model limit for this key using upsertTokenLimit
  tokenLimits.upsertTokenLimit({
    apiKeyId,
    scopeType: "global",
    scopeValue: "",
    resetInterval: "daily",
    tokenLimit: 1000,
  });

  tokenLimits.upsertTokenLimit({
    apiKeyId,
    scopeType: "model",
    scopeValue: "claude-3-5-sonnet",
    resetInterval: "daily",
    tokenLimit: 500,
  });

  tokenLimitCounter.clearTokenLimitCache();

  // Check limits when no usage exists -> no breach
  const breach1 = tokenLimitCounter.checkTokenLimits(apiKeyId, "anthropic", "claude-3-5-sonnet");
  assert.equal(breach1, null);

  // Add tokens exceeding model limit (550 > 500)
  const limits = tokenLimits.getTokenLimitsForRequest(apiKeyId, "anthropic", "claude-3-5-sonnet");
  const modelLimit = limits.find((l) => l.scopeType === "model");
  assert.ok(modelLimit);

  tokenLimitCounter.addWindowTokens(modelLimit, 550);

  // Check limits -> model limit should breach as most restrictive
  const breach2 = tokenLimitCounter.checkTokenLimits(apiKeyId, "anthropic", "claude-3-5-sonnet");
  assert.ok(breach2);
  assert.equal(breach2.limitId, modelLimit.id);
  assert.equal(breach2.scopeType, "model");
  assert.equal(breach2.remaining, 0);

  // Check limits for a different model -> within global limit (550 < 1000)
  const breach3 = tokenLimitCounter.checkTokenLimits(apiKeyId, "anthropic", "gpt-4o");
  assert.equal(breach3, null);
});

test("provider connection targeted lookup by id", async () => {
  const connId = "conn-targeted-" + Date.now();
  db.prepare(
    `INSERT INTO provider_connections (id, provider, name, auth_type, api_key, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(
    connId,
    "openai",
    "Production OpenAI Account",
    "api_key",
    "sk-test-targeted",
    new Date().toISOString(),
    new Date().toISOString()
  );

  const found = await providers.getProviderConnectionById(connId);
  assert.ok(found);
  assert.equal(found.id, connId);
  assert.equal(found.name, "Production OpenAI Account");

  const notFound = await providers.getProviderConnectionById("non-existent-conn-id");
  assert.equal(notFound, null);
});
