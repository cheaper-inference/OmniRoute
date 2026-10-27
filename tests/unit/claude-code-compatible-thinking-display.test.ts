// A Claude Code compatible request may ask for summarized thinking, either through the Copilot
// reasoning-summary marker on the normalised body or through the connection setting. A disabled
// thinking block is never touched, an explicit `display` wins over the connection setting but not over
// the marker, and the input object is never mutated.
import { test } from "node:test";
import assert from "node:assert/strict";

import { applyClaudeCodeCompatibleThinkingDisplay } from "../../open-sse/services/claudeCodeCompatibleThinkingDisplay.ts";

const MARKER = "_omnirouteCopilotReasoningSummary";

test("disabled thinking is returned as is, whatever is requested", () => {
  const thinking = { type: "disabled" };
  const result = applyClaudeCodeCompatibleThinkingDisplay(thinking, {
    summarizeThinking: true,
    normalizedBody: { [MARKER]: "summarized" },
  });
  assert.equal(result, thinking);
});

test("without a marker or the connection setting nothing changes", () => {
  const thinking = { type: "enabled", budget_tokens: 1024 };
  assert.equal(applyClaudeCodeCompatibleThinkingDisplay(thinking), thinking);
  assert.equal(
    applyClaudeCodeCompatibleThinkingDisplay(thinking, { summarizeThinking: false }),
    thinking
  );
  assert.equal(
    applyClaudeCodeCompatibleThinkingDisplay(thinking, { normalizedBody: null }),
    thinking
  );
  assert.equal(
    applyClaudeCodeCompatibleThinkingDisplay(thinking, { normalizedBody: { [MARKER]: "full" } }),
    thinking
  );
});

test("the connection setting adds display summarized without mutating the input", () => {
  const thinking = { type: "enabled", budget_tokens: 1024 };
  const result = applyClaudeCodeCompatibleThinkingDisplay(thinking, { summarizeThinking: true });
  assert.deepEqual(result, { type: "enabled", budget_tokens: 1024, display: "summarized" });
  assert.equal("display" in thinking, false);
});

test("the marker alone also adds display summarized", () => {
  const result = applyClaudeCodeCompatibleThinkingDisplay(
    { type: "enabled" },
    { normalizedBody: { [MARKER]: "summarized" } }
  );
  assert.deepEqual(result, { type: "enabled", display: "summarized" });
});

test("an explicit display wins over the connection setting", () => {
  const thinking = { type: "enabled", display: "omitted" };
  assert.equal(
    applyClaudeCodeCompatibleThinkingDisplay(thinking, { summarizeThinking: true }),
    thinking
  );
});

test("the marker overrides an explicit display", () => {
  const result = applyClaudeCodeCompatibleThinkingDisplay(
    { type: "enabled", display: "omitted" },
    { normalizedBody: { [MARKER]: "summarized" } }
  );
  assert.equal(result.display, "summarized");
});

test("a null, undefined or blank display counts as not set", () => {
  for (const display of [null, undefined, "", "   "]) {
    const result = applyClaudeCodeCompatibleThinkingDisplay(
      { type: "enabled", display },
      { summarizeThinking: true }
    );
    assert.equal(result.display, "summarized", String(display));
  }
});
