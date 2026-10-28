/**
 * A Responses stream has three terminal events: `response.completed`,
 * `response.incomplete` (e.g. `incomplete_details.reason: "max_output_tokens"`) and
 * `response.failed`. The disconnect-aware wrapper only recognized
 * `response.completed`, so a stream that ended correctly with `response.incomplete`
 * (seen live from Mistral /v1/responses when reasoning used up max_output_tokens) got a
 * synthetic `response.failed` "Upstream stream ended without a terminal marker"
 * appended after its real terminal — the client saw a finished turn turn into a failure.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { createDisconnectAwareStream, createStreamController } =
  await import("../../open-sse/utils/streamHandler.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

function noopAbortWritable(): { getWriter: () => { abort: () => Promise<void> } } {
  return { getWriter: () => ({ abort: () => Promise.resolve() }) };
}

async function runClientStream(frames: string[], format: string): Promise<string> {
  const encoder = new TextEncoder();
  const upstream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const frame of frames) controller.enqueue(encoder.encode(frame));
      controller.close();
    },
  });
  const sc = createStreamController({
    provider: "test",
    model: "test-model",
    clientResponseFormat: format,
  });
  const stream = createDisconnectAwareStream(
    { readable: upstream.pipeThrough(new TransformStream()), writable: noopAbortWritable() },
    sc
  );
  return new Response(stream).text();
}

function sse(type: string, payload: Record<string, unknown>) {
  return `event: ${type}\ndata: ${JSON.stringify({ type, ...payload })}\n\n`;
}

const contentFrames = [
  sse("response.created", { response: { id: "resp_1", status: "in_progress", output: [] } }),
  sse("response.output_text.delta", { item_id: "msg_1", output_index: 0, delta: "1, 2, 3" }),
];

test("response.incomplete is a terminal marker for Responses clients", async () => {
  const out = await runClientStream(
    [
      ...contentFrames,
      sse("response.incomplete", {
        response: {
          id: "resp_1",
          status: "incomplete",
          incomplete_details: { reason: "max_output_tokens" },
        },
      }),
    ],
    FORMATS.OPENAI_RESPONSES
  );
  assert.match(out, /event: response\.incomplete/);
  assert.doesNotMatch(out, /response\.failed/);
  assert.doesNotMatch(out, /without a terminal marker/);
});

test("Mistral's field order (type after response) is still recognized", async () => {
  // Mistral serializes `type` after the response object.
  const frame =
    "event: response.incomplete\n" +
    `data: ${JSON.stringify({ response: { id: "resp_1", status: "incomplete" }, type: "response.incomplete" })}\n\n`;
  const out = await runClientStream([...contentFrames, frame], FORMATS.OPENAI_RESPONSES);
  assert.doesNotMatch(out, /without a terminal marker/);
});

test("an upstream response.failed is not followed by a second synthetic failure", async () => {
  const out = await runClientStream(
    [
      ...contentFrames,
      sse("response.failed", {
        response: {
          id: "resp_1",
          status: "failed",
          error: { message: "boom", code: "server_error" },
        },
      }),
    ],
    FORMATS.OPENAI_RESPONSES
  );
  assert.equal(out.match(/"type":"response\.failed"/g)?.length, 1);
  assert.doesNotMatch(out, /without a terminal marker/);
});

test("a Responses stream with content but no terminal event is still reported as a drop", async () => {
  const out = await runClientStream(contentFrames, FORMATS.OPENAI_RESPONSES);
  assert.match(out, /Upstream stream ended without a terminal marker/);
});
