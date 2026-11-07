"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { ComboBuilderProviderOption } from "@/lib/combos/builderOptions";
import { COMBO_BUILDER_AUTO_CONNECTION } from "@/lib/combos/builderDraft";
import SearchableSelectField from "@/shared/components/SearchableSelectField";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import { pickDisplayValue } from "@/shared/utils/maskEmail";
import { matchesEntitySearch } from "@/shared/utils/entitySearch";

interface Props {
  providers: ComboBuilderProviderOption[];
  providerId: string;
  modelId: string;
  connectionId: string;
  loading: boolean;
  error?: string;
  emailsVisible: boolean;
  allowedConnectionIds: string[];
  onProviderChange: (value: string) => void;
  onModelChange: (value: string) => void;
  onConnectionChange: (value: string) => void;
  onAllowedConnectionToggle: (value: string) => void;
}

function useSelectorOptions(props: Props) {
  const t = useTranslations("combos");
  const provider = props.providers.find((item) => item.providerId === props.providerId);
  const models = provider?.models;
  const connections = provider?.connections;
  const providerOptions = useMemo(
    () =>
      props.providers.map((item) => ({
        value: item.providerId,
        label: item.displayName,
        description: t("builderGlobalAccountCount", { count: item.connectionCount }),
        keywords: [item.alias, item.prefix ?? ""],
      })),
    [props.providers, t]
  );
  const modelOptions = useMemo(
    () =>
      (models ?? []).map((item) => ({
        value: item.id,
        label: item.name,
        description: [item.qualifiedModel || item.id, item.source].filter(Boolean).join(" · "),
        keywords: item.sources ?? [],
      })),
    [models]
  );
  const accountOptions = useMemo(
    () =>
      (connections ?? []).map((item) => ({
        value: item.id,
        label: pickDisplayValue([item.label], props.emailsVisible, item.id),
        description: `${item.id}${item.status !== "active" ? ` · ${item.status}` : ""}`,
      })),
    [connections, props.emailsVisible]
  );

  return { provider, models, providerOptions, modelOptions, accountOptions };
}

/** Projection deliberately excludes raw account objects and credential fields. */
export default function ComboStepSelectors(props: Props) {
  const t = useTranslations("combos");
  const tc = useTranslations("common");
  const tp = useTranslations("providers");
  const { provider, models, providerOptions, modelOptions, accountOptions } =
    useSelectorOptions(props);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
        <SearchableSelectField
          label={`1. ${t("builderProvider")}`}
          value={props.providerId}
          onValueChange={props.onProviderChange}
          loading={props.loading}
          error={props.error}
          placeholder={t("builderSelectProvider")}
          options={[
            { value: "", label: t("builderSelectProvider"), alwaysVisible: true },
            ...providerOptions,
          ]}
          data-testid="combo-builder-provider"
        />
        <SearchableSelectField
          label={`2. ${t("builderModel")}`}
          value={props.modelId}
          onValueChange={props.onModelChange}
          disabled={!provider}
          resetKey={props.providerId}
          placeholder={provider ? t("builderSelectModel") : t("builderProviderFirst")}
          options={[
            { value: "", label: t("builderSelectModel"), alwaysVisible: true },
            ...modelOptions,
          ]}
          data-testid="combo-builder-model"
        />
        <SearchableSelectField
          label={`3. ${t("builderAccount")}`}
          value={props.connectionId}
          onValueChange={props.onConnectionChange}
          disabled={!models?.some((item) => item.id === props.modelId)}
          resetKey={`${props.providerId}:${props.modelId}:${props.emailsVisible}`}
          options={[
            {
              value: COMBO_BUILDER_AUTO_CONNECTION,
              label: t("autoSelectAccount"),
              alwaysVisible: true,
            },
            ...accountOptions,
          ]}
          data-testid="combo-builder-account"
        />
      </div>
      {props.connectionId === COMBO_BUILDER_AUTO_CONNECTION && accountOptions.length > 1 && (
        <AccountRestrictions
          key={`${props.providerId}:${props.modelId}:${props.emailsVisible}`}
          options={accountOptions}
          selectedIds={props.allowedConnectionIds}
          onToggle={props.onAllowedConnectionToggle}
          label={t("builderRestrictAccounts")}
          hint={t("builderRestrictAccountsHint")}
          selectedCount={tp("selectedCount", { count: props.allowedConnectionIds.length })}
          searchLabel={`${tc("search")} · ${t("builderRestrictAccounts")}`}
        />
      )}
    </>
  );
}

function AccountRestrictions({
  options,
  selectedIds,
  onToggle,
  label,
  hint,
  selectedCount,
  searchLabel,
}: {
  options: { value: string; label: string }[];
  selectedIds: string[];
  onToggle: (value: string) => void;
  label: string;
  hint: string;
  selectedCount: string;
  searchLabel: string;
}) {
  const t = useTranslations("common");
  const tSearch = useTranslations("sidebar.commandPalette");
  const [query, setQuery] = useState("");
  const visible = useMemo(
    () => options.filter((option) => matchesEntitySearch([option.label, option.value], query)),
    [options, query]
  );
  return (
    <div className="mt-2 rounded-md border border-border bg-surface px-2.5 py-2">
      <p className="text-xs font-medium uppercase tracking-wide text-text-muted mb-1.5">{label}</p>
      <div className="flex items-end gap-2 mb-2">
        <Input
          label={searchLabel}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {query && (
          <Button variant="ghost" size="sm" onClick={() => setQuery("")}>
            {tSearch("clearSearch")}
          </Button>
        )}
      </div>
      <p className="text-xs text-text-muted mb-2" aria-live="polite">
        {selectedCount}
      </p>
      <div
        className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto"
        data-testid="combo-builder-allowlist"
      >
        {visible.map((option) => {
          const checked = selectedIds.includes(option.value);
          return (
            <Button
              key={option.value}
              size="sm"
              variant={checked ? "secondary" : "outline"}
              onClick={() => onToggle(option.value)}
              aria-pressed={checked}
              icon={checked ? "check" : undefined}
            >
              <bdi>{option.label}</bdi>
            </Button>
          );
        })}
        {visible.length === 0 && <p role="status">{t("noResults")}</p>}
      </div>
      <p className="text-[10px] text-text-muted mt-1.5">{hint}</p>
    </div>
  );
}
