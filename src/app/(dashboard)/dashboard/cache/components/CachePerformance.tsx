"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Progress } from "@omniroute/ui-kit/progress";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import { Skeleton as KitSkeleton } from "@/shared/components/Loading";

interface CachePerformanceProps {
  hits?: number;
  misses?: number;
  hitRate?: string;
  avgLatencyMs?: number;
  p95LatencyMs?: number;
  totalRequests?: number;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

function HitRateBar({ hitRate, label }: { hitRate: number; label: string }) {
  const tone = hitRate >= 70 ? "success" : hitRate >= 40 ? "warning" : "danger";
  const textClass = hitRate >= 70 ? "text-success" : hitRate >= 40 ? "text-warning" : "text-error";
  const valueText = `${hitRate.toFixed(1)}%`;

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1.5" aria-hidden="true">
        <span className="text-text-muted">{label}</span>
        <span className={`font-semibold tabular-nums ${textClass}`}>{valueText}</span>
      </div>
      <Progress aria-label={label} aria-valuetext={valueText} value={hitRate} tone={tone} />
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton({ className }: { className?: string }) {
  return <KitSkeleton data-testid="skeleton" className={className} />;
}

// ─── CachePerformance ─────────────────────────────────────────────────────────

export default function CachePerformance({
  hits = 0,
  misses = 0,
  hitRate,
  avgLatencyMs,
  p95LatencyMs,
  totalRequests = 0,
  loading = false,
  error = null,
  onRetry,
  stats,
}: CachePerformanceProps) {
  const t = useTranslations("cache");
  // Parse hitRate string (e.g. "85.0%") to number for the bar
  const hitRateNum = hitRate ? parseFloat(hitRate) : 0;

  return (
    <Card>
      <div data-testid="cache-performance" className="p-5 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-sm">{t("performanceTitle")}</h2>
        </div>

        {/* Error state */}
        {error && (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-error">{error}</p>
            {onRetry && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="self-start"
                aria-label={t("cachePerformanceRetry")}
              >
                {t("retry")}
              </Button>
            )}
          </div>
        )}

        {/* Loading state */}
        {loading && !error && (
          <div className="flex flex-col gap-4">
            <Skeleton className="h-8 w-full" />
            <div className="grid grid-cols-3 gap-4 pt-3 border-t border-border/30">
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
            </div>
            {(avgLatencyMs !== undefined || p95LatencyMs !== undefined) && (
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-8" />
                <Skeleton className="h-8" />
              </div>
            )}
          </div>
        )}

        {/* Data state — hidden while loading */}
        {!loading && !error && stats !== null && (
          <>
            {/* Hit rate bar */}
            {hitRate !== undefined && (
              <HitRateBar hitRate={hitRateNum} label={t("cachePerformanceHitRate")} />
            )}

            {/* Hit / Miss / Total breakdown */}
            <div className="grid grid-cols-3 gap-4 pt-3 border-t border-border/30 text-center">
              <div>
                <div className="text-lg font-semibold tabular-nums text-success">{hits}</div>
                <div className="text-xs text-text-muted mt-0.5">{t("hits")}</div>
              </div>
              <div>
                <div className="text-lg font-semibold tabular-nums text-error">{misses}</div>
                <div className="text-xs text-text-muted mt-0.5">{t("misses")}</div>
              </div>
              <div>
                <div className="text-lg font-semibold tabular-nums">{totalRequests}</div>
                <div className="text-xs text-text-muted mt-0.5">{t("total")}</div>
              </div>
            </div>

            {/* Latency metrics */}
            {(avgLatencyMs !== undefined || p95LatencyMs !== undefined) && (
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border/30 text-center">
                {avgLatencyMs !== undefined && (
                  <div>
                    <div className="text-lg font-semibold tabular-nums">{avgLatencyMs}</div>
                    <div className="text-xs text-text-muted mt-0.5">
                      {t("cachePerformanceAvgLatency")}
                    </div>
                  </div>
                )}
                {p95LatencyMs !== undefined && (
                  <div>
                    <div className="text-lg font-semibold tabular-nums">{p95LatencyMs}</div>
                    <div className="text-xs text-text-muted mt-0.5">
                      {t("cachePerformanceP95Latency")}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* hitRate as text for test assertions */}
            {hitRate !== undefined && (
              <div className="text-center">
                <span className="text-sm font-semibold tabular-nums">{hitRate}</span>
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
}
