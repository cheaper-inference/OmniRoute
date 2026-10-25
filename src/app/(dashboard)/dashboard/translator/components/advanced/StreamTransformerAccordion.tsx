"use client";

// Header toggle imports the Button module directly so tests can keep stubbing the barrel.
import HeaderButton from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { Button, Card } from "@/shared/components";
import { copyToClipboard } from "@/shared/utils/clipboard";
import { cn } from "@/shared/utils/cn";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import Textarea from "@/shared/components/Textarea";

// ─── Sample payloads ──────────────────────────────────────────────────────────

const SAMPLE_TEXT = `data: {"id":"chatcmpl_demo","object":"chat.completion.chunk","created":1745366400,"model":"gpt-4o-mini","choices":[{"index":0,"delta":{"role":"assistant","content":"Hello"},"finish_reason":null}]}

data: {"id":"chatcmpl_demo","object":"chat.completion.chunk","created":1745366400,"model":"gpt-4o-mini","choices":[{"index":0,"delta":{"content":" from OmniRoute"},"finish_reason":null}]}

data: {"id":"chatcmpl_demo","object":"chat.completion.chunk","created":1745366400,"model":"gpt-4o-mini","choices":[{"index":0,"delta":{},"finish_reason":"stop"}],"usage":{"prompt_tokens":12,"completion_tokens":4,"total_tokens":16}}

data: [DONE]
`;

const SAMPLE_TOOL = `data: {"id":"chatcmpl_tool","object":"chat.completion.chunk","created":1745366400,"model":"gpt-4o-mini","choices":[{"index":0,"delta":{"tool_calls":[{"index":0,"id":"call_123","type":"function","function":{"name":"lookup_weather","arguments":"{\\"city\\":\\"Tok"}}]},"finish_reason":null}]}

data: {"id":"chatcmpl_tool","object":"chat.completion.chunk","created":1745366400,"model":"gpt-4o-mini","choices":[{"index":0,"delta":{"tool_calls":[{"index":0,"function":{"arguments":"yo\\"}"}}]},"finish_reason":null}]}

data: {"id":"chatcmpl_tool","object":"chat.completion.chunk","created":1745366400,"model":"gpt-4o-mini","choices":[{"index":0,"delta":{},"finish_reason":"tool_calls"}],"usage":{"prompt_tokens":23,"completion_tokens":9,"total_tokens":32}}

data: [DONE]
`;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getFramePreview(data: unknown): string {
  if (typeof data === "string") return data;
  if (!data || typeof data !== "object") return "";

  const record = data as Record<string, unknown>;
  const delta = record.delta;
  if (typeof delta === "string") return delta;

  const item = record.item;
  if (item && typeof item === "object") {
    const itemRecord = item as Record<string, unknown>;
    const type = itemRecord.type;
    const text = itemRecord.text;
    const name = itemRecord.name;
    if (typeof text === "string" && text) return text;
    if (typeof name === "string" && name) return `${type || "item"}: ${name}`;
    if (typeof type === "string" && type) return type;
  }

  const text = record.text;
  if (typeof text === "string" && text) return text;

  return JSON.stringify(data).slice(0, 140);
}

function parseSseFrames(rawSse: string): Array<{ event: string; preview: string }> {
  return rawSse
    .split("\n\n")
    .map((frame) => frame.trim())
    .filter(Boolean)
    .map((frame) => {
      const eventLine = frame
        .split("\n")
        .find((line) => line.startsWith("event:"))
        ?.replace(/^event:\s*/, "")
        .trim();
      const dataLine = frame
        .split("\n")
        .find((line) => line.startsWith("data:"))
        ?.replace(/^data:\s*/, "");

      if (dataLine === "[DONE]") {
        return { event: "done", preview: "[DONE]" };
      }

      let parsedData: unknown = dataLine || "";
      try {
        parsedData = dataLine ? JSON.parse(dataLine) : "";
      } catch {
        parsedData = dataLine || "";
      }

      return {
        event: eventLine || "message",
        preview: getFramePreview(parsedData),
      };
    });
}

// ─── MiniStat ────────────────────────────────────────────────────────────────

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <div className="p-4">
        <p className="text-lg font-bold text-text-main">{value}</p>
        <p className="text-[10px] uppercase tracking-wider text-text-muted">{label}</p>
      </div>
    </Card>
  );
}

// ─── Props ───────────────────────────────────────────────────────────────────

export interface StreamTransformerAccordionProps {
  forceOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * Refactor of StreamTransformerMode wrapped in a Collapsible-style header with
 * lazy-render guard (D7): content only mounts after the section is first opened.
 *
 * Visual structure matches @/shared/components/Collapsible (variant="default") so
 * F9 can swap to the shared component without layout changes once Collapsible
 * gains an onOpenChange callback.
 */
export default function StreamTransformerAccordion({
  forceOpen,
  onOpenChange,
}: StreamTransformerAccordionProps) {
  const t = useTranslations("translator");

  const translateOrFallback = useCallback(
    (key: string, fallback: string, values?: Record<string, unknown>) => {
      try {
        const translated = t(key, values);
        return translated === key || translated === `translator.${key}` ? fallback : translated;
      } catch {
        return fallback;
      }
    },
    [t]
  );

  // ── Open state (controlled by forceOpen; local toggle otherwise) ──────────
  const [open, setOpen] = useState(Boolean(forceOpen));
  // D7 lazy-render guard: once mounted, keep content in DOM.
  const [hasOpened, setHasOpened] = useState(Boolean(forceOpen));
  // Track previous forceOpen so the effect only reacts to false→true transitions.
  // Without this, a manual close while forceOpen stays true would re-open the accordion
  // on the very next render.
  const prevForceOpen = useRef(Boolean(forceOpen));

  // Sync forceOpen changes from parent after mount (deep-link / back-forward navigation).
  useEffect(() => {
    const prev = prevForceOpen.current;
    prevForceOpen.current = Boolean(forceOpen);
    if (!prev && forceOpen) {
      setOpen(true);
      setHasOpened(true);
      onOpenChange?.(true);
    }
  }, [forceOpen, onOpenChange]);

  const handleToggle = useCallback(() => {
    const next = !open;
    setOpen(next);
    if (next) setHasOpened(true);
    onOpenChange?.(next);
  }, [open, onOpenChange]);

  // ── Transform state (only matters once content is mounted) ────────────────
  const [rawSse, setRawSse] = useState(SAMPLE_TEXT);
  const [transformedSse, setTransformedSse] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const transformedFrames = useMemo(() => parseSseFrames(transformedSse), [transformedSse]);
  const eventCount = transformedFrames.length;
  const uniqueEventCount = new Set(transformedFrames.map((frame) => frame.event)).size;

  const handleCopy = useCallback(async (value: string, field: string) => {
    await copyToClipboard(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  }, []);

  const runTransform = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/translator/transform-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawSse }),
      });
      const data = (await res.json()) as {
        success?: boolean;
        transformed?: string;
        error?: string;
      };

      if (!res.ok || !data.success) {
        // Hard Rule #12: display only the sanitized error string from buildErrorBody — no stack.
        const displayError = data.error
          ? String(data.error)
          : translateOrFallback("requestFailed", "Request failed");
        throw new Error(displayError);
      }

      setTransformedSse(data.transformed || "");
    } catch (err) {
      const raw =
        err instanceof Error
          ? err.message
          : translateOrFallback("streamTransformFailed", "Failed to transform stream");
      // Defence-in-depth: strip any accidental stack-trace suffix.
      setError(raw.replace(/\s+at\s+\/.*/g, ""));
    } finally {
      setLoading(false);
    }
  }, [rawSse, translateOrFallback]);

  // ── Titles (computed once per render for readability) ─────────────────────
  const title = translateOrFallback(
    "advancedStreamTransformTitle",
    "Stream Transformer (Chat → Responses SSE)"
  );
  const subtitle = translateOrFallback(
    "advancedStreamTransformSubtitle",
    "Converte SSE Chat Completions em Responses API."
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="rounded-lg border border-border bg-surface">
      {/* ── Collapsible header — mirrors Collapsible.tsx visual style ──── */}
      <div
        className={cn(
          "flex items-center gap-3 p-4 transition-colors hover:bg-bg-subtle",
          open && "border-b border-border"
        )}
      >
        <HeaderButton
          variant="ghost"
          onClick={handleToggle}
          aria-expanded={open}
          className="-m-1 h-auto min-w-0 flex-1 justify-start gap-3 p-1 text-left"
        >
          <Icon
            name={open ? "expand_more" : "chevron_right"}
            size={20}
            className="text-text-muted"
          />
          <Icon name="swap_horiz" size={18} className="text-text-muted" />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-text-main truncate">{title}</div>
            <div className="text-xs text-text-muted truncate">{subtitle}</div>
          </div>
        </HeaderButton>
      </div>

      {/* ── Content: lazy-render guard (D7) ────────────────────────────── */}
      {(open || hasOpened) && (
        <div className={cn("p-4", !open && "hidden")}>
          <div className="space-y-5 min-w-0">
            {/* Info banner */}
            <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-primary/5 border border-primary/10 text-sm text-text-muted">
              <Icon name="swap_horiz" size={20} className="text-primary mt-0.5" />
              <div>
                <p className="font-medium text-text-main mb-0.5">
                  {translateOrFallback("streamTransformerTitle", "Responses Stream Transformer")}
                </p>
                <p>
                  {translateOrFallback(
                    "streamTransformerDescription",
                    "Paste a chat completions SSE stream, run it through OmniRoute's Responses transformer, and inspect the emitted response.* events before wiring a client."
                  )}
                </p>
              </div>
            </div>

            <Card>
              <div className="p-4 flex flex-col gap-4">
                {/* Action buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRawSse(SAMPLE_TEXT)}
                    aria-label={translateOrFallback("loadTextSample", "Load text sample")}
                  >
                    {translateOrFallback("loadTextSample", "Load text sample")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRawSse(SAMPLE_TOOL)}
                    aria-label={translateOrFallback("loadToolSample", "Load tool-call sample")}
                  >
                    {translateOrFallback("loadToolSample", "Load tool-call sample")}
                  </Button>
                  <Button
                    size="sm"
                    icon="play_arrow"
                    onClick={runTransform}
                    loading={loading}
                    aria-label={translateOrFallback(
                      "transformToResponses",
                      "Transform to Responses"
                    )}
                  >
                    {translateOrFallback("transformToResponses", "Transform to Responses")}
                  </Button>
                </div>

                {/* Error display — Hard Rule #12: never show raw err.stack */}
                {error && (
                  <div
                    role="alert"
                    data-testid="error-display"
                    className="rounded-lg border border-error/30 bg-error/10 px-3 py-2 text-sm text-error"
                  >
                    {error}
                  </div>
                )}

                {/* Input / Output panels */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {/* Raw SSE input */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold text-text-main">
                        {translateOrFallback("rawChatSseInput", "Raw chat completions SSE")}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(rawSse, "input")}
                        aria-label={translateOrFallback("copyInput", "Copy input")}
                      >
                        <Icon name={copiedField === "input" ? "check" : "content_copy"} size={14} />
                      </Button>
                    </div>
                    <Textarea
                      value={rawSse}
                      onChange={(e) => setRawSse(e.target.value)}
                      data-testid="raw-sse-input"
                      className="min-h-[360px] w-full font-mono text-xs"
                      spellCheck={false}
                      aria-label={translateOrFallback(
                        "rawChatSseInput",
                        "Raw chat completions SSE"
                      )}
                    />
                  </div>

                  {/* Transformed SSE output */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold text-text-main">
                        {translateOrFallback(
                          "transformedResponsesSse",
                          "Transformed Responses API SSE"
                        )}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(transformedSse, "output")}
                        disabled={!transformedSse}
                        aria-label={translateOrFallback("copyOutput", "Copy output")}
                      >
                        <Icon
                          name={copiedField === "output" ? "check" : "content_copy"}
                          size={14}
                        />
                      </Button>
                    </div>
                    <pre
                      data-testid="transformed-output"
                      className="min-h-[360px] overflow-auto rounded-lg border border-border bg-bg-subtle px-3 py-3 text-xs font-mono whitespace-pre-wrap break-all"
                    >
                      {transformedSse || translateOrFallback("noResultsYet", "No results yet")}
                    </pre>
                  </div>
                </div>
              </div>
            </Card>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <MiniStat
                label={translateOrFallback("transformedEvents", "Transformed events")}
                value={eventCount}
              />
              <MiniStat
                label={translateOrFallback("uniqueEventTypes", "Unique event types")}
                value={uniqueEventCount}
              />
              <MiniStat
                label={translateOrFallback("inputLines", "Input lines")}
                value={rawSse.split("\n").length}
              />
              <MiniStat
                label={translateOrFallback("outputLines", "Output lines")}
                value={transformedSse ? transformedSse.split("\n").length : 0}
              />
            </div>

            {/* Event timeline */}
            <Card>
              <div className="p-4 space-y-3">
                <h3 className="text-sm font-semibold text-text-main">
                  {translateOrFallback("transformedEventTimeline", "Transformed event timeline")}
                </h3>

                {transformedFrames.length === 0 ? (
                  <p className="text-sm text-text-muted">
                    {translateOrFallback(
                      "transformerTimelineHint",
                      "Run the transformer to inspect emitted response.output_* events in order."
                    )}
                  </p>
                ) : (
                  <Table
                    scrollbarLabel={translateOrFallback("eventType", "Event type")}
                    className="text-sm"
                  >
                    <TableHeader>
                      <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>{translateOrFallback("eventType", "Event type")}</TableHead>
                        <TableHead>{translateOrFallback("eventPreview", "Preview")}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transformedFrames.map((frame, index) => (
                        <TableRow key={`${frame.event}_${index}`} className="align-top">
                          <TableCell className="text-xs text-text-muted">{index + 1}</TableCell>
                          <TableCell className="font-mono text-xs text-primary">
                            {frame.event}
                          </TableCell>
                          <TableCell className="break-all text-xs text-text-muted">
                            {frame.preview}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
