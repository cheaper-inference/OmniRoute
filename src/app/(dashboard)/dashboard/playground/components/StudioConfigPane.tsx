"use client";

import { Field } from "@omniroute/ui-kit/field";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import Textarea from "@/shared/components/Textarea";

// src/app/(dashboard)/dashboard/playground/components/StudioConfigPane.tsx

import { useEffect, useId, useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { useTranslations } from "next-intl";
import ParamSliders, { type PlaygroundParams } from "./ParamSliders";
import type { PlaygroundEndpoint } from "@/lib/playground/codeExport";
import { endpointToPath } from "@/lib/playground/codeExport";
import PresetPicker from "./PresetPicker";
import ImprovePromptButton from "./ImprovePromptButton";
import { useProviderOptions } from "@/app/(dashboard)/dashboard/translator/hooks/useProviderOptions";
import { useAvailableModels } from "@/app/(dashboard)/dashboard/translator/hooks/useAvailableModels";
import {
  ANTHROPIC_COMPATIBLE_PREFIX,
  CLAUDE_CODE_COMPATIBLE_PREFIX,
  OPENAI_COMPATIBLE_PREFIX,
} from "@/shared/constants/providers";
import { filterModelsByQuery, pickDefaultModel, resolveModelFilterKey } from "./modelSelection";
import ReasoningControls from "./ReasoningControls";
import { resolveReasoningControls, type ReasoningControlSpec } from "./reasoningControlUtils";

export interface ConfigState {
  endpoint: PlaygroundEndpoint;
  baseUrl: string;
  model: string;
  provider?: string;
  systemPrompt: string;
  params: PlaygroundParams;
  // #6241: resolved reasoning-control spec for the selected model (which controls to show + the
  // effort tiers). Kept here so the tabs (ChatTab) can gate `effort`/`thinking` on the request
  // body to models that actually support thinking.
  reasoning?: ReasoningControlSpec;
}

export type ConfigStateSetter = Dispatch<SetStateAction<ConfigState>>;

interface StudioConfigPaneProps {
  configState: ConfigState;
  setConfigState: ConfigStateSetter;
}

const ENDPOINT_OPTIONS: Array<{ value: PlaygroundEndpoint; labelKey: string }> = [
  { value: "chat.completions", labelKey: "chat" },
  { value: "responses", labelKey: "responses" },
  { value: "completions", labelKey: "completions" },
  { value: "embeddings", labelKey: "embeddings" },
  { value: "images", labelKey: "images" },
  { value: "audio.transcriptions", labelKey: "transcription" },
  { value: "audio.speech", labelKey: "speech" },
  { value: "video", labelKey: "video" },
  { value: "music", labelKey: "music" },
  { value: "moderations", labelKey: "moderations" },
  { value: "rerank", labelKey: "rerank" },
  { value: "search", labelKey: "search" },
  { value: "web.fetch", labelKey: "webFetch" },
];

/**
 * Right-side collapsible config pane for PlaygroundStudio.
 * Slots for F7:
 *   - SLOT_PRESETS: PresetPicker will be injected here
 *   - SLOT_IMPROVE: ImprovePromptButton will be injected here
 */
export default function StudioConfigPane({ configState, setConfigState }: StudioConfigPaneProps) {
  const t = useTranslations("common");
  const tp = useTranslations("playground");
  const modelLabelId = useId();
  const systemPromptId = useId();
  const [collapsed, setCollapsed] = useState(false);
  // #4086: search/filter query for the Model dropdown — flat provider catalogs (e.g.
  // 50+ OpenRouter models) made the plain <select> unusable without scrolling.
  const [modelQuery, setModelQuery] = useState("");
  const {
    provider,
    setProvider,
    providerOptions,
    loading: loadingProviders,
  } = useProviderOptions(configState.provider ?? "");
  // #3505: filter models by the selected provider's catalog namespace. Compatible providers
  // emit models under their node prefix (e.g. "myprefix/gpt-4o"), not under the connection id,
  // so use the option's modelPrefix when present; fall back to the id for built-in providers.
  const selectedProviderOption = providerOptions.find(
    (opt: { value: string; modelPrefix?: string }) => opt.value === provider
  );
  // #3731: a custom OpenAI/Anthropic-compatible connection emits catalog models under a
  // node prefix, NOT under its connection id. When the prefix doesn't resolve, filtering
  // by the raw connection id matched nothing and emptied the selector ("NONE shown").
  const isCompatibleConnectionId =
    provider.startsWith(OPENAI_COMPATIBLE_PREFIX) ||
    provider.startsWith(ANTHROPIC_COMPATIBLE_PREFIX) ||
    provider.startsWith(CLAUDE_CODE_COMPATIBLE_PREFIX);
  const modelFilterKey = resolveModelFilterKey(
    provider,
    selectedProviderOption?.modelPrefix,
    isCompatibleConnectionId
  );
  const {
    availableModels,
    modelCapabilities,
    loading: loadingModels,
  } = useAvailableModels(modelFilterKey);

  // #4086: filter the dropdown by the search query, but always keep the currently selected
  // model in the list even when it doesn't match — otherwise typing a query would silently
  // change the active selection out from under the user.
  const filteredModels = useMemo(() => {
    const filtered = filterModelsByQuery(availableModels, modelQuery);
    if (configState.model && !filtered.includes(configState.model)) {
      return [configState.model, ...filtered];
    }
    return filtered;
  }, [availableModels, modelQuery, configState.model]);

  // #6241: resolve the reasoning controls for the currently selected model from the capability
  // flags the /models catalog exposes (supportsThinking / effort_tiers).
  const reasoningSpec = resolveReasoningControls(modelCapabilities[configState.model]);

  // #3731: selecting a provider resets the model to "", and nothing picked a default —
  // so the active model stayed empty and the chat failed with "Set a model". Auto-select
  // the first available model once the list resolves (mirrors the provider-detail chat).
  useEffect(() => {
    setConfigState((current) => {
      const next = pickDefaultModel(current.model, availableModels);
      return next === null ? current : { ...current, model: next };
    });
  }, [availableModels, configState.model, setConfigState]);

  // #6241: keep the resolved reasoning spec on configState so the tabs (ChatTab) can gate the
  // `effort`/`thinking` request fields on models that support thinking. Sync only when it changes.
  useEffect(() => {
    setConfigState((current) => {
      const changed =
        !current.reasoning ||
        current.reasoning.show !== reasoningSpec.show ||
        current.reasoning.effortOptions.join(",") !== reasoningSpec.effortOptions.join(",");
      return changed ? { ...current, reasoning: reasoningSpec } : current;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reasoningSpec.show, reasoningSpec.effortOptions.join(","), setConfigState]);

  function update<K extends keyof ConfigState>(key: K, value: ConfigState[K]) {
    setConfigState((current) => ({ ...current, [key]: value }));
  }

  if (collapsed) {
    return (
      <div className="flex flex-col items-center w-8 shrink-0">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setCollapsed(false)}
          className="mt-2 text-text-muted"
          title={tp("expandConfig")}
          aria-label={tp("expandConfig")}
          icon="settings"
        />
      </div>
    );
  }

  return (
    <aside
      className="w-72 shrink-0 border-l border-border bg-bg-alt flex flex-col overflow-y-auto"
      aria-label={tp("configPane")}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
          {tp("configPane")}
        </span>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setCollapsed(true)}
          className="text-text-muted"
          title={tp("collapseConfig")}
          aria-label={tp("collapseConfig")}
          icon="chevron_right"
        />
      </div>

      <div className="flex flex-col gap-5 p-4">
        {/* PresetPicker — injected by F7 */}
        <PresetPicker configState={configState} setConfigState={setConfigState} />

        {/* Endpoint */}
        <Select
          label={tp("endpointLabel")}
          value={configState.endpoint}
          onChange={(e) => update("endpoint", e.target.value as PlaygroundEndpoint)}
          selectClassName="text-xs"
        >
          {ENDPOINT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {tp(`endpointOptions.${opt.labelKey}`)} — {endpointToPath(opt.value)}
            </option>
          ))}
        </Select>

        {/* Provider */}
        <Select
          label={tp("provider")}
          value={provider}
          onChange={(e) => {
            const nextProvider = e.target.value;
            setProvider(nextProvider);
            setConfigState((current) => ({
              ...current,
              provider: nextProvider,
              model: "",
            }));
          }}
          disabled={loadingProviders}
          selectClassName="text-xs"
        >
          <option value="">{tp("autoProvider")}</option>
          {providerOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>

        {/* Model */}
        <div className="flex flex-col gap-1.5">
          {/* Same typography as the kit Field labels of Endpoint/Provider/System prompt. */}
          <span id={modelLabelId} className="ci-label">
            {tp("model")}
          </span>
          {availableModels.length > 0 ? (
            <>
              {availableModels.length > 1 && (
                <Input
                  type="text"
                  value={modelQuery}
                  onChange={(e) => setModelQuery(e.target.value)}
                  placeholder={t("search")}
                  aria-label={t("search")}
                  icon="search"
                  inputClassName="text-xs"
                />
              )}
              <Select
                aria-labelledby={modelLabelId}
                value={configState.model}
                onChange={(e) => update("model", e.target.value)}
                disabled={loadingModels}
                selectClassName="text-xs"
              >
                {filteredModels.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </Select>
            </>
          ) : (
            <Input
              type="text"
              aria-labelledby={modelLabelId}
              value={configState.model}
              onChange={(e) => update("model", e.target.value)}
              placeholder={tp("modelPlaceholder")}
              inputClassName="text-xs"
            />
          )}
        </div>

        {/* System prompt */}
        <div className="flex flex-col gap-1.5">
          <Field label={tp("systemPrompt")} htmlFor={systemPromptId}>
            <Textarea
              id={systemPromptId}
              value={configState.systemPrompt}
              onChange={(e) => update("systemPrompt", e.target.value)}
              placeholder={tp("systemPromptPlaceholder")}
              rows={4}
              className="text-xs resize-y"
            />
          </Field>
          {/* ImprovePromptButton — injected by F7 */}
          <ImprovePromptButton configState={configState} setConfigState={setConfigState} />
        </div>

        {/* Param sliders */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
            {tp("parametersLabel")}
          </span>
          <ParamSliders params={configState.params} setParams={(p) => update("params", p)} />
        </div>

        {/* Reasoning controls — only shown when the selected model supports thinking (#6241) */}
        <ReasoningControls
          spec={reasoningSpec}
          params={configState.params}
          setParams={(p) => update("params", p)}
        />
      </div>
    </aside>
  );
}
