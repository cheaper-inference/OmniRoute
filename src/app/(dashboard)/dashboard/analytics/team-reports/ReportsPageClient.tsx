"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";

import type { AgentSessionReport } from "@/lib/usage/agentSessionReports";
import { Button, Card, SegmentedControl, SegmentedPanel, SegmentedTabs } from "@/shared/components";

import { BREAKDOWN_TABS, type DrillKind } from "./breakdownTabs";
import BreakdownTable from "./components/BreakdownTable";
import DrillPanel, { type DrillTarget } from "./components/DrillPanel";
import ExportMenu, { ExportNote } from "./components/ExportMenu";
import FilterChips from "./components/FilterChips";
import HeatmapView from "./components/HeatmapView";
import KpiCards from "./components/KpiCards";
import MatrixView from "./components/MatrixView";
import ReportFilters from "./components/ReportFilters";
import SessionsPanel from "./components/SessionsPanel";
import TrendsSection from "./components/TrendsSection";
import {
  emptyFilters,
  isBreakdownTab,
  parseReportView,
  presetWindow,
  serializeReportView,
  withFilterValue,
  type PresetChoice,
  type ReportFilterState,
  type FilterField,
  type ReportTab,
  type SessionOrder,
  type TimePreset,
  REPORT_TABS,
} from "./reportFilters";
import {
  DEFAULT_MATRIX_SELECTION,
  tabExportParams,
  type ExportFormat,
  type MatrixSelection,
} from "./reportExport";
import { trendDimensionFor } from "./reportViews";
import { useReportData } from "./useReportData";
import { useReportExport } from "./useReportExport";

/** The page's view state; the URL is read once, on first load, then follows the state. */
function useReportPageState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [initial] = useState(() => parseReportView(new URLSearchParams(searchParams?.toString())));
  const [preset, setPreset] = useState<PresetChoice>(initial.preset);
  const [filters, setFilters] = useState<ReportFilterState>(initial.filters);
  const [tab, setTab] = useState<ReportTab>(initial.tab);
  const [sessionOrder, setSessionOrder] = useState<SessionOrder>(initial.sessionOrder);

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
  const applyFilters = (pairs: Array<[FilterField, string]>) =>
    setFilters((current) =>
      pairs.reduce((next, [field, value]) => withFilterValue(next, field, value), current)
    );

  return {
    preset,
    filters,
    tab,
    setTab,
    sessionOrder,
    setSessionOrder,
    applyPreset,
    patchFilters,
    clearDimensionFilters,
    applyFilters,
  };
}

interface ReportTabViewProps {
  tab: ReportTab;
  report: AgentSessionReport | null | undefined;
  query: string;
  refreshToken: number;
  matrix: MatrixSelection;
  onMatrixChange: (selection: MatrixSelection) => void;
  sessionOrder: SessionOrder;
  onSessionOrderChange: (order: SessionOrder) => void;
  onFilter: (pairs: Array<[FilterField, string]>) => void;
  onOpen: (kind: DrillKind, key: string, label: string) => void;
}

/** The active tab's view: a breakdown, the matrix, the heatmap or the sessions. */
function ReportTabView(props: ReportTabViewProps) {
  const t = useTranslations("reports");
  const { tab, report, query, refreshToken, onFilter, onOpen } = props;
  if (isBreakdownTab(tab)) {
    const breakdownTab = BREAKDOWN_TABS[tab];
    const { filterField, drill } = breakdownTab;
    return (
      <BreakdownTable
        key={tab}
        rows={report?.breakdowns[tab] ?? []}
        nameHeader={t(breakdownTab.nameKey)}
        fallbackName={t(breakdownTab.fallbackKey)}
        extraCount={breakdownTab.extraCount}
        showDetail={breakdownTab.showDetail}
        defaultSort={breakdownTab.defaultSort}
        filterNone={breakdownTab.filterNone}
        onOpen={drill ? (row) => onOpen(drill, row.key, row.label || row.key) : undefined}
        onFilter={filterField ? (key) => onFilter([[filterField, key]]) : undefined}
      />
    );
  }
  if (tab === "matrix") {
    return (
      <MatrixView
        query={query}
        refreshToken={refreshToken}
        selection={props.matrix}
        onSelectionChange={props.onMatrixChange}
        onFilter={onFilter}
        onOpen={onOpen}
      />
    );
  }
  if (tab === "heatmap") return <HeatmapView query={query} refreshToken={refreshToken} />;
  return (
    <SessionsPanel
      query={query}
      refreshToken={refreshToken}
      order={props.sessionOrder}
      onOrderChange={props.onSessionOrderChange}
    />
  );
}

interface ReportToolbarProps {
  tab: ReportTab;
  exporting: boolean;
  onExport: (format: ExportFormat) => void;
  onRefresh: () => void;
}

function ReportToolbar({ tab, exporting, onExport, onRefresh }: ReportToolbarProps) {
  const t = useTranslations("reports");
  return (
    <div className="flex justify-end gap-2">
      <ExportMenu
        label={t("exportMenu")}
        onExport={onExport}
        disabled={tab === "heatmap" || exporting}
        disabledHint={tab === "heatmap" ? t("exportNoHeatmap") : undefined}
      />
      <Button size="sm" icon="refresh" onClick={onRefresh}>
        {t("refresh")}
      </Button>
    </div>
  );
}

/** The tab switcher and the active tab's view in one card. */
function ReportTabs({
  loading,
  onTabChange,
  ...view
}: ReportTabViewProps & { loading: boolean; onTabChange: (tab: ReportTab) => void }) {
  const t = useTranslations("reports");
  return (
    <SegmentedTabs
      value={view.tab}
      onChange={(value) => onTabChange(value as ReportTab)}
      className="flex flex-col gap-6"
    >
      <div className="overflow-x-auto">
        <SegmentedControl
          semantics="tabs"
          size="sm"
          aria-label={t("breakdown")}
          options={REPORT_TABS.map((value) => ({ value, label: t(`tab_${value}`) }))}
        />
      </div>

      {/* One panel: the active tab's view is rendered below, keyed by `tab`. */}
      <SegmentedPanel value={view.tab}>
        <Card padding="md" className={loading ? "opacity-60 transition-opacity" : undefined}>
          <ReportTabView {...view} />
        </Card>
      </SegmentedPanel>
    </SegmentedTabs>
  );
}

/** The load error, if any, and the KPI cards of the loaded report. */
function ReportStatus({
  failed,
  report,
}: {
  failed: boolean;
  report: AgentSessionReport | null | undefined;
}) {
  const t = useTranslations("reports");
  return (
    <>
      {failed && (
        <p className="rounded-lg border border-error/30 bg-error/10 p-3 text-sm text-error">
          {t("loadFailed")}
        </p>
      )}
      {report && <KpiCards totals={report.totals} />}
    </>
  );
}

export default function ReportsPageClient() {
  const tSidebar = useTranslations("sidebar");
  const tHeader = useTranslations("header");
  const view = useReportPageState();
  const { filters, tab, sessionOrder } = view;
  const [refreshToken, setRefreshToken] = useState(0);
  const [matrix, setMatrix] = useState<MatrixSelection>(DEFAULT_MATRIX_SELECTION);
  const { note: exportNote, busy: exporting, run: runExport } = useReportExport();
  const [drill, setDrill] = useState<DrillTarget | null>(null);
  const { query, loading, report, failed, facets } = useReportData(filters, refreshToken);

  const exportActiveTab = (format: ExportFormat) => {
    const params = tabExportParams(tab, format, query, sessionOrder, matrix);
    if (params) void runExport(params, format);
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        compact
        title={tSidebar("analyticsTeamReports")}
        description={tHeader("analyticsTeamReportsDescription")}
      />
      <ReportToolbar
        tab={tab}
        exporting={exporting}
        onExport={exportActiveTab}
        onRefresh={() => setRefreshToken((current) => current + 1)}
      />
      <ReportFilters
        filters={filters}
        preset={view.preset}
        facets={facets}
        onPreset={view.applyPreset}
        onChange={view.patchFilters}
      />
      <FilterChips
        filters={filters}
        facets={facets}
        onChange={view.patchFilters}
        onClear={view.clearDimensionFilters}
      />
      <ExportNote note={exportNote} />
      <ReportStatus failed={failed} report={report} />
      <Card padding="md">
        <TrendsSection
          query={query}
          dimension={trendDimensionFor(tab)}
          refreshToken={refreshToken}
        />
      </Card>
      <ReportTabs
        tab={tab}
        loading={loading}
        onTabChange={view.setTab}
        report={report}
        query={query}
        refreshToken={refreshToken}
        matrix={matrix}
        onMatrixChange={setMatrix}
        sessionOrder={sessionOrder}
        onSessionOrderChange={view.setSessionOrder}
        onFilter={view.applyFilters}
        onOpen={(kind, key, label) => setDrill({ kind, key, label })}
      />
      {drill && (
        <DrillPanel
          key={`${drill.kind}:${drill.key}`}
          target={drill}
          query={query}
          refreshToken={refreshToken}
          onClose={() => setDrill(null)}
          onApply={(field, key) => view.applyFilters([[field, key]])}
        />
      )}
    </div>
  );
}
