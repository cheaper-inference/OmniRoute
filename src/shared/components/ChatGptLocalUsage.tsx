"use client";

import { useEffect, useState } from "react";
import type { ConnectionLocalUsage } from "@/shared/types/connectionLocalUsage";
import { ChatGptUsageSummary } from "./ChatGptPlanUi";

export default function ChatGptLocalUsage({
  connectionId,
  limitReached = false,
}: {
  connectionId: string;
  limitReached?: boolean;
}) {
  const [result, setResult] = useState<{
    connectionId: string;
    revision: number;
    usage?: ConnectionLocalUsage;
    error?: boolean;
  } | null>(null);
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    let current = true;
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch(
          `/api/usage/local-summary?connectionId=${encodeURIComponent(connectionId)}`,
          {
            cache: "no-store",
            signal: controller.signal,
          }
        );
        if (!response.ok) throw new Error("Local usage unavailable");
        const usage = await response.json();
        if (
          usage.source !== "retained_local_history" ||
          ![usage.requests, usage.tokens, usage.activeDays].every(
            (value) => typeof value === "number" && Number.isFinite(value) && value >= 0
          )
        )
          throw new Error("Invalid local usage");
        if (current) setResult({ connectionId, revision, usage });
      } catch {
        if (current) setResult({ connectionId, revision, error: true });
      }
    }
    void load();
    return () => {
      current = false;
      controller.abort();
    };
  }, [connectionId, revision]);
  const active =
    result?.connectionId === connectionId && result.revision === revision ? result : null;
  return (
    <ChatGptUsageSummary
      usage={active?.usage}
      loading={!active}
      error={active?.error}
      onRefresh={() => setRevision((value) => value + 1)}
      limitReached={limitReached}
    />
  );
}
