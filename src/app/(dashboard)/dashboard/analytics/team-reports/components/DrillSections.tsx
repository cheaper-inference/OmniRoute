"use client";

import { useTranslations } from "next-intl";

import type {
  AgentSessionReportRow,
  ReportBreakdownRow,
  ReportSummaryTotals,
} from "@/lib/usage/agentSessionReports";
import { Button } from "@/shared/components";
import { fmtCompact, formatCost } from "@/shared/utils/formatting";

import { NO_VALUE, formatDateTime, formatLatency, formatRatio, formatSpan } from "./format";

/** The panel's headline figures, time spent included. */
export function DrillKpis({ totals }: { totals: ReportSummaryTotals }) {
  const t = useTranslations("reports");
  const errorRate = totals.requests
    ? `${((totals.errors / totals.requests) * 100).toFixed(1)}%`
    : "0%";
  const figures: Array<[string, string]> = [
    [t("kpiCost"), formatCost(totals.costUsd)],
    [t("metric_requests"), totals.requests.toLocaleString()],
    [t("kpiSessions"), String(totals.sessions)],
    [t("kpiTokens"), fmtCompact(totals.tokens.total)],
    [t("kpiErrors"), errorRate],
    [t("kpiActiveTime"), formatSpan(totals.activeMs)],
    [t("kpiModelTime"), formatSpan(totals.modelMs)],
    [t("kpiAvgLatency"), formatLatency(totals.avgLatencyMs)],
    [t("kpiCacheHitRate"), formatRatio(totals.cacheHitRate)],
  ];
  return (
    <dl className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {figures.map(([term, value]) => (
        <div key={term} className="rounded-lg border border-border bg-surface-2 px-3 py-2">
          <dt className="text-xs text-text-muted">{term}</dt>
          <dd className="text-base font-bold tabular-nums text-text-main">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

const TOP_COUNT = 5;

/** The five most expensive rows of one breakdown. */
export function DrillTopList({
  title,
  rows,
  fallback,
}: {
  title: string;
  rows: ReportBreakdownRow[];
  fallback: string;
}) {
  const t = useTranslations("reports");
  const top = [...rows].sort((a, b) => b.costUsd - a.costUsd).slice(0, TOP_COUNT);
  return (
    <section className="space-y-1.5" aria-label={title}>
      <h4 className="text-sm font-semibold text-text-main">{title}</h4>
      {top.length === 0 ? (
        <p className="text-xs text-text-muted">{t("noData")}</p>
      ) : (
        <ul className="divide-y divide-border/40 text-sm">
          {top.map((row) => (
            <li
              key={row.key || "none"}
              className="flex items-baseline justify-between gap-3 py-1.5"
            >
              <span className="min-w-0 truncate">{row.label || row.key || fallback}</span>
              <span className="shrink-0 text-xs tabular-nums text-text-muted">
                {t("kpiRequests", { count: row.requests })}
              </span>
              <span className="shrink-0 font-mono tabular-nums text-success">
                {formatCost(row.costUsd)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/** The latest sessions; each names the project (member panel) or the member (project panel). */
export function DrillSessions({
  sessions,
  kind,
  onSelect,
}: {
  sessions: AgentSessionReportRow[];
  kind: "member" | "project";
  onSelect: (id: string) => void;
}) {
  const t = useTranslations("reports");
  return (
    <section className="space-y-1.5" aria-label={t("drillRecentSessions")}>
      <h4 className="text-sm font-semibold text-text-main">{t("drillRecentSessions")}</h4>
      {sessions.length === 0 ? (
        <p className="text-xs text-text-muted">{t("noData")}</p>
      ) : (
        <ul className="divide-y divide-border/40 text-sm">
          {sessions.map((session) => {
            const who =
              (kind === "member" ? session.projectName : session.apiKeyName) ?? t("unknown");
            return (
              <li key={session.id} className="space-y-0.5 py-1.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="min-w-0 truncate font-medium">{who}</span>
                  <span className="flex shrink-0 items-center gap-2">
                    <span className="font-mono tabular-nums text-success">
                      {formatCost(session.costUsd)}
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => onSelect(session.id)}>
                      {t("details")}
                    </Button>
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-3 text-xs text-text-muted">
                  <span>{formatDateTime(session.lastSeenAt)}</span>
                  <span className="tabular-nums">
                    {t("kpiRequests", { count: session.requests })}
                  </span>
                  <span className="tabular-nums">
                    {t("kpiActiveTime")}:{" "}
                    {session.activeMs == null ? NO_VALUE : formatSpan(session.activeMs)}
                  </span>
                  {session.gitBranch && <span className="font-mono">{session.gitBranch}</span>}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
