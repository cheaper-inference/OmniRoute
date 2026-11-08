import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-codex-quota-boundary-"));
process.env.DATA_DIR = dataDir;
process.env.APP_LOG_TO_FILE = "false";
const core = await import("../../src/lib/db/core.ts");
const cache = await import("../../src/domain/quotaCache.ts");

test.after(() => {
  cache.stopBackgroundRefresh();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test.beforeEach(() => cache.__clearForTests());

for (const [model, window] of [
  ["gpt-6-sol", "session"],
  ["gpt-5.3-codex-spark", "gpt_5_3_codex_spark_session"],
]) {
  for (const remainingPercentage of [1, 0.5, 0]) {
    test(`${model}: ${remainingPercentage}% remaining survives cache hydration`, () => {
      const id = `boundary-${model}-${remainingPercentage}`;
      const resetAt = new Date(Date.now() + 86_400_000).toISOString();
      cache.setQuotaCache(id, "codex", { [window]: { remainingPercentage, resetAt } });
      for (const hydrated of [false, true]) {
        if (hydrated) cache.__clearForTests();
        assert.equal(
          cache.isQuotaExhaustedForRequest(id, "codex", model),
          remainingPercentage === 0,
          `hydrated=${hydrated}`
        );
        // Configurable early cutoff stays independent of actual exhaustion.
        assert.equal(cache.getQuotaWindowStatus(id, window, 99)?.reachedThreshold, true);
      }
    });
  }
}
