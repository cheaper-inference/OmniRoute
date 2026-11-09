"use client";

import { forwardRef } from "react";
import type { ComponentProps, ReactNode } from "react";
import { Info } from "lucide-react";
import { cn } from "./lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger, type TooltipSide } from "./tooltip";

export interface InfoTooltipProps extends Omit<ComponentProps<"button">, "content" | "children"> {
  /** Tooltip text. */
  content: ReactNode;
  /** Accessible name of the info trigger. Defaults to "More information". */
  label?: string;
  side?: TooltipSide;
  delayDuration?: number;
}

/** An inline info icon (24px target, 16px icon) that reveals help on hover or keyboard focus. */
export const InfoTooltip = forwardRef<HTMLButtonElement, InfoTooltipProps>(function InfoTooltip({
  className,
  content,
  label = "More information",
  side = "top",
  delayDuration = 150,
  ...props
}, ref) {
  return (
    <Tooltip delayDuration={delayDuration} className="ci-info-tooltip">
      <TooltipTrigger ref={ref} type="button" aria-label={label} className={cn("ci-info-tooltip__trigger", className)} {...props}>
        <Info aria-hidden="true" />
      </TooltipTrigger>
      <TooltipContent side={side}>{content}</TooltipContent>
    </Tooltip>
  );
});
