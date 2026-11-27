// Cline's free bucket (cline-free/*) costs nothing. A registry model with no pricing
// row is reported unpriced, and an API key with a USD limit then fails closed (#12341) after one
// request. The paid vendor ids in the same catalog must stay priced as they are (unpriced here).
import test from "node:test";
import assert from "node:assert/strict";

import { getModelsByProviderId } from "../../open-sse/config/providerModels.ts";
import { calculateCostDetailed } from "../../src/lib/usage/costCalculator.ts";

const FREE_IDS = getModelsByProviderId("cline")
  .map((model) => model.id)
  .filter((id) => id.startsWith("cline-free/"));

test("the Cline catalog lists a free bucket to price", () => {
  assert.ok(FREE_IDS.length >= 3, `found ${FREE_IDS.join(", ")}`);
});

for (const id of FREE_IDS) {
  test(`cline/${id} is priced at zero`, async () => {
    const result = await calculateCostDetailed("cline", id, { input: 1000, output: 1000 });
    assert.equal(result.priced, true, `cline/${id} has no pricing row`);
    assert.equal(result.costUsd, 0);
  });
}

test("a paid Cline vendor id gets no free row", async () => {
  const result = await calculateCostDetailed("cline", "deepseek/deepseek-v4-flash", {
    input: 1000,
    output: 1000,
  });
  assert.equal(result.priced, false);
});
