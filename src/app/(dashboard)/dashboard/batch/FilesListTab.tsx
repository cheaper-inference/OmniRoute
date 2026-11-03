"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { buttonVariants } from "@omniroute/ui-kit/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import Icon from "@/shared/components/Icon";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import { cn } from "@/shared/utils/cn";
import { matchesSearch } from "@/shared/utils/turkishText";
import FileDetailModal from "./FileDetailModal";
import ExpirationBadge from "./components/ExpirationBadge";

function relativeTime(ts: number, locale: string): string {
  // ts is in seconds (Unix timestamp)
  const diffMs = Date.now() - ts * 1000;
  const diffSec = Math.round(diffMs / 1000);
  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  if (diffSec < 60) return formatter.format(-diffSec, "second");
  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return formatter.format(-diffMin, "minute");
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return formatter.format(-diffHr, "hour");
  const diffDays = Math.round(diffHr / 24);
  return formatter.format(-diffDays, "day");
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

interface FilesListTabProps {
  files: FileRecord[];
  filesTotal?: number;
  loading: boolean;
  onRefresh?: () => void;
  batches?: BatchRecord[];
}

// Purpose → Badge adapter tone (fine-tune keeps a tone of its own, as its violet chip did).
const PURPOSE_TONES: Record<string, "info" | "success" | "primary" | "warning"> = {
  batch: "info",
  "batch-output": "success",
  "fine-tune": "primary",
  assistants: "warning",
};

const TERMINAL_STATUSES = new Set(["completed", "failed", "cancelled", "expired"]);

function PurposeBadge({ value }: Readonly<{ value: string }>) {
  return (
    <Badge variant={PURPOSE_TONES[value] ?? "default"} size="sm" className="whitespace-nowrap">
      {value}
    </Badge>
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export default function FilesListTab({
  files,
  filesTotal,
  loading,
  onRefresh,
  batches,
}: Readonly<FilesListTabProps>) {
  const locale = useLocale();
  const t = useTranslations("common");
  const [searchQuery, setSearchQuery] = useState("");
  const [purposeFilter, setPurposeFilter] = useState("all");
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [fileContents, setFileContents] = useState<string | null>(null);
  const [contentsLoading, setContentsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const purposes = ["all", ...Array.from(new Set(files.map((f) => f.purpose)))];

  const filtered = files.filter((f) => {
    if (purposeFilter !== "all" && f.purpose !== purposeFilter) return false;
    if (searchQuery) {
      return matchesSearch(f.id, searchQuery) || matchesSearch(f.filename, searchQuery);
    }
    return true;
  });

  const selectedFile = selectedFileId ? files.find((f) => f.id === selectedFileId) : null;

  const handleFileClick = async (file: FileRecord) => {
    setSelectedFileId(file.id);
    setFileContents(null);
    setContentsLoading(true);
    try {
      const response = await fetch(`/api/v1/files/${file.id}/content`);
      if (response.ok) {
        const text = await response.text();
        setFileContents(text);
      } else {
        setFileContents(t("batchFileDetailFailedToLoad"));
      }
    } catch (error) {
      console.error("Failed to fetch file contents:", error);
      setFileContents(t("batchFileDetailLoadError"));
    } finally {
      setContentsLoading(false);
    }
  };

  const handleDeleteFile = async (file: FileRecord) => {
    setDeletingId(file.id);
    try {
      const res = await fetch(`/api/v1/files/${file.id}`, { method: "DELETE" });
      if (res.ok) {
        onRefresh?.();
      } else {
        console.error("[FilesListTab] DELETE returned", res.status);
      }
    } catch (err) {
      console.error("[FilesListTab] DELETE threw", err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <Card padding="sm" className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-text-muted">
          {typeof filesTotal === "number"
            ? t("batchFilesCount", { count: filesTotal })
            : t("batchFilesListFilesTable")}
        </span>
        <Input
          type="text"
          icon="search"
          placeholder={t("batchFilesListSearchPlaceholder")}
          aria-label={t("batchFilesListSearchPlaceholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 min-w-[200px]"
        />
        <Select
          value={purposeFilter}
          onChange={(e) => setPurposeFilter(e.target.value)}
          aria-label={t("batchFilesPurpose")}
          className="w-auto"
        >
          {purposes.map((p) => (
            <option key={p} value={p}>
              {p === "all" ? t("batchFilesAllPurposes") : t(`batchFilePurpose.${p}`)}
            </option>
          ))}
        </Select>
      </Card>

      {/* Table */}
      <Card padding="none" className="overflow-hidden">
        <Table
          className="text-sm"
          aria-label={t("batchFilesListFilesTable")}
          scrollbarLabel={t("batchFilesListFilesTable")}
        >
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>{t("batchFilesFilename")}</TableHead>
              <TableHead>{t("batchFilesPurpose")}</TableHead>
              <TableHead>{t("filesListSizeColumn")}</TableHead>
              <TableHead>{t("filesListUsedByColumn")}</TableHead>
              <TableHead>{t("created")}</TableHead>
              <TableHead>{t("batchFilesExpires")}</TableHead>
              <TableHead>
                <span className="ci-sr-only">{t("actions")}</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-10 text-center text-text-muted">
                  <div role="status" className="flex items-center justify-center gap-2">
                    <Icon name="progress_activity" size={20} className="animate-spin text-accent" />
                    {t("loading")}
                  </div>
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-10 text-center text-text-muted">
                  {t("batchFilesNoneFound")}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((file) => {
                const fileCreatedAt = file.createdAt;
                const fileExpiresAt = file.expiresAt;

                // D12 — derive "Used by" from batches prop
                const related = (batches ?? []).filter(
                  (b) =>
                    b.inputFileId === file.id ||
                    b.outputFileId === file.id ||
                    b.errorFileId === file.id
                );
                const allTerminal = related.every((b) => TERMINAL_STATUSES.has(b.status));
                const canDelete = related.length === 0 || allTerminal;

                return (
                  <TableRow
                    key={file.id}
                    onClick={() => handleFileClick(file)}
                    data-state={selectedFileId === file.id ? "selected" : undefined}
                    className={cn("cursor-pointer", selectedFileId === file.id && "bg-accent/10")}
                  >
                    <TableCell className="font-mono text-xs text-text-muted max-w-[140px]">
                      <span className="truncate block" title={file.id}>
                        {file.id}
                      </span>
                    </TableCell>
                    <TableCell className="text-text-main text-xs max-w-[180px]">
                      <span className="truncate block" title={file.filename}>
                        {file.filename}
                      </span>
                    </TableCell>
                    <TableCell>
                      <PurposeBadge value={file.purpose} />
                    </TableCell>
                    <TableCell className="text-xs text-text-muted whitespace-nowrap">
                      {formatBytes(file.bytes)}
                    </TableCell>
                    {/* "Used by" column (D12) — shows batch id + role (input/output/error) per plan §4 */}
                    <TableCell className="text-xs">
                      {related.length === 0 ? (
                        <span className="text-text-muted">{t("filesListUsedByNone")}</span>
                      ) : (
                        (() => {
                          const roleFor = (b: BatchRecord): string =>
                            b.inputFileId === file.id
                              ? t("filesListUsedByRoleInput")
                              : b.outputFileId === file.id
                                ? t("filesListUsedByRoleOutput")
                                : t("filesListUsedByRoleError");
                          return (
                            <div
                              className="flex flex-col gap-0.5"
                              title={related.map((b) => `${b.id} (${roleFor(b)})`).join(", ")}
                            >
                              {related.slice(0, 2).map((b) => (
                                <span key={b.id} className="font-mono text-[10px] text-text-main">
                                  {b.id.slice(0, 12)}…{" "}
                                  <span className="text-text-muted">({roleFor(b)})</span>
                                </span>
                              ))}
                              {related.length > 2 && (
                                <span className="text-[10px] text-text-muted">
                                  +{related.length - 2}
                                </span>
                              )}
                            </div>
                          );
                        })()
                      )}
                    </TableCell>
                    <TableCell className="text-xs text-text-muted whitespace-nowrap">
                      {fileCreatedAt ? relativeTime(fileCreatedAt, locale) : "—"}
                    </TableCell>
                    <TableCell className="text-xs text-text-muted whitespace-nowrap">
                      {fileExpiresAt ? (
                        <ExpirationBadge expiresAt={fileExpiresAt} variant="compact" />
                      ) : (
                        <span className="text-xs text-text-muted">
                          {t("batchFilesNeverExpires")}
                        </span>
                      )}
                    </TableCell>
                    {/* Actions column */}
                    <TableCell className="whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-1">
                        {/* Download button */}
                        <a
                          href={`/api/v1/files/${file.id}/content`}
                          download={file.filename}
                          className={buttonVariants({
                            variant: "ghost",
                            size: "icon-sm",
                            className: "text-text-muted hover:text-accent",
                          })}
                          title={t("filesListDownload")}
                          aria-label={t("filesListDownload")}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Icon name="download" size={16} />
                        </a>
                        {/* Delete button */}
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            void handleDeleteFile(file);
                          }}
                          disabled={!canDelete || deletingId === file.id}
                          title={
                            canDelete ? t("filesListDelete") : t("batchFileInUseByActiveBatch")
                          }
                          aria-label={
                            canDelete ? t("filesListDelete") : t("batchFileInUseByActiveBatch")
                          }
                          className="text-text-muted hover:text-error"
                        >
                          <Icon
                            name={deletingId === file.id ? "hourglass_empty" : "delete"}
                            size={16}
                          />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Card>

      {/* File Info Modal */}
      {selectedFile && (
        <FileDetailModal
          file={selectedFile}
          contents={fileContents}
          loading={contentsLoading}
          batches={batches}
          onClose={() => setSelectedFileId(null)}
        />
      )}
    </div>
  );
}
