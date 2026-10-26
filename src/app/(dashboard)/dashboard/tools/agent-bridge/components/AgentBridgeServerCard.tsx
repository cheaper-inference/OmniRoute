"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@omniroute/ui-kit/button";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import Icon from "@/shared/components/Icon";
import { CertStatusIcon } from "./shared/CertStatusIcon";
import { UpstreamCaField } from "./UpstreamCaField";
import { BypassListEditor } from "./BypassListEditor";
import type { AgentBridgeServerState } from "../AgentBridgePageClient";

interface AgentBridgeServerCardProps {
  serverState: AgentBridgeServerState;
  onAction: (
    action: "start" | "stop" | "restart" | "trust-cert" | "regenerate-cert"
  ) => Promise<void>;
  onUpstreamCaSave: (path: string) => Promise<void>;
  onBypassSave: (patterns: string[]) => Promise<void>;
  bypassPatterns: string[];
}

/**
 * Global server card — status + action buttons + CA field + bypass list.
 * Matches plan 11 §3 AgentBridge Server layout.
 */
export function AgentBridgeServerCard({
  serverState,
  onAction,
  onUpstreamCaSave,
  onBypassSave,
  bypassPatterns,
}: AgentBridgeServerCardProps) {
  const t = useTranslations("agentBridge");
  const [loading, setLoading] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [upstreamCa, setUpstreamCa] = useState(serverState.upstreamCa ?? "");

  const runAction = async (
    action: "start" | "stop" | "restart" | "trust-cert" | "regenerate-cert"
  ) => {
    setLoading(action);
    try {
      await onAction(action);
    } finally {
      setLoading(null);
    }
  };

  const isRunning = serverState.running;

  return (
    <Card padding="none" className="overflow-hidden">
      {/* Header row */}
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="rounded-control bg-bg-subtle p-2 text-text-main">
            <Icon name="link" size={20} />
          </div>
          <div className="min-w-0">
            <h2 className="ci-heading flex flex-wrap items-center gap-2 text-sm">
              {t("serverCardTitle") || "AgentBridge Server"}
              <Badge variant={isRunning ? "success" : "default"} size="sm" dot>
                {isRunning ? t("statusRunning") || "Running" : t("statusStopped") || "Stopped"}
              </Badge>
            </h2>
            <div className="mt-0.5 flex flex-wrap items-center gap-3 text-xs text-text-muted">
              <span>
                {t("serverPort") || "Port"}: {serverState.port ?? 443}
              </span>
              <CertStatusIcon trusted={serverState.certTrusted ?? false} />
              {serverState.activeConns !== undefined && (
                <span>
                  {t("serverConns") || "Connections"}: {serverState.activeConns}
                </span>
              )}
              {serverState.interceptedCount !== undefined && (
                <span>
                  {t("serverIntercepted") || "Intercepted"}:{" "}
                  {serverState.interceptedCount.toLocaleString()}
                </span>
              )}
              {serverState.lastStartedAt && (
                <span>
                  {t("serverLastStarted") || "Last started"}:{" "}
                  {new Date(serverState.lastStartedAt).toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon-sm"
          icon={expanded ? "expand_less" : "expand_more"}
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-label={expanded ? t("hideServerSettings") : t("showServerSettings")}
        />
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2 px-5 pb-4">
        <Button
          size="sm"
          variant="primary"
          icon="play_arrow"
          onClick={() => runAction("start")}
          disabled={isRunning || loading !== null}
          aria-label={t("startServer")}
        >
          {loading === "start" ? t("starting") || "Starting…" : t("startServer") || "Start"}
        </Button>

        <Button
          size="sm"
          variant="danger"
          icon="stop"
          onClick={() => runAction("stop")}
          disabled={!isRunning || loading !== null}
          aria-label={t("stopServer")}
        >
          {loading === "stop" ? t("stopping") || "Stopping…" : t("stopServer") || "Stop"}
        </Button>

        <Button
          size="sm"
          variant="outline"
          icon="refresh"
          onClick={() => runAction("restart")}
          disabled={loading !== null}
          aria-label={t("restartServer")}
        >
          {loading === "restart"
            ? t("restarting") || "Restarting…"
            : t("restartServer") || "Restart"}
        </Button>

        <Button
          size="sm"
          variant="outline"
          icon="security"
          onClick={() => runAction("trust-cert")}
          disabled={loading !== null}
          aria-label={t("trustCert")}
        >
          {loading === "trust-cert" ? t("trusting") || "Trusting…" : t("trustCert") || "Trust Cert"}
        </Button>

        <a
          href="/api/tools/agent-bridge/cert/download"
          download
          aria-label={t("downloadCert")}
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          <Icon name="download" size={14} />
          {t("downloadCert") || "Download Cert"}
        </a>

        <Button
          size="sm"
          variant="outline"
          icon="autorenew"
          onClick={() => runAction("regenerate-cert")}
          disabled={loading !== null}
          aria-label={t("regenerateCert")}
        >
          {loading === "regenerate-cert"
            ? t("regenerating") || "Regenerating…"
            : t("regenerateCert") || "Regenerate Cert"}
        </Button>
      </div>

      {/* Expanded: CA + Bypass */}
      {expanded && (
        <div className="flex flex-col gap-5 border-t border-border px-5 pt-4 pb-5">
          <UpstreamCaField value={upstreamCa} onChange={setUpstreamCa} onSave={onUpstreamCaSave} />
          <div>
            <h3 className="ci-heading mb-2 text-xs">{t("bypassSectionTitle") || "Bypass List"}</h3>
            <p className="mb-3 text-xs text-text-muted">
              {t("bypassSectionDesc") ||
                "Hosts matching these patterns are tunneled directly (no TLS decryption). Defaults include banks, .gov, and corporate SSO."}
            </p>
            <BypassListEditor patterns={bypassPatterns} onSave={onBypassSave} />
          </div>
        </div>
      )}
    </Card>
  );
}
