"use client";

import { Fragment, useState, useEffect, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import EmptyState from "@/shared/components/EmptyState";
import Icon from "@/shared/components/Icon";
import { Skeleton } from "@/shared/components/Loading";
import { useNotificationStore } from "@/store/notificationStore";
import { useTranslations } from "next-intl";

// ──────────────── Types ────────────────

interface ReasoningCacheEntry {
  toolCallId: string;
  provider: string;
  model: string;
  reasoning: string;
  charCount: number;
  createdAt: string;
  expiresAt: string;
}

interface ReasoningCacheStats {
  memoryEntries: number;
  dbEntries: number;
  totalEntries: number;
  totalChars: number;
  hits: number;
  misses: number;
  replays: number;
  replayRate: string;
  byProvider: Record<string, { entries: number; chars: number }>;
  byModel: Record<string, { entries: number; chars: number }>;
  oldestEntry: string | null;
  newestEntry: string | null;
}

interface ReasoningCacheData {
  stats: ReasoningCacheStats;
  entries: ReasoningCacheEntry[];
}

// ──────────────── Helpers ────────────────

function formatChars(chars: number): string {
  if (chars >= 1_000_000) return `${(chars / 1_000_000).toFixed(1)}M`;
  if (chars >= 1_000) return `${(chars / 1_000).toFixed(1)}K`;
  return String(chars);
}

// ──────────────── Sub-Components ────────────────

function StatCard({
  icon,
  label,
  value,
  sub,
  accent = "text-text-main",
}: {
  icon: string;
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-bg-subtle p-4">
      <div className="flex items-center gap-1.5 text-xs text-text-muted">
        <Icon name={icon} size={16} />
        <span>{label}</span>
      </div>
      <div className={`mt-3 text-2xl font-semibold tabular-nums ${accent}`}>{value}</div>
      {sub && <div className="mt-1 text-xs text-text-muted">{sub}</div>}
    </div>
  );
}

function SectionBadge({
  icon,
  children,
  tone = "neutral",
}: {
  icon: string;
  children: React.ReactNode;
  tone?: "neutral" | "green" | "amber" | "blue";
}) {
  const variant =
    tone === "green"
      ? "success"
      : tone === "amber"
        ? "warning"
        : tone === "blue"
          ? "info"
          : "default";

  return (
    <Badge variant={variant} icon={<Icon name={icon} size={14} />}>
      {children}
    </Badge>
  );
}

function InfoRow({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-2 text-sm text-text-muted">
      <Icon name={icon} size={16} className="mt-0.5 text-info" />
      <span>{children}</span>
    </div>
  );
}

// ──────────────── Main Component ────────────────

const REFRESH_INTERVAL_MS = 10_000;

export default function ReasoningCacheTab() {
  const t = useTranslations("cache");
  const notify = useNotificationStore();

  const [data, setData] = useState<ReasoningCacheData | null>(null);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  // Snapshot of "now" taken when the data lands (never during render — the
  // purity rule bars Date.now() there); entries only render after a fetch.
  const [nowMs, setNowMs] = useState(0);

  const timeAgo = (dateStr: string): string => {
    const diff = nowMs - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return t("justNow");
    if (minutes < 60) return t("minutesAgo", { minutes });
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return t("hoursAgo", { hours });
    const days = Math.floor(hours / 24);
    return t("daysAgo", { days });
  };

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/cache/reasoning");
      if (res.ok) {
        const json: ReasoningCacheData = await res.json();
        setNowMs(Date.now());
        setData(json);
      }
    } catch (error) {
      console.error("[ReasoningCacheTab] Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void (async () => {
      await fetchData();
    })();
    const id = setInterval(() => void fetchData(), REFRESH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [fetchData]);

  const handleClear = async () => {
    setClearing(true);
    try {
      const res = await fetch("/api/cache/reasoning", { method: "DELETE" });
      if (res.ok) {
        const result = await res.json();
        notify.success(t("reasoningClearSuccess", { count: result.cleared ?? 0 }));
        await fetchData();
      } else {
        notify.error(t("reasoningClearError"));
      }
    } catch {
      notify.error(t("reasoningClearError"));
    } finally {
      setClearing(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4" aria-busy="true">
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    );
  }

  if (!data) {
    return (
      <EmptyState
        icon="psychology"
        title={t("reasoningCache")}
        description={t("reasoningNoData")}
        actionLabel={t("refresh")}
        onAction={() => void fetchData()}
      />
    );
  }

  const { stats, entries } = data;
  const providerEntries = Object.entries(stats.byProvider).sort(
    ([, a], [, b]) => b.entries - a.entries
  );
  const modelEntries = Object.entries(stats.byModel).sort(([, a], [, b]) => b.entries - a.entries);
  const totalLookups = stats.hits + stats.misses;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <SectionBadge icon="psychology" tone="blue">
            {t("reasoningCache")}
          </SectionBadge>
          <div>
            <h2 className="text-lg font-semibold text-text-main">{t("reasoningCache")}</h2>
            <p className="mt-1 max-w-3xl text-sm text-text-muted">{t("reasoningCacheDesc")}</p>
          </div>
        </div>
        <Button
          variant="danger"
          icon="delete_sweep"
          size="sm"
          onClick={() => void handleClear()}
          disabled={clearing || loading || stats.totalEntries === 0}
          loading={clearing}
          aria-label={t("reasoningClearAll")}
        >
          {t("reasoningClearAll")}
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">
        <StatCard
          icon="psychology"
          label={t("reasoningEntries")}
          value={stats.totalEntries}
          sub={`${stats.memoryEntries} memory / ${stats.dbEntries} DB`}
          accent="text-info"
        />
        <StatCard
          icon="speed"
          label={t("reasoningReplayRate")}
          value={stats.replayRate}
          sub={`${totalLookups.toLocaleString()} lookups`}
          accent="text-success"
        />
        <StatCard
          icon="replay"
          label={t("reasoningReplays")}
          value={stats.replays.toLocaleString()}
          sub={t("reasoningBehaviorReplay")}
          accent="text-chart-2"
        />
        <StatCard
          icon="text_fields"
          label={t("reasoningCharsCached")}
          value={formatChars(stats.totalChars)}
          sub={`${stats.totalChars.toLocaleString()} chars`}
          accent="text-chart-4"
        />
        <StatCard
          icon="error_outline"
          label={t("reasoningMisses")}
          value={stats.misses.toLocaleString()}
          sub={`${stats.hits.toLocaleString()} hits`}
          accent="text-error"
        />
      </div>

      {/* By Provider */}
      {providerEntries.length > 0 && (
        <div className="rounded-xl border border-border bg-bg-subtle p-5">
          <h3 className="text-sm font-medium text-text-main">{t("reasoningByProvider")}</h3>
          <Table
            className="text-sm"
            containerClassName="mt-3"
            scrollbarLabel={t("reasoningByProvider")}
          >
            <TableHeader>
              <TableRow>
                <TableHead>{t("tableProvider")}</TableHead>
                <TableHead>{t("reasoningEntries")}</TableHead>
                <TableHead>{t("reasoningChars")}</TableHead>
                <TableHead>{t("tableShare")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {providerEntries.map(([prov, d]) => {
                const share =
                  stats.totalEntries > 0
                    ? ((d.entries / stats.totalEntries) * 100).toFixed(1)
                    : "0.0";
                return (
                  <TableRow key={prov}>
                    <TableCell className="font-medium text-text-main">{prov}</TableCell>
                    <TableCell className="tabular-nums text-text-main">
                      {d.entries.toLocaleString()}
                    </TableCell>
                    <TableCell className="tabular-nums text-chart-4">
                      {formatChars(d.chars)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 overflow-hidden rounded-full bg-border/60">
                          <div
                            className="h-full rounded-full bg-chart-1"
                            style={{
                              width: `${Math.min(parseFloat(share), 100)}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs font-semibold tabular-nums text-text-main">
                          {share}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {/* By Model */}
      {modelEntries.length > 0 && (
        <div className="rounded-xl border border-border bg-bg-subtle p-5">
          <h3 className="text-sm font-medium text-text-main">{t("reasoningByModel")}</h3>
          <Table
            className="text-sm"
            containerClassName="mt-3"
            scrollbarLabel={t("reasoningByModel")}
          >
            <TableHeader>
              <TableRow>
                <TableHead>{t("tableModel")}</TableHead>
                <TableHead>{t("reasoningEntries")}</TableHead>
                <TableHead>{t("reasoningAvgChars")}</TableHead>
                <TableHead>{t("reasoningChars")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {modelEntries.map(([mdl, d]) => {
                const avgChars = d.entries > 0 ? Math.round(d.chars / d.entries) : 0;
                return (
                  <TableRow key={mdl}>
                    <TableCell className="font-medium text-text-main">{mdl}</TableCell>
                    <TableCell className="tabular-nums text-text-main">
                      {d.entries.toLocaleString()}
                    </TableCell>
                    <TableCell className="tabular-nums text-chart-2">
                      {avgChars.toLocaleString()}
                    </TableCell>
                    <TableCell className="tabular-nums text-chart-4">
                      {formatChars(d.chars)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Recent Entries */}
      <div className="rounded-xl border border-border bg-bg-subtle p-5">
        <div className="mb-4 flex flex-col gap-1">
          <h3 className="text-sm font-medium text-text-main">{t("reasoningRecentEntries")}</h3>
          <p className="text-sm text-text-muted">{t("reasoningCacheDesc")}</p>
        </div>

        {entries.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border px-4 py-6 text-sm text-text-muted">
            {t("reasoningNoData")}
          </div>
        ) : (
          <Table
            className="text-sm"
            containerClassName="max-h-96 overflow-y-auto"
            scrollbarLabel={t("reasoningRecentEntries")}
          >
            <TableHeader className="sticky top-0 z-10 bg-surface">
              <TableRow>
                <TableHead>{t("reasoningToolCallId")}</TableHead>
                <TableHead>{t("tableProvider")}</TableHead>
                <TableHead>{t("tableModel")}</TableHead>
                <TableHead>{t("reasoningChars")}</TableHead>
                <TableHead>{t("reasoningAge")}</TableHead>
                <TableHead>
                  <span className="sr-only">{t("reasoningView")}</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => {
                const expanded = expandedId === entry.toolCallId;
                return (
                  <Fragment key={entry.toolCallId}>
                    <TableRow>
                      <TableCell
                        className="max-w-[16rem] truncate font-mono text-text-main"
                        title={entry.toolCallId}
                      >
                        {entry.toolCallId}
                      </TableCell>
                      <TableCell className="text-text-muted">{entry.provider}</TableCell>
                      <TableCell
                        className="max-w-[14rem] truncate text-text-muted"
                        title={entry.model}
                      >
                        {entry.model}
                      </TableCell>
                      <TableCell className="tabular-nums text-chart-4">
                        {entry.charCount.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-text-muted">{timeAgo(entry.createdAt)}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          icon={expanded ? "expand_less" : "visibility"}
                          onClick={() => setExpandedId(expanded ? null : entry.toolCallId)}
                          aria-expanded={expanded}
                          aria-label={t("reasoningView")}
                        />
                      </TableCell>
                    </TableRow>

                    {/* Expanded Detail */}
                    {expanded && (
                      <TableRow>
                        <TableCell colSpan={6} className="bg-bg-subtle">
                          <div className="mb-2 flex items-center gap-2 text-xs text-text-muted">
                            <Icon name="psychology" size={14} className="text-info" />
                            <span className="font-medium">
                              {t("reasoningDetail")} ({entry.toolCallId})
                            </span>
                          </div>
                          <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-bg p-4 font-mono text-xs leading-relaxed text-text-main">
                            {entry.reasoning}
                          </pre>
                          <div className="mt-3 flex flex-wrap gap-4 text-xs text-text-muted">
                            <span>
                              {t("tableProvider")}:{" "}
                              <span className="text-text-main">{entry.provider}</span>
                            </span>
                            <span>
                              {t("tableModel")}:{" "}
                              <span className="text-text-main">{entry.model}</span>
                            </span>
                            <span>
                              {t("created")}:{" "}
                              <span className="text-text-main">
                                {new Date(entry.createdAt).toLocaleString()}
                              </span>
                            </span>
                            <span>
                              {t("expires")}:{" "}
                              <span className="text-text-main">
                                {new Date(entry.expiresAt).toLocaleString()}
                              </span>
                            </span>
                            <span>
                              {t("reasoningChars")}:{" "}
                              <span className="text-chart-4">
                                {entry.charCount.toLocaleString()}
                              </span>
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Behavior Info */}
      <div className="rounded-xl border border-border bg-bg-subtle p-5">
        <h3 className="text-sm font-medium text-text-main">{t("reasoningBehavior")}</h3>
        <div className="mt-4 grid gap-3">
          <InfoRow icon="info">{t("reasoningBehaviorCapture")}</InfoRow>
          <InfoRow icon="info">{t("reasoningBehaviorReplay")}</InfoRow>
          <InfoRow icon="info">{t("reasoningBehaviorFallback")}</InfoRow>
          <InfoRow icon="info">{t("reasoningBehaviorTtl")}</InfoRow>
          <InfoRow icon="info">{t("reasoningBehaviorModels")}</InfoRow>
        </div>
      </div>
    </div>
  );
}
