import assert from "node:assert/strict";
import test from "node:test";
import { FLAT_TIER_OVERLAY_IDS } from "../../open-sse/services/autoCombo/builtinCatalog.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";
import { resolveAutoRoutingState } from "../../src/sse/handlers/autoRouting.ts";

// The classifier reads settings through the SQLite singleton: close it and its read caches.
test.after(() => resetDbInstance());

for (const [model, expectedTier] of [
  ["auto/subscription", "subscription"],
  ["auto/thrifty", "thrifty"],
] as const) {
  test(`${model} preserves its economic tier through the real request classifier`, async () => {
    const state = await resolveAutoRoutingState(model);
    assert.equal(state.recognizedBuiltInAuto, true);
    assert.equal(state.isAutoRouting, true);
    assert.equal(state.spec?.tier, expectedTier);
  });
}

test("every canonical flat economic overlay reaches the request's factory spec", async () => {
  for (const [model, tier] of Object.entries(FLAT_TIER_OVERLAY_IDS)) {
    const state = await resolveAutoRoutingState(model);
    assert.equal(state.recognizedBuiltInAuto, true, model);
    assert.equal(state.spec?.tier, tier, model);
  }
});
