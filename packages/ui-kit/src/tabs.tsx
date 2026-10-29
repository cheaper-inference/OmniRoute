"use client";

import { createContext, useCallback, useContext, useId, useState } from "react";
import type { ComponentProps, KeyboardEvent as ReactKeyboardEvent, ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "./lib/utils";

export type TabsOrientation = "horizontal" | "vertical";
export type TabsVariant = "pill" | "capsule" | "underline" | "card";

interface TabsContextValue {
  value: string | undefined;
  setValue: (value: string) => void;
  orientation: TabsOrientation;
  variant: TabsVariant;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(component: string): TabsContextValue {
  const context = useContext(TabsContext);
  if (!context) throw new Error(`<${component}> must be used inside <Tabs>`);
  return context;
}

export interface TabsProps extends Omit<ComponentProps<"div">, "onChange" | "defaultValue"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: TabsOrientation;
  variant?: TabsVariant;
}

export function Tabs({
  className,
  value: controlled,
  defaultValue,
  onValueChange,
  orientation = "horizontal",
  variant = "pill",
  children,
  ...props
}: TabsProps) {
  const baseId = useId();
  const [uncontrolled, setUncontrolled] = useState<string | undefined>(defaultValue);
  const isControlled = controlled !== undefined;
  const value = isControlled ? controlled : uncontrolled;

  const setValue = useCallback(
    (next: string) => {
      if (!isControlled) setUncontrolled(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  return (
    <TabsContext.Provider value={{ value, setValue, orientation, variant, baseId }}>
      <div
        data-slot="tabs"
        data-orientation={orientation}
        data-variant={variant}
        className={cn("ci-tabs", `ci-tabs--${orientation}`, `ci-tabs--${variant}`, className)}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, ...props }: ComponentProps<"div">) {
  const { orientation } = useTabsContext("TabsList");
  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      data-slot="tabs-list"
      className={cn("ci-tabs__list", className)}
      {...props}
    />
  );
}

function onTabKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>, orientation: TabsOrientation) {
  const nextKey = orientation === "vertical" ? "ArrowDown" : "ArrowRight";
  const prevKey = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
  const list = event.currentTarget.closest('[role="tablist"]');
  if (!list) return;
  const tabs = Array.from(list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'));
  const index = tabs.indexOf(event.currentTarget);
  let next = -1;
  if (event.key === nextKey) next = (index + 1) % tabs.length;
  else if (event.key === prevKey) next = (index - 1 + tabs.length) % tabs.length;
  else if (event.key === "Home") next = 0;
  else if (event.key === "End") next = tabs.length - 1;
  if (next >= 0) {
    event.preventDefault();
    tabs[next].focus();
    tabs[next].click();
  }
}

export interface TabsTriggerProps extends ComponentProps<"button"> {
  value: string;
  /** Decorative icon shown by the card variant. */
  icon?: ReactNode;
  /** Supporting copy shown by the card variant, separate from the tab name. */
  description?: ReactNode;
}

export function TabsTrigger({ className, value, icon, description, disabled, onClick, onKeyDown, children, ...props }: TabsTriggerProps) {
  const context = useTabsContext("TabsTrigger");
  const selected = context.value === value;
  const isCard = context.variant === "card";
  const titleId = `${context.baseId}-tab-${value}-title`;
  const descriptionId = `${context.baseId}-tab-${value}-description`;
  return (
    <button
      type="button"
      role="tab"
      id={`${context.baseId}-tab-${value}`}
      aria-selected={selected}
      aria-controls={`${context.baseId}-panel-${value}`}
      aria-labelledby={isCard && !props["aria-label"] ? titleId : undefined}
      aria-describedby={isCard && description != null ? descriptionId : undefined}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      data-slot="tabs-trigger"
      data-state={selected ? "active" : "inactive"}
      className={cn("ci-tabs__trigger", className)}
      onClick={(event) => {
        onClick?.(event);
        if (!disabled) context.setValue(value);
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!event.defaultPrevented) onTabKeyDown(event, context.orientation);
      }}
      {...props}
    >
      {isCard ? <>
        <span className="ci-tabs__card-heading">
          {icon != null && <span className="ci-tabs__card-icon" aria-hidden="true">{icon}</span>}
          <span id={titleId} className="ci-tabs__card-title">{children}</span>
          <span className="ci-tabs__card-indicator" aria-hidden="true"><Check /></span>
        </span>
        {description != null && <span id={descriptionId} className="ci-tabs__card-description">{description}</span>}
      </> : children}
    </button>
  );
}

export interface TabsContentProps extends ComponentProps<"div"> {
  value: string;
  forceMount?: boolean;
}

export function TabsContent({ className, value, forceMount, children, ...props }: TabsContentProps) {
  const context = useTabsContext("TabsContent");
  const selected = context.value === value;
  if (!selected && !forceMount) return null;
  return (
    <div
      role="tabpanel"
      id={`${context.baseId}-panel-${value}`}
      aria-labelledby={`${context.baseId}-tab-${value}${context.variant === "card" ? "-title" : ""}`}
      tabIndex={0}
      hidden={!selected}
      data-slot="tabs-content"
      data-state={selected ? "active" : "inactive"}
      className={cn("ci-tabs__content", className)}
      {...props}
    >
      {children}
    </div>
  );
}
