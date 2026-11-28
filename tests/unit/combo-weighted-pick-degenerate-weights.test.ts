import test from "node:test";
import assert from "node:assert/strict";

import { executeRuntimeUnitCombo } from "../../open-sse/services/combo/runtimeUnits.ts";
import type { ResolvedComboUnit } from "../../open-sse/services/combo/types.ts";

const noopLog = { info: () => {}, warn: () => {}, error: () => {}, debug: () => {} };

function unit(key: string, weight: number): ResolvedComboUnit {
  return {
    kind: "model",
    stepId: `step-${key}`,
    executionKey: key,
    modelStr: `openai/${key}`,
    provider: "openai",
    providerId: null,
    connectionId: null,
    weight,
    label: null,
  };
}

/** Which unit the weighted strategy tries first, over `draws` independent requests. */
async function firstPicks(weights: number[], draws: number): Promise<Map<string, number>> {
  const units = weights.map((weight, index) => unit(`u${index}`, weight));
  const picks = new Map<string, number>();
  for (let i = 0; i < draws; i += 1) {
    let first: string | null = null;
    await executeRuntimeUnitCombo({
      body: { messages: [{ role: "user", content: "hi" }] },
      combo: { name: "weighted-degenerate", strategy: "weighted" },
      strategy: "weighted",
      units,
      handleSingleModel: async (_body, modelStr) => {
        first ??= modelStr;
        return new Response("{}", { status: 200, headers: { "content-type": "application/json" } });
      },
      log: noopLog as never,
      config: { maxRetries: 0 },
      allCombos: [],
      nesting: {
        depth: 0,
        maxDepth: 5,
        visitedComboNames: [],
        rootComboName: "weighted-degenerate",
        attemptBudget: { count: 0, limit: 4 },
      },
      baseOptions: {} as never,
      runCombo: async () => new Response("{}", { status: 200 }),
    });
    picks.set(first!, (picks.get(first!) ?? 0) + 1);
  }
  return picks;
}

test("an all-zero weight pool spreads requests over every unit", async () => {
  const picks = await firstPicks([0, 0, 0], 300);
  assert.equal(picks.size, 3, `every unit is picked, got ${JSON.stringify([...picks])}`);
});

test("a normal weighted pool still follows the weights", async () => {
  const picks = await firstPicks([0, 9, 1], 400);
  assert.equal(picks.get("openai/u0") ?? 0, 0, "a zero weight unit is not picked first");
  assert.ok((picks.get("openai/u1") ?? 0) > (picks.get("openai/u2") ?? 0));
});
