import assert from "node:assert/strict";
import test from "node:test";
import { createSSEStream } from "../../open-sse/utils/stream.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";
import { createGeneratedContentTracker } from "../../open-sse/utils/streamGeneratedContent.ts";
import { estimateOutputTokens } from "../../open-sse/utils/usageTracking.ts";
import { readStreamPartialUsage } from "../../open-sse/utils/streamPartialUsage.ts";
import { resolveTrailingUsageSummary } from "../../open-sse/utils/passthroughTrailingUsage.ts";

test.after(() => resetDbInstance());
const body = { messages: [{ role: "user", content: "A synthetic accounting request" }] };
const modes = ["translate", "passthrough"] as const;
const encodeEvents = (events: unknown[]) =>
  events.map((e) => `data: ${JSON.stringify(e)}\n\n`).join("");
async function run(mode: "translate" | "passthrough", blocks: unknown[], final = 0) {
  let receipt: Record<string, unknown> = {};
  const stream = createSSEStream({
    mode,
    targetFormat: FORMATS.CLAUDE,
    sourceFormat: mode === "translate" ? FORMATS.OPENAI : FORMATS.CLAUDE,
    clientResponseFormat: FORMATS.CLAUDE,
    provider: "anthropic",
    body,
    onComplete(result) {
      receipt = result.usage as Record<string, unknown>;
    },
  });
  const events = [
    {
      type: "message_start",
      message: {
        id: "msg_fixture",
        role: "assistant",
        content: [],
        usage: { input_tokens: 10, output_tokens: 0 },
      },
    },
    ...blocks,
    { type: "message_delta", delta: { stop_reason: "end_turn" }, usage: { output_tokens: final } },
    { type: "message_stop" },
  ];
  const bytes = new TextEncoder().encode(encodeEvents(events));
  const input = new ReadableStream({
    start(controller) {
      for (const byte of bytes) controller.enqueue(Uint8Array.of(byte));
      controller.close();
    },
  });
  const wire = await new Response(input.pipeThrough(stream)).text();
  return { receipt, wire };
}
for (const mode of modes) {
  test(`${mode}: zero final output with UTF-8 text is estimated independently of reported input`, async () => {
    const { receipt, wire } = await run(mode, [
      { type: "content_block_start", index: 0, content_block: { type: "text", text: "" } },
      {
        type: "content_block_delta",
        index: 0,
        delta: { type: "text_delta", text: "سلام synthetic answer" },
      },
      { type: "content_block_stop", index: 0 },
    ]);
    assert.equal(receipt.prompt_tokens, 10);
    assert.ok(Number(receipt.completion_tokens) > 0);
    assert.equal(receipt.estimated, true);
    assert.equal(receipt.cache_read_input_tokens, undefined);
    assert.equal(receipt.cache_creation_input_tokens, undefined);
    assert.ok(wire.includes("سلام"));
  });
  test(`${mode}: positive final receipt wins fallback`, async () => {
    const { receipt } = await run(
      mode,
      [
        {
          type: "content_block_start",
          index: 0,
          content_block: { type: "text", text: "initial generated answer" },
        },
        { type: "content_block_stop", index: 0 },
      ],
      37
    );
    assert.equal(receipt.completion_tokens, 37);
    assert.notEqual(receipt.estimated, true);
  });
  test(`${mode}: tool arguments counted once and evidence survives reconstructed summaries`, async () => {
    let complete: Record<string, unknown> = {};
    const stream = createSSEStream({
      mode,
      targetFormat: FORMATS.OPENAI,
      sourceFormat: FORMATS.OPENAI,
      clientResponseFormat: FORMATS.OPENAI,
      provider: "openai",
      body,
      onComplete(value) {
        complete = value as unknown as Record<string, unknown>;
      },
    });
    const args = '{"location":"synthetic location"}';
    const events = [
      {
        choices: [
          {
            index: 0,
            delta: {
              tool_calls: [
                {
                  index: 0,
                  id: "call_fixture",
                  type: "function",
                  function: { name: "lookup", arguments: args },
                },
              ],
            },
            finish_reason: null,
          },
        ],
      },
      { choices: [{ index: 0, delta: {}, finish_reason: "tool_calls" }] },
    ];
    await new Response(
      new Response(encodeEvents(events) + "data: [DONE]\n\n").body!.pipeThrough(stream)
    ).text();
    const receipt = complete.usage as Record<string, unknown>;
    assert.equal(receipt.completion_tokens, estimateOutputTokens(args.length));
    const summary = JSON.parse(JSON.stringify(complete.responseBody));
    assert.deepEqual(summary.usage.usage_evidence, receipt.usage_evidence);
    assert.deepEqual(readStreamPartialUsage(stream)?.usage_evidence, receipt.usage_evidence);
  });
  test(`${mode}: Responses tool deltas and completed snapshots do not double count`, async () => {
    let usage: Record<string, unknown> = {};
    const stream = createSSEStream({
      mode,
      targetFormat: FORMATS.OPENAI_RESPONSES,
      sourceFormat: FORMATS.OPENAI,
      clientResponseFormat: FORMATS.OPENAI_RESPONSES,
      provider: "openai",
      body,
      onComplete(result) {
        usage = result.usage as Record<string, unknown>;
      },
    });
    const args = '{"action":"synthetic tool argument"}';
    const item = {
      id: "fc_truthful",
      call_id: "call_truthful",
      name: "lookup",
      type: "function_call",
      arguments: args,
      status: "completed",
    };
    const response = { id: "resp_truthful", object: "response", status: "in_progress", output: [] };
    const events = [
      { type: "response.created", response },
      {
        type: "response.output_item.added",
        output_index: 0,
        item: { ...item, arguments: "", status: "in_progress" },
      },
      {
        type: "response.function_call_arguments.delta",
        output_index: 0,
        item_id: item.id,
        delta: args,
      },
      {
        type: "response.function_call_arguments.done",
        output_index: 0,
        item_id: item.id,
        arguments: args,
      },
      { type: "response.output_item.done", output_index: 0, item },
      {
        type: "response.completed",
        response: {
          ...response,
          status: "completed",
          output: [item],
          usage: { input_tokens: 10, output_tokens: 0, total_tokens: 10 },
        },
      },
    ];
    await new Response(new Response(encodeEvents(events)).body!.pipeThrough(stream)).text();
    assert.equal(usage.completion_tokens ?? usage.output_tokens, estimateOutputTokens(args.length));
  });
  test(`${mode}: concurrent native receipts do not share generated content`, async () => {
    const blocks = (text: string) => [
      { type: "content_block_start", index: 0, content_block: { type: "text", text } },
      { type: "content_block_stop", index: 0 },
    ];
    const [first, second] = await Promise.all([
      run(mode, blocks("tiny")),
      run(mode, blocks("a considerably longer synthetic output")),
    ]);
    assert.equal(first.receipt.completion_tokens, estimateOutputTokens(4));
    assert.equal(
      second.receipt.completion_tokens,
      estimateOutputTokens("a considerably longer synthetic output".length)
    );
  });
  test(`${mode}: error after native thinking/tool output retains mixed partial evidence`, async () => {
    let completion: Record<string, unknown> = {};
    const stream = createSSEStream({
      mode,
      targetFormat: FORMATS.CLAUDE,
      sourceFormat: FORMATS.OPENAI,
      clientResponseFormat: FORMATS.CLAUDE,
      provider: "anthropic",
      body,
      onComplete(value) {
        completion = value as unknown as Record<string, unknown>;
      },
    });
    const events = [
      {
        type: "message_start",
        message: {
          id: "msg_partial",
          role: "assistant",
          content: [],
          usage: { input_tokens: 10, output_tokens: 0 },
        },
      },
      {
        type: "content_block_start",
        index: 0,
        content_block: { type: "thinking", thinking: "thinking" },
      },
      {
        type: "content_block_delta",
        index: 0,
        delta: { type: "signature_delta", signature: "opaque" },
      },
      { type: "content_block_stop", index: 0 },
      {
        type: "content_block_start",
        index: 1,
        content_block: { type: "tool_use", id: "tool_partial", name: "lookup", input: {} },
      },
      {
        type: "content_block_delta",
        index: 1,
        delta: { type: "input_json_delta", partial_json: '{"a":1}' },
      },
      { type: "error", error: { type: "overloaded_error", message: "Synthetic upstream failure" } },
    ];
    await new Response(new Response(encodeEvents(events)).body!.pipeThrough(stream))
      .text()
      .catch(() => {});
    const receipt = (completion.usage ?? readStreamPartialUsage(stream)) as Record<string, unknown>;
    assert.equal(receipt.prompt_tokens, 10);
    assert.equal(
      receipt.completion_tokens,
      estimateOutputTokens("thinking".length + '{"a":1}'.length)
    );
    assert.deepEqual(receipt.usage_evidence, {
      input: { source: "reported" },
      output: { source: "estimated", method: "observed_characters" },
      cacheRead: { source: "unknown" },
      cacheCreation: { source: "unknown" },
    });
  });
  test(`${mode}: repeated OpenAI message snapshots after deltas are counted once`, async () => {
    let receipt: Record<string, unknown> = {};
    const stream = createSSEStream({
      mode,
      targetFormat: FORMATS.OPENAI,
      sourceFormat: FORMATS.OPENAI,
      clientResponseFormat: FORMATS.OPENAI,
      provider: "openai",
      body,
      onComplete(value) {
        receipt = value.usage as Record<string, unknown>;
      },
    });
    const tool = (args: string) => [
      {
        index: 0,
        id: "call_snapshot",
        type: "function",
        function: { name: "lookup", arguments: args },
      },
    ];
    const message = {
      role: "assistant",
      content: "hello synthetic",
      reasoning_content: "readable reasoning",
      tool_calls: tool('{"query":"fixture"}'),
    };
    const events = [
      {
        choices: [
          {
            index: 0,
            delta: {
              content: "hello ",
              reasoning_content: "readable ",
              tool_calls: tool('{"query":'),
            },
          },
        ],
      },
      { choices: [{ index: 0, message }] },
      { choices: [{ index: 0, message: JSON.parse(JSON.stringify(message)) }] },
      { choices: [{ index: 0, delta: { content: " answer" } }] },
      { choices: [{ index: 0, message: { ...message, content: message.content + " answer" } }] },
      { choices: [{ index: 0, delta: {}, finish_reason: "stop" }] },
    ];
    await new Response(
      new Response(encodeEvents(events) + "data: [DONE]\n\n").body!.pipeThrough(stream)
    ).text();
    assert.equal(
      receipt.completion_tokens,
      estimateOutputTokens(
        "hello synthetic answerreadable reasoning".length + '{"query":"fixture"}'.length
      )
    );
  });
}

test("raw content tracking excludes opaque data and does not repeat Responses snapshots", () => {
  const tracker = createGeneratedContentTracker();
  const args = '{"answer":"synthetic"}';
  const item = { id: "fc_fixture", type: "function_call", arguments: args };
  tracker.observe({
    type: "response.function_call_arguments.delta",
    item_id: item.id,
    delta: args,
  });
  tracker.observe({ type: "response.output_item.done", item });
  tracker.observe({ type: "response.completed", response: { output: [item] } });
  tracker.observe({
    type: "response.reasoning.encrypted_content.delta",
    delta: "opaque encrypted bytes",
  });
  assert.equal(tracker.getLength(), args.length);
});
test("Claude initial blocks, thinking and tool deltas are counted once without signatures", () => {
  const tracker = createGeneratedContentTracker();
  const initial = {
    type: "content_block_start",
    index: 0,
    content_block: { type: "text", text: "initial" },
  };
  tracker.observe(initial);
  tracker.observe(initial);
  tracker.observe({ ...initial });
  tracker.observe({
    type: "content_block_delta",
    index: 0,
    delta: { type: "text_delta", text: "text" },
  });
  tracker.observe({
    type: "content_block_start",
    index: 1,
    content_block: { type: "thinking", thinking: "thought" },
  });
  tracker.observe({
    type: "content_block_delta",
    index: 1,
    delta: { type: "signature_delta", signature: "not generated text" },
  });
  tracker.observe({
    type: "content_block_start",
    index: 2,
    content_block: { type: "tool_use", input: {} },
  });
  tracker.observe({
    type: "content_block_delta",
    index: 2,
    delta: { type: "input_json_delta", partial_json: '{"a":1}' },
  });
  assert.equal(tracker.getLength(), "initialtextthought".length + '{"a":1}'.length);
  assert.equal(createGeneratedContentTracker().getLength(), 0);
});
test("trailing input repair labels only input and preserves final reported output", () => {
  const result = resolveTrailingUsageSummary(
    { prompt_tokens: 0, completion_tokens: 19, total_tokens: 19 },
    null,
    body,
    700,
    FORMATS.OPENAI
  );
  assert.ok(result.prompt_tokens > 0);
  assert.equal(result.completion_tokens, 19);
  assert.equal(result.estimated, true);
  assert.deepEqual(result.usage_evidence, {
    input: { source: "estimated", method: "request_body_heuristic" },
    output: { source: "reported" },
    cacheRead: { source: "unknown" },
    cacheCreation: { source: "unknown" },
  });
});
test("output-only trailing receipt retains previous reported input and unknown cache", () => {
  const result = resolveTrailingUsageSummary(
    { completion_tokens: 7 },
    { prompt_tokens: 100, completion_tokens: 1 },
    body,
    700,
    FORMATS.OPENAI
  );
  assert.equal(result.prompt_tokens, 100);
  assert.equal(result.completion_tokens, 7);
  assert.notEqual(result.estimated, true);
  assert.deepEqual(result.usage_evidence, {
    input: { source: "reported" },
    output: { source: "reported" },
    cacheRead: { source: "unknown" },
    cacheCreation: { source: "unknown" },
  });
});
test("trailing repair and partial merge derive omitted totals without replacing reported totals", () => {
  const repaired = resolveTrailingUsageSummary(
    { prompt_tokens: 0, completion_tokens: 7 },
    null,
    body,
    70,
    FORMATS.OPENAI
  );
  assert.equal(repaired.total_tokens, repaired.prompt_tokens + 7);
  const merged = resolveTrailingUsageSummary(
    { completion_tokens: 7 },
    { prompt_tokens: 100, completion_tokens: 1, total_tokens: 101 },
    body,
    70,
    FORMATS.OPENAI
  );
  assert.equal(merged.total_tokens, 107);
  const reported = resolveTrailingUsageSummary(
    { prompt_tokens: 100, completion_tokens: 7, total_tokens: 109 },
    null,
    body,
    70,
    FORMATS.OPENAI
  );
  assert.equal(reported.total_tokens, 109);
});
test("passthrough wire trailing partial receipt keeps input and derives total", async () => {
  const stream = createSSEStream({
    mode: "passthrough",
    clientResponseFormat: FORMATS.OPENAI,
    provider: "openai",
    body,
    onComplete() {},
  });
  const events = [
    {
      choices: [{ index: 0, delta: { content: "synthetic" }, finish_reason: "stop" }],
      usage: { prompt_tokens: 100, completion_tokens: 1, total_tokens: 101 },
    },
    { choices: [], usage: { completion_tokens: 7 } },
  ];
  const wire = await new Response(
    new Response(encodeEvents(events) + "data: [DONE]\n\n").body!.pipeThrough(stream)
  ).text();
  const frames = wire
    .split("\n")
    .filter((line) => line.startsWith("data: {"))
    .map((line) => JSON.parse(line.slice(6)));
  const trailing = frames.find((frame) => frame.choices?.length === 0 && frame.usage)?.usage;
  assert.equal(trailing.prompt_tokens, 100);
  assert.equal(trailing.completion_tokens, 7);
  assert.equal(trailing.total_tokens, 107);
});
