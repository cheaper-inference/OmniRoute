import type { SearchableSelectOption } from "@omniroute/ui-kit/searchable-select";
import type { ComboBuilderConnectionOption } from "@/lib/combos/builderOptions";
import { matchesEntitySearch, normalizeEntitySearch } from "@/shared/utils/entitySearch";
import { pickDisplayValue } from "@/shared/utils/maskEmail";

export function projectAccountSearchOption(
  account: Pick<ComboBuilderConnectionOption, "id" | "label" | "status">,
  emailsVisible: boolean
) {
  const rawLabel = account.label.trim();
  const displayLabel = pickDisplayValue([rawLabel], emailsVisible, account.id);
  // Very short email usernames are left unchanged by the display masker.
  const label =
    !emailsVisible && rawLabel.includes("@") && displayLabel === rawLabel
      ? account.id
      : displayLabel;
  return {
    value: account.id,
    label,
    description: account.status === "active" ? account.id : `${account.id} · ${account.status}`,
    keywords: normalizeEntitySearch(`${account.id} ${label}`),
  };
}

export function filterComboSearchOption(query: string, option: SearchableSelectOption) {
  // The clear and automatic options have no search index and stay available for any query.
  return option.keywords === undefined || matchesEntitySearch(query, option.keywords);
}

export function withCurrentAndDefaultOptions(
  options: SearchableSelectOption[],
  current: string,
  defaultOption: SearchableSelectOption
): SearchableSelectOption[] {
  const missing =
    current !== defaultOption.value && !options.some(({ value }) => value === current);
  return [
    defaultOption,
    ...options,
    ...(missing
      ? [
          {
            value: current,
            label: current,
            keywords: normalizeEntitySearch(current),
            disabled: true,
          },
        ]
      : []),
  ];
}
