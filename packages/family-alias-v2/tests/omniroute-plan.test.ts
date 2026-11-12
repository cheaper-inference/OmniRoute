import assert from "node:assert/strict";
import test from "node:test";
import { planOmniRoute } from "../src/omniroute/plan.ts";
import { ownershipDescription } from "../src/ownership.ts";
import type { DesiredGraph } from "../src/graph.ts";

const graph = (): DesiredGraph => {
  const hash = "a".repeat(64);
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
        models: [
          {
            id: "m",
            kind: "model",
            model: "claude-fable-5.2",
            providerId: "claude",
            connectionId: "conn",
            allowedConnectionIds: ["conn"],
            weight: 0,
          },
        ],
      },
      {
        name: "claude/fable",
        description: ownershipDescription(hash, "family"),
        strategy: "priority",
        allowedModelFamilies: ["claude"],
        models: [
          { id: "r", kind: "combo-ref", comboName: "claude/fable/5.2", weight: 0 },
        ],
      },
    ],
  };
};

test("manual name conflict remains untouched", () => {
  const plan = planOmniRoute(graph(), [
    { id: "manual", name: "claude/fable", description: "my combo", models: [] },
  ]);
  assert.equal(plan.conflicts.length, 1);
  assert.equal(plan.updates.length, 0);
  assert.equal(plan.deletes.length, 0);
});

test("unchanged owned graph produces zero writes", () => {
  const desired = graph();
  const live = desired.combos.map((combo, index) => ({ id: `id-${index}`, ...combo }));
  const plan = planOmniRoute(desired, live);
  assert.deepEqual(plan.creates, []);
  assert.deepEqual(plan.updates, []);
  assert.deepEqual(plan.deletes, []);
  assert.deepEqual(plan.conflicts, []);
});

test("stale owned wrapper deletes before stale leaf", () => {
  const hash = "b".repeat(64);
  const live = [
    {
      id: "wrapper",
      name: "old/family",
      description: ownershipDescription(hash, "family"),
      models: [{ kind: "combo-ref", comboName: "old/family/1" }],
    },
    {
      id: "leaf",
      name: "old/family/1",
      description: ownershipDescription(hash, "version"),
      models: [],
    },
  ];
  const plan = planOmniRoute({ owner: "family-alias-maintainer/v2", graphHash: "a".repeat(64), combos: [], omitted: [] }, live);
  assert.deepEqual(plan.deletes.map((item) => item.name), ["old/family", "old/family/1"]);
});

test("stale owned combo referenced by manual combo is preserved as conflict", () => {
  const hash = "b".repeat(64);
  const plan = planOmniRoute(
    { owner: "family-alias-maintainer/v2", graphHash: "a".repeat(64), combos: [], omitted: [] },
    [
      { id: "owned", name: "old/family", description: ownershipDescription(hash, "family"), models: [] },
      { id: "manual", name: "manual", description: "human", models: [{ kind: "combo-ref", comboName: "old/family" }] },
    ],
  );
  assert.equal(plan.deletes.length, 0);
  assert.equal(plan.conflicts.length, 1);
});

test("invalid desired DAG is rejected before plan emission", () => {
  const desired = graph();
  desired.combos[1].models = [
    { id: "r", kind: "combo-ref", comboName: "missing/version", weight: 0 },
  ];
  assert.throws(() => planOmniRoute(desired, []), /missing combo reference/);
});

test("manual reference protects stale wrapper and its stale descendants", () => {
  const hash = "b".repeat(64);
  const plan = planOmniRoute(
    { owner: "family-alias-maintainer/v2", graphHash: "a".repeat(64), combos: [], omitted: [] },
    [
      {
        id: "wrapper",
        name: "old/family",
        description: ownershipDescription(hash, "family"),
        models: [{ kind: "combo-ref", comboName: "old/family/1" }],
      },
      {
        id: "leaf",
        name: "old/family/1",
        description: ownershipDescription(hash, "version"),
        models: [],
      },
      {
        id: "manual",
        name: "manual",
        description: "human",
        models: [{ kind: "combo-ref", comboName: "old/family" }],
      },
    ],
  );
  assert.deepEqual(plan.deletes, []);
  assert.equal(plan.conflicts.length, 1);
});
