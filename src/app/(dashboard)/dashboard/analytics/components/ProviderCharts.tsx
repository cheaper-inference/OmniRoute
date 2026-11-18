"use client";

import { useMemo } from "react";
import { LineChart } from "@omniroute/ui-kit/reporting-charts";
import Card from "@/shared/components/Card";

interface ProviderChartsProps {
  /** Accessible name of the chart. */
  ariaLabel: string;
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

/**
 * Remaining quota per provider over time: the kit LineChart on a fixed 0–100 % axis. A provider
 * with no sample at a point has no measurement there; the line is drawn across the gap and the
 * tooltip still reads it as unavailable.
 */
export default function ProviderCharts({
  ariaLabel,
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
  const data = useMemo(
    () =>
      chartData.map((row, index) => {
        const timestamp = String(row.timestamp ?? "");
        return {
          id: `${timestamp}#${index}`,
          label: formatTimestamp(timestamp, range),
          tooltipLabel: formatTooltipTimestamp(timestamp, range),
          values: Object.fromEntries(
            providers.map((provider) => {
              const value = row[provider];
              return [provider, typeof value === "number" ? value : null];
            })
          ),
        };
      }),
    [chartData, providers, range, formatTimestamp, formatTooltipTimestamp]
  );
  const series = useMemo(
    () =>
      providers.map((provider) => ({
        key: provider,
        label: resolveProviderName(provider, nodeMap),
        color: providerColors.get(provider),
      })),
    [providers, providerColors, resolveProviderName, nodeMap]
  );

  return (
    <Card.Section>
      <LineChart
        ariaLabel={ariaLabel}
        data={data}
        series={series}
        yDomain={[0, 100]}
        connectNulls
        valueFormatter={formatPercent}
        height={264}
      />
    </Card.Section>
  );
}
