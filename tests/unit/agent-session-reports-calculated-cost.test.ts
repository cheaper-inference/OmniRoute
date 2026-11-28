// Team reports bill a request's stored cost as usage analytics does:
// COALESCE(provider_cost_usd, calculated_cost_usd). calculated_cost_usd holds the catalogue
// estimate of a non-token tariff (OCR pages, embedding batches), so such a request is priced
// even though its model has no per-token catalog row; a provider-reported cost still wins.
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

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agent-reports-calc-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
delete process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const { GET: getSummary } = await import("../../src/app/api/reports/summary/route.ts");
const { GET: getSessions } = await import("../../src/app/api/reports/sessions/route.ts");
const { GET: getSessionDetail } = await import("../../src/app/api/reports/sessions/[id]/route.ts");

test.after(() => {
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// No per-token catalog row exists for this model.
const OCR_MODEL = "team-reports-ocr-model";
const CALCULATED_COST = 0.03;
const REPORTED_COST = 0.02;

function member(apiKeyId: string) {
  return {
    apiKeyId,
    apiKeyName: apiKeyId,
    agentContext: {
      client: "claude-code",
      clientSessionId: `${apiKeyId}-1`,
      projectName: "acme",
      projectRepo: "github.com/team/acme",
      projectPath: "/work/acme",
      projectSource: "header" as const,
      gitBranch: "main",
    },
  };
}

async function recordOcr(apiKeyId: string, extra: Record<string, unknown>, timestamp: string) {
  await usageHistory.saveRequestUsage({
    ...member(apiKeyId),
    provider: "mistral",
    model: OCR_MODEL,
    connectionId: "conn-mistral-1",
    tokens: { input: 0, output: 0 },
    billingUnit: "page",
    billingQuantity: 30,
    billingUnitPriceUsd: 0.001,
    success: true,
    latencyMs: 10,
    timestamp,
    ...extra,
  });
}

async function summary(query: string): Promise<AgentSessionReport> {
  const res = await getSummary(new Request(`http://localhost:20128/api/reports/summary?${query}`));
  assert.equal(res.status, 200);
  return (await res.json()) as AgentSessionReport;
}

async function sessionRow(apiKeyId: string): Promise<AgentSessionReportRow> {
  const res = await getSessions(
    new Request(`http://localhost:20128/api/reports/sessions?apiKeyId=${apiKeyId}`)
  );
  assert.equal(res.status, 200);
  const body = (await res.json()) as { sessions: AgentSessionReportRow[] };
  assert.equal(body.sessions.length, 1);
  return body.sessions[0];
}

async function sessionDetail(id: string): Promise<AgentSessionReportDetail> {
  const res = await getSessionDetail(
    new Request(`http://localhost:20128/api/reports/sessions/${id}`),
    { params: Promise.resolve({ id }) }
  );
  assert.equal(res.status, 200);
  return (await res.json()) as AgentSessionReportDetail;
}

test.before(async () => {
  await recordOcr("key-calc", { calculatedCostUsd: CALCULATED_COST }, "2026-10-05T10:00:00.000Z");
  await recordOcr(
    "key-both",
    {
      calculatedCostUsd: CALCULATED_COST,
      tokens: { input: 0, output: 0, cost_usd: REPORTED_COST },
    },
    "2026-10-05T11:00:00.000Z"
  );
});

test("a calculated (non-token) cost is billed and the request is not unpriced", async () => {
  const report = await summary("apiKeyId=key-calc");
  assert.equal(report.totals.costUsd, CALCULATED_COST);
  assert.equal(report.totals.unpricedRequests, 0);
  assert.equal(report.breakdowns.models[0].costUsd, CALCULATED_COST);

  const row = await sessionRow("key-calc");
  assert.equal(row.costUsd, CALCULATED_COST);
  assert.equal(row.unpricedRequests, 0);

  const detail = await sessionDetail(row.id);
  assert.equal(detail.totals.costUsd, CALCULATED_COST);
  assert.deepEqual(
    detail.recentRequests.map((request) => [request.costUsd, request.priced]),
    [[CALCULATED_COST, true]]
  );
});

test("a provider-reported cost takes precedence over the calculated one", async () => {
  const report = await summary("apiKeyId=key-both");
  assert.equal(report.totals.costUsd, REPORTED_COST);
  assert.equal(report.totals.unpricedRequests, 0);

  const row = await sessionRow("key-both");
  const detail = await sessionDetail(row.id);
  assert.equal(detail.recentRequests[0].costUsd, REPORTED_COST);
});
