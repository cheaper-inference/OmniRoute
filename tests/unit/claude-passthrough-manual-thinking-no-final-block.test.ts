import test from "node:test";
import assert from "node:assert/strict";

const { buildClaudePassthroughBody } =
  await import("@omniroute/open-sse/handlers/chatCore/claudePassthroughBody.ts");
const { isAnthropicThinkingSignatureError } =
  await import("@omniroute/open-sse/handlers/chatCore/passthroughHelpers.ts");
const { DEFAULT_THINKING_CLAUDE_SIGNATURE } =
  await import("@omniroute/open-sse/config/defaultThinkingSignature.ts");

function bodyWith(thinking: Record<string, unknown>) {
  return {
    model: "claude-opus-4-8",
    thinking,
    messages: [
      { role: "user", content: [{ type: "text", text: "go" }] },
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "unsigned" },
          { type: "tool_use", id: "toolu_1", name: "Read", input: {} },
        ],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "toolu_1", content: "ok" }],
      },
    ],
  };
}

function build(body: Record<string, unknown>) {
  return buildClaudePassthroughBody({
    body,
    provider: "claude",
    clientHeaders: null,
    isClaudeCodeSemanticPassthrough: false,
    effectiveModel: "claude-opus-4-8",
    targetFormat: "claude",
    preserveCacheControl: true,
    normalizeClaudeUpstreamMessages: () => {},
    applyReasoningRuleDirective: (b) => b,
    log: null,
  }) as { thinking?: unknown; messages: Array<{ role: string; content: Array<{ type: string }> }> };
}

test("passthrough: manual thinking is disabled when the unsigned block was dropped", () => {
  const out = build(bodyWith({ type: "enabled", budget_tokens: 4096 }));
  assert.deepEqual(
    out.messages[1].content.map((b) => b.type),
    ["tool_use"]
  );
  assert.equal(out.thinking, undefined);
  assert.equal(JSON.stringify(out).includes(DEFAULT_THINKING_CLAUDE_SIGNATURE), false);
});

test("passthrough: adaptive thinking stays on without a block", () => {
  const out = build(bodyWith({ type: "adaptive" }));
  assert.deepEqual(out.thinking, { type: "adaptive" });
});

test("signature 400 recovery covers every signature-validating Anthropic upstream", () => {
  const message = "messages.1.content.0: Invalid `signature` in `thinking` block";
  const hit = (provider: string, model?: string) =>
    isAnthropicThinkingSignatureError({ provider, model, status: 400, message });
  assert.equal(hit("vertex"), true);
  assert.equal(hit("vertex-partner"), true);
  assert.equal(hit("github", "claude-opus-4.8"), true, "targetFormat claude model");
  assert.equal(hit("github", "gpt-5.4"), false, "non-claude model of the same provider");
  assert.equal(hit("openrouter", "claude-opus-4.8"), false);
});
