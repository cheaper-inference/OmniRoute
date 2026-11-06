// xKiro usage fetcher locks — GET https://api.xkiro.com/v1/usage maps ONLY
// `free_tokens` onto quotas.free_daily so the strict-zero-cost filter can
// resolve a connection's free allowance. The paid `wallet` is never read.
import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";

import { USAGE_FETCHER_PROVIDERS } from "../../../open-sse/services/usage/fetcherProviders.ts";
import { getUsageForProvider } from "../../../open-sse/services/usage.ts";
import { __testing } from "../../../open-sse/services/autoCombo/freeAccessQuota.ts";
import { type UsageQuota } from "../../../open-sse/services/usage/quota.ts";
import { connectionProxyTestOverride } from "../../../open-sse/services/connectionProxyFetch.ts";

const X = await import("../../../open-sse/services/usage/xkiro.ts");

const resolvedConnections: string[] = [];
// Installed per test: other files sharing the process clear the override in their own hooks.
beforeEach(() => {
  connectionProxyTestOverride.resolveProxyForConnection = async (connectionId) => {
    resolvedConnections.push(connectionId);
    return null;
  };
});
afterEach(() => {
  connectionProxyTestOverride.resolveProxyForConnection = null;
});

type Result = { plan?: string; quotas?: Record<string, UsageQuota>; message?: string };

async function withFetch(body: unknown, status: number, run: () => Promise<void>) {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(typeof body === "string" ? body : JSON.stringify(body), {
      status,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;
  try {
    await run();
  } finally {
    globalThis.fetch = originalFetch;
  }
}

const usage = (freeTokens: unknown, wallet: unknown = { balance_usd: "1.000000" }) => ({
  free_tokens: freeTokens,
  wallet,
});

test("xkiro is registered as a usage fetcher provider and dispatched", async () => {
  assert.ok((USAGE_FETCHER_PROVIDERS as readonly string[]).includes("xkiro"));
  await withFetch(
    usage({ used_today: 100, limit_per_day: 1000, remaining: 900 }),
    200,
    async () => {
      const r = (await getUsageForProvider({
        id: "conn-1",
        provider: "xkiro",
        apiKey: "k",
      } as never)) as Result;
      assert.equal(r.quotas?.free_daily?.remaining, 900);
    }
  );
});

test("free headroom maps to quotas.free_daily and is SAFE for the strict filter", async () => {
  await withFetch(
    usage({ used_today: 100, limit_per_day: 1000, remaining: 900 }),
    200,
    async () => {
      const r = (await X.getXkiroUsage("conn-1", "k")) as Result;
      assert.deepEqual(Object.keys(r.quotas ?? {}), ["free_daily"]);
      const q = r.quotas!.free_daily;
      assert.equal(q.used, 100);
      assert.equal(q.total, 1000);
      assert.equal(q.remaining, 900);
      assert.equal(q.remainingPercentage, 90);
      assert.equal(q.unlimited, false);
      assert.equal(__testing.extractRemainingAllowance(r), 90);
    }
  );
});

test("zero free remaining stays exhausted even with a positive paid wallet", async () => {
  await withFetch(
    usage({ used_today: 1000, limit_per_day: 1000, remaining: 0 }, { balance_usd: "25.000000" }),
    200,
    async () => {
      const r = (await X.getXkiroUsage("conn-1", "k")) as Result;
      assert.equal(r.quotas?.free_daily?.remaining, 0);
      assert.equal(__testing.extractRemainingAllowance(r), 0);
    }
  );
});

test("the Free plan's 5M/day allowance parses, including string-encoded numbers", async () => {
  await withFetch(
    usage({ used_today: "1250000", limit_per_day: "5000000", remaining: "3750000" }),
    200,
    async () => {
      const r = (await X.getXkiroUsage("conn-1", "k")) as Result;
      assert.equal(r.quotas?.free_daily?.total, 5_000_000);
      assert.equal(r.quotas?.free_daily?.remaining, 3_750_000);
      assert.equal(__testing.extractRemainingAllowance(r), 75);
    }
  );
});

test("a last request overshooting the daily limit reads as exhausted, not unknown", async () => {
  await withFetch(
    usage({ used_today: 5_000_123, limit_per_day: 5_000_000, remaining: 0 }),
    200,
    async () => {
      const r = (await X.getXkiroUsage("conn-1", "k")) as Result;
      assert.equal(r.quotas?.free_daily?.remaining, 0);
      assert.equal(r.quotas?.free_daily?.remainingPercentage, 0);
      assert.equal(__testing.extractRemainingAllowance(r), 0);
    }
  );
});

test("missing, malformed, unbounded or inconsistent free allowance fails closed", async () => {
  const bad: unknown[] = [
    { wallet: { balance_usd: "5.000000" } },
    usage(null),
    usage({ used_today: 1, limit_per_day: null, remaining: 5 }),
    usage({ used_today: 1, limit_per_day: 0, remaining: 0 }),
    usage({ used_today: 1, limit_per_day: -5, remaining: 3 }),
    usage({ used_today: "x", limit_per_day: 1000, remaining: 900 }),
    usage({ used_today: 100, limit_per_day: 1000, remaining: 2000 }),
    usage({ used_today: 100, limit_per_day: 1000, remaining: 100 }),
    usage({ used_today: 100, limit_per_day: 1000, remaining: -1 }),
    "not json",
  ];
  for (const body of bad) {
    await withFetch(body, 200, async () => {
      const r = (await X.getXkiroUsage("conn-1", "k")) as Result;
      assert.deepEqual(r.quotas ?? {}, {}, JSON.stringify(body));
      assert.equal(__testing.extractRemainingAllowance(r), null);
    });
  }
});

test("missing key and failed HTTP return no quotas", async () => {
  const noKey = (await X.getXkiroUsage("conn-1", "")) as Result;
  assert.deepEqual(noKey.quotas ?? {}, {});
  for (const status of [401, 403, 500]) {
    await withFetch({ error: "x" }, status, async () => {
      const r = (await X.getXkiroUsage("conn-1", "k")) as Result;
      assert.deepEqual(r.quotas ?? {}, {});
    });
  }
});

test("each connection is read with its own key and proxy (account isolation)", async () => {
  resolvedConnections.length = 0;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (_url: unknown, init?: RequestInit) => {
    const auth = (init?.headers as Record<string, string>).Authorization;
    const remaining = auth === "Bearer rich" ? 900 : 0;
    return new Response(
      JSON.stringify(usage({ used_today: 1000 - remaining, limit_per_day: 1000, remaining })),
      { status: 200 }
    );
  }) as typeof fetch;
  try {
    const a = (await X.getXkiroUsage("conn-a", "rich")) as Result;
    const b = (await X.getXkiroUsage("conn-b", "poor")) as Result;
    assert.equal(a.quotas?.free_daily?.remaining, 900);
    assert.equal(b.quotas?.free_daily?.remaining, 0);
    assert.deepEqual(resolvedConnections, ["conn-a", "conn-b"]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
