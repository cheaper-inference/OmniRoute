"use client";

import { useTranslations } from "next-intl";
import { RadioGroup, RadioGroupItem } from "@omniroute/ui-kit/radio-group";
import { Checkbox } from "@/shared/components";
import { getProviderDisplayName } from "@/lib/display/names";
import { toggleSharedQuotaProvider } from "../selfServiceQuota";
import type { QuotaProviderOption } from "../selfServiceQuota";

/** Single reachable/unreachable provider row inside the shared-quota checklist. */
function ProviderQuotaRow({
  option,
  checked,
  reachable,
  onToggle,
}: {
  option: QuotaProviderOption;
  checked: boolean;
  reachable: boolean;
  onToggle: () => void;
}) {
  const t = useTranslations("apiManager");
  return (
    <li>
      <Checkbox
        checked={checked}
        onChange={onToggle}
        className="text-xs text-text-main"
        label={
          <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className="font-medium">{getProviderDisplayName(option.provider)}</span>
            <span className="text-text-muted">
              {reachable
                ? t("sharedQuotaProviderConnections", { count: option.connectionCount })
                : t("sharedQuotaProviderUnreachable")}
            </span>
            {option.quotaSupported === false && (
              <span className="rounded bg-surface-2 px-1.5 py-0.5 text-[10px] text-text-muted">
                {t("sharedQuotaProviderNoQuotaData")}
              </span>
            )}
          </span>
        }
      />
    </li>
  );
}

/**
 * Fieldset choosing which reachable providers' shared account quota a key holder can
 * see: "all" (`sharedQuotaProviders === null`) or an explicit subset checklist.
 */
export function ProviderQuotaPicker({
  baseId,
  disabled,
  shareAll,
  selected,
  providerOptions,
  reachable,
  onSetProviders,
}: {
  baseId: string;
  disabled: boolean;
  shareAll: boolean;
  selected: string[];
  providerOptions: readonly QuotaProviderOption[];
  reachable: Set<string>;
  onSetProviders: (sharedQuotaProviders: string[] | null) => void;
}) {
  const t = useTranslations("apiManager");
  // Keep a saved provider visible after it stops being reachable so it can be unchecked.
  const rows: QuotaProviderOption[] = [
    ...providerOptions,
    ...selected
      .filter((provider) => !reachable.has(provider))
      .map((provider) => ({ provider, connectionCount: 0 })),
  ];

  return (
    <fieldset className="flex flex-col gap-2" disabled={disabled}>
      <legend className="text-sm font-medium text-text-main">
        {t("sharedQuotaProvidersTitle")}
      </legend>
      <p className="text-xs text-text-muted">{t("sharedQuotaProvidersDesc")}</p>
      <RadioGroup
        name={`${baseId}-mode`}
        aria-label={t("sharedQuotaProvidersTitle")}
        value={shareAll ? "all" : "selected"}
        onValueChange={(next) =>
          onSetProviders(next === "all" ? null : providerOptions.map((option) => option.provider))
        }
        disabled={disabled}
        orientation="horizontal"
      >
        <RadioGroupItem value="all" label={t("sharedQuotaProvidersAll")} />
        <RadioGroupItem value="selected" label={t("sharedQuotaProvidersSelected")} />
      </RadioGroup>
      {!shareAll && rows.length > 0 && (
        <ul className="flex flex-col gap-1 rounded-md border border-border bg-surface/40 p-2">
          {rows.map((option) => (
            <ProviderQuotaRow
              key={option.provider}
              option={option}
              checked={selected.includes(option.provider)}
              reachable={reachable.has(option.provider)}
              onToggle={() => onSetProviders(toggleSharedQuotaProvider(selected, option.provider))}
            />
          ))}
        </ul>
      )}
      {providerOptions.length === 0 && (
        <p className="text-xs text-text-muted">{t("sharedQuotaProvidersNoneReachable")}</p>
      )}
      {!shareAll && selected.length === 0 && (
        <p className="text-xs text-warning" role="status">
          {t("sharedQuotaProvidersNoneSelected")}
        </p>
      )}
    </fieldset>
  );
}
