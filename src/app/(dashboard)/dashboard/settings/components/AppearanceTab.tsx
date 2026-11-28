"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { RadioGroup, RadioGroupItem } from "@omniroute/ui-kit/radio-group";
import { Button, Card, FileTrigger, Input, Toggle } from "@/shared/components";
import Icon from "@/shared/components/Icon";
import { useTheme } from "@/shared/hooks/useTheme";
import { useIsElectron } from "@/shared/hooks/useElectron";
import {
  COMBO_CONFIG_MODE_SETTING_KEY,
  normalizeComboConfigMode,
  type ComboConfigMode,
} from "@/shared/constants/comboConfigMode";
import {
  APPEARANCE_PALETTES,
  normalizeAppearancePalette,
} from "@/shared/constants/appearancePalette";
import AccountEmailVisibilitySetting from "./AccountEmailVisibilitySetting";
import SavedNumberInput from "./SavedNumberInput";

export default function AppearanceTab() {
  const { theme, setTheme, isDark, palette, setPalette } = useTheme();
  const t = useTranslations("settings");

  const isElectron = useIsElectron();
  const [autostartEnabled, setAutostartEnabled] = useState(false);

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
  const showUsageStatsOnHome = settings.showUsageStatsOnHome !== false;
  const showActivityHeatmapOnHome = settings.showActivityHeatmapOnHome !== false;
  const showProviderQuotaOnHome = settings.showProviderQuotaOnHome !== false;
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

  const paletteOptions: Record<string, { label: string; description: string; icon: string }> = {
    editions: {
      label: t("paletteEditions"),
      description: t("paletteEditionsDesc"),
      icon: "brush",
    },
    classic: {
      label: t("paletteClassic"),
      description: t("paletteClassicDesc"),
      icon: "history",
    },
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

  // Reads a picked image and saves it as a data URL; the kit trigger already filtered the file
  // by type and size.
  const readImageSetting = (target: "logo" | "favicon", key: string, file: File) => {
    setUploadError(null);
    const reader = new FileReader();
    reader.onerror = () => {
      setUploadError({ target, message: t("failedToReadFile") });
    };
    reader.onload = (event) => {
      // updateSetting catches its own errors; nothing waits for the save.
      void updateSetting(key, event.target?.result as string);
    };
    reader.readAsDataURL(file);
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
            columns={3}
            minItemWidth="9rem"
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
            <p className="font-medium">{t("paletteTitle")}</p>
            <p className="text-sm text-text-muted">{t("paletteDesc")}</p>
          </div>
          <RadioGroup
            aria-label={t("paletteSelectionAria")}
            columns={2}
            minItemWidth="9rem"
            value={palette}
            onValueChange={(next) => setPalette(normalizeAppearancePalette(next))}
          >
            {APPEARANCE_PALETTES.map((option) => (
              <RadioGroupItem
                key={option}
                card
                value={option}
                label={
                  <span className="flex items-center gap-2">
                    <Icon name={paletteOptions[option].icon} size={18} />
                    {paletteOptions[option].label}
                  </span>
                }
                description={paletteOptions[option].description}
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

              <div className="flex items-start justify-between gap-4 px-4 py-3">
                <div>
                  <p className="font-medium">
                    {getSettingsLabel("homeUsageStats", "Usage and statistics")}
                  </p>
                  <p className="text-sm text-text-muted">
                    {getSettingsLabel(
                      "homeUsageStatsDesc",
                      "Show the token, cost, error and combo usage cards on the Home page."
                    )}
                  </p>
                </div>
                <Toggle
                  checked={showUsageStatsOnHome}
                  ariaLabel={getSettingsLabel("homeUsageStats", "Usage and statistics")}
                  onChange={async (checked) => {
                    await updateSetting("showUsageStatsOnHome", checked);
                  }}
                  disabled={loading}
                />
              </div>

              <div className="flex items-start justify-between gap-4 px-4 py-3">
                <div>
                  <p className="font-medium">
                    {getSettingsLabel("homeActivityHeatmap", "Activity heatmap")}
                  </p>
                  <p className="text-sm text-text-muted">
                    {getSettingsLabel(
                      "homeActivityHeatmapDesc",
                      "Show the activity heatmap below the usage cards. Needs usage and statistics."
                    )}
                  </p>
                </div>
                <Toggle
                  checked={showActivityHeatmapOnHome}
                  ariaLabel={getSettingsLabel("homeActivityHeatmap", "Activity heatmap")}
                  onChange={async (checked) => {
                    await updateSetting("showActivityHeatmapOnHome", checked);
                  }}
                  disabled={loading || !showUsageStatsOnHome}
                />
              </div>

              <div className="flex items-start justify-between gap-4 px-4 py-3">
                <div>
                  <p className="font-medium">
                    {getSettingsLabel("homeProviderQuotaWidget", "Provider quota")}
                  </p>
                  <p className="text-sm text-text-muted">
                    {getSettingsLabel(
                      "homeProviderQuotaWidgetDesc",
                      "Show the quota of every connected provider on the Home page."
                    )}
                  </p>
                </div>
                <Toggle
                  checked={showProviderQuotaOnHome}
                  ariaLabel={getSettingsLabel("homeProviderQuotaWidget", "Provider quota")}
                  onChange={async (checked) => {
                    await updateSetting("showProviderQuotaOnHome", checked);
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
            columns={2}
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
                <SavedNumberInput
                  aria-label={getSettingsLabel(
                    "providerQuotaAutoRefreshInterval",
                    "Refresh interval"
                  )}
                  suffix={t("seconds")}
                  min={10}
                  max={3600}
                  step={10}
                  value={quotaRefreshInterval}
                  onSave={(next) => updateSetting("autoRefreshProviderQuotaInterval", next)}
                  disabled={loading || !autoRefreshProviderQuota}
                  className="w-32 shrink-0"
                />
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
              <h4>{t("whitelabeling")}</h4>
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
                <FileTrigger
                  accept="image/png,image/jpeg,image/svg+xml,image/gif,image/webp"
                  maxSize={500 * 1024}
                  onFilesChange={([file]) => readImageSetting("logo", "customLogoBase64", file)}
                  onFilesRejected={([rejection]) =>
                    setUploadError({
                      target: "logo",
                      message:
                        rejection.reason === "size"
                          ? t("logoFileTooLarge")
                          : t("invalidLogoFileType"),
                    })
                  }
                >
                  <Button variant="outline" icon="upload">
                    {t("uploadLogo")}
                  </Button>
                </FileTrigger>
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
                <FileTrigger
                  accept="image/png,image/x-icon,image/svg+xml,image/gif,image/webp"
                  maxSize={50 * 1024}
                  onFilesChange={([file]) =>
                    readImageSetting("favicon", "customFaviconBase64", file)
                  }
                  onFilesRejected={([rejection]) =>
                    setUploadError({
                      target: "favicon",
                      message:
                        rejection.reason === "size"
                          ? t("faviconFileTooLarge")
                          : t("invalidFaviconFileType"),
                    })
                  }
                >
                  <Button variant="outline" icon="upload">
                    {t("uploadFavicon")}
                  </Button>
                </FileTrigger>
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
