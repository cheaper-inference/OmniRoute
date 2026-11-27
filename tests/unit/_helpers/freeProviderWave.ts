import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  FREE_MODEL_BUDGETS,
  FREE_QUOTA_UNIT,
  RETIRED_FREE_ROWS,
  RETIRED_LEDGER_SINCE,
  computePublicFreeHeadline,
  computeRowSumMirror,
  freeTypesInBucket,
  grantsFreeAccess,
  type FreeGate,
  type FreeModelBudget,
  type FreeQuotaUnit,
  type RetiredFreeRow,
} from "@omniroute/open-sse/config/freeModelCatalog.ts";
import { computeFreeCatalogCounts } from "@omniroute/open-sse/config/freeModelCatalog.counts.ts";
import { FREE_TIER_TOS } from "@omniroute/open-sse/config/freeTierCatalog.ts";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.ts";
import { getEligibleFreeOnboardingProviders } from "@/lib/providers/freeOnboarding.ts";
import { PROVIDER_ENDPOINTS } from "@/shared/constants/config.ts";
import {
  AGGREGATOR_PROVIDER_IDS,
  getProviderById,
  type RiskNoticeVariant,
} from "@/shared/constants/providers.ts";
import { isRuntimeRetiredProviderId } from "@/shared/constants/providerRetirement.ts";
import { isCommonChatGptWebRetiredProviderId } from "@/shared/constants/chatgptWebRetirement.ts";
import { isMicrosoftDesignerWebRetiredProviderId } from "@/shared/constants/designerWebRetirement.ts";
import { RESERVED_PROVIDER_PREFIXES } from "@/shared/constants/reservedProviderPrefixes.ts";

import { parseProviderProvenance } from "../../../scripts/quality/providerProvenance.ts";
import { PROVIDER_EXPECTATIONS } from "../free-provider-coverage.expectations.ts";
import { membershipFromProviderConstants } from "./providerAccessMembership.ts";

export interface Contribution {
  real: number;
  firstMonth: number;
  gated: number;
  socialGated: number;
  boost: number;
  rowSumLive: number;
  publishedPools: number;
}

export interface WaveRowExpectation {
  modelId: string;
  freeType: FreeModelBudget["freeType"];
  monthlyTokens: number;
  creditTokens?: number;
  poolKey: string | null;
  tos: FreeModelBudget["tos"];
  gates?: FreeGate[];
  trainsOnPrompts?: boolean;
  hardStopGuaranteed?: boolean;
}

export interface ProviderExpectation {
  live: WaveRowExpectation[];
  discontinued?: string[];
  absent?: string[];
  unit?: FreeQuotaUnit;
  hasFree: boolean;
  freeNote?: RegExp;
  contribution: Contribution;
  retired?: Array<Pick<RetiredFreeRow, "modelId" | "lastListedMonthlyTokens" | "reason">>;
  lastWave: string;
}

export interface WaveRegistryExpectation {
  id: string;
  alias: string;
  chatUrl: string;
  modelsUrl: string;
  executor: string;
  aggregator: boolean;
  endpoint: string;
  noAuth?: boolean;
}

export interface RiskNoticeExpectation {
  id: string;
  tos: "ok" | "caution" | "avoid";
  riskNotice?: RiskNoticeVariant;
}

type Row = FreeModelBudget & { enabled?: boolean };
interface ProviderDetails {
  hasFree?: boolean;
  freeNote?: string;
  subscriptionRisk?: boolean;
  riskNoticeVariant?: RiskNoticeVariant;
}

export interface WaveFixture {
  entries?: Row[];
  expectations?: Record<string, ProviderExpectation>;
  units?: Record<string, FreeQuotaUnit>;
  evidence?: Array<Pick<Row, "provider" | "modelId"> & { checkedAt: string }>;
  retired?: RetiredFreeRow[];
  providerFor?: (id: string) => ProviderDetails | undefined;
  tos?: Readonly<Record<string, FreeModelBudget["tos"]>>;
  baselineIds?: readonly string[];
  added?: readonly { providerId: string; tos?: { verdict: RiskNoticeExpectation["tos"] } }[];
  eligibleOnboardingIds?: ReadonlySet<string>;
}

const readJson = (path: string) => JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"));
const provenance = parseProviderProvenance(
  readJson("../../../config/quality/provider-provenance.json")
);
const catalogEvidence: NonNullable<WaveFixture["evidence"]> = readJson(
  "../../../config/quality/free-catalog-evidence.json"
).evidence;

const steadyTypes = freeTypesInBucket("steady-monthly");
const countCatalog = (entries: Row[]) =>
  computeFreeCatalogCounts({ entries, membershipOf: membershipFromProviderConstants });

function summarize(entries: Row[], units?: WaveFixture["units"]): Contribution {
  const publicTotals = computePublicFreeHeadline({ entries });
  // The catalog reader resolves static units by provider ID. Fixtures supply units for
  // their synthetic providers, so apply the same live-token filter using that supplied map.
  const rowSumLive =
    units === undefined
      ? computeRowSumMirror({ entries }).liveTokens
      : entries
          .filter(
            (row) =>
              units[row.provider] === "tokens" &&
              row.enabled !== false &&
              steadyTypes.has(row.freeType) &&
              row.monthlyTokens > 0
          )
          .reduce((total, row) => total + row.monthlyTokens, 0);
  return {
    real: publicTotals.steadyRecurringTokens,
    firstMonth: publicTotals.firstMonthRealisticTokens,
    gated: publicTotals.gatedRecurringTokens,
    socialGated: publicTotals.socialGatedRecurringTokens,
    boost: publicTotals.boostMonthlyTokens,
    rowSumLive,
    publishedPools: countCatalog(entries).publishedQuotaPools,
  };
}

function combine(left: Contribution, right: Contribution, sign: 1 | -1): Contribution {
  return {
    real: left.real + sign * right.real,
    firstMonth: left.firstMonth + sign * right.firstMonth,
    gated: left.gated + sign * right.gated,
    socialGated: left.socialGated + sign * right.socialGated,
    boost: left.boost + sign * right.boost,
    rowSumLive: left.rowSumLive + sign * right.rowSumLive,
    publishedPools: left.publishedPools + sign * right.publishedPools,
  };
}

export function providerContribution(
  providers: ReadonlySet<string>,
  { entries = FREE_MODEL_BUDGETS, units }: WaveFixture = {}
): Contribution {
  return combine(
    summarize(entries, units),
    summarize(
      entries.filter((row) => !providers.has(row.provider)),
      units
    ),
    -1
  );
}

function compareRows(rows: WaveRowExpectation[]) {
  return rows
    .map((row) => ({
      modelId: row.modelId,
      freeType: row.freeType,
      monthlyTokens: row.monthlyTokens,
      creditTokens: row.creditTokens ?? 0,
      poolKey: row.poolKey,
      tos: row.tos,
      gates: [...(row.gates ?? [])].sort(),
      trainsOnPrompts: row.trainsOnPrompts,
      hardStopGuaranteed: row.hardStopGuaranteed,
    }))
    .sort((a, b) => a.modelId.localeCompare(b.modelId));
}

export function assertCatalogWave(
  ids: readonly string[],
  {
    entries = FREE_MODEL_BUDGETS,
    expectations = PROVIDER_EXPECTATIONS,
    units = FREE_QUOTA_UNIT,
    evidence = catalogEvidence,
    retired = RETIRED_FREE_ROWS,
    providerFor = getProviderById,
  }: WaveFixture = {}
): void {
  for (const id of ids) {
    const expected = expectations[id];
    assert.ok(expected, `${id}: missing wave expectations`);
    const rows = entries.filter((row) => row.provider === id);
    const live = rows.filter((row) => row.enabled !== false && grantsFreeAccess(row.freeType));
    assert.deepEqual(compareRows(live), compareRows(expected.live), `${id}: live rows`);
    for (const modelId of expected.discontinued ?? []) {
      const row = rows.find((item) => item.modelId === modelId);
      assert.equal(row?.freeType, "discontinued", `${id}/${modelId}: discontinued`);
      assert.equal(row.monthlyTokens, 0, `${id}/${modelId}: discontinued monthly quota`);
      assert.equal(row.creditTokens, 0, `${id}/${modelId}: discontinued credits`);
    }
    for (const modelId of expected.absent ?? []) {
      assert.ok(!rows.some((row) => row.modelId === modelId), `${id}/${modelId}: must be absent`);
    }
    if (live.some((row) => row.monthlyTokens > 0 || row.creditTokens > 0)) {
      assert.ok(expected.unit, `${id}: expected quota unit is required`);
      assert.equal(units[id], expected.unit, `${id}: quota unit`);
    }
    const provider = providerFor(id);
    assert.ok(provider, `${id}: missing provider metadata`);
    assert.equal(provider.hasFree, expected.hasFree, `${id}: hasFree`);
    if (expected.freeNote)
      assert.match(provider.freeNote ?? "", expected.freeNote, `${id}: freeNote`);
    for (const row of live) {
      const entry = evidence.find((item) => item.provider === id && item.modelId === row.modelId);
      assert.ok(entry, `${id}/${row.modelId}: missing evidence`);
      assert.ok(entry.checkedAt >= RETIRED_LEDGER_SINCE, `${id}/${row.modelId}: stale evidence`);
    }
    for (const item of expected.retired ?? []) {
      const row = retired.find((r) => r.provider === id && r.modelId === item.modelId);
      assert.equal(
        row?.lastListedMonthlyTokens,
        item.lastListedMonthlyTokens,
        `${id}/${item.modelId}: last quota`
      );
      assert.equal(row?.reason, item.reason, `${id}/${item.modelId}: retirement reason`);
    }
    const pools = new Set(rows.map((row) => row.poolKey).filter(Boolean));
    for (const row of entries) {
      if (row.provider !== id) {
        assert.ok(
          !pools.has(row.poolKey),
          `${id}: pool ${row.poolKey} is shared with ${row.provider}`
        );
      }
    }
  }
}

export function assertContributionsMatch(ids: readonly string[], fixture: WaveFixture = {}): void {
  const expectations = fixture.expectations ?? PROVIDER_EXPECTATIONS;
  const total = ids.reduce((sum, id) => {
    assert.ok(expectations[id], `${id}: missing wave expectations`);
    const expected = expectations[id].contribution;
    assert.deepEqual(providerContribution(new Set([id]), fixture), expected, `${id}: contribution`);
    return combine(sum, expected, 1);
  }, summarize([]));
  assert.deepEqual(
    providerContribution(new Set(ids), fixture),
    total,
    "wave contribution is additive"
  );
}

export function assertRegistryWave(expectations: readonly WaveRegistryExpectation[]): void {
  for (const {
    id,
    alias,
    chatUrl,
    modelsUrl,
    executor,
    aggregator,
    endpoint,
    noAuth,
  } of expectations) {
    const entry = REGISTRY[id];
    assert.ok(entry, `${id}: missing registry entry`);
    assert.equal(entry.id, id);
    assert.equal(entry.alias, alias, `${id}: alias`);
    assert.equal(entry.format, "openai", `${id}: format`);
    assert.equal(entry.authType, noAuth ? "none" : "apikey", `${id}: auth type`);
    assert.equal(entry.authHeader, "bearer", `${id}: auth header`);
    assert.equal(entry.executor, executor, `${id}: executor`);
    assert.equal(entry.baseUrl, chatUrl, `${id}: chat URL`);
    assert.equal(entry.modelsUrl, modelsUrl, `${id}: models URL`);
    assert.equal(
      (PROVIDER_ENDPOINTS as Record<string, string>)[id],
      endpoint,
      `${id}: displayed endpoint`
    );
    assert.equal(AGGREGATOR_PROVIDER_IDS.has(id), aggregator, `${id}: aggregator`);
    assert.ok(getProviderById(id)?.serviceKinds?.includes("llm"), `${id}: missing LLM metadata`);
    for (const other of Object.values(REGISTRY)) {
      if (other.id !== id) {
        assert.notEqual(alias, other.id, `${id}: alias is the id of another provider`);
        assert.notEqual(alias, other.alias, `${id}: alias belongs to ${other.id}`);
      }
    }
    assert.ok(RESERVED_PROVIDER_PREFIXES.has(alias), `${id}: routing prefix is not reserved`);
    assert.ok(
      !isRuntimeRetiredProviderId(alias) &&
        !isCommonChatGptWebRetiredProviderId(alias) &&
        !isMicrosoftDesignerWebRetiredProviderId(alias),
      `${id}: alias is reserved for a retired provider`
    );
  }
}

export function assertRiskNoticeWave(
  expectations: readonly RiskNoticeExpectation[],
  {
    entries = FREE_MODEL_BUDGETS,
    providerFor = getProviderById,
    tos = FREE_TIER_TOS,
    baselineIds = provenance.baselineIds,
    added = provenance.added,
    eligibleOnboardingIds,
  }: WaveFixture = {}
): void {
  for (const { id, tos: verdict, riskNotice } of expectations) {
    const provider = providerFor(id);
    assert.ok(provider, `${id}: missing provider metadata`);
    const isNew = !baselineIds.includes(id);
    if (isNew) {
      assert.equal(
        added.find((entry) => entry.providerId === id)?.tos?.verdict,
        verdict,
        `${id}: provenance terms verdict`
      );
    }
    if (verdict === "avoid") {
      assert.ok(riskNotice, `${id}: avoid requires a risk notice`);
      assert.equal(tos[id], "avoid", `${id}: FREE_TIER_TOS`);
    }
    if (riskNotice) {
      assert.equal(provider.subscriptionRisk, true, `${id}: subscriptionRisk`);
      assert.equal(provider.riskNoticeVariant, riskNotice, `${id}: risk notice variant`);
      assert.ok(provider.freeNote?.trim(), `${id}: risk notice requires a free note`);
    }
    if (verdict !== "avoid") continue;

    const rows = entries.filter((row) => row.provider === id);
    assert.ok(
      rows.every((row) => row.tos === "avoid"),
      `${id}: catalog row terms verdict`
    );
    if (isNew) {
      assert.notEqual(provider.hasFree, true, `${id}: hasFree`);
      assert.equal(rows.length, 0, `${id}: new avoid provider has a catalog row`);
      const eligible =
        eligibleOnboardingIds ??
        new Set(getEligibleFreeOnboardingProviders().map((provider) => provider.id));
      assert.ok(!eligible.has(id), `${id}: one-click onboarding`);
    }

    const contribution = providerContribution(new Set([id]), { entries });
    assert.equal(contribution.real, 0, `${id}: real contribution`);
    assert.equal(contribution.firstMonth, 0, `${id}: first-month contribution`);
    assert.equal(
      countCatalog(entries).providersWithFreeOffer.total,
      countCatalog(entries.filter((row) => row.provider !== id)).providersWithFreeOffer.total,
      `${id}: free offer count`
    );
  }
}
