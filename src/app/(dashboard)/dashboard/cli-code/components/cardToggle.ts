import type { KeyboardEvent } from "react";

/**
 * Props for a tool card's clickable header row: makes the collapse/expand toggle reachable and
 * operable from the keyboard (Enter/Space) and announces the expanded state. The header holds
 * no other interactive control, so the row itself is the button. Without `onToggle` the row
 * stays a plain container.
 */
export function cardToggleProps(expanded: boolean, onToggle?: () => void) {
  // No toggle (the detail page renders every card expanded): a plain, non-interactive row.
  if (!onToggle) return {};
  return {
    role: "button" as const,
    tabIndex: 0,
    "aria-expanded": expanded,
    onClick: onToggle,
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
      if (event.target !== event.currentTarget) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onToggle?.();
      }
    },
  };
}

/** Focus ring for the header row (the kit ring colour on a rounded row). */
export const CARD_TOGGLE_CLASS =
  "rounded-control outline-none focus-visible:ring-2 focus-visible:ring-primary/60";
