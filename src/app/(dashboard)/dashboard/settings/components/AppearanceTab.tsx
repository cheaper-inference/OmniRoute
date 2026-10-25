"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { RadioGroup, RadioGroupItem } from "@omniroute/ui-kit/radio-group";
import { Button, Card, Input, Toggle } from "@/shared/components";
import Icon from "@/shared/components/Icon";
import { useTheme } from "@/shared/hooks/useTheme";
import { useIsElectron } from "@/shared/hooks/useElectron";
import {
  COMBO_CONFIG_MODE_SETTING_KEY,
  normalizeComboConfigMode,
  type ComboConfigMode,
} from "@/shared/constants/comboConfigMode";
import AccountEmailVisibilitySetting from "./AccountEmailVisibilitySetting";

export default function AppearanceTab() {
  const { theme, setTheme, isDark } = useTheme();
  const t = useTranslations("settings");

  const isElectron = useIsElectron();
  const [autostartEnabled, setAutostartEnabled] = useState(false);
  const logoFileRef = useRef<HTMLInputElement>(null);
  const faviconFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isElectron && window.electronAPI) {
      window.electronAPI.getAutostartStatus().then(setAutostartEnabled).catch(console.error);
    }
  }, [isElectron]);
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [uploadError, setUploadError] = useState<{
    target: "logo" | "favicon";
    message: string;
  } | null>(null);
  const showQuickStartOnHome = settings.showQuickStartOnHome !== false;
  const showProviderTopologyOnHome = settings.showProviderTopologyOnHome !== false;
  const autoRefreshProviderQuota = settings.autoRefreshProviderQuota === true;
  const autoRefreshProviderQuotaInterval = Number.isFinite(
    settings.autoRefreshProviderQuotaInterval
  )
    ? Number(settings.autoRefreshProviderQuotaInterval)
    : 180;
  const comboConfigMode = normalizeComboConfigMode(settings[COMBO_CONFIG_MODE_SETTING_KEY]);
  const showCloudflaredTunnel = settings.hideEndpointCloudflaredTunnel !== true;
  const showTailscaleFunnel = settings.hideEndpointTailscaleFunnel !== true;
  const showNgrokTunnel = settings.hideEndpointNgrokTunnel !== true;

  const getSettingsLabel = (key: string, fallback: string) =>
    typeof t.has === "function" && t.has(key) ? t(key) : fallback;

  const themeOptionLabels: Record<string, string> = {
    light: t("themeLight"),
    dark: t("themeDark"),
    system: t("themeSystem"),
  };

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateSetting = async (key: string, value: any) => {
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: value }),
      });
      if (res.ok) {
        setSettings((prev) => ({ ...prev, [key]: value }));
      }
    } catch (err) {
      console.error("Failed to update", key, err);
    }
  };

  const comboConfigModeOptions: Array<{
    id: ComboConfigMode;
    icon: string;
    title: string;
    description: string;
  }> = [
    {
      id: "guided",
      icon: "route",
      title: getSettingsLabel("comboConfigModeGuided", "Guided"),
      description: getSettingsLabel(
        "comboConfigModeGuidedDesc",
        "Use the current step-by-step combo builder."
      ),
    },
    {
      id: "expert",
      icon: "tune",
      title: getSettingsLabel("comboConfigModeExpert", "Expert"),
      description: getSettingsLabel(
        "comboConfigModeExpertDesc",
        "Show every combo option on one page and enable direct model entry."
      ),
    },
  ];

  const quotaRefreshInterval = Number.isFinite(autoRefreshProviderQuotaInterval)
    ? Math.min(3600, Math.max(10, Math.floor(autoRefreshProviderQuotaInterval)))
    : 180;

  return (
    <Card title={t("appearance")} icon="palette">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">{t("darkMode")}</p>
            <p className="text-sm text-text-muted">{t("switchThemes")}</p>
          </div>
          <Toggle
            checked={isDark}
            onChange={() => setTheme(isDark ? "light" : "dark")}
            ariaLabel={t("darkMode")}
          />
        </div>

        <div className="pt-4 border-t border-border">
          <RadioGroup
            aria-label={t("themeSelectionAria")}
            orientation="horizontal"
            value={theme}
            onValueChange={(next) => setTheme(next)}
          >
            {["light", "dark", "system"].map((option) => (
              <RadioGroupItem
                key={option}
                card
                value={option}
                label={
                  <span className="flex items-center gap-2">
                    <Icon
                      name={
                        option === "light"
                          ? "light_mode"
                          : option === "dark"
                            ? "dark_mode"
                            : "contrast"
                      }
                      size={18}
                    />
                    {themeOptionLabels[option] || option}
                  </span>
                }
              />
            ))}
          </RadioGroup>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="mb-3">
            <p className="font-medium">
              {getSettingsLabel("homePinProviderQuotaToHome", "Pin Information to Home Page")}
            </p>
            <p className="text-sm text-text-muted">{t("homePinnedSectionsDesc")}</p>
          </div>

          <div className="rounded-lg border border-border bg-surface/40 overflow-hidden">
            <div className="divide-y divide-border/70">
              <div className="flex items-start justify-between gap-4 px-4 py-3">
                <div>
                  <p className="font-medium">{getSettingsLabel("homeQuickStart", "Quick Start")}</p>
                  <p className="text-sm text-text-muted">
                    {getSettingsLabel(
                      "homeQuickStartDesc",
                      "Show the Quick Start panel on the Home page."
                    )}
                  </p>
                </div>
                <Toggle
                  checked={showQuickStartOnHome}
                  ariaLabel={getSettingsLabel("homeQuickStart", "Quick Start")}
                  onChange={async (checked) => {
                    await updateSetting("showQuickStartOnHome", checked);
                  }}
                  disabled={loading}
                />
              </div>

              <div className="flex items-start justify-between gap-4 px-4 py-3">
                <div>
                  <p className="font-medium">
                    {getSettingsLabel("homeProviderTopology", "Provider Topology")}
                  </p>
                  <p className="text-sm text-text-muted">
                    {getSettingsLabel(
                      "homeProviderTopologyDesc",
                      "Show the Provider Topology on the Home page."
                    )}
                  </p>
                </div>
                <Toggle
                  checked={showProviderTopologyOnHome}
                  ariaLabel={getSettingsLabel("homeProviderTopology", "Provider Topology")}
                  onChange={async (checked) => {
                    await updateSetting("showProviderTopologyOnHome", checked);
                  }}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="mb-3">
            <p className="font-medium">
              {getSettingsLabel("endpointTunnelVisibility", "Endpoint tunnel visibility")}
            </p>
            <p className="text-sm text-text-muted">
              {getSettingsLabel(
                "endpointTunnelVisibilityDesc",
                "Hide tunnel controls from the Endpoint page without changing tunnel state."
              )}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface/40 divide-y divide-border/70">
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <div>
                <p className="font-medium">
                  {getSettingsLabel("showCloudflareTunnel", "Cloudflare Quick Tunnel")}
                </p>
                <p className="text-sm text-text-muted">
                  {getSettingsLabel(
                    "showCloudflareTunnelDesc",
                    "Show Cloudflare Quick Tunnel controls on the Endpoint page."
                  )}
                </p>
              </div>
              <Toggle
                checked={showCloudflaredTunnel}
                ariaLabel={getSettingsLabel("showCloudflareTunnel", "Cloudflare Quick Tunnel")}
                onChange={(checked) => updateSetting("hideEndpointCloudflaredTunnel", !checked)}
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <div>
                <p className="font-medium">
                  {getSettingsLabel("showTailscaleFunnel", "Tailscale Funnel")}
                </p>
                <p className="text-sm text-text-muted">
                  {getSettingsLabel(
                    "showTailscaleFunnelDesc",
                    "Show Tailscale Funnel controls on the Endpoint page."
                  )}
                </p>
              </div>
              <Toggle
                checked={showTailscaleFunnel}
                ariaLabel={getSettingsLabel("showTailscaleFunnel", "Tailscale Funnel")}
                onChange={(checked) => updateSetting("hideEndpointTailscaleFunnel", !checked)}
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <div>
                <p className="font-medium">{getSettingsLabel("showNgrokTunnel", "ngrok Tunnel")}</p>
                <p className="text-sm text-text-muted">
                  {getSettingsLabel(
                    "showNgrokTunnelDesc",
                    "Show ngrok Tunnel controls on the Endpoint page."
                  )}
                </p>
              </div>
              <Toggle
                checked={showNgrokTunnel}
                ariaLabel={getSettingsLabel("showNgrokTunnel", "ngrok Tunnel")}
                onChange={(checked) => updateSetting("hideEndpointNgrokTunnel", !checked)}
                disabled={loading}
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="mb-3">
            <p className="font-medium">
              {getSettingsLabel("comboConfigMode", "Combo configuration mode")}
            </p>
            <p className="text-sm text-text-muted">
              {getSettingsLabel(
                "comboConfigModeDesc",
                "Choose how the combo create and edit dialog is organized."
              )}
            </p>
          </div>

          <RadioGroup
            aria-label={getSettingsLabel("comboConfigMode", "Combo configuration mode")}
            orientation="horizontal"
            value={comboConfigMode}
            onValueChange={(next) => updateSetting(COMBO_CONFIG_MODE_SETTING_KEY, next)}
            disabled={loading}
          >
            {comboConfigModeOptions.map((option) => (
              <RadioGroupItem
                key={option.id}
                card
                value={option.id}
                label={
                  <span className="flex items-center gap-2">
                    <Icon name={option.icon} size={18} />
                    {option.title}
                  </span>
                }
                description={option.description}
              />
            ))}
          </RadioGroup>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="mb-3">
            <p className="font-medium">
              {getSettingsLabel("providerQuotaAutoRefresh", "Provider Quota auto refresh")}
            </p>
            <p className="text-sm text-text-muted">
              {getSettingsLabel(
                "providerQuotaAutoRefreshDesc",
                "Refresh the Provider Limits view automatically while it stays open."
              )}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface/40 divide-y divide-border/70">
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <div>
                <p className="font-medium">
                  {getSettingsLabel("providerQuotaAutoRefreshToggle", "Automatic refresh")}
                </p>
                <p className="text-sm text-text-muted">
                  {getSettingsLabel(
                    "providerQuotaAutoRefreshToggleDesc",
                    "Refresh the quota view every few minutes while the page is visible."
                  )}
                </p>
              </div>
              <Toggle
                checked={autoRefreshProviderQuota}
                ariaLabel={getSettingsLabel("providerQuotaAutoRefreshToggle", "Automatic refresh")}
                onChange={async (checked) => {
                  if (checked && !settings.autoRefreshProviderQuotaInterval) {
                    await updateSetting("autoRefreshProviderQuotaInterval", 180);
                  }
                  await updateSetting("autoRefreshProviderQuota", checked);
                }}
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <div>
                <p className="font-medium">
                  {getSettingsLabel("providerQuotaAutoRefreshInterval", "Refresh interval")}
                </p>
                <p className="text-sm text-text-muted">
                  {getSettingsLabel(
                    "providerQuotaAutoRefreshIntervalDesc",
                    "How often the quota view should refresh, in seconds."
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  aria-label={getSettingsLabel(
                    "providerQuotaAutoRefreshInterval",
                    "Refresh interval"
                  )}
                  min={10}
                  max={3600}
                  step={10}
                  value={quotaRefreshInterval}
                  onChange={async (e) => {
                    const next = Math.min(3600, Math.max(10, Number(e.target.value) || 180));
                    await updateSetting("autoRefreshProviderQuotaInterval", next);
                  }}
                  disabled={loading || !autoRefreshProviderQuota}
                  className="w-28 shrink-0"
                />
                <span className="text-xs text-text-muted">{t("seconds")}</span>
              </div>
            </div>
          </div>
        </div>

        <AccountEmailVisibilitySetting />

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t("hideHealthLogs")}</p>
              <p className="text-sm text-text-muted">{t("hideHealthLogsDesc")}</p>
            </div>
            <Toggle
              checked={settings.hideHealthCheckLogs === true}
              ariaLabel={t("hideHealthLogs")}
              onChange={() => updateSetting("hideHealthCheckLogs", !settings.hideHealthCheckLogs)}
              disabled={loading}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-control bg-bg-subtle text-text-muted">
              <Icon name="badge" size={20} />
            </span>
            <div>
              <h4 className="font-semibold">{t("whitelabeling")}</h4>
              <p className="text-sm text-text-muted">{t("whitelabelingDesc")}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{t("appName")}</p>
                <p className="text-sm text-text-muted">{t("appNameDesc")}</p>
              </div>
              <Input
                type="text"
                aria-label={t("appName")}
                value={settings.instanceName || "OmniRoute"}
                onChange={(e) => updateSetting("instanceName", e.target.value)}
                placeholder="OmniRoute"
                maxLength={100}
                className="w-48 shrink-0"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div>
                <p className="font-medium">{t("customLogo")}</p>
                <p className="text-sm text-text-muted">{t("customLogoDesc")}</p>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  aria-label={t("customLogo")}
                  value={settings.customLogoUrl || ""}
                  onChange={(e) => updateSetting("customLogoUrl", e.target.value)}
                  className="flex-1"
                  placeholder="https://example.com/logo.png"
                  maxLength={2000}
                />
                {(settings.customLogoUrl || settings.customLogoBase64) && (
                  <img
                    src={settings.customLogoBase64 || settings.customLogoUrl}
                    alt={t("appearanceLogoPreviewAlt")}
                    className="h-10 w-10 rounded border border-border object-contain bg-surface"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-medium">{t("uploadLogo")}</p>
              <div className="flex items-center gap-2">
                <Input
                  ref={logoFileRef}
                  type="file"
                  aria-label={t("uploadLogo")}
                  accept="image/png,image/jpeg,image/svg+xml,image/gif,image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.size > 500 * 1024) {
                        setUploadError({ target: "logo", message: t("logoFileTooLarge") });
                        return;
                      }
                      const validTypes = [
                        "image/png",
                        "image/jpeg",
                        "image/svg+xml",
                        "image/gif",
                        "image/webp",
                      ];
                      if (!validTypes.includes(file.type)) {
                        setUploadError({ target: "logo", message: t("invalidLogoFileType") });
                        return;
                      }
                      setUploadError(null);
                      const reader = new FileReader();
                      reader.onerror = () => {
                        setUploadError({ target: "logo", message: t("failedToReadFile") });
                      };
                      reader.onload = (event) => {
                        const base64 = event.target?.result as string;
                        updateSetting("customLogoBase64", base64);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                  tabIndex={-1}
                />
                <Button
                  variant="outline"
                  icon="upload"
                  onClick={() => logoFileRef.current?.click()}
                >
                  {t("uploadLogo")}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    updateSetting("customLogoUrl", "");
                    updateSetting("customLogoBase64", "");
                  }}
                >
                  {t("resetLogo")}
                </Button>
              </div>
              {uploadError?.target === "logo" && (
                <p role="alert" className="text-sm text-error">
                  {uploadError.message}
                </p>
              )}
              {(settings.customLogoBase64 || settings.customLogoUrl) && (
                <div className="mt-2 p-3 bg-bg-subtle rounded-lg">
                  <p className="text-xs text-text-muted mb-2">{t("logoPreview")}</p>
                  <img
                    src={settings.customLogoBase64 || settings.customLogoUrl}
                    alt={t("appearanceLogoPreviewAlt")}
                    className="h-12 w-auto max-w-full rounded"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <div>
                <p className="font-medium">{t("customFavicon")}</p>
                <p className="text-sm text-text-muted">{t("customFaviconDesc")}</p>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  aria-label={t("customFavicon")}
                  value={settings.customFaviconUrl || ""}
                  onChange={(e) => updateSetting("customFaviconUrl", e.target.value)}
                  className="flex-1"
                  placeholder="https://example.com/favicon.ico"
                  maxLength={2000}
                />
                {(settings.customFaviconUrl || settings.customFaviconBase64) && (
                  <img
                    src={settings.customFaviconBase64 || settings.customFaviconUrl}
                    alt={t("appearanceFaviconPreviewAlt")}
                    className="h-10 w-10 rounded border border-border object-contain bg-surface"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-medium">{t("uploadFavicon")}</p>
              <div className="flex items-center gap-2">
                <Input
                  ref={faviconFileRef}
                  type="file"
                  aria-label={t("uploadFavicon")}
                  accept="image/png,image/x-icon,image/svg+xml,image/gif,image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.size > 50 * 1024) {
                        setUploadError({
                          target: "favicon",
                          message: t("faviconFileTooLarge"),
                        });
                        return;
                      }
                      const validTypes = [
                        "image/png",
                        "image/x-icon",
                        "image/svg+xml",
                        "image/gif",
                        "image/webp",
                      ];
                      if (!validTypes.includes(file.type)) {
                        setUploadError({
                          target: "favicon",
                          message: t("invalidFaviconFileType"),
                        });
                        return;
                      }
                      setUploadError(null);
                      const reader = new FileReader();
                      reader.onerror = () => {
                        setUploadError({ target: "favicon", message: t("failedToReadFile") });
                      };
                      reader.onload = (event) => {
                        const base64 = event.target?.result as string;
                        updateSetting("customFaviconBase64", base64);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                  tabIndex={-1}
                />
                <Button
                  variant="outline"
                  icon="upload"
                  onClick={() => faviconFileRef.current?.click()}
                >
                  {t("uploadFavicon")}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    updateSetting("customFaviconUrl", "");
                    updateSetting("customFaviconBase64", "");
                  }}
                >
                  {t("resetFavicon")}
                </Button>
              </div>
              {uploadError?.target === "favicon" && (
                <p role="alert" className="text-sm text-error">
                  {uploadError.message}
                </p>
              )}
              {(settings.customFaviconBase64 || settings.customFaviconUrl) && (
                <div className="mt-2 p-3 bg-bg-subtle rounded-lg">
                  <p className="text-xs text-text-muted mb-2">{t("faviconPreview")}</p>
                  <img
                    src={settings.customFaviconBase64 || settings.customFaviconUrl}
                    alt={t("appearanceFaviconPreviewAlt")}
                    className="h-8 w-8 rounded"
                  />
                </div>
              )}
            </div>

            {isElectron && (
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="font-medium">{t("startOnLogin")}</p>
                  <p className="text-xs text-text-muted mt-0.5">{t("startOnLoginDesc")}</p>
                </div>
                <Toggle
                  checked={autostartEnabled}
                  ariaLabel={t("startOnLogin")}
                  onChange={async (checked) => {
                    if (checked) {
                      const success = await window.electronAPI?.enableAutostart();
                      if (success) setAutostartEnabled(true);
                    } else {
                      const success = await window.electronAPI?.disableAutostart();
                      if (success) setAutostartEnabled(false);
                    }
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
