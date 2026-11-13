"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/shared/components";
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
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-md border px-2.5 py-1 text-xs font-medium ${
        active
          ? "border-primary bg-primary/10 text-primary"
          : "border-border text-text-muted hover:text-text-main"
      }`}
    >
      {label}
    </button>
  );
}

function TopList({
  title,
  emptyLabel,
  rows,
}: {
  title: string;
  emptyLabel: string;
  rows: Array<{ key: string; label: string; value: string }>;
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

export default function HomeUsageWidgets({ aside }: { aside?: ReactNode }) {
  const t = useTranslations("home");
  const tAnalytics = useTranslations("analytics");
  const [range, setRange] = useState<Range>("1d");
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [combos, setCombos] = useState<ComboUsage[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  const selectRange = (value: Range) => {
    setShowCustomPicker(false);
    if (value === range) return;
    setLoading(true);
    setRange(value);
  };

  const applyCustomRange = (start: string, end: string) => {
    setCustomStart(start);
    setCustomEnd(end);
    setShowCustomPicker(false);
    setLoading(true);
    setRange("custom");
  };

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const params = new URLSearchParams({ range });
        if (range === "custom") {
          params.set("startDate", customStart);
          params.set("endDate", customEnd);
        }
        const query = params.toString();
        const [analyticsRes, combosRes] = await Promise.all([
          fetch(`/api/usage/analytics?${query}&includeFlatRateEstimates=true`),
          fetch(`/api/usage/by-combo?${query}`),
        ]);
        if (!analyticsRes.ok) throw new Error("analytics");
        const analyticsData = (await analyticsRes.json()) as Analytics;
        const combosData = combosRes.ok ? await combosRes.json() : { combos: [] };
        if (cancelled) return;
        setFailed(false);
        setAnalytics(analyticsData);
        setCombos(Array.isArray(combosData.combos) ? combosData.combos : []);
      } catch {
        if (!cancelled) setFailed(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [range, customStart, customEnd]);

  const summary = analytics?.summary;
  const totalTokens = (summary?.promptTokens || 0) + (summary?.completionTokens || 0);
  const errorCount = (analytics?.errorBreakdown || []).reduce((sum, row) => sum + row.count, 0);

  const comboRows = combos.slice(0, TOP_ROWS).map((combo) => ({
    key: combo.comboName,
    label: combo.comboName.charAt(0).toUpperCase() + combo.comboName.slice(1),
    value: `${fmtCompact(combo.requests)} · ${fmtCompact(combo.inputTokens + combo.outputTokens)}`,
  }));

  return (
    <section
      className="mb-3 grid grid-cols-1 gap-x-3 gap-y-2 lg:grid-cols-[2fr_1fr]"
      aria-busy={loading}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-base font-semibold text-text-main">{t("usageWidgetsTitle")}</h2>
        <div
          role="group"
          aria-label={t("usageWidgetsRange")}
          className="relative flex flex-wrap gap-1"
        >
          {RANGES.map((value) => (
            <RangeButton
              key={value}
              active={range === value}
              onClick={() => selectRange(value)}
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
              start={customStart}
              end={customEnd}
              onApply={applyCustomRange}
              onClose={() => setShowCustomPicker(false)}
            />
          )}
        </div>
      </div>

      {failed ? (
        <Card className="p-4 text-sm text-text-muted lg:col-start-1 lg:row-start-2">
          {t("usageWidgetsError")}
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:col-start-1 lg:row-start-2">
          <div className="grid grid-cols-2 gap-2 sm:col-span-2 sm:grid-cols-4">
            <StatCard
              icon="generating_tokens"
              label={tAnalytics("totalTokens")}
              value={fmtCompact(totalTokens)}
              tooltip={fmtFull(totalTokens)}
              subValue={`${fmtFull(summary?.totalRequests || 0)} ${tAnalytics("chartRequests")}`}
            />
            <StatCard
              icon="input"
              label={tAnalytics("inputTokens")}
              value={fmtCompact(summary?.promptTokens)}
              tooltip={fmtFull(summary?.promptTokens || 0)}
              color="text-primary"
            />
            <StatCard
              icon="output"
              label={tAnalytics("outputTokens")}
              value={fmtCompact(summary?.completionTokens)}
              tooltip={fmtFull(summary?.completionTokens || 0)}
              color="text-success"
            />
            <StatCard
              icon="payments"
              label={tAnalytics("estCost")}
              value={fmtCost(summary?.totalCost || 0)}
              tooltip={`$${Number(summary?.totalCost || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`}
              color="text-warning"
            />
          </div>
          <StatCard
            icon="error"
            label={t("usageErrors")}
            value={fmtCompact(errorCount)}
            subValue={t("usageErrorsDetail", {
              success: Number(summary?.successRatePct || 0),
              fallbacks: fmtCompact(summary?.fallbackCount),
              fallbackRate: Number(summary?.fallbackRatePct || 0),
            })}
            color="text-error"
          />
          <TopList title={t("usageByCombo")} emptyLabel={t("usageNoData")} rows={comboRows} />
          <div className="sm:col-span-2">
            <ActivityHeatmap activityMap={analytics?.activityMap} />
          </div>
        </div>
      )}
      {aside && <div className="min-w-0 lg:col-start-2 lg:row-start-2 [&>*]:h-full">{aside}</div>}
    </section>
  );
}
