/**
 * The client-facing stream from createDisconnectAwareStream must budget its
 * queue in bytes. A bare `{ highWaterMark: 16384 }` counts chunks, so a stalled
 * client let the pipeline read thousands of frames ahead of it.
 */
import test from "node:test";
import assert from "node:assert/strict";

const {
  createDisconnectAwareStream,
  createNoopAbortWritable,
  createStreamController,
  pipeWithDisconnect,
} = await import("../../open-sse/utils/streamHandler.ts");
const { createByteLengthQueueStrategies } =
  await import("../../open-sse/utils/byteQueueStrategy.ts");

const FRAME_BYTES = 1024;
const SOURCE_FRAMES = 20_000;
// 16 KiB queue plus a few in-flight frames. Count mode reads ~16k frames (16 MiB).
const MAX_FRAMES_AHEAD = 64;

function frameSource() {
  const state = { produced: 0 };
  const frame = new Uint8Array(FRAME_BYTES).fill(0x61);
  const readable = new ReadableStream<Uint8Array>(
    {
      pull(controller) {
        if (state.produced >= SOURCE_FRAMES) {
          controller.close();
          return;
        }
        state.produced++;
        controller.enqueue(frame);
      },
    },
    { highWaterMark: 0 }
  );
  return { state, readable };
}

async function settle(state: { produced: number }) {
  let last = -1;
  for (let i = 0; i < 100 && state.produced !== last; i++) {
    last = state.produced;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
}

test("a stalled client does not let the stream read thousands of frames ahead", async () => {
  const { state, readable } = frameSource();
  const stream = createDisconnectAwareStream(
    { readable, writable: createNoopAbortWritable() },
    createStreamController()
  );
  await settle(state);
  assert.ok(
    state.produced <= MAX_FRAMES_AHEAD,
    `read ${state.produced} frames of ${FRAME_BYTES} bytes ahead of a client that never read`
  );
  await stream.cancel("test done");
});

test("pipeWithDisconnect keeps a stalled client to a small read-ahead", async () => {
  const { state, readable } = frameSource();
  const passthrough = new TransformStream<Uint8Array, Uint8Array>(
    undefined,
    ...createByteLengthQueueStrategies(16 * 1024)
  );
  const stream = pipeWithDisconnect(new Response(readable), passthrough, createStreamController(), {
    stallTimeoutMs: 0,
    activeTimeoutMs: 0,
  });
  await settle(state);
  assert.ok(
    state.produced <= MAX_FRAMES_AHEAD,
    `read ${state.produced} frames of ${FRAME_BYTES} bytes ahead of a client that never read`
  );
  await stream.cancel("test done");
});

test("a reading client still receives every byte, including a chunk larger than the queue", async () => {
  const big = new Uint8Array(100 * 1024).fill(0x62);
  const small = new Uint8Array(10).fill(0x63);
  const readable = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(small);
      controller.enqueue(big);
      controller.enqueue(small);
      controller.close();
    },
  });
  const stream = createDisconnectAwareStream(
    { readable, writable: createNoopAbortWritable() },
    createStreamController()
  );
  const reader = stream.getReader();
  let total = 0;
  const sizes: number[] = [];
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    sizes.push(value.byteLength);
    total += value.byteLength;
  }
  assert.deepEqual(sizes.slice(0, 3), [10, 100 * 1024, 10]);
  assert.equal(total, 10 + 100 * 1024 + 10);
});
