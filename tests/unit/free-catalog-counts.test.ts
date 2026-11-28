import assert from "node:assert/strict";
import test from "node:test";

import * as catalogLib from "@omniroute/open-sse/config/freeModelCatalog.ts";
import * as countsLib from "@omniroute/open-sse/config/freeModelCatalog.counts.ts";
import {
  computeFreeModelTotals,
  computePublicFreeHeadline,
  computeRowSumMirror,
  formatTokenHeadline,
  type FreeModelBudget,
} from "@omniroute/open-sse/config/freeModelCatalog.ts";
import {
  computeFreeCatalogCounts,
  resolveFreeAccessType,
  type ProviderAccessMembership,
} from "@omniroute/open-sse/config/freeModelCatalog.counts.ts";
import { buildFreeCatalogFacts } from "../../scripts/release/lib/free-catalog-facts.mjs";
import { membershipFromProviderConstants } from "./_helpers/providerAccessMembership.ts";

type Row = FreeModelBudget & { enabled?: boolean };

function row(p: Partial<Row> & { provider: string; modelId: string }): Row {
  return {
    displayName: p.modelId,
    monthlyTokens: 0,
    creditTokens: 0,
    freeType: "recurring-daily",
    poolKey: null,
    tos: "caution",
    ...p,
  };
}

const NONE: ProviderAccessMembership = { noAuth: false, oauth: false, webCookie: false };
const MEMBERSHIP: Record<string, ProviderAccessMembership> = {
  w: { ...NONE, webCookie: true },
  o: { ...NONE, oauth: true },
};
const membershipOf = (id: string) => MEMBERSHIP[id] ?? NONE;

// keyless provider, an API-key provider with two models (one card-gated) whose first model is
// repeated by a web-chat provider, a ToS-avoid row, a discontinued row and a disabled row.
const FIXTURE: Row[] = [
  row({ provider: "k", modelId: "m1", freeType: "keyless" }),
  row({ provider: "a", modelId: "m2", poolKey: "a", monthlyTokens: 10e6 }),
  row({ provider: "a", modelId: "m3", poolKey: "a", monthlyTokens: 10e6, gates: ["card"] }),
  row({ provider: "w", modelId: "m2" }),
  row({ provider: "v", modelId: "m4", poolKey: "v", monthlyTokens: 5e6, tos: "avoid" }),
  row({ provider: "d", modelId: "m5", freeType: "discontinued" }),
  row({ provider: "x", modelId: "m6", poolKey: "x", monthlyTokens: 3e6, enabled: false }),
];

test("resolveFreeAccessType follows keyless, web chat, tool account, API key", () => {
  assert.equal(resolveFreeAccessType({ freeType: "keyless" }, NONE), "keyless");
  assert.equal(
    resolveFreeAccessType({ freeType: "recurring-daily" }, { ...NONE, noAuth: true }),
    "keyless"
  );
  assert.equal(
    resolveFreeAccessType(
      { freeType: "recurring-daily" },
      { noAuth: false, oauth: true, webCookie: true }
    ),
    "web-chat"
  );
  assert.equal(
    resolveFreeAccessType({ freeType: "recurring-daily" }, { ...NONE, oauth: true }),
    "tool-account"
  );
  assert.equal(resolveFreeAccessType({ freeType: "recurring-daily" }, NONE), "api-key");
});

test("counts distinct providers by access type, without avoid, dead or disabled rows", () => {
  const c = computeFreeCatalogCounts({ entries: FIXTURE, membershipOf });
  assert.deepEqual(c.providersWithFreeOffer, {
    total: 3,
    byAccess: { "api-key": 1, keyless: 1, "tool-account": 0, "web-chat": 1 },
  });
  assert.equal(c.freeModels, 3);
  assert.equal(c.accessRows, 4);
  assert.equal(c.publishedQuotaPools, 1);
});

test("includeAccess filters rows before counting", () => {
  const c = computeFreeCatalogCounts({
    entries: FIXTURE,
    membershipOf,
    includeAccess: ["api-key", "keyless"],
  });
  assert.equal(c.providersWithFreeOffer.total, 2);
  assert.equal(c.accessRows, 3);
  assert.equal(c.providersWithFreeOffer.byAccess["web-chat"], 0);
});

test("a provider with rows of two access types counts once in the total and once per type", () => {
  const entries = [
    row({ provider: "o", modelId: "m1" }),
    row({ provider: "o", modelId: "m2", freeType: "keyless" }),
  ];
  const c = computeFreeCatalogCounts({ entries, membershipOf });
  assert.equal(c.providersWithFreeOffer.total, 1);
  assert.equal(c.providersWithFreeOffer.byAccess["tool-account"], 1);
  assert.equal(c.providersWithFreeOffer.byAccess.keyless, 1);
});

test("published quota pools count a shared pool once and a pool-less cap per row", () => {
  const entries = [
    row({ provider: "g", modelId: "a", monthlyTokens: 1e6 }),
    row({ provider: "g", modelId: "b", monthlyTokens: 1e6 }),
    row({ provider: "p", modelId: "c", poolKey: "p", monthlyTokens: 2e6 }),
    row({ provider: "p", modelId: "d", poolKey: "p", monthlyTokens: 2e6 }),
    row({ provider: "s", modelId: "e", poolKey: "s", monthlyTokens: 2e6, gates: ["telegram"] }),
    row({ provider: "c", modelId: "f", freeType: "one-time-initial", creditTokens: 5e6 }),
  ];
  assert.equal(computeFreeCatalogCounts({ entries, membershipOf }).publishedQuotaPools, 3);
});

test("the shipped catalog counts are internally consistent", () => {
  const c = computeFreeCatalogCounts({ membershipOf: membershipFromProviderConstants });
  const by = c.providersWithFreeOffer.byAccess;
  assert.ok(
    by["api-key"] + by.keyless + by["tool-account"] + by["web-chat"] >=
      c.providersWithFreeOffer.total
  );
  assert.ok(c.providersWithFreeOffer.total > 0);
  assert.ok(c.freeModels <= c.accessRows);
  assert.ok(c.publishedQuotaPools <= c.accessRows);
});

test("the free-catalog facts are the canonical functions, formatted by the one formatter", () => {
  const facts = buildFreeCatalogFacts({
    lib: { catalog: catalogLib, counts: countsLib },
    entries: FIXTURE,
    retired: [],
    membershipOf,
    hasFreeIds: new Set(["k", "a", "w", "search-1", "audio-1"]),
    searchIds: new Set(["search-1"]),
    audioIds: new Set(["audio-1"]),
    displayName: (id: string) => id.toUpperCase(),
  });
  const pub = computePublicFreeHeadline({ entries: FIXTURE });
  const mirror = computeRowSumMirror({ entries: FIXTURE, retired: [] });
  const counts = computeFreeCatalogCounts({ entries: FIXTURE, membershipOf });

  assert.deepEqual(Object.keys(facts), [
    "headlineSteady",
    "headlineFirst",
    "headlineGated",
    "headlineSocialGated",
    "rowSumLive",
    "rowSumRetired",
    "rowSumTotal",
    "rowSumRetiredShare",
    "freeProviders",
    "freeModels",
    "freeAccessRows",
    "freePublishedPools",
    "hasFreeProviders",
    "freeSearchProviders",
    "freeAudioProviders",
    "headlineSteadyLabel",
    "headlineFirstLabel",
    "rowSumLiveLabel",
    "rowSumTotalLabel",
    "publicFreeTierBudget",
  ]);
  assert.equal(facts.headlineSteady, pub.steadyRecurringTokens);
  assert.equal(facts.headlineFirst, pub.firstMonthRealisticTokens);
  assert.equal(facts.headlineGated, pub.gatedRecurringTokens);
  assert.equal(facts.headlineSocialGated, pub.socialGatedRecurringTokens);
  assert.equal(facts.rowSumLive, mirror.liveTokens);
  assert.equal(facts.rowSumTotal, mirror.totalTokens);
  assert.equal(facts.rowSumRetiredShare, Math.round(mirror.retiredShare * 1e4) / 1e4);
  assert.deepEqual(facts.freeProviders, {
    total: counts.providersWithFreeOffer.total,
    apiKey: 1,
    keyless: 1,
    toolAccount: 0,
    webChat: 1,
  });
  assert.equal(facts.freeModels, counts.freeModels);
  assert.equal(facts.freeAccessRows, counts.accessRows);
  assert.equal(facts.freePublishedPools, counts.publishedQuotaPools);
  assert.equal(facts.hasFreeProviders, 5);
  assert.equal(facts.freeSearchProviders, 1);
  assert.equal(facts.freeAudioProviders, 1);
  assert.equal(facts.headlineSteadyLabel, formatTokenHeadline(facts.headlineSteady));
  assert.equal(facts.headlineFirstLabel, formatTokenHeadline(facts.headlineFirst));
  assert.equal(facts.rowSumLiveLabel, formatTokenHeadline(facts.rowSumLive));
  assert.equal(facts.rowSumTotalLabel, formatTokenHeadline(facts.rowSumTotal));
  assert.equal(facts.publicFreeTierBudget.steady, facts.headlineSteady);
  // The public budget reads the ToS-avoid-free catalog, unlike the legacy freeTierBudget.
  assert.notEqual(
    computeFreeModelTotals({ entries: FIXTURE }).steadyRecurringTokens,
    facts.publicFreeTierBudget.steady
  );
});
