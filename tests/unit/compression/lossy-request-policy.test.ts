import assert from "node:assert/strict";
import test from "node:test";
import { applyLossyRequestPolicy } from "../../../open-sse/services/compression/lossyRequestPolicy.ts";
import type { DerivedPlan } from "../../../open-sse/services/compression/deriveDefaultPlan.ts";

const lossyProfile: DerivedPlan = {
  mode: "stacked",
  source: "active-profile",
  stackedPipeline: [
    { engine: "rtk", intensity: "standard" },
    { engine: "caveman", intensity: "full" },
  ],
};

test("default path replaces a lossy profile with dedup and whitespace folding", () => {
  const plan = applyLossyRequestPolicy(lossyProfile, null);
  assert.equal(plan.mode, "stacked");
  assert.deepEqual(plan.stackedPipeline, [
    { engine: "session-dedup" },
    { engine: "lite", config: { compressToolResults: false } },
  ]);
});

test("allow-lossy keeps the operator profile for this request", () => {
  const plan = applyLossyRequestPolicy(lossyProfile, "allow-lossy");
  assert.deepEqual(plan.stackedPipeline, lossyProfile.stackedPipeline);
});

test("engine header is the opt-in for that engine", () => {
  const plan = applyLossyRequestPolicy(
    {
      mode: "rtk",
      source: "request-header",
      stackedPipeline: [],
    },
    "engine:rtk"
  );
  assert.equal(plan.mode, "rtk");
});

const LOSSLESS_LITE = { engine: "lite", config: { compressToolResults: false } };

test("a safe stacked plan keeps its steps but lite stops truncating tool results", () => {
  const safe: DerivedPlan = {
    mode: "stacked",
    source: "default",
    stackedPipeline: [{ engine: "session-dedup" }, { engine: "lite" }, { engine: "headroom" }],
  };
  const plan = applyLossyRequestPolicy(safe, null);
  assert.deepEqual(plan.stackedPipeline, [
    { engine: "session-dedup" },
    LOSSLESS_LITE,
    { engine: "headroom" },
  ]);
});

test("a plan without a lite step is left as-is", () => {
  const safe: DerivedPlan = {
    mode: "stacked",
    source: "default",
    stackedPipeline: [{ engine: "session-dedup" }],
  };
  assert.equal(applyLossyRequestPolicy(safe, null), safe);
});

test("allow-lossy keeps lite tool-result truncation as configured", () => {
  const safe: DerivedPlan = {
    mode: "stacked",
    source: "default",
    stackedPipeline: [{ engine: "lite" }],
  };
  assert.equal(applyLossyRequestPolicy(safe, "allow-lossy"), safe);
});
