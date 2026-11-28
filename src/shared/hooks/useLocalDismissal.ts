"use client";

import { useCallback, useSyncExternalStore } from "react";

const getServerSnapshot = () => false;

export function useLocalDismissal(storageKey: string): {
  dismissed: boolean;
  dismiss: () => void;
} {
  const eventName = `omniroute:dismissal:${storageKey}`;

  const subscribe = useCallback(
    (onChange: () => void) => {
      const onStorage = (event: StorageEvent) => {
        if (event.key === storageKey || event.key === null) onChange();
      };
      window.addEventListener(eventName, onChange);
      window.addEventListener("storage", onStorage);
      return () => {
        window.removeEventListener(eventName, onChange);
        window.removeEventListener("storage", onStorage);
      };
    },
    [eventName, storageKey]
  );

  const getSnapshot = useCallback(() => {
    try {
      return window.localStorage.getItem(storageKey) === "1";
    } catch {
      return false;
    }
  }, [storageKey]);

  const dismiss = useCallback(() => {
    try {
      window.localStorage.setItem(storageKey, "1");
    } catch {
      return;
    }
    window.dispatchEvent(new Event(eventName));
  }, [eventName, storageKey]);

  return { dismissed: useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot), dismiss };
}
