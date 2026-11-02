/**
 * replace-autotrigger + the lossless safe Default (lossy request policy output).
 *
 * Live evidence (2026-11-02): with the base plan `session-dedup -> lite -> ccr -> headroom`,
 * lite truncated every earlier tool result on every request (55% of codex requests lost
 * >10% of their content, most of which already fit the window). The policy now keeps
 * lite lossless; the dial must restore truncation ONLY when a request does not fit,
 * and must still leave explicit operator choices alone.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { resolveAdaptivePlan } from "../../../open-sse/services/compression/adaptiveCompression/resolveAdaptivePlan.ts";
import { DEFAULT_CONTEXT_BUDGET } from "../../../open-sse/services/compression/adaptiveCompression/types.ts";
import type { DerivedPlan } from "../../../open-sse/services/compression/deriveDefaultPlan.ts";

const LOSSLESS_LITE = { engine: "lite", config: { compressToolResults: false } };
const safeDefault: DerivedPlan = {
  mode: "stacked",
  source: "default",
  stackedPipeline: [
    { engine: "session-dedup" },
    LOSSLESS_LITE,
    { engine: "ccr" },
    { engine: "headroom" },
  ],
};
const dial = { ...DEFAULT_CONTEXT_BUDGET, mode: "replace-autotrigger" as const };
// gpt-6.1-sol: 872,000 window - 4,096 output reserve - 1,024 margin = 866,880 target.
const WINDOW = 872_000;

test("a request that fits keeps the lossless safe Default byte-for-byte", () => {
  const { plan, telemetry } = resolveAdaptivePlan({
    basePlan: safeDefault,
    estimatedTokens: 500_000,
    modelContextLimit: WINDOW,
    requestMaxTokens: null,
    config: dial,
  });
  assert.equal(plan, safeDefault);
  assert.deepEqual(telemetry?.stagesApplied, []);
});

const escalate = (estimatedTokens: number) =>
  resolveAdaptivePlan({
    basePlan: safeDefault,
    estimatedTokens,
    modelContextLimit: WINDOW,
    requestMaxTokens: null,
    config: dial,
  });

test("slightly over the window: only lite truncation comes back, in place", () => {
  const { plan, telemetry } = escalate(900_000);
  assert.equal(telemetry?.fit, true);
  assert.deepEqual(plan.stackedPipeline, [
    { engine: "session-dedup" },
    { engine: "lite" },
    { engine: "ccr" },
    { engine: "headroom" },
  ]);
});

test("further over (live 1,030,337-token case): truncation first, then the next ladder stage", () => {
  const { plan, telemetry } = escalate(1_030_337);
  assert.equal(telemetry?.fit, true);
  assert.deepEqual(telemetry?.stagesApplied, ["lite", "rtk"]);
  const engines = plan.stackedPipeline.map((s) => s.engine);
  assert.deepEqual(engines, ["session-dedup", "lite", "ccr", "headroom", "rtk"]);
  assert.deepEqual(plan.stackedPipeline[1], { engine: "lite" });
  assert.ok(!engines.includes("aggressive") && !engines.includes("ultra"), "no over-escalation");
});

test("explicit operator choices are still never escalated by replace-autotrigger", () => {
  for (const source of ["active-profile", "routing-override", "request-header"] as const) {
    const explicit: DerivedPlan = { ...safeDefault, source };
    const { plan } = resolveAdaptivePlan({
      basePlan: explicit,
      estimatedTokens: 1_030_337,
      modelContextLimit: WINDOW,
      requestMaxTokens: null,
      config: dial,
    });
    assert.equal(plan, explicit, source);
  }
});

test("a Default plan that already carries a lossy step is not treated as the safe Default", () => {
  const lossyDefault: DerivedPlan = { ...safeDefault, stackedPipeline: [{ engine: "lite" }] };
  const { plan } = resolveAdaptivePlan({
    basePlan: lossyDefault,
    estimatedTokens: 1_030_337,
    modelContextLimit: WINDOW,
    requestMaxTokens: null,
    config: dial,
  });
  assert.equal(plan, lossyDefault);
});
