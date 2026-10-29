import assert from "node:assert/strict";
import test from "node:test";
import { createCompletedResponsesToolHandoffWatcher } from "../../open-sse/utils/responsesToolHandoff.ts";

function frame(type: string, fields: Record<string, unknown>): string {
  return `data: ${JSON.stringify({ type, ...fields })}\n\n`;
}

test("completed items match done values in either event order for both tool types", () => {
  for (const type of ["function_call", "custom_tool_call"]) {
    const key = type === "function_call" ? "arguments" : "input";
    const doneType =
      type === "function_call"
        ? "response.function_call_arguments.done"
        : "response.custom_tool_call_input.done";
    const done = frame(doneType, { call_id: "call", [key]: "" });
    const item = frame("response.output_item.done", {
      item: { type, call_id: "call", name: "tool", [key]: "" },
    });
    for (const events of [
      [done, item],
      [item, done],
    ]) {
      const watcher = createCompletedResponsesToolHandoffWatcher();
      assert.equal(watcher.note(events[0]), false);
      assert.equal(watcher.note(events[1]), true);
      assert.equal(watcher.note("malformed"), true);
    }
  }
});

test("malformed or incomplete items never qualify despite a matching done event", () => {
  const valid = { type: "function_call", call_id: "call", name: "tool", arguments: "{}" };
  for (const item of [
    null,
    [],
    "invalid",
    {},
    { ...valid, type: "message" },
    { ...valid, call_id: " " },
    { ...valid, call_id: 1 },
    { ...valid, name: " " },
    { ...valid, name: null },
    { ...valid, status: "in_progress" },
    { ...valid, arguments: {} },
    { ...valid, arguments: "different" },
  ]) {
    const watcher = createCompletedResponsesToolHandoffWatcher();
    assert.equal(
      watcher.note(
        frame("response.function_call_arguments.done", {
          call_id: "call",
          arguments: "{}",
        })
      ),
      false
    );
    assert.equal(watcher.note(frame("response.output_item.done", { item })), false);
  }
});
