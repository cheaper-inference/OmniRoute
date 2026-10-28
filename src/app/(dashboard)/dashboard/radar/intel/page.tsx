"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";

import type { RadarIntelFeed } from "@/lib/radar/intelFeedSchema";
import { Card } from "@/shared/components";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";

interface IntelMeta {
  version: string;
  tier: "live";
  fetchedAt: string;
  supporterVerified: true;
}

export default function RadarIntelPage() {
  const t = useTranslations("radarIntelPage");
  const [intel, setIntel] = useState<RadarIntelFeed | null>(null);
  const [meta, setMeta] = useState<IntelMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [flagOff, setFlagOff] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const response = await fetch("/api/radar/intel");
    if (response.status === 404) {
      setFlagOff(true);
      return;
    }
    if (!response.ok) throw new Error("intel_load_failed");
    const body = (await response.json()) as {
      intel?: RadarIntelFeed | null;
      meta?: IntelMeta | null;
    };
    setIntel(body.intel ?? null);
    setMeta(body.meta ?? null);
  }, []);

  const sync = useCallback(async () => {
    setSyncing(true);
    setError("");
    try {
      const response = await fetch("/api/radar/intel/sync", { method: "POST" });
      if (response.status === 404) {
        setFlagOff(true);
        return;
      }
      if (!response.ok) throw new Error("intel_sync_failed");
      const status = (await response.json()) as { status?: string };
      if (
        ["error", "invalid_signature", "invalid_schema", "wrong_tier", "too_large"].includes(
          status.status ?? ""
        )
      ) {
        setError(t("loadFailed"));
      }
      await load();
    } catch {
      setError(t("loadFailed"));
      await load().catch(() => undefined);
    } finally {
      setSyncing(false);
    }
  }, [load, t]);

  useEffect(() => {
    void (async () => {
      try {
        await load();
      } catch {
        setError(t("loadFailed"));
      } finally {
        setLoading(false);
      }
    })();
  }, [load, t]);

  if (flagOff) notFound();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        compact
        breadcrumbs={
          <Link
            href="/dashboard/radar"
            className="text-sm text-text-muted hover:text-text-main transition-colors"
          >
            ← {t("backToRadar")}
          </Link>
        }
        title={t("title")}
        description={t("subtitle")}
        actions={
          <div className="flex items-center gap-2">
            {meta?.supporterVerified === true && (
              <Badge variant="primary" data-badge-id="radar-supporter">
                {t("supporterBadge")}
              </Badge>
            )}
            <Button variant="outline" onClick={() => void sync()} disabled={syncing}>
              {syncing ? t("syncing") : t("refresh")}
            </Button>
          </div>
        }
      />

      {error && <div className="rounded-lg bg-error/10 p-3 text-sm text-error">{error}</div>}

      {loading ? (
        <div className="flex min-h-48 items-center justify-center text-text-muted">
          {t("loading")}
        </div>
      ) : !intel || !meta ? (
        <Card>
          <p className="py-8 text-center text-text-muted">{t("empty")}</p>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <p className="text-xs uppercase tracking-wide text-text-muted">{t("methodology")}</p>
              <p className="mt-2 font-semibold">
                {t("eloMethod", {
                  initial: intel.methodology.initialRating,
                  factor: intel.methodology.kFactor,
                })}
              </p>
            </Card>
            <Card>
              <p className="text-xs uppercase tracking-wide text-text-muted">{t("freshness")}</p>
              <p className="mt-2 font-semibold">
                {t(`freshnessValues.${intel.catalog.freshness}`)}
              </p>
              <p className="mt-1 text-sm text-text-muted">
                {t("ageDays", { days: intel.catalog.ageDays })}
              </p>
            </Card>
            <Card>
              <p className="text-xs uppercase tracking-wide text-text-muted">{t("trend")}</p>
              <p className="mt-2 font-semibold">{t(`trendValues.${intel.catalog.trend}`)}</p>
              <p className="mt-1 text-sm text-text-muted">
                {t("modelDelta", {
                  current: intel.catalog.models.current,
                  added: intel.catalog.models.added,
                  removed: intel.catalog.models.removed,
                })}
              </p>
            </Card>
          </div>

          <Card>
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">{t("ranking")}</h2>
              <span className="text-xs text-text-muted">{meta.version}</span>
            </div>
            {intel.rankings.length === 0 ? (
              <p className="py-6 text-center text-text-muted">{t("noRankings")}</p>
            ) : (
              <Table className="text-sm" aria-label={t("ranking")} scrollbarLabel={t("ranking")}>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>{t("model")}</TableHead>
                    <TableHead>{t("category")}</TableHead>
                    <TableHead className="text-right">{t("rating")}</TableHead>
                    <TableHead className="text-right">{t("matches")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {intel.rankings.map((ranking) => (
                    <TableRow key={`${ranking.category}:${ranking.provider}:${ranking.modelId}`}>
                      <TableCell>{ranking.rank}</TableCell>
                      <TableCell className="font-mono">
                        {ranking.provider}/{ranking.modelId}
                      </TableCell>
                      <TableCell>{ranking.category}</TableCell>
                      <TableCell className="text-right">{ranking.rating}</TableCell>
                      <TableCell className="text-right">{ranking.matches}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Card>
        </>
      )}
    </div>
  );
}
