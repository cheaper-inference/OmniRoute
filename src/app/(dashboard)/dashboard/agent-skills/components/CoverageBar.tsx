"use client";

import { useTranslations } from "next-intl";
import { Progress, type ProgressTone } from "@omniroute/ui-kit/progress";
import type { SkillCoverage } from "@/lib/agentSkills/types";
import type { JSX } from "react";

interface CoverageBarProps {
  coverage: SkillCoverage;
}

function barTone(have: number, total: number): ProgressTone {
  const pct = total > 0 ? have / total : 0;
  if (pct >= 1) return "success";
  if (pct >= 0.75) return "warning";
  return "danger";
}

function CoverageRow({
  label,
  have,
  total,
}: {
  label: string;
  have: number;
  total: number;
}): JSX.Element {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="font-medium text-text-muted shrink-0">
        {label} {have}/{total}
      </span>
      <Progress
        className="flex-1"
        aria-label={`${label} ${have}/${total}`}
        value={have}
        max={total}
        tone={barTone(have, total)}
      />
      <span className="shrink-0 text-text-muted w-12 text-right">
        {total > 0 ? Math.round((have / total) * 100) : 0}%
      </span>
    </div>
  );
}

export function CoverageBar({ coverage }: CoverageBarProps): JSX.Element {
  const t = useTranslations("agentSkills");
  const { api, cli, config } = coverage;

  return (
    <div className="flex flex-col gap-2 text-xs" data-testid="coverage-bar">
      <CoverageRow label={t("categoryApi")} have={api.have} total={api.total} />
      <CoverageRow label={t("categoryConfig")} have={config.have} total={config.total} />
      <CoverageRow label={t("categoryCli")} have={cli.have} total={cli.total} />
    </div>
  );
}

export default CoverageBar;
