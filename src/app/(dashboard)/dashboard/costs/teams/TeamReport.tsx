"use client";
import { useLocale, useTranslations } from "next-intl";
import Card from "@/shared/components/Card";
import { money, type Report, type Period } from "./helpers";

type Translate = ReturnType<typeof useTranslations>;

function PeriodSelect({
  period,
  pending,
  onPeriod,
  t,
}: {
  period: Period;
  pending: boolean;
  onPeriod: (period: Period) => void;
  t: Translate;
}) {
  return (
    <label className="text-sm">
      {t("reportPeriod")}
      <select
        aria-label={t("reportPeriod")}
        className="ml-2 rounded-control border border-border bg-bg p-2"
        value={period}
        disabled={pending}
        onChange={(e) => onPeriod(e.target.value as Period)}
      >
        <option value="7d">{t("day7")}</option>
        <option value="30d">{t("day30")}</option>
        <option value="all">{t("allTime")}</option>
      </select>
    </label>
  );
}

function Breakdown({
  report,
  locale,
  count,
  t,
}: {
  report: Report;
  locale: string;
  count: (value: number) => string;
  t: Translate;
}) {
  if (!report.byApiKey.length) return <p className="text-sm text-text-muted">{t("noUsage")}</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-text-muted">
          <tr>
            {["keyName", "requests", "tokens", "reportSpend"].map((key) => (
              <th key={key} className="p-3 font-medium">
                {t(key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {report.byApiKey.map((key) => (
            <tr key={key.apiKeyId ?? "deleted"} className="border-t border-border">
              <td className="p-3 max-w-64 break-words">{key.apiKeyName || t("unnamedKey")}</td>
              <td className="p-3 tabular-nums">{count(key.requests)}</td>
              <td className="p-3 tabular-nums">{count(key.inputTokens + key.outputTokens)}</td>
              <td className="p-3 tabular-nums whitespace-nowrap">
                {money(key.estimatedListCostUsd, locale)}
                {key.hasUnpricedUsage && (
                  <span className="block text-xs text-amber-700 dark:text-amber-400">
                    {t("unpriced")}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TeamReport({
  report,
  memberCount,
  period,
  pending,
  onPeriod,
}: {
  report: Report;
  memberCount: number;
  period: Period;
  pending: boolean;
  onPeriod: (period: Period) => void;
}) {
  const t = useTranslations("teamCosts");
  const locale = useLocale();
  const count = (value: number) => new Intl.NumberFormat(locale).format(value);
  return (
    <section className="space-y-4" aria-label={t("reportTitle")}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold">{t("reportTitle")}</h2>
          <p className="text-xs text-text-muted">{t("reportSubtitle")}</p>
        </div>
        <PeriodSelect period={period} pending={pending} onPeriod={onPeriod} t={t} />
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["reportSpend", money(report.summary.estimatedListCostUsd, locale), "payments"],
          ["requests", count(report.summary.requests), "query_stats"],
          ["assignedKeys", count(memberCount), "key"],
        ].map(([label, value, icon]) => (
          <Card key={label} padding="sm" title={t(label)} icon={icon}>
            <p className="text-xl font-semibold tabular-nums break-words">{value}</p>
          </Card>
        ))}
      </div>
      {report.summary.hasUnpricedUsage && (
        <p role="status" className="text-sm text-amber-700 dark:text-amber-400">
          {t("unpricedReport")}
        </p>
      )}
      <Card title={t("breakdown")} icon="receipt_long" padding="sm">
        <Breakdown report={report} locale={locale} count={count} t={t} />
      </Card>
    </section>
  );
}
