/**
 * Tells a focus the user moved with the keyboard (Tab, arrows…) from a focus that code moved:
 * a dialog focusing its first control when it opens, or handing focus back to its opener.
 *
 * Used by the Button adapter: the kit tooltip (Radix) opens on every focus, so a titled button
 * that a dialog focuses on open would show its tooltip unasked, and that open tooltip would
 * take the first Escape instead of the dialog. Only a focus the user navigated to opens it.
 */

/** Keys that move focus: by the browser (Tab) or by a roving-focus widget (arrows, Home…). */
const FOCUS_MOVING_KEYS = new Set([
  "Tab",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Home",
  "End",
  "PageUp",
  "PageDown",
]);

/** True from the keydown of a focus-moving key until its keyup or the next pointer press. */
let navigating = false;
let installed = false;

function install(): void {
  if (installed || typeof document === "undefined") return;
  installed = true;
  const stop = () => {
    navigating = false;
  };
  // Capture phase: a widget that stops propagation must not hide the key from this.
  document.addEventListener(
    "keydown",
    (event) => {
      navigating = FOCUS_MOVING_KEYS.has(event.key);
    },
    true
  );
  document.addEventListener("keyup", stop, true);
  document.addEventListener("pointerdown", stop, true);
  document.addEventListener("mousedown", stop, true);
}

install();

/** Whether the focus being handled right now follows a focus-moving key press. */
export function isKeyboardNavigationFocus(): boolean {
  install();
  return navigating;
}
