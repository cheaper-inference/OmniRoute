import assert from "node:assert/strict";
import test from "node:test";
import { applyOmniRoute } from "../src/omniroute/apply.ts";
import { planOmniRoute, type LiveCombo } from "../src/omniroute/plan.ts";
import { ownershipDescription } from "../src/ownership.ts";
import type { DesiredGraph } from "../src/graph.ts";

function desired(): DesiredGraph {
  const graphHash = "a".repeat(64);
  return {
    owner: "family-alias-maintainer/v2",
    graphHash,
    omitted: [],
    combos: [
      {
        name: "claude/fable/5.2",
        description: ownershipDescription(graphHash, "version"),
        strategy: "priority",
        allowedModelFamilies: ["claude"],
        models: [
          {
            id: "m",
            kind: "model",
            model: "claude-fable-5.2",
            providerId: "claude",
            connectionId: "c",
            allowedConnectionIds: ["c"],
            weight: 0,
          },
        ],
      },
    ],
  };
}

function client(initial: LiveCombo[]) {
  const rows = [...initial];
  const calls: string[] = [];
  return {
    rows,
    calls,
    async list() {
      return structuredClone(rows);
    },
    async create(input: any) {
      calls.push(`create:${input.name}`);
      rows.push({ id: `id-${rows.length}`, ...structuredClone(input) });
    },
    async update(id: string, input: any) {
      calls.push(`update:${input.name}`);
      const index = rows.findIndex((row) => row.id === id);
      rows[index] = { id, ...structuredClone(input) };
    },
    async delete(id: string) {
      calls.push(`delete:${id}`);
      const index = rows.findIndex((row) => row.id === id);
      rows.splice(index, 1);
    },
  };
}

test("dry-run planner makes no writes", () => {
  const mock = client([]);
  const plan = planOmniRoute(desired(), []);
  assert.equal(plan.creates.length, 1);
  assert.deepEqual(mock.calls, []);
});

test("plan hash mismatch refuses without writes", async () => {
  const mock = client([]);
  const plan = planOmniRoute(desired(), []);
  const result = await applyOmniRoute({ plan, client: mock, expectedPlanHash: "wrong" });
  assert.equal(result.status, "refused");
  assert.deepEqual(mock.calls, []);
});

test("live precondition mismatch refuses without writes", async () => {
  const plan = planOmniRoute(desired(), []);
  const mock = client([{ id: "manual", name: "manual", description: "human", models: [] }]);
  const result = await applyOmniRoute({ plan, client: mock, expectedPlanHash: plan.planHash });
  assert.equal(result.reason, "live state changed since planning");
  assert.deepEqual(mock.calls, []);
});

test("valid plan applies and verifies exact readback", async () => {
  const mock = client([]);
  const plan = planOmniRoute(desired(), []);
  const result = await applyOmniRoute({ plan, client: mock, expectedPlanHash: plan.planHash });
  assert.equal(result.status, "success");
  assert.deepEqual(mock.calls, ["create:claude/fable/5.2"]);
});
