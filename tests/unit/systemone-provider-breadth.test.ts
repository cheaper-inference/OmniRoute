import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  isDecisionCatalogRow,
  toDecisionCatalogModel,
} from "../../open-sse/handlers/systemOneCatalog.ts";
import { resolveSystemOneCandidates } from "../../open-sse/config/systemOneRegistry.ts";

const fixture = JSON.parse(
  readFileSync(
    new URL("../fixtures/systemone/openrouter-survey-model-ids-20261027.json", import.meta.url),
    "utf8"
  )
) as { kind: string; limitations: string; ids: string[] };

test("all research-listed OpenRouter decision identities remain discoverable and round-trip without Jev filtering", () => {
  assert.match(fixture.kind, /synthetic_partial/);
  assert.match(fixture.limitations, /not raw/);
  assert.equal(new Set(fixture.ids).size, 30);
  const authors = new Set(fixture.ids.map((id) => id.replace(/^~/, "").split("/")[0]));
  assert.equal(authors.size, 14);
  for (const id of fixture.ids) {
    const row = { id, architecture: { output_modalities: ["decisions"] } };
    assert.equal(isDecisionCatalogRow("openrouter", row), true, id);
    const listed = toDecisionCatalogModel("openrouter", row)!;
    assert.equal(listed.id, `openrouter/${id}`);
    assert.equal(listed.pricing_status, "unknown");
    assert.equal(listed.decision_primitives, null);
    const resolved = resolveSystemOneCandidates(listed.id);
    assert.equal(resolved.length, 1);
    assert.equal(resolved[0].provider, "openrouter");
    assert.equal(resolved[0].model, id);
    assert.equal(resolved[0].pinned, true);
  }
});
