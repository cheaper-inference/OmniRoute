/**
 * Byte-stall watchdog modes (open-sse/utils/streamStallWatchdog.ts).
 *
 * Default `timer` mode keeps the legacy per-chunk clearTimeout+setTimeout. The opt-in
 * `SSE_STALL_WATCHDOG=interval` mode stamps the last chunk time and checks it from ONE
 * low-frequency interval, so a long chatty stream does not allocate a timer per chunk.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  createStallWatchdog,
  readStallWatchdogMode,
  stallWatchdogPeriodMs,
} from "../../open-sse/utils/streamStallWatchdog.ts";
import { createStreamController, pipeWithDisconnect } from "../../open-sse/utils/streamHandler.ts";

const encoder = new TextEncoder();

function withStallEnv<T>(value: string | undefined, fn: () => T): T {
  const saved = process.env.SSE_STALL_WATCHDOG;
  if (value === undefined) delete process.env.SSE_STALL_WATCHDOG;
  else process.env.SSE_STALL_WATCHDOG = value;
  try {
    return fn();
  } finally {
    if (saved === undefined) delete process.env.SSE_STALL_WATCHDOG;
    else process.env.SSE_STALL_WATCHDOG = saved;
  }
}

/** Count timer allocations while `fn` runs (on top of node:test's mocked timers). */
function countTimers(fn: () => void) {
  const counts = { setTimeout: 0, setInterval: 0 };
  const originalTimeout = globalThis.setTimeout;
  const originalInterval = globalThis.setInterval;
  globalThis.setTimeout = ((...args: Parameters<typeof setTimeout>) => {
    counts.setTimeout += 1;
    return originalTimeout(...args);
  }) as typeof setTimeout;
  globalThis.setInterval = ((...args: Parameters<typeof setInterval>) => {
    counts.setInterval += 1;
    return originalInterval(...args);
  }) as typeof setInterval;
  try {
    fn();
  } finally {
    globalThis.setTimeout = originalTimeout;
    globalThis.setInterval = originalInterval;
  }
  return counts;
}

test("mode is timer by default and interval only when opted in", () => {
  assert.equal(withStallEnv(undefined, readStallWatchdogMode), "timer");
  assert.equal(withStallEnv("bogus", readStallWatchdogMode), "timer");
  assert.equal(withStallEnv(" Interval ", readStallWatchdogMode), "interval");
});

test("interval period is clamp(stall / 4, 1s, 5s)", () => {
  assert.equal(stallWatchdogPeriodMs(100), 1_000);
  assert.equal(stallWatchdogPeriodMs(8_000), 2_000);
  assert.equal(stallWatchdogPeriodMs(600_000), 5_000);
});

test("interval mode does not allocate a timer per chunk", (t) => {
  t.mock.timers.enable({ apis: ["setTimeout", "setInterval", "Date"] });
  let fired = 0;
  const counts = countTimers(() => {
    const watchdog = createStallWatchdog(8_000, () => (fired += 1), "interval");
    for (let i = 0; i < 1000; i += 1) {
      watchdog.arm();
      t.mock.timers.tick(5);
    }
    watchdog.clear();
  });
  assert.equal(counts.setTimeout, 0);
  assert.equal(counts.setInterval, 1);
  assert.equal(fired, 0, "a stream that keeps sending never stalls");
});

test("timer mode keeps the legacy per-chunk timer", (t) => {
  t.mock.timers.enable({ apis: ["setTimeout", "setInterval", "Date"] });
  const counts = countTimers(() => {
    const watchdog = createStallWatchdog(8_000, () => {}, "timer");
    for (let i = 0; i < 1000; i += 1) watchdog.arm();
    watchdog.clear();
  });
  assert.equal(counts.setTimeout, 1000);
  assert.equal(counts.setInterval, 0);
});

test("interval mode fires within stallTimeoutMs + period, never before stallTimeoutMs", (t) => {
  t.mock.timers.enable({ apis: ["setTimeout", "setInterval", "Date"] });
  let fired = 0;
  const watchdog = createStallWatchdog(8_000, () => (fired += 1), "interval");
  watchdog.arm();
  t.mock.timers.tick(7_999);
  assert.equal(fired, 0);
  t.mock.timers.tick(stallWatchdogPeriodMs(8_000));
  assert.equal(fired, 1);
  t.mock.timers.tick(60_000);
  assert.equal(fired, 1, "fires once and stops checking");
});

test("timer mode fires exactly at stallTimeoutMs after the last chunk", (t) => {
  t.mock.timers.enable({ apis: ["setTimeout", "setInterval", "Date"] });
  let fired = 0;
  const watchdog = createStallWatchdog(1_000, () => (fired += 1), "timer");
  watchdog.arm();
  t.mock.timers.tick(900);
  watchdog.arm();
  t.mock.timers.tick(999);
  assert.equal(fired, 0);
  t.mock.timers.tick(1);
  assert.equal(fired, 1);
});

test("a disabled budget never arms, and clear() stops a pending check", (t) => {
  t.mock.timers.enable({ apis: ["setTimeout", "setInterval", "Date"] });
  let fired = 0;
  const disabled = countTimers(() => {
    createStallWatchdog(0, () => (fired += 1), "interval").arm();
    createStallWatchdog(Number.NaN, () => (fired += 1), "timer").arm();
  });
  assert.deepEqual(disabled, { setTimeout: 0, setInterval: 0 });
  const watchdog = createStallWatchdog(1_000, () => (fired += 1), "interval");
  watchdog.arm();
  watchdog.clear();
  t.mock.timers.tick(10_000);
  assert.equal(fired, 0);
});

// Wall-clock bounds are pinned with mocked timers above; this only checks the wiring.
test("pipeWithDisconnect still reports a stalled upstream with SSE_STALL_WATCHDOG=interval", async () => {
  const source = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode("data: first\n\n"));
    },
    cancel() {},
  });
  let onErrorMessage = "";
  const streamController = createStreamController({
    onError(event: { message: string }) {
      onErrorMessage = event.message;
      return true;
    },
  });
  const stream = withStallEnv("interval", () =>
    pipeWithDisconnect(new Response(source), new TransformStream(), streamController, {
      stallTimeoutMs: 50,
    })
  );
  // Interval-mode stall detection runs on ONE unref'd setInterval, by design, so a
  // stalled stream cannot keep the process alive on its own. That leaves this test's
  // drain loop as the only pending work, and node exits the loop before the 50ms
  // watchdog can fire ("Promise resolution is still pending"). Hold the loop with a
  // referenced timer of our own instead of leaning on another watchdog's timer.
  const keepAlive = setTimeout(() => {}, 5_000);
  const reader = stream.getReader();
  while (!(await reader.read()).done) {
    // drain until the watchdog ends the stream
  }
  clearTimeout(keepAlive);
  assert.equal(onErrorMessage, "stream stall timeout");
});
