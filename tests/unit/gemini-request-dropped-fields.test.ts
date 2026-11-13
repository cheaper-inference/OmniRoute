import test from "node:test";
import assert from "node:assert/strict";

import { geminiToOpenAIRequest } from "../../open-sse/translator/request/gemini-to-openai.ts";
import { antigravityToOpenAIRequest } from "../../open-sse/translator/request/antigravity-to-openai.ts";

// Raw Gemini bodies reach both translators. These fields used to be dropped without a trace.
type Body = Record<string, unknown>;
const translators: Array<[string, (body: Body) => Record<string, unknown>]> = [
  ["gemini", (body) => geminiToOpenAIRequest("m", body, false)],
  ["antigravity", (body) => antigravityToOpenAIRequest("m", { request: body }, false)],
];
const user = { role: "user", parts: [{ text: "hi" }] };
const tools = [{ functionDeclarations: [{ name: "lookup" }, { name: "other" }] }];
const withMode = (functionCallingConfig: Body): Body => ({
  contents: [user],
  tools,
  toolConfig: { functionCallingConfig },
});

for (const [name, translate] of translators) {
  test(`${name}: generationConfig.stopSequences becomes stop, capped at the 4 OpenAI allows`, () => {
    const body = {
      contents: [user],
      generationConfig: { stopSequences: ["A", "B", "C", "D", "E"] },
    };
    assert.deepEqual(translate(body).stop, ["A", "B", "C", "D"]);
    assert.equal(
      translate({ contents: [user], generationConfig: { stopSequences: [] } }).stop,
      undefined
    );
  });

  test(`${name}: toolConfig mode becomes tool_choice`, () => {
    assert.equal(translate(withMode({ mode: "NONE" })).tool_choice, "none");
    assert.equal(translate(withMode({ mode: "AUTO" })).tool_choice, undefined);
    assert.equal(translate(withMode({ mode: "ANY" })).tool_choice, "required");
    assert.deepEqual(
      translate(withMode({ mode: "ANY", allowedFunctionNames: ["lookup"] })).tool_choice,
      {
        type: "function",
        function: { name: "lookup" },
      }
    );
    assert.equal(
      translate(withMode({ mode: "ANY", allowedFunctionNames: ["lookup", "other"] })).tool_choice,
      "required"
    );
    assert.equal(translate(withMode({ mode: "VALIDATED" })).tool_choice, undefined);
  });

  test(`${name}: toolConfig without tools adds no tool_choice`, () => {
    const body = { contents: [user], toolConfig: { functionCallingConfig: { mode: "NONE" } } };
    assert.equal(translate(body).tool_choice, undefined);
  });
}

test("antigravity: fileData parts reach the OpenAI message", () => {
  const body = {
    contents: [
      {
        role: "user",
        parts: [
          { fileData: { mimeType: "image/png", fileUri: "https://example.test/y.png" } },
          { fileData: { mimeType: "application/pdf", fileUri: "gs://bucket/y.pdf" } },
          { text: "what is this" },
        ],
      },
    ],
  };
  const [message] = translators[1][1](body).messages as Array<{ content: unknown }>;
  assert.deepEqual(message.content, [
    { type: "image_url", image_url: { url: "https://example.test/y.png" } },
    { type: "file", file: { filename: "attachment.pdf", file_data: "gs://bucket/y.pdf" } },
    { type: "text", text: "what is this" },
  ]);
});

test("gemini: a single image part next to a function call keeps the image", () => {
  const body = {
    contents: [
      {
        role: "model",
        parts: [
          { inlineData: { mimeType: "image/png", data: "AAAA" } },
          { functionCall: { name: "lookup", args: {} } },
        ],
      },
    ],
  };
  const [message] = translators[0][1](body).messages as Array<Record<string, unknown>>;
  assert.deepEqual(message.content, [
    { type: "image_url", image_url: { url: "data:image/png;base64,AAAA" } },
  ]);
  assert.equal((message.tool_calls as unknown[]).length, 1);
});

test("gemini: a single text part next to a function call stays a plain string", () => {
  const body = {
    contents: [
      { role: "model", parts: [{ text: "hi" }, { functionCall: { name: "lookup", args: {} } }] },
    ],
  };
  const [message] = translators[0][1](body).messages as Array<Record<string, unknown>>;
  assert.equal(message.content, "hi");
});
