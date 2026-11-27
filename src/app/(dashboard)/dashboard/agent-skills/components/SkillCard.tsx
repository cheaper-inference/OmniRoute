"use client";

import { useCallback } from "react";
import { useTranslations } from "next-intl";
import Icon from "@/shared/components/Icon";
import Badge from "@/shared/components/Badge";
import type { AgentSkill } from "@/lib/agentSkills/types";
import type { JSX } from "react";
import { InlineCode } from "@omniroute/ui-kit/inline-code";
import IconChip from "@/shared/components/IconChip";

interface SkillCardProps {
  skill: AgentSkill;
  selected: boolean;
  onClick: () => void;
}

export function SkillCard({ skill, selected, onClick }: SkillCardProps): JSX.Element {
  const t = useTranslations("agentSkills");

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick();
      }
    },
    [onClick]
  );

  const previewItems: string[] =
    skill.category === "api"
      ? (skill.endpoints ?? []).slice(0, 2)
      : skill.category === "cli"
        ? (skill.cliCommands ?? []).slice(0, 2)
        : [];

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      data-testid={`skill-card-${skill.id}`}
      className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
        selected
          ? "border-primary/40 bg-primary/10"
          : "border-border bg-bg hover:bg-bg-subtle hover:border-border"
      }`}
    >
      <IconChip tone={selected ? "accent" : "neutral"} size="sm" className="shrink-0">
        <Icon name={skill.icon ?? "article"} />
      </IconChip>

      <div className="min-w-0 flex-1">
        <div className="mb-0.5 flex flex-wrap items-center gap-1.5">
          <span className="text-sm font-semibold text-text-main">{skill.name}</span>

          <Badge
            size="sm"
            variant={
              skill.category === "api" ? "info" : skill.category === "cli" ? "primary" : "success"
            }
            className="font-semibold uppercase tracking-wide"
          >
            {skill.category === "api"
              ? t("categoryApi")
              : skill.category === "cli"
                ? t("categoryCli")
                : t("categoryConfig")}
          </Badge>

          {skill.isEntry && (
            <Badge variant="primary" size="sm" className="font-semibold uppercase tracking-wide">
              start
            </Badge>
          )}

          {skill.isNew && (
            <Badge variant="warning" size="sm" className="font-semibold uppercase tracking-wide">
              new
            </Badge>
          )}
        </div>

        <p className="text-xs leading-relaxed text-text-muted line-clamp-2">{skill.description}</p>

        {previewItems.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {previewItems.map((item) => (
              <InlineCode key={item}>{item}</InlineCode>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SkillCard;
