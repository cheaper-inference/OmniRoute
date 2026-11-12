import test from "node:test";
import assert from "node:assert/strict";

import {
  normalizeOpenAICompatibleFinishReason,
  openAIFinishReasonToClaudeStopReason,
} from "../../open-sse/utils/finishReason.ts";

test("Gemini SPII and IMAGE_SAFETY finish reasons map to content_filter", () => {
  for (const reason of ["SPII", "spii", "IMAGE_SAFETY", "image_safety"]) {
    assert.equal(
      normalizeOpenAICompatibleFinishReason(reason),
      "content_filter",
      `${reason} should map to content_filter`
    );
  }
});

test("a Gemini SPII block reads as a Claude refusal after normalization", () => {
  const openai = normalizeOpenAICompatibleFinishReason("SPII");
  assert.equal(openAIFinishReasonToClaudeStopReason(openai), "refusal");
});
