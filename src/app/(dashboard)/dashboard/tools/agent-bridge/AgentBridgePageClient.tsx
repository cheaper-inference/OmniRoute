"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Alert } from "@omniroute/ui-kit/alert";
import { buttonVariants } from "@omniroute/ui-kit/button";
import { PageHeader } from "@omniroute/ui-kit/page-header";
import Card from "@/shared/components/Card";
import Icon from "@/shared/components/Icon";
import { RiskNoticeBanner } from "./components/RiskNoticeBanner";
import { AgentBridgeServerCard } from "./components/AgentBridgeServerCard";
import { AgentBridgeMaintenanceCard } from "./components/AgentBridgeMaintenanceCard";
import { AgentList } from "./components/AgentList";
import { EmptyStateNoProviders } from "./components/EmptyStateNoProviders";
import { useAgentBridgeState } from "./hooks/useAgentBridgeState";
import { useMitmSudoPrompt, MitmSudoPasswordModal } from "./hooks/useMitmSudoPrompt";
import type { MitmTargetView } from "@/mitm/types";
import type { MappingRow } from "./components/ModelMappingTable";

// ── Types ────────────────────────────────────────────────────────────────────

export interface AgentStateEntry {
  agent_id: string;
  dns_enabled: boolean;
  cert_trusted: boolean;
  setup_completed: boolean;
  last_started_at: string | null;
  last_error: string | null;
}

/** Manual cert-install guide returned when auto-trust isn't possible (containers). */
export interface CertManualGuide {
  platform: string;
  certPath: string;
  downloadUrl: string;
  steps: string[];
}

export interface AgentBridgeServerState {
  running: boolean;
  port: number;
  certTrusted: boolean;
  upstreamCa: string | null;
  lastStartedAt: string | null;
  activeConns: number;
  interceptedCount: number;
  /** Target hostnames are spoofed in /etc/hosts (from getMitmStatus). */
  dnsConfigured: boolean;
  /** A crash/SIGKILL left system state behind — surfaces the repair banner. */
  orphanedStateDetected: boolean;
  /** Session-cached sudo password from a prior MITM privileged action. */
  hasCachedPassword?: boolean;
  /** Server OS requires a sudo password and none is cached (#7836). */
  needsSudoPassword?: boolean;
  /** Whether the OmniRoute server is running on Windows. */
  isWin?: boolean;
}

export type AgentMappingsMap = Record<string, MappingRow[]>;

export interface AgentBridgePageData {
  serverState: AgentBridgeServerState;
  agentStates: AgentStateEntry[];
  bypassPatterns: string[];
  mappings: AgentMappingsMap;
}

interface AgentBridgePageClientProps {
  initialData: AgentBridgePageData;
  targets: MitmTargetView[];
  hasProviders: boolean;
}

// ── Component ────────────────────────────────────────────────────────────────

export default function AgentBridgePageClient({
  initialData,
  targets,
  hasProviders,
}: AgentBridgePageClientProps) {
  const t = useTranslations("agentBridge");
  const tc = useTranslations("common");
  const { data, refresh } = useAgentBridgeState({ initialData });
  const [actionError, setActionError] = useState<string | null>(null);
  const [certGuide, setCertGuide] = useState<CertManualGuide | null>(null);

  const { runPrivileged, sudoModalProps } = useMitmSudoPrompt({
    hasCachedPassword: data.serverState.hasCachedPassword === true,
    needsSudoPassword: data.serverState.needsSudoPassword === true,
    isWin: data.serverState.isWin === true,
  });

  const postServerAction = useCallback(
    async (
      action: "start" | "stop" | "restart" | "trust-cert" | "regenerate-cert",
      sudoPassword?: string
    ) => {
      const res = await fetch("/api/tools/agent-bridge/server", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sudoPassword ? { action, sudoPassword } : { action }),
      });
      const payload = (await res.json().catch(() => ({}))) as {
        error?: { message?: string };
        skippable?: boolean;
        manualGuide?: CertManualGuide;
      };
      if (!res.ok) {
        throw new Error(payload.error?.message ?? `HTTP ${res.status}`);
      }
      if (payload.skippable && payload.manualGuide) {
        setCertGuide(payload.manualGuide);
      } else if (action === "trust-cert") {
        setCertGuide(null);
      }
      await refresh();
    },
    [refresh]
  );

  // ── Server actions ────────────────────────────────────────────────────────

  const handleServerAction = useCallback(
    async (action: "start" | "stop" | "restart" | "trust-cert" | "regenerate-cert") => {
      setActionError(null);
      if (action === "trust-cert") {
        await runPrivileged(async (password) => {
          await postServerAction("trust-cert", password || undefined);
        });
        return;
      }
      try {
        await postServerAction(action);
      } catch (err) {
        setActionError(err instanceof Error ? err.message : t("unknownError"));
      }
    },
    [postServerAction, runPrivileged, t]
  );

  // ── Upstream CA ───────────────────────────────────────────────────────────

  const handleUpstreamCaSave = useCallback(
    async (path: string) => {
      setActionError(null);
      try {
        const res = await fetch("/api/tools/agent-bridge/upstream-ca", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        await refresh();
      } catch (err) {
        setActionError(err instanceof Error ? err.message : t("unknownError"));
      }
    },
    [refresh, t]
  );

  // ── Bypass list ───────────────────────────────────────────────────────────

  const handleBypassSave = useCallback(
    async (patterns: string[]) => {
      setActionError(null);
      try {
        const res = await fetch("/api/tools/agent-bridge/bypass", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ patterns }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        await refresh();
      } catch (err) {
        setActionError(err instanceof Error ? err.message : t("unknownError"));
      }
    },
    [refresh, t]
  );

  // ── DNS toggle ────────────────────────────────────────────────────────────

  const handleDnsToggle = useCallback(
    async (agentId: string, enabled: boolean) => {
      setActionError(null);
      try {
        await runPrivileged(async (password) => {
          const res = await fetch(`/api/tools/agent-bridge/agents/${agentId}/dns`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(password ? { enabled, sudoPassword: password } : { enabled }),
          });
          if (!res.ok) {
            const payload = (await res.json().catch(() => ({}))) as {
              error?: { message?: string };
            };
            throw new Error(payload.error?.message ?? `HTTP ${res.status}`);
          }
          await refresh();
        });
      } catch (err) {
        setActionError(err instanceof Error ? err.message : t("unknownError"));
      }
    },
    [refresh, runPrivileged, t]
  );

  // ── Mappings save ─────────────────────────────────────────────────────────

  const handleMappingsSave = useCallback(
    async (agentId: string, mappings: MappingRow[]) => {
      setActionError(null);
      try {
        const res = await fetch(`/api/tools/agent-bridge/agents/${agentId}/mappings`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mappings }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        await refresh();
      } catch (err) {
        setActionError(err instanceof Error ? err.message : t("unknownError"));
      }
    },
    [refresh, t]
  );

  // ── Restore default (per-agent full reset) ───────────────────────────────

  const handleResetAgent = useCallback(
    async (agentId: string): Promise<boolean> => {
      setActionError(null);
      let succeeded = false;
      try {
        await runPrivileged(async (password) => {
          const res = await fetch(`/api/tools/agent-bridge/agents/${agentId}/reset`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(password ? { sudoPassword: password } : {}),
          });
          if (!res.ok) {
            const payload = (await res.json().catch(() => ({}))) as {
              error?: { message?: string };
            };
            throw new Error(payload.error?.message ?? `HTTP ${res.status}`);
          }
          succeeded = true;
          await refresh();
        });
      } catch (err) {
        setActionError(err instanceof Error ? err.message : t("unknownError"));
      }
      return succeeded;
    },
    [refresh, runPrivileged, t]
  );

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-5">
      <PageHeader compact title={t("title")} description={t("subtitle")} />

      {/* Risk banner */}
      <RiskNoticeBanner />

      {/* Error alert */}
      {actionError && (
        <Alert
          variant="critical"
          icon={<Icon name="error" size={16} />}
          description={actionError}
          dismissLabel={tc("dismissNotification")}
          onDismiss={() => setActionError(null)}
        />
      )}

      {/* Manual cert-install guide (container / headless fallback) */}
      {certGuide && (
        <Alert
          variant="warning"
          icon={<Icon name="info" size={16} />}
          title={t("certManualTitle")}
          dismissLabel={tc("dismissNotification")}
          onDismiss={() => setCertGuide(null)}
          description={
            <ol className="mt-1 list-decimal space-y-1 pl-6">
              {certGuide.steps.map((step, i) => (
                <li key={i} className="break-all font-mono text-xs">
                  {step}
                </li>
              ))}
            </ol>
          }
          actions={
            <a
              href={certGuide.downloadUrl}
              download
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              <Icon name="download" size={14} />
              {t("downloadCert")}
            </a>
          }
        />
      )}

      {/* Empty state: no providers */}
      {!hasProviders ? (
        <EmptyStateNoProviders />
      ) : (
        <>
          {/* Server card */}
          <AgentBridgeServerCard
            serverState={data.serverState}
            onAction={handleServerAction}
            onUpstreamCaSave={handleUpstreamCaSave}
            onBypassSave={handleBypassSave}
            bypassPatterns={data.bypassPatterns}
          />

          {/* Maintenance & diagnostics */}
          <AgentBridgeMaintenanceCard
            orphanedStateDetected={data.serverState.orphanedStateDetected}
            certTrusted={data.serverState.certTrusted}
            hasCachedPassword={data.serverState.hasCachedPassword === true}
            needsSudoPassword={data.serverState.needsSudoPassword === true}
            isWin={data.serverState.isWin === true}
            onError={setActionError}
            onRefresh={refresh}
          />

          {/* Agent list */}
          <AgentList
            targets={targets}
            agentStates={data.agentStates}
            serverRunning={data.serverState.running}
            serverState={data.serverState}
            mappingsMap={data.mappings}
            onDnsToggle={handleDnsToggle}
            onMappingsSave={handleMappingsSave}
            onReset={handleResetAgent}
          />

          {/* Quick links */}
          <Card padding="sm">
            <h3 className="ci-eyebrow mb-2">{t("quickLinks")}</h3>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/dashboard/providers"
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                <Icon name="dns" size={14} />
                {t("quickLinkProviders")}
              </Link>
              <Link
                href="/dashboard/tools/traffic-inspector"
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                <Icon name="network_check" size={14} />
                {t("quickLinkInspector")}
              </Link>
            </div>
          </Card>
        </>
      )}

      <MitmSudoPasswordModal {...sudoModalProps} />
    </div>
  );
}
