// Team reports bill a provider-reported cost (usage_history.provider_cost_usd) as is, like usage
// analytics: in the summary totals and breakdowns, the sessions rows, the session detail totals
// and requests, and the CSV exports. Only requests without one are priced from the catalog.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import type {
  AgentSessionReport,
  AgentSessionReportDetail,
  AgentSessionReportRow,
} from "../../src/lib/usage/agentSessionReports.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agent-reports-cost-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
delete process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const { GET: getSummary } = await import("../../src/app/api/reports/summary/route.ts");
const { GET: getSessions } = await import("../../src/app/api/reports/sessions/route.ts");
const { GET: getSessionDetail } = await import("../../src/app/api/reports/sessions/[id]/route.ts");
const { GET: getExport } = await import("../../src/app/api/reports/export/route.ts");

test.after(() => {
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// No catalog row exists for this model, so without a stored cost its requests are unpriced.
const UNPRICED_MODEL = "team-reports-uncatalogued-model";
const STORED_COST = 0.0123;
const MIXED_STORED_COST = 0.05;
// gpt-4o-mini at $1 / $2 per million: 1000 input + 500 output tokens.
const CATALOG_COST = 0.002;
const TOKENS = { input: 1000, output: 500 };

async function recordUsage(entry: Record<string, unknown>) {
  await usageHistory.saveRequestUsage({
    provider: "openai",
    model: "gpt-4o-mini",
    connectionId: "conn-openai-1",
    tokens: TOKENS,
    success: true,
    latencyMs: 10,
    ...entry,
  });
}

function agentContext(clientSessionId: string) {
  return {
    client: "claude-code",
    clientSessionId,
    projectName: "acme",
    projectRepo: "github.com/team/acme",
    projectPath: "/work/acme",
    projectSource: "header" as const,
    gitBranch: "main",
  };
}

function member(apiKeyId: string) {
  return { apiKeyId, apiKeyName: apiKeyId, agentContext: agentContext(`${apiKeyId}-1`) };
}

function reportRequest(pathAndQuery: string): Request {
  return new Request(`http://localhost:20128${pathAndQuery}`);
}

async function summary(query: string): Promise<AgentSessionReport> {
  const res = await getSummary(reportRequest(`/api/reports/summary?${query}`));
  assert.equal(res.status, 200);
  return (await res.json()) as AgentSessionReport;
}

async function sessionRow(apiKeyId: string): Promise<AgentSessionReportRow> {
  const res = await getSessions(reportRequest(`/api/reports/sessions?apiKeyId=${apiKeyId}`));
  assert.equal(res.status, 200);
  const body = (await res.json()) as { sessions: AgentSessionReportRow[] };
  assert.equal(body.sessions.length, 1);
  return body.sessions[0];
}

async function sessionDetail(id: string): Promise<AgentSessionReportDetail> {
  const res = await getSessionDetail(reportRequest(`/api/reports/sessions/${id}`), {
    params: Promise.resolve({ id }),
  });
  assert.equal(res.status, 200);
  return (await res.json()) as AgentSessionReportDetail;
}

async function exportCsvRow(query: string): Promise<Record<string, string>> {
  const res = await getExport(reportRequest(`/api/reports/export?${query}`));
  assert.equal(res.status, 200);
  const [header, ...rows] = (await res.text()).trim().split("\n");
  assert.equal(rows.length, 1, query);
  const values = rows[0].split(",");
  return Object.fromEntries(header.split(",").map((column, index) => [column, values[index]]));
}

test.before(async () => {
  await settingsDb.updatePricing({
    openai: { "gpt-4o-mini": { input: 1, output: 2, cached: 0.5, cache_creation: 1 } },
  });
  // key-stored: one request on an uncatalogued model whose provider reported its cost.
  await recordUsage({
    ...member("key-stored"),
    provider: "openrouter",
    model: UNPRICED_MODEL,
    connectionId: "conn-openrouter-1",
    tokens: { ...TOKENS, cost_usd: STORED_COST },
    timestamp: "2026-10-05T10:00:00.000Z",
  });
  // key-mixed: two requests in one slice (same provider, model, account, tier and day); only
  // the second reported a cost, which replaces its catalog price.
  await recordUsage({ ...member("key-mixed"), timestamp: "2026-10-05T11:00:00.000Z" });
  await recordUsage({
    ...member("key-mixed"),
    tokens: { ...TOKENS, cost_usd: MIXED_STORED_COST },
    timestamp: "2026-10-05T11:05:00.000Z",
  });
  // key-unpriced: the uncatalogued model without a stored cost stays unpriced.
  await recordUsage({
    ...member("key-unpriced"),
    provider: "openrouter",
    model: UNPRICED_MODEL,
    connectionId: "conn-openrouter-1",
    timestamp: "2026-10-05T12:00:00.000Z",
  });
});

test("a request with a provider-reported cost and no catalog price shows that cost and is not unpriced", async () => {
  const report = await summary("apiKeyId=key-stored");
  assert.equal(report.totals.costUsd, STORED_COST);
  assert.equal(report.totals.unpricedRequests, 0);
  assert.equal(report.totals.costPerSession, STORED_COST);
  // Its tokens are still shown.
  assert.equal(report.totals.tokens.total, 1500);
  const [model] = report.breakdowns.models;
  assert.deepEqual(
    { key: model.key, costUsd: model.costUsd, unpricedRequests: model.unpricedRequests },
    { key: UNPRICED_MODEL, costUsd: STORED_COST, unpricedRequests: 0 }
  );

  const row = await sessionRow("key-stored");
  assert.equal(row.costUsd, STORED_COST);
  assert.equal(row.unpricedRequests, 0);

  const detail = await sessionDetail(row.id);
  assert.equal(detail.totals.costUsd, STORED_COST);
  assert.equal(detail.totals.unpricedRequests, 0);
  assert.equal(detail.recentRequests.length, 1);
  assert.equal(detail.recentRequests[0].costUsd, STORED_COST);
  assert.equal(detail.recentRequests[0].priced, true);
  assert.ok(!("providerCostUsd" in detail.recentRequests[0]), "the response shape is unchanged");

  const sessionCsv = await exportCsvRow("type=sessions&apiKeyId=key-stored");
  assert.equal(sessionCsv.cost_usd, String(STORED_COST));
  assert.equal(sessionCsv.unpriced_requests, "0");
  const modelCsv = await exportCsvRow("type=models&apiKeyId=key-stored");
  assert.equal(modelCsv.cost_usd, String(STORED_COST));
  assert.equal(modelCsv.unpriced_requests, "0");
});

test("a slice mixing stored and catalog-priced requests adds the stored cost to the catalog cost", async () => {
  const expected = Number((MIXED_STORED_COST + CATALOG_COST).toFixed(6));
  const report = await summary("apiKeyId=key-mixed");
  assert.equal(report.totals.requests, 2);
  assert.equal(report.totals.costUsd, expected);
  assert.equal(report.totals.unpricedRequests, 0);
  assert.equal(report.totals.tokens.total, 2 * 1500, "both requests' tokens are shown");
  assert.equal(report.breakdowns.models.length, 1);
  assert.equal(report.breakdowns.models[0].costUsd, expected);
  assert.equal(report.breakdowns.daily.length, 1);
  assert.equal(report.breakdowns.daily[0].costUsd, expected);

  const row = await sessionRow("key-mixed");
  assert.equal(row.costUsd, expected);
  assert.equal(row.mainModel, "gpt-4o-mini");

  const detail = await sessionDetail(row.id);
  assert.equal(detail.totals.costUsd, expected);
  assert.deepEqual(
    detail.recentRequests.map((request) => [request.costUsd, request.priced]),
    [
      [MIXED_STORED_COST, true],
      [CATALOG_COST, true],
    ],
    "newest first: the stored cost, then the catalog price"
  );

  const sessionCsv = await exportCsvRow("type=sessions&apiKeyId=key-mixed");
  assert.equal(sessionCsv.cost_usd, String(expected));
});

test("requests without a stored cost or a catalog price stay unpriced, next to stored ones", async () => {
  const unpriced = await summary("apiKeyId=key-unpriced");
  assert.equal(unpriced.totals.costUsd, 0);
  assert.equal(unpriced.totals.unpricedRequests, 1);

  // Across all three members: one unpriced request, and the stored and catalog costs add up.
  const all = await summary("");
  assert.equal(all.totals.requests, 4);
  assert.equal(all.totals.unpricedRequests, 1);
  assert.equal(
    all.totals.costUsd,
    Number((STORED_COST + MIXED_STORED_COST + CATALOG_COST).toFixed(6))
  );
  const uncatalogued = all.breakdowns.models.find((row) => row.key === UNPRICED_MODEL);
  assert.ok(uncatalogued);
  assert.equal(uncatalogued.requests, 2);
  assert.equal(uncatalogued.costUsd, STORED_COST);
  assert.equal(uncatalogued.unpricedRequests, 1);
});
