"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartTheme } from "@omniroute/ui-kit/chart-theme";
import Card from "@/shared/components/Card";

interface ProviderChartsProps {
  chartData: Array<Record<string, unknown>>;
  providers: string[];
  providerColors: Map<string, string>;
  range: string;
  resolveProviderName: (provider: string, _nodeMap: unknown) => string;
  nodeMap: unknown;
  formatTimestamp: (value: string, _range: string) => string;
  formatPercent: (value: number) => string;
  formatTooltipTimestamp: (value: string, _range: string) => string;
}

export default function ProviderCharts({
  chartData,
  providers,
  providerColors,
  range,
  resolveProviderName,
  nodeMap,
  formatTimestamp,
  formatPercent,
  formatTooltipTimestamp,
}: ProviderChartsProps) {
  return (
    <Card.Section className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={chartTheme.margin}>
          <CartesianGrid {...chartTheme.grid} />
          <XAxis
            {...chartTheme.xAxis}
            dataKey="timestamp"
            tickFormatter={(value) => formatTimestamp(String(value), range)}
          />
          <YAxis {...chartTheme.yAxis} domain={[0, 100]} tickFormatter={formatPercent} />
          <Legend />
          <Tooltip
            {...chartTheme.tooltip}
            wrapperStyle={{ zIndex: 1000, pointerEvents: "none" }}
            labelFormatter={(value) => formatTooltipTimestamp(String(value), range)}
            formatter={(value: number, name: string) => [formatPercent(value), name]}
          />
          {providers.map((provider) => (
            <Line
              {...chartTheme.line}
              key={provider}
              dataKey={provider}
              name={resolveProviderName(provider, nodeMap)}
              stroke={providerColors.get(provider) ?? "var(--color-primary)"}
              activeDot={{ r: 4, strokeWidth: 0 }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Card.Section>
  );
}
