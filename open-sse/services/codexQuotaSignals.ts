import { z } from "zod";
import {
  getCodexModelScope,
  isCodexSparkLimitDescriptor,
  type CodexQuotaScope,
} from "../config/codexQuotaScopes.ts";

type JsonRecord = Record<string, unknown>;
export interface CodexQuotaWindow {
  id: "primary" | "secondary";
  /** Fraction, converted exactly once from the wire's 0..100 percentage. */
  percentUsed: number;
  /** Validated wire percentage, retained for 0..100 UI/legacy DTOs without float round trips. */
  usedPercent: number;
  resetAt: string | null;
  windowSeconds: number | null;
  durationProvided: boolean;
}
export interface CodexQuotaSignal {
  scope: CodexQuotaScope;
  limitId: string;
  source: "usage" | "headers" | "websocket";
  allowed: boolean | null;
  limitReached: boolean | null;
  windows: CodexQuotaWindow[];
}

// Defensive proxy bounds, not constraints claimed for Codex's signed Rust DTOs.
const MAX_WINDOW_SECONDS = 31 * 86400;
const decimal = /^[+-]?(?:\d{1,16}(?:\.\d{1,8})?|\.\d{1,8})(?:[eE][+-]?\d{1,3})?$/;
const finiteNumber = z.preprocess(
  (value) =>
    typeof value === "string" && value.length <= 64 && decimal.test(value.trim())
      ? Number(value)
      : value,
  z.number().finite()
);
const percentage = finiteNumber.pipe(z.number().min(0).max(100));
const duration = finiteNumber.pipe(z.number().int().positive().max(MAX_WINDOW_SECONDS));

function record(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}
function read(value: JsonRecord, snake: string, camel: string): unknown {
  return value[snake] ?? value[camel];
}
export function parseCodexFiniteNumber(value: unknown): number | null {
  const parsed = finiteNumber.safeParse(value);
  return parsed.success ? parsed.data : null;
}
function resetFromMs(ms: number, now: number): string | null {
  return Number.isFinite(ms) && ms > 0 && ms <= now + MAX_WINDOW_SECONDS * 1000
    ? new Date(ms).toISOString()
    : null;
}
/** Official reset_at is epoch SECONDS; do not guess milliseconds from its magnitude. */
export function parseCodexResetSeconds(value: unknown, now = Date.now()): string | null {
  const seconds = parseCodexFiniteNumber(value);
  return seconds === null ? null : resetFromMs(seconds * 1000, now);
}
/** The older token-count headers carry ISO timestamps, not official epoch seconds. */
export function parseCodexLegacyReset(value: unknown, now = Date.now()): string | null {
  if (typeof value !== "string" || value.length > 64) return null;
  return resetFromMs(Date.parse(value), now);
}

/** Invalid optional timing fields do not discard otherwise valid exhaustion evidence. */
export function parseCodexQuotaWindow(
  value: unknown,
  id: CodexQuotaWindow["id"] = "primary",
  now = Date.now(),
  event = false
): CodexQuotaWindow | null {
  const raw = record(value);
  const parsed = percentage.safeParse(read(raw, "used_percent", "usedPercent"));
  if (!parsed.success) return null;
  const secondsValue =
    read(raw, "limit_window_seconds", "limitWindowSeconds") ??
    read(raw, "window_seconds", "windowSeconds");
  const minutesValue = read(raw, "window_minutes", "windowMinutes");
  const rawDuration = event
    ? (() => {
        const minutes = parseCodexFiniteNumber(minutesValue);
        return minutes === null ? null : minutes * 60;
      })()
    : secondsValue;
  const parsedDuration = duration.safeParse(rawDuration);
  const after = parseCodexFiniteNumber(read(raw, "reset_after_seconds", "resetAfterSeconds"));
  const relativeReset =
    after !== null && after >= 0 && after <= MAX_WINDOW_SECONDS
      ? resetFromMs(now + after * 1000, now)
      : null;
  return {
    id,
    percentUsed: parsed.data / 100,
    usedPercent: parsed.data,
    resetAt: parseCodexResetSeconds(read(raw, "reset_at", "resetAt"), now) ?? relativeReset,
    windowSeconds: parsedDuration.success ? parsedDuration.data : null,
    durationProvided: event ? minutesValue != null : secondsValue != null,
  };
}

function boolean(value: unknown): boolean | null {
  const parsed = z.boolean().safeParse(value);
  return parsed.success ? parsed.data : null;
}
/** Also used by the usage API: a string 'false' is not the boolean true. */
export function isCodexLimitReached(value: unknown): boolean {
  const raw = record(value);
  return raw.allowed === false || read(raw, "limit_reached", "limitReached") === true;
}
function signal(
  value: unknown,
  scope: CodexQuotaScope,
  limitId: string,
  source: CodexQuotaSignal["source"],
  now: number,
  event = false
): CodexQuotaSignal | null {
  const raw = record(value);
  const windows = (["primary", "secondary"] as const).flatMap((id) => {
    const window = parseCodexQuotaWindow(
      event ? raw[id] : read(raw, `${id}_window`, `${id}Window`),
      id,
      now,
      event
    );
    return window ? [window] : [];
  });
  const allowed = boolean(raw.allowed);
  const reached = boolean(read(raw, "limit_reached", "limitReached"));
  if (windows.length === 0 && allowed === null && reached === null) return null;
  return {
    scope,
    limitId,
    source,
    allowed,
    limitReached: allowed === false ? true : reached,
    windows,
  };
}
function scopeForLimit(id: string): CodexQuotaScope | null {
  if (id === "codex") return "codex";
  return isCodexSparkLimitDescriptor(id) ? "spark" : null;
}

/** Normalize only the requested known meter. An unknown future meter is not normal Codex. */
export function parseCodexOfficialQuotaHeaders(
  headers: Record<string, string>,
  model?: string | null,
  now = Date.now()
): CodexQuotaSignal | null {
  const lower = Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [key.toLowerCase(), value])
  );
  const wanted = getCodexModelScope(model);
  const families = new Set(
    Object.keys(lower).flatMap((key) => {
      const match = /^x-([a-z0-9_-]{1,128})-(?:primary|secondary)-used-percent$/.exec(key);
      return match ? [match[1]] : [];
    })
  );
  for (const family of families) {
    if (scopeForLimit(family) !== wanted) continue;
    const raw: JsonRecord = {};
    for (const id of ["primary", "secondary"] as const) {
      const prefix = `x-${family}-${id}-`;
      raw[id] = {
        used_percent: lower[`${prefix}used-percent`],
        window_minutes: lower[`${prefix}window-minutes`],
        reset_at: lower[`${prefix}reset-at`],
      };
    }
    const result = signal(raw, wanted, family.replaceAll("-", "_"), "headers", now, true);
    if (result) return result;
  }
  return null;
}

/** Pure normalization; credits/reset coupons remain separate display/billing evidence. */
export function parseCodexUsageSignal(
  payload: unknown,
  model?: string | null,
  now = Date.now()
): CodexQuotaSignal | null {
  const data = record(payload);
  const scope = getCodexModelScope(model);
  if (scope === "codex")
    return signal(read(data, "rate_limit", "rateLimit"), scope, "codex", "usage", now);
  const additional = read(data, "additional_rate_limits", "additionalRateLimits");
  if (!Array.isArray(additional)) return null;
  for (const value of additional) {
    const entry = record(value);
    const descriptors = [
      "limit_id",
      "limitId",
      "limit_name",
      "limitName",
      "metered_feature",
      "meteredFeature",
      "id",
      "name",
      "model",
    ].map((key) => entry[key]);
    if (!isCodexSparkLimitDescriptor(...descriptors)) continue;
    return signal(
      read(entry, "rate_limit", "rateLimit"),
      scope,
      String(entry.limit_id ?? entry.limitId ?? "spark"),
      "usage",
      now
    );
  }
  return null;
}

const eventSchema = z.object({
  type: z.literal("codex.rate_limits"),
  metered_limit_name: z.string().max(128).nullish(),
  limit_name: z.string().max(128).nullish(),
  rate_limits: z.unknown().optional(),
});
/** Parser only: transport-side persistence must additionally be owner/revision fenced. */
export function parseCodexRateLimitEvent(
  payload: unknown,
  now = Date.now()
): CodexQuotaSignal | null {
  const parsed = eventSchema.safeParse(payload);
  if (!parsed.success) return null;
  const id = (parsed.data.metered_limit_name ?? parsed.data.limit_name ?? "codex")
    .trim()
    .toLowerCase();
  const scope = scopeForLimit(id);
  return scope ? signal(parsed.data.rate_limits, scope, id, "websocket", now, true) : null;
}

/** Fixed routing slots require an explicit duration, never the upstream position. */
export function classifyCodexQuotaWindow(
  window: Pick<CodexQuotaWindow, "windowSeconds">
): "session" | "weekly" | null {
  if (window.windowSeconds === 18000) return "session";
  if (window.windowSeconds === 604800) return "weekly";
  return null;
}

/** Preserve unclassified evidence under a neutral key; do not fabricate known quota. */
export function codexQuotaWindowKey(
  window: CodexQuotaWindow,
  names: { primary: string; secondary: string }
): string {
  const family = classifyCodexQuotaWindow(window);
  if (family === "session") return names.primary;
  if (family === "weekly") return names.secondary;
  return `${names.primary.replace(/session$/, "")}unknown_${window.id}`;
}
