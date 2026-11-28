import assert from "node:assert/strict";
import test from "node:test";

import {
  RETIRED_LEDGER_SINCE,
  type FreeModelBudget,
} from "@omniroute/open-sse/config/freeModelCatalog.ts";

import {
  assertCatalogWave,
  assertContributionsMatch,
  assertRiskNoticeWave,
  providerContribution,
  type ProviderExpectation,
  type WaveFixture,
} from "./_helpers/freeProviderWave.ts";

const a: FreeModelBudget = {
  provider: "wave-a",
  modelId: "alpha",
  displayName: "Alpha",
  freeType: "recurring-daily",
  monthlyTokens: 100,
  creditTokens: 0,
  poolKey: "pool-a",
  tos: "ok",
};
const b: FreeModelBudget = { ...a, provider: "wave-b", modelId: "beta", poolKey: "pool-b" };
const { provider: _provider, displayName: _displayName, ...alpha } = a;
const expectation: ProviderExpectation = {
  live: [alpha],
  unit: "tokens",
  hasFree: true,
  contribution: {
    real: 100,
    firstMonth: 100,
    gated: 0,
    socialGated: 0,
    boost: 0,
    rowSumLive: 100,
    publishedPools: 1,
  },
  lastWave: "fixture",
};
const fixture: WaveFixture = {
  entries: [a],
  expectations: { "wave-a": expectation },
  units: { "wave-a": "tokens", "wave-b": "tokens" },
  providerFor: () => ({ hasFree: true }),
  baselineIds: ["wave-a"],
  evidence: [{ provider: "wave-a", modelId: "alpha", checkedAt: RETIRED_LEDGER_SINCE }],
};

test("catalog wave matches exactly the live rows and accepts later evidence dates", () => {
  assertCatalogWave(["wave-a"], {
    ...fixture,
    evidence: [{ provider: "wave-a", modelId: "alpha", checkedAt: "2027-01-01" }],
  });
  assert.throws(
    () =>
      assertCatalogWave(["wave-a"], {
        ...fixture,
        entries: [a, { ...a, modelId: "another" }],
      }),
    /live rows/
  );
});

test("catalog wave rejects a different unit or older evidence", () => {
  assert.throws(
    () => assertCatalogWave(["wave-a"], { ...fixture, units: { "wave-a": "requests" } }),
    /quota unit/
  );
  assert.throws(
    () =>
      assertCatalogWave(["wave-a"], {
        ...fixture,
        evidence: [{ provider: "wave-a", modelId: "alpha", checkedAt: "2026-11-17" }],
      }),
    /stale evidence/
  );
});

test("wave assertions reject a pool shared between two providers", () => {
  const shared = { ...b, poolKey: a.poolKey };
  const collision = {
    ...fixture,
    entries: [a, shared],
    expectations: { "wave-a": expectation, "wave-b": expectation },
  };
  assert.throws(() => assertCatalogWave(["wave-a"], collision), /pool.*wave-b/);
  assert.throws(() => assertContributionsMatch(["wave-a", "wave-b"], collision), /contribution/);
});

test("a later wave on another provider does not move this provider's contribution", () => {
  const ids = new Set(["wave-a"]);
  const before = { ...fixture, entries: [a, b] };
  const after = { ...fixture, entries: [a, b, { ...b, modelId: "new", monthlyTokens: 900 }] };
  assert.deepEqual(providerContribution(ids, before), expectation.contribution);
  assert.deepEqual(providerContribution(ids, after), providerContribution(ids, before));
  assertContributionsMatch(["wave-a"], after);
});

const caution = { id: "wave-a", tos: "caution", riskNotice: "unofficial-service" } as const;
const avoid = { ...caution, tos: "avoid" } as const;
const riskProvider = {
  hasFree: false,
  subscriptionRisk: true,
  riskNoticeVariant: "unofficial-service",
  freeNote: "The operator can read requests.",
} as const;
const blocked: WaveFixture = {
  ...fixture,
  entries: [],
  providerFor: () => riskProvider,
  tos: { "wave-a": "avoid" },
  baselineIds: [],
  added: [{ providerId: "wave-a", tos: { verdict: "avoid" } }],
  eligibleOnboardingIds: new Set(),
};

test("avoid requires an explicit variant, provider warning and terms entry", () => {
  assertRiskNoticeWave([avoid], blocked);
  assert.throws(
    () => assertRiskNoticeWave([{ id: "wave-a", tos: "avoid" }], blocked),
    /risk notice/
  );
  assert.throws(
    () =>
      assertRiskNoticeWave([avoid], {
        ...blocked,
        providerFor: () => ({ ...riskProvider, subscriptionRisk: undefined }),
      }),
    /subscriptionRisk/
  );
  assert.throws(() => assertRiskNoticeWave([avoid], { ...blocked, tos: {} }), /FREE_TIER_TOS/);
});

test("a new avoid provider cannot advertise free access, gain a row or enter free onboarding", () => {
  assert.throws(
    () =>
      assertRiskNoticeWave([avoid], {
        ...blocked,
        providerFor: () => ({ ...riskProvider, hasFree: true }),
      }),
    /hasFree/
  );
  assert.throws(
    () =>
      assertRiskNoticeWave([avoid], {
        ...blocked,
        entries: [{ ...a, tos: "avoid" }],
      }),
    /catalog row/
  );
  assert.throws(
    () =>
      assertRiskNoticeWave([avoid], {
        ...blocked,
        eligibleOnboardingIds: new Set(["wave-a"]),
      }),
    /one-click onboarding/
  );
});

test("a caution provider can show a risk notice and contribute a published quota", () => {
  const allowed: WaveFixture = {
    ...fixture,
    entries: [{ ...a, tos: "caution" }],
    providerFor: () => ({ ...riskProvider, hasFree: true }),
  };
  assertRiskNoticeWave([caution], allowed);
  assert.deepEqual(providerContribution(new Set(["wave-a"]), allowed), expectation.contribution);
});
