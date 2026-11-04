"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Icon from "@/shared/components/Icon";

export interface SystemMetrics {
  host: {
    cpuPercent: number;
    memory: {
      totalBytes: number;
      usedBytes: number;
      freeBytes: number;
      usedPercent: number;
    };
    cpuCount: number;
    platform: string;
  };
  process: {
    cpuPercent: number;
    memory: {
      rssBytes: number;
      heapUsedBytes: number;
      heapTotalBytes: number;
    };
    uptimeSeconds: number;
    pid: number;
  };
}

function formatBytes(bytes: number = 0): string {
  if (bytes <= 0) return "0 MB";
  const gb = bytes / (1024 * 1024 * 1024);
  if (gb >= 1) {
    return `${gb.toFixed(1)} GB`;
  }
  const mb = bytes / (1024 * 1024);
  return `${Math.round(mb)} MB`;
}

function getUsageBarColor(percent: number): string {
  if (percent >= 85) return "bg-error";
  if (percent >= 65) return "bg-warning";
  return "bg-success";
}

const POLL_INTERVAL_MS = 3500;

function UsageBar({ percent }: { percent: number }) {
  return (
    <div className="mt-2.5 mb-2 h-1.5 w-full overflow-hidden rounded-full bg-bg-muted/30">
      <div
        data-testid="usage-bar"
        className={`h-full rounded-full transition-all duration-500 ${getUsageBarColor(percent)}`}
        style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
      />
    </div>
  );
}

interface MetricCardProps {
  icon: string;
  title: string;
  activeTitle: string;
  subtitle: string;
  hostLabel: string;
  value: string;
  percent: number;
  breakdownLabel: string;
  breakdownValue: string;
}

function MetricCard({
  icon,
  title,
  activeTitle,
  subtitle,
  hostLabel,
  value,
  percent,
  breakdownLabel,
  breakdownValue,
}: MetricCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border/80 bg-bg-subtle/50 p-3.5 transition-colors hover:bg-bg-subtle/70">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
            <Icon name={icon} size={15} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-text-main">{title}</span>
              <span
                className="size-1.5 rounded-full bg-success animate-pulse shrink-0"
                title={activeTitle}
              />
            </div>
            <span className="text-[11px] text-text-muted truncate block">{subtitle}</span>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="text-sm font-semibold tabular-nums text-text-main">{value}</span>
          <span className="block text-[10px] text-text-muted uppercase tracking-wider">
            {hostLabel}
          </span>
        </div>
      </div>

      <UsageBar percent={percent} />

      {/* Breakdown for OmniRoute process */}
      <div className="flex items-center justify-between text-[11px] text-text-muted pt-1 border-t border-border/30">
        <span>{breakdownLabel}</span>
        <span className="font-medium text-text-main tabular-nums">{breakdownValue}</span>
      </div>
    </div>
  );
}

function useSystemMetrics(): SystemMetrics | null {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);

  const fetchMetrics = useCallback(async (signal?: AbortSignal) => {
    try {
      const res = await fetch("/api/system/metrics", {
        signal,
        cache: "no-store",
      });
      if (!res.ok) return;
      const data = (await res.json()) as SystemMetrics;
      setMetrics(data);
    } catch (err) {
      const isAbort = err instanceof DOMException && err.name === "AbortError";
      if (!isAbort) {
        // Silently tolerate transient scrape errors
      }
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let controller: AbortController | null = null;

    const tick = async () => {
      if (document.visibilityState === "visible") {
        const currentController = new AbortController();
        controller = currentController;
        await fetchMetrics(currentController.signal);
        if (controller === currentController) controller = null;
      }
      if (!cancelled) {
        timeoutId = setTimeout(tick, POLL_INTERVAL_MS);
      }
    };

    tick();

    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
      controller?.abort();
    };
  }, [fetchMetrics]);

  return metrics;
}

export default function HomeSystemMetricsCards() {
  const t = useTranslations("home");
  const metrics = useSystemMetrics();
  const loading = t("systemMetricsLoading");
  const placeholder = "--";
  const host = metrics?.host;
  const proc = metrics?.process;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-3" aria-label={t("systemMetricsTitle")}>
      <MetricCard
        icon="speed"
        title={t("systemMetricsCpu")}
        activeTitle={t("systemMetricsActive")}
        subtitle={
          host
            ? t("systemMetricsCpuCount", { count: host.cpuCount, platform: host.platform })
            : loading
        }
        hostLabel={t("systemMetricsHost")}
        value={host ? `${host.cpuPercent.toFixed(1)}%` : placeholder}
        percent={host?.cpuPercent ?? 0}
        breakdownLabel={t("systemMetricsProcessCpu")}
        breakdownValue={proc ? `${proc.cpuPercent.toFixed(1)}%` : placeholder}
      />
      <MetricCard
        icon="memory"
        title={t("systemMetricsMemory")}
        activeTitle={t("systemMetricsActive")}
        subtitle={
          host
            ? `${formatBytes(host.memory.usedBytes)} / ${formatBytes(host.memory.totalBytes)}`
            : loading
        }
        hostLabel={t("systemMetricsHost")}
        value={host ? `${host.memory.usedPercent.toFixed(1)}%` : placeholder}
        percent={host?.memory.usedPercent ?? 0}
        breakdownLabel={t("systemMetricsProcessMemory")}
        breakdownValue={
          proc
            ? `${formatBytes(proc.memory.rssBytes)} (${formatBytes(proc.memory.heapUsedBytes)})`
            : placeholder
        }
      />
    </section>
  );
}
