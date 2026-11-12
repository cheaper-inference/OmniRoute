import assert from "node:assert/strict";
import test from "node:test";
import { enrichLocalEndpoints } from "../src/catalog.ts";
import { buildDesiredGraph } from "../src/graph.ts";
import { parseOwnership } from "../src/ownership.ts";

const local = (
  connectionId: string,
  providerId: string,
  modelId: string,
  billingClass: "subscription" | "payg" | "unknown" = "subscription",
) => ({ connectionId, providerId, modelId, billingClass, active: true });

test("orders exact family versions newest first and preserves endpoint identities", () => {
  const enriched = enrichLocalEndpoints(
    [
      local("a", "claude", "claude-fable-5.1"),
      local("b", "claude", "claude-fable-5.2"),
      local("c", "github", "claude-fable-5.2"),
    ],
    [
      { modelId: "claude-fable-5.1", familyId: "claude/fable" },
      { modelId: "claude-fable-5.2", familyId: "claude/fable" },
    ],
  );
  const graph = buildDesiredGraph({ enriched, health: {} });
  const family = graph.combos.find((combo) => combo.name === "claude/fable")!;
  assert.deepEqual(
    family.models.map((step) => (step.kind === "combo-ref" ? step.comboName : "")),
    ["claude/fable/5.2", "claude/fable/5.1"],
  );
  const version = graph.combos.find((combo) => combo.name === "claude/fable/5.2")!;
  assert.deepEqual(
    version.models.map((step) =>
      step.kind === "model" ? [step.connectionId, step.providerId, step.model] : [],
    ),
    [
      ["b", "claude", "claude-fable-5.2"],
      ["c", "github", "claude-fable-5.2"],
    ],
  );
});

test("never inserts a different family as fallback", () => {
  const enriched = enrichLocalEndpoints(
    [
      local("a", "claude", "claude-fable-5.2"),
      local("b", "opencode-go", "claude-haiku-5.5"),
    ],
    [
      { modelId: "claude-fable-5.2", familyId: "claude/fable" },
      { modelId: "claude-haiku-5.5", familyId: "claude/haiku" },
    ],
  );
  const graph = buildDesiredGraph({ enriched, health: {} });
  const fable = graph.combos.find((combo) => combo.name === "claude/fable")!;
  assert.ok(
    fable.models.every(
      (step) => step.kind !== "combo-ref" || step.comboName.startsWith("claude/fable/"),
    ),
  );
});

test("zero eligible subscription endpoints omits the family", () => {
  const enriched = enrichLocalEndpoints(
    [local("a", "anthropic-api-key", "claude-fable-5.2", "payg")],
    [{ modelId: "claude-fable-5.2", familyId: "claude/fable" }],
  );
  const graph = buildDesiredGraph({ enriched, health: {} });
  assert.equal(graph.combos.some((combo) => combo.name === "claude/fable"), false);
});

test("every generated combo carries a valid v2 ownership marker", () => {
  const enriched = enrichLocalEndpoints(
    [local("a", "claude", "claude-fable-5.2")],
    [{ modelId: "claude-fable-5.2", familyId: "claude/fable" }],
  );
  const graph = buildDesiredGraph({ enriched, health: {} });
  assert.ok(graph.combos.length > 0);
  for (const combo of graph.combos) {
    const marker = parseOwnership(combo.description);
    assert.equal(marker?.owner, "family-alias-maintainer/v2");
    assert.equal(marker?.graphHash, graph.graphHash);
  }
});

test("temporary outage preserves last-known-good endpoint but permanent failure omits it", () => {
  const enriched = enrichLocalEndpoints(
    [
      local("a", "claude", "claude-fable-5.2"),
      local("b", "claude", "claude-fable-5.1"),
    ],
    [
      { modelId: "claude-fable-5.2", familyId: "claude/fable" },
      { modelId: "claude-fable-5.1", familyId: "claude/fable" },
    ],
  );
  const graph = buildDesiredGraph({
    enriched,
    health: {
      ["a\u0000claude-fable-5.2"]: {
        key: "a\u0000claude-fable-5.2",
        status: "temporary_failure",
        checkedAt: 2,
        lastSuccessAt: 1,
        failureCount: 1,
      },
      ["b\u0000claude-fable-5.1"]: {
        key: "b\u0000claude-fable-5.1",
        status: "permanent_failure",
        checkedAt: 2,
        failureCount: 1,
      },
    },
  });
  assert.ok(graph.combos.some((combo) => combo.name === "claude/fable/5.2"));
  assert.ok(!graph.combos.some((combo) => combo.name === "claude/fable/5.1"));
});
