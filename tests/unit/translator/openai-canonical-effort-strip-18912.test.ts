import test from "node:test";
import assert from "node:assert/strict";

const { translateRequest } = await import("../../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../../open-sse/translator/formats.ts");

// #18912: OmniRoute's canonical top-level `effort` is folded onto `reasoning_effort` /
// `reasoning.effort` by normalizeReasoningRequest, but the original key used to survive
// to the OpenAI wire, where Chat Completions rejects it with
// 400 "Unknown parameter: 'effort'".

function chatBody(extra: Record<string, unknown>) {
  return {
    model: "gpt-6.1-terra",
    messages: [{ role: "user", content: "Reply with OK" }],
    stream: false,
    ...extra,
  };
}

function toOpenAI(extra: Record<string, unknown>) {
  return translateRequest(
    FORMATS.OPENAI,
    FORMATS.OPENAI,
    "gpt-6.1-terra",
    chatBody(extra),
    false,
    null,
    "openai"
  ) as Record<string, unknown>;
}

test("canonical effort maps to reasoning_effort and never reaches the OpenAI wire", () => {
  const out = toOpenAI({ effort: "high" });
  assert.equal("effort" in out, false);
  assert.equal(out.reasoning_effort, "high");
});

test("explicit reasoning_effort wins over canonical effort and effort is still dropped", () => {
  const out = toOpenAI({ effort: "high", reasoning_effort: "low" });
  assert.equal("effort" in out, false);
  assert.equal(out.reasoning_effort, "low");
});

test("requests without any reasoning control stay free of reasoning fields", () => {
  const out = toOpenAI({});
  assert.equal("effort" in out, false);
  assert.equal(out.reasoning_effort, undefined);
});

test("Claude-source requests carrying canonical effort also drop it on the OpenAI target", () => {
  const out = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.OPENAI,
    "gpt-6.1-terra",
    {
      model: "gpt-6.1-terra",
      max_tokens: 64,
      messages: [{ role: "user", content: "hi" }],
      effort: "medium",
    },
    false,
    null,
    "openai"
  ) as Record<string, unknown>;
  assert.equal("effort" in out, false);
});
