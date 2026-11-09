"use client";

import { useId } from "react";
import { useTranslations } from "next-intl";
import Card from "../Card";
import Icon from "../Icon";
import AnimatedNumber from "../AnimatedNumber";
import Tooltip from "../Tooltip";
import { fmtCompact, fmtFull } from "@/shared/utils/formatting";
import {
  getAnalyticsTokenBreakdown,
  type AnalyticsTokenSummary,
} from "@/shared/utils/analyticsTokenBreakdown";

export default function TokenBreakdownCards({
  summary,
  displayMode,
}: {
  summary: AnalyticsTokenSummary;
  displayMode: "compact" | "exact";
}) {
  const t = useTranslations("analytics");
  const stats = useTranslations("stats");
  const common = useTranslations("common");
  const skills = useTranslations("agentSkills");
  const id = useId();
  const tokens = getAnalyticsTokenBreakdown(summary);
  const partial = `+ (${skills("coverageBar.partial")})`;
  const cards = [
    {
      key: "total",
      label: t("totalTokens"),
      icon: "generating_tokens",
      value: tokens.totalTokens,
      hint: `${stats("totalInputTokens")} + ${t("outputTokens")}`,
    },
    {
      key: "total-input",
      label: stats("totalInputTokens"),
      icon: "input",
      value: tokens.totalInputTokens,
      hint: `${t("inputTokens")} + ${t("cachedInputTokens")}`,
    },
    {
      key: "input",
      label: t("inputTokens"),
      icon: "input",
      value: tokens.inputTokens,
      hint: tokens.inputTokens === null ? t("inputSplitUnavailable") : t("inputTokensHint"),
    },
    {
      key: "cached-input",
      label: t("cachedInputTokens"),
      icon: "cached",
      value: tokens.cachedInputTokens,
      hint: t("cachedInputTokensHint"),
      suffix: tokens.cachedInputTokens !== null && !tokens.cacheComplete ? partial : "",
    },
    {
      key: "output",
      label: t("outputTokens"),
      icon: "output",
      value: tokens.outputTokens,
      hint: "",
    },
  ];

  return cards.map(({ key, label, icon, value, hint, suffix = "" }) => {
    const labelId = `${id}-${key}-label`;
    const hintId = `${id}-${key}-hint`;
    const text = value === null ? common("noData") : `${fmtFull(value)}${suffix}`;
    return (
      <Card key={key} role="group" aria-labelledby={labelId} className="px-4 py-3 min-w-0">
        <dl className="flex flex-col gap-1">
          <dt
            id={labelId}
            className="flex items-start gap-1.5 text-text-muted text-[11px] uppercase font-semibold tracking-wide"
          >
            <Icon name={icon} size={14} />
            <span>{label}</span>
          </dt>
          <dd aria-describedby={hint ? hintId : undefined}>
            <Tooltip content={text}>
              <span
                tabIndex={0}
                aria-label={text}
                className="block text-2xl font-bold text-text-main break-words"
              >
                <span aria-hidden="true">
                  {value === null ? (
                    common("noData")
                  ) : (
                    <AnimatedNumber
                      value={value}
                      format={displayMode === "exact" ? fmtFull : fmtCompact}
                    />
                  )}
                  {suffix && <span className="text-xs font-normal">{suffix}</span>}
                </span>
              </span>
            </Tooltip>
          </dd>
        </dl>
        {key === "total" && summary.totalRequests != null && (
          <p className="mt-1 text-xs text-text-muted">
            {fmtFull(summary.totalRequests)} {t("chartRequests")}
          </p>
        )}
        {hint && (
          <p id={hintId} className="mt-1 text-xs text-text-muted">
            {hint}
          </p>
        )}
      </Card>
    );
  });
}
