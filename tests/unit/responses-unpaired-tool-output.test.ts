import { test } from "node:test";
import assert from "node:assert/strict";
import { translateRequest } from "../../open-sse/translator/index.js";

// A tool output with no call id can never be matched to a call. The Chat -> Responses default
// (repairing) mode already drops an output whose id matches no call; it must do the same for a blank
// id instead of sending `function_call_output` with `call_id: ""`. In the other direction a
// `custom_tool_call` with a blank id is skipped, as `function_call` already is (#2893), instead of
// being re-paired with a made-up id and an empty result. Strict mode already refuses a blank id.
type Item = Record<string, unknown>;

function toResponses(messages: Item[]): Item[] {
  const body = { model: "gpt-5", messages, stream: false };
  const out = translateRequest("openai", "openai-responses", "gpt-5", body, false) as {
    input: Item[];
  };
  return out.input;
}

function toChat(input: Item[]): Item[] {
  const body = { model: "gpt-5", input, stream: false };
  const out = translateRequest("openai-responses", "openai", "gpt-5", body, false) as {
    messages: Item[];
  };
  return out.messages;
}

const user = { role: "user", content: "hi" };
const call = (id: string) => ({
  role: "assistant",
  content: null,
  tool_calls: [{ id, type: "function", function: { name: "lookup", arguments: "{}" } }],
});

test("Chat -> Responses: a tool message with no tool_call_id is not sent as call_id ''", () => {
  const input = toResponses([user, { role: "tool", content: "orphan output text" }]);
  const outputs = input.filter((item) => item.type === "function_call_output");
  assert.deepEqual(
    outputs.map((item) => item.call_id),
    []
  );
});

test("Chat -> Responses: a blank tool_call_id next to a valid pair is dropped, the pair stays", () => {
  const input = toResponses([
    user,
    call("call_1"),
    { role: "tool", tool_call_id: "call_1", content: "paired" },
    { role: "tool", tool_call_id: "   ", content: "orphan output text" },
  ]);
  const outputs = input.filter((item) => item.type === "function_call_output");
  assert.deepEqual(
    outputs.map((item) => [item.call_id, item.output]),
    [["call_1", "paired"]]
  );
});

test("Chat -> Responses: strict mode still refuses a blank tool_call_id", () => {
  const flag = "OMNIROUTE_RESPONSES_STRICT_TOOL_HISTORY";
  const original = process.env[flag];
  process.env[flag] = "true";
  try {
    assert.throws(() => toResponses([user, { role: "tool", content: "orphan" }]), /call_id/i);
  } finally {
    if (original === undefined) delete process.env[flag];
    else process.env[flag] = original;
  }
});

test("Responses -> Chat: a custom_tool_call with a blank call_id is skipped with its output", () => {
  const messages = toChat([
    { type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] },
    { type: "custom_tool_call", call_id: "", name: "apply_patch", input: "x" },
    { type: "custom_tool_call_output", call_id: "", output: "patched text" },
  ]);
  assert.deepEqual(
    messages.map((m) => m.role),
    ["user"]
  );
});

test("Responses -> Chat: a custom_tool_call with a call_id is untouched", () => {
  const messages = toChat([
    { type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] },
    { type: "custom_tool_call", call_id: "call_patch", name: "apply_patch", input: "x" },
    { type: "custom_tool_call_output", call_id: "call_patch", output: "patched text" },
  ]);
  assert.deepEqual(
    messages.map((m) => [m.role, m.tool_call_id ?? null, m.content === "patched text"]),
    [
      ["user", null, false],
      ["assistant", null, false],
      ["tool", "call_patch", true],
    ]
  );
});
