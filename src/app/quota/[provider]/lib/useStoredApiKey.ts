"use client";

import { useSyncExternalStore } from "react";

import { createKeyStore, type KeyStore, type StoredKey } from "./keyStore";

/** Browser storage may be absent (server render) or throw (blocked site data). */
function browserArea(pick: (scope: Window) => Storage): Storage | null {
  try {
    return typeof window === "undefined" ? null : pick(window);
  } catch {
    return null;
  }
}

// One store per page load, shared by every component that needs the key.
const store = createKeyStore({
  session: () => browserArea((scope) => scope.sessionStorage),
  device: () => browserArea((scope) => scope.localStorage),
});

/** Follows the store, and re-reads the storages when another tab changes them. */
function subscribe(listener: () => void): () => void {
  const unsubscribe = store.subscribe(listener);
  const onStorage = () => store.reload();
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener("storage", onStorage);
    unsubscribe();
  };
}

const serverSnapshot = () => null;

/** The self-service API key held in this browser, and the actions that move it. */
export function useStoredApiKey(): { stored: StoredKey | null } & Pick<
  KeyStore,
  "hold" | "confirmKey" | "unpersist" | "forget"
> {
  const stored = useSyncExternalStore(subscribe, store.getSnapshot, serverSnapshot);
  return {
    stored,
    hold: store.hold,
    confirmKey: store.confirmKey,
    unpersist: store.unpersist,
    forget: store.forget,
  };
}
