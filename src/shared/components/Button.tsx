"use client";

import { forwardRef, useState } from "react";
import {
  Button as KitButton,
  type ButtonSize as KitSize,
  type ButtonVariant as KitVariant,
} from "@omniroute/ui-kit/button";
import { cn } from "@/shared/utils/cn";
import Icon from "./Icon";
import Tooltip from "./Tooltip";

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
export type ButtonSize = "sm" | "md" | "lg" | "icon" | "icon-sm";

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
  sm: "sm",
  md: "default",
  lg: "lg",
  icon: "icon",
  "icon-sm": "icon-sm",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** ICON_MAP name (resolved through <Icon>). */
  icon?: string;
  iconRight?: string;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const ICON_SIZE: Record<ButtonSize, number> = { sm: 14, md: 16, lg: 18, icon: 20, "icon-sm": 16 };

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
 * A titled Button whose call site passes `disabled` or `loading` can go inactive, and the kit
 * gives an inactive button `pointer-events: none`: its native `title` (often the only visible
 * name of an icon button) would never show then. Such a button is wrapped once in the Tooltip
 * adapter — always, so toggling `disabled` never remounts the button or drops its focus — and
 * the tooltip opens only while the button is inactive. While enabled, the native title keeps
 * working as before (one tooltip at a time, same accessible name/description). A reason for
 * being disabled is not a title: use GuardedAction `reason` for that.
 */
function InactiveTitleTooltip({
  title,
  inactive,
  fullWidth,
  children,
}: {
  title: string;
  inactive: boolean;
  fullWidth: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  // Both wrappers are boxes that hand a parent's stretch down to the button: the outer
  // `.ci-tooltip` span is the parent's flex item (it takes ActionBar's `[&>*]:grow` on phones)
  // and `[&>*]:grow` passes that growth to the trigger, then to the button. `fullWidth` keeps
  // the whole chain full width.
  const chain = cn("max-w-full [&>*]:grow", fullWidth && "flex w-full");
  return (
    <Tooltip
      content={title}
      multiline
      className={chain}
      open={inactive && open}
      onOpenChange={setOpen}
    >
      {/* The trigger: it takes the hover while the button ignores pointer events and is the
          keyboard stop while the button cannot be focused. `multiline`: a long title (a hint
          rather than a short name) wraps instead of running off the viewport. */}
      <span tabIndex={inactive ? 0 : undefined} className={cn("inline-flex", chain)}>
        {children}
      </span>
    </Tooltip>
  );
}

/** The legacy props → kit Button mapping (unchanged); Button below only decides the wrapper. */
const LegacyKitButton = forwardRef<HTMLButtonElement, ButtonProps>(function LegacyKitButton(
  {
    children,
    variant = "primary",
    size = "md",
    icon,
    iconRight,
    disabled = false,
    loading = false,
    fullWidth = false,
    className,
    type = "button",
    ...props
  },
  ref
) {
  const kit = resolveKitButton(variant, size);
  const iconSize = kit.iconSize;
  return (
    <KitButton
      ref={ref}
      type={type}
      variant={kit.variant}
      size={kit.size}
      loading={loading}
      disabled={disabled || loading}
      className={cn(kit.className, fullWidth && "w-full", className)}
      {...props}
    >
      {!loading && icon ? <Icon name={icon} size={iconSize} /> : null}
      {children}
      {!loading && iconRight ? <Icon name={iconRight} size={iconSize} /> : null}
    </KitButton>
  );
});

/**
 * The title to keep visible while the button is inactive, or null when there is none or the
 * button can never go inactive. Checked on the raw props: a call site that writes `disabled`
 * or `loading` (even `disabled={false}`) has a button that can be disabled.
 */
function inactiveTitleOf(props: ButtonProps): string | null {
  const canGoInactive = "disabled" in props || "loading" in props;
  const { title } = props;
  return canGoInactive && typeof title === "string" && title.trim() !== "" ? title : null;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  const button = <LegacyKitButton ref={ref} {...props} />;
  const title = inactiveTitleOf(props);
  if (title === null) return button;
  return (
    <InactiveTitleTooltip
      title={title}
      inactive={Boolean(props.disabled || props.loading)}
      fullWidth={Boolean(props.fullWidth)}
    >
      {button}
    </InactiveTitleTooltip>
  );
});

export default Button;
