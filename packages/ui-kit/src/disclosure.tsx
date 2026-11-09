"use client";

import { createContext, forwardRef, useContext, useId, useState } from "react";
import type { ComponentProps, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "./lib/utils";

interface DisclosureContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerId: string;
  contentId: string;
  disabled: boolean;
}

const DisclosureContext = createContext<DisclosureContextValue | null>(null);

function useDisclosure(component: string) {
  const context = useContext(DisclosureContext);
  if (!context) throw new Error(`<${component}> must be used inside <Disclosure>`);
  return context;
}

export interface DisclosureProps extends ComponentProps<"div"> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}

/** One show/hide section (WAI-ARIA disclosure). Use Accordion for a set of sections. */
export function Disclosure({
  className,
  open: controlled,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  ...props
}: DisclosureProps) {
  const baseId = useId();
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const open = controlled ?? uncontrolled;
  const setOpen = (next: boolean) => {
    if (controlled === undefined) setUncontrolled(next);
    onOpenChange?.(next);
  };

  return (
    <DisclosureContext.Provider
      value={{ open, setOpen, triggerId: `${baseId}-trigger`, contentId: `${baseId}-content`, disabled }}
    >
      <div data-slot="disclosure" data-state={open ? "open" : "closed"} className={cn("ci-disclosure", className)} {...props} />
    </DisclosureContext.Provider>
  );
}

export interface DisclosureTriggerProps extends ComponentProps<"button"> {
  /** Trailing content before the chevron (count, Badge). */
  meta?: ReactNode;
  /** Replaces the chevron; `null` hides it. */
  indicator?: ReactNode;
}

export const DisclosureTrigger = forwardRef<HTMLButtonElement, DisclosureTriggerProps>(function DisclosureTrigger(
  { className, children, meta, indicator, onClick, disabled, ...props },
  ref,
) {
  const context = useDisclosure("DisclosureTrigger");

  return (
    <button
      {...props}
      ref={ref}
      type="button"
      id={context.triggerId}
      data-slot="disclosure-trigger"
      data-state={context.open ? "open" : "closed"}
      aria-expanded={context.open}
      aria-controls={context.contentId}
      disabled={disabled ?? context.disabled}
      className={cn("ci-disclosure__trigger", className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) context.setOpen(!context.open);
      }}
    >
      <span className="ci-disclosure__label">{children}</span>
      {meta != null && <span className="ci-disclosure__meta">{meta}</span>}
      {indicator === undefined ? <ChevronDown className="ci-disclosure__icon" aria-hidden="true" /> : indicator}
    </button>
  );
});

export interface DisclosureContentProps extends ComponentProps<"div"> {
  /** Keep closed children mounted (hidden). Default: render them only while open. */
  keepMounted?: boolean;
}

export function DisclosureContent({ className, keepMounted = false, children, ...props }: DisclosureContentProps) {
  const context = useDisclosure("DisclosureContent");

  return (
    <div
      {...props}
      id={context.contentId}
      data-slot="disclosure-content"
      data-state={context.open ? "open" : "closed"}
      hidden={!context.open}
      className={cn("ci-disclosure__content", className)}
    >
      {context.open || keepMounted ? children : null}
    </div>
  );
}
