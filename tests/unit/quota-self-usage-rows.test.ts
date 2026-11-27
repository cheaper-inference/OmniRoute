import test, { describe } from "node:test";
import assert from "node:assert/strict";

import { mergeUsageByModel } from "../../src/app/quota/[provider]/lib/usageRows.ts";
import type { SelfUsageResponse } from "../../src/shared/schemas/selfUsage.ts";

type ByModelRow = SelfUsageResponse["byModel"][number];

function row(over: Partial<ByModelRow>): ByModelRow {
  return {
    model: "claude-sonnet-5",
    provider: "claude",
    requests: 1,
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 100,
    costUsd: 0,
    listPriceUsd: 1,
    avgLatencyMs: 0,
    successRatePct: 100,
    lastUsed: null,
    ...over,
  };
}

describe("mergeUsageByModel", () => {
  test("one model under two providers becomes one row with the sums", () => {
    const merged = mergeUsageByModel([
      row({ provider: "claude", requests: 3, totalTokens: 300, listPriceUsd: 1.5 }),
      row({ provider: "combo-a", requests: 2, totalTokens: 200, listPriceUsd: 0.25 }),
    ]);
    assert.deepEqual(merged, [
      { model: "claude-sonnet-5", requests: 5, totalTokens: 500, listPriceUsd: 1.75 },
    ]);
  });

  test("rows are ordered by requests, highest first, then by model name", () => {
    const merged = mergeUsageByModel([
      row({ model: "b-model", requests: 2 }),
      row({ model: "c-model", requests: 7 }),
      row({ model: "a-model", requests: 2 }),
    ]);
    assert.deepEqual(
      merged.map((entry) => entry.model),
      ["c-model", "a-model", "b-model"]
    );
  });

  test("an empty list stays empty", () => {
    assert.deepEqual(mergeUsageByModel([]), []);
  });
});
