import assert from "node:assert/strict";
import test from "node:test";
import { normalizeDiscoveredModels } from "../../src/lib/providerModels/modelDiscovery.ts";
import { normalizeSyncedAvailableModels } from "../../src/lib/db/models/synced.ts";
import {
  isFreeModel,
  isModelFreeBadge,
  selectModelsForImport,
} from "../../src/shared/utils/freeModels.ts";

test("#17028 cached discovery retains a paid veto after raw pricing is projected away", () => {
  const rows = normalizeSyncedAvailableModels(
    normalizeDiscoveredModels(
      [
        { id: "agnes-2.0-flash", pricing: { input: 1, output: 0 } },
        { id: "agnes-2.5-flash", isFree: true, free: false },
      ],
      "agnes"
    )
  );
  assert.equal(rows.length, 2);
  for (const row of rows) {
    assert.equal(row.isFree, false);
    assert.equal(isFreeModel("agnes", row), false);
    assert.equal(isModelFreeBadge("agnes", row), false);
  }
  assert.deepEqual(selectModelsForImport("agnes", rows, true), {
    models: [],
    freeFilterEmpty: true,
  });
});

test("#18320 compatible cached models retain the paid tier veto", () => {
  for (const provider of ["openai-compatible-fixture", "anthropic-compatible-fixture"]) {
    const raw = { id: "fixture:free", tier: " PAID ", pricing: { input: 0, output: 0 } };
    assert.deepEqual(selectModelsForImport(provider, [raw], true).models, []);
    const cached = normalizeSyncedAvailableModels(normalizeDiscoveredModels([raw], provider));
    assert.deepEqual(selectModelsForImport(provider, cached, true).models, []);
  }
});

test("#18320 tier labels alone do not change ordinary-provider discovery contracts", () => {
  const rows = normalizeDiscoveredModels(
    [{ id: "fixture", tier: "paid", pricing: { input: 0, output: 0 } }],
    "openrouter"
  );
  assert.equal(rows[0].isFree, true);
});
