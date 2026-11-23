/**
 * `ultra` is a registered Codex effort alias tier (gpt-6.1-sol-ultra, gpt-6-sol-ultra,
 * gpt-5.6-sol-ultra, gpt-6-astra-ultra, gpt-5.6-terra-ultra) but it was missing from
 * REGISTERED_EFFORT_SUFFIXES, so the registry never mapped those aliases to their base.
 * With an authoritative live catalog that only reports the base id, every consumer of
 * getRegisteredProviderEffortBaseModelId (catalog availability, provider inference,
 * same-version fallback) treated the `-ultra` alias as unknown while the sibling
 * `-max` / `-xhigh` aliases resolved (#16027).
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  getRegisteredProviderEffortBaseModelId,
  isRegisteredProviderEffortVariant,
} from "../../open-sse/utils/registeredEffortVariants.ts";
import { shouldExposeSyncedEffortVariants } from "../../open-sse/utils/syncedEffortVariants.ts";
import { isModelInLiveCatalog } from "../../src/app/api/models/liveCatalogAvailability.ts";

test("registered Codex -ultra aliases resolve to their registry base (#16027)", () => {
  assert.equal(getRegisteredProviderEffortBaseModelId("codex", "gpt-6.1-sol-ultra"), "gpt-6.1-sol");
  assert.equal(getRegisteredProviderEffortBaseModelId("codex", "gpt-6-sol-ultra"), "gpt-6-sol");
  assert.equal(getRegisteredProviderEffortBaseModelId("codex", "gpt-5.6-sol-ultra"), "gpt-5.6-sol");
  assert.equal(isRegisteredProviderEffortVariant("codex", "gpt-6-astra-ultra"), true);
});

test("an -ultra alias is live-backed when the live catalog reports only its base", () => {
  const liveIds = new Set(["gpt-6.1-sol"]);
  assert.equal(isModelInLiveCatalog("codex", "gpt-6.1-sol-ultra", liveIds), true);
  // Same rule as the existing -max alias: the tiers behave alike now.
  assert.equal(isModelInLiveCatalog("codex", "gpt-6.1-sol-max", liveIds), true);
});

test("the ultra suffix still requires a registered variant and a registered base", () => {
  // Not a registry id of the provider: never inferred from spelling alone.
  assert.equal(getRegisteredProviderEffortBaseModelId("codex", "gpt-9-imaginary-ultra"), null);
  assert.equal(getRegisteredProviderEffortBaseModelId("nvidia", "nemotron-ultra"), null);
  assert.equal(
    isModelInLiveCatalog("codex", "gpt-9-imaginary-ultra", new Set(["gpt-9-imaginary"])),
    false
  );
});

test("a Codex -ultra alias still does not grow nested synced effort variants (#16018 rule)", () => {
  const ultraModel = {
    id: "gpt-6.1-sol-ultra",
    owned_by: "codex",
    capabilities: { effort_tiers: ["low", "medium", "high", "xhigh", "max", "ultra"] },
    supportedThinkingEfforts: ["low", "medium", "high", "xhigh", "max", "ultra"],
  };
  assert.equal(shouldExposeSyncedEffortVariants(ultraModel), false);
});
