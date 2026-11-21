/**
 * Pure text decisions of the self-service quota page: which `quotaSelf` catalog key a reason,
 * window or policy reads as, and how an amount is written. Nothing here builds a sentence by
 * concatenation; every word comes from the catalog through the `t` the caller passes.
 */

import type { NumberFormatOptions } from "next-intl";

import type { Policy, QuotaUnit, QuotaWindow } from "@/lib/quota/dimensions";
import type { SelfQuotaAccount, SelfQuotaShare } from "@/shared/schemas/selfQuota";

type Translate = (key: string, values?: Record<string, string | number>) => string;
export type FormatNumber = (value: number, options?: NumberFormatOptions) => string;

const REASON_KEYS: Record<string, string> = {
  store_unavailable: "reasonStoreUnavailable",
  percent_attribution_unavailable: "reasonPercentAttributionUnavailable",
  window_not_reported: "reasonWindowNotReported",
  connection_lookup_failed: "reasonConnectionLookupFailed",
  not_supported: "reasonNotSupported",
  fetch_failed: "reasonFetchFailed",
  not_available: "reasonNotAvailable",
  percent_window_ended: "reasonPercentWindowEnded",
  account_not_used_by_key: "reasonAccountNotUsedByKey",
};

const WINDOW_KEYS: Record<QuotaWindow, string> = {
  "5h": "window5h",
  hourly: "windowHourly",
  daily: "windowDaily",
  weekly: "windowWeekly",
  monthly: "windowMonthly",
};

const SHARE_OVER_KEYS: Record<Policy, string> = {
  hard: "shareOverHard",
  soft: "shareOverSoft",
  burst: "shareOverBurst",
};

const POLICY_KEYS: Record<Policy, string> = {
  hard: "policyHard",
  soft: "policySoft",
  burst: "policyBurst",
};

/** The nine documented reasons map to their own sentence; anything else to `reasonUnknown`. */
export function reasonKey(reason: string | undefined): string {
  return (
    (reason !== undefined && Object.hasOwn(REASON_KEYS, reason) && REASON_KEYS[reason]) ||
    "reasonUnknown"
  );
}

export function windowKey(window: QuotaWindow): string {
  return WINDOW_KEYS[window];
}

export function shareOverKey(policy: Policy): string {
  return SHARE_OVER_KEYS[policy];
}

export function policyKey(policy: Policy): string {
  return POLICY_KEYS[policy];
}

/** An amount in its unit: a counted noun, a dollar figure, or a percentage. */
export function amountText(
  unit: QuotaUnit,
  value: number,
  t: Translate,
  number: FormatNumber
): string {
  switch (unit) {
    case "requests":
      return t("amountRequests", { count: Math.round(value) });
    case "tokens":
      return t("amountTokens", { count: Math.round(value) });
    case "usd":
      return number(value, { style: "currency", currency: "USD", maximumFractionDigits: 2 });
    case "percent":
      return t("amountPercent", { value: Math.round(value * 10) / 10 });
  }
}

/** A used amount next to its limit: dollars as currency, any other unit as a whole number. */
export function usedText(
  unit: QuotaUnit,
  used: number,
  t: Translate,
  number: FormatNumber
): string {
  return unit === "usd"
    ? amountText("usd", used, t, number)
    : number(used, { maximumFractionDigits: 0 });
}

/** The visible value of a bar: a whole percentage through the catalog, never a concatenated `%`. */
export function percentLabel(percent: number, t: Translate): string {
  return t("amountPercent", { value: Math.round(percent) });
}

/**
 * The line under the key's own share: no reserved share, share used up (worded by policy), or
 * what is left. A share that was not read has no footnote: its reason sentence says why.
 */
export function shareFootnote(
  share: SelfQuotaShare,
  unit: QuotaUnit,
  policy: Policy,
  t: Translate,
  number: FormatNumber
): string | undefined {
  if (share.fairShare <= 0) return t("shareNone");
  if (share.status === "unavailable" || share.consumed === null) return undefined;
  if (share.consumed >= share.fairShare) return t(shareOverKey(policy));
  const left = share.remaining ?? share.fairShare - share.consumed;
  return t("shareLeft", { amount: amountText(unit, left, t, number) });
}

/**
 * True when a reading has a scale a bar can honestly show: a finite limit above 0 and a finite,
 * non-negative used value. Anything else is drawn as "not available", never as zero.
 */
export function isDrawableReading(limit: number, used: number | null): used is number {
  return Number.isFinite(limit) && limit > 0 && used !== null && Number.isFinite(used) && used >= 0;
}

/**
 * Segment widths in percent of the track, or null when the bar cannot honestly be drawn: fewer
 * than three slices, a limit that is not a finite number above 0, or a slice that is not a finite
 * number of 0 or more. Slices that add up past the limit share the whole track instead.
 */
export function memberBarWidths(
  members: ReadonlyArray<{ consumed: number }>,
  limit: number
): number[] | null {
  if (members.length < 3) return null;
  if (!Number.isFinite(limit) || limit <= 0) return null;
  if (!members.every(({ consumed }) => Number.isFinite(consumed) && consumed >= 0)) return null;
  const scale = Math.max(
    limit,
    members.reduce((sum, { consumed }) => sum + consumed, 0)
  );
  // Multiplying first keeps exact values exact: 300 of 1000 gives 30, not 30.000000000000004.
  return members.map(({ consumed }) => (consumed * 100) / scale);
}

/** True when some window of the account carries the account-wide reading, whatever its state. */
export function hasAccountReading(account: SelfQuotaAccount): boolean {
  return account.dimensions.some((dimension) => dimension.account !== undefined);
}

/** True when some account-wide reading of the account is drawn as a bar with a number. */
export function hasDrawnAccountReading(account: SelfQuotaAccount): boolean {
  return account.dimensions.some(
    ({ account: reading, limit }) =>
      reading !== undefined &&
      reading.status !== "unavailable" &&
      isDrawableReading(limit, reading.used)
  );
}

/**
 * True when the account row would have nothing to show: no window, and model windows that are
 * absent or readable but empty (an unavailable block still prints its reason).
 */
export function accountRowIsEmpty(account: SelfQuotaAccount): boolean {
  const modelWindows = account.modelWindows;
  const modelWindowsEmpty =
    !modelWindows || (modelWindows.status !== "unavailable" && modelWindows.windows.length === 0);
  return account.dimensions.length === 0 && modelWindowsEmpty;
}

/**
 * True when the account's model windows are unavailable for the same reason an account bar of
 * the same row already prints: the row then skips the model-window block instead of repeating it.
 */
export function modelWindowsRepeatReason(account: SelfQuotaAccount): boolean {
  const modelWindows = account.modelWindows;
  if (modelWindows?.status !== "unavailable") return false;
  return account.dimensions.some(
    (dimension) =>
      dimension.account?.status === "unavailable" &&
      dimension.account.reason === modelWindows.reason
  );
}
