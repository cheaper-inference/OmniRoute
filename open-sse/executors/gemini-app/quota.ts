/**
 * Quota metadata decoding and validation for the Gemini App (Robin) provider.
 *
 * Official `GetUsageInfo` rows are provenance-tagged: a percentage is only
 * interpreted as "used" when it came from the verified `getUsageInfo.3[i].2[j]`
 * wire path. Unknown quota shapes stay `unspecified` instead of being guessed.
 *
 * Derived from `ShawTim/gemini-app2api` — `src/gateway/quota.mjs` (MIT).
 * See ./LICENSE for the upstream MIT notice.
 */

import { parse, type WireField } from "./protobuf.ts";

const MAX = 1024 * 1024;
const utf8 = new TextDecoder("utf-8", { fatal: true });

function fail(): never {
  const error = new Error("INVALID_QUOTA_METADATA") as Error & { code: string };
  error.code = "INVALID_QUOTA_METADATA";
  throw error;
}

function fields(bytes: Buffer, limit = MAX): WireField[] {
  if (!Buffer.isBuffer(bytes) || bytes.length > limit) fail();
  try {
    return parse(bytes);
  } catch {
    fail();
  }
}

function one(list: readonly WireField[], number: number, wire: number): WireField | null {
  const found = list.filter((field) => field.number === number);
  if (found.length > 1 || found.some((field) => field.wire !== wire)) fail();
  return found[0] ?? null;
}

function integer(field: WireField | null, max = Number.MAX_SAFE_INTEGER): number | null {
  if (!field) return null;
  let n = 0n;
  for (let i = 0; i < field.payload.length; i++) {
    n |= BigInt(field.payload[i] & 127) << BigInt(i * 7);
  }
  if (
    !field.payload.length ||
    field.payload.length > 10 ||
    (field.payload.at(-1) as number) & 128
  ) {
    fail();
  }
  if (n > BigInt(max)) fail();
  return Number(n);
}

function timestamp(bytes: Buffer): string | null {
  const fs = fields(bytes, 128);
  const seconds = integer(one(fs, 1, 0));
  const nanos = integer(one(fs, 2, 0), 999_999_999);
  if ((seconds !== null && seconds > 253_402_300_799) || (nanos !== null && nanos > 999_999_999)) {
    fail();
  }
  if (seconds === null) return null;
  const ms = seconds * 1000 + Math.floor((nanos ?? 0) / 1e6);
  const date = new Date(ms);
  return Number.isFinite(date.getTime()) ? date.toISOString() : null;
}

function ratio(available: number | null, max: number | null): number | null {
  return available !== null && max !== null && max > 0 && available >= 0 && available <= max
    ? Math.round((available / max) * 10000) / 100
    : null;
}

function labelText(field: WireField | null, maxBytes = 2048): string {
  if (!field) return "";
  if (field.payload.length > maxBytes) fail();
  return utf8.decode(field.payload);
}

function boundedArray<T>(list: T[], max: number): T[] {
  if (list.length > max) fail();
  return list;
}

export interface UsageRow {
  label: string;
  providerPercent: number | null;
  percentMeaning: "used" | "unspecified";
  providerTimestamp: string | null;
  timestampMeaning: "window_refresh" | "unspecified";
  groupType: number | null;
  sourcePath: string | null;
  helpTitle: string;
  helpItems: Array<{ label: string; description: string }>;
}

/** `GetUsageInfo` has repeated root.3 groups and repeated GxuPool row.2. */
export function decodeUsageInfo(payload: Buffer): { usageRows: UsageRow[] } {
  try {
    const root = fields(payload);
    const groups = boundedArray(
      root.filter((field) => field.number === 3),
      16
    );
    const usageRows: UsageRow[] = [];
    groups.forEach((group, groupIndex) => {
      if (group.wire !== 2) fail();
      const gf = fields(group.payload, 64 * 1024);
      const groupType = integer(one(gf, 1, 0), 0x7fff_ffff);
      const rows = boundedArray(
        gf.filter((field) => field.number === 2),
        32
      );
      rows.forEach((row, rowIndex) => {
        if (row.wire !== 2) fail();
        const rf = fields(row.payload, 16 * 1024);
        const percent = one(rf, 2, 5);
        const label = one(rf, 3, 2);
        const time = one(rf, 1, 2);
        const help = one(rf, 4, 2);
        if (percent && percent.payload.length < 4) fail();
        const value = percent?.payload.readFloatLE(0);
        if (
          percent &&
          (!Number.isFinite(value) || (value as number) < 0 || (value as number) > 1)
        ) {
          fail();
        }
        const hf = help ? fields(help.payload, 8192) : [];
        const helpItems = boundedArray(
          hf.filter((field) => field.number === 2),
          16
        ).map((item) => {
          if (item.wire !== 2) fail();
          const itemFields = fields(item.payload, 4096);
          return {
            label: labelText(one(itemFields, 1, 2), 512),
            description: labelText(one(itemFields, 2, 2)),
          };
        });
        const sourcePath = `getUsageInfo.3[${groupIndex}].2[${rowIndex}]`;
        const entry: UsageRow = {
          label: labelText(label, 512),
          providerPercent: percent ? (value as number) * 100 : null,
          percentMeaning: "used",
          providerTimestamp: time ? timestamp(time.payload) : null,
          timestampMeaning: "window_refresh",
          groupType,
          sourcePath,
          helpTitle: labelText(one(hf, 1, 2), 512),
          helpItems,
        };
        if (entry.label || entry.providerPercent !== null) usageRows.push(entry);
      });
    });
    boundedArray(usageRows, 32);
    return { usageRows };
  } catch {
    fail();
  }
}

export interface QuotaBudget {
  sourcePath: string;
  available: number | null;
  max: number | null;
  remainingPercent: number | null;
  providerPercent: number | null;
  unit: number | null;
  refillAt: string | null;
  scope: "unknown";
}

export interface QuotaRefill {
  sourcePath: string;
  refillAt: string;
  action?: number;
  featureMode?: number;
}

export interface SafeQuota {
  source: "official" | "unknown";
  status: "ok" | "missing" | "error" | "unqueried" | "unknown";
  updatedAt: string | null;
  budgetsUpdatedAt: string | null;
  refillsUpdatedAt: string | null;
  usageUpdatedAt: string | null;
  lastAttemptAt: string | null;
  errorCode: string | null;
  budgets: QuotaBudget[];
  refills: QuotaRefill[];
  usageRows: UsageRow[];
  provider: "google-robin";
  remainingPercent: number | null;
  observedModel?: string;
}

const SAFE_ERRORS = new Set([
  "INVALID_QUOTA_METADATA",
  "QUOTA_REFRESH_FAILED",
  "QUOTA_REFRESH_THROTTLED",
  "QUOTA_AUTH_REJECTED",
  "QUOTA_RATE_LIMITED",
  "QUOTA_TIMEOUT",
  "QUOTA_CANCELLED",
  "QUOTA_CONNECTION_FAILED",
  "QUOTA_STREAM_FAILED",
  "QUOTA_STREAM_RESET",
  "QUOTA_STREAM_CLOSED_EARLY",
  "QUOTA_HTTP_REJECTED",
  "QUOTA_UPSTREAM_REJECTED",
  "QUOTA_PRECONDITION_REQUIRED",
  "QUOTA_INVALID_RESPONSE",
  "QUOTA_INVALID_STATUS",
  "QUOTA_RESPONSE_TOO_LARGE",
  "QUOTA_INCOMPLETE_RESPONSE",
  "QUOTA_CREDENTIAL_REQUIRED",
  "ACCOUNT_DISABLED",
  "ACCOUNT_LOGIN_REQUIRED",
  "NATIVE_PERMISSION_OR_AUTH",
  "OAUTH_REFRESH_FAILED",
]);

const OBSERVED_MODELS = new Set([
  "gemini-neon",
  "gemini-argon",
  "gemini-argon-thinking",
  "gemini-hydrogen",
  "gemini-flash",
  "gemini-flash-lite",
  "gemini-3.1-pro-preview",
  "gemini-3.1-flash-preview",
]);

function record(value: unknown): Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export function quotaFailureCode(error: unknown): string {
  const code = record(error).code;
  return SAFE_ERRORS.has(typeof code === "string" ? code : "")
    ? (code as string)
    : "QUOTA_REFRESH_FAILED";
}

/** Normalize untrusted quota state before it reaches UI or persistent storage. */
export function safeQuota(value: unknown): SafeQuota {
  const raw = record(value);
  const empty: SafeQuota = {
    source: "unknown",
    status: "unqueried",
    updatedAt: null,
    budgetsUpdatedAt: null,
    refillsUpdatedAt: null,
    usageUpdatedAt: null,
    lastAttemptAt: null,
    errorCode: null,
    budgets: [],
    refills: [],
    usageRows: [],
    provider: "google-robin",
    remainingPercent: null,
  };
  if (!value || typeof value !== "object") return empty;

  const safeTime = (v: unknown): string | null => {
    if (typeof v !== "string") return null;
    const ms = Date.parse(v);
    return Number.isFinite(ms) && new Date(ms).toISOString() === v ? v : null;
  };
  const budgetPath = /^clientGenerateResponse\.(?:20\.1|29\.2|33\.6|33\.4\.2)(?:\[\d{1,2}\])?$/;
  const usagePathRe = /^getUsageInfo\.3\[(?:[0-9]|1[0-5])\]\.2\[(?:[0-9]|[12][0-9]|3[01])\]$/;

  const budgets: QuotaBudget[] = Array.isArray(raw.budgets)
    ? raw.budgets.slice(0, 32).flatMap((entry) => {
        const budget = record(entry);
        if (typeof budget.sourcePath !== "string" || !budgetPath.test(budget.sourcePath)) return [];
        const available =
          Number.isFinite(budget.available) && (budget.available as number) >= 0
            ? (budget.available as number)
            : null;
        const max =
          Number.isFinite(budget.max) && (budget.max as number) >= 0
            ? (budget.max as number)
            : null;
        return [
          {
            sourcePath: budget.sourcePath,
            available,
            max,
            remainingPercent: ratio(available, max),
            providerPercent:
              Number.isSafeInteger(budget.providerPercent) &&
              (budget.providerPercent as number) >= 0 &&
              (budget.providerPercent as number) <= 100
                ? (budget.providerPercent as number)
                : null,
            unit:
              Number.isSafeInteger(budget.unit) && (budget.unit as number) >= 0
                ? (budget.unit as number)
                : null,
            refillAt: safeTime(budget.refillAt),
            scope: "unknown" as const,
          },
        ];
      })
    : [];

  const refills: QuotaRefill[] = Array.isArray(raw.refills)
    ? raw.refills.slice(0, 32).flatMap((entry) => {
        const refill = record(entry);
        if (typeof refill.sourcePath !== "string" || !budgetPath.test(refill.sourcePath)) return [];
        const refillAt = safeTime(refill.refillAt);
        if (!refillAt) return [];
        const out: QuotaRefill = { sourcePath: refill.sourcePath, refillAt };
        if (Number.isSafeInteger(refill.action) && (refill.action as number) >= 0)
          out.action = refill.action as number;
        if (Number.isSafeInteger(refill.featureMode) && (refill.featureMode as number) >= 0) {
          out.featureMode = refill.featureMode as number;
        }
        return [out];
      })
    : [];

  const official = raw.source === "official" && raw.provider === "google-robin";
  const usageRows: UsageRow[] = Array.isArray(raw.usageRows)
    ? raw.usageRows.slice(0, 32).flatMap((entry) => {
        const row = record(entry);
        if (typeof row.label !== "string") return [];
        const path =
          typeof row.sourcePath === "string" && usagePathRe.test(row.sourcePath)
            ? row.sourcePath
            : null;
        return [
          {
            label: row.label.slice(0, 512),
            providerPercent:
              Number.isFinite(row.providerPercent) &&
              (row.providerPercent as number) >= 0 &&
              (row.providerPercent as number) <= 100
                ? (row.providerPercent as number)
                : null,
            percentMeaning: official && path ? "used" : "unspecified",
            providerTimestamp: safeTime(row.providerTimestamp),
            timestampMeaning: official && path ? "window_refresh" : "unspecified",
            groupType:
              Number.isSafeInteger(row.groupType) && (row.groupType as number) >= 0
                ? (row.groupType as number)
                : null,
            sourcePath: official ? path : null,
            helpTitle: typeof row.helpTitle === "string" ? row.helpTitle.slice(0, 512) : "",
            helpItems: Array.isArray(row.helpItems)
              ? row.helpItems.slice(0, 16).flatMap((item) => {
                  const help = record(item);
                  return typeof help.label === "string" && typeof help.description === "string"
                    ? [
                        {
                          label: help.label.slice(0, 512),
                          description: help.description.slice(0, 2048),
                        },
                      ]
                    : [];
                })
              : [],
          },
        ];
      })
    : [];

  const status = ["ok", "missing", "error", "unqueried"].includes(String(raw.status))
    ? (raw.status as SafeQuota["status"])
    : "unknown";
  const errorCode =
    typeof raw.errorCode === "string" && SAFE_ERRORS.has(raw.errorCode) ? raw.errorCode : null;
  const result: SafeQuota = {
    source: official ? "official" : "unknown",
    status,
    updatedAt: safeTime(raw.updatedAt),
    budgetsUpdatedAt:
      safeTime(raw.budgetsUpdatedAt) ?? (budgets.length ? safeTime(raw.updatedAt) : null),
    refillsUpdatedAt:
      safeTime(raw.refillsUpdatedAt) ?? (refills.length ? safeTime(raw.updatedAt) : null),
    usageUpdatedAt:
      safeTime(raw.usageUpdatedAt) ?? (usageRows.length ? safeTime(raw.updatedAt) : null),
    lastAttemptAt: safeTime(raw.lastAttemptAt),
    errorCode,
    budgets,
    refills,
    usageRows,
    provider: "google-robin",
    remainingPercent: budgets.length === 1 ? budgets[0].remainingPercent : null,
  };
  if (typeof raw.observedModel === "string" && OBSERVED_MODELS.has(raw.observedModel)) {
    result.observedModel = raw.observedModel;
  }
  return result;
}

/** Only merge verified official observations; never upgrade cache provenance. */
export function mergeQuotaObservation(previous: unknown, observation: unknown): SafeQuota {
  const prior = safeQuota(previous);
  const next = safeQuota(observation);
  if (next.source !== "official" || next.status !== "ok") return prior;
  return safeQuota({
    ...prior,
    ...next,
    budgets: next.budgets.length ? next.budgets : prior.budgets,
    budgetsUpdatedAt: next.budgets.length ? next.budgetsUpdatedAt : prior.budgetsUpdatedAt,
    refills: next.refills.length ? next.refills : prior.refills,
    refillsUpdatedAt: next.refills.length ? next.refillsUpdatedAt : prior.refillsUpdatedAt,
    usageRows: next.usageRows.length ? next.usageRows : prior.usageRows,
    usageUpdatedAt: next.usageRows.length ? next.usageUpdatedAt : prior.usageUpdatedAt,
    lastAttemptAt: prior.lastAttemptAt,
  });
}
