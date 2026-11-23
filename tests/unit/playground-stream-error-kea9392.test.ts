// KEA-9392 — Playground: Send spins, then shows neither a reply nor an error.
//
// The server does NOT lose the failure: once `withEarlyStreamKeepalive` has committed the
// response to `200 text/event-stream` (the handler outlived the keepalive threshold), a
// handler failure can only travel in-band, as a `data: {"error":{…}}` frame. These tests pin
// that contract with the real wrapper and assert that the Playground's frame reader
// (`readStreamError`) recognises every in-band failure shape the engine emits.
import assert from "node:assert/strict";
import test from "node:test";

const { withEarlyStreamKeepalive, OPENAI_CHAT_ERROR_FRAME, OPENAI_KEEPALIVE_FRAME } =
  await import("../../open-sse/utils/earlyStreamKeepalive.ts");
const { errorResponse } = await import("../../open-sse/utils/error.ts");
const { formatTranslatedStreamError } = await import("../../open-sse/utils/streamErrorFormat.ts");
const { resolveKeepaliveThreshold } = await import("../../open-sse/utils/keepaliveThreshold.ts");
const { readStreamError } =
  await import("../../src/app/(dashboard)/dashboard/playground/components/tabs/chatTabEndpointRequest.ts");

/** The `data:` payloads of an SSE body, parsed, in order (`[DONE]` and comments skipped). */
function dataPayloads(body: string): unknown[] {
  return body
    .split("\n")
    .filter((line) => line.startsWith("data: ") && line !== "data: [DONE]")
    .map((line) => JSON.parse(line.slice(6)));
}

function delay<T>(ms: number, value: () => T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value()), ms));
}

test("a handler that fails after the keepalive threshold is answered 200 with the error in-band", async () => {
  const handler = delay(60, () => errorResponse(503, "No active credentials for provider: demo"));
  const response = await withEarlyStreamKeepalive(handler, {
    thresholdMs: 10,
    intervalMs: 250,
    keepaliveFrame: OPENAI_KEEPALIVE_FRAME,
    startupFrame: OPENAI_KEEPALIVE_FRAME,
    errorFrame: OPENAI_CHAT_ERROR_FRAME,
    slowPathDeadlineMs: 0,
  });

  // This is why the browser's network panel shows no 4xx/5xx for the failed Send.
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /text\/event-stream/);

  const payloads = dataPayloads(await response.text());
  const errors = payloads.map(readStreamError).filter((entry) => entry !== null);
  assert.equal(errors.length, 1, "exactly one frame of the stream carries the failure");
  assert.equal(errors[0]?.message, "No active credentials for provider: demo");
  // Keepalive frames are not failures.
  assert.equal(readStreamError(payloads[0]), null);
});

test("a handler that rejects after the threshold still yields a readable in-band error", async () => {
  const handler = new Promise<Response>((_resolve, reject) => {
    setTimeout(() => reject(new Error("boom")), 60);
  });
  const response = await withEarlyStreamKeepalive(handler, {
    thresholdMs: 10,
    intervalMs: 250,
    keepaliveFrame: OPENAI_KEEPALIVE_FRAME,
    startupFrame: OPENAI_KEEPALIVE_FRAME,
    errorFrame: OPENAI_CHAT_ERROR_FRAME,
    slowPathDeadlineMs: 0,
  });
  assert.equal(response.status, 200);
  const errors = dataPayloads(await response.text())
    .map(readStreamError)
    .filter((entry) => entry !== null);
  assert.equal(errors.length, 1);
  assert.equal(errors[0]?.message, "Upstream stream failed before completion.");
});

test("mid-stream failures framed by the engine are recognised (chat and responses formats)", () => {
  const chat = dataPayloads(formatTranslatedStreamError({ status: 502, message: "upstream died" }));
  assert.equal(readStreamError(chat[0])?.message, "upstream died");

  const responses = dataPayloads(
    formatTranslatedStreamError({ status: 502, message: "upstream died" }, "openai-responses")
  );
  assert.equal(readStreamError(responses[0])?.message, "upstream died");
});

test("readStreamError reads every in-band failure shape and ignores ordinary chunks", () => {
  assert.deepEqual(readStreamError({ error: { message: "nope", type: "server_error" } }), {
    message: "nope",
  });
  assert.deepEqual(readStreamError({ error: "plain text failure" }), {
    message: "plain text failure",
  });
  // Responses API `error` event (earlyStreamKeepalive's responses framing).
  assert.deepEqual(
    readStreamError({ type: "error", message: "top-level", error: { message: "nested" } }),
    { message: "nested" }
  );
  assert.deepEqual(readStreamError({ type: "error", message: "top-level only" }), {
    message: "top-level only",
  });
  assert.deepEqual(
    readStreamError({ type: "response.failed", response: { error: { message: "failed turn" } } }),
    { message: "failed turn" }
  );
  // A failure with no usable text is still a failure: the caller supplies the wording.
  assert.deepEqual(readStreamError({ error: {} }), { message: null });
  assert.deepEqual(readStreamError({ type: "response.failed", response: {} }), { message: null });

  assert.equal(readStreamError({ choices: [{ delta: { content: "hi" } }] }), null);
  assert.equal(readStreamError({ choices: [], model: "keepalive" }), null);
  assert.equal(readStreamError({ type: "response.output_text.delta", delta: "hi" }), null);
  assert.equal(readStreamError({ error: null, choices: [] }), null);
  assert.equal(readStreamError(null), null);
  assert.equal(readStreamError("data"), null);
});

test("keyless providers commit to the 200 stream only after 15 s; keyed ones after 1 s", () => {
  // Explains the long silent wait: for a keyless (no-auth) model the route holds the HTTP
  // status for 15 s, so a handler that fails later than that can no longer answer 4xx/5xx.
  assert.equal(resolveKeepaliveThreshold("openai/gpt-4o"), 1_000);
  assert.equal(resolveKeepaliveThreshold("aihorde/any-model"), 15_000);
});
