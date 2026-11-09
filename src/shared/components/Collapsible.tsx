"use client";

import { useState, type ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@omniroute/ui-kit/accordion";
import { cn } from "@/shared/utils/cn";
import Icon from "./Icon";

interface CollapsibleProps {
  /** Header content (always visible, click-to-toggle). */
  title: ReactNode;
  /** Optional secondary line under the title. */
  subtitle?: ReactNode;
  /** Material symbol name shown left of the title. */
  icon?: string;
  /** Trailing element rendered next to the trigger (badges, op counts, toggles…). */
  trailing?: ReactNode;
  /** Whether the section is open on first render. Defaults to false. */
  defaultOpen?: boolean;
  /** Visual variant. `default` for top-level sections; `inline` for nested rows. */
  variant?: "default" | "inline";
  /** Custom class for the wrapper. */
  className?: string;
  /** Content rendered when expanded. */
  children: ReactNode;
}

const ITEM = "item";

/**
 * Click-to-expand section over the kit `Accordion` (KEA-7886). Open/closed lives in local
 * state (does NOT survive a refresh). The trigger is the kit's single native button with
 * `aria-expanded`; trailing interactive controls (Toggle, Button) live OUTSIDE it so we never
 * nest <button> inside <button>. Children mount only while open, as before.
 */
export default function Collapsible({
  title,
  subtitle,
  icon,
  trailing,
  defaultOpen = false,
  variant = "default",
  className,
  children,
}: CollapsibleProps) {
  const [value, setValue] = useState(defaultOpen ? ITEM : "");
  const open = value === ITEM;
  return (
    <Accordion
      type="single"
      collapsible
      value={value}
      onValueChange={(next) => setValue(typeof next === "string" ? next : (next[0] ?? ""))}
      variant={variant === "inline" ? "plain" : "bordered"}
      className={className}
    >
      <AccordionItem value={ITEM}>
        {/* The kit renders the trigger inside an <h3> (accordion.tsx), so that is the flex item
            that must grow; its children wrapper span must shrink for the title to truncate. */}
        <div className="flex items-center gap-2 [&>h3]:min-w-0 [&>h3]:flex-1">
          <AccordionTrigger className="w-full min-w-0 [&>span:first-child]:min-w-0">
            <span className="flex min-w-0 items-center gap-2 text-start">
              {icon && <Icon name={icon} size={18} className="text-text-muted" />}
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-medium text-text-main">{title}</span>
                {subtitle && <span className="truncate text-xs text-text-muted">{subtitle}</span>}
              </span>
            </span>
          </AccordionTrigger>
          {trailing && (
            <div
              className={cn("flex shrink-0 items-center gap-2", variant === "default" && "pe-4")}
            >
              {trailing}
            </div>
          )}
        </div>
        <AccordionContent>{open ? children : null}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
