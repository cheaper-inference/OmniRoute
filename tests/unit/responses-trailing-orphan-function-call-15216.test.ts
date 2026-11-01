/**
 * #15216 — Chat Completions → Responses direction: an assistant `tool_calls`
 * turn with no matching trailing `role: "tool"` output was forwarded as an
 * unpaired `function_call` item in the Responses input, which strict Responses
 * upstreams reject with `400 No tool output found for function call <id>`.
 *
 * The original repair invented successful empty outputs. Preserve the original
 * test identities while migrating their oracles: translation retains pending
 * calls and the handler rejects incomplete history before dispatch. Absence of
 * a result is never evidence that a tool completed successfully.
 *
 * Run: node --import tsx/esm --test tests/unit/responses-trailing-orphan-function-call-15216.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";

const { openaiToOpenAIResponsesRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");

type InputItem = {
  type?: string;
  call_id?: string;
  output?: unknown;
  status?: string;
};

function translate(body: unknown): { input: InputItem[] } {
  return openaiToOpenAIResponsesRequest("gpt-4", body, true, {}) as { input: InputItem[] };
}

const ORPHAN_REPRO = {
  messages: [
    { role: "user", content: "Say OK." },
    {
      role: "assistant",
      content: null,
      tool_calls: [
        {
          id: "call_orphan_livecheck",
          type: "function",
          function: { name: "probe", arguments: '{"q":"alpha"}' },
        },
      ],
    },
  ],
};

test("#15216: trailing unpaired function_call is repaired with a synthesized empty output", () => {
  const result = translate(ORPHAN_REPRO);

  const calls = result.input.filter((item) => item.type === "function_call");
  const outputs = result.input.filter((item) => item.type === "function_call_output");

  assert.equal(calls.length, 1, "the orphan call itself must survive");
  assert.equal(calls[0].call_id, "call_orphan_livecheck");
  assert.equal(outputs.length, 0, "no successful output may be fabricated");
  const callIdx = result.input.findIndex((item) => item.type === "function_call");
  assert.equal(callIdx, result.input.length - 1, "the pending call retains its original position");
});

test("#15216: a properly paired call keeps its real output untouched", () => {
  const result = translate({
    messages: [
      { role: "user", content: "Say OK." },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: "call_real",
            type: "function",
            function: { name: "probe", arguments: "{}" },
          },
        ],
      },
      { role: "tool", tool_call_id: "call_real", content: "real result" },
    ],
  });

  const outputs = result.input.filter((item) => item.type === "function_call_output");
  assert.equal(outputs.length, 1, "no synthesized output may be added next to a real one");
  assert.equal(outputs[0].call_id, "call_real");
  assert.equal(outputs[0].output, "real result");
});

test("#15216: mid-history unpaired call is paired in place without disturbing later items", () => {
  const result = translate({
    messages: [
      { role: "user", content: "first" },
      {
        role: "assistant",
        content: "calling tool",
        tool_calls: [
          {
            id: "call_lost",
            type: "function",
            function: { name: "probe", arguments: "{}" },
          },
        ],
      },
      { role: "user", content: "continue" },
    ],
  });

  const types = result.input.map((item) => item.type);
  const callIdx = types.indexOf("function_call");
  const outputIdx = types.indexOf("function_call_output");

  assert.ok(callIdx >= 0, "orphan call must survive translation");
  assert.equal(outputIdx, -1, "no result may be invented for the mid-history call");
  assert.equal(result.input[callIdx].call_id, "call_lost");
  const continueIdx = types.lastIndexOf("message");
  assert.equal(continueIdx, callIdx + 1, "the trailing user message follows the pending call");
});

test("#15216: mixed turn — only the call missing its output is synthesized", () => {
  const result = translate({
    messages: [
      { role: "user", content: "Say OK." },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          { id: "call_orphan", type: "function", function: { name: "a", arguments: "{}" } },
          { id: "call_paired", type: "function", function: { name: "b", arguments: "{}" } },
        ],
      },
      { role: "tool", tool_call_id: "call_paired", content: "b result" },
    ],
  });

  const outputs = result.input.filter((item) => item.type === "function_call_output");
  assert.equal(outputs.length, 1, "only the real output survives");
  assert.deepEqual(
    result.input.filter((item) => item.type === "function_call").map((item) => item.call_id),
    ["call_orphan", "call_paired"],
    "both calls retain their identity and order"
  );

  const orphanOutput = outputs.find((item) => item.call_id === "call_orphan");
  const realOutput = outputs.find((item) => item.call_id === "call_paired");
  assert.equal(orphanOutput, undefined, "the pending call must not gain a fabricated output");
  assert.ok(realOutput, "the paired call keeps its output");
  assert.equal(realOutput.output, "b result");
});
