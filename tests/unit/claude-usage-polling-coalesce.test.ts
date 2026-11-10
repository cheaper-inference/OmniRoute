import { describe, it, beforeEach, afterEach, mock } from "node:test";
import { strict as assert } from "node:assert";

import {
  CLAUDE_USAGE_SUCCESS_TTL_MS,
  _resetClaudeUsagePollingState,
  getClaudeUsage,
} from "../../open-sse/services/usage/claude.ts";
import { toProviderLimitsCacheEntry } from "../../src/lib/usage/providerLimitsCache.ts";
import {
  _resetClaudeOauthUsageCooldown,
  isClaudeOauthUsageCoolingDown,
} from "../../open-sse/services/claudeUsageCooldown.ts";

const OAUTH_URL = "https://api.anthropic.com/api/oauth/usage";
const SETTINGS_URL = "https://api.anthropic.com/v1/settings";
const BOOTSTRAP_URL = "https://api.anthropic.com/api/claude_cli/bootstrap";

const usageBody = {
  five_hour: { utilization: 42, resets_at: "2099-01-01T05:00:00Z" },
  seven_day: { utilization: 10, resets_at: "2099-01-07T00:00:00Z" },
};

type Responder = (url: string) => Response | Promise<Response>;

const originalFetch = globalThis.fetch;
let calls: string[] = [];

function installFetch(oauth: Responder) {
  calls = [];
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    calls.push(url);
    if (url === OAUTH_URL) return oauth(url);
    if (url === BOOTSTRAP_URL) return new Response(null, { status: 404 });
    if (url === SETTINGS_URL) return new Response(null, { status: 403 });
    return new Response(null, { status: 500 });
  }) as typeof fetch;
}

function count(url: string): number {
  return calls.filter((c) => c === url).length;
}

type UsageResult = {
  message?: string;
  quotas?: Record<string, { used: number }>;
  bootstrap?: unknown;
  _stale?: boolean;
  _staleSince?: string;
  _staleReason?: string;
};

async function usage(token: string, options?: { forceRefresh?: boolean }) {
  return (await getClaudeUsage(token, options)) as UsageResult;
}

describe("Claude OAuth usage polling hardening", () => {
  beforeEach(() => {
    _resetClaudeUsagePollingState();
    _resetClaudeOauthUsageCooldown();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    mock.timers.reset();
  });

  it("coalesces concurrent polls for the same credential into one OAuth fetch", async () => {
    installFetch(async () => {
      await new Promise((resolve) => setImmediate(resolve));
      return Response.json(usageBody);
    });

    const [a, b, c] = await Promise.all([
      usage("tok-concurrent"),
      usage("tok-concurrent"),
      usage("tok-concurrent"),
    ]);

    assert.equal(count(OAUTH_URL), 1);
    assert.equal(a.quotas?.["session (5h)"]?.used, 42);
    assert.deepEqual(b, a);
    assert.deepEqual(c, a);
  });

  it("does not coalesce polls for different credentials", async () => {
    installFetch(() => Response.json(usageBody));
    await Promise.all([usage("tok-one"), usage("tok-two")]);
    assert.equal(count(OAUTH_URL), 2);
  });

  it("serves a success from cache inside the success TTL, and refetches after it", async () => {
    mock.timers.enable({ apis: ["Date"], now: 1_900_000_000_000 });
    installFetch(() => Response.json(usageBody));

    await usage("tok-ttl");
    await usage("tok-ttl");
    assert.equal(count(OAUTH_URL), 1, "second read within TTL must not hit Anthropic");

    mock.timers.tick(CLAUDE_USAGE_SUCCESS_TTL_MS + 1);
    await usage("tok-ttl");
    assert.equal(count(OAUTH_URL), 2, "read after TTL must refetch");
    assert.equal(CLAUDE_USAGE_SUCCESS_TTL_MS, 65_000);
  });

  it("forceRefresh bypasses the success cache", async () => {
    installFetch(() => Response.json(usageBody));
    await usage("tok-force");
    await usage("tok-force", { forceRefresh: true });
    assert.equal(count(OAUTH_URL), 2);
  });

  it("on 429 after a prior success returns the last known quota flagged stale, without legacy calls", async () => {
    let status = 200;
    installFetch(() =>
      status === 200
        ? Response.json(usageBody)
        : new Response("rate limited", { status: 429, headers: { "retry-after": "600" } })
    );

    const fresh = await usage("tok-stale");
    assert.equal(fresh._stale, undefined);

    status = 429;
    const stale = await usage("tok-stale", { forceRefresh: true });
    assert.equal(count(SETTINGS_URL), 0, "legacy settings endpoint must not be called on 429");
    assert.equal(stale.quotas?.["session (5h)"]?.used, 42);
    assert.equal(stale._stale, true);
    assert.equal(typeof stale._staleSince, "string");
    assert.match(String(stale._staleReason), /429/);
    assert.equal(stale.message, undefined);
    assert.ok("bootstrap" in stale);

    // Retry-After: 600 → cooldown well beyond the 180 s default.
    assert.equal(isClaudeOauthUsageCoolingDown("tok-stale", Date.now() + 590_000), true);

    // While cooling down, the OAuth endpoint is not polled again and the stale quota is served.
    const oauthCallsBefore = count(OAUTH_URL);
    const again = await usage("tok-stale", { forceRefresh: true });
    assert.equal(count(OAUTH_URL), oauthCallsBefore);
    assert.equal(count(SETTINGS_URL), 0);
    assert.equal(again._stale, true);
    assert.equal(again.quotas?.["session (5h)"]?.used, 42);

    // Last: an expired check lazily drops the entry, so it must come after the cooldown reads.
    assert.equal(isClaudeOauthUsageCoolingDown("tok-stale", Date.now() + 610_000), false);
  });

  it("on 429 without a prior success returns a rate-limit message, without legacy calls", async () => {
    installFetch(() => new Response("rate limited", { status: 429 }));
    const result = await usage("tok-429-cold");
    assert.equal(count(SETTINGS_URL), 0);
    assert.match(String(result.message), /rate limited/i);
    assert.equal(result.quotas, undefined);
    assert.ok("bootstrap" in result);
  });

  it("on 401 reports expired authentication without hitting the legacy endpoints", async () => {
    installFetch(() => new Response("unauthorized", { status: 401 }));
    const result = await usage("tok-401");
    assert.equal(count(SETTINGS_URL), 0);
    assert.match(String(result.message), /authentication expired/i);
    assert.ok("bootstrap" in result);
  });

  it("falls back to the legacy endpoints only on 404/405", async () => {
    installFetch(() => new Response(null, { status: 404 }));
    const notFound = await usage("tok-404");
    assert.equal(count(SETTINGS_URL), 1);
    assert.match(String(notFound.message), /admin permissions/i);

    _resetClaudeUsagePollingState();
    installFetch(() => new Response(null, { status: 503 }));
    const unavailable = await usage("tok-503");
    assert.equal(count(SETTINGS_URL), 0);
    assert.match(String(unavailable.message), /HTTP 503/);
  });

  it("sanitizes a network error but keeps the transport marker providerLimits relies on", async () => {
    installFetch(() => {
      throw new Error("connect ECONNREFUSED at /internal/secret/path");
    });
    const result = await usage("tok-throw");
    assert.equal(String(result.message).includes("/internal/secret/path"), false);
    assert.match(String(result.message), /Unable to fetch usage/);
    // The proxy fail-closed / direct-retry decision matches on these markers.
    assert.match(String(result.message), /ECONNREFUSED/);
  });

  it("a failed poll is not cached: the next call polls again", async () => {
    installFetch(() => {
      throw new TypeError("fetch failed");
    });
    const first = await usage("tok-retry");
    assert.match(String(first.message), /fetch failed/);
    installFetch(() => Response.json(usageBody));
    const second = await usage("tok-retry");
    assert.equal(count(OAUTH_URL), 1);
    assert.equal(second.quotas?.["session (5h)"]?.used, 42);
  });

  it("a stale quota persisted to the provider-limits cache keeps its original read time", async () => {
    const t0 = 1_900_000_000_000;
    mock.timers.enable({ apis: ["Date"], now: t0 });
    let status = 200;
    installFetch(() =>
      status === 200 ? Response.json(usageBody) : new Response("rate limited", { status: 429 })
    );
    await usage("tok-persist");
    mock.timers.tick(30_000);
    status = 429;
    const stale = await usage("tok-persist", { forceRefresh: true });
    assert.equal(stale._stale, true);
    assert.equal(stale._staleSince, new Date(t0).toISOString());

    const entry = toProviderLimitsCacheEntry(stale as Record<string, unknown>, "manual");
    assert.equal(entry.fetchedAt, new Date(t0).toISOString());
    assert.equal(entry.message, null);

    const fresh = toProviderLimitsCacheEntry({ quotas: {} }, "manual");
    assert.equal(fresh.fetchedAt, new Date(t0 + 30_000).toISOString());
  });
});
