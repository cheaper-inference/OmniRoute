import test from "node:test";
import assert from "node:assert/strict";

const { clampCallId, MAX_CALL_ID_LEN } =
  await import("../../open-sse/translator/request/openai-responses/helpers.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const prefix = "functions.mcp__very_long_server_name__very_long_tool_name_xxxxxxxx:".padEnd(
  66,
  "x"
);

test("an id within the limit is unchanged", () => {
  assert.equal(clampCallId("call_abc"), "call_abc");
  assert.equal(clampCallId("x".repeat(MAX_CALL_ID_LEN)), "x".repeat(MAX_CALL_ID_LEN));
});

test("long ids that share a 64-character prefix stay distinct, stable and within the limit", () => {
  const a = clampCallId(`${prefix}0`);
  const b = clampCallId(`${prefix}1`);
  assert.notEqual(a, b);
  assert.equal(a, clampCallId(`${prefix}0`));
  assert.ok(a.length <= MAX_CALL_ID_LEN && b.length <= MAX_CALL_ID_LEN);
});

test("parallel calls with long ids keep one function_call and one output per id", () => {
  const idA = `${prefix}0`;
  const idB = `${prefix}1`;
  const out = translateRequest(
    FORMATS.OPENAI,
    FORMATS.OPENAI_RESPONSES,
    "gpt-5",
    {
      model: "gpt-5",
      messages: [
        { role: "user", content: "u" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            { id: idA, type: "function", function: { name: "f", arguments: '{"i":0}' } },
            { id: idB, type: "function", function: { name: "f", arguments: '{"i":1}' } },
          ],
        },
        { role: "tool", tool_call_id: idA, content: "RA" },
        { role: "tool", tool_call_id: idB, content: "RB" },
      ],
    },
    true,
    null,
    "openai"
  ) as { input: Array<{ type: string; call_id?: string; output?: string }> };
  const calls = out.input.filter((item) => item.type === "function_call");
  const outputs = out.input.filter((item) => item.type === "function_call_output");
  assert.equal(new Set(calls.map((item) => item.call_id)).size, 2);
  assert.deepEqual(
    outputs.map((item) => item.call_id),
    calls.map((item) => item.call_id)
  );
  assert.deepEqual(
    outputs.map((item) => item.output),
    ["RA", "RB"]
  );
});
