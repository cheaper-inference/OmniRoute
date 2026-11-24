"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";

/** The delay a kit tooltip waits before opening, in ms, unless it or a TooltipProvider sets another. */
const DEFAULT_DELAY = 300;

/** True below a TooltipProvider: tooltips there join it instead of mounting a provider each. */
const SharedTooltipProviderContext = createContext(false);

export interface TooltipProviderProps {
  /** Delay before a tooltip opens, in ms. A `delayDuration` set on a tooltip itself wins. Defaults to 300. */
  delayDuration?: number;
  /** After a tooltip closes, the next one opens without delay inside this window, in ms. Defaults to 300. */
  skipDelayDuration?: number;
  /** Close a tooltip as soon as the pointer leaves its trigger, even on the way to its content. */
  disableHoverableContent?: boolean;
  children?: ReactNode;
}

/**
 * Optional. One provider for every kit tooltip below it (`Tooltip`, `InfoTooltip`, `Button tooltip`),
 * for screens that mount many of them, such as a table with icon actions in every row. It renders
 * no element. Without it each tooltip keeps its own provider.
 */
export function TooltipProvider({
  delayDuration = DEFAULT_DELAY,
  skipDelayDuration,
  disableHoverableContent,
  children,
}: TooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      disableHoverableContent={disableHoverableContent}
    >
      <SharedTooltipProviderContext.Provider value={true}>{children}</SharedTooltipProviderContext.Provider>
    </TooltipPrimitive.Provider>
  );
}

export interface TooltipRootProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
  disableHoverableContent?: boolean;
  children?: ReactNode;
}

/** A tooltip's state without the `.ci-tooltip` box, shared by `Tooltip` and `Button tooltip`. */
export function TooltipRoot({ delayDuration, children, ...props }: TooltipRootProps) {
  const shared = useContext(SharedTooltipProviderContext);
  if (shared) {
    // Left undefined, the delay and hoverable content come from the TooltipProvider.
    return <TooltipPrimitive.Root delayDuration={delayDuration} {...props}>{children}</TooltipPrimitive.Root>;
  }
  const delay = delayDuration ?? DEFAULT_DELAY;
  return (
    <TooltipPrimitive.Provider delayDuration={delay}>
      <TooltipPrimitive.Root delayDuration={delay} {...props}>{children}</TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
