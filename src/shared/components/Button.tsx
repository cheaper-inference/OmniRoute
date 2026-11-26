"use client";

import { forwardRef } from "react";
import {
  Button as KitButton,
  type ButtonSize as KitSize,
  type ButtonTone as KitTone,
  type ButtonVariant as KitVariant,
} from "@omniroute/ui-kit/button";
import { cn } from "@/shared/utils/cn";
import Icon from "./Icon";

/** Legacy variant vocabulary — kept because 150+ call sites and Modal.tsx type against it. */
export type ButtonVariant =
  | "primary"
  | "accent"
  | "secondary"
  | "outline"
  | "ghost"
  | "warning"
  | "danger"
  /** Quiet delete/revoke inside table rows and lists (kit #191). Confirmations stay `danger`. */
  | "destructive-ghost";
/** `2xs` and `icon-2xs` are the kit's 24px dense sizes, for row and inline actions. */
export type ButtonSize = "2xs" | "sm" | "md" | "lg" | "icon" | "icon-2xs" | "icon-sm";
/** `muted`: muted resting ink that keeps the variant's hover (`ghost`, `outline`, `secondary`). */
export type ButtonTone = KitTone;

const VARIANT_TO_KIT: Record<ButtonVariant, { variant: KitVariant; className?: string }> = {
  primary: { variant: "default" },
  accent: { variant: "default" },
  secondary: { variant: "secondary" },
  outline: { variant: "outline" },
  ghost: { variant: "ghost" },
  danger: { variant: "destructive" },
  warning: { variant: "warning" },
  "destructive-ghost": { variant: "destructive-ghost" },
};

const SIZE_TO_KIT: Record<ButtonSize, KitSize> = {
  "2xs": "2xs",
  sm: "sm",
  md: "default",
  lg: "lg",
  icon: "icon",
  "icon-2xs": "icon-2xs",
  "icon-sm": "icon-sm",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  tone?: ButtonTone;
  /** ICON_MAP name (resolved through <Icon>). */
  icon?: string;
  iconRight?: string;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const ICON_SIZE: Record<ButtonSize, number> = {
  "2xs": 14,
  sm: 14,
  md: 16,
  lg: 18,
  icon: 20,
  "icon-2xs": 14,
  "icon-sm": 16,
};

/**
 * Legacy variant/size → kit props. Unknown strings (untyped JS callers, stale data) fall back
 * to the defaults instead of throwing on `undefined.variant`. Shared with GuardedAction.
 */
export function resolveKitButton(variant: ButtonVariant, size: ButtonSize) {
  const kit = VARIANT_TO_KIT[variant] ?? VARIANT_TO_KIT.primary;
  return {
    variant: kit.variant,
    className: kit.className,
    size: SIZE_TO_KIT[size] ?? SIZE_TO_KIT.md,
    iconSize: ICON_SIZE[size] ?? ICON_SIZE.md,
  };
}

/**
 * The `title` as the kit tooltip, or undefined when there is nothing to show. The kit Button
 * draws it on hover and on keyboard focus with no element around the button, also while the
 * button is inactive: a titled button that is `disabled` or `loading` renders
 * `aria-disabled="true"` instead of `disabled` (select it with `[aria-disabled="true"]`, not
 * `:disabled`), stays a tab stop and runs no click. The native `title` is not rendered, so
 * there is one tooltip. A reason for being disabled is not a title: use GuardedAction `reason`.
 *
 * The kit opens it on focus only when the user moved there with the keyboard (kit #317), so a
 * dialog that focuses a titled button when it opens shows no tooltip and keeps its Escape.
 */
function tooltipOf(title: unknown): string | undefined {
  return typeof title === "string" && title.trim() !== "" ? title.trim() : undefined;
}

type NameProps = Pick<ButtonProps, "children" | "aria-label" | "aria-labelledby">;

/**
 * The `aria-label` of a titled button. The native title also named a button that has neither
 * text nor a name of its own; the kit takes the tooltip as the name only on its icon sizes, so
 * the adapter names the other ones. Any other button keeps the `aria-label` it was given.
 */
function nameWithTitle(tooltip: string | undefined, props: NameProps): string | undefined {
  const { children } = props;
  const named = props["aria-label"] != null || props["aria-labelledby"] != null;
  const textless = children == null || typeof children === "boolean" || children === "";
  return tooltip && !named && textless ? tooltip : props["aria-label"];
}

/** An `icon` / `iconRight` slot: hidden while the spinner shows. */
function slotIcon(name: string | undefined, size: number, loading: boolean) {
  return !loading && name ? <Icon name={name} size={size} /> : null;
}

/**
 * Button — adapter over the kit Button, with the legacy variant/size vocabulary and the
 * ICON_MAP `icon` slots. `title` is shown through the kit tooltip (see `tooltipOf`).
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    variant = "primary",
    size = "md",
    tone,
    icon,
    iconRight,
    disabled = false,
    loading = false,
    fullWidth = false,
    className,
    type = "button",
    title,
    ...props
  },
  ref
) {
  const kit = resolveKitButton(variant, size);
  const tooltip = tooltipOf(title);
  return (
    <KitButton
      ref={ref}
      type={type}
      variant={kit.variant}
      size={kit.size}
      tone={tone}
      loading={loading}
      disabled={disabled || loading}
      tooltip={tooltip}
      className={cn(kit.className, fullWidth && "w-full", className)}
      {...props}
      aria-label={nameWithTitle(tooltip, { children, ...props })}
    >
      {slotIcon(icon, kit.iconSize, loading)}
      {children}
      {slotIcon(iconRight, kit.iconSize, loading)}
    </KitButton>
  );
});

export default Button;
