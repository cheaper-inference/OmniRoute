import assert from "node:assert/strict";
import { test } from "node:test";
import { buildClaudePassthroughBody } from "../../open-sse/handlers/chatCore/claudePassthroughBody.ts";
import { normalizeClaudeUpstreamMessages } from "../../open-sse/handlers/chatCore/claudeUpstreamMessages.ts";
import { setSystemPromptConfig } from "../../open-sse/services/systemPrompt.ts";

function body() {
  return {
    model: "claude-sonnet-5-5",
    system: "Stable base",
    messages: [
      { role: "system", content: "Leading instruction" },
      { role: "user", content: "First" },
      { role: "system", content: "Later instruction" },
    ],
  };
}

const route = { provider: "anthropic", sourceFormat: "claude", model: "claude-sonnet-5-5" };
const roles = (input: ReturnType<typeof body>) => input.messages.map((m) => m.role);

test("official API keeps valid text system turns after a user without tools", () => {
  const input = body();
  normalizeClaudeUpstreamMessages(input, route);
  assert.deepEqual(roles(input), ["user", "system"]);
  assert.deepEqual(input.system, [
    { type: "text", text: "Stable base" },
    { type: "text", text: "Leading instruction" },
  ]);
  assert.equal(input.messages[1].content, "Later instruction");
});

test("unsupported models, other providers and translated formats retain full hoisting", () => {
  for (const changes of [
    { model: "claude-sonnet-5" },
    { provider: "claude" },
    { provider: "anthropic-compatible-test" },
    { sourceFormat: "openai" },
  ]) {
    const input = body();
    normalizeClaudeUpstreamMessages(input, { ...route, ...changes });
    assert.deepEqual(roles(input), ["user"]);
  }
});

test("developer roles and unsupported placement keep legacy behavior", () => {
  const malformed = body();
  malformed.messages.splice(2, 0, { role: "assistant", content: "Assistant turn" });
  normalizeClaudeUpstreamMessages(malformed, route);
  assert.deepEqual(roles(malformed), ["user", "assistant"]);
  const developer = body();
  developer.messages[2].role = "developer";
  normalizeClaudeUpstreamMessages(developer, route);
  assert.deepEqual(roles(developer), ["user"]);
});

test("configured global prompts retain existing priority and full hoisting", () => {
  setSystemPromptConfig({ enabled: true, suffixPrompt: "Global suffix" });
  try {
    const input = body();
    normalizeClaudeUpstreamMessages(input, route);
    assert.deepEqual(roles(input), ["user"]);
  } finally {
    setSystemPromptConfig({ enabled: false, prefixPrompt: "", suffixPrompt: "" });
  }
});

test("actual passthrough builder uses the same ordering on both Claude Messages paths", () => {
  for (const semantic of [false, true]) {
    const input = body();
    const snapshot = structuredClone(input);
    const out = buildClaudePassthroughBody({
      body: input,
      provider: "anthropic",
      clientHeaders: null,
      isClaudeCodeSemanticPassthrough: semantic,
      effectiveModel: route.model,
      targetFormat: "claude",
      preserveCacheControl: true,
      normalizeClaudeUpstreamMessages: (payload, options) =>
        normalizeClaudeUpstreamMessages(payload, { ...route, ...options }),
      applyReasoningRuleDirective: (payload) => payload,
    });
    assert.deepEqual(
      (out.messages as typeof input.messages).map((m) => m.role),
      ["user", "system"]
    );
    assert.deepEqual(input, snapshot);
  }
});
