"use client";

import { cloneElement, forwardRef, isValidElement, useId } from "react";
import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "./lib/utils";

export type TileLayout = "stacked" | "inline";

export interface TileProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "title"> {
  /** Main line; names the control unless `aria-label`/`aria-labelledby` is passed. */
  title: ReactNode;
  /** Secondary copy, linked through `aria-describedby`. */
  description?: ReactNode;
  /** Decorative leading mark. */
  icon?: ReactNode;
  /** Trailing slot on the title row (Badge, count, check mark). */
  meta?: ReactNode;
  /** `inline` (default) puts the icon beside the copy; `stacked` above it. */
  layout?: TileLayout;
  /** Toggle-button semantics (`aria-pressed` and a check indicator) for filter tiles. Omit for plain actions. */
  pressed?: boolean;
  /** Render the single child element (a link or router Link) with the tile treatment. */
  asChild?: boolean;
}

/** A multi-line clickable surface: an action or a toggle, never a radio or a tab. */
export const Tile = forwardRef<HTMLButtonElement, TileProps>(function Tile(
  {
    className,
    title,
    description,
    icon,
    meta,
    layout = "inline",
    pressed,
    asChild = false,
    children,
    type = "button",
    disabled,
    "aria-labelledby": labelledBy,
    "aria-describedby": describedBy,
    ...props
  },
  ref,
) {
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const descriptionId = description != null ? `${baseId}-description` : undefined;
  const linkChild = asChild && isValidElement(children) ? (children as ReactElement<Record<string, unknown>>) : null;
  const bodyId = !linkChild && children != null ? `${baseId}-body` : undefined;
  const childProps = linkChild?.props ?? {};
  const ownLabelledBy = labelledBy ?? (childProps["aria-labelledby"] as string | undefined);
  const hasOwnName = props["aria-label"] != null || childProps["aria-label"] != null;
  const shared = {
    "data-slot": "tile",
    "data-layout": layout,
    "aria-labelledby": hasOwnName ? ownLabelledBy : ownLabelledBy ?? titleId,
    "aria-describedby":
      [descriptionId, bodyId, describedBy ?? (childProps["aria-describedby"] as string | undefined)].filter(Boolean).join(" ") ||
      undefined,
  };
  const content = (
    <>
      {icon != null && (
        <span className="ci-tile__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="ci-tile__copy">
        <span className="ci-tile__heading">
          <span id={titleId} className="ci-tile__title">
            {title}
          </span>
          {meta != null && <span className="ci-tile__meta">{meta}</span>}
          {pressed !== undefined && !linkChild && (
            <span className="ci-tile__indicator" aria-hidden="true">
              <Check />
            </span>
          )}
        </span>
        {description != null && (
          <span id={descriptionId} className="ci-tile__description">
            {description}
          </span>
        )}
        {bodyId && (
          <span id={bodyId} className="ci-tile__body">
            {children}
          </span>
        )}
      </span>
    </>
  );

  if (linkChild) {
    return cloneElement(linkChild, {
      ...props,
      ...shared,
      ...(disabled ? { "aria-disabled": true } : {}),
      className: cn("ci-tile", className, linkChild.props.className as string | undefined),
      children: content,
    });
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      aria-pressed={pressed}
      data-pressed={pressed || undefined}
      className={cn("ci-tile", className)}
      {...props}
      {...shared}
    >
      {content}
    </button>
  );
});
