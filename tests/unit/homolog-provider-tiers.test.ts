import { test } from "node:test";
import assert from "node:assert/strict";
import { pickSmokeModels } from "../../scripts/homolog/lib/providerTiers.mjs";

const CATALOG = [
  { id: "openai/gpt-5-mini" },
  { id: "openai/gpt-5" },
  { id: "anthropic/claude-sonnet-5" },
  { id: "mistral/mistral-small" },
  { id: "grok/grok-4-fast" },
];

test("1 model per critical provider (the first in the catalog)", () => {
  const picks = pickSmokeModels(CATALOG, ["openai", "anthropic", "grok"]);
  assert.deepEqual(
    picks.map((p) => p.model),
    ["openai/gpt-5-mini", "anthropic/claude-sonnet-5", "grok/grok-4-fast"]
  );
});

test("critical provider missing from catalog becomes reportable miss", () => {
  const picks = pickSmokeModels(CATALOG, ["openai", "nvidia"]);
  assert.equal(picks.find((p) => p.provider === "nvidia").model, null);
});
