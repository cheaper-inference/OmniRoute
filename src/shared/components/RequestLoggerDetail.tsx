"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { JsonView } from "@/shared/components/jsonView";
import { PROVIDER_COLORS, getProtocolColor } from "@/shared/constants/colors";
import { formatDuration, formatApiKeyLabel, maskAccount } from "@/shared/utils/formatting";
import { formatErrorForDisplay, formatReasoningStat } from "@/shared/utils/formatting";
import { useTheme } from "@/shared/hooks/useTheme";
import {
  useTimestampTitles,
  timestampMarkerCustomizeNode,
} from "@/shared/hooks/useTimestampTitles";
import { JsonTreeExpandControls } from "@/shared/components/JsonTreeExpandControls";
import { CallContentProvenanceBadges } from "@/shared/components/CallContentProvenanceBadges";
import { useJsonTreeExpandLevel } from "@/store/jsonTreeExpandStore";
import {
  PayloadSection,
  ConversationContextSection,
  buildPipelinePayloadSections,
  isBodySizeLimitOmission,
} from "@/shared/components/RequestLoggerDetail.sections";
import { getResilienceBadges } from "@/shared/components/requestLoggerResilience";
import { cn } from "@/shared/utils/cn";
import Badge from "./Badge";
import Button from "./Button";
import Icon from "./Icon";

// HTTP status → kit Badge tone (2xx success, 4xx warning, 5xx error).
function httpStatusTone(status: number) {
  if (status >= 200 && status < 300) return "success" as const;
  if (status >= 400 && status < 500) return "warning" as const;
  if (status >= 500) return "error" as const;
  if (status === 0) return "info" as const;
  return "default" as const;
}

// ─── Copy-all composition ────────────────────────────────────────────────────
// Compose every visible payload section + stream chunk into a single block so
// users can copy the whole request/response transcript with one click instead
// of copying each section individually. Pure function, exported for tests.
type CopyAllSection = { title: string; json: string };
type CopyAllInput = {
  sections: CopyAllSection[];
  streamChunks?: Record<string, string | string[]>;
  legacyResponse?: string | null;
  legacyRequest?: string | null;
  legacyResponseTitle?: string;
  legacyRequestTitle?: string;
};

export function buildCopyAllText({
  sections,
  streamChunks,
  legacyResponse,
  legacyRequest,
  legacyResponseTitle = "Response",
  legacyRequestTitle = "Request",
}: CopyAllInput): string {
  const parts: string[] = [];
  const streamNames: Array<[string, string | string[] | undefined]> = [
    ["provider", streamChunks?.provider],
    ["client", streamChunks?.client],
    ["openai", streamChunks?.openai],
  ];

  for (const [name, value] of streamNames) {
    if (value == null) continue;
    const body = Array.isArray(value) ? value.join("") : String(value);
    if (!body) continue;
    parts.push(`### ${name.toUpperCase()} STREAM\n${body}`);
  }

  for (const section of sections) {
    parts.push(`### ${section.title}\n${section.json}`);
  }

  if (sections.length === 0 && legacyResponse) {
    parts.push(`### ${legacyResponseTitle}\n${legacyResponse}`);
  }
  if (sections.length === 0 && legacyRequest) {
    parts.push(`### ${legacyRequestTitle}\n${legacyRequest}`);
  }

  return parts.join("\n\n---\n\n");
}

// ─── Stream section + Detail Modal ───────────────────────────────────────────────────────────

// Raw stream chunks are captured at the network level (see streamChunks
// capture) with a `[HH:MM:SS.mmm] ` prefix inserted per chunk boundary, which
// can land mid-token inside an SSE event's JSON payload once chunks are
// joined. Strip those markers first so a `data:` line isn't interrupted.
const STREAM_TIMESTAMP_PREFIX = /\[\d{2}:\d{2}:\d{2}\.\d{3}\] /g;

type StreamSegment =
  { type: "text"; value: string } | { type: "json"; value: unknown; raw: string };

// Gemini's own stream-chunk capture concatenates multiple complete JSON
// objects back-to-back with no separator between them ("}{"), unlike the
// SSE blank-line-per-event framing every other provider's capture uses
// here. A `data:` payload can therefore hold several complete top-level
// JSON values, not one -- JSON.parse correctly rejects the whole thing
// ("Unexpected non-whitespace character after JSON") and used to make the
// entire payload fall back to plain text. Recover by scanning bracket/
// string depth to split the payload into individual JSON values instead of
// assuming exactly one JSON.parse per payload; each recovered value renders
// as its own collapsible node.
export function splitConcatenatedJsonValues(payload: string): unknown[] | null {
  const values: unknown[] = [];
  let i = 0;
  const len = payload.length;
  while (i < len) {
    while (i < len && /\s/.test(payload[i])) i++;
    if (i >= len) break;
    const start = i;
    if (payload[i] !== "{" && payload[i] !== "[") return null; // not a bare-value stream
    let depth = 0;
    let inString = false;
    let escaped = false;
    for (; i < len; i++) {
      const ch = payload[i];
      if (inString) {
        if (escaped) escaped = false;
        else if (ch === "\\") escaped = true;
        else if (ch === '"') inString = false;
        continue;
      }
      if (ch === '"') inString = true;
      else if (ch === "{" || ch === "[") depth++;
      else if (ch === "}" || ch === "]") {
        depth--;
        if (depth === 0) {
          i++;
          break;
        }
      }
    }
    if (depth !== 0) return null; // unterminated -- a genuinely incomplete capture, not this case
    try {
      values.push(JSON.parse(payload.slice(start, i)));
    } catch {
      return null;
    }
  }
  return values.length > 1 ? values : null;
}

// Splits a raw joined SSE capture into renderable segments: each `data:`
// line that parses as JSON becomes its own segment (rendered as a
// collapsible tree), everything else (comments, keep-alives, [DONE],
// non-JSON payloads) stays as plain text, byte-identical to the raw capture.
export function parseStreamIntoSegments(joined: string): StreamSegment[] {
  const text = joined.replace(STREAM_TIMESTAMP_PREFIX, "");
  const events = text.split(/(?<=\n\n)/); // keep event boundaries, preserve exact text
  const segments: StreamSegment[] = [];
  for (const event of events) {
    if (!event) continue;
    const dataLines = event
      .split("\n")
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).trim());
    const payload = dataLines.join("");
    if (dataLines.length === 0 || !payload || payload === "[DONE]") {
      segments.push({ type: "text", value: event });
      continue;
    }
    try {
      segments.push({ type: "json", value: JSON.parse(payload), raw: event });
    } catch {
      const values = splitConcatenatedJsonValues(payload);
      if (values) {
        for (const value of values) segments.push({ type: "json", value, raw: event });
      } else {
        segments.push({ type: "text", value: event });
      }
    }
  }
  return segments;
}

function StreamSection({ title, sectionId, json, onCopy }) {
  const t = useTranslations("requestLogger.detail");
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(true);
  const [autoscroll, setAutoscroll] = useState(() => {
    try {
      const v = localStorage.getItem("pref:stream:autoscroll");
      return v == null ? true : v === "1";
    } catch {
      return true;
    }
  });
  // Default to the rendered/parsed view (segments below) -- raw is an
  // explicit opt-in for inspecting exactly what was captured on the wire,
  // timestamp markers and all, when the rendered tree hides something the
  // parser got wrong (e.g. a chunk-boundary split like this PR fixes).
  const [showRaw, setShowRaw] = useState(() => {
    try {
      return localStorage.getItem("pref:stream:raw") === "1";
    } catch {
      return false;
    }
  });
  const ref = useRef(null);
  const { isDark } = useTheme();
  const resolvedSectionId = sectionId || title;
  const expandLevel = useJsonTreeExpandLevel(resolvedSectionId);
  const segments = useMemo(() => parseStreamIntoSegments(json), [json]);

  const handleCopy = async () => {
    const success = await onCopy();
    if (success !== false) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    if (!autoscroll || !open) return;
    const el = ref.current;
    if (!el) return;
    // scroll on next animation frame to avoid layout thrash
    requestAnimationFrame(() => {
      try {
        el.scrollTop = el.scrollHeight;
      } catch {}
    });
  }, [json, autoscroll, open]);

  const toggleAutoscroll = () => {
    const next = !autoscroll;
    setAutoscroll(next);
    try {
      localStorage.setItem("pref:stream:autoscroll", next ? "1" : "0");
    } catch {}
  };

  const toggleRaw = () => {
    const next = !showRaw;
    setShowRaw(next);
    try {
      localStorage.setItem("pref:stream:raw", next ? "1" : "0");
    } catch {}
  };

  useTimestampTitles(ref, open);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <h3 className="text-[11px] text-text-muted uppercase tracking-wider font-bold">
            {title}
          </h3>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setOpen((v) => !v)}
            className="size-6 min-h-6 text-text-muted"
            aria-expanded={open}
            aria-label={open ? t("collapse", { title }) : t("expand", { title })}
          >
            <Icon name={open ? "expand_less" : "expand_more"} size={16} />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggleRaw}
            title={showRaw ? t("rawViewOn") : t("rawViewOff")}
            aria-label={showRaw ? t("rawViewOn") : t("rawViewOff")}
            className={cn("size-7 min-h-7", showRaw ? "text-primary" : "text-text-muted")}
            aria-pressed={showRaw}
          >
            <Icon name="code" size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggleAutoscroll}
            title={autoscroll ? t("autoscrollOn") : t("autoscrollOff")}
            aria-label={autoscroll ? t("autoscrollOn") : t("autoscrollOff")}
            className={cn("size-7 min-h-7", autoscroll ? "text-primary" : "text-text-muted")}
            aria-pressed={autoscroll}
          >
            <Icon name="vertical_align_bottom" size={18} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-7 min-h-7 px-2 text-xs text-text-muted"
            aria-label={t("copyTitle", { title })}
          >
            <Icon name={copied ? "check" : "content_copy"} size={14} />
            {copied ? t("copied") : t("copy")}
          </Button>
          {!showRaw && segments.some((s) => s.type === "json") && (
            <JsonTreeExpandControls sectionId={resolvedSectionId} />
          )}
        </div>
      </div>
      {open && (
        <div
          ref={ref}
          className="max-h-150 overflow-x-auto overflow-y-auto rounded-xl border border-border bg-surface-2 p-4 font-mono text-xs leading-relaxed text-text-main"
        >
          {showRaw ? (
            <pre className="whitespace-pre-wrap break-words">{json}</pre>
          ) : (
            segments.map((segment, i) =>
              segment.type === "json" ? (
                <div key={i} className="my-1">
                  <JsonView
                    src={segment.value}
                    dark={isDark}
                    collapsed={expandLevel}
                    customizeNode={timestampMarkerCustomizeNode}
                    displaySize
                  />
                </div>
              ) : (
                <span key={i} className="whitespace-pre-wrap break-words">
                  {segment.value}
                </span>
              )
            )
          )}
        </div>
      )}
    </div>
  );
}

// ─── Detail Modal ───────────────────────────────────────────────────────────

type StreamChunks = Record<string, string | string[]>;

function getCodexAccountRotation(detail) {
  const sources = [detail?.requestBody, detail?.responseBody];

  for (const source of sources) {
    const meta = source?._omniroute;
    const rotation = meta?.codexAccountRotation;
    if (
      rotation &&
      typeof rotation.initialConnectionId === "string" &&
      typeof rotation.finalConnectionId === "string" &&
      rotation.initialConnectionId !== rotation.finalConnectionId
    ) {
      return rotation;
    }
  }

  return null;
}

function formatConnectionId(value) {
  if (typeof value !== "string" || value.length === 0) return "-";
  return value.length > 8 ? `${value.slice(0, 8)}...` : value;
}

export default function RequestLoggerDetail({
  log,
  detail,
  loading,
  debugEnabled,
  emailsVisible = false,
  onClose,
  onCopy,
  onPrevious,
  onNext,
  relatedLogs = [],
  onSelectRelated,
}) {
  const t = useTranslations("requestLogger.detail");
  // #13130: the grid's TTFT column label doubles as the detail-tile label
  // (the key already ships in every locale under requestLogger.columns).
  const tColumns = useTranslations("requestLogger.columns");
  const locale = useLocale();
  const modalScrollRef = useRef(null);
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    globalThis.addEventListener("keydown", handler);
    return () => globalThis.removeEventListener("keydown", handler);
  }, [onClose]);

  // The overlay is full-viewport, but the modal panel itself is centered and
  // narrower than the viewport (max-w-225), leaving backdrop margin on every
  // side. A wheel event there has no scrollable target under the cursor, so
  // scrolling only worked once the pointer happened to be over the panel's
  // own content. Forward wheel scrolling from anywhere in the overlay to the
  // panel instead, so the backdrop margin scrolls it too.
  const handleOverlayWheel = (e) => {
    const panel = modalScrollRef.current;
    // Let native scrolling handle wheel events that already land inside the
    // panel -- only forward the ones from the backdrop margin around it.
    if (!panel || panel.contains(e.target)) return;
    panel.scrollTop += e.deltaY;
    e.preventDefault();
  };

  const protocolKey = log.sourceFormat || log.provider;
  const protocol = getProtocolColor(protocolKey, log.provider);
  const providerColor = PROVIDER_COLORS[log.provider] || {
    bg: "#374151",
    text: "#fff",
    label: (log.provider || "-").toUpperCase(),
  };
  const providerLabel = log.providerDisplay || providerColor.label;

  const [unblocking, setUnblocking] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  // #7920 gave this component formatErrorForDisplay for structured error objects, but the
  // #8213 combo/cooldown checks below went straight to the raw field and call
  // .toLowerCase() on it — which throws the moment `error` is an object. Same helper,
  // same normalization, one source of truth.
  const errorText = formatErrorForDisplay(detail?.error || log.error) ?? "";
  const isCombo503 =
    log.status === 503 && errorText.toLowerCase().includes("all targets exhausted");
  const isModelCooldown = !isCombo503 && errorText.toLowerCase().includes("cooling down");

  const [unblockAllBusy, setUnblockAllBusy] = useState(false);

  const handleUnblockModel = async () => {
    if (!log.provider || !log.model) return;
    setUnblocking(true);
    try {
      const res = await fetch("/api/resilience/model-cooldowns", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: log.provider, model: log.model }),
      });
      if (res.ok) setCleared(true);
    } catch {
      /* ignore */
    } finally {
      setUnblocking(false);
    }
  };

  const handleUnblockAll = async () => {
    setUnblockAllBusy(true);
    try {
      const res = await fetch("/api/resilience/model-cooldowns", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ all: true }),
      });
      if (res.ok) setCleared(true);
    } catch {
      /* ignore */
    } finally {
      setUnblockAllBusy(false);
    }
  };

  const providerStatus = detail?.pipelinePayloads?.providerResponse?.status;
  const hasStatusDiscrepancy = providerStatus && providerStatus !== log.status;

  const formatDate = (iso) => {
    if (iso == null) return "\u2014";
    try {
      const d = new Date(iso);
      if (!Number.isFinite(d.getTime())) return "\u2014";
      return d.toLocaleString(locale, {
        dateStyle: "short",
        timeStyle: "medium",
        hour12: false,
      });
    } catch {
      return "\u2014";
    }
  };

  const toPrettyJson = (payload) => {
    if (payload === null || payload === undefined) return null;
    try {
      return JSON.stringify(payload, null, 2);
    } catch {
      return String(payload);
    }
  };

  const pipelinePayloads = detail?.pipelinePayloads || null;
  const payloadSections = pipelinePayloads
    ? buildPipelinePayloadSections(
        [
          ["clientRawRequest", t("payload.clientRawRequest")],
          ["clientRequest", t("payload.clientRequest")],
          ["openaiRequest", t("payload.openaiRequest")],
          ["providerRequest", t("payload.providerRequest")],
          ["providerResponse", t("payload.providerResponse")],
          ["clientResponse", t("payload.clientResponse")],
          ["error", t("payload.pipelineError")],
        ],
        pipelinePayloads
      )
    : [];
  const requestBodyOmitted = isBodySizeLimitOmission(detail?.requestBody);
  const responseBodyOmitted = isBodySizeLimitOmission(detail?.responseBody);
  const requestJson = detail?.requestBody ? toPrettyJson(detail.requestBody) : null;
  const responseJson = detail?.responseBody ? toPrettyJson(detail.responseBody) : null;
  const streamChunks = (() => {
    if (!debugEnabled || !detail?.pipelinePayloads?.streamChunks) return null;
    let chunks: StreamChunks = detail.pipelinePayloads.streamChunks;
    if (typeof chunks === "string") {
      try {
        chunks = JSON.parse(chunks);
      } catch {
        return null;
      }
    }
    if (chunks && typeof chunks === "object") return chunks;
    return null;
  })();

  // Compose every visible payload section + stream chunk into a single block so
  // users can copy the whole request/response transcript with one click instead
  // of copying each section individually.
  const handleCopyAll = async () => {
    const text = buildCopyAllText({
      sections: payloadSections,
      streamChunks: streamChunks || undefined,
      legacyResponse: payloadSections.length === 0 ? responseJson : null,
      legacyRequest: payloadSections.length === 0 ? requestJson : null,
      legacyResponseTitle: t("responsePayloadLegacy"),
      legacyRequestTitle: t("requestPayloadLegacy"),
    });
    if (!text) return;
    const success = await onCopy(text);
    if (success !== false) {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    }
  };
  const detailIssue =
    detail?.detailState === "missing"
      ? t("payloadMissing")
      : detail?.detailState === "corrupt"
        ? t("payloadCorrupt")
        : null;
  const tokenStats = {
    totalIn: detail?.tokens?.in ?? log.tokens?.in ?? null,
    totalOut: detail?.tokens?.out ?? log.tokens?.out ?? null,
    cacheRead: detail?.tokens?.cacheRead ?? log.tokens?.cacheRead,
    cacheWrite: detail?.tokens?.cacheWrite ?? log.tokens?.cacheWrite,
    reasoning: detail?.tokens?.reasoning ?? log.tokens?.reasoning,
    reasoningChars: detail?.reasoningChars ?? log.reasoningChars,
    compressed: detail?.tokens?.compressed ?? log.tokens?.compressed,
  };

  const formatTokenValue = (value) => (value != null ? value.toLocaleString() : t("notAvailable"));

  const cacheSource = detail?.cacheSource || log.cacheSource || "upstream";
  const cacheSourceLabel = cacheSource === "semantic" ? t("semanticCache") : t("upstreamCache");
  const cacheSourceClassName =
    cacheSource === "semantic"
      ? "bg-success/20 text-success border-success/30"
      : "bg-info/20 text-info border-info/30";
  // resilience badges (flag alone decides, whatever the status).
  const resilienceBadges = getResilienceBadges(
    log.resilienceActions || detail?.resilienceActions || null,
    (key, values) => t(key as never, values as never)
  );
  const accountLabel = maskAccount(detail?.account || log.account, emailsVisible);
  const codexAccountRotation = getCodexAccountRotation(detail);
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-2 pt-[5vh] sm:px-4"
      onClick={onClose}
      onWheel={handleOverlayWheel}
      role="dialog"
      aria-modal="true"
      aria-label={t("ariaLabel")}
    >
      <div className="absolute inset-0 bg-[var(--ci-color-overlay)] backdrop-blur-sm" />
      <div
        ref={modalScrollRef}
        className="relative w-full max-w-225 max-h-[90vh] overflow-x-hidden overflow-y-auto rounded-xl border border-border bg-bg-primary shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-3 border-b border-border bg-bg-primary/95 backdrop-blur-sm rounded-t-xl sm:px-6 sm:py-4">
          <div className="flex flex-wrap items-center gap-2 min-w-0 sm:gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                {log.active ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold bg-warning/20 text-warning border border-warning/30">
                    <span className="inline-block h-3 w-3 rounded-full border-2 border-current border-t-transparent animate-spin" />
                  </span>
                ) : log.status === 0 ? (
                  <span className="inline-block px-2.5 py-1 rounded text-xs font-bold bg-success/20 text-success border border-success/30">
                    {t("completed")}
                  </span>
                ) : (
                  <Badge variant={httpStatusTone(log.status)} className="font-bold">
                    {log.status}
                  </Badge>
                )}
                {hasStatusDiscrepancy && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-bg-subtle border border-border text-text-muted">
                    {t("upstreamStatus", { status: providerStatus })}
                  </span>
                )}
                {log.method && <span className="font-bold text-lg">{log.method}</span>}
              </div>
              {hasStatusDiscrepancy && (
                <span className="text-[10px] text-warning font-medium mt-0.5">
                  {t("statusDiscrepancy", { status: log.status, provider: providerStatus })}
                </span>
              )}
            </div>
            <span className="text-text-muted font-mono text-sm self-center ml-2">{log.path}</span>
            {log.id && (
              <span className="text-[10px] text-text-muted/50 font-mono self-center ml-2 px-1.5 py-0.5 rounded bg-bg-subtle border border-border/40 select-all">
                {log.id}
              </span>
            )}
            {log.correlationId && (
              <span
                className="text-[10px] text-text-muted/50 font-mono self-center ml-2 px-1.5 py-0.5 rounded bg-bg-subtle border border-border/40 select-all"
                title={t("correlationId")}
              >
                {t("correlationIdValue", { id: log.correlationId })}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyAll}
              className="text-text-muted"
              aria-label={t("copyAll")}
              title={t("copyAll")}
            >
              <Icon name={copiedAll ? "check" : "content_copy"} size={16} />
              <span className="text-xs font-medium">
                {copiedAll ? t("copiedAll") : t("copyAll")}
              </span>
            </Button>
            {/* Only rendered when a caller actually wires up navigation (RequestLoggerV2's
                list view) — a caller with no ordered-list context to navigate through
                (conversations page, RequestTimeline) passes neither, so there's nothing
                to show instead of a permanently-disabled dead button. */}
            {(onPrevious || onNext) && (
              <>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={onPrevious}
                  disabled={!onPrevious}
                  className="text-text-muted"
                  aria-label={t("previousRequest")}
                >
                  <Icon name="chevron_left" size={18} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={onNext}
                  disabled={!onNext}
                  className="text-text-muted"
                  aria-label={t("nextRequest")}
                >
                  <Icon name="chevron_right" size={18} />
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onClose}
              className="text-text-muted"
              aria-label={t("close")}
            >
              <Icon name="close" />
            </Button>
          </div>
        </div>

        <div className="p-4 flex flex-col gap-6 sm:p-6">
          {/* Metadata Grid */}
          {log.active ? (
            <div className="flex flex-wrap gap-4 p-4 bg-bg-subtle rounded-xl border border-border">
              <div className="min-w-[140px] flex-1">
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  {t("startedAt")}
                </div>
                <div className="text-sm font-medium">{formatDate(log.timestamp)}</div>
              </div>
              <div className="min-w-[100px] flex-1">
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  {t("duration")}
                </div>
                <div className="text-sm font-medium">{formatDuration(log.duration)}</div>
              </div>
              <div className="min-w-[100px] flex-1">
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  {t("addedWait")}
                </div>
                <div className="text-sm font-medium">
                  {typeof log.addedWaitMs === "number" && log.addedWaitMs > 0
                    ? `${formatDuration(log.addedWaitMs)}${log.addedWaitCause ? ` (${log.addedWaitCause})` : ""}`
                    : "—"}
                </div>
              </div>
              <div className="min-w-[140px] flex-1">
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  {t("model")}
                </div>
                <div className="text-sm font-medium text-primary font-mono">{log.model}</div>
              </div>
              <div className="min-w-[120px] flex-1">
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  {t("provider")}
                </div>
                <span
                  className="inline-block px-2.5 py-1 rounded text-[10px] font-bold uppercase"
                  style={{ backgroundColor: providerColor.bg, color: providerColor.text }}
                >
                  {providerLabel}
                </span>
              </div>
              <div className="min-w-[120px] flex-1">
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  {t("account")}
                </div>
                <div className="text-sm font-medium">{accountLabel}</div>
              </div>
            </div>
          ) : (
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-bg-subtle rounded-xl border border-border"
              data-testid="request-log-metadata-grid"
            >
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  {t("startedAt")}
                </div>
                <div className="text-sm font-medium">
                  {(() => {
                    try {
                      const ts = new Date(log.timestamp).getTime();
                      if (!Number.isFinite(ts)) return "\u2014";
                      return formatDate(new Date(ts - (log.duration || 0)).toISOString());
                    } catch {
                      return "\u2014";
                    }
                  })()}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  {t("endedAt")}
                </div>
                <div className="text-sm font-medium">{formatDate(log.timestamp)}</div>
              </div>
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  {t("duration")}
                </div>
                <div className="text-sm font-medium">{formatDuration(log.duration)}</div>
              </div>
              {typeof log.ttft === "number" && log.ttft > 0 && (
                <div>
                  <div
                    className="text-[10px] text-text-muted uppercase tracking-wider mb-1"
                    title={`${tColumns("ttft")}: time to first forwarded stream token; generation ran for ${formatDuration(Math.max(0, (log.duration || 0) - log.ttft))} (#13130)`}
                  >
                    {tColumns("ttft")}
                  </div>
                  <div className="text-sm font-medium">{formatDuration(log.ttft)}</div>
                </div>
              )}
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  {t("input")}
                </div>
                <div
                  className="flex flex-wrap items-center gap-1.5"
                  data-testid="token-group-input"
                >
                  <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-xs font-bold">
                    {t("totalIn", { value: formatTokenValue(tokenStats.totalIn) })}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-info/20 text-info text-xs font-bold">
                    {t("cacheRead", { value: formatTokenValue(tokenStats.cacheRead) })}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-warning/20 text-warning text-xs font-bold">
                    {t("cacheWrite", { value: formatTokenValue(tokenStats.cacheWrite) })}
                  </span>
                  {tokenStats.compressed != null &&
                    tokenStats.compressed > 0 &&
                    (() => {
                      const fromTokens = tokenStats.compressed + Math.max(0, tokenStats.totalIn);
                      const saved = Math.min(tokenStats.compressed, fromTokens);
                      const pct =
                        fromTokens > 0
                          ? Math.max(0, Math.min(100, Math.round((saved / fromTokens) * 100)))
                          : 100;
                      return (
                        <span className="px-2 py-0.5 rounded bg-chart-3/20 text-chart-3 text-xs font-bold">
                          {t("compressed", {
                            from: fromTokens.toLocaleString(),
                            to: Math.max(0, tokenStats.totalIn).toLocaleString(),
                            percent: pct,
                          })}
                        </span>
                      );
                    })()}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  {t("output")}
                </div>
                <div
                  className="flex flex-wrap items-center gap-1.5"
                  data-testid="token-group-output"
                >
                  <span className="px-2 py-0.5 rounded bg-success/20 text-success text-xs font-bold">
                    {t("totalOut", { value: formatTokenValue(tokenStats.totalOut) })}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-chart-3/20 text-chart-3 text-xs font-bold">
                    {t("reasoning", { value: formatReasoningStat(tokenStats, t) })}
                  </span>
                </div>
              </div>
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  {t("model")}
                </div>
                <div className="text-sm font-medium text-primary font-mono">{log.model}</div>
              </div>
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  {t("requestedModel")}
                </div>
                <div
                  className={`text-sm font-medium font-mono ${
                    (detail?.requestedModel || log.requestedModel) &&
                    (detail?.requestedModel || log.requestedModel) !== log.model
                      ? "text-warning"
                      : "text-text-muted"
                  }`}
                >
                  {detail?.requestedModel || log.requestedModel || "\u2014"}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  {t("provider")}
                </div>
                <span
                  className="inline-block px-2.5 py-1 rounded text-[10px] font-bold uppercase"
                  style={{ backgroundColor: providerColor.bg, color: providerColor.text }}
                >
                  {providerLabel}
                </span>
              </div>
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  {t("requestProtocol")}
                </div>
                <span
                  className="inline-block px-2.5 py-1 rounded text-[10px] font-bold uppercase"
                  style={{ backgroundColor: protocol.bg, color: protocol.text }}
                >
                  {protocol.label}
                </span>
              </div>
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  {t("cacheSource")}
                </div>
                <span
                  className={`inline-block px-2.5 py-1 rounded text-[10px] font-bold border ${cacheSourceClassName}`}
                >
                  {cacheSourceLabel}
                </span>
                {resilienceBadges.map((badge) => (
                  <span key={badge.key} title={badge.title}>
                    {badge.label}
                  </span>
                ))}
              </div>
              <CallContentProvenanceBadges
                hasContent={detail?.hasContent ?? log.hasContent}
                usageProvenance={detail?.usageProvenance ?? log.usageProvenance}
              />
              {(detail?.modelPinned || log.modelPinned) && (
                <div>
                  <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                    {t("modelPinning")}
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold bg-chart-3/15 text-chart-3 border border-chart-3/25">
                    <Icon name="push_pin" size={12} />
                    {t("activeModelPinning")}
                  </span>
                </div>
              )}
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  {t("account")}
                </div>
                <div className="text-sm font-medium">{accountLabel}</div>
                {codexAccountRotation && (
                  <div
                    className="mt-1 text-[10px] text-warning font-mono"
                    title={`${codexAccountRotation.initialConnectionId} -> ${codexAccountRotation.finalConnectionId}`}
                  >
                    {t("rotated", {
                      initial: formatConnectionId(codexAccountRotation.initialConnectionId),
                      final: formatConnectionId(codexAccountRotation.finalConnectionId),
                    })}
                  </div>
                )}
              </div>
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  {t("apiKey")}
                </div>
                <div
                  className="text-sm font-medium"
                  title={
                    detail?.apiKeyName ||
                    detail?.apiKeyId ||
                    log.apiKeyName ||
                    log.apiKeyId ||
                    t("noApiKey")
                  }
                >
                  {formatApiKeyLabel(
                    detail?.apiKeyName || log.apiKeyName,
                    detail?.apiKeyId || log.apiKeyId
                  )}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  {t("combo")}
                </div>
                {detail?.comboName || log.comboName ? (
                  <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-chart-3/20 text-chart-3 border border-chart-3/30">
                    {detail?.comboName || log.comboName}
                  </span>
                ) : (
                  <div className="text-sm text-text-muted">{"\u2014"}</div>
                )}
              </div>
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  {tColumns("conversation")}
                </div>
                {detail?.sessionTag || log.sessionTag ? (
                  <div
                    className="text-sm font-mono select-all"
                    title={detail?.sessionTag || log.sessionTag}
                  >
                    {(detail?.sessionTag || log.sessionTag).slice(0, 20)}
                    {"\u2026"}
                  </div>
                ) : (
                  <div className="text-sm text-text-muted">{"\u2014"}</div>
                )}
              </div>
            </div>
          )}

          {/* Error Message */}
          {(detail?.error || log.error) && (
            <div className="p-4 rounded-xl bg-error/10 border border-error/30">
              <div className="flex items-center justify-between mb-1">
                <div className="text-[10px] text-error uppercase tracking-wider font-bold">
                  {t("error")}
                </div>
                {isCombo503 && !cleared && (
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={handleUnblockAll}
                    disabled={unblockAllBusy}
                    className="h-7 min-h-7 px-2.5 text-[10px]"
                  >
                    <Icon name="lock_open" size={12} />
                    {unblockAllBusy ? "..." : t("unblockAll")}
                  </Button>
                )}
                {isCombo503 && cleared && (
                  <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium rounded-lg bg-success/10 border border-success/30 text-success">
                    <Icon name="check" size={10} />
                    {t("cleared")}
                  </span>
                )}
                {isModelCooldown && !cleared && (
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={handleUnblockModel}
                    disabled={unblocking}
                    className="h-7 min-h-7 px-2.5 text-[10px]"
                  >
                    <Icon name="lock_open" size={12} />
                    {unblocking ? "..." : t("unblock")}
                  </Button>
                )}
                {isModelCooldown && cleared && (
                  <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium rounded-lg bg-success/10 border border-success/30 text-success">
                    <Icon name="check" size={10} />
                    {t("cleared")}
                  </span>
                )}
              </div>
              <div className="text-sm text-error font-mono whitespace-pre-wrap break-words">
                {formatErrorForDisplay(detail?.error || log.error)}
              </div>
            </div>
          )}

          {/* Related Requests (same correlation ID) */}
          {relatedLogs.length > 1 && (
            <div className="p-4 rounded-xl bg-bg-subtle border border-border">
              <div className="text-[10px] text-text-muted uppercase tracking-wider mb-2 font-bold">
                {t("relatedRequests", { count: relatedLogs.length })}
              </div>
              <div className="flex flex-col gap-1">
                {[...relatedLogs]
                  .sort((a, b) => {
                    const aStart = new Date(a.timestamp).getTime() - (a.duration || 0);
                    const bStart = new Date(b.timestamp).getTime() - (b.duration || 0);
                    return aStart - bStart;
                  })
                  .map((r) => {
                    const isCurrent = r.id === log.id;
                    const startTime = new Date(new Date(r.timestamp).getTime() - (r.duration || 0));
                    return (
                      <Button
                        key={r.id}
                        variant="ghost"
                        size="sm"
                        onClick={() => !isCurrent && onSelectRelated?.(r)}
                        disabled={isCurrent}
                        aria-current={isCurrent ? "true" : undefined}
                        className={cn(
                          "h-auto w-full justify-start gap-2 px-2 py-1.5 text-left text-xs font-normal",
                          isCurrent && "border border-primary/30 bg-primary/10 disabled:opacity-100"
                        )}
                      >
                        <Badge
                          size="sm"
                          variant={r.active ? "default" : httpStatusTone(r.status)}
                          className="min-w-[28px] justify-center text-[9px] font-bold"
                        >
                          {r.status || "..."}
                        </Badge>
                        <span className="font-mono text-text-muted">{r.id}</span>
                        <span className="text-text-muted">{r.model}</span>
                        <span className="text-text-muted text-[10px]">
                          {startTime.toLocaleTimeString(locale, { hour12: false })}
                        </span>
                        <span className="text-text-muted ml-auto">
                          {formatDuration(r.duration)}
                        </span>
                        {isCurrent && (
                          <span className="text-[9px] text-primary font-bold ml-1">
                            {t("current")}
                          </span>
                        )}
                      </Button>
                    );
                  })}
              </div>
            </div>
          )}

          {detailIssue && (
            <div className="p-4 rounded-xl bg-warning/10 border border-warning/30">
              <div className="text-[10px] text-warning uppercase tracking-wider mb-1 font-bold">
                {t("detailStatus")}
              </div>
              <div className="text-sm text-warning">{detailIssue}</div>
            </div>
          )}

          {loading ? (
            <div className="p-8 text-center text-text-muted animate-pulse">
              {t("loadingDetails")}
            </div>
          ) : (
            <>
              <ConversationContextSection key={log.id} log={log} detail={detail} />

              {streamChunks && streamChunks.provider && (
                <StreamSection
                  title={t("providerEventStream")}
                  sectionId="providerEventStream"
                  json={
                    Array.isArray(streamChunks.provider)
                      ? streamChunks.provider.join("")
                      : String(streamChunks.provider)
                  }
                  onCopy={() =>
                    onCopy(
                      Array.isArray(streamChunks.provider)
                        ? streamChunks.provider.join("")
                        : String(streamChunks.provider)
                    )
                  }
                />
              )}

              {streamChunks && streamChunks.client && (
                <StreamSection
                  title={t("clientEventStream")}
                  sectionId="clientEventStream"
                  json={
                    Array.isArray(streamChunks.client)
                      ? streamChunks.client.join("")
                      : String(streamChunks.client)
                  }
                  onCopy={() =>
                    onCopy(
                      Array.isArray(streamChunks.client)
                        ? streamChunks.client.join("")
                        : String(streamChunks.client)
                    )
                  }
                />
              )}

              {streamChunks &&
                streamChunks.openai &&
                !streamChunks.provider &&
                !streamChunks.client && (
                  <StreamSection
                    title={t("eventStream")}
                    sectionId="eventStream"
                    json={
                      Array.isArray(streamChunks.openai)
                        ? streamChunks.openai.join("")
                        : String(streamChunks.openai)
                    }
                    onCopy={() =>
                      onCopy(
                        Array.isArray(streamChunks.openai)
                          ? streamChunks.openai.join("")
                          : String(streamChunks.openai)
                      )
                    }
                  />
                )}

              {payloadSections.length > 0 &&
                payloadSections.map((section) => (
                  <PayloadSection
                    key={section.key}
                    title={section.title}
                    sectionId={section.key}
                    json={section.json}
                    notice={section.notice}
                    onCopy={() => onCopy(section.json)}
                  />
                ))}

              {payloadSections.length === 0 && responseJson && (
                <PayloadSection
                  title={t("responsePayloadLegacy")}
                  sectionId="responsePayloadLegacy"
                  json={responseJson}
                  notice={responseBodyOmitted}
                  onCopy={() => onCopy(responseJson)}
                />
              )}

              {payloadSections.length === 0 && requestJson && (
                <PayloadSection
                  title={t("requestPayloadLegacy")}
                  sectionId="requestPayloadLegacy"
                  json={requestJson}
                  notice={requestBodyOmitted}
                  onCopy={() => onCopy(requestJson)}
                />
              )}

              {payloadSections.length === 0 && !requestJson && !responseJson && !loading && (
                <div className="p-6 text-center text-text-muted">
                  <Icon name="info" size={32} className="mb-2 block opacity-40" />
                  <p className="text-sm">{t("noPayload")}</p>
                  <p className="text-xs mt-1">{t("detailedPayloadInfo")}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
