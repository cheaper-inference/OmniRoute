"use client";

import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import { cn } from "@/shared/utils/cn";
import type { InterceptedRequest } from "@/mitm/inspector/types";
import { ContextColorBar } from "./shared/ContextColorBar";
import { AgentEmoji } from "./shared/AgentEmoji";

interface RequestRowProps {
  request: InterceptedRequest;
  selected: boolean;
  onClick: () => void;
  onSameContext?: (contextKey: string) => void;
  style?: React.CSSProperties;
}

function statusColor(status: InterceptedRequest["status"]): string {
  if (status === "in-flight") return "text-text-muted";
  if (status === "error") return "text-error";
  if (typeof status === "number") {
    if (status < 300) return "text-success";
    if (status < 500) return "text-warning";
    return "text-error";
  }
  return "text-text-muted";
}

function formatSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${bytes}B`;
}

function formatTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString("en", { hour12: false });
  } catch {
    return "";
  }
}

export function RequestRow({ request, selected, onClick, onSameContext, style }: RequestRowProps) {
  const t = useTranslations("trafficInspector");
  const pathShort = request.path.length > 32 ? `…${request.path.slice(-30)}` : request.path;
  const sc = statusColor(request.status);

  // The row holds two sibling controls: the select toggle and the context-filter chip. They
  // used to be nested (a `div role="button"` around the chip, axe `nested-interactive`); the
  // chip now sits over the toggle's reserved last line instead (#18077).
  return (
    <div
      data-testid="request-row"
      style={style}
      className={cn(
        "relative flex items-stretch gap-1 border-b border-border/40 hover:bg-bg-subtle",
        selected && "bg-surface"
      )}
    >
      <ContextColorBar contextKey={request.contextKey} />
      {/* kit-exception: dense two-line virtualised row; the kit Tile's padding, border and
          surface would triple the row height. */}
      <button
        type="button"
        aria-pressed={selected}
        onClick={onClick}
        className="block flex-1 min-w-0 cursor-pointer px-2 py-1.5 text-start focus-ring"
      >
        <span className="flex items-center gap-2 text-xs">
          <span className="text-text-muted shrink-0 font-mono">
            {formatTime(request.timestamp)}
          </span>
          <span className="font-mono font-medium text-text-main shrink-0">{request.method}</span>
          <span className={cn("font-mono font-semibold shrink-0", sc)}>
            {String(request.status)}
          </span>
          <span className="text-text-muted shrink-0">{formatSize(request.responseSize)}</span>
          <span className="shrink-0">
            <AgentEmoji agentId={request.agent} />
          </span>
          {request.processName && (
            <span
              className="text-text-muted shrink-0 font-mono opacity-70 truncate max-w-[120px]"
              title={request.pid ? `PID ${request.pid}` : undefined}
            >
              <Icon name="settings" size={14} className="leading-none" /> {request.processName}
            </span>
          )}
        </span>
        <span className="block text-xs text-text-muted truncate font-mono mt-0.5">
          {request.host}
          <span className="text-text-main">{pathShort}</span>
        </span>
        {/* Room for the context chip, which is positioned over this line. */}
        {request.contextKey && <span aria-hidden="true" className="block h-4" />}
      </button>
      {request.contextKey && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute bottom-1.5 start-[15px] h-4 min-h-0 px-1 py-0 font-mono text-[10px] text-text-muted"
          // No aria-label: the visible "ctx #…" is the accessible name (WCAG 2.5.3 label in
          // name); the title describes what the chip does.
          title={t("filterByContext")}
          onClick={() => onSameContext?.(request.contextKey as string)}
        >
          ctx #{request.contextKey.slice(0, 6)}
        </Button>
      )}
    </div>
  );
}
