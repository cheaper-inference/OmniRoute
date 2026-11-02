"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import Icon from "./Icon";

export interface SkillsConceptCardProps {
  variant: "agent" | "omni";
  className?: string;
}

const COMPARISON_ROWS = ["whatIs", "direction", "executor", "storage", "tagline"] as const;
type ComparisonRow = (typeof COMPARISON_ROWS)[number];

export function SkillsConceptCard({
  variant,
  className = "",
}: SkillsConceptCardProps): JSX.Element {
  const t = useTranslations("agentSkills");

  const crossLinkHref = variant === "agent" ? "/dashboard/omni-skills" : "/dashboard/agent-skills";

  const title = t(`conceptCard.${variant}.title`);
  const crossLinkLabel = t(`conceptCard.${variant}.crossLinkLabel`);

  const agentIcon = "share";
  const omniIcon = "auto_fix_high";
  const icon = variant === "agent" ? agentIcon : omniIcon;

  return (
    <div
      data-testid={`skills-concept-card-${variant}`}
      className={`rounded-xl border border-border bg-bg-subtle p-4 ${className}`}
    >
      {/* Header row */}
      <div className="flex items-start gap-4 mb-4">
        <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 shrink-0">
          <Icon name={icon} size={20} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-text-main">{title}</h3>
        </div>
        <Link
          href={crossLinkHref}
          className="shrink-0 flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors whitespace-nowrap"
        >
          {crossLinkLabel}
          <Icon name="arrow_forward" size={14} />
        </Link>
      </div>

      {/* Comparison table */}
      <div className="rounded-lg border border-border overflow-hidden">
        {/* Column headers */}
        <div className="grid grid-cols-3 bg-bg-subtle border-b border-border">
          <div className="px-3 py-2" />
          <div className="px-3 py-2 text-xs font-semibold text-text-muted border-l border-border">
            {t("conceptCard.comparison.colAgent")}
          </div>
          <div className="px-3 py-2 text-xs font-semibold text-text-muted border-l border-border">
            {t("conceptCard.comparison.colOmni")}
          </div>
        </div>

        {/* Rows */}
        {COMPARISON_ROWS.map((row: ComparisonRow, i) => (
          <div
            key={row}
            data-testid={`comparison-row-${row}`}
            className={`grid grid-cols-3 ${i < COMPARISON_ROWS.length - 1 ? "border-b border-border" : ""}`}
          >
            <div className="px-3 py-2 text-xs font-medium text-text-muted bg-bg-subtle/50">
              {t(`conceptCard.comparison.${row}.label`)}
            </div>
            <div className="px-3 py-2 text-xs text-text-main border-l border-border">
              {t(`conceptCard.comparison.${row}.agent`)}
            </div>
            <div className="px-3 py-2 text-xs text-text-main border-l border-border">
              {t(`conceptCard.comparison.${row}.omni`)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsConceptCard;
