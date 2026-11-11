// Team reports, Phase 2: time spent (active, model, wall), latency, TTFT, cache hit rate and cost
// per session in the KPI totals; activeMs, modelMs and mainModel on the sessions list; and the
// paged session detail with its per-request fields and timeline.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agent-reports-time-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
delete process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
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

interface Kpis {
  requests: number;
  sessions: number;
  costUsd: number;
  tokens: { input: number; cacheRead: number; reasoning: number };
  cacheHitRate: number | null;
  avgLatencyMs: number | null;
  p95LatencyMs: number | null;
  avgTtftMs: number | null;
  costPerSession: number | null;
  activeMs: number;
  modelMs: number;
}

interface Row {
  id: string;
  apiKeyId: string | null;
  requests: number;
  costUsd: number;
  activeMs: number;
  modelMs: number;
  mainModel: string | null;
}

interface RequestRow {
  id: number;
  timestamp: string;
  provider: string | null;
  model: string | null;
  connectionId: string | null;
  serviceTier: string;
  status: string | null;
  success: boolean;
  errorCode: string | null;
  latencyMs: number;
  ttftMs: number;
  tokens: { input: number; output: number; reasoning: number; uncachedInput: number };
  costUsd: number;
  priced: boolean;
}

interface Detail {
  session: { id: string; requestCount: number };
  recentRequests: RequestRow[];
  requestsTotal: number;
  totals: Kpis & { wallMs: number; errors: number };
  timeline: {
    points: Array<{ timestamp: string; model: string | null; latencyMs: number; ok: boolean }>;
    capped: boolean;
  };
}

const MINUTE = 60_000;
const TOKENS = { input: 1000, output: 500, cacheRead: 200 };
const WINDOW = "from=2026-10-05T00:00:00.000Z&to=2026-10-05T23:59:59.999Z";

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

function member(apiKeyId: string, clientSessionId: string) {
  return {
    apiKeyId,
    apiKeyName: apiKeyId,
    agentContext: {
      client: "claude-code",
      clientSessionId,
      projectName: "acme",
      projectRepo: null,
      projectPath: "/work/acme",
      projectSource: "header" as const,
      gitBranch: "main",
    },
  };
}

function at(base: string, offsetMs: number): string {
  return new Date(Date.parse(base) + offsetMs).toISOString();
}

function reportRequest(pathAndQuery: string): Request {
  return new Request(`http://localhost:20128${pathAndQuery}`);
}

async function totals(query: string): Promise<Kpis> {
  const res = await getSummary(reportRequest(`/api/reports/summary?${query}`));
  assert.equal(res.status, 200, `summary ?${query}`);
  return ((await res.json()) as { totals: Kpis }).totals;
}

async function sessionList(query: string): Promise<{ sessions: Row[]; total: number }> {
  const res = await getSessions(reportRequest(`/api/reports/sessions?${query}&limit=100`));
  assert.equal(res.status, 200, `sessions ?${query}`);
  return (await res.json()) as { sessions: Row[]; total: number };
}

async function detailResponse(id: string, query = ""): Promise<Response> {
  return getSessionDetail(reportRequest(`/api/reports/sessions/${id}${query}`), {
    params: Promise.resolve({ id }),
  });
}

async function detail(id: string, query = ""): Promise<Detail> {
  const res = await detailResponse(id, query);
  assert.equal(res.status, 200, `detail ${id}${query}`);
  return (await res.json()) as Detail;
}

async function sessionIdOf(apiKeyId: string): Promise<string> {
  const { sessions } = await sessionList(`apiKeyId=${apiKeyId}`);
  assert.equal(sessions.length, 1, `one session for ${apiKeyId}`);
  return sessions[0].id;
}

// Session A: gaps of 5 min (under the cap) and 60 min (over it) on 2026-10-05, then one more
// request the next day, outside WINDOW.
const A = "2026-10-05T10:00:00.000Z";
const A_REQUESTS = [
  { offset: 0, latencyMs: 1000, ttft: 200 },
  { offset: 5 * MINUTE, latencyMs: 2000, ttft: 400 },
  { offset: 65 * MINUTE, latencyMs: 3000, ttft: 600 },
  { offset: 24 * 60 * MINUTE, latencyMs: 4000, ttft: 800 },
];
const BULK_ROWS = 2000;

test.before(async () => {
  await settingsDb.updatePricing({
    openai: {
      "gpt-4o-mini": { input: 1, output: 2, cached: 0.5, cache_creation: 1, reasoning: 2 },
    },
    deepseek: { "deepseek-chat": { input: 0.5, output: 1, cached: 0.1, cache_creation: 0.5 } },
  });

  for (const r of A_REQUESTS) {
    await recordUsage({
      ...member("key-time-a", "time-a"),
      latencyMs: r.latencyMs,
      timeToFirstTokenMs: r.ttft,
      timestamp: at(A, r.offset),
    });
  }

  // Session B: a single in-window request.
  await recordUsage({
    ...member("key-time-b", "time-b"),
    latencyMs: 500,
    timeToFirstTokenMs: 100,
    timestamp: "2026-10-05T12:00:00.000Z",
  });

  // p95: latencies 100..2000 ms, plus one request with no recorded latency (0).
  for (let i = 0; i < 20; i++) {
    await recordUsage({
      ...member("key-time-p95", "time-p95"),
      latencyMs: (i + 1) * 100,
      timestamp: at("2026-10-07T00:00:00.000Z", i * MINUTE),
    });
  }
  await recordUsage({
    ...member("key-time-p95", "time-p95"),
    latencyMs: 0,
    timestamp: "2026-10-07T01:00:00.000Z",
  });

  // A request with no input tokens.
  await recordUsage({
    ...member("key-time-cache", "time-cache"),
    tokens: { input: 0, output: 50 },
    timestamp: "2026-10-07T02:00:00.000Z",
  });

  // Main model ties. E: alpha and zeta tie on requests and (zero, unpriced) cost, so the name
  // decides; gpt-4o-mini costs more but has fewer requests. F: same request counts, the dearer
  // model wins even though its name sorts last.
  const models = [
    ["time-e", "openai", "alpha-model"],
    ["time-e", "openai", "zeta-model"],
    ["time-e", "openai", "zeta-model"],
    ["time-e", "openai", "alpha-model"],
    ["time-e", "openai", "gpt-4o-mini"],
    ["time-f", "deepseek", "deepseek-chat"],
    ["time-f", "openai", "gpt-4o-mini"],
    ["time-f", "deepseek", "deepseek-chat"],
    ["time-f", "openai", "gpt-4o-mini"],
  ];
  for (const [index, [session, provider, model]] of models.entries()) {
    await recordUsage({
      ...member("key-time-models", session),
      provider,
      model,
      timestamp: at("2026-10-07T03:00:00.000Z", index * MINUTE),
    });
  }

  // Detail paging: seven requests one minute apart; the fourth failed, the sixth is priority
  // tier with reasoning tokens.
  for (let i = 0; i < 7; i++) {
    await recordUsage({
      ...member("key-time-detail", "time-detail"),
      latencyMs: 100 * (i + 1),
      timeToFirstTokenMs: 10 * (i + 1),
      tokens: i === 5 ? { ...TOKENS, reasoning: 120 } : TOKENS,
      ...(i === 3 ? { success: false, errorCode: "rate_limited", status: "429" } : {}),
      ...(i === 5 ? { serviceTier: "priority" } : {}),
      timestamp: at("2026-10-08T00:00:00.000Z", i * MINUTE),
    });
  }

  // Timeline cap: one recorded request, then BULK_ROWS more rows of the same session.
  await recordUsage({
    ...member("key-time-bulk", "time-bulk"),
    timestamp: "2026-10-09T00:00:00.000Z",
  });
  const bulkId = await sessionIdOf("key-time-bulk");
  const db = core.getDbInstance();
  const insert = db.prepare(
    `INSERT INTO usage_history (provider, model, connection_id, api_key_id, tokens_input,
       tokens_output, latency_ms, ttft_ms, success, service_tier, agent_session_id, timestamp)
     VALUES ('openai', 'gpt-4o-mini', 'conn-openai-1', 'key-time-bulk', 10, 5, 20, 5, 1,
       'standard', ?, ?)`
  );
  db.transaction(() => {
    for (let i = 1; i <= BULK_ROWS; i++) {
      insert.run(bulkId, at("2026-10-09T00:00:00.000Z", i * 1000));
    }
  })();
});

test("the idle cap is 15 minutes, in one exported constant", async () => {
  const reportStats = await import("../../src/lib/db/agentSessionReportStats.ts");
  assert.equal(reportStats.REPORT_ACTIVE_GAP_CAP_MS, 15 * MINUTE);
  assert.equal(reportStats.REPORT_TIMELINE_MAX_POINTS, 2000);
});

test("active time sums gaps capped at 15 minutes plus the last request's latency", async () => {
  // In window: 5 min (under the cap) + 60 min capped to 15 + the last in-window latency (3 s).
  const inWindow = await totals(`${WINDOW}&apiKeyId=key-time-a`);
  assert.equal(inWindow.requests, 3);
  assert.equal(inWindow.activeMs, 5 * MINUTE + 15 * MINUTE + 3000);
  assert.equal(inWindow.modelMs, 1000 + 2000 + 3000);

  // All-time adds the capped overnight gap; the last request is now the next-day one.
  const allTime = await totals("apiKeyId=key-time-a");
  assert.equal(allTime.activeMs, 5 * MINUTE + 15 * MINUTE + 15 * MINUTE + 4000);
  assert.equal(allTime.modelMs, 10_000);

  // A single request is active for its own latency.
  const single = await totals(`${WINDOW}&apiKeyId=key-time-b`);
  assert.equal(single.activeMs, 500);
  assert.equal(single.modelMs, 500);
});

test("total active and model time equal the sum of the sessions list rows", async () => {
  const query = `${WINDOW}&apiKeyId=key-time-a&apiKeyId=key-time-b`;
  const kpis = await totals(query);
  const { sessions } = await sessionList(query);
  assert.equal(sessions.length, 2);
  const byKey = Object.fromEntries(sessions.map((row) => [row.apiKeyId, row]));
  assert.equal(byKey["key-time-a"].activeMs, 20 * MINUTE + 3000);
  assert.equal(byKey["key-time-a"].modelMs, 6000);
  assert.equal(byKey["key-time-b"].activeMs, 500);
  assert.equal(
    kpis.activeMs,
    sessions.reduce((sum, row) => sum + row.activeMs, 0)
  );
  assert.equal(
    kpis.modelMs,
    sessions.reduce((sum, row) => sum + row.modelMs, 0)
  );
  assert.equal(kpis.costPerSession, Number((kpis.costUsd / 2).toFixed(6)));
});

test("sessions sort by active time", async () => {
  const query = `${WINDOW}&apiKeyId=key-time-a&apiKeyId=key-time-b&sort=activeTime`;
  const asc = await sessionList(`${query}&order=asc`);
  assert.deepEqual(
    asc.sessions.map((row) => row.apiKeyId),
    ["key-time-b", "key-time-a"]
  );
  const desc = await sessionList(`${query}&order=desc`);
  assert.deepEqual(
    desc.sessions.map((row) => row.apiKeyId),
    ["key-time-a", "key-time-b"]
  );
});

test("p95 latency is the nearest-rank value; requests without a latency are left out", async () => {
  const kpis = await totals("apiKeyId=key-time-p95");
  assert.equal(kpis.requests, 21);
  // 20 latencies: rank ceil(0.95 * 20) = 19 -> 1900 ms.
  assert.equal(kpis.p95LatencyMs, 1900);
  assert.equal(kpis.avgLatencyMs, 1050);
  // No TTFT reported: the stored TTFT is the full latency; the zero row is left out.
  assert.equal(kpis.avgTtftMs, 1050);
  assert.equal(kpis.modelMs, 21_000);

  const single = await totals(`${WINDOW}&apiKeyId=key-time-b`);
  assert.equal(single.p95LatencyMs, 500);

  const inWindow = await totals(`${WINDOW}&apiKeyId=key-time-a`);
  assert.equal(inWindow.p95LatencyMs, 3000);
  assert.equal(inWindow.avgLatencyMs, 2000);
  assert.equal(inWindow.avgTtftMs, 400);
});

test("cache hit rate is cache reads over input, null without input", async () => {
  const noInput = await totals("apiKeyId=key-time-cache");
  assert.equal(noInput.requests, 1);
  assert.equal(noInput.tokens.input, 0);
  assert.equal(noInput.cacheHitRate, null);

  const cached = await totals(`${WINDOW}&apiKeyId=key-time-a`);
  assert.equal(cached.cacheHitRate, 0.2);
});

test("an empty window has zero time and null averages", async () => {
  const empty = await totals("from=2030-01-01T00:00:00.000Z");
  assert.equal(empty.requests, 0);
  assert.equal(empty.activeMs, 0);
  assert.equal(empty.modelMs, 0);
  assert.equal(empty.avgLatencyMs, null);
  assert.equal(empty.p95LatencyMs, null);
  assert.equal(empty.avgTtftMs, null);
  assert.equal(empty.cacheHitRate, null);
  assert.equal(empty.costPerSession, null);
});

test("main model is the most-requested model; ties go to cost, then name", async () => {
  const { sessions } = await sessionList("apiKeyId=key-time-models&sort=firstSeen&order=asc");
  assert.equal(sessions.length, 2);
  assert.deepEqual(
    sessions.map((row) => row.mainModel),
    ["alpha-model", "gpt-4o-mini"]
  );
});

test("session detail totals carry active, model and wall time over all its requests", async () => {
  const id = await sessionIdOf("key-time-a");
  const { totals: t } = await detail(id);
  assert.equal(t.requests, 4);
  assert.equal(t.activeMs, 35 * MINUTE + 4000);
  assert.equal(t.modelMs, 10_000);
  assert.equal(t.wallMs, 24 * 60 * MINUTE);
  assert.equal(t.avgLatencyMs, 2500);
  assert.equal(t.p95LatencyMs, 4000);
  assert.equal(t.avgTtftMs, 500);
  assert.equal(t.cacheHitRate, 0.2);
  assert.equal(t.costPerSession, t.costUsd);
});

test("session detail pages through requests newest first with per-request fields", async () => {
  const id = await sessionIdOf("key-time-detail");
  const all = await detail(id);
  assert.equal(all.requestsTotal, 7);
  assert.equal(all.recentRequests.length, 7);
  const timestamps = all.recentRequests.map((r) => r.timestamp);
  assert.deepEqual(timestamps, [...timestamps].sort().reverse());

  const first = await detail(id, "?limit=3");
  const second = await detail(id, "?limit=3&offset=3");
  const last = await detail(id, "?limit=3&offset=6");
  assert.equal(first.requestsTotal, 7);
  assert.deepEqual(
    [...first.recentRequests, ...second.recentRequests, ...last.recentRequests].map((r) => r.id),
    all.recentRequests.map((r) => r.id)
  );
  assert.equal(last.recentRequests.length, 1);
  assert.equal((await detail(id, "?offset=50")).recentRequests.length, 0);

  const failed = all.recentRequests.find((r) => !r.success);
  assert.equal(failed?.errorCode, "rate_limited");
  assert.equal(failed?.latencyMs, 400);
  assert.equal(failed?.ttftMs, 40);
  const priority = all.recentRequests.find((r) => r.serviceTier === "priority");
  assert.equal(priority?.tokens.reasoning, 120);
  assert.equal(priority?.model, "gpt-4o-mini");
  assert.equal(priority?.provider, "openai");
  assert.ok(all.recentRequests.every((r) => r.priced && r.costUsd > 0));
  const pageCost = all.recentRequests.reduce((sum, r) => sum + r.costUsd, 0);
  assert.ok(Math.abs(pageCost - all.totals.costUsd) < 1e-5, "request costs add up to totals");

  assert.equal(all.timeline.capped, false);
  assert.equal(all.timeline.points.length, 7);
  assert.deepEqual(
    all.timeline.points.map((p) => p.timestamp),
    [...timestamps].reverse()
  );
  assert.deepEqual(all.timeline.points[3], {
    timestamp: "2026-10-08T00:03:00.000Z",
    model: "gpt-4o-mini",
    latencyMs: 400,
    ok: false,
  });

  for (const bad of ["limit=0", "limit=201", "limit=abc", "offset=-1"]) {
    const res = await detailResponse(id, `?${bad}`);
    assert.equal(res.status, 400, bad);
  }
  assert.equal((await detail(id, "?limit=200")).recentRequests.length, 7);
});

test("session detail defaults to 50 requests and caps the timeline at 2000 points", async () => {
  const id = await sessionIdOf("key-time-bulk");
  const bulk = await detail(id);
  assert.equal(bulk.requestsTotal, BULK_ROWS + 1);
  assert.equal(bulk.recentRequests.length, 50);
  assert.equal(bulk.timeline.capped, true);
  assert.equal(bulk.timeline.points.length, 2000);
  // The newest points are kept, oldest first; the session's first request is dropped.
  assert.equal(bulk.timeline.points[0].timestamp, "2026-10-09T00:00:01.000Z");
  assert.equal(bulk.timeline.points.at(-1)?.timestamp, at("2026-10-09T00:00:00.000Z", 2_000_000));
});
