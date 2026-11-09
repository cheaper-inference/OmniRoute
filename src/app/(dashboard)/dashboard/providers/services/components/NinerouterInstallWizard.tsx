/**
 * G-09 — Install Wizard for 9Router.
 * Shown only when service state === "not_installed".
 * Calls POST /api/services/9router/install and triggers a status mutate on success.
 */
"use client";

import Icon from "@/shared/components/Icon";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Card, Input } from "@/shared/components";
import { useServiceStatus } from "../hooks/useServiceStatus";

const NAME = "9router";
const DEFAULT_PORT = 20130;

export function NinerouterInstallWizard() {
  const t = useTranslations("embeddedServices");
  const { mutate } = useServiceStatus(NAME);
  const [version, setVersion] = useState("latest");
  const [port, setPort] = useState(String(DEFAULT_PORT));
  const [installing, setInstalling] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function handleInstall() {
    setInstalling(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/services/${NAME}/install`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ version: version.trim() || "latest" }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const errorMsg =
          body?.error?.message ?? body?.message ?? t("installationFailed", { status: res.status });
        setMsg({ ok: false, text: errorMsg });
        return;
      }
      setMsg({ ok: true, text: t("installationSucceeded") });
      mutate();
    } catch {
      setMsg({ ok: false, text: t("networkInstallFailed") });
    } finally {
      setInstalling(false);
    }
  }

  return (
    <Card padding="md">
      <div className="flex items-center gap-3 mb-4">
        <div className="size-8 rounded-lg flex items-center justify-center border border-border bg-bg-subtle text-text-main">
          <Icon name="download" size={20} />
        </div>
        <div>
          <h3 className="font-medium text-sm">{t("install9Router")}</h3>
          <p className="text-xs text-text-muted">{t("install9RouterDescription")}</p>
        </div>
      </div>

      <div className="space-y-4">
        <Input
          id="ninerouter-version"
          label={t("version")}
          hint={t("versionHint")}
          value={version}
          onChange={(e) => setVersion(e.target.value)}
          placeholder="latest"
          disabled={installing}
        />

        <Input
          id="ninerouter-port"
          type="number"
          label={t("servicePort")}
          hint={t("servicePortHint")}
          value={port}
          onChange={(e) => setPort(e.target.value)}
          min={1024}
          max={65535}
          disabled={installing}
        />

        {/* Message */}
        {msg && (
          <div
            className={`flex items-center gap-1.5 px-2 py-1.5 rounded text-xs ${
              msg.ok ? "bg-success/10 text-success" : "bg-error/10 text-error"
            }`}
          >
            <Icon name={msg.ok ? "check_circle" : "error"} size={12} />
            {msg.text}
          </div>
        )}

        {/* Install button */}
        <Button onClick={handleInstall} loading={installing} fullWidth>
          {installing ? t("installing") : t("install9Router")}
        </Button>
      </div>
    </Card>
  );
}
