/**
 * The stored statuses that park a connection until its credentials or settings change.
 *
 * This module deliberately imports nothing: it is read by the persistence layer, the
 * dispatch gate, the optional-key path and the bulk cooldown cleaner, and one of those
 * readers is the module that would otherwise close a cycle with it.
 */
export const TERMINAL_TEST_STATUSES = new Set([
  "banned",
  "expired",
  "deactivated",
  "credits_exhausted",
]);

/** A connection parked under one of these verdicts must not be un-parked by a probe failure. */
export function isParkedTestStatus(value: unknown): boolean {
  return typeof value === "string" && TERMINAL_TEST_STATUSES.has(value.trim().toLowerCase());
}

/**
 * Parked statuses for callers that treat quota exhaustion as recoverable.
 *
 * A provider that ran out of quota is refreshed on a timer by these callers, so it must not be
 * treated as parked; a ban, an expired credential or a deactivated account never recovers that way.
 */
export const PARKED_EXCEPT_QUOTA_EXHAUSTION = new Set(["banned", "expired", "deactivated"]);
