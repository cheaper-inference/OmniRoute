"use client";

import { useState, useEffect } from "react";
import Icon from "@/shared/components/Icon";
import { Card, Button } from "@/shared/components";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CheckboxGroup } from "@omniroute/ui-kit/checkbox";
import { matchesSearch } from "@/shared/utils/turkishText";
import { cn } from "@/shared/utils/cn";
import Checkbox from "@/shared/components/Checkbox";
import { CARD_TOGGLE_CLASS, cardToggleProps } from "./cardToggle";

/**
 * GitHub Copilot Configuration Generator
 *
 * Generates the chatLanguageModels.json block for VS Code GitHub Copilot
 * using the Azure vendor pattern as required by Copilot's architecture.
 *
 * Feature request: https://github.com/cheaper-inference/OmniRoute/issues/142
 */
export default function CopilotToolCard({
  tool,
  isExpanded = false,
  onToggle = () => {},
  baseUrl,
  apiKeys,
  activeProviders = [],
  hasActiveProviders = false,
  cloudEnabled = false,
  batchStatus,
}) {
  const t = useTranslations("cliTools");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedModels, setSelectedModels] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set<string>();
    try {
      const saved = localStorage.getItem("omniroute-copilot-selected-models");
      return saved ? new Set<string>(JSON.parse(saved)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });
  const [selectedApiKeyId, setSelectedApiKeyId] = useState(() => {
    if (typeof window !== "undefined") {
      const savedKey = localStorage.getItem("omniroute-cli-key-copilot");
      if (savedKey && apiKeys?.some((k: any) => k.id === savedKey)) return savedKey;
    }
    return apiKeys?.length > 0 ? apiKeys[0].id : "";
  });
  const [maxInputTokens, setMaxInputTokens] = useState(128000);
  const [maxOutputTokens, setMaxOutputTokens] = useState(16000);
  const [toolCalling, setToolCalling] = useState(true);
  const [vision, setVision] = useState(false);
  const [allModels, setAllModels] = useState<Array<{ value: string; label: string }>>([]);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  // Fetch ALL models dynamically from /v1/models (includes combos, custom, aliased)
  // Per @alpgul feedback: /api/models/alias doesn't include combo definitions
  useEffect(() => {
    if (!isExpanded || modelsLoaded) return;
    let cancelled = false;
    fetch("/v1/models")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const modelList = (data.data || [])
          .filter((m: any) => m && !m.type && !m.parent && m.id) // Only chat models with valid IDs
          .map((m: any) => ({
            value: m.id,
            label: m.id,
          }));
        setAllModels(modelList);
        setModelsLoaded(true);
      })
      .catch(() => {
        if (!cancelled) setModelsLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, [isExpanded, modelsLoaded]);

  // Filter models by search
  const availableModels = searchFilter
    ? allModels.filter((m) => matchesSearch(m.label, searchFilter))
    : allModels;

  // Persist selection
  useEffect(() => {
    if (selectedModels.size > 0) {
      localStorage.setItem(
        "omniroute-copilot-selected-models",
        JSON.stringify([...selectedModels])
      );
    }
  }, [selectedModels]);

  const toggleModel = (modelValue: string) => {
    setSelectedModels((prev) => {
      const next = new Set(prev);
      if (next.has(modelValue)) {
        next.delete(modelValue);
      } else {
        next.add(modelValue);
      }
      return next;
    });
  };

  const selectAll = () => {
    setSelectedModels(new Set(allModels.map((m) => m.value)));
  };

  const deselectAll = () => {
    setSelectedModels(new Set());
  };

  const getBaseUrlForConfig = () => {
    const url = baseUrl;
    return `${url}/v1/chat/completions`;
  };

  // Generate the Copilot chatLanguageModels.json config
  const generateConfig = () => {
    const models = [...selectedModels].map((modelId) => ({
      id: modelId,
      name: modelId,
      url: `${getBaseUrlForConfig()}#models.ai.azure.com`,
      toolCalling,
      vision,
      maxInputTokens,
      maxOutputTokens,
    }));

    const responseModels = [...selectedModels].map((modelId) => ({
      id: modelId,
      name: modelId,
      url: `${baseUrl}/v1/responses#models.ai.azure.com`,
      supportsReasoningEffort: ["none", "low", "medium", "high", "xhigh"],
      zeroDataRetentionEnabled: true,
      toolCalling,
      vision,
      maxInputTokens,
      maxOutputTokens,
    }));

    const config = {
      name: "OmniRoute",
      vendor: "azure",
      apiKey: `\${input:chat.lm.secret.omniroute}`,
      models,
    };

    const responsesConfig = {
      name: "OmniRoute-responses",
      vendor: "azure",
      apiKey: `\${input:chat.lm.secret.omniroute}`,
      models: responseModels,
    };

    return [config, responsesConfig].map((entry) => JSON.stringify(entry, null, 2)).join(",\n");
  };

  const handleCopy = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleApiKeyChange = (value: string) => {
    setSelectedApiKeyId(value);
    if (value) localStorage.setItem("omniroute-cli-key-copilot", value);
  };

  return (
    <Card padding="sm" className="overflow-hidden">
      {/* Header */}
      <div
        className={cn("flex items-center justify-between hover:cursor-pointer", CARD_TOGGLE_CLASS)}
        {...cardToggleProps(isExpanded, onToggle)}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="size-8 rounded-lg flex items-center justify-center shrink-0">
            <Image
              src={tool.image || "/providers/copilot.svg"}
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
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium rounded-full bg-info/10 text-info">
                <span className="size-1.5 rounded-full bg-info" />
                {t("guide")}
              </span>
            </div>
            <p className="text-xs text-text-muted truncate">{t("toolDescriptions.copilot")}</p>
          </div>
        </div>
        <Icon
          name="expand_more"
          size={20}
          className={cn("text-text-muted transition-transform", isExpanded && "rotate-180")}
        />
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex flex-col gap-5">
            {/* Info box */}
            <div className="flex items-start gap-3 p-3 bg-info/10 border border-info/30 rounded-lg">
              <Icon name="info" size={18} className="text-info" />
              <div className="text-sm text-info">
                <p className="font-medium">{t("copilotConfigGenerator")}</p>
                <p className="mt-1 text-xs opacity-80">
                  {t("copilotGeneratorDescriptionPrefix")}{" "}
                  <code className="px-1 py-0.5 rounded bg-bg-subtle">chatLanguageModels.json</code>{" "}
                  {t("copilotGeneratorDescriptionSuffix")}
                </p>
              </div>
            </div>

            {/* Version compatibility warning */}
            <div className="flex items-start gap-3 p-3 bg-warning/10 border border-warning/30 rounded-lg">
              <Icon name="warning" size={18} className="text-warning" />
              <p className="text-xs text-warning">
                {t.rich("copilotCompatibilityWarning", {
                  vscode: (chunks) => <strong>{chunks}</strong>,
                  copilot: (chunks) => <strong>{chunks}</strong>,
                })}
              </p>
            </div>

            {/* Step 2: API Key (if cloud enabled) */}
            {cloudEnabled && apiKeys?.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="size-6 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                    style={{ backgroundColor: tool.color }}
                  >
                    1
                  </div>
                  <span className="font-medium text-sm">{t("copilotApiKey")}</span>
                </div>
                <Select
                  value={selectedApiKeyId}
                  onChange={(e) => handleApiKeyChange(e.target.value)}
                  aria-label={t("copilotApiKey")}
                >
                  {apiKeys.map((key: any) => (
                    <option key={key.id} value={key.id}>
                      {key.key}
                    </option>
                  ))}
                </Select>
              </div>
            )}

            {/* Step 3: Model Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="size-6 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                    style={{ backgroundColor: tool.color }}
                  >
                    {cloudEnabled && apiKeys?.length > 0 ? "2" : "1"}
                  </div>
                  <span className="font-medium text-sm">
                    {t("copilotSelectModels", {
                      selected: selectedModels.size,
                      total: availableModels.length,
                    })}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={selectAll} className="text-xs">
                    {t("selectAll")}
                  </Button>
                  <Button variant="outline" size="sm" onClick={deselectAll} className="text-xs">
                    {t("clear")}
                  </Button>
                </div>
              </div>

              {/* Search filter */}
              <div className="mb-2">
                <Input
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder={t("copilotFilterModelsPlaceholder")}
                  aria-label={t("copilotFilterModelsPlaceholder")}
                  icon="search"
                />
              </div>

              {!modelsLoaded && allModels.length === 0 ? (
                <div className="flex items-center gap-2 p-3 text-text-muted text-sm">
                  <Icon name="progress_activity" size={16} className="animate-spin" />
                  <span>{t("loadingModels")}</span>
                </div>
              ) : availableModels.length === 0 && allModels.length === 0 ? (
                <div className="flex items-center gap-2 p-3 bg-warning/10 border border-warning/30 rounded-lg">
                  <Icon name="warning" size={18} className="text-warning" />
                  <p className="text-sm text-warning">{t("noActiveProviders")}</p>
                </div>
              ) : (
                <CheckboxGroup
                  aria-label={t("copilotSelectModels", {
                    selected: selectedModels.size,
                    total: availableModels.length,
                  })}
                  className="max-h-64 overflow-y-auto rounded-lg border border-border bg-bg-subtle"
                >
                  {availableModels.map((model) => (
                    <Checkbox
                      key={model.value}
                      checked={selectedModels.has(model.value)}
                      onChange={() => toggleModel(model.value)}
                      className="px-3 py-2 hover:bg-surface-2 border-b border-border last:border-0"
                      label={<span className="text-sm font-mono truncate">{model.label}</span>}
                    />
                  ))}
                </CheckboxGroup>
              )}
            </div>

            {/* Step 4: Advanced options (collapsible) */}
            <details className="group">
              <summary className="flex items-center gap-2 cursor-pointer text-sm text-text-muted hover:text-text-main transition-colors">
                <Icon
                  name="chevron_right"
                  size={16}
                  className="group-open:rotate-90 transition-transform"
                />
                {t("advancedOptions")}
              </summary>
              <div className="mt-3 grid grid-cols-2 gap-3 pl-6">
                <Input
                  label={t("copilotMaxInputTokens")}
                  type="number"
                  value={maxInputTokens}
                  onChange={(e) => setMaxInputTokens(Number(e.target.value) || 128000)}
                />
                <Input
                  label={t("copilotMaxOutputTokens")}
                  type="number"
                  value={maxOutputTokens}
                  onChange={(e) => setMaxOutputTokens(Number(e.target.value) || 16000)}
                />
                <Checkbox
                  checked={toolCalling}
                  onChange={(e) => setToolCalling(e.target.checked)}
                  label={t("copilotToolCalling")}
                />
                <Checkbox
                  checked={vision}
                  onChange={(e) => setVision(e.target.checked)}
                  label={t("vision")}
                />
              </div>
            </details>

            {/* Step 5: Generated config */}
            {selectedModels.size > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="size-6 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                      style={{ backgroundColor: tool.color }}
                    >
                      {cloudEnabled && apiKeys?.length > 0 ? "3" : "2"}
                    </div>
                    <span className="font-medium text-sm">
                      {t("copilotCopyConfigForModels", { count: selectedModels.size })}
                    </span>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleCopy(generateConfig(), "config")}
                  >
                    <Icon
                      name={copiedField === "config" ? "check" : "content_copy"}
                      size={14}
                      className="mr-1"
                    />
                    {copiedField === "config" ? t("copied") : t("copyConfig")}
                  </Button>
                </div>
                <pre className="p-4 bg-bg-subtle rounded-lg border border-border overflow-x-auto max-h-80">
                  <code className="text-xs font-mono whitespace-pre text-text-main">
                    {generateConfig()}
                  </code>
                </pre>

                {/* Usage instructions */}
                <div className="mt-3 p-3 bg-bg-subtle rounded-lg border border-border">
                  <p className="text-xs text-text-muted">
                    <span className="font-medium text-text-main">{t("copilotPasteInto")} </span>
                    <code className="px-1 py-0.5 rounded bg-bg-subtle">
                      ~/.config/Code/User/chatLanguageModels.json
                    </code>
                  </p>
                  <p className="text-xs text-text-muted mt-1">{t("copilotReloadInstruction")}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
