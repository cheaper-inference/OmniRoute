"use client";

import { useTranslations } from "next-intl";
import Icon from "@/shared/components/Icon";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import { cn } from "@/shared/utils/cn";

export interface OmniSkill {
  id: string;
  name: string;
  version: string;
  description: string;
  enabled: boolean;
  mode?: "on" | "off" | "auto";
  sourceProvider?: "skillsmp" | "skillssh" | "local";
  tags?: string[];
  installCount?: number;
  createdAt: string;
}

interface OmniSkillCardProps {
  skill: OmniSkill;
  selected: boolean;
  onClick: () => void;
}

export function OmniSkillCard({ skill, selected, onClick }: OmniSkillCardProps): JSX.Element {
  const t = useTranslations("skills");
  const effectiveMode = skill.mode || (skill.enabled ? "on" : "off");

  const modeColor =
    effectiveMode === "on"
      ? "text-success"
      : effectiveMode === "auto"
        ? "text-warning"
        : "text-text-muted";

  const modeDot =
    effectiveMode === "on" ? "bg-success" : effectiveMode === "auto" ? "bg-warning" : "bg-border";

  return (
    <Button
      variant="outline"
      role="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "h-auto w-full justify-start whitespace-normal p-3 text-left font-normal",
        selected
          ? "border-primary bg-primary/10"
          : "border-border bg-bg-subtle hover:border-border/80 hover:bg-surface-2"
      )}
    >
      <div className="flex items-start gap-2">
        <div
          className={`flex items-center justify-center size-8 rounded-md shrink-0 ${
            selected ? "bg-primary/20" : "bg-surface-2"
          }`}
        >
          <Icon name="auto_fix_high" size={18} className="text-text-muted" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-sm font-semibold text-text-main truncate">{skill.name}</span>
            <Badge size="sm" className="shrink-0">
              v{skill.version}
            </Badge>
            <Badge size="sm" className="shrink-0">
              {(skill.sourceProvider || "local").toUpperCase()}
            </Badge>
          </div>
          <p className="text-xs text-text-muted mt-0.5 line-clamp-2">{skill.description}</p>
          {Array.isArray(skill.tags) && skill.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {skill.tags.slice(0, 3).map((tag) => (
                <Badge key={`${skill.id}-${tag}`} variant="primary" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className={`inline-block size-2 rounded-full ${modeDot}`} />
          <span className={`text-[10px] font-medium ${modeColor}`}>
            {t(
              effectiveMode === "on" ? "onMode" : effectiveMode === "auto" ? "autoMode" : "offMode"
            )}
          </span>
        </div>
      </div>
    </Button>
  );
}

export default OmniSkillCard;
