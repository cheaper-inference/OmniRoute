"use client";

import { useFormatter, useNow, useTranslations } from "next-intl";
import type { HealthAccount, HealthCell, HealthReason } from "./healthOverview";
import { formatQuotaLabel } from "./utils";
import { parseRuntimeTimestamp } from "./runtimeCooldown";

type Translator = ReturnType<typeof useTranslations>;
type Formatter = ReturnType<typeof useFormatter>;

function formatWindowLabel(cell: HealthCell, t: Translator): string {
  if (!cell.window) return cell.displayName || cell.name;
  const label =
    cell.window === "fiveHour"
      ? t("healthFiveHour")
      : /month/i.test(cell.displayName || cell.name)
        ? t("budgetResetMonthly")
        : /week|7d|seven/i.test(cell.displayName || cell.name) || /weekly/i.test(cell.name)
          ? t("weekly")
          : t("healthOverall");
  return cell.scope === "scoped" ? `${cell.scopeId} · ${label}` : label;
}

const SIMPLE_REASON_KEYS: Partial<Record<HealthReason["type"], string>> = {
  paused: "common.paused",
  terminal: "healthLegendAction",
  cooldown: "healthCooldown",
  cutoffNotEvaluated: "healthCutoffAtRequest",
  noQuota: "noQuotaData",
  noRuntime: "healthNoRuntime",
  previousFailure: "healthPreviousFailure",
  previousSnapshot: "healthPreviousSnapshot",
};
function formatBypass(reason: HealthReason): string {
  const keys = {
    extraUsage: "healthExtraUsageBypass",
    paidCredits: "healthPaidCreditsBypass",
    recentSuccess: "healthRecentSuccessBypass",
    purchasedBalance: "healthPurchasedBalanceBypass",
    filteringDisabled: "healthFilteringBypass",
  } as const;
  return keys[(reason.bypass || "filteringDisabled") as keyof typeof keys];
}
function formatHealthReason(
  reason: HealthReason,
  account: HealthAccount | undefined,
  t: Translator,
  all: Translator,
  format: Formatter,
  relative: (value?: string | null) => string
): string {
  const cell = account?.cells.find((candidate) => candidate.name === reason.window);
  const window = cell ? formatWindowLabel(cell, t) : reason.window;
  const simpleKey = SIMPLE_REASON_KEYS[reason.type];
  if (simpleKey) return (reason.type === "paused" ? all : t)(simpleKey);
  if (reason.type === "scopeCooldown")
    return `${t("healthCooldown")} · ${reason.scopeId || window} · ${relative(reason.resetAt)}`;
  if (reason.type === "peakHour")
    return `${t("healthPeakHourProtection")} · ${relative(reason.resetAt)}`;
  if (reason.type === "quota")
    return `${t(reason.percent === 0 ? "healthQuotaExhausted" : "quotaCutoffsColumnHelp")} · ${window} · ${format.number(reason.percent! / 100, { style: "percent", maximumFractionDigits: 1 })} ≤ ${format.number(reason.cutoff! / 100, { style: "percent", maximumFractionDigits: 1 })}`;
  if (reason.type === "quotaBypass") return t(formatBypass(reason));
  if (reason.type === "lockout")
    return `${t("modelLockouts")} · ${window} · ${relative(reason.resetAt)}`;
  if (reason.type === "quotaError") return `${t("healthQuotaError")} · ${reason.error}`;
  if (reason.type === "awaitingSync") return `${window} · ${t("healthAwaitingSync")}`;
  return t("healthVerdictUnavailable");
}

function formatRecovery(
  value: string,
  now: Date,
  relative: (value?: string | null) => string,
  format: Formatter
): string {
  const minutes = Math.max(0, Math.ceil((parseRuntimeTimestamp(value) - now.getTime()) / 60_000));
  if (minutes === 0) return relative(value);
  const days = Math.floor(minutes / (24 * 60));
  const hours = Math.floor(minutes / 60) % 24;
  return format.list(
    [
      ...(days ? [format.number(days, { style: "unit", unit: "day", unitDisplay: "long" })] : []),
      ...(hours
        ? [format.number(hours, { style: "unit", unit: "hour", unitDisplay: "long" })]
        : []),
      ...(minutes % 60
        ? [format.number(minutes % 60, { style: "unit", unit: "minute", unitDisplay: "long" })]
        : []),
    ],
    { type: "unit" }
  );
}

export function useHealthText() {
  const t = useTranslations("usage");
  const all = useTranslations();
  const format = useFormatter();
  const now = useNow({ updateInterval: 1000 });
  const relative = (value?: string | null) =>
    value && Number.isFinite(parseRuntimeTimestamp(value))
      ? format.relativeTime(new Date(parseRuntimeTimestamp(value)), now)
      : t("tierUnknown");
  const reason = (value: HealthReason, account?: HealthAccount) =>
    formatHealthReason(value, account, t, all, format, relative);
  const primary = (account: HealthAccount) => {
    const r = account.reasons.find((candidate) =>
      ({
        paused: ["paused"],
        critical: ["terminal", "cooldown", "scopeCooldown", "peakHour", "quota"],
        alert: ["quota", "lockout", "scopeCooldown", "peakHour"],
        empty: ["quotaError", "noQuota", "noRuntime"],
        ok: ["previousFailure", "awaitingSync"],
      })[account.status].includes(candidate.type)
    );
    if (!r) return t("healthAvailable");
    if (r.type === "quota")
      return t(r.percent === 0 ? "healthQuotaExhausted" : "quotaThresholdLabel");
    if (r.type === "lockout") return t("modelLockouts");
    if (r.type === "quotaError") return t("healthQuotaError");
    return reason(r, account);
  };
  const windowLabel = (cell: HealthCell) => formatWindowLabel(cell, t);
  const recovery = (value: string) => formatRecovery(value, now, relative, format);
  const poolLabel = (id: string) =>
    t("healthPool", {
      name:
        id === "gemini" ? "Gemini" : id === "claude_gpt" ? "Claude / GPT" : formatQuotaLabel(id),
    });
  return { t, all, format, relative, recovery, reason, primary, windowLabel, poolLabel };
}
