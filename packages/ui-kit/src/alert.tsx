"use client";

import { useEffect, useState } from "react";
import type { ComponentProps, ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "./lib/utils";

export type AlertVariant = "default" | "info" | "success" | "warning" | "critical";
export type AlertPersistence = "temporary" | "persistent";

export interface AlertProps extends Omit<ComponentProps<"div">, "title"> {
  variant?: AlertVariant;
  /** Compact banner with inline messages and actions that wrap on small screens. */
  layout?: "stacked" | "inline";
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  persistence?: AlertPersistence;
  duration?: number;
  dismissLabel?: string;
  onDismiss?: () => void;
  /** Keep actionable form errors visible until the caller clears them. */
  dismissible?: boolean;
}

export function Alert({
  className,
  variant = "default",
  layout = "stacked",
  icon,
  title,
  description,
  actions,
  persistence = "persistent",
  duration = 8000,
  dismissLabel = "Dismiss alert",
  onDismiss,
  dismissible = true,
  children,
  ...props
}: AlertProps) {
  const [visible, setVisible] = useState(true);
  const structured = icon != null || title != null || description != null;

  useEffect(() => {
    setVisible(true);
    if (persistence !== "temporary") return;

    const timeout = window.setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, duration);

    return () => window.clearTimeout(timeout);
  }, [duration, onDismiss, persistence]);

  function dismiss() {
    setVisible(false);
    onDismiss?.();
  }

  if (!visible) return null;

  return (
    <div
      role={variant === "critical" ? "alert" : "status"}
      data-slot="alert"
      data-variant={variant}
      data-layout={layout}
      data-persistence={persistence}
      className={cn("ci-alert", `ci-alert--${variant}`, className)}
      {...props}
    >
      {structured ? (
        <>
          {icon != null && <span className="ci-alert__icon">{icon}</span>}
          <div className="ci-alert__body">
            {layout === "inline" ? <div className="ci-alert__message">
              {title != null && <AlertTitle>{title}</AlertTitle>}
              {description != null && <AlertDescription>{description}</AlertDescription>}
            </div> : <>
              {title != null && <AlertTitle>{title}</AlertTitle>}
              {description != null && <AlertDescription>{description}</AlertDescription>}
            </>}
            {actions != null && <AlertActions>{actions}</AlertActions>}
          </div>
        </>
      ) : (
        <div className="ci-alert__body">
          {children}
          {actions != null && <AlertActions>{actions}</AlertActions>}
        </div>
      )}
      {persistence === "persistent" && dismissible && (
        <button
          type="button"
          className="ci-alert__dismiss"
          aria-label={dismissLabel}
          onClick={dismiss}
        >
          <X aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

export function AlertTitle({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="alert-title" className={cn("ci-alert__title", className)} {...props} />;
}

export function AlertDescription({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="alert-description" className={cn("ci-alert__description", className)} {...props} />;
}

export function AlertActions({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="alert-actions" className={cn("ci-alert__actions", className)} {...props} />;
}
