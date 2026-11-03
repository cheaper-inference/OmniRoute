"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
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
import { matchesSearch } from "@/shared/utils/turkishText";
import BatchDetailModal from "./BatchDetailModal";
import ExpirationBadge from "./components/ExpirationBadge";
import ProgressBarBicolor from "./components/ProgressBarBicolor";
import { useBatchActions } from "./components/useBatchActions";
import { batchStatusTone } from "./components/batchStatusTone";

// ── Helpers ───────────────────────────────────────────────────────────────────

function relativeTime(ts: number): string {
  const diffMs = Date.now() - ts * 1000;
  const isFuture = diffMs < 0;
  const absDiffMs = Math.abs(diffMs);
  const diffSec = Math.round(absDiffMs / 1000);

  let res = "";
  if (diffSec < 60) res = `${diffSec}s`;
  else {
    const diffMin = Math.round(diffSec / 60);
    if (diffMin < 60) res = `${diffMin}m`;
    else {
      const diffHr = Math.round(diffMin / 60);
      if (diffHr < 24) res = `${diffHr}h`;
      else res = `${Math.round(diffHr / 24)}d`;
    }
  }

  if (isFuture) return `in ${res}`;
  return `${res} ago`;
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface BatchRecord {
  id: string;
  endpoint: string;
  completionWindow: string;
  status: string;
  inputFileId: string;
  outputFileId?: string | null;
  errorFileId?: string | null;
  createdAt: number;
  inProgressAt?: number | null;
  expiresAt?: number | null;
  finalizingAt?: number | null;
  completedAt?: number | null;
  failedAt?: number | null;
  expiredAt?: number | null;
  cancellingAt?: number | null;
  cancelledAt?: number | null;
  requestCountsTotal: number;
  requestCountsCompleted: number;
  requestCountsFailed: number;
  metadata?: Record<string, unknown> | null;
  errors?: unknown | null;
  model?: string | null;
  usage?: unknown | null;
}

interface FileRecord {
  id: string;
  filename: string;
  bytes: number;
  purpose: string;
  status?: string | null;
  createdAt: number;
}

interface BatchListTabProps {
  batches: BatchRecord[];
  files: FileRecord[];
  batchesTotal?: number;
  loading: boolean;
  onRefresh?: () => void;
}

// ── Status helpers ────────────────────────────────────────────────────────────

// A-1 / R2 — Derive Provider label from model id (no provider field on BatchRecord).
// Heuristic-only display; no filter side-effect. Vendor names are proper nouns and
// stay un-translated; "other" / "unknown" return discriminators so the call-site can
// translate via t() — keeps function pure & free of next-intl coupling.
type ProviderLabel = "OpenAI" | "Anthropic" | "Gemini" | "other" | "unknown";
function deriveProvider(model: string | null | undefined): ProviderLabel {
  if (!model) return "unknown";
  const lower = model.toLowerCase();
  // OpenAI family: gpt-*, chatgpt-*, o-series (o1/o3/o4 + suffixes), embeddings, DALL·E
  if (
    lower.startsWith("gpt-") ||
    lower.startsWith("chatgpt-") ||
    /^o[1-9](?:-|$)/.test(lower) ||
    lower.startsWith("text-embedding-") ||
    lower.startsWith("dall-e") ||
    lower.startsWith("whisper") ||
    lower.startsWith("tts-")
  )
    return "OpenAI";
  if (lower.startsWith("claude-")) return "Anthropic";
  if (lower.startsWith("gemini")) return "Gemini";
  return "other";
}

// Maps each known status (raw + composite) to its i18n key in the `common` namespace.
// Falls back to a snake→space transform at render-time if the status isn't mapped.
const STATUS_LABEL_KEYS: Record<string, string> = {
  in_progress: "batchStatusInProgress",
  validating: "batchStatusValidating",
  finalizing: "batchStatusFinalizing",
  completed: "batchStatusCompleted",
  failed: "batchStatusFailed",
  cancelled: "batchStatusCancelled",
  cancelling: "batchStatusCancelling",
  expired: "batchStatusExpired",
  completed_with_failures: "batchStatusCompletedWithFailures",
  in_progress_with_failures: "batchStatusInProgressWithFailures",
  finalizing_with_failures: "batchStatusFinalizingWithFailures",
  cancelled_with_failures: "batchStatusCancelledWithFailures",
  expired_with_failures: "batchStatusExpiredWithFailures",
};

/** Returns a composite status key that reflects whether partial failures occurred. */
function effectiveStatus(batch: BatchRecord): string {
  const hasFailed = (batch.requestCountsFailed ?? 0) > 0;
  if (!hasFailed) return batch.status;
  const map: Record<string, string> = {
    completed: "completed_with_failures",
    in_progress: "in_progress_with_failures",
    finalizing: "finalizing_with_failures",
    cancelled: "cancelled_with_failures",
    expired: "expired_with_failures",
  };
  return map[batch.status] ?? batch.status;
}

function StatusBadge({ batch }: Readonly<{ batch: BatchRecord }>) {
  const t = useTranslations("common");
  const key = effectiveStatus(batch);
  const labelKey = STATUS_LABEL_KEYS[key];
  const label = labelKey ? t(labelKey as Parameters<typeof t>[0]) : key.replaceAll("_", " ");
  return (
    <Badge variant={batchStatusTone(key)} size="sm" className="whitespace-nowrap">
      {label}
    </Badge>
  );
}

const ALL_STATUSES = [
  "all",
  "in_progress",
  "validating",
  "finalizing",
  "completed",
  "failed",
  "cancelled",
  "cancelling",
  "expired",
];

// ── BatchRowActions (internal component) ──────────────────────────────────────

/** Per-row action buttons: cancel, download output/errors, retry, delete. */
function BatchRowActions({
  batch,
  onRefresh,
  deletingId,
  setDeletingId,
}: Readonly<{
  batch: BatchRecord;
  onRefresh?: () => void;
  deletingId: string | null;
  setDeletingId: (id: string | null) => void;
}>) {
  const t = useTranslations("common");
  const actions = useBatchActions({ onRefresh, t });

  const isTerminal = ["completed", "failed", "cancelled", "expired"].includes(batch.status);
  const canCancel = ["validating", "in_progress", "finalizing"].includes(batch.status);
  const canRetry = isTerminal && !!batch.errorFileId && (batch.requestCountsFailed ?? 0) > 0;

  return (
    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
      {/* Cancel — only for non-terminal statuses */}
      {canCancel && (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={async () => {
            if (window.confirm(t("batchDetailCancelConfirm"))) {
              await actions.cancel(batch.id);
            }
          }}
          disabled={actions.cancelling}
          title={t("batchActionCancel")}
          aria-label={t("batchActionCancel")}
          className="size-7 text-text-muted hover:text-warning hover:bg-warning/10"
        >
          <Icon name={actions.cancelling ? "hourglass_empty" : "block"} size={13} />
        </Button>
      )}

      {/* Download output */}
      {batch.outputFileId && (
        <a
          href={actions.downloadHrefOutput(batch.outputFileId) ?? "#"}
          download={`batch-${batch.id}-output.jsonl`}
          onClick={(e) => e.stopPropagation()}
          title={t("batchActionDownloadOutput")}
          aria-label={t("batchActionDownloadOutput")}
          className={buttonVariants({
            variant: "ghost",
            size: "icon-sm",
            className: "size-7 text-text-muted hover:text-success hover:bg-success/10",
          })}
        >
          <Icon name="download" size={13} />
        </a>
      )}

      {/* Download errors */}
      {batch.errorFileId && (
        <a
          href={actions.downloadHrefErrors(batch.errorFileId) ?? "#"}
          download={`batch-${batch.id}-errors.jsonl`}
          onClick={(e) => e.stopPropagation()}
          title={t("batchActionDownloadErrors")}
          aria-label={t("batchActionDownloadErrors")}
          className={buttonVariants({
            variant: "ghost",
            size: "icon-sm",
            className: "size-7 text-text-muted hover:text-warning hover:bg-warning/10",
          })}
        >
          <Icon name="file_download" size={13} />
        </a>
      )}

      {/* Retry failed — only when terminal + has error file + has failures */}
      {canRetry && (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={async () => {
            if (window.confirm(t("batchActionRetryConfirm", { n: batch.requestCountsFailed }))) {
              await actions.retry({
                id: batch.id,
                inputFileId: batch.inputFileId,
                errorFileId: batch.errorFileId,
                endpoint: batch.endpoint,
              });
            }
          }}
          disabled={actions.retrying}
          title={t("batchActionRetry")}
          aria-label={t("batchActionRetry")}
          className="size-7 text-text-muted hover:text-info hover:bg-info/10"
        >
          <Icon name={actions.retrying ? "hourglass_empty" : "replay"} size={13} />
        </Button>
      )}

      {/* Delete — only for terminal statuses */}
      {isTerminal && (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={async (e) => {
            e.stopPropagation();
            setDeletingId(batch.id);
            try {
              const res = await fetch(`/api/v1/batches/${batch.id}`, { method: "DELETE" });
              if (res.ok) {
                onRefresh?.();
              } else {
                console.error(
                  "[BatchRowActions] DELETE returned non-ok status",
                  batch.id,
                  res.status
                );
              }
            } catch (err) {
              console.error("[BatchRowActions] DELETE threw", batch.id, err);
            } finally {
              setDeletingId(null);
            }
          }}
          disabled={deletingId === batch.id}
          title={t("batchListDeleteBatchTitle")}
          aria-label={t("batchListDeleteBatchTitle")}
          className="size-7 text-text-muted hover:text-error hover:bg-error/10"
        >
          <Icon name={deletingId === batch.id ? "hourglass_empty" : "delete"} size={13} />
        </Button>
      )}
    </div>
  );
}

// ── BatchListTab ──────────────────────────────────────────────────────────────

export default function BatchListTab({
  batches,
  files,
  batchesTotal,
  loading,
  onRefresh,
}: Readonly<BatchListTabProps>) {
  const t = useTranslations("common");
  const [selectedBatch, setSelectedBatch] = useState<BatchRecord | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [removingCompleted, setRemovingCompleted] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const MAX_DELETE_ITERATIONS = 5;

  const handleRemoveCompleted = async () => {
    setRemovingCompleted(true); // Uses your existing state variable
    let hasMore = true;
    let iterations = 0;

    try {
      while (hasMore && iterations < MAX_DELETE_ITERATIONS) {
        // Use the correct /api/ prefix for Next.js routes
        const res = await fetch("/api/v1/batches/delete-completed", { method: "DELETE" });

        if (!res.ok) {
          throw new Error("Failed to delete batches");
        }

        const data = await res.json();
        hasMore = data.hasMore === true;
        iterations++;
      }

      // Surface the notice if the chunk ceiling was hit
      if (hasMore) {
        window.alert("Removed a large number of batches. Click again to clear the rest.");
      }
    } catch (error) {
      console.error("An error occurred while removing batches:", error);
      window.alert("An error occurred while removing batches.");
    } finally {
      setRemovingCompleted(false);
      onRefresh?.(); // Uses your component's actual refresh prop
    }
  };
  const filtered = batches.filter((b) => {
    if (statusFilter !== "all" && b.status !== statusFilter) return false;
    if (searchQuery) {
      return (
        matchesSearch(b.id, searchQuery) ||
        matchesSearch(b.endpoint, searchQuery) ||
        matchesSearch(b.model ?? "", searchQuery)
      );
    }
    return true;
  });

  return (
    <>
      {/* Filters */}
      <Card padding="sm" className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-text-muted">
          {batchesTotal ? t("batchListCount", { count: batchesTotal }) : t("batchListTitle")}
        </span>
        <Input
          type="text"
          icon="search"
          placeholder={t("batchListSearchPlaceholder")}
          aria-label={t("batchListSearchPlaceholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 min-w-[200px]"
        />
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          aria-label={t("batchListTableStatus")}
          className="w-auto"
        >
          {ALL_STATUSES.map((s) => {
            const labelKey = s === "all" ? "batchStatusAll" : STATUS_LABEL_KEYS[s];
            return (
              <option key={s} value={s}>
                {labelKey ? t(labelKey as Parameters<typeof t>[0]) : s}
              </option>
            );
          })}
        </Select>
        <Button
          variant="danger"
          size="sm"
          onClick={handleRemoveCompleted}
          disabled={removingCompleted}
          className="gap-1.5 whitespace-nowrap"
          title={t("batchListDeleteAllCompletedTitle")}
        >
          <Icon name={removingCompleted ? "hourglass_empty" : "delete_sweep"} size={16} />
          {removingCompleted ? t("batchListRemovingCompleted") : t("batchListRemoveCompleted")}
        </Button>
      </Card>

      {/* Table — 9 columns: Status | ID | Endpoint | Model | Progress | Cost | Created | Expires | Actions */}
      <Card padding="none" className="overflow-hidden">
        <Table
          className="text-sm"
          aria-label={t("batchListBatchesTable")}
          scrollbarLabel={t("batchListBatchesTable")}
        >
          <TableHeader>
            <TableRow>
              <TableHead>{t("batchListTableStatus")}</TableHead>
              <TableHead>{t("batchListTableId")}</TableHead>
              <TableHead>{t("batchListProviderColumn")}</TableHead>
              <TableHead>{t("batchListTableEndpoint")}</TableHead>
              <TableHead>{t("batchListTableModel")}</TableHead>
              <TableHead>{t("batchListTableProgress")}</TableHead>
              <TableHead>{t("batchListCostColumn")}</TableHead>
              <TableHead>{t("batchListTableCreated")}</TableHead>
              <TableHead>{t("batchListTableExpires")}</TableHead>
              <TableHead>
                <span className="ci-sr-only">{t("actions")}</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="py-10 text-center text-text-muted">
                  <div role="status" className="flex items-center justify-center gap-2">
                    <Icon name="progress_activity" size={20} className="animate-spin text-accent" />
                    {t("batchListLoading")}
                  </div>
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="py-10 text-center text-text-muted">
                  {t("batchListEmpty")}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((batch) => {
                const total = batch.requestCountsTotal || 0;
                const done = batch.requestCountsCompleted || 0;
                const failed = batch.requestCountsFailed || 0;

                // Cost estimate — lightweight heuristic (D8).
                // Full per-request estimate (using JSONL input) is shown in BatchDetailModal.
                const estimatedCost = (() => {
                  if (!batch.model || total === 0) return "—";
                  // Prefer real usage data when available (completed batches)
                  const usage = batch.usage as
                    { input_tokens?: number; output_tokens?: number } | null | undefined;
                  if (usage?.input_tokens != null && usage?.output_tokens != null) {
                    // batch rate ≈ $0.005/1K tokens (blended, already -50%)
                    const cost = ((usage.input_tokens + usage.output_tokens) * 0.005) / 1000;
                    return `~$${cost.toFixed(2)}`;
                  }
                  // Fallback heuristic: 500 avg tokens/request × batch rate
                  const estCost = (total * 500 * 0.005) / 1000;
                  return `~$${estCost.toFixed(2)}`;
                })();

                return (
                  <TableRow
                    key={batch.id}
                    onClick={() => setSelectedBatch(batch)}
                    className="cursor-pointer"
                  >
                    <TableCell>
                      <StatusBadge batch={batch} />
                    </TableCell>
                    <TableCell className="font-mono text-xs text-text-muted max-w-[180px]">
                      <span className="truncate block" title={batch.id}>
                        {batch.id}
                      </span>
                    </TableCell>
                    <TableCell className="text-text-main text-xs whitespace-nowrap">
                      {(() => {
                        const p = deriveProvider(batch.model);
                        if (p === "unknown") return t("batchListProviderUnknown");
                        if (p === "other") return t("batchListProviderOther");
                        return p;
                      })()}
                    </TableCell>
                    <TableCell className="text-text-main text-xs">{batch.endpoint}</TableCell>
                    <TableCell className="text-text-muted text-xs">{batch.model ?? "—"}</TableCell>
                    {/* Progress — ProgressBarBicolor from F3; spinner when validating (G2); (partial) suffix when expired with failures (G-AUD3) */}
                    <TableCell className="min-w-[140px]">
                      {batch.status === "validating" ? (
                        <div className="flex items-center gap-2 text-xs text-warning">
                          <Icon name="hourglass_top" size={14} className="animate-spin" />
                          {t("batchListValidating")}
                        </div>
                      ) : total > 0 ? (
                        <div className="flex flex-col gap-0.5">
                          <ProgressBarBicolor
                            total={total}
                            completed={done}
                            failed={failed}
                            showLabels
                          />
                          {effectiveStatus(batch) === "expired_with_failures" && (
                            <span className="text-[10px] text-warning italic">
                              {t("batchListProgressPartial")}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-text-muted">—</span>
                      )}
                    </TableCell>
                    {/* Cost column — heuristic estimate (D8) with -50% badge per wireframe §3 (G-AUD2) */}
                    <TableCell className="text-xs whitespace-nowrap">
                      <span className="text-text-muted">{estimatedCost}</span>
                      {estimatedCost !== "—" && (
                        <Badge variant="success" size="sm" className="ml-1 align-middle">
                          -50%
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-xs text-text-muted whitespace-nowrap">
                      {relativeTime(batch.createdAt)}
                    </TableCell>
                    {/* Expiration — countdown badge for active batches (D11) */}
                    <TableCell className="text-xs text-text-muted whitespace-nowrap">
                      {["in_progress", "validating", "finalizing"].includes(batch.status) ? (
                        <ExpirationBadge expiresAt={batch.expiresAt ?? null} variant="compact" />
                      ) : batch.expiresAt ? (
                        relativeTime(batch.expiresAt)
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    {/* Actions — cancel / download / retry / delete */}
                    <TableCell>
                      <BatchRowActions
                        batch={batch}
                        onRefresh={onRefresh}
                        deletingId={deletingId}
                        setDeletingId={setDeletingId}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Detail modal */}
      {selectedBatch && (
        <BatchDetailModal
          batch={selectedBatch}
          files={files}
          onClose={() => setSelectedBatch(null)}
        />
      )}
    </>
  );
}
