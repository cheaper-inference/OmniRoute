import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "./lib/utils";

/** `default` is 40px tall and `sm` 36px, both with 14px text; `xs` is 32px with 12px text, like `Select` and `NativeSelect` `xs`. */
export type InputSize = "default" | "sm" | "xs";
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  error?: boolean;
  size?: InputSize;
  /**
   * Sets the value in the kit code font (`--ci-font-code`), for keys, JSON, code and URLs. Also turns
   * `spellCheck`, `autoCapitalize` and `autoCorrect` off; pass any of them to turn it back on.
   */
  mono?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

// Text assistance meant for prose, which only gets in the way of a key or a snippet.
const monoDefaults = { spellCheck: false, autoCapitalize: "none", autoCorrect: "off" } as const;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className, error, size = "default", mono, leadingIcon, trailingIcon, ...props }, ref) {
  const invalid = Boolean(error || props["aria-invalid"] === true || props["aria-invalid"] === "true");
  const input = <input ref={ref} data-slot="input" data-size={size} className={cn("ci-input", size !== "default" && `ci-input--${size}`, mono && "ci-input--mono", invalid && !leadingIcon && !trailingIcon && "ci-input--error", className)} {...(mono ? monoDefaults : undefined)} {...props} aria-invalid={invalid || undefined} />;
  if (leadingIcon == null && trailingIcon == null) return input;
  return <span className={cn("ci-input-shell", invalid && "ci-input-shell--error", size !== "default" && `ci-input-shell--${size}`)}>
    {leadingIcon != null && <span className="ci-input-shell__icon" aria-hidden="true">{leadingIcon}</span>}
    {input}
    {trailingIcon != null && <span className="ci-input-shell__icon" aria-hidden="true">{trailingIcon}</span>}
  </span>;
});
