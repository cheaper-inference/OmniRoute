import assert from "node:assert/strict";
import test from "node:test";
import { createSSEStream } from "../../open-sse/utils/stream.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { isEstimatedUsage, type UsageLike } from "../../open-sse/utils/usageTracking.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

test.after(() => resetDbInstance());

async function translate(events: unknown[], tail = "\n\n", body: unknown = null) {
  let receipt: UsageLike | undefined;
  const stream = createSSEStream({
    mode: "translate",
    targetFormat: FORMATS.CLAUDE,
    sourceFormat: FORMATS.OPENAI,
    provider: "anthropic",
    model: "accounting-fixture",
    body,
    onComplete(result) {
      receipt = result.usage as UsageLike;
    },
  });
  const raw = events.map((event) => `data: ${JSON.stringify(event)}`).join("\n\n") + tail;
  const wire = await new Response(new Response(raw).body!.pipeThrough(stream)).text();
  assert.ok(receipt, "completion must carry an accounting receipt");
  return { receipt, wire };
}

function events(usage?: UsageLike): unknown[] {
  return [
    {
      type: "message_start",
      message: {
        id: "msg_accounting",
        role: "assistant",
        model: "accounting-fixture",
        content: [],
        ...(usage ? { usage } : {}),
      },
    },
    { type: "content_block_start", index: 0, content_block: { type: "text", text: "" } },
    { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: "answer" } },
    { type: "content_block_stop", index: 0 },
  ];
}

for (const tail of ["", "\n", "\n\n"]) {
  test(`raw cumulative usage survives a final native usage event with tail ${JSON.stringify(tail)}`, async () => {
    const input = events({
      input_tokens: 5,
      cache_read_input_tokens: 3,
      cache_creation_input_tokens: 2,
      output_tokens: 1,
    });
    input.push({
      type: "message_delta",
      delta: { stop_reason: "end_turn" },
      usage: { output_tokens: 4 },
    });
    const { receipt } = await translate(input, tail);
    assert.equal(receipt.prompt_tokens, 10);
    assert.equal(receipt.completion_tokens, 4);
    assert.equal(receipt.total_tokens, 14);
    assert.equal(receipt.cache_read_input_tokens, 3);
    assert.equal(receipt.cache_creation_input_tokens, 2);
    assert.equal(isEstimatedUsage(receipt), false);
  });
}

test("a later explicit zero replaces the previous cumulative counter", async () => {
  const input = events({ input_tokens: 5, output_tokens: 7 });
  input.push({
    type: "message_delta",
    delta: { stop_reason: "end_turn" },
    usage: { output_tokens: 0 },
  });
  const { receipt } = await translate(input);
  assert.equal(receipt.prompt_tokens, 5);
  assert.equal(receipt.completion_tokens, 0);
  assert.equal(isEstimatedUsage(receipt), false);
});

test("normalization without any raw receipt cannot become provider-reported usage", async () => {
  const input = events();
  input.push({ type: "message_delta", delta: { stop_reason: "end_turn" } });
  const { receipt } = await translate(input, "\n\n", {
    messages: [{ role: "user", content: "a real request body" }],
  });
  assert.equal(isEstimatedUsage(receipt), true);
});
