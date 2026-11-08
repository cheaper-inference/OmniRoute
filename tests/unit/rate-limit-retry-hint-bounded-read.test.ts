/**
 * The 429 retry-hint reader reads a clone of the error body. A 429 is the most common error
 * status, so a body that stalls after a few bytes, or a very large one, must not hold the request
 * slot (stall) or be buffered whole (size). Same caps as parseUpstreamError: 64 KiB and 5 s.
 * Timers are mocked so the 5 s cap runs without waiting.
 */
import test, { mock } from "node:test";
import assert from "node:assert/strict";

const { readRateLimitRetryHintMs } =
  await import("../../open-sse/executors/rateLimitIntraRetry.ts");

const tick = () => new Promise<void>((resolve) => setImmediate(resolve));
const RETRY_INFO_37S =
  '{"error":{"details":[{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay":"37s"}]}}';

/** A 429 whose clone() returns `body`, so the test can watch the clone being read or cancelled. */
function responseWithCloneBody(body: ReadableStream<Uint8Array>) {
  const res = new Response("{}", { status: 429, headers: { "content-type": "application/json" } });
  res.clone = () => new Response(body, { status: 429 });
  return res;
}

test("a stalled 429 body returns no hint after 5 s and the clone is cancelled", async () => {
  const state = { cancelled: false };
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode('{"error":{"details":[{"@type":"type.google'));
    },
    cancel() {
      state.cancelled = true;
    },
  });
  mock.timers.enable({ apis: ["setTimeout"] });
  try {
    let settled = false;
    const pending = readRateLimitRetryHintMs(responseWithCloneBody(body));
    void pending.then(() => (settled = true));
    for (let i = 0; i < 6 && !settled; i++) {
      for (let j = 0; j < 5; j++) await tick();
      mock.timers.tick(5000);
      for (let j = 0; j < 5; j++) await tick();
    }
    assert.equal(settled, true, "a stalled 429 body held the retry-hint read");
    assert.equal(await pending, null);
    assert.equal(state.cancelled, true, "the stalled clone must be cancelled");
  } finally {
    mock.timers.reset();
  }
});

test("a 429 body past 64 KiB is cancelled and gives no hint", async () => {
  let pulled = 0;
  const state = { cancelled: false };
  const chunk = new TextEncoder().encode("a".repeat(16 * 1024));
  const body = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (pulled >= 100) return controller.close();
      pulled += 1;
      controller.enqueue(chunk);
    },
    cancel() {
      state.cancelled = true;
    },
  });
  assert.equal(await readRateLimitRetryHintMs(responseWithCloneBody(body)), null);
  assert.equal(state.cancelled, true);
  assert.ok(pulled < 20, `read ${pulled * 16} KiB of a 1600 KiB 429 body`);
});

test("a small 429 body still yields its retry hint", async () => {
  const body = new Response(RETRY_INFO_37S).body as ReadableStream<Uint8Array>;
  assert.equal(await readRateLimitRetryHintMs(responseWithCloneBody(body)), 37_000);
});

test("the Retry-After header wins and the body is not read", async () => {
  let cloned = false;
  const res = new Response("{}", { status: 429, headers: { "retry-after": "12" } });
  res.clone = () => {
    cloned = true;
    return new Response(RETRY_INFO_37S, { status: 429 });
  };
  assert.equal(await readRateLimitRetryHintMs(res), 12_000);
  assert.equal(cloned, false);
});
