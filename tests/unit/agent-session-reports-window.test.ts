// Team reports: the sessions list, session detail and export count the same windowed,
// read-time priced requests as the summary KPIs, plus the model, "none" and tzOffset filters.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import type {
  AgentSessionReport,
  AgentSessionReportRow,
} from "../../src/lib/usage/agentSessionReports.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agent-reports-window-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
delete process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const { REPORT_FILTER_NONE } = await import("../../src/lib/db/agentSessionReports.ts");
const { listAgentSessionsForExport } = await import("../../src/lib/usage/agentSessionReports.ts");
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

type Report = AgentSessionReport;
type SessionRow = AgentSessionReportRow;
type Tokens = Report["totals"]["tokens"];

const TOKENS = { input: 1000, output: 500, cacheRead: 200 };
const DAY = "2026-10-02";
const WINDOW = `from=${DAY}T00:00:00.000Z&to=${DAY}T23:59:59.999Z`;
const TS = {
  alice1: "2026-10-01T10:00:00.000Z",
  alice2: "2026-10-02T10:00:00.000Z",
  alice3: "2026-10-03T10:00:00.000Z",
  bob1: "2026-10-02T08:00:00.000Z",
  bobLate: "2026-10-02T23:30:00.000Z",
  carol: "2026-10-02T15:00:00.000Z",
  anon: "2026-10-02T16:00:00.000Z",
};

async function recordUsage(entry: Record<string, unknown>) {
  await usageHistory.saveRequestUsage({
    provider: "openai",
    model: "gpt-4o-mini",
    connectionId: "conn-openai-1",
    tokens: TOKENS,
    success: true,
    latencyMs: 10,
    apiKeyId: "key-alice",
    apiKeyName: "Alice",
    ...entry,
  });
}

function agentContext(clientSessionId: string, projectName: string | null = "acme") {
  return {
    client: projectName ? "claude-code" : "codex",
    clientSessionId,
    projectName,
    projectRepo: projectName ? `github.com/team/${projectName}` : null,
    projectPath: projectName ? `/work/${projectName}` : null,
    projectSource: projectName ? ("header" as const) : null,
    gitBranch: projectName ? "main" : null,
  };
}

function reportRequest(pathAndQuery: string): Request {
  return new Request(`http://localhost:20128${pathAndQuery}`);
}

async function summary(query: string): Promise<Report> {
  const res = await getSummary(reportRequest(`/api/reports/summary?${query}`));
  assert.equal(res.status, 200, `summary ?${query}`);
  return (await res.json()) as Report;
}

async function sessionList(query: string): Promise<{ sessions: SessionRow[]; total: number }> {
  const res = await getSessions(reportRequest(`/api/reports/sessions?${query}`));
  assert.equal(res.status, 200, `sessions ?${query}`);
  return (await res.json()) as { sessions: SessionRow[]; total: number };
}

function csvColumn(csv: string, column: string): string[] {
  const [header, ...rows] = csv.trim().split("\n");
  const index = header.split(",").indexOf(column);
  assert.ok(index >= 0, `missing CSV column ${column}`);
  return rows.map((row) => row.split(",")[index]);
}

test.before(async () => {
  await settingsDb.updatePricing({
    openai: {
      "gpt-4o-mini": { input: 1, output: 2, cached: 0.5, cache_creation: 1, reasoning: 2 },
    },
    deepseek: { "deepseek-chat": { input: 0.5, output: 1, cached: 0.1, cache_creation: 0.5 } },
  });

  // Alice: one session over three days; the middle day used deepseek, the last request failed.
  const alice = agentContext("alice-w");
  await recordUsage({ agentContext: alice, timestamp: TS.alice1 });
  await recordUsage({
    agentContext: alice,
    provider: "deepseek",
    model: "deepseek-chat",
    connectionId: "conn-deepseek-1",
    timestamp: TS.alice2,
  });
  await recordUsage({ agentContext: alice, success: false, timestamp: TS.alice3 });

  // Bob: two openai requests on the same UTC day, the second at 23:30Z.
  const bob = {
    apiKeyId: "key-bob",
    apiKeyName: "Bob",
    agentContext: agentContext("bob-w", "billing"),
  };
  await recordUsage({ ...bob, tokens: { input: 3000, output: 1000 }, timestamp: TS.bob1 });
  await recordUsage({ ...bob, timestamp: TS.bobLate });

  // Carol: a session without a project.
  await recordUsage({
    apiKeyId: "key-carol",
    apiKeyName: "Carol",
    agentContext: agentContext("carol-w", null),
    timestamp: TS.carol,
  });

  // A session without a member (no API key).
  await recordUsage({
    apiKeyId: null,
    apiKeyName: null,
    agentContext: agentContext("anon-w"),
    provider: "deepseek",
    model: "deepseek-chat",
    connectionId: "conn-deepseek-1",
    timestamp: TS.anon,
  });
});

async function assertListMatchesSummary(query: string) {
  const report = await summary(query);
  const list = await sessionList(`${query}&limit=100`);
  assert.equal(list.total, report.totals.sessions, `session count ?${query}`);
  assert.equal(list.sessions.length, list.total);

  const sum = (pick: (row: SessionRow) => number) =>
    list.sessions.reduce((acc, row) => acc + pick(row), 0);
  assert.equal(
    sum((r) => r.requests),
    report.totals.requests,
    `requests ?${query}`
  );
  assert.equal(
    sum((r) => r.errors),
    report.totals.errors,
    `errors ?${query}`
  );
  assert.equal(
    sum((r) => r.unpricedRequests),
    report.totals.unpricedRequests
  );
  for (const field of Object.keys(report.totals.tokens) as Array<keyof Tokens>) {
    assert.equal(
      sum((r) => r.tokens[field]),
      report.totals.tokens[field],
      `tokens.${field}`
    );
  }
  // Each row rounds to 6 decimals, like the KPI total.
  assert.ok(Math.abs(sum((r) => r.costUsd) - report.totals.costUsd) < 1e-5, `cost ?${query}`);
  return { report, list };
}

test("sessions list totals over a window that cuts a session equal the summary KPI totals", async () => {
  const { report, list } = await assertListMatchesSummary(WINDOW);
  assert.equal(report.totals.sessions, 4);
  assert.equal(report.totals.requests, 5);

  const alice = list.sessions.find((row) => row.apiKeyId === "key-alice");
  assert.ok(alice);
  // Only the in-window deepseek request counts, priced at read time.
  assert.equal(alice.requests, 1);
  assert.equal(alice.errors, 0);
  assert.equal(alice.tokens.total, 1500);
  const aliceInWindow = await summary(`${WINDOW}&apiKeyId=key-alice`);
  assert.equal(alice.costUsd, aliceInWindow.totals.costUsd);
  assert.equal(alice.windowFirstSeenAt, TS.alice2);
  assert.equal(alice.windowLastSeenAt, TS.alice2);
  // Session metadata stays all-time.
  assert.equal(alice.firstSeenAt, TS.alice1);
  assert.equal(alice.lastSeenAt, TS.alice3);

  await assertListMatchesSummary("");
  await assertListMatchesSummary(`${WINDOW}&provider=openai`);
});

test("provider filter counts only that provider's requests inside the window", async () => {
  const { list } = await assertListMatchesSummary(`${WINDOW}&provider=openai`);
  // Alice used openai, but only outside the window.
  assert.deepEqual(list.sessions.map((row) => row.apiKeyId).sort(), ["key-bob", "key-carol"]);
  const bob = list.sessions.find((row) => row.apiKeyId === "key-bob");
  assert.equal(bob?.requests, 2);

  const byAccount = await assertListMatchesSummary(`${WINDOW}&connectionId=conn-deepseek-1`);
  assert.equal(byAccount.list.total, 2);
  assert.ok(byAccount.list.sessions.every((row) => row.requests === 1));
});

test("model filter counts only that model's requests", async () => {
  const { report, list } = await assertListMatchesSummary("model=deepseek-chat");
  assert.equal(report.totals.requests, 2);
  assert.deepEqual(
    report.breakdowns.models.map((row) => row.key),
    ["deepseek-chat"]
  );
  assert.deepEqual(list.sessions.map((row) => row.apiKeyId).sort(), [null, "key-alice"].sort());

  const csv = await (
    await getExport(reportRequest("/api/reports/export?type=models&model=deepseek-chat"))
  ).text();
  assert.deepEqual(csvColumn(csv, "key"), ["deepseek-chat"]);
});

test("the none sentinel selects sessions without a project, member or client", async () => {
  assert.equal(REPORT_FILTER_NONE, "__none__");

  const noProject = await assertListMatchesSummary(`projectName=${REPORT_FILTER_NONE}`);
  assert.equal(noProject.report.totals.requests, 1);
  assert.deepEqual(
    noProject.list.sessions.map((row) => [row.apiKeyId, row.projectName]),
    [["key-carol", null]]
  );

  const noMember = await assertListMatchesSummary(`apiKeyId=${REPORT_FILTER_NONE}`);
  assert.equal(noMember.report.totals.requests, 1);
  assert.deepEqual(
    noMember.list.sessions.map((row) => [row.apiKeyId, row.projectName]),
    [[null, "acme"]]
  );
  assert.deepEqual(
    noMember.report.breakdowns.members.map((row) => row.key),
    [""]
  );

  const noClient = await summary(`client=${REPORT_FILTER_NONE}`);
  assert.equal(noClient.totals.requests, 0);

  const csv = await (
    await getExport(reportRequest(`/api/reports/export?type=projects&projectName=__none__`))
  ).text();
  assert.deepEqual(csvColumn(csv, "key"), [""]);
});

test("tzOffset groups the daily breakdown by local day", async () => {
  const daily = async (query: string) =>
    (await summary(`apiKeyId=key-bob${query}`)).breakdowns.daily.map((row) => [
      row.key,
      row.requests,
    ]);

  assert.deepEqual(await daily(""), [[DAY, 2]]);
  // UTC+1: the 23:30Z request is 00:30 on the next local day.
  assert.deepEqual(await daily("&tzOffset=60"), [
    [DAY, 1],
    ["2026-10-03", 1],
  ]);
  // UTC-10: the 08:00Z request is 22:00 on the previous local day.
  assert.deepEqual(await daily("&tzOffset=-600"), [
    ["2026-10-01", 1],
    [DAY, 1],
  ]);

  const csv = await (
    await getExport(reportRequest("/api/reports/export?type=daily&apiKeyId=key-bob&tzOffset=60"))
  ).text();
  assert.deepEqual(csvColumn(csv, "key"), [DAY, "2026-10-03"]);

  for (const bad of ["841", "-841", "1.5", "east"]) {
    const res = await getSummary(reportRequest(`/api/reports/summary?tzOffset=${bad}`));
    assert.equal(res.status, 400, `tzOffset=${bad}`);
  }
});

test("sessions list sorts and pages by the window bounds", async () => {
  // All-time, Alice's session started first; inside the window Bob's did.
  const firstSeen = await sessionList(`${WINDOW}&sort=firstSeen&order=asc`);
  assert.deepEqual(
    firstSeen.sessions.map((row) => row.apiKeyId),
    ["key-bob", "key-alice", "key-carol", null]
  );

  const page = await sessionList(`${WINDOW}&sort=firstSeen&order=asc&limit=2&offset=2`);
  assert.equal(page.total, 4);
  assert.deepEqual(
    page.sessions.map((row) => row.apiKeyId),
    ["key-carol", null]
  );

  const byRequests = await sessionList(`${WINDOW}&sort=requests&order=desc`);
  assert.equal(byRequests.sessions[0].apiKeyId, "key-bob");

  const byLastSeen = await sessionList(WINDOW);
  assert.equal(byLastSeen.sessions[0].apiKeyId, "key-bob", "Bob's 23:30Z request is the latest");
});

test("sessions export honors sort and reports the total and truncation", async () => {
  const res = await getExport(
    reportRequest(`/api/reports/export?type=sessions&${WINDOW}&sort=firstSeen&order=asc`)
  );
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("x-report-total"), "4");
  assert.equal(res.headers.get("x-report-truncated"), "false");
  const csv = await res.text();
  assert.deepEqual(csvColumn(csv, "api_key_id"), ["key-bob", "key-alice", "key-carol", ""]);
  assert.deepEqual(csvColumn(csv, "requests"), ["2", "1", "1", "1"]);

  const desc = await (
    await getExport(
      reportRequest(`/api/reports/export?type=sessions&${WINDOW}&sort=firstSeen&order=desc`)
    )
  ).text();
  assert.deepEqual(csvColumn(desc, "api_key_id"), ["", "key-carol", "key-alice", "key-bob"]);

  const capped = await listAgentSessionsForExport(
    { from: `${DAY}T00:00:00.000Z`, to: `${DAY}T23:59:59.999Z` },
    { sort: "firstSeen", order: "asc" },
    2
  );
  assert.equal(capped.total, 4);
  assert.equal(capped.truncated, true);
  assert.deepEqual(
    capped.sessions.map((row) => row.apiKeyId),
    ["key-bob", "key-alice"]
  );

  const full = await listAgentSessionsForExport({}, {}, 5);
  assert.equal(full.truncated, false);
  assert.equal(full.total, 4);
});

test("session detail totals are priced at read time and match the all-time list row", async () => {
  const list = await sessionList("apiKeyId=key-alice");
  assert.equal(list.total, 1);
  const [row] = list.sessions;

  const res = await getSessionDetail(reportRequest(`/api/reports/sessions/${row.id}`), {
    params: Promise.resolve({ id: row.id }),
  });
  assert.equal(res.status, 200);
  const detail = (await res.json()) as {
    session: { requestCount: number };
    recentRequests: unknown[];
    totals: Pick<SessionRow, "requests" | "errors" | "unpricedRequests" | "costUsd" | "tokens">;
  };
  assert.equal(detail.session.requestCount, 3);
  assert.equal(detail.recentRequests.length, 3);
  assert.deepEqual(detail.totals, {
    requests: row.requests,
    errors: row.errors,
    unpricedRequests: row.unpricedRequests,
    costUsd: row.costUsd,
    tokens: row.tokens,
  });
  assert.equal(detail.totals.requests, 3);
  assert.equal(detail.totals.errors, 1);
  const report = await summary("apiKeyId=key-alice");
  assert.equal(detail.totals.costUsd, report.totals.costUsd);
});
