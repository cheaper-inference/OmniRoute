"use client";

import { useCallback, useEffect, useState } from "react";
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
  if (percent >= 85) return "bg-rose-500";
  if (percent >= 65) return "bg-amber-500";
  return "bg-emerald-500";
}

const POLL_INTERVAL_MS = 3500;

export default function HomeSystemMetricsCards() {
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

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-3" aria-label="Métricas do Sistema">
      {/* Card CPU */}
      <div className="relative overflow-hidden rounded-xl border border-border/80 bg-bg-subtle/50 p-3.5 transition-colors hover:bg-bg-subtle/70">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
              <Icon name="speed" size={15} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-text-main">CPU</span>
                <span
                  className="size-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"
                  title="Monitoramento ativo"
                />
              </div>
              <span className="text-[11px] text-text-muted truncate block">
                {metrics
                  ? `${metrics.host.cpuCount} vCPUs • ${metrics.host.platform}`
                  : "Carregando..."}
              </span>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-sm font-semibold tabular-nums text-text-main">
              {metrics ? `${metrics.host.cpuPercent.toFixed(1)}%` : "--"}
            </span>
            <span className="block text-[10px] text-text-muted uppercase tracking-wider">
              VPS / Host
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-2.5 mb-2 h-1.5 w-full overflow-hidden rounded-full bg-bg-muted/30">
          <div
            className={`h-full rounded-full transition-all duration-500 ${getUsageBarColor(
              metrics?.host.cpuPercent ?? 0
            )}`}
            style={{
              width: `${Math.min(100, Math.max(0, metrics?.host.cpuPercent ?? 0))}%`,
            }}
          />
        </div>

        {/* Breakdown for OmniRoute process */}
        <div className="flex items-center justify-between text-[11px] text-text-muted pt-1 border-t border-border/30">
          <span>OmniRoute (Processo)</span>
          <span className="font-medium text-text-main tabular-nums">
            {metrics ? `${metrics.process.cpuPercent.toFixed(1)}%` : "--"}
          </span>
        </div>
      </div>

      {/* Card RAM */}
      <div className="relative overflow-hidden rounded-xl border border-border/80 bg-bg-subtle/50 p-3.5 transition-colors hover:bg-bg-subtle/70">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
              <Icon name="memory" size={15} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-text-main">Memória</span>
                <span
                  className="size-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"
                  title="Monitoramento ativo"
                />
              </div>
              <span className="text-[11px] text-text-muted truncate block">
                {metrics
                  ? `${formatBytes(metrics.host.memory.usedBytes)} / ${formatBytes(
                      metrics.host.memory.totalBytes
                    )}`
                  : "Carregando..."}
              </span>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-sm font-semibold tabular-nums text-text-main">
              {metrics ? `${metrics.host.memory.usedPercent.toFixed(1)}%` : "--"}
            </span>
            <span className="block text-[10px] text-text-muted uppercase tracking-wider">
              VPS / Host
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-2.5 mb-2 h-1.5 w-full overflow-hidden rounded-full bg-bg-muted/30">
          <div
            className={`h-full rounded-full transition-all duration-500 ${getUsageBarColor(
              metrics?.host.memory.usedPercent ?? 0
            )}`}
            style={{
              width: `${Math.min(100, Math.max(0, metrics?.host.memory.usedPercent ?? 0))}%`,
            }}
          />
        </div>

        {/* Breakdown for OmniRoute process */}
        <div className="flex items-center justify-between text-[11px] text-text-muted pt-1 border-t border-border/30">
          <span>OmniRoute (RSS / Heap)</span>
          <span className="font-medium text-text-main tabular-nums">
            {metrics
              ? `${formatBytes(metrics.process.memory.rssBytes)} (${formatBytes(
                  metrics.process.memory.heapUsedBytes
                )})`
              : "--"}
          </span>
        </div>
      </div>
    </section>
  );
}
