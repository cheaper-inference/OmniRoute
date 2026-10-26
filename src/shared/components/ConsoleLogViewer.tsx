"use client";

import { useLocale, useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import { cn } from "@/shared/utils/cn";
import Button from "./Button";
import Icon from "./Icon";
import Input from "./Input";
import Select from "./Select";

/**
 * Console Log Viewer — Real-time application log viewer.
 *
 * Displays structured application logs from the server with a terminal-like UI.
 * Polls the backend API every 5 seconds. Shows logs from the last 1 hour.
 * Supports level filtering, text search, auto-scroll, and copy-to-clipboard.
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { copyToClipboard } from "@/shared/utils/clipboard";
import { isPinnedToBottom } from "@/shared/utils/scrollFollow";

interface LogEntry {
  timestamp: string;
  level: string;
  component?: string;
  module?: string;
  message?: string;
  msg?: string;
  correlationId?: string;
  [key: string]: unknown;
}

// The terminal pane stays dark in both themes (DESIGN_SYSTEM: intentional terminal hex), so the
// level colours are the GitHub-dark terminal palette, not theme tokens.
const LEVEL_COLORS: Record<string, string> = {
  debug: "text-[#8b949e]",
  trace: "text-[#6e7681]",
  info: "text-[#39c5cf]",
  warn: "text-[#e3b341]",
  error: "text-[#ff7b72]",
  fatal: "text-[#f778ba]",
};

const LEVEL_BG: Record<string, string> = {
  debug: "bg-[#8b949e]/10 border-[#8b949e]/20",
  trace: "bg-[#8b949e]/10 border-[#8b949e]/20",
  info: "bg-[#39c5cf]/10 border-[#39c5cf]/20",
  warn: "bg-[#e3b341]/10 border-[#e3b341]/20",
  error: "bg-[#ff7b72]/10 border-[#ff7b72]/20",
  fatal: "bg-[#f778ba]/10 border-[#f778ba]/20",
};

const POLL_INTERVAL = 5000; // 5 seconds

export default function ConsoleLogViewer() {
  const locale = useLocale();
  const t = useTranslations("loggers");
  const tv = useTranslations("logs.consoleViewer");
  const tc = useTranslations("common");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [levelFilter, setLevelFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [autoScroll, setAutoScroll] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  // Whether the reader is at the tail. Recorded on scroll rather than read in the effect: by the
  // time the effect runs the new lines are laid out, so the box no longer reports where the
  // reader was before they arrived.
  const followTailRef = useRef(true);
  const copyFeedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchLogs = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (levelFilter !== "all") params.set("level", levelFilter);
      params.set("limit", "500");

      const res = await fetch(`/api/logs/console?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: LogEntry[] = await res.json();

      setLogs(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err: any) {
      setError(err.message || tv("fetchFailed"));
    } finally {
      setLoading(false);
    }
  }, [levelFilter, tv]);

  // Initial fetch + polling
  useEffect(() => {
    const initialFetch = setTimeout(() => void fetchLogs(), 0);
    const interval = setInterval(fetchLogs, POLL_INTERVAL);
    return () => {
      clearTimeout(initialFetch);
      clearInterval(interval);
    };
  }, [fetchLogs]);

  useEffect(
    () => () => {
      if (copyFeedbackTimerRef.current) clearTimeout(copyFeedbackTimerRef.current);
    },
    []
  );

  // Auto-scroll to bottom on new logs, but only while the reader is already at the bottom
  useEffect(() => {
    if (autoScroll && followTailRef.current && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  const handleCopy = async (entry: LogEntry, idx: number) => {
    const text = JSON.stringify(entry, null, 2);
    const success = await copyToClipboard(text);
    if (!success) {
      setError(tv("copyFailed"));
      return;
    }

    setError(null);
    if (copyFeedbackTimerRef.current) clearTimeout(copyFeedbackTimerRef.current);
    setCopiedIdx(idx);
    copyFeedbackTimerRef.current = setTimeout(() => {
      copyFeedbackTimerRef.current = null;
      setCopiedIdx(null);
    }, 2000);
  };

  const formatTime = (ts: string) => {
    try {
      const d = new Date(ts);
      return d.toLocaleTimeString(locale, {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        fractionalSecondDigits: 3,
      });
    } catch {
      return ts;
    }
  };

  const stringifyValue = (value: unknown) => {
    if (value === undefined || value === null) return "";
    if (typeof value === "string") return value;
    if (typeof value === "number" || typeof value === "boolean" || typeof value === "bigint") {
      return String(value);
    }

    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  };

  const getText = (entry: LogEntry) => stringifyValue(entry.msg || entry.message || "");
  const getComponent = (entry: LogEntry) => stringifyValue(entry.component || entry.module || "");
  const getCorrelationId = (entry: LogEntry) => stringifyValue(entry.correlationId);

  // Apply text search filter
  const filteredLogs = searchText
    ? logs.filter((entry) => {
        const full = JSON.stringify(entry).toLowerCase();
        return full.includes(searchText.toLowerCase());
      })
    : logs;

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-end gap-3 rounded-xl border border-border bg-surface p-4">
        {/* Level filter */}
        <Select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          aria-label={tv("filterByLevel")}
        >
          <option value="all">{t("allLevels")}</option>
          <option value="debug">Debug+</option>
          <option value="info">Info+</option>
          <option value="warn">Warn+</option>
          <option value="error">Error+</option>
        </Select>

        {/* Search */}
        <Input
          type="text"
          icon="search"
          placeholder={tv("searchPlaceholder")}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          aria-label={tv("searchAria")}
          className="min-w-[200px] flex-1"
        />

        {/* Auto-scroll toggle */}
        <Button
          variant="outline"
          aria-pressed={autoScroll}
          onClick={() => {
            // Switching auto-scroll back on is an explicit "take me to the newest line".
            if (!autoScroll) followTailRef.current = true;
            setAutoScroll(!autoScroll);
          }}
          title={autoScroll ? tv("disableAutoScroll") : tv("enableAutoScroll")}
          className={cn(autoScroll && "border-info/30 bg-info/15 text-info")}
        >
          <Icon name={autoScroll ? "vertical_align_bottom" : "lock"} size={16} />
          {tv("autoScroll")}
        </Button>

        {/* Refresh */}
        <Button
          variant="outline"
          size="icon"
          onClick={fetchLogs}
          disabled={loading}
          aria-label={tc("refresh")}
          title={tc("refresh")}
        >
          <Icon name="refresh" size={16} />
        </Button>

        {/* Status */}
        <div className="ml-auto flex items-center gap-2 self-center text-xs text-text-muted">
          <span
            aria-hidden="true"
            className="inline-block size-2 animate-pulse rounded-full bg-success"
          />
          <span>{tv("entryCount", { count: filteredLogs.length })}</span>
          <span className="text-text-muted/50">•</span>
          <span>{tv("lastHour")}</span>
          {lastUpdated && (
            <>
              <span className="text-text-muted/50">•</span>
              <span>{tv("updatedAt", { time: lastUpdated.toLocaleTimeString(locale) })}</span>
            </>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <Alert
          variant="critical"
          icon={<Icon name="error" size={16} />}
          dismissLabel={tc("dismissNotification")}
          onDismiss={() => setError(null)}
          description={
            <>
              {error}
              <span className="ml-2 text-xs opacity-70">— {tv("fileLoggingRequired")}</span>
            </>
          }
        />
      )}

      {/* Console output */}
      <div
        ref={scrollRef}
        onScroll={() => {
          followTailRef.current = isPinnedToBottom(scrollRef.current);
        }}
        className="rounded-xl border border-border bg-[#0d1117] overflow-auto font-mono text-xs leading-relaxed"
        style={{ maxHeight: "calc(100vh - 340px)", minHeight: "400px" }}
        role="log"
        aria-label={tv("consoleAria")}
        aria-live="polite"
      >
        {/* Header bar */}
        <div className="sticky top-0 z-10 px-4 py-2 bg-[#161b22] border-b border-[#30363d] flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          <span className="ml-3 text-[#8b949e] text-[11px]">
            OmniRoute — {tv("applicationConsole")}
          </span>
        </div>

        {/* Log entries */}
        <div className="p-3 space-y-px">
          {filteredLogs.length === 0 && !loading ? (
            <div className="text-[#8b949e] text-center py-12">
              <Icon name="terminal" size={40} className="block mb-2 opacity-30" />
              <p>{t("noLogEntries")}</p>
              <p className="text-[10px] mt-1">{tv("emptyFileLoggingHint")}</p>
            </div>
          ) : (
            filteredLogs.map((entry, idx) => {
              const level = stringifyValue(entry.level || "info").toLowerCase();
              const colorClass = LEVEL_COLORS[level] || LEVEL_COLORS.info;
              const bgClass = LEVEL_BG[level] || "";
              const comp = getComponent(entry);
              const msg = getText(entry);
              const correlationId = getCorrelationId(entry);

              return (
                <div
                  key={idx}
                  className={`group flex items-start gap-2 px-2 py-1 rounded hover:bg-white/5 transition-colors ${
                    level === "error" || level === "fatal" ? "bg-[#ff7b72]/5" : ""
                  }`}
                >
                  {/* Timestamp */}
                  <span className="text-[#8b949e] whitespace-nowrap shrink-0 select-none">
                    {formatTime(entry.timestamp)}
                  </span>

                  {/* Level badge */}
                  <span
                    className={`inline-block px-1.5 py-0 rounded text-[10px] font-semibold uppercase border shrink-0 ${colorClass} ${bgClass}`}
                  >
                    {level.padEnd(5)}
                  </span>

                  {/* Component */}
                  {comp && <span className="text-[#d2a8ff]/80 shrink-0">[{comp}]</span>}

                  {/* Message */}
                  <span className="text-[#c9d1d9] flex-1 break-all">
                    {msg}
                    {/* Extra meta */}
                    {correlationId && (
                      <span className="text-[#8b949e] ml-2">cid:{correlationId.slice(0, 8)}</span>
                    )}
                  </span>

                  {/* Copy button */}
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleCopy(entry, idx)}
                    title={tv("copyLogEntry")}
                    aria-label={tv("copyLogEntry")}
                    className="size-6 min-h-6 shrink-0 text-[#8b949e] opacity-0 transition-opacity hover:bg-white/10 hover:text-white group-hover:opacity-100 focus-visible:opacity-100"
                  >
                    <Icon name={copiedIdx === idx ? "check" : "content_copy"} size={14} />
                  </Button>
                  {copiedIdx === idx && (
                    <span className="sr-only" role="status" aria-live="polite">
                      {tc("copied")}
                    </span>
                  )}
                </div>
              );
            })
          )}

          {loading && filteredLogs.length === 0 && (
            <div className="text-[#8b949e] text-center py-12">
              <Icon name="progress_activity" size={24} className="animate-spin block mb-2" />
              {t("loadingLogs")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
