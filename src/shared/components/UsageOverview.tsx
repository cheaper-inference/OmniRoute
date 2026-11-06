"use client";
import { useTranslations } from "next-intl";
import Card from "./Card";
import CachedInputTokens from "./CachedInputTokens";
import { fmtFull, fmtCost } from "@/shared/utils/formatting";

type OverviewStats = {
  totalRequests: number;
  totalPromptTokens: number;
  totalCompletionTokens: number;
  totalCost: number;
  totalCachedInputTokens?: number | null;
  totalCachedInputTokensComplete?: boolean;
  last10Minutes?: Array<{ requests: number; promptTokens: number }>;
};
function MiniBarGraph({
  data,
  colorClass = "bg-primary",
}: {
  data: number[];
  colorClass?: string;
}) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-1 h-8 w-24">
      {data.slice(-9).map((val, idx) => (
        <div
          key={`bar-${idx}-${val}`}
          className={`flex-1 rounded-t-sm transition-all duration-500 ${colorClass}`}
          style={{ height: `${Math.max((val / max) * 100, 5)}%` }}
          title={String(val)}
        />
      ))}
    </div>
  );
}

export default function UsageOverview({ stats }: { stats: OverviewStats }) {
  const t = useTranslations("stats");
  const fmt = fmtFull;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="px-4 py-3 flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="text-text-muted text-sm uppercase font-semibold">
              {t("totalRequests")}
            </span>
            <span className="text-2xl font-bold">{fmt(stats.totalRequests)}</span>
          </div>
          <MiniBarGraph
            data={(stats.last10Minutes || []).map((m) => m.requests)}
            colorClass="bg-text-muted/30"
          />
        </div>
      </Card>
      <Card className="px-4 py-3 flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="text-text-muted text-sm uppercase font-semibold">
              {t("totalInputTokens")}
            </span>
            <span className="text-2xl font-bold text-primary">{fmt(stats.totalPromptTokens)}</span>
            <CachedInputTokens
              value={stats.totalCachedInputTokens}
              complete={stats.totalCachedInputTokensComplete}
            />
          </div>
          <MiniBarGraph
            data={(stats.last10Minutes || []).map((m) => m.promptTokens)}
            colorClass="bg-primary/50"
          />
        </div>
      </Card>
      <Card className="px-4 py-2 flex flex-col gap-1">
        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col gap-1 flex-1">
            <span className="text-text-muted text-sm uppercase font-semibold">
              {t("outputTokens")}
            </span>
            <span className="text-2xl font-bold text-success">
              {fmt(stats.totalCompletionTokens)}
            </span>
          </div>
          <div className="w-px bg-border self-stretch mx-2" />
          <div className="flex flex-col gap-1 flex-1">
            <span className="text-text-muted text-sm uppercase font-semibold">
              {t("totalCost")}
            </span>
            <span className="text-2xl font-bold text-warning">{fmtCost(stats.totalCost)}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
