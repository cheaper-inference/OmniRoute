import assert from "node:assert/strict";
import { test } from "node:test";
import { setImmediate } from "node:timers/promises";

import { grokReconnectDelayMs, watchGrokBotTurn } from "../../open-sse/executors/grok-bot-watch.ts";
import {
  WATCH_IDLE_TIMEOUT_MS,
  type Transport,
} from "../../open-sse/executors/grok-bot-protocol.ts";

test("the reconnect delay backs off and stops at a ceiling", () => {
  assert.equal(grokReconnectDelayMs(0), 0, "the first attempt reconnects at once");
  assert.equal(grokReconnectDelayMs(1), 250);
  assert.equal(grokReconnectDelayMs(2), 500);
  assert.equal(grokReconnectDelayMs(3), 1000);
  assert.equal(grokReconnectDelayMs(4), 2000);
  assert.equal(grokReconnectDelayMs(5), 4000);
  assert.equal(grokReconnectDelayMs(12), 4000, "never grows past the ceiling");
});

test("a persistently failing watch does not spin", async () => {
  // Every read fails the way a 5xx or a refused connection does. Without a
  // delay between reconnects this loops as fast as the socket fails.
  let attempts = 0;
  const transport: Transport = {
    rpc: async () => ({}),
    watch: () => {
      attempts += 1;
      return (async function* fail(): AsyncGenerator<unknown> {
        throw Object.assign(new Error("stream failed: http_503"), { errorType: "http_error" });
      })();
    },
  };

  const controller = new AbortController();
  const interrupted = new Error("stream failed: test cancelled");
  const timer = setTimeout(() => controller.abort(interrupted), 1200);

  try {
    await assert.rejects(
      watchGrokBotTurn(transport, "agent", "message", controller.signal, null),
      /stream failed/
    );
  } finally {
    clearTimeout(timer);
  }

  // 250 + 500 + 1000 ms of backoff leaves room for only a handful of attempts
  // in 1.2s; an unthrottled loop reaches the hundreds.
  assert.ok(attempts > 0, "the watch must be attempted at least once");
  assert.ok(attempts <= 8, `reconnects must be spaced out, saw ${attempts} attempts`);
});

const CLOCK_START = 1_700_000_000_000;

function fakeWatch(start: () => void): Transport {
  return {
    rpc: async () => ({}),
    watch: async function* () {
      start();
    },
  };
}

test("empty clean EOF backs off before every reconnect", async ({ mock }) => {
  mock.timers.enable({ apis: ["Date", "setTimeout"], now: CLOCK_START });
  const starts: number[] = [];
  const done = Object.assign(new Error("test watch finished"), { errorType: "incomplete_turn" });
  const caller = new AbortController();
  const transport = fakeWatch(() => {
    starts.push(Date.now() - CLOCK_START);
    if (starts.length === 3) throw done;
  });
  const check = assert.rejects(
    watchGrokBotTurn(transport, "agent", "message", caller.signal, null),
    (error) => error === done
  );
  try {
    await setImmediate();
    assert.deepEqual(starts, [0], "a clean EOF must not open an immediate second stream");
    mock.timers.tick(249);
    await setImmediate();
    assert.deepEqual(starts, [0]);
    mock.timers.tick(1);
    await setImmediate();
    assert.deepEqual(starts, [0, 250]);
    mock.timers.tick(499);
    await setImmediate();
    assert.deepEqual(starts, [0, 250]);
    mock.timers.tick(1);
    await check;
    assert.deepEqual(starts, [0, 250, 750]);
  } finally {
    caller.abort(done);
    await check;
  }
});

test("reconnect waiting stops at the remaining turn deadline", async ({ mock }) => {
  mock.timers.enable({ apis: ["Date", "setTimeout"], now: CLOCK_START });
  let attempts = 0;
  const transport = fakeWatch(() => {
    attempts += 1;
    mock.timers.setTime(CLOCK_START + WATCH_IDLE_TIMEOUT_MS - 10);
    throw new Error("read interrupted with ten milliseconds left");
  });
  let settled = false;
  const check = assert
    .rejects(
      watchGrokBotTurn(transport, "agent", "message", null, null),
      /watch stream ended before the agent started running/
    )
    .then(() => {
      settled = true;
    });
  try {
    await setImmediate();
    mock.timers.tick(9);
    await setImmediate();
    assert.equal(settled, false);
    mock.timers.tick(1);
    await setImmediate();
    assert.equal(settled, true, "must not sleep past the turn deadline");
    assert.equal(attempts, 1);
  } finally {
    mock.timers.tick(4000);
    await check;
  }
});

test("cancelling during reconnect wait does not start another watch", async ({ mock }) => {
  mock.timers.enable({ apis: ["Date", "setTimeout"], now: CLOCK_START });
  let attempts = 0;
  const cancelled = new Error("caller cancelled");
  const caller = new AbortController();
  const transport = fakeWatch(() => {
    attempts += 1;
    if (attempts === 1) throw new Error("read interrupted");
    throw cancelled;
  });
  const check = assert.rejects(
    watchGrokBotTurn(transport, "agent", "message", caller.signal, null),
    (error) => error === cancelled
  );
  await setImmediate();
  assert.equal(attempts, 1);
  caller.abort(cancelled);
  await check;
  assert.equal(attempts, 1, "aborting a wait must not dispatch another read");
});
