import test from "node:test";
import assert from "node:assert/strict";
const { geminiToOpenAIResponse } =
  await import("../../open-sse/translator/response/gemini-to-openai.ts");

test("Gemini image parts keep their image when they carry a thought signature", () => {
  const state = { toolCalls: new Map() };
  const chunks =
    geminiToOpenAIResponse(
      {
        responseId: "image-signature",
        modelVersion: "gemini-3-image",
        candidates: [
          {
            content: {
              parts: [
                {
                  inlineData: { mimeType: "image/png", data: "AQID" },
                  thoughtSignature: "sig-image",
                },
              ],
            },
          },
        ],
      },
      state
    ) || [];
  const images = chunks.flatMap((chunk) => chunk.choices?.[0]?.delta?.images || []);
  assert.deepEqual(images, [
    { type: "image_url", image_url: { url: "data:image/png;base64,AQID" } },
  ]);
});
