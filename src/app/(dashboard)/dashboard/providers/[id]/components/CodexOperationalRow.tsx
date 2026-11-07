"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Badge, Button, Checkbox } from "@/shared/components";
import CodexAccountActions from "./CodexAccountActions";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import { pickDisplayValue } from "@/shared/utils/maskEmail";
import { getCodexPlanLabel } from "../codexPlanLabel";
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

export default function CodexOperationalRow({
  children,
  ...props
}: ConnectionRowProps & { children: ReactNode }) {
  const { connection, quotaCache } = props;
  const t = useTranslations("providers");
  const locale = useLocale();
  const emailsVisible = useEmailPrivacyStore((s) => s.emailsVisible);
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(timer);
  }, []);
  const cooldown = Boolean(
    connection.rateLimitedUntil && Date.parse(connection.rateLimitedUntil) > now
  );
  const status = getStatusPresentation(
    connection,
    connection.testStatus === "unavailable" && !cooldown ? "active" : connection.testStatus,
    cooldown,
    t
  );
  const name = pickDisplayValue(
    [connection.name, connection.email, connection.displayName],
    emailsVisible,
    t("oauthAccount")
  );
  const plan =
    getCodexPlanLabel(true, connection.providerSpecificData) ||
    (typeof quotaCache?.plan === "string" ? quotaCache.plan : null);
  const pool = connection.codexAccountPool?.children.find((child) => child.key.scope === "codex");
  const visible = connection.quotaVisible !== false;
  const detailsLabel = providerText(t, "accountDetailsActions", "Details & actions");
  const identity = (
    <div className="flex min-w-0 items-center gap-3">
      {props.onToggleSelect && (
        <Checkbox checked={props.isSelected} onChange={props.onToggleSelect} aria-label={name} />
      )}
      <div className="min-w-0">
        <p className="[overflow-wrap:anywhere] text-sm font-semibold" title={name}>
          {name}
        </p>
        <p className="mt-1 text-xs text-text-muted">
          <span className="capitalize">{plan || "—"}</span>
          <span className="mx-2 text-border">/</span>#{connection.priority ?? "—"}
          {visible && (quotaCache?.bankedResetCredits ?? 0) > 0 && (
            <span className="ml-2 text-text-muted">
              {providerText(t, "resetCreditsAvailable", "{count} resets", {
                count: quotaCache!.bankedResetCredits!,
              })}
            </span>
          )}
        </p>
      </div>
    </div>
  );
  const statusCell = (
    <div className="min-w-0 space-y-1">
      <Badge
        size="sm"
        dot
        variant={status.statusVariant as "success" | "warning" | "error" | "default"}
      >
        {connection.testStatus || connection.isActive === false || cooldown
          ? status.statusLabel
          : "—"}
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
  const quotaCells = codexOperationalWindows(quotaCache).map((window) => {
    const quota: OperationalQuota = visible
      ? codexOperationalQuota(connection, quotaCache, window)
      : { usedPercent: null, resetAt: null };
    return (
      <QuotaCell
        key={window}
        label={
          quota.period === "monthly"
            ? t("quotaWindowMonthly")
            : quota.period === "weekly"
              ? "7d"
              : window
        }
        usedLabel={t("codexPoolUsed")}
        resetLabel={providerText(t, "quotaResetsAtShort", "Resets")}
        locale={locale}
        quota={quota}
      />
    );
  });
  const actions = (
    <div className="col-span-2 flex items-center justify-end gap-1 xl:col-span-1">
      {props.codexViewMode !== "cards" && <CodexAccountActions {...props} />}
      <Button
        size="sm"
        variant="ghost"
        icon={expanded ? "expand_less" : "expand_more"}
        aria-expanded={expanded}
        aria-controls={detailsId}
        onClick={() => setExpanded(!expanded)}
      >
        {detailsLabel}
      </Button>
    </div>
  );
  const notices = (
    <>
      {shouldShowConnectionLastError(connection) && (
        <p className={`col-span-2 break-words text-xs xl:col-span-5 ${status.errorTextClass}`}>
          {connection.lastError}
        </p>
      )}
      {quotaCache?.message && (
        <p className="col-span-2 break-words text-xs text-warning xl:col-span-5">
          {quotaCache.message}
        </p>
      )}
    </>
  );
  const details = (
    <div id={detailsId} hidden={!expanded}>
      {expanded && (
        <div className="border-t border-border bg-bg-subtle/40 px-4 py-3">{children}</div>
      )}
    </div>
  );
  const quotaSummary = (
    <div className={`grid gap-5 ${quotaCells.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
      {quotaCells}
    </div>
  );
  const cells = [identity, statusCell, quotaSummary, actions];
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
        {(expanded || shouldShowConnectionLastError(connection) || quotaCache?.message) && (
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
          <div
            key={index}
            className={`min-w-0 ${index === 3 ? (cards ? "col-span-2" : "col-span-2 xl:col-span-1") : cards && index === 0 ? "col-span-2 pr-10" : index === 2 ? (cards ? "col-span-2" : "col-span-2 xl:col-span-1") : cards && index === 1 ? "col-span-2" : ""}`}
          >
            {cell}
          </div>
        ))}
      </div>
      {notices}
      {details}
    </div>
  );
}
