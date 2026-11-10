"use client";

import { Disclosure, DisclosureContent, DisclosureTrigger } from "@omniroute/ui-kit/disclosure";
import Icon from "@/shared/components/Icon";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { Button, Select } from "@/shared/components";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CompressionPreviewResult {
  originalTokens: number;
  compressedTokens: number;
  tokensSaved: number;
  savingsPct: number;
  techniquesUsed: string[];
  durationMs: number;
}

export interface CompressionPreviewAccordionProps {
  /** Force the accordion open on mount (used by deep-link). */
  forceOpen?: boolean;
  /** Called whenever the open state changes (used for URL sync). */
  onOpenChange?: (open: boolean) => void;
  /**
   * Content to compress. If provided (from TranslateTab state), the accordion
   * uses it directly. If absent or empty, shows an empty-state hint.
   */
  inputContent?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Sanitize an error message: strip Node stack-trace lines (e.g. "at /home/…"). */
function sanitizeError(e: unknown): string {
  const raw = e instanceof Error ? e.message : String(e);
  // Remove stack-trace lines that start with "at " followed by a path
  return raw.replace(/\s+at\s+[^\n]+/g, "").trim();
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const COMPRESSION_MODES = ["off", "lite", "standard", "aggressive", "ultra"] as const;

const COMPRESSION_MODE_LABEL_KEYS = {
  off: "compressionModeOff",
  lite: "compressionModeLite",
  standard: "compressionModeStandard",
  aggressive: "compressionModeAggressive",
  ultra: "compressionModeUltra",
} as const;

// ---------------------------------------------------------------------------
// Inner content (mounted only while the disclosure is open)
// ---------------------------------------------------------------------------

function CompressionPreviewContent({ inputContent = "" }: { inputContent?: string }) {
  const t = useTranslations("translator");
  const ts = useTranslations("settings");

  const [compressionMode, setCompressionMode] = useState<string>("standard");
  const [compressionResult, setCompressionResult] = useState<CompressionPreviewResult | null>(null);
  const [compressionLoading, setCompressionLoading] = useState(false);
  const [compressionError, setCompressionError] = useState<string | null>(null);

  const hasInput = inputContent.trim().length > 0;

  const handleCompressionPreview = useCallback(async () => {
    if (!hasInput) return;

    let messages: Array<{ role: string; content: string }>;
    try {
      const parsed: Record<string, unknown> = JSON.parse(inputContent);
      messages = Array.isArray(parsed.messages)
        ? (parsed.messages as Array<{ role: string; content: string }>)
        : [{ role: "user", content: inputContent }];
    } catch {
      messages = [{ role: "user", content: inputContent }];
    }

    setCompressionLoading(true);
    setCompressionError(null);

    try {
      const res = await fetch("/api/compression/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, mode: compressionMode }),
      });
      const data: CompressionPreviewResult & { error?: string } = await res.json();
      if (!res.ok) throw new Error(data.error ?? t("compressionPreviewFailed"));
      setCompressionResult(data);
    } catch (e: unknown) {
      setCompressionError(sanitizeError(e));
    } finally {
      setCompressionLoading(false);
    }
  }, [hasInput, inputContent, compressionMode, t]);

  return (
    <div className="space-y-4">
      {/* Empty state */}
      {!hasInput && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-bg-subtle text-sm text-text-muted">
          <Icon name="info" size={16} />
          <span>{t("compressionEmptyHint")}</span>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        <Select
          value={compressionMode}
          onChange={(e) => setCompressionMode(e.target.value)}
          options={COMPRESSION_MODES.map((value) => ({
            value,
            label: ts(COMPRESSION_MODE_LABEL_KEYS[value]),
          }))}
          className="text-sm"
          aria-label={t("compressionModeLabel")}
        />
        <Button
          icon="play_arrow"
          onClick={handleCompressionPreview}
          loading={compressionLoading}
          disabled={compressionLoading || !hasInput}
          className="text-sm"
        >
          {compressionLoading ? t("compressionPreviewing") : t("compressionPreviewButton")}
        </Button>
      </div>

      {/* Error */}
      {compressionError && (
        <div className="text-sm text-error" role="alert">
          {compressionError}
        </div>
      )}

      {/* Result grid — 4 cards */}
      {compressionResult && (
        <div className="space-y-3">
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
            data-testid="compression-result-grid"
          >
            <div className="card p-3 text-center bg-bg-subtle rounded-lg border border-border">
              <div className="text-xs text-text-muted">{t("compressionOriginal")}</div>
              <div className="text-lg font-bold">{compressionResult.originalTokens}</div>
              <div className="text-xs text-text-muted">{t("tokens")}</div>
            </div>
            <div className="card p-3 text-center bg-bg-subtle rounded-lg border border-border">
              <div className="text-xs text-text-muted">{t("compressionCompressed")}</div>
              <div className="text-lg font-bold">{compressionResult.compressedTokens}</div>
              <div className="text-xs text-text-muted">{t("tokens")}</div>
            </div>
            <div className="card p-3 text-center bg-bg-subtle rounded-lg border border-border">
              <div className="text-xs text-text-muted">{t("compressionSaved")}</div>
              <div className="text-lg font-bold text-success">{compressionResult.tokensSaved}</div>
              <div className="text-xs text-text-muted">{compressionResult.savingsPct}%</div>
            </div>
            <div className="card p-3 text-center bg-bg-subtle rounded-lg border border-border">
              <div className="text-xs text-text-muted">{t("compressionDuration")}</div>
              <div className="text-lg font-bold">{compressionResult.durationMs}</div>
              <div className="text-xs text-text-muted">ms</div>
            </div>
          </div>

          {compressionResult.techniquesUsed.length > 0 && (
            <div className="text-xs text-text-muted">
              <span className="font-semibold">{t("techniques")}</span>{" "}
              {compressionResult.techniquesUsed.join(", ")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Accordion wrapper — owns open state to support D7 lazy-render + onOpenChange
// ---------------------------------------------------------------------------

/**
 * CompressionPreviewAccordion — F7
 *
 * Extracted from PlaygroundMode.tsx lines 506-584 (Compression Preview Panel).
 * A controlled kit `Disclosure`, so we can implement:
 *   - D7 lazy-render guard (the preview mounts only while open)
 *   - `onOpenChange` callback for deep-link URL sync
 *   - `forceOpen` prop for deep-link initial state
 */
export default function CompressionPreviewAccordion({
  forceOpen = false,
  onOpenChange,
  inputContent,
}: CompressionPreviewAccordionProps) {
  const t = useTranslations("translator");

  const [open, setOpen] = useState(forceOpen);
  // Track previous forceOpen so the effect only reacts to false→true transitions.
  // Without this, a manual close while forceOpen stays true would re-open the accordion
  // on the very next render (the test "toggle closes accordion again" guards this).
  const prevForceOpen = useRef(forceOpen);

  // Sync forceOpen changes from parent after mount (deep-link / back-forward navigation).
  useEffect(() => {
    const prev = prevForceOpen.current;
    prevForceOpen.current = Boolean(forceOpen);
    if (prev || !forceOpen) return;
    const openFromDeepLink = setTimeout(() => {
      setOpen(true);
      onOpenChange?.(true);
    }, 0);
    return () => clearTimeout(openFromDeepLink);
  }, [forceOpen, onOpenChange]);

  const handleOpenChange = useCallback(
    (next: boolean) => {
      setOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange]
  );

  const title = t("advancedCompressionTitle");
  const subtitle = t("advancedCompressionSubtitle");

  return (
    <Disclosure
      open={open}
      onOpenChange={handleOpenChange}
      className="rounded-lg border border-border bg-surface w-full"
      data-testid="compression-accordion"
    >
      <DisclosureTrigger className="gap-3 p-4">
        <span className="flex min-w-0 items-center gap-3">
          <Icon name="compress" size={18} className="text-text-muted" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-text-main">{title}</span>
            <span className="block truncate text-xs text-text-muted">{subtitle}</span>
          </span>
        </span>
      </DisclosureTrigger>

      {/* Content — D7 lazy-render: the kit renders children only while open. */}
      <DisclosureContent className="border-t border-border">
        <div id="compression-preview-content" className="p-4">
          <CompressionPreviewContent inputContent={inputContent} />
        </div>
      </DisclosureContent>
    </Disclosure>
  );
}
