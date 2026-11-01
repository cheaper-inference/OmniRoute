import test from "node:test";
import assert from "node:assert/strict";

import { validateResponsesToolHistory } from "../../open-sse/translator/helpers/responsesToolHistory.ts";

type Item = Record<string, unknown>;

function validate(input: Item[], previous_response_id?: string): void {
  validateResponsesToolHistory({ input, previous_response_id });
}

function functionCall(call_id: unknown, name = "lookup"): Item {
  return { type: "function_call", call_id, name, arguments: "{}" };
}

function customCall(call_id: unknown, input = "raw text; not JSON"): Item {
  return { type: "custom_tool_call", call_id, name: "apply_patch", input };
}

function functionOutput(call_id: unknown): Item {
  return { type: "function_call_output", call_id, output: "ok" };
}

function customOutput(call_id: unknown): Item {
  return { type: "custom_tool_call_output", call_id, output: "ok" };
}

for (const id of ["", "   ", null, 42]) {
  test(`rejects malformed call_id ${JSON.stringify(id)}`, () => {
    assert.throws(
      () => validate([functionCall(id), functionOutput(id)]),
      /valid non-blank call_id/i
    );
  });
}

test("rejects duplicate calls", () => {
  assert.throws(
    () => validate([functionCall("same"), customCall("same"), functionOutput("same")]),
    /duplicate tool call/i
  );
});

test("rejects duplicate outputs", () => {
  assert.throws(
    () => validate([functionCall("same"), functionOutput("same"), functionOutput("same")]),
    /duplicate tool output/i
  );
});

test("rejects output with the wrong tool type", () => {
  assert.throws(
    () => validate([customCall("custom-1"), functionOutput("custom-1")]),
    /does not match the tool call type/i
  );
});

test("matches call_id by exact wire bytes without trimming", () => {
  assert.throws(
    () => validate([functionCall(" call-1"), functionOutput("call-1 ")]),
    /does not match a local tool call/i
  );
});

test("rejects a local output that precedes its call", () => {
  assert.throws(
    () => validate([functionOutput("later"), functionCall("later")]),
    /must follow its local tool call/i
  );
});

test("rejects orphaned and missing custom-tool halves", () => {
  assert.throws(() => validate([customOutput("orphan")]), /does not match a local tool call/i);
  assert.throws(() => validate([customCall("missing")]), /missing its output/i);
});

test("accepts arbitrary custom-tool input text", () => {
  assert.doesNotThrow(() =>
    validate([
      customCall("custom-raw", "*** Begin Patch\nnot JSON\n*** End Patch"),
      customOutput("custom-raw"),
    ])
  );
});

test("accepts a continuation output whose call is owned by previous_response_id", () => {
  assert.doesNotThrow(() => validate([customOutput("remote-call")], "resp_previous"));
});

test("accepts parallel calls followed by interleaved matching outputs", () => {
  assert.doesNotThrow(() =>
    validate([
      functionCall("function-a"),
      customCall("custom-b"),
      functionCall("function-c"),
      functionOutput("function-c"),
      functionOutput("function-a"),
      customOutput("custom-b"),
    ])
  );
});
