import assert from "node:assert/strict";
import { test } from "node:test";
import {
  shouldUseMidConversationSystem,
  selectBetaFlags,
} from "../../open-sse/executors/claudeIdentity.ts";
import { normalizeClaudeUpstreamMessages } from "../../open-sse/handlers/chatCore/claudeUpstreamMessages.ts";

function body() {
  return {
    model: "claude-sonnet-5-5",
    system: "Stable base",
    tools: [],
    messages: [
      { role: "user", content: "First" },
      { role: "assistant", content: "Reply" },
      { role: "system", content: "Later operator instruction" },
      { role: "user", content: "Next" },
    ],
  };
}
test("native supported system chronology does not require tools", () => {
  const input = body();
  assert.equal(shouldUseMidConversationSystem(input), true);
  assert.ok(selectBetaFlags(input).includes("mid-conversation-system-2026-04-07"));
  normalizeClaudeUpstreamMessages(input, { provider: "claude", sourceFormat: "claude" });
  assert.equal(input.system, "Stable base");
  assert.equal(input.messages[2].role, "system");
});
test("unsupported native models and other providers keep established hoisting", () => {
  for (const [provider, model] of [
    ["claude", "claude-sonnet-4-6"],
    ["anthropic", "claude-sonnet-5-5"],
  ]) {
    const input = body();
    input.model = model;
    normalizeClaudeUpstreamMessages(input, { provider, sourceFormat: "claude" });
    assert.equal(
      input.messages.some((m) => m.role === "system"),
      false
    );
  }
});
test("developer turns retain full-hoist behavior on native routes", () => {
  const input = body();
  input.messages[2].role = "developer";
  normalizeClaudeUpstreamMessages(input, { provider: "claude", sourceFormat: "claude" });
  assert.equal(
    input.messages.some((m) => m.role === "developer"),
    false
  );
});
