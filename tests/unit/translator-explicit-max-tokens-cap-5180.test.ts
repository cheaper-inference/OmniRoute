// Claude/Gemini/Antigravity -> OpenAI must honor an explicit client output cap even
// when tools are present, the same way OpenAI -> Claude already does (#16711). The
// tool floor (DEFAULT_MIN_TOKENS) used to raise a small explicit cap to 32000, so a
// 1-token prompt-cache warm call or a client that deliberately limits output got
// thousands of output tokens it never asked for.
import test from "node:test";
import assert from "node:assert/strict";

const { claudeToOpenAIRequest } =
  await import("../../open-sse/translator/request/claude-to-openai.ts");
const { geminiToOpenAIRequest } =
  await import("../../open-sse/translator/request/gemini-to-openai.ts");
const { antigravityToOpenAIRequest } =
  await import("../../open-sse/translator/request/antigravity-to-openai.ts");

const claudeTools = [{ name: "f", input_schema: { type: "object", properties: {} } }];
const claudeMessages = [{ role: "user", content: "hi" }];
const geminiTools = [
  { functionDeclarations: [{ name: "f", parameters: { type: "object", properties: {} } }] },
];
const geminiContents = [{ role: "user", parts: [{ text: "hi" }] }];

test("claude->openai honors an explicit max_tokens=1 cap with tools", () => {
  const out = claudeToOpenAIRequest(
    "gpt-x",
    { messages: claudeMessages, tools: claudeTools, max_tokens: 1 },
    false
  );
  assert.equal(out.max_tokens, 1);
});

test("claude->openai honors a small explicit cap (4096) with tools", () => {
  const out = claudeToOpenAIRequest(
    "gpt-x",
    { messages: claudeMessages, tools: claudeTools, max_tokens: 4096 },
    false
  );
  assert.equal(out.max_tokens, 4096);
});

test("claude->openai without max_tokens still leaves max_tokens unset", () => {
  const out = claudeToOpenAIRequest(
    "gpt-x",
    { messages: claudeMessages, tools: claudeTools },
    false
  );
  assert.equal(out.max_tokens, undefined);
});

test("gemini->openai honors an explicit maxOutputTokens with tools", () => {
  const out = geminiToOpenAIRequest(
    "gpt-x",
    { contents: geminiContents, tools: geminiTools, generationConfig: { maxOutputTokens: 256 } },
    false
  );
  assert.equal(out.max_tokens, 256);
});

test("gemini->openai without maxOutputTokens still leaves max_tokens unset", () => {
  const out = geminiToOpenAIRequest(
    "gpt-x",
    { contents: geminiContents, tools: geminiTools, generationConfig: {} },
    false
  );
  assert.equal(out.max_tokens, undefined);
});

test("antigravity->openai honors an explicit maxOutputTokens with tools", () => {
  const out = antigravityToOpenAIRequest(
    "gpt-x",
    {
      request: {
        contents: geminiContents,
        tools: geminiTools,
        generationConfig: { maxOutputTokens: 256 },
      },
    },
    false
  );
  assert.equal(out.max_tokens, 256);
});

test("antigravity->openai without maxOutputTokens still leaves max_tokens unset", () => {
  const out = antigravityToOpenAIRequest(
    "gpt-x",
    { request: { contents: geminiContents, tools: geminiTools, generationConfig: {} } },
    false
  );
  assert.equal(out.max_tokens, undefined);
});
