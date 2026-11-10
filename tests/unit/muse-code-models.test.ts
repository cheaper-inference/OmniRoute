/**
 * Tests for Muse Code CLI model catalog endpoint.
 *
 * Verifies GET /v1/muse-code/models returns the proprietary Muse format.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { muse_codeProvider } from "../../open-sse/config/providers/registry/muse-code/index.ts";

// ── Model catalog shape ─────────────────────────────────────────────────────

test("muse-code provider has at least one model", () => {
  assert.ok(muse_codeProvider.models.length >= 1);
});

test("muse-code models have unique ids", () => {
  const ids = muse_codeProvider.models.map((m) => m.id);
  const unique = new Set(ids);
  assert.equal(unique.size, ids.length, "model IDs must be unique");
});

test("muse-code models include no Llama ids", () => {
  // The Muse Code key answers model_not_found for every Llama id, and neither
  // /v1/models nor the Muse Code client catalog lists one.
  const ids = muse_codeProvider.models.map((m) => m.id);
  assert.deepEqual(
    ids.filter((id) => id.startsWith("llama-")),
    []
  );
});

test("muse-code models include muse-spark subscription ids", () => {
  const ids = muse_codeProvider.models.map((m) => m.id);
  assert.ok(ids.includes("muse-spark-1.3"), "must include muse-spark-1.3");
  assert.ok(ids.includes("muse-spark-1.3-contributor"), "must include muse-spark-1.3-contributor");
});

test("muse-code models include the Muse Wonder ids", () => {
  const ids = muse_codeProvider.models.map((m) => m.id);
  assert.ok(ids.includes("muse-wonder-1.0"), "must include muse-wonder-1.0");
  assert.ok(
    ids.includes("muse-wonder-1.0-contributor"),
    "must include muse-wonder-1.0-contributor"
  );
});

test("Muse Wonder and Spark 1.3 have supportsXHighEffort and the max effort", () => {
  for (const id of ["muse-wonder-1.0", "muse-spark-1.3"]) {
    const model = muse_codeProvider.models.find((m) => m.id === id);
    assert.ok(model, `${id} must exist`);
    assert.equal(model.supportsXHighEffort, true);
    assert.ok(model.supportedThinkingEfforts?.includes("max"), `${id} must offer max`);
  }
});

test("Muse Spark 1.2 stops at xhigh, as the client catalog publishes", () => {
  const model = muse_codeProvider.models.find((m) => m.id === "muse-spark-1.2");
  assert.ok(model, "muse-spark-1.2 must exist");
  assert.deepEqual(model.supportedThinkingEfforts, ["minimal", "low", "medium", "high", "xhigh"]);
});

test("non-reasoning models do not declare supportsXHighEffort", () => {
  for (const model of muse_codeProvider.models) {
    if (!model.supportsReasoning) {
      assert.equal(
        model.supportsXHighEffort,
        undefined,
        `${model.id} is not a reasoning model but has supportsXHighEffort`
      );
    }
  }
});

// ── Vision models ───────────────────────────────────────────────────────────

test("vision models have supportsVision: true", () => {
  const expectedVision = [
    "muse-wonder-1.0",
    "muse-wonder-1.0-contributor",
    "muse-spark-1.3",
    "muse-spark-1.3-contributor",
    "muse-spark-1.2",
    "muse-spark-1.2-contributor",
  ];
  for (const id of expectedVision) {
    const model = muse_codeProvider.models.find((m) => m.id === id);
    assert.ok(model, `${id} must exist`);
    assert.equal(model.supportsVision, true, `${id} should have supportsVision`);
  }
  const spark11 = muse_codeProvider.models.find((m) => m.id === "muse-spark-1.1");
  assert.equal(spark11?.supportsVision, false, "muse-spark-1.1 takes text only");
});
