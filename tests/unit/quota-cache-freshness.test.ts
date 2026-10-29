import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-quota-freshness-"));
process.env.DATA_DIR = dir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.QUOTA_WINDOW_BOUNDED_PARK;
const core = await import("../../src/lib/db/core.ts");
const snapshots = await import("../../src/lib/db/quotaSnapshots.ts");
const quota = await import("../../src/domain/quotaCache.ts");
const state = await import("../../src/domain/quotaCacheState.ts");
const resetAt = new Date(Date.now() + 7 * 86400000).toISOString();
function seed(id: string, remainingPercentage = 0) {
  quota.setQuotaCache(id, "codex", { session: { remainingPercentage, resetAt } });
}
function withFlag(on: boolean, fn: () => void) {
  if (on) process.env.QUOTA_WINDOW_BOUNDED_PARK = "true";
  else delete process.env.QUOTA_WINDOW_BOUNDED_PARK;
  try {
    fn();
  } finally {
    delete process.env.QUOTA_WINDOW_BOUNDED_PARK;
  }
}
/** An exhausted observation whose fetch is older than the park cap (the weekly reset is still days away). */
function seedStale(id: string) {
  seed(id);
  quota.getQuotaCache(id)!.fetchedAt = Date.now() - state.EXHAUSTED_MAX_PARK_MS - 1;
}
/** An exhausted observation whose capped park deadline has already passed. */
function seedParkElapsed(id: string) {
  seed(id);
  const deadline = quota.getQuotaCache(id)!.nextResetAt;
  seed(id);
  // #14359 — a repeated exhausted observation keeps the prior park deadline.
  assert.equal(quota.getQuotaCache(id)!.nextResetAt, deadline);
  quota.getQuotaCache(id)!.nextResetAt = new Date(Date.now() - 1).toISOString();
}
test.afterEach(() => {
  quota.__clearForTests();
});
test.after(() => {
  quota.stopBackgroundRefresh();
  core.resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});

for (const on of [false, true]) {
  test(`flag ${on ? "on" : "off"}: fresh exhaustion and configured thresholds still block, fresh headroom releases`, () => {
    withFlag(on, () => {
      seed("fresh");
      assert.equal(quota.getQuotaWindowStatus("fresh", "session")?.reachedThreshold, true);
      seed("fresh", 1);
      assert.equal(quota.getQuotaWindowStatus("fresh", "session", 99)?.reachedThreshold, true);
      seed("fresh", 100);
      assert.equal(quota.getQuotaWindowStatus("fresh", "session")?.reachedThreshold, false);
    });
  });
}

test("flag off (default): an observation older than the park cap keeps blocking until the window reset", () => {
  withFlag(false, () => {
    seedStale("expired-off");
    assert.equal(quota.getQuotaWindowStatus("expired-off", "session")?.reachedThreshold, true);
    assert.equal(quota.isQuotaExhaustedForRequest("expired-off", "codex", "gpt-6-sol"), true);
  });
});

test("flag on: an observation older than the park cap no longer excludes the account", () => {
  withFlag(true, () => {
    seedStale("expired-on");
    assert.equal(quota.getQuotaWindowStatus("expired-on", "session")?.reachedThreshold, false);
    assert.equal(quota.isQuotaExhaustedForRequest("expired-on", "codex", "gpt-6-sol"), false);
  });
});

test("flag off (default): a passed park deadline does not release the window", () => {
  withFlag(false, () => {
    seedParkElapsed("bounded-off");
    // The per-window policy (account selection thresholds) keeps the cached percentage; the
    // account-level request check already honoured the park before #17000 and is unchanged.
    assert.equal(quota.getQuotaWindowStatus("bounded-off", "session")?.reachedThreshold, true);
  });
});

test("flag on: the window policy honours a passed bounded park deadline", () => {
  withFlag(true, () => {
    seedParkElapsed("bounded-on");
    assert.equal(quota.getQuotaWindowStatus("bounded-on", "session")?.reachedThreshold, false);
    assert.equal(quota.isQuotaExhaustedForRequest("bounded-on", "codex", "gpt-6-sol"), false);
  });
});

test("flag on: a fresh persisted exhausted snapshot still blocks after cache hydration", () => {
  withFlag(true, () => {
    snapshots.saveQuotaSnapshot({
      provider: "codex",
      connection_id: "hydrated",
      window_key: "session",
      remaining_percentage: 0,
      is_exhausted: 1,
      next_reset_at: resetAt,
      window_duration_ms: null,
      raw_data: null,
    });
    assert.equal(quota.getQuotaWindowStatus("hydrated", "session")?.reachedThreshold, true);
  });
});

test("an upstream 429 remains blocking with the flag on", () => {
  withFlag(true, () => {
    quota.markAccountExhaustedFrom429("rate-limited", "codex");
    assert.equal(quota.isAccountQuotaExhausted("rate-limited"), true);
  });
});

test("cache writes do not arm the background refresh timer (instrumentation owns it)", () => {
  quota.stopBackgroundRefresh();
  seed("no-timer");
  quota.markAccountExhaustedFrom429("no-timer-429", "codex");
  assert.equal(state.getQuotaCacheState().refreshTimer, null);
});
