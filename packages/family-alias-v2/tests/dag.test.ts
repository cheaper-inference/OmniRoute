import assert from "node:assert/strict";
import test from "node:test";
import { validateDesiredDag } from "../src/omniroute/dag.ts";
import type { DesiredCombo } from "../src/graph.ts";

/** A chain listed leaf first, so every child is visited before its parent. */
function chain(edges: number): DesiredCombo[] {
  const combos: DesiredCombo[] = [
    {
      name: "n0",
      description: "",
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
  ];
  for (let index = 1; index <= edges; index++) {
    combos.push({
      name: `n${index}`,
      description: "",
      strategy: "priority",
      allowedModelFamilies: ["claude"],
      models: [{ id: `r${index}`, kind: "combo-ref", comboName: `n${index - 1}`, weight: 0 }],
    });
  }
  return combos;
}

test("depth is enforced even when every child was visited first", () => {
  assert.throws(() => validateDesiredDag(chain(7), 6), /combo depth exceeds 6: n7/);
  assert.doesNotThrow(() => validateDesiredDag(chain(6), 6));
});

test("a cycle is still detected", () => {
  const combos = chain(2);
  combos[0] = {
    ...combos[0],
    models: [{ id: "back", kind: "combo-ref", comboName: "n2", weight: 0 }],
  };
  assert.throws(() => validateDesiredDag(combos), /combo cycle detected/);
});
