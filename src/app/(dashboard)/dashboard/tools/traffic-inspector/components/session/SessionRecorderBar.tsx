"use client";

import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import { cn } from "@/shared/utils/cn";
import type { SessionInfo } from "../../hooks/useSessionRecorder";

interface SessionRecorderBarProps {
  recording: boolean;
  session: SessionInfo | null;
  elapsed: number;
  onStart: (name?: string) => void;
  onStop: () => void;
}

function formatElapsed(s: number): string {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export function SessionRecorderBar({
  recording,
  session,
  elapsed,
  onStart,
  onStop,
}: SessionRecorderBarProps) {
  const t = useTranslations("trafficInspector");
  return (
    <div
      data-testid="session-recorder-bar"
      className={cn(
        "flex items-center gap-2 rounded-control border px-3 py-1 text-sm",
        recording
          ? "border-error/40 bg-error-bg text-text-main"
          : "border-border bg-bg-subtle text-text-muted"
      )}
    >
      {recording ? (
        <>
          <span
            data-testid="rec-indicator"
            aria-hidden="true"
            className="inline-block h-2 w-2 rounded-full bg-error animate-pulse"
          />
          <span className="font-mono text-xs">{formatElapsed(elapsed)}</span>
          {session?.name && (
            <span className="text-xs opacity-70 truncate max-w-[120px]">{session.name}</span>
          )}
          <Button
            variant="danger"
            size="sm"
            icon="stop"
            className="ml-auto"
            onClick={onStop}
            aria-label={t("stopSession")}
          >
            {t("stopSession")}
          </Button>
        </>
      ) : (
        <>
          <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-text-muted" />
          <span className="text-xs">{t("notRecording")}</span>
          <Button
            variant="outline"
            size="sm"
            icon="fiber_manual_record"
            className="ml-auto"
            onClick={() => onStart()}
            aria-label={t("recordSession")}
          >
            {t("recordSession")}
          </Button>
        </>
      )}
    </div>
  );
}
