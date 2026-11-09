/**
 * Follow-up to #6328 / #6495 / #6512 — the shared free-model predicate ignored
 * the catalog's own `freeType`, so entries a provider has since put behind a
 * paid key were still reported free.
 *
 * The catalog already records the regime of every entry, and
 * `strictZeroCostFilter` already reads it. These guards pin the same rule into
 * the predicate that `hidePaidModels` and `/v1/models` go through.
 */
import "../../_helpers/pinnedProviderClientVersions";
import { afterAll, test } from "vitest";
import assert from "node:assert/strict";
import { closeSharedLoggerResource } from "../../../src/shared/utils/loggerResource.ts";

import {
  FREE_MODEL_BUDGETS,
  grantsFreeAccess,
  type FreeModelFreeType,
} from "../../../open-sse/config/freeModelCatalog.ts";
import { isFreeModel, providerHasFreeModels } from "../../../src/shared/utils/freeModels.ts";
import { filterPaidOnlyCandidates } from "../../../open-sse/services/autoCombo/paidModelFilter.ts";
import {
  evaluateCandidateConnections,
  findBudgetEntry,
} from "../../../open-sse/services/autoCombo/strictZeroCostFilter.ts";

// The strict filter imports the shared console logger; finish its worker before teardown.
afterAll(closeSharedLoggerResource);

/** Catalogued under `pollinations` as `discontinued`: the provider moved them
 * behind an API key, and their `displayName` says so. */
const DISCONTINUED = [
  "gemini",
  "gemini-fast",
  "midijourney",
  "midijourney-large",
  "claude-fast",
  "claude",
  "claude-large",
];

/** Same provider, still keyless — the guard against over-filtering. */
const STILL_FREE = ["openai", "openai-fast", "qwen-coder", "mistral", "deepseek"];

test("a model the catalog marks discontinued is not free", () => {
  for (const id of DISCONTINUED) {
    assert.equal(
      isFreeModel("pollinations", { id }),
      false,
      `pollinations/${id} is catalogued discontinued and must not qualify as free`
    );
  }
});

test("the provider's still-free models are untouched", () => {
  for (const id of STILL_FREE) {
    assert.equal(
      isFreeModel("pollinations", { id }),
      true,
      `pollinations/${id} is catalogued keyless and must stay free`
    );
  }
});

test("the provider itself still counts as having free models", () => {
  assert.equal(
    providerHasFreeModels("pollinations"),
    true,
    "pollinations keeps ten keyless entries; only the discontinued ones change"
  );
});

test("hidePaidModels drops them from the auto/* candidate pool", () => {
  const discontinued = { provider: "pollinations", model: "claude" };
  const stillFree = { provider: "pollinations", model: "openai" };

  assert.deepEqual(
    filterPaidOnlyCandidates([discontinued, stillFree], true),
    [stillFree],
    "an operator who asked not to route to paid models must not get one that needs a paid key"
  );
  assert.deepEqual(
    filterPaidOnlyCandidates([discontinued, stillFree], false),
    [discontinued, stillFree],
    "opt-in off stays an identity no-op"
  );
});

test("catalogued providers retain active catalog or documented live free access", () => {
  for (const provider of new Set(FREE_MODEL_BUDGETS.map((m) => m.provider))) {
    assert.equal(providerHasFreeModels(provider), true, `${provider} lost documented free access`);
  }
  // The release catalogs two current routes; the ended campaign remains a
  // separate discontinued identity and cannot regain access through stale flags.
  const tokenHarbor = FREE_MODEL_BUDGETS.filter((m) => m.provider === "tokenharbor");
  assert.deepEqual(
    tokenHarbor
      .filter((m) => grantsFreeAccess(m.freeType))
      .map((m) => m.modelId)
      .sort(),
    ["deepseek-v4.1-flash:free", "mimo-v2.6-flash:free"]
  );
  const retired = tokenHarbor.find((m) => m.modelId === "claude-haiku-5.5:free");
  assert.ok(retired, "retain the ended campaign as explicit negative evidence");
  assert.equal(retired.freeType, "discontinued");
  assert.equal(isFreeModel("tokenharbor", { id: retired.modelId, isFree: true }), false);
  assert.equal(providerHasFreeModels("tokenharbor"), true);
});

test("every regime is classified, with the expected verdict", () => {
  const expected: Record<FreeModelFreeType, boolean> = {
    "recurring-daily": true,
    "recurring-monthly": true,
    "recurring-credit": true,
    "recurring-uncapped": true,
    "one-time-initial": true,
    keyless: true,
    discontinued: false,
  };
  for (const [freeType, verdict] of Object.entries(expected)) {
    assert.equal(
      grantsFreeAccess(freeType as FreeModelFreeType),
      verdict,
      `${freeType} must be classified ${verdict}`
    );
  }
});

test("the strict filter (G1c) excludes a discontinued entry, matching its prior literal", () => {
  const budgetEntry = findBudgetEntry({ provider: "pollinations", model: "claude" });
  assert.ok(budgetEntry, "discontinued pollinations/claude must be in the catalog");
  assert.equal(budgetEntry.freeType, "discontinued", "sanity: the entry this guard protects");

  // A discontinued entry must be excluded by the strict filter regardless of
  // connection safety — it collapses the regime to "no free access" before any
  // quota lookup, exactly as the previous `freeType === "discontinued"` literal did.
  const excluded = evaluateCandidateConnections(
    { provider: "pollinations", model: "claude", connectionId: "some-real-conn" },
    budgetEntry,
    () => ({
      status: "SAFE",
      remainingFreeAllowance: 1000,
      resetAt: null,
      checkedAt: new Date().toISOString(),
    }),
    { minRemainingAllowance: 0, maxStateAgeMs: 1e9 }
  );
  assert.deepEqual(
    excluded,
    [],
    "a discontinued entry is excluded by the strict filter, independent of connection safety"
  );
});
