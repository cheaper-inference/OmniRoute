"use client";

import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@omniroute/ui-kit/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import { Checkbox as KitCheckbox } from "@omniroute/ui-kit/checkbox";
import { Field } from "@omniroute/ui-kit/field";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Input,
  Modal,
  Select,
  Textarea,
} from "@/shared/components";
import Icon from "@/shared/components/Icon";
import { useProxyBatchOperations } from "./useProxyBatchOperations";
import { ProxyStatusBadge } from "./ProxyStatusBadge";
import { ProxyHealthCell } from "./ProxyHealthCell";
import { ProxyBatchActions } from "./ProxyBatchActions";
import { ProxyCheckboxCell } from "./ProxyCheckboxCell";
import { PoolEgressObservation } from "./PoolEgressObservation";
import { PoolMemberEgressLines } from "./PoolMemberEgressLines";
import { PoolUpstreamRegimeLine } from "./PoolUpstreamRegimeLine";
import {
  parseBulkImportText,
  type ParsedProxyEntry,
  type ParseError,
} from "./parseBulkProxyImport";
import { POOL_STRATEGY_OPTIONS, isPoolStrategy, type PoolStrategy } from "./proxyStrategyOptions";
import type { ProxyItem } from "./proxyRegistryTypes";
import {
  BULK_IMPORT_PLACEHOLDER,
  EMPTY_FORM,
  type HealthInfo,
  type ProxyRegistryManagerProps,
  type TestResult,
  type UsageInfo,
} from "./proxyRegistryConstants";
import {
  loadAllProxyUsage,
  loadProxyHealth,
  loadProxyUsage,
  repairRelayResponseSchema,
  useProxyBulkImportLimit,
} from "./proxyRegistryData";

export default function ProxyRegistryManager({
  onRedeployRelay,
  showVercelRelay = false,
  showDenoRelay = false,
  showCloudflareRelay = false,
  onOpenVercelRelay,
  onOpenDenoRelay,
  onOpenCloudflareRelay,
}: ProxyRegistryManagerProps = {}) {
  const t = useTranslations("proxyRegistry");
  const settingsT = useTranslations("settings");
  const [items, setItems] = useState<ProxyItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const [usageById, setUsageById] = useState<Record<string, UsageInfo>>({});
  const [healthById, setHealthById] = useState<Record<string, HealthInfo>>({});
  const [testById, setTestById] = useState<Record<string, TestResult | null>>({});
  const [testingId, setTestingId] = useState<string | null>(null);
  const [repairingId, setRepairingId] = useState<string | null>(null);
  const [repairErrorById, setRepairErrorById] = useState<Record<string, string>>({});
  const [relayTested, setRelayTested] = useState<number | null>(null);
  const [relayAlive, setRelayAlive] = useState<number | null>(null);
  const [migrating, setMigrating] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [bulkSaving, setBulkSaving] = useState(false);
  const [bulkScope, setBulkScope] = useState("provider");
  const [bulkScopeIds, setBulkScopeIds] = useState("");
  const [bulkProxyId, setBulkProxyId] = useState("");

  // Proxy pool / rotation state (#6365) — a single scope can hold MULTIPLE
  // proxies and pick a rotation strategy that cycles egress IPs.
  const [poolOpen, setPoolOpen] = useState(false);
  const [poolScope, setPoolScope] = useState("provider");
  const [poolScopeId, setPoolScopeId] = useState("");
  const [poolStrategy, setPoolStrategy] = useState<PoolStrategy>("round-robin");
  const [poolMembers, setPoolMembers] = useState<string[]>([]);
  const [poolAddProxyId, setPoolAddProxyId] = useState("");
  const [poolLoading, setPoolLoading] = useState(false);
  const [poolLoaded, setPoolLoaded] = useState(false);
  const [poolSaving, setPoolSaving] = useState(false);
  const [bulkImportOpen, setBulkImportOpen] = useState(false);
  const [bulkImportText, setBulkImportText] = useState("");
  const [bulkImportParsed, setBulkImportParsed] = useState<ParsedProxyEntry[]>([]);
  const [bulkImportErrors, setBulkImportErrors] = useState<ParseError[]>([]);
  const [bulkImportSkipped, setBulkImportSkipped] = useState(0);
  const [bulkImportParsedOnce, setBulkImportParsedOnce] = useState(false);
  const [bulkImporting, setBulkImporting] = useState(false);
  const bulkImportLimit = useProxyBulkImportLimit(); // #13917
  const [bulkImportResult, setBulkImportResult] = useState<{
    created: number;
    updated: number;
    failed: number;
  } | null>(null);
  const showAnyRelay = showVercelRelay || showDenoRelay || showCloudflareRelay;
  const notesId = useId();
  const bulkScopeIdsId = useId();
  const bulkImportDescId = useId();

  const editingId = useMemo(() => form.id || "", [form.id]);

  const loadHealth = useCallback(() => loadProxyHealth(setHealthById), []);
  const loadAllUsage = useCallback(
    (proxyIds: string[]) => loadAllProxyUsage(proxyIds, setUsageById),
    []
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/settings/proxies");
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error?.message || t("errorLoadFailed"));
        setItems([]);
        return;
      }
      const stats = data?.relayProbeStats;
      if (stats && typeof stats.tested === "number" && typeof stats.alive === "number") {
        setRelayTested(stats.tested);
        setRelayAlive(stats.alive);
      }
      const loaded: ProxyItem[] = Array.isArray(data?.items) ? data.items : [];
      setItems(loaded);
      const ids = loaded.map((p) => p.id).filter(Boolean);
      void loadHealth();
      void loadAllUsage(ids);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg || t("errorLoadFailed"));
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [loadHealth, loadAllUsage, t]);

  // MUST stay after the `load` const — earlier use TDZ-crashes SSR (#5918 guard).
  const {
    selectedIds,
    setSelectedIds,
    batchDeleting,
    autoTesting,
    batchActivating,
    toggleSelectAll: hookToggleSelectAll,
    toggleSelect,
    handleBatchDelete: hookHandleBatchDelete,
    handleBatchActivate: hookHandleBatchActivate,
    handleAutoTestAll: hookHandleAutoTestAll,
  } = useProxyBatchOperations(load);

  const allSelected = items.length > 0 && items.every((item) => selectedIds.has(item.id));

  const handleBatchDelete = () => hookHandleBatchDelete(setError);
  const handleBatchActivate = () => hookHandleBatchActivate(setError, "active");
  const handleAutoTestAll = () => hookHandleAutoTestAll(setError, setTestById);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (items.length > 0 && !bulkProxyId) {
      setBulkProxyId(items[0].id);
    }
  }, [items, bulkProxyId]);

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (item: ProxyItem) => {
    setForm({
      id: item.id,
      name: item.name || "",
      type: item.type || "http",
      host: item.host || "",
      port: String(item.port || 8080),
      username: "",
      password: "",
      region: item.region || "",
      notes: item.notes || "",
      status: item.status || "active",
      family: item.family || "auto",
    });
    setModalOpen(true);
  };

  const loadUsage = (proxyId: string) => loadProxyUsage(proxyId, setUsageById);

  const handleTestProxy = async (item: ProxyItem) => {
    if (testingId) return;
    setTestingId(item.id);
    setTestById((prev) => ({ ...prev, [item.id]: null }));
    try {
      const res = await fetch("/api/settings/proxy/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proxyId: item.id,
          proxy: {
            type: item.type || "http",
            host: item.host,
            port: String(item.port || 8080),
          },
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setTestById((prev) => ({
          ...prev,
          [item.id]: { success: false, error: data?.error?.message || t("failed") },
        }));
        return;
      }
      setTestById((prev) => ({ ...prev, [item.id]: { success: true, ...data } }));
    } catch (e: any) {
      setTestById((prev) => ({ ...prev, [item.id]: { success: false, error: e?.message } }));
    } finally {
      setTestingId(null);
    }
  };

  const handleRepairRelay = async (item: ProxyItem) => {
    if (repairingId || !item.relayInfo?.isRelay) return;
    setRepairingId(item.id);
    setRepairErrorById((prev) => {
      const next = { ...prev };
      delete next[item.id];
      return next;
    });
    try {
      const res = await fetch(`/api/settings/proxies/${item.id}/repair-relay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id }),
      });
      const parsed = repairRelayResponseSchema.safeParse(await res.json());
      const data = parsed.success ? parsed.data : {};
      if (!res.ok) {
        if (res.status === 409 && onRedeployRelay) {
          onRedeployRelay(item);
          return;
        }
        const message =
          res.status === 409
            ? t("relayRepairRedeployRequired")
            : data.error?.message || t("relayRepairFailed");
        setRepairErrorById((prev) => ({ ...prev, [item.id]: message }));
        return;
      }
      if (data.repaired) {
        await load();
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : t("relayRepairFailed");
      setRepairErrorById((prev) => ({ ...prev, [item.id]: message }));
    } finally {
      setRepairingId(null);
    }
  };

  const handleSave = async () => {
    if (!(form.name || "").trim() || !(form.host || "").trim()) {
      setError(t("errorNameHostRequired"));
      return;
    }

    setSaving(true);
    setError(null);

    const normalizedUsername = (form.username || "").trim();

    const normalizedPassword = (form.password || "").trim();

    const payload: Record<string, unknown> = {
      ...(editingId ? { id: editingId } : {}),
      name: (form.name || "").trim(),
      type: form.type,
      host: (form.host || "").trim(),
      port: Number(form.port || 8080),
      region: (form.region || "").trim() || null,
      notes: (form.notes || "").trim() || null,
      status: form.status,
      family: form.family || "auto",
    };
    if (!editingId || normalizedUsername.length > 0) {
      payload.username = normalizedUsername;
    }
    if (!editingId || normalizedPassword.length > 0) {
      payload.password = normalizedPassword;
    }

    try {
      const res = await fetch("/api/settings/proxies", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error?.message || t("errorSaveFailed"));
        return;
      }

      setModalOpen(false);
      setForm(EMPTY_FORM);
      await load();
    } catch (e: any) {
      setError(e?.message || t("errorSaveFailed"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/settings/proxies?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await load();
        return;
      }

      const payload = await res.json().catch(() => ({}));
      const inUse = res.status === 409;
      if (inUse) {
        const ok = window.confirm(t("errorForceDeleteConfirm"));
        if (!ok) return;

        const forceRes = await fetch(`/api/settings/proxies?id=${encodeURIComponent(id)}&force=1`, {
          method: "DELETE",
        });

        if (!forceRes.ok) {
          const forcePayload = await forceRes.json().catch(() => ({}));
          setError(forcePayload?.error?.message || t("errorDeleteFailed"));
          return;
        }

        await load();
        return;
      }

      setError(payload?.error?.message || t("errorDeleteFailed"));
    } catch (e: any) {
      setError(e?.message || t("errorDeleteFailed"));
    }
  };

  const handleMigrate = async () => {
    setMigrating(true);
    setError(null);
    try {
      const res = await fetch("/api/settings/proxies/migrate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ force: false }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error?.message || t("errorMigrateFailed"));
        return;
      }
      await load();
    } catch (e: any) {
      setError(e?.message || t("errorMigrateFailed"));
    } finally {
      setMigrating(false);
    }
  };

  const handleBulkAssign = async () => {
    setBulkSaving(true);
    setError(null);
    try {
      const scopeIds =
        bulkScope === "global"
          ? []
          : bulkScopeIds
              .split(/[\n,]/g)
              .map((part) => part.trim())
              .filter(Boolean);

      const res = await fetch("/api/settings/proxies/bulk-assign", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scope: bulkScope,
          scopeIds,
          proxyId: bulkProxyId || null,
        }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(payload?.error?.message || t("errorBulkFailed"));
        return;
      }

      setBulkOpen(false);
      setBulkScopeIds("");
      await load();
    } catch (e: any) {
      setError(e?.message || t("errorBulkFailed"));
    } finally {
      setBulkSaving(false);
    }
  };

  // ── Proxy pool / rotation (#6365) ──
  const poolQuery = useCallback(() => {
    const params = new URLSearchParams({ scope: poolScope });
    if (poolScope !== "global") params.set("scopeId", poolScopeId.trim());
    return params.toString();
  }, [poolScope, poolScopeId]);

  const loadPool = useCallback(async () => {
    if (poolScope !== "global" && !poolScopeId.trim()) {
      setError(t("poolScopeIdRequired"));
      return;
    }
    setPoolLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/settings/proxies/pool?${poolQuery()}`);
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(payload?.error?.message || t("poolLoadFailed"));
        return;
      }
      const members: Array<{ proxyId: string }> = Array.isArray(payload?.members)
        ? payload.members
        : [];
      setPoolMembers(members.map((m) => m.proxyId));
      setPoolStrategy(isPoolStrategy(payload?.strategy) ? payload.strategy : "round-robin");
      setPoolLoaded(true);
    } catch (e: any) {
      setError(e?.message || t("poolLoadFailed"));
    } finally {
      setPoolLoading(false);
    }
  }, [poolScope, poolScopeId, poolQuery, t]);

  const handlePoolAddMember = async () => {
    if (!poolAddProxyId) return;
    setPoolSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/settings/proxies/pool", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scope: poolScope,
          scopeId: poolScope === "global" ? null : poolScopeId.trim(),
          proxyId: poolAddProxyId,
        }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(payload?.error?.message || t("poolAddFailed"));
        return;
      }
      setPoolAddProxyId("");
      await loadPool();
      await load();
    } catch (e: any) {
      setError(e?.message || t("poolAddFailed"));
    } finally {
      setPoolSaving(false);
    }
  };

  const handlePoolRemoveMember = async (proxyId: string) => {
    setPoolSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/settings/proxies/pool", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scope: poolScope,
          scopeId: poolScope === "global" ? null : poolScopeId.trim(),
          proxyId,
        }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(payload?.error?.message || t("poolRemoveFailed"));
        return;
      }
      await loadPool();
      await load();
    } catch (e: any) {
      setError(e?.message || t("poolRemoveFailed"));
    } finally {
      setPoolSaving(false);
    }
  };

  const handlePoolStrategyChange = async (strategy: PoolStrategy) => {
    const previous = poolStrategy;
    setPoolStrategy(strategy);
    setError(null);
    try {
      const res = await fetch("/api/settings/proxies/pool", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scope: poolScope,
          scopeId: poolScope === "global" ? null : poolScopeId.trim(),
          strategy,
        }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        setPoolStrategy(previous);
        setError(payload?.error?.message || t("poolStrategyFailed"));
      }
    } catch (e: any) {
      setPoolStrategy(previous);
      setError(e?.message || t("poolStrategyFailed"));
    }
  };

  const openPool = () => {
    setPoolMembers([]);
    setPoolLoaded(false);
    setPoolAddProxyId("");
    setPoolStrategy("round-robin");
    setPoolOpen(true);
  };

  const handleBulkImportParse = () => {
    const { entries, errors, skipped } = parseBulkImportText(bulkImportText);
    setBulkImportParsed(entries);
    setBulkImportErrors(errors);
    setBulkImportSkipped(skipped);
    setBulkImportParsedOnce(true);
    setBulkImportResult(null);
  };

  const handleBulkImportExecute = async () => {
    if (bulkImportParsed.length === 0) return;
    if (bulkImportParsed.length > bulkImportLimit) {
      setError(t("bulkImportMaxExceeded", { max: bulkImportLimit }));
      return;
    }

    setBulkImporting(true);
    setError(null);
    setBulkImportResult(null);

    try {
      const payload = {
        items: bulkImportParsed.map((entry) => ({
          name: entry.name,
          type: entry.type,
          host: entry.host,
          port: entry.port,
          username: entry.username || undefined,
          password: entry.password || undefined,
          region: entry.region || null,
          notes: entry.notes || null,
          status: entry.status as "active" | "inactive" | undefined,
        })),
      };

      const res = await fetch("/api/settings/proxies/bulk-import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data?.error?.message || t("errorSaveFailed"));
        return;
      }

      setBulkImportResult({
        created: data.created || 0,
        updated: data.updated || 0,
        failed: data.failed || 0,
      });

      await load();
    } catch (e: any) {
      setError(e?.message || t("errorSaveFailed"));
    } finally {
      setBulkImporting(false);
    }
  };

  const openBulkImport = () => {
    setBulkImportText("");
    setBulkImportParsed([]);
    setBulkImportErrors([]);
    setBulkImportSkipped(0);
    setBulkImportParsedOnce(false);
    setBulkImportResult(null);
    setBulkImportOpen(true);
  };

  return (
    <>
      <Card className="p-6">
        <div className="mb-4 flex flex-col gap-3">
          <div className="w-full min-w-0">
            <h3 className="text-lg font-semibold">{t("title")}</h3>
            <p className="text-sm text-text-muted">{t("description")}</p>
          </div>
          <div className="w-full border-t border-border" aria-hidden="true" />
          <div className="flex w-full flex-wrap items-center justify-end gap-2">
            <ProxyBatchActions
              selectedCount={selectedIds.size}
              batchDeleting={batchDeleting}
              autoTesting={autoTesting}
              batchActivating={batchActivating}
              onBatchDelete={handleBatchDelete}
              onBatchActivate={handleBatchActivate}
              onAutoTestAll={handleAutoTestAll}
            />
            <Button
              size="sm"
              variant="secondary"
              icon="hub"
              onClick={openPool}
              data-testid="proxy-registry-open-pool"
            >
              {t("managePool")}
            </Button>
            {showAnyRelay && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="secondary"
                    icon="rocket_launch"
                    iconRight="expand_more"
                    data-testid="proxy-registry-deploy-relay"
                  >
                    {settingsT("deployRelayButton")}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {showVercelRelay && (
                    <DropdownMenuItem
                      icon={<Icon name="cloud_upload" size={16} />}
                      onSelect={() => onOpenVercelRelay?.()}
                    >
                      {settingsT("vercelRelayButton")}
                    </DropdownMenuItem>
                  )}
                  {showDenoRelay && (
                    <DropdownMenuItem
                      icon={<Icon name="terminal" size={16} />}
                      onSelect={() => onOpenDenoRelay?.()}
                    >
                      {settingsT("denoRelayButton")}
                    </DropdownMenuItem>
                  )}
                  {showCloudflareRelay && (
                    <DropdownMenuItem
                      icon={<Icon name="cloud" size={16} />}
                      onSelect={() => onOpenCloudflareRelay?.()}
                    >
                      {settingsT("cloudflareRelayButton")}
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon-sm"
                  variant="secondary"
                  icon="more_horiz"
                  aria-label={t("moreActions")}
                  data-testid="proxy-registry-more-actions"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem
                  icon={<Icon name="upload_file" size={16} />}
                  onSelect={() => openBulkImport()}
                  data-testid="proxy-registry-open-bulk-import"
                >
                  {t("bulkImport")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  icon={<Icon name="upload_file" size={16} />}
                  onSelect={() => handleMigrate()}
                  disabled={migrating}
                  data-testid="proxy-registry-import-legacy"
                >
                  {t("importLegacy")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  icon={<Icon name="account_tree" size={16} />}
                  onSelect={() => setBulkOpen(true)}
                  data-testid="proxy-registry-open-bulk"
                >
                  {t("bulkAssign")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              size="sm"
              icon="add"
              onClick={openCreate}
              data-testid="proxy-registry-open-create"
            >
              {t("addProxy")}
            </Button>
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-3 px-3 py-2 rounded border border-error/30 bg-error-bg text-sm text-error"
          >
            {error}
          </div>
        )}
        {relayTested !== null && relayAlive !== null && (
          <div
            role="status"
            className="mb-3 px-3 py-2 rounded border border-border bg-bg-subtle text-xs text-text-muted"
          >
            {t("relayProbeSummary", { tested: relayTested, alive: relayAlive })}
          </div>
        )}

        {loading ? (
          <div className="text-sm text-text-muted" role="status">
            {t("loading")}
          </div>
        ) : items.length === 0 ? (
          <EmptyState icon="dns" title={t("noProxies")} />
        ) : (
          <Table scrollbarLabel={t("title")}>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8">
                  {/* Kit Checkbox directly: the adapter does not expose the mixed state. */}
                  <KitCheckbox
                    checked={allSelected}
                    indeterminate={!allSelected && items.some((item) => selectedIds.has(item.id))}
                    onChange={() => hookToggleSelectAll(allSelected, items)}
                    aria-label={t("selectAllProxies")}
                  />
                </TableHead>
                <TableHead>{t("tableName")}</TableHead>
                <TableHead>{t("tableEndpoint")}</TableHead>
                <TableHead>{t("tableStatus")}</TableHead>
                <TableHead>{t("tableHealth")}</TableHead>
                <TableHead>{t("tableUsage")}</TableHead>
                <TableHead>{t("tableActions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => {
                const health = healthById[item.id];
                return (
                  <TableRow key={item.id}>
                    <ProxyCheckboxCell
                      checked={selectedIds.has(item.id)}
                      onChange={() => toggleSelect(item.id)}
                      label={t("selectProxy", { name: item.name })}
                    />
                    <TableCell>
                      <div className="font-medium text-text-main">{item.name}</div>
                      {item.region && <div className="text-xs text-text-muted">{item.region}</div>}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-text-muted">
                      {item.type}://{item.host}:{item.port}
                    </TableCell>
                    <TableCell>
                      <ProxyStatusBadge status={item.status} />
                    </TableCell>
                    <TableCell className="text-xs text-text-muted">
                      <ProxyHealthCell
                        testResult={testById[item.id] ?? undefined}
                        health={health ?? undefined}
                      />
                    </TableCell>
                    <TableCell className="text-xs text-text-muted">
                      {usageById[item.id] != null
                        ? t("assignmentsCount", { count: usageById[item.id].count })
                        : t("noData")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          icon="speed"
                          onClick={() => void handleTestProxy(item)}
                          loading={testingId === item.id}
                        >
                          {t("test")}
                        </Button>
                        {item.relayInfo?.isRelay &&
                          (item.relayInfo.repairMode === "redeploy" ||
                            item.relayInfo.repairMode === "recovered") && (
                            <Button
                              size="sm"
                              variant="ghost"
                              icon="build"
                              onClick={() => void handleRepairRelay(item)}
                              loading={repairingId === item.id}
                              title={t("relayRepairTooltip")}
                            >
                              {t("repair")}
                            </Button>
                          )}
                        {item.relayInfo?.isRelay && item.relayInfo.authMissing && (
                          <Badge variant="warning" size="sm" className="ml-1">
                            {t("relayAuthMissing")}
                          </Badge>
                        )}
                        {repairErrorById[item.id] && (
                          <span
                            className="ml-1 text-[10px] text-error"
                            title={repairErrorById[item.id]}
                          >
                            {t("relayRepairError")}
                          </span>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          icon="edit"
                          onClick={() => openEdit(item)}
                        >
                          {t("edit")}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          icon="delete"
                          onClick={() => void handleDelete(item.id)}
                          className="text-error"
                        >
                          {t("delete")}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Card>

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          if (!saving) setModalOpen(false);
        }}
        title={editingId ? t("modalEditTitle") : t("modalCreateTitle")}
        maxWidth="lg"
      >
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          autoComplete="off"
          data-1p-ignore="true"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input
              label={t("labelName")}
              data-testid="proxy-registry-name-input"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            />
            <Select
              label={t("labelType")}
              value={form.type}
              onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
            >
              <option value="http">HTTP</option>
              <option value="https">HTTPS</option>
              <option value="socks5">SOCKS5</option>
            </Select>
            <Select
              label={t("labelFamily")}
              hint={t("familyHint")}
              value={form.family}
              onChange={(e) => setForm((prev) => ({ ...prev, family: e.target.value }))}
            >
              <option value="auto">{t("familyAuto")}</option>
              <option value="ipv4">{t("familyIpv4")}</option>
              <option value="ipv6">{t("familyIpv6")}</option>
            </Select>
            <Input
              label={t("labelHost")}
              data-testid="proxy-registry-host-input"
              value={form.host}
              onChange={(e) => setForm((prev) => ({ ...prev, host: e.target.value }))}
            />
            <Input
              label={t("labelPort")}
              value={form.port}
              onChange={(e) => setForm((prev) => ({ ...prev, port: e.target.value }))}
            />
            <Input
              label={t("labelUsername")}
              value={form.username}
              autoComplete="off"
              data-1p-ignore="true"
              data-lpignore="true"
              placeholder={editingId ? t("usernamePlaceholderEdit") : ""}
              onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
            />
            <Input
              type="password"
              label={t("labelPassword")}
              value={form.password}
              autoComplete="new-password"
              data-1p-ignore="true"
              data-lpignore="true"
              placeholder={editingId ? t("passwordPlaceholderEdit") : ""}
              onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            />
            <Input
              label={t("labelRegion")}
              value={form.region}
              onChange={(e) => setForm((prev) => ({ ...prev, region: e.target.value }))}
            />
            <Select
              label={t("labelStatus")}
              value={form.status}
              onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
              data-testid="proxy-registry-status-select"
            >
              <option value="active">{t("statusActive")}</option>
              <option value="inactive">{t("statusInactive")}</option>
              {form.status === "dead" && <option value="dead">dead</option>}
            </Select>
          </div>

          <Field label={t("labelNotes")} htmlFor={notesId}>
            <Textarea
              id={notesId}
              value={form.notes}
              onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
              rows={3}
            />
          </Field>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
            <Button size="sm" variant="secondary" onClick={() => setModalOpen(false)}>
              {t("cancel")}
            </Button>
            <Button size="sm" icon="save" onClick={handleSave} loading={saving}>
              {t("save")}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={bulkOpen}
        onClose={() => {
          if (!bulkSaving) setBulkOpen(false);
        }}
        title={t("bulkProxyAssignment")}
        maxWidth="lg"
      >
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Select
              label={t("labelScope")}
              value={bulkScope}
              onChange={(e) => setBulkScope(e.target.value)}
            >
              <option value="global">{t("scopeGlobal")}</option>
              <option value="provider">{t("scopeProvider")}</option>
              <option value="account">{t("scopeAccount")}</option>
              <option value="combo">{t("scopeCombo")}</option>
            </Select>
            <Select
              label={t("labelProxy")}
              value={bulkProxyId}
              onChange={(e) => setBulkProxyId(e.target.value)}
            >
              <option value="">{t("clearAssignment")}</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} ({item.type}://{item.host}:{item.port})
                </option>
              ))}
            </Select>
          </div>

          {bulkScope !== "global" && (
            <Field label={t("bulkLabelScopeIds")} htmlFor={bulkScopeIdsId}>
              <Textarea
                id={bulkScopeIdsId}
                data-testid="proxy-registry-bulk-scopeids-input"
                rows={5}
                value={bulkScopeIds}
                onChange={(e) => setBulkScopeIds(e.target.value)}
                placeholder={t("bulkScopeIdsPlaceholder")}
              />
            </Field>
          )}

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
            <Button size="sm" variant="secondary" onClick={() => setBulkOpen(false)}>
              {t("cancel")}
            </Button>
            <Button
              size="sm"
              icon="done_all"
              onClick={handleBulkAssign}
              loading={bulkSaving}
              data-testid="proxy-registry-bulk-apply"
            >
              {t("bulkApply")}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Proxy Pool / Rotation Modal (#6365) */}
      <Modal
        isOpen={poolOpen}
        onClose={() => {
          if (!poolSaving && !poolLoading) setPoolOpen(false);
        }}
        title={t("poolTitle")}
        maxWidth="lg"
      >
        <div className="flex flex-col gap-3">
          <p className="text-sm text-text-muted">{t("poolDescription")}</p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Select
              label={t("labelScope")}
              value={poolScope}
              onChange={(e) => {
                setPoolScope(e.target.value);
                setPoolLoaded(false);
                setPoolMembers([]);
              }}
              data-testid="proxy-registry-pool-scope"
            >
              <option value="global">{t("scopeGlobal")}</option>
              <option value="provider">{t("scopeProvider")}</option>
              <option value="account">{t("scopeAccount")}</option>
              <option value="combo">{t("scopeCombo")}</option>
            </Select>
            {poolScope !== "global" && (
              <Input
                label={t("poolScopeIdLabel")}
                value={poolScopeId}
                onChange={(e) => {
                  setPoolScopeId(e.target.value);
                  setPoolLoaded(false);
                  setPoolMembers([]);
                }}
                placeholder={t("poolScopeIdPlaceholder")}
                data-testid="proxy-registry-pool-scopeid"
              />
            )}
          </div>

          <div>
            <Button
              size="sm"
              variant="secondary"
              icon="search"
              onClick={loadPool}
              loading={poolLoading}
              data-testid="proxy-registry-pool-load"
            >
              {t("poolLoad")}
            </Button>
          </div>

          {poolLoaded && (
            <>
              <Select
                label={t("poolStrategyLabel")}
                hint={t("poolStrategyHint")}
                value={poolStrategy}
                onChange={(e) =>
                  handlePoolStrategyChange(e.target.value as "round-robin" | "random" | "sticky")
                }
                data-testid="proxy-registry-pool-strategy"
              >
                {POOL_STRATEGY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {t(opt.labelKey)}
                  </option>
                ))}
              </Select>

              <div>
                <p className="text-sm font-medium mb-1">
                  {t("poolMembersLabel", { count: poolMembers.length })}
                </p>
                <PoolEgressObservation query={poolQuery()} />
                <PoolMemberEgressLines query={poolQuery()} />
                {poolScope === "provider" && poolScopeId.trim() !== "" && (
                  <PoolUpstreamRegimeLine provider={poolScopeId.trim()} />
                )}
                {poolMembers.length === 0 ? (
                  <div className="text-sm text-text-muted px-3 py-2 rounded border border-border bg-bg-subtle">
                    {t("poolNoMembers")}
                  </div>
                ) : (
                  <div className="flex flex-col gap-1" data-testid="proxy-registry-pool-members">
                    {poolMembers.map((proxyId) => {
                      const proxy = items.find((it) => it.id === proxyId);
                      return (
                        <div
                          key={proxyId}
                          className="flex items-center justify-between gap-2 px-3 py-2 rounded border border-border bg-bg-subtle"
                        >
                          <span className="min-w-0 break-all text-sm">
                            {proxy
                              ? `${proxy.name} (${proxy.type}://${proxy.host}:${proxy.port})`
                              : proxyId}
                          </span>
                          <Button
                            size="sm"
                            variant="secondary"
                            icon="delete"
                            onClick={() => handlePoolRemoveMember(proxyId)}
                            loading={poolSaving}
                          >
                            {t("poolRemove")}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 pt-2 border-t border-border sm:flex-row sm:items-end">
                <Select
                  label={t("poolAddLabel")}
                  className="flex-1"
                  value={poolAddProxyId}
                  onChange={(e) => setPoolAddProxyId(e.target.value)}
                  data-testid="proxy-registry-pool-add-select"
                >
                  <option value="">{t("poolSelectProxy")}</option>
                  {items
                    .filter(
                      (item) =>
                        !poolMembers.includes(item.id) &&
                        (item.status ?? "").toLowerCase() !== "dead"
                    )
                    .map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} ({item.type}://{item.host}:{item.port})
                      </option>
                    ))}
                </Select>
                <Button
                  size="sm"
                  icon="add"
                  onClick={handlePoolAddMember}
                  loading={poolSaving}
                  disabled={!poolAddProxyId}
                  data-testid="proxy-registry-pool-add"
                >
                  {t("poolAddMember")}
                </Button>
              </div>
            </>
          )}

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
            <Button size="sm" variant="secondary" onClick={() => setPoolOpen(false)}>
              {t("close")}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Bulk Import Modal */}
      <Modal
        isOpen={bulkImportOpen}
        onClose={() => {
          if (!bulkImporting) setBulkImportOpen(false);
        }}
        title={t("bulkImportTitle")}
        maxWidth="xl"
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm text-text-muted" id={bulkImportDescId}>
            {t("bulkImportDescription")}
          </p>

          <Textarea
            aria-labelledby={bulkImportDescId}
            data-testid="proxy-registry-bulk-import-textarea"
            className="font-mono text-xs leading-relaxed placeholder:whitespace-pre-wrap"
            rows={14}
            value={bulkImportText}
            placeholder={BULK_IMPORT_PLACEHOLDER}
            onChange={(e) => {
              setBulkImportText(e.target.value);
              setBulkImportParsedOnce(false);
              setBulkImportResult(null);
            }}
            spellCheck={false}
          />

          {/* Parse button */}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              size="sm"
              variant="secondary"
              icon="search"
              onClick={handleBulkImportParse}
              data-testid="proxy-registry-bulk-import-parse"
            >
              {t("bulkImportParse")}
            </Button>

            {bulkImportParsedOnce && (
              <div className="flex flex-wrap items-center gap-3 text-xs" role="status">
                <span className="text-success">
                  {t("bulkImportParsed", { count: bulkImportParsed.length })}
                </span>
                <span className="text-text-muted">
                  {t("bulkImportSkipped", { count: bulkImportSkipped })}
                </span>
                {bulkImportErrors.length > 0 && (
                  <span className="text-error">
                    {t("bulkImportParseErrors", { count: bulkImportErrors.length })}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Parse errors */}
          {bulkImportErrors.length > 0 && (
            <div className="max-h-28 overflow-y-auto rounded border border-error/30 bg-error-bg p-2">
              {bulkImportErrors.map((err, idx) => (
                <div key={idx} className="text-xs text-error">
                  {t("bulkImportErrorLine", { line: err.line, reason: t(err.reason as any) })}
                </div>
              ))}
            </div>
          )}

          {/* Preview table */}
          {bulkImportParsedOnce && bulkImportParsed.length > 0 && (
            <Table
              scrollbarLabel={t("bulkImportTitle")}
              containerClassName="max-h-48 overflow-y-auto"
              className="text-xs"
            >
              <TableHeader className="sticky top-0">
                <TableRow>
                  <TableHead>{t("tableName")}</TableHead>
                  <TableHead>{t("labelType")}</TableHead>
                  <TableHead>{t("labelHost")}</TableHead>
                  <TableHead>{t("labelPort")}</TableHead>
                  <TableHead>{t("labelUsername")}</TableHead>
                  <TableHead>{t("labelRegion")}</TableHead>
                  <TableHead>{t("labelStatus")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bulkImportParsed.map((entry, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium text-text-main">{entry.name}</TableCell>
                    <TableCell>
                      <Badge size="sm">{entry.type}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-text-muted">{entry.host}</TableCell>
                    <TableCell className="font-mono text-text-muted">{entry.port}</TableCell>
                    <TableCell className="text-text-muted">{entry.username || "—"}</TableCell>
                    <TableCell className="text-text-muted">{entry.region || "—"}</TableCell>
                    <TableCell className="text-text-muted">
                      <span className={entry.status === "active" ? "text-success" : undefined}>
                        {entry.status === "active" && t("statusActive")}
                        {entry.status === "inactive" && t("statusInactive")}
                        {!entry.status && "—"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {/* No valid entries warning */}
          {bulkImportParsedOnce &&
            bulkImportParsed.length === 0 &&
            bulkImportErrors.length === 0 && (
              <div className="text-sm text-warning" role="status">
                {t("bulkImportNoValidEntries")}
              </div>
            )}

          {/* Import result */}
          {bulkImportResult && (
            <div
              role="status"
              className="px-3 py-2 rounded border border-success/30 bg-success-bg text-sm text-success"
            >
              {t("bulkImportSuccess", {
                created: bulkImportResult.created,
                updated: bulkImportResult.updated,
                failed: bulkImportResult.failed,
              })}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
            <Button size="sm" variant="secondary" onClick={() => setBulkImportOpen(false)}>
              {t("cancel")}
            </Button>
            <Button
              size="sm"
              icon="upload"
              onClick={handleBulkImportExecute}
              loading={bulkImporting}
              disabled={!bulkImportParsedOnce || bulkImportParsed.length === 0}
              data-testid="proxy-registry-bulk-import-execute"
            >
              {bulkImporting
                ? t("bulkImportImporting")
                : bulkImportParsed.length > 0
                  ? t("bulkImportImport", { count: bulkImportParsed.length })
                  : t("bulkImport")}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
