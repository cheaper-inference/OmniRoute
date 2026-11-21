import test from "node:test";
import assert from "node:assert/strict";
import { sanitizeResponsesApiResponse } from "../../open-sse/handlers/responseSanitizer.ts";

function response(usage: Record<string, unknown>) {
  return {
    id: "resp_usage_regression",
    object: "response",
    status: "completed",
    output: [
      {
        id: "msg_usage_regression",
        type: "message",
        role: "assistant",
        status: "completed",
        content: [{ type: "output_text", text: "OK", annotations: [] }],
      },
    ],
    usage,
  };
}

test("non-streaming cache creation includes the required cached_tokens counter", () => {
  const result = sanitizeResponsesApiResponse(
    response({
      input_tokens: 8199,
      output_tokens: 4,
      total_tokens: 8203,
      input_tokens_details: { cache_creation_tokens: 7886, cache_creation_in_prompt: true },
    })
  );
  const usage = result.usage as Record<string, unknown>;
  assert.deepEqual(usage.input_tokens_details, {
    cached_tokens: 0,
    cache_creation_tokens: 7886,
    cache_creation_in_prompt: true,
  });
  assert.equal(usage.input_tokens, 8199);
  assert.equal(usage.output_tokens, 4);
  assert.equal(usage.total_tokens, 8203);
  assert.equal(JSON.stringify(result.output).includes('"text":"OK"'), true);
});

test("final sanitization preserves reported cache and reasoning usage", () => {
  const usage = {
    input_tokens: 8199,
    output_tokens: 4,
    total_tokens: 8203,
    input_tokens_details: {
      cached_tokens: 7000,
      cache_creation_tokens: 886,
      cache_creation_in_prompt: true,
    },
    output_tokens_details: { reasoning_tokens: 2 },
  };
  const snapshot = structuredClone(usage);
  const result = sanitizeResponsesApiResponse(response(usage));
  assert.deepEqual(result.usage, snapshot);
  assert.deepEqual(usage, snapshot);
});

test("final sanitization normalizes null counters and empty usage details", () => {
  const result = sanitizeResponsesApiResponse(
    response({
      input_tokens: 10,
      output_tokens: 2,
      total_tokens: 12,
      input_tokens_details: { cached_tokens: null, cache_write_tokens: null },
      output_tokens_details: {},
    })
  );
  const usage = result.usage as Record<string, unknown>;
  assert.deepEqual(usage.input_tokens_details, { cached_tokens: 0, cache_write_tokens: 0 });
  assert.deepEqual(usage.output_tokens_details, { reasoning_tokens: 0 });
});
