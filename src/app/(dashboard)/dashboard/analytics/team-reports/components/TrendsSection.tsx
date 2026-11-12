"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import { SegmentedControl } from "@/shared/components";
import { categoricalSlot } from "@/shared/utils/categoricalPalette";

import {
  DIMENSION_INFO,
  TREND_METRICS,
  formatMetric,
  headerName,
  isTrends,
  type ReportTrendDimension,
  type ReportTrendMetric,
} from "../reportViews";
import { useReportResource } from "../useReportResource";
import type { TrendChartSeries } from "./TrendsChart";

// recharts stays out of the page's own bundle until a chart is shown.
const TrendsChart = dynamic(() => import("./TrendsChart"), {
  ssr: false,
  loading: () => <div className="h-full" aria-hidden="true" />,
});

interface TrendsSectionProps {
  /** Report filters as a query string; the dimension and metric are added here. */
  query: string;
  /** What the bars are stacked by. */
  dimension: ReportTrendDimension;
  refreshToken: number;
  /** A shorter chart, for the drill-down panels. */
  compact?: boolean;
}

const OTHER_COLOR = "var(--color-text-muted)";

export default function TrendsSection({
  query,
  dimension,
  refreshToken,
  compact = false,
}: TrendsSectionProps) {
  const t = useTranslations("reports");
  const [metric, setMetric] = useState<ReportTrendMetric>("costUsd");
  const trendsQuery = useMemo(() => {
    const params = new URLSearchParams(query);
    params.set("dimension", dimension);
    params.set("metric", metric);
    return params.toString();
  }, [query, dimension, metric]);
  const { data, loading, failed } = useReportResource(
    "/api/reports/trends",
    trendsQuery,
    refreshToken,
    isTrends
  );

  const fallback = t(DIMENSION_INFO[dimension].fallbackKey);
  const series = useMemo<(TrendChartSeries & { total: number; other: boolean })[]>(() => {
    let slot = 0;
    return (data?.series ?? []).map((entry) => ({
      name: headerName(entry, fallback, t("other")),
      color: entry.other ? OTHER_COLOR : categoricalSlot(slot++).colorVar,
      values: entry.values,
      other: entry.other,
      total: entry.values.reduce((sum, value) => sum + value, 0),
    }));
  }, [data, fallback, t]);

  const dimensionName = t(DIMENSION_INFO[dimension].nameKey);
  const days = data?.days ?? [];
  const total = series.reduce((sum, entry) => sum + entry.total, 0);
  const largest = [...series].filter((entry) => !entry.other).sort((a, b) => b.total - a.total)[0];
  const metricName = t(`metric_${metric}`);
  const summary = t("trendsSummary", {
    metric: metricName,
    dimension: dimensionName,
    bucket: data?.bucket ?? "day",
    total: formatMetric(metric, total),
    count: days.length,
    top: largest ? `${largest.name} (${formatMetric(metric, largest.total)})` : "-",
  });

  return (
    <section className="space-y-3" aria-label={t("trends")}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-text-main">{t("trends")}</h3>
          <p className="text-xs text-text-muted">{t("trendsBy", { dimension: dimensionName })}</p>
        </div>
        <SegmentedControl
          semantics="radio"
          size="sm"
          aria-label={t("trendsMetric")}
          value={metric}
          onChange={(value) => setMetric(value as ReportTrendMetric)}
          options={TREND_METRICS.map((value) => ({ value, label: t(`metric_${value}`) }))}
        />
      </div>

      {data?.bucket === "week" && (
        <p role="note" className="text-xs text-text-muted">
          {t("trendsWeekly")}
        </p>
      )}
      {failed && <p className="text-sm text-error">{t("trendsFailed")}</p>}

      {data && days.length > 0 && total > 0 ? (
        <div className={loading ? "opacity-60 transition-opacity" : undefined}>
          <div
            role="img"
            aria-label={summary}
            className={`${compact ? "h-44" : "h-64"} w-full rounded-xl border border-border bg-surface-2 px-3 py-4`}
          >
            <TrendsChart days={days} series={series} metric={metric} />
          </div>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-muted">
            {series.map((entry, index) => (
              <li key={`${index}-${entry.name}`} className="flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="inline-block size-2.5 rounded-sm"
                  style={{ background: entry.color }}
                />
                <span className={entry.other ? "italic" : undefined}>{entry.name}</span>
                <span className="tabular-nums">({formatMetric(metric, entry.total)})</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        !failed &&
        !loading && <p className="py-6 text-center text-sm text-text-muted">{t("noData")}</p>
      )}
    </section>
  );
}
