import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { performance } from "node:perf_hooks";
import "../_helpers/catalogNetworkGuard13389.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-13389-waiters-"));
Object.assign(process.env, {
  DATA_DIR: dataDir,
  OMNIROUTE_PLUGINS_DIR: path.join(dataDir, "plugins"),
  API_KEY_SECRET: "13389-waiters-fixture-only",
  DISABLE_SQLITE_AUTO_BACKUP: "true",
  APP_LOG_TO_FILE: "false",
  CATALOG_BUILD_TIMEOUT_MS: "100",
});
const core = await import("../../src/lib/db/core.ts");
const catalogCache = await import("../../src/app/api/v1/models/catalogCache.ts");

test("#13389 one timeout wave of twenty clients does not duplicate the still-live catalog build", async (t) => {
  // Initialize temporary storage before the clock used by the cache experiment.
  core.getDbInstance();
  catalogCache.__resetCatalogBuilderRunsForTest();
  // The experiment owns its clock: host preemption must not age out the retained
  // build between the timed-out wave and the immediate retry being asserted.
  let now = 1_000_000;
  let nextTimerId = 0;
  const timers = new Map<ReturnType<typeof setTimeout>, () => void>();
  t.mock.method(Date, "now", () => now);
  t.mock.method(globalThis, "setTimeout", (callback: () => void, delay: number) => {
    assert.equal(delay, 100, "the production wait bound stays unchanged");
    const id = ++nextTimerId as unknown as ReturnType<typeof setTimeout>;
    timers.set(id, callback);
    return id;
  });
  t.mock.method(globalThis, "clearTimeout", (id: ReturnType<typeof setTimeout>) => {
    timers.delete(id);
  });
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  let activeBuilders = 0;
  let peakBuilders = 0;
  let totalBuilders = 0;
  const build = async (): Promise<catalogCache.CatalogPayload> => {
    activeBuilders++;
    totalBuilders++;
    peakBuilders = Math.max(peakBuilders, activeBuilders);
    await gate;
    activeBuilders--;
    return { body: "same-generation-result", status: 200, headers: {}, cacheTTL: 60_000 };
  };
  const request = () =>
    catalogCache.resolveCachedCatalogResponse(
      new Request("http://localhost/v1/models"),
      { corsHeaders: {}, diagnosticHeaders: {} },
      build
    );
  const start = performance.now();
  const pendingWave = Array.from({ length: 20 }, request);
  assert.equal(timers.size, 20, "every waiter has its original timeout");
  now += 100;
  for (const [id, timeout] of [...timers]) {
    timers.delete(id);
    timeout();
  }
  const wave = await Promise.all(pendingWave);
  const firstWaveMs = performance.now() - start;
  assert.deepEqual(
    wave.map((response) => response.status),
    Array(20).fill(503)
  );
  assert.equal(totalBuilders, 1, "the first wave must really coalesce");

  let retry!: Response;
  try {
    const pendingRetry = request();
    await new Promise<void>((resolve) => setImmediate(resolve));
    release();
    retry = await pendingRetry;
  } finally {
    release();
  }
  console.log(
    "CATALOG_13389_WAITERS",
    JSON.stringify({ firstWaveMs, totalBuilders, peakBuilders, retryStatus: retry.status })
  );
  assert.equal(retry.status, 200);
  assert.equal(await retry.text(), "same-generation-result");
  assert.equal(
    peakBuilders,
    1,
    "twenty observers of one timeout window must not consume three independent build attempts"
  );
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
