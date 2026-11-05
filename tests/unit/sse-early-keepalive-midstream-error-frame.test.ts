// tests/unit/sse-early-keepalive-midstream-error-frame.test.ts
// Covers Fix 1: withEarlyStreamKeepalive must emit a format-correct terminal
// error frame when the upstream SSE stream fails AFTER partial content was
// already forwarded. Previously the wrapper silently closed the stream,
// leaving strict clients (openai-node, Anthropic SDK, Codex/OpenCode CLIs)
// with no terminal marker — they reported a transport-level disconnect.
import test from "node:test";
import assert from "node:assert/strict";

import { withEarlyStreamKeepalive } from "../../open-sse/utils/earlyStreamKeepalive.ts";
import {
  OPENAI_CHAT_ERROR_FRAME,
  OPENAI_RESPONSES_ERROR_FRAME,
} from "../../open-sse/utils/earlyStreamKeepalive.ts";

/** Read every chunk from a Response body as a single string, tolerating the
 * reader rejection that surfaces when the underlying stream errored. */
async function readAll(response: Response): Promise<string> {
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let out = "";
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) out += decoder.decode(value, { stream: true });
    }
  } catch {
    // Stream errored after partial content was forwarded — expected under test.
  }
  out += decoder.decode();
  return out;
}

/**
 * Build a Response whose body emits `partial` then throws — simulating an
 * upstream that starts streaming real content and then drops mid-flight.
 */
function partialThenCrashResponse(partial: Uint8Array): Response {
  let pulled = false;
  const body = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (!pulled) {
        pulled = true;
        controller.enqueue(partial);
        return;
      }
      controller.error(new Error("upstream socket reset"));
    },
  });
  return new Response(body, { headers: { "content-type": "text/event-stream" } });
}

function zeroContentCrashResponse(): Response {
  const body = new ReadableStream<Uint8Array>({
    pull(controller) {
      controller.error(new Error("upstream socket reset before any content"));
    },
  });
  return new Response(body, { headers: { "content-type": "text/event-stream" } });
}

test("mid-stream upstream drop after partial content emits a Chat-format error frame", async () => {
  const partial = new TextEncoder().encode(
    'data: {"id":"chatcmpl-1","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"hi"},"finish_reason":null}]}\n\n'
  );
  const handler = Promise.resolve(partialThenCrashResponse(partial));

  const response = await withEarlyStreamKeepalive(handler, {
    thresholdMs: 0,
    intervalMs: 10_000, // avoid periodic keepalive noise
    errorFrame: OPENAI_CHAT_ERROR_FRAME,
  });

  const text = await readAll(response);
  // Partial content survived.
  assert.ok(text.includes('"content":"hi"'), `partial content must be forwarded, got: ${text}`);
  // Terminal error frame present and parseable as a data: line with error key.
  assert.ok(
    text.includes('"type":"stream_error"'),
    "stream_error terminal frame must be present after partial content"
  );
});

test("mid-stream upstream drop after partial content emits a Responses-format error frame", async () => {
  const partial = new TextEncoder().encode(
    'data: {"type":"response.output_text.delta","delta":"hi"}\n\n'
  );
  const handler = Promise.resolve(partialThenCrashResponse(partial));

  const response = await withEarlyStreamKeepalive(handler, {
    thresholdMs: 0,
    intervalMs: 10_000,
    errorFrame: OPENAI_RESPONSES_ERROR_FRAME,
  });

  const text = await readAll(response);
  assert.ok(text.includes('"delta":"hi"'), `partial content must be forwarded, got: ${text}`);
  // Responses-format error uses type:error with sequence_number.
  assert.ok(
    text.includes('"type":"error"'),
    "Responses-format error frame must be present after partial content"
  );
});

test("mid-stream upstream drop after partial content emits an Anthropic-format error frame", async () => {
  // Anthropic default error frame uses event: error.
  const partial = new TextEncoder().encode(
    'event: content_block_delta\ndata: {"type":"content_block_delta","delta":{"text":"hi"}}\n\n'
  );
  const handler = Promise.resolve(partialThenCrashResponse(partial));

  const response = await withEarlyStreamKeepalive(handler, {
    thresholdMs: 0,
    intervalMs: 10_000,
    // Default errorFrame is Anthropic-style event:error.
  });

  const text = await readAll(response);
  assert.ok(text.includes('"text":"hi"'), `partial content must be forwarded, got: ${text}`);
  assert.ok(
    text.includes("event: error"),
    "Anthropic-format error frame must be present after partial content"
  );
});

test("zero-content upstream drop still emits the error frame (unchanged behavior)", async () => {
  const handler = Promise.resolve(zeroContentCrashResponse());

  const response = await withEarlyStreamKeepalive(handler, {
    thresholdMs: 0,
    intervalMs: 10_000,
    errorFrame: OPENAI_CHAT_ERROR_FRAME,
  });

  const text = await readAll(response);
  assert.ok(
    text.includes('"type":"stream_error"'),
    "zero-content drop must still emit the error frame"
  );
});

// CodeRabbit 18948 line 793: a mid-flight failure after an INCOMPLETE SSE
// frame (no blank line yet) must not merge the terminal error's data: line
// into that partial frame — the buffered incomplete frame is discarded.
test("mid-stream drop after an incomplete frame discards it before the error frame", async () => {
  // Last frame deliberately lacks its terminating blank line.
  const partial = new TextEncoder().encode('data: {"delta":"hi"\n');
  const handler = Promise.resolve(partialThenCrashResponse(partial));

  const response = await withEarlyStreamKeepalive(handler, {
    thresholdMs: 0,
    intervalMs: 10_000,
    errorFrame: OPENAI_CHAT_ERROR_FRAME,
  });

  const text = await readAll(response);
  // The incomplete frame was NOT forwarded...
  assert.ok(!text.includes('"delta":"hi"'), `incomplete frame must be discarded, got: ${text}`);
  // ...so the error frame is intact and parseable (its data: line standalone).
  const lines = text.split("\n").filter((l) => l.startsWith("data: "));
  assert.ok(lines.length >= 1, "error frame data: line must survive standalone");
  assert.doesNotThrow(() => JSON.parse(lines[lines.length - 1]!.slice(6)));
});

// Complete frames that arrived before the failure must still be forwarded.
test("mid-stream drop forwards prior complete frames then the error frame", async () => {
  const complete = new TextEncoder().encode('data: {"delta":"a"}\n\ndata: {"delta":"b"}\n\n');
  const handler = Promise.resolve(partialThenCrashResponse(complete));

  const response = await withEarlyStreamKeepalive(handler, {
    thresholdMs: 0,
    intervalMs: 10_000,
    errorFrame: OPENAI_CHAT_ERROR_FRAME,
  });

  const text = await readAll(response);
  assert.ok(text.includes('"delta":"a"'), "complete frame 1 must be forwarded");
  assert.ok(text.includes('"delta":"b"'), "complete frame 2 must be forwarded");
  assert.ok(text.includes('"type":"stream_error"'), "terminal error frame must follow");
  // Each data: line is independently parseable JSON.
  for (const line of text.split("\n").filter((l) => l.startsWith("data: "))) {
    assert.doesNotThrow(() => JSON.parse(line.slice(6)), `line must parse standalone: ${line}`);
  }
});

// The frame-boundary scanner must handle CRLF framing too: a complete
// `\r\n\r\n`-terminated event is forwarded, and a trailing incomplete one is
// discarded rather than pasted in front of the terminal error frame.
test("mid-stream drop handles CRLF framing (complete forwarded, incomplete discarded)", async () => {
  const partial = new TextEncoder().encode(
    'data: {"delta":"crlf-ok"}\r\n\r\ndata: {"delta":"incomplete"}\r\n'
  );
  const handler = Promise.resolve(partialThenCrashResponse(partial));

  const response = await withEarlyStreamKeepalive(handler, {
    thresholdMs: 0,
    intervalMs: 10_000,
    errorFrame: OPENAI_CHAT_ERROR_FRAME,
  });

  const text = await readAll(response);
  assert.ok(text.includes('"delta":"crlf-ok"'), `CRLF frame must be forwarded, got: ${text}`);
  assert.ok(!text.includes('"delta":"incomplete"'), "CRLF incomplete frame must be discarded");
  assert.ok(text.includes('"type":"stream_error"'), "terminal error frame must follow");
});

// CodeRabbit 18948 line 125: a zero-content fast-path failure must emit the
// caller's CONFIGURED errorFrame verbatim (not the generic partial frame).
test("fast-path zero-content failure emits the configured custom errorFrame", async () => {
  const customFrame = new TextEncoder().encode(
    'data: {"custom":"configured-frame","type":"stream_error"}\n\n'
  );
  const handler = Promise.resolve(zeroContentCrashResponse());

  const response = await withEarlyStreamKeepalive(handler, {
    thresholdMs: 0,
    intervalMs: 10_000,
    errorFrame: customFrame,
  });

  const text = await readAll(response);
  assert.ok(
    text.includes('"configured-frame"'),
    `zero-content failure must use the configured errorFrame, got: ${text}`
  );
});
