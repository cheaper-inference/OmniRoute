// Helpers for a group of triggers that share one kit hover card (`useSharedHoverCard`), such as
// the capsules of the quota health overview. The card opens at once on keyboard focus and after
// the kit's delay on pointer rest, and it closes after a short delay when the pointer or the
// focus leaves, so a test waits for it instead of reading the DOM in the same tick.
import { act, fireEvent, screen, waitFor } from "@testing-library/react";

// The kit's delays are a few hundred milliseconds; a loaded runner needs room on top of them.
const SETTLE = { timeout: 10_000 };

/**
 * Moves keyboard focus to the trigger as a Tab press would: the card opens at once. The kit opens
 * it for keyboard focus only (`:focus-visible`), which jsdom derives from the key pressed before
 * the focus moved, so a bare `focus()` or `fireEvent.focus` is not enough.
 */
export function focusHoverCardTrigger(trigger: HTMLElement): HTMLElement {
  if (document.activeElement === trigger) act(() => trigger.blur());
  fireEvent.keyDown(document.activeElement ?? document.body, { key: "Tab" });
  act(() => trigger.focus());
  return screen.getByRole("tooltip");
}

/** Rests the pointer on the trigger and waits for the card. */
export async function hoverHoverCardTrigger(trigger: Element): Promise<HTMLElement> {
  fireEvent.pointerEnter(trigger);
  return screen.findByRole("tooltip", undefined, SETTLE);
}

/** Waits for the card to close after the pointer or the focus left its trigger. */
export async function waitForHoverCardToClose(): Promise<void> {
  await waitFor(() => {
    if (screen.queryByRole("tooltip")) throw new Error("the hover card is still open");
  }, SETTLE);
}
