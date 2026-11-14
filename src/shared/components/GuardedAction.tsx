"use client";

/**
 * GuardedAction — adapter over the kit GuardedAction, with the legacy Button vocabulary
 * (`variant="primary"`, `size="icon-sm"`, `icon`, `iconRight`, `fullWidth`).
 *
 * Why: the kit gives disabled buttons `pointer-events: none`, so a native `title` that
 * explains WHY a button is disabled never shows. Pass that explanation as `reason` instead:
 * the button stays focusable, looks inactive, swallows the click (calling `onBlocked`) and
 * shows the reason in a tooltip on hover, focus and click; screen readers get it through
 * `aria-describedby`.
 *
 * - `reason` is for an unmet requirement ("enter a judge model first"). A busy action keeps
 *   `disabled` / `loading`, exactly like Button.
 * - `title` still works as the general hint while the action is available; drop it while a
 *   `reason` is set so the browser tooltip does not stack on top of the kit tooltip.
 *
 * @module shared/components/GuardedAction
 */

import { forwardRef } from "react";
import {
  GuardedAction as KitGuardedAction,
  type GuardedActionProps as KitGuardedActionProps,
} from "@omniroute/ui-kit/guarded-action";
import { cn } from "@/shared/utils/cn";
import { resolveKitButton, type ButtonProps, type ButtonSize, type ButtonVariant } from "./Button";
import Icon from "./Icon";

export interface GuardedActionProps extends ButtonProps {
  /** Why the action is unavailable. Empty/undefined = available. */
  reason?: string | null;
  /** Called instead of `onClick` while blocked (e.g. focus the missing field). */
  onBlocked?: KitGuardedActionProps["onBlocked"];
}

/** A reason counts only when it has visible text; anything else means "available". */
function activeReason(reason: GuardedActionProps["reason"]): string | undefined {
  return typeof reason === "string" && reason.trim().length > 0 ? reason : undefined;
}

/** Same icon slots as Button: hidden while the spinner shows. */
function ButtonContent({
  icon,
  iconRight,
  iconSize,
  loading,
  children,
}: Pick<ButtonProps, "icon" | "iconRight" | "loading" | "children"> & { iconSize: number }) {
  return (
    <>
      {!loading && icon ? <Icon name={icon} size={iconSize} /> : null}
      {children}
      {!loading && iconRight ? <Icon name={iconRight} size={iconSize} /> : null}
    </>
  );
}

const GuardedAction = forwardRef<HTMLButtonElement, GuardedActionProps>(function GuardedAction(
  {
    children,
    variant,
    size,
    icon,
    iconRight,
    disabled,
    loading,
    fullWidth,
    className,
    type,
    reason,
    title,
    ...props
  },
  ref
) {
  // Unknown/undefined variant and size fall back to primary/md inside resolveKitButton.
  const kit = resolveKitButton(variant as ButtonVariant, size as ButtonSize);
  const blockedReason = activeReason(reason);
  return (
    <KitGuardedAction
      ref={ref}
      type={type ?? "button"}
      variant={kit.variant}
      size={kit.size}
      loading={loading}
      disabled={Boolean(disabled || loading)}
      reason={blockedReason}
      title={blockedReason ? undefined : title}
      className={cn(kit.className, fullWidth && "w-full", className)}
      {...props}
    >
      <ButtonContent icon={icon} iconRight={iconRight} iconSize={kit.iconSize} loading={loading}>
        {children}
      </ButtonContent>
    </KitGuardedAction>
  );
});

export default GuardedAction;
