import test from "node:test";
import assert from "node:assert/strict";
import { createTempDataDir } from "../_setup/tempDataDir.ts";

const { cleanup } = createTempDataDir("quota-stale-no-reset-");
delete process.env.QUOTA_WINDOW_BOUNDED_PARK;
delete process.env.QUOTA_STALE_SAMPLE_RELEASE;
const quota = await import("../../src/domain/quotaCache.ts");

const HOUR = 3600000;
const futureReset = new Date(Date.now() + 7 * 86400000).toISOString();

/** An exhausted window last observed `ageMs` ago. */
function seed(id: string, ageMs: number, resetAt?: string) {
  quota.setQuotaCache(id, "openai", {
    session: { remainingPercentage: 0, ...(resetAt ? { resetAt } : {}) },
  });
  quota.getQuotaCache(id)!.fetchedAt = Date.now() - ageMs;
}
function reached(id: string): boolean | undefined {
  return quota.getQuotaWindowStatus(id, "session")?.reachedThreshold;
}

test.afterEach(() => {
  delete process.env.QUOTA_STALE_SAMPLE_RELEASE;
  quota.__clearForTests();
});
test.after(() => {
  quota.stopBackgroundRefresh();
  return cleanup();
});

test("flag on: an exhausted window with no reset, seen over 2 h ago, stops pausing the account", () => {
  process.env.QUOTA_STALE_SAMPLE_RELEASE = "true";
  seed("stale", 2 * HOUR + 1);
  assert.equal(reached("stale"), false);
});

test("flag on: the same window seen 1 h ago still pauses the account", () => {
  process.env.QUOTA_STALE_SAMPLE_RELEASE = "true";
  seed("recent", HOUR);
  assert.equal(reached("recent"), true);
});

test("flag on: an old window with a future reset keeps pausing the account until that reset", () => {
  process.env.QUOTA_STALE_SAMPLE_RELEASE = "true";
  seed("future", 3 * HOUR, futureReset);
  assert.equal(reached("future"), true);
});

test("flag off: a stale exhausted window with no reset keeps pausing the account (today's behaviour)", () => {
  seed("stale-off", 3 * HOUR);
  assert.equal(reached("stale-off"), true);
});
