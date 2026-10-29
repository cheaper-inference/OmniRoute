"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
import Checkbox from "@/shared/components/Checkbox";
import Icon from "@/shared/components/Icon";
import Modal from "@/shared/components/Modal";
import type { AgentStateEntry, AgentBridgeServerState } from "../AgentBridgePageClient";
import type { MitmTargetView } from "@/mitm/types";

interface SetupWizardProps {
  target: MitmTargetView;
  agentState: AgentStateEntry | undefined;
  serverRunning: boolean;
  serverState: AgentBridgeServerState;
  currentMappings: { source: string; target: string }[]; // Current mappings for this agent
  onClose: () => void;
  onDnsToggle: (agentId: string, enabled: boolean) => Promise<void>;
  onMappingsSave: (
    agentId: string,
    mappings: { source: string; target: string }[]
  ) => Promise<void>;
}

type Step = "verify" | "dns" | "mappings";

interface DetectedModelsResponse {
  agentId: string;
  detectedModels: string[];
  requestCount: number;
}

/**
 * 3-step setup wizard for a single agent.
 * Step 1: Verify server + cert
 * Step 2: Enable DNS
 * Step 3: Model mappings prompt
 */
export function SetupWizard({
  target,
  agentState,
  serverRunning,
  serverState,
  currentMappings,
  onClose,
  onDnsToggle,
  onMappingsSave,
}: SetupWizardProps) {
  const t = useTranslations("agentBridge");
  const [step, setStep] = useState<Step>("verify");
  const [enablingDns, setEnablingDns] = useState(false);
  const [detectedModels, setDetectedModels] = useState<string[]>([]);
  const [loadingModels, setLoadingModels] = useState(false);
  const [selectedModels, setSelectedModels] = useState<Set<string>>(new Set());

  // Fetch detected models when we reach the mappings step
  useEffect(() => {
    if (step === "mappings") {
      void (async () => {
        await Promise.resolve();
        setLoadingModels(true);
        fetch(`/api/tools/agent-bridge/agents/${target.id}/detected-models`)
          .then((res) => res.json())
          .then((data: DetectedModelsResponse) => {
            setDetectedModels(data.detectedModels || []);
          })
          .catch(() => {
            setDetectedModels([]);
          })
          .finally(() => {
            setLoadingModels(false);
          });
      })();
    }
  }, [step, target.id]);

  // Fix #8656 Issue A: Use server-level cert trust as fallback
  const certTrusted = agentState?.cert_trusted ?? serverState.certTrusted ?? false;
  const dnsEnabled = agentState?.dns_enabled ?? false;

  const handleEnableDns = async () => {
    setEnablingDns(true);
    try {
      await onDnsToggle(target.id, true);
      setStep("mappings");
    } finally {
      setEnablingDns(false);
    }
  };

  const toggleModelSelection = (model: string) => {
    setSelectedModels((prev) => {
      const next = new Set(prev);
      if (next.has(model)) {
        next.delete(model);
      } else {
        next.add(model);
      }
      return next;
    });
  };

  const handleAddSelectedModels = async () => {
    if (selectedModels.size === 0) return;

    // Merge detected models with existing mappings instead of replacing
    // Filter out models that already exist in current mappings
    const existingSources = new Set(currentMappings.map((m) => m.source));
    const newMappings = Array.from(selectedModels)
      .filter((source) => !existingSources.has(source)) // Only add new ones
      .map((source) => ({
        source,
        target: "", // Will be selected later in the main card
      }));

    // Combine existing + new mappings
    const allMappings = [...currentMappings, ...newMappings];

    try {
      await onMappingsSave(target.id, allMappings);
      // Wait a bit for the parent to refresh state before closing
      await new Promise((resolve) => setTimeout(resolve, 300));
      onClose();
    } catch {
      // Error handling in parent component
    }
  };

  const steps: { id: Step; label: string }[] = [
    { id: "verify", label: t("wizardStep1Label") },
    { id: "dns", label: t("wizardStep2Label") },
    { id: "mappings", label: t("wizardStep3Label") },
  ];

  const stepIndex = steps.findIndex((s) => s.id === step);

  const footer = (
    <div className="flex w-full items-center justify-between gap-2">
      <Button
        variant="outline"
        onClick={() => {
          if (step === "dns") setStep("verify");
          else if (step === "mappings") setStep("dns");
          else onClose();
        }}
      >
        {step === "verify" ? t("cancel") : t("back")}
      </Button>

      <div className="flex gap-2">
        {step === "verify" && (
          <Button variant="primary" iconRight="arrow_forward" onClick={() => setStep("dns")}>
            {t("next")}
          </Button>
        )}

        {step === "dns" &&
          (dnsEnabled ? (
            <Button variant="primary" onClick={() => setStep("mappings")}>
              {t("next")}
            </Button>
          ) : (
            <Button variant="primary" onClick={handleEnableDns} disabled={enablingDns}>
              {enablingDns ? t("enablingDns") : t("wizardEnableDns")}
            </Button>
          ))}

        {step === "mappings" &&
          (detectedModels.length > 0 && selectedModels.size > 0 ? (
            <Button variant="primary" icon="add" onClick={handleAddSelectedModels}>
              {t("wizardAddModels", { count: selectedModels.size })}
            </Button>
          ) : (
            <Button variant="primary" icon="check" onClick={onClose}>
              {t("done")}
            </Button>
          ))}
      </div>
    </div>
  );

  return (
    <Modal
      isOpen
      onClose={onClose}
      size="lg"
      footer={footer}
      title={
        <span className="flex items-center gap-3">
          <span style={{ color: target.color }}>
            <Icon name={target.icon} size={20} />
          </span>
          <span className="flex flex-col">
            <span>
              {t("wizardTitle")} — {target.name}
            </span>
            <span className="text-xs font-normal text-text-muted">{t("wizardSubtitle")}</span>
          </span>
        </span>
      }
    >
      {/* Step indicator */}
      <ol className="mb-5 flex gap-2" aria-label={t("wizardTitle")}>
        {steps.map((s, i) => (
          <li
            key={s.id}
            aria-current={i === stepIndex ? "step" : undefined}
            className="flex flex-1 items-center gap-1.5"
          >
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                i < stepIndex
                  ? "border border-success/40 bg-success-bg text-success"
                  : i === stepIndex
                    ? "bg-primary text-accent-foreground"
                    : "border border-border bg-bg-subtle text-text-muted"
              }`}
            >
              {i < stepIndex ? <Icon name="check" size={12} /> : i + 1}
            </span>
            <span
              className={`text-xs ${i === stepIndex ? "font-medium text-text-main" : "text-text-muted"}`}
            >
              {s.label}
            </span>
            {i < steps.length - 1 && <span className="ml-1 h-px flex-1 bg-border" />}
          </li>
        ))}
      </ol>

      {/* Step content */}
      <div className="flex min-h-[180px] flex-col gap-4">
        {step === "verify" && (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-text-muted">{t("wizardStep1Desc")}</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm">
                <Icon
                  name={serverRunning ? "check_circle" : "cancel"}
                  size={16}
                  className={serverRunning ? "text-success" : "text-error"}
                />
                <span>
                  {t("wizardServerCheck")}{" "}
                  {serverRunning ? t("wizardRunning") : t("wizardNotRunning")}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon
                  name={certTrusted ? "verified_user" : "warning"}
                  size={16}
                  className={certTrusted ? "text-success" : "text-warning"}
                />
                <span>
                  {t("wizardCertCheck")} {certTrusted ? t("wizardTrusted") : t("wizardNotTrusted")}
                </span>
              </div>
            </div>

            {/* Tutorial steps */}
            {target.setupTutorial.steps.length > 0 && (
              <div className="mt-2 rounded-control border border-border bg-bg-subtle p-3">
                <p className="mb-2 text-xs font-medium text-text-muted">
                  {t("wizardTutorialTitle")}
                </p>
                <ol className="flex flex-col gap-1">
                  {target.setupTutorial.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-text-muted">
                      <span className="shrink-0 font-medium text-text-main">{i + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        )}

        {step === "dns" && (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-text-muted">{t("wizardStep2Desc")}</p>
            <div className="flex flex-col gap-1 rounded-control border border-border bg-bg-subtle p-3 font-mono text-xs">
              {target.hosts.map((host) => (
                <div key={host} className="text-text-muted">
                  <span className="text-primary">127.0.0.1</span> {host}
                </div>
              ))}
            </div>
            {dnsEnabled && (
              <div className="flex items-center gap-2 text-sm text-success">
                <Icon name="check_circle" size={16} />
                {t("wizardDnsAlreadyEnabled")}
              </div>
            )}
          </div>
        )}

        {step === "mappings" && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-success">
              <Icon name="check_circle" size={20} />
              <p className="text-sm font-medium">{t("wizardStep3Success")}</p>
            </div>

            {loadingModels ? (
              <div role="status" className="flex items-center gap-2 text-sm text-text-muted">
                <Icon name="progress_activity" size={16} className="animate-spin" />
                {t("wizardDetectingModels")}
              </div>
            ) : detectedModels.length > 0 ? (
              <div className="flex flex-col gap-2">
                <p className="text-sm text-text-muted">
                  {t("wizardDetectedModels", { count: detectedModels.length })}
                </p>
                <div className="flex max-h-[200px] flex-col gap-1 overflow-y-auto rounded-control border border-border bg-bg-subtle p-3">
                  {detectedModels.map((model) => (
                    <Checkbox
                      key={model}
                      checked={selectedModels.has(model)}
                      onChange={() => toggleModelSelection(model)}
                      label={<span className="font-mono text-xs text-text-main">{model}</span>}
                    />
                  ))}
                </div>
                {selectedModels.size > 0 && (
                  <p className="text-xs text-text-muted">
                    {t("wizardSelectedModels", { count: selectedModels.size })}
                  </p>
                )}
              </div>
            ) : (
              <div className="rounded-control border border-border bg-bg-subtle p-3">
                <p className="text-sm text-text-muted">
                  {t("wizardNoModelsDetected", { agent: target.name })}
                </p>
                <p className="mt-2 text-xs text-text-muted">{t("wizardNoModelsHint")}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
