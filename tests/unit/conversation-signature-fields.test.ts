// Fields outside role/content that change the meaning of a tool conversation. The signature keeps the
// tool-call fields that are present, the item type unless it is a plain `message`, and nothing else,
// so two items that only differ in role or content text keep the same signature fields.
import { test } from "node:test";
import assert from "node:assert/strict";

import { conversationSignatureFields } from "../../open-sse/utils/conversationSignatureFields.ts";

test("anything that is not a plain object has no signature fields", () => {
  for (const value of [null, undefined, "text", 42, true, [], [{ name: "x" }]]) {
    assert.deepEqual(conversationSignatureFields(value), {}, String(value));
  }
});

test("a plain chat message keeps no field of its own", () => {
  assert.deepEqual(conversationSignatureFields({ role: "user", content: "hi" }), {});
});

test("each tool field that is present is kept, with its value", () => {
  const item = {
    role: "assistant",
    content: null,
    tool_calls: [{ id: "call_1" }],
    function_call: { name: "f" },
    tool_call_id: "call_1",
    call_id: "c1",
    name: "lookup",
    arguments: '{"q":1}',
    output: "ok",
  };
  assert.deepEqual(conversationSignatureFields(item), {
    tool_calls: [{ id: "call_1" }],
    function_call: { name: "f" },
    tool_call_id: "call_1",
    call_id: "c1",
    name: "lookup",
    arguments: '{"q":1}',
    output: "ok",
  });
});

test("a tool field set to null is kept, an undefined one is dropped", () => {
  assert.deepEqual(conversationSignatureFields({ output: null, name: undefined }), {
    output: null,
  });
});

test("the type is kept unless it is message or not a string", () => {
  assert.deepEqual(conversationSignatureFields({ type: "function_call", call_id: "c1" }), {
    call_id: "c1",
    type: "function_call",
  });
  assert.deepEqual(conversationSignatureFields({ type: "message", role: "user" }), {});
  assert.deepEqual(conversationSignatureFields({ type: 3, role: "user" }), {});
});

test("role and content never enter the signature fields", () => {
  const fields = conversationSignatureFields({ role: "tool", content: "x", name: "n" });
  assert.deepEqual(Object.keys(fields), ["name"]);
});
