/**
 * Non-permanent timeout probe verdicts (oh-my-openagent #12378).
 *
 * The T14 TCP probe must memoize ONLY definitive verdicts (connection accepted
 * = reachable; frank refusal = unreachable). A timeout is INDETERMINATE: it is
 * returned to the caller for this attempt, never cached, never fed to the
 * refusal store, and re-probed on the next call. Concurrent callers keep
 * sharing one in-flight probe. A degraded→restored transition is logged once
 * per state change, never per probe, and a timeout never flips the state.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  isProxyReachable,
  getCachedProxyHealth,
  invalidateProxyHealth,
  __setProxyHealthTcpCheckForTesting,
  __resetProxyHealthTransitionsForTesting,
} from "../../src/lib/proxyHealth.ts";
import {
  isProxyAvoided,
  proxyEgressKey,
  __resetProxyRefusalMemoryForTesting,
  __proxyRefusalMemorySizeForTesting,
} from "../../open-sse/utils/proxyRefusalMemory.ts";

const PROXY_URL = "http://10.7.0.1:8080";
const KEY = proxyEgressKey(PROXY_URL);

function reset(): void {
  __setProxyHealthTcpCheckForTesting(null);
  __resetProxyRefusalMemoryForTesting();
  __resetProxyHealthTransitionsForTesting();
  invalidateProxyHealth(PROXY_URL);
  delete process.env.PROXY_SKIP_RECENTLY_FAILED;
}

test.afterEach(reset);

test("a timeout verdict is returned but never cached, so the next probe retries", async () => {
  reset();
  let probeCount = 0;
  __setProxyHealthTcpCheckForTesting(async () => {
    probeCount += 1;
    return "timeout";
  });

  assert.equal(await isProxyReachable(PROXY_URL), false, "timeout fails this attempt");
  assert.equal(
    getCachedProxyHealth(PROXY_URL),
    null,
    "a timeout must not be memoized as a permanent verdict"
  );

  assert.equal(await isProxyReachable(PROXY_URL), false);
  assert.equal(probeCount, 2, "the timeout must be re-probed, not served from cache");
});

test("a timeout never sets the proxy aside and never clears a prior refusal", async () => {
  reset();
  process.env.PROXY_SKIP_RECENTLY_FAILED = "true";

  // A definitive refusal sets the proxy aside…
  __setProxyHealthTcpCheckForTesting(async () => "unreachable");
  assert.equal(await isProxyReachable(PROXY_URL), false);
  assert.equal(isProxyAvoided(KEY), true, "a refusal is definitive and sets the proxy aside");

  // …and a later timeout neither adds a refusal nor ends the existing one.
  const sizeBefore = __proxyRefusalMemorySizeForTesting();
  invalidateProxyHealth(PROXY_URL);
  __setProxyHealthTcpCheckForTesting(async () => "timeout");
  assert.equal(await isProxyReachable(PROXY_URL), false);
  assert.equal(
    __proxyRefusalMemorySizeForTesting(),
    sizeBefore,
    "a timeout must not write a refusal entry"
  );
  assert.equal(isProxyAvoided(KEY), true, "a timeout must not recover a set-aside proxy");
});

test("definitive reachable and unreachable verdicts ARE cached", async () => {
  reset();

  let reachableProbes = 0;
  __setProxyHealthTcpCheckForTesting(async () => {
    reachableProbes += 1;
    return "reachable";
  });
  assert.equal(await isProxyReachable(PROXY_URL), true);
  assert.equal(getCachedProxyHealth(PROXY_URL), true);
  assert.equal(await isProxyReachable(PROXY_URL), true);
  assert.equal(reachableProbes, 1, "a reachable verdict is cached for the healthy TTL");

  invalidateProxyHealth(PROXY_URL);
  let refusalProbes = 0;
  __setProxyHealthTcpCheckForTesting(async () => {
    refusalProbes += 1;
    return "unreachable";
  });
  assert.equal(await isProxyReachable(PROXY_URL), false);
  assert.equal(getCachedProxyHealth(PROXY_URL), false);
  assert.equal(await isProxyReachable(PROXY_URL), false);
  assert.equal(refusalProbes, 1, "a definitive refusal is cached (short negative TTL)");
});

test("concurrent callers share one in-flight timeout probe", async () => {
  reset();
  let probeCount = 0;
  let release!: (outcome: "timeout") => void;
  const started = new Promise<void>((resolve) => {
    __setProxyHealthTcpCheckForTesting(async () => {
      probeCount += 1;
      resolve();
      return new Promise<"timeout">((res) => {
        release = res;
      });
    });
  });

  const callers = Array.from({ length: 25 }, () => isProxyReachable(PROXY_URL));
  await started;
  assert.equal(probeCount, 1, "concurrent callers must not fan out timeout probes");

  release("timeout");
  assert.deepEqual(
    await Promise.all(callers),
    Array.from({ length: 25 }, () => false)
  );
  assert.equal(probeCount, 1);
});

test("degraded and restored transitions log once per state change, never per probe", async () => {
  reset();
  const warn = console.warn;
  const log = console.log;
  const degraded: string[] = [];
  const restored: string[] = [];
  console.warn = (...args: unknown[]) => {
    const line = args.join(" ");
    if (line.includes("[ProxyHealth]") && line.includes("degraded")) degraded.push(line);
  };
  console.log = (...args: unknown[]) => {
    const line = args.join(" ");
    if (line.includes("[ProxyHealth]") && line.includes("restored")) restored.push(line);
  };

  try {
    let outcome: "reachable" | "unreachable" = "unreachable";
    __setProxyHealthTcpCheckForTesting(async () => outcome);

    // First definitive verdict records the baseline silently (no prior state).
    await isProxyReachable(PROXY_URL);
    assert.equal(degraded.length, 0, "the first verdict is a baseline, not a transition");

    // Re-probing the same degraded state does not re-log.
    invalidateProxyHealth(PROXY_URL);
    await isProxyReachable(PROXY_URL);
    assert.equal(degraded.length, 0, "steady-state degraded must not log per probe");

    // A timeout is indeterminate: it must not log a transition either way.
    invalidateProxyHealth(PROXY_URL);
    __setProxyHealthTcpCheckForTesting(async () => "timeout");
    await isProxyReachable(PROXY_URL);
    assert.equal(degraded.length, 0);
    assert.equal(restored.length, 0, "a timeout must not be treated as restored");

    // Recovery logs exactly once.
    invalidateProxyHealth(PROXY_URL);
    outcome = "reachable";
    __setProxyHealthTcpCheckForTesting(async () => outcome);
    await isProxyReachable(PROXY_URL);
    assert.equal(restored.length, 1, "restored logs on the definitive recovery");

    // Steady-state healthy does not re-log.
    invalidateProxyHealth(PROXY_URL);
    await isProxyReachable(PROXY_URL);
    assert.equal(restored.length, 1, "steady-state healthy must not log per probe");

    // Degrading again logs exactly one degraded transition.
    invalidateProxyHealth(PROXY_URL);
    outcome = "unreachable";
    __setProxyHealthTcpCheckForTesting(async () => outcome);
    await isProxyReachable(PROXY_URL);
    assert.equal(degraded.length, 1, "degraded logs on the definitive transition");
  } finally {
    console.warn = warn;
    console.log = log;
  }
});
