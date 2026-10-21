"use client";

import { Fragment, useState, useEffect, useCallback, useMemo } from "react";
import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import { Badge, Button, Card, EmptyState, SegmentedControl } from "@/shared/components";
import {
  filterRankingsByAuthType,
  sortRankingsAuthTypeFirst,
  type ProviderAuthType,
} from "@/lib/freeProviderRankingsAuthType";
import {
  formatUsageReliability,
  sortRankingsByReliability,
  usageToneClass,
} from "@/lib/freeProviderRankingsUsage";
// Type-only: `freeProviderRankings` wires DB modules at import time, so a
// client component must never take a runtime value from it. The page used to
// keep its own copy of this shape, which had already drifted past the API.
import type { FreeProviderRanking } from "@/lib/freeProviderRankings";
import { brandTintVars } from "@omniroute/ui-kit/brand-tint";

/**
 * Convert a normalized task-fit score (0.4–0.98) to a human-readable label.
 * The score represents relative ranking quality, not a percentage.
 */
function scoreLabel(score: number): string {
  if (score >= 0.9) return "Elite";
  if (score >= 0.8) return "Excellent";
  if (score >= 0.7) return "Very Good";
  if (score >= 0.6) return "Good";
  if (score >= 0.5) return "Average";
  return "Below Average";
}

function scoreColor(score: number): string {
  if (score >= 0.7) return "text-success";
  if (score >= 0.55) return "text-warning";
  return "text-error";
}

export function formatBenchmarkMetric(
  m?: {
    metric?: string | null;
    eloRaw?: number | null;
    category?: string;
  } | null
): string | null {
  if (!m) return null;
  const metric = m.metric?.toLowerCase() ?? "";
  const raw = m.eloRaw;

  if (metric.startsWith("artificial-analysis")) {
    const sub = metric.includes("coding")
      ? "Code Index"
      : metric.includes("agentic")
        ? "Agentic Index"
        : "AA Index";
    return raw !== null && raw !== undefined ? `${sub} ${raw}` : "Artificial Analysis";
  }

  if (metric.startsWith("design-arena")) {
    return raw !== null && raw !== undefined ? `ELO ${raw} (Design Arena)` : "Design Arena";
  }

  if (metric.startsWith("openrouter")) {
    const benchName = metric.includes(":") ? metric.split(":")[1] : "Task";
    if (raw !== null && raw !== undefined) {
      return `Acc ${raw}% (${benchName})`;
    }
    return `OpenRouter (${benchName})`;
  }

  if (metric.startsWith("arena") || metric === "wulong") {
    return raw !== null && raw !== undefined ? `ELO ${raw} (Arena AI)` : "Arena AI";
  }

  if (raw !== null && raw !== undefined) {
    return m.category === "coding" ? `Code ${raw}` : `ELO ${raw}`;
  }

  return metric || null;
}

// Podium accent strip: gold / silver / bronze through theme tokens (light + dark).
const MEDAL_COLORS = ["bg-warning", "bg-border-strong", "bg-warning/50"];

const CATEGORY_BADGE: Record<string, "success" | "info" | "primary"> = {
  noauth: "success",
  oauth: "info",
};

const CATEGORY_OPTIONS = [
  { value: "default", labelKey: "categoryDefault" },
  { value: "coding", labelKey: "categoryCoding" },
  { value: "debugging", labelKey: "categoryDebugging" },
  { value: "review", labelKey: "categoryReview" },
  { value: "documentation", labelKey: "categoryDocumentation" },
  { value: "", labelKey: "allCategories" },
];

const TYPE_OPTIONS: Array<{ value: ProviderAuthType | ""; labelKey: string }> = [
  { value: "", labelKey: "typeAll" },
  { value: "noauth", labelKey: "typeNoauth" },
  { value: "oauth", labelKey: "typeOauth" },
  { value: "apikey", labelKey: "typeApikey" },
];

export default function FreeProviderRankingsPage() {
  const t = useTranslations("freeProviderRankingsPage");
  const tc = useTranslations("common");
  const [rankings, setRankings] = useState<FreeProviderRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Default to 'default' corresponding to the Artificial Analysis intelligence index
  const [filter, setFilter] = useState<string>("default");
  const [configuredOnly, setConfiguredOnly] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [freeModelsOnly, setFreeModelsOnly] = useState(false);
  const [expandedProviderIds, setExpandedProviderIds] = useState<Set<string>>(new Set());
  const [typeFilter, setTypeFilter] = useState<ProviderAuthType | "">("");
  const [groupByType, setGroupByType] = useState(false);
  const [sortByReliability, setSortByReliability] = useState(false);

  const toggleExpandProvider = useCallback((id: string) => {
    setExpandedProviderIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const fetchRankings = useCallback(
    async (
      category?: string,
      opts?: { configuredOnly?: boolean; availableOnly?: boolean; freeModelsOnly?: boolean }
    ) => {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams();
        if (category) params.set("category", category);
        if (opts?.configuredOnly) params.set("configuredOnly", "1");
        if (opts?.availableOnly) params.set("availableOnly", "1");
        if (opts?.freeModelsOnly) params.set("freeModelsOnly", "1");
        // Always: an ELO-only ranking describes a provider that errors on every
        // call as healthy. `usageRange` matches the health matrix default.
        params.set("withUsage", "1");
        params.set("usageRange", "24h");
        const res = await fetch(`/api/free-provider-rankings?${params.toString()}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setRankings(data.rankings || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : t("errorLoading"));
      } finally {
        setLoading(false);
      }
    },
    [t]
  );

  useEffect(() => {
    void (async () => {
      await fetchRankings(filter || undefined, { configuredOnly, availableOnly, freeModelsOnly });
    })();
  }, [filter, configuredOnly, availableOnly, freeModelsOnly, fetchRankings]);

  // Client-side Type filter + "group by type" sort (#6915) — purely derived
  // from the already-fetched `rankings`, never trigger a refetch.
  const displayedRankings = useMemo(() => {
    const filtered = filterRankingsByAuthType(rankings, typeFilter);
    // Reliability first, then grouping: the type sort compares categories only,
    // so a stable sort keeps the reliability order inside each group.
    const ordered = sortByReliability ? sortRankingsByReliability(filtered) : filtered;
    return groupByType ? sortRankingsAuthTypeFirst(ordered) : ordered;
  }, [rankings, typeFilter, groupByType, sortByReliability]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader compact title={t("title")} description={t("subtitle")} />

      {/* Filters */}
      <SegmentedControl
        semantics="radio"
        aria-label={t("categoryFilter")}
        value={filter}
        onChange={setFilter}
        options={CATEGORY_OPTIONS.map((opt) => ({
          value: opt.value,
          label:
            opt.value === "default"
              ? `${t(opt.labelKey)} (${t("categoryDefaultHint")})`
              : t(opt.labelKey),
        }))}
      />

      {/* Availability toggles (default off → show all providers) */}
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          size="sm"
          variant={configuredOnly ? "primary" : "outline"}
          onClick={() => setConfiguredOnly((v) => !v)}
          aria-pressed={configuredOnly}
        >
          {t("filterConfiguredOnly")}
        </Button>
        <Button
          size="sm"
          variant={availableOnly ? "primary" : "outline"}
          onClick={() => setAvailableOnly((v) => !v)}
          aria-pressed={availableOnly}
          title={t("filterAvailableOnlyHelp")}
        >
          {t("filterAvailableOnly")}
        </Button>
        <Button
          size="sm"
          variant={freeModelsOnly ? "primary" : "outline"}
          onClick={() => setFreeModelsOnly((v) => !v)}
          aria-pressed={freeModelsOnly}
          title={t("filterFreeModelsOnlyHelp")}
        >
          {t("filterFreeModelsOnly")}
        </Button>
      </div>

      {/* Type filter chips + "group by type" sort (#6915) */}
      <div className="flex items-center gap-2 flex-wrap">
        <div role="group" aria-label={t("colType")} className="flex items-center gap-2 flex-wrap">
          {TYPE_OPTIONS.map((opt) => (
            <Button
              key={opt.value || "all"}
              size="sm"
              variant={typeFilter === opt.value ? "primary" : "outline"}
              onClick={() => setTypeFilter(opt.value)}
              aria-pressed={typeFilter === opt.value}
            >
              {t(opt.labelKey)}
            </Button>
          ))}
        </div>
        <Button
          size="sm"
          variant={groupByType ? "primary" : "outline"}
          onClick={() => setGroupByType((v) => !v)}
          aria-pressed={groupByType}
          title={t("sortTypeFirstHelp")}
        >
          {t("sortTypeFirst")}
        </Button>
        <Button
          size="sm"
          variant={sortByReliability ? "primary" : "outline"}
          onClick={() => setSortByReliability((v) => !v)}
          aria-pressed={sortByReliability}
          title={t("sortByReliabilityHelp")}
        >
          {t("sortByReliability")}
        </Button>
      </div>
      <p className="text-xs text-text-muted">{t("typeLegend")}</p>

      {error && <Alert variant="critical" description={error} dismissLabel={tc("close")} />}

      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-text-muted" role="status" aria-live="polite">
            {t("loading")}
          </div>
        </div>
      ) : (
        <>
          {/* Top 3 Podium */}
          {displayedRankings.length >= 3 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {displayedRankings.slice(0, 3).map((provider, idx) => (
                <Card key={provider.id} className="relative overflow-hidden">
                  <div
                    aria-hidden="true"
                    className={`absolute top-0 left-0 right-0 h-1 ${MEDAL_COLORS[idx]}`}
                  />
                  <div className="flex items-center gap-4">
                    <div className="text-4xl" aria-hidden="true">
                      {idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div
                          className="ci-brand-tint bg-[var(--ci-brand-subtle)] w-6 h-6 rounded flex items-center justify-center text-[10px] font-semibold text-text-main"
                          style={brandTintVars(provider.color) as CSSProperties}
                        >
                          {provider.textIcon || provider.name.charAt(0)}
                        </div>
                        <p className="font-semibold truncate">{provider.name}</p>
                      </div>
                      {provider.topModel && (
                        <div className="mt-1 min-w-0">
                          <p className="text-sm text-text-muted truncate">
                            {t("bestModel")}: {provider.topModel.modelName}
                          </p>
                          {provider.topModel.permaslug && (
                            <p
                              className="text-[11px] font-mono text-text-muted truncate mt-0.5"
                              title={`Permaslug: ${provider.topModel.permaslug}`}
                            >
                              {provider.topModel.permaslug}
                            </p>
                          )}
                          <p
                            className={`text-lg font-semibold mt-1 ${scoreColor(provider.topModel.score)}`}
                          >
                            {scoreLabel(provider.topModel.score)}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="text-5xl font-black text-text-muted/20" aria-hidden="true">
                      {idx + 1}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Full List */}
          {displayedRankings.length > 0 && (
            <Card>
              <Table className="min-w-0" scrollbarLabel={t("title")}>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">{t("colRank")}</TableHead>
                    <TableHead>{t("colProvider")}</TableHead>
                    <TableHead>{t("colTopModel")}</TableHead>
                    <TableHead className="text-right">{t("colScore")}</TableHead>
                    <TableHead className="text-right">{t("colAvgScore")}</TableHead>
                    <TableHead className="text-right" title={t("colReliabilityHelp")}>
                      {t("colReliability")}
                    </TableHead>
                    <TableHead className="text-right">{t("colModels")}</TableHead>
                    <TableHead className="text-right" title={t("typeLegend")}>
                      {t("colType")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedRankings.map((provider, idx) => (
                    <Fragment key={provider.id}>
                      <TableRow>
                        <TableCell className="text-text-muted font-mono">{idx + 1}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => toggleExpandProvider(provider.id)}
                              className="p-1 -ml-1 text-text-muted hover:text-text-main transition-colors"
                              title={
                                expandedProviderIds.has(provider.id)
                                  ? t("collapseModels")
                                  : t("expandModels")
                              }
                              aria-expanded={expandedProviderIds.has(provider.id)}
                            >
                              <span className="text-xs inline-block" aria-hidden="true">
                                {expandedProviderIds.has(provider.id) ? "▼" : "▶"}
                              </span>
                            </button>
                            <div
                              className="ci-brand-tint bg-[var(--ci-brand-subtle)] w-6 h-6 rounded flex items-center justify-center text-[10px] font-semibold text-text-main"
                              style={brandTintVars(provider.color) as CSSProperties}
                            >
                              {provider.textIcon || provider.name.charAt(0)}
                            </div>
                            <span className="font-medium">{provider.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-text-muted max-w-[220px]">
                          <div className="flex flex-col min-w-0">
                            <span className="truncate">{provider.topModel?.modelName || "—"}</span>
                            {provider.topModel && (
                              <div className="flex items-center gap-1.5 flex-wrap">
                                {provider.topModel.permaslug && (
                                  <span
                                    className="font-mono text-[10px] truncate mt-0.5"
                                    title={`Permaslug: ${provider.topModel.permaslug}`}
                                  >
                                    {provider.topModel.permaslug}
                                  </span>
                                )}
                                {formatBenchmarkMetric(provider.topModel) && (
                                  <span
                                    className="text-[10px] mt-0.5"
                                    title={provider.topModel.metric || undefined}
                                  >
                                    • {formatBenchmarkMetric(provider.topModel)}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {provider.topModel ? (
                            <span
                              className={`font-mono font-medium ${scoreColor(provider.topModel.score)}`}
                            >
                              {scoreLabel(provider.topModel.score)}
                            </span>
                          ) : (
                            "—"
                          )}
                        </TableCell>
                        <TableCell className="text-right font-mono text-text-muted">
                          {scoreLabel(provider.averageScore)}
                        </TableCell>
                        <TableCell className="text-right">
                          {(() => {
                            const u = formatUsageReliability(provider.reliability?.usage);
                            const title =
                              u.kind === "rate"
                                ? t("reliabilitySample", {
                                    successes: u.successes,
                                    requests: u.requests,
                                    hours: u.windowHours,
                                  })
                                : u.kind === "insufficient"
                                  ? t("reliabilityTooFew", {
                                      requests: u.requests,
                                      hours: u.windowHours,
                                    })
                                  : t("reliabilityNoTraffic");
                            return (
                              <span className={`font-mono ${usageToneClass(u.tone)}`} title={title}>
                                {u.kind === "rate" ? `${u.percent}%` : "—"}
                              </span>
                            );
                          })()}
                        </TableCell>
                        <TableCell className="text-right">
                          <button
                            type="button"
                            onClick={() => toggleExpandProvider(provider.id)}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-medium text-text-muted hover:text-text-main hover:bg-surface-hover transition-colors"
                            title={
                              expandedProviderIds.has(provider.id)
                                ? t("collapseModels")
                                : t("expandModels")
                            }
                            aria-expanded={expandedProviderIds.has(provider.id)}
                          >
                            <span>{provider.modelCount}</span>
                            <span className="text-[10px]" aria-hidden="true">
                              {expandedProviderIds.has(provider.id) ? "▲" : "▼"}
                            </span>
                          </button>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge size="sm" variant={CATEGORY_BADGE[provider.category] ?? "primary"}>
                            {provider.category.toUpperCase()}
                          </Badge>
                        </TableCell>
                      </TableRow>

                      {/* Expandable considered-models row */}
                      {expandedProviderIds.has(provider.id) && (
                        <TableRow>
                          <TableCell colSpan={8} className="p-4">
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center justify-between text-xs text-text-muted">
                                <span className="font-semibold text-text-main">
                                  {t("consideredModelsTitle", {
                                    count: provider.models?.length || provider.modelCount,
                                  })}
                                </span>
                                <span>{t("sortedByScoreDesc")}</span>
                              </div>
                              <div className="max-h-64 overflow-y-auto rounded-lg border border-border">
                                <table className="w-full text-xs">
                                  <thead className="bg-surface text-text-muted sticky top-0 border-b border-border">
                                    <tr>
                                      <th className="py-2 px-3 text-left font-medium">#</th>
                                      <th className="py-2 px-3 text-left font-medium">
                                        {t("colModel")}
                                      </th>
                                      <th className="py-2 px-3 text-left font-medium">
                                        {t("colPermaslug")}
                                      </th>
                                      <th className="py-2 px-3 text-center font-medium">
                                        {t("colStatus")}
                                      </th>
                                      <th className="py-2 px-3 text-right font-medium">
                                        {t("colScore")}
                                      </th>
                                      <th className="py-2 px-3 text-right font-medium">
                                        {t("colCategory")}
                                      </th>
                                      <th className="py-2 px-3 text-right font-medium">
                                        {t("colConfidence")}
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-border">
                                    {provider.models && provider.models.length > 0 ? (
                                      provider.models.map((m, mIdx) => (
                                        <tr key={`${m.modelId}-${mIdx}`}>
                                          <td className="py-2 px-3 font-mono text-text-muted">
                                            {mIdx + 1}
                                          </td>
                                          <td className="py-2 px-3 font-medium text-text-main">
                                            <div className="flex flex-col">
                                              <span>{m.modelName}</span>
                                              <span className="font-mono text-[10px] text-text-muted">
                                                {m.modelId}
                                              </span>
                                            </div>
                                          </td>
                                          <td
                                            className="py-2 px-3 font-mono text-[11px] text-text-muted truncate max-w-[200px]"
                                            title={m.permaslug || m.modelId}
                                          >
                                            {m.permaslug || "—"}
                                          </td>
                                          <td className="py-2 px-3 text-center">
                                            <Badge
                                              size="sm"
                                              variant={m.isFree ? "success" : "default"}
                                            >
                                              {m.isFree ? "FREE" : "PAID"}
                                            </Badge>
                                          </td>
                                          <td className="py-2 px-3 text-right font-mono">
                                            <span
                                              className={`font-semibold ${scoreColor(m.score)}`}
                                            >
                                              {m.score.toFixed(4)}
                                            </span>
                                            <span className="text-text-muted ml-1">
                                              ({scoreLabel(m.score)})
                                            </span>
                                            {formatBenchmarkMetric(m) && (
                                              <span
                                                className="block text-[10px] text-text-muted font-normal mt-0.5"
                                                title={m.metric || undefined}
                                              >
                                                {formatBenchmarkMetric(m)}
                                              </span>
                                            )}
                                          </td>
                                          <td className="py-2 px-3 text-right font-mono text-text-muted">
                                            {m.category}
                                          </td>
                                          <td className="py-2 px-3 text-right">
                                            <span
                                              className={`capitalize ${
                                                m.confidence === "high"
                                                  ? "text-success"
                                                  : m.confidence === "medium"
                                                    ? "text-warning"
                                                    : "text-text-muted"
                                              }`}
                                            >
                                              {m.confidence || "—"}
                                            </span>
                                          </td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td
                                          colSpan={7}
                                          className="py-4 text-center text-text-muted"
                                        >
                                          {t("noModelsConsidered")}
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </Fragment>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}

          {displayedRankings.length === 0 && !error && (
            <EmptyState icon="leaderboard" title={t("emptyState")} />
          )}
        </>
      )}
    </div>
  );
}
