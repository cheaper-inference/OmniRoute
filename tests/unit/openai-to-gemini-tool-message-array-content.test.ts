// Chat Completions allows a `tool` message whose content is an array of text parts.
// The OpenAI -> Gemini translator stored that array as is and wrapped it in
// functionResponse.response.result, so Gemini received a JSON list of {type, text}
// objects instead of the tool text. All-text arrays are joined into one string;
// arrays that carry a non-text part, and plain string results, stay unchanged.
import test from "node:test";
import assert from "node:assert/strict";

const { openaiToGeminiRequest } =
  await import("../../open-sse/translator/request/openai-to-gemini.ts");

type Part = Record<string, unknown>;

function translate(toolContent: unknown, options: Record<string, unknown> = {}): Part[] {
  const result = openaiToGeminiRequest(
    "gemini-2.5-pro",
    {
      messages: [
        { role: "user", content: "list files" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            { id: "call_1", type: "function", function: { name: "ls", arguments: "{}" } },
          ],
        },
        { role: "tool", tool_call_id: "call_1", content: toolContent },
      ],
    },
    false,
    null,
    options
  ) as { contents: Array<{ parts: Part[] }> };
  return result.contents.flatMap((c) => c.parts);
}

const resultOf = (parts: Part[]) =>
  (parts.find((p) => p.functionResponse)?.functionResponse as { response: { result: unknown } })
    .response.result;

test("an array of text parts is joined into one string result", () => {
  const parts = translate([
    { type: "text", text: "line one" },
    { type: "text", text: "line two" },
  ]);

  assert.equal(resultOf(parts), "line one\nline two");
});

test("a single text part becomes a plain string result", () => {
  assert.equal(resultOf(translate([{ type: "text", text: "only" }])), "only");
});

test("a string result is unchanged", () => {
  assert.equal(resultOf(translate("plain text")), "plain text");
});

test("an array with a non-text part is left unchanged", () => {
  const mixed = [
    { type: "text", text: "see image" },
    { type: "image_url", image_url: { url: "https://example.com/a.png" } },
  ];

  assert.deepEqual(resultOf(translate(mixed)), mixed);
});

test("an empty array is left unchanged", () => {
  assert.deepEqual(resultOf(translate([])), []);
});

test("the joined text also reaches the signature-less context fallback", () => {
  const parts = translate(
    [
      { type: "text", text: "line one" },
      { type: "text", text: "line two" },
    ],
    { signaturelessToolCallMode: "context" }
  );
  const text = parts.map((p) => p.text).join("");

  assert.match(text, /line one\nline two/);
  assert.ok(!text.includes('"type"'), "the part-list wrapper must not reach the context text");
});
