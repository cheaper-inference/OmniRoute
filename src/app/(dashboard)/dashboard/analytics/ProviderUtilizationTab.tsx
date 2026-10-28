"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PROVIDER_COLORS as CHART_PROVIDER_COLORS } from "@/shared/components/analytics/chartColors";
import SegmentedControl from "@/shared/components/SegmentedControl";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import { useProviderNodeMap, resolveProviderName } from "@/lib/display/useProviderNodeMap";
import { getAccountDisplayName } from "@/lib/display/names";
import dynamic from "next/dynamic";

const ProviderCharts = dynamic(() => import("./components/ProviderCharts"), { ssr: false });
import Card from "@/shared/components/Card";
import ProviderIcon from "@/shared/components/ProviderIcon";
import TimeRangeSelector from "@/shared/components/analytics/TimeRangeSelector";
import type {
  ProviderUtilizationPoint,
  ProviderUtilizationResponse,
  UtilizationTimeRange,
} from "@/shared/types/utilization";

// Series colours: the kit chart tokens (shared analytics palette).
const PROVIDER_COLORS = CHART_PROVIDER_COLORS;

function formatTimestamp(value: string, range: UtilizationTimeRange) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  if (range === "1h" || range === "24h") {
    return new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
  }).format(date);
}

function formatTooltipTimestamp(value: string, range: UtilizationTimeRange) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: range === "1h" || range === "24h" ? "2-digit" : undefined,
    minute: range === "1h" || range === "24h" ? "2-digit" : undefined,
  }).format(date);
}

function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

function getLatestPoints(points: ProviderUtilizationPoint[]) {
  const latestByProvider = new Map<string, ProviderUtilizationPoint>();

  for (const point of points) {
    const current = latestByProvider.get(point.provider);
    if (!current || new Date(point.timestamp).getTime() > new Date(current.timestamp).getTime()) {
      latestByProvider.set(point.provider, point);
    }
  }

  return Array.from(latestByProvider.values()).sort((a, b) => b.remainingPct - a.remainingPct);
}

export default function ProviderUtilizationTab() {
  const t = useTranslations("analytics");
  const nodeMap = useProviderNodeMap();
  const [range, setRange] = useState<UtilizationTimeRange>("24h");
  const [aggregateBy, setAggregateBy] = useState<"provider" | "connection">("provider");
  const [data, setData] = useState<ProviderUtilizationResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUtilization = useCallback(
    async (
      selectedRange: UtilizationTimeRange,
      selectedAggregate: "provider" | "connection",
      signal?: AbortSignal
    ) => {
      setLoading(true);

      try {
        const response = await fetch(
          `/api/usage/utilization?range=${selectedRange}&aggregateBy=${selectedAggregate}`,
          {
            signal,
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch utilization data");
        }

        const json = (await response.json()) as ProviderUtilizationResponse;
        setData(json);
        setError(null);
      } catch (fetchError) {
        if (fetchError instanceof DOMException && fetchError.name === "AbortError") {
          return;
        }

        setError(
          fetchError instanceof Error ? fetchError.message : "Failed to fetch utilization data"
        );
        setData(null);
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    []
  );

  useEffect(() => {
    const controller = new AbortController();

    void (async () => {
      await fetchUtilization(range, aggregateBy, controller.signal);
    })();

    return () => controller.abort();
  }, [fetchUtilization, range, aggregateBy]);

  const providerColors = useMemo(() => {
    const colors = new Map<string, string>();

    for (const [index, provider] of (data?.providers ?? []).entries()) {
      colors.set(provider, PROVIDER_COLORS[index % PROVIDER_COLORS.length]);
    }

    return colors;
  }, [data?.providers]);

  const chartData = useMemo(() => {
    if (!data?.data.length) {
      return [];
    }

    const byTimestamp = new Map<string, Record<string, number | string>>();

    for (const point of data.data) {
      const entry = byTimestamp.get(point.timestamp) ?? {
        timestamp: point.timestamp,
        label: formatTimestamp(point.timestamp, data.timeRange),
      };

      entry[point.provider] = Number(point.remainingPct.toFixed(2));
      byTimestamp.set(point.timestamp, entry);
    }

    return Array.from(byTimestamp.entries())
      .sort(([left], [right]) => new Date(left).getTime() - new Date(right).getTime())
      .map(([, value]) => value);
  }, [data]);

  const latestPoints = useMemo(() => getLatestPoints(data?.data ?? []), [data?.data]);

  const resolveDisplayName = useCallback(
    (key: string) => {
      const colonIdx = key.indexOf(":");
      const isConnectionKey = aggregateBy === "connection" && colonIdx !== -1;
      if (isConnectionKey) {
        const connectionId = key.slice(colonIdx + 1);
        const connMeta = data?.connectionMeta?.[connectionId];
        return getAccountDisplayName({
          id: connectionId,
          email: connMeta?.email,
          name: connMeta?.name,
          displayName: connMeta?.displayName,
        });
      }
      return resolveProviderName(key, nodeMap);
    },
    [aggregateBy, data?.connectionMeta, nodeMap]
  );

  const hasData = Boolean(data?.data.length);
  const [retrying, setRetrying] = useState(false);

  const handleRetry = useCallback(() => {
    setRetrying(true);
    setError(null);
    fetchUtilization(range, aggregateBy).finally(() => setRetrying(false));
  }, [range, aggregateBy, fetchUtilization]);

  return (
    <div className="flex flex-col gap-6">
      <Card
        title={t("providerUtilizationTitle")}
        subtitle={t(`utilizationRange.${range}`)}
        icon="monitoring"
        action={
          <div className="flex items-center gap-4">
            <SegmentedControl
              size="sm"
              value={aggregateBy}
              onChange={(next) => setAggregateBy(next as typeof aggregateBy)}
              options={[
                { value: "provider", label: t("providerUtilizationGlobalView"), icon: "dns" },
                {
                  value: "connection",
                  label: t("providerUtilizationAccountSplit"),
                  icon: "account_tree",
                },
              ]}
            />
            <TimeRangeSelector value={range} onChange={setRange} />
          </div>
        }
        className="overflow-hidden"
      >
        {loading && !hasData ? (
          <div className="flex min-h-80 items-center justify-center text-sm text-text-muted">
            <Icon name="progress_activity" size={18} className="mr-2 animate-spin" />
            {t("providerUtilizationLoading")}
          </div>
        ) : error ? (
          <div className="flex min-h-80 flex-col items-center justify-center gap-4 text-center">
            <Icon name="error" size={32} className="text-error" />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-text-main">
                {t("providerUtilizationFailedToLoad")}
              </p>
              <p className="text-sm text-text-muted">{error}</p>
            </div>
            <Button onClick={handleRetry} loading={retrying} icon="refresh">
              {retrying ? t("retrying") : t("retry")}
            </Button>
          </div>
        ) : !hasData ? (
          <div className="flex min-h-80 flex-col items-center justify-center gap-4 text-center">
            <Icon name="timeline" size={40} className="text-text-muted/70" />
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-text-main">{t("providerUtilizationNoData")}</p>
              <p className="max-w-md text-sm text-text-muted">
                {t("providerUtilizationNoDataDescription")}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface-2 p-4">
              <p className="text-xs font-medium text-text-main">
                {t("providerUtilizationGettingStarted")}
              </p>
              <ul className="mt-2 text-left text-xs text-text-muted">
                <li className="flex items-start gap-2">
                  <Icon name="check_circle" size={14} className="text-primary" />
                  <span>
                    {t.rich("providerUtilizationStepConnect", {
                      strong: (chunks) => <strong>{chunks}</strong>,
                    })}
                  </span>
                </li>
                <li className="mt-1 flex items-start gap-2">
                  <Icon name="check_circle" size={14} className="text-primary" />
                  <span>{t("providerUtilizationStepEnable")}</span>
                </li>
                <li className="mt-1 flex items-start gap-2">
                  <Icon name="check_circle" size={14} className="text-primary" />
                  <span>{t("providerUtilizationStepAutomatic")}</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <ProviderCharts
              chartData={chartData}
              providers={data?.providers ?? []}
              providerColors={providerColors}
              range={range}
              resolveProviderName={resolveDisplayName}
              nodeMap={nodeMap}
              formatTimestamp={formatTimestamp}
              formatPercent={formatPercent}
              formatTooltipTimestamp={formatTooltipTimestamp}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {latestPoints.map((point) => {
                const isLow = point.remainingPct <= 20;

                // For Account Split, parse "provider:connectionId" and resolve display name
                const colonIdx = point.provider.indexOf(":");
                const isConnectionKey = aggregateBy === "connection" && colonIdx !== -1;
                const providerPart = isConnectionKey
                  ? point.provider.slice(0, colonIdx)
                  : point.provider;
                const connectionId = isConnectionKey ? point.provider.slice(colonIdx + 1) : null;
                const cardTitle = resolveDisplayName(point.provider);
                const cardSubtitle = isConnectionKey
                  ? `${providerPart} · account ${(connectionId ?? "").slice(0, 8)}…`
                  : t("providerUtilizationLatestSnapshot");

                return (
                  <Card.Section key={point.provider} className="flex h-full flex-col gap-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-text-main">
                          <ProviderIcon providerId={providerPart} size={22} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-text-main">{cardTitle}</p>
                          <p className="text-xs text-text-muted">{cardSubtitle}</p>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                          point.isExhausted
                            ? "bg-error/10 text-error"
                            : isLow
                              ? "bg-warning/10 text-warning"
                              : "bg-success/10 text-success"
                        }`}
                      >
                        {point.isExhausted
                          ? t("statusExhausted")
                          : isLow
                            ? t("statusLow")
                            : t("statusHealthy")}
                      </span>
                    </div>

                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="text-3xl font-bold text-text-main">
                          {point.remainingPct.toFixed(point.remainingPct < 10 ? 1 : 0)}%
                        </p>
                        <p className="mt-1 text-xs text-text-muted">
                          {t("providerUtilizationRemainingCapacity")}
                        </p>
                      </div>
                      <div className="text-right text-xs text-text-muted">
                        <p>{formatTooltipTimestamp(point.timestamp, range)}</p>
                        <p className="mt-1 uppercase tracking-[0.14em]">{point.windowKey}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="h-2 overflow-hidden rounded-full bg-surface-2">
                        <div
                          className={`h-full rounded-full transition-all ${
                            point.isExhausted ? "bg-error" : isLow ? "bg-warning" : "bg-primary"
                          }`}
                          style={{ width: `${Math.max(point.remainingPct, 0)}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-text-muted">
                        <span>0%</span>
                        <span>{t("remainingQuota")}</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </Card.Section>
                );
              })}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
