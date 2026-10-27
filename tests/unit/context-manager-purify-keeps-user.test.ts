import { test } from "node:test";
import assert from "node:assert/strict";
import { compressContext } from "../../open-sse/services/contextManager.ts";

/**
 * Agentic sessions are one user task followed by many assistant(tool_calls)/tool
 * pairs. purifyHistory() keeps only the newest tail, which used to drop the lone
 * user turn and forward `system, assistant, tool, ...` upstream. vLLM chat
 * templates (Qwen) reject that with HTTP 400 "No user query found in messages."
 * The newest user message must survive Layer-3 purification.
 */

function toolTurns(count: number, size: number) {
  return Array.from({ length: count }, (_, i) => [
    {
      role: "assistant",
      content: "",
      tool_calls: [
        { id: `c${i}`, type: "function", function: { name: "read_file", arguments: "{}" } },
      ],
    },
    { role: "tool", tool_call_id: `c${i}`, content: `result ${i}: ${"x".repeat(size)}` },
  ]).flat();
}

function purify(messages: Record<string, unknown>[]) {
  const result = compressContext(
    { model: "any-model", messages },
    {
      maxTokens: 5_000,
      reserveTokens: 0,
    }
  );
  assert.equal(result.compressed, true);
  return (result.body as { messages: Array<Record<string, unknown>> }).messages;
}

test("purify_history keeps the user task when only tool turns would remain", () => {
  const messages = purify([
    { role: "system", content: "You are a worker." },
    { role: "user", content: "work kanban task t_1" },
    ...toolTurns(30, 1_900),
  ]);
  const users = messages.filter((m) => m.role === "user");
  assert.equal(users.length, 1);
  assert.equal(users[0].content, "work kanban task t_1");
  assert.equal(messages[0].role, "system");
  assert.equal(messages[1].role, "user", "user turn sits right after the system message");
  assert.match(String(messages[0].content), /Context compressed/);
  // Kept tail stays well-formed: every tool message follows its assistant call.
  assert.notEqual(messages[2].role, "tool");
});

test("purify_history re-anchors the newest user turn, not the oldest", () => {
  const messages = purify([
    { role: "system", content: "sys" },
    { role: "user", content: "first task" },
    ...toolTurns(10, 1_900),
    { role: "user", content: "second task" },
    ...toolTurns(20, 1_900),
  ]);
  const users = messages.filter((m) => m.role === "user").map((m) => m.content);
  assert.deepEqual(users, ["second task"]);
});

test("purify_history does not add a user turn when the tail already has one", () => {
  const messages = purify([
    { role: "system", content: "sys" },
    { role: "user", content: "old" },
    ...toolTurns(20, 1_900),
    { role: "user", content: "latest question" },
  ]);
  const users = messages.filter((m) => m.role === "user").map((m) => m.content);
  assert.deepEqual(users, ["latest question"]);
});

test("purify_history with no user turn at all does not invent one", () => {
  const messages = purify([{ role: "system", content: "sys" }, ...toolTurns(30, 1_900)]);
  assert.equal(messages.filter((m) => m.role === "user").length, 0);
});
