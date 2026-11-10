import type { ComponentPropsWithoutRef } from "react";
import { cn } from "./lib/utils";

export interface ControlHighlightProps extends ComponentPropsWithoutRef<"span"> {
  active?: boolean;
}

/** A visual cue around an existing control or icon; adds no focus stop or interaction. */
export function ControlHighlight({ active = true, className, ...props }: ControlHighlightProps) {
  return (
    <span
      {...props}
      data-slot="control-highlight"
      data-active={active || undefined}
      className={cn("ci-control-highlight", className)}
    />
  );
}
