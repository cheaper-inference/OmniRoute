"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import { Button } from "@omniroute/ui-kit/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import { PROVIDER_COLORS as CHART_SERIES_COLORS } from "@/shared/components/analytics/chartColors";
import Select from "@/shared/components/Select";
import Input from "@/shared/components/Input";
import Checkbox from "@/shared/components/Checkbox";
import Icon from "@/shared/components/Icon";
import Badge from "@/shared/components/Badge";
import Card from "@/shared/components/Card";
import { matchesSearch } from "@/shared/utils/turkishText";

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

export interface FreeBudgetPerModel {
  provider: string;
  modelId: string;
  displayName: string;
  monthlyTokens: number;
  creditTokens: number;
  freeType: string;
  poolKey: string | null;
  tos: string;
}

export interface FreeBudgetData {
  steadyRecurringTokens: number;
  steadyWithRecurringCreditsTokens: number;
  firstMonthRealisticTokens: number;
  usedThisMonth: number;
  remaining: number;
  modelCount: number;
  poolCount: number;
  perModel: FreeBudgetPerModel[];
  /** Extra recurring tokens/mo unlocked by a one-time small deposit (OpenRouter $10 → 1000 RPD). */
  boostMonthlyTokens?: number;
  /** Providers that are permanently free but publish no token cap (rate/concurrency-limited). */
  uncappedProviders?: string[];
  /** Pool-deduped tokens/mo behind a regional identity check — real quota, never in the headline. */
  gatedRecurringTokens?: number;
  /** Providers behind that check. */
  gatedProviders?: string[];
  headline?: string;
  /** ISO release curation date or Radar feed generation timestamp. */
  catalogUpdatedAt?: string | null;
  catalogSource?: "baseline" | "radar-overlay";
  /**
   * Providers callable with nothing configured, derived server-side from real
   * routing behaviour (see shared/utils/providerCredentialRequirement). NOT the
   * same as freeType: "keyless", which only means "not quantifiable in tokens"
   * — several of those reject anonymous calls with 401/403.
   */
  noCredentialProviders?: string[];
}

export type FreeBudgetSort = "tokens" | "name" | "provider";

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

function fmt(n: number): string {
  if (n >= 1e9) return (n / 1e9).toFixed(2).replace(/\.?0+$/, "") + "B";
  if (n >= 1e6) return Math.round(n / 1e6) + "M";
  if (n >= 1e3) return Math.round(n / 1e3) + "K";
  return String(n);
}

export function formatRelativeAge(iso: string, nowMs: number, locale: string): string | null {
  const timestamp = Date.parse(iso);
  if (Number.isNaN(timestamp) || !Number.isFinite(nowMs)) return null;

  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  const minutes = Math.floor(Math.max(0, nowMs - timestamp) / 60_000);
  if (minutes === 0) return formatter.format(0, "second");
  if (minutes < 60) return formatter.format(-minutes, "minute");
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return formatter.format(-hours, "hour");
  const days = Math.floor(hours / 24);
  if (days < 30) return formatter.format(-days, "day");
  const months = Math.floor(days / 30);
  if (months < 12) return formatter.format(-months, "month");
  return formatter.format(-Math.floor(months / 12), "year");
}

export function formatCuratedDate(isoDate: string, locale: string): string | null {
  const timestamp = Date.parse(isoDate);
  if (Number.isNaN(timestamp)) return null;
  return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone: "UTC" }).format(
    timestamp
  );
}

interface FreeBudgetLabels {
  title: string;
  remaining: (remaining: string, percent: number, total: string) => string;
  steadyMonth: string;
  firstMonth: string;
  usedThisMonth: string;
  segmentHint: string;
  boost: (tokens: string) => string;
  uncapped: string;
  gated: (tokens: string) => string;
  tosRestricted: (count: number) => string;
  provider: string;
  model: string;
  type: string;
  tokensMonth: string;
  credit: (tokens: string) => string;
  freeTypes: Record<string, string>;
  tosTitles: Record<string, string>;
  noApiKey: string;
  keylessCount: (models: number, providers: number) => string;
  noMatches: string;
  tosColumn: string;
  updatedRelative: (age: string) => string;
  curatedOn: (date: string) => string;
}

export function getFreeBudgetLabels(
  t: ReturnType<typeof useTranslations<"freeBudget">>
): FreeBudgetLabels {
  return {
    title: t("title"),
    remaining: (remaining, percent, total) => t("remaining", { remaining, percent, total }),
    steadyMonth: t("steadyMonth"),
    firstMonth: t("firstMonth"),
    usedThisMonth: t("usedThisMonth"),
    segmentHint: t("segmentHint"),
    boost: (tokens) => t("boost", { tokens }),
    uncapped: t("uncapped"),
    gated: (tokens) => t("gated", { tokens }),
    tosRestricted: (count) => t("tosRestricted", { count }),
    provider: t("provider"),
    model: t("model"),
    type: t("type"),
    tokensMonth: t("tokensMonth"),
    credit: (tokens) => t("credit", { tokens }),
    noApiKey: t("noApiKeyRequired"),
    keylessCount: (models, providers) => t("keylessCount", { models, providers }),
    noMatches: t("noMatches"),
    tosColumn: t("tosColumn"),
    updatedRelative: (age) => t("updatedRelative", { age }),
    curatedOn: (date) => t("curatedOn", { date }),
    freeTypes: {
      "recurring-daily": t("freeType.daily"),
      "recurring-monthly": t("freeType.monthly"),
      "recurring-credit": t("freeType.creditMonthly"),
      "recurring-uncapped": t("freeType.uncapped"),
      "one-time-initial": t("freeType.signupCredit"),
      keyless: t("freeType.keyless"),
      discontinued: t("freeType.discontinued"),
    },
    tosTitles: {
      avoid: t("tosTitle.avoid"),
      caution: t("tosTitle.caution"),
      ok: t("tosTitle.ok"),
    },
  };
}

// Distinct hues for stacked bar segments (cycling) — the shared analytics chart-token palette.
const BAR_HUES = CHART_SERIES_COLORS;

const RECURRING_TYPES = new Set(["recurring-daily", "recurring-monthly", "keyless"]);

interface BarSegment {
  key: string;
  label: string;
  tokens: number;
  color: string;
}

/**
 * Build an ordered list of bar segments from per-model data.
 * Recurring models sharing a poolKey collapse to ONE segment (pool MAX); poolKey===null
 * models each get a segment. Segments therefore sum to `steadyRecurringTokens`.
 */
function buildBarSegments(perModel: FreeBudgetPerModel[]): BarSegment[] {
  const providerColorCache = new Map<string, string>();
  function colorFor(provider: string): string {
    if (!providerColorCache.has(provider)) {
      providerColorCache.set(provider, BAR_HUES[providerColorCache.size % BAR_HUES.length]);
    }
    return providerColorCache.get(provider)!;
  }

  const seenPools = new Map<string, BarSegment>();
  const looseSegments: BarSegment[] = [];

  for (const m of perModel) {
    if (!RECURRING_TYPES.has(m.freeType)) continue;
    if (m.monthlyTokens <= 0) continue;

    if (m.poolKey) {
      const existing = seenPools.get(m.poolKey);
      if (!existing) {
        seenPools.set(m.poolKey, {
          key: `pool:${m.poolKey}`,
          label: `${m.displayName} (${m.provider})`,
          tokens: m.monthlyTokens,
          color: colorFor(m.provider),
        });
      } else if (m.monthlyTokens > existing.tokens) {
        seenPools.set(m.poolKey, {
          ...existing,
          tokens: m.monthlyTokens,
          label: `${m.displayName} (${m.provider})`,
        });
      }
    } else {
      looseSegments.push({
        key: `model:${m.modelId}`,
        label: `${m.displayName}`,
        tokens: m.monthlyTokens,
        color: colorFor(m.provider),
      });
    }
  }

  return [...seenPools.values(), ...looseSegments];
}

function colorForProvider(perModel: FreeBudgetPerModel[]): Map<string, string> {
  const cache = new Map<string, string>();
  for (const m of perModel) {
    if (!cache.has(m.provider)) cache.set(m.provider, BAR_HUES[cache.size % BAR_HUES.length]);
  }
  return cache;
}

function sortRows(rows: FreeBudgetPerModel[], sort: FreeBudgetSort): FreeBudgetPerModel[] {
  const copy = rows.slice();
  if (sort === "name") return copy.sort((a, b) => a.displayName.localeCompare(b.displayName));
  if (sort === "provider")
    return copy.sort(
      (a, b) => a.provider.localeCompare(b.provider) || b.monthlyTokens - a.monthlyTokens
    );
  return copy.sort((a, b) => b.monthlyTokens - a.monthlyTokens || b.creditTokens - a.creditTokens);
}

/**
 * Substring filter across displayName / modelId / provider (case-insensitive).
 * Empty/whitespace-only query is a no-op (returns all rows).
 */
function filterRows(
  rows: FreeBudgetPerModel[],
  {
    search,
    providerFilter,
    keylessOnly,
    noCredentialProviders,
  }: {
    search: string;
    providerFilter: string;
    keylessOnly: boolean;
    noCredentialProviders: string[];
  }
): FreeBudgetPerModel[] {
  let out = rows;
  if (keylessOnly) out = out.filter((m) => noCredentialProviders.includes(m.provider));
  if (providerFilter !== "all") out = out.filter((m) => m.provider === providerFilter);
  if (search.trim()) {
    out = out.filter(
      (m) =>
        matchesSearch(m.displayName, search) ||
        matchesSearch(m.modelId, search) ||
        matchesSearch(m.provider, search)
    );
  }
  return out;
}

function tosBadge(
  tos: string,
  labels: FreeBudgetLabels
): { icon: string; cls: string; title: string } | null {
  if (tos === "avoid") {
    return { icon: "warning", cls: "text-warning", title: labels.tosTitles.avoid };
  }
  if (tos === "caution") {
    return { icon: "bolt", cls: "text-text-muted", title: labels.tosTitles.caution };
  }
  if (tos === "ok") {
    return { icon: "check_circle", cls: "text-success", title: labels.tosTitles.ok };
  }
  return null;
}

// ────────────────────────────────────────────────────────────────────────────
// KPI tile
// ────────────────────────────────────────────────────────────────────────────

function Kpi({ label, value, valueClass }: { label: string; value: string; valueClass?: string }) {
  return (
    <Card.Section className="flex flex-col gap-0.5">
      <span className="ci-eyebrow" data-size="3xs">
        {label}
      </span>
      <span className={`text-[19px] font-semibold tabular-nums ${valueClass ?? "text-text-main"}`}>
        {value}
      </span>
    </Card.Section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Free-type badge (keyless gets an emerald highlight; the rest stay neutral)
// ────────────────────────────────────────────────────────────────────────────

function FreeTypeBadge({ freeType, label }: { freeType: string; label: string }) {
  const isKeyless = freeType === "keyless";
  return (
    <Badge
      data-testid="free-type-badge"
      size="sm"
      variant={isKeyless ? "success" : "default"}
      icon={isKeyless ? <Icon name="lock_open" size={12} /> : undefined}
      className="whitespace-nowrap"
    >
      {label}
    </Badge>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Pure view (SSR-testable — no hooks). Sort/filter are controlled via props.
// ────────────────────────────────────────────────────────────────────────────

export function FreeBudgetView({
  data,
  sort = "tokens",
  hideAvoid = false,
  search = "",
  providerFilter = "all",
  keylessOnly = false,
  labels,
  nowMs,
  locale = "en",
}: {
  data: FreeBudgetData;
  sort?: FreeBudgetSort;
  hideAvoid?: boolean;
  search?: string;
  providerFilter?: string;
  keylessOnly?: boolean;
  labels: FreeBudgetLabels;
  nowMs?: number;
  locale?: string;
}) {
  const {
    steadyRecurringTokens,
    firstMonthRealisticTokens,
    usedThisMonth,
    remaining,
    perModel,
    boostMonthlyTokens = 0,
    uncappedProviders = [],
    gatedRecurringTokens = 0,
    gatedProviders = [],
    catalogUpdatedAt,
    catalogSource,
    noCredentialProviders = [],
  } = data;

  const pct = steadyRecurringTokens > 0 ? Math.round((remaining / steadyRecurringTokens) * 100) : 0;
  const avoidModels = perModel.filter((m) => m.tos === "avoid");

  const barSegments = buildBarSegments(perModel);
  const totalBarTokens = barSegments.reduce((s, seg) => s + seg.tokens, 0);
  const providerColor = colorForProvider(perModel);

  // "No API key required" — derived from routing behaviour, NOT from
  // freeType: "keyless". That field means "free access not quantifiable in
  // tokens"; probing the endpoints showed several of those rows (blackbox,
  // iflytek, sparkdesk, friendliai, muse-spark-web) answering 401/403
  // with no credential. Listing them here would invite users to call providers
  // that reject them.
  const keylessModels = perModel.filter((m) => noCredentialProviders.includes(m.provider));
  const keylessProviders = Array.from(new Set(keylessModels.map((m) => m.provider))).sort();

  // Table rows: only entries with real budget; hide-ToS-avoid + search + provider + keyless filters; sorted.
  let rows = perModel.filter((m) => m.monthlyTokens > 0 || m.creditTokens > 0);
  if (hideAvoid) rows = rows.filter((m) => m.tos !== "avoid");
  rows = filterRows(rows, { search, providerFilter, keylessOnly, noCredentialProviders });
  rows = sortRows(rows, sort);

  const isRadarOverlay = catalogSource === "radar-overlay";
  let formattedCatalogDate: string | null = null;
  if (catalogUpdatedAt && !isRadarOverlay) {
    formattedCatalogDate = formatCuratedDate(catalogUpdatedAt, locale);
  } else if (catalogUpdatedAt && nowMs !== undefined) {
    formattedCatalogDate = formatRelativeAge(catalogUpdatedAt, nowMs, locale);
  }

  return (
    <div className="rounded-lg border border-border bg-surface">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
        <Icon name="savings" size={14} className="text-text-muted" />
        <span className="text-[13px] font-semibold text-text-main">{labels.title}</span>
        {formattedCatalogDate && (
          <span
            data-testid="catalog-freshness"
            className="text-3xs text-text-muted"
            title={catalogUpdatedAt ?? undefined}
          >
            {isRadarOverlay
              ? labels.updatedRelative(formattedCatalogDate)
              : labels.curatedOn(formattedCatalogDate)}
          </span>
        )}
        <span className="ml-auto text-2xs text-text-muted tabular-nums">
          {labels.remaining(fmt(remaining), pct, fmt(steadyRecurringTokens))}
        </span>
      </div>

      {/* KPI tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 px-3 pt-3">
        <Kpi label={labels.steadyMonth} value={`~${fmt(steadyRecurringTokens)}`} />
        <Kpi
          label={labels.firstMonth}
          value={`~${fmt(firstMonthRealisticTokens)}`}
          valueClass="text-success"
        />
        <Kpi label={labels.usedThisMonth} value={fmt(usedThisMonth)} valueClass="text-text-muted" />
      </div>

      {/* Stacked bar — pool-deduped; segments sum to steadyRecurringTokens */}
      {barSegments.length > 0 && (
        <div className="px-3 pt-3">
          <div
            role="progressbar"
            aria-label={labels.title}
            aria-valuemin={0}
            aria-valuemax={Math.max(totalBarTokens, 1)}
            aria-valuenow={totalBarTokens}
            aria-valuetext={barSegments.map((seg) => `${seg.label}: ${fmt(seg.tokens)}`).join(", ")}
            className="flex h-3 rounded-sm overflow-hidden w-full"
            data-testid="budget-bar"
          >
            {barSegments.map((seg) => {
              const width =
                totalBarTokens > 0 ? ((seg.tokens / totalBarTokens) * 100).toFixed(2) : "0";
              return (
                <div
                  key={seg.key}
                  title={`${seg.label}: ${fmt(seg.tokens)}`}
                  data-testid="bar-segment"
                  style={{ flexBasis: `${width}%`, background: seg.color, minWidth: "2px" }}
                />
              );
            })}
          </div>
          <p className="mt-1 text-2xs text-text-muted">{labels.segmentHint}</p>
        </div>
      )}

      {/* "No API key required" — highlighted overview of keyless providers */}
      {keylessProviders.length > 0 && (
        <div
          data-testid="keyless-section"
          className="mx-3 mt-2 rounded-md border border-success/30 bg-success/5 px-3 py-2"
        >
          <div className="flex items-center gap-1.5">
            <Icon name="lock_open" size={14} className="text-success" />
            <span className="text-2xs font-semibold text-success">{labels.noApiKey}</span>
            <span className="text-2xs text-text-muted">
              {labels.keylessCount(keylessModels.length, keylessProviders.length)}
            </span>
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            {keylessProviders.map((p) => (
              <span
                key={p}
                className="inline-flex items-center rounded-full border px-2 py-0.5 text-2xs text-text-muted tabular-nums"
                style={{ borderColor: providerColor.get(p) ?? "var(--color-border)" }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Boost + uncapped callouts */}
      {boostMonthlyTokens > 0 && (
        <div className="mx-3 mt-2 flex items-center gap-2 rounded-md border border-success/30 bg-success/10 px-3 py-1.5">
          <Icon name="bolt" size={14} className="text-success" />
          <span className="text-2xs text-success">{labels.boost(fmt(boostMonthlyTokens))}</span>
        </div>
      )}
      {uncappedProviders.length > 0 && (
        <Card.Section className="mx-3 mt-2">
          <span className="text-2xs text-text-muted">{labels.uncapped}</span>
          <div className="mt-1 flex flex-wrap gap-1">
            {uncappedProviders.map((p) => (
              <span
                key={p}
                className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-2xs text-text-muted tabular-nums"
                style={{ borderColor: providerColor.get(p) ?? "var(--color-border)" }}
              >
                {p}
              </span>
            ))}
          </div>
        </Card.Section>
      )}
      {gatedRecurringTokens > 0 && (
        <div className="mx-3 mt-2 rounded-md border border-warning/30 bg-warning/10 px-3 py-2">
          <span className="text-2xs text-warning">{labels.gated(fmt(gatedRecurringTokens))}</span>
          <div className="mt-1 flex flex-wrap gap-1">
            {gatedProviders.map((p) => (
              <span
                key={p}
                className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-2xs text-text-muted tabular-nums"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ToS-restricted callout */}
      {avoidModels.length > 0 && (
        <div className="mx-3 mt-2 flex items-center gap-2 rounded-md border border-warning/30 bg-warning/10 px-3 py-1.5">
          <Icon name="warning" size={14} className="text-text-muted" />
          <span className="text-2xs text-warning">{labels.tosRestricted(avoidModels.length)}</span>
        </div>
      )}

      {/* Per-model table */}
      <div className="px-3 pb-3 pt-2">
        <Table
          density="compact"
          className="min-w-0"
          variant="plain"
          scrollbarLabel={labels.model}
          scrollLabel={labels.model}
          data-testid="budget-table"
        >
          <TableHeader>
            <TableRow>
              <TableHead>{labels.provider}</TableHead>
              <TableHead>{labels.model}</TableHead>
              <TableHead>{labels.type}</TableHead>
              <TableHead numeric>{labels.tokensMonth}</TableHead>
              <TableHead align="center">{labels.tosColumn}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-3 text-center text-text-muted">
                  {labels.noMatches}
                </TableCell>
              </TableRow>
            )}
            {rows.map((m) => {
              const badge = tosBadge(m.tos, labels);
              const amount =
                m.monthlyTokens > 0
                  ? fmt(m.monthlyTokens)
                  : m.creditTokens > 0
                    ? labels.credit(fmt(m.creditTokens))
                    : "—";
              return (
                <TableRow key={`${m.provider}:${m.modelId}`}>
                  <TableCell>
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className="inline-block w-2 h-2 rounded-sm flex-shrink-0"
                        style={{ background: providerColor.get(m.provider) ?? BAR_HUES[0] }}
                      />
                      <span className="text-text-muted">{m.provider}</span>
                    </span>
                  </TableCell>
                  <TableCell className="text-text-main truncate max-w-[180px]" title={m.modelId}>
                    {m.displayName}
                  </TableCell>
                  <TableCell>
                    <FreeTypeBadge
                      freeType={m.freeType}
                      label={labels.freeTypes[m.freeType] ?? m.freeType}
                    />
                  </TableCell>
                  <TableCell numeric className="text-text-main">
                    {amount}
                  </TableCell>
                  <TableCell align="center">
                    {badge && (
                      <span className={`inline-flex ${badge.cls}`} title={badge.title}>
                        <Icon name={badge.icon} size={13} ariaLabel={badge.title} />
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export type FreeBudgetLoadState = "loading" | "error";

export function FreeBudgetPlaceholder({
  state,
  labels,
  onRetry,
}: {
  state: FreeBudgetLoadState;
  labels: { loading: string; loadFailed: string; retry: string };
  onRetry?: () => void;
}): React.JSX.Element {
  if (state === "loading") {
    return (
      <div role="status" className="rounded-lg border border-border bg-surface p-3 text-text-muted">
        {labels.loading}
      </div>
    );
  }

  return (
    <Alert
      variant="warning"
      dismissible={false}
      actions={
        onRetry ? (
          <Button type="button" variant="outline" size="sm" onClick={onRetry}>
            {labels.retry}
          </Button>
        ) : undefined
      }
    >
      {labels.loadFailed}
    </Alert>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Fetch + interactivity wrapper (client component)
// ────────────────────────────────────────────────────────────────────────────

export default function FreeBudgetCard() {
  const t = useTranslations("freeBudget");
  const locale = useLocale();
  const [loaded, setData] = useState<{ data: FreeBudgetData; nowMs: number } | null>(null);
  const [loadState, setLoadState] = useState<FreeBudgetLoadState>("loading");
  const [sort, setSort] = useState<FreeBudgetSort>("tokens");
  const [hideAvoid, setHideAvoid] = useState(false);
  const [search, setSearch] = useState("");
  const [providerFilter, setProviderFilter] = useState("all");
  const [keylessOnly, setKeylessOnly] = useState(false);

  useEffect(() => {
    fetch("/api/free-tier/summary")
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (json) setData({ data: json as FreeBudgetData, nowMs: Date.now() });
        else setLoadState("error");
      })
      .catch(() => {
        setLoadState("error");
      });
  }, []);

  const providers = useMemo(() => {
    if (!loaded) return [];
    return Array.from(new Set(loaded.data.perModel.map((m) => m.provider))).sort();
  }, [loaded]);

  if (!loaded) {
    return (
      <FreeBudgetPlaceholder
        state={loadState}
        labels={{ loading: t("loading"), loadFailed: t("loadFailed"), retry: t("retry") }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2 px-1 text-2xs text-text-muted">
        <Input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("searchPlaceholder")}
          aria-label={t("searchAria")}
          data-testid="budget-search-input"
          className="min-w-[160px]"
          inputClassName="text-2xs"
        />
        <Select
          compact
          value={providerFilter}
          onChange={(e) => setProviderFilter(e.target.value)}
          aria-label={t("filterProviderAria")}
          data-testid="budget-provider-select"
          className="w-auto"
        >
          <option value="all">{t("allProviders")}</option>
          {providers.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </Select>
        <Checkbox
          label={t("keylessOnly")}
          checked={keylessOnly}
          onChange={(e) => setKeylessOnly(e.target.checked)}
          data-testid="budget-keyless-toggle"
          className="text-2xs"
        />
        <Checkbox
          label={t("hideTosRestricted")}
          checked={hideAvoid}
          onChange={(e) => setHideAvoid(e.target.checked)}
          className="text-2xs"
        />
        <span className="ml-auto inline-flex min-w-0 max-w-full items-center gap-1.5">
          {t("sort")}
          <Select
            compact
            value={sort}
            onChange={(e) => setSort(e.target.value as FreeBudgetSort)}
            aria-label={t("sort")}
            className="w-auto min-w-0"
          >
            <option value="tokens">{t("tokensMonth")}</option>
            <option value="provider">{t("provider")}</option>
            <option value="name">{t("modelName")}</option>
          </Select>
        </span>
      </div>
      <FreeBudgetView
        data={loaded.data}
        nowMs={loaded.nowMs}
        locale={locale}
        sort={sort}
        hideAvoid={hideAvoid}
        search={search}
        providerFilter={providerFilter}
        keylessOnly={keylessOnly}
        labels={getFreeBudgetLabels(t)}
      />
    </div>
  );
}
