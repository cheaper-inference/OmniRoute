import assert from "node:assert/strict";
import test from "node:test";
import { normalizeResponsesCompletedUsage } from "../../open-sse/utils/responsesStreamHelpers.ts";

test("normalizes null and non-numeric fields in input_tokens_details and output_tokens_details to integer 0 (issue #19320)", () => {
  const payload = {
    type: "response.completed",
    response: {
      usage: {
        input_tokens: 42,
        input_tokens_details: {
          cached_tokens: 0,
          cache_write_tokens: null,
          cache_creation_tokens: "invalid",
        },
        output_tokens: 7,
        output_tokens_details: {
          reasoning_tokens: null,
        },
        total_tokens: 49,
      },
    },
  };

  const changed = normalizeResponsesCompletedUsage(payload);
  assert.equal(changed, true);

  const usage = payload.response.usage as Record<string, Record<string, unknown> & number>;
  assert.equal(usage.input_tokens, 42);
  assert.equal(usage.output_tokens, 7);
  assert.equal(usage.total_tokens, 49);

  // Nested details must not contain null or NaN, which crashes Codex's serde i64 parser
  assert.equal(usage.input_tokens_details.cached_tokens, 0);
  assert.equal(usage.input_tokens_details.cache_write_tokens, 0);
  assert.equal(usage.input_tokens_details.cache_creation_tokens, 0);
  assert.equal(usage.output_tokens_details.reasoning_tokens, 0);
});

test("returns false when nested details are already valid finite numbers", () => {
  const payload = {
    type: "response.completed",
    response: {
      usage: {
        input_tokens: 42,
        input_tokens_details: {
          cached_tokens: 10,
          cache_write_tokens: 5,
        },
        output_tokens: 7,
        output_tokens_details: {
          reasoning_tokens: 2,
        },
        total_tokens: 49,
      },
    },
  };

  const changed = normalizeResponsesCompletedUsage(payload);
  assert.equal(changed, false);
});
