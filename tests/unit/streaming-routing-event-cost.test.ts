import test from "node:test";
import assert from "node:assert/strict";

import type { RoutingEvent } from "../../open-sse/services/routing/events.ts";
import { emitStreamingRoutingEvent } from "../../open-sse/handlers/chatCore/streamingRoutingEvent.ts";

const base = {
  requestId: "req-1",
  provider: "openai",
  model: "gpt-4o",
  startTime: Date.now() - 50,
  ttft: 10,
  streamItlMs: 2,
  streamUsage: { prompt_tokens: 12, completion_tokens: 34 },
  normalizedStreamStatus: 200,
  streamResponseBody: { choices: [{ finish_reason: "stop" }] },
  connectionId: "conn-1",
  apiKeyId: "key-1",
  serviceTier: "default",
};

function collect() {
  const events: RoutingEvent[] = [];
  return { events, emit: (e: RoutingEvent) => void events.push(e) };
}

test("stream routing event is emitted only after the cost resolves and carries it", async () => {
  const { events, emit } = collect();
  let release: (v: number) => void = () => {};
  const pending = new Promise<number>((resolve) => (release = resolve));
  let seenArgs: unknown[] = [];

  emitStreamingRoutingEvent({
    ...base,
    emit,
    calculateCost: (...args) => {
      seenArgs = args;
      return pending;
    },
  });

  await Promise.resolve();
  assert.equal(events.length, 0, "event must wait for the cost lookup");
  assert.deepEqual(seenArgs, [
    "openai",
    "gpt-4o",
    { prompt_tokens: 12, completion_tokens: 34 },
    { serviceTier: "default" },
  ]);

  release(0.0123);
  await pending;
  await new Promise((r) => setImmediate(r));

  assert.equal(events.length, 1);
  assert.equal(events[0].cost, 0.0123);
  assert.equal(events[0].apiKeyId, "key-1");
  assert.equal(events[0].connectionId, "conn-1");
  assert.equal(events[0].inputTokens, 12);
  assert.equal(events[0].outputTokens, 34);
  assert.equal(events[0].outcome, "success");
  assert.equal(events[0].finishReason, "stop");
});

test("stream routing event still emits once with cost null when the lookup rejects", async () => {
  const { events, emit } = collect();
  emitStreamingRoutingEvent({
    ...base,
    emit,
    calculateCost: () => Promise.reject(new Error("pricing db down")),
  });
  await new Promise((r) => setImmediate(r));
  assert.equal(events.length, 1);
  assert.equal(events[0].cost, null);
  assert.equal(events[0].apiKeyId, "key-1");
});

test("stream routing event uses cost null for a non-finite result and accepts the detailed shape", async () => {
  const nan = collect();
  emitStreamingRoutingEvent({ ...base, emit: nan.emit, calculateCost: async () => Number.NaN });
  const detailed = collect();
  emitStreamingRoutingEvent({
    ...base,
    emit: detailed.emit,
    calculateCost: async () => ({ costUsd: 0.5 }),
  });
  await new Promise((r) => setImmediate(r));
  assert.equal(nan.events[0].cost, null);
  assert.equal(detailed.events[0].cost, 0.5);
});

test("stream routing event emits synchronously with null cost and never prices when there is no usage", () => {
  const { events, emit } = collect();
  let called = false;
  emitStreamingRoutingEvent({
    ...base,
    streamUsage: null,
    normalizedStreamStatus: 499,
    streamErrorCode: "aborted",
    emit,
    calculateCost: async () => {
      called = true;
      return 1;
    },
  });
  assert.equal(called, false);
  assert.equal(events.length, 1);
  assert.equal(events[0].cost, null);
  assert.equal(events[0].inputTokens, null);
  assert.equal(events[0].outcome, "stream_interrupted");
});

test("stream routing event never throws when calculateCost throws synchronously or emit throws", async () => {
  const { events, emit } = collect();
  assert.doesNotThrow(() =>
    emitStreamingRoutingEvent({
      ...base,
      emit,
      calculateCost: () => {
        throw new Error("sync boom");
      },
    })
  );
  assert.equal(events.length, 1);
  assert.equal(events[0].cost, null);

  assert.doesNotThrow(() =>
    emitStreamingRoutingEvent({
      ...base,
      emit: () => {
        throw new Error("sink boom");
      },
      calculateCost: async () => 1,
    })
  );
  await new Promise((r) => setImmediate(r));
});
