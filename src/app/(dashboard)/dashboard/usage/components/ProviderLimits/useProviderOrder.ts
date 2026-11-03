"use client";
import { useSyncExternalStore } from "react";
import { PROVIDER_ORDER } from "./constants";
import {
  applyProviderOrder,
  mergeVisibleProviderOrder,
  PROVIDER_ORDER_KEY,
  readProviderOrder,
} from "./providerOrder";
const ORDER_EVENT = "omniroute:limits:providerOrderChanged";
const EMPTY: string[] = [];
let saved = EMPTY;
let volatile = false;
const listeners = new Set<() => void>();
function replace(next: string[]) {
  if (JSON.stringify(next) !== JSON.stringify(saved)) saved = next;
}
function refresh() {
  let readable = false;
  const next = readProviderOrder(() => ({
    getItem: (key) => {
      const value = localStorage.getItem(key);
      readable = true;
      return value;
    },
  }));
  if (readable) {
    replace(next);
    volatile = false;
  }
}
function snapshot() {
  // A failed write must not be undone by a successful read of the old value.
  if (!volatile && typeof window !== "undefined") refresh();
  return saved;
}
function notify() {
  for (const listener of listeners) listener();
}
function sync(event: Event) {
  if (event instanceof StorageEvent && event.key !== null && event.key !== PROVIDER_ORDER_KEY)
    return;
  refresh();
  notify();
}
function subscribe(listener: () => void) {
  if (!listeners.size) {
    window.addEventListener("storage", sync);
    window.addEventListener(ORDER_EVENT, sync);
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (!listeners.size) {
      window.removeEventListener("storage", sync);
      window.removeEventListener(ORDER_EVENT, sync);
    }
  };
}
function update(next: string[]) {
  replace(next);
  try {
    if (next.length) localStorage.setItem(PROVIDER_ORDER_KEY, JSON.stringify(next));
    else localStorage.removeItem(PROVIDER_ORDER_KEY);
    volatile = false;
  } catch {
    volatile = true;
  }
  // All mounted layouts and subsequent mounts share this module-level fallback.
  notify();
}
export function useProviderOrder(ids: string[]) {
  const orderSnapshot = useSyncExternalStore(subscribe, snapshot, () => EMPTY);
  return {
    order: applyProviderOrder(ids, orderSnapshot, PROVIDER_ORDER),
    custom: orderSnapshot.length > 0,
    reset: () => update([]),
    reorder: (visible: string[]) =>
      update(mergeVisibleProviderOrder(snapshot(), ids, visible, PROVIDER_ORDER)),
  };
}
