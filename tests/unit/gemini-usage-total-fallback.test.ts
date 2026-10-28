import test from "node:test";
import assert from "node:assert/strict";

const { translateNonStreamingResponse } =
  await import("../../open-sse/handlers/responseTranslator.ts");
const { parseSSEToGeminiResponse } =
  await import("../../open-sse/handlers/sseParser/geminiResponse.ts");
const { geminiToOpenAIResponse } =
  await import("../../open-sse/translator/response/gemini-to-openai.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

/**
 * When Gemini omits `usageMetadata.totalTokenCount`, every Gemini -> OpenAI
 * converter used to emit `total_tokens: 0` next to non-zero prompt/completion
 * counts. The generic usage normalizers only fill a total when it is
 * `undefined`, so the explicit 0 reached clients and billing. The total must
 * fall back to prompt + completion, while an upstream total stays authoritative.
 */

type UsageMetadata = Record<string, number>;

interface OpenAIUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  completion_tokens_details?: { reasoning_tokens: number };
}

function nonStreamingUsage(
  usageMetadata: UsageMetadata,
  target: string = FORMATS.GEMINI
): OpenAIUsage {
  const result = translateNonStreamingResponse(
    {
      responseId: "resp-usage",
      modelVersion: "gemini-2.5-flash",
      candidates: [{ content: { parts: [{ text: "hello" }] }, finishReason: "STOP" }],
      usageMetadata,
    },
    target,
    FORMATS.OPENAI
  );
  return result.usage as OpenAIUsage;
}

function sseUsage(usageMetadata: UsageMetadata): OpenAIUsage {
  const rawSSE = `data: ${JSON.stringify({
    response: {
      candidates: [{ content: { parts: [{ text: "hello" }] }, finishReason: "STOP" }],
      usageMetadata,
    },
  })}`;
  const parsed = parseSSEToGeminiResponse(rawSSE, "gemini-2.5-flash");
  assert.ok(parsed);
  return parsed.usage as OpenAIUsage;
}

function streamingUsage(usageMetadata: UsageMetadata): OpenAIUsage {
  const state = { toolCalls: new Map() };
  const chunks = geminiToOpenAIResponse(
    {
      responseId: "resp-stream-usage",
      modelVersion: "gemini-2.5-flash",
      candidates: [{ content: { parts: [{ text: "hello" }] }, finishReason: "STOP" }],
      usageMetadata,
    },
    state
  ) as Array<{ usage?: OpenAIUsage }>;
  const withUsage = chunks.filter((chunk) => chunk.usage);
  assert.ok(withUsage.length > 0, "expected a chunk carrying usage");
  return withUsage[withUsage.length - 1].usage as OpenAIUsage;
}

test("non-streaming: total_tokens sums prompt + completion when totalTokenCount is absent", () => {
  const usage = nonStreamingUsage({ promptTokenCount: 10, candidatesTokenCount: 20 });
  assert.deepEqual(usage, { prompt_tokens: 10, completion_tokens: 20, total_tokens: 30 });
});

test("non-streaming: reasoning tokens count toward completion and the derived total", () => {
  const usage = nonStreamingUsage({
    promptTokenCount: 10,
    candidatesTokenCount: 20,
    thoughtsTokenCount: 5,
  });
  assert.equal(usage.prompt_tokens, 10);
  assert.equal(usage.completion_tokens, 25);
  assert.equal(usage.total_tokens, 35);
  assert.equal(usage.completion_tokens_details?.reasoning_tokens, 5);
});

test("non-streaming: upstream totalTokenCount stays authoritative when it disagrees", () => {
  const usage = nonStreamingUsage({
    promptTokenCount: 10,
    candidatesTokenCount: 20,
    totalTokenCount: 14,
  });
  assert.equal(usage.total_tokens, 14);
});

test("non-streaming: empty usage metadata yields zeros, not NaN", () => {
  const usage = nonStreamingUsage({ promptTokenCount: 0 });
  assert.deepEqual(usage, { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 });
});

test("non-streaming: the Antigravity target derives the same total", () => {
  const usage = nonStreamingUsage(
    { promptTokenCount: 10, candidatesTokenCount: 20 },
    FORMATS.ANTIGRAVITY
  );
  assert.equal(usage.total_tokens, 30);
});

test("SSE accumulator: total_tokens sums prompt + completion when totalTokenCount is absent", () => {
  const usage = sseUsage({ promptTokenCount: 10, candidatesTokenCount: 20 });
  assert.deepEqual(usage, { prompt_tokens: 10, completion_tokens: 20, total_tokens: 30 });
});

test("SSE accumulator: upstream totalTokenCount stays authoritative", () => {
  const usage = sseUsage({ promptTokenCount: 10, candidatesTokenCount: 20, totalTokenCount: 14 });
  assert.equal(usage.total_tokens, 14);
});

test("streaming: total_tokens sums prompt + completion when totalTokenCount is absent", () => {
  const usage = streamingUsage({
    promptTokenCount: 10,
    candidatesTokenCount: 20,
    thoughtsTokenCount: 5,
  });
  assert.equal(usage.prompt_tokens, 10);
  assert.equal(usage.completion_tokens, 25);
  assert.equal(usage.total_tokens, 35);
});

test("streaming: upstream totalTokenCount stays authoritative", () => {
  const usage = streamingUsage({
    promptTokenCount: 10,
    candidatesTokenCount: 20,
    totalTokenCount: 14,
  });
  assert.equal(usage.total_tokens, 14);
});

test("invariant: a derived total is never below prompt + completion", () => {
  const cases: UsageMetadata[] = [
    { promptTokenCount: 10, candidatesTokenCount: 20 },
    { promptTokenCount: 7, candidatesTokenCount: 0, thoughtsTokenCount: 3 },
    { promptTokenCount: 0, candidatesTokenCount: 4 },
  ];
  for (const metadata of cases) {
    for (const usage of [
      nonStreamingUsage(metadata),
      sseUsage(metadata),
      streamingUsage(metadata),
    ]) {
      assert.equal(
        usage.total_tokens,
        usage.prompt_tokens + usage.completion_tokens,
        JSON.stringify(metadata)
      );
    }
  }
});
