/**
 * Content-filtered turns must reach Claude clients as stop_reason "refusal".
 *
 * Gemini SAFETY/RECITATION/BLOCKLIST/PROHIBITED_CONTENT (and any OpenAI
 * upstream returning finish_reason "content_filter") used to reach a Claude
 * client as a clean "end_turn" on the streaming path, and as the raw
 * "content_filter" / "length" values on the non-streaming path — neither of
 * which is a valid Anthropic stop_reason. A shimmed tool whose arguments were
 * still buffered also had its arguments released on a refusal.
 */
import test from "node:test";
import assert from "node:assert/strict";

await import("../../open-sse/translator/bootstrap.ts");
const { openaiToClaudeResponse } =
  await import("../../open-sse/translator/response/openai-to-claude.ts");
const { translateResponse, initState } = await import("../../open-sse/translator/index.ts");
const { translateNonStreamingResponse } =
  await import("../../open-sse/handlers/responseTranslator.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { openAIFinishReasonToClaudeStopReason } =
  await import("../../open-sse/utils/finishReason.ts");

type Event = Record<string, unknown> & {
  type?: string;
  delta?: Record<string, unknown>;
};

function freshState(): Record<string, unknown> {
  return {
    messageStartSent: false,
    nextBlockIndex: 0,
    toolCalls: new Map(),
    thinkingBlockStarted: false,
    textBlockStarted: false,
    textBlockClosed: false,
  };
}

function streamOpenAI(chunks: unknown[]): Event[] {
  const state = freshState();
  const events: Event[] = [];
  for (const chunk of [...chunks, null]) {
    const out = openaiToClaudeResponse(chunk, state);
    if (out) events.push(...(out as Event[]));
  }
  return events;
}

function stopReasonOf(events: Event[]): unknown {
  return events.find((event) => event.type === "message_delta")?.delta?.stop_reason;
}

function nonStream(finishReason: string): Record<string, unknown> {
  return translateNonStreamingResponse(
    {
      id: "chatcmpl-refusal",
      model: "gpt-test",
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: "partial" },
          finish_reason: finishReason,
        },
      ],
      usage: { prompt_tokens: 3, completion_tokens: 1 },
    },
    FORMATS.OPENAI,
    FORMATS.CLAUDE
  ) as Record<string, unknown>;
}

test("streaming: content_filter becomes stop_reason refusal (not end_turn)", () => {
  const events = streamOpenAI([
    { id: "c1", model: "m", choices: [{ index: 0, delta: { content: "x" } }] },
    { id: "c1", model: "m", choices: [{ index: 0, delta: {}, finish_reason: "content_filter" }] },
  ]);
  assert.equal(stopReasonOf(events), "refusal");
});

test("streaming: existing mappings are unchanged", () => {
  for (const [finish, expected] of [
    ["stop", "end_turn"],
    ["length", "max_tokens"],
    ["tool_calls", "tool_use"],
    ["malformed_function_call", "tool_use"],
  ]) {
    const events = streamOpenAI([
      { id: "c1", model: "m", choices: [{ index: 0, delta: { content: "x" } }] },
      { id: "c1", model: "m", choices: [{ index: 0, delta: {}, finish_reason: finish }] },
    ]);
    assert.equal(stopReasonOf(events), expected, `finish_reason ${finish}`);
  }
});

test("non-streaming: content_filter → refusal and length → max_tokens", () => {
  assert.equal(nonStream("content_filter").stop_reason, "refusal");
  assert.equal(nonStream("length").stop_reason, "max_tokens");
  assert.equal(nonStream("stop").stop_reason, "end_turn");
  assert.equal(nonStream("tool_calls").stop_reason, "tool_use");
  assert.equal(nonStream("malformed_function_call").stop_reason, "tool_use");
});

test("shared mapper keeps valid Claude stop reasons and defaults unknown to end_turn", () => {
  assert.equal(openAIFinishReasonToClaudeStopReason("content_filter"), "refusal");
  assert.equal(openAIFinishReasonToClaudeStopReason("refusal"), "refusal");
  assert.equal(openAIFinishReasonToClaudeStopReason("max_tokens"), "max_tokens");
  assert.equal(openAIFinishReasonToClaudeStopReason("stop_sequence"), "stop_sequence");
  assert.equal(openAIFinishReasonToClaudeStopReason("some_future_reason"), "end_turn");
  assert.equal(openAIFinishReasonToClaudeStopReason(undefined), "end_turn");
});

for (const reason of ["SAFETY", "RECITATION", "BLOCKLIST", "PROHIBITED_CONTENT"]) {
  test(`Gemini stream → Claude: ${reason} ends as refusal`, () => {
    const state = initState(FORMATS.CLAUDE);
    const events: Event[] = [];
    for (const chunk of [
      {
        responseId: "resp-safety",
        modelVersion: "gemini-2.5-flash",
        candidates: [{ content: { parts: [{ text: "partial" }] }, finishReason: reason }],
        usageMetadata: { promptTokenCount: 4, candidatesTokenCount: 1, totalTokenCount: 5 },
      },
      null,
    ]) {
      const out = translateResponse(FORMATS.GEMINI, FORMATS.CLAUDE, chunk, state);
      if (Array.isArray(out)) events.push(...(out as Event[]));
    }
    assert.equal(stopReasonOf(events), "refusal");
  });
}

test("streaming: a refusal does not release buffered shimmed tool arguments", () => {
  const secretArgs = '{"file_path":"/etc/hosts","offset":1,"limit":5,"pages":""}';
  const events = streamOpenAI([
    {
      id: "c2",
      model: "m",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [{ index: 0, id: "call_read", function: { name: "Read", arguments: "" } }],
          },
        },
      ],
    },
    {
      id: "c2",
      model: "m",
      choices: [
        {
          index: 0,
          delta: { tool_calls: [{ index: 0, function: { arguments: secretArgs } }] },
        },
      ],
    },
    { id: "c2", model: "m", choices: [{ index: 0, delta: {}, finish_reason: "content_filter" }] },
  ]);

  const inputDeltas = events.filter(
    (event) => event.type === "content_block_delta" && event.delta?.type === "input_json_delta"
  );
  assert.equal(inputDeltas.length, 0, "buffered tool arguments must not be released");
  const toolStart = events.find((event) => event.type === "content_block_start");
  assert.ok(toolStart, "the tool block is still opened");
  const toolIndex = toolStart.index;
  assert.ok(
    events.some((event) => event.type === "content_block_stop" && event.index === toolIndex),
    "the tool block is still closed so the stream stays well-formed"
  );
  assert.equal(stopReasonOf(events), "refusal");
});

test("Gemini non-stream → Claude: SAFETY ends as refusal", () => {
  const result = translateNonStreamingResponse(
    {
      responseId: "resp-safety",
      modelVersion: "gemini-2.5-flash",
      candidates: [{ content: { parts: [{ text: "partial" }] }, finishReason: "SAFETY" }],
    },
    FORMATS.GEMINI,
    FORMATS.CLAUDE
  ) as Record<string, unknown>;
  assert.equal(result.stop_reason, "refusal");
});
