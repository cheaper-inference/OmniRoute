"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import type { BreakerWithHistory } from "@/types/resilience";

interface BreakerTimelineProps {
  breakers: BreakerWithHistory[];
  onWindowChange: (ms: number) => void;
}

const WINDOWS = [
  { label: "1h", ms: 3600000 },
  { label: "6h", ms: 21600000 },
  { label: "24h", ms: 86400000 },
] as const;

export default function BreakerTimeline({ breakers, onWindowChange }: BreakerTimelineProps) {
  const t = useTranslations("resilienceConnections");
  const [selectedWindowMs, setSelectedWindowMs] = useState(3600000);

  const stateLabel = (state: string) => {
    const key = `timeline.state.${state.toLowerCase()}`;
    const label = t(key);
    return label === key ? state : label; // Fallback for unknown states
  };
  const reasonLabel = (reason?: string) => {
    if (!reason) return "";
    // Map known reasons; use prefix matching for parameterized reasons (e.g., "probe-failed (cycle 3)")
    const knownReasons = [
      "timeout-elapsed",
      "success-recovery",
      "manual-reset",
      "probe-success",
      "recovery",
      "probe-failed",
    ];
    const matched = knownReasons.find((r) => reason.startsWith(r));
    if (matched) {
      return t(`timeline.reason.${matched}`);
    }
    return reason; // Fallback: display raw reason string
  };

  // API already filters transitionHistory by windowMs; no client-side re-filter needed
  const filtered = breakers.filter((b) => b.transitionHistory.length > 0);
  // Current state: breakers that are OPEN/HALF_OPEN/DEGRADED even with no window transitions
  const currentBreakers = breakers.filter(
    (b) => b.state === "OPEN" || b.state === "HALF_OPEN" || b.state === "DEGRADED"
  );

  return (
    <Card className="flex flex-col gap-4">
      {currentBreakers.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="ci-heading text-sm">{t("timeline.currentState")}</h3>
          <div className="flex flex-wrap gap-2">
            {currentBreakers.map((b) => (
              <span key={b.name}>
                <Badge
                  variant={
                    b.state === "OPEN"
                      ? "error"
                      : b.state === "HALF_OPEN" || b.state === "DEGRADED"
                        ? "warning"
                        : "success"
                  }
                  size="sm"
                >
                  {b.name} ({b.state})
                </Badge>
              </span>
            ))}
          </div>
        </div>
      )}
      <div
        role="group"
        aria-labelledby="breaker-timeline-window"
        className="flex flex-wrap items-center gap-2"
      >
        <span id="breaker-timeline-window" className="mr-2 text-sm font-semibold">
          {t("timeline.window")}
        </span>
        {WINDOWS.map((w) => (
          <Button
            key={w.ms}
            size="sm"
            variant={selectedWindowMs === w.ms ? "primary" : "outline"}
            aria-pressed={selectedWindowMs === w.ms}
            onClick={() => {
              setSelectedWindowMs(w.ms);
              onWindowChange(w.ms);
            }}
          >
            {t(`timeline.window${w.label}`)}
          </Button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="text-sm text-text-muted">{t("timeline.empty")}</p>
      ) : (
        filtered.map((b) => (
          <div key={b.name} className="flex flex-col gap-2">
            <Badge
              variant={
                b.state === "OPEN"
                  ? "error"
                  : b.state === "HALF_OPEN"
                    ? "warning"
                    : b.state === "DEGRADED"
                      ? "warning"
                      : "success"
              }
              size="sm"
            >
              {b.name} ({stateLabel(b.state)})
            </Badge>
            <ul className="list-disc space-y-1 pl-5 text-sm text-text-muted">
              {b.transitionHistory.map((tr, i) => (
                <li key={`${tr.timestamp}-${tr.from}-${tr.to}-${i}`}>
                  {new Date(tr.timestamp).toLocaleString()}: {stateLabel(tr.from)} {"->"}{" "}
                  {stateLabel(tr.to)}
                  {tr.reason ? ` (${reasonLabel(tr.reason)})` : ""}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </Card>
  );
}
