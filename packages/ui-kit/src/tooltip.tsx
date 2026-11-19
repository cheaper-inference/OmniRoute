"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { forwardRef, useCallback } from "react";
import type { ComponentProps, ReactNode } from "react";
import { isKeyboardNavigationFocus, watchKeyboardNavigation } from "./lib/keyboard-focus";
import { cn } from "./lib/utils";
import { TooltipRoot } from "./lib/tooltip-root";

export { TooltipProvider, type TooltipProviderProps } from "./lib/tooltip-root";

export type TooltipSide = NonNullable<ComponentProps<typeof TooltipPrimitive.Content>["side"]>;
export type TooltipAlign = NonNullable<ComponentProps<typeof TooltipPrimitive.Content>["align"]>;

export interface TooltipProps extends ComponentProps<"span"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Delay before opening, in ms. Defaults to 300, or to the TooltipProvider's delay under one. */
  delayDuration?: number;
  disableHoverableContent?: boolean;
  children?: ReactNode;
}

export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(function Tooltip({
  className,
  open,
  defaultOpen,
  onOpenChange,
  delayDuration,
  disableHoverableContent,
  children,
  ...props
}, ref) {
  return (
    <span ref={ref} className={cn("ci-tooltip", className)} {...props}>
      <TooltipRoot
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        delayDuration={delayDuration}
        disableHoverableContent={disableHoverableContent}
      >
        {children}
      </TooltipRoot>
    </span>
  );
});

export interface TooltipTriggerProps extends ComponentProps<typeof TooltipPrimitive.Trigger> {}

/**
 * Opens the tooltip on hover and on a focus the user moved there with the keyboard (Tab, the
 * arrows, Home, End, PageUp, PageDown). A focus moved by code, such as a dialog focusing its first
 * control or handing focus back to its opener, leaves it closed, so it cannot take that dialog's Escape.
 */
export const TooltipTrigger = forwardRef<HTMLButtonElement, TooltipTriggerProps>(function TooltipTrigger({ onFocus, ...props }, ref) {
  // Listen in the trigger's own document (an iframe has its own) from mount, before the first
  // key: the first focus is already too late to tell how it came.
  const attach = useCallback((element: HTMLButtonElement | null) => {
    if (element) watchKeyboardNavigation(element.ownerDocument);
    // React 19 runs the cleanup a callback ref returns on unmount, in place of calling it with null.
    if (typeof ref === "function") return ref(element);
    if (ref) ref.current = element;
  }, [ref]);
  return (
    <TooltipPrimitive.Trigger
      ref={attach}
      data-slot="tooltip-trigger"
      onFocus={(event) => {
        onFocus?.(event);
        // Radix opens the tooltip in its own focus handler, which it skips for a default-prevented event.
        if (!isKeyboardNavigationFocus(event.currentTarget.ownerDocument)) event.preventDefault();
      }}
      {...props}
    />
  );
});

export interface TooltipContentProps extends ComponentProps<typeof TooltipPrimitive.Content> {
  portalContainer?: HTMLElement | null;
}

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(function TooltipContent({
  className,
  side = "top",
  align = "center",
  sideOffset = 8,
  collisionPadding = 8,
  portalContainer,
  forceMount,
  ...props
}, ref) {
  return (
    <TooltipPrimitive.Portal container={portalContainer} forceMount={forceMount}>
      <TooltipPrimitive.Content
        ref={ref}
        forceMount={forceMount}
        data-slot="tooltip-content"
        side={side}
        align={align}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={cn("ci-tooltip__content", className)}
        {...props}
      />
    </TooltipPrimitive.Portal>
  );
});
