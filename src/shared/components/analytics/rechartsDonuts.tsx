"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { MetricDonut, type MetricDonutDatum } from "@omniroute/ui-kit/metric-charts";
import Card from "../Card";
import { getSeriesColor } from "./chartColors";
import {
  fmtCompact as fmt,
  fmtCost,
  formatApiKeyLabel as maskApiKeyLabel,
} from "@/shared/utils/formatting";
import { PROVIDER_COLORS } from "./chartColors";

/**
 * One donut card: the heading the screen already had and the kit `MetricDonut` (ring, total and
 * legend, with the values formatted by the caller). The card is the frame, so the kit figure
 * drops its own border, padding and minimum height.
 */
function DonutCard({
  title,
  data,
  formatter,
  className,
}: {
  title: string;
  data: MetricDonutDatum[];
  formatter: (value: number) => string;
  className?: string;
}) {
  const t = useTranslations("analytics");
  return (
    <Card className="p-4 flex-1">
      <h3 className="text-sm text-text-muted uppercase mb-3">{title}</h3>
      <MetricDonut
        label={title}
        data={data}
        valueFormatter={formatter}
        totalLabel={t("chartTotal")}
        unavailableLabel={t("notAvailable")}
        className={`min-h-0 border-0 bg-transparent p-0 ${className ?? ""}`.trim()}
      />
    </Card>
  );
}

function EmptyDonutCard({ title, message }: { title: string; message: string }) {
  return (
    <Card className="p-4 flex-1">
      <h3 className="text-sm text-text-muted uppercase mb-3">{title}</h3>
      <div className="text-center text-text-muted text-sm py-8">{message}</div>
    </Card>
  );
}

// ── AccountDonut ───────────────────────────────────────────────────────────

export function AccountDonut({ byAccount }) {
  const t = useTranslations("analytics");
  const data = useMemo<MetricDonutDatum[]>(
    () =>
      (byAccount || []).slice(0, 8).map((item, i) => ({
        key: `${item.account}-${i}`,
        label: item.account,
        value: item.totalTokens,
        color: getSeriesColor(i),
      })),
    [byAccount]
  );

  if (!data.length) {
    return <EmptyDonutCard title={t("chartByAccount")} message={t("chartNoData")} />;
  }
  return <DonutCard title={t("chartByAccount")} data={data} formatter={fmt} />;
}

// ── ApiKeyDonut ────────────────────────────────────────────────────────────

export function ApiKeyDonut({ byApiKey }) {
  const t = useTranslations("analytics");
  const data = useMemo<MetricDonutDatum[]>(
    () =>
      (byApiKey || []).slice(0, 8).map((item, i) => ({
        key: `${item.apiKeyName || item.apiKeyId || t("unknownApiKey")}-${i}`,
        label: maskApiKeyLabel(item.apiKeyName, item.apiKeyId),
        value: item.totalTokens,
        color: getSeriesColor(i),
      })),
    [byApiKey, t]
  );

  if (!data.length) {
    return <EmptyDonutCard title={t("chartByApiKey")} message={t("chartNoData")} />;
  }
  return <DonutCard title={t("chartByApiKey")} data={data} formatter={fmt} />;
}

// ── ProviderCostDonut ──────────────────────────────────────────────────────

export function ProviderCostDonut({ byProvider }) {
  const t = useTranslations("analytics");
  const data = useMemo<MetricDonutDatum[]>(
    () =>
      (byProvider || [])
        .filter((item) => item.cost > 0)
        .sort((a, b) => b.cost - a.cost)
        .slice(0, 8)
        .map((item, i) => ({
          key: `${item.provider}-${i}`,
          label: item.provider,
          value: item.cost,
          color: PROVIDER_COLORS[i % PROVIDER_COLORS.length],
        })),
    [byProvider]
  );

  if (!data.length) {
    return <EmptyDonutCard title={t("chartCostByProvider")} message={t("chartNoCostData")} />;
  }
  return (
    <DonutCard
      title={t("chartCostByProvider")}
      data={data}
      formatter={fmtCost}
      // Provider ids are lower case; the legend shows them capitalized, as before.
      className="[&_figcaption_span]:capitalize"
    />
  );
}
