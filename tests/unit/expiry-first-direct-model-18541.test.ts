/**
 * #18541: `expiry-first` on a direct model request (no combo) never picked the
 * opencode-go account whose monthly quota resets soonest.
 *
 * Three gaps. The first two are in the quota view the direct path ranks on
 * (src/sse/services/expiryFirstAccountSelection.ts, with the burn metrics in
 * expiryFirstMetrics.ts reading the same aliased window names). The third is
 * in the scorer (open-sse/services/combo/quotaScoring.ts).
 *
 * 1. A quota cache miss scored the account 0. opencode-go connections use API
 *    keys, and the background refresh evicts non-OAuth entries every few
 *    minutes. The request path only re-hydrates them from `quota_snapshots` for
 *    accounts without the #14359 healthy override, so an account that served a
 *    request recently stayed invisible to the ranking.
 * 2. opencode-go stores its $60/month window as `mcp_monthly` (it shares GLM's
 *    Monthly column on the usage page). The scorer only knows `monthly`, so the
 *    monthly reset never counted as a deadline. For GLM `mcp_monthly` is the MCP
 *    tool allowance, not a token budget, so it must stay out of the ranking.
 * 3. The metric-aware scorer (#16352), which every direct request now uses,
 *    treated each 5h session reset as a deadline of its own. The fullest
 *    account's session always rolls over within hours, so it outranked a
 *    monthly window about to expire. Session windows are a cap again whenever
 *    a longer window reports a reset, as in the legacy score and #16586.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-expiry-first-18541-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const coreDb = await import("../../src/lib/db/core.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");
const { getExpiryFirstQuotaMetrics } = await import("../../src/sse/services/expiryFirstMetrics.ts");
const { buildConnectionQuotaWindowsView, pickExpiryFirstConnection, selectExpiryFirstConnection } =
  await import("../../src/sse/services/expiryFirstAccountSelection.ts");

const HOUR = 60 * 60 * 1000;
const inHours = (hours: number) => new Date(Date.now() + hours * HOUR).toISOString();

test.after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test.beforeEach(() => {
  quotaCache.__clearForTests();
});

function opencodeGoQuotas(monthlyRemaining: number, monthlyResetHours: number) {
  return {
    session: { remainingPercentage: 100, resetAt: inHours(3) },
    weekly: { remainingPercentage: 70, resetAt: inHours(100) },
    mcp_monthly: { remainingPercentage: monthlyRemaining, resetAt: inHours(monthlyResetHours) },
  };
}

// The reporter's pool: monthly windows at 81% / 28d, 64% / 11d, 33% / 2.5h, 1% / 16d.
const POOL = [
  { id: "oc-28d-18541", priority: 1, monthly: [81, 28 * 24] },
  { id: "oc-11d-18541", priority: 2, monthly: [64, 11 * 24] },
  { id: "oc-2h-18541", priority: 3, monthly: [33, 2.5] },
  { id: "oc-16d-18541", priority: 4, monthly: [1, 16 * 24] },
] as const;

// auth.ts passes this scope on every direct request, which also switches the
// scorer to its metric-aware form.
const DIRECT_SCOPE = { provider: "opencode-go", requestedModel: "glm-5.1" };

test("#18541 the opencode-go monthly window decides the expiry-first winner", () => {
  for (const account of POOL) {
    quotaCache.setQuotaCache(
      account.id,
      "opencode-go",
      opencodeGoQuotas(account.monthly[0], account.monthly[1])
    );
  }
  const winner = pickExpiryFirstConnection(
    POOL.map(({ id, priority }) => ({ id, priority })),
    null,
    DIRECT_SCOPE
  );
  assert.equal(winner.id, "oc-2h-18541", "33% left with 2.5h to the monthly reset must win");
});

test("#18541 a quota cache miss reads the persisted quota_snapshots rows", () => {
  for (const account of POOL) {
    quotaCache.setQuotaCache(
      account.id,
      "opencode-go",
      opencodeGoQuotas(account.monthly[0], account.monthly[1])
    );
  }
  // Simulate the background refresh evicting the API-key entries, then a
  // request where every account carries the healthy override, so
  // isQuotaExhaustedForRequest returns before it hydrates anything.
  quotaCache.__clearForTests();
  for (const account of POOL) {
    quotaCache.markQuotaHealthy(account.id);
    assert.equal(quotaCache.isQuotaExhaustedForRequest(account.id, "opencode-go"), false);
  }
  assert.equal(quotaCache.getQuotaCache("oc-2h-18541"), null, "precondition: cache miss");

  const view = buildConnectionQuotaWindowsView("oc-2h-18541");
  assert.ok(view, "persisted snapshots must produce a quota view");
  const winner = pickExpiryFirstConnection(
    POOL.map(({ id, priority }) => ({ id, priority })),
    null,
    DIRECT_SCOPE
  );
  assert.equal(winner.id, "oc-2h-18541");
});

test("#18541 a connection with neither cache nor snapshots still reports no telemetry", () => {
  assert.equal(buildConnectionQuotaWindowsView("conn-without-quota-18541"), null);
});

const GLM_QUOTAS = {
  session: { remainingPercentage: 90, resetAt: inHours(4) },
  weekly: { remainingPercentage: 90, resetAt: inHours(100) },
  mcp_monthly: { remainingPercentage: 40, resetAt: inHours(2) },
};
const windowKeys = (connectionId: string, scope?: { provider: string; requestedModel: string }) => {
  const view = buildConnectionQuotaWindowsView(connectionId, scope) as { windows: object } | null;
  assert.ok(view, `${connectionId} must have a quota view`);
  return Object.keys(view.windows).sort();
};

test("#18541 GLM's mcp_monthly (MCP tool allowance) is not read as a monthly deadline", () => {
  quotaCache.setQuotaCache("glm-18541", "glm", GLM_QUOTAS);
  assert.deepEqual(windowKeys("glm-18541"), ["mcp_monthly", "session", "weekly"]);
});

test("#18541 a hydrated entry keeps its persisted provider, so GLM stays unaliased", () => {
  quotaCache.setQuotaCache("glm-hydrated-18541", "glm", GLM_QUOTAS);
  quotaCache.__clearForTests();
  assert.equal(quotaCache.getQuotaCache("glm-hydrated-18541"), null, "precondition: cache miss");
  assert.deepEqual(windowKeys("glm-hydrated-18541"), ["mcp_monthly", "session", "weekly"]);
});

test("#18541 opencode-zen shares getOpencodeUsage, so its mcp_monthly is the monthly window", () => {
  quotaCache.setQuotaCache("zen-18541", "opencode-zen", opencodeGoQuotas(40, 10));
  assert.deepEqual(windowKeys("zen-18541"), ["monthly", "session", "weekly"]);
});

test("#18541 the cached entry's provider decides the alias; the request scope fills a blank one", () => {
  quotaCache.setQuotaCache("blank-provider-18541", "", opencodeGoQuotas(40, 10));
  quotaCache.setQuotaCache("glm-under-oc-scope-18541", "glm", GLM_QUOTAS);
  assert.deepEqual(windowKeys("blank-provider-18541", DIRECT_SCOPE), [
    "monthly",
    "session",
    "weekly",
  ]);
  assert.deepEqual(windowKeys("glm-under-oc-scope-18541", DIRECT_SCOPE), [
    "mcp_monthly",
    "session",
    "weekly",
  ]);
});

test("#18541 a real monthly window is never overwritten by the opencode-go alias", () => {
  quotaCache.setQuotaCache("oc-both-18541", "opencode-go", {
    monthly: { remainingPercentage: 90, resetAt: inHours(500) },
    mcp_monthly: { remainingPercentage: 10, resetAt: inHours(1) },
  });
  const windows = (
    buildConnectionQuotaWindowsView("oc-both-18541") as {
      windows: Record<string, { percentUsed: number }>;
    }
  ).windows;
  assert.ok(Math.abs(windows.monthly.percentUsed - 0.1) < 1e-9);
});

// The three Claude Team/Max scenarios from #16586 ("5h session inside a weekly
// cap"). Legacy scoring ranks them on the weekly reset; the scoped path, which
// every direct request takes since #16352, must give the same answers.
type Reading = [remainingPercent: number, resetInHours: number];
const CLAUDE_16586: Array<{
  name: string;
  now: number;
  team: Reading[];
  max: Reading[];
  winner: string;
}> = [
  {
    name: "t1",
    now: Date.UTC(2026, 9, 12, 12),
    team: [
      [95, 3.5],
      [93, 96],
    ],
    max: [
      [98, 4.33],
      [70, 47],
    ],
    winner: "max",
  },
  {
    name: "t2",
    now: Date.UTC(2026, 9, 13, 22),
    team: [
      [59, 0.5],
      [69, 62],
    ],
    max: [
      [92, 1.67],
      [61, 13],
    ],
    winner: "max",
  },
  {
    name: "hand-over",
    now: Date.UTC(2026, 9, 14, 12),
    team: [
      [100, 4],
      [63, 49],
    ],
    max: [
      [100, 5],
      [100, 168],
    ],
    winner: "team",
  },
];

for (const scenario of CLAUDE_16586) {
  test(`#18541 with scope metrics a session reset does not outrank the weekly deadline (#16586 ${scenario.name})`, () => {
    const at = ([remaining, hours]: Reading) => ({
      percentUsed: 1 - remaining / 100,
      resetAt: new Date(scenario.now + hours * HOUR).toISOString(),
    });
    const view = ([session, weekly]: Reading[]) => ({
      windows: { "session (5h)": at(session), "weekly (7d)": at(weekly) },
    });
    const views: Record<string, Record<string, unknown>> = {
      team: view(scenario.team),
      max: view(scenario.max),
    };
    const pool = [
      { id: "team", priority: 1 },
      { id: "max", priority: 2 },
    ];
    const pick = (scope?: { provider: string; requestedModel: string }) =>
      selectExpiryFirstConnection(
        pool,
        null,
        (id: string) => views[id] ?? null,
        scenario.now,
        scope
      )?.id;
    assert.equal(pick(), scenario.winner, "legacy path");
    assert.equal(
      pick({ provider: "claude", requestedModel: "claude-sonnet-4-6" }),
      scenario.winner
    );
  });
}

test("#18541 opencode-go monthly burn is read under the monthly window the scorer uses", (t) => {
  const start = Date.now();
  const resetAt = new Date(start + 48 * HOUR).toISOString();
  const now = t.mock.method(Date, "now", () => start);
  quotaCache.setQuotaCache("oc-burn-18541", "opencode-go", {
    mcp_monthly: { remainingPercentage: 60, resetAt },
  });
  now.mock.mockImplementation(() => start + HOUR);
  quotaCache.setQuotaCache("oc-burn-18541", "opencode-go", {
    mcp_monthly: { remainingPercentage: 50, resetAt },
  });
  const { burnFractionPerHourByWindow } = getExpiryFirstQuotaMetrics(
    "oc-burn-18541",
    undefined,
    DIRECT_SCOPE
  );
  assert.deepEqual(Object.keys(burnFractionPerHourByWindow), ["monthly"]);
  assert.ok(Math.abs(burnFractionPerHourByWindow.monthly - 0.1) < 1e-9);
});

test("#18541 burn metrics resolve the alias from the same provider as the quota view", (t) => {
  const start = Date.now();
  const resetAt = new Date(start + 48 * HOUR).toISOString();
  const now = t.mock.method(Date, "now", () => start);
  const seed = (id: string, provider: string, remaining: number) =>
    quotaCache.setQuotaCache(id, provider, {
      mcp_monthly: { remainingPercentage: remaining, resetAt },
    });
  seed("blank-burn-18541", "", 60);
  seed("glm-burn-18541", "glm", 60);
  now.mock.mockImplementation(() => start + HOUR);
  seed("blank-burn-18541", "", 50);
  seed("glm-burn-18541", "glm", 50);
  const burnKeys = (id: string) =>
    Object.keys(
      getExpiryFirstQuotaMetrics(id, undefined, DIRECT_SCOPE).burnFractionPerHourByWindow
    );
  assert.deepEqual(burnKeys("blank-burn-18541"), ["monthly"]);
  assert.deepEqual(burnKeys("glm-burn-18541"), ["mcp_monthly"]);
});
