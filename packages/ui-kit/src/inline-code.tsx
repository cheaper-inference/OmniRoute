import { forwardRef } from "react";
import type { ComponentProps } from "react";
import { cn } from "./lib/utils";

export type InlineCodeProps = ComponentProps<"code">;

/**
 * A short piece of code inside running text, a table cell or a label: a model id, an environment
 * variable, a flag, a path. It is the `.ci-prose code` chip for use outside prose. The size follows
 * the surrounding text and never drops under 12px, and a long identifier wraps instead of
 * overflowing. For a command or URL the reader copies, use `CodePreview showHeader={false}`.
 */
export const InlineCode = forwardRef<HTMLElement, InlineCodeProps>(function InlineCode({ className, ...props }, ref) {
  return <code {...props} ref={ref} data-slot="inline-code" className={cn("ci-inline-code", className)} />;
});
