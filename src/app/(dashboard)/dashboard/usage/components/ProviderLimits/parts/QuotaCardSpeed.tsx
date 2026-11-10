"use client";

import { useTranslations } from "next-intl";
import { translateUsageOrFallback } from "../i18nFallback";
import { buildSpeedLines } from "../formatters";
import Icon from "@/shared/components/Icon";

/** Compact per-model decode-speed lines (tok/s, TTFT) under a quota card's rows. */
export default function QuotaCardSpeed({ speed }: { speed: unknown }) {
  const t = useTranslations("usage");
  const lines = buildSpeedLines(speed);
  if (lines.length === 0) return null;
  const count = Number((speed as { samples?: unknown }).samples) || 0;

  return (
    <div
      className="flex items-start gap-1 border-t border-border/40 pt-1.5 text-[10px] leading-relaxed text-text-muted tabular-nums"
      title={translateUsageOrFallback(
        t,
        "quotaSpeedTitle",
        `Recent decode speed on this account (last ${count} successful requests)`,
        { count }
      )}
    >
      <Icon name="speed" size={12} />
      <div className="min-w-0">
        {lines.map((line) => {
          const values = {
            model: line.model,
            avg: line.avg.toLocaleString(),
            last: line.last.toLocaleString(),
            samples: line.samples,
          };
          const text =
            line.ttft === null
              ? translateUsageOrFallback(
                  t,
                  "quotaSpeedLineNoTtft",
                  `${values.model}: ${values.avg} tok/s avg · last ${values.last} (n=${values.samples})`,
                  values
                )
              : translateUsageOrFallback(
                  t,
                  "quotaSpeedLine",
                  `${values.model}: ${values.avg} tok/s avg · last ${values.last} · TTFT ${line.ttft}s (n=${values.samples})`,
                  { ...values, ttft: line.ttft }
                );
          return (
            <p key={line.model} className="truncate" title={text}>
              {text}
            </p>
          );
        })}
      </div>
    </div>
  );
}
