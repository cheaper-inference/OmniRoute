import assert from "node:assert/strict";
import test from "node:test";

import { SAFE_DEFAULT_PIPELINE } from "../../../open-sse/services/compression/lossyRequestPolicy.ts";
import {
  applyCompressionAsync,
  selectCompressionPlan,
} from "../../../open-sse/services/compression/strategySelector.ts";
import { DEFAULT_COMPRESSION_CONFIG } from "../../../open-sse/services/compression/types.ts";

function homogeneousRows(count: number): Record<string, unknown>[] {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `item-${index + 1}`,
    value: (index + 1) * 10,
    active: index % 2 === 0,
  }));
}

test("headerless lossy auto-trigger executes the configured safe headroom engine", async () => {
  const config = {
    ...DEFAULT_COMPRESSION_CONFIG,
    enabled: true,
    autoTriggerTokens: 1,
    autoTriggerMode: "aggressive" as const,
    stackedPipeline: [
      { engine: "rtk" as const, intensity: "standard" as const },
      { engine: "headroom" as const, config: { minRows: 20 } },
    ],
  };
  const plan = selectCompressionPlan(config, null, 1);
  assert.equal(plan.mode, "stacked");
  assert.deepEqual(
    plan.stackedPipeline.map((step) => step.engine),
    ["headroom"]
  );

  const body = {
    model: "test-model",
    messages: [{ role: "user", content: JSON.stringify(homogeneousRows(24)) }],
  };
  const result = await applyCompressionAsync(body, "stacked", {
    config: { ...config, stackedPipeline: plan.stackedPipeline },
  });
  const output = JSON.stringify(result.body);
  const rules = result.stats?.rulesApplied ?? [];

  assert.equal(result.compressed, true);
  assert.ok(rules.includes("tabular-compaction"));
  assert.match(output, /\[24\]\{/);
  assert.doesNotMatch(output, /\[rtk:/i);
  assert.equal(
    rules.some((rule) => rule.startsWith("rtk:")),
    false
  );
});

test("all-lossy auto-trigger configuration keeps the historical safe fallback", () => {
  const plan = selectCompressionPlan(
    {
      ...DEFAULT_COMPRESSION_CONFIG,
      enabled: true,
      autoTriggerTokens: 1,
      autoTriggerMode: "aggressive",
      stackedPipeline: [
        { engine: "rtk", intensity: "standard" },
        { engine: "caveman", intensity: "full" },
      ],
    },
    null,
    1
  );

  assert.deepEqual(plan.stackedPipeline, [...SAFE_DEFAULT_PIPELINE]);
});
