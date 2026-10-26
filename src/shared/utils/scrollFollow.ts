// Should a scrolling log keep following its own tail?
//
// Writing `scrollTop = scrollHeight` on every append drags a reader who is looking at an older
// line back to the bottom on the next entry. Follow mode is therefore a property of where the
// reader already is: at the bottom means "keep me there", anywhere else means "leave me alone".

/** The geometry a scroll container reports; structural so tests can pass a plain object. */
export interface ScrollGeometry {
  scrollTop?: unknown;
  scrollHeight?: unknown;
  clientHeight?: unknown;
}

/**
 * How far from the bottom still counts as "at the bottom", in CSS pixels.
 *
 * Not zero: `scrollHeight` and `clientHeight` are integers while `scrollTop` is fractional under a
 * non-integer device pixel ratio, so an element pinned to its bottom routinely reports a residue
 * of a pixel or two. An exact comparison would drop the reader out of follow mode without them
 * having scrolled.
 */
export const SCROLL_FOLLOW_SLACK_PX = 8;

function isMeasurement(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

/**
 * True when `el` is scrolled to (or within `slack` of) its bottom.
 *
 * A missing or unmeasured element answers true: nothing has been painted yet, and the first paint
 * of a log should land at the newest line (freezing the log would be worse than scrolling it).
 */
export function isPinnedToBottom(
  el: ScrollGeometry | null | undefined,
  slack: number = SCROLL_FOLLOW_SLACK_PX
): boolean {
  if (!el) return true;
  const { scrollTop, scrollHeight, clientHeight } = el;
  if (!isMeasurement(scrollTop) || !isMeasurement(scrollHeight) || !isMeasurement(clientHeight)) {
    return true;
  }
  return scrollHeight - scrollTop - clientHeight <= slack;
}
