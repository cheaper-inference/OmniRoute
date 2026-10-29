"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Icon from "@/shared/components/Icon";
import { Card, Button, ModelSelectModal, ManualConfigModal } from "@/shared/components";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import ProviderIcon from "@/shared/components/ProviderIcon";
import CliStatusBadge from "./CliStatusBadge";
import ClaudeClassifierCompatToggle from "./ClaudeClassifierCompatToggle";
import ClaudeCcDiscoveryInfoButton from "./ClaudeCcDiscoveryInfoButton";
import ClaudeGatewayOnboardingBlock from "./ClaudeGatewayOnboardingBlock";
import { useTranslations } from "next-intl";
import {
  getStoredClaudeAuthValue,
  normalizeClaudeBaseUrl,
} from "@/shared/services/claudeCliConfig";
import { cn } from "@/shared/utils/cn";
import { CARD_TOGGLE_CLASS, cardToggleProps } from "./cardToggle";

const CLOUD_URL = process.env.NEXT_PUBLIC_CLOUD_URL;

// (#523) Default to the first available key while the user hasn't picked one.
const defaultKeyId = (selectedId, apiKeys) =>
  selectedId || (apiKeys?.length > 0 ? apiKeys[0].id : "");

/**
 * One-time form initialization from ~/.claude/settings.json, applied right
 * after a status fetch resolves: mirror the env model mappings into the form
 * and re-select the API key whose masked value matches the stored token.
 */
function initClaudeFormFromSettings(
  data,
  apiKeys,
  defaultModels,
  onModelMappingChange,
  onSelectKey
) {
  const env = data.settings?.env || {};

  defaultModels.forEach((model) => {
    if (!model.envKey) return;
    const value = env[model.envKey] || model.defaultValue || "";
    // Only sync initial values from file once
    if (value) onModelMappingChange(model.alias, value);
  });

  // Restore selected key from file: match token stored in file against known keys
  const tokenFromFile = getStoredClaudeAuthValue(env);
  if (!tokenFromFile) return;
  // (#523) Keys from /api/keys are masked (first 8 + "****" + last 4).
  // Mask the token from file to compare against the masked list.
  const maskedToken = tokenFromFile.slice(0, 8) + "****" + tokenFromFile.slice(-4);
  const matchedKey = apiKeys?.find((k) => k.key === maskedToken);
  if (matchedKey) onSelectKey(matchedKey.id);
}

export default function ClaudeToolCard({
  tool,
  isExpanded = false,
  onToggle = () => {},
  activeProviders,
  modelMappings,
  onModelMappingChange,
  baseUrl,
  hasActiveProviders,
  apiKeys,
  cloudEnabled,
  batchStatus,
  lastConfiguredAt,
}) {
  const t = useTranslations("cliTools");
  const [claudeStatus, setClaudeStatus] = useState(null);
  const [checkingClaude, setCheckingClaude] = useState(false);
  const [applying, setApplying] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [message, setMessage] = useState(null);
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEditingAlias, setCurrentEditingAlias] = useState(null);
  const [selectedApiKey, setSelectedApiKey] = useState("");
  const [modelAliases, setModelAliases] = useState({});
  const [showManualConfigModal, setShowManualConfigModal] = useState(false);
  const [customBaseUrl, setCustomBaseUrl] = useState("");
  const hasInitializedModels = useRef(false);
  // Backups state
  const [backups, setBackups] = useState([]);
  const [showBackups, setShowBackups] = useState(false);
  const [restoringBackup, setRestoringBackup] = useState(null);
  const cliReady = !!(claudeStatus?.installed && claudeStatus?.runnable);

  const getConfigStatus = () => {
    if (!cliReady) return null;
    const currentUrl = claudeStatus.settings?.env?.ANTHROPIC_BASE_URL;
    if (!currentUrl) return "not_configured";
    const localMatch = currentUrl.includes("localhost") || currentUrl.includes("127.0.0.1");
    const cloudMatch = cloudEnabled && CLOUD_URL && currentUrl.startsWith(CLOUD_URL);
    if (localMatch || cloudMatch) return "configured";
    return "other";
  };

  const configStatus = getConfigStatus();

  // Use batch status as fallback when card hasn't been expanded yet
  const effectiveConfigStatus = configStatus || batchStatus?.configStatus || null;

  // (#523) Store the key *id* (not the masked string) so the backend can
  // resolve the real secret from DB before writing to settings.json. Derived
  // during render instead of synced through an effect
  // (react-hooks/set-state-in-effect).
  const effectiveApiKey = defaultKeyId(selectedApiKey, apiKeys);

  const fetchModelAliases = useCallback(async () => {
    try {
      const res = await fetch("/api/models/alias");
      const data = await res.json();
      if (res.ok) setModelAliases(data.aliases || {});
    } catch (error) {
      console.log("Error fetching model aliases:", error);
    }
  }, []);

  // ── Backups ──
  const fetchBackups = useCallback(async () => {
    try {
      const res = await fetch("/api/cli-tools/backups?tool=claude");
      const data = await res.json();
      if (res.ok) setBackups(data.backups || []);
    } catch (error) {
      console.log("Error fetching backups:", error);
    }
  }, []);

  const checkClaudeStatus = useCallback(async () => {
    setCheckingClaude(true);
    try {
      const res = await fetch("/api/cli-tools/claude-settings");
      const data = await res.json();
      setClaudeStatus(data);
      // One-time form initialization from the settings file, right after the
      // fetch resolves (was a separate claudeStatus effect — moved here so no
      // setState runs synchronously inside an effect body).
      if (data?.installed && !hasInitializedModels.current) {
        hasInitializedModels.current = true;
        initClaudeFormFromSettings(
          data,
          apiKeys,
          tool.defaultModels,
          onModelMappingChange,
          setSelectedApiKey
        );
      }
    } catch (error) {
      setClaudeStatus({ installed: false, error: error.message });
    } finally {
      setCheckingClaude(false);
    }
  }, [apiKeys, tool.defaultModels, onModelMappingChange]);

  useEffect(() => {
    if (!(isExpanded && !claudeStatus)) return;
    // Load in an async continuation so every setState happens after an await
    // (react-hooks/set-state-in-effect: no synchronous setState in effect bodies).
    void (async () => {
      await Promise.all([checkClaudeStatus(), fetchModelAliases(), fetchBackups()]);
    })();
  }, [isExpanded, claudeStatus, checkClaudeStatus, fetchModelAliases, fetchBackups]);

  const getEffectiveBaseUrl = () => {
    const url = customBaseUrl || baseUrl;
    return normalizeClaudeBaseUrl(url);
  };

  const getDisplayUrl = () => {
    const url = customBaseUrl || baseUrl;
    return normalizeClaudeBaseUrl(url);
  };

  const handleApplySettings = async () => {
    setApplying(true);
    setMessage(null);
    try {
      const env: any = { ANTHROPIC_BASE_URL: getEffectiveBaseUrl() };

      // (#523) Prefer keyId lookup so the backend writes the real key to disk.
      // If no key is selected, leave auth unset so local installs can rely on
      // anonymous access instead of persisting a fake placeholder token.
      const selectedKeyId = effectiveApiKey?.trim() || (apiKeys?.length > 0 ? apiKeys[0].id : null);

      tool.defaultModels.forEach((model) => {
        const targetModel = modelMappings[model.alias] || model.defaultValue || "";
        if (targetModel && model.envKey) env[model.envKey] = targetModel;
      });

      const postBody: Record<string, unknown> = { env };
      if (selectedKeyId) postBody.keyId = selectedKeyId;

      const res = await fetch("/api/cli-tools/claude-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postBody),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: t("settingsApplied") });
        setClaudeStatus((prev) => ({
          ...prev,
          hasBackup: true,
          settings: { ...prev?.settings, env },
        }));
      } else {
        setMessage({
          type: "error",
          text:
            (typeof data.error === "string" ? data.error : data.error?.message) ||
            t("failedApplySettings"),
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setApplying(false);
    }
  };

  const handleResetSettings = async () => {
    setRestoring(true);
    setMessage(null);
    try {
      const res = await fetch("/api/cli-tools/claude-settings", { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: t("settingsReset") });
        tool.defaultModels.forEach((model) =>
          onModelMappingChange(model.alias, model.defaultValue || "")
        );
        setSelectedApiKey("");
      } else {
        setMessage({
          type: "error",
          text:
            (typeof data.error === "string" ? data.error : data.error?.message) ||
            t("failedResetSettings"),
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setRestoring(false);
    }
  };

  const openModelSelector = (alias) => {
    setCurrentEditingAlias(alias);
    setModalOpen(true);
  };

  const handleModelSelect = (model) => {
    if (currentEditingAlias) onModelMappingChange(currentEditingAlias, model.value);
  };

  // Generate settings.json content for manual copy
  const getManualConfigs = () => {
    const env = { ANTHROPIC_BASE_URL: getEffectiveBaseUrl() };
    if (effectiveApiKey && effectiveApiKey.trim()) {
      env.ANTHROPIC_AUTH_TOKEN = "<API_KEY_FROM_DASHBOARD>";
    } else if (cloudEnabled) {
      env.ANTHROPIC_AUTH_TOKEN = "<API_KEY_FROM_DASHBOARD>";
    }

    tool.defaultModels.forEach((model) => {
      const targetModel = modelMappings[model.alias];
      if (targetModel && model.envKey) env[model.envKey] = targetModel;
    });

    return [
      {
        filename: "~/.claude/settings.json",
        content: JSON.stringify({ env }, null, 2),
      },
    ];
  };

  const handleRestoreBackup = async (backupId) => {
    setRestoringBackup(backupId);
    setMessage(null);
    try {
      const res = await fetch("/api/cli-tools/backups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: "claude", backupId }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: t("backupRestored") });
        checkClaudeStatus();
        fetchBackups();
      } else {
        setMessage({
          type: "error",
          text:
            (typeof data.error === "string" ? data.error : data.error?.message) ||
            t("failedRestore"),
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setRestoringBackup(null);
    }
  };

  return (
    <Card padding="sm" className="overflow-hidden">
      <div
        className={cn("flex items-center justify-between hover:cursor-pointer", CARD_TOGGLE_CLASS)}
        {...cardToggleProps(isExpanded, onToggle)}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="size-8 flex items-center justify-center shrink-0">
            <ProviderIcon providerId="claude" size={32} type="color" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-sm">{tool.name}</h3>
              <CliStatusBadge
                effectiveConfigStatus={effectiveConfigStatus}
                batchStatus={batchStatus}
                lastConfiguredAt={lastConfiguredAt}
              />
            </div>
            <p className="text-xs text-text-muted truncate">{t("toolDescriptions.claude")}</p>
          </div>
        </div>
        <Icon
          name="expand_more"
          size={20}
          className={cn("text-text-muted transition-transform", isExpanded && "rotate-180")}
        />
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-border flex flex-col gap-4">
          {checkingClaude && (
            <div className="flex items-center gap-2 text-text-muted">
              <Icon name="progress_activity" className="animate-spin" />
              <span>{t("checkingCli", { tool: "Claude" })}</span>
            </div>
          )}

          {!checkingClaude && claudeStatus && !cliReady && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 p-4 bg-warning/10 border border-warning/30 rounded-lg">
                <Icon name="warning" className="text-warning" />
                <div className="flex-1">
                  <p className="font-medium text-warning">
                    {claudeStatus.installed
                      ? t("cliNotRunnable", { tool: "Claude" })
                      : t("cliNotInstalled", { tool: "Claude" })}
                  </p>
                  <p className="text-sm text-text-muted">
                    {claudeStatus.installed
                      ? t("cliFoundFailedHealthcheck", {
                          tool: "Claude",
                          reason: claudeStatus.reason ? ` (${claudeStatus.reason})` : "",
                        })
                      : t("installCliPrompt", { tool: "Claude" })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {/*
                    Always surface Manual Config even when the CLI is not
                    detected locally — typical of remote OmniRoute
                    deployments where the CLI lives on the user's machine,
                    not on the server. Upstream report: #589.
                  */}
                  <Button variant="ghost" size="sm" onClick={() => setShowManualConfigModal(true)}>
                    <Icon name="content_copy" size={18} className="mr-1" />
                    {t("manualConfig")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowInstallGuide(!showInstallGuide)}
                  >
                    <Icon
                      name={showInstallGuide ? "expand_less" : "help"}
                      size={18}
                      className="mr-1"
                    />
                    {showInstallGuide ? t("hide") : t("howToInstall")}
                  </Button>
                </div>
              </div>
              {showInstallGuide && (
                <div className="p-4 bg-surface border border-border rounded-lg">
                  <h4 className="font-medium mb-3">{t("installationGuide")}</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-text-muted mb-1">{t("platforms")}</p>
                      <code className="block px-3 py-2 bg-bg-subtle rounded font-mono text-xs">
                        npm install -g @anthropic-ai/claude-code
                      </code>
                    </div>
                    <p className="text-text-muted">
                      {t("afterInstallationRun")}{" "}
                      <code className="px-1 bg-bg-subtle rounded">claude</code> {t("toVerify")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {!checkingClaude && cliReady && (
            <>
              <div className="flex flex-col gap-2">
                {/* Current Base URL */}
                {claudeStatus?.settings?.env?.ANTHROPIC_BASE_URL && (
                  <div className="flex items-center gap-2">
                    <span className="w-32 shrink-0 text-sm font-semibold text-text-main text-right">
                      {t("current")}
                    </span>
                    <Icon name="arrow_forward" size={14} className="text-text-muted" />
                    <span className="flex-1 px-2 py-1.5 text-xs text-text-muted truncate">
                      {claudeStatus.settings.env.ANTHROPIC_BASE_URL}
                    </span>
                  </div>
                )}

                {/* Base URL */}
                <div className="flex items-center gap-2">
                  <span className="w-32 shrink-0 text-sm font-semibold text-text-main text-right">
                    {t("baseUrl")}
                  </span>
                  <Icon name="arrow_forward" size={14} className="text-text-muted" />
                  <Input
                    value={getDisplayUrl()}
                    onChange={(e) => setCustomBaseUrl(e.target.value)}
                    placeholder={t("baseUrlPlaceholder")}
                    aria-label={t("baseUrl")}
                    className="min-w-0 w-auto flex-1"
                    inputClassName="text-xs"
                  />
                  {customBaseUrl && customBaseUrl !== baseUrl && (
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setCustomBaseUrl("")}
                      title={t("resetToDefault")}
                      aria-label={t("resetToDefault")}
                      className="text-text-muted hover:text-primary"
                    >
                      <Icon name="restart_alt" size={14} />
                    </Button>
                  )}
                </div>

                {/* API Key */}
                <div className="flex items-center gap-2">
                  <span className="w-32 shrink-0 text-sm font-semibold text-text-main text-right">
                    {t("apiKey")}
                  </span>
                  <Icon name="arrow_forward" size={14} className="text-text-muted" />
                  {apiKeys.length > 0 ? (
                    <Select
                      value={effectiveApiKey}
                      onChange={(e) => setSelectedApiKey(e.target.value)}
                      aria-label={t("apiKey")}
                      className="min-w-0 w-auto flex-1"
                      selectClassName="text-xs"
                    >
                      {apiKeys.map((key) => (
                        <option key={key.id} value={key.id}>
                          {key.key}
                        </option>
                      ))}
                    </Select>
                  ) : (
                    <span className="flex-1 text-xs text-text-muted px-2 py-1.5">
                      {cloudEnabled ? t("noApiKeysCreateOne") : t("noApiKeysAvailable")}
                    </span>
                  )}
                </div>

                {/* Model Mappings */}
                {tool.defaultModels.map((model) => (
                  <div key={model.alias} className="flex items-center gap-2">
                    <span className="w-32 shrink-0 text-sm font-semibold text-text-main text-right">
                      {model.name}
                    </span>
                    <Icon name="arrow_forward" size={14} className="text-text-muted" />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openModelSelector(model.alias)}
                      disabled={!hasActiveProviders}
                      className="shrink-0 whitespace-nowrap text-xs"
                    >
                      {t("selectModel")}
                    </Button>
                    <Input
                      value={modelMappings[model.alias] || ""}
                      onChange={(e) => onModelMappingChange(model.alias, e.target.value)}
                      placeholder={t("providerModelPlaceholder")}
                      aria-label={model.name}
                      className="min-w-0 w-auto flex-1"
                      inputClassName="text-xs"
                    />
                    {modelMappings[model.alias] && (
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => onModelMappingChange(model.alias, "")}
                        title={t("clear")}
                        aria-label={t("clear")}
                        className="text-text-muted hover:text-error"
                      >
                        <Icon name="close" size={14} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {/* Opt-in (default off): Claude Code auto-permission classifier compat mode. */}
              <ClaudeClassifierCompatToggle />

              {/* Info link to the discovery-alias gate (claude/<provider>/<model> mirror ids) */}
              <ClaudeCcDiscoveryInfoButton />

              {/* Copy-paste settings.json for gateway model discovery */}
              <ClaudeGatewayOnboardingBlock baseUrl={getEffectiveBaseUrl()} />

              {message && (
                <div
                  className={`flex items-center gap-2 px-2 py-1.5 rounded text-xs ${message.type === "success" ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}
                >
                  <Icon name={message.type === "success" ? "check_circle" : "error"} size={14} />
                  <span>{message.text}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleApplySettings}
                  disabled={!hasActiveProviders}
                  loading={applying}
                >
                  <Icon name="save" size={14} className="mr-1" />
                  {t("apply")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetSettings}
                  disabled={!claudeStatus?.hasOmniRoute}
                  loading={restoring}
                >
                  <Icon name="restore" size={14} className="mr-1" />
                  {t("reset")}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowManualConfigModal(true)}>
                  <Icon name="content_copy" size={14} className="mr-1" />
                  {t("manualConfig")}
                </Button>
                <div className="flex-1" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowBackups(!showBackups);
                    if (!showBackups) fetchBackups();
                  }}
                >
                  <Icon name="history" size={14} className="mr-1" />
                  {t("backups")}
                  {backups.length > 0 && ` (${backups.length})`}
                </Button>
              </div>

              {/* Backups Section */}
              {showBackups && (
                <div className="mt-2 p-3 bg-surface border border-border rounded-lg">
                  <h4 className="text-xs font-semibold text-text-main mb-2 flex items-center gap-1">
                    <Icon name="history" size={14} />
                    {t("configBackups")}
                  </h4>
                  {backups.length === 0 ? (
                    <p className="text-xs text-text-muted">{t("noBackupsYet")}</p>
                  ) : (
                    <div className="space-y-1.5">
                      {backups.map((b) => (
                        <div
                          key={b.id}
                          className="flex items-center gap-2 px-2 py-1.5 bg-bg-subtle rounded text-xs"
                        >
                          <Icon name="description" size={14} className="text-text-muted" />
                          <span className="flex-1 truncate font-mono" title={b.id}>
                            {b.id}
                          </span>
                          <span className="text-text-muted whitespace-nowrap">
                            {new Date(b.createdAt).toLocaleString()}
                          </span>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleRestoreBackup(b.id)}
                            disabled={restoringBackup === b.id}
                            className="h-6 px-2 text-[10px]"
                          >
                            {restoringBackup === b.id ? "..." : t("restore")}
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}

      <ModelSelectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={handleModelSelect}
        selectedModel={currentEditingAlias ? modelMappings[currentEditingAlias] : null}
        activeProviders={activeProviders}
        modelAliases={modelAliases}
        title={t("selectModelForAlias", { alias: currentEditingAlias || "" })}
      />

      <ManualConfigModal
        isOpen={showManualConfigModal}
        onClose={() => setShowManualConfigModal(false)}
        title={t("claudeManualConfiguration")}
        configs={getManualConfigs()}
      />
    </Card>
  );
}
