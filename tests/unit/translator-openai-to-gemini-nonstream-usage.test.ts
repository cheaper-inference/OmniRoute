import test from "node:test";
import assert from "node:assert/strict";

import { translateNonStreamingResponse } from "../../open-sse/handlers/responseTranslator.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

const openaiBody = (usage: Record<string, unknown>) => ({
  id: "chatcmpl-1",
  object: "chat.completion",
  model: "gpt-x",
  choices: [{ index: 0, message: { role: "assistant", content: "Hi" }, finish_reason: "stop" }],
  usage,
});

for (const client of [FORMATS.GEMINI, FORMATS.ANTIGRAVITY]) {
  test(`translateNonStreamingResponse OpenAI -> ${client}: maps reasoning and cached tokens`, () => {
    const out = translateNonStreamingResponse(
      openaiBody({
        prompt_tokens: 10,
        completion_tokens: 5,
        total_tokens: 15,
        prompt_tokens_details: { cached_tokens: 3 },
        completion_tokens_details: { reasoning_tokens: 2 },
      }),
      FORMATS.OPENAI,
      client
    ) as { response: { usageMetadata: Record<string, number> } };
    assert.deepEqual(out.response.usageMetadata, {
      promptTokenCount: 10,
      candidatesTokenCount: 5,
      totalTokenCount: 15,
      thoughtsTokenCount: 2,
      cachedContentTokenCount: 3,
    });
  });
}

test("translateNonStreamingResponse OpenAI -> Gemini: omits thought/cached counts when absent", () => {
  const out = translateNonStreamingResponse(
    openaiBody({ prompt_tokens: 4, completion_tokens: 1, total_tokens: 5 }),
    FORMATS.OPENAI,
    FORMATS.GEMINI
  ) as { response: { usageMetadata: Record<string, number> } };
  assert.deepEqual(out.response.usageMetadata, {
    promptTokenCount: 4,
    candidatesTokenCount: 1,
    totalTokenCount: 5,
  });
});
