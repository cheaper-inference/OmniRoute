import test from "node:test";
import assert from "node:assert/strict";

import { parseNonStreamingSSEPayload } from "../../open-sse/handlers/chatCore/nonStreamingSse.ts";
import { translateNonStreamingResponse } from "../../open-sse/handlers/responseTranslator.ts";
import { extractUsageFromResponse } from "../../open-sse/handlers/usageExtractor.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

type Usage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  prompt_tokens_details?: { cached_tokens: number };
};

// Synthetic source-path SSE fixture, not a live upstream or full HTTP E2E test.
function bufferedResponse(metadata: Record<string, number>, preferredFormat: string) {
  const frames = [
    { response: { candidates: [{ content: { parts: [{ text: "hello" }] } }] } },
    {
      response: {
        candidates: [{ finishReason: "STOP" }],
        usageMetadata: { promptTokenCount: 18020, candidatesTokenCount: 4, ...metadata },
      },
    },
  ];
  const rawSSE = `${frames.map((frame) => `data: ${JSON.stringify(frame)}\n\n`).join("")}data: [DONE]\n\n`;
  const parsed = parseNonStreamingSSEPayload(rawSSE, preferredFormat, "gemini-2.5-flash");
  assert.ok(parsed, "buffered parser must select a content parser");
  assert.equal(parsed.body.object, "chat.completion");
  assert.deepEqual(parsed.body.choices, [
    { index: 0, message: { role: "assistant", content: "hello" }, finish_reason: "stop" },
  ]);
  return parsed;
}

for (const format of [FORMATS.ANTIGRAVITY, FORMATS.GEMINI]) {
  test(`${format}: buffered cache-read usage reaches OpenAI clients and extraction`, () => {
    const parsed = bufferedResponse(
      { cachedContentTokenCount: 17000, totalTokenCount: 18024 },
      format
    );
    assert.equal(parsed.format, format);
    const client = translateNonStreamingResponse(parsed.body, parsed.format, FORMATS.OPENAI);
    assert.deepEqual(client.usage, {
      prompt_tokens: 18020,
      completion_tokens: 4,
      total_tokens: 18024,
      prompt_tokens_details: { cached_tokens: 17000 },
    });
    const extracted = extractUsageFromResponse(client, "antigravity");
    assert.equal(
      extracted.prompt_tokens,
      18020,
      "cache reads are already included in prompt tokens"
    );
    assert.equal(extracted.completion_tokens, 4);
    assert.equal(extracted.cached_tokens, 17000);
  });

  test(`${format}: buffered cache reads reach Claude as a prompt breakdown`, () => {
    const parsed = bufferedResponse({ cachedContentTokenCount: 17000 }, format);
    const usage = parsed.body.usage as Usage;
    assert.equal(usage.total_tokens, 18024, "missing total falls back to prompt + completion only");
    const client = translateNonStreamingResponse(parsed.body, parsed.format, FORMATS.CLAUDE);
    assert.deepEqual(client.usage, {
      input_tokens: 1020,
      output_tokens: 4,
      cache_read_input_tokens: 17000,
    });
    const extracted = extractUsageFromResponse(client, "antigravity");
    assert.equal(extracted.prompt_tokens, 18020, "uncached input + cache read = full prompt");
    assert.ok("cache_read_input_tokens" in extracted);
    assert.equal(extracted.cache_read_input_tokens, 17000);
  });

  for (const control of [
    { name: "zero", metadata: { cachedContentTokenCount: 0 } },
    { name: "missing", metadata: {} },
  ]) {
    test(`${format}: ${control.name} cache keeps the existing plain usage shape`, () => {
      const parsed = bufferedResponse(control.metadata, format);
      const client = translateNonStreamingResponse(parsed.body, parsed.format, FORMATS.OPENAI);
      assert.deepEqual(client.usage, {
        prompt_tokens: 18020,
        completion_tokens: 4,
        total_tokens: 18024,
      });
      assert.equal(extractUsageFromResponse(client, "antigravity").cached_tokens, undefined);
      const claude = translateNonStreamingResponse(parsed.body, parsed.format, FORMATS.CLAUDE);
      assert.deepEqual(claude.usage, { input_tokens: 18020, output_tokens: 4 });
    });
  }

  test(`${format}: upstream total stays authoritative with cached input`, () => {
    const parsed = bufferedResponse(
      { cachedContentTokenCount: 17000, totalTokenCount: 18030 },
      format
    );
    const usage = parsed.body.usage as Usage;
    assert.equal(usage.prompt_tokens, 18020);
    assert.equal(usage.completion_tokens, 4);
    assert.equal(usage.total_tokens, 18030);
    assert.equal(usage.prompt_tokens_details?.cached_tokens, 17000);
  });

  test(`${format}: zero upstream total retains the existing fallback with cached input`, () => {
    const parsed = bufferedResponse({ cachedContentTokenCount: 17000, totalTokenCount: 0 }, format);
    const usage = parsed.body.usage as Usage;
    assert.equal(usage.total_tokens, 18024);
    assert.equal(usage.prompt_tokens_details?.cached_tokens, 17000);
  });
}

test("buffered format fallback selects Gemini and retains cache-read usage", () => {
  const parsed = bufferedResponse({ cachedContentTokenCount: 17000 }, FORMATS.OPENAI);
  assert.equal(parsed.format, FORMATS.GEMINI);
  const client = translateNonStreamingResponse(parsed.body, parsed.format, FORMATS.OPENAI);
  assert.equal(extractUsageFromResponse(client, "antigravity").cached_tokens, 17000);
});

test("existing Claude uncached input plus cache reads remains an inclusive OpenAI prompt", () => {
  const client = translateNonStreamingResponse(
    {
      id: "msg-cache-control",
      type: "message",
      model: "claude-sonnet",
      content: [{ type: "text", text: "hello" }],
      stop_reason: "end_turn",
      usage: { input_tokens: 1020, output_tokens: 4, cache_read_input_tokens: 17000 },
    },
    FORMATS.CLAUDE,
    FORMATS.OPENAI
  );
  assert.deepEqual(client.usage, {
    prompt_tokens: 18020,
    completion_tokens: 4,
    total_tokens: 18024,
    prompt_tokens_details: { cached_tokens: 17000 },
  });
  const extracted = extractUsageFromResponse(client, "claude");
  assert.equal(extracted.prompt_tokens, 18020);
  assert.equal(extracted.cached_tokens, 17000);
});
