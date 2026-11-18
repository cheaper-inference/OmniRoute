"use client";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { forwardRef } from "react";
import type { ComponentProps } from "react";
import { cn } from "./lib/utils";

export type HoverCardSide = NonNullable<ComponentProps<typeof HoverCardPrimitive.Content>["side"]>;
export type HoverCardAlign = NonNullable<ComponentProps<typeof HoverCardPrimitive.Content>["align"]>;
export type HoverCardProps = ComponentProps<typeof HoverCardPrimitive.Root>;

/** Passive preview on hover or keyboard focus. It never moves focus and never opens on touch. */
export function HoverCard({ openDelay = 300, closeDelay = 200, ...props }: HoverCardProps) {
  return <HoverCardPrimitive.Root openDelay={openDelay} closeDelay={closeDelay} {...props} />;
}

export interface HoverCardTriggerProps extends ComponentProps<typeof HoverCardPrimitive.Trigger> {}

/**
 * Renders an `<a>` without `href` by default, which is not focusable. Use `asChild` with a `Button`
 * or a link that has an `href`, so the trigger is focusable and useful on its own (touch never opens the card).
 */
export const HoverCardTrigger = forwardRef<HTMLAnchorElement, HoverCardTriggerProps>(function HoverCardTrigger(props, ref) {
  return <HoverCardPrimitive.Trigger ref={ref} data-slot="hover-card-trigger" {...props} />;
});

export interface HoverCardContentProps extends ComponentProps<typeof HoverCardPrimitive.Content> {
  portalContainer?: HTMLElement | null;
  /** Render an arrow pointing at the trigger. */
  hasArrow?: boolean;
}

export const HoverCardContent = forwardRef<HTMLDivElement, HoverCardContentProps>(function HoverCardContent({
  className,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  collisionPadding = 8,
  portalContainer,
  forceMount,
  hasArrow = false,
  children,
  ...props
}, ref) {
  return (
    <HoverCardPrimitive.Portal container={portalContainer} forceMount={forceMount}>
      <HoverCardPrimitive.Content
        ref={ref}
        forceMount={forceMount}
        data-slot="hover-card-content"
        side={side}
        align={align}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={cn("ci-popover", "ci-hover-card", className)}
        {...props}
      >
        {children}
        {hasArrow && <HoverCardPrimitive.Arrow className="ci-popover__arrow" width={18} height={9} aria-hidden />}
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  );
});
