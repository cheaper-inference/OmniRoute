"use client";

import { cloneElement, forwardRef, isValidElement } from "react";
import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
import { cn } from "./lib/utils";

export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

export type ButtonSize =
  | "default"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "icon"
  | "icon-xs"
  | "icon-sm"
  | "icon-lg";

export function buttonVariants(
  options: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {},
): string {
  const { variant = "default", size = "default", className } = options;
  return cn(
    "ci-button",
    `ci-button--${variant}`,
    `ci-button--size-${size}`,
    className,
  );
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  /** Native form navigation must retain an enabled submitter until the browser serializes it. */
  disableWhileLoading?: boolean;
  asChild?: boolean;
}

function ButtonSpinner() {
  return (
    <svg className="ci-button__spinner" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant = "default",
    size = "default",
    loading = false,
    disableWhileLoading = true,
    disabled,
    asChild = false,
    children,
    ...props
  },
  ref,
) {
  const classes = buttonVariants({ variant, size, className });
  const inactive = disabled || (loading && disableWhileLoading);
  const iconOnly = size.startsWith("icon");
  const content = (
    <>
      {loading && <ButtonSpinner />}
      {loading && iconOnly ? null : children}
    </>
  );

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<Record<string, unknown>>;
    return cloneElement(child, {
      ...props,
      "aria-busy": loading || undefined,
      "aria-disabled": inactive || undefined,
      className: cn(classes, child.props.className as string | undefined),
      children: loading ? (
        <>
          <ButtonSpinner />
          {iconOnly ? null : child.props.children as ReactNode}
        </>
      ) : (
        (child.props.children as ReactNode)
      ),
    });
  }

  return (
    <button
      ref={ref}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      className={classes}
      disabled={inactive}
      {...props}
    >
      {content}
    </button>
  );
});
