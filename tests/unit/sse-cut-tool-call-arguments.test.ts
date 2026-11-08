/**
 * #18460 follow-up — a buffered upstream stream (collected for a NON-streaming client)
 * that is cut while a tool call is still being emitted.
 *
 * #18460 reports a cut stream as truncated (`length` / `max_tokens` / `incomplete`), but
 * a cut in the middle of a tool call still reached the client as a completed tool call:
 * the parsers kept the call with its half-written `arguments`, and two normalizations
 * (`normalizeOpenAIToolFinishReasons` and `sanitizeOpenAIResponse`, plus the parsers'
 * own T18 rule) then forced `finish_reason: "tool_calls"` because `tool_calls` was
 * non-empty. A client would execute a tool with invalid JSON arguments.
 *
 * Contract now: when the stream was cut (no terminal signal) and any buffered tool call
 * has arguments that are not a complete JSON object, the parsers withhold the calls and
 * the turn is reported as cut (`length` / `max_tokens` / `incomplete`). A cut stream whose
 * calls are all complete keeps them (and `tool_calls`). Streams that reached their
 * terminal signal are untouched.
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
const { normalizeOpenAIToolFinishReasons } =
  await import("../../open-sse/handlers/chatCore/passthroughToolNames.ts");
const { sanitizeOpenAIResponse } = await import("../../open-sse/handlers/responseSanitizer.ts");

type ToolCall = { id: string; function: { name: string; arguments: string } };
type ChatBody = {
  choices: Array<{
    message: { content: string | null; tool_calls?: ToolCall[] };
    finish_reason: string;
  }>;
};
type ClaudeBlock = { type: string; text?: string; input?: unknown; name?: string };
type ClaudeBody = { stop_reason: string; content: ClaudeBlock[] };
type ResponsesItem = { type: string; arguments?: string; content?: Array<{ text: string }> };
type ResponsesBody = { status: string; output: ResponsesItem[] };

const data = (value: unknown) => `data: ${JSON.stringify(value)}\n\n`;
const named = (event: string, value: unknown) =>
  `event: ${event}\ndata: ${JSON.stringify(value)}\n\n`;

/** What an OpenAI chat client receives: the two finish_reason normalizations applied. */
function asChatClient(body: unknown): ChatBody {
  normalizeOpenAIToolFinishReasons(body);
  return sanitizeOpenAIResponse(body) as ChatBody;
}

// ── OpenAI chat chunks ──────────────────────────────────────────────────────────
const openAiChunk = (delta: Record<string, unknown>, finishReason: string | null = null) =>
  data({
    id: "chatcmpl_cut",
    model: "kimi-k3",
    choices: [{ index: 0, delta, finish_reason: finishReason }],
  });
const toolDelta = (index: number, fn: Record<string, unknown>, id?: string) =>
  openAiChunk({ tool_calls: [{ index, ...(id ? { id, type: "function" } : {}), function: fn }] });

const OPENAI_CUT_MID_CALL =
  openAiChunk({ role: "assistant", content: "Reading the file." }) +
  toolDelta(0, { name: "read_file", arguments: "" }, "call_1") +
  toolDelta(0, { arguments: '{"path":"/etc/' });

test("OpenAI chat: a stream cut mid tool call reports length and withholds the call", () => {
  const parsed = parseSSEToOpenAIResponse(OPENAI_CUT_MID_CALL, "m") as ChatBody;
  assert.equal(parsed.choices[0].finish_reason, "length");
  assert.equal(parsed.choices[0].message.tool_calls, undefined);
  assert.equal(parsed.choices[0].message.content, "Reading the file.");

  const client = asChatClient(parsed);
  assert.equal(client.choices[0].finish_reason, "length");
  assert.equal(client.choices[0].message.tool_calls, undefined);
});

test("OpenAI chat: a stream cut mid tool call with no text still reports length", () => {
  const sse =
    toolDelta(0, { name: "read_file", arguments: "" }, "call_1") +
    toolDelta(0, { arguments: '{"path":' });
  const client = asChatClient(parseSSEToOpenAIResponse(sse, "m"));
  assert.equal(client.choices[0].finish_reason, "length");
  assert.equal(client.choices[0].message.tool_calls, undefined);
});

test("OpenAI chat: a stream cut right after the call header (no arguments yet) reports length", () => {
  const sse = toolDelta(0, { name: "read_file", arguments: "" }, "call_1");
  const client = asChatClient(parseSSEToOpenAIResponse(sse, "m"));
  assert.equal(client.choices[0].finish_reason, "length");
  assert.equal(client.choices[0].message.tool_calls, undefined);
});

test("OpenAI chat: one complete call + one cut call withholds both and reports length", () => {
  const sse =
    toolDelta(0, { name: "read_file", arguments: '{"path":"/a"}' }, "call_1") +
    toolDelta(1, { name: "write_file", arguments: '{"path":"/b","body":"x' }, "call_2");
  const client = asChatClient(parseSSEToOpenAIResponse(sse, "m"));
  assert.equal(client.choices[0].finish_reason, "length");
  assert.equal(client.choices[0].message.tool_calls, undefined);
});

test("OpenAI chat: a stream cut after complete tool calls keeps them as tool_calls", () => {
  const sse =
    toolDelta(0, { name: "read_file", arguments: '{"path":' }, "call_1") +
    toolDelta(0, { arguments: '"/a"}' });
  const client = asChatClient(parseSSEToOpenAIResponse(sse, "m"));
  assert.equal(client.choices[0].finish_reason, "tool_calls");
  assert.equal(client.choices[0].message.tool_calls?.[0].function.arguments, '{"path":"/a"}');
});

test("OpenAI chat: a terminated stream keeps its tool call untouched (not a cut)", () => {
  const sse =
    toolDelta(0, { name: "read_file", arguments: '{"path":' }, "call_1") +
    openAiChunk({}, "tool_calls") +
    "data: [DONE]\n\n";
  const client = asChatClient(parseSSEToOpenAIResponse(sse, "m"));
  assert.equal(client.choices[0].finish_reason, "tool_calls");
  assert.equal(client.choices[0].message.tool_calls?.length, 1);
});

// ── Claude / Anthropic messages events ──────────────────────────────────────────
const CLAUDE_HEAD =
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
    delta: { type: "text_delta", text: "Reading the file." },
  }) +
  named("content_block_stop", { type: "content_block_stop", index: 0 }) +
  named("content_block_start", {
    type: "content_block_start",
    index: 1,
    content_block: { type: "tool_use", id: "toolu_1", name: "read_file", input: {} },
  });
const inputJson = (partial: string) =>
  named("content_block_delta", {
    type: "content_block_delta",
    index: 1,
    delta: { type: "input_json_delta", partial_json: partial },
  });

test("Claude: a stream cut mid input_json_delta reports max_tokens and drops the tool_use", () => {
  const parsed = parseSSEToClaudeResponse(
    CLAUDE_HEAD + inputJson('{"path":"/etc/'),
    "m"
  ) as ClaudeBody;
  assert.equal(parsed.stop_reason, "max_tokens");
  assert.deepEqual(
    parsed.content.map((block) => block.type),
    ["text"]
  );

  const client = asChatClient(translateNonStreamingResponse(parsed, "claude", "openai"));
  assert.equal(client.choices[0].finish_reason, "length");
  assert.equal(client.choices[0].message.tool_calls, undefined);
  assert.equal(client.choices[0].message.content, "Reading the file.");
});

test("Claude: a stream cut right after content_block_start (no input yet) drops the tool_use", () => {
  const parsed = parseSSEToClaudeResponse(CLAUDE_HEAD, "m") as ClaudeBody;
  assert.equal(parsed.stop_reason, "max_tokens");
  assert.equal(
    parsed.content.some((block) => block.type === "tool_use"),
    false
  );
});

test("Claude: a stream cut after a closed, complete tool_use keeps it", () => {
  const sse =
    CLAUDE_HEAD +
    inputJson('{"path":') +
    inputJson('"/a"}') +
    named("content_block_stop", { type: "content_block_stop", index: 1 });
  const parsed = parseSSEToClaudeResponse(sse, "m") as ClaudeBody;
  const toolUse = parsed.content.find((block) => block.type === "tool_use");
  assert.deepEqual(toolUse?.input, { path: "/a" });

  const client = asChatClient(translateNonStreamingResponse(parsed, "claude", "openai"));
  assert.equal(client.choices[0].finish_reason, "tool_calls");
});

test("Claude: a terminated stream keeps its tool_use untouched (not a cut)", () => {
  const sse =
    CLAUDE_HEAD +
    inputJson('{"path":"/a"}') +
    named("content_block_stop", { type: "content_block_stop", index: 1 }) +
    named("message_delta", {
      type: "message_delta",
      delta: { stop_reason: "tool_use", stop_sequence: null },
      usage: { output_tokens: 9 },
    }) +
    named("message_stop", { type: "message_stop" });
  const parsed = parseSSEToClaudeResponse(sse, "m") as ClaudeBody;
  assert.equal(parsed.stop_reason, "tool_use");
  assert.equal(parsed.content.filter((block) => block.type === "tool_use").length, 1);
});

// ── OpenAI Responses events ─────────────────────────────────────────────────────
const RESPONSES_HEAD =
  data({
    type: "response.created",
    response: { id: "resp_cut", model: "gpt-5.3-codex", status: "in_progress", output: [] },
  }) +
  data({
    type: "response.output_item.added",
    output_index: 0,
    item: {
      id: "fc_1",
      type: "function_call",
      call_id: "call_1",
      name: "read_file",
      arguments: "",
      status: "in_progress",
    },
  });
const argsDelta = (delta: string) =>
  data({
    type: "response.function_call_arguments.delta",
    item_id: "fc_1",
    output_index: 0,
    delta,
  });

test("Responses: a stream cut mid function_call arguments is incomplete without the call", () => {
  const parsed = parseSSEToResponsesOutput(
    RESPONSES_HEAD + argsDelta('{"path":"/etc/'),
    "m"
  ) as ResponsesBody;
  assert.equal(parsed.status, "incomplete");
  assert.equal(
    parsed.output.some((item) => item.type === "function_call"),
    false
  );

  const client = asChatClient(translateNonStreamingResponse(parsed, "openai-responses", "openai"));
  assert.equal(client.choices[0].finish_reason, "length");
  assert.equal(client.choices[0].message.tool_calls, undefined);
});

test("Responses: [DONE] after a cut function_call does not complete it", () => {
  const parsed = parseSSEToResponsesOutput(
    RESPONSES_HEAD + argsDelta('{"path":') + "data: [DONE]\n\n",
    "m"
  ) as ResponsesBody;
  assert.equal(parsed.status, "incomplete");
  assert.equal(
    parsed.output.some((item) => item.type === "function_call"),
    false
  );
});

test("Responses: a stream cut after a finished function_call keeps it", () => {
  const sse =
    RESPONSES_HEAD +
    argsDelta('{"path":"/a"}') +
    data({
      type: "response.output_item.done",
      output_index: 0,
      item: {
        id: "fc_1",
        type: "function_call",
        call_id: "call_1",
        name: "read_file",
        arguments: '{"path":"/a"}',
        status: "completed",
      },
    });
  const parsed = parseSSEToResponsesOutput(sse, "m") as ResponsesBody;
  const call = parsed.output.find((item) => item.type === "function_call");
  assert.equal(call?.arguments, '{"path":"/a"}');

  const client = asChatClient(translateNonStreamingResponse(parsed, "openai-responses", "openai"));
  assert.equal(client.choices[0].finish_reason, "tool_calls");
});

// ── Gemini / Antigravity candidates ─────────────────────────────────────────────
test("Gemini: function calls arrive whole, so a cut stream keeps them as tool_calls", () => {
  // Gemini delivers `functionCall.args` as a complete object in one part; there is no
  // partial-arguments state to cut, so the call is always executable.
  const sse = data({
    response: {
      candidates: [{ content: { parts: [{ functionCall: { name: "f", args: { a: 1 } } }] } }],
    },
  });
  const client = asChatClient(parseSSEToGeminiResponse(sse, "m"));
  assert.equal(client.choices[0].finish_reason, "tool_calls");
  assert.equal(client.choices[0].message.tool_calls?.[0].function.arguments, '{"a":1}');
});

// ── End to end through the non-streaming reader ─────────────────────────────────
test("parseNonStreamingResponseBody: a drained stream cut mid tool call is not a tool turn", async () => {
  const bytes = new TextEncoder().encode(OPENAI_CUT_MID_CALL);
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(bytes);
      controller.close();
    },
  });
  const result = await parseNonStreamingResponseBody({
    providerResponse: new Response(body, { headers: { "content-type": "text/event-stream" } }),
    upstreamStream: true,
    providerHeaders: null,
    finalBody: null,
    targetFormat: "openai",
    model: "moonshot/kimi-k3",
  });
  assert.equal(result.kind, "ok");
  if (result.kind !== "ok") return;
  const client = asChatClient(result.responseBody);
  assert.equal(client.choices[0].finish_reason, "length");
  assert.equal(client.choices[0].message.tool_calls, undefined);
});
