"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { useTranslations } from "next-intl";
import { chartTheme } from "@omniroute/ui-kit/chart-theme";
import { LineChart } from "@omniroute/ui-kit/reporting-charts";
import type { InterceptedRequest } from "@/mitm/inspector/types";

const LATENCY_KEY = "ms";
const formatLatency = (value: number) => `${value}ms`;

interface StatsChartsProps {
  requests: InterceptedRequest[];
}

export default function StatsCharts({ requests }: StatsChartsProps) {
  const t = useTranslations("trafficInspector");

  const statusDist = requests.reduce<Record<string, number>>((acc, r) => {
    const key = typeof r.status === "number" ? `${Math.floor(r.status / 100)}xx` : String(r.status);
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
  const statusData = Object.entries(statusDist).map(([name, count]) => ({ name, count }));

  const latencyData = requests
    .filter((r) => r.totalLatencyMs != null)
    .slice(-50)
    .map((r, i) => ({
      id: String(i),
      label: String(i + 1),
      values: { [LATENCY_KEY]: r.totalLatencyMs },
    }));

  return (
    <div className="h-full overflow-auto p-4 space-y-6">
      <div>
        <h3 className="ci-eyebrow mb-3">{t("statsStatusDistribution")}</h3>
        <div style={{ height: 160 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statusData} margin={chartTheme.margin}>
              <XAxis {...chartTheme.xAxis} dataKey="name" interval={0} />
              <YAxis {...chartTheme.yAxis} />
              <Tooltip {...chartTheme.tooltip} cursor={{ fill: "var(--color-surface-2)" }} />
              <Bar dataKey="count" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {latencyData.length > 1 && (
        <div>
          <h3 className="ci-eyebrow mb-3">{t("statsLatency")}</h3>
          <LineChart
            ariaLabel={t("statsLatency")}
            data={latencyData}
            series={[{ key: LATENCY_KEY, label: t("statsLatency"), color: "var(--color-chart-2)" }]}
            valueFormatter={formatLatency}
            height={160}
          />
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="rounded-control border border-border bg-bg-subtle p-3">
          <div className="text-2xl font-bold text-text-main">{requests.length}</div>
          <div className="text-xs text-text-muted mt-1">{t("statsTotalRequests")}</div>
        </div>
        <div className="rounded-control border border-border bg-bg-subtle p-3">
          <div className="text-2xl font-bold text-success">
            {requests.filter((r) => typeof r.status === "number" && r.status < 400).length}
          </div>
          <div className="text-xs text-text-muted mt-1">{t("statsSuccessful")}</div>
        </div>
        <div className="rounded-control border border-border bg-bg-subtle p-3">
          <div className="text-2xl font-bold text-error">
            {
              requests.filter(
                (r) => r.status === "error" || (typeof r.status === "number" && r.status >= 400)
              ).length
            }
          </div>
          <div className="text-xs text-text-muted mt-1">{t("statsErrors")}</div>
        </div>
      </div>
    </div>
  );
}
