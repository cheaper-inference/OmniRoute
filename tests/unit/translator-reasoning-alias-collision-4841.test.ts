import test from "node:test";
import assert from "node:assert/strict";

const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

// Regression for upstream issue 9router#4841: serde-based OpenAI-compatible
// upstreams (z-ai GLM, Moonshot Kimi) declare `reasoning` as an alias of
// `reasoning_content`. A replayed assistant turn carrying BOTH keys is rejected
// with 400 "duplicate field `reasoning_content`". On reasoning-replay targets
// `reasoning_content` is the canonical carrier, so `reasoning` must be dropped.
const historyWith = (assistant: Record<string, unknown>) => ({
  messages: [
    { role: "user", content: "hi" },
    {
      role: "assistant",
      content: "ok",
      tool_calls: [{ id: "c1", type: "function", function: { name: "f", arguments: "{}" } }],
      ...assistant,
    },
    { role: "tool", tool_call_id: "c1", content: "r" },
    { role: "user", content: "say ok" },
  ],
});

const TARGETS: Array<[string, string]> = [
  ["glm", "glm-4.6-thinking"],
  ["moonshot", "kimi-k2.5"],
  ["moonshot", "kimi-k3"],
];

for (const [provider, model] of TARGETS) {
  test(`${provider}/${model}: assistant turn with both reasoning and reasoning_content forwards only reasoning_content (9router#4841)`, () => {
    const result = translateRequest(
      FORMATS.OPENAI,
      FORMATS.OPENAI,
      model,
      { model, ...historyWith({ reasoning: "dup test", reasoning_content: "dup test" }) },
      true,
      null,
      provider
    );
    const assistant = result.messages.find((m) => m.role === "assistant");
    assert.ok(assistant, "assistant message present");
    assert.equal(assistant.reasoning_content, "dup test");
    assert.equal("reasoning" in assistant, false, "alias `reasoning` must not be forwarded");
  });

  test(`${provider}/${model}: reasoning-only assistant turn is still promoted to reasoning_content (9router#4841)`, () => {
    const result = translateRequest(
      FORMATS.OPENAI,
      FORMATS.OPENAI,
      model,
      { model, ...historyWith({ reasoning: "only reasoning" }) },
      true,
      null,
      provider
    );
    const assistant = result.messages.find((m) => m.role === "assistant");
    assert.ok(assistant, "assistant message present");
    assert.equal(assistant.reasoning_content, "only reasoning");
    assert.equal("reasoning" in assistant, false, "alias `reasoning` must not be forwarded");
  });
}
