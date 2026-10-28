"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Icon from "@/shared/components/Icon";
import { Card, Button, ModelSelectModal } from "@/shared/components";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import { useTranslations } from "next-intl";
import { copyToClipboard } from "@/shared/utils/clipboard";
import { buildOpenCodeConfigDocument } from "@/shared/services/opencodeConfig";
import { useTheme } from "@/shared/hooks/useTheme";
import { DEFAULT_DISPLAY_BASE_URL } from "@/shared/hooks";
import ProviderIcon from "@/shared/components/ProviderIcon";
import { cn } from "@/shared/utils/cn";
import { CARD_TOGGLE_CLASS, cardToggleProps } from "./cardToggle";

export default function DefaultToolCard({
  toolId,
  tool,
  isExpanded = false,
  onToggle = () => {},
  baseUrl,
  apiKeys,
  activeProviders = [],
  cloudEnabled = false,
  batchStatus,
  catalog = [],
}) {
  const t = useTranslations("cliTools");
  const translateOrFallback = useCallback(
    (key, fallback, values = undefined) => {
      if (!t.has(key)) return fallback;
      try {
        return t(key, values);
      } catch {
        return fallback;
      }
    },
    [t]
  );
  const [copiedField, setCopiedField] = useState(null);
  const [showModelModal, setShowModelModal] = useState(false);
  const [modelValue, setModelValue] = useState("");
  const [modelValues, setModelValues] = useState<string[]>([]);
  const [runtimeStatus, setRuntimeStatus] = useState(null);
  const [message, setMessage] = useState(null);
  const [saving, setSaving] = useState(false);
  const runtimeFetchStartedRef = useRef(false);
  const { isDark } = useTheme();

  // (#523) Initialize state with key *id* instead of masked key string
  const [selectedApiKeyId, setSelectedApiKeyId] = useState(() =>
    apiKeys?.length > 0 ? apiKeys[0].id : ""
  );
  const isMultiModelTool = tool.modelSelectionMode === "multiple";
  const usesOpenCodePreview = tool.previewConfigMode === "opencode";
  const usesQwenCodePreview = tool.previewConfigMode === "qwen";
  const selectedKeyObj = apiKeys?.find((k) => k.id === selectedApiKeyId);

  const resolveApiKeyValue = useCallback(
    () => selectedKeyObj?.rawKey || (!cloudEnabled ? "sk_omniroute" : t("yourApiKeyPlaceholder")),
    [cloudEnabled, selectedKeyObj?.rawKey, t]
  );

  const getSelectedModelEntries = useCallback(() => {
    const selectedValues = isMultiModelTool
      ? modelValues.length > 0
        ? modelValues
        : modelValue
          ? [modelValue]
          : []
      : modelValue
        ? [modelValue]
        : [];

    const availableModels = Array.isArray(activeProviders)
      ? activeProviders.flatMap((provider) => provider?.models || [])
      : [];
    const modelMap = new Map(
      availableModels.filter((model) => model?.value).map((model) => [model.value, model])
    );

    return selectedValues.map((value) => {
      const matched = modelMap.get(value);
      return {
        value,
        label: matched?.name || matched?.label || value,
      };
    });
  }, [activeProviders, isMultiModelTool, modelValue, modelValues]);

  const getSelectedModelLabels = useCallback(
    () => getSelectedModelEntries().map((entry) => entry.label),
    [getSelectedModelEntries]
  );

  const getSelectedModelLabelMap = useCallback(
    () => Object.fromEntries(getSelectedModelEntries().map((entry) => [entry.value, entry.label])),
    [getSelectedModelEntries]
  );

  const normalizedBaseUrl = baseUrl || DEFAULT_DISPLAY_BASE_URL;
  const baseUrlWithV1 = normalizedBaseUrl.endsWith("/v1")
    ? normalizedBaseUrl
    : `${normalizedBaseUrl}/v1`;

  // Persist and restore model selection per tool via localStorage
  useEffect(() => {
    const restoreTimer = window.setTimeout(() => {
      const savedModel = localStorage.getItem(`omniroute-cli-model-${toolId}`);
      if (savedModel) {
        if (isMultiModelTool) {
          try {
            const parsed = JSON.parse(savedModel);
            if (Array.isArray(parsed)) {
              const normalized = parsed.map((value) => String(value || "").trim()).filter(Boolean);
              setModelValues(normalized);
              setModelValue(normalized[0] || "");
            } else {
              setModelValue(savedModel);
              setModelValues([savedModel]);
            }
          } catch {
            setModelValue(savedModel);
            setModelValues([savedModel]);
          }
        } else {
          setModelValue(savedModel);
        }
      }
      const savedKey = localStorage.getItem(`omniroute-cli-key-${toolId}`);
      // (#523) localStorage may contain a masked key string from before the fix —
      // match by prefix/suffix against known keys to find the id.
      if (savedKey && apiKeys?.length > 0) {
        const prefix = savedKey.slice(0, 8);
        const suffix = savedKey.slice(-4);
        const matchedKey = apiKeys.find(
          (k) =>
            (k.rawKey && k.rawKey.startsWith(prefix) && k.rawKey.endsWith(suffix)) ||
            (k.key && k.key.startsWith(prefix) && k.key.endsWith(suffix))
        );
        if (matchedKey) setSelectedApiKeyId(matchedKey.id);
      }
    }, 0);

    return () => window.clearTimeout(restoreTimer);
  }, [toolId, apiKeys, isMultiModelTool]);

  const handleModelChange = useCallback(
    (value) => {
      setModelValue(value);
      if (value) {
        localStorage.setItem(`omniroute-cli-model-${toolId}`, value);
      } else {
        localStorage.removeItem(`omniroute-cli-model-${toolId}`);
      }
    },
    [toolId]
  );

  const handleModelValuesChange = useCallback(
    (values) => {
      const normalized = Array.isArray(values)
        ? [...new Set(values.map((value) => String(value || "").trim()).filter(Boolean))]
        : [];

      setModelValues(normalized);
      setModelValue(normalized[0] || "");

      if (normalized.length > 0) {
        localStorage.setItem(`omniroute-cli-model-${toolId}`, JSON.stringify(normalized));
      } else {
        localStorage.removeItem(`omniroute-cli-model-${toolId}`);
      }
    },
    [toolId]
  );

  const handleApiKeyChange = useCallback(
    (value) => {
      setSelectedApiKeyId(value);
      if (value) {
        // (#523) Store the key id in localStorage for persistence
        localStorage.setItem(`omniroute-cli-key-${toolId}`, value);
      }
    },
    [toolId]
  );

  useEffect(() => {
    if (!isExpanded || runtimeStatus || runtimeFetchStartedRef.current) return;

    runtimeFetchStartedRef.current = true;
    fetch(`/api/cli-tools/runtime/${toolId}`)
      .then((res) => res.json())
      .then((data) => setRuntimeStatus(data))
      .catch((error) => setRuntimeStatus({ error: error?.message || t("runtimeCheckFailed") }));
  }, [isExpanded, runtimeStatus, t, toolId]);

  const replaceVars = useCallback(
    (text, modelOverride = "") => {
      const keyToUse = resolveApiKeyValue();

      return text
        .replace(/\{\{baseUrl\}\}/g, baseUrlWithV1)
        .replace(/\{\{apiKey\}\}/g, keyToUse)
        .replace(
          /\{\{model\}\}/g,
          modelOverride || getSelectedModelLabels()[0] || t("modelPlaceholder")
        );
    },
    [baseUrlWithV1, getSelectedModelLabels, resolveApiKeyValue, t]
  );

  const handleCopy = async (text, field) => {
    await copyToClipboard(replaceVars(text));
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getSelectedModels = useCallback(() => {
    if (!isMultiModelTool) return modelValue ? [modelValue] : [];
    return modelValues.length > 0 ? modelValues : modelValue ? [modelValue] : [];
  }, [isMultiModelTool, modelValue, modelValues]);

  const getRenderedCodeBlock = useCallback(() => {
    if (!tool.codeBlock?.code) return "";
    if (usesQwenCodePreview) {
      return replaceVars(tool.codeBlock.code, getSelectedModels()[0]);
    }
    if (!usesOpenCodePreview) return replaceVars(tool.codeBlock.code);

    const keyToUse = resolveApiKeyValue();
    return JSON.stringify(
      buildOpenCodeConfigDocument({
        baseUrl: baseUrlWithV1,
        apiKey: keyToUse,
        models: getSelectedModels(),
        model: getSelectedModels()[0],
        modelLabels: getSelectedModelLabelMap(),
        catalog,
      }),
      null,
      2
    );
  }, [
    baseUrlWithV1,
    catalog,
    getSelectedModels,
    getSelectedModelLabelMap,
    replaceVars,
    resolveApiKeyValue,
    tool.codeBlock,
    usesOpenCodePreview,
    usesQwenCodePreview,
  ]);

  const handleSelectModel = (model) => {
    if (!isMultiModelTool) {
      handleModelChange(model.value);
      return;
    }

    if (!model) {
      handleModelValuesChange([]);
      return;
    }

    if (modelValues.includes(model.value)) {
      handleModelValuesChange(modelValues.filter((value) => value !== model.value));
      return;
    }

    handleModelValuesChange([...modelValues, model.value]);
  };

  const hasActiveProviders = activeProviders.length > 0;
  const checkingRuntime = isExpanded && runtimeStatus === null;

  // Save config to file (for tools that support it, like Continue)
  const handleSaveConfig = async () => {
    setSaving(true);
    setMessage(null);
    try {
      // (#523) Prefer keyId lookup so the backend writes the real key to disk.
      const selectedKeyId = selectedApiKeyId?.trim() || null;

      const saveEndpoint =
        toolId === "qwen"
          ? "/api/cli-tools/qwen-settings"
          : toolId === "whycodes"
            ? "/api/cli-tools/whycodes-settings"
            : `/api/cli-tools/guide-settings/${toolId}`;
      const res = await fetch(saveEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baseUrl: baseUrlWithV1,
          apiKey: !cloudEnabled ? "sk_omniroute" : null,
          keyId: selectedKeyId,
          model: modelValue,
          models: isMultiModelTool ? getSelectedModels() : undefined,
          modelLabels: getSelectedModelLabelMap(),
          ...(usesOpenCodePreview ? { catalog } : {}),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: data.message || t("configurationSaved") });
      } else {
        setMessage({
          type: "error",
          text:
            (typeof data.error === "string" ? data.error : data.error?.message) ||
            t("failedToSave"),
          // 422 from the container guard: the body is host-CLI guidance, not a failure.
          containerEphemeralTarget: Boolean(data.containerEphemeralTarget),
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setSaving(false);
    }
  };

  // Check if this tool supports direct config file write
  const supportsDirectSave = ["continue", "opencode", "qwen", "whycodes"].includes(toolId);

  const renderApiKeySelector = () => {
    return (
      <div className="mt-2 flex items-center gap-2">
        {apiKeys && apiKeys.length > 0 ? (
          <>
            <Select
              value={selectedApiKeyId}
              onChange={(e) => handleApiKeyChange(e.target.value)}
              aria-label={t("apiKey")}
              className="min-w-0 w-auto flex-1"
            >
              {apiKeys.map((key) => (
                <option key={key.id} value={key.id}>
                  {key.key}
                </option>
              ))}
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                handleCopy(resolveApiKeyValue(), "apiKey");
              }}
              aria-label={copiedField === "apiKey" ? t("copied") : t("copy")}
              title={copiedField === "apiKey" ? t("copied") : t("copy")}
              className="shrink-0"
            >
              <Icon name={copiedField === "apiKey" ? "check" : "content_copy"} size={18} />
            </Button>
          </>
        ) : (
          <span className="text-sm text-text-muted">
            {cloudEnabled ? t("noApiKeysCreateOne") : "sk_omniroute"}
          </span>
        )}
      </div>
    );
  };

  const renderModelSelector = () => {
    const displayValue = isMultiModelTool
      ? getSelectedModelLabels().join(", ")
      : getSelectedModelLabels()[0] || "";

    return (
      <div className="mt-2 flex items-center gap-2">
        <Input
          value={displayValue}
          onChange={(e) =>
            isMultiModelTool
              ? handleModelValuesChange(
                  e.target.value
                    .split(",")
                    .map((value) => value.trim())
                    .filter(Boolean)
                )
              : handleModelChange(e.target.value)
          }
          placeholder={t("modelPlaceholder")}
          aria-label={t("model")}
          className="min-w-0 w-auto flex-1"
        />
        <Button
          variant="outline"
          onClick={() => setShowModelModal(true)}
          disabled={!hasActiveProviders}
          className="shrink-0"
        >
          {t("selectModel")}
        </Button>
        {displayValue && (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleCopy(displayValue, "model")}
              aria-label={copiedField === "model" ? t("copied") : t("copy")}
              title={copiedField === "model" ? t("copied") : t("copy")}
              className="shrink-0"
            >
              <Icon name={copiedField === "model" ? "check" : "content_copy"} size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() =>
                isMultiModelTool ? handleModelValuesChange([]) : handleModelChange("")
              }
              title={t("clear")}
              aria-label={t("clear")}
              className="text-text-muted hover:text-error"
            >
              <Icon name="close" size={18} />
            </Button>
          </>
        )}
      </div>
    );
  };

  const renderNotes = () => {
    if (!tool.notes || tool.notes.length === 0) return null;

    return (
      <div className="flex flex-col gap-2 mb-4">
        {tool.notes.map((note, index) => {
          if (note.type === "cloudCheck" && cloudEnabled) return null;

          const isWarning = note.type === "warning";
          const isError = note.type === "cloudCheck" && !cloudEnabled;

          let bgClass = "bg-info/10 border-info/30";
          let textClass = "text-info ";
          let iconClass = "text-info";
          let icon = "info";

          if (isWarning) {
            bgClass = "bg-warning/10 border-warning/30";
            textClass = "text-warning ";
            iconClass = "text-warning";
            icon = "warning";
          } else if (isError) {
            bgClass = "bg-error/10 border-error/30";
            textClass = "text-error ";
            iconClass = "text-error";
            icon = "error";
          }

          return (
            <div key={index} className={`flex items-start gap-3 p-3 rounded-lg border ${bgClass}`}>
              <Icon name={icon} size={18} className={iconClass} />
              <p className={`text-sm ${textClass}`}>
                {translateOrFallback(`guides.${toolId}.notes.${index}`, note.text)}
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  const canShowGuide = () => {
    if (tool.requiresCloud && !cloudEnabled) return false;
    return true;
  };

  const renderGuideSteps = () => {
    if (!tool.guideSteps) return <p className="text-text-muted text-sm">{t("comingSoon")}</p>;

    return (
      <div className="flex flex-col gap-4">
        {checkingRuntime && (
          <div className="flex items-center gap-2 text-text-muted text-sm">
            <Icon name="progress_activity" size={16} className="animate-spin" />
            <span>{t("checkingRuntime")}</span>
          </div>
        )}
        {!checkingRuntime && runtimeStatus && !runtimeStatus.error && (
          <div className="flex items-start gap-3 p-3 bg-info/10 border border-info/30 rounded-lg">
            <Icon
              name={
                runtimeStatus.reason === "not_required"
                  ? "info"
                  : runtimeStatus.installed && runtimeStatus.runnable
                    ? "check_circle"
                    : "warning"
              }
              size={18}
              className="text-info"
            />
            <div className="flex flex-col gap-1">
              <p className="text-sm text-info">
                {runtimeStatus.reason === "not_required"
                  ? t("guideOnlyIntegration")
                  : runtimeStatus.installed && runtimeStatus.runnable
                    ? t("cliRuntimeDetected")
                    : runtimeStatus.installed
                      ? t("cliFoundNotRunnable", {
                          reason: runtimeStatus.reason ? `: ${runtimeStatus.reason}` : "",
                        })
                      : t("cliRuntimeNotDetected")}
              </p>
              {runtimeStatus.commandPath && (
                <p className="text-xs text-text-muted">
                  {t("binary")}:{" "}
                  <code className="px-1 py-0.5 rounded bg-bg-subtle">
                    {runtimeStatus.commandPath}
                  </code>
                </p>
              )}
              {runtimeStatus.configPath && (
                <p className="text-xs text-text-muted">
                  {t("configPath")}:{" "}
                  <code className="px-1 py-0.5 rounded bg-bg-subtle">
                    {runtimeStatus.configPath}
                  </code>
                </p>
              )}
            </div>
          </div>
        )}
        {!checkingRuntime && runtimeStatus?.error && (
          <div className="flex items-start gap-3 p-3 bg-error/10 border border-error/30 rounded-lg">
            <Icon name="error" size={18} className="text-error" />
            <p className="text-sm text-error">{t("failedCheckRuntimeStatus")}</p>
          </div>
        )}
        {renderNotes()}
        {canShowGuide() &&
          tool.guideSteps.map((item) => (
            <div key={item.step} className="flex items-start gap-4">
              <div
                className="size-8 rounded-full flex items-center justify-center shrink-0 text-sm font-semibold text-white"
                style={{ backgroundColor: tool.color }}
              >
                {item.step}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-text-main">
                  {translateOrFallback(`guides.${toolId}.steps.${item.step}.title`, item.title)}
                </p>
                {item.desc && (
                  <p className="text-sm text-text-muted mt-0.5">
                    {translateOrFallback(`guides.${toolId}.steps.${item.step}.desc`, item.desc, {
                      baseUrl: baseUrlWithV1,
                    })}
                  </p>
                )}
                {item.type === "apiKeySelector" && renderApiKeySelector()}
                {item.type === "modelSelector" && renderModelSelector()}
                {item.value && (
                  <div className="mt-2 flex items-center gap-2">
                    <code className="flex-1 px-3 py-2 bg-bg-subtle rounded-lg text-sm font-mono border border-border truncate">
                      {replaceVars(item.value)}
                    </code>
                    {item.copyable && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleCopy(item.value, `${item.step}-${item.title}`)}
                        aria-label={
                          copiedField === `${item.step}-${item.title}` ? t("copied") : t("copy")
                        }
                        className="shrink-0"
                      >
                        <Icon
                          name={
                            copiedField === `${item.step}-${item.title}` ? "check" : "content_copy"
                          }
                          size={18}
                        />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

        {canShowGuide() && tool.codeBlock && (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-text-muted uppercase tracking-wide">
                {tool.codeBlock.language}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(getRenderedCodeBlock(), "codeblock")}
                className="gap-1 text-xs"
              >
                <Icon name={copiedField === "codeblock" ? "check" : "content_copy"} size={14} />
                {copiedField === "codeblock" ? t("copied") : t("copy")}
              </Button>
            </div>
            <pre className="p-4 bg-bg-subtle rounded-lg border border-border overflow-x-auto">
              <code className="text-sm font-mono whitespace-pre">{getRenderedCodeBlock()}</code>
            </pre>
          </div>
        )}

        {/* Save / Action buttons */}
        {canShowGuide() && (
          <div className="mt-2">
            {message && (
              <div
                className={`flex gap-2 px-2 py-1.5 rounded text-xs mb-2 ${message.containerEphemeralTarget ? "items-start" : "items-center"} ${message.type === "success" ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}
              >
                <Icon name={message.type === "success" ? "check_circle" : "error"} size={14} />
                {/* The container refusal is a multi-line runbook — keep its line
                    breaks instead of collapsing it into one unreadable line. */}
                <span className={message.containerEphemeralTarget ? "whitespace-pre-line" : ""}>
                  {message.text}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              {supportsDirectSave && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSaveConfig}
                  disabled={isMultiModelTool ? getSelectedModels().length === 0 : !modelValue}
                  loading={saving}
                >
                  <Icon name="save" size={14} className="mr-1" />
                  {t("saveConfig")}
                </Button>
              )}
              {tool.codeBlock && (
                <Button
                  variant={supportsDirectSave ? "outline" : "primary"}
                  size="sm"
                  onClick={() => handleCopy(getRenderedCodeBlock(), "codeblock")}
                >
                  <Icon
                    name={copiedField === "codeblock" ? "check" : "content_copy"}
                    size={14}
                    className="mr-1"
                  />
                  {copiedField === "codeblock" ? t("copied") : t("copyConfig")}
                </Button>
              )}
              {(isMultiModelTool ? getSelectedModels().length > 0 : !!modelValue) && (
                <span className="text-xs text-text-muted flex items-center gap-1">
                  <Icon name="check_circle" size={14} className="text-success" />
                  {t("selectionSaved")}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderIcon = () => {
    // Tool SVGs are non-square (e.g. opencode is 234×42, cursor is 467×532).
    // next/image's dev check warns whenever the rendered aspect-ratio size
    // differs from the square width/height attributes, so these render as a
    // plain <img> capped at 32px on both axes — true ratio, no dev noise.
    const renderImg = (src: string) => (
      // eslint-disable-next-line @next/next/no-img-element -- local static SVG asset
      <img
        src={src}
        alt={tool.name}
        width={32}
        height={32}
        className="size-8 object-contain rounded-lg"
        style={{ width: "auto", height: "auto", maxWidth: 32, maxHeight: 32 }}
        onError={(e) => {
          (e.currentTarget as HTMLElement).style.display = "none";
        }}
      />
    );
    if (tool.image) {
      return renderImg(tool.image);
    }
    if (tool.imageLight || tool.imageDark) {
      const themedSrc = isDark
        ? tool.imageDark || tool.imageLight
        : tool.imageLight || tool.imageDark;
      return renderImg(themedSrc);
    }
    if (tool.icon) {
      return (
        <span className="inline-flex" style={{ color: tool.color }}>
          <Icon name={tool.icon} size={20} />
        </span>
      );
    }
    return <ProviderIcon providerId={toolId} size={32} type="color" />;
  };

  return (
    <Card padding="sm" className="overflow-hidden">
      <div
        className={cn("flex items-center justify-between hover:cursor-pointer", CARD_TOGGLE_CLASS)}
        {...cardToggleProps(isExpanded, onToggle)}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="size-8 rounded-lg flex items-center justify-center shrink-0">
            {renderIcon()}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-sm">{tool.name}</h3>
              {(() => {
                // Use runtime status if available (after expanding), otherwise use batch status
                const rs = runtimeStatus;
                const bs = batchStatus;
                const isGuide = rs?.reason === "not_required" || tool.configType === "guide";
                const isDetected = rs ? rs.installed && rs.runnable : bs?.installed && bs?.runnable;
                const isInstalled = rs ? rs.installed : bs?.installed;

                if (isGuide) {
                  return (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium rounded-full bg-info/10 text-info">
                      <span className="size-1.5 rounded-full bg-info" />
                      {t("guide")}
                    </span>
                  );
                }
                if (isDetected) {
                  return (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium rounded-full bg-success/10 text-success">
                      <span className="size-1.5 rounded-full bg-success" />
                      {t("detected")}
                    </span>
                  );
                }
                if (isInstalled === false && (rs || bs)) {
                  return (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium rounded-full bg-surface-2/10 text-text-muted">
                      <span className="size-1.5 rounded-full bg-surface-2" />
                      {t("notInstalled")}
                    </span>
                  );
                }
                if (isInstalled && !isDetected && (rs || bs)) {
                  return (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium rounded-full bg-warning/10 text-warning">
                      <span className="size-1.5 rounded-full bg-warning" />
                      {t("notReady")}
                    </span>
                  );
                }
                return null;
              })()}
            </div>
            <p className="text-xs text-text-muted truncate">
              {translateOrFallback(`toolDescriptions.${toolId}`, tool.description)}
            </p>
          </div>
        </div>
        <Icon
          name="expand_more"
          size={20}
          className={cn("text-text-muted transition-transform", isExpanded && "rotate-180")}
        />
      </div>

      {isExpanded && <div className="mt-6 pt-6 border-t border-border">{renderGuideSteps()}</div>}

      <ModelSelectModal
        isOpen={showModelModal}
        onClose={() => setShowModelModal(false)}
        onSelect={handleSelectModel}
        selectedModel={modelValue}
        selectedModels={isMultiModelTool ? getSelectedModels() : []}
        activeProviders={activeProviders}
        title={t("selectModel")}
        multiSelect={isMultiModelTool}
        showCombos={!tool.hideComboModels}
      />
    </Card>
  );
}
