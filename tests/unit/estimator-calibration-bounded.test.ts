import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-estimator-lru-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const {
  getEstimatorCalibrationBucketForTests,
  getEstimatorCalibrationFactor,
  recordEstimatorCalibrationFromUsage,
  resetEstimatorCalibrationForTests,
} = await import("../../open-sse/services/estimatorCalibration.ts");

function record(model: string): void {
  recordEstimatorCalibrationFromUsage({
    provider: "openai-compatible",
    model,
    estimatedTokens: 100_000,
    usage: { prompt_tokens: 20_000 },
    toolsPresent: true,
  });
}

test.after(() => {
  resetEstimatorCalibrationForTests();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("estimator buckets evict old client model names and can learn them again", () => {
  resetEstimatorCalibrationForTests();
  for (let sample = 0; sample < 3; sample++) record("model-0");
  assert.notEqual(getEstimatorCalibrationFactor("openai-compatible", "model-0", true), 1);

  for (let model = 1; model <= 1000; model++) record(`model-${model}`);

  assert.equal(
    getEstimatorCalibrationBucketForTests("openai-compatible", "model-0", true),
    undefined
  );
  assert.equal(getEstimatorCalibrationFactor("openai-compatible", "model-0", true), 1);

  record("model-0");
  assert.equal(
    getEstimatorCalibrationBucketForTests("openai-compatible", "model-0", true)?.samples,
    1,
    "an evicted model must be able to learn a fresh bucket"
  );
});
