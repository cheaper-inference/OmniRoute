"use client";

import { useId, useMemo, useState, type ReactNode } from "react";
import { useSharedHoverCard, type SharedHoverCardState } from "@omniroute/ui-kit/hover-card";
import { useNow } from "next-intl";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import { pickDisplayValue } from "@/shared/utils/maskEmail";
import {
  buildHealthAccount,
  type HealthAccount,
  type HealthConnection,
  type HealthData,
} from "./healthOverview";
import {
  displayAccount,
  displayPool,
  poolIds,
  compareDisplayAccounts,
  DISPLAY_COLORS,
  DISPLAY_LABELS,
  type DisplayAccount,
} from "./availabilityDisplay";
import HealthAccountTooltip, { HealthAccountCardContent } from "./HealthAccountTooltip";
import { useHealthText } from "./useHealthText";
import { useProviderOrder } from "./useProviderOrder";
import { useLegendVisibility } from "./useLegendVisibility";
import { SortableProviderRow, ProviderSortContext } from "./ProviderRowSort";
import { CAPSULE_CLASS, capsuleStyle, CapsuleWater } from "./HealthCapsule";
import { HealthBanner, HealthLegend, HealthCounts } from "./HealthOverviewChrome";

/** The hover-card value of a capsule: its connection and, inside a pool, the pool. */
function capsuleValue(connectionId: string, pool?: string) {
  return JSON.stringify([connectionId, pool ?? null]);
}
function parseCapsuleValue(value: string): { id: string; pool?: string } {
  const [id, pool] = JSON.parse(value) as [string, string | null];
  return { id, pool: pool ?? undefined };
}

function OverviewCapsules({
  list,
  selected,
  card,
  id,
  label,
  poolLabel,
  primary,
  all,
  setSelected,
}: {
  list: DisplayAccount[];
  selected: string | null;
  card: SharedHoverCardState;
  id: string;
  label: (connection: HealthConnection) => string;
  poolLabel: (id: string) => string;
  primary: (account: HealthAccount) => string;
  all: (key: string) => string;
  setSelected: (id: string | null) => void;
}) {
  return (
    <div className="flex min-w-0 flex-wrap gap-x-[4px] gap-y-[6px]">
      {[...list].sort(compareDisplayAccounts).map((account) => {
        const expanded = selected === account.connection.id;
        const visualKind = account.kind;
        return (
          // kit-exception: exact capsule geometry/fill; kit Button imposes padding and min-height.
          <button
            key={account.connection.id}
            type="button"
            data-availability={account.status}
            data-kind={account.kind}
            data-account={account.connection.id}
            aria-label={`${label(account.connection)}${account.poolId ? ` · ${poolLabel(account.poolId)}` : ""} · ${all(DISPLAY_LABELS[account.kind])} · ${primary(account)}`}
            aria-expanded={expanded}
            aria-controls={expanded ? `${id}-details` : undefined}
            // One card for every capsule: pointer rest or keyboard focus opens it (kit hook).
            {...card.getTriggerProps(capsuleValue(account.connection.id, account.poolId))}
            onClick={() => setSelected(expanded ? null : account.connection.id)}
            className={`${CAPSULE_CLASS} cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary hover:brightness-110 ${visualKind === "empty" ? "border border-dashed border-text-muted" : ""}`}
            style={capsuleStyle(visualKind)}
          >
            <CapsuleWater kind={visualKind} fill={account.fill} partial={account.partial} />
          </button>
        );
      })}
    </div>
  );
}

function OverviewGroupHeader({
  label,
  worst,
  count,
  t,
  accounts,
}: {
  label: string;
  worst: DisplayAccount | undefined;
  count: number;
  t: (key: string, values?: Record<string, unknown>) => string;
  accounts: DisplayAccount[];
}) {
  return (
    <>
      <span
        aria-hidden
        className="h-[9px] w-[9px] shrink-0 rounded-full"
        style={{
          background:
            worst?.partial && worst.kind === "ok"
              ? "var(--color-warning)"
              : DISPLAY_COLORS[worst?.kind || "empty"],
        }}
      />
      <h3 className="ci-heading break-words" data-size="sm">
        {label}
      </h3>
      <span className="text-xs text-text-muted">{t("accountsCount", { count })}</span>
      <HealthCounts accounts={accounts} />
    </>
  );
}
function OverviewGroupContent({
  accounts,
  ids,
  now,
  capsules,
  poolLabel,
}: {
  accounts: HealthAccount[];
  ids: string[];
  now: number;
  capsules: (items: DisplayAccount[]) => ReactNode;
  poolLabel: (id: string) => string;
}) {
  return ids.length
    ? ids.map((pool) => {
        const poolAccounts = accounts.map((account) => displayPool(account, pool, now));
        return (
          <div
            key={pool}
            data-subpool={pool}
            className="mb-[10px] ms-5 min-w-0 border-s-2 border-border ps-3 last:mb-0"
          >
            <div className="mb-[7px] flex flex-wrap items-center gap-2 text-xs">
              <b>{poolLabel(pool)}</b>
              <HealthCounts accounts={poolAccounts} />
            </div>
            {capsules(poolAccounts)}
          </div>
        );
      })
    : capsules(accounts.map((account) => displayAccount(account, now)));
}
function OverviewGroup({
  group,
  now,
  selected,
  card,
  id,
  providerLabels,
  t,
  poolLabel,
  label,
  primary,
  all,
  setSelected,
}: {
  group: { provider: string; accounts: HealthAccount[] };
  now: number;
  selected: string | null;
  card: SharedHoverCardState;
  id: string;
  providerLabels: Record<string, string>;
  t: (key: string, values?: Record<string, unknown>) => string;
  poolLabel: (id: string) => string;
  label: (connection: HealthConnection) => string;
  primary: (account: HealthAccount) => string;
  all: (key: string) => string;
  setSelected: (id: string | null) => void;
}) {
  const list = group.accounts.map((account) => displayAccount(account, now));
  const ids = [...new Set(group.accounts.flatMap(poolIds))].sort();
  const worst =
    list.find((account) => account.kind === "cdw" || account.kind === "act") ||
    list.find((account) => account.kind === "cd5") ||
    list.find((account) => account.partial) ||
    list[0];
  const capsules = (items: DisplayAccount[]) => (
    <OverviewCapsules
      list={items}
      selected={selected}
      card={card}
      id={id}
      label={label}
      poolLabel={poolLabel}
      primary={primary}
      all={all}
      setSelected={setSelected}
    />
  );
  return (
    <SortableProviderRow
      id={group.provider}
      label={providerLabels[group.provider] || group.provider}
      header={
        <OverviewGroupHeader
          label={providerLabels[group.provider] || group.provider}
          worst={worst}
          count={group.accounts.length}
          t={t}
          accounts={list}
        />
      }
    >
      <OverviewGroupContent
        accounts={group.accounts}
        ids={ids}
        now={now}
        capsules={capsules}
        poolLabel={poolLabel}
      />
    </SortableProviderRow>
  );
}

function OverviewHeader({
  id,
  legendHidden,
  toggleLegend,
  custom,
  reset,
  summaryFailed,
  t,
  relative,
  oldest,
}: {
  id: string;
  legendHidden: boolean;
  toggleLegend: () => void;
  custom: boolean;
  reset: () => void;
  summaryFailed: boolean;
  t: (key: string, values?: Record<string, unknown>) => string;
  relative: (value?: string | null) => string;
  oldest: (key: "runtimeObservedAt" | "quotaObservedAt") => string | undefined;
}) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-[10px] border-b border-border px-[18px] py-[14px]">
        <h2 className="text-[15px]">{t("healthTitle")}</h2>
        <span className="min-w-0 text-xs text-text-muted">
          {t("healthAccountHint")} ·{" "}
          {t("healthRuntimeObserved", { time: relative(oldest("runtimeObservedAt")) })} ·{" "}
          {t("healthOldestQuota", { time: relative(oldest("quotaObservedAt")) })}
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="ms-auto text-xs"
          aria-expanded={!legendHidden}
          aria-controls={`${id}-legend`}
          onClick={toggleLegend}
        >
          {t(legendHidden ? "healthLegendShow" : "healthLegendHide")}
        </Button>
        {custom && (
          <Button variant="ghost" size="sm" data-reset-order className="text-xs" onClick={reset}>
            <Icon name="restart_alt" size={14} /> {t("healthResetOrder")}
          </Button>
        )}
      </div>
      <HealthLegend id={`${id}-legend`} hidden={legendHidden} />
      {summaryFailed && (
        <p
          data-summary-warning
          role="note"
          className="m-3 rounded border bg-warning-bg p-2 text-xs text-text-main"
          style={{ borderColor: "color-mix(in srgb, var(--color-warning) 40%, transparent)" }}
        >
          {t("healthSummaryFailed")}
        </p>
      )}
    </>
  );
}
function OverviewGroups({
  groups,
  order,
  providerLabels,
  reorder,
  now,
  selected,
  card,
  id,
  t,
  poolLabel,
  label,
  primary,
  all,
  setSelected,
}: {
  groups: Array<{ provider: string; accounts: HealthAccount[] }>;
  order: string[];
  providerLabels: Record<string, string>;
  reorder: (visible: string[]) => void;
  now: number;
  selected: string | null;
  card: SharedHoverCardState;
  id: string;
  t: (key: string, values?: Record<string, unknown>) => string;
  poolLabel: (id: string) => string;
  label: (connection: HealthConnection) => string;
  primary: (account: HealthAccount) => string;
  all: (key: string) => string;
  setSelected: (id: string | null) => void;
}) {
  return (
    <ProviderSortContext ids={order} labels={providerLabels} onReorder={reorder}>
      {groups.map((group) => (
        <OverviewGroup
          key={group.provider}
          group={group}
          now={now}
          selected={selected}
          card={card}
          id={id}
          providerLabels={providerLabels}
          t={t}
          poolLabel={poolLabel}
          label={label}
          primary={primary}
          all={all}
          setSelected={setSelected}
        />
      ))}
    </ProviderSortContext>
  );
}
function OverviewDetails({
  rows,
  selectedAccount,
  card,
  id,
  now,
  label,
  poolLabel,
  renderCard,
  t,
}: {
  rows: HealthAccount[];
  selectedAccount: HealthAccount | undefined;
  card: SharedHoverCardState;
  id: string;
  now: number;
  label: (connection: HealthConnection) => string;
  poolLabel: (id: string) => string;
  renderCard: (connection: HealthConnection) => ReactNode;
  t: (key: string, values?: Record<string, unknown>) => string;
}) {
  return (
    <>
      <HealthAccountTooltip card={card}>
        {(value) => {
          const { id: connectionId, pool } = parseCapsuleValue(value);
          // The account can leave the list (a filter) while its card is still closing.
          const account = rows.find((row) => row.connection.id === connectionId);
          if (!account) return null;
          return (
            <HealthAccountCardContent
              account={pool ? displayPool(account, pool, now) : displayAccount(account, now)}
              label={`${label(account.connection)}${pool ? ` · ${poolLabel(pool)}` : ""}`}
              otherPools={
                pool
                  ? poolIds(account)
                      .filter((other) => other !== pool)
                      .map((other) => displayPool(account, other, now))
                  : undefined
              }
            />
          );
        }}
      </HealthAccountTooltip>
      {selectedAccount && (
        <div id={`${id}-details`} className="max-w-2xl space-y-2">
          <h4 className="ci-heading" data-size="sm">
            {label(selectedAccount.connection)} · {t("columnDetails")}
          </h4>
          {renderCard(selectedAccount.connection)}
        </div>
      )}
    </>
  );
}

function useOverviewProjection(
  connections: HealthConnection[],
  quotaData: Record<string, HealthData>,
  accounts: Record<string, HealthAccount> | undefined,
  now: number,
  selected: string | null,
  setSelected: (id: string | null) => void
) {
  const rows = useMemo(
    () =>
      connections.map(
        (connection) =>
          accounts?.[connection.id] ||
          buildHealthAccount(connection, quotaData[connection.id], {}, now)
      ),
    [connections, accounts, quotaData, now]
  );
  const {
    order: completeOrder,
    custom,
    reset,
    reorder,
  } = useProviderOrder(
    Object.values(accounts || {})
      .map((account) => account.connection.provider)
      .concat(connections.map((connection) => connection.provider))
  );
  const order = completeOrder.filter((provider) =>
    connections.some((connection) => connection.provider === provider)
  );
  const groups = order.map((provider) => ({
    provider,
    accounts: rows.filter((account) => account.connection.provider === provider),
  }));
  const display = rows.map((account) => displayAccount(account, now));
  const selectedAccount = rows.find((account) => account.connection.id === selected);
  if (selected && !selectedAccount) setSelected(null);
  return {
    rows,
    order,
    custom,
    reset,
    reorder,
    groups,
    display,
    selectedAccount,
  };
}

type OverviewContentProps = {
  display: DisplayAccount[];
  id: string;
  legendHidden: boolean;
  toggleLegend: () => void;
  custom: boolean;
  reset: () => void;
  summaryFailed: boolean;
  t: (key: string, values?: Record<string, unknown>) => string;
  relative: (value?: string | null) => string;
  oldest: (key: "runtimeObservedAt" | "quotaObservedAt") => string | undefined;
  groups: Array<{ provider: string; accounts: HealthAccount[] }>;
  order: string[];
  providerLabels: Record<string, string>;
  reorder: (visible: string[]) => void;
  now: number;
  selected: string | null;
  card: SharedHoverCardState;
  poolLabel: (id: string) => string;
  label: (connection: HealthConnection) => string;
  primary: (account: HealthAccount) => string;
  all: (key: string) => string;
  setSelected: (id: string | null) => void;
  rows: HealthAccount[];
  selectedAccount: HealthAccount | undefined;
  renderCard: (connection: HealthConnection) => ReactNode;
};
function OverviewContent({
  display,
  id,
  legendHidden,
  toggleLegend,
  custom,
  reset,
  summaryFailed,
  t,
  relative,
  oldest,
  groups,
  order,
  providerLabels,
  reorder,
  now,
  selected,
  card,
  poolLabel,
  label,
  primary,
  all,
  setSelected,
  rows,
  selectedAccount,
  renderCard,
}: OverviewContentProps) {
  return (
    <div className="min-w-0 space-y-[14px]">
      <HealthBanner accounts={display} />
      <div className="min-w-0 rounded-xl border border-border bg-surface">
        <OverviewHeader
          id={id}
          legendHidden={legendHidden}
          toggleLegend={toggleLegend}
          custom={custom}
          reset={reset}
          summaryFailed={summaryFailed}
          t={t}
          relative={relative}
          oldest={oldest}
        />
        <OverviewGroups
          groups={groups}
          order={order}
          providerLabels={providerLabels}
          reorder={reorder}
          now={now}
          selected={selected}
          card={card}
          id={id}
          t={t}
          poolLabel={poolLabel}
          label={label}
          primary={primary}
          all={all}
          setSelected={setSelected}
        />
      </div>
      <OverviewDetails
        rows={rows}
        selectedAccount={selectedAccount}
        card={card}
        id={id}
        now={now}
        label={label}
        poolLabel={poolLabel}
        renderCard={renderCard}
        t={t}
      />
    </div>
  );
}

function oldestObserved(rows: HealthAccount[], key: "runtimeObservedAt" | "quotaObservedAt") {
  return rows
    .map((account) => account[key])
    .filter((value) => value && Number.isFinite(Date.parse(value)))
    .sort((a, b) => Date.parse(a) - Date.parse(b))[0];
}

interface Props {
  connections: HealthConnection[];
  quotaData: Record<string, HealthData>;
  accounts?: Record<string, HealthAccount>;
  quotaVisibility?: Record<string, { hidden?: string[] }>;
  providerLabels: Record<string, string>;
  emailsVisible: boolean;
  summaryFailed?: boolean;
  renderCard: (connection: HealthConnection) => ReactNode;
}
/** One capsule per account in each independent pool. The existing detail card retains all operations. */
export default function QuotaHealthOverview({
  connections,
  quotaData,
  accounts,
  providerLabels,
  emailsVisible,
  summaryFailed = false,
  renderCard,
}: Props) {
  const { t, all, relative, primary, poolLabel } = useHealthText();
  const id = useId();
  const { legendHidden, toggleLegend } = useLegendVisibility();
  const now = useNow({ updateInterval: 1000 }).getTime();
  const [selected, setSelected] = useState<string | null>(null);
  // One hover card for every capsule (up to hundreds): the kit hook owns the hover intent.
  const card = useSharedHoverCard();
  const projection = useOverviewProjection(
    connections,
    quotaData,
    accounts,
    now,
    selected,
    setSelected
  );
  const { order, custom, reset, reorder, groups, display, selectedAccount } = projection;
  const label = (c: HealthConnection) =>
    pickDisplayValue([c.name, c.displayName, c.email], emailsVisible, c.provider) || c.id;
  return (
    <OverviewContent
      display={display}
      id={id}
      legendHidden={legendHidden}
      toggleLegend={toggleLegend}
      custom={custom}
      reset={reset}
      summaryFailed={summaryFailed}
      t={t}
      relative={relative}
      oldest={(key) => oldestObserved(projection.rows, key)}
      groups={groups}
      order={order}
      providerLabels={providerLabels}
      reorder={reorder}
      now={now}
      selected={selected}
      card={card}
      poolLabel={poolLabel}
      label={label}
      primary={primary}
      all={all}
      setSelected={setSelected}
      rows={projection.rows}
      selectedAccount={selectedAccount}
      renderCard={renderCard}
    />
  );
}
