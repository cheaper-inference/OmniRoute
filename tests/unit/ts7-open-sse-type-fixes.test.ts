/**
 * Behavioral guards for the TS7-readiness type fixes in `open-sse/utils` and
 * `open-sse/translator` (slice 1 of the TypeScript 7 migration).
 *
 * Most of that change is behavior-preserving refactoring, already covered by the
 * existing keepalive/heartbeat suites. Three things are NOT covered elsewhere and are
 * exactly the parts a future "just make the checker happy" edit would silently break:
 *
 *  1. `transformer.cancel()` — the WHATWG Streams hook that clears heartbeat/progress
 *     intervals when an SSE client disconnects. `lib.dom.d.ts` omits it from
 *     `Transformer`, so production code constructs these streams through
 *     `open-sse/utils/cancelableTransformStream.ts`. If someone deletes the handlers
 *     instead of fixing the types, every abandoned stream leaks a timer.
 *
 *     The tests below deliberately call the bare `new TransformStream({ cancel })`
 *     rather than the helper: they assert Node's runtime contract, and routing them
 *     through the helper would only prove the helper's own assertion. The root
 *     tsconfig does include this file, but that program OOMs and no CI gate runs it.
 *     Of the runnable type programs, build/core/api/dashboard exclude tests outright
 *     and the open-sse one only reaches the __tests__ folders inside open-sse/, so
 *     the root tests/ directory this file lives in is in none of them. So the
 *     resulting TS2353 never reaches a gate -- though an IDE loading the root config
 *     will still show it.
 *  2. `sanitizeToolResultId()` — now coerces a non-string id instead of throwing.
 *  3. The `Read` tool-call shim's `limit` clamping — the narrowing fix rewrote the
 *     comparison to read a local, which must stay behavior-identical at the bounds.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { sanitizeToolResultId } from "../../open-sse/translator/request/openai-to-claude/sanitizeToolResultId.ts";
import { applyToolCallShimToBuffer } from "../../open-sse/translator/helpers/toolCallShim.ts";
import { createResponsesApiTransformStream } from "../../open-sse/transformer/responsesTransformer.ts";
import { createProgressTransform } from "../../open-sse/utils/progressTracker.ts";
import { createSseHeartbeatTransform } from "../../open-sse/utils/sseHeartbeat.ts";
import { createSseTextTransform } from "../../src/lib/sseTextTransform.ts";

// ---------------------------------------------------------------------------
// 1. transformer.cancel() runtime contract
// ---------------------------------------------------------------------------

test("TransformStream invokes transformer.cancel() when the readable side is cancelled", async () => {
  let cancelled = false;
  let seenReason: unknown;

  const ts = new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(chunk);
    },
    cancel(reason) {
      cancelled = true;
      seenReason = reason;
    },
  });

  const writer = ts.writable.getWriter();
  const reader = ts.readable.getReader();
  void writer.write("chunk");
  await reader.read();

  const reason = new Error("client disconnect");
  await reader.cancel(reason);

  assert.equal(
    cancelled,
    true,
    "transformer.cancel() must fire on readable cancel — the heartbeat/progress " +
      "interval cleanup in sseHeartbeat.ts and progressTracker.ts depends on it"
  );
  assert.equal(seenReason, reason, "cancel() should receive the cancellation reason");
});

test("a transformer cancel handler can clear an interval (the leak this guards)", async (t) => {
  let ticks = 0;
  let stopped = false;
  // Held in a local, not on the stream: `start()` runs inside the TransformStream
  // constructor, before the `const` binding is initialized.
  let stop: (() => void) | undefined;

  // Belt-and-braces: a stray interval keeps node:test's event loop alive forever.
  t.after(() => stop?.());

  const ts = new TransformStream({
    start() {
      const id = setInterval(() => {
        ticks += 1;
      }, 5);
      stop = () => {
        clearInterval(id);
        stopped = true;
      };
    },
    transform(chunk, controller) {
      controller.enqueue(chunk);
    },
    cancel() {
      stop?.();
    },
  });

  const reader = ts.readable.getReader();
  await reader.cancel(new Error("disconnect"));

  assert.equal(stopped, true, "cancel() should have cleared the interval");

  const before = ticks;
  await new Promise((resolve) => setTimeout(resolve, 30));
  assert.equal(ticks, before, "interval must not keep firing after cancel()");
});

// ---------------------------------------------------------------------------
// 1b. The production factories clear their timers on cancel
//
// The bare-TransformStream tests above assert Node's contract. These drive the
// real factories instead, which is where a dropped `cancel` handler would
// actually leak an interval for every abandoned SSE stream. The negative
// control at the end proves the harness can see a leak.
// ---------------------------------------------------------------------------

type IntervalRecord = { fires: number; afterCancel: number };

function instrumentIntervals() {
  const live = new Set<unknown>();
  const records: IntervalRecord[] = [];
  let pastCancel = false;

  const realSet = globalThis.setInterval;
  const realClear = globalThis.clearInterval;

  globalThis.setInterval = ((handler: TimerHandler, timeout?: number, ...args: unknown[]) => {
    const rec: IntervalRecord = { fires: 0, afterCancel: 0 };
    records.push(rec);
    const wrapped = (...callArgs: unknown[]) => {
      rec.fires += 1;
      if (pastCancel) rec.afterCancel += 1;
      if (typeof handler === "function") (handler as (...a: unknown[]) => void)(...callArgs);
    };
    const id = realSet(wrapped as TimerHandler, timeout, ...args);
    live.add(id);
    return id;
  }) as typeof globalThis.setInterval;

  globalThis.clearInterval = ((id?: unknown) => {
    live.delete(id);
    return realClear(id as Parameters<typeof clearInterval>[0]);
  }) as typeof globalThis.clearInterval;

  return {
    get liveCount() {
      return live.size;
    },
    get fires() {
      return records.reduce((n, r) => n + r.fires, 0);
    },
    get firesAfterCancel() {
      return records.reduce((n, r) => n + r.afterCancel, 0);
    },
    markCancel() {
      pastCancel = true;
    },
    clearAll() {
      for (const id of live) realClear(id as Parameters<typeof clearInterval>[0]);
      live.clear();
    },
    restore() {
      globalThis.setInterval = realSet;
      globalThis.clearInterval = realClear;
    },
  };
}

const flushTick = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
const dataLine = (json: string) => new TextEncoder().encode(`data: ${json}\n\n`);

async function expectCancelClearsTimers(
  t: import("node:test").TestContext,
  make: () => TransformStream<Uint8Array, Uint8Array>,
  feed?: Uint8Array
): Promise<void> {
  const timers = instrumentIntervals();
  t.after(() => timers.restore());

  const stream = make();
  // A failing precondition below must not leave a live interval behind: node:test
  // would then hang instead of reporting a failure.
  t.after(() => {
    // The cancel handler under test may itself be the thing that is missing, and a
    // stream whose timer never stops keeps node:test's event loop alive, so the run
    // hangs instead of failing. Clear the recorded handles directly as a last resort.
    void stream.readable.cancel().catch(() => undefined);
    timers.clearAll();
  });
  const reader = stream.readable.getReader();
  if (feed) {
    const writer = stream.writable.getWriter();
    const writing = writer.write(feed).catch(() => undefined);
    await Promise.race([reader.read(), flushTick(300)]);
    await writing;
    writer.releaseLock();
  }
  reader.releaseLock();

  await flushTick(120);
  assert.ok(timers.liveCount >= 1, "a timer must be armed before cancel or this assertion proves nothing");
  assert.ok(timers.fires >= 1, "the timer must have fired before cancel");

  await stream.readable.cancel(new Error("client disconnect"));
  timers.markCancel();
  await flushTick(200);

  // liveCount alone is not sufficient: when cancel() is missing, the next enqueue
  // throws and the factories clear their own interval from the error path, so the
  // handle disappears either way. firesAfterCancel is the assertion with teeth --
  // that one stray fire is what distinguishes a real cancel from self-healing.
  assert.equal(timers.liveCount, 0, "cancel() must clear the timer");
  assert.equal(timers.firesAfterCancel, 0, "a cleared timer must not fire after cancel");
}

test("createResponsesApiTransformStream clears its keepalive interval on cancel", async (t) => {
  await expectCancelClearsTimers(
    t,
    () => createResponsesApiTransformStream(null, 20),
    dataLine('{"id":"c1","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"hi"},"finish_reason":null}]}')
  );
});

test("createProgressTransform clears its interval on cancel", async (t) => {
  await expectCancelClearsTimers(
    t,
    () => createProgressTransform({ intervalMs: 20 }),
    dataLine('{"choices":[{"delta":{"content":"hi"}}]}')
  );
});

test("createSseHeartbeatTransform clears its interval on cancel", async (t) => {
  await expectCancelClearsTimers(
    t,
    () => createSseHeartbeatTransform({ intervalMs: 20, shape: "anthropic-ping" }),
    dataLine('{"x":1}')
  );
});

test("createSseTextTransform invokes onCancel exactly once on cancel", async (t) => {
  let onCancelCalls = 0;
  let onFlushCalls = 0;
  const stream = createSseTextTransform(
    (text: string) => `[p]${text}`,
    () => {
      onFlushCalls += 1;
      return null;
    },
    () => {
      onCancelCalls += 1;
    }
  );
  t.after(() => {
    void stream.readable.cancel().catch(() => undefined);
  });

  await stream.readable.cancel(new Error("client disconnect"));

  assert.equal(onCancelCalls, 1, "cancel() must call onCancel exactly once");
  assert.equal(onFlushCalls, 0, "cancel() must not run the flush path");
});

test("createSseTextTransform redacts the log context for a PII error and keeps it otherwise", async (t) => {
  const logged: unknown[][] = [];
  const realConsoleError = console.error;
  console.error = (...args: unknown[]) => {
    logged.push(args);
  };
  t.after(() => {
    console.error = realConsoleError;
  });

  const runWith = async (processor: () => string) => {
    const stream = createSseTextTransform(processor);
    t.after(() => {
      void stream.readable.cancel().catch(() => undefined);
    });
    const writer = stream.writable.getWriter();
    const reading = stream.readable.getReader().read().catch(() => undefined);
    await writer
      .write(new TextEncoder().encode('data: {"choices":[{"delta":{"content":"secret"}}]}\n\n'))
      .catch(() => undefined);
    await reading;
    return logged.at(-1);
  };

  const piiEntry = await runWith(() => {
    throw new Error("[PII] cannot be logged");
  });
  assert.equal(
    piiEntry?.[3],
    "[REDACTED_DUE_TO_PII]",
    "a PII error must not echo the chunk into the log"
  );

  const ordinaryEntry = await runWith(() => {
    throw new Error("ordinary failure");
  });
  assert.match(
    String(ordinaryEntry?.[3]),
    /secret/,
    "a non-PII error still logs the chunk so the failure stays debuggable"
  );
});

test("negative control: a stream without a cancel handler leaks its interval", async () => {
  let ticks = 0;
  let id: ReturnType<typeof setInterval> | undefined;
  const stream = new TransformStream<Uint8Array, Uint8Array>({
    start() {
      id = setInterval(() => {
        ticks += 1;
      }, 20);
    },
    transform(chunk, controller) {
      controller.enqueue(chunk);
    },
  });

  try {
    await flushTick(100);
    const before = ticks;
    assert.ok(before > 0, "control timer must be firing before cancel");

    await stream.readable.cancel(new Error("client disconnect"));
    await flushTick(150);
    assert.ok(
      ticks > before,
      "control must keep firing after cancel (no handler); if it stops, the harness cannot detect leaks"
    );
  } finally {
    if (id) clearInterval(id);
    await stream.readable.cancel().catch(() => undefined);
  }
});

// ---------------------------------------------------------------------------
// 2. sanitizeToolResultId()
// ---------------------------------------------------------------------------

test("sanitizeToolResultId returns null for falsy ids so orphan tool_results stay skipped", () => {
  assert.equal(sanitizeToolResultId(undefined), null);
  assert.equal(sanitizeToolResultId(null), null);
  assert.equal(sanitizeToolResultId(""), null);
  assert.equal(sanitizeToolResultId(0), null);
});

test("sanitizeToolResultId passes a well-formed string id through unchanged", () => {
  assert.equal(sanitizeToolResultId("toolu_abc-123"), "toolu_abc-123");
});

test("sanitizeToolResultId replaces characters outside [A-Za-z0-9_-]", () => {
  assert.equal(sanitizeToolResultId("call:with spaces//slashes"), "call_with_spaces__slashes");
});

test("sanitizeToolResultId coerces a non-string id instead of throwing", () => {
  // Previously this reached `id.replace()` on a number and threw a TypeError.
  assert.equal(sanitizeToolResultId(12345), "12345");
});

// ---------------------------------------------------------------------------
// 3. Read shim `limit` clamping
// ---------------------------------------------------------------------------

function readShim(args: Record<string, unknown>): Record<string, unknown> {
  return JSON.parse(applyToolCallShimToBuffer("Read", JSON.stringify(args)));
}

test("Read shim clamps a limit above the 2000-line cap", () => {
  assert.equal(readShim({ file_path: "/a.txt", limit: 5000 }).limit, 2000);
});

test("Read shim leaves an in-range limit untouched at both bounds", () => {
  assert.equal(readShim({ file_path: "/a.txt", limit: 1 }).limit, 1);
  assert.equal(readShim({ file_path: "/a.txt", limit: 2000 }).limit, 2000);
  assert.equal(readShim({ file_path: "/a.txt", limit: 500 }).limit, 500);
});

test("Read shim drops a limit below 1", () => {
  assert.equal("limit" in readShim({ file_path: "/a.txt", limit: 0 }), false);
  assert.equal("limit" in readShim({ file_path: "/a.txt", limit: -10 }), false);
});

test("Read shim coerces numeric-string limit/offset before clamping", () => {
  const out = readShim({ file_path: "/a.txt", limit: "9999", offset: "-5" });
  assert.equal(out.limit, 2000);
  assert.equal(out.offset, 0);
});

test("Read shim floors a negative offset at 0", () => {
  assert.equal(readShim({ file_path: "/a.txt", offset: -1 }).offset, 0);
});
