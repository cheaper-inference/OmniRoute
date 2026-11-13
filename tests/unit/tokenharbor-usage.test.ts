// TokenHarbor usage fetcher locks — registration on every quota list, the no-key /
// 401 messages, and the mapping of GET /api/cli/free-tier + /api/cli/balance
// (live-verified 2026-11-14): weekly :free allowance, Pass window, USD balance.
import { test } from "node:test";
import assert from "node:assert/strict";

import { USAGE_SUPPORTED_PROVIDERS } from "../../src/shared/constants/providers.ts";
import { USAGE_FETCHER_PROVIDERS } from "../../open-sse/services/usage.ts";

const T = await import("../../open-sse/services/usage/tokenharbor.ts");

const FREE_TIER = {
  plan_name: "Agent Pass",
  on_plan: true,
  activated: true,
  used_pct: 100,
  exhausted: true,
  reset_at: "2026-11-20T08:10:35.43+00:00",
  plan_used_pct: 43,
  plan_exhausted: false,
  period_ends_at: "2026-11-20T08:10:35.43+00:00",
};

function mockFetch(routes: Record<string, () => Response>) {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (url: string | URL) => {
    const path = new URL(String(url)).pathname;
    return routes[path]?.() ?? new Response("{}", { status: 404 });
  }) as typeof fetch;
  return () => {
    globalThis.fetch = originalFetch;
  };
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

test("tokenharbor is registered as a usage provider", () => {
  assert.ok(USAGE_SUPPORTED_PROVIDERS.includes("tokenharbor"));
  assert.ok((USAGE_FETCHER_PROVIDERS as readonly string[]).includes("tokenharbor"));
});

test("getTokenHarborUsage returns a friendly message when the api key is missing", async () => {
  const r = (await T.getTokenHarborUsage("")) as { message?: string };
  assert.match(r.message ?? "", /TokenHarbor API key not available/);
});

test("getTokenHarborUsage surfaces invalid-key message on 401", async () => {
  const restore = mockFetch({ "/api/cli/free-tier": () => json({}, 401) });
  try {
    const r = (await T.getTokenHarborUsage("k")) as { message?: string };
    assert.match(r.message ?? "", /Invalid TokenHarbor API key/);
  } finally {
    restore();
  }
});

test("getTokenHarborUsage maps free allowance, Pass window and USD balance", async () => {
  const restore = mockFetch({
    "/api/cli/free-tier": () => json(FREE_TIER),
    "/api/cli/balance": () => json({ account_email: "x@y.z", balance_usd: 2.5, paid_usd: 0 }),
  });
  try {
    const r = (await T.getTokenHarborUsage("k")) as {
      plan?: string;
      quotas?: Record<string, { remainingPercentage?: number; resetAt: string | null; remaining?: number; currency?: string; displayName?: string }>;
    };
    assert.equal(r.plan, "Agent Pass");
    assert.equal(r.quotas?.free?.remainingPercentage, 0);
    assert.equal(r.quotas?.free?.resetAt, "2026-11-20T08:10:35.430Z");
    assert.equal(r.quotas?.pass?.remainingPercentage, 57);
    assert.equal(r.quotas?.pass?.displayName, "Agent Pass");
    assert.equal(r.quotas?.credits_usd?.remaining, 2.5);
    assert.equal(r.quotas?.credits_usd?.currency, "USD");
    assert.doesNotMatch(JSON.stringify(r), /x@y\.z/);
  } finally {
    restore();
  }
});

test("getTokenHarborUsage keeps free/Pass quotas when the balance call fails, and skips Pass off-plan", async () => {
  const restore = mockFetch({
    "/api/cli/free-tier": () => json({ ...FREE_TIER, on_plan: false, used_pct: 30 }),
    "/api/cli/balance": () => json({}, 500),
  });
  try {
    const r = (await T.getTokenHarborUsage("k")) as { plan?: string; quotas?: Record<string, { remainingPercentage?: number }> };
    assert.equal(r.plan, "Free");
    assert.equal(r.quotas?.free?.remainingPercentage, 70);
    assert.equal(r.quotas?.pass, undefined);
    assert.equal(r.quotas?.credits_usd, undefined);
  } finally {
    restore();
  }
});
