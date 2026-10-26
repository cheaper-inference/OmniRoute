"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import { buildGrokBillingCardRows } from "@/shared/utils/grokBilling";
import { buildKimiBillingCardRows } from "@/shared/utils/kimiBilling";
import {
  isKimiBillingStatus,
  isProviderBillingProvider,
  type ProviderBillingStatus,
} from "@/shared/utils/providerBilling";
import {
  formatCountdown,
  formatQuotaLabel,
  getBarColor,
  getQuotaRemainingPercentage,
  getQuotaVisibilityKey,
  shouldShowQuotaUsageCount,
} from "../utils";
import QuotaMiniBar from "../QuotaMiniBar";
import { translateUsageOrFallback, type UsageTranslationValues } from "../i18nFallback";
import {
  findKiloPassQuotaRow,
  isKiloPassDisplayRow,
  hasFixedQuotaOrder,
  hasCanonicalWindowOrder,
  sortQuotasByWindow,
} from "../quotaParsing";
import KiloPassMeter from "./KiloPassMeter";
import QuotaCardSpeed from "./QuotaCardSpeed";
import { hasCodexPaidCredits, type CodexPaidCredits } from "@/lib/providers/codexPaidCredits";
import AntigravityQuotaGroups, { resolveAntigravityQuotaGroups } from "../AntigravityQuotaGroups";

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  CNY: "¥",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  KRW: "₩",
  INR: "₹",
};

const DEFAULT_VISIBLE_ROWS = 3;

function ProviderBillingDetails({ billing }: { billing: ProviderBillingStatus }) {
  const t = useTranslations("usage");
  const locale = useLocale();
  const rows = isKimiBillingStatus(billing)
    ? buildKimiBillingCardRows(billing, locale, (key, fallback) =>
        translateUsageOrFallback(t, key, fallback)
      )
    : buildGrokBillingCardRows(billing, locale, (key, fallback) =>
        translateUsageOrFallback(t, key, fallback)
      );

  return (
    <div className="flex flex-col gap-1.5 border-t border-border/40 pt-2 text-[11px] text-text-main">
      {rows.map((row) =>
        row.kind === "link" ? (
          <a
            key={`${row.kind}-${row.label}`}
            href={row.href}
            target={row.target}
            rel={row.rel}
            className="inline-flex w-fit items-center gap-1 font-medium text-primary hover:underline"
          >
            {row.label}
            <Icon name="open_in_new" size={12} />
          </a>
        ) : (
          <div
            key={`${row.kind}-${row.label}`}
            className={`flex justify-between gap-2 ${
              row.kind === "status" ? "items-start" : "items-center"
            }`}
          >
            <span>{row.label}</span>
            <span
              className={`font-semibold ${row.kind === "status" ? "text-right" : "tabular-nums"}`}
            >
              {row.value}
            </span>
          </div>
        )
      )}
    </div>
  );
}

/** Pure helper — sorts quotas by remaining percentage, highest first. */
export function sortQuotasByRemaining(quotas: any[]): any[] {
  return [...quotas].sort(
    (a, b) => getQuotaRemainingPercentage(b) - getQuotaRemainingPercentage(a)
  );
}

/**
 * Pure helper — resolves the display order for a provider's quotas.
 * Providers with a deterministic fixed-window order (Codex, GLM family,
 * Kimi Coding — see quotaParsing.ts) keep the order
 * parseQuotaData() already established. Every other provider still gets the
 * remaining-percentage sort. Fixes #6687 (bars re-sorted by % undid the fixed
 * session/weekly order).
 *
 * #7764 residual: providers outside that whitelist which nonetheless report
 * rolling time windows (claude, minimax, zai, command-code, ...) are ordered
 * chronologically via `hasCanonicalWindowOrder`/`sortQuotasByWindow`, so the
 * expanded card agrees with the collapsed card (`topQuotas`) and with sibling
 * accounts of the same provider.
 */
export function resolveQuotaDisplayOrder(providerId: string | undefined, quotas: any[]): any[] {
  if (hasFixedQuotaOrder(providerId)) return [...quotas];
  if (hasCanonicalWindowOrder(quotas)) return sortQuotasByWindow(quotas);
  return sortQuotasByRemaining(quotas);
}

/** Pure helper — slices the sorted quotas down to the visible window. */
export function getVisibleQuotas(sortedQuotas: any[], expanded: boolean): any[] {
  return expanded ? sortedQuotas : sortedQuotas.slice(0, DEFAULT_VISIBLE_ROWS);
}

/**
 * Pure helper — the loading placeholder replaces the entire quota section
 * with a spinner. Swapping rows for a spinner mid-refresh collapses the card
 * height, which rebalances the outer CSS multi-column layout (provider groups
 * visibly jump between columns). Only the initial load (nothing to display
 * yet) may show the placeholder; a refresh keeps the stale rows rendered
 * while the refresh button icon spins, and the UI updates once new data
 * arrives.
 */
export function shouldShowLoadingPlaceholder(
  loading: boolean,
  quotaCount: number,
  message?: string | null
): boolean {
  return loading && quotaCount === 0 && !message;
}

interface Props {
  quotas: any[];
  quotaGroups?: Array<Record<string, unknown>>;
  providerId?: string;
  loading: boolean;
  error: string | null;
  message?: string | null;
  billing?: ProviderBillingStatus | null;
  paidCredits?: CodexPaidCredits;
  refreshedAt?: string;
  hasStaleData: boolean;
  onRefresh: () => void;
  onOpenCutoff: () => void;
  onOpenCost: () => void;
  onOpenResetCredits?: () => void;
  canEditCutoff: boolean;
  hasCutoffOverrides: boolean;
  canRedeemResetCredit?: boolean;
  redeemingResetCredit?: boolean;
  loadingResetCredits?: boolean;
  /** Per-operator quota row visibility (upstream 9router#2371 port). */
  hiddenQuotaRows?: any[];
  onHideQuota?: (quota: any) => void;
  onShowQuota?: (quota: any) => void;
  /** Read-time decode-speed stats from the usage API (`speed` payload). */
  speed?: unknown;
}

function QuotaDetailRow({
  q,
  kiloPassRow = null,
  onHideQuota,
  onOpenResetCredits,
  loadingResetCredits = false,
}: {
  q: any;
  /** Collapsed Kilo Pass display row; present only on kilocode provider cards. */
  kiloPassRow?: any | null;
  onHideQuota?: (quota: any) => void;
  onOpenResetCredits?: () => void;
  loadingResetCredits?: boolean;
}) {
  const t = useTranslations("usage");
  const canHide = typeof onHideQuota === "function" && !q.isCredits && !q.isResetCredits;
  if (isKiloPassDisplayRow(q)) {
    return (
      <KiloPassMeter
        base={q.kiloPassBase ?? kiloPassRow?.kiloPassBase ?? 0}
        bonus={q.kiloPassBonus ?? kiloPassRow?.kiloPassBonus ?? 0}
        used={q.used}
        total={q.total}
        remaining={q.remaining}
        nextBillingAt={q.resetAt ?? kiloPassRow?.resetAt ?? null}
        balance={q.kiloPassBalance ?? null}
      />
    );
  }

  if (q.isResetCredits) {
    const count = Number(q.creditCount ?? q.remaining ?? 0);
    const colors = getBarColor(q.remainingPercentage ?? 100);
    return (
      <div className="flex min-h-[34px] items-center justify-between gap-2 py-1">
        <span className="flex min-w-0 flex-1 items-center gap-1.5 text-[12px] font-medium leading-none text-text-main">
          <span className="inline-flex size-6 shrink-0 items-center justify-center">
            <span style={{ color: colors.text }}>
              <Icon name="restart_alt" size={15} />
            </span>
          </span>
          <span className="truncate leading-none">
            {translateUsageOrFallback(t, "resetCreditsLabel", "Reset credits")}
          </span>
        </span>
        <Button
          variant="ghost"
          size="sm"
          disabled={!onOpenResetCredits || loadingResetCredits}
          onClick={(event) => {
            event.stopPropagation();
            onOpenResetCredits?.();
          }}
          aria-label={translateUsageOrFallback(t, "viewResetCredits", "View reset credits")}
          className="h-6 min-h-6 shrink-0 gap-1 px-1.5 text-[12px] font-bold leading-none tabular-nums"
          style={{ color: colors.text }}
        >
          {loadingResetCredits && (
            <Icon name="progress_activity" size={12} className="animate-spin" />
          )}
          {count.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          <Icon name="chevron_right" size={13} />
        </Button>
      </div>
    );
  }

  if (q.isCredits) {
    const colors = getBarColor(q.remainingPercentage ?? 0);
    const sym = CURRENCY_SYMBOLS[q.currency] ?? q.currency ?? "";
    const amount = (q.creditCount ?? q.remaining ?? 0).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return (
      <div className="flex min-h-[34px] items-center justify-between gap-2 py-1">
        <span className="flex min-w-0 flex-1 items-center gap-1.5 text-[12px] font-medium leading-none text-text-main">
          <span className="inline-flex size-6 shrink-0 items-center justify-center">
            <span style={{ color: colors.text }}>
              <Icon name="paid" size={15} />
            </span>
          </span>
          <span className="truncate leading-none">
            {formatQuotaLabel(q.name) || t("creditsLabel")}
          </span>
        </span>
        <span
          className="inline-flex h-6 shrink-0 items-center text-[12px] font-bold leading-none tabular-nums"
          style={{ color: colors.text }}
        >
          {sym}
          {amount}
        </span>
      </div>
    );
  }

  const pctRaw = getQuotaRemainingPercentage(q);
  const pct = Math.round(pctRaw);
  const colors = getBarColor(pct);
  const cd = formatCountdown(q.resetAt);
  const label = q.displayName || formatQuotaLabel(q.name);
  const usedNum = Number(q.used || 0);
  const totalNum = Number(q.total || 0);
  const showUsage = shouldShowQuotaUsageCount(q);

  return (
    <div className="flex flex-col gap-1 py-1" title={q.modelKey || q.name}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[12px] font-medium text-text-main truncate">{label}</span>
        <span
          className="text-[12px] font-bold tabular-nums shrink-0"
          style={{ color: colors.text }}
        >
          {q.unlimited ? "∞" : translateUsageOrFallback(t, "percentLeft", `${pct}% left`, { pct })}
        </span>
        {canHide && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={(e) => {
              e.stopPropagation();
              onHideQuota?.(q);
            }}
            className="size-5 min-h-5 shrink-0 text-text-muted"
            title={translateUsageOrFallback(t, "hideQuotaRow", "Hide this quota row")}
            aria-label={translateUsageOrFallback(t, "hideQuotaRow", "Hide this quota row")}
          >
            <Icon name="visibility_off" size={13} className="leading-none" />
          </Button>
        )}
      </div>
      {!q.unlimited && <QuotaMiniBar percent={pct} size="sm" />}
      <div className="flex items-center justify-between gap-2 text-[10px] text-text-muted tabular-nums">
        <span>
          {showUsage && (
            <>
              {usedNum.toLocaleString()} / {totalNum.toLocaleString()}
            </>
          )}
        </span>
        {q.staleAfterReset ? (
          <span title={t("refreshing")}>⟳</span>
        ) : cd ? (
          <span>
            ⏱ {t("resetsIn")} {cd}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default function QuotaCardExpanded({
  quotas,
  quotaGroups = [],
  providerId,
  loading,
  error,
  message,
  billing,
  paidCredits,
  refreshedAt,
  hasStaleData,
  onRefresh,
  onOpenCutoff,
  onOpenCost,
  onOpenResetCredits,
  canEditCutoff,
  hasCutoffOverrides,
  canRedeemResetCredit = false,
  redeemingResetCredit = false,
  loadingResetCredits = false,
  hiddenQuotaRows = [],
  onHideQuota,
  onShowQuota,
  speed,
}: Props) {
  const t = useTranslations("usage");
  const tr = (key: string, fallback: string, values?: UsageTranslationValues) =>
    translateUsageOrFallback(t, key, fallback, values);

  const [expanded, setExpanded] = useState(false);
  const resolvedAntigravityGroups = useMemo(
    () =>
      providerId === "antigravity" || providerId === "agy"
        ? resolveAntigravityQuotaGroups(quotaGroups, quotas)
        : [],
    [providerId, quotaGroups, quotas]
  );
  const sortedQuotas = useMemo(
    () => resolveQuotaDisplayOrder(providerId, quotas),
    [quotas, providerId]
  );
  const visibleQuotas = useMemo(
    () => getVisibleQuotas(sortedQuotas, expanded),
    [sortedQuotas, expanded]
  );
  const hiddenCount = sortedQuotas.length - visibleQuotas.length;

  // Only Kilo Code cards host the dedicated Kilo Pass meter; the collapsed display row carries
  // the derived meter values while balance/renewal metadata render below it.
  const kiloPassRow = providerId === "kilocode" ? findKiloPassQuotaRow(sortedQuotas) : null;

  const refreshedLabel = refreshedAt
    ? new Date(refreshedAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    : null;

  return (
    <div className="border-t border-border bg-bg-subtle/30 px-3 py-2.5 flex flex-col gap-1.5">
      {shouldShowLoadingPlaceholder(loading, sortedQuotas.length, message) ? (
        <div className="text-[11px] text-text-muted flex items-center gap-1.5">
          <Icon name="progress_activity" size={13} className="animate-spin" />
          {t("loadingQuotas")}
        </div>
      ) : error ? (
        <div className="text-[11px] text-error flex items-start gap-1.5">
          <Icon name="error" size={13} />
          <span>{error}</span>
        </div>
      ) : (providerId === "antigravity" || providerId === "agy") &&
        resolvedAntigravityGroups.length > 0 ? (
        <AntigravityQuotaGroups groups={resolvedAntigravityGroups} />
      ) : quotas.length === 0 && message ? (
        <div className="text-[11px] text-text-muted italic" title={message}>
          {message}
        </div>
      ) : quotas.length === 0 ? (
        <div className="text-[11px] text-text-muted italic">{t("noQuotaData")}</div>
      ) : (
        <div className="flex flex-col divide-y divide-border/40">
          {visibleQuotas.map((q, i) => (
            <QuotaDetailRow
              key={`${q.name}-${q.modelKey ?? ""}-${i}`}
              q={q}
              kiloPassRow={kiloPassRow}
              onHideQuota={onHideQuota}
              onOpenResetCredits={q.isResetCredits ? onOpenResetCredits : undefined}
              loadingResetCredits={loadingResetCredits}
            />
          ))}
        </div>
      )}

      {isProviderBillingProvider(providerId) && billing && (
        <ProviderBillingDetails billing={billing} />
      )}
      {providerId === "codex" && paidCredits && (
        <div className="flex justify-between gap-2 border-t border-border/40 pt-2 text-[11px] text-text-main">
          <span>{t("codexPaidCreditsLabel")}</span>
          <span className="font-semibold">
            {paidCredits.overageLimitReached || !hasCodexPaidCredits(paidCredits)
              ? t("codexPaidCreditsUnavailable")
              : paidCredits.unlimited
                ? t("codexPaidCreditsUnlimited")
                : paidCredits.balance === null
                  ? t("codexPaidCreditsAvailable")
                  : paidCredits.balance.toLocaleString()}
          </span>
        </div>
      )}

      {!error && <QuotaCardSpeed speed={speed} />}

      {hiddenQuotaRows.length > 0 && (
        <div className="flex flex-wrap items-center gap-1 border-t border-border/40 pt-1.5 text-[10px] text-text-muted">
          <Icon name="visibility_off" size={12} />
          <span>{tr("hiddenQuotaRowsLabel", "Hidden:")}</span>
          {hiddenQuotaRows.map((q) => (
            <Button
              key={getQuotaVisibilityKey(q)}
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onShowQuota?.(q);
              }}
              className="h-auto min-h-0 px-1.5 py-0.5 text-[10px] font-normal"
              title={translateUsageOrFallback(t, "showQuotaRow", "Show this quota row")}
            >
              {q.displayName || formatQuotaLabel(q.name)}
            </Button>
          ))}
        </div>
      )}

      {!error && sortedQuotas.length > DEFAULT_VISIBLE_ROWS && (
        <Button
          variant="outline"
          size="sm"
          aria-expanded={expanded}
          onClick={(e) => {
            e.stopPropagation();
            setExpanded((prev) => !prev);
          }}
          className="h-7 min-h-7 gap-1 px-2 text-[11px]"
        >
          <Icon name={expanded ? "expand_less" : "expand_more"} size={12} />
          {expanded
            ? tr("showLessQuotas", "Show less")
            : tr("showMoreQuotas", `Show ${hiddenCount} more`, { count: hiddenCount })}
        </Button>
      )}

      <div className="min-w-0 space-y-1.5 pt-1.5 border-t border-border/40">
        <div className="flex min-w-0 items-center justify-between gap-2">
          {refreshedLabel && (
            <span
              className={`text-[10px] tabular-nums ${
                hasStaleData ? "text-warning" : "text-text-muted"
              }`}
              title={
                hasStaleData
                  ? t("staleQuotaTooltip")
                  : `${tr("lastRefreshed", "Last refreshed")}: ${refreshedLabel}`
              }
            >
              {tr("updatedShort", "Updated")} {refreshedLabel}
            </span>
          )}
          <Button
            variant="outline"
            size="icon-sm"
            disabled={loading}
            title={tr("forceRefresh", "Refresh now")}
            aria-label={tr("forceRefresh", "Refresh now")}
            onClick={(e) => {
              e.stopPropagation();
              onRefresh();
            }}
            className="ml-auto inline-flex size-7 shrink-0 min-h-7"
          >
            <Icon name="refresh" size={12} className={loading ? "animate-spin" : undefined} />
          </Button>
        </div>
        <div className="grid min-w-0 grid-cols-[repeat(auto-fit,minmax(min(100%,5rem),1fr))] gap-1.5">
          {canRedeemResetCredit && (
            <Button
              variant="outline"
              size="sm"
              disabled={loading || redeemingResetCredit || loadingResetCredits}
              onClick={(e) => {
                e.stopPropagation();
                onOpenResetCredits?.();
              }}
              className="h-auto min-h-0 min-w-0 gap-1 whitespace-normal break-words border-primary/40 px-1.5 py-1.5 text-[11px] text-primary"
            >
              <Icon
                name={
                  redeemingResetCredit || loadingResetCredits ? "progress_activity" : "restart_alt"
                }
                size={12}
                className={redeemingResetCredit || loadingResetCredits ? "animate-spin" : undefined}
              />
              <span className="min-w-0">{tr("manageResetCredits", "View credits")}</span>
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            disabled={!canEditCutoff}
            onClick={(e) => {
              e.stopPropagation();
              onOpenCutoff();
            }}
            className={`h-auto min-h-0 min-w-0 gap-1 whitespace-normal break-words px-1.5 py-1.5 text-[11px] ${
              hasCutoffOverrides ? "border-primary/40 text-primary" : ""
            }`}
          >
            <Icon name="tune" size={12} />
            <span className="min-w-0">{tr("editCutoffs", "Edit cutoffs")}</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onOpenCost();
            }}
            className="h-auto min-h-0 min-w-0 gap-1 whitespace-normal break-words px-1.5 py-1.5 text-[11px]"
          >
            <Icon name="bar_chart" size={12} />
            <span className="min-w-0">{t("usdCost")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
