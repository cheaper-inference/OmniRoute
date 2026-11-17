import test from "node:test";
import assert from "node:assert/strict";

const { buildClaudePassthroughBody } =
  await import("@omniroute/open-sse/handlers/chatCore/claudePassthroughBody.ts");
const { isAnthropicThinkingSignatureError, isClaudeCodeSemanticPassthroughRequest } =
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

function buildFor(
  body: Record<string, unknown>,
  provider: string,
  isClaudeCodeSemanticPassthrough: boolean
) {
  return buildClaudePassthroughBody({
    body,
    provider,
    clientHeaders: null,
    isClaudeCodeSemanticPassthrough,
    effectiveModel: "claude-opus-4-8",
    targetFormat: "claude",
    preserveCacheControl: true,
    normalizeClaudeUpstreamMessages: () => {},
    applyReasoningRuleDirective: (b) => b,
    log: null,
  }) as {
    thinking?: unknown;
    system?: Array<{ text?: string; cache_control?: unknown }>;
    tools?: Array<{ cache_control?: unknown }>;
    messages: Array<{
      role: string;
      content: Array<{ type: string; cache_control?: unknown }>;
    }>;
  };
}

function countBreakpoints(out: ReturnType<typeof buildFor>) {
  return [
    ...(out.tools ?? []),
    ...(out.system ?? []),
    ...out.messages.flatMap((message) => message.content),
  ].filter((block) => block.cache_control).length;
}

const EPHEMERAL = { type: "ephemeral" };

function agentBodyWithMidConversationSystemTurn() {
  return {
    model: "claude-opus-4-8",
    system: [{ type: "text", text: "You are Claude Code." }],
    tools: [{ name: "Read", input_schema: { type: "object" } }],
    messages: [
      { role: "user", content: [{ type: "text", text: "go" }] },
      { role: "assistant", content: [{ type: "text", text: "ok" }] },
      { role: "system", content: [{ type: "text", text: "environment update" }] },
      { role: "user", content: [{ type: "text", text: "next" }] },
    ],
  };
}

function bodyAtBreakpointLimit() {
  return {
    model: "claude-opus-4-8",
    tools: [{ name: "Read", input_schema: { type: "object" }, cache_control: EPHEMERAL }],
    system: [{ type: "text", text: "s", cache_control: EPHEMERAL }],
    messages: [
      { role: "user", content: [{ type: "text", text: "a", cache_control: EPHEMERAL }] },
      { role: "assistant", content: [{ type: "text", text: "b" }] },
      { role: "user", content: [{ type: "text", text: "c", cache_control: EPHEMERAL }] },
      { role: "assistant", content: [{ type: "text", text: "d" }] },
      { role: "user", content: [{ type: "text", text: "e" }] },
    ],
  };
}

test("passthrough: anthropic API-key provider gets the same first-party passthrough hygiene as claude", () => {
  assert.equal(
    isClaudeCodeSemanticPassthroughRequest({
      provider: "anthropic",
      sourceFormat: "claude",
      targetFormat: "claude",
      userAgent: "claude-cli/2.1.137",
    }),
    true
  );

  for (const semantic of [false, true]) {
    const out = buildFor(bodyWith({ type: "enabled", budget_tokens: 4096 }), "anthropic", semantic);
    assert.deepEqual(
      out.messages[1].content.map((b) => b.type),
      ["tool_use"]
    );
    assert.equal(out.thinking, undefined);
  }
});

test("passthrough: anthropic marks the last user turn on the Claude Code path, as claude does", () => {
  for (const provider of ["claude", "anthropic"]) {
    const out = buildFor(bodyWith({ type: "adaptive" }), provider, true);
    assert.deepEqual(out.messages[2].content[0].cache_control, EPHEMERAL);
  }
});

test("passthrough: anthropic adds no breakpoint a non-Claude-Code client did not ask for", () => {
  const out = buildFor(bodyWith({ type: "adaptive" }), "anthropic", false);
  assert.equal(countBreakpoints(out), 0);
});

test("passthrough: a body at the breakpoint limit stays at four on either anthropic path", () => {
  for (const semantic of [false, true]) {
    assert.equal(countBreakpoints(buildFor(bodyAtBreakpointLimit(), "anthropic", semantic)), 4);
  }
});

test("passthrough: anthropic hoists mid-conversation system turns, it never sends their beta", () => {
  const out = buildFor(agentBodyWithMidConversationSystemTurn(), "anthropic", true);
  assert.deepEqual(
    out.messages.map((message) => message.role),
    ["user", "assistant", "user"]
  );
  assert.deepEqual(
    out.system?.map((block) => block.text),
    ["You are Claude Code.", "environment update"]
  );
});

test("passthrough: claude keeps mid-conversation system turns behind its own beta", () => {
  const out = buildFor(agentBodyWithMidConversationSystemTurn(), "claude", true);
  assert.deepEqual(
    out.messages.map((message) => message.role),
    ["user", "assistant", "system", "user"]
  );
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
