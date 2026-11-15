import assert from "node:assert/strict";
import test from "node:test";
import { finalizeStreamingUsage } from "../../open-sse/utils/finalizeStreamingUsage.ts";
import { completeTrailingUsagePayload } from "../../open-sse/utils/passthroughTrailingUsage.ts";
import { hasUsageReceipt, normalizeResponsesUsage } from "../../open-sse/utils/responsesUsage.ts";
import { resolvePartialStreamUsage } from "../../open-sse/utils/streamPartialUsage.ts";
import { deriveUsageEvidence } from "../../open-sse/utils/usageEvidence.ts";
import { geminiToOpenAIResponse } from "../../open-sse/translator/response/gemini-to-openai.ts";
import { createSSEStream } from "../../open-sse/utils/stream.ts";
import { createResponsesApiTransformStream } from "../../open-sse/transformer/responsesTransformer.ts";
import { openaiToOpenAIResponsesResponse } from "../../open-sse/translator/response/openai-responses.ts";
import { initState } from "../../open-sse/translator/index.ts";
import {
  drainTranslateFlushTail,
  type TranslateFlushTailContext,
} from "../../open-sse/utils/translateFlushTail.ts";
import type { UsageLike } from "../../open-sse/utils/usageTracking.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";
test.after(() => resetDbInstance());
const body = { messages: [{ role: "user", content: "Synthetic prompt" }] };

for (const total of [undefined, 97]) {
  test(`Gemini terminal updates only computed totals, reported=${total}`, () => {
    const state = { toolCalls: new Map() };
    geminiToOpenAIResponse(
      {
        candidates: [{ content: { parts: [{ text: "Hello " }] } }],
        usageMetadata: {
          promptTokenCount: 80,
          candidatesTokenCount: 10,
          ...(total === undefined ? {} : { totalTokenCount: total }),
        },
      },
      state
    );
    const output = geminiToOpenAIResponse(
      {
        candidates: [{ content: { parts: [] }, finishReason: "STOP" }],
        usageMetadata: { candidatesTokenCount: 20 },
      },
      state
    );
    const usage = output.find((event: { usage?: unknown }) => event.usage)?.usage;
    assert.equal(usage?.prompt_tokens, 80);
    assert.equal(usage?.completion_tokens, 20);
    assert.equal(usage?.total_tokens, total ?? 100);
  });
}
for (const invalid of ["invalid", "", NaN, -1, Infinity]) {
  test(`finalizer skips invalid primary aliases: ${String(invalid)}`, () => {
    const usage = finalizeStreamingUsage(
      {
        prompt_tokens: invalid,
        input_tokens: "80",
        completion_tokens: invalid,
        output_tokens: "9",
      } as unknown as UsageLike,
      body,
      0
    );
    assert.equal(usage.prompt_tokens, 80);
    assert.equal(usage.completion_tokens, 9);
    assert.equal(usage.usage_evidence?.input.source, "reported");
    assert.equal(usage.usage_evidence?.output.source, "reported");
  });
}
test("valid zero aliases are not skipped", () => {
  const usage = finalizeStreamingUsage(
    { prompt_tokens: 0, input_tokens: 80, completion_tokens: 0, output_tokens: 9 },
    body,
    0
  );
  assert.equal(usage.prompt_tokens, 0);
  assert.equal(usage.completion_tokens, 0);
});
for (const completion of [undefined, 7, 9]) {
  test(`cache-only and unchanged tails retain reported totals, output=${completion}`, () => {
    const previous = { prompt_tokens: 100, completion_tokens: 7, total_tokens: 113 };
    const payload = {
      choices: [],
      usage: {
        cached_tokens: 30,
        ...(completion === undefined ? {} : { completion_tokens: completion }),
      } as UsageLike,
    };
    completeTrailingUsagePayload(payload, previous, body, 0, "openai");
    assert.equal(payload.usage.total_tokens, completion === 9 ? 109 : 113);
  });
}
for (const total of [undefined, 100]) {
  test(`Responses partial receipts preserve reported totals, total=${total}`, () => {
    const initial = normalizeResponsesUsage(null, {
      input_tokens: 80,
      output_tokens: 9,
      ...(total === undefined ? {} : { total_tokens: total }),
    });
    const cached = normalizeResponsesUsage(initial, { cached_tokens: 30 });
    assert.equal(cached?.total_tokens, total ?? 89);
    const final = normalizeResponsesUsage(cached, { output_tokens: 20 });
    assert.equal(final?.total_tokens, total ?? 100);
  });
}
for (const aliases of [
  { inputTokens: 80, outputTokens: 9, totalTokens: 89 },
  { promptTokens: 80, completionTokens: 9, totalTokens: 89 },
]) {
  test(`Responses receipt recognizes ${Object.keys(aliases)[0]}`, async () => {
    assert.equal(hasUsageReceipt(aliases), true);
    const frames = [
      { choices: [{ index: 0, delta: { content: "answer" }, finish_reason: null }] },
      { choices: [{ index: 0, delta: {}, finish_reason: "stop" }], usage: aliases },
    ];
    const stream = createResponsesApiTransformStream(null, 60000);
    const wire = await new Response(
      new Response(
        frames.map((frame) => `data: ${JSON.stringify(frame)}\n\n`).join("")
      ).body!.pipeThrough(stream)
    ).text();
    const terminal = wire
      .split("\n")
      .filter((line) => line.startsWith("data: {"))
      .map((line) => JSON.parse(line.slice(6)))
      .find((event) => event.type === "response.completed");
    assert.equal(terminal?.response?.usage?.input_tokens, 80);
    assert.equal(terminal?.response?.usage?.output_tokens, 9);
    const state = initState("openai-responses");
    const events = frames
      .flatMap((frame) => openaiToOpenAIResponsesResponse(frame, state) ?? [])
      .concat(openaiToOpenAIResponsesResponse(null, state) ?? []);
    const completed = events.find((event) => event.event === "response.completed");
    assert.equal(completed?.data?.response?.usage?.total_tokens, 89);
  });
}
test("camel-case all-zero placeholder still waits", () => {
  assert.equal(hasUsageReceipt({ inputTokens: 0, outputTokens: 0, totalTokens: 0 }), false);
});
for (const cached of [0, 3584]) {
  test(`partial prompt cache hit alias retains ${cached}`, () => {
    const result = resolvePartialStreamUsage({
      reported: { prompt_tokens: 4000, completion_tokens: 1, prompt_cache_hit_tokens: cached },
      contentLength: 0,
      body,
    });
    assert.equal(result?.cache_read_input_tokens, cached);
    assert.equal(result?.usage_evidence?.cacheRead.source, "reported");
  });
}
for (const cached of ["0", "80", "100"]) {
  test(`numeric-string Gemini cache bounds: ${cached}`, () => {
    const evidence = deriveUsageEvidence({
      promptTokenCount: "80",
      cachedContentTokenCount: cached,
    });
    assert.equal(evidence.cacheRead.source, cached === "100" ? "unknown" : "reported");
  });
}
for (const ending of ["", "\n", "\n\n"]) {
  test(`translated tail includes full saved content ending=${JSON.stringify(ending)}`, async () => {
    let responseBody: unknown;
    const frames = [
      { choices: [{ index: 0, delta: { content: "Hello " }, finish_reason: null }] },
      { choices: [{ index: 0, delta: { content: "world" }, finish_reason: "stop" }] },
    ];
    const stream = createSSEStream({
      mode: "translate",
      targetFormat: "openai",
      sourceFormat: "openai",
      provider: "openai",
      body,
      onComplete(value) {
        responseBody = value.responseBody;
      },
    });
    const wire = await new Response(
      new Response(
        frames
          .map((frame, index) => `data: ${JSON.stringify(frame)}${index ? ending : "\n\n"}`)
          .join("")
      ).body!.pipeThrough(stream)
    ).text();
    assert.ok(wire.includes("world"));
    assert.equal(
      (responseBody as { choices: Array<{ message: { content: string } }> }).choices[0].message
        .content,
      "Hello world"
    );
  });
}
test("tail merges carry replacement computed-total provenance", () => {
  const state = { usage: { prompt_tokens: 80, completion_tokens: 7, total_tokens: 113 } };
  const context: TranslateFlushTailContext = {
    targetFormat: "openai",
    openaiFormat: "openai",
    openaiResponsesFormat: "openai-responses",
    body,
    state,
    sessionId: null,
    now: () => 0,
    getLastToolCallChunkTime: () => null,
    setLastToolCallChunkTime() {},
    getToolFinishTime: () => null,
    setToolFinishTime() {},
    noteReasoning() {},
    isDuplicateSequence: () => false,
    shouldDropCommentary: () => false,
    pushProviderPayload() {},
    emitFailureAndAbort: () => false,
    translateAndEmit() {},
  };
  drainTranslateFlushTail(['data: {"choices":[],"usage":{"completion_tokens":0}}'], null, context);
  const final = finalizeStreamingUsage(state.usage, body, 350);
  assert.equal(final.completion_tokens, 100);
  assert.equal(final.total_tokens, 180);
});

test("cache-only completion preserves prior computed-total provenance", () => {
  const prior = finalizeStreamingUsage({ prompt_tokens: 80 }, body, 35);
  const payload = { choices: [], usage: { cached_tokens: 30 } as UsageLike };
  completeTrailingUsagePayload(payload, prior, body, 35, "openai");
  assert.equal(finalizeStreamingUsage(payload.usage, body, 350).total_tokens, 180);
});

for (const format of ["claude", "gemini", "openai-responses"]) {
  for (const ending of ["", "\n", "\n\n"]) {
    test(`${format} translated tail accumulates once, ending=${JSON.stringify(ending)}`, async () => {
      let responseBody: unknown;
      const frame = (text: string) =>
        format === "claude"
          ? { type: "content_block_delta", index: 0, delta: { type: "text_delta", text } }
          : format === "gemini"
            ? { candidates: [{ index: 0, content: { role: "model", parts: [{ text }] } }] }
            : {
                type: "response.output_text.delta",
                item_id: "msg_synthetic",
                output_index: 0,
                content_index: 0,
                delta: text,
              };
      const stream = createSSEStream({
        mode: "translate",
        targetFormat: format,
        sourceFormat: "openai",
        provider: format,
        body,
        onComplete(value) {
          responseBody = value.responseBody;
        },
      });
      const wire = await new Response(
        new Response(
          `data: ${JSON.stringify(frame("Hello "))}\n\ndata: ${JSON.stringify(frame("world"))}${ending}`
        ).body!.pipeThrough(stream)
      ).text();
      assert.ok(wire.includes("world"));
      assert.equal(
        (responseBody as { choices: Array<{ message: { content: string } }> }).choices[0].message
          .content,
        "Hello world"
      );
    });
  }
}

for (const total of [undefined, 100]) {
  test(`both Responses adapters retain total provenance across cache-only tails, total=${total}`, async () => {
    const frames = [
      {
        choices: [{ index: 0, delta: { content: "answer" }, finish_reason: null }],
        usage: {
          prompt_tokens: 80,
          completion_tokens: 9,
          ...(total === undefined ? {} : { total_tokens: total }),
        },
      },
      { choices: [{ index: 0, delta: {}, finish_reason: "stop" }] },
      { choices: [], usage: { cached_tokens: 30 } },
    ];
    const wire = await new Response(
      new Response(
        frames.map((frame) => `data: ${JSON.stringify(frame)}\n\n`).join("")
      ).body!.pipeThrough(createResponsesApiTransformStream(null, 60000))
    ).text();
    const completed = wire
      .split("\n")
      .filter((line) => line.startsWith("data: {"))
      .map((line) => JSON.parse(line.slice(6)))
      .find((event) => event.type === "response.completed");
    assert.equal(completed.response.usage.total_tokens, total ?? 89);
    const state = initState("openai-responses");
    const events = frames.flatMap((frame) => openaiToOpenAIResponsesResponse(frame, state) ?? []);
    const terminal = events.find((event) => event.event === "response.completed");
    assert.equal(terminal?.data?.response?.usage?.total_tokens, total ?? 89);
  });
}
for (const aliases of [
  { cachedInputTokens: 0 },
  { cached_input_tokens: 0 },
  { prompt_cache_hit_tokens: 0 },
  { inputTokenDetails: { cachedTokens: 0 } },
  { input_token_details: { cacheReadTokens: 0 } },
]) {
  test(`Responses cache-only alias recognized: ${JSON.stringify(aliases)}`, () => {
    assert.equal(hasUsageReceipt(aliases), true);
    const result = normalizeResponsesUsage(null, aliases);
    assert.equal((result?.input_tokens_details as Record<string, unknown>)?.cached_tokens, 0);
  });
}

for (const total of [0, -1]) {
  test(`Responses nonpositive totals do not persist across partial receipts: ${total}`, () => {
    const initial = normalizeResponsesUsage(null, {
      input_tokens: 80,
      output_tokens: 9,
      total_tokens: total,
    });
    const cached = normalizeResponsesUsage(initial, { cached_tokens: 30 });
    assert.equal(cached?.total_tokens, 89);
    const final = normalizeResponsesUsage(cached, { output_tokens: 20 });
    assert.equal(final?.total_tokens, 100);
  });
}
