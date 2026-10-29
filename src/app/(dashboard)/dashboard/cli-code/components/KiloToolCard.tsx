"use client";

import { useState, useEffect, useRef, useCallback, useId } from "react";
import Icon from "@/shared/components/Icon";
import { Card, Button, ModelSelectModal, ManualConfigModal } from "@/shared/components";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import Image from "next/image";
import CliStatusBadge from "./CliStatusBadge";
import { useTranslations } from "next-intl";
import { Field } from "@omniroute/ui-kit/field";
import { DEFAULT_DISPLAY_BASE_URL } from "@/shared/hooks";
import { cn } from "@/shared/utils/cn";
import { CARD_TOGGLE_CLASS, cardToggleProps } from "./cardToggle";

const CLOUD_URL = process.env.NEXT_PUBLIC_CLOUD_URL;

export default function KiloToolCard({
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
  const modelInputId = useId();
  const apiKeySelectId = useId();
  const [kiloStatus, setKiloStatus] = useState(null);
  const [checkingKilo, setCheckingKilo] = useState(false);
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
  const cliReady = !!(kiloStatus?.installed && kiloStatus?.runnable);

  const getConfigStatus = () => {
    if (!cliReady) return null;
    if (!kiloStatus.hasOmniRoute) return "not_configured";
    return "configured";
  };

  const configStatus = getConfigStatus();

  // Use batch status as fallback when card hasn't been expanded yet
  const effectiveConfigStatus = configStatus || batchStatus?.configStatus || null;

  // (#523) Store the key *id* (not the masked string) so the backend can
  // resolve the real secret from DB before writing to config files. Default to
  // the first available key while the user hasn't picked one — derived during
  // render instead of synced through an effect (react-hooks/set-state-in-effect).
  const effectiveApiKeyId = selectedApiKeyId || (apiKeys?.length > 0 ? apiKeys[0].id : "");

  const fetchModelAliases = useCallback(async () => {
    try {
      const res = await fetch("/api/models/alias");
      if (res.ok) {
        const data = await res.json();
        setModelAliases(data.aliases || {});
      }
    } catch {
      /* ignore */
    }
  }, []);

  const fetchBackups = useCallback(async () => {
    try {
      const res = await fetch("/api/cli-tools/backups?tool=kilo");
      if (res.ok) {
        const data = await res.json();
        setBackups(data.backups || []);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const checkKiloStatus = useCallback(async () => {
    setCheckingKilo(true);
    try {
      const res = await fetch("/api/cli-tools/kilo-settings");
      const data = await res.json();
      setKiloStatus(data);
    } catch (error) {
      setKiloStatus({ error: error.message });
    } finally {
      setCheckingKilo(false);
    }
  }, []);

  useEffect(() => {
    if (!(isExpanded && !kiloStatus)) return;
    // Load in an async continuation so every setState happens after an await
    // (react-hooks/set-state-in-effect: no synchronous setState in effect bodies).
    void (async () => {
      await Promise.all([checkKiloStatus(), fetchModelAliases(), fetchBackups()]);
    })();
  }, [isExpanded, kiloStatus, checkKiloStatus, fetchModelAliases, fetchBackups]);

  const handleRestoreBackup = async (backupId) => {
    setRestoringBackup(backupId);
    try {
      const res = await fetch("/api/cli-tools/backups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: "kilo", backupId }),
      });
      if (res.ok) {
        setMessage({ type: "success", text: t("backupRestoredReloading") });
        await checkKiloStatus();
        await fetchBackups();
      } else {
        const data = await res.json();
        setMessage({
          type: "error",
          text:
            (typeof data.error === "string" ? data.error : data.error?.message) ||
            t("failedRestoreBackup"),
        });
      }
    } catch (e) {
      setMessage({ type: "error", text: e.message });
    } finally {
      setRestoringBackup(null);
    }
  };

  const getEffectiveBaseUrl = () => {
    if (customBaseUrl) return customBaseUrl;
    return baseUrl || DEFAULT_DISPLAY_BASE_URL;
  };

  const handleApply = async () => {
    setApplying(true);
    setMessage(null);
    try {
      const effectiveBaseUrl = getEffectiveBaseUrl();
      const normalizedBaseUrl = effectiveBaseUrl.endsWith("/v1")
        ? effectiveBaseUrl
        : `${effectiveBaseUrl}/v1`;

      // (#523) Prefer keyId lookup so the backend writes the real key to disk.
      const selectedKeyId = effectiveApiKeyId?.trim() || null;

      const res = await fetch("/api/cli-tools/kilo-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baseUrl: normalizedBaseUrl,
          apiKey: !cloudEnabled ? "sk_omniroute" : null,
          keyId: selectedKeyId,
          model: selectedModel,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: data.message || t("applied") });
        await checkKiloStatus();
        await fetchBackups();
      } else {
        setMessage({
          type: "error",
          text: (typeof data.error === "string" ? data.error : data.error?.message) || t("failed"),
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setApplying(false);
    }
  };

  const handleReset = async () => {
    setRestoring(true);
    setMessage(null);
    try {
      const res = await fetch("/api/cli-tools/kilo-settings", { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: data.message || t("resetDone") });
        setSelectedModel("");
        hasInitializedModel.current = false;
        await checkKiloStatus();
        await fetchBackups();
      } else {
        setMessage({
          type: "error",
          text: (typeof data.error === "string" ? data.error : data.error?.message) || t("failed"),
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setRestoring(false);
    }
  };

  const handleSelectModel = (model) => {
    setSelectedModel(model.value);
    setModalOpen(false);
  };

  const handleManualConfig = (config) => {
    if (config.model) setSelectedModel(config.model);
    // (#523) Match apiKey string to key id if possible.
    // apiKey may be a structured secret reference (object) rather than a
    // plaintext string. Only match on strings.
    if (typeof config.apiKey === "string" && config.apiKey && apiKeys?.length > 0) {
      const prefix = config.apiKey.slice(0, 8);
      const suffix = config.apiKey.slice(-4);
      const matchedKey = apiKeys.find(
        (k) => k.key && k.key.startsWith(prefix) && k.key.endsWith(suffix)
      );
      if (matchedKey) setSelectedApiKeyId(matchedKey.id);
    }
    if (config.baseUrl) setCustomBaseUrl(config.baseUrl);
    setShowManualConfigModal(false);
  };

  return (
    <Card padding="sm" className="overflow-hidden">
      <div
        className={cn("flex items-center justify-between hover:cursor-pointer", CARD_TOGGLE_CLASS)}
        {...cardToggleProps(isExpanded, onToggle)}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="size-8 rounded-lg flex items-center justify-center shrink-0">
            {tool.image ? (
              <Image
                src={tool.image}
                alt={tool.name}
                width={32}
                height={32}
                className="size-8 object-contain rounded-lg"
                sizes="32px"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = "none";
                }}
              />
            ) : (
              <span className="inline-flex" style={{ color: tool.color }}>
                <Icon name="terminal" size={20} />
              </span>
            )}
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
            <p className="text-xs text-text-muted truncate">{t("toolDescriptions.kilo")}</p>
          </div>
        </div>
        <Icon
          name="expand_more"
          size={20}
          className={cn("text-text-muted transition-transform", isExpanded && "rotate-180")}
        />
      </div>

      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-border">
          {checkingKilo && (
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <Icon name="progress_activity" size={16} className="animate-spin" />
              <span>{t("checkingCli", { tool: "Kilo Code" })}</span>
            </div>
          )}

          {kiloStatus && !checkingKilo && (
            <div className="flex flex-col gap-4">
              {/* Runtime status */}
              <div className="flex items-start gap-3 p-3 rounded-lg border bg-bg-subtle/50 border-border">
                <Icon
                  name={cliReady ? "check_circle" : "warning"}
                  size={18}
                  className={cliReady ? "text-success" : "text-warning"}
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">
                    {cliReady
                      ? t("cliDetectedReady", { tool: "Kilo Code" })
                      : kiloStatus.installed
                        ? t("cliNotRunnable", { tool: "Kilo Code" })
                        : t("cliNotDetected", { tool: "Kilo Code" })}
                  </p>
                  {kiloStatus.commandPath && (
                    <p className="text-xs text-text-muted">
                      {t("binary")}:{" "}
                      <code className="px-1 py-0.5 rounded bg-bg-subtle">
                        {kiloStatus.commandPath}
                      </code>
                    </p>
                  )}
                  {kiloStatus.authPath && (
                    <p className="text-xs text-text-muted">
                      {t("auth")}:{" "}
                      <code className="px-1 py-0.5 rounded bg-bg-subtle">
                        {kiloStatus.authPath}
                      </code>
                    </p>
                  )}
                </div>
              </div>

              {cliReady && (
                <>
                  {/* Current config info */}
                  {configStatus === "configured" && (
                    <div className="flex items-start gap-3 p-3 bg-success/10 border border-success/30 rounded-lg">
                      <Icon name="check_circle" size={18} className="text-success" />
                      <div className="flex flex-col gap-1">
                        <p className="text-sm text-success">
                          {t("omnirouteConfiguredOpenAiCompatible")}
                        </p>
                        <p className="text-xs text-text-muted">
                          {t("providers")}:{" "}
                          <strong>{kiloStatus.settings?.auth?.join(", ") || "—"}</strong>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Model selection */}
                  <Field label={t("model")} htmlFor={modelInputId}>
                    <div className="flex items-center gap-2">
                      <Input
                        id={modelInputId}
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        placeholder={t("providerModelPlaceholder")}
                        className="min-w-0 w-auto flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setModalOpen(true)}
                        disabled={!hasActiveProviders}
                      >
                        {t("select")}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowManualConfigModal(true)}
                        aria-label={t("manualConfig")}
                        title={t("manualConfig")}
                      >
                        <Icon name="edit" size={16} />
                      </Button>
                    </div>
                  </Field>

                  {/* API Key selection */}
                  <Field label={t("apiKey")} htmlFor={apiKeySelectId}>
                    {apiKeys && apiKeys.length > 0 ? (
                      <Select
                        id={apiKeySelectId}
                        value={effectiveApiKeyId}
                        onChange={(e) => setSelectedApiKeyId(e.target.value)}
                      >
                        {apiKeys.map((key) => (
                          <option key={key.id} value={key.id}>
                            {key.key}
                          </option>
                        ))}
                      </Select>
                    ) : (
                      <p className="text-sm text-text-muted">
                        {cloudEnabled ? t("noApiKeysAvailable") : t("usingDefaultOmniroute")}
                      </p>
                    )}
                  </Field>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 pt-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleApply}
                      disabled={!selectedModel}
                      loading={applying}
                    >
                      <Icon name="save" size={14} className="mr-1" />
                      {configStatus === "configured" ? t("updateConfig") : t("applyConfig")}
                    </Button>
                    {configStatus === "configured" && (
                      <Button variant="outline" size="sm" onClick={handleReset} loading={restoring}>
                        <Icon name="restart_alt" size={14} className="mr-1" />
                        {t("reset")}
                      </Button>
                    )}
                  </div>

                  {/* Message */}
                  {message && (
                    <div
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${message.type === "success" ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}
                    >
                      <Icon
                        name={message.type === "success" ? "check_circle" : "error"}
                        size={16}
                      />
                      <span>{message.text}</span>
                    </div>
                  )}

                  {/* Backups section */}
                  <div className="border-t border-border pt-3 mt-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      aria-expanded={showBackups}
                      onClick={() => setShowBackups(!showBackups)}
                      className="gap-2 px-0 text-sm text-text-muted hover:text-text-main"
                    >
                      <Icon
                        name="chevron_right"
                        size={16}
                        className={cn("transition-transform", showBackups && "rotate-90")}
                      />
                      <Icon name="backup" size={16} />
                      {t("backups")} {backups.length > 0 && `(${backups.length})`}
                    </Button>
                    {showBackups && backups.length > 0 && (
                      <div className="mt-2 flex flex-col gap-1.5 pl-6">
                        {backups.map((b) => (
                          <div
                            key={b.id}
                            className="flex items-center justify-between gap-2 p-2 rounded bg-bg-subtle/50 text-xs"
                          >
                            <div className="flex flex-col">
                              <span className="font-medium">{b.originalFile}</span>
                              <span className="text-text-muted">
                                {new Date(b.createdAt).toLocaleString()}
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRestoreBackup(b.id)}
                              loading={restoringBackup === b.id}
                            >
                              {t("restore")}
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    {showBackups && backups.length === 0 && (
                      <p className="mt-2 pl-6 text-xs text-text-muted">{t("noBackupsAvailable")}</p>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      <ModelSelectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={handleSelectModel}
        selectedModel={selectedModel}
        activeProviders={activeProviders}
        title={t("selectModelForTool", { tool: "Kilo Code" })}
      />
      {showManualConfigModal && (
        <ManualConfigModal
          isOpen={showManualConfigModal}
          onClose={() => setShowManualConfigModal(false)}
          title={t("kiloManualConfiguration")}
          {...({
            onApply: handleManualConfig,
            currentConfig: {
              model: selectedModel,
              apiKey: apiKeys?.find((k) => k.id === effectiveApiKeyId)?.key || "",
              baseUrl: customBaseUrl || baseUrl,
            },
          } as any)}
        />
      )}
    </Card>
  );
}
