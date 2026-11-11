// Team reports export (/api/reports/export): CSV and JSON for every breakdown, the sessions list,
// the matrix and one session's requests, following the filters and sort, with truncation headers,
// date-stamped file names and the spreadsheet formula guard.
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

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agent-reports-export-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
delete process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const { REPORT_BREAKDOWN_DIMENSIONS, buildAgentSessionReport } =
  await import("../../src/lib/usage/agentSessionReports.ts");
const { buildReportExport, reportExportFileName } =
  await import("../../src/lib/usage/agentSessionReportExport.ts");
const { GET: getSummary } = await import("../../src/app/api/reports/summary/route.ts");
const { GET: getSessions } = await import("../../src/app/api/reports/sessions/route.ts");
const { GET: getSessionDetail } = await import("../../src/app/api/reports/sessions/[id]/route.ts");
const { GET: getMatrix } = await import("../../src/app/api/reports/matrix/route.ts");
const { GET: getExport } = await import("../../src/app/api/reports/export/route.ts");

test.after(() => {
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

interface ExportJson<Row> {
  type: string;
  generatedAt: string;
  filters: Record<string, unknown>;
  total: number;
  truncated: boolean;
  rows: Row[];
}

const TOKENS = { input: 1000, output: 500, cacheRead: 200 };
const DAY = "2026-10-05";
const CORE_FILTER = { from: `${DAY}T00:00:00.000Z`, to: `${DAY}T23:59:59.999Z` };
const CORE = `from=${CORE_FILTER.from}&to=${CORE_FILTER.to}`;
// Wide fixture: 27 projects with one request each, more than the matrix caps on both axes.
const WIDE_FILTER = { from: "2026-08-01T00:00:00.000Z", to: "2026-08-01T23:59:59.999Z" };
const WIDE = `from=${WIDE_FILTER.from}&to=${WIDE_FILTER.to}`;
const WIDE_PROJECTS = 27;
const EVIL_PROJECT = '=HYPERLINK("http://evil","x"),y';
const EVIL_MODEL = "+SUM(1)";
const TS = {
  bob1: `${DAY}T09:00:00.000Z`,
  bob2: `${DAY}T09:01:00.000Z`,
  bob3: `${DAY}T09:03:00.000Z`,
  alice1: `${DAY}T10:00:00.000Z`,
  alice2: `${DAY}T10:02:00.000Z`,
  mallory: `${DAY}T11:00:00.000Z`,
};

const SESSION_COLUMNS = [
  "session_id",
  "api_key_id",
  "api_key_name",
  "client",
  "project_name",
  "project_repo",
  "project_path",
  "git_branch",
  "requests",
  "errors",
  "tokens_total",
  "cost_usd",
  "unpriced_requests",
  "window_first_seen_at",
  "window_last_seen_at",
  "first_seen_at",
  "last_seen_at",
  "active_time_ms",
  "model_time_ms",
  "main_model",
  "tokens_reasoning",
];

const SESSION_REQUEST_COLUMNS = [
  "request_id",
  "timestamp",
  "provider",
  "model",
  "connection_id",
  "service_tier",
  "status",
  "success",
  "error_code",
  "latency_ms",
  "ttft_ms",
  "tokens_input",
  "tokens_output",
  "tokens_cache_read",
  "tokens_cache_creation",
  "tokens_reasoning",
  "tokens_uncached_input",
  "cost_usd",
  "priced",
];

async function recordUsage(entry: Record<string, unknown>) {
  await usageHistory.saveRequestUsage({
    provider: "openai",
    model: "gpt-4o-mini",
    connectionId: "conn-openai-1",
    tokens: TOKENS,
    success: true,
    latencyMs: 1000,
    ...entry,
  });
}

function agentContext(clientSessionId: string, projectName: string, gitBranch = "main") {
  return {
    client: "claude-code",
    clientSessionId,
    projectName,
    projectRepo: null,
    projectPath: `/work/${clientSessionId}`,
    projectSource: "header" as const,
    gitBranch,
  };
}

function reportRequest(pathAndQuery: string): Request {
  return new Request(`http://localhost:20128${pathAndQuery}`);
}

function exportResponse(query: string): Promise<Response> {
  return getExport(reportRequest(`/api/reports/export?${query}`));
}

async function exportOk(query: string): Promise<Response> {
  const res = await exportResponse(query);
  assert.equal(res.status, 200, `export ?${query}: ${res.status}`);
  return res;
}

async function exportJson<Row>(query: string): Promise<ExportJson<Row>> {
  const res = await exportOk(`${query}&format=json`);
  assert.match(res.headers.get("content-type") ?? "", /^application\/json/);
  return (await res.json()) as ExportJson<Row>;
}

async function exportCsv(query: string): Promise<string[][]> {
  const res = await exportOk(query);
  assert.match(res.headers.get("content-type") ?? "", /^text\/csv/);
  return parseCsv(await res.text());
}

async function getJson<T>(response: Promise<Response>): Promise<T> {
  const res = await response;
  assert.equal(res.status, 200);
  return (await res.json()) as T;
}

function summary(query: string): Promise<AgentSessionReport> {
  return getJson(getSummary(reportRequest(`/api/reports/summary?${query}`)));
}

async function sessionRows(query: string): Promise<AgentSessionReportRow[]> {
  const res = getSessions(reportRequest(`/api/reports/sessions?${query}&limit=100`));
  return (await getJson<{ sessions: AgentSessionReportRow[] }>(res)).sessions;
}

async function sessionIdOf(apiKeyId: string): Promise<string> {
  const [row] = await sessionRows(`apiKeyId=${apiKeyId}`);
  assert.ok(row, `session of ${apiKeyId}`);
  return row.id;
}

function sessionDetail(id: string): Promise<AgentSessionReportDetail> {
  return getJson(
    getSessionDetail(reportRequest(`/api/reports/sessions/${id}?limit=200`), {
      params: Promise.resolve({ id }),
    })
  );
}

/** RFC 4180 rows: quoted cells may hold commas, quotes ("") and newlines. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch !== '"') cell += ch;
      else if (text[i + 1] === '"') {
        cell += '"';
        i++;
      } else quoted = false;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += ch;
  }
  row.push(cell);
  rows.push(row);
  return rows;
}

function column(rows: string[][], name: string): string[] {
  const index = rows[0].indexOf(name);
  assert.ok(index >= 0, `missing CSV column ${name}`);
  return rows.slice(1).map((row) => row[index]);
}

function assertClose(actual: number, expected: number, message?: string) {
  assert.ok(Math.abs(actual - expected) < 1e-5, `${message ?? ""} ${actual} != ${expected}`);
}

function utcDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function wideProject(i: number): string {
  return `p${String(i).padStart(2, "0")}`;
}

test.before(async () => {
  await settingsDb.updatePricing({
    openai: {
      "gpt-4o-mini": { input: 1, output: 2, cached: 0.5, cache_creation: 1, reasoning: 2 },
    },
    deepseek: { "deepseek-chat": { input: 0.5, output: 1, cached: 0.1, cache_creation: 0.5 } },
  });

  // Bob: three requests, one with reasoning, one failure, one on deepseek.
  const bob = {
    apiKeyId: "key-bob",
    apiKeyName: "Bob",
    agentContext: agentContext("bob-1", "billing", "feature/x"),
  };
  await recordUsage({
    ...bob,
    tokens: { ...TOKENS, reasoning: 100 },
    latencyMs: 2000,
    timeToFirstTokenMs: 300,
    status: "200",
    timestamp: TS.bob1,
  });
  await recordUsage({
    ...bob,
    success: false,
    errorCode: "rate_limited",
    status: "429",
    tokens: { input: 0, output: 0 },
    latencyMs: 50,
    timestamp: TS.bob2,
  });
  await recordUsage({
    ...bob,
    provider: "deepseek",
    model: "deepseek-chat",
    connectionId: "conn-deepseek-1",
    timestamp: TS.bob3,
  });

  const alice = {
    apiKeyId: "key-alice",
    apiKeyName: "Alice",
    agentContext: agentContext("alice-1", "acme"),
  };
  await recordUsage({ ...alice, timeToFirstTokenMs: 200, timestamp: TS.alice1 });
  await recordUsage({ ...alice, timestamp: TS.alice2 });

  // Mallory: client-supplied names that a spreadsheet would run as formulas.
  await recordUsage({
    apiKeyId: "key-mallory",
    apiKeyName: "@Mallory",
    agentContext: agentContext("mallory-1", EVIL_PROJECT),
    model: EVIL_MODEL,
    timestamp: TS.mallory,
  });

  // Wide: project i costs (i + 1) * 1000 input and 100 output tokens; odd i is Wide A.
  for (let i = 1; i <= WIDE_PROJECTS; i++) {
    await recordUsage({
      apiKeyId: i % 2 ? "key-wide-a" : "key-wide-b",
      apiKeyName: i % 2 ? "Wide A" : "Wide B",
      agentContext: agentContext(`wide-${i}`, wideProject(i)),
      tokens: { input: (i + 1) * 1000, output: 100 },
      timestamp: `2026-08-01T10:${String(i).padStart(2, "0")}:00.000Z`,
    });
  }
});

test("JSON export of every breakdown is the summary's rows with the filter echo", async () => {
  const query = `${CORE}&apiKeyId=key-alice&apiKeyId=key-bob`;
  const report = await summary(query);
  for (const type of REPORT_BREAKDOWN_DIMENSIONS) {
    const res = await exportOk(`type=${type}&format=json&${query}`);
    assert.equal(res.headers.get("x-report-total"), String(report.breakdowns[type].length), type);
    assert.equal(res.headers.get("x-report-truncated"), "false", type);
    const body = (await res.json()) as ExportJson<unknown>;
    assert.deepEqual(Object.keys(body), [
      "type",
      "generatedAt",
      "filters",
      "total",
      "truncated",
      "rows",
    ]);
    assert.equal(body.type, type);
    assert.ok(Number.isFinite(Date.parse(body.generatedAt)), body.generatedAt);
    assert.deepEqual(body.filters, { ...CORE_FILTER, apiKeyId: ["key-alice", "key-bob"] });
    assert.equal(body.total, report.breakdowns[type].length, type);
    assert.equal(body.truncated, false);
    assert.deepEqual(body.rows, report.breakdowns[type], type);
  }
  const members = await exportJson<{ key: string; requests: number; costUsd: number }>(
    `type=members&${query}`
  );
  assert.equal(typeof members.rows[0].requests, "number", "numbers stay numbers");
  assert.equal(typeof members.rows[0].costUsd, "number");
});

test("breakdown CSV keeps its columns and sets the total and truncation headers", async () => {
  const res = await exportOk(`type=models&${CORE}`);
  assert.equal(res.headers.get("x-report-truncated"), "false");
  const rows = parseCsv(await res.text());
  assert.deepEqual(rows[0], [
    "key",
    "label",
    "detail",
    "sessions",
    "members",
    "projects",
    "requests",
    "errors",
    "tokens_input",
    "tokens_output",
    "tokens_cache_read",
    "tokens_cache_creation",
    "tokens_reasoning",
    "tokens_total",
    "cost_usd",
    "unpriced_requests",
    "last_seen_at",
  ]);
  assert.equal(res.headers.get("x-report-total"), String(rows.length - 1));
  assert.deepEqual(
    column(rows, "key").sort(),
    [`'${EVIL_MODEL}`, "deepseek-chat", "gpt-4o-mini"].sort()
  );
});

test("a breakdown export reads the cached scan without the summary's time queries", async () => {
  const db = core.getDbInstance();
  const prepared: string[] = [];
  // A distinct handle for the report caches, so this test starts from a fresh scan.
  const recording = new Proxy(db, {
    get(target, prop) {
      if (prop === "prepare") {
        return (sql: string) => {
          prepared.push(sql);
          return target.prepare(sql);
        };
      }
      const value = Reflect.get(target, prop, target);
      return typeof value === "function" ? value.bind(target) : value;
    },
  });
  // Per-session time uses LAG over each session; the latency percentile skips by a COUNT.
  const timeQueries = () => prepared.filter((sql) => /LAG\(|OFFSET \(SELECT COUNT/.test(sql));

  const file = await buildReportExport(
    { type: "models", format: "json", filter: CORE_FILTER },
    { db: recording }
  );
  assert.ok(prepared.length > 0);
  assert.deepEqual(timeQueries(), []);
  const scans = prepared.length;

  // The summary of the same filter reuses the scan and its breakdowns, and adds the time queries.
  const report = await buildAgentSessionReport(CORE_FILTER, recording);
  assert.equal(timeQueries().length, 2);
  assert.ok(
    prepared.slice(scans).every((sql) => /LAG\(|OFFSET \(SELECT COUNT|MAX\(id\)/i.test(sql)),
    "no second read of the window"
  );
  assert.deepEqual(JSON.parse(file.body).rows, report.breakdowns.models);
});

test("sessions JSON rows are the sessions list rows in the requested order", async () => {
  const order = "sort=requests&order=desc";
  const listed = await sessionRows(`${CORE}&${order}`);
  const body = await exportJson<AgentSessionReportRow>(`type=sessions&${CORE}&${order}`);
  assert.equal(body.type, "sessions");
  assert.equal(body.total, 3);
  assert.equal(body.truncated, false);
  assert.deepEqual(body.filters, CORE_FILTER);
  assert.deepEqual(body.rows, listed);
  assert.deepEqual(
    body.rows.map((row) => row.apiKeyId),
    ["key-bob", "key-alice", "key-mallory"]
  );
});

test("sessions CSV keeps its columns and appends time, main model and reasoning", async () => {
  const [bob] = await sessionRows(`${CORE}&apiKeyId=key-bob`);
  const res = await exportOk(`type=sessions&${CORE}&sort=requests&order=desc`);
  assert.equal(res.headers.get("x-report-total"), "3");
  assert.equal(res.headers.get("x-report-truncated"), "false");
  const rows = parseCsv(await res.text());
  assert.deepEqual(rows[0], SESSION_COLUMNS);
  assert.deepEqual(column(rows, "api_key_id"), ["key-bob", "key-alice", "key-mallory"]);

  const [bobLine] = rows.slice(1);
  const value = (name: string) => bobLine[rows[0].indexOf(name)];
  assert.equal(value("session_id"), bob.id);
  assert.equal(value("errors"), "1");
  assert.equal(value("active_time_ms"), String(bob.activeMs));
  assert.equal(value("model_time_ms"), String(bob.modelMs));
  assert.equal(bob.modelMs, 2000 + 50 + 1000);
  assert.equal(value("main_model"), "gpt-4o-mini");
  assert.equal(value("tokens_reasoning"), "100");
  assert.ok(bob.activeMs > 0);
});

test("matrix CSV has a line per row, a column per column, totals and a marked other", async () => {
  const query = `rows=projects&cols=members&${WIDE}`;
  const matrix = await getJson<{
    rows: Array<{ key: string; requests: number; other: boolean }>;
    cols: Array<{ key: string; label: string | null; requests: number }>;
    cells: Array<Array<{ requests: number }>>;
  }>(getMatrix(reportRequest(`/api/reports/matrix?${query}`)));

  const res = await exportOk(`type=matrix&${query}&metric=requests`);
  assert.equal(res.headers.get("x-report-total"), String(WIDE_PROJECTS));
  assert.equal(res.headers.get("x-report-truncated"), "true");
  const rows = parseCsv(await res.text());
  const colNames = matrix.cols.map((col) => col.label);
  assert.deepEqual(rows[0], ["projects \\ members (requests)", "key", ...colNames, "total"]);
  // 25 kept projects, the other bucket, then the totals line.
  assert.equal(rows.length, 1 + 26 + 1);

  matrix.rows.forEach((header, i) => {
    const line = rows[i + 1];
    assert.equal(line[1], header.key);
    assert.equal(line[0], header.other ? "Other (2 more)" : header.key);
    assert.deepEqual(
      line.slice(2, -1).map(Number),
      matrix.cells[i].map((cell) => cell.requests)
    );
    assert.equal(Number(line.at(-1)), header.requests);
  });
  const other = rows[26];
  assert.deepEqual(other.slice(0, 2), ["Other (2 more)", "__other__"]);
  assert.equal(other.at(-1), "2");
  const totals = rows.at(-1) ?? [];
  assert.deepEqual(totals.slice(0, 2), ["Total", ""]);
  assert.deepEqual(
    totals.slice(2, -1).map(Number),
    matrix.cols.map((col) => col.requests)
  );
  assert.equal(totals.at(-1), String(WIDE_PROJECTS));
});

test("matrix CSV defaults to cost and marks the column other bucket", async () => {
  const rows = await exportCsv(`type=matrix&rows=members&cols=projects&${WIDE}`);
  const kept = Array.from({ length: 15 }, (_, i) => wideProject(WIDE_PROJECTS - i));
  assert.deepEqual(rows[0], [
    "members \\ projects (costUsd)",
    "key",
    ...kept,
    "Other (12 more)",
    "total",
  ]);
  assert.deepEqual(
    rows.slice(1).map((line) => line[0]),
    ["Wide A", "Wide B", "Total"]
  );
  let expected = 0;
  for (let i = 1; i <= WIDE_PROJECTS; i++) expected += ((i + 1) * 1000 + 100 * 2) / 1_000_000;
  const totals = rows.at(-1) ?? [];
  assertClose(Number(totals.at(-1)), expected, "grand total");
  for (const line of rows.slice(1)) {
    const cells = line.slice(2, -1).map(Number);
    assertClose(
      cells.reduce((acc, value) => acc + value, 0),
      Number(line.at(-1)),
      line[0]
    );
  }
});

test("matrix CSV leaves activeMs empty where an entry splits sessions", async () => {
  const rows = await exportCsv(`type=matrix&rows=members&cols=models&metric=activeMs&${CORE}`);
  assert.equal(rows[0][0], "members \\ models (activeMs)");
  for (const line of rows.slice(1, -1)) {
    assert.ok(
      line.slice(2, -1).every((value) => value === ""),
      `models split sessions: ${line[0]}`
    );
    assert.match(line.at(-1) ?? "", /^\d+$/, "members cover whole sessions");
  }
  const totals = rows.at(-1) ?? [];
  assert.ok(totals.slice(2, -1).every((value) => value === ""));
  assert.match(totals.at(-1) ?? "", /^[1-9]\d*$/);
});

test("matrix JSON is the matrix response in the export envelope", async () => {
  const query = `rows=projects&cols=members&${WIDE}`;
  const matrix = await getJson<Record<string, unknown>>(
    getMatrix(reportRequest(`/api/reports/matrix?${query}`))
  );
  const res = await exportOk(`type=matrix&format=json&${query}`);
  assert.equal(res.headers.get("x-report-total"), String(WIDE_PROJECTS));
  assert.equal(res.headers.get("x-report-truncated"), "true");
  const body = (await res.json()) as Record<string, unknown>;
  assert.ok(Number.isFinite(Date.parse(String(body.generatedAt))));
  assert.deepEqual(body, {
    type: "matrix",
    generatedAt: body.generatedAt,
    filters: WIDE_FILTER,
    total: WIDE_PROJECTS,
    ...matrix,
  });
  assert.equal(body.truncated, true);
});

test("sessionRequests exports every request of the session, newest first", async () => {
  const id = await sessionIdOf("key-bob");
  const detail = await sessionDetail(id);

  const res = await exportOk(`type=sessionRequests&sessionId=${id}`);
  assert.equal(res.headers.get("x-report-total"), "3");
  assert.equal(res.headers.get("x-report-truncated"), "false");
  const rows = parseCsv(await res.text());
  assert.deepEqual(rows[0], SESSION_REQUEST_COLUMNS);
  assert.deepEqual(column(rows, "timestamp"), [TS.bob3, TS.bob2, TS.bob1]);
  assert.deepEqual(column(rows, "success"), ["true", "false", "true"]);
  assert.deepEqual(column(rows, "error_code"), ["", "rate_limited", ""]);
  assert.deepEqual(column(rows, "provider"), ["deepseek", "openai", "openai"]);
  assert.deepEqual(column(rows, "tokens_reasoning"), ["0", "0", "100"]);
  assert.deepEqual(
    column(rows, "request_id"),
    detail.recentRequests.map((request) => String(request.id))
  );
  assert.deepEqual(
    column(rows, "cost_usd"),
    detail.recentRequests.map((request) => String(request.costUsd))
  );
  assert.deepEqual(
    column(rows, "ttft_ms"),
    detail.recentRequests.map((request) => String(request.ttftMs))
  );

  const body = await exportJson(`type=sessionRequests&sessionId=${id}`);
  assert.equal(body.type, "sessionRequests");
  assert.deepEqual(body.filters, { sessionId: id });
  assert.equal(body.total, 3);
  assert.equal(body.truncated, false);
  assert.deepEqual(body.rows, detail.recentRequests);

  // Like the session detail, the export covers the whole session: window filters do not apply.
  const windowed = await exportJson(
    `type=sessionRequests&sessionId=${id}&from=2030-01-01T00:00:00.000Z&apiKeyId=key-alice`
  );
  assert.equal(windowed.rows.length, 3);
  assert.deepEqual(windowed.filters, { sessionId: id });
});

test("sessionRequests needs a sessionId and answers 404 for an unknown one", async () => {
  const missing = await exportResponse("type=sessionRequests");
  assert.equal(missing.status, 400);
  const missingBody = (await missing.json()) as { error: { message: string } };
  assert.equal(missingBody.error.message, "Invalid query parameters");

  for (const format of ["csv", "json"]) {
    const unknown = await exportResponse(`type=sessionRequests&sessionId=no-such&format=${format}`);
    assert.equal(unknown.status, 404, format);
    const body = (await unknown.json()) as { error: { message: string } };
    assert.equal(body.error.message, "Session not found");
  }
});

test("capped exports report the total and truncation in both formats", async () => {
  const bobId = await sessionIdOf("key-bob");
  const cases = [
    { query: { type: "sessions" as const, filter: CORE_FILTER }, maxRows: 1, total: 3 },
    {
      query: { type: "sessionRequests" as const, filter: {}, sessionId: bobId },
      maxRows: 2,
      total: 3,
    },
  ];
  for (const { query, maxRows, total } of cases) {
    const csv = await buildReportExport({ ...query, format: "csv" }, { maxRows });
    assert.equal(csv.headers["X-Report-Total"], String(total), query.type);
    assert.equal(csv.headers["X-Report-Truncated"], "true", query.type);
    assert.equal(parseCsv(csv.body).length, 1 + maxRows, query.type);

    const json = await buildReportExport({ ...query, format: "json" }, { maxRows });
    assert.equal(json.headers["X-Report-Total"], String(total), query.type);
    assert.equal(json.headers["X-Report-Truncated"], "true", query.type);
    const body = JSON.parse(json.body) as ExportJson<unknown>;
    assert.equal(body.total, total);
    assert.equal(body.truncated, true);
    assert.equal(body.rows.length, maxRows);
  }
});

test("every CSV export neutralizes formulas; JSON keeps the raw values", async () => {
  const malloryId = await sessionIdOf("key-mallory");
  const csvs = await Promise.all(
    [
      `type=projects&${CORE}`,
      `type=members&${CORE}`,
      `type=models&${CORE}`,
      `type=sessions&${CORE}`,
      `type=matrix&rows=members&cols=projects&${CORE}`,
      `type=matrix&rows=projects&cols=models&${CORE}`,
      `type=sessionRequests&sessionId=${malloryId}`,
    ].map(async (query) => [query, await exportCsv(query)] as const)
  );
  for (const [query, rows] of csvs) {
    const cells = rows.flat();
    assert.ok(
      !cells.some((cell) => /^[=+\-@\t\r]/.test(cell) && !/^-?\d/.test(cell)),
      `no cell starts a formula: ${query}`
    );
  }
  const cellsOf = (index: number) => csvs[index][1].flat();
  assert.ok(cellsOf(0).includes(`'${EVIL_PROJECT}`));
  assert.ok(cellsOf(1).includes("'@Mallory"));
  assert.ok(cellsOf(2).includes(`'${EVIL_MODEL}`));
  assert.ok(cellsOf(3).includes("'@Mallory"));
  assert.ok(cellsOf(4).includes(`'${EVIL_PROJECT}`), "column header");
  assert.ok(cellsOf(4).includes("'@Mallory"), "row header");
  assert.ok(cellsOf(5).includes(`'${EVIL_MODEL}`), "column header");
  assert.ok(cellsOf(6).includes(`'${EVIL_MODEL}`));

  const projects = await exportJson<{ key: string }>(`type=projects&${CORE}`);
  assert.ok(projects.rows.some((row) => row.key === EVIL_PROJECT));
});

test("file names are omniroute-report-<type>-<UTC date>.<format>", async () => {
  const before = utcDay(new Date());
  const names: string[] = [];
  const bobId = await sessionIdOf("key-bob");
  for (const query of [
    "type=errorCodes",
    "type=sessions&format=json",
    "type=matrix",
    `type=sessionRequests&sessionId=${bobId}&format=json`,
  ]) {
    names.push((await exportOk(query)).headers.get("content-disposition") ?? "");
  }
  const after = utcDay(new Date());
  const expected = (day: string) => [
    `attachment; filename="omniroute-report-errorCodes-${day}.csv"`,
    `attachment; filename="omniroute-report-sessions-${day}.json"`,
    `attachment; filename="omniroute-report-matrix-${day}.csv"`,
    `attachment; filename="omniroute-report-sessionRequests-${day}.json"`,
  ];
  assert.ok(
    [before, after].some((day) => JSON.stringify(names) === JSON.stringify(expected(day))),
    names.join("\n")
  );

  // The day is the UTC one: 23:30 at UTC-5 is already the next day.
  const now = new Date("2026-11-11T23:30:00-05:00");
  assert.equal(
    reportExportFileName("teams", "json", now),
    "omniroute-report-teams-2026-11-12.json"
  );
  const file = await buildReportExport({ type: "teams", format: "csv", filter: {} }, { now });
  assert.equal(
    file.headers["Content-Disposition"],
    'attachment; filename="omniroute-report-teams-2026-11-12.csv"'
  );
  const json = await buildReportExport({ type: "teams", format: "json", filter: {} }, { now });
  assert.equal(JSON.parse(json.body).generatedAt, now.toISOString());
});

test("export rejects invalid and misplaced parameters with a fixed 400", async () => {
  for (const query of [
    "type=members&format=xml",
    "type=matrix&metric=bogus",
    "type=members&metric=requests",
    "type=sessions&rows=members",
    "type=members&cols=projects",
    "type=matrix&rows=accounts",
    "type=matrix&rows=models&cols=models",
    "type=matrix&cols=members",
    "type=members&sessionId=abc",
    "type=sessions&sessionId=abc",
    "type=sessionRequests",
    "type=sessionRequests&sessionId=abc&rows=members",
    `type=matrix&from=${CORE_FILTER.to}&to=${CORE_FILTER.from}`,
  ]) {
    const res = await exportResponse(query);
    assert.equal(res.status, 400, query);
    const body = (await res.json()) as { error: { message: string } };
    assert.equal(body.error.message, "Invalid query parameters", query);
    assert.ok(!JSON.stringify(body).includes("at /"), "no stack trace");
  }
  // Defaults: CSV, members x projects, cost.
  const rows = await exportCsv("type=matrix");
  assert.equal(rows[0][0], "members \\ projects (costUsd)");
});

test("the export requires management auth for every type and format", async () => {
  process.env.INITIAL_PASSWORD = "reports-export-test-password";
  try {
    for (const query of [
      "type=members&format=json",
      "type=matrix",
      "type=sessionRequests&sessionId=abc",
    ]) {
      const res = await exportResponse(query);
      assert.ok([401, 403].includes(res.status), `${query}: ${res.status}`);
    }
  } finally {
    delete process.env.INITIAL_PASSWORD;
  }
});
