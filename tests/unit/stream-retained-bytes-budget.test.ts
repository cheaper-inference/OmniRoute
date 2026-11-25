import assert from "node:assert/strict";
import test from "node:test";
import { createSSEStream } from "../../open-sse/utils/stream.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { initState, translateResponse } from "../../open-sse/translator/index.ts";
import { transformOpenAISSEToGeminiSSE } from "../../open-sse/translator/response/openai-to-gemini-sse.ts";
import {
  chargeRetained,
  isRetainedBudgetExceeded,
} from "../../open-sse/utils/streamRetainedBudget.ts";

// Streaming translators keep tool-call arguments, reasoning text and thinking signatures in
// memory until the block closes. Each SSE line is capped, but these buffers grow across lines,
// so the stream carries a retained-size budget: past it, the stream ends with one error frame.

const BUDGET = 4096;
const FRAGMENTS = 200;
const FRAGMENT_LEN = 100;

process.env.OMNIROUTE_MAX_STREAM_RETAINED_BYTES = String(BUDGET);

// Distinct fragments: an identical or prefix-growing fragment is read as a repeated snapshot.
const fragment = (i: number) => `${i}:`.padEnd(FRAGMENT_LEN, "x");
const data = (obj: unknown) => `data: ${JSON.stringify(obj)}\n\n`;

type Failure = { status: number; message: string; code?: string };

async function runStream(
  lines: string[],
  opts: {
    mode: "translate" | "passthrough";
    targetFormat: string;
    sourceFormat: string;
    requestedThinking?: boolean;
  }
) {
  let failure: Failure | null = null;
  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const line of lines) controller.enqueue(new TextEncoder().encode(line));
      controller.close();
    },
  });
  const reader = source
    .pipeThrough(
      createSSEStream({
        mode: opts.mode,
        targetFormat: opts.targetFormat,
        sourceFormat: opts.sourceFormat,
        requestedThinking: opts.requestedThinking,
        ...(opts.mode === "passthrough" ? { clientResponseFormat: opts.sourceFormat } : {}),
        provider: "custom-upstream",
        model: "custom-model",
        body: { messages: [{ role: "user", content: "hi" }] },
        onFailure(payload: Failure) {
          failure = payload;
          return true;
        },
      })
    )
    .getReader();
  let output = "";
  try {
    while (true) {
      const result = await reader.read();
      if (result.done) break;
      output += new TextDecoder().decode(result.value);
    }
  } catch {
    // A terminated stream may reject the reader after the error frame; the frame is what counts.
  }
  return { output, failure: failure as Failure | null };
}

function assertOneBudgetErrorFrame(result: { output: string; failure: Failure | null }) {
  const frames = result.output.match(/invalid_sse_payload/g) ?? [];
  assert.equal(frames.length, 1, `expected exactly one error frame, got:\n${result.output}`);
  assert.equal(result.failure?.code, "invalid_sse_payload");
  assert.equal(result.failure?.status, 502);
}

function assertNoBudgetError(result: { output: string; failure: Failure | null }) {
  assert.doesNotMatch(result.output, /invalid_sse_payload/);
  assert.equal(result.failure, null);
}

// ── Claude upstream → OpenAI client (claude-to-openai) ─────────────────────────────────────

function claudeEvents(count: number) {
  const events: unknown[] = [
    { type: "message_start", message: { id: "msg_1", model: "m", role: "assistant" } },
    { type: "content_block_start", index: 0, content_block: { type: "thinking", thinking: "" } },
  ];
  for (let i = 0; i < count; i++) {
    events.push({
      type: "content_block_delta",
      index: 0,
      delta: { type: "thinking_delta", thinking: fragment(i) },
    });
    events.push({
      type: "content_block_delta",
      index: 0,
      delta: { type: "signature_delta", signature: fragment(i) },
    });
  }
  events.push({ type: "content_block_stop", index: 0 });
  events.push({
    type: "content_block_start",
    index: 1,
    content_block: { type: "tool_use", id: "toolu_1", name: "run", input: {} },
  });
  for (let i = 0; i < count; i++) {
    events.push({
      type: "content_block_delta",
      index: 1,
      delta: { type: "input_json_delta", partial_json: fragment(i) },
    });
  }
  events.push({ type: "content_block_stop", index: 1 });
  events.push({ type: "message_delta", delta: { stop_reason: "tool_use" }, usage: {} });
  events.push({ type: "message_stop" });
  return events;
}

test("claude-to-openai: tool arguments and thinking stay under the retained budget", () => {
  const state = initState(FORMATS.OPENAI);
  for (const event of claudeEvents(FRAGMENTS)) {
    translateResponse(FORMATS.CLAUDE, FORMATS.OPENAI, event, state);
  }
  let retained = 0;
  for (const call of state.toolCalls.values()) retained += call.function.arguments.length;
  for (const block of (state.claudeThinkingBlocks?.values?.() ?? []) as Iterable<{
    thinking?: string;
    signature?: string;
  }>) {
    retained += (block.thinking?.length ?? 0) + (block.signature?.length ?? 0);
  }
  assert.ok(retained <= BUDGET, `retained ${retained} > ${BUDGET}`);
});

test("claude-to-openai: an oversized stream ends with exactly one error frame", async () => {
  const result = await runStream(claudeEvents(FRAGMENTS).map(data), {
    mode: "translate",
    targetFormat: FORMATS.CLAUDE,
    sourceFormat: FORMATS.OPENAI,
  });
  assertOneBudgetErrorFrame(result);
});

test("claude-to-openai: a normal-size stream is unchanged", async () => {
  const result = await runStream(claudeEvents(3).map(data), {
    mode: "translate",
    targetFormat: FORMATS.CLAUDE,
    sourceFormat: FORMATS.OPENAI,
  });
  assertNoBudgetError(result);
  assert.match(result.output, /"finish_reason":"tool_calls"/);
});

// ── OpenAI upstream → Claude / Responses / Gemini clients ──────────────────────────────────

function openaiToolChunks(count: number) {
  const chunks: unknown[] = [
    {
      id: "c1",
      object: "chat.completion.chunk",
      model: "m",
      choices: [
        {
          index: 0,
          delta: {
            role: "assistant",
            tool_calls: [
              {
                index: 0,
                id: "call_1",
                type: "function",
                function: { name: "run", arguments: "" },
              },
            ],
          },
        },
      ],
    },
  ];
  for (let i = 0; i < count; i++) {
    chunks.push({
      id: "c1",
      object: "chat.completion.chunk",
      model: "m",
      choices: [
        { index: 0, delta: { tool_calls: [{ index: 0, function: { arguments: fragment(i) } }] } },
      ],
    });
  }
  chunks.push({
    id: "c1",
    object: "chat.completion.chunk",
    model: "m",
    choices: [{ index: 0, delta: {}, finish_reason: "tool_calls" }],
  });
  return chunks;
}

test("openai-to-claude: buffered tool arguments stay under the retained budget", () => {
  const state = initState(FORMATS.CLAUDE);
  for (const chunk of openaiToolChunks(FRAGMENTS).slice(0, -1)) {
    translateResponse(FORMATS.OPENAI, FORMATS.CLAUDE, chunk, state);
  }
  let retained = 0;
  for (const info of state.toolCalls.values()) retained += info.argBuffer?.length ?? 0;
  assert.ok(retained > 0 && retained <= BUDGET, `retained ${retained}`);
});

test("openai-to-claude: an oversized stream ends with exactly one error frame", async () => {
  const result = await runStream(openaiToolChunks(FRAGMENTS).map(data), {
    mode: "translate",
    targetFormat: FORMATS.OPENAI,
    sourceFormat: FORMATS.CLAUDE,
  });
  assertOneBudgetErrorFrame(result);
});

test("openai-to-claude: a normal-size stream is unchanged", async () => {
  const result = await runStream(openaiToolChunks(3).map(data), {
    mode: "translate",
    targetFormat: FORMATS.OPENAI,
    sourceFormat: FORMATS.CLAUDE,
  });
  assertNoBudgetError(result);
  assert.match(result.output, /"stop_reason":"tool_use"/);
});

for (const requestedThinking of [true, false]) {
  const mode = requestedThinking ? "deferred" : "opt-out";
  test(`openai-to-claude: over-budget ${mode} reasoning leaves tool arguments intact`, async () => {
    const chunk = (delta: object, finishReason: string | null = null) => ({
      id: "chatcmpl_budget_fixture",
      model: "m",
      choices: [{ index: 0, delta, finish_reason: finishReason }],
    });
    const result = await runStream(
      [
        chunk({
          tool_calls: [
            { index: 0, id: "call_1", function: { name: "weather", arguments: '{"city":' } },
          ],
        }),
        chunk({ reasoning_content: "Drop this over-budget summary.".padEnd(BUDGET, "x") }),
        chunk({ reasoning_content: "This summary fits." }),
        chunk({ tool_calls: [{ index: 0, function: { arguments: '"Paris"}' } }] }),
        chunk({}, "tool_calls"),
      ].map(data),
      {
        mode: "translate",
        targetFormat: FORMATS.OPENAI,
        sourceFormat: FORMATS.CLAUDE,
        requestedThinking,
      }
    );

    assertNoBudgetError(result);
    assert.doesNotMatch(result.output, /Drop this over-budget summary/);
    const events = [...result.output.matchAll(/^data: (\{.*\})$/gm)].map((match) =>
      JSON.parse(match[1])
    );
    const args = events
      .filter((event) => event.delta?.type === "input_json_delta")
      .map((event) => event.delta.partial_json)
      .join("");
    assert.deepEqual(JSON.parse(args), { city: "Paris" });
    assert.deepEqual(
      events
        .filter((event) => event.delta?.type === "thinking_delta")
        .map((event) => event.delta.thinking),
      requestedThinking ? ["This summary fits."] : []
    );
    assert.match(result.output, /"stop_reason":"tool_use"/);
  });
}

test("admitted optional retention counts toward the hard cap and cannot clear a required failure", () => {
  const state = {};
  assert.equal(chargeRetained(state, BUDGET - 1, { optional: true }), true);
  assert.equal(chargeRetained(state, 2, { optional: true }), false);
  assert.equal(isRetainedBudgetExceeded(state), false);
  assert.equal(chargeRetained(state, 1), true);
  assert.equal(chargeRetained(state, 1), false);
  assert.equal(isRetainedBudgetExceeded(state), true);
  assert.equal(chargeRetained(state, 1, { optional: true }), false);
  assert.equal(chargeRetained(state, 1), false);
});

test("openai-to-responses: buffered tool arguments stay under the retained budget", () => {
  const state = initState(FORMATS.OPENAI_RESPONSES);
  for (const chunk of openaiToolChunks(FRAGMENTS).slice(0, -1)) {
    translateResponse(FORMATS.OPENAI, FORMATS.OPENAI_RESPONSES, chunk, state);
  }
  const retained = Object.values(state.funcArgsBuf as Record<string, string>).reduce(
    (sum, buf) => sum + buf.length,
    0
  );
  assert.ok(retained > 0 && retained <= BUDGET, `retained ${retained}`);
});

test("openai-to-responses: an oversized stream ends with exactly one error frame", async () => {
  const result = await runStream(openaiToolChunks(FRAGMENTS).map(data), {
    mode: "translate",
    targetFormat: FORMATS.OPENAI,
    sourceFormat: FORMATS.OPENAI_RESPONSES,
  });
  assertOneBudgetErrorFrame(result);
});

test("openai-to-gemini: accumulated tool arguments stay under the retained budget", () => {
  const state = initState(FORMATS.GEMINI);
  for (const chunk of openaiToolChunks(FRAGMENTS).slice(0, -1)) {
    translateResponse(FORMATS.OPENAI, FORMATS.GEMINI, chunk, state);
  }
  const retained = Object.values(
    state._toolCallAccum as Record<string, { arguments: string }>
  ).reduce((sum, entry) => sum + entry.arguments.length, 0);
  assert.ok(retained > 0 && retained <= BUDGET, `retained ${retained}`);
});

test("openai-to-gemini: an oversized stream ends with exactly one error frame", async () => {
  const result = await runStream(openaiToolChunks(FRAGMENTS).map(data), {
    mode: "translate",
    targetFormat: FORMATS.OPENAI,
    sourceFormat: FORMATS.GEMINI,
  });
  assertOneBudgetErrorFrame(result);
});

test("openai passthrough: an oversized tool-call stream ends with exactly one error frame", async () => {
  const result = await runStream([...openaiToolChunks(FRAGMENTS).map(data), "data: [DONE]\n\n"], {
    mode: "passthrough",
    targetFormat: FORMATS.OPENAI,
    sourceFormat: FORMATS.OPENAI,
  });
  assertOneBudgetErrorFrame(result);
});

test("openai passthrough: a normal-size tool-call stream is unchanged", async () => {
  const result = await runStream([...openaiToolChunks(3).map(data), "data: [DONE]\n\n"], {
    mode: "passthrough",
    targetFormat: FORMATS.OPENAI,
    sourceFormat: FORMATS.OPENAI,
  });
  assertNoBudgetError(result);
});

test("OpenAI SSE → Gemini SSE route transformer ends an oversized stream with one error frame", async () => {
  const body = openaiToolChunks(FRAGMENTS).map(data).join("");
  const response = transformOpenAISSEToGeminiSSE(
    new Response(body, { headers: { "content-type": "text/event-stream" } }),
    "m"
  );
  const output = await response.text();
  assert.equal((output.match(/invalid_sse_payload/g) ?? []).length, 1, output);
  assert.doesNotMatch(output, /functionCall/);
});

// ── Responses upstream → OpenAI client (openai-responses) ──────────────────────────────────

function responsesEvents(count: number) {
  const events: unknown[] = [
    { type: "response.created", response: { id: "resp_1", model: "m", status: "in_progress" } },
    {
      type: "response.output_item.added",
      output_index: 0,
      item: { type: "reasoning", id: "rs_1", summary: [] },
    },
  ];
  for (let i = 0; i < count; i++) {
    events.push({
      type: "response.reasoning_summary_text.delta",
      item_id: "rs_1",
      output_index: 0,
      summary_index: 0,
      delta: fragment(i),
    });
  }
  events.push({
    type: "response.output_item.added",
    output_index: 1,
    item: { type: "function_call", id: "fc_1", call_id: "call_1", name: "run", arguments: "" },
  });
  for (let i = 0; i < count; i++) {
    events.push({
      type: "response.function_call_arguments.delta",
      item_id: "fc_1",
      output_index: 1,
      delta: fragment(i),
    });
  }
  return events;
}

test("responses-to-openai: an oversized stream ends with exactly one error frame", async () => {
  const result = await runStream(responsesEvents(FRAGMENTS).map(data), {
    mode: "translate",
    targetFormat: FORMATS.OPENAI_RESPONSES,
    sourceFormat: FORMATS.OPENAI,
  });
  assertOneBudgetErrorFrame(result);
});

test("responses-to-openai: buffered function arguments stay under the retained budget", () => {
  const state = initState(FORMATS.OPENAI);
  for (const event of responsesEvents(FRAGMENTS)) {
    translateResponse(FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI, event, state);
  }
  let retained = 0;
  for (const entry of (state.toolCallByCallId?.values?.() ?? []) as Iterable<{
    argsBuffer?: string;
  }>) {
    retained += entry.argsBuffer?.length ?? 0;
  }
  assert.ok(retained <= BUDGET, `retained ${retained}`);
});

test("openai-to-responses: buffered reasoning text stays under the retained budget", () => {
  const state = initState(FORMATS.OPENAI_RESPONSES);
  for (let i = 0; i < FRAGMENTS; i++) {
    translateResponse(
      FORMATS.OPENAI,
      FORMATS.OPENAI_RESPONSES,
      {
        id: "c1",
        object: "chat.completion.chunk",
        model: "m",
        choices: [{ index: 0, delta: { reasoning_content: fragment(i) } }],
      },
      state
    );
  }
  assert.ok(state.reasoningBuf.length > 0, "reasoning was buffered");
  assert.ok(state.reasoningBuf.length <= BUDGET, `retained ${state.reasoningBuf.length}`);
});
