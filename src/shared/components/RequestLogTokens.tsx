"use client";
import { Fragment } from "react";
import { useTranslations } from "next-intl";
import type { UsageEvidence } from "@/lib/usage/usageEvidence";
import { formatUsageCounter } from "@/shared/utils/usageDisplay";
type TokenLog = {
  tokens?: {
    in?: number;
    out?: number;
    cacheRead?: number | null;
    cacheWrite?: number | null;
    compressed?: number;
  };
  usageEvidence?: UsageEvidence | null;
};
/** One evidence label per counter; wire placeholders never imply a cache miss. */
export default function RequestLogTokens({ log }: { log: TokenLog }) {
  const t = useTranslations("common.usageEvidence");
  const cache = useTranslations("cache");
  const detail = useTranslations("requestLogger.detail");
  const counters = [
    {
      short: "TI",
      label: detail("input"),
      value: log.tokens?.in,
      evidence: log.usageEvidence?.input,
      color: "text-primary",
    },
    {
      short: "TO",
      label: detail("output"),
      value: log.tokens?.out,
      evidence: log.usageEvidence?.output,
      color: "text-success",
    },
    {
      short: "CR",
      label: cache("cachedTokensCol"),
      value: log.tokens?.cacheRead,
      evidence: log.usageEvidence?.cacheRead,
      color: "text-info",
    },
    {
      short: "CW",
      label: cache("cacheCreation"),
      value: log.tokens?.cacheWrite,
      evidence: log.usageEvidence?.cacheCreation,
      color: "text-warning",
    },
  ];
  return (
    <>
      {counters.map((counter, index) => {
        const value = formatUsageCounter(counter.value, counter.evidence, t);
        return (
          <Fragment key={counter.short}>
            {index > 0 && (
              <span className="mx-1 text-border" aria-hidden="true">
                |
              </span>
            )}
            <span aria-label={`${counter.label}: ${value}`}>
              <span className="text-text-muted">{counter.short}:</span>{" "}
              <span className={counter.color} title={counter.label}>
                {value}
              </span>
            </span>
          </Fragment>
        );
      })}
      {log.tokens?.compressed != null && log.tokens.compressed > 0 && (
        <>
          <span className="mx-1 text-border" aria-hidden="true">
            |
          </span>
          <span
            className="font-semibold text-chart-3"
            title={`${log.tokens.compressed.toLocaleString()} tokens compressed`}
          >
            ↓{log.tokens.compressed.toLocaleString()}
          </span>
        </>
      )}
    </>
  );
}
