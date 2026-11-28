import test from "node:test";
import assert from "node:assert/strict";

const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const responsesBody = (model: string, effort: string) => ({
  model,
  input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }],
  reasoning_effort: effort,
});

function sameFormat(model: string, effort: string): Record<string, unknown> {
  return translateRequest(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI_RESPONSES,
    model,
    responsesBody(model, effort)
  ) as Record<string, unknown>;
}

test("a stray reasoning_effort max keeps max on a model that supports max", () => {
  const result = sameFormat("gpt-5.6-sol", "max");
  assert.deepEqual(result.reasoning, { effort: "max" });
  assert.equal("reasoning_effort" in result, false);
});

test("a stray reasoning_effort max is still lowered to xhigh on a model without max", () => {
  const result = sameFormat("gpt-5.1-codex", "max");
  assert.deepEqual(result.reasoning, { effort: "xhigh" });
});

test("the same-format route gives the same effort as the cross-format route for a max model", () => {
  const cross = translateRequest(FORMATS.OPENAI, FORMATS.OPENAI_RESPONSES, "gpt-5.6-sol", {
    model: "gpt-5.6-sol",
    messages: [{ role: "user", content: "hi" }],
    reasoning_effort: "max",
  }) as Record<string, unknown>;
  assert.deepEqual(sameFormat("gpt-5.6-sol", "max").reasoning, cross.reasoning);
});
