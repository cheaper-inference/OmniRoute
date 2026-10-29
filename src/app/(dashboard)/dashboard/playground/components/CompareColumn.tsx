"use client";

import Button from "@/shared/components/Button";

// src/app/(dashboard)/dashboard/playground/components/CompareColumn.tsx

import { useTranslations } from "next-intl";
import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";
import type { StreamMetrics } from "@/shared/schemas/playground";
import MarkdownMessage from "./MarkdownMessage";
import ProviderMetrics from "./ProviderMetrics";

export type ColumnStatus = "idle" | "streaming" | "done" | "error";

export interface CompareColumnData {
  id: string;
  model: string;
  status: ColumnStatus;
  metrics: StreamMetrics;
  response: string;
  errorMessage?: string;
}

interface CompareColumnProps {
  column: CompareColumnData;
  onCancel: (id: string) => void;
  onRemove: (id: string) => void;
}

/**
 * CompareColumn — a single column in the Compare tab.
 * Shows the model name, streaming response (via MarkdownMessage), and ProviderMetrics.
 */
export default function CompareColumn({ column, onCancel, onRemove }: CompareColumnProps) {
  const t = useTranslations("playground");
  const { copied, copy } = useCopyToClipboard();
  const { id, model, status, metrics, response, errorMessage } = column;

  return (
    <div className="flex flex-col h-full border-r border-border last:border-r-0 min-w-0 min-h-0 overflow-hidden">
      {/* Column header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-bg-alt shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          {/* Status indicator */}
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${
              status === "streaming"
                ? "bg-primary animate-pulse"
                : status === "done"
                  ? "bg-success"
                  : status === "error"
                    ? "bg-error"
                    : "bg-text-muted/30"
            }`}
            aria-label={t("statusLabel", { status: t(`status.${status}`) })}
          />
          <span className="text-xs font-medium text-text-main truncate" title={model}>
            {model || <span className="text-text-muted italic">{t("noModel")}</span>}
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {status === "streaming" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCancel(id)}
              className="h-auto min-h-0 px-1.5 py-0.5 text-[10px] text-text-muted"
              aria-label={t("cancelStream")}
            >
              {t("cancel")}
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => void copy(response, id)}
            disabled={response === ""}
            className="text-text-muted"
            title={copied === id ? t("copiedCode") : t("copy")}
            aria-label={copied === id ? t("copiedCode") : t("copy")}
            icon={copied === id ? "check" : "content_copy"}
          />
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onRemove(id)}
            className="text-text-muted hover:text-error"
            title={t("removeColumn")}
            aria-label={t("removeModelColumn", { model: model || t("noModel") })}
            icon="close"
          />
        </div>
      </div>

      {/* Metrics bar */}
      {(status === "streaming" || status === "done") && (
        <div className="px-3 py-1.5 border-b border-border shrink-0">
          <ProviderMetrics metrics={metrics} />
        </div>
      )}

      {/* Response content */}
      <div className="flex-1 overflow-y-auto px-3 py-3 text-sm">
        {status === "idle" && <p className="text-text-muted text-xs italic">{t("readyToRun")}</p>}

        {status === "error" && (
          <div className="text-error text-xs bg-error/10 rounded p-2">
            <span className="font-medium">{t("errorLabel")}: </span>
            {errorMessage ?? t("unknownError")}
          </div>
        )}

        {status === "streaming" && response === "" && (
          <div className="flex items-center gap-2 text-text-muted text-xs">
            <span className="inline-block w-1.5 h-4 bg-primary/60 animate-pulse rounded-sm" />
            {t("waitingForResponse")}
          </div>
        )}

        {(status === "streaming" || status === "done") && response !== "" && (
          <MarkdownMessage content={response} />
        )}
      </div>
    </div>
  );
}
