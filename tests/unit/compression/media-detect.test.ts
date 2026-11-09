import { test } from "node:test";
import assert from "node:assert/strict";
import { hasMediaBlocks } from "../../../open-sse/services/compression/mediaDetect.ts";

test("hasMediaBlocks returns false for non-object and media-free bodies", () => {
  assert.equal(hasMediaBlocks(null), false);
  assert.equal(hasMediaBlocks("image"), false);
  assert.equal(hasMediaBlocks({ input: "describe an image" }), false);
  assert.equal(
    hasMediaBlocks({ messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }] }),
    false
  );
});

test("hasMediaBlocks finds media in a Responses function_call_output", () => {
  const body = {
    input: [
      {
        type: "function_call_output",
        call_id: "c1",
        output: [{ type: "input_image", image_url: "data:image/png;base64,AA" }],
      },
    ],
  };
  assert.equal(hasMediaBlocks(body), true);
});

test("hasMediaBlocks finds snake_case Gemini inline_data parts", () => {
  const body = { contents: [{ role: "user", parts: [{ inline_data: { data: "AA" } }] }] };
  assert.equal(hasMediaBlocks(body), true);
});

test("hasMediaBlocks ignores tool schemas and tool_use input", () => {
  const body = {
    tools: [{ name: "x", input_schema: { properties: { image: { type: "image" } } } }],
    messages: [
      {
        role: "assistant",
        content: [{ type: "tool_use", id: "t1", name: "x", input: { type: "image" } }],
      },
    ],
  };
  assert.equal(hasMediaBlocks(body), false);
});
