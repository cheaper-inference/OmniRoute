"use client";
import { useLocale, useTranslations } from "next-intl";
import Card from "@/shared/components/Card";
import type { Detail } from "./helpers";
import { money } from "./helpers";

type Translate = ReturnType<typeof useTranslations>;
type BudgetStatus = NonNullable<Detail["budgetStatus"]>;

function isIncomplete(status: BudgetStatus) {
  return Boolean(status.hasUnpricedUsage || status.hasPartialRetainedUsage);
}

function meterColor(status: BudgetStatus) {
  if (status.exceeded) return "bg-error";
  return isIncomplete(status) ? "bg-warning" : "bg-primary";
}

function BudgetMeter({ status, used, t }: { status: BudgetStatus; used: number; t: Translate }) {
  const incomplete = isIncomplete(status);
  const percent = Math.min(100, (used / status.maxBudgetUsd) * 100);
  return (
    <div
      role="progressbar"
      aria-label={t("budgetTitle")}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={incomplete ? undefined : percent}
      aria-valuetext={
        incomplete ? t(status.hasUnpricedUsage ? "unpricedBudget" : "partialBudget") : undefined
      }
      className="h-2 rounded-full bg-bg overflow-hidden"
    >
      <div
        className={`h-full rounded-full ${meterColor(status)} motion-safe:transition-[width]`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

function BudgetNotices({
  status,
  used,
  locale,
  t,
}: {
  status: BudgetStatus;
  used: number;
  locale: string;
  t: Translate;
}) {
  const overBudget = used >= status.maxBudgetUsd;
  return (
    <>
      {status.hasUnpricedUsage && (!status.exceeded || overBudget) && (
        <p role="status" className="text-warning">
          {t("unpricedBudget")}
        </p>
      )}
      {status.hasPartialRetainedUsage && (
        <p role="status" className="text-warning">
          {t("partialBudget")}
        </p>
      )}
      {status.exceeded && (
        <p role="alert" className="text-error">
          {overBudget
            ? t("overBudget", { amount: money(used - status.maxBudgetUsd, locale) })
            : t("unpricedBudget")}
        </p>
      )}
    </>
  );
}

function BudgetFooter({
  status,
  used,
  locale,
  t,
}: {
  status: BudgetStatus;
  used: number;
  locale: string;
  t: Translate;
}) {
  const remaining = isIncomplete(status)
    ? "—"
    : money(Math.max(0, status.maxBudgetUsd - used), locale);
  const resetAt = new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(new Date(status.resetAtIso));
  return (
    <div className="flex flex-wrap justify-between gap-2 text-sm text-text-muted tabular-nums">
      <p>
        {t("remaining")}: {remaining}
      </p>
      <p>
        {t("resets")}: {resetAt} (UTC)
      </p>
    </div>
  );
}

function BudgetBody({ status, locale, t }: { status: BudgetStatus; locale: string; t: Translate }) {
  const used = status.estimatedListCostUsd ?? 0;
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between gap-2 tabular-nums">
        <p>
          {t("used")}: <strong>{money(used, locale)}</strong>
        </p>
        <p>
          {t("maximum")}: {money(status.maxBudgetUsd, locale)}
        </p>
      </div>
      <BudgetMeter status={status} used={used} t={t} />
      <BudgetNotices status={status} used={used} locale={locale} t={t} />
      <BudgetFooter status={status} used={used} locale={locale} t={t} />
    </div>
  );
}

export default function TeamBudgetCard({ detail }: { detail: Detail }) {
  const t = useTranslations("teamCosts");
  const locale = useLocale();
  const status = detail.budgetStatus;
  let body;
  if (detail.team.status === "archived") {
    body = <p className="text-text-muted">{t("archivedBudget")}</p>;
  } else if (!status) {
    body = (
      <p className="text-text-muted">
        {t(detail.team.maxBudgetUsd == null ? "unlimited" : "budgetUnavailable")}
      </p>
    );
  } else {
    body = <BudgetBody status={status} locale={locale} t={t} />;
  }
  return (
    <Card title={t("budgetTitle")} subtitle={t("budgetSubtitle")} icon="account_balance_wallet">
      {body}
    </Card>
  );
}
