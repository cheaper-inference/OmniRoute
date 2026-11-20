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
  | { kind: "unreadable" }
  | { kind: "soon" }
  | { kind: "hours"; hours: number }
  | { kind: "days"; days: number; tone: "success" | "warning" | "error" };

/**
 * Time left from `nowIso` (the response's generatedAt), never from the browser clock. Only a null
 * expiry means the key does not expire; an unreadable one is `unreadable`.
 */
export function describeExpiry(expiresAt: string | null, nowIso: string): ExpiryView {
  if (expiresAt === null) return { kind: "none" };
  const expires = Date.parse(expiresAt);
  const now = Date.parse(nowIso);
  // A value that is not a date says nothing about the expiry: no badge rather than a wrong one.
  if (Number.isNaN(expires) || Number.isNaN(now)) return { kind: "unreadable" };

  const left = expires - now;
  if (left < HOUR_MS) return { kind: "soon" };
  if (left < DAY_MS) return { kind: "hours", hours: Math.floor(left / HOUR_MS) };

  const days = Math.floor(left / DAY_MS);
  const tone = days <= 3 ? "error" : days <= 14 ? "warning" : "success";
  return { kind: "days", days, tone };
}
