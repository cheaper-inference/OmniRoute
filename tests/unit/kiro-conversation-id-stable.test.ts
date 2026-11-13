import test from "node:test";
import assert from "node:assert/strict";

import { buildKiroPayload } from "../../open-sse/translator/request/openai-to-kiro.ts";

const build = (body: Record<string, unknown>) =>
  buildKiroPayload("claude-sonnet-4.5", structuredClone(body), true, {}) as {
    conversationState: { conversationId: string };
  };

const single = { messages: [{ role: "user", content: "hello there" }] };

test("a single-message request keeps the same conversationId on every call", async () => {
  const first = build(single).conversationState.conversationId;
  // Let the wall clock move: the id must not depend on the timestamp line added to the content.
  await new Promise((resolve) => setTimeout(resolve, 5));
  const second = build(single).conversationState.conversationId;
  assert.equal(first, second);
});

test("turn 2 keeps the conversationId of turn 1", () => {
  const turn1 = build(single).conversationState.conversationId;
  const turn2 = build({
    messages: [
      { role: "user", content: "hello there" },
      { role: "assistant", content: "hi" },
      { role: "user", content: "and now?" },
    ],
  }).conversationState.conversationId;
  assert.equal(turn2, turn1);
});

test("different first messages give different conversationIds", () => {
  const a = build({ messages: [{ role: "user", content: "alpha" }] }).conversationState
    .conversationId;
  const b = build({ messages: [{ role: "user", content: "beta" }] }).conversationState
    .conversationId;
  assert.notEqual(a, b);
});
