import test from "node:test";
import assert from "node:assert/strict";

import {
  buildSensenovaQuota,
  fetchSensenovaQuota,
  invalidateSensenovaQuotaCache,
  registerSensenovaFetchersForNodes,
  registerSensenovaQuotaFetcher,
  toSensenovaUsage,
  SENSENOVA_CLIENT_ID,
  SENSENOVA_POOL_USAGE_URL,
  SENSENOVA_TOKEN_URL,
  SENSENOVA_PSD_ACCESS_TOKEN,
  SENSENOVA_PSD_ACCESS_EXPIRES_AT,
  SENSENOVA_PSD_REFRESH_TOKEN,
  type SensenovaPoolUsagePayload,
} from "../../open-sse/services/sensenovaQuotaFetcher.ts";
import { connectionProxyTestOverride } from "../../open-sse/services/connectionProxyFetch.ts";
import {
  getQuotaCacheInvalidator,
  getQuotaFetcher,
  getQuotaWindows,
} from "../../open-sse/services/quotaPreflight.ts";
import { getMonitorFetcher } from "../../open-sse/services/quotaMonitor.ts";
import { PROVIDER_SPECIFIC_SECRET_FIELDS } from "../../src/lib/db/providers/providerSpecificDataSecrets.ts";

const originalFetch = globalThis.fetch;
const originalProxyResolver = connectionProxyTestOverride.resolveProxyForConnection;

// Shape captured from the live console on 2026-11-16: two pools, the dedicated
// Flash-Lite pool listed second, numbers as decimal strings, reset_at as seconds.
const LIVE_PAYLOAD: SensenovaPoolUsagePayload = {
  plan: { id: "free", name: "Free Plan", type: "TOKEN_PLAN_PLAN_TYPE_FREE" },
  pools: [
    {
      id: "pool-default",
      name: "general",
      model_ids: ["deepseek-v4-flash", "glm-5.3", "kimi-k3"],
      pool_type: "default",
      window_5h: { limit: "120000", used: "30000", remaining: "90000", reset_at: "1794851140" },
      window_7d: { limit: "1200000", used: "600000", remaining: "600000", reset_at: "1794883540" },
    },
    {
      id: "pool-flash-lite",
      name: "flash-lite",
      model_ids: ["sensenova-6.8-flash-lite"],
      pool_type: "dedicated",
      window_5h: { limit: "120000", used: "0", remaining: "120000", reset_at: "1794851140" },
      window_7d: { limit: "1200000", used: "0", remaining: "1200000", reset_at: "1794883540" },
    },
  ],
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

test.beforeEach(() => {
  connectionProxyTestOverride.resolveProxyForConnection = async () => null;
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  connectionProxyTestOverride.resolveProxyForConnection = originalProxyResolver;
});

test("buildSensenovaQuota reports the worst window of the default pool", () => {
  const quota = buildSensenovaQuota(LIVE_PAYLOAD);
  assert.ok(quota);
  // 5h is 25% used, 7d is 50% used: the snapshot must take the worse window.
  assert.equal(quota!.percentUsed, 0.5);
  assert.equal(quota!.plan, "Free Plan");
  // 7d binds (50% used), so the scalar numbers describe the 7d window.
  assert.equal(quota!.used, 600000);
  assert.equal(quota!.total, 1200000);
  assert.equal(quota!.window5h?.percentUsed, 0.25);
  assert.equal(quota!.window7d?.percentUsed, 0.5);
  assert.equal(quota!.window7d?.resetAt, new Date(1794883540 * 1000).toISOString());
  assert.equal(quota!.limitReached, false);
});

test("buildSensenovaQuota ignores dedicated pools even when they come first", () => {
  const payload: SensenovaPoolUsagePayload = {
    pools: [
      { ...LIVE_PAYLOAD.pools![1], window_5h: { limit: "100", used: "100", remaining: "0" } },
      LIVE_PAYLOAD.pools![0],
    ],
  };
  const quota = buildSensenovaQuota(payload);
  assert.equal(quota!.percentUsed, 0.5);
  assert.equal(quota!.used, 600000);
  assert.equal(quota!.total, 1200000);
  assert.equal(quota!.windows["5h"].percentUsed, 0.25);
  assert.equal(quota!.windows["7d"].percentUsed, 0.5);
  assert.equal(quota!.window5h?.resetAt, "2026-11-16T17:45:40.000Z");
  assert.equal(quota!.resetAt, "2026-11-17T02:45:40.000Z");
});

test("buildSensenovaQuota accepts pools keyed by id", () => {
  const quota = buildSensenovaQuota({
    pools: {
      "pool-default": LIVE_PAYLOAD.pools![0],
      "pool-flash-lite": LIVE_PAYLOAD.pools![1],
    },
  });
  assert.ok(quota);
  assert.equal(quota!.percentUsed, 0.5);
  assert.equal(quota!.used, 600000);
});

test("buildSensenovaQuota returns null when the payload has no pools", () => {
  assert.equal(buildSensenovaQuota({ plan: { name: "Free Plan" }, pools: [] }), null);
  assert.equal(buildSensenovaQuota(null), null);
});

test("fetchSensenovaQuota exchanges the refresh token and reads the pool", async () => {
  const connectionId = `sn-refresh-${Date.now()}`;
  invalidateSensenovaQuotaCache(connectionId);
  const calls: Array<{ url: string; auth?: string }> = [];

  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    calls.push({ url, auth: new Headers(init?.headers).get("Authorization") ?? undefined });
    if (url === SENSENOVA_TOKEN_URL) {
      return jsonResponse({
        access_token: "fresh-access",
        refresh_token: "rotated",
        expires_in: 10800,
      });
    }
    if (url === SENSENOVA_POOL_USAGE_URL) {
      assert.equal(
        new Headers(init?.headers).get("Authorization") ?? undefined,
        "Bearer fresh-access"
      );
      return jsonResponse(LIVE_PAYLOAD);
    }
    throw new Error("unexpected url " + url);
  }) as typeof fetch;

  const quota = await fetchSensenovaQuota(connectionId, {
    providerSpecificData: { [SENSENOVA_PSD_REFRESH_TOKEN]: "stored-refresh" },
  });

  assert.ok(quota);
  assert.equal(quota!.percentUsed, 0.5);
  assert.equal(calls.filter((c) => c.url === SENSENOVA_TOKEN_URL).length, 1);
});

test("a revoked token with no refresh token returns nothing and does not retry", async () => {
  const connectionId = `sn-norefresh-${Date.now()}`;
  invalidateSensenovaQuotaCache(connectionId);
  let poolCalls = 0;
  let tokenCalls = 0;

  globalThis.fetch = (async (input: RequestInfo | URL) => {
    if (String(input) === SENSENOVA_TOKEN_URL) {
      tokenCalls += 1;
      return jsonResponse({ access_token: "unexpected" });
    }
    poolCalls += 1;
    return jsonResponse({ code: 16 }, 401);
  }) as typeof fetch;

  const quota = await fetchSensenovaQuota(connectionId, {
    providerSpecificData: {
      [SENSENOVA_PSD_ACCESS_TOKEN]: "revoked",
      [SENSENOVA_PSD_ACCESS_EXPIRES_AT]: Date.now() + 3_600_000,
    },
  });

  assert.equal(quota, null);
  assert.equal(poolCalls, 1);
  assert.equal(tokenCalls, 0);
});

test("a successful quota expires after the full cache window", async (t) => {
  t.mock.timers.enable({ apis: ["Date"] });
  const connectionId = `sn-cache-expiry-${Date.now()}`;
  invalidateSensenovaQuotaCache(connectionId);
  let poolCalls = 0;

  globalThis.fetch = (async (input: RequestInfo | URL) => {
    if (String(input) === SENSENOVA_TOKEN_URL) {
      return jsonResponse({ access_token: "access", refresh_token: "rotated", expires_in: 10800 });
    }
    poolCalls += 1;
    return jsonResponse(LIVE_PAYLOAD);
  }) as typeof fetch;

  const connection = { providerSpecificData: { [SENSENOVA_PSD_REFRESH_TOKEN]: "stored-refresh" } };
  await fetchSensenovaQuota(connectionId, connection);
  await fetchSensenovaQuota(connectionId, connection);
  assert.equal(poolCalls, 1, "inside the window the cached snapshot is reused");

  // The positive window is a minute, not the five seconds used for failures.
  t.mock.timers.tick(10_000);
  await fetchSensenovaQuota(connectionId, connection);
  assert.equal(poolCalls, 1, "a success stays cached past the failure window");

  t.mock.timers.tick(51_000);
  await fetchSensenovaQuota(connectionId, connection);
  assert.equal(poolCalls, 2, "past the window the fetcher reads the console again");
});

test("the console request carries the documented shape", async () => {
  const connectionId = `sn-shape-${Date.now()}`;
  invalidateSensenovaQuotaCache(connectionId);
  const seen: Array<{
    url: string;
    method?: string;
    accept?: string | null;
    referer?: string | null;
    body?: string;
  }> = [];

  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    const headers = new Headers(init?.headers);
    if (url === SENSENOVA_TOKEN_URL) {
      seen.push({ url, method: init?.method, body: String(init?.body ?? "") });
      return jsonResponse({ access_token: "access", refresh_token: "rotated", expires_in: 10800 });
    }
    seen.push({
      url,
      method: init?.method,
      accept: headers.get("Accept"),
      referer: headers.get("Referer"),
    });
    return jsonResponse(LIVE_PAYLOAD);
  }) as typeof fetch;

  await fetchSensenovaQuota(connectionId, {
    providerSpecificData: { [SENSENOVA_PSD_REFRESH_TOKEN]: "stored-refresh" },
  });

  const [tokenCall, poolCall] = seen;
  assert.equal(tokenCall.url, SENSENOVA_TOKEN_URL);
  assert.equal(tokenCall.method, "POST");
  const form = new URLSearchParams(tokenCall.body);
  assert.equal(form.get("grant_type"), "refresh_token");
  assert.equal(form.get("refresh_token"), "stored-refresh");
  assert.equal(form.get("client_id"), SENSENOVA_CLIENT_ID);

  assert.equal(poolCall.url, SENSENOVA_POOL_USAGE_URL);
  assert.equal(poolCall.method, "GET");
  assert.equal(poolCall.accept, "application/json");
  assert.equal(poolCall.referer, "https://platform.sensenova.cn/console");
});

test("a token inside the expiry margin is refreshed before use", async () => {
  const connectionId = `sn-margin-${Date.now()}`;
  invalidateSensenovaQuotaCache(connectionId);
  let tokenCalls = 0;

  const poolAuths: Array<string | null> = [];
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    if (String(input) === SENSENOVA_TOKEN_URL) {
      tokenCalls += 1;
      return jsonResponse({ access_token: "fresh", refresh_token: "rotated", expires_in: 10800 });
    }
    poolAuths.push(new Headers(init?.headers).get("Authorization"));
    return jsonResponse(LIVE_PAYLOAD);
  }) as typeof fetch;

  // 60s left is inside the 120s margin: this token must not be used.
  await fetchSensenovaQuota(connectionId, {
    providerSpecificData: {
      [SENSENOVA_PSD_ACCESS_TOKEN]: "stale",
      [SENSENOVA_PSD_ACCESS_EXPIRES_AT]: Date.now() + 60_000,
      [SENSENOVA_PSD_REFRESH_TOKEN]: "stored-refresh",
    },
  });
  assert.equal(tokenCalls, 1);
  assert.deepEqual(poolAuths, ["Bearer fresh"]);

  const otherId = `sn-margin-ok-${Date.now()}`;
  invalidateSensenovaQuotaCache(otherId);
  tokenCalls = 0;
  await fetchSensenovaQuota(otherId, {
    providerSpecificData: {
      [SENSENOVA_PSD_ACCESS_TOKEN]: "still-good",
      [SENSENOVA_PSD_ACCESS_EXPIRES_AT]: Date.now() + 600_000,
      [SENSENOVA_PSD_REFRESH_TOKEN]: "stored-refresh",
    },
  });
  assert.equal(tokenCalls, 0);
  assert.deepEqual(poolAuths, ["Bearer fresh", "Bearer still-good"]);
});

test("fetchSensenovaQuota uses a cached access token without exchanging", async () => {
  const connectionId = `sn-cached-${Date.now()}`;
  invalidateSensenovaQuotaCache(connectionId);
  let tokenCalls = 0;

  const poolAuths: Array<string | undefined> = [];

  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    if (url === SENSENOVA_TOKEN_URL) {
      tokenCalls += 1;
      return jsonResponse({ access_token: "should-not-be-used", expires_in: 10800 });
    }
    poolAuths.push(new Headers(init?.headers).get("Authorization") ?? undefined);
    return jsonResponse(LIVE_PAYLOAD);
  }) as typeof fetch;

  const quota = await fetchSensenovaQuota(connectionId, {
    providerSpecificData: {
      [SENSENOVA_PSD_ACCESS_TOKEN]: "cached-access",
      [SENSENOVA_PSD_ACCESS_EXPIRES_AT]: Date.now() + 3_600_000,
    },
  });

  assert.ok(quota);
  assert.equal(tokenCalls, 0);
  assert.deepEqual(poolAuths, ["Bearer cached-access"]);
});

test("fetchSensenovaQuota re-exchanges once when the cached token is rejected", async () => {
  const connectionId = `sn-retry-${Date.now()}`;
  invalidateSensenovaQuotaCache(connectionId);
  let poolCalls = 0;
  let tokenCalls = 0;
  const poolAuths: Array<string | undefined> = [];

  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    if (url === SENSENOVA_TOKEN_URL) {
      tokenCalls += 1;
      return jsonResponse({ access_token: "second-access", expires_in: 10800 });
    }
    poolCalls += 1;
    poolAuths.push(new Headers(init?.headers).get("Authorization") ?? undefined);
    const auth = new Headers(init?.headers).get("Authorization");
    if (auth === "Bearer second-access") {
      return jsonResponse(LIVE_PAYLOAD);
    }
    return jsonResponse({ code: 16, message: "Invalid access token" }, 401);
  }) as typeof fetch;

  const quota = await fetchSensenovaQuota(connectionId, {
    providerSpecificData: {
      [SENSENOVA_PSD_ACCESS_TOKEN]: "revoked-access",
      [SENSENOVA_PSD_ACCESS_EXPIRES_AT]: Date.now() + 3_600_000,
      [SENSENOVA_PSD_REFRESH_TOKEN]: "stored-refresh",
    },
  });

  assert.ok(quota);
  assert.equal(tokenCalls, 1);
  assert.equal(poolCalls, 2);
  assert.deepEqual(poolAuths, ["Bearer revoked-access", "Bearer second-access"]);
});

test("the retry uses the rotated refresh token, not the consumed one", async () => {
  const connectionId = `sn-rotate-${Date.now()}`;
  invalidateSensenovaQuotaCache(connectionId);
  const seenRefresh: string[] = [];

  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    if (url === SENSENOVA_TOKEN_URL) {
      const body = new URLSearchParams(String(init?.body ?? ""));
      const refresh = body.get("refresh_token") ?? "";
      seenRefresh.push(refresh);
      if (refresh === "stored-refresh") {
        return jsonResponse({
          access_token: "revoked-access",
          refresh_token: "rotated-refresh",
          expires_in: 10800,
        });
      }
      if (refresh === "rotated-refresh") {
        return jsonResponse({
          access_token: "good-access",
          refresh_token: "rotated-2",
          expires_in: 10800,
        });
      }
      return jsonResponse({ error: "invalid_grant" }, 400);
    }
    const auth = new Headers(init?.headers).get("Authorization") ?? undefined;
    return auth === "Bearer good-access"
      ? jsonResponse(LIVE_PAYLOAD)
      : jsonResponse({ code: 16, message: "Invalid access token" }, 401);
  }) as typeof fetch;

  const quota = await fetchSensenovaQuota(connectionId, {
    providerSpecificData: { [SENSENOVA_PSD_REFRESH_TOKEN]: "stored-refresh" },
  });

  assert.ok(quota);
  assert.deepEqual(seenRefresh, ["stored-refresh", "rotated-refresh"]);
});

test("a 429 from the quota endpoint does not rotate the refresh token", async () => {
  const connectionId = `sn-429-${Date.now()}`;
  invalidateSensenovaQuotaCache(connectionId);
  let tokenCalls = 0;
  let poolCalls = 0;

  globalThis.fetch = (async (input: RequestInfo | URL) => {
    if (String(input) === SENSENOVA_TOKEN_URL) {
      tokenCalls += 1;
      return jsonResponse({
        access_token: "fresh-access",
        refresh_token: "rotated",
        expires_in: 10800,
      });
    }
    poolCalls += 1;
    return jsonResponse({ code: 8, message: "too many requests" }, 429);
  }) as typeof fetch;

  const quota = await fetchSensenovaQuota(connectionId, {
    providerSpecificData: {
      [SENSENOVA_PSD_ACCESS_TOKEN]: "cached-access",
      [SENSENOVA_PSD_ACCESS_EXPIRES_AT]: Date.now() + 3_600_000,
      // A refresh token is present on purpose: if the 429 were misread as an auth
      // rejection, the code would exchange it and the counter below would move.
      [SENSENOVA_PSD_REFRESH_TOKEN]: "stored-refresh",
    },
  });

  assert.equal(quota, null);
  assert.equal(poolCalls, 1);
  assert.equal(tokenCalls, 0);
});

test("buildSensenovaQuota refuses to report a dedicated pool as the account quota", () => {
  const quota = buildSensenovaQuota({
    plan: { name: "Free Plan" },
    pools: [
      {
        id: "flash-lite",
        name: "Flash-Lite",
        pool_type: "dedicated",
        window_5h: { limit: "1000", used: "1000", remaining: "0", reset_at: 1794851140 },
      },
    ],
  });
  assert.equal(quota, null);
});

test("node matching tolerates an explicit port and a trailing dot", () => {
  registerSensenovaFetchersForNodes([
    { id: "node-port", baseUrl: "https://token.sensenova.cn:443/v1" },
    { id: "node-dot", baseUrl: "https://token.sensenova.cn./v1" },
  ]);

  for (const id of ["node-port", "node-dot"]) {
    assert.equal(getQuotaFetcher(id), fetchSensenovaQuota);
    assert.deepEqual(getQuotaWindows(id), ["5h", "7d"]);
    assert.equal(typeof getQuotaCacheInvalidator(id), "function");
  }
});

test("fetchSensenovaQuota returns null when no session is stored", async () => {
  const connectionId = `sn-empty-${Date.now()}`;
  invalidateSensenovaQuotaCache(connectionId);
  let called = false;
  globalThis.fetch = (async () => {
    called = true;
    return jsonResponse({});
  }) as typeof fetch;

  const quota = await fetchSensenovaQuota(connectionId, { providerSpecificData: {} });
  assert.equal(quota, null);
  assert.equal(called, false);
});

test("a second call inside the cache window does not hit the network", async () => {
  const connectionId = `sn-cache-${Date.now()}`;
  invalidateSensenovaQuotaCache(connectionId);
  let poolCalls = 0;

  globalThis.fetch = (async (input: RequestInfo | URL) => {
    if (String(input) === SENSENOVA_POOL_USAGE_URL) poolCalls += 1;
    return jsonResponse(LIVE_PAYLOAD);
  }) as typeof fetch;

  const connection = {
    providerSpecificData: {
      [SENSENOVA_PSD_ACCESS_TOKEN]: "cached-access",
      [SENSENOVA_PSD_ACCESS_EXPIRES_AT]: Date.now() + 3_600_000,
    },
  };
  const first = await fetchSensenovaQuota(connectionId, connection);
  const second = await fetchSensenovaQuota(connectionId, connection);

  assert.ok(first);
  assert.deepEqual(second, first);
  assert.equal(poolCalls, 1);
});

test("concurrent fetches never replay a consumed refresh token", async () => {
  const connectionId = `sn-concurrent-${Date.now()}`;
  invalidateSensenovaQuotaCache(connectionId);
  const seenRefresh: string[] = [];
  const poolAuths: (string | null)[] = [];
  let issued = 0;

  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    if (String(input) === SENSENOVA_TOKEN_URL) {
      const body = new URLSearchParams(String(init?.body ?? ""));
      seenRefresh.push(body.get("refresh_token") ?? "");
      issued += 1;
      await new Promise((resolve) => setTimeout(resolve, 40));
      return jsonResponse({
        access_token: `access-${issued}`,
        refresh_token: `rotated-${issued}`,
        expires_in: 10800,
      });
    }
    poolAuths.push(new Headers(init?.headers).get("Authorization"));
    return jsonResponse(LIVE_PAYLOAD);
  }) as typeof fetch;

  const connection = { providerSpecificData: { [SENSENOVA_PSD_REFRESH_TOKEN]: "first-refresh" } };
  const [a, b] = await Promise.all([
    fetchSensenovaQuota(connectionId, connection),
    fetchSensenovaQuota(connectionId, connection),
  ]);

  assert.ok(a);
  assert.ok(b);
  // Both callers hold the same stored token, so they share one exchange; a second
  // exchange would invalidate the first one's refresh token on the console side.
  assert.deepEqual(seenRefresh, ["first-refresh"]);
  assert.deepEqual(poolAuths, ["Bearer access-1", "Bearer access-1"]);
});
test("a 403 is a permission problem and must not rotate the credential", async () => {
  const connectionId = `sn-403-${Date.now()}`;
  invalidateSensenovaQuotaCache(connectionId);
  let tokenCalls = 0;
  let poolCalls = 0;

  globalThis.fetch = (async (input: RequestInfo | URL) => {
    if (String(input) === SENSENOVA_TOKEN_URL) {
      tokenCalls += 1;
      return jsonResponse({
        access_token: "second-access",
        refresh_token: "rotated",
        expires_in: 10800,
      });
    }
    poolCalls += 1;
    return jsonResponse({ code: 7 }, 403);
  }) as typeof fetch;

  const quota = await fetchSensenovaQuota(connectionId, {
    providerSpecificData: {
      [SENSENOVA_PSD_ACCESS_TOKEN]: "forbidden-access",
      [SENSENOVA_PSD_ACCESS_EXPIRES_AT]: Date.now() + 3_600_000,
      [SENSENOVA_PSD_REFRESH_TOKEN]: "stored-refresh",
    },
  });

  assert.equal(quota, null);
  assert.equal(poolCalls, 1, "a forbidden request is not retried");
  assert.equal(tokenCalls, 0, "rotating for a 403 would invalidate a working refresh token");
});

test("a transient failure is not cached for the full window", async (t) => {
  t.mock.timers.enable({ apis: ["Date"] });
  const connectionId = `sn-negative-${Date.now()}`;
  invalidateSensenovaQuotaCache(connectionId);
  let poolCalls = 0;

  globalThis.fetch = (async (input: RequestInfo | URL) => {
    if (String(input) === SENSENOVA_TOKEN_URL) {
      return jsonResponse({ access_token: "access", refresh_token: "rotated", expires_in: 10800 });
    }
    poolCalls += 1;
    return jsonResponse({ code: 8 }, 429);
  }) as typeof fetch;

  const connection = { providerSpecificData: { [SENSENOVA_PSD_REFRESH_TOKEN]: "stored-refresh" } };
  assert.equal(await fetchSensenovaQuota(connectionId, connection), null);
  assert.equal(await fetchSensenovaQuota(connectionId, connection), null);

  assert.equal(poolCalls, 1, "the second call inside the short window must not refetch");

  t.mock.timers.tick(31_000);
  assert.equal(await fetchSensenovaQuota(connectionId, connection), null);
  assert.equal(poolCalls, 2, "past the back-off window the fetcher must try again");
});

test("invalidation forgets both the cached quota and the rotation memory", async () => {
  const connectionId = `sn-invalidate-${Date.now()}`;
  invalidateSensenovaQuotaCache(connectionId);
  let poolCalls = 0;
  const seenRefresh: string[] = [];

  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    if (String(input) === SENSENOVA_TOKEN_URL) {
      seenRefresh.push(new URLSearchParams(String(init?.body ?? "")).get("refresh_token") ?? "");
      return jsonResponse({ access_token: "access", refresh_token: "rotated", expires_in: 10800 });
    }
    poolCalls += 1;
    return jsonResponse(LIVE_PAYLOAD);
  }) as typeof fetch;

  const connection = { providerSpecificData: { [SENSENOVA_PSD_REFRESH_TOKEN]: "first-refresh" } };
  await fetchSensenovaQuota(connectionId, connection);
  await fetchSensenovaQuota(connectionId, connection);
  assert.equal(poolCalls, 1, "second call inside the cache window must not fetch");

  invalidateSensenovaQuotaCache(connectionId);
  await fetchSensenovaQuota(connectionId, {
    providerSpecificData: { [SENSENOVA_PSD_REFRESH_TOKEN]: "operator-refresh" },
  });

  assert.equal(poolCalls, 2, "invalidation must drop the cached quota");
  assert.deepEqual(seenRefresh, ["first-refresh", "operator-refresh"]);
});

test("buildSensenovaQuota clamps an overrun and tolerates broken numbers", () => {
  const overrun = buildSensenovaQuota({
    pools: [
      {
        id: "p",
        pool_type: "default",
        window_5h: { limit: "100", used: "250", remaining: "-150", reset_at: 1794851140 },
        window_7d: { limit: "1000", used: "0", reset_at: 1794851140 },
      },
    ],
  });
  assert.ok(overrun);
  assert.equal(overrun!.percentUsed, 1);
  assert.equal(overrun!.used, 250);
  assert.equal(overrun!.limitReached, true);

  const zeroLimit = buildSensenovaQuota({
    pools: [
      {
        id: "p",
        pool_type: "default",
        window_5h: { limit: "0", used: "50", reset_at: "not-a-timestamp" },
      },
    ],
  });
  assert.ok(zeroLimit);
  assert.equal(zeroLimit!.percentUsed, 0);
  assert.equal(zeroLimit!.limitReached, false);
  assert.equal(zeroLimit!.resetAt, null);
});

test("buildSensenovaQuota ignores junk entries in the pools collection", () => {
  const quota = buildSensenovaQuota({
    pools: [
      null,
      undefined,
      "garbage",
      {
        id: "p",
        pool_type: "default",
        window_5h: { limit: "100", used: "10", reset_at: 1794851140 },
      },
    ],
  } as never);
  assert.ok(quota);
  assert.equal(quota!.percentUsed, 0.1);
});

test("buildSensenovaQuota survives a junk usage number", () => {
  const quota = buildSensenovaQuota({
    pools: [
      {
        id: "p",
        pool_type: "default",
        window_5h: { limit: "1000", used: "not-a-number", reset_at: 1794851140 },
      },
    ],
  });
  assert.ok(quota);
  assert.equal(quota!.percentUsed, 0);
  assert.equal(quota!.used, 0, "a junk counter must fall back to 0, not to any finite value");
});

test("a token exchange failure is remembered briefly", async (t) => {
  t.mock.timers.enable({ apis: ["Date"] });
  const connectionId = `sn-tokenfail-${Date.now()}`;
  invalidateSensenovaQuotaCache(connectionId);
  let tokenCalls = 0;
  let poolCalls = 0;

  globalThis.fetch = (async (input: RequestInfo | URL) => {
    if (String(input) === SENSENOVA_TOKEN_URL) {
      tokenCalls += 1;
      return jsonResponse({ error: "invalid_grant" }, 400);
    }
    poolCalls += 1;
    return jsonResponse(LIVE_PAYLOAD);
  }) as typeof fetch;

  const connection = { providerSpecificData: { [SENSENOVA_PSD_REFRESH_TOKEN]: "dead-refresh" } };
  assert.equal(await fetchSensenovaQuota(connectionId, connection), null);
  assert.equal(await fetchSensenovaQuota(connectionId, connection), null);

  assert.equal(tokenCalls, 1, "the failed exchange must not be retried inside the short window");
  assert.equal(poolCalls, 0, "no pool request without a session");

  t.mock.timers.tick(6_000);
  assert.equal(await fetchSensenovaQuota(connectionId, connection), null);
  assert.equal(tokenCalls, 2, "past the short window the exchange is retried");
});

test("a single untyped pool is treated as the account pool", () => {
  const quota = buildSensenovaQuota({
    pools: [{ id: "legacy", window_5h: { limit: "100", used: "10", reset_at: 1794851140 } }],
  });
  assert.ok(quota);
  assert.equal(quota!.percentUsed, 0.1);
});

test("buildSensenovaQuota returns null when several untyped pools leave no account pool", () => {
  const quota = buildSensenovaQuota({
    pools: [
      { id: "a", window_5h: { limit: "10", used: "1", reset_at: 1794851140 } },
      { id: "b", window_5h: { limit: "10", used: "1", reset_at: 1794851140 } },
    ],
  });
  assert.equal(quota, null);
});

test("node matching is case-insensitive", () => {
  registerSensenovaFetchersForNodes([
    { id: "node-upper", baseUrl: "https://TOKEN.SENSENOVA.CN/v1" },
  ]);
  assert.equal(getQuotaFetcher("node-upper"), fetchSensenovaQuota);
});

test("both session fields are declared as secrets at rest", () => {
  const fields = PROVIDER_SPECIFIC_SECRET_FIELDS as readonly string[];
  assert.ok(fields.includes(SENSENOVA_PSD_REFRESH_TOKEN));
  assert.ok(fields.includes(SENSENOVA_PSD_ACCESS_TOKEN));
});

test("registerSensenovaFetchersForNodes registers SenseNova nodes only", () => {
  registerSensenovaFetchersForNodes([
    { id: "node-sensenova", prefix: "snova", baseUrl: "https://token.sensenova.cn/v1" },
    { id: "node-other", prefix: "tkr", baseUrl: "https://api.tokenrouter.com/v1" },
  ]);

  registerSensenovaQuotaFetcher();

  assert.equal(getQuotaFetcher("sensenova"), fetchSensenovaQuota);
  assert.deepEqual(getQuotaWindows("sensenova"), ["5h", "7d"]);
  assert.equal(typeof getQuotaCacheInvalidator("sensenova"), "function");
  assert.equal(getQuotaFetcher("node-sensenova"), fetchSensenovaQuota);
  assert.equal(getMonitorFetcher("node-sensenova"), fetchSensenovaQuota);
  assert.equal(getQuotaCacheInvalidator("node-sensenova"), invalidateSensenovaQuotaCache);
  assert.equal(getQuotaFetcher("node-other"), undefined);
  assert.deepEqual(getQuotaWindows("node-sensenova"), ["5h", "7d"]);
});

test("registerSensenovaFetchersForNodes ignores malformed nodes", () => {
  registerSensenovaFetchersForNodes([
    { id: null, baseUrl: "https://token.sensenova.cn/v1" },
    { id: "node-no-url", baseUrl: null },
    { id: "node-bad-url", baseUrl: "not a url" },
    { id: "node-lookalike", baseUrl: "https://evil.example/?next=token.sensenova.cn" },
    { id: "node-suffix", baseUrl: "https://token.sensenova.cn.evil.example/v1" },
    { id: "node-prefix", baseUrl: "https://evil-token.sensenova.cn/v1" },
  ]);

  assert.equal(getQuotaFetcher("node-no-url"), undefined);
  assert.equal(getQuotaFetcher("node-bad-url"), undefined);
  assert.equal(getQuotaFetcher("node-lookalike"), undefined);
  assert.equal(getQuotaFetcher("node-suffix"), undefined);
  assert.equal(getQuotaFetcher("node-prefix"), undefined);
});

test("registration covers the monitor fetcher for the provider and matched nodes", () => {
  registerSensenovaQuotaFetcher();
  registerSensenovaFetchersForNodes([
    { id: "node-monitor", baseUrl: "https://token.sensenova.cn/v1" },
  ]);

  assert.equal(getMonitorFetcher("sensenova"), fetchSensenovaQuota);
  assert.equal(getMonitorFetcher("node-monitor"), fetchSensenovaQuota);
});

test("node registration registers identities, not just some function", () => {
  registerSensenovaFetchersForNodes([
    { id: "node-identity", baseUrl: "https://token.sensenova.cn/v1" },
  ]);

  assert.equal(getQuotaFetcher("node-identity"), fetchSensenovaQuota);
  assert.equal(getMonitorFetcher("node-identity"), fetchSensenovaQuota);
  assert.equal(getQuotaCacheInvalidator("node-identity"), invalidateSensenovaQuotaCache);
});

test("a default pool without any window is not reported as a quota", () => {
  const quota = buildSensenovaQuota({
    plan: { name: "Free Plan" },
    pools: [{ id: "default", pool_type: "default" }],
  });
  assert.equal(quota, null);
});

test("negative counters are clamped instead of producing a negative quota", () => {
  const quota = buildSensenovaQuota({
    pools: [
      {
        id: "default",
        pool_type: "default",
        window_5h: { limit: "100", used: "-20", reset_at: 1794851140 },
      },
    ],
  });

  assert.ok(quota);
  assert.equal(quota!.used, 0);
  assert.equal(quota!.percentUsed, 0);
  assert.equal(quota!.limitReached, false);
});

test("the plan falls back to its id when the name is missing", () => {
  const quota = buildSensenovaQuota({
    plan: { id: "plan-free" },
    pools: [
      {
        id: "default",
        pool_type: "default",
        window_5h: { limit: "10", used: "1", reset_at: 1794851140 },
      },
    ],
  });

  assert.equal(quota!.plan, "plan-free");
});

test("the refresh request carries the documented form headers", async () => {
  const connectionId = `sn-headers-${Date.now()}`;
  invalidateSensenovaQuotaCache(connectionId);
  let seen: Record<string, string> = {};

  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    if (String(input) === SENSENOVA_TOKEN_URL) {
      seen = new Headers(init?.headers).entries().reduce<Record<string, string>>((acc, [k, v]) => {
        acc[k] = v;
        return acc;
      }, {});
      return jsonResponse({ access_token: "access", refresh_token: "rotated", expires_in: 10800 });
    }
    return jsonResponse(LIVE_PAYLOAD);
  }) as typeof fetch;

  await fetchSensenovaQuota(connectionId, {
    providerSpecificData: { [SENSENOVA_PSD_REFRESH_TOKEN]: "stored-refresh" },
  });

  assert.equal(seen["content-type"], "application/x-www-form-urlencoded");
  assert.equal(seen["accept"], "application/json");
});

test("a thrown request is remembered briefly instead of hammering the console", async (t) => {
  t.mock.timers.enable({ apis: ["Date"] });
  const connectionId = `sn-throw-${Date.now()}`;
  invalidateSensenovaQuotaCache(connectionId);
  let calls = 0;

  globalThis.fetch = (async () => {
    calls += 1;
    throw new Error("network down");
  }) as typeof fetch;

  const connection = {
    providerSpecificData: {
      [SENSENOVA_PSD_ACCESS_TOKEN]: "live-token",
      [SENSENOVA_PSD_ACCESS_EXPIRES_AT]: Date.now() + 3_600_000,
    },
  };

  assert.equal(await fetchSensenovaQuota(connectionId, connection), null);
  assert.equal(calls, 1);
  assert.equal(await fetchSensenovaQuota(connectionId, connection), null);
  assert.equal(calls, 1, "the failure is cached for the short window");

  t.mock.timers.tick(31_000);
  assert.equal(await fetchSensenovaQuota(connectionId, connection), null);
  assert.equal(calls, 2, "past the back-off window the console is asked again");
});

test("a fetch that started before an invalidation does not publish its result", async () => {
  const connectionId = `sn-invalidate-${Date.now()}`;
  invalidateSensenovaQuotaCache(connectionId);
  let release: (response: Response) => void = () => {};
  const gate = new Promise<Response>((resolve) => {
    release = resolve;
  });
  let poolCalls = 0;

  globalThis.fetch = (async (input: RequestInfo | URL) => {
    if (String(input) === SENSENOVA_POOL_USAGE_URL) {
      poolCalls += 1;
      return poolCalls === 1 ? gate : jsonResponse(LIVE_PAYLOAD);
    }
    return jsonResponse(LIVE_PAYLOAD);
  }) as typeof fetch;

  const connection = {
    providerSpecificData: {
      [SENSENOVA_PSD_ACCESS_TOKEN]: "live-token",
      [SENSENOVA_PSD_ACCESS_EXPIRES_AT]: Date.now() + 3_600_000,
    },
  };

  const first = fetchSensenovaQuota(connectionId, connection);
  await new Promise((resolve) => setTimeout(resolve, 20));
  invalidateSensenovaQuotaCache(connectionId);
  release(jsonResponse(LIVE_PAYLOAD));

  assert.equal(await first, null, "the superseded fetch must not report a quota");
  const second = await fetchSensenovaQuota(connectionId, connection);
  assert.ok(second);
  assert.equal(poolCalls, 2, "the cache must be empty after the invalidation");
});

test("a token with no recorded expiry is refreshed instead of trusted forever", async () => {
  const connectionId = `sn-no-expiry-${Date.now()}`;
  invalidateSensenovaQuotaCache(connectionId);
  let tokenCalls = 0;

  globalThis.fetch = (async (input: RequestInfo | URL) => {
    if (String(input) === SENSENOVA_TOKEN_URL) {
      tokenCalls += 1;
      return jsonResponse({ access_token: "fresh", refresh_token: "rotated", expires_in: 10800 });
    }
    return jsonResponse(LIVE_PAYLOAD);
  }) as typeof fetch;

  const connection = {
    providerSpecificData: {
      [SENSENOVA_PSD_ACCESS_TOKEN]: "mystery-token",
      [SENSENOVA_PSD_REFRESH_TOKEN]: "stored-refresh",
    },
  };

  assert.ok(await fetchSensenovaQuota(connectionId, connection));
  assert.equal(tokenCalls, 1, "an unknown lifetime must not be treated as valid forever");
});

test("a failed exchange falls back to a token that has not expired yet", async () => {
  const connectionId = `sn-fallback-${Date.now()}`;
  invalidateSensenovaQuotaCache(connectionId);
  const poolAuths: (string | null)[] = [];

  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    if (String(input) === SENSENOVA_TOKEN_URL) {
      return jsonResponse({ error: "console unavailable" }, 503);
    }
    poolAuths.push(new Headers(init?.headers).get("Authorization"));
    return jsonResponse(LIVE_PAYLOAD);
  }) as typeof fetch;

  const connection = {
    providerSpecificData: {
      [SENSENOVA_PSD_ACCESS_TOKEN]: "expiring-token",
      [SENSENOVA_PSD_ACCESS_EXPIRES_AT]: Date.now() + 30_000,
      [SENSENOVA_PSD_REFRESH_TOKEN]: "stored-refresh",
    },
  };

  assert.ok(await fetchSensenovaQuota(connectionId, connection));
  assert.deepEqual(poolAuths, ["Bearer expiring-token"]);
});

test("a rejected credential is retried sooner than an unreachable console", async (t) => {
  t.mock.timers.enable({ apis: ["Date"] });
  const connectionId = `sn-split-${Date.now()}`;
  invalidateSensenovaQuotaCache(connectionId);
  let tokenCalls = 0;

  globalThis.fetch = (async (input: RequestInfo | URL) => {
    if (String(input) === SENSENOVA_TOKEN_URL) {
      tokenCalls += 1;
      return jsonResponse({ error: "invalid_grant" }, 400);
    }
    return jsonResponse(LIVE_PAYLOAD);
  }) as typeof fetch;

  const connection = { providerSpecificData: { [SENSENOVA_PSD_REFRESH_TOKEN]: "dead-refresh" } };
  assert.equal(await fetchSensenovaQuota(connectionId, connection), null);

  t.mock.timers.tick(6_000);
  assert.equal(await fetchSensenovaQuota(connectionId, connection), null);
  assert.equal(tokenCalls, 2, "a fixed credential must be picked up within seconds");
});

test("the usage adapter reports both windows with their own counters", () => {
  const quota = buildSensenovaQuota(LIVE_PAYLOAD);
  assert.ok(quota);

  const usage = toSensenovaUsage(quota!) as {
    plan: string;
    quotas: Record<
      string,
      { used: number; total: number; remaining: number; resetAt: string | null }
    >;
  };

  assert.equal(usage.plan, "Free Plan");
  assert.deepEqual(Object.keys(usage.quotas).sort(), ["5h", "7d"]);
  assert.equal(usage.quotas["5h"].total, 120000);
  assert.equal(usage.quotas["5h"].used, 30000);
  assert.equal(usage.quotas["5h"].remaining, 90000);
  assert.ok(usage.quotas["5h"].resetAt);
  assert.equal(usage.quotas["7d"].total, 1200000);
  assert.equal(usage.quotas["7d"].used, 600000);
});

test("a 429 on the post-refresh retry is cached as transient, not as an auth failure", async () => {
  const connectionId = `sn-transient-${Date.now()}`;
  invalidateSensenovaQuotaCache(connectionId);
  let poolCalls = 0;

  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    if (url === SENSENOVA_TOKEN_URL) {
      return jsonResponse({ access_token: "second-access", expires_in: 10800 });
    }
    poolCalls += 1;
    const auth = new Headers(init?.headers).get("Authorization");
    return auth === "Bearer second-access"
      ? jsonResponse({ message: "slow down" }, 429)
      : jsonResponse({ code: 16, message: "Invalid access token" }, 401);
  }) as typeof fetch;

  const connection = {
    providerSpecificData: {
      [SENSENOVA_PSD_ACCESS_TOKEN]: "revoked-access",
      [SENSENOVA_PSD_ACCESS_EXPIRES_AT]: Date.now() + 3_600_000,
      [SENSENOVA_PSD_REFRESH_TOKEN]: "stored-refresh",
    },
  };

  assert.equal(await fetchSensenovaQuota(connectionId, connection), null);
  assert.equal(poolCalls, 2);

  // Ten seconds on, a transient failure still holds the next read back (30s window). An auth
  // failure would have expired after 5s and let this call reach the console again.
  const realNow = Date.now;
  const base = realNow();
  Date.now = () => base + 10_000;
  try {
    assert.equal(await fetchSensenovaQuota(connectionId, connection), null);
    assert.equal(poolCalls, 2, "a 429 must not be re-read inside the transient window");
  } finally {
    Date.now = realNow;
  }
});

test("a refresh rejected outright is cached as an auth failure, not as transient", async () => {
  const connectionId = `sn-deadref-${Date.now()}`;
  invalidateSensenovaQuotaCache(connectionId);
  let poolCalls = 0;
  let tokenCalls = 0;

  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url === SENSENOVA_TOKEN_URL) {
      tokenCalls += 1;
      return jsonResponse({ error: "invalid_grant", message: "refresh token revoked" }, 400);
    }
    poolCalls += 1;
    return jsonResponse({ code: 16, message: "Invalid access token" }, 401);
  }) as typeof fetch;

  const connection = {
    providerSpecificData: {
      [SENSENOVA_PSD_ACCESS_TOKEN]: "revoked-access",
      [SENSENOVA_PSD_ACCESS_EXPIRES_AT]: Date.now() + 3_600_000,
      [SENSENOVA_PSD_REFRESH_TOKEN]: "dead-refresh",
    },
  };

  assert.equal(await fetchSensenovaQuota(connectionId, connection), null);
  const callsAfterFirst = poolCalls;
  assert.equal(tokenCalls, 1);

  // Six seconds on, the auth window (5s) has expired: a dead credential is re-checked, which is
  // how an operator's fix gets picked up. A transient label would have held this back for 30s.
  const realNow = Date.now;
  const base = realNow();
  Date.now = () => base + 6_000;
  try {
    assert.equal(await fetchSensenovaQuota(connectionId, connection), null);
    assert.ok(poolCalls > callsAfterFirst, "a rejected credential must be re-read after the auth window");
  } finally {
    Date.now = realNow;
  }
});

test("a token endpoint outage is cached as transient, not as an auth failure", async () => {
  const connectionId = `sn-outage-${Date.now()}`;
  invalidateSensenovaQuotaCache(connectionId);
  let tokenCalls = 0;

  globalThis.fetch = (async () => {
    tokenCalls += 1;
    throw new Error("fetch failed");
  }) as typeof fetch;

  const connection = { providerSpecificData: { [SENSENOVA_PSD_REFRESH_TOKEN]: "stored-refresh" } };

  assert.equal(await fetchSensenovaQuota(connectionId, connection), null);
  assert.equal(tokenCalls, 1);

  // Ten seconds on: an outage is still held back by the transient window. Labelling it auth
  // would have expired after 5s and re-hit a console that is already struggling.
  const realNow = Date.now;
  const base = realNow();
  Date.now = () => base + 10_000;
  try {
    assert.equal(await fetchSensenovaQuota(connectionId, connection), null);
    assert.equal(tokenCalls, 1, "an outage must not be retried inside the transient window");
  } finally {
    Date.now = realNow;
  }
});
