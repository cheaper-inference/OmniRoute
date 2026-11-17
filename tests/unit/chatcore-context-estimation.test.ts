import test from "node:test";
import assert from "node:assert/strict";

import {
  estimateFinalInputTokenBreakdown,
  estimateFinalInputTokens,
  estimateCalibratedFinalInputTokens,
} from "../../open-sse/handlers/chatCore/contextEstimation.ts";
import { estimateTokens } from "../../open-sse/services/contextManager.ts";
import {
  recordEstimatorCalibrationFromUsage,
  resetEstimatorCalibrationForTests,
} from "../../open-sse/services/estimatorCalibration.ts";

test("estimateFinalInputTokens counts nested request contents and auxiliary fields", () => {
  const contents = [{ role: "user", parts: [{ text: "nested Gemini request" }] }];
  const tools = [{ name: "lookup", description: "find a record" }];
  const body = {
    request: { contents },
    tools,
    system: "system prompt",
    instructions: 42,
  };

  assert.equal(
    estimateFinalInputTokens(body),
    estimateTokens(contents) +
      estimateTokens(tools) +
      estimateTokens(body.system) +
      estimateTokens(body.instructions)
  );
});

test("estimateFinalInputTokens ignores a malformed nested request and uses input", () => {
  const input = [{ role: "user", content: "fallback input" }];
  const body = {
    request: "not an object",
    input,
  };

  assert.equal(estimateFinalInputTokens(body), estimateTokens(input));
});

test("estimateFinalInputTokenBreakdown identifies auxiliary input after compression", () => {
  const body = {
    messages: [{ role: "user", content: "compressed message" }],
    tools: [{ name: "lookup", description: "tool schema" }],
    system: "system prompt",
    instructions: "instructions",
  };
  const breakdown = estimateFinalInputTokenBreakdown(body);

  assert.deepEqual(breakdown, {
    messages: estimateTokens(body.messages),
    tools: estimateTokens(body.tools),
    system: estimateTokens(body.system),
    instructions: estimateTokens(body.instructions),
    total:
      estimateTokens(body.messages) +
      estimateTokens(body.tools) +
      estimateTokens(body.system) +
      estimateTokens(body.instructions),
  });
  assert.equal(estimateFinalInputTokens(body), breakdown.total);
});

test("estimateTokens accepts the unknown JSON values it already serializes", () => {
  assert.equal(estimateTokens(true), 1);
  assert.equal(estimateTokens(42), 1);
  assert.equal(estimateTokens(undefined), 0);
});

// ─── precomputed-breakdown snapshot reuse (chatCore single-scan) ────────────

function fullBody() {
  return {
    messages: [{ role: "user", content: "compress me please" }],
    tools: [{ name: "lookup", description: "tool schema" }],
    system: "system prompt",
    instructions: "instructions",
  };
}

test("precomputed breakdown: 4-arg form equals the 3-arg form on cold calibration", () => {
  resetEstimatorCalibrationForTests();
  const body = fullBody();
  const breakdown = estimateFinalInputTokenBreakdown(body);
  assert.equal(
    estimateCalibratedFinalInputTokens(body, "prov", "model", breakdown),
    estimateCalibratedFinalInputTokens(body, "prov", "model"),
    "snapshot reuse must not shift the calibrated estimate"
  );
  // The raw tools component the handler reads as its reserve is the same number
  // the old inline estimateTokens(body.tools) produced.
  assert.equal(breakdown.tools, estimateTokens(body.tools));
});

test("precomputed breakdown: equal once a calibration factor is learned", () => {
  resetEstimatorCalibrationForTests();
  try {
    const body = fullBody();
    const raw = estimateFinalInputTokens(body);
    // The calibration service only accepts observations with estimates ≥1000
    // tokens; the toy body is smaller, so seed the bucket with an explicit pair.
    for (let i = 0; i < 3; i++) {
      recordEstimatorCalibrationFromUsage({
        provider: "prov",
        model: "model",
        estimatedTokens: 200_000,
        usage: { prompt_tokens: 100_000 },
        toolsPresent: true,
      });
    }
    const breakdown = estimateFinalInputTokenBreakdown(body);
    const viaSnapshot = estimateCalibratedFinalInputTokens(body, "prov", "model", breakdown);
    const viaLegacy = estimateCalibratedFinalInputTokens(body, "prov", "model");
    assert.equal(viaSnapshot, viaLegacy);
    assert.ok(viaSnapshot < raw, `learned 0.5 factor must scale the estimate down (raw=${raw})`);
  } finally {
    resetEstimatorCalibrationForTests();
  }
});

test("precomputed breakdown: calibration disabled keeps the raw total", () => {
  const original = process.env.OMNIROUTE_ESTIMATOR_CALIBRATION;
  process.env.OMNIROUTE_ESTIMATOR_CALIBRATION = "off";
  try {
    const body = fullBody();
    const breakdown = estimateFinalInputTokenBreakdown(body);
    assert.equal(
      estimateCalibratedFinalInputTokens(body, "prov", "model", breakdown),
      estimateFinalInputTokens(body)
    );
  } finally {
    if (original === undefined) delete process.env.OMNIROUTE_ESTIMATOR_CALIBRATION;
    else process.env.OMNIROUTE_ESTIMATOR_CALIBRATION = original;
  }
});

test("precomputed breakdown: falsy bodies match the legacy form", () => {
  for (const body of [null, undefined]) {
    const breakdown = estimateFinalInputTokenBreakdown(
      body as Record<string, unknown> | null | undefined
    );
    // Empty/absent messages still carry the [] serialization cost (ceil(2/4)=1);
    // what matters is that both forms agree on the same number.
    assert.equal(
      estimateCalibratedFinalInputTokens(body, "prov", "model", breakdown),
      estimateCalibratedFinalInputTokens(body, "prov", "model")
    );
    assert.equal(breakdown.total, estimateFinalInputTokens(body));
  }
});

test("estimateFinalInputTokenBreakdown accurately counts function_call, custom_tool_call and reasoning in Responses input", () => {
  const longArgs = JSON.stringify({ code: "x".repeat(20_000) });
  const longReasoning = "thinking ".repeat(5_000);
  const body = {
    input: [
      { type: "message", role: "user", content: "hello" },
      { type: "function_call", name: "exec", arguments: longArgs, call_id: "call_1" },
      { type: "function_call_output", call_id: "call_1", output: "ok" },
      { type: "custom_tool_call", name: "edit", arguments: longArgs, call_id: "call_2" },
      { type: "custom_tool_call_output", call_id: "call_2", output: "ok" },
      { type: "reasoning", content: longReasoning },
    ],
  };

  const breakdown = estimateFinalInputTokenBreakdown(body);
  const directInputTokens = estimateTokens(body.input);
  assert.equal(breakdown.messages, directInputTokens);
  assert.ok(
    breakdown.total > 20_000,
    `expected >20k tokens from tool calls and reasoning, got ${breakdown.total}`
  );
});

test("enforceFinalOutputTokenBudget rejects Responses API payload when tool calls and reasoning exceed limit", async () => {
  const { enforceFinalOutputTokenBudget } =
    await import("../../open-sse/handlers/chatCore/finalOutputBudget.ts");
  const longArgs = JSON.stringify({ code: "x".repeat(20_000) });
  const longReasoning = "thinking ".repeat(5_000);
  const body = {
    input: [
      { type: "message", role: "user", content: "hello" },
      { type: "function_call", name: "exec", arguments: longArgs, call_id: "call_1" },
      { type: "function_call_output", call_id: "call_1", output: "ok" },
      { type: "custom_tool_call", name: "edit", arguments: longArgs, call_id: "call_2" },
      { type: "custom_tool_call_output", call_id: "call_2", output: "ok" },
      { type: "reasoning", content: longReasoning },
    ],
  };

  const breakdown = estimateFinalInputTokenBreakdown(body);
  const budget = enforceFinalOutputTokenBudget({
    body,
    finalEstimatedInputTokens: breakdown.total,
    finalContextLimit: 10_000,
    contextWindowChecksDisabled: false,
    modelOutputCap: null,
    effectiveInputCap: null,
    provider: "codex",
    effectiveModel: "gpt-6.1-sol",
    sourceFormat: "openai-responses",
    targetFormat: "openai-responses",
  });

  assert.equal(budget.ok, false);
  assert.match(budget.message, /Input exceeds context window for codex\/gpt-6\.1-sol/);
});
