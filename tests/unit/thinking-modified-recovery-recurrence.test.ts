/**
 * #17324 recurrence (2026-10-27): adaptive-thinking restore + recovery blind spot.
 *
 * Live diagnostics (corr fc77e698, claude/claude-opus-5-5): ingress carried ZERO
 * thinking blocks, outbound gained 3 redacted_thinking blocks across 30 tool-result
 * turns, recoveryAttempted=false. The #17324 fix gated the fabricated #5312
 * placeholder to manual thinking but left the claudeThinkingStore restore ungated,
 * so adaptive requests still replay stored blocks whose cache shape no longer
 * matches. These tests pin the four behaviors the recurrence exposed.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { openaiToClaudeRequest } =
  await import("../../open-sse/translator/request/openai-to-claude.ts");
const { storeClaudeThinkingFromResponse, restoreClaudeThinkingBlocks, clearClaudeThinkingStore } =
  await import("../../open-sse/services/claudeThinkingStore.ts");
const { stripLatestAssistantThinkingForModifiedRecovery } =
  await import("../../open-sse/handlers/chatCore/passthroughHelpers.ts");
const { compareThinkingSignatures } =
  await import("../../open-sse/handlers/chatCore/thinkingSignatureDiagnostics.ts");
const { DEFAULT_THINKING_CLAUDE_SIGNATURE } =
  await import("../../open-sse/config/defaultThinkingSignature.ts");

const ADAPTIVE_MODEL = "claude-opus-5-5";
const TOOL_ID = "toolu_01ADAPTIVE";

function chatHistory(): Block[] {
  return [
    { role: "user", content: "Read a.ts" },
    {
      role: "assistant",
      content: null,
      tool_calls: [
        { id: TOOL_ID, type: "function", function: { name: "read_file", arguments: "{}" } },
      ],
    },
    { role: "tool", tool_call_id: TOOL_ID, content: "export const a = 1;" },
  ];
}

type Block = Record<string, unknown>;

function adaptiveChatTurn(connectionId: string) {
  return openaiToClaudeRequest(
    ADAPTIVE_MODEL,
    {
      messages: chatHistory(),
      reasoning_effort: "high",
      tools: [
        { type: "function", function: { name: "read_file", parameters: { type: "object" } } },
      ],
    },
    true,
    { _provider: "claude", _connectionId: connectionId }
  ) as { messages: Array<{ role: string; content: Block[] }> };
}

test.beforeEach(() => {
  clearClaudeThinkingStore();
});

test("adaptive thinking: stored blocks are NOT restored even on the same connection", () => {
  assert.equal(
    storeClaudeThinkingFromResponse(
      {
        model: ADAPTIVE_MODEL,
        content: [
          { type: "redacted_thinking", data: "OPAQUE_ORG_A" },
          { type: "tool_use", id: TOOL_ID, name: "read_file", input: {} },
        ],
      },
      { provider: "claude", model: ADAPTIVE_MODEL, connectionId: "conn-org-a" }
    ),
    true
  );

  const body = adaptiveChatTurn("conn-org-a");
  for (const message of body.messages) {
    if (message.role !== "assistant") continue;
    assert.equal(
      message.content.some((b) => b.type === "thinking" || b.type === "redacted_thinking"),
      false,
      "adaptive tool_use turn must carry no replayed thinking block (Anthropic accepts the bare shape)"
    );
  }
});

test("unbound provenance: capture without a connection id is not stored at all", () => {
  // #17324: signatures are org-scoped. A capture with unknown connection has
  // unknown org — persisting it invites cross-org replay on a later unbound
  // request (the ""==="" binding hole).
  assert.equal(
    storeClaudeThinkingFromResponse(
      {
        model: ADAPTIVE_MODEL,
        content: [
          { type: "thinking", thinking: "t", signature: "sig" },
          { type: "tool_use", id: TOOL_ID, name: "read_file", input: {} },
        ],
      },
      { provider: "claude", model: ADAPTIVE_MODEL }
    ),
    false,
    "capture without connectionId must be refused"
  );
  assert.equal(
    restoreClaudeThinkingBlocks({
      toolUseIds: [TOOL_ID],
      provider: "claude",
      model: ADAPTIVE_MODEL,
      connectionId: "conn-org-a",
    }),
    null
  );
});

test("modified-recovery: injected blocks in an EARLIER turn are stripped (recoveryAttempted must become true)", () => {
  // Live shape: latest assistant message is clean; an earlier turn carries
  // store-restored blocks. The old recovery only inspected the latest message
  // and no-oped, so the request failed outright with recoveryAttempted=false.
  assert.equal(
    storeClaudeThinkingFromResponse(
      {
        model: ADAPTIVE_MODEL,
        content: [
          { type: "redacted_thinking", data: "OPAQUE_EARLY" },
          { type: "tool_use", id: TOOL_ID, name: "read_file", input: {} },
        ],
      },
      { provider: "claude", model: ADAPTIVE_MODEL, connectionId: "conn-org-a" }
    ),
    true
  );
  const restored = restoreClaudeThinkingBlocks({
    toolUseIds: [TOOL_ID],
    provider: "claude",
    model: ADAPTIVE_MODEL,
    connectionId: "conn-org-a",
  })!;
  assert.ok(
    restored,
    "manual-thinking restore still works — used here to obtain provenance-marked blocks"
  );

  const body = {
    thinking: { type: "adaptive" },
    messages: [
      { role: "user", content: [{ type: "text", text: "Read a.ts" }] },
      {
        role: "assistant",
        content: [...restored, { type: "tool_use", id: TOOL_ID, name: "read_file", input: {} }],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: TOOL_ID, content: "ok" }],
      },
      // Latest assistant message: tool_use with NO thinking block (clean).
      {
        role: "assistant",
        content: [{ type: "tool_use", id: "toolu_LATEST", name: "read_file", input: {} }],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "toolu_LATEST", content: "ok" }],
      },
    ],
  };

  const recovered = stripLatestAssistantThinkingForModifiedRecovery(body);
  assert.notEqual(
    recovered,
    body,
    "recovery must change the body when earlier turns hold injected blocks"
  );
  const early = (recovered as typeof body).messages[1];
  assert.equal(
    early.content.some((b) => b.type === "thinking" || b.type === "redacted_thinking"),
    false,
    "injected blocks are dropped from the earlier turn"
  );
  assert.deepEqual(
    (recovered as typeof body).messages[3],
    body.messages[3],
    "the clean latest assistant message is untouched"
  );
});

test("modified-recovery under manual thinking: an EARLIER tool_use turn keeps the #5312 placeholder", () => {
  // thinking.type "enabled" rejects an assistant tool_use turn with no thinking
  // precursor, so the restored block on the earlier turn is swapped for the
  // placeholder instead of being dropped (adaptive drops it, see the test above).
  assert.equal(
    storeClaudeThinkingFromResponse(
      {
        model: "claude-sonnet-4-5",
        content: [
          { type: "redacted_thinking", data: "OPAQUE_EARLY_MANUAL" },
          { type: "tool_use", id: TOOL_ID, name: "read_file", input: {} },
        ],
      },
      { provider: "claude", model: "claude-sonnet-4-5", connectionId: "conn-org-a" }
    ),
    true
  );
  const restored = restoreClaudeThinkingBlocks({
    toolUseIds: [TOOL_ID],
    provider: "claude",
    model: "claude-sonnet-4-5",
    connectionId: "conn-org-a",
  })!;
  assert.ok(restored, "restore yields provenance-marked blocks");

  const body = {
    thinking: { type: "enabled", budget_tokens: 2048 },
    messages: [
      { role: "user", content: [{ type: "text", text: "Read a.ts" }] },
      {
        role: "assistant",
        content: [...restored, { type: "tool_use", id: TOOL_ID, name: "read_file", input: {} }],
      },
      { role: "user", content: [{ type: "tool_result", tool_use_id: TOOL_ID, content: "ok" }] },
      {
        role: "assistant",
        content: [{ type: "tool_use", id: "toolu_LATEST", name: "read_file", input: {} }],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "toolu_LATEST", content: "ok" }],
      },
    ],
  };

  const recovered = stripLatestAssistantThinkingForModifiedRecovery(body) as typeof body;
  assert.notEqual(recovered, body, "recovery must change the body");
  assert.deepEqual(recovered.messages[1].content, [
    { type: "redacted_thinking", data: DEFAULT_THINKING_CLAUDE_SIGNATURE },
    { type: "tool_use", id: TOOL_ID, name: "read_file", input: {} },
  ]);
  assert.deepEqual(recovered.messages[3], body.messages[3], "clean latest turn is untouched");
});

test("diagnostics delta: added redacted_thinking blocks are counted (was blind: 0/0/0 with +3 outbound)", () => {
  const ingress = {
    messages: [
      {
        role: "assistant",
        content: [{ type: "tool_use", id: TOOL_ID, name: "read_file", input: {} }],
      },
    ],
  };
  const outbound = {
    messages: [
      {
        role: "assistant",
        content: [
          { type: "redacted_thinking", data: "OPAQUE_1" },
          { type: "redacted_thinking", data: "OPAQUE_2" },
          { type: "redacted_thinking", data: "OPAQUE_3" },
          { type: "tool_use", id: TOOL_ID, name: "read_file", input: {} },
        ],
      },
    ],
  };
  assert.deepEqual(compareThinkingSignatures(ingress, outbound), {
    unchanged: 0,
    removed: 0,
    added: 3,
  });
});
