import assert from "node:assert/strict";
import test from "node:test";

import { resolveChatCoreTargetFormat } from "../../open-sse/handlers/chatCore/targetFormat.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { translateRequest } from "../../open-sse/translator/index.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

const model = "gpt-5.5";
const metadata = { summary: "detailed", mode: "pro" };
const messages = [{ role: "user", content: "hello" }];

test.after(() => resetDbInstance());

test("a model configured with the singular Responses target resolves to the Responses format", () => {
  const { targetFormat } = resolveChatCoreTargetFormat({
    provider: "openai-compatible-responses-example",
    resolvedModel: model,
    apiFormat: undefined,
    sourceFormat: FORMATS.OPENAI,
    customModelTargetFormat: FORMATS.OPENAI_RESPONSE,
    providerSpecificData: undefined,
  });

  assert.equal(targetFormat, FORMATS.OPENAI_RESPONSES);
});

test("Chat to the singular Responses target emits a Responses body with nested effort", () => {
  const out = translateRequest(FORMATS.OPENAI, FORMATS.OPENAI_RESPONSE, model, {
    messages,
    reasoning_effort: "high",
  });

  assert.equal(Object.hasOwn(out, "reasoning_effort"), false);
  assert.deepEqual(out.reasoning, { effort: "high", summary: "auto" });
  assert.equal(Object.hasOwn(out, "messages"), false);
  assert.ok(Array.isArray(out.input));
});

test("native Responses using the singular alias keeps its input and reasoning shape", () => {
  for (const sourceFormat of [FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI_RESPONSE]) {
    const out = translateRequest(sourceFormat, FORMATS.OPENAI_RESPONSE, model, {
      input: "hello",
      reasoning: { ...metadata, effort: "high" },
    });

    assert.deepEqual(out.reasoning, { ...metadata, effort: "high" });
    assert.equal(Object.hasOwn(out, "reasoning_effort"), false);
    assert.equal(Object.hasOwn(out, "messages"), false);
    assert.deepEqual(out.input, [
      { type: "message", role: "user", content: [{ type: "input_text", text: "hello" }] },
    ]);
  }
});

test("Chat to Responses keeps metadata alongside the effort", () => {
  const out = translateRequest(FORMATS.OPENAI, FORMATS.OPENAI_RESPONSES, model, {
    messages,
    reasoning: metadata,
    reasoning_effort: "high",
  });

  assert.deepEqual(out.reasoning, { ...metadata, effort: "high" });
  assert.equal(Object.hasOwn(out, "reasoning_effort"), false);
});

test("native Responses nests a flat none effort alongside existing metadata", () => {
  const out = translateRequest(FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI_RESPONSES, model, {
    input: "hello",
    reasoning: metadata,
    reasoning_effort: "none",
  });

  assert.deepEqual(out.reasoning, { ...metadata, effort: "none" });
  assert.equal(Object.hasOwn(out, "reasoning_effort"), false);
});

test("native Responses keeps an explicit nested effort and removes a conflicting flat effort", () => {
  const out = translateRequest(FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI_RESPONSES, model, {
    input: "hello",
    reasoning: { ...metadata, effort: "low" },
    reasoning_effort: "high",
  });

  assert.deepEqual(out.reasoning, { ...metadata, effort: "low" });
  assert.equal(Object.hasOwn(out, "reasoning_effort"), false);
});

test("Chat targets keep the flat effort", () => {
  const out = translateRequest(FORMATS.OPENAI, FORMATS.OPENAI, model, {
    messages,
    reasoning_effort: "high",
  });

  assert.equal(out.reasoning_effort, "high");
  assert.equal(Object.hasOwn(out, "reasoning"), false);
});
