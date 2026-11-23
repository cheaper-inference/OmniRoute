import test from "node:test";
import assert from "node:assert/strict";
import {
  getConnectionScopedEffortTiers,
  getThinkingCapabilityFields,
} from "../../src/app/api/v1/models/catalogHelpers.ts";

// The last positional argument of both helpers carries MODELS_DEV_EFFORT_TIERS_ENABLED,
// read once per catalog build by catalog.ts. Default (omitted/false) = previous behavior.

test("flag off: an empty declared list falls through to the synced tiers (previous behavior)", () => {
  const fields = getThinkingCapabilityFields("glm", "glm-5", true, [], false, [
    "low",
    "medium",
    "high",
  ]);
  assert.deepEqual(fields.effort_tiers, ["low", "medium", "high"]);

  const explicitOff = getThinkingCapabilityFields(
    "glm",
    "glm-5",
    true,
    [],
    false,
    ["low", "medium", "high"],
    false
  );
  assert.deepEqual(explicitOff, fields);
});

test("flag on: an empty declared list blocks synced tiers in the catalog", () => {
  const declared = getThinkingCapabilityFields(
    "glm",
    "glm-5",
    true,
    [],
    false,
    ["low", "medium", "high"],
    true
  );
  assert.equal(declared.supportsThinking, true);
  assert.equal("effort_tiers" in declared, false);
});

test("an absent list still falls through to the synced tiers; flag on narrows unknown names", () => {
  const synced = ["low", "medium", "high", "turbo", "max"];
  const off = getThinkingCapabilityFields(
    "anthropic",
    "claude-haiku-5-5",
    true,
    undefined,
    false,
    synced
  );
  assert.deepEqual(off.effort_tiers, synced);

  const on = getThinkingCapabilityFields(
    "anthropic",
    "claude-haiku-5-5",
    true,
    undefined,
    false,
    synced,
    true
  );
  assert.deepEqual(on.effort_tiers, ["low", "medium", "high", "max"]);
});

test("a connection with an empty effort list takes the fallback only when the flag is off", () => {
  const modelsByConnection = {
    empty: [{ id: "glm-5", supportsThinking: true, supportedThinkingEfforts: [] }],
  };
  assert.deepEqual(
    getConnectionScopedEffortTiers("glm-5", {}, ["empty"], modelsByConnection, undefined, [
      "low",
      "high",
    ]),
    ["low", "high"]
  );
  assert.deepEqual(
    getConnectionScopedEffortTiers(
      "glm-5",
      {},
      ["empty"],
      modelsByConnection,
      undefined,
      ["low", "high"],
      true
    ),
    []
  );
});
