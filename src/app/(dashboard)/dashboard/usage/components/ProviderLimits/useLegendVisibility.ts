"use client";
import { useSyncExternalStore } from "react";

const STORAGE_KEY = "omniroute:limits:healthLegendHidden";
let hidden = false;
let volatile = false;
const listeners = new Set<() => void>();

function snapshot() {
  // Do not overwrite a failed write with the stale persisted value.
  if (!volatile && typeof window !== "undefined") {
    try {
      hidden = window.localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // Storage may be unavailable; keep the shared session preference.
    }
  }
  return hidden;
}
function notify() {
  for (const listener of listeners) listener();
}
function sync(event: StorageEvent) {
  if (event.key !== null && event.key !== STORAGE_KEY) return;
  if (volatile) return;
  snapshot();
  notify();
}
function subscribe(listener: () => void) {
  if (!listeners.size) window.addEventListener("storage", sync);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (!listeners.size) window.removeEventListener("storage", sync);
  };
}
function toggle() {
  hidden = !snapshot();
  try {
    if (hidden) window.localStorage.setItem(STORAGE_KEY, "1");
    else window.localStorage.removeItem(STORAGE_KEY);
    volatile = false;
  } catch {
    volatile = true;
  }
  // All mounted overviews and later mounts share the fallback, even without storage.
  notify();
}
export function useLegendVisibility() {
  const legendHidden = useSyncExternalStore(subscribe, snapshot, () => false);
  return { legendHidden, toggleLegend: toggle };
}
