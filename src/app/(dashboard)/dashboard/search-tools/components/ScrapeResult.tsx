"use client";

import { useState, lazy, Suspense } from "react";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Modal from "@/shared/components/Modal";
import Textarea from "@/shared/components/Textarea";
import type { ScrapeResult as ScrapeResultType } from "@/shared/schemas/searchTools";

/** D21 — cap at 256 KB to avoid freezing the renderer */
const CONTENT_CAP_BYTES = 256 * 1024;

// Lazy-load MarkdownMessage to avoid increasing initial bundle size
const MarkdownMessage = lazy(
  () => import("@/app/(dashboard)/dashboard/playground/components/MarkdownMessage")
);

interface ScrapeResultProps {
  result: ScrapeResultType;
  latencyMs?: number | null;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ScrapeResult({ result, latencyMs }: ScrapeResultProps) {
  const t = useTranslations("search");
  const tc = useTranslations("common");
  const [mode, setMode] = useState<"markdown" | "raw">("markdown");
  const [rawModalOpen, setRawModalOpen] = useState(false);

  const contentSize = new TextEncoder().encode(result.content).length;
  const isTruncated = contentSize > CONTENT_CAP_BYTES;
  const displayContent = isTruncated ? result.content.slice(0, CONTENT_CAP_BYTES) : result.content;

  return (
    <div className="space-y-3" data-testid="scrape-result">
      {/* Meta bar */}
      <div className="flex flex-wrap justify-between items-center gap-2 p-3 bg-bg-alt rounded-lg border border-border text-xs text-text-muted">
        <div className="flex flex-wrap gap-x-4 gap-y-1 items-center">
          {result.provider && (
            <span>
              {`${t("provider")}: `}
              <span className="font-medium text-text-main">{result.provider}</span>
            </span>
          )}
          {latencyMs != null && (
            <span>
              {`${t("latency")}: `}
              <span className="font-medium text-text-main">{latencyMs}ms</span>
            </span>
          )}
          <span>
            {`${t("size")}: `}
            <span className="font-medium text-text-main">{formatBytes(contentSize)}</span>
          </span>
          {result.links.length > 0 && (
            <span>
              {`${t("links")}: `}
              <span className="font-medium text-text-main">{result.links.length}</span>
            </span>
          )}
        </div>

        {/* View toggle */}
        <div className="flex gap-1">
          <Button
            size="sm"
            variant={mode === "markdown" ? "secondary" : "ghost"}
            aria-pressed={mode === "markdown"}
            onClick={() => setMode("markdown")}
            data-testid="toggle-markdown"
          >
            {t("scrapePreview")}
          </Button>
          <Button
            size="sm"
            variant={mode === "raw" ? "secondary" : "ghost"}
            aria-pressed={mode === "raw"}
            onClick={() => setMode("raw")}
            data-testid="toggle-raw"
          >
            {t("scrapeRaw")}
          </Button>
        </div>
      </div>

      {/* Metadata card */}
      {result.metadata && (result.metadata.title || result.metadata.description) && (
        <div className="p-3 bg-surface border border-border rounded-lg text-xs">
          {result.metadata.title && (
            <div className="font-semibold text-text-main mb-0.5">{result.metadata.title}</div>
          )}
          {result.metadata.description && (
            <div className="text-text-muted">{result.metadata.description}</div>
          )}
          <a
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline block mt-1 truncate"
          >
            {result.url}
          </a>
        </div>
      )}

      {/* Truncation warning */}
      {isTruncated && (
        <div
          className="flex items-center justify-between p-3 bg-warning/10 border border-warning/30 rounded-lg text-xs text-warning"
          data-testid="truncation-warning"
        >
          <span>{t("contentTruncated", { size: formatBytes(contentSize) })}</span>
          <Button
            variant="warning"
            size="sm"
            className="ml-3"
            onClick={() => setRawModalOpen(true)}
            data-testid="view-raw-button"
          >
            {t("viewFullRaw")}
          </Button>
        </div>
      )}

      {/* Content area */}
      {mode === "markdown" ? (
        <div
          className="prose prose-sm max-w-none p-4 bg-surface border border-border rounded-lg overflow-auto"
          data-testid="markdown-preview"
        >
          <Suspense
            fallback={
              <pre className="text-xs whitespace-pre-wrap text-text-muted">{displayContent}</pre>
            }
          >
            <MarkdownMessage content={displayContent} />
          </Suspense>
        </div>
      ) : (
        <Textarea
          readOnly
          value={displayContent}
          className="h-64 font-mono text-xs resize-none"
          data-testid="raw-content"
          aria-label={t("rawScrapedContent")}
        />
      )}

      {/* Raw full-content modal (for truncated content) */}
      <Modal
        isOpen={rawModalOpen}
        onClose={() => setRawModalOpen(false)}
        title={t("rawContent", { size: formatBytes(contentSize) })}
        size="full"
        showCloseButton={false}
      >
        <div className="flex h-[65vh] flex-col gap-3" data-testid="raw-modal">
          <Textarea
            readOnly
            value={result.content}
            aria-label={t("rawScrapedContent")}
            className="flex-1 font-mono text-xs resize-none"
            data-testid="raw-modal-content"
          />
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => setRawModalOpen(false)}
              aria-label={t("closeRawModal")}
            >
              {tc("close")}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
