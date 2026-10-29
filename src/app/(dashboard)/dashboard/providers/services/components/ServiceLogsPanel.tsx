"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button, Input } from "@/shared/components";
import { cn } from "@/shared/utils/cn";
import { useServiceLogs } from "../hooks/useServiceLogs";
import type { LogLine } from "../hooks/useServiceLogs";

interface ServiceLogsPanelProps {
  name: string;
}

function LogLineRow({ line, locale }: { line: LogLine; locale: string }) {
  const ts = new Date(line.ts).toLocaleTimeString(locale, { hour12: false });
  return (
    <div className="flex gap-2 text-[11px] leading-5 font-mono hover:bg-bg-subtle/50 px-2">
      <span className="text-text-muted shrink-0 select-none">{ts}</span>
      <span
        className={cn(
          "text-text-muted shrink-0 select-none",
          line.stream === "stderr" && "text-error"
        )}
      >
        {line.stream === "stderr" ? "ERR" : "OUT"}
      </span>
      <span className="break-all">{line.line}</span>
    </div>
  );
}

export function ServiceLogsPanel({ name }: ServiceLogsPanelProps) {
  const locale = useLocale();
  const t = useTranslations("embeddedServices");
  const [filterInput, setFilterInput] = useState("");
  const { lines, isPaused, error, togglePause, clear, setFilter } = useServiceLogs(name, {
    tail: 200,
  });
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new lines unless paused
  useEffect(() => {
    if (!isPaused) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [lines, isPaused]);

  function applyFilter(val: string) {
    setFilterInput(val);
    setFilter(val);
  }

  function downloadLogs() {
    const text = lines
      .map((l) => `${new Date(l.ts).toISOString()} [${l.stream}] ${l.line}`)
      .join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${name}-logs.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-bg-subtle">
        <Input
          placeholder={t("filterLogs")}
          aria-label={t("filterLogs")}
          value={filterInput}
          onChange={(e) => applyFilter(e.target.value)}
          className="min-w-0 flex-1"
        />
        <Button variant="ghost" size="sm" onClick={togglePause} className="shrink-0">
          {isPaused ? t("resume") : t("pause")}
        </Button>
        <Button variant="ghost" size="sm" onClick={clear} className="shrink-0">
          {t("clear")}
        </Button>
        <Button variant="ghost" size="sm" onClick={downloadLogs} className="shrink-0">
          {t("download")}
        </Button>
      </div>
      <div className="h-80 overflow-y-auto bg-bg py-1">
        {error ? (
          <p className="text-xs text-error px-4 py-4">{error}</p>
        ) : lines.length === 0 ? (
          <p className="text-xs text-text-muted px-4 py-4">{t("noLogs")}</p>
        ) : (
          lines.map((l, i) => <LogLineRow key={i} line={l} locale={locale} />)
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
