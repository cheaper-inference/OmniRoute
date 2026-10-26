"use client";

import { cloneElement, useId } from "react";
import type { ReactElement, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem, useSidebar } from "./sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { cn } from "./lib/utils";

export interface SidebarBranchItem {
  id: string;
  label: string;
  icon?: ReactNode;
  link: ReactElement<{ children?: ReactNode }>;
  active?: boolean;
}

export interface SidebarBranchProps {
  label: string;
  /** Optional status badge, also shown in the collapsed menu heading. */
  badge?: ReactNode;
  icon: ReactNode;
  /** Navigation element for the parent's landing page, e.g. a router Link. */
  link: ReactElement<{ children?: ReactNode }>;
  items: readonly SidebarBranchItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Includes a selected descendant, even when filtering hides that child. */
  active?: boolean;
  className?: string;
}

/** A navigable parent with a separate disclosure; icon rails expose a menu. */
export function SidebarBranch({ label, badge, icon, link, items, open, onOpenChange, active = false, className }: SidebarBranchProps) {
  const { state, isMobile } = useSidebar();
  const submenuId = useId();
  if (state === "collapsed" && !isMobile) {
    return (
      <SidebarMenuItem className={cn("ci-sidebar__branch", className)} data-active={active || undefined}>
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <button type="button" className="ci-sidebar__menu-button" data-active={active || undefined} aria-label={label}>
                  {icon}<span>{label}</span>
                </button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="right">{label}</TooltipContent>
          </Tooltip>
          <DropdownMenuContent side="right" align="start" aria-label={label}>
            <DropdownMenuLabel className="flex items-center gap-2">{label}{badge}</DropdownMenuLabel>
            {items.map((item) => (
              <DropdownMenuItem key={item.id} asChild aria-current={item.active ? "page" : undefined}>
                {cloneElement(item.link, {}, item.icon != null ? <span className="ci-menu__icon">{item.icon}</span> : null, <span className="ci-menu__label">{item.label}</span>)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    );
  }
  return (
    <SidebarMenuItem className={cn("ci-sidebar__branch", className)} data-active={active || undefined}>
      <div className="ci-sidebar__branch-heading" data-badged={Boolean(badge) || undefined}>
        <SidebarMenuButton asChild>{cloneElement(link, {}, icon, <span>{label}</span>)}</SidebarMenuButton>
        {badge ? <span className="ci-sidebar__branch-badge">{badge}</span> : null}
        <button type="button" className="ci-sidebar__branch-toggle"
          aria-label={`${open ? "Collapse" : "Expand"} ${label}`} aria-expanded={open} aria-controls={submenuId}
          onClick={() => onOpenChange(!open)}><ChevronDown aria-hidden="true" /></button>
      </div>
      <ul id={submenuId} className="ci-sidebar__submenu" hidden={!open} aria-label={label}>
        {items.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild isActive={item.active}>
              {cloneElement(item.link, {}, item.icon, <span>{item.label}</span>)}
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </ul>
    </SidebarMenuItem>
  );
}
