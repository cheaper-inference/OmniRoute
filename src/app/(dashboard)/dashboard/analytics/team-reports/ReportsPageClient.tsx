"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import type { ReportDimension, ReportTotals } from "@/lib/usage/agentSessionReports";
import { Button, Card, SegmentedControl } from "@/shared/components";
import { fmtCompact, formatCost } from "@/shared/utils/formatting";

import BreakdownTable from "./components/BreakdownTable";
import FilterChips from "./components/FilterChips";
import ReportFilters from "./components/ReportFilters";
import SessionsPanel from "./components/SessionsPanel";
import { CacheTokens, useTokenLabels } from "./components/TokenFigures";
import { splitTokens } from "./components/format";
import {
  emptyFilters,
  parseReportView,
  presetWindow,
  serializeReportView,
  withFilterValue,
  type FilterField,
  type PresetChoice,
  type ReportFilterState,
  type ReportTab,
  type SessionOrder,
  type TimePreset,
  REPORT_TABS,
} from "./reportFilters";
import { useReportData } from "./useReportData";

interface BreakdownTabConfig {
  nameKey: string;
  fallbackKey: string;
  extraCount: "members" | "projects";
  filterField?: FilterField;
  /** The empty-key row filters by "none" (the dimension has a "No ..." filter option). */
  filterNone?: boolean;
  showDetail?: boolean;
  defaultSort?: "name";
}

const BREAKDOWN_TABS: Record<ReportDimension, BreakdownTabConfig> = {
  members: {
    nameKey: "member",
    fallbackKey: "unknownMember",
    extraCount: "projects",
    filterField: "apiKeyId",
    filterNone: true,
  },
  projects: {
    nameKey: "project",
    fallbackKey: "noProject",
    extraCount: "members",
    filterField: "projectName",
    filterNone: true,
    showDetail: true,
  },
  clients: {
    nameKey: "client",
    fallbackKey: "unknown",
    extraCount: "members",
    filterField: "client",
    filterNone: true,
  },
  providers: {
    nameKey: "provider",
    fallbackKey: "unknown",
    extraCount: "members",
    filterField: "provider",
  },
  models: {
    nameKey: "colModel",
    fallbackKey: "unknown",
    extraCount: "members",
    filterField: "model",
  },
  accounts: {
    nameKey: "account",
    fallbackKey: "unknown",
    extraCount: "members",
    filterField: "connectionId",
    showDetail: true,
  },
  daily: { nameKey: "colDate", fallbackKey: "unknown", extraCount: "members", defaultSort: "name" },
};

interface KpiCard {
  label: string;
  value?: string;
  /** Several labelled figures in place of the single value. */
  figures?: Array<[string, ReactNode]>;
  hint: string | null;
}

function KpiCards({ totals }: { totals: ReportTotals }) {
  const t = useTranslations("reports");
  const tokenLabels = useTokenLabels();
  const tokens = splitTokens(totals.tokens);
  const errorRate = totals.requests ? ((totals.errors / totals.requests) * 100).toFixed(1) : "0";
  const cards: KpiCard[] = [
    {
      label: t("kpiCost"),
      value: formatCost(totals.costUsd),
      hint: t("kpiUnpriced", { count: totals.unpricedRequests }),
    },
    {
      label: t("kpiTokens"),
      figures: [
        [tokenLabels.input, fmtCompact(tokens.input)],
        [tokenLabels.output, fmtCompact(tokens.output)],
        [tokenLabels.cache, <CacheTokens key="cache" split={tokens} />],
      ],
      hint: null,
    },
    {
      label: t("kpiSessions"),
      value: String(totals.sessions),
      hint: t("kpiRequests", { count: totals.requests }),
    },
    {
      label: t("kpiErrors"),
      value: `${errorRate}%`,
      hint: t("kpiErrorCount", { count: totals.errors }),
    },
    { label: t("kpiMembers"), value: String(totals.members), hint: null },
    { label: t("kpiProjects"), value: String(totals.projects), hint: null },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
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
                  <dd className="text-sm font-bold tabular-nums text-text-main">{value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-1 text-xl font-bold tabular-nums text-text-main">{card.value}</p>
          )}
          {card.hint && <p className="mt-0.5 text-xs text-text-muted">{card.hint}</p>}
        </Card>
      ))}
    </div>
  );
}

export default function ReportsPageClient() {
  const t = useTranslations("reports");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // The URL is read once, on first load; after that the state is the source and the URL follows.
  const [initial] = useState(() => parseReportView(new URLSearchParams(searchParams?.toString())));
  const [preset, setPreset] = useState<PresetChoice>(initial.preset);
  const [filters, setFilters] = useState<ReportFilterState>(initial.filters);
  const [tab, setTab] = useState<ReportTab>(initial.tab);
  const [sessionOrder, setSessionOrder] = useState<SessionOrder>(initial.sessionOrder);
  const [refreshToken, setRefreshToken] = useState(0);
  const [exportNote, setExportNote] = useState<string | null>(null);
  const { query, loading, report, failed, facets } = useReportData(filters, refreshToken);

  const urlQuery = useMemo(
    () => serializeReportView({ preset, filters, tab, sessionOrder }).toString(),
    [preset, filters, tab, sessionOrder]
  );
  const writtenQuery = useRef(searchParams?.toString() ?? "");
  useEffect(() => {
    if (urlQuery === writtenQuery.current) return;
    writtenQuery.current = urlQuery;
    // replace, not push: no history entry per filter change.
    router.replace(urlQuery ? `${pathname}?${urlQuery}` : pathname, { scroll: false });
  }, [urlQuery, pathname, router]);

  const applyPreset = (next: TimePreset) => {
    setPreset(next);
    setFilters((current) => ({ ...current, ...presetWindow(next) }));
  };
  // Stable, so the debounced search box does not restart its timer on every page render.
  const patchFilters = useCallback((patch: Partial<ReportFilterState>) => {
    if ("from" in patch || "to" in patch) setPreset("custom");
    setFilters((current) => ({ ...current, ...patch }));
  }, []);
  const clearDimensionFilters = () =>
    setFilters((current) => ({ ...emptyFilters("all"), from: current.from, to: current.to }));

  const exportCsv = async () => {
    const params = new URLSearchParams(query);
    params.set("type", tab);
    if (tab === "sessions") {
      params.set("sort", sessionOrder.sort);
      params.set("order", sessionOrder.desc ? "desc" : "asc");
    }
    setExportNote(null);
    try {
      const res = await fetch(`/api/reports/export?${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      // Keep the server's date-stamped name; fall back if the header is missing.
      const serverName = res.headers.get("Content-Disposition")?.match(/filename="([^"]+)"/)?.[1];
      link.download = serverName ?? `omniroute-report-${tab}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      if (res.headers.get("X-Report-Truncated") === "true") {
        setExportNote(t("exportTruncated", { total: Number(res.headers.get("X-Report-Total")) }));
      }
    } catch {
      setExportNote(t("exportFailed"));
    }
  };

  const breakdownTab = tab === "sessions" ? null : BREAKDOWN_TABS[tab];
  const filterField = breakdownTab?.filterField;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end gap-2">
        <Button variant="secondary" size="sm" icon="download" onClick={() => void exportCsv()}>
          {t("exportCsv")}
        </Button>
        <Button size="sm" icon="refresh" onClick={() => setRefreshToken((current) => current + 1)}>
          {t("refresh")}
        </Button>
      </div>

      <ReportFilters
        filters={filters}
        preset={preset}
        facets={facets}
        onPreset={applyPreset}
        onChange={patchFilters}
      />
      <FilterChips
        filters={filters}
        facets={facets}
        onChange={patchFilters}
        onClear={clearDimensionFilters}
      />

      {exportNote && (
        <p role="status" className="text-sm text-text-muted">
          {exportNote}
        </p>
      )}

      {failed && (
        <p className="rounded-lg border border-error/30 bg-error/10 p-3 text-sm text-error">
          {t("loadFailed")}
        </p>
      )}
      {report && <KpiCards totals={report.totals} />}

      <div className="overflow-x-auto">
        <SegmentedControl
          size="sm"
          aria-label={t("breakdown")}
          value={tab}
          onChange={(value) => setTab(value as ReportTab)}
          options={REPORT_TABS.map((value) => ({ value, label: t(`tab_${value}`) }))}
        />
      </div>

      <Card padding="md" className={loading ? "opacity-60 transition-opacity" : undefined}>
        {breakdownTab ? (
          <BreakdownTable
            key={tab}
            rows={report?.breakdowns[tab as ReportDimension] ?? []}
            nameHeader={t(breakdownTab.nameKey)}
            fallbackName={t(breakdownTab.fallbackKey)}
            extraCount={breakdownTab.extraCount}
            showDetail={breakdownTab.showDetail}
            defaultSort={breakdownTab.defaultSort}
            filterNone={breakdownTab.filterNone}
            onFilter={
              filterField
                ? (key) => setFilters((current) => withFilterValue(current, filterField, key))
                : undefined
            }
          />
        ) : (
          <SessionsPanel
            query={query}
            refreshToken={refreshToken}
            order={sessionOrder}
            onOrderChange={setSessionOrder}
          />
        )}
      </Card>
    </div>
  );
}
