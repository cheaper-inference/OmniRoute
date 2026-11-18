"use client";

import { useEffect, useState } from "react";
import FalNativePanel from "./FalNativePanel";

type FlagList = { flags?: Array<{ key?: string; effectiveValue?: string }> };

/** Renders nothing unless FAL_NATIVE_ENABLED is on, so a failed read keeps the panel hidden. */
export default function FalNativeGate({ connectionId }: { connectionId: string | null }) {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/settings/feature-flags", { signal: controller.signal })
      .then((response) => (response.ok ? (response.json() as Promise<FlagList>) : null))
      .then((payload) => {
        const flag = payload?.flags?.find((item) => item.key === "FAL_NATIVE_ENABLED");
        setEnabled(["true", "1", "yes"].includes(flag?.effectiveValue ?? ""));
      })
      .catch(() => setEnabled(false));
    return () => controller.abort();
  }, []);
  return enabled ? <FalNativePanel connectionId={connectionId} /> : null;
}
