import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { isDeepStrictEqual, parseArgs } from "node:util";

import {
  FREE_MODEL_BUDGETS,
  RETIRED_FREE_ROWS,
  computePublicFreeHeadline,
  computeRowSumMirror,
} from "../../open-sse/config/freeModelCatalog.ts";
import { computeFreeCatalogCounts } from "../../open-sse/config/freeModelCatalog.counts.ts";
import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";
import { membershipFromProviderConstants } from "../../tests/unit/_helpers/providerAccessMembership.ts";
import { catalogKey } from "../check/freeCatalogEvidence.mjs";
import { providerDefinitions } from "./providerProvenance.ts";

// Code-unit order, the same order a plain sort() gives, written out explicitly.
const byCodeUnit = (a, b) => (a < b ? -1 : a > b ? 1 : 0);

// Compare the fields the Radar publisher counts toward its per-publication limit.
function publishedFields(row) {
  const gates = [...(row.gates ?? [])].sort(byCodeUnit);
  return {
    budget: gates.length ? [0, 0, null] : [row.monthlyTokens, row.creditTokens, row.poolKey],
    freeType: row.freeType,
    enabled: row.enabled ?? true,
    gates,
    gatedTokensPerMonth: gates.length ? row.monthlyTokens : undefined,
    gatedPoolId: gates.length ? (row.poolKey ?? undefined) : undefined,
  };
}

function measureDiff(previous, current) {
  const previousRows = new Map(previous.map((row) => [catalogKey(row), publishedFields(row)]));
  const currentRows = new Map(current.map((row) => [catalogKey(row), publishedFields(row)]));
  let rowsAdded = 0;
  let rowsRemoved = 0;
  // rowsChanged includes insertions and removals, matching the publisher's limit.
  let rowsChanged = 0;
  for (const [key, fields] of currentRows) {
    if (!previousRows.has(key)) rowsAdded += 1;
    if (!isDeepStrictEqual(fields, previousRows.get(key))) rowsChanged += 1;
  }
  for (const key of previousRows.keys()) {
    if (!currentRows.has(key)) rowsRemoved += 1;
  }
  const previousProviders = new Set(previous.map((row) => row.provider));
  const newCatalogProviders = [...new Set(current.map((row) => row.provider))]
    .filter((id) => !previousProviders.has(id))
    .sort(byCodeUnit);
  return { rowsAdded, rowsRemoved, rowsChanged: rowsChanged + rowsRemoved, newCatalogProviders };
}

const { values } = parseArgs({ options: { "base-entries": { type: "string" } } });
const headline = computePublicFreeHeadline();
const mirror = computeRowSumMirror();
const counts = computeFreeCatalogCounts({ membershipOf: membershipFromProviderConstants });
const hasFreeIds = new Set(
  providerDefinitions()
    .filter((provider) => provider.hasFree === true)
    .map(({ id }) => id)
);

const baseFile = values["base-entries"];
let diff;
if (baseFile !== undefined) {
  const previous = await import(pathToFileURL(resolve(baseFile)).href);
  if (!Array.isArray(previous.FREE_MODEL_BUDGETS)) {
    throw new TypeError("The base file must export FREE_MODEL_BUDGETS");
  }
  diff = measureDiff(previous.FREE_MODEL_BUDGETS, FREE_MODEL_BUDGETS);
}

console.log(
  JSON.stringify(
    {
      real: headline.steadyRecurringTokens,
      firstMonth: headline.firstMonthRealisticTokens,
      gated: headline.gatedRecurringTokens,
      socialGated: headline.socialGatedRecurringTokens,
      boost: headline.boostMonthlyTokens,
      rowSumLive: mirror.liveTokens,
      rowSumRetired: mirror.retiredTokens,
      rowSumTotal: mirror.totalTokens,
      retiredSharePct: Math.round(mirror.retiredShare * 10_000) / 100,
      ledgerRows: RETIRED_FREE_ROWS.length,
      publishedQuotaPools: counts.publishedQuotaPools,
      providersWithFreeOffer: counts.providersWithFreeOffer,
      accessRows: counts.accessRows,
      freeModels: counts.freeModels,
      hasFreeProviders: hasFreeIds.size,
      registryProviders: Object.keys(REGISTRY).length,
      catalogRows: FREE_MODEL_BUDGETS.length,
      diff,
    },
    null,
    2
  )
);
