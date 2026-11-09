/**
 * bankedResetPolicy.ts — the pure decision behind "auto-apply banked resets".
 *
 * `decideBankedReset()` answers, for one account and one credit type, whether a banked
 * reset should be redeemed now, only recorded (dry-run), or skipped — and why. No I/O:
 * settings, time, the account's quota windows, the pool and the redemption history are
 * all passed in, so the background job and the Claude request-path gate share one rule set.
 *
 * Checks run in a fixed order and the first failing one is the `reason`:
 *   1. feature off / credit type off / account out of scope
 *   2. outside the UTC schedule
 *   3. caps: per account, per pool, minimum spacing
 *   4. trigger: a walled window, or a credit about to expire on a busy account
 *   5. natural-reset guard: the walled window resets soon on its own
 *   6. weekly floor: a 5-hour reset is pointless with the weekly window nearly spent
 *   7. last-resort: another account still has headroom (expiring credits bypass this)
 *   8. dry-run records, otherwise redeem
 *
 * Unknown data never unlocks a redemption a known value would block (fail-closed); the
 * one exception is rule 7, where a pool account with unknown windows counts as having
 * NO headroom.
 */

import { bankedResetAutoApplySchema } from "@/shared/validation/settingsSchemas";
import {
  createBankedResetAutoApplyDefaults,
  type BankedResetAutoApplySettings,
  type BankedResetCreditType,
} from "@/shared/constants/bankedResetAutoApply";

const MINUTE_MS = 60_000;
const HOUR_MS = 60 * MINUTE_MS;

export type BankedResetAction = "redeem" | "dry-run" | "skip";
export type BankedResetWalledWindow = "session" | "weekly";
export type BankedResetTrigger = "walled-session" | "walled-weekly" | "expiring-credit";

export interface BankedResetWindowState {
  usedPercentage: number | null;
  resetAt: string | null;
}

export interface BankedResetAccountInput {
  id: string;
  provider: string;
  creditType: BankedResetCreditType;
  /** Which window is walled right now, if any (weekly wins when both are). */
  walled: BankedResetWalledWindow | null;
  session?: BankedResetWindowState | null;
  weekly?: BankedResetWindowState | null;
  /** Soonest expiry among the account's redeemable credits, when known. */
  creditExpiresAt?: string | null;
}

/** Another in-scope, active account of the same provider. */
export interface BankedResetPoolMember {
  id: string;
  sessionRemainingPercent: number | null;
  weeklyRemainingPercent: number | null;
}

/** Redemptions counted from the audit log over the last 24 h. */
export interface BankedResetHistory {
  accountRedemptions24h: number;
  poolRedemptions24h: number;
  lastRedemptionAt: string | null;
}

export interface BankedResetPolicyInput {
  settings: BankedResetAutoApplySettings;
  now: number;
  account: BankedResetAccountInput;
  pool: BankedResetPoolMember[];
  history: BankedResetHistory;
}

export interface BankedResetDecision {
  action: BankedResetAction;
  reason: string;
  /** Set on `redeem` / `dry-run`: what made the account a candidate. */
  trigger?: BankedResetTrigger;
}

function definedOnly<T extends object>(value: T | undefined): Partial<T> {
  if (!value) return {};
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => entry !== undefined)
  ) as Partial<T>;
}

/**
 * Stored settings → complete settings. Missing fields take their default; a stored value
 * that fails the schema as a whole falls back to the defaults (feature off), so a corrupt
 * row can never switch redemptions on.
 */
export function mergeBankedResetAutoApplySettings(raw: unknown): BankedResetAutoApplySettings {
  const defaults = createBankedResetAutoApplyDefaults();
  const parsed = bankedResetAutoApplySchema.safeParse(raw ?? {});
  if (!parsed.success) return defaults;
  const value = parsed.data;
  return {
    ...defaults,
    ...definedOnly(value),
    creditTypes: { ...defaults.creditTypes, ...definedOnly(value.creditTypes) },
    connections: { ...value.connections },
    schedule: { ...defaults.schedule, ...definedOnly(value.schedule) },
  };
}

export function isBankedResetAccountInScope(
  settings: BankedResetAutoApplySettings,
  connectionId: string
): boolean {
  const flag = settings.connections[connectionId];
  return settings.accountScope === "selected" ? flag === true : flag !== false;
}

function parseMs(value: string | null | undefined): number | null {
  if (!value) return null;
  const ms = Date.parse(value);
  return Number.isFinite(ms) ? ms : null;
}

function knownPercent(value: number | null | undefined): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function isWithinSchedule(settings: BankedResetAutoApplySettings, now: number): boolean {
  const { enabled, startHourUtc: start, endHourUtc: end } = settings.schedule;
  if (!enabled) return true;
  const hour = new Date(now).getUTCHours();
  // [start, end) in UTC; start > end is a window that crosses midnight.
  return start <= end ? hour >= start && hour < end : hour >= start || hour < end;
}

function checkScope(
  settings: BankedResetAutoApplySettings,
  account: BankedResetAccountInput
): string | null {
  if (!settings.enabled) return "disabled";
  if (!settings.creditTypes[account.creditType]) return "credit-type-off";
  if (!isBankedResetAccountInScope(settings, account.id)) return "out-of-scope";
  return null;
}

function checkCaps(
  settings: BankedResetAutoApplySettings,
  history: BankedResetHistory,
  now: number
): string | null {
  if (history.accountRedemptions24h >= settings.maxPerAccountPerDay) return "account-daily-cap";
  if (history.poolRedemptions24h >= settings.maxPerDay) return "pool-daily-cap";
  const lastMs = parseMs(history.lastRedemptionAt);
  if (lastMs !== null && now - lastMs < settings.minSpacingMinutes * MINUTE_MS) {
    return "min-spacing";
  }
  return null;
}

function resolveTrigger(
  settings: BankedResetAutoApplySettings,
  account: BankedResetAccountInput,
  now: number
): BankedResetTrigger | null {
  if (account.walled === "session") return "walled-session";
  if (account.walled === "weekly") return "walled-weekly";
  const expiresMs = parseMs(account.creditExpiresAt);
  if (expiresMs === null || expiresMs <= now) return null;
  if (expiresMs - now > settings.expiringCreditHours * HOUR_MS) return null;
  const used = [account.session?.usedPercentage, account.weekly?.usedPercentage]
    .map(knownPercent)
    .filter((value): value is number => value !== null);
  if (used.length === 0) return null;
  return Math.max(...used) >= settings.expiringCreditMinUsedPercent ? "expiring-credit" : null;
}

function checkNaturalReset(
  settings: BankedResetAutoApplySettings,
  account: BankedResetAccountInput,
  now: number
): string | null {
  if (account.walled === "session") {
    const resetMs = parseMs(account.session?.resetAt);
    if (resetMs === null) return "session-reset-unknown";
    if (resetMs - now <= settings.sessionResetGuardMinutes * MINUTE_MS) {
      return "session-resets-soon";
    }
  }
  if (account.walled === "weekly") {
    const resetMs = parseMs(account.weekly?.resetAt);
    if (resetMs === null) return "weekly-reset-unknown";
    if (resetMs - now <= settings.weeklyResetGuardHours * HOUR_MS) return "weekly-resets-soon";
  }
  return null;
}

function checkWeeklyFloor(
  settings: BankedResetAutoApplySettings,
  account: BankedResetAccountInput
): string | null {
  if (account.walled !== "session") return null;
  const used = knownPercent(account.weekly?.usedPercentage);
  if (used === null) return "weekly-unknown";
  return 100 - used < settings.weeklyFloorPercent ? "weekly-floor" : null;
}

function poolHasHeadroom(
  settings: BankedResetAutoApplySettings,
  account: BankedResetAccountInput,
  pool: BankedResetPoolMember[]
): boolean {
  const floor = settings.poolHeadroomPercent;
  return pool.some((member) => {
    if (member.id === account.id) return false;
    const session = knownPercent(member.sessionRemainingPercent);
    const weekly = knownPercent(member.weeklyRemainingPercent);
    return session !== null && weekly !== null && session >= floor && weekly >= floor;
  });
}

export function decideBankedReset(input: BankedResetPolicyInput): BankedResetDecision {
  const { settings, account, now } = input;
  const skip = (reason: string): BankedResetDecision => ({ action: "skip", reason });

  const scope = checkScope(settings, account);
  if (scope) return skip(scope);
  if (!isWithinSchedule(settings, now)) return skip("outside-schedule");
  const cap = checkCaps(settings, input.history, now);
  if (cap) return skip(cap);

  const trigger = resolveTrigger(settings, account, now);
  if (!trigger) return skip("not-walled");

  const guard = checkNaturalReset(settings, account, now) ?? checkWeeklyFloor(settings, account);
  if (guard) return skip(guard);

  if (
    settings.mode === "last-resort" &&
    trigger !== "expiring-credit" &&
    poolHasHeadroom(settings, account, input.pool)
  ) {
    return skip("pool-has-headroom");
  }

  return { action: settings.mode === "dry-run" ? "dry-run" : "redeem", reason: trigger, trigger };
}
