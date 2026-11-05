import test from "node:test";
import assert from "node:assert/strict";

import { CodexExecutor } from "../../open-sse/executors/codex.ts";
import { copyCodexRequestForMutation } from "../../open-sse/executors/codex/requestCopy.ts";

test("Codex copy boundary shares untouched history but isolates mutable tool definitions", () => {
  const history = [{ type: "message", role: "system", content: [{ type: "input_text", text: "x".repeat(1024) }] }];
  // A deep clone would visit this property and throw; the copy must leave input untouched.
  Object.defineProperty(history[0], "expensive", {
    enumerable: true,
    get() {
      throw new Error("Codex copy must not traverse input history");
    },
  });
  const source = {
    model: "gpt-6.1-sol",
    input: history,
    tools: [{ type: "function", name: "say_hello", parameters: { type: "object", properties: {} } }],
    reasoning: { effort: "high" },
    tool_choice: { type: "function", name: "say_hello" },
  };
  const copied = copyCodexRequestForMutation(source);
  assert.notStrictEqual(copied, source);
  assert.strictEqual(copied.input, history, "avoid cloning large input prior to normalization");
  assert.notStrictEqual(copied.tools, source.tools);
  assert.notStrictEqual(copied.reasoning, source.reasoning);
  assert.notStrictEqual(copied.tool_choice, source.tool_choice);
});

test("Codex normalization never mutates caller-owned input, tools, or reasoning", () => {
  const source = {
    model: "gpt-6.1-sol",
    _nativeCodexPassthrough: true,
    input: [{ type: "message", role: "system", content: [{ type: "input_text", text: "long-context".repeat(4096) }] }],
    tools: [{ type: "function", name: "say_hello", parameters: { type: "object", properties: { x: { type: "string" } } } }],
    reasoning: { effort: "high" },
  };
  const before = structuredClone(source);
  const output = new CodexExecutor().transformRequest("gpt-6.1-sol", source, true, {
    requestEndpointPath: "/responses",
  }) as Record<string, unknown>;

  assert.deepEqual(source, before, "transformed output must not mutate the source");
  assert.notStrictEqual(output.input, source.input);
  assert.equal((output.input as Array<{ role: string }>)[0].role, "developer");
  assert.equal(source.input[0].role, "system");
  assert.notStrictEqual(output.tools, source.tools);
});
