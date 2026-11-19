import test from "node:test";
import assert from "node:assert/strict";

const { extractImageGenToolUsage } = await import("../../open-sse/handlers/imageGeneration.ts");

function completedEvent(toolUsage: unknown): string {
  const evt = {
    type: "response.completed",
    response: { id: "resp_test", object: "response", tool_usage: toolUsage },
  };
  return `event: response.completed\ndata: ${JSON.stringify(evt)}\n\n`;
}

test("codex image: response.completed tool_usage.image_gen is reported as call-log usage", () => {
  const sse = completedEvent({
    image_gen: {
      input_tokens: 12,
      input_tokens_details: { image_tokens: 0, text_tokens: 12 },
      output_tokens: 1056,
      output_tokens_details: { image_tokens: 1056, text_tokens: 0 },
    },
  });

  const usage = extractImageGenToolUsage(sse);

  assert.ok(usage, "a non-zero image_gen block must be returned");
  assert.equal(usage?.input_tokens, 12);
  assert.equal(usage?.output_tokens, 1056);
  assert.equal(usage?.output_tokens_details?.image_tokens, 1056);
});

test("codex image: a zero or missing image_gen block is ignored", () => {
  const zero = completedEvent({
    image_gen: {
      input_tokens: 0,
      input_tokens_details: { image_tokens: 0, text_tokens: 0 },
      output_tokens: 0,
      output_tokens_details: { image_tokens: 0, text_tokens: 0 },
    },
  });
  assert.equal(extractImageGenToolUsage(zero), null);
  assert.equal(extractImageGenToolUsage(completedEvent(undefined)), null);
  assert.equal(extractImageGenToolUsage("data: [DONE]\n\n"), null);
});
