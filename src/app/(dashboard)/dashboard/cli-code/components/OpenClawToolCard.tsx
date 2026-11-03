"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Icon from "@/shared/components/Icon";
import { Card, Button, ModelSelectModal, ManualConfigModal } from "@/shared/components";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import Image from "next/image";
import CliStatusBadge from "./CliStatusBadge";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/utils/cn";
import { CARD_TOGGLE_CLASS, cardToggleProps } from "./cardToggle";

const CLOUD_URL = process.env.NEXT_PUBLIC_CLOUD_URL;

// (#523) Default to the first available key while the user hasn't picked one.
const defaultKeyId = (selectedId, apiKeys) =>
  selectedId || (apiKeys?.length > 0 ? apiKeys[0].id : "");

/**
 * One-time form initialization from ~/.openclaw/openclaw.json, applied right
 * after a status fetch resolves: mirror the primary model into the form and
 * re-select the API key whose masked value matches the stored one.
 */
function initOpenclawFormFromSettings(data, apiKeys, onSelectModel, onSelectKeyId) {
  const provider = data.settings?.models?.providers?.["omniroute"];
  if (!provider) return;

  const primaryModel = data.settings?.agents?.defaults?.model?.primary;
  if (primaryModel) onSelectModel(primaryModel.replace("omniroute/", ""));

  // (#523) Keys from /api/keys are masked (first 8 + "****" + last 4).
  // Match by prefix/suffix instead of exact comparison.
  // apiKey may be a structured secret reference (object) rather than a
  // plaintext string, e.g. OpenClaw SecretRefs. Only match on strings.
  if (typeof provider.apiKey !== "string" || !provider.apiKey) return;
  const fileKeyPrefix = provider.apiKey.slice(0, 8);
  const fileKeySuffix = provider.apiKey.slice(-4);
  const matchedKey = apiKeys?.find(
    (k) => k.key && k.key.startsWith(fileKeyPrefix) && k.key.endsWith(fileKeySuffix)
  );
  if (matchedKey) onSelectKeyId(matchedKey.id);
}

export default function OpenClawToolCard({
  tool,
  isExpanded = false,
  onToggle = () => {},
  baseUrl,
  hasActiveProviders,
  apiKeys,
  activeProviders,
  cloudEnabled,
  batchStatus,
  lastConfiguredAt,
}) {
  const t = useTranslations("cliTools");
  const [openclawStatus, setOpenclawStatus] = useState(null);
  const [checkingOpenclaw, setCheckingOpenclaw] = useState(false);
  const [applying, setApplying] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [message, setMessage] = useState(null);
  const [selectedApiKeyId, setSelectedApiKeyId] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modelAliases, setModelAliases] = useState({});
  const [showManualConfigModal, setShowManualConfigModal] = useState(false);
  const [customBaseUrl, setCustomBaseUrl] = useState("");
  const hasInitializedModel = useRef(false);
  // Backups state
  const [backups, setBackups] = useState([]);
  const [showBackups, setShowBackups] = useState(false);
  const [restoringBackup, setRestoringBackup] = useState(null);
  const cliReady = !!(openclawStatus?.installed && openclawStatus?.runnable);

  const getConfigStatus = () => {
    if (!cliReady) return null;
    const currentProvider = openclawStatus.settings?.models?.providers?.["omniroute"];
    if (!currentProvider) return "not_configured";
    const localMatch =
      currentProvider.baseUrl?.includes("localhost") ||
      currentProvider.baseUrl?.includes("127.0.0.1");
    const cloudMatch = cloudEnabled && CLOUD_URL && currentProvider.baseUrl?.startsWith(CLOUD_URL);
    if (localMatch || cloudMatch) return "configured";
    return "other";
  };

  const configStatus = getConfigStatus();

  // Use batch status as fallback when card hasn't been expanded yet
  const effectiveConfigStatus = configStatus || batchStatus?.configStatus || null;

  // (#523) Store the key *id* (not the masked string) so the backend can
  // resolve the real secret from DB before writing to config files. Derived
  // during render instead of synced through an effect
  // (react-hooks/set-state-in-effect).
  const effectiveApiKeyId = defaultKeyId(selectedApiKeyId, apiKeys);

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
      const res = await fetch("/api/cli-tools/backups?tool=openclaw");
      const data = await res.json();
      if (res.ok) setBackups(data.backups || []);
    } catch (error) {
      console.log("Error fetching backups:", error);
    }
  }, []);

  const checkOpenclawStatus = useCallback(async () => {
    setCheckingOpenclaw(true);
    try {
      const res = await fetch("/api/cli-tools/openclaw-settings");
      const data = await res.json();
      setOpenclawStatus(data);
      // One-time form initialization from the settings file, right after the
      // fetch resolves (was a separate openclawStatus effect — moved here so
      // no setState runs synchronously inside an effect body).
      if (data?.installed && !hasInitializedModel.current) {
        hasInitializedModel.current = true;
        initOpenclawFormFromSettings(data, apiKeys, setSelectedModel, setSelectedApiKeyId);
      }
    } catch (error) {
      setOpenclawStatus({ installed: false, error: error.message });
    } finally {
      setCheckingOpenclaw(false);
    }
  }, [apiKeys]);

  useEffect(() => {
    if (!(isExpanded && !openclawStatus)) return;
    // Load in an async continuation so every setState happens after an await
    // (react-hooks/set-state-in-effect: no synchronous setState in effect bodies).
    void (async () => {
      await Promise.all([checkOpenclawStatus(), fetchModelAliases(), fetchBackups()]);
    })();
  }, [isExpanded, openclawStatus, checkOpenclawStatus, fetchModelAliases, fetchBackups]);

  const getEffectiveBaseUrl = () => {
    const url = customBaseUrl || baseUrl;
    return url.endsWith("/v1") ? url : `${url}/v1`;
  };

  const getDisplayUrl = () => {
    const url = customBaseUrl || baseUrl;
    return url.endsWith("/v1") ? url : `${url}/v1`;
  };

  const handleApplySettings = async () => {
    setApplying(true);
    setMessage(null);
    try {
      // (#523) Prefer keyId lookup so the backend writes the real key to disk.
      const selectedKeyId =
        effectiveApiKeyId?.trim() || (apiKeys?.length > 0 ? apiKeys[0].id : null);

      const res = await fetch("/api/cli-tools/openclaw-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baseUrl: getEffectiveBaseUrl(),
          apiKey: !cloudEnabled ? "sk_omniroute" : null,
          keyId: selectedKeyId,
          model: selectedModel,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: t("settingsApplied") });
        checkOpenclawStatus();
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
      const res = await fetch("/api/cli-tools/openclaw-settings", { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: t("settingsReset") });
        setSelectedModel("");
        setSelectedApiKeyId("");
        checkOpenclawStatus();
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

  const handleModelSelect = (model) => {
    setSelectedModel(model.value);
    setModalOpen(false);
  };

  const handleRestoreBackup = async (backupId) => {
    setRestoringBackup(backupId);
    setMessage(null);
    try {
      const res = await fetch("/api/cli-tools/backups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: "openclaw", backupId }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: t("backupRestored") });
        checkOpenclawStatus();
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

  const getManualConfigs = () => {
    // (#523) Look up the key object by id to get the masked display value.
    const selectedKeyObj = apiKeys?.find((k) => k.id === effectiveApiKeyId);
    const keyToDisplay =
      selectedKeyObj?.key || (!cloudEnabled ? "sk_omniroute" : "<API_KEY_FROM_DASHBOARD>");

    const settingsContent = {
      agents: {
        defaults: {
          model: {
            primary: `omniroute/${selectedModel || "provider/model-id"}`,
          },
        },
      },
      models: {
        providers: {
          omniroute: {
            baseUrl: getEffectiveBaseUrl(),
            apiKey: keyToDisplay,
            api: "openai-completions",
            models: [
              {
                id: selectedModel || "provider/model-id",
                name: (selectedModel || "provider/model-id").split("/").pop(),
              },
            ],
          },
        },
      },
    };

    return [
      {
        filename: "~/.openclaw/openclaw.json",
        content: JSON.stringify(settingsContent, null, 2),
      },
    ];
  };

  return (
    <Card padding="sm" className="overflow-hidden">
      <div
        className={cn("flex items-center justify-between hover:cursor-pointer", CARD_TOGGLE_CLASS)}
        {...cardToggleProps(isExpanded, onToggle)}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="size-8 flex items-center justify-center shrink-0">
            <Image
              src="/providers/openclaw.svg"
              alt={tool.name}
              width={32}
              height={32}
              className="size-8 object-contain rounded-lg"
              sizes="32px"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = "none";
              }}
            />
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
            <p className="text-xs text-text-muted truncate">{t("toolDescriptions.openclaw")}</p>
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
          {checkingOpenclaw && (
            <div className="flex items-center gap-2 text-text-muted">
              <Icon name="progress_activity" className="animate-spin" />
              <span>{t("checkingCli", { tool: "Open Claw" })}</span>
            </div>
          )}

          {!checkingOpenclaw && openclawStatus && !cliReady && (
            <div className="flex items-center gap-3 p-4 bg-warning/10 border border-warning/30 rounded-lg">
              <Icon name="warning" className="text-warning" />
              <div className="flex-1">
                <p className="font-medium text-warning">
                  {openclawStatus.installed
                    ? t("cliNotRunnable", { tool: "Open Claw" })
                    : t("cliNotInstalled", { tool: "Open Claw" })}
                </p>
                <p className="text-sm text-text-muted">
                  {openclawStatus.installed
                    ? t("cliFoundFailedHealthcheck", {
                        tool: "Open Claw",
                        reason: openclawStatus.reason ? ` (${openclawStatus.reason})` : "",
                      })
                    : t("installCliPrompt", { tool: "Open Claw" })}
                </p>
              </div>
              {/*
                Always surface Manual Config even when the CLI is not
                detected locally — typical of remote OmniRoute
                deployments where the CLI lives on the user's machine,
                not on the server. Upstream report: #579.
              */}
              <Button variant="ghost" size="sm" onClick={() => setShowManualConfigModal(true)}>
                <Icon name="content_copy" size={14} className="mr-1" />
                {t("manualConfig")}
              </Button>
            </div>
          )}

          {!checkingOpenclaw && cliReady && (
            <>
              <div className="flex flex-col gap-2">
                {/* Current Base URL */}
                {openclawStatus?.settings?.models?.providers?.["omniroute"]?.baseUrl && (
                  <div className="flex items-center gap-2">
                    <span className="w-32 shrink-0 text-sm font-semibold text-text-main text-right">
                      {t("current")}
                    </span>
                    <Icon name="arrow_forward" size={14} className="text-text-muted" />
                    <span className="flex-1 px-2 py-1.5 text-xs text-text-muted truncate">
                      {openclawStatus.settings.models.providers["omniroute"].baseUrl}
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
                      value={effectiveApiKeyId}
                      onChange={(e) => setSelectedApiKeyId(e.target.value)}
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
                      {cloudEnabled ? t("noApiKeysCreateOne") : t("defaultOmnirouteKey")}
                    </span>
                  )}
                </div>

                {/* Model */}
                <div className="flex items-center gap-2">
                  <span className="w-32 shrink-0 text-sm font-semibold text-text-main text-right">
                    {t("model")}
                  </span>
                  <Icon name="arrow_forward" size={14} className="text-text-muted" />
                  <Input
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    placeholder={t("providerModelPlaceholder")}
                    aria-label={t("model")}
                    className="min-w-0 w-auto flex-1"
                    inputClassName="text-xs"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setModalOpen(true)}
                    disabled={!hasActiveProviders}
                    className="shrink-0 whitespace-nowrap text-xs"
                  >
                    {t("selectModel")}
                  </Button>
                  {selectedModel && (
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setSelectedModel("")}
                      title={t("clear")}
                      aria-label={t("clear")}
                      className="text-text-muted hover:text-error"
                    >
                      <Icon name="close" size={14} />
                    </Button>
                  )}
                </div>
              </div>

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
                  disabled={!selectedModel}
                  loading={applying}
                >
                  <Icon name="save" size={14} className="mr-1" />
                  {t("apply")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetSettings}
                  disabled={!openclawStatus?.hasOmniRoute}
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
        selectedModel={selectedModel}
        activeProviders={activeProviders}
        modelAliases={modelAliases}
        title={t("selectModelForTool", { tool: "Open Claw" })}
      />

      <ManualConfigModal
        isOpen={showManualConfigModal}
        onClose={() => setShowManualConfigModal(false)}
        title={t("openClawManualConfiguration")}
        configs={getManualConfigs()}
      />
    </Card>
  );
}
