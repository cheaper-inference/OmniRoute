"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import type { StackedBarDatum } from "@omniroute/ui-kit/reporting-charts";
import Card from "../Card";
import { CHART_SERIES, getSeriesColor } from "./chartColors";
import { fmtCompact as fmt, fmtCost } from "@/shared/utils/formatting";

// The kit charts draw with recharts, which stays out of the analytics bundle: the two plots load
// on demand (client only), and the card keeps its place meanwhile.
const StackedBarChart = dynamic(
  () => import("@omniroute/ui-kit/reporting-charts").then((m) => m.StackedBarChart),
  { ssr: false, loading: () => <ChartPlaceholder height={215} /> }
);
const StackedAreaChart = dynamic(
  () => import("@omniroute/ui-kit/reporting-charts").then((m) => m.StackedAreaChart),
  { ssr: false, loading: () => <ChartPlaceholder height={240} /> }
);

function ChartPlaceholder({ height }: { height: number }) {
  return <div aria-hidden="true" style={{ height }} />;
}

/** The texts every kit chart on this screen takes from the catalog. */
function useChartLabels() {
  const t = useTranslations("analytics");
  return {
    totalLabel: t("chartTotal"),
    unavailableLabel: t("notAvailable"),
    emptyLabel: t("chartNoData"),
  };
}

// ── DailyTrendChart (kit StackedBarChart with the cost as a line) ──────────

interface DailyTrendRow {
  date: string;
  promptTokens?: number | null;
  completionTokens?: number | null;
  cost?: number | null;
}

export function DailyTrendChart({ dailyTrend }: { dailyTrend?: DailyTrendRow[] | null }) {
  const t = useTranslations("analytics");
  const labels = useChartLabels();
  const data = useMemo<StackedBarDatum[]>(
    () =>
      (dailyTrend || []).map((d) => ({
        id: d.date,
        label: d.date.slice(5),
        tooltipLabel: d.date,
        values: { input: d.promptTokens, output: d.completionTokens, cost: d.cost || 0 },
      })),
    [dailyTrend]
  );
  const hasCost = useMemo(() => data.some((d) => Number(d.values.cost) > 0), [data]);
  const title = t("chartModelUsageOverTime");

  if (!data.length) {
    return (
      <Card className="p-4">
        <h3 className="text-sm text-text-muted uppercase mb-3">{title}</h3>
        <div className="text-center text-text-muted text-sm py-8">{t("chartNoData")}</div>
      </Card>
    );
  }

  return (
    <Card className="p-4 flex-1">
      <h3 className="text-sm text-text-muted uppercase mb-3">{title}</h3>
      <StackedBarChart
        ariaLabel={title}
        data={data}
        series={[
          { key: "input", label: t("chartInput"), color: CHART_SERIES.input },
          { key: "output", label: t("chartOutput"), color: CHART_SERIES.output },
        ]}
        // The cost is another unit, so it is a line on its own axis and never part of the total.
        lineSeries={
          hasCost
            ? {
                key: "cost",
                label: t("chartCost"),
                color: CHART_SERIES.cost,
                valueFormatter: fmtCost,
                yTickFormatter: (value) => `$${value.toFixed(2)}`,
              }
            : undefined
        }
        valueFormatter={fmt}
        dataPointsLabel={(name) => t("chartDataPoints", { name })}
        {...labels}
      />
    </Card>
  );
}

// ── ModelOverTimeChart (kit StackedAreaChart) ──────────────────────────────

type DailyByModelRow = { date?: string } & Record<string, unknown>;

export function ModelOverTimeChart({
  dailyByModel,
  modelNames,
}: {
  dailyByModel?: DailyByModelRow[] | null;
  modelNames?: string[] | null;
}) {
  const t = useTranslations("analytics");
  const labels = useChartLabels();
  const models = useMemo(() => modelNames || [], [modelNames]);
  const data = useMemo<StackedBarDatum[]>(
    () =>
      (dailyByModel || []).map((d, index) => {
        const [, month, day] = (d.date || "").split("-");
        return {
          id: d.date || String(index),
          label: month && day ? `${month}/${day}` : d.date || "",
          tooltipLabel: d.date,
          // A day without a row for a model had no usage of it: a measured zero, not a gap.
          values: Object.fromEntries(models.map((m) => [m, Number(d[m]) || 0])),
        };
      }),
    [dailyByModel, models]
  );
  const title = t("chartModelUsageOverTime");

  if (!data.length || !models.length) {
    return (
      <Card className="p-4">
        <h3 className="text-sm text-text-muted uppercase mb-3">{title}</h3>
        <div className="text-center text-text-muted text-sm py-8">{t("chartNoData")}</div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="text-sm text-text-muted uppercase mb-3">{title}</h3>
      <StackedAreaChart
        ariaLabel={title}
        data={data}
        // Colours are pinned by position, so a model keeps its colour when the range changes.
        series={models.map((m, i) => ({ key: m, label: m, color: getSeriesColor(i) }))}
        valueFormatter={fmt}
        {...labels}
      />
    </Card>
  );
}
