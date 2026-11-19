// Responses -> Chat translation left the top-level `conversation_id` key in the Chat body
// for non-OpenAI upstreams. A strict Chat endpoint 400s on unknown top-level keys, the same
// class of failure as `prompt_cache_key` (#7533). The key follows the same allowlist:
// kept for an OpenAI-operated destination (Codex reads it as a session id), stripped elsewhere.
import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");

function translate(provider: string | undefined): Record<string, unknown> {
  return openaiResponsesToOpenAIRequest(
    "z-ai/glm-5.2",
    {
      model: "z-ai/glm-5.2",
      input: [{ role: "user", content: "hello" }],
      conversation: "conv-object",
      conversation_id: "conv-123",
      prompt_cache_key: "abc-123",
    },
    false,
    provider ? { provider } : null
  ) as Record<string, unknown>;
}

test("conversation_id is stripped for a non-OpenAI upstream (NVIDIA)", () => {
  const out = translate("nvidia");

  assert.equal(out.conversation_id, undefined);
  assert.equal(out.conversation, undefined);
  assert.equal(out.prompt_cache_key, undefined);
});

test("conversation_id is stripped when no provider is supplied", () => {
  assert.equal(translate(undefined).conversation_id, undefined);
});

test("conversation_id is kept for an OpenAI-operated upstream (openai, codex)", () => {
  assert.equal(translate("openai").conversation_id, "conv-123");
  assert.equal(translate("codex").conversation_id, "conv-123");
});
