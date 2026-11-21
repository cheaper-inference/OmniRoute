import test from "node:test";
import assert from "node:assert/strict";

import { translateRequest } from "../../open-sse/translator/index.ts";

function translate(target: string, provider: string, extra: Record<string, unknown>) {
  return translateRequest(
    "openai-responses",
    target,
    "claude-sonnet-4-5",
    { model: "x", input: "hi", ...extra },
    false,
    null,
    provider
  ) as Record<string, unknown>;
}

test("max_output_tokens reaches a Claude upstream as max_tokens", () => {
  const out = translate("claude", "claude", { max_output_tokens: 777 });
  assert.equal(out.max_tokens, 777);
  assert.equal(out.max_output_tokens, undefined);
});

test("max_output_tokens becomes max_tokens on a Chat target", () => {
  const out = translate("openai", "openai", { max_output_tokens: 321 });
  assert.equal(out.max_tokens, 321);
  assert.equal(out.max_output_tokens, undefined);
});

test("an explicit max_tokens is kept over max_output_tokens", () => {
  const out = translate("openai", "openai", { max_output_tokens: 321, max_tokens: 99 });
  assert.equal(out.max_tokens, 99);
  assert.equal(out.max_output_tokens, undefined);
});

test("a body without a token limit gets none", () => {
  const out = translate("openai", "openai", {});
  assert.equal(out.max_tokens, undefined);
  assert.equal(out.max_output_tokens, undefined);
});
