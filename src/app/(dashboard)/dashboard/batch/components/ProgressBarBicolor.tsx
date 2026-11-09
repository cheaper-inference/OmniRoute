"use client";

import { useTranslations } from "next-intl";
import { Progress } from "@omniroute/ui-kit/progress";

interface Props {
  total: number;
  completed: number;
  failed: number;
  className?: string;
  showLabels?: boolean;
}

/** Batch progress: the kit `Progress` stacked as completed (success) + failed (danger). */
export default function ProgressBarBicolor({
  total,
  completed,
  failed,
  className = "",
  showLabels = false,
}: Props) {
  const t = useTranslations("common");
  const donePct = total > 0 ? (completed / total) * 100 : 0;
  const failedPct = total > 0 ? (failed / total) * 100 : 0;
  return (
    <div className={`space-y-1 ${className}`}>
      {showLabels && (
        <div className="flex items-center justify-between text-xs text-text-muted">
          <span>
            <span className="text-success">{completed}</span>
            {failed > 0 && (
              <span className="text-error">
                {" / "}
                {t("batchFailedCount", { count: failed })}
              </span>
            )}
            <span> / {total}</span>
          </span>
          <span>{Math.round(donePct + failedPct)}%</span>
        </div>
      )}
      <Progress
        aria-label={t("batchListTableProgress")}
        aria-valuetext={`${Math.round(donePct + failedPct)}%`}
        max={total > 0 ? total : 1}
        animate={false}
        segments={[
          { value: total > 0 ? completed : 0, tone: "success" },
          { value: total > 0 ? failed : 0, tone: "danger" },
        ]}
      />
    </div>
  );
}
