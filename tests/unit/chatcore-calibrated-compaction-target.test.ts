// The last-resort context guard in chatCore compares the CALIBRATED estimate
// (#14931) with the compaction ceiling, but compressContext measures the raw
// chars/4 estimate. With a learned factor above 1 the raw compaction target
// must shrink by that factor, or a body that "fits" raw still calibrates over
// the ceiling and is rejected. A factor below 1 must never widen the target.
import test from "node:test";
import assert from "node:assert/strict";

import { calibratedCompactionTarget } from "../../open-sse/handlers/chatCore/contextEstimation.ts";
import {
  getEstimatorCalibrationFactor,
  recordEstimatorCalibrationFromUsage,
  resetEstimatorCalibrationForTests,
} from "../../open-sse/services/estimatorCalibration.ts";

const PROVIDER = "cct-prov";
const MODEL = "cct-model";
const body = { messages: [{ role: "user", content: "hi" }] };

function learn(ratio: number, samples = 3): void {
  for (let index = 0; index < samples; index++) {
    recordEstimatorCalibrationFromUsage({
      provider: PROVIDER,
      model: MODEL,
      estimatedTokens: 10_000,
      usage: { prompt_tokens: Math.round(10_000 * ratio) },
      toolsPresent: false,
    });
  }
}

test.beforeEach(() => resetEstimatorCalibrationForTests());
test.after(() => resetEstimatorCalibrationForTests());

test("cold start keeps the real ceiling", () => {
  assert.equal(calibratedCompactionTarget(100_000, body, PROVIDER, MODEL), 100_000);
});

test("a learned factor above 1 shrinks the raw target so the calibrated body fits", () => {
  learn(2);
  const factor = getEstimatorCalibrationFactor(PROVIDER, MODEL, false);
  assert.equal(factor, 2);
  const target = calibratedCompactionTarget(100_000, body, PROVIDER, MODEL);
  assert.equal(target, 50_000);
  assert.ok(Math.round(target * factor) <= 100_000);
});

test("a learned factor below 1 never widens the target past the window", () => {
  learn(0.25);
  assert.ok(getEstimatorCalibrationFactor(PROVIDER, MODEL, false) < 1);
  assert.equal(calibratedCompactionTarget(100_000, body, PROVIDER, MODEL), 100_000);
});

test("the factor is read from the tools-present bucket of this body", () => {
  learn(2);
  const withTools = { ...body, tools: [{ type: "function", function: { name: "f" } }] };
  assert.equal(calibratedCompactionTarget(100_000, withTools, PROVIDER, MODEL), 100_000);
});
