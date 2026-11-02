"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import { Button } from "@/shared/components";
import EmptyState from "@/shared/components/EmptyState";
import Input from "@/shared/components/Input";
import { Skeleton } from "@/shared/components/Loading";
import Select from "@/shared/components/Select";
import Icon from "@/shared/components/Icon";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import { maskEmailLikeValue } from "@/shared/utils/maskEmail";
import type { QuotaPool } from "@/lib/quota/dimensions";

import { usePools } from "./hooks/usePools";
import { usePoolUsage } from "./hooks/usePoolUsage";
import { useLocalStoragePoolMigration } from "./hooks/useLocalStoragePoolMigration";
import { usePoolsUsageAggregate } from "./hooks/usePoolsUsageAggregate";
import QuotaConceptCard from "./components/QuotaConceptCard";
import QuotaEndpointsCard from "./components/QuotaEndpointsCard";
import PoolCard from "./components/PoolCard";
import PoolWizard from "./components/PoolWizard";

// ────────────────────────────────────────────────────────────────────────────
// Local types (display layer only)
// ────────────────────────────────────────────────────────────────────────────

interface QuotaGroup {
  id: string;
  name: string;
  createdAt: string;
}

interface Connection {
  id: string;
  provider: string;
  name?: string;
  displayName?: string;
  email?: string;
}

interface ApiKey {
  id: string;
  name?: string;
}

interface PlanDimension {
  unit: string;
  window: string;
  limit: number;
}

interface PlanInfo {
  dimensions: PlanDimension[];
  source: "auto" | "manual";
}

// ────────────────────────────────────────────────────────────────────────────
// Stat card helper
// ────────────────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "green" | "amber" | "red";
}) {
  const color =
    tone === "amber"
      ? "text-warning"
      : tone === "red"
        ? "text-error"
        : tone === "green"
          ? "text-success"
          : "text-text-main";
  return (
    <div className="rounded-lg border border-border bg-bg-subtle px-4 py-3">
      <div className="text-[10px] uppercase tracking-wide text-text-muted font-semibold">
        {label}
      </div>
      <div className={`text-2xl font-bold tabular-nums leading-tight ${color}`}>{value}</div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Per-pool wrapper that fetches usage
// ────────────────────────────────────────────────────────────────────────────

function PoolCardWithUsage({
  pool,
  keyLabels,
  connectionLabel,
  provider,
  providers,
  connectionIds,
  onEdit,
  onRemove,
}: {
  pool: QuotaPool;
  keyLabels: Record<string, string>;
  connectionLabel: string;
  provider: string;
  providers?: string[];
  connectionIds?: string[];
  onEdit: () => void;
  onRemove: () => void;
}) {
  const { usage } = usePoolUsage(pool.id);
  return (
    <PoolCard
      pool={pool}
      usage={usage}
      keyLabels={keyLabels}
      connectionLabel={connectionLabel}
      provider={provider}
      providers={providers}
      connectionIds={connectionIds}
      onEdit={onEdit}
      onRemove={onRemove}
    />
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Main component
// ────────────────────────────────────────────────────────────────────────────

export default function QuotaSharePageClient() {
  const t = useTranslations("quotaShare");
  const { pools, loading, mutate } = usePools();
  const emailsVisible = useEmailPrivacyStore((s) => s.emailsVisible);

  // LS → DB migration hook (B22) — runs once, idempotent
  useLocalStoragePoolMigration({ pools, mutate });

  const [connections, setConnections] = useState<Connection[]>([]);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [plans, setPlans] = useState<Record<string, PlanInfo>>({});
  const [createOpen, setCreateOpen] = useState(false);
  const [removeError, setRemoveError] = useState<string | null>(null);
  const [editing, setEditing] = useState<QuotaPool | null>(null);

  // ── Group state ───────────────────────────────────────────────────────────
  const [groups, setGroups] = useState<QuotaGroup[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string>("all");
  const [newGroupInput, setNewGroupInput] = useState("");
  const [showNewGroupInput, setShowNewGroupInput] = useState(false);
  const [renaming, setRenaming] = useState(false);

  // ── Fetch side data once on mount ─────────────────────────────────────────

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      fetch("/api/providers/client")
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
      fetch("/api/keys")
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
      fetch("/api/quota/plans")
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
    ])
      .then(([connsData, keysData, plansData]) => {
        if (cancelled) return;

        const conns: Connection[] = Array.isArray(connsData?.connections)
          ? connsData.connections
          : [];
        const keys: ApiKey[] = Array.isArray(keysData) ? keysData : keysData?.keys || [];
        setConnections(conns);
        setApiKeys(keys);

        if (Array.isArray(plansData)) {
          const planMap: Record<string, PlanInfo> = {};
          for (const p of plansData as Array<{
            connectionId: string;
            dimensions: PlanDimension[];
            source: "auto" | "manual";
          }>) {
            if (p.connectionId)
              planMap[p.connectionId] = { dimensions: p.dimensions, source: p.source };
          }
          setPlans(planMap);
        }
      })
      .catch(() => {
        // fail open — side data not critical
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // ── Fetch groups ──────────────────────────────────────────────────────────

  const fetchGroups = useCallback(async (options?: { signal?: AbortSignal }) => {
    try {
      const res = await fetch("/api/quota/groups", { signal: options?.signal });
      if (res.ok) {
        const data = (await res.json()) as { groups: QuotaGroup[] };
        if (options?.signal?.aborted) return;
        setGroups(Array.isArray(data.groups) ? data.groups : []);
      }
    } catch {
      if (options?.signal?.aborted) return;
      // fail open — groups list not critical
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void Promise.resolve().then(() => fetchGroups({ signal: controller.signal }));
    return () => {
      controller.abort();
    };
  }, [fetchGroups]);

  // ── Group actions ─────────────────────────────────────────────────────────

  const handleCreateGroup = useCallback(async () => {
    const name = newGroupInput.trim();
    if (!name) return;
    try {
      const res = await fetch("/api/quota/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (res.ok) {
        const data = (await res.json()) as { group: QuotaGroup };
        await fetchGroups();
        setSelectedGroupId(data.group.id);
      }
    } catch {
      // fail open
    }
    setNewGroupInput("");
    setShowNewGroupInput(false);
  }, [newGroupInput, fetchGroups]);

  const handleRenameGroup = useCallback(async () => {
    const name = prompt(
      t("groupNamePrompt"),
      groups.find((g) => g.id === selectedGroupId)?.name ?? ""
    );
    if (!name?.trim()) return;
    setRenaming(true);
    try {
      const res = await fetch(`/api/quota/groups/${selectedGroupId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      if (res.ok) {
        await fetchGroups();
      }
    } catch {
      // fail open
    }
    setRenaming(false);
  }, [selectedGroupId, groups, fetchGroups, t]);

  // Delete the selected group. The API blocks deletion while the group still has
  // pools (HTTP 409) and protects the seed "group-demo"; surface both to the user.
  const handleDeleteGroup = useCallback(async () => {
    if (selectedGroupId === "all" || selectedGroupId === "group-demo") return;
    if (!confirm(t("deleteGroupConfirm"))) return;
    try {
      const res = await fetch(`/api/quota/groups/${selectedGroupId}`, { method: "DELETE" });
      if (res.ok) {
        setSelectedGroupId("all");
        await fetchGroups();
        await mutate();
      } else if (res.status === 409) {
        alert(t("deleteGroupHasPools"));
      }
    } catch {
      // fail open
    }
  }, [selectedGroupId, fetchGroups, mutate, t]);

  // ── Derived ──────────────────────────────────────────────────────────────

  const keyLabels = useMemo(() => {
    const map: Record<string, string> = {};
    for (const k of apiKeys) map[k.id] = k.name || k.id.slice(0, 12) + "…";
    return map;
  }, [apiKeys]);

  const connLabel = useCallback(
    (connectionId: string) => {
      const conn = connections.find((c) => c.id === connectionId);
      if (!conn) return connectionId.slice(0, 12);
      const raw = conn.name || conn.email || conn.displayName || conn.id.slice(0, 12);
      return emailsVisible ? raw : maskEmailLikeValue(raw);
    },
    [connections, emailsVisible]
  );

  const connProvider = useCallback(
    (connectionId: string) => connections.find((c) => c.id === connectionId)?.provider || "unknown",
    [connections]
  );

  // connectionId → name of the pool it already belongs to (all members, not just
  // primary). Feeds the wizard's "already used" hint so the one-connection-per-pool
  // rule is explicit instead of silently disabling a checkbox.
  const connectionPoolName = useMemo(() => {
    const map: Record<string, string> = {};
    for (const p of pools) {
      const name = (p as unknown as { name?: string }).name ?? p.id.slice(0, 8);
      for (const cid of p.connectionIds ?? [p.connectionId]) {
        if (!(cid in map)) map[cid] = name;
      }
    }
    return map;
  }, [pools]);

  // Pools whose groupId matches no loaded group (e.g. legacy pools saved with the
  // "all" sentinel). Surfaced in an "Ungrouped" bucket so they stay editable/deletable.
  const orphanPools = useMemo(() => {
    const known = new Set(groups.map((g) => g.id));
    return pools.filter(
      (p) => !known.has((p as unknown as { groupId?: string }).groupId ?? "group-demo")
    );
  }, [pools, groups]);

  const aggregate = usePoolsUsageAggregate(pools);

  const stats = useMemo(
    () => ({
      activePools: pools.length,
      keysAllocated: pools.reduce((s, p) => s + p.allocations.length, 0),
      avgUtilization: aggregate.avgUtilizationPercent,
      borrowingNow: aggregate.borrowingKeyCount,
    }),
    [pools, aggregate]
  );

  // Pools filtered by selected group (kept for stats/empty-state checks)
  const filteredPools = useMemo(
    () =>
      selectedGroupId === "all"
        ? pools
        : pools.filter(
            (p) =>
              ((p as unknown as { groupId?: string }).groupId ?? "group-demo") === selectedGroupId
          ),
    [pools, selectedGroupId]
  );

  // Groups to render as stacked sections
  const groupsToRender = useMemo(
    () => (selectedGroupId === "all" ? groups : groups.filter((g) => g.id === selectedGroupId)),
    [groups, selectedGroupId]
  );

  // ── Computed exclusivity for the pool being edited ───────────────────────
  //
  // A pool is exclusive when it has ≥1 allocation AND every allocated key
  // currently has the pool id in its allowedQuotas array.

  const editingExclusive = useMemo(
    () =>
      !!editing &&
      editing.allocations.length > 0 &&
      editing.allocations.every((a) => {
        const k = apiKeys.find((kk) => kk.id === a.apiKeyId);
        const aq = (k as { allowedQuotas?: string[] } | undefined)?.allowedQuotas;
        return Array.isArray(aq) && aq.includes(editing.id);
      }),
    [editing, apiKeys]
  );

  // ── Mutations ─────────────────────────────────────────────────────────────

  /**
   * A failed delete must never look like a click that did nothing. Without the
   * response check the page just revalidated and left the card in place, so a
   * 401 from an expired session, a 500 or a dropped request were all
   * indistinguishable from "I misclicked" — and the operator would click again.
   */
  const handleRemovePool = useCallback(
    async (id: string) => {
      if (!confirm(t("removeConfirm"))) return;
      setRemoveError(null);
      try {
        const res = await fetch(`/api/quota/pools/${id}`, { method: "DELETE" });
        if (!res.ok) {
          const detail = await res
            .json()
            .then((b) => b?.error?.message || b?.error || b?.message)
            .catch(() => null);
          setRemoveError(detail ? `${t("removeFailed")} — ${detail}` : t("removeFailed"));
          return;
        }
      } catch {
        // Network-level failure: there is no response to read.
        setRemoveError(t("removeFailed"));
        return;
      }
      await mutate();
    },
    [mutate, t]
  );

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-4">
      {/* Falha ao remover: dispensável, mas nunca silenciosa. */}
      {removeError && (
        <Alert
          variant="critical"
          icon={<Icon name="error" size={16} />}
          dismissLabel={t("dismiss")}
          onDismiss={() => setRemoveError(null)}
          description={removeError}
        />
      )}

      {/* Header */}
      <PageHeader
        compact
        title={
          <span className="flex items-center gap-2">
            <Icon name="pie_chart" size={24} className="text-primary" />
            {t("title")}
          </span>
        }
        description={t("description")}
        actions={
          <Button variant="primary" size="sm" icon="add" onClick={() => setCreateOpen(true)}>
            {t("newPool")}
          </Button>
        }
      />

      {/* Beta banner — scoped to this page only (always shown: no dismiss) */}
      <Alert
        variant="warning"
        icon={<Icon name="science" size={16} />}
        className="[&>.ci-alert__dismiss]:hidden"
        description={
          <span>
            <span className="font-semibold">{t("betaTitle")}</span> — {t("betaText")}
          </span>
        }
        actions={
          <a
            href="https://github.com/cheaper-inference/OmniRoute/issues/new?labels=quota-share,beta&title=%5Bquota-share%5D%20"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium underline-offset-2 hover:underline"
          >
            <Icon name="bug_report" size={14} />
            {t("betaReportLink")}
          </a>
        }
      />

      {/* Group bar */}
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-bg-subtle px-3 py-2">
        <Select
          compact
          label={t("groupLabel")}
          value={selectedGroupId}
          onChange={(e) => setSelectedGroupId(e.target.value)}
          title={t("groupSelectHint")}
          selectClassName="min-w-[120px]"
        >
          <option value="all">{t("allGroups")}</option>
          {groups.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </Select>
        {showNewGroupInput ? (
          <div className="flex items-center gap-1">
            <Input
              type="text"
              aria-label={t("groupNamePrompt")}
              value={newGroupInput}
              onChange={(e) => setNewGroupInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") void handleCreateGroup();
                if (e.key === "Escape") {
                  setShowNewGroupInput(false);
                  setNewGroupInput("");
                }
              }}
              placeholder={t("groupNamePrompt")}
              autoFocus
              inputClassName="h-8 min-h-8 w-36"
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={() => void handleCreateGroup()}
              disabled={!newGroupInput.trim()}
            >
              {t("newGroup")}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowNewGroupInput(false);
                setNewGroupInput("");
              }}
            >
              {t("cancel")}
            </Button>
          </div>
        ) : (
          <Button variant="ghost" size="sm" icon="add" onClick={() => setShowNewGroupInput(true)}>
            {t("newGroup")}
          </Button>
        )}
        {selectedGroupId !== "all" && (
          <Button
            variant="ghost"
            size="sm"
            icon="edit"
            onClick={() => void handleRenameGroup()}
            disabled={renaming}
          >
            {t("renameGroup")}
          </Button>
        )}
        {selectedGroupId !== "all" && selectedGroupId !== "group-demo" && (
          <Button
            variant="ghost"
            size="sm"
            icon="delete"
            onClick={() => void handleDeleteGroup()}
            className="hover:text-error"
          >
            {t("deleteGroup")}
          </Button>
        )}
      </div>

      {/* Concept card */}
      <QuotaConceptCard />

      {/* Endpoints card */}
      <QuotaEndpointsCard
        groups={groups}
        pools={pools}
        connections={connections}
        apiKeys={apiKeys}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label={t("kpiActivePools")} value={String(stats.activePools)} />
        <StatCard label={t("kpiKeysAllocated")} value={String(stats.keysAllocated)} />
        <StatCard
          label={t("kpiAvgUtilization")}
          value={`${Math.round(stats.avgUtilization)}%`}
          tone={stats.avgUtilization > 80 ? "red" : stats.avgUtilization > 50 ? "amber" : "green"}
        />
        <StatCard
          label={t("kpiBorrowingNow")}
          value={String(stats.borrowingNow)}
          tone={stats.borrowingNow > 0 ? "amber" : undefined}
        />
      </div>

      {/* Pool list */}
      {loading ? (
        <div className="flex flex-col gap-3" aria-busy="true">
          <span className="ci-sr-only">{t("loading")}</span>
          <Skeleton className="h-40 w-full" />
        </div>
      ) : pools.length === 0 ? (
        <EmptyState
          icon="pie_chart"
          title={t("emptyTitle")}
          description={t("emptyDescription")}
          actionLabel={t("newPool")}
          onAction={() => setCreateOpen(true)}
        />
      ) : (
        <>
          {groupsToRender.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-surface py-10 text-center">
              <p className="text-sm text-text-muted">{t("emptyDescription")}</p>
              <Button
                variant="primary"
                size="sm"
                className="mt-3"
                icon="add"
                onClick={() => setCreateOpen(true)}
              >
                {t("newPool")}
              </Button>
            </div>
          ) : (
            groupsToRender.map((g) => {
              const groupPools = pools.filter(
                (p) => ((p as unknown as { groupId?: string }).groupId ?? "group-demo") === g.id
              );
              return (
                <div key={g.id} className="flex flex-col gap-3">
                  {/* Per-group heading */}
                  <div className="flex items-center gap-2">
                    <Icon name="folder" size={16} className="text-text-muted" />
                    <span className="text-sm font-semibold text-text-main">{g.name}</span>
                    <span className="text-[11px] text-text-muted">({groupPools.length})</span>
                  </div>
                  {groupPools.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-border bg-surface py-6 text-center">
                      <p className="text-sm text-text-muted">{t("emptyDescription")}</p>
                      <Button
                        variant="primary"
                        size="sm"
                        className="mt-3"
                        icon="add"
                        onClick={() => setCreateOpen(true)}
                      >
                        {t("newPool")}
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                      {groupPools.map((pool) => (
                        <PoolCardWithUsage
                          key={pool.id}
                          pool={pool}
                          keyLabels={keyLabels}
                          connectionLabel={connLabel(pool.connectionId)}
                          provider={connProvider(pool.connectionId)}
                          providers={[
                            ...new Set(
                              (pool.connectionIds ?? [pool.connectionId]).map(connProvider)
                            ),
                          ]}
                          connectionIds={pool.connectionIds ?? [pool.connectionId]}
                          onEdit={() => setEditing(pool)}
                          onRemove={() => void handleRemovePool(pool.id)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}

          {/* Ungrouped bucket — pools whose group no longer matches (e.g. legacy
              "all" sentinel). Keeps them visible + editable + deletable. */}
          {selectedGroupId === "all" && orphanPools.length > 0 && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Icon name="folder_off" size={16} className="text-warning" />
                <span className="text-sm font-semibold text-text-main">{t("ungroupedTitle")}</span>
                <span className="text-[11px] text-text-muted">({orphanPools.length})</span>
              </div>
              <p className="text-[11px] text-warning">{t("ungroupedHint")}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {orphanPools.map((pool) => (
                  <PoolCardWithUsage
                    key={pool.id}
                    pool={pool}
                    keyLabels={keyLabels}
                    connectionLabel={connLabel(pool.connectionId)}
                    provider={connProvider(pool.connectionId)}
                    providers={[
                      ...new Set((pool.connectionIds ?? [pool.connectionId]).map(connProvider)),
                    ]}
                    connectionIds={pool.connectionIds ?? [pool.connectionId]}
                    onEdit={() => setEditing(pool)}
                    onRemove={() => void handleRemovePool(pool.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Modals */}
      <PoolWizard
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSaved={() => void mutate()}
        connections={connections}
        apiKeys={apiKeys}
        plans={plans}
        existingPoolConnectionIds={
          new Set(pools.flatMap((p) => p.connectionIds ?? [p.connectionId]))
        }
        connectionPoolName={connectionPoolName}
        groups={groups}
        selectedGroupId={selectedGroupId}
      />

      {/* Edit wizard — separate instance from create to avoid shared state */}
      <PoolWizard
        open={!!editing}
        onClose={() => setEditing(null)}
        onSaved={() => {
          void mutate();
          setEditing(null);
        }}
        editPool={editing ?? undefined}
        editPoolExclusive={editingExclusive}
        connections={connections}
        apiKeys={apiKeys}
        plans={plans}
        existingPoolConnectionIds={
          new Set(
            pools
              .filter((p) => p.id !== editing?.id)
              .flatMap((p) => p.connectionIds ?? [p.connectionId])
          )
        }
        connectionPoolName={connectionPoolName}
        groups={groups}
        selectedGroupId={selectedGroupId}
      />
    </div>
  );
}
