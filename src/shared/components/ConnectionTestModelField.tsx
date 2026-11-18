"use client";

import { useEffect, useId, useState } from "react";
import { useTranslations } from "next-intl";
import Select from "./Select";
import { DiscoveryDegradedNotice } from "./DiscoveryDegradedNotice";
import { readDiscoveryDegradation } from "@/shared/discovery/degradedCause";

type Model = { id: string; name?: string };
/** Whether the proposed list comes from the built-in catalog, and why. */
type CatalogDegradation = { degraded: boolean; cause?: string };

/** Draft-only field: the enclosing connection form owns persistence. */
export default function ConnectionTestModelField({
  connectionId,
  disabled,
  onChange,
}: {
  connectionId: string;
  disabled?: boolean;
  onChange: (modelId: string) => void;
}) {
  const t = useTranslations("connectionTest");
  const id = useId();
  const [modelId, setModelId] = useState("");
  const [models, setModels] = useState<Model[]>([]);
  const [degradation, setDegradation] = useState<CatalogDegradation>({ degraded: false });
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const base = `/api/providers/${encodeURIComponent(connectionId)}`;
    const read = async (path: string) => {
      const response = await fetch(base + path, { signal: controller.signal });
      if (!response.ok) throw new Error("Model configuration unavailable");
      return response.json();
    };
    Promise.all([read("/test-message"), read("/models?chatOnly=true&refresh=false")])
      .then(([config, catalog]) => {
        if (controller.signal.aborted) return;
        setModelId(config.modelId || "");
        setModels((catalog.models || []).filter((model: Model) => typeof model.id === "string"));
        // The proposed list may come from the built-in catalog: the operator
        // must know it before choosing a model from it.
        setDegradation(readDiscoveryDegradation(catalog));
      })
      .catch(() => {
        if (!controller.signal.aborted) setFailed(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [connectionId]);
  const available = models.some((model) => model.id === modelId);
  return (
    <div>
      <Select
        id={id}
        label={t("defaultModel")}
        hint={t("defaultModelHint")}
        value={modelId}
        disabled={disabled || loading || failed}
        onChange={(event) => {
          setModelId(event.target.value);
          onChange(event.target.value);
        }}
      >
        <option value="">{loading ? t("loading") : t("chooseModel")}</option>
        {modelId && !available && (
          <option value={modelId} disabled>
            {modelId} — {t("unavailable")}
          </option>
        )}
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name || model.id}
          </option>
        ))}
      </Select>
      <DiscoveryDegradedNotice degraded={degradation.degraded} cause={degradation.cause} />
      {failed && (
        <p role="alert" className="mt-1 text-xs text-error">
          {t("failed")}
        </p>
      )}
    </div>
  );
}
