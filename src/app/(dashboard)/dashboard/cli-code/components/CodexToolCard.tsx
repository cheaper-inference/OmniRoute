"use client";

import { useState, useEffect, useCallback } from "react";
import Icon from "@/shared/components/Icon";
import { Card, Button, ModelSelectModal, ManualConfigModal } from "@/shared/components";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import CliStatusBadge from "./CliStatusBadge";
import { useTranslations } from "next-intl";

import ProviderIcon from "@/shared/components/ProviderIcon";
import { normalizeCodexBaseUrl } from "@/shared/utils/codexBaseUrl";
import { isApplyDisabled, isResetDisabled } from "./codexButtonState";
import { CODEX_DEFAULT_MODELS } from "./codexToolOptions";
import { cn } from "@/shared/utils/cn";
import Checkbox from "@/shared/components/Checkbox";
import { CARD_TOGGLE_CLASS, cardToggleProps } from "./cardToggle";

export default function CodexToolCard({
  tool,
  isExpanded = false,
  onToggle = () => {},
  baseUrl,
  apiKeys,
  activeProviders,
  cloudEnabled,
  batchStatus,
  lastConfiguredAt,
}) {
  const t = useTranslations("cliTools");
  const [codexStatus, setCodexStatus] = useState(null);
  const [checkingCodex, setCheckingCodex] = useState(false);
  const [applying, setApplying] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [message, setMessage] = useState(null);
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [selectedApiKey, setSelectedApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-5.6-sol");
  const [modelMappings, setModelMappings] = useState<Record<string, string>>({});
  const [reasoningEffort, setReasoningEffort] = useState("xhigh");
  const [wireApi, setWireApi] = useState("responses");
  // Opt-in: the catalog file is ~60 KB per model (MBs with a large catalog) in ~/.codex.
  const [writeModelCatalog, setWriteModelCatalog] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTarget, setModalTarget] = useState<string | null>(null); // null = default model, string = mapping key
  const [modelAliases, setModelAliases] = useState({});
  const [showManualConfigModal, setShowManualConfigModal] = useState(false);
  const [customBaseUrl, setCustomBaseUrl] = useState("");
  // Profiles state
  const [profiles, setProfiles] = useState([]);
  const [showProfiles, setShowProfiles] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [activatingProfile, setActivatingProfile] = useState(null);
  // Backups state
  const [backups, setBackups] = useState([]);
  const [showBackups, setShowBackups] = useState(false);
  const [restoringBackup, setRestoringBackup] = useState(null);
  const cliReady = !!(codexStatus?.installed && codexStatus?.runnable);

  // Store the key *id* so the backend can resolve the real secret from DB.
  // Default to the first available key while the user hasn't picked one —
  // derived during render instead of synced through an effect
  // (react-hooks/set-state-in-effect).
  const effectiveApiKey = selectedApiKey || (apiKeys?.length > 0 ? apiKeys[0].id : "");

  const fetchModelAliases = useCallback(async () => {
    try {
      const res = await fetch("/api/models/alias");
      const data = await res.json();
      if (res.ok) setModelAliases(data.aliases || {});
    } catch (error) {
      console.log("Error fetching model aliases:", error);
    }
  }, []);

  // ── Profiles ──
  const fetchProfiles = useCallback(async () => {
    try {
      const res = await fetch("/api/cli-tools/codex-profiles");
      const data = await res.json();
      if (res.ok) setProfiles(data.profiles || []);
    } catch (error) {
      console.log("Error fetching profiles:", error);
    }
  }, []);

  // ── Backups ──
  const fetchBackups = useCallback(async () => {
    try {
      const res = await fetch("/api/cli-tools/backups?tool=codex");
      const data = await res.json();
      if (res.ok) setBackups(data.backups || []);
    } catch (error) {
      console.log("Error fetching backups:", error);
    }
  }, []);

  // Parse config content and sync the form fields from a freshly fetched
  // status (was a separate codexStatus effect — runs right after each fetch
  // instead so no setState happens synchronously inside an effect body).
  const syncFormFromStatus = useCallback((status) => {
    if (status && !status.config) {
      setWireApi("responses");
    }

    if (status?.config) {
      const modelMatch = status.config.match(/^model\s*=\s*"([^"]+)"/im);
      if (modelMatch) setSelectedModel(modelMatch[1]);

      const effortMatch = status.config.match(/^model_reasoning_effort\s*=\s*"([^"]+)"/im);
      if (effortMatch) setReasoningEffort(effortMatch[1]);

      const wireMatch = status.config.match(/^wire_api\s*=\s*"([^"]+)"/im);
      setWireApi(wireMatch?.[1] || "responses");

      const newMappings: Record<string, string> = {};
      const migrationsBlock = status.config.split("[notice.model_migrations]")[1];
      if (migrationsBlock) {
        const nextSectionIdx = migrationsBlock.indexOf("[");
        const chunk =
          nextSectionIdx === -1 ? migrationsBlock : migrationsBlock.substring(0, nextSectionIdx);
        const lines = chunk.split("\n");
        for (const line of lines) {
          const match = line.match(/^"([^"]+)"\s*=\s*"([^"]+)"/);
          if (match) newMappings[match[1]] = match[2];
        }
      }
      setModelMappings(newMappings);
    }
  }, []);

  const checkCodexStatus = useCallback(async () => {
    setCheckingCodex(true);
    try {
      const res = await fetch("/api/cli-tools/codex-settings");
      const data = await res.json();
      setCodexStatus(data);
      syncFormFromStatus(data);
    } catch (error) {
      const fallback = { installed: false, error: error.message };
      setCodexStatus(fallback);
      syncFormFromStatus(fallback);
    } finally {
      setCheckingCodex(false);
    }
  }, [syncFormFromStatus]);

  useEffect(() => {
    if (!(isExpanded && !codexStatus)) return;
    // Load in an async continuation so every setState happens after an await
    // (react-hooks/set-state-in-effect: no synchronous setState in effect bodies).
    void (async () => {
      await Promise.all([checkCodexStatus(), fetchModelAliases(), fetchProfiles(), fetchBackups()]);
    })();
  }, [isExpanded, codexStatus, checkCodexStatus, fetchModelAliases, fetchProfiles, fetchBackups]);

  const getConfigStatus = () => {
    if (!cliReady) return null;
    if (!codexStatus.config) return "not_configured";
    const hasBaseUrl =
      codexStatus.config.includes(baseUrl) ||
      codexStatus.config.includes("localhost") ||
      codexStatus.config.includes("127.0.0.1");
    return hasBaseUrl ? "configured" : "other";
  };

  const configStatus = getConfigStatus();

  // Use batch status as fallback when card hasn't been expanded yet
  const effectiveConfigStatus = configStatus || batchStatus?.configStatus || null;

  const getEffectiveBaseUrl = () => normalizeCodexBaseUrl(customBaseUrl || baseUrl, wireApi);

  const getDisplayUrl = () => normalizeCodexBaseUrl(customBaseUrl || baseUrl, wireApi);

  const handleApplySettings = async () => {
    setApplying(true);
    setMessage(null);
    try {
      // Use sk_omniroute for localhost if no key, otherwise use selected key
      const keyToUse =
        effectiveApiKey && effectiveApiKey.trim()
          ? effectiveApiKey
          : !cloudEnabled
            ? "sk_omniroute"
            : effectiveApiKey;

      // Send both apiKey (as fallback) and keyId to look up the unmasked string natively
      const res = await fetch("/api/cli-tools/codex-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baseUrl: getEffectiveBaseUrl(),
          apiKey: keyToUse,
          keyId: effectiveApiKey,
          model: selectedModel || CODEX_DEFAULT_MODELS[0],
          reasoningEffort,
          wireApi,
          modelMappings,
          modelCatalog: writeModelCatalog,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(
          data.catalogWarning
            ? { type: "warning", text: `${t("settingsApplied")} ${t("codexCatalogWarning")}` }
            : { type: "success", text: t("settingsApplied") }
        );
        checkCodexStatus();
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
      const res = await fetch("/api/cli-tools/codex-settings", { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: t("settingsReset") });
        setSelectedModel("");
        checkCodexStatus();
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
    if (modalTarget) {
      // Writing to a model mapping alias
      setModelMappings({ ...modelMappings, [modalTarget]: model.value });
    } else {
      // Writing to the default model
      setSelectedModel(model.value);
    }
    setModalOpen(false);
    setModalTarget(null);
  };

  const handleSaveProfile = async () => {
    if (!newProfileName.trim()) return;
    setSavingProfile(true);
    setMessage(null);
    try {
      const res = await fetch("/api/cli-tools/codex-profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newProfileName.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: t("profileSaved", { name: newProfileName }) });
        setNewProfileName("");
        fetchProfiles();
      } else {
        setMessage({
          type: "error",
          text:
            (typeof data.error === "string" ? data.error : data.error?.message) ||
            t("failedSaveProfile"),
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleActivateProfile = async (profileId) => {
    setActivatingProfile(profileId);
    setMessage(null);
    try {
      const res = await fetch("/api/cli-tools/codex-profiles", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileId }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: data.message || t("profileActivated") });
        checkCodexStatus();
        fetchBackups();
      } else {
        setMessage({
          type: "error",
          text:
            (typeof data.error === "string" ? data.error : data.error?.message) ||
            t("failedActivateProfile"),
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setActivatingProfile(null);
    }
  };

  const handleDeleteProfile = async (profileId) => {
    try {
      const res = await fetch("/api/cli-tools/codex-profiles", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileId }),
      });
      if (res.ok) fetchProfiles();
    } catch (error) {
      console.log("Error deleting profile:", error);
    }
  };

  const handleRestoreBackup = async (backupId) => {
    setRestoringBackup(backupId);
    setMessage(null);
    try {
      const res = await fetch("/api/cli-tools/backups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: "codex", backupId }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: t("backupRestored") });
        checkCodexStatus();
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
    const keyToUse = !cloudEnabled ? "sk_omniroute" : "<YOUR_OMNIROUTE_API_KEY>";

    let configContent = `# OmniRoute Configuration for Codex CLI
model = "${selectedModel || CODEX_DEFAULT_MODELS[0]}"`;

    if (reasoningEffort && reasoningEffort !== "none") {
      configContent += `\nmodel_reasoning_effort = "${reasoningEffort}"`;
    }

    if (wireApi === "responses") {
      configContent += `
model_provider = "omniroute"

[model_providers.omniroute]
name = "OmniRoute"
base_url = "${getEffectiveBaseUrl()}"
wire_api = "responses"
env_key = "OPENAI_API_KEY"
`;
    } else {
      configContent += `

# Utilize the built-in OpenAI provider pointed to OmniRoute
openai_base_url = "${getEffectiveBaseUrl()}"
`;
    }

    if (Object.keys(modelMappings).length > 0) {
      configContent += "\n[notice.model_migrations]\n";
      for (const [from, to] of Object.entries(modelMappings)) {
        if (to) {
          configContent += `"${from}" = "${to}"\n`;
        }
      }
    }

    const authContent = JSON.stringify({ OPENAI_API_KEY: keyToUse }, null, 2);

    return [
      {
        filename: "~/.codex/config.toml",
        content: configContent,
      },
      {
        filename: "~/.codex/auth.json",
        content: authContent,
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
            <ProviderIcon providerId="codex" size={32} type="color" />
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
            <p className="text-xs text-text-muted truncate">{t("toolDescriptions.codex")}</p>
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
          {checkingCodex && (
            <div className="flex items-center gap-2 text-text-muted">
              <Icon name="progress_activity" className="animate-spin" />
              <span>{t("checkingCli", { tool: "Codex" })}</span>
            </div>
          )}

          {!checkingCodex && codexStatus && !cliReady && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 p-4 bg-warning/10 border border-warning/30 rounded-lg">
                <Icon name="warning" className="text-warning" />
                <div className="flex-1">
                  <p className="font-medium text-warning">
                    {codexStatus.installed
                      ? t("cliNotRunnable", { tool: "Codex" })
                      : t("cliNotInstalled", { tool: "Codex" })}
                  </p>
                  <p className="text-sm text-text-muted">
                    {codexStatus.installed
                      ? t("cliFoundFailedHealthcheck", {
                          tool: "Codex",
                          reason: codexStatus.reason ? ` (${codexStatus.reason})` : "",
                        })
                      : t("installCodexPrompt")}
                  </p>
                </div>
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
              {showInstallGuide && (
                <div className="p-4 bg-surface border border-border rounded-lg">
                  <h4 className="font-medium mb-3">{t("installationGuide")}</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-text-muted mb-1">{t("platforms")}</p>
                      <code className="block px-3 py-2 bg-bg-subtle rounded font-mono text-xs">
                        npm install -g @openai/codex
                      </code>
                    </div>
                    <p className="text-text-muted">
                      {t("afterInstallationRun")}{" "}
                      <code className="px-1 bg-bg-subtle rounded">codex</code> {t("toVerify")}
                    </p>
                    <div className="pt-2 border-t border-border">
                      <p className="text-text-muted text-xs">
                        {t("codexAuthNotePrefix")}{" "}
                        <code className="px-1 bg-bg-subtle rounded">~/.codex/auth.json</code>{" "}
                        {t("codexAuthNoteMiddle")}{" "}
                        <code className="px-1 bg-bg-subtle rounded">OPENAI_API_KEY</code>.{" "}
                        {t("codexAuthNoteSuffix")}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {!checkingCodex && cliReady && (
            <>
              <div className="flex flex-col gap-2">
                {/* Current Base URL */}
                {codexStatus?.config &&
                  (() => {
                    const parsed = codexStatus.config.match(/base_url\s*=\s*"([^"]+)"/);
                    const currentBaseUrl = parsed ? parsed[1] : null;
                    return currentBaseUrl ? (
                      <div className="flex items-center gap-2">
                        <span className="w-32 shrink-0 text-sm font-semibold text-text-main text-right">
                          {t("current")}
                        </span>
                        <Icon name="arrow_forward" size={14} className="text-text-muted" />
                        <span className="flex-1 px-2 py-1.5 text-xs text-text-muted truncate">
                          {currentBaseUrl}
                        </span>
                      </div>
                    ) : null;
                  })()}

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
                  {customBaseUrl && getDisplayUrl() !== normalizeCodexBaseUrl(baseUrl, wireApi) && (
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
                      {cloudEnabled ? t("noApiKeysCreateOne") : t("defaultOmnirouteKey")}
                    </span>
                  )}
                </div>

                {/* Default Model */}
                <div className="flex items-center gap-2">
                  <span className="w-32 shrink-0 text-sm font-semibold text-text-main text-right">
                    {t("model")}
                  </span>
                  <Icon name="arrow_forward" size={14} className="text-text-muted" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setModalTarget(null);
                      setModalOpen(true);
                    }}
                    disabled={!activeProviders?.length}
                    className="shrink-0 whitespace-nowrap text-xs"
                  >
                    {t("selectModel")}
                  </Button>
                  <Input
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    placeholder="gpt-5.6-sol"
                    aria-label={t("model")}
                    className="min-w-0 w-auto flex-1"
                    inputClassName="text-xs"
                  />
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

                {/* Reasoning Effort */}
                <div className="flex items-center gap-2">
                  <span className="w-32 shrink-0 text-sm font-semibold text-text-main text-right">
                    {t("reasoningEffort")}
                  </span>
                  <Icon name="arrow_forward" size={14} className="text-text-muted" />
                  <Select
                    value={reasoningEffort}
                    onChange={(e) => setReasoningEffort(e.target.value)}
                    aria-label={t("reasoningEffort")}
                    className="min-w-0 w-auto flex-1"
                    selectClassName="text-xs"
                  >
                    <option value="none">{t("effortNone")}</option>
                    <option value="low">{t("effortLow")}</option>
                    <option value="medium">{t("effortMedium")}</option>
                    <option value="high">{t("effortHigh")}</option>
                    <option value="xhigh">{t("effortExtraHigh")}</option>
                    <option value="max">{t("effortMax")}</option>
                    <option value="ultra">{t("effortUltra")}</option>
                  </Select>
                </div>

                {/* Wire API */}
                <div className="flex items-center gap-2">
                  <span className="w-32 shrink-0 text-sm font-semibold text-text-main text-right">
                    {t("wireApi")}
                  </span>
                  <Icon name="arrow_forward" size={14} className="text-text-muted" />
                  <Select
                    value={wireApi}
                    onChange={(e) => setWireApi(e.target.value)}
                    aria-label={t("wireApi")}
                    className="min-w-0 w-auto flex-1"
                    selectClassName="text-xs"
                  >
                    <option value="chat">{t("wireApiChatCompletions")}</option>
                    <option value="responses">{t("wireApiResponses")}</option>
                  </Select>
                </div>

                <Checkbox
                  checked={writeModelCatalog}
                  onChange={(e) => setWriteModelCatalog(e.target.checked)}
                  title={t("codexModelCatalogHint")}
                  className="pl-[8.5rem]"
                  label={<span className="text-xs text-text-main">{t("codexModelCatalog")}</span>}
                />

                <div className="h-px bg-border/50 my-2"></div>

                <div className="text-[11px] text-text-muted mb-2 font-medium uppercase tracking-wider text-right">
                  {t("modelAliases")} ([notice.model_migrations])
                </div>
                {CODEX_DEFAULT_MODELS.map((defaultModel) => (
                  <div key={defaultModel} className="flex items-center gap-2 group">
                    <span className="w-32 shrink-0 text-[11px] font-mono text-text-main text-right truncate opacity-70 group-hover:opacity-100 transition-opacity">
                      {defaultModel}
                    </span>
                    <Icon
                      name="arrow_forward"
                      size={14}
                      className="text-border group-hover:text-primary transition-colors"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setModalTarget(defaultModel);
                        setModalOpen(true);
                      }}
                      disabled={!activeProviders?.length}
                      className="shrink-0 whitespace-nowrap text-xs"
                    >
                      {t("selectModel")}
                    </Button>
                    <Input
                      type="text"
                      value={modelMappings[defaultModel] || ""}
                      onChange={(e) =>
                        setModelMappings({ ...modelMappings, [defaultModel]: e.target.value })
                      }
                      placeholder={t("routeModelPlaceholder", { model: defaultModel })}
                      aria-label={defaultModel}
                      className="min-w-0 w-auto flex-1"
                      inputClassName="text-xs"
                    />
                    {modelMappings[defaultModel] && (
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => {
                          const next = { ...modelMappings };
                          delete next[defaultModel];
                          setModelMappings(next);
                        }}
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

              {message && (
                <div
                  className={`flex items-center gap-2 px-2 py-1.5 rounded text-xs ${message.type === "success" ? "bg-success/10 text-success" : message.type === "warning" ? "bg-warning/10 text-warning" : "bg-error/10 text-error"}`}
                >
                  <Icon
                    name={
                      message.type === "success"
                        ? "check_circle"
                        : message.type === "warning"
                          ? "warning"
                          : "error"
                    }
                    size={14}
                  />
                  <span>{message.text}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleApplySettings}
                  disabled={isApplyDisabled({
                    selectedModel,
                    selectedApiKey: effectiveApiKey,
                    cloudEnabled,
                    apiKeys,
                  })}
                  loading={applying}
                >
                  <Icon name="save" size={14} className="mr-1" />
                  {t("apply")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetSettings}
                  disabled={isResetDisabled({ restoring })}
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
                    setShowProfiles(!showProfiles);
                    if (!showProfiles) fetchProfiles();
                  }}
                >
                  <Icon name="manage_accounts" size={14} className="mr-1" />
                  {t("profiles")}
                </Button>
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

              {/* Profiles Section */}
              {showProfiles && (
                <div className="mt-2 p-3 bg-surface border border-border rounded-lg">
                  <h4 className="text-xs font-semibold text-text-main mb-2 flex items-center gap-1">
                    <Icon name="manage_accounts" size={14} />
                    {t("savedProfiles")}
                  </h4>
                  {profiles.length === 0 ? (
                    <p className="text-xs text-text-muted">{t("noProfilesYet")}</p>
                  ) : (
                    <div className="space-y-1.5 mb-3">
                      {profiles.map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center gap-2 px-2 py-1.5 bg-bg-subtle rounded text-xs"
                        >
                          <Icon name="person" size={14} className="text-text-muted" />
                          <span className="font-medium flex-1 truncate">{p.name}</span>
                          <span
                            className="text-text-muted truncate max-w-[140px]"
                            title={p.authLabel}
                          >
                            {p.authLabel}
                          </span>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleActivateProfile(p.id)}
                            disabled={activatingProfile === p.id}
                            className="h-6 px-2 text-[10px]"
                          >
                            {activatingProfile === p.id ? "..." : t("activate")}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleDeleteProfile(p.id)}
                            title={t("deleteProfile")}
                            aria-label={t("deleteProfile")}
                            className="text-text-muted hover:text-error"
                          >
                            <Icon name="delete" size={14} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      value={newProfileName}
                      onChange={(e) => setNewProfileName(e.target.value)}
                      placeholder={t("profileNamePlaceholder")}
                      aria-label={t("profileNamePlaceholder")}
                      className="min-w-0 w-auto flex-1"
                      inputClassName="text-xs"
                      onKeyDown={(e) => e.key === "Enter" && handleSaveProfile()}
                    />
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleSaveProfile}
                      disabled={!newProfileName.trim()}
                      loading={savingProfile}
                    >
                      <Icon name="save" size={14} className="mr-1" />
                      {t("saveCurrent")}
                    </Button>
                  </div>
                </div>
              )}

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
        selectedModel={selectedModel}
        activeProviders={activeProviders}
        modelAliases={modelAliases}
        title={t("selectModelForTool", { tool: "Codex" })}
      />

      <ManualConfigModal
        isOpen={showManualConfigModal}
        onClose={() => setShowManualConfigModal(false)}
        title={t("codexManualConfiguration")}
        configs={getManualConfigs()}
      />
    </Card>
  );
}
