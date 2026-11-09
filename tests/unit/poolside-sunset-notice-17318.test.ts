import test from "node:test";
import assert from "node:assert/strict";
import { APIKEY_PROVIDERS_INFERENCE } from "../../src/shared/constants/providers/apikey/inference-hosts.ts";
import { FREE_MODEL_BUDGETS } from "../../open-sse/config/freeModelCatalog.data.ts";

test("#17318 direct Poolside setup warns about the announced shutdown date", () => {
  const provider = APIKEY_PROVIDERS_INFERENCE.poolside;
  assert.match(provider.freeNote, /2026-10-31/);
  assert.match(provider.apiHint, /2026-10-31/);
  assert.match(provider.apiHint, /platform\.poolside\.ai/);
});

test("#17318 a first-party shutdown does not retire independent gateway listings", () => {
  const entries = FREE_MODEL_BUDGETS.filter((entry) => entry.modelId.startsWith("poolside/"));
  assert.ok(entries.length > 0);
  for (const entry of entries) {
    assert.equal(entry.provider, "kilo-gateway");
    assert.notEqual(entry.freeType, "discontinued");
  }
});
