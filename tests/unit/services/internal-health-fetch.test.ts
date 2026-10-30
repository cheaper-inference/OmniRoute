import test from "node:test";
import assert from "node:assert/strict";
import net from "node:net";

const { getOriginalFetch } = await import("../../../open-sse/utils/proxyFetch.ts");
const originalGlobalFetch = globalThis.fetch;
const nativeFetch = getOriginalFetch();

async function reserveFreePort(): Promise<number> {
  const server = net.createServer();
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  const port = address.port;
  await new Promise<void>((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve()))
  );
  return port;
}

test.after(() => {
  globalThis.fetch = originalGlobalFetch;
});

test("pre-spawn free-port probe bypasses patched global fetch without warnings", async () => {
  let patchedFetchCalls = 0;
  globalThis.fetch = (async () => {
    patchedFetchCalls++;
    console.warn("[ProxyFetch] should not run for an internal loopback probe");
    throw new Error("patched fetch invoked");
  }) as typeof fetch;

  const warnings: unknown[][] = [];
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => warnings.push(args);

  try {
    const { probeBeforeSpawn } = await import("../../../src/lib/services/portProbe.ts");
    const port = await reserveFreePort();
    const probe = await probeBeforeSpawn(`http://127.0.0.1:${port}/health`, port);

    assert.deepEqual(probe, { healthy: false, portInUse: false });
    assert.equal(patchedFetchCalls, 0);
    assert.deepEqual(warnings, []);
    assert.equal(typeof nativeFetch, "function");
  } finally {
    console.warn = originalWarn;
    globalThis.fetch = originalGlobalFetch;
  }
});

test(
  "native health probe takes precedence over the HTTP health URL",
  { timeout: 2000 },
  async () => {
    const { HealthChecker } = await import("../../../src/lib/services/healthCheck.ts");
    let urlCalls = 0;
    let probeCalls = 0;
    let probeSignal: AbortSignal | undefined;
    let reportHealthy: () => void;
    const healthy = new Promise<void>((resolve) => {
      reportHealthy = resolve;
    });
    const checker = new HealthChecker(
      () => {
        urlCalls++;
        throw new Error("Native probes must not use HTTP");
      },
      10,
      (health) => {
        if (health === "healthy") reportHealthy();
      },
      async (signal) => {
        probeCalls++;
        probeSignal = signal;
        return true;
      }
    );
    let deadline: ReturnType<typeof setTimeout> | undefined;
    try {
      checker.start();
      await Promise.race([
        healthy,
        new Promise<never>((_, reject) => {
          deadline = setTimeout(
            () => reject(new Error("Native health probe did not complete")),
            1000
          );
        }),
      ]);
      assert.equal(checker.getHealth(), "healthy");
      assert.equal(probeCalls, 1);
      assert.equal(urlCalls, 0);
      assert.ok(probeSignal instanceof AbortSignal);
      assert.equal(probeSignal.aborted, false);
    } finally {
      clearTimeout(deadline);
      checker.stop();
    }
  }
);

test("periodic unhealthy probe bypasses patched global fetch and becomes unhealthy quietly", async () => {
  let patchedFetchCalls = 0;
  globalThis.fetch = (async () => {
    patchedFetchCalls++;
    console.warn("[ProxyFetch] should not run for an internal health check");
    throw new Error("patched fetch invoked");
  }) as typeof fetch;

  const warnings: unknown[][] = [];
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => warnings.push(args);

  const { HealthChecker } = await import("../../../src/lib/services/healthCheck.ts");
  const port = await reserveFreePort();
  const changes: string[] = [];
  const checker = new HealthChecker(
    () => `http://127.0.0.1:${port}/health`,
    10,
    (health) => changes.push(health)
  );

  try {
    checker.start();
    const deadline = Date.now() + 2_000;
    while (checker.getHealth() !== "unhealthy" && Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }

    assert.equal(checker.getHealth(), "unhealthy");
    assert.deepEqual(changes, ["unhealthy"]);
    assert.equal(patchedFetchCalls, 0);
    assert.deepEqual(warnings, []);
  } finally {
    checker.stop();
    console.warn = originalWarn;
    globalThis.fetch = originalGlobalFetch;
  }
});
