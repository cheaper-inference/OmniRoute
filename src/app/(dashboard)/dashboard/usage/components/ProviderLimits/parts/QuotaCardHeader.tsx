"use client";

import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import ConnectionTestButton from "@/shared/components/ConnectionTestButton";
import Badge from "@/shared/components/Badge";
import ProviderIcon from "@/shared/components/ProviderIcon";
import { pickDisplayValue } from "@/shared/utils/maskEmail";
import { readCookieExpiresAt } from "@/shared/utils/webCookieExpiry";
import { formatCountdown, type CardStatus } from "../utils";
import { translateUsageOrFallback } from "../i18nFallback";

const STATUS_DOT_CLASS: Record<CardStatus, string> = {
  critical: "bg-error shadow-[0_0_0_2px_color-mix(in_srgb,var(--color-error)_16%,transparent)]",
  alert: "bg-warning shadow-[0_0_0_2px_color-mix(in_srgb,var(--color-warning)_20%,transparent)]",
  ok: "bg-success shadow-[0_0_0_2px_color-mix(in_srgb,var(--color-success)_18%,transparent)]",
  empty:
    "bg-text-muted/30 shadow-[0_0_0_2px_color-mix(in_srgb,var(--color-text-muted)_18%,transparent)]",
};

interface Props {
  connection: any;
  providerLabel: string;
  cardStatus: CardStatus;
  tierMeta: { key: string; label: string; variant: any };
  resolvedPlan: string | null;
  emailsVisible: boolean;
  hasStaleData: boolean;
  /** Toggle the connection's active state (routing on/off). */
  onToggleActive: (nextActive: boolean) => void;
  /** True while the active-state PUT is in flight. */
  togglingActive: boolean;
  onTestSent?: () => void;
}

export default function QuotaCardHeader({
  connection,
  providerLabel,
  cardStatus,
  tierMeta,
  resolvedPlan,
  emailsVisible,
  hasStaleData,
  onToggleActive,
  togglingActive,
  onTestSent,
}: Props) {
  const t = useTranslations("usage");
  const isActive = connection.isActive ?? true;
  const toggleActiveLabel = isActive
    ? translateUsageOrFallback(t, "deactivateAccount", "Deactivate account (stop routing)")
    : translateUsageOrFallback(t, "activateAccount", "Activate account (resume routing)");
  const accountName = pickDisplayValue(
    [connection.name, connection.displayName, connection.email],
    emailsVisible,
    connection.provider
  );

  // OAuth token expiry — informative only. Shown small/blue for connections that
  // expose a concrete token expiry (e.g. Codex), so an operator can see at a
  // glance when the access token rotates. Hidden for API-key / no-expiry connections.
  // #11497: cookie rows persist a derived cookieExpiresAt when their pasted
  // credential embeds a JWT with an exp claim — surface the same countdown.
  const tokenExpiryIso =
    connection.authType === "oauth"
      ? connection.tokenExpiresAt || connection.expiresAt || null
      : readCookieExpiresAt(connection.providerSpecificData);
  const tokenExpiryMs = tokenExpiryIso ? new Date(tokenExpiryIso).getTime() : NaN;
  const hasTokenExpiry = Number.isFinite(tokenExpiryMs);
  const tokenCountdown = hasTokenExpiry ? formatCountdown(tokenExpiryIso) : null;
  const tokenExpiryLabel = !hasTokenExpiry
    ? null
    : tokenCountdown
      ? translateUsageOrFallback(t, "tokenExpiresIn", `Token expires in ${tokenCountdown}`, {
          time: tokenCountdown,
        })
      : translateUsageOrFallback(t, "tokenExpired", "Token expired");
  const tokenExpiryTitle = hasTokenExpiry ? new Date(tokenExpiryMs).toLocaleString() : undefined;

  return (
    <div className="flex min-h-[62px] items-center justify-between gap-2 px-3 py-2">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <span
          className="inline-flex size-7 shrink-0 items-center justify-center"
          title={cardStatus}
          aria-label={cardStatus}
        >
          <span className={`block size-3.5 rounded-full ${STATUS_DOT_CLASS[cardStatus]}`} />
        </span>
        <div className="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-md">
          <ProviderIcon providerId={connection.provider} size={24} type="color" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="flex h-4 min-w-0 items-center gap-1.5">
            <span
              className="truncate text-[12px] font-semibold leading-4 text-text-main"
              title={providerLabel}
            >
              {providerLabel}
            </span>
            <span
              className="inline-flex h-4 shrink-0 items-center"
              title={
                resolvedPlan
                  ? t("rawPlanWithValue", { plan: resolvedPlan })
                  : t("noPlanFromProvider")
              }
            >
              <Badge variant={tierMeta.variant} size="sm" dot className="h-4 px-1.5 py-0 leading-4">
                {tierMeta.label}
              </Badge>
            </span>
            {hasStaleData && (
              <span className="shrink-0 leading-4 text-warning" title={t("staleQuotaTooltip")}>
                <Icon name="schedule" size={12} ariaLabel={t("staleQuotaTooltip")} />
              </span>
            )}
          </div>
          <span className="text-[11px] text-text-muted truncate" title={accountName ?? ""}>
            {accountName}
          </span>
          {tokenExpiryLabel && (
            <span
              className={`text-[10px] whitespace-normal [overflow-wrap:anywhere] leading-[1.4] ${tokenCountdown ? "text-info" : "text-error"}`}
              title={tokenExpiryTitle}
            >
              {tokenExpiryLabel}
            </span>
          )}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-0.5 self-center">
        <ConnectionTestButton
          connectionId={connection.id}
          disabled={!isActive}
          compact
          onSent={onTestSent}
        />
        <Button
          variant="ghost"
          size="icon-sm"
          disabled={togglingActive}
          onClick={(e) => {
            e.stopPropagation();
            if (togglingActive) return;
            onToggleActive(!isActive);
          }}
          title={toggleActiveLabel}
          aria-label={toggleActiveLabel}
          className={`size-6 min-h-6 ${isActive ? "text-text-muted" : "text-error"}`}
        >
          <Icon name={isActive ? "toggle_on" : "toggle_off"} size={14} />
        </Button>
      </div>
    </div>
  );
}
