import test from "node:test";
import assert from "node:assert/strict";

const { buildGeminiUsageMetadata } =
  await import("../../open-sse/translator/response/geminiUsageMetadata.ts");
const { translateNonStreamingResponse } =
  await import("../../open-sse/handlers/responseTranslator.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

test("reasoning tokens are counted once: candidates exclude thoughts, the parts add up to the total", () => {
  const m = buildGeminiUsageMetadata({
    prompt_tokens: 10,
    completion_tokens: 100,
    total_tokens: 110,
    completion_tokens_details: { reasoning_tokens: 60 },
  });
  assert.equal(m.candidatesTokenCount, 40);
  assert.equal(m.thoughtsTokenCount, 60);
  assert.equal(m.promptTokenCount + m.candidatesTokenCount + (m.thoughtsTokenCount ?? 0), 110);
});

test("candidates never go below zero when reasoning exceeds completion", () => {
  const m = buildGeminiUsageMetadata({
    prompt_tokens: 1,
    completion_tokens: 5,
    total_tokens: 6,
    completion_tokens_details: { reasoning_tokens: 9 },
  });
  assert.equal(m.candidatesTokenCount, 0);
});

test("usage without reasoning keeps completion_tokens as candidates", () => {
  const m = buildGeminiUsageMetadata({ prompt_tokens: 3, completion_tokens: 7, total_tokens: 10 });
  assert.deepEqual(m, { promptTokenCount: 3, candidatesTokenCount: 7, totalTokenCount: 10 });
});

test("Responses-style usage names are read when the Chat names are absent", () => {
  const m = buildGeminiUsageMetadata({
    input_tokens: 10,
    output_tokens: 5,
    total_tokens: 15,
    input_tokens_details: { cached_tokens: 4 },
  });
  assert.deepEqual(m, {
    promptTokenCount: 10,
    candidatesTokenCount: 5,
    totalTokenCount: 15,
    cachedContentTokenCount: 4,
  });
});

test("the non-streaming Gemini-family path counts reasoning once too", () => {
  const out = translateNonStreamingResponse(
    {
      id: "chatcmpl-1",
      model: "m",
      choices: [{ index: 0, message: { role: "assistant", content: "hi" }, finish_reason: "stop" }],
      usage: {
        prompt_tokens: 10,
        completion_tokens: 100,
        total_tokens: 110,
        completion_tokens_details: { reasoning_tokens: 60 },
      },
    },
    FORMATS.OPENAI,
    FORMATS.GEMINI
  ) as { response: { usageMetadata: Record<string, number> } };
  assert.deepEqual(out.response.usageMetadata, {
    promptTokenCount: 10,
    candidatesTokenCount: 40,
    totalTokenCount: 110,
    thoughtsTokenCount: 60,
  });
});

test("the non-streaming Gemini-family path reads Responses-style usage names too", () => {
  const out = translateNonStreamingResponse(
    {
      id: "chatcmpl-2",
      model: "m",
      choices: [{ index: 0, message: { role: "assistant", content: "hi" }, finish_reason: "stop" }],
      usage: {
        input_tokens: 10,
        output_tokens: 100,
        total_tokens: 110,
        input_tokens_details: { cached_tokens: 4 },
        output_tokens_details: { reasoning_tokens: 60 },
      },
    },
    FORMATS.OPENAI,
    FORMATS.GEMINI
  ) as { response: { usageMetadata: Record<string, number> } };
  assert.deepEqual(out.response.usageMetadata, {
    promptTokenCount: 10,
    candidatesTokenCount: 40,
    totalTokenCount: 110,
    thoughtsTokenCount: 60,
    cachedContentTokenCount: 4,
  });
});
