import assert from "node:assert/strict";
import { test } from "node:test";
import { openaiResponsesToOpenAIResponse } from "../../open-sse/translator/response/openai-responses.ts";
import { translateNonStreamingResponse } from "../../open-sse/handlers/responseTranslator.ts";
import { deriveUsageEvidence } from "../../open-sse/utils/usageEvidence.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

type Usage = { prompt_tokens_details?: { cached_tokens?: number } } & Record<string, unknown>;

const upstreamUsage = (cached?: number) => ({
  input_tokens: 6882,
  ...(cached === undefined ? {} : { input_tokens_details: { cached_tokens: cached } }),
  output_tokens: 14,
  total_tokens: 6896,
});

function streamUsage(cached?: number): Usage {
  const state: { toolCalls: Map<unknown, unknown>; usage?: Usage } = { toolCalls: new Map() };
  openaiResponsesToOpenAIResponse(
    { type: "response.completed", response: { usage: upstreamUsage(cached), output: [] } },
    state
  );
  return state.usage as Usage;
}

function nonStreamUsage(cached?: number): Usage {
  const body = {
    id: "resp_1",
    object: "response",
    model: "gpt-6.2-sol",
    status: "completed",
    output: [
      { type: "message", role: "assistant", content: [{ type: "output_text", text: "hi" }] },
    ],
    usage: upstreamUsage(cached),
  };
  return (
    translateNonStreamingResponse(body, FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI) as {
      usage: Usage;
    }
  ).usage;
}

test("control: positive cached_tokens is reported (stream + non-stream)", () => {
  for (const u of [streamUsage(6656), nonStreamUsage(6656)]) {
    assert.equal(u.prompt_tokens_details?.cached_tokens, 6656);
    assert.equal(deriveUsageEvidence(u).cacheRead.source, "reported");
  }
});

test("#20493 stream: explicit cached_tokens=0 is reported, not unknown", () => {
  const u = streamUsage(0);
  assert.equal(u.prompt_tokens_details?.cached_tokens, 0);
  assert.equal(deriveUsageEvidence(u).cacheRead.source, "reported");
});

test("#20493 non-stream: explicit cached_tokens=0 is reported, not unknown", () => {
  const u = nonStreamUsage(0);
  assert.equal(u.prompt_tokens_details?.cached_tokens, 0);
  assert.equal(deriveUsageEvidence(u).cacheRead.source, "reported");
});

test("absent cache counter stays absent -> evidence unknown", () => {
  for (const u of [streamUsage(), nonStreamUsage()]) {
    assert.equal(u.prompt_tokens_details, undefined);
    assert.equal(deriveUsageEvidence(u).cacheRead.source, "unknown");
  }
});
