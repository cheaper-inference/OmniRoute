"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@omniroute/ui-kit/accordion";
// F1: swap for the Badge adapter once track C merges
import { Badge as KitBadge } from "@omniroute/ui-kit/badge";

interface CollapsibleSectionProps {
  title: string;
  description?: string;
  count?: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
}

const ITEM = "section";

/** Titled, collapsible section over the kit `Accordion` (KEA-7886); open by default. */
export default function CollapsibleSection({
  title,
  description,
  count,
  defaultOpen = true,
  children,
  className,
}: CollapsibleSectionProps) {
  const [value, setValue] = useState(defaultOpen ? ITEM : "");
  const open = value === ITEM;
  return (
    <Accordion
      type="single"
      collapsible
      value={value}
      onValueChange={(next) => setValue(typeof next === "string" ? next : (next[0] ?? ""))}
      variant="bordered"
      className={className}
    >
      <AccordionItem value={ITEM}>
        <AccordionTrigger className="[&>span:first-child]:min-w-0">
          <span className="flex min-w-0 items-center gap-3 text-start">
            <span className="truncate text-sm font-semibold text-text-main">{title}</span>
            {count != null && <KitBadge variant="secondary">{count}</KitBadge>}
            {description && (
              <span className="hidden truncate text-xs text-text-muted sm:inline">
                {description}
              </span>
            )}
          </span>
        </AccordionTrigger>
        {/* Closed content stays mounted (legacy) but is aria-hidden by the kit: keep it out of
            the tab order too. */}
        <AccordionContent inert={!open || undefined}>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
