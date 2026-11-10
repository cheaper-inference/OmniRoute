import test from "node:test";
import assert from "node:assert/strict";

const claudeExtraUsage = await import("../../src/lib/providers/claudeExtraUsage.ts");
const { normalizeProviderSpecificData } =
  await import("../../src/lib/providers/requestDefaults.ts");
const { updateProviderConnectionSchema } = await import("../../src/shared/validation/schemas.ts");

function futureIso(ms = 60_000) {
  return new Date(Date.now() + ms).toISOString();
}

test("Claude extra-usage blocking defaults to enabled and validates provider payloads", () => {
  assert.equal(claudeExtraUsage.isClaudeExtraUsageBlockEnabled("claude", {}), true);
  assert.equal(
    claudeExtraUsage.isClaudeExtraUsageBlockEnabled("claude", { blockExtraUsage: false }),
    false
  );
  assert.equal(
    claudeExtraUsage.isClaudeExtraUsageBlockEnabled("openai", { blockExtraUsage: false }),
    false
  );
  assert.equal(
    claudeExtraUsage.isClaudeExtraUsageAllowed("claude", { blockExtraUsage: false }),
    true
  );
  assert.equal(claudeExtraUsage.isClaudeExtraUsageAllowed("claude", {}), false);
  assert.equal(
    claudeExtraUsage.isClaudeExtraUsageAllowed("claude", { blockExtraUsage: true }),
    false
  );
  assert.equal(
    claudeExtraUsage.isClaudeExtraUsageAllowed("openai", { blockExtraUsage: false }),
    false
  );

  assert.deepEqual(normalizeProviderSpecificData("claude", { blockExtraUsage: "nope", tag: "x" }), {
    tag: "x",
  });

  const valid = updateProviderConnectionSchema.safeParse({
    providerSpecificData: { blockExtraUsage: false },
  });
  const invalid = updateProviderConnectionSchema.safeParse({
    providerSpecificData: { blockExtraUsage: "false" },
  });

  assert.equal(valid.success, true);
  assert.equal(invalid.success, false);
});

test("Claude extra-usage state builds an unavailable cooldown update from queued usage", () => {
  const sessionReset = futureIso(180_000);
  const weeklyReset = futureIso(360_000);

  const update = claudeExtraUsage.buildClaudeExtraUsageConnectionUpdate(
    {
      provider: "claude",
      providerSpecificData: { blockExtraUsage: true },
      backoffLevel: 0,
    },
    {
      extraUsage: { queued: true, billingAmount: 0.5 },
      quotas: {
        "session (5h)": { remainingPercentage: 0, resetAt: sessionReset },
        "weekly (7d)": { remainingPercentage: 62, resetAt: weeklyReset },
      },
    }
  );

  assert.equal(update?.testStatus, "unavailable");
  assert.equal(update?.lastErrorType, "quota_exhausted");
  assert.equal(update?.lastErrorSource, claudeExtraUsage.CLAUDE_EXTRA_USAGE_ERROR_SOURCE);
  assert.equal(update?.errorCode, 429);
  assert.equal(update?.rateLimitedUntil, sessionReset);
  assert.equal(update?.backoffLevel, 1);
});

test("Claude extra-usage state clears only when a trusted snapshot says queued usage ended", () => {
  const currentState = {
    provider: "claude",
    providerSpecificData: { blockExtraUsage: true },
    testStatus: "unavailable",
    lastError: claudeExtraUsage.CLAUDE_EXTRA_USAGE_ERROR_MESSAGE,
    lastErrorSource: claudeExtraUsage.CLAUDE_EXTRA_USAGE_ERROR_SOURCE,
    lastErrorType: "quota_exhausted",
    rateLimitedUntil: futureIso(180_000),
    backoffLevel: 1,
  };

  const cleared = claudeExtraUsage.buildClaudeExtraUsageConnectionUpdate(currentState, {
    extraUsage: null,
    quotas: {
      "session (5h)": { remainingPercentage: 42, resetAt: futureIso(120_000) },
    },
  });
  const unchanged = claudeExtraUsage.buildClaudeExtraUsageConnectionUpdate(currentState, {
    message: "Claude connected. Unable to fetch usage: timeout",
  });

  assert.equal(cleared?.testStatus, "active");
  assert.equal(cleared?.lastError, null);
  assert.equal(cleared?.lastErrorSource, null);
  assert.equal(cleared?.rateLimitedUntil, null);
  assert.equal(cleared?.backoffLevel, 0);
  assert.equal(unchanged, null);
});

// The usage API of some accounts (e.g. Claude Team) reports `extra_usage` as
// `{ is_enabled, monthly_limit, used_credits, utilization, ... }` and never sends `queued`. Once a
// plan window is used up, Claude keeps answering as pay-as-you-go extra usage, so the block policy
// must also trigger on "extra usage enabled + plan window exhausted".
const EXTRA_USAGE_ENABLED = {
  is_enabled: true,
  monthly_limit: 40000,
  used_credits: 120,
  utilization: 0.3,
  currency: "BRL",
  decimal_places: 2,
};

function planWindow(
  remainingPercentage: number,
  resetAt: string,
  kind: "session" | "weekly_all" | "weekly_scoped"
) {
  return { remainingPercentage, resetAt, claudeQuota: { kind } };
}

const BLOCKING_CONNECTION = {
  provider: "claude",
  providerSpecificData: {},
  backoffLevel: 0,
};

test("Claude extra-usage block triggers when the weekly window is exhausted without a queued flag", () => {
  const sessionReset = futureIso(180_000);
  const weeklyReset = futureIso(360_000);

  const update = claudeExtraUsage.buildClaudeExtraUsageConnectionUpdate(BLOCKING_CONNECTION, {
    extraUsage: EXTRA_USAGE_ENABLED,
    quotas: {
      "session (5h)": planWindow(90, sessionReset, "session"),
      "weekly (7d)": planWindow(0, weeklyReset, "weekly_all"),
    },
  });

  assert.equal(update?.testStatus, "unavailable");
  assert.equal(update?.lastErrorType, "quota_exhausted");
  assert.equal(update?.lastErrorSource, claudeExtraUsage.CLAUDE_EXTRA_USAGE_ERROR_SOURCE);
  // Parked until the window that is actually exhausted resets, not the (earlier) session reset.
  assert.equal(update?.rateLimitedUntil, weeklyReset);
});

test("Claude extra-usage block waits for the latest reset when several plan windows are exhausted", () => {
  const sessionReset = futureIso(180_000);
  const weeklyReset = futureIso(360_000);

  const update = claudeExtraUsage.buildClaudeExtraUsageConnectionUpdate(BLOCKING_CONNECTION, {
    extraUsage: EXTRA_USAGE_ENABLED,
    quotas: {
      "session (5h)": planWindow(0, sessionReset, "session"),
      "weekly (7d)": planWindow(0, weeklyReset, "weekly_all"),
    },
  });

  assert.equal(update?.rateLimitedUntil, weeklyReset);
});

test("Claude extra-usage block uses the session reset when only the 5h session is exhausted", () => {
  const sessionReset = futureIso(180_000);

  const update = claudeExtraUsage.buildClaudeExtraUsageConnectionUpdate(BLOCKING_CONNECTION, {
    extraUsage: EXTRA_USAGE_ENABLED,
    quotas: {
      "session (5h)": planWindow(0, sessionReset, "session"),
      "weekly (7d)": planWindow(60, futureIso(360_000), "weekly_all"),
    },
  });

  assert.equal(update?.testStatus, "unavailable");
  assert.equal(update?.rateLimitedUntil, sessionReset);
});

test("Claude extra-usage block does nothing while the plan windows have headroom", () => {
  const update = claudeExtraUsage.buildClaudeExtraUsageConnectionUpdate(BLOCKING_CONNECTION, {
    extraUsage: EXTRA_USAGE_ENABLED,
    quotas: {
      "session (5h)": planWindow(98, futureIso(180_000), "session"),
      "weekly (7d)": planWindow(100, futureIso(360_000), "weekly_all"),
    },
  });

  assert.equal(update, null);
});

test("Claude extra-usage block ignores an exhausted model-scoped weekly window", () => {
  const update = claudeExtraUsage.buildClaudeExtraUsageConnectionUpdate(BLOCKING_CONNECTION, {
    extraUsage: EXTRA_USAGE_ENABLED,
    quotas: {
      "session (5h)": planWindow(50, futureIso(180_000), "session"),
      "weekly Opus": planWindow(0, futureIso(360_000), "weekly_scoped"),
    },
  });

  assert.equal(update, null);
});

test("Claude extra-usage block stays out of the way when the account has no extra usage enabled", () => {
  const exhausted = { "weekly (7d)": planWindow(0, futureIso(360_000), "weekly_all") };

  assert.equal(
    claudeExtraUsage.buildClaudeExtraUsageConnectionUpdate(BLOCKING_CONNECTION, {
      extraUsage: { ...EXTRA_USAGE_ENABLED, is_enabled: false },
      quotas: exhausted,
    }),
    null
  );
  assert.equal(
    claudeExtraUsage.buildClaudeExtraUsageConnectionUpdate(BLOCKING_CONNECTION, {
      extraUsage: null,
      quotas: exhausted,
    }),
    null
  );
});

test("Claude extra-usage block is not applied when the operator allows extra usage", () => {
  const update = claudeExtraUsage.buildClaudeExtraUsageConnectionUpdate(
    { provider: "claude", providerSpecificData: { blockExtraUsage: false }, backoffLevel: 0 },
    {
      extraUsage: EXTRA_USAGE_ENABLED,
      quotas: { "weekly (7d)": planWindow(0, futureIso(360_000), "weekly_all") },
    }
  );

  assert.equal(update, null);
});

test("Claude extra-usage block lifts once the exhausted plan window has reset", () => {
  const parked = {
    ...BLOCKING_CONNECTION,
    testStatus: "unavailable",
    lastErrorSource: claudeExtraUsage.CLAUDE_EXTRA_USAGE_ERROR_SOURCE,
    lastErrorType: "quota_exhausted",
    rateLimitedUntil: futureIso(360_000),
    backoffLevel: 1,
  };

  const cleared = claudeExtraUsage.buildClaudeExtraUsageConnectionUpdate(parked, {
    extraUsage: EXTRA_USAGE_ENABLED,
    quotas: {
      "session (5h)": planWindow(97, futureIso(180_000), "session"),
      "weekly (7d)": planWindow(100, futureIso(600_000), "weekly_all"),
    },
  });

  assert.equal(cleared?.testStatus, "active");
  assert.equal(cleared?.lastErrorSource, null);
  assert.equal(cleared?.rateLimitedUntil, null);
});

test("Claude extra-usage block does not rewrite an already parked connection for the same snapshot", () => {
  const weeklyReset = futureIso(360_000);
  const snapshot = {
    extraUsage: EXTRA_USAGE_ENABLED,
    quotas: { "weekly (7d)": planWindow(0, weeklyReset, "weekly_all") },
  };
  const first = claudeExtraUsage.buildClaudeExtraUsageConnectionUpdate(
    BLOCKING_CONNECTION,
    snapshot
  );

  assert.equal(first?.rateLimitedUntil, weeklyReset);
  assert.equal(
    claudeExtraUsage.buildClaudeExtraUsageConnectionUpdate(
      { ...BLOCKING_CONNECTION, ...first },
      snapshot
    ),
    null
  );
});
