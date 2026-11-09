/**
 * Pure client-side helpers for the "auto-apply banked resets" settings card.
 *
 * Mirrors the server merge (mergeBankedResetAutoApplySettings) without importing it, because
 * that module pulls in the Zod schema. Server-free: only the shared constants leaf is used.
 */

import {
  BANKED_RESET_ACCOUNT_SCOPES,
  BANKED_RESET_CREDIT_TYPES,
  BANKED_RESET_LIMITS,
  BANKED_RESET_MODES,
  createBankedResetAutoApplyDefaults,
  type BankedResetAutoApplySettings,
} from "@/shared/constants/bankedResetAutoApply";

export type BankedResetNumberKey =
  | "sessionResetGuardMinutes"
  | "weeklyResetGuardHours"
  | "weeklyFloorPercent"
  | "expiringCreditHours"
  | "expiringCreditMinUsedPercent"
  | "poolHeadroomPercent"
  | "maxPerAccountPerDay"
  | "maxPerDay"
  | "minSpacingMinutes";

export const BANKED_RESET_NUMBER_MAX: Record<BankedResetNumberKey, number> = {
  sessionResetGuardMinutes: BANKED_RESET_LIMITS.minutesMax,
  weeklyResetGuardHours: BANKED_RESET_LIMITS.hoursMax,
  weeklyFloorPercent: BANKED_RESET_LIMITS.percentMax,
  expiringCreditHours: BANKED_RESET_LIMITS.hoursMax,
  expiringCreditMinUsedPercent: BANKED_RESET_LIMITS.percentMax,
  poolHeadroomPercent: BANKED_RESET_LIMITS.percentMax,
  maxPerAccountPerDay: BANKED_RESET_LIMITS.capMax,
  maxPerDay: BANKED_RESET_LIMITS.capMax,
  minSpacingMinutes: BANKED_RESET_LIMITS.minutesMax,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Integer in [0, max]; anything non-numeric returns `fallback`. */
export function clampBankedResetNumber(value: unknown, max: number, fallback: number): number {
  const n = typeof value === "string" && value.trim() !== "" ? Number(value) : value;
  if (typeof n !== "number" || !Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(0, Math.round(n)));
}

function pickBoolean(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

/**
 * Stored value (GET /api/settings) → a complete settings object. Missing or invalid fields
 * take their default, so a corrupt row can never show the feature as on.
 */
export function mergeBankedResetAutoApplyClient(raw: unknown): BankedResetAutoApplySettings {
  const defaults = createBankedResetAutoApplyDefaults();
  if (!isRecord(raw)) return defaults;

  const creditTypes = isRecord(raw.creditTypes) ? raw.creditTypes : {};
  const schedule = isRecord(raw.schedule) ? raw.schedule : {};
  const connections: Record<string, boolean> = {};
  if (isRecord(raw.connections)) {
    for (const [id, flag] of Object.entries(raw.connections)) {
      if (typeof flag === "boolean") connections[id] = flag;
    }
  }

  const merged: BankedResetAutoApplySettings = {
    ...defaults,
    enabled: pickBoolean(raw.enabled, defaults.enabled),
    mode: BANKED_RESET_MODES.find((m) => m === raw.mode) ?? defaults.mode,
    accountScope:
      BANKED_RESET_ACCOUNT_SCOPES.find((s) => s === raw.accountScope) ?? defaults.accountScope,
    creditTypes: { ...defaults.creditTypes },
    connections,
    schedule: {
      enabled: pickBoolean(schedule.enabled, defaults.schedule.enabled),
      startHourUtc: clampBankedResetNumber(
        schedule.startHourUtc,
        BANKED_RESET_LIMITS.hourOfDayMax,
        defaults.schedule.startHourUtc
      ),
      endHourUtc: clampBankedResetNumber(
        schedule.endHourUtc,
        BANKED_RESET_LIMITS.hourOfDayMax,
        defaults.schedule.endHourUtc
      ),
    },
  };
  for (const type of BANKED_RESET_CREDIT_TYPES) {
    merged.creditTypes[type] = pickBoolean(creditTypes[type], defaults.creditTypes[type]);
  }
  for (const key of Object.keys(BANKED_RESET_NUMBER_MAX) as BankedResetNumberKey[]) {
    merged[key] = clampBankedResetNumber(raw[key], BANKED_RESET_NUMBER_MAX[key], defaults[key]);
  }
  return merged;
}

/** Whether the auto-apply feature covers this connection (same rule as the server policy). */
export function isConnectionInScope(
  settings: Pick<BankedResetAutoApplySettings, "accountScope" | "connections">,
  connectionId: string
): boolean {
  const flag = settings.connections[connectionId];
  return settings.accountScope === "selected" ? flag === true : flag !== false;
}

/**
 * Toggle state → stored `connections` map. "all": an off toggle stores `false` (exclude) and
 * an on toggle clears the entry; "selected": an on toggle stores `true` and an off toggle
 * clears the entry. Entries for other connections are untouched.
 */
export function setConnectionInScope(
  settings: Pick<BankedResetAutoApplySettings, "accountScope" | "connections">,
  connectionId: string,
  inScope: boolean
): Record<string, boolean> {
  const next = { ...settings.connections };
  if (settings.accountScope === "selected") {
    if (inScope) next[connectionId] = true;
    else delete next[connectionId];
  } else if (inScope) {
    delete next[connectionId];
  } else {
    next[connectionId] = false;
  }
  return next;
}
