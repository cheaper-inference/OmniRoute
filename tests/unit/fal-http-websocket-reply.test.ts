import test from "node:test";
import assert from "node:assert/strict";
import { FalHttpWebsocketReply } from "../../open-sse/handlers/fal/httpWebsocketReply.ts";
import { mergeFalEvent, type FalStreamState } from "../../open-sse/handlers/fal/events.ts";

test("HTTP WebSocket SSE completion preserves model snapshots, reasoning and artifacts", () => {
  let state: FalStreamState = { artifacts: [], events: [] };
  let completed = 0;
  const reply = new FalHttpWebsocketReply(
    (event, data) => {
      state = mergeFalEvent(state, { event, data });
    },
    () => {
      throw new Error("Unexpected binary artifact");
    },
    () => {
      completed++;
    }
  );
  const frame = (value: unknown) => reply.consume(Buffer.from(JSON.stringify(value)), false);
  const outputs = ["é cube", "", 0, false, null, { answer: "structured" }];
  for (const [index, output] of outputs.entries()) {
    reply.pending = true;
    frame({
      type: "start",
      request_id: String(index),
      status: 200,
      headers: { "Content-Type": "text/event-stream; charset=utf-8" },
    });
    const native = { partial: false, output, reasoning: "native reasoning" };
    const sse =
      'event: progress\ndata: {"partial":true,"output":"é","image":{"url":"https://example.com/image.png"}}\n\n' +
      `event: final\ndata: ${JSON.stringify(native)}\n\ndata: [DONE]\n\n`;
    for (const byte of new TextEncoder().encode(sse)) reply.consume(Buffer.from([byte]), true);
    frame({ type: "end", request_id: String(index), status: 200, time_to_first_byte_seconds: 0.1 });
    assert.deepEqual(state.final, output);
    assert.equal(state.partial, "é");
    assert.equal(state.reasoning, "native reasoning");
    assert.equal(state.artifacts[0].url, "https://example.com/image.png");
    assert.equal(state.events.at(-1)?.event, "http-end");
    assert.equal((state.events.at(-1)?.data as { http: { status: number } }).http.status, 200);
    assert.equal(reply.pending, false);
    assert.equal(completed, index + 1);
  }
});

test("HTTP WebSocket SSE transport status never manufactures or overwrites a model final", () => {
  for (const failed of [false, true]) {
    let state: FalStreamState = { artifacts: [], events: [] };
    let completed = 0;
    const reply = new FalHttpWebsocketReply(
      (event, data) => {
        state = mergeFalEvent(state, { event, data });
      },
      () => "unused",
      () => {
        completed++;
      }
    );
    const frame = (value: unknown) => reply.consume(Buffer.from(JSON.stringify(value)), false);
    reply.pending = true;
    frame({
      type: "start",
      request_id: "request",
      status: 200,
      headers: { "content-type": "text/event-stream" },
    });
    if (failed)
      reply.consume(Buffer.from('event: final\ndata: {"output":"model answer"}\n\n'), true);
    frame({ type: "end", request_id: "request", status: failed ? 500 : 200 });
    assert.equal(state.final, failed ? "model answer" : undefined);
    assert.equal(state.error, failed ? "Fal upstream HTTP response failed" : undefined);
    assert.equal(state.events.at(-1)?.event, failed ? "error" : "http-end");
    assert.equal(completed, 1);
    assert.equal(reply.pending, false);
  }
});
