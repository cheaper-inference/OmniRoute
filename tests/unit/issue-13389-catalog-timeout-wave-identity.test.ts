import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test, { type TestContext } from "node:test";
import "../_helpers/catalogNetworkGuard13389.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-13389-wave-identity-"));
Object.assign(process.env, {
  DATA_DIR: dataDir,
  OMNIROUTE_PLUGINS_DIR: path.join(dataDir, "plugins"),
  API_KEY_SECRET: "13389-wave-identity-fixture-only",
  DISABLE_SQLITE_AUTO_BACKUP: "true",
  APP_LOG_TO_FILE: "false",
  CATALOG_BUILD_TIMEOUT_MS: "100",
});
const core = await import("../../src/lib/db/core.ts");
const catalogCache = await import("../../src/app/api/v1/models/catalogCache.ts");

function controlledClock(t: TestContext) {
  let now = 1_000_000;
  let nextId = 0;
  const pending = new Map<number, { callback: () => void; due: number }>();
  t.mock.method(Date, "now", () => now);
  t.mock.method(globalThis, "setTimeout", (callback: () => void, delay: number) => {
    assert.equal(delay, 100, "the production wait bound stays unchanged");
    const id = ++nextId;
    pending.set(id, { callback, due: now + delay });
    return id as unknown as ReturnType<typeof setTimeout>;
  });
  t.mock.method(globalThis, "clearTimeout", (timer: ReturnType<typeof setTimeout>) => {
    pending.delete(Number(timer));
  });
  return {
    pending,
    advance(ms: number) {
      assert.ok(ms >= 0);
      now += ms;
    },
    fire(ids: number[]) {
      for (const id of ids) {
        const timer = pending.get(id);
        assert.ok(timer, "only a scheduled timeout may fire");
        assert.ok(now >= timer.due, "a timeout cannot fire early");
        pending.delete(id);
        timer.callback();
      }
    },
  };
}

async function settleMicrotasks() {
  for (let index = 0; index < 12; index++) await Promise.resolve();
}

type Schedule = "together" | "staggered" | "three-waves" | "retention-expired";

async function runScenario(t: TestContext, schedule: Schedule, expectedPeak: number) {
  catalogCache.__resetCatalogBuilderRunsForTest();
  const clock = controlledClock(t);
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
  try {
    const wave = Array.from({ length: 20 }, request);
    const timers = [...clock.pending.keys()];
    assert.equal(totalBuilders, 1, "the first wave must coalesce before any timer fires");
    assert.equal(timers.length, 20);
    clock.advance(100);
    if (schedule === "staggered") {
      clock.fire(timers.slice(0, 7));
      await settleMicrotasks();
      clock.advance(101);
      clock.fire(timers.slice(7, 14));
      await settleMicrotasks();
      clock.advance(101);
      clock.fire(timers.slice(14));
    } else {
      clock.fire(timers);
    }
    const responses = await Promise.all(wave);
    assert.deepEqual(
      responses.map((response) => response.status),
      Array(20).fill(503)
    );
    assert.equal(totalBuilders, 1, "timing out observers does not itself start a builder");
    if (schedule === "three-waves") {
      for (let waveIndex = 0; waveIndex < 2; waveIndex++) {
        const pending = request();
        assert.equal(totalBuilders, 1, "the first two timed-out waves remain joinable");
        const nextTimers = [...clock.pending.keys()];
        assert.equal(nextTimers.length, 1);
        clock.advance(100);
        clock.fire(nextTimers);
        assert.equal((await pending).status, 503);
      }
    }
    if (schedule === "retention-expired") clock.advance(301);
    const pendingRetry = request();
    release();
    const retry = await pendingRetry;
    assert.equal(retry.status, 200);
    assert.equal(await retry.text(), "same-generation-result");
    assert.equal(peakBuilders, expectedPeak);
    await settleMicrotasks();
    assert.equal(activeBuilders, 0);
    assert.equal(clock.pending.size, 0);
  } finally {
    release();
    await settleMicrotasks();
  }
}

test.before(() => {
  core.getDbInstance();
});

test("#13389 simultaneous timeout observers retain one builder", async (t) => {
  await runScenario(t, "together", 1);
});

test("#13389 delayed callbacks from the same wave do not consume new attempts", async (t) => {
  await runScenario(t, "staggered", 1);
});

test("#13389 three independently timed-out waves still permit replacement", async (t) => {
  await runScenario(t, "three-waves", 2);
});

test("#13389 the existing three-bound retention window still expires", async (t) => {
  await runScenario(t, "retention-expired", 2);
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
