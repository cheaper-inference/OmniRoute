"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import type { MemorySettingsExtended } from "@/shared/schemas/memory";

type Props = {
  settings: MemorySettingsExtended;
  onSave: (updates: Partial<MemorySettingsExtended>) => Promise<boolean>;
  saving?: boolean;
};

function normalizeBaseUrl(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(trimmed);
    if (
      (url.protocol !== "http:" && url.protocol !== "https:") ||
      url.username ||
      url.password ||
      url.search ||
      url.hash
    ) {
      return null;
    }
    return trimmed.replace(/\/+$/, "");
  } catch {
    return null;
  }
}

export default function CustomEmbeddingEndpointFields({ settings, onSave, saving }: Props) {
  const t = useTranslations("memory");
  const [baseUrl, setBaseUrl] = useState(settings.customBaseUrl ?? "");
  const [modelId, setModelId] = useState(settings.customModelId ?? "");
  const [error, setError] = useState<string | null>(null);

  const save = async () => {
    const normalizedBaseUrl = normalizeBaseUrl(baseUrl);
    const normalizedModelId = modelId.trim() || null;
    if ((baseUrl.trim() || normalizedModelId) && (!normalizedBaseUrl || !normalizedModelId)) {
      setError(t("embedding.customEndpointInvalid"));
      return;
    }
    setError(null);
    const saved = await onSave({
      customBaseUrl: normalizedBaseUrl,
      customModelId: normalizedModelId,
    });
    if (!saved) {
      setError(t("embedding.customEndpointSaveFailed"));
      return;
    }
    setBaseUrl(normalizedBaseUrl ?? "");
    setModelId(normalizedModelId ?? "");
  };

  return (
    <div className="mt-4 pt-4 border-t border-border/60 space-y-3">
      <Input
        label={t("embedding.customBaseUrlLabel")}
        value={baseUrl}
        onChange={(event) => setBaseUrl(event.target.value)}
        placeholder="http://localhost:8000/v1"
        disabled={saving}
        data-testid="embedding-custom-base-url"
      />
      <Input
        label={t("embedding.customModelIdLabel")}
        value={modelId}
        onChange={(event) => setModelId(event.target.value)}
        placeholder="my-embedding-model"
        disabled={saving}
        data-testid="embedding-custom-model-id"
      />
      <p className="text-xs text-text-muted">{t("embedding.customEndpointHelp")}</p>
      {error && (
        <p role="alert" className="text-xs text-error">
          {error}
        </p>
      )}
      <Button
        size="sm"
        onClick={() => void save()}
        disabled={saving}
        data-testid="embedding-custom-save"
      >
        {t("embedding.customEndpointSave")}
      </Button>
    </div>
  );
}
