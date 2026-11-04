"use client";
import { useId } from "react";
import { useTranslations } from "next-intl";
import { Field } from "@omniroute/ui-kit/field";
import { SearchableSelect } from "@omniroute/ui-kit/searchable-select";
import Card from "@/shared/components/Card";
import Select from "@/shared/components/Select";
import { normalizeForSearch } from "@/shared/utils/turkishText";
import type { Team } from "./helpers";

/**
 * The kit SearchableSelect commits the active option on Enter even while an IME composition is
 * still open (e.g. confirming a Chinese candidate). React portals bubble through this wrapper, so
 * stopping that one keydown in the capture phase keeps typing from committing a new team.
 */
function ignoreComposingEnter(event: React.KeyboardEvent) {
  if (event.key === "Enter" && event.nativeEvent.isComposing) event.stopPropagation();
}

export default function TeamPicker({
  teams,
  selectedId,
  filter,
  blocked,
  onSelect,
  onFilter,
}: {
  teams: Team[];
  selectedId: string;
  filter: string;
  blocked: boolean;
  onSelect: (id: string) => void;
  onFilter: (filter: string) => void;
}) {
  const t = useTranslations("teamCosts");
  const pickerId = useId();
  return (
    <Card padding="sm">
      <fieldset
        disabled={blocked}
        className="grid grid-cols-1 items-end gap-3 sm:grid-cols-[minmax(0,1fr)_12rem]"
      >
        <Field
          htmlFor={pickerId}
          label={t("selectTeam")}
          className="min-w-0 gap-1.5"
          onKeyDownCapture={ignoreComposingEnter}
        >
          <SearchableSelect
            key={filter}
            id={pickerId}
            variant="field"
            label={t("selectTeam")}
            placeholder={t("noTeams")}
            searchPlaceholder={t("searchTeams")}
            emptyMessage={t("noTeams")}
            // The folded name keeps the accent-insensitive, Turkish-safe matching of the old picker.
            options={teams.map((team) => ({
              value: team.id,
              label: team.name,
              keywords: normalizeForSearch(team.name),
            }))}
            value={selectedId}
            disabled={blocked}
            onValueChange={onSelect}
          />
        </Field>
        <Select
          label={t("statusFilter")}
          aria-label={t("statusFilter")}
          className="min-w-0"
          value={filter}
          onChange={(e) => onFilter(e.target.value)}
        >
          <option value="active">{t("active")}</option>
          <option value="archived">{t("archived")}</option>
          <option value="all">{t("allTeams")}</option>
        </Select>
      </fieldset>
      {!teams.length && <p className="mt-3 text-sm text-text-muted">{t("noTeams")}</p>}
    </Card>
  );
}
