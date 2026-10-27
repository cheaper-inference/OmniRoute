"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Input, Modal } from "@/shared/components";
import Icon from "@/shared/components/Icon";

interface DenoRelayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeployed: (poolProxyId: string, relayUrl: string) => void;
}

export default function DenoRelayModal({ isOpen, onClose, onDeployed }: DenoRelayModalProps) {
  const t = useTranslations("settings");
  const [denoToken, setDenoToken] = useState("");
  const [orgDomain, setOrgDomain] = useState("");
  const [projectName, setProjectName] = useState(
    process.env.NEXT_PUBLIC_DENO_RELAY_DEFAULT_PROJECT || "omniroute-deno-relay"
  );
  const [deploying, setDeploying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeploy = async () => {
    if (!denoToken.trim()) {
      setError(t("denoRelayTokenRequired"));
      return;
    }
    if (!orgDomain.trim()) {
      setError(t("denoRelayOrgDomainRequired"));
      return;
    }
    setDeploying(true);
    setError(null);
    try {
      const res = await fetch("/api/settings/proxy/deno-deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          denoToken: denoToken.trim(),
          orgDomain: orgDomain.trim(),
          projectName: projectName.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error?.message || t("denoRelayDeployFailed"));
      } else {
        setDenoToken("");
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
          <Icon name="terminal" />
          {t("denoRelayModalTitle")}
        </span>
      }
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose} disabled={deploying}>
            {t("cancel")}
          </Button>
          <Button variant="primary" size="sm" onClick={handleDeploy} loading={deploying}>
            {deploying ? t("denoRelayDeploying") : t("denoRelayDeploy")}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="rounded border border-warning/30 bg-warning-bg p-3 text-xs text-text-main space-y-1">
          {t("denoRelayWarning")}
        </div>

        <div className="space-y-3">
          <Input
            id="deno-token"
            type="password"
            label={t("denoRelayTokenLabel")}
            value={denoToken}
            onChange={(e) => setDenoToken(e.target.value)}
            placeholder="ddo_..."
            hint={t("denoRelayTokenHint")}
            autoComplete="off"
          />
          <Input
            id="deno-org-domain"
            type="text"
            label={t("denoRelayOrgDomainLabel")}
            value={orgDomain}
            onChange={(e) => setOrgDomain(e.target.value)}
            placeholder="your-org.deno.net"
            hint={t("denoRelayOrgDomainHint")}
          />
          <Input
            id="deno-project-name"
            type="text"
            label={t("denoRelayProjectNameLabel")}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="omniroute-deno-relay"
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

        <p className="text-xs text-text-muted">{t("denoRelayFreeTierNote")}</p>
      </div>
    </Modal>
  );
}
