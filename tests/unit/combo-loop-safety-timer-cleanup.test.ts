import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-timer-cleanup-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const SAFETY_TIMEOUT_MS = 31_337;

function makeLog() {
  const warnings: string[] = [];
  return {
    info() {},
    warn(_tag: string, message: string) {
      warnings.push(message);
    },
    error() {},
    debug() {},
    warnings,
  };
}

async function withControlledSafetyTimer(
  run: (clock: {
    fireSafetyTimers(): void;
    activeCount(): number;
    clearedCount(): number;
    createdCount(): number;
  }) => Promise<void>
): Promise<void> {
  const originalSetTimeout = globalThis.setTimeout;
  const originalClearTimeout = globalThis.clearTimeout;
  const safetyTimers = new Map<ReturnType<typeof setTimeout>, () => void>();
  let safetyTimersCreated = 0;
  let safetyTimersCleared = 0;

  globalThis.setTimeout = ((
    callback: (...args: unknown[]) => void,
    delay?: number,
    ...args: unknown[]
  ) => {
    if (delay === SAFETY_TIMEOUT_MS) {
      const safetyHandle = { unref() {} } as unknown as ReturnType<typeof setTimeout>;
      safetyTimers.set(safetyHandle, () => callback(...args));
      safetyTimersCreated += 1;
      return safetyHandle;
    }
    return originalSetTimeout(callback, delay, ...args);
  }) as typeof setTimeout;
  globalThis.clearTimeout = ((handle: ReturnType<typeof setTimeout>) => {
    if (safetyTimers.delete(handle)) {
      safetyTimersCleared += 1;
      return;
    }
    originalClearTimeout(handle);
  }) as typeof clearTimeout;

  try {
    await run({
      fireSafetyTimers() {
        const pending = [...safetyTimers.entries()];
        safetyTimers.clear();
        for (const [, callback] of pending) callback();
      },
      activeCount() {
        return safetyTimers.size;
      },
      clearedCount() {
        return safetyTimersCleared;
      },
      createdCount() {
        return safetyTimersCreated;
      },
    });
  } finally {
    globalThis.setTimeout = originalSetTimeout;
    globalThis.clearTimeout = originalClearTimeout;
  }
}

test.after(() => {
  resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("terminal upstream exhaustion clears the combo loop safety timer before returning", async () => {
  await withControlledSafetyTimer(async (clock) => {
    const log = makeLog();
    let dispatches = 0;

    const response = await handleComboChat({
      body: { messages: [{ role: "user", content: "stop" }] },
      combo: {
        name: "timer-cleanup-terminal-exhaustion",
        strategy: "priority",
        models: [{ model: "synthetic/model" }],
        config: { targetTimeoutMs: 0, comboTimeoutMs: SAFETY_TIMEOUT_MS, maxRetries: 0 },
      },
      handleSingleModel: async () => {
        dispatches += 1;
        return new Response(
          JSON.stringify({ error: { message: "synthetic upstream unavailable" } }),
          { status: 502, headers: { "content-type": "application/json" } }
        );
      },
      log,
      settings: {},
      allCombos: [],
    });

    assert.equal(response.status, 502);
    assert.equal(dispatches, 1);

    clock.fireSafetyTimers();
    assert.equal(
      log.warnings.filter((message) => /loop safety timeout/i.test(message)).length,
      0,
      "a cleared timer must not log after the request already returned"
    );
    assert.equal(clock.createdCount(), 1);
    assert.equal(clock.clearedCount(), 1, "terminal return must clear its safety timer");
    assert.equal(clock.activeCount(), 0);
  });
});

test("completed sets clear every safety timer across retries and terminal exits", async (t) => {
  const scenarios = [
    { name: "success", failedSets: 0, maxSetRetries: 0, expectedStatus: 200 },
    { name: "retry-success", failedSets: 1, maxSetRetries: 1, expectedStatus: 200 },
    { name: "two-retries-success", failedSets: 2, maxSetRetries: 2, expectedStatus: 200 },
    { name: "retry-exhaustion", failedSets: 2, maxSetRetries: 1, expectedStatus: 502 },
    { name: "terminal-499", failedSets: 0, maxSetRetries: 0, expectedStatus: 499 },
    { name: "retry-499", failedSets: 1, maxSetRetries: 1, expectedStatus: 499 },
    { name: "retry-fatal-400", failedSets: 1, maxSetRetries: 1, expectedStatus: 400 },
    { name: "throw", failedSets: 0, maxSetRetries: 0, expectedStatus: 502 },
    { name: "retry-throw", failedSets: 1, maxSetRetries: 1, expectedStatus: 502 },
  ];

  for (const scenario of scenarios) {
    await t.test(scenario.name, () =>
      withControlledSafetyTimer(async (clock) => {
        const log = makeLog();
        let dispatches = 0;
        const response = await handleComboChat({
          body: { messages: [{ role: "user", content: scenario.name }] },
          combo: {
            name: `timer-cleanup-${scenario.name}`,
            strategy: "priority",
            models: [{ model: `synthetic-${scenario.name}/model` }],
            config: {
              targetTimeoutMs: 0,
              comboTimeoutMs: SAFETY_TIMEOUT_MS,
              maxRetries: 0,
              maxSetRetries: scenario.maxSetRetries,
              setRetryDelayMs: 0,
            },
          },
          handleSingleModel: async () => {
            dispatches += 1;
            if (dispatches <= scenario.failedSets) {
              return new Response(JSON.stringify({ error: { message: "upstream unavailable" } }), {
                status: 502,
                headers: { "content-type": "application/json" },
              });
            }
            if (scenario.name.endsWith("throw")) throw new Error("synthetic dispatch exception");
            return new Response(
              JSON.stringify(
                scenario.expectedStatus === 200
                  ? { choices: [{ message: { content: "ok" } }] }
                  : { error: { message: "invalid message format" } }
              ),
              {
                status: scenario.expectedStatus,
                headers: { "content-type": "application/json" },
              }
            );
          },
          log,
          settings: {},
          allCombos: [],
        });

        assert.equal(response.status, scenario.expectedStatus, scenario.name);
        const expectedSets = scenario.maxSetRetries + 1;
        assert.equal(dispatches, expectedSets, scenario.name);
        assert.equal(clock.createdCount(), expectedSets, scenario.name);
        assert.equal(clock.clearedCount(), expectedSets, scenario.name);
        assert.equal(clock.activeCount(), 0, scenario.name);
        clock.fireSafetyTimers();
        assert.equal(
          log.warnings.filter((message) => /loop safety timeout/i.test(message)).length,
          0,
          scenario.name
        );
      })
    );
  }
});

test(
  "a hung retry set retains only its own safety timer and aborts with 504",
  { timeout: 5000 },
  async () => {
    await withControlledSafetyTimer(async (clock) => {
      const log = makeLog();
      let dispatches = 0;
      let activeSignal: AbortSignal | undefined;
      let retryStarted!: () => void;
      const started = new Promise<void>((resolve) => {
        retryStarted = resolve;
      });
      const pending = handleComboChat({
        body: { messages: [{ role: "user", content: "hang on retry" }] },
        combo: {
          name: "timer-cleanup-hung-retry",
          strategy: "priority",
          models: [{ model: "synthetic-hung-retry/model" }],
          config: {
            targetTimeoutMs: 0,
            comboTimeoutMs: SAFETY_TIMEOUT_MS,
            maxRetries: 0,
            maxSetRetries: 1,
            setRetryDelayMs: 0,
          },
        },
        handleSingleModel: async (_body, _model, target) => {
          dispatches += 1;
          if (dispatches === 1) return new Response("upstream unavailable", { status: 502 });
          activeSignal = target?.modelAbortSignal;
          retryStarted();
          return new Promise<Response>((resolve) => {
            activeSignal?.addEventListener(
              "abort",
              () => {
                resolve(new Response("aborted", { status: 499 }));
              },
              { once: true }
            );
          });
        },
        log,
        settings: {},
        allCombos: [],
      });

      await started;
      const activeWhileRunning = clock.activeCount();
      const clearedWhileRunning = clock.clearedCount();
      clock.fireSafetyTimers();
      const response = await pending;

      assert.equal(clock.createdCount(), 2);
      assert.equal(clearedWhileRunning, 1, "the failed set must already be released");
      assert.equal(activeWhileRunning, 1, "only the currently running set retains a timer");
      assert.equal(response.status, 504);
      assert.equal(activeSignal?.aborted, true, "the safety timeout must abort the hung target");
      assert.equal(clock.activeCount(), 0);
      assert.equal(
        log.warnings.filter((message) => /loop safety timeout.*reached/i.test(message)).length,
        1
      );
    });
  }
);

test(
  "set retry delay has no stale timer and cancellation returns 499",
  { timeout: 5000 },
  async () => {
    await withControlledSafetyTimer(async (clock) => {
      const log = makeLog();
      const controller = new AbortController();
      let delayStarted!: () => void;
      const started = new Promise<void>((resolve) => {
        delayStarted = resolve;
      });
      let dispatches = 0;
      const pending = handleComboChat({
        body: { messages: [{ role: "user", content: "cancel retry" }] },
        combo: {
          name: "timer-cleanup-cancel-retry",
          strategy: "priority",
          models: [{ model: "synthetic-cancel-retry/model" }],
          config: {
            targetTimeoutMs: 0,
            comboTimeoutMs: SAFETY_TIMEOUT_MS,
            maxRetries: 0,
            maxSetRetries: 1,
            setRetryDelayMs: 60_000,
          },
        },
        handleSingleModel: async () => {
          dispatches += 1;
          return new Response("upstream unavailable", { status: 502 });
        },
        signal: controller.signal,
        log: {
          ...log,
          info(_tag: string, message: string) {
            if (message.includes("retrying set")) delayStarted();
          },
        },
        settings: {},
        allCombos: [],
      });

      await started;
      const activeDuringDelay = clock.activeCount();
      clock.fireSafetyTimers();
      controller.abort();
      const response = await pending;

      assert.equal(
        activeDuringDelay,
        0,
        "a completed set must release its timer before the retry delay"
      );
      assert.equal(response.status, 499);
      assert.equal(dispatches, 1);
      assert.equal(clock.createdCount(), 1);
      assert.equal(clock.clearedCount(), 1);
      assert.equal(clock.activeCount(), 0);
      assert.equal(
        log.warnings.filter((message) => /loop safety timeout.*reached/i.test(message)).length,
        0
      );
    });
  }
);
