/**
 * Combo streaming peek: lifecycle-progress release.
 *
 * The bounded SSE peek in `validateResponseQuality` used to hold the whole
 * stream (message_start included) until the first non-empty text/thinking
 * delta. Models that omit thinking text (Opus 5.x streams `thinking_delta`
 * with an empty `thinking` plus a signature) or that think / plan a tool for a
 * long time therefore reached the client as pings only, and clients that watch
 * for real events aborted and resent.
 *
 * After a lifecycle-progress event the peek now releases the buffered prefix
 * after at most STREAM_PEEK_PROGRESS_GRACE_MS, forwarding the still-pending
 * source read. These tests pin that behaviour and the failover contracts that
 * must survive it (pre-content errors, empty lifecycles, pings-only streams,
 * readiness fallback).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { validateResponseQuality } = await import("../../open-sse/services/combo.ts");
const { STREAM_PEEK_PROGRESS_GRACE_MS } =
  await import("../../open-sse/services/combo/validateQuality.ts");
const { ensureStreamReadiness } = await import("../../open-sse/utils/streamReadiness.ts");
const { runReadinessFallback, maybeFallbackAfterReadiness } =
  await import("../../open-sse/handlers/chatCore/streamReadinessFallback.ts");

// Undefined on the unpatched tree: default so the file still loads and the
// regression tests fail by assertion rather than at import.
const GRACE: number = (STREAM_PEEK_PROGRESS_GRACE_MS as number | undefined) ?? 1000;
const TEXT_DELAY = GRACE + 2000;

type Quality = Awaited<ReturnType<typeof validateResponseQuality>>;
type Readiness = Awaited<ReturnType<typeof ensureStreamReadiness>>;
type FallbackArgs = Parameters<typeof runReadinessFallback>[0];
type FallbackOutcome = Awaited<ReturnType<typeof runReadinessFallback>>;

function expectReady(r: Readiness): Extract<Readiness, { ok: true }> {
  if (!r.ok)
    throw new assert.AssertionError({ message: `expected stream readiness, got ${r.code}` });
  return r;
}

function expectFailed(r: Readiness): Extract<Readiness, { ok: false }> {
  if (r.ok) throw new assert.AssertionError({ message: "expected a stream readiness failure" });
  return r;
}

function bodyOf(r: Response | null | undefined): ReadableStream<Uint8Array> {
  assert.ok(r?.body, "response has a body");
  return r.body;
}

const silentLog = { warn: () => {} };
const encoder = new TextEncoder();

// ── helpers ─────────────────────────────────────────────────────────────────

function sse(event: string, data: unknown): string {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

function dataOnly(data: unknown): string {
  return `data: ${typeof data === "string" ? data : JSON.stringify(data)}\n\n`;
}

type Step =
  | { delayMs?: number; text: string }
  | { delayMs?: number; error: Error }
  | { delayMs?: number; close: true };

type Scripted = {
  stream: ReadableStream<Uint8Array>;
  /** Date.now() at which each step index was enqueued / errored / closed. */
  emittedAt: number[];
  /** Stop delivering further steps (clears timers). Safe on a locked stream. */
  stop: () => void;
};

function scriptedStream(steps: Step[]): Scripted {
  const emittedAt: number[] = [];
  const timers = new Set<ReturnType<typeof setTimeout>>();
  const pendingResolves = new Set<() => void>();
  let idx = 0;
  let stopped = false;

  const stop = () => {
    stopped = true;
    for (const t of timers) clearTimeout(t);
    timers.clear();
    for (const resolve of pendingResolves) resolve();
    pendingResolves.clear();
  };

  const stream = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (stopped || idx >= steps.length) return;
      const i = idx++;
      const step = steps[i];
      return new Promise<void>((resolve) => {
        pendingResolves.add(resolve);
        const timer = setTimeout(() => {
          timers.delete(timer);
          pendingResolves.delete(resolve);
          if (stopped) return resolve();
          emittedAt[i] = Date.now();
          try {
            if ("error" in step) controller.error(step.error);
            else if ("close" in step) controller.close();
            else controller.enqueue(encoder.encode(step.text));
          } catch {
            // stream already cancelled/closed
          }
          resolve();
        }, step.delayMs ?? 0);
        timers.add(timer);
      });
    },
    cancel() {
      stop();
    },
  });

  return { stream, emittedAt, stop };
}

function sseResponse(stream: ReadableStream<Uint8Array>): Response {
  return new Response(stream, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

const TIMEOUT = Symbol("timeout");
// A read left pending by a timed-out readUntil is reused by the next call on
// the same reader so no chunk is lost or reordered.
const pendingReads = new WeakMap<object, Promise<ReadableStreamReadResult<Uint8Array>>>();

async function readUntil(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  predicate: (text: string) => boolean,
  timeoutMs: number
): Promise<{ text: string; at: number; done: boolean }> {
  const decoder = new TextDecoder();
  const deadline = Date.now() + timeoutMs;
  let text = "";
  let done = false;
  while (!predicate(text)) {
    const remaining = deadline - Date.now();
    if (remaining <= 0) break;
    let read = pendingReads.get(reader);
    if (!read) {
      read = reader.read();
      read.catch(() => {});
      pendingReads.set(reader, read);
    }
    let timer: ReturnType<typeof setTimeout> | undefined;
    const timeout = new Promise<typeof TIMEOUT>((resolve) => {
      timer = setTimeout(() => resolve(TIMEOUT), remaining);
    });
    let result: ReadableStreamReadResult<Uint8Array> | typeof TIMEOUT;
    try {
      result = await Promise.race([read, timeout]);
    } catch (error) {
      pendingReads.delete(reader);
      throw error;
    } finally {
      clearTimeout(timer);
    }
    if (result === TIMEOUT) break;
    pendingReads.delete(reader);
    if (result.done) {
      done = true;
      break;
    }
    text += decoder.decode(result.value, { stream: true });
  }
  text += decoder.decode();
  return { text, at: Date.now(), done };
}

async function readAll(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  timeoutMs: number
): Promise<{ text: string; at: number; done: boolean }> {
  return readUntil(reader, () => false, timeoutMs);
}

function quietCancel(target: { cancel: (reason?: unknown) => Promise<void> } | null | undefined) {
  try {
    void target?.cancel().catch(() => {});
  } catch {
    // locked / already released
  }
}

// ── realistic frames ────────────────────────────────────────────────────────

const MESSAGE_START = sse("message_start", {
  type: "message_start",
  message: {
    id: "msg_1",
    type: "message",
    role: "assistant",
    model: "claude-opus-5-5",
    content: [],
    stop_reason: null,
    stop_sequence: null,
    usage: { input_tokens: 10, output_tokens: 0 },
  },
});
const THINKING_START = sse("content_block_start", {
  type: "content_block_start",
  index: 0,
  content_block: { type: "thinking", thinking: "" },
});
// Opus 5.x omits the thinking text: the delta is present but empty.
const THINKING_DELTA_EMPTY = sse("content_block_delta", {
  type: "content_block_delta",
  index: 0,
  delta: { type: "thinking_delta", thinking: "" },
});
const SIGNATURE_DELTA = sse("content_block_delta", {
  type: "content_block_delta",
  index: 0,
  delta: { type: "signature_delta", signature: "sig" },
});
const PING = sse("ping", { type: "ping" });
const THINKING_STOP = sse("content_block_stop", { type: "content_block_stop", index: 0 });
const TEXT_START = sse("content_block_start", {
  type: "content_block_start",
  index: 1,
  content_block: { type: "text", text: "" },
});
const TEXT_DELTA_HELLO = sse("content_block_delta", {
  type: "content_block_delta",
  index: 1,
  delta: { type: "text_delta", text: "Hello" },
});
const TEXT_STOP = sse("content_block_stop", { type: "content_block_stop", index: 1 });
const MESSAGE_DELTA_END = sse("message_delta", {
  type: "message_delta",
  delta: { stop_reason: "end_turn", stop_sequence: null },
  usage: { output_tokens: 5 },
});
const MESSAGE_DELTA_CONTENT_FILTER = sse("message_delta", {
  type: "message_delta",
  delta: { stop_reason: "content_filter", stop_sequence: null },
  usage: { output_tokens: 0 },
});
const MESSAGE_STOP = sse("message_stop", { type: "message_stop" });
const ERROR_OVERLOADED = sse("error", {
  type: "error",
  error: { type: "overloaded_error", message: "Overloaded" },
});
const TOOL_USE_START = sse("content_block_start", {
  type: "content_block_start",
  index: 0,
  content_block: { type: "tool_use", id: "toolu_1", name: "Bash", input: {} },
});
const INPUT_JSON_DELTA = sse("content_block_delta", {
  type: "content_block_delta",
  index: 0,
  delta: { type: "input_json_delta", partial_json: '{"command":"ls"}' },
});

const CHUNK_A =
  MESSAGE_START +
  THINKING_START +
  THINKING_DELTA_EMPTY +
  THINKING_DELTA_EMPTY +
  THINKING_DELTA_EMPTY +
  SIGNATURE_DELTA +
  PING;
const CHUNK_B =
  THINKING_STOP + TEXT_START + TEXT_DELTA_HELLO + TEXT_STOP + MESSAGE_DELTA_END + MESSAGE_STOP;

const GOOD_CLAUDE_TEXT =
  MESSAGE_START + TEXT_START + TEXT_DELTA_HELLO + TEXT_STOP + MESSAGE_DELTA_END + MESSAGE_STOP;

function goodClaudeTextResponse(): Response {
  return new Response(GOOD_CLAUDE_TEXT, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

function thinkingFirstSteps(): Step[] {
  return [{ text: CHUNK_A }, { delayMs: TEXT_DELAY, text: CHUNK_B }, { close: true }];
}

function fallbackArgs(
  failedReadiness: Readiness,
  failedBody: Response,
  executeProviderRequest: () => Promise<{ response?: Response }>
): FallbackArgs {
  return {
    failedReadiness,
    failedConnectionId: "c1",
    failedBody,
    currentModel: "m",
    streamReadinessPolicy: { timeoutMs: 2000, maxTimeoutMs: 2000 },
    provider: "claude",
    model: "m",
    log: null,
    reqLogger: { logTargetRequest() {} },
    providerUrl: "u",
    providerHeaders: {},
    finalBody: {},
    translatedBody: {},
    executeProviderRequest,
    providerRequestCapture: { body: (b: unknown) => b },
  };
}

// OpenAI chat.completions shapes.
const OPENAI_ROLE_ONLY = dataOnly({
  id: "c",
  object: "chat.completion.chunk",
  choices: [{ index: 0, delta: { role: "assistant" }, finish_reason: null }],
});
const OPENAI_CONTENT = dataOnly({
  id: "c",
  object: "chat.completion.chunk",
  choices: [{ index: 0, delta: { content: "Hello" }, finish_reason: null }],
});
const OPENAI_STOP_EMPTY = dataOnly({
  id: "c",
  object: "chat.completion.chunk",
  choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
});
const OPENAI_REASONING = dataOnly({
  id: "c",
  object: "chat.completion.chunk",
  choices: [
    {
      index: 0,
      delta: { role: "assistant", reasoning_content: "Let me think" },
      finish_reason: null,
    },
  ],
});
const OPENAI_DONE = dataOnly("[DONE]");

// ── tests ───────────────────────────────────────────────────────────────────

test("regression: thinking-first Claude stream reaches the client before the first text", async () => {
  const src = scriptedStream(thinkingFirstSteps());
  const resp = sseResponse(src.stream);
  let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;
  let q: Quality | null = null;
  try {
    const t0 = Date.now();
    const ready = expectReady(await ensureStreamReadiness(resp, { timeoutMs: 10000 }));
    assert.equal(ready.ok, true, "message_start must satisfy stream readiness");

    const clone = ready.response.clone();
    q = await validateResponseQuality(clone, true, silentLog);
    const resolvedAfter = Date.now() - t0;
    assert.equal(q.valid, true);
    assert.ok(
      resolvedAfter < GRACE + 700,
      `peek must release within the progress grace, resolved after ${resolvedAfter}ms (text at ${TEXT_DELAY}ms)`
    );

    // Combo forwards the original and drops the peek replay.
    void q.clonedResponse?.body?.cancel().catch(() => {});

    reader = bodyOf(ready.response).getReader();
    const first = await readUntil(
      reader!,
      (t) => t.includes("message_start") && t.includes("thinking_delta"),
      TEXT_DELAY
    );
    assert.match(first.text, /message_start/);
    assert.match(first.text, /thinking_delta/);
    assert.ok(!first.text.includes("text_delta"), "no text yet when the prefix reaches the client");
    assert.ok(
      src.emittedAt[1] === undefined || first.at < src.emittedAt[1],
      "prefix received before the upstream emitted chunk B"
    );
    assert.ok(first.at - t0 < TEXT_DELAY, "prefix received before the first text");

    const rest = await readUntil(reader!, (t) => t.includes("message_stop"), TEXT_DELAY + 2000);
    const full = first.text + rest.text;
    assert.ok(full.includes("Hello"), "the text arrives once the upstream emits it");
    const helloAt = full.indexOf("Hello");
    const stopAt = full.indexOf("message_stop");
    assert.ok(helloAt > 0 && stopAt > helloAt, "Hello precedes message_stop");
    assert.ok(full.indexOf("message_start") < full.indexOf("thinking_delta"));
  } finally {
    if (reader) quietCancel(reader);
    void q?.clonedResponse?.body?.cancel().catch(() => {});
    src.stop();
  }
});

test("regression: peek replay forwards the carried pending read without loss or duplication", async () => {
  const src = scriptedStream(thinkingFirstSteps());
  let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;
  try {
    const t0 = Date.now();
    const q = await validateResponseQuality(sseResponse(src.stream), true, silentLog);
    const resolvedAfter = Date.now() - t0;
    assert.equal(q.valid, true);
    assert.ok(q.clonedResponse, "a replay response is returned");
    assert.ok(
      resolvedAfter < GRACE + 700,
      `peek must release within the progress grace, resolved after ${resolvedAfter}ms`
    );

    reader = bodyOf(q.clonedResponse).getReader();
    const first = await readUntil(reader!, (t) => t.length > 0, 1000);
    assert.equal(first.text, CHUNK_A, "the replay yields the buffered chunk A first");

    const rest = await readAll(reader!, TEXT_DELAY + 2000);
    assert.equal(rest.done, true, "the replay closes when the upstream closes");
    assert.equal(first.text + rest.text, CHUNK_A + CHUNK_B, "nothing lost or duplicated");
  } finally {
    if (reader) quietCancel(reader);
    src.stop();
  }
});

test("tool_use-first stream releases at the tool start", async () => {
  const src = scriptedStream([
    { text: MESSAGE_START + TOOL_USE_START },
    { delayMs: TEXT_DELAY, text: INPUT_JSON_DELTA },
    { close: true },
  ]);
  let q: Quality | null = null;
  let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;
  try {
    const t0 = Date.now();
    q = await validateResponseQuality(sseResponse(src.stream), true, silentLog);
    const resolvedAfter = Date.now() - t0;
    assert.equal(q.valid, true);
    assert.ok(resolvedAfter < 300, `tool start is a content verdict, took ${resolvedAfter}ms`);

    reader = bodyOf(q.clonedResponse).getReader();
    const first = await readUntil(reader!, (t) => t.length > 0, 1000);
    assert.ok(first.text.startsWith("event: message_start"), "replay starts with message_start");
  } finally {
    if (reader) quietCancel(reader);
    else void q?.clonedResponse?.body?.cancel().catch(() => {});
    src.stop();
  }
});

test("tool_use start after a silent gap is released by the grace", async () => {
  const src = scriptedStream([
    { text: MESSAGE_START },
    { delayMs: TEXT_DELAY, text: TOOL_USE_START },
    { close: true },
  ]);
  let q: Quality | null = null;
  try {
    const t0 = Date.now();
    q = await validateResponseQuality(sseResponse(src.stream), true, silentLog);
    const resolvedAfter = Date.now() - t0;
    assert.equal(q.valid, true);
    assert.ok(
      resolvedAfter >= GRACE - 100 && resolvedAfter <= GRACE + 700,
      `expected release at the grace (~${GRACE}ms), resolved after ${resolvedAfter}ms`
    );
  } finally {
    void q?.clonedResponse?.body?.cancel().catch(() => {});
    src.stop();
  }
});

test("upstream errors before any event: readiness fails and fallback retries; no bytes reach the client", async () => {
  const src = scriptedStream([{ error: new Error("upstream socket reset") }]);
  const resp = sseResponse(src.stream);
  let outcome: FallbackOutcome | null = null;
  try {
    const failed = expectFailed(
      await ensureStreamReadiness(resp, { timeoutMs: 2000, maxTimeoutMs: 2000 })
    );
    assert.equal(failed.ok, false);
    assert.equal(failed.code, "STREAM_READINESS_TIMEOUT");

    let calls = 0;
    outcome = await runReadinessFallback(
      fallbackArgs(failed, resp, async () => {
        calls++;
        return { response: goodClaudeTextResponse() };
      })
    );
    assert.equal(calls, 1, "exactly one retry");
    assert.equal(outcome.ok, true);
    const text = await outcome.providerResponse.text();
    assert.match(text, /Hello/);
    assert.ok(text.startsWith("event: message_start"), "served body is the retry's stream");
    assert.ok(!text.includes("socket reset"), "the failing upstream contributed no bytes");
  } finally {
    void outcome?.providerResponse?.body?.cancel().catch(() => {});
    src.stop();
  }

  // Combo level: an error frame before any content still fails over.
  const errSrc = scriptedStream([{ text: ERROR_OVERLOADED }, { close: true }]);
  try {
    const q = await validateResponseQuality(sseResponse(errSrc.stream), true, silentLog);
    assert.equal(q.valid, false, "an error-first stream fails the combo target over");
  } finally {
    errSrc.stop();
  }
});

test("pings only, then timeout: readiness fails and fallback retries", async () => {
  const pings: Step[] = Array.from({ length: 200 }, () => ({ delayMs: 100, text: PING }));
  const src = scriptedStream(pings);
  const resp = sseResponse(src.stream);
  let outcome: FallbackOutcome | null = null;
  try {
    const t0 = Date.now();
    const failed = expectFailed(
      await ensureStreamReadiness(resp, { timeoutMs: 400, maxTimeoutMs: 400 })
    );
    const elapsed = Date.now() - t0;
    assert.equal(failed.ok, false);
    assert.equal(failed.code, "STREAM_READINESS_TIMEOUT");
    assert.ok(elapsed < 1200, `readiness timeout must fire within ~1s, took ${elapsed}ms`);

    let calls = 0;
    outcome = await runReadinessFallback(
      fallbackArgs(failed, resp, async () => {
        calls++;
        return { response: goodClaudeTextResponse() };
      })
    );
    assert.equal(calls, 1, "exactly one retry");
    assert.equal(outcome.ok, true);
    const text = await outcome.providerResponse.text();
    assert.match(text, /Hello/);
    assert.ok(!text.includes('"type":"ping"'), "no ping from the stalled upstream is served");
  } finally {
    void outcome?.providerResponse?.body?.cancel().catch(() => {});
    src.stop();
  }

  // Pings never arm the grace: an error after GRACE+300ms of pings still fails over.
  const pingCount = Math.ceil((GRACE + 300) / 100);
  const errSrc = scriptedStream([
    ...Array.from({ length: pingCount }, () => ({ delayMs: 100, text: PING })),
    { delayMs: 100, text: ERROR_OVERLOADED },
    { close: true },
  ]);
  try {
    const q = await validateResponseQuality(sseResponse(errSrc.stream), true, silentLog);
    assert.equal(q.valid, false, "pings alone must not commit the stream");
  } finally {
    errSrc.stop();
  }
});

test("error after message_start, after the grace: no fallback, error reaches the client", async () => {
  const src = scriptedStream([
    { text: MESSAGE_START },
    { delayMs: TEXT_DELAY, text: ERROR_OVERLOADED },
    { close: true },
  ]);
  let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;
  let q: Quality | null = null;
  try {
    q = await validateResponseQuality(sseResponse(src.stream), true, silentLog);
    assert.equal(q.valid, true, "the stream is committed once the grace elapsed");
    assert.ok(q.clonedResponse);

    reader = bodyOf(q.clonedResponse).getReader();
    const got = await readUntil(reader!, (t) => t.includes("overloaded_error"), TEXT_DELAY + 1500);
    assert.ok(got.text.includes("message_start"));
    assert.ok(got.text.includes("overloaded_error"), "the upstream error frame reaches the client");
    assert.ok(got.text.indexOf("message_start") < got.text.indexOf("overloaded_error"));
  } finally {
    if (reader) quietCancel(reader);
    else void q?.clonedResponse?.body?.cancel().catch(() => {});
    src.stop();
  }

  // Readiness level: committed at message_start, then the stream errors.
  const src2 = scriptedStream([
    { text: MESSAGE_START },
    { delayMs: 300, error: new Error("upstream connection lost after message_start") },
  ]);
  const resp2 = sseResponse(src2.stream);
  let reader2: ReadableStreamDefaultReader<Uint8Array> | null = null;
  try {
    const ready = expectReady(
      await ensureStreamReadiness(resp2, { timeoutMs: 2000, maxTimeoutMs: 2000 })
    );
    assert.equal(ready.ok, true, "bytes are committed at message_start");

    let calls = 0;
    const result = await maybeFallbackAfterReadiness({
      ...fallbackArgs(ready, resp2, async () => {
        calls++;
        return { response: goodClaudeTextResponse() };
      }),
      streamReadiness: ready,
      clientAborted: false,
    });
    assert.equal(result.readiness, ready, "readiness returned unchanged");
    assert.equal(calls, 0, "no fallback request once the stream is ready");

    reader2 = bodyOf(ready.response).getReader();
    const first = await readUntil(reader2!, (t) => t.includes("message_start"), 1000);
    assert.match(first.text, /message_start/);
    await assert.rejects(
      readAll(reader2!, 3000),
      /upstream connection lost/,
      "the mid-stream error is reported to the consumer, not swallowed"
    );
  } finally {
    if (reader2) quietCancel(reader2);
    src2.stop();
  }
});

test("error after message_start inside the grace still fails over (nothing sent yet)", async () => {
  const src = scriptedStream([
    { text: MESSAGE_START },
    { delayMs: 100, text: ERROR_OVERLOADED },
    { close: true },
  ]);
  try {
    const q = await validateResponseQuality(sseResponse(src.stream), true, silentLog);
    assert.equal(q.valid, false);
  } finally {
    src.stop();
  }
});

test("empty lifecycle split over several chunks still fails over", async () => {
  const src = scriptedStream([
    { text: MESSAGE_START },
    { delayMs: 20, text: MESSAGE_DELTA_CONTENT_FILTER },
    { delayMs: 20, text: MESSAGE_STOP },
    { delayMs: 20, close: true },
  ]);
  try {
    const q = await validateResponseQuality(sseResponse(src.stream), true, silentLog);
    assert.equal(q.valid, false, "#3685 content_filter lifecycle keeps failing over");
  } finally {
    src.stop();
  }
});

test("OpenAI shapes: role-only first chunk released by the grace; empty turn fails over; reasoning is immediate", async () => {
  // (a) role-only chunk, content only after TEXT_DELAY → released by the grace.
  const srcA = scriptedStream([
    { text: OPENAI_ROLE_ONLY },
    { delayMs: TEXT_DELAY, text: OPENAI_CONTENT },
    { close: true },
  ]);
  let qA: Quality | null = null;
  try {
    const t0 = Date.now();
    qA = await validateResponseQuality(sseResponse(srcA.stream), true, silentLog);
    const resolvedAfter = Date.now() - t0;
    assert.equal(qA.valid, true);
    assert.ok(
      resolvedAfter < GRACE + 700,
      `role-only chunk must arm the grace, resolved after ${resolvedAfter}ms`
    );
  } finally {
    void qA?.clonedResponse?.body?.cancel().catch(() => {});
    srcA.stop();
  }

  // (b) role-only, empty stop, [DONE] → empty completion still fails over (#10404).
  const srcB = scriptedStream([
    { text: OPENAI_ROLE_ONLY },
    { delayMs: 20, text: OPENAI_STOP_EMPTY },
    { delayMs: 20, text: OPENAI_DONE },
    { delayMs: 20, close: true },
  ]);
  try {
    const qB = await validateResponseQuality(sseResponse(srcB.stream), true, silentLog);
    assert.equal(qB.valid, false);
  } finally {
    srcB.stop();
  }

  // (c) reasoning_content first → immediate content verdict (#13620).
  const srcC = scriptedStream([
    { text: OPENAI_REASONING },
    { delayMs: TEXT_DELAY, text: OPENAI_CONTENT },
    { close: true },
  ]);
  let qC: Quality | null = null;
  try {
    const t0 = Date.now();
    qC = await validateResponseQuality(sseResponse(srcC.stream), true, silentLog);
    const resolvedAfter = Date.now() - t0;
    assert.equal(qC.valid, true);
    assert.ok(resolvedAfter < 300, `reasoning delta is content, took ${resolvedAfter}ms`);
  } finally {
    void qC?.clonedResponse?.body?.cancel().catch(() => {});
    srcC.stop();
  }
});
