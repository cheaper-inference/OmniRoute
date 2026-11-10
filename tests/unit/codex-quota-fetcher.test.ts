import test from "node:test";
import assert from "node:assert/strict";

import {
  fetchCodexQuota,
  getCodexQuotaCooldownMs,
  getCodexQuotaFetchTimeoutMs,
  invalidateCodexQuotaCache,
  registerCodexConnection,
  registerCodexQuotaFetcher,
  __testing,
} from "../../open-sse/services/codexQuotaFetcher.ts";
import { markQuotaPreflightAccountUnavailable } from "../../src/sse/services/quotaPreflightUnavailable.ts";
import { preflightQuota } from "../../open-sse/services/quotaPreflight.ts";
import {
  clearQuotaMonitors,
  getActiveMonitorCount,
  startQuotaMonitor,
  stopQuotaMonitor,
} from "../../open-sse/services/quotaMonitor.ts";
import { clearSessions, touchSession } from "../../open-sse/services/sessionManager.ts";

const originalFetch = globalThis.fetch;

function usageResponse(body: unknown) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

/** Caches `usage` as a real read, then makes every later refresh time out. */
async function cacheUsageThenTimeOut(
  connectionId: string,
  usage: unknown,
  connection: Record<string, unknown>,
  ageMs = 61_000
) {
  globalThis.fetch = async () => usageResponse(usage);
  await fetchCodexQuota(connectionId, connection);
  __testing.ageCacheEntry(connectionId, ageMs);
  globalThis.fetch = async () => {
    throw new DOMException("Simulated timeout", "TimeoutError");
  };
}

const PAID_CREDITS = {
  has_credits: true,
  unlimited: false,
  overage_limit_reached: false,
  balance: 1234,
};
const paidConnection = {
  accessToken: "token-1",
  requestedModel: "gpt-5.5",
  providerSpecificData: { allowPaidCredits: true },
};

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  clearQuotaMonitors();
  clearSessions();
});

test("fetchCodexQuota returns null when no registered credentials exist", async () => {
  const quota = await fetchCodexQuota(`missing-${Date.now()}`);
  assert.equal(quota, null);
});

test("fetchCodexQuota exposes available paid credits without changing exhausted subscription windows", async () => {
  globalThis.fetch = async () =>
    Response.json({
      rate_limit: {
        limit_reached: true,
        primary_window: { limit_window_seconds: 18000, used_percent: 100 },
      },
      credits: { has_credits: true, unlimited: false, overage_limit_reached: false, balance: null },
    });
  const connectionId = "codex-paid-credits-fetch";
  try {
    const quota = await fetchCodexQuota(connectionId, {
      accessToken: "test-token",
      providerSpecificData: { workspaceId: "test-workspace" },
    });
    assert.equal(quota?.paidCredits?.hasCredits, true);
    assert.equal(quota?.paidCredits?.balance, null);
    assert.equal(quota?.limitReached, true);
    assert.equal(quota?.windows?.session.percentUsed, 1);
  } finally {
    invalidateCodexQuotaCache(connectionId);
  }
});

test("fetchCodexQuota can read credentials directly from the provided connection snapshot", async () => {
  const connectionId = `codex-inline-${Date.now()}`;
  const calls = [];

  globalThis.fetch = async (url, init) => {
    calls.push({ url, init });
    return new Response(
      JSON.stringify({
        rate_limit: {
          primary_window: {
            limit_window_seconds: 18000,
            used_percent: 70,
            reset_after_seconds: 45,
          },
          secondary_window: {
            limit_window_seconds: 604800,
            used_percent: 20,
            reset_after_seconds: 300,
          },
        },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  const quota = await fetchCodexQuota(connectionId, {
    accessToken: "inline-token",
    providerSpecificData: {
      workspaceId: "workspace-inline",
    },
  });

  assert.equal(calls.length, 1);
  assert.equal(calls[0].init.headers.Authorization, "Bearer inline-token");
  assert.equal(calls[0].init.headers["chatgpt-account-id"], "workspace-inline");
  assert.equal(quota.percentUsed, 0.7);
  assert.ok(typeof quota.resetAt === "string");

  invalidateCodexQuotaCache(connectionId);
});

test("fetchCodexQuota parses dual-window usage, forwards workspace headers, and caches results", async () => {
  const connectionId = `codex-cache-${Date.now()}`;
  const calls = [];

  registerCodexConnection(connectionId, {
    accessToken: "access-token",
    workspaceId: "workspace-123",
  });

  globalThis.fetch = async (url, init) => {
    calls.push({ url, init });
    return new Response(
      JSON.stringify({
        rate_limit: {
          primary_window: {
            limit_window_seconds: 18000,
            used_percent: 80,
            reset_after_seconds: 60,
          },
          secondary_window: {
            limit_window_seconds: 604800,
            used_percent: 40,
            reset_at: Math.floor((Date.now() + 3600_000) / 1000),
          },
        },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  const first = await fetchCodexQuota(connectionId);
  const second = await fetchCodexQuota(connectionId);

  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://chatgpt.com/backend-api/wham/usage");
  assert.equal(calls[0].init.headers.Authorization, "Bearer access-token");
  assert.equal(calls[0].init.headers["chatgpt-account-id"], "workspace-123");
  assert.equal(first.percentUsed, 0.8);
  assert.equal(first.window5h.percentUsed, 0.8);
  assert.equal(first.window7d.percentUsed, 0.4);
  assert.deepEqual(second, first);

  invalidateCodexQuotaCache(connectionId);
});

test("fetchCodexQuota evaluates normal and Spark windows independently by requested model", async () => {
  const connectionId = `codex-spark-scope-${Date.now()}`;
  let calls = 0;

  registerCodexConnection(connectionId, {
    accessToken: "access-token-spark",
  });

  globalThis.fetch = async () => {
    calls++;
    return new Response(
      JSON.stringify({
        rate_limit: {
          primary_window: {
            limit_window_seconds: 18000,
            used_percent: 20,
            reset_after_seconds: 60,
          },
          secondary_window: {
            limit_window_seconds: 604800,
            used_percent: 30,
            reset_after_seconds: 120,
          },
        },
        additional_rate_limits: [
          {
            limit_id: "codex_bengalfox",
            limit_name: "GPT-5.3-Codex-Spark",
            metered_feature: "gpt_5_3_codex_spark",
            rate_limit: {
              primary_window: {
                limit_window_seconds: 18000,
                used_percent: 100,
                reset_after_seconds: 300,
              },
              secondary_window: {
                limit_window_seconds: 604800,
                used_percent: 40,
                reset_after_seconds: 600,
              },
            },
          },
        ],
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  const normal = await fetchCodexQuota(connectionId, { requestedModel: "gpt-5.3-codex" });
  const spark = await fetchCodexQuota(connectionId, { requestedModel: "gpt-5.3-codex-spark" });

  assert.equal(calls, 2, "normal and Spark scopes use separate cache entries");
  assert.equal(normal.percentUsed, 0.3);
  assert.equal(normal.windows?.session.percentUsed, 0.2);
  assert.equal(normal.windows?.weekly.percentUsed, 0.3);
  assert.equal(normal.windows?.gpt_5_3_codex_spark_session, undefined);
  assert.equal(spark.percentUsed, 1);
  assert.equal(spark.windows?.gpt_5_3_codex_spark_session.percentUsed, 1);
  assert.equal(spark.windows?.gpt_5_3_codex_spark_weekly.percentUsed, 0.4);
  assert.equal(spark.windows?.session, undefined);

  const sparkCached = await fetchCodexQuota(connectionId, {
    requestedModel: "gpt-5.3-codex-spark",
  });
  assert.equal(calls, 2);
  assert.deepEqual(sparkCached, spark);

  invalidateCodexQuotaCache(connectionId);
});

test("fetchCodexQuota drops bad credentials after an authorization failure", async () => {
  const connectionId = `codex-auth-${Date.now()}`;
  let calls = 0;

  registerCodexConnection(connectionId, {
    accessToken: "expired-token",
  });

  globalThis.fetch = async () => {
    calls++;
    return new Response("unauthorized", { status: 401 });
  };

  const first = await fetchCodexQuota(connectionId);
  const second = await fetchCodexQuota(connectionId);

  assert.equal(first, null);
  assert.equal(second, null);
  assert.equal(calls, 1);
});

test("getCodexQuotaCooldownMs prefers the 7d window before the 5h window", () => {
  const now = Date.now();
  const quota = {
    used: 99,
    total: 100,
    percentUsed: 0.99,
    window5h: {
      percentUsed: 0.99,
      resetAt: new Date(now + 60_000).toISOString(),
    },
    window7d: {
      percentUsed: 0.97,
      resetAt: new Date(now + 300_000).toISOString(),
    },
    limitReached: false,
  };

  const cooldownMs = getCodexQuotaCooldownMs(quota);

  assert.ok(cooldownMs >= 295_000);
  assert.ok(cooldownMs <= 300_000);
});

test("registerCodexQuotaFetcher exposes Codex quota to preflight and monitor flows", async () => {
  const connectionId = `codex-preflight-${Date.now()}`;

  registerCodexQuotaFetcher();
  registerCodexConnection(connectionId, {
    accessToken: "quota-token",
  });

  // Use 100% (fully exhausted) to avoid floating-point boundary issues:
  // (1 - 0.98) * 100 = 2.0000000000000018, which is > DEFAULT_MIN_REMAINING_PERCENT (2),
  // so the preflight wouldn't block. 100% used → 0% remaining, clearly below 2%.
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        rate_limit: {
          primary_window: {
            limit_window_seconds: 18000,
            used_percent: 100,
            reset_after_seconds: 90,
          },
        },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );

  const preflight = await preflightQuota("codex", connectionId, {
    providerSpecificData: { quotaPreflightEnabled: true },
  });

  touchSession("session-codex", connectionId);
  startQuotaMonitor("session-codex", "codex", connectionId, {
    providerSpecificData: { quotaMonitorEnabled: true },
  });

  assert.equal(preflight.proceed, false);
  assert.equal(preflight.reason, "quota_exhausted");
  assert.equal(getActiveMonitorCount(), 1);

  stopQuotaMonitor("session-codex");
  assert.equal(getActiveMonitorCount(), 0);
});

test("getCodexQuotaFetchTimeoutMs defaults to 8s and respects env override", () => {
  assert.equal(getCodexQuotaFetchTimeoutMs(), 8_000);
  process.env.CODEX_QUOTA_FETCH_TIMEOUT_MS = "15000";
  try {
    assert.equal(getCodexQuotaFetchTimeoutMs(), 15_000);
  } finally {
    delete process.env.CODEX_QUOTA_FETCH_TIMEOUT_MS;
  }
});

test("getCodexQuotaFetchTimeoutMs only accepts delays a timer can honor", () => {
  try {
    for (const raw of ["15000.5", "0", "-1", "abc", " ", "2147483648"]) {
      process.env.CODEX_QUOTA_FETCH_TIMEOUT_MS = raw;
      assert.equal(getCodexQuotaFetchTimeoutMs(), 8_000, `expected the default for "${raw}"`);
    }
    process.env.CODEX_QUOTA_FETCH_TIMEOUT_MS = "2147483647";
    assert.equal(getCodexQuotaFetchTimeoutMs(), 2_147_483_647);
  } finally {
    delete process.env.CODEX_QUOTA_FETCH_TIMEOUT_MS;
  }
});

test("a fractional CODEX_QUOTA_FETCH_TIMEOUT_MS still reaches the usage endpoint", async () => {
  const connectionId = `codex-fractional-timeout-${Date.now()}`;
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return usageResponse({ rate_limit: { primary_window: { used_percent: 10 } } });
  };
  process.env.CODEX_QUOTA_FETCH_TIMEOUT_MS = "15000.5";
  try {
    const quota = await fetchCodexQuota(connectionId, { accessToken: "token-1" });
    assert.equal(calls, 1);
    assert.equal(quota?.percentUsed, 0.1);
  } finally {
    delete process.env.CODEX_QUOTA_FETCH_TIMEOUT_MS;
    invalidateCodexQuotaCache(connectionId);
  }
});

test("fetchCodexQuota falls back to cached quota when fresh upstream fetch fails or times out", async () => {
  const connectionId = `codex-stale-cache-${Date.now()}`;
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    if (calls === 1) {
      return new Response(
        JSON.stringify({
          rate_limit: { primary_window: { used_percent: 50, reset_after_seconds: 60 } },
          credits: {
            has_credits: true,
            unlimited: false,
            overage_limit_reached: false,
            balance: 1234,
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    throw new DOMException("Simulated timeout", "TimeoutError");
  };

  const first = await fetchCodexQuota(connectionId, {
    accessToken: "token-1",
    providerSpecificData: { workspaceId: "ws-1" },
  });
  assert.equal(first?.paidCredits?.balance, 1234);

  // Age the cache past CACHE_TTL_MS (60s) to force a fresh fetch attempt
  __testing.ageCacheEntry(connectionId, 61_000);

  // Second fetch throws timeout, but should return stale cached quota
  const second = await fetchCodexQuota(connectionId, {
    accessToken: "token-1",
    providerSpecificData: { workspaceId: "ws-1" },
  });
  assert.equal(calls, 2);
  assert.equal(second?.paidCredits?.balance, 1234);
  assert.equal(second?.stale, true);

  invalidateCodexQuotaCache(connectionId);
});

test("a stale snapshot past its window reset reads as unknown after a failed refresh", async () => {
  const connectionId = `codex-stale-reset-${Date.now()}`;
  const connection = { accessToken: "token-1" };
  const resetAtSeconds = Math.floor(Date.now() / 1000) - 60;
  await cacheUsageThenTimeOut(
    connectionId,
    { rate_limit: { primary_window: { used_percent: 100, reset_at: resetAtSeconds } } },
    connection
  );
  registerCodexQuotaFetcher();

  assert.equal(await fetchCodexQuota(connectionId, connection), null);
  const preflight = await preflightQuota("codex", connectionId, connection);
  assert.equal(preflight.proceed, true);

  invalidateCodexQuotaCache(connectionId);
});

test("a stale snapshot with a spent or reset window is not reused even when another is healthy", async () => {
  const connection = { accessToken: "token-1" };
  const future = Math.floor(Date.now() / 1000) + 3_600;
  const past = Math.floor(Date.now() / 1000) - 60;
  const cases = [
    { primary_window: { used_percent: 100, reset_at: future } },
    { limit_reached: true, primary_window: { used_percent: 40, reset_at: future } },
    {
      primary_window: { used_percent: 20, reset_at: past, limit_window_seconds: 18_000 },
      secondary_window: { used_percent: 20, reset_at: future, limit_window_seconds: 604_800 },
    },
  ];
  for (const [index, rate_limit] of cases.entries()) {
    const connectionId = `codex-stale-spent-${index}-${Date.now()}`;
    await cacheUsageThenTimeOut(connectionId, { rate_limit }, connection);
    assert.equal(await fetchCodexQuota(connectionId, connection), null, `case ${index}`);
    invalidateCodexQuotaCache(connectionId);
  }
});

test("a stale snapshot older than the reuse window reads as unknown", async () => {
  const connectionId = `codex-stale-old-${Date.now()}`;
  const connection = { accessToken: "token-1" };
  const usage = { rate_limit: { primary_window: { used_percent: 10 } } };
  await cacheUsageThenTimeOut(connectionId, usage, connection, 14 * 60_000);
  assert.equal((await fetchCodexQuota(connectionId, connection))?.stale, true);

  __testing.ageCacheEntry(connectionId, 15 * 60_000 + 1);
  assert.equal(await fetchCodexQuota(connectionId, connection), null);

  invalidateCodexQuotaCache(connectionId);
});

test("the cache sweep keeps snapshots for the whole reuse window", async () => {
  const connectionId = `codex-stale-sweep-${Date.now()}`;
  const connection = { accessToken: "token-1" };
  const usage = { rate_limit: { primary_window: { used_percent: 10 } } };
  await cacheUsageThenTimeOut(connectionId, usage, connection, 10 * 60_000);

  __testing.sweepQuotaCache();
  assert.equal((await fetchCodexQuota(connectionId, connection))?.stale, true);

  __testing.ageCacheEntry(connectionId, 15 * 60_000 + 1);
  __testing.sweepQuotaCache();
  __testing.ageCacheEntry(connectionId, 0);
  assert.equal(await fetchCodexQuota(connectionId, connection), null);

  invalidateCodexQuotaCache(connectionId);
});

test("an authorization failure never falls back to the cached snapshot", async () => {
  const connectionId = `codex-stale-auth-${Date.now()}`;
  const connection = { accessToken: "token-1" };
  await cacheUsageThenTimeOut(
    connectionId,
    { rate_limit: { primary_window: { used_percent: 10 } } },
    connection
  );
  globalThis.fetch = async () => new Response("{}", { status: 401 });

  assert.equal(await fetchCodexQuota(connectionId, connection), null);
});

test("a paid-credit account keeps routing on a healthy stale snapshot", async () => {
  const connectionId = `codex-stale-paid-ok-${Date.now()}`;
  registerCodexQuotaFetcher();
  await cacheUsageThenTimeOut(
    connectionId,
    { rate_limit: { primary_window: { used_percent: 50 } }, credits: PAID_CREDITS },
    paidConnection
  );

  const preflight = await preflightQuota("codex", connectionId, paidConnection);
  assert.equal(preflight.proceed, true);

  invalidateCodexQuotaCache(connectionId);
});

test("a paid-credit account fails closed when no snapshot is usable", async () => {
  registerCodexQuotaFetcher();
  const unknown = { proceed: false, reason: "quota_unavailable" };

  const neverRead = `codex-paid-never-read-${Date.now()}`;
  globalThis.fetch = async () => {
    throw new DOMException("Simulated timeout", "TimeoutError");
  };
  assert.deepEqual(await preflightQuota("codex", neverRead, paidConnection), unknown);

  // Credits on the snapshot must not excuse a window that is already spent.
  const spent = `codex-paid-spent-${Date.now()}`;
  await cacheUsageThenTimeOut(
    spent,
    { rate_limit: { primary_window: { used_percent: 100 } }, credits: PAID_CREDITS },
    paidConnection
  );
  assert.deepEqual(await preflightQuota("codex", spent, paidConnection), unknown);
  invalidateCodexQuotaCache(spent);
});

test("a stale snapshot past the configured cutoff reads as unknown instead of blocking", async () => {
  registerCodexQuotaFetcher();
  const thresholds = { resolveMinRemainingPercent: () => 10 };
  const usage = { rate_limit: { primary_window: { used_percent: 95 } }, credits: PAID_CREDITS };

  const regular = `codex-stale-cutoff-${Date.now()}`;
  const regularConnection = { accessToken: "token-1", requestedModel: "gpt-5.5" };
  await cacheUsageThenTimeOut(regular, usage, regularConnection);
  const regularResult = await preflightQuota("codex", regular, regularConnection, thresholds);
  assert.deepEqual(regularResult, { proceed: true });
  invalidateCodexQuotaCache(regular);

  const paid = `codex-stale-cutoff-paid-${Date.now()}`;
  await cacheUsageThenTimeOut(paid, usage, paidConnection);
  assert.deepEqual(await preflightQuota("codex", paid, paidConnection, thresholds), {
    proceed: false,
    reason: "quota_unavailable",
  });
  invalidateCodexQuotaCache(paid);
});

test("a fresh snapshot past the cutoff still blocks", async () => {
  registerCodexQuotaFetcher();
  const connectionId = `codex-fresh-cutoff-${Date.now()}`;
  const connection = { accessToken: "token-1" };
  globalThis.fetch = async () =>
    usageResponse({ rate_limit: { primary_window: { used_percent: 95 } } });

  const result = await preflightQuota("codex", connectionId, connection, {
    resolveMinRemainingPercent: () => 10,
  });
  assert.equal(result.proceed, false);
  assert.equal(result.reason, "quota_exhausted");

  invalidateCodexQuotaCache(connectionId);
});

test("markQuotaPreflightAccountUnavailable does not persist a cooldown when quota is unavailable", async () => {
  const connectionId = `codex-no-cooldown-${Date.now()}`;
  const unavailableUntil = await markQuotaPreflightAccountUnavailable(
    "codex",
    connectionId,
    { reason: "quota_unavailable" },
    "gpt-6.1-sol"
  );
  assert.equal(unavailableUntil, null);
});
