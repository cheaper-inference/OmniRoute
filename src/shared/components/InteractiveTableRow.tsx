"use client";

import type { ComponentProps } from "react";
import { TableRow } from "@omniroute/ui-kit/table";

const INTERACTIVE_ELEMENT_SELECTOR =
  'a[href], button, input, select, textarea, summary, [role="button"], [role="link"], ' +
  '[contenteditable]:not([contenteditable="false"]), [tabindex]:not([tabindex="-1"])';

/** True when the event started on a control inside the row (a button, a link, a field). */
function targetsNestedInteractiveElement(
  row: HTMLTableRowElement,
  target: EventTarget | null
): boolean {
  if (!(target instanceof Element)) return false;
  const interactiveElement = target.closest(INTERACTIVE_ELEMENT_SELECTOR);
  return (
    interactiveElement !== null && interactiveElement !== row && row.contains(interactiveElement)
  );
}

interface InteractiveTableRowProps extends Omit<
  ComponentProps<typeof TableRow>,
  "onClick" | "onKeyDown" | "tabIndex" | "aria-selected"
> {
  /** Runs on a click, and on Enter / Space while the row has focus. Omit for a passive row. */
  onActivate?: () => void;
  /** Marks the row as the selected one: `aria-selected` plus the kit `data-state="selected"`. */
  selected?: boolean;
}

/**
 * InteractiveTableRow — the kit `TableRow` for a row that does something when it is clicked.
 * Use it instead of `<TableRow onClick>`, so the row works without a mouse too:
 *
 *   <InteractiveTableRow onActivate={() => openDetail(log)} className="cursor-pointer">
 *
 * The row becomes a tab stop and Enter / Space run `onActivate`, the same as a click. A click
 * or a key press on a control inside the row (button, link, field) is left to that control.
 * Without `onActivate` it renders a plain `TableRow`: no tab stop, no handlers.
 *
 * The kit `TableRow` only forwards props (it has no interactive row yet); this adapter is the
 * single place that holds the behaviour until it does. Used by the `DataTable` adapter and by
 * the hand-assembled tables with a clickable row.
 */
export default function InteractiveTableRow({
  onActivate,
  selected = false,
  ...props
}: InteractiveTableRowProps) {
  return (
    <TableRow
      {...props}
      aria-selected={selected || undefined}
      data-state={selected ? "selected" : undefined}
      tabIndex={onActivate ? 0 : undefined}
      onClick={
        onActivate
          ? (event) => {
              if (targetsNestedInteractiveElement(event.currentTarget, event.target)) return;
              onActivate();
            }
          : undefined
      }
      onKeyDown={
        onActivate
          ? (event) => {
              // A key pressed on a control inside the row bubbles up here: it is not the row's.
              if (event.target !== event.currentTarget) return;
              if (event.key !== "Enter" && event.key !== " ") return;
              event.preventDefault();
              onActivate();
            }
          : undefined
      }
    />
  );
}
