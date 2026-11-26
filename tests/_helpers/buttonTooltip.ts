import { act, fireEvent } from "@testing-library/react";

/**
 * Moves focus to `target` the way the Tab key does. The kit tooltip opens only on a focus the user
 * navigated to (packages/ui-kit/src/lib/keyboard-focus.ts, kit #317), so a bare `focus()` — what a
 * dialog does when it opens — shows none. The key events go to the document, not through the
 * component tree, so no widget handles them.
 */
export function tabTo(target: Element): void {
  const doc = target.ownerDocument;
  fireEvent.keyDown(doc, { key: "Tab" });
  fireEvent.focus(target);
  fireEvent.keyUp(doc, { key: "Tab" });
}

/**
 * The Button adapter shows its `title` through the kit tooltip (kit `Button tooltip`), not as a
 * native `title` attribute, so the text is in the DOM only while the tooltip is open. This reads
 * it the way a keyboard user gets it: tabbing to the button opens the tooltip at once, blur
 * closes it.
 *
 * Returns "" when the button shows no tooltip.
 */
export async function readButtonTooltip(button: Element): Promise<string> {
  const doc = button.ownerDocument;
  await act(async () => {
    tabTo(button);
  });
  const text = doc.querySelector('[role="tooltip"]')?.textContent ?? "";
  await act(async () => {
    fireEvent.blur(button);
  });
  return text;
}

/**
 * The Button under `root` whose tooltip reads `match`, or null. It replaces a `[title="…"]`
 * selector for a Button whose title describes it (a button with visible text): the title is no
 * longer an attribute. A Button whose title is also its name is simpler to find by role and name.
 */
export async function findButtonByTooltip(
  root: ParentNode,
  match: string | RegExp
): Promise<HTMLButtonElement | null> {
  // The kit tooltip trigger carries Radix's `data-state` on the button itself.
  for (const button of root.querySelectorAll<HTMLButtonElement>("button[data-state]")) {
    const text = await readButtonTooltip(button);
    if (typeof match === "string" ? text === match : match.test(text)) return button;
  }
  return null;
}
