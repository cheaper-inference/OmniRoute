"use client";
import { useSyncExternalStore } from "react";
import { sanitizeQuotaProviderOrder } from "@/shared/utils/quotaProviderOrder";
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
// Server copy (`settings.quotaProviderOrder`, PATCH /api/settings): read once per
// page load, written through on every change; localStorage stays the cache.
let serverRequested = false;
let changedLocally = false;
let pendingServerOrder: string[] | null = null;
let serverWriteInFlight = false;
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
  hydrateFromServer();
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
/** A saved server order wins over this browser's cache; an empty one keeps the cache. */
function hydrateFromServer() {
  if (serverRequested || typeof fetch !== "function") return;
  serverRequested = true;
  fetch("/api/settings", { cache: "no-store" })
    .then((response) => (response.ok ? response.json() : null))
    .then((settings: { quotaProviderOrder?: unknown } | null) => {
      const remote = sanitizeQuotaProviderOrder(settings?.quotaProviderOrder);
      // A drag or reset made while the request was in flight is newer than the response.
      if (!remote.length || changedLocally) return;
      store(remote);
    })
    .catch(() => {
      /* Best effort: without the server copy the local order remains usable. */
    });
}
/** Writes are serialized and coalesced so a slow response can never land an older order last. */
async function flushServerOrder() {
  if (serverWriteInFlight) return;
  serverWriteInFlight = true;
  try {
    while (pendingServerOrder) {
      const quotaProviderOrder = pendingServerOrder;
      pendingServerOrder = null;
      try {
        await fetch("/api/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quotaProviderOrder }),
        });
      } catch {
        /* Best effort: the order is still kept in this browser's storage. */
      }
    }
  } finally {
    serverWriteInFlight = false;
  }
}
function update(next: string[]) {
  changedLocally = true;
  store(next);
  if (typeof fetch === "function") {
    pendingServerOrder = sanitizeQuotaProviderOrder(next);
    void flushServerOrder();
  }
}
function store(next: string[]) {
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
