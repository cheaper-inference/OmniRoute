// Team reports, Phase 3: the branches, errorCodes, serviceTiers and teams breakdowns, and the
// /api/reports/matrix, /api/reports/trends and /api/reports/heatmap views, with their filters.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import type {
  AgentSessionReport,
  AgentSessionReportRow,
  ReportBreakdownRow,
} from "../../src/lib/usage/agentSessionReports.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agent-reports-views-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
delete process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const teamsDb = await import("../../src/lib/db/teams.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const { GET: getSummary } = await import("../../src/app/api/reports/summary/route.ts");
const { GET: getSessions } = await import("../../src/app/api/reports/sessions/route.ts");
const { GET: getExport } = await import("../../src/app/api/reports/export/route.ts");

test.after(() => {
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

interface Metrics {
  requests: number;
  tokens: number;
  costUsd: number;
  activeMs: number | null;
}
interface Header extends Metrics {
  key: string;
  label: string | null;
  other: boolean;
}
interface Matrix {
  rowDimension: string;
  colDimension: string;
  rows: Header[];
  cols: Header[];
  cells: Metrics[][];
  totals: Metrics;
  truncated: boolean;
  rowCount: number;
  colCount: number;
}
interface Series {
  key: string;
  label: string | null;
  other: boolean;
  values: number[];
}
interface Trends {
  dimension: string;
  metric: string;
  bucket: "day" | "week";
  days: string[];
  series: Series[];
}
interface Heatmap {
  requests: number[][];
  costUsd: number[][];
  maxRequests: number;
  maxCostUsd: number;
}

const OTHER_KEY = "__other__";
const TOKENS = { input: 1000, output: 500, cacheRead: 200 };
// Core fixture: four members, one of them in two projects, with teams, branches, error codes and
// service tiers.
const CORE = "from=2026-11-01T00:00:00.000Z&to=2026-11-04T23:59:59.999Z";
// Wide fixture: 27 members, one request each, over 17 projects; more than the matrix and trends
// caps. Even members at Saturday 2026-08-01 10:00Z, odd ones at Monday 2026-08-03 23:30Z.
const WIDE = "from=2026-08-01T00:00:00.000Z&to=2026-08-04T23:59:59.999Z";
const WIDE_MEMBERS = 27;
const WIDE_PROJECTS = 17;
const teamIds = { platform: "", growth: "" };

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

function agentContext(
  clientSessionId: string,
  projectName: string | null,
  gitBranch: string | null,
  client = "claude-code"
) {
  return {
    client,
    clientSessionId,
    projectName,
    projectRepo: null,
    projectPath: projectName ? `/work/${projectName}` : null,
    projectSource: projectName ? ("header" as const) : null,
    gitBranch,
  };
}

function reportRequest(pathAndQuery: string): Request {
  return new Request(`http://localhost:20128${pathAndQuery}`);
}

// The view routes are imported on first use, so each test reports its own failure.
async function callView(route: string, query: string): Promise<Response> {
  const { GET } = await import(`../../src/app/api/reports/${route}/route.ts`);
  return GET(reportRequest(`/api/reports/${route}?${query}`));
}

async function view<T>(route: string, query: string): Promise<T> {
  const res = await callView(route, query);
  assert.equal(res.status, 200, `${route} ?${query}`);
  return (await res.json()) as T;
}

const matrix = (query: string) => view<Matrix>("matrix", query);
const trends = (query: string) => view<Trends>("trends", query);
const heatmap = (query: string) => view<Heatmap>("heatmap", query);

async function summary(query: string): Promise<AgentSessionReport> {
  const res = await getSummary(reportRequest(`/api/reports/summary?${query}`));
  assert.equal(res.status, 200, `summary ?${query}`);
  return (await res.json()) as AgentSessionReport;
}

async function sessionRows(query: string): Promise<AgentSessionReportRow[]> {
  const res = await getSessions(reportRequest(`/api/reports/sessions?${query}&limit=100`));
  assert.equal(res.status, 200, `sessions ?${query}`);
  return ((await res.json()) as { sessions: AgentSessionReportRow[] }).sessions;
}

function byKey(a: unknown[], b: unknown[]): number {
  return String(a[0]).localeCompare(String(b[0]));
}

function requestPairs(rows: ReportBreakdownRow[]): Array<[string, number]> {
  return rows.map((row): [string, number] => [row.key, row.requests]).sort(byKey);
}

function cell(result: Matrix, rowKey: string, colKey: string): Metrics {
  const i = result.rows.findIndex((row) => row.key === rowKey && !row.other);
  const j = result.cols.findIndex((col) => col.key === colKey && !col.other);
  assert.ok(i >= 0 && j >= 0, `cell ${rowKey} x ${colKey}`);
  return result.cells[i][j];
}

function sumCells(result: Matrix, pick: (metrics: Metrics) => number): number {
  return result.cells.flat().reduce((acc, metrics) => acc + pick(metrics), 0);
}

function assertClose(actual: number, expected: number, message?: string) {
  assert.ok(Math.abs(actual - expected) < 1e-5, `${message ?? ""} ${actual} != ${expected}`);
}

function wideMember(i: number): string {
  return `key-m${String(i).padStart(2, "0")}`;
}

/** Cost of one wide-fixture request: (i + 1) * 1000 input and 100 output tokens. */
function wideCost(i: number): number {
  return ((i + 1) * 1000 * 1 + 100 * 2) / 1_000_000;
}

test.before(async () => {
  await settingsDb.updatePricing({
    openai: {
      "gpt-4o-mini": { input: 1, output: 2, cached: 0.5, cache_creation: 1, reasoning: 2 },
    },
    deepseek: { "deepseek-chat": { input: 0.5, output: 1, cached: 0.1, cache_creation: 0.5 } },
  });
  teamIds.platform = teamsDb.createTeam({ name: "Platform" }).id;
  teamIds.growth = teamsDb.createTeam({ name: "Growth" }).id;

  const alice = { apiKeyId: "key-alice", apiKeyName: "Alice" };
  const aliceAcme = { ...alice, agentContext: agentContext("alice-acme", "acme", "main") };
  await recordUsage({ ...aliceAcme, timestamp: "2026-11-01T10:00:00.000Z" });
  await recordUsage({
    ...aliceAcme,
    success: false,
    errorCode: "rate_limited",
    tokens: { input: 0, output: 0 },
    timestamp: "2026-11-01T10:05:00.000Z",
  });
  await recordUsage({
    ...aliceAcme,
    provider: "deepseek",
    model: "deepseek-chat",
    connectionId: "conn-deepseek-1",
    serviceTier: "priority",
    timestamp: "2026-11-03T10:00:00.000Z",
  });
  await recordUsage({
    ...alice,
    agentContext: agentContext("alice-labs", "labs", "main"),
    timestamp: "2026-11-02T10:00:00.000Z",
  });

  const bob = {
    apiKeyId: "key-bob",
    apiKeyName: "Bob",
    agentContext: agentContext("bob-billing", "billing", "feat/x"),
  };
  await recordUsage({ ...bob, timestamp: "2026-11-01T12:00:00.000Z" });
  await recordUsage({
    ...bob,
    provider: "deepseek",
    model: "deepseek-chat",
    connectionId: "conn-deepseek-1",
    success: false,
    errorCode: "upstream_error",
    tokens: { input: 0, output: 0 },
    timestamp: "2026-11-02T12:00:00.000Z",
  });

  await recordUsage({
    apiKeyId: "key-carol",
    apiKeyName: "Carol",
    agentContext: agentContext("carol-none", null, null, "codex"),
    timestamp: "2026-11-02T09:00:00.000Z",
  });
  await recordUsage({
    apiKeyId: "key-dave",
    apiKeyName: "Dave",
    agentContext: agentContext("dave-labs", "labs", null),
    serviceTier: "flex",
    timestamp: "2026-11-04T09:00:00.000Z",
  });

  for (let i = 0; i < WIDE_MEMBERS; i++) {
    const seconds = String(i).padStart(2, "0");
    await recordUsage({
      apiKeyId: wideMember(i),
      apiKeyName: `Member ${i}`,
      agentContext: agentContext(`wide-${i}`, `p-${i % WIDE_PROJECTS}`, "main"),
      tokens: { input: (i + 1) * 1000, output: 100 },
      timestamp:
        i % 2 === 0 ? `2026-08-01T10:00:${seconds}.000Z` : `2026-08-03T23:30:${seconds}.000Z`,
    });
  }

  // Billing teams are snapshot per request; the test keys are not real API keys, so set them.
  const db = core.getDbInstance();
  const setTeam = db.prepare("UPDATE usage_history SET billing_team_id = ? WHERE api_key_id = ?");
  setTeam.run(teamIds.platform, "key-alice");
  setTeam.run(teamIds.growth, "key-bob");
});

test("summary breaks down by branch, error code, service tier and billing team", async () => {
  const report = await summary(CORE);
  const { branches, errorCodes, serviceTiers, teams } = report.breakdowns;

  assert.deepEqual(requestPairs(branches), [
    ["", 2],
    ["feat/x", 2],
    ["main", 4],
  ]);
  // Requests without an error code (all successes here) are the "" row.
  assert.deepEqual(requestPairs(errorCodes), [
    ["", 6],
    ["rate_limited", 1],
    ["upstream_error", 1],
  ]);
  assert.deepEqual(errorCodes.map((row) => [row.key, row.errors]).sort(byKey), [
    ["", 0],
    ["rate_limited", 1],
    ["upstream_error", 1],
  ]);
  assert.deepEqual(requestPairs(serviceTiers), [
    ["flex", 1],
    ["priority", 1],
    ["standard", 6],
  ]);
  assert.deepEqual(
    teams.map((row) => [row.key, row.label, row.requests]).sort(byKey),
    [
      ["", null, 2],
      [teamIds.growth, "Growth", 2],
      [teamIds.platform, "Platform", 4],
    ].sort(byKey)
  );

  const shape = Object.keys(report.breakdowns.members[0]).sort();
  for (const [name, rows] of Object.entries({ branches, errorCodes, serviceTiers, teams })) {
    for (const row of rows) assert.deepEqual(Object.keys(row).sort(), shape, name);
    assert.equal(
      rows.reduce((acc, row) => acc + row.requests, 0),
      report.totals.requests,
      `${name} requests add up`
    );
    assertClose(
      rows.reduce((acc, row) => acc + row.costUsd, 0),
      report.totals.costUsd,
      `${name} cost adds up`
    );
    const costs = rows.map((row) => row.costUsd);
    assert.deepEqual(
      costs,
      [...costs].sort((a, b) => b - a),
      `${name} sorted by cost`
    );
  }
});

test("the new breakdowns honor the filters, and each row drills down with its filter", async () => {
  const errors = await summary(`${CORE}&outcome=error`);
  assert.deepEqual(requestPairs(errors.breakdowns.errorCodes), [
    ["rate_limited", 1],
    ["upstream_error", 1],
  ]);
  const main = await summary(`${CORE}&gitBranch=main`);
  assert.deepEqual(requestPairs(main.breakdowns.branches), [["main", 4]]);
  const priority = await summary(`${CORE}&serviceTier=priority`);
  assert.deepEqual(requestPairs(priority.breakdowns.serviceTiers), [["priority", 1]]);
  const noTeam = await summary(`${CORE}&billingTeamId=__none__`);
  assert.deepEqual(
    noTeam.breakdowns.teams.map((row) => [row.key, row.label, row.requests]),
    [["", null, 2]]
  );

  // A "" row is what the filter's __none__ selects.
  const all = await summary(CORE);
  const noCode = all.breakdowns.errorCodes.find((row) => row.key === "");
  const noCodeSummary = await summary(`${CORE}&errorCode=__none__`);
  assert.equal(noCodeSummary.totals.requests, noCode?.requests);
  assertClose(noCodeSummary.totals.costUsd, noCode?.costUsd ?? -1);
  const platform = all.breakdowns.teams.find((row) => row.key === teamIds.platform);
  const platformSummary = await summary(`${CORE}&billingTeamId=${teamIds.platform}`);
  assert.equal(platformSummary.totals.requests, platform?.requests);
});

test("export accepts the new breakdown types", async () => {
  for (const type of ["branches", "errorCodes", "serviceTiers", "teams"]) {
    const res = await getExport(reportRequest(`/api/reports/export?type=${type}&${CORE}`));
    assert.equal(res.status, 200, type);
    const lines = (await res.text()).trim().split("\n");
    assert.equal(lines[0].split(",")[0], "key", type);
    assert.equal(lines.length, 4, `${type}: header and three rows`);
  }
});

test("matrix crosses members with projects by default, with labels and totals", async () => {
  const result = await matrix(CORE);
  assert.equal(result.rowDimension, "members");
  assert.equal(result.colDimension, "projects");
  assert.equal(result.truncated, false);
  assert.equal(result.rowCount, 4);
  assert.equal(result.colCount, 4);
  assert.deepEqual(result.rows.map((row) => [row.key, row.label]).sort(byKey), [
    ["key-alice", "Alice"],
    ["key-bob", "Bob"],
    ["key-carol", "Carol"],
    ["key-dave", "Dave"],
  ]);
  assert.deepEqual(result.cols.map((col) => col.key).sort(), ["", "acme", "billing", "labs"]);
  assert.ok(result.rows.every((row) => !row.other) && result.cols.every((col) => !col.other));
  assert.equal(result.cells.length, result.rows.length);
  for (const line of result.cells) assert.equal(line.length, result.cols.length);

  assert.equal(cell(result, "key-alice", "acme").requests, 3);
  assert.equal(cell(result, "key-alice", "labs").requests, 1);
  assert.equal(cell(result, "key-dave", "labs").requests, 1);
  assert.equal(cell(result, "key-bob", "billing").requests, 2);
  assert.equal(cell(result, "key-carol", "").requests, 1);
  assert.equal(cell(result, "key-bob", "acme").requests, 0);
  assert.equal(cell(result, "key-bob", "acme").costUsd, 0);

  const report = await summary(CORE);
  assert.equal(result.totals.requests, report.totals.requests);
  assert.equal(result.totals.tokens, report.totals.tokens.total);
  assertClose(result.totals.costUsd, report.totals.costUsd);
  assert.equal(result.totals.activeMs, report.totals.activeMs);
  assert.equal(
    sumCells(result, (m) => m.requests),
    report.totals.requests
  );
  // Headers are ordered by cost.
  const rowCosts = result.rows.map((row) => row.costUsd);
  assert.deepEqual(
    rowCosts,
    [...rowCosts].sort((a, b) => b - a)
  );
});

test("a matrix cell equals the summary filtered on its row and column", async () => {
  const result = await matrix(CORE);
  for (const [apiKeyId, projectName] of [
    ["key-alice", "labs"],
    ["key-alice", "acme"],
    ["key-carol", "__none__"],
  ]) {
    const drill = await summary(`${CORE}&apiKeyId=${apiKeyId}&projectName=${projectName}`);
    const metrics = cell(result, apiKeyId, projectName === "__none__" ? "" : projectName);
    assert.equal(metrics.requests, drill.totals.requests, `${apiKeyId} x ${projectName}`);
    assert.equal(metrics.tokens, drill.totals.tokens.total);
    assertClose(metrics.costUsd, drill.totals.costUsd);
    assert.equal(metrics.activeMs, drill.totals.activeMs);
  }
});

test("matrix active time covers whole sessions only", async () => {
  const sessions = await sessionRows(CORE);
  const activeOf = (apiKeyId: string) =>
    sessions.filter((row) => row.apiKeyId === apiKeyId).reduce((acc, r) => acc + r.activeMs, 0);

  const byProject = await matrix(CORE);
  const alice = byProject.rows.find((row) => row.key === "key-alice");
  assert.equal(alice?.activeMs, activeOf("key-alice"));
  assert.ok((alice?.activeMs ?? 0) > 0);

  // A session spans several models, so a member x model cell has no active time; the member
  // rows and the totals still do.
  const byModel = await matrix(`${CORE}&rows=members&cols=models`);
  assert.equal(byModel.colDimension, "models");
  assert.ok(byModel.cells.flat().every((metrics) => metrics.activeMs === null));
  assert.ok(byModel.cols.every((col) => col.activeMs === null));
  assert.equal(
    byModel.rows.find((row) => row.key === "key-alice")?.activeMs,
    activeOf("key-alice")
  );
  assert.equal(byModel.totals.activeMs, byProject.totals.activeMs);
  assert.equal(cell(byModel, "key-alice", "deepseek-chat").requests, 1);

  const teams = await matrix(`${CORE}&rows=teams&cols=branches`);
  const platform = teams.rows.find((row) => row.key === teamIds.platform);
  assert.equal(platform?.label, "Platform");
  assert.equal(cell(teams, teamIds.platform, "main").requests, 4);
});

test("matrix keeps the top 25 rows and 15 columns by cost and buckets the rest as other", async () => {
  const result = await matrix(WIDE);
  assert.equal(result.truncated, true);
  assert.equal(result.rowCount, WIDE_MEMBERS);
  assert.equal(result.colCount, WIDE_PROJECTS);
  assert.equal(result.rows.length, 26);
  assert.equal(result.cols.length, 16);

  // Cost grows with the member index, so m26 leads and m00, m01 fall into other.
  assert.equal(result.rows[0].key, wideMember(26));
  assert.equal(result.rows[0].label, "Member 26");
  const otherRow = result.rows[25];
  assert.deepEqual([otherRow.key, otherRow.other, otherRow.label], [OTHER_KEY, true, null]);
  assert.equal(otherRow.requests, 2);
  assertClose(otherRow.costUsd, wideCost(0) + wideCost(1));
  assert.ok(result.rows.slice(0, 25).every((row) => !row.other));

  // Projects 0-9 hold two members (j and j + 17), 10-16 one; p10 and p11 cost the least.
  assert.equal(result.cols[0].key, "p-9");
  const otherCol = result.cols[15];
  assert.deepEqual([otherCol.key, otherCol.other], [OTHER_KEY, true]);
  assert.equal(otherCol.requests, 2);
  assert.equal(cell(result, wideMember(10), "p-9").requests, 0);
  assert.equal(
    result.cells[result.rows.findIndex((r) => r.key === wideMember(11))][15].requests,
    1
  );
  assert.equal(result.cells[25][15].requests, 0, "m00 and m01 are in p-0 and p-1");
  assert.equal(result.cells[25][0].requests, 0);

  assert.equal(result.totals.requests, WIDE_MEMBERS);
  assert.equal(
    sumCells(result, (m) => m.requests),
    WIDE_MEMBERS
  );
  assertClose(
    sumCells(result, (m) => m.costUsd),
    result.totals.costUsd
  );
});

test("matrix applies the filters and validates its dimensions", async () => {
  const deepseek = await matrix(`${CORE}&provider=deepseek`);
  assert.equal(deepseek.totals.requests, 2);
  assert.equal(cell(deepseek, "key-alice", "acme").requests, 1);
  assert.equal(cell(deepseek, "key-bob", "billing").requests, 1);
  assert.deepEqual(deepseek.rows.map((row) => row.key).sort(), ["key-alice", "key-bob"]);

  const wideOne = await matrix(`${WIDE}&apiKeyId=${wideMember(3)}&rows=projects&cols=clients`);
  assert.deepEqual(
    wideOne.rows.map((row) => row.key),
    ["p-3"]
  );
  assert.equal(wideOne.truncated, false);

  for (const query of ["rows=members&cols=members", "rows=accounts", "cols=daily", "rows=x"]) {
    const res = await callView("matrix", query);
    assert.equal(res.status, 400, query);
  }
  const reversed = await callView("matrix", "from=2026-11-02T00:00:00Z&to=2026-11-01T00:00:00Z");
  assert.equal(reversed.status, 400);
});

test("trends stack the top 8 series by the metric plus other, with zero days", async () => {
  const cost = await trends(`${WIDE}&tzOffset=0`);
  assert.equal(cost.dimension, "members");
  assert.equal(cost.metric, "costUsd");
  assert.equal(cost.bucket, "day");
  assert.deepEqual(cost.days, ["2026-08-01", "2026-08-02", "2026-08-03", "2026-08-04"]);
  assert.equal(cost.series.length, 9);
  assert.deepEqual(
    cost.series.slice(0, 8).map((series) => series.key),
    [26, 25, 24, 23, 22, 21, 20, 19].map(wideMember)
  );
  assert.equal(cost.series[0].label, "Member 26");
  assert.deepEqual(cost.series[0].values, [wideCost(26), 0, 0, 0]);
  assert.deepEqual(cost.series[1].values, [0, 0, wideCost(25), 0]);
  const other = cost.series[8];
  assert.deepEqual([other.key, other.other, other.label], [OTHER_KEY, true, null]);
  let evens = 0;
  let odds = 0;
  for (let i = 0; i <= 18; i++) {
    if (i % 2 === 0) evens += wideCost(i);
    else odds += wideCost(i);
  }
  assertClose(other.values[0], evens);
  assert.equal(other.values[1], 0, "a day without usage is zero");
  assertClose(other.values[2], odds);
  assert.equal(other.values[3], 0);

  // Every member has one request: ties go to the key.
  const requests = await trends(`${WIDE}&metric=requests`);
  assert.equal(requests.metric, "requests");
  assert.deepEqual(
    requests.series.map((series) => series.key),
    [...[0, 1, 2, 3, 4, 5, 6, 7].map(wideMember), OTHER_KEY]
  );
  assert.deepEqual(requests.series[8].values, [10, 0, 9, 0]);

  const tokens = await trends(`${WIDE}&metric=tokens&apiKeyId=${wideMember(4)}`);
  assert.deepEqual(tokens.series, [
    { key: wideMember(4), label: "Member 4", other: false, values: [5100, 0, 0, 0] },
  ]);
});

test("trends group by local day and keep the window's empty days", async () => {
  // UTC+1: the window covers five local days, and 23:30Z on the 3rd is the 4th locally.
  const east = await trends(`${WIDE}&tzOffset=60`);
  assert.deepEqual(east.days, [
    "2026-08-01",
    "2026-08-02",
    "2026-08-03",
    "2026-08-04",
    "2026-08-05",
  ]);
  assert.deepEqual(east.series[1].values, [0, 0, 0, wideCost(25), 0]);
  assert.deepEqual(east.series[0].values, [wideCost(26), 0, 0, 0, 0]);

  // UTC-11: 10:00Z on the 1st is 23:00 on July 31st locally.
  const west = await trends(`${WIDE}&tzOffset=-660`);
  assert.deepEqual(west.days, [
    "2026-07-31",
    "2026-08-01",
    "2026-08-02",
    "2026-08-03",
    "2026-08-04",
  ]);
  assert.deepEqual(west.series[0].values, [wideCost(26), 0, 0, 0, 0]);
  assert.deepEqual(west.series[1].values, [0, 0, 0, wideCost(25), 0]);

  const empty = await trends("from=2026-07-01T00:00:00.000Z&to=2026-07-03T23:59:59.999Z");
  assert.deepEqual(empty.days, ["2026-07-01", "2026-07-02", "2026-07-03"]);
  assert.deepEqual(empty.series, []);
});

test("trends stack by any dimension and apply the filters", async () => {
  const codes = await trends(`${CORE}&dimension=errorCodes&metric=requests&outcome=error`);
  assert.equal(codes.dimension, "errorCodes");
  assert.deepEqual(codes.days, ["2026-11-01", "2026-11-02", "2026-11-03", "2026-11-04"]);
  assert.deepEqual(codes.series.map((series) => [series.key, series.values]).sort(byKey), [
    ["rate_limited", [1, 0, 0, 0]],
    ["upstream_error", [0, 1, 0, 0]],
  ]);

  const tiers = await trends(`${CORE}&dimension=serviceTiers&metric=requests`);
  assert.deepEqual(
    tiers.series.map((series) => [series.key, series.values]),
    [
      ["standard", [3, 3, 0, 0]],
      ["flex", [0, 0, 0, 1]],
      ["priority", [0, 0, 1, 0]],
    ]
  );

  const teams = await trends(`${CORE}&dimension=teams&metric=requests&apiKeyId=key-bob`);
  assert.deepEqual(teams.series, [
    { key: teamIds.growth, label: "Growth", other: false, values: [1, 1, 0, 0] },
  ]);

  for (const query of ["dimension=daily", "dimension=accounts", "metric=errors"]) {
    const res = await callView("trends", `${CORE}&${query}`);
    assert.equal(res.status, 400, query);
  }
});

test("trends longer than 366 days are summed per week; beyond 366 weeks they are refused", async () => {
  const weekly = await trends(
    "from=2025-06-01T00:00:00.000Z&to=2026-08-31T23:59:59.999Z&metric=requests"
  );
  assert.equal(weekly.bucket, "week");
  // Each entry is the Monday that starts the week; 2025-06-01 is a Sunday.
  assert.equal(weekly.days[0], "2025-05-26");
  assert.equal(weekly.days.at(-1), "2026-08-31");
  for (const [index, day] of weekly.days.entries()) {
    assert.equal(new Date(`${day}T00:00:00Z`).getUTCDay(), 1, day);
    if (index > 0) {
      const previous = Date.parse(`${weekly.days[index - 1]}T00:00:00Z`);
      assert.equal(Date.parse(`${day}T00:00:00Z`) - previous, 7 * 86_400_000);
    }
  }
  const other = weekly.series.find((series) => series.other);
  assert.equal(other?.values[weekly.days.indexOf("2026-07-27")], 10);
  assert.equal(other?.values[weekly.days.indexOf("2026-08-03")], 9);
  assert.equal(
    other?.values.reduce((acc, value) => acc + value, 0),
    19
  );

  const tooLong = await callView("trends", "from=2000-01-01T00:00:00.000Z&to=2026-08-31T00:00:00Z");
  assert.equal(tooLong.status, 400);
});

test("heatmap counts requests and cost by local weekday and hour", async () => {
  const utc = await heatmap(WIDE);
  assert.equal(utc.requests.length, 7);
  assert.ok(utc.requests.every((hours) => hours.length === 24));
  assert.ok(utc.costUsd.every((hours) => hours.length === 24));
  // Weekday 0 is Sunday: 2026-08-01 is a Saturday (6), 2026-08-03 a Monday (1).
  assert.equal(utc.requests[6][10], 14);
  assert.equal(utc.requests[1][23], 13);
  assert.equal(
    utc.requests.flat().reduce((acc, value) => acc + value, 0),
    WIDE_MEMBERS
  );
  assert.equal(utc.maxRequests, 14);
  const report = await summary(WIDE);
  assertClose(
    utc.costUsd.flat().reduce((acc, value) => acc + value, 0),
    report.totals.costUsd
  );
  assert.equal(utc.maxCostUsd, utc.costUsd[6][10]);
  assert.ok(utc.costUsd[6][10] > utc.costUsd[1][23]);

  // UTC+1: Saturday 11:00, and Monday 23:30Z becomes Tuesday 00:30.
  const east = await heatmap(`${WIDE}&tzOffset=60`);
  assert.equal(east.requests[6][11], 14);
  assert.equal(east.requests[2][0], 13);
  assert.equal(east.requests[1][23], 0);

  const one = await heatmap(`${WIDE}&apiKeyId=${wideMember(1)}`);
  assert.equal(one.requests[1][23], 1);
  assert.equal(one.maxRequests, 1);
  assertClose(one.maxCostUsd, wideCost(1));

  const none = await heatmap("from=2026-07-01T00:00:00.000Z&to=2026-07-02T00:00:00.000Z");
  assert.equal(none.maxRequests, 0);
  assert.equal(none.maxCostUsd, 0);

  const bad = await callView("heatmap", "tzOffset=900");
  assert.equal(bad.status, 400);
});

test("summary, trends and matrix of one filter share a single read of the window", async (t) => {
  const db = core.getDbInstance();
  const prepare = t.mock.method(db, "prepare");
  // A filter no other test used, so nothing is cached for it yet.
  const query = "from=2026-11-01T00:00:00.000Z&to=2026-11-04T23:59:59.000Z";
  await Promise.all([summary(query), trends(query), matrix(query)]);
  await sessionRows(query);
  await matrix(`${query}&rows=models&cols=teams`);
  const sql = prepare.mock.calls.map((call) => String(call.arguments[0]));
  const sliceReads = sql.filter((text) =>
    text.includes("GROUP BY uh.agent_session_id, uh.provider")
  );
  const timeReads = sql.filter((text) => text.includes("LAG(uh.timestamp) OVER w"));
  assert.equal(sliceReads.length, 1, "one slice read");
  assert.equal(timeReads.length, 1, "one session time read");
});

test("the view routes require management auth when login is enabled", async () => {
  process.env.INITIAL_PASSWORD = "reports-views-password";
  try {
    for (const route of ["matrix", "trends", "heatmap"]) {
      const res = await callView(route, CORE);
      assert.ok([401, 403].includes(res.status), `${route}: got ${res.status}`);
    }
  } finally {
    delete process.env.INITIAL_PASSWORD;
  }
});
