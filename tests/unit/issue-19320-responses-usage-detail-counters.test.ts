import test from "node:test";
import assert from "node:assert/strict";

import { normalizeResponsesCompletedUsage } from "../../open-sse/utils/responsesStreamHelpers.ts";

// #19320: Codex parses the usage details counters of `response.completed` as i64.
// An explicit null (or a missing cached_tokens / reasoning_tokens in a present
// details object) fails the whole event, and Codex retries the turn until it gives up.

function completed(usage: Record<string, unknown>) {
  return {
    type: "response.completed",
    response: { id: "resp_19320", status: "completed", output: [], usage },
  };
}

test("null usage detail counters become 0", () => {
  const event = completed({
    input_tokens: 42,
    input_tokens_details: {
      cached_tokens: null,
      cache_write_tokens: null,
      cache_creation_tokens: null,
    },
    output_tokens: 7,
    output_tokens_details: { reasoning_tokens: null },
    total_tokens: 49,
  });

  assert.equal(normalizeResponsesCompletedUsage(event), true);
  assert.deepEqual(event.response.usage, {
    input_tokens: 42,
    input_tokens_details: { cached_tokens: 0, cache_write_tokens: 0, cache_creation_tokens: 0 },
    output_tokens: 7,
    output_tokens_details: { reasoning_tokens: 0 },
    total_tokens: 49,
  });
});

test("a single null counter is enough to rewrite the event", () => {
  const event = completed({
    input_tokens: 42,
    input_tokens_details: { cached_tokens: 0, cache_write_tokens: null },
    output_tokens: 7,
    output_tokens_details: { reasoning_tokens: 0 },
    total_tokens: 49,
  });

  assert.equal(normalizeResponsesCompletedUsage(event), true);
  assert.deepEqual(event.response.usage.input_tokens_details, {
    cached_tokens: 0,
    cache_write_tokens: 0,
  });
});

test("a present details object gets its required counter", () => {
  const event = completed({
    input_tokens: 10,
    input_tokens_details: { cache_creation_tokens: 4 },
    output_tokens: 2,
    output_tokens_details: {},
    total_tokens: 12,
  });

  assert.equal(normalizeResponsesCompletedUsage(event), true);
  assert.deepEqual(event.response.usage.input_tokens_details, {
    cache_creation_tokens: 4,
    cached_tokens: 0,
  });
  assert.deepEqual(event.response.usage.output_tokens_details, { reasoning_tokens: 0 });
});

test("the upstream details objects are copied, not mutated", () => {
  const inputDetails = { cached_tokens: null };
  const event = completed({
    input_tokens: 3,
    input_tokens_details: inputDetails,
    output_tokens: 1,
    total_tokens: 4,
  });

  assert.equal(normalizeResponsesCompletedUsage(event), true);
  assert.deepEqual(inputDetails, { cached_tokens: null });
  assert.deepEqual(event.response.usage.input_tokens_details, { cached_tokens: 0 });
});

test("valid, null or absent details objects are left as they are", () => {
  const valid = {
    input_tokens: 30,
    input_tokens_details: { cached_tokens: 12, cache_write_tokens: 5 },
    output_tokens: 9,
    output_tokens_details: { reasoning_tokens: 3 },
    total_tokens: 39,
  };
  const validEvent = completed(structuredClone(valid));
  assert.equal(normalizeResponsesCompletedUsage(validEvent), false);
  assert.deepEqual(validEvent.response.usage, valid);

  const withoutDetails = {
    input_tokens: 5,
    input_tokens_details: null,
    output_tokens: 1,
    total_tokens: 6,
  };
  const withoutDetailsEvent = completed(structuredClone(withoutDetails));
  assert.equal(normalizeResponsesCompletedUsage(withoutDetailsEvent), false);
  assert.deepEqual(withoutDetailsEvent.response.usage, withoutDetails);
});
