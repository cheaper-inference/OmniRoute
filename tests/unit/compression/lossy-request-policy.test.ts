import assert from "node:assert/strict";
import test from "node:test";
import {
  applyLossyRequestPolicy,
  SAFE_DEFAULT_PIPELINE,
} from "../../../open-sse/services/compression/lossyRequestPolicy.ts";
import type { DerivedPlan } from "../../../open-sse/services/compression/deriveDefaultPlan.ts";
import type { CompressionPipelineStep } from "../../../open-sse/services/compression/types.ts";

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
  assert.deepEqual(plan.stackedPipeline, [{ engine: "session-dedup" }, { engine: "lite" }]);
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

test("a safe stacked plan is left as-is", () => {
  const safe: DerivedPlan = {
    mode: "stacked",
    source: "default",
    stackedPipeline: [{ engine: "lite" }],
  };
  assert.equal(applyLossyRequestPolicy(safe, null), safe);
});

test("lossy single mode retains the configured safe subset", () => {
  const configured = [
    { engine: "session-dedup" },
    { engine: "rtk", intensity: "standard" },
    { engine: "lite" },
    { engine: "headroom", config: { minRows: 20 } },
  ] satisfies CompressionPipelineStep[];
  const plan = applyLossyRequestPolicy(
    { mode: "aggressive", source: "auto-trigger", stackedPipeline: [] },
    null,
    configured
  );
  assert.equal(plan.mode, "stacked");
  assert.deepEqual(plan.stackedPipeline, [configured[0], configured[2], configured[3]]);
});

test("lossy single mode uses the historical fallback when no safe configured step survives", () => {
  const allLossy = [
    { engine: "rtk", intensity: "standard" },
    { engine: "caveman", intensity: "full" },
  ] satisfies CompressionPipelineStep[];
  const base: DerivedPlan = {
    mode: "aggressive",
    source: "auto-trigger",
    stackedPipeline: [],
  };

  assert.deepEqual(applyLossyRequestPolicy(base, null, []), {
    ...base,
    mode: "stacked",
    stackedPipeline: SAFE_DEFAULT_PIPELINE,
  });
  assert.deepEqual(applyLossyRequestPolicy(base, null, allLossy), {
    ...base,
    mode: "stacked",
    stackedPipeline: SAFE_DEFAULT_PIPELINE,
  });

  const unknownConfigured = [{ engine: "unknown-engine" }];
  // @ts-expect-error Runtime configuration can contain an unrecognized engine ID.
  const unknownPlan = applyLossyRequestPolicy(base, null, unknownConfigured);
  assert.deepEqual(unknownPlan, {
    ...base,
    mode: "stacked",
    stackedPipeline: SAFE_DEFAULT_PIPELINE,
  });
});

test("stacked mode filters its own pipeline instead of the configured default", () => {
  const headroom = {
    engine: "headroom",
    config: { minRows: 20 },
  } satisfies CompressionPipelineStep;
  const plan = applyLossyRequestPolicy(
    {
      mode: "stacked",
      source: "active-profile",
      stackedPipeline: [{ engine: "rtk", intensity: "standard" }, headroom],
    },
    null,
    [{ engine: "lite" }]
  );

  assert.deepEqual(plan.stackedPipeline, [headroom]);
});

test("allow-lossy returns a lossy single plan unchanged", () => {
  const lossySingle: DerivedPlan = {
    mode: "aggressive",
    source: "auto-trigger",
    stackedPipeline: [],
  };

  assert.equal(
    applyLossyRequestPolicy(lossySingle, "allow-lossy", [{ engine: "headroom" }]),
    lossySingle
  );
});
