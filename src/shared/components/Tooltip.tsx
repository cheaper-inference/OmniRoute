"use client";

/**
 * Tooltip — adapter over the kit Tooltip (Radix, KEA-7886).
 *
 * Hover/focus reveal after `delayMs`, Escape to dismiss, `role="tooltip"` and the
 * trigger's `aria-describedby` wiring, the body portal (#2352), the fixed,
 * collision-aware placement and the viewport clamping are all Radix's now.
 *
 * @module shared/components/Tooltip
 */

import { isValidElement, type ReactNode } from "react";
import { Tooltip as KitTooltip, TooltipContent, TooltipTrigger } from "@omniroute/ui-kit/tooltip";
import { cn } from "@/shared/utils/cn";

interface TooltipProps {
  children: ReactNode;
  content?: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  /** Applied to the inline wrapper around the trigger (the legacy `relative inline-flex` span). */
  className?: string;
  tooltipClassName?: string;
  delayMs?: number;
  /**
   * Issue #2352 — kept for API compatibility: the kit (Radix) always portals the
   * content to document.body, so it escapes `overflow: hidden` ancestors.
   */
  usePortal?: boolean;
  /**
   * Allow the tooltip text to wrap onto multiple lines instead of forcing a
   * single-line `whitespace-nowrap` layout. Use when the label is long.
   */
  multiline?: boolean;
}

export default function Tooltip({
  children,
  content,
  position = "top",
  className,
  tooltipClassName,
  delayMs = 300,
  multiline = false,
}: TooltipProps) {
  if (content == null || content === "") return <>{children}</>;
  // A non-element child (text, numbers) gets a focusable span so keyboard users reach it.
  // So does a disabled control: browsers deliver no pointer/focus events to it, so the
  // tooltip explaining why it is disabled would never open (Radix's documented pattern).
  const isDisabledElement =
    isValidElement<{ disabled?: unknown }>(children) && Boolean(children.props.disabled);
  const trigger =
    isValidElement(children) && !isDisabledElement ? (
      children
    ) : (
      <span tabIndex={0} className={isDisabledElement ? "inline-flex" : undefined}>
        {children}
      </span>
    );
  return (
    <KitTooltip delayDuration={delayMs} className={className}>
      <TooltipTrigger asChild>{trigger}</TooltipTrigger>
      <TooltipContent
        side={position}
        className={cn(
          multiline ? "max-w-xs whitespace-normal break-words" : "whitespace-nowrap",
          // The kit caps the content at 16rem; a single-line label must not overflow it.
          !multiline && "max-w-none",
          tooltipClassName
        )}
      >
        {content}
      </TooltipContent>
    </KitTooltip>
  );
}
