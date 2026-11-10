"use client";

import { Button, Checkbox } from "@/shared/components";

import { useState } from "react";
import {
  normalizeModelSupportedEndpoints,
  type ModelSupportedEndpoint,
} from "@/shared/constants/modelSupportedEndpoints";

const OPTIONS: ModelSupportedEndpoint[] = [
  "chat",
  "responses",
  "embeddings",
  "rerank",
  "images",
  "videos",
  "audio-speech",
  "audio-transcriptions",
  "music",
];

export interface ModelEndpointEditorInfo {
  supportedEndpoints?: readonly string[];
  endpointCapabilitySource?: string;
  discoveredEndpoints?: readonly string[];
  adapterStatuses?: Record<string, "available" | "unavailable" | "unknown">;
  resettable?: boolean;
  onChanged?: () => void | Promise<void>;
}
interface Props extends ModelEndpointEditorInfo {
  provider: string;
  modelId: string;
  t: (key: string, values?: Record<string, unknown>) => string;
}
export default function ModelEndpointTagsEditor({
  provider,
  modelId,
  supportedEndpoints,
  endpointCapabilitySource,
  adapterStatuses = {},
  resettable = false,
  onChanged,
  t,
}: Props) {
  const effective = supportedEndpoints?.length
    ? normalizeModelSupportedEndpoints(supportedEndpoints)
    : ["chat"];
  const [editing, setEditing] = useState(false);
  const [selection, setSelection] = useState<string[]>(effective);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const provenance =
    endpointCapabilitySource === "operator"
      ? t("endpointCapabilitiesOperator")
      : endpointCapabilitySource === "inferred"
        ? t("endpointCapabilitiesInferred")
        : endpointCapabilitySource === "declared"
          ? t("endpointCapabilitiesDeclared")
          : t("endpointCapabilitiesDefaulted");

  const beginEdit = () => {
    setSelection(effective);
    setError(null);
    setEditing(true);
  };
  async function submit(reset: boolean) {
    if (!reset && selection.length === 0) {
      setError(t("selectSupportedEndpoint"));
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const response = await (reset
        ? fetch(
            "/api/provider-models?" +
              new URLSearchParams({
                provider,
                model: modelId,
                resetEndpoints: "true",
              }),
            { method: "DELETE" }
          )
        : fetch("/api/provider-models", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ provider, modelId, supportedEndpoints: selection }),
          }));
      if (!response.ok)
        throw new Error(
          t(reset ? "endpointCapabilitiesResetFailed" : "endpointCapabilitiesSaveFailed")
        );
      await onChanged?.();
      setEditing(false);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : t("endpointCapabilitiesSaveFailed"));
    } finally {
      setSaving(false);
    }
  }
  return (
    <div
      className="inline-flex max-w-full flex-wrap items-center gap-1 text-[10px]"
      data-testid="model-endpoint-capabilities"
    >
      {effective.map((endpoint) => (
        <span
          key={endpoint}
          title={
            adapterStatuses[endpoint] === "unavailable"
              ? t("endpointCapabilitiesNoAdapter")
              : undefined
          }
          className={
            adapterStatuses[endpoint] === "unavailable"
              ? "rounded bg-error/15 px-1 py-0.5 text-error"
              : "rounded bg-primary/10 px-1 py-0.5 text-primary"
          }
        >
          {endpoint}
          {adapterStatuses[endpoint] === "unavailable" ? " ⚠" : ""}
        </span>
      ))}
      <span className="text-text-muted" title={t("supportedEndpointsLabel")}>
        {provenance}
      </span>
      <Button
        variant="ghost"
        size="icon-sm"
        icon="edit"
        onClick={beginEdit}
        disabled={saving}
        title={t("endpointCapabilitiesEdit")}
        aria-label={t("endpointCapabilitiesEdit")}
        className="size-6 min-h-6 rounded text-text-muted"
      />
      {editing && (
        <div className="flex w-full flex-wrap items-center gap-1 rounded border border-border p-1">
          <fieldset disabled={saving} className="flex flex-wrap gap-2">
            <legend className="text-text-muted">{t("supportedEndpointsLabel")}</legend>
            {OPTIONS.map((endpoint) => (
              <Checkbox
                key={endpoint}
                label={endpoint}
                checked={selection.includes(endpoint)}
                onChange={(event) =>
                  setSelection((prev) =>
                    event.target.checked
                      ? [...prev, endpoint]
                      : prev.filter((item) => item !== endpoint)
                  )
                }
              />
            ))}
          </fieldset>
          <Button size="sm" disabled={saving} onClick={() => void submit(false)}>
            {t("endpointCapabilitiesSave")}
          </Button>
          {resettable && (
            <Button size="sm" variant="outline" disabled={saving} onClick={() => void submit(true)}>
              {t("endpointCapabilitiesReset")}
            </Button>
          )}
          <Button size="sm" variant="ghost" disabled={saving} onClick={() => setEditing(false)}>
            {t("cancel")}
          </Button>
          {error && (
            <span role="alert" className="text-error">
              {error}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
