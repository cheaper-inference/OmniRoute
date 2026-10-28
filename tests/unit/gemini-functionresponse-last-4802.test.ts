import test from "node:test";
import assert from "node:assert/strict";

// Regression for 9router#4802: when a tool result (emitted as a role:"user" turn
// carrying functionResponse parts) is immediately followed by a plain user turn,
// the consecutive-same-role merge used to concatenate them as
// [functionResponse, text]. Gemini 4 (e.g. gemini-4-argon on Vertex) rejects a
// user turn whose last part is not a functionResponse with
// 400 INVALID_ARGUMENT "Requests ending with a model turn are not supported."
// [text, functionResponse] is accepted by Gemini 4, 3.x and 2.5 alike.
// On the Claude -> Gemini path #16601 goes one step further: that leading text is
// folded into functionResponse.response.result, so the turn carries the functionResponse
// alone (Vertex Gemini 3.6+ Flash rejects text next to a functionResponse, #16443).

const { openaiToGeminiRequest, mergeConsecutiveSameRoleContents } =
  await import("../../open-sse/translator/request/openai-to-gemini.ts");
const { claudeToGeminiRequest } =
  await import("../../open-sse/translator/request/claude-to-gemini.ts");
const {
  buildGeminiThoughtSignatureKey,
  storeGeminiThoughtSignature,
  clearGeminiThoughtSignatures,
} = await import("../../open-sse/services/geminiThoughtSignatureStore.ts");

type GeminiPart = Record<string, unknown>;
type GeminiContent = { role: string; parts: GeminiPart[] };

const partKind = (p: GeminiPart) => (p.functionResponse ? "functionResponse" : "other");

test("OpenAI -> Gemini: tool result followed by user turn puts functionResponse last", () => {
  const body = {
    messages: [
      { role: "user", content: "list files" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: "call_123",
            type: "function",
            function: { name: "read", arguments: '{"path":"foo"}' },
          },
        ],
      },
      { role: "tool", tool_call_id: "call_123", content: "file contents here" },
      { role: "user", content: "system reminder here" },
    ],
  };
  const result = openaiToGeminiRequest("gemini-4-argon", body, false) as {
    contents: GeminiContent[];
  };

  assert.deepEqual(
    result.contents.map((c) => c.role),
    ["user", "model", "user"]
  );
  const last = result.contents[2];
  assert.deepEqual(last.parts.map(partKind), ["other", "functionResponse"]);
  assert.equal(last.parts[0].text, "system reminder here");
  const fr = last.parts[1].functionResponse as { name: string };
  assert.equal(fr.name, "read");
});

test("Claude -> Gemini: tool_result followed by user turn puts functionResponse last", () => {
  // A cached signature makes the translator emit native functionCall /
  // functionResponse parts instead of the signature-less context-text fallback.
  const ns = "conn-4802";
  clearGeminiThoughtSignatures();
  storeGeminiThoughtSignature(buildGeminiThoughtSignatureKey(ns, "toolu_4802"), "SIG_4802");
  const result = claudeToGeminiRequest(
    "gemini-4-argon",
    {
      messages: [
        { role: "user", content: "list files" },
        {
          role: "assistant",
          content: [
            {
              type: "tool_use",
              id: "toolu_4802",
              name: "read",
              input: { path: "foo" },
            },
          ],
        },
        {
          role: "user",
          content: [{ type: "tool_result", tool_use_id: "toolu_4802", content: "file contents" }],
        },
        { role: "user", content: "system reminder here" },
      ],
    },
    false,
    { _signatureNamespace: ns }
  ) as { contents: GeminiContent[] };

  for (let i = 1; i < result.contents.length; i++) {
    assert.notEqual(result.contents[i].role, result.contents[i - 1].role);
  }
  const last = result.contents[result.contents.length - 1];
  assert.equal(last.role, "user");
  assert.ok(
    last.parts.some((p) => p.functionResponse),
    "expected a functionResponse part in the trailing user turn"
  );
  assert.equal(partKind(last.parts[last.parts.length - 1]), "functionResponse");
  // The reminder is not dropped: it is folded into the response (#16601), leaving the
  // functionResponse as the only part of the turn.
  assert.deepEqual(last.parts.map(partKind), ["functionResponse"]);
  const fr = last.parts[0].functionResponse as { name: string; response: { result: unknown } };
  assert.equal(fr.name, "read");
  assert.equal(fr.response.result, "file contents\nsystem reminder here");
});

test("mergeConsecutiveSameRoleContents keeps order stable within text and functionResponse groups", () => {
  const input: GeminiContent[] = [
    {
      role: "user",
      parts: [
        { functionResponse: { name: "a", response: {} } },
        { functionResponse: { name: "b", response: {} } },
      ],
    },
    { role: "user", parts: [{ text: "t1" }, { inlineData: { mimeType: "image/png", data: "x" } }] },
    { role: "user", parts: [{ text: "t2" }] },
  ];
  const merged = mergeConsecutiveSameRoleContents(input);
  assert.equal(merged.length, 1);
  assert.deepEqual(
    merged[0].parts.map((p) =>
      p.functionResponse ? `fr:${(p.functionResponse as { name: string }).name}` : (p.text ?? "img")
    ),
    ["t1", "img", "t2", "fr:a", "fr:b"]
  );
  // Inputs must not be mutated.
  assert.equal(input[0].parts.length, 2);
  assert.equal(input[1].parts.length, 2);
});

test("mergeConsecutiveSameRoleContents leaves non-merged turns untouched", () => {
  const input: GeminiContent[] = [
    { role: "user", parts: [{ functionResponse: { name: "a", response: {} } }, { text: "x" }] },
    { role: "model", parts: [{ text: "y" }] },
  ];
  const merged = mergeConsecutiveSameRoleContents(input);
  assert.deepEqual(merged, input);
});

test.after(() => {
  clearGeminiThoughtSignatures();
});
