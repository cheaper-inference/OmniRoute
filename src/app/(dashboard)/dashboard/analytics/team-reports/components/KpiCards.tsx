"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

import type { ReportSummaryTotals } from "@/lib/usage/agentSessionReports";
import { Card } from "@/shared/components";
import { fmtCompact, formatCost } from "@/shared/utils/formatting";

import { CacheTokens, useTokenLabels } from "./TokenFigures";
import { NO_VALUE, formatLatency, formatRatio, formatSpan, splitTokens } from "./format";

interface KpiCard {
  label: string;
  value?: string;
  /** Several labelled figures in place of the single value. */
  figures?: Array<[string, ReactNode]>;
  /** One short line each, under the figures. */
  hints: string[];
}

function KpiGrid({ cards, className }: { cards: KpiCard[]; className: string }) {
  return (
    <div className={`grid grid-cols-2 gap-3 ${className}`}>
      {cards.map((card) => (
        <Card key={card.label} padding="sm">
          <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
            {card.label}
          </p>
          {card.figures ? (
            <dl className="mt-1 space-y-0.5">
              {card.figures.map(([term, value]) => (
                <div key={term} className="flex items-baseline justify-between gap-2">
                  <dt className="text-xs text-text-muted">{term}</dt>
                  <dd className="text-sm font-semibold tabular-nums text-text-main">{value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-1 text-xl font-semibold tabular-nums text-text-main">{card.value}</p>
          )}
          {card.hints.map((hint) => (
            <p key={hint} className="mt-0.5 text-xs text-text-muted">
              {hint}
            </p>
          ))}
        </Card>
      ))}
    </div>
  );
}

/** The summary cards: volume and cost on the first row, time, latency and cache on the second. */
export default function KpiCards({ totals }: { totals: ReportSummaryTotals }) {
  const t = useTranslations("reports");
  const tokenLabels = useTokenLabels();
  const tokens = splitTokens(totals.tokens);
  const errorRate = totals.requests ? ((totals.errors / totals.requests) * 100).toFixed(1) : "0";
  const volume: KpiCard[] = [
    {
      label: t("kpiCost"),
      value: formatCost(totals.costUsd),
      hints: [t("kpiUnpriced", { count: totals.unpricedRequests })],
    },
    {
      label: t("kpiTokens"),
      figures: [
        [tokenLabels.input, fmtCompact(tokens.input)],
        [tokenLabels.output, fmtCompact(tokens.output)],
        [tokenLabels.cache, <CacheTokens key="cache" split={tokens} />],
      ],
      hints: [],
    },
    {
      label: t("kpiSessions"),
      value: String(totals.sessions),
      hints: [t("kpiRequests", { count: totals.requests })],
    },
    {
      label: t("kpiErrors"),
      value: `${errorRate}%`,
      hints: [t("kpiErrorCount", { count: totals.errors })],
    },
    { label: t("kpiMembers"), value: String(totals.members), hints: [] },
    { label: t("kpiProjects"), value: String(totals.projects), hints: [] },
  ];
  const performance: KpiCard[] = [
    {
      label: t("kpiTime"),
      figures: [
        [t("kpiActiveTime"), formatSpan(totals.activeMs)],
        [t("kpiModelTime"), formatSpan(totals.modelMs)],
      ],
      hints: [t("helpActiveTime"), t("helpModelTime")],
    },
    {
      label: t("kpiLatency"),
      figures: [
        [t("kpiAvgLatency"), formatLatency(totals.avgLatencyMs)],
        [t("kpiP95Latency"), formatLatency(totals.p95LatencyMs)],
        [t("kpiAvgTtft"), formatLatency(totals.avgTtftMs)],
      ],
      hints: [],
    },
    { label: t("kpiCacheHitRate"), value: formatRatio(totals.cacheHitRate), hints: [] },
    {
      label: t("kpiCostPerSession"),
      value: totals.costPerSession == null ? NO_VALUE : formatCost(totals.costPerSession),
      hints: [],
    },
    { label: t("kpiReasoning"), value: fmtCompact(totals.tokens.reasoning), hints: [] },
  ];
  return (
    <div className="flex flex-col gap-3">
      <KpiGrid cards={volume} className="md:grid-cols-3 xl:grid-cols-6" />
      <KpiGrid cards={performance} className="md:grid-cols-3 xl:grid-cols-5" />
    </div>
  );
}
