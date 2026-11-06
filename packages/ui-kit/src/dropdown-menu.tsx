"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";
import type { ComponentProps, ReactNode } from "react";
import { Check, Circle } from "lucide-react";
import { cn } from "./lib/utils";

export type DropdownMenuProps = ComponentProps<typeof DropdownMenuPrimitive.Root>;
export type DropdownMenuSide = NonNullable<ComponentProps<typeof DropdownMenuPrimitive.Content>["side"]>;
export type DropdownMenuAlign = NonNullable<ComponentProps<typeof DropdownMenuPrimitive.Content>["align"]>;

export function DropdownMenu(props: DropdownMenuProps) {
  return <DropdownMenuPrimitive.Root {...props} />;
}

export interface DropdownMenuTriggerProps extends ComponentProps<typeof DropdownMenuPrimitive.Trigger> {}

export const DropdownMenuTrigger = forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(function DropdownMenuTrigger(props, ref) {
  return <DropdownMenuPrimitive.Trigger ref={ref} data-slot="dropdown-menu-trigger" {...props} />;
});

export interface DropdownMenuContentProps extends ComponentProps<typeof DropdownMenuPrimitive.Content> {
  portalContainer?: HTMLElement | null;
  /** Bound long menus to the available viewport while retaining keyboard navigation. */
  scrollable?: boolean;
}

export const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(function DropdownMenuContent({
  className,
  align = "start",
  side = "bottom",
  sideOffset = 6,
  collisionPadding = 8,
  portalContainer,
  forceMount,
  scrollable = false,
  ...props
}, ref) {
  return (
    <DropdownMenuPrimitive.Portal container={portalContainer} forceMount={forceMount}>
      <DropdownMenuPrimitive.Content
        ref={ref}
        forceMount={forceMount}
        data-slot="dropdown-menu-content"
        align={align}
        side={side}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={cn("ci-menu", scrollable && "ci-menu--scrollable", className)}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
});

export type DropdownMenuItemVariant = "default" | "destructive";
export interface DropdownMenuItemProps extends ComponentProps<typeof DropdownMenuPrimitive.Item> {
  icon?: ReactNode;
  shortcut?: ReactNode;
  variant?: DropdownMenuItemVariant;
}

export const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownMenuItemProps>(function DropdownMenuItem({
  className,
  icon,
  shortcut,
  variant = "default",
  children,
  asChild,
  ...props
}, ref) {
  if (asChild) {
    return (
      <DropdownMenuPrimitive.Item
        ref={ref}
        asChild
        data-slot="dropdown-menu-item"
        data-variant={variant}
        className={cn("ci-menu__item", className)}
        {...props}
      >
        {children}
      </DropdownMenuPrimitive.Item>
    );
  }
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      data-slot="dropdown-menu-item"
      data-variant={variant}
      className={cn("ci-menu__item", className)}
      {...props}
    >
      {icon != null ? <span className="ci-menu__icon">{icon}</span> : null}
      <span className="ci-menu__label">{children}</span>
      {shortcut != null ? <span className="ci-menu__shortcut">{shortcut}</span> : null}
    </DropdownMenuPrimitive.Item>
  );
});

export const DropdownMenuLabel = forwardRef<HTMLDivElement, ComponentProps<typeof DropdownMenuPrimitive.Label>>(function DropdownMenuLabel({ className, ...props }, ref) {
  return <DropdownMenuPrimitive.Label ref={ref} className={cn("ci-menu__section-label", className)} {...props} />;
});

export const DropdownMenuSeparator = forwardRef<HTMLDivElement, ComponentProps<typeof DropdownMenuPrimitive.Separator>>(function DropdownMenuSeparator({ className, ...props }, ref) {
  return <DropdownMenuPrimitive.Separator ref={ref} className={cn("ci-menu__separator", className)} {...props} />;
});

export const DropdownMenuGroup = forwardRef<HTMLDivElement, ComponentProps<typeof DropdownMenuPrimitive.Group>>(function DropdownMenuGroup(props, ref) {
  return <DropdownMenuPrimitive.Group ref={ref} {...props} />;
});

export interface DropdownMenuCheckboxItemProps extends Omit<ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>, "asChild"> {
  icon?: ReactNode;
  shortcut?: ReactNode;
  variant?: DropdownMenuItemVariant;
}

export const DropdownMenuCheckboxItem = forwardRef<HTMLDivElement, DropdownMenuCheckboxItemProps>(function DropdownMenuCheckboxItem({
  className,
  children,
  icon,
  shortcut,
  variant = "default",
  ...props
}, ref) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      data-slot="dropdown-menu-checkbox-item"
      data-variant={variant}
      className={cn("ci-menu__item", className)}
      {...props}
    >
      <span className="ci-menu__indicator">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check aria-hidden="true" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {icon != null ? <span className="ci-menu__icon">{icon}</span> : null}
      <span className="ci-menu__label">{children}</span>
      {shortcut != null ? <span className="ci-menu__shortcut">{shortcut}</span> : null}
    </DropdownMenuPrimitive.CheckboxItem>
  );
});

export interface DropdownMenuRadioGroupProps extends ComponentProps<typeof DropdownMenuPrimitive.RadioGroup> {}

export const DropdownMenuRadioGroup = forwardRef<HTMLDivElement, DropdownMenuRadioGroupProps>(function DropdownMenuRadioGroup(props, ref) {
  return <DropdownMenuPrimitive.RadioGroup ref={ref} data-slot="dropdown-menu-radio-group" {...props} />;
});

export interface DropdownMenuRadioItemProps extends Omit<ComponentProps<typeof DropdownMenuPrimitive.RadioItem>, "asChild"> {
  icon?: ReactNode;
  shortcut?: ReactNode;
  variant?: DropdownMenuItemVariant;
}

export const DropdownMenuRadioItem = forwardRef<HTMLDivElement, DropdownMenuRadioItemProps>(function DropdownMenuRadioItem({
  className,
  children,
  icon,
  shortcut,
  variant = "default",
  ...props
}, ref) {
  return (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      data-slot="dropdown-menu-radio-item"
      data-variant={variant}
      className={cn("ci-menu__item", className)}
      {...props}
    >
      <span className="ci-menu__indicator">
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle aria-hidden="true" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {icon != null ? <span className="ci-menu__icon">{icon}</span> : null}
      <span className="ci-menu__label">{children}</span>
      {shortcut != null ? <span className="ci-menu__shortcut">{shortcut}</span> : null}
    </DropdownMenuPrimitive.RadioItem>
  );
});
