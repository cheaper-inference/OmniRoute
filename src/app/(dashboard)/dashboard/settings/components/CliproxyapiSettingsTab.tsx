"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Card, Button, Input, Toggle, Spinner } from "@/shared/components";
import Icon from "@/shared/components/Icon";

interface Settings {
  cliproxyapi_fallback_enabled?: boolean;
  cliproxyapi_url?: string;
  cliproxyapi_fallback_codes?: string;
  [key: string]: unknown;
}

interface VersionManagerEntry {
  tool: string;
  status: string;
  installedVersion: string | null;
  healthStatus: string;
  port: number;
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function CliproxyapiSettingsTab() {
  const t = useTranslations("settings");
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
  const [toolState, setToolState] = useState<VersionManagerEntry | null>(null);
  const [toolStateError, setToolStateError] = useState<string | null>(null);
  // #1934: import CLIProxyAPI auth files (~/.cli-proxy-api/) as OmniRoute connections.
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<string | null>(null);

  const handleImportAuth = useCallback(async () => {
    setImporting(true);
    setImportResult(null);
    try {
      const res = await fetch("/api/oauth/cliproxy-import", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setImportResult(
          t("cliproxyapiImportResult", {
            imported: data.imported ?? 0,
            scanned: data.scanned ?? 0,
            skipped: data.skipped ?? 0,
          })
        );
      } else {
        setImportResult(data.error || t("cliproxyapiImportFailed"));
      }
    } catch {
      setImportResult(t("cliproxyapiImportFailed"));
    } finally {
      setImporting(false);
    }
  }, [t]);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => {
        if (!r.ok) throw new Error(`Settings API returned ${r.status}`);
        return r.json();
      })
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load settings:", err);
        setLoading(false);
      });

    fetch("/api/version-manager/status")
      .then((r) => {
        if (!r.ok) throw new Error(`Version manager API returned ${r.status}`);
        return r.json();
      })
      .then((data) => {
        const entry = Array.isArray(data)
          ? data.find((t: VersionManagerEntry) => t.tool === "cliproxyapi")
          : null;
        setToolState(entry ?? null);
        setToolStateError(null);
      })
      .catch((err) => {
        console.error("Failed to load version manager status:", err);
        setToolStateError("Unable to reach version manager service");
        setToolState(null);
      });
  }, []);

  const updateSetting = useCallback(
    async (key: string, value: boolean | string) => {
      if (key === "cliproxyapi_url" && typeof value === "string" && value.trim() !== "") {
        if (!isValidUrl(value)) {
          setMessage({ type: "error", text: t("cliproxyapiInvalidUrl") });
          return;
        }
      }

      setSaving(true);
      setMessage(null);
      try {
        const res = await fetch("/api/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ [key]: value }),
        });
        if (!res.ok) {
          throw new Error(`Server returned ${res.status}`);
        }
        await res.json();
        setSettings((prev) => ({ ...prev, [key]: value }));
        setMessage({ type: "success", text: t("settingSaved") });
      } catch {
        setMessage({ type: "error", text: t("settingSaveFailed") });
      } finally {
        setSaving(false);
      }
    },
    [t]
  );

  const cpaEnabled = settings.cliproxyapi_fallback_enabled === true;
  const cpaUrl = settings.cliproxyapi_url || "http://127.0.0.1:8317";
  const cpaCodes = settings.cliproxyapi_fallback_codes || "502,401,403,429,503";

  const statusColor =
    toolState?.status === "running"
      ? "text-success"
      : toolState?.status === "error"
        ? "text-error"
        : "text-text-muted";

  const statusIcon =
    toolState?.status === "running"
      ? "check_circle"
      : toolState?.status === "error"
        ? "error"
        : "help";

  return (
    <div className="space-y-4">
      {/* Migration banner — new lifecycle management lives in the Services page */}
      <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg border border-info/30 bg-info-bg text-text-main text-xs">
        <Icon name="info" size={14} className="mt-0.5 text-info" />
        <span>
          {t("cliproxyapiLifecycleNoticeBefore")}{" "}
          <Link
            href="/dashboard/providers/services"
            className="underline underline-offset-2 hover:opacity-80"
          >
            {t("cliproxyapiLifecycleNoticeLink")}
          </Link>
          {t("cliproxyapiLifecycleNoticeAfter")}
        </span>
      </div>

      {message && (
        <div
          role={message.type === "success" ? "status" : "alert"}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${
            message.type === "success" ? "bg-success-bg text-success" : "bg-error-bg text-error"
          }`}
        >
          <Icon name={message.type === "success" ? "check_circle" : "error"} size={14} />
          {message.text}
        </div>
      )}

      <Card
        padding="md"
        icon="swap_horiz"
        title={t("cliproxyapiFallback")}
        subtitle={t("cliproxyapiFallbackDescription")}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-text-main">{t("cliproxyapiEnableFallback")}</span>
            <Toggle
              ariaLabel={t("cliproxyapiEnableFallback")}
              checked={cpaEnabled}
              onChange={(checked) => updateSetting("cliproxyapi_fallback_enabled", checked)}
            />
          </div>

          {cpaEnabled && (
            <>
              <Input
                label={t("cliproxyapiUrl")}
                value={cpaUrl}
                onChange={(e) => updateSetting("cliproxyapi_url", e.target.value)}
                placeholder="http://127.0.0.1:8317"
                className="w-full"
              />

              <Input
                label={t("cliproxyapiFallbackCodes")}
                value={cpaCodes}
                onChange={(e) => updateSetting("cliproxyapi_fallback_codes", e.target.value)}
                placeholder="502,401,403,429,503"
                className="w-full"
              />
            </>
          )}
        </div>
      </Card>

      <Card padding="md" title={t("cliproxyapiStatus")}>
        {loading ? (
          <div className="flex items-center gap-2 text-text-muted text-sm">
            <Spinner size="sm" />
            {t("loading")}
          </div>
        ) : toolStateError ? (
          <p className="text-sm text-text-muted">{toolStateError}</p>
        ) : toolState ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-bg-subtle">
              <p className="text-xs text-text-muted mb-1">{t("cliproxyapiStatusLabel")}</p>
              <div className="flex items-center gap-1.5">
                <Icon name={statusIcon} size={14} className={statusColor} />
                <p className={`text-sm font-medium capitalize ${statusColor}`}>
                  {toolState.status?.replace("_", " ") || t("cliproxyapiUnknown")}
                </p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-bg-subtle">
              <p className="text-xs text-text-muted mb-1">{t("cliproxyapiVersion")}</p>
              <p className="text-sm font-medium">
                {toolState.installedVersion ? `v${toolState.installedVersion}` : t("notInstalled")}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-bg-subtle">
              <p className="text-xs text-text-muted mb-1">{t("cliproxyapiHealth")}</p>
              <p
                className={`text-sm font-medium ${
                  toolState.healthStatus === "healthy"
                    ? "text-success"
                    : toolState.healthStatus === "unhealthy"
                      ? "text-error"
                      : "text-text-muted"
                }`}
              >
                {toolState.healthStatus === "healthy"
                  ? t("healthy")
                  : toolState.healthStatus === "unhealthy"
                    ? t("unhealthy")
                    : t("unknown")}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-bg-subtle">
              <p className="text-xs text-text-muted mb-1">{t("cliproxyapiPort")}</p>
              <p className="text-sm font-mono">{toolState.port || 8317}</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-text-muted">{t("cliproxyapiNotDetected")}</p>
        )}
      </Card>

      <Card
        padding="md"
        title={t("cliproxyapiImportAuthTitle")}
        subtitle={t("cliproxyapiImportAuthDesc")}
      >
        <Button onClick={handleImportAuth} loading={importing} disabled={importing}>
          {t("cliproxyapiImportAuthButton")}
        </Button>
        {importResult ? (
          <p className="text-sm text-text-muted mt-3" role="status">
            {importResult}
          </p>
        ) : null}
      </Card>
    </div>
  );
}
