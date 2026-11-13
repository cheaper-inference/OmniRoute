import test from "node:test";
import assert from "node:assert/strict";

const { openaiToOpenAIResponsesResponse, openaiResponsesToOpenAIResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");
const { initState } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

type Rec = Record<string, unknown>;
type ToolCall = { function?: { arguments?: string } };
type ChatChunk = {
  choices: Array<{ delta: { tool_calls?: ToolCall[] }; finish_reason: string | null }>;
};
type ResponsesEvent = {
  event: string;
  data: { item: { type: string; arguments?: string } };
};

// Chat -> Responses: feed chunks, then the end-of-stream flush (null).
function chatToResponses(chunks: Rec[]): ResponsesEvent[] {
  const state = initState(FORMATS.OPENAI_RESPONSES);
  return [...chunks, null].flatMap(
    (chunk) => (openaiToOpenAIResponsesResponse(chunk, state) ?? []) as ResponsesEvent[]
  );
}

// Responses -> Chat: feed events, then the end-of-stream flush (null).
function responsesToChat(events: Rec[]): ChatChunk[] {
  const state = initState(FORMATS.OPENAI);
  const out: ChatChunk[] = [];
  for (const event of [...events, null]) {
    const result = openaiResponsesToOpenAIResponse(event, state) as ChatChunk | ChatChunk[] | null;
    if (result) out.push(...(Array.isArray(result) ? result : [result]));
  }
  return out;
}

const callArgs = (out: ChatChunk[]) =>
  out
    .flatMap((chunk) => chunk.choices[0].delta.tool_calls ?? [])
    .map((call) => call.function?.arguments ?? "")
    .join("");
const finishReasons = (out: ChatChunk[]) =>
  out.map((chunk) => chunk.choices[0].finish_reason).filter(Boolean);

const added = {
  type: "response.output_item.added",
  output_index: 0,
  item: { type: "function_call", id: "fc_1", call_id: "c1", name: "f", arguments: "" },
};
const argsDelta = (delta: string) => ({
  type: "response.function_call_arguments.delta",
  item_id: "fc_1",
  output_index: 0,
  delta,
});
const usage = { input_tokens: 1, output_tokens: 1 };

test("object-valued tool call arguments reach the Responses client as JSON", () => {
  const events = chatToResponses([
    {
      id: "c1",
      model: "m",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [{ index: 0, id: "call_1", function: { name: "f", arguments: { a: 1 } } }],
          },
          finish_reason: null,
        },
      ],
    },
    {
      id: "c1",
      model: "m",
      choices: [{ index: 0, delta: {}, finish_reason: "tool_calls" }],
      usage: { prompt_tokens: 1, completion_tokens: 1 },
    },
  ]);
  const done = events.find(
    (event) =>
      event.event === "response.output_item.done" && event.data.item.type === "function_call"
  );
  assert.equal(done?.data.item.arguments, '{"a":1}');
});

test("response.completed without output_item.done still delivers the buffered arguments", () => {
  const out = responsesToChat([
    added,
    argsDelta('{"a":1}'),
    {
      type: "response.completed",
      response: {
        status: "completed",
        output: [
          { type: "function_call", id: "fc_1", call_id: "c1", name: "f", arguments: '{"a":1}' },
        ],
        usage,
      },
    },
  ]);
  assert.equal(callArgs(out), '{"a":1}');
  assert.deepEqual(finishReasons(out), ["tool_calls"]);
});

test("a tool call cut by max_output_tokens ends as length, with its partial arguments", () => {
  const out = responsesToChat([
    added,
    argsDelta('{"a":'),
    {
      type: "response.incomplete",
      response: {
        status: "incomplete",
        incomplete_details: { reason: "max_output_tokens" },
        output: [
          { type: "function_call", id: "fc_1", call_id: "c1", name: "f", arguments: '{"a":' },
        ],
        usage,
      },
    },
  ]);
  assert.equal(callArgs(out), '{"a":');
  assert.deepEqual(finishReasons(out), ["length"]);
});

test("a finished tool call before response.incomplete keeps tool_calls and sends its arguments once", () => {
  const out = responsesToChat([
    added,
    argsDelta('{"a":1}'),
    {
      type: "response.output_item.done",
      output_index: 0,
      item: { type: "function_call", id: "fc_1", call_id: "c1", name: "f", arguments: '{"a":1}' },
    },
    {
      type: "response.incomplete",
      response: {
        status: "incomplete",
        incomplete_details: { reason: "max_output_tokens" },
        output: [],
        usage,
      },
    },
  ]);
  assert.equal(callArgs(out), '{"a":1}');
  assert.deepEqual(finishReasons(out), ["tool_calls"]);
});
