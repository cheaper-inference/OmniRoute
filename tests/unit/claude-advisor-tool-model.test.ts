/**
 * Production regression (node B, since 2026-10-23): Claude Code declares Anthropic's advisor
 * server tool with the model name the client was given — the OmniRoute alias
 * `claude-opus-5.5` — and the Claude passthrough forwarded it unchanged, so Anthropic
 * answered every turn with 400 `tools.N.model: claude-opus-5.5 was not found`.
 */

import test from "node:test";
import assert from "node:assert/strict";

const { buildClaudePassthroughBody } =
  await import("../../open-sse/handlers/chatCore/claudePassthroughBody.ts");
const { normalizeAdvisorToolModel } =
  await import("../../open-sse/handlers/chatCore/claudeAdvisorTool.ts");

function passthrough(tools: unknown[], provider = "claude") {
  return buildClaudePassthroughBody({
    body: {
      model: "claude-opus-5-5",
      max_tokens: 1024,
      messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }],
      tools,
    },
    provider,
    clientHeaders: {},
    isClaudeCodeSemanticPassthrough: false,
    effectiveModel: "claude-opus-5-5",
    targetFormat: "claude",
    preserveCacheControl: true,
    normalizeClaudeUpstreamMessages: () => {},
    applyReasoningRuleDirective: (body) => body,
  });
}

const advisor = (model: string) => ({ type: "advisor_20260301", name: "advisor", model });

test("the advisor tool's OmniRoute alias becomes Anthropic's model id", () => {
  const body = passthrough([
    { name: "read", input_schema: { type: "object" } },
    advisor("claude-opus-5.5"),
  ]);
  const tools = body.tools as Array<Record<string, unknown>>;
  assert.equal(tools[1].model, "claude-opus-5-5");
  assert.equal(tools[0].model, undefined, "ordinary tools are left alone");
});

test("a provider-prefixed advisor model loses the prefix", () => {
  const body = passthrough([advisor("claude/claude-sonnet-5.5")]);
  assert.equal((body.tools as Array<Record<string, unknown>>)[0].model, "claude-sonnet-5-5");
});

test("non-Anthropic Claude-shape providers keep the advisor model as sent", () => {
  const body = passthrough([advisor("claude-opus-5.5")], "glm");
  assert.equal((body.tools as Array<Record<string, unknown>>)[0].model, "claude-opus-5.5");
});

test("already valid and non-Claude names are unchanged", () => {
  assert.equal(normalizeAdvisorToolModel("claude-opus-5-5"), "claude-opus-5-5");
  assert.equal(normalizeAdvisorToolModel("claude-haiku-5-5-20261001"), "claude-haiku-5-5-20261001");
  assert.equal(normalizeAdvisorToolModel("best-coding"), "best-coding");
});

test("the caller's request keeps its own tool objects", () => {
  const tools = [advisor("claude-opus-5.5")];
  const body = passthrough(tools);
  assert.equal((body.tools as Array<Record<string, unknown>>)[0].model, "claude-opus-5-5");
  assert.equal(tools[0].model, "claude-opus-5.5", "a combo fallback must still see the original");
});
