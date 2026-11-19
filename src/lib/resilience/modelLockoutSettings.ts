import { isAutomatedTestProcess } from "@/shared/utils/testProcess";

export interface ModelLockoutSettings {
  enabled: boolean;
  errorCodes: number[];
  baseCooldownMs: number;
  maxCooldownMs: number;
  /**
   * Operator ceiling for model lockouts derived from RELATIVE-prose quota
   * resets ("Resets in 76h25m43s"). Relative prose is an upstream statement of
   * the reset window, so it bypasses the generic maxCooldownMs clamp — but a
   * malicious/buggy upstream must not lock the model for days either, so it is
   * bounded by its own ceiling. Default 6h: long enough to stop a 30-minute
   * relock loop on subscription windows, short enough to recover early from an
   * early (random) upstream reset.
   */
  quotaProseMaxCooldownMs: number;
  maxBackoffSteps: number;
  useExponentialBackoff: boolean;
}

export const DEFAULT_MODEL_LOCKOUT_SETTINGS: ModelLockoutSettings = {
  enabled: false,
  errorCodes: [403, 404, 429, 502, 503, 504],
  baseCooldownMs: 120_000,
  maxCooldownMs: 1_800_000,
  quotaProseMaxCooldownMs: 6 * 60 * 60 * 1000, // 6 hours
  maxBackoffSteps: 10,
  useExponentialBackoff: true,
};

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toInteger(
  value: unknown,
  fallback: number,
  options: { min?: number; max?: number } = {}
): number {
  const min = options.min ?? 0;
  const max = options.max ?? Number.MAX_SAFE_INTEGER;
  const parsed =
    typeof value === "number" ? value : typeof value === "string" ? Number(value) : fallback;
  return Number.isFinite(parsed) ? Math.max(min, Math.min(max, Math.trunc(parsed))) : fallback;
}

function toBoolean(value: unknown, fallback: boolean): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") return value === "true" || value === "1";
  return fallback;
}

function toNumberArray(value: unknown, fallback: number[]): number[] {
  if (Array.isArray(value)) {
    const nums = value
      .map((v) => (typeof v === "number" ? v : Number(v)))
      .filter((n) => Number.isFinite(n) && n >= 100 && n <= 599);
    return nums.length > 0 ? nums : fallback;
  }
  return fallback;
}

export function resolveModelLockoutSettings(
  settings: Record<string, unknown> | null | undefined
): ModelLockoutSettings {
  const record = asRecord(settings);
  const raw = asRecord(record.modelLockout);
  const isTest = isAutomatedTestProcess();

  const baseCooldownMs = toInteger(
    raw.baseCooldownMs,
    DEFAULT_MODEL_LOCKOUT_SETTINGS.baseCooldownMs,
    {
      min: isTest ? 0 : 5_000,
      max: 600_000,
    }
  );
  const maxCooldownMs = Math.max(
    toInteger(raw.maxCooldownMs, DEFAULT_MODEL_LOCKOUT_SETTINGS.maxCooldownMs, {
      min: isTest ? 0 : 5_000,
      max: 3_600_000,
    }),
    baseCooldownMs // cap must be >= base or exponential backoff is meaningless
  );
  const quotaProseMaxCooldownMs = Math.max(
    toInteger(raw.quotaProseMaxCooldownMs, DEFAULT_MODEL_LOCKOUT_SETTINGS.quotaProseMaxCooldownMs, {
      min: isTest ? 0 : 60_000,
      max: 24 * 60 * 60 * 1000, // 24h hard ceiling — an upstream prose reset must never lock for days
    }),
    maxCooldownMs // prose ceiling must be >= generic cap or it is a silent regression
  );

  return {
    enabled: toBoolean(raw.enabled, DEFAULT_MODEL_LOCKOUT_SETTINGS.enabled),
    errorCodes: toNumberArray(raw.errorCodes, DEFAULT_MODEL_LOCKOUT_SETTINGS.errorCodes),
    baseCooldownMs,
    maxCooldownMs,
    quotaProseMaxCooldownMs,
    maxBackoffSteps: toInteger(
      raw.maxBackoffSteps,
      DEFAULT_MODEL_LOCKOUT_SETTINGS.maxBackoffSteps,
      { min: 0, max: 20 }
    ),
    useExponentialBackoff: toBoolean(
      raw.useExponentialBackoff,
      DEFAULT_MODEL_LOCKOUT_SETTINGS.useExponentialBackoff
    ),
  };
}
