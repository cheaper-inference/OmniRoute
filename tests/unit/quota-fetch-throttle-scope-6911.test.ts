/**
 * Regression test for #6911: OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS was only
 * wired into codexQuotaFetcher.ts even though quotaFetchThrottle.ts documents
 * itself as "used by the provider quota fetchers" (plural). This asserts the
 * shared throttle is now honored by fetchDeepseekQuota, fetchBailianQuota
 * (both fetch sites), fetchOpencodeQuota, and fetchCrofUsage — and that cache
 * hits are never delayed (only genuine upstream network calls are throttled).
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  fetchDeepseekQuota,
  invalidateDeepseekQuotaCache,
} from "../../open-sse/services/deepseekQuotaFetcher.ts";
import {
  fetchBailianQuota,
  invalidateBailianQuotaCache,
} from "../../open-sse/services/bailianQuotaFetcher.ts";
import {
  fetchOpencodeQuota,
  invalidateOpencodeQuotaCache,
} from "../../open-sse/services/opencodeQuotaFetcher.ts";
import {
  fetchCrofUsage,
  invalidateCrofUsageCache,
} from "../../open-sse/services/crofUsageFetcher.ts";
import { resetQuotaFetchThrottle } from "../../open-sse/services/quotaFetchThrottle.ts";
import {
  connectionProxyTestOverride,
  fetchWithConnectionProxy,
} from "../../open-sse/services/connectionProxyFetch.ts";

// Timing margins (2026-10-18). The throttle spaces each acquire() by the interval plus up to
// 120 ms of jitter, but this file measures at the mocked fetch, so whatever the process does
// between acquire() and fetch is inside the window. On a loaded runner a 30-50 ms scheduling
// hiccup on the first call alone shrank a 200 ms spacing to 168 ms (seen with the JON-562 heap
// snapshot suite running in parallel). A wider interval keeps 100 ms of slack while an
// unthrottled pair still lands within a few ms of each other, and a cache hit that waited on
// the throttle would still take at least the full interval.
const MIN_INTERVAL_MS = 400;
const MIN_SPREAD_MS = 300;
const MAX_CACHE_HIT_MS = 150;

const originalFetch = globalThis.fetch;
const originalEnv = process.env.OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS;

// Since #15885 every fetcher calls fetchWithConnectionProxy() between the throttle's acquire()
// and the upstream fetch. The first call of the process pays one-time costs inside that window:
// it lazily imports the proxy transport and the error helpers, then imports the DB settings
// module and opens SQLite with every migration to look up the connection's proxy (3-5 s on the
// 2026-10-18 tip). The second call, released 200 ms later, waits on the same imports, so both
// fetches left together (spread 20-50 ms) and the first test of this file failed whatever the
// throttle did. This file measures the throttle, not that start-up: answer "no proxy assigned"
// without the database, as the proxy suites do, and pay the lazy imports once before any timing.
test.before(async () => {
  connectionProxyTestOverride.resolveProxyForConnection = async () => null;
  const fetchBeforeWarmup = globalThis.fetch;
  await fetchWithConnectionProxy("warmup-6911", "https://warmup.invalid/", undefined, {
    fetchFn: (async () => new Response("{}", { status: 200 })) as typeof fetch,
  });
  globalThis.fetch = fetchBeforeWarmup; // importing the transport installs its interceptor
});

test.after(() => {
  connectionProxyTestOverride.resolveProxyForConnection = null;
});

test.beforeEach(() => {
  process.env.OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS = String(MIN_INTERVAL_MS);
  resetQuotaFetchThrottle();
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalEnv === undefined) {
    delete process.env.OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS;
  } else {
    process.env.OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS = originalEnv;
  }
  resetQuotaFetchThrottle();
});

const deepseekBody = {
  is_available: true,
  balance_infos: [{ currency: "USD", total_balance: "10.00" }],
};

const bailianBody = {
  code: "Success",
  data: {
    codingPlanInstanceInfos: [
      {
        planName: "Qwen3 Coder Next",
        codingPlanQuotaInfo: {
          per5HourUsedQuota: 50,
          per5HourTotalQuota: 100,
          per5HourQuotaNextRefreshTime: 1718304000,
          perWeekUsedQuota: 30,
          perWeekTotalQuota: 100,
          perWeekQuotaNextRefreshTime: 1718563200,
          perBillMonthUsedQuota: 20,
          perBillMonthTotalQuota: 100,
          perBillMonthQuotaNextRefreshTime: 1719772800,
        },
      },
    ],
  },
};

const opencodeBody = {
  quota: {
    window_5h: { used: 1, limit: 10 },
  },
};

const crofBody = { usable_requests: 99, credits: 1.5 };

async function assertSpacedByThrottle(
  label: string,
  responseBody: unknown,
  fetchTwice: (idA: string, idB: string) => Promise<unknown[]>
): Promise<void> {
  const callStarts: number[] = [];
  const t0 = Date.now();
  globalThis.fetch = (async () => {
    callStarts.push(Date.now() - t0);
    return new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;

  await fetchTwice(`${label}-a-${Date.now()}`, `${label}-b-${Date.now()}`);

  assert.equal(callStarts.length, 2, `${label}: expected 2 upstream calls`);
  const spread = Math.abs(callStarts[1] - callStarts[0]);
  assert.ok(
    spread >= MIN_SPREAD_MS,
    `${label}: calls were NOT spaced by the shared throttle (spread=${spread}ms, expected >=${MIN_SPREAD_MS}ms)`
  );
}

test("#6911 fetchDeepseekQuota is spaced by the shared quota-fetch throttle", async () => {
  await assertSpacedByThrottle("deepseek", deepseekBody, (idA, idB) =>
    Promise.all([
      fetchDeepseekQuota(idA, { apiKey: "sk-a" }),
      fetchDeepseekQuota(idB, { apiKey: "sk-b" }),
    ])
  );
});

test("#6911 fetchBailianQuota (primary site) is spaced by the shared quota-fetch throttle", async () => {
  await assertSpacedByThrottle("bailian", bailianBody, (idA, idB) =>
    Promise.all([
      fetchBailianQuota(idA, { apiKey: "sk-a" }),
      fetchBailianQuota(idB, { apiKey: "sk-b" }),
    ])
  );
});

test("#6911 fetchOpencodeQuota is spaced by the shared quota-fetch throttle", async () => {
  await assertSpacedByThrottle("opencode", opencodeBody, (idA, idB) =>
    Promise.all([
      fetchOpencodeQuota(idA, { apiKey: "sk-a" }),
      fetchOpencodeQuota(idB, { apiKey: "sk-b" }),
    ])
  );
});

test("#6911 fetchCrofUsage is spaced by the shared quota-fetch throttle", async () => {
  await assertSpacedByThrottle("crof", crofBody, (idA, idB) =>
    Promise.all([fetchCrofUsage(idA, { apiKey: "sk-a" }), fetchCrofUsage(idB, { apiKey: "sk-b" })])
  );
});

test("#6911 cache hits are never delayed by the shared quota-fetch throttle", async () => {
  const connectionId = `deepseek-cache-${Date.now()}`;
  let calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    return new Response(JSON.stringify(deepseekBody), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;

  invalidateDeepseekQuotaCache(connectionId);
  const t0 = Date.now();
  await fetchDeepseekQuota(connectionId, { apiKey: "sk-cache" });
  const secondStart = Date.now();
  const second = await fetchDeepseekQuota(connectionId, { apiKey: "sk-cache" });
  const secondElapsed = Date.now() - secondStart;

  assert.equal(calls, 1, "second call should be served from cache, not hit the network");
  assert.ok(second !== null);
  assert.ok(
    secondElapsed < MAX_CACHE_HIT_MS,
    `cache-hit path should not be delayed by the throttle (took ${secondElapsed}ms, t0=${t0})`
  );

  invalidateDeepseekQuotaCache(connectionId);
});

test("#6911 fetchBailianQuota China-region retry fetch is also throttled", async () => {
  const callStarts: number[] = [];
  const t0 = Date.now();
  let call = 0;
  globalThis.fetch = (async () => {
    callStarts.push(Date.now() - t0);
    call += 1;
    if (call === 1) {
      return new Response(JSON.stringify({ code: "ConsoleNeedLogin" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    return new Response(JSON.stringify(bailianBody), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;

  const connectionId = `bailian-retry-${Date.now()}`;
  await fetchBailianQuota(connectionId, { apiKey: "sk-retry" });

  assert.equal(callStarts.length, 2, "expected primary + China-region retry fetch");
  const spread = Math.abs(callStarts[1] - callStarts[0]);
  assert.ok(
    spread >= MIN_SPREAD_MS,
    `China-region retry fetch was NOT spaced by the shared throttle (spread=${spread}ms)`
  );

  invalidateBailianQuotaCache(connectionId);
});
