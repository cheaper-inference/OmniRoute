/**
 * gpt-6.1-sol-ultra is already an effort alias. The shared capability block
 * carries supportedThinkingEfforts, and the catalog builder appended another
 * tier (gpt-6.1-sol-ultra-max). Codex -ultra aliases stay as they are, and a
 * Codex -max/-high alias does too when its unsuffixed stem is in the same
 * list. A non-Codex id ending in -ultra (nemotron) still exposes variants.
 * A discovered Codex -high/-max id with no sibling stem still does (#13224).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { appendSyncedEffortVariants } from "../../open-sse/utils/syncedEffortVariants.ts";

const TIERS = ["low", "medium", "high", "xhigh", "max"];

function codex(id: string) {
  return {
    id: `codex/${id}`,
    owned_by: "codex",
    root: id,
    name: id,
    supportedThinkingEfforts: TIERS,
    capabilities: { effort_tiers: TIERS },
  };
}

test("codex effort aliases are not given a second tier suffix", () => {
  const out = appendSyncedEffortVariants([
    codex("gpt-6.1-sol"),
    codex("gpt-6.1-sol-ultra"),
    codex("gpt-6.1-sol-max"),
  ]);
  const ids = out.map((model) => model.id);

  assert.ok(ids.includes("codex/gpt-6.1-sol-max"));
  assert.equal(
    ids.includes("codex/gpt-6.1-sol-ultra-max"),
    false,
    "ultra alias must not grow another tier"
  );
  assert.equal(
    ids.includes("codex/gpt-6.1-sol-max-low"),
    false,
    "max alias must not grow another tier"
  );
});

test("a lone Codex ultra alias does not grow another tier", () => {
  const out = appendSyncedEffortVariants([codex("gpt-6.1-sol-ultra")]);
  assert.deepEqual(
    out.map((model) => model.id),
    ["codex/gpt-6.1-sol-ultra"]
  );
});

test("non-Codex ids ending in -ultra still expose effort variants", () => {
  const out = appendSyncedEffortVariants([
    {
      id: "nvidia/nemotron-3-ultra",
      owned_by: "nvidia",
      root: "nemotron-3-ultra",
      name: "Nemotron 3 Ultra",
      capabilities: { effort_tiers: ["low", "high"] },
    },
  ]);
  const ids = out.map((model) => model.id);

  assert.ok(ids.includes("nvidia/nemotron-3-ultra"));
  assert.ok(ids.includes("nvidia/nemotron-3-ultra-high"));
  assert.ok(ids.includes("nvidia/nemotron-3-ultra-low"));
});

test("discovered Codex high/max ids without a sibling stem keep variants (#13224)", () => {
  const out = appendSyncedEffortVariants([codex("future-codex-high"), codex("future-codex-max")]);
  const ids = out.map((model) => model.id);

  assert.ok(ids.includes("codex/future-codex-high"));
  assert.ok(ids.includes("codex/future-codex-max"));
  assert.ok(ids.includes("codex/future-codex-high-low"));
  assert.ok(ids.includes("codex/future-codex-max-low"));
  assert.equal(ids.includes("codex/future-codex"), false);
});
