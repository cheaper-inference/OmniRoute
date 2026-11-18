"use client";

import { createContext, forwardRef, useContext, useEffect, useRef } from "react";
import type { ComponentProps, ReactNode, RefObject } from "react";
import { X } from "lucide-react";
import { Button } from "./button";
import type { ButtonProps } from "./button";
import { cn } from "./lib/utils";

export interface DockedLayoutProps extends ComponentProps<"div"> {
  /** One in-flow panel. Keep the caller's dashboard state mounted while it is open. */
  panel?: ReactNode;
  /** Override visibility when a mounted panel component returns null while closed. */
  panelOpen?: boolean;
}

/** An available-workspace responsive layout, independent of viewport/sidebar width. */
export function DockedLayout({ panel, panelOpen, className, children, ...props }: DockedLayoutProps) {
  const hasPanel = panel != null && panel !== false;
  return <div data-slot="docked-layout" data-panel-open={(panelOpen ?? hasPanel) || undefined} className={cn("ci-docked-layout", className)} {...props}>
    <div className="ci-docked-layout__content">{children}</div>
    {panel}
  </div>;
}

const RailContext = createContext<(() => void) | undefined>(undefined);

export interface DockedRailProps extends ComponentProps<"aside"> {
  /** Accessible name for this non-modal complementary panel. */
  label: string;
  onClose: () => void;
  autoFocus?: boolean;
  initialFocusRef?: RefObject<HTMLElement | null>;
  returnFocusRef?: RefObject<HTMLElement | null>;
}

/** No portal, backdrop, focus trap or page scroll lock. Render inside DockedLayout. */
export const DockedRail = forwardRef<HTMLElement, DockedRailProps>(function DockedRail({
  label, onClose, autoFocus = true, initialFocusRef, returnFocusRef,
  className, children, onKeyDown, ...props
}, ref) {
  const elementRef = useRef<HTMLElement | null>(null);
  const focusOptions = useRef({ autoFocus, initialFocusRef, returnFocusRef });
  useEffect(() => {
    const options = focusOptions.current;
    const opener = options.returnFocusRef?.current ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    if (options.autoFocus) (options.initialFocusRef?.current ?? elementRef.current)?.focus({ preventScroll: true });
    return () => {
      const target = options.returnFocusRef?.current ?? opener;
      if (target?.isConnected) target.focus();
    };
  }, []);
  return <RailContext.Provider value={onClose}>
    <aside {...props} ref={(node) => {
      elementRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    }} aria-label={label} tabIndex={-1} data-slot="docked-rail" className={cn("ci-docked-rail", className)} onKeyDown={(event) => {
      onKeyDown?.(event);
      if (event.key !== "Escape" || event.defaultPrevented) return;
      // A nested menu/dialog owns its first Escape; the rail stays non-modal.
      if ((event.target as HTMLElement).closest('[role="dialog"], [role="alertdialog"], [role="menu"], [role="listbox"]')) return;
      event.preventDefault();
      event.stopPropagation();
      onClose();
    }}>{children}</aside>
  </RailContext.Provider>;
});

export function DockedRailHeader({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="docked-rail-header" className={cn("ci-docked-rail__header", className)} {...props} />;
}

export function DockedRailBody({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="docked-rail-body" className={cn("ci-docked-rail__body", className)} {...props} />;
}

export function DockedRailFooter({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="docked-rail-footer" className={cn("ci-docked-rail__footer", className)} {...props} />;
}

export function DockedRailClose({ onClick, children, ...props }: ButtonProps) {
  const onClose = useContext(RailContext);
  if (!onClose) throw new Error("<DockedRailClose> must be used inside <DockedRail>");
  return <Button type="button" variant="ghost" size="icon-sm" aria-label="Close panel" {...props} onClick={(event) => {
    onClick?.(event);
    if (!event.defaultPrevented) onClose();
  }}>{children ?? <X aria-hidden="true" />}</Button>;
}
