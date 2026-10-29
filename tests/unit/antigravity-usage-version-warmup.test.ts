/**
 * Antigravity usage/quota requests must carry the live IDE fingerprint version.
 *
 * Cloud Code's fetchAvailableModels only returns quota buckets for newer models to IDE
 * clients at or above a minimum version. The usage poll builds headers from the
 * synchronous version cache, so on a cold process (dashboard poll before any chat
 * request) it used to go out with the stale fallback. getAntigravityUsage now resolves
 * the version once before any quota call, and the fallback floor is 2.5.5.
 */
import test from "node:test";
import assert from "node:assert/strict";

// Load usage.ts up-front so module-evaluation side effects finish before fetch is stubbed.
const { getUsageForProvider } = await import("../../open-sse/services/usage.ts");
const { clearAntigravityVersionCaches, ANTIGRAVITY_IDE_FALLBACK_VERSION } =
  await import("../../open-sse/services/antigravityVersion.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const FEED_HOST = "antigravity-auto-updater";
const originalFetch = globalThis.fetch;

type RecordedCall = { url: string; userAgent: string | null };

function readUserAgent(init?: RequestInit): string | null {
  const headers = (init?.headers ?? {}) as Record<string, string>;
  return headers["User-Agent"] ?? null;
}

function stubFetch(feed: () => Response): { calls: RecordedCall[]; feedCalls: string[] } {
  const calls: RecordedCall[] = [];
  const feedCalls: string[] = [];
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input);
    if (url.includes(FEED_HOST)) {
      feedCalls.push(url);
      return feed();
    }
    calls.push({ url, userAgent: readUserAgent(init) });
    return new Response(
      JSON.stringify({
        models: {
          // #12608: per-tier 3.7 ids left the live roster and are hidden from Provider Limits;
          // the live 3.8 tier is what fetchAvailableModels returns now.
          "gemini-3.8-flash-high": {
            quotaInfo: { remainingFraction: 0.5, resetTime: "2026-12-01T00:00:00Z" },
          },
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }) as typeof fetch;
  return { calls, feedCalls };
}

test.beforeEach(() => {
  clearAntigravityVersionCaches();
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  clearAntigravityVersionCaches();
});

test.after(() => {
  resetDbInstance();
});

test("IDE fingerprint fallback floor is 2.5.5", () => {
  assert.equal(ANTIGRAVITY_IDE_FALLBACK_VERSION, "2.5.5");
});

test("cold-cache usage fetch resolves the live IDE version before any quota request", async () => {
  const { calls, feedCalls } = stubFetch(
    () =>
      new Response(JSON.stringify([{ version: "2.9.0" }, { version: "2.0.0" }]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
  );

  const result = await getUsageForProvider(
    {
      id: "warmup-conn-live",
      provider: "antigravity",
      accessToken: "warmup-token-live-feed",
      providerSpecificData: {},
    },
    { forceRefresh: true }
  );

  assert.equal(feedCalls.length, 1, "the release feed is consulted exactly once");
  const quotaCalls = calls.filter((call) => call.url.includes("fetchAvailableModels"));
  assert.ok(quotaCalls.length >= 1, "fetchAvailableModels must be called");
  for (const call of calls) {
    assert.ok(
      call.userAgent?.startsWith("antigravity/ide/2.9.0 "),
      `expected live version in UA for ${call.url}, got ${call.userAgent}`
    );
  }
  assert.ok(result && "quotas" in result, "usage result should carry quotas");
});

test("unreachable release feed falls back to the 2.5.5 floor and still fetches usage", async () => {
  const { calls, feedCalls } = stubFetch(() => {
    throw new Error("feed offline");
  });

  const result = await getUsageForProvider(
    {
      id: "warmup-conn-offline",
      provider: "antigravity",
      accessToken: "warmup-token-feed-offline",
      providerSpecificData: {},
    },
    { forceRefresh: true }
  );

  assert.equal(feedCalls.length, 1, "the release feed is attempted once");
  const quotaCalls = calls.filter((call) => call.url.includes("fetchAvailableModels"));
  assert.ok(quotaCalls.length >= 1, "fetchAvailableModels must still be called");
  for (const call of calls) {
    assert.ok(
      call.userAgent?.startsWith("antigravity/ide/2.5.5 "),
      `expected fallback version in UA for ${call.url}, got ${call.userAgent}`
    );
  }
  assert.ok(result && "quotas" in result, "usage result should carry quotas");
  if (result && "quotas" in result) {
    assert.ok(result.quotas["gemini-3.8-flash-high"], "quota bucket should be parsed");
  }
});
