import test from "node:test";
import assert from "node:assert/strict";
import { getEventListeners } from "node:events";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { setImmediate } from "node:timers/promises";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-fallback-wait-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_AUTO_BACKUP = process.env.DISABLE_SQLITE_AUTO_BACKUP;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const WAIT_MS = 137;
type Strategy = "priority" | "round-robin";
type TimerHandle = ReturnType<typeof setTimeout>;

async function withFallbackClock(
  run: (clock: {
    fire(): void;
    active(): number;
    created(): number;
    cleared(): number;
  }) => Promise<void>
) {
  const originalSetTimeout = globalThis.setTimeout;
  const originalClearTimeout = globalThis.clearTimeout;
  const timers = new Map<TimerHandle, () => void>();
  let created = 0;
  let cleared = 0;

  globalThis.setTimeout = ((
    callback: (...args: unknown[]) => void,
    delay?: number,
    ...args: unknown[]
  ) => {
    if (delay !== WAIT_MS) return originalSetTimeout(callback, delay, ...args);
    const handle = { unref() {} } as unknown as TimerHandle;
    timers.set(handle, () => callback(...args));
    created++;
    return handle;
  }) as typeof setTimeout;
  globalThis.clearTimeout = ((handle: TimerHandle) => {
    if (timers.delete(handle)) cleared++;
    else originalClearTimeout(handle);
  }) as typeof clearTimeout;

  const fire = () => {
    const pending = [...timers.values()];
    timers.clear();
    for (const callback of pending) callback();
  };
  try {
    await run({
      fire,
      active: () => timers.size,
      created: () => created,
      cleared: () => cleared,
    });
  } finally {
    fire();
    globalThis.setTimeout = originalSetTimeout;
    globalThis.clearTimeout = originalClearTimeout;
  }
}

let invocation = 0;
function startCombo(
  strategy: Strategy,
  options: {
    status?: number;
    delayMs?: number;
    targets?: number;
    maxGlobalAttempts?: number;
    onWait?: () => void;
  } = {}
) {
  const controller = new AbortController();
  const attempted: string[] = [];
  const waitLogs: string[] = [];
  const infoLogs: string[] = [];
  const models = Array.from(
    { length: options.targets ?? 2 },
    (_, index) => `synthetic-fallback-${invocation}-${index}/model`
  );
  let enterWait!: () => void;
  const waitEntered = new Promise<void>((resolve) => {
    enterWait = resolve;
  });
  let listenersBeforeWait = 0;
  let settled = false;
  const response = handleComboChat({
    body: { messages: [{ role: "user", content: "fallback wait" }] },
    combo: {
      name: `fallback-wait-${strategy}-${invocation++}`,
      strategy,
      models,
      config: {
        maxRetries: 0,
        maxSetRetries: 0,
        maxGlobalAttempts: options.maxGlobalAttempts ?? 30,
        fallbackDelayMs: options.delayMs ?? WAIT_MS,
        targetTimeoutMs: 0,
      },
    },
    handleSingleModel: async (_body, modelStr) => {
      attempted.push(modelStr);
      return new Response(
        JSON.stringify(
          attempted.length === 1
            ? { error: { message: "synthetic upstream unavailable" } }
            : { choices: [{ message: { content: "fallback succeeded" } }] }
        ),
        {
          status: attempted.length === 1 ? (options.status ?? 502) : 200,
          headers: { "content-type": "application/json" },
        }
      );
    },
    signal: controller.signal,
    log: {
      info(_tag: string, message: string) {
        infoLogs.push(message);
      },
      warn() {},
      error() {},
      debug(_tag: string, message: string) {
        if (!message.includes("before fallback to next model")) return;
        listenersBeforeWait = getEventListeners(controller.signal, "abort").length;
        waitLogs.push(message);
        options.onWait?.();
        enterWait();
      },
    },
    settings: {},
    allCombos: [],
    hiddenModelsByProvider: [],
  }).then((result) => {
    settled = true;
    return result;
  });
  return {
    controller,
    attempted,
    models,
    response,
    waitEntered,
    waitLogs,
    infoLogs,
    settled: () => settled,
    listenersBeforeWait: () => listenersBeforeWait,
    listeners: () => getEventListeners(controller.signal, "abort").length,
  };
}

test.after(() => {
  resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_AUTO_BACKUP === undefined) delete process.env.DISABLE_SQLITE_AUTO_BACKUP;
  else process.env.DISABLE_SQLITE_AUTO_BACKUP = ORIGINAL_AUTO_BACKUP;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

for (const strategy of ["priority", "round-robin"] as const) {
  test(
    `${strategy}: abort at fallback-wait entry returns 499 without starting a timer`,
    { timeout: 5000 },
    async () => {
      await withFallbackClock(async (clock) => {
        const run = startCombo(strategy, { onWait: () => run.controller.abort() });
        await run.waitEntered;
        await setImmediate();
        const settledWithoutTimer = run.settled();
        const created = clock.created();
        // Release the old implementation's missed-abort timer so RED cannot hang the test process.
        clock.fire();
        const response = await run.response;

        assert.equal(response.status, 499);
        assert.deepEqual(run.attempted, run.models.slice(0, 1));
        assert.equal(settledWithoutTimer, true, "cancellation must settle before the delay fires");
        assert.equal(created, 0, "an already-aborted wait must not allocate a timer");
        assert.equal(run.listeners(), 0);
        assert.equal(clock.active(), 0);
      });
    }
  );

  test(
    `${strategy}: abort during fallback wait clears the timer and abort listener`,
    { timeout: 5000 },
    async () => {
      await withFallbackClock(async (clock) => {
        const run = startCombo(strategy);
        await run.waitEntered;
        assert.equal(run.settled(), false);
        assert.equal(clock.active(), 1);
        assert.equal(run.listeners(), run.listenersBeforeWait() + 1);
        run.controller.abort();
        const response = await run.response;

        assert.equal(response.status, 499);
        assert.deepEqual(run.attempted, run.models.slice(0, 1));
        assert.ok(run.infoLogs.includes("Client disconnected during fallback wait — aborting"));
        assert.equal(clock.created(), 1);
        assert.equal(clock.cleared(), 1);
        assert.equal(clock.active(), 0);
        assert.equal(run.listeners(), 0);
        clock.fire();
        await setImmediate();
        assert.deepEqual(run.attempted, run.models.slice(0, 1));
      });
    }
  );

  test(
    `${strategy}: abort after the timer fires still returns 499 before fallback dispatch`,
    { timeout: 5000 },
    async () => {
      await withFallbackClock(async (clock) => {
        const run = startCombo(strategy);
        await run.waitEntered;
        clock.fire();
        run.controller.abort();
        const response = await run.response;

        assert.equal(response.status, 499);
        assert.deepEqual(run.attempted, run.models.slice(0, 1));
        assert.equal(clock.created(), 1);
        assert.equal(clock.active(), 0);
        assert.equal(run.listeners(), 0);
      });
    }
  );

  for (const status of [502, 503, 504]) {
    test(
      `${strategy}: ${status} waits the requested delay, then dispatches the next target`,
      { timeout: 5000 },
      async () => {
        await withFallbackClock(async (clock) => {
          const run = startCombo(strategy, { status });
          await run.waitEntered;
          assert.deepEqual(run.attempted, run.models.slice(0, 1));
          assert.equal(run.settled(), false);
          assert.deepEqual(run.waitLogs, [`Waiting ${WAIT_MS}ms before fallback to next model`]);
          assert.equal(clock.active(), 1);
          clock.fire();
          const response = await run.response;

          assert.equal(response.status, 200);
          assert.deepEqual(run.attempted, run.models);
          assert.equal(clock.created(), 1);
          assert.equal(clock.active(), 0);
          assert.equal(run.listeners(), 0, "completed waits release listeners");
          run.controller.abort();
          await setImmediate();
          assert.deepEqual(run.attempted, run.models);
          assert.equal(clock.cleared(), 0, "a later abort must not clear a completed wait");
        });
      }
    );
  }

  for (const scenario of [
    { name: "zero delay", delayMs: 0, status: 502 },
    { name: "ineligible status", delayMs: WAIT_MS, status: 500 },
  ]) {
    test(
      `${strategy}: ${scenario.name} dispatches fallback without a wait`,
      { timeout: 5000 },
      async () => {
        await withFallbackClock(async (clock) => {
          const run = startCombo(strategy, scenario);
          const response = await run.response;
          assert.equal(response.status, 200);
          assert.deepEqual(run.attempted, run.models);
          assert.deepEqual(run.waitLogs, []);
          assert.equal(clock.created(), 0);
          assert.equal(run.listeners(), 0);
        });
      }
    );
  }

  for (const scenario of [
    { name: "target exhaustion", targets: 1 },
    { name: "attempt budget exhaustion", maxGlobalAttempts: 1 },
  ]) {
    test(
      `${strategy}: ${scenario.name} never dispatches an extra target`,
      { timeout: 5000 },
      async () => {
        await withFallbackClock(async (clock) => {
          const run = startCombo(strategy, scenario);
          await run.waitEntered;
          assert.deepEqual(run.attempted, run.models.slice(0, 1));
          clock.fire();
          const response = await run.response;

          assert.equal(response.ok, false);
          if (scenario.targets === 1) assert.equal(response.status, 502);
          assert.deepEqual(run.attempted, run.models.slice(0, 1));
          assert.equal(clock.created(), 1);
          assert.equal(clock.active(), 0);
          assert.equal(run.listeners(), 0);
        });
      }
    );
  }
}
