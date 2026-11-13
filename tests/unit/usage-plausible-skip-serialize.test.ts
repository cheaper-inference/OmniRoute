import test from "node:test";
import assert from "node:assert/strict";

import {
  isInputTokenCountPlausible,
  sanitizeProviderUsageForRequest,
} from "../../open-sse/utils/usageTracking.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

// A body that counts how many times it is serialized: a deterministic stand-in for "was the whole
// request body stringified", with no timing involved.
function countingBody() {
  const state = { serialized: 0 };
  const body = {
    model: "m",
    messages: [{ role: "user", content: "hello" }],
    toJSON() {
      state.serialized++;
      return { model: "m", messages: [{ role: "user", content: "hello" }] };
    },
  };
  return { body, state };
}

test("a small reported input is plausible without serializing the body", () => {
  const { body, state } = countingBody();
  assert.equal(isInputTokenCountPlausible(100, body), true);
  assert.equal(isInputTokenCountPlausible(8192, body), true);
  assert.equal(state.serialized, 0);
});

test("sanitizing usage with a small reported input does not serialize the body", () => {
  const { body, state } = countingBody();
  const usage = { prompt_tokens: 50, completion_tokens: 5 };
  assert.equal(sanitizeProviderUsageForRequest(usage, body, FORMATS.OPENAI), usage);
  assert.equal(state.serialized, 0);
});

test("a huge reported input is still checked against the body size", () => {
  const { body, state } = countingBody();
  assert.equal(isInputTokenCountPlausible(5_000_000, body), false);
  assert.ok(state.serialized >= 1, "an implausible count needs the body size");
});

test("invalid counts stay invalid", () => {
  assert.equal(isInputTokenCountPlausible(-1, {}), false);
  assert.equal(isInputTokenCountPlausible(Number.NaN, {}), false);
  assert.equal(isInputTokenCountPlausible("12", {}), false);
});
