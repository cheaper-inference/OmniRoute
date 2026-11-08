import test from "node:test";
import assert from "node:assert/strict";

const { openAIChunkToGeminiChunk } =
  await import("../../open-sse/translator/response/openai-to-gemini-sse.ts");
const { openaiToAntigravityResponse } =
  await import("../../open-sse/translator/response/openai-to-antigravity.ts");

// Some OpenAI-compatible endpoints omit `tool_calls[].index`. The Gemini and Antigravity
// stream translators keyed calls by `index ?? 0`, so parallel calls merged into one call
// whose joined arguments no longer parsed (args fell back to {}).

type Delta = { index?: number; id?: string; name?: string; arguments?: string };

const toolChunk = (calls: Delta[], finish: string | null = null) => ({
  id: "chatcmpl-idx",
  model: "gpt-test",
  choices: [
    {
      index: 0,
      delta: {
        tool_calls: calls.map(({ name, arguments: args, ...rest }) => ({
          ...rest,
          type: "function",
          function: {
            ...(name ? { name } : {}),
            ...(args !== undefined ? { arguments: args } : {}),
          },
        })),
      },
      finish_reason: finish,
    },
  ],
});

type Part = { functionCall?: { name: string; args: unknown } };
type Candidates = { candidates: Array<{ content: { parts: Part[] } }> };

const callsOf = (parts: Part[]) => parts.filter((p) => p.functionCall).map((p) => p.functionCall);

function geminiCalls(chunks: ReturnType<typeof toolChunk>[]) {
  const state = {};
  let last: Candidates | null = null;
  for (const chunk of chunks) {
    last = (openAIChunkToGeminiChunk(chunk, "m", state) as Candidates | null) ?? last;
  }
  return callsOf(last!.candidates[0].content.parts);
}

function antigravityCalls(chunks: ReturnType<typeof toolChunk>[]) {
  const state = {};
  let last: { response: Candidates } | null = null;
  for (const chunk of chunks) last = openaiToAntigravityResponse(chunk, state) ?? last;
  return callsOf(last!.response.candidates[0].content.parts);
}

const PARALLEL_WITHOUT_INDEX = [
  toolChunk([{ id: "call_a", name: "read", arguments: '{"p":' }]),
  toolChunk([{ arguments: '"a"}' }]),
  toolChunk([{ id: "call_b", name: "write", arguments: '{"q":' }]),
  toolChunk([{ arguments: '"b"}' }], "tool_calls"),
];
const EXPECTED = [
  { name: "read", args: { p: "a" } },
  { name: "write", args: { q: "b" } },
];

test("Gemini SSE: parallel tool calls without an index stay separate", () => {
  assert.deepEqual(geminiCalls(PARALLEL_WITHOUT_INDEX), EXPECTED);
});

test("Antigravity: parallel tool calls without an index stay separate", () => {
  assert.deepEqual(antigravityCalls(PARALLEL_WITHOUT_INDEX), EXPECTED);
});

test("an id repeated on every index-less chunk is still one call", () => {
  const chunks = [
    toolChunk([{ id: "call_a", name: "read", arguments: '{"p":' }]),
    toolChunk([{ id: "call_a", arguments: '"a"}' }], "tool_calls"),
  ];
  assert.deepEqual(geminiCalls(chunks), [{ name: "read", args: { p: "a" } }]);
  assert.deepEqual(antigravityCalls(chunks), [{ name: "read", args: { p: "a" } }]);
});

test("an id that arrives after the first index-less fragment joins the same call", () => {
  const chunks = [
    toolChunk([{ name: "read", arguments: '{"p":' }]),
    toolChunk([{ id: "call_a", arguments: '"a"}' }], "tool_calls"),
  ];
  assert.deepEqual(geminiCalls(chunks), [{ name: "read", args: { p: "a" } }]);
  assert.deepEqual(antigravityCalls(chunks), [{ name: "read", args: { p: "a" } }]);
});

test("explicit indexes are used as sent", () => {
  const chunks = [
    toolChunk([
      { index: 1, id: "call_b", name: "write", arguments: '{"q":' },
      { index: 0, id: "call_a", name: "read", arguments: '{"p":' },
    ]),
    toolChunk([{ index: 0, arguments: '"a"}' }]),
    toolChunk([{ index: 1, arguments: '"b"}' }], "tool_calls"),
  ];
  assert.deepEqual(geminiCalls(chunks), EXPECTED);
  assert.deepEqual(antigravityCalls(chunks), EXPECTED);
});
