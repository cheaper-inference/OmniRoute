"use client";
import UsageEvidenceNotice from "./UsageEvidenceNotice";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import Card from "./Card";
import CachedInputTokens from "./CachedInputTokens";
import { fmtFull, fmtCost } from "@/shared/utils/formatting";

type OverviewStats = {
  estimated?: boolean;
  unknownEvidence?: boolean;
  totalRequests: number;
  totalPromptTokens: number;
  totalCompletionTokens: number;
  totalCost: number;
  totalCachedInputTokens?: number | null;
  totalCachedInputTokensComplete?: boolean;
  last10Minutes?: Array<{ requests: number; promptTokens: number }>;
};
// The kit sparkline draws with recharts, which loads on demand (client only).
const Sparkline = dynamic(
  () => import("@omniroute/ui-kit/reporting-charts").then((m) => m.Sparkline),
  { ssr: false, loading: () => <div aria-hidden="true" className="h-8" /> }
);

/** The last nine per-minute values as the kit bar sparkline, named for assistive tech. */
function MiniBarGraph({
  data,
  ariaLabel,
  color,
}: {
  data: number[];
  /** Receives the plotted values, already joined, and returns the translated name. */
  ariaLabel: (values: string) => string;
  /** Bar colour: the same tints the hand-made bars had. */
  color: string;
}) {
  const values = data.slice(-9);
  return (
    <Sparkline
      variant="bar"
      height={32}
      values={values}
      ariaLabel={ariaLabel(values.join(", "))}
      color={color}
      className="w-24 shrink-0"
    />
  );
}

export default function UsageOverview({ stats }: { stats: OverviewStats }) {
  const t = useTranslations("stats");
  const fmt = fmtFull;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-3">
        <UsageEvidenceNotice estimated={stats.estimated} unknownEvidence={stats.unknownEvidence} />
      </div>
      <Card className="px-4 py-3 flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="text-text-muted text-sm uppercase font-semibold">
              {t("totalRequests")}
            </span>
            <span className="text-2xl font-semibold">{fmt(stats.totalRequests)}</span>
          </div>
          <MiniBarGraph
            data={(stats.last10Minutes || []).map((m) => m.requests)}
            ariaLabel={(values) => t("requestsPerMinuteTrend", { values })}
            color="color-mix(in oklab, var(--color-text-muted) 30%, transparent)"
          />
        </div>
      </Card>
      <Card className="px-4 py-3 flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="text-text-muted text-sm uppercase font-semibold">
              {t("totalInputTokens")}
            </span>
            <span className="text-2xl font-semibold text-primary">
              {fmt(stats.totalPromptTokens)}
            </span>
            <CachedInputTokens
              value={stats.totalCachedInputTokens}
              complete={stats.totalCachedInputTokensComplete}
            />
          </div>
          <MiniBarGraph
            data={(stats.last10Minutes || []).map((m) => m.promptTokens)}
            ariaLabel={(values) => t("inputTokensPerMinuteTrend", { values })}
            color="color-mix(in oklab, var(--color-primary) 50%, transparent)"
          />
        </div>
      </Card>
      <Card className="px-4 py-2 flex flex-col gap-1">
        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col gap-1 flex-1">
            <span className="text-text-muted text-sm uppercase font-semibold">
              {t("outputTokens")}
            </span>
            <span className="text-2xl font-semibold text-success">
              {fmt(stats.totalCompletionTokens)}
            </span>
          </div>
          <div className="w-px bg-border self-stretch mx-2" />
          <div className="flex flex-col gap-1 flex-1">
            <span className="text-text-muted text-sm uppercase font-semibold">
              {t("totalCost")}
            </span>
            <span className="text-2xl font-semibold text-warning">{fmtCost(stats.totalCost)}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
