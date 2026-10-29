"use client";

import { useState, useEffect } from "react";
import { Badge, Card, Skeleton } from "@/shared/components";
import Icon from "@/shared/components/Icon";
import { useTranslations } from "next-intl";

interface CompressionStats {
  originalTokens: number;
  compressedTokens: number;
  savingsPercent: number;
  techniquesUsed: string[];
  mode: string;
  timestamp: number;
  rulesApplied?: string[];
  durationMs?: number;
}

interface LogEntry {
  id: string;
  timestamp: string;
  model: string;
  provider: string;
  compressionStats?: CompressionStats | null;
}

export default function CompressionLogTab() {
  const t = useTranslations("logs");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/logs?filter=compressed&limit=50")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        setLogs(Array.isArray(data) ? data : []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Card className="p-6" aria-busy="true">
        <span className="ci-sr-only">{t("loading")}</span>
        <Skeleton className="h-16 w-full" />
      </Card>
    );
  }

  if (logs.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Icon name="compress" size={20} className="text-info" />
          <h3 className="text-lg font-semibold">{t("compressionLogTitle")}</h3>
        </div>
        <p className="text-sm text-text-muted">{t("compressionLogEmpty")}</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-5">
        <Icon name="compress" size={20} className="text-info" />
        <h3 className="text-lg font-semibold">{t("compressionLogTitle")}</h3>
      </div>

      <div className="space-y-3">
        {logs.map((entry) => {
          const stats = entry.compressionStats;
          if (!stats) return null;

          return (
            <div
              key={entry.id}
              className="space-y-2 rounded-lg border border-border bg-bg-subtle p-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-mono text-text-main">
                    {entry.provider}/{entry.model}
                  </span>
                  <Badge size="sm" variant="info">
                    {stats.mode}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <span>
                    {stats.originalTokens} → {stats.compressedTokens} {t("tokens")}
                  </span>
                  <span
                    className={`font-medium ${
                      stats.savingsPercent >= 25
                        ? "text-success"
                        : stats.savingsPercent >= 10
                          ? "text-warning"
                          : "text-text-muted"
                    }`}
                  >
                    -{stats.savingsPercent.toFixed(1)}%
                  </span>
                  {stats.durationMs !== undefined && <span>{stats.durationMs}ms</span>}
                </div>
              </div>

              {stats.techniquesUsed.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {stats.techniquesUsed.map((technique) => (
                    <Badge key={technique} size="sm">
                      {technique}
                    </Badge>
                  ))}
                </div>
              )}

              {stats.rulesApplied && stats.rulesApplied.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {stats.rulesApplied.map((rule) => (
                    <Badge
                      key={rule}
                      size="sm"
                      className="border-chart-3/20 bg-chart-3/10 text-chart-3"
                    >
                      {rule.replace(/_/g, " ")}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
