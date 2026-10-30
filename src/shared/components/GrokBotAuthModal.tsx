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

/**
 * Grok Bot login. Opens the Cursor deep-control page with the sand target and
 * polls until the grant lands. A cli grant cannot call GrokBotService, so
 * there is no token-paste tab.
 */
export default function GrokBotAuthModal({
  isOpen,
  onSuccess,
  onClose,
  reauthConnection: _,
}: GrokBotAuthModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [loginUrl, setLoginUrl] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [loginStarting, setLoginStarting] = useState(false);
  const [loginPolling, setLoginPolling] = useState(false);
  const pollAbortRef = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      pollAbortRef.current = true;
    };
  }, []);

  const pollUntilDone = async (sid: string) => {
    setLoginPolling(true);
    pollAbortRef.current = false;
    const maxAttempts = 150;
    let delayMs = 1000;
    try {
      for (let i = 0; i < maxAttempts; i++) {
        if (pollAbortRef.current) return;
        await new Promise((r) => setTimeout(r, delayMs));
        if (pollAbortRef.current) return;

        const res = await fetch("/api/oauth/grok-bot/login/poll", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: sid }),
        });
        const data = await res.json();

        if (data.status === "pending") {
          delayMs = Math.min(delayMs * 1.2, 10_000);
          continue;
        }
        if (data.status === "ok" || data.success) {
          if (!mountedRef.current) return;
          onSuccess?.();
          onClose();
          return;
        }
        throw new Error(errorMessageFromBody(data, "Grok Bot login failed"));
      }
      if (mountedRef.current) setError("Login timed out. Start again.");
    } catch (err) {
      if (mountedRef.current && !pollAbortRef.current) {
        setError(err instanceof Error ? err.message : "Grok Bot login failed");
      }
    } finally {
      if (mountedRef.current) setLoginPolling(false);
    }
  };

  const handleStartLogin = async () => {
    setLoginStarting(true);
    setError(null);
    setLoginUrl("");
    setSessionId("");
    try {
      const res = await fetch("/api/oauth/grok-bot/login/start", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(errorMessageFromBody(data, "Could not start Grok Bot login"));
      setLoginUrl(data.loginUrl);
      setSessionId(data.sessionId);
      if (typeof window !== "undefined" && data.loginUrl) {
        window.open(data.loginUrl, "_blank", "noopener,noreferrer");
      }
      void pollUntilDone(data.sessionId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start Grok Bot login");
    } finally {
      setLoginStarting(false);
    }
  };

  const handleCancelLogin = async () => {
    pollAbortRef.current = true;
    if (sessionId) {
      try {
        await fetch("/api/oauth/grok-bot/login/cancel", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
      } catch {
        /* ignore */
      }
    }
    if (!mountedRef.current) return;
    setLoginPolling(false);
    setLoginUrl("");
    setSessionId("");
  };

  const handleClose = () => {
    void handleCancelLogin();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} title="Add Grok Bot account" onClose={handleClose}>
      <div className="flex flex-col gap-4">
        <p className="text-sm text-text-muted">
          Sign in with the Grok Bot account in the browser window. This is separate from a Grok
          Build login.
        </p>
        {error && <p className="text-sm text-red-500">{error}</p>}
        {loginUrl ? (
          <a className="text-sm underline break-all" href={loginUrl} target="_blank" rel="noreferrer">
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
