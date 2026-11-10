"use client";

import Link from "next/link";
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
import { Button } from "@/shared/components";
import { BankedResetSection } from "./BankedResetAutoApplyFields";
import {
  connectionLabel,
  useBankedResetHistory,
  type BankedResetConnection,
  type BankedResetHistoryEntry,
} from "./useBankedResetAutoApply";

const CREDIT_TYPE_KEYS: Record<string, string> = {
  codexCredits: "bankedResetAutoApplyCreditCodex",
  claudeCredits: "bankedResetAutoApplyCreditClaude",
  claudeSessionReset: "bankedResetAutoApplyCreditClaudeSession",
};
const TRIGGER_KEYS: Record<string, string> = {
  "walled-session": "bankedResetAutoApplyTriggerSession",
  "walled-weekly": "bankedResetAutoApplyTriggerWeekly",
  "expiring-credit": "bankedResetAutoApplyTriggerExpiring",
};
const RESULT_KEYS: Record<string, string> = {
  success: "bankedResetAutoApplyResultSuccess",
  failed: "bankedResetAutoApplyResultFailed",
  "dry-run": "bankedResetAutoApplyResultDryRun",
  unknown: "bankedResetAutoApplyResultUnknown",
};

const RESULT_CLASS: Record<string, string> = {
  success: "text-success",
  failed: "text-error",
  "dry-run": "text-text-muted",
  unknown: "text-warning",
};

function formatTime(timestamp: string): string {
  const ms = Date.parse(timestamp);
  return Number.isFinite(ms) ? new Date(ms).toLocaleString() : timestamp;
}

/** The translated label for a known value, else the raw value, else "-". */
function translatedOrRaw(
  t: (key: string) => string,
  keys: Record<string, string>,
  value: string | null
): string {
  if (value && keys[value]) return t(keys[value]);
  return value ?? "-";
}

function HistoryRow({
  entry,
  labels,
}: {
  entry: BankedResetHistoryEntry;
  labels: Map<string, string>;
}) {
  const t = useTranslations("settings");
  const account = entry.connectionId ? (labels.get(entry.connectionId) ?? entry.connectionId) : "-";
  const status = entry.status ?? "";
  return (
    <TableRow className="border-b border-border/50 align-top">
      <TableCell className="py-1.5 pe-3 whitespace-nowrap">{formatTime(entry.timestamp)}</TableCell>
      <TableCell className="max-w-[14rem] truncate py-1.5 pe-3 font-mono" title={account}>
        {account}
      </TableCell>
      <TableCell className="py-1.5 pe-3">
        {translatedOrRaw(t, CREDIT_TYPE_KEYS, entry.creditType)}
      </TableCell>
      <TableCell className="py-1.5 pe-3">
        {translatedOrRaw(t, TRIGGER_KEYS, entry.trigger)}
        {entry.reason ? (
          <span className="block font-mono text-xs text-text-muted">{entry.reason}</span>
        ) : null}
      </TableCell>
      <TableCell className={`py-1.5 font-medium ${RESULT_CLASS[status] ?? "text-text-muted"}`}>
        {translatedOrRaw(t, RESULT_KEYS, status || null)}
      </TableCell>
    </TableRow>
  );
}

function HistoryTable({
  entries,
  labels,
}: {
  entries: BankedResetHistoryEntry[];
  labels: Map<string, string>;
}) {
  const t = useTranslations("settings");
  return (
    <div className="overflow-x-auto">
      <Table className="w-full text-left text-sm">
        <TableCaption className="sr-only">{t("bankedResetAutoApplyHistoryTitle")}</TableCaption>
        <TableHeader>
          <TableRow className="border-b border-border text-xs text-text-muted">
            <TableHead scope="col" className="py-1.5 pe-3 font-medium">
              {t("bankedResetAutoApplyHistoryTime")}
            </TableHead>
            <TableHead scope="col" className="py-1.5 pe-3 font-medium">
              {t("bankedResetAutoApplyHistoryAccount")}
            </TableHead>
            <TableHead scope="col" className="py-1.5 pe-3 font-medium">
              {t("bankedResetAutoApplyHistoryCreditType")}
            </TableHead>
            <TableHead scope="col" className="py-1.5 pe-3 font-medium">
              {t("bankedResetAutoApplyHistoryReason")}
            </TableHead>
            <TableHead scope="col" className="py-1.5 font-medium">
              {t("bankedResetAutoApplyHistoryResult")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry, index) => (
            <HistoryRow
              key={entry.id ?? `${entry.timestamp}-${index}`}
              entry={entry}
              labels={labels}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function BankedResetAutoApplyHistory({
  connections,
}: {
  connections: BankedResetConnection[];
}) {
  const t = useTranslations("settings");
  const { data, loading, failed, reload } = useBankedResetHistory(50);
  const labels = new Map(connections.map((c) => [c.id, connectionLabel(c)]));
  const entries = data?.entries ?? [];

  return (
    <BankedResetSection
      title={t("bankedResetAutoApplyHistoryTitle")}
      description={t("bankedResetAutoApplyHistoryDesc")}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-text-muted" role="status">
          {data
            ? t("bankedResetAutoApplyHistoryCounts", {
                success: data.counts24h.success,
                failed: data.counts24h.failed,
                dryRun: data.counts24h.dryRun,
              })
            : ""}
        </p>
        <div className="flex items-center gap-3">
          <Button size="sm" variant="secondary" onClick={() => void reload()} disabled={loading}>
            {t("bankedResetAutoApplyHistoryRefresh")}
          </Button>
          <Link href="/dashboard/limits" className="text-sm text-primary hover:underline">
            {t("bankedResetAutoApplyRedeemNowLink")}
          </Link>
        </div>
      </div>

      {failed ? (
        <p className="text-sm text-error" role="alert">
          {t("bankedResetAutoApplyHistoryError")}
        </p>
      ) : loading && !data ? (
        <p className="text-sm text-text-muted" role="status">
          {t("loading")}
        </p>
      ) : entries.length === 0 ? (
        <p className="text-sm text-text-muted">{t("bankedResetAutoApplyHistoryEmpty")}</p>
      ) : (
        <HistoryTable entries={entries} labels={labels} />
      )}
    </BankedResetSection>
  );
}
