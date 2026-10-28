"use client";
import { useTranslations } from "next-intl";
import Card from "@/shared/components/Card";
import SearchableSelect from "@/shared/components/SearchableSelect";
import Select from "@/shared/components/Select";
import type { Team } from "./helpers";

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
  return (
    <Card padding="sm">
      <fieldset
        disabled={blocked}
        className="grid grid-cols-1 items-end gap-3 sm:grid-cols-[minmax(0,1fr)_12rem]"
      >
        <SearchableSelect
          key={filter}
          label={t("selectTeam")}
          searchLabel={t("searchTeams")}
          emptyLabel={t("noTeams")}
          options={teams.map((team) => ({ value: team.id, label: team.name }))}
          value={selectedId}
          disabled={blocked}
          onChange={onSelect}
        />
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
