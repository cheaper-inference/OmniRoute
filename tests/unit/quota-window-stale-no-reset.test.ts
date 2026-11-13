import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-quota-stale-no-reset-"));
process.env.DATA_DIR = dir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.QUOTA_WINDOW_BOUNDED_PARK;
const core = await import("../../src/lib/db/core.ts");
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
test.afterEach(() => quota.__clearForTests());
test.after(() => {
  quota.stopBackgroundRefresh();
  core.resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});

test("an exhausted window with no reset, seen over 2 h ago, no longer pauses the account", () => {
  seed("stale", 2 * HOUR + 1);
  assert.equal(quota.getQuotaWindowStatus("stale", "session")?.reachedThreshold, false);
});

test("the same window seen 1 h ago still pauses the account", () => {
  seed("recent", HOUR);
  assert.equal(quota.getQuotaWindowStatus("recent", "session")?.reachedThreshold, true);
});

test("an old window with a future reset keeps pausing the account until that reset", () => {
  seed("future", 3 * HOUR, futureReset);
  assert.equal(quota.getQuotaWindowStatus("future", "session")?.reachedThreshold, true);
});
