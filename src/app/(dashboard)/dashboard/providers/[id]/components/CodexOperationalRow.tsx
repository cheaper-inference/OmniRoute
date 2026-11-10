"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Badge, Button, Checkbox } from "@/shared/components";
import CodexAccountActions from "./CodexAccountActions";
import ConnectionQuotaRefreshButton from "./ConnectionQuotaRefreshButton";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import { pickDisplayValue } from "@/shared/utils/maskEmail";
import { formatCodexPlanLabel, getCodexAccountSummary, getCodexPlanLabel } from "../codexPlanLabel";
import { providerText } from "../providerPageHelpers";
import { getStatusPresentation } from "./connectionRowStatus";
import { shouldShowConnectionLastError } from "./connectionRowHelpers";
import {
  codexOperationalQuota,
  codexOperationalWindows,
  type OperationalQuota,
} from "./codexOperationalQuota";
import type { ConnectionRowProps } from "./connectionRowTypes";

function QuotaCell({
  quota,
  label,
  usedLabel,
  resetLabel,
  locale,
}: {
  quota: OperationalQuota;
  label: string;
  usedLabel: string;
  resetLabel: string;
  locale: string;
}) {
  const percent = quota.usedPercent;
  return (
    <div className="min-w-0 space-y-1.5" aria-label={label}>
      <div className="flex items-baseline justify-between gap-2 text-xs">
        <span className="text-text-muted">{label}</span>
        <span className="font-medium tabular-nums">
          {percent === null ? "—" : `${percent}%`}{" "}
          <span className="font-normal text-text-muted">{percent === null ? "" : usedLabel}</span>
        </span>
      </div>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-bg-subtle"
        role={percent === null ? undefined : "meter"}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent ?? undefined}
      >
        {percent !== null && (
          <div
            className={`h-full rounded-full ${percent >= 95 ? "bg-error" : percent >= 80 ? "bg-warning" : "bg-success"}`}
            style={{ width: `${percent}%` }}
          />
        )}
      </div>
      <div className="text-[11px] tabular-nums text-text-muted">
        {quota.resetAt ? (
          <time dateTime={quota.resetAt} title={new Date(quota.resetAt).toLocaleString(locale)}>
            {resetLabel}{" "}
            {new Intl.DateTimeFormat(locale, {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date(quota.resetAt))}
          </time>
        ) : (
          "—"
        )}
      </div>
    </div>
  );
}

type Translate = ReturnType<typeof useTranslations>;
type RowProps = ConnectionRowProps & { children: ReactNode };

function cellClassName(index: number, cards: boolean): string {
  if (index === 2 || index === 3) return cards ? "col-span-2" : "col-span-2 xl:col-span-1";
  if (!cards) return "";
  if (index === 0) return "col-span-2 pr-10";
  return index === 1 ? "col-span-2" : "";
}

function quotaWindowLabel(quota: OperationalQuota, window: string, t: Translate): string {
  if (quota.period === "monthly") return t("quotaWindowMonthly");
  return quota.period === "weekly" ? "7d" : window;
}

function useNow(intervalMs: number): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs]);
  return now;
}

function IdentityCell({
  props,
  name,
  t,
}: {
  props: ConnectionRowProps;
  name: string;
  t: Translate;
}) {
  const { connection, quotaCache } = props;
  const plan =
    getCodexPlanLabel(true, connection.providerSpecificData) ||
    (typeof quotaCache?.plan === "string" ? quotaCache.plan : "");
  const account = getCodexAccountSummary(true, connection.providerSpecificData);
  const resetCredits =
    connection.quotaVisible !== false ? (quotaCache?.bankedResetCredits ?? 0) : 0;
  return (
    <div className="flex min-w-0 items-center gap-3">
      {props.onToggleSelect && (
        <Checkbox checked={props.isSelected} onChange={props.onToggleSelect} aria-label={name} />
      )}
      <div className="min-w-0">
        <p className="[overflow-wrap:anywhere] text-sm font-semibold" title={name}>
          {name}
        </p>
        <p className="mt-1 text-xs text-text-muted">
          <span title={plan || undefined}>{plan ? formatCodexPlanLabel(plan) : "—"}</span>
          {account && (
            <span title={account.role ? t("codexAccountRole", { role: account.role }) : undefined}>
              {" · "}
              {t(account.kind === "business" ? "codexAccountBusiness" : "codexAccountPersonal")}
              {account.workspaceName ? ` · ${account.workspaceName}` : ""}
            </span>
          )}
          <span className="mx-2 text-border">/</span>#{connection.priority ?? "—"}
          {resetCredits > 0 && (
            <span className="ml-2 text-text-muted">
              {providerText(t, "resetCreditsAvailable", "{count} resets", {
                count: resetCredits,
              })}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

function StatusCell({
  connection,
  status,
  cooldown,
  locale,
  t,
}: {
  connection: RowProps["connection"];
  status: ReturnType<typeof getStatusPresentation>;
  cooldown: boolean;
  locale: string;
  t: Translate;
}) {
  const pool = connection.codexAccountPool?.children.find((child) => child.key.scope === "codex");
  const hasStatus = Boolean(connection.testStatus || connection.isActive === false || cooldown);
  return (
    <div className="min-w-0 space-y-1">
      <Badge
        size="sm"
        dot
        variant={status.statusVariant as "success" | "warning" | "error" | "default"}
      >
        {hasStatus ? status.statusLabel : "—"}
      </Badge>
      {pool?.unavailable && (
        <p className="text-xs text-warning">
          {t(pool.quota.exhaustedWindow ? "codexPoolQuotaExhausted" : "codexPoolCoolingDown")}
        </p>
      )}
      {cooldown && (
        <p className="text-xs tabular-nums text-warning">
          {new Date(connection.rateLimitedUntil!).toLocaleTimeString(locale, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      )}
      {connection.discoveryState?.status === "degraded" && (
        <p className="break-words text-xs text-warning">{connection.discoveryState.cause}</p>
      )}
    </div>
  );
}

function QuotaSummary({
  props,
  locale,
  t,
}: {
  props: ConnectionRowProps;
  locale: string;
  t: Translate;
}) {
  const { connection, quotaCache } = props;
  const visible = connection.quotaVisible !== false;
  const quotaCells = codexOperationalWindows(quotaCache).map((window) => {
    const quota: OperationalQuota = visible
      ? codexOperationalQuota(connection, quotaCache, window)
      : { usedPercent: null, resetAt: null };
    return (
      <QuotaCell
        key={window}
        label={quotaWindowLabel(quota, window, t)}
        usedLabel={t("codexPoolUsed")}
        resetLabel={providerText(t, "quotaResetsAtShort", "Resets")}
        locale={locale}
        quota={quota}
      />
    );
  });
  return (
    <div className="min-w-0 space-y-2">
      <div className={`grid gap-5 ${quotaCells.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
        {quotaCells}
      </div>
      {/* #16161: the one explicit refresh stays on the row, even with quota details hidden. */}
      {connection.provider === "codex" && props.onRefreshQuota && (
        <ConnectionQuotaRefreshButton
          refreshing={props.quotaRefreshing}
          state={props.quotaRefreshState}
          onRefresh={props.onRefreshQuota}
        />
      )}
    </div>
  );
}

function useRowStatus(connection: RowProps["connection"], t: Translate) {
  const now = useNow(30_000);
  const cooldown = Boolean(
    connection.rateLimitedUntil && Date.parse(connection.rateLimitedUntil) > now
  );
  const status = getStatusPresentation(
    connection,
    connection.testStatus === "unavailable" && !cooldown ? "active" : connection.testStatus,
    cooldown,
    t
  );
  return { cooldown, status };
}

function RowActions({
  props,
  expanded,
  onToggle,
  detailsId,
  label,
}: {
  props: ConnectionRowProps;
  expanded: boolean;
  onToggle: () => void;
  detailsId: string;
  label: string;
}) {
  return (
    <div className="col-span-2 flex items-center justify-end gap-1 xl:col-span-1">
      {props.codexViewMode !== "cards" && <CodexAccountActions {...props} />}
      <Button
        size="sm"
        variant="ghost"
        icon={expanded ? "expand_less" : "expand_more"}
        aria-expanded={expanded}
        aria-controls={detailsId}
        onClick={onToggle}
      >
        {label}
      </Button>
    </div>
  );
}

function RowNotices({
  props,
  showLastError,
  errorTextClass,
}: {
  props: ConnectionRowProps;
  showLastError: boolean;
  errorTextClass: string;
}) {
  return (
    <>
      {showLastError && (
        <p className={`col-span-2 break-words text-xs xl:col-span-5 ${errorTextClass}`}>
          {props.connection.lastError}
        </p>
      )}
      {props.quotaCache?.message && (
        <p className="col-span-2 break-words text-xs text-warning xl:col-span-5">
          {props.quotaCache.message}
        </p>
      )}
    </>
  );
}

function RowDetails({
  id,
  expanded,
  children,
}: {
  id: string;
  expanded: boolean;
  children: ReactNode;
}) {
  return (
    <div id={id} hidden={!expanded}>
      {expanded && (
        <div className="border-t border-border bg-bg-subtle/40 px-4 py-3">{children}</div>
      )}
    </div>
  );
}

function RowFrame({
  props,
  cells,
  notices,
  details,
  showExtras,
}: {
  props: ConnectionRowProps;
  cells: ReactNode[];
  notices: ReactNode;
  details: ReactNode;
  showExtras: boolean;
}) {
  if (props.codexViewMode === "table")
    return (
      <>
        <tr className={props.isSelected ? "bg-primary/5" : "bg-surface"}>
          {cells.map((cell, index) => (
            <td key={index} className="px-4 py-3 align-top">
              {cell}
            </td>
          ))}
        </tr>
        {showExtras && (
          <tr>
            <td colSpan={4}>
              {notices}
              {details}
            </td>
          </tr>
        )}
      </>
    );
  const cards = props.codexViewMode === "cards";
  return (
    <div className={`relative min-w-0 ${props.isSelected ? "bg-primary/5" : "bg-surface"}`}>
      {cards && (
        <div className="absolute right-3 top-3 z-10">
          <CodexAccountActions {...props} />
        </div>
      )}
      <div
        className={`grid grid-cols-2 items-center gap-x-5 gap-y-3 px-4 py-3 ${cards ? "" : "xl:grid-cols-[minmax(180px,1.6fr)_minmax(110px,.8fr)_minmax(300px,2fr)_auto]"}`}
      >
        {cells.map((cell, index) => (
          <div key={index} className={`min-w-0 ${cellClassName(index, cards)}`}>
            {cell}
          </div>
        ))}
      </div>
      {notices}
      {details}
    </div>
  );
}

export default function CodexOperationalRow({ children, ...props }: RowProps) {
  const { connection, quotaCache } = props;
  const t = useTranslations("providers");
  const locale = useLocale();
  const emailsVisible = useEmailPrivacyStore((s) => s.emailsVisible);
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();
  const { cooldown, status } = useRowStatus(connection, t);
  const name = pickDisplayValue(
    [connection.name, connection.email, connection.displayName],
    emailsVisible,
    t("oauthAccount")
  );
  const showLastError = shouldShowConnectionLastError(connection);
  const notices = (
    <RowNotices
      props={props}
      showLastError={showLastError}
      errorTextClass={status.errorTextClass}
    />
  );
  const details = (
    <RowDetails id={detailsId} expanded={expanded}>
      {children}
    </RowDetails>
  );
  const cells = [
    <IdentityCell key="identity" props={props} name={name} t={t} />,
    <StatusCell
      key="status"
      connection={connection}
      status={status}
      cooldown={cooldown}
      locale={locale}
      t={t}
    />,
    <QuotaSummary key="quota" props={props} locale={locale} t={t} />,
    <RowActions
      key="actions"
      props={props}
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      detailsId={detailsId}
      label={providerText(t, "accountDetailsActions", "Details & actions")}
    />,
  ];
  return (
    <RowFrame
      props={props}
      cells={cells}
      notices={notices}
      details={details}
      showExtras={Boolean(expanded || showLastError || quotaCache?.message)}
    />
  );
}
