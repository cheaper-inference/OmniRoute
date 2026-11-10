import test from "node:test";
import assert from "node:assert/strict";

const { prepareClaudeRequest } = await import("../../open-sse/translator/helpers/claudeHelper.ts");
const { DEFAULT_THINKING_CLAUDE_SIGNATURE } =
  await import("../../open-sse/config/defaultThinkingSignature.ts");
const reasoningCache = await import("../../open-sse/services/reasoningCache.ts");

function multiTurnBodyWithoutThinkingBlock() {
  return {
    thinking: { type: "enabled", budget_tokens: 4096 },
    messages: [
      { role: "user", content: [{ type: "text", text: "hi" }] },
      {
        role: "assistant",
        content: [{ type: "tool_use", id: "call_x", name: "ls", input: { path: "." } }],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "call_x", content: "README.md" }],
      },
    ],
  };
}

function multiTurnBodyWithThinkingBlock(thinkingText: string, toolUseId = "call_y") {
  return {
    thinking: { type: "enabled", budget_tokens: 4096 },
    messages: [
      { role: "user", content: [{ type: "text", text: "hi" }] },
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: thinkingText, signature: "client-stored-sig" },
          { type: "tool_use", id: toolUseId, name: "ls", input: {} },
        ],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: toolUseId, content: "ok" }],
      },
    ],
  };
}

// ──────────────── Anthropic-native (claude, anthropic-compatible-*) ────────────────

test("claude provider — empty content, injects nothing and disables manual thinking", () => {
  const body = multiTurnBodyWithoutThinkingBlock();
  const result = prepareClaudeRequest(body as any, "claude");
  const content = (result as any).messages[1].content;
  assert.equal(content.length, 1);
  assert.equal(content[0].type, "tool_use");
  assert.equal(content[0].data, undefined);
  assert.equal(JSON.stringify(result).includes(DEFAULT_THINKING_CLAUDE_SIGNATURE), false);
  assert.equal(result.thinking, undefined, "manual thinking off without a final block");
});

test("claude provider — genuine signed thinking is kept verbatim on older messages", () => {
  // Uses a two-assistant-turn body: the first assistant (with thinking) is an
  // older turn; the second (latest) assistant's thinking must stay verbatim.
  // This verifies that older assistant thinking blocks ARE rewritten.
  const body: any = {
    thinking: { type: "enabled", budget_tokens: 4096 },
    messages: [
      { role: "user", content: [{ type: "text", text: "hi" }] },
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "real thinking text", signature: "client-stored-sig" },
          { type: "tool_use", id: "call_y", name: "ls", input: {} },
        ],
      },
      { role: "user", content: [{ type: "tool_result", tool_use_id: "call_y", content: "ok" }] },
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "latest thinking", signature: "latest-sig" },
          { type: "tool_use", id: "call_z", name: "ls", input: {} },
        ],
      },
      { role: "user", content: [{ type: "tool_result", tool_use_id: "call_z", content: "ok" }] },
    ],
  };
  prepareClaudeRequest(body, "claude");
  const olderContent = body.messages[1].content;
  assert.equal(olderContent.length, 2, "no double-inject");
  assert.equal(olderContent[0].type, "thinking");
  assert.equal(olderContent[0].thinking, "real thinking text");
  assert.equal(olderContent[0].signature, "client-stored-sig");
  assert.equal(olderContent[0].data, undefined);
  assert.equal(JSON.stringify(olderContent).includes(DEFAULT_THINKING_CLAUDE_SIGNATURE), false);
  assert.equal(olderContent[1].type, "tool_use");
  // Latest assistant: thinking preserved verbatim
  const latestContent = body.messages[3].content;
  assert.equal(latestContent[0].type, "thinking");
  assert.equal(latestContent[0].thinking, "latest thinking");
  assert.equal(latestContent[0].signature, "latest-sig");
});

test("anthropic-compatible-* provider — same as claude (nothing injected)", () => {
  const body = multiTurnBodyWithoutThinkingBlock();
  const result = prepareClaudeRequest(body as any, "anthropic-compatible-abc123");
  const content = (result as any).messages[1].content;
  assert.equal(content[0].type, "tool_use");
  assert.equal(JSON.stringify(result).includes(DEFAULT_THINKING_CLAUDE_SIGNATURE), false);
});

test("claude provider — unsigned thinking and the blob are dropped; adaptive stays on", () => {
  const body: Parameters<typeof prepareClaudeRequest>[0] = {
    thinking: { type: "adaptive" },
    messages: [
      { role: "user", content: [{ type: "text", text: "hi" }] },
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "no signature" },
          { type: "redacted_thinking", data: DEFAULT_THINKING_CLAUDE_SIGNATURE },
          { type: "tool_use", id: "call_u", name: "ls", input: {} },
        ],
      },
      { role: "user", content: [{ type: "tool_result", tool_use_id: "call_u", content: "ok" }] },
    ],
  };
  prepareClaudeRequest(body, "claude");
  assert.deepEqual(
    (body.messages![1].content as Array<{ type?: string }>).map((b) => b.type),
    ["tool_use"]
  );
  assert.deepEqual(body.thinking, { type: "adaptive" });
});

// ──────────────── Non-Anthropic Claude-shape (kimi-coding, glmt, zai, …) ────────────────

test("kimi-coding provider — empty content injects an empty thinking marker", () => {
  reasoningCache.clearReasoningCacheAll();
  const body = multiTurnBodyWithoutThinkingBlock();
  const result = prepareClaudeRequest(body as any, "kimi-coding");
  const content = (result as any).messages[1].content;
  assert.equal(content.length, 2);
  assert.equal(content[0].type, "thinking");
  assert.equal(content[0].thinking, "");
  assert.equal(content[0].data, undefined, "no data field on plain thinking");
  assert.equal(content[0].signature, undefined, "no signature field on cross-provider replay");
  assert.equal(content[1].type, "tool_use");
});

test("kimi-coding provider — cache hits do not replace the empty thinking marker", () => {
  reasoningCache.clearReasoningCacheAll();
  reasoningCache.cacheReasoning(
    "call_x",
    "kimi-coding",
    "kimi-k2.6",
    "the model actually thought this"
  );
  const body = multiTurnBodyWithoutThinkingBlock();
  const result = prepareClaudeRequest(body as any, "kimi-coding");
  const content = (result as any).messages[1].content;
  assert.equal(content[0].type, "thinking");
  assert.equal(content[0].thinking, "");
});

test("kimi-coding provider — existing thinking block: client text preserved, signature stripped, data NOT added", () => {
  reasoningCache.clearReasoningCacheAll();
  const body = multiTurnBodyWithThinkingBlock("client preserved reasoning", "call_y");
  const result = prepareClaudeRequest(body as any, "kimi-coding");
  const content = (result as any).messages[1].content;
  assert.equal(content.length, 2);
  assert.equal(content[0].type, "thinking");
  assert.equal(content[0].thinking, "client preserved reasoning", "client text preserved");
  assert.equal(content[0].data, undefined);
  assert.equal(
    content[0].signature,
    undefined,
    "client-stored signature stripped (no value for kimi)"
  );
});

test("kimi-coding provider — redacted thinking becomes an empty marker even on cache hit", () => {
  reasoningCache.clearReasoningCacheAll();
  reasoningCache.cacheReasoning("call_z", "kimi-coding", "kimi-k2.6", "cached reasoning v2");
  const body = {
    thinking: { type: "enabled", budget_tokens: 4096 },
    messages: [
      { role: "user", content: [{ type: "text", text: "hi" }] },
      {
        role: "assistant",
        content: [
          { type: "redacted_thinking", data: "opaque-blob-from-prior-anthropic-turn" },
          { type: "tool_use", id: "call_z", name: "ls", input: {} },
        ],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "call_z", content: "ok" }],
      },
    ],
  };
  const result = prepareClaudeRequest(body as any, "kimi-coding");
  const content = (result as any).messages[1].content;
  assert.equal(content[0].type, "thinking");
  assert.equal(content[0].thinking, "");
  assert.equal(content[0].data, undefined);
});

test("kimi-coding provider — redacted thinking becomes an empty marker on cache miss", () => {
  reasoningCache.clearReasoningCacheAll();
  const body = {
    thinking: { type: "enabled", budget_tokens: 4096 },
    messages: [
      { role: "user", content: [{ type: "text", text: "hi" }] },
      {
        role: "assistant",
        content: [
          { type: "redacted_thinking", data: "opaque-blob" },
          { type: "tool_use", id: "call_z_miss", name: "ls", input: {} },
        ],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "call_z_miss", content: "ok" }],
      },
    ],
  };
  const result = prepareClaudeRequest(body as any, "kimi-coding");
  const content = (result as any).messages[1].content;
  assert.equal(content[0].type, "thinking");
  assert.equal(content[0].thinking, "");
});

// ──────────────── Disabled / no-op paths ────────────────

test("thinking disabled — no inject regardless of provider or tool_use", () => {
  for (const provider of ["claude", "kimi-coding", "anthropic-compatible-x"]) {
    const body = {
      thinking: { type: "disabled" },
      messages: [
        { role: "user", content: [{ type: "text", text: "hi" }] },
        { role: "assistant", content: [{ type: "tool_use", id: "x", name: "ls", input: {} }] },
        { role: "user", content: [{ type: "tool_result", tool_use_id: "x", content: "ok" }] },
      ],
    };
    const result = prepareClaudeRequest(body as any, provider);
    const content = (result as any).messages[1].content;
    assert.equal(content.length, 1, `${provider}: no inject when thinking disabled`);
    assert.equal(content[0].type, "tool_use");
  }
});

test("thinking enabled + no tool_use — no precursor inject (single-turn text)", () => {
  for (const provider of ["claude", "kimi-coding"]) {
    const body = {
      thinking: { type: "enabled", budget_tokens: 4096 },
      messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }],
    };
    const result = prepareClaudeRequest(body as any, provider);
    const content = (result as any).messages[0].content;
    assert.ok(Array.isArray(content));
    assert.equal(content.length, 1);
    assert.equal(content[0].type, "text");
  }
});

// ──────────────── Latest-assistant preservation (Anthropic & non-Anthropic) ────────────────

test("preserves genuine signed thinking verbatim on every assistant message", () => {
  const body: any = {
    thinking: { type: "enabled", budget_tokens: 4096 },
    model: "claude-opus-4-7",
    messages: [
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "older thought", signature: "sig-OLD" },
          { type: "tool_use", id: "tool_1", name: "do_x", input: {} },
        ],
      },
      { role: "user", content: [{ type: "tool_result", tool_use_id: "tool_1", content: "ok" }] },
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "latest thought", signature: "sig-LATEST" },
          { type: "tool_use", id: "tool_2", name: "do_y", input: {} },
        ],
      },
      { role: "user", content: [{ type: "tool_result", tool_use_id: "tool_2", content: "ok" }] },
    ],
  };

  prepareClaudeRequest(body, "claude");

  const olderAssistant = body.messages[0];
  const latestAssistant = body.messages[2];

  // Older assistant thinking: genuine signed block kept verbatim
  assert.equal(olderAssistant.content[0].type, "thinking");
  assert.equal(olderAssistant.content[0].thinking, "older thought");
  assert.equal(olderAssistant.content[0].signature, "sig-OLD");
  assert.equal(olderAssistant.content[0].data, undefined);
  assert.equal(JSON.stringify(olderAssistant).includes(DEFAULT_THINKING_CLAUDE_SIGNATURE), false);

  // Latest assistant thinking: untouched (type, text, signature all preserved)
  assert.equal(latestAssistant.content[0].type, "thinking");
  assert.equal(latestAssistant.content[0].thinking, "latest thought");
  assert.equal(latestAssistant.content[0].signature, "sig-LATEST");
  assert.equal(latestAssistant.content[0].data, undefined);
});

test("Kimi upstream preserves latest thinking and keeps older empty markers", () => {
  reasoningCache.clearReasoningCacheAll();
  const body: any = {
    thinking: { type: "enabled", budget_tokens: 4096 },
    model: "kimi-k2.6-thinking",
    messages: [
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "" /* stripped on wire */ },
          { type: "tool_use", id: "tool_1", name: "do_x", input: {} },
        ],
      },
      { role: "user", content: [{ type: "tool_result", tool_use_id: "tool_1", content: "ok" }] },
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "latest reasoning text" },
          { type: "tool_use", id: "tool_2", name: "do_y", input: {} },
        ],
      },
      { role: "user", content: [{ type: "tool_result", tool_use_id: "tool_2", content: "ok" }] },
    ],
  };

  prepareClaudeRequest(body, "kimi-coding");

  // Latest assistant: text preserved verbatim
  assert.equal(body.messages[2].content[0].type, "thinking");
  assert.equal(body.messages[2].content[0].thinking, "latest reasoning text");

  // Older assistant: the empty marker stays empty rather than replaying cached reasoning.
  assert.equal(body.messages[0].content[0].type, "thinking");
  assert.equal(body.messages[0].content[0].thinking, "");
});
