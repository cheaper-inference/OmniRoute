// Unit tests for the claude-agent executor's local turn-history cleaning
// (clear_tool_uses strategy applied locally — the CLI child cannot accept
// Anthropic's server-side context_management).
import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  clearOldToolUses,
  hasClearToolUsesEdit,
} from "../../open-sse/executors/claude-agent.ts";

const STRATEGY = "clear_tool_uses_20250919";

function toolUse(id: string, name = "bash") {
  return { type: "tool_use", id, name, input: { command: "ls" } };
}
function toolResult(id: string, text = "output") {
  return { type: "tool_result", tool_use_id: id, content: text };
}

// 1M tokens ≈ 4M chars would be slow; shrink via a tiny client-provided trigger.
function body(
  trigger: number,
  messages: unknown[],
  keep?: number
): Parameters<typeof clearOldToolUses>[0] {
  return {
    model: "claude-sonnet-5-5",
    context_management: {
      edits: [{ type: STRATEGY, trigger: { type: "input_tokens", value: trigger }, ...(keep !== undefined ? { keep: { type: "tool_uses", value: keep } } : {}) }],
    },
    messages,
  };
}

describe("claude-agent turn-history cleaning", () => {
  it("detects a client clear_tool_uses edit", () => {
    assert.equal(hasClearToolUsesEdit(body(10, [])), true);
    assert.equal(
      hasClearToolUsesEdit({
        context_management: { edits: [{ type: "clear_thinking_20251015" }] },
        messages: [],
      }),
      false
    );
    assert.equal(hasClearToolUsesEdit({ messages: [] }), false);
  });

  it("leaves history below the trigger untouched", () => {
    const original = [
      { role: "assistant", content: [toolUse("t1")] },
      { role: "user", content: [toolResult("t1")] },
    ];
    const cleaned = clearOldToolUses(body(10_000, original, 0));
    assert.deepEqual(cleaned.messages, original);
  });

  it("leaves history when tool_uses <= keep", () => {
    const original = [
      { role: "assistant", content: [toolUse("t1"), toolUse("t2"), toolUse("t3")] },
      { role: "user", content: [toolResult("t1"), toolResult("t2"), toolResult("t3")] },
    ];
    const cleaned = clearOldToolUses(body(10, original, 3));
    assert.deepEqual(cleaned.messages, original);
  });

  it("clears older tool blocks above the trigger, keeping the newest", () => {
    const messages = [
      { role: "assistant", content: [toolUse("t1", "x".repeat(1200))] },
      { role: "user", content: [toolResult("t1", "y".repeat(1200))] },
      { role: "assistant", content: [toolUse("t2")] },
      { role: "user", content: [toolResult("t2")] },
      { role: "user", content: "next" },
    ];
    const cleaned = clearOldToolUses(body(10, messages, 1));
    const cleanedMessages = cleaned.messages as Array<{ role: string; content: unknown }>;
    assert.deepEqual(cleanedMessages[0].content, [{ type: "text", text: "[cleared old tool call]" }]);
    assert.deepEqual(cleanedMessages[1].content, [{ type: "text", text: "[cleared old tool call]" }]);
    // newest tool pair kept intact
    assert.equal(
      (cleanedMessages[2].content as Array<{ type: string }>).some((b) => b.type === "tool_use"),
      true
    );
    assert.equal((cleanedMessages[3].content as Array<{ type: string }>).some((b) => b.type === "tool_result"), true);
    // trigger message untouched
    assert.equal(cleanedMessages[4].content, "next");
  });

  it("uses Anthropic defaults when the client sent no trigger", () => {
    const big = "z".repeat(600_000); // ~150k estimated tokens > 100k default
    const pairs = ["t1", "t2", "t3", "t4"].map((id) => [
      { role: "assistant", content: [toolUse(id)] },
      { role: "user", content: [toolResult(id)] },
    ]);
    const messages = [{ role: "user", content: big }, ...pairs.flat()];
    const cleaned = clearOldToolUses({ messages });
    const cleanedMessages = cleaned.messages as Array<{ role: string; content: unknown }>;
    // default keep=3 → only the oldest pair cleared
    assert.equal((cleanedMessages[2].content as Array<{ type: string }>)[0].type, "text");
    assert.equal((cleanedMessages[1].content as Array<{ type: string }>)[0].type, "text");
    assert.equal((cleanedMessages[3].content as Array<{ type: string }>)[0].type, "tool_use");
  });

  it("ignores string-content messages and subagent tool_uses", () => {
    const messages = [
      { role: "assistant", content: "plain text" },
      { role: "user", content: [{ type: "text", text: "hi" }] },
      { role: "assistant", content: [toolUse("t1", "x".repeat(1500))] },
      { role: "user", content: [toolResult("t1", "y".repeat(1500))] },
      { role: "user", content: "go" },
    ];
    const cleaned = clearOldToolUses(body(10, messages, 0));
    const cleanedMessages = cleaned.messages as Array<{ role: string; content: unknown }>;
    assert.equal(cleanedMessages[0].content, "plain text");
    assert.equal(cleanedMessages[3].content[0].type, "text");
  });
});
