import test from "node:test";
import assert from "node:assert/strict";

import {
  fetchCodexQuota,
  invalidateCodexQuotaCache,
  peekCodexQuota,
  registerCodexConnection,
  registerCodexQuotaFetcher,
  __testing,
} from "../../open-sse/services/codexQuotaFetcher.ts";
import {
  preflightQuota,
  resolveQuotaPreflightStaleHeadroomPercent,
  resolveQuotaPreflightStaleMaxAgeMs,
} from "../../open-sse/services/quotaPreflight.ts";

const originalFetch = globalThis.fetch;
const HEADROOM_ENV = "OMNIROUTE_QUOTA_PREFLIGHT_STALE_HEADROOM_PERCENT";
const MAX_AGE_ENV = "OMNIROUTE_QUOTA_PREFLIGHT_STALE_MAX_AGE_MS";
const originalHeadroom = process.env[HEADROOM_ENV];
const originalMaxAge = process.env[MAX_AGE_ENV];

registerCodexQuotaFetcher();

// Cutoff of 4% remaining on every window, the way an operator configures it.
const thresholds = { resolveMinRemainingPercent: () => 4 };

function usage(sessionUsed: number, weeklyUsed: number, resetInS = 3600) {
  return {
    rate_limit: {
      primary_window: {
        limit_window_seconds: 18000,
        used_percent: sessionUsed,
        reset_after_seconds: resetInS,
      },
      secondary_window: {
        limit_window_seconds: 604800,
        used_percent: weeklyUsed,
        reset_after_seconds: resetInS * 24,
      },
    },
  };
}

function usageResponse(body: unknown) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

/** A fetch that only answers when `release()` is called, counting calls. */
function gatedFetch(body: unknown) {
  let calls = 0;
  let release: () => void = () => {};
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  const fetchImpl = (async () => {
    calls += 1;
    await gate;
    return usageResponse(body);
  }) as typeof fetch;
  return { fetchImpl, release, calls: () => calls };
}

async function seed(connectionId: string, body: unknown, ageMs: number) {
  registerCodexConnection(connectionId, { accessToken: `token-${connectionId}` });
  globalThis.fetch = (async () => usageResponse(body)) as typeof fetch;
  await fetchCodexQuota(connectionId);
  __testing.ageCacheEntry(connectionId, ageMs);
}

function restoreEnv(name: string, value: string | undefined) {
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  restoreEnv(HEADROOM_ENV, originalHeadroom);
  restoreEnv(MAX_AGE_ENV, originalMaxAge);
});

test("concurrent reads past the TTL share one upstream fetch", async () => {
  const id = `codex-dedupe-${Date.now()}`;
  await seed(id, usage(10, 10), 61_000);
  const gated = gatedFetch(usage(20, 20));
  globalThis.fetch = gated.fetchImpl;

  const first = fetchCodexQuota(id);
  const second = fetchCodexQuota(id);
  await new Promise((resolve) => setTimeout(resolve, 400));
  gated.release();
  const [a, b] = await Promise.all([first, second]);

  assert.equal(gated.calls(), 1);
  assert.equal(a?.window5h?.percentUsed, 0.2);
  assert.deepEqual(b, a);
  invalidateCodexQuotaCache(id);
});

test("a read in flight is never shared across a credential change", async () => {
  const id = `codex-dedupe-epoch-${Date.now()}`;
  registerCodexConnection(id, { accessToken: "token-a" });
  const seen: string[] = [];
  let release: () => void = () => {};
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  globalThis.fetch = (async (_url: unknown, init?: RequestInit) => {
    seen.push(String((init?.headers as Record<string, string>).Authorization));
    await gate;
    return usageResponse(usage(30, 30));
  }) as typeof fetch;

  const first = fetchCodexQuota(id);
  const second = fetchCodexQuota(id, { accessToken: "token-b" });
  await new Promise((resolve) => setTimeout(resolve, 900));
  release();
  const [a, b] = await Promise.all([first, second]);

  // token-b replaced token-a while token-a's read was in flight: token-a's read is
  // discarded (null, before or after reaching the network) and token-b made its
  // own call instead of receiving token-a's.
  assert.ok(seen.includes("Bearer token-b"));
  assert.equal(seen.filter((h) => h === "Bearer token-b").length, 1);
  assert.equal(a, null);
  assert.equal(b?.window5h?.percentUsed, 0.3);
  invalidateCodexQuotaCache(id);
});

test("peekCodexQuota returns the cached read without a network call", async () => {
  const id = `codex-peek-${Date.now()}`;
  await seed(id, usage(40, 10), 5_000);
  let calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    return usageResponse(usage(99, 99));
  }) as typeof fetch;

  const snapshot = peekCodexQuota(id);
  assert.equal(calls, 0);
  assert.equal(snapshot?.quota.window5h?.percentUsed, 0.4);
  assert.ok(Date.now() - (snapshot?.fetchedAt ?? 0) >= 5_000);
  assert.equal(peekCodexQuota(`never-seen-${Date.now()}`), null);
  invalidateCodexQuotaCache(id);
});

test("without the env, preflight still waits for the refresh (unchanged default)", async () => {
  delete process.env[HEADROOM_ENV];
  const id = `codex-default-${Date.now()}`;
  await seed(id, usage(10, 10), 61_000);
  globalThis.fetch = (async () => usageResponse(usage(98, 10))) as typeof fetch;

  const decision = await preflightQuota("codex", id, { accessToken: `token-${id}` }, thresholds);

  assert.equal(decision.proceed, false);
  invalidateCodexQuotaCache(id);
});

test("far from the cutoff, preflight decides on the recent read and refreshes in background", async () => {
  process.env[HEADROOM_ENV] = "30";
  const id = `codex-fast-${Date.now()}`;
  await seed(id, usage(40, 50), 70_000);
  const gated = gatedFetch(usage(45, 52));
  globalThis.fetch = gated.fetchImpl;

  const started = Date.now();
  const decision = await preflightQuota("codex", id, { accessToken: `token-${id}` }, thresholds);
  const waitedMs = Date.now() - started;

  assert.equal(decision.proceed, true);
  assert.ok(waitedMs < 200, `preflight waited ${waitedMs}ms for a refresh it did not need`);
  // The background refresh is under way (it passes the global throttle first).
  await new Promise((resolve) => setTimeout(resolve, 600));
  assert.equal(gated.calls(), 1);
  gated.release();
  await new Promise((resolve) => setTimeout(resolve, 50));
  assert.equal(peekCodexQuota(id)?.quota.window5h?.percentUsed, 0.45);
  invalidateCodexQuotaCache(id);
});

test("near the cutoff, preflight waits for the fresh read and blocks on it", async () => {
  process.env[HEADROOM_ENV] = "30";
  const id = `codex-near-${Date.now()}`;
  // 20% remaining: above the 4% cutoff, but inside the 30-point headroom.
  await seed(id, usage(80, 10), 70_000);
  globalThis.fetch = (async () => usageResponse(usage(97, 10))) as typeof fetch;

  const decision = await preflightQuota("codex", id, { accessToken: `token-${id}` }, thresholds);

  assert.equal(decision.proceed, false);
  assert.equal(decision.windowName, "session");
  invalidateCodexQuotaCache(id);
});

test("a read older than the max age is not trusted", async () => {
  process.env[HEADROOM_ENV] = "30";
  process.env[MAX_AGE_ENV] = "120000";
  const id = `codex-old-${Date.now()}`;
  await seed(id, usage(10, 10), 121_000);
  globalThis.fetch = (async () => usageResponse(usage(99, 10))) as typeof fetch;

  const decision = await preflightQuota("codex", id, { accessToken: `token-${id}` }, thresholds);

  assert.equal(decision.proceed, false);
  invalidateCodexQuotaCache(id);
});

test("a read whose window already reset is not trusted", async () => {
  process.env[HEADROOM_ENV] = "30";
  const id = `codex-reset-${Date.now()}`;
  // Session window resets 1 s after the read; wait past it.
  await seed(id, usage(10, 10, 1), 70_000);
  await new Promise((resolve) => setTimeout(resolve, 1_100));
  let calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    return usageResponse(usage(99, 10));
  }) as typeof fetch;

  const decision = await preflightQuota("codex", id, { accessToken: `token-${id}` }, thresholds);

  assert.equal(calls, 1);
  assert.equal(decision.proceed, false);
  invalidateCodexQuotaCache(id);
});

test("stale-headroom env parsing", () => {
  assert.equal(resolveQuotaPreflightStaleHeadroomPercent({}), 0);
  assert.equal(resolveQuotaPreflightStaleHeadroomPercent({ [HEADROOM_ENV]: "25" }), 25);
  assert.equal(resolveQuotaPreflightStaleHeadroomPercent({ [HEADROOM_ENV]: "-5" }), 0);
  assert.equal(resolveQuotaPreflightStaleHeadroomPercent({ [HEADROOM_ENV]: "abc" }), 0);
  assert.equal(resolveQuotaPreflightStaleHeadroomPercent({ [HEADROOM_ENV]: "500" }), 100);
  assert.equal(resolveQuotaPreflightStaleMaxAgeMs({}), 120_000);
  assert.equal(resolveQuotaPreflightStaleMaxAgeMs({ [MAX_AGE_ENV]: "30000" }), 30_000);
  assert.equal(resolveQuotaPreflightStaleMaxAgeMs({ [MAX_AGE_ENV]: "0" }), 120_000);
  assert.equal(resolveQuotaPreflightStaleMaxAgeMs({ [MAX_AGE_ENV]: "99999999" }), 900_000);
});
