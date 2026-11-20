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

/**
 * A wait in whole minutes under an hour (never 0), otherwise in whole hours, both rounded up so
 * "about" never promises less time than the server said.
 */
export function describeDuration(seconds: number): { unit: "minutes" | "hours"; value: number } {
  if (seconds < 3600) return { unit: "minutes", value: Math.max(1, Math.ceil(seconds / 60)) };
  return { unit: "hours", value: Math.ceil(seconds / 3600) };
}
