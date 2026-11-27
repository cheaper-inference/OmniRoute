"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Progress } from "@omniroute/ui-kit/progress";
import { RadialMeter } from "@omniroute/ui-kit/radial-meter";

import Icon from "@/shared/components/Icon";
import Badge from "@/shared/components/Badge";
import { Card } from "@/shared/components";

interface DiversityProviderStat {
  share: number;
}

interface DiversityReport {
  score: number;
  providers: Record<string, DiversityProviderStat>;
  windowSize: number;
  ttlMs: number;
}

export default function DiversityScoreCard() {
  const t = useTranslations("analytics");
  const [data, setData] = useState<DiversityReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadDiversity() {
      try {
        const res = await fetch("/api/analytics/diversity");
        if (!res.ok) {
          throw new Error(`Failed to fetch diversity analytics: ${res.status}`);
        }

        const json = (await res.json()) as DiversityReport;
        if (!cancelled) {
          setData(json);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadDiversity();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading || !data) {
    return (
      <Card className="p-5 flex flex-col justify-center items-center min-h-[220px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </Card>
    );
  }

  const scorePercentage = Math.round((data.score || 0) * 100);

  let riskColor = "text-success";
  let riskTone: "success" | "warning" | "danger" = "success";
  let riskLabel = t("diversityHealthy");

  if (scorePercentage < 40) {
    riskColor = "text-error";
    riskTone = "danger";
    riskLabel = t("diversityRiskHigh");
  } else if (scorePercentage < 70) {
    riskColor = "text-warning";
    riskTone = "warning";
    riskLabel = t("diversityRiskModerate");
  }

  const providerEntries = Object.entries(data.providers || {})
    .sort(([, a], [, b]) => b.share - a.share)
    .slice(0, 4);

  return (
    <Card className="p-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Icon name="pie_chart" size={20} className="text-primary" />
          <h3 className="text-text-main">{t("diversityScoreTitle")}</h3>
          <span className="text-xs text-text-muted hidden sm:inline">
            — {t("diversityScoreDesc")}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-text-muted hidden md:inline">
            {t("diversityWindow", {
              count: data.windowSize,
              mins: Math.round(data.ttlMs / 60000),
            })}
          </span>
          <Badge
            variant={scorePercentage < 40 ? "error" : scorePercentage < 70 ? "warning" : "success"}
            className="shrink-0"
          >
            {t("diversityShannonEntropy")}
          </Badge>
        </div>
      </div>

      {/* Horizontal layout: gauge + risk label + provider bars */}
      <div className="flex flex-col sm:flex-row items-center gap-5">
        {/* Gauge */}
        <RadialMeter
          value={scorePercentage}
          tone={riskTone}
          label={t("diversityScoreLabel")}
          className="shrink-0"
        />

        {/* Risk label */}
        <div className="shrink-0 text-center sm:text-left">
          <div className={`text-sm font-medium ${riskColor}`}>{riskLabel}</div>
          <div className="text-xs text-text-muted mt-0.5 max-w-[200px]">
            {t("diversityHigherExplanation")}
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-14 bg-border/30 shrink-0" />

        {/* Provider bars */}
        <div className="flex-1 min-w-0 w-full">
          {providerEntries.length === 0 ? (
            <div className="text-sm text-text-muted text-center py-2">{t("diversityNoData")}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              {providerEntries.map(([provider, stat]) => (
                <div key={provider} className="space-y-1">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium text-text-main capitalize truncate">
                      {provider}
                    </span>
                    <span className="tabular-nums text-text-muted shrink-0">
                      {Math.round(stat.share * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={stat.share * 100}
                    size="sm"
                    tone={riskTone}
                    animate={false}
                    aria-label={provider}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
