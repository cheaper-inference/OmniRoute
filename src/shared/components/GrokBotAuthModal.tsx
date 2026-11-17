"use client";

import { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import Button from "./Button";
import { errorMessageFromBody } from "@/shared/utils/fetchError";

type GrokBotAuthModalProps = {
  isOpen: boolean;
  onSuccess?: () => void;
  onClose: () => void;
  reauthConnection?: unknown;
};

function pollDelay(millis: number, signal: AbortSignal): Promise<boolean> {
  if (signal.aborted) return Promise.resolve(false);
  return new Promise((resolve) => {
    const finish = (elapsed: boolean) => {
      clearTimeout(timer);
      signal.removeEventListener("abort", abort);
      resolve(elapsed);
    };
    const abort = () => finish(false);
    const timer = setTimeout(() => finish(true), millis);
    signal.addEventListener("abort", abort, { once: true });
  });
}

async function waitForLogin(
  sid: string,
  signal: AbortSignal
): Promise<"complete" | "cancelled" | "timeout"> {
  let delayMs = 1000;
  for (let i = 0; i < 150; i++) {
    if (!(await pollDelay(delayMs, signal))) return "cancelled";
    const res = await fetch("/api/oauth/grok-bot/login/poll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: sid }),
      signal,
    });
    const data = await res.json();
    if (signal.aborted) return "cancelled";
    if (data.status === "pending") {
      delayMs = Math.min(delayMs * 1.2, 10_000);
      continue;
    }
    if (data.status === "ok" || data.success) return "complete";
    throw new Error(errorMessageFromBody(data, "Grok Bot login failed"));
  }
  return "timeout";
}

async function cancelSession(sessionId: string): Promise<void> {
  if (!sessionId) return;
  try {
    await fetch("/api/oauth/grok-bot/login/cancel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    });
  } catch {
    /* Cancellation is best-effort; local ownership still ends immediately. */
  }
}

function useLoginLifetime() {
  const attemptRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      attemptRef.current?.abort();
    };
  }, []);
  const owns = (attempt: AbortController | null) =>
    mountedRef.current && attemptRef.current === attempt;
  const begin = () => {
    attemptRef.current?.abort();
    const attempt = new AbortController();
    attemptRef.current = attempt;
    return attempt;
  };
  return { attemptRef, owns, begin };
}

/** Each login owns its polling, callbacks and state writes until cancelled or superseded. */
function useGrokBotLogin({ onSuccess, onClose }: GrokBotAuthModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [loginUrl, setLoginUrl] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [loginStarting, setLoginStarting] = useState(false);
  const [loginPolling, setLoginPolling] = useState(false);
  const { attemptRef, owns, begin } = useLoginLifetime();
  const pollUntilDone = async (sid: string, attempt: AbortController) => {
    setLoginPolling(true);
    try {
      const outcome = await waitForLogin(sid, attempt.signal);
      if (!owns(attempt) || attempt.signal.aborted) return;
      if (outcome === "complete") {
        onSuccess?.();
        onClose();
      }
      if (outcome === "timeout") setError("Login timed out. Start again.");
    } catch (err) {
      if (owns(attempt) && !attempt.signal.aborted)
        setError(err instanceof Error ? err.message : "Grok Bot login failed");
    } finally {
      if (owns(attempt)) setLoginPolling(false);
    }
  };
  const handleStartLogin = async () => {
    const attempt = begin();
    setLoginStarting(true);
    setError(null);
    setLoginUrl("");
    setSessionId("");
    try {
      const res = await fetch("/api/oauth/grok-bot/login/start", {
        method: "POST",
        signal: attempt.signal,
      });
      const data = await res.json();
      if (!owns(attempt) || attempt.signal.aborted) {
        // A transport may resolve after abort; do not leave its abandoned grant polling.
        if (typeof data.sessionId === "string") void cancelSession(data.sessionId);
        return;
      }
      if (!res.ok) throw new Error(errorMessageFromBody(data, "Could not start Grok Bot login"));
      setLoginUrl(data.loginUrl);
      setSessionId(data.sessionId);
      if (typeof window !== "undefined" && data.loginUrl)
        window.open(data.loginUrl, "_blank", "noopener,noreferrer");
      void pollUntilDone(data.sessionId, attempt);
    } catch (err) {
      if (owns(attempt) && !attempt.signal.aborted)
        setError(err instanceof Error ? err.message : "Could not start Grok Bot login");
    } finally {
      if (owns(attempt)) setLoginStarting(false);
    }
  };
  const handleCancelLogin = async () => {
    const attempt = attemptRef.current;
    attempt?.abort();
    if (!owns(attempt)) return;
    setLoginStarting(false);
    setLoginPolling(false);
    setLoginUrl("");
    setSessionId("");
    await cancelSession(sessionId);
  };
  const handleClose = () => {
    void handleCancelLogin();
    onClose();
  };
  return {
    error,
    loginUrl,
    loginStarting,
    loginPolling,
    handleStartLogin,
    handleCancelLogin,
    handleClose,
  };
}

export default function GrokBotAuthModal(props: GrokBotAuthModalProps) {
  const { isOpen } = props;
  const {
    error,
    loginUrl,
    loginStarting,
    loginPolling,
    handleStartLogin,
    handleCancelLogin,
    handleClose,
  } = useGrokBotLogin(props);
  return (
    <Modal isOpen={isOpen} title="Add Grok Bot account" onClose={handleClose}>
      <div className="flex flex-col gap-4">
        <p className="text-sm text-text-muted">
          Sign in with the Grok Bot account in the browser window. This is separate from a Grok
          Build login.
        </p>
        {error && <p className="text-sm text-error">{error}</p>}
        {loginUrl ? (
          <a
            className="text-sm underline break-all"
            href={loginUrl}
            target="_blank"
            rel="noreferrer"
          >
            {loginUrl}
          </a>
        ) : null}
        <div className="flex gap-2 justify-end">
          {loginPolling ? (
            <Button variant="secondary" onClick={handleCancelLogin}>
              Cancel
            </Button>
          ) : null}
          <Button onClick={handleStartLogin} disabled={loginStarting || loginPolling}>
            {loginPolling ? "Waiting for sign-in" : "Sign in"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
