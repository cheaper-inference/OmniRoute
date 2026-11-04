// The signed-thinking store (claudeThinkingStore) is keyed by tool_use id and keeps
// only the newest generation of a turn. A client that retries a turn re-sends the same
// tool_call id for a different generation, so restoring the store's block into the older
// turn replays a block the upstream never saw in that position and it answers
// 400 "…blocks in the latest assistant message cannot be modified".
//
// Fix: openaiToClaudeRequest counts tool_call ids across the whole client history and
// skips the restore for any turn whose id is ambiguous (appears more than once).
// A request without thinking blocks is valid and is what clients sent before the store.

import { test } from "node:test";
import assert from "node:assert/strict";
import { openaiToClaudeRequest } from "../../open-sse/translator/request/openai-to-claude.ts";
import { storeClaudeThinkingBlocks } from "../../open-sse/services/claudeThinkingStore.ts";

const PROVIDER = "claude";
const MODEL = "claude-opus-5-5";
// Signed blocks are bound to the serving connection (#17324), so store and request share one.
const CONNECTION = "conn-dup-ids";

type Block = { type?: string; id?: string };
type Msg = { role?: string; content?: unknown };

function body(assistantTurns: Array<{ id: string }>) {
  return {
    model: MODEL,
    max_tokens: 4096,
    stream: true,
    // The restore only runs for MANUAL extended thinking on the tip (adaptive-only models
    // accept tool turns without a thinking block, #17324).
    thinking: { type: "enabled", budget_tokens: 2048 },
    messages: [
      { role: "user", content: "do something" },
      ...assistantTurns.map((t) => ({
        role: "assistant",
        content: "",
        tool_calls: [
          { id: t.id, type: "function", function: { name: "get_time", arguments: "{}" } },
        ],
      })),
      ...assistantTurns.map((t) => ({ role: "tool", tool_call_id: t.id, content: "12:00" })),
      { role: "user", content: "continue" },
    ],
  };
}

function translate(turns: Array<{ id: string }>): { messages: Msg[] } {
  return openaiToClaudeRequest(
    MODEL,
    body(turns) as unknown as Parameters<typeof openaiToClaudeRequest>[1],
    true,
    { _provider: PROVIDER, _connectionId: CONNECTION }
  ) as unknown as { messages: Msg[] };
}

function lastAssistant(messages: Msg[]) {
  return [...messages].reverse().find((m) => m.role === "assistant");
}

function thinkingBlocks(msg: Msg | undefined): Block[] {
  return Array.isArray(msg?.content)
    ? (msg.content as Block[]).filter(
        (b) => b?.type === "thinking" || b?.type === "redacted_thinking"
      )
    : [];
}

test("duplicated tool_call id: no restore from the store (prevents the 400 'cannot be modified')", () => {
  const id = "toolu_dup_1";
  assert.ok(
    storeClaudeThinkingBlocks({
      toolUseIds: [id],
      blocks: [{ type: "thinking", thinking: "old generation", signature: "IMZA_A" }],
      provider: PROVIDER,
      model: MODEL,
      connectionId: CONNECTION,
    })
  );
  const out = translate([{ id }, { id }]);
  const son = lastAssistant(out.messages);
  assert.equal(
    thinkingBlocks(son).length,
    0,
    "the last assistant message carrying a duplicated id must not get a thinking block"
  );
});

test("unique tool_call id: the store restore still runs (feature preserved)", () => {
  const id = "toolu_tekil_1";
  assert.ok(
    storeClaudeThinkingBlocks({
      toolUseIds: [id],
      blocks: [{ type: "thinking", thinking: "right generation", signature: "IMZA_B" }],
      provider: PROVIDER,
      model: MODEL,
      connectionId: CONNECTION,
    })
  );
  const out = translate([{ id }]);
  const son = lastAssistant(out.messages);
  assert.equal(thinkingBlocks(son).length, 1, "a unique id must get its thinking block restored");
});

test("distinct ids but one duplicated: only the duplicated turn is skipped", () => {
  const dup = "toolu_mix_dup";
  const tek = "toolu_mix_tek";
  storeClaudeThinkingBlocks({
    toolUseIds: [dup, tek],
    blocks: [{ type: "thinking", thinking: "x", signature: "IMZA_C" }],
    provider: PROVIDER,
    model: MODEL,
    connectionId: CONNECTION,
  });
  const out = translate([{ id: dup }, { id: dup }, { id: tek }]);
  const asistans = out.messages.filter((m) => m.role === "assistant");
  const duz = asistans.filter((m) => thinkingBlocks(m).length > 0);
  assert.equal(duz.length, 1, "only the turn with the unique id gets a thinking block");
  const aldiId = (duz[0].content as Block[]).find((b) => b?.type === "tool_use")?.id;
  assert.equal(aldiId, tek, "the turn that got the block must be the unique-id one");
});
