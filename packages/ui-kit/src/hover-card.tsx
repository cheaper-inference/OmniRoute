"use client";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { forwardRef, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef, useState } from "react";
import type { ComponentProps, FocusEvent, PointerEvent, ReactNode } from "react";
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

/** What a card can be positioned against: an element, or anything that reports a rectangle. */
export type HoverCardAnchorTarget = Element | { getBoundingClientRect(): DOMRect };

export interface HoverCardAnchorProps {
  /** The element, or virtual rectangle, the card is positioned against. Keep a virtual one stable between renders. */
  anchor: HoverCardAnchorTarget | null;
}

/** Renders nothing: it hands the host's element to Radix as the node of its trigger. */
const HoverCardAnchorHandle = forwardRef<HoverCardAnchorTarget | null, HoverCardAnchorProps>(function HoverCardAnchorHandle({ anchor }, ref) {
  useImperativeHandle<HoverCardAnchorTarget | null, HoverCardAnchorTarget | null>(ref, () => anchor, [anchor]);
  return null;
});

/**
 * Used inside a `HoverCard` in place of `HoverCardTrigger`: the card is positioned against an
 * element the host owns. It adds no element and no event handler, so the host decides when the
 * card opens (`open` and `onOpenChange` on `HoverCard`). `useSharedHoverCard` does that for a
 * group of triggers.
 */
export function HoverCardAnchor({ anchor }: HoverCardAnchorProps) {
  return (
    <HoverCardPrimitive.Trigger asChild>
      <HoverCardAnchorHandle anchor={anchor} />
    </HoverCardPrimitive.Trigger>
  );
}

export interface SharedHoverCardOptions {
  /** Milliseconds the pointer rests on a trigger before the card opens. Keyboard focus opens it at once. */
  openDelay?: number;
  /** Milliseconds the card stays open after the pointer or the focus leaves. */
  closeDelay?: number;
}

/** Spread on each trigger. A handler of your own for the same event has to call the one given here. */
export interface SharedHoverCardTriggerProps {
  "data-hover-card-trigger": string;
  "aria-describedby": string | undefined;
  onPointerEnter: (event: PointerEvent<Element>) => void;
  onPointerLeave: (event: PointerEvent<Element>) => void;
  onPointerDown: (event: PointerEvent<Element>) => void;
  onFocus: (event: FocusEvent<Element>) => void;
  onBlur: (event: FocusEvent<Element>) => void;
}

export interface SharedHoverCardState {
  open: boolean;
  /** Value of the trigger the card is open for, `null` while it is closed. */
  value: string | null;
  /** Props of the trigger with this value. The value has to be unique among the triggers of the card. */
  getTriggerProps: (value: string) => SharedHoverCardTriggerProps;
  /** Opens the card for a mark that is not an element (a point of a canvas chart), after `openDelay`. */
  show: (value: string, anchor: HoverCardAnchorTarget) => void;
  /** Closes the card after `closeDelay`, unless the pointer reaches the card or another trigger first. */
  hide: () => void;
  /** Closes the card now. */
  close: () => void;
  /** Wiring read by `SharedHoverCard`. */
  controller: {
    contentId: string;
    /** Last value and anchor shown; kept after closing so an exit animation still has its content. */
    value: string | null;
    anchor: HoverCardAnchorTarget | null;
    hold: () => void;
    press: () => void;
  };
}

function isKeyboardFocus(element: Element) {
  try {
    return element.matches(":focus-visible");
  } catch {
    return true;
  }
}

/**
 * Hover intent of one card shared by many triggers. The triggers stay plain elements of the host
 * (`getTriggerProps`), and `SharedHoverCard` renders the single card, so a long list does not pay
 * for one Radix root per trigger.
 */
export function useSharedHoverCard({ openDelay = 300, closeDelay = 200 }: SharedHoverCardOptions = {}): SharedHoverCardState {
  const contentId = useId();
  const [target, setTarget] = useState<{ value: string; anchor: HoverCardAnchorTarget } | null>(null);
  const [open, setOpen] = useState(false);
  const live = useRef({ open: false, value: null as string | null, openDelay, closeDelay, openTimer: 0, closeTimer: 0, pressed: false, pressedOnCard: false, selection: false }).current;

  useEffect(() => {
    live.openDelay = openDelay;
    live.closeDelay = closeDelay;
  }, [live, openDelay, closeDelay]);

  const actions = useMemo(() => {
    const commit = (value: string, anchor: HoverCardAnchorTarget) => {
      live.open = true;
      // A selection belongs to the content of the previous trigger.
      if (live.value !== value) live.selection = false;
      live.value = value;
      setTarget((previous) => (previous?.value === value && previous.anchor === anchor ? previous : { value, anchor }));
      setOpen(true);
    };
    const close = () => {
      window.clearTimeout(live.openTimer);
      window.clearTimeout(live.closeTimer);
      live.open = false;
      live.value = null;
      setOpen(false);
    };
    const show = (value: string, anchor: HoverCardAnchorTarget, now = false) => {
      window.clearTimeout(live.openTimer);
      window.clearTimeout(live.closeTimer);
      // An open card moves to the next trigger at once; only the first open waits.
      if (now || live.open) commit(value, anchor);
      else live.openTimer = window.setTimeout(() => commit(value, anchor), live.openDelay);
    };
    const hide = () => {
      window.clearTimeout(live.openTimer);
      // As in Radix HoverCard: a press or a text selection inside the card keeps it open.
      if (!live.open || live.pressedOnCard || live.selection) return;
      window.clearTimeout(live.closeTimer);
      live.closeTimer = window.setTimeout(close, live.closeDelay);
    };
    const release = () => {
      live.pressed = false;
      document.removeEventListener("pointerup", release, true);
      document.removeEventListener("pointercancel", release, true);
    };
    const enter = (element: Element, now: boolean) => {
      const value = element.getAttribute("data-hover-card-trigger");
      if (value !== null) show(value, element, now);
    };
    return {
      show: (value: string, anchor: HoverCardAnchorTarget) => show(value, anchor),
      hide,
      close,
      hold: () => window.clearTimeout(live.closeTimer),
      press: () => {
        live.pressedOnCard = true;
        live.selection = false;
      },
      onPointerEnter: (event: PointerEvent<Element>) => {
        if (event.pointerType !== "touch") enter(event.currentTarget, false);
      },
      onPointerLeave: (event: PointerEvent<Element>) => {
        if (event.pointerType !== "touch") hide();
      },
      // A press dismisses the card (Radix closes it on the press outside) and cancels a pending
      // open; the focus that the press causes must not open it again.
      onPointerDown: () => {
        window.clearTimeout(live.openTimer);
        live.pressed = true;
        // Capture phase: a host handler that stops propagation must not leave the press pending.
        document.addEventListener("pointerup", release, true);
        document.addEventListener("pointercancel", release, true);
      },
      onFocus: (event: FocusEvent<Element>) => {
        if (!live.pressed && isKeyboardFocus(event.currentTarget)) enter(event.currentTarget, true);
      },
      onBlur: () => hide(),
      dispose: () => {
        window.clearTimeout(live.openTimer);
        window.clearTimeout(live.closeTimer);
        release();
      },
    };
  }, [live]);

  useEffect(() => actions.dispose, [actions]);

  useEffect(() => {
    if (!open) return;
    const settle = () => {
      live.pressedOnCard = false;
      window.setTimeout(() => {
        const selection = document.getSelection();
        const card = document.getElementById(contentId);
        live.selection = Boolean(selection && card && selection.toString() !== "" && card.contains(selection.anchorNode));
      });
    };
    document.addEventListener("pointerup", settle, true);
    return () => {
      document.removeEventListener("pointerup", settle, true);
      live.pressedOnCard = false;
      live.selection = false;
    };
  }, [open, live, contentId]);

  // A trigger removed from the document fires neither pointerleave nor blur.
  useEffect(() => {
    if (open && target && target.anchor instanceof Element && !target.anchor.isConnected) actions.close();
  });

  const active = open && target ? target.value : null;
  const { onPointerEnter, onPointerLeave, onPointerDown, onFocus, onBlur, show, hide, close, hold, press } = actions;
  const getTriggerProps = useCallback((value: string): SharedHoverCardTriggerProps => ({
    "data-hover-card-trigger": value,
    "aria-describedby": value === active ? contentId : undefined,
    onPointerEnter,
    onPointerLeave,
    onPointerDown,
    onFocus,
    onBlur,
  }), [active, contentId, onPointerEnter, onPointerLeave, onPointerDown, onFocus, onBlur]);

  return useMemo(() => ({
    open,
    value: active,
    getTriggerProps,
    show,
    hide,
    close,
    controller: { contentId, value: target?.value ?? null, anchor: target?.anchor ?? null, hold, press },
  }), [open, active, getTriggerProps, show, hide, close, contentId, target, hold, press]);
}

export interface SharedHoverCardProps extends Omit<HoverCardContentProps, "children" | "id" | "forceMount"> {
  /** What `useSharedHoverCard` returned. */
  card: SharedHoverCardState;
  /** Content of the card for the active trigger. Called only while the card is mounted. */
  children: (value: string) => ReactNode;
}

function SharedHoverCardBody({ value, render }: { value: string; render: (value: string) => ReactNode }) {
  return <>{render(value)}</>;
}

/**
 * The single card of `useSharedHoverCard`: a `HoverCardContent` anchored to the active trigger.
 * Render it once, next to the triggers.
 */
export const SharedHoverCard = forwardRef<HTMLDivElement, SharedHoverCardProps>(function SharedHoverCard({
  card,
  children,
  onPointerEnter,
  onPointerLeave,
  onPointerDown,
  ...props
}, ref) {
  const { close, hide, controller } = card;
  return (
    // Radix only reports the dismissals here (Escape, a press outside): the delays belong to the hook.
    <HoverCardPrimitive.Root open={card.open} onOpenChange={(next) => { if (!next) close(); }}>
      <HoverCardAnchor anchor={controller.anchor} />
      <HoverCardContent
        ref={ref}
        id={controller.contentId}
        {...props}
        // preventDefault keeps Radix from starting its own timers for the pointer on the card.
        onPointerEnter={(event) => {
          onPointerEnter?.(event);
          if (!event.defaultPrevented && event.pointerType !== "touch") controller.hold();
          event.preventDefault();
        }}
        onPointerLeave={(event) => {
          onPointerLeave?.(event);
          if (!event.defaultPrevented && event.pointerType !== "touch") hide();
          event.preventDefault();
        }}
        onPointerDown={(event) => {
          onPointerDown?.(event);
          if (!event.defaultPrevented) controller.press();
        }}
      >
        {controller.value !== null && <SharedHoverCardBody value={controller.value} render={children} />}
      </HoverCardContent>
    </HoverCardPrimitive.Root>
  );
});
