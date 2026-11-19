"use client";

import { cloneElement, createContext, forwardRef, isValidElement, useCallback, useContext, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { ComponentProps, ForwardedRef, MouseEvent as ReactMouseEvent, MutableRefObject, ReactElement, ReactNode } from "react";
import { ChevronDown, PanelLeft } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "./sheet";
import { Slot } from "@radix-ui/react-slot";
import { TooltipContent, TooltipTrigger } from "./tooltip";
import { TooltipRoot } from "./lib/tooltip-root";
import { inertProps } from "./lib/inert";
import { cn } from "./lib/utils";

const DEFAULT_MOBILE_BREAKPOINT = 768;

export type SidebarState = "expanded" | "collapsed";
export type SidebarSide = "left" | "right";
export type SidebarVariant = "sidebar" | "floating" | "inset";
export type SidebarCollapsible = "offcanvas" | "icon" | "none";

export interface SidebarContextProps {
  state: SidebarState;
  open: boolean;
  setOpen: (open: boolean) => void;
  isMobile: boolean;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | null>(null);
const SidebarFocusContext = createContext<MutableRefObject<HTMLButtonElement | null> | null>(null);
const SidebarScopeContext = createContext<string | null>(null);
/** True while the enclosing `Sidebar` shows as the collapsed icon rail. */
const SidebarRailContext = createContext(false);

interface SidebarGroupContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  contentId: string;
  /** On the collapsed icon rail the group shows its content and no trigger. */
  rail: boolean;
}

/** Set by a collapsible `SidebarGroup`; null in a plain group. */
const SidebarGroupContext = createContext<SidebarGroupContextValue | null>(null);

const useIsomorphicLayoutEffect = typeof document === "undefined" ? useEffect : useLayoutEffect;

/**
 * Hands focus to what replaced a focused control of a collapsible group. Call it from a layout
 * effect cleanup of the part being removed or hidden: React runs that before the element leaves
 * the document, whatever caused the change (the shortcut, a controlled `open`, a resize).
 */
function refocusInGroup(from: Element, selector: string) {
  const group = from.closest(SIDEBAR_GROUP);
  if (!group) return;
  queueMicrotask(() => {
    const active = document.activeElement;
    // Focus is on another control: it moved on its own, or the element was kept. Leave it there.
    if (!group.isConnected || (active && active !== document.body && active !== from)) return;
    group.querySelector<HTMLElement>(selector)?.focus({ preventScroll: true });
  });
}

const SIDEBAR_GROUP = '[data-slot="sidebar-group"]';

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within SidebarProvider");
  return context;
}

export interface SidebarProviderProps extends ComponentProps<"div"> {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpenMobile?: boolean;
  openMobile?: boolean;
  onOpenMobileChange?: (open: boolean) => void;
  mobileBreakpoint?: number;
  cookieName?: string;
  cookieMaxAge?: number;
}

export function SidebarProvider({
  className,
  defaultOpen = true,
  open: controlled,
  onOpenChange,
  defaultOpenMobile = false,
  openMobile: controlledMobile,
  onOpenMobileChange,
  mobileBreakpoint = DEFAULT_MOBILE_BREAKPOINT,
  cookieName = "ci_sidebar_state",
  cookieMaxAge = 60 * 60 * 24 * 7,
  children,
  ...props
}: SidebarProviderProps) {
  const resolvedMobileBreakpoint = Number.isFinite(mobileBreakpoint) && mobileBreakpoint >= 1
    ? Math.round(mobileBreakpoint)
    : DEFAULT_MOBILE_BREAKPOINT;
  const scopeId = `ci-sidebar-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const [uncontrolledMobile, setUncontrolledMobile] = useState(defaultOpenMobile);
  const [isMobile, setIsMobile] = useState(false);
  const mobileTriggerRef = useRef<HTMLButtonElement | null>(null);
  const previousOpenMobileRef = useRef(controlledMobile ?? defaultOpenMobile);
  const open = controlled ?? uncontrolled;
  const openMobile = controlledMobile ?? uncontrolledMobile;

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${resolvedMobileBreakpoint - 1}px)`);
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, [resolvedMobileBreakpoint]);

  const setOpen = useCallback((next: boolean) => {
    if (controlled === undefined) setUncontrolled(next);
    document.cookie = `${encodeURIComponent(cookieName)}=${next ? "1" : "0"}; path=/; max-age=${cookieMaxAge}; SameSite=Lax`;
    onOpenChange?.(next);
  }, [controlled, cookieMaxAge, cookieName, onOpenChange]);

  const setOpenMobile = useCallback((next: boolean) => {
    if (controlledMobile === undefined) setUncontrolledMobile(next);
    onOpenMobileChange?.(next);
  }, [controlledMobile, onOpenMobileChange]);

  const toggleSidebar = useCallback(() => {
    if (isMobile) setOpenMobile(!openMobile);
    else setOpen(!open);
  }, [isMobile, open, openMobile, setOpen, setOpenMobile]);

  useEffect(() => {
    const didClose = previousOpenMobileRef.current && !openMobile;
    previousOpenMobileRef.current = openMobile;
    if (!didClose) return;

    const opener = mobileTriggerRef.current;
    if (!opener?.isConnected) return;
    const frame = window.requestAnimationFrame(() => {
      if (opener.isConnected) opener.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [openMobile]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (typeof event.key !== "string" || event.key.toLowerCase() !== "b" || (!event.metaKey && !event.ctrlKey)) return;
      const target = event.target;
      if (target instanceof Element && target.matches("input, textarea, select, [contenteditable='true']")) return;
      event.preventDefault();
      toggleSidebar();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggleSidebar]);

  const value = useMemo<SidebarContextProps>(() => ({
    state: open ? "expanded" : "collapsed",
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
  }), [isMobile, open, openMobile, setOpen, setOpenMobile, toggleSidebar]);

  return (
    <SidebarContext.Provider value={value}>
      <SidebarFocusContext.Provider value={mobileTriggerRef}>
        <SidebarScopeContext.Provider value={scopeId}>
          <div
            data-slot="sidebar-provider"
            data-state={value.state}
            data-mobile={isMobile || undefined}
            data-ci-sidebar-scope={scopeId}
            className={cn("ci-sidebar-provider", className)}
            {...props}
          >
            <style data-slot="sidebar-responsive-style">{`@media (max-width: ${resolvedMobileBreakpoint - 1}px) { .ci-sidebar[data-ci-sidebar-owner="${scopeId}"]:not([data-mobile]) { display: none; } }`}</style>
            {children}
          </div>
        </SidebarScopeContext.Provider>
      </SidebarFocusContext.Provider>
    </SidebarContext.Provider>
  );
}

export interface SidebarProps extends ComponentProps<"aside"> {
  side?: SidebarSide;
  variant?: SidebarVariant;
  collapsible?: SidebarCollapsible;
  mobileLabel?: string;
}

export function Sidebar({
  className,
  side = "left",
  variant = "sidebar",
  collapsible = "icon",
  mobileLabel = "Navigation",
  inert: inertProp,
  "aria-hidden": ariaHidden,
  children,
  ...props
}: SidebarProps) {
  const { state, isMobile, openMobile, setOpenMobile } = useSidebar();
  const mobileTriggerRef = useContext(SidebarFocusContext);
  const scopeId = useContext(SidebarScopeContext);
  const hiddenOffcanvas = !isMobile && collapsible === "offcanvas" && state === "collapsed";
  const rail = !isMobile && collapsible === "icon" && state === "collapsed";
  const aside = (
    <aside
      {...props}
      {...inertProps(hiddenOffcanvas || Boolean(inertProp))}
      data-slot="sidebar"
      data-state={isMobile || collapsible === "none" ? "expanded" : state}
      data-side={side}
      data-variant={variant}
      data-collapsible={collapsible}
      data-mobile={isMobile || undefined}
      data-ci-sidebar-owner={scopeId || undefined}
      aria-hidden={hiddenOffcanvas || ariaHidden || undefined}
      className={cn("ci-sidebar", className)}
    >
      <SidebarRailContext.Provider value={rail}>{children}</SidebarRailContext.Provider>
    </aside>
  );

  if (!isMobile || collapsible === "none") return aside;
  return (
    <Sheet open={openMobile} onOpenChange={setOpenMobile}>
      <SheetContent
        side={side}
        showClose={false}
        className="ci-sidebar-sheet"
        onCloseAutoFocus={(event) => {
          if (!mobileTriggerRef?.current) return;
          event.preventDefault();
          mobileTriggerRef.current.focus({ preventScroll: true });
        }}
      >
        <SheetTitle className="ci-sr-only">{mobileLabel}</SheetTitle>
        {aside}
      </SheetContent>
    </Sheet>
  );
}

export function SidebarHeader({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="sidebar-header" className={cn("ci-sidebar__header", className)} {...props} />;
}
export function SidebarContent({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="sidebar-content" className={cn("ci-sidebar__content", className)} {...props} />;
}
export function SidebarFooter({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="sidebar-footer" className={cn("ci-sidebar__footer", className)} {...props} />;
}
export function SidebarSeparator({ className, ...props }: ComponentProps<"hr">) {
  return <hr data-slot="sidebar-separator" className={cn("ci-sidebar__separator", className)} {...props} />;
}

export interface SidebarGroupProps extends ComponentProps<"section"> {
  /**
   * Make `SidebarGroupLabel` a trigger that shows and hides `SidebarGroupContent`.
   * On the collapsed icon rail the group shows its content and no trigger, as a plain group does.
   */
  collapsible?: boolean;
  /** Controlled open state of a collapsible group. */
  open?: boolean;
  /** Initial open state of an uncontrolled collapsible group. Default: open. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function SidebarGroup({ className, collapsible = false, open: controlled, defaultOpen = true, onOpenChange, ...props }: SidebarGroupProps) {
  const contentId = `${useId()}-content`;
  const rail = useContext(SidebarRailContext);
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const open = controlled ?? uncontrolled;
  const setOpen = useCallback((next: boolean) => {
    if (controlled === undefined) setUncontrolled(next);
    onOpenChange?.(next);
  }, [controlled, onOpenChange]);
  const group = useMemo<SidebarGroupContextValue | null>(
    () => (collapsible ? { open, setOpen, contentId, rail } : null),
    [collapsible, contentId, open, rail, setOpen],
  );
  return (
    <SidebarGroupContext.Provider value={group}>
      <section
        data-slot="sidebar-group"
        data-collapsible={collapsible || undefined}
        data-state={collapsible ? (open ? "open" : "closed") : undefined}
        className={cn("ci-sidebar__group", className)}
        {...props}
      />
    </SidebarGroupContext.Provider>
  );
}

export interface SidebarGroupLabelProps extends ComponentProps<"div"> {
  /** In a collapsible group: replaces the chevron; `null` hides it. Decorative: it is hidden from assistive technology, so the trigger is named by the label alone. */
  indicator?: ReactNode;
}

/** The label's button in a collapsible group. Removed on the icon rail; a focused one passes focus to the group's first item. */
function SidebarGroupTrigger({ group, indicator, children }: { group: SidebarGroupContextValue; indicator: ReactNode; children: ReactNode }) {
  const { contentId } = group;
  useIsomorphicLayoutEffect(() => () => {
    const focused = document.activeElement;
    if (focused?.getAttribute("data-slot") !== "sidebar-group-trigger" || focused.getAttribute("aria-controls") !== contentId) return;
    refocusInGroup(focused, '[data-slot="sidebar-menu-button"]:not(:disabled)');
  }, [contentId]);
  return (
    <button
      type="button"
      data-slot="sidebar-group-trigger"
      data-state={group.open ? "open" : "closed"}
      aria-expanded={group.open}
      aria-controls={contentId}
      className="ci-sidebar__group-trigger"
      onClick={() => group.setOpen(!group.open)}
    >
      <span className="ci-sidebar__group-trigger-label">{children}</span>
      {indicator === undefined
        ? <ChevronDown className="ci-sidebar__group-chevron" aria-hidden="true" />
        : indicator != null && <span data-slot="sidebar-group-indicator" className="ci-sidebar__group-indicator" aria-hidden="true">{indicator}</span>}
    </button>
  );
}

/**
 * Heading of a `SidebarGroup`. In a collapsible group its content becomes the trigger
 * button (`aria-expanded`, `aria-controls`), named by that content; the props stay on the label.
 */
export function SidebarGroupLabel({ className, indicator, children, ...props }: SidebarGroupLabelProps) {
  const group = useContext(SidebarGroupContext);
  if (!group || group.rail) return <div data-slot="sidebar-group-label" className={cn("ci-sidebar__group-label", className)} {...props}>{children}</div>;
  return (
    <div data-slot="sidebar-group-label" data-collapsible="true" className={cn("ci-sidebar__group-label", className)} {...props}>
      <SidebarGroupTrigger group={group} indicator={indicator}>{children}</SidebarGroupTrigger>
    </div>
  );
}

export interface SidebarGroupContentProps extends ComponentProps<"div"> {
  /** In a collapsible group: keep closed children mounted (hidden). Default: render them only while open. */
  keepMounted?: boolean;
}

/**
 * The children of a collapsible group's content. When the group removes them, or hides them with
 * `keepMounted`, a focused item passes focus to the group's trigger.
 */
function SidebarGroupItems({ contentId, hidden, children }: { contentId: string; hidden: boolean; children: ReactNode }) {
  useIsomorphicLayoutEffect(() => () => {
    // Runs when these items go away or `hidden` changes, before the content element is updated.
    const focused = hidden ? null : document.activeElement;
    if (focused?.closest('[data-slot="sidebar-group-content"]')?.id === contentId) refocusInGroup(focused, '[data-slot="sidebar-group-trigger"]');
  }, [contentId, hidden]);
  return <>{children}</>;
}

/** Body of a `SidebarGroup`, and the region a collapsible group shows and hides (it sets the `id`). */
export function SidebarGroupContent({ className, keepMounted = false, children, ...props }: SidebarGroupContentProps) {
  const group = useContext(SidebarGroupContext);
  if (!group) return <div data-slot="sidebar-group-content" className={cn("ci-sidebar__group-content", className)} {...props}>{children}</div>;
  // On the icon rail the content is always shown, as in a plain group.
  const open = group.open || group.rail;
  return (
    <div
      {...props}
      id={group.contentId}
      data-slot="sidebar-group-content"
      data-state={group.rail ? undefined : open ? "open" : "closed"}
      hidden={!open}
      className={cn("ci-sidebar__group-content", className)}
    >
      {open || keepMounted ? <SidebarGroupItems contentId={group.contentId} hidden={!open}>{children}</SidebarGroupItems> : null}
    </div>
  );
}

export function SidebarMenu({ className, ...props }: ComponentProps<"ul">) {
  return <ul data-slot="sidebar-menu" className={cn("ci-sidebar__menu", className)} {...props} />;
}
export function SidebarMenuItem({ className, ...props }: ComponentProps<"li">) {
  return <li data-slot="sidebar-menu-item" className={cn("ci-sidebar__menu-item", className)} {...props} />;
}

export interface SidebarMenuButtonProps extends ComponentProps<"button"> {
  isActive?: boolean;
  tooltip?: ReactNode;
  asChild?: boolean;
}


/** What a tooltip trigger puts on its element: the handlers that drive the tooltip, and its state. */
type MenuTooltipHandlers = Pick<ComponentProps<"button">, "onPointerMove" | "onPointerLeave" | "onPointerDown" | "onFocus" | "onBlur" | "onClick">;
interface MenuTooltipState { "data-state"?: string; "aria-describedby"?: string }

interface SidebarMenuTooltipAnchorProps extends MenuTooltipHandlers, MenuTooltipState {
  control: MutableRefObject<HTMLElement | null>;
  handlers: MutableRefObject<MenuTooltipHandlers | null>;
  setState: (update: (current: MenuTooltipState | null) => MenuTooltipState | null) => void;
}

function assignRef(ref: ForwardedRef<HTMLElement>, element: HTMLElement | null) {
  if (typeof ref === "function") ref(element);
  else if (ref) ref.current = element;
}

/** Handlers for the control that call whatever the mounted tooltip trigger currently has, and nothing without one. */
function delegateTo(handlers: MutableRefObject<MenuTooltipHandlers | null>): MenuTooltipHandlers {
  const to = <Name extends keyof MenuTooltipHandlers>(name: Name) => ((event: never) => handlers.current?.[name]?.(event)) as MenuTooltipHandlers[Name];
  return { onPointerMove: to("onPointerMove"), onPointerLeave: to("onPointerLeave"), onPointerDown: to("onPointerDown"), onFocus: to("onFocus"), onBlur: to("onBlur"), onClick: to("onClick") };
}

/**
 * The rail tooltip's trigger, rendered beside the control instead of around it, so that mounting
 * and unmounting the tooltip never remounts the control. It renders nothing and hands on what a
 * trigger receives: the ref goes to the control's element, the handlers and the state attributes
 * to `SidebarMenuButton`, which puts them on the control.
 */
const SidebarMenuTooltipAnchor = forwardRef<HTMLElement, SidebarMenuTooltipAnchorProps>(function SidebarMenuTooltipAnchor(
  { control, handlers, setState, "data-state": dataState, "aria-describedby": describedBy, onPointerMove, onPointerLeave, onPointerDown, onFocus, onBlur, onClick },
  ref,
) {
  const bound = useRef<{ ref: ForwardedRef<HTMLElement>; element: HTMLElement | null } | null>(null);
  // After every commit: the trigger's handlers are new on each render, and an `asChild` control can change element.
  useEffect(() => {
    handlers.current = { onPointerMove, onPointerLeave, onPointerDown, onFocus, onBlur, onClick };
    const element = control.current;
    if (bound.current?.ref === ref && bound.current.element === element) return;
    if (bound.current && bound.current.ref !== ref) assignRef(bound.current.ref, null);
    bound.current = { ref, element };
    assignRef(ref, element);
  });
  useEffect(() => {
    // A closed tooltip is the resting state the button already renders, so it is not stored.
    const next = dataState === "closed" && describedBy === undefined ? null : { "data-state": dataState, "aria-describedby": describedBy };
    setState((current) => (current?.["data-state"] === next?.["data-state"] && current?.["aria-describedby"] === next?.["aria-describedby"] ? current : next));
  }, [dataState, describedBy, setState]);
  useEffect(() => () => {
    if (bound.current) assignRef(bound.current.ref, null);
    bound.current = null;
    handlers.current = null;
    setState(() => null);
  }, [handlers, setState]);
  return null;
});

export function SidebarMenuButton({ className, isActive = false, tooltip, asChild = false, children, onClick, ...props }: SidebarMenuButtonProps) {
  const { state, isMobile, setOpenMobile } = useSidebar();
  const tooltipActive = tooltip != null && state === "collapsed" && !isMobile;
  const controlRef = useRef<HTMLElement | null>(null);
  const tooltipHandlers = useRef<MenuTooltipHandlers | null>(null);
  const [tooltipState, setTooltipState] = useState<MenuTooltipState | null>(null);
  const classes = cn("ci-sidebar__menu-button", className);
  const fallbackLabel = state === "collapsed" && !isMobile && typeof tooltip === "string" ? tooltip : undefined;
  const finishInteraction = (event: ReactMouseEvent<HTMLElement>) => {
    onClick?.(event as ReactMouseEvent<HTMLButtonElement>);
    if (!event.defaultPrevented && isMobile) setOpenMobile(false);
  };
  let control: ReactElement;
  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<Record<string, unknown>>;
    const hasSuppliedName = props["aria-label"] != null
      || props["aria-labelledby"] != null
      || child.props["aria-label"] != null
      || child.props["aria-labelledby"] != null;
    control = cloneElement(child, {
      ...props,
      ...(!hasSuppliedName && fallbackLabel ? { "aria-label": fallbackLabel } : {}),
      "data-slot": "sidebar-menu-button",
      "data-active": isActive || undefined,
      "aria-current": isActive ? "page" : undefined,
      className: cn(classes, child.props.className as string | undefined),
      onClick: (event: ReactMouseEvent<HTMLElement>) => {
        (child.props.onClick as ((event: ReactMouseEvent<HTMLElement>) => void) | undefined)?.(event);
        if (!event.defaultPrevented) finishInteraction(event);
      },
    });
  } else {
    const hasSuppliedName = props["aria-label"] != null || props["aria-labelledby"] != null;
    control = <button type="button" data-slot="sidebar-menu-button" data-active={isActive || undefined} aria-current={isActive ? "page" : undefined} aria-label={!hasSuppliedName ? fallbackLabel : undefined} className={classes} onClick={finishInteraction} {...props}>{children}</button>;
  }
  if (tooltip == null) return control;
  // The control keeps its place in every sidebar state; the tooltip mounts beside it on the collapsed
  // rail only. Wrapping the control in the tooltip there would remount it and drop its focus.
  const trigger = tooltipActive
    ? { "data-state": tooltipState?.["data-state"] ?? "closed", "aria-describedby": tooltipState?.["aria-describedby"], ...delegateTo(tooltipHandlers) }
    : undefined;
  return (
    <>
      <Slot ref={controlRef} {...(trigger as ComponentProps<typeof Slot> | undefined)}>{control}</Slot>
      {tooltipActive ? (
        // TooltipRoot joins a shared TooltipProvider when there is one, as every kit tooltip does.
        <TooltipRoot>
          <TooltipTrigger asChild><SidebarMenuTooltipAnchor control={controlRef} handlers={tooltipHandlers} setState={setTooltipState} /></TooltipTrigger>
          <TooltipContent side="right">{tooltip}</TooltipContent>
        </TooltipRoot>
      ) : null}
    </>
  );
}

export function SidebarMenuBadge({ className, ...props }: ComponentProps<"span">) {
  return <span data-slot="sidebar-menu-badge" className={cn("ci-sidebar__menu-badge", className)} {...props} />;
}

export interface SidebarActionProps extends ComponentProps<"button"> {
  /** Hide until the row is hovered or focused; always visible on touch and while pressed/expanded. */
  showOnHover?: boolean;
  /** Render the single child (e.g. a DropdownMenuTrigger's button) with the action treatment. */
  asChild?: boolean;
}

function renderSidebarAction(slot: string, base: string, { className, showOnHover = false, asChild = false, children, type = "button", ...props }: SidebarActionProps, ref: ForwardedRef<HTMLButtonElement>) {
  const shared = { "data-slot": slot, "data-show-on-hover": showOnHover || undefined };
  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<Record<string, unknown>>;
    return cloneElement(child, { ...props, ...shared, ref, className: cn(base, className, child.props.className as string | undefined) });
  }
  return <button ref={ref} type={type} {...shared} className={cn(base, className)} {...props}>{children}</button>;
}

/**
 * Icon action trailing a `SidebarMenuButton` (pin, overflow menu). Needs an `aria-label`.
 * It sits where `SidebarMenuBadge` does, so use one or the other on an item.
 */
export const SidebarMenuAction = forwardRef<HTMLButtonElement, SidebarActionProps>(function SidebarMenuAction(props, ref) {
  return renderSidebarAction("sidebar-menu-action", "ci-sidebar__menu-action", props, ref);
});

/**
 * Icon action on a `SidebarGroup` header row. Needs an `aria-label`. Place it right after
 * `SidebarGroupLabel`; its position assumes that label is the group's first child. Keep that
 * label to short text with an optional icon: it renders as one ellipsized line.
 */
export const SidebarGroupAction = forwardRef<HTMLButtonElement, SidebarActionProps>(function SidebarGroupAction(props, ref) {
  return renderSidebarAction("sidebar-group-action", "ci-sidebar__group-action", props, ref);
});

export function SidebarInset({ className, ...props }: ComponentProps<"main">) {
  return <main data-slot="sidebar-inset" className={cn("ci-sidebar-inset", className)} {...props} />;
}
export const SidebarTrigger = forwardRef<HTMLButtonElement, ComponentProps<"button">>(function SidebarTrigger({ className, children, onClick, ...props }, ref) {
  const { toggleSidebar, open, openMobile, isMobile } = useSidebar();
  const mobileTriggerRef = useContext(SidebarFocusContext);
  const expanded = isMobile ? openMobile : open;
  return (
    <button
      ref={ref}
      type="button"
      data-slot="sidebar-trigger"
      aria-label={expanded ? "Close sidebar" : "Open sidebar"}
      aria-expanded={expanded}
      className={cn("ci-sidebar-trigger", className)}
      onClick={(event) => {
        if (isMobile && !openMobile && mobileTriggerRef) mobileTriggerRef.current = event.currentTarget;
        onClick?.(event);
        if (!event.defaultPrevented) toggleSidebar();
      }}
      {...props}
    >
      {children ?? <PanelLeft aria-hidden="true" />}
    </button>
  );
});
export function SidebarRail({ className, ...props }: ComponentProps<"button">) {
  const { toggleSidebar, isMobile } = useSidebar();
  if (isMobile) return null;
  return <button type="button" tabIndex={-1} aria-label="Toggle sidebar" title="Toggle sidebar" data-slot="sidebar-rail" className={cn("ci-sidebar__rail", className)} onClick={toggleSidebar} {...props} />;
}
export interface SidebarBrandProps extends ComponentProps<"div"> { mark?: ReactNode; name: ReactNode; detail?: ReactNode; }
export function SidebarBrand({ className, mark, name, detail, ...props }: SidebarBrandProps) {
  return <div data-slot="sidebar-brand" className={cn("ci-sidebar__brand", className)} {...props}>{mark != null && <span className="ci-sidebar__brand-mark">{mark}</span>}<span className="ci-sidebar__brand-copy"><strong>{name}</strong>{detail != null && <small>{detail}</small>}</span></div>;
}
