"use client";

import { useId } from "react";
import { useTranslations } from "next-intl";
import { Field } from "@omniroute/ui-kit/field";
import { Switch } from "@omniroute/ui-kit/switch";
import Icon from "@/shared/components/Icon";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import type { MemorySettingsExtended } from "@/shared/schemas/memory";
import type { EmbeddingProviderListing } from "@/lib/memory/embedding/types";

interface Props {
  settings: MemorySettingsExtended;
  providers: EmbeddingProviderListing[];
  onSave: (updates: Partial<MemorySettingsExtended>) => Promise<boolean>;
  saving?: boolean;
}

export default function RerankConfigCard({ settings, providers, onSave, saving }: Props) {
  const t = useTranslations("memory");
  const rerankModelId = useId();

  const rerankEnabled = settings.rerankEnabled ?? false;
  const rerankProviderModel = settings.rerankProviderModel ?? "";

  // Only list providers that have keys configured
  const rerankProviders = providers.filter((p) => p.hasKey);
  const hasProvider = rerankProviders.length > 0;

  const handleProviderModelChange = (value: string) => {
    onSave({ rerankProviderModel: value || null });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between p-3 rounded-lg bg-bg-subtle border border-border/60">
        <div>
          <p className="text-sm font-medium text-text-main">{t("rerank.enableLabel")}</p>
          <p className="text-xs text-text-muted mt-0.5">{t("rerank.enableDesc")}</p>
        </div>
        <Switch
          data-testid="rerank-enabled-switch"
          aria-label={t("rerank.enableLabel")}
          checked={rerankEnabled}
          onCheckedChange={() => {
            // Plan 21 D13 fix: block enabling rerank when no provider has a key.
            // Allow disabling (turning OFF) always, even if no provider exists.
            if (!rerankEnabled && !hasProvider) return;
            onSave({ rerankEnabled: !rerankEnabled });
          }}
          disabled={saving || (!rerankEnabled && !hasProvider)}
          aria-disabled={saving || (!rerankEnabled && !hasProvider)}
          title={!rerankEnabled && !hasProvider ? t("rerank.noProviderWithKey") : undefined}
          className="shrink-0"
        />
      </div>

      {rerankEnabled && (
        <>
          {/* Latency / cost warning */}
          <div className="p-3 rounded-lg bg-warning/10 border border-warning/20 text-xs text-warning flex items-start gap-2">
            <Icon name="warning" size={14} className="mt-0.5" />
            <span>{t("rerank.warning")}</span>
          </div>

          <Field
            label={t("rerank.providerModelLabel")}
            htmlFor={rerankModelId}
            className="p-3 rounded-lg bg-bg-subtle border border-border/60"
          >
            {!hasProvider ? (
              <p
                data-testid="rerank-no-provider-warning"
                className="text-xs text-warning flex items-center gap-1"
              >
                <Icon name="warning" size={12} />
                {t("rerank.noProviderWithKey")}
              </p>
            ) : (
              <>
                <Select
                  id={rerankModelId}
                  value={
                    rerankProviders.some((p) => p.models.some((m) => m.id === rerankProviderModel))
                      ? rerankProviderModel
                      : ""
                  }
                  onChange={(e) => handleProviderModelChange(e.target.value)}
                  disabled={saving}
                  data-testid="rerank-provider-model-select"
                >
                  <option value="">{t("rerank.selectProviderModel")}</option>
                  {rerankProviders.map((p) =>
                    p.models.length > 0 ? (
                      p.models.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}
                        </option>
                      ))
                    ) : (
                      <optgroup key={p.provider} label={p.provider}>
                        <option value="">{`— ${p.provider} (no curated models)`}</option>
                      </optgroup>
                    )
                  )}
                </Select>
                {/* Free-text override: any configured provider's Cohere-compatible
                  model id is accepted by the runtime even without a curated entry. */}
                <Input
                  type="text"
                  value={rerankProviderModel}
                  onChange={(e) => handleProviderModelChange(e.target.value)}
                  disabled={saving}
                  placeholder="provider/model — e.g. groq/my-reranker"
                  aria-label={t("rerank.providerModelLabel")}
                  data-testid="rerank-provider-model-input"
                  className="mt-2"
                  inputClassName="font-mono"
                />
              </>
            )}
          </Field>
        </>
      )}
    </div>
  );
}
