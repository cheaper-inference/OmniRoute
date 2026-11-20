/**
 * Pure time helpers of the self-service quota page. The reference clock is always the answer's
 * `generatedAt`, passed in by the caller: nothing here reads the browser clock.
 */

import type { DateTimeFormatOptions } from "next-intl";

const HOUR_MS = 60 * 60_000;
const DAY_MS = 24 * HOUR_MS;

/** Date and time of an instant on this page (expiry, reset times), for `useFormatter().dateTime`. */
export const DATE_TIME_FORMAT: DateTimeFormatOptions = {
  dateStyle: "medium",
  timeStyle: "short",
};

export type ExpiryView =
  | { kind: "none" }
  | { kind: "soon" }
  | { kind: "hours"; hours: number }
  | { kind: "days"; days: number; tone: "success" | "warning" | "error" };

/** Time left from `nowIso` (the response's generatedAt), never from the browser clock. */
export function describeExpiry(expiresAt: string | null, nowIso: string): ExpiryView {
  const expires = expiresAt === null ? Number.NaN : Date.parse(expiresAt);
  const now = Date.parse(nowIso);
  if (Number.isNaN(expires) || Number.isNaN(now)) return { kind: "none" };

  const left = expires - now;
  if (left < HOUR_MS) return { kind: "soon" };
  if (left < DAY_MS) return { kind: "hours", hours: Math.floor(left / HOUR_MS) };

  const days = Math.floor(left / DAY_MS);
  const tone = days <= 3 ? "error" : days <= 14 ? "warning" : "success";
  return { kind: "days", days, tone };
}
