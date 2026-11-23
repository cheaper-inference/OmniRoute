import assert from "node:assert/strict";
import test from "node:test";
import {
  evaluateQuotaCutoff,
  preflightQuota,
  registerQuotaFetcher,
  type QuotaInfo,
} from "../../open-sse/services/quotaPreflight.ts";
import { convertUsageToQuotaInfo } from "../../open-sse/services/genericQuotaFetcher.ts";
import { markQuotaHealthy, unmarkQuotaHealthy } from "../../src/domain/quotaCacheState.ts";

const NOW = Date.parse("2026-11-16T12:00:00Z");
const PAST = "2026-11-16T11:20:00Z";
const FUTURE = "2026-11-20T12:00:00Z";
const thresholds = { resolveMinRemainingPercent: () => 1, isConfiguredCutoff: () => true };
const scope = { provider: "claude", providerSpecificData: { blockExtraUsage: true } };

test.beforeEach((t) => t.mock.timers.enable({ apis: ["Date"], now: NOW }));

function teamQuota(): QuotaInfo {
  const quota = convertUsageToQuotaInfo({
    quotas: {
      "session (5h)": { used: 100, total: 100, resetAt: PAST },
      "weekly (7d)": { used: 28, total: 100, resetAt: FUTURE },
    },
  });
  assert.ok(quota);
  return quota;
}

test("expired Claude session and its aggregate cannot block a healthy weekly window", () => {
  const quota = teamQuota();
  assert.equal(quota.limitReached, true);
  assert.equal(quota.resetAt, PAST);
  assert.equal(evaluateQuotaCutoff(quota, thresholds, scope).proceed, true);
});

test("the first request after the reset can dispatch without stale cutoff warnings", async (t) => {
  const warning = t.mock.method(console, "warn", () => {});
  registerQuotaFetcher("expired-session-test", async () => teamQuota());
  const result = await preflightQuota("expired-session-test", "never-succeeded", {}, thresholds);
  assert.equal(result.proceed, true);
  assert.equal(warning.mock.callCount(), 0);
});

for (const resetAt of [FUTURE, undefined, null, "", "invalid-date"]) {
  test(`an exhausted window remains blocking with reset ${String(resetAt)}`, () => {
    const quota = teamQuota();
    quota.windows!["session (5h)"].resetAt = resetAt;
    const result = evaluateQuotaCutoff(quota, thresholds, scope);
    assert.equal(result.proceed, false);
    assert.equal(result.windowName, "session (5h)");
  });
}

test("a window becomes eligible exactly at its reset boundary", () => {
  const quota = teamQuota();
  quota.windows!["session (5h)"].resetAt = new Date(NOW).toISOString();
  assert.equal(evaluateQuotaCutoff(quota, thresholds, scope).proceed, true);
});

for (const weeklyUsed of [0.99, 1]) {
  test(`an expired session preserves the current weekly cutoff at ${weeklyUsed}`, () => {
    const quota = teamQuota();
    quota.windows!["weekly (7d)"].percentUsed = weeklyUsed;
    const result = evaluateQuotaCutoff(quota, thresholds, scope);
    assert.equal(result.proceed, false);
    assert.equal(result.windowName, "weekly (7d)");
    assert.equal(result.resetAt, FUTURE);
  });
}

test("more than 1% remaining in the current week is still usable", () => {
  const quota = teamQuota();
  quota.windows!["weekly (7d)"].percentUsed = 0.98;
  assert.equal(evaluateQuotaCutoff(quota, thresholds, scope).proceed, true);
});

for (const resetAt of [FUTURE, undefined, null, "invalid-date"]) {
  test(`unattributed upstream exhaustion remains blocking with reset ${String(resetAt)}`, () => {
    assert.equal(
      evaluateQuotaCutoff({ ...teamQuota(), resetAt }, thresholds, scope).proceed,
      false
    );
  });
}

test("legacy aggregate exhaustion expires only when its known reset has elapsed", () => {
  for (const resetAt of [PAST, FUTURE, undefined, "invalid-date"]) {
    for (const limitReached of [false, true]) {
      assert.equal(
        evaluateQuotaCutoff({ used: 100, total: 100, percentUsed: 1, resetAt, limitReached })
          .proceed,
        resetAt === PAST
      );
    }
  }
});

test("an expired alternative budget does not leave only its exhausted sibling blocking", () => {
  assert.equal(
    evaluateQuotaCutoff({
      used: 100,
      total: 100,
      percentUsed: 1,
      windows: {
        credit: { percentUsed: 1, resetAt: FUTURE },
        credit_freetrial: { percentUsed: 1, resetAt: PAST },
      },
    }).proceed,
    true
  );
});

test("Codex window opt-outs still exclude disabled current windows", () => {
  const quota = teamQuota();
  quota.windows!["weekly (7d)"].percentUsed = 1;
  assert.equal(
    evaluateQuotaCutoff(quota, thresholds, {
      provider: "codex",
      providerSpecificData: { codexLimitPolicy: { useWeekly: false } },
    }).proceed,
    true
  );
});

test("configured cutoffs use the same reset semantics after a recent success", () => {
  const connectionId = "expired-window-healthy-test";
  markQuotaHealthy(connectionId);
  try {
    for (const resetAt of [PAST, FUTURE, undefined, "invalid-date"]) {
      const quota = teamQuota();
      quota.windows!["session (5h)"].resetAt = resetAt;
      assert.equal(
        evaluateQuotaCutoff(quota, thresholds, { ...scope, connectionId }).proceed,
        resetAt === PAST
      );
      assert.equal(
        evaluateQuotaCutoff({ used: 100, total: 100, percentUsed: 1, resetAt }, thresholds, {
          ...scope,
          connectionId,
        }).proceed,
        resetAt === PAST
      );
    }
    assert.equal(
      evaluateQuotaCutoff(
        {
          used: 100,
          total: 100,
          percentUsed: 1,
          windows: {
            credit: { percentUsed: 1, resetAt: FUTURE },
            credit_freetrial: { percentUsed: 1, resetAt: PAST },
          },
        },
        thresholds,
        { connectionId }
      ).proceed,
      true
    );
  } finally {
    unmarkQuotaHealthy(connectionId);
  }
});
