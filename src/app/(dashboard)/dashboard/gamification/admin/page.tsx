"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { PageHeader, SectionHeader } from "@omniroute/ui-kit/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import { Card } from "@/shared/components";
import Badge from "@/shared/components/Badge";

interface Anomaly {
  apiKeyId: string;
  xpLastHour: number;
  zScore: number;
}

export default function GamificationAdminPage() {
  const t = useTranslations("common");
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnomalies = async () => {
      try {
        const res = await fetch("/api/gamification/anomalies");
        const data = await res.json();
        setAnomalies(data.anomalies || []);
      } catch {
        // ignore fetch errors
      } finally {
        setLoading(false);
      }
    };
    fetchAnomalies();
    const interval = setInterval(fetchAnomalies, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        compact
        title={t("gamificationAdmin")}
        description={t("monitorAnomaliesAndHealth")}
      />

      <Card>
        <SectionHeader className="mb-3" title={t("flaggedAnomalies")} />
        {loading ? (
          <div className="text-text-muted" role="status" aria-live="polite" aria-busy="true">
            {t("loading")}
          </div>
        ) : anomalies.length === 0 ? (
          <div className="text-text-muted" role="status" aria-live="polite">
            {t("noAnomaliesDetected")}
          </div>
        ) : (
          <Table className="min-w-0" scrollbarLabel={t("flaggedAnomalies")}>
            <TableHeader>
              <TableRow>
                <TableHead>{t("apiKey")}</TableHead>
                <TableHead className="text-right">{t("xpLastHour")}</TableHead>
                <TableHead className="text-right">{t("zScore")}</TableHead>
                <TableHead className="text-center">{t("status")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {anomalies.map((a) => (
                <TableRow key={a.apiKeyId}>
                  <TableCell className="font-mono text-xs">{a.apiKeyId.slice(0, 16)}...</TableCell>
                  <TableCell className="text-right">{a.xpLastHour.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-error">{a.zScore.toFixed(2)}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="error" size="sm">
                      {t("suspicious")}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
