// One combo invocation must not grow its in-memory trace without limit: decisions and Auto
// evaluation transitions stop at 512 events, the trace says it was cut, and the terminal status
// (recorded outside the event lists) is still kept.
import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";

const {
  finalizeComboTrace,
  finishComboTrace,
  getComboTrace,
  recordAutoEvaluationTransition,
  recordComboDecision,
  resetComboTraceStore,
  startAutoEvaluationTrace,
  startComboTrace,
} = await import("../../../open-sse/services/combo/decisionTrace.ts");

const MAX_EVENTS = 512;

beforeEach(() => resetComboTraceStore());

test("decisions stop at the cap and the trace is marked truncated", () => {
  startComboTrace("combo-cap-1", { strategy: "priority", comboName: "c" });
  for (let i = 0; i < MAX_EVENTS + 100; i++) {
    recordComboDecision("combo-cap-1", {
      step: `s${i}`,
      target: `p/m${i}`,
      decision: "skipped_before_dispatch",
      reason: "circuit_open",
    });
  }
  const trace = getComboTrace("combo-cap-1");
  assert.equal(trace?.decisions.length, MAX_EVENTS);
  assert.equal(trace?.truncated, true);
  assert.equal(trace?.decisions[0].step, "s0", "the oldest events are the ones kept");
});

test("a trace under the cap is not marked truncated", () => {
  startComboTrace("combo-cap-2", { strategy: "priority", comboName: "c" });
  recordComboDecision("combo-cap-2", { step: "a", target: "p/m", decision: "dispatched" });
  const trace = getComboTrace("combo-cap-2");
  assert.equal(trace?.decisions.length, 1);
  assert.equal(trace?.truncated, undefined);
});

test("finalize cannot push a trace past the cap, and the terminal status is kept", () => {
  startComboTrace("combo-cap-3", { strategy: "priority", comboName: "c" });
  for (let i = 0; i < MAX_EVENTS; i++) {
    recordComboDecision("combo-cap-3", {
      step: `s${i}`,
      target: `p/m${i}`,
      decision: "dispatched",
    });
  }
  const many = Array.from({ length: 50 }, (_, i) => ({
    executionKey: `extra${i}`,
    modelStr: `p/x${i}`,
  }));
  finalizeComboTrace("combo-cap-3", many);
  finishComboTrace("combo-cap-3", { status: 503, errorClass: "all_targets_skipped" });
  const trace = getComboTrace("combo-cap-3");
  assert.equal(trace?.decisions.length, MAX_EVENTS);
  assert.deepEqual(trace?.terminal, { status: 503, errorClass: "all_targets_skipped" });
});

test("Auto evaluation transitions stop at the cap", () => {
  startComboTrace("combo-cap-4", { strategy: "auto", comboName: "auto" });
  startAutoEvaluationTrace("combo-cap-4");
  for (let i = 0; i < MAX_EVENTS + 100; i++) {
    recordAutoEvaluationTransition("combo-cap-4", {
      target: `p/m${i}`,
      stage: "resilience",
      outcome: "excluded",
    });
  }
  const trace = getComboTrace("combo-cap-4");
  assert.equal(trace?.autoEvaluation?.transitions.length, MAX_EVENTS);
  assert.equal(trace?.truncated, true);
});
