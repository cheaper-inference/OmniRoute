/**
 * #15172 — Codex usage reads that reach /wham/usage through getUsageForProvider
 * (the /me/status fan-out and the quota-cache background refresh both do) must
 * take the same min-interval gate as the dedicated quota fetchers. Auto-Ping
 * already acquires that gate itself, so the extra wait on its path is at most
 * one interval.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { performance } from "node:perf_hooks";

import { getUsageForProvider } from "../../open-sse/services/usage.ts";
import { setCodexUsageFetchForTests } from "../../open-sse/services/usage/codex.ts";
import { connectionProxyTestOverride } from "../../open-sse/services/connectionProxyFetch.ts";
import {
  MinIntervalThrottle,
  resetQuotaFetchThrottle,
  setQuotaFetchThrottleForTests,
  type ThrottleClock,
} from "../../open-sse/services/quotaFetchThrottle.ts";
import {
  createQuotaAutoPingState,
  runQuotaAutoPingTick,
} from "../../src/lib/services/quotaAutoPing.ts";
import {
  __setProxyHealthTcpCheckForTesting,
  invalidateProxyHealth,
} from "../../src/lib/proxyHealth.ts";

const INTERVAL_MS = 250;

class FakeClock implements ThrottleClock {
  t = 1_000;
  now = () => this.t;
  sleep = async (ms: number) => {
    this.t += ms;
  };
}

function installSharedThrottle(clock: FakeClock | null) {
  const shared = new MinIntervalThrottle({
    minIntervalMs: INTERVAL_MS,
    jitterMs: 0,
    ...(clock ? { clock } : {}),
  });
  setQuotaFetchThrottleForTests(shared);
  return () => resetQuotaFetchThrottle();
}

function installUsageFetch(clock: FakeClock | null) {
  const starts: number[] = [];
  setCodexUsageFetchForTests(async () => {
    starts.push(clock ? clock.now() : performance.now());
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

test("#15172 concurrent Codex usage fetches start at least one interval apart", async () => {
  const restoreThrottle = installSharedThrottle(null);
  const { starts, restore } = installUsageFetch(null);

  try {
    const connections = ["a", "b", "c", "d"].map((id) => ({
      id,
      provider: "codex",
      accessToken: `token-${id}`,
      providerSpecificData: { workspaceId: `ws-${id}` },
    }));
    await Promise.all(connections.map((connection) => getUsageForProvider(connection)));

    assert.equal(starts.length, 4);
    for (let i = 1; i < starts.length; i++) {
      const gap = starts[i] - starts[i - 1];
      assert.ok(
        gap >= INTERVAL_MS - 30,
        `gap ${gap}ms between fetch ${i - 1} and ${i} is below one interval`
      );
    }
  } finally {
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

test("#15172 proxy fast-fail invalidates a Codex fetch still waiting on the gate", async () => {
  const proxyUrl = "http://127.0.0.1:1";
  let now = 1_000;
  let releaseSleep: (() => void) | null = null;
  let markSleepStarted!: () => void;
  const sleepStarted = new Promise<void>((resolve) => {
    markSleepStarted = resolve;
  });
  const clock: ThrottleClock = {
    now: () => now,
    sleep: (ms: number) => {
      markSleepStarted();
      return new Promise<void>((resolve) => {
        releaseSleep = () => {
          now += ms;
          resolve();
        };
      });
    },
  };
  const throttle = new MinIntervalThrottle({ minIntervalMs: INTERVAL_MS, jitterMs: 0, clock });
  setQuotaFetchThrottleForTests(throttle);
  await throttle.acquire();

  let fetchCalls = 0;
  setCodexUsageFetchForTests(async () => {
    fetchCalls++;
    return new Response("{}", { status: 200 });
  });
  connectionProxyTestOverride.resolveProxyForConnection = async () => ({
    proxy: { type: "http", host: "127.0.0.1", port: 1 },
  });
  invalidateProxyHealth(proxyUrl);
  __setProxyHealthTcpCheckForTesting(async () => false);

  try {
    const resultPromise = getUsageForProvider({
      id: "codex-proxy-fast-fail",
      provider: "codex",
      accessToken: "fixture-token",
      providerSpecificData: { workspaceId: "fixture-workspace" },
    });
    await sleepStarted;
    const result = (await resultPromise) as { message?: string };
    assert.match(String(result.message), /proxied request failed/);
    assert.equal(fetchCalls, 0, "fast-fail must settle before the gate is released");

    releaseSleep?.();
    await new Promise<void>((resolve) => setImmediate(resolve));
    await new Promise<void>((resolve) => setImmediate(resolve));
    assert.equal(fetchCalls, 0, "a reported proxy failure must not dispatch a late fetch");
  } finally {
    releaseSleep?.();
    __setProxyHealthTcpCheckForTesting(null);
    invalidateProxyHealth(proxyUrl);
    connectionProxyTestOverride.resolveProxyForConnection = null;
    setCodexUsageFetchForTests(null);
    resetQuotaFetchThrottle();
  }
});
