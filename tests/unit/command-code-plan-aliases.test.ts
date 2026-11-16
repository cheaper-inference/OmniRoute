import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";

const { __testing } = await import("../../open-sse/services/usage.ts");
const { getCommandCodeUsage } = __testing;

// The /alpha/billing endpoints can report short plan ids (go, ultra, teams-pro)
// and every known plan has a fixed monthly credit cap. The fetcher only knew the
// long individual-* ids and derived the credits total from period spend, so a
// short id showed a raw name and a capped plan showed a nonsense total whenever
// the usage summary lagged the credit pools.

const originalFetch = globalThis.fetch;

type QuotaShape = { used: number; total: number; remaining?: number };

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

const CREDITS = {
  credits: { monthlyCredits: 4, purchasedCredits: 0, freeCredits: 0 },
  windowLimits: {},
};
const WHOAMI = { success: true, user: { id: "u1" }, org: null };

function subscription(planId: string) {
  return {
    success: true,
    data: {
      planId,
      currentPeriodStart: "2026-11-01T00:00:00.000Z",
      currentPeriodEnd: "2026-11-30T00:00:00.000Z",
    },
  };
}

const SUMMARY = { totalCost: 0 };

function installMockFetch(planId: string) {
  globalThis.fetch = async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.includes("/alpha/whoami")) return jsonResponse(WHOAMI);
    if (url.includes("/alpha/billing/credits")) return jsonResponse(CREDITS);
    if (url.includes("/alpha/billing/subscriptions")) return jsonResponse(subscription(planId));
    if (url.includes("/alpha/usage/summary")) return jsonResponse(SUMMARY);
    return jsonResponse({ error: `unhandled fetch: ${url}` }, 500);
  };
}

describe("Command Code short plan ids and credit caps", () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("maps the short id 'go' to the Go plan and its 10-credit cap", async () => {
    installMockFetch("go");
    const r = (await getCommandCodeUsage("cc-key")) as {
      plan?: string;
      quotas?: { credits?: QuotaShape };
    };
    assert.match(r.plan || "", /Go/);
    assert.ok(!/individual/i.test(r.plan || ""), `plan should be humanized, got ${r.plan}`);
    assert.equal(r.quotas?.credits?.total, 10);
    assert.equal(r.quotas?.credits?.used, 6); // 10 cap - 4 remaining
  });

  it("maps 'ultra' to its 300-credit cap", async () => {
    installMockFetch("ultra");
    const r = (await getCommandCodeUsage("cc-key")) as {
      quotas?: { credits?: QuotaShape };
    };
    assert.equal(r.quotas?.credits?.total, 300);
    assert.equal(r.quotas?.credits?.used, 296);
  });

  it("maps 'teams-pro' to the team-pro 40-credit cap", async () => {
    installMockFetch("teams-pro");
    const r = (await getCommandCodeUsage("cc-key")) as {
      plan?: string;
      quotas?: { credits?: QuotaShape };
    };
    assert.match(r.plan || "", /Team Pro/);
    assert.equal(r.quotas?.credits?.total, 40);
    assert.equal(r.quotas?.credits?.used, 36);
  });

  it("a plan without a known cap keeps the spend-derived total", async () => {
    installMockFetch("individual-max-10x");
    const r = (await getCommandCodeUsage("cc-key")) as {
      quotas?: { credits?: QuotaShape };
    };
    assert.equal(r.quotas?.credits?.total, 4); // periodUsed 0 + remaining 4
    assert.equal(r.quotas?.credits?.used, 0);
  });
});
