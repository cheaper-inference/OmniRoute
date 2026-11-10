"use client";

import Icon from "@/shared/components/Icon";
import { useState, useEffect, useMemo, useCallback, useRef, useId } from "react";
import Link from "next/link";
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
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import Input from "@/shared/components/Input";
import { CardSkeleton, Spinner } from "@/shared/components/Loading";
import Modal from "@/shared/components/Modal";
import Select from "@/shared/components/Select";
import Toggle from "@/shared/components/Toggle";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";
import { useConfirmDialog } from "@/shared/hooks/useConfirmDialog";
import { useLocale, useTranslations } from "next-intl";
import { matchesSearch } from "@/shared/utils/turkishText";
import ApiKeyFilterBar from "./components/ApiKeyFilterBar";
import KeyPolicySixTabEditor from "./components/KeyPolicySixTabEditor";
import SaveKeyAsTemplateModal from "./components/SaveKeyAsTemplateModal";
import KeyTemplatesLibrarySection from "./components/KeyTemplatesLibrarySection";
import { summarizeKeyTemplatePolicy, type KeyTemplate } from "./keyTemplatePolicyUtils";
import {
  isKeyActive,
  isExpired,
  isRestricted as isKeyRestricted,
  computeApiKeyCounts,
  formatProviderModelPermissionSummary,
  formatUsdCost,
  restoreProviderScopeSelection,
  toggleKeyVisibility,
} from "./apiManagerPageUtils";
import type { KeyStatus, KeyType } from "./apiManagerPageUtils";
import { readActiveOnlyPreference, writeActiveOnlyPreference } from "./apiManagerPageStorage";
import { extractApiErrorMessage } from "@/shared/http/apiErrorMessage";
import { hasProviderQuotaBypassScope } from "@/shared/constants/apiKeyPolicyScopes";
import RoutingEntryLink from "@/shared/components/routing/RoutingEntryLink";
import { ALL_COMBOS_ACCESS_RULE } from "@/shared/constants/comboAccess";

import { useCreateKeySubmission } from "./useCreateKeySubmission";
import { useKeyTemplateCreation } from "./useKeyTemplateCreation";

const MAX_KEY_NAME_LENGTH = 200;

interface AccessSchedule {
  enabled: boolean;
  from: string;
  until: string;
  days: number[];
  tz: string;
}

type StreamDefaultMode = "legacy" | "json";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  allowedModels: string[] | null;
  /** Public shape: "all" | "restricted". Absent on legacy keys. */
  modelAccessMode?: "all" | "restricted" | null;
  blockedModels?: string[] | null;
  allowedCombos: string[] | null;
  allowedConnections: string[] | null;
  noLog?: boolean;
  autoResolve?: boolean;
  isActive?: boolean;
  throttleDelayMs?: number | null;
  isBanned?: boolean;
  expiresAt?: string | null;
  maxSessions?: number;
  accessSchedule?: AccessSchedule | null;
  rateLimits?: Array<{ limit: number; window: number }> | null;
  scopes?: string[];
  allowedEndpoints?: string[];
  streamDefaultMode?: StreamDefaultMode;
  compressionEnabled?: boolean;
  allowAutoCombos?: boolean;
  allowCcDiscoveryAliases?: boolean;
  catalogScope?: string;
  disableNonPublicModels?: boolean;
  allowUsageCommand?: boolean;
  chaosModeEnabled?: boolean;
  usageLimitEnabled?: boolean;
  dailyUsageLimitUsd?: number | null;
  weeklyUsageLimitUsd?: number | null;
  allowedQuotas?: string[] | null;
  createdAt: string;
}

interface KeyUsageStats {
  totalRequests: number;
  totalCost: number;
  lastUsed: string | null;
}

export default function ApiManagerPageClient() {
  const t = useTranslations("apiManager");
  const tc = useTranslations("common");
  const locale = useLocale();
  const { requestConfirm, confirmDialog } = useConfirmDialog();
  const newKeyNameInputId = useId();
  const createKeyFormRef = useRef<HTMLDivElement | null>(null);
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [pageError, setPageError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usageStats, setUsageStats] = useState<Record<string, KeyUsageStats>>({});
  const [sessionCounts, setSessionCounts] = useState<Record<string, number>>({});
  const [deviceCounts, setDeviceCounts] = useState<Record<string, number>>({});
  const [allowKeyReveal, setAllowKeyReveal] = useState(false);
  // Per-row API key visibility toggle (eye / eye-off). Keys default to masked.
  // Map id -> fully revealed key string fetched on demand from /api/keys/{id}/reveal.
  const [revealedKeys, setRevealedKeys] = useState<Map<string, string>>(new Map());
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const createKeyNameFieldRef = useRef<HTMLDivElement | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeOnly, setActiveOnly] = useState(false);
  const [statusFilter, setStatusFilter] = useState<KeyStatus | null>(null);
  const [typeFilter, setTypeFilter] = useState<KeyType | null>(null);
  const [quotaPoolGroup, setQuotaPoolGroup] = useState<Record<string, string>>({});

  // Key Templates library + Save as Template + Create Key policy state
  const [saveTemplateSource, setSaveTemplateSource] = useState<ApiKey | null>(null);
  const templateCreation = useKeyTemplateCreation();
  const {
    templates,
    unreadableTemplates,
    templatesError,
    templatesLoading,
    fetchTemplates,
    selectedTemplateId,
    selectedTemplateRef,
    createKeyFormState,
    setCreateKeyFormState,
    createKeyRefIssues,
    loadingTemplatePolicy,
    handleEditorValidation,
    showFullPolicyEditor,
    setShowFullPolicyEditor,
    syncCreateKeyFormState,
    resetCreateKeyModalState,
    draftCreatePolicy,
    isCreatePolicyDirty,
    hasCreatePolicyErrors,
    hasBlockingCreateRefIssues,
    applyTemplateToCreateModal,
    handleSelectTemplateInCreateModal,
    newKeyName,
    setNewKeyName,
    newKeyManageEnabled,
    setNewKeyManageEnabled,
    newKeySelfUsageEnabled,
    setNewKeySelfUsageEnabled,
    newKeyAccountQuotaEnabled,
    setNewKeyAccountQuotaEnabled,
    newKeyAllowUsageCommand,
    setNewKeyAllowUsageCommand,
    nameError,
    setNameError,
    createError,
    setCreateError,
    templateConfirmDialog,
  } = templateCreation;

  const { copied, copy } = useCopyToClipboard();

  const scrollCreateKeyFormToTop = useCallback(() => {
    const scrollContainer = createKeyFormRef.current?.parentElement;
    if (scrollContainer instanceof HTMLElement) {
      scrollContainer.scrollTop = 0;
    }

    const input = document.getElementById(newKeyNameInputId);
    input?.scrollIntoView({ block: "nearest", inline: "nearest" });
    input?.focus({ preventScroll: true });
  }, [newKeyNameInputId]);

  useEffect(() => {
    if (!showAddModal || !nameError) return;
    requestAnimationFrame(() => {
      createKeyNameFieldRef.current?.scrollIntoView({ block: "center", behavior: "instant" });
    });
  }, [nameError, showAddModal]);

  useEffect(() => {
    // Hydrate the persisted preference after mount, behind an async boundary
    // (react-hooks/set-state-in-effect) — same post-hydration timing as before.
    void (async () => {
      await Promise.resolve();
      setActiveOnly(readActiveOnlyPreference());
    })();
  }, []);

  useEffect(() => {
    writeActiveOnlyPreference(activeOnly);
  }, [activeOnly]);

  useEffect(() => {
    let cancelled = false;
    const loadQuotaGroups = async () => {
      try {
        const [poolsRes, groupsRes] = await Promise.all([
          fetch("/api/quota/pools"),
          fetch("/api/quota/groups"),
        ]);
        if (!poolsRes.ok || !groupsRes.ok) return;
        const poolsData = await poolsRes.json();
        const groupsData = await groupsRes.json();
        const pools: Array<{ id: string; groupId: string }> = Array.isArray(poolsData.pools)
          ? poolsData.pools
          : [];
        const groups: Array<{ id: string; name: string }> = Array.isArray(groupsData.groups)
          ? groupsData.groups
          : [];
        const groupNameById: Record<string, string> = {};
        for (const g of groups) {
          groupNameById[g.id] = g.name;
        }
        const map: Record<string, string> = {};
        for (const p of pools) {
          if (groupNameById[p.groupId]) {
            map[p.id] = groupNameById[p.groupId];
          }
        }
        if (!cancelled) setQuotaPoolGroup(map);
      } catch {
        // fail open — quota group chips simply won't render
      }
    };
    loadQuotaGroups();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!showAddModal || !nameError) return;

    const timeout = window.setTimeout(() => {
      scrollCreateKeyFormToTop();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [showAddModal, nameError, scrollCreateKeyFormToTop]);

  const fetchUsageStats = async (apiKeys: ApiKey[]) => {
    if (apiKeys.length === 0) return;
    try {
      // view=apiKeys returns only per-key lifetime totals and last use, computed
      // server-side in one query; the full analytics report blocks the server for
      // seconds on large usage histories.
      const res = await fetch("/api/usage/analytics?range=all&view=apiKeys");
      const totals: Array<{
        apiKeyId: string;
        requests: number;
        cost: number;
        lastUsed: string | null;
      }> = res.ok ? (await res.json()).byApiKey || [] : [];
      const totalsById = new Map(totals.map((entry) => [entry.apiKeyId, entry]));
      const stats: Record<string, KeyUsageStats> = {};
      for (const key of apiKeys) {
        const entry = totalsById.get(key.id);
        const cost = Number(entry?.cost);
        stats[key.id] = {
          totalRequests: Number(entry?.requests) || 0,
          totalCost: Number.isFinite(cost) ? cost : 0,
          lastUsed: entry?.lastUsed || null,
        };
      }
      setUsageStats(stats);
    } catch (e) {
      console.log("Error fetching usage stats:", e);
    }
  };

  const fetchSessionCounts = async (apiKeys: ApiKey[]) => {
    if (apiKeys.length === 0) {
      setSessionCounts({});
      return;
    }
    try {
      const res = await fetch("/api/sessions");
      if (!res.ok) return;
      const data = await res.json();
      const byApiKeyRaw =
        data && typeof data.byApiKey === "object" && !Array.isArray(data.byApiKey)
          ? data.byApiKey
          : {};
      const normalized: Record<string, number> = {};
      for (const key of apiKeys) {
        const value = byApiKeyRaw[key.id];
        normalized[key.id] =
          typeof value === "number" && Number.isFinite(value) && value > 0 ? value : 0;
      }
      setSessionCounts(normalized);
    } catch (error) {
      console.log("Error fetching session counts:", error);
    }
  };

  // Per-key device/connection counts (port of upstream 9router#931, thanks
  // @mugnimaestra). One lightweight GET per key against
  // /api/keys/[id]/devices — device counts are in-memory + TTL-evicted, so
  // this is a much smaller payload than session data.
  const fetchDeviceCounts = async (apiKeys: ApiKey[]) => {
    if (apiKeys.length === 0) {
      setDeviceCounts({});
      return;
    }
    try {
      const results = await Promise.all(
        apiKeys.map(async (key) => {
          try {
            const res = await fetch(`/api/keys/${encodeURIComponent(key.id)}/devices`);
            if (!res.ok) return [key.id, 0] as const;
            const data = await res.json();
            const count =
              typeof data?.count === "number" && Number.isFinite(data.count) ? data.count : 0;
            return [key.id, count] as const;
          } catch {
            return [key.id, 0] as const;
          }
        })
      );
      setDeviceCounts(Object.fromEntries(results));
    } catch (error) {
      console.log("Error fetching device counts:", error);
    }
  };

  // fetchData calls the per-key fetchers and template list fetcher above — declared after
  // them so the calls are not TDZ reads (react-hooks/immutability).
  const fetchData = async () => {
    try {
      const res = await fetch("/api/keys");
      if (res.ok) {
        const data = await res.json();
        setKeys(data.keys || []);
        setAllowKeyReveal(data.allowKeyReveal === true);
        // Fetch usage stats after keys are loaded
        fetchUsageStats(data.keys || []);
        fetchSessionCounts(data.keys || []);
        fetchDeviceCounts(data.keys || []);
      }
      void fetchTemplates();
    } catch (error) {
      console.log("Error fetching keys:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial dashboard load — placed after the fetcher declarations so the effect does
  // not read them in their TDZ (react-hooks/immutability), behind an async boundary
  // (react-hooks/set-state-in-effect).
  useEffect(() => {
    void (async () => {
      await fetchData();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- initial dashboard load only
  }, []);

  const clearPageError = useCallback(() => setPageError(null), []);

  const handleUseTemplateFromLibrary = (tpl: KeyTemplate) => {
    resetCreateKeyModalState();
    clearPageError();
    setShowAddModal(true);
    void applyTemplateToCreateModal(tpl.id);
  };

  const keyCounts = useMemo(() => computeApiKeyCounts(keys), [keys]);

  const filteredKeys = useMemo(() => {
    let list = keys;

    // 1. activeOnly toggle (shortcut for the most common case)
    if (activeOnly) {
      list = list.filter(isKeyActive);
    }

    // 2. status chip filter
    if (statusFilter === "active") list = list.filter(isKeyActive);
    else if (statusFilter === "disabled") list = list.filter((k) => k.isActive === false);
    else if (statusFilter === "banned") list = list.filter((k) => k.isBanned === true);
    else if (statusFilter === "expired") list = list.filter(isExpired);

    // 3. type chip filter
    if (typeFilter === "manage") list = list.filter((k) => k.scopes?.includes("manage"));
    else if (typeFilter === "restricted") list = list.filter(isKeyRestricted);
    else if (typeFilter === "standard")
      list = list.filter((k) => !k.scopes?.includes("manage") && !isKeyRestricted(k));

    // 4. search query (case-insensitive substring on name and key)
    if (searchQuery.trim()) {
      list = list.filter(
        (k) => matchesSearch(k.name, searchQuery) || matchesSearch(k.key, searchQuery)
      );
    }

    return list;
  }, [keys, activeOnly, statusFilter, typeFilter, searchQuery]);

  const isFiltered =
    activeOnly || statusFilter !== null || typeFilter !== null || searchQuery.trim() !== "";

  const isQuotaKey = (k: ApiKey) => Array.isArray(k.allowedQuotas) && k.allowedQuotas.length > 0;

  const quotaKeys = filteredKeys.filter(isQuotaKey);
  const normalKeys = filteredKeys.filter((k) => !isQuotaKey(k));

  const quotaGroupsForKey = (k: ApiKey): string[] => {
    if (!Array.isArray(k.allowedQuotas)) return [];
    const seen = new Set<string>();
    const result: string[] = [];
    for (const poolId of k.allowedQuotas) {
      const groupName = quotaPoolGroup[poolId];
      if (groupName && !seen.has(groupName)) {
        seen.add(groupName);
        result.push(groupName);
      }
    }
    return result;
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setActiveOnly(false);
    setStatusFilter(null);
    setTypeFilter(null);
  };

  const handleCreateKey = useCreateKeySubmission(templateCreation, {
    isSubmitting,
    setIsSubmitting,
    focusName: scrollCreateKeyFormToTop,
    onCreated: async (key) => {
      setCreatedKey(key);
      await fetchData();
      resetCreateKeyModalState();
      setShowAddModal(false);
    },
  });

  const handleDeleteKey = async (id: string) => {
    if (!id || typeof id !== "string" || !/^[a-zA-Z0-9_-]+$/.test(id)) {
      setPageError(t("invalidKeyId"));
      return;
    }

    if (!(await requestConfirm({ message: t("deleteConfirm"), confirmText: tc("delete") }))) return;

    setIsSubmitting(true);
    clearPageError();

    try {
      const res = await fetch(`/api/keys/${encodeURIComponent(id)}`, { method: "DELETE" });
      if (res.ok) {
        setKeys((prev) => prev.filter((k) => k.id !== id));
        // Clean up any cached reveal/visibility state for this key.
        setRevealedKeys((prev) => {
          if (!prev.has(id)) return prev;
          const next = new Map(prev);
          next.delete(id);
          return next;
        });
        setVisibleKeys((prev) => (prev.has(id) ? toggleKeyVisibility(prev, id) : prev));
      } else {
        const data = await res.json();
        setPageError(extractApiErrorMessage(data, t("failedDeleteKey")));
      }
    } catch (error) {
      console.error("Error deleting key:", error);
      setPageError(t("failedDeleteKeyRetry"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegenerateKey = async (id: string) => {
    if (!id) return;
    if (!(await requestConfirm(t("regenerateConfirm")))) return;

    setIsSubmitting(true);
    clearPageError();

    try {
      const res = await fetch(`/api/keys/${encodeURIComponent(id)}/regenerate`, { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setCreatedKey(data.key);
        await fetchData();
      } else {
        setPageError(extractApiErrorMessage(data, t("failedRegenerateKey")));
      }
    } catch (error) {
      console.error("Error regenerating key:", error);
      setPageError(t("failedRegenerateKeyRetry"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyExistingKey = async (keyId: string) => {
    if (!keyId) return;

    try {
      const res = await fetch(`/api/keys/${encodeURIComponent(keyId)}/reveal`);
      if (!res.ok) {
        console.log("Error revealing key:", await res.text());
        return;
      }

      const data = await res.json();
      if (typeof data?.key === "string") {
        // Cache the revealed value so a subsequent show-toggle does not refetch.
        setRevealedKeys((prev) => {
          const next = new Map(prev);
          next.set(keyId, data.key);
          return next;
        });
        await copy(data.key, `existing_key_${keyId}`);
      }
    } catch (error) {
      console.log("Error copying existing key:", error);
    }
  };

  /**
   * Toggle the visibility of one key inline (eye / eye-off button).
   * Lazy-fetches the full key from /api/keys/{id}/reveal on the FIRST show,
   * then caches it in `revealedKeys` so re-toggling is instant. Hiding only
   * flips the visibility set — the cached reveal stays so a re-show is free.
   */
  const handleToggleKeyVisibility = async (keyId: string) => {
    if (!keyId) return;
    const isCurrentlyVisible = visibleKeys.has(keyId);

    if (!isCurrentlyVisible && !revealedKeys.has(keyId)) {
      try {
        const res = await fetch(`/api/keys/${encodeURIComponent(keyId)}/reveal`);
        if (!res.ok) {
          console.log("Error revealing key:", await res.text());
          return;
        }
        const data = await res.json();
        if (typeof data?.key !== "string") return;
        setRevealedKeys((prev) => {
          const next = new Map(prev);
          next.set(keyId, data.key);
          return next;
        });
      } catch (error) {
        console.log("Error revealing key:", error);
        return;
      }
    }

    setVisibleKeys((prev) => toggleKeyVisibility(prev, keyId));
  };

  if (loading) {
    // The skeleton cards are aria-hidden, so without this status wrapper the page
    // has no accessible content at all until /api/keys settles (#12066).
    return (
      <div className="flex flex-col gap-8" role="status" aria-live="polite" aria-busy="true">
        <span className="sr-only">{tc("loading")}</span>
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Error Banner */}
      {pageError && (
        <Alert
          variant="critical"
          icon={<Icon name="error" />}
          description={pageError}
          dismissLabel={tc("close")}
          onDismiss={clearPageError}
        />
      )}

      <div className="flex flex-col gap-3">
        <PageHeader
          compact
          title={t("keyManagement")}
          description={t("keyManagementDesc")}
          actions={
            <Button onClick={() => setShowAddModal(true)} icon="add" className="shrink-0">
              {t("createKey")}
            </Button>
          }
        />
        <div
          className="flex flex-wrap items-center gap-2 text-sm text-text-secondary"
          aria-label={t("requestFlowAria")}
        >
          <span className="rounded-control border border-border bg-surface px-3 py-1.5 font-medium">
            {t("requestFlowYourApp")}
          </span>
          <Icon name="arrow_forward" className="text-base text-text-muted" />
          <span className="rounded-control border border-border bg-surface px-3 py-1.5 font-medium">
            {t("requestFlowApiKey")}
          </span>
          <Icon name="arrow_forward" className="text-base text-text-muted" />
          <span className="rounded-control border border-border bg-surface px-3 py-1.5 font-medium">
            {t("requestFlowOmniRoute")}
          </span>
        </div>
      </div>

      <RoutingEntryLink />

      {/* Filter Bar — shown when there are keys */}
      {keys.length > 0 && (
        <ApiKeyFilterBar
          counts={keyCounts}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeOnly={activeOnly}
          onActiveOnlyChange={setActiveOnly}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
        />
      )}

      {/* Keys List Card */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-lg bg-warning/10 shrink-0">
              <Icon name="vpn_key" className="text-xl text-warning" />
            </div>
            <div>
              <h3 className="font-semibold">
                {t("registeredKeys")}
                {isFiltered && (
                  <span className="ml-1.5 text-sm font-normal text-text-muted">
                    ({t("shownOf", { shown: filteredKeys.length, total: keys.length })})
                  </span>
                )}
                {!isFiltered && (
                  <span className="ml-1.5 text-sm font-normal text-text-muted">
                    ({keys.length})
                  </span>
                )}
              </h3>
              <p className="text-xs text-text-muted">
                {keys.length === 1
                  ? t("keyRegistered", { count: keys.length })
                  : t("keysRegistered", { count: keys.length })}
              </p>
            </div>
          </div>
          <Button
            icon="add"
            onClick={() => {
              setNameError(null);
              setCreateError(null);
              clearPageError();
              setShowAddModal(true);
            }}
          >
            {t("createKey")}
          </Button>
        </div>

        <p className="text-sm text-text-muted mb-4">{t("keysSecurityNote")}</p>

        {keys.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-border rounded-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <Icon name="vpn_key" size={32} />
            </div>
            <p className="text-text-main font-medium mb-2">{t("noKeys")}</p>
            <p className="text-sm text-text-muted mb-4">{t("noKeysDesc")}</p>
            <Button
              icon="add"
              onClick={() => {
                setNameError(null);
                setCreateError(null);
                setShowAddModal(true);
              }}
            >
              {t("createFirstKey")}
            </Button>
          </div>
        ) : filteredKeys.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-border rounded-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <Icon name="search_off" size={32} />
            </div>
            <p className="text-text-main font-medium mb-2">{t("emptyFilterTitle")}</p>
            <Button onClick={handleClearFilters}>{t("emptyFilterClear")}</Button>
          </div>
        ) : (
          (() => {
            const renderKeyRow = (key: ApiKey) => {
              const stats = usageStats[key.id];
              const isRestricted = isKeyRestricted(key);
              const isModelRestricted =
                key.modelAccessMode === "restricted" ||
                (Array.isArray(key.allowedModels) && key.allowedModels.length > 0);
              const { providerWildcards, exactModels } = restoreProviderScopeSelection(
                Array.isArray(key.allowedModels) ? key.allowedModels : []
              );
              const providerCount = providerWildcards.length;
              const modelCount = exactModels.length;
              const hasComboRestrictions =
                Array.isArray(key.allowedCombos) &&
                !key.allowedCombos.includes(ALL_COMBOS_ACCESS_RULE);
              const hasConnectionRestrictions =
                Array.isArray(key.allowedConnections) && key.allowedConnections.length > 0;
              const hasExclusiveLeaseScope =
                Array.isArray(key.scopes) && key.scopes.includes("lease:exclusive");
              const noLogEnabled = key.noLog === true;
              const keyIsActive = key.isActive !== false; // default true
              const throttleDelayMs =
                typeof key.throttleDelayMs === "number" && key.throttleDelayMs > 0
                  ? key.throttleDelayMs
                  : 0;
              const hasThrottle = throttleDelayMs > 0;
              const hasManageScope = Array.isArray(key.scopes) && key.scopes.includes("manage");
              const hasProviderQuotaBypass = hasProviderQuotaBypassScope(key.scopes);
              const hasJsonStreamDefault = key.streamDefaultMode === "json";
              const hasLocalUsageCommand = key.allowUsageCommand === true;
              const maxSessions = typeof key.maxSessions === "number" ? key.maxSessions : 0;
              const hasSessionLimit = maxSessions > 0;
              const activeSessions = sessionCounts[key.id] || 0;
              const deviceCount = deviceCounts[key.id] || 0;
              const hasSchedule = key.accessSchedule?.enabled === true;
              const keyIsQuota = isQuotaKey(key);
              const groups = quotaGroupsForKey(key);
              const visibleGroups = groups.slice(0, 3);
              const extraGroupCount = groups.length - visibleGroups.length;
              return (
                <TableRow key={key.id} className="group">
                  <TableCell className="max-w-48">
                    <div className="flex items-center gap-2">
                      <Icon
                        name={isRestricted ? "lock" : "lock_open"}
                        size={14}
                        className={isRestricted ? "text-warning" : "text-success"}
                      />
                      <span className="text-sm font-medium truncate" title={key.name}>
                        {key.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-64">
                    <div className="flex items-center gap-1.5">
                      <code className="text-sm text-text-muted font-mono truncate">
                        {visibleKeys.has(key.id) ? (revealedKeys.get(key.id) ?? key.key) : key.key}
                      </code>
                      {allowKeyReveal ? (
                        <>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleToggleKeyVisibility(key.id)}
                            className="shrink-0 text-text-muted"
                            title={visibleKeys.has(key.id) ? t("hideKey") : t("showKey")}
                            aria-label={visibleKeys.has(key.id) ? t("hideKey") : t("showKey")}
                            aria-pressed={visibleKeys.has(key.id)}
                            icon={visibleKeys.has(key.id) ? "visibility_off" : "visibility"}
                          />
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleCopyExistingKey(key.id)}
                            className="shrink-0 text-text-muted"
                            title={tc("copy")}
                            aria-label={tc("copy")}
                            icon={copied === `existing_key_${key.id}` ? "check" : "content_copy"}
                          />
                        </>
                      ) : (
                        <span
                          className="p-1 text-text-muted/40 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all shrink-0 cursor-help"
                          title={t("keyOnlyAvailableAtCreation")}
                        >
                          <Icon name="lock" size={14} />
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col items-start gap-1">
                      {/* QUOTA differentiation chips — prepended before existing badges */}
                      {keyIsQuota && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-chart-3/10 text-chart-3 text-[11px] font-medium">
                          {t("quotaModeOnly")}
                        </span>
                      )}
                      {keyIsQuota &&
                        visibleGroups.map((groupName) => (
                          <span
                            key={groupName}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-info/10 text-info text-[11px] font-medium truncate max-w-full"
                          >
                            {groupName}
                          </span>
                        ))}
                      {keyIsQuota && extraGroupCount > 0 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-info/10 text-info text-[11px] font-medium">
                          +{extraGroupCount}
                        </span>
                      )}
                      {/* Existing badges */}
                      {isModelRestricted ? (
                        <Link
                          href={`/dashboard/api-manager/${encodeURIComponent(key.id)}/access?tab=models`}
                          className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-warning/10 text-warning text-xs font-medium hover:bg-warning/20 transition-colors"
                        >
                          <Icon name="lock" size={14} />
                          {formatProviderModelPermissionSummary(providerCount, modelCount, t, tc)}
                        </Link>
                      ) : (
                        <Link
                          href={`/dashboard/api-manager/${encodeURIComponent(key.id)}/access?tab=models`}
                          className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-success/10 text-success text-xs font-medium hover:bg-success/20 transition-colors"
                        >
                          <Icon name="lock_open" size={14} />
                          {t("allModels")}
                        </Link>
                      )}
                      {hasConnectionRestrictions && (
                        <Link
                          href={`/dashboard/api-manager/${encodeURIComponent(key.id)}/access?tab=connections`}
                          className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-info/10 text-info text-xs font-medium hover:bg-info/20 transition-colors"
                        >
                          <Icon name="cable" size={14} />
                          {key.allowedConnections!.length} conn
                        </Link>
                      )}
                      {hasExclusiveLeaseScope && (
                        <Link
                          href={`/dashboard/api-manager/${encodeURIComponent(key.id)}/access`}
                          className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-chart-3/10 text-chart-3 text-xs font-medium hover:bg-chart-3/20 transition-colors"
                        >
                          <Icon name="key_vertical" size={14} />
                          {t("exclusiveLease")}
                        </Link>
                      )}
                      {hasComboRestrictions && (
                        <Link
                          href={`/dashboard/api-manager/${encodeURIComponent(key.id)}/access?tab=combos`}
                          className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-chart-4/10 text-chart-4 text-xs font-medium hover:bg-chart-4/20 transition-colors"
                        >
                          <Icon name="hub" size={14} />
                          {key.allowedCombos!.length} combos
                        </Link>
                      )}
                      {noLogEnabled && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-chart-3/10 text-chart-3 text-[11px] font-medium">
                          <Icon name="visibility_off" size={12} />
                          No-Log
                        </span>
                      )}
                      {key.autoResolve && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-info/10 text-info text-[11px] font-medium">
                          <Icon name="auto_fix_high" size={12} />
                          Auto-Resolve
                        </span>
                      )}
                      {hasJsonStreamDefault && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-info/10 text-info text-[11px] font-medium">
                          <Icon name="data_object" size={12} />
                          {t("streamDefaultBadge")}
                        </span>
                      )}
                      {hasLocalUsageCommand && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-2 text-text-muted text-[11px] font-medium">
                          <Icon name="terminal" size={12} />
                          {t("localUsageCommandBadge")}
                        </span>
                      )}
                      {key.usageLimitEnabled === true && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-success/10 text-success text-[11px] font-medium">
                          <Icon name="paid" size={12} />
                          USD quota
                        </span>
                      )}
                      {hasProviderQuotaBypass && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-warning/10 text-warning text-[11px] font-medium">
                          <Icon name="alt_route" size={12} />
                          Bypass quota policy
                        </span>
                      )}
                      {hasSessionLimit && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-chart-3/10 text-chart-3 text-[11px] font-medium">
                          <Icon name="group" size={12} />
                          Sessions: {activeSessions}/{maxSessions}
                        </span>
                      )}
                      {deviceCount > 0 && (
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-info/10 text-info text-[11px] font-medium"
                          title={t("devicesTooltip", { count: deviceCount })}
                        >
                          <Icon name="devices" size={12} />
                          {t("devicesCount", { count: deviceCount })}
                        </span>
                      )}
                      {hasThrottle && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-warning/10 text-warning text-[11px] font-medium">
                          <Icon name="speed" size={12} />+{throttleDelayMs}ms
                        </span>
                      )}
                      {hasManageScope && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-error/10 text-error text-[11px] font-medium">
                          <Icon name="admin_panel_settings" size={12} />
                          manage
                        </span>
                      )}
                      {!keyIsActive && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-error/10 text-error text-[11px] font-medium">
                          <Icon name="block" size={12} />
                          {t("disabled")}
                        </span>
                      )}
                      {hasSchedule && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-warning/10 text-warning text-[11px] font-medium">
                          <Icon name="schedule" size={12} />
                          {t("scheduleActive")}
                        </span>
                      )}
                      {key.isBanned && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-error/10 text-error text-[11px] font-bold animate-pulse">
                          <Icon name="gavel" size={12} />
                          BANNED
                        </span>
                      )}
                      {key.expiresAt && new Date(key.expiresAt).getTime() < Date.now() && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-2 text-text-muted text-[11px] font-medium">
                          <Icon name="event_busy" size={12} />
                          EXPIRED
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col justify-center">
                      <span className="text-sm font-medium tabular-nums">
                        {stats?.totalRequests ?? 0}{" "}
                        <span className="text-text-muted font-normal text-xs">{t("reqs")}</span>
                      </span>
                      {(stats?.totalRequests ?? 0) > 0 && (
                        <span className="text-[10px] text-success tabular-nums">
                          {formatUsdCost(stats?.totalCost ?? 0, locale)}
                        </span>
                      )}
                      {stats?.lastUsed ? (
                        <span className="text-[10px] text-text-muted">
                          {t("lastUsedOn", { date: new Date(stats.lastUsed).toLocaleDateString() })}
                        </span>
                      ) : (
                        <span className="text-[10px] text-text-muted italic">{t("neverUsed")}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-text-muted whitespace-nowrap">
                    {new Date(key.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <a
                        href={`/dashboard/costs?range=all&apiKeyIds=${encodeURIComponent(key.id)}&groupBy=model`}
                        className="p-2 hover:bg-success/10 rounded text-text-muted hover:text-success opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all"
                        title={`View costs for ${key.name}`}
                        aria-label={`View costs for ${key.name}`}
                      >
                        <Icon name="payments" size={18} />
                      </a>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRegenerateKey(key.id)}
                        className="text-text-muted hover:text-warning opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
                        title={t("regenerateKey")}
                        aria-label={t("regenerateKey")}
                        icon="refresh"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        icon="playlist_add"
                        className="text-text-muted hover:text-primary opacity-100"
                        title={t("saveAsTemplate")}
                        aria-label={t("saveKeyAsTemplateAria", { name: key.name })}
                        disabled={isSubmitting}
                        onClick={() => setSaveTemplateSource(key)}
                      />
                      <Link
                        href={`/dashboard/api-manager/${encodeURIComponent(key.id)}/access`}
                        className="p-2 hover:bg-primary/10 rounded text-text-muted hover:text-primary opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all inline-flex items-center justify-center"
                        title={t("editPermissions")}
                      >
                        <Icon name="tune" size={18} />
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteKey(key.id)}
                        className="text-error opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
                        title={t("deleteKey")}
                        aria-label={t("deleteKey")}
                        icon="delete"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            };

            const tableHeader = (
              <TableHeader>
                <TableRow>
                  <TableHead>{t("name")}</TableHead>
                  <TableHead>{t("key")}</TableHead>
                  <TableHead>{t("permissions")}</TableHead>
                  <TableHead>{t("usage")}</TableHead>
                  <TableHead>{t("created")}</TableHead>
                  <TableHead className="text-right">{t("actions")}</TableHead>
                </TableRow>
              </TableHeader>
            );

            return (
              <div className="flex flex-col gap-4">
                {normalKeys.length > 0 && (
                  <div>
                    {/* Normal keys section heading */}
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="vpn_key" className="text-base text-text-muted" />
                      <span className="text-sm font-medium text-text-main">
                        {t("normalKeysSection")}
                      </span>
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-surface/80 border border-border text-[11px] font-semibold text-text-muted">
                        {normalKeys.length}
                      </span>
                    </div>
                    <Table scrollbarLabel={t("normalKeysSection")}>
                      {tableHeader}
                      <TableBody>{normalKeys.map(renderKeyRow)}</TableBody>
                    </Table>
                  </div>
                )}
                {quotaKeys.length > 0 && (
                  <div>
                    {/* Quota keys section heading */}
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="toll" className="text-base text-chart-3" />
                      <span className="text-sm font-medium text-text-main">
                        {t("quotaKeysSection")}
                      </span>
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-surface/80 border border-border text-[11px] font-semibold text-text-muted">
                        {quotaKeys.length}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-chart-3/10 text-chart-3 text-[11px] font-semibold">
                        {t("quotaPill")}
                      </span>
                    </div>
                    <Table scrollbarLabel={t("quotaKeysSection")}>
                      {tableHeader}
                      <TableBody>{quotaKeys.map(renderKeyRow)}</TableBody>
                    </Table>
                  </div>
                )}
              </div>
            );
          })()
        )}
      </Card>

      {/* Key Templates Library */}
      <KeyTemplatesLibrarySection
        unreadable={unreadableTemplates}
        loadError={templatesError}
        loading={templatesLoading}
        templates={templates}
        onRefreshTemplates={fetchTemplates}
        onUseTemplate={handleUseTemplateFromLibrary}
      />

      {/* Save Key as Template Modal */}
      <SaveKeyAsTemplateModal
        sourceKey={
          saveTemplateSource ? { id: saveTemplateSource.id, name: saveTemplateSource.name } : null
        }
        onClose={() => setSaveTemplateSource(null)}
        onSaved={() => {
          void fetchTemplates();
        }}
      />

      {/* Add Key Modal */}
      <Modal
        isOpen={showAddModal}
        title={t("createKey")}
        maxWidth={showFullPolicyEditor ? "max-w-4xl" : "max-w-xl"}
        bodyClassName="p-6 max-h-[calc(100vh-150px)] overflow-y-auto"
        onClose={() => {
          setShowAddModal(false);
          resetCreateKeyModalState();
        }}
      >
        <div ref={createKeyFormRef} className="flex flex-col gap-4">
          <div ref={createKeyNameFieldRef}>
            <Input
              label={t("keyName")}
              id={newKeyNameInputId}
              value={newKeyName}
              onChange={(e) => {
                setNewKeyName(e.target.value);
                templateCreation.setCreateKeyRefIssues((issues) =>
                  issues.filter((issue) => issue.code !== "INVALID_FIELD")
                );
                setNameError(null);
              }}
              placeholder={t("keyNamePlaceholder")}
              maxLength={MAX_KEY_NAME_LENGTH}
              error={nameError}
              autoFocus
              hint={t("keyNameDesc")}
            />
          </div>

          {/* Template Picker */}
          <div className="flex flex-col gap-2 p-3 rounded-lg border border-border bg-surface/40">
            <Select
              native
              label={t("templatePickerLabel")}
              value={selectedTemplateId}
              onChange={(e) => void handleSelectTemplateInCreateModal(e.target.value)}
              disabled={loadingTemplatePolicy || isSubmitting}
              options={[
                { value: "", label: t("templatePickerNone") },
                ...templates.map((tpl) => ({
                  value: tpl.id,
                  label: `${tpl.name} (rev ${tpl.revision})`,
                })),
              ]}
              hint={t("templatePickerHint")}
            />
            {loadingTemplatePolicy && (
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <Spinner size="sm" />
                <span>{t("loadingTemplatePolicy")}</span>
              </div>
            )}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {summarizeKeyTemplatePolicy(draftCreatePolicy, t).map((badge) => (
                <span
                  key={badge.id}
                  className="inline-flex items-center px-2 py-0.5 rounded-md bg-surface-2 border border-border/60 text-[11px] font-medium text-text-secondary"
                >
                  {badge.label}
                </span>
              ))}
              {selectedTemplateRef && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[11px] font-medium">
                  <Icon name="layers" size={12} />
                  {t("templateSnapshotBadge", { revision: selectedTemplateRef.revision })}
                </span>
              )}
              {isCreatePolicyDirty && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-warning/10 text-warning text-[11px] font-medium">
                  <Icon name="edit_note" size={12} />
                  {t("policyCustomizedBadge")}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-start justify-between gap-3 p-3 rounded-lg border border-border bg-surface/40">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-text-main">{t("managementAccess")}</p>
              <p className="text-xs text-text-muted">{t("managementAccessDesc")}</p>
            </div>
            <Toggle
              size="sm"
              className="shrink-0"
              checked={newKeyManageEnabled}
              disabled={isSubmitting || loadingTemplatePolicy}
              onChange={(checked) => {
                setNewKeyManageEnabled(checked);
                setCreateKeyFormState((prev) => ({ ...prev, manageEnabled: checked }));
              }}
              ariaLabel={t("managementAccess")}
            />
          </div>
          <div className="flex flex-col gap-3 p-3 rounded-lg border border-border bg-surface/40">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-text-main">{t("selfServiceVisibility")}</p>
              <p className="text-xs text-text-muted">{t("selfServiceVisibilityDesc")}</p>
            </div>
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-text-main">{t("ownUsageVisibility")}</p>
                <p className="text-xs text-text-muted">{t("ownUsageVisibilityDesc")}</p>
              </div>
              <Toggle
                size="sm"
                className="shrink-0"
                checked={newKeySelfUsageEnabled}
                disabled={isSubmitting || loadingTemplatePolicy}
                onChange={() =>
                  setNewKeySelfUsageEnabled((prev) => {
                    const next = !prev;
                    if (!next) setNewKeyAccountQuotaEnabled(false);
                    setCreateKeyFormState((form) => ({
                      ...form,
                      selfUsageEnabled: next,
                      selfAccountQuotaEnabled: next ? form.selfAccountQuotaEnabled : false,
                    }));
                    return next;
                  })
                }
                ariaLabel={t("ownUsageVisibility")}
              />
            </div>
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-text-main">{t("sharedAccountQuotaVisibility")}</p>
                <p className="text-xs text-text-muted">{t("sharedAccountQuotaVisibilityDesc")}</p>
              </div>
              <Toggle
                size="sm"
                className="shrink-0"
                checked={newKeyAccountQuotaEnabled}
                disabled={isSubmitting || loadingTemplatePolicy || !newKeySelfUsageEnabled}
                onChange={(checked) => {
                  setNewKeyAccountQuotaEnabled(checked);
                  setCreateKeyFormState((prev) => ({ ...prev, selfAccountQuotaEnabled: checked }));
                }}
                ariaLabel={t("sharedAccountQuotaVisibility")}
              />
            </div>
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-text-main">{t("localUsageCommand")}</p>
                <p className="text-xs text-text-muted">{t("localUsageCommandDesc")}</p>
              </div>
              <Toggle
                size="sm"
                className="shrink-0"
                checked={newKeyAllowUsageCommand}
                disabled={isSubmitting || loadingTemplatePolicy}
                onChange={(checked) => {
                  setNewKeyAllowUsageCommand(checked);
                  setCreateKeyFormState((prev) => ({ ...prev, allowUsageCommand: checked }));
                }}
                ariaLabel={t("localUsageCommand")}
              />
            </div>
          </div>

          {/* Expandable Full 6-Tab Policy Editor */}
          <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface/20 p-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-text-main">{t("fullPolicyEditorTitle")}</p>
                <p className="text-xs text-text-muted">{t("fullPolicyEditorDesc")}</p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                icon={showFullPolicyEditor ? "expand_less" : "tune"}
                onClick={() => setShowFullPolicyEditor((prev) => !prev)}
              >
                {showFullPolicyEditor ? t("hideFullPolicyEditor") : t("customizeFullPolicy")}
              </Button>
            </div>
            {showFullPolicyEditor && (
              <div className="pt-2 border-t border-border/60">
                <KeyPolicySixTabEditor
                  policy={draftCreatePolicy}
                  formStateOverride={createKeyFormState}
                  onFormStateChange={syncCreateKeyFormState}
                  onValidationStateChange={handleEditorValidation}
                  serverReferenceIssues={createKeyRefIssues}
                  disabled={isSubmitting || loadingTemplatePolicy}
                />
              </div>
            )}
          </div>

          {createError && (
            <Alert
              variant="critical"
              icon={<Icon name="error" />}
              description={createError}
              dismissLabel={tc("close")}
              onDismiss={() => setCreateError(null)}
            />
          )}
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setShowAddModal(false);
                resetCreateKeyModalState();
              }}
              variant="ghost"
              fullWidth
            >
              {tc("cancel")}
            </Button>
            <Button
              onClick={handleCreateKey}
              fullWidth
              disabled={
                !newKeyName.trim() ||
                loadingTemplatePolicy ||
                hasCreatePolicyErrors ||
                hasBlockingCreateRefIssues
              }
              loading={isSubmitting}
            >
              {t("createKey")}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Created Key Modal */}
      <Modal isOpen={!!createdKey} title={t("keyCreated")} onClose={() => setCreatedKey(null)}>
        <div className="flex flex-col gap-4">
          <Alert
            variant="success"
            icon={<Icon name="check_circle" />}
            title={t("keyCreatedSuccess")}
            description={t("keyCreatedNote")}
            dismissLabel={tc("close")}
          />
          <div className="flex gap-2">
            <Input value={createdKey || ""} readOnly className="flex-1 font-mono text-sm" />
            <Button
              variant="secondary"
              icon={copied === "created_key" ? "check" : "content_copy"}
              onClick={() => copy(createdKey, "created_key")}
            >
              {copied === "created_key" ? tc("copied") : tc("copy")}
            </Button>
          </div>
          <Button onClick={() => setCreatedKey(null)} fullWidth>
            {t("done")}
          </Button>
        </div>
      </Modal>
      {confirmDialog}
      {templateConfirmDialog}
    </div>
  );
}
