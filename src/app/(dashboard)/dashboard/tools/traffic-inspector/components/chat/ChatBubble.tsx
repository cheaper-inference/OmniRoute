"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import type { NormalizedTurn } from "@/mitm/inspector/types";
import { cn } from "@/shared/utils/cn";
import { formatTime } from "@/shared/utils/formatting";
import { MessageContent } from "./MessageContent";

interface ChatBubbleProps {
  turn: NormalizedTurn;
  /** Optional — makes the bubble clickable when a caller has somewhere to
   * navigate to for this turn (e.g. a tree/list view linking back to the
   * request that produced it). */
  onClick?: () => void;
  /** True when this turn belongs to the request currently open — shown
   * highlighted instead of clickable (nowhere further to navigate to). */
  isCurrent?: boolean;
}

const ROLE_STYLES: Record<NormalizedTurn["role"], string> = {
  system: "border border-error/40 bg-error-bg text-text-main",
  user: "ml-auto border border-info/30 bg-info-bg text-text-main",
  assistant: "border border-border bg-surface text-text-main",
  tool: "border border-border bg-bg-subtle text-text-main",
};

const ROLE_LABEL_KEY: Record<NormalizedTurn["role"], string> = {
  system: "roleSystem",
  user: "roleUser",
  assistant: "roleAssistant",
  tool: "roleTool",
};

export function ChatBubble({ turn, onClick, isCurrent }: ChatBubbleProps) {
  const t = useTranslations("trafficInspector");
  const [collapsed, setCollapsed] = useState(turn.role === "system");

  const isSystem = turn.role === "system";
  const isUser = turn.role === "user";
  const clickable = Boolean(onClick) && !isCurrent;

  return (
    <div
      className={cn(
        "max-w-[85%] rounded-lg px-3 py-2",
        isUser ? "ml-auto" : "mr-auto",
        ROLE_STYLES[turn.role],
        clickable && "cursor-pointer hover:brightness-110 transition-[filter]",
        isCurrent && "ring-2 ring-primary/60"
      )}
      onClick={clickable ? onClick : undefined}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      <div className="flex items-center justify-between gap-2 mb-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium opacity-70">{t(ROLE_LABEL_KEY[turn.role])}</span>
          {turn.timestamp && (
            <span className="text-[10px] opacity-50 font-mono">{formatTime(turn.timestamp)}</span>
          )}
        </div>
        {isSystem && (
          <Button
            variant="ghost"
            size="sm"
            className="h-auto min-h-0 px-1.5 py-0 text-xs"
            aria-expanded={!collapsed}
            onClick={(e) => {
              e.stopPropagation();
              setCollapsed((c) => !c);
            }}
          >
            {collapsed ? t("expand") : t("collapse")}
          </Button>
        )}
      </div>
      {!collapsed && <MessageContent blocks={turn.blocks} />}
      {collapsed && isSystem && (
        <p className="text-xs opacity-60 italic">{t("systemPromptHidden")}</p>
      )}
    </div>
  );
}
