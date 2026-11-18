/**
 * Focus return for the batch-test results dialog (#18070).
 *
 * The "Test all" / "Retest selected" triggers are disabled while the batch runs, so the
 * browser drops focus to <body> before the results dialog mounts and the Modal has no
 * opener to return to. The trigger is remembered when the batch starts and focused again
 * once the results are dismissed (after the re-render that enables it).
 */

type FocusEventLike = { currentTarget?: unknown } | null | undefined;

/** The element that started the batch: the click target, else the focused element. */
export function resolveBatchTestOpener(event?: FocusEventLike): HTMLElement | null {
  if (typeof HTMLElement === "undefined") return null;
  const target = event?.currentTarget;
  if (target instanceof HTMLElement) return target;
  const active = typeof document === "undefined" ? null : document.activeElement;
  return active instanceof HTMLElement && active !== document.body ? active : null;
}

/** Focus `opener` after the current render, if it is still in the DOM and enabled. */
export function restoreBatchTestFocus(opener: HTMLElement | null): void {
  if (!opener) return;
  setTimeout(() => {
    if (!opener.isConnected || opener.matches(":disabled")) return;
    opener.focus();
  }, 0);
}
