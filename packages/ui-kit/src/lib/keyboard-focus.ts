/**
 * Tells a focus the user moved with the keyboard from a focus that code moved, such as a dialog
 * focusing its first control when it opens or handing focus back to its opener when it closes.
 *
 * `:focus-visible` does not tell them apart: Chromium matches it on a focus moved by code before
 * any interaction, after Enter or Space on a dialog trigger, and when Escape hands focus back. So
 * this looks at the key instead: a focus counts as keyboard navigation while a key that moves focus
 * is down, from its `keydown` until just after its `keyup`, a pointer press or the window losing focus.
 */

/** Keys that move focus: Tab by the browser, the others by a roving-focus widget (toolbar, table rows). */
const FOCUS_MOVING_KEYS = new Set(["Tab", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End", "PageUp", "PageDown"]);

interface Navigation {
  active: boolean;
}

/** One record per document, so a trigger in an iframe or another window reads its own keys. */
const navigationByDocument = new WeakMap<Document, Navigation>();

/** Starts listening for focus-moving keys in `doc`, once. Safe to call on every render or focus. */
export function watchKeyboardNavigation(doc: Document): Navigation {
  const known = navigationByDocument.get(doc);
  if (known) return known;
  const navigation: Navigation = { active: false };
  navigationByDocument.set(doc, navigation);
  // Bumped by every event below, so that a stop scheduled by a keyup never ends a later key.
  let latest = 0;
  const stop = () => {
    latest += 1;
    navigation.active = false;
  };
  // Capture phase: a widget that stops the key's propagation must not hide it from this.
  doc.addEventListener("keydown", (event) => {
    latest += 1;
    navigation.active = FOCUS_MOVING_KEYS.has(event.key);
  }, true);
  doc.addEventListener("keyup", () => {
    // A roving-focus group may move focus in a timeout set on keydown (Radix RovingFocusGroup
    // does), which a quick key press can release before. Stop after the timeouts already queued.
    const at = ++latest;
    setTimeout(() => {
      if (latest === at) navigation.active = false;
    });
  }, true);
  doc.addEventListener("pointerdown", stop, true);
  doc.addEventListener("mousedown", stop, true);
  // A Tab that leaves the page never sends its keyup here; the focus the browser restores on return is not navigation.
  doc.defaultView?.addEventListener("blur", stop);
  return navigation;
}

/** Whether the focus being handled now follows a key that moves focus. */
export function isKeyboardNavigationFocus(doc: Document): boolean {
  return watchKeyboardNavigation(doc).active;
}
