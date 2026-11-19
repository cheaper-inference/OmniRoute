import test from "node:test";
import assert from "node:assert/strict";

import {
  getInfCodeUsage,
  mapInfCodeQuotas,
  resolveInfCodeQuotasUrl,
} from "../../open-sse/services/usage/infcode.ts";
import { getUsageForProvider, USAGE_FETCHER_PROVIDERS } from "../../open-sse/services/usage.ts";
import { USAGE_SUPPORTED_PROVIDERS } from "../../open-sse/services/usage/supportedProviders.ts";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  delete process.env.INF_CODE_USER_CENTER_BASE;
});

// Abridged payload captured from the Token Infinity user center on 2026-11-05
// (data_mode: "live"). Credit amounts are decimal strings upstream.
const LIVE_PAYLOAD = {
  meta: {
    scope: { scope_type: "user", scope_id: "31fcfece-cd5d-4f9e-bbbc-48d2251e8466" },
    timezone: "Asia/Shanghai",
    data_mode: "live",
    completeness: "complete",
    currency: "CNY",
    warnings: [],
  },
  user_id: "31fcfece-cd5d-4f9e-bbbc-48d2251e8466",
  credit_usage: {
    seat: {
      metric_id: "credit.seat_usage_rate",
      basis: "current_seat_cycle",
      seat_cycle: {
        seat_id: "seat_21250532fa974f15a8df548b323dd150",
        state: "active",
        start_at: "2026-11-03T16:00:00Z",
        end_at: "2026-12-04T16:00:00Z",
      },
      status: "available",
      used_credits: "376.0882",
      total_credits: "14600",
      remaining_credits: "14223.9118",
      unit: "credit",
      usage_rate: 0.025759465753424658,
      state: "safe",
      period: null,
    },
    shared_pool: {
      metric_id: "credit.shared_pool_usage_rate",
      status: "available",
      used_credits: "0",
      total_credits: "0",
      remaining_credits: "0",
      unit: "credit",
      usage_rate: 0,
      state: "safe",
      period: { type: "billing_cycle", from: "2026-11-01", to: "2026-12-01" },
    },
    package: {
      metric_id: "credit.package_usage_rate",
      status: "available",
      used_credits: "0",
      total_credits: "0",
      remaining_credits: "0",
      unit: "credit",
      usage_rate: 0,
      state: "safe",
      period: { type: "billing_cycle", from: "2026-11-01", to: "2026-12-01" },
    },
    subject_limit: {
      subject_type: "user",
      status: "available",
      limit_enabled: false,
      limit_credits: null,
      used_credits: "0",
      remaining_credits: null,
      state: null,
    },
  },
  links: { tokenhub_console: "https://tokenhub.infplacex.com/console" },
};

function mockFetch(status: number, body: unknown, calls: Array<{ url: string; auth?: string }>) {
  globalThis.fetch = (async (url: string | URL, init?: RequestInit) => {
    const headers = (init?.headers ?? {}) as Record<string, string>;
    calls.push({ url: String(url), auth: headers.Authorization });
    return new Response(JSON.stringify(body), { status });
  }) as typeof fetch;
}

test("resolves the user-center quotas URL, honoring the env override", () => {
  assert.equal(
    resolveInfCodeQuotasUrl(),
    "https://infone.tokensinfinity.com/api/user_center/v1/dashboard/personal/quotas"
  );

  process.env.INF_CODE_USER_CENTER_BASE = "https://infone-acme.tokensinfinity.com/";
  assert.equal(
    resolveInfCodeQuotasUrl(),
    "https://infone-acme.tokensinfinity.com/api/user_center/v1/dashboard/personal/quotas"
  );

  // A private deployment can also pin the host per connection.
  assert.equal(
    resolveInfCodeQuotasUrl("https://infone-other.tokensinfinity.com"),
    "https://infone-other.tokensinfinity.com/api/user_center/v1/dashboard/personal/quotas"
  );
});

test("maps seat credits onto a used/total quota with the seat-cycle reset", () => {
  const quotas = mapInfCodeQuotas(LIVE_PAYLOAD);

  assert.deepEqual(Object.keys(quotas), ["seat_credits"]);

  const seat = quotas.seat_credits;
  assert.equal(seat.displayName, "Seat credits");
  assert.equal(seat.used, 376.0882);
  assert.equal(seat.total, 14600);
  assert.equal(seat.remaining, 14223.9118);
  assert.equal(seat.unlimited, false);
  assert.ok(Math.abs((seat.remainingPercentage ?? 0) - 97.424) < 0.01);
  assert.equal(seat.resetAt, "2026-12-04T16:00:00.000Z");
});

test("zero-total pools are dropped instead of rendering as exhausted quotas", () => {
  const quotas = mapInfCodeQuotas({
    credit_usage: {
      seat: { status: "available", used_credits: "1", total_credits: "10", remaining_credits: "9" },
      shared_pool: { status: "available", used_credits: "0", total_credits: "0" },
      package: { status: "unavailable", used_credits: "0", total_credits: "50" },
    },
  });

  assert.deepEqual(Object.keys(quotas), ["seat_credits"]);
});

test("shared pool and package surface when the account actually has them", () => {
  const quotas = mapInfCodeQuotas({
    credit_usage: {
      seat: { status: "available", used_credits: "1", total_credits: "10" },
      shared_pool: {
        status: "available",
        used_credits: "25",
        total_credits: "100",
        period: { to: "2026-12-01" },
      },
      package: { status: "available", used_credits: "5", total_credits: "50" },
      subject_limit: {
        limit_enabled: true,
        limit_credits: "80",
        used_credits: "30",
      },
    },
  });

  assert.deepEqual(Object.keys(quotas), [
    "seat_credits",
    "shared_pool_credits",
    "package_credits",
    "personal_limit_credits",
  ]);
  assert.equal(quotas.shared_pool_credits.total, 100);
  assert.equal(quotas.shared_pool_credits.remaining, 75);
  assert.equal(quotas.shared_pool_credits.resetAt, "2026-12-01T00:00:00.000Z");
  assert.equal(quotas.personal_limit_credits.remaining, 50);
});

test("fetches the endpoint with the OAuth bearer token", async () => {
  const calls: Array<{ url: string; auth?: string }> = [];
  mockFetch(200, LIVE_PAYLOAD, calls);

  const result = (await getInfCodeUsage("session-token")) as {
    plan: string;
    quotas: Record<string, { used: number }>;
    limitReached: boolean;
  };

  assert.equal(calls.length, 1);
  assert.equal(
    calls[0].url,
    "https://infone.tokensinfinity.com/api/user_center/v1/dashboard/personal/quotas"
  );
  assert.equal(calls[0].auth, "Bearer session-token");
  assert.equal(result.plan, "InfCode");
  assert.equal(result.limitReached, false);
  assert.equal(result.quotas.seat_credits.used, 376.0882);
});

test("an exhausted seat reports limitReached so preflight can skip the account", async () => {
  mockFetch(
    200,
    {
      credit_usage: {
        seat: { status: "available", used_credits: "14600", total_credits: "14600" },
      },
    },
    []
  );

  const result = (await getInfCodeUsage("t")) as { limitReached: boolean; isAvailable: boolean };
  assert.equal(result.limitReached, true);
  assert.equal(result.isAvailable, false);
});

test("missing token and auth failures surface as messages, not quotas", async () => {
  const calls: Array<{ url: string; auth?: string }> = [];
  mockFetch(200, LIVE_PAYLOAD, calls);

  const missing = (await getInfCodeUsage()) as { message?: string; quotas?: unknown };
  assert.equal(calls.length, 0);
  assert.equal(missing.quotas, undefined);
  assert.match(missing.message ?? "", /token not available/);

  mockFetch(401, { code: 4010001, reason: "unauthenticated" }, []);
  const rejected = (await getInfCodeUsage("t")) as { message?: string; quotas?: unknown };
  assert.equal(rejected.quotas, undefined);
  assert.match(rejected.message ?? "", /401/);
  assert.match(rejected.message ?? "", /Re-authenticate/i);

  mockFetch(503, {}, []);
  const failed = (await getInfCodeUsage("t")) as { message?: string };
  assert.match(failed.message ?? "", /quota API error \(HTTP 503\)/);
});

test("an empty credit_usage block is reported, not rendered as an empty card", async () => {
  mockFetch(200, { credit_usage: { seat: { status: "unavailable" } } }, []);
  const result = (await getInfCodeUsage("t")) as { message?: string; quotas?: unknown };
  assert.equal(result.quotas, undefined);
  assert.match(result.message ?? "", /No credit quota reported/);
});

test("inf-code is registered for quota display and dispatched by getUsageForProvider", async () => {
  assert.ok((USAGE_FETCHER_PROVIDERS as readonly string[]).includes("inf-code"));
  assert.ok(USAGE_SUPPORTED_PROVIDERS.includes("inf-code"));

  mockFetch(200, LIVE_PAYLOAD, []);
  const result = (await getUsageForProvider({
    provider: "inf-code",
    accessToken: "oauth-token",
  })) as { quotas?: Record<string, unknown> };
  assert.ok(result.quotas?.seat_credits);
});
