"use client";

import { cn } from "@/shared/utils/cn";
import Icon from "./Icon";
import Tooltip from "./Tooltip";

interface InfoTooltipProps {
  text: string;
  className?: string;
}

// The trigger is a real button: reachable by keyboard, named by `text`, and the
// tooltip (kit/Radix) opens on its hover and focus.
export default function InfoTooltip({ text, className }: InfoTooltipProps) {
  return (
    <Tooltip content={text} multiline delayMs={100}>
      {/* kit-exception: an inline 16 px info trigger; the kit icon Button is a 32 px control */}
      <button
        type="button"
        aria-label={text}
        className={cn("inline-flex cursor-help items-center text-text-muted", className)}
      >
        <Icon name="info" size={16} />
      </button>
    </Tooltip>
  );
}
