"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import { forwardRef } from "react";
import type { ComponentProps } from "react";
import { cn } from "./lib/utils";

export type PopoverSide = NonNullable<ComponentProps<typeof PopoverPrimitive.Content>["side"]>;
export type PopoverAlign = NonNullable<ComponentProps<typeof PopoverPrimitive.Content>["align"]>;
export type PopoverProps = ComponentProps<typeof PopoverPrimitive.Root>;

export function Popover(props: PopoverProps) {
  return <PopoverPrimitive.Root {...props} />;
}

export interface PopoverTriggerProps extends ComponentProps<typeof PopoverPrimitive.Trigger> {}

export const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(function PopoverTrigger(props, ref) {
  return <PopoverPrimitive.Trigger ref={ref} data-slot="popover-trigger" {...props} />;
});

export interface PopoverContentProps extends ComponentProps<typeof PopoverPrimitive.Content> {
  portalContainer?: HTMLElement | null;
  /** Render a Radix arrow pointing at the trigger. Off by default so existing popovers are unchanged. */
  hasArrow?: boolean;
}

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(function PopoverContent({
  className,
  side = "bottom",
  align = "start",
  sideOffset = 8,
  collisionPadding = 8,
  portalContainer,
  forceMount,
  hasArrow = false,
  children,
  ...props
}, ref) {
  return (
    <PopoverPrimitive.Portal container={portalContainer} forceMount={forceMount}>
      <PopoverPrimitive.Content
        ref={ref}
        forceMount={forceMount}
        data-slot="popover-content"
        side={side}
        align={align}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={cn("ci-popover", className)}
        {...props}
      >
        {children}
        {hasArrow && <PopoverPrimitive.Arrow className="ci-popover__arrow" width={18} height={9} aria-hidden />}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
});

export interface PopoverCloseProps extends ComponentProps<typeof PopoverPrimitive.Close> {}

export const PopoverClose = forwardRef<HTMLButtonElement, PopoverCloseProps>(function PopoverClose(props, ref) {
  return <PopoverPrimitive.Close ref={ref} data-slot="popover-close" {...props} />;
});
