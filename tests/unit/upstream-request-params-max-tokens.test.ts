import assert from "node:assert/strict";
import test from "node:test";
import { normalizeUpstreamRequestParams } from "../../open-sse/handlers/chatCore/upstreamRequestParams.ts";

function normalize(
  translatedBody: Record<string, unknown>,
  targetFormat: string,
  modelSupportsMaxTokens: boolean
) {
  normalizeUpstreamRequestParams({
    translatedBody,
    targetFormat,
    modelSupportsMaxTokens,
    provider: "anthropic-compatible-test",
    model: "test-model",
    providerSpecificData: null,
  });
  return translatedBody;
}

test("Claude targets preserve the required max_tokens even without model support metadata", () => {
  assert.deepEqual(normalize({ max_tokens: 64 }, "claude", false), { max_tokens: 64 });
});

test("Claude targets map max_completion_tokens back to max_tokens", () => {
  assert.deepEqual(normalize({ max_completion_tokens: 64 }, "claude", false), { max_tokens: 64 });
});

test("OpenAI targets still rename unsupported max_tokens (#1961)", () => {
  assert.deepEqual(normalize({ max_tokens: 64 }, "openai", false), { max_completion_tokens: 64 });
});

test("OpenAI targets still map back when max_tokens is supported (#6912)", () => {
  assert.deepEqual(normalize({ max_completion_tokens: 64 }, "openai", true), { max_tokens: 64 });
});

test("Claude targets preserve an explicit max_tokens when both fields are supplied", () => {
  assert.deepEqual(normalize({ max_tokens: 32, max_completion_tokens: 64 }, "claude", false), {
    max_tokens: 32,
  });
});
