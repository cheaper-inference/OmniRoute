"use client";

import { forwardRef, useId, useState } from "react";
import type { MouseEventHandler } from "react";
import { Button, type ButtonProps } from "./button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

export interface GuardedActionProps extends Omit<ButtonProps, "asChild" | "aria-disabled"> {
  /** An unmet requirement. The action stays focusable and explains this reason. */
  reason?: string;
  /** Reveal inline errors and focus the relevant field here. Never submits. */
  onBlocked?: MouseEventHandler<HTMLButtonElement>;
}

/** Use reason for unmet requirements; disabled/loading for an unavailable busy action. */
export const GuardedAction = forwardRef<HTMLButtonElement, GuardedActionProps>(function GuardedAction({
  reason = "", onBlocked, onClick, disabled, loading, type = "button", children,
  "aria-describedby": describedBy, ...props
}, ref) {
  const descriptionId = useId();
  const [open, setOpen] = useState(false);
  const blocked = reason.trim().length > 0;
  const inactive = disabled || loading;
  return (
    <Tooltip open={blocked && !inactive && open} onOpenChange={setOpen} delayDuration={150}>
      <TooltipTrigger asChild>
        <Button {...props} ref={ref} type={type} disabled={disabled} loading={loading}
          data-blocked={blocked || undefined} aria-disabled={blocked || inactive || undefined}
          aria-describedby={[describedBy, blocked ? descriptionId : undefined].filter(Boolean).join(" ") || undefined}
          onClick={event => {
            if (blocked) {
              event.preventDefault();
              event.stopPropagation();
              const previousFocus = event.currentTarget.ownerDocument.activeElement;
              onBlocked?.(event);
              // When the host moves focus to an inline error, leave that guidance
              // unobscured. Otherwise show the explanation beside the action.
              setOpen(event.currentTarget.ownerDocument.activeElement === previousFocus);
              return;
            }
            setOpen(false);
            onClick?.(event);
          }}>
          {children}
        </Button>
      </TooltipTrigger>
      {blocked && <>
        <span id={descriptionId} className="ci-sr-only">{reason}</span>
        <TooltipContent>{reason}</TooltipContent>
      </>}
    </Tooltip>
  );
});
