"use client";

import { Switch } from "@omniroute/ui-kit/switch";
import { cn } from "@/shared/utils/cn";

interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  /** `xs`/`sm` use the compact switch (`.ci-switch--compact`); `md`/`lg` the kit default. */
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  title?: string;
  ariaLabel?: string;
}

/**
 * Toggle — adapter over the kit Switch (`input[type=checkbox][role=switch]`).
 *
 * The accessible name is the visible `label` when there is one (set as aria-label because the
 * kit's <label> wraps label + description, which would fold the description into the name; the
 * description stays an aria-describedby). Unlabelled switches keep the legacy fallback chain
 * `ariaLabel → description → title → "Toggle"`. `aria-checked` mirrors `checked` like the
 * legacy button did, so `[aria-checked]` selectors keep working.
 */
export default function Toggle({
  checked = false,
  onChange,
  label,
  description,
  disabled = false,
  size = "md",
  className,
  title,
  ariaLabel,
}: ToggleProps) {
  return (
    <Switch
      checked={checked}
      onCheckedChange={(next) => {
        if (!disabled) onChange?.(next);
      }}
      disabled={disabled}
      label={label || undefined}
      description={description || undefined}
      aria-label={label || ariaLabel || description || title || "Toggle"}
      aria-checked={checked}
      title={title}
      className={cn(
        (size === "xs" || size === "sm") && "ci-switch--compact",
        // The kit dims only the label row (`.ci-switch[data-disabled]`); the bare control a
        // label-less switch renders has no disabled look, so keep the legacy `opacity-50`.
        disabled && !label && !description && "opacity-50",
        className
      )}
    />
  );
}
