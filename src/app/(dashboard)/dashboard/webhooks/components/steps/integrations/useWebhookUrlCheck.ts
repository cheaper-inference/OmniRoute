"use client";

import { useEffect, useState } from "react";
import { webhookUrlProblem, type WebhookUrlCheckState } from "../../../webhookFieldValidation";

/**
 * Asks the server whether a destination is allowed (it refuses private addresses), 600 ms after
 * the last keystroke. A value that is empty, over the limit or not an http(s) URL is never
 * sent: the field says so itself.
 */
export function useWebhookUrlCheck(value: string): WebhookUrlCheckState {
  const [urlState, setUrlState] = useState<WebhookUrlCheckState>("idle");

  useEffect(() => {
    const url = value.trim();
    const controller = new AbortController();
    const askServer = webhookUrlProblem(value) === null;
    const delay = askServer ? 600 : 0;
    const timer = setTimeout(async () => {
      if (!askServer) {
        setUrlState("idle");
        return;
      }
      setUrlState("checking");
      try {
        const res = await fetch("/api/webhooks/validate-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
          signal: controller.signal,
        });
        const data = await res.json().catch(() => ({}));
        setUrlState(data.valid ? "ok" : data.reason === "blocked_private" ? "blocked" : "invalid");
      } catch {
        if (!controller.signal.aborted) setUrlState("invalid");
      }
    }, delay);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [value]);

  return urlState;
}
