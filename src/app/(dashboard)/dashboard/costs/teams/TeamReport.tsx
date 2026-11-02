"use client";
import { useLocale, useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import Card from "@/shared/components/Card";
import Select from "@/shared/components/Select";
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
    <Select
      label={t("reportPeriod")}
      compact
      value={period}
      disabled={pending}
      onChange={(e) => onPeriod(e.target.value as Period)}
    >
      <option value="7d">{t("day7")}</option>
      <option value="30d">{t("day30")}</option>
      <option value="all">{t("allTime")}</option>
    </Select>
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
    <Table
      className="text-sm"
      containerClassName="rounded-none border-0"
      scrollbarLabel={t("breakdown")}
    >
      <TableHeader>
        <TableRow>
          {["keyName", "requests", "tokens", "reportSpend"].map((key) => (
            <TableHead key={key} className="font-medium">
              {t(key)}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {report.byApiKey.map((key) => (
          <TableRow key={key.apiKeyId ?? "deleted"}>
            <TableCell className="max-w-64 break-words">
              {key.apiKeyName || t("unnamedKey")}
            </TableCell>
            <TableCell className="tabular-nums">{count(key.requests)}</TableCell>
            <TableCell className="tabular-nums">
              {count(key.inputTokens + key.outputTokens)}
            </TableCell>
            <TableCell className="tabular-nums whitespace-nowrap">
              {money(key.estimatedListCostUsd, locale)}
              {key.hasUnpricedUsage && (
                <span className="block text-xs text-warning">{t("unpriced")}</span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
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
        <p role="status" className="text-sm text-warning">
          {t("unpricedReport")}
        </p>
      )}
      <Card title={t("breakdown")} icon="receipt_long" padding="sm">
        <Breakdown report={report} locale={locale} count={count} t={t} />
      </Card>
    </section>
  );
}
