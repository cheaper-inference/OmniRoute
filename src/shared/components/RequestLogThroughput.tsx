"use client";

import { useTranslations } from "next-intl";
import { formatDuration } from "@/shared/utils/formatting";
import { buildLogTpsTitle, computeLogE2eTps, computeLogTps } from "@/shared/utils/logTps";

type ThroughputLog = {
  duration?: number | null;
  ttft?: number | null;
  tokens?: { out?: number | null; reasoning?: number | null };
};

function formatRate(rate: number): string {
  if (rate <= 0) return "—";
  return rate >= 100 ? Math.round(rate).toLocaleString() : rate.toFixed(1);
}

/** Both rates share a numerator; only the observed delivery window changes. */
export default function RequestLogThroughput({ log }: { log: ThroughputLog }) {
  const t = useTranslations("requestLogger");
  const generation = computeLogTps(log.tokens?.out, log.tokens?.reasoning, log.duration, log.ttft);
  const e2e = computeLogE2eTps(log.tokens?.out, log.tokens?.reasoning, log.duration);
  const generationLabel = t("throughputPostFirstToken");
  const e2eLabel = t("throughputEndToEnd");
  const generationValue = t("throughputRate", { value: formatRate(generation) });
  const e2eValue = t("throughputRate", { value: formatRate(e2e) });
  const timing = generation > 0 ? buildLogTpsTitle(log, generation, formatDuration) : "";
  const description = `${generationLabel}: ${generationValue}. ${e2eLabel}: ${e2eValue}. ${t("throughputExplanation")} ${timing}`;
  const color =
    generation <= 0
      ? "text-text-muted"
      : generation >= 80
        ? "text-success"
        : generation >= 30
          ? "text-info"
          : "text-warning";
  return (
    <span
      role="group"
      tabIndex={0}
      aria-label={description}
      title={description}
      className="inline-flex flex-col gap-0.5 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
    >
      <span className={color}>
        <span className="text-[10px] text-text-muted">{generationLabel}: </span>
        {generationValue}
      </span>
      <span className="text-text-muted">
        <span className="text-[10px]">{e2eLabel}: </span>
        {e2eValue}
      </span>
    </span>
  );
}
