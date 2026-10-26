/**
 * Step ids are built from slugified combo names and targets (src/lib/combos/steps.ts).
 * Pins the slug shape and keeps the edge-dash strip linear-time on long separator runs
 * (CodeQL #1165, js/polynomial-redos).
 */

import test from "node:test";
import assert from "node:assert/strict";

const { normalizeComboStep } = await import("../../src/lib/combos/steps.ts");

function stepId(value: string, comboName: string | null = null): string {
  const step = normalizeComboStep(value, { comboName, index: 0 });
  assert.ok(step, `step for ${JSON.stringify(value)}`);
  return step.id;
}

test("step id slugs drop leading and trailing separators", () => {
  assert.equal(stepId("openai/gpt-4o", "--My Combo!!--"), "my-combo-model-1-openai-gpt-4o");
  assert.equal(stepId(" ..Claude Sonnet.. "), "combo-model-1-claude-sonnet");
  assert.equal(stepId("a--b"), "combo-model-1-a-b");
});

test("a target with no letters or digits falls back to the 'step' slug", () => {
  assert.equal(stepId("!!!"), "combo-model-1-step");
  assert.equal(stepId("---"), "combo-model-1-step");
});

test("long separator runs around the target stay fast and collapse to one slug", () => {
  const run = "-".repeat(200_000);
  const started = performance.now();
  const id = stepId(`${run}a${run}b${run}`);
  const elapsedMs = performance.now() - started;
  assert.equal(id, "combo-model-1-a-b");
  assert.ok(elapsedMs < 1_000, `slugify took ${elapsedMs.toFixed(0)} ms`);
});
