"use client";

import type { ChaosPageMessage } from "../chaosPageTypes";

/**
 * Success/error status banner for the Chaos Mode config page. Extracted out
 * of ChaosConfigPageClient.tsx to keep the page component under the
 * complexity/size ratchet (config/quality/complexity-baseline.json).
 */
export function ChaosStatusMessage({ message }: { message: ChaosPageMessage }) {
  if (!message) return null;
  return (
    <div
      role={message.type === "success" ? "status" : "alert"}
      className={`p-3 rounded-lg text-sm font-medium border ${
        message.type === "success"
          ? "bg-success-bg text-success border-success/30"
          : "bg-error-bg text-error border-error/30"
      }`}
    >
      {message.text}
    </div>
  );
}
