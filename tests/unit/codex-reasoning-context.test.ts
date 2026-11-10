import test from "node:test";
import assert from "node:assert/strict";

import { applyCodexReasoningSelection } from "../../open-sse/executors/codex/reasoningPolicy.ts";

for (const context of ["auto", "current_turn", "all_turns", null]) {
  for (const catalogBacked of [false, true]) {
    const source = catalogBacked ? "catalog" : "legacy";
    test(`Codex preserves reasoning.context=${String(context)} (${source})`, () => {
      const body: Record<string, unknown> = {
        model: "gpt-6.1-sol",
        reasoning: { effort: "xhigh", context, enabled: true, max_tokens: 2048, exclude: true },
      };
      applyCodexReasoningSelection(
        "gpt-6.1-sol",
        body,
        catalogBacked
          ? { model: "gpt-6.1-sol", supportedThinkingEfforts: ["low", "xhigh"] }
          : undefined,
        undefined,
        false
      );
      assert.deepEqual(body.reasoning, { effort: "xhigh", context });
    });
  }
}

test("Codex preserves an explicit reasoning summary alongside context", () => {
  const body: Record<string, unknown> = {
    reasoning: { effort: "xhigh", context: "all_turns", summary: "detailed", max_tokens: 2048 },
  };
  applyCodexReasoningSelection("gpt-6.1-sol", body, undefined, undefined, false);
  assert.deepEqual(body.reasoning, { effort: "xhigh", context: "all_turns", summary: "detailed" });
});

test("ordinary effort-only selection still strips unsupported reasoning keys", () => {
  const body: Record<string, unknown> = {
    reasoning: { effort: "high", enabled: true, max_tokens: 2048, exclude: true },
  };
  applyCodexReasoningSelection("gpt-6.1-sol", body, undefined, undefined, false);
  assert.deepEqual(body.reasoning, { effort: "high" });
});

test("disabled reasoning still resolves to none without forwarding extra keys", () => {
  const body: Record<string, unknown> = { reasoning: { enabled: false, max_tokens: 2048 } };
  applyCodexReasoningSelection("gpt-6.1-sol", body, undefined, "high", true);
  assert.deepEqual(body.reasoning, { effort: "none" });
});

test("context-only reasoning survives when defaults are disabled", () => {
  const body: Record<string, unknown> = { reasoning: { context: "all_turns", exclude: true } };
  applyCodexReasoningSelection("gpt-6.1-sol", body, undefined, undefined, false);
  assert.deepEqual(body.reasoning, { context: "all_turns" });
});

test("explicit context survives enabled:false normalization without certifying backend support", () => {
  const body: Record<string, unknown> = {
    reasoning: { enabled: false, context: "current_turn", max_tokens: 2048 },
  };
  applyCodexReasoningSelection("gpt-6-astra", body, undefined, "high", true);
  assert.deepEqual(body.reasoning, { effort: "none", context: "current_turn" });
});

test("forced effort preserves explicit context while unsupported siblings are stripped", () => {
  const body: Record<string, unknown> = {
    reasoning: { effort: "low", context: "all_turns", enabled: true, exclude: true },
  };
  applyCodexReasoningSelection("gpt-6.1-sol", body, undefined, undefined, false, "xhigh");
  assert.deepEqual(body.reasoning, { effort: "xhigh", context: "all_turns" });
});
