import test from "node:test";
import assert from "node:assert/strict";

const {
  createSseHeartbeatTransform,
  maxUnconsumedHeartbeatsConfig,
  DEFAULT_MAX_UNCONSUMED_HEARTBEATS,
} = await import("../../open-sse/utils/sseHeartbeat.ts");

type FakeInterval = {
  id: number;
  callback: (...args: unknown[]) => void;
  delay: number;
  args: unknown[];
  cleared: boolean;
};

function withFakeIntervals(fn: (intervals: FakeInterval[]) => Promise<void>): Promise<void> {
  const originalSetInterval = globalThis.setInterval;
  const originalClearInterval = globalThis.clearInterval;
  const intervals: FakeInterval[] = [];
  let nextId = 0;

  globalThis.setInterval = ((
    callback: (...args: unknown[]) => void,
    delay = 0,
    ...args: unknown[]
  ) => {
    const interval: FakeInterval = {
      id: ++nextId,
      callback,
      delay,
      args,
      cleared: false,
    };
    intervals.push(interval);
    return interval as unknown as NodeJS.Timeout;
  }) as typeof globalThis.setInterval;

  globalThis.clearInterval = ((interval: unknown) => {
    if (interval && typeof interval === "object" && "cleared" in interval) {
      (interval as FakeInterval).cleared = true;
    }
  }) as typeof globalThis.clearInterval;

  return Promise.resolve()
    .then(() => fn(intervals))
    .finally(() => {
      globalThis.setInterval = originalSetInterval;
      globalThis.clearInterval = originalClearInterval;
    });
}

async function withSseCommentsOn<T>(fn: () => Promise<T>): Promise<T> {
  const prev = process.env.OMNIROUTE_SSE_COMMENTS;
  process.env.OMNIROUTE_SSE_COMMENTS = "on";
  try {
    return await fn();
  } finally {
    if (prev === undefined) delete process.env.OMNIROUTE_SSE_COMMENTS;
    else process.env.OMNIROUTE_SSE_COMMENTS = prev;
  }
}

test("maxUnconsumedHeartbeatsConfig reads environment variable with fallback", () => {
  const prev = process.env.SSE_HEARTBEAT_MAX_UNCONSUMED;
  try {
    delete process.env.SSE_HEARTBEAT_MAX_UNCONSUMED;
    assert.equal(maxUnconsumedHeartbeatsConfig(), DEFAULT_MAX_UNCONSUMED_HEARTBEATS);

    process.env.SSE_HEARTBEAT_MAX_UNCONSUMED = "4";
    assert.equal(maxUnconsumedHeartbeatsConfig(), 4);

    process.env.SSE_HEARTBEAT_MAX_UNCONSUMED = "invalid";
    assert.equal(maxUnconsumedHeartbeatsConfig(), DEFAULT_MAX_UNCONSUMED_HEARTBEATS);

    process.env.SSE_HEARTBEAT_MAX_UNCONSUMED = "-1";
    assert.equal(maxUnconsumedHeartbeatsConfig(), DEFAULT_MAX_UNCONSUMED_HEARTBEATS);
  } finally {
    if (prev === undefined) delete process.env.SSE_HEARTBEAT_MAX_UNCONSUMED;
    else process.env.SSE_HEARTBEAT_MAX_UNCONSUMED = prev;
  }
});

test("#19640: skips enqueueing heartbeats when downstream consumer has not read previous chunk (desiredSize <= 0)", async () => {
  await withSseCommentsOn(() =>
    withFakeIntervals(async (intervals) => {
      const transform = createSseHeartbeatTransform({
        intervalMs: 15_000,
        maxUnconsumedHeartbeats: 5,
      });
      const reader = transform.readable.getReader();

      assert.equal(intervals.length, 1);
      const timer = intervals[0];

      // Tick 1: queue is empty, so first heartbeat enqueues
      timer.callback(...timer.args);

      // Now reader has not read yet, so desiredSize <= 0.
      // Tick 2: should be skipped (no second heartbeat enqueued)
      timer.callback(...timer.args);
      // Tick 3: should be skipped
      timer.callback(...timer.args);

      // Consume the first heartbeat
      const first = await reader.read();
      assert.equal(first.done, false);
      const text = new TextDecoder().decode(first.value);
      assert.match(text, /^: keepalive /);

      // Now that the queue was drained, Tick 4 can enqueue another heartbeat
      timer.callback(...timer.args);

      const second = await reader.read();
      assert.equal(second.done, false);
      const secondText = new TextDecoder().decode(second.value);
      assert.match(secondText, /^: keepalive /);

      await reader.cancel();
      assert.equal(timer.cleared, true);
    })
  );
});

test("#19640: stops timer and errors stream after maxUnconsumedHeartbeats consecutive unread ticks", async () => {
  await withSseCommentsOn(() =>
    withFakeIntervals(async (intervals) => {
      const transform = createSseHeartbeatTransform({
        intervalMs: 15_000,
        maxUnconsumedHeartbeats: 3,
      });
      const reader = transform.readable.getReader();

      assert.equal(intervals.length, 1);
      const timer = intervals[0];

      // Tick 1: enqueues first heartbeat (desiredSize becomes 0)
      timer.callback(...timer.args);
      assert.equal(timer.cleared, false);

      // Tick 2: unconsumed tick 1
      timer.callback(...timer.args);
      assert.equal(timer.cleared, false);

      // Tick 3: unconsumed tick 2
      timer.callback(...timer.args);
      assert.equal(timer.cleared, false);

      // Tick 4: unconsumed tick 3 reaches ceiling (maxUnconsumed = 3)
      timer.callback(...timer.args);
      assert.equal(timer.cleared, true);

      // Stream is errored, so read rejects with the abandoned stream error
      await assert.rejects(async () => {
        await reader.read();
      }, /SSE stream abandoned: consumer stopped reading/);
    })
  );
});

test("#19640: active data stream resets consecutive backpressure counter", async () => {
  await withSseCommentsOn(() =>
    withFakeIntervals(async (intervals) => {
      const transform = createSseHeartbeatTransform({
        intervalMs: 15_000,
        maxUnconsumedHeartbeats: 2,
      });
      const writer = transform.writable.getWriter();
      const reader = transform.readable.getReader();

      assert.equal(intervals.length, 1);
      const timer = intervals[0];

      // Tick 1: enqueues first heartbeat
      timer.callback(...timer.args);

      // Tick 2: unconsumed tick 1
      timer.callback(...timer.args);
      assert.equal(timer.cleared, false);

      // Upstream sends a chunk while reader drains
      const writePromise = writer.write(new TextEncoder().encode('data: {"chunk":"real"}\n\n'));

      const r1 = await reader.read(); // heartbeat from tick 1
      assert.equal(r1.done, false);
      await writePromise;

      const r2 = await reader.read(); // data chunk from writePromise
      assert.equal(r2.done, false);

      // Because real data was sent, the counter was reset.
      // Tick 3: queue is clear, enqueues next heartbeat
      timer.callback(...timer.args);
      assert.equal(timer.cleared, false);

      await writer.close();
      await reader.cancel();
      assert.equal(timer.cleared, true);
    })
  );
});
