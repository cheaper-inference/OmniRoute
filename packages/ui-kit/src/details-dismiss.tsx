"use client";

import { useEffect, useRef } from "react";

/**
 * Progressive enhancement for a native `<details>` disclosure: once hydrated,
 * Escape closes it (before any open dialog sees the key) and returns focus to
 * its `<summary>`, and a pointer press outside closes it. Without JavaScript
 * the disclosure keeps working natively.
 */
export function DetailsDismiss() {
  const marker = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const details = marker.current?.closest("details");
    const view = details?.ownerDocument.defaultView;
    if (!details || !view) return;
    const summary = details.querySelector<HTMLElement>(":scope > summary");
    // Window capture runs before Radix's document-level Escape handler, so an open switcher
    // inside a Sheet closes first and the Sheet stays open.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !details.open) return;
      if (!(event.target instanceof Node) || !details.contains(event.target)) return;
      event.preventDefault();
      details.open = false;
      summary?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (details.open && event.target instanceof Node && !details.contains(event.target)) details.open = false;
    };
    view.addEventListener("keydown", onKeyDown, true);
    details.ownerDocument.addEventListener("pointerdown", onPointerDown);
    return () => {
      view.removeEventListener("keydown", onKeyDown, true);
      details.ownerDocument.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);
  return <span ref={marker} hidden />;
}
