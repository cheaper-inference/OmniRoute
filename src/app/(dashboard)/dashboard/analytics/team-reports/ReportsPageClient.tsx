"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { Button, Card, SegmentedControl } from "@/shared/components";

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
  const [matrix, setMatrix] = useState<MatrixSelection>(DEFAULT_MATRIX_SELECTION);
  const { note: exportNote, busy: exporting, run: runExport } = useReportExport();
  const [drill, setDrill] = useState<DrillTarget | null>(null);
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

  const exportActiveTab = (format: ExportFormat) => {
    const params = tabExportParams(tab, format, query, sessionOrder, matrix);
    if (params) void runExport(params, format);
  };

  const breakdownTab = isBreakdownTab(tab) ? BREAKDOWN_TABS[tab] : null;
  const filterField = breakdownTab?.filterField;
  const drillKind = breakdownTab?.drill;
  const openDrill = (kind: DrillKind, key: string, label: string) => setDrill({ kind, key, label });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end gap-2">
        <ExportMenu
          label={t("exportMenu")}
          onExport={exportActiveTab}
          disabled={tab === "heatmap" || exporting}
          disabledHint={tab === "heatmap" ? t("exportNoHeatmap") : undefined}
        />
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

      <ExportNote note={exportNote} />

      {failed && (
        <p className="rounded-lg border border-error/30 bg-error/10 p-3 text-sm text-error">
          {t("loadFailed")}
        </p>
      )}
      {report && <KpiCards totals={report.totals} />}

      <Card padding="md">
        <TrendsSection
          query={query}
          dimension={trendDimensionFor(tab)}
          refreshToken={refreshToken}
        />
      </Card>

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
            rows={report?.breakdowns[tab] ?? []}
            nameHeader={t(breakdownTab.nameKey)}
            fallbackName={t(breakdownTab.fallbackKey)}
            extraCount={breakdownTab.extraCount}
            showDetail={breakdownTab.showDetail}
            defaultSort={breakdownTab.defaultSort}
            filterNone={breakdownTab.filterNone}
            onOpen={
              drillKind ? (row) => openDrill(drillKind, row.key, row.label || row.key) : undefined
            }
            onFilter={
              filterField
                ? (key) => setFilters((current) => withFilterValue(current, filterField, key))
                : undefined
            }
          />
        ) : tab === "matrix" ? (
          <MatrixView
            query={query}
            refreshToken={refreshToken}
            selection={matrix}
            onSelectionChange={setMatrix}
            onFilter={(pairs) =>
              setFilters((current) =>
                pairs.reduce((next, [field, value]) => withFilterValue(next, field, value), current)
              )
            }
            onOpen={openDrill}
          />
        ) : tab === "heatmap" ? (
          <HeatmapView query={query} refreshToken={refreshToken} />
        ) : (
          <SessionsPanel
            query={query}
            refreshToken={refreshToken}
            order={sessionOrder}
            onOrderChange={setSessionOrder}
          />
        )}
      </Card>

      {drill && (
        <DrillPanel
          key={`${drill.kind}:${drill.key}`}
          target={drill}
          query={query}
          refreshToken={refreshToken}
          onClose={() => setDrill(null)}
          onApply={(field, key) => setFilters((current) => withFilterValue(current, field, key))}
        />
      )}
    </div>
  );
}
