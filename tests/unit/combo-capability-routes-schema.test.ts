import assert from "node:assert/strict";
import test from "node:test";
import { createComboSchema, updateComboSchema } from "../../src/shared/validation/schemas/combo.ts";
import {
  comboWithCapabilityRouteSteps,
  normalizeComboCapabilityRoutes,
} from "../../src/lib/combos/capabilityRoutes.ts";

test("combo schemas accept independent capability plans", () => {
  const input = {
    name: "multi-surface",
    models: ["openai/gpt-4o"],
    strategy: "priority",
    routes: {
      chat: { models: ["openai/gpt-4o"], strategy: "priority" },
      music: {
        models: ["elevenlabs/music_v1", "vertex/lyria-002"],
        strategy: "round-robin",
        config: { maxRetries: 0 },
      },
    },
  };
  assert.equal(createComboSchema.safeParse(input).success, true);
  assert.equal(updateComboSchema.safeParse({ routes: input.routes }).success, true);
});

test("combo schemas reject unknown capabilities and empty plans", () => {
  assert.equal(
    updateComboSchema.safeParse({ routes: { unknown: { models: ["openai/gpt-4o"] } } }).success,
    false
  );
  assert.equal(
    updateComboSchema.safeParse({ routes: { music: { models: [], strategy: "priority" } } })
      .success,
    false
  );
  assert.equal(
    updateComboSchema.safeParse({
      routes: { music: { models: ["elevenlabs/music_v1"], strategy: "fusion" } },
    }).success,
    false
  );
});

test("normalization preserves account pins and exposes route refs to DAG validation", () => {
  const routes = normalizeComboCapabilityRoutes(
    {
      search: {
        strategy: "fill-first",
        models: [
          { kind: "combo-ref", comboName: "search-child" },
          { providerId: "tavily-search", model: "web", connectionId: "account-a" },
        ],
      },
    },
    { comboName: "root", allCombos: [{ name: "search-child" }] as never }
  );
  assert.equal(routes?.search?.models[1].kind, "model");
  assert.equal(
    routes?.search?.models[1].kind === "model" && routes.search.models[1].connectionId,
    "account-a"
  );
  const combined = comboWithCapabilityRouteSteps({
    name: "root",
    models: ["openai/gpt-4o"],
    routes,
  });
  assert.equal(combined.models.length, 3);
});
