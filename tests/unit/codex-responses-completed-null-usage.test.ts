import test from "node:test";
import assert from "node:assert/strict";

import { normalizeResponsesCompletedUsage } from "../../open-sse/utils/responsesStreamHelpers.ts";

test("normalizeResponsesCompletedUsage coerces null fields in input_tokens_details and output_tokens_details to 0 (#19320)", () => {
  const payload = {
    type: "response.completed",
    response: {
      usage: {
        input_tokens: 42,
        input_tokens_details: {
          cached_tokens: 0,
          cache_write_tokens: null,
          cache_creation_tokens: null,
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
  assert.equal(changed, true, "should report that payload changed");

  const usage = payload.response.usage as {
    input_tokens_details: Record<string, number>;
    output_tokens_details: Record<string, number>;
  };
  assert.equal(usage.input_tokens_details.cache_write_tokens, 0);
  assert.equal(usage.input_tokens_details.cache_creation_tokens, 0);
  assert.equal(usage.input_tokens_details.cached_tokens, 0);
  assert.equal(usage.output_tokens_details.reasoning_tokens, 0);
});

test("normalizeResponsesCompletedUsage handles null input_tokens_details (#19320)", () => {
  const payload = {
    type: "response.completed",
    response: {
      usage: {
        input_tokens: 10,
        output_tokens: 5,
        total_tokens: 15,
        input_tokens_details: null,
      },
    },
  };

  const changed = normalizeResponsesCompletedUsage(payload);
  assert.equal(changed, true);
  const usage = payload.response.usage as { input_tokens_details?: unknown };
  assert.equal(usage.input_tokens_details, undefined);
});

test("normalizeResponsesCompletedUsage is a no-op when details are already valid integers", () => {
  const payload = {
    type: "response.completed",
    response: {
      usage: {
        input_tokens: 100,
        output_tokens: 50,
        total_tokens: 150,
        input_tokens_details: {
          cached_tokens: 20,
          cache_write_tokens: 10,
        },
        output_tokens_details: {
          reasoning_tokens: 15,
        },
      },
    },
  };

  const changed = normalizeResponsesCompletedUsage(payload);
  assert.equal(changed, false);
});
