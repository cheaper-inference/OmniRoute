"use client";

import { cloneElement, createContext, forwardRef, isValidElement, useCallback, useContext, useEffect, useId, useMemo, useRef, useState, version as reactVersion } from "react";
import type { ComponentProps, MouseEvent as ReactMouseEvent, MutableRefObject, ReactElement, ReactNode } from "react";
import { PanelLeft } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "./sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { cn } from "./lib/utils";

const DEFAULT_MOBILE_BREAKPOINT = 768;
const SUPPORTS_BOOLEAN_INERT = Number.parseInt(reactVersion, 10) >= 19;

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
  const inertProps = hiddenOffcanvas || inertProp
    ? ({ inert: SUPPORTS_BOOLEAN_INERT ? true : "" } as unknown as ComponentProps<"aside">)
    : {};
  const aside = (
    <aside
      {...props}
      {...inertProps}
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
      {children}
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
export function SidebarGroup({ className, ...props }: ComponentProps<"section">) {
  return <section data-slot="sidebar-group" className={cn("ci-sidebar__group", className)} {...props} />;
}
export function SidebarGroupLabel({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="sidebar-group-label" className={cn("ci-sidebar__group-label", className)} {...props} />;
}
export function SidebarGroupContent({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="sidebar-group-content" className={cn("ci-sidebar__group-content", className)} {...props} />;
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

export function SidebarMenuButton({ className, isActive = false, tooltip, asChild = false, children, onClick, ...props }: SidebarMenuButtonProps) {
  const { state, isMobile, setOpenMobile } = useSidebar();
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
  if (tooltip != null && state === "collapsed" && !isMobile) {
    return <Tooltip><TooltipTrigger asChild>{control}</TooltipTrigger><TooltipContent side="right">{tooltip}</TooltipContent></Tooltip>;
  }
  return control;
}

export function SidebarMenuBadge({ className, ...props }: ComponentProps<"span">) {
  return <span data-slot="sidebar-menu-badge" className={cn("ci-sidebar__menu-badge", className)} {...props} />;
}
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
