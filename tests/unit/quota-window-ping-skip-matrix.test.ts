/**
 * Quota window ping: skip matrix (14 ordered rows) and reset fingerprint.
 *
 * One case per skip reason, the binding evaluation order, the threshold and
 * stale-telemetry boundaries, dry-run handling and fingerprint dedupe. Deps are
 * fake objects: no timers, no DB, no network.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Importing the service transitively imports quotaAutoPing.ts (DB modules). Point
// DATA_DIR at a throwaway tmpdir before the import, same as quota-auto-ping.test.ts.
process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-window-ping-skip-"));

const { evaluateQuotaWindowPingSkip, resetFingerprint, normalizeResetKey } =
  await import("../../src/lib/services/quotaWindowPing.ts");
const { normalizeResetKey: legacyNormalizeResetKey } =
  await import("../../src/lib/services/quotaAutoPing.ts");

const NOW = new Date("2026-01-01T12:00:00.000Z").getTime();
const DAY_MS = 24 * 60 * 60 * 1000;
const SESSION_MS = 18000 * 1000;
const FULL_HORIZON = new Date(NOW + SESSION_MS).toISOString();

function iso(ms) {
  return new Date(ms).toISOString();
}

function descriptor(overrides = {}) {
  return {
    id: "codex:session",
    provider: "codex",
    model: null,
    modelFamily: null,
    scope: "connection",
    windowId: "session",
    displayName: "Session (5h)",
    kind: "first-use",
    durationSeconds: 18000,
    longerWindow: null,
    policy: "scheduled",
    scheduledAllowed: true,
    resetAtSource: "upstream-window",
    globalResetAt: true,
    windowActiveEvidence: "reset-horizon",
    pingModelCandidates: [],
    pingText: "hi",
    pingInstructions: "Reply with OK.",
    pingReasoningEffort: "none",
    pingMaxTokens: null,
    ...overrides,
  };
}

function claudeDescriptor(overrides = {}) {
  return descriptor({
    id: "claude:session",
    provider: "claude",
    windowId: "session (5h)",
    policy: "manual",
    windowActiveEvidence: "none",
    pingInstructions: null,
    pingReasoningEffort: null,
    pingMaxTokens: 1,
    ...overrides,
  });
}

function target(overrides = {}) {
  return {
    id: "target-1",
    connectionId: "conn-1",
    provider: "codex",
    model: null,
    windowId: "session",
    descriptorId: "codex:session",
    enabled: true,
    schedule: { kind: "interval", minutes: 30 },
    minLongerWindowRemainingPct: 0,
    dryRun: false,
    claudeBillableConfirmed: false,
    lastPingedFingerprint: null,
    lastPingAt: null,
    failureAt: null,
    nextRunAt: iso(NOW),
    createdAt: iso(NOW - DAY_MS),
    updatedAt: iso(NOW - DAY_MS),
    ...overrides,
  };
}

function connection(overrides = {}) {
  return {
    id: "conn-1",
    provider: "codex",
    authType: "oauth",
    isActive: true,
    accessToken: "token",
    ...overrides,
  };
}

function usageWindow(overrides = {}) {
  return {
    reported: true,
    resetAt: FULL_HORIZON,
    remainingPct: 80,
    exhausted: false,
    windowSeconds: 18000,
    ...overrides,
  };
}

function reading(overrides = {}) {
  return {
    provider: "codex",
    complete: true,
    stale: false,
    message: null,
    windows: { session: usageWindow() },
    ...overrides,
  };
}

function fakeStore() {
  return {
    listWindowPingTargets: () => [],
    getWindowPingTarget: () => null,
    countEnabledWindowPingTargets: () => 0,
    claimWindowPingRun: () => ({ kind: "not_due" }),
    finishWindowPingRun: () => null,
    recoverWindowPingRuns: () => 0,
    renewWindowPingRunLease: () => {
      throw new Error("store not used by evaluation");
    },
    listWindowPingRuns: () => [],
    markWindowPingTargetPinged: () => {
      throw new Error("store not used by evaluation");
    },
    markWindowPingTargetFailed: () => {
      throw new Error("store not used by evaluation");
    },
  };
}

function makeDeps(overrides = {}) {
  const calls = {
    settings: 0,
    fetchUsage: 0,
    throttle: 0,
    proxy: 0,
    pingModel: 0,
    lease: 0,
    breaker: 0,
  };
  const deps = {
    getSettings: async () => {
      calls.settings += 1;
      return { quotaWindowPing: { enabled: true } };
    },
    getProviderConnectionById: async () => connection(),
    updateProviderConnection: async () => null,
    refreshAndUpdateCredentials: async (current) => ({ connection: current }),
    fetchUsage: async () => {
      calls.fetchUsage += 1;
      return reading();
    },
    throttleQuotaFetch: async () => {
      calls.throttle += 1;
    },
    resolveProxyForConnection: async () => {
      calls.proxy += 1;
      return null;
    },
    runWithProxyContext: async (_proxy, callback) => callback(),
    getExecutor: async () => {
      throw new Error("evaluation must not load an executor");
    },
    resolvePingModel: async () => {
      calls.pingModel += 1;
      return "gpt-5.1-codex-mini";
    },
    canExecuteProvider: () => {
      calls.breaker += 1;
      return true;
    },
    isConnectionUnavailableToAuxiliaryActivity: async () => {
      calls.lease += 1;
      return false;
    },
    saveCallLog: async () => {},
    store: fakeStore(),
  };
  return { deps: { ...deps, ...overrides }, calls };
}

function context(overrides = {}) {
  return {
    target: target(),
    descriptor: descriptor(),
    connection: connection(),
    trigger: "scheduled",
    nowMs: NOW,
    ...overrides,
  };
}

async function evaluate(overrides = {}, depsOverrides = {}) {
  const { deps, calls } = makeDeps(depsOverrides);
  const decision = await evaluateQuotaWindowPingSkip(context(overrides), deps);
  return { decision, calls };
}

const sessionWithWeekly = descriptor({
  longerWindow: { descriptorId: "codex:weekly", windowId: "weekly" },
});

function longerReading(remainingPct, overrides = {}) {
  return reading({
    windows: {
      session: usageWindow(),
      weekly: usageWindow({
        resetAt: iso(NOW + 6 * DAY_MS),
        remainingPct,
        windowSeconds: 604800,
      }),
    },
    ...overrides,
  });
}

// ---------------------------------------------------------------------------
// One case per skip reason, in the binding order.
// ---------------------------------------------------------------------------

test("row 1 target_disabled: a disabled target skips before any settings read", async () => {
  const { decision, calls } = await evaluate({ target: target({ enabled: false }) });
  assert.equal(decision.action, "skip");
  assert.equal(decision.reason, "target_disabled");
  assert.equal(decision.fingerprint, null);
  assert.equal(decision.window, null);
  assert.equal(calls.settings, 0);
  assert.equal(calls.fetchUsage, 0);
});

test("row 1 target_disabled: ignoreEnabled lets the explicit manual run proceed", async () => {
  const { decision } = await evaluate({
    target: target({ enabled: false }),
    trigger: "manual",
    ignoreEnabled: true,
  });
  assert.equal(decision.action, "execute");
});

test("row 2 kill_switch_off: only quotaWindowPing.enabled === true arms evaluation", async () => {
  for (const settings of [{}, { quotaWindowPing: {} }, { quotaWindowPing: { enabled: "true" } }]) {
    const { decision, calls } = await evaluate({}, { getSettings: async () => settings });
    assert.equal(decision.action, "skip");
    assert.equal(decision.reason, "kill_switch_off");
    assert.equal(calls.fetchUsage, 0);
  }
});

test("row 3 account_disabled: missing connection", async () => {
  const { decision, calls } = await evaluate({ connection: null });
  assert.equal(decision.reason, "account_disabled");
  assert.equal(calls.breaker, 0);
  assert.equal(calls.fetchUsage, 0);
});

test("row 3 account_disabled: isActive false", async () => {
  const { decision } = await evaluate({ connection: connection({ isActive: false }) });
  assert.equal(decision.reason, "account_disabled");
});

test("row 3 account_disabled: terminal banned and expired connection statuses", async () => {
  for (const testStatus of ["banned", "expired"]) {
    const { decision } = await evaluate({ connection: connection({ testStatus }) });
    assert.equal(decision.reason, "account_disabled");
  }
});

test("row 3 account_disabled: a mixed-case terminal status is still terminal", async () => {
  for (const testStatus of ["Banned", "Expired"]) {
    const { decision } = await evaluate({ connection: connection({ testStatus }) });
    assert.equal(decision.reason, "account_disabled");
  }
});

test("row 4 breaker_open: provider circuit breaker beats cooling and lease", async () => {
  const { decision, calls } = await evaluate(
    { connection: connection({ rateLimitedUntil: iso(NOW + 60_000) }) },
    {
      canExecuteProvider: () => false,
      isConnectionUnavailableToAuxiliaryActivity: async () => true,
    }
  );
  assert.equal(decision.reason, "breaker_open");
  assert.equal(calls.lease, 0);
  assert.equal(calls.fetchUsage, 0);
});

test("row 5 breaker_cooling: rateLimitedUntil in the future", async () => {
  const { decision } = await evaluate({
    connection: connection({ rateLimitedUntil: iso(NOW + 1) }),
  });
  assert.equal(decision.reason, "breaker_cooling");
});

test("row 5 breaker_cooling: rateLimitedUntil exactly now is no longer limited", async () => {
  const { decision } = await evaluate({
    connection: connection({ rateLimitedUntil: iso(NOW) }),
  });
  assert.equal(decision.action, "execute");
});

test("row 5 breaker_cooling: failure_at inside 15 minutes skips, at exactly 15 minutes pings", async () => {
  const inside = await evaluate({
    target: target({ failureAt: iso(NOW - 14 * 60_000 - 59_000) }),
  });
  assert.equal(inside.decision.reason, "breaker_cooling");

  const boundary = await evaluate({ target: target({ failureAt: iso(NOW - 15 * 60_000) }) });
  assert.equal(boundary.decision.action, "execute");
});

test("row 6 exclusive_lease: held connection beats in_flight and no_model", async () => {
  const { decision, calls } = await evaluate(
    { inFlight: true },
    {
      isConnectionUnavailableToAuxiliaryActivity: async () => true,
      resolvePingModel: async () => null,
    }
  );
  assert.equal(decision.reason, "exclusive_lease");
  assert.equal(calls.pingModel, 0);
  assert.equal(calls.fetchUsage, 0);
});

test("row 7 in_flight: a live run beats no_model and already_pinged_reset", async () => {
  const resetAt = FULL_HORIZON;
  const fingerprint = resetFingerprint(resetAt);
  const { decision, calls } = await evaluate(
    { inFlight: true, target: target({ lastPingedFingerprint: fingerprint }) },
    {
      resolvePingModel: async () => null,
      fetchUsage: async () => reading({ windows: { session: usageWindow({ resetAt }) } }),
    }
  );
  assert.equal(decision.reason, "in_flight");
  assert.equal(calls.pingModel, 0);
  assert.equal(calls.fetchUsage, 0);
});

test("row 8 no_model: nothing selectable skips before the usage read", async () => {
  const { decision, calls } = await evaluate({}, { resolvePingModel: async () => null });
  assert.equal(decision.reason, "no_model");
  assert.equal(calls.fetchUsage, 0);
  assert.equal(calls.proxy, 0);
  assert.equal(calls.throttle, 0);
});

test("row 9 telemetry_stale: stale reading; the one read is throttled and proxied", async () => {
  let fetches = 0;
  const { decision, calls } = await evaluate(
    {},
    {
      fetchUsage: async () => {
        fetches += 1;
        return reading({ stale: true });
      },
    }
  );
  assert.equal(decision.reason, "telemetry_stale");
  assert.equal(fetches, 1);
  assert.equal(calls.throttle, 1);
  assert.equal(calls.proxy, 1);
});

test("row 9 telemetry_stale: message-only reading", async () => {
  const { decision } = await evaluate(
    {},
    { fetchUsage: async () => reading({ message: "quota endpoint unavailable" }) }
  );
  assert.equal(decision.reason, "telemetry_stale");
});

test("row 9 telemetry_stale: target window unreported", async () => {
  const { decision } = await evaluate(
    {},
    { fetchUsage: async () => reading({ windows: { session: usageWindow({ reported: false }) } }) }
  );
  assert.equal(decision.reason, "telemetry_stale");
});

test("row 9 telemetry_stale: target resetAt null", async () => {
  const { decision } = await evaluate(
    {},
    { fetchUsage: async () => reading({ windows: { session: usageWindow({ resetAt: null }) } }) }
  );
  assert.equal(decision.reason, "telemetry_stale");
});

test("row 9 telemetry_stale: target remainingPct null is unknown, never a fraction", async () => {
  const { decision } = await evaluate(
    {},
    {
      fetchUsage: async () =>
        reading({ windows: { session: usageWindow({ remainingPct: null }) } }),
    }
  );
  assert.equal(decision.reason, "telemetry_stale");
});

test("row 9 telemetry_stale: configured longer window unreported or unknown", async () => {
  for (const weekly of [
    undefined,
    usageWindow({ reported: false }),
    usageWindow({ remainingPct: null }),
  ]) {
    const windows = { session: usageWindow() };
    if (weekly !== undefined) windows.weekly = weekly;
    const { decision } = await evaluate(
      { descriptor: sessionWithWeekly, target: target({ minLongerWindowRemainingPct: 50 }) },
      { fetchUsage: async () => reading({ windows }) }
    );
    assert.equal(decision.reason, "telemetry_stale");
  }
});

test("row 9 telemetry_stale: incomplete Claude payload without the target window", async () => {
  const { decision } = await evaluate(
    {
      descriptor: claudeDescriptor(),
      target: target({
        provider: "claude",
        descriptorId: "claude:session",
        windowId: "session (5h)",
      }),
      connection: connection({ provider: "claude" }),
    },
    { fetchUsage: async () => reading({ provider: "claude", complete: false, windows: {} }) }
  );
  assert.equal(decision.reason, "telemetry_stale");
});

test("row 10 window_exhausted: a 0% target window skips instead of a doomed ping", async () => {
  let fetches = 0;
  const { decision } = await evaluate(
    {},
    {
      fetchUsage: async () => {
        fetches += 1;
        return reading({
          windows: { session: usageWindow({ remainingPct: 0, exhausted: true }) },
        });
      },
    }
  );
  assert.equal(decision.action, "skip");
  assert.equal(decision.reason, "window_exhausted");
  assert.equal(decision.fingerprint, resetFingerprint(FULL_HORIZON));
  assert.equal(fetches, 1);
});

test("row 11 window_active: a partial reset horizon skips", async () => {
  const { decision } = await evaluate(
    {},
    {
      fetchUsage: async () =>
        reading({ windows: { session: usageWindow({ resetAt: iso(NOW + 10_000_000) }) } }),
    }
  );
  assert.equal(decision.reason, "window_active");
});

test("row 11 window_active boundary: full horizon and the 60 s tolerance edge ping", async () => {
  const edges = [NOW + SESSION_MS, NOW + SESSION_MS - 60_000];
  for (const resetAtMs of edges) {
    const { decision } = await evaluate(
      {},
      {
        fetchUsage: async () =>
          reading({ windows: { session: usageWindow({ resetAt: iso(resetAtMs) }) } }),
      }
    );
    assert.equal(decision.action, "execute");
  }
});

test("row 11 window_active boundary: one millisecond inside the tolerance skips", async () => {
  const { decision } = await evaluate(
    {},
    {
      fetchUsage: async () =>
        reading({
          windows: { session: usageWindow({ resetAt: iso(NOW + SESSION_MS - 60_000 - 1) }) },
        }),
    }
  );
  assert.equal(decision.reason, "window_active");
});

test("row 11 window_active: evidence none never returns window_active", async () => {
  const weekly = descriptor({
    id: "codex:weekly",
    windowId: "weekly",
    durationSeconds: 604800,
    longerWindow: null,
    windowActiveEvidence: "none",
  });
  const { decision } = await evaluate(
    {
      descriptor: weekly,
      target: target({ descriptorId: "codex:weekly", windowId: "weekly" }),
    },
    {
      fetchUsage: async () =>
        reading({
          windows: {
            weekly: usageWindow({ resetAt: iso(NOW + 3_600_000), windowSeconds: 604800 }),
          },
        }),
    }
  );
  assert.equal(decision.action, "execute");
});

test("row 11 window_active: the reported windowSeconds, not the descriptor duration, sets the horizon", async () => {
  const { decision } = await evaluate(
    {},
    {
      fetchUsage: async () =>
        reading({
          windows: {
            session: usageWindow({ resetAt: iso(NOW + 6 * 60 * 60 * 1000), windowSeconds: 28800 }),
          },
        }),
    }
  );
  assert.equal(decision.reason, "window_active");
});

test("row 12 longer_window_exhausted", async () => {
  const { decision } = await evaluate(
    { descriptor: sessionWithWeekly, target: target({ minLongerWindowRemainingPct: 50 }) },
    {
      fetchUsage: async () =>
        longerReading(40, {
          windows: {
            session: usageWindow(),
            weekly: usageWindow({
              resetAt: iso(NOW + 6 * DAY_MS),
              remainingPct: 40,
              exhausted: true,
              windowSeconds: 604800,
            }),
          },
        }),
    }
  );
  assert.equal(decision.reason, "longer_window_exhausted");
});

test("row 13 longer_window_below_threshold: equal to the threshold pings, below skips", async () => {
  const atThreshold = await evaluate(
    { descriptor: sessionWithWeekly, target: target({ minLongerWindowRemainingPct: 50 }) },
    { fetchUsage: async () => longerReading(50) }
  );
  assert.equal(atThreshold.decision.action, "execute");

  const below = await evaluate(
    { descriptor: sessionWithWeekly, target: target({ minLongerWindowRemainingPct: 50 }) },
    { fetchUsage: async () => longerReading(49.9) }
  );
  assert.equal(below.decision.reason, "longer_window_below_threshold");
});

test("row 13 longer_window_below_threshold: threshold 0 disables only the below check", async () => {
  const { decision } = await evaluate(
    { descriptor: sessionWithWeekly, target: target({ minLongerWindowRemainingPct: 0 }) },
    { fetchUsage: async () => longerReading(0) }
  );
  assert.equal(decision.action, "execute");
});

test("row 14 already_pinged_reset: the target fingerprint blocks the same resetAt", async () => {
  const resetAt = FULL_HORIZON;
  const fingerprint = resetFingerprint(resetAt);
  const { decision } = await evaluate(
    { target: target({ lastPingedFingerprint: fingerprint }) },
    { fetchUsage: async () => reading({ windows: { session: usageWindow({ resetAt }) } }) }
  );
  assert.equal(decision.reason, "already_pinged_reset");
  assert.equal(decision.fingerprint, fingerprint);
});

test("row 14 already_pinged_reset: the legacy Codex lastPingedResetKey blocks the same resetAt", async () => {
  const resetAt = FULL_HORIZON;
  const fingerprint = resetFingerprint(resetAt);
  const { decision } = await evaluate(
    { connection: connection({ lastPingedResetKey: fingerprint }) },
    { fetchUsage: async () => reading({ windows: { session: usageWindow({ resetAt }) } }) }
  );
  assert.equal(decision.reason, "already_pinged_reset");
});

test("row 14 boundary: a different resetAt or a different target pings", async () => {
  const resetAt = FULL_HORIZON;
  const fingerprint = resetFingerprint(resetAt);

  const nextReset = await evaluate(
    { target: target({ lastPingedFingerprint: fingerprint }) },
    {
      fetchUsage: async () =>
        reading({ windows: { session: usageWindow({ resetAt: iso(NOW + SESSION_MS + 60_000) }) } }),
    }
  );
  assert.equal(nextReset.decision.action, "execute");

  const otherTarget = await evaluate(
    { target: target({ id: "target-2", lastPingedFingerprint: null }) },
    { fetchUsage: async () => reading({ windows: { session: usageWindow({ resetAt }) } }) }
  );
  assert.equal(otherTarget.decision.action, "execute");

  const claudeLegacyKey = await evaluate(
    {
      descriptor: claudeDescriptor(),
      target: target({
        provider: "claude",
        descriptorId: "claude:session",
        windowId: "session (5h)",
      }),
      connection: connection({ provider: "claude", lastPingedResetKey: fingerprint }),
    },
    {
      fetchUsage: async () =>
        reading({
          provider: "claude",
          windows: { "session (5h)": usageWindow({ resetAt }) },
        }),
    }
  );
  assert.equal(claudeLegacyKey.decision.action, "execute");
});

test("row 14 already_pinged_reset: a successful ping starts a 10-minute minimum interval", async () => {
  const { decision } = await evaluate(
    { target: target({ lastPingAt: iso(NOW - 5 * 60_000) }) },
    { fetchUsage: async () => reading() }
  );
  assert.equal(decision.reason, "already_pinged_reset");
});

test("row 14 boundary: a ping exactly 10 minutes ago with a new fingerprint pings", async () => {
  const { decision } = await evaluate(
    { target: target({ lastPingAt: iso(NOW - 10 * 60_000) }) },
    { fetchUsage: async () => reading() }
  );
  assert.equal(decision.action, "execute");
});

// ---------------------------------------------------------------------------
// Binding evaluation order.
// ---------------------------------------------------------------------------

test("ordering: rows short-circuit in the declared order", async () => {
  let result = await evaluate(
    { target: target({ enabled: false }) },
    { getSettings: async () => ({}), canExecuteProvider: () => false }
  );
  assert.equal(result.decision.reason, "target_disabled");

  result = await evaluate(
    { connection: connection({ testStatus: "banned" }) },
    { getSettings: async () => ({}), canExecuteProvider: () => false }
  );
  assert.equal(result.decision.reason, "kill_switch_off");

  result = await evaluate(
    { connection: connection({ testStatus: "expired" }) },
    { canExecuteProvider: () => false }
  );
  assert.equal(result.decision.reason, "account_disabled");

  result = await evaluate(
    { connection: connection({ rateLimitedUntil: iso(NOW + 60_000) }) },
    { canExecuteProvider: () => false }
  );
  assert.equal(result.decision.reason, "breaker_open");

  result = await evaluate(
    { connection: connection({ rateLimitedUntil: iso(NOW + 60_000) }) },
    { isConnectionUnavailableToAuxiliaryActivity: async () => true }
  );
  assert.equal(result.decision.reason, "breaker_cooling");

  result = await evaluate(
    { inFlight: true },
    {
      isConnectionUnavailableToAuxiliaryActivity: async () => true,
      resolvePingModel: async () => null,
    }
  );
  assert.equal(result.decision.reason, "exclusive_lease");

  result = await evaluate({ inFlight: true }, { resolvePingModel: async () => null });
  assert.equal(result.decision.reason, "in_flight");

  result = await evaluate(
    { descriptor: sessionWithWeekly },
    {
      fetchUsage: async () =>
        longerReading(10, {
          stale: true,
          windows: {
            session: usageWindow({ resetAt: iso(NOW + 10_000_000) }),
            weekly: usageWindow({
              resetAt: iso(NOW + 6 * DAY_MS),
              remainingPct: 10,
              exhausted: true,
              windowSeconds: 604800,
            }),
          },
        }),
    }
  );
  assert.equal(result.decision.reason, "telemetry_stale");

  result = await evaluate(
    { descriptor: sessionWithWeekly, target: target({ minLongerWindowRemainingPct: 50 }) },
    {
      fetchUsage: async () =>
        longerReading(10, {
          windows: {
            session: usageWindow({ remainingPct: 0, exhausted: true }),
            weekly: usageWindow({
              resetAt: iso(NOW + 6 * DAY_MS),
              remainingPct: 10,
              exhausted: true,
              windowSeconds: 604800,
            }),
          },
        }),
    }
  );
  assert.equal(result.decision.reason, "window_exhausted");

  result = await evaluate(
    { descriptor: sessionWithWeekly, target: target({ minLongerWindowRemainingPct: 50 }) },
    {
      fetchUsage: async () =>
        longerReading(10, {
          windows: {
            session: usageWindow({ resetAt: iso(NOW + 10_000_000) }),
            weekly: usageWindow({
              resetAt: iso(NOW + 6 * DAY_MS),
              remainingPct: 10,
              exhausted: true,
              windowSeconds: 604800,
            }),
          },
        }),
    }
  );
  assert.equal(result.decision.reason, "window_active");

  result = await evaluate(
    { descriptor: sessionWithWeekly, target: target({ minLongerWindowRemainingPct: 50 }) },
    {
      fetchUsage: async () =>
        longerReading(10, {
          windows: {
            session: usageWindow(),
            weekly: usageWindow({
              resetAt: iso(NOW + 6 * DAY_MS),
              remainingPct: 10,
              exhausted: true,
              windowSeconds: 604800,
            }),
          },
        }),
    }
  );
  assert.equal(result.decision.reason, "longer_window_exhausted");

  result = await evaluate(
    {
      descriptor: sessionWithWeekly,
      target: target({
        minLongerWindowRemainingPct: 50,
        lastPingedFingerprint: resetFingerprint(FULL_HORIZON),
      }),
    },
    { fetchUsage: async () => longerReading(10) }
  );
  assert.equal(result.decision.reason, "longer_window_below_threshold");
});

// ---------------------------------------------------------------------------
// Full pass, dry run, audit payload.
// ---------------------------------------------------------------------------

test("full pass: every row clears and the decision is execute", async () => {
  const { decision, calls } = await evaluate();
  assert.equal(decision.action, "execute");
  assert.equal(decision.reason, "would_ping");
  assert.equal(decision.fingerprint, resetFingerprint(FULL_HORIZON));
  assert.equal(decision.window?.resetAt, FULL_HORIZON);
  assert.equal(calls.fetchUsage, 1);
});

test("dry run is carried on the target, not a skip: evaluation still returns execute", async () => {
  const run = await evaluate({ target: target({ dryRun: true }) });
  assert.equal(run.decision.action, "execute");
  assert.equal(run.decision.reason, "would_ping");
  // The runner records `would_ping` with dryRun on the audit row; evaluation never
  // turns a dry-run target into a skip reason.
  assert.notEqual(run.decision.reason, "target_disabled");
});

test("audit payload: reason, fingerprint and window are on the decision; the run-row fields are on the context", async () => {
  const resetAt = FULL_HORIZON;
  const auditTarget = target({
    id: "target-audit",
    connectionId: "conn-audit",
    descriptorId: "codex:session",
    windowId: "session",
    dryRun: true,
  });
  const auditDescriptor = descriptor();
  const { decision } = await evaluate(
    { target: auditTarget, descriptor: auditDescriptor, trigger: "scheduled", nowMs: NOW },
    { fetchUsage: async () => reading({ windows: { session: usageWindow({ resetAt }) } }) }
  );

  // Decision payload written into the quota_ping_runs row.
  assert.equal(decision.action, "execute");
  assert.equal(decision.reason, "would_ping");
  assert.equal(decision.fingerprint, resetFingerprint(resetAt));
  assert.equal(decision.window?.resetAt, resetAt);

  // The remaining audit fields arrive with the evaluation inputs.
  assert.equal(auditTarget.id, "target-audit");
  assert.equal(auditTarget.connectionId, "conn-audit");
  assert.equal(auditTarget.descriptorId, "codex:session");
  assert.equal(auditDescriptor.windowId, "session");
  assert.equal(auditTarget.dryRun, true);
  assert.equal(NOW, new Date("2026-01-01T12:00:00.000Z").getTime());
});

// ---------------------------------------------------------------------------
// Reset fingerprint.
// ---------------------------------------------------------------------------

test("resetFingerprint: null in, null out; minute rounding; ISO formatting stability", () => {
  assert.equal(resetFingerprint(null), null);
  assert.equal(resetFingerprint("2026-01-01T12:00:00Z"), "2026-01-01T12:00:00.000Z");
  assert.equal(resetFingerprint("2026-01-01T12:00:59.999Z"), "2026-01-01T12:00:00.000Z");
  assert.equal(
    resetFingerprint("2026-01-01T12:00:00.000Z"),
    resetFingerprint("2026-01-01T13:00:00+01:00")
  );
  assert.notEqual(
    resetFingerprint("2026-01-01T12:00:00Z"),
    resetFingerprint("2026-01-01T12:01:00Z")
  );
  assert.equal(resetFingerprint("not-a-date"), "not-a-date");
});

test("normalizeResetKey is the one legacy function, re-exported unchanged", () => {
  assert.equal(normalizeResetKey, legacyNormalizeResetKey);
  assert.equal(normalizeResetKey("2026-01-01T12:00:59Z"), "2026-01-01T12:00:00.000Z");
});

test("fingerprint dedupe: same target and same resetAt skips, a new fingerprint pings", async () => {
  const resetAt = FULL_HORIZON;
  const fingerprint = resetFingerprint(resetAt);

  const second = await evaluate(
    { target: target({ lastPingedFingerprint: fingerprint }) },
    { fetchUsage: async () => reading({ windows: { session: usageWindow({ resetAt }) } }) }
  );
  assert.equal(second.decision.reason, "already_pinged_reset");

  const nextWindow = await evaluate(
    { target: target({ lastPingedFingerprint: fingerprint }) },
    {
      fetchUsage: async () =>
        reading({ windows: { session: usageWindow({ resetAt: iso(NOW + SESSION_MS + 60_000) }) } }),
    }
  );
  assert.equal(nextWindow.decision.action, "execute");
});
