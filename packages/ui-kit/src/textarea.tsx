import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";
import { cn } from "./lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Shows the error border (also triggered by aria-invalid). */
  error?: boolean;
  /**
   * Sets the value in the kit code font (`--ci-font-code`) at the size, leading and tab width of
   * `CodePreview`, for JSON, code and lists of keys. Also turns `spellCheck`, `autoCapitalize` and
   * `autoCorrect` off; pass any of them to turn it back on.
   */
  mono?: boolean;
}

// Text assistance meant for prose, which only gets in the way of a key or a snippet.
const monoDefaults = { spellCheck: false, autoCapitalize: "none", autoCorrect: "off" } as const;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, error, mono, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        data-slot="textarea"
        className={cn(
          "ci-textarea",
          error && "ci-textarea--error",
          mono && "ci-textarea--mono",
          className,
        )}
        {...(mono ? monoDefaults : undefined)}
        {...props}
      />
    );
  },
);
