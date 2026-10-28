"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Input, Modal } from "@/shared/components";
import Icon from "@/shared/components/Icon";

interface VercelRelayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeployed: (poolProxyId: string, relayUrl: string) => void;
}

export default function VercelRelayModal({ isOpen, onClose, onDeployed }: VercelRelayModalProps) {
  const t = useTranslations("settings");
  const [token, setToken] = useState("");
  const [projectName, setProjectName] = useState(
    process.env.NEXT_PUBLIC_VERCEL_RELAY_DEFAULT_PROJECT || "omniroute-relay"
  );
  const [deploying, setDeploying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeploy = async () => {
    if (!token.trim()) {
      setError(t("vercelRelayTokenRequired"));
      return;
    }
    setDeploying(true);
    setError(null);
    try {
      const res = await fetch("/api/settings/proxy/vercel-deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token.trim(), projectName: projectName.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error?.message || t("vercelRelayDeployFailed"));
      } else {
        setToken("");
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
          <Icon name="cloud_upload" />
          {t("vercelRelayModalTitle")}
        </span>
      }
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose} disabled={deploying}>
            {t("cancel")}
          </Button>
          <Button variant="primary" size="sm" onClick={handleDeploy} loading={deploying}>
            {deploying ? t("vercelRelayDeploying") : t("vercelRelayDeploy")}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="rounded border border-warning/30 bg-warning-bg p-3 text-xs text-text-main space-y-1">
          {t("vercelRelayWarning")}
        </div>

        <div className="space-y-3">
          <Input
            id="vercel-token"
            type="password"
            label={t("vercelRelayTokenLabel")}
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="vercel_pat_..."
            hint={t("vercelRelayTokenHint")}
            autoComplete="off"
          />
          <Input
            id="vercel-project-name"
            type="text"
            label={t("vercelRelayProjectNameLabel")}
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

        <p className="text-xs text-text-muted">{t("vercelRelayFreeTierNote")}</p>
      </div>
    </Modal>
  );
}
