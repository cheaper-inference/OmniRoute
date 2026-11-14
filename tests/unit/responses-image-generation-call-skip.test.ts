import { test } from "node:test";
import assert from "node:assert/strict";
import { translateRequest } from "../../open-sse/translator/index.js";

// Codex replays `image_generation_call` items in the next turn's input after the model made an
// image. Like tool_search_call and web_search_call (see responses-tool-search-call-skip.test.ts),
// the item is Responses-only output metadata with no Chat Completions form. Skipping it keeps the
// follow-up turn alive. Every other unrepresentable item type must still be rejected with a 400.
function translate(input: unknown[]) {
  return translateRequest(
    "openai-responses",
    "openai",
    "test-model",
    { input, stream: false },
    false
  );
}

test("image_generation_call input item is skipped, not a 400", () => {
  const result = translate([
    { type: "message", role: "user", content: [{ type: "input_text", text: "Draw a cat" }] },
    { type: "image_generation_call", id: "ig_1", status: "completed", result: "Zml4dHVyZQ==" },
    { type: "message", role: "user", content: [{ type: "input_text", text: "Now make it blue" }] },
  ]) as { messages?: Array<{ role?: string }> };
  assert.deepEqual(
    result.messages?.map((m) => m.role),
    ["user", "user"]
  );
});

test("the image payload is not forwarded to the Chat request", () => {
  const result = translate([
    { type: "message", role: "user", content: [{ type: "input_text", text: "Draw" }] },
    {
      type: "image_generation_call",
      id: "ig_2",
      status: "completed",
      result: "UNIQUE_B64_PAYLOAD",
    },
  ]);
  assert.equal(JSON.stringify(result).includes("UNIQUE_B64_PAYLOAD"), false);
});

test("other unrepresentable input items are still rejected", () => {
  for (const item of [
    { type: "item_reference", id: "item_123" },
    { type: "mcp_call", name: "remote", arguments: "{}" },
    { type: "computer_call_output", call_id: "call_1", output: {} },
  ]) {
    assert.throws(
      () => translate([item]),
      (error: unknown) =>
        error instanceof Error &&
        (error as Error & { errorType?: string }).errorType === "unsupported_feature"
    );
  }
});
