import test from "node:test";
import assert from "node:assert/strict";

import {
  isProxyReachable,
  getCachedProxyHealth,
  invalidateProxyHealth,
  __setProxyHealthTcpCheckForTesting,
} from "../../src/lib/proxyHealth.ts";
import { runWithProxyContext, proxyFetch } from "../../open-sse/utils/proxyFetch.ts";

test("T14: isProxyReachable caches unreachable proxy result", async () => {
  const proxyUrl = "http://127.0.0.1:1";
  invalidateProxyHealth(proxyUrl);

  const healthy = await isProxyReachable(proxyUrl, 120, 2_000);
  assert.equal(healthy, false);
  assert.equal(getCachedProxyHealth(proxyUrl), false);
});

test("#5109: concurrent proxy reachability checks share one TCP probe", async () => {
  const proxyUrl = "http://127.0.0.1:1080";
  invalidateProxyHealth(proxyUrl);

  let probeCount = 0;
  let releaseProbe!: (healthy: boolean) => void;
  const probeStarted = new Promise<void>((resolve) => {
    __setProxyHealthTcpCheckForTesting(async () => {
      probeCount += 1;
      resolve();
      return new Promise<boolean>((resolveProbe) => {
        releaseProbe = resolveProbe;
      });
    });
  });

  try {
    const checks = Array.from({ length: 50 }, () => isProxyReachable(proxyUrl, 120, 2_000));

    await probeStarted;
    assert.equal(probeCount, 1, "concurrent requests must not fan out TCP health probes");

    releaseProbe(true);
    assert.deepEqual(
      await Promise.all(checks),
      Array.from({ length: 50 }, () => true)
    );
    assert.equal(getCachedProxyHealth(proxyUrl), true);
  } finally {
    __setProxyHealthTcpCheckForTesting(null);
    invalidateProxyHealth(proxyUrl);
  }
});

test("#5109: transient unreachable results use a short negative cache", async () => {
  const proxyUrl = "http://127.0.0.1:1081";
  invalidateProxyHealth(proxyUrl);

  let probeCount = 0;
  __setProxyHealthTcpCheckForTesting(async () => {
    probeCount += 1;
    return probeCount > 1;
  });

  try {
    assert.equal(await isProxyReachable(proxyUrl, 120, 5), false);
    assert.equal(getCachedProxyHealth(proxyUrl), false);

    await new Promise((resolve) => setTimeout(resolve, 15));

    assert.equal(await isProxyReachable(proxyUrl, 120, 5), true);
    assert.equal(getCachedProxyHealth(proxyUrl), true);
    assert.equal(probeCount, 2, "failed probes must not poison the proxy for 30 seconds");
  } finally {
    __setProxyHealthTcpCheckForTesting(null);
    invalidateProxyHealth(proxyUrl);
  }
});

test("T14: runWithProxyContext fails an in-flight request fast when the proxy is unreachable", async () => {
  const proxyUrl = "http://127.0.0.1:1";
  invalidateProxyHealth(proxyUrl);

  // #9100: the T14 probe is now NON-BLOCKING — dispatch is optimistic and the
  // probe aborts the request only while it is still in flight. To observe the
  // fast-fail the callback must stay pending long enough for the probe to
  // resolve (a callback that resolves instantly would simply win the race).
  let executed = false;
  let releaseRequest: () => void = () => {};
  const gate = new Promise<void>((resolve) => {
    releaseRequest = resolve;
  });

  const pending = runWithProxyContext(proxyUrl, async () => {
    executed = true;
    await gate; // stay in flight until the probe resolves unreachable
    return "ok";
  });

  await assert.rejects(pending, (err) => (err as { code?: string })?.code === "PROXY_UNREACHABLE");

  assert.equal(executed, true, "dispatch is optimistic; the request was started before the abort");
  releaseRequest();
});

test("SOCKS5 ordinary data-plane: no T14 TCP health probe", async () => {
  const proxyUrl = "socks5://127.0.0.1:1080";
  invalidateProxyHealth(proxyUrl);
  let probeCount = 0;
  __setProxyHealthTcpCheckForTesting(async () => {
    probeCount += 1;
    return true;
  });
  try {
    let executed = false;
    const result = await runWithProxyContext(proxyUrl, async () => {
      executed = true;
      return "socks5-data-plane-ok";
    });
    assert.equal(result, "socks5-data-plane-ok");
    assert.equal(executed, true);
    assert.equal(probeCount, 0, "SOCKS5 ordinary data-plane must not probe");
  } finally {
    __setProxyHealthTcpCheckForTesting(null);
    invalidateProxyHealth(proxyUrl);
  }
});

test("SOCKS5 real transport failure: owned by transport path, not T14 probe", async () => {
  const proxyUrl = "socks5://127.0.0.1:1";
  invalidateProxyHealth(proxyUrl);
  let probeCount = 0;
  __setProxyHealthTcpCheckForTesting(async () => {
    probeCount += 1;
    return false;
  });
  try {
    await runWithProxyContext(proxyUrl, async () => {
      await assert.rejects(
        proxyFetch("http://example.com"),
        (err: Error & { code?: string; message?: string }) => {
          assert.ok(
            err.code === "PROXY_REQUEST_FAILED" || err.code === "PROXY_UNREACHABLE",
            `expected transport failure code, got ${err.code}`
          );
          assert.ok(
            !err.message?.includes("[Proxy Fast-Fail]"),
            "real SOCKS failure must not manufacture [Proxy Fast-Fail] message"
          );
          return true;
        }
      );
    });
    assert.equal(probeCount, 0, "SOCKS data-plane request must not invoke reachability probe");
  } finally {
    __setProxyHealthTcpCheckForTesting(null);
    invalidateProxyHealth(proxyUrl);
  }
});

test("control-plane directFallbackOnUnreachable SOCKS5: blocking probe preserved", async () => {
  const proxyUrl = "socks5://127.0.0.1:1080";
  invalidateProxyHealth(proxyUrl);
  const prevEnv = process.env.OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK;
  process.env.OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK = "true";
  let probeCount = 0;
  __setProxyHealthTcpCheckForTesting(async () => {
    probeCount += 1;
    return false;
  });
  try {
    let executed = false;
    const result = await runWithProxyContext(
      proxyUrl,
      async () => {
        executed = true;
        return "fallback-ok";
      },
      { directFallbackOnUnreachable: true }
    );
    assert.equal(result, "fallback-ok");
    assert.equal(executed, true);
    assert.equal(
      probeCount,
      1,
      "control-plane direct fallback SOCKS must invoke reachability check"
    );
  } finally {
    __setProxyHealthTcpCheckForTesting(null);
    invalidateProxyHealth(proxyUrl);
    if (prevEnv === undefined) {
      delete process.env.OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK;
    } else {
      process.env.OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK = prevEnv;
    }
  }
});

test("control-plane directFallbackOnUnreachable HTTP: blocking probe preserved", async () => {
  const proxyUrl = "http://127.0.0.1:8080";
  invalidateProxyHealth(proxyUrl);
  const prevEnv = process.env.OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK;
  process.env.OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK = "true";
  let probeCount = 0;
  __setProxyHealthTcpCheckForTesting(async () => {
    probeCount += 1;
    return false;
  });
  try {
    let executed = false;
    const result = await runWithProxyContext(
      proxyUrl,
      async () => {
        executed = true;
        return "fallback-ok";
      },
      { directFallbackOnUnreachable: true }
    );
    assert.equal(result, "fallback-ok");
    assert.equal(executed, true);
    assert.equal(
      probeCount,
      1,
      "control-plane direct fallback HTTP must invoke reachability check"
    );
  } finally {
    __setProxyHealthTcpCheckForTesting(null);
    invalidateProxyHealth(proxyUrl);
    if (prevEnv === undefined) {
      delete process.env.OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK;
    } else {
      process.env.OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK = prevEnv;
    }
  }
});

test("nested same-context: probe runs only once", async () => {
  const cfg = { type: "http" as const, host: "127.0.0.1", port: 8080 };
  const proxyUrl = "http://127.0.0.1:8080";
  invalidateProxyHealth(proxyUrl);
  let probeCount = 0;
  __setProxyHealthTcpCheckForTesting(async () => {
    probeCount += 1;
    return true;
  });
  try {
    const result = await runWithProxyContext(cfg, async () => {
      invalidateProxyHealth(proxyUrl);
      return runWithProxyContext(cfg, async () => "nested-marker");
    });
    assert.equal(result, "nested-marker");
    assert.equal(probeCount, 1, "nested same-context call must skip reachability probe");
  } finally {
    __setProxyHealthTcpCheckForTesting(null);
    invalidateProxyHealth(proxyUrl);
  }
});

// ─── HAC-107: timeout verdicts are never memoized ────────────────────────────

test("HAC-107: a timeout verdict is not cached and the next call re-probes", async () => {
  const proxyUrl = "http://127.0.0.1:9099";
  invalidateProxyHealth(proxyUrl);
  let probeCount = 0;
  __setProxyHealthTcpCheckForTesting(async (): Promise<ProxyProbeVerdict> => {
    probeCount += 1;
    return "timeout";
  });
  try {
    assert.equal(await isProxyReachable(proxyUrl, 50, 30_000), false);
    assert.equal(
      getCachedProxyHealth(proxyUrl),
      null,
      "a timeout must not be memoized as a health verdict"
    );
    assert.equal(await isProxyReachable(proxyUrl, 50, 30_000), false);
    assert.equal(probeCount, 2, "every call after a timeout must retry the probe");
    assert.equal(getCachedProxyHealth(proxyUrl), null);
  } finally {
    __setProxyHealthTcpCheckForTesting(null);
    invalidateProxyHealth(proxyUrl);
  }
});

test("HAC-107: definitive verdicts are cached (ok and refused fail)", async () => {
  const okUrl = "http://127.0.0.1:9100";
  const failUrl = "http://127.0.0.1:9101";
  invalidateProxyHealth(okUrl);
  invalidateProxyHealth(failUrl);
  const counts = new Map<string, number>();
  __setProxyHealthTcpCheckForTesting(async (host, port): Promise<ProxyProbeVerdict> => {
    const key = `${host}:${port}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
    return port === 9100 ? "ok" : "fail";
  });
  try {
    assert.equal(await isProxyReachable(okUrl, 50, 30_000), true);
    assert.equal(await isProxyReachable(okUrl, 50, 30_000), true);
    assert.equal(getCachedProxyHealth(okUrl), true);
    assert.equal(counts.get("127.0.0.1:9100"), 1, "definitive success must be cached");

    assert.equal(await isProxyReachable(failUrl, 50, 30_000), false);
    assert.equal(await isProxyReachable(failUrl, 50, 30_000), false);
    assert.equal(getCachedProxyHealth(failUrl), false);
    assert.equal(counts.get("127.0.0.1:9101"), 1, "definitive refusal must be cached");
  } finally {
    __setProxyHealthTcpCheckForTesting(null);
    invalidateProxyHealth(okUrl);
    invalidateProxyHealth(failUrl);
  }
});

test("HAC-107: legacy boolean probe results still map to ok/fail", async () => {
  const proxyUrl = "http://127.0.0.1:9102";
  invalidateProxyHealth(proxyUrl);
  let probeCount = 0;
  __setProxyHealthTcpCheckForTesting(async () => {
    probeCount += 1;
    return true;
  });
  try {
    assert.equal(await isProxyReachable(proxyUrl, 50, 30_000), true);
    assert.equal(await isProxyReachable(proxyUrl, 50, 30_000), true);
    assert.equal(probeCount, 1, "a boolean true is a definitive success and is cached");
  } finally {
    __setProxyHealthTcpCheckForTesting(null);
    invalidateProxyHealth(proxyUrl);
  }
});

test("HAC-107: concurrent callers share one in-flight probe across a timeout", async () => {
  const proxyUrl = "http://127.0.0.1:9103";
  invalidateProxyHealth(proxyUrl);
  let probeCount = 0;
  let releaseProbe!: (verdict: ProxyProbeVerdict) => void;
  const probeStarted = new Promise<void>((resolve) => {
    __setProxyHealthTcpCheckForTesting(async () => {
      probeCount += 1;
      resolve();
      return new Promise<ProxyProbeVerdict>((resolveProbe) => {
        releaseProbe = resolveProbe;
      });
    });
  });
  try {
    const checks = Array.from({ length: 20 }, () => isProxyReachable(proxyUrl, 50, 30_000));
    await probeStarted;
    assert.equal(probeCount, 1, "concurrent callers must not fan out probes");
    releaseProbe("timeout");
    assert.deepEqual(
      await Promise.all(checks),
      Array.from({ length: 20 }, () => false)
    );
    assert.equal(getCachedProxyHealth(proxyUrl), null, "the shared timeout is not cached");
    assert.equal(probeCount, 1);
  } finally {
    __setProxyHealthTcpCheckForTesting(null);
    invalidateProxyHealth(proxyUrl);
  }
});

test("HAC-107: degraded/restored logs once per definitive state change", async () => {
  const proxyUrl = "http://127.0.0.1:9104";
  invalidateProxyHealth(proxyUrl);
  const logged: string[] = [];
  const originalLog = console.log;
  const originalWarn = console.warn;
  console.log = (...args: unknown[]) => {
    logged.push(args.map(String).join(" "));
  };
  console.warn = (...args: unknown[]) => {
    logged.push(args.map(String).join(" "));
  };
  const verdicts: ProxyProbeVerdict[] = ["timeout", "fail", "fail", "ok", "ok", "timeout", "ok"];
  let index = 0;
  __setProxyHealthTcpCheckForTesting(async () => verdicts[index++] ?? "ok");
  try {
    for (let i = 0; i < verdicts.length; i += 1) {
      await isProxyReachable(proxyUrl, 50, 0);
    }
    assert.equal(index, verdicts.length, "every iteration must reach the probe");
    assert.deepEqual(
      logged.filter((line) => line.startsWith("[ProxyHealth] ") && line.includes(proxyUrl)),
      [`[ProxyHealth] ${proxyUrl} degraded`, `[ProxyHealth] ${proxyUrl} restored`],
      "only definitive transitions log, and only once per state change"
    );
  } finally {
    console.log = originalLog;
    console.warn = originalWarn;
    __setProxyHealthTcpCheckForTesting(null);
    invalidateProxyHealth(proxyUrl);
  }
});
