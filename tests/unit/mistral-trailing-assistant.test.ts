/**
 * Regression test for stripTrailingAssistantForProvider.
 *
 * Mistral (#3396) returns 400 when the last message is role assistant with
 * plain text. Official Claude OAuth (claude-opus-5 live 2026-09-13) returns
 * 400 "This model does not support assistant message prefill" for the same
 * shape. stripTrailingAssistantOrphanToolUse only removes tool_use blocks.
 *
 * stripTrailingAssistantForProvider drops a trailing text-only assistant
 * message for providers in PROVIDERS_REQUIRING_USER_LAST_MESSAGE.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { stripTrailingAssistantOrphanToolUse } from "../../open-sse/services/contextManager.ts";
import {
  stripTrailingAssistantForProvider,
  stripTrailingAssistantInputForProvider,
} from "../../open-sse/services/contextManager.ts";

const user = (content: string) => ({ role: "user", content });
const assistant = (content: string) => ({ role: "assistant", content });
const assistantWithToolUse = () => ({
  role: "assistant",
  content: [{ type: "tool_use", id: "t1", name: "fn", input: {} }],
});

describe("stripTrailingAssistantForProvider (#3396)", () => {
  it("strips trailing text-only assistant message for mistral", () => {
    const msgs = [user("hi"), assistant("hello from model")];
    const result = stripTrailingAssistantForProvider(msgs, "mistral");
    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].role, "user");
  });

  it("strips trailing assistant with array-string content for mistral", () => {
    const msgs = [user("hi"), { role: "assistant", content: [{ type: "text", text: "response" }] }];
    const result = stripTrailingAssistantForProvider(msgs, "mistral");
    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].role, "user");
  });

  it("does NOT strip trailing tool_use assistant (stripTrailingOrphan handles that)", () => {
    const msgs = [user("hi"), assistantWithToolUse()];
    const result = stripTrailingAssistantForProvider(msgs, "mistral");
    // tool_use trailing is already handled by stripTrailingAssistantOrphanToolUse;
    // this function should not double-strip or corrupt tool-use state
    assert.strictEqual(result.length, 2);
  });

  it("does NOT strip trailing text assistant for non-mistral providers", () => {
    const msgs = [user("hi"), assistant("response")];
    const result = stripTrailingAssistantForProvider(msgs, "openai");
    assert.strictEqual(result.length, 2);
  });

  it("strips trailing text-only assistant message for claude", () => {
    const msgs = [user("hi"), assistant("continue from here")];
    const result = stripTrailingAssistantForProvider(msgs, "claude");
    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].role, "user");
  });

  it("strips trailing assistant with array-string content for claude", () => {
    const msgs = [
      user("hi"),
      { role: "assistant", content: [{ type: "text", text: "continue from here" }] },
    ];
    const result = stripTrailingAssistantForProvider(msgs, "claude");
    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].role, "user");
  });

  it("returns messages unchanged when last message is user", () => {
    const msgs = [assistant("a"), user("b")];
    const result = stripTrailingAssistantForProvider(msgs, "mistral");
    assert.strictEqual(result.length, 2);
    assert.strictEqual(result[1].role, "user");
  });

  it("returns empty array unchanged", () => {
    const result = stripTrailingAssistantForProvider([], "mistral");
    assert.deepStrictEqual(result, []);
  });

  it("existing stripTrailingAssistantOrphanToolUse still works after change", () => {
    const msgs = [user("hi"), assistantWithToolUse()];
    const result = stripTrailingAssistantOrphanToolUse(msgs);
    // tool_use block removed; empty assistant → dropped
    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0].role, "user");
  });
});

describe("stripTrailingAssistantInputForProvider (Responses `input`)", () => {
  const userItem = { role: "user", content: [{ type: "input_text", text: "hi" }] };
  const assistantItem = { role: "assistant", content: [{ type: "output_text", text: "hello" }] };
  const assistantMessage = { type: "message", ...assistantItem };
  const reasoning = { type: "reasoning", summary: [] };
  const toolCall = { type: "function_call", call_id: "c1", name: "fn", arguments: "{}" };
  const toolOutput = { type: "function_call_output", call_id: "c1", output: "ok" };

  it("strips a trailing assistant item for mistral, typed or not", () => {
    assert.deepEqual(stripTrailingAssistantInputForProvider([userItem, assistantItem], "mistral"), [
      userItem,
    ]);
    assert.deepEqual(
      stripTrailingAssistantInputForProvider([userItem, assistantMessage], "mistral"),
      [userItem]
    );
  });

  it("drops the reasoning items of the stripped turn with it", () => {
    const input = [userItem, reasoning, assistantMessage];
    assert.deepEqual(stripTrailingAssistantInputForProvider(input, "mistral"), [userItem]);
  });

  it("keeps a history that ends on a user turn, a tool call or a tool output", () => {
    for (const input of [
      [assistantMessage, userItem],
      [userItem, toolCall],
      [userItem, toolCall, toolOutput],
    ]) {
      assert.deepEqual(stripTrailingAssistantInputForProvider(input, "mistral"), input);
    }
  });

  it("leaves other providers and a string input alone", () => {
    const input = [userItem, assistantItem];
    assert.deepEqual(stripTrailingAssistantInputForProvider(input, "openai"), input);
    assert.equal(stripTrailingAssistantInputForProvider("hello", "mistral"), "hello");
  });
});
