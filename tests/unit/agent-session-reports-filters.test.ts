// Team reports, Phase 1 filters: gitBranch, outcome, errorCode, serviceTier, billingTeamId and
// search; repeated query params as IN lists with the "__none__" sentinel; and /api/reports/facets.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import type {
  AgentSessionReport,
  AgentSessionReportRow,
} from "../../src/lib/usage/agentSessionReports.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agent-reports-filters-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
delete process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const teamsDb = await import("../../src/lib/db/teams.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const { searchParamsObject } = await import("../../src/app/api/reports/_lib.ts");
const { GET: getSummary } = await import("../../src/app/api/reports/summary/route.ts");
const { GET: getSessions } = await import("../../src/app/api/reports/sessions/route.ts");
const { GET: getExport } = await import("../../src/app/api/reports/export/route.ts");
const { GET: getFacets } = await import("../../src/app/api/reports/facets/route.ts");

test.after(() => {
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type Report = AgentSessionReport;
type SessionRow = AgentSessionReportRow;
type Tokens = Report["totals"]["tokens"];
interface FacetEntry {
  value: string;
  label: string | null;
  requests: number;
}
type Facets = Record<string, FacetEntry[]>;

const FACET_KEYS = [
  "members",
  "projects",
  "clients",
  "providers",
  "models",
  "accounts",
  "branches",
  "serviceTiers",
  "errorCodes",
  "teams",
];
const TOKENS = { input: 1000, output: 500, cacheRead: 200 };
const BOB_PROJECT = "billing, west";
const BOB_BRANCH = "feat/50%_off";
const DAY2_WINDOW = "from=2026-11-02T00:00:00.000Z&to=2026-11-02T23:59:59.999Z";
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
    projectPath: projectName ? `/work/${projectName.split(",")[0]}` : null,
    projectSource: projectName ? ("header" as const) : null,
    gitBranch,
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
  const res = await getSessions(reportRequest(`/api/reports/sessions?${query}&limit=100`));
  assert.equal(res.status, 200, `sessions ?${query}`);
  return (await res.json()) as { sessions: SessionRow[]; total: number };
}

async function facets(query: string): Promise<Facets> {
  const res = await getFacets(reportRequest(`/api/reports/facets?${query}`));
  assert.equal(res.status, 200, `facets ?${query}`);
  return (await res.json()) as Facets;
}

function facetPairs(entries: FacetEntry[]): Array<[string, number]> {
  return entries.map((entry) => [entry.value, entry.requests]);
}

/** Summary totals for the query, after checking the sessions list adds up to them. */
async function requestsFor(query: string): Promise<number> {
  const report = await summary(query);
  const list = await sessionList(query);
  assert.equal(list.total, report.totals.sessions, `sessions ?${query}`);
  const sum = (pick: (row: SessionRow) => number) =>
    list.sessions.reduce((acc, row) => acc + pick(row), 0);
  assert.equal(
    sum((r) => r.requests),
    report.totals.requests,
    `list requests ?${query}`
  );
  assert.equal(
    sum((r) => r.errors),
    report.totals.errors,
    `list errors ?${query}`
  );
  for (const field of Object.keys(report.totals.tokens) as Array<keyof Tokens>) {
    assert.equal(
      sum((r) => r.tokens[field]),
      report.totals.tokens[field],
      `tokens.${field}`
    );
  }
  return report.totals.requests;
}

function q(params: Array<[string, string]>): string {
  return new URLSearchParams(params).toString();
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

  // Alice: acme on main; one failed request; one priority-tier deepseek request.
  const alice = {
    apiKeyId: "key-alice",
    apiKeyName: "Alice",
    agentContext: agentContext("alice-f", "acme", "main"),
  };
  await recordUsage({ ...alice, timestamp: "2026-11-01T10:00:00.000Z" });
  await recordUsage({
    ...alice,
    success: false,
    errorCode: "rate_limited",
    timestamp: "2026-11-01T11:00:00.000Z",
  });
  await recordUsage({
    ...alice,
    provider: "deepseek",
    model: "deepseek-chat",
    connectionId: "conn-deepseek-1",
    serviceTier: "priority",
    timestamp: "2026-11-03T10:00:00.000Z",
  });

  // Bob: a project name with a comma and a branch with LIKE wildcards.
  const bob = {
    apiKeyId: "key-bob",
    apiKeyName: "Bob",
    agentContext: agentContext("bob-f", BOB_PROJECT, BOB_BRANCH),
  };
  await recordUsage({ ...bob, timestamp: "2026-11-01T12:00:00.000Z" });
  await recordUsage({
    ...bob,
    provider: "deepseek",
    model: "deepseek-chat",
    connectionId: "conn-deepseek-1",
    success: false,
    errorCode: "upstream_error",
    timestamp: "2026-11-02T12:00:00.000Z",
  });

  // Carol: no project and no branch, through codex.
  await recordUsage({
    apiKeyId: "key-carol",
    apiKeyName: "Carol",
    agentContext: agentContext("carol-f", null, null, "codex"),
    timestamp: "2026-11-02T09:00:00.000Z",
  });

  // Dave: a project without a branch, flex tier.
  await recordUsage({
    apiKeyId: "key-dave",
    apiKeyName: "Dave",
    agentContext: agentContext("dave-f", "labs", null),
    serviceTier: "flex",
    timestamp: "2026-11-04T09:00:00.000Z",
  });

  // Billing teams are snapshot per request; the test keys are not real API keys, so set them.
  const db = core.getDbInstance();
  const setTeam = db.prepare("UPDATE usage_history SET billing_team_id = ? WHERE api_key_id = ?");
  setTeam.run(teamIds.platform, "key-alice");
  setTeam.run(teamIds.growth, "key-bob");
});

test("searchParamsObject keeps single values as strings and collects repeated ones", () => {
  const params = (query: string) => searchParamsObject(reportRequest(`/api/reports/x?${query}`));
  assert.deepEqual(params("model=a&from=2026-11-01T00:00:00Z"), {
    model: "a",
    from: "2026-11-01T00:00:00Z",
  });
  assert.deepEqual(params("model=a&model=&model=b"), { model: ["a", "b"] });
  assert.deepEqual(params(q([["projectName", BOB_PROJECT]])), { projectName: BOB_PROJECT });
  assert.deepEqual(params("model="), {});
});

test("gitBranch filters by session branch and accepts __none__", async () => {
  assert.equal(await requestsFor("gitBranch=main"), 3);
  assert.equal(await requestsFor(q([["gitBranch", BOB_BRANCH]])), 2);
  assert.equal(await requestsFor("gitBranch=__none__"), 2, "Carol and Dave have no branch");
  assert.equal(await requestsFor("gitBranch=__none__&gitBranch=main"), 5);
});

test("outcome filters each request by success", async () => {
  const errors = await summary("outcome=error");
  assert.equal(errors.totals.requests, 2);
  assert.equal(errors.totals.errors, 2);
  const successes = await summary("outcome=success");
  assert.equal(successes.totals.requests, 5);
  assert.equal(successes.totals.errors, 0);

  const list = await sessionList("outcome=error");
  assert.deepEqual(list.sessions.map((row) => [row.apiKeyId, row.requests]).sort(), [
    ["key-alice", 1],
    ["key-bob", 1],
  ]);
  const bad = await getSummary(reportRequest("/api/reports/summary?outcome=maybe"));
  assert.equal(bad.status, 400);
});

test("errorCode, serviceTier and billingTeamId filter each request", async () => {
  assert.equal(await requestsFor("errorCode=rate_limited"), 1);
  assert.equal(await requestsFor("errorCode=rate_limited&errorCode=upstream_error"), 2);

  assert.equal(await requestsFor("serviceTier=priority"), 1);
  assert.equal(await requestsFor("serviceTier=standard"), 5, "empty tiers count as standard");
  assert.equal(await requestsFor("serviceTier=flex&serviceTier=priority"), 2);

  assert.equal(await requestsFor(`billingTeamId=${teamIds.platform}`), 3);
  assert.equal(await requestsFor("billingTeamId=__none__"), 2);
  assert.equal(await requestsFor(`billingTeamId=__none__&billingTeamId=${teamIds.growth}`), 4);
});

test("repeated params become IN lists, and __none__ mixes with values", async () => {
  assert.equal(await requestsFor("model=gpt-4o-mini&model=deepseek-chat"), 7);
  assert.equal(await requestsFor("model=deepseek-chat"), 2, "a single value matches exactly");
  assert.equal(await requestsFor("apiKeyId=key-alice&apiKeyId=key-bob"), 5);
  assert.equal(await requestsFor("provider=openai&provider=deepseek"), 7);
  assert.equal(await requestsFor("connectionId=conn-openai-1&connectionId=conn-deepseek-1"), 7);
  assert.equal(await requestsFor("client=codex&client=claude-code"), 7);
  // Repeated params, not comma lists: a project name may contain a comma.
  assert.equal(
    await requestsFor(
      q([
        ["projectName", BOB_PROJECT],
        ["projectName", "acme"],
      ])
    ),
    5
  );
  assert.equal(await requestsFor("projectName=billing"), 0);
  assert.equal(await requestsFor("projectName=__none__&projectName=labs"), 2);
  assert.equal(await requestsFor("apiKeyId=__none__&apiKeyId=key-carol"), 1);

  const tooMany = Array.from({ length: 51 }, (_, i) => `model=m${i}`).join("&");
  const res = await getSummary(reportRequest(`/api/reports/summary?${tooMany}`));
  assert.equal(res.status, 400);
  const tooLong = await getSummary(
    reportRequest(`/api/reports/summary?model=a&model=${"x".repeat(513)}`)
  );
  assert.equal(tooLong.status, 400);
});

test("search matches ids, project and branch case-insensitively, with wildcards literal", async () => {
  assert.equal(await requestsFor("search=ALICE-F"), 3, "client session id, any case");
  assert.equal(await requestsFor("search=work%2Fbilling"), 2, "project path");
  assert.equal(await requestsFor("search=LAB"), 1, "project name");
  // Bob's branch is the only value with a literal % or _ after a %.
  assert.equal(await requestsFor("search=%25"), 2, "a literal % does not match everything");
  assert.equal(await requestsFor("search=%25_"), 2);
  assert.equal(await requestsFor("search=50%25_o"), 2);
  assert.equal(await requestsFor("search=5_%25"), 0, "_ is literal too");
  assert.equal(await requestsFor("search=%5C"), 0, "a backslash is literal");

  const [alice] = (await sessionList("apiKeyId=key-alice")).sessions;
  assert.equal(await requestsFor(`search=${alice.id.slice(3, 15).toUpperCase()}`), 3, "session id");

  const tooLong = await getSummary(reportRequest(`/api/reports/summary?search=${"a".repeat(201)}`));
  assert.equal(tooLong.status, 400);
});

test("export applies the new filters", async () => {
  const res = await getExport(reportRequest("/api/reports/export?type=sessions&outcome=error"));
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("x-report-total"), "2");

  const members = await (
    await getExport(
      reportRequest("/api/reports/export?type=members&gitBranch=main&gitBranch=__none__")
    )
  ).text();
  const keys = members
    .trim()
    .split("\n")
    .slice(1)
    .map((row) => row.split(",")[0])
    .sort();
  assert.deepEqual(keys, ["key-alice", "key-carol", "key-dave"]);
});

test("facets list every dimension with labels, empty values and request counts", async () => {
  const all = await facets("");
  assert.deepEqual(Object.keys(all).sort(), [...FACET_KEYS].sort());

  assert.deepEqual(all.members, [
    { value: "key-alice", label: "Alice", requests: 3 },
    { value: "key-bob", label: "Bob", requests: 2 },
    { value: "key-carol", label: "Carol", requests: 1 },
    { value: "key-dave", label: "Dave", requests: 1 },
  ]);
  assert.deepEqual(all.teams, [
    { value: teamIds.platform, label: "Platform", requests: 3 },
    { value: "", label: null, requests: 2 },
    { value: teamIds.growth, label: "Growth", requests: 2 },
  ]);
  assert.deepEqual(facetPairs(all.branches), [
    ["main", 3],
    ["", 2],
    [BOB_BRANCH, 2],
  ]);
  assert.deepEqual(facetPairs(all.serviceTiers), [
    ["standard", 5],
    ["flex", 1],
    ["priority", 1],
  ]);
  assert.deepEqual(facetPairs(all.errorCodes), [
    ["", 5],
    ["rate_limited", 1],
    ["upstream_error", 1],
  ]);
  // Ties sort by label, then by value when there is no label.
  assert.deepEqual(facetPairs(all.projects), [
    ["acme", 3],
    [BOB_PROJECT, 2],
    ["", 1],
    ["labs", 1],
  ]);
  assert.deepEqual(facetPairs(all.clients), [
    ["claude-code", 6],
    ["codex", 1],
  ]);
  assert.deepEqual(facetPairs(all.models), [
    ["gpt-4o-mini", 5],
    ["deepseek-chat", 2],
  ]);
  assert.deepEqual(
    all.accounts.map((entry) => entry.value),
    ["conn-openai-1", "conn-deepseek-1"]
  );
});

test("facets skip their own dimension's filter but apply every other one", async () => {
  const forAlice = await facets("apiKeyId=key-alice");
  assert.deepEqual(
    facetPairs(forAlice.members),
    [
      ["key-alice", 3],
      ["key-bob", 2],
      ["key-carol", 1],
      ["key-dave", 1],
    ],
    "picking a member keeps the other members on offer"
  );
  assert.deepEqual(facetPairs(forAlice.models), [
    ["gpt-4o-mini", 2],
    ["deepseek-chat", 1],
  ]);
  assert.deepEqual(facetPairs(forAlice.teams), [[teamIds.platform, 3]]);

  const deepseek = await facets("model=deepseek-chat&model=__none__");
  assert.deepEqual(facetPairs(deepseek.models), [
    ["gpt-4o-mini", 5],
    ["deepseek-chat", 2],
  ]);
  assert.deepEqual(facetPairs(deepseek.members), [
    ["key-alice", 1],
    ["key-bob", 1],
  ]);

  const errors = await facets("outcome=error&search=acme");
  assert.deepEqual(facetPairs(errors.errorCodes), [["rate_limited", 1]]);
});

test("facets honor the time window", async () => {
  const day2 = await facets(DAY2_WINDOW);
  assert.deepEqual(facetPairs(day2.members), [
    ["key-bob", 1],
    ["key-carol", 1],
  ]);
  assert.deepEqual(facetPairs(day2.errorCodes), [
    ["", 1],
    ["upstream_error", 1],
  ]);
  assert.deepEqual(facetPairs(day2.serviceTiers), [["standard", 2]]);

  const bad = await getFacets(reportRequest("/api/reports/facets?from=yesterday"));
  assert.equal(bad.status, 400);
});

test("facets require management auth when login is enabled", async () => {
  process.env.INITIAL_PASSWORD = "reports-facets-password";
  try {
    const res = await getFacets(reportRequest("/api/reports/facets"));
    assert.ok([401, 403].includes(res.status), `expected auth rejection, got ${res.status}`);
  } finally {
    delete process.env.INITIAL_PASSWORD;
  }
});
