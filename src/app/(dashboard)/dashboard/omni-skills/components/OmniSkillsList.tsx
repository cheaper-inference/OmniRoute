"use client";

import { useTranslations } from "next-intl";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import EmptyState from "@/shared/components/EmptyState";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import { Card } from "@/shared/components";
import { OmniSkillCard } from "./OmniSkillCard";
import { SkillInspectorPane } from "./SkillInspectorPane";
import type { OmniSkill } from "./OmniSkillCard";

interface OmniSkillsListProps {
  skills: OmniSkill[];
  skillsTotal: number;
  skillsPage: number;
  skillsTotalPages: number;
  popularDefaults: string[];
  searchTerm: string;
  modeFilter: "all" | "on" | "off" | "auto";
  selectedSkillId: string | null;
  onSearchTermChange: (v: string) => void;
  onModeFilterChange: (v: "all" | "on" | "off" | "auto") => void;
  onApplyFilters: () => void;
  onPagePrev: () => void;
  onPageNext: () => void;
  onSelectSkill: (id: string) => void;
  onSetMode: (skillId: string, mode: "on" | "off" | "auto") => void;
  onUninstall: (skillId: string) => void;
}

export function OmniSkillsList({
  skills,
  skillsTotal,
  skillsPage,
  skillsTotalPages,
  popularDefaults,
  searchTerm,
  modeFilter,
  selectedSkillId,
  onSearchTermChange,
  onModeFilterChange,
  onApplyFilters,
  onPagePrev,
  onPageNext,
  onSelectSkill,
  onSetMode,
  onUninstall,
}: OmniSkillsListProps): JSX.Element {
  const t = useTranslations("skills");

  const selectedSkill = selectedSkillId
    ? (skills.find((s) => s.id === selectedSkillId) ?? null)
    : null;

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Left: grid + filters */}
      <div className="col-span-12 lg:col-span-7 flex flex-col gap-4">
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
            <Input
              type="text"
              icon="search"
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              placeholder={t("filterSkillsPlaceholder")}
              aria-label={t("filterSkillsPlaceholder")}
            />
            <Select
              value={modeFilter}
              onChange={(e) => onModeFilterChange(e.target.value as "all" | "on" | "off" | "auto")}
              aria-label={t("allModes")}
            >
              <option value="all">{t("allModes")}</option>
              <option value="on">{t("onMode")}</option>
              <option value="auto">{t("autoMode")}</option>
              <option value="off">{t("offMode")}</option>
            </Select>
            <Button onClick={onApplyFilters}>{t("applyFilters")}</Button>
          </div>

          {popularDefaults.length > 0 && (
            <div className="mt-3">
              <p className="text-xs text-text-muted mb-2">{t("popularDefaultsLabel")}</p>
              <div className="flex flex-wrap gap-2">
                {popularDefaults.map((name) => (
                  <Badge key={name} variant="primary">
                    {name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </Card>

        {skills.length === 0 ? (
          <EmptyState icon="auto_fix_high" title={t("noSkills")} />
        ) : (
          <div className="flex flex-col gap-2">
            {skills.map((skill) => (
              <OmniSkillCard
                key={skill.id}
                skill={skill}
                selected={selectedSkillId === skill.id}
                onClick={() => onSelectSkill(skill.id)}
              />
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-sm text-text-muted">
            {t("pageInfo", {
              page: skillsPage,
              totalPages: skillsTotalPages,
              total: skillsTotal,
            })}
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onPagePrev} disabled={skillsPage === 1}>
              {t("previous")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onPageNext}
              disabled={skillsPage === skillsTotalPages || skillsTotalPages === 0}
            >
              {t("next")}
            </Button>
          </div>
        </div>
      </div>

      {/* Right: inspector pane */}
      <div className="col-span-12 lg:col-span-5">
        <div className="sticky top-4 rounded-xl border border-border bg-bg-subtle overflow-hidden min-h-[400px]">
          <SkillInspectorPane
            selectedSkillId={selectedSkillId}
            skill={selectedSkill}
            onSetMode={onSetMode}
            onUninstall={onUninstall}
          />
        </div>
      </div>
    </div>
  );
}

export default OmniSkillsList;
