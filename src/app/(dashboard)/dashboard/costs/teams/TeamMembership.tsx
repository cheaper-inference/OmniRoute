"use client";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Card from "@/shared/components/Card";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import { matchesSearch } from "@/shared/utils/turkishText";
import type { Detail, TeamKeyOption } from "./helpers";

function KeyAssigner({
  detail,
  options,
  pending,
  onAssign,
}: {
  detail: Detail;
  options: TeamKeyOption[];
  pending: boolean;
  onAssign: (key: TeamKeyOption) => void;
}) {
  const t = useTranslations("teamCosts");
  const [query, setQuery] = useState("");
  const [chosen, setChosen] = useState("");
  const choices = options.filter(
    (key) =>
      key.teamId !== detail.team.id &&
      matchesSearch(`${key.name ?? ""} ${key.teamName ?? ""}`, query)
  );
  const selected = choices.find((key) => key.id === chosen);
  return (
    <fieldset disabled={pending} className="mb-5 space-y-3">
      <Input
        label={t("searchKeys")}
        icon="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="flex flex-col sm:flex-row gap-2">
        <select
          aria-label={t("chooseKey")}
          className="min-w-0 flex-1 rounded-control border border-border bg-bg p-2 text-sm"
          value={selected?.id ?? ""}
          onChange={(e) => setChosen(e.target.value)}
        >
          <option value="">{t("chooseKey")}</option>
          {choices.map((key) => (
            <option key={key.id} value={key.id}>
              {key.name || t("unnamedKey")} · {key.teamName || t("unassigned")}
            </option>
          ))}
        </select>
        <Button
          disabled={pending || !selected}
          onClick={() => {
            if (selected) onAssign(selected);
          }}
        >
          {t("assign")}
        </Button>
      </div>
      {selected && (
        <p className="text-xs text-text-muted">
          {t("ownership", { team: selected.teamName || t("unassigned") })}
        </p>
      )}
    </fieldset>
  );
}

function MemberList({
  detail,
  pending,
  onRemove,
}: {
  detail: Detail;
  pending: boolean;
  onRemove: (id: string) => void;
}) {
  const t = useTranslations("teamCosts");
  const locale = useLocale();
  const active = detail.team.status === "active";
  if (!detail.members.length) return <p className="text-sm text-text-muted">{t("noMembers")}</p>;
  return (
    <ul className="divide-y divide-border">
      {detail.members.map((member) => (
        <li key={member.apiKeyId} className="flex items-center justify-between gap-3 py-3">
          <div className="min-w-0">
            <p className="break-words text-sm">{member.apiKeyName || t("unnamedKey")}</p>
            <p className="text-xs text-text-muted">
              {t("assignedAt", {
                date: new Intl.DateTimeFormat(locale, {
                  dateStyle: "medium",
                  timeZone: "UTC",
                }).format(new Date(member.assignedAt)),
              })}
            </p>
          </div>
          {active && (
            <Button
              variant="ghost"
              size="sm"
              disabled={pending}
              onClick={() => onRemove(member.apiKeyId)}
            >
              {t("remove")}
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function TeamMembership({
  detail,
  options,
  pending,
  onAssign,
  onRemove,
}: {
  detail: Detail;
  options: TeamKeyOption[];
  pending: boolean;
  onAssign: (key: TeamKeyOption) => void;
  onRemove: (id: string) => void;
}) {
  const t = useTranslations("teamCosts");
  return (
    <Card title={t("members")} subtitle={t("memberSubtitle")} icon="group">
      {detail.team.status === "active" && (
        <KeyAssigner detail={detail} options={options} pending={pending} onAssign={onAssign} />
      )}
      <MemberList detail={detail} pending={pending} onRemove={onRemove} />
    </Card>
  );
}
