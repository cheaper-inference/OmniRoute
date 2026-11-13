import test from "node:test";
import assert from "node:assert/strict";
const { openaiToGeminiRequest } =
  await import("../../open-sse/translator/request/openai-to-gemini.ts");

test("Gemini 4 omits removed sampling parameters without changing older models", () => {
  for (const model of ["gemini-4-argon", "models/gemini-4-argon"]) {
    const result = openaiToGeminiRequest(
      model,
      {
        messages: [{ role: "user", content: "hello" }],
        temperature: 0.7,
        top_p: 0.9,
        top_k: 20,
      },
      false
    );
    for (const field of ["temperature", "topP", "topK"]) {
      assert.equal(result.generationConfig[field], undefined, `${model}: ${field}`);
    }
  }
  const older = openaiToGeminiRequest(
    "gemini-2.5-flash",
    {
      messages: [{ role: "user", content: "hello" }],
      temperature: 0.7,
      top_p: 0.9,
      top_k: 20,
    },
    false
  );
  assert.equal(older.generationConfig.temperature, 0.7);
});

test("tool-result images reach Gemini as media instead of JSON prompt text", () => {
  const result = openaiToGeminiRequest(
    "gemini-2.5-flash",
    {
      messages: [
        { role: "user", content: "take a screenshot" },
        {
          role: "assistant",
          tool_calls: [
            {
              id: "call_image",
              type: "function",
              function: { name: "screenshot", arguments: "{}" },
            },
          ],
        },
        {
          role: "tool",
          tool_call_id: "call_image",
          content: [
            { type: "text", text: "screen ready" },
            { type: "image_url", image_url: { url: "data:image/png;base64,AQIDBA==" } },
          ],
        },
      ],
    },
    false
  );
  const parts = result.contents.flatMap((content) => content.parts);
  assert.deepEqual(parts.find((part) => part.inlineData)?.inlineData, {
    mimeType: "image/png",
    data: "AQIDBA==",
  });
  assert.equal(
    parts.find((part) => part.functionResponse)?.functionResponse.response.result,
    "screen ready"
  );
});
