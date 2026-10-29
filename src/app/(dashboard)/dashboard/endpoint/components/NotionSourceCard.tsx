"use client";

import Icon from "@/shared/components/Icon";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import Input from "@/shared/components/Input";
import { cn } from "@/shared/utils/cn";

export default function NotionSourceCard() {
  const t = useTranslations("endpoint");
  const tc = useTranslations("common");
  const [connected, setConnected] = useState(false);
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [expanded, setExpanded] = useState(false);

  const translateOrFallback = (key: string, fallback: string) => {
    try {
      const translated = t(key as never);
      if (!translated || translated === key || translated === `endpoint.${key}`) {
        return fallback;
      }
      return translated;
    } catch {
      return fallback;
    }
  };

  const fetchConfig = useCallback(async () => {
    try {
      const res = await fetch("/api/settings/notion");
      if (res.ok) {
        const data = await res.json();
        setConnected(data.connected);
      }
    } catch {
      // Non-critical
    }
  }, []);

  useEffect(() => {
    // Async continuation — see react-hooks/set-state-in-effect.
    void (async () => {
      await fetchConfig();
    })();
  }, [fetchConfig]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSaveToken = async () => {
    if (!token.trim()) {
      setMessage({
        type: "error",
        text: translateOrFallback("notionEnterToken", "Please enter a Notion integration token"),
      });
      return;
    }
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch("/api/settings/notion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setConnected(true);
        setMessage({ type: "success", text: data.message });
      } else {
        setMessage({
          type: "error",
          text: data.error ?? translateOrFallback("notionConnectFailed", "Failed to connect"),
        });
        setConnected(false);
      }
    } catch (err) {
      setMessage({
        type: "error",
        text:
          err instanceof Error
            ? err.message
            : translateOrFallback("notionConnectionFailed", "Connection failed"),
      });
    } finally {
      setBusy(false);
    }
  };

  const handleDisconnect = async () => {
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch("/api/settings/notion", { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setConnected(false);
        setToken("");
        setMessage({ type: "success", text: data.message });
      } else {
        setMessage({
          type: "error",
          text: data.error ?? translateOrFallback("notionDisconnectFailed", "Failed to disconnect"),
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text:
          err instanceof Error
            ? err.message
            : translateOrFallback("notionDisconnectFailed", "Disconnect failed"),
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card>
      <div className="p-5">
        <Button
          variant="ghost"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="w-full h-auto justify-start gap-3 p-0 text-left font-normal whitespace-normal hover:bg-transparent"
        >
          <div className="flex items-center justify-center size-10 rounded-lg bg-info/10 shrink-0">
            <Icon name="description" className="text-xl text-info" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm">Notion</span>
              <Badge variant={connected ? "success" : "default"}>
                {connected
                  ? translateOrFallback("notionConnected", "Connected")
                  : translateOrFallback("notionNotConnected", "Not connected")}
              </Badge>
            </div>
            <p className="text-xs text-text-muted mt-0.5">
              {translateOrFallback(
                "notionDescription",
                "Search, read, query, and write to Notion through routed AI models"
              )}
            </p>
          </div>
          <Icon
            name="expand_more"
            size={18}
            className={cn("text-text-muted transition-transform", expanded && "rotate-180")}
          />
        </Button>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-border/50 flex flex-col gap-3">
            {message && (
              <Alert
                variant={message.type === "success" ? "success" : "critical"}
                icon={
                  <Icon name={message.type === "success" ? "check_circle" : "error"} size={18} />
                }
                description={message.text}
                dismissLabel={tc("close")}
                onDismiss={() => setMessage(null)}
              />
            )}

            {!connected ? (
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-end">
                  <Input
                    label={translateOrFallback(
                      "notionIntegrationToken",
                      "Notion Internal Integration Token"
                    )}
                    type="password"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="ntn_... or secret_..."
                    disabled={busy}
                    className="font-mono text-sm flex-1"
                  />
                  <Button onClick={handleSaveToken} loading={busy} variant="primary" size="sm">
                    {translateOrFallback("notionConnect", "Connect")}
                  </Button>
                </div>
                <p className="text-[10px] text-text-muted">
                  {translateOrFallback(
                    "notionIntegrationHelp",
                    "Create an Internal Integration at"
                  )}{" "}
                  <code className="text-primary font-mono bg-surface/80 px-1 rounded">
                    https://www.notion.so/profile/integrations
                  </code>
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-muted flex-1">
                  {translateOrFallback(
                    "notionTokenConfigured",
                    "Token configured. Notion tools are available via MCP."
                  )}
                </span>
                <Button onClick={handleDisconnect} loading={busy} variant="danger" size="sm">
                  {translateOrFallback("notionDisconnect", "Disconnect")}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
