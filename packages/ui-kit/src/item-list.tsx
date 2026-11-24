"use client";

import { cloneElement, forwardRef, isValidElement, useId } from "react";
import type { ComponentPropsWithoutRef, MouseEvent, ReactElement, ReactNode } from "react";
import { cn } from "./lib/utils";

export type ItemListVariant = "separated" | "divided";
export type ItemListDensity = "default" | "compact";

export interface ItemListProps extends ComponentPropsWithoutRef<"ul"> {
  /**
   * `separated` (default) gives every row its own border and the control radius, with a gap
   * between rows. `divided` draws one divider between rows and no frame, for a list that sits
   * inside a `Card` or a panel.
   */
  variant?: ItemListVariant;
  /** `compact` is a 36px row with tighter padding; the default is 48px. */
  density?: ItemListDensity;
}

/** A short list of rows. Name it with `aria-label` or `aria-labelledby` when a heading does not. */
export const ItemList = forwardRef<HTMLUListElement, ItemListProps>(function ItemList(
  { className, variant = "separated", density = "default", ...props },
  ref,
) {
  return (
    <ul
      ref={ref}
      // Safari drops the list semantics of a list without markers; the explicit role keeps them.
      role="list"
      data-slot="item-list"
      data-variant={variant}
      data-density={density}
      className={cn("ci-item-list", className)}
      {...props}
    />
  );
});

export interface ItemProps extends Omit<ComponentPropsWithoutRef<"li">, "title"> {
  /** Main line. It is the content, and so the name, of the row's link or button when there is one. */
  title: ReactNode;
  /** Secondary line; describes the row's link or button through `aria-describedby`. */
  description?: ReactNode;
  /** Mark at the start of the row: an icon, an `Avatar`, a status dot. */
  leading?: ReactNode;
  /** Passive content at the end of the row: a `Badge`, a count, a timestamp. */
  meta?: ReactNode;
  /**
   * Controls at the end of the row. They sit above the row's hit area and are tab stops of their
   * own, after the row's control, so they never activate the row. Put every control here.
   */
  actions?: ReactNode;
  /**
   * One line for the title and one for the description, cut with an ellipsis; they wrap by
   * default. The copy can then go down to 6rem beside the trailing group instead of 10rem.
   */
  truncate?: boolean;
  /**
   * Marks the row as the current one: `data-state="selected"` on the row and `aria-current="true"`
   * on its link or button (on the row itself when it has neither).
   */
  selected?: boolean;
  /**
   * Dims the row and disables its control: a button gets `disabled`; a link gets
   * `aria-disabled="true"`, stays in the tab order and ignores a click, Enter and the middle
   * button (its `href` is kept, so the browser's context menu can still open it). `actions` are
   * left alone.
   */
  disabled?: boolean;
  /**
   * Makes the whole row activate: the title is rendered in a `<button>` whose hit area covers the
   * row. Runs on a click and on Enter or Space, as for any button. Ignored with `asChild`.
   */
  onActivate?: (event: MouseEvent<HTMLButtonElement>) => void;
  /**
   * Makes the whole row a link: the single child element (an `<a>` or a router `Link`) is rendered
   * around the title, with a hit area that covers the row. The child's own content is replaced.
   */
  asChild?: boolean;
}

function cancel(event: MouseEvent<HTMLElement>) {
  event.preventDefault();
}

/** Slot rule: null, undefined, booleans and "" are absent, so `meta={show && <Badge />}` renders nothing. */
function present(node: ReactNode) {
  return node != null && typeof node !== "boolean" && node !== "";
}

/**
 * A row of an `ItemList`. Static by default; `onActivate` or `asChild` make the whole row one
 * control without nesting it around the `actions`.
 */
export const Item = forwardRef<HTMLLIElement, ItemProps>(function Item(
  {
    className,
    title,
    description,
    leading,
    meta,
    actions,
    truncate = false,
    selected,
    disabled = false,
    onActivate,
    asChild = false,
    children,
    ...props
  },
  ref,
) {
  const baseId = useId();
  const descriptionId = present(description) ? `${baseId}-description` : undefined;
  const linkChild = asChild && isValidElement(children) ? (children as ReactElement<Record<string, unknown>>) : null;
  const interactive = linkChild != null || onActivate != null;
  const hasBody = !linkChild && present(children);
  const hasMeta = present(meta);
  const hasActions = present(actions);

  let heading: ReactNode = title;
  if (linkChild) {
    const childProps = linkChild.props;
    heading = cloneElement(linkChild, {
      className: cn("ci-item__primary", childProps.className as string | undefined),
      "aria-describedby":
        [descriptionId, childProps["aria-describedby"] as string | undefined].filter(Boolean).join(" ") || undefined,
      ...(selected ? { "aria-current": childProps["aria-current"] ?? "true" } : {}),
      // A link has no disabled state: it stays focusable, says so, and its activation is cancelled.
      // The middle button opens a link through auxclick, so both events are cancelled.
      ...(disabled ? { "aria-disabled": true, onClick: cancel, onAuxClick: cancel } : {}),
      children: title,
    });
  } else if (onActivate) {
    heading = (
      <button
        type="button"
        className="ci-item__primary"
        disabled={disabled}
        aria-describedby={descriptionId}
        aria-current={selected ? "true" : undefined}
        onClick={onActivate}
      >
        {title}
      </button>
    );
  }

  return (
    <li
      ref={ref}
      aria-current={selected && !interactive ? "true" : undefined}
      {...props}
      data-slot="item"
      data-interactive={interactive ? "" : undefined}
      data-state={selected ? "selected" : undefined}
      data-disabled={disabled ? "" : undefined}
      data-truncate={truncate ? "" : undefined}
      className={cn("ci-item", className)}
    >
      {present(leading) && <span className="ci-item__leading">{leading}</span>}
      <div className="ci-item__content">
        <div className="ci-item__title">{heading}</div>
        {descriptionId && (
          <div id={descriptionId} className="ci-item__description">
            {description}
          </div>
        )}
        {hasBody && <div className="ci-item__body">{children}</div>}
      </div>
      {(hasMeta || hasActions) && (
        <div className="ci-item__trailing">
          {hasMeta && <div className="ci-item__meta">{meta}</div>}
          {hasActions && <div className="ci-item__actions">{actions}</div>}
        </div>
      )}
    </li>
  );
});
