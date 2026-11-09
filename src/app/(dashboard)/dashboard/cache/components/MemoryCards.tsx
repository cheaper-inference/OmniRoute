"use client";

import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import { Skeleton } from "@/shared/components/Loading";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MemoryCardsProps {
  memoryEntries?: number;
  dbEntries?: number;
  hits?: number;
  misses?: number;
  hitRate?: string;
  tokensSaved?: number;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

// ─── Internal StatCard ────────────────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
  sub,
  valueClass = "text-text",
}: {
  icon: string;
  label: string;
  value: string | number;
  sub?: string;
  valueClass?: string;
}) {
  return (
    <div className="flex flex-col gap-1 p-4 rounded-lg bg-bg-subtle border border-border">
      <div className="flex items-center gap-1.5 text-text-muted text-xs">
        <Icon name={icon} size={16} />
        {label}
      </div>
      <div className={`text-2xl font-semibold tabular-nums ${valueClass}`}>{value}</div>
      {sub && <div className="text-xs text-text-muted">{sub}</div>}
    </div>
  );
}

// ─── Skeleton card ────────────────────────────────────────────────────────────

function SkeletonCard() {
  return <Skeleton data-testid="skeleton" className="h-24 rounded-lg" />;
}

// ─── MemoryCards ──────────────────────────────────────────────────────────────

export default function MemoryCards({
  memoryEntries = 0,
  dbEntries = 0,
  hits = 0,
  misses: _misses = 0,
  hitRate,
  tokensSaved = 0,
  loading = false,
  error = null,
  onRetry,
}: MemoryCardsProps) {
  const t = useTranslations("cache");

  if (loading) {
    return (
      <div
        data-testid="memory-cards"
        className="grid grid-cols-2 md:grid-cols-4 gap-4 transition-opacity duration-200"
      >
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (error) {
    return (
      <div
        data-testid="memory-cards"
        className="flex flex-col items-center gap-3 p-6 rounded-lg bg-bg-subtle border border-border text-center transition-opacity duration-200"
      >
        <Icon name="error_outline" size={30} className="text-error" />
        <p className="text-sm text-text-muted">{error}</p>
        {onRetry && (
          <Button variant="primary" size="sm" className="mt-1" onClick={onRetry}>
            {t("retry")}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div
      data-testid="memory-cards"
      className="grid grid-cols-2 md:grid-cols-4 gap-4 transition-opacity duration-200"
    >
      <StatCard
        icon="memory"
        label={t("memoryEntries")}
        value={memoryEntries}
        sub={t("memoryEntriesSub")}
      />
      <StatCard icon="storage" label={t("dbEntries")} value={dbEntries} sub={t("dbEntriesSub")} />
      <StatCard
        icon="trending_up"
        label={t("cacheHits")}
        value={hits}
        sub={hitRate ?? ""}
        valueClass="text-success"
      />
      <StatCard
        icon="token"
        label={t("tokensSaved")}
        value={tokensSaved}
        sub={t("tokensSavedSub")}
        valueClass="text-info"
      />
    </div>
  );
}
