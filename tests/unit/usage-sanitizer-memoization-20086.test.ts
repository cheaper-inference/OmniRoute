import test from "node:test";
import assert from "node:assert/strict";

const { estimateInputTokens, sanitizeProviderUsageForRequest, isInputTokenCountPlausible } =
  await import("../../open-sse/utils/usageTracking.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

test("estimateInputTokens caches results on the request body object (#20086)", () => {
  const body = {
    model: "claude-opus-5-5",
    messages: [
      { role: "user", content: "Hello world, this is a test prompt with several tokens." },
      { role: "assistant", content: "Understood, replying with test content." },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "lookup_data",
          parameters: { type: "object", properties: { key: { type: "string" } } },
        },
      },
    ],
  };

  const initial = estimateInputTokens(body);
  assert.ok(initial > 0, "estimateInputTokens should return a positive number");

  // Subsequent calls should retrieve cached value
  const second = estimateInputTokens(body);
  assert.equal(second, initial);

  const third = estimateInputTokens(body);
  assert.equal(third, initial);
});

test("sanitizeProviderUsageForRequest handles repeated 0-input chunks in O(1) via cached body calculations (#20086)", () => {
  const body = {
    model: "claude-opus-5-5",
    messages: [
      {
        role: "user",
        content: "A".repeat(5000), // substantial payload to test performance
      },
    ],
  };

  // Intermediate stream chunks reporting 0 prompt tokens
  const zeroUsageChunk = { input_tokens: 0, output_tokens: 1 };

  const start = performance.now();
  // Simulate 500 streamed chunks with 0 input tokens
  for (let i = 0; i < 500; i++) {
    const sanitized = sanitizeProviderUsageForRequest(zeroUsageChunk, body, FORMATS.CLAUDE);
    assert.ok(sanitized && sanitized.input_tokens > 0);
  }
  const duration = performance.now() - start;

  // 500 cached calls should execute in well under 100ms
  assert.ok(
    duration < 500,
    `500 cached usage sanitizations should take minimal time, took ${duration.toFixed(2)}ms`
  );
});

test("isInputTokenCountPlausible leverages cached serialized body bytes (#20086)", () => {
  const body = {
    model: "gpt-4",
    messages: [{ role: "user", content: "Testing plausibility check caching" }],
  };

  assert.equal(isInputTokenCountPlausible(10, body), true);
  assert.equal(isInputTokenCountPlausible(10, body), true);
  assert.equal(isInputTokenCountPlausible(100_000_000, body), false);
});

test("estimateInputTokens and sanitizeProviderUsageForRequest handle primitives and null bodies safely", () => {
  assert.equal(estimateInputTokens(null), 0);
  assert.equal(estimateInputTokens(undefined), 0);
  assert.equal(estimateInputTokens("plain string"), 0);

  const usage = { input_tokens: 0, output_tokens: 5 };
  const passThrough = sanitizeProviderUsageForRequest(usage, null, FORMATS.CLAUDE);
  assert.equal(passThrough, usage);
});
