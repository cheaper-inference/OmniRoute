"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Input, Modal } from "@/shared/components";
import Icon from "@/shared/components/Icon";

interface CloudflareRelayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeployed: (poolProxyId: string, relayUrl: string) => void;
}

// Mirrors VercelRelayModal — shares the same x-relay-target/x-relay-auth
// header scheme on the wire, only the deployment surface differs.
export default function CloudflareRelayModal({
  isOpen,
  onClose,
  onDeployed,
}: CloudflareRelayModalProps) {
  const t = useTranslations("settings");
  const [accountId, setAccountId] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [projectName, setProjectName] = useState(
    process.env.NEXT_PUBLIC_CLOUDFLARE_RELAY_DEFAULT_PROJECT || "omniroute-relay"
  );
  const [deploying, setDeploying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeploy = async () => {
    if (!accountId.trim() || !apiToken.trim()) {
      setError(t("cloudflareRelayCredsRequired"));
      return;
    }
    setDeploying(true);
    setError(null);
    try {
      const res = await fetch("/api/settings/proxy/cloudflare-deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountId: accountId.trim(),
          apiToken: apiToken.trim(),
          projectName: projectName.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error?.message || t("cloudflareRelayDeployFailed"));
      } else {
        setApiToken("");
        onDeployed(data.poolProxyId as string, data.relayUrl as string);
        onClose();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t("unknownError"));
    } finally {
      setDeploying(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlay={false}
      title={
        <span className="flex items-center gap-2">
          <Icon name="cloud" />
          {t("cloudflareRelayModalTitle")}
        </span>
      }
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose} disabled={deploying}>
            {t("cancel")}
          </Button>
          <Button variant="primary" size="sm" onClick={handleDeploy} loading={deploying}>
            {deploying ? t("cloudflareRelayDeploying") : t("cloudflareRelayDeploy")}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="rounded border border-warning/30 bg-warning-bg p-3 text-xs text-text-main space-y-1">
          <p>{t("cloudflareRelayWarning")}</p>
          <p className="text-text-muted">{t("cloudflareRelayTokenHowto")}</p>
        </div>

        <div className="space-y-3">
          <Input
            id="cloudflare-account-id"
            type="text"
            label={t("cloudflareRelayAccountIdLabel")}
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            placeholder="your-cloudflare-account-id"
            hint={t("cloudflareRelayAccountIdHint")}
          />
          <Input
            id="cloudflare-api-token"
            type="password"
            label={t("cloudflareRelayApiTokenLabel")}
            value={apiToken}
            onChange={(e) => setApiToken(e.target.value)}
            placeholder="cloudflare-api-token"
            hint={t("cloudflareRelayApiTokenHint")}
            autoComplete="off"
          />
          <Input
            id="cloudflare-project-name"
            type="text"
            label={t("cloudflareRelayProjectNameLabel")}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="omniroute-relay"
          />
        </div>

        {error && (
          <div
            role="alert"
            className="text-sm text-error bg-error-bg border border-error/20 rounded p-2"
          >
            {error}
          </div>
        )}

        <p className="text-xs text-text-muted">{t("cloudflareRelayFreeTierNote")}</p>
      </div>
    </Modal>
  );
}
