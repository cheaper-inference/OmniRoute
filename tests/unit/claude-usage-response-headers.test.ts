import { describe, it, beforeEach, afterEach, mock } from "node:test";
import { strict as assert } from "node:assert";

import {
  CLAUDE_USAGE_SUCCESS_TTL_MS,
  _resetClaudeUsagePollingState,
  getClaudeUsage,
  observeClaudeUsageHeaders,
} from "../../open-sse/services/usage/claude.ts";
import {
  _resetClaudeOauthUsageCooldown,
  markClaudeOauthUsage429,
} from "../../open-sse/services/claudeUsageCooldown.ts";
import { ClaudeUsageLimitGuard } from "../../open-sse/executors/claudeUsageLimit.ts";

// /api/oauth/usage allows only a few calls per credential per hour; every OAuth response
// carries the same plan-window numbers in `anthropic-ratelimit-unified-*` headers.

const OAUTH_URL = "https://api.anthropic.com/api/oauth/usage";
const T0 = 1_900_000_000_000;
const WEEKLY_RESET_S = Math.floor((T0 + 3 * 86_400_000) / 1000);
const SESSION_RESET_S = Math.floor((T0 + 2 * 3_600_000) / 1000);

const originalFetch = globalThis.fetch;
let oauthCalls = 0;

function installFetch(oauth: () => Response) {
  oauthCalls = 0;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url === OAUTH_URL) {
      oauthCalls++;
      return oauth();
    }
    return new Response(null, { status: 404 });
  }) as typeof fetch;
}

function unifiedHeaders(extra: Record<string, string> = {}) {
  return new Headers({
    "anthropic-ratelimit-unified-7d-utilization": "0.26",
    "anthropic-ratelimit-unified-7d-reset": String(WEEKLY_RESET_S),
    "anthropic-ratelimit-unified-status": "allowed",
    ...extra,
  });
}

type Usage = {
  message?: string;
  quotas?: Record<string, { used: number; remainingPercentage: number; resetAt: string | null }>;
  modelQuotas?: Record<string, unknown>;
  plan?: unknown;
  _stale?: boolean;
  _source?: string;
  _observedAt?: string;
};

const usage = async (token: string, options?: { forceRefresh?: boolean }) =>
  (await getClaudeUsage(token, options)) as Usage;

describe("Claude plan windows from response rate-limit headers", () => {
  beforeEach(() => {
    _resetClaudeUsagePollingState();
    _resetClaudeOauthUsageCooldown();
    mock.timers.enable({ apis: ["Date"], now: T0 });
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    mock.timers.reset();
  });

  it("serves the observed windows while the usage endpoint is cooling down", async () => {
    installFetch(() => new Response("rate limited", { status: 429 }));
    markClaudeOauthUsage429("tok-cool", T0, 3_600_000);
    observeClaudeUsageHeaders("tok-cool", unifiedHeaders());

    const result = await usage("tok-cool", { forceRefresh: true });
    assert.equal(oauthCalls, 0, "the cooldown still holds the endpoint");
    assert.equal(result._stale, undefined);
    assert.equal(result.message, undefined);
    assert.equal(result._source, "response-headers");
    assert.equal(result.quotas?.["weekly (7d)"]?.used, 26);
    assert.equal(result.quotas?.["weekly (7d)"]?.remainingPercentage, 74);
    assert.equal(
      result.quotas?.["weekly (7d)"]?.resetAt,
      new Date(WEEKLY_RESET_S * 1000).toISOString()
    );
    assert.equal(result.quotas?.["session (5h)"], undefined, "no 5h header, no 5h window");
  });

  it("replaces a stale read, keeping its plan label but not its old per-model windows", async () => {
    installFetch(() =>
      Response.json({
        five_hour: { utilization: 3, resets_at: "2099-01-01T05:00:00Z" },
        seven_day: { utilization: 93, resets_at: "2099-01-07T00:00:00Z" },
        seven_day_opus: { utilization: 43, resets_at: "2099-01-07T00:00:00Z" },
      })
    );
    await usage("tok-stale");
    mock.timers.tick(CLAUDE_USAGE_SUCCESS_TTL_MS + 1);
    installFetch(() => new Response("rate limited", { status: 429 }));
    observeClaudeUsageHeaders(
      "tok-stale",
      unifiedHeaders({
        "anthropic-ratelimit-unified-5h-utilization": "0.4",
        "anthropic-ratelimit-unified-5h-reset": String(SESSION_RESET_S),
      })
    );

    const result = await usage("tok-stale");
    assert.equal(result._stale, undefined);
    assert.equal(result.quotas?.["weekly (7d)"]?.used, 26);
    assert.equal(result.quotas?.["session (5h)"]?.used, 40);
    assert.deepEqual(result.modelQuotas, {}, "a 15-minute-old per-model window is not reused");
  });

  it("a newer endpoint read wins over an older observation", async () => {
    observeClaudeUsageHeaders("tok-newer", unifiedHeaders());
    mock.timers.tick(1_000);
    installFetch(() =>
      Response.json({ seven_day: { utilization: 30, resets_at: "2099-01-07T00:00:00Z" } })
    );
    const result = await usage("tok-newer");
    assert.equal(oauthCalls, 1);
    assert.equal(result._source, undefined);
    assert.equal(result.quotas?.["weekly (7d)"]?.used, 30);
  });

  it("a newer observation wins over a cached read and keeps its per-model windows", async () => {
    installFetch(() =>
      Response.json({
        seven_day: { utilization: 20, resets_at: "2099-01-07T00:00:00Z" },
        seven_day_opus: { utilization: 43, resets_at: "2099-01-07T00:00:00Z" },
      })
    );
    await usage("tok-cached");
    mock.timers.tick(60_000);
    observeClaudeUsageHeaders("tok-cached", unifiedHeaders());

    const result = await usage("tok-cached");
    assert.equal(oauthCalls, 1, "inside the success TTL the endpoint is not polled again");
    assert.equal(result.quotas?.["weekly (7d)"]?.used, 26);
    assert.ok(Object.keys(result.modelQuotas ?? {}).length > 0, "recent per-model windows kept");
  });

  it("does not hide expired authentication behind observed numbers", async () => {
    observeClaudeUsageHeaders("tok-401", unifiedHeaders());
    mock.timers.tick(1_000);
    installFetch(() => new Response("unauthorized", { status: 401 }));
    const result = await usage("tok-401");
    assert.match(String(result.message), /authentication expired/i);
    assert.equal(result.quotas, undefined);
  });

  it("ignores responses without usable utilization headers", async () => {
    observeClaudeUsageHeaders(
      "tok-none",
      new Headers({ "anthropic-ratelimit-unified-status": "allowed" })
    );
    observeClaudeUsageHeaders(
      "tok-none",
      new Headers({ "anthropic-ratelimit-unified-7d-utilization": "not-a-number" })
    );
    installFetch(() => new Response("rate limited", { status: 429 }));
    const result = await usage("tok-none");
    assert.match(String(result.message), /rate limited/i);
    assert.equal(result._source, undefined);
  });

  it("the executor's Claude OAuth guard records the headers of every response", async () => {
    const guard = new ClaudeUsageLimitGuard("claude", null);
    const credentials = { accessToken: "sk-ant-oat01-guard-token" };
    guard.applyHeader({}, credentials);
    const retry = await guard.shouldRetry(
      { status: 200, headers: unifiedHeaders() },
      "https://api.anthropic.com/v1/messages",
      { credentials, sentSlow: false }
    );
    assert.equal(retry, false);

    markClaudeOauthUsage429(credentials.accessToken, T0, 3_600_000);
    installFetch(() => new Response("rate limited", { status: 429 }));
    const result = await usage(credentials.accessToken);
    assert.equal(result._source, "response-headers");
    assert.equal(result.quotas?.["weekly (7d)"]?.used, 26);
  });
});
