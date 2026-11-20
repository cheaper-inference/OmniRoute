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
 * not see account data, and those fields are omitted. A window the cache does not report is
 * `unavailable` / `window_not_reported`, never 0; a stale cached reading is `stale`.
 */

import type {
  SelfQuotaAccount,
  SelfQuotaAccountDimension,
  SelfQuotaBar,
  SelfQuotaStatus,
} from "@/shared/schemas/selfQuota";
import type { QuotaDimension } from "./dimensions";
import type { AccountQuotaEntryLike, SelfViewPoolContext } from "./selfViewTypes";

type CachedWindow = NonNullable<AccountQuotaEntryLike["quotas"]>[string];
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
  | { status: SelfQuotaStatus; quotas: NonNullable<AccountQuotaEntryLike["quotas"]> };

function entryState(entry: AccountQuotaEntryLike | undefined): EntryState {
  if (!entry) return { status: "unavailable", reason: NOT_AVAILABLE };
  if (entry.available === false) {
    const reason =
      entry.reason && KNOWN_ENTRY_REASONS.has(entry.reason) ? entry.reason : NOT_AVAILABLE;
    return { status: "unavailable", reason };
  }
  return { status: entry.stale ? "stale" : "ok", quotas: entry.quotas ?? {} };
}

function cachedWindow(
  provider: string,
  window: string,
  quotas: NonNullable<AccountQuotaEntryLike["quotas"]>
): CachedWindow | null {
  const key = PLAN_WINDOW_CACHE_KEYS[provider]?.[window];
  if (!key || !Object.prototype.hasOwnProperty.call(quotas, key)) return null;
  const reading = quotas[key];
  return reading && Number.isFinite(reading.usedPercentage) ? reading : null;
}

function accountBar(provider: string, dim: PercentDimension, state: EntryState): SelfQuotaBar {
  if (!("quotas" in state)) return { used: null, status: "unavailable", reason: state.reason };
  const reading = cachedWindow(provider, dim.window, state.quotas);
  if (!reading) return { used: null, status: "unavailable", reason: WINDOW_NOT_REPORTED };
  return {
    used: (reading.usedPercentage / 100) * dim.limit,
    status: state.status,
    resetAt: reading.resetAt ?? null,
  };
}

function modelWindowsOf(provider: string, state: EntryState): ModelWindows {
  if (!("quotas" in state)) return { status: "unavailable", reason: state.reason, windows: [] };
  const planKeys = new Set(Object.values(PLAN_WINDOW_CACHE_KEYS[provider] ?? {}));
  const windows: ModelWindows["windows"] = [];
  for (const [label, reading] of Object.entries(state.quotas)) {
    if (planKeys.has(label) || !reading || !Number.isFinite(reading.usedPercentage)) continue;
    windows.push({ label, usedPercent: reading.usedPercentage, resetAt: reading.resetAt ?? null });
  }
  return { status: state.status, windows };
}

function accountDimension(
  ctx: SelfViewPoolContext,
  dim: PercentDimension,
  state: EntryState | null
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
  if (state) dimension.account = accountBar(ctx.provider, dim, state);
  return dimension;
}

function isPercentDimension(dim: QuotaDimension): dim is PercentDimension {
  return dim.unit === "percent" && dim.limit > Number.EPSILON;
}

/** entries = null when account data is hidden for this key. */
export function buildSelfViewAccounts(
  ctx: SelfViewPoolContext,
  entries: AccountQuotaEntryLike[] | null
): SelfQuotaAccount[] {
  const poolConnections = new Set(ctx.connectionIds);
  const byConnection = new Map<string, AccountQuotaEntryLike>();
  for (const entry of entries ?? []) {
    if (poolConnections.has(entry.connectionId) && !byConnection.has(entry.connectionId)) {
      byConnection.set(entry.connectionId, entry);
    }
  }
  const percentDimensions = (ctx.plan.dimensions ?? []).filter(isPercentDimension);

  return ctx.connectionIds.map((connectionId, index) => {
    const state = entries === null ? null : entryState(byConnection.get(connectionId));
    const account: SelfQuotaAccount = {
      slot: index + 1,
      label: `Account ${index + 1}`,
      dimensions: percentDimensions.map((dim) => accountDimension(ctx, dim, state)),
    };
    if (state) account.modelWindows = modelWindowsOf(ctx.provider, state);
    return account;
  });
}
