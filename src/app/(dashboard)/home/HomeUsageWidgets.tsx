"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Button, Card } from "@/shared/components";
import { fmtCompact, fmtCost, fmtFull } from "@/shared/utils/formatting";
import { ActivityHeatmap, CustomRangePicker, StatCard } from "@/shared/components/analytics";

const RANGES = ["1d", "7d", "30d", "90d", "ytd", "all"] as const;
type Range = (typeof RANGES)[number] | "custom";

const RANGE_LABEL_KEYS: Record<(typeof RANGES)[number], string> = {
  "1d": "period1D",
  "7d": "period7D",
  "30d": "period30D",
  "90d": "period90D",
  ytd: "periodYTD",
  all: "periodAll",
};

const TOP_ROWS = 5;

interface Analytics {
  summary?: {
    totalRequests?: number;
    promptTokens?: number;
    completionTokens?: number;
    totalCost?: number;
    successRatePct?: number | string;
    fallbackCount?: number;
    fallbackRatePct?: number | string;
  };
  errorBreakdown?: Array<{ errorType: string; count: number }>;
  activityMap?: Record<string, number>;
}

interface ComboUsage {
  comboName: string;
  requests: number;
  inputTokens: number;
  outputTokens: number;
}

interface CustomRange {
  start: string;
  end: string;
}

interface UsageView {
  totalRequests: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  totalCost: number;
  successRate: number;
  fallbackCount: number;
  fallbackRate: number;
  errorCount: number;
}

type TopRow = { key: string; label: string; value: string };

function deriveUsageView(analytics: Analytics | null): UsageView {
  const summary = analytics?.summary ?? {};
  const promptTokens = summary.promptTokens || 0;
  const completionTokens = summary.completionTokens || 0;
  const errorBreakdown = analytics?.errorBreakdown ?? [];
  return {
    totalRequests: summary.totalRequests || 0,
    promptTokens,
    completionTokens,
    totalTokens: promptTokens + completionTokens,
    totalCost: Number(summary.totalCost || 0),
    successRate: Number(summary.successRatePct || 0),
    fallbackCount: summary.fallbackCount || 0,
    fallbackRate: Number(summary.fallbackRatePct || 0),
    errorCount: errorBreakdown.reduce((sum, row) => sum + row.count, 0),
  };
}

function toComboRows(combos: ComboUsage[]): TopRow[] {
  return combos.slice(0, TOP_ROWS).map((combo) => ({
    key: combo.comboName,
    label: combo.comboName.charAt(0).toUpperCase() + combo.comboName.slice(1),
    value: `${fmtCompact(combo.requests)} · ${fmtCompact(combo.inputTokens + combo.outputTokens)}`,
  }));
}

function buildUsageQuery(range: Range, custom: CustomRange): string {
  const params = new URLSearchParams({ range });
  if (range === "custom") {
    params.set("startDate", custom.start);
    params.set("endDate", custom.end);
  }
  return params.toString();
}

async function fetchUsage(query: string) {
  const [analyticsRes, combosRes] = await Promise.all([
    fetch(`/api/usage/analytics?${query}&includeFlatRateEstimates=true`),
    fetch(`/api/usage/by-combo?${query}`),
  ]);
  if (!analyticsRes.ok) throw new Error("analytics");
  const analytics = (await analyticsRes.json()) as Analytics;
  const combosData = combosRes.ok ? await combosRes.json() : { combos: [] };
  const combos: ComboUsage[] = Array.isArray(combosData?.combos) ? combosData.combos : [];
  return { analytics, combos };
}

function useUsageData(range: Range, custom: CustomRange) {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [combos, setCombos] = useState<ComboUsage[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const query = buildUsageQuery(range, custom);

  useEffect(() => {
    let cancelled = false;
    fetchUsage(query)
      .then((data) => {
        if (cancelled) return;
        setFailed(false);
        setAnalytics(data.analytics);
        setCombos(data.combos);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [query]);

  return { analytics, combos, loading, failed, setLoading };
}

function RangeButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <Button
      size="sm"
      variant={active ? "primary" : "ghost"}
      aria-pressed={active}
      onClick={onClick}
      className="h-7 min-h-7 px-3 text-xs"
    >
      {label}
    </Button>
  );
}

function TopList({
  title,
  emptyLabel,
  rows,
}: {
  title: string;
  emptyLabel: string;
  rows: TopRow[];
}) {
  return (
    <Card className="px-3 py-2">
      <h3 className="mb-1 text-xs font-medium text-text-muted">{title}</h3>
      {rows.length === 0 ? (
        <p className="text-xs italic text-text-muted">{emptyLabel}</p>
      ) : (
        <ul className="space-y-0.5">
          {rows.map((row) => (
            <li key={row.key} className="flex items-center justify-between gap-3 text-xs">
              <span className="min-w-0 truncate text-text-main" title={row.label}>
                {row.label}
              </span>
              <span className="shrink-0 tabular-nums text-text-muted">{row.value}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function UsageRangeSelector({
  range,
  custom,
  onSelect,
  onApplyCustom,
}: {
  range: Range;
  custom: CustomRange;
  onSelect: (value: Range) => void;
  onApplyCustom: (start: string, end: string) => void;
}) {
  const t = useTranslations("home");
  const tAnalytics = useTranslations("analytics");
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  return (
    <div role="group" aria-label={t("usageWidgetsRange")} className="relative flex flex-wrap gap-1">
      {RANGES.map((value) => (
        <RangeButton
          key={value}
          active={range === value}
          onClick={() => {
            setShowCustomPicker(false);
            onSelect(value);
          }}
          label={tAnalytics(RANGE_LABEL_KEYS[value])}
        />
      ))}
      <RangeButton
        active={range === "custom"}
        onClick={() => setShowCustomPicker(true)}
        label={tAnalytics("customRange")}
      />
      {showCustomPicker && (
        <CustomRangePicker
          start={custom.start}
          end={custom.end}
          onApply={(start: string, end: string) => {
            setShowCustomPicker(false);
            onApplyCustom(start, end);
          }}
          onClose={() => setShowCustomPicker(false)}
        />
      )}
    </div>
  );
}

function UsageStats({
  view,
  comboRows,
  activityMap,
}: {
  view: UsageView;
  comboRows: TopRow[];
  activityMap?: Record<string, number>;
}) {
  const t = useTranslations("home");
  const tAnalytics = useTranslations("analytics");
  const costTooltip = `$${view.totalCost.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  })}`;

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:col-start-1 lg:row-start-2">
      <div className="grid grid-cols-2 gap-2 sm:col-span-2 sm:grid-cols-4">
        <StatCard
          icon="generating_tokens"
          label={tAnalytics("totalTokens")}
          value={fmtCompact(view.totalTokens)}
          tooltip={fmtFull(view.totalTokens)}
          subValue={`${fmtFull(view.totalRequests)} ${tAnalytics("chartRequests")}`}
        />
        <StatCard
          icon="input"
          label={tAnalytics("inputTokens")}
          value={fmtCompact(view.promptTokens)}
          tooltip={fmtFull(view.promptTokens)}
          color="text-primary"
        />
        <StatCard
          icon="output"
          label={tAnalytics("outputTokens")}
          value={fmtCompact(view.completionTokens)}
          tooltip={fmtFull(view.completionTokens)}
          color="text-success"
        />
        <StatCard
          icon="payments"
          label={tAnalytics("estCost")}
          value={fmtCost(view.totalCost)}
          tooltip={costTooltip}
          color="text-warning"
        />
      </div>
      <StatCard
        icon="error"
        label={t("usageErrors")}
        value={fmtCompact(view.errorCount)}
        subValue={t("usageErrorsDetail", {
          success: view.successRate,
          fallbacks: fmtCompact(view.fallbackCount),
          fallbackRate: view.fallbackRate,
        })}
        color="text-error"
      />
      <TopList title={t("usageByCombo")} emptyLabel={t("usageNoData")} rows={comboRows} />
      <div className="sm:col-span-2">
        <ActivityHeatmap activityMap={activityMap} />
      </div>
    </div>
  );
}

export default function HomeUsageWidgets({ aside }: { aside?: ReactNode }) {
  const t = useTranslations("home");
  const [range, setRange] = useState<Range>("1d");
  const [custom, setCustom] = useState<CustomRange>({ start: "", end: "" });
  const { analytics, combos, loading, failed, setLoading } = useUsageData(range, custom);

  const selectRange = (value: Range) => {
    if (value === range) return;
    setLoading(true);
    setRange(value);
  };

  const applyCustomRange = (start: string, end: string) => {
    setCustom({ start, end });
    setLoading(true);
    setRange("custom");
  };

  return (
    <section
      className="mb-3 grid grid-cols-1 gap-x-3 gap-y-2 lg:grid-cols-[2fr_1fr]"
      aria-busy={loading}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-base font-semibold text-text-main">{t("usageWidgetsTitle")}</h2>
        <UsageRangeSelector
          range={range}
          custom={custom}
          onSelect={selectRange}
          onApplyCustom={applyCustomRange}
        />
      </div>

      {failed ? (
        <Card className="p-4 text-sm text-text-muted lg:col-start-1 lg:row-start-2">
          {t("usageWidgetsError")}
        </Card>
      ) : (
        <UsageStats
          view={deriveUsageView(analytics)}
          comboRows={toComboRows(combos)}
          activityMap={analytics?.activityMap}
        />
      )}
      {aside && <div className="min-w-0 lg:col-start-2 lg:row-start-2 [&>*]:h-full">{aside}</div>}
    </section>
  );
}
