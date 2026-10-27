"use client";

import { useTranslations } from "next-intl";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  parseQuotaData,
  formatQuotaLabel,
  formatCountdown,
  normalizePlanTier,
  buildProviderLimitsResolvedPlans,
  calculatePercentage,
  matchesProviderFilter,
  buildProviderOptions,
  compareQuotaConnections,
  quotaStatusLevel,
} from "./utils";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import Card from "@/shared/components/Card";
import Select from "@/shared/components/Select";
import { CardSkeleton } from "@/shared/components/Loading";
import { pickDisplayValue } from "@/shared/utils/maskEmail";
import {
  supportsProviderQuota,
  isProviderQuotaVisible,
} from "@/shared/utils/providerQuotaVisibility";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import { useNotificationStore } from "@/store/notificationStore";

import { useQuotaVisibility } from "./useQuotaVisibility";
import QuotaCutoffModal from "./QuotaCutoffModal";
import QuotaCardGrid from "./QuotaCardGrid";
import QuotaLayoutPicker, { useQuotaLayout } from "./QuotaLayoutPicker";
import HealthStats from "./HealthStats";
import { readLimitsPreference } from "./providerOrder";
import {
  displayAccount,
  matchesDisplayFilter,
  DISPLAY_KINDS,
  type DisplayFilter,
} from "./availabilityDisplay";
import { useAvailability } from "./useAvailability";
import {
  useConfirmedAvailabilityChange,
  useSaveQuotaWindowThresholds,
} from "./useConfirmedAvailabilityChange";
import { useCachedQuotaPolling } from "./useCachedQuotaPolling";
import { useAutomaticQuotaRequests } from "./useAutomaticQuotaRequests";
import CodexResetCreditsModal from "./CodexResetCreditsModal";
import { useVisibleQuotaData } from "./useVisibleQuotaData";
import { useCodexResetCreditRedemption } from "./useCodexResetCreditRedemption";
import { PROVIDER_LABEL, PROVIDER_ORDER, TIER_FILTERS } from "./constants";
import { formatAutoRefreshCountdown } from "./formatters";
import { translateUsageOrFallback, type UsageTranslationValues } from "./i18nFallback";
import { compareTr } from "@/shared/utils/turkishText";
import { fetchWithTimeout } from "@/shared/utils/fetchTimeout";

// Bound the two first-paint requests so a stalled connection cannot wedge
// `initialLoading` on `true` and freeze the quota page on its skeleton forever
// (same infinite-skeleton class as the providers page). A `try/catch` degrades a
// *rejection* to a default, but only a timeout/abort can rescue a `fetch()` that
// never settles (browser connection-pool starvation under the RSC prefetch storm).
const PROVIDER_LIMITS_FETCH_TIMEOUT_MS = 20_000;

const LS_PURCHASE_FILTER = "omniroute:limits:purchaseFilter";
const LS_STATUS_FILTER = "omniroute:limits:statusFilter";
const LS_ENV_FILTER = "omniroute:limits:envFilter";
const LS_PROVIDER_FILTER = "omniroute:limits:providerFilter";

const MIN_FETCH_INTERVAL_MS = 30000;

type PurchaseTypeKey = "all" | "oauth-free" | "oauth-sub" | "apikey";
type StatusKey = "all" | "critical" | "alert" | "ok" | "empty" | "paused";

const PURCHASE_TYPES: Array<{ key: PurchaseTypeKey; labelKey: string; fallback: string }> = [
  { key: "all", labelKey: "purchaseAll", fallback: "All" },
  { key: "oauth-sub", labelKey: "purchaseOauthSub", fallback: "Subscription" },
  { key: "oauth-free", labelKey: "purchaseOauthFree", fallback: "OAuth Free" },
  { key: "apikey", labelKey: "purchaseApiKey", fallback: "API Key" },
];

function getPurchaseType(authType: string | undefined, tierKey: string): PurchaseTypeKey {
  if (authType === "apikey") return "apikey";
  if (authType === "oauth") {
    if (tierKey === "free" || tierKey === "unknown") return "oauth-free";
    return "oauth-sub";
  }
  return "oauth-free";
}

function getSoonestResetMs(quotas: any[] | undefined): number {
  if (!quotas || quotas.length === 0) return Number.POSITIVE_INFINITY;
  const now = Date.now();
  let soonest = Number.POSITIVE_INFINITY;
  for (const q of quotas) {
    if (!q?.resetAt) continue;
    const ts = new Date(q.resetAt).getTime();
    if (Number.isFinite(ts) && ts > now && ts < soonest) soonest = ts;
  }
  return soonest;
}

function shouldAutoRefreshQuota(provider: string, cached: any): boolean {
  const quotas = cached?.quotas;
  if (!Array.isArray(quotas) || quotas.length === 0) return true;
  if (provider !== "antigravity" && provider !== "agy") return false;

  return quotas.some(
    (q: any) =>
      q &&
      typeof q.modelKey === "string" &&
      q.modelKey.startsWith("gemini-") &&
      !q.isCredits &&
      q.quotaSource !== "retrieveUserQuota"
  );
}

const getQuotaBarWidthClass = (pct: number) => {
  if (pct <= 10) return "w-[10%]";
  if (pct <= 20) return "w-1/5";
  if (pct <= 30) return "w-[30%]";
  if (pct <= 40) return "w-2/5";
  if (pct <= 50) return "w-1/2";
  if (pct <= 60) return "w-3/5";
  if (pct <= 70) return "w-[70%]";
  if (pct <= 80) return "w-4/5";
  if (pct <= 90) return "w-[90%]";
  return "w-full";
};

const QUOTA_TONE_CLASSES = {
  critical: "bg-error text-error",
  alert: "bg-warning text-warning",
  ok: "bg-success text-success",
} as const;

const getQuotaToneClasses = (pct: number) => QUOTA_TONE_CLASSES[quotaStatusLevel(pct)];

async function requestQuota(connectionId: string) {
  const response = await fetch(`/api/usage/${connectionId}`);
  if (response.ok) return { data: await response.json() };
  const errorData = await response.json().catch(() => ({}));
  const errorMsg = errorData.error || response.statusText;
  if (response.status === 404) return { notFound: true };
  if (response.status === 401) {
    const error = /re-?authenticat|sign in|log in/i.test(errorMsg)
      ? errorMsg
      : `${errorMsg} — re-authenticate this account.`;
    return { error };
  }
  throw new Error(`HTTP ${response.status}: ${errorMsg}`);
}
function passesQuotaStatusFilter(
  conn: any,
  statusFilter: DisplayFilter,
  availabilityAccounts: Record<string, any>
) {
  if (statusFilter === "all") return true;
  const account = availabilityAccounts[conn.id];
  return !!account && matchesDisplayFilter(displayAccount(account), statusFilter);
}
function matchesVisibleQuotaConnection(
  conn: any,
  providerFilter: string,
  tierFilter: string,
  purchaseTypeFilter: PurchaseTypeKey,
  statusFilter: DisplayFilter,
  envFilter: string,
  tierByConnection: Record<string, { key?: string }>,
  purchaseTypeByConnection: Record<string, PurchaseTypeKey>,
  availabilityAccounts: Record<string, any>
) {
  if (!matchesProviderFilter(conn, providerFilter)) return false;
  const tierKey = tierByConnection[conn.id]?.key || "unknown";
  if (tierFilter !== "all" && tierKey !== tierFilter) return false;
  if (purchaseTypeFilter !== "all" && purchaseTypeByConnection[conn.id] !== purchaseTypeFilter)
    return false;
  if (!passesQuotaStatusFilter(conn, statusFilter, availabilityAccounts)) return false;
  if (envFilter !== "all") {
    const tag = (conn.providerSpecificData?.tag as string | undefined)?.trim() || "";
    if (tag !== envFilter) return false;
  }
  return true;
}

interface ProviderLimitsProps {
  showFilters?: boolean;
  autoRefreshInterval?: number;
}

/** Toggle chip for the quota filters (purchase type / tier / env) on the kit Button. */
function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      variant={active ? "secondary" : "outline"}
      size="sm"
      aria-pressed={active}
      onClick={onClick}
      className={`h-7 min-h-7 gap-1.5 rounded-full px-2.5 text-xs ${
        active ? "border-primary text-text-main" : "text-text-muted"
      }`}
    >
      {children}
    </Button>
  );
}

export default function ProviderLimits({
  showFilters = true,
  autoRefreshInterval = 0,
}: ProviderLimitsProps) {
  const t = useTranslations("usage");
  const tr = useCallback(
    (key: string, fallback: string, values?: UsageTranslationValues) =>
      translateUsageOrFallback(t, key, fallback, values),
    [t]
  );
  const emailsVisible = useEmailPrivacyStore((s) => s.emailsVisible);
  const notify = useNotificationStore();
  const [connections, setConnections] = useState<any[]>([]);
  const [togglingActiveId, setTogglingActiveId] = useState<string | null>(null);
  const [quotaData, setQuotaData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [activeConfirmations, setActiveConfirmations] = useState<
    Record<string, { isActive: boolean; confirmedAt: string }>
  >({});
  const {
    accounts: availabilityAccounts,
    refreshAvailability,
    summaryFailed,
  } = useAvailability(connections, quotaData, errors, activeConfirmations);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<Record<string, string>>({});
  const [refreshingAll, setRefreshingAll] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [tierFilter, setTierFilter] = useState("all");
  const { quotaVisibility, handleHideQuota, handleShowQuota } = useQuotaVisibility(tr, notify);

  const [purchaseTypeFilter, setPurchaseTypeFilter] = useState<PurchaseTypeKey>(() => {
    if (typeof window === "undefined") return "all";
    const saved = readLimitsPreference(LS_PURCHASE_FILTER) as PurchaseTypeKey;
    return saved && PURCHASE_TYPES.some((p) => p.key === saved) ? saved : "all";
  });
  const [statusFilter, setStatusFilter] = useState<DisplayFilter>(() => {
    try {
      const saved = localStorage.getItem(LS_STATUS_FILTER) as DisplayFilter;
      return ["all", "critical", "alert", ...DISPLAY_KINDS].includes(saved) ? saved : "all";
    } catch {
      return "all";
    }
  });
  const [envFilter, setEnvFilter] = useState<string>(() => {
    if (typeof window === "undefined") return "all";
    return readLimitsPreference(LS_ENV_FILTER);
  });
  const [providerFilter, setProviderFilter] = useState<string>(() => {
    if (typeof window === "undefined") return "all";
    return readLimitsPreference(LS_PROVIDER_FILTER);
  });
  const { layoutMode, selectLayout } = useQuotaLayout();
  const { canRequestLive, scheduleLiveRetry } = useAutomaticQuotaRequests(layoutMode);

  const lastFetchTimeRef = useRef<Record<string, number>>({});
  const staleProbeRef = useRef<Record<string, number>>({});
  const lastRefreshAllAtRef = useRef<number>(Date.now());
  const autoRefreshIntervalMs = autoRefreshInterval > 0 ? autoRefreshInterval * 1000 : 0;
  const [autoRefreshClock, setAutoRefreshClock] = useState(() => Date.now());
  const [cutoffModalConn, setCutoffModalConn] = useState<any | null>(null);
  const [cutoffModalWindows, setCutoffModalWindows] = useState<any[]>([]);
  const [providerWindowDefaults, setProviderWindowDefaults] = useState<
    Record<string, Record<string, number>>
  >({});
  const [globalThresholdDefault, setGlobalThresholdDefault] = useState<number>(98);

  useEffect(() => {
    let alive = true;
    fetch("/api/providers/quota-windows")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!alive || !data) return;
        setProviderWindowDefaults(data.defaults?.providerWindowDefaults || {});
        if (typeof data.defaults?.globalThresholdPercent === "number") {
          setGlobalThresholdDefault(data.defaults.globalThresholdPercent);
        }
      })
      .catch(() => {
        /* fail silent — modal still works with empty defaults */
      });
    return () => {
      alive = false;
    };
  }, []);

  const fetchConnections = useCallback(async () => {
    try {
      const response = await fetchWithTimeout("/api/providers/client", {
        timeoutMs: PROVIDER_LIMITS_FETCH_TIMEOUT_MS,
        method: "GET",
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Failed");
      const data = await response.json();
      const list = data.connections || [];
      setConnections(list);
      return list;
    } catch {
      return null;
    }
  }, []);

  const confirmAvailabilityChange = useConfirmedAvailabilityChange(
    fetchConnections,
    refreshAvailability
  );
  const saveQuotaWindowThresholds = useSaveQuotaWindowThresholds(confirmAvailabilityChange);
  const resetCreditRedemption = useCodexResetCreditRedemption(
    tr,
    setErrors,
    setQuotaData,
    setLastRefreshedAt,
    confirmAvailabilityChange
  );

  // Only the active field is confirmed by this write; all other runtime evidence is retained.
  const handleToggleActive = useCallback(
    async (connectionId: string, nextActive: boolean) => {
      setTogglingActiveId(connectionId);
      try {
        const res = await fetch(`/api/providers/${connectionId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive: nextActive }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setConnections((previous) =>
          previous.map((c) => (c.id === connectionId ? { ...c, isActive: nextActive } : c))
        );
        const confirmedAt = new Date().toISOString();
        setActiveConfirmations((previous) => ({
          ...previous,
          [connectionId]: { isActive: nextActive, confirmedAt },
        }));
        void refreshAvailability();
        notify.success(
          nextActive
            ? tr("accountActivated", "Account activated")
            : tr("accountDeactivated", "Account deactivated")
        );
      } catch {
        notify.error(tr("toggleActiveFailed", "Failed to update account status"));
      } finally {
        setTogglingActiveId(null);
      }
    },
    [notify, tr, refreshAvailability]
  );

  const applyCachedQuotaState = useCallback(
    (connectionList: any[], caches: Record<string, any>) => {
      const nextQuotaData: Record<string, any> = {};
      const nextLastRefreshedAt: Record<string, string> = {};

      for (const conn of connectionList) {
        const cached = caches?.[conn.id];
        if (!cached) continue;

        nextQuotaData[conn.id] = {
          quotas: parseQuotaData(conn.provider, cached),
          plan: cached.plan || null,
          message: cached.message || null,
          raw: cached,
        };

        if (cached.fetchedAt) {
          nextLastRefreshedAt[conn.id] = cached.fetchedAt;
        }
      }

      setQuotaData(nextQuotaData);
      setLastRefreshedAt(nextLastRefreshedAt);
    },
    []
  );

  const fetchCachedProviderLimits = useCallback(async () => {
    try {
      const response = await fetchWithTimeout("/api/usage/provider-limits", {
        timeoutMs: PROVIDER_LIMITS_FETCH_TIMEOUT_MS,
        method: "GET",
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Failed");
      const data = await response.json();
      return data.caches || {};
    } catch {
      return null;
    }
  }, []);
  useCachedQuotaPolling(fetchConnections, fetchCachedProviderLimits, applyCachedQuotaState);

  const fetchQuota = useCallback(
    async (
      connectionId: string,
      provider: string,
      options: { force?: boolean; automatic?: boolean } = {}
    ) => {
      if (options.automatic && !canRequestLive()) return;
      const force = options?.force === true;
      const now = Date.now();
      const lastFetch = lastFetchTimeRef.current[connectionId] || 0;
      if (!force && now - lastFetch < MIN_FETCH_INTERVAL_MS) {
        return;
      }
      lastFetchTimeRef.current[connectionId] = now;

      setLoading((prev) => ({ ...prev, [connectionId]: true }));
      setErrors((prev) => ({ ...prev, [connectionId]: null }));
      try {
        const result = await requestQuota(connectionId);
        if (result.notFound) return;
        if (result.error) {
          setQuotaData((prev) => ({
            ...prev,
            [connectionId]: { ...(prev[connectionId] || { quotas: [] }), message: result.error },
          }));
          setErrors((prev) => ({ ...prev, [connectionId]: result.error }));
          return;
        }
        const data = result.data;
        const parsedQuotas = parseQuotaData(provider, data);

        const hasStaleAfterReset = parsedQuotas.some((q: any) => q?.staleAfterReset === true);
        if (hasStaleAfterReset && canRequestLive()) {
          const lastProbeAt = staleProbeRef.current[connectionId] || 0;
          if (Date.now() - lastProbeAt >= MIN_FETCH_INTERVAL_MS) {
            staleProbeRef.current[connectionId] = Date.now();
            scheduleLiveRetry(() => {
              fetchQuota(connectionId, provider, { force: true, automatic: true }).catch(() => {});
            });
          }
        }

        setQuotaData((prev) => ({
          ...prev,
          [connectionId]: {
            quotas: parsedQuotas,
            plan: data.plan || null,
            message: data.message || null,
            raw: data,
            stale: data._stale ? { since: data._staleSince, reason: data._staleReason } : null,
          },
        }));
        setLastRefreshedAt((prev) => ({
          ...prev,
          [connectionId]: new Date().toISOString(),
        }));
      } catch (error: any) {
        setErrors((prev) => ({
          ...prev,
          [connectionId]: error.message || "Failed to fetch quota",
        }));
      } finally {
        setLoading((prev) => ({ ...prev, [connectionId]: false }));
      }
    },
    [canRequestLive, scheduleLiveRetry]
  );

  const refreshProvider = useCallback(
    async (connectionId: string, provider: string) => {
      await fetchQuota(connectionId, provider, { force: true });
      await Promise.all([fetchConnections(), refreshAvailability()]);
    },
    [fetchQuota, fetchConnections, refreshAvailability]
  );

  const refreshingAllRef = useRef(false);
  const refreshAll = useCallback(
    async (automatic = false) => {
      if (automatic && !canRequestLive()) return;
      if (refreshingAllRef.current) return;
      refreshingAllRef.current = true;
      const now = Date.now();
      lastRefreshAllAtRef.current = now;
      setAutoRefreshClock(now);
      setRefreshingAll(true);
      try {
        const response = await fetch("/api/usage/provider-limits", { method: "POST" });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errorMsg = errorData.error || response.statusText;
          throw new Error(errorMsg);
        }

        const data = await response.json();
        const [connectionList] = await Promise.all([fetchConnections(), refreshAvailability()]);
        applyCachedQuotaState(connectionList, data.caches || {});
        setErrors(data.errors || {});
      } catch (error) {
        console.error("Error refreshing all:", error);
      } finally {
        refreshingAllRef.current = false;
        setRefreshingAll(false);
      }
    },
    [applyCachedQuotaState, fetchConnections, refreshAvailability, canRequestLive]
  );

  useEffect(() => {
    if (autoRefreshIntervalMs <= 0) return;

    const tick = () => setAutoRefreshClock(Date.now());
    tick();

    const timer = window.setInterval(tick, 1000);
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") tick();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [autoRefreshIntervalMs]);

  useEffect(() => {
    if (layoutMode === "overview" || autoRefreshIntervalMs <= 0) return;
    if (document.visibilityState !== "visible") return;
    if (refreshingAllRef.current) return;
    if (autoRefreshClock - lastRefreshAllAtRef.current >= autoRefreshIntervalMs) {
      void refreshAll(true);
    }
  }, [layoutMode, autoRefreshClock, autoRefreshIntervalMs, refreshAll]);

  useEffect(() => {
    const init = async () => {
      setInitialLoading(true);
      const [connectionList, caches] = await Promise.all([
        fetchConnections(),
        fetchCachedProviderLimits(),
      ]);
      applyCachedQuotaState(connectionList || [], caches || {});
      setInitialLoading(false);
    };
    init().catch(() => {
      setInitialLoading(false);
    });
  }, [applyCachedQuotaState, fetchCachedProviderLimits, fetchConnections]);

  const filteredConnections = useMemo(
    () =>
      connections.filter(
        (conn) =>
          isProviderQuotaVisible(conn) &&
          supportsProviderQuota(conn.provider, conn) &&
          (conn.authType === "oauth" || conn.authType === "apikey")
      ),
    [connections]
  );

  const sortedConnections = useMemo(() => {
    return [...filteredConnections].sort((a, b) =>
      compareQuotaConnections(a, b, {
        providerOrder: PROVIDER_ORDER,
        providerLabels: PROVIDER_LABEL,
        compare: compareTr,
      })
    );
  }, [filteredConnections]);
  const visibleQuotaData = useVisibleQuotaData(sortedConnections, quotaData);

  const resolvedPlanByConnection = useMemo(
    () => buildProviderLimitsResolvedPlans(sortedConnections, quotaData),
    [sortedConnections, quotaData]
  );

  const tierByConnection = useMemo(() => {
    const out: Record<string, ReturnType<typeof normalizePlanTier>> = {};
    for (const conn of sortedConnections) {
      out[conn.id] = normalizePlanTier(resolvedPlanByConnection[conn.id], conn.provider);
    }
    return out;
  }, [sortedConnections, resolvedPlanByConnection]);

  const tierCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: sortedConnections.length,
      enterprise: 0,
      team: 0,
      business: 0,
      ultra: 0,
      pro: 0,
      plus: 0,
      lite: 0,
      free: 0,
      unknown: 0,
    };
    for (const conn of sortedConnections) {
      const tierKey = tierByConnection[conn.id]?.key || "unknown";
      counts[tierKey] = (counts[tierKey] || 0) + 1;
    }
    return counts;
  }, [sortedConnections, tierByConnection]);

  const purchaseTypeByConnection = useMemo(() => {
    const out: Record<string, PurchaseTypeKey> = {};
    for (const conn of sortedConnections) {
      const tierKey = tierByConnection[conn.id]?.key || "unknown";
      out[conn.id] = getPurchaseType(conn.authType, tierKey);
    }
    return out;
  }, [sortedConnections, tierByConnection]);

  const statusByConnection = useMemo(
    () =>
      Object.fromEntries(
        sortedConnections.map((conn) => [conn.id, availabilityAccounts[conn.id]?.status || "empty"])
      ),
    [sortedConnections, availabilityAccounts]
  );

  const purchaseTypeCounts = useMemo(() => {
    const counts: Record<PurchaseTypeKey, number> = {
      all: sortedConnections.length,
      "oauth-sub": 0,
      "oauth-free": 0,
      apikey: 0,
    };
    for (const conn of sortedConnections) {
      const key = purchaseTypeByConnection[conn.id];
      if (key && key !== "all") counts[key] = (counts[key] || 0) + 1;
    }
    return counts;
  }, [sortedConnections, purchaseTypeByConnection]);

  // Unique env tags from connections.providerSpecificData.tag — drives the
  // env chip filter. If no tag is set on any connection, the row hides.
  const envTags = useMemo(() => {
    const tags = new Set<string>();
    for (const conn of sortedConnections) {
      const tag = (conn.providerSpecificData?.tag as string | undefined)?.trim();
      if (tag) tags.add(tag);
    }
    return [...tags].sort((a, b) => compareTr(a, b));
  }, [sortedConnections]);

  const envCounts = useMemo(() => {
    const counts: Record<string, number> = { all: sortedConnections.length };
    for (const conn of sortedConnections) {
      const tag = (conn.providerSpecificData?.tag as string | undefined)?.trim() || "";
      if (!tag) continue;
      counts[tag] = (counts[tag] || 0) + 1;
    }
    return counts;
  }, [sortedConnections]);

  const visibleConnections = useMemo(() => {
    const filtered = sortedConnections.filter((conn) =>
      matchesVisibleQuotaConnection(
        conn,
        providerFilter,
        tierFilter,
        purchaseTypeFilter,
        statusFilter,
        envFilter,
        tierByConnection,
        purchaseTypeByConnection,
        availabilityAccounts
      )
    );

    // Provider rank stays the outer sort key so each group keeps its fixed
    // slot (mirrors dashboard/providers determinism); "critical first, then
    // alert, then ok, then empty; tiebreak by soonest reset" only orders
    // accounts inside their own provider group.
    const statusRank: Record<StatusKey, number> = {
      critical: 0,
      alert: 1,
      ok: 2,
      empty: 3,
      paused: 4,
      all: 5,
    };
    return [...filtered].sort((a, b) =>
      compareQuotaConnections(a, b, {
        providerOrder: PROVIDER_ORDER,
        providerLabels: PROVIDER_LABEL,
        compare: compareTr,
        accountCompare: (x, y) => {
          const sx = statusRank[statusByConnection[x.id] || "empty"];
          const sy = statusRank[statusByConnection[y.id] || "empty"];
          if (sx !== sy) return sx - sy;
          const rx = getSoonestResetMs(visibleQuotaData[x.id]?.quotas);
          const ry = getSoonestResetMs(visibleQuotaData[y.id]?.quotas);
          return rx - ry;
        },
      })
    );
  }, [
    sortedConnections,
    tierByConnection,
    tierFilter,
    purchaseTypeFilter,
    purchaseTypeByConnection,
    statusFilter,
    availabilityAccounts,
    statusByConnection,
    envFilter,
    providerFilter,
    visibleQuotaData,
  ]);

  // Distinct provider keys present in the current connection set (after the
  // upstream OAuth/api-key + USAGE_SUPPORTED_PROVIDERS filter), sorted via
  // the i18n-aware comparator so the dropdown follows the locale's collation.
  const providerOptions = useMemo(
    () => buildProviderOptions(sortedConnections, compareTr),
    [sortedConnections]
  );

  // Auto-fetch LIVE quota on open for visible connections that have no cached
  // quota yet (e.g. a Codex account whose access_token expired — its per-connection
  // live fetch refreshes the token serialized/cascade-safe and surfaces real quota).
  // Scoped to what's on screen and to the entries actually missing data (the ones
  // that already have cache render instantly and are not re-fetched), and runs once
  // per page open so it never loops on the quotaData it writes.
  const autoLiveFetchedRef = useRef(false);
  useEffect(() => {
    if (layoutMode === "overview") return;
    if (initialLoading || autoLiveFetchedRef.current || visibleConnections.length === 0) return;
    autoLiveFetchedRef.current = true;
    for (const conn of visibleConnections) {
      const cached = quotaData[conn.id];
      if (shouldAutoRefreshQuota(conn.provider, cached)) {
        void fetchQuota(conn.id, conn.provider, { force: true, automatic: true }).catch(() => {});
      }
    }
  }, [layoutMode, initialLoading, visibleConnections, quotaData, fetchQuota]);

  const handleSetPurchaseFilter = useCallback((value: PurchaseTypeKey) => {
    setPurchaseTypeFilter(value);
    try {
      localStorage.setItem(LS_PURCHASE_FILTER, value);
    } catch {
      /* ignore */
    }
  }, []);

  const handleSetStatusFilter = useCallback((value: DisplayFilter) => {
    setStatusFilter(value);
    try {
      localStorage.setItem(LS_STATUS_FILTER, value);
    } catch {
      /* ignore */
    }
  }, []);

  const handleSetEnvFilter = useCallback((value: string) => {
    setEnvFilter(value);
    try {
      localStorage.setItem(LS_ENV_FILTER, value);
    } catch {
      /* ignore */
    }
  }, []);

  const handleSetProviderFilter = useCallback((value: string) => {
    setProviderFilter(value);
    try {
      localStorage.setItem(LS_PROVIDER_FILTER, value);
    } catch {
      /* ignore */
    }
  }, []);

  const renderInlineQuotaSummary = (quotas: any[]) => {
    if (!quotas || quotas.length === 0) return null;
    return (
      <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[10px] text-text-muted">
        {quotas.slice(0, 3).map((q, index) => {
          const pct = q.unlimited
            ? 100
            : Math.round(q.remainingPercentage ?? calculatePercentage(q.used, q.total));
          const cd = formatCountdown(q.resetAt);
          const tone = getQuotaToneClasses(pct);
          return (
            <span
              key={`${q.name || "quota"}-${q.modelKey || ""}-${index}`}
              className="inline-flex items-center gap-1"
              title={q.displayName || formatQuotaLabel(q.name)}
            >
              <span className={`tabular-nums ${tone.split(" ")[1]}`}>
                {q.unlimited ? "∞" : `${pct}%`}
              </span>
              {!q.unlimited && (
                <span className="h-1 w-14 rounded-sm bg-border/60 overflow-hidden">
                  <span
                    className={`block h-full ${tone.split(" ")[0]} ${getQuotaBarWidthClass(pct)}`}
                  />
                </span>
              )}
              {cd ? <span>{`⏱ ${cd}`}</span> : null}
            </span>
          );
        })}
      </div>
    );
  };

  if (initialLoading) {
    return (
      <div className="flex flex-col gap-4">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (sortedConnections.length === 0) {
    return (
      <Card padding="lg">
        <div className="text-center py-12">
          <Icon name="cloud_off" size={64} className="opacity-15" />
          <h3 className="mt-4 text-lg font-semibold text-text-main">{t("noProviders")}</h3>
          <p className="mt-2 text-sm text-text-muted max-w-[400px] mx-auto">
            {t("connectProvidersForQuota")}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-text-main m-0">{t("providerLimits")}</h2>
          <span className="text-[13px] text-text-muted">
            {t("accountsCount", { count: visibleConnections.length })}
            {visibleConnections.length !== sortedConnections.length &&
              ` ${t("filteredFromCount", { count: sortedConnections.length })}`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <QuotaLayoutPicker value={layoutMode} onChange={selectLayout} />
          <Button
            variant="outline"
            size="sm"
            onClick={() => void refreshAll()}
            disabled={refreshingAll}
            className="gap-1.5 text-[13px]"
            title={
              autoRefreshIntervalMs > 0 ? tr("autoRefreshing", "Auto-refreshing") : t("refreshAll")
            }
          >
            <Icon
              name={autoRefreshIntervalMs > 0 ? "schedule" : "refresh"}
              size={16}
              className={refreshingAll ? "animate-spin" : undefined}
            />
            {refreshingAll
              ? tr("refreshing", "Refreshing")
              : autoRefreshIntervalMs > 0
                ? `${tr("autoRefreshing", "Auto-refreshing")} ${formatAutoRefreshCountdown(
                    Math.max(
                      0,
                      autoRefreshIntervalMs - (autoRefreshClock - lastRefreshAllAtRef.current)
                    )
                  )}`
                : t("refreshAll")}
          </Button>
        </div>
      </div>

      {showFilters && (
        <>
          {/* Summary stats — clickable status filter */}
          <HealthStats
            accounts={sortedConnections
              .map((c) => availabilityAccounts[c.id])
              .filter(Boolean)
              .map((a) => displayAccount(a))}
            value={statusFilter}
            onChange={handleSetStatusFilter}
          />

          {/* Purchase Type filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] uppercase tracking-wider text-text-muted font-semibold mr-1">
              {tr("filterPurchaseTypeLabel", "Type")}
            </span>
            {PURCHASE_TYPES.map((type) => {
              const count = purchaseTypeCounts[type.key] || 0;
              if (type.key !== "all" && count === 0) return null;
              const active = purchaseTypeFilter === type.key;
              return (
                <FilterChip
                  key={type.key}
                  active={active}
                  onClick={() => handleSetPurchaseFilter(type.key)}
                >
                  <span>{tr(type.labelKey, type.fallback)}</span>
                  <span className="opacity-85">{count}</span>
                </FilterChip>
              );
            })}
          </div>

          {/* Tier filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] uppercase tracking-wider text-text-muted font-semibold mr-1">
              {tr("filterTierLabel", "Tier")}
            </span>
            {TIER_FILTERS.map((tier) => {
              if (tier.key !== "all" && !tierCounts[tier.key]) return null;
              const active = tierFilter === tier.key;
              return (
                <FilterChip key={tier.key} active={active} onClick={() => setTierFilter(tier.key)}>
                  <span>{tier.label || t(tier.labelKey!)}</span>
                  <span className="opacity-85">{tierCounts[tier.key] || 0}</span>
                </FilterChip>
              );
            })}
          </div>

          {/* Provider filter — single-select dropdown of providers actually
              present in the current account set. Auto-falls back to "all" if
              the persisted choice no longer exists in this session. */}
          {providerOptions.length > 1 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] uppercase tracking-wider text-text-muted font-semibold mr-1">
                {tr("filterProviderLabel", "Provider")}
              </span>
              <Select
                compact
                className="w-auto"
                value={
                  providerFilter === "all" || providerOptions.includes(providerFilter)
                    ? providerFilter
                    : "all"
                }
                onChange={(event) => handleSetProviderFilter(event.target.value)}
                aria-label={tr("filterProviderAriaLabel", "Filter quota providers")}
              >
                <option value="all">{tr("filterProviderAll", "All providers")}</option>
                {providerOptions.map((provider) => (
                  <option key={provider} value={provider}>
                    {PROVIDER_LABEL[provider] || provider}
                  </option>
                ))}
              </Select>
            </div>
          )}

          {/* Env filter — only renders when at least one connection has a tag */}
          {envTags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] uppercase tracking-wider text-text-muted font-semibold mr-1">
                {tr("filterEnvLabel", "Env")}
              </span>
              {(["all", ...envTags] as string[]).map((tag) => {
                const count = envCounts[tag] || 0;
                const active = envFilter === tag;
                const label = tag === "all" ? tr("filterEnvAll", "All") : tag;
                return (
                  <FilterChip key={tag} active={active} onClick={() => handleSetEnvFilter(tag)}>
                    <span>{label}</span>
                    <span className="opacity-85">{count}</span>
                  </FilterChip>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Provider groups */}
      <div className="flex flex-col gap-3">
        {visibleConnections.length === 0 && (
          <div className="py-6 px-4 text-center text-text-muted text-[13px] rounded-lg border border-border bg-surface">
            {t("noAccountsForTierFilter")}{" "}
            <strong>
              {(() => {
                const tier = TIER_FILTERS.find((tier) => tier.key === tierFilter);
                return tier?.label || t(tier?.labelKey || "tierUnknown");
              })()}
            </strong>
            .
          </div>
        )}

        <QuotaCardGrid
          connections={visibleConnections}
          accounts={availabilityAccounts}
          summaryFailed={summaryFailed}
          quotaData={visibleQuotaData}
          loading={loading}
          errors={errors}
          lastRefreshedAt={lastRefreshedAt}
          emailsVisible={emailsVisible}
          providerLabels={PROVIDER_LABEL}
          renderInlineQuotaSummary={(quota) => renderInlineQuotaSummary(quota.quotas)}
          onRefresh={refreshProvider}
          onOpenCutoff={(conn) => {
            const windows = (visibleQuotaData[conn.id]?.quotas || []).filter(
              (q: any) => q && typeof q.name === "string" && !q.isCredits
            );
            setCutoffModalWindows(windows);
            setCutoffModalConn(conn);
          }}
          onOpenResetCredits={resetCreditRedemption.openCodexResetCredits}
          onToggleActive={handleToggleActive}
          togglingActiveId={togglingActiveId}
          quotaVisibility={quotaVisibility}
          onHideQuota={handleHideQuota}
          onShowQuota={handleShowQuota}
          redeemingResetCreditId={resetCreditRedemption.redeemingResetCreditId}
          loadingResetCreditsId={resetCreditRedemption.loadingResetCreditsId}
          compact={layoutMode === "compact"}
          overview={layoutMode === "overview"}
        />
      </div>

      {resetCreditRedemption.resetCreditPicker && (
        <CodexResetCreditsModal
          isOpen={true}
          credits={resetCreditRedemption.resetCreditPicker.credits}
          availableCount={resetCreditRedemption.resetCreditPicker.availableCount}
          loading={resetCreditRedemption.redeemingResetCreditId !== null}
          provider={resetCreditRedemption.resetCreditPicker.provider}
          onClose={resetCreditRedemption.closeResetCreditPicker}
          onRedeem={resetCreditRedemption.redeemCodexResetCredit}
        />
      )}

      {cutoffModalConn && (
        <QuotaCutoffModal
          isOpen={!!cutoffModalConn}
          onClose={() => {
            setCutoffModalConn(null);
            setCutoffModalWindows([]);
          }}
          connectionId={cutoffModalConn.id}
          connectionName={
            pickDisplayValue(
              [cutoffModalConn.name, cutoffModalConn.displayName, cutoffModalConn.email],
              emailsVisible,
              cutoffModalConn.provider
            ) || cutoffModalConn.provider
          }
          provider={cutoffModalConn.provider}
          windows={cutoffModalWindows.map((q: any) => ({
            key: q.name,
            displayName: q.displayName || formatQuotaLabel(q.name),
          }))}
          current={cutoffModalConn.quotaWindowThresholds || null}
          providerDefaults={providerWindowDefaults[cutoffModalConn.provider] || {}}
          globalDefaultPercent={globalThresholdDefault}
          onSave={async (patch) => {
            await saveQuotaWindowThresholds(cutoffModalConn.id, patch);
            setCutoffModalConn((prev: any) => {
              if (!prev) return prev;
              if (patch === null) return { ...prev, quotaWindowThresholds: null };
              const next = { ...(prev.quotaWindowThresholds || {}) };
              for (const [k, v] of Object.entries(patch)) {
                if (v === null) delete next[k];
                else next[k] = v;
              }
              return {
                ...prev,
                quotaWindowThresholds: Object.keys(next).length === 0 ? null : next,
              };
            });
          }}
        />
      )}
    </div>
  );
}
