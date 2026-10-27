import test from "node:test";
import assert from "node:assert/strict";
import { normalizeComboModels } from "../../src/lib/combos/steps.ts";
import { comboModelStepInputSchema } from "../../src/shared/validation/schemas/combo.ts";
import { normalizeSnapshotWeights } from "../../src/lib/combos/snapshotWeights.ts";

test("a snapshot with 131 candidates retains every positive weight and totals 100", () => {
  const models = Array.from({ length: 131 }, (_, index) => ({ id: `model-${index}`, weight: 1 }));
  const ids = models.map((model) => model.id);

  normalizeSnapshotWeights(models);

  assert.equal(
    models.reduce((sum, model) => sum + model.weight, 0),
    100
  );
  assert.deepEqual(
    models.map((model) => model.id),
    ids
  );
  assert.ok(models.every((model) => Number.isFinite(model.weight) && model.weight > 0));
});

test("a skewed snapshot keeps small candidates positive without exceeding 100", () => {
  const models = [{ weight: 100 }, ...Array.from({ length: 9 }, () => ({ weight: 0.01 }))];

  normalizeSnapshotWeights(models);

  assert.equal(
    models.reduce((sum, model) => sum + model.weight, 0),
    100
  );
  assert.equal(models.length, 10);
  assert.ok(models.every((model) => model.weight > 0 && model.weight <= 100));
  assert.ok(models[0].weight > models[1].weight);
});

test("snapshots that fit the integer budget retain their existing distribution", () => {
  for (const [weights, expected] of [
    [
      [1, 1, 1],
      [34, 33, 33],
    ],
    [
      [60, 30, 10],
      [60, 30, 10],
    ],
    [[100], [100]],
    [
      [0, 1, 2],
      [1, 33, 66],
    ],
    [Array(100).fill(1), Array(100).fill(1)],
  ]) {
    const models = weights.map((weight) => ({ weight }));
    normalizeSnapshotWeights(models);
    assert.deepEqual(
      models.map((model) => model.weight),
      expected
    );
  }
});

test("empty and zero-total snapshots retain their existing behavior", () => {
  const models = [{ weight: 0 }, { weight: 0 }];
  normalizeSnapshotWeights(models);
  assert.deepEqual(models, [{ weight: 0 }, { weight: 0 }]);
  assert.doesNotThrow(() => normalizeSnapshotWeights([]));
});

test("fractional snapshot shares survive JSON, validation and editable combo normalization", () => {
  const models = Array.from({ length: 131 }, (_, index) => ({
    id: `model-${index}`,
    kind: "model" as const,
    model: `openai/snapshot-${index}`,
    weight: 1,
  }));
  normalizeSnapshotWeights(models);

  const decoded: unknown[] = JSON.parse(JSON.stringify(models));
  const validated = decoded.map((model) => comboModelStepInputSchema.parse(model));
  const editable = normalizeComboModels(validated);

  assert.equal(editable.length, 131);
  assert.deepEqual(
    editable.map((model) => model.weight),
    models.map((model) => model.weight)
  );
  assert.equal(
    editable.reduce((sum, model) => sum + model.weight, 0),
    100
  );
});
