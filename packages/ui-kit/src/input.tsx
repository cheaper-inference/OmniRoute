import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "./lib/utils";

export type InputSize = "default" | "sm";
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  error?: boolean;
  size?: InputSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className, error, size = "default", leadingIcon, trailingIcon, ...props }, ref) {
  const invalid = Boolean(error || props["aria-invalid"] === true || props["aria-invalid"] === "true");
  const input = <input ref={ref} data-slot="input" data-size={size} className={cn("ci-input", size === "sm" && "ci-input--sm", invalid && !leadingIcon && !trailingIcon && "ci-input--error", className)} {...props} aria-invalid={invalid || undefined} />;
  if (leadingIcon == null && trailingIcon == null) return input;
  return <span className={cn("ci-input-shell", invalid && "ci-input-shell--error", size === "sm" && "ci-input-shell--sm")}>
    {leadingIcon != null && <span className="ci-input-shell__icon" aria-hidden="true">{leadingIcon}</span>}
    {input}
    {trailingIcon != null && <span className="ci-input-shell__icon" aria-hidden="true">{trailingIcon}</span>}
  </span>;
});
