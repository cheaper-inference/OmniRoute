"use client";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components";
import ConnectionTestButton from "@/shared/components/ConnectionTestButton";
import type { ConnectionRowProps } from "./connectionRowTypes";
import ProviderActionsMenu from "./ProviderActionsMenu";
import CodexResetCreditsAction from "./CodexResetCreditsAction";
import CodexPingNowButton from "./CodexPingNowButton";

export default function CodexAccountActions(props: ConnectionRowProps) {
  const t = useTranslations("providers");
  const { connection } = props;
  const disabled = connection.isActive === false;
  return (
    <ProviderActionsMenu>
      {connection.quotaVisible !== false && props.onRefreshQuota && (
        <Button
          size="sm"
          variant="ghost"
          icon="refresh"
          onClick={props.onRefreshQuota}
          loading={props.quotaRefreshing}
          disabled={props.quotaRefreshing}
        >
          {t("quotaRefresh")}
        </Button>
      )}
      {connection.quotaVisible !== false && (
        <CodexResetCreditsAction
          connectionId={connection.id}
          count={props.quotaCache?.bankedResetCredits}
          onRefresh={props.onRefreshQuota}
        />
      )}
      <div className="my-1 border-t border-border" />
      <ConnectionTestButton connectionId={connection.id} disabled={disabled} />
      <Button
        variant="ghost"
        size="sm"
        icon="refresh"
        onClick={props.onRetest}
        disabled={disabled || props.isRetesting}
        loading={props.isRetesting}
      >
        {t("retest")}
      </Button>
      {props.onRefreshToken && (
        <Button
          variant="ghost"
          size="sm"
          icon="token"
          onClick={props.onRefreshToken}
          disabled={disabled || props.isRefreshing}
          loading={props.isRefreshing}
        >
          {t("refreshOauthTokenTitle")}
        </Button>
      )}
      {props.isOAuth && connection.provider === "codex" && (
        <CodexPingNowButton connectionId={connection.id} disabled={disabled} />
      )}
      {props.onApplyCodexAuthLocal && (
        <Button
          variant="ghost"
          size="sm"
          icon="download_done"
          onClick={props.onApplyCodexAuthLocal}
          disabled={props.isApplyingCodexAuthLocal}
          loading={props.isApplyingCodexAuthLocal}
        >
          {t("applyCodexAuthLocal")}
        </Button>
      )}
      {props.onExportCodexAuthFile && (
        <Button
          variant="ghost"
          size="sm"
          icon="download"
          onClick={props.onExportCodexAuthFile}
          disabled={props.isExportingCodexAuthFile}
          loading={props.isExportingCodexAuthFile}
        >
          {t("exportCodexAuthFile")}
        </Button>
      )}
      {props.onReauth && (
        <Button variant="ghost" size="sm" icon="passkey" onClick={props.onReauth}>
          {t("reauthenticateConnection")}
        </Button>
      )}
      <div className="my-1 border-t border-border" />
      <Button
        variant="ghost"
        size="sm"
        icon={disabled ? "toggle_on" : "toggle_off"}
        onClick={() => props.onToggleActive(disabled)}
      >
        {t(disabled ? "enableConnection" : "disableConnection")}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        icon="edit"
        aria-label={t("edit")}
        title={t("edit")}
        onClick={props.onEdit}
      >
        {t("edit")}
      </Button>
      {props.onProxy && (
        <Button variant="ghost" size="sm" icon="vpn_lock" onClick={props.onProxy}>
          {t("proxyConfig")}
        </Button>
      )}
      <div className="my-1 border-t border-border" />
      <Button
        variant="ghost"
        size="sm"
        icon="delete"
        aria-label={t("delete")}
        title={t("delete")}
        onClick={props.onDelete}
        className="text-error"
      >
        {t("delete")}
      </Button>
    </ProviderActionsMenu>
  );
}
