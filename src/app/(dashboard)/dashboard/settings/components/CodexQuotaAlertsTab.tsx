"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, Toggle } from "@/shared/components";
import Icon from "@/shared/components/Icon";

export default function CodexQuotaAlertsTab() {
  const t = useTranslations("settings");
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"" | "saved" | "error">("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/settings")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled) return;
        setEnabled(data?.codexQuotaAlerts?.enabled === true);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const save = async (next: boolean) => {
    if (saving || loading) return;
    const previous = enabled;
    setEnabled(next);
    setSaving(true);
    setStatus("");
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codexQuotaAlerts: { enabled: next } }),
      });
      if (!res.ok) throw new Error("save failed");
      setStatus("saved");
    } catch {
      setEnabled(previous);
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card
      icon="notifications"
      title={t("codexQuotaAlertsTitle")}
      subtitle={t("codexQuotaAlertsDesc")}
      action={
        <div className="flex items-center gap-3">
          {status === "saved" && (
            <span
              role="status"
              className="text-xs font-medium text-success flex items-center gap-1"
            >
              <Icon name="check_circle" size={14} /> {t("saved")}
            </span>
          )}
          {status === "error" && (
            <span role="alert" className="text-xs font-medium text-error flex items-center gap-1">
              <Icon name="error" size={14} /> {t("codexQuotaAlertsSaveError")}
            </span>
          )}
          <Toggle
            checked={enabled}
            onChange={(value) => void save(value)}
            disabled={loading || saving}
            ariaLabel={t("codexQuotaAlertsTitle")}
          />
        </div>
      }
    >
      <p className="text-xs text-text-muted flex items-start gap-1.5 leading-relaxed">
        <Icon name="info" size={14} className="mt-0.5" />
        <span>{t("codexQuotaAlertsHint")}</span>
      </p>
    </Card>
  );
}
