/**
 * A stream that ends early — the client hangs up (499 `client_disconnected`) or the upstream
 * fails mid-answer — used to be finalized with ZERO tokens even after the provider had already
 * generated (and billed) part of the answer. The failure finalizer now carries the partial usage
 * the SSE transform accumulated: provider-reported usage when it arrived, otherwise an estimate
 * from the streamed output length (flagged `estimated`). Status / success semantics are unchanged.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { FORMATS } from "../../open-sse/translator/formats.ts";
import {
  createPassthroughStreamWithLogger,
  createSSETransformStreamWithLogger,
} from "../../open-sse/utils/stream.ts";
import { createStreamFailureFinalizers } from "../../open-sse/utils/streamFailureFinalization.ts";
import {
  readStreamPartialUsage,
  resolvePartialStreamUsage,
  trackStreamPartialUsage,
} from "../../open-sse/utils/streamPartialUsage.ts";

const encoder = new TextEncoder();

const REQUEST_BODY = {
  model: "gpt-test",
  stream: true,
  messages: [{ role: "user", content: "Write a long story about a lighthouse keeper." }],
};

function openAiChunk(delta: Record<string, unknown>, extra: Record<string, unknown> = {}) {
  return `data: ${JSON.stringify({
    id: "chatcmpl-partial",
    object: "chat.completion.chunk",
    model: "gpt-test",
    choices: [{ index: 0, delta, finish_reason: null }],
    ...extra,
  })}\n\n`;
}

type TransformLike = { readable: ReadableStream<Uint8Array>; writable: WritableStream<Uint8Array> };

const teardowns: Array<() => Promise<void>> = [];
test.afterEach(async () => {
  // The client "hangs up": cancelling the readable runs the transform's cancel() (clears its
  // idle timer) — never its flush(), exactly like a real disconnect.
  for (const teardown of teardowns.splice(0)) await teardown();
});

/** Push SSE text through the transform and read what it forwards, WITHOUT closing it (no flush). */
async function pumpWithoutFlush(stream: TransformLike, frames: string[]): Promise<void> {
  const writer = stream.writable.getWriter();
  const reader = stream.readable.getReader();
  teardowns.push(async () => {
    await reader.cancel("client_disconnected").catch(() => {});
    await writer.abort("client_disconnected").catch(() => {});
  });
  // Keep a reader draining (like a live client socket) so backpressure never stalls the writes.
  void (async () => {
    try {
      while (!(await reader.read()).done) {
        /* drain */
      }
    } catch {
      /* stream torn down */
    }
  })();
  for (const frame of frames) {
    await writer.write(encoder.encode(frame));
  }
}

type PersistCall = [number, string | undefined, Record<string, unknown> | undefined];

function finalizersWith(readPartialUsage?: () => unknown) {
  const persisted: unknown[][] = [];
  const completions: Record<string, unknown>[] = [];
  const finalizers = createStreamFailureFinalizers({
    isFailureCompletionRecorded: () => false,
    onStreamComplete: (payload) => {
      completions.push(payload as unknown as Record<string, unknown>);
    },
    persistFailureUsage: (...args: unknown[]) => {
      persisted.push(args);
    },
    readPartialUsage: readPartialUsage as never,
  });
  return { ...finalizers, persisted, completions };
}

// ── finalizer: carries the partial usage into the 499 record ────────────────────────────────

test("client disconnect records the provider-reported partial usage instead of zero", () => {
  const { handleStreamFailure, persisted, completions } = finalizersWith(() => ({
    prompt_tokens: 100,
    completion_tokens: 42,
    total_tokens: 142,
  }));

  handleStreamFailure({
    status: 499,
    message: "Client disconnected: request_signal_aborted",
    code: "client_disconnected",
    type: "client_disconnected",
  });

  assert.equal(persisted.length, 1);
  const [status, code, aggregate] = persisted[0] as PersistCall;
  assert.equal(status, 499);
  assert.equal(code, "client_disconnected");
  assert.ok(aggregate, "the failure usage row must receive the partial token aggregate");
  assert.equal(aggregate.prompt_tokens, 100);
  assert.equal(aggregate.completion_tokens, 42);

  assert.equal(completions.length, 1);
  assert.equal(completions[0].status, 499);
  // `usage` stays null so the success-only side effects (usage row, cost, calibration) do not
  // fire a second time; the call log reads the partial usage from its own field.
  assert.equal(completions[0].usage, null);
  assert.deepEqual(completions[0].partialUsage, {
    prompt_tokens: 100,
    completion_tokens: 42,
    total_tokens: 142,
  });
});

test("a mid-stream upstream failure also carries the partial usage", () => {
  const { onPipelineStreamError, persisted } = finalizersWith(() => ({
    prompt_tokens: 12,
    completion_tokens: 7,
    total_tokens: 19,
  }));

  onPipelineStreamError({ message: "terminated", statusCode: 502 });

  assert.equal(persisted.length, 1);
  const [status, code, aggregate] = persisted[0] as PersistCall;
  assert.equal(status, 502);
  assert.equal(code, "stream_terminated");
  assert.equal(aggregate?.prompt_tokens, 12);
  assert.equal(aggregate?.completion_tokens, 7);
});

test("no partial usage keeps the zero-token failure record unchanged", () => {
  const { handleStreamFailure, persisted, completions } = finalizersWith(() => null);

  handleStreamFailure({ status: 499, message: "gone", code: "client_disconnected" });

  assert.deepEqual(persisted, [[499, "client_disconnected"]]);
  assert.equal(completions[0].usage, null);
  assert.equal("partialUsage" in completions[0], false);
});

test("a throwing partial-usage reader never blocks the failure finalization", () => {
  const { handleStreamFailure, persisted, completions } = finalizersWith(() => {
    throw new Error("boom");
  });

  handleStreamFailure({ status: 499, message: "gone", code: "client_disconnected" });

  assert.deepEqual(persisted, [[499, "client_disconnected"]]);
  assert.equal(completions.length, 1);
});

test("a recorded completion wins: the disconnect finalizer neither reads nor writes usage", () => {
  let reads = 0;
  const persisted: unknown[][] = [];
  const { handleStreamFailure } = createStreamFailureFinalizers({
    isFailureCompletionRecorded: () => false,
    isStreamCompletionRecorded: () => true,
    onStreamComplete: () => assert.fail("completion already recorded"),
    persistFailureUsage: (...args: unknown[]) => {
      persisted.push(args);
    },
    readPartialUsage: () => {
      reads++;
      return { prompt_tokens: 1, completion_tokens: 1 };
    },
  });

  handleStreamFailure({ status: 499, message: "late", code: "client_disconnected" });

  assert.equal(reads, 0);
  assert.deepEqual(persisted, []);
});

// ── pure resolver ───────────────────────────────────────────────────────────────────────────

test("resolvePartialStreamUsage: reported usage is returned verbatim, not estimated", () => {
  const usage = resolvePartialStreamUsage({
    reported: { prompt_tokens: 100, completion_tokens: 42, total_tokens: 142 },
    contentLength: 5000,
    body: REQUEST_BODY,
  });
  assert.deepEqual(usage, { prompt_tokens: 100, completion_tokens: 42, total_tokens: 142 });
});

test("resolvePartialStreamUsage: no reported usage + emitted output → flagged estimate", () => {
  const usage = resolvePartialStreamUsage({
    reported: null,
    contentLength: 350,
    body: REQUEST_BODY,
  });
  assert.ok(usage);
  assert.ok(usage.prompt_tokens > 0, "input estimated from the request body");
  assert.equal(usage.completion_tokens, 100, "350 chars ≈ 100 output tokens");
  assert.equal(usage.total_tokens, usage.prompt_tokens + usage.completion_tokens);
  assert.equal(usage.estimated, true);
});

test("resolvePartialStreamUsage: nothing reported and nothing emitted → null (no fabrication)", () => {
  assert.equal(
    resolvePartialStreamUsage({ reported: null, contentLength: 0, body: REQUEST_BODY }),
    null
  );
  assert.equal(
    resolvePartialStreamUsage({ reported: {}, contentLength: 0, body: REQUEST_BODY }),
    null
  );
});

test("resolvePartialStreamUsage: Claude-style input-only usage gets the output estimated", () => {
  // message_start reported the prompt; the client left before message_delta's output count.
  const usage = resolvePartialStreamUsage({
    reported: { prompt_tokens: 900, cache_read_input_tokens: 300 },
    contentLength: 70,
    body: REQUEST_BODY,
  });
  assert.ok(usage);
  assert.equal(usage.prompt_tokens, 900, "reported input is kept");
  assert.equal(usage.cache_read_input_tokens, 300);
  assert.equal(usage.completion_tokens, 20);
  assert.equal(usage.total_tokens, 920);
  assert.equal(usage.estimated, true);
});

test("resolvePartialStreamUsage: input_tokens/output_tokens shape is normalized", () => {
  const usage = resolvePartialStreamUsage({
    reported: { input_tokens: 30, output_tokens: 9 },
    contentLength: 0,
    body: REQUEST_BODY,
  });
  assert.deepEqual(usage, { prompt_tokens: 30, completion_tokens: 9, total_tokens: 39 });
});

// ── real SSE transform: the snapshot reflects what was streamed so far ─────────────────────

test("passthrough stream: content without a usage frame yields an estimated partial usage", async () => {
  const stream = createPassthroughStreamWithLogger(
    "openai",
    null,
    null,
    "gpt-test",
    null,
    REQUEST_BODY,
    () => assert.fail("flush must not run — the client is still mid-stream"),
    null,
    null,
    FORMATS.OPENAI
  );
  assert.equal(readStreamPartialUsage(stream), null, "nothing streamed yet");

  await pumpWithoutFlush(stream, [
    openAiChunk({ role: "assistant", content: "Once upon a time, " }),
    openAiChunk({ content: "a keeper climbed the stairs of the old lighthouse." }),
  ]);

  const usage = readStreamPartialUsage(stream);
  assert.ok(usage, "partial usage must be available before flush");
  assert.ok(usage.completion_tokens > 0);
  assert.ok(usage.prompt_tokens > 0);
  assert.equal(usage.estimated, true);
});

test("passthrough stream: a provider usage frame is preferred over the estimate", async () => {
  const stream = createPassthroughStreamWithLogger(
    "openai",
    null,
    null,
    "gpt-test",
    null,
    REQUEST_BODY,
    null,
    null,
    null,
    FORMATS.OPENAI
  );

  await pumpWithoutFlush(stream, [
    openAiChunk(
      { role: "assistant", content: "Partial answer" },
      { usage: { prompt_tokens: 100, completion_tokens: 42, total_tokens: 142 } }
    ),
  ]);

  const usage = readStreamPartialUsage(stream);
  assert.equal(usage?.prompt_tokens, 100);
  assert.equal(usage?.completion_tokens, 42);
  assert.equal(usage?.estimated, undefined);
});

test("translate stream (OpenAI upstream → Claude client): partial output is accounted", async () => {
  const stream = createSSETransformStreamWithLogger(
    FORMATS.OPENAI,
    FORMATS.CLAUDE,
    "openai",
    null,
    null,
    "gpt-test",
    null,
    REQUEST_BODY,
    () => assert.fail("flush must not run — the client is still mid-stream")
  );

  await pumpWithoutFlush(stream, [
    openAiChunk({ role: "assistant", content: "The lamp turned slowly over the black water." }),
  ]);

  const usage = readStreamPartialUsage(stream);
  assert.ok(usage);
  assert.ok(usage.completion_tokens > 0);
});

test("end to end: disconnect after streamed output persists non-zero tokens with status 499", async () => {
  const stream = createPassthroughStreamWithLogger(
    "openai",
    null,
    null,
    "gpt-test",
    null,
    REQUEST_BODY,
    null,
    null,
    null,
    FORMATS.OPENAI
  );
  const { handleStreamFailure, persisted } = finalizersWith(() => readStreamPartialUsage(stream));

  await pumpWithoutFlush(stream, [openAiChunk({ role: "assistant", content: "x".repeat(700) })]);
  handleStreamFailure({
    status: 499,
    message: "Client disconnected: request_signal_aborted",
    code: "client_disconnected",
    type: "client_disconnected",
  });

  const [status, code, aggregate] = persisted[0] as PersistCall;
  assert.equal(status, 499);
  assert.equal(code, "client_disconnected");
  assert.equal(aggregate?.completion_tokens, 200);
  assert.ok((aggregate?.prompt_tokens as number) > 0);
});

test("readStreamPartialUsage: unknown / missing streams read as null", () => {
  assert.equal(readStreamPartialUsage(null), null);
  assert.equal(readStreamPartialUsage(undefined), null);
  assert.equal(readStreamPartialUsage({}), null);
});

test("trackStreamPartialUsage: reads the live usage/length lazily, only when finalized", () => {
  const stream = {};
  let reads = 0;
  let reported: unknown = null;
  let contentLength = 0;
  const returned = trackStreamPartialUsage(stream, REQUEST_BODY, () => {
    reads += 1;
    return [reported, contentLength];
  });
  assert.equal(returned, stream, "returns the same stream for chaining");
  assert.equal(reads, 0, "nothing is computed at registration time");

  reported = { prompt_tokens: 12, completion_tokens: 34 };
  contentLength = 200;
  const usage = readStreamPartialUsage(stream);
  assert.equal(reads, 1);
  assert.equal(usage?.prompt_tokens, 12);
  assert.equal(usage?.completion_tokens, 34);
  assert.equal(usage?.estimated, undefined, "provider-reported usage is not flagged");
});
