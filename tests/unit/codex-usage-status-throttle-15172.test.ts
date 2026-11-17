/**
 * #15172 — Codex usage reads that reach /wham/usage through getUsageForProvider
 * (the /me/status fan-out and the quota-cache background refresh both do) must
 * take the same min-interval gate as the dedicated quota fetchers. Auto-Ping
 * already acquires that gate itself, so the extra wait on its path is at most
 * one interval.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { getUsageForProvider } from "../../open-sse/services/usage.ts";
import { setCodexUsageFetchForTests } from "../../open-sse/services/usage/codex.ts";
import { connectionProxyTestOverride } from "../../open-sse/services/connectionProxyFetch.ts";
import {
  MinIntervalThrottle,
  type MinIntervalThrottleOptions,
  resetQuotaFetchThrottle,
  setQuotaFetchThrottleForTests,
  type ThrottleClock,
} from "../../open-sse/services/quotaFetchThrottle.ts";
import {
  createQuotaAutoPingState,
  runQuotaAutoPingTick,
} from "../../src/lib/services/quotaAutoPing.ts";

const INTERVAL_MS = 250;

// Virtual time, so the spacing assertions do not depend on how fast the runner
// schedules timers (#18829). `sleep` yields one macrotask before advancing:
// concurrent callers share this clock, and the caller that already passed the
// gate must record its start before the next caller's wait moves time forward.
class FakeClock implements ThrottleClock {
  t = 1_000;
  now = () => this.t;
  sleep = async (ms: number) => {
    await new Promise((resolve) => setImmediate(resolve));
    this.t += ms;
  };
}

function installSharedThrottle(clock: FakeClock) {
  const shared = new MinIntervalThrottle({
    minIntervalMs: INTERVAL_MS,
    jitterMs: 0,
    clock,
  });
  setQuotaFetchThrottleForTests(shared);
  return () => resetQuotaFetchThrottle();
}

function installUsageFetch(clock: FakeClock) {
  const starts: number[] = [];
  setCodexUsageFetchForTests(async () => {
    starts.push(clock.now());
    return new Response(
      JSON.stringify({
        plan_type: "plus",
        rate_limit: {
          primary_window: { used_percent: 10 },
          secondary_window: { used_percent: 20 },
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  });
  return {
    starts,
    restore: () => setCodexUsageFetchForTests(null),
  };
}

// The throttle's contract is the spacing of the slots it grants. A fetch starts later than its
// slot, after the per-connection proxy lookup, and that lookup's latency varies per call, so
// timing the fetch itself measures the lookup (193-218 ms gaps on an idle box), not the throttle.
class RecordingThrottle extends MinIntervalThrottle {
  readonly grants: number[] = [];
  private readonly grantClock: FakeClock;

  constructor(options: MinIntervalThrottleOptions & { clock: FakeClock }) {
    super(options);
    this.grantClock = options.clock;
  }

  override async acquire(): Promise<void> {
    await super.acquire();
    this.grants.push(this.grantClock.now());
  }
}

/** A clock whose sleeps can wake late, the way a busy runner's timers do. */
class WakingLateClock implements ThrottleClock {
  t = 1_000;
  private index = 0;

  constructor(private readonly overshootsMs: number[]) {}

  now = () => this.t;
  sleep = async (ms: number) => {
    const overshoot = this.overshootsMs[this.index] ?? 0;
    this.index += 1;
    this.t += ms + overshoot;
  };
}

test("#15172 a late timer does not shorten the next gap", async () => {
  // The first sleep wakes 40ms late, the next one on time. Measuring the next
  // wait from the scheduled instant instead of the real one turns that into a
  // 210ms gap even though the interval is 250ms.
  const clock = new WakingLateClock([40, 0]);
  const throttle = new MinIntervalThrottle({ minIntervalMs: INTERVAL_MS, jitterMs: 0, clock });

  const grantedAt: number[] = [];
  const acquire = async () => {
    await throttle.acquire();
    grantedAt.push(clock.now());
  };
  await acquire();
  await acquire();
  await acquire();

  for (let i = 1; i < grantedAt.length; i++) {
    const gap = grantedAt[i] - grantedAt[i - 1];
    assert.ok(gap >= INTERVAL_MS, `gap ${gap}ms between grant ${i - 1} and ${i}`);
  }
});

test("#15172 concurrent Codex usage fetches start at least one interval apart", async () => {
  const clock = new FakeClock();
  const throttle = new RecordingThrottle({ minIntervalMs: INTERVAL_MS, jitterMs: 0, clock });
  setQuotaFetchThrottleForTests(throttle);
  const restoreThrottle = () => resetQuotaFetchThrottle();
  const { starts, restore } = installUsageFetch(clock);
  // These connection ids go through fetchWithConnectionProxy. Keep proxy
  // resolution off the settings DB and proxy auto-select, so no real I/O runs
  // between the gate and the fetch stub while the virtual clock is shared.
  const previousProxyResolver = connectionProxyTestOverride.resolveProxyForConnection;
  connectionProxyTestOverride.resolveProxyForConnection = async () => ({ proxy: null });

  try {
    const connections = ["a", "b", "c", "d"].map((id) => ({
      id,
      provider: "codex",
      accessToken: `token-${id}`,
      providerSpecificData: { workspaceId: `ws-${id}` },
    }));
    await Promise.all(connections.map((connection) => getUsageForProvider(connection)));

    assert.equal(starts.length, 4);
    assert.equal(throttle.grants.length, 4, "every fetch must pass through the throttle");
    for (let i = 1; i < throttle.grants.length; i++) {
      const gap = throttle.grants[i] - throttle.grants[i - 1];
      assert.ok(
        gap >= INTERVAL_MS,
        `gap ${gap}ms between fetch ${i - 1} and ${i} is below one interval`
      );
    }
  } finally {
    connectionProxyTestOverride.resolveProxyForConnection = previousProxyResolver;
    restore();
    restoreThrottle();
  }
});

test("#15172 Auto-Ping's own gate adds at most one extra interval", async () => {
  const clock = new FakeClock();
  const restoreThrottle = installSharedThrottle(clock);
  const { starts, restore } = installUsageFetch(clock);

  const deps = {
    getSettings: async () => ({
      codexAutoPing: { connections: { "codex-1": true, "codex-2": true } },
    }),
    getProviderConnections: async () => [
      { id: "codex-1", provider: "codex", authType: "oauth", accessToken: "token-1" },
      { id: "codex-2", provider: "codex", authType: "oauth", accessToken: "token-2" },
    ],
    updateProviderConnection: async () => null,
    refreshAndUpdateCredentials: async (connection: unknown) => ({ connection }),
    getCodexUsage: (accessToken?: string, providerSpecificData?: Record<string, unknown>) =>
      getUsageForProvider({
        provider: "codex",
        accessToken,
        providerSpecificData,
      }),
    throttleQuotaFetch: () =>
      new MinIntervalThrottle({ minIntervalMs: INTERVAL_MS, jitterMs: 0, clock }).acquire(),
    resolveProxyForConnection: async () => ({ proxy: null }),
    runWithProxyContext: async (_proxy: unknown, callback: () => Promise<unknown>) => callback(),
    getExecutor: () => ({
      execute: async () => ({ response: { ok: true, text: async () => "" } }),
    }),
    canExecuteProvider: () => true,
    isConnectionUnavailableToAuxiliaryActivity: async () => false,
    resolvePingModel: async () => "gpt-5-codex",
  };

  try {
    await runQuotaAutoPingTick(deps as never, createQuotaAutoPingState(), () => clock.now());
    assert.equal(starts.length, 2);
    const spread = starts[1] - starts[0];
    assert.ok(spread >= INTERVAL_MS, `spread ${spread}ms is below one interval`);
    assert.ok(spread <= INTERVAL_MS * 2, `spread ${spread}ms is more than one extra interval`);
  } finally {
    restore();
    restoreThrottle();
  }
});
