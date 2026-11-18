import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const home = fs.mkdtempSync(path.join(os.tmpdir(), "codex-dual-toggle-"));
process.env.HOME = home;
process.env.DATA_DIR = path.join(home, "data");
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const { evaluateQuotaCutoff, preflightQuota, registerQuotaFetcher } =
  await import("../../open-sse/services/quotaPreflight.ts");
const { markQuotaHealthy, unmarkQuotaHealthy } =
  await import("../../src/domain/quotaCacheState.ts");
const { resolveQuotaLimitPolicy } = await import("../../src/sse/services/auth.ts");
const core = await import("../../src/lib/db/core.ts");
const resetAt = new Date(Date.now() + 600_000).toISOString();
const thresholds = { resolveMinRemainingPercent: () => 10, isConfiguredCutoff: () => true };
function quota(windows: Record<string, number>, limitReached = false) {
  return {
    used: 100,
    total: 100,
    percentUsed: Math.max(...Object.values(windows)),
    limitReached,
    windows: Object.fromEntries(
      Object.entries(windows).map(([name, percentUsed]) => [name, { percentUsed, resetAt }])
    ),
  };
}
function scope(use5h: boolean, useWeekly: boolean, extra: Record<string, unknown> = {}) {
  return {
    provider: "codex",
    requestedModel: "gpt-5.5",
    providerSpecificData: {
      codexLimitPolicy: { use5h, useWeekly },
      allowPaidCredits: false,
      ...extra,
    },
  };
}
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(home, { recursive: true, force: true });
});

test("dual5h100 weekly85 with tracking5hOFF weeklyON should remain eligible", () => {
  assert.equal(
    evaluateQuotaCutoff(quota({ session: 1, weekly: 0.85 }), thresholds, scope(false, true))
      .proceed,
    true
  );
});
test("disabled window cannot return through aggregate limitReached", () => {
  assert.equal(
    evaluateQuotaCutoff(quota({ session: 1, weekly: 0.85 }, true), thresholds, scope(false, true))
      .proceed,
    true
  );
});
for (const use5h of [false, true]) {
  for (const useWeekly of [false, true]) {
    for (const [session, weekly] of [
      [1, 0.85],
      [0.85, 1],
      [1, 1],
      [0.85, 0.85],
    ]) {
      test(`explicit cutoffs respect toggles ${use5h}/${useWeekly} at used ${session}/${weekly}`, () => {
        const actual = evaluateQuotaCutoff(
          quota({ session, weekly }),
          thresholds,
          scope(use5h, useWeekly)
        );
        assert.equal(actual.proceed, !((use5h && session >= 0.9) || (useWeekly && weekly >= 0.9)));
      });
    }
  }
}
for (const healthy of [false, true]) {
  for (const [used, allowed] of [
    [0.89, true],
    [0.9, false],
    [0.94, false],
  ] as const) {
    test(`weekly cutoff boundary ${used}, recent success ${healthy}`, () => {
      unmarkQuotaHealthy("dual-healthy");
      if (healthy) markQuotaHealthy("dual-healthy");
      const actual = evaluateQuotaCutoff(quota({ session: 1, weekly: used }), thresholds, {
        ...scope(false, true),
        connectionId: "dual-healthy",
      });
      assert.equal(actual.proceed, allowed);
    });
  }
}
test("both toggles off do not suppress exhausted unknown or custom feature windows", () => {
  for (const key of [
    "unknown_primary",
    "gpt_5_3_codex_spark_unknown_primary",
    "code_review",
    "monthly",
  ]) {
    const actual = evaluateQuotaCutoff(
      quota({ session: 1, weekly: 1, [key]: 1 }, true),
      thresholds,
      scope(false, false)
    );
    assert.equal(actual.proceed, false);
    assert.equal(actual.windowName, key);
  }
});
test("unattributed exhaustion remains enforced without removed windows", () => {
  for (const windows of [{ weekly: 0.85 }, { unknown_primary: 0.85 }]) {
    assert.equal(
      evaluateQuotaCutoff(quota(windows, true), thresholds, scope(false, true)).proceed,
      false
    );
  }
  assert.equal(
    evaluateQuotaCutoff(
      { used: 0, total: 100, percentUsed: 0, limitReached: true },
      thresholds,
      scope(false, false)
    ).proceed,
    false
  );
  assert.equal(
    evaluateQuotaCutoff({ used: 100, total: 100, percentUsed: 1 }, thresholds, scope(false, false))
      .proceed,
    false
  );
});
test("both disabled known windows do not fall back to aggregate exhaustion", () => {
  assert.equal(
    evaluateQuotaCutoff(quota({ session: 1, weekly: 1 }, true), thresholds, scope(false, false))
      .proceed,
    true
  );
});
test("Spark windows honor the same toggles without dropping their identity", () => {
  const spark = { ...scope(false, true), requestedModel: "gpt-5.3-codex-spark" };
  assert.equal(
    evaluateQuotaCutoff(
      quota({ gpt_5_3_codex_spark_session: 1, gpt_5_3_codex_spark_weekly: 0.85 }, true),
      thresholds,
      spark
    ).proceed,
    true
  );
  const blocked = evaluateQuotaCutoff(
    quota({ gpt_5_3_codex_spark_session: 0.85, gpt_5_3_codex_spark_weekly: 1 }),
    thresholds,
    spark
  );
  assert.equal(blocked.proceed, false);
  assert.equal(blocked.windowName, "gpt_5_3_codex_spark_weekly");
});
test("only explicit false disables tracking, malformed policy stays default-on", () => {
  for (const codexLimitPolicy of [null, [], "false", { use5h: "false", useWeekly: 0 }]) {
    assert.equal(
      evaluateQuotaCutoff(
        quota({ session: 1 }),
        thresholds,
        scope(true, true, { codexLimitPolicy })
      ).proceed,
      false
    );
  }
});
test("cached policy preserves custom windows and excludes disabled aliases", () => {
  const policy = resolveQuotaLimitPolicy("codex", {
    codexLimitPolicy: { use5h: false, useWeekly: true },
    limitPolicy: {
      windows: ["Session (5h)", "5h", "gpt_5_3_codex_spark_session", "unknown_primary", "monthly"],
    },
  });
  assert.deepEqual(policy.windows, ["unknown_primary", "monthly", "weekly"]);
});
test("other providers do not inherit Codex toggles", () => {
  assert.equal(
    evaluateQuotaCutoff(quota({ session: 1 }), thresholds, {
      ...scope(false, false),
      provider: "claude",
    }).proceed,
    false
  );
});
test("paid credit consent and full opt-out retain their existing precedence", () => {
  const observed = {
    ...quota({ session: 1, weekly: 1 }),
    paidCredits: { hasCredits: true, unlimited: false, overageLimitReached: false, balance: 20 },
  };
  assert.equal(evaluateQuotaCutoff(observed, thresholds, scope(true, true)).proceed, false);
  assert.equal(
    evaluateQuotaCutoff(observed, thresholds, scope(true, true, { allowPaidCredits: true }))
      .proceed,
    true
  );
  assert.equal(
    evaluateQuotaCutoff(observed, thresholds, {
      ...scope(true, true, { allowPaidCredits: true }),
      requestedModel: "gpt-5.3-codex-spark",
    }).proceed,
    false
  );
  assert.equal(
    evaluateQuotaCutoff(
      observed,
      thresholds,
      scope(true, true, { quotaPreflightEnabled: false, limitPolicy: { enabled: false } })
    ).proceed,
    true
  );
});
test("preflight warning and cutoff both ignore disabled windows", async () => {
  registerQuotaFetcher("codex", async () => quota({ session: 1, weekly: 0.4 }, true));
  const warnings: unknown[][] = [];
  const original = console.warn;
  console.warn = (...args: unknown[]) => {
    warnings.push(args);
  };
  try {
    assert.equal(
      (await preflightQuota("codex", "dual-warning", scope(false, true), thresholds)).proceed,
      true
    );
    assert.deepEqual(warnings, []);
  } finally {
    console.warn = original;
  }
});
