/**
 * #18432 — an upstream event stream buffered for a NON-streaming client that closes
 * before its format's terminal signal must not be reported as a clean completion.
 *
 * Before the fix every buffered-SSE parser started from a "finished" default
 * (`finish_reason: "stop"`, Claude `stop_reason: "end_turn"`, Responses status
 * `in_progress` → chat `stop`), so a stream cut mid-answer reached the client as
 * HTTP 200 + `finish_reason: "stop"` with partial content. A cut turn now reports
 * the truncation the same way a budget cut does (`length` / `max_tokens` /
 * `incomplete`), while streams that do carry their terminal signal keep their real
 * finish reason unchanged.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { parseSSEToOpenAIResponse, parseSSEToClaudeResponse, parseSSEToResponsesOutput } =
  await import("../../open-sse/handlers/sseParser.ts");
const { parseSSEToGeminiResponse } =
  await import("../../open-sse/handlers/sseParser/geminiResponse.ts");
const { parseNonStreamingResponseBody } =
  await import("../../open-sse/handlers/chatCore/nonStreamingResponseParse.ts");
const { translateNonStreamingResponse } =
  await import("../../open-sse/handlers/responseTranslator.ts");

type ChatBody = {
  choices: Array<{ message: { content: string }; finish_reason: string }>;
};
type ResponsesBody = {
  status: string;
  incomplete_details?: unknown;
  output: Array<{ content: Array<{ text: string }> }>;
};
type ClaudeBody = { stop_reason: string; content: Array<{ text: string }> };

const data = (value: unknown) => `data: ${JSON.stringify(value)}\n\n`;
const named = (event: string, value: unknown) =>
  `event: ${event}\ndata: ${JSON.stringify(value)}\n\n`;

// ── OpenAI chat chunks ──────────────────────────────────────────────────────────
const openAiChunk = (delta: Record<string, unknown>, finishReason: string | null = null) =>
  data({
    id: "chatcmpl_cut",
    model: "kimi-k3",
    choices: [{ index: 0, delta, finish_reason: finishReason }],
  });
const OPENAI_CUT =
  openAiChunk({ role: "assistant", content: "## 6\n\n" }) + openAiChunk({ content: "| Var" });

test("#18432 OpenAI chat: a stream cut before finish_reason/[DONE] reports length, not stop", () => {
  const parsed = parseSSEToOpenAIResponse(OPENAI_CUT, "m") as ChatBody;
  assert.equal(parsed.choices[0].message.content, "## 6\n\n| Var");
  assert.equal(parsed.choices[0].finish_reason, "length");
});

test("#18432 OpenAI chat: a complete stream keeps its real finish_reason", () => {
  for (const reason of ["stop", "length", "content_filter"]) {
    const sse = OPENAI_CUT + openAiChunk({}, reason) + "data: [DONE]\n\n";
    const parsed = parseSSEToOpenAIResponse(sse, "m") as ChatBody;
    assert.equal(parsed.choices[0].finish_reason, reason);
  }
});

test("#18432 OpenAI chat: finish_reason without [DONE] is still a terminal signal", () => {
  const parsed = parseSSEToOpenAIResponse(OPENAI_CUT + openAiChunk({}, "stop"), "m") as ChatBody;
  assert.equal(parsed.choices[0].finish_reason, "stop");
});

test("#18432 OpenAI chat: [DONE] without any finish_reason is still a terminal signal", () => {
  // Some relays/in-process emitters close with [DONE] only; that is a deliberate end.
  const parsed = parseSSEToOpenAIResponse(OPENAI_CUT + "data: [DONE]\n\n", "m") as ChatBody;
  assert.equal(parsed.choices[0].finish_reason, "stop");
});

test("#18432 OpenAI chat: a cut stream with a complete tool call keeps the tool_calls normalization (T18)", () => {
  const sse = openAiChunk({
    tool_calls: [{ index: 0, id: "call_1", function: { name: "f", arguments: '{"a":1}' } }],
  });
  const parsed = parseSSEToOpenAIResponse(sse, "m") as ChatBody;
  assert.equal(parsed.choices[0].finish_reason, "tool_calls");
});

test("#18432 OpenAI chat: a tool call cut mid arguments is withheld and reports length", () => {
  // Was `tool_calls` in #18460 (T18 forced it over half-written JSON). The follow-up
  // withholds an incomplete call so a client never executes it — see
  // sse-cut-tool-call-arguments.test.ts.
  const sse = openAiChunk({
    tool_calls: [{ index: 0, id: "call_1", function: { name: "f", arguments: '{"a":' } }],
  });
  const parsed = parseSSEToOpenAIResponse(sse, "m") as ChatBody;
  assert.equal(parsed.choices[0].finish_reason, "length");
});

// ── OpenAI Responses events ─────────────────────────────────────────────────────
const RESPONSES_CUT =
  data({
    type: "response.created",
    response: { id: "resp_cut", model: "gpt-5.3-codex", status: "in_progress", output: [] },
  }) +
  data({
    type: "response.output_item.added",
    output_index: 0,
    item: { id: "msg_1", type: "message", role: "assistant", content: [] },
  }) +
  data({
    type: "response.output_text.delta",
    item_id: "msg_1",
    output_index: 0,
    content_index: 0,
    delta: "## 6\n\n| Var",
  });

test("#18432 Responses: a stream cut before response.completed is incomplete and maps to length", () => {
  const parsed = parseSSEToResponsesOutput(RESPONSES_CUT, "m") as ResponsesBody;
  assert.equal(parsed.output[0].content[0].text, "## 6\n\n| Var");
  assert.equal(parsed.status, "incomplete");
  assert.deepEqual(parsed.incomplete_details, { reason: "max_output_tokens" });

  const chat = translateNonStreamingResponse(parsed, "openai-responses", "openai") as ChatBody;
  assert.equal(chat.choices[0].message.content, "## 6\n\n| Var");
  assert.equal(chat.choices[0].finish_reason, "length");
});

test("#18432 Responses: [DONE] alone does not complete a Responses stream", () => {
  const parsed = parseSSEToResponsesOutput(
    RESPONSES_CUT + "data: [DONE]\n\n",
    "m"
  ) as ResponsesBody;
  assert.equal(parsed.status, "incomplete");
});

test("#18432 Responses: a complete stream keeps status completed and chat stop", () => {
  const sse =
    RESPONSES_CUT +
    data({
      type: "response.completed",
      response: {
        id: "resp_cut",
        model: "gpt-5.3-codex",
        status: "completed",
        output: [
          {
            id: "msg_1",
            type: "message",
            role: "assistant",
            content: [{ type: "output_text", text: "## 6\n\n| Var |" }],
          },
        ],
      },
    }) +
    "data: [DONE]\n\n";
  const parsed = parseSSEToResponsesOutput(sse, "m") as ResponsesBody;
  assert.equal(parsed.status, "completed");
  assert.equal(parsed.incomplete_details, undefined);
  const chat = translateNonStreamingResponse(parsed, "openai-responses", "openai") as ChatBody;
  assert.equal(chat.choices[0].finish_reason, "stop");
});

test("#18432 Responses: a snapshot-only stream with no output keeps its reported status", () => {
  const sse = data({
    type: "response.in_progress",
    response: { id: "resp_empty", model: "m", status: "in_progress", output: [] },
  });
  const parsed = parseSSEToResponsesOutput(sse, "m") as ResponsesBody;
  assert.equal(parsed.status, "in_progress");
  assert.equal(parsed.incomplete_details, undefined);
});

test("#18432 Responses: a response.incomplete terminal keeps its incomplete_details (chat length)", () => {
  const sse =
    RESPONSES_CUT +
    data({
      type: "response.incomplete",
      response: {
        id: "resp_cut",
        model: "gpt-5.3-codex",
        status: "incomplete",
        incomplete_details: { reason: "max_output_tokens" },
        output: [],
      },
    });
  const parsed = parseSSEToResponsesOutput(sse, "m") as ResponsesBody;
  assert.equal(parsed.status, "incomplete");
  assert.deepEqual(parsed.incomplete_details, { reason: "max_output_tokens" });
  const chat = translateNonStreamingResponse(parsed, "openai-responses", "openai") as ChatBody;
  assert.equal(chat.choices[0].finish_reason, "length");
});

test("#18432 Responses: a cut stream with only an empty message item stays in_progress", () => {
  // No model output yet: leave it to the empty-turn handling, not the truncation verdict.
  const sse = RESPONSES_CUT.split("data: ").slice(0, 3).join("data: ");
  const parsed = parseSSEToResponsesOutput(sse, "m") as ResponsesBody;
  assert.equal(parsed.status, "in_progress");
  assert.equal(parsed.incomplete_details, undefined);
});

// ── Claude / Anthropic messages events ──────────────────────────────────────────
const CLAUDE_CUT =
  named("message_start", {
    type: "message_start",
    message: { id: "msg_cut", model: "claude-sonnet-4-6", role: "assistant", usage: {} },
  }) +
  named("content_block_start", {
    type: "content_block_start",
    index: 0,
    content_block: { type: "text", text: "" },
  }) +
  named("content_block_delta", {
    type: "content_block_delta",
    index: 0,
    delta: { type: "text_delta", text: "## 6\n\n| Var" },
  });

test("#18432 Claude: a stream cut before message_delta/message_stop reports max_tokens", () => {
  const parsed = parseSSEToClaudeResponse(CLAUDE_CUT, "m") as ClaudeBody;
  assert.equal(parsed.content[0].text, "## 6\n\n| Var");
  assert.equal(parsed.stop_reason, "max_tokens");

  const chat = translateNonStreamingResponse(parsed, "claude", "openai") as ChatBody;
  assert.equal(chat.choices[0].finish_reason, "length");
});

test("#18432 Claude: a complete stream keeps its real stop_reason", () => {
  for (const reason of ["end_turn", "max_tokens", "stop_sequence", "tool_use"]) {
    const sse =
      CLAUDE_CUT +
      named("content_block_stop", { type: "content_block_stop", index: 0 }) +
      named("message_delta", {
        type: "message_delta",
        delta: { stop_reason: reason, stop_sequence: null },
        usage: { output_tokens: 4 },
      }) +
      named("message_stop", { type: "message_stop" });
    const parsed = parseSSEToClaudeResponse(sse, "m") as ClaudeBody;
    assert.equal(parsed.stop_reason, reason);
  }
});

test("#18432 Claude: message_stop without a stop_reason keeps the end_turn default", () => {
  const sse = CLAUDE_CUT + named("message_stop", { type: "message_stop" });
  const parsed = parseSSEToClaudeResponse(sse, "m") as ClaudeBody;
  assert.equal(parsed.stop_reason, "end_turn");
  const chat = translateNonStreamingResponse(parsed, "claude", "openai") as ChatBody;
  assert.equal(chat.choices[0].finish_reason, "stop");
});

// ── Gemini / Antigravity candidates ─────────────────────────────────────────────
const GEMINI_CUT = data({
  response: { candidates: [{ content: { parts: [{ text: "## 6\n\n| Var" }] } }] },
});

test("#18432 Gemini: a stream cut before any finishReason reports length", () => {
  const parsed = parseSSEToGeminiResponse(GEMINI_CUT, "m") as ChatBody;
  assert.equal(parsed.choices[0].message.content, "## 6\n\n| Var");
  assert.equal(parsed.choices[0].finish_reason, "length");
});

test("#18432 Gemini: a complete stream keeps its real finishReason", () => {
  const stop = parseSSEToGeminiResponse(
    GEMINI_CUT + data({ response: { candidates: [{ finishReason: "STOP" }] } }),
    "m"
  ) as ChatBody;
  assert.equal(stop.choices[0].finish_reason, "stop");
  const length = parseSSEToGeminiResponse(
    GEMINI_CUT + data({ response: { candidates: [{ finishReason: "MAX_TOKENS" }] } }),
    "m"
  ) as ChatBody;
  assert.equal(length.choices[0].finish_reason, "length");
});

// ── End to end through the non-streaming reader (both arms) ─────────────────────
function streamResponse(sse: string): Response {
  const bytes = new TextEncoder().encode(sse);
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      // Two chunks, then a clean close with no terminal marker.
      controller.enqueue(bytes.slice(0, Math.floor(bytes.length / 2)));
      controller.enqueue(bytes.slice(Math.floor(bytes.length / 2)));
      controller.close();
    },
  });
  return new Response(body, { headers: { "content-type": "text/event-stream" } });
}

for (const upstreamStream of [true, false]) {
  test(`#18432 parseNonStreamingResponseBody (upstreamStream=${upstreamStream}) reports a cut stream as length`, async () => {
    const result = await parseNonStreamingResponseBody({
      providerResponse: upstreamStream
        ? streamResponse(OPENAI_CUT)
        : new Response(OPENAI_CUT, { headers: { "content-type": "text/event-stream" } }),
      upstreamStream,
      providerHeaders: null,
      finalBody: null,
      targetFormat: "openai",
      model: "moonshot/kimi-k3",
    });
    assert.equal(result.kind, "ok");
    if (result.kind !== "ok") return;
    const choice = (result.responseBody as ChatBody).choices[0];
    assert.equal(choice.message.content, "## 6\n\n| Var");
    assert.equal(choice.finish_reason, "length");
  });

  test(`#18432 parseNonStreamingResponseBody (upstreamStream=${upstreamStream}) keeps stop on a complete stream`, async () => {
    const sse = OPENAI_CUT + openAiChunk({ content: " |" }, "stop") + "data: [DONE]\n\n";
    const result = await parseNonStreamingResponseBody({
      providerResponse: upstreamStream
        ? streamResponse(sse)
        : new Response(sse, { headers: { "content-type": "text/event-stream" } }),
      upstreamStream,
      providerHeaders: null,
      finalBody: null,
      targetFormat: "openai",
      model: "moonshot/kimi-k3",
    });
    assert.equal(result.kind, "ok");
    if (result.kind !== "ok") return;
    const choice = (result.responseBody as ChatBody).choices[0];
    assert.equal(choice.message.content, "## 6\n\n| Var |");
    assert.equal(choice.finish_reason, "stop");
  });
}
