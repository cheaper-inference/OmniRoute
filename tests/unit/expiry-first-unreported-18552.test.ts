import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dataDir = mkdtempSync(join(tmpdir(), "omni-expiry-18552-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../src/lib/db/core.ts");
const cache = await import("../../src/domain/quotaCache.ts");
const { buildConnectionQuotaWindowsView } =
  await import("../../src/sse/services/expiryFirstAccountSelection.ts");
const { resolveExpiryFirstConfig, scoreExpiryFirstQuota } =
  await import("../../open-sse/services/combo/quotaScoring.ts");

const now = Date.now();
const reset = (hours: number) => new Date(now + hours * 3_600_000).toISOString();
const config = resolveExpiryFirstConfig(null);
type Window = {
  remainingPercentage?: number;
  fractionReported?: boolean;
  resetAt?: string | null;
  unlimited?: boolean;
};
let sequence = 0;
function view(windows: Record<string, Window>) {
  const id = `expiry-18552-${sequence++}`;
  cache.setQuotaCache(id, "claude", windows);
  return buildConnectionQuotaWindowsView(id);
}

test.after(() => {
  cache.stopBackgroundRefresh();
  core.resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true });
});

for (const metrics of [undefined, { capacityWeight: 1 }]) {
  test(`#18552 unreported quota windows do not exhaust or inflate accounts (${metrics ? "metrics" : "legacy"})`, () => {
    const score = (windows: Record<string, Window>) =>
      scoreExpiryFirstQuota(view(windows), config, now, metrics).score;
    const known = { remainingPercentage: 60, resetAt: reset(20) };
    assert.equal(
      score({ neurons: known, requests: { unlimited: true } }),
      score({ neurons: known })
    );
    assert.equal(score({ "requests today": known, credits: { unlimited: true } }), 0.03);
    const session = { remainingPercentage: 50, resetAt: reset(3) };
    const unknownWeekly = { remainingPercentage: 0, fractionReported: false, resetAt: reset(100) };
    // Retain the weekly deadline instead of inflating urgency to 0.5 / 3h.
    assert.equal(score({ session, weekly: unknownWeekly }), 0.005);
    assert.equal(score({ weekly: unknownWeekly }), 0);
    assert.equal(view({ weekly: unknownWeekly }), null);
    // An unknown monthly row must not hide a reported weekly reset.
    const weekly = { remainingPercentage: 90, resetAt: reset(10) };
    assert.equal(
      score({ weekly, monthly: { ...unknownWeekly, resetAt: reset(1) } }),
      score({ weekly })
    );
    // Unknown canonical rows must not shadow a reported scoped/nonstandard row.
    const sonnet = { remainingPercentage: 10, resetAt: reset(100) };
    assert.ok(
      Math.abs(score({ weekly: unknownWeekly, "weekly sonnet (7d)": sonnet }) - 0.001) < 1e-12
    );
    assert.ok(
      Math.abs(score({ session, weekly: unknownWeekly, "weekly sonnet (7d)": sonnet }) - 0.001) <
        1e-12
    );
    assert.equal(score({ weekly: unknownWeekly, other: known }), score({ other: known }));
    assert.equal(
      score({ session: { remainingPercentage: 0, resetAt: reset(3) }, weekly: unknownWeekly }),
      0
    );
  });
}
