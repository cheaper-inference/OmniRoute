/**
 * selfViewAccounts.ts — the `accounts[]` part of the self-service quota view.
 *
 * One neutral entry per connection of the pool, in the pool's own order: "Account 1",
 * "Account 2", … No connection id, account e-mail, account name or provider account identifier
 * is copied into the result; an entry reason outside the fixed set is replaced by
 * "not_available".
 *
 * Each `percent` plan dimension (limit above Number.EPSILON) becomes one account dimension with
 * the plan limit of ONE account. The key's own share of it is not attributed yet, so `yourShare`
 * is always `unavailable` / `percent_attribution_unavailable` with null numbers.
 *
 * Account-level data (the `account` bar and `modelWindows`) comes only from the cached
 * provider-limits entries the caller passes in (`entries`); `entries === null` means the key may
 * not see account data, and those fields are omitted. They are also omitted for a pool
 * connection outside `ctx.accountConnectionIds` (one the key may not use); its entry stays.
 * A window the cache does not report is `unavailable` / `window_not_reported`, never 0. A stale cached reading, or one whose `resetAt`
 * is already before `now` (the window reset since it was read), is `stale` with its numbers kept.
 *
 * Model windows are listed only for providers in PLAN_WINDOW_CACHE_KEYS, whose other cache keys
 * are model or surface names. They come from the entry's `quotas` and `modelQuotas` (where Claude
 * keeps its per-model weekly windows), minus the plan windows. Other providers can key their cache by operator-chosen names or
 * upstream key/limit ids, so none of their labels is copied: their `windows` is empty.
 */

import type {
  SelfQuotaAccount,
  SelfQuotaAccountDimension,
  SelfQuotaBar,
  SelfQuotaStatus,
} from "@/shared/schemas/selfQuota";
import type { QuotaDimension } from "./dimensions";
import type {
  AccountQuotaEntryLike,
  CachedQuotaWindow,
  SelfViewPoolContext,
} from "./selfViewTypes";

type CachedWindows = Record<string, CachedQuotaWindow>;
type PercentDimension = QuotaDimension & { unit: "percent" };
type ModelWindows = NonNullable<SelfQuotaAccount["modelWindows"]>;

const NOT_AVAILABLE = "not_available";
const WINDOW_NOT_REPORTED = "window_not_reported";
const PERCENT_ATTRIBUTION_UNAVAILABLE = "percent_attribution_unavailable";

/** Reasons resolveAccountQuotaEntries emits; anything else is reported as not_available. */
const KNOWN_ENTRY_REASONS: ReadonlySet<string> = new Set([
  "connection_lookup_failed",
  "not_supported",
  "fetch_failed",
  NOT_AVAILABLE,
]);

/** Provider-limits cache key of each plan window, per provider. */
const PLAN_WINDOW_CACHE_KEYS: Readonly<Record<string, Partial<Record<string, string>>>> = {
  claude: { "5h": "session (5h)", weekly: "weekly (7d)" },
  anthropic: { "5h": "session (5h)", weekly: "weekly (7d)" },
  codex: { "5h": "session", weekly: "weekly" },
};

/** The entry's state: a fixed reason when it carries no readings, else ok/stale. */
type EntryState =
  | { status: "unavailable"; reason: string }
  | { status: SelfQuotaStatus; quotas: CachedWindows; modelQuotas: CachedWindows };

function entryState(entry: AccountQuotaEntryLike | undefined): EntryState {
  if (!entry) return { status: "unavailable", reason: NOT_AVAILABLE };
  if (entry.available === false) {
    const reason =
      entry.reason && KNOWN_ENTRY_REASONS.has(entry.reason) ? entry.reason : NOT_AVAILABLE;
    return { status: "unavailable", reason };
  }
  return {
    status: entry.stale ? "stale" : "ok",
    quotas: entry.quotas ?? {},
    modelQuotas: entry.modelQuotas ?? {},
  };
}

function cachedWindow(
  provider: string,
  window: string,
  quotas: CachedWindows
): CachedQuotaWindow | null {
  const key = PLAN_WINDOW_CACHE_KEYS[provider]?.[window];
  if (!key || !Object.prototype.hasOwnProperty.call(quotas, key)) return null;
  const reading = quotas[key];
  return reading && Number.isFinite(reading.usedPercentage) ? reading : null;
}

/** The reading's reset time when it parses as a date, else null. */
function readingResetAt(reading: CachedQuotaWindow): string | null {
  const { resetAt } = reading;
  return typeof resetAt === "string" && Number.isFinite(Date.parse(resetAt)) ? resetAt : null;
}

/** "stale" when the reading's window already reset before `now`; an unparseable time is ignored. */
function readingStatus(
  status: SelfQuotaStatus,
  resetAt: string | null | undefined,
  now: number
): SelfQuotaStatus {
  if (status !== "ok" || !resetAt) return status;
  const resetMs = Date.parse(resetAt);
  return Number.isFinite(resetMs) && resetMs < now ? "stale" : status;
}

function accountBar(
  provider: string,
  dim: PercentDimension,
  state: EntryState,
  now: number
): SelfQuotaBar {
  if (!("quotas" in state)) return { used: null, status: "unavailable", reason: state.reason };
  const reading = cachedWindow(provider, dim.window, state.quotas);
  if (!reading) return { used: null, status: "unavailable", reason: WINDOW_NOT_REPORTED };
  return {
    used: (reading.usedPercentage / 100) * dim.limit,
    status: readingStatus(state.status, reading.resetAt, now),
    resetAt: readingResetAt(reading),
  };
}

function modelWindowsOf(provider: string, state: EntryState, now: number): ModelWindows {
  if (!("quotas" in state)) return { status: "unavailable", reason: state.reason, windows: [] };
  const mapping = Object.prototype.hasOwnProperty.call(PLAN_WINDOW_CACHE_KEYS, provider)
    ? PLAN_WINDOW_CACHE_KEYS[provider]
    : null;
  if (!mapping) return { status: state.status, windows: [] };
  const planKeys = new Set(Object.values(mapping));
  const windows: ModelWindows["windows"] = [];
  let status = state.status;
  const readings = [...Object.entries(state.quotas), ...Object.entries(state.modelQuotas)];
  for (const [label, reading] of readings) {
    if (planKeys.has(label) || !reading || !Number.isFinite(reading.usedPercentage)) continue;
    windows.push({ label, usedPercent: reading.usedPercentage, resetAt: readingResetAt(reading) });
    status = readingStatus(status, reading.resetAt, now);
  }
  return { status, windows };
}

function accountDimension(
  ctx: SelfViewPoolContext,
  dim: PercentDimension,
  state: EntryState | null,
  now: number
): SelfQuotaAccountDimension {
  const dimension: SelfQuotaAccountDimension = {
    unit: "percent",
    window: dim.window,
    limit: dim.limit,
    yourShare: {
      fairShare: (ctx.effectiveWeight / 100) * dim.limit,
      consumed: null,
      remaining: null,
      status: "unavailable",
      reason: PERCENT_ATTRIBUTION_UNAVAILABLE,
    },
  };
  if (state) dimension.account = accountBar(ctx.provider, dim, state, now);
  return dimension;
}

function isPercentDimension(dim: QuotaDimension): dim is PercentDimension {
  return dim.unit === "percent" && dim.limit > Number.EPSILON;
}

/** entries = null when account data is hidden for this key; `now` is the view's clock (ms). */
export function buildSelfViewAccounts(
  ctx: SelfViewPoolContext,
  entries: AccountQuotaEntryLike[] | null,
  now: number
): SelfQuotaAccount[] {
  const visibleConnections = new Set(ctx.accountConnectionIds);
  const byConnection = new Map<string, AccountQuotaEntryLike>();
  for (const entry of entries ?? []) {
    if (visibleConnections.has(entry.connectionId) && !byConnection.has(entry.connectionId)) {
      byConnection.set(entry.connectionId, entry);
    }
  }
  const percentDimensions = (ctx.plan.dimensions ?? []).filter(isPercentDimension);

  return ctx.connectionIds.map((connectionId, index) => {
    const visible = entries !== null && visibleConnections.has(connectionId);
    const state = visible ? entryState(byConnection.get(connectionId)) : null;
    const account: SelfQuotaAccount = {
      slot: index + 1,
      label: `Account ${index + 1}`,
      dimensions: percentDimensions.map((dim) => accountDimension(ctx, dim, state, now)),
    };
    if (state) account.modelWindows = modelWindowsOf(ctx.provider, state, now);
    return account;
  });
}
