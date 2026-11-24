/**
 * tests/unit/quota-plan-window-reading.test.ts
 *
 * The plan-window reading is the account figure of one provider plan window,
 * read from the same cached usage fetch as getSaturation. It is null whenever
 * getSaturation falls back to another window, the worst case across windows,
 * rate-limit headers or the fail-open 0, so only a figure of the requested
 * window itself can drive the attribution book. Only Claude (OAuth) and Codex
 * have a reading; Bailian keeps its saturation value without one.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import type { QuotaWindow } from "../../src/lib/quota/dimensions.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-plan-window-reading-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const sat = await import("../../src/lib/quota/saturationSignals.ts");
const { claudePlanReading, codexPlanReading } =
  await import("../../src/lib/quota/planWindowReading.ts");
const bailianFetcher = await import("../../open-sse/services/bailianQuotaFetcher.ts");
const { connectionProxyTestOverride } =
  await import("../../open-sse/services/connectionProxyFetch.ts");
const claudeUsage = await import("../../open-sse/services/usage/claude.ts");
const { _resetClaudeOauthUsageCooldown } =
  await import("../../open-sse/services/claudeUsageCooldown.ts");
const { getSaturation, getPlanWindowReading } = sat;

const originalFetch = globalThis.fetch;

const AT = 1_800_000_000_000;
const ISO = "2026-11-20T15:00:00.000Z";
const RESET = Date.parse(ISO);
const DIM = { unit: "percent", window: "5h" } as const;

function oauthUsage(
  fetchUsage: (conn: Record<string, unknown>) => Promise<unknown>,
  endpointReadAt?: (conn: Record<string, unknown>) => number | null
): void {
  sat._clearSaturationCache();
  sat.__setAnthropicSaturationDepsForTests({
    loadConnection: async (id) => ({ id, accessToken: "tok", authType: "oauth" }),
    fetchUsage,
    endpointReadAt,
  });
}

const SESSION_60 = { "session (5h)": { used: 60, total: 100, resetAt: ISO } };

/** Read through getPlanWindowReading and the bounds of the local clock around the call. */
async function timedReading(connectionId: string) {
  const before = Date.now();
  const reading = await getPlanWindowReading(connectionId, "claude", DIM);
  return { reading, before, after: Date.now() };
}

test.after(() => {
  globalThis.fetch = originalFetch;
  connectionProxyTestOverride.resolveProxyForConnection = null;
  claudeUsage._resetClaudeUsagePollingState();
  _resetClaudeOauthUsageCooldown();
  sat.__setAnthropicSaturationDepsForTests(null);
  sat.__setGenericUsageFetcherForTests(null);
  sat._clearSaturationCache();
  sat._clearRateLimitHeaders();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("claude: the window's own figure and reset time", () => {
  assert.deepEqual(
    claudePlanReading(
      { quotas: { "session (5h)": { used: 60, total: 100, resetAt: ISO } } },
      "5h",
      AT
    ),
    { used: 0.6, resetAt: RESET, fetchedAt: AT }
  );
  assert.deepEqual(
    claudePlanReading(
      { quotas: { "weekly (7d)": { used: 30, total: 100, resetAt: null } } },
      "weekly",
      AT
    ),
    { used: 0.3, resetAt: null, fetchedAt: AT }
  );
});

test("claude: no reading for stale, unreported, missing or borrowed windows", () => {
  const cases: Array<[unknown, QuotaWindow]> = [
    [{ quotas: { "weekly (7d)": { used: 30, total: 100 } } }, "monthly"],
    [{ quotas: { "session (5h)": { used: 60, total: 100 } }, _stale: true }, "5h"],
    [{ quotas: { "session (5h)": { used: 0, total: 100, fractionReported: false } } }, "5h"],
    [{ quotas: {} }, "5h"],
    [{ message: "rate limited" }, "5h"],
    [null, "5h"],
  ];
  for (const [usage, window] of cases) assert.equal(claudePlanReading(usage, window, AT), null);
});

test("codex: per-window figure, never the worst-case fallback", () => {
  const codex = {
    percentUsed: 0.9,
    windows: {
      session: { percentUsed: 0.42, resetAt: ISO },
      weekly: { percentUsed: 0.9, resetAt: null },
    },
  };
  assert.deepEqual(codexPlanReading(codex, "5h", AT), {
    used: 0.42,
    resetAt: RESET,
    fetchedAt: AT,
  });
  assert.deepEqual(codexPlanReading(codex, "weekly", AT), {
    used: 0.9,
    resetAt: null,
    fetchedAt: AT,
  });
  for (const q of [
    { ...codex, stale: true },
    { percentUsed: 0.9, windows: {} },
    { windows: { session: { percentUsed: NaN, resetAt: null } } },
    null,
  ]) {
    assert.equal(codexPlanReading(q, "5h", AT), null);
  }
  assert.equal(codexPlanReading(codex, "monthly", AT), null);
  assert.equal(
    codexPlanReading({ windows: { session: { percentUsed: 1.4, resetAt: null } } }, "5h", AT)?.used,
    1
  );
});

test("codex: a window carrying fractionReported: false reads as without it", () => {
  const session = { percentUsed: 0.25, resetAt: ISO };
  const marked = { windows: { session: { ...session, fractionReported: false } } };
  assert.deepEqual(codexPlanReading(marked, "5h", AT), {
    used: 0.25,
    resetAt: RESET,
    fetchedAt: AT,
  });
  assert.deepEqual(
    codexPlanReading(marked, "5h", AT),
    codexPlanReading({ windows: { session } }, "5h", AT)
  );
});

test("getSaturation keeps its value and the reading shares the cached fetch", async () => {
  let fetches = 0;
  oauthUsage(
    async () => (fetches++, { quotas: { "session (5h)": { used: 60, total: 100, resetAt: ISO } } })
  );
  const [value, reading] = await Promise.all([
    getSaturation("c1", "claude", DIM),
    getPlanWindowReading("c1", "claude", DIM),
  ]);
  assert.deepEqual([value, reading?.used, reading?.resetAt, fetches], [0.6, 0.6, RESET, 1]);
  assert.deepEqual(await getPlanWindowReading("c1", "claude", DIM), reading); // cached entry, same fetchedAt
  assert.equal(fetches, 1);
});

test("a failed usage read is 0 for getSaturation and no reading", async () => {
  oauthUsage(async () => {
    throw new Error("usage down");
  });
  assert.deepEqual(
    [await getSaturation("c2", "claude", DIM), await getPlanWindowReading("c2", "claude", DIM)],
    [0, null]
  );
});

test("the rate-limit-header fallback is a saturation value, never a reading", async () => {
  sat._clearSaturationCache();
  sat.__setAnthropicSaturationDepsForTests({
    loadConnection: async (id) => ({ id, apiKey: "sk", authType: "apikey" }),
    fetchUsage: async () => ({}),
  });
  sat.storeRateLimitHeaders("c3", "anthropic", {
    "anthropic-ratelimit-requests-limit": "100",
    "anthropic-ratelimit-requests-remaining": "10",
  });
  assert.deepEqual(
    [await getSaturation("c3", "claude", DIM), await getPlanWindowReading("c3", "claude", DIM)],
    [0.9, null]
  );
});

test("providers without a plan-window mapping yield no reading", async () => {
  sat._clearSaturationCache();
  sat.__setGenericUsageFetcherForTests(async () => {
    throw new Error("no usage");
  });
  sat.storeRateLimitHeaders("c4", "openai", {
    "x-ratelimit-limit-tokens": "1000",
    "x-ratelimit-remaining-tokens": "250",
  });
  assert.deepEqual(
    [await getSaturation("c4", "openai", DIM), await getPlanWindowReading("c4", "openai", DIM)],
    [0.75, null]
  );
});

test("bailian: getSaturation keeps its window figure and there is no plan-window reading", async () => {
  sat._clearSaturationCache();
  // The saturation path passes no credentials, so it is served from the fetcher's own cache:
  // fill it with one parsed upstream response first.
  const connectionId = `bailian-${Date.now()}`;
  connectionProxyTestOverride.resolveProxyForConnection = async () => null;
  globalThis.fetch = (async () =>
    Response.json({
      code: "Success",
      data: {
        codingPlanInstanceInfos: [
          {
            codingPlanQuotaInfo: {
              per5HourUsedQuota: 20,
              per5HourTotalQuota: 100,
              per5HourQuotaNextRefreshTime: 1_800_000_000,
              perWeekUsedQuota: 50,
              perWeekTotalQuota: 100,
              perBillMonthUsedQuota: 70,
              perBillMonthTotalQuota: 100,
            },
          },
        ],
      },
    })) as typeof fetch;
  try {
    assert.ok(await bailianFetcher.fetchBailianQuota(connectionId, { apiKey: "test-key" }));
    for (const [window, value] of [
      ["5h", 0.2],
      ["weekly", 0.5],
      ["monthly", 0.7],
    ] as const) {
      const dim = { unit: "percent", window } as const;
      assert.deepEqual(
        [
          await getSaturation(connectionId, "bailian", dim),
          await getPlanWindowReading(connectionId, "bailian", dim),
        ],
        [value, null]
      );
    }
  } finally {
    bailianFetcher.invalidateBailianQuotaCache(connectionId);
    globalThis.fetch = originalFetch;
    connectionProxyTestOverride.resolveProxyForConnection = null;
  }
});

test("a figure served from response headers is dated by its observation time", async () => {
  const observedAt = Date.now() - 5 * 60_000;
  oauthUsage(
    async () => ({
      quotas: SESSION_60,
      _source: "response-headers",
      _observedAt: new Date(observedAt).toISOString(),
    }),
    () => observedAt - 10 * 60_000 // an older endpoint read never dates a header figure
  );
  assert.equal((await getPlanWindowReading("t1", "claude", DIM))?.fetchedAt, observedAt);
});

test("an endpoint figure is dated by the endpoint read, the same for every call on one entry", async () => {
  const readAt = Date.now() - 12 * 60_000;
  let fetches = 0;
  oauthUsage(
    async () => (fetches++, { quotas: SESSION_60 }),
    () => readAt
  );
  const first = await getPlanWindowReading("t2", "claude", DIM);
  assert.equal(first?.fetchedAt, readAt);
  assert.deepEqual(await getPlanWindowReading("t2", "claude", DIM), first);
  assert.equal(fetches, 1);
});

test("an unknown or unparseable data time falls back to the cache entry build time", async () => {
  oauthUsage(async () => ({
    quotas: SESSION_60,
    _source: "response-headers",
    _observedAt: "not a date",
  }));
  const headers = await timedReading("t3");
  assert.ok(
    headers.reading!.fetchedAt >= headers.before && headers.reading!.fetchedAt <= headers.after
  );

  oauthUsage(
    async () => ({ quotas: SESSION_60 }),
    () => null
  );
  const endpoint = await timedReading("t4");
  assert.ok(endpoint.reading!.fetchedAt >= endpoint.before);
  assert.ok(endpoint.reading!.fetchedAt <= endpoint.after);

  oauthUsage(
    async () => ({ quotas: SESSION_60 }),
    () => {
      throw new Error("cache unavailable");
    }
  );
  const before = Date.now();
  assert.equal(await getSaturation("t5", "claude", DIM), 0.6); // the value never depends on the data time
  const failed = await getPlanWindowReading("t5", "claude", DIM);
  const after = Date.now();
  assert.ok(failed !== null, "the reading survives a failed endpoint-time lookup");
  assert.ok(failed.fetchedAt >= before && failed.fetchedAt <= after, String(failed.fetchedAt));
});

test("a data time ahead of the local clock is clamped to the build time", async () => {
  oauthUsage(
    async () => ({ quotas: SESSION_60 }),
    () => Date.now() + 60 * 60_000
  );
  const { reading, before, after } = await timedReading("t6");
  assert.ok(reading!.fetchedAt >= before && reading!.fetchedAt <= after);
});

test("getClaudeUsageEndpointReadAt reports the kept endpoint read without fetching", async () => {
  claudeUsage._resetClaudeUsagePollingState();
  _resetClaudeOauthUsageCooldown();
  let calls = 0;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    calls++;
    if (String(input) === "https://api.anthropic.com/api/oauth/usage") {
      return Response.json({ five_hour: { utilization: 42, resets_at: ISO } });
    }
    return new Response(null, { status: 404 });
  }) as typeof fetch;
  try {
    assert.equal(claudeUsage.getClaudeUsageEndpointReadAt(undefined), null);
    assert.equal(claudeUsage.getClaudeUsageEndpointReadAt("never-read"), null);
    assert.equal(calls, 0);
    const before = Date.now();
    await claudeUsage.getClaudeUsage("read-token");
    const after = Date.now();
    const callsAfterRead = calls;
    const readAt = claudeUsage.getClaudeUsageEndpointReadAt("read-token");
    assert.ok(readAt !== null && readAt >= before && readAt <= after);
    assert.equal(claudeUsage.getClaudeUsageEndpointReadAt("read-token"), readAt);
    assert.equal(calls, callsAfterRead);
  } finally {
    globalThis.fetch = originalFetch;
    claudeUsage._resetClaudeUsagePollingState();
  }
});
