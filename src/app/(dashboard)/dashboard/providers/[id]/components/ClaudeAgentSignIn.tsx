"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "@/shared/components/Icon";
import { Button } from "@/shared/components";

interface Status {
  installed: boolean;
  loggedIn: boolean;
  authMethod?: string;
  apiProvider?: string;
}

type FetchState =
  { phase: "loading" } | { phase: "error"; message: string } | { phase: "ready"; status: Status };

type LoginState =
  | { phase: "idle" }
  | { phase: "inflight" }
  | { phase: "done"; message: string }
  | { phase: "copied" };

/**
 * claude-agent sign-in card (provider detail page).
 *
 * Sign-in is the vendored Claude Code CLI's own OAuth login — OmniRoute
 * stores nothing. On a headless server the endpoint cannot spawn an
 * interactive flow, so it returns the exact terminal command to run.
 */
export default function ClaudeAgentSignIn() {
  const [fetchState, setFetchState] = useState<FetchState>({ phase: "loading" });
  const [login, setLogin] = useState<LoginState>({ phase: "idle" });
  const [loginMessage, setLoginMessage] = useState<string | null>(null);
  const [command, setCommand] = useState("claude auth login");
  const mounted = useRef(true);

  const loadStatus = useCallback(() => {
    return fetch("/api/providers/claude-agent/status", {
      headers: { Accept: "application/json" },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("status"))))
      .then((data: Status & { error?: string }) => {
        if (!mounted.current) return;
        setFetchState({ phase: "ready", status: data });
      })
      .catch(() => {
        // Includes non-loopback sessions reaching the LOCAL_ONLY route (403):
        // stay in "error" honestly rather than faking a status.
        if (!mounted.current) return;
        setFetchState({ phase: "error", message: "Status check failed" });
      });
  }, []);

  useEffect(() => {
    loadStatus();
    return () => {
      mounted.current = false;
    };
  }, [loadStatus]);

  const handleSignIn = async () => {
    setLogin({ phase: "inflight" });
    try {
      const res = await fetch("/api/providers/claude-agent/login", { method: "POST" });
      const data = await res.json();
      if (!mounted.current) return;
      if (!res.ok) {
        setLogin({ phase: "done", message: data?.error || "Sign-in failed" });
        return;
      }
      if (data?.command) {
        // Headless server: the flow cannot be spawned here; show the command.
        setLogin({ phase: "copied" });
        setLoginMessage(`Run this on the OmniRoute host: ${data.command}`);
        setCommand(data.command);
      } else if (data?.exitCode === 0) {
        setLogin({ phase: "done", message: "Login flow finished — re-checking status." });
      } else {
        setLogin({ phase: "done", message: data?.error || "Login flow exited without success." });
      }
      loadStatus();
    } catch {
      if (mounted.current) setLogin({ phase: "done", message: "Sign-in request failed" });
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      if (mounted.current) setLogin({ phase: "copied" });
    } catch {
      // Clipboard denied (insecure origin) — command stays selectable.
    }
  };

  if (fetchState.phase === "loading") {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm text-muted-foreground">
        <Icon name="progress_activity" className="animate-spin" />
        Checking Claude Code sign-in status…
      </div>
    );
  }

  if (fetchState.phase === "error") {
    return (
      <div
        role="alert"
        className="flex items-start gap-3 rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm"
      >
        <Icon name="warning" className="text-danger mt-0.5" />
        <div>
          <p className="font-semibold text-danger">Could not check sign-in status</p>
          <p className="mt-0.5 text-xs text-danger/80">{fetchState.message}</p>
        </div>
      </div>
    );
  }

  const { status } = fetchState;

  if (!status.installed) {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-border px-4 py-3 text-sm text-muted-foreground">
        <Icon name="info" className="mt-0.5" />
        <p>
          The Claude Code CLI (@anthropic-ai/claude-agent-sdk) is not installed on this host, so
          claude-agent requests cannot be served yet.
        </p>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col gap-2 rounded-xl border border-border px-4 py-3 text-sm"
      role="complementary"
      aria-label="Claude Code sign-in"
    >
      {status.loggedIn ? (
        <div className="flex items-start gap-3">
          <Icon name="check_circle" className="text-success mt-0.5" />
          <div>
            <p className="font-semibold">
              Signed in to Claude Code{status.apiProvider ? ` (${status.apiProvider})` : ""}
            </p>
            {status.authMethod ? (
              <p className="mt-0.5 text-xs text-muted-foreground">
                Auth method: {status.authMethod}. OmniRoute stores no credential; the bundled CLI
                reads the host login.
              </p>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          <Icon name="warning" className="text-warning mt-0.5" />
          <div className="min-w-0 flex-1">
            <p className="font-semibold">Not signed in to Claude Code</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Run this in a terminal on the machine running OmniRoute, then re-check:
            </p>
            <code className="mt-1 block break-all rounded bg-muted px-2 py-1 text-xs">
              {command}
            </code>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                Copy command
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignIn}
                loading={login.phase === "inflight"}
                disabled={login.phase === "inflight"}
              >
                Sign in
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={loadStatus}
                disabled={login.phase === "inflight"}
              >
                Re-check
              </Button>
            </div>
          </div>
        </div>
      )}
      {login.phase === "copied" && !loginMessage ? (
        <p className="text-xs text-muted-foreground" role="status">
          Copied. Run it on the OmniRoute host, then re-check.
        </p>
      ) : null}
      {loginMessage ? (
        <p className="break-all text-xs text-muted-foreground" role="status">
          {loginMessage}
        </p>
      ) : null}
      {login.phase === "done" ? (
        <p className="text-xs text-muted-foreground" role="status">
          {login.message}
        </p>
      ) : null}
    </div>
  );
}
