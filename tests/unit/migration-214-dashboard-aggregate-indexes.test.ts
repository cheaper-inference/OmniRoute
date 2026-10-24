import { after, beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "dashboard-aggregate-indexes-214-"));
process.env.DATA_DIR = dataDir;

const core = await import("../../src/lib/db/core.ts");
const { getHeatmapRows, getModelUsageMatrixRows, getEndpointUsageRows } =
  await import("../../src/lib/db/usageAnalytics.ts");
const { buildUnifiedSource } = await import("../../src/lib/db/usageAnalytics/sources.ts");

const db = core.getDbInstance();

type PlanRow = { detail: string };

function planRows(sql: string, ...params: unknown[]): string {
  return (db.prepare(`EXPLAIN QUERY PLAN ${sql}`).all(...params) as PlanRow[])
    .map((row) => row.detail)
    .join(" | ");
}

beforeEach(() => {
  db.exec("DELETE FROM usage_history");
});

after(() => {
  core.closeDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("migration 214 creates dashboard aggregate expression indexes on usage_history", () => {
  const names = (db.prepare("PRAGMA index_list(usage_history)").all() as Array<{ name: string }>)
    .map((row) => row.name)
    .filter((name) =>
      ["idx_uh_date", "idx_uh_date_provider_model_tier", "idx_uh_endpoint_provider_model"].includes(
        name
      )
    )
    .sort();
  assert.deepEqual(names, [
    "idx_uh_date",
    "idx_uh_date_provider_model_tier",
    "idx_uh_endpoint_provider_model",
  ]);
});

test("date aggregation uses index and eliminates temp b-tree for group by", () => {
  const plan = planRows(
    `SELECT DATE(timestamp) as date, COALESCE(SUM(tokens_input + tokens_output), 0) as totalTokens
     FROM usage_history
     WHERE timestamp >= ?
     GROUP BY DATE(timestamp)
     ORDER BY date ASC`,
    "2026-01-01T00:00:00.000Z"
  );
  assert.match(plan, /idx_uh_date/);
  assert.doesNotMatch(plan, /USE TEMP B-TREE FOR GROUP BY/);
});

test("matrix aggregation uses idx_uh_date_provider_model_tier without temp b-tree", () => {
  const plan = planRows(
    `SELECT DATE(timestamp) as date, LOWER(provider) as provider, LOWER(model) as model, service_tier, COUNT(*)
     FROM usage_history
     WHERE timestamp >= ?
     GROUP BY DATE(timestamp), LOWER(provider), LOWER(model), service_tier`,
    "2026-01-01T00:00:00.000Z"
  );
  assert.match(plan, /idx_uh_date_provider_model_tier/);
  assert.doesNotMatch(plan, /USE TEMP B-TREE FOR GROUP BY/);
});

test("endpoint aggregation uses idx_uh_endpoint_provider_model without full table scan", () => {
  const plan = planRows(
    `SELECT endpoint, LOWER(COALESCE(provider, 'unknown')), LOWER(COALESCE(model, 'unknown')), COUNT(*)
     FROM usage_history
     WHERE timestamp >= ?
     GROUP BY endpoint, LOWER(COALESCE(provider, 'unknown')), LOWER(COALESCE(model, 'unknown'))`,
    "2026-01-01T00:00:00.000Z"
  );
  assert.match(plan, /idx_uh_endpoint_provider_model/);
  assert.doesNotMatch(plan, /SCAN usage_history$/);
});

test("dashboard query functions return correct aggregated metrics with migration 214 indexes", () => {
  const insertStmt = db.prepare(`
    INSERT INTO usage_history (
      provider, model, tokens_input, tokens_output, service_tier, endpoint, success, timestamp
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertStmt.run(
    "OpenAI",
    "GPT-4o",
    100,
    50,
    "standard",
    "/v1/chat/completions",
    1,
    "2026-10-20T10:00:00.000Z"
  );
  insertStmt.run(
    "openai",
    "gpt-4o",
    200,
    80,
    "standard",
    "/v1/chat/completions",
    1,
    "2026-10-20T11:00:00.000Z"
  );
  insertStmt.run(
    "Anthropic",
    "claude-3-5-sonnet",
    300,
    150,
    "priority",
    "/v1/messages",
    1,
    "2026-10-21T09:00:00.000Z"
  );

  const heatmap = getHeatmapRows(["timestamp >= @since"], {
    since: "2026-10-01T00:00:00.000Z",
  });
  assert.deepEqual(heatmap, [
    { date: "2026-10-20", totalTokens: 430 },
    { date: "2026-10-21", totalTokens: 450 },
  ]);

  const { unifiedSource, unifiedParams } = buildUnifiedSource({
    sinceIso: "2026-10-01T00:00:00.000Z",
    untilIso: null,
    rawCutoffDate: "2026-10-01",
    apiKeyWhere: "",
    apiKeyParams: {},
  });

  const matrix = getModelUsageMatrixRows(unifiedSource, unifiedParams);
  const normalizedMatrix = matrix
    .map((r) => ({
      date: r.date,
      provider: r.provider,
      model: r.model,
      requests: r.requests,
      promptTokens: r.promptTokens,
      completionTokens: r.completionTokens,
    }))
    .sort((a, b) => (a.date + a.provider).localeCompare(b.date + b.provider));

  assert.deepEqual(normalizedMatrix, [
    {
      date: "2026-10-20",
      provider: "openai",
      model: "gpt-4o",
      requests: 2,
      promptTokens: 300,
      completionTokens: 130,
    },
    {
      date: "2026-10-21",
      provider: "anthropic",
      model: "claude-3-5-sonnet",
      requests: 1,
      promptTokens: 300,
      completionTokens: 150,
    },
  ]);

  const endpointRows = getEndpointUsageRows({
    sinceIso: "2026-10-01T00:00:00.000Z",
  });
  assert.equal(endpointRows.length, 2);
  const chatEndpoint = endpointRows.find((r) => r.endpoint === "/v1/chat/completions");
  assert.ok(chatEndpoint);
  assert.equal(chatEndpoint.requests, 2);
  assert.equal(chatEndpoint.promptTokens, 300);
  assert.equal(chatEndpoint.completionTokens, 130);
});
