"use client";

import Icon from "@/shared/components/Icon";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Card, Toggle, Input } from "@/shared/components";

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

interface FallbackSettings {
  cliproxyapi_fallback_enabled: boolean;
  cliproxyapi_url: string;
  cliproxyapi_fallback_codes: string;
}

export function CliproxyConnectionPanel() {
  const t = useTranslations("embeddedServices");
  const [settings, setSettings] = useState<FallbackSettings>({
    cliproxyapi_fallback_enabled: false,
    cliproxyapi_url: "http://127.0.0.1:8317",
    cliproxyapi_fallback_codes: "502,401,403,429,503",
  });
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data: Record<string, unknown>) => {
        setSettings({
          cliproxyapi_fallback_enabled: data.cliproxyapi_fallback_enabled === true,
          cliproxyapi_url:
            typeof data.cliproxyapi_url === "string"
              ? data.cliproxyapi_url
              : "http://127.0.0.1:8317",
          cliproxyapi_fallback_codes:
            typeof data.cliproxyapi_fallback_codes === "string"
              ? data.cliproxyapi_fallback_codes
              : "502,401,403,429,503",
        });
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const saveSetting = useCallback(
    async (key: string, value: boolean | string) => {
      if (key === "cliproxyapi_url" && typeof value === "string" && value.trim() !== "") {
        if (!isValidUrl(value)) {
          setMsg({ ok: false, text: t("invalidUrl") });
          return;
        }
      }
      setSaving(true);
      setMsg(null);
      try {
        const res = await fetch("/api/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ [key]: value }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setSettings((prev) => ({ ...prev, [key]: value }));
        setMsg({ ok: true, text: t("saved") });
      } catch {
        setMsg({ ok: false, text: t("saveFailed") });
      } finally {
        setSaving(false);
      }
    },
    [t]
  );

  if (!loaded) return null;

  return (
    <Card padding="md">
      <div className="flex items-center gap-3 mb-4">
        <div className="size-8 rounded-lg flex items-center justify-center border border-border bg-bg-subtle text-text-main">
          <Icon name="swap_horiz" size={20} />
        </div>
        <div>
          <h3 className="font-medium text-sm">{t("fallbackRouting")}</h3>
          <p className="text-xs text-text-muted">{t("fallbackRoutingDescription")}</p>
        </div>
      </div>

      {msg && (
        <div
          className={`flex items-center gap-1.5 mb-3 px-2 py-1.5 rounded text-xs ${
            msg.ok ? "bg-success/10 text-success" : "bg-error/10 text-error"
          }`}
        >
          <Icon name={msg.ok ? "check_circle" : "error"} size={12} />
          {msg.text}
        </div>
      )}

      <div className="space-y-4">
        <Toggle
          label={t("enableFallback")}
          checked={settings.cliproxyapi_fallback_enabled}
          onChange={(v) => saveSetting("cliproxyapi_fallback_enabled", v)}
          disabled={saving}
        />

        {settings.cliproxyapi_fallback_enabled && (
          <>
            <Input
              label={t("cliproxyUrl")}
              value={settings.cliproxyapi_url}
              onChange={(e) => saveSetting("cliproxyapi_url", e.target.value)}
              placeholder="http://127.0.0.1:8317"
            />
            <Input
              label={t("fallbackCodes")}
              value={settings.cliproxyapi_fallback_codes}
              onChange={(e) => saveSetting("cliproxyapi_fallback_codes", e.target.value)}
              placeholder="502,401,403,429,503"
            />
          </>
        )}
      </div>
    </Card>
  );
}
