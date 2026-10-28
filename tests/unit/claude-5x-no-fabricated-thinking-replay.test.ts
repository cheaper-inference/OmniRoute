/**
 * TDD regression: Anthropic 5.x-generation models (Opus 5.5 / Sonnet 5.5 / Fable 5.1 …)
 * cryptographically validate replayed `thinking` / `redacted_thinking` blocks. Fabricated
 * placeholders — `redacted_thinking { data: DEFAULT_THINKING_CLAUDE_SIGNATURE }` and any
 * DEFAULT-signature `thinking` block — are rejected with:
 *
 *   400 "messages.N.content.M: `thinking` or `redacted_thinking` blocks in the latest
 *   assistant message cannot be modified. These blocks must remain as they were in the
 *   original response."
 *
 * Field evidence (krelay production, 2026-10-28, claude/claude-opus-5-5 via OpenAI-format
 * opencode): a tool-loop turn whose latest assistant message carried the fabricated
 * redacted placeholder failed 400, while a genuine-restored turn 0.7s earlier succeeded.
 *
 * Fix contract, scoped to provider "claude" + 5.x models (validatesReplayedThinkingBlocks):
 *   1. Genuine signed blocks are preserved VERBATIM on every turn — the older-turn
 *      rewrite to `redacted_thinking { data: DEFAULT… }` no longer runs.
 *   2. No fabricated precursor is injected — not claudeHelper's redacted placeholder,
 *      not openai-to-claude's #5312 placeholder.
 *   3. Non-genuine (empty-signature / empty-data) thinking blocks on the latest
 *      assistant turn are DROPPED — a block that cannot verify must not be sent.
 *
 * Pre-5.x models (claude-opus-4-8, claude-sonnet-4-6, haiku 4.5…) keep the exact
 * historical behavior covered by openai-to-claude-redacted-replay-5312.test.ts and
 * translator-claude-helper-thinking.test.ts.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { prepareClaudeRequest } = await import("../../open-sse/translator/helpers/claudeHelper.ts");
const { openaiToClaudeRequest } =
  await import("../../open-sse/translator/request/openai-to-claude.ts");
const { DEFAULT_THINKING_CLAUDE_SIGNATURE } =
  await import("../../open-sse/config/defaultThinkingSignature.ts");
const { validatesReplayedThinkingBlocks } =
  await import("../../src/shared/constants/modelSpecs.ts");

const GENUINE_SIG = "real-anthropic-crypto-signature-from-the-original-response";
const REAL_REDACTED_DATA = "opaque-encrypted-blob-issued-by-anthropic";

function claude5xToolLoopBody(latestAssistantContent: unknown[]) {
  return {
    model: "claude-opus-5-5",
    thinking: { type: "adaptive" },
    messages: [
      { role: "user", content: [{ type: "text", text: "Start daily routine" }] },
      // OLDER assistant turn: genuine signed thinking + tool_use
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "older genuine reasoning", signature: GENUINE_SIG },
          { type: "tool_use", id: "toolu_old", name: "bash", input: {} },
        ],
      },
      { role: "user", content: [{ type: "tool_result", tool_use_id: "toolu_old", content: "ok" }] },
      // LATEST assistant turn (shape passed by the caller)
      ...[{ role: "assistant", content: latestAssistantContent }],
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "toolu_new", content: "done" }],
      },
    ],
  };
}

function assistantMessages(result: { messages: Array<{ role: string }> }) {
  return (
    result.messages as Array<{
      role: string;
      content: Array<Record<string, unknown>> | string;
    }>
  ).filter((m) => m.role === "assistant");
}

function assertNoFabricatedBlocks(content: Array<Record<string, unknown>>, label: string): void {
  for (const block of content) {
    if (block.type === "redacted_thinking") {
      assert.notEqual(
        block.data,
        DEFAULT_THINKING_CLAUDE_SIGNATURE,
        `${label}: fabricated redacted_thinking{data:DEFAULT} must not be emitted`
      );
    }
    if (block.type === "thinking") {
      assert.notEqual(
        block.signature,
        DEFAULT_THINKING_CLAUDE_SIGNATURE,
        `${label}: fabricated thinking{signature:DEFAULT} must not be emitted`
      );
    }
  }
}

test("modelSpecs: 5.x generation validates replayed thinking blocks, 4.x does not", () => {
  assert.equal(validatesReplayedThinkingBlocks("claude-opus-5-5"), true);
  assert.equal(validatesReplayedThinkingBlocks("claude/claude-opus-5-5"), true);
  assert.equal(validatesReplayedThinkingBlocks("claude-sonnet-5-5-20260115"), true);
  assert.equal(validatesReplayedThinkingBlocks("claude-fable-5-1"), true);
  assert.equal(validatesReplayedThinkingBlocks("claude-opus-5"), true);
  assert.equal(validatesReplayedThinkingBlocks("claude-opus-4-8"), false);
  assert.equal(validatesReplayedThinkingBlocks("claude-sonnet-4-6"), false);
  assert.equal(validatesReplayedThinkingBlocks(undefined), false);
});

test("claude 5.x — older assistant turn's genuine thinking is preserved VERBATIM (no redacted rewrite)", () => {
  const result = prepareClaudeRequest(
    claude5xToolLoopBody([
      { type: "thinking", thinking: "latest genuine reasoning", signature: GENUINE_SIG },
      { type: "tool_use", id: "toolu_new", name: "bash", input: {} },
    ]) as never,
    "claude"
  );

  const assistants = assistantMessages(result as never);
  assert.ok(assistants.length >= 2);
  const older = assistants[0].content as Array<Record<string, unknown>>;
  const thinkingBlock = older.find((b) => b.type === "thinking");
  assert.ok(thinkingBlock, "older genuine thinking block must survive");
  assert.equal(thinkingBlock?.signature, GENUINE_SIG, "signature must be untouched");
  assert.equal(thinkingBlock?.thinking, "older genuine reasoning", "text must be untouched");
  assertNoFabricatedBlocks(older, "older turn");
});

test("claude 5.x — NO fabricated redacted precursor injected on a latest assistant tool_use turn", () => {
  const result = prepareClaudeRequest(
    claude5xToolLoopBody([{ type: "tool_use", id: "toolu_new", name: "bash", input: {} }]) as never,
    "claude"
  );

  const assistants = assistantMessages(result as never);
  const latest = assistants[assistants.length - 1];
  const content = latest.content as Array<Record<string, unknown>>;
  assertNoFabricatedBlocks(content, "latest turn (no-thinking case)");
  assert.ok(
    content.some((b) => b.type === "tool_use"),
    "tool_use must remain"
  );
});

test("claude 5.x — non-genuine (empty-signature) thinking on the latest assistant turn is DROPPED, not re-signed", () => {
  const result = prepareClaudeRequest(
    claude5xToolLoopBody([
      { type: "thinking", thinking: "reconstructed text nobody signed", signature: "" },
      { type: "tool_use", id: "toolu_new", name: "bash", input: {} },
    ]) as never,
    "claude"
  );

  const assistants = assistantMessages(result as never);
  const latest = assistants[assistants.length - 1];
  const content = latest.content as Array<Record<string, unknown>>;
  assertNoFabricatedBlocks(content, "latest turn (empty-signature case)");
  assert.equal(
    content.find(
      (b) =>
        (b.type === "thinking" && b.thinking === "reconstructed text nobody signed") ||
        (b.type === "redacted_thinking" && b.data === DEFAULT_THINKING_CLAUDE_SIGNATURE)
    ),
    undefined,
    "the unverifiable block must not reach the upstream in any shape"
  );
  assert.ok(
    content.some((b) => b.type === "tool_use"),
    "tool_use must remain"
  );
});

test("claude 5.x — genuine redacted_thinking data is preserved verbatim on the latest turn", () => {
  const result = prepareClaudeRequest(
    claude5xToolLoopBody([
      { type: "redacted_thinking", data: REAL_REDACTED_DATA },
      { type: "tool_use", id: "toolu_new", name: "bash", input: {} },
    ]) as never,
    "claude"
  );

  const assistants = assistantMessages(result as never);
  const latest = assistants[assistants.length - 1];
  const content = latest.content as Array<Record<string, unknown>>;
  const redacted = content.find((b) => b.type === "redacted_thinking");
  assert.ok(redacted, "genuine redacted_thinking must survive");
  assert.equal(redacted?.data, REAL_REDACTED_DATA, "data must be untouched");
});

test("openai-to-claude 5.x — reasoning_content + tool_use + thinking enabled emits NO fabricated placeholder", () => {
  const result = openaiToClaudeRequest(
    "claude-opus-5-5",
    {
      model: "claude-opus-5-5",
      thinking: { type: "adaptive" },
      messages: [
        { role: "user", content: "hello" },
        {
          role: "assistant",
          reasoning_content: "replayed reasoning text",
          tool_calls: [
            { id: "call_1", type: "function", function: { name: "get_weather", arguments: "{}" } },
          ],
        },
      ],
    },
    false,
    { _provider: "claude" }
  );

  const assistant = (
    result.messages as Array<{ role: string; content: Array<Record<string, unknown>> }>
  ).find((m) => m.role === "assistant");
  assert.ok(assistant, "expected assistant message");
  assertNoFabricatedBlocks(assistant?.content ?? [], "openai-to-claude 5x");
  assert.ok(
    (assistant?.content ?? []).some((b) => b.type === "tool_use"),
    "tool_use must remain"
  );
});

test("pre-5.x claude models keep the historical placeholder behavior (guard against over-reach)", () => {
  const result = prepareClaudeRequest(
    {
      model: "claude-opus-4-8",
      thinking: { type: "enabled", budget_tokens: 4096 },
      messages: [
        { role: "user", content: [{ type: "text", text: "hi" }] },
        {
          role: "assistant",
          content: [{ type: "tool_use", id: "call_x", name: "ls", input: {} }],
        },
        { role: "user", content: [{ type: "tool_result", tool_use_id: "call_x", content: "r" }] },
      ],
    } as never,
    "claude"
  );

  const assistants = assistantMessages(result as never);
  const latest = assistants[assistants.length - 1];
  const content = latest.content as Array<Record<string, unknown>>;
  assert.equal(content[0].type, "redacted_thinking", "4.x keeps the redacted placeholder");
  assert.equal(content[0].data, DEFAULT_THINKING_CLAUDE_SIGNATURE);
});
