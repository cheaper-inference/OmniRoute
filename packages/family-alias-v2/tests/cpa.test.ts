import assert from "node:assert/strict";
import test from "node:test";
import { applyCpa } from "../src/cpa/apply.ts";
import { CPA_MANAGED_PROVIDER, planCpa, type CpaProvider } from "../src/cpa/plan.ts";
import { ownershipDescription } from "../src/ownership.ts";
import type { DesiredGraph } from "../src/graph.ts";

function graph(singleEndpoint = true): DesiredGraph {
  const hash = "a".repeat(64);
  const versionModels = [
    {
      id: "m1",
      kind: "model" as const,
      model: "claude-fable-5.2",
      providerId: "claude",
      connectionId: "c1",
      allowedConnectionIds: ["c1"],
      weight: 0 as const,
    },
  ];
  if (!singleEndpoint) {
    versionModels.push({ ...versionModels[0], id: "m2", connectionId: "c2", allowedConnectionIds: ["c2"] });
  }
  return {
    owner: "family-alias-maintainer/v2",
    graphHash: hash,
    omitted: [],
    combos: [
      {
        name: "claude/fable/5.2",
        description: ownershipDescription(hash, "version"),
        strategy: "priority",
        allowedModelFamilies: ["claude"],
        models: versionModels,
      },
      {
        name: "claude/fable",
        description: ownershipDescription(hash, "family"),
        strategy: "priority",
        allowedModelFamilies: ["claude"],
        models: [{ id: "r", kind: "combo-ref", comboName: "claude/fable/5.2", weight: 0 }],
      },
    ],
  };
}

const manual: CpaProvider = {
  name: "Manual Provider",
  "base-url": "https://manual.example/v1",
  "api-key-entries": [{ "api-key": "manual" }],
  models: [{ name: "manual-upstream", alias: "manual-alias" }],
};

test("preserves unrelated CPA providers byte-for-byte", () => {
  const plan = planCpa({ desired: graph(), liveProviders: [manual], omnirouteBaseUrl: "https://omni", omnirouteApiKey: "key" });
  assert.deepEqual(plan.nextProviders[0], manual);
  assert.equal(plan.nextProviders[1].name, CPA_MANAGED_PROVIDER);
});

test("omits aliases requiring multi-endpoint fallback", () => {
  const plan = planCpa({ desired: graph(false), liveProviders: [], omnirouteBaseUrl: "https://omni", omnirouteApiKey: "key" });
  assert.ok(plan.omitted.some((item) => item.alias === "claude/fable/5.2"));
  assert.ok(plan.omitted.some((item) => item.alias === "claude/fable"));
});

test("precondition mismatch refuses without write", async () => {
  const plan = planCpa({ desired: graph(), liveProviders: [], omnirouteBaseUrl: "https://omni", omnirouteApiKey: "key" });
  const calls: string[] = [];
  const result = await applyCpa({
    plan,
    expectedPlanHash: plan.planHash,
    client: {
      async getProviders() { return [manual]; },
      async putProviders() { calls.push("put"); },
    },
  });
  assert.equal(result.status, "refused");
  assert.deepEqual(calls, []);
});

test("apply verifies exact readback", async () => {
  const plan = planCpa({ desired: graph(), liveProviders: [manual], omnirouteBaseUrl: "https://omni", omnirouteApiKey: "key" });
  let rows = [manual];
  const result = await applyCpa({
    plan,
    expectedPlanHash: plan.planHash,
    client: {
      async getProviders() { return structuredClone(rows); },
      async putProviders(providers) { rows = structuredClone(providers); },
    },
  });
  assert.equal(result.status, "success");
  assert.deepEqual(rows[0], manual);
});
