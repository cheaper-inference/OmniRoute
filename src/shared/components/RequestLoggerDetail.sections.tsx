"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useTranslations } from "next-intl";
import { JsonView } from "@/shared/components/jsonView";
import { ChatBubble } from "@/app/(dashboard)/dashboard/tools/traffic-inspector/components/chat/ChatBubble";
import { buildRequestTurns, buildResponseTurns } from "@/mitm/inspector/conversationNormalizer";
import type { InterceptedRequest, NormalizedTurn } from "@/mitm/inspector/types";
import { useTheme } from "@/shared/hooks/useTheme";
import {
  useTimestampTitles,
  timestampMarkerCustomizeNode,
} from "@/shared/hooks/useTimestampTitles";
import { JsonTreeExpandControls } from "@/shared/components/JsonTreeExpandControls";
import { useJsonTreeExpandLevel } from "@/store/jsonTreeExpandStore";
import { cn } from "@/shared/utils/cn";
import Button from "./Button";
import Icon from "./Icon";
import {
  isPipelineSizeLimitMarker,
  isSizeLimitOmissionMarker,
} from "@/shared/constants/callLogSizeLimitMarkers";

// ─── Size-limit omission detection (#13894) ─────────────────────────────────
// A size-limited call-log artifact does not simply drop a payload -- it writes
// an explicit marker in its place (see callLogArtifacts.ts's
// omitOversizedPipeline()/buildMinimalArtifactForSizeLimit()). Before this fix
// the detail view fed that marker straight into the generic JSON/`<pre>`
// renderer, so a size-limit omission was indistinguishable from a real
// upstream error or a genuinely empty payload -- a silent fallback. These
// helpers turn the marker into an explicit, labeled notice instead.

/** Builds the pipeline payload sections, replacing the `error` marker object
 * left by a size-limited pipeline capture with an explicit notice entry
 * instead of letting it render as if it were a real pipeline error. */
export function buildPipelinePayloadSections(entries, pipelinePayloads) {
  return entries
    .map(([key, title]) => {
      const value = pipelinePayloads?.[key];
      if (key === "error" && isPipelineSizeLimitMarker(value)) {
        return { key, title, json: null, notice: true };
      }
      if (value === null || value === undefined) return { key, title, json: null, notice: false };
      let json;
      try {
        json = JSON.stringify(value, null, 2);
      } catch {
        json = String(value);
      }
      return { key, title, json, notice: false };
    })
    .filter((section) => section.json || section.notice);
}

/** True when a top-level requestBody/responseBody was replaced by the
 * size-limit omission placeholder string rather than genuinely absent. */
export function isBodySizeLimitOmission(value) {
  return isSizeLimitOmissionMarker(value);
}

// ─── Payload Code Block ─────────────────────────────────────────────────────
// Renders parsed payloads as a collapsible JSON tree (react18-json-view) so
// deeply nested request/response bodies (tool args, message arrays) can be
// collapsed instead of scrolled through as one raw text dump. Falls back to
// the plain <pre> dump for anything that isn't valid JSON (e.g. a captured
// error string), since json is display text sourced from JSON.stringify with
// a String() fallback on failure -- it is not guaranteed parseable.
// `notice`, when true, takes over rendering entirely: it means `json` is not a
// real payload but a size-limit omission marker (#13894) that must be shown as
// an explicit, labeled notice rather than a generic JSON/error dump.

export function PayloadSection({
  title,
  sectionId,
  json,
  notice = false,
  onCopy,
  collapsible = true,
  defaultOpen = true,
}) {
  const t = useTranslations("requestLogger.detail");
  const { isDark } = useTheme();
  const resolvedSectionId = sectionId || title;
  const expandLevel = useJsonTreeExpandLevel(resolvedSectionId);
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(defaultOpen);
  const treeContainerRef = useRef(null);

  const parsedJson = useMemo(() => {
    if (typeof json !== "string") return null;
    try {
      const value = JSON.parse(json);
      return value !== null && typeof value === "object" ? value : null;
    } catch {
      return null;
    }
  }, [json]);

  const handleCopy = async () => {
    const success = await onCopy();
    if (success !== false) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useTimestampTitles(treeContainerRef, open && parsedJson !== null);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <h3 className="text-[11px] text-text-muted uppercase tracking-wider font-bold">
            {title}
          </h3>
          {collapsible && (
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
          )}
        </div>
        <div className="flex items-center gap-2">
          {!notice && (
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
          )}
          {parsedJson !== null && <JsonTreeExpandControls sectionId={resolvedSectionId} />}
        </div>
      </div>
      {open && notice && (
        <div className="flex items-start gap-2 rounded-xl border border-warning/40 bg-warning/10 p-4 text-xs text-warning">
          <Icon name="warning" size={16} />
          <span>{t("payloadSizeLimitOmitted")}</span>
        </div>
      )}
      {open && !notice && parsedJson !== null && (
        <div
          ref={treeContainerRef}
          className="max-h-150 overflow-auto rounded-xl border border-border bg-surface-2 p-4 font-mono text-xs"
        >
          <JsonView
            src={parsedJson}
            dark={isDark}
            collapsed={expandLevel}
            customizeNode={timestampMarkerCustomizeNode}
            displaySize
          />
        </div>
      )}
      {open && !notice && parsedJson === null && (
        <pre className="max-h-150 overflow-x-auto overflow-y-auto whitespace-pre-wrap break-words rounded-xl border border-border bg-surface-2 p-4 font-mono text-xs leading-relaxed text-text-main">
          {json}
        </pre>
      )}
    </div>
  );
}

// ─── Conversation context section ───────────────────────────────────────────
// Renders THIS request's own context (its request body's messages/input, plus
// its response) — a plain single-request normalization, same shape as the
// traffic-inspector's ConversationTab, no cross-request reconstruction. While
// the request is still generating (detail.active === true) the response side
// shows the partial text captured so far, refreshed on a short poll scoped to
// just this section.
const CONVERSATION_ACTIVE_POLL_INTERVAL_MS = 1200;

function asInterceptedResponseBody(responseBody: unknown): InterceptedRequest {
  return {
    id: "",
    source: "custom-host",
    timestamp: "",
    method: "POST",
    host: "",
    path: "",
    requestHeaders: {},
    requestBody: null,
    requestSize: 0,
    responseHeaders: {},
    responseBody: responseBody != null ? JSON.stringify(responseBody) : null,
    responseSize: 0,
    status: 0,
    detectedKind: "llm",
  };
}

export function ConversationContextSection({ log, detail }) {
  const t = useTranslations("requestLogger.detail");
  const [open, setOpen] = useState(true);
  const [liveDetail, setLiveDetail] = useState(detail);
  const [liveRefresh, setLiveRefresh] = useState(() => {
    try {
      const v = localStorage.getItem("pref:conversationContext:liveRefresh");
      return v == null ? true : v === "1";
    } catch {
      return true;
    }
  });
  const turnsBoxRef = useRef<HTMLDivElement>(null);

  // Adjust state when the `detail` prop changes (render-time adjustment per
  // react.dev "You Might Not Need an Effect" — replaces the old mirror effect).
  const [prevDetail, setPrevDetail] = useState(detail);
  if (detail !== prevDetail) {
    setPrevDetail(detail);
    setLiveDetail(detail);
  }

  // Same live-poll pattern as the SSE Events section (StreamSection below),
  // but gated on liveRefresh too: an active request keeps generating either
  // way, this toggle only controls whether THIS panel keeps fetching/
  // redrawing while the user reads it.
  useEffect(() => {
    if (!liveDetail?.active || !liveRefresh) return;
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const tick = () => {
      if (cancelled) return;
      if (document.visibilityState !== "visible") {
        timeoutId = setTimeout(tick, CONVERSATION_ACTIVE_POLL_INTERVAL_MS);
        return;
      }
      fetch(`/api/logs/${log.id}`, { cache: "no-store" })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (cancelled || !data) return;
          setLiveDetail(data);
          if (data.active) timeoutId = setTimeout(tick, CONVERSATION_ACTIVE_POLL_INTERVAL_MS);
        })
        .catch(() => {
          timeoutId = setTimeout(tick, CONVERSATION_ACTIVE_POLL_INTERVAL_MS);
        });
    };

    timeoutId = setTimeout(tick, CONVERSATION_ACTIVE_POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [liveDetail?.active, liveRefresh, log.id]);

  const toggleLiveRefresh = () => {
    const next = !liveRefresh;
    setLiveRefresh(next);
    try {
      localStorage.setItem("pref:conversationContext:liveRefresh", next ? "1" : "0");
    } catch {}
  };

  const scrollToBottom = () => {
    const el = turnsBoxRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      try {
        el.scrollTop = el.scrollHeight;
      } catch {}
    });
  };

  const requestBody =
    liveDetail?.requestBody ?? liveDetail?.pipelinePayloads?.clientRequest ?? null;
  const requestTurns = buildRequestTurns(requestBody) ?? [];

  const responseBody = liveDetail?.responseBody ?? null;
  const responseTurns: NormalizedTurn[] =
    responseBody != null
      ? buildResponseTurns(asInterceptedResponseBody(responseBody))
      : liveDetail?.partialAssistantText
        ? [
            {
              role: "assistant",
              blocks: [{ type: "text", text: liveDetail.partialAssistantText }],
            },
          ]
        : [];

  const allTurns: NormalizedTurn[] = [...requestTurns, ...responseTurns];

  // Follow new content as it streams in — same idea as StreamSection's
  // autoscroll effect, tied to the same liveRefresh toggle.
  useEffect(() => {
    if (!liveRefresh || !open) return;
    scrollToBottom();
  }, [allTurns.length, liveDetail?.partialAssistantText, liveRefresh, open]);

  if (allTurns.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <h3 className="text-[11px] text-text-muted uppercase tracking-wider font-bold">
            {t("conversationContext")}
          </h3>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setOpen((v) => !v)}
            className="size-6 min-h-6 text-text-muted"
            aria-expanded={open}
            aria-label={
              open
                ? t("collapse", { title: t("conversationContext") })
                : t("expand", { title: t("conversationContext") })
            }
          >
            <Icon name={open ? "expand_less" : "expand_more"} size={16} />
          </Button>
          {liveDetail?.parentLogId && (
            // Full navigation, not client-side routing: the logs page only reads
            // ?id from a fresh mount (useState(() => searchParams.get("id")) in
            // dashboard/logs/page.tsx), so an in-page route change wouldn't load
            // the parent entry if the user is already on this page.
            <a
              href={`/dashboard/logs?id=${encodeURIComponent(liveDetail.parentLogId)}`}
              className="flex items-center gap-1 text-[11px] text-text-muted hover:text-primary transition-colors"
              title={t("continuesFrom", { id: liveDetail.parentLogId })}
            >
              <Icon name="reply" size={14} />
              {t("continuesFromParent")}
            </a>
          )}
          {liveDetail?.sessionTag && (
            // /dashboard/conversations reads its own `?tree=<id>` deep-link param
            // from a fresh mount too (useState(() => searchParams.get("tree")) in
            // that page) -- same full-navigation reasoning as the parent-log link
            // above. sessionTag is the same conv_<id> the conversations list and
            // /api/conversations/[id]/tree both key on.
            <a
              href={`/dashboard/conversations?tree=${encodeURIComponent(liveDetail.sessionTag)}`}
              className="flex items-center gap-1 text-[11px] text-text-muted hover:text-primary transition-colors"
              title={t("openConversation", { id: liveDetail.sessionTag })}
            >
              <Icon name="forum" size={14} />
              {t("viewConversation")}
            </a>
          )}
        </div>
        {open && (
          <div className="flex items-center gap-1">
            {liveDetail?.active && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={toggleLiveRefresh}
                title={liveRefresh ? t("liveRefreshOn") : t("liveRefreshOff")}
                // Static name + aria-pressed carries the on/off state ("Live refresh, pressed");
                // the stateful wording stays in the tooltip.
                aria-label={t("liveRefresh")}
                className={cn("size-7 min-h-7", liveRefresh ? "text-primary" : "text-text-muted")}
                aria-pressed={liveRefresh}
              >
                <Icon name={liveRefresh ? "sync" : "sync_disabled"} size={18} />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={scrollToBottom}
              title={t("goToBottom")}
              className="size-7 min-h-7 text-text-muted"
              aria-label={t("goToBottom")}
            >
              <Icon name="vertical_align_bottom" size={18} />
            </Button>
          </div>
        )}
      </div>
      {open && (
        <div
          ref={turnsBoxRef}
          className="max-h-150 space-y-2 overflow-y-auto rounded-xl border border-border bg-surface-2 p-3"
        >
          {allTurns.map((turn, i) => (
            <ChatBubble key={i} turn={turn} />
          ))}
        </div>
      )}
    </div>
  );
}
