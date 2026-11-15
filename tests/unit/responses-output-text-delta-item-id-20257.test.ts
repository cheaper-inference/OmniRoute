/**
 * Regression test for #20257:
 * Responses API stream: response.output_text.delta must always carry `item_id`
 * (plus `output_index` and `content_index`), otherwise strict schema parsers
 * (like Zed's open_ai::responses Rust deserializer) fail with:
 * "Failed to parse OpenAI responses stream event: missing field `item_id`"
 */

import test from "node:test";
import assert from "node:assert/strict";
import { createCredentialSseTransform } from "../../src/lib/streamingCredentialTransform.ts";
import { createPiiSseTransform } from "../../src/lib/streamingPiiTransform.ts";

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
