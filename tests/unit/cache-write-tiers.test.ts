import assert from "node:assert/strict";
import { test } from "node:test";
import { extractUsage, normalizeUsage } from "../../open-sse/utils/usageTracking.ts";
import { extractUsageFromResponse } from "../../open-sse/handlers/usageExtractor.ts";
import { translateNonStreamingResponse } from "../../open-sse/handlers/responseTranslator.ts";
import { claudeToOpenAIResponse } from "../../open-sse/translator/response/claude-to-openai.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { createSSEStream } from "../../open-sse/utils/stream.ts";
import { readCacheWriteUsage } from "../../open-sse/utils/cacheWriteUsage.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

test.after(() => resetDbInstance());

const tiers = { ephemeral_5m_input_tokens: 30, ephemeral_1h_input_tokens: 70 };
const usage = {
  input_tokens: 10,
  output_tokens: 2,
  cache_creation_input_tokens: 100,
  cache_creation: tiers,
};
const message = {
  type: "message",
  id: "msg_synthetic",
  model: "synthetic-model",
  content: [{ type: "text", text: "ok" }],
  stop_reason: "end_turn",
  usage,
};

for (const [name, run] of [
  ["normalization", () => normalizeUsage(usage)],
  ["native nonstream", () => extractUsageFromResponse(message, "anthropic")],
  ["native stream", () => extractUsage({ type: "message_start", message: { usage } })],
  [
    "OpenAI nonstream",
    () =>
      extractUsageFromResponse(
        {
          usage: {
            prompt_tokens: 110,
            completion_tokens: 2,
            prompt_tokens_details: { cache_creation_tokens: 100, cache_creation: tiers },
          },
        },
        "compatible"
      ),
  ],
  [
    "Responses stream",
    () =>
      extractUsage({
        type: "response.completed",
        response: {
          usage: {
            input_tokens: 110,
            output_tokens: 2,
            input_tokens_details: { cache_creation_tokens: 100, cache_creation: tiers },
          },
        },
      }),
  ],
] as const) {
  test(`${name} preserves reported cache-write tiers without double counting`, () => {
    const result = run() as Record<string, unknown>;
    assert.deepEqual(result.cache_creation, tiers);
    assert.equal(result.cache_creation_input_tokens, 100);
  });
}

test("nonstream translation preserves tier usage", () => {
  const result = translateNonStreamingResponse(message, FORMATS.CLAUDE, FORMATS.OPENAI) as {
    usage: { prompt_tokens_details: Record<string, unknown> };
  };
  assert.deepEqual(result.usage.prompt_tokens_details.cache_creation, tiers);
});

test("stream translation keeps start tiers through an output-only delta", () => {
  const state = { toolCalls: new Map() };
  claudeToOpenAIResponse({ type: "message_start", message }, state);
  const chunks = claudeToOpenAIResponse(
    { type: "message_delta", usage: { output_tokens: 2 }, delta: { stop_reason: "end_turn" } },
    state
  );
  const last = chunks?.at(-1) as { usage: { prompt_tokens_details: Record<string, unknown> } };
  assert.deepEqual(last.usage.prompt_tokens_details.cache_creation, tiers);
});

for (const sourceFormat of [FORMATS.CLAUDE, FORMATS.OPENAI, FORMATS.OPENAI_RESPONSES]) {
  for (const tail of ["\n\n", ""]) {
    test(`real SSE ${sourceFormat} keeps tiers in completion accounting (tail=${tail.length})`, async () => {
      let completed: unknown;
      const events = [
        { type: "message_start", message },
        { type: "content_block_start", index: 0, content_block: { type: "text", text: "" } },
        { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: "ok" } },
        { type: "content_block_stop", index: 0 },
        { type: "message_delta", usage: { output_tokens: 2 }, delta: { stop_reason: "end_turn" } },
        { type: "message_stop" },
      ];
      const bytes = events
        .map(
          (event, index) =>
            `event: ${event.type}\ndata: ${JSON.stringify(event)}${index === events.length - 1 ? tail : "\n\n"}`
        )
        .join("");
      const upstream = new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(new TextEncoder().encode(bytes));
          controller.close();
        },
      });
      const stream = createSSEStream({
        mode: sourceFormat === FORMATS.CLAUDE ? "passthrough" : "translate",
        sourceFormat,
        targetFormat: FORMATS.CLAUDE,
        clientResponseFormat: sourceFormat,
        provider: "anthropic",
        model: "claude-synthetic",
        body: { messages: [{ role: "user", content: "synthetic" }] },
        onComplete(payload) {
          completed = payload.usage;
        },
      });
      const output = await new Response(upstream.pipeThrough(stream)).text();
      assert.ok(output.includes("ok"));
      const diagnostic = readCacheWriteUsage(completed);
      assert.equal(diagnostic.fiveMinute, 30);
      assert.equal(diagnostic.oneHour, 70);
      assert.equal(diagnostic.total, 100);
    });
  }
}
