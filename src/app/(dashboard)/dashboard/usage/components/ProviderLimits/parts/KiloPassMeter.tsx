"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Progress, type ProgressBand } from "@omniroute/ui-kit/progress";
import { getBarColor } from "../utils";
import { translateUsageOrFallback } from "../i18nFallback";
import Icon from "@/shared/components/Icon";

interface KiloPassMeterProps {
  base: number;
  bonus: number;
  used: number;
  total: number;
  remaining: number;
  nextBillingAt?: string | null;
  balance?: number | null;
}

function formatCurrency(value: number, currency: string = "USD"): string {
  return value.toLocaleString(undefined, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function calculateDaysUntil(dateString: string | null | undefined): number | null {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return null;
    const now = Date.now();
    const diff = date.getTime() - now;
    if (diff <= 0) return null;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  } catch {
    return null;
  }
}

type KiloPassMeterValues = Pick<
  KiloPassMeterProps,
  "base" | "bonus" | "used" | "total" | "remaining"
>;

function nonNegativeNumber(value: number): number {
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

function percentage(value: number, total: number): number {
  return total > 0 ? Math.min(100, (value / total) * 100) : 0;
}

export function buildKiloPassMeterModel({
  base,
  bonus,
  used,
  total,
  remaining,
}: KiloPassMeterValues) {
  const paid = nonNegativeNumber(base);
  const bonusAmount = nonNegativeNumber(bonus);
  const usedAmount = nonNegativeNumber(used);
  const totalAmount = nonNegativeNumber(total);
  const remainingAmount = nonNegativeNumber(remaining);
  const paidUsed = Math.min(usedAmount, paid);
  const bonusUsed = Math.min(Math.max(usedAmount - paid, 0), bonusAmount);

  return {
    paid,
    bonus: bonusAmount,
    used: usedAmount,
    total: totalAmount,
    remaining: remainingAmount,
    paidUsed,
    bonusUsed,
    progressValue: Math.min(totalAmount, usedAmount),
    paidPercent: percentage(paid, totalAmount),
    bonusPercent: percentage(bonusAmount, totalAmount),
    paidUsedPercent: percentage(paidUsed, paid),
    bonusUsedPercent: percentage(bonusUsed, bonusAmount),
    hasPaidSegment: paid > 0,
    hasBonusSegment: bonusAmount > 0,
  };
}

function BandLegend({
  dotClassName,
  label,
  amount,
}: {
  dotClassName: string;
  label: string;
  amount: number;
}) {
  return (
    <div className="min-w-0 text-[11px] text-text-main">
      <div className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5 leading-4">
        <span
          className={`inline-block size-2 shrink-0 rounded-full ${dotClassName}`}
          aria-hidden="true"
        />
        <span>{label}</span>
      </div>
      <span className="block pt-0.5 font-semibold tabular-nums">{formatCurrency(amount)}</span>
    </div>
  );
}

export default function KiloPassMeter({
  base,
  bonus,
  used,
  total,
  remaining,
  nextBillingAt,
  balance,
}: KiloPassMeterProps) {
  const t = useTranslations("usage");
  const locale = useLocale();

  const model = useMemo(
    () => buildKiloPassMeterModel({ base, bonus, used, total, remaining }),
    [base, bonus, used, total, remaining]
  );

  const colors = getBarColor(
    model.total > 0 ? 100 - (model.progressValue / model.total) * 100 : 100
  );
  const meterLabel = translateUsageOrFallback(t, "kiloPassMeterLabel", "Kilo Pass usage meter");
  const paidLabel = translateUsageOrFallback(t, "kiloPassPaid", "Paid");
  const bonusLabel = translateUsageOrFallback(t, "kiloPassBonus", "Available bonus");
  // Bands without capacity are dropped by the kit; with none left it draws the empty `value` bar.
  const bands: ProgressBand[] = [
    {
      id: "paid",
      label: paidLabel,
      value: model.paidUsed,
      max: model.paid,
      tone: "success",
      valueText: `${formatCurrency(model.paidUsed)} of ${formatCurrency(model.paid)}`,
      legend: <BandLegend dotClassName="bg-success" label={paidLabel} amount={model.paid} />,
    },
    {
      id: "bonus",
      label: bonusLabel,
      value: model.bonusUsed,
      max: model.bonus,
      tone: "info",
      valueText: `${formatCurrency(model.bonusUsed)} of ${formatCurrency(model.bonus)}`,
      legend: <BandLegend dotClassName="bg-info" label={bonusLabel} amount={model.bonus} />,
    },
  ];
  const daysUntilRenewal = calculateDaysUntil(nextBillingAt);
  const renewalDate = nextBillingAt
    ? new Date(nextBillingAt).toLocaleDateString(locale, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="flex flex-col gap-2 py-2">
      {/* Header: Usage / Total */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-[12px] font-medium text-text-main">
          {translateUsageOrFallback(t, "kiloPassUsageLabel", "This month's usage")}
        </span>
        <span className="text-[12px] font-semibold tabular-nums" style={{ color: colors.text }}>
          {formatCurrency(model.used)} / {formatCurrency(model.total)}
        </span>
      </div>

      {/* Kit Progress bands (kit #190): paid and bonus each get a track sized by their
          capacity and their own used fill; paid credits are spent first. */}
      <Progress
        aria-label={meterLabel}
        bands={bands}
        value={model.progressValue}
        max={model.total}
        animate={false}
      />

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-text-main">
        <div className="flex items-center gap-1.5">
          <Icon name="account_balance_wallet" size={13} className="text-text-muted" />
          <span>{translateUsageOrFallback(t, "kiloPassRemaining", "Remaining")}</span>
          <span className="font-semibold tabular-nums">{formatCurrency(model.remaining)}</span>
        </div>
      </div>

      {/* Renewal info */}
      {daysUntilRenewal !== null && renewalDate && (
        <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
          <Icon name="schedule" size={13} />
          <span>
            {translateUsageOrFallback(t, "kiloPassRenews", "Renews in {count} days", {
              count: daysUntilRenewal,
            })}
          </span>
          <span className="tabular-nums">({renewalDate})</span>
        </div>
      )}

      {/* Account Balance (separate from Kilo Pass) */}
      {balance !== null && balance !== undefined && (
        <div className="flex items-center justify-between gap-2 border-t border-border/40 pt-2 text-[11px]">
          <div className="flex items-center gap-1.5">
            <Icon name="payments" size={13} className="text-text-muted" />
            <span className="text-text-main">
              {translateUsageOrFallback(t, "kiloAccountBalance", "Account Balance")}
            </span>
          </div>
          <span className="font-semibold tabular-nums text-text-main">
            {formatCurrency(balance)}
          </span>
        </div>
      )}
    </div>
  );
}
