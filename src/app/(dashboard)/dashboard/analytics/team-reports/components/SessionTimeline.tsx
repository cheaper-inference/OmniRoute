"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import type { AgentSessionTimeline } from "@/lib/db/agentSessionReportStats";
import { categoricalSlot } from "@/shared/utils/categoricalPalette";

import { formatLatency } from "./format";
import type { TimelineSeries } from "./SessionTimelineChart";

// recharts stays out of the report page's own bundle until a session is opened.
const SessionTimelineChart = dynamic(() => import("./SessionTimelineChart"), {
  ssr: false,
  loading: () => <div className="h-64" aria-hidden="true" />,
});

/** One series per model, the busiest first so its colour does not move when a page is opened. */
function toSeries(points: AgentSessionTimeline["points"], unknownLabel: string): TimelineSeries[] {
  const byModel = new Map<string, TimelineSeries["points"]>();
  for (const point of points) {
    const name = point.model ?? unknownLabel;
    const list = byModel.get(name) ?? [];
    list.push({
      t: Date.parse(point.timestamp),
      latencyMs: point.latencyMs,
      ok: point.ok,
      model: name,
    });
    byModel.set(name, list);
  }
  return [...byModel.entries()]
    .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
    .map(([name, list], index) => ({
      name,
      color: categoricalSlot(index).colorVar,
      points: list.filter((point) => Number.isFinite(point.t)),
    }));
}

/** Requests over time: one dot per request, coloured by model, latency up, failures as a cross. */
export default function SessionTimeline({ timeline }: { timeline: AgentSessionTimeline }) {
  const t = useTranslations("reports");
  const { points, capped } = timeline;
  if (points.length === 0) return null;

  const series = toSeries(points, t("unknown"));
  const failed = points.filter((point) => !point.ok).length;
  const slowest = Math.max(...points.map((point) => point.latencyMs));
  const summary = t("timelineSummary", {
    count: points.length,
    models: series.length,
    failed,
    slowest: formatLatency(slowest),
  });

  return (
    <section className="space-y-2" aria-label={t("timeline")}>
      <h4 className="font-semibold">{t("timeline")}</h4>
      <p className="text-xs text-text-muted">{t("timelineHelp")}</p>
      {capped && (
        <p role="note" className="text-xs text-warning">
          {t("timelineCapped", { count: points.length })}
        </p>
      )}
      <div
        role="img"
        aria-label={summary}
        className="h-64 w-full rounded-xl border border-border bg-surface-2 px-3 py-4"
      >
        <SessionTimelineChart series={series} />
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-muted">
        {series.map((entry) => (
          <li key={entry.name} className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="inline-block size-2.5 rounded-full"
              style={{ background: entry.color }}
            />
            <span className="font-mono">{entry.name}</span>
            <span className="tabular-nums">({entry.points.length})</span>
          </li>
        ))}
        {failed > 0 && (
          <li className="flex items-center gap-1.5 text-error">
            <span aria-hidden="true">×</span>
            {t("timelineFailed", { count: failed })}
          </li>
        )}
      </ul>
    </section>
  );
}
