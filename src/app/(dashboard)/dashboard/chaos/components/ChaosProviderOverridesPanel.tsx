"use client";

import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";

export interface ChaosProviderInfo {
  id: string;
  name: string;
  provider: string;
  defaultModel: string | null;
}

export interface ChaosProviderOverride {
  providerId: string;
  modelId?: string;
  enabled: boolean;
}

type UpdateOverride = (index: number, field: keyof ChaosProviderOverride, value: any) => void;

function ChaosProviderOverrideRow({
  override,
  index,
  availableProviders,
  onUpdate,
  onRemove,
}: {
  override: ChaosProviderOverride;
  index: number;
  availableProviders: ChaosProviderInfo[];
  onUpdate: UpdateOverride;
  onRemove: (index: number) => void;
}) {
  const t = useTranslations("chaosConfig");
  return (
    <div className="flex items-center gap-2 p-2 rounded-md bg-bg-subtle">
      {/* Provider dropdown with available options */}
      <div className="flex-1 relative">
        <Input
          type="text"
          list={`provider-list-${index}`}
          aria-label={t("providerId")}
          placeholder={t("providerIdPlaceholder")}
          value={override.providerId}
          onChange={(e) => onUpdate(index, "providerId", e.target.value)}
        />
        <datalist id={`provider-list-${index}`}>
          {availableProviders.map((p) => (
            <option key={p.id} value={p.provider} />
          ))}
        </datalist>
      </div>
      <Input
        type="text"
        className="flex-1"
        aria-label={t("modelId")}
        placeholder={t("modelIdPlaceholder")}
        value={override.modelId || ""}
        onChange={(e) => onUpdate(index, "modelId", e.target.value)}
      />
      <Button
        size="sm"
        variant="outline"
        className={override.enabled ? "text-success" : "text-error"}
        aria-pressed={override.enabled}
        onClick={() => onUpdate(index, "enabled", !override.enabled)}
      >
        {override.enabled ? t("on") : t("off")}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        icon="close"
        className="text-error"
        aria-label={t("removeProvider")}
        title={t("removeProvider")}
        onClick={() => onRemove(index)}
      />
    </div>
  );
}

function ChaosAvailableProvidersHint({
  availableProviders,
}: {
  availableProviders: ChaosProviderInfo[];
}) {
  const t = useTranslations("chaosConfig");
  if (availableProviders.length === 0) return null;
  return (
    <details className="text-xs text-text-muted">
      <summary className="cursor-pointer hover:text-text-main">
        {t("availableProviders", { count: availableProviders.length })}
      </summary>
      <div className="mt-1 flex flex-wrap gap-1">
        {availableProviders.map((p) => (
          <span key={p.id} className="px-1.5 py-0.5 rounded bg-bg-subtle">
            {p.provider}
            {p.defaultModel && <span className="opacity-60 ml-1">({p.defaultModel})</span>}
          </span>
        ))}
      </div>
    </details>
  );
}

/**
 * Per-provider model override editor for the Chaos Mode config page.
 * Extracted out of ChaosConfigPageClient.tsx to keep the page component under
 * the complexity/size ratchet (config/quality/complexity-baseline.json).
 */
export function ChaosProviderOverridesPanel({
  overrides,
  availableProviders,
  title,
  description,
  addLabel,
  onAdd,
  onUpdate,
  onRemove,
}: {
  overrides: ChaosProviderOverride[];
  availableProviders: ChaosProviderInfo[];
  title: string;
  description: string;
  addLabel: string;
  onAdd: () => void;
  onUpdate: UpdateOverride;
  onRemove: (index: number) => void;
}) {
  const t = useTranslations("chaosConfig");
  return (
    <div className="p-3 rounded-lg border border-border bg-surface space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-text-main">{title}</p>
          <p className="text-xs text-text-muted">{description}</p>
        </div>
        <Button variant="secondary" size="sm" icon="add" onClick={onAdd}>
          {addLabel}
        </Button>
      </div>

      {overrides.length === 0 && (
        <p className="text-xs text-text-muted italic">{t("noProviderOverrides")}</p>
      )}

      {overrides.map((override, idx) => (
        <ChaosProviderOverrideRow
          key={idx}
          override={override}
          index={idx}
          availableProviders={availableProviders}
          onUpdate={onUpdate}
          onRemove={onRemove}
        />
      ))}

      <ChaosAvailableProvidersHint availableProviders={availableProviders} />
    </div>
  );
}
