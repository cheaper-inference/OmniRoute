"use client";

import { useId, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Field } from "@omniroute/ui-kit/field";
import { SearchableSelect, type SearchableSelectOption } from "@omniroute/ui-kit/searchable-select";
import { COMBO_BUILDER_AUTO_CONNECTION } from "@/lib/combos/builderDraft";
import type { ComboBuilderProviderOption } from "@/lib/combos/builderOptions";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import { matchesEntitySearch, normalizeEntitySearch } from "@/shared/utils/entitySearch";
import { getI18nOrFallback } from "./comboPageHelpers";
import {
  filterComboSearchOption,
  projectAccountSearchOption,
  withCurrentAndDefaultOptions,
} from "./comboSearchOptions";

interface Props {
  providers: ComboBuilderProviderOption[];
  providerId: string;
  modelId: string;
  connectionId: string;
  loading: boolean;
  loadError: boolean;
  emailsVisible: boolean;
  allowedConnectionIds: string[];
  onProviderChange: (value: string) => void;
  onModelChange: (value: string) => void;
  onConnectionChange: (value: string) => void;
  onAllowedConnectionToggle: (value: string) => void;
}

function useComboStepOptions({ providers, providerId, emailsVisible }: Props) {
  const t = useTranslations("combos");
  const provider = providers.find((item) => item.providerId === providerId);
  const models = provider?.models;
  const connections = provider?.connections;
  const providerOptions = useMemo(
    () =>
      providers.map((item) => ({
        value: item.providerId,
        label: item.displayName,
        description: t("builderGlobalAccountCount", { count: item.connectionCount }),
        keywords: normalizeEntitySearch(
          [item.displayName, item.providerId, item.alias, item.prefix].join(" ")
        ),
      })),
    [providers, t]
  );
  const modelOptions = useMemo(
    () =>
      (models ?? []).map((item) => ({
        value: item.id,
        label: item.name,
        description: item.source ? `${item.id} · ${item.source}` : item.id,
        keywords: normalizeEntitySearch(
          [item.name, item.id, item.source, ...(item.sources ?? [])].join(" ")
        ),
      })),
    [models]
  );
  const accountOptions = useMemo(
    () => (connections ?? []).map((item) => projectAccountSearchOption(item, emailsVisible)),
    [connections, emailsVisible]
  );
  return { provider, providerOptions, modelOptions, accountOptions };
}

export default function ComboStepSelectors(props: Props) {
  const t = useTranslations("combos");
  const tc = useTranslations("common");
  const fieldId = useId();
  const { providerId, modelId, connectionId } = props;
  const { provider, providerOptions, modelOptions, accountOptions } = useComboStepOptions(props);
  const providerLabel = `1. ${t("builderProvider")}`;
  const modelLabel = `2. ${t("builderModel")}`;
  const accountContext = JSON.stringify([providerId, modelId, props.emailsVisible]);
  const searchLabels = { searchPlaceholder: tc("search"), emptyMessage: tc("noResults") };

  return (
    <>
      <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-3">
        <Field
          htmlFor={`${fieldId}-provider`}
          label={providerLabel}
          error={props.loadError ? tc("failedToLoad") : undefined}
          className="min-w-0"
          data-testid="combo-builder-provider"
        >
          <SearchableSelect
            {...searchLabels}
            id={`${fieldId}-provider`}
            variant="field"
            label={providerLabel}
            value={providerId}
            disabled={props.loading}
            options={withCurrentAndDefaultOptions(providerOptions, providerId, {
              value: "",
              label: t(props.loading ? "builderLoadingProviders" : "builderSelectProvider"),
            })}
            filter={filterComboSearchOption}
            onValueChange={(value) => {
              if (value !== providerId) props.onProviderChange(value);
            }}
          />
        </Field>
        <Field
          htmlFor={`${fieldId}-model`}
          label={modelLabel}
          className="min-w-0"
          data-testid="combo-builder-model"
        >
          <SearchableSelect
            {...searchLabels}
            key={providerId}
            id={`${fieldId}-model`}
            variant="field"
            label={modelLabel}
            value={modelId}
            disabled={!provider}
            options={withCurrentAndDefaultOptions(modelOptions, modelId, {
              value: "",
              label: t(provider ? "builderSelectModel" : "builderProviderFirst"),
            })}
            filter={filterComboSearchOption}
            onValueChange={(value) => {
              if (value !== modelId) props.onModelChange(value);
            }}
          />
        </Field>
        <AccountPicker
          key={accountContext}
          options={accountOptions}
          value={connectionId}
          disabled={!modelOptions.some(({ value }) => value === modelId)}
          onChange={props.onConnectionChange}
        />
      </div>
      {connectionId === COMBO_BUILDER_AUTO_CONNECTION && accountOptions.length > 1 && (
        <AccountRestrictions
          key={accountContext}
          options={accountOptions}
          selectedIds={props.allowedConnectionIds}
          onToggle={props.onAllowedConnectionToggle}
        />
      )}
    </>
  );
}

function AccountPicker({
  options,
  value,
  disabled,
  onChange,
}: {
  options: SearchableSelectOption[];
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
}) {
  const id = useId();
  const t = useTranslations("combos");
  const tc = useTranslations("common");
  const label = `3. ${t("builderAccount")}`;
  return (
    <Field htmlFor={id} label={label} className="min-w-0" data-testid="combo-builder-account">
      <SearchableSelect
        id={id}
        variant="field"
        label={label}
        searchPlaceholder={tc("search")}
        emptyMessage={tc("noResults")}
        value={value}
        disabled={disabled}
        options={withCurrentAndDefaultOptions(options, value, {
          value: COMBO_BUILDER_AUTO_CONNECTION,
          label: t("autoSelectAccount"),
        })}
        filter={filterComboSearchOption}
        onValueChange={(next) => {
          if (next !== value) onChange(next);
        }}
      />
    </Field>
  );
}

function AccountRestrictions({
  options,
  selectedIds,
  onToggle,
}: {
  options: ReturnType<typeof projectAccountSearchOption>[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}) {
  const t = useTranslations("combos");
  const tc = useTranslations("common");
  const tp = useTranslations("providers");
  const [query, setQuery] = useState("");
  const visible = options.filter((option) => matchesEntitySearch(query, option.keywords));
  const label = getI18nOrFallback(t, "builderRestrictAccounts", "Restrict to accounts (optional)");

  return (
    <div className="mt-2 rounded-md border border-border bg-surface px-2.5 py-2">
      <p className="ci-eyebrow mb-1.5" data-weight="medium">
        {label}
      </p>
      <div className="mb-2 flex items-end gap-2">
        <Input
          label={`${tc("search")} · ${label}`}
          className="min-w-0 flex-1"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {query && (
          <Button variant="ghost" size="sm" onClick={() => setQuery("")}>
            {t("clearSearch")}
          </Button>
        )}
      </div>
      <p className="mb-2 text-xs text-text-muted" aria-live="polite">
        {tp("selectedCount", { count: selectedIds.length })}
      </p>
      <div className="flex flex-wrap gap-1.5" data-testid="combo-builder-allowlist">
        {visible.map((option) => {
          const checked = selectedIds.includes(option.value);
          return (
            <Button
              key={option.value}
              size="sm"
              variant={checked ? "secondary" : "outline"}
              onClick={() => onToggle(option.value)}
              aria-pressed={checked}
              aria-label={`${option.label} · ${option.value}`}
              title={option.value}
              icon={checked ? "check" : undefined}
            >
              <bdi>{option.label}</bdi>
            </Button>
          );
        })}
        {visible.length === 0 && (
          <p className="text-xs text-text-muted" role="status">
            {tc("noResults")}
          </p>
        )}
      </div>
      <p className="mt-1.5 text-xs text-text-muted">
        {getI18nOrFallback(
          t,
          "builderRestrictAccountsHint",
          "Leave empty to use all active accounts. When selected, automatic routing stays within these accounts."
        )}
      </p>
    </div>
  );
}
