/**
 * Regression test for #20257:
 * Responses API stream: response.output_text.delta must always carry `item_id`
 * (plus `output_index` and `content_index`), otherwise strict schema parsers
 * (like Zed's open_ai::responses Rust deserializer) fail with:
 * "Failed to parse OpenAI responses stream event: missing field `item_id`"
 */

import test from "node:test";
import assert from "node:assert/strict";
import { createTempDataDir } from "../_setup/tempDataDir.ts";

// The PII transform resolves its mode through feature-flag overrides, which open the DB
// singleton: isolate DATA_DIR before the imports and close the handle afterwards.
const { cleanup } = createTempDataDir("omniroute-responses-delta-item-id-");
test.after(cleanup);

const { createCredentialSseTransform } =
  await import("../../src/lib/streamingCredentialTransform.ts");
const { createPiiSseTransform } = await import("../../src/lib/streamingPiiTransform.ts");
const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { createRecoverableStream, TruncatedStreamError } =
  await import("../../open-sse/services/streamRecovery.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

type SseEvent = Record<string, unknown>;

async function runStream(transforms: TransformStream[], events: SseEvent[]): Promise<SseEvent[]> {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let stream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const ev of events) {
        controller.enqueue(encoder.encode(`event: ${ev.type}\ndata: ${JSON.stringify(ev)}\n\n`));
      }
      controller.close();
    },
  });

  for (const t of transforms) {
    stream = stream.pipeThrough(t);
  }

  const reader = stream.getReader();
  let buffer = "";
  const parsedEvents: SseEvent[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n\n");
    buffer = lines.pop() ?? "";
    for (const chunk of lines) {
      for (const line of chunk.split("\n")) {
        if (line.startsWith("data: ")) {
          const payload = line.slice(6).trim();
          if (payload && payload !== "[DONE]") {
            parsedEvents.push(JSON.parse(payload));
          }
        }
      }
    }
  }

  return parsedEvents;
}

test("Responses stream: output_text.delta preserves or infers item_id from output_item.added", async () => {
  const inputEvents: SseEvent[] = [
    {
      type: "response.created",
      response: { id: "resp_test_1", status: "in_progress", output: [] },
    },
    {
      type: "response.output_item.added",
      output_index: 0,
      item: { id: "msg_custom_zed_id", type: "message", status: "in_progress", content: [] },
    },
    {
      type: "response.content_part.added",
      item_id: "msg_custom_zed_id",
      output_index: 0,
      content_index: 0,
      part: { type: "output_text", text: "" },
    },
    // Delta emitted without item_id (e.g. from upstream or tool call recovery)
    {
      type: "response.output_text.delta",
      output_index: 0,
      delta: "Hello Zed!",
    },
    {
      type: "response.output_text.done",
      item_id: "msg_custom_zed_id",
      output_index: 0,
      content_index: 0,
      text: "Hello Zed!",
    },
    {
      type: "response.completed",
      response: { id: "resp_test_1", status: "completed", output: [] },
    },
  ];

  const results = await runStream([createCredentialSseTransform()], inputEvents);

  const textDeltas = results.filter((e) => e.type === "response.output_text.delta");
  assert.ok(textDeltas.length > 0, "must emit at least one output_text.delta");

  for (const delta of textDeltas) {
    assert.ok(
      typeof delta.item_id === "string" && delta.item_id.length > 0,
      `output_text.delta must have non-empty item_id, got: ${JSON.stringify(delta)}`
    );
    assert.equal(
      delta.item_id,
      "msg_custom_zed_id",
      "must associate with msg_custom_zed_id learned from output_item.added"
    );
    assert.equal(typeof delta.output_index, "number", "must have numeric output_index");
    assert.equal(typeof delta.content_index, "number", "must have numeric content_index");
  }
});

test("Responses stream: flushed residual output_text.delta has item_id and content_index", async () => {
  const inputEvents: SseEvent[] = [
    {
      type: "response.output_item.done",
      output_index: 0,
      item: { id: "msg_finish_item", type: "message" },
    },
    {
      type: "response.completed",
      response: { id: "resp_test_2", status: "completed", output: [] },
    },
  ];

  const results = await runStream([createCredentialSseTransform()], inputEvents);
  for (const ev of results) {
    if (ev.type === "response.output_text.delta") {
      assert.ok(
        typeof ev.item_id === "string" && ev.item_id.length > 0,
        `flushed output_text.delta must carry item_id: ${JSON.stringify(ev)}`
      );
      assert.equal(typeof ev.content_index, "number", "must have numeric content_index");
    }
  }
});

test("PII transform: response.output_text.delta always includes item_id", async () => {
  const inputEvents: SseEvent[] = [
    {
      type: "response.output_item.added",
      output_index: 0,
      item: { id: "msg_pii_123", type: "message", content: [] },
    },
    {
      type: "response.output_text.delta",
      output_index: 0,
      delta: "contact support@example.com for help",
    },
    {
      type: "response.output_text.done",
      item_id: "msg_pii_123",
      output_index: 0,
      text: "contact support@example.com for help",
    },
  ];

  const results = await runStream([createPiiSseTransform()], inputEvents);
  const textDeltas = results.filter((e) => e.type === "response.output_text.delta");
  assert.ok(textDeltas.length > 0);

  for (const delta of textDeltas) {
    assert.ok(
      typeof delta.item_id === "string" && delta.item_id.length > 0,
      `PII transformed delta must carry item_id: ${JSON.stringify(delta)}`
    );
    assert.equal(delta.item_id, "msg_pii_123");
  }
});

function dataEvents(sse: string): SseEvent[] {
  return sse
    .split("\n")
    .filter((line) => line.startsWith("data: ") && line.slice(6).trim() !== "[DONE]")
    .map((line) => JSON.parse(line.slice(6)) as SseEvent);
}

function sseSource(chunks: string[], cut = false): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  let i = 0;
  return new ReadableStream<Uint8Array>({
    pull(controller) {
      if (i < chunks.length) controller.enqueue(encoder.encode(chunks[i++]));
      else if (cut) controller.error(new TruncatedStreamError());
      else controller.close();
    },
  });
}

test("passthrough flush of a buffered textual tool-call keeps the source part identity", async () => {
  const partial = {
    type: "response.output_text.delta",
    item_id: "msg_real",
    output_index: 1,
    content_index: 2,
    delta: '[Tool call: terminal]\nArguments: {"command":"ls',
  };
  const source = sseSource([`data: ${JSON.stringify(partial)}\n\n`]);
  const out = await new Response(
    source.pipeThrough(
      createSSEStream({
        mode: "passthrough",
        sourceFormat: FORMATS.OPENAI_RESPONSES,
        clientResponseFormat: FORMATS.OPENAI_RESPONSES,
        provider: "openai",
        model: "gpt-test",
        body: {
          input: "run ls",
          tools: [{ type: "function", name: "terminal", parameters: { type: "object" } }],
        },
      })
    )
  ).text();

  const flushed = dataEvents(out).find(
    (e) =>
      e.type === "response.output_text.delta" &&
      typeof e.delta === "string" &&
      e.delta.includes("[Tool call: terminal]")
  );
  assert.ok(flushed, `buffered text must be flushed at EOF: ${out}`);
  assert.equal(flushed.item_id, "msg_real");
  assert.equal(flushed.output_index, 1);
  assert.equal(flushed.content_index, 2);
});

test("recovery suffix extends the open upstream text part instead of msg_0", async () => {
  const delta = (text: string) =>
    `data: ${JSON.stringify({
      type: "response.output_text.delta",
      item_id: "msg_provider_abc",
      output_index: 1,
      content_index: 0,
      delta: text,
    })}\n\n`;
  let t = 0;
  const stream = createRecoverableStream(
    sseSource([delta("Hello there world")], true),
    async () => null,
    {
      finalize: () => {},
      now: () => (t += 1000),
      continueStream: async () =>
        sseSource([
          delta("there world, nice to meet you!") +
            `data: ${JSON.stringify({ type: "response.completed", response: { status: "completed", output: [] } })}\n\n`,
        ]),
    }
  );
  const out = await new Response(stream).text();

  const suffix = dataEvents(out).find(
    (e) =>
      e.type === "response.output_text.delta" &&
      typeof e.delta === "string" &&
      e.delta.includes("nice to meet you")
  );
  assert.ok(suffix, `stitched suffix must be emitted: ${out}`);
  assert.equal(suffix.item_id, "msg_provider_abc");
  assert.equal(suffix.output_index, 1);
  assert.equal(suffix.content_index, 0);
});
