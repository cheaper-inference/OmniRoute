// NVIDIA NIM treats `reasoning` and `reasoning_content` on an assistant message
// as aliases for one field. A replayed turn that carries both is rejected as a
// duplicate field. Port of 9router ced0cf6e: keep `reasoning_content` only.
import { test } from "node:test";
import assert from "node:assert/strict";
import { stripUnsupportedParams } from "../../open-sse/translator/paramSupport.ts";

const MODEL = "deepseek-ai/deepseek-v4-pro";

test("nvidia: assistant turn with both reasoning fields keeps only reasoning_content", () => {
  const body = {
    model: MODEL,
    messages: [
      { role: "user", content: "hi" },
      { role: "assistant", content: "hello", reasoning: "think A", reasoning_content: "think A" },
    ],
  };
  stripUnsupportedParams("nvidia", MODEL, body);
  assert.deepEqual(body.messages[1], {
    role: "assistant",
    content: "hello",
    reasoning_content: "think A",
  });
  assert.deepEqual(body.messages[0], { role: "user", content: "hi" });
});

test("nvidia: reasoning alone moves to reasoning_content; empty reasoning_content is filled", () => {
  const body = {
    model: MODEL,
    messages: [
      { role: "assistant", content: "a", reasoning: "only alias" },
      { role: "assistant", content: "b", reasoning: "from alias", reasoning_content: "" },
    ],
  };
  stripUnsupportedParams("nvidia", MODEL, body);
  assert.deepEqual(body.messages[0], {
    role: "assistant",
    content: "a",
    reasoning_content: "only alias",
  });
  assert.deepEqual(body.messages[1], {
    role: "assistant",
    content: "b",
    reasoning_content: "from alias",
  });
});

test("other providers keep both reasoning fields (regression guard)", () => {
  const msg = { role: "assistant", content: "x", reasoning: "r", reasoning_content: "r" };
  const body = { model: MODEL, messages: [msg] };
  stripUnsupportedParams("deepseek", MODEL, body);
  assert.deepEqual(body.messages[0], msg);
});
