"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import Button from "@/shared/components/Button";
import { fmtFull } from "@/shared/utils/formatting";
import type { TrafficCounters, TrafficItem } from "@/lib/db/proxyTraffic";

type TrafficReport = {
  items: TrafficItem[];
  total: TrafficCounters;
  proxied: TrafficCounters;
  direct: TrafficCounters;
  unattributed: TrafficCounters;
  persistenceIncomplete: boolean;
};

export default function ProxyTrafficPanel() {
  const t = useTranslations("settings.proxyTraffic");
  const [report, setReport] = useState<TrafficReport | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/settings/proxies/traffic", { signal: controller.signal, cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Payload traffic unavailable");
        return response.json() as Promise<TrafficReport>;
      })
      .then((data) => {
        if (!controller.signal.aborted) setReport(data);
      })
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [revision]);

  return (
    <section
      className="rounded-lg border border-border bg-bg-secondary p-4 space-y-3"
      aria-labelledby="proxy-traffic-heading"
      aria-busy={loading}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 id="proxy-traffic-heading" className="text-sm font-semibold text-text">
          {t("title")}
        </h3>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={loading}
          onClick={() => {
            setLoading(true);
            setError(false);
            setRevision((value) => value + 1);
          }}
        >
          {t("refresh")}
        </Button>
      </div>
      <p className="text-xs text-text-muted">{t("description")}</p>
      <p className="text-xs text-text-muted">{t("coverageNote")}</p>
      {report?.persistenceIncomplete && (
        <p role="alert" className="text-sm text-text">
          {t("persistenceIncomplete")}
        </p>
      )}
      {error ? (
        <p role="alert" className="text-sm text-text">
          {t("error")}
        </p>
      ) : !report ? (
        <p role="status" className="text-sm text-text-muted">
          {t("loading")}
        </p>
      ) : report.items.length === 0 ? (
        <p className="text-sm text-text-muted">{t("empty")}</p>
      ) : (
        <TrafficTable report={report} />
      )}
    </section>
  );
}

function TrafficTable({ report }: { report: TrafficReport }) {
  const t = useTranslations("settings.proxyTraffic");
  const rows = [
    { key: "overall", name: t("overall"), ...report.total },
    { key: "proxied", name: t("proxied"), ...report.proxied },
    ...report.items.map((item) => ({
      ...item,
      name:
        item.kind === "direct"
          ? t("direct")
          : item.kind === "unattributed"
            ? t("unattributed")
            : (item.name ??
              (item.kind === "registry"
                ? t("removed", { id: item.proxyId ?? "" })
                : t("legacy", { id: item.key.slice(-8) }))),
    })),
  ];

  return (
    <Table persistentScrollbars={false}>
      <TableCaption className="sr-only">{t("title")}</TableCaption>
      <TableHeader>
        <TableRow>
          {[
            "route",
            "upload",
            "download",
            "attempts",
            "knownUpload",
            "completed",
            "failed",
            "cancelled",
            "errored",
          ].map((key) => (
            <TableHead key={key} scope="col">
              {t(key)}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.key}>
            <TableHead scope="row" className="font-medium text-text">
              {row.name}
            </TableHead>
            <TableCell className="tabular-nums">{fmtFull(row.uploadBytes)} B</TableCell>
            <TableCell className="tabular-nums">{fmtFull(row.downloadBytes)} B</TableCell>
            <TableCell className="tabular-nums">{fmtFull(row.attempts)}</TableCell>
            <TableCell className="tabular-nums">
              {fmtFull(row.knownUploadAttempts)} / {fmtFull(row.attempts)}
            </TableCell>
            <TableCell className="tabular-nums">
              {fmtFull(row.completedDownloads)} / {fmtFull(row.attempts)}
            </TableCell>
            <TableCell className="tabular-nums">{fmtFull(row.failedAttempts)}</TableCell>
            <TableCell className="tabular-nums">{fmtFull(row.cancelledDownloads)}</TableCell>
            <TableCell className="tabular-nums">{fmtFull(row.erroredDownloads)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
