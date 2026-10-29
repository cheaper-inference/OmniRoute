"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { forwardRef, useId } from "react";
import type { ComponentProps, ReactNode } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "./lib/utils";

export type SelectSize = "xs" | "sm" | "md";
export type SelectVariant = "default" | "capsule";
export type SelectMenuDensity = "default" | "compact";
export type SelectSide = NonNullable<
  ComponentProps<typeof SelectPrimitive.Content>["side"]
>;
export type SelectAlign = NonNullable<
  ComponentProps<typeof SelectPrimitive.Content>["align"]
>;
type SelectContentProps = ComponentProps<typeof SelectPrimitive.Content>;
export type SelectOption =
  | string
  | {
      label: ReactNode;
      value: string;
      disabled?: boolean;
      description?: ReactNode;
    };
export interface SelectOptionGroup {
  label: ReactNode;
  options: SelectOption[];
}
export type SelectOptions = Array<SelectOption | SelectOptionGroup>;

function isGroup(
  entry: SelectOption | SelectOptionGroup,
): entry is SelectOptionGroup {
  return typeof entry === "object" && entry !== null && "options" in entry;
}

export interface SelectProps extends Omit<
  ComponentProps<"div">,
  "onChange" | "defaultValue" | "placeholder"
> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  name?: string;
  placeholder?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  options?: SelectOptions;
  size?: SelectSize;
  variant?: SelectVariant;
  /** Controls portaled menu typography independently from trigger height. */
  menuDensity?: SelectMenuDensity;
  /** Decorative icon rendered before the selected value or placeholder. */
  leadingIcon?: ReactNode;
  side?: SelectSide;
  align?: SelectAlign;
  sideOffset?: SelectContentProps["sideOffset"];
  alignOffset?: SelectContentProps["alignOffset"];
  avoidCollisions?: SelectContentProps["avoidCollisions"];
  collisionBoundary?: SelectContentProps["collisionBoundary"];
  collisionPadding?: SelectContentProps["collisionPadding"];
  sticky?: SelectContentProps["sticky"];
  hideWhenDetached?: SelectContentProps["hideWhenDetached"];
  portalContainer?: HTMLElement | null;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(function Select(
  {
    className,
    id,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDescribedby,
    value,
    defaultValue,
    onValueChange,
    open,
    defaultOpen,
    onOpenChange,
    name,
    placeholder = "Select…",
    disabled = false,
    required = false,
    error = false,
    options,
    size: sizeProp,
    variant = "default",
    menuDensity = "default",
    leadingIcon,
    side = "bottom",
    align = "start",
    sideOffset = 8,
    alignOffset,
    avoidCollisions,
    collisionBoundary,
    collisionPadding = 8,
    sticky,
    hideWhenDetached,
    portalContainer,
    children,
    ...props
  },
  ref,
) {
  const size = sizeProp ?? (variant === "capsule" ? "sm" : "md");
  const renderOption = (option: SelectOption) => {
    const item =
      typeof option === "string" ? { label: option, value: option } : option;
    return (
      <SelectItem
        key={item.value}
        value={item.value}
        disabled={item.disabled}
        description={item.description}
      >
        {item.label}
      </SelectItem>
    );
  };
  const content = options
    ? options.map((entry, index) =>
        isGroup(entry) ? (
          <SelectGroup key={index} label={entry.label}>
            {entry.options.map(renderOption)}
          </SelectGroup>
        ) : (
          renderOption(entry)
        ),
      )
    : children;

  return (
    <div
      ref={ref}
      data-slot="select"
      data-size={size}
      data-variant={variant}
      className={cn("ci-select", className)}
      {...props}
    >
      <SelectPrimitive.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        name={name}
        disabled={disabled}
        required={required}
      >
        <SelectPrimitive.Trigger
          id={id}
          data-slot="select-trigger"
          className={cn(
            "ci-select__trigger",
            error && "ci-select__trigger--error",
          )}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-describedby={ariaDescribedby}
          aria-invalid={error || undefined}
        >
          <span className="ci-select__value-group">
            {leadingIcon != null ? (
              <span className="ci-select__leading-icon" aria-hidden="true">
                {leadingIcon}
              </span>
            ) : null}
            {/*
              Radix's Select.Value destructures `className` and `style` away and
              never puts them on the span it renders, so `ci-select__value` --
              and with it the trigger's nowrap/ellipsis -- never reached the
              DOM: a value wider than the trigger wrapped onto a second line
              instead of truncating. The wrapper carries the class.
            */}
            <span className="ci-select__value">
              <SelectPrimitive.Value
                placeholder={
                  <span className="ci-select__placeholder">{placeholder}</span>
                }
              />
            </span>
          </span>
          <SelectPrimitive.Icon className="ci-select__icon" asChild>
            <ChevronDown aria-hidden="true" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal container={portalContainer}>
          <SelectPrimitive.Content
            data-slot="select-content"
            data-size={size}
            data-density={menuDensity}
            position="popper"
            side={side}
            align={align}
            sideOffset={sideOffset}
            alignOffset={alignOffset}
            avoidCollisions={avoidCollisions}
            collisionBoundary={collisionBoundary}
            collisionPadding={collisionPadding}
            sticky={sticky}
            hideWhenDetached={hideWhenDetached}
            className="ci-select__content"
          >
            <SelectPrimitive.ScrollUpButton className="ci-select__scroll ci-select__scroll--up">
              <ChevronUp aria-hidden="true" />
            </SelectPrimitive.ScrollUpButton>
            <SelectPrimitive.Viewport
              data-slot="select-viewport"
              className="ci-select__viewport"
            >
              {content}
            </SelectPrimitive.Viewport>
            <SelectPrimitive.ScrollDownButton className="ci-select__scroll ci-select__scroll--down">
              <ChevronDown aria-hidden="true" />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </div>
  );
});

export interface SelectGroupProps extends Omit<
  ComponentProps<typeof SelectPrimitive.Group>,
  "asChild"
> {
  label?: ReactNode;
}

export const SelectGroup = forwardRef<HTMLDivElement, SelectGroupProps>(
  function SelectGroup({ className, label, children, ...props }, ref) {
    return (
      <SelectPrimitive.Group
        ref={ref}
        data-slot="select-group"
        className={cn("ci-select__group", className)}
        {...props}
      >
        {label != null ? (
          <SelectPrimitive.Label
            data-slot="select-label"
            className="ci-select__group-label"
          >
            {label}
          </SelectPrimitive.Label>
        ) : null}
        {children}
      </SelectPrimitive.Group>
    );
  },
);

export const SelectLabel = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof SelectPrimitive.Label>
>(function SelectLabel({ className, ...props }, ref) {
  return (
    <SelectPrimitive.Label
      ref={ref}
      data-slot="select-label"
      className={cn("ci-select__group-label", className)}
      {...props}
    />
  );
});

export interface SelectItemProps extends Omit<
  ComponentProps<typeof SelectPrimitive.Item>,
  "asChild"
> {
  description?: ReactNode;
}

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  function SelectItem({ className, children, description, ...props }, ref) {
    const descriptionId = useId();
    return (
      <SelectPrimitive.Item
        ref={ref}
        data-slot="select-item"
        data-described={description != null || undefined}
        aria-describedby={description != null ? descriptionId : undefined}
        className={cn("ci-select__item", className)}
        {...props}
      >
        <span className="ci-select__item-copy">
          <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
          {description != null ? (
            <span id={descriptionId} className="ci-select__item-description">
              {description}
            </span>
          ) : null}
        </span>
        <SelectPrimitive.ItemIndicator className="ci-select__indicator">
          <Check aria-hidden="true" />
        </SelectPrimitive.ItemIndicator>
      </SelectPrimitive.Item>
    );
  },
);

export const SelectSeparator = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof SelectPrimitive.Separator>
>(function SelectSeparator({ className, ...props }, ref) {
  return (
    <SelectPrimitive.Separator
      ref={ref}
      data-slot="select-separator"
      className={cn("ci-select__separator", className)}
      {...props}
    />
  );
});
