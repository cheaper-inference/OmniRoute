/**
 * Regression test for #11861 — Nous Research registry mislabels Hermes-4-405B as "7B"
 *
 * `open-sse/config/providers/registry/nous-research/index.ts` displayed the 405B-parameter
 * model with the copy-pasted name "Hermes 4 7B (Nous Research)". The `id` and `name` fields
 * must agree on the model's parameter size for every model this provider ships.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { REGISTRY as providerRegistry } from "../../open-sse/config/providerRegistry.ts";
import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.ts";

/** Extracts a parameter-size token like "405B" or "70B" from a string, if present. */
function extractParamSize(value: string): string | null {
  const match = value.match(/(\d+(?:\.\d+)?[BM])\b/i);
  return match ? match[1].toUpperCase() : null;
}

test("nous-research model display names match their id's parameter size", () => {
  const entry = providerRegistry["nous-research"];
  assert.ok(entry, "providerRegistry['nous-research'] must be defined");
  assert.ok(entry.models.length > 0, "nous-research must ship at least one model");

  for (const model of entry.models) {
    const idSize = extractParamSize(model.id);
    assert.ok(idSize, `nous-research model id "${model.id}" must encode a parameter size`);

    const nameSize = extractParamSize(model.name);
    assert.ok(
      nameSize,
      `nous-research model "${model.id}" display name "${model.name}" must encode a parameter size`
    );

    assert.equal(
      nameSize,
      idSize,
      `nous-research model "${model.id}" display name "${model.name}" advertises ${nameSize} ` +
        `but the id says ${idSize}`
    );
  }
});

test("nous-research Hermes-4-405B is labelled 405B (Nous Research)", () => {
  const entry = providerRegistry["nous-research"];
  const model = entry.models.find((m) => m.id === "Hermes-4-405B");
  assert.ok(model, "Hermes-4-405B must be registered");
  assert.equal(model.name, "Hermes 4 405B (Nous Research)");
});

test("unverified Nous Hermes rows stay outside the free catalog", () => {
  // #16781: the public Free plan does not identify these registry models as covered.
  const rows = FREE_MODEL_BUDGETS.filter((model) => model.provider === "nous-research");
  assert.deepEqual(rows, []);
});
