// Team reports cache the computed summary and per-session rows per normalized filter: a repeat,
// another page or another sort order reuses them, with results identical to a fresh
// computation. New usage drops them at once; anything else is seen within the TTL.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agent-reports-cache-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
delete process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const reports = await import("../../src/lib/usage/agentSessionReports.ts");
const { REPORT_CACHE_TTL_MS, reportFilterKey } =
  await import("../../src/lib/usage/agentSessionReportCache.ts");

test.after(() => {
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const PRICING = { input: 1, output: 2, cached: 0.5, cache_creation: 1 };
let nextMinute = 0;

async function recordUsage(apiKeyId: string, entry: Record<string, unknown> = {}) {
  nextMinute += 1;
  await usageHistory.saveRequestUsage({
    provider: "openai",
    model: "gpt-4o-mini",
    connectionId: "conn-openai-1",
    tokens: { input: 1000, output: 500, cacheRead: 200 },
    success: true,
    latencyMs: 100 * nextMinute,
    apiKeyId,
    apiKeyName: apiKeyId,
    agentContext: {
      client: "claude-code",
      clientSessionId: `${apiKeyId}-1`,
      projectName: `project-${apiKeyId}`,
      projectRepo: null,
      projectPath: null,
      projectSource: "header" as const,
      gitBranch: "main",
    },
    timestamp: new Date(Date.UTC(2026, 9, 6, 9, nextMinute)).toISOString(),
    ...entry,
  });
}

/** Distinct from {} for the cache but selecting the same requests: a fresh computation. */
let freshSeq = 0;
function freshFilter() {
  freshSeq += 1;
  return { to: `2999-12-31T23:59:59.${String(freshSeq).padStart(3, "0")}Z` };
}

const json = (value: unknown) => JSON.stringify(value);

test.before(async () => {
  await settingsDb.updatePricing({ openai: { "gpt-4o-mini": PRICING } });
  // Five sessions with 1, 2, 3, 1 and 2 requests: sort orders differ and some values tie.
  for (const [index, key] of ["key-a", "key-b", "key-c", "key-d", "key-e"].entries()) {
    for (let request = 0; request <= index % 3; request++) await recordUsage(key);
  }
});

test("the filter key ignores field order and the order and repetition of multi-value values", () => {
  assert.equal(
    reportFilterKey({ model: ["b", "a", "b"], from: "2026-10-01T00:00:00.000Z" }),
    reportFilterKey({ from: "2026-10-01T00:00:00.000Z", model: ["a", "b"] })
  );
  assert.equal(reportFilterKey({ model: "a" }), reportFilterKey({ model: ["a"] }));
  assert.equal(reportFilterKey({ model: undefined }), reportFilterKey({}));
  assert.notEqual(reportFilterKey({ model: "a" }), reportFilterKey({ provider: "a" }));
  assert.notEqual(reportFilterKey({ tzOffset: 60 }), reportFilterKey({}));
  assert.notEqual(reportFilterKey({ search: "a" }), reportFilterKey({ search: "b" }));
});

test("a repeated summary is identical to the first computation and to a fresh one", async () => {
  const first = await reports.buildAgentSessionReport({});
  const repeated = await reports.buildAgentSessionReport({});
  assert.equal(first.totals.requests, 9);
  assert.equal(json(repeated), json(first));
  assert.equal(json(await reports.buildAgentSessionReport(freshFilter())), json(first));
  // The caller gets a copy: changing it does not change later results.
  repeated.totals.requests = -1;
  repeated.breakdowns.members.length = 0;
  assert.equal(json(await reports.buildAgentSessionReport({})), json(first));
});

test("every page and sort of the cached sessions equals a fresh computation", async () => {
  const pages = [
    {},
    { offset: 2, limit: 2 },
    { sort: "requests" as const },
    { sort: "requests" as const, order: "asc" as const, offset: 1, limit: 3 },
    { sort: "cost" as const, order: "asc" as const },
    { sort: "activeTime" as const },
    { sort: "firstSeen" as const, order: "asc" as const, offset: 4 },
    { sort: "tokens" as const, limit: 100 },
  ];
  await reports.listAgentSessionReportRows({});
  for (const page of pages) {
    const cached = await reports.listAgentSessionReportRows({}, page);
    const fresh = await reports.listAgentSessionReportRows(freshFilter(), page);
    assert.equal(cached.total, 5);
    assert.equal(json(cached), json(fresh), JSON.stringify(page));
  }
  // The caller gets copies of the cached rows.
  const { sessions } = await reports.listAgentSessionReportRows({}, { limit: 100 });
  const before = json(sessions);
  sessions[0].tokens.total = -1;
  sessions[0].costUsd = -1;
  assert.equal(
    json((await reports.listAgentSessionReportRows({}, { limit: 100 })).sessions),
    before
  );
});

test("a new usage row drops the cached summary and sessions at once", async () => {
  const report = await reports.buildAgentSessionReport({});
  const list = await reports.listAgentSessionReportRows({}, { limit: 100 });
  await recordUsage("key-f");

  const after = await reports.buildAgentSessionReport({});
  assert.equal(after.totals.requests, report.totals.requests + 1);
  assert.equal(after.totals.sessions, report.totals.sessions + 1);
  const listAfter = await reports.listAgentSessionReportRows({}, { limit: 100 });
  assert.equal(listAfter.total, list.total + 1);
  assert.ok(listAfter.sessions.some((row) => row.apiKeyId === "key-f"));
  assert.equal(json(after), json(await reports.buildAgentSessionReport(freshFilter())));
});

test("other changes, such as a pricing edit, are picked up once the TTL has passed", async (t) => {
  const filter = { apiKeyId: "key-a" };
  const report = await reports.buildAgentSessionReport(filter);
  const row = (await reports.listAgentSessionReportRows(filter)).sessions[0];
  assert.ok(report.totals.costUsd > 0);

  await settingsDb.updatePricing({
    openai: { "gpt-4o-mini": { ...PRICING, input: 10, output: 20 } },
  });
  // No usage was recorded, so within the TTL the cached results (and their pages) still serve.
  assert.equal(
    (await reports.buildAgentSessionReport(filter)).totals.costUsd,
    report.totals.costUsd
  );
  const resorted = await reports.listAgentSessionReportRows(filter, { sort: "cost", offset: 0 });
  assert.equal(resorted.sessions[0].costUsd, row.costUsd);

  t.mock.timers.enable({ apis: ["Date"], now: Date.now() });
  t.mock.timers.tick(REPORT_CACHE_TTL_MS + 1);
  const repriced = await reports.buildAgentSessionReport(filter);
  assert.ok(repriced.totals.costUsd > report.totals.costUsd * 5, String(repriced.totals.costUsd));
  const repricedRow = (await reports.listAgentSessionReportRows(filter)).sessions[0];
  assert.equal(repricedRow.costUsd, repriced.totals.costUsd);
});
