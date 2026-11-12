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

function makePlan(liveProviders: CpaProvider[] = [manual], singleEndpoint = true) {
  return planCpa({
    desired: graph(singleEndpoint),
    liveProviders,
    omnirouteBaseUrl: "https://omni",
    omnirouteApiKeyRef: "env:OMNIROUTE_API_KEY",
  });
}

test("preserves unrelated CPA providers byte-for-byte without serializing their secrets", () => {
  const plan = makePlan();
  assert.equal(plan.managedProvider.name, CPA_MANAGED_PROVIDER);
  assert.equal(plan.managedProvider.apiKeyRef, "env:OMNIROUTE_API_KEY");
  assert.equal(JSON.stringify(plan).includes("manual"), false);
});

test("omits aliases requiring multi-endpoint fallback", () => {
  const plan = makePlan([], false);
  assert.ok(plan.omitted.some((item) => item.alias === "claude/fable/5.2"));
  assert.ok(plan.omitted.some((item) => item.alias === "claude/fable"));
});

test("precondition mismatch refuses without write", async () => {
  const plan = makePlan([]);
  const calls: string[] = [];
  const result = await applyCpa({
    plan,
    expectedPlanHash: plan.planHash,
    omnirouteApiKey: "runtime-key",
    client: {
      async getProviders() { return [manual]; },
      async putProviders() { calls.push("put"); },
    },
  });
  assert.equal(result.status, "refused");
  assert.deepEqual(calls, []);
});

test("apply materializes secret in memory and preserves unrelated providers", async () => {
  const plan = makePlan();
  let rows = [manual];
  const result = await applyCpa({
    plan,
    expectedPlanHash: plan.planHash,
    omnirouteApiKey: "runtime-key",
    client: {
      async getProviders() { return structuredClone(rows); },
      async putProviders(providers) { rows = structuredClone(providers); },
    },
  });
  assert.equal(result.status, "success");
  assert.deepEqual(rows[0], manual);
  assert.equal(rows[1]["api-key-entries"][0]["api-key"], "runtime-key");
});
