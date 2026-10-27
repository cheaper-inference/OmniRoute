"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import { Button, EmptyState, Input, SegmentedControl, Select, Skeleton } from "@/shared/components";
import Icon from "@/shared/components/Icon";
import { matchesSearch } from "@/shared/utils/turkishText";
import FeatureFlagCard from "./FeatureFlagCard";

// Type for flag data from API
interface FlagData {
  key: string;
  label: string;
  description: string;
  category: "security" | "network" | "policies" | "runtime" | "cli" | "health";
  type: "boolean" | "enum";
  enumValues: string[] | null;
  defaultValue: string;
  effectiveValue: string;
  source: "db" | "env" | "default";
  requiresRestart: boolean;
  warningLevel?: "info" | "caution" | "danger";
}

interface Summary {
  total: number;
  active: number;
  inactive: number;
  overriddenByDb: number;
  overriddenByEnv: number;
}

interface FlagUpdateResult {
  effectiveValue: string;
  source: FlagData["source"];
  previousValue: string;
  previousSource: FlagData["source"];
  requiresRestart: boolean;
}

const ACTIVE_VALUES = new Set(["true", "1", "yes"]);

// How card descriptions are displayed. "clamp" keeps cards compact and reveals
// the full text on hover; "full" always shows the complete description.
type DescriptionMode = "clamp" | "full";
const DESCRIPTION_MODE_STORAGE_KEY = "ff-card-description-mode";

function isActiveFlagValue(value: string): boolean {
  return ACTIVE_VALUES.has(value);
}

const CATEGORIES = [
  { value: "all", labelKey: "all" },
  { value: "security", labelKey: "security" },
  { value: "network", labelKey: "network" },
  { value: "policies", labelKey: "policies" },
  { value: "runtime", labelKey: "runtime" },
  { value: "cli", labelKey: "cli" },
  { value: "health", labelKey: "health" },
  // Synthetic "category" that filters by requiresRestart=true regardless of
  // real category — surfaces flags that need a process restart to take effect.
  { value: "__restart", labelKey: "requiresRestart" },
];

export default function FeatureFlagsGrid() {
  const t = useTranslations("featureFlags");
  const [flags, setFlags] = useState<FlagData[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [savingKeys, setSavingKeys] = useState<Set<string>>(new Set());
  const [resettingAll, setResettingAll] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [descriptionMode, setDescriptionMode] = useState<DescriptionMode>("clamp");
  // Set of flag keys whose DB override was changed in this session without
  // a subsequent restart. Used to surface the restart banner.
  const [pendingRestartKeys, setPendingRestartKeys] = useState<Set<string>>(new Set());
  const [restarting, setRestarting] = useState(false);
  const [showRestartConfirm, setShowRestartConfirm] = useState(false);

  const loadFlags = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/settings/feature-flags");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setFlags(data.flags);
      setSummary(data.summary);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("loadFailed"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadFlags(), 0);
    return () => window.clearTimeout(timer);
  }, [loadFlags]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Read the persisted preference after hydration — reading localStorage in the
  // useState initializer would make the first client render differ from the SSR
  // HTML (hydration mismatch), leaving the active pill stale.
  useEffect(() => {
    try {
      if (window.localStorage.getItem(DESCRIPTION_MODE_STORAGE_KEY) === "full") {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage hydration, runs once
        setDescriptionMode("full");
      }
    } catch {
      // localStorage unavailable — keep the default.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(DESCRIPTION_MODE_STORAGE_KEY, descriptionMode);
    } catch {
      // localStorage unavailable — the mode just won't persist across reloads.
    }
  }, [descriptionMode]);

  const applyFlagResult = useCallback((key: string, result: FlagUpdateResult) => {
    const wasActive = isActiveFlagValue(result.previousValue);
    const isNowActive = isActiveFlagValue(result.effectiveValue);
    const wasDb = result.previousSource === "db";
    const isNowDb = result.source === "db";
    const wasEnv = result.previousSource === "env";
    const isNowEnv = result.source === "env";

    setFlags((prev) =>
      prev.map((f) =>
        f.key === key ? { ...f, effectiveValue: result.effectiveValue, source: result.source } : f
      )
    );
    setSummary((s) =>
      s
        ? {
            ...s,
            active: s.active + (isNowActive ? 1 : 0) - (wasActive ? 1 : 0),
            inactive: s.inactive + (isNowActive ? 0 : 1) - (wasActive ? 0 : 1),
            overriddenByDb: s.overriddenByDb + (isNowDb ? 1 : 0) - (wasDb ? 1 : 0),
            overriddenByEnv: s.overriddenByEnv + (isNowEnv ? 1 : 0) - (wasEnv ? 1 : 0),
          }
        : s
    );
  }, []);

  const filteredFlags = useMemo(() => {
    return flags
      .filter((f) => {
        if (category === "all") return true;
        if (category === "__restart") return f.requiresRestart;
        return f.category === category;
      })
      .filter(
        (f) =>
          debouncedSearch === "" ||
          matchesSearch(f.key, debouncedSearch) ||
          matchesSearch(f.description, debouncedSearch) ||
          (t.has(`definitions.${f.key}.description`) &&
            matchesSearch(t(`definitions.${f.key}.description`), debouncedSearch))
      );
  }, [flags, debouncedSearch, category, t]);

  const handleToggle = useCallback(
    async (key: string, newValue: string) => {
      setSavingKeys((prev) => new Set(prev).add(key));
      try {
        const res = await fetch("/api/settings/feature-flags", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key, value: newValue }),
        });
        if (!res.ok) {
          setError(t("updateFailedHttp", { status: res.status }));
          return;
        }
        const result = (await res.json()) as FlagUpdateResult;
        applyFlagResult(key, result);
        if (result.requiresRestart) {
          setPendingRestartKeys((prev) => new Set(prev).add(key));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : t("updateFailed"));
      } finally {
        setSavingKeys((prev) => {
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
      }
    },
    [applyFlagResult, t]
  );

  const handleReset = useCallback(
    async (key: string) => {
      setSavingKeys((prev) => new Set(prev).add(key));
      try {
        const res = await fetch("/api/settings/feature-flags", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key }), // no value = remove override
        });
        if (!res.ok) {
          setError(t("updateFailedHttp", { status: res.status }));
          return;
        }
        const result = (await res.json()) as FlagUpdateResult;
        applyFlagResult(key, result);
        if (result.requiresRestart) {
          setPendingRestartKeys((prev) => new Set(prev).add(key));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : t("updateFailed"));
      } finally {
        setSavingKeys((prev) => {
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
      }
    },
    [applyFlagResult, t]
  );

  const handleRestart = useCallback(async () => {
    setRestarting(true);
    try {
      const res = await fetch("/api/restart", { method: "POST" });
      if (!res.ok) {
        setError(t("restartFailedHttp", { status: res.status }));
        setShowRestartConfirm(false);
        setRestarting(false);
        return;
      }
      // Server is going down — wait for it to come back, then reload.
      const stillUp = async () => {
        try {
          const r = await fetch("/api/health/ping", { cache: "no-store" });
          return r.ok;
        } catch {
          return false;
        }
      };
      const waitDown = setInterval(async () => {
        if (!(await stillUp())) {
          clearInterval(waitDown);
          const waitUp = setInterval(async () => {
            if (await stillUp()) {
              clearInterval(waitUp);
              setPendingRestartKeys(new Set());
              window.location.reload();
            }
          }, 1000);
        }
      }, 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("restartFailed"));
      setShowRestartConfirm(false);
      setRestarting(false);
    }
  }, [t]);

  const handleResetAll = useCallback(async () => {
    setResettingAll(true);
    try {
      const res = await fetch("/api/settings/feature-flags", { method: "DELETE" });
      if (!res.ok) {
        setError(t("resetOverridesFailedHttp", { status: res.status }));
        setShowResetConfirm(false);
        return;
      }
      await loadFlags();
      setShowResetConfirm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("resetOverridesFailed"));
      setShowResetConfirm(false);
    } finally {
      setResettingAll(false);
    }
  }, [loadFlags, t]);

  return (
    <div className="space-y-6">
      <PageHeader
        compact
        title={t("title")}
        description={
          summary ? (
            <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-medium text-success">
                {t("activeCount", { count: summary.active })}
              </span>
              <span aria-hidden="true">·</span>
              <span>{t("inactiveCount", { count: summary.inactive })}</span>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-info">
                {t("dbOverrideCount", { count: summary.overriddenByDb })}
              </span>
            </span>
          ) : undefined
        }
        actions={
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
            {/* Description view: compact with hover tooltip vs always full text */}
            <div title={t("descriptionModeHint")}>
              <SegmentedControl
                size="sm"
                aria-label={t("descriptionModeLabel")}
                value={descriptionMode}
                onChange={(next) => setDescriptionMode(next as DescriptionMode)}
                options={[
                  { value: "clamp", label: t("descriptionModeHover") },
                  { value: "full", label: t("descriptionModeFull") },
                ]}
              />
            </div>

            <Input
              type="search"
              icon="search"
              aria-label={t("searchPlaceholder")}
              placeholder={t("searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64"
            />

            <Select
              compact
              aria-label={t("categoryLabel", {
                category: t(
                  `categories.${CATEGORIES.find((cat) => cat.value === category)?.labelKey ?? "all"}`
                ),
              })}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={CATEGORIES.map((cat) => ({
                value: cat.value,
                label: t(`categories.${cat.labelKey}`),
              }))}
              className="w-full sm:w-auto"
            />
          </div>
        }
      />

      {/* Pending-restart banner — shown when at least one requiresRestart flag
          was toggled in this session. */}
      {pendingRestartKeys.size > 0 && (
        <div className="rounded-card border border-warning/40 bg-warning-bg p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="flex items-start gap-3">
              <Icon name="restart_alt" className="text-warning" />
              <div>
                <p className="text-sm font-medium text-text-main">
                  {t("restartRequiredCount", { count: pendingRestartKeys.size })}
                </p>
                <p className="mt-0.5 text-xs text-text-muted">{t("restartRequiredDescription")}</p>
              </div>
            </div>
            {!showRestartConfirm ? (
              <Button
                variant="warning"
                className="shrink-0"
                onClick={() => setShowRestartConfirm(true)}
              >
                {t("restartServer")}
              </Button>
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  onClick={() => setShowRestartConfirm(false)}
                  disabled={restarting}
                >
                  {t("cancel")}
                </Button>
                <Button variant="warning" onClick={handleRestart} disabled={restarting}>
                  {restarting ? t("restarting") : t("confirmRestart")}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Explanation banner for the synthetic "Requires Restart" view */}
      {category === "__restart" && (
        <div className="rounded-card border border-info/30 bg-info-bg p-3 text-sm text-text-main">
          <div className="flex items-start gap-2">
            <Icon name="info" className="text-info" />
            <p>
              {t.rich("restartViewDescription", { strong: (chunks) => <strong>{chunks}</strong> })}
            </p>
          </div>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))" }}
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="h-36 w-full rounded-card" />
          ))}
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div
          role="alert"
          className="flex items-center justify-between gap-3 rounded-card border border-error/30 bg-error-bg p-4"
        >
          <p className="text-sm text-error">{error}</p>
          <Button variant="outline" size="sm" icon="refresh" onClick={loadFlags}>
            {t("retry")}
          </Button>
        </div>
      )}

      {/* Grid */}
      {!loading && !error && (
        <>
          {filteredFlags.length === 0 ? (
            <EmptyState icon="search_off" title={t("noSearchResults")} />
          ) : (
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))" }}
            >
              {filteredFlags.map((flag) => (
                <FeatureFlagCard
                  key={flag.key}
                  flag={{
                    ...flag,
                    label: t.has(`definitions.${flag.key}.label`)
                      ? t(`definitions.${flag.key}.label`)
                      : flag.label,
                    description: t.has(`definitions.${flag.key}.description`)
                      ? t(`definitions.${flag.key}.description`)
                      : flag.description,
                  }}
                  onToggle={handleToggle}
                  onReset={handleReset}
                  saving={savingKeys.has(flag.key)}
                  descriptionMode={descriptionMode}
                />
              ))}
            </div>
          )}

          {/* Reset All button */}
          {summary && summary.overriddenByDb > 0 && (
            <div className="flex justify-end border-t border-border pt-4">
              {!showResetConfirm ? (
                <Button variant="danger" onClick={() => setShowResetConfirm(true)}>
                  {t("resetAllOverrides")}
                </Button>
              ) : (
                <div className="flex flex-wrap items-center justify-end gap-3">
                  <p className="text-sm text-text-muted">
                    {t("confirmResetOverrides", { count: summary.overriddenByDb })}
                  </p>
                  <Button variant="ghost" onClick={() => setShowResetConfirm(false)}>
                    {t("cancel")}
                  </Button>
                  <Button variant="danger" onClick={handleResetAll} loading={resettingAll}>
                    {resettingAll ? t("resetting") : t("confirmReset")}
                  </Button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
