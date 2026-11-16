import test from "node:test";
import assert from "node:assert/strict";

const metricsMod = await import("../../open-sse/services/comboMetrics.ts");

const COMBO = "narrow-accessor-combo";

function seed() {
  metricsMod.resetComboMetrics(COMBO);
  for (let i = 0; i < 3; i++) {
    metricsMod.recordComboRequest(COMBO, "codex/gpt-5.5", {
      success: i !== 2,
      latencyMs: 100 * (i + 1),
      target: { executionKey: "acct-a", provider: "codex" },
    });
  }
  metricsMod.recordComboRequest(COMBO, "codex/gpt-5.5", {
    success: true,
    latencyMs: 50,
    target: { executionKey: "acct-b", provider: "codex" },
  });
}

test("getComboTargetMetric returns the same view as the full combo metrics", () => {
  seed();
  const full = metricsMod.getComboMetrics(COMBO);
  assert.deepEqual(metricsMod.getComboTargetMetric(COMBO, "acct-a"), full.byTarget["acct-a"]);
  assert.equal(metricsMod.getComboTargetMetric(COMBO, "acct-a").requests, 3);
  assert.equal(metricsMod.getComboTargetMetric(COMBO, "acct-a").avgLatencyMs, 200);
  metricsMod.resetComboMetrics(COMBO);
});

test("getComboModelMetric returns the same view as the full combo metrics", () => {
  seed();
  const full = metricsMod.getComboMetrics(COMBO);
  assert.deepEqual(
    metricsMod.getComboModelMetric(COMBO, "codex/gpt-5.5"),
    full.byModel["codex/gpt-5.5"]
  );
  assert.equal(metricsMod.getComboModelMetric(COMBO, "codex/gpt-5.5").requests, 4);
  metricsMod.resetComboMetrics(COMBO);
});

test("narrow accessors return undefined for unknown combo, key or inherited name", () => {
  seed();
  assert.equal(metricsMod.getComboTargetMetric("no-such-combo", "acct-a"), undefined);
  assert.equal(metricsMod.getComboTargetMetric(COMBO, "acct-z"), undefined);
  assert.equal(metricsMod.getComboTargetMetric(COMBO, "constructor"), undefined);
  assert.equal(metricsMod.getComboModelMetric(COMBO, "toString"), undefined);
  metricsMod.resetComboMetrics(COMBO);
});

test("narrow accessors return a copy that does not change stored metrics", () => {
  seed();
  const view = metricsMod.getComboTargetMetric(COMBO, "acct-a");
  view.requests = 999;
  assert.equal(metricsMod.getComboTargetMetric(COMBO, "acct-a").requests, 3);
  metricsMod.resetComboMetrics(COMBO);
});

test("narrow accessors do not rebuild the full byModel and byTarget views", () => {
  seed();
  const original = Object.fromEntries;
  let calls = 0;
  Object.fromEntries = ((...args: Parameters<typeof Object.fromEntries>) => {
    calls++;
    return original(...args);
  }) as typeof Object.fromEntries;
  try {
    metricsMod.getComboTargetMetric(COMBO, "acct-a");
    metricsMod.getComboModelMetric(COMBO, "codex/gpt-5.5");
  } finally {
    Object.fromEntries = original;
  }
  assert.equal(calls, 0);
  metricsMod.resetComboMetrics(COMBO);
});
