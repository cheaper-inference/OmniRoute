// Regression guard for #17841 — /v1beta dropped OpenAI usage-only chunks and
// never surfaced cached/reasoning token details to Gemini clients.
//
// The default executor forces `stream_options.include_usage: true`, so a real
// OpenAI upstream sends usage in a trailing `choices: []` chunk after the
// finish chunk (open-sse/utils/stream.ts forwards that chunk on purpose,
// #12151). `openAIChunkToGeminiChunk` returned null for it (no `choices[0]`),
// so `@google/genai` clients never received `usageMetadata` on the streaming
// path, and neither /v1beta path reported `cachedContentTokenCount` or
// (non-streaming) `thoughtsTokenCount` — the antigravity converter already
// maps both.
import test from "node:test";
import assert from "node:assert/strict";

import {
  openAIChunkToGeminiChunk,
  transformOpenAISSEToGeminiSSE,
  convertOpenAIResponseToGemini,
} from "../../open-sse/translator/response/openai-to-gemini-sse.ts";
import { translateNonStreamingResponse } from "../../open-sse/handlers/responseTranslator.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

const USAGE = {
  prompt_tokens: 100,
  completion_tokens: 20,
  total_tokens: 120,
  prompt_tokens_details: { cached_tokens: 64 },
  completion_tokens_details: { reasoning_tokens: 8 },
};

function sseResponse(events: string[]): Response {
  const body = events.map((e) => e + "\n\n").join("");
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(body));
      controller.close();
    },
  });
  return new Response(stream, { status: 200, headers: { "Content-Type": "text/event-stream" } });
}

async function readGeminiChunks(response: Response): Promise<Array<Record<string, unknown>>> {
  const text = await response.text();
  return text
    .split("\n")
    .filter((line) => line.startsWith("data:"))
    .map((line) => JSON.parse(line.slice(5).trim()) as Record<string, unknown>);
}

test("#17841 a trailing usage-only chunk becomes a Gemini usageMetadata chunk", () => {
  const chunk = openAIChunkToGeminiChunk({ choices: [], usage: USAGE }, "gemini-embedding-x");
  assert.ok(chunk, "usage-only chunk was dropped");
  assert.deepEqual(chunk.candidates, []);
  assert.equal(chunk.usageMetadata?.promptTokenCount, 100);
  assert.equal(chunk.usageMetadata?.candidatesTokenCount, 20);
  assert.equal(chunk.usageMetadata?.totalTokenCount, 120);
  assert.equal(chunk.usageMetadata?.cachedContentTokenCount, 64);
  assert.equal(chunk.usageMetadata?.thoughtsTokenCount, 8);
});

test("#17841 a chunk without choices and without usage is still dropped", () => {
  assert.equal(openAIChunkToGeminiChunk({ choices: [] }, "m"), null);
  assert.equal(openAIChunkToGeminiChunk({}, "m"), null);
});

test("#17841 the finish chunk carries the detail counters too", () => {
  const chunk = openAIChunkToGeminiChunk(
    {
      choices: [{ delta: {}, finish_reason: "stop" }],
      usage: USAGE,
    },
    "m"
  );
  assert.ok(chunk);
  assert.equal(chunk.usageMetadata?.cachedContentTokenCount, 64);
  assert.equal(chunk.usageMetadata?.thoughtsTokenCount, 8);
});

test("#17841 a full OpenAI stream relays the trailing usage-only chunk", async () => {
  const upstream = sseResponse([
    'data: {"choices":[{"delta":{"content":"Hi"},"finish_reason":null}]}',
    `data: ${JSON.stringify({ choices: [{ delta: {}, finish_reason: "stop" }], usage: USAGE })}`,
    `data: ${JSON.stringify({ choices: [], usage: USAGE })}`,
    "data: [DONE]",
  ]);
  const chunks = await readGeminiChunks(transformOpenAISSEToGeminiSSE(upstream, "m"));
  const usageChunks = chunks.filter((c) => c.usageMetadata);
  assert.ok(
    usageChunks.length >= 2,
    `expected the finish chunk and the trailing usage-only chunk to both carry usageMetadata, got ${JSON.stringify(chunks)}`
  );
  const last = usageChunks[usageChunks.length - 1];
  assert.equal(last.usageMetadata && last.usageMetadata.cachedContentTokenCount, 64);
});

test("#17841 non-streaming convertOpenAIResponseToGemini maps both detail counters", async () => {
  const upstream = new Response(
    JSON.stringify({
      choices: [{ message: { role: "assistant", content: "Hi" }, finish_reason: "stop" }],
      usage: USAGE,
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
  const result = (await (await convertOpenAIResponseToGemini(upstream, "m")).json()) as {
    usageMetadata?: Record<string, number>;
  };
  assert.equal(result.usageMetadata?.cachedContentTokenCount, 64);
  assert.equal(result.usageMetadata?.thoughtsTokenCount, 8);
});

test("#17841 translateNonStreamingResponse Gemini-family envelope maps both counters", () => {
  const result = translateNonStreamingResponse(
    {
      choices: [{ message: { role: "assistant", content: "Hi" }, finish_reason: "stop" }],
      usage: USAGE,
    },
    FORMATS.OPENAI,
    FORMATS.GEMINI
  ) as { response?: { usageMetadata?: Record<string, number> } };
  assert.equal(result.response?.usageMetadata?.cachedContentTokenCount, 64);
  assert.equal(result.response?.usageMetadata?.thoughtsTokenCount, 8);
});

test("#17841 zero detail counters stay absent, not 0", () => {
  const result = translateNonStreamingResponse(
    {
      choices: [{ message: { role: "assistant", content: "Hi" }, finish_reason: "stop" }],
      usage: { prompt_tokens: 5, completion_tokens: 2, total_tokens: 7 },
    },
    FORMATS.OPENAI,
    FORMATS.GEMINI
  ) as { response?: { usageMetadata?: Record<string, number> } };
  assert.equal("cachedContentTokenCount" in (result.response?.usageMetadata ?? {}), false);
  assert.equal("thoughtsTokenCount" in (result.response?.usageMetadata ?? {}), false);
});
