"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const STORAGE_KEY = "sidebar-pinned-items";
const UPDATED_EVENT = "omniroute:sidebar-pinned-items-updated";
// Keep controls usable for this session when browser storage is blocked or full.
let unsavedSnapshot: string | null = null;

function readSnapshot(): string {
  if (unsavedSnapshot !== null) return unsavedSnapshot;
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function parsePins(raw: string): Set<string> {
  try {
    const value: unknown = JSON.parse(raw);
    if (Array.isArray(value)) {
      return new Set(value.filter((id): id is string => typeof id === "string"));
    }
  } catch {
    // Ignore malformed legacy browser state.
  }
  return new Set();
}

function subscribe(onChange: () => void): () => void {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY && event.key !== null) return;
    unsavedSnapshot = null;
    onChange();
  };
  window.addEventListener(UPDATED_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(UPDATED_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

const serverSnapshot = () => "[]";

/** One persisted pin list shared by page actions and the dashboard sidebar. */
export function usePinnedSidebarItems() {
  const raw = useSyncExternalStore(subscribe, readSnapshot, serverSnapshot);
  const pinnedItems = useMemo(() => parsePins(raw), [raw]);
  const togglePinItem = useCallback((id: string) => {
    // Read at click time so repeated actions and different controls do not overwrite each other.
    const next = parsePins(readSnapshot());
    if (next.has(id)) next.delete(id);
    else next.add(id);
    const value = JSON.stringify([...next]);
    try {
      localStorage.setItem(STORAGE_KEY, value);
      unsavedSnapshot = null;
    } catch {
      unsavedSnapshot = value;
    }
    window.dispatchEvent(new Event(UPDATED_EVENT));
  }, []);
  return { pinnedItems, togglePinItem };
}
