"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { forwardRef } from "react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "./lib/utils";

export type TooltipSide = NonNullable<ComponentProps<typeof TooltipPrimitive.Content>["side"]>;
export type TooltipAlign = NonNullable<ComponentProps<typeof TooltipPrimitive.Content>["align"]>;

export interface TooltipProps extends ComponentProps<"span"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
  disableHoverableContent?: boolean;
  children?: ReactNode;
}

export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(function Tooltip({
  className,
  open,
  defaultOpen,
  onOpenChange,
  delayDuration = 300,
  disableHoverableContent,
  children,
  ...props
}, ref) {
  return (
    <span ref={ref} className={cn("ci-tooltip", className)} {...props}>
      <TooltipPrimitive.Provider delayDuration={delayDuration}>
        <TooltipPrimitive.Root
          open={open}
          defaultOpen={defaultOpen}
          onOpenChange={onOpenChange}
          delayDuration={delayDuration}
          disableHoverableContent={disableHoverableContent}
        >
          {children}
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    </span>
  );
});

export interface TooltipTriggerProps extends ComponentProps<typeof TooltipPrimitive.Trigger> {}

export const TooltipTrigger = forwardRef<HTMLButtonElement, TooltipTriggerProps>(function TooltipTrigger(props, ref) {
  return <TooltipPrimitive.Trigger ref={ref} data-slot="tooltip-trigger" {...props} />;
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
