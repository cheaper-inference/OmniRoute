"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { PROVIDER_ORDER } from "./constants";
import { useProviderOrder } from "./useProviderOrder";
import QuotaCard from "./QuotaCard";
import QuotaHealthOverview from "./QuotaHealthOverview";
import { buildHealthGroups, type HealthAccount } from "./healthOverview";
import { displayAccount } from "./availabilityDisplay";
import { HealthCounts } from "./HealthOverviewChrome";
import { useTranslations } from "next-intl";
import {
  worstStatus,
  type CardStatus,
  compareProviderGroups,
  type QuotaVisibilityScope,
} from "./utils";
import Icon from "@/shared/components/Icon";
import { compareTr } from "@/shared/utils/turkishText";

interface Props {
  connections: any[];
  quotaData: Record<string, any>;
  loading: Record<string, boolean>;
  errors: Record<string, string | null>;
  lastRefreshedAt: Record<string, string | undefined>;
  emailsVisible: boolean;
  providerLabels: Record<string, string>;
  renderInlineQuotaSummary?: (quota: any) => ReactNode;
  onRefresh: (id: string, provider: string) => void;
  onOpenCutoff: (connection: any) => void;
  onOpenResetCredits?: (id: string, provider: string) => void;
  onToggleActive: (id: string, nextActive: boolean) => void;
  togglingActiveId: string | null;
  redeemingResetCreditId?: string | null;
  loadingResetCreditsId?: string | null;
  /** Per-operator quota row visibility (upstream 9router#2371 port). */
  quotaVisibility?: Record<string, { hidden?: string[] }>;
  onHideQuota?: (scope: QuotaVisibilityScope, quota: any) => void;
  onShowQuota?: (scope: QuotaVisibilityScope, quota: any) => void;
  compact?: boolean;
  overview?: boolean;
  accounts?: Record<string, HealthAccount>;
  summaryFailed?: boolean;
}

const STATUS_RANK: Record<CardStatus, number> = {
  critical: 0,
  alert: 1,
  ok: 2,
  empty: 3,
};

function getSoonestResetMs(quotas: any[] | undefined): number {
  if (!Array.isArray(quotas) || quotas.length === 0) return Number.POSITIVE_INFINITY;
  const now = Date.now();
  let soonest = Number.POSITIVE_INFINITY;
  for (const quota of quotas) {
    if (!quota?.resetAt) continue;
    const ts = new Date(quota.resetAt).getTime();
    if (Number.isFinite(ts) && ts > now && ts < soonest) soonest = ts;
  }
  return soonest;
}

function getRemainingPercentage(quota: any): number {
  if (quota?.unlimited) return 100;
  if (typeof quota?.remainingPercentage === "number") return quota.remainingPercentage;
  if (typeof quota?.total === "number" && quota.total > 0) {
    const used = typeof quota.used === "number" ? quota.used : 0;
    return Math.max(0, Math.min(100, Math.round(((quota.total - used) / quota.total) * 100)));
  }
  return 100;
}

function getLowestRemainingPercentage(quotas: any[] | undefined): number {
  if (!Array.isArray(quotas) || quotas.length === 0) return 100;
  let lowest = 100;
  for (const quota of quotas) {
    lowest = Math.min(lowest, getRemainingPercentage(quota));
  }
  return lowest;
}

function hasUsableQuota(quotas: any[] | undefined): boolean {
  if (!Array.isArray(quotas) || quotas.length === 0) return true;
  return quotas.some((quota) => quota?.unlimited || getRemainingPercentage(quota) > 0);
}

function getConnectionLabel(connection: any): string {
  return String(
    connection.name || connection.displayName || connection.email || connection.id || ""
  );
}

export function sortProviderConnectionsByPriority(
  connections: any[],
  quotaData: Record<string, any>
) {
  return [...connections].sort((a, b) => {
    const aActive = a.isActive ?? true;
    const bActive = b.isActive ?? true;
    if (aActive !== bActive) return aActive ? -1 : 1;

    const aQuotas = quotaData[a.id]?.quotas;
    const bQuotas = quotaData[b.id]?.quotas;
    const aUsable = hasUsableQuota(aQuotas);
    const bUsable = hasUsableQuota(bQuotas);
    if (aUsable !== bUsable) return aUsable ? -1 : 1;

    const statusDiff = STATUS_RANK[worstStatus(aQuotas)] - STATUS_RANK[worstStatus(bQuotas)];
    if (statusDiff !== 0) return statusDiff;

    const resetDiff = getSoonestResetMs(aQuotas) - getSoonestResetMs(bQuotas);
    if (resetDiff !== 0) return resetDiff;

    const remainingDiff =
      getLowestRemainingPercentage(aQuotas) - getLowestRemainingPercentage(bQuotas);
    if (remainingDiff !== 0) return remainingDiff;

    return getConnectionLabel(a).localeCompare(getConnectionLabel(b));
  });
}

function buildProviderGroups(
  connections: any[],
  quotaData: Record<string, any>,
  providerLabels: Record<string, string>
) {
  const groups = new Map<string, typeof connections>();
  for (const conn of connections) {
    const list = groups.get(conn.provider) ?? [];
    list.push(conn);
    groups.set(conn.provider, list);
  }

  return [...groups.entries()]
    .map(([provider, conns]) => ({
      provider,
      connections: sortProviderConnectionsByPriority(conns, quotaData),
    }))
    .sort((a, b) =>
      compareProviderGroups(a.provider, b.provider, {
        providerOrder: PROVIDER_ORDER,
        providerLabels,
        compare: compareTr,
      })
    );
}

interface ProviderQuotaSectionProps extends Omit<Props, "connections"> {
  provider: string;
  connections: any[];
  defaultOpen?: boolean;
}

function ProviderQuotaHeader({
  group,
  providerLabel,
  activeCount,
  count,
  open,
}: {
  group: ReturnType<typeof buildHealthGroups>[number] | undefined;
  providerLabel: string;
  activeCount: number;
  count: number;
  open: boolean;
}) {
  const t = useTranslations("usage");
  const groupColor = group
    ? {
        critical: "var(--color-error)",
        alert: "var(--color-warning)",
        ok: "var(--color-success)",
        empty: "var(--color-text-muted)",
        paused: "var(--color-text-muted)",
      }[group.status]
    : undefined;
  return (
    <summary className="flex items-center gap-3 px-3 py-2.5 cursor-pointer select-none hover:bg-surface-2 [&::-webkit-details-marker]:hidden">
      <Icon name={open ? "expand_less" : "expand_more"} size={16} className="text-text-muted" />
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-text-main leading-5 truncate">
          {group && (
            <span
              className="me-2 inline-block h-2 w-2 rounded-full"
              style={{ background: groupColor }}
              aria-hidden
            />
          )}
          {providerLabel}
        </h3>
        <p className="text-[11px] text-text-muted tabular-nums">
          {t("activeCount", { count: activeCount })} / {t("accountsCount", { count })}
        </p>
      </div>
      {group && <HealthCounts accounts={group.accounts.map((a) => displayAccount(a))} />}
    </summary>
  );
}

function ProviderQuotaSection({
  provider,
  connections,
  defaultOpen = true,
  quotaData,
  loading,
  errors,
  lastRefreshedAt,
  emailsVisible,
  providerLabels,
  onRefresh,
  onOpenCutoff,
  onOpenResetCredits,
  onToggleActive,
  togglingActiveId,
  redeemingResetCreditId = null,
  loadingResetCreditsId = null,
  quotaVisibility,
  onHideQuota,
  onShowQuota,
  accounts,
}: ProviderQuotaSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const group =
    accounts && buildHealthGroups(connections.map((c) => accounts[c.id]).filter(Boolean))[0];
  const activeCount = connections.filter((conn) => conn.isActive ?? true).length;
  const providerLabel = providerLabels[provider] || provider;

  return (
    <details
      open={open}
      onToggle={(event) => setOpen((event.target as HTMLDetailsElement).open)}
      className="rounded-lg border border-border bg-surface overflow-hidden"
    >
      <ProviderQuotaHeader
        group={group}
        providerLabel={providerLabel}
        activeCount={activeCount}
        count={connections.length}
        open={open}
      />
      <div className="px-3 pb-3">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-3">
          {connections.map((conn) => (
            <QuotaCard
              key={conn.id}
              connection={conn}
              quota={quotaData[conn.id]}
              loading={!!loading[conn.id]}
              error={errors[conn.id] || null}
              refreshedAt={lastRefreshedAt[conn.id]}
              emailsVisible={emailsVisible}
              providerLabel={providerLabels[conn.provider] || conn.provider}
              onRefresh={() => onRefresh(conn.id, conn.provider)}
              onOpenCutoff={() => onOpenCutoff(conn)}
              onOpenResetCredits={() => onOpenResetCredits?.(conn.id, conn.provider)}
              onToggleActive={(nextActive) => onToggleActive(conn.id, nextActive)}
              togglingActive={togglingActiveId === conn.id}
              redeemingResetCredit={redeemingResetCreditId === conn.id}
              loadingResetCredits={loadingResetCreditsId === conn.id}
              quotaVisibility={quotaVisibility}
              onHideQuota={
                onHideQuota
                  ? (q) => onHideQuota({ connectionId: conn.id, provider: conn.provider }, q)
                  : undefined
              }
              onShowQuota={
                onShowQuota
                  ? (q) => onShowQuota({ connectionId: conn.id, provider: conn.provider }, q)
                  : undefined
              }
            />
          ))}
        </div>
      </div>
    </details>
  );
}

export default function QuotaCardGrid({
  connections,
  quotaData,
  loading,
  errors,
  lastRefreshedAt,
  emailsVisible,
  providerLabels,
  renderInlineQuotaSummary: _renderInlineQuotaSummary,
  onRefresh,
  onOpenCutoff,
  onOpenResetCredits,
  onToggleActive,
  togglingActiveId,
  redeemingResetCreditId = null,
  loadingResetCreditsId = null,
  quotaVisibility,
  onHideQuota,
  onShowQuota,
  compact = false,
  overview = false,
  accounts,
  summaryFailed,
}: Props) {
  const { order } = useProviderOrder(connections.map((c) => c.provider));
  const orderedConnections = [...connections].sort(
    (a, b) => order.indexOf(a.provider) - order.indexOf(b.provider)
  );
  if (connections.length === 0) return null;

  const renderCard = (conn: (typeof connections)[number]) => (
    <QuotaCard
      key={conn.id}
      connection={conn}
      quota={quotaData[conn.id]}
      loading={!!loading[conn.id]}
      error={errors[conn.id] || null}
      refreshedAt={lastRefreshedAt[conn.id]}
      emailsVisible={emailsVisible}
      providerLabel={providerLabels[conn.provider] || conn.provider}
      onRefresh={() => onRefresh(conn.id, conn.provider)}
      onOpenCutoff={() => onOpenCutoff(conn)}
      onOpenResetCredits={() => onOpenResetCredits?.(conn.id, conn.provider)}
      onToggleActive={(nextActive) => onToggleActive(conn.id, nextActive)}
      togglingActive={togglingActiveId === conn.id}
      redeemingResetCredit={redeemingResetCreditId === conn.id}
      loadingResetCredits={loadingResetCreditsId === conn.id}
      quotaVisibility={quotaVisibility}
      onHideQuota={
        onHideQuota
          ? (q) => onHideQuota({ connectionId: conn.id, provider: conn.provider }, q)
          : undefined
      }
      onShowQuota={
        onShowQuota
          ? (q) => onShowQuota({ connectionId: conn.id, provider: conn.provider }, q)
          : undefined
      }
    />
  );

  if (overview) {
    return (
      <QuotaHealthOverview
        connections={connections}
        quotaData={quotaData}
        quotaVisibility={quotaVisibility}
        accounts={accounts}
        summaryFailed={summaryFailed}
        providerLabels={providerLabels}
        emailsVisible={emailsVisible}
        renderCard={renderCard}
      />
    );
  }

  // Compact mode: flat 3-column card grid, across all connections.
  if (compact) {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] gap-3">
        {orderedConnections.map(renderCard)}
      </div>
    );
  }

  // Default layout: expandable provider sections. Provider groups are ordered
  // deterministically (PROVIDER_ORDER rank → label → key) so the group order
  // never shuffles between quota refreshes, and connections are
  // priority-sorted within each provider.
  const groups = buildProviderGroups(connections, quotaData, providerLabels).sort(
    (a, b) => order.indexOf(a.provider) - order.indexOf(b.provider)
  );

  return (
    <div className="space-y-4">
      {groups.map(({ provider, connections: conns }) => (
        <ProviderQuotaSection
          key={provider}
          provider={provider}
          connections={conns}
          accounts={accounts}
          quotaData={quotaData}
          loading={loading}
          errors={errors}
          lastRefreshedAt={lastRefreshedAt}
          emailsVisible={emailsVisible}
          providerLabels={providerLabels}
          onRefresh={onRefresh}
          onOpenCutoff={onOpenCutoff}
          onOpenResetCredits={onOpenResetCredits}
          onToggleActive={onToggleActive}
          togglingActiveId={togglingActiveId}
          quotaVisibility={quotaVisibility}
          onHideQuota={onHideQuota}
          onShowQuota={onShowQuota}
          redeemingResetCreditId={redeemingResetCreditId}
          loadingResetCreditsId={loadingResetCreditsId}
          defaultOpen
        />
      ))}
    </div>
  );
}
