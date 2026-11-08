import test from "node:test";
import assert from "node:assert/strict";

import { resolveKiroModelAlias } from "../../open-sse/translator/request/openai-to-kiro/adaptiveThinking.ts";
import { buildKiroPayload } from "../../open-sse/translator/request/openai-to-kiro.ts";

const body = { messages: [{ role: "user", content: "Hello" }] };

test("resolveKiroModelAlias strips a -YYYYMMDD snapshot suffix before the dotted-minor rewrite", () => {
  assert.equal(resolveKiroModelAlias("claude-sonnet-4-5-20250929").upstream, "claude-sonnet-4.5");
  assert.equal(resolveKiroModelAlias("claude-haiku-4-5-20251001").upstream, "claude-haiku-4.5");
  assert.equal(resolveKiroModelAlias("claude-opus-4-20250514").upstream, "claude-opus-4");
});

test("resolveKiroModelAlias folds model id case", () => {
  assert.equal(resolveKiroModelAlias("MiniMax-M2.5").upstream, "minimax-m2.5");
  assert.equal(resolveKiroModelAlias("Claude-Sonnet-4-5").upstream, "claude-sonnet-4.5");
});

test("resolveKiroModelAlias keeps unknown ids and does not map every sonnet to 4.5", () => {
  assert.equal(resolveKiroModelAlias("claude-sonnet-5").upstream, "claude-sonnet-5");
  assert.equal(resolveKiroModelAlias("claude-sonnet-4-6-20260101").upstream, "claude-sonnet-4.6");
  assert.equal(resolveKiroModelAlias("deepseek-3.2").upstream, "deepseek-3.2");
});

test("resolveKiroModelAlias still handles -thinking on a dated, mixed-case id", () => {
  const r = resolveKiroModelAlias("Claude-Opus-5-20260101-thinking");
  assert.deepEqual(r, { upstream: "claude-opus-5", thinking: true });
});

test("buildKiroPayload sends the folded model id upstream", () => {
  const payload = buildKiroPayload("claude-sonnet-4-5-20250929", body, true, {}) as {
    conversationState: { currentMessage: { userInputMessage: { modelId: string } } };
  };
  assert.equal(
    payload.conversationState.currentMessage.userInputMessage.modelId,
    "claude-sonnet-4.5"
  );
});
