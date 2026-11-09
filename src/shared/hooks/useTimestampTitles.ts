"use client";

import { useEffect, type RefObject } from "react";

const TIMESTAMP_FIELD_NAME = /created|updated|modified|timestamp|(^|_)ts$|_at$/i;
// Unix epoch bounds spanning year 2000 to year 2100, checked at both
// seconds and millisecond precision (both are common on the wire).
const EPOCH_SECONDS_MIN = 946684800;
const EPOCH_SECONDS_MAX = 4102444800;
const EPOCH_MS_MIN = EPOCH_SECONDS_MIN * 1000;
const EPOCH_MS_MAX = EPOCH_SECONDS_MAX * 1000;
// Shared: every hover and streamed chunk re-reads each value on screen.
const TITLE_FORMAT = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "medium",
});

function epochValueToDate(value: number): Date | null {
  if (!Number.isFinite(value)) return null;
  if (value >= EPOCH_SECONDS_MIN && value <= EPOCH_SECONDS_MAX) return new Date(value * 1000);
  if (value >= EPOCH_MS_MIN && value <= EPOCH_MS_MAX) return new Date(value);
  return null;
}

function timestampTitle(valueEl: HTMLElement): string {
  // The kit JsonTree has no per-value render hook, so the field name comes from the row: a row's
  // key shows in quotes, and an array index carries another tone, so it never matches.
  const key = valueEl.parentElement?.querySelector('[data-tone="key"]')?.textContent ?? "";
  if (!TIMESTAMP_FIELD_NAME.test(key.slice(1, -1))) return "";
  const date = epochValueToDate(Number(valueEl.textContent));
  return date ? TITLE_FORMAT.format(date) : "";
}

// Adds a human-readable date/time title (tooltip) to the number values of timestamp fields.
// Re-runs on any DOM change inside the container: expanding a node is the tree's own state, not a
// prop change this component would otherwise see, and a new payload rewrites a value in place.
export function useTimestampTitles(containerRef: RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    const container = containerRef.current;
    if (!active || !container) return;

    const annotate = () => {
      for (const valueEl of container.querySelectorAll<HTMLElement>('[data-tone="number"]')) {
        valueEl.title = timestampTitle(valueEl);
      }
    };

    annotate();
    const observer = new MutationObserver(annotate);
    observer.observe(container, { childList: true, characterData: true, subtree: true });
    return () => observer.disconnect();
  }, [containerRef, active]);
}
