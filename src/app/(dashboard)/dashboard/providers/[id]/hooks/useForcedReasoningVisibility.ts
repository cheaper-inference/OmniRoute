"use client";
import { useCallback, useEffect, useState } from "react";
import { hideForcedReasoningModelsSetting } from "@omniroute/open-sse/services/nativeReasoningFamilies";

/** Independent settings keys keep the two provider pages from overwriting each other. */
export function useForcedReasoningVisibility(providerId: string) {
  const key = hideForcedReasoningModelsSetting(providerId);
  const [state, setState] = useState({
    key: null as string | null,
    hidden: false,
    loaded: false,
    saving: false,
    error: false,
  });
  useEffect(() => {
    if (!key) return;
    let alive = true;
    fetch("/api/settings", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("settings");
        return response.json();
      })
      .then((settings) => {
        if (alive)
          setState({
            key,
            hidden: settings[key] === true,
            loaded: true,
            saving: false,
            error: false,
          });
      })
      .catch(() => {
        if (alive) setState({ key, hidden: false, loaded: false, saving: false, error: true });
      });
    return () => {
      alive = false;
    };
  }, [key]);
  const save = useCallback(
    async (hidden: boolean) => {
      if (!key || state.key !== key || !state.loaded || state.saving) return;
      const previous = state.hidden;
      setState((current) => ({ ...current, hidden, saving: true, error: false }));
      try {
        const response = await fetch("/api/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ [key]: hidden }),
        });
        if (!response.ok) throw new Error("settings");
        setState((current) => (current.key === key ? { ...current, saving: false } : current));
      } catch {
        setState((current) =>
          current.key === key
            ? { ...current, hidden: previous, saving: false, error: true }
            : current
        );
      }
    },
    [key, state]
  );
  return {
    supported: !!key,
    hidden: state.key === key && state.hidden,
    disabled: state.key !== key || !state.loaded || state.saving,
    error: state.key === key && state.error,
    save,
  };
}
