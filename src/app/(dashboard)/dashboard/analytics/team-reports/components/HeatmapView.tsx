"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";

import { SegmentedControl } from "@/shared/components";

import {
  MONDAY_FIRST,
  formatMetric,
  heatColor,
  isHeatmap,
  mondayFirst,
  weekdayName,
} from "../reportViews";
import { useReportResource } from "../useReportResource";

type HeatmapMetric = "requests" | "costUsd";
const METRICS: HeatmapMetric[] = ["requests", "costUsd"];
const HOURS = Array.from({ length: 24 }, (_, hour) => hour);

interface HeatmapViewProps {
  /** Report filters as a query string. */
  query: string;
  refreshToken: number;
}

/** Requests or cost by local weekday and hour, Monday first. Mounted only while shown. */
export default function HeatmapView({ query, refreshToken }: HeatmapViewProps) {
  const t = useTranslations("reports");
  const [metric, setMetric] = useState<HeatmapMetric>("requests");
  const { data, loading, failed } = useReportResource(
    "/api/reports/heatmap",
    query,
    refreshToken,
    isHeatmap
  );

  const grid = data ? mondayFirst(data[metric]) : [];
  const max = data ? (metric === "requests" ? data.maxRequests : data.maxCostUsd) : 0;
  const metricName = t(metric === "requests" ? "metric_requests" : "metric_costUsd");

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-text-muted">{t("heatmapHelp")}</p>
        <SegmentedControl
          semantics="radio"
          size="sm"
          aria-label={t("heatmapMetric")}
          value={metric}
          onChange={(value) => setMetric(value as HeatmapMetric)}
          options={METRICS.map((value) => ({ value, label: t(`metric_${value}`) }))}
        />
      </div>
      {failed && <p className="text-sm text-error">{t("heatmapFailed")}</p>}
      {data && max > 0 ? (
        <div className={loading ? "opacity-60 transition-opacity" : undefined}>
          <Table className="text-xs" scrollbarLabel={t("heatmap")}>
            <TableHeader>
              <TableRow>
                <TableHead scope="col" className="sticky left-0 z-10 bg-surface text-left">
                  <span className="ci-sr-only">{t("heatmapWeekday")}</span>
                </TableHead>
                {HOURS.map((hour) => (
                  <TableHead key={hour} scope="col" className="px-0 text-center tabular-nums">
                    {hour}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {grid.map((hours, index) => {
                const day = weekdayName(MONDAY_FIRST[index]);
                return (
                  <TableRow key={day}>
                    <TableHead scope="row" className="sticky left-0 z-10 bg-surface text-left">
                      {day}
                    </TableHead>
                    {HOURS.map((hour) => {
                      const value = hours[hour] ?? 0;
                      const text = formatMetric(metric, value);
                      return (
                        <TableCell
                          key={hour}
                          title={`${day} ${String(hour).padStart(2, "0")}:00 - ${text} ${metricName}`}
                          className="h-8 min-w-6 border border-border/30 p-0"
                          style={{ backgroundColor: heatColor(value, max) }}
                        >
                          <span className="ci-sr-only">{text}</span>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className="mt-2 flex items-center gap-2 text-xs text-text-muted" aria-hidden="true">
            <span>{t("heatmapLess")}</span>
            {[0.1, 0.35, 0.6, 0.85, 1].map((share) => (
              <span
                key={share}
                className="inline-block size-4 rounded-sm border border-border/30"
                style={{ backgroundColor: heatColor(share, 1) }}
              />
            ))}
            <span>{t("heatmapMore", { max: formatMetric(metric, max) })}</span>
          </div>
        </div>
      ) : (
        !failed &&
        !loading && <p className="py-8 text-center text-sm text-text-muted">{t("noData")}</p>
      )}
    </div>
  );
}
