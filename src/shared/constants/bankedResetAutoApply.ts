/**
 * bankedResetAutoApply.ts — settings shape, defaults and bounds for the opt-in
 * "auto-apply banked resets" feature (Codex reset credits, Claude banked grants and the
 * Claude weekly session reset).
 *
 * Server-free leaf with no imports: shared by the settings Zod schema, the policy
 * (src/lib/usage/bankedResetPolicy.ts), the background job and the dashboard card.
 * Strictly opt-in — `enabled: false` and `mode: "dry-run"` by default, so nothing is
 * ever redeemed on the operator's behalf until they turn it on.
 */

export const BANKED_RESET_MODES = ["dry-run", "last-resort", "eager"] as const;
export type BankedResetMode = (typeof BANKED_RESET_MODES)[number];

export const BANKED_RESET_CREDIT_TYPES = [
  "codexCredits",
  "claudeCredits",
  "claudeSessionReset",
] as const;
export type BankedResetCreditType = (typeof BANKED_RESET_CREDIT_TYPES)[number];

export const BANKED_RESET_ACCOUNT_SCOPES = ["all", "selected"] as const;
export type BankedResetAccountScope = (typeof BANKED_RESET_ACCOUNT_SCOPES)[number];

/** Inclusive upper bounds enforced by the settings schema (all values are non-negative ints). */
export const BANKED_RESET_LIMITS = Object.freeze({
  percentMax: 100,
  hoursMax: 168,
  minutesMax: 1440,
  capMax: 50,
  hourOfDayMax: 24,
});

export interface BankedResetSchedule {
  enabled: boolean;
  /** UTC hour the window opens (inclusive). */
  startHourUtc: number;
  /** UTC hour the window closes (exclusive). `start > end` crosses midnight. */
  endHourUtc: number;
}

export interface BankedResetAutoApplySettings {
  enabled: boolean;
  mode: BankedResetMode;
  creditTypes: Record<BankedResetCreditType, boolean>;
  accountScope: BankedResetAccountScope;
  /** connectionId → flag. "selected": only `true` is in scope; "all": all except `false`. */
  connections: Record<string, boolean>;
  /** Skip when the walled 5-hour window resets naturally within this many minutes. */
  sessionResetGuardMinutes: number;
  /** Skip when the walled weekly window resets naturally within this many hours. */
  weeklyResetGuardHours: number;
  /** Skip a 5-hour reset when the weekly window has less than this % left. */
  weeklyFloorPercent: number;
  /** A credit expiring within this many hours may be redeemed without a wall… */
  expiringCreditHours: number;
  /** …only when the account has used at least this % of its busiest known window. */
  expiringCreditMinUsedPercent: number;
  /** last-resort: another account "has headroom" with at least this % left in both windows. */
  poolHeadroomPercent: number;
  maxPerAccountPerDay: number;
  maxPerDay: number;
  /** Minimum minutes between any two redemptions across the pool. */
  minSpacingMinutes: number;
  schedule: BankedResetSchedule;
}

/** A fresh default object on every call, so callers can never mutate a shared default. */
export function createBankedResetAutoApplyDefaults(): BankedResetAutoApplySettings {
  return {
    enabled: false,
    mode: "dry-run",
    creditTypes: { codexCredits: true, claudeCredits: true, claudeSessionReset: false },
    accountScope: "all",
    connections: {},
    sessionResetGuardMinutes: 90,
    weeklyResetGuardHours: 12,
    weeklyFloorPercent: 10,
    expiringCreditHours: 24,
    expiringCreditMinUsedPercent: 50,
    poolHeadroomPercent: 10,
    maxPerAccountPerDay: 1,
    maxPerDay: 3,
    minSpacingMinutes: 30,
    schedule: { enabled: false, startHourUtc: 0, endHourUtc: 24 },
  };
}
