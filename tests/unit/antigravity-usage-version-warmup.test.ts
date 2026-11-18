/**
 * Antigravity usage/quota requests must carry the live IDE fingerprint version.
 *
 * Cloud Code's fetchAvailableModels only returns quota buckets for newer models to IDE
 * clients at or above a minimum version. The usage poll builds headers from the
 * synchronous version cache, so on a cold process (dashboard poll before any chat
 * request) it used to go out with the stale fallback. getAntigravityUsage now resolves
 * the version once before any quota call, and the fallback floor is 2.5.5.
 *
 * retrieveUserQuotaSummary deliberately goes out with the `cli` fingerprint (#18026), so the
 * CLI version is warmed as well and that one call must carry the CLI version instead.
 */
import test from "node:test";
import assert from "node:assert/strict";

// Load usage.ts up-front so module-evaluation side effects finish before fetch is stubbed.
const { getUsageForProvider } = await import("../../open-sse/services/usage.ts");
const { clearAntigravityVersionCaches, ANTIGRAVITY_IDE_FALLBACK_VERSION } =
  await import("../../open-sse/services/antigravityVersion.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const FEED_HOST = "antigravity-auto-updater";
const CLI_FEED_HOST = "api.github.com/repos/google-antigravity/antigravity-cli";
const SUMMARY_PATH = "retrieveUserQuotaSummary";
const originalFetch = globalThis.fetch;

type RecordedCall = { url: string; userAgent: string | null };

function readUserAgent(init?: RequestInit): string | null {
  const headers = (init?.headers ?? {}) as Record<string, string>;
  return headers["User-Agent"] ?? null;
}

function stubFetch(
  feed: () => Response,
  cliFeed: () => Response
): { calls: RecordedCall[]; feedCalls: string[]; cliFeedCalls: string[] } {
  const calls: RecordedCall[] = [];
  const feedCalls: string[] = [];
  const cliFeedCalls: string[] = [];
  globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input);
    if (url.includes(FEED_HOST)) {
      feedCalls.push(url);
      return feed();
    }
    if (url.includes(CLI_FEED_HOST)) {
      cliFeedCalls.push(url);
      return cliFeed();
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
  return { calls, feedCalls, cliFeedCalls };
}

function assertFingerprints(calls: RecordedCall[], ideVersion: string, cliVersion: string): void {
  const summaryCalls = calls.filter((call) => call.url.includes(SUMMARY_PATH));
  assert.ok(summaryCalls.length >= 1, "retrieveUserQuotaSummary must be called");
  for (const call of calls) {
    const expected = call.url.includes(SUMMARY_PATH)
      ? `antigravity/cli/${cliVersion} `
      : `antigravity/ide/${ideVersion} `;
    assert.ok(
      call.userAgent?.startsWith(expected),
      `expected ${expected.trim()} in UA for ${call.url}, got ${call.userAgent}`
    );
  }
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
  const { calls, feedCalls, cliFeedCalls } = stubFetch(
    () =>
      new Response(JSON.stringify([{ version: "2.9.0" }, { version: "2.0.0" }]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    () =>
      new Response(JSON.stringify({ tag_name: "1.9.0" }), {
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
  assert.equal(cliFeedCalls.length, 1, "the CLI release is consulted exactly once");
  assert.ok(quotaCalls.length >= 1, "fetchAvailableModels must be called");
  assertFingerprints(calls, "2.9.0", "1.9.0");
  assert.ok(result && "quotas" in result, "usage result should carry quotas");
});

test("unreachable release feed falls back to the 2.5.5 floor and still fetches usage", async () => {
  const { calls, feedCalls, cliFeedCalls } = stubFetch(
    () => {
      throw new Error("feed offline");
    },
    () => {
      throw new Error("cli feed offline");
    }
  );

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
  assert.equal(cliFeedCalls.length, 1, "the CLI release is attempted once");
  assert.ok(quotaCalls.length >= 1, "fetchAvailableModels must still be called");
  assertFingerprints(calls, "2.5.5", "1.3.4");
  assert.ok(result && "quotas" in result, "usage result should carry quotas");
  if (result && "quotas" in result) {
    assert.ok(result.quotas["gemini-3.8-flash-high"], "quota bucket should be parsed");
  }
});
