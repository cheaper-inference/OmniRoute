import type { TosVerdict } from "./freeTierCatalog.ts";
export { FREE_MODEL_BUDGETS } from "./freeModelCatalog.data.ts";
import { FREE_CATALOG_CURATED_AT, FREE_MODEL_BUDGETS } from "./freeModelCatalog.data.ts";
import { RETIRED_FREE_ROWS, type RetiredFreeRow } from "./freeModelCatalog.retired.data.ts";
export {
  RETIRED_FREE_ROWS,
  RETIRED_LEDGER_SINCE,
  type RetiredFreeRow,
} from "./freeModelCatalog.retired.data.ts";

export type FreeModelFreeType =
  | "recurring-daily"
  | "recurring-monthly"
  | "recurring-credit"
  | "recurring-uncapped"
  | "one-time-initial"
  | "keyless"
  | "discontinued";

/**
 * A real, recurring quota that only opens after an identity check tied to a
 * region (e.g. 实名认证 with a mainland-China ID). One member today; extend the
 * union when a second kind of gate is catalogued.
 */
export type FreeEligibilityGate = "regional-identity";

/**
 * What a user must do or have before a free row opens. Affects COUNTING only, like
 * `eligibilityGate`: routing, `isFreeModel` and STRICT_ZERO_COST read `freeType` alone.
 * - card, deposit, kyc, region, invite, waitlist: identity or payment — the row leaves the real
 *   figure and lands in `gatedRecurringTokens`. A one-time deposit that raises a quota is a
 *   `FREE_TIER_BOOSTS` entry, never a `deposit` gate on a catalog row.
 * - phone, telegram, discord: social — the row leaves the real figure and lands in
 *   `socialGatedRecurringTokens`.
 * - new-accounts-only: informational; the row stays in the real figure.
 */
export type FreeGate =
  | "card"
  | "deposit"
  | "kyc"
  | "phone"
  | "telegram"
  | "discord"
  | "region"
  | "invite"
  | "waitlist"
  | "new-accounts-only";

export const IDENTITY_OR_PAYMENT_GATES: ReadonlySet<FreeGate> = new Set<FreeGate>([
  "card",
  "deposit",
  "kyc",
  "region",
  "invite",
  "waitlist",
]);

export const SOCIAL_GATES: ReadonlySet<FreeGate> = new Set<FreeGate>([
  "phone",
  "telegram",
  "discord",
]);

export interface FreeModelBudget {
  provider: string;
  modelId: string;
  displayName: string;
  monthlyTokens: number;
  creditTokens: number;
  freeType: FreeModelFreeType;
  poolKey: string | null;
  tos: TosVerdict;
  /**
   * Provider states it may train on user prompts. Surfaced in the UI so the
   * privacy cost of a "free" tier is visible next to the quota. Kilo's gateway
   * reports this per model as `mayTrainOnYourPrompts` on its public catalog.
   */
  trainsOnPrompts?: boolean;
  /**
   * True only when the provider's own published terms document that exceeding
   * the free allowance is a hard stop (request refused / rate-limited) and NOT
   * automatic pay-as-you-go billing — e.g. an explicit "no credit card
   * required" claim on the provider's pricing page. This is a curated fact
   * about the upstream provider, not something derivable from `freeType` or
   * from any live API response, so it must be set by hand per entry with the
   * source of the claim in a comment. Leave unset (undefined) whenever this
   * isn't independently documented — `undefined` and `false` are both treated
   * as "not guaranteed" by `strictZeroCostFilter.ts`; never default to `true`
   * to grow the catalog. See STRICT_ZERO_COST in
   * `open-sse/services/autoCombo/strictZeroCostFilter.ts`.
   */
  hardStopGuaranteed?: boolean;
  /**
   * Set when the quota is real and recurring but only reachable after a
   * region-bound identity verification. Affects COUNTING only: the row
   * leaves the steady headline and lands in `gatedRecurringTokens`.
   * Routing, `isFreeModel` and STRICT_ZERO_COST read `freeType` alone.
   * Put the gate's source in a comment next to the entry.
   */
  eligibilityGate?: FreeEligibilityGate;
  /**
   * Gates in front of this row (see `FreeGate`). Affects COUNTING only. Put the source of
   * each gate in a comment next to the entry.
   */
  gates?: FreeGate[];
}

/** True when the row sits behind an identity or payment gate (legacy `eligibilityGate` included). */
export function isCountingGated(m: Pick<FreeModelBudget, "eligibilityGate" | "gates">): boolean {
  if (m.eligibilityGate !== undefined) return true;
  return (m.gates ?? []).some((g) => IDENTITY_OR_PAYMENT_GATES.has(g));
}

/** True when the row sits behind a social gate only (an identity/payment gate wins). */
export function isSocialGated(m: Pick<FreeModelBudget, "eligibilityGate" | "gates">): boolean {
  if (isCountingGated(m)) return false;
  return (m.gates ?? []).some((g) => SOCIAL_GATES.has(g));
}

export interface FreeModelTotals {
  /** Pool-deduped recurring tokens/month — the headline "steady" number. */
  steadyRecurringTokens: number;
  /**
   * Steady + recurring credit grants (e.g. monthly $-credit plans).
   * Eligibility-gated rows contribute nothing, exactly like the steady headline.
   */
  steadyWithRecurringCreditsTokens: number;
  /**
   * Steady + recurring + one-time signup credits — first-month only.
   * Eligibility-gated rows contribute nothing, exactly like the steady headline.
   */
  firstMonthRealisticTokens: number;
  /**
   * Extra recurring tokens/month unlocked by a one-time small deposit
   * (e.g. OpenRouter: 50→1000 req/day after a $10 lifetime top-up).
   * Reported separately so it never inflates the steady headline.
   */
  boostMonthlyTokens: number;
  /**
   * Providers that are permanently free but publish NO token cap
   * (rate/concurrency-limited). Real access, but un-quantifiable — listed,
   * never summed into the headline (avoids the rate-limit×24/7 inflation).
   * Eligibility-gated rows are excluded: the list reads as "open to anyone".
   */
  uncappedProviders: string[];
  /**
   * Pool-deduped tokens/month behind an eligibility gate (same rule as the
   * headline). Never summed into `steadyRecurringTokens`.
   */
  gatedRecurringTokens: number;
  /** Providers (sorted) contributing to `gatedRecurringTokens`. */
  gatedProviders: string[];
  /**
   * Pool-deduped tokens/month behind a social gate (phone, Telegram, Discord), plus the
   * socially-gated boosts whose pool is live. Never summed into `steadyRecurringTokens`.
   */
  socialGatedRecurringTokens: number;
  modelCount: number;
  poolCount: number;
  perModel: FreeModelBudget[];
  headline: string;
}

/**
 * Which figure a regime's allowance belongs to. Every regime lands in exactly
 * one bucket, so a regime added tomorrow cannot quietly contribute to nothing:
 * the compiler asks which figure it feeds.
 */
export type FreeRegimeTokenBucket =
  | "steady-monthly" // summed into the steady recurring headline
  | "recurring-credit" // credit that refills, reported next to the steady figure
  | "one-time-credit" // signup credit, first month only
  | "uncapped" // real access, no published cap — listed, never summed
  | "none"; // grants nothing, so it feeds no figure

interface FreeRegimeTraits {
  /** Can a request route here without paying? */
  grantsFreeAccess: boolean;
  /** Which totals figure this regime's allowance belongs to. */
  tokenBucket: FreeRegimeTokenBucket;
  /**
   * May a candidate of this regime skip the live allowance check when it is
   * reached through the synthetic no-auth path? True only where the catalogue
   * says no credential exists at all, so no request against it can be billed.
   *
   * This is NOT "this provider needs no API key". `providerCredentialRequirement.ts`
   * answers that other question and documents (`:1-16`) the cost of confusing the
   * two: blackbox, friendliai, iflytek and sparkdesk are catalogued `keyless` yet
   * answer 401 without a credential. Keep the two questions apart.
   */
  allowsNoAuthShortcut: boolean;
}

/**
 * What each free-tier regime engages, for every question the codebase asks of a
 * regime. Exhaustive by construction: adding a member to `FreeModelFreeType`
 * will not compile until it is classified here, on every axis.
 *
 * `discontinued` is the regime a provider uses to retire a free tier behind a
 * paid key — it grants no access, so the shared predicate (`isFreeModel`) reads
 * this table instead of treating every catalogued id as free.
 */
export const FREE_REGIME_TRAITS = {
  "recurring-daily": {
    grantsFreeAccess: true,
    tokenBucket: "steady-monthly",
    allowsNoAuthShortcut: false,
  },
  "recurring-monthly": {
    grantsFreeAccess: true,
    tokenBucket: "steady-monthly",
    allowsNoAuthShortcut: false,
  },
  "recurring-credit": {
    grantsFreeAccess: true,
    tokenBucket: "recurring-credit",
    allowsNoAuthShortcut: false,
  },
  "recurring-uncapped": {
    grantsFreeAccess: true,
    tokenBucket: "uncapped",
    allowsNoAuthShortcut: false,
  },
  "one-time-initial": {
    grantsFreeAccess: true,
    tokenBucket: "one-time-credit",
    allowsNoAuthShortcut: false,
  },
  keyless: {
    grantsFreeAccess: true,
    tokenBucket: "steady-monthly",
    allowsNoAuthShortcut: true,
  },
  discontinued: {
    grantsFreeAccess: false,
    tokenBucket: "none",
    allowsNoAuthShortcut: false,
  },
} satisfies Record<FreeModelFreeType, FreeRegimeTraits>;

export function grantsFreeAccess(freeType: FreeModelFreeType): boolean {
  return FREE_REGIME_TRAITS[freeType].grantsFreeAccess;
}

/** The regimes whose allowance belongs to `bucket`, derived from the table. */
export function freeTypesInBucket(bucket: FreeRegimeTokenBucket): Set<FreeModelFreeType> {
  return new Set(
    (Object.keys(FREE_REGIME_TRAITS) as FreeModelFreeType[]).filter(
      (freeType) => FREE_REGIME_TRAITS[freeType].tokenBucket === bucket
    )
  );
}

/** See `FreeRegimeTraits.allowsNoAuthShortcut` — routing question, not a credential one. */
export function allowsNoAuthShortcut(freeType: FreeModelFreeType): boolean {
  return FREE_REGIME_TRAITS[freeType].allowsNoAuthShortcut;
}

const STEADY_MONTHLY = freeTypesInBucket("steady-monthly");
const RECURRING_CREDIT = freeTypesInBucket("recurring-credit");
const ONE_TIME_CREDIT = freeTypesInBucket("one-time-credit");
const UNCAPPED = freeTypesInBucket("uncapped");

/**
 * Deposit-unlock boosts: a one-time small top-up that permanently raises a
 * provider's recurring free quota. Kept OUT of the steady headline and surfaced
 * as a separate "unlock more" figure. Keyed by the provider's recurring poolKey.
 */
export const FREE_TIER_BOOSTS: Record<
  string,
  {
    provider: string;
    boostMonthlyTokens: number;
    note: string;
    /** What unlocks the boost. Absent = "deposit" (summed in `boostMonthlyTokens`). */
    gate?: "deposit" | "telegram" | "discord" | "phone";
  }
> = {
  "openrouter-free": {
    provider: "openrouter",
    boostMonthlyTokens: 24_000_000,
    note: "A one-time $10 lifetime top-up raises the free pool from 50 to 1000 requests/day (~24M tokens/month).",
  },
  // evidence: public-page https://xkiro.com (2026-11-23) — "500K free-model tokens a day (1M after
  // Telegram verification)" ⇒ +500K/day × 30 = +15M. A social gate: never in the real figure.
  "xkiro-free": {
    provider: "xkiro",
    boostMonthlyTokens: 15_000_000,
    gate: "telegram",
    note: "Verifying the account on Telegram raises the free allowance from 500K to 1M tokens/day (+15M tokens/month; xkiro.com, 2026-11-23).",
  },
};

function fmt(n: number): string {
  return n >= 1e9 ? (n / 1e9).toFixed(2) + "B" : Math.round(n / 1e6) + "M";
}

// Sum a per-model numeric field, counting each shared pool once (max within the pool);
// poolKey null => the model is independent and counts on its own.
function dedupedSum(
  models: FreeModelBudget[],
  pick: (m: FreeModelBudget) => number,
  include: (m: FreeModelBudget) => boolean
): number {
  const poolMax = new Map<string, number>();
  let loose = 0;
  for (const m of models) {
    if (!include(m)) continue;
    const key = m.poolKey;
    if (key) poolMax.set(key, Math.max(poolMax.get(key) ?? 0, pick(m)));
    else loose += pick(m);
  }
  for (const v of poolMax.values()) loose += v;
  return loose;
}

export function computeFreeModelTotals(
  opts: {
    excludeTosAvoid?: boolean;
    /**
     * The catalog to aggregate. Defaults to the static release baseline, so
     * every existing caller is unchanged. Callers that resolve a fresher
     * catalog (e.g. the Radar overlay) pass their entries here; an entry with
     * `enabled: false` contributes nothing, exactly as if it were absent.
     */
    entries?: Array<FreeModelBudget & { enabled?: boolean }>;
  } = {}
): FreeModelTotals {
  const catalog: ReadonlyArray<FreeModelBudget & { enabled?: boolean }> =
    opts.entries ?? FREE_MODEL_BUDGETS;
  const models = catalog.filter(
    (m) => !(opts.excludeTosAvoid && m.tos === "avoid") && m.enabled !== false
  );

  // Identity/payment gates move a row to `gatedRecurringTokens`; social gates to
  // `socialGatedRecurringTokens`. Either way the row leaves every public figure.
  const isGated = (m: FreeModelBudget) => isCountingGated(m);
  const isOut = (m: FreeModelBudget) => isCountingGated(m) || isSocialGated(m);

  const steadyRecurringTokens = dedupedSum(
    models,
    (m) => m.monthlyTokens,
    (m) => STEADY_MONTHLY.has(m.freeType) && !isOut(m)
  );
  const gatedRecurringTokens = dedupedSum(
    models,
    (m) => m.monthlyTokens,
    (m) => STEADY_MONTHLY.has(m.freeType) && isGated(m)
  );
  const gatedProviders = [
    ...new Set(
      models.filter((m) => STEADY_MONTHLY.has(m.freeType) && isGated(m)).map((m) => m.provider)
    ),
  ].sort();
  const recurringCredits = dedupedSum(
    models,
    (m) => m.creditTokens,
    (m) => RECURRING_CREDIT.has(m.freeType) && !isOut(m)
  );
  const oneTimeCredits = dedupedSum(
    models,
    (m) => m.creditTokens,
    (m) => ONE_TIME_CREDIT.has(m.freeType) && !isOut(m)
  );

  const steadyWithRecurringCreditsTokens = steadyRecurringTokens + recurringCredits;
  const firstMonthRealisticTokens = steadyWithRecurringCreditsTokens + oneTimeCredits;

  // Live pools: a recurring pool anyone can open without a gate. Boosts attach to them.
  const livePools = new Set(
    models
      .filter((m) => STEADY_MONTHLY.has(m.freeType) && m.poolKey && !isOut(m))
      .map((m) => m.poolKey)
  );
  const poolCount = livePools.size;

  // Deposit-unlock boost: sum the deposit boosts whose pool still has a live recurring model
  // in the (optionally ToS-filtered) set. A boost behind a social gate is never a deposit boost.
  const liveBoosts = Object.entries(FREE_TIER_BOOSTS).filter(([pool]) => livePools.has(pool));
  const boostMonthlyTokens = liveBoosts
    .filter(([, b]) => (b.gate ?? "deposit") === "deposit")
    .reduce((s, [, b]) => s + b.boostMonthlyTokens, 0);

  const socialGatedRecurringTokens =
    dedupedSum(
      models,
      (m) => m.monthlyTokens,
      (m) => STEADY_MONTHLY.has(m.freeType) && isSocialGated(m)
    ) +
    liveBoosts
      .filter(([, b]) => (b.gate ?? "deposit") !== "deposit")
      .reduce((s, [, b]) => s + b.boostMonthlyTokens, 0);

  // Permanently-free-but-uncapped providers (real access, no published cap).
  // Gated rows are excluded: the list is read as "anyone can use this, forever".
  const uncappedProviders = [
    ...new Set(models.filter((m) => UNCAPPED.has(m.freeType) && !isOut(m)).map((m) => m.provider)),
  ].sort();

  return {
    steadyRecurringTokens,
    steadyWithRecurringCreditsTokens,
    firstMonthRealisticTokens,
    boostMonthlyTokens,
    uncappedProviders,
    gatedRecurringTokens,
    gatedProviders,
    socialGatedRecurringTokens,
    modelCount: models.length,
    poolCount,
    perModel: models.slice().sort((a, b) => b.monthlyTokens - a.monthlyTokens),
    headline: `~${fmt(steadyRecurringTokens)} documented free tokens/month (steady), up to ~${fmt(firstMonthRealisticTokens)} in your first month with signup credits`,
  };
}

/**
 * The public "real" free-token figure: the same catalog read without ToS-`avoid` rows. Every
 * public surface prints this, never `computeFreeModelTotals()` with defaults.
 */
export function computePublicFreeHeadline(
  opts: { entries?: Array<FreeModelBudget & { enabled?: boolean }> } = {}
): FreeModelTotals {
  return computeFreeModelTotals({ excludeTosAvoid: true, entries: opts.entries });
}

/**
 * The single public token formatter: whole millions below 1B (`~93M`), billions with one
 * decimal from there (`~11.4B`). Negative or non-finite input is a caller bug.
 */
export function formatTokenHeadline(tokens: number): string {
  if (!Number.isFinite(tokens) || tokens < 0) {
    throw new RangeError(
      `formatTokenHeadline: expected a non-negative finite number, got ${tokens}`
    );
  }
  const millions = Math.round(tokens / 1e6);
  if (millions < 1000) return `~${millions}M`;
  return `~${(tokens / 1e9).toFixed(1)}B`;
}

/** Unit a provider publishes its free quota in. */
export type FreeQuotaUnit = "tokens" | "requests" | "credits" | "neurons";

/**
 * Unit the provider publishes its free quota in. Every provider with a positive row in the
 * catalog or the retired ledger must be listed; there is no default. Only `tokens` is summed
 * by the row-sum reading; the other units count as zero there.
 */
export const FREE_QUOTA_UNIT: Record<string, FreeQuotaUnit> = {
  xkiro: "tokens",
  mistral: "tokens",
  nara: "tokens",
  groq: "tokens",
  navy: "tokens",
  "cloudflare-ai": "neurons",
  "api-airforce": "requests",
  sambanova: "requests",
  bluesminds: "requests",
  "arcee-ai": "requests",
  bazaarlink: "requests",
  cohere: "requests",
  openrouter: "requests",
  morph: "requests",
  modelscope: "requests",
  huggingchat: "credits",
  huggingface: "credits",
  kiro: "credits",
};

/** Per-pool override of `FREE_QUOTA_UNIT`, for a pool published in a different unit. */
export const FREE_QUOTA_UNIT_BY_POOL: Record<string, FreeQuotaUnit> = {};

/** Pool override first, then the provider; `undefined` when nobody recorded a unit. */
export function resolveFreeQuotaUnit(row: {
  provider: string;
  poolKey: string | null;
}): FreeQuotaUnit | undefined {
  if (row.poolKey && Object.hasOwn(FREE_QUOTA_UNIT_BY_POOL, row.poolKey)) {
    return FREE_QUOTA_UNIT_BY_POOL[row.poolKey];
  }
  return Object.hasOwn(FREE_QUOTA_UNIT, row.provider) ? FREE_QUOTA_UNIT[row.provider] : undefined;
}

/** The row-sum reading of the catalog (method `row-sum-v1`). */
export interface RowSumMirror {
  method: "row-sum-v1";
  liveTokens: number;
  retiredTokens: number;
  totalTokens: number;
  realSteadyTokens: number;
  retiredShare: number;
  byProvider: Array<{ provider: string; liveRows: number; retiredRows: number; tokens: number }>;
}

const isoDate = (d: Date): string => d.toISOString().slice(0, 10);

/** Row-sum counts a quota only in tokens, unless asked to count the other units too. */
function unitCounter(countNonTokenUnits: boolean) {
  return (r: { provider: string; poolKey: string | null }): boolean => {
    const unit = resolveFreeQuotaUnit(r);
    return unit === "tokens" || (countNonTokenUnits && unit !== undefined);
  };
}

/** A live row that grants recurring free access with a positive monthly quota. */
function isLiveRecurringQuotaRow(m: FreeModelBudget & { enabled?: boolean }): boolean {
  return (
    m.enabled !== false &&
    grantsFreeAccess(m.freeType) &&
    STEADY_MONTHLY.has(m.freeType) &&
    m.monthlyTokens > 0
  );
}

/** True for a retirement date inside the 12 calendar months that end at `asOf` (UTC). */
function retiredWindow(asOf: Date): (retiredAt: string) => boolean {
  const upper = isoDate(asOf);
  const floorDate = new Date(asOf.getTime());
  floorDate.setUTCFullYear(floorDate.getUTCFullYear() - 1);
  const lower = isoDate(floorDate);
  return (retiredAt) => retiredAt > lower && retiredAt <= upper;
}

/**
 * Sums the monthly quota of every live row that grants recurring free access, with or without
 * gates and whatever its ToS verdict, WITHOUT pool dedup — the way catalogs that add every row
 * up count. Rows published in requests, credits or neurons count 0 unless `countNonTokenUnits`;
 * signup credits, boosts and `enabled: false` rows never count. Retired ledger rows count their
 * last listed quota for 12 calendar months after `retiredAt`. Never feeds routing or the real
 * figure; it is printed next to the real figure, labelled.
 */
export function computeRowSumMirror(
  opts: {
    entries?: Array<FreeModelBudget & { enabled?: boolean }>;
    retired?: RetiredFreeRow[];
    asOf?: Date;
    countNonTokenUnits?: boolean;
  } = {}
): RowSumMirror {
  const entries: ReadonlyArray<FreeModelBudget & { enabled?: boolean }> =
    opts.entries ?? FREE_MODEL_BUDGETS;
  const retired = opts.retired ?? RETIRED_FREE_ROWS;
  const asOf = opts.asOf ?? new Date(`${FREE_CATALOG_CURATED_AT}T00:00:00Z`);
  const counts = unitCounter(opts.countNonTokenUnits === true);

  const byProvider = new Map<string, { liveRows: number; retiredRows: number; tokens: number }>();
  const bump = (provider: string, field: "liveRows" | "retiredRows", tokens: number) => {
    const cur = byProvider.get(provider) ?? { liveRows: 0, retiredRows: 0, tokens: 0 };
    cur[field] += 1;
    cur.tokens += tokens;
    byProvider.set(provider, cur);
  };

  let liveTokens = 0;
  for (const m of entries) {
    if (!isLiveRecurringQuotaRow(m) || !counts(m)) continue;
    liveTokens += m.monthlyTokens;
    bump(m.provider, "liveRows", m.monthlyTokens);
  }

  const inWindow = retiredWindow(asOf);
  let retiredTokens = 0;
  for (const r of retired) {
    if (!inWindow(r.retiredAt) || !(r.lastListedMonthlyTokens > 0) || !counts(r)) continue;
    retiredTokens += r.lastListedMonthlyTokens;
    bump(r.provider, "retiredRows", r.lastListedMonthlyTokens);
  }

  const totalTokens = liveTokens + retiredTokens;
  return {
    method: "row-sum-v1",
    liveTokens,
    retiredTokens,
    totalTokens,
    realSteadyTokens: computePublicFreeHeadline({ entries: opts.entries }).steadyRecurringTokens,
    retiredShare: totalTokens === 0 ? 0 : retiredTokens / totalTokens,
    byProvider: [...byProvider.entries()]
      .map(([provider, v]) => ({ provider, ...v }))
      .sort((a, b) => b.tokens - a.tokens || a.provider.localeCompare(b.provider)),
  };
}
