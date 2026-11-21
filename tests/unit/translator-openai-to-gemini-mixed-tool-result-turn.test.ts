// Parallel tool-call batches whose thought signatures resolve only partially produce a
// tool-result user turn that mixes native functionResponse parts with signature-less
// text contexts. Gemini rejects a turn that does not end on a functionResponse with
// 400 "Requests ending with a model turn are not supported unless the last part is a
// function response". Split into its own file (parent file is at its frozen size cap).

import test from "node:test";
import assert from "node:assert/strict";

const { openaiToGeminiRequest } =
  await import("../../open-sse/translator/request/openai-to-gemini.ts");
const { storeGeminiThoughtSignature } =
  await import("../../open-sse/services/geminiThoughtSignatureStore.ts");

type GeminiPart = Record<string, unknown>;
type GeminiContent = { role?: string; parts?: GeminiPart[] };

function partKind(part: GeminiPart): string {
  if (part.functionCall) return "functionCall";
  if (part.functionResponse) return "functionResponse";
  if (part.thought) return "thought";
  return "text";
}

function parallelToolCallMessages() {
  return [
    { role: "user", content: "call the tools" },
    {
      role: "assistant",
      content: null,
      tool_calls: [
        {
          id: "call_a",
          type: "function",
          function: { name: "get_current_timestamp", arguments: "{}" },
        },
        {
          id: "call_b",
          type: "function",
          function: { name: "calculate_timestamp", arguments: '{"days_ago":0}' },
        },
        {
          id: "call_c",
          type: "function",
          function: { name: "calculate_timestamp", arguments: '{"days_ago":1}' },
        },
      ],
    },
    { role: "tool", tool_call_id: "call_a", content: '{"now":1}' },
    { role: "tool", tool_call_id: "call_b", content: '{"now":1}' },
    { role: "tool", tool_call_id: "call_c", content: '{"now":0}' },
  ];
}

const TOOLS = [
  {
    type: "function",
    function: {
      name: "get_current_timestamp",
      description: "now",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "calculate_timestamp",
      description: "calc",
      parameters: { type: "object", properties: { days_ago: { type: "integer" } } },
    },
  },
];

test("mixed tool-result turn keeps functionResponse parts last when only some tool calls resolve a signature", () => {
  const namespace = "mixed-sig-turn-test";
  storeGeminiThoughtSignature(`${namespace}:call_a`, "CkYAc2ln");

  const result = openaiToGeminiRequest(
    "gemini-3.8-flash",
    { messages: parallelToolCallMessages(), tools: TOOLS },
    true,
    { _provider: "vertex", _signatureNamespace: namespace },
    { signaturelessToolCallMode: "context" }
  );

  const toolResultTurn = (result.contents as GeminiContent[]).find(
    (content) => content.role === "user" && content.parts?.some((p) => p.functionResponse)
  );
  assert.ok(toolResultTurn, "expected a tool-result user turn");

  const kinds = toolResultTurn.parts!.map(partKind);
  assert.ok(kinds.includes("functionResponse"), "expected at least one functionResponse part");
  assert.ok(kinds.includes("text"), "expected at least one signature-less text context part");
  const lastFunctionResponse = kinds.lastIndexOf("functionResponse");
  const lastOther = kinds.findLastIndex((kind) => kind !== "functionResponse");
  assert.ok(
    lastFunctionResponse > lastOther,
    `tool-result turn must end on a functionResponse, got part order: ${kinds.join(", ")}`
  );
});

test("all signatures resolved keeps a plain functionResponse turn unchanged", () => {
  const namespace = "all-sig-turn-test";
  for (const id of ["call_a", "call_b", "call_c"]) {
    storeGeminiThoughtSignature(`${namespace}:${id}`, "CkYAc2ln");
  }

  const result = openaiToGeminiRequest(
    "gemini-3.8-flash",
    { messages: parallelToolCallMessages(), tools: TOOLS },
    true,
    { _provider: "vertex", _signatureNamespace: namespace },
    { signaturelessToolCallMode: "context" }
  );

  const toolResultTurn = (result.contents as GeminiContent[]).find(
    (content) => content.role === "user" && content.parts?.some((p) => p.functionResponse)
  );
  assert.ok(toolResultTurn, "expected a tool-result user turn");
  assert.deepEqual(toolResultTurn.parts!.map(partKind), [
    "functionResponse",
    "functionResponse",
    "functionResponse",
  ]);
});

test("trailing model turn is stripped for provider-qualified Gemini 3.x model ids", () => {
  const messages = [
    { role: "user", content: "hi" },
    { role: "assistant", content: "unanswered prefill text" },
  ];

  for (const model of ["vertex/gemini-3.8-flash", "gemini-3.8-flash"]) {
    const result = openaiToGeminiRequest(model, { messages }, true, {
      _provider: "vertex",
    });
    const contents = result.contents as GeminiContent[];
    assert.notEqual(
      contents[contents.length - 1]?.role,
      "model",
      `${model}: request must not end on a model turn`
    );
  }
});
