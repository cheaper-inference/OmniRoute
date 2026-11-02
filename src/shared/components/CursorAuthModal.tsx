"use client";

import { useState, useEffect, useId, useRef } from "react";
import { useTranslations } from "next-intl";
import { Field } from "@omniroute/ui-kit/field";
import Icon from "./Icon";
import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";
import Textarea from "./Textarea";
import { errorMessageFromBody } from "@/shared/utils/fetchError";

type CursorAuthModalProps = {
  isOpen: boolean;
  onSuccess?: () => void;
  onClose: () => void;
  reauthConnection?: unknown;
};

type AuthTab = "login" | "import";

/**
 * Cursor Auth Modal
 * Primary: deep-control PKCE login (Docker-friendly).
 * Secondary: IDE / paste-token import (optional refresh token).
 */
export default function CursorAuthModal({
  isOpen,
  onSuccess,
  onClose,
  reauthConnection: _,
}: CursorAuthModalProps) {
  const t = useTranslations("cursorAuthModal");
  const [tab, setTab] = useState<AuthTab>("login");
  const [accessToken, setAccessToken] = useState("");
  const accessTokenId = useId();
  const refreshTokenId = useId();
  const [refreshToken, setRefreshToken] = useState("");
  const [machineId, setMachineId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [autoDetecting, setAutoDetecting] = useState(false);
  const [autoDetected, setAutoDetected] = useState(false);
  const [dockerHint, setDockerHint] = useState(false);

  const [loginUrl, setLoginUrl] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [loginStarting, setLoginStarting] = useState(false);
  const [loginPolling, setLoginPolling] = useState(false);
  const pollAbortRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      pollAbortRef.current = true;
      return;
    }

    pollAbortRef.current = false;

    // Reset modal UI state for this open. Nested in a function (like autoDetect
    // below) rather than called directly in the effect body, since these are a
    // response to the modal being (re)opened — not a synchronization of React
    // state with an external system — and react-hooks/set-state-in-effect flags
    // direct top-level setState calls in an effect.
    const resetModalState = () => {
      setTab("login");
      setError(null);
      setLoginUrl("");
      setSessionId("");
      setLoginPolling(false);
      // Detect Docker-ish environments for import-tab guidance
      setDockerHint(false);
    };
    resetModalState();

    const autoDetect = async () => {
      setAutoDetecting(true);
      setAutoDetected(false);
      try {
        const res = await fetch("/api/oauth/cursor/auto-import");
        const data = await res.json();
        if (data.found) {
          setAccessToken(data.accessToken || "");
          setRefreshToken(data.refreshToken || "");
          setMachineId(data.machineId || "");
          setAutoDetected(true);
        } else {
          // Soft hint only on import tab; don't block login tab
          if (
            typeof data.error === "string" &&
            /docker|config files found|not appear/i.test(data.error)
          ) {
            setDockerHint(true);
          }
        }
      } catch {
        /* ignore — login tab is primary */
      } finally {
        setAutoDetecting(false);
      }
    };

    void autoDetect();
  }, [isOpen]);

  useEffect(() => {
    return () => {
      pollAbortRef.current = true;
    };
  }, []);

  const handleStartLogin = async () => {
    setLoginStarting(true);
    setError(null);
    setLoginUrl("");
    setSessionId("");
    try {
      const res = await fetch("/api/oauth/cursor/login/start", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(errorMessageFromBody(data, t("errorLoginStart")));
      setLoginUrl(data.loginUrl);
      setSessionId(data.sessionId);
      if (typeof window !== "undefined" && data.loginUrl) {
        window.open(data.loginUrl, "_blank", "noopener,noreferrer");
      }
      void pollUntilDone(data.sessionId);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("errorLoginStart"));
    } finally {
      setLoginStarting(false);
    }
  };

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

        const res = await fetch("/api/oauth/cursor/login/poll", {
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
          onSuccess?.();
          onClose();
          return;
        }
        throw new Error(errorMessageFromBody(data, t("errorLoginPoll")));
      }
      throw new Error(t("errorLoginTimeout"));
    } catch (err) {
      if (!pollAbortRef.current) {
        setError(err instanceof Error ? err.message : t("errorLoginPoll"));
      }
    } finally {
      setLoginPolling(false);
    }
  };

  const handleCancelLogin = async () => {
    pollAbortRef.current = true;
    if (sessionId) {
      try {
        await fetch("/api/oauth/cursor/login/cancel", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
      } catch {
        /* ignore */
      }
    }
    setLoginPolling(false);
    setLoginUrl("");
    setSessionId("");
  };

  const handleImportToken = async () => {
    if (!accessToken.trim()) {
      setError(t("errorEnterToken"));
      return;
    }

    setImporting(true);
    setError(null);

    try {
      const body: Record<string, string> = { accessToken: accessToken.trim() };
      if (machineId.trim()) body.machineId = machineId.trim();
      if (refreshToken.trim()) body.refreshToken = refreshToken.trim();

      const res = await fetch("/api/oauth/cursor/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          typeof data.error === "string"
            ? data.error
            : data.error?.message || t("errorImportFailed")
        );
      }

      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("errorImportFailed"));
    } finally {
      setImporting(false);
    }
  };

  const handleClose = () => {
    void handleCancelLogin();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} title={t("title")} onClose={handleClose}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 border-b border-border pb-2">
          <Button
            variant={tab === "login" ? "primary" : "ghost"}
            onClick={() => setTab("login")}
            disabled={loginPolling}
          >
            {t("tabLogin")}
          </Button>
          <Button
            variant={tab === "import" ? "primary" : "ghost"}
            onClick={() => setTab("import")}
            disabled={loginPolling}
          >
            {t("tabImport")}
          </Button>
        </div>

        {tab === "login" && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-text-muted">{t("loginDescription")}</p>

            {loginPolling && (
              <div className="text-center py-4">
                <div className="size-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="progress_activity" size={24} className="text-primary animate-spin" />
                </div>
                <p className="text-sm font-medium">{t("waitingApproval")}</p>
                {loginUrl && (
                  <p className="text-xs text-text-muted mt-2 break-all">
                    {t("openUrlHint")}{" "}
                    <a
                      href={loginUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline"
                    >
                      {t("openLoginLink")}
                    </a>
                  </p>
                )}
              </div>
            )}

            {error && (
              <div className="bg-error/10 p-3 rounded-lg border border-error/30">
                <p className="text-sm text-error">{error}</p>
              </div>
            )}

            <div className="flex gap-2">
              {!loginPolling ? (
                <Button onClick={handleStartLogin} fullWidth disabled={loginStarting}>
                  {loginStarting ? t("startingLogin") : t("loginWithCursor")}
                </Button>
              ) : (
                <Button onClick={handleCancelLogin} variant="ghost" fullWidth>
                  {t("cancelLogin")}
                </Button>
              )}
              <Button onClick={handleClose} variant="ghost" fullWidth disabled={loginPolling}>
                {t("cancel")}
              </Button>
            </div>
          </div>
        )}

        {tab === "import" && (
          <div className="flex flex-col gap-4">
            {autoDetecting && (
              <div className="text-center py-4">
                <p className="text-sm text-text-muted">{t("autoDetecting")}</p>
              </div>
            )}

            {!autoDetecting && autoDetected && (
              <div className="bg-success/10 p-3 rounded-lg border border-success/30">
                <p className="text-sm text-success">{t("tokensAutoDetected")}</p>
              </div>
            )}

            {!autoDetecting && !autoDetected && (
              <div className="bg-info/10 p-3 rounded-lg border border-info/30">
                <p className="text-sm text-info">
                  {dockerHint ? t("dockerImportHint") : t("cursorNotDetected")}
                </p>
              </div>
            )}

            <Field
              htmlFor={accessTokenId}
              label={
                <>
                  {t("accessToken")} <span className="text-error">{t("required")}</span>
                </>
              }
            >
              <Textarea
                id={accessTokenId}
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                placeholder={t("accessTokenPlaceholder")}
                rows={3}
                className="resize-none font-mono text-sm"
              />
            </Field>

            <Field
              htmlFor={refreshTokenId}
              label={
                <>
                  {t("refreshToken")}{" "}
                  <span className="text-text-muted text-xs">{t("optional")}</span>
                </>
              }
            >
              <Textarea
                id={refreshTokenId}
                value={refreshToken}
                onChange={(e) => setRefreshToken(e.target.value)}
                placeholder={t("refreshTokenPlaceholder")}
                rows={2}
                className="resize-none font-mono text-sm"
              />
            </Field>

            <Input
              label={
                <>
                  {t("machineId")} <span className="text-text-muted text-xs">{t("optional")}</span>
                </>
              }
              value={machineId}
              onChange={(e) => setMachineId(e.target.value)}
              placeholder={t("machineIdPlaceholder")}
              inputClassName="font-mono text-sm"
            />

            {error && (
              <div className="bg-error/10 p-3 rounded-lg border border-error/30">
                <p className="text-sm text-error">{error}</p>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={handleImportToken}
                fullWidth
                disabled={importing || !accessToken.trim()}
              >
                {importing ? t("importing") : t("importToken")}
              </Button>
              <Button onClick={handleClose} variant="ghost" fullWidth>
                {t("cancel")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
