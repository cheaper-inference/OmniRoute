// A base64 image inside a Claude tool_result (the Read tool on a PNG, an MCP screenshot)
// was JSON.stringify'd into the functionResponse, handing Gemini the base64 as text.
// claude-to-openai.ts lifts it out (#5100); the direct Claude -> Gemini path now sends it
// as an inlineData part right after the tool responses, which is where the
// Claude -> OpenAI -> Gemini path puts it. Text that follows the tool_result is folded into
// functionResponse.response.result (#16601): Vertex Gemini 3.6+ Flash rejects a user turn
// that carries a text part next to a functionResponse (#16443), and Gemini 3 takes
// multimodal tool output inside the function response itself.
import test from "node:test";
import assert from "node:assert/strict";

const { claudeToGeminiRequest } =
  await import("../../open-sse/translator/request/claude-to-gemini.ts");
const { buildGeminiThoughtSignatureKey, storeGeminiThoughtSignature } =
  await import("../../open-sse/services/geminiThoughtSignatureStore.ts");

type Part = Record<string, unknown>;

const PNG = { inlineData: { mimeType: "image/png", data: "iVBORw0K" } };

function convert(ns: string, userContent: unknown[], { signed = true } = {}) {
  if (signed) {
    storeGeminiThoughtSignature(buildGeminiThoughtSignatureKey(ns, "tu_img"), "SIG_IMG");
  }
  const result = claudeToGeminiRequest(
    "gemini-2.5-pro",
    {
      messages: [
        {
          role: "assistant",
          content: [
            { type: "tool_use", id: "tu_img", name: "read_file", input: { path: "a.png" } },
          ],
        },
        { role: "user", content: userContent },
      ],
    },
    false,
    { _signatureNamespace: ns }
  );
  return result.contents.flatMap((c) => c.parts as Part[]);
}

const imageResult = (text?: string) => ({
  type: "tool_result",
  tool_use_id: "tu_img",
  content: [
    ...(text ? [{ type: "text", text }] : []),
    { type: "image", source: { type: "base64", media_type: "image/png", data: "iVBORw0K" } },
  ],
});

test("a tool_result image becomes inlineData, not base64 text", () => {
  const parts = convert("tool-image-signed", [imageResult("a.png (1x1)")]);

  assert.deepEqual(parts.slice(-2), [
    {
      functionResponse: { id: "tu_img", name: "read_file", response: { result: "a.png (1x1)" } },
    },
    PNG,
  ]);
});

test("text that follows an image tool_result is folded into the response; the image still follows it", () => {
  const parts = convert("tool-image-trailing-text", [
    imageResult(),
    { type: "text", text: "<system-reminder>keep going</system-reminder>" },
  ]);

  // The image is neither lost nor reordered: it stays right after the functionResponse,
  // and the trailing text reaches the model inside the response instead of as a loose
  // text part next to it (#16601 / #16443).
  assert.deepEqual(parts.slice(-2), [
    {
      functionResponse: {
        id: "tu_img",
        name: "read_file",
        response: {
          result:
            "[tool returned an image; see attached]\n<system-reminder>keep going</system-reminder>",
        },
      },
    },
    PNG,
  ]);
  assert.ok(
    !parts.some((p) => typeof p.text === "string" && p.text.includes("keep going")),
    "the trailing text must not also survive as a standalone text part"
  );
});

test("signature-less history keeps the image out of the context text", () => {
  const parts = convert("tool-image-unsigned", [imageResult("a.png (1x1)")], { signed: false });

  assert.ok(!JSON.stringify(parts.filter((p) => p.text)).includes("iVBORw0K"));
  assert.deepEqual(parts.at(-1), PNG);
});
