"use client";

import { useId, useState } from "react";
import type { ComponentProps, ReactNode } from "react";
import { ChevronDown, X } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import { cn } from "./lib/utils";

export interface ScopeChipProps extends Omit<ComponentProps<"div">, "onChange"> {
  /** Filled carried filters remain the default; outline matches attachment chips for captured context. */
  variant?: "secondary" | "outline";
  icon?: ReactNode;
  /** Full inline scope replaces the truncated summary while expanded. */
  details?: ReactNode;
  /** Additional entries hidden from the collapsed summary. */
  count?: number;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  onRemove?: () => void;
  expandLabel?: string;
  removeLabel?: string;
}

/** Common presentation for carried filters and one captured chat context. */
export function ScopeChip({
  variant = "secondary", icon, details, count, expanded: controlledExpanded, defaultExpanded = false,
  onExpandedChange, onRemove, expandLabel = "Context details", removeLabel = "Remove context",
  children, className, ...props
}: ScopeChipProps) {
  const id = useId();
  const [localExpanded, setLocalExpanded] = useState(defaultExpanded);
  const expandable = details != null;
  const expanded = expandable && (controlledExpanded ?? localExpanded);
  const content = <>
    {icon != null && <span className="ci-scope-chip__icon" aria-hidden="true">{icon}</span>}
    <span id={id} className="ci-scope-chip__text">{expanded ? details : children}</span>
    {!expanded && count != null && count > 0 && <span className="ci-scope-chip__count">+{count}</span>}
    {expandable && <ChevronDown className="ci-scope-chip__chevron" aria-hidden="true" />}
  </>;
  return <Badge asChild variant={variant}><div {...props} data-slot="scope-chip" data-variant={variant} data-expanded={expanded || undefined} className={cn("ci-scope-chip", className)}>
    {expandable ? <Button type="button" variant="ghost" size="sm" className="ci-scope-chip__summary" aria-label={expandLabel} aria-expanded={expanded} aria-controls={id} onClick={() => {
      if (controlledExpanded === undefined) setLocalExpanded(!expanded);
      onExpandedChange?.(!expanded);
    }}>{content}</Button> : <span className="ci-scope-chip__summary">{content}</span>}
    {onRemove && <Button type="button" variant="ghost" size="icon-xs" className="ci-scope-chip__remove" aria-label={removeLabel} onClick={onRemove}><X aria-hidden="true" /></Button>}
  </div></Badge>;
}
