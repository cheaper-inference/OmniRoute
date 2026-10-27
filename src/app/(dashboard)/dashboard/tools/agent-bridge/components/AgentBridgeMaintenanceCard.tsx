"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import { Button, Card, Input, Modal } from "@/shared/components";
import Icon from "@/shared/components/Icon";
import {
  runDiagnose,
  removeCaCert,
  repairMitmState,
  fetchAgentBridgeConfig,
  importAgentBridgeConfig,
  type DiagnoseResult,
} from "@/lib/inspector/agentBridgeMaintenanceApi";
import type { AgentBridgeConfig, ImportResult } from "@/lib/inspector/configPortability";

interface AgentBridgeMaintenanceCardProps {
  /** A crash left DNS spoof / CA / system proxy behind → surface the repair banner. */
  orphanedStateDetected: boolean;
  /** Whether the MITM root CA is currently trusted (gates the Remove-CA button). */
  certTrusted: boolean;
  /** Session-cached sudo password from a prior MITM privileged action. */
  hasCachedPassword: boolean;
  /** Server OS requires a sudo password and none is cached. */
  needsSudoPassword: boolean;
  /** Whether the OmniRoute server is running on Windows. */
  isWin: boolean;
  /** Report a sanitized error to the page-level alert banner. */
  onError: (msg: string | null) => void;
  /** Re-fetch page state after an action that mutates system state. */
  onRefresh: () => Promise<void> | void;
}

function downloadJson(data: unknown, filename: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Maintenance & Diagnostics card — exposes the operational MITM routes that
 * shipped without UI: capture self-test (#4093), orphaned-state repair + root-CA
 * removal (#4084), and portable config import/export (#4094).
 */
export function AgentBridgeMaintenanceCard({
  orphanedStateDetected,
  certTrusted,
  hasCachedPassword,
  needsSudoPassword,
  isWin,
  onError,
  onRefresh,
}: AgentBridgeMaintenanceCardProps) {
  const t = useTranslations("agentBridge");
  const tCli = useTranslations("cliTools");
  const tc = useTranslations("common");
  const [busy, setBusy] = useState<string | null>(null);
  const [report, setReport] = useState<DiagnoseResult | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [confirmRemoveCa, setConfirmRemoveCa] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pendingPrivilegedAction, setPendingPrivilegedAction] = useState<
    "repair" | "remove-ca" | null
  >(null);
  const [sudoPassword, setSudoPassword] = useState("");
  const [passwordModalError, setPasswordModalError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const canRunWithoutPassword = isWin || hasCachedPassword || !needsSudoPassword;

  const run = async (action: string, fn: () => Promise<void>) => {
    setBusy(action);
    onError(null);
    setNotice(null);
    try {
      await fn();
    } catch (err) {
      onError(err instanceof Error ? err.message : "Action failed");
    } finally {
      setBusy(null);
    }
  };

  const handleDiagnose = () =>
    run("diagnose", async () => {
      setReport(await runDiagnose());
    });

  const handleRepair = async (password = "") => {
    const { repaired } = await repairMitmState(password || undefined);
    const repairedItems = repaired.join(", ");
    setNotice(
      repaired.length === 0
        ? t("repairNothing") || "Nothing to repair — system state is clean."
        : (t("repairDone", { items: repairedItems }) || "Repaired: {items}").replace(
            "{items}",
            repairedItems
          )
    );
    await onRefresh();
  };

  const handleRemoveCa = async (password = "") => {
    await removeCaCert(password || undefined);
    setConfirmRemoveCa(false);
    setNotice(t("removeCaDone") || "MITM root CA removed from the OS trust store.");
    await onRefresh();
  };

  const runPrivilegedAction = async (action: "repair" | "remove-ca", password = "") => {
    if (action === "repair") {
      await run("repair", () => handleRepair(password));
      return;
    }
    await run("remove-ca", () => handleRemoveCa(password));
  };

  const requestPrivilegedAction = (action: "repair" | "remove-ca") => {
    if (canRunWithoutPassword) {
      void runPrivilegedAction(action);
      return;
    }
    setPendingPrivilegedAction(action);
    setPasswordModalError(null);
    setSudoPassword("");
    setShowPasswordModal(true);
  };

  const handleConfirmPassword = () => {
    if (!sudoPassword.trim()) {
      setPasswordModalError(tCli("sudoPasswordRequiredError"));
      return;
    }
    const action = pendingPrivilegedAction;
    if (!action) return;
    setShowPasswordModal(false);
    setPendingPrivilegedAction(null);
    const password = sudoPassword;
    setSudoPassword("");
    setPasswordModalError(null);
    void runPrivilegedAction(action, password);
  };

  const onRepairClick = () => requestPrivilegedAction("repair");

  const onRemoveCaClick = () => requestPrivilegedAction("remove-ca");

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setPendingPrivilegedAction(null);
    setSudoPassword("");
    setPasswordModalError(null);
  };

  const handleExport = () =>
    run("export", async () => {
      const config = await fetchAgentBridgeConfig();
      downloadJson(config, `agent-bridge-config-${Date.now()}.json`);
    });

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file
    if (!file) return;
    await run("import", async () => {
      let parsed: unknown;
      try {
        parsed = JSON.parse(await file.text());
      } catch {
        throw new Error(t("importInvalidJson") || "The selected file is not valid JSON.");
      }
      const result: ImportResult = await importAgentBridgeConfig(parsed as AgentBridgeConfig);
      const importValues = {
        bypass: String(result.bypassPatterns),
        hosts: String(result.customHosts),
        agents: String(result.agents),
      };
      setNotice(
        (
          t("importDone", importValues) ||
          "Imported {bypass} bypass · {hosts} hosts · {agents} agents"
        )
          .replace("{bypass}", importValues.bypass)
          .replace("{hosts}", importValues.hosts)
          .replace("{agents}", importValues.agents)
      );
      await onRefresh();
    });
  };

  return (
    <>
      <Card padding="none" className="overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4">
          <div className="rounded-control bg-bg-subtle p-2 text-text-main">
            <Icon name="build" size={20} />
          </div>
          <div>
            <h2 className="ci-heading text-sm">
              {t("maintenanceTitle") || "Maintenance & Diagnostics"}
            </h2>
            <p className="mt-0.5 text-xs text-text-muted">
              {t("maintenanceSubtitle") ||
                "Self-test the capture pipeline, undo leftover system state, and move your setup between machines."}
            </p>
          </div>
        </div>

        {/* Orphaned-state repair banner (Gap 7) */}
        {orphanedStateDetected && (
          <Alert
            variant="warning"
            className="mx-5 mb-3"
            icon={<Icon name="warning" size={16} />}
            description={
              t("orphanedStateWarning") ||
              "A previous session left system state behind (DNS spoof, CA, or system proxy). Run Repair to clean it up."
            }
            dismissLabel={tc("close")}
          />
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2 px-5 pb-4">
          <Button
            size="sm"
            variant="outline"
            icon="troubleshoot"
            onClick={handleDiagnose}
            disabled={busy !== null}
          >
            {busy === "diagnose" ? t("diagnosing") || "Diagnosing…" : t("diagnose") || "Diagnose"}
          </Button>

          <Button
            size="sm"
            variant={orphanedStateDetected ? "warning" : "outline"}
            icon="cleaning_services"
            onClick={onRepairClick}
            disabled={busy !== null}
          >
            {busy === "repair" ? t("repairing") || "Repairing…" : t("repair") || "Repair"}
          </Button>

          {certTrusted &&
            (confirmRemoveCa ? (
              <span
                role="group"
                aria-label={t("removeCaConfirm") || "Remove CA?"}
                className="inline-flex items-center gap-1 rounded-control border border-error/30 bg-error-bg px-2 py-1 text-xs"
              >
                <span className="text-error">{t("removeCaConfirm") || "Remove CA?"}</span>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={onRemoveCaClick}
                  disabled={busy !== null}
                >
                  {busy === "remove-ca" ? t("removing") || "Removing…" : t("confirm") || "Confirm"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setConfirmRemoveCa(false)}
                  disabled={busy !== null}
                >
                  {t("cancel") || "Cancel"}
                </Button>
              </span>
            ) : (
              <Button
                size="sm"
                variant="outline"
                icon="gpp_bad"
                className="text-error"
                onClick={() => setConfirmRemoveCa(true)}
                disabled={busy !== null}
              >
                {t("removeCa") || "Remove CA"}
              </Button>
            ))}

          <Button
            size="sm"
            variant="outline"
            icon="download"
            onClick={handleExport}
            disabled={busy !== null}
          >
            {busy === "export"
              ? t("exporting") || "Exporting…"
              : t("exportConfig") || "Export config"}
          </Button>

          <Button
            size="sm"
            variant="outline"
            icon="upload"
            onClick={() => fileInputRef.current?.click()}
            disabled={busy !== null}
          >
            {busy === "import"
              ? t("importing") || "Importing…"
              : t("importConfig") || "Import config"}
          </Button>
          {/* kit-exception: Hidden native file picker driven by the Import button above (no visible control). */}
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            onChange={handleImportFile}
            className="hidden"
            aria-hidden="true"
            tabIndex={-1}
          />
        </div>

        {/* Success notice */}
        {notice && (
          <Alert
            variant="success"
            className="mx-5 mb-4"
            icon={<Icon name="check_circle" size={16} />}
            description={notice}
            dismissLabel={tc("close")}
            onDismiss={() => setNotice(null)}
          />
        )}

        {/* Diagnose report */}
        {report && (
          <div className="mx-5 mb-4 rounded-control border border-border bg-bg-subtle p-3">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium">
              <Icon
                name={report.healthy ? "check_circle" : "error"}
                size={16}
                className={report.healthy ? "text-success" : "text-error"}
              />
              <span className={report.healthy ? "text-success" : "text-error"}>
                {report.healthy
                  ? t("diagnoseHealthy") || "Capture pipeline is healthy."
                  : t("diagnoseUnhealthy") || "Capture pipeline has problems:"}
              </span>
              <span className="ml-auto font-mono text-text-muted">:{report.port}</span>
            </div>
            <ul className="flex flex-col gap-1.5">
              {report.checks.map((c) => (
                <li key={c.name} className="text-xs">
                  <div className="flex items-center gap-1.5">
                    <Icon
                      name={c.ok ? "check" : "close"}
                      size={14}
                      ariaLabel={c.ok ? tc("ok") : tc("failed")}
                      className={c.ok ? "text-success" : "text-error"}
                    />
                    <span className="font-mono text-text-main">{c.name}</span>
                  </div>
                  {!c.ok && c.hint && <p className="ml-5 text-text-muted">{c.hint}</p>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      <Modal
        isOpen={showPasswordModal}
        onClose={closePasswordModal}
        title={tCli("sudoPasswordRequiredTitle")}
        size="sm"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3 rounded-control border border-warning/30 bg-warning-bg p-3">
            <Icon name="warning" size={20} className="text-warning" />
            <p className="text-xs text-text-muted">{tCli("sudoPasswordHint")}</p>
          </div>

          <Input
            type="password"
            aria-label={tCli("enterSudoPassword")}
            error={passwordModalError ?? undefined}
            placeholder={tCli("enterSudoPassword")}
            value={sudoPassword}
            onChange={(event) => setSudoPassword(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && busy === null) handleConfirmPassword();
            }}
          />

          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={closePasswordModal} disabled={busy !== null}>
              {tCli("cancel")}
            </Button>
            <Button size="sm" onClick={handleConfirmPassword} disabled={busy !== null}>
              {tCli("confirm")}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
