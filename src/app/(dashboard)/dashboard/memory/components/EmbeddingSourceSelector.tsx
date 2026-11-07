"use client";

import { useId } from "react";
import { useTranslations } from "next-intl";
import { Field } from "@omniroute/ui-kit/field";
import { Switch } from "@omniroute/ui-kit/switch";
import Icon from "@/shared/components/Icon";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import { cn } from "@/shared/utils/cn";
import type { MemorySettingsExtended } from "@/shared/schemas/memory";
import type { EmbeddingProviderListing } from "@/lib/memory/embedding/types";
import CustomEmbeddingEndpointFields from "./CustomEmbeddingEndpointFields";

interface Props {
  settings: MemorySettingsExtended;
  providers: EmbeddingProviderListing[];
  onSave: (updates: Partial<MemorySettingsExtended>) => Promise<boolean>;
  saving?: boolean;
}

type EmbeddingSourceValue = "remote" | "static" | "transformers" | "auto";

export default function EmbeddingSourceSelector({ settings, providers, onSave, saving }: Props) {
  const t = useTranslations("memory");
  const providerModelId = useId();

  const remoteProviders = providers.filter((p) => p.hasKey);
  const currentSource = settings.embeddingSource ?? "auto";
  const currentProviderModel = settings.embeddingProviderModel ?? "";

  const handleSourceChange = (source: EmbeddingSourceValue) => {
    onSave({ embeddingSource: source });
  };

  const handleProviderModelChange = (value: string) => {
    onSave({ embeddingProviderModel: value || null });
  };

  const options: Array<{ value: EmbeddingSourceValue; label: string; desc: string }> = [
    {
      value: "auto",
      label: t("embedding.autoLabel"),
      desc: t("embedding.autoDesc"),
    },
    {
      value: "remote",
      label: t("embedding.remoteLabel"),
      desc: t("embedding.remoteDesc"),
    },
    {
      value: "static",
      label: t("embedding.staticLabel"),
      desc: t("embedding.staticDesc"),
    },
    {
      value: "transformers",
      label: t("embedding.transformersLabel"),
      desc: t("embedding.transformersDesc"),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((opt) => (
          <Button
            key={opt.value}
            variant="outline"
            data-testid={`embedding-source-${opt.value}`}
            aria-pressed={currentSource === opt.value}
            onClick={() => handleSourceChange(opt.value)}
            disabled={saving}
            className={cn(
              "h-auto flex-col items-start whitespace-normal p-3 text-left font-normal",
              currentSource === opt.value
                ? "border-primary/50 bg-primary/10 ring-1 ring-primary/20"
                : "border-border/50 hover:border-border hover:bg-bg-subtle"
            )}
          >
            <span
              className={`text-sm font-medium ${currentSource === opt.value ? "text-primary" : "text-text-main"}`}
            >
              {opt.label}
            </span>
            <span className="text-xs text-text-muted mt-0.5 leading-relaxed">{opt.desc}</span>
          </Button>
        ))}
      </div>

      {currentSource === "remote" && (
        <Field
          label={t("embedding.providerModelLabel")}
          htmlFor={providerModelId}
          className="p-3 rounded-lg bg-bg-subtle border border-border/60"
        >
          {remoteProviders.length === 0 ? (
            <p className="text-xs text-warning flex items-center gap-1">
              <Icon name="warning" size={12} />
              {t("embedding.noRemoteProviders")}
            </p>
          ) : (
            <>
              <Select
                id={providerModelId}
                value={
                  remoteProviders.some((p) => p.models.some((m) => m.id === currentProviderModel))
                    ? currentProviderModel
                    : ""
                }
                onChange={(e) => handleProviderModelChange(e.target.value)}
                disabled={saving}
                data-testid="embedding-provider-model-select"
              >
                <option value="">{t("embedding.selectProviderModel")}</option>
                {remoteProviders.map((p) =>
                  p.models.length > 0 ? (
                    p.models.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.dimensions ? `${m.dimensions}d` : "?"})
                      </option>
                    ))
                  ) : (
                    <optgroup key={p.provider} label={p.provider}>
                      <option value="">{`— ${p.provider} (no curated models)`}</option>
                    </optgroup>
                  )
                )}
              </Select>
              {/* Free-text override: the runtime accepts any configured provider's
                OpenAI-compatible model id, including ones without a curated
                registry entry (e.g. groq/, mistral/, cf/...). */}
              <Input
                type="text"
                value={currentProviderModel}
                onChange={(e) => handleProviderModelChange(e.target.value)}
                disabled={saving}
                placeholder="provider/model — e.g. mistral/mistral-embed"
                aria-label={t("embedding.providerModelLabel")}
                data-testid="embedding-provider-model-input"
                className="mt-2"
                inputClassName="font-mono"
              />
            </>
          )}
          <CustomEmbeddingEndpointFields settings={settings} onSave={onSave} saving={saving} />
        </Field>
      )}

      {currentSource === "transformers" && (
        <div className="p-3 rounded-lg bg-warning/10 border border-warning/20 text-xs text-warning flex items-start gap-2">
          <Icon name="info" size={14} className="mt-0.5" />
          <span>{t("embedding.transformersWarning")}</span>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Switch
          card
          side="right"
          data-testid="toggle-static-enabled"
          label={t("embedding.staticEnabledLabel")}
          description={t("embedding.staticEnabledDesc")}
          checked={settings.staticEnabled ?? false}
          aria-checked={settings.staticEnabled ?? false}
          onCheckedChange={() => onSave({ staticEnabled: !settings.staticEnabled })}
          disabled={saving}
        />
        <Switch
          card
          side="right"
          data-testid="toggle-transformers-enabled"
          label={t("embedding.transformersEnabledLabel")}
          description={t("embedding.transformersEnabledDesc")}
          checked={settings.transformersEnabled ?? false}
          aria-checked={settings.transformersEnabled ?? false}
          onCheckedChange={() => onSave({ transformersEnabled: !settings.transformersEnabled })}
          disabled={saving}
        />
      </div>
    </div>
  );
}
