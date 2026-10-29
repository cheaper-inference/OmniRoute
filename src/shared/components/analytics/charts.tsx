"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import Card from "../Card";
import Icon from "../Icon";
import Input from "../Input";
import Tooltip from "../Tooltip";
import { PROVIDER_COLORS } from "./chartColors";
import {
  fmtCompact as fmt,
  fmtFull,
  fmtCost,
  formatApiKeyLabel as maskApiKeyLabel,
} from "@/shared/utils/formatting";
import {
  getServiceTierDisplayLabel,
  translateCostText,
  type TranslationFn,
} from "@/shared/utils/serviceTierLabels";
import { SortableTableHead, type DataTableSortDirection } from "@omniroute/ui-kit/data-table-shell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";

function createDateFormatter(locale: string, options: Intl.DateTimeFormatOptions) {
  try {
    return new Intl.DateTimeFormat(locale, options);
  } catch {
    return new Intl.DateTimeFormat(undefined, options);
  }
}

// ── Sort Indicator (shared by tables) ──────────────────────────────────────

export function SortIndicator({ active, sortOrder }: { active: boolean; sortOrder: string }) {
  if (!active) {
    return <Icon name="unfold_more" size={12} className="opacity-0 group-hover:opacity-30" />;
  }
  return (
    <Icon
      name={sortOrder === "asc" ? "expand_less" : "expand_more"}
      size={12}
      className="text-primary"
    />
  );
}

// ── StatCard (primary KPI) ─────────────────────────────────────────────────

export function StatCard({
  icon,
  label,
  value,
  subValue,
  tooltip,
  color = "text-text-main",
}: {
  icon: any;
  label: any;
  value: any;
  subValue?: any;
  tooltip?: string;
  color?: string;
}) {
  const isCost = String(label).toLowerCase().includes("cost");
  const tooltipText = tooltip
    ? String(tooltip).includes(":")
      ? tooltip
      : isCost
        ? `cost : ${String(tooltip).startsWith("$") ? tooltip : `$${tooltip}`}`
        : `tokens : ${tooltip} tokens`
    : null;

  const valueElement = (
    <span
      className={`text-2xl font-bold ${color} truncate cursor-default`}
      data-tooltip={tooltip}
      title={tooltip ? undefined : String(value)}
    >
      {value}
    </span>
  );

  return (
    <Card className="px-4 py-3 flex flex-col gap-1 min-w-0">
      <div className="flex items-center gap-1.5 text-text-muted text-[11px] uppercase font-semibold tracking-wide min-w-0">
        <Icon name={icon} size={14} />
        <span className="truncate">{label}</span>
      </div>
      {tooltipText ? (
        <Tooltip
          content={
            <div className="flex flex-col gap-0.5 text-left py-0.5 min-w-[140px]">
              <div className="font-semibold text-xs">{label}</div>
              <div className="font-mono text-xs tracking-wide opacity-80">{tooltipText}</div>
            </div>
          }
          className="w-fit max-w-full"
          delayMs={150}
        >
          {valueElement}
        </Tooltip>
      ) : (
        valueElement
      )}
      {subValue && <span className="text-xs text-text-muted truncate">{subValue}</span>}
    </Card>
  );
}

// ── CompactStatGrid (secondary metrics in a single card, grouped) ─────────

export type CompactStatSection = {
  title: string;
  items: Array<{ icon: string; label: string; value: any; tooltip?: string; color?: string }>;
  /** On mobile use 1 column instead of 2 — useful when values can be long (model names, etc.) */
  wideValues?: boolean;
};

export function CompactStatGrid({ sections }: { sections: CompactStatSection[] }) {
  return (
    <Card className="px-5 py-4">
      <div className="flex flex-col gap-3">
        {sections.map((section, si) => (
          <div key={si}>
            {si > 0 && <div className="border-t border-border mb-3" />}
            <div className="text-[10px] uppercase font-semibold tracking-widest text-text-muted/50 mb-2">
              {section.title}
            </div>
            <div
              className={
                section.wideValues
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-2"
                  : "grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-2"
              }
            >
              {section.items.map((stat, i) => {
                const statValueEl = (
                  <span
                    className={`text-sm font-bold text-right cursor-default ${section.wideValues ? "truncate min-w-0" : "shrink-0"} ${stat.color || "text-text-main"}`}
                    data-tooltip={stat.tooltip}
                    title={stat.tooltip ? undefined : String(stat.value)}
                  >
                    {stat.value}
                  </span>
                );

                return (
                  <div key={i} className="flex items-center justify-between gap-2 min-w-0 py-0.5">
                    <div
                      className={`flex items-center gap-1.5 ${section.wideValues ? "shrink-0" : "min-w-0"}`}
                    >
                      <Icon name={stat.icon} size={14} className="text-text-muted" />
                      <span
                        className={`text-[11px] uppercase font-semibold tracking-wide text-text-muted ${section.wideValues ? "whitespace-nowrap" : "truncate"}`}
                      >
                        {stat.label}
                      </span>
                    </div>
                    {stat.tooltip ? (
                      <Tooltip
                        content={
                          <div className="flex flex-col gap-0.5 text-left py-0.5 min-w-[120px]">
                            <div className="font-semibold text-xs">{stat.label}</div>
                            <div className="font-mono text-xs tracking-wide opacity-80">
                              {String(stat.tooltip).includes(":")
                                ? stat.tooltip
                                : `${stat.label.toLowerCase().includes("cost") ? "cost" : "tokens"} : ${stat.tooltip}`}
                            </div>
                          </div>
                        }
                        className={section.wideValues ? "truncate min-w-0" : "shrink-0"}
                        delayMs={150}
                      >
                        {statValueEl}
                      </Tooltip>
                    ) : (
                      statValueEl
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ── ActivityHeatmap ────────────────────────────────────────────────────────

export function ActivityHeatmap({ activityMap }) {
  const t = useTranslations("analytics");
  const locale = useLocale();
  const scrollRef = useRef<HTMLDivElement>(null);
  const monthFormatter = useMemo(() => createDateFormatter(locale, { month: "short" }), [locale]);
  const weekdayFormatter = useMemo(
    () => createDateFormatter(locale, { weekday: "short" }),
    [locale]
  );

  const cells = useMemo(() => {
    const today = new Date();
    const days = [];
    let maxVal = 0;

    for (let i = 364; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      const val = activityMap?.[key] || 0;
      if (val > maxVal) maxVal = val;
      days.push({ date: key, value: val, dayOfWeek: d.getDay() });
    }

    return { days, maxVal };
  }, [activityMap]);

  const weeks = useMemo(() => {
    const w = [];
    let current = [];
    const firstDay = cells.days[0]?.dayOfWeek || 0;
    for (let i = 0; i < firstDay; i++) {
      current.push(null);
    }
    for (const day of cells.days) {
      current.push(day);
      if (current.length === 7) {
        w.push(current);
        current = [];
      }
    }
    if (current.length > 0) w.push(current);
    return w;
  }, [cells]);

  // Auto-scroll to the right edge so the current date is visible
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [weeks]);
  const monthLabels = useMemo(() => {
    const labels = [];
    let lastMonth = -1;
    weeks.forEach((week, weekIdx) => {
      const firstDay = week.find((d) => d !== null);
      if (firstDay) {
        const m = new Date(firstDay.date).getMonth();
        if (m !== lastMonth) {
          labels.push({ weekIdx, label: monthFormatter.format(new Date(2024, m, 1)) });
          lastMonth = m;
        }
      }
    });
    return labels;
  }, [monthFormatter, weeks]);

  const weekdayLabels = useMemo(
    () => [1, 3, 5].map((day) => weekdayFormatter.format(new Date(2024, 0, 7 + day))),
    [weekdayFormatter]
  );

  function getCellColor(value) {
    if (!value || value === 0) return "bg-surface-2";
    const intensity = Math.min(value / (cells.maxVal || 1), 1);
    if (intensity < 0.25) return "bg-primary/20";
    if (intensity < 0.5) return "bg-primary/40";
    if (intensity < 0.75) return "bg-primary/60";
    return "bg-primary/90";
  }

  return (
    <Card className="p-4 h-full min-w-0 overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
          {t("overview")}
        </h3>
        <span className="text-xs text-text-muted">
          {t("activitySummary", {
            active: Object.keys(activityMap || {}).length,
            tokens: fmt(
              Object.values(activityMap || {}).reduce((a: number, b: number) => a + b, 0)
            ),
            days: 365,
          })}
        </span>
      </div>

      <div ref={scrollRef} className="overflow-x-auto">
        <div className="w-max">
          <div className="flex gap-[3px] mb-1 ml-6" style={{ fontSize: "10px" }}>
            {monthLabels.map((m, i) => (
              <span
                key={i}
                className="text-text-muted"
                style={{
                  position: "relative",
                  left: `${m.weekIdx * 13}px`,
                  marginLeft: i === 0 ? 0 : "-20px",
                }}
              >
                {m.label}
              </span>
            ))}
          </div>

          <div className="flex gap-[3px]">
            <div className="flex flex-col gap-[3px] shrink-0 text-[10px] text-text-muted pr-1 sticky left-0 z-10 bg-surface">
              <span className="h-[10px]"></span>
              <span className="h-[10px] leading-[10px]">{weekdayLabels[0]}</span>
              <span className="h-[10px]"></span>
              <span className="h-[10px] leading-[10px]">{weekdayLabels[1]}</span>
              <span className="h-[10px]"></span>
              <span className="h-[10px] leading-[10px]">{weekdayLabels[2]}</span>
              <span className="h-[10px]"></span>
            </div>

            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day, di) => (
                  <div
                    key={di}
                    title={
                      day
                        ? t("activityCellTitle", { date: day.date, tokens: fmtFull(day.value) })
                        : ""
                    }
                    className={`w-[10px] h-[10px] rounded-[2px] ${day ? getCellColor(day.value) : "bg-transparent"}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 mt-2 ml-6 text-[10px] text-text-muted">
        <span>{t("activityLess")}</span>
        <div className="w-[10px] h-[10px] rounded-[2px] bg-surface-2" />
        <div className="w-[10px] h-[10px] rounded-[2px] bg-primary/20" />
        <div className="w-[10px] h-[10px] rounded-[2px] bg-primary/40" />
        <div className="w-[10px] h-[10px] rounded-[2px] bg-primary/60" />
        <div className="w-[10px] h-[10px] rounded-[2px] bg-primary/90" />
        <span>{t("activityMore")}</span>
      </div>
    </Card>
  );
}

export function ApiKeyTable({
  byApiKey,
  displayMode = "compact",
}: {
  byApiKey: any;
  displayMode?: "compact" | "exact";
}) {
  const t = useTranslations("analytics");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("totalTokens");
  const [sortOrder, setSortOrder] = useState<DataTableSortDirection>("desc");

  const data = useMemo(() => byApiKey || [], [byApiKey]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (row) =>
        (row.apiKeyName || "").toLowerCase().includes(q) ||
        (row.apiKeyId || "").toLowerCase().includes(q)
    );
  }, [data, query]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      const va = a[sortBy] ?? 0;
      const vb = b[sortBy] ?? 0;
      if (typeof va === "string") {
        return sortOrder === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
      }
      return sortOrder === "asc" ? va - vb : vb - va;
    });
    return arr;
  }, [filtered, sortBy, sortOrder]);

  // The kit's SortableTableHead computes the next direction (flip on the active column,
  // "desc" on a new one) — the same rule the legacy header click applied.
  const toggleSort = useCallback((field: string, direction: DataTableSortDirection) => {
    setSortBy(field);
    setSortOrder(direction);
  }, []);

  const hasData = data.length > 0;

  if (!hasData) {
    return (
      <Card className="p-4 flex-1">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
          {t("chartApiKeyBreakdown")}
        </h3>
        <div className="text-center text-text-muted text-sm py-8">{t("chartNoData")}</div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
          {t("chartApiKeyBreakdown")}
        </h3>
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("filterSearchKeys")}
          aria-label={t("filterSearchKeys")}
          icon="search"
          className="w-full max-w-[220px]"
        />
      </div>
      <Table
        containerClassName="rounded-none border-0"
        className="text-sm"
        scrollbarLabel={t("chartApiKeyBreakdown")}
      >
        <TableHeader>
          <TableRow>
            <SortableTableHead
              direction={sortBy === "apiKeyName" ? sortOrder : undefined}
              onDirectionChange={(direction) => toggleSort("apiKeyName", direction)}
            >
              {t("chartApiKey")}
            </SortableTableHead>
            <SortableTableHead
              align="right"
              direction={sortBy === "requests" ? sortOrder : undefined}
              onDirectionChange={(direction) => toggleSort("requests", direction)}
            >
              {t("chartRequests")}
            </SortableTableHead>
            <SortableTableHead
              align="right"
              direction={sortBy === "promptTokens" ? sortOrder : undefined}
              onDirectionChange={(direction) => toggleSort("promptTokens", direction)}
            >
              {t("chartInput")}
            </SortableTableHead>
            <SortableTableHead
              align="right"
              direction={sortBy === "completionTokens" ? sortOrder : undefined}
              onDirectionChange={(direction) => toggleSort("completionTokens", direction)}
            >
              {t("chartOutput")}
            </SortableTableHead>
            <SortableTableHead
              align="right"
              direction={sortBy === "totalTokens" ? sortOrder : undefined}
              onDirectionChange={(direction) => toggleSort("totalTokens", direction)}
            >
              {t("chartTotal")}
            </SortableTableHead>
            <SortableTableHead
              align="right"
              direction={sortBy === "cost" ? sortOrder : undefined}
              onDirectionChange={(direction) => toggleSort("cost", direction)}
            >
              {t("chartCost")}
            </SortableTableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((row, i) => (
            <TableRow key={`${row.apiKeyId || row.apiKeyName || "key"}-${i}`}>
              <TableCell className="px-4 py-2.5">
                <span className="font-medium" title={row.apiKeyName || row.apiKeyId || "unknown"}>
                  {maskApiKeyLabel(row.apiKeyName, row.apiKeyId)}
                </span>
              </TableCell>
              <TableCell className="px-4 py-2.5 text-right font-mono text-text-muted">
                {fmtFull(row.requests)}
              </TableCell>
              <TableCell
                className="px-4 py-2.5 text-right font-mono text-primary"
                title={
                  displayMode === "exact" ? `~${fmt(row.promptTokens)}` : fmtFull(row.promptTokens)
                }
              >
                {displayMode === "exact" ? fmtFull(row.promptTokens) : fmt(row.promptTokens)}
              </TableCell>
              <TableCell
                className="px-4 py-2.5 text-right font-mono text-success"
                title={
                  displayMode === "exact"
                    ? `~${fmt(row.completionTokens)}`
                    : fmtFull(row.completionTokens)
                }
              >
                {displayMode === "exact"
                  ? fmtFull(row.completionTokens)
                  : fmt(row.completionTokens)}
              </TableCell>
              <TableCell
                className="px-4 py-2.5 text-right font-mono font-semibold"
                title={
                  displayMode === "exact" ? `~${fmt(row.totalTokens)}` : fmtFull(row.totalTokens)
                }
              >
                {displayMode === "exact" ? fmtFull(row.totalTokens) : fmt(row.totalTokens)}
              </TableCell>
              <TableCell className="px-4 py-2.5 text-right font-mono text-warning">
                {fmtCost(row.cost)}
              </TableCell>
            </TableRow>
          ))}
          {sorted.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="px-4 py-8 text-center text-text-muted">
                {t("filterNoKeysMatch")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}

export function MostActiveDay7d({ activityMap }) {
  const t = useTranslations("analytics");
  const locale = useLocale();
  const weekdayFormatter = useMemo(
    () => createDateFormatter(locale, { weekday: "long" }),
    [locale]
  );
  const dateFormatter = useMemo(
    () => createDateFormatter(locale, { month: "short", day: "numeric" }),
    [locale]
  );
  const data = useMemo(() => {
    if (!activityMap) return null;
    const today = new Date();
    let peakKey = null;
    let peakVal = 0;

    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      const val = activityMap[key] || 0;
      if (val > peakVal) {
        peakVal = val;
        peakKey = key;
      }
    }
    if (!peakKey || peakVal === 0) return null;

    const peakDate = new Date(peakKey + "T12:00:00");
    return {
      weekday: weekdayFormatter.format(peakDate),
      label: dateFormatter.format(peakDate),
      tokens: peakVal,
    };
  }, [activityMap, dateFormatter, weekdayFormatter]);

  return (
    <Card className="p-4 flex flex-col justify-center" style={{ flex: 1, minHeight: 0 }}>
      <h3
        className="text-xs font-semibold uppercase tracking-wider mb-2"
        style={{ color: "var(--color-text-muted)" }}
      >
        {t("mostActiveDay")}
      </h3>
      {data ? (
        <>
          <span className="text-xl font-bold capitalize" style={{ lineHeight: 1.2 }}>
            {data.weekday}
          </span>
          <Tooltip
            content={
              <div className="flex flex-col gap-0.5 text-left py-0.5 min-w-[140px]">
                <div className="font-semibold text-xs">{data.weekday}</div>
                <div className="font-mono text-xs tracking-wide opacity-80">
                  tokens : {fmtFull(data.tokens)} tokens
                </div>
              </div>
            }
            className="w-fit max-w-full"
            delayMs={150}
          >
            <span
              className="text-xs mt-1 cursor-default"
              style={{ color: "var(--color-text-muted)" }}
              data-tooltip={fmtFull(data.tokens)}
            >
              {t("datedTokenCount", { date: data.label, tokens: fmt(data.tokens) })}
            </span>
          </Tooltip>
        </>
      ) : (
        <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
          {t("noDataLast7Days")}
        </span>
      )}
    </Card>
  );
}

// ── WeeklySquares7d ────────────────────────────────────────────────────────

export function WeeklySquares7d({ activityMap }) {
  const t = useTranslations("analytics");
  const locale = useLocale();
  const weekdayFormatter = useMemo(
    () => createDateFormatter(locale, { weekday: "short" }),
    [locale]
  );
  const dateFormatter = useMemo(
    () => createDateFormatter(locale, { month: "short", day: "numeric" }),
    [locale]
  );
  const days = useMemo(() => {
    if (!activityMap) return [];
    const today = new Date();
    const result = [];
    let maxVal = 0;

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      const val = activityMap[key] || 0;
      if (val > maxVal) maxVal = val;
      result.push({
        key,
        val,
        label: weekdayFormatter.format(d),
        dateLabel: dateFormatter.format(d),
      });
    }
    return result.map((d) => ({ ...d, intensity: maxVal > 0 ? d.val / maxVal : 0 }));
  }, [activityMap, dateFormatter, weekdayFormatter]);

  function getSquareStyle(intensity) {
    if (intensity === 0) return { background: "var(--color-surface-2)" };
    const pct = Math.round((0.15 + intensity * 0.75) * 100);
    // Same 15–90 % intensity ramp as before, on the kit's first chart token.
    return { background: `color-mix(in oklab, var(--color-chart-1) ${pct}%, transparent)` };
  }

  return (
    <Card className="p-4 flex flex-col justify-center" style={{ flex: 1, minHeight: 0 }}>
      <h3
        className="text-xs font-semibold uppercase tracking-wider mb-3"
        style={{ color: "var(--color-text-muted)" }}
      >
        {t("chartWeekly")}
      </h3>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, justifyContent: "center" }}>
        {days.map((d) => (
          <div
            key={d.key}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
          >
            <div
              title={t("activityCellTitle", { date: d.dateLabel, tokens: fmtFull(d.val) })}
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                ...getSquareStyle(d.intensity),
                transition: "all 0.2s",
                cursor: "default",
              }}
            />
            <span
              style={{
                fontSize: 9,
                fontWeight: 600,
                color: "var(--color-text-muted)",
                letterSpacing: "0.03em",
              }}
            >
              {d.label}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ── ModelTable (extracted — see ModelTable.tsx / #8769) ───────────────────

export { ModelTable } from "./ModelTable";

function getServiceTierIcon(serviceTier) {
  if (serviceTier === "priority") return "bolt";
  if (serviceTier === "flex") return "savings";
  return "speed";
}

function getServiceTierIconClass(serviceTier) {
  if (serviceTier === "priority") return "text-info";
  if (serviceTier === "flex") return "text-success";
  return "text-text-muted";
}

function getServiceTierBarClass(serviceTier) {
  if (serviceTier === "priority") return "bg-info";
  if (serviceTier === "flex") return "bg-success";
  return "bg-text-muted/50";
}

function getServiceTierCostClass(serviceTier) {
  return serviceTier === "flex" ? "text-success" : "text-warning";
}

export function ServiceTierBreakdown({ byServiceTier, summary }) {
  const t = useTranslations("costs") as TranslationFn;
  const tAnalytics = useTranslations("analytics");
  const data = useMemo(() => byServiceTier || [], [byServiceTier]);
  const totalRequests = Number(summary?.totalRequests || 0);
  const totalCost = Number(summary?.totalCost || 0);

  if (!data.length) {
    return null;
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
          {translateCostText(t, "serviceTierBreakdownTitle", "Service Tier")}
        </h3>
        <span className="text-[11px] text-text-muted">
          {translateCostText(t, "serviceTierBreakdownSubtitle", "Fast / Flex / Standard split")}
        </span>
      </div>
      <div className="divide-y divide-border">
        {data.map((tier) => {
          const isFlex = tier.serviceTier === "flex";
          const tierLabel = getServiceTierDisplayLabel(t, tier.serviceTier, tier.label);
          const requestPct =
            totalRequests > 0
              ? ((Number(tier.requests || 0) / totalRequests) * 100).toFixed(1)
              : "0";
          const costPct =
            totalCost > 0 ? ((Number(tier.cost || 0) / totalCost) * 100).toFixed(1) : "0";
          const usageSavings = Number(tier.usageSavingsTokens || 0);
          const costSavings = Number(tier.savings || 0);
          const usageSavingsText =
            isFlex && usageSavings > 0
              ? ` · ${fmt(usageSavings)} ${translateCostText(
                  t,
                  "serviceTierUsageSaved",
                  "usage saved"
                )}`
              : "";
          const costDetailText =
            isFlex && costSavings > 0
              ? `${fmtCost(costSavings)} ${translateCostText(t, "serviceTierCostSaved", "saved")}`
              : `${costPct}% ${translateCostText(t, "serviceTierCostShareSuffix", "of cost")}`;

          return (
            <div key={tier.serviceTier} className="p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Icon
                    name={getServiceTierIcon(tier.serviceTier)}
                    size={18}
                    className={getServiceTierIconClass(tier.serviceTier)}
                  />
                  <div>
                    <div className="text-sm font-semibold text-text-main">{tierLabel}</div>
                    <div className="text-xs text-text-muted">
                      {tAnalytics("requestTokenSummary", {
                        requests: fmtFull(tier.requests),
                        tokens: fmt(tier.totalTokens),
                      })}
                      {usageSavingsText}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`font-mono text-sm font-semibold ${getServiceTierCostClass(
                      tier.serviceTier
                    )}`}
                  >
                    {fmtCost(tier.cost)}
                  </div>
                  <div className="text-xs text-text-muted">{costDetailText}</div>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-surface-2 overflow-hidden">
                <div
                  className={`h-full rounded-full ${getServiceTierBarClass(tier.serviceTier)}`}
                  style={{ width: `${requestPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

// ── UsageDetail ────────────────────────────────────────────────────────────

export function UsageDetail({ summary }) {
  const t = useTranslations("analytics");
  const items = [
    { label: t("chartInput"), value: summary?.promptTokens, color: "text-primary" },
    { label: t("chartCacheRead"), value: 0, color: "text-text-muted" },
    { label: t("chartOutput"), value: summary?.completionTokens, color: "text-success" },
  ];

  return (
    <Card className="p-4 flex-1">
      <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
        {t("chartUsageDetail")}
      </h3>
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className={`text-sm ${item.color}`}>{item.label}</span>
            <span className="font-mono font-medium text-sm">{fmtFull(item.value)}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ── ProviderTable ──────────────────────────────────────────────────────────

export function ProviderTable({
  byProvider,
  displayMode = "compact",
}: {
  byProvider: any;
  displayMode?: "compact" | "exact";
}) {
  const t = useTranslations("analytics");
  const [sortBy, setSortBy] = useState("totalTokens");
  const [sortOrder, setSortOrder] = useState<DataTableSortDirection>("desc");

  const data = useMemo(() => byProvider || [], [byProvider]);
  const totalTokens = useMemo(() => data.reduce((acc, p) => acc + p.totalTokens, 0), [data]);

  // The kit's SortableTableHead computes the next direction (flip on the active column,
  // "desc" on a new one) — the same rule the legacy header click applied.
  const toggleSort = useCallback((field: string, direction: DataTableSortDirection) => {
    setSortBy(field);
    setSortOrder(direction);
  }, []);

  const sorted = useMemo(() => {
    const arr = [...data];
    arr.sort((a, b) => {
      const va = a[sortBy] ?? 0;
      const vb = b[sortBy] ?? 0;
      if (typeof va === "string")
        return sortOrder === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
      return sortOrder === "asc" ? va - vb : vb - va;
    });
    return arr;
  }, [data, sortBy, sortOrder]);

  if (!data.length) {
    return (
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">
          {t("chartProviderBreakdown")}
        </h3>
        <div className="text-center text-text-muted text-sm py-8">{t("chartNoData")}</div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
          {t("chartProviderBreakdown")}
        </h3>
      </div>
      <Table
        containerClassName="rounded-none border-0"
        className="text-sm"
        scrollbarLabel={t("chartProviderBreakdown")}
      >
        <TableHeader>
          <TableRow>
            <SortableTableHead
              direction={sortBy === "provider" ? sortOrder : undefined}
              onDirectionChange={(direction) => toggleSort("provider", direction)}
            >
              {t("chartProvider")}
            </SortableTableHead>
            <SortableTableHead
              align="right"
              direction={sortBy === "requests" ? sortOrder : undefined}
              onDirectionChange={(direction) => toggleSort("requests", direction)}
            >
              {t("chartRequests")}
            </SortableTableHead>
            <SortableTableHead
              align="right"
              direction={sortBy === "promptTokens" ? sortOrder : undefined}
              onDirectionChange={(direction) => toggleSort("promptTokens", direction)}
            >
              {t("chartInput")}
            </SortableTableHead>
            <SortableTableHead
              align="right"
              direction={sortBy === "completionTokens" ? sortOrder : undefined}
              onDirectionChange={(direction) => toggleSort("completionTokens", direction)}
            >
              {t("chartOutput")}
            </SortableTableHead>
            <SortableTableHead
              align="right"
              direction={sortBy === "totalTokens" ? sortOrder : undefined}
              onDirectionChange={(direction) => toggleSort("totalTokens", direction)}
            >
              {t("chartTotal")}
            </SortableTableHead>
            <SortableTableHead
              align="right"
              direction={sortBy === "cost" ? sortOrder : undefined}
              onDirectionChange={(direction) => toggleSort("cost", direction)}
            >
              {t("chartCost")}
            </SortableTableHead>
            <TableHead className="px-4 py-2.5 text-right w-36">{t("chartShare")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((p, i) => {
            const pct = totalTokens > 0 ? ((p.totalTokens / totalTokens) * 100).toFixed(1) : "0";
            return (
              <TableRow key={`${p.provider}-${i}`}>
                <TableCell className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: PROVIDER_COLORS[i % PROVIDER_COLORS.length] }}
                    />
                    <span className="font-medium capitalize">{p.provider}</span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-2.5 text-right font-mono text-text-muted">
                  {fmtFull(p.requests)}
                </TableCell>
                <TableCell
                  className="px-4 py-2.5 text-right font-mono text-primary"
                  title={
                    displayMode === "exact" ? `~${fmt(p.promptTokens)}` : fmtFull(p.promptTokens)
                  }
                >
                  {displayMode === "exact" ? fmtFull(p.promptTokens) : fmt(p.promptTokens)}
                </TableCell>
                <TableCell
                  className="px-4 py-2.5 text-right font-mono text-success"
                  title={
                    displayMode === "exact"
                      ? `~${fmt(p.completionTokens)}`
                      : fmtFull(p.completionTokens)
                  }
                >
                  {displayMode === "exact" ? fmtFull(p.completionTokens) : fmt(p.completionTokens)}
                </TableCell>
                <TableCell
                  className="px-4 py-2.5 text-right font-mono font-semibold"
                  title={
                    displayMode === "exact" ? `~${fmt(p.totalTokens)}` : fmtFull(p.totalTokens)
                  }
                >
                  {displayMode === "exact" ? fmtFull(p.totalTokens) : fmt(p.totalTokens)}
                </TableCell>
                <TableCell className="px-4 py-2.5 text-right font-mono text-warning">
                  {fmtCost(p.cost)}
                </TableCell>
                <TableCell className="px-4 py-2.5 text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <div className="w-16 h-1.5 rounded-full bg-surface-2 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: PROVIDER_COLORS[i % PROVIDER_COLORS.length],
                        }}
                      />
                    </div>
                    <span className="text-xs font-mono text-text-muted w-10 text-right">
                      {pct}%
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}
