"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Icon from "@/shared/components/Icon";
import { Button } from "@/shared/components";
import Badge from "@/shared/components/Badge";
import Modal from "@/shared/components/Modal";

type FileTranslator = ReturnType<typeof useTranslations>;

function relativeTime(ts: number, t: FileTranslator): string {
  const diffMs = Date.now() - ts * 1000;
  const diffSec = Math.round(diffMs / 1000);
  if (diffSec < 60) return t("batchRelativeTimeAgo", { value: `${diffSec}s` });
  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return t("batchRelativeTimeAgo", { value: `${diffMin}m` });
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return t("batchRelativeTimeAgo", { value: `${diffHr}h` });
  const diffDays = Math.round(diffHr / 24);
  return t("batchRelativeTimeAgo", { value: `${diffDays}d` });
}

function relativeExpiration(ts: number | null, t: FileTranslator): string {
  if (!ts) return t("batchFilesNeverExpires");
  const diffMs = ts * 1000 - Date.now();
  if (diffMs <= 0) return t("expirationBadgeExpired");
  const diffSec = Math.round(diffMs / 1000);
  if (diffSec < 60) return `${diffSec}s`;
  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h`;
  const diffDays = Math.round(diffHr / 24);
  return `${diffDays}d`;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

interface FileRecord {
  id: string;
  filename: string;
  bytes: number;
  purpose: string;
  createdAt: number;
  expiresAt?: number | null;
}

interface BatchRecord {
  id: string;
  endpoint: string;
  status: string;
  inputFileId: string;
  outputFileId?: string | null;
  errorFileId?: string | null;
  model?: string | null;
}

const BATCH_STATUS_TRANSLATION_KEYS: Record<string, string> = {
  completed: "batchStatusCompleted",
  completed_with_failures: "batchStatusCompletedWithFailures",
  failed: "batchStatusFailed",
  in_progress: "batchStatusInProgress",
  in_progress_with_failures: "batchStatusInProgressWithFailures",
  finalizing: "batchStatusFinalizing",
  finalizing_with_failures: "batchStatusFinalizingWithFailures",
  validating: "batchStatusValidating",
  cancelling: "batchStatusCancelling",
  cancelled: "batchStatusCancelled",
  cancelled_with_failures: "batchStatusCancelledWithFailures",
  expired: "batchStatusExpired",
  expired_with_failures: "batchStatusExpiredWithFailures",
};

interface FileDetailModalProps {
  file: FileRecord;
  contents: string | null;
  loading: boolean;
  batches?: BatchRecord[];
  onClose: () => void;
}

export default function FileDetailModal({
  file,
  contents,
  loading,
  batches,
  onClose,
}: Readonly<FileDetailModalProps>) {
  const t = useTranslations("common");
  const [copied, setCopied] = useState(false);

  const relatedBatches = (batches ?? []).filter(
    (b) => b.inputFileId === file.id || b.outputFileId === file.id || b.errorFileId === file.id
  );

  // Escape, the overlay click and the focus trap come from the Modal adapter (kit Dialog).

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = `/api/v1/files/${file.id}/content`;
    a.download = file.filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleCopy = () => {
    if (contents) {
      navigator.clipboard.writeText(contents);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const createdAtTs = file.createdAt;
  const expiresAtTs = file.expiresAt;

  const lineCount = contents ? contents.split("\n").filter((l) => l.trim()).length : 0;
  const isTruncated = lineCount > 1000;
  const displayedLines = contents
    ? contents
        .split("\n")
        .filter((l) => l.trim())
        .slice(0, 1000)
    : [];

  return (
    <Modal
      isOpen
      onClose={onClose}
      size="full"
      className="sm:max-w-3xl"
      title={
        <span className="flex items-center gap-3">
          <Icon name="description" size={20} className="text-text-muted" />
          {t("batchFileContents")}
        </span>
      }
      bodyClassName="p-6 flex flex-col gap-6 max-h-[calc(90vh-120px)] overflow-y-auto"
    >
      <div className="-mt-2 flex items-center gap-2">
        <p className="text-xs text-text-muted font-mono">{file.id}</p>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => {
            navigator.clipboard.writeText(file.id);
          }}
          className="size-6 text-text-muted hover:text-text-main"
          title={t("batchFileDetailCopyId")}
          aria-label={t("batchFileDetailCopyId")}
        >
          <Icon name="content_copy" size={12} />
        </Button>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-bg-alt border border-border">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] uppercase tracking-wider font-medium text-text-muted">
            {t("batchFilesSizeColumn")}
          </span>
          <span className="text-sm text-text-main">{formatBytes(file.bytes)}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] uppercase tracking-wider font-medium text-text-muted">
            {t("batchFilesPurpose")}
          </span>
          <span className="text-sm text-text-main">{file.purpose}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] uppercase tracking-wider font-medium text-text-muted">
            {t("batchDetailCreated")}
          </span>
          <span className="text-sm text-text-main">
            {createdAtTs ? relativeTime(createdAtTs, t) : "—"}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] uppercase tracking-wider font-medium text-text-muted">
            {t("batchFilesExpires")}
          </span>
          <span className="text-sm text-text-main">
            {expiresAtTs ? relativeExpiration(expiresAtTs, t) : t("batchFilesNeverExpires")}
          </span>
        </div>
      </div>

      {/* Related batches */}
      {relatedBatches.length > 0 && (
        <div>
          <h3 className="text-[11px] uppercase tracking-wider font-medium text-text-muted mb-2">
            {t("batchFileUsedByCount", { count: relatedBatches.length })}
          </h3>
          <div className="space-y-1.5">
            {relatedBatches.map((b) => (
              <div
                key={b.id}
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-bg-alt border border-border text-xs"
              >
                <Icon name="pending_actions" size={14} className="text-text-muted" />
                <span className="font-mono text-text-main truncate">{b.id}</span>
                <Badge
                  variant={
                    b.status === "completed"
                      ? "success"
                      : b.status === "failed"
                        ? "error"
                        : "default"
                  }
                  size="sm"
                  className="ml-auto"
                >
                  {BATCH_STATUS_TRANSLATION_KEYS[b.status]
                    ? t(BATCH_STATUS_TRANSLATION_KEYS[b.status])
                    : b.status.replaceAll("_", " ")}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contents */}
      <div className="flex-1 flex flex-col min-h-[300px]">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            {t("batchFilePreview")}
          </h3>
          {contents && (
            <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1.5 text-xs">
              <Icon name={copied ? "check" : "content_copy"} size={14} />
              {copied ? t("copied") : t("copy")}
            </Button>
          )}
        </div>

        <div className="flex-1 relative group">
          {loading ? (
            <div
              role="status"
              aria-label={t("loading")}
              className="absolute inset-0 flex items-center justify-center bg-bg/50 rounded-lg"
            >
              <Icon name="progress_activity" size={32} className="animate-spin text-accent" />
            </div>
          ) : contents ? (
            <div className="h-full flex flex-col">
              <pre className="flex-1 overflow-auto text-[11px] bg-bg rounded-lg p-4 border border-border text-text-muted font-mono leading-relaxed">
                {displayedLines.join("\n")}
              </pre>
              {isTruncated && (
                <div className="mt-3 p-3 bg-warning/10 border border-warning/25 rounded-lg text-xs text-warning flex items-center gap-2">
                  <Icon name="warning" size={16} />
                  {t("batchFilePreviewTruncated", { shown: 1000, total: lineCount })}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-12 rounded-lg border border-dashed border-border text-text-muted">
              <Icon name="find_in_page" size={40} className="mb-2 opacity-20" />
              <p className="text-sm">{t("batchFileDetailFailedToLoad")}</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Action */}
      <div className="flex justify-end gap-3 mt-2">
        <Button onClick={handleDownload} className="gap-2">
          <Icon name="download" size={18} />
          {t("batchFileDownloadFull")}
        </Button>
      </div>
    </Modal>
  );
}
