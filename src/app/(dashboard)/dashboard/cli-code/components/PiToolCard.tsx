"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Card, Button, ModelSelectModal, ManualConfigModal } from "@/shared/components";
import Image from "next/image";
import CliStatusBadge from "./CliStatusBadge";
import { useTranslations } from "next-intl";
import { DEFAULT_DISPLAY_BASE_URL } from "@/shared/hooks";

/** Pi loads this provider with its OpenAI-compatible transport. */
const PI_PROVIDER_API = "openai-completions";

const PI_SETTINGS_URL = "/api/cli-tools/pi-settings";
const PI_BACKUPS_URL = "/api/cli-tools/backups";
const JSON_HEADERS = { "Content-Type": "application/json" };
const INPUT_CLASS =
  "bg-bg-secondary rounded-lg text-sm border border-border focus:outline-none focus:ring-1 focus:ring-primary/50";
const CODE_CLASS = "px-1 py-0.5 rounded bg-black/5 dark:bg-white/10";

/** Pi requires an explicit `/v1` suffix on OmniRoute's base URL. */
function ensurePiV1BaseUrl(baseUrl) {
  const trimmed = String(baseUrl || "")
    .trim()
    .replace(/\/+$/, "");
  return trimmed.endsWith("/v1") ? trimmed : `${trimmed}/v1`;
}

/** The message a failed CLI-tools API response carries, or the fallback. */
function apiErrorText(data, fallback) {
  return (typeof data?.error === "string" ? data.error : data?.error?.message) || fallback;
}

/**
 * Sends one mutating request and turns its outcome into the card message.
 * `readSuccessBody: false` keeps a success that carries no JSON body from
 * being misreported as a failure (backup restore).
 */
async function sendPiRequest(request, { successText, failureText, readSuccessBody = true }) {
  try {
    const res = await request();
    if (res.ok && !readSuccessBody) {
      return { ok: true, message: { type: "success", text: successText(null) } };
    }
    const data = await res.json();
    if (res.ok) return { ok: true, message: { type: "success", text: successText(data) } };
    return {
      ok: false,
      message: {
        type: "error",
        text: apiErrorText(data, failureText),
        containerEphemeralTarget: Boolean(data.containerEphemeralTarget),
      },
    };
  } catch (error) {
    return { ok: false, message: { type: "error", text: error.message } };
  }
}

function buildPiManualConfigs({ modelsPath, baseUrl, apiKeyHint, selectedModel }) {
  return [
    {
      filename: modelsPath || "~/.pi/agent/models.json",
      content: JSON.stringify(
        {
          providers: {
            omniroute: {
              baseUrl: ensurePiV1BaseUrl(baseUrl),
              api: PI_PROVIDER_API,
              apiKey: apiKeyHint || "<API_KEY_FROM_DASHBOARD>",
              omnirouteManaged: true,
              models: selectedModel ? [{ id: selectedModel, name: selectedModel }] : [],
            },
          },
        },
        null,
        2
      ),
    },
  ];
}

/**
 * Runtime/config state from `GET /pi-settings` plus the backups list. The model
 * and endpoint fields start from the live config once, then stay user-owned.
 */
function usePiStatus(isExpanded, baseUrl) {
  const [piStatus, setPiStatus] = useState(null);
  const [checkingPi, setCheckingPi] = useState(false);
  const [backups, setBackups] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [endpointUrl, setEndpointUrl] = useState(baseUrl || DEFAULT_DISPLAY_BASE_URL);
  const hasInitializedModel = useRef(false);
  const hasInitializedEndpoint = useRef(false);

  const fetchBackups = useCallback(async () => {
    try {
      const res = await fetch(`${PI_BACKUPS_URL}?tool=pi`);
      if (res.ok) {
        const data = await res.json();
        setBackups(data.backups || []);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const checkPiStatus = useCallback(async () => {
    setCheckingPi(true);
    try {
      const res = await fetch(PI_SETTINGS_URL);
      const data = await res.json();
      setPiStatus(data);
      // Sync the local model field with whatever is already configured so the
      // card opens showing the live value instead of a blank input.
      if (data.model && !hasInitializedModel.current) {
        setSelectedModel(data.model);
        hasInitializedModel.current = true;
      }
      if (data.baseUrl && !hasInitializedEndpoint.current) {
        setEndpointUrl(data.baseUrl);
        hasInitializedEndpoint.current = true;
      }
    } catch (error) {
      setPiStatus({ error: error.message });
    } finally {
      setCheckingPi(false);
    }
  }, []);

  useEffect(() => {
    if (!(isExpanded && !piStatus)) return;
    // Async continuation so every setState happens after an await
    // (react-hooks/set-state-in-effect: no synchronous setState in effects).
    void (async () => {
      await Promise.all([checkPiStatus(), fetchBackups()]);
    })();
  }, [isExpanded, piStatus, checkPiStatus, fetchBackups]);

  const refresh = useCallback(async () => {
    await checkPiStatus();
    await fetchBackups();
  }, [checkPiStatus, fetchBackups]);

  const editEndpoint = (value) => {
    hasInitializedEndpoint.current = true;
    setEndpointUrl(value);
  };
  const clearModel = () => {
    setSelectedModel("");
    hasInitializedModel.current = false;
  };

  return {
    piStatus,
    checkingPi,
    backups,
    refresh,
    selectedModel,
    setSelectedModel,
    endpointUrl,
    editEndpoint,
    clearModel,
  };
}

/** Apply / reset / restore-backup actions and the message they leave on the card. */
function usePiActions(t, refresh, clearModel) {
  const [applying, setApplying] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [restoringBackup, setRestoringBackup] = useState(null);
  const [message, setMessage] = useState(null);

  const settle = async (outcome, onSuccess = () => {}) => {
    setMessage(outcome.message);
    if (!outcome.ok) return;
    onSuccess();
    await refresh();
  };

  const handleApply = async (body) => {
    setApplying(true);
    setMessage(null);
    try {
      const outcome = await sendPiRequest(
        () =>
          fetch(PI_SETTINGS_URL, {
            method: "POST",
            headers: JSON_HEADERS,
            body: JSON.stringify(body),
          }),
        { successText: (data) => data.message || t("applied"), failureText: t("failed") }
      );
      await settle(outcome);
    } finally {
      setApplying(false);
    }
  };

  const handleReset = async () => {
    setRestoring(true);
    setMessage(null);
    try {
      const outcome = await sendPiRequest(() => fetch(PI_SETTINGS_URL, { method: "DELETE" }), {
        successText: (data) => data.message || t("resetDone"),
        failureText: t("failed"),
      });
      await settle(outcome, clearModel);
    } finally {
      setRestoring(false);
    }
  };

  const handleRestoreBackup = async (backupId) => {
    setRestoringBackup(backupId);
    try {
      const outcome = await sendPiRequest(
        () =>
          fetch(PI_BACKUPS_URL, {
            method: "POST",
            headers: JSON_HEADERS,
            body: JSON.stringify({ tool: "pi", backupId }),
          }),
        {
          successText: () => t("backupRestoredReloading"),
          failureText: t("failedRestoreBackup"),
          readSuccessBody: false,
        }
      );
      await settle(outcome);
    } finally {
      setRestoringBackup(null);
    }
  };

  return {
    applying,
    restoring,
    restoringBackup,
    message,
    handleApply,
    handleReset,
    handleRestoreBackup,
  };
}

function PiCardHeader({ tool, t, isExpanded, onToggle, statusBadge }) {
  return (
    <div className="flex items-center justify-between hover:cursor-pointer" onClick={onToggle}>
      <div className="flex items-center gap-3">
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
            <span className="material-symbols-outlined text-xl" style={{ color: tool.color }}>
              terminal
            </span>
          )}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-sm">{tool.name}</h3>
            <CliStatusBadge {...statusBadge} />
          </div>
          <p className="text-xs text-text-muted truncate">{t("toolDescriptions.pi")}</p>
        </div>
      </div>
      <span
        className={`material-symbols-outlined text-text-muted text-[20px] transition-transform ${isExpanded ? "rotate-180" : ""}`}
      >
        expand_more
      </span>
    </div>
  );
}

function runtimeHeadline(t, piStatus, cliReady) {
  if (cliReady) return t("cliDetectedReady", { tool: "Pi" });
  return piStatus.installed
    ? t("cliNotRunnable", { tool: "Pi" })
    : t("cliNotDetected", { tool: "Pi" });
}

function PiRuntimeStatus({ t, piStatus, cliReady }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border bg-bg-secondary/50 border-border">
      <span
        className={`material-symbols-outlined text-lg ${cliReady ? "text-green-500" : "text-yellow-500"}`}
      >
        {cliReady ? "check_circle" : "warning"}
      </span>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">{runtimeHeadline(t, piStatus, cliReady)}</p>
        {piStatus.commandPath && (
          <p className="text-xs text-text-muted">
            {t("binary")}: <code className={CODE_CLASS}>{piStatus.commandPath}</code>
          </p>
        )}
        {piStatus.modelsPath && (
          <p className="text-xs text-text-muted">
            {t("configPath")}: <code className={CODE_CLASS}>{piStatus.modelsPath}</code>
          </p>
        )}
      </div>
    </div>
  );
}

function PiInstallHint({ t }) {
  return (
    <div className="rounded-lg border border-border bg-bg-secondary/50 p-3">
      <p className="text-sm font-medium mb-1">{t("piInstallTitle")}</p>
      <p className="text-xs text-text-muted mb-2">{t("piInstallInstructions")}</p>
      <code className="block overflow-x-auto whitespace-pre rounded bg-black/5 dark:bg-white/10 px-3 py-2 text-xs">
        {t("piInstallCommand")}
      </code>
      <a
        className="mt-2 inline-block text-xs text-primary hover:underline"
        href="https://github.com/earendil-works/pi"
        target="_blank"
        rel="noreferrer"
      >
        {t("openToolDocs")}
      </a>
    </div>
  );
}

/** Corrupt / foreign models.json — do not let this read as "empty". */
function PiConfigErrorNotice({ t, configError }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
      <span className="material-symbols-outlined text-red-500 text-lg">error</span>
      <div className="flex flex-col gap-1">
        <p className="text-sm text-red-600 dark:text-red-400">{t("piConfigInvalidTitle")}</p>
        <p className="text-xs text-text-muted">{configError}</p>
      </div>
    </div>
  );
}

function PiConfiguredNotice({ t, piStatus }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
      <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
      <div className="flex flex-col gap-1">
        <p className="text-sm text-green-700 dark:text-green-300">{t("piOmnirouteConfigured")}</p>
        <p className="text-xs text-text-muted">
          {t("provider")}: <strong>{piStatus.baseUrl || "—"}</strong>
        </p>
        <p className="text-xs text-text-muted">
          {t("model")}: <strong>{piStatus.model || "—"}</strong>
        </p>
        {piStatus.omniRouteUnowned && (
          <p className="text-xs text-yellow-600 dark:text-yellow-400">{t("piUnownedNote")}</p>
        )}
      </div>
    </div>
  );
}

function PiEndpointField({ t, endpointUrl, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-text-muted" htmlFor="pi-omniroute-endpoint">
        {t("piEndpoint")}
      </label>
      <input
        id="pi-omniroute-endpoint"
        type="url"
        value={endpointUrl}
        onChange={(event) => onChange(event.target.value)}
        placeholder={DEFAULT_DISPLAY_BASE_URL}
        autoComplete="url"
        className={`w-full px-3 py-2 ${INPUT_CLASS}`}
      />
      <p className="text-xs text-text-muted">{t("piEndpointHelp")}</p>
    </div>
  );
}

function PiModelField({ t, selectedModel, onChange, onPick, onManual, hasActiveProviders }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-text-muted">{t("model")}</label>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={selectedModel}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t("providerModelPlaceholder")}
          className={`flex-1 px-3 py-2 ${INPUT_CLASS}`}
        />
        <Button variant="outline" size="sm" onClick={onPick} disabled={!hasActiveProviders}>
          {t("select")}
        </Button>
        <Button variant="ghost" size="sm" onClick={onManual}>
          <span className="material-symbols-outlined text-[16px]">edit</span>
          {t("manualConfig")}
        </Button>
      </div>
      <p className="text-xs text-text-muted">{t("piModelHelp")}</p>
    </div>
  );
}

function PiApiKeyField({ t, apiKeys, effectiveApiKeyId, onChange, cloudEnabled }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-text-muted">{t("apiKey")}</label>
      {apiKeys && apiKeys.length > 0 ? (
        <select
          value={effectiveApiKeyId}
          onChange={(e) => onChange(e.target.value)}
          className={`px-3 py-2 ${INPUT_CLASS}`}
        >
          {apiKeys.map((key) => (
            <option key={key.id} value={key.id}>
              {key.key}
            </option>
          ))}
        </select>
      ) : (
        <p className="text-sm text-text-muted">
          {cloudEnabled ? t("noApiKeysAvailable") : t("usingDefaultOmniroute")}
        </p>
      )}
    </div>
  );
}

function PiActionButtons({ t, configured, canReset, selectedModel, actions, onApply }) {
  return (
    <div className="flex items-center gap-2 pt-2">
      <Button
        variant="primary"
        size="sm"
        onClick={onApply}
        disabled={!selectedModel}
        loading={actions.applying}
      >
        <span className="material-symbols-outlined text-[14px] mr-1">save</span>
        {configured ? t("updateConfig") : t("applyConfig")}
      </Button>
      {canReset && (
        <Button
          variant="outline"
          size="sm"
          onClick={actions.handleReset}
          loading={actions.restoring}
        >
          <span className="material-symbols-outlined text-[14px] mr-1">restart_alt</span>
          {t("reset")}
        </Button>
      )}
    </div>
  );
}

function PiMessageBanner({ message }) {
  const success = message.type === "success";
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${success ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`}
    >
      <span className="material-symbols-outlined text-[16px]">
        {success ? "check_circle" : "error"}
      </span>
      <span className={message.containerEphemeralTarget ? "whitespace-pre-line" : ""}>
        {message.text}
      </span>
    </div>
  );
}

/** Copy-paste fallback for remote/headless installs. */
function PiManualPreview({ t }) {
  return (
    <div className="rounded-lg border border-border bg-bg-secondary/50 p-3">
      <p className="text-xs font-medium text-text-muted mb-2">{t("piManualConfigTitle")}</p>
      <pre className="text-[11px] font-mono overflow-x-auto whitespace-pre text-text-main">
        {t("piManualConfigSample")}
      </pre>
      <p className="text-xs text-text-muted mt-2">{t("piManualConfigHint")}</p>
      <p className="text-xs text-text-muted mt-2">{t("piManualMergeHint")}</p>
    </div>
  );
}

function PiBackupRow({ t, backup, restoringBackup, onRestore }) {
  return (
    <div className="flex items-center justify-between gap-2 p-2 rounded bg-bg-secondary/50 text-xs">
      <div className="flex flex-col">
        <span className="font-medium">{backup.originalFile}</span>
        <span className="text-text-muted">{new Date(backup.createdAt).toLocaleString()}</span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRestore(backup.id)}
        loading={restoringBackup === backup.id}
      >
        {t("restore")}
      </Button>
    </div>
  );
}

function PiBackupsSection({ t, backups, restoringBackup, onRestore, showBackups, setShowBackups }) {
  return (
    <div className="border-t border-border pt-3 mt-1">
      <button
        onClick={() => setShowBackups(!showBackups)}
        className="flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors"
      >
        <span
          className={`material-symbols-outlined text-[16px] transition-transform ${showBackups ? "rotate-90" : ""}`}
        >
          chevron_right
        </span>
        <span className="material-symbols-outlined text-[16px]">backup</span>
        {t("backups")} {backups.length > 0 && `(${backups.length})`}
      </button>
      {showBackups && backups.length > 0 && (
        <div className="mt-2 flex flex-col gap-1.5 pl-6">
          {backups.map((b) => (
            <PiBackupRow
              key={b.id}
              t={t}
              backup={b}
              restoringBackup={restoringBackup}
              onRestore={onRestore}
            />
          ))}
        </div>
      )}
      {showBackups && backups.length === 0 && (
        <p className="mt-2 pl-6 text-xs text-text-muted">{t("noBackupsAvailable")}</p>
      )}
    </div>
  );
}

/** Configuration form shown once pi runs and its models.json is readable. */
function PiConfigureSection({ card }) {
  const { t, status, actions, configStatus } = card;
  return (
    <>
      {configStatus === "configured" && <PiConfiguredNotice t={t} piStatus={status.piStatus} />}
      <PiEndpointField t={t} endpointUrl={status.endpointUrl} onChange={status.editEndpoint} />
      <PiModelField
        t={t}
        selectedModel={status.selectedModel}
        onChange={status.setSelectedModel}
        onPick={card.openModelModal}
        onManual={card.openManualConfig}
        hasActiveProviders={card.hasActiveProviders}
      />
      <PiApiKeyField
        t={t}
        apiKeys={card.apiKeys}
        effectiveApiKeyId={card.effectiveApiKeyId}
        onChange={card.setSelectedApiKeyId}
        cloudEnabled={card.cloudEnabled}
      />
      <PiActionButtons
        t={t}
        configured={configStatus === "configured"}
        canReset={card.canReset}
        selectedModel={status.selectedModel}
        actions={actions}
        onApply={card.apply}
      />
      {actions.message && <PiMessageBanner message={actions.message} />}
      <PiManualPreview t={t} />
      <PiBackupsSection
        t={t}
        backups={status.backups}
        restoringBackup={actions.restoringBackup}
        onRestore={actions.handleRestoreBackup}
        showBackups={card.showBackups}
        setShowBackups={card.setShowBackups}
      />
    </>
  );
}

function PiExpandedBody({ card }) {
  const { t, status, cliReady } = card;
  const { piStatus, checkingPi } = status;
  // models.json the user (or another tool) hand-edited into something Pi
  // cannot load. Show the reason instead of pretending it is merely empty.
  const configError = piStatus?.configError;
  return (
    <div className="mt-6 pt-6 border-t border-border">
      {checkingPi && (
        <div className="flex items-center gap-2 text-text-muted text-sm">
          <span className="material-symbols-outlined animate-spin text-base">
            progress_activity
          </span>
          <span>{t("checkingCli", { tool: "Pi" })}</span>
        </div>
      )}
      {piStatus && !checkingPi && (
        <div className="flex flex-col gap-4">
          <PiRuntimeStatus t={t} piStatus={piStatus} cliReady={cliReady} />
          {!cliReady && <PiInstallHint t={t} />}
          {configError && <PiConfigErrorNotice t={t} configError={configError} />}
          {cliReady && !configError && <PiConfigureSection card={card} />}
        </div>
      )}
    </div>
  );
}

/** Config status, reset ownership and the effective key / endpoint the card acts on. */
function derivePiCardState({
  piStatus,
  batchStatus,
  selectedApiKeyId,
  apiKeys,
  endpointUrl,
  baseUrl,
}) {
  const cliReady = !!(piStatus?.installed && piStatus?.runnable);
  let configStatus = null;
  if (cliReady) configStatus = piStatus.hasOmniRoute ? "configured" : "not_configured";
  return {
    cliReady,
    configStatus,
    effectiveConfigStatus: configStatus || batchStatus?.configStatus || null,
    // Only offer Reset for an entry OmniRoute owns; a hand-edited provider that
    // merely points at this instance is not ours to delete.
    canReset: configStatus === "configured" && piStatus.omniRouteOwned !== false,
    // (#523) Store the key *id* (not the masked string) so the backend resolves
    // the real secret from the DB before writing it to models.json.
    effectiveApiKeyId: selectedApiKeyId || (apiKeys?.length > 0 ? apiKeys[0].id : ""),
    effectiveBaseUrl: endpointUrl || baseUrl || DEFAULT_DISPLAY_BASE_URL,
  };
}

function PiModals({ card, activeProviders, modalOpen, setModalOpen, showManual, setShowManual }) {
  const { t, status, apiKeys, effectiveApiKeyId } = card;
  const handleSelectModel = (model) => {
    status.setSelectedModel(model.value);
    setModalOpen(false);
  };
  return (
    <>
      <ModelSelectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={handleSelectModel}
        selectedModel={status.selectedModel}
        activeProviders={activeProviders}
        title={t("selectModelForTool", { tool: "Pi" })}
      />
      {showManual && (
        <ManualConfigModal
          isOpen={showManual}
          onClose={() => setShowManual(false)}
          title={t("piManualConfiguration")}
          configs={buildPiManualConfigs({
            modelsPath: status.piStatus?.modelsPath,
            baseUrl: card.effectiveBaseUrl,
            apiKeyHint: apiKeys?.find((k) => k.id === effectiveApiKeyId)?.key,
            selectedModel: status.selectedModel,
          })}
        />
      )}
    </>
  );
}

/**
 * Pi Coding Agent integration card.
 *
 * Pi loads custom providers from `~/.pi/agent/models.json` (relocatable with
 * `PI_CODING_AGENT_DIR`). OmniRoute registers itself as an `openai-completions`
 * provider named `omniroute` with an explicit model list — Pi never auto-lists
 * models for custom endpoints.
 */
export default function PiToolCard({
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
  const status = usePiStatus(isExpanded, baseUrl);
  const actions = usePiActions(t, status.refresh, status.clearModel);
  const [selectedApiKeyId, setSelectedApiKeyId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [showManualConfigModal, setShowManualConfigModal] = useState(false);
  const [showBackups, setShowBackups] = useState(false);
  const derived = derivePiCardState({
    piStatus: status.piStatus,
    batchStatus,
    selectedApiKeyId,
    apiKeys,
    endpointUrl: status.endpointUrl,
    baseUrl,
  });

  const card = {
    ...derived,
    t,
    status,
    actions,
    hasActiveProviders,
    apiKeys,
    cloudEnabled,
    setSelectedApiKeyId,
    showBackups,
    setShowBackups,
    openModelModal: () => setModalOpen(true),
    openManualConfig: () => setShowManualConfigModal(true),
    apply: () =>
      actions.handleApply({
        baseUrl: ensurePiV1BaseUrl(derived.effectiveBaseUrl),
        apiKey: !cloudEnabled ? "sk_omniroute" : null,
        keyId: derived.effectiveApiKeyId?.trim() || null,
        model: status.selectedModel,
      }),
  };

  return (
    <Card padding="sm" className="overflow-hidden">
      <PiCardHeader
        tool={tool}
        t={t}
        isExpanded={isExpanded}
        onToggle={onToggle}
        statusBadge={{
          effectiveConfigStatus: derived.effectiveConfigStatus,
          batchStatus,
          lastConfiguredAt,
        }}
      />
      {isExpanded && <PiExpandedBody card={card} />}
      <PiModals
        card={card}
        activeProviders={activeProviders}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        showManual={showManualConfigModal}
        setShowManual={setShowManualConfigModal}
      />
    </Card>
  );
}
