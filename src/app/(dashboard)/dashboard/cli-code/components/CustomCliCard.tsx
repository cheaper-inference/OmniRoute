"use client";

import { useMemo, useState, useCallback, useId } from "react";
import Icon from "@/shared/components/Icon";
import { Card, Button } from "@/shared/components";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import { useTranslations } from "next-intl";
import { Field } from "@omniroute/ui-kit/field";
import { copyToClipboard } from "@/shared/utils/clipboard";
import {
  buildCustomCliEnvScript,
  buildCustomCliJsonConfig,
  normalizeOpenAiBaseUrl,
} from "./customCliConfig";
import { DEFAULT_DISPLAY_BASE_URL } from "@/shared/hooks";
import { cn } from "@/shared/utils/cn";
import { CARD_TOGGLE_CLASS, cardToggleProps } from "./cardToggle";

interface ModelOption {
  value: string;
  label: string;
}

interface CustomCliMappingRow {
  id: string;
  alias: string;
  model: string;
}

export default function CustomCliCard({
  tool,
  isExpanded = false,
  onToggle = () => {},
  baseUrl,
  apiKeys,
  availableModels = [],
  cloudEnabled = false,
  hasActiveProviders = false,
}) {
  const t = useTranslations("cliTools");
  const apiKeySelectId = useId();
  const translateOrFallback = useCallback(
    (key: string, fallback: string, values?: Record<string, unknown>) => {
      try {
        const translated = t(key, values);
        return translated === key || translated === `cliTools.${key}` ? fallback : translated;
      } catch {
        return fallback;
      }
    },
    [t]
  );
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [cliName, setCliName] = useState("Custom CLI");
  const [defaultModel, setDefaultModel] = useState("");
  const [selectedApiKeyId, setSelectedApiKeyId] = useState(() =>
    apiKeys?.length > 0 ? apiKeys[0].id : ""
  );
  const [aliasMappings, setAliasMappings] = useState<CustomCliMappingRow[]>([]);
  const effectiveSelectedApiKeyId = selectedApiKeyId || apiKeys?.[0]?.id || "";
  const effectiveDefaultModel = defaultModel || availableModels[0]?.value || "";

  const selectedKeyObj = apiKeys?.find((key) => key.id === effectiveSelectedApiKeyId);
  const keyToUse =
    selectedKeyObj?.key ||
    (!cloudEnabled
      ? "sk_omniroute"
      : translateOrFallback("yourApiKeyPlaceholder", "sk-your-omniroute-key"));
  const baseUrlWithV1 = normalizeOpenAiBaseUrl(baseUrl || DEFAULT_DISPLAY_BASE_URL);
  const chatCompletionsEndpoint = `${baseUrlWithV1}/chat/completions`;

  const envScript = useMemo(
    () =>
      buildCustomCliEnvScript({
        cliName,
        baseUrl: baseUrlWithV1,
        apiKey: keyToUse,
        defaultModel: effectiveDefaultModel,
        aliasMappings,
      }),
    [aliasMappings, baseUrlWithV1, cliName, effectiveDefaultModel, keyToUse]
  );

  const jsonConfig = useMemo(
    () =>
      buildCustomCliJsonConfig({
        cliName,
        baseUrl: baseUrlWithV1,
        apiKey: keyToUse,
        defaultModel: effectiveDefaultModel,
        aliasMappings,
      }),
    [aliasMappings, baseUrlWithV1, cliName, effectiveDefaultModel, keyToUse]
  );

  const handleCopy = async (text: string, field: string) => {
    await copyToClipboard(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleAddMapping = () => {
    setAliasMappings((prev) => [
      ...prev,
      {
        id: `mapping_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        alias: "",
        model: effectiveDefaultModel,
      },
    ]);
  };

  const handleUpdateMapping = (id: string, field: "alias" | "model", value: string) => {
    setAliasMappings((prev) =>
      prev.map((mapping) => (mapping.id === id ? { ...mapping, [field]: value } : mapping))
    );
  };

  const handleRemoveMapping = (id: string) => {
    setAliasMappings((prev) => prev.filter((mapping) => mapping.id !== id));
  };

  const codeBlockClass =
    "rounded-lg border border-border bg-bg-subtle/70 p-4 text-xs font-mono whitespace-pre-wrap break-all";

  return (
    <Card padding="sm" className="overflow-hidden">
      <div
        className={cn("flex items-center justify-between hover:cursor-pointer", CARD_TOGGLE_CLASS)}
        {...cardToggleProps(isExpanded, onToggle)}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="size-8 rounded-lg flex items-center justify-center shrink-0 bg-success/10 text-success">
            <Icon name={tool.icon || "terminal"} size={20} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-sm">{tool.name}</h3>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium rounded-full bg-success/10 text-success">
                <span className="size-1.5 rounded-full bg-success" />
                {translateOrFallback("custom", "Custom")}
              </span>
            </div>
            <p className="text-xs text-text-muted truncate">{t("toolDescriptions.custom")}</p>
          </div>
        </div>
        <Icon
          name="expand_more"
          size={20}
          className={cn("text-text-muted transition-transform", isExpanded && "rotate-180")}
        />
      </div>

      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-border space-y-5">
          <div className="flex items-start gap-3 p-3 bg-success/10 border border-success/30 rounded-lg">
            <Icon name="tips_and_updates" size={18} className="text-success" />
            <div className="text-sm text-success">
              <p className="font-medium">
                {translateOrFallback("customCliBuilderTitle", "OpenAI-compatible CLI builder")}
              </p>
              <p className="mt-1 text-xs opacity-90">
                {translateOrFallback(
                  "customCliBuilderDescription",
                  "Generate env vars and JSON snippets for any CLI or SDK that accepts an OpenAI-compatible base URL, API key, and model ID."
                )}
              </p>
            </div>
          </div>

          {!hasActiveProviders && (
            <div className="flex items-start gap-3 p-3 bg-warning/10 border border-warning/30 rounded-lg">
              <Icon name="warning" size={18} className="text-warning" />
              <div>
                <p className="text-sm font-medium text-warning">
                  {translateOrFallback("noActiveProviders", "No active providers")}
                </p>
                <p className="text-xs text-warning/80">
                  {translateOrFallback(
                    "customCliNoModels",
                    "Connect at least one provider to populate the model selectors."
                  )}
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-4">
              <Input
                label={translateOrFallback("customCliNameLabel", "CLI name")}
                value={cliName}
                onChange={(e) => setCliName(e.target.value)}
                placeholder={translateOrFallback("customCliNamePlaceholder", "e.g. My Team CLI")}
              />

              <Select
                label={translateOrFallback("customCliDefaultModelLabel", "Default model")}
                value={effectiveDefaultModel}
                onChange={(e) => setDefaultModel(e.target.value)}
                disabled={!hasActiveProviders}
                hint={translateOrFallback(
                  "customCliDefaultModelHelp",
                  "Use any OmniRoute model ID or combo. Most OpenAI-compatible CLIs only need the /v1 base URL plus a model string."
                )}
              >
                <option value="">
                  {translateOrFallback("modelPlaceholder", "Select a model")}
                </option>
                {(availableModels as ModelOption[]).map((model) => (
                  <option key={model.value} value={model.value}>
                    {model.label}
                  </option>
                ))}
              </Select>

              <Field label={translateOrFallback("apiKey", "API Key")} htmlFor={apiKeySelectId}>
                {apiKeys && apiKeys.length > 0 ? (
                  <Select
                    id={apiKeySelectId}
                    value={effectiveSelectedApiKeyId}
                    onChange={(e) => setSelectedApiKeyId(e.target.value)}
                  >
                    {apiKeys.map((key) => (
                      <option key={key.id} value={key.id}>
                        {key.key}
                      </option>
                    ))}
                  </Select>
                ) : (
                  <div className="px-3 py-2 rounded-lg border border-border bg-bg-subtle text-sm text-text-muted">
                    {keyToUse}
                  </div>
                )}
                <p className="mt-2 text-xs text-text-muted">
                  {translateOrFallback(
                    "customCliKeyHelper",
                    "For local installs OmniRoute can use sk_omniroute. In cloud mode, pick one of your management API keys."
                  )}
                </p>
              </Field>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-medium">
                    {translateOrFallback("customCliAliasMappingsLabel", "Alias mappings")}
                  </h4>
                  <p className="text-xs text-text-muted mt-1">
                    {translateOrFallback(
                      "customCliAliasMappingsHelp",
                      "Optional helper aliases for wrapper scripts or config files that want stable shorthand names."
                    )}
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={handleAddMapping}>
                  <Icon name="add" size={14} className="mr-1" />
                  {translateOrFallback("customCliAddAlias", "Add alias")}
                </Button>
              </div>

              {aliasMappings.length === 0 ? (
                <div className="rounded-lg border border-dashed border-border p-4 text-xs text-text-muted">
                  {translateOrFallback(
                    "customCliNoMappings",
                    "No alias mappings yet. Add one if your wrapper or team scripts use stable short names."
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {aliasMappings.map((mapping) => (
                    <div
                      key={mapping.id}
                      className="grid grid-cols-1 md:grid-cols-[180px_minmax(0,1fr)_auto] gap-2"
                    >
                      <Input
                        value={mapping.alias}
                        onChange={(e) => handleUpdateMapping(mapping.id, "alias", e.target.value)}
                        placeholder={translateOrFallback(
                          "customCliAliasPlaceholder",
                          "e.g. review"
                        )}
                      />
                      <Select
                        value={mapping.model}
                        onChange={(e) => handleUpdateMapping(mapping.id, "model", e.target.value)}
                        disabled={!hasActiveProviders}
                      >
                        <option value="">
                          {translateOrFallback("customCliTargetModelLabel", "Target model")}
                        </option>
                        {(availableModels as ModelOption[]).map((model) => (
                          <option key={model.value} value={model.value}>
                            {model.label}
                          </option>
                        ))}
                      </Select>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveMapping(mapping.id)}
                        aria-label={translateOrFallback("removeMapping", "Remove mapping")}
                        title={translateOrFallback("removeMapping", "Remove mapping")}
                      >
                        <Icon name="delete" size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="rounded-lg border border-border/60 bg-bg-subtle p-3 text-xs text-text-muted">
            <p className="font-medium text-text-main">
              {translateOrFallback("customCliEndpointHintLabel", "How to wire the endpoint")}
            </p>
            <p className="mt-1">
              {translateOrFallback(
                "customCliEndpointHint",
                "Point any OpenAI-compatible client to the OmniRoute /v1 base URL. The raw chat completions endpoint is {endpoint}. Use the JSON block when the tool wants a provider object, or the env script when it reads OPENAI_* variables.",
                { endpoint: chatCompletionsEndpoint }
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-medium">
                  {translateOrFallback("customCliEnvBlockTitle", "Env / shell snippet")}
                </h4>
                <Button variant="outline" size="sm" onClick={() => handleCopy(envScript, "env")}>
                  <Icon
                    name={copiedField === "env" ? "check" : "content_copy"}
                    size={14}
                    className="mr-1"
                  />
                  {translateOrFallback("copy", "Copy")}
                </Button>
              </div>
              <pre className={codeBlockClass}>{envScript}</pre>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-medium">
                  {translateOrFallback("customCliJsonBlockTitle", "Provider JSON block")}
                </h4>
                <Button variant="outline" size="sm" onClick={() => handleCopy(jsonConfig, "json")}>
                  <Icon
                    name={copiedField === "json" ? "check" : "content_copy"}
                    size={14}
                    className="mr-1"
                  />
                  {translateOrFallback("copy", "Copy")}
                </Button>
              </div>
              <pre className={codeBlockClass}>{jsonConfig}</pre>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
