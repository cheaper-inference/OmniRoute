"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";

import type { ExportFormat } from "./reportExport";

export interface ExportNoteState {
  text: string;
  failed: boolean;
}

/** Downloads /api/reports/export (fetch + blob) and keeps the note about the outcome. */
export function useReportExport() {
  const t = useTranslations("reports");
  const [note, setNote] = useState<ExportNoteState | null>(null);
  const [busy, setBusy] = useState(false);

  const run = useCallback(
    async (params: URLSearchParams, format: ExportFormat) => {
      const type = params.get("type") ?? "export";
      setNote(null);
      setBusy(true);
      try {
        const res = await fetch(`/api/reports/export?${params}`);
        if (!res.ok) {
          const gone = res.status === 404 && type === "sessionRequests";
          setNote({ text: t(gone ? "exportSessionGone" : "exportFailed"), failed: true });
          return;
        }
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        // Keep the server's date-stamped name; fall back if the header is missing.
        const serverName = res.headers.get("Content-Disposition")?.match(/filename="([^"]+)"/)?.[1];
        link.download = serverName ?? `omniroute-report-${type}.${format}`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
        if (res.headers.get("X-Report-Truncated") === "true") {
          const total = Number(res.headers.get("X-Report-Total"));
          setNote({
            text: t(
              type === "sessionRequests" ? "exportTruncatedRequests" : "exportTruncatedRows",
              {
                total,
              }
            ),
            failed: false,
          });
        }
      } catch {
        setNote({ text: t("exportFailed"), failed: true });
      } finally {
        setBusy(false);
      }
    },
    [t]
  );

  return { note, busy, run };
}
