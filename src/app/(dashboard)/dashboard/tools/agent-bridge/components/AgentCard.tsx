"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import { buttonVariants } from "@omniroute/ui-kit/button";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import Card from "@/shared/components/Card";
import Collapsible from "@/shared/components/Collapsible";
import Icon from "@/shared/components/Icon";
import { DnsStatusBadge } from "./shared/DnsStatusBadge";
import { ModelMappingTable } from "./ModelMappingTable";
import { SetupWizard } from "./SetupWizard";
import { RiskNoticeModal } from "@/shared/components/RiskNoticeModal";
import type { MitmTargetView } from "@/mitm/types";
import type { AgentStateEntry, AgentBridgeServerState } from "../AgentBridgePageClient";
import type { MappingRow } from "./ModelMappingTable";

const RISK_STORAGE_KEY_PREFIX = "omniroute-agentbridge-risk-dismissed-";

function hasAcceptedRisk(agentId: string): boolean {
  try {
    return localStorage.getItem(RISK_STORAGE_KEY_PREFIX + agentId) === "true";
  } catch {
    return false;
  }
}

interface AgentCardProps {
  target: MitmTargetView;
  agentState: AgentStateEntry | undefined;
  serverRunning: boolean;
  serverState: AgentBridgeServerState;
  mappings: MappingRow[];
  onDnsToggle: (agentId: string, enabled: boolean) => Promise<void>;
  onMappingsSave: (agentId: string, mappings: MappingRow[]) => Promise<void>;
  onReset: (agentId: string) => Promise<boolean>;
}

/**
 * Expandable card for a single IDE agent.
 */
export function AgentCard({
  target,
  agentState,
  serverRunning,
  serverState,
  mappings,
  onDnsToggle,
  onMappingsSave,
  onReset,
}: AgentCardProps) {
  const t = useTranslations("agentBridge");
  const tc = useTranslations("common");
  const [wizardOpen, setWizardOpen] = useState(false);
  const [dnsLoading, setDnsLoading] = useState(false);
  const [riskModalOpen, setRiskModalOpen] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  const dnsEnabled = agentState?.dns_enabled ?? false;
  const setupCompleted = agentState?.setup_completed ?? false;
  // Fix #8656 Issue A: Use server-level cert trust as fallback
  // (one server cert applies to all agents; agentState.cert_trusted is never written to DB)
  const certTrusted = agentState?.cert_trusted ?? serverState.certTrusted ?? false;
  const isInvestigating = target.viability === "investigating";

  const getStatusBadge = () => {
    if (isInvestigating) {
      return (
        <Badge size="sm" icon="search">
          {t("statusInvestigating") || "Investigating"}
        </Badge>
      );
    }
    if (setupCompleted && dnsEnabled) {
      return (
        <Badge variant="success" size="sm" dot>
          {t("statusActive") || "Active"}
        </Badge>
      );
    }
    if (!setupCompleted) {
      return (
        <Badge size="sm" icon="settings">
          {t("statusSetupRequired") || "Setup required"}
        </Badge>
      );
    }
    return (
      <Badge variant="warning" size="sm" icon="warning">
        {t("statusDnsOff") || "DNS off"}
      </Badge>
    );
  };

  const reallyToggleDns = async (enabled: boolean) => {
    setDnsLoading(true);
    try {
      await onDnsToggle(target.id, enabled);
    } finally {
      setDnsLoading(false);
    }
  };

  const handleDnsToggle = async () => {
    const enabling = !dnsEnabled;
    if (enabling && !hasAcceptedRisk(target.id)) {
      setRiskModalOpen(true);
      return;
    }
    await reallyToggleDns(enabling);
  };

  const handleRiskAccept = async () => {
    setRiskModalOpen(false);
    await reallyToggleDns(true);
  };

  const handleResetConfirm = async () => {
    setResetLoading(true);
    try {
      const succeeded = await onReset(target.id);
      if (succeeded) {
        setConfirmReset(false);
        setResetDone(true);
      }
    } finally {
      setResetLoading(false);
    }
  };

  const hasConfiguredState = dnsEnabled || setupCompleted;

  return (
    <>
      <Card
        padding="none"
        className="overflow-hidden"
        // The agent's brand colour (target registry data) marks the card edge.
        style={{ borderLeftWidth: 3, borderLeftColor: target.color }}
      >
        {/* Card header: the Collapsible adapter (kit Accordion) owns the single native trigger
            (aria-expanded); the status badges sit outside it as `trailing`. */}
        <Collapsible
          variant="inline"
          className="px-4 py-1"
          icon={target.icon}
          title={target.name}
          subtitle={
            <>
              {target.hosts.slice(0, 2).join(", ")}
              {target.hosts.length > 2 && ` +${target.hosts.length - 2}`}
            </>
          }
          trailing={
            <>
              {getStatusBadge()}
              <DnsStatusBadge enabled={dnsEnabled} />
            </>
          }
        >
          {/* Expanded content */}
          <div className="flex flex-col gap-4 border-t border-border pt-4 pb-4">
            {/* Hosts */}
            <div>
              <p className="text-xs font-medium text-text-muted mb-1.5">
                {t("agentHosts") || "Intercepted hosts"}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {target.hosts.map((h) => (
                  <Badge key={h} size="sm" className="font-mono">
                    {h}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Cert status */}
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <Icon
                name={certTrusted ? "verified_user" : "lock_open"}
                size={14}
                className={certTrusted ? "text-success" : "text-text-muted"}
              />
              {certTrusted
                ? t("certTrusted") || "Certificate trusted"
                : t("certNotTrusted") || "Certificate not trusted"}
            </div>

            {/* Investigating notice */}
            {isInvestigating && (
              <div className="rounded-control border border-border bg-bg-subtle p-3">
                <p className="text-xs text-text-muted">
                  {t("investigatingNotice") ||
                    "This agent is under investigation. Hosts and API surface are still being confirmed. Setup will be available once the upstream API is documented."}
                </p>
              </div>
            )}

            {/* Model mappings */}
            {!isInvestigating && (
              <div>
                <p className="text-xs font-medium text-text-muted mb-2">
                  {t("modelMappingsLabel") || "Model mappings"}
                </p>
                <ModelMappingTable
                  agentId={target.id}
                  mappings={mappings}
                  onSave={onMappingsSave}
                />
              </div>
            )}

            {/* Restore-default success banner */}
            {resetDone && (
              <Alert
                variant="success"
                icon={<Icon name="check_circle" size={16} />}
                description={(
                  t("resetDone") ||
                  "Default DNS restored for {agent}. Fully quit the app (not just minimize) and reopen it for the change to take effect."
                ).replace("{agent}", target.name)}
                dismissLabel={tc("close")}
                onDismiss={() => setResetDone(false)}
              />
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {!isInvestigating && (
                <Button
                  size="sm"
                  variant="secondary"
                  icon="play_arrow"
                  onClick={() => setWizardOpen(true)}
                >
                  {t("setupWizard") || "Setup wizard"}
                </Button>
              )}

              {!isInvestigating && (
                <Button
                  size="sm"
                  variant={dnsEnabled ? "danger" : "primary"}
                  icon={dnsEnabled ? "stop" : "play_arrow"}
                  onClick={handleDnsToggle}
                  disabled={dnsLoading}
                >
                  {dnsLoading
                    ? t("toggling") || "Toggling…"
                    : dnsEnabled
                      ? t("stopDns") || "Stop DNS"
                      : t("startDns") || "Start DNS"}
                </Button>
              )}

              <a
                href={`/dashboard/tools/traffic-inspector?agent=${target.id}`}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                <Icon name="network_check" size={14} />
                {t("viewTraffic") || "View traffic"}
              </a>

              {!isInvestigating &&
                hasConfiguredState &&
                (confirmReset ? (
                  <span
                    role="group"
                    aria-label={t("resetAgentConfirm") || "Restore default?"}
                    className="inline-flex items-center gap-1 rounded-control border border-error/30 bg-error-bg px-2 py-1 text-xs"
                  >
                    <span className="text-error">
                      {t("resetAgentConfirm") || "Restore default?"}
                    </span>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={handleResetConfirm}
                      disabled={resetLoading}
                    >
                      {resetLoading ? t("resetting") || "Restoring…" : t("confirm") || "Confirm"}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setConfirmReset(false)}
                      disabled={resetLoading}
                    >
                      {t("cancel") || "Cancel"}
                    </Button>
                  </span>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    icon="restart_alt"
                    className="text-error"
                    onClick={() => {
                      setResetDone(false);
                      setConfirmReset(true);
                    }}
                  >
                    {t("resetAgent") || "Restore default"}
                  </Button>
                ))}
            </div>
          </div>
        </Collapsible>
      </Card>

      {wizardOpen && (
        <SetupWizard
          target={target}
          agentState={agentState}
          serverRunning={serverRunning}
          serverState={serverState}
          currentMappings={mappings}
          onClose={() => setWizardOpen(false)}
          onDnsToggle={onDnsToggle}
          onMappingsSave={onMappingsSave}
        />
      )}

      <RiskNoticeModal
        open={riskModalOpen}
        title={t("riskNoticeTitle")}
        body={t("riskNoticeBody")}
        dontShowAgainKey={RISK_STORAGE_KEY_PREFIX + target.id}
        onAccept={handleRiskAccept}
        onCancel={() => setRiskModalOpen(false)}
      />
    </>
  );
}
