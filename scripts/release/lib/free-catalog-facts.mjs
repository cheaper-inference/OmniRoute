// scripts/release/lib/free-catalog-facts.mjs
//
// The free-catalog half of the facts probe: the real (public) headline, the row-sum reading,
// the counts by access type, the hasFree counts and the printed labels, built from the catalog's
// own functions. Pure: it reads only what the caller passes. The probe passes the modules it
// loaded from the tree being measured (`lib`), so the facts follow that tree's catalog, not the
// copy next to this script. tests/unit/free-catalog-counts.test.ts calls it on fixtures.
//
// The 20 keys below are appended, in this order, to CODE_FACT_KEYS (scripts/release/facts.mjs).
// hasFreeProviders / freeSearchProviders / freeAudioProviders count PROVIDERS with hasFree, not
// quota.

import { summarizeFreeTierBudget } from "../../docs/readmeFactsFreeTier.mjs";

/**
 * @param {object} o
 * @param {{ catalog: object, counts: object }} o.lib the freeModelCatalog and freeModelCatalog.counts modules
 * @param {Array<object>} [o.entries] catalog rows; default the shipped catalog
 * @param {Array<object>} [o.retired] retired ledger rows; default the shipped ledger
 * @param {(id: string) => { noAuth: boolean, oauth: boolean, webCookie: boolean }} o.membershipOf
 * @param {Set<string>} o.hasFreeIds distinct provider ids with hasFree === true
 * @param {Set<string>} o.searchIds search provider ids with hasFree === true
 * @param {Set<string>} o.audioIds audio-only provider ids with hasFree === true
 * @param {(id: string) => string} o.displayName provider display name
 */
export function buildFreeCatalogFacts({
  lib,
  entries,
  retired,
  membershipOf,
  hasFreeIds,
  searchIds,
  audioIds,
  displayName,
}) {
  const { computePublicFreeHeadline, computeRowSumMirror, formatTokenHeadline } = lib.catalog;
  const { computeFreeCatalogCounts } = lib.counts;

  const pub = computePublicFreeHeadline({ entries });
  const mirror = computeRowSumMirror({ entries, retired });
  const counts = computeFreeCatalogCounts({ entries, membershipOf });
  const by = counts.providersWithFreeOffer.byAccess;

  return {
    headlineSteady: pub.steadyRecurringTokens,
    headlineFirst: pub.firstMonthRealisticTokens,
    headlineGated: pub.gatedRecurringTokens,
    headlineSocialGated: pub.socialGatedRecurringTokens,
    rowSumLive: mirror.liveTokens,
    rowSumRetired: mirror.retiredTokens,
    rowSumTotal: mirror.totalTokens,
    rowSumRetiredShare: Math.round(mirror.retiredShare * 1e4) / 1e4,
    freeProviders: {
      total: counts.providersWithFreeOffer.total,
      apiKey: by["api-key"],
      keyless: by.keyless,
      toolAccount: by["tool-account"],
      webChat: by["web-chat"],
    },
    freeModels: counts.freeModels,
    freeAccessRows: counts.accessRows,
    freePublishedPools: counts.publishedQuotaPools,
    hasFreeProviders: hasFreeIds.size,
    freeSearchProviders: searchIds.size,
    freeAudioProviders: audioIds.size,
    headlineSteadyLabel: formatTokenHeadline(pub.steadyRecurringTokens),
    headlineFirstLabel: formatTokenHeadline(pub.firstMonthRealisticTokens),
    rowSumLiveLabel: formatTokenHeadline(mirror.liveTokens),
    rowSumTotalLabel: formatTokenHeadline(mirror.totalTokens),
    publicFreeTierBudget: summarizeFreeTierBudget(pub, displayName),
  };
}
