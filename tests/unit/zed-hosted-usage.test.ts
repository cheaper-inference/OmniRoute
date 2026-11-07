/**
 * Zed Hosted Models USD credit balance.
 *
 * The balance comes from the Orb customer portal link the operator copies out of
 * Zed's billing page. The Orb portal API is not public, so every request is
 * mocked here: these tests never touch the network and never use a real token.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  extractOrbPortalToken,
  getZedHostedUsage,
} from "../../open-sse/services/usage/zedHosted.ts";
import { getUsageForProvider } from "../../open-sse/services/usage.ts";
import { USAGE_FETCHER_PROVIDERS } from "../../open-sse/services/usage/fetcherProviders.ts";
import { USAGE_SUPPORTED_PROVIDERS } from "../../open-sse/services/usage/supportedProviders.ts";

const TOKEN = "test-token-abc123";
const CUSTOMER_ID = "cust_123";
const PRICING_UNIT_ID = "pu_456";
const CUSTOMER_EMAIL = "fake-operator@example.invalid";
const EXPIRY = "2026-12-01T00:00:00Z";
const NO_LINK_MESSAGE = "Zed billing balance is not configured";
const INVALID_MESSAGE = "invalid";
const TIMEOUT_MESSAGE = "timed out";
const UNEXPECTED_MESSAGE = "unexpected response";
const FAILED_MESSAGE = "request failed";

const CUSTOMER_BODY = {
  customer: {
    id: CUSTOMER_ID,
    email: CUSTOMER_EMAIL,
    pricing_unit: { id: PRICING_UNIT_ID },
  },
};

function ledgerBody(overrides: Record<string, unknown> = {}) {
  return {
    credits_balance: "7.50",
    credit_blocks: [{ maximum_initial_balance: 10, balance: "7.50", expiry_date: EXPIRY }],
    ...overrides,
  };
}

type FetchCall = { url: string; headers: Record<string, string>; init?: RequestInit };

const originalFetch = globalThis.fetch;
test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function textResponse(body: string, status = 200): Response {
  return new Response(body, { status, headers: { "content-type": "text/plain" } });
}

function mockFetch(handler: (url: string) => Response | Promise<Response>): FetchCall[] {
  const calls: FetchCall[] = [];
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    const raw = init?.headers as Record<string, string> | undefined;
    calls.push({ url, headers: { ...(raw || {}) }, init });
    return handler(url);
  }) as typeof fetch;
  return calls;
}

function orbHandler(ledger: unknown = ledgerBody()) {
  return (url: string) => {
    const path = new URL(url).pathname;
    if (path === "/api/v1/customer_from_link") return jsonResponse(CUSTOMER_BODY);
    if (path === `/api/v1/customers/${CUSTOMER_ID}/ledger_summary`) {
      return jsonResponse(ledger);
    }
    throw new Error(`unexpected URL in test: ${url}`);
  };
}

const URL_LINK = `https://portal.withorb.com/view?token=${TOKEN}`;

type Quota = Record<string, unknown>;
type UsageResult = {
  plan?: string;
  message?: string;
  quotas?: Record<string, Quota>;
};

test.describe("extractOrbPortalToken", () => {
  test("accepts a canonical Orb portal link", () => {
    assert.equal(extractOrbPortalToken(URL_LINK), TOKEN);
  });

  test("accepts a bare token", () => {
    assert.equal(extractOrbPortalToken(TOKEN), TOKEN);
  });

  test("accepts an upper-case scheme/host", () => {
    assert.equal(extractOrbPortalToken(`HTTPS://PORTAL.WITHORB.COM/view?token=${TOKEN}`), TOKEN);
  });

  test("trims surrounding whitespace", () => {
    assert.equal(extractOrbPortalToken(`  ${TOKEN}  `), TOKEN);
  });

  test("rejects a link whose token carries an interior control character", () => {
    // `new URL` strips tab/newline before parsing, which would silently join
    // the two halves into a token the operator never pasted.
    assert.equal(
      extractOrbPortalToken(`https://portal.withorb.com/view?token=abc\n12345678`),
      null
    );
    assert.equal(
      extractOrbPortalToken(`https://portal.withorb.com/view?token=abc\t12345678`),
      null
    );
  });

  test("accepts printable ASCII tokens outside the URL-safe alphabet", () => {
    // Orb tokens are opaque and their real charset is unverified; they only reach
    // fixed-host query params and the Referer through encodeURIComponent.
    assert.equal(extractOrbPortalToken("token/with?slashes"), "token/with?slashes");
    assert.equal(
      extractOrbPortalToken("https://portal.withorb.com/view?token=abc%2Bdefgh"),
      "abc+defgh"
    );
    assert.equal(
      extractOrbPortalToken("https://portal.withorb.com/view?token=abc%3Ddefgh"),
      "abc=defgh"
    );
  });

  const rejected: Array<[string, string]> = [
    ["empty string", ""],
    ["blank string", "   "],
    ["http scheme", `http://portal.withorb.com/view?token=${TOKEN}`],
    ["look-alike host", `https://portal.withorb.com.evil.com/view?token=${TOKEN}`],
    ["userinfo before the real host", `https://evil.com@portal.withorb.com/view?token=${TOKEN}`],
    ["real-looking host in userinfo", `https://portal.withorb.com@evil.com/view?token=${TOKEN}`],
    ["ip host", `https://127.0.0.1/view?token=${TOKEN}`],
    ["other host", `https://portal.withorb.example/view?token=${TOKEN}`],
    ["missing token", "https://portal.withorb.com/view"],
    ["empty token", "https://portal.withorb.com/view?token="],
    ["token with a space after decoding", "https://portal.withorb.com/view?token=abc%20defgh"],
    ["short bare token", "short"],
    ["bare token with spaces", "bad token with spaces"],
    ["bare token with a tab", "bad\ttoken12345"],
    ["bare token with a newline", "bad\ntoken12345"],
    ["bare token with a DEL character", "bad\x7ftoken12345"],
    ["bare token over the per-token cap", "a".repeat(513)],
    ["input over the total length cap", "a".repeat(5000)],
  ];
  for (const [label, value] of rejected) {
    test(`rejects ${label}`, () => {
      assert.equal(extractOrbPortalToken(value), null);
    });
  }
});

test.describe("getZedHostedUsage", () => {
  test("fetches customer then ledger and returns a USD credit quota", async () => {
    const calls = mockFetch(orbHandler());
    const result = (await getZedHostedUsage("conn-success", {
      billingPortalUrl: URL_LINK,
    })) as UsageResult;

    assert.equal(calls.length, 2);
    const first = new URL(calls[0].url);
    const second = new URL(calls[1].url);
    assert.equal(first.origin, "https://portal.withorb.com");
    assert.equal(first.pathname, "/api/v1/customer_from_link");
    assert.equal(first.searchParams.get("token"), TOKEN);
    assert.equal(second.origin, "https://portal.withorb.com");
    assert.equal(second.pathname, `/api/v1/customers/${CUSTOMER_ID}/ledger_summary`);
    assert.equal(second.searchParams.get("token"), TOKEN);
    assert.equal(second.searchParams.get("pricing_unit_id"), PRICING_UNIT_ID);

    // WAF header set, verbatim. The token rides in the same-origin Referer the
    // portal expects, rebuilt from the portal origin (never a pasted string).
    for (const headers of [calls[0].headers, calls[1].headers]) {
      assert.equal(
        headers["User-Agent"],
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
      );
      assert.equal(headers.Accept, "application/json, text/plain, */*");
      assert.equal(headers["Accept-Language"], "en-US,en;q=0.9");
      assert.equal(headers.Referer, `https://portal.withorb.com/view?token=${TOKEN}`);
      assert.equal(headers.Origin, "https://portal.withorb.com");
      assert.equal(headers["Sec-Fetch-Site"], "same-origin");
      assert.equal(headers["Sec-Fetch-Mode"], "cors");
      assert.equal(headers["Sec-Fetch-Dest"], "empty");
      assert.equal(headers["X-Requested-With"], "XMLHttpRequest");
      // Credentials must not travel in auth headers; the Referer is the only
      // header carrying the token, and only to the fixed portal origin.
      assert.equal(headers.Authorization, undefined);
      assert.equal(headers["X-Orb-Link"], undefined);
      assert.equal(JSON.stringify(headers).includes("Bearer"), false);
      assert.equal(new URL(headers.Referer).origin, "https://portal.withorb.com");
    }
    assert.equal(calls[0].init?.redirect, "error", "redirects must not be followed");
    assert.equal(calls[1].init?.redirect, "error", "redirects must not be followed");
    assert.ok(
      calls[0].init?.signal instanceof AbortSignal,
      "first request carries a timeout signal"
    );
    assert.ok(
      calls[1].init?.signal instanceof AbortSignal,
      "second request carries a timeout signal"
    );

    assert.equal(result.plan, "Zed Hosted");
    const monthly = result.quotas?.monthly as Quota;
    assert.deepEqual(monthly, {
      used: 2.5,
      total: 10,
      remaining: 7.5,
      remainingPercentage: 75,
      resetAt: new Date(EXPIRY).toISOString(),
      unlimited: false,
      fractionReported: false,
      currency: "USD",
      displayName: "$7.50 / $10.00 per month",
    });
  });

  test("rebuilds the Referer from a bare token, and a pasted link's own host/path never reaches it", async () => {
    const calls = mockFetch(orbHandler());
    await getZedHostedUsage("conn-referer-bare", { billingPortalUrl: ` ${TOKEN} ` });
    assert.equal(calls.length, 2);
    for (const call of calls) {
      assert.equal(call.headers.Referer, `https://portal.withorb.com/view?token=${TOKEN}`);
      assert.equal(new URL(call.headers.Referer).origin, "https://portal.withorb.com");
    }

    // A rejected look-alike host produces no request at all, so it cannot
    // contribute a Referer either.
    const rejectedCalls = mockFetch(orbHandler());
    const rejected = (await getZedHostedUsage("conn-referer-evil", {
      billingPortalUrl: `https://portal.withorb.com.evil.com/view?token=${TOKEN}`,
    })) as UsageResult;
    assert.ok(rejected.message?.includes(INVALID_MESSAGE), `got ${rejected.message}`);
    assert.equal(rejectedCalls.length, 0);
  });

  test("skips a future credit block (null balance) that comes first", async () => {
    mockFetch(
      orbHandler(
        ledgerBody({
          credit_blocks: [
            { maximum_initial_balance: 50, balance: null, expiry_date: "2027-01-01T00:00:00Z" },
            { maximum_initial_balance: 10, balance: "7.50", expiry_date: EXPIRY },
          ],
        })
      )
    );
    const result = (await getZedHostedUsage("conn-future-first", {
      billingPortalUrl: TOKEN,
    })) as UsageResult;
    assert.equal((result.quotas?.monthly as Quota).total, 10);
    assert.equal((result.quotas?.monthly as Quota).resetAt, new Date(EXPIRY).toISOString());
  });

  test("skips a future credit block (null balance) that comes last", async () => {
    mockFetch(
      orbHandler(
        ledgerBody({
          credit_blocks: [
            { maximum_initial_balance: 10, balance: "7.50", expiry_date: EXPIRY },
            { maximum_initial_balance: 50, balance: null, expiry_date: "2027-01-01T00:00:00Z" },
          ],
        })
      )
    );
    const result = (await getZedHostedUsage("conn-future-last", {
      billingPortalUrl: TOKEN,
    })) as UsageResult;
    assert.equal((result.quotas?.monthly as Quota).total, 10);
  });

  test("accepts a numeric credits_balance and derives displayName from the block total", async () => {
    mockFetch(
      orbHandler({
        credits_balance: 12.5,
        credit_blocks: [{ maximum_initial_balance: 20, balance: 12.5, expiry_date: EXPIRY }],
      })
    );
    const result = (await getZedHostedUsage("conn-numeric", {
      billingPortalUrl: TOKEN,
    })) as UsageResult;
    const monthly = result.quotas?.monthly as Quota;
    assert.equal(monthly.remaining, 12.5);
    assert.equal(monthly.total, 20);
    assert.equal(monthly.used, 7.5);
    assert.equal(monthly.remainingPercentage, 62.5);
    assert.equal(monthly.displayName, "$12.50 / $20.00 per month");
  });

  test("falls back to the current block balance when credits_balance is absent", async () => {
    mockFetch(
      orbHandler(
        ledgerBody({
          credits_balance: undefined,
          credit_blocks: [{ maximum_initial_balance: 10, balance: "4.25", expiry_date: EXPIRY }],
        })
      )
    );
    const result = (await getZedHostedUsage("conn-block-balance", {
      billingPortalUrl: TOKEN,
    })) as UsageResult;
    assert.equal((result.quotas?.monthly as Quota).remaining, 4.25);
  });

  test("clamps a negative balance to zero instead of rendering money that cannot exist", async () => {
    mockFetch(
      orbHandler(
        ledgerBody({
          credits_balance: "-3",
          credit_blocks: [{ maximum_initial_balance: 10, balance: "-3", expiry_date: EXPIRY }],
        })
      )
    );
    const result = (await getZedHostedUsage("conn-negative", {
      billingPortalUrl: TOKEN,
    })) as UsageResult;
    const monthly = result.quotas?.monthly as Quota;
    assert.equal(monthly.remaining, 0);
    assert.equal(monthly.used, 10);
    assert.equal(monthly.remainingPercentage, 0);
    assert.equal(monthly.displayName, "$0.00 / $10.00 per month");
  });

  test("keeps an account-level balance above the block total out of the fraction display", async () => {
    mockFetch(
      orbHandler(
        ledgerBody({
          credits_balance: "45",
          credit_blocks: [{ maximum_initial_balance: 10, balance: "45", expiry_date: EXPIRY }],
        })
      )
    );
    const result = (await getZedHostedUsage("conn-over-total", {
      billingPortalUrl: TOKEN,
    })) as UsageResult;
    const monthly = result.quotas?.monthly as Quota;
    assert.equal(monthly.remaining, 45);
    assert.equal(monthly.used, 0);
    assert.equal(monthly.remainingPercentage, 100);
    // A "$45.00 / $10.00" fraction would be nonsense; show the bare figure.
    assert.equal(monthly.displayName, "$45.00 credit");
  });

  test("caps an absurd balance instead of leaking Infinity/NaN into the UI", async () => {
    mockFetch(
      orbHandler(
        ledgerBody({
          credits_balance: 1e308,
          credit_blocks: [{ maximum_initial_balance: 1e308, balance: 1e308, expiry_date: EXPIRY }],
        })
      )
    );
    const result = (await getZedHostedUsage("conn-huge", {
      billingPortalUrl: TOKEN,
    })) as UsageResult;
    const monthly = result.quotas?.monthly as Quota;
    assert.equal(Number.isFinite(monthly.remaining as number), true);
    assert.equal(Number.isFinite(monthly.total as number), true);
    assert.equal(Number.isFinite(monthly.remainingPercentage as number), true);
    assert.equal(monthly.total, 0, "an implausible block total is dropped, not rounded");
    assert.equal(monthly.displayName, "$1000000000.00 credit");
  });

  test("works through the dispatcher for provider zed-hosted", async () => {
    const calls = mockFetch(orbHandler());
    const result = (await getUsageForProvider({
      id: "conn-dispatch",
      provider: "zed-hosted",
      providerSpecificData: { billingPortalUrl: URL_LINK },
    })) as UsageResult;
    assert.equal(calls.length, 2);
    assert.equal(result.plan, "Zed Hosted");
    assert.equal((result.quotas?.monthly as Quota).currency, "USD");
  });

  test("is declared in both usage provider lists", () => {
    assert.ok((USAGE_FETCHER_PROVIDERS as readonly string[]).includes("zed-hosted"));
    assert.ok(USAGE_SUPPORTED_PROVIDERS.includes("zed-hosted"));
  });

  test("returns the no-link message without any request", async () => {
    const calls = mockFetch(orbHandler());
    for (const psd of [
      {},
      { billingPortalUrl: "" },
      { billingPortalUrl: "   " },
      { billingPortalUrl: 42 },
    ]) {
      const result = (await getZedHostedUsage(`conn-no-link-${Math.random()}`, psd)) as UsageResult;
      assert.ok(
        result.message?.includes(NO_LINK_MESSAGE),
        `expected no-link message, got ${result.message}`
      );
    }
    assert.equal(calls.length, 0);
  });

  test("returns an invalid message without any request for rejected links", async () => {
    const calls = mockFetch(orbHandler());
    const badInputs = [
      `http://portal.withorb.com/view?token=${TOKEN}`,
      `https://portal.withorb.com.evil.com/view?token=${TOKEN}`,
      `https://evil.com@portal.withorb.com/view?token=${TOKEN}`,
      `https://portal.withorb.com@evil.com/view?token=${TOKEN}`,
      `https://127.0.0.1/view?token=${TOKEN}`,
      "a".repeat(5000),
      "short",
      "bad token with spaces",
    ];
    for (const billingPortalUrl of badInputs) {
      const result = (await getZedHostedUsage(`conn-invalid-${Math.random()}`, {
        billingPortalUrl,
      })) as UsageResult;
      assert.ok(
        result.message?.includes(INVALID_MESSAGE),
        `expected invalid message for ${billingPortalUrl.slice(0, 40)}, got ${result.message}`
      );
    }
    assert.equal(calls.length, 0);
  });

  const httpCases: Array<[number, string]> = [
    [401, "401"],
    [403, "403"],
    [500, "500"],
  ];
  for (const [status, fragment] of httpCases) {
    test(`surfaces HTTP ${status} on the first request`, async () => {
      mockFetch(() => jsonResponse({ error: "nope" }, status));
      const result = (await getZedHostedUsage(`conn-http-${status}`, {
        billingPortalUrl: TOKEN,
      })) as UsageResult;
      assert.ok(result.message?.includes(fragment), `got ${result.message}`);
      if (status === 401 || status === 403) {
        assert.ok(
          result.message?.includes("Re-copy the link from Zed's billing page."),
          `missing re-copy hint: ${result.message}`
        );
      }
    });
  }

  test("surfaces HTTP failure on the second request", async () => {
    mockFetch((url) =>
      new URL(url).pathname === "/api/v1/customer_from_link"
        ? jsonResponse(CUSTOMER_BODY)
        : jsonResponse({}, 503)
    );
    const result = (await getZedHostedUsage("conn-second-503", {
      billingPortalUrl: TOKEN,
    })) as UsageResult;
    assert.ok(result.message?.includes("503"), `got ${result.message}`);
  });

  test("reports a timeout from the abort signal", async () => {
    mockFetch(() => {
      throw new DOMException("The operation was aborted due to timeout", "TimeoutError");
    });
    const result = (await getZedHostedUsage("conn-timeout", {
      billingPortalUrl: TOKEN,
    })) as UsageResult;
    assert.ok(result.message?.includes(TIMEOUT_MESSAGE), `got ${result.message}`);
    assert.equal(result.message?.includes(TOKEN), false);
  });

  test("reports a non-JSON 200 as an unexpected response", async () => {
    mockFetch(() => textResponse("<html>login</html>"));
    const result = (await getZedHostedUsage("conn-non-json", {
      billingPortalUrl: TOKEN,
    })) as UsageResult;
    assert.ok(result.message?.includes(UNEXPECTED_MESSAGE), `got ${result.message}`);
  });

  test("reports a missing current credit block as an unexpected response", async () => {
    mockFetch(
      orbHandler(
        ledgerBody({
          credit_blocks: [{ maximum_initial_balance: 10, balance: null, expiry_date: EXPIRY }],
        })
      )
    );
    const result = (await getZedHostedUsage("conn-no-current-block", {
      billingPortalUrl: TOKEN,
    })) as UsageResult;
    assert.ok(result.message?.includes(UNEXPECTED_MESSAGE), `got ${result.message}`);
  });

  test("reports malformed customer ids as an unexpected response without using them in a path", async () => {
    const calls = mockFetch(() =>
      jsonResponse({ customer: { id: "../evil", pricing_unit: { id: PRICING_UNIT_ID } } })
    );
    const result = (await getZedHostedUsage("conn-bad-id", {
      billingPortalUrl: TOKEN,
    })) as UsageResult;
    assert.ok(result.message?.includes(UNEXPECTED_MESSAGE), `got ${result.message}`);
    assert.equal(calls.length, 1, "no ledger request is made with an unvalidated id");
  });

  test("reports a connection-level failure as request failed", async () => {
    mockFetch(() => {
      throw new TypeError("fetch failed");
    });
    const result = (await getZedHostedUsage("conn-failed", {
      billingPortalUrl: TOKEN,
    })) as UsageResult;
    assert.ok(result.message?.includes(FAILED_MESSAGE), `got ${result.message}`);
  });

  test("caches a success per connection and token, and refetches when the token changes", async () => {
    const calls = mockFetch(orbHandler());
    await getZedHostedUsage("conn-cache", { billingPortalUrl: TOKEN });
    await getZedHostedUsage("conn-cache", { billingPortalUrl: TOKEN });
    assert.equal(calls.length, 2, "second call within the TTL must not hit the network");

    await getZedHostedUsage("conn-cache", { billingPortalUrl: "other-token-xyz789" });
    assert.equal(calls.length, 4, "a different token must not reuse the cached balance");
  });

  test("does not cache failures", async () => {
    const calls = mockFetch(() => jsonResponse({}, 500));
    await getZedHostedUsage("conn-cache-failure", { billingPortalUrl: TOKEN });
    await getZedHostedUsage("conn-cache-failure", { billingPortalUrl: TOKEN });
    assert.equal(calls.length, 2, "a failed fetch must not be cached");
  });

  test("never leaks the token, customer id, email or raw body in the result", async () => {
    mockFetch(orbHandler());
    const result = (await getZedHostedUsage("conn-leak", {
      billingPortalUrl: URL_LINK,
    })) as UsageResult;
    const serialized = JSON.stringify(result);
    assert.equal(serialized.includes(TOKEN), false);
    assert.equal(serialized.includes(CUSTOMER_ID), false);
    assert.equal(serialized.includes(CUSTOMER_EMAIL), false);
    assert.equal(serialized.includes("portal.withorb.com"), false);
  });

  test("writes nothing to the console", async () => {
    mockFetch(orbHandler());
    const captured: string[] = [];
    const capture = (...args: unknown[]) => captured.push(args.map(String).join(" "));
    const original = {
      log: console.log,
      warn: console.warn,
      error: console.error,
      info: console.info,
      debug: console.debug,
    };
    console.log = capture;
    console.warn = capture;
    console.error = capture;
    console.info = capture;
    console.debug = capture;
    try {
      await getZedHostedUsage("conn-silent", { billingPortalUrl: TOKEN });
      mockFetch(() => jsonResponse({}, 500));
      await getZedHostedUsage("conn-silent-failure", { billingPortalUrl: TOKEN });
    } finally {
      console.log = original.log;
      console.warn = original.warn;
      console.error = original.error;
      console.info = original.info;
      console.debug = original.debug;
    }
    assert.deepEqual(captured, []);
  });
});
