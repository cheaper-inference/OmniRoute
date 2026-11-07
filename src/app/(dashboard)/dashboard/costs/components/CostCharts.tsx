"use client";

import { Card } from "@/shared/components";
import { CHART_SERIES, getSeriesColor } from "@/shared/components/analytics/chartColors";
import { chartTheme } from "@omniroute/ui-kit/chart-theme";
import { LineChart } from "@omniroute/ui-kit/reporting-charts";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";

function createCurrencyFormatter(locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

interface UsageAnalyticsProviderRow {
  provider: string;
  requests: number;
  totalTokens: number;
  cost: number;
}

interface UsageAnalyticsTrendRow {
  date: string;
  cost: number;
}

export function ProviderSpendCard({
  title,
  rows,
  locale,
}: {
  title: string;
  rows: UsageAnalyticsProviderRow[];
  locale: string;
}) {
  const currencyFormatter = createCurrencyFormatter(locale);
  const chartRows = rows.slice(0, 6).map((row, index) => ({
    name: row.provider,
    value: row.cost,
    fill: getSeriesColor(index),
  }));

  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4">
        {title}
      </h3>
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="w-full md:w-45 h-45">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartRows}
                dataKey="value"
                nameKey="name"
                innerRadius={45}
                outerRadius={72}
                paddingAngle={2}
              >
                {chartRows.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                {...chartTheme.tooltip}
                formatter={(value: number) => currencyFormatter.format(value || 0)}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2">
          {chartRows.map((row) => (
            <div key={row.name} className="flex items-center justify-between gap-3 text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: row.fill }}
                />
                <span className="font-medium truncate max-w-[120px]">{row.name}</span>
              </div>
              <span className="text-text-muted shrink-0">
                {currencyFormatter.format(row.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export function CostTrendCard({
  title,
  rows,
  locale,
}: {
  title: string;
  rows: UsageAnalyticsTrendRow[];
  locale: string;
}) {
  const currencyFormatter = createCurrencyFormatter(locale);
  const chartRows = rows.map((row) => ({
    id: row.date,
    label: row.date.slice(5),
    values: { cost: row.cost || 0 },
  }));

  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4">
        {title}
      </h3>
      <LineChart
        ariaLabel={title}
        data={chartRows}
        series={[{ key: "cost", label: title, color: CHART_SERIES.cost }]}
        valueFormatter={(value) => currencyFormatter.format(value)}
        yTickFormatter={(value) => currencyFormatter.format(value).replace(".00", "")}
        height={220}
      />
    </Card>
  );
}

export function WeeklyPatternCard({
  title,
  rows,
  locale,
  tokensLabel,
}: {
  title: string;
  rows: Array<{ day: string; avgTokens: number; totalTokens: number }>;
  locale: string;
  tokensLabel: string;
}) {
  const chartData = rows.map((row) => ({
    day: row.day,
    tokens: row.avgTokens || 0,
  }));

  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4">
        {title}
      </h3>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={chartTheme.margin}>
            <XAxis {...chartTheme.xAxis} dataKey="day" interval={0} />
            <YAxis
              {...chartTheme.yAxis}
              tickFormatter={(value) =>
                new Intl.NumberFormat(locale, {
                  notation: "compact",
                }).format(Number(value || 0))
              }
            />
            <Tooltip
              {...chartTheme.tooltip}
              cursor={{ fill: "var(--color-surface-2)" }}
              formatter={(value: number) =>
                `${new Intl.NumberFormat(locale).format(value || 0)} ${tokensLabel}`
              }
            />
            <Bar dataKey="tokens" fill="var(--color-chart-3)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
