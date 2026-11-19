import test from "node:test";
import assert from "node:assert/strict";
import {
  peekCodexSseTransientError,
  filterNonstandardCodexSse,
} from "../../open-sse/executors/codex.ts";
import { inspectCodexSsePeek } from "../../open-sse/executors/codex/ssePeekFailure.ts";

function makeStreamResponse(bodyText: string, headers: Record<string, string> = {}): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(bodyText));
      controller.close();
    },
  });
  return new Response(stream, {
    status: 200,
    headers: new Headers(headers),
  });
}

test("inspectCodexSsePeek recognizes 'currently overloaded' error as transient capacity failure", () => {
  const sseChunk = [
    "event: response.failed",
    'data: {"type":"response.failed","response":{"id":null,"status":"failed","error":{"message":"Our servers are currently overloaded. Please try again later.","type":"server_error","code":"server_error"}}}',
    "",
    "",
  ].join("\n");

  const decision = inspectCodexSsePeek(sseChunk);
  assert.notEqual(decision, null);
  assert.equal(decision?.kind, "failure");
  if (decision?.kind === "failure") {
    assert.equal(decision.matched, "currently overloaded");
    assert.match(decision.message, /currently overloaded/i);
  }
});

test("peekCodexSseTransientError peeks when contentType is empty and assumeSse is true", async () => {
  const sseChunk = [
    "event: response.failed",
    'data: {"type":"response.failed","response":{"id":null,"status":"failed","error":{"message":"Our servers are currently overloaded. Please try again later.","type":"server_error","code":"server_error"}}}',
    "",
    "",
  ].join("\n");

  // No content-type header (chatgpt.com upstream behavior on streaming responses)
  const resp = makeStreamResponse(sseChunk, {});
  const peek = await peekCodexSseTransientError(resp, 500, true);

  assert.equal(peek.matched, "currently overloaded");
  assert.match(peek.message || "", /currently overloaded/i);
});

test("peekCodexSseTransientError skips when contentType is empty and assumeSse is false (#7536 guard)", async () => {
  const sseChunk = [
    "event: response.failed",
    'data: {"type":"response.failed","response":{"id":null,"status":"failed","error":{"message":"Our servers are currently overloaded.","type":"server_error","code":"server_error"}}}',
    "",
    "",
  ].join("\n");

  const resp = makeStreamResponse(sseChunk, {});
  const peek = await peekCodexSseTransientError(resp, 500, false);

  assert.equal(peek.matched, null);
  assert.equal(peek.message, null);
});

test("filterNonstandardCodexSse strips codex.* blocks when contentType is empty and assumeSse is true", async () => {
  const sseStream = [
    "event: codex.rate_limits",
    'data: {"limit":100}',
    "",
    "event: response.output_text.delta",
    'data: {"type":"response.output_text.delta","delta":"Hello"}',
    "",
    "",
  ].join("\n");

  const resp = makeStreamResponse(sseStream, {});
  const filtered = filterNonstandardCodexSse(resp, true);
  const text = await filtered.text();

  assert.equal(text.includes("codex.rate_limits"), false);
  assert.equal(text.includes("Hello"), true);
});
