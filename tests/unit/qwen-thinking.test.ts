// Qwen rejects a forced or object `tool_choice` while thinking is on, so the request body is
// sanitised: thinking is active for `thinking: true`, `enable_thinking: true` or a `{ type: "enabled" }`
// object; `required` and any object `tool_choice` are incompatible; and the sanitiser rewrites only
// that combination to "auto", with a warning that names the provider.
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  isQwenThinkingActive,
  isQwenThinkingToolChoiceIncompatible,
  sanitizeQwenThinkingToolChoice,
} from "../../open-sse/services/qwenThinking.ts";

test("thinking is active for true, enable_thinking true or an enabled object", () => {
  assert.equal(isQwenThinkingActive({ thinking: true }), true);
  assert.equal(isQwenThinkingActive({ enable_thinking: true }), true);
  assert.equal(isQwenThinkingActive({ thinking: { type: "enabled" } }), true);
});

test("thinking is not active for anything else", () => {
  assert.equal(isQwenThinkingActive({}), false);
  assert.equal(isQwenThinkingActive({ thinking: false }), false);
  assert.equal(isQwenThinkingActive({ thinking: { type: "disabled" } }), false);
  assert.equal(isQwenThinkingActive({ thinking: [{ type: "enabled" }] }), false);
  assert.equal(isQwenThinkingActive({ thinking: null, enable_thinking: "true" }), false);
});

test("required and object tool_choice values are incompatible with thinking", () => {
  assert.equal(isQwenThinkingToolChoiceIncompatible("required"), true);
  assert.equal(isQwenThinkingToolChoiceIncompatible({ type: "function" }), true);
  assert.equal(isQwenThinkingToolChoiceIncompatible("auto"), false);
  assert.equal(isQwenThinkingToolChoiceIncompatible("none"), false);
  assert.equal(isQwenThinkingToolChoiceIncompatible(null), false);
  assert.equal(isQwenThinkingToolChoiceIncompatible(undefined), false);
});

test("an incompatible tool_choice with thinking on becomes auto and warns with the provider", (t) => {
  const warn = t.mock.method(console, "warn", () => {});
  const body = { thinking: true, tool_choice: "required", model: "m" };
  const result = sanitizeQwenThinkingToolChoice(body, "Qwen Cloud");
  assert.deepEqual(result, { thinking: true, tool_choice: "auto", model: "m" });
  assert.equal(body.tool_choice, "required", "the input body is not mutated");
  assert.equal(warn.mock.callCount(), 1);
  assert.match(String(warn.mock.calls[0].arguments[0]), /^\[Qwen Cloud\] .*required.*"auto"/);
});

test("an object tool_choice is labelled object in the warning", (t) => {
  const warn = t.mock.method(console, "warn", () => {});
  const result = sanitizeQwenThinkingToolChoice({
    enable_thinking: true,
    tool_choice: { type: "function", function: { name: "f" } },
  });
  assert.equal(result.tool_choice, "auto");
  assert.match(String(warn.mock.calls[0].arguments[0]), /^\[Qwen\] .*\bobject\b/);
});

test("the same body is returned untouched when thinking is off or the choice is compatible", (t) => {
  const warn = t.mock.method(console, "warn", () => {});
  const off = { tool_choice: "required" };
  const compatible = { thinking: true, tool_choice: "auto" };
  assert.equal(sanitizeQwenThinkingToolChoice(off), off);
  assert.equal(sanitizeQwenThinkingToolChoice(compatible), compatible);
  assert.equal(warn.mock.callCount(), 0);
});
