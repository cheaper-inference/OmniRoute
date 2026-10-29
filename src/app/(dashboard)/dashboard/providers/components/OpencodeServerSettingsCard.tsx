"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import Icon from "@/shared/components/Icon";
import { Card, Input } from "@/shared/components";

const DEFAULT_URL = "http://127.0.0.1:4096";

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function StatusBanner({ ok, text }: { ok: boolean; text: string }) {
  return (
    <div
      className={`flex items-center gap-1.5 mb-3 px-2 py-1.5 rounded text-xs ${
        ok ? "bg-success/10 text-success" : "bg-error/10 text-error"
      }`}
    >
      <Icon name={ok ? "check_circle" : "error"} size={12} />
      {text}
    </div>
  );
}

/**
 * Connection settings for the opencode CLI's headless server (`opencode serve`).
 *
 * The URL is optional: with it empty the executor falls back to
 * OPENCODE_SERVER_URL / http://127.0.0.1:4096. The CLI binary is deliberately
 * not editable here — it comes from OPENCODE_SERVER_BIN or the usual install
 * locations, so a dashboard setting can never choose what the server executes.
 *
 * The value is edited locally and persisted on blur / Enter (one PATCH per edit,
 * not one per keystroke, so a half-typed URL is never saved).
 */
export default function OpencodeServerSettingsCard() {
  const t = useTranslations("embeddedServices");
  const [url, setUrl] = useState(DEFAULT_URL);
  const [savedUrl, setSavedUrl] = useState(DEFAULT_URL);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data: Record<string, unknown>) => {
        const loadedUrl =
          typeof data.opencode_server_url === "string" ? data.opencode_server_url : DEFAULT_URL;
        setUrl(loadedUrl);
        setSavedUrl(loadedUrl);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const commitUrl = useCallback(async () => {
    const trimmed = url.trim();
    if (trimmed === savedUrl) return;
    if (trimmed !== "" && !isValidUrl(trimmed)) {
      setMsg({ ok: false, text: t("invalidUrl") });
      return;
    }
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ opencode_server_url: trimmed }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setUrl(trimmed);
      setSavedUrl(trimmed);
      setMsg({ ok: true, text: t("saved") });
    } catch {
      setMsg({ ok: false, text: t("saveFailed") });
    } finally {
      setSaving(false);
    }
  }, [url, savedUrl, t]);

  if (!loaded) return null;

  return (
    <Card padding="md">
      <div className="flex items-center gap-3 mb-4">
        <div className="size-8 rounded-lg flex items-center justify-center bg-warning/10">
          <Icon name="terminal" size={20} className="text-warning" />
        </div>
        <div>
          <h3 className="font-medium text-sm">{t("opencodeServerConnection")}</h3>
          <p className="text-xs text-text-muted">{t("opencodeServerConnectionDescription")}</p>
        </div>
      </div>

      {msg && <StatusBanner ok={msg.ok} text={msg.text} />}

      <div className="space-y-4">
        <div>
          <label className="text-xs text-text-muted mb-1.5 block">{t("opencodeServerUrl")}</label>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onBlur={() => void commitUrl()}
            onKeyDown={(e) => {
              if (e.key === "Enter") void commitUrl();
            }}
            placeholder={DEFAULT_URL}
            disabled={saving}
          />
          <p className="text-[11px] text-text-muted mt-1">{t("opencodeServerUrlHint")}</p>
        </div>
      </div>
    </Card>
  );
}
