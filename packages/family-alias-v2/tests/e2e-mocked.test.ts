import assert from "node:assert/strict";
import test from "node:test";
import { enrichLocalEndpoints } from "../src/catalog.ts";
import { buildDesiredGraph } from "../src/graph.ts";
import { planOmniRoute } from "../src/omniroute/plan.ts";

const ep = (connectionId: string, providerId: string, modelId: string) => ({
  connectionId,
  providerId,
  modelId,
  billingClass: "subscription" as const,
  active: true,
});

test("two installations emit only their own subscription families", () => {
  const a = buildDesiredGraph({
    enriched: enrichLocalEndpoints(
      [ep("claude-a", "claude", "claude-fable-5.2")],
      [{ modelId: "claude-fable-5.2", familyId: "claude/fable" }],
    ),
    health: {},
  });
  const b = buildDesiredGraph({
    enriched: enrichLocalEndpoints(
      [ep("qwen-b", "opencode-go", "qwen3.8-max")],
      [{ modelId: "qwen3.8-max", familyId: "qwen/qwen" }],
    ),
    health: {},
  });
  assert.deepEqual(a.combos.map((c) => c.name), ["claude/fable/5.2", "claude/fable"]);
  assert.deepEqual(b.combos.map((c) => c.name), ["qwen/qwen/3.8", "qwen/qwen"]);
});

test("second unchanged plan has zero writes", () => {
  const desired = buildDesiredGraph({
    enriched: enrichLocalEndpoints(
      [ep("claude-a", "claude", "claude-fable-5.2")],
      [{ modelId: "claude-fable-5.2", familyId: "claude/fable" }],
    ),
    health: {},
  });
  const first = planOmniRoute(desired, []);
  const live = first.creates.map((combo, index) => ({ id: `id-${index}`, ...combo }));
  const second = planOmniRoute(desired, live);
  assert.deepEqual(second.creates, []);
  assert.deepEqual(second.updates, []);
  assert.deepEqual(second.deletes, []);
});
