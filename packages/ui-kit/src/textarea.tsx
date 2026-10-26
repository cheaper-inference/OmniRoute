import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";
import { cn } from "./lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Shows the error border (also triggered by aria-invalid). */
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, error, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        data-slot="textarea"
        className={cn(
          "ci-textarea",
          error && "ci-textarea--error",
          className,
        )}
        {...props}
      />
    );
  },
);
