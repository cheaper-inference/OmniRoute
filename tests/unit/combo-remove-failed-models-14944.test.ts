/**
 * #14944 — "Delete N failed model(s)" in the combo test results modal.
 *
 * The button removes the top-level combo steps whose probe failed. Steps are
 * matched by the `stepId` the test route reports (normalizeComboStep's id), not
 * by a hand-built string, and only failures that say the model itself is broken
 * count: timeouts, 408/429 and 5xx are transient and must never prune a combo.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { normalizeComboStep } from "../../src/lib/combos/steps.ts";
import {
  collectRemovableFailedStepIds,
  isRemovableComboTestFailure,
  removeFailedComboSteps,
} from "../../src/app/(dashboard)/dashboard/combos/removeFailedComboModels.ts";

const stepIdOf = (comboName: string, entry: unknown, index: number) =>
  normalizeComboStep(entry, { comboName, index })?.id as string;

test("only non-transient 4xx probe failures are removable", () => {
  assert.equal(isRemovableComboTestFailure({ status: "error", statusCode: 404 }), true);
  assert.equal(isRemovableComboTestFailure({ status: "error", statusCode: 400 }), true);
  assert.equal(isRemovableComboTestFailure({ status: "error", statusCode: 429 }), false);
  assert.equal(isRemovableComboTestFailure({ status: "error", statusCode: 408 }), false);
  assert.equal(isRemovableComboTestFailure({ status: "error", statusCode: 503 }), false);
  assert.equal(
    isRemovableComboTestFailure({ status: "error", statusCode: 404, isTimeout: true }),
    false
  );
  // No status code: network error, client abort or a skipped web-session probe.
  assert.equal(isRemovableComboTestFailure({ status: "error" }), false);
  assert.equal(isRemovableComboTestFailure({ status: "ok", statusCode: 404 }), false);
  assert.equal(isRemovableComboTestFailure(null), false);
});

test("a step counts as failed only when every probe of it failed", () => {
  const ids = collectRemovableFailedStepIds([
    { stepId: "a", status: "error", statusCode: 404 },
    // Connection-aware expansion probes one step once per account.
    { stepId: "b", status: "error", statusCode: 404 },
    { stepId: "b", status: "ok" },
    { stepId: "c", status: "error", statusCode: 429 },
    { stepId: "d", status: "error", statusCode: 401 },
    { stepId: "d", status: "error", statusCode: 403 },
    { status: "error", statusCode: 404 },
  ]);
  assert.deepEqual(ids, ["a", "d"]);
  assert.deepEqual(collectRemovableFailedStepIds(undefined), []);
});

test("removes the failed steps by their real step id, string and object entries alike", () => {
  const combo = {
    name: "Free Manifest",
    models: [
      "openai/gpt-4o-mini",
      { id: "explicit-step", kind: "model", model: "groq/llama-3.1-8b" },
      "anthropic/claude-haiku",
    ],
  };
  const failed = [
    stepIdOf(combo.name, combo.models[0], 0),
    "explicit-step",
    "some-nested-combo-step",
  ];

  const { models, removedCount } = removeFailedComboSteps(combo, failed);

  assert.equal(removedCount, 2);
  assert.deepEqual(models, ["anthropic/claude-haiku"]);
  // The pre-fix id builder skipped normalizeComboStep's slugging, so it never matched.
  assert.notEqual(
    stepIdOf(combo.name, combo.models[0], 0),
    "Free Manifest-model-1-openai/gpt-4o-mini"
  );
});

test("leaves the combo untouched when no top-level step matches", () => {
  const combo = { name: "c", models: ["openai/gpt-4o-mini"] };
  const { models, removedCount } = removeFailedComboSteps(combo, ["nested-step"]);
  assert.equal(removedCount, 0);
  assert.deepEqual(models, combo.models);
  assert.deepEqual(removeFailedComboSteps({ name: "c" }, ["x"]), { models: [], removedCount: 0 });
});
