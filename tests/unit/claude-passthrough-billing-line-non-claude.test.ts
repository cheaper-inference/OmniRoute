import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "or9r-billing-line-"));

const { buildClaudePassthroughBody } =
  await import("../../open-sse/handlers/chatCore/claudePassthroughBody.ts");

const BILLING = "x-anthropic-billing-header: cc_version=2.1.1.abc; cc_entrypoint=cli; cch=12345;";
const SENTINEL = "You are Claude Code, Anthropic's official CLI for Claude.";

function build(provider: string, effectiveModel: string, system: unknown) {
  const body = {
    model: effectiveModel,
    max_tokens: 64,
    system,
    messages: [{ role: "user", content: "hi" }],
  };
  const out = buildClaudePassthroughBody({
    body,
    provider,
    clientHeaders: {},
    isClaudeCodeSemanticPassthrough: false,
    effectiveModel,
    targetFormat: "claude",
    preserveCacheControl: true,
    normalizeClaudeUpstreamMessages: () => {},
    applyReasoningRuleDirective: (input: unknown) => input,
  });
  return { body, out };
}

const blocks = () => [
  { type: "text", text: BILLING },
  { type: "text", text: SENTINEL, cache_control: { type: "ephemeral" } },
];

test("Claude passthrough drops the rotating billing block for a non-Claude Anthropic-shape target", () => {
  const { out } = build("kimi-coding", "k3", blocks());
  assert.deepEqual(out.system, [blocks()[1]]);
});

test("Claude passthrough cuts a leading billing line from a string system for a non-Claude target", () => {
  const { out } = build("deepseek", "deepseek-v4-pro", `${BILLING}\nReal rules`);
  assert.equal(out.system, "Real rules");
});

test("Claude passthrough keeps the billing block for first-party Claude and for Claude models", () => {
  assert.deepEqual(build("claude", "claude-sonnet-4-5", blocks()).out.system, blocks());
  assert.deepEqual(build("anthropic", "claude-sonnet-4-5", blocks()).out.system, blocks());
  assert.deepEqual(build("agentrouter", "claude-opus-4-1", blocks()).out.system, blocks());
});

test("Claude passthrough does not change the client's own system array", () => {
  const { body } = build("kimi-coding", "k3", blocks());
  assert.deepEqual(body.system, blocks());
});
