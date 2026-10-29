"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import { EmptyState } from "@omniroute/ui-kit/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import { Badge, Card, Button, Input } from "@/shared/components";
import Icon from "@/shared/components/Icon";
import ProviderIcon from "@/shared/components/ProviderIcon";
import InfoTooltip from "@/shared/components/InfoTooltip";
import { compareTr, matchesSearch } from "@/shared/utils/turkishText";
import { extractApiErrorMessage } from "@/shared/http/apiErrorMessage";
import { FilterSelect, HeroStat, SyncMini } from "./PricingTabHelpers";

type CoverageFilter = "all" | "lt50" | "gte50lt100" | "full";
type AuthFilter = "all" | "oauth" | "apikey" | "unknown";
type SortKey = "modelsDesc" | "coverageDesc" | "coverageAsc" | "nameAsc";

const INITIAL_VISIBLE = 20;
const VISIBLE_INCREMENT = 30;

const PRICING_FIELDS = ["input", "output", "cached", "reasoning", "cache_creation"] as const;
const FIELD_LABEL_KEYS: Record<(typeof PRICING_FIELDS)[number], string> = {
  input: "input",
  output: "output",
  cached: "cached",
  reasoning: "reasoning",
  cache_creation: "cacheCreation",
};

type PricingField = (typeof PRICING_FIELDS)[number];
type PricingSource = "default" | "litellm" | "modelsDev" | "user";

interface SyncStatus {
  enabled: boolean;
  lastSync: string | null;
  lastSyncModelCount: number;
  nextSync: string | null;
  intervalMs: number;
  sources: string[];
}

interface PricingCatalogModel {
  id: string;
  name: string;
  custom?: boolean;
}

interface PricingCatalogProvider {
  id: string;
  alias: string;
  authType: string;
  format: string;
  modelCount: number;
  models: PricingCatalogModel[];
  /** Original pricing namespace (e.g. public prefix) when it differs from `alias`. */
  pricingKey?: string;
}

function getSourceTone(source: PricingSource): string {
  switch (source) {
    case "user":
      return "bg-warning/15 text-warning border border-warning/25";
    case "modelsDev":
      return "bg-info/15 text-info border border-info/25";
    case "litellm":
      return "bg-success/15 text-success border border-success/25";
    default:
      return "bg-bg-subtle text-text-muted border border-border/40";
  }
}

type PricingBundle = {
  catalog?: Record<string, PricingCatalogProvider>;
  pricing?: Record<string, Record<string, Record<string, number>>>;
  sources?: Record<string, Record<string, PricingSource>>;
  sync?: SyncStatus;
};

async function fetchPricingBundle(): Promise<PricingBundle> {
  const [catalogRes, pricingRes, syncRes] = await Promise.all([
    fetch("/api/pricing/models"),
    fetch("/api/pricing?includeSources=1"),
    fetch("/api/pricing/sync"),
  ]);
  const bundle: PricingBundle = {};
  if (catalogRes.ok) {
    bundle.catalog = (await catalogRes.json()) as Record<string, PricingCatalogProvider>;
  }
  if (pricingRes.ok) {
    const pricingPayload = (await pricingRes.json()) as {
      pricing?: Record<string, Record<string, Record<string, number>>>;
      sourceMap?: Record<string, Record<string, PricingSource>>;
    };
    bundle.pricing = pricingPayload.pricing || {};
    bundle.sources = pricingPayload.sourceMap || {};
  }
  if (syncRes.ok) {
    bundle.sync = (await syncRes.json()) as SyncStatus;
  }
  return bundle;
}

export default function PricingTab() {
  const [catalog, setCatalog] = useState<Record<string, PricingCatalogProvider>>({});
  const [pricingData, setPricingData] = useState<
    Record<string, Record<string, Record<string, number>>>
  >({});
  const [pricingSources, setPricingSources] = useState<
    Record<string, Record<string, PricingSource>>
  >({});
  const [syncStatus, setSyncStatus] = useState<SyncStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [expandedProviders, setExpandedProviders] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [coverageFilter, setCoverageFilter] = useState<CoverageFilter>("all");
  const [authFilter, setAuthFilter] = useState<AuthFilter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("modelsDesc");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [editedProviders, setEditedProviders] = useState<Set<string>>(new Set());
  const [statusMessage, setStatusMessage] = useState<{
    tone: "success" | "error" | "info";
    message: string;
  } | null>(null);
  const t = useTranslations("settings");

  const showStatus = useCallback((tone: "success" | "error" | "info", message: string) => {
    setStatusMessage({ tone, message });
    window.setTimeout(() => setStatusMessage(null), 4000);
  }, []);

  const applyPricingBundle = useCallback((bundle: PricingBundle) => {
    if (bundle.catalog) setCatalog(bundle.catalog);
    if (bundle.pricing) setPricingData(bundle.pricing);
    if (bundle.sources) setPricingSources(bundle.sources);
    if (bundle.sync) setSyncStatus(bundle.sync);
    setLoading(false);
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      applyPricingBundle(await fetchPricingBundle());
    } catch (error) {
      console.error("Failed to load pricing data:", error);
      showStatus("error", t("pricingLoadFailed"));
      setLoading(false);
    }
  }, [applyPricingBundle, showStatus, t]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const bundle = await fetchPricingBundle();
        if (!cancelled) applyPricingBundle(bundle);
      } catch (error) {
        console.error("Failed to load pricing data:", error);
        if (!cancelled) {
          showStatus("error", t("pricingLoadFailed"));
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [applyPricingBundle, showStatus, t]);

  const allProviders = useMemo(() => {
    return Object.entries(catalog)
      .map(([alias, info]) => {
        const pricingKey = info.pricingKey || alias;
        return {
          ...info,
          alias,
          pricingKey,
          pricedModels: pricingData[pricingKey] ? Object.keys(pricingData[pricingKey]).length : 0,
        };
      })
      .sort((left, right) => right.modelCount - left.modelCount);
  }, [catalog, pricingData]);

  const filteredProviders = useMemo(() => {
    const providerMatchesSearch = (provider: (typeof allProviders)[number]) => {
      if (!searchQuery.trim()) return true;
      return (
        matchesSearch(provider.alias, searchQuery) ||
        matchesSearch(provider.id, searchQuery) ||
        provider.models.some(
          (model) => matchesSearch(model.id, searchQuery) || matchesSearch(model.name, searchQuery)
        )
      );
    };
    const coveragePct = (p: (typeof allProviders)[number]) =>
      p.modelCount > 0 ? (p.pricedModels / p.modelCount) * 100 : 0;
    const matchesCoverage = (p: (typeof allProviders)[number]) => {
      if (coverageFilter === "all") return true;
      const pct = coveragePct(p);
      if (coverageFilter === "lt50") return pct < 50;
      if (coverageFilter === "gte50lt100") return pct >= 50 && pct < 100;
      return pct >= 100;
    };
    const matchesAuth = (p: (typeof allProviders)[number]) => {
      if (authFilter === "all") return true;
      const auth = (p.authType || "unknown").toLowerCase();
      return (
        auth === authFilter || (authFilter === "unknown" && !["oauth", "apikey"].includes(auth))
      );
    };

    const filtered = allProviders.filter(
      (p) => providerMatchesSearch(p) && matchesCoverage(p) && matchesAuth(p)
    );

    // Sort
    const sorted = [...filtered];
    switch (sortKey) {
      case "modelsDesc":
        sorted.sort((a, b) => b.modelCount - a.modelCount);
        break;
      case "coverageDesc":
        sorted.sort((a, b) => coveragePct(b) - coveragePct(a));
        break;
      case "coverageAsc":
        sorted.sort((a, b) => coveragePct(a) - coveragePct(b));
        break;
      case "nameAsc":
        sorted.sort((a, b) => compareTr(a.alias, b.alias));
        break;
    }
    return sorted;
  }, [allProviders, searchQuery, coverageFilter, authFilter, sortKey]);

  const authCounts = useMemo(() => {
    const counts = { oauth: 0, apikey: 0, unknown: 0 };
    for (const p of allProviders) {
      const auth = (p.authType || "unknown").toLowerCase();
      if (auth === "oauth") counts.oauth += 1;
      else if (auth === "apikey") counts.apikey += 1;
      else counts.unknown += 1;
    }
    return counts;
  }, [allProviders]);

  const coverageGapCount = useMemo(
    () => allProviders.filter((p) => p.modelCount > 0 && p.pricedModels / p.modelCount < 1).length,
    [allProviders]
  );

  // Reset visible count when filters change (state adjustment during render)
  const filtersKey = `${searchQuery}|${coverageFilter}|${authFilter}|${sortKey}`;
  const [prevFiltersKey, setPrevFiltersKey] = useState(filtersKey);
  if (prevFiltersKey !== filtersKey) {
    setPrevFiltersKey(filtersKey);
    setVisibleCount(INITIAL_VISIBLE);
  }

  const stats = useMemo(() => {
    const totalModels = allProviders.reduce((sum, provider) => sum + provider.modelCount, 0);
    const pricedCount = Object.values(pricingData).reduce(
      (sum, models) => sum + Object.keys(models).length,
      0
    );
    const overriddenCount = Object.values(pricingSources).reduce(
      (sum, models) => sum + Object.values(models).filter((source) => source === "user").length,
      0
    );
    return {
      providers: allProviders.length,
      totalModels,
      pricedCount,
      overriddenCount,
    };
  }, [allProviders, pricingData, pricingSources]);

  const displayProviders = useMemo(() => {
    const base = selectedProvider
      ? filteredProviders.filter((provider) => provider.alias === selectedProvider)
      : filteredProviders;
    return base.slice(0, visibleCount);
  }, [filteredProviders, selectedProvider, visibleCount]);

  const totalFiltered = selectedProvider
    ? filteredProviders.filter((provider) => provider.alias === selectedProvider).length
    : filteredProviders.length;

  const formatSyncDate = useCallback(
    (value: string | null) => {
      if (!value) return t("never");
      try {
        return new Intl.DateTimeFormat(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date(value));
      } catch {
        return value;
      }
    },
    [t]
  );

  const getSourceLabel = useCallback(
    (source: PricingSource) => {
      switch (source) {
        case "user":
          return t("pricingSourceUser");
        case "modelsDev":
          return t("pricingSourceModelsDev");
        case "litellm":
          return t("pricingSourceLiteLLM");
        default:
          return t("pricingSourceDefault");
      }
    },
    [t]
  );

  const toggleProvider = useCallback((alias: string) => {
    setExpandedProviders((previous) => {
      const next = new Set(previous);
      if (next.has(alias)) {
        next.delete(alias);
      } else {
        next.add(alias);
      }
      return next;
    });
  }, []);

  const handlePricingChange = useCallback(
    (provider: string, model: string, field: PricingField, value: string) => {
      const numValue = Number.parseFloat(value);
      if (Number.isNaN(numValue) || numValue < 0) return;

      setPricingData((previous) => {
        const next = { ...previous };
        if (!next[provider]) next[provider] = {};
        if (!next[provider][model]) {
          next[provider][model] = {
            input: 0,
            output: 0,
            cached: 0,
            reasoning: 0,
            cache_creation: 0,
          };
        }
        next[provider][model] = { ...next[provider][model], [field]: numValue };
        return next;
      });

      setEditedProviders((previous) => new Set(previous).add(provider));
    },
    []
  );

  const saveProvider = useCallback(
    async (providerAlias: string, pricingKey?: string) => {
      setSaving(true);
      try {
        const writeKey = pricingKey || providerAlias;
        const response = await fetch("/api/pricing", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ [writeKey]: pricingData[writeKey] || {} }),
        });

        if (!response.ok) {
          const errorPayload = await response.json().catch(() => null);
          throw new Error(extractApiErrorMessage(errorPayload, t("saveFailed")));
        }

        setEditedProviders((previous) => {
          const next = new Set(previous);
          next.delete(writeKey);
          return next;
        });
        await loadData();
        showStatus("success", t("pricingSavedProvider", { provider: providerAlias.toUpperCase() }));
      } catch (error: any) {
        showStatus(
          "error",
          t("pricingSaveFailedWithReason", {
            reason: error?.message || t("unknownError"),
          })
        );
      } finally {
        setSaving(false);
      }
    },
    [loadData, pricingData, showStatus, t]
  );

  const resetProvider = useCallback(
    async (providerAlias: string, pricingKey?: string) => {
      if (!confirm(t("resetPricingConfirm", { provider: providerAlias.toUpperCase() }))) return;

      try {
        const writeKey = pricingKey || providerAlias;
        const params = new URLSearchParams({ provider: writeKey });
        const response = await fetch(`/api/pricing?${params.toString()}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorPayload = await response.json().catch(() => null);
          throw new Error(extractApiErrorMessage(errorPayload, t("resetFailed")));
        }

        setEditedProviders((previous) => {
          const next = new Set(previous);
          next.delete(writeKey);
          return next;
        });
        await loadData();
        showStatus("success", t("pricingResetProvider", { provider: providerAlias.toUpperCase() }));
      } catch (error: any) {
        showStatus(
          "error",
          t("pricingResetFailedWithReason", {
            reason: error?.message || t("unknownError"),
          })
        );
      }
    },
    [loadData, showStatus, t]
  );

  const triggerSync = useCallback(async () => {
    setSyncing(true);
    try {
      const response = await fetch("/api/pricing/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const payload = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        modelCount?: number;
        error?: string;
      };

      if (!response.ok || payload.success === false) {
        throw new Error(payload.error || t("pricingSyncFailed"));
      }

      await loadData();
      showStatus("success", t("pricingSyncSuccess", { count: payload.modelCount || 0 }));
    } catch (error: any) {
      showStatus(
        "error",
        t("pricingSyncFailedWithReason", {
          reason: error?.message || t("unknownError"),
        })
      );
    } finally {
      setSyncing(false);
    }
  }, [loadData, showStatus, t]);

  const clearSyncedPricing = useCallback(async () => {
    if (!confirm(t("clearSyncedPricingConfirm"))) return;

    setSyncing(true);
    try {
      const response = await fetch("/api/pricing/sync", { method: "DELETE" });
      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(payload.error || t("clearSyncedPricingFailed"));
      }

      await loadData();
      showStatus("info", t("clearSyncedPricingSuccess"));
    } catch (error: any) {
      showStatus(
        "error",
        t("clearSyncedPricingFailedWithReason", {
          reason: error?.message || t("unknownError"),
        })
      );
    } finally {
      setSyncing(false);
    }
  }, [loadData, showStatus, t]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-text-muted animate-pulse">{t("loadingPricing")}</div>
      </div>
    );
  }

  const coveragePct =
    stats.totalModels > 0 ? Math.round((stats.pricedCount / stats.totalModels) * 100) : 0;

  return (
    <div className="flex flex-col gap-4">
      {/* Hero — combined header (stats + sync + how-it-works tooltip) */}
      <Card className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Icon name="payments" size={22} className="text-primary" />
              {t("modelPricing")}
            </h2>
            <InfoTooltip
              text={`${t("pricingDescInput")} · ${t("pricingDescOutput")} · ${t("pricingDescCached")} · ${t("pricingDescReasoning")} · ${t("pricingDescCacheWrite")} · ${t("pricingDescFormula")}`}
            />
          </div>
          <p className="text-text-muted text-xs hidden sm:block self-center">
            {t("modelPricingDesc")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-4">
          {/* Stats panel with coverage bar */}
          <div className="rounded-lg border border-border/40 bg-bg-subtle/30 p-4">
            <div className="grid grid-cols-4 gap-3 mb-3">
              <HeroStat label={t("providers")} value={stats.providers} />
              <HeroStat label={t("registry")} value={stats.totalModels} />
              <HeroStat label={t("priced")} value={stats.pricedCount} accent="text-success" />
              <HeroStat
                label={t("pricingSourceUser")}
                value={stats.overriddenCount}
                accent="text-warning"
              />
            </div>
            <div>
              <div className="flex items-center justify-between text-[11px] text-text-muted mb-1">
                <span className="uppercase tracking-wide font-semibold">
                  {t("priced")} / {t("registry")}
                </span>
                <span className="tabular-nums font-semibold">{coveragePct}%</span>
              </div>
              <div className="h-2 rounded-sm bg-border/60 overflow-hidden" aria-hidden="true">
                <div
                  className={`h-full transition-[width] duration-300 ${
                    coveragePct >= 90 ? "bg-success" : coveragePct >= 60 ? "bg-warning" : "bg-error"
                  }`}
                  style={{ width: `${Math.min(coveragePct, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Sync panel */}
          <div className="rounded-lg border border-border/40 bg-bg-subtle/30 p-4 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wide text-text-muted">
                  {t("pricingSyncTitle")}
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      syncStatus?.enabled ? "bg-success animate-pulse" : "bg-text-muted"
                    }`}
                  />
                  <span className="text-xs text-text-main font-medium">
                    {syncStatus?.enabled
                      ? t("pricingAutoSyncEnabled")
                      : t("pricingAutoSyncDisabled")}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => void clearSyncedPricing()}
                  loading={syncing}
                >
                  {t("clearSyncedPricing")}
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => void triggerSync()}
                  loading={syncing}
                >
                  {syncing ? t("syncing") : t("syncNow")}
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[11px]">
              <SyncMini
                label={t("lastSync")}
                value={formatSyncDate(syncStatus?.lastSync || null)}
              />
              <SyncMini
                label={t("syncedModels")}
                value={String(syncStatus?.lastSyncModelCount || 0)}
              />
              <SyncMini
                label={t("nextSync")}
                value={formatSyncDate(syncStatus?.nextSync || null)}
              />
            </div>
          </div>
        </div>
      </Card>

      {statusMessage && (
        <div
          className={`px-3 py-2 rounded-lg border text-sm ${
            statusMessage.tone === "success"
              ? "bg-success/10 border-success/20 text-success"
              : statusMessage.tone === "error"
                ? "bg-error/10 border-error/20 text-error"
                : "bg-info/10 border-info/20 text-info"
          }`}
        >
          {statusMessage.message}
        </div>
      )}

      {/* Search + Filters */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center flex-wrap">
          <Input
            type="search"
            icon="search"
            aria-label={t("searchProvidersModels")}
            placeholder={t("searchProvidersModels")}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="flex-1 min-w-[260px]"
          />

          <FilterSelect
            label={t("pricingCoverage")}
            value={coverageFilter}
            onChange={(v) => setCoverageFilter(v as CoverageFilter)}
            options={[
              { value: "all", label: `${t("pricingAll")} (${allProviders.length})` },
              { value: "lt50", label: "<50%" },
              { value: "gte50lt100", label: "50–99%" },
              { value: "full", label: "100%" },
            ]}
          />

          <FilterSelect
            label={t("pricingAuth")}
            value={authFilter}
            onChange={(v) => setAuthFilter(v as AuthFilter)}
            options={[
              { value: "all", label: t("pricingAll") },
              { value: "oauth", label: `OAuth (${authCounts.oauth})` },
              { value: "apikey", label: `API Key (${authCounts.apikey})` },
              {
                value: "unknown",
                label: `${t("pricingAuthUnknown")} (${authCounts.unknown})`,
              },
            ]}
          />

          <FilterSelect
            label={t("pricingSort")}
            value={sortKey}
            onChange={(v) => setSortKey(v as SortKey)}
            options={[
              { value: "modelsDesc", label: t("pricingMostModels") },
              { value: "coverageDesc", label: t("pricingHighestCoverage") },
              { value: "coverageAsc", label: t("pricingLowestCoverage") },
              { value: "nameAsc", label: t("pricingNameAscending") },
            ]}
          />
        </div>

        {/* Quick shortcuts */}
        <div className="flex items-center gap-2 flex-wrap text-[11px]">
          <Button
            variant={coverageFilter === "lt50" ? "warning" : "outline"}
            size="sm"
            icon="warning"
            aria-pressed={coverageFilter === "lt50"}
            onClick={() => setCoverageFilter(coverageFilter === "lt50" ? "all" : "lt50")}
          >
            {t("pricingCoverageGaps")} ({coverageGapCount})
          </Button>
          {(searchQuery ||
            coverageFilter !== "all" ||
            authFilter !== "all" ||
            sortKey !== "modelsDesc" ||
            selectedProvider) && (
            <Button
              variant="ghost"
              size="sm"
              icon="close"
              onClick={() => {
                setSearchQuery("");
                setCoverageFilter("all");
                setAuthFilter("all");
                setSortKey("modelsDesc");
                setSelectedProvider(null);
              }}
            >
              {t("pricingClearFilters")}
            </Button>
          )}
          <span className="text-text-muted ml-auto">
            {t("pricingShowingProviders", {
              visible: displayProviders.length,
              total: totalFiltered,
            })}
            {totalFiltered !== allProviders.length &&
              ` ${t("pricingFilteredFrom", { count: allProviders.length })}`}
          </span>
        </div>
      </div>

      {/* Provider list */}
      <div className="flex flex-col gap-2">
        {displayProviders.map((provider) => (
          <ProviderSection
            key={provider.alias}
            provider={provider}
            pricingData={pricingData[provider.pricingKey || provider.alias] || {}}
            sourceMap={pricingSources[provider.pricingKey || provider.alias] || {}}
            isExpanded={expandedProviders.has(provider.alias)}
            isEdited={editedProviders.has(provider.pricingKey || provider.alias)}
            onToggle={() => toggleProvider(provider.alias)}
            onPricingChange={(model, field, value) =>
              handlePricingChange(provider.pricingKey || provider.alias, model, field, value)
            }
            onSave={() => void saveProvider(provider.alias, provider.pricingKey)}
            onReset={() => void resetProvider(provider.alias, provider.pricingKey)}
            saving={saving}
            getSourceLabel={getSourceLabel}
          />
        ))}

        {displayProviders.length === 0 && (
          <EmptyState
            compact
            icon={<Icon name="search_off" size={24} />}
            title={t("noProvidersMatch")}
          />
        )}

        {visibleCount < totalFiltered && (
          <Button
            variant="outline"
            size="sm"
            icon="expand_more"
            onClick={() => setVisibleCount((c) => c + VISIBLE_INCREMENT)}
            className="mt-2 mx-auto"
          >
            {t("pricingShowMoreProviders", {
              count: Math.min(VISIBLE_INCREMENT, totalFiltered - visibleCount),
              remaining: totalFiltered - visibleCount,
            })}
          </Button>
        )}
      </div>
    </div>
  );
}

function ProviderSection({
  provider,
  pricingData,
  sourceMap,
  isExpanded,
  isEdited,
  onToggle,
  onPricingChange,
  onSave,
  onReset,
  saving,
  getSourceLabel,
}: {
  provider: PricingCatalogProvider;
  pricingData: Record<string, Record<string, number>>;
  sourceMap: Record<string, PricingSource>;
  isExpanded: boolean;
  isEdited: boolean;
  onToggle: () => void;
  onPricingChange: (model: string, field: PricingField, value: string) => void;
  onSave: () => void;
  onReset: () => void;
  saving: boolean;
  getSourceLabel: (source: PricingSource) => string;
}) {
  const t = useTranslations("settings");
  const tGlobal = useTranslations();
  const pricedCount = Object.keys(pricingData).length;
  const sourceCounts = Object.values(sourceMap).reduce(
    (counts, source) => {
      counts[source] = (counts[source] || 0) + 1;
      return counts;
    },
    { default: 0, litellm: 0, modelsDev: 0, user: 0 } as Record<PricingSource, number>
  );
  const authBadge =
    provider.authType === "oauth"
      ? tGlobal("providers.oauthLabel")
      : provider.authType === "apikey"
        ? tGlobal("providers.apiKeyLabel")
        : provider.authType;

  return (
    <div
      className={`border rounded-lg overflow-hidden transition-colors ${
        isEdited ? "border-warning/40 bg-warning/5" : "border-border"
      }`}
    >
      <Button
        variant="ghost"
        onClick={onToggle}
        aria-expanded={isExpanded}
        className="h-auto w-full justify-between gap-3 rounded-none px-4 py-3 text-left font-normal"
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <Icon
            name="chevron_right"
            size={18}
            className={`text-text-muted transition-transform ${isExpanded ? "rotate-90" : ""}`}
          />
          <div className="w-7 h-7 rounded-md flex items-center justify-center overflow-hidden shrink-0 bg-bg-subtle">
            <ProviderIcon providerId={provider.id} size={28} type="color" />
          </div>
          <div className="min-w-0 flex items-center gap-2">
            <span className="font-semibold text-sm truncate">
              {provider.id.charAt(0).toUpperCase() + provider.id.slice(1)}
            </span>
            <span className="text-text-muted text-[11px] truncate">
              ({provider.alias.toUpperCase()})
            </span>
          </div>
          <Badge
            size="sm"
            variant={
              provider.authType === "oauth"
                ? "info"
                : provider.authType === "apikey"
                  ? "primary"
                  : "default"
            }
            className="shrink-0 uppercase"
          >
            {authBadge}
          </Badge>
          <span className="px-1.5 py-0.5 bg-bg-subtle text-text-muted text-[9px] rounded uppercase font-semibold shrink-0">
            {provider.format}
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {sourceCounts.user > 0 && (
            <span
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-warning"
              title={`${sourceCounts.user} ${getSourceLabel("user")}`}
            >
              💎 {sourceCounts.user}
            </span>
          )}
          {isEdited && (
            <span className="text-warning text-[11px] font-semibold">{t("unsaved")}</span>
          )}
          <span className="text-text-muted text-[11px] tabular-nums hidden sm:inline">
            {pricedCount}/{provider.modelCount}
          </span>
          {(() => {
            const pct =
              provider.modelCount > 0 ? Math.round((pricedCount / provider.modelCount) * 100) : 0;
            const barColor = pct >= 100 ? "bg-success" : pct >= 50 ? "bg-warning" : "bg-error";
            const textColor =
              pct >= 100 ? "text-success" : pct >= 50 ? "text-warning" : "text-error";
            const icon = pct >= 100 ? "✓" : pct >= 50 ? "◐" : "⚠";
            return (
              <>
                <div
                  className="w-20 h-1.5 bg-border/60 rounded-full overflow-hidden"
                  aria-hidden="true"
                >
                  <div
                    className={`h-full ${barColor} rounded-full transition-all`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span
                  className={`text-[11px] font-bold tabular-nums w-10 text-right ${textColor}`}
                  title={`${pricedCount}/${provider.modelCount} ${t("withPricing")}`}
                >
                  {pct}% {icon}
                </span>
              </>
            );
          })()}
        </div>
      </Button>

      {isExpanded && (
        <div className="border-t border-border">
          <div className="flex items-center justify-between px-4 py-2 bg-bg-subtle/50">
            <span className="text-xs text-text-muted">
              {provider.modelCount} {t("models")} • {pricedCount} {t("withPricing")}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="danger"
                size="sm"
                onClick={(event) => {
                  event.stopPropagation();
                  onReset();
                }}
              >
                {t("resetDefaults")}
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={(event) => {
                  event.stopPropagation();
                  onSave();
                }}
                disabled={saving || !isEdited}
              >
                {saving ? t("saving") : t("saveProvider")}
              </Button>
            </div>
          </div>

          <Table scrollbarLabel={t("modelPricing")} className="text-sm">
            <TableHeader>
              <TableRow>
                <TableHead>{t("model")}</TableHead>
                {PRICING_FIELDS.map((field) => (
                  <TableHead key={field} className="w-24 text-right">
                    {t(FIELD_LABEL_KEYS[field])}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {provider.models.map((model) => (
                <ModelRow
                  key={model.id}
                  model={model}
                  pricing={pricingData[model.id]}
                  source={sourceMap[model.id] || "default"}
                  getSourceLabel={getSourceLabel}
                  onPricingChange={(field, value) => onPricingChange(model.id, field, value)}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function ModelRow({
  model,
  pricing,
  source,
  getSourceLabel,
  onPricingChange,
}: {
  model: PricingCatalogModel;
  pricing?: Record<string, number>;
  source: PricingSource;
  getSourceLabel: (source: PricingSource) => string;
  onPricingChange: (field: PricingField, value: string) => void;
}) {
  const t = useTranslations("settings");
  const hasPricing = Boolean(pricing && Object.values(pricing).some((value) => Number(value) > 0));

  return (
    <TableRow className="group">
      <TableCell className="py-1.5">
        <div className="flex items-center gap-2">
          <span
            className={`w-1.5 h-1.5 rounded-full ${hasPricing ? "bg-success" : "bg-text-muted/30"}`}
          />
          <span className="font-medium text-xs">{model.name}</span>
          {model.custom && (
            <Badge size="sm" variant="info" className="uppercase">
              {t("custom")}
            </Badge>
          )}
          <span className={`px-1.5 py-0.5 rounded text-[9px] ${getSourceTone(source)}`}>
            {getSourceLabel(source)}
          </span>
          <span className="text-text-muted text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
            {model.id}
          </span>
        </div>
      </TableCell>
      {PRICING_FIELDS.map((field) => (
        <TableCell key={field} className="px-2 py-1.5">
          <Input
            type="number"
            step="0.01"
            min="0"
            aria-label={`${model.name} ${t(FIELD_LABEL_KEYS[field])}`}
            value={pricing?.[field] || 0}
            onChange={(event) => onPricingChange(field, event.target.value)}
            inputClassName="text-right text-xs tabular-nums"
          />
        </TableCell>
      ))}
    </TableRow>
  );
}
