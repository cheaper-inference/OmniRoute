"use client";

import { useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ConfirmModal, RequestLoggerV2 } from "@/shared/components";
import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@omniroute/ui-kit/dropdown-menu";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import {
  buildLogExportUrl,
  readLogExportTruncation,
  readLogExportEmittedCount,
} from "@/shared/utils/logExport";

const TIME_RANGES = [
  { label: "1h", hours: 1 },
  { label: "6h", hours: 6 },
  { label: "12h", hours: 12 },
  { label: "24h", hours: 24 },
];

type LogsTranslator = ((key: string, values?: Record<string, unknown>) => string) & {
  has?: (key: string) => boolean;
};

function logsText(
  t: LogsTranslator,
  key: string,
  fallback: string,
  values?: Record<string, unknown>
) {
  if (typeof t.has !== "function" || !t.has(key)) return fallback;
  return values ? t(key, values) : t(key);
}

function LogsPageContent() {
  const searchParams = useSearchParams();
  // Read ONCE: #6830 fixed the detail modal reopening on first close by freezing this
  // value, and the #8354 page rewrite regressed it by reading the live searchParams on
  // every render — the prop flips mid-session and re-fires the child's deep-link effect
  // exactly when the modal closes. Same freeze applies to ?correlationId=: a same-page
  // navigation to a new correlation link needs a full remount (key change) to take
  // effect — mirrored from initialId on purpose.
  const [initialId] = useState(() => searchParams.get("id"));
  const [initialCorrelationId] = useState(() => searchParams.get("correlationId"));

  const [showExport, setShowExport] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState<string | null>(null);
  const [showCleanHistory, setShowCleanHistory] = useState(false);
  const [cleaningHistory, setCleaningHistory] = useState(false);
  const [cleanHistoryStatus, setCleanHistoryStatus] = useState<string | null>(null);
  const [requestLogKey, setRequestLogKey] = useState(0);
  const requestLoggerRef = useRef<any>(null);
  const t = useTranslations("logs") as LogsTranslator;

  async function handleExport(hours: number) {
    setExporting(true);
    setShowExport(false);
    setExportStatus(null);
    try {
      const logType = "request-logs";
      // #13999: ask for the server's maximum row cap instead of silently getting the 10k default.
      const res = await fetch(buildLogExportUrl(hours, logType));
      if (!res.ok) throw new Error(t("exportFailed"));
      const blob = await res.blob();
      const truncation = readLogExportTruncation(
        res.headers,
        await readLogExportEmittedCount(blob)
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `omniroute-${logType}-${hours}h-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      if (truncation) {
        const { exported, total } = truncation;
        const fallback = `Export truncated: only ${exported} of ${total} log entries were included. Pick a shorter time range to export the rest.`;
        setExportStatus(logsText(t, "exportTruncated", fallback, { exported, total }));
      }
    } catch (err) {
      console.error(t("exportFailed"), err);
    } finally {
      setExporting(false);
    }
  }

  async function handleCleanHistory() {
    setCleaningHistory(true);
    setShowCleanHistory(false);
    setCleanHistoryStatus(null);
    try {
      const res = await fetch("/api/settings/purge-request-history", { method: "POST" });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          data?.error || logsText(t, "cleanHistoryFailed", "Failed to clean log history.")
        );
      }

      const deleted = typeof data?.deleted === "number" ? data.deleted : 0;
      const deletedArtifacts =
        typeof data?.deletedArtifacts === "number" ? data.deletedArtifacts : 0;
      const deletedDetailedLogs =
        typeof data?.deletedDetailedLogs === "number" ? data.deletedDetailedLogs : 0;
      const successFallback = `Cleaned ${deleted} log entr${deleted === 1 ? "y" : "ies"}, ${deletedArtifacts} artifact${
        deletedArtifacts === 1 ? "" : "s"
      }, and ${deletedDetailedLogs} legacy detail row${deletedDetailedLogs === 1 ? "" : "s"}.`;
      setRequestLogKey((key) => key + 1);
      setCleanHistoryStatus(
        deleted || deletedArtifacts || deletedDetailedLogs
          ? logsText(t, "cleanHistorySuccess", successFallback, {
              deleted,
              deletedArtifacts,
              deletedDetailedLogs,
            })
          : logsText(t, "cleanHistoryEmpty", "No request log history was found.")
      );
    } catch (err) {
      console.error(logsText(t, "cleanHistoryFailed", "Failed to clean log history."), err);
      setCleanHistoryStatus(
        err instanceof Error
          ? err.message
          : logsText(t, "cleanHistoryFailed", "Failed to clean log history.")
      );
    } finally {
      setCleaningHistory(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        compact
        title={t("requestLogs")}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button
              id="clean-log-history-btn"
              variant="outline"
              icon="delete_sweep"
              onClick={() => setShowCleanHistory(true)}
              disabled={cleaningHistory}
              className="border-error/30 text-error hover:bg-error/10"
            >
              {logsText(t, "cleanHistoryButton", "Clean history")}
            </Button>

            {/* Kit DropdownMenu (Radix): outside click, Escape and focus return are its own. */}
            <DropdownMenu open={showExport} onOpenChange={setShowExport}>
              <DropdownMenuTrigger asChild>
                <Button id="export-logs-btn" variant="outline" icon="download" disabled={exporting}>
                  {exporting ? t("exporting") : t("export")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[160px]">
                <DropdownMenuLabel>{t("timeRange")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {TIME_RANGES.map((range) => (
                  <DropdownMenuItem
                    key={range.hours}
                    id={`export-${range.hours}h-btn`}
                    onSelect={() => handleExport(range.hours)}
                    shortcut={range.hours === 24 ? t("defaultRange") : undefined}
                  >
                    {t("lastNHours", { hours: range.label })}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        }
      />

      {exportStatus && (
        <Alert
          id="export-logs-status"
          variant="warning"
          icon={<Icon name="warning" size={16} />}
          dismissLabel={t("close")}
          onDismiss={() => setExportStatus(null)}
          description={exportStatus}
        />
      )}

      {cleanHistoryStatus && (
        <Alert
          variant="default"
          icon={<Icon name="info" size={16} />}
          dismissLabel={t("close")}
          onDismiss={() => setCleanHistoryStatus(null)}
          description={cleanHistoryStatus}
        />
      )}

      <div className="min-h-0">
        <RequestLoggerV2
          key={requestLogKey}
          ref={requestLoggerRef}
          initialSelectedId={initialId}
          initialCorrelationId={initialCorrelationId}
        />
      </div>

      <ConfirmModal
        isOpen={showCleanHistory}
        onClose={() => setShowCleanHistory(false)}
        onConfirm={handleCleanHistory}
        title={logsText(t, "cleanHistoryTitle", "Clean log history?")}
        message={logsText(
          t,
          "cleanHistoryMessage",
          "This permanently clears all request log rows, legacy detail rows, and local artifact files under DATA_DIR/call_logs. The live page will refresh after cleanup."
        )}
        confirmText={logsText(t, "cleanHistoryConfirm", "Clean history")}
        cancelText={logsText(t, "cleanHistoryCancel", "Cancel")}
        loading={cleaningHistory}
      />
    </div>
  );
}

export default function LogsPage() {
  const t = useTranslations("logs");
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-12 text-text-muted text-sm">
          {t("loading")}
        </div>
      }
    >
      <LogsPageContent />
    </Suspense>
  );
}
