"use client";

import { createContext, useCallback, useContext, useId, useRef, useState } from "react";
import type { ComponentProps, KeyboardEvent as ReactKeyboardEvent, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "./lib/utils";

export type AccordionType = "single" | "multiple";
export type AccordionVariant = "plain" | "bordered";
export interface AccordionItemData { value?: string; label: ReactNode; content: ReactNode; disabled?: boolean; }

interface AccordionContextValue {
  openValues: string[];
  toggle: (value: string) => void;
  baseId: string;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);
const ItemContext = createContext<{ value: string; disabled: boolean } | null>(null);

function useAccordionContext(component: string) {
  const context = useContext(AccordionContext);
  if (!context) throw new Error(`<${component}> must be used inside <Accordion>`);
  return context;
}

function useItemContext(component: string) {
  const context = useContext(ItemContext);
  if (!context) throw new Error(`<${component}> must be used inside <AccordionItem>`);
  return context;
}

const toArray = (value?: string | string[]) => value == null ? [] : Array.isArray(value) ? value : [value];

export interface AccordionProps extends Omit<ComponentProps<"div">, "defaultValue" | "onChange"> {
  type?: AccordionType;
  collapsible?: boolean;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  variant?: AccordionVariant;
  items?: AccordionItemData[];
}

export function Accordion({
  className,
  type = "single",
  collapsible = true,
  value: controlled,
  defaultValue,
  onValueChange,
  variant = "plain",
  items,
  children,
  ...props
}: AccordionProps) {
  const baseId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [uncontrolled, setUncontrolled] = useState(() => toArray(defaultValue));
  const isControlled = controlled !== undefined;
  const openValues = isControlled ? toArray(controlled) : uncontrolled;
  const setValues = useCallback((next: string[]) => {
    if (!isControlled) setUncontrolled(next);
    onValueChange?.(type === "single" ? next[0] ?? "" : next);
  }, [isControlled, onValueChange, type]);
  const toggle = useCallback((itemValue: string) => {
    const open = openValues.includes(itemValue);
    if (type === "single") setValues(open ? (collapsible ? [] : openValues) : [itemValue]);
    else setValues(open ? openValues.filter((value) => value !== itemValue) : [...openValues, itemValue]);
  }, [collapsible, openValues, setValues, type]);
  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.dataset.slot !== "accordion-trigger") return;
    const triggers = Array.from(rootRef.current?.querySelectorAll<HTMLButtonElement>('[data-slot="accordion-trigger"]:not(:disabled)') ?? []);
    const index = triggers.indexOf(target as HTMLButtonElement);
    let next = -1;
    if (event.key === "ArrowDown") next = (index + 1) % triggers.length;
    else if (event.key === "ArrowUp") next = (index - 1 + triggers.length) % triggers.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = triggers.length - 1;
    if (next >= 0) { event.preventDefault(); triggers[next]?.focus(); }
  };
  const content = items
    ? items.map((item, index) => (
        <AccordionItem key={item.value ?? index} value={item.value ?? String(index)} disabled={item.disabled}>
          <AccordionTrigger>{item.label}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))
    : children;
  return (
    <AccordionContext.Provider value={{ openValues, toggle, baseId }}>
      <div ref={rootRef} data-slot="accordion" data-variant={variant} className={cn("ci-accordion", `ci-accordion--${variant}`, className)} onKeyDown={onKeyDown} {...props}>
        {content}
      </div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps extends ComponentProps<"div"> { value: string; disabled?: boolean; }

export function AccordionItem({ className, value, disabled = false, ...props }: AccordionItemProps) {
  const { openValues } = useAccordionContext("AccordionItem");
  return (
    <ItemContext.Provider value={{ value, disabled }}>
      <div data-slot="accordion-item" data-state={openValues.includes(value) ? "open" : "closed"} data-disabled={disabled || undefined} className={cn("ci-accordion__item", className)} {...props} />
    </ItemContext.Provider>
  );
}

export function AccordionTrigger({ className, children, ...props }: ComponentProps<"button">) {
  const { openValues, toggle, baseId } = useAccordionContext("AccordionTrigger");
  const { value, disabled } = useItemContext("AccordionTrigger");
  const open = openValues.includes(value);
  return (
    <h3 className="ci-accordion__header">
      <button
        type="button"
        data-slot="accordion-trigger"
        data-state={open ? "open" : "closed"}
        id={`${baseId}-trigger-${value}`}
        aria-expanded={open}
        aria-controls={`${baseId}-content-${value}`}
        disabled={disabled}
        className={cn("ci-accordion__trigger", className)}
        onClick={() => toggle(value)}
        {...props}
      >
        <span>{children}</span><ChevronDown className="ci-accordion__icon" aria-hidden="true" />
      </button>
    </h3>
  );
}

export function AccordionContent({ className, children, ...props }: ComponentProps<"div">) {
  const { openValues, baseId } = useAccordionContext("AccordionContent");
  const { value } = useItemContext("AccordionContent");
  const open = openValues.includes(value);
  return (
    <div
      role="region"
      id={`${baseId}-content-${value}`}
      aria-labelledby={`${baseId}-trigger-${value}`}
      aria-hidden={!open}
      data-state={open ? "open" : "closed"}
      className={cn("ci-accordion__content", className)}
    >
      <div className="ci-accordion__content-inner"><div className="ci-accordion__body" {...props}>{children}</div></div>
    </div>
  );
}
