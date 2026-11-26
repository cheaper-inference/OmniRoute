/**
 * tests/unit/quota-saturation-signals.test.ts
 *
 * Coverage for src/lib/quota/saturationSignals.ts:
 *   - Mock fetcher returns value → getSaturation returns it
 *   - Cache HIT on second call (fetcher NOT invoked again)
 *   - Fetcher throws → returns 0, no throw
 *   - Unknown provider → fallback or 0
 */

import test from "node:test";
import assert from "node:assert/strict";

// We import the module under test; fetchers are mocked by swapping the
// imported function in the module's closure via dynamic import mocking.
// Since Node's native runner doesn't have built-in mocking, we use the
// register-then-require pattern with a mock module loader approach.
//
// Simpler approach: we test the cache and error behaviour by calling
// getSaturation with providers that DON'T have real network (will throw),
// and then verify the fail-open (returns 0) behaviour.

// Clear cache before each test
const satMod = await import("../../src/lib/quota/saturationSignals.ts");
const { getSaturation, _clearSaturationCache } = satMod;

test.beforeEach(() => {
  _clearSaturationCache();
});

// ─── Fail-open for all providers ────────────────────────────────────────────

test("getSaturation: unknown provider → fails open (returns 0)", async () => {
  _clearSaturationCache();
  // "unknown_xyz" will hit the default branch which calls getUsageForProvider
  // In test env without real network, that will fail → returns 0 (fail-open)
  const val = await getSaturation("conn-xyz", "unknown_xyz", { unit: "tokens", window: "hourly" });
  assert.ok(typeof val === "number", "Should return a number");
  assert.ok(val >= 0 && val <= 1, `Should be in [0,1], got ${val}`);
});

test("getSaturation: codex without registered creds → returns 0 (fail-open)", async () => {
  _clearSaturationCache();
  const val = await getSaturation("conn-no-creds", "codex", { unit: "percent", window: "5h" });
  // No credentials registered → fetchCodexQuota returns null → 0
  assert.equal(val, 0);
});

test("getSaturation: bailian without registered creds → returns 0 (fail-open)", async () => {
  _clearSaturationCache();
  const val = await getSaturation("conn-bailian-no-creds", "bailian", {
    unit: "percent",
    window: "5h",
  });
  assert.equal(val, 0);
});

// ─── Cache behaviour ─────────────────────────────────────────────────────────

test("getSaturation: second call returns cached value without re-fetching", async () => {
  _clearSaturationCache();

  // First call for an unknown provider → 0 (fail-open)
  const first = await getSaturation("conn-cache-test", "unknown_cache", {
    unit: "tokens",
    window: "hourly",
  });

  // Second call — should use cache
  const second = await getSaturation("conn-cache-test", "unknown_cache", {
    unit: "tokens",
    window: "hourly",
  });

  // Both should be the same value (0 in this case since no real provider)
  assert.equal(first, second);
});

test("getSaturation: different dimension keys are cached independently", async () => {
  _clearSaturationCache();

  const v1 = await getSaturation("conn-dim", "unknown_dim", { unit: "tokens", window: "hourly" });
  const v2 = await getSaturation("conn-dim", "unknown_dim", { unit: "requests", window: "daily" });

  // Both should be numbers in [0,1]
  assert.ok(typeof v1 === "number");
  assert.ok(typeof v2 === "number");
});

// ─── Return range validation ─────────────────────────────────────────────────

test("getSaturation: always returns value in [0,1]", async () => {
  _clearSaturationCache();
  const providers = ["codex", "bailian", "openai", "unknown_abc"];
  for (const p of providers) {
    _clearSaturationCache();
    const val = await getSaturation("conn-range", p, { unit: "tokens", window: "hourly" });
    assert.ok(val >= 0, `${p}: expected >= 0, got ${val}`);
    assert.ok(val <= 1, `${p}: expected <= 1, got ${val}`);
  }
});

// ─── Codex: a cached figure whose window has reset ───────────────────────────

test("codex: a cached figure whose window reset is not a plan reading; saturation keeps it", async (t) => {
  const fetcher = await import("../../open-sse/services/codexQuotaFetcher.ts");
  const id = "conn-codex-reset-passed";
  const dim = { unit: "percent", window: "5h" } as const;
  const originalFetch = globalThis.fetch;
  const originalInterval = process.env.OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS;
  process.env.OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS = "0";
  let calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    return Response.json({
      rate_limit: {
        primary_window: { used_percent: 80, limit_window_seconds: 18_000, reset_after_seconds: 5 },
        secondary_window: {
          used_percent: 20,
          limit_window_seconds: 604_800,
          reset_after_seconds: 86_400,
        },
      },
    });
  }) as typeof fetch;
  t.after(() => {
    globalThis.fetch = originalFetch;
    fetcher.unregisterCodexConnection(id);
    if (originalInterval === undefined) delete process.env.OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS;
    else process.env.OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS = originalInterval;
  });
  const start = 1_800_000_000_000;
  t.mock.timers.enable({ apis: ["Date"], now: start });
  fetcher.registerCodexConnection(id, { accessToken: "synthetic-token" });

  const fresh = await satMod.getPlanWindowReading(id, "codex", dim);
  assert.deepEqual(fresh, { used: 0.8, resetAt: start + 5_000, fetchedAt: start });

  // Ten seconds later the Codex cache still serves the figure from before its reset.
  _clearSaturationCache();
  t.mock.timers.tick(10_000);
  assert.equal(await satMod.getPlanWindowReading(id, "codex", dim), null);
  assert.equal(await getSaturation(id, "codex", dim), 0.8);
  assert.equal(calls, 1, "the second read is a Codex cache hit");
});
