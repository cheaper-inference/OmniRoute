"use client";

import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import { AllowedCombosSection } from "@/app/(dashboard)/dashboard/api-manager/components/AllowedCombosSection";
import { ApiKeyAutoCombosToggle } from "@/app/(dashboard)/dashboard/api-manager/components/ApiKeyAutoCombosToggle";
import { ApiKeyCcDiscoveryAliasesToggle } from "@/app/(dashboard)/dashboard/api-manager/components/ApiKeyCcDiscoveryAliasesToggle";
import type { ApiKeyAccessFormState } from "../useApiKeyAccessForm";
import TabErrorList from "./TabErrorList";

export interface ComboOption {
  name: string;
  models?: string[];
  strategy?: string;
  isActive?: boolean;
  isHidden?: boolean;
}

interface CombosTabProps {
  formState: ApiKeyAccessFormState;
  allCombos: ComboOption[];
  setAllowAllCombos: (allow: boolean) => void;
  setSelectedCombos: (combos: string[]) => void;
  toggleCombo: (comboName: string) => void;
  setAllowAutoCombos: (enabled: boolean) => void;
  setAllowCcDiscoveryAliases: (enabled: boolean) => void;
  errors?: string[];
}

/**
 * Under "All", the combos the key also names are saved next to combo/* and skip the
 * key's blocked models. Show them so that stays visible and each can be removed.
 */
function NamedCombosUnderAll({
  names,
  onRemove,
}: {
  names: string[];
  onRemove: (name: string) => void;
}) {
  const t = useTranslations("apiManager");
  if (names.length === 0) return null;
  return (
    <div className="flex flex-col gap-2 p-3 rounded-lg border border-border bg-surface/40">
      <p className="text-xs text-text-muted">
        {t("namedCombosSkipBlockedModels", { count: names.length })}
      </p>
      <div className="flex flex-wrap gap-1">
        {names.map((name) => (
          <span
            key={name}
            className="inline-flex items-center gap-1 pl-2 pr-0.5 py-0.5 rounded border border-border bg-surface text-[11px] text-text-main"
          >
            <span data-testid="named-combo-under-all" className="truncate max-w-[16rem]">
              {name}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              icon="close"
              onClick={() => onRemove(name)}
              aria-label={t("removeNamedCombo", { name })}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function CombosTab({
  formState,
  allCombos,
  setAllowAllCombos,
  setSelectedCombos,
  toggleCombo,
  setAllowAutoCombos,
  setAllowCcDiscoveryAliases,
  errors,
}: CombosTabProps) {
  return (
    <div className="flex flex-col gap-5">
      <TabErrorList errors={errors} />

      {/* Auto Combos Toggle */}
      <ApiKeyAutoCombosToggle
        enabled={formState.allowAutoCombos}
        onToggle={() => setAllowAutoCombos(!formState.allowAutoCombos)}
      />

      <ApiKeyCcDiscoveryAliasesToggle
        enabled={formState.allowCcDiscoveryAliases}
        onToggle={() => setAllowCcDiscoveryAliases(!formState.allowCcDiscoveryAliases)}
      />

      {/* Allowed Combos Section */}
      <AllowedCombosSection
        allCombos={allCombos}
        allowAllCombos={formState.allowAllCombos}
        selectedCombos={formState.selectedCombos}
        // Keep the selection: under All the named combos are saved next to combo/*.
        onAllowAll={() => setAllowAllCombos(true)}
        onRestrict={() => setAllowAllCombos(false)}
        onToggleCombo={toggleCombo}
      />

      {formState.allowAllCombos && (
        <NamedCombosUnderAll
          names={formState.selectedCombos}
          onRemove={(name) =>
            setSelectedCombos(formState.selectedCombos.filter((combo) => combo !== name))
          }
        />
      )}
    </div>
  );
}
