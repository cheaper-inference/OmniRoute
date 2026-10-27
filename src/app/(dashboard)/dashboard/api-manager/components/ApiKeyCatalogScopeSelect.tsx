"use client";

import Icon from "@/shared/components/Icon";

import { useTranslations } from "next-intl";
import { RadioGroup, RadioGroupItem } from "@omniroute/ui-kit/radio-group";

export type CatalogScope = "all" | "combos" | "models";

const OPTIONS: Array<{ value: CatalogScope; icon: string; labelKey: string }> = [
  { value: "all", icon: "list", labelKey: "catalogScopeAll" },
  { value: "combos", icon: "hub", labelKey: "catalogScopeCombos" },
  { value: "models", icon: "smart_toy", labelKey: "catalogScopeModels" },
];

/**
 * What a key's `/v1/models` advertises: combos, provider models, or both.
 *
 * A listing preference, not an access control — narrowing it never changes what
 * the key may dispatch. Useful for a key driving a client that builds its model
 * picker from the catalog and should only see curated combos.
 */
export function ApiKeyCatalogScopeSelect({
  value,
  onChange,
}: {
  value: CatalogScope;
  onChange: (next: CatalogScope) => void;
}) {
  const tSettings = useTranslations("settings");

  return (
    <div className="flex flex-col gap-2 p-3 rounded-lg border border-border bg-surface/40">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-text-main">{tSettings("catalogScopeTitle")}</p>
        <p className="text-xs text-text-muted">{tSettings("catalogScopeDesc")}</p>
      </div>
      <RadioGroup
        orientation="horizontal"
        aria-label={tSettings("catalogScopeTitle")}
        value={value}
        onValueChange={(next) => onChange(next as CatalogScope)}
      >
        {OPTIONS.map((opt) => (
          <RadioGroupItem
            key={opt.value}
            value={opt.value}
            label={
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold">
                <Icon name={opt.icon} size={14} />
                {tSettings(opt.labelKey)}
              </span>
            }
          />
        ))}
      </RadioGroup>
    </div>
  );
}
