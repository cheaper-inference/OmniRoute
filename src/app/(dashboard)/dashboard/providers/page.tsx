"use client";

import Icon from "@/shared/components/Icon";

import { useState, useEffect, useCallback, useMemo, Suspense } from "react";
import {
  Badge,
  Card,
  CardSkeleton,
  Button,
  Modal,
  ProviderCardGrid,
  TALL_MODAL_PROPS,
} from "@/shared/components";
import {
  AGGREGATOR_PROVIDER_IDS,
  EMBEDDING_RERANK_PROVIDER_IDS,
  ENTERPRISE_CLOUD_PROVIDER_IDS,
  IDE_PROVIDER_IDS,
  IMAGE_ONLY_PROVIDER_IDS,
  VIDEO_PROVIDER_IDS,
} from "@/shared/constants/providers";
import { partitionNoAuthEntriesByBlocked } from "@/shared/utils/noAuthProviders";
import { buttonVariants } from "@omniroute/ui-kit/button";
import { EmptyState as KitEmptyState } from "@omniroute/ui-kit/empty-state";
import { SectionHeader } from "@omniroute/ui-kit/page-header";
import { useRouter, useSearchParams } from "next/navigation";
import { getErrorCode, getRelativeTime } from "@/shared/utils";
import {
  isProviderConnectionConnected,
  isProviderConnectionErrored,
} from "@/shared/utils/providerConnectionStatus";
import { pickDisplayValue } from "@/shared/utils/maskEmail";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import { useNotificationStore } from "@/store/notificationStore";
import { useTranslations } from "next-intl";
import { useSyncedModelsByProvider } from "./hooks/useSyncedModelsByProvider";
import { useProviderUrlFilters } from "./hooks/useProviderUrlFilters";
import {
  buildStaticProviderEntries,
  buildCompatibleProviderGroups,
  connectionMatchesProviderCard,
  filterConfiguredProviderEntries,
  shouldFilterProviderEntriesForDisplayMode,
  shouldShowFirstProviderHint,
  shouldShowProviderSection,
  isPrimaryLlmProviderEntry,
  resolveVisibleWebFetchEntries,
  upsertProviderNodeById,
  loadProviderPageData,
} from "./providerPageUtils";
import type { ProviderEntry, OpenRouterProviderStatsEntry } from "./providerPageUtils";
import { OpenRouterProviderStatsProvider } from "./context/openRouterProviderStatsContext";
import {
  shouldSyncProviderDisplayMode,
  writeProviderDisplayModePreference,
  type ProviderDisplayMode,
} from "./providerPageStorage";
import {
  getCodexEffectiveServiceTier,
  getCodexGlobalServiceMode,
  type CodexGlobalServiceMode,
} from "@/lib/providers/codexFastTier";
import dynamic from "next/dynamic";
const AddCompatibleProviderModal = dynamic(
  () => import("./components/AddCompatibleProviderModal"),
  { ssr: false }
);
import { CategoryDot } from "./components/CategoryDot";
const ImportProvidersFromFileModal = dynamic(
  () =>
    import("./components/ImportProvidersFromFileModal").then((m) => m.ImportProvidersFromFileModal),
  { ssr: false }
);
import NoAuthProvidersSection from "./components/NoAuthProvidersSection";
import HighlightableProviderCard from "./components/HighlightableProviderCard";
import ProviderCountBadge from "./components/ProviderCountBadge";
import ProviderSummaryCard from "./components/ProviderSummaryCard";
import DeprecatedProviderBanner from "./components/DeprecatedProviderBanner";
import {
  buildCompactProviderEntriesForPage,
  getCompactProviderAuthType,
} from "./providerCompactMode";

type DashboardProviderInfo = {
  id?: string;
  name: string;
  color?: string;
  apiType?: string;
  deprecated?: boolean;
  deprecationReason?: string;
  hasFree?: boolean;
  freeNote?: string;
  [key: string]: unknown;
};

type DashboardProviderEntry = ProviderEntry<DashboardProviderInfo>;

function countConfigured<T>(entries: ProviderEntry<T>[]) {
  return {
    configured: entries.filter((entry) => Number(entry.stats?.total || 0) > 0).length,
    total: entries.length,
  };
}

function dedupeProviderEntries(entries: DashboardProviderEntry[]): DashboardProviderEntry[] {
  const seen = new Set<string>();
  return entries.filter((entry) => {
    if (seen.has(entry.providerId)) return false;
    seen.add(entry.providerId);
    return true;
  });
}

function providerEntryHasFree(entry: DashboardProviderEntry): boolean {
  return entry.provider.hasFree === true;
}

type ProviderMessageTranslator = ((key: string, values?: Record<string, unknown>) => string) & {
  has?: (key: string) => boolean;
};

function providerText(
  t: ProviderMessageTranslator,
  key: string,
  fallback: string,
  values?: Record<string, unknown>
): string {
  if (typeof t.has === "function" && t.has(key)) {
    return t(key, values);
  }
  if (values) {
    return Object.entries(values).reduce(
      (acc, [name, value]) => acc.replaceAll(`{${name}}`, String(value)),
      fallback
    );
  }
  return fallback;
}

type ProviderBatchTestResult = {
  connectionId?: string;
  connectionName?: string;
  provider?: string;
  valid?: boolean;
  latencyMs?: number;
  diagnosis?: { type?: string };
};

type ProviderBatchTestResults = {
  mode?: string;
  results?: ProviderBatchTestResult[];
  summary?: {
    total?: number;
    passed?: number;
    failed?: number;
  };
  error?: string | { message?: string };
};

function getConnectionErrorTag(connection, t: ProviderMessageTranslator) {
  if (!connection) return null;

  const explicitType = connection.lastErrorType;
  if (explicitType === "runtime_error") return providerText(t, "errorTypeRuntime", "Runtime");
  if (
    explicitType === "upstream_auth_error" ||
    explicitType === "auth_missing" ||
    explicitType === "token_refresh_failed" ||
    explicitType === "token_expired"
  ) {
    return providerText(t, "errorTypeUpstreamAuth", "Auth");
  }
  if (explicitType === "upstream_rate_limited") {
    return providerText(t, "errorTypeRateLimited", "Rate limited");
  }
  if (explicitType === "upstream_unavailable") {
    return providerText(t, "errorTypeUpstreamUnavailable", "Server error");
  }
  if (explicitType === "network_error") {
    return providerText(t, "errorTypeNetworkError", "Network");
  }

  const numericCode = Number(connection.errorCode);
  if (Number.isFinite(numericCode) && numericCode >= 400) {
    return String(numericCode);
  }

  const fromMessage = getErrorCode(connection.lastError);
  if (fromMessage === "401" || fromMessage === "403") {
    return providerText(t, "errorTypeUpstreamAuth", "Auth");
  }
  if (fromMessage && fromMessage !== "ERR") return fromMessage;

  const msg = (connection.lastError || "").toLowerCase();
  if (msg.includes("runtime") || msg.includes("not runnable") || msg.includes("not installed"))
    return providerText(t, "errorTypeRuntime", "Runtime");
  if (
    msg.includes("invalid api key") ||
    msg.includes("token invalid") ||
    msg.includes("revoked") ||
    msg.includes("unauthorized")
  )
    return providerText(t, "errorTypeUpstreamAuth", "Auth");

  return "ERR";
}

// OAuth-env repair status fetch, extracted so the callback below only sets
// state after the await (errors come back as `null` instead of a setState
// inside the catch block, which the react-hooks compiler rules reject when the
// callback is invoked from an effect).
async function loadOauthEnvRepairStatus(): Promise<{
  available: boolean;
  missingCount: number;
} | null> {
  try {
    const res = await fetch("/api/system/env/repair", { cache: "no-store" });
    const data = await res.json();
    if (!res.ok) return null;
    return {
      available: Boolean(data.available),
      missingCount: Number(data.missingCount || 0),
    };
  } catch {
    return null;
  }
}

function ProvidersPageContent() {
  const router = useRouter();
  const [connections, setConnections] = useState<any[]>([]);
  const [providerNodes, setProviderNodes] = useState<any[]>([]);
  const [ccCompatibleProviderEnabled, setCcCompatibleProviderEnabled] = useState(false);
  const [blockedProviders, setBlockedProviders] = useState<string[]>([]);
  const [expirations, setExpirations] = useState<any>(null);
  const [codexGlobalServiceMode, setCodexGlobalServiceMode] =
    useState<CodexGlobalServiceMode>("none");
  const [loading, setLoading] = useState(true);
  const [showAllProviders, setShowAllProviders] = useState(false);
  const [showAddCompatibleModal, setShowAddCompatibleModal] = useState(false);
  const [showAddAnthropicCompatibleModal, setShowAddAnthropicCompatibleModal] = useState(false);
  const [showAddCcCompatibleModal, setShowAddCcCompatibleModal] = useState(false);
  const [showImportFromFileModal, setShowImportFromFileModal] = useState(false);
  const [testingMode, setTestingMode] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<any>(null);
  const [providerDisplayMode, setProviderDisplayMode] = useState<ProviderDisplayMode>("all");
  const [oauthEnvRepairStatus, setOauthEnvRepairStatus] = useState<{
    available: boolean;
    missingCount: number;
  } | null>(null);
  const [repairingEnv, setRepairingEnv] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [modelSearchQuery, setModelSearchQuery] = useState("");
  const liveModelsByProviderId = useSyncedModelsByProvider();
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [openRouterProviderStats, setOpenRouterProviderStats] = useState<
    OpenRouterProviderStatsEntry[]
  >([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  // #4240: media-category (serviceKind) filter — composes with activeCategory,
  // search and configured-only. null = no serviceKind filter.
  const [activeServiceKind, setActiveServiceKind] = useState<string | null>(null);
  const notify = useNotificationStore();
  const sectionCategoryAliases: Record<string, string> = {
    cloud: "cloudagent",
    noauth: "no-auth",
    proxy: "upstream-proxy",
    web: "webcookie",
  };
  const showSection = (category: string) => {
    const normalizedCategory = sectionCategoryAliases[category] ?? category;
    return shouldShowProviderSection(normalizedCategory, activeCategory, showFreeOnly);
  };
  const t = useTranslations("providers");
  const tc = useTranslations("common");
  const webCookieProvidersDesc = providerText(
    t,
    "webCookieProvidersDesc",
    "These providers use browser web sessions, cookies, or web tokens instead of API keys. Open a provider to add the required session credential."
  );
  const ccCompatibleLabel = t("ccCompatibleLabel");
  const addCcCompatibleLabel = t("addCcCompatible");
  const searchParams = useSearchParams();

  const { displayModePreferenceReady } = useProviderUrlFilters({
    searchParams,
    providerDisplayMode,
    setProviderDisplayMode,
    searchQuery,
    setSearchQuery,
    modelSearchQuery,
    setModelSearchQuery,
    activeCategory,
    setActiveCategory,
    showFreeOnly,
    setShowFreeOnly,
    activeServiceKind,
    setActiveServiceKind,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Each request is time-bounded (see loadProviderPageData); a single
        // stalled connection can no longer wedge `loading` on `true` and freeze
        // the page on its skeleton forever.
        const data = await loadProviderPageData();
        setConnections(data.connections);
        setProviderNodes(data.providerNodes);
        setCcCompatibleProviderEnabled(data.ccCompatibleProviderEnabled);
        if (data.expirations) setExpirations(data.expirations);
        if (data.blockedProviders) setBlockedProviders(data.blockedProviders);
        setCodexGlobalServiceMode(getCodexGlobalServiceMode(data.settings));
        setOpenRouterProviderStats(data.openRouterProviderStats);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!shouldSyncProviderDisplayMode(displayModePreferenceReady, loading)) return;

    const storedDisplayMode =
      connections.length === 0 && providerDisplayMode === "configured"
        ? "all"
        : providerDisplayMode;
    writeProviderDisplayModePreference(storedDisplayMode);
  }, [connections.length, displayModePreferenceReady, providerDisplayMode, loading]);

  // "No connections → fall back to the 'all' view" is a state adjustment
  // derived from other state, applied during render (self-invalidating guard,
  // converges in one extra pass) instead of a synchronous setState effect.
  if (
    shouldSyncProviderDisplayMode(displayModePreferenceReady, loading) &&
    connections.length === 0 &&
    providerDisplayMode === "configured"
  ) {
    setProviderDisplayMode("all");
  }

  const fetchOauthEnvRepairStatus = useCallback(async () => {
    setOauthEnvRepairStatus(await loadOauthEnvRepairStatus());
  }, []);

  useEffect(() => {
    const run = async () => {
      const status = await loadOauthEnvRepairStatus();
      setOauthEnvRepairStatus(status);
    };
    void run();
  }, []);

  const handleRepairEnv = async () => {
    if (!oauthEnvRepairStatus?.available || repairingEnv) return;

    setRepairingEnv(true);
    try {
      const res = await fetch("/api/system/env/repair", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || t("repairEnvFailed"));
      }
      notify.success(
        data.backupPath ? `${t("repairEnvSuccess")} (${data.backupPath})` : t("repairEnvSuccess")
      );
      await fetchOauthEnvRepairStatus();
    } catch (error) {
      notify.error(error instanceof Error ? error.message : t("repairEnvFailed"));
    } finally {
      setRepairingEnv(false);
    }
  };

  const getProviderStats = (providerId, authType) => {
    const providerConnections = connections.filter((c) =>
      connectionMatchesProviderCard(c, providerId, authType)
    );

    const connected = providerConnections.filter((connection) =>
      isProviderConnectionConnected(connection)
    ).length;

    const errorConns = providerConnections.filter((connection) =>
      isProviderConnectionErrored(connection)
    );

    const error = errorConns.length;
    const total = providerConnections.length;

    // Check if all connections are manually disabled
    const allDisabled = total > 0 && providerConnections.every((c) => c.isActive === false);

    // Get latest error info
    const latestError = errorConns.sort(
      (a: any, b: any) =>
        (new Date(b.lastErrorAt || 0) as any) - (new Date(a.lastErrorAt || 0) as any)
    )[0];
    const errorCode = latestError ? getConnectionErrorTag(latestError, t) : null;
    const errorTime = latestError?.lastErrorAt ? getRelativeTime(latestError.lastErrorAt) : null;

    // Check expirations
    const providerExpirations =
      expirations?.list?.filter((e: any) => e.provider === providerId) || [];
    const hasExpired = providerExpirations.some((e: any) => e.status === "expired");
    const hasExpiringSoon = providerExpirations.some((e: any) => e.status === "expiring_soon");
    let expiryStatus = null;
    if (hasExpired) expiryStatus = "expired";
    else if (hasExpiringSoon) expiryStatus = "expiring_soon";

    const codexConnectionServiceTiers = [
      ...new Set(
        providerConnections
          .map((connection) =>
            getCodexEffectiveServiceTier(connection.providerSpecificData, "none")
          )
          .filter((tier) => tier !== "default")
      ),
    ];
    const codexServiceTier =
      providerId === "codex"
        ? codexGlobalServiceMode !== "none"
          ? codexGlobalServiceMode
          : codexConnectionServiceTiers.length === 1
            ? codexConnectionServiceTiers[0]
            : null
        : null;

    // Count API keys in "warning" state across all connections, and (#10261)
    // aggregate a SANITIZED reasons summary (max failure count + most recent
    // failure time — never the raw upstream error text) so the warning badge
    // can expose why connections are flagged instead of a bare count.
    let warningMaxFailures = 0;
    let warningLatestFailureAt: string | null = null;
    const warning = providerConnections.reduce((warnCount, conn) => {
      const health = (conn as any).providerSpecificData?.apiKeyHealth as
        | Record<string, { status: string; failures?: number; lastFailure?: string | null }>
        | undefined;
      if (!health) return warnCount;
      const warningEntries = Object.values(health).filter((h) => h.status === "warning");
      for (const entry of warningEntries) {
        warningMaxFailures = Math.max(warningMaxFailures, entry.failures ?? 0);
        if (
          entry.lastFailure &&
          (!warningLatestFailureAt || entry.lastFailure > warningLatestFailureAt)
        ) {
          warningLatestFailureAt = entry.lastFailure;
        }
      }
      return warnCount + warningEntries.length;
    }, 0);
    const warningLastFailureRelative = warningLatestFailureAt
      ? getRelativeTime(warningLatestFailureAt)
      : null;

    return {
      connected,
      error,
      warning,
      warningMaxFailures,
      warningLastFailureRelative,
      total,
      errorCode,
      errorTime,
      allDisabled,
      expiryStatus,
      codexServiceTier,
    };
  };

  // Toggle all connections for a provider on/off
  const handleToggleProvider = async (providerId: string, authType: string, newActive: boolean) => {
    const matchesToggle = (c: { provider: string; authType?: string }) =>
      connectionMatchesProviderCard(c, providerId, authType as "oauth" | "free" | "apikey");
    const providerConns = connections.filter(matchesToggle);
    // Optimistically update UI
    setConnections((prev) =>
      prev.map((c) => (matchesToggle(c) ? { ...c, isActive: newActive } : c))
    );
    // Fire API calls in parallel
    await Promise.allSettled(
      providerConns.map((c) =>
        fetch(`/api/providers/${c.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive: newActive }),
        })
      )
    );
  };

  const handleBatchTest = async (mode, providerId = null) => {
    if (testingMode) return;
    setTestingMode(mode === "provider" ? providerId : mode);
    setTestResults(null);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90_000); // 90s max
    try {
      const res = await fetch("/api/providers/test-batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, providerId }),
        signal: controller.signal,
      });
      let data: any;
      try {
        data = await res.json();
      } catch {
        // Response body is not valid JSON (e.g. truncated due to timeout)
        data = { error: t("providerTestFailed"), results: [], summary: null };
      }
      setTestResults({
        ...data,
        // Normalize error: if API returns an error object { message, details }, extract the string
        error: data.error
          ? typeof data.error === "object"
            ? data.error.message || data.error.error || JSON.stringify(data.error)
            : String(data.error)
          : null,
      });
      if (data?.summary) {
        const { passed, failed, total } = data.summary;
        if (failed === 0) notify.success(t("allTestsPassed", { total }));
        else notify.warning(t("testSummary", { passed, failed, total }));
      }
    } catch (error: any) {
      const isAbort = error?.name === "AbortError";
      const msg = isAbort ? t("providerTestTimeout") : t("providerTestFailed");
      setTestResults({ error: msg, results: [], summary: null });
      notify.error(msg);
    } finally {
      clearTimeout(timeoutId);
      setTestingMode(null);
    }
  };

  const compatibleProviderGroups = useMemo(
    () =>
      buildCompatibleProviderGroups(providerNodes, {
        openaiCompatibleName: t("openaiCompatibleName"),
        anthropicCompatibleName: t("anthropicCompatibleName"),
        claudeCodeCompatibleName: ccCompatibleLabel,
      }),
    [ccCompatibleLabel, providerNodes, t]
  );
  const compatibleProviders = compatibleProviderGroups.openai;
  const anthropicCompatibleProviders = compatibleProviderGroups.anthropic;
  const ccCompatibleProviders = compatibleProviderGroups.claudeCode;

  const effectiveProviderDisplayMode =
    providerDisplayMode === "configured" && connections.length === 0 ? "all" : providerDisplayMode;
  const effectiveShowConfiguredOnly = shouldFilterProviderEntriesForDisplayMode(
    effectiveProviderDisplayMode,
    connections.length
  );
  const isCompactProviderDisplay = effectiveProviderDisplayMode === "compact";

  const oauthProviderEntriesAll = buildStaticProviderEntries("oauth", getProviderStats);
  const oauthProviderEntries = filterConfiguredProviderEntries(
    oauthProviderEntriesAll,
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly,
    modelSearchQuery,
    activeServiceKind,
    liveModelsByProviderId,
    connections
  );

  const rawNoAuthEntriesAll = buildStaticProviderEntries("no-auth", getProviderStats);
  // Partition rather than drop: blocked no-auth providers stay surfaced on the page
  // (rendered with a "Disabled" badge + Enable button) instead of silently vanishing,
  // which left users unable to find/restore a disabled no-auth provider (#5166/#5183).
  // `noAuthEntriesAll` keeps only the visible (non-blocked) entries, so every downstream
  // aggregate/count/model list that consumes it is unchanged.
  const { visible: noAuthEntriesAll, blocked: blockedNoAuthEntries } =
    partitionNoAuthEntriesByBlocked(rawNoAuthEntriesAll, blockedProviders);
  const noAuthEntries = filterConfiguredProviderEntries(
    noAuthEntriesAll,
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly,
    modelSearchQuery,
    activeServiceKind,
    liveModelsByProviderId,
    connections
  );

  const apiKeyProviderEntriesAll = buildStaticProviderEntries("apikey", getProviderStats);
  const llmProviderEntriesAll = apiKeyProviderEntriesAll.filter(isPrimaryLlmProviderEntry);
  const llmProviderEntries = filterConfiguredProviderEntries(
    llmProviderEntriesAll,
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly,
    modelSearchQuery,
    activeServiceKind,
    liveModelsByProviderId,
    connections
  );
  const aggregatorProviderEntriesAll = apiKeyProviderEntriesAll.filter((entry) =>
    AGGREGATOR_PROVIDER_IDS.has(entry.providerId)
  );
  const aggregatorProviderEntries = filterConfiguredProviderEntries(
    aggregatorProviderEntriesAll,
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly,
    modelSearchQuery,
    activeServiceKind,
    liveModelsByProviderId,
    connections
  );
  const imageProviderEntriesAll = apiKeyProviderEntriesAll.filter((entry) =>
    IMAGE_ONLY_PROVIDER_IDS.has(entry.providerId)
  );
  const imageProviderEntries = filterConfiguredProviderEntries(
    imageProviderEntriesAll,
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly,
    modelSearchQuery,
    activeServiceKind,
    liveModelsByProviderId,
    connections
  );
  const enterpriseProviderEntriesAll = apiKeyProviderEntriesAll.filter((entry) =>
    ENTERPRISE_CLOUD_PROVIDER_IDS.has(entry.providerId)
  );
  const enterpriseProviderEntries = filterConfiguredProviderEntries(
    enterpriseProviderEntriesAll,
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly,
    modelSearchQuery,
    activeServiceKind,
    liveModelsByProviderId,
    connections
  );
  const videoProviderEntriesAll = apiKeyProviderEntriesAll.filter((entry) =>
    VIDEO_PROVIDER_IDS.has(entry.providerId)
  );
  const videoProviderEntries = filterConfiguredProviderEntries(
    videoProviderEntriesAll,
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly,
    modelSearchQuery,
    activeServiceKind,
    liveModelsByProviderId,
    connections
  );
  const embeddingRerankProviderEntriesAll = apiKeyProviderEntriesAll.filter((entry) =>
    EMBEDDING_RERANK_PROVIDER_IDS.has(entry.providerId)
  );
  const embeddingRerankProviderEntries = filterConfiguredProviderEntries(
    embeddingRerankProviderEntriesAll,
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly,
    modelSearchQuery,
    activeServiceKind,
    liveModelsByProviderId,
    connections
  );

  const webCookieProviderEntriesAll = buildStaticProviderEntries("web-cookie", getProviderStats);
  const webCookieProviderEntries = filterConfiguredProviderEntries(
    webCookieProviderEntriesAll,
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly,
    modelSearchQuery,
    activeServiceKind,
    liveModelsByProviderId,
    connections
  );

  const localProviderEntriesAll = buildStaticProviderEntries("local", getProviderStats);
  const localProviderEntries = filterConfiguredProviderEntries(
    localProviderEntriesAll,
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly,
    modelSearchQuery,
    activeServiceKind,
    liveModelsByProviderId,
    connections
  );

  const searchProviderEntriesAll = buildStaticProviderEntries("search", getProviderStats);
  const searchProviderEntries = filterConfiguredProviderEntries(
    searchProviderEntriesAll,
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly,
    modelSearchQuery,
    activeServiceKind,
    liveModelsByProviderId,
    connections
  );

  const audioProviderEntriesAll = buildStaticProviderEntries("audio", getProviderStats);
  const audioProviderEntries = filterConfiguredProviderEntries(
    audioProviderEntriesAll,
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly,
    modelSearchQuery,
    activeServiceKind,
    liveModelsByProviderId,
    connections
  );

  const cloudAgentProviderEntriesAll = buildStaticProviderEntries("cloud-agent", getProviderStats);
  const cloudAgentProviderEntries = filterConfiguredProviderEntries(
    cloudAgentProviderEntriesAll,
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly,
    modelSearchQuery,
    activeServiceKind,
    liveModelsByProviderId,
    connections
  );

  const upstreamProxyEntriesAll = buildStaticProviderEntries("upstream-proxy", getProviderStats);
  const upstreamProxyEntries = filterConfiguredProviderEntries(
    upstreamProxyEntriesAll,
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly,
    modelSearchQuery,
    activeServiceKind,
    liveModelsByProviderId,
    connections
  );

  const compatibleProviderEntriesAll = [
    ...compatibleProviders.map((provider) => ({
      providerId: provider.id,
      provider,
      stats: getProviderStats(provider.id, "apikey"),
      displayAuthType: "compatible" as const,
      toggleAuthType: "apikey" as const,
    })),
    ...anthropicCompatibleProviders.map((provider) => ({
      providerId: provider.id,
      provider,
      stats: getProviderStats(provider.id, "apikey"),
      displayAuthType: "compatible" as const,
      toggleAuthType: "apikey" as const,
    })),
    ...ccCompatibleProviders.map((provider) => ({
      providerId: provider.id,
      provider,
      stats: getProviderStats(provider.id, "apikey"),
      displayAuthType: "compatible" as const,
      toggleAuthType: "apikey" as const,
    })),
  ];
  const compatibleProviderEntries = filterConfiguredProviderEntries(
    compatibleProviderEntriesAll,
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly,
    modelSearchQuery,
    activeServiceKind,
    liveModelsByProviderId,
    connections
  );

  const staticProviderEntriesAll = dedupeProviderEntries([
    ...oauthProviderEntriesAll,
    ...noAuthEntriesAll,
    ...apiKeyProviderEntriesAll,
    ...webCookieProviderEntriesAll,
    ...localProviderEntriesAll,
    ...searchProviderEntriesAll,
    ...audioProviderEntriesAll,
    ...cloudAgentProviderEntriesAll,
    ...upstreamProxyEntriesAll,
  ] as DashboardProviderEntry[]);
  const dashboardProviderEntriesAll = dedupeProviderEntries([
    ...staticProviderEntriesAll,
    ...compatibleProviderEntriesAll,
  ]);
  const freeSectionEntriesAll = dashboardProviderEntriesAll.filter(providerEntryHasFree);
  const freeSectionEntries = filterConfiguredProviderEntries(
    freeSectionEntriesAll,
    effectiveShowConfiguredOnly,
    searchQuery,
    undefined,
    modelSearchQuery,
    activeServiceKind,
    liveModelsByProviderId,
    connections
  );

  // IDE providers: subset of oauth/apikey providers that are editors/IDEs with
  // built-in AI subscription. Rendered in a dedicated "IDE Providers" section
  // and excluded from the regular OAuth/API Key sections to avoid duplication.
  const ideProviderEntriesAll = [...oauthProviderEntriesAll, ...apiKeyProviderEntriesAll].filter(
    (e) => IDE_PROVIDER_IDS.has(e.providerId)
  );
  const ideProviderEntries = filterConfiguredProviderEntries(
    ideProviderEntriesAll,
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly,
    modelSearchQuery,
    activeServiceKind,
    liveModelsByProviderId,
    connections
  );

  const oauthOnlyEntriesAll = oauthProviderEntriesAll
    .filter((e) => e.toggleAuthType === "oauth")
    .filter((e) => !IDE_PROVIDER_IDS.has(e.providerId));

  // Web Fetch providers: filter across all entries by serviceKinds
  const webFetchEntriesAll = dedupeProviderEntries(
    [...staticProviderEntriesAll, ...compatibleProviderEntriesAll].filter((e) => {
      const p = e.provider as DashboardProviderInfo & { serviceKinds?: string[] };
      return p.serviceKinds?.includes("webFetch") === true;
    }) as DashboardProviderEntry[]
  );
  const webFetchEntries = filterConfiguredProviderEntries(
    webFetchEntriesAll,
    effectiveShowConfiguredOnly,
    searchQuery,
    showFreeOnly,
    modelSearchQuery,
    activeServiceKind,
    liveModelsByProviderId,
    connections
  );
  const visibleWebFetchEntries = resolveVisibleWebFetchEntries(webFetchEntries, activeCategory);

  const compactProviderEntries = buildCompactProviderEntriesForPage({
    activeCategory,
    showFreeOnly,
    freeSectionEntries,
    compatibleProviderEntries,
    oauthProviderEntries,
    ideProviderEntries,
    noAuthEntries,
    upstreamProxyEntries,
    llmProviderEntries,
    aggregatorProviderEntries,
    enterpriseProviderEntries,
    embeddingRerankProviderEntries,
    imageProviderEntries,
    videoProviderEntries,
    webCookieProviderEntries,
    searchProviderEntries,
    webFetchEntries,
    audioProviderEntries,
    localProviderEntries,
    cloudAgentProviderEntries,
  });

  const summaryStats = {
    all: countConfigured(dashboardProviderEntriesAll),
    free: countConfigured(freeSectionEntriesAll),
    noauth: countConfigured(noAuthEntriesAll),
    oauth: countConfigured(oauthOnlyEntriesAll),
    apikey: countConfigured(apiKeyProviderEntriesAll),
    compatible: countConfigured(compatibleProviderEntriesAll),
    webcookie: countConfigured(webCookieProviderEntriesAll),
    search: countConfigured(searchProviderEntriesAll),
    audio: countConfigured(audioProviderEntriesAll),
    local: countConfigured(localProviderEntriesAll),
    upstreamproxy: countConfigured(upstreamProxyEntriesAll),
    cloudagent: countConfigured(cloudAgentProviderEntriesAll),
    ide: countConfigured(ideProviderEntriesAll),
    webfetch: countConfigured(webFetchEntriesAll),
  };
  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  const showFirstProviderHint =
    shouldShowFirstProviderHint(connections.length, searchQuery) && !showAllProviders;

  return (
    <OpenRouterProviderStatsProvider entries={openRouterProviderStats}>
      <div className="flex flex-col gap-6">
        <DeprecatedProviderBanner />

        {showFirstProviderHint && (
          <Card padding="lg">
            <KitEmptyState
              icon={<Icon name="dns" size={32} />}
              title={t("addFirstProvider") || "Add your first provider"}
              description={
                t("addFirstProviderDesc") ||
                "Connect an AI provider to start routing requests through OmniRoute. You can use free providers, API keys, or OAuth accounts."
              }
              actions={
                <>
                  <Button icon="add" onClick={() => router.push("/dashboard/providers/new")}>
                    {providerText(t, "onboardingWizard", "Provider Onboarding Wizard")}
                  </Button>
                  <a
                    href="https://github.com/cheaper-inference/OmniRoute#-documentation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ variant: "outline" })}
                  >
                    <Icon name="help" size={16} />
                    {t("learnMore") || "Learn more"}
                  </a>
                </>
              }
            />
          </Card>
        )}

        <ProviderSummaryCard
          activeCategory={activeCategory}
          activeServiceKind={activeServiceKind}
          onServiceKindChange={setActiveServiceKind}
          disabledConfigured={connections.length === 0}
          displayMode={effectiveProviderDisplayMode}
          modelSearchQuery={modelSearchQuery}
          onBatchTest={handleBatchTest}
          onCategoryChange={(category, freeOnly) => {
            setShowFreeOnly(freeOnly);
            setActiveCategory(freeOnly ? null : category);
          }}
          onDisplayModeChange={setProviderDisplayMode}
          onNewProvider={() => router.push("/dashboard/providers/new")}
          onImportFromFile={() => setShowImportFromFileModal(true)}
          searchQuery={searchQuery}
          setModelSearchQuery={setModelSearchQuery}
          setSearchQuery={setSearchQuery}
          showFreeOnly={showFreeOnly}
          summaryStats={summaryStats}
          t={t}
          tc={tc}
          testingMode={testingMode}
        />

        {/* Expiration Banner */}
        {expirations?.summary &&
          (expirations.summary.expired > 0 || expirations.summary.expiringSoon > 0) && (
            <div
              className={`p-4 rounded-xl flex items-start gap-3 border ${
                expirations.summary.expired > 0
                  ? "bg-error/10 border-error/20"
                  : "bg-warning/10 border-warning/20"
              }`}
            >
              <Icon
                name={expirations.summary.expired > 0 ? "error" : "warning"}
                size={24}
                className={expirations.summary.expired > 0 ? "text-error" : "text-warning"}
              />
              <div className="flex-1">
                <h3
                  className={`font-semibold ${expirations.summary.expired > 0 ? "text-error" : "text-warning"}`}
                >
                  {expirations.summary.expired > 0
                    ? t("expirationBannerExpired", { count: expirations.summary.expired })
                    : t("expirationBannerExpiringSoon", {
                        count: expirations.summary.expiringSoon,
                      })}
                </h3>
                <p className="text-sm mt-1 opacity-80 text-text-main">
                  {expirations.summary.expired > 0
                    ? t("expirationBannerExpiredDesc")
                    : t("expirationBannerExpiringSoonDesc")}
                </p>
              </div>
            </div>
          )}

        {isCompactProviderDisplay ? (
          compactProviderEntries.length > 0 ? (
            <div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3"
              data-testid="provider-compact-grid"
            >
              {compactProviderEntries.map((entry) => (
                <HighlightableProviderCard
                  key={`compact-${entry.providerId}`}
                  providerId={entry.providerId}
                  provider={entry.provider}
                  stats={entry.stats}
                  authType={getCompactProviderAuthType(entry, showFreeOnly)}
                  onToggle={(active) =>
                    handleToggleProvider(entry.providerId, entry.toggleAuthType, active)
                  }
                />
              ))}
            </div>
          ) : (
            <KitEmptyState
              compact
              data-testid="provider-compact-empty"
              icon={<Icon name="search_off" size={18} />}
              title={providerText(t, "noProvidersMatch", "No providers match your search.")}
            />
          )
        ) : (
          <>
            {/* API Key Compatible Providers — dynamic (OpenAI/Anthropic compatible) */}
            {showSection("compatible") && (
              <div className="flex flex-col gap-4">
                <SectionHeader
                  title={
                    <span className="flex items-center gap-2">
                      {t("compatibleProviders")}{" "}
                      <CategoryDot category="compatible" size="md" label={t("compatibleLabel")} />
                      <ProviderCountBadge {...countConfigured(compatibleProviderEntriesAll)} />
                    </span>
                  }
                  description={t("compatibleProvidersDesc")}
                  actions={
                    <div className="flex flex-wrap gap-2">
                      {(compatibleProviders.length > 0 ||
                        anthropicCompatibleProviders.length > 0 ||
                        ccCompatibleProviders.length > 0) && (
                        <Button
                          size="sm"
                          variant="outline"
                          icon="play_arrow"
                          loading={testingMode === "compatible"}
                          onClick={() => handleBatchTest("compatible")}
                          disabled={!!testingMode}
                          title={t("testAllCompatible")}
                        >
                          {testingMode === "compatible" ? t("testing") : t("testAll")}
                        </Button>
                      )}
                      {ccCompatibleProviderEnabled && (
                        <Button
                          size="sm"
                          icon="add"
                          onClick={() => setShowAddCcCompatibleModal(true)}
                        >
                          {addCcCompatibleLabel}
                        </Button>
                      )}
                      <Button
                        size="sm"
                        icon="add"
                        onClick={() => setShowAddAnthropicCompatibleModal(true)}
                      >
                        {t("addAnthropicCompatible")}
                      </Button>
                      <Button size="sm" icon="add" onClick={() => setShowAddCompatibleModal(true)}>
                        {t("addOpenAICompatible")}
                      </Button>
                    </div>
                  }
                />
                {compatibleProviders.length === 0 &&
                anthropicCompatibleProviders.length === 0 &&
                ccCompatibleProviders.length === 0 ? (
                  <KitEmptyState
                    compact
                    icon={<Icon name="extension" size={18} />}
                    title={t("noCompatibleYet")}
                  />
                ) : (
                  <ProviderCardGrid>
                    {compatibleProviderEntries.map(
                      ({ providerId, provider, stats, displayAuthType, toggleAuthType }) => (
                        <HighlightableProviderCard
                          key={providerId}
                          providerId={providerId}
                          provider={provider}
                          stats={stats}
                          authType={displayAuthType}
                          onToggle={(active) =>
                            handleToggleProvider(providerId, toggleAuthType, active)
                          }
                        />
                      )
                    )}
                  </ProviderCardGrid>
                )}
              </div>
            )}

            {/* OAuth Providers (including providers that expose free tiers via OAuth) */}
            {showSection("oauth") && (
              <div className="flex flex-col gap-4">
                <SectionHeader
                  title={
                    <span className="flex items-center gap-2">
                      {t("oauthProviders")}{" "}
                      <CategoryDot category="oauth" size="md" label={t("oauthLabel")} />
                      <ProviderCountBadge
                        {...countConfigured(
                          oauthProviderEntriesAll.filter((e) => !IDE_PROVIDER_IDS.has(e.providerId))
                        )}
                      />
                    </span>
                  }
                  description={t("oauthProvidersDesc")}
                  actions={
                    <div className="flex items-center gap-2">
                      {oauthEnvRepairStatus?.available && oauthEnvRepairStatus.missingCount > 0 && (
                        <Button
                          size="sm"
                          variant="outline"
                          icon="settings_backup_restore"
                          loading={repairingEnv}
                          onClick={handleRepairEnv}
                          disabled={repairingEnv}
                          title={t("repairEnvHint")}
                          aria-label={t("repairEnv")}
                        >
                          {repairingEnv ? t("repairEnvWorking") : t("repairEnv")}
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        icon="play_arrow"
                        loading={testingMode === "oauth"}
                        onClick={() => handleBatchTest("oauth")}
                        disabled={!!testingMode}
                        title={t("testAllOAuth")}
                        aria-label={t("testAllOAuth")}
                      >
                        {testingMode === "oauth" ? t("testing") : t("testAll")}
                      </Button>
                    </div>
                  }
                />
                <ProviderCardGrid>
                  {oauthProviderEntries
                    .filter((e) => !IDE_PROVIDER_IDS.has(e.providerId))
                    .map(({ providerId, provider, stats, displayAuthType, toggleAuthType }) => (
                      <HighlightableProviderCard
                        key={providerId}
                        providerId={providerId}
                        provider={provider}
                        stats={stats}
                        authType={displayAuthType}
                        onToggle={(active) =>
                          handleToggleProvider(providerId, toggleAuthType, active)
                        }
                      />
                    ))}
                </ProviderCardGrid>
              </div>
            )}

            {/* IDE Providers (Cursor, Zed, Trae) — editors with built-in AI subscription */}
            {showSection("ide") && (
              <div className="flex flex-col gap-4">
                <SectionHeader
                  title={
                    <span className="flex items-center gap-2">
                      {t("ideProviders") || "IDE Providers"}{" "}
                      <CategoryDot
                        category="ide"
                        size="md"
                        label={t("ideProviders") || "IDE Providers"}
                      />
                      <ProviderCountBadge {...countConfigured(ideProviderEntriesAll)} />
                    </span>
                  }
                  description={
                    t("ideProvidersDesc") ||
                    "Editors with built-in AI subscription. Use the provider page to import credentials directly from the IDE's keychain."
                  }
                  actions={
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        icon="play_arrow"
                        loading={testingMode === "ide"}
                        onClick={() => handleBatchTest("ide")}
                        disabled={!!testingMode}
                        title={t("testAll")}
                        aria-label={t("testAll")}
                      >
                        {testingMode === "ide" ? t("testing") : t("testAll")}
                      </Button>
                    </>
                  }
                />
                {ideProviderEntries.length === 0 ? (
                  <KitEmptyState
                    compact
                    title={t("noIdeProviders") || "No IDE providers match the current filters."}
                  />
                ) : (
                  <ProviderCardGrid>
                    {ideProviderEntries.map(
                      ({ providerId, provider, stats, displayAuthType, toggleAuthType }) => (
                        <HighlightableProviderCard
                          key={`ide-${providerId}`}
                          providerId={providerId}
                          provider={provider}
                          stats={stats}
                          authType={displayAuthType}
                          onToggle={(active) =>
                            handleToggleProvider(providerId, toggleAuthType, active)
                          }
                        />
                      )
                    )}
                  </ProviderCardGrid>
                )}
              </div>
            )}

            {/* Web / Cookie Providers */}
            {showSection("web") && webCookieProviderEntries.length > 0 && (
              <div className="flex flex-col gap-4">
                <SectionHeader
                  title={
                    <span className="flex items-center gap-2">
                      {t("webCookieProviders")}{" "}
                      <CategoryDot
                        category="web-cookie"
                        size="md"
                        label={t("webCookieProviders")}
                      />
                      <ProviderCountBadge {...countConfigured(webCookieProviderEntriesAll)} />
                    </span>
                  }
                  description={t("webCookieProvidersDesc")}
                  actions={
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        icon="play_arrow"
                        loading={testingMode === "web-cookie"}
                        onClick={() => handleBatchTest("web-cookie")}
                        disabled={!!testingMode}
                        title={t("testAll")}
                      >
                        {testingMode === "web-cookie" ? t("testing") : t("testAll")}
                      </Button>
                    </>
                  }
                />
                <ProviderCardGrid>
                  {webCookieProviderEntries.map(
                    ({ providerId, provider, stats, toggleAuthType }) => (
                      <HighlightableProviderCard
                        key={providerId}
                        providerId={providerId}
                        provider={provider}
                        stats={stats}
                        authType="web-cookie"
                        onToggle={(active) =>
                          handleToggleProvider(providerId, toggleAuthType, active)
                        }
                      />
                    )
                  )}
                </ProviderCardGrid>
              </div>
            )}

            {/* Free Tier Providers */}
            {showSection("free") && freeSectionEntries.length > 0 && (
              <div className="flex flex-col gap-4">
                <SectionHeader
                  title={
                    <span className="flex items-center gap-2">
                      {t("freeTierProviders")}
                      <CategoryDot category="free" size="md" label={t("freeTierLabel")} />
                      <ProviderCountBadge {...countConfigured(freeSectionEntriesAll)} />
                    </span>
                  }
                  description={t("freeAggregated")}
                  actions={
                    <Button
                      size="sm"
                      variant="outline"
                      icon="play_arrow"
                      loading={testingMode === "free"}
                      onClick={() => handleBatchTest("free")}
                      disabled={!!testingMode}
                      title={t("testAll")}
                    >
                      {testingMode === "free" ? t("testing") : t("testAll")}
                    </Button>
                  }
                />
                <ProviderCardGrid>
                  {freeSectionEntries.map(
                    ({ providerId, provider, stats, displayAuthType, toggleAuthType }) => (
                      <HighlightableProviderCard
                        key={`free-section-${providerId}`}
                        providerId={providerId}
                        provider={provider}
                        stats={stats}
                        authType={toggleAuthType === "free" ? "free" : displayAuthType}
                        onToggle={(active) =>
                          handleToggleProvider(providerId, toggleAuthType, active)
                        }
                      />
                    )
                  )}
                </ProviderCardGrid>
              </div>
            )}

            {/* API Key Providers — fixed list */}
            {showSection("apikey") && (
              <div className="flex flex-col gap-4">
                <SectionHeader
                  title={
                    <span className="flex items-center gap-2">
                      {t("apiKeyProviders")}{" "}
                      <CategoryDot category="apikey" size="md" label={t("apiKeyLabel")} />
                      <ProviderCountBadge {...countConfigured(apiKeyProviderEntriesAll)} />
                    </span>
                  }
                  description={t("apiKeyProvidersDesc")}
                  actions={
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        icon="play_arrow"
                        loading={testingMode === "apikey"}
                        onClick={() => handleBatchTest("apikey")}
                        disabled={!!testingMode}
                        title={t("testAllApiKey")}
                        aria-label={t("testAllApiKey")}
                      >
                        {testingMode === "apikey" ? t("testing") : t("testAll")}
                      </Button>
                    </>
                  }
                />
                {llmProviderEntries.length > 0 && (
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                      {t("llmProviders")}
                    </h3>
                    <ProviderCardGrid>
                      {llmProviderEntries.map(
                        ({ providerId, provider, stats, displayAuthType, toggleAuthType }) => (
                          <HighlightableProviderCard
                            key={providerId}
                            providerId={providerId}
                            provider={provider}
                            stats={stats}
                            authType={displayAuthType}
                            onToggle={(active) =>
                              handleToggleProvider(providerId, toggleAuthType, active)
                            }
                          />
                        )
                      )}
                    </ProviderCardGrid>
                  </div>
                )}
              </div>
            )}

            {/* No Auth Providers */}
            {showSection("noauth") &&
              !showFreeOnly &&
              (noAuthEntriesAll.length > 0 || blockedNoAuthEntries.length > 0) && (
                <NoAuthProvidersSection
                  visibleEntries={noAuthEntries}
                  count={countConfigured(noAuthEntriesAll)}
                  blockedEntries={blockedNoAuthEntries}
                  blockedProviders={blockedProviders}
                  onBlockedChange={setBlockedProviders}
                  onError={(msg) => notify.error(msg)}
                  testingMode={testingMode}
                  onBatchTest={handleBatchTest}
                  onToggleProvider={handleToggleProvider}
                />
              )}

            {/* Upstream Proxy Providers */}
            {showSection("proxy") && upstreamProxyEntries.length > 0 && (
              <div className="flex flex-col gap-4">
                <SectionHeader
                  title={
                    <span className="flex items-center gap-2">
                      {t("upstreamProxyProviders")}{" "}
                      <CategoryDot
                        category="upstream-proxy"
                        size="md"
                        label={t("upstreamProxyProviders")}
                      />
                      <ProviderCountBadge {...countConfigured(upstreamProxyEntriesAll)} />
                    </span>
                  }
                  description={t("upstreamProxyProvidersDesc")}
                  actions={
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        icon="play_arrow"
                        loading={testingMode === "upstream-proxy"}
                        onClick={() => handleBatchTest("upstream-proxy")}
                        disabled={!!testingMode}
                        title={t("testAll")}
                      >
                        {testingMode === "upstream-proxy" ? t("testing") : t("testAll")}
                      </Button>
                    </>
                  }
                />
                <ProviderCardGrid>
                  {upstreamProxyEntries.map(({ providerId, provider, stats, toggleAuthType }) => (
                    <HighlightableProviderCard
                      key={providerId}
                      providerId={providerId}
                      provider={provider}
                      stats={stats}
                      authType="upstream-proxy"
                      onToggle={(active) =>
                        handleToggleProvider(providerId, toggleAuthType, active)
                      }
                    />
                  ))}
                </ProviderCardGrid>
              </div>
            )}

            {/* Web Fetch Providers */}
            {showSection("webfetch") && visibleWebFetchEntries.length > 0 && (
              <div className="flex flex-col gap-4">
                <SectionHeader
                  title={
                    <span className="flex items-center gap-2">
                      {t("webFetchProvidersHeading")}{" "}
                      <CategoryDot category="webfetch" size="md" label={t("webFetchTooltip")} />
                      <ProviderCountBadge {...countConfigured(webFetchEntriesAll)} />
                    </span>
                  }
                  description={t("webFetchProvidersDesc")}
                />
                <ProviderCardGrid>
                  {visibleWebFetchEntries.map(
                    ({ providerId, provider, stats, displayAuthType, toggleAuthType }) => (
                      <HighlightableProviderCard
                        key={`webfetch-${providerId}`}
                        providerId={providerId}
                        provider={provider}
                        stats={stats}
                        authType={displayAuthType}
                        onToggle={(active) =>
                          handleToggleProvider(providerId, toggleAuthType, active)
                        }
                      />
                    )
                  )}
                </ProviderCardGrid>
              </div>
            )}

            {/* Aggregators Gateways */}
            {showSection("apikey") && aggregatorProviderEntries.length > 0 && (
              <div className="flex flex-col gap-4">
                <SectionHeader
                  title={
                    <span className="flex items-center gap-2">
                      {t("aggregatorsGateways")}{" "}
                      <CategoryDot category="apikey" size="md" label={t("aggregatorsGateways")} />
                      <ProviderCountBadge {...countConfigured(aggregatorProviderEntriesAll)} />
                    </span>
                  }
                  description={t("aggregatorsGatewaysDesc")}
                />
                <ProviderCardGrid>
                  {aggregatorProviderEntries.map(
                    ({ providerId, provider, stats, displayAuthType, toggleAuthType }) => (
                      <HighlightableProviderCard
                        key={providerId}
                        providerId={providerId}
                        provider={provider}
                        stats={stats}
                        authType={displayAuthType}
                        onToggle={(active) =>
                          handleToggleProvider(providerId, toggleAuthType, active)
                        }
                      />
                    )
                  )}
                </ProviderCardGrid>
              </div>
            )}

            {/* Enterprise & Cloud */}
            {showSection("apikey") && enterpriseProviderEntries.length > 0 && (
              <div className="flex flex-col gap-4">
                <SectionHeader
                  title={
                    <span className="flex items-center gap-2">
                      {t("enterpriseCloud")}{" "}
                      <CategoryDot category="apikey" size="md" label={t("enterpriseCloud")} />
                      <ProviderCountBadge {...countConfigured(enterpriseProviderEntriesAll)} />
                    </span>
                  }
                  description={t("enterpriseCloudDesc")}
                />
                <ProviderCardGrid>
                  {enterpriseProviderEntries.map(
                    ({ providerId, provider, stats, displayAuthType, toggleAuthType }) => (
                      <HighlightableProviderCard
                        key={providerId}
                        providerId={providerId}
                        provider={provider}
                        stats={stats}
                        authType={displayAuthType}
                        onToggle={(active) =>
                          handleToggleProvider(providerId, toggleAuthType, active)
                        }
                      />
                    )
                  )}
                </ProviderCardGrid>
              </div>
            )}

            {/* Cloud Agent Providers */}
            {showSection("cloud") && cloudAgentProviderEntries.length > 0 && (
              <div className="flex flex-col gap-4">
                <SectionHeader
                  title={
                    <span className="flex items-center gap-2">
                      {t("cloudAgentProviders")}{" "}
                      <CategoryDot
                        category="cloud-agent"
                        size="md"
                        label={t("cloudAgentProviders")}
                      />
                      <ProviderCountBadge {...countConfigured(cloudAgentProviderEntriesAll)} />
                    </span>
                  }
                  description={t("cloudAgentProvidersDesc")}
                  actions={
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        icon="play_arrow"
                        loading={testingMode === "cloud-agent"}
                        onClick={() => handleBatchTest("cloud-agent")}
                        disabled={!!testingMode}
                        title={t("testAll")}
                      >
                        {testingMode === "cloud-agent" ? t("testing") : t("testAll")}
                      </Button>
                    </>
                  }
                />
                <ProviderCardGrid>
                  {cloudAgentProviderEntries.map(
                    ({ providerId, provider, stats, toggleAuthType }) => (
                      <HighlightableProviderCard
                        key={providerId}
                        providerId={providerId}
                        provider={provider}
                        stats={stats}
                        authType="cloud-agent"
                        onToggle={(active) =>
                          handleToggleProvider(providerId, toggleAuthType, active)
                        }
                      />
                    )
                  )}
                </ProviderCardGrid>
              </div>
            )}

            {/* Local / Self-Hosted Providers */}
            {showSection("local") && localProviderEntries.length > 0 && (
              <div className="flex flex-col gap-4">
                <SectionHeader
                  title={
                    <span className="flex items-center gap-2">
                      {t("localProviders")}{" "}
                      <CategoryDot category="local" size="md" label={t("localProviders")} />
                      <ProviderCountBadge {...countConfigured(localProviderEntriesAll)} />
                    </span>
                  }
                  description={t("localProvidersDesc")}
                  actions={
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        icon="play_arrow"
                        loading={testingMode === "local"}
                        onClick={() => handleBatchTest("local")}
                        disabled={!!testingMode}
                        title={t("testAll")}
                      >
                        {testingMode === "local" ? t("testing") : t("testAll")}
                      </Button>
                    </>
                  }
                />
                <ProviderCardGrid>
                  {localProviderEntries.map(({ providerId, provider, stats, toggleAuthType }) => (
                    <HighlightableProviderCard
                      key={providerId}
                      providerId={providerId}
                      provider={provider}
                      stats={stats}
                      authType="local"
                      onToggle={(active) =>
                        handleToggleProvider(providerId, toggleAuthType, active)
                      }
                    />
                  ))}
                </ProviderCardGrid>
              </div>
            )}

            {/* Search Providers */}
            {showSection("search") && searchProviderEntries.length > 0 && (
              <div className="flex flex-col gap-4">
                <SectionHeader
                  title={
                    <span className="flex items-center gap-2">
                      {t("searchProvidersHeading")}{" "}
                      <CategoryDot
                        category="search"
                        size="md"
                        label={t("searchProvidersHeading")}
                      />
                      <ProviderCountBadge {...countConfigured(searchProviderEntriesAll)} />
                    </span>
                  }
                  description={t("searchProvidersDesc")}
                  actions={
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        icon="play_arrow"
                        loading={testingMode === "search"}
                        onClick={() => handleBatchTest("search")}
                        disabled={!!testingMode}
                        title={t("testAll")}
                      >
                        {testingMode === "search" ? t("testing") : t("testAll")}
                      </Button>
                    </>
                  }
                />
                <ProviderCardGrid>
                  {searchProviderEntries.map(({ providerId, provider, stats, toggleAuthType }) => (
                    <HighlightableProviderCard
                      key={providerId}
                      providerId={providerId}
                      provider={provider}
                      stats={stats}
                      authType="search"
                      onToggle={(active) =>
                        handleToggleProvider(providerId, toggleAuthType, active)
                      }
                    />
                  ))}
                </ProviderCardGrid>
              </div>
            )}

            {/* Embeddings & Rerank */}
            {showSection("apikey") && embeddingRerankProviderEntries.length > 0 && (
              <div className="flex flex-col gap-4">
                <SectionHeader
                  title={
                    <span className="flex items-center gap-2">
                      {t("embeddingRerankProviders")}{" "}
                      <CategoryDot
                        category="apikey"
                        size="md"
                        label={t("embeddingRerankProviders")}
                      />
                      <ProviderCountBadge {...countConfigured(embeddingRerankProviderEntriesAll)} />
                    </span>
                  }
                  description={t("embeddingRerankProvidersDesc")}
                />
                <ProviderCardGrid>
                  {embeddingRerankProviderEntries.map(
                    ({ providerId, provider, stats, displayAuthType, toggleAuthType }) => (
                      <HighlightableProviderCard
                        key={providerId}
                        providerId={providerId}
                        provider={provider}
                        stats={stats}
                        authType={displayAuthType}
                        onToggle={(active) =>
                          handleToggleProvider(providerId, toggleAuthType, active)
                        }
                      />
                    )
                  )}
                </ProviderCardGrid>
              </div>
            )}

            {/* Image Providers */}
            {showSection("apikey") && imageProviderEntries.length > 0 && (
              <div className="flex flex-col gap-4">
                <SectionHeader
                  title={
                    <span className="flex items-center gap-2">
                      {t("imageProviders")}{" "}
                      <CategoryDot category="apikey" size="md" label={t("imageProviders")} />
                      <ProviderCountBadge {...countConfigured(imageProviderEntriesAll)} />
                    </span>
                  }
                  description={t("imageProvidersDesc")}
                />
                <ProviderCardGrid>
                  {imageProviderEntries.map(
                    ({ providerId, provider, stats, displayAuthType, toggleAuthType }) => (
                      <HighlightableProviderCard
                        key={providerId}
                        providerId={providerId}
                        provider={provider}
                        stats={stats}
                        authType={displayAuthType}
                        onToggle={(active) =>
                          handleToggleProvider(providerId, toggleAuthType, active)
                        }
                      />
                    )
                  )}
                </ProviderCardGrid>
              </div>
            )}

            {/* Audio Only Providers */}
            {showSection("audio") && audioProviderEntries.length > 0 && (
              <div className="flex flex-col gap-4">
                <SectionHeader
                  title={
                    <span className="flex items-center gap-2">
                      {t("audioProvidersHeading")}{" "}
                      <CategoryDot category="audio" size="md" label={t("audioProvidersHeading")} />
                      <ProviderCountBadge {...countConfigured(audioProviderEntriesAll)} />
                    </span>
                  }
                  description={t("audioProvidersDesc")}
                  actions={
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        icon="play_arrow"
                        loading={testingMode === "audio"}
                        onClick={() => handleBatchTest("audio")}
                        disabled={!!testingMode}
                        title={t("testAll")}
                      >
                        {testingMode === "audio" ? t("testing") : t("testAll")}
                      </Button>
                    </>
                  }
                />
                <ProviderCardGrid>
                  {audioProviderEntries.map(({ providerId, provider, stats, toggleAuthType }) => (
                    <HighlightableProviderCard
                      key={providerId}
                      providerId={providerId}
                      provider={provider}
                      stats={stats}
                      authType="audio"
                      onToggle={(active) =>
                        handleToggleProvider(providerId, toggleAuthType, active)
                      }
                    />
                  ))}
                </ProviderCardGrid>
              </div>
            )}

            {/* Video Generation */}
            {showSection("apikey") && videoProviderEntries.length > 0 && (
              <div className="flex flex-col gap-4">
                <SectionHeader
                  title={
                    <span className="flex items-center gap-2">
                      {t("videoProviders")}{" "}
                      <CategoryDot category="apikey" size="md" label={t("videoProviders")} />
                      <ProviderCountBadge {...countConfigured(videoProviderEntriesAll)} />
                    </span>
                  }
                  description={t("videoProvidersDesc")}
                />
                <ProviderCardGrid>
                  {videoProviderEntries.map(
                    ({ providerId, provider, stats, displayAuthType, toggleAuthType }) => (
                      <HighlightableProviderCard
                        key={providerId}
                        providerId={providerId}
                        provider={provider}
                        stats={stats}
                        authType={displayAuthType}
                        onToggle={(active) =>
                          handleToggleProvider(providerId, toggleAuthType, active)
                        }
                      />
                    )
                  )}
                </ProviderCardGrid>
              </div>
            )}
          </>
        )}

        <AddCompatibleProviderModal
          isOpen={showAddCompatibleModal}
          mode="openai"
          onClose={() => setShowAddCompatibleModal(false)}
          onCreated={(node) => {
            setProviderNodes((prev) => upsertProviderNodeById(prev, node));
            setShowAddCompatibleModal(false);
            router.push(`/dashboard/providers/${node.id}`);
          }}
        />
        <AddCompatibleProviderModal
          isOpen={showAddAnthropicCompatibleModal}
          mode="anthropic"
          onClose={() => setShowAddAnthropicCompatibleModal(false)}
          onCreated={(node) => {
            setProviderNodes((prev) => upsertProviderNodeById(prev, node));
            setShowAddAnthropicCompatibleModal(false);
            router.push(`/dashboard/providers/${node.id}`);
          }}
        />
        {ccCompatibleProviderEnabled && (
          <AddCompatibleProviderModal
            isOpen={showAddCcCompatibleModal}
            mode="cc"
            title={addCcCompatibleLabel}
            onClose={() => setShowAddCcCompatibleModal(false)}
            onCreated={(node) => {
              setProviderNodes((prev) => upsertProviderNodeById(prev, node));
              setShowAddCcCompatibleModal(false);
              router.push(`/dashboard/providers/${node.id}`);
            }}
          />
        )}
        <ImportProvidersFromFileModal
          isOpen={showImportFromFileModal}
          onClose={() => setShowImportFromFileModal(false)}
          onImported={async () => setConnections((await loadProviderPageData()).connections)}
        />
        {/* Test Results Modal */}
        <Modal
          isOpen={!!testResults}
          onClose={() => setTestResults(null)}
          title={t("testResults")}
          size="xl"
          {...TALL_MODAL_PROPS}
        >
          {testResults && <ProviderTestResultsView results={testResults} />}
        </Modal>
      </div>
    </OpenRouterProviderStatsProvider>
  );
}

export default function ProvidersPage() {
  return (
    <Suspense fallback={null}>
      <ProvidersPageContent />
    </Suspense>
  );
}

// ─── Provider Test Results View (mirrors combo TestResultsView) ──────────────

function ProviderTestResultsView({ results }: { results: ProviderBatchTestResults }) {
  const t = useTranslations("providers");
  const tc = useTranslations("common");
  const emailsVisible = useEmailPrivacyStore((s) => s.emailsVisible);

  // Guard: never crash on malformed/null results (would trigger error boundary)
  if (!results || typeof results !== "object") {
    return null;
  }

  if (results.error && (!results.results || results.results.length === 0)) {
    return (
      <div className="text-center py-6">
        <Icon name="error" size={32} className="text-error mb-2 block" />
        <p className="text-sm text-error">
          {typeof results.error === "object"
            ? results.error?.message || JSON.stringify(results.error)
            : String(results.error)}
        </p>
      </div>
    );
  }

  const summary = results.summary ?? null;
  const mode = results.mode ?? "";
  const items = Array.isArray(results.results) ? results.results : [];

  const modeLabel =
    {
      oauth: t("oauthLabel"),
      free: tc("free"),
      apikey: t("apiKeyLabel"),
      compatible: t("compatibleLabel"),
      provider: t("providerLabel"),
      all: tc("all"),
    }[mode] || mode;

  return (
    <div className="flex flex-col gap-3">
      {/* Summary header */}
      {summary && (
        <div className="flex items-center gap-3 text-xs mb-1">
          <span className="text-text-muted">{t("modeTest", { mode: modeLabel })}</span>
          <Badge variant="success" size="sm">
            {t("passedCount", { count: summary.passed })}
          </Badge>
          {summary.failed > 0 && (
            <Badge variant="error" size="sm">
              {t("failedCount", { count: summary.failed })}
            </Badge>
          )}
          <span className="text-text-muted ml-auto">
            {t("testedCount", { count: summary.total })}
          </span>
        </div>
      )}

      {/* Individual results */}
      {items.map((r, i) => (
        <div
          key={r.connectionId || i}
          className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg bg-bg-subtle"
        >
          <Icon
            name={r.valid ? "check_circle" : "error"}
            size={16}
            className={r.valid ? "text-success" : "text-error"}
          />
          <div className="flex-1 min-w-0">
            <span className="font-medium">
              {pickDisplayValue([r.connectionName], emailsVisible, r.connectionName)}
            </span>
            <span className="text-text-muted ml-1.5">({r.provider})</span>
          </div>
          {r.latencyMs !== undefined && (
            <span className="text-text-muted font-mono tabular-nums">
              {t("millisecondsAbbr", { value: r.latencyMs })}
            </span>
          )}
          <Badge variant={r.valid ? "success" : "error"} size="sm" className="uppercase">
            {r.valid ? t("okShort") : r.diagnosis?.type || t("errorShort")}
          </Badge>
        </div>
      ))}

      {items.length === 0 && (
        <div className="text-center py-4 text-text-muted text-sm">
          {t("noActiveConnectionsInGroup")}
        </div>
      )}
    </div>
  );
}
