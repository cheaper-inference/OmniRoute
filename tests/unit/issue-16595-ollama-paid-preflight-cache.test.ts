import test from "node:test";
import assert from "node:assert/strict";
import { parseOllamaCloudBalance } from "../../open-sse/services/ollamaCloudBalance.ts";
import {
  fetchGenericQuota,
  invalidateGenericQuotaCache,
  __setGenericUsageFetcherForTests,
  __resetGenericQuotaFetcherForTests,
} from "../../open-sse/services/genericQuotaFetcher.ts";

import { getQuotaWindows, registerQuotaWindows } from "../../open-sse/services/quotaPreflight.ts";

const connection = { id: "paid-cache", provider: "ollama-cloud" };
function usage(purchased = 25) {
  return {
    quotas: parseOllamaCloudBalance({
      included: { balance_usd: 0, allowance_usd: 100 },
      purchased: { balance_usd: purchased },
    }),
  };
}
const read = () => fetchGenericQuota(connection.id, connection);
test.afterEach(() => {
  __setGenericUsageFetcherForTests(null);
  __resetGenericQuotaFetcherForTests();
});

test("confirmed paid observation reuses null headroom within the existing cache TTL", async () => {
  let calls = 0;
  __setGenericUsageFetcherForTests(async () => {
    calls++;
    return usage();
  });
  assert.equal(await read(), null);
  assert.equal(await read(), null);
  assert.equal(calls, 1);
});

test("paid observation expires after 60 seconds without inventing an unlimited quota", async (t) => {
  let now = Date.now();
  t.mock.method(Date, "now", () => now);
  let calls = 0;
  __setGenericUsageFetcherForTests(async () => {
    calls++;
    return usage();
  });
  assert.equal(await read(), null);
  now += 59_999;
  assert.equal(await read(), null);
  assert.equal(calls, 1);
  now += 2;
  assert.equal(await read(), null);
  assert.equal(calls, 2);
});

test("invalidation forces a fresh paid-balance read and observes exhausted credits", async () => {
  let calls = 0;
  const refreshFlags: Array<boolean | undefined> = [];
  __setGenericUsageFetcherForTests(async (_connection, options) => {
    calls++;
    refreshFlags.push(options?.forceRefresh);
    return usage(calls === 1 ? 25 : 0);
  });
  assert.equal(await read(), null);
  assert.equal(await read(), null);
  assert.equal(calls, 1);
  invalidateGenericQuotaCache(connection.provider, connection.id);
  assert.equal((await read())?.limitReached, true);
  assert.equal(calls, 2);
  assert.deepEqual(refreshFlags, [undefined, true]);
});

test("a concurrent 429 prevents an in-flight paid observation from repopulating the cache", async (t) => {
  let now = Date.now();
  t.mock.method(Date, "now", () => now);
  let calls = 0;
  const refreshFlags: Array<boolean | undefined> = [];
  __setGenericUsageFetcherForTests(async (_connection, options) => {
    calls++;
    refreshFlags.push(options?.forceRefresh);
    if (calls === 1) {
      now++;
      invalidateGenericQuotaCache(connection.provider, connection.id);
      return usage();
    }
    return usage(0);
  });
  assert.equal(await read(), null);
  assert.equal((await read())?.limitReached, true);
  assert.equal(calls, 2);
  assert.deepEqual(refreshFlags, [undefined, true]);
});

test("transport failures and unverified missing fractions are not cached as paid observations", async () => {
  const unknowns = [
    undefined,
    { message: "unavailable" },
    { quotas: {} },
    {
      quotas: { credits: { remaining: 25, currency: "USD", ollamaApiBalance: false } },
    },
  ];
  for (const value of unknowns) {
    __resetGenericQuotaFetcherForTests();
    let calls = 0;
    __setGenericUsageFetcherForTests(async () => {
      calls++;
      return value;
    });
    assert.equal(await read(), null);
    assert.equal(await read(), null);
    assert.equal(calls, 2);
  }
  __resetGenericQuotaFetcherForTests();
  let calls = 0;
  __setGenericUsageFetcherForTests(async () => {
    calls++;
    throw new Error("network unavailable");
  });
  assert.equal(await read(), null);
  assert.equal(await read(), null);
  assert.equal(calls, 2);
});

test("a successful forced paid observation clears the refresh flag and is reusable", async (t) => {
  let now = Date.now();
  t.mock.method(Date, "now", () => now);
  let calls = 0;
  const refreshFlags: Array<boolean | undefined> = [];
  __setGenericUsageFetcherForTests(async (_connection, options) => {
    calls++;
    refreshFlags.push(options?.forceRefresh);
    return usage();
  });
  invalidateGenericQuotaCache(connection.provider, connection.id);
  assert.equal(await read(), null);
  now += 60_001;
  assert.equal(await read(), null);
  assert.equal(await read(), null);
  assert.equal(calls, 2);
  assert.deepEqual(refreshFlags, [true, undefined]);
});

test("paid observations preserve the provider window catalog for other connections", async () => {
  registerQuotaWindows(connection.provider, ["monthly"]);
  __setGenericUsageFetcherForTests(async () => usage());
  assert.equal(await read(), null);
  assert.deepEqual(getQuotaWindows(connection.provider), ["monthly"]);
});
